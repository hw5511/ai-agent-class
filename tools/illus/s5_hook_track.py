"""5/42 훅 라이프사이클: a plain row of boxes in lifecycle order - SessionStart,
UserPromptSubmit, a grouped "[PreToolUse, 도구 실행, PostToolUse] 반복" box, Stop,
SessionEnd - joined by thin connectors. UserPromptSubmit, PostToolUse and Stop carry
blue badges 1/2/3 and a subtle blue border (the events s5-hook-intro-02's notes cover);
the full event list already lives in the next two table slides, so this stays a simple
box row, not another table (spec update 2026-09-26, coordinating session).

Muted palette only: white boxes, thin neutral borders, dark ink text, blue accent only
for badges/borders, Claude orange only for the mascot. No bells, no big loop arrow.

Second pass (spec update 2026-09-26, reviewer defects): the row was a thin band with
tiny text on the 1792-wide canvas (renders ~900px on the slide, so 18-22px text became
~10px on screen). Scaled the whole composition up - row spans the canvas width (60px
side margins), sits in the lower-middle, main box labels are 36px bold, inner loop
labels 30px, group caption 28px, the "따로 발생" line 30px, boxes are 170px tall.
UserPromptSubmit breaks to two lines to keep its box a sane width. Connectors are now
thin (2-2.5px) neutral-grey lines with small (~10px) heads, not chunky triangles. The
mascot moved off the lone top-right corner and now stands small (125px wide) just
above SessionStart, attached to the flow as its actor.

Third pass (spec update 2026-09-26, reviewer defects on the second pass):
1. Badges 1/2/3 overlapped their own box text (badge 1 sat on "UserPrompt", badge 3
   touched "Stop"). Every badge now sits OUTSIDE its box, centred on the box's
   top-right corner and nudged up so only its bottom 8px dips inside the box.
2. Box text was measured with cairosvg (which renders Pretendard ~8% narrower than a
   real browser) with too little padding, so "SessionStart"/"SessionEnd" nearly
   touched their borders and would clip live. Every box width below is now
   `1.1 x measured-text-width + 56` (>=28px padding each side against the 1.1x
   estimate). Main labels dropped 36px -> 32px to make that padding fit; the inner
   loop labels dropped 30px -> 22px for the same reason (the grouped box has three
   labels plus two connectors to fit in one width).
3. Connectors were arrow_head()'s filled triangle (its `size` floor of 22px made the
   "small" heads chunky regardless of what was passed). Connectors are now drawn by
   this file's own `connector()`: a 2.5px #9aa0a6 line with a 10px OPEN chevron head
   (two strokes, no fill), >=10px clear of both boxes, and >=40px of box-to-box gap
   throughout (outer row and the inner loop alike).
4. The row sat at y=470 on an 840-tall canvas, leaving the top ~45% empty. The whole
   block (mascot + row + the "따로 발생" caption) moved up so the row's top is ~345
   (mascot top ~245, caption baseline ~607) - comfortably inside the reviewer's
   330-360 band, with clear space both above and below instead of one huge dead zone.

Widths/positions below are computed once from cairosvg text measurements (see the
sibling measurement script used to derive them) and then hard-coded, the same
"measured, not guessed" convention the rest of illuskit's callers use.
"""
import math
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

Y, H = 345, 190
CY = Y + H / 2

MAIN_SIZE = 32   # reduced from 36 (reviewer defect 2) so 28px padding fits the 1.1x estimate
LOOP_SIZE = 22   # reduced from 30 for the same reason inside the narrower grouped box
GAP = 40         # box-to-box gap everywhere (reviewer defect 3: >=40px)


def connector(x1, x2, y, color=LINE2, width=2.5, clear=10, head=10):
    """A thin line from box-edge x1 to box-edge x2 at height y, stopping `clear` px short
    of each box, with a small OPEN chevron head (two strokes, not a filled triangle) at
    the arrival end. Replaces arrow_head(), whose 22px fill-triangle floor is why the
    old connectors read as chunky grey triangles."""
    lx1, lx2 = x1 + clear, x2 - clear
    out = [f'<line x1="{lx1}" y1="{y}" x2="{lx2}" y2="{y}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>']
    for delta in (150, -150):
        a = math.radians(delta)
        ex = lx2 + head * math.cos(a)
        ey = y + head * math.sin(a)
        out.append(f'<line x1="{lx2}" y1="{y}" x2="{ex:.1f}" y2="{ey:.1f}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>')
    return "\n".join(out)


