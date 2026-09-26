"""7/62 같은 로직, 다른 조작판: a person's GUI slider and the mascot's CLI command drive the same logic."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

ZY, ZH = 90, 680
LZ_X, LZ_W = 60, 760
RZ_X, RZ_W = 900, 810
DESK_Y = 574
MASCOT_Y = 431

b = [panel()]
b.append(zone(LZ_X, ZY, LZ_W, ZH, WARM_ZONE))
b.append(zone(RZ_X, ZY, RZ_W, ZH, ACCENT_ZONE))

# left: a person drags a GUI slider to find the value by eye
b.append(badge(LZ_X + 50, ZY + 46, 1))
b.append(text(LZ_X + LZ_W / 2, ZY + 74, "GUI 로 값 찾기", 32, 900, ACCENT_DARK))
slider_x, slider_y, slider_w, slider_h = LZ_X + 220, 390, 300, 150
slider_body = (
    f'<rect x="20" y="30" width="220" height="10" rx="5" fill="{LINE}"/>'
    f'<circle cx="190" cy="35" r="15" fill="{ACCENT}" stroke="#fff" stroke-width="3"/>'
    + icon_cursor(168, 8, 30, INK)
    + f'<rect x="40" y="55" width="180" height="34" rx="8" fill="{ACCENT_TINT}"/>'
    + text(130, 79, "brightness 1.1", 16, 800, ACCENT_DARK, family=MONO)
)
b.append(window(slider_x, slider_y, slider_w, slider_h, "app", "photo-edit.html", slider_body))
b.append(icon_cursor(LZ_X + 60, MASCOT_Y + 20, 110, INK2))
b.append(desk(LZ_X + 10, DESK_Y, 560, "사람", body_h=150))

# right: the mascot copies the same value into a command and repeats it
b.append(badge(RZ_X + 50, ZY + 46, 2))
b.append(text(RZ_X + RZ_W / 2, ZY + 74, "명령어로 반복 처리", 32, 900, ACCENT_DARK))
term_x, term_y, term_w, term_h = RZ_X + 260, 430, 300, 140
term_body = (
    text(20, 46, "$ photo_edit.py", 20, 700, "#8fd3ff", anchor="start", family=MONO)
    + text(20, 76, "--brightness 1.1", 20, 700, "#8fd3ff", anchor="start", family=MONO)
    + check(250, 68, 26)
)
b.append(window(term_x, term_y, term_w, term_h, "terminal", "terminal", term_body))
b.append(mascot(RZ_X + 32, MASCOT_Y))
b.append(desk(RZ_X + 10, DESK_Y, 550, "AI", body_h=150))
for i, rot in enumerate([-10, 0, 11]):
    b.append(doc(RZ_X + 600 + i * 8, 470 - i * 6, 56, rot))
b.append(text(RZ_X + 660, 590, "6장 자동 처리", 26, 800, GREEN))

# same logic, bridging both control panels
mx, my, mw, mh = 760, 170, 260, 170
b.append(f'<rect x="{mx}" y="{my}" width="{mw}" height="{mh}" rx="20" fill="#fff" stroke="{ACCENT}" stroke-width="4" filter="url(#sh)"/>')
b.append(text(mx + mw / 2, my + 34, "같은 계산 로직", 26, 900, INK))
b.append(doc(mx + 40, my + 62, 46, 0, stroke=LINE2, accent=LINE2))
b.append(doc(mx + 168, my + 62, 46, 0, accent=GREEN))
b.append(path(f"M{mx + 94} {my + 92}C{mx + 120} {my + 92} {mx + 140} {my + 92} {mx + 160} {my + 92}", ACCENT))

b.append(path(f"M{slider_x + slider_w + 4} {slider_y + 60}C{mx - 40} 300 {mx - 20} 260 {mx - 4} {my + 100}", ACCENT))
b.append(path(f"M{mx + mw + 4} {my + 100}C{mx + mw + 80} 240 {term_x + term_w / 2 - 30} 300 {term_x + term_w / 2} {term_y - 4}", ACCENT))

print(save("s7-two-panels.svg", b, "7/62 같은 로직, 다른 조작판 (tools/illus/s7_two_panels.py)"))
