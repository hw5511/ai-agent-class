"""A1 엑셀/9 만드는 과정 vs 쓰는 과정: left panel walks the three one-time steps (템플릿 분석 -> 샘플·
스크립트 제작 -> /skill-creator) into a saved excel-filler skill folder; right panel shows the short
/excel-filler call turning into a finished spreadsheet, mascot at its desk. Mirrors
s7-skill-before-after.svg's two-panel language."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

LX, LY, LW, LH = 110, 200, 792, 560
RX, RY, RW, RH = 962, 200, 720, 560
b += [f'<rect x="{LX}" y="{LY}" width="{LW}" height="{LH}" rx="20" fill="#fff" stroke="#e5e5e5" stroke-width="2.5"/>']
b += [f'<rect x="{RX}" y="{RY}" width="{RW}" height="{RH}" rx="20" fill="#fff" stroke="#e5e5e5" stroke-width="2.5"/>']
b += [text(LX + LW / 2, LY + 46, "만드는 과정 · 한 번만", 32, 800, INK)]
b += [text(LX + LW / 2, LY + 82, "템플릿 분석부터 스킬화까지", 23, 600, MUTED)]
b += [text(RX + RW / 2, RY + 46, "쓰는 과정 · 매번", 32, 800, INK)]
b += [text(RX + RW / 2, RY + 82, "스킬 이름만 부르면 완성", 23, 600, MUTED)]


def term_pill(cx, y, w, h, txt):
    """A single-line terminal pill: dark rounded bar, three dots, mono prompt text."""
    x = cx - w / 2
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="#1e1f22"/>']
    out.append(f'<circle cx="{x + 24}" cy="{y + h / 2}" r="6" fill="#ff5f57"/>'
               f'<circle cx="{x + 44}" cy="{y + h / 2}" r="6" fill="#febc2e"/>'
               f'<circle cx="{x + 64}" cy="{y + h / 2}" r="6" fill="#28c840"/>')
    out.append(text(x + 90, y + h / 2 + 7, txt, 20, 700, "#7fd7ff", anchor="start", family=MONO))
    return "".join(out)


# ---- left: three make-steps, each a slim terminal pill with a short real prompt, connected down ----
steps = [
    ("@매출데이터_템플릿.xlsx 분석", "템플릿 분석"),
    ("샘플 json + 스크립트 생성", "샘플·스크립트 제작"),
    ("/skill-creator → excel-filler", "스킬로 저장"),
]
chip_left, chip_w, chip_h, gap = 150, 460, 60, 30
chip_cx = chip_left + chip_w / 2
top = LY + 120
ys = [top + i * (chip_h + gap) for i in range(3)]
for cy, (prompt, label) in zip(ys, steps):
    b.append(term_pill(chip_cx, cy, chip_w, chip_h, prompt))
    b.append(text(chip_left + chip_w + 26, cy + chip_h / 2 + 8, label, 22, 700, ACCENT_DARK, anchor="start"))
for cy in ys[:-1]:
    b.append(connector(chip_cx, cy + chip_h, chip_cx, cy + chip_h + gap))
b += [badge(chip_left - 34, ys[0] + chip_h / 2, 1)]

# folder the three steps end in: excel-filler skill saved to .claude/skills/
fold_y = ys[-1] + chip_h + 40
b += [connector(chip_cx, ys[-1] + chip_h, chip_cx, fold_y)]
b += [folder(chip_cx - 65, fold_y, 130, "excel-filler")]
b += [text(chip_cx + 110, fold_y + 52, ".claude/skills/ 에 저장", 20, 600, MUTED, anchor="start")]

# ---- right: /clear then one skill call, then the finished report - sheet sits left-of-centre so
# the mascot's own "Claude" desk (on the right) never overlaps it ----
term_w, term_h = 420, 150
term_cx = RX + 220
term_x, term_y = term_cx - term_w / 2, RY + 106
b += [window(term_x, term_y, term_w, term_h, kind="terminal",
             body=(text(20, 34, "/clear", 20, 700, "#c9ccd1", anchor="start", family=MONO)
                   + text(20, 78, "/excel-filler 30개 매출보고서", 20, 800, "#7fd7ff", anchor="start", family=MONO)))]
b += [badge(term_x + term_w + 26, term_y + term_h / 2, 2)]

conn_top = term_y + term_h
sheet_y = conn_top + 70
b += [connector(term_cx, conn_top, term_cx, sheet_y - 6)]

sheet_w, sheet_h = 260, 148
sheet_x = term_cx - sheet_w / 2
b += [f'<rect x="{sheet_x}" y="{sheet_y}" width="{sheet_w}" height="{sheet_h}" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>']
for i in range(1, 4):
    yy = sheet_y + i * sheet_h / 4
    b.append(f'<line x1="{sheet_x}" y1="{yy:.0f}" x2="{sheet_x + sheet_w}" y2="{yy:.0f}" stroke="{PAPER_LINE}" stroke-width="2"/>')
col_x = sheet_x + sheet_w * 0.42
b.append(f'<line x1="{col_x:.0f}" y1="{sheet_y}" x2="{col_x:.0f}" y2="{sheet_y + sheet_h}" stroke="{PAPER_LINE}" stroke-width="2"/>')
b.append(f'<rect x="{sheet_x}" y="{sheet_y}" width="{sheet_w}" height="{sheet_h / 4:.0f}" fill="{ACCENT_TINT}"/>')
b += [check(sheet_x + sheet_w - 4, sheet_y - 4, 18, fill=ACCENT)]
b += [text(term_cx, sheet_y + sheet_h + 32, "매출보고서 완성", 22, 800, INK)]

MS = 0.55
DESK_W = 250
DESK_X = RX + RW - DESK_W - 44
DESK_Y = sheet_y + sheet_h / 2
b += [mascot(DESK_X + DESK_W / 2 - 240 * MS / 2, DESK_Y - 143 * MS, MS)]
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=130)]

print(save("a1-excel-09.svg", b, "A1 엑셀/9 만드는 과정 vs 쓰는 과정 (tools/illus/a1_excel_09.py)"))
