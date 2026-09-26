"""5/39 자주 안 쓰는 이유: three stations in reading order - locked bypass, preferred split
terminal, and returning by pressing Enter - each with the mascot at that station. Rework round 1
(2026-09-26): dropped the stray floating VS Code glyph, moved the no-entry sign onto the terminal's
title bar (clean of the dark body), and seated every mascot behind its desk."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(50, 90, 1692, 660, ACCENT_ZONE)]

DESK_Y = 574
MASCOT_S = 0.62
MASCOT_H = 143 * MASCOT_S
MASCOT_Y = DESK_Y + 3 - MASCOT_H


def padlock(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<path d="M-16 -6V-20C-16 -30 -8 -37 0 -37C8 -37 16 -30 16 -20" fill="none" stroke="{INK2}" stroke-width="7" '
            f'stroke-linecap="round"/>'
            f'<rect x="-24" y="-6" width="48" height="40" rx="8" fill="{LINE2}"/>'
            f'<circle cx="0" cy="10" r="6" fill="#fff"/><rect x="-3" y="10" width="6" height="12" rx="2" fill="#fff"/></g>')


def no_symbol(cx, cy, r=34, color=RED):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{color}" stroke-width="8"/>'
            f'<line x1="{cx - r * 0.68:.1f}" y1="{cy - r * 0.68:.1f}" x2="{cx + r * 0.68:.1f}" y2="{cy + r * 0.68:.1f}" '
            f'stroke="{color}" stroke-width="8" stroke-linecap="round"/>')


# ---- station 1: bypass 미적용 ----
b += [window(96, 210, 400, 250, kind="terminal", title="Agent View")]
b += [text(296, 340, "Working …", 26, 600, "#c9ccd1", family=MONO, anchor="middle")]
# padlock + no-entry sign sit cleanly on the terminal's own title bar, clear of the traffic dots
b += [padlock(430, 236, 0.72), no_symbol(430, 236, 26)]
b += [mascot(150, MASCOT_Y, MASCOT_S)]
b += [desk(96, DESK_Y, 400, "bypass 미적용", label_size=26)]
b += [badge(120, 448, 1)]

# ---- station 2: 분할 터미널이 더 편함 (labelled text tag instead of a floating logo glyph) ----
b += [text(736, 200, "VS Code 분할 터미널", 24, 700, MUTED, anchor="middle")]
b += [window(626, 260, 210, 180, kind="terminal"), window(846, 260, 210, 180, kind="terminal")]
for wx in (626, 846):
    b += [text(wx + 24, 300, "$", 20, 700, "#c9ccd1", family=MONO, anchor="start"),
          text(wx + 24, 332, "$", 20, 700, "#c9ccd1", family=MONO, anchor="start")]
b += [check(1030, 268, 26)]
b += [mascot(700, MASCOT_Y, MASCOT_S)]
b += [desk(626, DESK_Y, 430, "분할 터미널이 더 편함", label_size=25)]
b += [badge(650, 448, 2)]

# ---- station 3: Enter 로 복귀 ----
b += [window(1198, 210, 340, 250, kind="app", title="Working 세션")]
b += [text(1230, 300, "★", 20, 700, MUTED, anchor="start"),
      f'<rect x="1256" y="288" width="220" height="18" rx="9" fill="{PAPER_LINE}"/>']
enter_key = (f'<rect x="1596" y="222" width="150" height="86" rx="14" fill="{INK2}"/>'
             f'<path d="M1686 240v18h-38v10" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
             f'<path d="M1660 258l-14 10l14 10" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
             f'<text x="1671" y="298" font-size="18" font-weight="800" fill="#fff" text-anchor="middle">Enter</text>')
b += [enter_key]
b += [path("M1596 265C1555 265 1500 285 1448 316", width=4, arrow=False)]
b += [arrow_head_at(1500, 285, 1448, 316, 20)]
b += [mascot(1250, MASCOT_Y, MASCOT_S)]
b += [desk(1198, DESK_Y, 400, "Enter 로 복귀", label_size=26)]
b += [badge(1222, 448, 3)]

# reading-order connectors
b += [path("M500 340C540 340 580 340 622 340", width=4)]
b += [path("M1060 340C1100 340 1150 340 1194 340", width=4)]

print(save("s5-agentview-friction.svg", b, "5/39 자주 안 쓰는 이유 (tools/illus/s5_agentview_friction.py)"))
