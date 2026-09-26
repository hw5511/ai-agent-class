"""5/3 기본 내장 서브에이전트: main Claude desk (left, warm zone) plus four built-in sub-agent
desks (right, blue zone) each with its own tool icon - general-purpose (toolbox), Explore
(magnifier), claude-code-guide (book), Plan (blueprint). Rework round 1 (2026-09-26): full-height
zones, mascots seated behind their desks, one fanning arrow set from main Claude to all four desks,
badges clear of every desk."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(50, 60, 420, 720, WARM_ZONE), zone(506, 60, 1236, 720, ACCENT_ZONE)]

# main desk: 메인 클로드 (bigger, left warm zone, full height of the zone)
MAIN_DESK_Y = 560
MAIN_DESK_CX = 100 + 320 / 2
b += [mascot(140, MAIN_DESK_Y - 143 + 3, 1.0)]
b += [desk(100, MAIN_DESK_Y, 320, "메인 클로드", body_h=190)]

# a small "작업 지시" hand-off doc above main Claude, held up in the zone's empty upper half;
# the fan-out arrows leave from its bottom edge
DOC_W = 90
DOC_X = MAIN_DESK_CX - DOC_W / 2
DOC_Y = 110
b += [doc(DOC_X, DOC_Y, DOC_W)]
b += [text(MAIN_DESK_CX, DOC_Y + DOC_W * 1.25 + 34, "작업 지시", 24, 800, INK)]

# fan-out arrows from the hand-off doc to the top of each of the four desks
FAN_START = (MAIN_DESK_CX, DOC_Y + DOC_W * 1.25)


def toolbox(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<path d="M-24 -4C-24 -18 -13 -28 0 -28C13 -28 24 -18 24 -4" fill="none" stroke="{INK2}" stroke-width="6" stroke-linecap="round"/>'
            f'<rect x="-30" y="-6" width="60" height="38" rx="7" fill="{ACCENT_DARK}"/>'
            f'<rect x="-30" y="7" width="60" height="10" fill="{ACCENT}"/>'
            f'<rect x="-7" y="1" width="14" height="12" rx="3" fill="#fff"/></g>')


def magnifier(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<circle cx="-5" cy="-5" r="18" fill="none" stroke="{ACCENT_DARK}" stroke-width="7"/>'
            f'<line x1="9" y1="9" x2="25" y2="25" stroke="{ACCENT_DARK}" stroke-width="7" stroke-linecap="round"/></g>')


def book(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<path d="M-26 -16C-16 -21 -3 -21 0 -16V21C-3 16 -16 16 -26 21Z" fill="{ACCENT_DARK}"/>'
            f'<path d="M26 -16C16 -21 3 -21 0 -16V21C3 16 16 16 26 21Z" fill="{ACCENT}"/>'
            f'<line x1="0" y1="-16" x2="0" y2="21" stroke="#fff" stroke-width="2"/></g>')


def blueprint(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<rect x="-24" y="-20" width="48" height="40" rx="6" fill="{ACCENT_DARK}"/>'
            f'<circle cx="0" cy="0" r="13" fill="none" stroke="{ACCENT_TINT}" stroke-width="3"/>'
            f'<line x1="-16" y1="-11" x2="-6" y2="-11" stroke="{ACCENT_TINT}" stroke-width="3"/>'
            f'<line x1="6" y1="11" x2="16" y2="11" stroke="{ACCENT_TINT}" stroke-width="3"/></g>')


icons = {"toolbox": toolbox, "magnifier": magnifier, "book": book, "blueprint": blueprint}

# (desk x, desk width, name lines, tag, icon, badge)
agents = [
    (540, 260, ["general-", "purpose"], "범용 · 조사 · 코딩", "toolbox", 1),
    (824, 240, ["Explore"], "탐색 전용 · 읽기만", "magnifier", 2),
    (1088, 260, ["claude-code-", "guide"], "Claude Code 사용법", "book", None),
    (1372, 220, ["Plan"], "계획 전용 · 선택 내장", "blueprint", None),
]

DESK_Y = 560
BODY_H = 168
MASCOT_S = 0.62
MASCOT_H = 143 * MASCOT_S

# one fanning arrow per desk, drawn first so desks/mascots sit on top of the tails
for dx, dw, *_ in agents:
    cx = dx + dw / 2
    tx, ty = cx, DESK_Y - 140
    d = f"M{FAN_START[0]} {FAN_START[1]}C{(FAN_START[0]+tx)/2} {FAN_START[1]-10} {(FAN_START[0]+tx)/2+60} {ty-40} {tx:.0f} {ty}"
    b += [path(d)]

for dx, dw, name_lines, tag, icon, badge_n in agents:
    cx = dx + dw / 2
    b += [mascot(cx - 240 * MASCOT_S / 2, DESK_Y - MASCOT_H + 3, MASCOT_S, opacity=0.96)]
    b += [desk(dx, DESK_Y, dw, None, body_h=BODY_H)]
    b += [icons[icon](dx + dw - 44, DESK_Y + 56)]
    ny = DESK_Y + 108 if len(name_lines) == 1 else DESK_Y + 100
    for line in name_lines:
        b += [text(cx, ny, line, 27, 900, INK, family=MONO)]
        ny += 32
    b += [text(cx, DESK_Y + BODY_H + 24 + 44, tag, 25, 600, MUTED)]
    if badge_n:
        b += [badge(dx + 18, DESK_Y - 40, badge_n)]

# shared "!" badge for claude-code-guide + Plan, parked in the gap between the two desks,
# well clear of both desk tops (no connector line - it reads fine as a free-floating note)
guide_dx, guide_dw = agents[2][0], agents[2][1]
plan_dx = agents[3][0]
mid_x = (guide_dx + guide_dw + plan_dx) / 2
b += [badge(mid_x, DESK_Y - 56, "!")]

print(save("s5-builtin-agents.svg", b, "5/3 기본 내장 서브에이전트 (tools/illus/s5_builtin_agents.py)"))
