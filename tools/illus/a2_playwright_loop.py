"""A2-playwright/2 웹 브라우징 원리 (key slide): the mascot sits at the centre of a loop of four browser
windows - 접속, 구조 파악 & 스크린샷, 버튼 탐색·클릭, 입력란 채우기 - joined by dotted accent arcs that
close back on themselves (the agent repeats this loop turn after turn). Numbered badges 1-4 match the
four loop-stage notes; the real Playwright tool names (browser_navigate / browser_snapshot / browser_click)
live in the notes, not on the picture."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

CX, CY = 896, 420
WIN_W, WIN_H = 320, 170
HW, HH = WIN_W / 2, WIN_H / 2

STATIONS = [
    (CX, 190, 1, "지시 받고 접속"),
    (1490, CY, 2, "구조 파악 · 스크린샷"),
    (CX, 650, 3, "버튼 탐색 · 클릭"),
    (302, CY, 4, "입력란 채우기"),
]


def station_body(i):
    if i == 0:  # 접속: a small instruction bubble + the address bar it types into
        return (bubble(4, 2, 220, 50, "판타지 책 찾아줘", 19, "#fff", LINE2, ACCENT_DARK, tail_x=64)
                + f'<rect x="4" y="72" width="252" height="32" rx="8" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>'
                + text(20, 94, "books.toscrape.com", 17, 700, MUTED, anchor="start", family=MONO))
    if i == 1:  # 구조 파악 & 스크린샷: a wireframe layout + camera
        out = [f'<rect x="4" y="2" width="260" height="15" rx="6" fill="{PAPER_LINE}"/>',
               f'<rect x="4" y="26" width="170" height="15" rx="6" fill="{PAPER_LINE}"/>',
               f'<rect x="4" y="50" width="260" height="52" rx="8" fill="none" stroke="{ACCENT_MID}" stroke-width="3" stroke-dasharray="6 6"/>']
        cam_x, cam_y = 210, 4
        out.append(f'<rect x="{cam_x}" y="{cam_y}" width="52" height="38" rx="8" fill="{INK2}"/>')
        out.append(f'<rect x="{cam_x + 14}" y="{cam_y - 9}" width="20" height="11" rx="4" fill="{INK2}"/>')
        out.append(f'<circle cx="{cam_x + 26}" cy="{cam_y + 20}" r="11" fill="{SCREEN}" stroke="{ACCENT_MID}" stroke-width="3"/>')
        return "".join(out)
    if i == 2:  # 버튼 탐색·클릭: a highlighted button, cursor, small repeat arrow
        out = [f'<rect x="4" y="2" width="150" height="15" rx="6" fill="{PAPER_LINE}"/>',
               f'<rect x="50" y="36" width="140" height="48" rx="10" fill="{ACCENT}" stroke="#fff" stroke-width="3"/>',
               text(120, 66, "다음 페이지", 18, 800, "#fff")]
        out.append(icon_cursor(140, 72, 36, INK))
        rx, ry, rr = 232, 24, 18
        out.append(f'<path d="M{rx - rr} {ry}a{rr} {rr} 0 1 1 6 {rr * 0.55}" fill="none" stroke="{MUTED}" stroke-width="4"/>')
        out.append(arrow_head(rx - rr + 6, ry + rr * 0.55, 200, size=13, color=MUTED))
        return "".join(out)
    # 입력란 채우기: a focused input box with typed text and cursor
    out = [f'<rect x="4" y="2" width="200" height="15" rx="6" fill="{PAPER_LINE}"/>',
           f'<rect x="4" y="42" width="260" height="48" rx="10" fill="#fff" stroke="{ACCENT}" stroke-width="4"/>',
           text(20, 72, "인공지능", 22, 700, INK, anchor="start", family=MONO)]
    out.append(f'<rect x="140" y="52" width="3" height="26" fill="{ACCENT}"/>')
    out.append(icon_cursor(224, 30, 32, INK))
    return "".join(out)


for i, (cx, cy, n, label) in enumerate(STATIONS):
    x, y = cx - HW, cy - HH
    b.append(window(x, y, WIN_W, WIN_H, "browser", "chrome", station_body(i)))
    b.append(badge(x + WIN_W - 8, y - 8, n))
    b.append(text(cx, y + WIN_H + 42, label, 27, 800, INK))

# ---- centre: the mascot judging what to do next ----
b.append(mascot(CX - 120, CY - 71))
b.append(text(CX, CY + 108, "행동 판단", 24, 800, ACCENT_DARK))

# ---- the loop: dotted accent arcs, clockwise, closing back on the first station.
# 2026-09-27 fix: each arc attaches to the INNER corner of its window (the corner facing the
# mascot / the next station), never the outward edge the label sits under - the old attach points
# shared the same x as the side-station labels, so the curve swept straight across "입력란
# 채우기" / "구조 파악 · 스크린샷" on its way out. Inner-corner attachment keeps every arc inside
# the ring between the windows and the mascot, well clear of every label below its window.
top_r, top_l = (CX + HW - 30, 190 + HH), (CX - HW + 30, 190 + HH)          # station0 bottom corners
right_t, right_b = (1490 - HW, CY - HH + 30), (1490 - HW, CY + HH - 30)     # station1 left corners
bot_r, bot_l = (CX + HW - 30, 650 - HH), (CX - HW + 30, 650 - HH)           # station2 top corners
left_t, left_b = (302 + HW, CY - HH + 30), (302 + HW, CY + HH - 30)         # station3 right corners

arcs = [
    f"M{top_r[0]} {top_r[1]}C{1120} {310} {1260} {330} {right_t[0]} {right_t[1]}",
    f"M{right_b[0]} {right_b[1]}C{1260} {510} {1120} {530} {bot_r[0]} {bot_r[1]}",
    f"M{bot_l[0]} {bot_l[1]}C{672} {530} {532} {510} {left_b[0]} {left_b[1]}",
    f"M{left_t[0]} {left_t[1]}C{532} {330} {672} {310} {top_l[0]} {top_l[1]}",
]
for d in arcs:
    b.append(path(d, color=ACCENT, width=6))

# ---- repeat mark: a small looping arrow + "반복" label in the open gap between stations 1 and 2,
# reading the ring as something that runs again, not a one-way relay.
rep_x, rep_y, rep_r = 1290, 260, 22
b.append(f'<path d="M{rep_x - rep_r} {rep_y}a{rep_r} {rep_r} 0 1 1 8 {rep_r * 0.6}" fill="none" stroke="{ACCENT_DARK}" stroke-width="5"/>')
b.append(arrow_head(rep_x - rep_r + 8, rep_y + rep_r * 0.6, 205, size=13, color=ACCENT_DARK))
b.append(text(rep_x, rep_y - 40, "반복", 22, 800, ACCENT_DARK))

print(save("a2-playwright-loop.svg", b, "A2-playwright/2 웹 브라우징 원리 (tools/illus/a2_playwright_loop.py)"))
