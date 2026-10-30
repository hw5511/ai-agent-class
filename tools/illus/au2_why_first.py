"""AU2/why 1 why first: left - starting from the feature ("주간 보고 자동화 프로그램") leaves what to build,
where to stop and when it is done unanswered (cross, the mascot unsure); right - starting from the reason
("팀장이 매주 월요일 2시간 쓰는 보고 취합을 10분으로") fixes what to build, what to cut and when it is done (check).
Badges 1, 2, 3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, LY, LW, LH = 76, 170, 800, 610
RX, RY, RW, RH = 916, 170, 800, 610
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 46, "기능부터", 34, 800, INK), text(LX + LW / 2, LY + 84, "무엇을 만들지부터 정함", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 46, "이유부터", 34, 800, INK), text(RX + RW / 2, RY + 84, "왜 만드는지부터 정함", 24, 600, MUTED)]


def note_card(x, y, w, h):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>')


NW, NH = 580, 170

# ---- left: the vague note, the mascot unsure ----
nx, ny = LX + 110, LY + 128
b += [note_card(nx, ny, NW, NH)]
b += [text(nx + NW / 2, ny + NH / 2 + 13, "주간 보고 자동화 프로그램", 38, 800, INK)]
b += [cross(nx + NW, ny, 26), badge(nx, ny, 1)]

b += [mascot(LX + 90, LY + 408, 0.6)]
b += [text(LX + 90 + 76, LY + 388, "?", 64, 800, MUTED), text(LX + 90 + 130, LY + 372, "?", 44, 800, LINE2)]
for i, q in enumerate(["누가 쓰는지?", "얼마나 걸리는지?", "언제 끝인지?"]):
    b += [part_box(LX + 400, LY + 326 + i * 62, 330, 50, q, fill="#fff", stroke=LINE2, label_size=24, weight=700, label_color=MUTED, corner=12)]
b += [cross(LX + 70, LY + 548, 22)]
b += [text(LX + 112, LY + 558, "무엇을, 어디까지, 언제까지 알 수 없음", 28, 800, INK, anchor="start")]

# ---- right: the note with a reason, three things it decides ----
nx, ny = RX + 110, LY + 128
b += [note_card(nx, ny, NW, NH)]
b += [text(nx + NW / 2, ny + 72, "팀장이 매주 월요일 2시간 쓰는", 34, 800, INK)]
b += [text(nx + NW / 2, ny + 124, "보고 취합을 10분으로", 38, 800, INK)]
b += [check(nx + NW, ny, 26), badge(nx, ny, 2)]

CW, CH, CG = 228, 176, 16
cx0 = RX + 42
cards = [("만들 것", ["메일 모으기", "항목 나누기", "보고서 채우기"]),
         ("뺄 것", ["양식 꾸미기", "예쁜 차트"]),
         ("끝난 기준", ["10분 안에 완성", "이슈가 맨 위"])]
for i, (head, lines) in enumerate(cards):
    x = cx0 + i * (CW + CG)
    b += [part_box(x, LY + 326, CW, CH, fill="#fff", stroke=LINE2, corner=14)]
    b += [text(x + CW / 2, LY + 326 + 46, head, 28, 800, INK)]
    for j, ln in enumerate(lines):
        b += [text(x + CW / 2, LY + 326 + 92 + j * 34, ln, 22, 700, INK2)]
b += [badge(cx0 + 3 * CW + 2 * CG, LY + 326, 3)]
b += [check(RX + 70, LY + 548, 22)]
b += [text(RX + 112, LY + 558, "만들 것, 뺄 것, 끝날 때가 정해짐", 28, 800, INK, anchor="start")]
print(save("au2-why-first.svg", b, "AU2 why first: feature first vs reason first (tools/illus/au2_why_first.py)"))
