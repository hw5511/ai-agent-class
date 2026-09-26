"""A1 오피스/2 확장자와 전용 라이브러리: four columns, each a file thumbnail (.xlsx grid, .docx page,
.pptx slide, .pdf page) above a labelled tool box holding the library that opens it, with a one-word
use under the box. The mascot sits at a desk below, picking up the matching tool box."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []

COLS = [
    (".xlsx", "openpyxl", "엑셀 읽기·쓰기", "#107c41", "grid"),
    (".docx", "python-docx", "워드 읽기·쓰기", "#2b579a", "lines"),
    (".pptx", "python-pptx", "슬라이드 읽기·쓰기", "#c43e1c", "slide"),
    (".pdf", "pypdf", "PDF 읽기·쓰기", RED, "pdf"),
]
CX = [286, 716, 1146, 1576]
CARD_W, CARD_H, CARD_Y = 220, 210, 178
BAR_H = 44
TOOL_W, TOOL_H, TOOL_Y = 220, 96, CARD_Y + CARD_H + 56
USE_Y = TOOL_Y + TOOL_H + 40


def grid_content(cw, ch):
    out = []
    for i in range(1, 4):
        x = cw * i / 4
        out.append(f'<line x1="{x:.0f}" y1="0" x2="{x:.0f}" y2="{ch}" stroke="{PAPER_LINE}" stroke-width="2"/>')
    for j in range(1, 3):
        y = ch * j / 3
        out.append(f'<line x1="0" y1="{y:.0f}" x2="{cw}" y2="{y:.0f}" stroke="{PAPER_LINE}" stroke-width="2"/>')
    out.append(f'<rect x="0" y="0" width="{cw / 4:.0f}" height="{ch / 3:.0f}" fill="{ACCENT_TINT}"/>')
    return "".join(out)


def lines_content(cw, ch):
    out = [f'<rect x="0" y="0" width="{cw * 0.55:.0f}" height="16" rx="4" fill="{PAPER_LINE}"/>']
    y = 36
    while y < ch - 8:
        out.append(f'<rect x="0" y="{y}" width="{cw:.0f}" height="10" rx="5" fill="{PAPER_LINE}"/>')
        y += 28
    return "".join(out)


def slide_content(cw, ch):
    return (f'<rect x="0" y="0" width="{cw:.0f}" height="{ch * 0.56:.0f}" rx="6" fill="{ACCENT_TINT}"/>'
            f'<rect x="0" y="{ch * 0.68:.0f}" width="{cw * 0.7:.0f}" height="12" rx="6" fill="{PAPER_LINE}"/>'
            f'<rect x="0" y="{ch * 0.85:.0f}" width="{cw * 0.5:.0f}" height="12" rx="6" fill="{PAPER_LINE}"/>')


def pdf_content(cw, ch):
    out = [f'<rect x="0" y="0" width="{cw * 0.6:.0f}" height="14" rx="4" fill="{PAPER_LINE}"/>']
    y = 32
    while y < ch - 34:
        out.append(f'<rect x="0" y="{y}" width="{cw:.0f}" height="9" rx="4" fill="{PAPER_LINE}"/>')
        y += 24
    out.append(f'<rect x="0" y="{ch - 28:.0f}" width="76" height="28" rx="6" fill="{RED}"/>')
    out.append(text(38, ch - 8, "PDF", 15, 900, "#fff"))
    return "".join(out)


CONTENT_FN = {"grid": grid_content, "lines": lines_content, "slide": slide_content, "pdf": pdf_content}


def file_card(cx, y, w, h, ext, color, kind):
    x = cx - w / 2
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>']
    fc = 24
    out.append(f'<path d="M{x + w - fc} {y}l{fc} {fc}h{-fc}z" fill="{PAPER_LINE}"/>')
    r = 14
    out.append(f'<path d="M{x} {y + BAR_H}V{y + r}a{r} {r} 0 0 1 {r}-{r}h{w - 2 * r}a{r} {r} 0 0 1 {r} {r}V{y + BAR_H}z" fill="{color}"/>')
    out.append(text(cx, y + BAR_H / 2 + 8, ext, 24, 800, "#fff", family=MONO))
    pad = 20
    cw, ch = w - 2 * pad, h - BAR_H - 2 * pad
    out.append(f'<g transform="translate({x + pad} {y + BAR_H + pad})">{CONTENT_FN[kind](cw, ch)}</g>')
    return "\n".join(out)


def toolbox(cx, y, w, h, label, color):
    x = cx - w / 2
    hw = w * 0.34
    out = [f'<path d="M{cx - hw} {y + 20}q0 -34 {hw} -34q{hw} 0 {hw} 34" fill="none" stroke="{INK2}" stroke-width="9" stroke-linecap="round"/>']
    out.append(f'<rect x="{x}" y="{y + 12}" width="{w}" height="{h - 12}" rx="16" fill="#fff" stroke="{color}" stroke-width="4"/>')
    out.append(f'<circle cx="{cx}" cy="{y + 12}" r="10" fill="{color}"/>')
    out.append(text(cx, y + 12 + (h - 12) / 2 + 12, label, 25, 800, INK, family=MONO))
    return "\n".join(out)


b += [badge(96, CARD_Y + CARD_H / 2, 1)]
b += [badge(96, TOOL_Y + TOOL_H / 2, 2)]

for cx, (ext, lib, use, color, kind) in zip(CX, COLS):
    b.append(file_card(cx, CARD_Y, CARD_W, CARD_H, ext, color, kind))
    b.append(connector(cx, CARD_Y + CARD_H, cx, TOOL_Y, color=LINE2))
    b.append(toolbox(cx, TOOL_Y, TOOL_W, TOOL_H, lib, color))
    b.append(text(cx, USE_Y, use, 24, 600, MUTED))

# the mascot at a desk below, holding the matching tool box it just picked up
MS = 0.6
DESK_W, DESK_Y, BODY_H = 300, 636, 78
desk_x = 896 - DESK_W / 2
mascot_x = desk_x + (DESK_W - 240 * MS) / 2
b += [mascot(mascot_x, DESK_Y - 143 * MS, MS)]
b += [desk(desk_x, DESK_Y, DESK_W, "필요한 것만 사용", body_h=BODY_H, label_size=26)]

print(save("a1-office-02.svg", b, "A1 오피스/2 확장자와 전용 라이브러리 (tools/illus/a1_office_02.py)"))
