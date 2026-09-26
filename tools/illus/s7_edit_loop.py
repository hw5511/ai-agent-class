"""7/25 코드 직접 수정 반복: Read -> Edit -> Bash, the mascot loops through the same desk three times."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

ZW = 505
GAP = 90
COLS = [54, 54 + ZW + GAP, 54 + 2 * (ZW + GAP)]
ZY, ZH = 110, 682
DESK_Y = 564
DESK_BODY_H = 190
MASCOT_S = 1.05
MASCOT_W, MASCOT_H = 240 * MASCOT_S, 143 * MASCOT_S
MASCOT_Y = round(DESK_Y - MASCOT_H + 15)
LAP_W = 196
LAP_Y = round(DESK_Y - LAP_W * 0.63)


def screen_read():
    rows = [(10, LINE), (30, ACCENT), (50, LINE), (70, LINE)]
    out = [f'<rect x="6" y="{y}" width="150" height="9" rx="4" fill="{c}"/>' for y, c in rows]
    out.append(icon_search(155, 18, 11, INK, 4))
    return "".join(out)


def screen_edit():
    out = [f'<rect x="6" y="10" width="150" height="9" rx="4" fill="{LINE}"/>']
    out.append(f'<rect x="6" y="30" width="150" height="9" rx="4" fill="{RED}"/>')
    out.append(f'<line x1="6" y1="34.5" x2="156" y2="34.5" stroke="{INK}" stroke-width="2"/>')
    out.append(f'<rect x="6" y="49" width="150" height="9" rx="4" fill="{GREEN}"/>')
    out.append(f'<rect x="6" y="69" width="150" height="9" rx="4" fill="{LINE}"/>')
    out.append(icon_pencil(157, 18, 26, INK, -45))
    return "".join(out)


def screen_bash():
    out = [f'<rect x="0" y="0" width="176" height="103" rx="4" fill="{INK2}"/>']
    out.append(text(10, 32, "$ python", 14, 700, "#8fd3ff", anchor="start", family=MONO))
    out.append(text(10, 52, "make_card.py", 13, 700, "#8fd3ff", anchor="start", family=MONO))
    out.append(check(148, 78, 15))
    return "".join(out)


b = [panel()]
for cx, tag, screen_fn, nameplate, badge_n in [
    (COLS[0], "Read", screen_read, "코드 확인", 1),
    (COLS[1], "Edit", screen_edit, "값 수정", 2),
    (COLS[2], "Bash", screen_bash, "재실행", 3),
]:
    b.append(zone(cx, ZY, ZW, ZH))
    b.append(text(cx + ZW / 2, ZY + 70, tag, 34, 900, ACCENT_DARK, family=MONO))
    b.append(mascot(cx + 10, MASCOT_Y, MASCOT_S))
    b.append(laptop(cx + 270, LAP_Y, LAP_W, screen_fn()))
    b.append(desk(cx + 10, DESK_Y, 485, nameplate, body_h=DESK_BODY_H))
    b.append(badge(cx + 50, ZY + 40, badge_n))

# connecting arrows between columns - real shaft crossing the gap between tiles
for x1, x2 in [(COLS[0] + ZW, COLS[1]), (COLS[1] + ZW, COLS[2])]:
    midx = (x1 + x2) / 2
    b.append(path(f"M{x1} 250C{midx} 250 {midx} 250 {x2 - 6} 250", ACCENT))

# loop-back arrow: Bash -> Read, arcing above the tiles but fully inside the canvas
lx1, lx2 = COLS[2] + ZW / 2, COLS[0] + ZW / 2
b.append(path(f"M{lx1} {ZY}C{lx1} 78 {lx2} 78 {lx2} {ZY}", ACCENT))
b.append(text((lx1 + lx2) / 2, 45, "반복", 30, 900, ACCENT))

print(save("s7-edit-loop.svg", b, "7/25 코드 직접 수정 반복 (tools/illus/s7_edit_loop.py)"))
