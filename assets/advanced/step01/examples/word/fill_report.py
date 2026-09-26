"""Fill 보고서_템플릿.docx with data from a JSON file.

Usage:
    python fill_report.py [data.json] [output.docx]

Defaults: sample_data.json -> 보고서_샘플.docx (same folder as this script).

The template is copied as-is; only word/document.xml, word/header1.xml and
word/settings.xml are rewritten. Placeholders in [brackets] are replaced,
list paragraphs and table rows are cloned to match the number of data items.
"""

import json
import os
import re
import shutil
import sys
import zipfile
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, "보고서_템플릿.docx")

P_RE = re.compile(r"<w:p>.*?</w:p>", re.S)
TR_RE = re.compile(r"<w:tr>.*?</w:tr>", re.S)
TC_RE = re.compile(r"<w:tc>.*?</w:tc>", re.S)
T_RE = re.compile(r"<w:t(?: [^>]*)?>([^<]*)</w:t>")


def text_of(xml):
    return "".join(T_RE.findall(xml))


def set_text(block, new_text):
    """Replace the text of the first <w:t> in block and empty the others."""
    first = True
    out = []
    pos = 0
    for m in T_RE.finditer(block):
        out.append(block[pos:m.start()])
        val = escape(new_text) if first else ""
        out.append('<w:t xml:space="preserve">%s</w:t>' % val)
        first = False
        pos = m.end()
    out.append(block[pos:])
    return "".join(out)


def fill_empty_cell(cell, value):
    """Insert a run into a cell whose paragraph has no runs (approval table)."""
    if not value:
        return cell
    run = (
        '<w:r><w:rPr><w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" '
        'w:hAnsi="Arial"/><w:color w:val="333333"/><w:sz w:val="20"/>'
        '<w:szCs w:val="20"/></w:rPr><w:t xml:space="preserve">%s</w:t></w:r>'
        % escape(value)
    )
    return cell.replace("</w:pPr></w:p>", "</w:pPr>%s</w:p>" % run, 1)


def replace_placeholders(xml, mapping):
    for key, val in mapping.items():
        xml = xml.replace(escape(key), escape(str(val)))
    return xml


def _find_block(pattern, xml, anchor):
    for m in pattern.finditer(xml):
        if anchor in m.group(0):
            return m.group(0)
    raise ValueError("anchor not found: %s" % anchor)


def expand_list(xml, anchor_texts, values, formatter=str):
    """Use the paragraph containing anchor_texts[0] as a template, drop the
    sibling paragraphs containing the other anchors, and emit one paragraph
    per value."""
    tmpl = _find_block(P_RE, xml, anchor_texts[0])
    # Remove sibling template paragraphs before inserting data, so data text
    # that happens to contain an anchor string is never deleted.
    for a in anchor_texts[1:]:
        xml = xml.replace(_find_block(P_RE, xml, a), "", 1)
    new = "".join(set_text(tmpl, formatter(v)) for v in values)
    return xml.replace(tmpl, new, 1)


def expand_table_rows(xml, anchor_texts, rows):
    """Same idea as expand_list, but for table rows; each row is a list of
    cell strings."""
    tmpl = _find_block(TR_RE, xml, anchor_texts[0])
    for a in anchor_texts[1:]:
        xml = xml.replace(_find_block(TR_RE, xml, a), "", 1)
    cells = TC_RE.findall(tmpl)
    built = []
    for row in rows:
        r = tmpl
        for cell, val in zip(cells, row):
            r = r.replace(cell, set_text(cell, val), 1)
        built.append(r)
    return xml.replace(tmpl, "".join(built), 1)


def fill_approval(xml, approval):
    """Approval table: header row 구분|작성자|검토자|승인자, then 성명/직위/서명/일자."""
    row_keys = {"성명": "name", "직위": "position", "서명": "sign", "일자": "date"}
    col_roles = ["작성자", "검토자", "승인자"]
    for label, key in row_keys.items():
        for m in TR_RE.finditer(xml):
            tr = m.group(0)
            cells = TC_RE.findall(tr)
            if len(cells) == 4 and text_of(cells[0]) == label:
                new_tr = tr
                for role, cell in zip(col_roles, cells[1:]):
                    val = approval.get(role, {}).get(key, "")
                    new_tr = new_tr.replace(cell, fill_empty_cell(cell, val), 1)
                xml = xml.replace(tr, new_tr, 1)
                break
    return xml


