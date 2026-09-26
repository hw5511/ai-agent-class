"""A1/8 템플릿 워크플로 · 2단계: one main panel showing a real-looking JSON card flowing into a fill
script, producing the finished report. A small side panel echoes the basic course's "/cardnews" CLI
skill, the same two-step shape."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
PX, PY, PW, PH = 90, 150, 1204, 640
SX, SY, SW, SH = 1318, 150, 384, 640
b += [part_box(PX, PY, PW, PH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(SX, SY, SW, SH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(PX + PW / 2, PY + 44, "템플릿 워크플로 · 2단계", 32, 800, INK)]
b += [text(PX + PW / 2, PY + 80, "데이터 작성 → 스크립트 실행", 24, 600, MUTED)]
b += [text(SX + SW / 2, SY + 44, "카드뉴스 CLI", 28, 800, INK)]
b += [text(SX + SW / 2, SY + 76, "7회차와 같은 구조", 20, 600, MUTED)]
content_top = PY + 150

# step 1: a real-looking JSON card
json_lines = [
    ('{ "title": "8월 매출보고서",', "#7fd7ff"),
    ('  "rows": [', "#e6e8eb"),
    ('    { "부서": "영업1팀", "매출": 42000000 },', "#e6e8eb"),
    ('    { "부서": "영업2팀", "매출": 35500000 }', "#e6e8eb"),
    ('  ] }', "#e6e8eb"),
]
jw, jh = 470, 190
jx, jy = PX + 70, content_top + 45
jbody = "".join(text(16, 24 + i * 26, ln, 16, 700, col, anchor="start", family=MONO) for i, (ln, col) in enumerate(json_lines))
b += [window(jx, jy, jw, jh, kind="terminal", title="data.json", body=jbody)]
b += [badge(jx + jw - 8, jy - 8, 1)]

# arrow into the script box
sbx, sby, sbw, sbh = jx + jw + 90, jy + jh / 2 - 60, 220, 120
b += [path(f"M{jx+jw} {jy+jh/2:.0f}C{jx+jw+40} {jy+jh/2:.0f} {sbx-40} {sby+sbh/2:.0f} {sbx} {sby+sbh/2:.0f}")]
b += [part_box(sbx, sby, sbw, sbh, None, fill=INK2, stroke=INK2, corner=14)]
b += [text(sbx + sbw / 2, sby + sbh / 2 - 6, "fill.py", 24, 800, "#fff", family=MONO)]
b += [text(sbx + sbw / 2, sby + sbh / 2 + 28, "data.json 채움", 18, 700, "#c9ccd1")]
b += [badge(sbx + sbw - 8, sby - 8, 2)]

# terminal invocation below the whole flow
term_x, term_y, term_w, term_h = jx, jy + jh + 60, 400, 110
term_body = text(14, 34, "$ python fill.py data.json", 18, 700, "#e6e8eb", anchor="start", family=MONO)
b += [connector(jx + 60, jy + jh, jx + 60, term_y, head=False)]
b += [window(term_x, term_y, term_w, term_h, kind="terminal", body=term_body)]

# result: finished report document
rx, ry = sbx + sbw + 90, sby + sbh / 2 - 60
b += [path(f"M{sbx+sbw} {sby+sbh/2:.0f}C{sbx+sbw+50} {sby+sbh/2:.0f} {rx-40} {ry+40} {rx+10} {ry+40}", color=GREEN)]
b += [doc(rx, ry, 110, -3, GREEN)]
b += [check(rx + 96, ry + 18, 26)]
b += [text(rx + 55, ry + 160, "완성된 보고서", 24, 800, GREEN)]

# ---------- side panel: /cardnews CLI, same two-step shape ----------
cterm_x, cterm_y, cterm_w, cterm_h = SX + 40, content_top + 20, SW - 80, 90
cbody = text(14, 30, "/cardnews", 20, 800, "#7fd7ff", anchor="start", family=MONO)
b += [window(cterm_x, cterm_y, cterm_w, cterm_h, kind="terminal", title="terminal", body=cbody)]
b += [connector(cterm_x + cterm_w / 2, cterm_y + cterm_h, cterm_x + cterm_w / 2, cterm_y + cterm_h + 60)]

card_y = cterm_y + cterm_h + 70
cw, ch = 62, 84
xs = [cterm_x + cterm_w / 2 - cw - 6, cterm_x + cterm_w / 2 + 6]
for i, cx in enumerate(xs):
    cy = card_y - i * 6
    b.append(f'<rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="8" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>')
    b.append(f'<rect x="{cx+8}" y="{cy+12}" width="{cw-16}" height="20" rx="4" fill="{ACCENT_TINT}"/>')
    b.append(f'<rect x="{cx+8}" y="{cy+40}" width="{cw-16}" height="6" rx="3" fill="{PAPER_LINE}"/>')
    b.append(f'<rect x="{cx+8}" y="{cy+52}" width="{cw-28}" height="6" rx="3" fill="{PAPER_LINE}"/>')
b += [text(SX + SW / 2, card_y + ch + 46, "카드 이미지 완성", 20, 800, INK)]
tip_y = SY + SH - 46
b += [badge(SX + 40, tip_y, "!")]
b += [text(SX + 40 + 42, tip_y + 8, "같은 2단계 구조", 20, 700, MUTED, anchor="start")]

print(save("a1-why-two-steps.svg", b, "A1/8 템플릿 워크플로 · 2단계 (tools/illus/a1_why_two_steps.py)"))
