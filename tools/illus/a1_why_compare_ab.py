"""A1/5 비교 · 읽어서 옮기기 vs 구조 파악: split the stage in two. Top row (A안): the mascot repeats
the same read-and-copy loop 200 times, drawn as a looping arrow back onto itself, ending tired. Bottom
row (B안): the mascot checks only a few PDFs to learn the table's structure, then writes one script
that the computer runs across all 200 — two short steps instead of one long repeat."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 96, 1672, 300, WARM_ZONE), zone(60, 420, 1672, 330, ACCENT_ZONE)]

# A안 — top: one mascot (same scale as every other slide), one document held at arm's length
# (never on the mascot), a clean "x 200 반복" mark beside it that covers no other text
b += [text(150, 150, "A안", 30, 900, INK)]
b += [mascot(140, 220)]
b += [path("M380 290C410 290 430 290 455 290", color=RED)]
b += [doc(460, 235, 80, -3, RED)]
b += [badge(560, 218, 1)]
b += [text(630, 300, "x 200 반복", 28, 800, RED, anchor="start")]
b += [text(140, 400, "PDF 열기 → 표 읽기 → 엑셀에 옮기기", 24, 700, INK, anchor="start")]

# B안 — bottom: sample check, then one script running over the whole pile. The doc cluster
# starts clear of the mascot's right edge instead of overlapping it.
b += [text(150, 470, "B안", 30, 900, INK)]
b += [mascot(220, 500)]
for i, (dx, r) in enumerate([(0, -4), (36, 0), (72, 4)]):
    b.append(doc(480 + dx, 480, 70, r, ACCENT))
b += [text(620, 610, "몇 개만 구조 파악", 26, 800, INK)]
b += [badge(480, 460, 2)]

b += [path("M690 520C780 520 830 560 900 590")]
b += [part_box(920, 540, 260, 100, "스크립트\n1번 작성", fill=ACCENT_TINT, stroke=ACCENT, label_size=26)]
b += [badge(920, 540, 3)]
b += [path("M1180 590C1260 590 1300 590 1360 590", color=GREEN)]
for i, (dx, r) in enumerate([(0, -4), (36, 0), (72, 4)]):
    b.append(doc(1400 + dx, 520, 60, r, GREEN))
b += [check(1600, 560, 26)]
b += [text(1470, 660, "200개 전부 처리", 24, 800, GREEN)]

print(save("a1-why-compare-ab.svg", b, "A1/5 비교 · 읽어서 옮기기 vs 구조 파악 (tools/illus/a1_why_compare_ab.py)"))
