"""7/6 필요할 때만 장전하는 스킬: mascot picks one skill cartridge off a shelf; it travels into a console
that sits right on Claude's desk, and once loaded Claude produces a small card-news result."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def cart(x, y, w=90, fill=ACCENT, dim=False, label=None):
    h = w * 1.3
    op = ' opacity="0.35"' if dim else ""
    out = [f'<g transform="translate({x} {y})"{op}>',
           f'<rect x="0" y="0" width="{w}" height="{h}" rx="14" fill="{fill}"/>',
           f'<rect x="{w * 0.14}" y="{h * 0.12}" width="{w * 0.72}" height="{h * 0.3}" rx="6" fill="#fff" opacity="0.92"/>',
           f'<rect x="{w * 0.14}" y="{h * 0.56}" width="{w * 0.72}" height="{h * 0.32}" rx="6" fill="{ACCENT_DARK}" opacity="0.55"/>',
           "</g>"]
    if label:
        out.append(text(x + w / 2, y + h + 32, label, 24, 800, INK, family=MONO))
    return "\n".join(out)


b = [panel(), zone(60, 90, 740, 660, ACCENT_ZONE), zone(950, 90, 782, 660, WARM_ZONE)]

# left: shelf of skill cartridges, three dim + the chosen one, all resting on the shelf bar
b += [text(420, 145, "스킬 선반", 30, 800, MUTED)]
shelf_y = 300
b += [f'<rect x="130" y="{shelf_y}" width="560" height="18" rx="8" fill="{DESK_TOP}"/>']
b += [badge(170, 150, 1)]
for cx in (180, 300, 420):
    b.append(cart(cx, shelf_y - 109, 84, ACCENT_MID, dim=True))
b += [cart(560, shelf_y - 130, 100, ACCENT, label="카드뉴스")]

b += [mascot(90, 338), desk(70, 480, 480, "내 컴퓨터")]

# the chosen cartridge travels from the shelf (arrow starts clear of it) into the console on Claude's desk
b += [path("M668 235C820 250 960 270 1040 300")]

# right: a console sitting on Claude's desk with the cartridge seated in its slot
desk_x, desk_w = 1000, 700
b += [mascot(1300, 338), desk(desk_x, 480, desk_w, "Claude")]
console_x, console_y, console_w, console_h = 1020, 300, 220, 180
b += [part_box(console_x, console_y, console_w, console_h, fill=INK2, stroke=LINE2, corner=22)]
b += [f'<rect x="{console_x + 30}" y="{console_y + 20}" width="{console_w - 60}" height="30" rx="10" fill="#0f1012"/>']
b += [cart(console_x + console_w / 2 - 40, console_y - 70, 80, ACCENT)]
b += [badge(1190, 258, 2)]
b += [f'<circle cx="{console_x + console_w - 34}" cy="{console_y + console_h - 30}" r="14" fill="{GREEN}"/>']
b += [text(console_x + console_w / 2, console_y + console_h - 20, "장전됨", 20, 800, "#c9ccd1")]

# a small card-news result appears beside Claude once the skill is loaded
for i, cx in enumerate([1560, 1600, 1640]):
    b.append(f'<rect x="{cx}" y="{470 - i * 8}" width="36" height="50" rx="7" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>')
    b.append(f'<rect x="{cx + 6}" y="{482 - i * 8}" width="24" height="18" rx="4" fill="{ACCENT_TINT}"/>')
b += [check(1660, 438, 20)]
b += [badge(1600, 390, 3)]

print(save("s7-skill-cartridge.svg", b, "7/6 필요할 때만 장전하는 스킬 (tools/illus/s7_skill_cartridge.py)"))
