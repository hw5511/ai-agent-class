"""A1/7 처음부터 생성 vs 템플릿: left, the mascot surrounded by scattered decision bubbles (폰트,
색상, 여백, 목차) looking overwhelmed. Right, the mascot holds a template document with clearly marked
blank slots and only fills in the values — same desk language, opposite amount of decisions."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 800, 660, WARM_ZONE), zone(930, 90, 802, 660, ACCENT_ZONE)]

# left: scratch — scattered decision bubbles around the mascot
b += [text(460, 150, "처음부터 생성", 30, 800, MUTED)]
b += [mascot(340, 480)]
decisions = [("폰트?", 200, 250), ("색상?", 560, 230), ("여백?", 200, 400), ("목차?", 600, 400)]
for i, (label, x, y) in enumerate(decisions):
    b += [bubble(x, y, 140, 70, label, 24, "#fff", LINE2, MUTED, tail_x=x + 70)]
b += [badge(745, 210, 1)]

# right: template — a document with slots, mascot filling in a value
b += [text(1330, 150, "템플릿 사용", 30, 800, MUTED)]
tpl_x, tpl_y, tpl_w, tpl_h = 1120, 240, 340, 420
b += [f'<rect x="{tpl_x}" y="{tpl_y}" width="{tpl_w}" height="{tpl_h}" rx="16" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#sh)"/>']
slots = [("제목", 60), ("이미지", 140), ("본문", 260), ("날짜", 360)]
for label, dy in slots:
    b += [f'<rect x="{tpl_x+24}" y="{tpl_y+dy}" width="{tpl_w-48}" height="46" rx="8" fill="none" stroke="{ACCENT}" stroke-width="3" stroke-dasharray="8 8"/>']
    b += [text(tpl_x + 40, tpl_y + dy + 30, label, 22, 700, ACCENT, anchor="start")]
b += [badge(tpl_x + tpl_w - 20, tpl_y, 2)]
b += [mascot(1500, 520)]
# the pen sits at the mascot's hand and its tip lands on the template's edge — held, not floating
b += [icon_pencil(1478, 552, 46, ACCENT, -160)]

print(save("a1-why-template-vs-scratch.svg", b, "A1/7 처음부터 생성 vs 템플릿 (tools/illus/a1_why_template_vs_scratch.py)"))
