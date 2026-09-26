"""7/7 반복 작업 절약: before, the mascot re-explains the same prompt every day (arrow from its own mouth to
the repeated bubbles); after, one /cardnews command in a terminal produces the finished card stack right away."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 800, 660, WARM_ZONE), zone(930, 90, 802, 660, ACCENT_ZONE)]
b += [text(460, 150, "이전: 매번 반복", 32, 800, MUTED)]
b += [text(1330, 150, "이제: 명령어 한 번", 32, 800, MUTED)]

# left: mascot at desk, three identical repeated prompt bubbles stacked (same request, every time)
b += [mascot(150, 338), desk(90, 480, 440, "내 컴퓨터")]
for i, dx in enumerate([420, 555, 690]):
    b.append(bubble(dx, 205 + i * 8, 150, 84, "카드뉴스", size=26, tail_x=dx + 40))
b += [badge(790, 170, 1)]
# starts just outside the mascot's right shoulder/mouth edge, arcs clear of the mascot, ends at the bubble edge
b += [path("M320 326C320 270 350 250 408 248")]

# right: mascot types /cardnews once in a terminal; the card stack appears on Claude's desk right away
desk_x, desk_w = 1270, 430
b += [mascot(1330, 338), desk(desk_x, 480, desk_w, "Claude")]
term_body = text(0, 40, "/cardnews", 26, 800, "#7fd7ff", anchor="start", family=MONO)
b += [window(990, 230, 300, 130, kind="terminal", title="terminal", body=term_body)]
b += [badge(1300, 260, 2)]
b += [path("M1290 300C1420 268 1560 280 1600 415", color=GREEN)]
for i, cx in enumerate([1584, 1618, 1652]):
    b.append(f'<rect x="{cx}" y="{456 - i * 8}" width="36" height="50" rx="7" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>')
    b.append(f'<rect x="{cx + 6}" y="{468 - i * 8}" width="24" height="18" rx="4" fill="{ACCENT_TINT}"/>')
b += [check(1670, 424, 20)]

print(save("s7-skill-before-after.svg", b, "7/7 반복 작업 절약 · 프롬프트 반복 vs 명령어 한 번 (tools/illus/s7_skill_before_after.py)"))
