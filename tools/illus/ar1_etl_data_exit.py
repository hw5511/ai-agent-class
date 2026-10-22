"""AR1 ETL: data layer (md, json, csv, xlsx read as data) vs Office files only at the exit. Badges 1, 2, 3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, RX, ZY, ZW, ZH = 76, 956, 210, 760, 540
b += [part_box(LX, ZY, ZW, ZH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, ZY, ZW, ZH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + ZW / 2, ZY + 64, "데이터 층", 40, 900, INK), text(LX + ZW / 2, ZY + 104, "중간 결과는 가벼운 파일로", 24, 600, MUTED)]
b += [text(RX + ZW / 2, ZY + 64, "출구", 40, 900, INK), text(RX + ZW / 2, ZY + 104, "받는 사람이 열어 보는 파일", 24, 600, MUTED)]
b += [badge(LX + ZW - 36, ZY, 1), badge(RX + ZW - 36, ZY, 3)]

tiles = [("md", "글, 규정 설명", 116, 350), ("json", "구조가 있는 값", 496, 350),
         ("csv", "단순한 표", 116, 520), ("xlsx", "읽어 들인 표", 496, 520)]
for name, sub, x, y in tiles:
    b += [part_box(x, y, 300, 130, None, fill=ACCENT_ZONE, stroke=ACCENT, corner=16)]
    b += [text(x + 150, y + 62, name, 40, 900, ACCENT_DARK, family=MONO)]
    b += [text(x + 150, y + 102, sub, 22, 600, MUTED)]

b += [path("M850 480C870 480 890 480 914 480")]

b += [doc(1000, 430, 96)]
b += [text(1048, 430 + 120 + 32, "은행 양식", 24, 800, INK)]
b += [badge(1098, 416, 2)]
outs = [("은행 이체 파일", "양식에 채움", 350, GREEN), ("전표 업로드", "양식에 채움", 490, ACCENT), ("정산 총괄표", "양식에 채움", 630, MASCOT)]
for name, sub, y, col in outs:
    b += [doc(1440, y, 80, accent=col)]
    b += [text(1544, y + 44, name, 25, 900, INK, anchor="start")]
    b += [text(1544, y + 76, sub, 22, 600, MUTED, anchor="start")]
    cy = y + 50
    b += [path(f"M1112 490C1230 490 1260 {cy} 1396 {cy}")]
print(save("ar1-etl-data-exit.svg", b, "AR1 ETL 데이터 층과 출구 (tools/illus/ar1_etl_data_exit.py)"))
