"""8/6 되돌리기 · 수정 이력: three commits on a rail, A 방식 -> A 실패 -> B 방식, with a clear rewind arc back to the first."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

RAIL_Y = 640
b.append(f'<rect x="140" y="{RAIL_Y - 6}" width="1500" height="12" rx="6" fill="{LINE}"/>')
# faint ground ticks below the rail, for a grounded floor without an empty lower half
for tx in range(220, 1620, 90):
    b.append(f'<rect x="{tx}" y="{RAIL_Y + 20}" width="4" height="22" rx="2" fill="{LINE}" opacity="0.6"/>')

STOPS = [
    (420, "A 방식", None),
    (900, "A 실패", "cross"),
    (1310, "B 방식", "check"),
]

for cx, memo, mark in STOPS:
    b += [f'<ellipse cx="{cx}" cy="{RAIL_Y + 8}" rx="30" ry="8" fill="{INK}" opacity="0.08"/>',
          f'<circle cx="{cx}" cy="{RAIL_Y}" r="14" fill="{ACCENT_DARK}" stroke="#fff" stroke-width="4"/>',
          doc(cx - 62, RAIL_Y - 320, 124, 0)]
    memo_y = RAIL_Y - 170
    b += [f'<rect x="{cx - 98}" y="{memo_y}" width="196" height="68" rx="12" fill="#fff9e8" stroke="#e8dcae" stroke-width="2" filter="url(#shs)" transform="rotate(-2 {cx} {memo_y + 34})"/>',
          text(cx, memo_y + 44, memo, 30, 800, INK2, family=MONO)]
    b.append(f'<path d="M{cx} {RAIL_Y - 6}V{RAIL_Y - 98}" stroke="{LINE2}" stroke-width="3"/>')
    if mark == "cross":
        b.append(cross(cx + 100, RAIL_Y - 298, 26))
    elif mark == "check":
        b.append(check(cx + 100, RAIL_Y - 298, 26))

# badge 1 on the memos (커밋마다 메모) - on the first memo card
b.append(badge(420 + 98 + 16, RAIL_Y - 170 - 2, 1))

# badge 2 on the fail -> B step (실패 후 새 방식), a dotted path with an explicit arrowhead
pf = f"M{900 + 42} {RAIL_Y} C {(900 + 1310) / 2} {RAIL_Y + 96} {(900 + 1310) / 2} {RAIL_Y + 96} {1310 - 42} {RAIL_Y}"
b += [path(pf, color=ACCENT, arrow=False), arrow_head_at((900 + 1310) / 2, RAIL_Y + 96, 1310 - 44, RAIL_Y - 2, 18, ACCENT)]
b.append(badge((900 + 1310) / 2, RAIL_Y + 118, 2))

# mascot at the RIGHT end of the rail, behind a small desk, writing the memo for the latest commit
DESK_X, DESK_W = 1500, 210
MS, MH = 0.85, 143 * 0.85
b += [f'<ellipse cx="{DESK_X + DESK_W / 2}" cy="{RAIL_Y + 8}" rx="130" ry="14" fill="{INK}" opacity="0.08"/>',
      mascot(DESK_X + 6, RAIL_Y - 96 - MH + 8, MS),
      doc(DESK_X + DESK_W - 78, RAIL_Y - 96 - 40, 54, -6),
      desk(DESK_X, RAIL_Y - 96, DESK_W, body_h=96)]

# big curved rewind arc: latest version back to the first, thick and accent-coloured, with a big
# explicit arrowhead pointing at A 방식 - drawn last so it reads clearly above everything else.
ARC_TOP = RAIL_Y - 480
arc = f"M1310 {RAIL_Y - 340} C {(420 + 1310) / 2} {ARC_TOP} {(420 + 1310) / 2} {ARC_TOP} 420 {RAIL_Y - 340}"
b += [path(arc, color=ACCENT, width=10, arrow=False),
      arrow_head_at((420 + 1310) / 2, ARC_TOP, 420, RAIL_Y - 340, 30, ACCENT)]
# a faint ghost copy of the first version, sliding back along the arc (past the fail stop, before B)
gx, gy = 1155, ARC_TOP + 32
b.append(f'<g opacity="0.32">{doc(gx - 54, gy, 96, 5)}</g>')
b.append(text((420 + 1310) / 2, ARC_TOP - 38, "되돌리기", 46, 900))
b.append(badge((420 + 1310) / 2 + 250, ARC_TOP + 26, 3))

print(save("s8-gh-history.svg", b, "8/6 되돌리기 · 수정 이력 (tools/illus/s8_gh_history.py)"))
