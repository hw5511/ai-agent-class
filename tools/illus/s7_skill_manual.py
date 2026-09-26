"""7/4 스킬 = 필요할 때 꺼내 쓰는 가이드북: a structured left-to-right flow - a shelf box holding several
guidebooks (one picked out), a thin labelled connector, and a Claude box that receives just that one
guidebook. Exactly one mascot (small, on its desk) sits inside the Claude column, and an unmanned
"내 컴퓨터" desk sits inside the shelf column (kept from the original scene)."""
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
b += [text(LX + LW / 2, LY + 44, "스킬 선반", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 80, "필요할 때 꺼내 쓰는 가이드북", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 44, "Claude", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 80, "필요한 스킬만 읽음", 24, 600, MUTED)]

# left: shelf of guidebooks, three dimmed (generic skills) + one picked (accent), each labelled
row_cy = 440
xs = [LX + 90, LX + 240, LX + 390, LX + 540]
names = ["보고서", "회의록", "메모"]
for cx, nm in zip(xs[:3], names):
    b.append(f'<g opacity="0.32">{icon_book(cx, row_cy, 78, ACCENT_MID)}</g>')
    b.append(text(cx, row_cy + 66, nm, 20, 700, MUTED))
b += [icon_book(xs[3], row_cy - 6, 96, ACCENT)]
b += [text(xs[3], row_cy + 72, "카드뉴스", 20, 800, INK)]
b += [badge(xs[3], row_cy - 80, 2)]

# an unmanned "내 컴퓨터" desk inside the shelf column (kept from the original, no mascot on it)
LDESK_W = 420
LDESK_X, LDESK_Y = LX + (LW - LDESK_W) / 2, 536
b += [desk(LDESK_X, LDESK_Y, LDESK_W, "내 컴퓨터", body_h=150)]

# connector: only the picked guidebook travels across, labelled
conn_x1, conn_x2 = LX + LW + 20, RX - 20
b += [connector(conn_x1, row_cy, conn_x2, row_cy)]
b += [text((conn_x1 + conn_x2) / 2, row_cy - 34, "필요할 때만", 22, 700, ACCENT_DARK)]
b += [badge((conn_x1 + conn_x2) / 2, row_cy + 34, 1)]

# right: Claude receives the one guidebook; the mascot sits on its own "Claude" desk beside it
book_cx = RX + 150
b += [icon_book(book_cx, row_cy - 6, 96, ACCENT)]
b += [text(book_cx, row_cy + 72, "카드뉴스", 20, 800, INK)]
b += [badge(book_cx, row_cy - 80, 3)]

MS = 0.55
DESK_W = 280
DESK_X, DESK_Y = RX + RW - DESK_W - 50, 536
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=150)]
b += [mascot(DESK_X + DESK_W / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS)]

print(save("s7-skill-manual.svg", b, "7/4 스킬 = 필요할 때 꺼내 쓰는 가이드북 (tools/illus/s7_skill_manual.py)"))
