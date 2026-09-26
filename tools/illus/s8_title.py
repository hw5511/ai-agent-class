"""8/1 title: a V-shaped journey - desk -> GitHub cloud -> cloud session -> Claude desktop app -> phone."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- stop 1: 내 컴퓨터 - mascot behind a desk, laptop on the desk top showing agent1 (bottom-left) ----
DESK_A_X, DESK_A_Y, DESK_A_W = 60, 574, 460
b += [mascot(88, 434),
      laptop(300, 452, 196, folder(48, 14, 80) + text(88, 96, "agent1", 17, 700, family=MONO)),
      desk(DESK_A_X, DESK_A_Y, DESK_A_W, "내 컴퓨터")]

# ---- stop 2: GitHub cloud holding the agent1 folder (top, x ~560..900) ----
CB_X, CB_Y, CB_S = 730, 270, 0.64
b += [cloud(CB_X, CB_Y, CB_S, fill=ACCENT_ZONE),
      gh_mark(CB_X - 70, CB_Y - 84, 36),
      text(CB_X - 26, CB_Y - 56, "GitHub", 28, 900, anchor="start"),
      folder(CB_X - 56, CB_Y - 34, 112, "agent1")]

# ---- stop 3: 클라우드 세션 cloud, a small monitor inside (top, x ~930..1250) ----
CC_X, CC_Y, CC_S = 1090, 270, 0.60
mon_w, mon_h = 104, 72
mon_x, mon_y = CC_X - mon_w / 2, CC_Y - 62
monitor = (f'<rect x="{mon_x}" y="{mon_y}" width="{mon_w}" height="{mon_h}" rx="8" fill="{INK2}"/>'
           f'<rect x="{mon_x + 8}" y="{mon_y + 8}" width="{mon_w - 16}" height="{mon_h - 18}" rx="4" fill="{SCREEN}"/>'
           f'<rect x="{mon_x + 22}" y="{mon_y + 24}" width="{mon_w - 44}" height="5" rx="2.5" fill="{ACCENT}"/>'
           f'<rect x="{mon_x + 22}" y="{mon_y + 36}" width="{mon_w - 58}" height="5" rx="2.5" fill="{PAPER_LINE}"/>'
           f'<rect x="{CC_X - 8}" y="{mon_y + mon_h}" width="16" height="12" fill="{INK2}"/>'
           f'<rect x="{CC_X - 28}" y="{mon_y + mon_h + 12}" width="56" height="7" rx="3.5" fill="{DESK_TOP}"/>')
b += [cloud(CC_X, CC_Y, CC_S, fill=ACCENT_ZONE), monitor, text(CC_X, CC_Y + 108, "클라우드 세션", 34, 900)]

# ---- stop 4: 데스크톱 앱 - a second mascot behind a desk (same baseline/size as stop 1),
#      the Claude app window standing on the desk top; "데스크톱 앱" is the desk's nameplate ----
DESK_D_X, DESK_D_Y, DESK_D_W = 960, 574, 460
WIN_W, WIN_H = 210, 150
WIN_X, WIN_Y = DESK_D_X + 338 - WIN_W / 2, DESK_D_Y - WIN_H
app_body = (folder(6, 6, 58) + text(36, 70, "agent1", 14, 700, family=MONO) +
            f'<rect x="6" y="94" width="150" height="11" rx="5.5" fill="{LINE}"/>' +
            f'<rect x="6" y="114" width="104" height="11" rx="5.5" fill="{LINE}"/>')
b += [mascot(DESK_D_X + 28, 434),
      window(WIN_X, WIN_Y, WIN_W, WIN_H, "app", "", app_body), text(WIN_X + WIN_W / 2 + 30, WIN_Y + 34, "Claude", 20, 700, MUTED),
      desk(DESK_D_X, DESK_D_Y, DESK_D_W, "데스크톱 앱")]

# ---- stop 5: 폰 - a phone standing on the same baseline (desk-top line, y 574) at the right,
#      label below with clearance (bottom-right, x ~1500..1700) ----
GROUND_Y = 574
PHONE_W, PHONE_H = 110, 220
PHONE_X = 1600 - PHONE_W / 2
PHONE_Y = GROUND_Y - PHONE_H
phone_screen = (folder(2, 6, 44) + text(26, 58, "agent1", 12, 700, family=MONO) +
                f'<rect x="2" y="80" width="80" height="9" rx="4.5" fill="{LINE}"/>' +
                f'<rect x="2" y="96" width="56" height="9" rx="4.5" fill="{LINE}"/>')
b += [phone(PHONE_X, PHONE_Y, PHONE_W, phone_screen),
      text(1600, 630, "폰", 40, 900)]

# ---- travel paths, drawn last, with explicit arrowheads (PyMuPDF ignores marker-end) ----
# 1 -> 2: papers travel up into the GitHub cloud
pA = "M474 430C520 360 570 300 630 254"
b += [path(pA), arrow_head_at(570, 300, 630, 254, 20, ACCENT),
      doc(468, 358, 42, -14), doc(524, 296, 38, -6)]
# 2 -> 3: cloud to cloud
pB = "M888 258C912 258 936 260 954 262"
b += [path(pB), arrow_head_at(936, 260, 954, 262, 18, ACCENT)]
# 3 -> 4: cloud curving down into the desktop app window
pC = "M1236 330C1262 360 1276 384 1290 412"
b += [path(pC), arrow_head_at(1276, 384, 1290, 412, 18, ACCENT)]
# 4 -> 5: desk area curving up into the phone
pD = "M1416 500C1460 490 1500 480 1536 470"
b += [path(pD), arrow_head_at(1500, 480, 1536, 470, 18, ACCENT)]

print(save("s8-title.svg", b, "8/1 title - desk -> GitHub -> cloud session -> Claude app -> phone (tools/illus/s8_title.py)"))
