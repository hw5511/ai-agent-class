"""AR2/1 why a program: left - the same input run twice in a chat gives two different results, no clause cited;
right - the program gives the same result every run, with the clause recorded. Badges 1, 2."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, LY, LW, LH = 76, 170, 800, 610
RX, RY, RW, RH = 916, 170, 800, 610
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 46, "대화로 실행", 34, 800, INK), text(LX + LW / 2, LY + 84, "실행할 때마다 답이 조금씩 달라짐", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 46, "프로그램으로 실행", 34, 800, INK), text(RX + RW / 2, RY + 84, "같은 입력이면 같은 결과와 근거", 24, 600, MUTED)]

# ---- left: the same input, two chat runs, two answers ----
b += [part_box(LX + 40, LY + 120, LW - 80, 70, "입력 · 식대 영수증 1건 (한도 초과)", fill=PANEL, stroke=LINE, label_size=26, weight=700)]
for i, (run, ans) in enumerate([("1회 실행", "일부 인정"), ("2회 실행", "승인")]):
    y = LY + 232 + i * 130
    b += [bubble(LX + 40, y, 300, 80, run, 28, "#fff", LINE2, MUTED, tail_x=LX + 110)]
    b += [path(f"M{LX + 360} {y + 40}C{LX + 390} {y + 40} {LX + 410} {y + 40} {LX + 440} {y + 40}", color=LINE2)]
    b += [part_box(LX + 480, y, 280, 80, ans, fill="#fff", stroke=LINE2, label_size=30)]
b += [badge(LX + 770, LY + 222, 1)]
b += [cross(LX + 70, LY + 548, 22)]
b += [text(LX + 112, LY + 558, "근거 조항 없음, 확인하기 어려움", 28, 800, INK, anchor="start")]

# ---- right: the program, same result every run + clause ----
b += [part_box(RX + 40, RY + 120, RW - 80, 70, "입력 · 식대 영수증 1건 (한도 초과)", fill=PANEL, stroke=LINE, label_size=26, weight=700)]
code = "".join([
    text(20, 34, "judge(item, rules)", 20, 700, ACCENT_MID, anchor="start", family=MONO),
    text(20, 64, "-> 일부 인정", 20, 700, "#e7e9ec", anchor="start"),
    text(20, 94, "근거: 여비규정 한도표", 20, 700, "#e7e9ec", anchor="start"),
])
b += [window(RX + 40, RY + 232, 400, 160, kind="terminal", title="judge.py", body=code)]
for i, run in enumerate(["1회", "2회", "3회"]):
    y = RY + 232 + i * 56
    b += [part_box(RX + 520, y, 240, 46, f"{run} · 일부 인정", fill=ACCENT_ZONE, stroke=ACCENT, label_size=22)]
b += [path(f"M{RX + 470} {RY + 312}C{RX + 485} {RY + 312} {RX + 495} {RY + 312} {RX + 508} {RY + 312}")]
b += [badge(RX + 770, RY + 222, 2)]
b += [check(RX + 70, RY + 548, 22)]
b += [text(RX + 112, RY + 558, "근거 조항이 결과에 함께 남음", 28, 800, INK, anchor="start")]
print(save("ar2-bridge-why.svg", b, "AR2/1 chat run vs program (tools/illus/ar2_bridge_why.py)"))
