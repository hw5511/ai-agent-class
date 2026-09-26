"""7/13 복사기와 사용설명서: the copier sits ON the desk, the mascot stands behind the desk operating
it (never floating, never unrelated to the machine) - paper drops in at the top, a clean short arrow
carries the copy out the side, badge 3 sits right next to the copy. The manual panel stays on the right."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(1120, 90, 590, 660, ACCENT_ZONE)]

# ---- the manual, filling the right zone ----
MAN_X, MAN_Y, MAN_W, MAN_H = 1180, 140, 470, 540
b += [f'<rect x="{MAN_X}" y="{MAN_Y}" width="{MAN_W}" height="{MAN_H}" rx="16" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#sh)"/>']
b += [text(MAN_X + MAN_W / 2, MAN_Y + 70, "사용설명서", 38, 900, ACCENT_DARK)]
steps = ["종이를 넣는다", "버튼을 누른다", "복사본을 꺼낸다"]
for i, s in enumerate(steps):
    yy = MAN_Y + 190 + i * 120
    b += [f'<circle cx="{MAN_X + 70}" cy="{yy - 10}" r="28" fill="{ACCENT_TINT}"/>',
          text(MAN_X + 70, yy, str(i + 1), 30, 900, ACCENT_DARK),
          text(MAN_X + 118, yy, s, 30, 700, INK2, anchor="start")]
b += [badge(MAN_X + MAN_W - 34, MAN_Y + 34, 2)]

# ---- title, above the desk ----
DESK_X, DESK_Y, DESK_W = 60, 606, 980
b += [text(DESK_X + 70, 90, "남이 만든 기능", 40, 900, INK, anchor="start"), badge(DESK_X + 24, 90, 1)]

# ---- the mascot stands BEHIND the desk (drawn first), the copier sits ON the desk beside it ----
MS = 1.15
CX, CY, CW, CH = 470, DESK_Y - 350, 380, 350
b += [mascot(CX - 250, DESK_Y - 143 * MS, MS)]
b += [desk(DESK_X, DESK_Y, DESK_W, "복사 담당", body_h=150, label_size=32)]

# ---- the photocopier body: a box with a top slot, a big round button, a side output slot ----
b += [part_box(CX, CY, CW, CH, None, fill=DESK, stroke=LINE2, corner=24)]
b += [f'<rect x="{CX + 34}" y="{CY + 28}" width="{CW - 68}" height="66" rx="12" fill="{INK2}"/>',
      text(CX + CW / 2, CY + 70, "여기 넣기", 28, 800, "#fff")]
b += [f'<circle cx="{CX + 70}" cy="{CY + CH - 68}" r="40" fill="{GREEN}"/>',
      text(CX + 70, CY + CH - 56, "시작", 26, 900, "#fff")]
b += [f'<rect x="{CX + 24}" y="{CY + CH - 26}" width="180" height="16" rx="8" fill="{INK}"/>']
# a slot on the right side of the body, where the copy comes out
b += [f'<rect x="{CX + CW - 14}" y="{CY + CH / 2 - 36}" width="18" height="72" rx="7" fill="{INK}"/>']

# ---- an input page dropping straight into the top slot (short, real shaft) ----
b += [doc(CX + CW / 2 - 36, CY - 128, 72, -6), path(f"M{CX + CW / 2} {CY - 34}C{CX + CW / 2} {CY - 20} {CX + CW / 2} {CY - 8} {CX + CW / 2} {CY + 8}")]

# ---- the output copy sliding straight out the side slot, badge 3 right next to it ----
OUT_X, OUT_Y = CX + CW + 90, CY + CH / 2 - 44
b += [path(f"M{CX + CW + 4} {CY + CH / 2}C{CX + CW + 40} {CY + CH / 2} {OUT_X - 40} {OUT_Y + 44} {OUT_X} {OUT_Y + 44}", width=6),
      doc(OUT_X, OUT_Y, 70, 3, accent=GREEN), text(OUT_X + 35, OUT_Y + 118, "바로 씀", 30, 800, GREEN), badge(OUT_X + 118, OUT_Y + 40, 3)]

print(save("s7-photocopier.svg", b, "7/13 복사기와 사용설명서 (tools/illus/s7_photocopier.py)"))
