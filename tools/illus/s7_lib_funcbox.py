"""7/12 함수 상자: a black box on a desk with two example runs passing through it (1 -> 4, 2 -> 5) and
the rule (+3) written on the outside - the mascot never needs to know what happens inside."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

BOX_X, BOX_Y, BOX_W, BOX_H = 780, 150, 260, 330
b += [part_box(BOX_X, BOX_Y, BOX_W, BOX_H, None, fill=INK2, stroke=INK)]
b += [text(BOX_X + BOX_W / 2, BOX_Y + BOX_H / 2 - 24, "?", 90, 900, "#fff"),
      text(BOX_X + BOX_W / 2, BOX_Y + BOX_H / 2 + 44, "내부는 몰라도 됨", 22, 700, "#c9ccd1")]

lanes = [(150, "1", "4", ACCENT, "#eaf3fb", 1), (380, "2", "5", GREEN, "#d9f2e3", 2)]
for cy, in_n, out_n, color, fill, badge_n in lanes:
    b += [part_box(180, cy - 50, 130, 100, in_n, fill=fill, stroke=color, label_size=48, label_color=color),
          part_box(1490, cy - 50, 130, 100, out_n, fill=fill, stroke=color, label_size=48, label_color=color)]
    b += [path(f"M310 {cy}C480 {cy} 610 {cy} {BOX_X} {cy}", width=6, color=color)]
    b += [path(f"M{BOX_X + BOX_W} {cy}C{BOX_X + BOX_W + 190} {cy} 1320 {cy} 1490 {cy}", width=6, color=color)]
    b += [badge(180, cy - 86, badge_n)]

b += [part_box(BOX_X - 30, 530, BOX_W + 60, 84, "규칙: 항상 +3", fill="#fff", stroke=ACCENT, label_size=32, label_color=ACCENT)]
b += [badge(BOX_X + BOX_W + 66, 572, 3)]

MASCOT_X = 1180
DESK_W, DESK_Y = 560, 664
DESK_X = MASCOT_X - (DESK_W - 240) / 2
MS = 1.0
b += [mascot(MASCOT_X, DESK_Y - 143 * MS, MS),
      desk(DESK_X, DESK_Y, DESK_W, "함수 상자 사용법", body_h=130, label_size=32)]

print(save("s7-lib-funcbox.svg", b, "7/12 함수 상자 · 내부 몰라도 규칙은 앎 (tools/illus/s7_lib_funcbox.py)"))
