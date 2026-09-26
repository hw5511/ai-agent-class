"""8/54 언제 무엇을: desktop app (single request -> single result) vs VS Code + Claude Code (piling files)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
DESK_Y = 592
DESK_H = 170

# ---- left zone: 데스크톱 앱 (단발 작업) ----
b += [zone(56, 66, 806, 706, WARM_ZONE), text(459, 122, "데스크톱 앱", 40, 900)]

WIN_X, WIN_Y, WIN_W, WIN_H = 430, 372, 330, 220
win_body = (
    doc(30, 15, 50, -6) + text(96, 55, "요청", 28, 800, ACCENT, anchor="start") +
    path("M88 66C120 92 138 96 168 104") +
    doc(168, 100, 54, 5, accent=GREEN) + text(236, 148, "결과", 28, 800, GREEN, anchor="start")
)
b += [window(WIN_X, WIN_Y, WIN_W, WIN_H, "app", "Claude", win_body)]

b += [text(560, 236, "GUI 로 직관적", 32, 900, INK, anchor="end"), badge(600, 222, 1)]
b += [text(595, 280, "폴더 구조는 안 보임", 24, 700, MUTED)]

b += [mascot(150, DESK_Y - 143), desk(112, DESK_Y, 700, "단발 작업", body_h=DESK_H, label_size=30)]

# ---- right zone: VS Code + Claude Code (쌓이는 프로젝트) ----
b += [zone(924, 66, 812, 706, ACCENT_ZONE), text(1330, 122, "VS Code + Claude Code", 40, 900)]

explorer = (
    text(12, 24, "탐색기", 15, 800, "#c9ccd1", anchor="start")
    + text(12, 54, "index.html", 15, 500, "#d6d9dd", anchor="start", family=MONO)
    + text(12, 78, "style.css", 15, 500, "#d6d9dd", anchor="start", family=MONO)
    + text(12, 102, "docs/", 15, 700, "#e8c07d", anchor="start", family=MONO)
    + text(26, 124, "notes.md", 14, 500, "#d6d9dd", anchor="start", family=MONO)
    + text(12, 148, "images/", 15, 700, "#e8c07d", anchor="start", family=MONO)
)
term = (
    text(10, 20, "$ claude", 14, 500, "#8fd19e", anchor="start", family=MONO)
    + text(10, 42, "Edit(index.html)", 14, 500, "#c9ccd1", anchor="start", family=MONO)
)
VS_X, VS_Y, VS_W, VS_H = 1265, 352, 300, 240
CONTENT_H = VS_H - 52
EXP_W = 108
win_body2 = (
    f'<rect x="0" y="0" width="{EXP_W}" height="{CONTENT_H}" fill="#252629"/>' + explorer +
    f'<rect x="{EXP_W}" y="0" width="2" height="{CONTENT_H}" fill="#3a3d42"/>' +
    f'<rect x="{EXP_W + 2}" y="{CONTENT_H - 48}" width="{VS_W - EXP_W - 2}" height="48" fill="#17181a"/>' +
    f'<g transform="translate({EXP_W + 12} {CONTENT_H - 48})">{term}</g>'
)
b += [window(VS_X, VS_Y, VS_W, VS_H, "terminal", "agent1", win_body2)]

# tall pile of papers + folders beside the window, badge "!" on top
pile = [
    (1586, 580, -6), (1626, 574, 4), (1598, 558, -3), (1638, 550, 7),
    (1590, 534, -8), (1630, 526, 3), (1604, 508, -4), (1620, 492, 6),
    (1596, 474, -2),
]
for dx, dy, rot in pile:
    b += [doc(dx, dy, 50, rot)]
b += [badge(1626, 466, "!")]

b += [text(1480, 236, "폴더 · 파일 관리", 32, 900, INK, anchor="middle")]
b += [text(1480, 278, "처음엔 낯섦", 24, 700, MUTED, anchor="middle")]

b += [mascot(1000, DESK_Y - 143), desk(966, DESK_Y, 760, "쌓이는 프로젝트", body_h=DESK_H, label_size=28)]

print(save("s8-desktop-vs-vscode.svg", b, "8/54 언제 무엇을 (tools/illus/s8_desktop_vs_vscode.py)"))
