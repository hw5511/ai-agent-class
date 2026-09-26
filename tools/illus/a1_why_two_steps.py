"""A1/8 템플릿 워크플로 · 2단계: a JSON file flows into a script box which produces the finished
output — exactly two steps, drawn the same way the flow slides in this course are, but as a scene
with the mascot at the desk running it."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 1672, 660, ACCENT_ZONE)]

b += [mascot(180, 460), desk(100, 600, 300, "Claude")]

# step 1: JSON file — a dark editor pane so the code text reads clearly, not the pale text on a
# light pane the earlier draft used
json_body = "".join([
    text(16, 32, "{ \"title\":", 18, 700, "#7fd7ff", anchor="start", family=MONO),
    text(16, 58, "  \"...\" }", 18, 700, "#e6e8eb", anchor="start", family=MONO),
])
b += [window(470, 320, 300, 170, kind="terminal", title="content.json", body=json_body)]
b += [badge(770, 330, 1)]

# the arrow stops at the window's left edge instead of reaching into the code text
b += [path("M420 500C450 470 460 440 468 410")]

# step 2: the script box
b += [part_box(880, 400, 260, 140, "스크립트 실행", fill="#fff", stroke=ACCENT, label_size=26)]
b += [badge(880, 400, 2)]

b += [path("M770 400C820 400 830 400 880 460", color=ACCENT)]
b += [path("M1140 460C1260 460 1320 480 1380 500", color=GREEN)]

# result
b += [doc(1440, 420, 100, -4, GREEN)]
b += [check(1540, 480, 26)]
b += [text(1490, 600, "완성된 결과물", 26, 800, GREEN)]

print(save("a1-why-two-steps.svg", b, "A1/8 템플릿 워크플로 · 2단계 (tools/illus/a1_why_two_steps.py)"))
