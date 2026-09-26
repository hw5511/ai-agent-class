"""7/4 스킬 = 필요할 때 꺼내 쓰는 가이드북: mascot pulls one guidebook off a wall shelf and hands it to Claude,
who receives it resting on the desk (not floating)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 760, 660, ACCENT_ZONE), zone(970, 90, 762, 660, WARM_ZONE)]

# left: wall shelf of guidebooks above the mascot's own desk
b += [text(440, 148, "스킬 선반", 30, 800, MUTED)]
shelf_y = 258
b += [f'<rect x="130" y="{shelf_y}" width="600" height="20" rx="8" fill="{DESK_TOP}"/>']
for cx in (200, 340, 480):
    b.append(f'<g opacity="0.32">{icon_book(cx, shelf_y - 46, 84, ACCENT_MID)}</g>')
b += [icon_book(636, shelf_y - 60, 116, ACCENT), text(636, shelf_y + 46, "카드뉴스", 28, 800, INK, family=MONO)]
b += [badge(636, shelf_y - 108, 2)]

b += [mascot(90, 338), desk(70, 480, 500, "내 컴퓨터")]
b += [badge(250, 305, 1)]

# right: Claude desk receiving the guidebook - it lands on the LEFT side of the desk (facing the
# shelf), clear of the mascot, not in the air and not crossing the mascot's head
b += [mascot(1290, 338), desk(1000, 480, 690, "Claude")]
b += [path("M700 235C860 195 980 260 1080 418")]
b += [icon_book(1130, 460, 90, ACCENT)]
b += [badge(1215, 460, 3)]

print(save("s7-skill-manual.svg", b, "7/4 스킬 = 필요할 때 꺼내 쓰는 가이드북 (tools/illus/s7_skill_manual.py)"))
