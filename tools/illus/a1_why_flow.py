"""A1/2 AI 작동 원리: a structured 3-column row, aligned on one grid - a real request in a chat
bubble, a mini editor with a few python lines (Write 툴), then a mini terminal that runs the script
and shows the result file - joined by straight neutral connectors in one left to right flow. One
small mascot + desk sits centred underneath, carrying the work through. Badges 1-3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
COL_W, GAP, X0 = 520, 40, 76
cols = [X0 + i * (COL_W + GAP) for i in range(3)]
TITLES = ["지시사항", "스크립트 작성", "bash 툴로 실행"]
SUBS = ["자연어로 요청", "openpyxl 로 작성", "실행해서 결과 생성"]
HEADER_Y, SUB_Y = 260, 294
CARD_Y, CARD_H = 324, 210
CAPTION_Y = CARD_Y + CARD_H + 40

for i, x in enumerate(cols):
    b += [badge(x + 22, HEADER_Y, i + 1), text(x + 60, HEADER_Y + 10, TITLES[i], 32, 900, INK, anchor="start"),
          text(x + 60, SUB_Y + 10, SUBS[i], 24, 600, MUTED, anchor="start")]

# ---- column 1: the request, as a real chat bubble ----
x = cols[0]
b += [bubble(x + 40, CARD_Y + 24, COL_W - 80, 100, "매출 합계 엑셀로 정리해줘", 27, "#fff", LINE2, ACCENT_DARK, tail_x=x + COL_W / 2)]
b += [text(x + COL_W / 2, CARD_Y + CARD_H - 24, "학생", 24, 800, INK)]

# ---- column 2: the script (mini editor, Write 툴), a few real python lines ----
x = cols[1]
ed_w, ed_h = COL_W - 60, CARD_H - 20
ed_x, ed_y = x + 30, CARD_Y + 10
ed_body = "".join([
    text(20, 34, "import openpyxl", 19, 700, ACCENT_MID, anchor="start", family=MONO),
    text(20, 62, "wb = openpyxl.Workbook()", 19, 700, "#e7e9ec", anchor="start", family=MONO),
    text(20, 90, "ws.append(total)", 19, 700, "#e7e9ec", anchor="start", family=MONO),
    text(20, 118, "wb.save('report.xlsx')", 19, 700, "#e7e9ec", anchor="start", family=MONO),
])
b += [window(ed_x, ed_y, ed_w, ed_h, kind="terminal", title="make_report.py", body=ed_body)]

# ---- column 3: the terminal (Bash), command + check + result file ----
x = cols[2]
tw, th = COL_W - 60, CARD_H - 20
tx, ty = x + 30, CARD_Y + 10
term_body = "".join([
    text(20, 34, "$ python make_report.py", 20, 700, "#c9ccd1", anchor="start", family=MONO),
    text(20, 66, "매출 집계 완료", 20, 700, ACCENT_MID, anchor="start"),
])
b += [window(tx, ty, tw, th, kind="terminal", title="terminal", body=term_body)]
b += [check(tx + 28, ty + th - 40, 18, fill=GREEN)]
file_icon_x, file_icon_y = tx + 56, ty + th - 54
b += [(f'<g transform="translate({file_icon_x} {file_icon_y})">'
       f'<path d="M2 2h11l7 7v15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#2b2d31" stroke="{GREEN}" stroke-width="2"/>'
       f'<path d="M13 2v7h7" fill="none" stroke="{GREEN}" stroke-width="2"/></g>')]
b += [text(file_icon_x + 34, ty + th - 34, "report.xlsx", 22, 800, "#e7e9ec", anchor="start", family=MONO)]

# ---- one straight neutral connector per gap, aligned on the card's mid-height ----
mid_y = CARD_Y + CARD_H / 2
for i in range(2):
    b += [connector(cols[i] + COL_W, mid_y, cols[i + 1], mid_y)]

# ---- bracket under cards 2-3: Claude does the scripting and the running ----
brack_x0, brack_x1 = cols[1], cols[2] + COL_W
BRACKET_Y = CAPTION_Y
b += [f'<path d="M{brack_x0} {BRACKET_Y - 10}V{BRACKET_Y}H{brack_x1}V{BRACKET_Y - 10}" fill="none" stroke="{MUTED}" stroke-width="2.5"/>']
b += [text((brack_x0 + brack_x1) / 2, BRACKET_Y + 34, "Claude 가 하는 일", 26, 800, ACCENT_DARK)]

# ---- exactly one mascot + small desk, centred under cards 2-3: Claude carries the work through ----
MS = 0.55
DESK_W, DESK_Y, BODY_H = 260, 706, 54
desk_x = (brack_x0 + brack_x1) / 2 - DESK_W / 2
b += [mascot(desk_x + (DESK_W - 240 * MS) / 2, DESK_Y - 143 * MS, MS),
      desk(desk_x, DESK_Y, DESK_W, None, body_h=BODY_H)]

print(save("a1-why-flow.svg", b, "A1/2 AI 작동 원리 · 지시사항 -> 스크립트 작성 -> bash 실행 (tools/illus/a1_why_flow.py)"))
