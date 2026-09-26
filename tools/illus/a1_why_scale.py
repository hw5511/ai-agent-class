"""A1/6 확장성 · 늘어나도 같은 스크립트: one panel. Three rows of PDFs (200 → +100 → +1000), each
with its own mini terminal typing the exact same command "python extract.py", all feeding the same
script file in the centre, all coming out the other side checked off. A note says the code itself
was never touched."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
PX, PY, PW, PH = 90, 150, 1612, 640
b += [part_box(PX, PY, PW, PH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(PX + PW / 2, PY + 50, "같은 스크립트, 입력만 늘어남", 32, 800, INK)]
b += [text(PX + PW / 2, PY + 88, "명령어도 코드도 그대로", 24, 600, MUTED)]

content_top = PY + 140

box_w, box_h = 260, 340
box_x, box_y = PX + PW / 2 - box_w / 2, content_top + 130
b += [part_box(box_x, box_y, box_w, box_h, None, fill=INK2, stroke=INK2, corner=16)]
b += [text(box_x + box_w / 2, box_y + 74, "extract.py", 26, 800, "#fff", family=MONO)]
b += [f'<line x1="{box_x+40}" y1="{box_y+100}" x2="{box_x+box_w-40}" y2="{box_y+100}" stroke="#3a3d42" stroke-width="2"/>']
b += [text(box_x + box_w / 2, box_y + 150, "코드 수정", 24, 700, "#c9ccd1")]
b += [text(box_x + box_w / 2, box_y + 190, "0번", 40, 900, "#fff")]

rows = [
    (200, "기존 200개", content_top + 10, 1),
    (100, "+100개 추가", content_top + 180, 2),
    (1000, "+1000개 추가", content_top + 350, None),
]
term_w, term_h = 300, 98
in_x = PX + 70
for count, label, y, badge_n in rows:
    b += [doc(in_x, y - 8, 56, -4, ACCENT), doc(in_x + 30, y + 4, 56, 3, ACCENT_DARK)]
    b += [text(in_x + 100, y + 20, label, 26, 800, INK, anchor="start")]
    term_x, term_y = in_x + 100, y + 40
    term_body = text(16, 34, "$ python extract.py", 18, 700, "#e6e8eb", anchor="start", family=MONO)
    b += [window(term_x, term_y, term_w, term_h, kind="terminal", body=term_body)]
    mid_y = term_y + term_h / 2
    b += [path(f"M{term_x+term_w} {mid_y:.0f}C{term_x+term_w+120} {mid_y:.0f} {box_x-140} {box_y+box_h/2:.0f} {box_x} {box_y+box_h/2:.0f}")]
    if badge_n:
        b.append(badge(in_x - 8, y - 30, badge_n))

out_mid_y = box_y + box_h / 2
out_x1, out_x2 = box_x + box_w, PX + PW - 220
b += [path(f"M{out_x1} {out_mid_y:.0f}C{out_x1+150} {out_mid_y:.0f} {out_x2-150} {out_mid_y:.0f} {out_x2} {out_mid_y:.0f}", color=GREEN)]
b += [check(out_x2 + 60, out_mid_y, 34)]
b += [text(out_x2 + 60, out_mid_y + 66, "그대로 처리", 26, 800, GREEN)]
b += [mascot(out_x2 + 20, out_mid_y - 130, 0.5)]

print(save("a1-why-scale.svg", b, "A1/6 확장성 · 늘어나도 같은 스크립트 (tools/illus/a1_why_scale.py)"))
