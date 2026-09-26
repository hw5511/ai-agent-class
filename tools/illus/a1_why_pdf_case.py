"""A1/4 사례 · PDF 200장을 엑셀로: a tall stack of PDF papers labelled 200장 on the left, the mascot
reading one page at a time with a magnifying glass and copying values by hand into an Excel sheet on
the right. The physical, tiring one-by-one method is the whole point of this frame."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 1672, 660, WARM_ZONE)]

# left: the PDF pile
for i, (dx, dy, r) in enumerate([(0, 30, -6), (10, 18, -2), (20, 6, 2), (30, -6, 6)]):
    b.append(doc(190 + dx, 420 + dy, 110, r, RED))
b += [text(300, 620, "PDF 200장", 30, 900, INK)]
b += [badge(150, 400, 1)]

# middle: mascot holding the page it is reading (in its hands, below the face) with a magnifying
# glass held clear of the mascot's outline entirely — nothing sits on the face
b += [mascot(700, 460)]
b += [doc(830, 545, 70, -4, ACCENT)]
b += [icon_search(985, 555, 22, INK, 6)]
b += [text(800, 640, "하나씩 열어 확인", 26, 800, MUTED)]
b += [badge(1000, 430, 2)]

b += [path("M470 500C560 500 620 480 680 470")]
b += [path("M960 500C1080 500 1160 520 1230 540")]

# right: Excel sheet receiving the values by hand — a few cells already filled, one in progress
# under the pencil tip, so the pencil reads as actively writing instead of floating
sheet_x, sheet_y, sheet_w, sheet_h = 1260, 380, 400, 260
b += [f'<rect x="{sheet_x}" y="{sheet_y}" width="{sheet_w}" height="{sheet_h}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#sh)"/>']
for i in range(1, 5):
    yy = sheet_y + i * 52
    b.append(f'<line x1="{sheet_x}" y1="{yy}" x2="{sheet_x + sheet_w}" y2="{yy}" stroke="{PAPER_LINE}" stroke-width="2"/>')
col2_x = sheet_x + sheet_w * 0.4
b += [f'<line x1="{col2_x}" y1="{sheet_y}" x2="{col2_x}" y2="{sheet_y + sheet_h}" stroke="{PAPER_LINE}" stroke-width="2"/>']
b += [text(sheet_x + sheet_w / 2, sheet_y - 20, "엑셀", 26, 800, INK)]
# filled cells: row 0 (both columns) and row 1 col 1 are done; row 1 col 2 is mid-write
b += [f'<rect x="{sheet_x + 20}" y="{sheet_y + 21}" width="110" height="10" rx="5" fill="{ACCENT}"/>']
b += [f'<rect x="{col2_x + 20}" y="{sheet_y + 21}" width="150" height="10" rx="5" fill="{ACCENT}"/>']
b += [f'<rect x="{sheet_x + 20}" y="{sheet_y + 73}" width="110" height="10" rx="5" fill="{ACCENT}"/>']
b += [f'<rect x="{col2_x + 20}" y="{sheet_y + 73}" width="60" height="10" rx="5" fill="{ACCENT_TINT}"/>']
b += [icon_pencil(col2_x + 92, sheet_y + 60, 46, ACCENT, -25)]

print(save("a1-why-pdf-case.svg", b, "A1/4 사례 · PDF 200장을 엑셀로 (tools/illus/a1_why_pdf_case.py)"))
