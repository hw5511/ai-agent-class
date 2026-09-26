"""6/5 버튼 시동 vs 전선 직결: left - the mascot sits in the driver's window and presses a big round START
button on the dashboard; right - the same car with its FRONT hood hinged open at the windscreen, the
mascot standing at the nose twisting two wires together (that is what an API call looks like)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def car(x, y, s, hood_open) -> list[str]:
    """A flat side-view car, front on the right; local ground line at y=232, rear bumper near x=10,
    front bumper near x=612 -> about 630 x 260 at s=1 (before any hinged-open hood or actors)."""
    g = [f'<g transform="translate({x} {y}) scale({s})">']

    # body: rear fender -> cabin pillar -> flat roof -> windscreen -> hood -> front fender -> bumper
    body_d = ("M10 200 Q10 130 70 118 L165 118 L210 34 Q226 16 252 16 L410 16 Q440 16 456 38 "
              "L452 118 L560 118 Q612 118 612 158 L612 200 Z")
    g.append(f'<path d="{body_d}" fill="{ACCENT_MID}" filter="url(#shs)"/>')
    g.append(f'<rect x="10" y="186" width="602" height="20" fill="{ACCENT_DARK}"/>')

    # cabin glass (one greenhouse pane)
    win_d = "M188 112 L222 42 Q234 28 256 28 L404 28 Q426 28 438 48 L432 112 Z"
    g.append(f'<path d="{win_d}" fill="{SCREEN}" stroke="{ACCENT_DARK}" stroke-width="4"/>')

    if not hood_open:
        # the mascot sits in the driver's window, sized to stay inside the glass
        g.append(f'<g transform="translate(240 30) scale(0.55)">{mascot(0, 0)}</g>')
        # a big round START button on the dashboard, right next to the mascot, being pressed
        bx, by, br = 400, 96, 32
        g.append(f'<circle cx="{bx}" cy="{by}" r="{br + 8}" fill="#fff" filter="url(#shs)"/>')
        g.append(f'<circle cx="{bx}" cy="{by}" r="{br}" fill="{ACCENT}" stroke="#fff" stroke-width="4"/>')
        g.append(text(bx, by + 7, "시동", 19, 900, "#fff"))
        g.append(f'<path d="M{bx - br - 18} {by}q9 13 0 26M{bx + br + 18} {by}q-9 13 0 26" fill="none" '
                  f'stroke="{ACCENT}" stroke-width="4" stroke-linecap="round" opacity="0.55"/>')
    else:
        # the hood, hinged at the windscreen base, lifted open at the nose
        hood_d = "M452 118 L560 118 Q612 118 612 158 L612 200 L452 200 Z"
        g.append(f'<path d="{hood_d}" fill="{INK2}"/>')  # the open engine bay underneath
        for ex in (490, 520, 550):
            g.append(f'<circle cx="{ex}" cy="158" r="10" fill="#3a3f46"/>')
        g.append(f'<g transform="rotate(-108 452 118)"><path d="{hood_d}" fill="{ACCENT_MID}" '
                  f'stroke="{ACCENT_DARK}" stroke-width="3" filter="url(#shs)"/></g>')

    for cx in (140, 530):
        g.append(f'<circle cx="{cx}" cy="200" r="42" fill="{INK2}"/><circle cx="{cx}" cy="200" r="17" fill="{LINE}"/>')
    g.append("</g>")
    return g


b = [panel()]
b += [zone(40, 100, 850, 660, WARM_ZONE), zone(920, 100, 830, 660, ACCENT_ZONE)]

# 1: easy — the mascot in the window presses the dashboard button, the car starts
CX1, CY1, S1 = 110, 300, 1.0
b += car(CX1, CY1, S1, hood_open=False)
b += [badge(CX1 + (400 + 40) * S1, CY1 + (96 - 40) * S1, 1)]
b += [text(465, 660, "버튼 시동", 44, 900, INK)]
b += [text(465, 706, "누르기만 하면 됨", 26, 700, MUTED)]

# 2: hard — front hood open, the mascot at the nose twists two bare wires together (= an API call)
CX2, CY2, S2 = 960, 300, 1.0
b += car(CX2, CY2, S2, hood_open=True)

MASCOT_S = 0.68
mascot_x, mascot_y = CX2 + 612 * S2 + 28, CY2 + 200 * S2 - 143 * MASCOT_S
b += [mascot(mascot_x, mascot_y, MASCOT_S)]

tw_cx, tw_cy = CX2 + 500 * S2, CY2 + 140 * S2
hand_x, hand_y = mascot_x + 24 * MASCOT_S, mascot_y + 66 * MASCOT_S
b += [f'<path d="M{hand_x} {hand_y - 16}C{tw_cx + 60} {tw_cy - 30} {tw_cx + 24} {tw_cy - 12} {tw_cx} {tw_cy}" '
      f'fill="none" stroke="{ACCENT}" stroke-width="8" stroke-linecap="round"/>',
      f'<path d="M{hand_x} {hand_y + 16}C{tw_cx + 60} {tw_cy + 26} {tw_cx + 24} {tw_cy + 10} {tw_cx} {tw_cy}" '
      f'fill="none" stroke="{MASCOT}" stroke-width="8" stroke-linecap="round"/>',
      f'<circle cx="{tw_cx}" cy="{tw_cy}" r="11" fill="{INK}"/>']
spark = f'M{tw_cx - 24} {tw_cy - 34}l10 -20l6 13l14 -9l-8 20l16 2l-18 10l4 17l-16 -11l-10 15z'
b += [f'<path d="{spark}" fill="{MASCOT}" stroke="#fff" stroke-width="2"/>']
b += [badge(tw_cx - 10, tw_cy - 60, 2)]

b += [text(1336, 660, "전선 직결 = API", 44, 900, INK)]
b += [text(1336, 706, "규칙대로 직접 연결", 26, 700, MUTED)]

print(save("s6-car-api.svg", b, "6/5 버튼 시동 vs 전선 직결 (tools/illus/s6_car_api.py)"))
