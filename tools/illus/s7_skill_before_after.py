"""7/7 반복 작업 절약: two structured columns, top to bottom inside each - before: the same prompt
repeated three times (thin connectors show the repeat) beside an unmanned "내 컴퓨터" desk; after: one
command produces the result once, with the result stack kept clear of the mascot's own "Claude" desk
(kept inside the box) by putting them side by side."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

LX, LY, LW, LH = 134, 220, 692, 504
RX, RY, RW, RH = 966, 220, 692, 504
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 40, "이전: 매번 반복", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 78, "매번 프롬프트를 다시 설명", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 40, "이제: 명령어 한 번", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 78, "명령어 하나만 입력", 24, 600, MUTED)]

content_top = LY + 118  # clear of the title/sub-label pair

# left: the same prompt, repeated three times top to bottom, each labelled and connected
row_w, row_h, gap = 300, 40, 18
row_x = LX + (LW - row_w) / 2
row_ys = [content_top + 10 + i * (row_h + gap) for i in range(3)]
for ry in row_ys:
    b.append(part_box(row_x, ry, row_w, row_h, "카드뉴스", fill="#fff", stroke=LINE2, label_size=20))
for ry in row_ys[:-1]:
    b.append(connector(row_x + row_w / 2, ry + row_h, row_x + row_w / 2, ry + row_h + gap))
b += [text(row_x + row_w + 60, (row_ys[0] + row_ys[-1] + row_h) / 2, "매번 반복", 20, 700, ACCENT_DARK)]
b += [badge(row_x - 34, row_ys[0] + row_h / 2, 1)]

LDESK_W = 420
LDESK_X = LX + (LW - LDESK_W) / 2
LDESK_Y = row_ys[-1] + row_h + 30
b += [desk(LDESK_X, LDESK_Y, LDESK_W, "내 컴퓨터", body_h=150)]

# right: one command, once - the terminal and its result sit left-of-centre so the "Claude" desk
# and mascot (on the right) never overlap them
term_w, term_h = 280, 116  # tall enough that the command line clears the dark body's bottom edge
term_cx = RX + 200
term_x, term_y = term_cx - term_w / 2, content_top + 10
b += [window(term_x, term_y, term_w, term_h, kind="terminal", title="terminal",
             body=text(20, 38, "/cardnews", 22, 800, "#7fd7ff", anchor="start", family=MONO))]
b += [badge(term_x + term_w + 30, term_y + term_h / 2, 2)]

conn_top = term_y + term_h
res_cy = conn_top + 90  # result cards + label moved down with the taller terminal
conn_bottom = res_cy - 34
b += [connector(term_cx, conn_top, term_cx, conn_bottom)]
label_y = conn_top + 34  # clear of the terminal bottom and >= 16px above the result cards
b += [text(term_cx - 90, label_y, "한 번에 완성", 18, 700, ACCENT_DARK)]
card_w, card_h = 36, 50
xs = [term_cx - card_w - 6, term_cx, term_cx + card_w + 6]
for i, cx in enumerate(xs):
    cy = res_cy - card_h / 2 - i * 4
    b.append(f'<rect x="{cx}" y="{cy}" width="{card_w}" height="{card_h}" rx="7" fill="#fff" stroke="{LINE2}" stroke-width="2"/>')
    b.append(f'<rect x="{cx + 6}" y="{cy + 10}" width="{card_w - 12}" height="18" rx="4" fill="{ACCENT_TINT}"/>')
b += [check(xs[-1] + card_w + 4, res_cy - card_h + 4, 16, fill=ACCENT)]
b += [text(term_cx, res_cy + card_h / 2 + 30, "카드뉴스 완성", 20, 800, INK)]

MS = 0.5
DESK_W = 260
DESK_X = RX + RW - DESK_W - 50
DESK_Y = LDESK_Y
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=150)]
b += [mascot(DESK_X + DESK_W / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS)]

print(save("s7-skill-before-after.svg", b, "7/7 반복 작업 절약 · 프롬프트 반복 vs 명령어 한 번 (tools/illus/s7_skill_before_after.py)"))
