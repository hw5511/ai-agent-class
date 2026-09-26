"""7/5 CLAUDE.md 포화: a structured left-to-right flow - a CLAUDE.md box where every line is always
loaded (all rows the same, none dimmed), a thin labelled connector, and a capacity meter that overflows
past its own frame to show the growing load on Claude. Exactly one mascot (small, on its own desk, fully
inside the right column) stands beside the meter."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

# diagram block: ~85% width, ~60% height, top around y=220 (3:1 rule)
LX, LY, LW, LH = 134, 220, 692, 504
RX, RY, RW, RH = 966, 220, 692, 504
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]

# column titles + sub-labels (wording from the slide notes)
b += [text(LX + LW / 2, LY + 44, "CLAUDE.md", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 80, "매번 전부 로드", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 44, "컨텍스트", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 80, "가득 참", 24, 600, MUTED)]

# left box: every line is always loaded - six identical, unlabelled rows (all the same, none
# dimmed) so the "always all of it, no picking" reading stays literal instead of inventing content
row_w, row_h, row_gap = 500, 38, 12
row_x = LX + (LW - row_w) / 2
row_top = LY + 116
for i in range(6):
    ry = row_top + i * (row_h + row_gap)
    b.append(part_box(row_x, ry, row_w, row_h, fill=ACCENT_TINT, stroke=ACCENT, corner=8))
last_row_bottom = row_top + 6 * (row_h + row_gap) - row_gap
b += [text(LX + LW / 2, last_row_bottom + 34, "전부 로드", 22, 800, ACCENT_DARK)]
b += [badge(row_x - 34, row_top + row_h / 2, 1)]

# connector into Claude's load, labelled
conn_y = row_top + (6 * (row_h + row_gap) - row_gap) / 2
conn_x1, conn_x2 = LX + LW + 20, RX - 20
b += [connector(conn_x1, conn_y, conn_x2, conn_y)]
b += [text((conn_x1 + conn_x2) / 2, conn_y - 30, "전부 로드", 22, 700, ACCENT_DARK)]

# right box: a capacity meter that is full and spills over its own frame - the growing burden -
# plus the mascot standing beside it on its own desk, fully inside this column box
GW = 150
GX = RX + 110
CAP_Y, CAP_H = RY + 170, 210
b += [part_box(GX, CAP_Y, GW, CAP_H, fill="#fff", stroke="#e5e5e5", corner=14)]
b += [f'<rect x="{GX + 6}" y="{CAP_Y + 6}" width="{GW - 12}" height="{CAP_H - 12}" rx="8" fill="{ACCENT_TINT}"/>']
OVER_H = 56
b += [f'<rect x="{GX + 6}" y="{CAP_Y - OVER_H}" width="{GW - 12}" height="{OVER_H + 6}" rx="8" fill="{RED}" opacity="0.85"/>']
b += [text(GX + GW / 2, CAP_Y - OVER_H - 18, "넘침", 24, 800, RED)]
b += [badge(GX + GW + 44, CAP_Y - OVER_H + 8, 2)]

MS = 0.55
DESK_W = 260
DESK_X = RX + RW - DESK_W - 60
DESK_Y = RY + RH - 20 - 174
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=150)]
b += [mascot(DESK_X + DESK_W / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS)]

print(save("s7-skill-overflow.svg", b, "7/5 CLAUDE.md 포화 · 전부 항상 로드 (tools/illus/s7_skill_overflow.py)"))
