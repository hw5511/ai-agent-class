"""A1/5 비교 · 읽어서 옮기기 vs 구조 파악: two panels, thin hairline border. Left (A안) - the mascot
opens PDFs one at a time, a row of numbered pages "1 ... 200" and a long meter that fills up as the
repeats pile up. Right (B안) - two concrete sub-steps: check a few sample PDFs and mark the table
area, then write one short extract script and run it once to produce 200 files and one spreadsheet."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

LX, LY, LW, LH = 90, 170, 560, 580
RX, RY, RW, RH = 700, 170, 1002, 580
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]

b += [text(LX + LW / 2, LY + 44, "A안", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 80, "하나씩 읽어서 옮기기", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 44, "B안", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 80, "구조 파악 → 스크립트", 24, 600, MUTED)]

content_top = LY + 130

# ---------- Left panel (A안): mascot opens one PDF, a row of 200 numbered pages, a filling meter ----------
MS = 0.42
mx, my = LX + 46, content_top + 6
b += [mascot(mx, my, MS)]
doc_x, doc_y = mx + 240 * MS + 34, my + 8
b += [path(f"M{mx + 240*MS - 6} {my + 71*MS}C{mx + 240*MS + 20} {my + 71*MS} {doc_x - 20} {doc_y + 45} {doc_x} {doc_y + 45}", color=RED)]
b += [doc(doc_x, doc_y, 66, -3, RED)]
b += [badge(mx + 40, my - 26, 1)]
b += [text(LX + LW - 30, my + 45, "PDF 열기 → 표 읽기 → 옮기기", 20, 700, INK, anchor="end")]

# a row of small numbered pages standing in for the 200 PDFs (a few real, the rest a fading strip)
row_y = content_top + 170
row_x0 = LX + 40
tile_w, tile_h, gap = 46, 60, 10
labels = ["1", "2", "3", "···", "200"]
for i, lab in enumerate(labels):
    tx = row_x0 + i * (tile_w + gap)
    dim = lab == "···"
    op = 0.35 if dim else 1.0
    fill = "#fff"
    stroke = LINE2 if not dim else "none"
    if dim:
        b.append(text(tx + tile_w / 2, row_y + tile_h / 2 + 10, "···", 26, 800, MUTED))
    else:
        b.append(f'<rect x="{tx}" y="{row_y}" width="{tile_w}" height="{tile_h}" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="2" opacity="{op}"/>')
        b.append(f'<rect x="{tx+8}" y="{row_y+12}" width="{tile_w-16}" height="5" rx="2.5" fill="{PAPER_LINE}"/>')
        b.append(f'<rect x="{tx+8}" y="{row_y+24}" width="{tile_w-24}" height="5" rx="2.5" fill="{PAPER_LINE}"/>')
        b.append(text(tx + tile_w / 2, row_y + tile_h + 24, lab, 18, 800, RED if lab == "200" else MUTED))
b += [text(row_x0 - 10, row_y - 18, "1/200", 18, 700, MUTED, anchor="start")]
b += [text(row_x0 + 4 * (tile_w + gap) + tile_w + 10, row_y - 18, "200/200", 18, 700, RED, anchor="end")]

# a long meter that fills up as the repeats pile up
meter_y = row_y + tile_h + 60
meter_x, meter_w, meter_h = LX + 40, LW - 80, 26
b += [f'<rect x="{meter_x}" y="{meter_y}" width="{meter_w}" height="{meter_h}" rx="13" fill="{PANEL}" stroke="{LINE2}" stroke-width="2"/>']
b += [f'<rect x="{meter_x}" y="{meter_y}" width="{meter_w}" height="{meter_h}" rx="13" fill="{RED}" opacity="0.85"/>']
b += [text(LX + LW / 2, meter_y + meter_h + 34, "x 200 반복 · 시간 오래 걸림", 22, 800, RED)]

# ---------- Right panel (B안): two concrete sub-steps ----------
SW = (RW - 40 * 3) / 2
S1X = RX + 40
S2X = S1X + SW + 40
sub_y = content_top - 10
sub_h = RY + RH - sub_y - 15

b += [part_box(S1X, sub_y, SW, sub_h, fill="#fff", stroke=LINE2, corner=16)]
b += [part_box(S2X, sub_y, SW, sub_h, fill="#fff", stroke=LINE2, corner=16)]
b += [badge(S1X + 26, sub_y, 2)]
b += [badge(S2X + 26, sub_y, 3)]
b += [text(S1X + SW / 2, sub_y + 44, "표본 3개로 구조 파악", 24, 800, INK)]
b += [text(S2X + SW / 2, sub_y + 44, "스크립트 작성 · 실행", 24, 800, INK)]

# sub-step 1: three sample PDFs, the middle one with the table area marked
sam_y = sub_y + 90
sam_w, sam_h, sam_gap = 78, 100, 22
sam_x0 = S1X + (SW - (3 * sam_w + 2 * sam_gap)) / 2
for i in range(3):
    sx = sam_x0 + i * (sam_w + sam_gap)
    b.append(doc(sx, sam_y, sam_w, 0, ACCENT))
    if i == 1:
        # dashed rect marking the table area on the middle sample
        b.append(f'<rect x="{sx + 10}" y="{sam_y + 46}" width="{sam_w - 20}" height="34" rx="4" fill="none" stroke="{RED}" stroke-width="3" stroke-dasharray="6 5"/>')
b += [text(S1X + SW / 2, sam_y + sam_h + 44, "표 영역 확인", 22, 700, ACCENT_DARK)]

# fill the empty lower half: the mascot checks the marked sample with a magnifier, plus a location note
mfx, mfy = S1X + SW / 2, sam_y + sam_h + 80
b += [mascot(mfx - 50, mfy, 0.42)]
b += [icon_search(mfx + 44, mfy + 8, 17, ACCENT)]
note_w, note_h = SW - 40, 56
note_x, note_y = S1X + 20, mfy + 78
b += [f'<rect x="{note_x}" y="{note_y}" width="{note_w}" height="{note_h}" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>']
b += [text(S1X + SW / 2, note_y + note_h / 2 - 6, "표 위치: 2쪽 상단, 5열", 18, 800, ACCENT_DARK)]
b += [text(S1X + SW / 2, note_y + note_h / 2 + 18, "3개 모두 동일", 15, 600, MUTED)]

# sub-step 2: a mini editor with a few readable pdfplumber lines, then a terminal that produces
# 200 files and one spreadsheet
ed_x, ed_y, ed_w, ed_h = S2X + (SW - 400) / 2, sub_y + 86, 400, 158
code_lines = [
    ("import pdfplumber", "#7fd7ff"),
    ("with pdfplumber.open(f) as pdf:", "#e6e8eb"),
    ("    t = pdf.pages[0].extract_table()", "#e6e8eb"),
]
code_body = "".join(text(16, 26 + i * 28, ln, 17, 700, col, anchor="start", family=MONO) for i, (ln, col) in enumerate(code_lines))
b += [window(ed_x, ed_y, ed_w, ed_h, kind="terminal", title="extract.py", body=code_body)]

term_x, term_y, term_w, term_h = ed_x, ed_y + ed_h + 34, 400, 96
b += [connector(ed_x + ed_w / 2, ed_y + ed_h, term_x + term_w / 2, term_y, head=False)]
term_body = text(16, 30, "$ python extract.py", 18, 700, "#e6e8eb", anchor="start", family=MONO)
b += [window(term_x, term_y, term_w, term_h, kind="terminal", title="terminal", body=term_body)]
b += [check(term_x + term_w - 22, term_y - 12, 18)]
b += [text(term_x + term_w / 2, term_y + term_h + 38, "200개 표 → 스프레드시트 1개", 18, 800, ACCENT_MID)]

print(save("a1-why-compare-ab.svg", b, "A1/5 비교 · 읽어서 옮기기 vs 구조 파악 (tools/illus/a1_why_compare_ab.py)"))
