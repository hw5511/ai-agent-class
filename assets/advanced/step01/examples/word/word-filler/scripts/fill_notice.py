"""Fill the bundled notice template (assets/공지사항_템플릿.docx) from a JSON file.

Usage:
    python fill_notice.py --data DATA.json --output NOTICE.docx [--template T.docx] [--preview]

The template is copied byte-for-byte; only word/document.xml and word/footer1.xml
are rewritten (plus word/media and the relationship files when an image is
given). Placeholders are replaced, the detail-table rows and the note bullets are
cloned to match the data, and an optional image is cropped to fill the 17 x 4 cm
image box exactly.

--preview renders the result through Word (docx2pdf + PyMuPDF, both optional)
and reports the page count; the layout is designed for a single A4 page.

Exit code 1 with a readable message when the JSON does not fit the template.
"""

import argparse
import json
import os
import re
import shutil
import struct
import sys
import zipfile
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_TEMPLATE = os.path.join(HERE, "..", "assets", "공지사항_템플릿.docx")

P_RE = re.compile(r"<w:p>.*?</w:p>", re.S)
TR_RE = re.compile(r"<w:tr>.*?</w:tr>", re.S)
TC_RE = re.compile(r"<w:tc>.*?</w:tc>", re.S)
T_RE = re.compile(r"<w:t(?: [^>]*)?>([^<]*)</w:t>")

# Image box geometry in DXA (from the template: 9638 wide, row height 2300 exact)
BOX_W_DXA, BOX_H_DXA = 9638, 2300
EMU_PER_DXA = 635

REQUIRED = ["title", "overview", "company"]
DEFAULTS = {
    "summary": "",
    "doc_no": "",
    "post_date": "",
    "department": "",
    "period": "",
    "contact": "",
    "overview_title": "개요",
    "details_title": "주요 내용",
    "details": [],
    "notes_title": "유의사항",
    "notes": [],
    "image": "",
    "sign_date": "",
    "sign_department": None,   # defaults to department
    "footer_note": "본 공지는 사내 게시용이며 외부 반출을 금합니다.",
}


class DataError(Exception):
    pass


def normalize(data, base_dir):
    if not isinstance(data, dict):
        raise DataError("top level must be an object")
    for k in REQUIRED:
        if not str(data.get(k, "")).strip():
            raise DataError("'%s' is required" % k)
    d = dict(DEFAULTS)
    d.update(data)
    if d["sign_department"] is None:
        d["sign_department"] = d["department"]
    if not d["sign_date"]:
        d["sign_date"] = d["post_date"]
    if not isinstance(d["details"], list) or not isinstance(d["notes"], list):
        raise DataError("'details' and 'notes' must be lists")
    rows = []
    for i, r in enumerate(d["details"]):
        if not isinstance(r, dict) or "label" not in r or "value" not in r:
            raise DataError("details[%d] needs 'label' and 'value'" % i)
        rows.append([str(r["label"]), str(r["value"])])
    d["details"] = rows
    d["notes"] = [str(x) for x in d["notes"]]
    if d["image"]:
        path = d["image"]
        if not os.path.isabs(path):
            path = os.path.join(base_dir, path)
        if not os.path.exists(path):
            raise DataError("image not found: %s" % path)
        if os.path.splitext(path)[1].lower() not in (".png", ".jpg", ".jpeg"):
            raise DataError("image must be .png, .jpg or .jpeg")
        d["image"] = path
    return d


def text_of(xml):
    return "".join(T_RE.findall(xml))


def set_text(block, new_text):
    first = True
    out, pos = [], 0
    for m in T_RE.finditer(block):
        out.append(block[pos:m.start()])
        out.append('<w:t xml:space="preserve">%s</w:t>' % (escape(str(new_text)) if first else ""))
        first = False
        pos = m.end()
    out.append(block[pos:])
    return "".join(out)


def _find_block(pattern, xml, anchor):
    for m in pattern.finditer(xml):
        if anchor in m.group(0):
            return m.group(0)
    raise DataError("template anchor not found: %s (was the template modified?)" % anchor)


def rebuild_row(tr, edit):
    out, pos = [], 0
    for i, m in enumerate(TC_RE.finditer(tr)):
        out.append(tr[pos:m.start()])
        out.append(edit(i, m.group(0)))
        pos = m.end()
    out.append(tr[pos:])
    return "".join(out)


