"""6/15 노션이란?: a document page (with the real Notion logo), a database table with status tags,
and two mascots editing the same page together with cursors."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def notion_logo(x, y, size=56):
    """Inline copy of web/public/logos/notion.svg's path data, scaled to `size`."""
    s = size / 64
    return (f'<g transform="translate({x} {y}) scale({s})">'
            f'<rect x="3" y="3" width="58" height="58" rx="13" fill="#ffffff" stroke="{INK}" stroke-width="3"/>'
            f'<path d="M18 16 L40 16 L46 22 L46 48 L24 48 L18 42 Z" fill="#ffffff" stroke="{INK}" stroke-width="2.4"/>'
            f'<text x="32" y="42" text-anchor="middle" font-family="Arial, \'Segoe UI\', sans-serif" font-size="26" font-weight="900" fill="{INK}">N</text>'
            f'</g>')


def cursor(x, y, color, name):
    return (f'<g transform="translate({x} {y})">'
            f'<path d="M0 0L0 22L5.5 17.2L9 24.8L13 22.8L9.5 15.4L17 15.4Z" fill="{color}"/>'
            f'<rect x="12" y="22" width="{18 + len(name) * 13}" height="26" rx="8" fill="{color}"/>'
            f'{text(12 + 9 + len(name) * 6.5, 40, name, 20, 800, "#fff")}</g>')


b = [panel()]

# ---- (a) a Notion document page ----
DOC_X, DOC_Y, DOC_W, DOC_H = 90, 90, 760, 470
doc_body = (notion_logo(0, 0, 44) + text(56, 32, "Notion", 30, 900, INK, anchor="start") +
            text(0, 96, "여행 계획", 40, 900, INK, anchor="start") +
            f'<rect x="0" y="126" width="22" height="22" rx="5" fill="{GREEN}"/>' +
            f'<path d="M4 138l6 6 10-12" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' +
            text(36, 144, "항공권 예약", 28, 700, MUTED, anchor="start") +
            f'<line x1="36" y1="135" x2="230" y2="135" stroke="{MUTED}" stroke-width="2.4"/>' +
            f'<rect x="0" y="178" width="22" height="22" rx="5" fill="#fff" stroke="{LINE2}" stroke-width="2.4"/>' +
            text(36, 196, "숙소 예약", 28, 700, INK, anchor="start") +
            f'<rect x="0" y="230" width="22" height="22" rx="5" fill="#fff" stroke="{LINE2}" stroke-width="2.4"/>' +
            text(36, 248, "캐리어 싸기", 28, 700, INK, anchor="start") +
            f'<line x1="0" y1="292" x2="{DOC_W - 96}" y2="292" stroke="{LINE}" stroke-width="2"/>' +
            text(0, 330, "메모", 26, 800, MUTED, anchor="start") +
            f'<rect x="0" y="346" width="{DOC_W - 96}" height="14" rx="6" fill="{PAPER_LINE}"/>' +
            f'<rect x="0" y="370" width="{(DOC_W - 96) * 0.7}" height="14" rx="6" fill="{PAPER_LINE}"/>')
b += [window(DOC_X, DOC_Y, DOC_W, DOC_H, "app", "여행 계획", doc_body)]
b += [text(DOC_X + 40, DOC_Y - 16, "문서", 30, 900, ACCENT_DARK, anchor="start"), badge(DOC_X + 4, DOC_Y - 4, 1)]

# ---- (b) a database table with status tags ----
DB_X, DB_Y, DB_W, DB_H = 940, 90, 760, 470
cols = ["항목", "상태", "담당", "날짜"]
col_w = [210, 190, 150, 114]
rows = [("숙소 예약", "완료", GREEN, "나", "9/20"), ("캐리어 싸기", "진행중", ACCENT, "동료", "9/24"),
        ("여행자보험", "예정", MUTED, "나", "9/25")]
db_body = []
cx = 0
for cname, w in zip(cols, col_w):
    db_body.append(text(cx + 14, 26, cname, 24, 800, MUTED, anchor="start"))
    cx += w
db_body.append(f'<line x1="0" y1="42" x2="{sum(col_w)}" y2="42" stroke="{LINE}" stroke-width="2"/>')
ry = 42
for name, status, color, who, date in rows:
    ry += 66
    db_body.append(f'<line x1="0" y1="{ry - 42}" x2="{sum(col_w)}" y2="{ry - 42}" stroke="{PAPER_LINE}" stroke-width="1.6"/>')
    db_body.append(text(14, ry - 14, name, 24, 700, INK, anchor="start"))
    pw = 30 + len(status) * 18
    db_body.append(f'<rect x="{col_w[0] + 14}" y="{ry - 34}" width="{pw}" height="36" rx="18" fill="{color}"/>')
    db_body.append(text(col_w[0] + 14 + pw / 2, ry - 10, status, 22, 800, "#fff"))
    db_body.append(text(col_w[0] + col_w[1] + 14, ry - 14, who, 24, 700, INK2, anchor="start"))
    db_body.append(text(col_w[0] + col_w[1] + col_w[2] + 14, ry - 14, date, 24, 700, MUTED, anchor="start"))
b += [window(DB_X, DB_Y, DB_W, DB_H, "app", "일정 관리", "\n".join(db_body))]
b += [text(DB_X + 40, DB_Y - 16, "데이터베이스", 30, 900, ACCENT_DARK, anchor="start"), badge(DB_X + 4, DB_Y - 4, 2)]

# ---- (c) two mascots right under the page, each with a small cursor pointing at the line it edits ----
M1X, M1Y = 150, 590
M2X, M2Y = 380, 590
b += [mascot(M1X, M1Y, 0.86), mascot(M2X, M2Y, 0.86, opacity=0.55)]
b += [cursor(DOC_X + 30, 500, ACCENT, "나")]
b += [cursor(DOC_X + 260, 526, MASCOT, "동료")]
b += [badge(365, 650, 3)]
b += [text(660, 690, "같이 편집하는 협업툴", 34, 900, INK, anchor="start")]

print(save("s6-notion-what.svg", b, "6/15 노션이란? (tools/illus/s6_notion_what.py)"))
