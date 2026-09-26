"""6/31 템플릿 많음 · 채우기는 귀찮음: a shelf of many template cards, a tired mascot facing empty forms,
then Claude filling the forms with a green check."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def sweat_drop(x, y, s=1.0):
    return (f'<path transform="translate({x} {y}) scale({s})" d="M0 0C7 10 12 17 12 23a12 12 0 1 1-24 0C-12 17-7 10 0 0Z" '
            f'fill="{ACCENT_MID}"/>')


def blank_form(x, y, w=180, h=232):
    s = w / 180
    out = [f'<g transform="translate({x} {y}) scale({s})" filter="url(#shs)">',
           f'<rect x="0" y="0" width="180" height="232" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.4"/>',
           f'<rect x="18" y="22" width="90" height="14" rx="4" fill="{INK2}"/>']
    for ly in (64, 100, 136, 172):
        out.append(f'<rect x="18" y="{ly}" width="144" height="4" fill="{PAPER_LINE}"/>')
        out.append(f'<rect x="18" y="{ly + 12}" width="144" height="20" rx="4" fill="none" stroke="{LINE}" stroke-width="2" stroke-dasharray="4 6"/>')
    out.append("</g>")
    return "\n".join(out)


def filled_form(x, y, w=180, h=232):
    s = w / 180
    out = [f'<g transform="translate({x} {y}) scale({s})" filter="url(#shs)">',
           f'<rect x="0" y="0" width="180" height="232" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.4"/>',
           f'<rect x="18" y="22" width="90" height="14" rx="4" fill="{INK2}"/>']
    for ly in (64, 100, 136, 172):
        out.append(f'<rect x="18" y="{ly}" width="144" height="4" fill="{PAPER_LINE}"/>')
        out.append(f'<rect x="18" y="{ly + 12}" width="144" height="20" rx="4" fill="{GREEN}" opacity="0.16"/>')
        out.append(f'<rect x="18" y="{ly + 12}" width="144" height="20" rx="4" fill="none" stroke="{GREEN}" stroke-width="2.6"/>')
    out.append("</g>")
    return "\n".join(out)


b = [panel()]

# ---- (a) a shelf of many templates ----
b += [zone(66, 90, 430, 620, ACCENT_ZONE)]
b += [text(281, 148, "템플릿 갤러리", 32, 900, ACCENT_DARK, anchor="middle")]
templates = [("여행 일정", ACCENT), ("가계부", GREEN), ("회의록", MASCOT), ("다이어트", ACCENT_MID),
             ("독서 기록", RED), ("운동 계획", ACCENT_DARK)]
TW, TH, GAP = 172, 148, 20
gx0, gy0 = 96, 178
for i, (label, color) in enumerate(templates):
    cx, cy = gx0 + (i % 2) * (TW + GAP), gy0 + (i // 2) * (TH + GAP)
    b += [f'<rect x="{cx}" y="{cy}" width="{TW}" height="{TH}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>',
          f'<rect x="{cx}" y="{cy}" width="{TW}" height="34" rx="14" fill="{color}"/>',
          f'<rect x="{cx}" y="{cy + 18}" width="{TW}" height="16" fill="{color}"/>',
          f'<rect x="{cx + 16}" y="{cy + 66}" width="{TW - 32}" height="8" rx="4" fill="{PAPER_LINE}"/>',
          f'<rect x="{cx + 16}" y="{cy + 88}" width="{(TW - 32) * 0.6}" height="8" rx="4" fill="{PAPER_LINE}"/>',
          text(cx + TW / 2, cy + TH - 20, label, 22, 800, INK)]
b += [badge(474, 122, 1)]

# ---- (b) a tired mascot facing a stack of empty forms, grounded on a small desk ----
DESK1_X, DESK1_Y, DESK1_W = 560, 700, 320
MX, MY = 600, DESK1_Y - 143 * 1.1
b += [desk(DESK1_X, DESK1_Y, DESK1_W, body_h=90)]
b += [mascot(MX, MY, 1.1), sweat_drop(MX + 208, MY - 26, 1.25)]
b += [text(MX + 118, MY - 56, "휴우...", 30, 800, MUTED, anchor="middle")]
FX, FY = 850, 360
b += [blank_form(FX, FY), blank_form(FX + 26, FY - 20), blank_form(FX + 52, FY - 40)]
b += [text(FX + 96, FY - 78, "채우기 귀찮음", 30, 900, INK, anchor="middle"), badge(FX + 210, FY - 64, 2)]

# ---- (c) Claude fills the forms at its own desk, fully visible beside the filled form ----
b += [path(f"M{FX + 210} {FY + 60}C{FX + 340} {FY + 110} {FX + 420} {FY + 100} {FX + 460} {FY + 80}", color=GREEN, arrow=False),
      arrow_head_at(FX + 420, FY + 100, FX + 460, FY + 80, 20, GREEN)]

DESK2_X, DESK2_Y, DESK2_W = 1140, 650, 560
b += [desk(DESK2_X, DESK2_Y, DESK2_W, "Claude", body_h=116)]
CX2, CY2 = 1180, DESK2_Y - 143
b += [mascot(CX2, CY2, 1.0)]
FORM3_X, FORM3_Y = 1470, 460
b += [filled_form(FORM3_X, FORM3_Y)]
b += [check(FORM3_X + 195, FORM3_Y + 5, 28)]
b += [text(FORM3_X + 160, FORM3_Y - 50, "AI 가 대신 채움", 30, 900, GREEN, anchor="end"), badge(FORM3_X + 196, FORM3_Y - 60, 3)]

print(save("s6-template-chore.svg", b, "6/31 템플릿 많음 · 채우기는 귀찮음 (tools/illus/s6_template_chore.py)"))
