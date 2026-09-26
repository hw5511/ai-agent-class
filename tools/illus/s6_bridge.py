"""6/2 다리 역할 · Claude 와 외부 서비스: Claude's bank, an arched MCP bridge over the gap, three service
buildings (Notion / Google Calendar / Google Drive) on the far bank, a mascot walking the bridge with a paper."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
b += [zone(40, 380, 520, 400, WARM_ZONE), zone(1140, 380, 610, 400, ACCENT_ZONE)]

# left bank: Claude at its desk
b += [mascot(150, 467, 1.0), desk(90, 610, 420, "Claude", body_h=130)]
b += [badge(500, 592, 1)]

# bridge: an arched deck + thin railing over the gap, with piers at both banks
BRIDGE_D = "M560 730 Q855 130 1150 730"
RAIL_D = "M560 694 Q855 92 1150 694"
b += [f'<rect x="548" y="700" width="24" height="80" rx="6" fill="{DESK_TOP}"/>',
      f'<rect x="1140" y="700" width="24" height="80" rx="6" fill="{DESK_TOP}"/>',
      f'<path d="{BRIDGE_D}" fill="none" stroke="{DESK_TOP}" stroke-width="34" stroke-linecap="round" filter="url(#shs)"/>',
      f'<path d="{RAIL_D}" fill="none" stroke="{LINE2}" stroke-width="5" stroke-linecap="round"/>']
for t in (0.15, 0.3, 0.45, 0.55, 0.7, 0.85):
    x = (1 - t) ** 2 * 560 + 2 * (1 - t) * t * 855 + t ** 2 * 1150
    y_deck = (1 - t) ** 2 * 730 + 2 * (1 - t) * t * 130 + t ** 2 * 730
    y_rail = (1 - t) ** 2 * 694 + 2 * (1 - t) * t * 92 + t ** 2 * 694
    b.append(f'<line x1="{x:.1f}" y1="{y_rail:.1f}" x2="{x:.1f}" y2="{y_deck:.1f}" stroke="{LINE2}" stroke-width="4"/>')
b += [text(855, 220, "MCP", 50, 900, ACCENT), badge(855, 150, 2)]

# a mascot walking the bridge, carrying a paper
mt = 0.5
mx = (1 - mt) ** 2 * 560 + 2 * (1 - mt) * mt * 855 + mt ** 2 * 1150
my = (1 - mt) ** 2 * 730 + 2 * (1 - mt) * mt * 130 + mt ** 2 * 730
ms = 0.6
b += [mascot(mx - 240 * ms / 2, my - 143 * ms, ms), doc(mx + 55, my - 143 * ms - 10, 36, rot=14)]

# right bank: three service buildings with real logos
buildings = [("notion.svg", "노션"), ("googlecalendar.svg", "구글 캘린더"), ("googledrive.svg", "구글 드라이브")]
xs = [1160, 1365, 1570]
BW, WALL_H, ROOF_H, BOTTOM = 160, 260, 46, 760
for x, (logo, label) in zip(xs, buildings):
    cx = x + BW / 2
    top_wall = BOTTOM - WALL_H
    roof_peak = top_wall - ROOF_H
    b += [f'<polygon points="{x - 6},{top_wall} {x + BW + 6},{top_wall} {cx},{roof_peak}" fill="{DESK_TOP}"/>',
          f'<rect x="{x}" y="{top_wall}" width="{BW}" height="{WALL_H}" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>',
          f'<rect x="{cx - 23}" y="{BOTTOM - 70}" width="46" height="70" rx="4" fill="{ACCENT_TINT}" stroke="{LINE2}" stroke-width="2"/>',
          logo_svg(logo, cx - 32, top_wall + 40, 64),
          text(cx, roof_peak - 16, label, 28, 800, INK)]
b += [badge(1445, 375, 3)]

print(save("s6-bridge.svg", b, "6/2 다리 역할 (tools/illus/s6_bridge.py)"))
