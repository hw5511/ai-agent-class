"""A2-playwright/3 Playwright MCP 란: the same library, now packaged as an MCP tool list with real tool
names (browser_navigate, browser_click, browser_snapshot, browser_evaluate, browser_type) - plugged into
Claude's desk, who picks one and a real browser window reacts. Same cable/toolbox language as
a2_playwright_lib.py.

2026-09-27 review fix: enlarged and moved down into the y ~300-780 band (previously the scene sat high,
from y=96, and left a lot of empty stage below) to match the fixed a2_playwright_lib.py composition."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- (a) the MCP tool list: real Playwright MCP tool names ----
BOX_X, BOX_Y, BOX_W, BOX_H = 100, 290, 520, 490
b += [f'<rect x="{BOX_X}" y="{BOX_Y}" width="{BOX_W}" height="{BOX_H}" rx="24" fill="#eef3fa" stroke="{LINE2}" stroke-width="2" filter="url(#sh)"/>',
      f'<rect x="{BOX_X}" y="{BOX_Y}" width="{BOX_W}" height="70" rx="24" fill="{ACCENT_MID}"/>',
      f'<rect x="{BOX_X}" y="{BOX_Y + 40}" width="{BOX_W}" height="30" fill="{ACCENT_MID}"/>',
      text(BOX_X + BOX_W / 2, BOX_Y + 46, "Playwright MCP 도구 목록", 28, 900, "#fff")]

tools = ["browser_navigate", "browser_click", "browser_snapshot", "browser_evaluate", "browser_type", "· · ·"]
row_h, gap = 54, 12
gx0, gy0 = BOX_X + 24, BOX_Y + 70 + 20
for i, t in enumerate(tools):
    ry = gy0 + i * (row_h + gap)
    b += [f'<rect x="{gx0}" y="{ry}" width="{BOX_W - 48}" height="{row_h}" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>',
          text(gx0 + 24, ry + row_h / 2 + 8, t, 24, 700, ACCENT_DARK if t != "· · ·" else MUTED, anchor="start", family=MONO)]
b += [badge(BOX_X + BOX_W - 6, BOX_Y - 6, 1)]

# ---- (b) the cable, plugged into the mascot's desk ----
PLUG_X, PLUG_Y, PLUG_W, PLUG_H = 720, 500, 140, 84
b += [path(f"M{BOX_X + BOX_W} {BOX_Y + BOX_H / 2}C{BOX_X + BOX_W + 70} {PLUG_Y + PLUG_H / 2} {PLUG_X - 70} {PLUG_Y + PLUG_H / 2} {PLUG_X} {PLUG_Y + PLUG_H / 2}", width=7)]
b += [f'<rect x="{PLUG_X}" y="{PLUG_Y}" width="{PLUG_W}" height="{PLUG_H}" rx="18" fill="{ACCENT}" filter="url(#shs)"/>',
      text(PLUG_X + PLUG_W / 2, PLUG_Y + PLUG_H / 2 + 10, "MCP", 32, 900, "#fff")]
b += [badge(PLUG_X + PLUG_W / 2, PLUG_Y - 34, 2)]

DESK_X, DESK_Y, DESK_W = 960, 560, 420
CABLE_END_X, CABLE_END_Y = DESK_X + 30, DESK_Y
b += [path(f"M{PLUG_X + PLUG_W} {PLUG_Y + PLUG_H / 2}C{PLUG_X + PLUG_W + 60} {PLUG_Y + PLUG_H / 2} {DESK_X - 40} {DESK_Y - 12} {CABLE_END_X} {CABLE_END_Y}", width=7)]
b += [f'<rect x="{CABLE_END_X - 34}" y="{CABLE_END_Y - 46}" width="86" height="46" rx="14" fill="{ACCENT_DARK}" filter="url(#shs)"/>',
      f'<rect x="{CABLE_END_X - 18}" y="{CABLE_END_Y - 8}" width="12" height="18" fill="{ACCENT_DARK}"/>',
      f'<rect x="{CABLE_END_X + 12}" y="{CABLE_END_Y - 8}" width="12" height="18" fill="{ACCENT_DARK}"/>',
      f'<rect x="{CABLE_END_X - 22}" y="{CABLE_END_Y + 2}" width="40" height="10" rx="4" fill="{INK2}"/>']

# ---- (c) Claude at the desk, calling browser_click; the window reacts ----
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=170)]
b += [mascot(DESK_X + 90, DESK_Y - 150, 1.0)]

# Window right edge (1310+430=1740) and its caption both stay well inside the 1792-wide canvas.
WIN_X, WIN_Y, WIN_W, WIN_H = 1310, 300, 430, 300
page_body = (f'<rect x="24" y="18" width="260" height="18" rx="9" fill="{PAPER_LINE}"/>'
             f'<rect x="24" y="50" width="170" height="18" rx="9" fill="{PAPER_LINE}"/>'
             f'<rect x="24" y="96" width="150" height="60" rx="10" fill="{ACCENT}"/>'
             + text(99, 133, "클릭", 24, 800, "#fff"))
b += [window(WIN_X, WIN_Y, WIN_W, WIN_H, "browser", "chrome", page_body)]
b += [icon_cursor(WIN_X + 34, WIN_Y + 150, 44, INK)]
b += [badge(WIN_X + WIN_W - 6, WIN_Y - 6, 3)]
b += [text(WIN_X + WIN_W / 2, WIN_Y + WIN_H + 46, "browser_click 실행 결과", 26, 800, MUTED, family=MONO)]

print(save("a2-playwright-mcp.svg", b, "A2-playwright/3 Playwright MCP 란 (tools/illus/a2_playwright_mcp.py)"))