def expand_list(xml, anchors, values):
    tmpl = _find_block(P_RE, xml, anchors[0])
    for a in anchors[1:]:
        xml = xml.replace(_find_block(P_RE, xml, a), "", 1)
    return xml.replace(tmpl, "".join(set_text(tmpl, v) for v in values), 1)


def expand_table_rows(xml, anchors, rows):
    tmpl = _find_block(TR_RE, xml, anchors[0])
    for a in anchors[1:]:
        xml = xml.replace(_find_block(TR_RE, xml, a), "", 1)
    built = [rebuild_row(tmpl, lambda i, c, row=row: set_text(c, row[i]) if i < len(row) else c)
             for row in rows]
    return xml.replace(tmpl, "".join(built), 1)


def remove_block(pattern, xml, anchor):
    return xml.replace(_find_block(pattern, xml, anchor), "", 1)


def remove_table_with(xml, anchor):
    for m in re.finditer(r"<w:tbl>.*?</w:tbl>", xml, re.S):
        if anchor in m.group(0):
            return xml.replace(m.group(0), "", 1)
    raise DataError("template table not found: %s" % anchor)


# --- image handling -----------------------------------------------------------

def image_size(path):
    """(width, height) in pixels for PNG or JPEG, standard library only."""
    with open(path, "rb") as f:
        head = f.read(26)
        if head[:8] == b"\x89PNG\r\n\x1a\n":
            w, h = struct.unpack(">II", head[16:24])
            return w, h
        f.seek(0)
        data = f.read()
    if data[:2] != b"\xff\xd8":
        raise DataError("unsupported image format: %s" % path)
    i = 2
    while i < len(data):
        if data[i] != 0xFF:
            i += 1
            continue
        marker = data[i + 1]
        if marker in (0xC0, 0xC1, 0xC2):
            h, w = struct.unpack(">HH", data[i + 5:i + 9])
            return w, h
        seg_len = struct.unpack(">H", data[i + 2:i + 4])[0]
        i += 2 + seg_len
    raise DataError("could not read JPEG size: %s" % path)


def crop_rect(img_w, img_h):
    """Percent crop (l, t, r, b, in 1/1000 %) that gives the image the box's aspect."""
    box_aspect = BOX_W_DXA / float(BOX_H_DXA)
    img_aspect = img_w / float(img_h)
    if img_aspect > box_aspect:            # too wide: trim left/right
        frac = 1.0 - box_aspect / img_aspect
        side = int(round(frac / 2 * 100000))
        return side, 0, side, 0
    frac = 1.0 - img_aspect / box_aspect   # too tall: trim top/bottom
    side = int(round(frac / 2 * 100000))
    return 0, side, 0, side


def drawing_xml(rid, name, l, t, r, b):
    cx, cy = BOX_W_DXA * EMU_PER_DXA, BOX_H_DXA * EMU_PER_DXA
    return (
        '<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/>'
        '<w:jc w:val="center"/></w:pPr><w:r><w:drawing>'
        '<wp:inline distT="0" distB="0" distL="0" distR="0">'
        '<wp:extent cx="%(cx)d" cy="%(cy)d"/><wp:effectExtent l="0" t="0" r="0" b="0"/>'
        '<wp:docPr id="101" name="notice image"/>'
        '<wp:cNvGraphicFramePr><a:graphicFrameLocks '
        'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>'
        '</wp:cNvGraphicFramePr>'
        '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
        '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
        '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'
        '<pic:nvPicPr><pic:cNvPr id="0" name="%(name)s"/><pic:cNvPicPr/></pic:nvPicPr>'
        '<pic:blipFill><a:blip r:embed="%(rid)s"/>'
        '<a:srcRect l="%(l)d" t="%(t)d" r="%(r)d" b="%(b)d"/>'
        '<a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
        '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="%(cx)d" cy="%(cy)d"/></a:xfrm>'
        '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
        '</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'
        % dict(cx=cx, cy=cy, rid=rid, name=escape(name), l=l, t=t, r=r, b=b)
    )


