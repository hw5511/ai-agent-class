"""advanced 7/8 "AI 에이전트 오케스트레이션이란?" - redraw as a vector-illustration scene.

Left (faded inset): the old way - one person issues 5 separate orders to one Claude, one at a time.
Main: the PM mascot registers 5 task cards on a Notion board once; 5 worker mascots at small desks
each poll the board, pick up their own card, and work at the same time; their results return to the
board with green check arrows. Overwrites assets/advanced/step07/오케스트레이션이란.svg (the original
is archived once at assets/advanced/step07/_archive/오케스트레이션이란.svg).
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *  # noqa: F401,F403
from advframe import save_adv

REPO = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(REPO, "assets", "advanced", "step07", "오케스트레이션이란.svg")

ROLES = ["마케팅", "개발", "디자인", "경영", "기획"]

b = [panel_sized(1792, 700)]

# ---------- left inset: 기존 방식 (faded) ----------
INSET_X, INSET_Y, INSET_W, INSET_H = 40, 50, 400, 625
inset = [zone(INSET_X, INSET_Y, INSET_W, INSET_H, WARM_ZONE)]
inset += [text(INSET_X + INSET_W / 2, INSET_Y + 40, "기존 방식", 26, 800, MUTED)]

PERSON_DESK_X, PERSON_DESK_Y, PERSON_DESK_W = 60, 440, 155
CLAUDE_DESK_X, CLAUDE_DESK_W = 235, 185
PS = 0.5
PMASCOT_H = 143 * PS
PMASCOT_W = 240 * PS
DESK_LABEL_SIZE = 18
inset += [mascot(PERSON_DESK_X + (PERSON_DESK_W - PMASCOT_W) / 2, PERSON_DESK_Y - PMASCOT_H + 3, PS, fill=INK2)]
inset += [desk(PERSON_DESK_X, PERSON_DESK_Y, PERSON_DESK_W, "사람", body_h=120, label_size=DESK_LABEL_SIZE)]
inset += [mascot(CLAUDE_DESK_X + (CLAUDE_DESK_W - PMASCOT_W) / 2, PERSON_DESK_Y - PMASCOT_H + 3, PS)]
inset += [desk(CLAUDE_DESK_X, PERSON_DESK_Y, CLAUDE_DESK_W, "Claude", body_h=120, label_size=DESK_LABEL_SIZE)]

# 3 fanned bubbles (+ a small "x5" mark) = 5 separate orders, issued one at a time, no parallel run
orders = ["마케팅안 써줘", "일정 잡아줘", "시안 만들어줘"]
for i, order in enumerate(orders):
    bx, by = 70 + i * 25, 112 + i * 66
    inset.append(bubble(bx, by, 210, 60, order, size=22, tail_x=bx + 80))
inset += ['<rect x="335" y="222" width="48" height="34" rx="10" fill="#fff" stroke="' + MUTED + '" stroke-width="2"/>']
inset += [text(359, 245, "x5", 20, 800, MUTED)]
inset += [text(INSET_X + INSET_W / 2, 652, "5번 따로 지시 · 동시 실행 불가", 24, 700, MUTED)]

b.append(f'<g opacity="0.6">{"".join(inset)}</g>')

# ---------- main: 오케스트레이션 방식 ----------
MAIN_X, MAIN_Y, MAIN_W, MAIN_H = 460, 50, 1292, 625
b += [zone(MAIN_X, MAIN_Y, MAIN_W, MAIN_H, ACCENT_ZONE)]
b += [text(MAIN_X + MAIN_W / 2, MAIN_Y + 46, "오케스트레이션 방식", 30, 800, INK)]

# Notion board with 5 task cards - scaled up to fill the zone
BOARD_X, BOARD_Y, BOARD_W, BOARD_H = 780, 120, 940, 190
b += [f'<rect x="{BOARD_X}" y="{BOARD_Y}" width="{BOARD_W}" height="{BOARD_H}" rx="16" '
      f'fill="#ffffff" stroke="{LINE2}" stroke-width="2" filter="url(#sh)"/>']
b += [brand_icon("notion", BOARD_X + 24, BOARD_Y + 18, 40)]
b += [text(BOARD_X + 78, BOARD_Y + 44, "Notion 보드 - task 등록", 22, 800, INK, anchor="start")]

CARD_W, CARD_H, CARD_GAP = 150, 92, 28
cards_total_w = 5 * CARD_W + 4 * CARD_GAP
CARDS_X0 = BOARD_X + (BOARD_W - cards_total_w) / 2
CARD_Y = BOARD_Y + 72
CARD_BOTTOM = CARD_Y + CARD_H
card_cx = []
for i, role in enumerate(ROLES):
    cx0 = CARDS_X0 + i * (CARD_W + CARD_GAP)
    card_cx.append(cx0 + CARD_W / 2)
    b += [f'<rect x="{cx0}" y="{CARD_Y}" width="{CARD_W}" height="{CARD_H}" rx="10" '
          f'fill="{ACCENT_TINT}" stroke="{ACCENT}" stroke-width="2.5"/>']
    b += [text(cx0 + CARD_W / 2, CARD_Y + CARD_H / 2 - 6, role, 20, 800, ACCENT_DARK)]
    b += [text(cx0 + CARD_W / 2, CARD_Y + CARD_H / 2 + 20, "task", 14, 600, MUTED, family=MONO)]

# PM desk (protagonist, bigger scale) - registers all 5 tasks once
PM_DESK_X, PM_DESK_Y, PM_DESK_W, PM_BODY_H = 490, 508, 280, 135
PM_S = 0.85
PM_MASCOT_H = 143 * PM_S
PM_MASCOT_W = 240 * PM_S
PM_MASCOT_TOP = PM_DESK_Y - PM_MASCOT_H + 3
b += [mascot(PM_DESK_X + (PM_DESK_W - PM_MASCOT_W) / 2, PM_MASCOT_TOP, PM_S)]
b += [desk(PM_DESK_X, PM_DESK_Y, PM_DESK_W, "PM (지휘자)", body_h=PM_BODY_H, label_size=26)]
PM_CX = PM_DESK_X + PM_DESK_W / 2

# arrow 1: PM -> board's left edge (before the first card), solid blue, single head
BOARD_ENTRY_X = BOARD_X + 20
b += [path(f"M{PM_CX:.0f} {PM_MASCOT_TOP + 6:.0f}"
           f"C{PM_CX + 40:.0f} {PM_MASCOT_TOP - 80:.0f} "
           f"{BOARD_ENTRY_X - 60:.0f} {BOARD_Y + BOARD_H + 40:.0f} "
           f"{BOARD_ENTRY_X:.0f} {BOARD_Y + BOARD_H:.0f}")]
b += [badge(PM_CX - 70, PM_MASCOT_TOP - 45, 1)]

# 5 worker desks below the board - each polls, picks its own card, runs in parallel.
# Worker pitch matches the card pitch exactly so every worker sits directly under its own card.
WORKER_W, WORKER_GAP, WORKER_BODY_H = 154, 24, 124
workers_total_w = 5 * WORKER_W + 4 * WORKER_GAP
WORKERS_X0 = card_cx[0] - WORKER_W / 2
WORKER_DESK_Y = 508
WS = 0.6
W_MASCOT_H = 143 * WS
W_MASCOT_W = 240 * WS
MASCOT_TOP = WORKER_DESK_Y - W_MASCOT_H + 3
ARROW_TOP = MASCOT_TOP - 15  # arrow heads/tails stop just above the mascot's head

# blue: card's bottom edge -> straight down, offset left of the card centre
for i, role in enumerate(ROLES):
    cx = card_cx[i]
    bx = cx - 18
    b += [path(f"M{bx:.0f} {CARD_BOTTOM:.0f}L{bx:.0f} {ARROW_TOP:.0f}")]

for i, role in enumerate(ROLES):
    dx = WORKERS_X0 + i * (WORKER_W + WORKER_GAP)
    b += [mascot(dx + (WORKER_W - W_MASCOT_W) / 2, MASCOT_TOP, WS, opacity=0.97)]
    b += [desk(dx, WORKER_DESK_Y, WORKER_W, role, body_h=WORKER_BODY_H, label_size=22)]

b += [badge(BOARD_X, 365, 2)]

# green: just above the mascot's head -> straight up, offset right of the card centre, touching the card
for i, role in enumerate(ROLES):
    cx = card_cx[i]
    gx = cx + 18
    b += [path(f"M{gx:.0f} {ARROW_TOP:.0f}L{gx:.0f} {CARD_BOTTOM:.0f}", color=GREEN)]

b += [badge(1690, 365, 3)]

out = save_adv(OUT, "ADV 07", "AI 에이전트 오케스트레이션이란?", b,
               ["오케스트레이션 = PM(지휘자)이 task를 등록하면 담당자들이 각자 알아서 실행하는 구조"])
print(out)
