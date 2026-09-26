"""3/8 5시간 창 · 주간 한도: Claude centred on its desk, the 5-hour window on the left, the weekly cap on
the right - whichever limit is hit first stops Claude. Owner feedback (2026-09-26): basic colours only, no
arrows, Claude centred with a balanced left/right composition."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

CX = W / 2  # 896

# ---- centre column: Claude's desk ----
DESK_W = 520
DESK_X = CX - DESK_W / 2
MS = 1.3
BODY_H = 150
DESK_Y = 520
b += [mascot(DESK_X + (DESK_W - 240 * MS) / 2, DESK_Y - 143 * MS, MS),
      desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=BODY_H)]
b += [badge(CX, DESK_Y - 143 * MS - 40, 3)]
b += [text(CX, DESK_Y + 26 + BODY_H + 50, "먼저 도달하는 쪽에서 정지", 32, 900, INK)]

# ---- left column: 5시간 창 ----
LEFT_X0, LEFT_X1 = 80, DESK_X - 60
LCX = (LEFT_X0 + LEFT_X1) / 2
b += [badge(LCX, 90, 1), text(LCX, 166, "5시간 창", 44, 900)]

BW, BH, GAP = 84, 110, 14
n_used = 3
bx0 = LCX - (5 * BW + 4 * GAP) / 2
BY = 230
for i in range(5):
    x = bx0 + i * (BW + GAP)
    fill = ACCENT if i < n_used else "#fff"
    stroke = ACCENT if i < n_used else LINE2
    tcol = "#fff" if i < n_used else MUTED
    b += [f'<rect x="{x}" y="{BY}" width="{BW}" height="{BH}" rx="14" fill="{fill}" stroke="{stroke}" stroke-width="3"/>',
          text(x + BW / 2, BY + BH / 2 + 12, str(i + 1), 36, 800, tcol)]
b += [text(LCX, BY + BH + 60, "5시간마다 초기화", 26, 700, MUTED)]

# ---- right column: 주간 한도 ----
RIGHT_X0, RIGHT_X1 = DESK_X + DESK_W + 60, W - 80
RCX = (RIGHT_X0 + RIGHT_X1) / 2
b += [badge(RCX, 90, 2), text(RCX, 166, "주간 한도", 44, 900)]

days = ["월", "화", "수", "목", "금", "토", "일"]
DBW, GAP2 = 54, 10
dx0 = RCX - (7 * DBW + 6 * GAP2) / 2
base_y = BY + BH  # 340, same baseline as the left blocks
heights = [20, 28, 36, 46, 58, 72, 90]
ceil_y = base_y - 100
b += [f'<path d="M{dx0 - 16} {ceil_y}H{RIGHT_X1 - 70}" stroke="{RED}" stroke-width="4" stroke-dasharray="10 10"/>',
      text((dx0 - 16 + RIGHT_X1 - 70) / 2, ceil_y - 18, "상한", 28, 800, RED)]
for i, (d, h) in enumerate(zip(days, heights)):
    x = dx0 + i * (DBW + GAP2)
    y = base_y - h
    fill = RED if i == 6 else ACCENT
    b += [f'<rect x="{x}" y="{y}" width="{DBW}" height="{h}" rx="8" fill="{fill}"/>',
          text(x + DBW / 2, base_y + 32, d, 24, 700, MUTED)]
b += [text(RCX, BY + BH + 76, "7일 합계 상한", 26, 700, MUTED)]

print(save("s3-limits.svg", b, "3/8 5시간 창 · 주간 한도 (tools/illus/s3_limits.py)"))
