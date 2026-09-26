"""8/5 GitHub 로 하는 일 4가지: four full-height zone scenes side by side, each a small complete story."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

ZONE_Y, ZONE_H = 56, 700
ZONE_W = 400
GAP = 24
X0 = 56
zones = [X0 + i * (ZONE_W + GAP) for i in range(4)]
LABEL_Y = ZONE_Y + ZONE_H - 40

for zx in zones:
    b.append(zone(zx, ZONE_Y, ZONE_W, ZONE_H, fill=ACCENT_ZONE, rx=30))


def gh_cloud(cx, cy, s=0.56):
    """A GitHub-branded cloud: accent-tinted, with the mark on it, for use inside a zone."""
    return [cloud(cx, cy, s, fill=ACCENT_TINT), gh_mark(cx - 22, cy - 30, 40)]


# ---- 1: 백업 - mascot behind a small desk with a laptop, papers travelling UP into the cloud ----
z = zones[0]
cx = z + ZONE_W / 2
b += gh_cloud(cx, 168)
DESK1_Y = 552
MS = 0.62
MH = 143 * MS
b += [mascot(z + 52, DESK1_Y - MH + 6, MS),
      laptop(cx - 6, DESK1_Y - 108, 150, folder(36, 10, 60) + text(66, 72, "agent1", 12, 700, family=MONO)),
      desk(z + 46, DESK1_Y, 308, body_h=96)]
pth1 = f"M{cx + 66} {DESK1_Y - 100}C{cx + 96} {DESK1_Y - 200} {cx + 40} {DESK1_Y - 280} {cx - 6} {DESK1_Y - 320}"
b += [path(pth1, arrow=False), arrow_head_at(cx + 40, DESK1_Y - 280, cx - 6, DESK1_Y - 320, 18, ACCENT),
      doc(cx + 56, DESK1_Y - 216, 34, -8), doc(cx + 22, DESK1_Y - 268, 30, -14)]
b += [badge(z + 46, ZONE_Y + 46, 1), text(cx, LABEL_Y, "백업", 40, 900)]

# ---- 2: 불러오기 - cloud at the top, a folder travelling DOWN into a laptop on a desk ----
z = zones[1]
cx = z + ZONE_W / 2
b += [cloud(cx, 168, 0.56, fill=ACCENT_TINT), gh_mark(cx - 18, 112, 36)]
b.append(folder(cx - 34, 182, 68))
DESK2_Y = 552
b += [laptop(cx - 78, DESK2_Y - 108, 150, folder(36, 10, 60) + text(66, 72, "agent1", 12, 700, family=MONO)),
      desk(z + 46, DESK2_Y, 308, body_h=96)]
pth2 = f"M{cx} {282}C{cx - 30} {360} {cx - 2} {410} {cx - 4} {DESK2_Y - 108}"
b += [path(pth2, arrow=False), arrow_head_at(cx - 2, DESK2_Y - 150, cx - 4, DESK2_Y - 108, 18, ACCENT),
      doc(cx - 26, 328, 32, 10), doc(cx - 10, 400, 36, -6)]
b += [badge(z + 46, ZONE_Y + 46, 2), text(cx, LABEL_Y, "불러오기", 40, 900)]

# ---- 3: 되돌리기 - a fan of v1/v2/v3, a thick arrow bringing v1 back to the front, mascot beside it ----
z = zones[2]
cx = z + ZONE_W / 2
DOC_Y = 330
v1 = (cx - 108, DOC_Y)
v2 = (cx, DOC_Y)
v3 = (cx + 108, DOC_Y)
b += [doc(v3[0] - 34, v3[1] - 4, 68, 5, stroke=LINE), text(v3[0], v3[1] + 116, "v3", 26, 800, MUTED, family=MONO)]
b += [doc(v2[0] - 34, v2[1] - 4, 68, 0, stroke=LINE), text(v2[0], v2[1] + 116, "v2", 26, 800, MUTED, family=MONO)]
b += [doc(v1[0] - 38, v1[1] - 10, 76, -5, accent=GREEN, stroke=ACCENT_DARK), text(v1[0], v1[1] + 116, "v1", 28, 900, ACCENT_DARK, family=MONO)]
arc3 = f"M{v3[0] + 34} {v3[1] - 14}C{v3[0] + 60} {v3[1] - 110} {v1[0] - 30} {v1[1] - 110} {v1[0] - 4} {v1[1] - 24}"
b += [path(arc3, color=ACCENT, width=9, arrow=False), arrow_head_at(v1[0] - 30, v1[1] - 78, v1[0] - 4, v1[1] - 24, 24, ACCENT)]
DESK3_Y = 552
b += [mascot(z + 52, DESK3_Y - MH + 6, MS), desk(z + 46, DESK3_Y, 308, body_h=96)]
b += [badge(z + 46, ZONE_Y + 46, 3), text(cx, LABEL_Y, "되돌리기", 40, 900)]

# ---- 4: 수정 이력 - the mascot (same size) behind a desk, reading a tall list of commit memo cards ----
z = zones[3]
cx = z + ZONE_W / 2
memos = ["메뉴 추가", "색 변경", "버그 수정", "사진 교체"]
mx, my, card_w, card_h, gap = z + 44, 150, 312, 64, 12
for i, m in enumerate(memos):
    yy = my + i * (card_h + gap)
    b += [f'<rect x="{mx}" y="{yy}" width="{card_w}" height="{card_h}" rx="10" fill="#fff" stroke="{LINE}" stroke-width="2" filter="url(#shs)"/>',
          f'<circle cx="{mx + 26}" cy="{yy + card_h / 2}" r="6" fill="{ACCENT}"/>',
          text(mx + 50, yy + card_h / 2 + 8, m, 24, 700, INK2, anchor="start", family=MONO)]
DESK4_Y = 552
b += [mascot(z + 52, DESK4_Y - MH + 6, MS), desk(z + 46, DESK4_Y, 308, body_h=96)]
b += [badge(z + 46, ZONE_Y + 46, 4), text(cx, LABEL_Y, "수정 이력", 40, 900)]

print(save("s8-gh-four-uses.svg", b, "8/5 GitHub 로 하는 일 4가지 (tools/illus/s8_gh_four_uses.py)"))
