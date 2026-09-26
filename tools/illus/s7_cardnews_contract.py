"""7/35 스킬 = 계약: SKILL.md + cardnews.py sit together on one clipboard labelled 계약서 between student
and Claude; an arrow runs from the student to it and another from it to Claude, who already has a terminal
running on the desk."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 800, 660, WARM_ZONE), zone(930, 90, 802, 660, ACCENT_ZONE)]

b += [text(896, 150, "학생과 클로드", 26, 800, MUTED), badge(1010, 150, 2)]

# the contract clipboard: SKILL.md + cardnews.py bound together, labelled, between the two desks
board_x, board_y, board_w, board_h = 726, 230, 380, 300
board_cx = board_x + board_w / 2
b += [f'<rect x="{board_x}" y="{board_y}" width="{board_w}" height="{board_h}" rx="20" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#sh)"/>']
b += [f'<rect x="{board_cx - 40}" y="214" width="80" height="32" rx="10" fill="{DESK_TOP}"/>']
b += [text(board_cx, 275, "계약서", 32, 900, INK)]
b += [doc(770, 300, 78, -6, ACCENT), doc(960, 300, 78, 6, ACCENT_DARK)]
b += [text(809, 458, "SKILL.md", 20, 800, INK, family=MONO), text(999, 458, "cardnews.py", 18, 800, INK, family=MONO)]
b += [check(1064, 258, 20)]
b += [badge(782, 272, 1)]

# left: student desk, arrow from the mascot to the contract
b += [mascot(120, 338), desk(60, 480, 460, "학생")]
b += [path("M350 400C480 382 590 382 720 388")]

# right: Claude's desk with a terminal already running and the contract's arrow ending at it
desk_x, desk_w = 1150, 550
b += [mascot(1460, 338), desk(desk_x, 480, desk_w, "Claude")]
term_body = text(16, 58, "실행 중", 22, 800, "#7fd7ff", anchor="start")
b += [window(1180, 350, 240, 130, kind="terminal", title="terminal", body=term_body)]
b += [path("M1106 388C1145 392 1160 405 1180 418")]
b += [badge(1350, 320, 3)]

print(save("s7-cardnews-contract.svg", b, "7/35 스킬 = 계약 (tools/illus/s7_cardnews_contract.py)"))
