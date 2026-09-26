"""7/15 공유된 부품 - 라이브러리 / 오픈소스 / 스킬: a public parts market with three labelled trays,
filled with a full 3x2 grid of parts each; the mascot picks a specific skill card and it flies clear
of the other cards into the finished project window, whose caption bullets are attached under it."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

ZONE_X, ZONE_Y, ZONE_W, ZONE_H = 56, 70, 900, 470
b = [panel(), zone(ZONE_X, ZONE_Y, ZONE_W, ZONE_H, ACCENT_ZONE)]
b += [text(150, 128, "공개된 부품 시장", 34, 900, ACCENT_DARK, anchor="start"), badge(96, 122, 1)]

trays = [("라이브러리", ACCENT, "#eaf3fb"), ("오픈소스", "#6a3fb5", "#eee6fa"), ("스킬", GREEN, "#d9f2e3")]
TX0, TY, TW, TGAP = 100, 178, 260, 30
ROW_H, ROW_GAP = 80, 16
card_pos = {}  # (tray_i, r, c) -> (x, y)
for i, (name, color, fill) in enumerate(trays):
    tx = TX0 + i * (TW + TGAP)
    b += [part_box(tx, TY, TW, 46, name, fill=color, label_color="#fff", label_size=26, corner=12)]
    for r in range(3):
        for c in range(2):
            px, py = tx + 26 + c * 118, TY + 74 + r * (ROW_H + ROW_GAP)
            card_pos[(i, r, c)] = (px, py)
            b += [part_box(px, py, 96, ROW_H, None, fill=fill, stroke=color, corner=10)]

# ---- the assembled result window, enlarged to hold its own "why" bullet list ----
WIN_X, WIN_Y, WIN_W, WIN_H = 1150, 90, 520, 380
win_body = (part_box(30, 6, 100, 70, "A", fill="#eaf3fb", stroke=ACCENT, label_size=28) +
            part_box(160, 6, 100, 70, "B", fill="#eee6fa", stroke="#6a3fb5", label_size=28) +
            part_box(30, 96, 100, 70, "C", fill="#d9f2e3", stroke=GREEN, label_size=28) +
            check(280, 131, 30))
benefits = ["발상 확장", "에러 감소", "시간 절약"]
for i, t in enumerate(benefits):
    yy = 205 + i * 46
    win_body += f'<circle cx="20" cy="{yy - 8}" r="8" fill="{ACCENT}"/>' + text(44, yy, t, 27, 800, INK2, anchor="start")
b += [window(WIN_X, WIN_Y, WIN_W, WIN_H, "app", "완성", win_body), badge(WIN_X - 14, WIN_Y - 26, 2)]

# ---- the mascot picks a specific skill card (top-right of the 스킬 tray) - its right edge opens
# into free space, so the arrow to the project window crosses no other card ----
src_x, src_y = card_pos[(2, 0, 1)]
src_x, src_y = src_x + 96, src_y + ROW_H / 2
b += [path(f"M{src_x} {src_y}C{src_x + 110} {src_y} {WIN_X - 140} {WIN_Y + 200} {WIN_X - 6} {WIN_Y + 200}")]

DESK_X, DESK_W, DESK_Y = 1120, 640, 660
MS = 1.05
b += [mascot(WIN_X + WIN_W / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS),
      desk(DESK_X, DESK_Y, DESK_W, "내 프로젝트", body_h=130, label_size=32)]

print(save("s7-lib-parts-shelf.svg", b, "7/15 공유된 부품 · 라이브러리 · 오픈소스 · 스킬 (tools/illus/s7_lib_parts_shelf.py)"))
