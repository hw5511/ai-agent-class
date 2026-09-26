"""Print the outline, tables and bullet lists of a filled report or notice so the
content can be checked against the source data without opening Word.

Usage:
    python verify_output.py OUTPUT.docx

Exit code 1 when template placeholders are still present.
"""

import re
import sys
import zipfile

P_RE = re.compile(r"<w:p>.*?</w:p>", re.S)
TR_RE = re.compile(r"<w:tr>.*?</w:tr>", re.S)
TC_RE = re.compile(r"<w:tc>.*?</w:tc>", re.S)
T_RE = re.compile(r"<w:t(?: [^>]*)?>([^<]*)</w:t>")


def text_of(xml):
    return "".join(T_RE.findall(xml))


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    path = sys.argv[1]
    with zipfile.ZipFile(path) as z:
        doc = z.read("word/document.xml").decode("utf-8")
        names = z.namelist()
        hdr = z.read("word/header1.xml").decode("utf-8") if "word/header1.xml" in names else ""
        ftr = z.read("word/footer1.xml").decode("utf-8") if "word/footer1.xml" in names else ""

    body = re.search(r"<w:body>(.*)</w:body>", doc, re.S).group(1)
    if hdr:
        print("== header:", text_of(hdr).replace("\t", " | "))
    if ftr:
        print("== footer:", text_of(ftr).replace("\t", " | "))
    print("== images:", len(re.findall(r"<w:drawing>", body)))
    print("== body")
    for m in re.finditer(r"(<w:tbl>.*?</w:tbl>)|(<w:p>.*?</w:p>)", body, re.S):
        if m.group(1):
            print("  [table]")
            for tr in TR_RE.findall(m.group(1)):
                print("    " + " | ".join(text_of(tc) for tc in TC_RE.findall(tr)))
            continue
        p = m.group(2)
        t = text_of(p).strip()
        if not t:
            continue
        style = re.search(r'<w:pStyle w:val="([^"]+)"', p)
        s = style.group(1) if style else ""
        if s.startswith("Heading"):
            print(("  " if s == "Heading1" else "    ") + "# " + t)
        elif s == "ListParagraph" or "<w:numPr>" in p:
            print("      - " + t)
        else:
            print("      " + (t if len(t) <= 100 else t[:97] + "..."))

    plain = text_of(body)
    leftover = [x for x in re.findall(r"\[[^\]\n]{1,60}\]", plain) if not x.startswith("[표 ")]
    if "입력하세요" in plain or "○○" in plain:
        leftover.append("template sample text (입력하세요 / ○○)")
    if leftover:
        print("\nUNFILLED PLACEHOLDERS:", leftover)
        sys.exit(1)
    print("\nno template placeholders left")


if __name__ == "__main__":
    main()
