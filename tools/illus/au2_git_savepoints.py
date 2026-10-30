"""AU2 git: a commit is a save point of the folder, push uploads the save points to GitHub, history lets you go back.
Badges 1 (commit), 2 (push), 3 (history)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

# ---- GitHub zone (the cloud) -------------------------------------------------------------
CX, CY = 1400, 500
b += [cloud(CX, CY, 1.3)]
b += [gh_mark(1293, 290, 54)]
b += [text(1363, 333, "GitHub", 40, 900, INK, anchor="start")]
b += [text(CX, 378, "student01/supply-board", 24, 700, MUTED, family=MONO)]

# history list inside the cloud, newest on top
ROWS = [("되돌리기", "5d1c9ae"), ("버튼 색 변경", "b82f4c7"), ("첫 버전", "3f9a1d2")]
RX, RW, RH = 1210, 380, 62
ys = [412, 492, 572]
b += [f'<line x1="{RX + 34}" y1="{ys[0] + 31}" x2="{RX + 34}" y2="{ys[-1] + 31}" stroke="{ACCENT_TINT}" stroke-width="7" stroke-linecap="round"/>']
for i, ((msg, sha), y) in enumerate(zip(ROWS, ys)):
    stroke = ACCENT if i == 2 else LINE2
    sw = 3 if i == 2 else 2
    b += [f'<rect x="{RX}" y="{y}" width="{RW}" height="{RH}" rx="14" fill="#fff" stroke="{stroke}" stroke-width="{sw}"/>']
    b += [f'<circle cx="{RX + 34}" cy="{y + 31}" r="12" fill="{ACCENT}"/>']
    b += [text(RX + 62, y + 41, msg, 26, 800, INK, anchor="start")]
    b += [text(RX + RW - 18, y + 39, sha, 20, 700, MUTED, anchor="end", family=MONO)]
b += [badge(RX + 4, ys[0] + 2, 3)]

# ---- my computer: Claude at the desk with the project folder -----------------------------
b += [mascot(70, 480, 1.0)]
b += [desk(60, 620, 600, "내 컴퓨터", body_h=130)]
b += [folder(350, 440, 160, "supply-board")]
b += [bubble(50, 386, 300, 70, "커밋하고 올려 줘", 32, tail_x=190)]

# ---- commits: the save points of the folder ----------------------------------------------
TY = 240
b += [f'<line x1="140" y1="{TY}" x2="720" y2="{TY}" stroke="{ACCENT_TINT}" stroke-width="9" stroke-linecap="round"/>']
for x, msg, sha in [(180, "첫 버전", "3f9a1d2"), (430, "버튼 색 변경", "b82f4c7"), (680, "되돌리기", "5d1c9ae")]:
    b += [f'<circle cx="{x}" cy="{TY}" r="24" fill="{ACCENT}" stroke="#fff" stroke-width="5"/>']
    b += [text(x, TY + 62, msg, 28, 800, INK)]
    b += [text(x, TY + 94, sha, 20, 700, MUTED, family=MONO)]
b += [badge(466, TY - 32, 1)]
b += [path("M430 432 L430 372", ACCENT)]

# ---- push: save points go up to GitHub ----------------------------------------------------
b += [path("M752 236C900 236 990 320 1140 392", ACCENT)]
b += [text(900, 232, "푸시", 34, 900, ACCENT)]
b += [badge(940, 302, 2)]

# ---- history: go back to an earlier save point (green = return) --------------------------
b += [path("M1196 603C1000 650 780 610 538 548", GREEN)]
b += [text(850, 696, "이전 상태로 되돌리기", 30, 800, GREEN)]

print(save("au2-git-savepoints.svg", b, "AU2 git: commit, push, history (tools/illus/au2_git_savepoints.py)"))
