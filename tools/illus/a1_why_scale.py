"""A1/6 확장성 · 늘어나도 같은 스크립트: one script box in the centre, with three piles of PDFs of
growing size (200, +100, +1000) each feeding into the SAME box and each coming out the other side
checked off — the point is the box never changes."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 1672, 660, ACCENT_ZONE)]

box_x, box_y, box_w, box_h = 790, 400, 260, 140
b += [part_box(box_x, box_y, box_w, box_h, None, fill="#fff", stroke=ACCENT)]
b += [text(box_x + box_w / 2, box_y + box_h / 2 - 10, "같은", 26, 900, INK)]
b += [text(box_x + box_w / 2, box_y + box_h / 2 + 28, "스크립트", 26, 900, INK)]

rows = [
    (200, "기존 200개", 300, 1),
    (100, "100개 추가", 470, 2),
    (1000, "1000개 추가", 640, None),
]
for count, label, y, badge_n in rows:
    b += [doc(120, y - 20, 70, -4, ACCENT), doc(156, y, 70, 3, ACCENT_DARK)]
    b += [text(280, y + 60, label, 26, 800, INK)]
    b += [path(f"M330 {y+30}C500 {y+30} 650 {(y+30+box_y+box_h/2)/2:.0f} {box_x} {box_y+box_h/2:.0f}")]
    if badge_n:
        b.append(badge(240, y - 10, badge_n))

b += [path(f"M{box_x+box_w} {box_y+box_h/2:.0f}C{box_x+box_w+150} {box_y+box_h/2:.0f} {box_x+box_w+260} {box_y+box_h/2:.0f} {box_x+box_w+340} {box_y+box_h/2:.0f}", color=GREEN)]
b += [check(1580, box_y + box_h / 2, 34)]
b += [text(1580, box_y + box_h / 2 + 70, "그대로 처리", 26, 800, GREEN)]

print(save("a1-why-scale.svg", b, "A1/6 확장성 · 늘어나도 같은 스크립트 (tools/illus/a1_why_scale.py)"))
