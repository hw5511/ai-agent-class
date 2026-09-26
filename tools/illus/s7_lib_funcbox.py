"""7/12 함수 상자: a structured diagram - one function box on a centre column, two aligned input/output
rows passing straight through it (1 -> 4, 2 -> 5), and the rule written in a plain accent-bordered box
underneath. One small mascot + desk sits below, clear of every label."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

BOX_X, BOX_Y, BOX_W, BOX_H = 780, 320, 260, 220
b += [part_box(BOX_X, BOX_Y, BOX_W, BOX_H, None, fill=INK2, stroke=INK2)]
b += [text(BOX_X + BOX_W / 2, BOX_Y + BOX_H / 2 - 16, "?", 72, 900, "#fff"),
      text(BOX_X + BOX_W / 2, BOX_Y + BOX_H / 2 + 36, "내부는 몰라도 됨", 24, 700, "#c9ccd1")]

IN_X, OUT_X, ROW_W, ROW_H = 150, 1440, 150, 100
lanes = [(BOX_Y + 55, "1", "4", 1), (BOX_Y + 165, "2", "5", 2)]
for cy, in_n, out_n, badge_n in lanes:
    b += [part_box(IN_X, cy - ROW_H / 2, ROW_W, ROW_H, in_n, fill="#fff", stroke="#e5e5e5", label_size=44, label_color=INK),
          part_box(OUT_X, cy - ROW_H / 2, ROW_W, ROW_H, out_n, fill="#fff", stroke="#e5e5e5", label_size=44, label_color=INK)]
    b += [connector(IN_X + ROW_W, cy, BOX_X, cy), connector(BOX_X + BOX_W, cy, OUT_X, cy)]
    b += [badge(IN_X - 44, cy, badge_n)]

RULE_X, RULE_Y, RULE_W, RULE_H = BOX_X - 30, 548, BOX_W + 60, 56
b += [part_box(RULE_X, RULE_Y, RULE_W, RULE_H, "규칙: 항상 +3", fill="#fff", stroke=ACCENT, label_size=30, label_color=ACCENT_DARK)]
b += [connector(BOX_X + BOX_W / 2, BOX_Y + BOX_H, BOX_X + BOX_W / 2, RULE_Y, head=False)]
bx3, by3 = RULE_X + RULE_W + 34, RULE_Y + RULE_H / 2
b += [badge(bx3, by3, 3), text(bx3 + 34, by3 + 8, "수식 몰라도 설명 가능", 24, 600, MUTED, anchor="start")]

MS = 0.45
DESK_W, DESK_Y, BODY_H = 260, 700, 30
desk_x = BOX_X + BOX_W / 2 - DESK_W / 2
b += [mascot(desk_x + (DESK_W - 240 * MS) / 2, DESK_Y - 143 * MS, MS),
      desk(desk_x, DESK_Y, DESK_W, None, body_h=BODY_H)]

print(save("s7-lib-funcbox.svg", b, "7/12 함수 상자 · 내부 몰라도 규칙은 앎 (tools/illus/s7_lib_funcbox.py)"))
