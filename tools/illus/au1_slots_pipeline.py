"""au1/2 AI 슬롯: a left-to-right pipeline. Four plain code boxes (CSV 읽기, 환율 API, 규칙 검사, 엑셀 채우기)
and two taller slot boxes where the Claude mascot sits at a desk (판단 슬롯 after the rule check, 생성 슬롯 at the end).
Badges 1 (code boxes), 2 (판단 슬롯), 3 (생성 슬롯)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
GAP, DW, SW = 70, 210, 250
items = [("det", "CSV 읽기", "파일 입력"), ("det", "환율 API", "한국은행"), ("det", "규칙 검사", "식비 10만원 초과"),
         ("slot", "판단 슬롯", "메모를 읽고 태그"), ("det", "엑셀 채우기", "양식 칸 입력"), ("slot", "생성 슬롯", "요약 문단 작성")]
total = sum(DW if k == "det" else SW for k, _, _ in items) + GAP * (len(items) - 1)
x = (W - total) / 2
CY = 545
pos = []
for kind, label, sub in items:
    w = DW if kind == "det" else SW
    pos.append((x, w))
    if kind == "det":
        h = 150
        y = CY - h / 2
        b += [part_box(x, y, w, h, None, fill="#fff", stroke=LINE2, corner=18)]
        b += [text(x + w / 2, y + 74, label, 30, 800, INK)]
        b += [text(x + w / 2, y + 110, sub, 20, 600, MUTED)]
    else:
        h = 270
        y = CY - h / 2
        b += [part_box(x, y, w, h, None, fill=ACCENT_ZONE, stroke=ACCENT, corner=20)]
        ms = 0.45
        b += [mascot(x + w / 2 - 240 * ms / 2, y + 26, ms)]
        b += [desk(x + 36, y + 26 + 143 * ms - 4, w - 72, None, body_h=16)]
        b += [text(x + w / 2, y + 190, label, 30, 800, ACCENT_DARK)]
        b += [text(x + w / 2, y + 228, sub, 20, 600, MUTED)]
    x += w + GAP

# arrows between boxes
for i in range(len(pos) - 1):
    x1 = pos[i][0] + pos[i][1] + 10
    x2 = pos[i + 1][0] - 30
    b += [path(f"M{x1:.0f} {CY}L{x2:.0f} {CY}")]

# badges: above the first code box, above each slot box
b += [badge(pos[0][0] + 20, CY - 75 - 8, 1)]
b += [badge(pos[3][0] + pos[3][1] - 10, CY - 135 - 6, 2)]
b += [badge(pos[5][0] + pos[5][1] - 10, CY - 135 - 6, 3)]

print(save("au1-slots-pipeline.svg", b, "au1/2 결정론 구간과 AI 슬롯 (tools/illus/au1_slots_pipeline.py)"))
