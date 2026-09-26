"""3/38 haiku -> sonnet -> opus -> fable: four workers lined up on a spectrum track, fast/cheap on the
left climbing to smart/expensive on the right, with a speed bar above and a thinking-depth bar below.
Each mascot wears a growing-student costume (kindergartener -> middle schooler -> high schooler ->
graduate) so the size/capability jump reads at a glance."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

# ---- costumes, drawn in the mascot's own local grid (0..240 x, 0..142.5 y; head spans x 30..210,
# y 0..57) so a costume lines up with mascot(x, y, s) at the same (x, y, s). ----
KINDER_HAT = "#f5c518"
KINDER_HAT_DARK = "#dba812"
KINDER_BAG = "#e2574c"
MID_BAG = "#3a5a8c"
MID_TIE = "#2f4a73"
HIGH_BLAZER = "#26314a"
HIGH_TIE = ACCENT
GRAD_CAP = INK
GRAD_TASSEL = "#d4af37"
DIPLOMA = "#ecdcb0"


def _costume(x, y, s, inner) -> str:
    return f'<g transform="translate({x} {y}) scale({s})">{inner}</g>'


def _backpack(color) -> str:
    """A small backpack peeking from the right side (col 14-15, row 2)."""
    return (f'<rect x="206" y="56" width="34" height="48" rx="8" fill="{color}"/>'
            f'<rect x="212" y="50" width="22" height="14" rx="5" fill="{color}"/>')


def costume_kinder(x, y, s) -> str:
    """A yellow kindergarten bucket hat (rounded dome crown + a wide brim, clearly a hat) and a
    backpack with a visible strap crossing the body."""
    dome_r, dome_cy = 38, -8
    inner = (f'<path d="M{120 - dome_r} {dome_cy}A{dome_r} {dome_r} 0 0 1 {120 + dome_r} {dome_cy}Z" fill="{KINDER_HAT}"/>'
             f'<rect x="{120 - dome_r}" y="{dome_cy - 6}" width="{dome_r * 2}" height="6" fill="{KINDER_HAT_DARK}"/>'
             f'<ellipse cx="120" cy="{dome_cy}" rx="92" ry="11" fill="{KINDER_HAT}"/>'
             f'<ellipse cx="120" cy="{dome_cy}" rx="92" ry="11" fill="none" stroke="{KINDER_HAT_DARK}" stroke-width="3"/>'
             f'<circle cx="120" cy="{dome_cy - dome_r}" r="6" fill="#fff"/>'
             f'<path d="M150 20L206 78" stroke="{KINDER_BAG}" stroke-width="9" stroke-linecap="round"/>'
             f'{_backpack(KINDER_BAG)}')
    return _costume(x, y, s, inner)


def costume_middle(x, y, s) -> str:
    """A short, wide necktie over a white collar, and a navy backpack with a visible strap."""
    inner = (f'<path d="M90 0L120 0L102 16Z" fill="#fff"/>'
             f'<path d="M150 0L120 0L138 16Z" fill="#fff"/>'
             f'<path d="M105 0L135 0L120 40Z" fill="{MID_TIE}"/>'
             f'<path d="M150 20L206 78" stroke="{MID_BAG}" stroke-width="9" stroke-linecap="round"/>'
             f'{_backpack(MID_BAG)}')
    return _costume(x, y, s, inner)


def costume_high(x, y, s) -> str:
    """A navy blazer whose panels run down both sides of the torso (open lapels cut near the collar,
    not a thin V wedge) over a white shirt V and a blue tie, with a small badge on the chest - reads
    clearly dressier/older than middle school."""
    inner = (f'<path d="M30 0L100 0L78 26L64 118L30 118Z" fill="{HIGH_BLAZER}"/>'
             f'<path d="M210 0L140 0L162 26L176 118L210 118Z" fill="{HIGH_BLAZER}"/>'
             f'<path d="M100 0L140 0L162 26L120 60L78 26Z" fill="#fff"/>'
             f'<path d="M106 6L134 6L120 62Z" fill="{HIGH_TIE}"/>'
             f'<circle cx="52" cy="50" r="9" fill="{GRAD_TASSEL}"/>'
             f'<circle cx="52" cy="50" r="9" fill="none" stroke="{INK}" stroke-width="2"/>')
    return _costume(x, y, s, inner)


def costume_grad(x, y, s) -> str:
    """A real graduation cap: a black skull-cap band on the head topped by a wide, flat mortarboard
    board seen slightly from the front (a short, wide rhombus, well clear of the timeline dot above),
    with a gold tassel hanging from the centre button to one side. No floating diploma."""
    band_y0, band_y1 = -16, 4
    board_top, board_bot, board_half_w = -52, -14, 117
    cx, cy = 120, (board_top + board_bot) / 2
    inner = (f'<rect x="40" y="{band_y0}" width="160" height="{band_y1 - band_y0}" rx="8" fill="{GRAD_CAP}"/>'
             f'<path d="M{cx} {board_top}L{cx + board_half_w} {cy}L{cx} {board_bot}L{cx - board_half_w} {cy}Z" fill="{GRAD_CAP}"/>'
             f'<circle cx="{cx}" cy="{cy}" r="6" fill="{GRAD_TASSEL}"/>'
             f'<path d="M{cx} {cy}q28 12 32 42" fill="none" stroke="{GRAD_TASSEL}" stroke-width="4" stroke-linecap="round"/>'
             f'<rect x="{cx + 25}" y="{cy + 40}" width="14" height="18" rx="4" fill="{GRAD_TASSEL}"/>')
    return _costume(x, y, s, inner)


COSTUMES = [costume_kinder, costume_middle, costume_high, costume_grad]

b = [panel()]

models = ["Haiku", "Sonnet", "Opus", "Fable"]
N = len(models)
X0, X1 = 260, 1560
xs = [X0 + i * (X1 - X0) / (N - 1) for i in range(N)]

TOP_Y, BOT_Y = 96, 156
b += [f'<rect x="{X0 - 40}" y="{TOP_Y}" width="{X1 - X0 + 80}" height="16" rx="8" fill="{ACCENT_TINT}"/>',
      f'<rect x="{X0 - 40}" y="{TOP_Y}" width="{(X1 - X0 + 80) * 0.28}" height="16" rx="8" fill="{ACCENT}"/>']
b += [text(X0 - 70, TOP_Y + 12, "속도", 30, 900, INK, anchor="end"), badge(X0 - 70, TOP_Y - 36, 1)]
b += [text(X1 + 70, TOP_Y + 12, "느림", 26, 700, MUTED, anchor="start")]

b += [f'<rect x="{X0 - 40}" y="{BOT_Y}" width="{X1 - X0 + 80}" height="16" rx="8" fill="{ACCENT_TINT}"/>',
      f'<rect x="{X0 - 40 + (X1 - X0 + 80) * 0.72}" y="{BOT_Y}" width="{(X1 - X0 + 80) * 0.28}" height="16" rx="8" fill="{MASCOT}"/>']
b += [text(X0 - 70, BOT_Y + 12, "생각", 30, 900, INK, anchor="end")]
b += [text(X1 + 70, BOT_Y + 12, "깊음", 26, 700, MUTED, anchor="start"), badge(X1 + 70, BOT_Y + 52, 2)]

TRACK_Y = 245
b += [f'<rect x="{X0 - 60}" y="{TRACK_Y}" width="{X1 - X0 + 120}" height="14" rx="7" fill="{LINE}"/>']

DESK_Y = 480
MS = 1.05
BODY_H = 175
usage_tags = ["빠르고 저렴", "빠름 ↔ 똑똑함", "똑똑함 ↔ 빠름", "더 똑똑함", "사용량 큼"]
for i, (mx, name) in enumerate(zip(xs, models)):
    highlight = i == N - 1
    b += [f'<line x1="{mx}" y1="{BOT_Y + 16}" x2="{mx}" y2="{TRACK_Y}" stroke="{LINE2}" stroke-width="4" stroke-dasharray="3 10"/>']
    dot_fill = MASCOT if highlight else ACCENT
    b += [f'<circle cx="{mx}" cy="{TRACK_Y - 7}" r="14" fill="{dot_fill}"/>']
    mx0, my0 = mx - 240 * MS / 2, DESK_Y - 143 * MS
    b += [mascot(mx0, my0, MS), COSTUMES[i](mx0, my0, MS)]
    b += [desk(mx - 150, DESK_Y, 300, name, body_h=BODY_H)]
    if highlight:
        # the highlighted model gets a coloured desk-top frame instead of recolouring the mascot itself
        b += [f'<rect x="{mx - 150}" y="{DESK_Y}" width="300" height="26" rx="10" fill="none" stroke="{MASCOT}" stroke-width="5"/>']
    # the usage line sits inside the desk body, right under the nameplate - never below the desk
    tag = usage_tags[3] + " · " + usage_tags[4] if i == N - 1 else usage_tags[i]
    b += [text(mx, DESK_Y + 24 + 146, tag, 21, 700, MUTED)]

print(save("s3-model-lineup.svg", b, "3/38 haiku -> sonnet -> opus -> fable (tools/illus/s3_model_lineup.py)"))
