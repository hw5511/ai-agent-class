"""A1/1 스킬 만들기 vs 스킬로 작업하기: two desks side by side. Left, the mascot (Claude) writes code
that becomes a skill folder (badge 1). Right, a different moment: the mascot already holds the
finished skill and uses it to produce an output document (badge 2). A dotted divider keeps the two
scenes apart. Both desks are labelled Claude — Claude is the actor doing the work at the desk, not
the student."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 800, 660, WARM_ZONE), zone(930, 90, 802, 660, ACCENT_ZONE)]
b += [f'<line x1="896" y1="120" x2="896" y2="720" stroke="{LINE2}" stroke-width="3" stroke-dasharray="10 10"/>']

# left: building a skill — mascot at a desk with a code window, arrow into a folder labelled 스킬
b += [text(460, 150, "스킬 만들기", 30, 800, MUTED)]
b += [mascot(200, 386), desk(120, 500, 460, "Claude")]
code_body = "".join([
    text(16, 40, "def run():", 20, 700, ACCENT_MID, anchor="start", family=MONO),
    text(16, 68, "    build()", 20, 700, PAPER_LINE, anchor="start", family=MONO),
])
b += [window(430, 200, 300, 180, kind="terminal", title="cardnews.py", body=code_body)]
b += [badge(730, 210, 1)]
b += [path("M580 380C580 430 585 470 590 505")]
b += [folder(520, 520, 140)]
b += [text(590, 520 + 140 * 0.775 + 55, "스킬", 26, 800, INK, family=MONO)]

# right: using a skill — mascot at a desk with a finished skill folder producing an output doc.
# The folder sits well above the mascot's head, the result docs sit to its right (clear of its
# face/body), and the 결과물 label sits to the left of those docs — nothing lands on the mascot.
b += [text(1330, 150, "스킬로 작업하기", 30, 800, MUTED)]
b += [mascot(1400, 406), desk(1180, 520, 480, "Claude")]
b += [folder(1180, 220, 140, "스킬")]
b += [path("M1320 300C1360 320 1380 350 1400 390")]
b += [doc(1590, 225, 90, 6, ACCENT), doc(1630, 250, 90, -4, ACCENT_DARK)]
b += [path("M1500 385C1550 355 1580 345 1610 335", color=GREEN)]
b += [text(1580, 300, "결과물", 26, 800, INK, anchor="end")]
b += [badge(1580, 210, 2)]

print(save("a1-why-build-vs-use.svg", b, "A1/1 스킬 만들기 vs 스킬로 작업하기 (tools/illus/a1_why_build_vs_use.py)"))
