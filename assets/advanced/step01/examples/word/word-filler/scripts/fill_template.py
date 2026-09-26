"""Fill the bundled Word report template (assets/보고서_템플릿.docx) from a JSON file.

Usage:
    python fill_template.py --data DATA.json --output REPORT.docx [--template T.docx]

The template is copied byte-for-byte; only word/document.xml, word/header1.xml
and word/settings.xml are rewritten. Placeholders in [brackets] are replaced,
bullet paragraphs and table rows are cloned to match the number of data items,
and Word is told to refresh the table of contents on open.

Exit code 1 with a readable message when the JSON does not fit the template.
"""

import argparse
import json
import os
import re
import shutil
import sys
import zipfile
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_TEMPLATE = os.path.join(HERE, "..", "assets", "보고서_템플릿.docx")

P_RE = re.compile(r"<w:p>.*?</w:p>", re.S)
TR_RE = re.compile(r"<w:tr>.*?</w:tr>", re.S)
TC_RE = re.compile(r"<w:tc>.*?</w:tc>", re.S)
T_RE = re.compile(r"<w:t(?: [^>]*)?>([^<]*)</w:t>")

# section -> (required keys, optional keys with defaults)
SCHEMA = {
    "cover": (["title", "company"],
              {"subtitle": "", "report_no": "", "date": "", "author": "",
               "recipient": "", "grade": "일반", "department": ""}),
    "overview": (["background"], {"scope_desc": "", "scope_items": []}),
    "analysis": ([], {"current_desc": "", "table_caption": "현황 데이터 요약",
                      "table_rows": [], "problem_desc": "", "problems": []}),
    "plan": ([], {"strategy_desc": "", "callout_title": "핵심 추진 전략",
                  "callout_body": "", "schedule_caption": "추진 일정표",
                  "schedule": [], "budget_desc": ""}),
    "effects": ([], {"intro": "", "quantitative": [], "qualitative": ""}),
    "conclusion": (["summary"], {"recommend_desc": "", "recommendations": [],
                                 "approval": {}}),
    "appendix": ([], {"desc": "", "items": []}),
}


class DataError(Exception):
    pass


def normalize(data):
    """Fill defaults and fail early on missing required keys."""
    out = {}
    for section, (required, optional) in SCHEMA.items():
        src = data.get(section)
        if src is None:
            if required:
                raise DataError("missing section '%s' (needs %s)" % (section, ", ".join(required)))
            src = {}
        if not isinstance(src, dict):
            raise DataError("section '%s' must be an object" % section)
        for k in required:
            if not str(src.get(k, "")).strip():
                raise DataError("'%s.%s' is required" % (section, k))
        merged = dict(optional)
        merged.update(src)
        out[section] = merged
    for i, r in enumerate(out["analysis"]["table_rows"]):
        for k in ("item", "current", "target", "rate"):
            if k not in r:
                raise DataError("analysis.table_rows[%d] is missing '%s'" % (i, k))
    for i, r in enumerate(out["analysis"]["problems"]):
        if isinstance(r, dict) and not ("problem" in r and "cause" in r):
            raise DataError("analysis.problems[%d] needs 'problem' and 'cause'" % i)
    for i, r in enumerate(out["plan"]["schedule"]):
        for k in ("activity", "period", "owner"):
            if k not in r:
                raise DataError("plan.schedule[%d] is missing '%s'" % (i, k))
        r.setdefault("stage", "%d단계" % (i + 1))
    return out


def text_of(xml):
    return "".join(T_RE.findall(xml))


def set_text(block, new_text):
    """Replace the text of the first <w:t> in block and empty the others."""
    first = True
    out = []
    pos = 0
    for m in T_RE.finditer(block):
        out.append(block[pos:m.start()])
        out.append('<w:t xml:space="preserve">%s</w:t>' % (escape(str(new_text)) if first else ""))
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
        % escape(str(value))
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
    raise DataError("template anchor not found: %s (was the template modified?)" % anchor)


def expand_list(xml, anchor_texts, values, formatter=str):
    """Clone the paragraph holding anchor_texts[0] once per value; drop the
    sibling placeholder paragraphs. Siblings are removed before the data is
    inserted so data text containing an anchor string is never deleted."""
    tmpl = _find_block(P_RE, xml, anchor_texts[0])
    for a in anchor_texts[1:]:
        xml = xml.replace(_find_block(P_RE, xml, a), "", 1)
    new = "".join(set_text(tmpl, formatter(v)) for v in values)
    return xml.replace(tmpl, new, 1)


def rebuild_row(tr, edit):
    """Rebuild a <w:tr> by editing cells by position. Cells in one row often
    have identical XML (two empty cells, two "[000]" cells), so str.replace
    would hit the wrong cell; positional rebuild avoids that."""
    out = []
    pos = 0
    for i, m in enumerate(TC_RE.finditer(tr)):
        out.append(tr[pos:m.start()])
        out.append(edit(i, m.group(0)))
        pos = m.end()
    out.append(tr[pos:])
    return "".join(out)


