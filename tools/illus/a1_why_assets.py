"""A1/9 스킬 assets 에 템플릿 추가: two panels. Left - the word-filler skill folder tree (SKILL.md,
scripts/, assets/ with two existing templates), a new company estimate template being carried in by
the mascot. Right - the student typing a command and a finished document coming out."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, LY, LW, LH = 90, 150, 860, 640
RX, RY, RW, RH = 1000, 150, 702, 640
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 44, "word-filler 스킬 폴더", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 80, "assets 에 양식 추가", 24, 600, MUTED)]
b += [text(RX + RW / 2, RY + 44, "다음에 바로 재사용", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 80, "명령 한 번으로 완성", 24, 600, MUTED)]
content_top = LY + 140

# ---------- Left: a VS Code-like file tree, one branch highlighted ----------
tree_x, tree_y, tree_w, tree_h = LX + 60, content_top - 10, 500, 420
b += [f'<rect x="{tree_x}" y="{tree_y}" width="{tree_w}" height="{tree_h}" rx="12" fill="{INK2}"/>']
rows = [
    (0, "📁 word-filler", False, None),
    (1, "SKILL.md", False, None),
    (1, "📁 scripts/", False, None),
    (2, "fill.py", False, None),
    (1, "📁 assets/", True, None),
    (2, "보고서_템플릿.docx", False, None),
    (2, "공지사항_템플릿.docx", False, None),
    (2, "우리회사_견적서.docx", True, 2),
]
row_h = 44
for i, (depth, label, hl, badge_n) in enumerate(rows):
    ry = tree_y + 24 + i * row_h
    tx = tree_x + 28 + depth * 34
    fill = "#c9ccd1" if not hl else "#7fd7ff"
    if hl and depth == 2:
        b.append(f'<rect x="{tree_x+16}" y="{ry-26}" width="{tree_w-32}" height="36" rx="8" fill="{ACCENT}" opacity="0.22"/>')
    b.append(text(tx, ry, label, 20, 700 if not hl else 800, fill, anchor="start", family=MONO))
    if badge_n:
        b.append(badge(tree_x - 30, ry - 12, badge_n))

# the mascot carries the new template document toward the highlighted assets row
mx, my = LX + 710, content_top + 130
b += [mascot(mx, my, 0.5)]
doc_x, doc_y = mx + 6, my - 110
b += [doc(doc_x, doc_y, 76, -6, ACCENT)]
b += [text(doc_x + 38, doc_y - 16, "우리회사 견적서", 20, 800, INK)]
b += [badge(doc_x + 20, doc_y - 84, 1)]
row7_y = tree_y + 24 + 7 * row_h
# route left of the mascot (never over it) from the document down into the highlighted row
b += [path(f"M{doc_x-30} {doc_y+100}C{doc_x-130} {doc_y+140} {tree_x+tree_w+40} {row7_y-60} {tree_x+tree_w} {row7_y-10}", color=ACCENT)]

# ---------- Right: the student types a command, a finished document comes out ----------
term_x, term_y, term_w, term_h = RX + 60, content_top + 20, 580, 110
term_body = text(16, 34, "/word-filler 견적서 만들어줘", 22, 800, "#7fd7ff", anchor="start", family=MONO)
b += [window(term_x, term_y, term_w, term_h, kind="terminal", title="terminal", body=term_body)]

b += [connector(term_x + term_w / 2, term_y + term_h, term_x + term_w / 2, term_y + term_h + 60)]

res_x, res_y = term_x + term_w / 2 - 60, term_y + term_h + 90
b += [doc(res_x, res_y, 120, -3, GREEN)]
b += [check(res_x + 104, res_y + 20, 28)]
b += [text(res_x + 60, res_y + 190, "견적서_2026.docx", 24, 800, GREEN, family=MONO)]
b += [text(res_x + 60, res_y + 224, "새 양식으로 바로 완성", 20, 700, MUTED)]

print(save("a1-why-assets.svg", b, "A1/9 스킬 assets 에 템플릿 추가 (tools/illus/a1_why_assets.py)"))
