"""A1/3 AI 개입이 필요한 3가지 경우: a headline strip asks the key question, three hairline cards
below each with a small real example (판단·분기 = a decision diamond reading a customer message with
two branches; 대량 정리·분석 = a pile of docs flowing into an organised table; 텍스트 생성 = a blank
page becoming a written page), each sending a short arrow down to Claude who does the work. Badges
1-3, tip badge "!" on the headline."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

# ---- headline strip: the key question, hairline rules above/below, tip badge at the right ----
HX0, HX1, HY = 96, 1696, 168
b += [f'<line x1="{HX0}" y1="{HY - 34}" x2="{HX1}" y2="{HY - 34}" stroke="{LINE}" stroke-width="2"/>']
b += [text(1792 / 2 - 20, HY + 10, "이 코드에 AI 개입이 필요한가?", 34, 900, INK)]
b += [badge(HX1 - 20, HY - 12, "!")]
b += [f'<line x1="{HX0}" y1="{HY + 34}" x2="{HX1}" y2="{HY + 34}" stroke="{LINE}" stroke-width="2"/>']

w, gap = 460, 50
xs = [156, 156 + w + gap, 156 + 2 * (w + gap)]
CARD_Y, CARD_H = 268, 292
titles = ["지능적 판단·분기", "대량 텍스트·코드 정리", "텍스트 생성"]

for i, x in enumerate(xs):
    b += [part_box(x, CARD_Y, w, CARD_H, None, fill="#fff", stroke="#e5e5e5", corner=18)]
    b += [badge(x + 30, CARD_Y, i + 1)]
    b += [text(x + w / 2, CARD_Y + 40, titles[i], 27, 900, INK)]

# ---- card 1: a customer message + a decision diamond with two branches ----
x = xs[0]
cx = x + w / 2
b += [bubble(x + 40, CARD_Y + 58, w - 80, 54, "환불하고 싶어요", 22, "#fff", LINE2, INK2, tail_x=cx)]
dia_cy = CARD_Y + 196
dw, dh = 150, 62
b += [f'<path d="M{cx} {dia_cy - dh / 2}L{cx + dw / 2} {dia_cy}L{cx} {dia_cy + dh / 2}L{cx - dw / 2} {dia_cy}Z" fill="{ACCENT_TINT}" stroke="{ACCENT}" stroke-width="3"/>']
b += [text(cx, dia_cy + 7, "환불 요청?", 20, 800, ACCENT_DARK)]
b += [connector(cx - dw / 2 + 6, dia_cy + 12, x + 72, CARD_Y + 262, color=LINE2, width=2.5, head=False)]
b += [connector(cx + dw / 2 - 6, dia_cy + 12, x + w - 72, CARD_Y + 262, color=LINE2, width=2.5, head=False)]
b += [check(x + 72, CARD_Y + 262, 18, fill=GREEN), text(x + 100, CARD_Y + 268, "A 승인", 20, 800, INK, anchor="start")]
b += [cross(x + w - 100, CARD_Y + 262, 18, fill=RED), text(x + w - 128, CARD_Y + 268, "B 거절", 20, 800, INK, anchor="end")]

# ---- card 2: a pile of documents flowing into one organised table ----
x = xs[1]
for dx, dy, r in [(0, 26, -8), (12, 14, -2), (24, 2, 5)]:
    b.append(doc(x + 44 + dx, CARD_Y + 70 + dy, 54, r, ACCENT_MID))
b += [text(x + 96, CARD_Y + 190, "문서 여러 건", 19, 700, MUTED)]
b += [connector(x + 150, CARD_Y + 150, x + 208, CARD_Y + 150)]
tbl_x, tbl_y, tbl_w, tbl_h = x + 216, CARD_Y + 66, 208, 170
b += [f'<rect x="{tbl_x}" y="{tbl_y}" width="{tbl_w}" height="{tbl_h}" rx="8" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>']
rows_y = [tbl_y + tbl_h * f for f in (0.28, 0.52, 0.76)]
for ry in rows_y:
    b.append(f'<line x1="{tbl_x}" y1="{ry:.0f}" x2="{tbl_x + tbl_w}" y2="{ry:.0f}" stroke="{PAPER_LINE}" stroke-width="2"/>')
col2 = tbl_x + tbl_w * 0.5
b += [f'<line x1="{col2}" y1="{tbl_y}" x2="{col2}" y2="{tbl_y + tbl_h}" stroke="{PAPER_LINE}" stroke-width="2"/>']
labels = [("제품", "금액"), ("우산", "12,000"), ("장갑", "8,000"), ("모자", "15,000")]
row_tops = [tbl_y] + list(rows_y)
for i, (a, c) in enumerate(labels):
    ry = row_tops[i] + tbl_h * 0.14
    weight = 800 if i == 0 else 700
    color = INK if i == 0 else INK2
    b += [text(tbl_x + tbl_w * 0.25, ry, a, 17, weight, color), text(tbl_x + tbl_w * 0.75, ry, c, 17, weight, color)]
b += [text(x + w / 2, CARD_Y + 262, "정리된 표", 19, 700, MUTED)]

# ---- card 3: a blank page becoming a written page ----
x = xs[2]
by = CARD_Y + 66
bw = 92
bh = bw * 1.25
# a truly blank sheet: the same paper silhouette as doc(), no interior lines
b += [(f'<g transform="translate({x + 60} {by})">'
       f'<path d="M6 2h{bw*0.56:.0f}l{bw*0.31:.0f} {bw*0.31:.0f}v{bh - bw*0.31 - 6:.0f}a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" '
       f'fill="#fff" stroke="{LINE2}" stroke-width="3"/>'
       f'<path d="M{bw*0.66:.0f} 2v{bw*0.25:.0f}a4 4 0 0 0 4 4h{bw*0.25:.0f}" fill="none" stroke="{LINE2}" stroke-width="3"/></g>')]
b += [text(x + 106, by + bh + 26, "빈 페이지", 19, 700, MUTED)]
b += [connector(x + 176, by + 60, x + 244, by + 60)]
code_x, code_y = x + 252, by
b += [doc(code_x, code_y, bw, 0, ACCENT)]
b += [text(code_x + 46, by + bh + 26, "완성된 글", 19, 700, MUTED)]

# ---- converging arrows into Claude, who does the work ----
end_xs = [820, 906, 992]
for i, x in enumerate(xs):
    start_x = x + w / 2
    end_x = end_xs[i]
    b += [path(f"M{start_x} {CARD_Y + CARD_H}C{start_x} {CARD_Y + CARD_H + 40} {(start_x + end_x) / 2:.0f} {CARD_Y + CARD_H + 60} {end_x} {CARD_Y + CARD_H + 78}")]

b += [mascot(786, 650)]
b += [text(1050, 726, "Claude", 30, 900, INK, anchor="start")]

print(save("a1-why-intervention.svg", b, "A1/3 AI 개입이 필요한 3가지 경우 (tools/illus/a1_why_intervention.py)"))
