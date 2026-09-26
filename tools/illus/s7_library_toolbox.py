"""7/9 라이브러리 = 남이 써둔 코드: a shelf of ready-made, function-labelled code boxes; the mascot
takes one down and puts it straight to work on its laptop."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(56, 70, 760, 710, ACCENT_ZONE)]
b += [text(140, 128, "코드 보관함", 34, 900, ACCENT_DARK, anchor="start")]

# 3x2 grid of ready-made code boxes fills the zone; the top-right box ("이미지 처리") is the one
# the mascot picks, so its right edge opens straight into the free gap beside the zone edge -
# no other card sits to its right or above it, so the lift-out arrow crosses nothing.
labels = ["QR 코드", "이미지 처리", "PDF 합치기", "웹 데이터 수집", "번역", "날짜 계산"]
BX, BY, BW, BH, GAP = 100, 168, 320, 150, 26
positions = []
for r in range(3):
    for c in range(2):
        positions.append((BX + c * (BW + GAP), BY + r * (BH + GAP)))
for (bx, by), lab in zip(positions, labels):
    b += [part_box(bx, by, BW, BH, lab, label_size=28)]
b += [badge(96, 122, 1)]

# the mascot lifts the "이미지 처리" box (top-right, positions[1]) off the shelf, out through the
# gap to the right of the grid, onto its desk on the right
take_x, take_y = positions[1][0] + BW, positions[1][1] + BH / 2
FLOAT_X, FLOAT_Y, FLOAT_W, FLOAT_H = 890, 350, 190, 76
b += [path(f"M{take_x} {take_y}C{take_x + 120} {take_y} {FLOAT_X - 40} {FLOAT_Y + FLOAT_H / 2 - 10} {FLOAT_X} {FLOAT_Y + FLOAT_H / 2}", width=6),
      part_box(FLOAT_X, FLOAT_Y, FLOAT_W, FLOAT_H, "이미지 처리", label_size=24)]

DESK_X, DESK_W, DESK_Y = 1120, 560, 616
MS = 1.05
b += [path(f"M{FLOAT_X + FLOAT_W} {FLOAT_Y + FLOAT_H / 2}C{FLOAT_X + 220} {FLOAT_Y + 40} {DESK_X + 200} {DESK_Y - 250} {DESK_X + 300} {DESK_Y - 210}", width=6)]
b += [mascot(DESK_X + 70, DESK_Y - 143 * MS, MS),
      laptop(DESK_X + 300, DESK_Y - 190, 280,
             f'<rect x="0" y="0" width="{280 - 20}" height="{280 * 0.63 - 20:.0f}" fill="{SCREEN}"/>' +
             text(16, 40, "이미지 처리()", 20, 800, ACCENT_DARK, anchor="start", family=MONO) +
             check(230, 40, 20)),
      desk(DESK_X, DESK_Y, 620, "내 프로젝트", body_h=170)]
b += [text(DESK_X + 440, 320, "가져다 바로 씀", 32, 800, INK), badge(1698, 412, 2)]

print(save("s7-library-toolbox.svg", b, "7/9 라이브러리 = 남이 써둔 코드 (tools/illus/s7_library_toolbox.py)"))
