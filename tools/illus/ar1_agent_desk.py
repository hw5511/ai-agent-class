"""AR1 working with the agent: ask for a plan, give templates, answer questions, review a table, send back fixes. Badges 1-4."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
# left: the student's side
b += [bubble(60, 230, 400, 76, "계획부터 말해 줘", 30, tail_x=140)]
b += [badge(450, 226, 1)]
b += [folder(100, 400, 150, "업무자료", mono=False)]
b += [doc(310, 410, 70)]
b += [text(345, 410 + 87 + 30, "양식", 24, 800, INK)]
b += [badge(420, 396, 2)]
b += [bubble(60, 590, 400, 76, "하나씩 답하기", 30, tail_x=140)]

# middle: Claude at its desk, with a question bubble
b += [bubble(600, 250, 500, 76, "확인할 것이 있어요", 30, text_color=INK, tail_x=800)]
b += [badge(1090, 246, 3)]
b += [mascot(730, 430, 1.0)]
b += [desk(620, 574, 500, "Claude Code", body_h=110, label_size=32)]

# right: result table
rows = [("신청자", "금액", "판정"), ("신청 1", "321,000", "승인"), ("신청 2", "128,400", "일부 인정"), ("신청 3", "56,000", "보완 요청")]
body = ""
for i, (a, c, d) in enumerate(rows):
    yy = 44 + i * 56
    wt = 900 if i == 0 else 600
    col = MUTED if i == 0 else INK
    body += text(30, yy, a, 24, wt, col, anchor="start") + text(200, yy, c, 24, wt, col, anchor="start") + text(330, yy, d, 24, wt, col, anchor="start")
    body += f'<rect x="24" y="{yy + 16}" width="432" height="2" fill="{LINE}"/>'
b += [window(1260, 290, 480, 300, kind="app", title="결과 표", body=body)]
b += [badge(1710, 286, 4)]

# paths
b += [path("M470 290C560 290 620 400 704 470")]
b += [path("M400 480C520 480 600 510 704 520")]
b += [path("M470 640C570 640 640 600 704 560")]
b += [path("M960 500C1060 500 1160 470 1236 470")]
b += [path("M1500 620C1500 770 640 790 340 700", GREEN)]
b += [text(1250, 805, "고칠 점 말하고 다시", 26, 800, INK)]
print(save("ar1-agent-desk.svg", b, "AR1 에이전트와 일하는 방식 (tools/illus/ar1_agent_desk.py)"))
