"""7/34 스킬 = 정리된 가이드: repeated requests from the student pile up, get bound into one SKILL.md
guide, and land ready on Claude's desk (arrow ends at the book on the desk, not in the air)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 1672, 660, ACCENT_ZONE)]

# left: student desk, three repeated requests piling up above the mascot's head, caption clear below them
b += [mascot(150, 338), desk(70, 480, 400, "학생")]
b += [badge(300, 145, 1)]
for x, y, r in [(210, 178, -4), (262, 211, 0), (314, 244, 4)]:
    b.append(doc(x, y, 72, r))
b += [text(480, 312, "같은 요청 반복", 28, 700, MUTED)]

b += [path("M386 268C550 268 680 260 828 260")]

# centre: bound into one SKILL.md guide
b += [icon_book(920, 260, 160, ACCENT)]
b += [text(920, 385, "SKILL.md", 32, 900, INK, family=MONO)]
b += [badge(1010, 170, 2)]

b += [path("M1000 260C1140 240 1230 320 1215 435")]

# right: the book lands on the LEFT side of Claude's desk (facing SKILL.md), clear of the mascot;
# the check and badge 3 sit side by side next to the book, not stacked on it
desk_x, desk_w = 1080, 620
b += [mascot(1360, 338), desk(desk_x, 480, desk_w, "Claude")]
b += [icon_book(1260, 460, 70, ACCENT)]
b += [check(1195, 460, 18)]
b += [badge(1130, 460, 3)]

print(save("s7-cardnews-pattern.svg", b, "7/34 스킬 = 정리된 가이드 (tools/illus/s7_cardnews_pattern.py)"))
