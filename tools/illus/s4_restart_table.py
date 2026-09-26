"""4/23 세션 유지한 채 재시작: a clean 3-row table (단계 · 누르는 키 · 무슨 일이 일어나나) on the left, each
step badged 1-3 to match the notes; the Claude mascot on the right, turned toward the table, explaining it
in a speech bubble. Owner feedback (2026-09-26): basic colours only, no warm tint, no arrows."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- table ----
TABLE_X, TABLE_Y = 100, 180
COL_W = [150, 440, 350]
TABLE_W = sum(COL_W)
HEADER_H = 80
ROW_H = 170
TABLE_H = HEADER_H + ROW_H * 3
col_x = [TABLE_X, TABLE_X + COL_W[0], TABLE_X + COL_W[0] + COL_W[1]]
col_cx = [x + w / 2 for x, w in zip(col_x, COL_W)]

# outer frame + header underline (clean table: hairlines, not fills)
b += [f'<rect x="{TABLE_X}" y="{TABLE_Y}" width="{TABLE_W}" height="{TABLE_H}" rx="18" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>']
for x in col_x[1:]:
    b += [f'<line x1="{x}" y1="{TABLE_Y}" x2="{x}" y2="{TABLE_Y + TABLE_H}" stroke="{LINE}" stroke-width="2"/>']
b += [f'<line x1="{TABLE_X}" y1="{TABLE_Y + HEADER_H}" x2="{TABLE_X + TABLE_W}" y2="{TABLE_Y + HEADER_H}" stroke="{INK}" stroke-width="2.5"/>']

headers = ["단계", "누르는 키", "무슨 일이 일어나나"]
for cx, h in zip(col_cx, headers):
    b += [text(cx, TABLE_Y + HEADER_H / 2 + 10, h, 26, 800, MUTED)]

for i in range(1, 3):
    ry = TABLE_Y + HEADER_H + ROW_H * i
    b += [f'<line x1="{TABLE_X}" y1="{ry}" x2="{TABLE_X + TABLE_W}" y2="{ry}" stroke="{LINE}" stroke-width="1.6"/>']


def keycap(cx, cy, label, size=28):
    w = max(66, len(label) * 22 + 44)
    h = 62
    x, y = cx - w / 2, cy - h / 2
    return (f'<rect x="{x}" y="{y + 6}" width="{w}" height="{h}" rx="12" fill="{LINE2}"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="#fff" stroke="{INK}" stroke-width="2.5"/>'
            f'{text(cx, cy + size * 0.34, label, size, 800, INK, family=MONO)}')


def key_row(cx, cy, tokens, gap=24):
    """tokens: list of ('key'|'text', label[, width]). Centres the whole row on cx.
    A 3rd element gives a fixed, generous width for a token instead of an estimate from
    len(label) - needed for Korean words, whose glyphs render noticeably wider in the
    browser (Pretendard) than cairosvg's estimate, which otherwise lets adjacent keycaps
    and words touch (owner feedback 2026-09-26). `gap` is the minimum clear space (px)
    between adjacent tokens and defaults to a generous 24."""
    widths = []
    for tok in tokens:
        kind, label = tok[0], tok[1]
        if len(tok) > 2:
            widths.append(tok[2])
        elif kind == "key":
            widths.append(max(66, len(label) * 22 + 44))
        else:
            widths.append(len(label) * 17 + 6)
    total = sum(widths) + gap * (len(tokens) - 1)
    x = cx - total / 2
    out = []
    for tok, w in zip(tokens, widths):
        kind, label = tok[0], tok[1]
        c = x + w / 2
        if kind == "key":
            out.append(keycap(c, cy, label))
        else:
            out.append(text(c, cy + 10, label, 28, 700, INK2))
        x += w + gap
    return "".join(out)


rows = [
    (1, [("key", "Ctrl"), ("text", "+"), ("key", "C"), ("text", "두 번", 80)], "Claude 종료"),
    (2, [("text", "방향키", 90), ("key", "↑")], "이전 명령어 불러오기"),
    (3, [("key", "-c"), ("text", "붙이고", 90), ("key", "Enter")], "같은 세션으로 재시작"),
]
for n, keys, result in rows:
    ry = TABLE_Y + HEADER_H + ROW_H * (n - 1) + ROW_H / 2
    b += [badge(col_cx[0], ry, n)]
    b += [key_row(col_cx[1], ry, keys)]
    b += [text(col_cx[2], ry + 10, result, 30, 800, INK)]

# ---- mascot, set right beside the table and facing it, explaining it in a speech bubble ----
MS = 1.55
MX, MY = 1260, 380
MASCOT_CX = MX + 240 * MS / 2
b += [bubble(1120, 150, 560, 118, "같은 대화로 다시 돌아와요", size=34, tail_x=MASCOT_CX)]
b += [mascot(MX, MY, MS)]

print(save("s4-restart-table.svg", b, "4/23 세션 유지한 채 재시작 (tools/illus/s4_restart_table.py)"))
