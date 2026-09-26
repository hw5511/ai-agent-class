"""7/27 마우스 없는 AI: the mascot cannot click a GUI button, but can type and run a command."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

ZY, ZH = 90, 700
ZW = 815
COLS = [61, 61 + ZW + 40]
WIN_Y, WIN_H = 130, 250
LABEL_Y = 412
DESK_Y = 555
MASCOT_Y = 460

b = [panel()]

# left: GUI - the mascot has no hand/mouse to click the button
cx = COLS[0]
b.append(zone(cx, ZY, ZW, ZH, WARM_ZONE))
b.append(badge(cx + 50, ZY + 46, 1))
win_x, win_w = cx + 175, 470
gui_body = (
    f'<rect x="20" y="14" width="180" height="14" rx="7" fill="{LINE}"/>'
    f'<rect x="20" y="40" width="120" height="14" rx="7" fill="{LINE}"/>'
    f'<rect x="150" y="100" width="150" height="56" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="3"/>'
    + text(225, 136, "저장", 26, 800, INK)
    + icon_cursor(70, 74, 40, INK)
    + cross(150, 90, 26)
)
b.append(window(win_x, WIN_Y, win_w, WIN_H, "app", "카드뉴스.pptx", gui_body))
b.append(text(cx + ZW / 2, LABEL_Y, "손이 없어서 클릭 불가", 30, 800, RED))
# mascot drawn first, desk drawn after so its top overlaps the mascot's feet
b.append(mascot(cx + 140, MASCOT_Y))
b.append(desk(cx + 30, DESK_Y, 460, "GUI 조작", body_h=150))

# right: CLI - the same mascot types the command instead and it runs
cx = COLS[1]
b.append(zone(cx, ZY, ZW, ZH, ACCENT_ZONE))
b.append(badge(cx + 50, ZY + 46, 2))
win_x = cx + 175
cli_body = (
    text(20, 60, "$ python cli.py", 24, 700, "#8fd3ff", anchor="start", family=MONO)
    + text(20, 96, '--title "AI 트렌드"', 24, 700, "#8fd3ff", anchor="start", family=MONO)
    + check(400, 172, 30)
)
b.append(window(win_x, WIN_Y, win_w, WIN_H, "terminal", "terminal", cli_body))
b.append(text(cx + ZW / 2, LABEL_Y, "키보드로 명령어 입력", 30, 800, GREEN))
b.append(mascot(cx + 140, MASCOT_Y))
b.append(desk(cx + 30, DESK_Y, 460, "명령어 실행", body_h=150))

# the arrow of understanding between the two scenes
midx = COLS[0] + ZW + 20
b.append(path(f"M{midx - 20} 260C{midx + 20} 260 {midx + 20} 260 {midx + 60} 260", ACCENT))

print(save("s7-no-mouse.svg", b, "7/27 마우스 없는 AI (tools/illus/s7_no_mouse.py)"))
