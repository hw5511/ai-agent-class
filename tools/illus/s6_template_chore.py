"""6/31 템플릿 많음 · 채우기는 귀찮음: drawn as a single Notion-style page (easter egg on the app's own
look, not its logo) - a template gallery view (badge 1), a database table with empty rows (badge 2)
and rows the Claude mascot fills in (badge 3)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

# Notion-style tokens (local to this illustration only; illuskit's own palette is untouched)
N_INK = "#37352f"
N_GREY = "#787774"
N_DIV = "#e9e9e7"
N_COVER = "#f1f1ef"


def sidebar_icon(x, y, size=26, color=N_GREY):
    """A collapsed-sidebar glyph: a rounded rectangle with a vertical divider near its left edge."""
    w, h = size, size * 0.8
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="none" stroke="{color}" stroke-width="2"/>'
            f'<line x1="{x + w * 0.34}" y1="{y}" x2="{x + w * 0.34}" y2="{y + h}" stroke="{color}" stroke-width="2"/>')


def dots_menu(x, y, color=N_GREY, r=3.4, gap=11):
    return "".join(f'<circle cx="{x + i * gap}" cy="{y}" r="{r}" fill="{color}"/>' for i in range(3))


def plus_icon(cx, cy, size=16, color=N_GREY):
    h = size / 2
    return (f'<line x1="{cx - h}" y1="{cy}" x2="{cx + h}" y2="{cy}" stroke="{color}" stroke-width="2.4" stroke-linecap="round"/>'
            f'<line x1="{cx}" y1="{cy - h}" x2="{cx}" y2="{cy + h}" stroke="{color}" stroke-width="2.4" stroke-linecap="round"/>')


b = [panel()]

# ---- the page frame ----
# height hugs the content (see the bottom-padding check right before save()) instead of leaving a
# near-empty lower quarter; the page sits with a bit more air above it than below, in the deck's
# usual "content lower, free space split toward the top" spirit (web/CONTENT_RULES.md's 3:1 note).
PX, PY, PW, PH = 64, 56, 1664, 698
b += [f'<rect x="{PX}" y="{PY}" width="{PW}" height="{PH}" rx="18" fill="#fff" stroke="{N_DIV}" stroke-width="2"/>']

CX0, CX1 = 100, 1692  # content margins inside the page

# ---- header: sidebar toggle, page icon + title, "..." menu (easter eggs) ----
b += [sidebar_icon(CX0, 88)]
b += [mascot(148, 82, 0.16)]
b += [text(202, 112, "여행 계획", 34, 800, N_INK, anchor="start")]
b += [dots_menu(1670, 100)]
b += [f'<line x1="{CX0}" y1="150" x2="{CX1}" y2="150" stroke="{N_DIV}" stroke-width="2"/>']
b += [text(CX0, 184, "'/' 를 입력해 명령어 사용", 24, 500, N_GREY, anchor="start")]

# ---- headings: "템플릿 갤러리" (badge 1) and the table's own "여행 DB", same baseline ----
# badge 1 sits >= 30px below the "/" hint line (was crowding it), so both headings drop to match.
HEAD_Y = 256
b += [text(CX0, HEAD_Y, "템플릿 갤러리", 26, 800, N_INK, anchor="start")]
b += [badge(288, HEAD_Y - 14, 1)]

templates = ["여행 일정", "가계부", "회의록", "다이어트", "독서 기록", "운동 계획"]
GX0, GY0, CW, CH, GAP = 100, HEAD_Y + 28, 195, 170, 20
for i, label in enumerate(templates):
    cx, cy = GX0 + (i % 3) * (CW + GAP), GY0 + (i // 3) * (CH + GAP)
    b += [f'<rect x="{cx}" y="{cy}" width="{CW}" height="{CH}" rx="8" fill="#fff" stroke="{N_DIV}" stroke-width="1.6"/>',
          f'<rect x="{cx}" y="{cy}" width="{CW}" height="100" rx="8" fill="{N_COVER}"/>',
          f'<rect x="{cx}" y="{cy + 84}" width="{CW}" height="16" fill="{N_COVER}"/>',
          text(cx + 18, cy + 134, label, 22, 700, N_INK, anchor="start")]

# ---- right: a database table view (badge 2 on empty rows, badge 3 on filled rows) ----
# the table gets its own small grey heading, on the gallery heading's baseline, and starts far
# enough right of the gallery (>= 100px gap) that the two views read as clearly separate.
TX0, TY0, TW = 830, HEAD_Y + 28, 650
b += [text(TX0, HEAD_Y, "여행 DB", 26, 800, N_GREY, anchor="start")]
COLS = [("목적지", 300), ("예산", 175), ("날짜", 175)]
colx = [TX0]
for _, w in COLS:
    colx.append(colx[-1] + w)
TX1 = colx[-1]
# rows are a bit taller than before (80 vs 66) so badge 2 clears every row edge by >= 12px once it
# moves fully inside the table.
HEAD_H, ROW_H = 40, 80
ROW_MID = 48  # baseline offset within a row, keeping the old 40/66 vertical centring ratio
rows_y = [TY0 + HEAD_H + i * ROW_H for i in range(5)]  # 4 row tops + bottom edge

# header row
for (label, _), x0 in zip(COLS, colx[:-1]):
    b += [text(x0 + 16, TY0 + 27, label, 22, 800, N_GREY, anchor="start")]
b += [f'<line x1="{TX0}" y1="{TY0 + HEAD_H}" x2="{TX1}" y2="{TY0 + HEAD_H}" stroke="{N_DIV}" stroke-width="1.6"/>']

# grid lines: verticals across header + 4 rows, horizontals between rows
grid_bottom = rows_y[4]
for x in colx:
    b += [f'<line x1="{x}" y1="{TY0}" x2="{x}" y2="{grid_bottom}" stroke="{N_DIV}" stroke-width="1.2"/>']
for y in rows_y[1:4]:
    b += [f'<line x1="{TX0}" y1="{y}" x2="{TX1}" y2="{y}" stroke="{N_DIV}" stroke-width="1.2"/>']
b += [f'<line x1="{TX0}" y1="{TY0}" x2="{TX0}" y2="{TY0}" stroke="none"/>']  # no-op keeps list shape simple

# empty rows: badge 2 now sits inside the table, at the right end of the first empty row (clear of
# the header row, the grid lines and the "비어 있음" text by >= 12px on every side)
for r in (0, 1):
    ry = rows_y[r]
    b += [text(colx[0] + 16, ry + ROW_MID, "비어 있음", 22, 500, "#bdbdb8", anchor="start")]
b += [badge(TX1 - 45, rows_y[0] + ROW_H / 2, 2)]

# filled rows: Claude has written real values in (badge 3, over by the mascot)
filled = [("바르셀로나", "150만원", "10/12"), ("도쿄", "80만원", "11/03")]
for i, vals in enumerate(filled):
    ry = rows_y[2 + i]
    b += [f'<rect x="{TX0}" y="{ry}" width="4" height="{ROW_H}" fill="{ACCENT}"/>']
    for (val, x0) in zip(vals, colx[:-1]):
        b += [text(x0 + 16, ry + ROW_MID, val, 22, 700, N_INK, anchor="start")]

# "+ 새 페이지" row (easter egg)
NEWROW_Y = grid_bottom + 44
b += [plus_icon(TX0 + 10, NEWROW_Y - 6, 14)]
b += [text(TX0 + 30, NEWROW_Y, "새 페이지", 22, 500, N_GREY, anchor="start")]

# the mascot, in its own orange, fully inside the page beside the filled rows (>= 30px clear of the
# table and of the page's right edge) - badge 3 sits above its head instead of on its eye.
FILLED_MID = (rows_y[2] + grid_bottom) / 2
MS = 0.72
MW, MHT = 240 * MS, 143 * MS
MX, MY = TX1 + 35, FILLED_MID - MHT / 2
b += [mascot(MX, MY, MS)]
b += [badge(MX + MW / 2, MY - 45, 3)]

print(save("s6-template-chore.svg", b, "6/31 템플릿 많음 · 채우기는 귀찮음 (tools/illus/s6_template_chore.py)"))