def build_document(xml, d):
    c, o, a, p, e, k, ap = (d["cover"], d["overview"], d["analysis"], d["plan"],
                            d["effects"], d["conclusion"], d["appendix"])

    # Lists and tables first (anchors still intact)
    xml = expand_list(xml, ["[범위 항목 1]", "[범위 항목 2]", "[범위 항목 3]"],
                      o["scope_items"])
    xml = expand_list(xml, ["[문제점 1]", "[문제점 2]", "[문제점 3]"], a["problems"],
                      lambda x: "%s: %s" % (x["problem"], x["cause"]))
    xml = expand_list(xml, ["[매출 증가", "[비용 절감", "[생산성 향상"],
                      e["quantitative"])
    xml = expand_list(xml, ["[건의 사항 1]", "[건의 사항 2]", "[건의 사항 3]"],
                      k["recommendations"])
    xml = expand_list(xml, ["[참고 자료 1]", "[참고 자료 2]", "[참고 자료 3]"],
                      ap["items"])
    xml = expand_table_rows(xml, ["[항목 1]", "[항목 2]", "[항목 3]", "[항목 4]"],
                            [[r["item"], r["current"], r["target"], r["rate"]]
                             for r in a["table_rows"]])
    xml = expand_table_rows(xml, ["1단계", "2단계", "3단계"],
                            [[r["stage"], r["activity"], r["period"], r["owner"]]
                             for r in p["schedule"]])
    xml = fill_approval(xml, k["approval"])

    # Simple placeholders
    mapping = {
        "[보고서 제목]": c["title"],
        "[부제목 또는 프로젝트명]": c["subtitle"],
        "[RPT-2026-001]": c["report_no"],
        "[2026년 03월 18일]": c["date"],
        "[홍길동 / 기획팀]": c["author"],
        "[김부장 / 경영기획실]": c["recipient"],
        "[일반 / 대외비]": c["grade"],
        "[회사명]": c["company"],
        "[부서명]": c["department"],
        "[보고서 작성의 배경 및 목적을 서술합니다. 프로젝트의 시작 배경, 필요성, 기대 효과 등을 기술하세요.]": o["background"],
        "[보고서에서 다루는 범위와 한계를 명시합니다.]": o["scope_desc"],
        "[현재 상황을 객관적 데이터와 함께 서술합니다.]": a["current_desc"],
        "[표 1] 현황 데이터 요약": "[표 1] " + a["table_caption"],
        "[발견된 문제점과 근본 원인을 분석하여 기술합니다.]": a["problem_desc"],
        "[목표 달성을 위한 세부 전략과 실행 방안을 서술합니다.]": p["strategy_desc"],
        "핵심 추진 전략": p["callout_title"],
        "[핵심 전략 내용을 간결하게 요약하여 기술합니다. 이 박스는 주요 내용을 강조할 때 활용하세요.]": p["callout_body"],
        "[표 2] 추진 일정표": "[표 2] " + p["schedule_caption"],
        "[예산 항목과 금액을 상세히 기술합니다.]": p["budget_desc"],
        "[추진 계획 실행 시 예상되는 정량적/정성적 효과를 기술합니다.]": e["intro"],
        "[브랜드 가치 향상, 직원 만족도 제고, 고객 경험 개선 등 정성적 효과를 기술합니다.]": e["qualitative"],
        "[보고서의 핵심 내용을 요약하고 최종 결론을 도출합니다.]": k["summary"],
        "[의사결정권자에게 건의하는 사항을 명확하게 기술합니다.]": k["recommend_desc"],
        "[참고 문헌, 데이터 출처, 관련 자료 등을 첨부합니다.]": ap["desc"],
    }
    return replace_placeholders(xml, mapping)


def build_header(xml, d):
    return replace_placeholders(xml, {
        "[회사명]": d["cover"]["company"],
        "[보고서 제목]": d["cover"]["title"],
    })


def build_settings(xml):
    # Ask Word to refresh the TOC field on open.
    if "<w:updateFields" in xml:
        return xml
    return xml.replace("<w:compat>", '<w:updateFields w:val="true"/><w:compat>', 1)


def main():
    data_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "sample_data.json")
    out_path = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "보고서_샘플.docx")

    with open(data_path, encoding="utf-8") as f:
        data = json.load(f)

    tmp_path = out_path + ".tmp"
    with zipfile.ZipFile(TEMPLATE) as zin, zipfile.ZipFile(tmp_path, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            buf = zin.read(item.filename)
            if item.filename == "word/document.xml":
                buf = build_document(buf.decode("utf-8"), data).encode("utf-8")
            elif item.filename == "word/header1.xml":
                buf = build_header(buf.decode("utf-8"), data).encode("utf-8")
            elif item.filename == "word/settings.xml":
                buf = build_settings(buf.decode("utf-8")).encode("utf-8")
            zout.writestr(item, buf)
    shutil.move(tmp_path, out_path)

    # Report any placeholders left behind
    with zipfile.ZipFile(out_path) as z:
        leftover = re.findall(r"\[[^\]\n]{1,60}\]", text_of(z.read("word/document.xml").decode("utf-8")))
    leftover = [x for x in leftover if not x.startswith("[표 ")]
    print("written:", out_path)
    if leftover:
        print("unfilled placeholders:", leftover)


if __name__ == "__main__":
    main()
