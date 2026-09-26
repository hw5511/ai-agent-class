"""6/4 버튼 뒤의 배선: the mascot presses a big button on an app window standing on a desk; the same
coloured wires run from the back of that button, through a cut-open wall, to a server rack, where a
monospace command slip arrives with an explicit arrowhead and the server answers 200 OK."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# --- actor: the mascot standing at the desk, about to press the button ---
FLOOR = 760
MASCOT_S = 1.1
b += [mascot(170, 560 - 143 * MASCOT_S + 6, MASCOT_S)]

# --- desk the app window stands on ---
DESK_X, DESK_Y, DESK_W = 90, 560, 790
b += [desk(DESK_X, DESK_Y, DESK_W, body_h=FLOOR - DESK_Y - 24)]

# --- 1: the app window standing on the desk, filled (order card + big button) ---
KX, KY, KW, KH = 528, 156, 300, 430
item_card = (f'<rect x="20" y="20" width="260" height="92" rx="14" fill="{ACCENT_ZONE}"/>'
             + text(50, 60, "아메리카노", 27, 800, INK, anchor="start")
             + text(50, 92, "4,500원", 22, 600, MUTED, anchor="start"))
btn = (f'<rect x="20" y="146" width="260" height="150" rx="24" fill="{ACCENT}"/>'
       + text(150, 232, "주문하기", 42, 900, "#fff"))
b += [window(KX, KY, KW, KH, kind="app", title="주문 앱", body=item_card + btn)]
b += [badge(KX + KW - 40, KY + 52 + 150 + 20, 1)]

# --- 2: the wall, cut open right where the button's wires exit its back ---
WALL_X, WALL_Y, WALL_W = KX + KW, 140, 470
WALL_H = FLOOR - WALL_Y
b += [f'<rect x="{WALL_X}" y="{WALL_Y}" width="{WALL_W}" height="{WALL_H}" rx="16" fill="{DESK_TOP}"/>']
cut_x0, cut_x1 = WALL_X + 22, WALL_X + WALL_W - 30
zig_top, zig_bot = WALL_Y + 26, WALL_Y + WALL_H - 26
n_zig = 7
step = (zig_bot - zig_top) / n_zig
zig_pts = " ".join(
    f"L{cut_x1 - 28 if i % 2 == 0 else cut_x1 + 12} {zig_top + step * i:.1f}" for i in range(1, n_zig)
)
b += [f'<path d="M{cut_x0} {zig_top} L{cut_x1} {zig_top} {zig_pts} L{cut_x1 - 24} {zig_bot} L{cut_x0} {zig_bot} Z" '
      f'fill="{PANEL}" stroke="{LINE2}" stroke-width="3"/>']
b += [text(WALL_X + WALL_W / 2, WALL_Y - 24, "배선", 40, 900, INK)]

# the SAME wires: they start at the button's back edge (the window's right edge) and run,
# unbroken, through the cut wall to the server rack's left edge
wire_colors = [ACCENT, GREEN, MASCOT, ACCENT_DARK, ACCENT_MID]
wire_ys = [200, 270, 340, 410, 480]
SERVER_X = WALL_X + WALL_W + 30
for color, wy in zip(wire_colors, wire_ys):
    b.append(f'<path d="M{KX + KW - 4} {wy}C{KX + KW + 90} {wy - 20} {WALL_X + 260} {wy + 20} {SERVER_X} {wy}" '
              f'fill="none" stroke="{color}" stroke-width="9" stroke-linecap="round"/>')
b += [badge(WALL_X + WALL_W / 2, WALL_Y + WALL_H + 26, 2)]

# --- 3: server rack, receiving a monospace command with an explicit arrowhead, answering 200 OK ---
SRV_W, SRV_H = 250, WALL_H
b += [f'<rect x="{SERVER_X}" y="{WALL_Y}" width="{SRV_W}" height="{SRV_H}" rx="18" fill="{INK2}"/>']
n_slots = 8
slot_step = (SRV_H - 60) / n_slots
for i in range(n_slots):
    yy = WALL_Y + 30 + i * slot_step
    b += [f'<rect x="{SERVER_X + 26}" y="{yy:.1f}" width="{SRV_W - 52}" height="{slot_step - 14:.1f}" rx="6" fill="#2f333a"/>',
          f'<circle cx="{SERVER_X + 48}" cy="{yy + (slot_step - 14) / 2:.1f}" r="8" fill="{GREEN if i != 4 else ACCENT_MID}"/>']
b += [text(SERVER_X + SRV_W / 2, WALL_Y + SRV_H + 40, "서버", 36, 900, INK)]

SLIP_X, SLIP_Y, SLIP_W, SLIP_H = SERVER_X - 240, 358, 210, 92
b += [f'<rect x="{SLIP_X}" y="{SLIP_Y}" width="{SLIP_W}" height="{SLIP_H}" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      text(SLIP_X + SLIP_W / 2, SLIP_Y + 38, "POST /orders", 25, 700, ACCENT_DARK, family=MONO),
      text(SLIP_X + SLIP_W / 2, SLIP_Y + 68, "{ item: “아메리카노” }", 17, 600, MUTED, family=MONO)]
arrow_tip_x, arrow_tip_y = SERVER_X - 2, SLIP_Y + SLIP_H / 2
b += [path(f"M{SLIP_X + SLIP_W} {SLIP_Y + SLIP_H / 2}C{SLIP_X + SLIP_W + 20} {SLIP_Y + SLIP_H / 2} {arrow_tip_x - 24} {arrow_tip_y} {arrow_tip_x - 8} {arrow_tip_y}",
           ACCENT, dotted=True, arrow=False, width=5)]
b += [arrow_head(arrow_tip_x, arrow_tip_y, 0, size=16, color=ACCENT)]
b += [badge(SLIP_X + SLIP_W / 2, SLIP_Y - 26, 3)]

RESP_X, RESP_Y, RESP_W, RESP_H = SERVER_X + SRV_W + 34, WALL_Y + SRV_H / 2 - 90, 180, 180
b += [f'<rect x="{RESP_X}" y="{RESP_Y}" width="{RESP_W}" height="{RESP_H}" rx="16" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      check(RESP_X + RESP_W / 2, RESP_Y + 62, 34), text(RESP_X + RESP_W / 2, RESP_Y + 122, "200 OK", 26, 800, GREEN),
      text(RESP_X + RESP_W / 2, RESP_Y + 152, "주문 완료", 22, 700, MUTED)]
resp_tip_x, resp_tip_y = RESP_X - 2, RESP_Y + RESP_H / 2
b += [path(f"M{SERVER_X + SRV_W} {RESP_Y + RESP_H / 2}C{SERVER_X + SRV_W + 20} {RESP_Y + RESP_H / 2} {resp_tip_x - 24} {resp_tip_y} {resp_tip_x - 8} {resp_tip_y}",
           GREEN, dotted=True, arrow=False, width=5)]
b += [arrow_head(resp_tip_x, resp_tip_y, 0, size=16, color=GREEN)]

print(save("s6-button-wiring.svg", b, "6/4 버튼 뒤의 배선 (tools/illus/s6_button_wiring.py)"))
