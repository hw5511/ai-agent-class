"""8/6 백업으로 되돌리기: 내 폴더(지금, 고장)와 GitHub 백업(예전에 저장, 온전) 둘만 놓고,
되돌리기 화살표 하나로 "백업이 있어서 되돌릴 수 있다"만 말한다. 커밋 타임라인 없음.

2026-09-26 relayout: one horizontal row, block top ~y=200 (3:1 rule). Both folders' mid-height
is pinned to the same Y so the restore arrow runs dead straight (no arc to the canvas edge)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- left: 내 폴더 (지금) - broken ----
LX, LY, LW = 300, 236, 240
LH = LW * 0.775
LCX = LX + LW / 2
Y_ARROW = LY + LH / 2  # shared mid-height for the straight restore arrow
b.append(folder(LX, LY, LW))
# grey it out (broken/disabled) and mark it with a big red cross, centred on the folder
b.append(f'<rect x="{LX}" y="{LY}" width="{LW}" height="{LH}" rx="16" fill="{MUTED}" opacity="0.55"/>')
b.append(cross(LCX, LY + LH * 0.5, 42))
b.append(badge(LX - 18, LY - 18, 1))
LABEL_Y = LY + LH + 40
b.append(text(LCX, LABEL_Y, "내 폴더 (지금)", 34, 900))

# small desk + mascot behind it, under 내 폴더 - stands for 내 컴퓨터
DESK_W = 280
DESK_X = LCX - DESK_W / 2
MS = 0.45
MH = 143 * MS
MASCOT_TOP = LABEL_Y + 34  # clear of the label's descenders
DESK_Y = MASCOT_TOP + MH - 4
b += [mascot(DESK_X + 40, MASCOT_TOP, MS),
      desk(DESK_X, DESK_Y, DESK_W, "내 컴퓨터", body_h=76, label_size=26)]

# ---- right: GitHub 백업 (예전에 저장) - intact, folder's mid-height pinned to Y_ARROW ----
RCX = 1300
RFX, RFW = 1217, 170
RFH = RFW * 0.775
RFY = Y_ARROW - RFH / 2
RCY = 305  # cloud centre chosen so the cloud comfortably encloses logo/text/folder above and below
b.append(cloud(RCX, RCY, 0.95, fill=ACCENT_ZONE))
b += [gh_mark(1224, RFY - 61, 38), text(1275, RFY - 26, "GitHub", 36, 900, anchor="start")]
b.append(folder(RFX, RFY, RFW, "agent1"))
b.append(badge(1199, RFY - 79, 2))
cloud_bottom = RCY + 204 * 0.95
RIGHT_LABEL_Y = cloud_bottom + 40
b.append(text(RCX, RIGHT_LABEL_Y, "GitHub 백업 (예전에 저장)", 34, 900))

# ---- one straight restore arrow: GitHub 백업 -> 내 폴더 (right -> left), at the folders'
#      shared mid-height. >=30px clearance from the arrow ends to the folder/cloud shapes. ----
cloud_left_edge = RCX - 270 * 0.95
folder_right_edge = LX + LW
start_x, end_x = 1000, 590
assert cloud_left_edge - start_x >= 30 and end_x - folder_right_edge >= 30
arrow = f"M{start_x} {Y_ARROW}L{end_x} {Y_ARROW}"
b.append(path(arrow, color=ACCENT, arrow=True))
mid_x = (start_x + end_x) / 2
label_y = Y_ARROW - 63  # >=20px clear of the arrow's halo (halo top = Y_ARROW - 12)
b.append(text(mid_x, label_y, "되돌리기", 40, 900, ACCENT))
b.append(badge(mid_x + 130, label_y, 3))

print(save("s8-gh-history.svg", b, "8/6 백업으로 되돌리기 (tools/illus/s8_gh_history.py)"))
