"""7/55 스킬 크리에이터: 관찰 -> 정리 -> 저장, and the loop itself is packaged as skill-creator."""
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
MASCOT_H = 143 * MASCOT_S
MASCOT_Y = round(DESK_Y - MASCOT_H + 15)
LAP_W = 196
LAP_Y = round(DESK_Y - LAP_W * 0.63)


def screen_observe():
    out = [f'<rect x="6" y="8" width="150" height="34" rx="6" fill="{PANEL}" stroke="{LINE}" stroke-width="2"/>']
    out += [f'<rect x="16" y="{16 + i * 9}" width="{110 - i * 20}" height="6" rx="3" fill="{LINE2}"/>' for i in range(2)]
    out.append(f'<rect x="6" y="50" width="150" height="34" rx="6" fill="{PANEL}" stroke="{LINE}" stroke-width="2"/>')
    out += [f'<rect x="16" y="{58 + i * 9}" width="{110 - i * 20}" height="6" rx="3" fill="{LINE2}"/>' for i in range(2)]
    out.append(icon_search(157, 18, 11, INK, 4))
    return "".join(out)


def screen_organize():
    out = [icon_book(30, 24, 38, ACCENT)]
    rows = [10, 30, 50, 70]
    out += [f'<rect x="52" y="{y}" width="112" height="9" rx="4" fill="{ACCENT_TINT if y == 10 else LINE}"/>' for y in rows]
    return "".join(out)


b = [panel()]

# columns 1-2: observe, organize (laptop screens)
for cx, header, screen_fn, nameplate, badge_n in [
    (COLS[0], "반복 작업 찾기", screen_observe, "관찰", 1),
    (COLS[1], "가이드로 문서화", screen_organize, "정리", None),
]:
    b.append(zone(cx, ZY, ZW, ZH))
    b.append(text(cx + ZW / 2, ZY + 70, header, 30, 800, ACCENT_DARK))
    b.append(mascot(cx + 10, MASCOT_Y, MASCOT_S))
    b.append(laptop(cx + 270, LAP_Y, LAP_W, screen_fn()))
    b.append(desk(cx + 10, DESK_Y, 485, nameplate, body_h=DESK_BODY_H))
    if badge_n:
        b.append(badge(cx + 50, ZY + 40, badge_n))

# column 3: save - a SKILL.md file goes into a folder
cx = COLS[2]
b.append(zone(cx, ZY, ZW, ZH))
b.append(text(cx + ZW / 2, ZY + 70, "SKILL.md 로 저장", 30, 800, ACCENT_DARK))
b.append(mascot(cx + 10, MASCOT_Y, MASCOT_S))
b.append(doc(cx + 320, 330, 76, -8))
b.append(text(cx + 320 + 38, 330 - 14, "SKILL.md", 19, 800, ACCENT_DARK, family=MONO))
b.append(folder(cx + 330, 386, 140, "photo-edit"))
b.append(desk(cx + 10, DESK_Y, 485, "저장", body_h=DESK_BODY_H))
# the "!" tip badge sits in this column's own badge slot (same as the numbered
# badges in the other columns); its text sits lower, clear of the header above it
b.append(badge(cx + 50, ZY + 40, "!"))
b.append(text(cx + ZW / 2, 250, "그래서 스킬크리에이터", 26, 800, ACCENT_DARK))

# connecting arrows between columns - real shaft crossing the gap between tiles
for x1, x2 in [(COLS[0] + ZW, COLS[1]), (COLS[1] + ZW, COLS[2])]:
    b.append(path(f"M{x1} 250C{(x1 + x2) / 2} 250 {(x1 + x2) / 2} 250 {x2 - 6} 250", ACCENT))

# loop-back arrow: save -> observe, arcing above the tiles but fully inside the canvas
lx1, lx2 = COLS[2] + ZW / 2, COLS[0] + ZW / 2
b.append(path(f"M{lx1} {ZY}C{lx1} 78 {lx2} 78 {lx2} {ZY}", ACCENT))
b.append(text((lx1 + lx2) / 2, 45, "반복", 30, 900, ACCENT))

print(save("s7-skill-creator.svg", b, "7/55 스킬 크리에이터 (tools/illus/s7_skill_creator.py)"))
