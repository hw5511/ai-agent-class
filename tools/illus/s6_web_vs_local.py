"""6/73 웹 커넥터 vs 로컬 MCP: left - a claude.ai browser window (no invented copy) reaches Notion and
Google Calendar through a tinted cloud; right - the mascot at a desk fully inside the panel, a monitor
running Blender (real logo + a wireframe cube) wired straight to the mascot's side."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def cube_wireframe(cx, cy, r, color=ACCENT_MID) -> str:
    """A simple isometric wireframe cube, centred on (cx, cy), for the Blender viewport."""
    dx, dy = r * 0.62, r * 0.36
    top = [(cx, cy - r), (cx + dx, cy - r + dy), (cx, cy - r + 2 * dy), (cx - dx, cy - r + dy)]
    bot = [(x, y + 2 * r * 0.72) for x, y in top]

    def ring(pts):
        d = " ".join(f"{'M' if i == 0 else 'L'}{x:.1f} {y:.1f}" for i, (x, y) in enumerate(pts)) + " Z"
        return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="3.5" stroke-linejoin="round"/>'

    out = [ring(top), ring(bot)]
    for (x1, y1), (x2, y2) in zip(top, bot):
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="3.5"/>')
    return "\n".join(out)


b = [panel()]

# ---- left: claude.ai in the browser, reaching web services through a tinted cloud ----
b += [zone(58, 66, 800, 668, ACCENT_ZONE)]
b += [text(458, 128, "웹 커넥터", 36, 900, ACCENT_DARK, anchor="middle")]

BW_X, BW_Y, BW_W, BW_H = 128, 160, 660, 150
browser_body = (f'<rect x="0" y="0" width="{BW_W - 96}" height="16" rx="8" fill="{PAPER_LINE}"/>'
                + f'<rect x="0" y="30" width="{(BW_W - 96) * 0.68}" height="16" rx="8" fill="{PAPER_LINE}"/>'
                + f'<rect x="0" y="60" width="{(BW_W - 96) * 0.42}" height="16" rx="8" fill="{PAPER_LINE}"/>')
b += [window(BW_X, BW_Y, BW_W, BW_H, "browser", "claude.ai", browser_body)]

CLOUD_CX, CLOUD_CY = 458, 470
b += [cloud(CLOUD_CX, CLOUD_CY, 0.74, fill=ACCENT_TINT)]
b += [badge(CLOUD_CX + 210, CLOUD_CY - 110, 1)]
b += [path(f"M458 {BW_Y + BW_H}C458 420 458 400 458 384", dotted=True)]
b += [path("M388 552C300 592 268 606 246 632", dotted=True), path("M528 552C616 592 648 606 670 632", dotted=True)]
b += [logo_svg("notion.svg", 160, 632, 62), text(191, 720, "Notion", 26, 800, INK, anchor="middle")]
b += [logo_svg("googlecalendar.svg", 660, 632, 62), text(691, 720, "구글 캘린더", 26, 800, INK, anchor="middle")]
b += [text(458, 480, "전부 클라우드에서", 26, 800, ACCENT_DARK, anchor="middle")]

# ---- right: the mascot at a desk, a PC monitor running Blender, wired to the mascot's side ----
b += [zone(920, 66, 812, 668, WARM_ZONE)]
b += [text(1326, 128, "로컬 MCP", 36, 900, MASCOT, anchor="middle")]

PC_X, PC_Y, PC_W, PC_H = 980, 168, 560, 300
blender_body = (logo_svg("blender.svg", 0, 0, 46) + text(64, 34, "Blender", 30, 900, INK, anchor="start"))
viewport_w, viewport_h = PC_W - 96, PC_H - 76 - 76
blender_body += f'<rect x="0" y="58" width="{viewport_w}" height="{viewport_h}" rx="10" fill="#1e1f22"/>'
blender_body += cube_wireframe(viewport_w / 2, 58 + viewport_h / 2 - 10, 46)
b += [window(PC_X, PC_Y, PC_W, PC_H, "app", "", blender_body)]
b += [badge(PC_X + PC_W - 24, PC_Y - 24, 2)]

DESK_X, DESK_Y, DESK_W = 970, 640, 660
b += [desk(DESK_X, DESK_Y, DESK_W, "내 컴퓨터", body_h=94, label_size=28)]
b += [mascot(DESK_X + DESK_W - 170, DESK_Y - 148, 1.05)]

cable_x1, cable_y1 = PC_X + 80, PC_Y + PC_H
cable_x2, cable_y2 = DESK_X + DESK_W - 140, DESK_Y
b += [path(f"M{cable_x1} {cable_y1}C{cable_x1 - 30} {DESK_Y - 40} {cable_x2 - 40} {DESK_Y - 30} {cable_x2} {cable_y2}",
           dotted=False, color=INK)]
b += [text(PC_X + PC_W / 2, PC_Y + PC_H + 40, "내 PC 안에서 연결", 24, 800, MUTED, anchor="middle")]

print(save("s6-web-vs-local.svg", b, "6/73 웹 커넥터 vs 로컬 MCP (tools/illus/s6_web_vs_local.py)"))
