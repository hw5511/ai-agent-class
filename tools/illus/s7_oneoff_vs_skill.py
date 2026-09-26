"""7/42 1회성 작업 vs 스킬: a one-off script lives on the mascot's own laptop on the desk; a script asked
for the third time travels (arrow lands on the object, not in the air) into the skill folder on Claude's desk."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 800, 660, WARM_ZONE), zone(930, 90, 802, 660, ACCENT_ZONE)]
b += [text(460, 150, "1회성 작업", 32, 800, MUTED)]
b += [text(1330, 150, "3번 이상 반복", 32, 800, MUTED)]

# left: one script, written and run once, right on the mascot's own laptop - not floating
b += [mascot(150, 338), desk(90, 480, 560, "내 컴퓨터")]
screen = text(100, 58, "script.py", 22, 800, INK, family=MONO) + check(178, 38, 14)
b += [laptop(430, 340, 220, screen=screen)]
b += [badge(400, 290, 1)]

# right: three repeats counted, then the pile travels into the skill folder that sits on Claude's desk
for i, cx in enumerate([1000, 1040, 1080]):
    b.append(doc(cx, 260 + i * 4, 70, -6 + i * 6))
b += [text(1175, 245, "×3", 34, 900, ACCENT_DARK)]
b += [badge(960, 190, 2)]

b += [path("M1150 300C1200 340 1190 390 1170 420")]

# the skill folder sits on the LEFT side of the right desk (facing the docs), clear of the mascot
desk_x, desk_w = 1080, 620
b += [mascot(1310, 338), desk(desk_x, 480, desk_w, "스킬 폴더")]
b += [icon_book(1220, 460, 80, ACCENT)]
b += [check(1220, 424, 18)]

print(save("s7-oneoff-vs-skill.svg", b, "7/42 1회성 작업 vs 스킬 (tools/illus/s7_oneoff_vs_skill.py)"))
