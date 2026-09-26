"""7/9 라이브러리 = 남이 써둔 코드: a structured diagram - a labelled 3x2 grid of ready-made function
boxes (the library shelf) on the left, one straight neutral connector to a single result box on the
right that is already in use, with the mascot at its small desk underneath."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

GRID_X, GRID_Y = 96, 324
RES_X = 1170

# ---- header: bold title + grey one-line sub-label, once per section ----
b += [badge(GRID_X + 22, 246, 1), text(GRID_X + 60, 256, "기능별로 정리된 코드 상자", 32, 900, INK, anchor="start"),
      text(GRID_X + 60, 290, "가져오면 바로 사용", 24, 600, MUTED, anchor="start")]
b += [badge(RES_X + 22, 246, 2), text(RES_X + 60, 256, "가져다 바로 씀", 32, 900, INK, anchor="start"),
      text(RES_X + 60, 290, "직접 안 짜도 됨", 24, 600, MUTED, anchor="start")]

# ---- the grid: 3 columns x 2 rows, thin neutral borders, one accent-bordered pick ----
labels = ["QR 코드", "PDF 합치기", "이미지 처리", "웹 데이터 수집", "번역", "날짜 계산"]
BW, BH, GAPX, GAPY = 240, 130, 22, 22
PICK = 2  # "이미지 처리" - top-right corner, so its connector crosses nothing
cells = []
for i, lab in enumerate(labels):
    r, c = divmod(i, 3)
    x = GRID_X + c * (BW + GAPX)
    y = GRID_Y + r * (BH + GAPY)
    cells.append((x, y))
    is_pick = i == PICK
    b += [part_box(x, y, BW, BH, lab, fill="#fff", stroke=ACCENT if is_pick else "#e5e5e5", label_size=28,
                    label_color=ACCENT_DARK if is_pick else INK)]

# ---- result box on the right, already in use, aligned with the picked cell's row ----
px, py = cells[PICK]
RES_Y = py
RES_W, RES_H = 420, BH
b += [part_box(RES_X, RES_Y, RES_W, RES_H, None, fill="#fff", stroke=ACCENT)]
b += [text(RES_X + 40, RES_Y + RES_H / 2 - 4, "이미지 처리 사용", 28, 800, ACCENT_DARK, anchor="start"),
      check(RES_X + RES_W - 46, RES_Y + RES_H / 2, 24, fill=ACCENT)]

# ---- one straight neutral connector, picked cell -> result box ----
b += [connector(px + BW, py + BH / 2, RES_X, RES_Y + RES_H / 2)]

# ---- the mascot at its small desk, directly under the result box: it is what uses the box ----
MS = 0.55
DESK_W, DESK_Y, BODY_H = 300, 620, 70
desk_x = RES_X + (RES_W - DESK_W) / 2
b += [connector(RES_X + RES_W / 2, RES_Y + RES_H, RES_X + RES_W / 2, DESK_Y - 143 * MS + 6, head=False)]
b += [mascot(desk_x + (DESK_W - 240 * MS) / 2, DESK_Y - 143 * MS, MS),
      desk(desk_x, DESK_Y, DESK_W, "내 프로젝트", body_h=BODY_H, label_size=26)]

print(save("s7-library-toolbox.svg", b, "7/9 라이브러리 = 남이 써둔 코드 (tools/illus/s7_library_toolbox.py)"))
