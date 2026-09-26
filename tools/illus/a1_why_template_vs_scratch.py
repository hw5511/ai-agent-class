"""A1/7 처음부터 생성 vs 템플릿: two panels. Left - the mascot surrounded by open questions (폰트,
색상, 글자 크기, 여백, 목차) and a messy draft with a red "다시" stamp. Right - a fixed company
template with highlighted empty slots, and the mascot only fills values from a small JSON card."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, LY, LW, LH = 90, 150, 780, 640
RX, RY, RW, RH = 922, 150, 780, 640
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 44, "처음부터 생성", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 80, "매번 새로 정해야 함", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 44, "템플릿 사용", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 80, "값만 채우면 됨", 24, 600, MUTED)]
content_top = LY + 130

# ---------- Left: mascot surrounded by decisions, a messy draft with a red "다시" stamp ----------
mx, my = LX + 60, content_top + 210
MS = 0.62
b += [mascot(mx, my, MS)]
decisions = [("폰트?", LX + 60, content_top - 6), ("색상?", LX + 300, content_top - 26),
             ("여백?", LX + 500, content_top + 30), ("글자 크기?", LX + 20, content_top + 100),
             ("목차?", LX + 480, content_top + 190)]
for label, x, y in decisions:
    w = max(96, len(label) * 20 + 40)
    b += [bubble(x, y, w, 62, label, 22, "#fff", LINE2, MUTED, tail_x=x + w * 0.6)]
b += [badge(LX + 60, content_top - 30, 1)]

# messy draft document with a red "다시" stamp, sitting to the right of the mascot
draft_x, draft_y, draft_w, draft_h = LX + 470, content_top + 330, 200, 180
b += [f'<rect x="{draft_x}" y="{draft_y}" width="{draft_w}" height="{draft_h}" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)" transform="rotate(-4 {draft_x+draft_w/2} {draft_y+draft_h/2})"/>']
messy_lines = [(0.32, 120, "left"), (0.5, 150, "left"), (0.5, 90, "left"), (0.68, 160, "left"), (0.86, 70, "left")]
for i, (fy, w, _) in enumerate(messy_lines):
    ly = draft_y + draft_h * fy
    lx = draft_x + 18 + (14 if i % 2 else 0)
    b.append(f'<rect x="{lx}" y="{ly}" width="{w}" height="8" rx="4" fill="{PAPER_LINE}" transform="rotate(-4 {draft_x+draft_w/2} {draft_y+draft_h/2})"/>')
b += [f'<g transform="rotate(10 {draft_x+draft_w*0.7} {draft_y+draft_h*0.35})">'
      f'<rect x="{draft_x+draft_w*0.42}" y="{draft_y+draft_h*0.18}" width="86" height="46" rx="8" fill="none" stroke="{RED}" stroke-width="4"/>'
      f'{text(draft_x+draft_w*0.42+43, draft_y+draft_h*0.18+32, "다시", 26, 900, RED)}</g>']
b += [text(draft_x + draft_w / 2, draft_y + draft_h + 40, "매번 다른 결과물", 22, 700, MUTED)]

# ---------- Right: fixed template with highlighted slots, mascot fills from a small JSON card ----------
tpl_x, tpl_y, tpl_w, tpl_h = RX + 60, content_top - 10, 300, 420
b += [f'<rect x="{tpl_x}" y="{tpl_y}" width="{tpl_w}" height="{tpl_h}" rx="16" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#sh)"/>']
b += [f'<rect x="{tpl_x}" y="{tpl_y}" width="{tpl_w}" height="46" rx="16" fill="{PANEL}"/>']
b += [text(tpl_x + tpl_w / 2, tpl_y + 30, "회사 보고서 템플릿", 20, 800, INK)]
slots = [("제목", 76), ("표", 156), ("본문", 260), ("날짜", 364)]
for label, dy in slots:
    h = 46 if label != "표" else 80
    b += [f'<rect x="{tpl_x+22}" y="{tpl_y+dy}" width="{tpl_w-44}" height="{h}" rx="8" fill="{ACCENT_TINT}" stroke="{ACCENT}" stroke-width="2.5" stroke-dasharray="7 6"/>']
    b += [text(tpl_x + 40, tpl_y + dy + h / 2 + 8, "{" + label + "}", 22, 800, ACCENT_DARK, anchor="start", family=MONO)]
b += [badge(tpl_x + tpl_w - 6, tpl_y - 6, 2)]

# a small JSON card feeding the values, the mascot filling from it
card_x, card_y, card_w, card_h = RX + 430, content_top + 30, 300, 150
card_body = "".join([
    text(16, 28, '{ "title": "8월 보고서",', 16, 700, "#7fd7ff", anchor="start", family=MONO),
    text(16, 52, '  "date": "2026-08-31" }', 16, 700, "#e6e8eb", anchor="start", family=MONO),
])
b += [window(card_x, card_y, card_w, card_h, kind="terminal", title="data.json", body=card_body)]
b += [path(f"M{card_x+10} {card_y+card_h}C{card_x-30} {card_y+card_h+30} {tpl_x+tpl_w+30} {tpl_y+120} {tpl_x+tpl_w} {tpl_y+130}")]

mfx, mfy = RX + 470, content_top + 230
b += [mascot(mfx, mfy, 0.62)]
b += [icon_pencil(mfx + 150, mfy + 60, 44, ACCENT, -150)]

# tip: office document skills (docx/pptx/xlsx) fill blanks the same way
tip_x, tip_y = RX + 60, RY + RH - 60
b += [badge(tip_x, tip_y, "!")]
b += [text(tip_x + 48, tip_y + 8, "오피스 문서 스킬도 같은 원리로 빈 자리를 채움", 22, 700, MUTED, anchor="start")]

print(save("a1-why-template-vs-scratch.svg", b, "A1/7 처음부터 생성 vs 템플릿 (tools/illus/a1_why_template_vs_scratch.py)"))
