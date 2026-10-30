"""AU2/submit 1 submission template: one blank 1600 x 1000 sheet with the five zones to fill, in the same grid as the
example sheet (au2_submit_example.py). The mascot at the left margin offers to ask one item at a time.
Badges 1-4 (a slide may carry at most 4 notes): 1 = title + summary (top two zones), 2 = trigger, 3 = why, 4 = diagram."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

SHEET_W, SHEET_H = 1600, 1000
ML, MW = 110, 1380
ZONE = "#d5d8dc"
BAR = "#e6e8eb"

# zone: (x, y, w, h, label)
ZONES = [(ML, 76, MW, 150, "아이디어 제목"), (ML, 250, MW, 140, "간단한 설명"),
         (ML, 414, 670, 200, "아이디어 계기"), (820, 414, 670, 200, "왜 필요한가?"),
         (ML, 638, MW, 286, "다이어그램 구조도")]


def bar(x, y, w, h=22):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h / 2}" fill="{BAR}"/>'


def sheet():
    s = []
    for x, y, w, h, name in ZONES:
        s += [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="#fff" stroke="{ZONE}" stroke-width="2.5"/>']
        s += [text(x + 30, y + 46, name, 32, 800, INK, anchor="start")]
    x, y, w, h, _ = ZONES[0]
    s += [bar(x + 30, y + 88, 620, 28)]
    x, y, w, h, _ = ZONES[1]
    s += [bar(x + 30, y + 74, 1100, 20), bar(x + 30, y + 106, 760, 20)]
    x, y, w, h, _ = ZONES[2]
    s += [bar(x + 30, y + 88, 560, 20), bar(x + 30, y + 126, 500, 20), bar(x + 30, y + 164, 340, 20)]
    x, y, w, h, _ = ZONES[3]
    s += [bar(x + 30, y + 88, 440, 20), bar(x + 30, y + 126, 520, 20), bar(x + 30, y + 164, 400, 20)]
    x, y, w, h, _ = ZONES[4]
    BW, BH, BY = 270, 150, y + 96
    gap = (w - 60 - 4 * BW) / 3
    for i in range(4):
        bx = x + 30 + i * (BW + gap)
        s += [f'<rect x="{bx}" y="{BY}" width="{BW}" height="{BH}" rx="16" fill="#fff" stroke="{ZONE}" stroke-width="2.5"/>']
        s += [bar(bx + 40, BY + 54, BW - 80, 20), bar(bx + 70, BY + 92, BW - 140, 16)]
        if i < 3:
            s += [connector(bx + BW + 12, BY + BH / 2, bx + BW + gap - 12, BY + BH / 2, color=LINE2, width=3, head_size=10)]
    return s


S = 0.68
SX, SY = 480, 130
b = [f'<g filter="url(#shs)"><rect x="{SX}" y="{SY}" width="{SHEET_W * S}" height="{SHEET_H * S}" fill="#fff" stroke="#e5e5e5" stroke-width="2"/></g>',
     f'<g transform="translate({SX} {SY}) scale({S})">' + "".join(sheet()) + "</g>"]
# badges: 1 sits on the right edge between the title and summary zones, 2-4 on the top-right corner of their zone
def at(lx, ly):
    return SX + lx * S, SY + ly * S


b += [badge(*at(ML + MW - 10, 238), 1)]
for n, zi in ((2, 2), (3, 3), (4, 4)):
    x, y, w, h, _ = ZONES[zi]
    b += [badge(*at(x + w - 10, y + 4), n)]

# the mascot offers to ask one item at a time
b += [bubble(66, 556, 330, 66, "한 칸씩 물어볼게요", 28, "#fff", LINE2, INK, tail_x=170)]
b += [mascot(110, 668, 0.85)]
b += [path("M330 736C372 736 408 736 450 736")]
print(save("au2-submit-template.svg", b, "AU2 submit 1 blank idea sheet template (tools/illus/au2_submit_template.py)"))
