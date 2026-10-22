"""AR2/4 rulebook to program: the 지침 has a table page (별표) and prose pages. The table becomes code (keyword table);
the prose becomes the 유형 분류 모듈's manual, which cites the clause and marks 확인필요. Badges 1-3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
# ---- left: the rulebook with two kinds of pages ----
b += [text(300, 222, "해외출장경비처리지침", 30, 900, INK)]
b += [part_box(76, 252, 448, 230, fill="#fff", stroke=LINE2, corner=14)]
b += [text(100, 292, "별표 · 항목별 계정과목 분류표", 22, 800, ACCENT_DARK, anchor="start")]
for i, (a, c) in enumerate([("택시, 지하철", "교통비"), ("호텔", "숙박비"), ("식당, 카페", "식대")]):
    y = 312 + i * 50
    b += [f'<rect x="100" y="{y}" width="400" height="42" fill="{PANEL}" stroke="{PAPER_LINE}" stroke-width="1.5"/>',
          text(116, y + 28, a, 21, 700, INK2, anchor="start"), text(340, y + 28, c, 21, 700, INK2, anchor="start")]
b += [part_box(76, 516, 448, 260, fill="#fff", stroke=LINE2, corner=14)]
b += [text(100, 556, "본문 조항", 22, 800, ACCENT_DARK, anchor="start")]
for i, t in enumerate(["혼합 영수증 분리", "선물 vs 기념품", "공항 결제"]):
    y = 576 + i * 62
    b += [f'<rect x="100" y="{y}" width="400" height="48" rx="8" fill="{PANEL}" stroke="{PAPER_LINE}" stroke-width="1.5"/>',
          text(116, y + 32, t, 22, 700, INK2, anchor="start")]
# ---- middle arrows ----
b += [path("M544 367C580 367 610 367 650 367", color=ACCENT)]
b += [path("M544 646C580 646 610 646 650 646", color=ACCENT)]
# ---- right top: code ----
code = "".join([
    text(20, 34, "KEYWORDS = {", 20, 700, ACCENT_MID, anchor="start", family=MONO),
    text(20, 64, '  "택시": "교통비",', 20, 700, "#e7e9ec", anchor="start", family=MONO),
    text(20, 94, '  "호텔": "숙박비",', 20, 700, "#e7e9ec", anchor="start", family=MONO),
    text(20, 124, "}", 20, 700, ACCENT_MID, anchor="start", family=MONO),
])
b += [window(690, 262, 520, 190, kind="terminal", title="classify_table.py", body=code)]
b += [badge(1200, 244, 1)]
b += [text(1250, 340, "표는 코드로", 32, 900, INK, anchor="start"), text(1250, 380, "같은 키워드면 같은 계정", 23, 600, MUTED, anchor="start")]
# ---- right bottom: AI module with manual + chip ----
b += [part_box(690, 536, 520, 240, fill=ACCENT_ZONE, stroke=ACCENT, corner=18)]
b += [text(716, 580, "유형 분류 모듈", 28, 900, INK, anchor="start"), text(1184, 580, "haiku", 22, 700, ACCENT_DARK, anchor="end", family=MONO)]
b += [part_box(716, 604, 250, 60, "지침 본문 (매뉴얼)", fill="#fff", stroke=ACCENT, label_size=22, weight=700)]
b += [text(1090, 640, "조항을 인용하고", 22, 700, INK2), text(1090, 668, "모르면 표시", 22, 700, INK2)]
b += [part_box(716, 694, 200, 56, "지침 3.4", fill=ACCENT, stroke=ACCENT, label_size=24, weight=800, label_color="#fff", corner=28)]
b += [part_box(960, 694, 200, 56, "확인필요", fill="#fff", stroke=RED, label_size=24, weight=800, label_color=RED, corner=28)]
b += [badge(1200, 518, 2)]
b += [text(1250, 640, "문장은 AI 모듈로", 32, 900, INK, anchor="start"), text(1250, 680, "AI 모듈도 규칙집이 필요", 23, 600, MUTED, anchor="start")]
b += [badge(1268, 733, 3)]
print(save("ar2-bridge-rulebook.svg", b, "AR2/4 rulebook to program (tools/illus/ar2_bridge_rulebook.py)"))