def expand_table_rows(xml, anchor_texts, rows):
    tmpl = _find_block(TR_RE, xml, anchor_texts[0])
    for a in anchor_texts[1:]:
        xml = xml.replace(_find_block(TR_RE, xml, a), "", 1)
    built = []
    for row in rows:
        built.append(rebuild_row(tmpl, lambda i, cell: set_text(cell, row[i]) if i < len(row) else cell))
    return xml.replace(tmpl, "".join(built), 1)


def fill_approval(xml, approval):
    """Approval table: header 구분|작성자|검토자|승인자, rows 성명/직위/서명/일자."""
    row_keys = {"성명": "name", "직위": "position", "서명": "sign", "일자": "date"}
    col_roles = ["작성자", "검토자", "승인자"]
    for label, key in row_keys.items():
        for m in TR_RE.finditer(xml):
            tr = m.group(0)
            cells = TC_RE.findall(tr)
            if len(cells) == 4 and text_of(cells[0]) == label:
                def edit(i, cell):
                    if i == 0:
                        return cell
                    val = (approval.get(col_roles[i - 1]) or {}).get(key, "")
                    return fill_empty_cell(cell, val)
                xml = xml.replace(tr, rebuild_row(tr, edit), 1)
                break
    return xml


def problem_text(x):
    if isinstance(x, dict):
        return "%s: %s" % (x["problem"], x["cause"])
    return str(x)


def build_document(xml, d):
    c, o, a, p, e, k, ap = (d["cover"], d["overview"], d["analysis"], d["plan"],
                            d["effects"], d["conclusion"], d["appendix"])

    # Repeating blocks first, while their anchors are still intact.
    xml = expand_list(xml, ["[범위 항목 1]", "[범위 항목 2]", "[범위 항목 3]"], o["scope_items"])
    xml = expand_list(xml, ["[문제점 1]", "[문제점 2]", "[문제점 3]"], a["problems"], problem_text)
    xml = expand_list(xml, ["[매출 증가", "[비용 절감", "[생산성 향상"], e["quantitative"])
    xml = expand_list(xml, ["[건의 사항 1]", "[건의 사항 2]", "[건의 사항 3]"], k["recommendations"])
    xml = expand_list(xml, ["[참고 자료 1]", "[참고 자료 2]", "[참고 자료 3]"], ap["items"])
    xml = expand_table_rows(xml, ["[항목 1]", "[항목 2]", "[항목 3]", "[항목 4]"],
                            [[r["item"], r["current"], r["target"], r["rate"]] for r in a["table_rows"]])
    xml = expand_table_rows(xml, ["1단계", "2단계", "3단계"],
                            [[r["stage"], r["activity"], r["period"], r["owner"]] for r in p["schedule"]])
    xml = fill_approval(xml, k["approval"])

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
    """Ask Word to refresh the TOC field on open (the template's TOC cache is empty)."""
    if "<w:updateFields" in xml:
        return xml
    return xml.replace("<w:compat>", '<w:updateFields w:val="true"/><w:compat>', 1)


def fill(template, data_path, out_path):
    with open(data_path, encoding="utf-8") as f:
        try:
            raw = json.load(f)
        except json.JSONDecodeError as exc:
            raise DataError("invalid JSON in %s: %s" % (data_path, exc))
    data = normalize(raw)

    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    tmp_path = out_path + ".tmp"
    with zipfile.ZipFile(template) as zin, zipfile.ZipFile(tmp_path, "w", zipfile.ZIP_DEFLATED) as zout:
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

    with zipfile.ZipFile(out_path) as z:
        body = text_of(z.read("word/document.xml").decode("utf-8"))
    leftover = [x for x in re.findall(r"\[[^\]\n]{1,60}\]", body) if not x.startswith("[표 ")]
    return data, leftover


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--data", required=True, help="JSON file with the report content")
    ap.add_argument("--output", required=True, help="path of the .docx to write")
    ap.add_argument("--template", default=DEFAULT_TEMPLATE, help="override the bundled template")
    args = ap.parse_args()

    if not os.path.exists(args.template):
        sys.exit("template not found: %s" % args.template)
    try:
        data, leftover = fill(args.template, args.data, args.output)
    except DataError as exc:
        sys.exit("data error: %s" % exc)

    print("written:", os.path.abspath(args.output))
    print("title:", data["cover"]["title"])
    print("rows: table1=%d schedule=%d | bullets: scope=%d problems=%d effects=%d recommendations=%d references=%d" % (
        len(data["analysis"]["table_rows"]), len(data["plan"]["schedule"]),
        len(data["overview"]["scope_items"]), len(data["analysis"]["problems"]),
        len(data["effects"]["quantitative"]), len(data["conclusion"]["recommendations"]),
        len(data["appendix"]["items"])))
    if leftover:
        print("WARNING unfilled placeholders:", leftover)


if __name__ == "__main__":
    main()
