"""7/11 함수 조립 A -> B -> C: a structured 3-column relay, aligned on one grid - each column is a
function box (A, B, C), with a small nested chip showing which prior part it was built from, joined
by straight neutral connectors in one left-to-right flow. One small mascot + desk sits centred underneath."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
COL_W, GAP, X0 = 520, 40, 76
cols = [X0 + i * (COL_W + GAP) for i in range(3)]
TITLES = ["함수 A 를 만듦", "A 로 함수 B 를 만듦", "B 로 함수 C 를 만듦"]
SUBS = ["누군가 처음 만듦", "A 를 가져다 씀", "B 를 가져다 씀"]
HEADER_Y, SUB_Y = 260, 294
BOX_Y, BOX_W, BOX_H = 324, 240, 210
LETTERS = ["A", "B", "C"]
ACTORS = ["개발자 1", "개발자 2", "개발자 3"]
CAPTION_Y = BOX_Y + BOX_H + 40

boxes = []
for i, x in enumerate(cols):
    b += [badge(x + 22, HEADER_Y, i + 1), text(x + 60, HEADER_Y + 10, TITLES[i], 30, 900, INK, anchor="start"),
          text(x + 60, SUB_Y + 10, SUBS[i], 24, 600, MUTED, anchor="start")]
    box_x = x + (COL_W - BOX_W) / 2
    boxes.append(box_x)
    b += [part_box(box_x, BOX_Y, BOX_W, BOX_H, LETTERS[i], fill="#fff", stroke="#e5e5e5", label_size=64, label_color=INK)]
    if i > 0:
        nx, ny, nw, nh = box_x + 20, BOX_Y + BOX_H - 62, 66, 50
        b += [part_box(nx, ny, nw, nh, LETTERS[i - 1], fill="#fff", stroke=ACCENT, label_size=28, corner=8, label_color=ACCENT_DARK)]
    b += [text(x + COL_W / 2, CAPTION_Y, ACTORS[i], 26, 800, INK)]

# ---- one straight neutral connector per gap, aligned on the box's mid-height ----
mid_y = BOX_Y + BOX_H / 2
for i in range(2):
    b += [connector(boxes[i] + BOX_W, mid_y, boxes[i + 1], mid_y)]

# ---- exactly one mascot + small desk, centred under the whole row: one relay of developers ----
MS = 0.55
DESK_W, DESK_Y, BODY_H = 260, 680, 54
desk_x = (cols[1] + COL_W / 2) - DESK_W / 2
b += [mascot(desk_x + (DESK_W - 240 * MS) / 2, DESK_Y - 143 * MS, MS),
      desk(desk_x, DESK_Y, DESK_W, None, body_h=BODY_H)]

print(save("s7-lib-assembly.svg", b, "7/11 함수 조립 · A -> B -> C (tools/illus/s7_lib_assembly.py)"))
