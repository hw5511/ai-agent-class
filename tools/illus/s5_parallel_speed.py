"""5/4 병렬 실행 · 속도 비교: a calm Gantt-style timeline instead of stopwatch clocks and loud
red/green numbers. One shared horizontal time axis (0..30분) sits between two groups - sequential
(3 bars end to end, top) and parallel (3 bars stacked, all starting at 0, bottom) - so both read
off the same scale. Durations are small flat labels; the saving is a quiet bracket + muted label on
the axis, not a big red/green callout. The mascot stays (CEO 2026-09-26 constraint for 5/3 and 5/4)
but small: one for "메인 클로드 혼자", three small ones for the parallel sub-agents. Numbers kept
exactly as the previous SVG/notes: 0/10/20/30분 ticks, 30분 sequential total, 10분 parallel total,
20분 saved."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

W2, H2 = 1920, 900

# task colour mapping shared by both groups: one blue accent + two greys (muted, per CONTENT_RULES)
TASKS = [("조사", ACCENT, "#fff"), ("코딩", INK2, "#fff"), ("정리", DESK_TOP, INK)]

# shared x-scale: 0 / 10 / 20 / 30분
X0, X10, X20, X30 = 330, 730, 1130, 1530

b = [panel_sized(W2, H2)]

# ---------- group 1: 순차 실행 (badge 1) ----------
b += [text(80, 112, "메인 혼자 · 순서대로", 38, 900, INK, anchor="start")]
b += [badge(1850, 96, 1)]

MASCOT_S1 = 0.5
MASCOT_W1, MASCOT_H1 = 240 * MASCOT_S1, 143 * MASCOT_S1
BAR1_Y, BAR1_H = 168, 92
b += [mascot(150, BAR1_Y + (BAR1_H - MASCOT_H1) / 2, MASCOT_S1)]
b += [text(150 + MASCOT_W1 / 2, BAR1_Y + BAR1_H + 34, "메인 클로드", 22, 700, MUTED)]

for i, (label, fill, tcolor) in enumerate(TASKS):
    x = [X0, X10, X20][i]
    b += [part_box(x, BAR1_Y, 400, BAR1_H, label, fill=fill, stroke=fill, label_size=32, label_color=tcolor)]
b += [text(X30 + 40, BAR1_Y + BAR1_H / 2 + 10, "총 30분", 30, 800, INK, anchor="start")]

# ---------- shared time axis ----------
AXIS_Y = 330
b += [f'<path d="M{X0} {AXIS_Y}H{X30}" fill="none" stroke="{LINE2}" stroke-width="3"/>']
for x, lbl in [(X0, "0분"), (X10, "10분"), (X20, "20분"), (X30, "30분")]:
    b += [f'<path d="M{x} {AXIS_Y - 10}V{AXIS_Y + 10}" fill="none" stroke="{LINE2}" stroke-width="3"/>']
    b += [text(x, AXIS_Y + 52, lbl, 26, 700, MUTED)]

# quiet saving bracket on the axis: parallel finishes at 10분, sequential at 30분
BRACKET_Y = 402
b += [f'<path d="M{X10} {BRACKET_Y - 8}V{BRACKET_Y}H{X30}V{BRACKET_Y - 8}" fill="none" stroke="{MUTED}" stroke-width="2.5"/>']
b += [text((X10 + X30) / 2, BRACKET_Y + 30, "20분 절약", 26, 800, ACCENT_DARK)]

# ---------- group 2: 병렬 실행 (badge 2) ----------
GROUP2_Y = 470
b += [text(80, GROUP2_Y, "서브에이전트 3개 · 동시에", 38, 900, INK, anchor="start")]
b += [badge(1850, GROUP2_Y - 16, 2)]

BAR2_Y0, BAR2_H, BAR2_GAP = 540, 66, 26
MASCOT_S2 = 0.26
MASCOT_W2, MASCOT_H2 = 240 * MASCOT_S2, 143 * MASCOT_S2

for i, (label, fill, tcolor) in enumerate(TASKS):
    y = BAR2_Y0 + i * (BAR2_H + BAR2_GAP)
    b += [mascot(150, y + (BAR2_H - MASCOT_H2) / 2, MASCOT_S2)]
    b += [part_box(X0, y, 400, BAR2_H, label, fill=fill, stroke=fill, label_size=28, label_color=tcolor)]

BAR2_LAST_Y = BAR2_Y0 + 2 * (BAR2_H + BAR2_GAP)
b += [text(X10 + 40, BAR2_Y0 + (BAR2_LAST_Y + BAR2_H - BAR2_Y0) / 2 + 10, "총 10분", 30, 800, INK, anchor="start")]

print(save_sized("s5-parallel-speed.svg", b, W2, H2, "5/4 병렬 실행 · 속도 비교 (tools/illus/s5_parallel_speed.py)"))
