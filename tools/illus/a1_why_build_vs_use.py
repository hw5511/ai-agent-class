"""A1/1 스킬 만들기 vs 스킬로 작업하기: two hairline panels. Left - Claude at a desk writes a script
(mini terminal with real code lines), and the finished SKILL.md + template land inside a labelled
skill folder (.claude/skills/excel-filler, with SKILL.md / scripts/ / assets/ rows). Right - the
student types a slash command in a mini terminal, Claude at its desk uses that same folder, and a
finished spreadsheet document comes out. Badges 1, 2 (also reused by a1-notice-01)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

LX, LY, LW, LH = 76, 170, 800, 610
RX, RY, RW, RH = 916, 170, 800, 610
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]

b += [text(LX + LW / 2, LY + 42, "스킬 만들기", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 78, "코드를 작성해 스킬 폴더를 완성", 23, 600, MUTED)]
b += [text(RX + RW / 2, RY + 42, "스킬로 작업하기", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 78, "완성된 스킬로 결과물을 생성", 23, 600, MUTED)]

CONTENT_TOP = LY + 108  # 278

# ---------------- left panel: Claude at desk -> mini editor -> folder card (left to right) ----------------
MS = 0.5

# -- column 1: Claude at a desk, fully inside the panel --
DESK_W = 170
DESK_X = LX + 15
DESK_Y = 560
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=60)]
b += [mascot(DESK_X + DESK_W / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS)]
mascot_cy = DESK_Y - 143 * MS / 2

# -- column 2: a mini editor with the script (wide enough that the title never touches the traffic lights) --
ED_X, ED_W, ED_H = DESK_X + DESK_W + 30, 340, 150
ED_Y = mascot_cy - ED_H / 2
code_body = "".join([
    text(18, 32, "def fill_excel(data):", 18, 700, ACCENT_MID, anchor="start", family=MONO),
    text(18, 58, "    ws.append(row)", 18, 700, "#e7e9ec", anchor="start", family=MONO),
    text(18, 84, "    wb.save(out)", 18, 700, "#e7e9ec", anchor="start", family=MONO),
])
b += [window(ED_X, ED_Y, ED_W, ED_H, kind="terminal", title="excel_filler.py", body=code_body)]
b += [badge(ED_X + ED_W - 40, ED_Y - 22, 1)]
b += [path(f"M{DESK_X + DESK_W} {mascot_cy:.0f}C{DESK_X + DESK_W + 30} {mascot_cy:.0f} {ED_X - 30} {mascot_cy:.0f} {ED_X} {mascot_cy:.0f}")]

# -- column 3: a folder card with SKILL.md / scripts/ / assets/ drawn inside it --
FC_X, FC_Y, FC_W, FC_H = ED_X + ED_W + 30, 424, 200, 286
b += [text(FC_X + FC_W / 2, FC_Y - 16, "완성된 스킬 폴더", 17, 700, MUTED)]
b += [part_box(FC_X, FC_Y, FC_W, FC_H, None, fill="#fff", stroke=LINE2, corner=16)]
fw = 84
fx = FC_X + (FC_W - fw) / 2
fy = FC_Y + 22
b += [folder(fx, fy, fw)]
icon_bottom = fy + fw * 0.775
b += [text(FC_X + FC_W / 2, icon_bottom + 26, ".claude/skills/", 14, 800, INK, family=MONO)]
b += [text(FC_X + FC_W / 2, icon_bottom + 45, "excel-filler", 14, 800, INK, family=MONO)]

rows = [("SKILL.md", ACCENT), ("scripts/", MUTED), ("assets/", MUTED)]
row_x, row_w, row_h, row_gap = FC_X + 20, FC_W - 40, 30, 10
rows_top = icon_bottom + 63
for i, (label, color) in enumerate(rows):
    ry = rows_top + i * (row_h + row_gap)
    b += [part_box(row_x, ry, row_w, row_h, None, fill="#fff", stroke=LINE2, corner=8)]
    b += [text(row_x + 14, ry + row_h / 2 + 5, label, 15, 800, color, anchor="start", family=MONO)]

b += [path(f"M{ED_X + ED_W} {mascot_cy:.0f}C{ED_X + ED_W + 30} {mascot_cy:.0f} {FC_X - 30} {mascot_cy:.0f} {FC_X} {mascot_cy:.0f}")]

# ---------------- right panel: terminal command -> Claude at desk + folder -> finished sheet ----------------
# -- column 1: the terminal with the slash command, fully visible and wide enough not to touch the traffic lights --
TERM_X, TERM_Y, TERM_W, TERM_H = RX + 90, RY + 120, RW - 180, 112
rterm_body = text(22, 34, "/excel-filler 지난달 매출보고서 만들어줘", 22, 700, "#7fd7ff", anchor="start", family=MONO)
b += [window(TERM_X, TERM_Y, TERM_W, TERM_H, kind="terminal", title="terminal", body=rterm_body)]
b += [badge(TERM_X + TERM_W - 10, TERM_Y - 22, 2)]

# -- column 2: Claude at desk (same scale as the left panel), the skill folder beside it --
DESK_W2 = 150
DESK_X2 = RX + 70
DESK_Y2 = 596
b += [desk(DESK_X2, DESK_Y2, DESK_W2, "Claude", body_h=60)]
b += [mascot(DESK_X2 + DESK_W2 / 2 - 240 * MS / 2, DESK_Y2 - 143 * MS, MS)]
mascot_cy2 = DESK_Y2 - 143 * MS / 2

fx2, fw2 = DESK_X2 + DESK_W2 + 32, 64
fy2 = DESK_Y2 - 143 * MS + 8
b += [folder(fx2, fy2, fw2, "스킬 사용")]
folder_icon_cy2 = fy2 + fw2 * 0.775 / 2

# arrow: the command lands on Claude, clear of the command text (starts outside the terminal box)
mx2 = DESK_X2 + DESK_W2 / 2
b += [path(f"M{mx2:.0f} {TERM_Y + TERM_H + 6}C{mx2:.0f} {TERM_Y + TERM_H + 40} {mx2:.0f} {DESK_Y2 - 143 * MS - 50:.0f} {mx2:.0f} {DESK_Y2 - 143 * MS - 12:.0f}")]

# -- column 3: the finished spreadsheet, with a few real-looking values --
SHEET_X, SHEET_W, SHEET_H = fx2 + fw2 + 70, 300, 190
SHEET_Y = mascot_cy2 - SHEET_H / 2
b += [path(f"M{fx2 + fw2 + 10} {folder_icon_cy2:.0f}C{SHEET_X - 60} {folder_icon_cy2:.0f} {SHEET_X - 30} {SHEET_Y + SHEET_H / 2:.0f} {SHEET_X} {SHEET_Y + SHEET_H / 2:.0f}", color=GREEN)]
b += [f'<rect x="{SHEET_X}" y="{SHEET_Y}" width="{SHEET_W}" height="{SHEET_H}" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#sh)"/>']
b += [text(SHEET_X, SHEET_Y - 18, "매출보고서.xlsx", 16, 800, INK, anchor="start", family=MONO)]
b += [check(SHEET_X + 150, SHEET_Y - 18, 14, fill=ACCENT)]
sheet_row_h = SHEET_H / 5
col2s = SHEET_X + SHEET_W * 0.42
for i in range(1, 5):
    yy = SHEET_Y + i * sheet_row_h
    b.append(f'<line x1="{SHEET_X}" y1="{yy:.0f}" x2="{SHEET_X + SHEET_W}" y2="{yy:.0f}" stroke="{PAPER_LINE}" stroke-width="2"/>')
b += [f'<line x1="{col2s:.0f}" y1="{SHEET_Y}" x2="{col2s:.0f}" y2="{SHEET_Y + SHEET_H}" stroke="{PAPER_LINE}" stroke-width="2"/>']
sheet_rows = [("부서", "금액"), ("영업1팀", "42,000,000"), ("영업2팀", "31,500,000")]
col1s_cx = SHEET_X + SHEET_W * 0.21
col2s_cx = col2s + (SHEET_X + SHEET_W - col2s) / 2
for i, (a, c) in enumerate(sheet_rows):
    ry = SHEET_Y + i * sheet_row_h + sheet_row_h / 2 + 6
    weight = 800 if i == 0 else 700
    color = INK if i == 0 else INK2
    b += [text(col1s_cx, ry, a, 14, weight, color), text(col2s_cx, ry, c, 14, weight, color)]

print(save("a1-why-build-vs-use.svg", b, "A1/1 스킬 만들기 vs 스킬로 작업하기 (tools/illus/a1_why_build_vs_use.py)"))
