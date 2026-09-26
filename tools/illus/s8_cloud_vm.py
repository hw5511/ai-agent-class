"""8/56 클라우드 세션 = 빌려 쓰는 컴퓨터: my laptop is off, the rented cloud computer works on cafe-landing,
results flow out to GitHub / phone / another PC."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- (a) my laptop: lid shut / screen dark ----
dark_screen = f'<rect x="0" y="0" width="{196 - 20}" height="{196 * 0.63 - 20:.0f}" fill="{INK}"/>'
b += [laptop(120, 468, 196, dark_screen), text(226, 424, "전원 꺼짐", 26, 700, MUTED, anchor="middle"), badge(322, 420, 2)]
b += [desk(58, 612, 340, "내 컴퓨터", body_h=150, label_size=28)]

# ---- (b) the cloud zone: rented computer, mascot at its own desk ----
b += [zone(430, 66, 740, 706, ACCENT_ZONE)]
b += [text(650, 118, "클라우드 세션", 38, 900, ACCENT_DARK, anchor="start"),
      text(650, 154, "빌려 쓰는 컴퓨터", 24, 700, MUTED, anchor="start")]

DESK_X, DESK_W, DESK_Y2, DESK_H2 = 450, 640, 592, 160
WIN_X, WIN_Y, WIN_W, WIN_H = 760, 372, 300, 220
win_body = (doc(20, 20, 46, -6) + doc(70, 44, 46, 4, accent=GREEN) + doc(120, 20, 46, -3) +
            text(20, 116, "수정 중", 24, 700, MUTED, anchor="start"))
b += [window(WIN_X, WIN_Y, WIN_W, WIN_H, "app", "cafe-landing", win_body)]
b += [badge(WIN_X + WIN_W - 4, WIN_Y + 4, 1)]

b += [mascot(490, DESK_Y2 - 143), desk(DESK_X, DESK_Y2, DESK_W, "cafe-landing", body_h=DESK_H2, label_size=26)]

MX = WIN_X + WIN_W

# ---- (c) results flowing out to GitHub / phone / another PC (from the cloud monitor) ----
b += [path(f"M{MX} {WIN_Y + 46}C{MX + 90} {WIN_Y + 10} 1180 190 1278 145")]
b += [gh_mark(1290, 118, 50), text(1358, 156, "레포에 반영", 30, 800, INK, anchor="start")]

phone_screen = (f'<rect x="0" y="0" width="84" height="{100 * 2 - 64}" fill="{SCREEN}"/>'
                f'<rect x="8" y="14" width="68" height="10" rx="4" fill="{ACCENT_TINT}"/>'
                f'<rect x="8" y="32" width="50" height="10" rx="4" fill="{ACCENT_TINT}"/>')
b += [path(f"M{MX} {WIN_Y + WIN_H / 2}C1250 {WIN_Y + WIN_H / 2} 1420 460 1495 462")]
b += [phone(1500, 372, 100, phone_screen), text(1550, 358, "폰에서 확인", 28, 800, INK, anchor="middle")]

b += [path(f"M{MX} {WIN_Y + WIN_H - 30}C1220 {WIN_Y + WIN_H + 60} 1340 600 1425 612")]
b += [laptop(1430, 590, 150, folder(4, 2, 62))]
b += [text(1505, 762, "다른 PC 에서 이어서", 28, 800, INK, anchor="middle")]

print(save("s8-cloud-vm.svg", b, "8/56 클라우드 세션 = 빌려 쓰는 컴퓨터 (tools/illus/s8_cloud_vm.py)"))
