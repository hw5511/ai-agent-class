"""2/72 바탕화면 위젯 만들기: one request carries the slime widget from a doodle on the mascot's laptop,
to always-on-top on the desktop, to being dragged and dropped, to being closed from its right-click menu -
four stages left to right, connected by arrows that touch no character and never cross."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def slime(cx, bottom, w, fill=GREEN, stroke=INK2):
    half, h = w / 2, w * 0.86
    top = bottom - h
    d = (f"M{cx - half:.1f} {bottom:.1f} C{cx - half:.1f} {bottom - h * 0.62:.1f} {cx - half * 0.56:.1f} {top:.1f} {cx:.1f} {top:.1f} "
         f"C{cx + half * 0.56:.1f} {top:.1f} {cx + half:.1f} {bottom - h * 0.62:.1f} {cx + half:.1f} {bottom:.1f} Z")
    ew, eo, ey = w * 0.05, w * 0.22, top + h * 0.5
    return (f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{max(2, w * 0.02)}"/>'
            f'<circle cx="{cx - eo:.1f}" cy="{ey:.1f}" r="{ew:.1f}" fill="{stroke}"/>'
            f'<circle cx="{cx + eo:.1f}" cy="{ey:.1f}" r="{ew:.1f}" fill="{stroke}"/>'
            f'<path d="M{cx - ew * 1.6:.1f} {ey + h * 0.14:.1f}q{ew * 1.6:.1f} {ew * 1.6:.1f} {ew * 3.2:.1f} 0" fill="none" stroke="{stroke}" '
            f'stroke-width="{max(2, w * 0.018)}" stroke-linecap="round"/>')


b = [panel()]

# 1: design - the mascot behind its desk draws the slime as SVG on a laptop beside it (not overlapping it)
DESK1_X, DESK1_Y, DESK1_W = 70, 650, 520
ms = 1.0
mascot_w = 240 * ms
b += [mascot(DESK1_X + 30, DESK1_Y - 143 * ms, ms), desk(DESK1_X, DESK1_Y, DESK1_W, "내 컴퓨터", body_h=140)]
LAP1_X, LAP1_Y, LAP1_W = DESK1_X + 300, DESK1_Y - 200, 190
lap1_screen = slime(85, 88, 56) + f'<text x="8" y="20" font-size="16" font-weight="700" fill="{ACCENT}" font-family="{MONO}">svg</text>'
b += [laptop(LAP1_X, LAP1_Y, LAP1_W, lap1_screen)]
b += [text(DESK1_X + DESK1_W / 2, 96, "캐릭터 디자인", 34, 900, ACCENT), badge(LAP1_X + LAP1_W + 6, LAP1_Y - 6, "!")]

# 2: always displayed on the desktop
D2_X, D2_Y, D2_W, D2_H = 680, 150, 300, 420
b += [f'<rect x="{D2_X}" y="{D2_Y}" width="{D2_W}" height="{D2_H}" rx="20" fill="{ACCENT_ZONE}" stroke="{LINE2}" stroke-width="3"/>',
      f'<rect x="{D2_X + 24}" y="{D2_Y + 24}" width="56" height="48" rx="8" fill="#fff" stroke="{LINE}" stroke-width="2"/>',
      f'<rect x="{D2_X + 24}" y="{D2_Y + 90}" width="56" height="48" rx="8" fill="#fff" stroke="{LINE}" stroke-width="2"/>',
      text(D2_X + D2_W / 2, D2_Y - 24, "표시 위치", 34, 900, ACCENT)]
b += [slime(D2_X + D2_W - 110, D2_Y + D2_H - 50, 130)]
b += [text(D2_X + D2_W / 2, D2_Y + D2_H + 40, "바탕화면에 항상 표시", 28, 800, MUTED)]
b.append(path(f"M{LAP1_X + LAP1_W + 10} {LAP1_Y + 50}C{D2_X - 60} {LAP1_Y + 10} {D2_X - 40} {D2_Y + 90} {D2_X - 8} {D2_Y + 100}"))

# 3: dragged with the mouse (a cursor beside the slime, not on it), dropped with gravity below
D3_X = 1150
TOP_CX, TOP_BOTTOM, TOP_W = D3_X, 460, 150
BOT_CX, BOT_BOTTOM, BOT_W = D3_X, 740, 150
b += [text(D3_X, 96, "동작", 34, 900, ACCENT)]
b += [slime(TOP_CX, TOP_BOTTOM, TOP_W)]
b.append(icon_cursor(TOP_CX + TOP_W * 0.62, TOP_BOTTOM - TOP_W * 0.86 * 0.98, 42, INK))
# short drag/drop arrow between the two characters - starts below the top one, ends above the bottom
# one, touching neither
b.append(path(f"M{TOP_CX} {TOP_BOTTOM + 20}C{TOP_CX - 30} {TOP_BOTTOM + 60} {TOP_CX + 30} {TOP_BOTTOM + 100} {TOP_CX} {BOT_BOTTOM - BOT_W * 0.86 - 10}", GREEN))
b += [slime(BOT_CX, BOT_BOTTOM, BOT_W), text(D3_X, BOT_BOTTOM + 44, "놓으면 중력 적용", 28, 800, MUTED)]
# arrow into the 동작 stage: starts at the 표시 위치 box's own right edge, ends on the top slime's edge
b.append(path(f"M{D2_X + D2_W + 10} {D2_Y + D2_H / 2}C{D3_X - 220} {D2_Y + D2_H / 2 - 40} {D3_X - 180} 400 {TOP_CX - TOP_W / 2} 400"))

# 4: closed from the right-click menu
M_X, M_Y, M_W = 1500, 190, 250
b += [f'<rect x="{M_X}" y="{M_Y}" width="{M_W}" height="150" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
      f'<rect x="{M_X + 12}" y="{M_Y + 14}" width="{M_W - 24}" height="44" rx="8" fill="{PANEL}"/>',
      text(M_X + M_W / 2, M_Y + 42, "정보 보기", 24, 700, MUTED),
      f'<rect x="{M_X + 12}" y="{M_Y + 68}" width="{M_W - 24}" height="44" rx="8" fill="{RED}"/>',
      text(M_X + M_W / 2, M_Y + 96, "종료", 26, 900, "#fff")]
b += [text(M_X + M_W / 2, M_Y - 24, "종료", 34, 900, ACCENT), slime(M_X + M_W / 2, 700, 120)]
b.append(text(M_X + M_W / 2, 744, "우클릭 메뉴로 종료", 28, 800, MUTED))
b.append(path(f"M{BOT_CX + BOT_W * 0.62} {BOT_BOTTOM - BOT_W * 0.86 * 0.6}C{M_X - 100} {BOT_BOTTOM - 120} {M_X - 80} {M_Y + 260} {M_X - 8} {M_Y + 200}"))

print(save("s2-widget-flow.svg", b, "2/72 바탕화면 위젯 만들기 (tools/illus/s2_widget_flow.py)"))
