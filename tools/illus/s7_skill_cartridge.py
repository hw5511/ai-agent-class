"""7/6 필요할 때만 장전하는 스킬: a structured three-column left-to-right flow - a shelf of skill
cartridges (one picked), a prompt slot where it is inserted, and Claude, which switches on only once
loaded. Exactly one mascot (small, on its own "Claude" desk, fully inside the third column) - the first
column also keeps an unmanned "내 컴퓨터" desk from the original scene."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def cart(x, y, w=70, fill=ACCENT, dim=False):
    h = w * 1.3
    op = ' opacity="0.35"' if dim else ""
    return (f'<g transform="translate({x} {y})"{op}>'
            f'<rect x="0" y="0" width="{w}" height="{h}" rx="12" fill="{fill}"/>'
            f'<rect x="{w * 0.14}" y="{h * 0.12}" width="{w * 0.72}" height="{h * 0.3}" rx="6" fill="#fff" opacity="0.92"/>'
            f'<rect x="{w * 0.14}" y="{h * 0.56}" width="{w * 0.72}" height="{h * 0.32}" rx="6" fill="{ACCENT_DARK}" opacity="0.55"/>'
            "</g>")


b = []

# diagram block: ~85% width, ~60% height, top around y=220 (3:1 rule)
COLS_Y, COLS_H = 220, 504
gap = 90
C1W, C2W, C3W = 480, 380, 480
C1X = 134
C2X = C1X + C1W + gap
C3X = C2X + C2W + gap

# column titles + sub-labels (wording from the slide notes)
for cx, w, title, sub in [(C1X, C1W, "스킬 선반", "여러 스킬 중 하나를 고름"),
                          (C2X, C2W, "프롬프트", "고른 스킬을 슬롯에 끼움"),
                          (C3X, C3W, "Claude", "장전됐을 때만 켜짐")]:
    b.append(part_box(cx, COLS_Y, w, COLS_H, fill="#fff", stroke="#e5e5e5", corner=20))
    b.append(text(cx + w / 2, COLS_Y + 40, title, 32, 800, INK))
    b.append(text(cx + w / 2, COLS_Y + 78, sub, 24, 600, MUTED))

content_top = COLS_Y + 118  # 338 - clear of the title/sub-label pair

# column 1: shelf of cartridges, three dimmed (generic skills) + one picked, each labelled
cw = 64
xs = [C1X + 60, C1X + 60 + (cw + 30), C1X + 60 + 2 * (cw + 30), C1X + 60 + 3 * (cw + 30)]
cart_top = content_top + 70
row_cy = cart_top + (cw * 1.3) / 2
names = ["보고서", "회의록", "메모"]
for cx, nm in zip(xs[:3], names):
    b.append(cart(cx, cart_top, cw, ACCENT_MID, dim=True))
    b.append(text(cx + cw / 2, cart_top + cw * 1.3 + 28, nm, 18, 700, MUTED))
b += [cart(xs[3], cart_top, cw, ACCENT)]
b += [text(xs[3] + cw / 2, cart_top + cw * 1.3 + 28, "카드뉴스", 18, 800, INK)]
b += [badge(xs[3] + cw / 2, content_top + 28, 1)]

# an unmanned "내 컴퓨터" desk inside the shelf column (kept from the original, no mascot on it)
LDESK_W = 280
LDESK_X = C1X + (C1W - LDESK_W) / 2
LDESK_Y = cart_top + cw * 1.3 + 28 + 16
b += [desk(LDESK_X, LDESK_Y, LDESK_W, "내 컴퓨터", body_h=150)]

# connector 1 -> 2, labelled
conn1_x1, conn1_x2 = C1X + C1W + 14, C2X - 14
b += [connector(conn1_x1, row_cy, conn1_x2, row_cy)]
b += [text((conn1_x1 + conn1_x2) / 2, row_cy - 26, "한 번 입력", 20, 700, ACCENT_DARK)]

# column 2: prompt slot with the cartridge inserted
slot_w, slot_h = 110, 148
slot_x, slot_y = C2X + (C2W - slot_w) / 2, row_cy - slot_h / 2
b += [part_box(slot_x - 10, slot_y - 10, slot_w + 20, slot_h + 20, fill="#f2f3f5", stroke=LINE2, corner=14)]
b += [cart(slot_x + (slot_w - cw) / 2, slot_y + (slot_h - cw * 1.3) / 2, cw, ACCENT)]
b += [text(C2X + C2W / 2, slot_y + slot_h + 44, "카드뉴스 슬롯", 18, 700, MUTED)]
b += [badge(slot_x + slot_w / 2, slot_y - 48, 2)]  # >= 8px clear above the slot box's top border (was overlapping it)

# connector 2 -> 3, labelled
conn2_x1, conn2_x2 = C2X + C2W + 14, C3X - 14
b += [connector(conn2_x1, row_cy, conn2_x2, row_cy)]
b += [text((conn2_x1 + conn2_x2) / 2, row_cy - 26, "장전", 20, 700, ACCENT_DARK)]

# column 3: Claude - a status pill that reads "on" only while loaded (blue, not green),
# plus the mascot on its own desk, fully inside this column box
pill_w, pill_h = 190, 54
pill_x, pill_y = C3X + (C3W - pill_w) / 2, content_top - 2
b += [f'<rect x="{pill_x}" y="{pill_y}" width="{pill_w}" height="{pill_h}" rx="{pill_h / 2}" fill="{ACCENT}"/>']
b += [f'<circle cx="{pill_x + 32}" cy="{pill_y + pill_h / 2}" r="9" fill="#fff"/>']
b += [text(pill_x + pill_w / 2 + 14, pill_y + pill_h / 2 + 9, "장전됨", 24, 800, "#fff")]
b += [badge(pill_x + pill_w + 34, pill_y + pill_h / 2, 3)]

MS = 0.55
DESK_W = 260
DESK_X = C3X + (C3W - DESK_W) / 2
DESK_Y = LDESK_Y
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=150)]
b += [mascot(DESK_X + DESK_W / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS)]

print(save("s7-skill-cartridge.svg", b, "7/6 필요할 때만 장전하는 스킬 (tools/illus/s7_skill_cartridge.py)"))
