"""A1/3 AI 개입이 필요한 3가지 경우: a question bubble at the top asks the key question, three
labelled cards below it (판단·분기, 대량 정리, 텍스트 생성) each send a short arrow down to the
mascot who does the work, reading order left to right, badges 1-3, tip badge on the bubble."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 1672, 660, ACCENT_ZONE)]

b += [bubble(726, 330, 340, 100, "코드에 AI 개입이\n필요한가?", 25, "#fff", ACCENT, ACCENT, tail_x=896)]
b += [badge(1120, 315, "!")]

# three cards, spaced with real gaps so their borders never touch, arrows landing at three
# separate points above the mascot's head instead of one tangled joint
w = 460
gap = 50
xs = [156, 156 + w + gap, 156 + 2 * (w + gap)]
positions = [
    (xs[0], "지능적 판단·분기", "A 냐 B 냐"),
    (xs[1], "대량 텍스트·코드 정리", "많은 자료 분석"),
    (xs[2], "텍스트 생성", "코딩·원고 작성"),
]
end_xs = [820, 906, 992]
for i, ((x, title, sub), end_x) in enumerate(zip(positions, end_xs), start=1):
    b += [part_box(x, 460, w, 120, None, fill="#fff", stroke=LINE2, corner=18)]
    b += [text(x + w / 2, 460 + 48, title, 26, 900, INK)]
    b += [text(x + w / 2, 460 + 88, sub, 21, 600, MUTED)]
    b += [badge(x + 30, 460, i)]
    cx = x + w / 2
    b += [path(f"M{cx} 580C{cx} 615 {(cx + end_x) / 2:.0f} 635 {end_x} 656")]

b += [mascot(786, 690)]
b += [text(1050, 765, "Claude", 30, 900, INK, anchor="start")]

print(save("a1-why-intervention.svg", b, "A1/3 AI 개입이 필요한 3가지 경우 (tools/illus/a1_why_intervention.py)"))
