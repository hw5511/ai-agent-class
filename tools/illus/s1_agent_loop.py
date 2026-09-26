"""1/2 AI에이전트란?: the mascot at a desk goes around a loop - looks at the folder (환경 인식),
thinks in a bubble (자율 판단), then uses a tool and checks the result before looping back (도구 활용과 반복)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# center: the mascot behind its desk
DESK_X, DESK_Y, DESK_W = 736, 480, 320
mascot_s = 1.2
mascot_w = 240 * mascot_s
mascot_x = DESK_X + DESK_W / 2 - mascot_w / 2
mascot_y = DESK_Y - 143 * mascot_s
b += [mascot(mascot_x, mascot_y, mascot_s), desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=180)]

# 1: environment - a folder of files plus a small browser window (web / API), left of the desk
FOLDER_X, FOLDER_Y, FOLDER_W = 176, 320, 176
b += [folder(FOLDER_X, FOLDER_Y, FOLDER_W, "파일 · 웹 · API")]
b += [path(f"M{FOLDER_X + FOLDER_W + 10} {FOLDER_Y + 60}C{FOLDER_X + 260} {FOLDER_Y + 10} {mascot_x - 120} {mascot_y + 210} {mascot_x - 6} {mascot_y + 220}",
           ACCENT),
      text(FOLDER_X + FOLDER_W / 2, FOLDER_Y - 24, "환경 인식", 34, 900, ACCENT),
      badge(FOLDER_X - 6, FOLDER_Y - 6, 1)]

# 2: thought bubble above the mascot's head - 자율 판단
BUB_X, BUB_Y, BUB_W, BUB_H = 706, 70, 380, 130
b += [f'<path d="M{BUB_X} {BUB_Y + 60}a60 60 0 0 1 60 -60h{BUB_W - 120}a60 60 0 0 1 60 60v10a60 60 0 0 1 -60 60h-{BUB_W / 2 - 60}'
      f'l-38 46l-6 -46h-16a60 60 0 0 1 -60 -60z" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
      f'<circle cx="{BUB_X + BUB_W / 2 - 90}" cy="{BUB_Y + BUB_H + 26}" r="12" fill="#fff" stroke="{LINE2}" stroke-width="3"/>',
      f'<circle cx="{BUB_X + BUB_W / 2 - 118}" cy="{BUB_Y + BUB_H + 52}" r="7" fill="#fff" stroke="{LINE2}" stroke-width="3"/>',
      text(BUB_X + BUB_W / 2, BUB_Y + 56, "다음엔 뭘 하지?", 34, 800, INK),
      text(BUB_X + BUB_W / 2, BUB_Y - 20, "자율 판단", 34, 900, ACCENT),
      badge(BUB_X + BUB_W - 10, BUB_Y - 10, 2)]

# 3: a tool (laptop) plus the checked result, right of the desk
LAP_X, LAP_Y, LAP_W = 1408, 316, 210
lap_screen = (f'<rect x="0" y="0" width="{LAP_W - 20}" height="{(LAP_W - 20) * 0.63 - 20}" fill="{ACCENT_TINT}"/>'
              f'<rect x="14" y="14" width="{LAP_W - 48}" height="10" rx="5" fill="{ACCENT}"/>'
              f'<rect x="14" y="34" width="{(LAP_W - 48) * 0.6}" height="10" rx="5" fill="{ACCENT_MID}"/>')
b += [laptop(LAP_X, LAP_Y, LAP_W, lap_screen), check(LAP_X + LAP_W + 18, LAP_Y + (LAP_W - 20) * 0.63 - 6, 24)]
b += [path(f"M{mascot_x + mascot_w + 6} {mascot_y + 220}C{mascot_x + mascot_w + 140} {mascot_y + 210} {LAP_X - 260} {LAP_Y + 60} {LAP_X - 10} {LAP_Y + 60}",
           ACCENT)]
b += [text(LAP_X + 70, LAP_Y - 24, "도구 활용과 반복", 34, 900, ACCENT, anchor="start"),
      badge(LAP_X - 12, LAP_Y - 12, 3)]

# repeat: a return arc that stays clear of the desk (now raised) the whole way - it leaves the laptop,
# stays right of the desk's right edge until it is well below the desk's bottom, sweeps left underneath
# both the desk and the folder, then curves up into the folder's left edge, never crossing the desk, the
# nameplate, the folder's own label below it, or badge 1
LOOP_START_X, LOOP_START_Y = LAP_X - 60, LAP_Y + (LAP_W - 20) * 0.63 + 30
LOOP_D = (f"M{LOOP_START_X} {LOOP_START_Y}"
          f"C{LOOP_START_X} 690 1200 750 1070 750"
          f"C900 760 500 760 90 750"
          f"C80 560 70 405 176 400")
b += [path(LOOP_D, GREEN)]
b += [text(896, 806, "결과를 보고 다시 반복", 28, 800, MUTED)]

print(save("agent-loop.svg", b, "1/2 AI에이전트란? (tools/illus/s1_agent_loop.py)"))
