"""A1 오피스/3 Claude 공식 문서 스킬 4종: four .claude/skills/<name> folders, each holding a SKILL.md
sheet and a scripts/ folder, with three mini actions (읽기 · 편집 · 생성) on a tiny document underneath.
Source credited at the top right (github.com/anthropics/skills)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

NAMES = ["docx", "xlsx", "pptx", "pdf"]
CX = [286, 716, 1146, 1576]
PATH_Y = 176
FOLDER_Y = 196
FOLDER_W = 156
CHIP_Y = FOLDER_Y + FOLDER_W * 0.775 + 54
CHIP_H = 46
ACT_Y = CHIP_Y + CHIP_H + 10 + CHIP_H + 40  # below the scripts/ row, with a clear 40px gap


def mini_doc_action(cx, y, kind, label):
    """A small paper with a fold, an icon of the action baked onto it, and a caption under it."""
    w, h = 66, 82
    x = cx - w / 2
    out = [f'<path d="M{x + 8} {y}h{w - 26}l18 18v{h - 18}a6 6 0 0 1-6 6h{-(w - 12)}a6 6 0 0 1-6-6V{y + 6}a6 6 0 0 1 6-6z" '
           f'fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>']
    ic_cx, ic_cy = cx, y + h / 2 + 4
    if kind == "read":
        out.append(f'<circle cx="{ic_cx - 3}" cy="{ic_cy - 3}" r="9" fill="none" stroke="{ACCENT}" stroke-width="4"/>')
        out.append(f'<line x1="{ic_cx + 3}" y1="{ic_cy + 3}" x2="{ic_cx + 11}" y2="{ic_cy + 11}" stroke="{ACCENT}" stroke-width="4" stroke-linecap="round"/>')
    elif kind == "edit":
        out.append(icon_pencil(ic_cx, ic_cy, 30, ACCENT, -40))
    else:
        out.append(f'<path d="M{ic_cx} {ic_cy - 13}l3.6 8.6 8.9 1.6-6.6 6.3 1.6 9-7.5-4.5-7.5 4.5 1.6-9-6.6-6.3 8.9-1.6z" fill="{ACCENT}"/>')
    out.append(text(cx, y + h + 26, label, 20, 700, MUTED))
    return "\n".join(out)


b += [gh_mark(786, 762, 26)]
b += [text(826, 780, "github.com/anthropics/skills", 20, 600, MUTED, anchor="start", family=MONO)]
b += [mascot(36, ACT_Y - 14, 0.55)]

for cx, name in zip(CX, NAMES):
    b += [text(cx, PATH_Y, ".claude/skills/", 19, 600, MUTED, family=MONO)]
    fx = cx - FOLDER_W / 2
    b.append(folder(fx, FOLDER_Y, FOLDER_W, name, mono=True))

    chip_w, chip_h, gap = 158, 46, 14
    c1x = cx - chip_w / 2
    b.append(f'<rect x="{c1x}" y="{CHIP_Y}" width="{chip_w}" height="{chip_h}" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>')
    b.append(doc(c1x + 10, CHIP_Y + 6, 26, shadow=False))
    b.append(text(c1x + 46, CHIP_Y + chip_h / 2 + 7, "SKILL.md", 19, 700, INK, anchor="start", family=MONO))
    y2 = CHIP_Y + chip_h + 10
    b.append(f'<rect x="{c1x}" y="{y2}" width="{chip_w}" height="{chip_h}" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>')
    b.append(folder(c1x + 6, y2 + 4, 40, None, mono=True))
    b.append(text(c1x + 54, y2 + chip_h / 2 + 7, "scripts/", 19, 700, INK, anchor="start", family=MONO))

    acts = [("read", "읽기"), ("edit", "편집"), ("create", "생성")]
    aw = 96
    ax0 = cx - aw
    for i, (kind, label) in enumerate(acts):
        b.append(mini_doc_action(ax0 + i * aw, ACT_Y, kind, label))

badge_targets = {"docx": 1, "xlsx": 2, "pptx": 3, "pdf": 4}
for cx, name in zip(CX, NAMES):
    b.append(badge(cx - FOLDER_W / 2 - 34, FOLDER_Y + FOLDER_W * 0.775 / 2, badge_targets[name]))

print(save("a1-office-03.svg", b, "A1 오피스/3 Claude 공식 문서 스킬 4종 (tools/illus/a1_office_03.py)"))
