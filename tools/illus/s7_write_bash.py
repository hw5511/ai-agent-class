"""7/10 유저 지시 -> Write -> Bash 구조: three zone scenes side by side - a request bubble, the
mascot writing a script at its desk, then running it in a terminal with the result popping out.
Solid arrows carry the request from tile 1 to the script in tile 2, then to the terminal in tile 3."""
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
STEPS = ["유저 지시", "스크립트 작성", "Bash 로 실행"]

# ---- header row: badge + step caption, once per zone, well clear of the desk plate below ----
for i, z in enumerate(zones):
    b += [badge(z + 46, HEADER_Y, i + 1), text(z + 96, HEADER_Y + 10, STEPS[i], 30, 900, INK, anchor="start")]

# ---- 1: 유저 지시 - a request bubble above the mascot's desk ----
z = zones[0]
cx = z + ZONE_W / 2
b += [bubble(z + 60, 190, ZONE_W - 120, 120, "QR 코드 만들어줘", size=32, tail_x=cx)]
b += [mascot(cx - 240 * MS / 2, DESK_Y - 143 * MS, MS), desk(z + 46, DESK_Y, ZONE_W - 92, "유저", body_h=150)]

# ---- 2: 스크립트 작성 - the mascot writes a script page (Write 툴) ----
z = zones[1]
cx = z + ZONE_W / 2
b += [doc(cx - 90, 200, 180, -4)]
b += [text(cx, 400, "qr.py", 30, 800, ACCENT_DARK, family=MONO),
      text(cx, 438, "Write 툴", 24, 700, MUTED)]
b += [mascot(cx - 240 * MS / 2, DESK_Y - 143 * MS, MS), desk(z + 46, DESK_Y, ZONE_W - 92, "Claude", body_h=150)]

# ---- 3: 실행 - a terminal window runs the script, result pops out ----
z = zones[2]
cx = z + ZONE_W / 2
term_w, term_h = ZONE_W - 120, 170
term_body = (text(20, 40, "$ python qr.py", 22, 700, "#c9ccd1", anchor="start", family=MONO) +
             text(20, 78, "qr.png 생성됨", 22, 700, GREEN, anchor="start", family=MONO))
b += [window(z + 60, 170, term_w, term_h, "terminal", "Bash", term_body)]
b += [check(cx, 390, 26), text(cx, 452, "결과 완성", 26, 800, GREEN)]
b += [mascot(cx - 240 * MS / 2, DESK_Y - 143 * MS, MS), desk(z + 46, DESK_Y, ZONE_W - 92, "Claude", body_h=150)]

# ---- solid arrows carrying the request across the gaps: bubble -> script, script -> terminal ----
b += [path(f"M{zones[0] + ZONE_W - 4} {230}C{zones[0] + ZONE_W + 90} {230} {zones[1] + 60} {220} {zones[1] + 175} {220}", width=6)]
b += [path(f"M{zones[1] + ZONE_W - 20} {260}C{zones[1] + ZONE_W + 90} {250} {zones[2] + 30} {230} {zones[2] + 66} {232}", width=6)]

print(save("s7-write-bash.svg", b, "7/10 유저 지시 · Write · Bash 구조 (tools/illus/s7_write_bash.py)"))
