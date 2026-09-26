"""2/59 Write와 Edit 차이: left, Write tosses the whole page and starts a new one; right, Edit reads the
page, finds one line, and patches only that line - the three badged steps of the Edit process on the right."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 760, 660, WARM_ZONE), zone(940, 90, 792, 660, ACCENT_ZONE)]
b += [text(440, 150, "Write", 40, 900, MASCOT), text(1336, 150, "Edit", 40, 900, ACCENT)]

# --- left: Write - the old page is tossed, a whole new page is written ---
DESK_L_X, DESK_L_Y, DESK_L_W = 150, 545, 500
ms = 1.15
mw = 240 * ms
b += [mascot(DESK_L_X + DESK_L_W / 2 - mw / 2, DESK_L_Y - 143 * ms, ms), desk(DESK_L_X, DESK_L_Y, DESK_L_W, "tetris.py", body_h=170)]
# the old page, tossed away toward the corner
b += [f'<g opacity="0.55">{doc(240, 250, 76, -24)}</g>', cross(292, 268, 22),
      path("M280 300C330 340 370 360 400 380", INK, dotted=True, arrow=False), arrow_head_at(370, 360, 402, 384, 16, INK)]
# the fresh new page, larger, on the desk
b += [doc(500, 300, 96, 4, accent=MASCOT),
      text(616, 336, "새 파일 전체", 30, 800, MUTED, anchor="start"),
      text(616, 372, "작성", 30, 800, MUTED, anchor="start")]

# --- right: Edit - three badged steps on the left of the zone, the mascot's desk on the right ---
BOX_X, BOX_W = 1000, 120
LABEL_X = BOX_X + BOX_W + 40
STEP1_Y = 220
b += [doc(BOX_X, STEP1_Y, 96, -3), text(LABEL_X, STEP1_Y + 60, "파일 읽기", 34, 900, ACCENT, anchor="start"),
      badge(BOX_X - 20, STEP1_Y - 10, 1)]

STEP2_Y = STEP1_Y + 170
b += [f'<rect x="{BOX_X}" y="{STEP2_Y}" width="{BOX_W}" height="{BOX_W}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="3"/>',
      f'<rect x="{BOX_X + 14}" y="{STEP2_Y + 22}" width="92" height="10" rx="5" fill="{PAPER_LINE}"/>',
      f'<rect x="{BOX_X + 10}" y="{STEP2_Y + 44}" width="100" height="18" rx="6" fill="none" stroke="{RED}" stroke-width="4"/>',
      f'<rect x="{BOX_X + 14}" y="{STEP2_Y + 90}" width="92" height="10" rx="5" fill="{PAPER_LINE}"/>',
      text(LABEL_X, STEP2_Y + 70, "고칠 부분 찾기", 34, 900, ACCENT, anchor="start"),
      badge(BOX_X - 20, STEP2_Y - 10, 2)]
b += [path(f"M{BOX_X + BOX_W / 2} {STEP1_Y + 120}V{STEP2_Y}", ACCENT)]

STEP3_Y = STEP2_Y + 190
b += [f'<rect x="{BOX_X}" y="{STEP3_Y}" width="{BOX_W}" height="{BOX_W}" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="3"/>',
      f'<rect x="{BOX_X + 14}" y="{STEP3_Y + 22}" width="92" height="10" rx="5" fill="{PAPER_LINE}"/>',
      f'<rect x="{BOX_X + 10}" y="{STEP3_Y + 44}" width="100" height="18" rx="6" fill="{GREEN}"/>',
      f'<rect x="{BOX_X + 14}" y="{STEP3_Y + 90}" width="92" height="10" rx="5" fill="{PAPER_LINE}"/>',
      text(LABEL_X, STEP3_Y + 70, "그 부분만 교체", 34, 900, ACCENT, anchor="start"),
      badge(BOX_X - 20, STEP3_Y - 10, 3)]
b += [path(f"M{BOX_X + BOX_W / 2} {STEP2_Y + BOX_W}V{STEP3_Y}", ACCENT)]

# the mascot's desk on the right, same file, only the highlighted line changed
DESK_R_X, DESK_R_Y, DESK_R_W = 1400, 566, 300
mr = 1.05
mrw = 240 * mr
b += [mascot(DESK_R_X + DESK_R_W / 2 - mrw / 2, DESK_R_Y - 143 * mr, mr), desk(DESK_R_X, DESK_R_Y, DESK_R_W, "tetris.py", body_h=170, label_size=25)]
b += [text(DESK_R_X + DESK_R_W / 2, 140, "나머지는 그대로", 30, 800, MUTED), check(DESK_R_X + DESK_R_W / 2, 200, 26)]

print(save("s2-write-edit.svg", b, "2/59 Write와 Edit 차이 (tools/illus/s2_write_edit.py)"))
