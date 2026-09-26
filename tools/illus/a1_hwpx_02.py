"""A1 hwpx/2 설치 · 변환 업그레이드 · 겹침 해결: three panels - 1) the gonggong_hwpxskills repo becomes
a .claude/skills/hwpx folder, 2) a .hwp file converts to .hwpx through hwp2hwpx (needs Java),
3) a crushed one-line page is fixed into a properly wrapped page by repeating a
생성 -> 이미지 확인 -> 수정 loop."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

MARGIN, GAP = 88, 28
PW = (1792 - 2 * MARGIN - 2 * GAP) / 3
PX = [MARGIN + i * (PW + GAP) for i in range(3)]
PY, PH = 190, 560

titles = [
    ("스킬 설치", "hwpx 이름으로 설치", 1),
    ("hwp → hwpx 변환", "hwp2hwpx 참고 업그레이드", 2),
    ("겹침 해결 반복", "생성 · 확인 · 수정 반복", 3),
]
for x, (title, sub, n) in zip(PX, titles):
    b += [f'<rect x="{x}" y="{PY}" width="{PW}" height="{PH}" rx="20" fill="#fff" stroke="#e5e5e5" stroke-width="2.5"/>']
    b += [badge(x + 40, PY + 44, n)]
    b += [text(x + 76, PY + 52, title, 28, 800, INK, anchor="start")]
    b += [text(x + 76, PY + 82, sub, 20, 600, MUTED, anchor="start")]

content_top = PY + 120

# ---- panel 1: 설치 - the repo becomes a folder inside .claude/skills ----
p1cx = PX[0] + PW / 2
b += [gh_mark(p1cx - 26, content_top + 6, 52)]
b += [text(p1cx, content_top + 92, "gonggong_hwpxskills", 21, 700, INK, family=MONO)]
b += [connector(p1cx, content_top + 116, p1cx, content_top + 176)]
b += [text(p1cx, content_top + 210, ".claude/skills/", 18, 600, MUTED, family=MONO)]
b += [folder(p1cx - 65, content_top + 224, 130, "hwpx")]

# ---- panel 2: 변환 - a .hwp file arrows into a .hwpx file, needs Java ----
p2cx = PX[1] + PW / 2


def mini_page(cx, y, label, color):
    w, h = 108, 132
    x = cx - w / 2
    fc = 20
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>']
    out.append(f'<path d="M{x + w - fc} {y}l{fc} {fc}h{-fc}z" fill="{PAPER_LINE}"/>')
    yy = y + 26
    while yy < y + h - 14:
        out.append(f'<rect x="{x + 14}" y="{yy}" width="{w - 28}" height="8" rx="4" fill="{PAPER_LINE}"/>')
        yy += 20
    out.append(text(cx, y + h + 32, label, 22, 800, INK, family=MONO))
    return "".join(out)


hwp_cx = PX[1] + PW * 0.27
hwpx_cx = PX[1] + PW * 0.76
py2 = content_top + 20
b.append(mini_page(hwp_cx, py2, ".hwp", MUTED))
b.append(mini_page(hwpx_cx, py2, ".hwpx", ACCENT))
mid_y = py2 + 66
b += [path(f"M{hwp_cx + 60} {mid_y}C{(hwp_cx + hwpx_cx) / 2} {mid_y} {(hwp_cx + hwpx_cx) / 2} {mid_y} {hwpx_cx - 60} {mid_y}")]
b += [text((hwp_cx + hwpx_cx) / 2, mid_y - 26, "hwp2hwpx", 19, 800, ACCENT_DARK, family=MONO)]
b += [text((hwp_cx + hwpx_cx) / 2, mid_y + 44, "Java 필요", 18, 700, MUTED)]

# ---- panel 3: 겹침 해결 - a crushed page fixed into a wrapped page, with a small retry loop ----
p3cx = PX[2] + PW / 2
before_cx = PX[2] + PW * 0.28
after_cx = PX[2] + PW * 0.74
p3y = content_top + 10


def crushed_page(cx, y):
    w, h = 116, 132
    x = cx - w / 2
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="#fff" stroke="{RED}" stroke-width="3"/>']
    band_y = y + h / 2 - 16
    for i, dy in enumerate((0, 7, 14)):
        out.append(f'<rect x="{x + 12}" y="{band_y + dy}" width="{w - 24}" height="11" rx="5" fill="{RED}" opacity="0.55"/>')
    out.append(text(cx, y + h + 30, "한 줄에 겹침", 19, 700, RED))
    return "".join(out)


def fixed_page(cx, y):
    w, h = 116, 132
    x = cx - w / 2
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="#fff" stroke="{GREEN}" stroke-width="3"/>']
    yy = y + 22
    while yy < y + h - 14:
        out.append(f'<rect x="{x + 12}" y="{yy}" width="{w - 24}" height="9" rx="4" fill="{GREEN}" opacity="0.55"/>')
        yy += 22
    out.append(check(x + w - 6, y - 4, 16, fill=GREEN))
    out.append(text(cx, y + h + 30, "정상 줄바꿈", 19, 700, GREEN))
    return "".join(out)


b.append(crushed_page(before_cx, p3y))
b.append(fixed_page(after_cx, p3y))
mid3_y = p3y + 66
b += [path(f"M{before_cx + 62} {mid3_y}C{(before_cx + after_cx) / 2} {mid3_y} {(before_cx + after_cx) / 2} {mid3_y} {after_cx - 62} {mid3_y}")]

loop_y = p3y + 200
loop_d = (f"M{after_cx - 40} {loop_y}C{p3cx} {loop_y + 46} {p3cx} {loop_y + 46} {before_cx + 40} {loop_y}")
b += [path(loop_d, color=INK, width=4)]
b += [text(p3cx, loop_y + 78, "이미지로 확인 → 수정 반복", 19, 700, MUTED)]

print(save("a1-hwpx-02.svg", b, "A1 hwpx/2 설치 · 변환 업그레이드 · 겹침 해결 (tools/illus/a1_hwpx_02.py)"))