def place_image(xml, rid, image_path):
    """Replace the placeholder cell content with the picture; drop the dashed
    frame and grey fill so the photo sits flush in the box."""
    tr = _find_block(TR_RE, xml, ">IMAGE<")
    cell = TC_RE.search(tr).group(0)
    w, h = image_size(image_path)
    l, t, r, b = crop_rect(w, h)
    tcpr = re.search(r"<w:tcPr>.*?</w:tcPr>", cell, re.S).group(0)
    new_tcpr = re.sub(r"<w:tcBorders>.*?</w:tcBorders>", "", tcpr, flags=re.S)
    new_tcpr = re.sub(r"<w:shd [^>]*/>", "", new_tcpr)
    new_tcpr = new_tcpr.replace(
        "</w:tcPr>",
        '<w:tcMar><w:top w:w="0" w:type="dxa"/><w:left w:w="0" w:type="dxa"/>'
        '<w:bottom w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tcMar></w:tcPr>')
    # schema order inside tcPr: tcW, ..., tcBorders, shd, ..., tcMar, ..., vAlign
    new_tcpr = new_tcpr.replace('<w:vAlign w:val="center"/>', "")
    new_tcpr = new_tcpr.replace("</w:tcPr>", '<w:vAlign w:val="center"/></w:tcPr>')
    new_cell = "<w:tc>" + new_tcpr + drawing_xml(rid, os.path.basename(image_path), l, t, r, b) + "</w:tc>"
    return xml.replace(tr, tr.replace(cell, new_cell, 1), 1)


def add_image_rel(rels_xml, target):
    ids = [int(x) for x in re.findall(r'Id="rId(\d+)"', rels_xml)]
    rid = "rId%d" % (max(ids) + 1 if ids else 1)
    rel = ('<Relationship Id="%s" Type="http://schemas.openxmlformats.org/officeDocument/2006/'
           'relationships/image" Target="%s"/>' % (rid, target))
    return rels_xml.replace("</Relationships>", rel + "</Relationships>"), rid


def ensure_content_type(ct_xml, ext):
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg"}[ext]
    if 'Extension="%s"' % ext in ct_xml:
        return ct_xml
    return ct_xml.replace("<Types", "<Types", 1).replace(
        "</Types>", '<Default ContentType="%s" Extension="%s"/></Types>' % (mime, ext))


# --- document assembly ---------------------------------------------------------

def build_document(xml, d, image_rid):
    # Repeating blocks first, while their anchors are intact.
    if d["details"]:
        xml = expand_table_rows(xml, [">일시<", ">장소<", ">대상<", ">준비사항<"], d["details"])
    else:
        xml = remove_table_with(xml, ">일시<")
        xml = remove_block(P_RE, xml, "   주요 내용")
    if d["notes"]:
        xml = expand_list(xml, ["첫 번째 유의사항을 입력하세요.", "두 번째 유의사항을 입력하세요.",
                                "세 번째 유의사항을 입력하세요."], d["notes"])
    else:
        for a in ("첫 번째 유의사항을 입력하세요.", "두 번째 유의사항을 입력하세요.",
                  "세 번째 유의사항을 입력하세요."):
            xml = remove_block(P_RE, xml, a)
        xml = remove_block(P_RE, xml, "   유의사항")

    if image_rid:
        xml = place_image(xml, image_rid, d["image"])

    # Ordered replacements: strings that contain other placeholders go first,
    # and duplicated placeholders are replaced one occurrence at a time.
    xml = xml.replace(escape("2026. 00. 00. ~ 2026. 00. 00."), escape(d["period"]), 1)
    xml = xml.replace(escape("2026. 00. 00."), escape(d["post_date"]), 1)
    xml = xml.replace(escape("2026. 00. 00."), escape(d["sign_date"]), 1)
    xml = xml.replace(escape("○○팀"), escape(d["department"]), 1)
    xml = xml.replace(escape("○○팀"), escape(d["sign_department"]), 1)
    doc_no = ("문서번호  " + d["doc_no"]) if d["doc_no"] else ""
    mapping = [
        ("[공지 제목을 입력하세요]", d["title"]),
        ("공지의 핵심 내용을 한 줄로 요약해 주세요.", d["summary"]),
        ("문서번호  NT-2026-000", doc_no),
        ("담당자 이름 / 내선 000", d["contact"]),
        ("   개요", "   " + d["overview_title"]),
        ("   주요 내용", "   " + d["details_title"]),
        ("   유의사항", "   " + d["notes_title"]),
        ("공지의 배경과 목적을 2~3문장으로 작성하세요. 임직원이 이 공지를 통해 무엇을 알아야 하고, "
         "어떤 행동을 해야 하는지 명확히 전달합니다.", d["overview"]),
        ("○○○○ 주식회사", d["company"]),
    ]
    for key, val in mapping:
        xml = xml.replace(escape(key), escape(str(val)))
    return xml


