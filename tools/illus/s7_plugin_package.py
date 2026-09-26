"""7/51 플러그인과 마켓플레이스: skill + MCP + subagent bundled into one box, shelved in a marketplace."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# left zone: a plugin = several tools packaged into one box
LZ_X, LZ_W = 60, 800
b.append(zone(LZ_X, 90, LZ_W, 680, WARM_ZONE))
b.append(badge(LZ_X + 50, 136, 1))
box_x, box_y, box_w, box_h = 340, 380, 260, 190
b.append(part_box(box_x, box_y, box_w, box_h, fill="#fff", stroke=ACCENT, corner=20))
b.append(text(box_x + box_w / 2, box_y - 20, "플러그인", 34, 900, ACCENT_DARK))
for i, name in enumerate(["스킬", "MCP", "서브에이전트"]):
    ry = box_y + 22 + i * 54
    b.append(f'<rect x="{box_x + 24}" y="{ry}" width="{box_w - 48}" height="42" rx="10" fill="{ACCENT_TINT}"/>')
    b.append(text(box_x + box_w / 2, ry + 29, name, 24, 800, INK))
b.append(mascot(140, 431))
b.append(desk(110, 574, 520, "패키징", body_h=150))

# right zone: the marketplace = a shelf of packaged plugins, like a phone app store
RZ_X, RZ_W = 900, 800
b.append(zone(RZ_X, 90, RZ_W, 680, ACCENT_ZONE))
b.append(badge(RZ_X + 50, 136, 2))

phone_x, phone_y, phone_w = 970, 210, 160
grid_colors = [ACCENT, MASCOT, GREEN, ACCENT_MID, ACCENT_DARK, RED]
screen = "".join(
    f'<rect x="{14 + (i % 2) * 62}" y="{14 + (i // 2) * 62}" width="50" height="50" rx="14" fill="{grid_colors[i]}"/>'
    for i in range(6)
)
b.append(phone(phone_x, phone_y, phone_w, screen))
b.append(text(phone_x + phone_w / 2, phone_y + phone_w * 2 + 25, "앱스토어처럼", 26, 700, MUTED))

shelf_x, shelf_w = 1170, 460
for i, name in enumerate(["skill-creator", "cardnews-toolkit", "pdf-tools"]):
    ry = 150 + i * 84
    b.append(part_box(shelf_x, ry, shelf_w, 66, fill="#fff", stroke=LINE2, corner=14))
    b.append(text(shelf_x + 34, ry + 42, name, 26, 800, INK, anchor="start", family=MONO))
b.append(text(shelf_x + shelf_w / 2, 130, "마켓플레이스", 34, 900, ACCENT_DARK))

b.append(mascot(1140, 431))
b.append(desk(1110, 574, 520, "설치하기", body_h=150))

# install path: the packaged plugin travels from the box, arcing above the phone
# (never crossing its app icons), onto the marketplace shelf
b.append(path(f"M{box_x + box_w + 20} 470C800 300 950 110 {shelf_x - 20} 200", ACCENT))
b.append(text(860, 195, "설치", 30, 900, ACCENT))

print(save("s7-plugin-package.svg", b, "7/51 플러그인과 마켓플레이스 (tools/illus/s7_plugin_package.py)"))
