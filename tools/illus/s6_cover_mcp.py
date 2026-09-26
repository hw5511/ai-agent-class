"""6/1 part cover "MCP 란?": Claude at its desk plugs into six real services (Notion, Google Calendar,
Google Drive, Gmail, Blender, GitHub) through an MCP cable hub. Canvas is a custom 1100 x 840 stage (not
the kit default 1792 x 840): uses illuskit's svg_sized/save_sized/panel_sized helpers appended for this
purpose. Owner 2026-09-26: real brand_icon() marks (not drawn stand-ins); GitHub added as a sixth socket."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *  # noqa: F401,F403

W2, H2 = 1100, 840


def socket(cx: float, cy: float, name: str) -> str:
    """A small service 'socket' card: white rounded card with the real brand icon, two plug prongs
    pointing down toward the cable hub. Card is 132 x 132, centred on (cx, cy)."""
    card = 132
    x, y = cx - card / 2, cy - card / 2
    logo_size = 76
    lx, ly = cx - logo_size / 2, cy - logo_size / 2 - 4
    out = [f'<g filter="url(#sh)">'
           f'<rect x="{x}" y="{y}" width="{card}" height="{card}" rx="22" fill="#ffffff" stroke="{LINE2}" stroke-width="2.5"/>'
           f'</g>',
           f'<rect x="{cx - 20}" y="{y + card - 6}" width="10" height="20" rx="4" fill="{INK2}"/>',
           f'<rect x="{cx + 10}" y="{y + card - 6}" width="10" height="20" rx="4" fill="{INK2}"/>',
           brand_icon(name, lx, ly, logo_size)]
    return "\n".join(out)


HUB = (550, 380)

b = [panel_sized(W2, H2)]

# soft accent zone behind the arc of services, so "the outside services" read as one place
b.append(cloud(550, 268, 1.28))

# six services on an arc above the hub, each a socket card with its real brand icon
services = [
    (100, 385, "notion"),
    (280, 251, "googlecalendar"),
    (460, 183, "googledrive"),
    (640, 183, "gmail"),
    (820, 251, "blender"),
    (1000, 385, "github"),
]

# dotted cables from the hub to each socket's plug prongs, drawn first so cards sit on top
for sx, sy, _ in services:
    bottom_y = sy + 132 / 2 + 14
    midx = (HUB[0] + sx) / 2
    midy = (HUB[1] + bottom_y) / 2 - 60
    b.append(path(f"M{HUB[0]} {HUB[1]}Q{midx} {midy} {sx} {bottom_y}"))

for sx, sy, name in services:
    b.append(socket(sx, sy, name))

# the cable hub itself: one plug where all lines meet, labelled MCP (the only label in this scene)
b.append(f'<circle cx="{HUB[0]}" cy="{HUB[1]}" r="46" fill="{ACCENT}" filter="url(#sh)"/>')
b.append(f'<circle cx="{HUB[0]}" cy="{HUB[1]}" r="46" fill="none" stroke="#ffffff" stroke-width="4"/>')
b.append(text(HUB[0], HUB[1] + 12, "MCP", 34, 900, "#ffffff"))

# Claude mascot at its desk, middle-bottom, plugged into the hub
desk_x, desk_y, desk_w = 300, 650, 500
b.append(desk(desk_x, desk_y, desk_w, body_h=120))
mascot_s = 1.3
mascot_w = 240 * mascot_s
mascot_top = desk_y - 143 * mascot_s + 8

# the cable from Claude's head up to the hub
b.append(path(f"M{HUB[0]} {mascot_top} Q{HUB[0]} {(HUB[1] + mascot_top) / 2} {HUB[0]} {HUB[1] + 46}", arrow=False))

b.append(mascot(HUB[0] - mascot_w / 2, mascot_top, mascot_s))

print(save_sized("s6-cover-mcp.svg", b, W2, H2,
                  '6/1 part cover "MCP 란?" (tools/illus/s6_cover_mcp.py)'))