def build_footer(xml, d):
    xml = xml.replace(escape("○○○○ 주식회사"), escape(d["company"]))
    xml = xml.replace(escape("본 공지는 사내 게시용이며 외부 반출을 금합니다."), escape(d["footer_note"]))
    return xml


def fill(template, data_path, out_path):
    with open(data_path, encoding="utf-8") as f:
        try:
            raw = json.load(f)
        except json.JSONDecodeError as exc:
            raise DataError("invalid JSON in %s: %s" % (data_path, exc))
    data = normalize(raw, os.path.dirname(os.path.abspath(data_path)))

    image_rid, image_target = None, None
    if data["image"]:
        ext = os.path.splitext(data["image"])[1].lower().lstrip(".")
        image_target = "media/notice_image.%s" % ext

    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    tmp_path = out_path + ".tmp"
    with zipfile.ZipFile(template) as zin, zipfile.ZipFile(tmp_path, "w", zipfile.ZIP_DEFLATED) as zout:
        rels = zin.read("word/_rels/document.xml.rels").decode("utf-8")
        if image_target:
            rels, image_rid = add_image_rel(rels, image_target)
        for item in zin.infolist():
            buf = zin.read(item.filename)
            if item.filename == "word/document.xml":
                buf = build_document(buf.decode("utf-8"), data, image_rid).encode("utf-8")
            elif item.filename == "word/footer1.xml":
                buf = build_footer(buf.decode("utf-8"), data).encode("utf-8")
            elif item.filename == "word/_rels/document.xml.rels":
                buf = rels.encode("utf-8")
            elif item.filename == "[Content_Types].xml" and image_target:
                buf = ensure_content_type(buf.decode("utf-8"), image_target.rsplit(".", 1)[1]).encode("utf-8")
            zout.writestr(item, buf)
        if image_target:
            with open(data["image"], "rb") as f:
                zout.writestr("word/" + image_target, f.read())
    shutil.move(tmp_path, out_path)

    with zipfile.ZipFile(out_path) as z:
        body = text_of(z.read("word/document.xml").decode("utf-8"))
    leftover = re.findall(r"\[[^\]\n]{1,60}\]", body)
    if "입력하세요" in body or "○○" in body:
        leftover.append("template sample text still present (입력하세요 / ○○)")
    return data, leftover


def preview_pages(docx_path):
    """Render through Word and return the page count, or None if tools are missing."""
    try:
        from docx2pdf import convert
        import fitz
    except ImportError:
        return None
    pdf = os.path.splitext(docx_path)[0] + ".pdf"
    convert(docx_path, pdf)
    doc = fitz.open(pdf)
    n = len(doc)
    png = os.path.splitext(docx_path)[0] + "_preview.png"
    doc[0].get_pixmap(dpi=100).save(png)
    doc.close()
    os.remove(pdf)
    return n, png


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--data", required=True, help="JSON file with the notice content")
    ap.add_argument("--output", required=True, help="path of the .docx to write")
    ap.add_argument("--template", default=DEFAULT_TEMPLATE, help="override the bundled template")
    ap.add_argument("--preview", action="store_true",
                    help="render with Word and report page count + preview PNG (needs docx2pdf, pymupdf)")
    args = ap.parse_args()

    if not os.path.exists(args.template):
        sys.exit("template not found: %s" % args.template)
    try:
        data, leftover = fill(args.template, args.data, args.output)
    except DataError as exc:
        sys.exit("data error: %s" % exc)

    print("written:", os.path.abspath(args.output))
    print("title:", data["title"])
    print("rows: details=%d | bullets: notes=%d | image: %s" % (
        len(data["details"]), len(data["notes"]), "yes" if data["image"] else "placeholder box kept"))
    if leftover:
        print("WARNING unfilled placeholders:", leftover)
    if args.preview:
        res = preview_pages(args.output)
        if res is None:
            print("preview skipped: docx2pdf / pymupdf not installed")
        else:
            n, png = res
            print("pages: %d | preview: %s" % (n, png))
            if n > 1:
                print("WARNING: notice spills onto %d pages; shorten overview/details/notes" % n)


if __name__ == "__main__":
    main()
