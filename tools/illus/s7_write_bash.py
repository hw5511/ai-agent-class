"""7/10 유저 지시 -> Write -> Bash 구조: a structured 3-column row, aligned on one grid - a request
box, a script box (Write), a terminal box (Bash) - joined by straight neutral connectors in one left
to right flow. One small mascot + desk sits centred underneath, carrying the work through."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
COL_W, GAP, X0 = 520, 40, 76
cols = [X0 + i * (COL_W + GAP) for i in range(3)]
TITLES = ["유저 지시", "스크립트 작성", "Bash 로 실행"]
SUBS = ["자연어로 요청", "Write 툴로 직접 작성", "실행해서 결과 생성"]
HEADER_Y, SUB_Y = 260, 294
CARD_Y, CARD_H = 324, 210
ACTORS = ["유저", "Claude", "Claude"]
CAPTION_Y = CARD_Y + CARD_H + 40

# ---- header row: badge + bold title + grey sub-label, once per column ----
for i, x in enumerate(cols):
    b += [badge(x + 22, HEADER_Y, i + 1), text(x + 60, HEADER_Y + 10, TITLES[i], 32, 900, INK, anchor="start"),
          text(x + 60, SUB_Y + 10, SUBS[i], 24, 600, MUTED, anchor="start")]

# ---- column 1: the request, as a plain labelled card (no speech bubble) ----
x = cols[0]
b += [part_box(x, CARD_Y, COL_W, CARD_H, None, fill="#fff", stroke="#e5e5e5")]
b += [text(x + COL_W / 2, CARD_Y + CARD_H / 2 + 8, '"QR 코드 만들어줘"', 30, 800, ACCENT_DARK)]

# ---- column 2: the script (Write 툴), file name + tool tag as plain rows ----
x = cols[1]
b += [part_box(x, CARD_Y, COL_W, CARD_H, None, fill="#fff", stroke="#e5e5e5")]
b += [text(x + COL_W / 2, CARD_Y + 92, "qr.py", 34, 800, ACCENT_DARK, family=MONO),
      text(x + COL_W / 2, CARD_Y + 140, "Write 툴", 26, 700, MUTED)]

# ---- column 3: the terminal (Bash), command + result as two lines ----
x = cols[2]
b += [part_box(x, CARD_Y, COL_W, CARD_H, None, fill=INK2, stroke=INK2)]
b += [text(x + 36, CARD_Y + 92, "$ python qr.py", 26, 700, "#c9ccd1", anchor="start", family=MONO),
      text(x + 36, CARD_Y + 140, "qr.png 생성됨", 26, 700, ACCENT_MID, anchor="start")]

# ---- one straight neutral connector per gap, aligned on the card's mid-height ----
mid_y = CARD_Y + CARD_H / 2
for i in range(2):
    b += [connector(cols[i] + COL_W, mid_y, cols[i + 1], mid_y)]

# ---- who is at each step, directly under its card ----
for i, x in enumerate(cols):
    b += [text(x + COL_W / 2, CAPTION_Y, ACTORS[i], 26, 800, INK)]

# ---- exactly one mascot + small desk, centred under the whole row: Claude carries the work through ----
MS = 0.55
DESK_W, DESK_Y, BODY_H = 260, 680, 54
desk_x = (cols[1] + COL_W / 2) - DESK_W / 2
b += [mascot(desk_x + (DESK_W - 240 * MS) / 2, DESK_Y - 143 * MS, MS),
      desk(desk_x, DESK_Y, DESK_W, None, body_h=BODY_H)]

print(save("s7-write-bash.svg", b, "7/10 유저 지시 · Write · Bash 구조 (tools/illus/s7_write_bash.py)"))
