"""6/1 part cover "MCP 란?": Claude at its desk plugs into five real services (Notion, Google Calendar,
Google Drive, Gmail, Blender) through an MCP cable hub. Canvas is a custom 1100 x 840 stage (not the kit
default 1792 x 840): uses illuskit's svg_sized/save_sized/panel_sized helpers appended for this purpose."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *  # noqa: F401,F403

W2, H2 = 1100, 840
LOGO_DIR = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "..", "web", "public", "logos"))


def inline_logo(filename: str, x: float, y: float, size: float) -> str:
    """Inline a logos/<filename> icon (any square viewBox) centred-fit into a `size` x `size` box at (x, y)."""
    with open(os.path.join(LOGO_DIR, filename), "r", encoding="utf-8") as f:
        content = f.read()
    vb_start = content.index('viewBox="') + len('viewBox="')
    vb_end = content.index('"', vb_start)
    vb = [float(v) for v in content[vb_start:vb_end].split()]
    vb_w, vb_h = vb[2], vb[3]
    start = content.index(">", content.index("<svg")) + 1
    end = content.rindex("</svg>")
    inner = content[start:end]
    s = size / max(vb_w, vb_h)
    ox = (size - vb_w * s) / 2
    oy = (size - vb_h * s) / 2
    return f'<g transform="translate({x + ox} {y + oy}) scale({s})">{inner}</g>'


def socket(cx: float, cy: float, filename: str) -> str:
    """A small service 'socket' card: white rounded card with the real logo, two plug prongs pointing
    down toward the cable hub. Card is 132 x 132, centred on (cx, cy)."""
    card = 132
    x, y = cx - card / 2, cy - card / 2
    logo_size = 82
    lx, ly = cx - logo_size / 2, cy - logo_size / 2 - 4
    out = [f'<g filter="url(#sh)">'
           f'<rect x="{x}" y="{y}" width="{card}" height="{card}" rx="22" fill="#ffffff" stroke="{LINE2}" stroke-width="2.5"/>'
           f'</g>',
           f'<rect x="{cx - 20}" y="{y + card - 6}" width="10" height="20" rx="4" fill="{INK2}"/>',
           f'<rect x="{cx + 10}" y="{y + card - 6}" width="10" height="20" rx="4" fill="{INK2}"/>',
           inline_logo(filename, lx, ly, logo_size)]
    return "\n".join(out)


HUB = (550, 380)

b = [panel_sized(W2, H2)]

# soft accent zone behind the arc of services, so "the outside services" read as one place
b.append(cloud(550, 268, 1.28))

# five services on an arc above the hub, each a socket card with its real logo
services = [
    (150, 372, "notion.svg"),
    (350, 240, "googlecalendar.svg"),
    (550, 178, "googledrive.svg"),
    (750, 240, "gmail.svg"),
    (950, 372, "blender.svg"),
]

# dotted cables from the hub to each socket's plug prongs, drawn first so cards sit on top
for sx, sy, _ in services:
    bottom_y = sy + 132 / 2 + 14
    midx = (HUB[0] + sx) / 2
    midy = (HUB[1] + bottom_y) / 2 - 60
    b.append(path(f"M{HUB[0]} {HUB[1]}Q{midx} {midy} {sx} {bottom_y}"))

for sx, sy, fname in services:
    b.append(socket(sx, sy, fname))

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
