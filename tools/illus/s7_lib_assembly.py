"""7/11 함수 조립 A -> B -> C: a relay of three desks - one worker makes function A, the next takes A
and builds B from it (a small A chip nested in B), the last takes B and builds C from it (a small B
chip nested in C). Solid arrows with a real shaft carry the letters from tile to tile."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
ZONE_Y, ZONE_H, ZONE_W, GAP, X0 = 56, 700, 542, 30, 56
zones = [X0 + i * (ZONE_W + GAP) for i in range(3)]
for zx in zones:
    b.append(zone(zx, ZONE_Y, ZONE_W, ZONE_H, fill=ACCENT_ZONE, rx=30))

HEADER_Y = ZONE_Y + 46
MS = 0.95
DESK_Y = 620
COLORS = [ACCENT, "#6a3fb5", GREEN]
FILLS = [ACCENT_TINT, "#eee6fa", "#d9f2e3"]
LETTERS = ["A", "B", "C"]
BODY = ["함수 A 를 만듦", "A 로 함수 B 를 만듦", "B 로 함수 C 를 만듦"]

box_w, box_h = 190, 130
box_y = 210
boxes = []  # (box_x, cx) per zone, filled as we go so the next zone can target the previous box
for i, z in enumerate(zones):
    cx = z + ZONE_W / 2
    box_x = cx - box_w / 2
    boxes.append(box_x)
    b += [part_box(box_x, box_y, box_w, box_h, LETTERS[i], fill=FILLS[i], stroke=COLORS[i], label_size=52, label_color=COLORS[i])]
    if i > 0:
        # the previous letter rides along nested in this box's corner - "built FROM the prior part"
        nx, ny, nw, nh = box_x + box_w - 62, box_y + box_h - 52, 50, 40
        b += [part_box(nx, ny, nw, nh, LETTERS[i - 1], fill="#fff", stroke=COLORS[i - 1], label_size=24, corner=8, label_color=COLORS[i - 1])]
    b += [badge(z + 46, HEADER_Y, i + 1), text(z + 96, HEADER_Y + 10, BODY[i], 26, 900, INK, anchor="start")]
    b += [mascot(cx - 240 * MS / 2, DESK_Y - 143 * MS, MS), desk(z + 46, DESK_Y, ZONE_W - 92, f"개발자 {i + 1}", body_h=150)]

# ---- arrows carrying the letter forward: A flies into B's nested slot, B flies into C's nested slot ----
for i in range(2):
    src_x = boxes[i] + box_w
    src_y = box_y + box_h / 2
    dst_x = boxes[i + 1] + box_w - 78  # just left of the nested chip in the next tile, so its letter stays visible
    dst_y = box_y + box_h - 32
    b += [path(f"M{src_x} {src_y}C{src_x + 90} {src_y - 10} {dst_x - 120} {dst_y + 30} {dst_x} {dst_y}", color=COLORS[i], width=6)]

print(save("s7-lib-assembly.svg", b, "7/11 함수 조립 · A -> B -> C (tools/illus/s7_lib_assembly.py)"))
