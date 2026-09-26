"""7/5 CLAUDE.md 포화: a labelled CLAUDE.md document sits open on the desk; a pile of pages spills up out of
it and off both edges of the desk, burying the mascot up to the chest while its face stays visible."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(90, 90, 1612, 660, WARM_ZONE)]

b += [mascot(776, 338, 1.0, opacity=0.92), desk(446, 480, 900)]

# the source document on the desk that the pile spills from
b += [doc(600, 430, 110, -4, ACCENT_DARK)]
b += [text(655, 605, "CLAUDE.md", 28, 800, ACCENT_DARK, family=MONO)]
b += [badge(520, 470, 1)]

# front pile burying the mascot's body (chin and up stay clear)
front = [(760, 460, 84, -8), (858, 445, 90, 10), (948, 430, 84, -6), (1000, 460, 78, 14),
         (818, 402, 76, -12), (896, 470, 88, 6)]
for x, y, w, r in front:
    b.append(doc(x, y, w, r))

# spill rising up and off the left edge of the desk
left_rise = [(636, 418, 72, -8), (578, 358, 70, 14), (520, 298, 68, -16), (470, 238, 66, 12),
             (430, 184, 64, -14), (400, 140, 60, 16)]
for x, y, w, r in left_rise:
    b.append(doc(x, y, w, r))
left_land = [(250, 636, 66, -20), (180, 668, 60, 16), (320, 656, 64, -10)]
for x, y, w, r in left_land:
    b.append(doc(x, y, w, r))

# spill rising up and off the right edge of the desk
right_rise = [(1150, 418, 72, 8), (1208, 358, 70, -14), (1268, 298, 68, 16), (1318, 238, 66, -12),
              (1358, 184, 64, 14), (1388, 140, 60, -16)]
for x, y, w, r in right_rise:
    b.append(doc(x, y, w, r))
right_land = [(1420, 636, 66, 20), (1480, 668, 60, -16), (1538, 656, 64, 10)]
for x, y, w, r in right_land:
    b.append(doc(x, y, w, r))

b += [badge(1060, 360, 2)]

print(save("s7-skill-overflow.svg", b, "7/5 CLAUDE.md 포화 · 전부 항상 로드 (tools/illus/s7_skill_overflow.py)"))
