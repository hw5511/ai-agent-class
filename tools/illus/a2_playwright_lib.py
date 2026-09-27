"""A2-playwright/1 Playwright 라이브러리란: a toolbox of ready-made browser actions (열기, 클릭, 입력,
스크린샷) wired by a cable into the mascot's desk; the mascot drives a real browser window by clicking a
real button with the cursor, and a small camera icon below the window shows it taking a screenshot.
Same language as s6_command_toolbox.

2026-09-27 review fix: the old layout put the camera+arrow past the 1792-wide canvas (clipped at the
right edge) and put the cursor on top of the "입력창" label. Camera now sits directly under the browser
window (inside the canvas with real margin) and the cursor points at the "클릭" button instead, well
above the input row. The whole scene is also shifted down into the y ~300-780 band so it fills the
stage instead of starting at y=96."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- (a) the toolbox: ready-made browser-action cards ----
BOX_X, BOX_Y, BOX_W, BOX_H = 110, 330, 460, 390
b += [f'<rect x="{BOX_X}" y="{BOX_Y}" width="{BOX_W}" height="{BOX_H}" rx="24" fill="#eef3fa" stroke="{LINE2}" stroke-width="2" filter="url(#sh)"/>',
      f'<rect x="{BOX_X}" y="{BOX_Y}" width="{BOX_W}" height="70" rx="24" fill="{ACCENT_MID}"/>',
      f'<rect x="{BOX_X}" y="{BOX_Y + 40}" width="{BOX_W}" height="30" fill="{ACCENT_MID}"/>',
      text(BOX_X + BOX_W / 2, BOX_Y + 46, "Playwright 라이브러리", 30, 900, "#fff")]

cards = ["열기", "클릭", "입력", "스크린샷"]
CW, CH, GAP = 198, 110, 22
gx0, gy0 = BOX_X + 22, BOX_Y + 70 + 24
for i, label in enumerate(cards):
    cx, cy = gx0 + (i % 2) * (CW + GAP), gy0 + (i // 2) * (CH + GAP)
    b += [f'<rect x="{cx}" y="{cy}" width="{CW}" height="{CH}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>',
          text(cx + CW / 2, cy + CH / 2 + 10, label, 30, 800, ACCENT_DARK, family=MONO)]
b += [badge(BOX_X + BOX_W - 6, BOX_Y - 6, 1)]

# ---- (b) the cable, plugged into the mascot's desk ----
PLUG_X, PLUG_Y, PLUG_W, PLUG_H = 660, 495, 140, 84
b += [path(f"M{BOX_X + BOX_W} {BOX_Y + BOX_H / 2}C{BOX_X + BOX_W + 70} {PLUG_Y + PLUG_H / 2} {PLUG_X - 70} {PLUG_Y + PLUG_H / 2} {PLUG_X} {PLUG_Y + PLUG_H / 2}", width=7)]
b += [f'<rect x="{PLUG_X}" y="{PLUG_Y}" width="{PLUG_W}" height="{PLUG_H}" rx="18" fill="{ACCENT}" filter="url(#shs)"/>',
      text(PLUG_X + PLUG_W / 2, PLUG_Y + PLUG_H / 2 + 10, "코드", 30, 900, "#fff")]
b += [badge(PLUG_X + PLUG_W / 2, PLUG_Y - 34, 2)]

DESK_X, DESK_Y, DESK_W = 900, 560, 440
CABLE_END_X, CABLE_END_Y = DESK_X + 30, DESK_Y
b += [path(f"M{PLUG_X + PLUG_W} {PLUG_Y + PLUG_H / 2}C{PLUG_X + PLUG_W + 70} {PLUG_Y + PLUG_H / 2} {DESK_X - 40} {DESK_Y - 12} {CABLE_END_X} {CABLE_END_Y}", width=7)]
b += [f'<rect x="{CABLE_END_X - 34}" y="{CABLE_END_Y - 46}" width="86" height="46" rx="14" fill="{ACCENT_DARK}" filter="url(#shs)"/>',
      f'<rect x="{CABLE_END_X - 18}" y="{CABLE_END_Y - 8}" width="12" height="18" fill="{ACCENT_DARK}"/>',
      f'<rect x="{CABLE_END_X + 12}" y="{CABLE_END_Y - 8}" width="12" height="18" fill="{ACCENT_DARK}"/>',
      f'<rect x="{CABLE_END_X - 22}" y="{CABLE_END_Y + 2}" width="40" height="10" rx="4" fill="{INK2}"/>']

# ---- (c) Claude at the desk driving a real browser window with the cursor ----
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=170)]
b += [mascot(DESK_X + 100, DESK_Y - 150, 1.0)]

# Window is sized/positioned so its right edge, and the camera under it, both sit well inside the
# 1792-wide canvas (checked: window right edge 1710, camera right edge ~1560 - both < 1792).
WIN_X, WIN_Y, WIN_W, WIN_H = 1280, 290, 430, 340
page_body = (f'<rect x="24" y="18" width="270" height="18" rx="9" fill="{PAPER_LINE}"/>'
             f'<rect x="24" y="50" width="180" height="18" rx="9" fill="{PAPER_LINE}"/>'
             f'<rect x="24" y="96" width="150" height="60" rx="10" fill="{ACCENT}"/>'
             + text(99, 133, "클릭", 24, 800, "#fff")
             + f'<rect x="24" y="192" width="300" height="46" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>'
             + text(60, 222, "입력창", 22, 700, MUTED, anchor="start", family=MONO))
b += [window(WIN_X, WIN_Y, WIN_W, WIN_H, "browser", "chrome", page_body)]
# cursor tip lands on the "클릭" button (abs y ~452-512), well clear of the input row (abs y ~536-590)
b += [icon_cursor(WIN_X + 34, WIN_Y + 150, 46, INK)]
b += [badge(WIN_X + WIN_W - 6, WIN_Y - 6, 3)]

# camera badge, centred directly under the window: taking a screenshot of the same window
CAM_W, CAM_H = 90, 66
cam_cx = WIN_X + WIN_W / 2
cam_x, cam_y = cam_cx - CAM_W / 2, WIN_Y + WIN_H + 44
b += [path(f"M{cam_cx} {WIN_Y + WIN_H}C{cam_cx} {WIN_Y + WIN_H + 18} {cam_cx} {cam_y - 22} {cam_cx} {cam_y - 4}", color=GREEN, width=6)]
b += [f'<rect x="{cam_x}" y="{cam_y}" width="{CAM_W}" height="{CAM_H}" rx="14" fill="{INK2}" filter="url(#shs)"/>',
      f'<rect x="{cam_x + 30}" y="{cam_y - 16}" width="30" height="18" rx="6" fill="{INK2}"/>',
      f'<circle cx="{cam_cx}" cy="{cam_y + 34}" r="21" fill="{SCREEN}" stroke="{ACCENT_MID}" stroke-width="5"/>']
b += [text(cam_cx, cam_y + CAM_H + 34, "스크린샷", 26, 800, MUTED)]

print(save("a2-playwright-lib.svg", b, "A2-playwright/1 Playwright 라이브러리란 (tools/illus/a2_playwright_lib.py)"))
