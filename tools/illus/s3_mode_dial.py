"""3/19 Shift+Tab 모드 순환: Claude presses a Shift+Tab knob that rotates a 4-position mode dial;
bypass mode sits off to the side as a separate switch, outside the loop."""
import os, sys
import math
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

MAIN_X, MAIN_W = 40, 1230
SIDE_X = MAIN_X + MAIN_W + 20
SIDE_W = 1750 - SIDE_X
b += [zone(MAIN_X, 40, MAIN_W, 776, WARM_ZONE), zone(SIDE_X, 40, SIDE_W, 776, ACCENT_ZONE)]

CX, CY = 650, 320
RX, RY, SR = 290, 140, 60

# stations in reading order (clockwise from top): manual -> accept edits -> plan -> auto
stations = [
    (-90, "manual mode", "편집 전 확인", "Lock"),
    (0, "accept edits", "명령만 확인", "Edit"),
    (90, "plan mode", "조사만, 편집 차단", "Book"),
    (180, "auto mode", "클로드 판단", "Bot"),
]


def icon_for(kind, cx, cy):
    if kind == "Lock":
        return (f'<rect x="{cx - 20}" y="{cy - 4}" width="40" height="32" rx="6" fill="{ACCENT}"/>'
                f'<path d="M{cx - 13} {cy - 4}v-13a13 13 0 0 1 26 0v13" fill="none" stroke="{ACCENT}" stroke-width="7"/>')
    if kind == "Edit":
        return (f'<path d="M{cx - 20} {cy + 18}l4 -22l32 -32l17 17l-32 32z" fill="{ACCENT}"/>'
                f'<path d="M{cx + 1} {cy - 36}l17 17" stroke="#fff" stroke-width="5"/>')
    if kind == "Book":
        return (f'<path d="M{cx - 23} {cy - 16}h19a8 8 0 0 1 8 8v27h-27z" fill="{ACCENT}"/>'
                f'<path d="M{cx + 23} {cy - 16}h-19a8 8 0 0 0 -8 8v27h27z" fill="{ACCENT_DARK}"/>')
    return (f'<rect x="{cx - 21}" y="{cy - 14}" width="42" height="30" rx="8" fill="{ACCENT}"/>'
            f'<circle cx="{cx - 8}" cy="{cy + 1}" r="4.5" fill="#fff"/><circle cx="{cx + 8}" cy="{cy + 1}" r="4.5" fill="#fff"/>'
            f'<line x1="{cx}" y1="{cy - 14}" x2="{cx}" y2="{cy - 23}" stroke="{ACCENT}" stroke-width="4.5"/>')


pts = []
for ang, label, sub, kind in stations:
    a = math.radians(ang)
    sx, sy = CX + RX * math.cos(a), CY + RY * math.sin(a)
    pts.append((sx, sy))
    b += [f'<circle cx="{sx}" cy="{sy}" r="{SR}" fill="#fff" stroke="{ACCENT}" stroke-width="4" filter="url(#shs)"/>']
    b += [icon_for(kind, sx, sy - 4)]
    if ang == -90:  # manual mode: label goes further up, away from the knob
        b += [text(sx, sy - 80, label, 28, 900, INK), text(sx, sy - 106, sub, 19, 600, MUTED)]
        b += [badge(sx + 112, sy - 44, 1)]
    elif ang == 90:  # plan mode: label goes further down
        b += [text(sx, sy + 98, label, 28, 900, INK), text(sx, sy + 126, sub, 19, 600, MUTED)]
    elif ang == 0:  # accept edits: label to the outer right, at the node's own height (clear of both
        # neighbouring loop arcs, which bulge well above and well below this height)
        b += [text(sx + SR + 20, sy - 6, label, 28, 900, INK, anchor="start"), text(sx + SR + 20, sy + 22, sub, 19, 600, MUTED, anchor="start")]
    else:  # auto mode: label to the outer left, clear of the loop arcs and the path from Claude
        b += [text(sx - 84, sy - 6, label, 28, 900, INK, anchor="end"), text(sx - 84, sy + 22, sub, 19, 600, MUTED, anchor="end")]

# loop arrows: top -> right -> bottom -> left -> top, bowed well outside the diamond
order = [pts[0], pts[1], pts[2], pts[3], pts[0]]
for i in range(4):
    x1, y1 = order[i]
    x2, y2 = order[i + 1]
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    vx, vy = mx - CX, my - CY
    vl = math.hypot(vx, vy) or 1
    mx2, my2 = CX + vx / vl * (vl + 190), CY + vy / vl * (vl + 190)
    sx, sy = x1 + (x2 - x1) * 0.16, y1 + (y2 - y1) * 0.16
    ex, ey = x1 + (x2 - x1) * 0.84, y1 + (y2 - y1) * 0.84
    b += [path(f"M{sx:.0f} {sy:.0f}Q{mx2:.0f} {my2:.0f} {ex:.0f} {ey:.0f}")]

# Claude's desk sits bottom-centre, directly under plan mode. The loop is a closed shape, so no
# arrow can reach a centre knob without crossing one of its segments - instead of a knob, the
# "Shift + Tab" key itself lives on Claude's own desk (no travel arrow needed at all).
DESK_W3, DESK_X3 = 420, 650 - 210
DESK_Y3 = 710
MS = 0.7
body_h3 = 75
b += [mascot(DESK_X3 + DESK_W3 / 2 - 240 * MS / 2, DESK_Y3 - 143 * MS, MS)]
b += [desk(DESK_X3, DESK_Y3, DESK_W3, None, body_h=body_h3)]

mid_y = DESK_Y3 + 24 + body_h3 / 2
plate_cx, key_cx = DESK_X3 + 120, DESK_X3 + 310
b += [f'<rect x="{plate_cx - 85}" y="{mid_y - 25}" width="170" height="50" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2"/>',
      text(plate_cx, mid_y + 9, "Claude", 26, 900, INK)]
b += [f'<rect x="{key_cx - 75}" y="{mid_y - 25}" width="150" height="50" rx="10" fill="#fff" stroke="{ACCENT}" stroke-width="4"/>',
      text(key_cx, mid_y - 4, "Shift", 16, 900, ACCENT), text(key_cx, mid_y + 18, "+ Tab", 16, 900, ACCENT)]

# ---- bypass mode: a separate switch, fully inside the zone ----
zcx = SIDE_X + SIDE_W / 2
b += [text(zcx, 108, "bypass 모드", 38, 900, INK), text(zcx, 146, "이 순환 밖의 별도 옵션", 23, 700, MUTED)]
sw_y = 420
sw_half = 100
b += [f'<rect x="{zcx - sw_half}" y="{sw_y - 54}" width="{sw_half * 2}" height="108" rx="54" fill="{RED}"/>',
      f'<circle cx="{zcx + sw_half - 54}" cy="{sw_y}" r="46" fill="#fff" filter="url(#shs)"/>']
b += [text(zcx, sw_y + 118, "실행 옵션으로 켠다", 27, 800, INK)]
b += [badge(zcx - sw_half - 46, sw_y, "!")]

print(save("s3-mode-dial.svg", b, "3/19 Shift+Tab 모드 순환 (tools/illus/s3_mode_dial.py)"))
