"""5/41 이벤트 감지와 실행: three plain boxes in reading order - my prompt, the
UserPromptSubmit hook's inserted text, and the answer it produces - with the mascot
beside the answer. Badge 1 marks the moment the hook catches the prompt (the boundary
between box 1 and box 2); badge 2 marks the hook box itself (the inserted text). A
full-width rule at the bottom states the hook as one plain sentence.

Muted palette only: white surfaces, thin neutral borders, dark ink text, one blue
accent for badges/highlights, Claude orange only for the mascot. No fish hook, no
swooping arrows, no sticky note - just boxes and thin connectors.
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

CW, CH = 1920, 900

COL_Y, COL_H = 210, 430
GAP = 44
X0 = 64
COL_W = (1920 - 2 * X0 - 2 * GAP) // 3  # three equal columns

c1x = X0
c2x = c1x + COL_W + GAP
c3x = c2x + COL_W + GAP

b = [panel_sized(CW, CH)]

# ---- column 1: 내 프롬프트 ----
b += [f'<rect x="{c1x}" y="{COL_Y}" width="{COL_W}" height="{COL_H}" rx="16" fill="#fff" stroke="{LINE}" stroke-width="2"/>']
b += [text(c1x + 32, COL_Y + 58, "내 프롬프트", 24, 800, MUTED, anchor="start")]
b += [text(c1x + 32, COL_Y + 150, "너는 누구니?", 40, 800, INK, anchor="start")]
b += [f'<text x="{c1x + 32}" y="{COL_Y + 210}" font-size="40" font-weight="900" fill="{ACCENT}">뿅</text>']

# boundary connector + badge 1: the moment the hook catches the prompt
mid1_x = c1x + COL_W + GAP / 2
b += [f'<line x1="{c1x + COL_W}" y1="{COL_Y + COL_H / 2}" x2="{c2x}" y2="{COL_Y + COL_H / 2}" stroke="{LINE2}" stroke-width="3"/>']
b += [badge(mid1_x, COL_Y - 26, 1)]
b += [text(mid1_x, COL_Y - 60, "감지", 24, 800, ACCENT)]

# ---- column 2: UserPromptSubmit 훅 ----
b += [f'<rect x="{c2x}" y="{COL_Y}" width="{COL_W}" height="{COL_H}" rx="16" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>']
b += [text(c2x + 32, COL_Y + 58, "UserPromptSubmit 훅", 24, 800, ACCENT, anchor="start")]
b += [badge(c2x + COL_W - 40, COL_Y + 44, 2)]
b += [f'<line x1="{c2x + 32}" y1="{COL_Y + 92}" x2="{c2x + COL_W - 32}" y2="{COL_Y + 92}" stroke="{LINE}" stroke-width="2"/>']
b += [text(c2x + 32, COL_Y + 168, "끼워 넣는 문구", 22, 700, MUTED, anchor="start")]
b += [text(c2x + 32, COL_Y + 222, "답변 끝에", 32, 800, INK, anchor="start")]
b += [text(c2x + 32, COL_Y + 270, "빵빵+날짜시간 붙이기", 32, 900, INK, anchor="start")]

mid2_x = c2x + COL_W + GAP / 2
b += [f'<line x1="{c2x + COL_W}" y1="{COL_Y + COL_H / 2}" x2="{c3x}" y2="{COL_Y + COL_H / 2}" stroke="{LINE2}" stroke-width="3"/>']

# ---- column 3: 답변 (with mascot beside it) ----
MS = 0.62
mw = 240 * MS
b += [mascot(c3x + COL_W / 2 - mw / 2, COL_Y - 118, MS)]
b += [f'<rect x="{c3x}" y="{COL_Y}" width="{COL_W}" height="{COL_H}" rx="16" fill="#fff" stroke="{LINE}" stroke-width="2"/>']
b += [text(c3x + 32, COL_Y + 58, "답변", 24, 800, MUTED, anchor="start")]
b += [text(c3x + 32, COL_Y + 128, "저는 클로드 코드예요.", 30, 700, INK, anchor="start")]
b += [text(c3x + 32, COL_Y + 172, "…", 30, 700, MUTED, anchor="start")]
b += [f'<rect x="{c3x + 32}" y="{COL_Y + 210}" width="{COL_W - 64}" height="70" rx="12" fill="#fff" stroke="{ACCENT}" stroke-width="2.5"/>']
b += [text(c3x + 52, COL_Y + 256, "빵빵+2026-09-22 09:38:22", 26, 900, ACCENT, anchor="start")]

# ---- bottom rule: the hook stated as one plain sentence ----
RY, RH = 700, 100
b += [f'<rect x="{X0}" y="{RY}" width="{CW - 2 * X0}" height="{RH}" rx="20" fill="#fff" stroke="{LINE}" stroke-width="2"/>']
b += [badge(X0 + 64, RY + RH / 2, "!")]
b += [text(X0 + 118, RY + RH / 2 + 12, "훅 = 규칙 하나", 32, 900, INK, anchor="start")]
b += [f'<line x1="{X0 + 440}" y1="{RY + 26}" x2="{X0 + 440}" y2="{RY + RH - 26}" stroke="{LINE}" stroke-width="2"/>']
b += [text(X0 + 480, RY + RH / 2 + 10, "클로드가 프롬프트를 받을 때 문구를 끼워 넣는다", 30, 800, INK, anchor="start")]

print(save_sized("s5-hook-trigger.svg", b, CW, CH, "5/41 이벤트 감지와 실행 (tools/illus/s5_hook_trigger.py)"))
