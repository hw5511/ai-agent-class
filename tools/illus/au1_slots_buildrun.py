"""au1/4 빌드타임 AI vs 런타임 AI. Left - the student prompts in a mini terminal, Claude at a desk writes the
programs (collect.py / process.py card). Right - the finished program runs: three code boxes and one slot box
with the mascot inside; a chip says practice A makes 0 AI calls. Badges 1 (build), 2 (run), 3 (practice A chip)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, LY, LW, LH = 76, 170, 800, 610
RX, RY, RW, RH = 916, 170, 800, 610
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 42, "빌드타임 AI", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 78, "프로그램을 만들 때 Claude Code 사용", 23, 600, MUTED)]
b += [text(RX + RW / 2, RY + 42, "런타임 AI", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 78, "프로그램이 실행될 때마다 AI 호출", 23, 600, MUTED)]
b += [badge(LX + 70, LY + 42, 1), badge(RX + 70, RY + 42, 2)]

MS = 0.5
# ---- left: prompt terminal -> mascot at desk -> program card ----
TX, TY, TW, TH = LX + 40, LY + 130, 400, 112
tb = text(22, 34, "경비 정산기 만들어줘", 22, 700, "#7fd7ff", anchor="start", family=MONO)
b += [window(TX, TY, TW, TH, kind="terminal", title="terminal", body=tb)]
DX, DY, DW_ = LX + 60, 590, 170
b += [desk(DX, DY, DW_, "Claude", body_h=60)]
b += [mascot(DX + DW_ / 2 - 240 * MS / 2, DY - 143 * MS, MS)]
mcy = DY - 143 * MS / 2
mx = DX + DW_ / 2
b += [path(f"M{mx:.0f} {TY + TH + 8}C{mx:.0f} {TY + TH + 50} {mx:.0f} {DY - 143 * MS - 60:.0f} {mx:.0f} {DY - 143 * MS - 14:.0f}")]
CX, CYY, CW, CH = LX + 430, LY + 290, 330, 260
b += [text(CX + CW / 2, CYY - 14, "만들어진 프로그램", 20, 700, MUTED)]
b += [part_box(CX, CYY, CW, CH, None, fill="#fff", stroke=LINE2, corner=16)]
b += [folder(CX + CW / 2 - 42, CYY + 22, 84)]
for i, nm in enumerate(["collect.py", "process.py"]):
    ry = CYY + 118 + i * 54
    b += [part_box(CX + 30, ry, CW - 60, 40, None, fill="#fff", stroke=LINE2, corner=8)]
    b += [text(CX + 48, ry + 27, nm, 18, 800, INK, anchor="start", family=MONO)]
b += [path(f"M{DX + DW_ + 6} {mcy:.0f}C{DX + DW_ + 40} {mcy:.0f} {CX - 50} {mcy:.0f} {CX - 12} {mcy:.0f}")]

# ---- right: finished program runs, mascot lives inside one box ----
PY, PH = RY + 190, 190
bx = RX + 44
gap = 54
dw, sw = 120, 200
rows = [("det", "추출"), ("det", "변환"), ("slot", "AI 호출"), ("det", "적재")]
total = 3 * dw + sw + 3 * gap
bx = RX + (RW - total) / 2
rp = []
for kind, lab in rows:
    w = dw if kind == "det" else sw
    rp.append((bx, w))
    if kind == "det":
        b += [part_box(bx, PY + 40, w, 110, None, fill="#fff", stroke=LINE2, corner=16)]
        b += [text(bx + w / 2, PY + 40 + 66, lab, 26, 800, INK)]
    else:
        b += [part_box(bx, PY, w, PH, None, fill=ACCENT_ZONE, stroke=ACCENT, corner=18)]
        b += [mascot(bx + w / 2 - 240 * 0.4 / 2, PY + 22, 0.4)]
        b += [desk(bx + 30, PY + 22 + 143 * 0.4 - 4, w - 60, None, body_h=12)]
        b += [text(bx + w / 2, PY + 150, lab, 26, 800, ACCENT_DARK)]
        b += [text(bx + w / 2, PY + 178, "매 실행마다", 18, 600, MUTED)]
    bx += w + gap
for i in range(3):
    x1 = rp[i][0] + rp[i][1] + 8
    x2 = rp[i + 1][0] - 30
    b += [path(f"M{x1:.0f} {PY + 95}L{x2:.0f} {PY + 95}", width=3.5)]
b += [text(RX + RW / 2, PY - 30, "완성된 프로그램 실행", 20, 700, MUTED)]
# practice A chip
CHW, CHH = 440, 76
chx, chy = RX + (RW - CHW) / 2, RY + 470
b += [part_box(chx, chy, CHW, CHH, None, fill="#fff", stroke=ACCENT, corner=16)]
b += [text(chx + CHW / 2, chy + 48, "오늘 실습: AI 호출 0회", 28, 800, ACCENT_DARK)]
b += [badge(chx + CHW - 6, chy - 6, 3)]

print(save("au1-slots-buildrun.svg", b, "au1/4 빌드타임 AI vs 런타임 AI (tools/illus/au1_slots_buildrun.py)"))
