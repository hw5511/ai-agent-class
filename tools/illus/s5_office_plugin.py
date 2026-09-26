"""5/60 Office 3종 + Claude 추가 기능: Excel/Word/PowerPoint windows in a row, one Claude add-in
module sitting on a desk beside the mascot, cables reaching up into all three. Rework round 1
(2026-09-26): the mascot now stands beside (not behind) the cables, and the caption sits fully
below the module box, clear of the canvas edge."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def excel_grid(w, h):
    out = []
    for i in range(1, 5):
        x = w * i / 5
        out.append(f'<line x1="{x:.0f}" y1="14" x2="{x:.0f}" y2="{h-14}" stroke="{PAPER_LINE}" stroke-width="2"/>')
    for j in range(1, 4):
        y = h * j / 4
        out.append(f'<line x1="14" y1="{y:.0f}" x2="{w-14}" y2="{y:.0f}" stroke="{PAPER_LINE}" stroke-width="2"/>')
    out.append(f'<rect x="14" y="14" width="{w/5:.0f}" height="{h/4:.0f}" fill="{ACCENT_TINT}"/>')
    return "".join(out)


def doc_bars(w, h):
    out = [f'<rect x="{w*0.30:.0f}" y="18" width="{w*0.4:.0f}" height="22" rx="4" fill="{PAPER_LINE}"/>']
    y = 66
    while y < h - 20:
        out.append(f'<rect x="20" y="{y}" width="{w-40}" height="14" rx="6" fill="{PAPER_LINE}"/>')
        y += 30
    return "".join(out)


def slide_body(w, h):
    return (f'<rect x="16" y="16" width="{w-32}" height="{h-32}" rx="8" fill="#fafbfc" stroke="{LINE}" stroke-width="2"/>'
            f'<rect x="{w*0.5-90:.0f}" y="{h*0.32:.0f}" width="180" height="20" rx="5" fill="{PAPER_LINE}"/>'
            f'<rect x="{w*0.5-60:.0f}" y="{h*0.32+34:.0f}" width="120" height="12" rx="5" fill="{PAPER_LINE}"/>')


apps = [
    (64, "excel.svg", "Excel", "#107c41", excel_grid),
    (706, "word.svg", "Word", "#2b579a", doc_bars),
    (1348, "powerpoint.svg", "PowerPoint", "#c43e1c", slide_body),
]

W_WIN, H_WIN = 380, 270
WIN_Y = 90
b = [panel(), zone(50, 60, 1692, 700, ACCENT_ZONE)]

for x, logo, title, bar_color, body_fn in apps:
    b += [f'<g filter="url(#sh)"><rect x="{x}" y="{WIN_Y}" width="{W_WIN}" height="{H_WIN}" rx="16" fill="#fff" stroke="{LINE}" stroke-width="2"/></g>']
    b += [f'<path d="M{x+1} {WIN_Y+52}V{WIN_Y+16}a15 15 0 0 1 15-15h{W_WIN-32}a15 15 0 0 1 15 15V{WIN_Y+52}z" fill="{bar_color}"/>']
    b += [logo_svg(logo, x + 16, WIN_Y + 10, 34)]
    b += [text(x + 62, WIN_Y + 36, title, 28, 800, "#fff", anchor="start")]
    b += [f'<g transform="translate({x} {WIN_Y+52})">{body_fn(W_WIN, H_WIN - 52)}</g>']
    # socket point on the underside of the window where the plug cable lands
    b += [f'<circle cx="{x+W_WIN/2}" cy="{WIN_Y+H_WIN}" r="10" fill="{bar_color}"/>']

# a desk holds the single Claude add-in module; the mascot stands BESIDE it (desk drawn after the
# mascot so the mascot is seated behind the desk, not glued to the cables)
DESK_X, DESK_W, DESK_Y, BODY_H = 646, 520, 616, 130
MASCOT_S = 0.82
mascot_x = DESK_X + 44
b += [mascot(mascot_x, DESK_Y + 3 - 143 * MASCOT_S, MASCOT_S)]
b += [desk(DESK_X, DESK_Y, DESK_W, None, body_h=BODY_H)]

mod_cx, mod_cy = DESK_X + DESK_W - 150, DESK_Y - 34
sockets = [(x + W_WIN / 2, WIN_Y + H_WIN) for x, *_ in apps]
for sx, sy in sockets:
    b += [path(f"M{mod_cx} {mod_cy-50}C{mod_cx+20} {(mod_cy+sy)/2-40} {sx} {(mod_cy+sy)/2+40} {sx} {sy+10}")]

b += [f'<rect x="{mod_cx-130}" y="{mod_cy-58}" width="260" height="112" rx="18" fill="#fff" stroke="{ACCENT_DARK}" stroke-width="4" filter="url(#sh)"/>']
b += [logo_svg("claude.svg", mod_cx - 32, mod_cy - 42, 64)]
b += [text(mod_cx, mod_cy + 32, "Claude 추가 기능", 28, 900, INK)]
b += [badge(mod_cx + 110, mod_cy - 72, 1)]

# name plate for the desk + caption, both fully inside the panel
b += [text(DESK_X + DESK_W / 2, DESK_Y + BODY_H + 24 + 42, "세 앱 공통 설치", 27, 700, MUTED)]

print(save("s5-office-plugin.svg", b, "5/60 Office 3종 + Claude 추가 기능 (tools/illus/s5_office_plugin.py)"))
