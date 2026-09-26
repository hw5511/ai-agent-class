"""3/8 5시간 창 · 주간 한도: a 5-hour block bar that auto-resets, next to a 7-day bar climbing toward its cap;
either one hitting its limit lowers a boom gate in front of Claude's desk."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

ZONE_Y, ZONE_H = 56, 300
LEFT_X, LEFT_W = 70, 780
RIGHT_X, RIGHT_W = 940, 780
b += [zone(LEFT_X, ZONE_Y, LEFT_W, ZONE_H, WARM_ZONE), zone(RIGHT_X, ZONE_Y, RIGHT_W, ZONE_H, ACCENT_ZONE)]

# ---- left: 5-hour window as 5 blocks that refill ----
lcx = LEFT_X + LEFT_W / 2
b += [text(lcx, ZONE_Y + 54, "5시간 창", 44, 900), badge(LEFT_X + 56, ZONE_Y + 38, 1)]
BW, BH, GAP = 110, 120, 20
n_used = 3
bx0 = lcx - (5 * BW + 4 * GAP) / 2
by = ZONE_Y + 84
for i in range(5):
    x = bx0 + i * (BW + GAP)
    fill = ACCENT if i < n_used else "#fff"
    stroke = ACCENT_DARK if i < n_used else LINE2
    tcol = "#fff" if i < n_used else MUTED
    b += [f'<rect x="{x}" y="{by}" width="{BW}" height="{BH}" rx="16" fill="{fill}" stroke="{stroke}" stroke-width="3"/>',
          text(x + BW / 2, by + BH / 2 + 12, str(i + 1), 40, 800, tcol)]
# refresh arrow beside the blocks
rcx, rcy, rr = lcx, by + BH + 54, 28
b += [f'<path d="M{rcx - rr} {rcy}a{rr} {rr} 0 1 1 {rr * 0.62:.0f} {rr * 0.86:.0f}" fill="none" stroke="{ACCENT_DARK}" stroke-width="6" stroke-linecap="round"/>',
      arrow_head(rcx - rr + rr * 0.62, rcy + rr * 0.86, 118, 13, ACCENT_DARK)]
b += [text(rcx + rr + 24, rcy + 12, "5시간 후 자동 초기화", 26, 700, MUTED, anchor="start")]

# ---- right: weekly cap as 7 day-blocks climbing toward the ceiling ----
rcx2 = RIGHT_X + RIGHT_W / 2
b += [text(rcx2, ZONE_Y + 54, "주간 한도", 44, 900), badge(RIGHT_X + 56, ZONE_Y + 38, 2)]
days = ["월", "화", "수", "목", "금", "토", "일"]
DBW, GAP2 = 80, 13
dx0 = rcx2 - (7 * DBW + 6 * GAP2) / 2
base_y = by + BH  # same baseline as the left blocks
heights = [42, 54, 66, 78, 92, 104, 118]
ceil_y = base_y - 138
zone_right_inner = RIGHT_X + RIGHT_W - 30
line_end_x = min(dx0 + 7 * DBW + 6 * GAP2 + 20, zone_right_inner - 92)
b += [f'<path d="M{dx0 - 20} {ceil_y}H{line_end_x}" stroke="{RED}" stroke-width="4" stroke-dasharray="10 10"/>',
      text(zone_right_inner, ceil_y + 8, "상한", 28, 800, RED, anchor="end")]
for i, (d, h) in enumerate(zip(days, heights)):
    x = dx0 + i * (DBW + GAP2)
    y = base_y - h
    fill = RED if i == 6 else (ACCENT_DARK if i >= 4 else ACCENT_MID)
    b += [f'<rect x="{x}" y="{y}" width="{DBW}" height="{h}" rx="10" fill="{fill}"/>',
          text(x + DBW / 2, base_y + 32, d, 26, 700, MUTED)]
b += [text(rcx2, base_y + 66, "7일 합계 상한", 26, 700, MUTED)]

# ---- below both zones: Claude's desk first, then a boom gate lowered in front of it ----
LABEL_Y = ZONE_Y + ZONE_H + 40
b += [text(896, LABEL_Y, "먼저 도달하는 쪽에서 정지", 32, 900, INK)]

DESK_X, DESK_W = 596, 600
MS = 1.1
DESK_Y = LABEL_Y + 40 + 143 * MS
b += [mascot(DESK_X + 90, DESK_Y - 143 * MS, MS), desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=130)]

# the gate sits in front of the desk (drawn after it), a little above the desk top
GY = DESK_Y - 18
GX1, GX2 = DESK_X - 46, DESK_X + DESK_W + 46
# incoming arrows travel from each zone down to the two ends of the gate, stopping just short so the
# gate's own ends stay visible and are not painted over by the striped bar
b += [path(f"M{lcx} {ZONE_Y + ZONE_H}C{lcx + 90} {GY - 120} {GX1 - 30} {GY - 90} {GX1 - 8} {GY - 16}"),
      path(f"M{rcx2} {ZONE_Y + ZONE_H}C{rcx2 - 90} {GY - 120} {GX2 + 30} {GY - 90} {GX2 + 8} {GY - 16}")]
stripe_w = (GX2 - GX1) / 12
for i in range(12):
    x = GX1 + i * stripe_w
    fill = RED if i % 2 == 0 else "#fff"
    b += [f'<rect x="{x}" y="{GY - 15}" width="{stripe_w}" height="30" fill="{fill}" stroke="{INK2}" stroke-width="1.5"/>']
b += [f'<rect x="{GX1 - 14}" y="{GY - 15}" width="14" height="30" rx="4" fill="{INK2}"/>',
      f'<rect x="{GX2}" y="{GY - 15}" width="14" height="30" rx="4" fill="{INK2}"/>',
      f'<rect x="{DESK_X + DESK_W / 2 - 9}" y="{GY - 15}" width="18" height="54" rx="8" fill="{DESK_TOP}"/>',
      f'<circle cx="{DESK_X + DESK_W / 2}" cy="{GY - 15}" r="13" fill="{INK2}"/>']
b += [badge(GX2 + 52, GY, 3)]

print(save("s3-limits.svg", b, "3/8 5시간 창 · 주간 한도 (tools/illus/s3_limits.py)"))
