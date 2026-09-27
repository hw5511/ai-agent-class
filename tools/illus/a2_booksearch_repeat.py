"""A2/book-search 스킬화하기: 왜 스킬로 만드는가. 두 하프라인 패널.
왼쪽 - 새 질문이 올 때마다 카테고리 클릭 -> 페이지 이동 -> 책 클릭 -> 설명, 이 3단계 브라우저
클릭을 되돌이표로 매번 반복 (Claude 가 브라우저 창을 직접 조작). 오른쪽 - 스킬로 만들어두면
슬래시 명령 한 번 -> CLI 호출 -> 바로 답. 두 번째 질문에도 같은 스킬을 그대로 다시 쓴다.
Badge 1 (반복 구간), 2 (스킬 호출)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

LX, LY, LW, LH = 76, 170, 800, 610
RX, RY, RW, RH = 916, 170, 800, 610
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]

b += [text(LX + LW / 2, LY + 42, "그때그때 브라우저 조작", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 78, "질문마다 클릭 세 번을 되풀이", 23, 600, MUTED)]
b += [text(RX + RW / 2, RY + 42, "book-search 스킬 하나", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 78, "슬래시 명령 한 번이면 끝", 23, 600, MUTED)]

# ---------------- left panel: three mini browser windows in a loop ----------------
# (owner fix 2026-09-28: windows narrowed and the gap between them tightened so the row leaves
# clear room on the right for the mascot to stand beside it, instead of it floating alone below)
WIN_W, WIN_H = 175, 132
GAP3 = 40
win_y = LY + 150
xs = [LX + 60, LX + 60 + (WIN_W + GAP3), LX + 60 + 2 * (WIN_W + GAP3)]
labels = ["카테고리", "페이지 이동", "책 클릭"]

for i, (wx, lb) in enumerate(zip(xs, labels)):
    body = text(WIN_W / 2 - 10, WIN_H / 2 - 18, lb, 20, 800, INK)
    b += [window(wx, win_y, WIN_W, WIN_H, kind="browser", body=body)]

# forward arrows between the three windows
for i in range(2):
    x1 = xs[i] + WIN_W
    x2 = xs[i + 1]
    ym = win_y + WIN_H / 2
    b += [path(f"M{x1} {ym:.0f}C{x1 + 24} {ym:.0f} {x2 - 24} {ym:.0f} {x2} {ym:.0f}")]

# loop arrow: from the third window back to the first, underneath, labelled "매번 반복"
loop_y = win_y + WIN_H + 78
mid_x = (xs[0] + xs[2] + WIN_W) / 2
b += [path(
    f"M{xs[2] + WIN_W / 2:.0f} {win_y + WIN_H}C{xs[2] + WIN_W / 2:.0f} {loop_y:.0f} {xs[0] + WIN_W / 2:.0f} {loop_y:.0f} {xs[0] + WIN_W / 2:.0f} {win_y + WIN_H}",
    color=INK,
)]
b += [badge(mid_x, loop_y + 8, 1)]
# (owner fix 2026-09-28: label used to start right under the badge and clipped into it - pushed down)
b += [text(mid_x, loop_y + 66, "새 질문마다 처음부터", 22, 700, MUTED)]

# Claude mascot at a small desk beside the page row (owner fix 2026-09-28: used to float alone in
# the panel's bottom-right corner, disconnected from the scene - now sits right beside the third
# ("책 클릭") window, at the row's own height, so it reads as Claude doing the clicking)
DESK_W = 100
DESK_X = xs[2] + WIN_W + 20
DESK_Y = win_y + WIN_H - 70
MS2 = 0.32
b += [desk(DESK_X, DESK_Y, DESK_W, body_h=44)]
b += [mascot(DESK_X + DESK_W / 2 - 240 * MS2 / 2, DESK_Y - 143 * MS2 + 6, MS2)]
b += [icon_cursor(xs[2] + WIN_W - 12, win_y + WIN_H / 2 + 8, 24, INK)]

# ---------------- right panel: one slash command -> CLI -> answer, twice ----------------
TERM_X, TERM_Y, TERM_W, TERM_H = RX + 60, RY + 140, RW - 120, 108
# (owner fix 2026-09-28: the MONO stack (D2Coding/Consolas/Courier New) has no Hangul glyphs, so
# the Korean words in this line rendered as tofu boxes in a raster render; dropped MONO so the
# line falls back to the deck's default Pretendard stack, and spelled out the full readable
# command instead of an ellipsis-truncated fragment)
term_body = text(18, 30, "/book-search 픽션카테고리 3페이지 3번째 책", 18, 700, "#7fd7ff", anchor="start")
b += [window(TERM_X, TERM_Y, TERM_W, TERM_H, kind="terminal", title="terminal", body=term_body)]
b += [badge(TERM_X + TERM_W - 10, TERM_Y - 22, 2)]

# arrow down into a single CLI box
cli_x, cli_y, cli_w, cli_h = TERM_X + TERM_W / 2 - 110, TERM_Y + TERM_H + 56, 220, 84
b += [path(f"M{TERM_X + TERM_W / 2:.0f} {TERM_Y + TERM_H}C{TERM_X + TERM_W / 2:.0f} {TERM_Y + TERM_H + 30} {cli_x + cli_w / 2:.0f} {cli_y - 26} {cli_x + cli_w / 2:.0f} {cli_y}")]
b += [part_box(cli_x, cli_y, cli_w, cli_h, None, fill=INK2, stroke=INK2, corner=14)]
b += [text(cli_x + cli_w / 2, cli_y + cli_h / 2 - 4, "cli.mjs", 24, 800, "#fff", family=MONO)]
b += [text(cli_x + cli_w / 2, cli_y + cli_h / 2 + 26, "categories · list · detail", 15, 700, "#c9ccd1", family=MONO)]

# arrow to the answer (book + check)
ans_x, ans_y = cli_x + cli_w + 90, cli_y + cli_h / 2 - 62
b += [path(f"M{cli_x + cli_w} {cli_y + cli_h / 2:.0f}C{cli_x + cli_w + 50} {cli_y + cli_h / 2:.0f} {ans_x - 40} {ans_y + 60} {ans_x + 10} {ans_y + 60}", color=GREEN)]
b += [doc(ans_x, ans_y, 96, -3, GREEN)]
b += [check(ans_x + 84, ans_y + 16, 24)]
b += [text(ans_x + 48, ans_y + 150, "책 설명 완료", 22, 800, GREEN)]

# second call, smaller, right below - same skill, different question, no repeated click-through
loop2_y = cli_y + cli_h + 118
b += [connector(cli_x + cli_w / 2, cli_y + cli_h, cli_x + cli_w / 2, loop2_y - 30, head=False, color=LINE2)]
b += [text(RX + RW / 2, loop2_y, "다음 질문도 같은 스킬로 한 번에", 22, 700, MUTED)]

print(save("a2-booksearch-repeat.svg", b, "A2/book-search 반복 클릭 vs 스킬 한 번 (tools/illus/a2_booksearch_repeat.py)"))
