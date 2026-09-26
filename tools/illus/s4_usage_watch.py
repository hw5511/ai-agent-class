"""4/88 사용량 감지 알림 원리: /usage writes to a log sheet, a watchman mascot monitors the sheet from its
own desk, and rings the alert back to Claude the moment it crosses 90%."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
b += [zone(40, 60, 620, 620, WARM_ZONE), zone(1130, 60, 620, 620, ACCENT_ZONE)]

DESK_Y = 560
MS = 1.0

# ---- left: Claude, who receives the alert ----
LX = 90
b += [mascot(LX + 250 / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS), desk(LX, DESK_Y, 460, "Claude", body_h=110)]

# ---- right: the watchman, who monitors the log and rings the alarm from its own desk ----
RX = 1180
b += [mascot(RX + 60, DESK_Y - 143 * MS, MS), desk(RX, DESK_Y, 460, "monitor", body_h=110)]
# the bell sits on the desk itself, clear to the right of the mascot - never on its head
bell_cx, bell_cy = RX + 390, DESK_Y - 96
b += [f'<path d="M{bell_cx} {bell_cy - 40}a26 20 0 0 1 26 20v6a58 62 0 0 1 32 58h-116a58 62 0 0 1 32 -58v-6a26 20 0 0 1 26 -20z" fill="{MASCOT}"/>',
      f'<rect x="{bell_cx - 68}" y="{bell_cy + 44}" width="136" height="16" rx="8" fill="{ACCENT_DARK}"/>',
      f'<circle cx="{bell_cx}" cy="{bell_cy + 84}" r="12" fill="{ACCENT_DARK}"/>']

# ---- centre: the usage meter on top, writing into the log sheet below ----
GX, GY, GR = 896, 168, 82
b += [f'<circle cx="{GX}" cy="{GY}" r="{GR}" fill="{PANEL}" stroke="{LINE2}" stroke-width="4"/>',
      f'<circle cx="{GX}" cy="{GY}" r="{GR}" fill="none" stroke="{RED}" stroke-width="12" stroke-dasharray="200 380" stroke-linecap="round" transform="rotate(-210 {GX} {GY})"/>',
      f'<line x1="{GX}" y1="{GY}" x2="{GX + 54}" y2="{GY - 44}" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>',
      f'<circle cx="{GX}" cy="{GY}" r="12" fill="{INK}"/>',
      text(GX + GR + 26, GY + 8, "/usage 사용량", 32, 900, INK, anchor="start"), badge(GX - GR - 20, GY - GR + 6, 1)]

LOG_X, LOG_Y, LOG_W, LOG_H = 746, 360, 300, 170
b += [f'<rect x="{LOG_X}" y="{LOG_Y}" width="{LOG_W}" height="{LOG_H}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
      text(LOG_X + LOG_W + 24, LOG_Y + 26, "usage.log", 26, 800, MUTED, anchor="start", family=MONO)]
for i in range(4):
    yy = LOG_Y + 30 + i * 34
    w = [220, 180, 240, 150][i]
    col = RED if i == 3 else PAPER_LINE
    b += [f'<rect x="{LOG_X + 30}" y="{yy}" width="{w}" height="10" rx="5" fill="{col}"/>']

b += [path(f"M{GX} {GY + GR}C{GX - 20} {LOG_Y - 50} {LOG_X + LOG_W / 2 + 20} {LOG_Y - 36} {LOG_X + LOG_W / 2} {LOG_Y}")]

# ---- the monitor watches the log; the look-line ends at its desk edge, never at its face ----
watch_x, watch_y = RX, DESK_Y - 24
b += [path(f"M{LOG_X + LOG_W} {LOG_Y + LOG_H / 2}C{LOG_X + LOG_W + 160} {LOG_Y + LOG_H / 2 + 30} {watch_x - 120} {watch_y - 10} {watch_x} {watch_y}")]
b += [badge(RX + 120, DESK_Y - 143 * MS - 40, 2)]

# ---- the alert flows back to Claude, routed below both desks so it never crosses either one ----
ALERT_CX, ALERT_Y, ALERT_W, ALERT_H = 896, 700, 280, 92
b += [bubble(ALERT_CX - ALERT_W / 2, ALERT_Y, ALERT_W, ALERT_H, "⚠ 90%", 38, "#fff", RED, text_color=RED)]
desk_bottom = DESK_Y + 24 + 110
# red starts at the monitor desk's own bottom-right corner (its edge, never inside its body)
b += [path(f"M{RX + 460} {desk_bottom}C1680 {desk_bottom + 66} 1250 {ALERT_Y + 100} {ALERT_CX + ALERT_W / 2 + 10} {ALERT_Y + 40}", color=RED)]
# green ends at Claude's desk edge, well left of the nameplate - never on the plate text
b += [path(f"M{ALERT_CX - ALERT_W / 2 - 10} {ALERT_Y + 40}C620 {ALERT_Y + 100} 250 {desk_bottom + 86} {LX + 50} {desk_bottom}", color=GREEN)]
b += [badge(ALERT_CX, ALERT_Y - 45, 3)]

print(save("s4-usage-watch.svg", b, "4/88 사용량 감지 알림 원리 (tools/illus/s4_usage_watch.py)"))
