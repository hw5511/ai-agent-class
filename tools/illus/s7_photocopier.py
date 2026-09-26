"""7/13 복사기와 사용설명서: a structured 3-column row, aligned on one grid - the copier (a pre-made
feature), the manual (numbered steps), then the output - joined by straight neutral connectors in one
left-to-right flow. One small mascot + desk sits centred underneath."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
COL_W, GAP, X0 = 520, 40, 76
cols = [X0 + i * (COL_W + GAP) for i in range(3)]
TITLES = ["남이 만든 기능", "사용설명서만 알면 됨", "바로 씀"]
SUBS = ["내부 구조 몰라도 됨", "순서대로 따라 하면 됨", "결과물 바로 완성"]
HEADER_Y, SUB_Y = 260, 294
CARD_Y, CARD_H = 324, 210

for i, x in enumerate(cols):
    b += [badge(x + 22, HEADER_Y, i + 1), text(x + 60, HEADER_Y + 10, TITLES[i], 30, 900, INK, anchor="start"),
          text(x + 60, SUB_Y + 10, SUBS[i], 24, 600, MUTED, anchor="start")]

# ---- column 1: the copier - a simple schematic box (slot + button), not a full scene ----
x = cols[0]
b += [part_box(x, CARD_Y, COL_W, CARD_H, None, fill="#fff", stroke="#e5e5e5")]
mx, my, mw, mh = x + 70, CARD_Y + 55, 110, 110
b += [f'<rect x="{mx}" y="{my}" width="{mw}" height="{mh}" rx="14" fill="{DESK}" stroke="{LINE2}" stroke-width="2.5"/>',
      f'<rect x="{mx + 16}" y="{my + 16}" width="{mw - 32}" height="22" rx="6" fill="{INK2}"/>',
      f'<circle cx="{mx + 32}" cy="{my + mh - 26}" r="15" fill="{ACCENT}"/>']
b += [text(x + 250, CARD_Y + CARD_H / 2 - 4, "복사기", 32, 800, INK, anchor="start")]

# ---- column 2: the manual - a plain numbered list, three short rows ----
x = cols[1]
b += [part_box(x, CARD_Y, COL_W, CARD_H, None, fill="#fff", stroke="#e5e5e5")]
steps = ["종이를 넣는다", "버튼을 누른다", "복사본을 꺼낸다"]
ROW_H = 52
list_top = CARD_Y + (CARD_H - (ROW_H * 3 + 10 * 2)) / 2
for i, s in enumerate(steps):
    ry = list_top + i * (ROW_H + 10)
    cy = ry + ROW_H / 2
    b += [f'<circle cx="{x + 66}" cy="{cy}" r="20" fill="{ACCENT_TINT}"/>',
          text(x + 66, cy + 8, str(i + 1), 24, 800, ACCENT_DARK),
          text(x + 104, cy + 8, s, 28, 700, INK2, anchor="start")]

# ---- column 3: the output - already usable, a card with a check ----
x = cols[2]
b += [part_box(x, CARD_Y, COL_W, CARD_H, None, fill="#fff", stroke=ACCENT)]
b += [check(x + 76, CARD_Y + CARD_H / 2, 28, fill=ACCENT),
      text(x + 132, CARD_Y + CARD_H / 2 - 4, "복사본", 32, 800, ACCENT_DARK, anchor="start")]

# ---- straight neutral connectors, one flow direction ----
mid_y = CARD_Y + CARD_H / 2
for i in range(2):
    b += [connector(cols[i] + COL_W, mid_y, cols[i + 1], mid_y)]

# ---- exactly one mascot + small desk, centred under the whole row ----
MS = 0.55
DESK_W, DESK_Y, BODY_H = 260, 680, 54
desk_x = (cols[1] + COL_W / 2) - DESK_W / 2
b += [mascot(desk_x + (DESK_W - 240 * MS) / 2, DESK_Y - 143 * MS, MS),
      desk(desk_x, DESK_Y, DESK_W, None, body_h=BODY_H)]

print(save("s7-photocopier.svg", b, "7/13 복사기와 사용설명서 (tools/illus/s7_photocopier.py)"))
