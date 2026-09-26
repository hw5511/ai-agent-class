"""A1/4 사례 · PDF 200장을 엑셀로: 팀장 의 요청(말풍선)이 위에 오고, 그 아래 표가 보이는 PDF 200장
더미(badge 1) - Claude 가 돋보기로 한 장씩 확인하며 시계 옆 "하루 종일" 문구와 함께 손으로 옮기는
모습(badge 2) - 채워지고 있는 엑셀 시트로 이어지는 한 장면."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

# ---- 팀장 의 요청: a chat bubble with a small speaker label, top and centred ----
b += [bubble(626, 168, 540, 92, "이 PDF 200장 표를 엑셀로 옮겨주세요", 26, "#fff", LINE2, INK2, tail_x=736)]
b += [text(736, 300, "팀장", 22, 800, MUTED)]

# ---- left: the PDF pile, top sheet visibly carrying a small table ----
stack_x, stack_y = 200, 420
for i, (dx, dy, r) in enumerate([(0, 30, -6), (10, 18, -2), (20, 6, 2)]):
    b.append(doc(stack_x + dx, stack_y + dy, 110, r, RED))
# top sheet: a blank paper silhouette (no generic lines) carrying a real-looking table
top_x, top_y, top_w = stack_x + 30, stack_y + 6, 110
top_h = top_w * 1.25
b += [(f'<g transform="translate({top_x} {top_y})">'
       f'<path d="M6 2h{top_w * 0.56:.0f}l{top_w * 0.31:.0f} {top_w * 0.31:.0f}v{top_h - top_w * 0.09:.0f}a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" '
       f'fill="#fff" stroke="{RED}" stroke-width="2.5"/>'
       f'<path d="M{top_w * 0.66:.0f} 2v{top_w * 0.25:.0f}a4 4 0 0 0 4 4h{top_w * 0.25:.0f}" fill="none" stroke="{RED}" stroke-width="2.5"/></g>')]
tb_x, tb_y, tb_w, tb_h = top_x + 12, top_y + 38, top_w - 24, 78
b += [f'<rect x="{tb_x}" y="{tb_y}" width="{tb_w}" height="{tb_h}" fill="none" stroke="{LINE2}" stroke-width="2"/>']
for i in (1, 2):
    ry = tb_y + tb_h * i / 3
    b.append(f'<line x1="{tb_x}" y1="{ry:.0f}" x2="{tb_x + tb_w}" y2="{ry:.0f}" stroke="{LINE2}" stroke-width="1.5"/>')
b += [f'<line x1="{tb_x + tb_w * 0.5:.0f}" y1="{tb_y}" x2="{tb_x + tb_w * 0.5:.0f}" y2="{tb_y + tb_h}" stroke="{LINE2}" stroke-width="1.5"/>']
b += [text(400, 636, "표 있는 PDF 200장", 30, 900, INK)]
b += [badge(160, 400, 1)]

# ---- middle: Claude at a small desk, the open page set beside it (not covering it), magnifier over the page ----
b += [mascot(700, 460)]
DESK2_X, DESK2_Y, DESK2_W = 955, 560, 170
b += [desk(DESK2_X, DESK2_Y, DESK2_W, None, body_h=50)]
doc2_w = 88
doc2_h = doc2_w * 1.25
doc2_x = DESK2_X + (DESK2_W - doc2_w) / 2
doc2_y = DESK2_Y + 8 - doc2_h
b += [doc(doc2_x, doc2_y, doc2_w, -3, ACCENT)]
b += [icon_search(doc2_x + doc2_w * 0.56, doc2_y + doc2_h * 0.5, 24, INK, 6)]
b += [text(800, 660, "하나씩 열어 확인", 26, 800, MUTED)]
clk_cx, clk_cy, clk_r = 700, 386, 30
b += [f'<circle cx="{clk_cx}" cy="{clk_cy}" r="{clk_r}" fill="#fff" stroke="{MUTED}" stroke-width="4"/>']
b += [f'<line x1="{clk_cx}" y1="{clk_cy}" x2="{clk_cx}" y2="{clk_cy - clk_r * 0.55:.0f}" stroke="{INK2}" stroke-width="4" stroke-linecap="round"/>']
b += [f'<line x1="{clk_cx}" y1="{clk_cy}" x2="{clk_cx + clk_r * 0.4:.0f}" y2="{clk_cy}" stroke="{INK2}" stroke-width="4" stroke-linecap="round"/>']
b += [text(clk_cx, clk_cy + clk_r + 34, "하루 종일", 22, 800, MUTED)]
b += [badge(doc2_x + doc2_w + 34, doc2_y - 6, 2)]

b += [path("M470 500C560 500 620 480 680 470")]
b += [path(f"M{doc2_x + doc2_w + 10:.0f} {doc2_y + doc2_h * 0.6:.0f}C1150 {doc2_y + doc2_h * 0.6:.0f} 1190 540 1230 540")]

# ---- right: the Excel sheet receiving the values by hand ----
sheet_x, sheet_y, sheet_w, sheet_h = 1260, 380, 400, 260
b += [f'<rect x="{sheet_x}" y="{sheet_y}" width="{sheet_w}" height="{sheet_h}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#sh)"/>']
for i in range(1, 5):
    yy = sheet_y + i * 52
    b.append(f'<line x1="{sheet_x}" y1="{yy}" x2="{sheet_x + sheet_w}" y2="{yy}" stroke="{PAPER_LINE}" stroke-width="2"/>')
col2_x = sheet_x + sheet_w * 0.4
b += [f'<line x1="{col2_x}" y1="{sheet_y}" x2="{col2_x}" y2="{sheet_y + sheet_h}" stroke="{PAPER_LINE}" stroke-width="2"/>']
b += [text(sheet_x + sheet_w / 2, sheet_y - 20, "엑셀", 26, 800, INK)]
row_h2 = sheet_h / 5
col1_cx = sheet_x + sheet_w * 0.2
col2_cx = col2_x + (sheet_x + sheet_w - col2_x) / 2
rows2 = [("품목", "금액"), ("노트북", "1,250,000"), ("모니터", "320,000")]
for i, (a, c) in enumerate(rows2):
    ry = sheet_y + i * row_h2 + row_h2 / 2 + 8
    weight = 800 if i == 0 else 700
    color = INK if i == 0 else INK2
    b += [text(col1_cx, ry, a, 19, weight, color), text(col2_cx, ry, c, 19, weight, color)]
b += [icon_pencil(col2_cx + 40, sheet_y + 3 * row_h2, 40, ACCENT, -25)]

print(save("a1-why-pdf-case.svg", b, "A1/4 사례 · PDF 200장을 엑셀로 (tools/illus/a1_why_pdf_case.py)"))
