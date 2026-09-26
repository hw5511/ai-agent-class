"""6/3 서버 = 총무: Claude at its desk sends a request slip to the clerk desk, the clerk answers "네", pulls a
folder from the filing cabinet, and a result paper travels back."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
b += [zone(40, 120, 560, 660, WARM_ZONE), zone(1180, 120, 560, 660, ACCENT_ZONE)]

# left: Claude at its desk
DESK_L_X, DESK_TOP_Y, DESK_L_W = 90, 600, 460
mascot_h = 143 * 1.15
b += [mascot(DESK_L_X + DESK_L_W / 2 - 240 * 1.15 / 2, DESK_TOP_Y - mascot_h, 1.15),
      desk(DESK_L_X, DESK_TOP_Y, DESK_L_W, "Claude", body_h=160)]

# right: the clerk desk (서버), a filing cabinet behind the clerk
DESK_R_X = 1230
CAB_X, CAB_Y, CAB_W, CAB_H = 1622, 380, 106, 290
b += [f'<rect x="{CAB_X}" y="{CAB_Y}" width="{CAB_W}" height="{CAB_H}" rx="14" fill="{DESK}" stroke="{LINE2}" stroke-width="2.5"/>']
for i in range(3):
    yy = CAB_Y + 28 + i * 82
    b += [f'<rect x="{CAB_X + 14}" y="{yy}" width="{CAB_W - 28}" height="60" rx="6" fill="#fff" stroke="{LINE2}" stroke-width="2"/>',
          f'<rect x="{CAB_X + 38}" y="{yy + 25}" width="30" height="8" rx="4" fill="{LINE2}"/>']
b += [text(CAB_X + CAB_W / 2, CAB_Y - 20, "서류함", 24, 700, MUTED)]
b += [mascot(DESK_R_X + DESK_L_W / 2 - 240 * 1.15 / 2, DESK_TOP_Y - mascot_h, 1.15),
      desk(DESK_R_X, DESK_TOP_Y, DESK_L_W, "총무 (서버)", body_h=160)]
b += [folder(1548, 618, 70)]

# 1: request slip travels from Claude to the clerk desk, arcing up through the empty upper stage
REQ_D = "M480 480C700 170 1080 170 1300 480"
b += [path(REQ_D, ACCENT, arrow=False), arrow_head_at(1080, 170, 1300, 480, 22, ACCENT),
      doc(860, 205, 46, rot=-6), text(890, 150, "요청", 42, 900, ACCENT), badge(560, 380, 1)]

# 2: the clerk answers with a speech bubble, in the empty space above the clerk's head
b += [f'<path d="M1400 180a70 46 0 0 1 70 -46h140a70 46 0 0 1 70 46v20a70 46 0 0 1 -70 46h-96l-30 34l-4 -34h-40a70 46 0 0 1 -70 -46z" '
      f'fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
      text(1550, 216, "네!", 44, 900, ACCENT), badge(1660, 148, 2)]

# 3: the clerk pulls a folder from the cabinet, the result travels back and lands well clear of both desks
RES_D = "M1300 500C1050 565 750 565 480 500"
b += [path(RES_D, GREEN, arrow=False), arrow_head_at(750, 565, 480, 500, 22, GREEN),
      doc(860, 512, 46, rot=8, accent=GREEN),
      text(890, 660, "결과 전달", 36, 900, GREEN), badge(1010, 646, 3)]

print(save("s6-server-clerk.svg", b, "6/3 서버 = 총무 (tools/illus/s6_server_clerk.py)"))
