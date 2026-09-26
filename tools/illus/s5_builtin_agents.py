"""5/3 기본 내장 서브에이전트: main Claude desk (left zone) plus four built-in sub-agent desks
(right zone) each with its own tool icon - general-purpose (toolbox), Explore (magnifier),
claude-code-guide (book), Plan (blueprint). Rework round 1 (2026-09-26): full-height zones,
mascots seated behind their desks, one fanning arrow set from main Claude to all four desks,
badges clear of every desk. Rework round 2 (tone-down): the fan is a short straight trunk that
splits into four straight branch lines, and mascots are smaller. Rework round 3 (2026-09-26,
reviewer defects): the four thick blue arrow bands are gone, replaced by one thin grey (#9aa0a6)
orthogonal tree - a single trunk down from the hand-off doc, a horizontal bus above the four
desks, short vertical drops to each desk, no arrowheads; both zone panels are white with a thin
neutral border instead of tinted fills; the four tool icons are recoloured to one muted dark-grey
(#43474b) instead of the deck-blue palette."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

NEUTRAL_BORDER = "#e5e5e5"
CONNECTOR_GREY = "#9aa0a6"
DARK_GREY = "#43474b"

b = [panel(),
     f'<rect x="50" y="60" width="420" height="720" rx="26" fill="#ffffff" stroke="{NEUTRAL_BORDER}" stroke-width="2"/>',
     f'<rect x="506" y="60" width="1236" height="720" rx="26" fill="#ffffff" stroke="{NEUTRAL_BORDER}" stroke-width="2"/>']

# main desk: 메인 클로드 (bigger, left warm zone, full height of the zone)
MAIN_DESK_Y = 560
MAIN_DESK_CX = 100 + 320 / 2
MAIN_MASCOT_S = 0.8
b += [mascot(MAIN_DESK_CX - 240 * MAIN_MASCOT_S / 2, MAIN_DESK_Y - 143 * MAIN_MASCOT_S + 3, MAIN_MASCOT_S)]
b += [desk(100, MAIN_DESK_Y, 320, "메인 클로드", body_h=190)]

# a small "작업 지시" hand-off doc above main Claude, held up in the zone's empty upper half;
# the fan-out arrows leave from its bottom edge
DOC_W = 90
DOC_X = MAIN_DESK_CX - DOC_W / 2
DOC_Y = 110
LABEL_Y = DOC_Y + DOC_W * 1.25 + 34
b += [doc(DOC_X, DOC_Y, DOC_W)]
b += [text(MAIN_DESK_CX, LABEL_Y, "작업 지시", 24, 800, INK)]

# fan-out arrows from the hand-off doc to the top of each of the four desks, starting clear below
# the "작업 지시" label so a branch never runs through the text
FAN_START = (MAIN_DESK_CX, LABEL_Y + 26)


def toolbox(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<path d="M-24 -4C-24 -18 -13 -28 0 -28C13 -28 24 -18 24 -4" fill="none" stroke="{DARK_GREY}" stroke-width="6" stroke-linecap="round"/>'
            f'<rect x="-30" y="-6" width="60" height="38" rx="7" fill="{DARK_GREY}"/>'
            f'<rect x="-30" y="7" width="60" height="10" fill="{DARK_GREY}" opacity="0.7"/>'
            f'<rect x="-7" y="1" width="14" height="12" rx="3" fill="#fff"/></g>')


def magnifier(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<circle cx="-5" cy="-5" r="18" fill="none" stroke="{DARK_GREY}" stroke-width="7"/>'
            f'<line x1="9" y1="9" x2="25" y2="25" stroke="{DARK_GREY}" stroke-width="7" stroke-linecap="round"/></g>')


def book(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<path d="M-26 -16C-16 -21 -3 -21 0 -16V21C-3 16 -16 16 -26 21Z" fill="{DARK_GREY}"/>'
            f'<path d="M26 -16C16 -21 3 -21 0 -16V21C3 16 16 16 26 21Z" fill="{DARK_GREY}" opacity="0.7"/>'
            f'<line x1="0" y1="-16" x2="0" y2="21" stroke="#fff" stroke-width="2"/></g>')


def blueprint(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<rect x="-24" y="-20" width="48" height="40" rx="6" fill="{DARK_GREY}"/>'
            f'<circle cx="0" cy="0" r="13" fill="none" stroke="#fff" stroke-width="3"/>'
            f'<line x1="-16" y1="-11" x2="-6" y2="-11" stroke="#fff" stroke-width="3"/>'
            f'<line x1="6" y1="11" x2="16" y2="11" stroke="#fff" stroke-width="3"/></g>')


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
MASCOT_S = 0.46
MASCOT_H = 143 * MASCOT_S

# one thin, neutral orthogonal tree (reviewer defect 1, 2026-09-26): a single trunk drops from the
# hand-off doc, clear below its own label, to a horizontal bus line above the four desks; short
# vertical drops run from the bus down to each desk. Plain thin strokes, no halo, no arrowheads -
# not the deck's usual path() (thick blue band + rounded head), which is exactly what the owner
# asked to remove.
BUS_Y = 420
DROP_Y = 480
desk_centers = [dx + dw / 2 for dx, dw, *_ in agents]


def _thin_line(points):
    d = "M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in points)
    return f'<path d="{d}" fill="none" stroke="{CONNECTOR_GREY}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'


# trunk: doc bottom -> down to the bus -> across to the last desk -> down its drop
b += [_thin_line([FAN_START, (FAN_START[0], BUS_Y), (desk_centers[-1], BUS_Y), (desk_centers[-1], DROP_Y)])]
# the three remaining drops from the bus down to their desks
for cx in desk_centers[:-1]:
    b += [_thin_line([(cx, BUS_Y), (cx, DROP_Y)])]

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
