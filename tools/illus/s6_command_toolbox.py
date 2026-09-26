"""6/6 명령어 모음집 = MCP: a toolbox of command cards, plugged by an MCP cable into the mascot's desk,
Claude picks a card and runs it, a result pops out."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- (a) the toolbox: a case full of command cards ----
b += [zone(70, 96, 560, 604, ACCENT_ZONE)]
BOX_X, BOX_Y, BOX_W, BOX_H = 118, 156, 464, 440
b += [f'<rect x="{BOX_X}" y="{BOX_Y}" width="{BOX_W}" height="{BOX_H}" rx="24" fill="#eef3fa" stroke="{LINE2}" stroke-width="2" filter="url(#sh)"/>',
      f'<rect x="{BOX_X}" y="{BOX_Y}" width="{BOX_W}" height="70" rx="24" fill="{ACCENT_MID}"/>',
      f'<rect x="{BOX_X}" y="{BOX_Y + 40}" width="{BOX_W}" height="30" fill="{ACCENT_MID}"/>',
      text(BOX_X + BOX_W / 2, BOX_Y + 46, "명령어 모음집", 32, 900, "#fff")]

cards = ["페이지 만들기", "검색", "일정 추가", "메일 보내기", "파일 올리기", "· · ·"]
CW, CH, GAP = 196, 92, 18
gx0, gy0 = BOX_X + 24, BOX_Y + 70 + 24
for i, label in enumerate(cards):
    cx, cy = gx0 + (i % 2) * (CW + GAP), gy0 + (i // 2) * (CH + GAP)
    b += [f'<rect x="{cx}" y="{cy}" width="{CW}" height="{CH}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>',
          text(cx + CW / 2, cy + CH / 2 + 10, label, 26, 800, ACCENT_DARK if label != "· · ·" else MUTED, family=MONO)]
b += [badge(BOX_X + BOX_W - 6, BOX_Y - 6, 1)]

# ---- (b) the MCP cable, plugged into the mascot's desk ----
PLUG_X, PLUG_Y, PLUG_W, PLUG_H = 700, 372, 150, 76
b += [path(f"M{BOX_X + BOX_W} {BOX_Y + BOX_H / 2}C{BOX_X + BOX_W + 90} {PLUG_Y + PLUG_H / 2} {PLUG_X - 90} {PLUG_Y + PLUG_H / 2} {PLUG_X} {PLUG_Y + PLUG_H / 2}", width=7)]
b += [f'<rect x="{PLUG_X}" y="{PLUG_Y}" width="{PLUG_W}" height="{PLUG_H}" rx="18" fill="{ACCENT}" filter="url(#shs)"/>',
      f'<rect x="{PLUG_X - 16}" y="{PLUG_Y + 16}" width="16" height="14" rx="4" fill="{ACCENT}"/>',
      f'<rect x="{PLUG_X - 16}" y="{PLUG_Y + 46}" width="16" height="14" rx="4" fill="{ACCENT}"/>',
      text(PLUG_X + PLUG_W / 2, PLUG_Y + PLUG_H / 2 + 10, "MCP", 34, 900, "#fff")]
DESK_X, DESK_Y, DESK_W = 900, 590, 760
CABLE_END_X, CABLE_END_Y = DESK_X + 30, DESK_Y
b += [path(f"M{PLUG_X + PLUG_W} {PLUG_Y + PLUG_H / 2}C{PLUG_X + PLUG_W + 90} {PLUG_Y + PLUG_H / 2} {DESK_X - 40} {DESK_Y - 12} {CABLE_END_X} {CABLE_END_Y}", width=7)]
b += [badge(PLUG_X + PLUG_W / 2, PLUG_Y - 34, 2)]

# the cable ends at the desk with its own small plug, prongs seated into a socket on the desk edge
b += [f'<rect x="{CABLE_END_X - 34}" y="{CABLE_END_Y - 46}" width="86" height="46" rx="14" fill="{ACCENT_DARK}" filter="url(#shs)"/>',
      f'<rect x="{CABLE_END_X - 18}" y="{CABLE_END_Y - 8}" width="12" height="18" fill="{ACCENT_DARK}"/>',
      f'<rect x="{CABLE_END_X + 12}" y="{CABLE_END_Y - 8}" width="12" height="18" fill="{ACCENT_DARK}"/>',
      f'<rect x="{CABLE_END_X - 22}" y="{CABLE_END_Y + 2}" width="40" height="10" rx="4" fill="{INK2}"/>']

# ---- (c) Claude at the desk, running a picked command; a result pops out ----
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=170)]
b += [mascot(DESK_X + 210, DESK_Y - 158, 1.15)]
CARD_W, CARD_H = 172, 88
CARD_X, CARD_Y = DESK_X + 470, DESK_Y - 210
card_cx, card_cy = CARD_X + CARD_W / 2, CARD_Y + CARD_H / 2
b += [f'<g transform="rotate(-9 {card_cx} {card_cy})"><rect x="{CARD_X}" y="{CARD_Y}" width="{CARD_W}" height="{CARD_H}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="2.4" filter="url(#shs)"/>'
      f'{text(card_cx, card_cy + 10, "일정 추가", 26, 800, ACCENT_DARK, family=MONO)}</g>']

b += [path(f"M{DESK_X + 545} {DESK_Y - 190}C{DESK_X + 610} {DESK_Y - 230} {DESK_X + 630} {DESK_Y - 250} {DESK_X + 640} {DESK_Y - 260}", color=GREEN)]
b += [doc(DESK_X + 610, DESK_Y - 344, 68, 8, accent=GREEN), check(DESK_X + 700, DESK_Y - 324, 26),
      text(DESK_X + 655, DESK_Y - 400, "실행 결과", 30, 900, GREEN), badge(DESK_X + 775, DESK_Y - 320, 3)]

print(save("s6-command-toolbox.svg", b, "6/6 명령어 모음집 = MCP (tools/illus/s6_command_toolbox.py)"))