def corner_badge(x, w, top, n):
    """A numbered badge OUTSIDE the box at (x, top), centred on its top-right corner and
    raised so only its bottom 8px dips inside the box (reviewer defect 1: no overlap
    with the box's own text, >=12px clear of it in every case here)."""
    return badge(x + w, top - 20, n)


boxes = [
    # (x, w, lines, badge_n, accent) - widths = 1.1x measured text + 56 (>=28px pad/side)
    (46, 268, ["SessionStart"], None, False),
    (354, 254, ["UserPrompt", "Submit"], 1, True),
    (648, 634, None, None, True),  # grouped tool-loop box, drawn separately below
    (1322, 134, ["Stop"], 3, True),
    (1496, 250, ["SessionEnd"], None, False),
]

# connectors between the top-level boxes
for i in range(len(boxes) - 1):
    x1 = boxes[i][0] + boxes[i][1]
    x2 = boxes[i + 1][0]
    b += [connector(x1, x2, CY)]

# simple boxes
for x, w, lines, badge_n, accent in boxes:
    if lines is None:
        continue
    stroke = ACCENT if accent else LINE
    sw = 4 if accent else 3
    b += [f'<rect x="{x}" y="{Y}" width="{w}" height="{H}" rx="20" fill="#fff" stroke="{stroke}" stroke-width="{sw}"/>']
    if len(lines) == 1:
        b += [text(x + w / 2, CY + 10, lines[0], MAIN_SIZE, 800, INK)]
    else:
        b += [text(x + w / 2, CY - 14, lines[0], MAIN_SIZE, 800, INK)]
        b += [text(x + w / 2, CY + 30, lines[1], MAIN_SIZE, 800, INK)]
    if badge_n:
        b += [corner_badge(x, w, Y, badge_n)]

# grouped tool-loop box: [PreToolUse, 도구 실행, PostToolUse] 반복
gx, gw = 648, 634
b += [f'<rect x="{gx}" y="{Y}" width="{gw}" height="{H}" rx="20" fill="#fff" stroke="{ACCENT}" stroke-width="4"/>']
b += [text(gx + gw / 2, Y + 48, "도구 실행마다 반복", 28, 700, MUTED)]
sub = ["PreToolUse", "도구 실행", "PostToolUse"]
sub_w = [188, 144, 202]  # 1.1x measured (22px/700) + 56
sub_y = Y + 70
sub_h = 76
sx = gx + (gw - (sum(sub_w) + GAP * 2)) / 2
centers = []
post_box = None
for i, (lbl, w) in enumerate(zip(sub, sub_w)):
    is_post = lbl == "PostToolUse"
    b += [f'<rect x="{sx}" y="{sub_y}" width="{w}" height="{sub_h}" rx="12" fill="#fff" stroke="{ACCENT if is_post else LINE}" stroke-width="{3 if is_post else 2.5}"/>']
    b += [text(sx + w / 2, sub_y + sub_h / 2 + 7, lbl, LOOP_SIZE, 700, INK)]
    centers.append((sx, sx + w))
    if is_post:
        post_box = (sx, w)
    sx += w + GAP
for i in range(len(sub) - 1):
    x1, x2 = centers[i][1], centers[i + 1][0]
    b += [connector(x1, x2, sub_y + sub_h / 2, clear=8, head=8)]
b += [corner_badge(post_box[0], post_box[1], sub_y, 2)]

# mascot, small, attached to the flow - the actor standing just above SessionStart
MS = 125 / 240
mascot_h = 143 * MS
mascot_x = 46 + (268 - 125) / 2
mascot_bottom_gap = 25
mascot_y = Y - mascot_bottom_gap - mascot_h
b += [mascot(mascot_x, mascot_y, MS)]

# side note: events that fire separately
b += [text(896, Y + H + 72, "따로 발생: Notification · PreCompact · SubagentStart · SubagentStop", 30, 700, MUTED)]

print(save("s5-hook-track.svg", b, "5/42 훅 라이프사이클 (tools/illus/s5_hook_track.py)"))
