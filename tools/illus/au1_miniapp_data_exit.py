"""AU1/5 data layer (md, json, csv, db) on the left; Office files only at the exit, filled from a template. Badges 1, 2, 3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, RX, ZY, ZW, ZH = 76, 956, 210, 760, 540
b += [part_box(LX, ZY, ZW, ZH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, ZY, ZW, ZH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + ZW / 2, ZY + 64, "데이터 층", 40, 900, INK), text(LX + ZW / 2, ZY + 104, "중간 데이터는 가벼운 파일로", 24, 600, MUTED)]
b += [text(RX + ZW / 2, ZY + 64, "출구", 40, 900, INK), text(RX + ZW / 2, ZY + 104, "오피스 파일은 여기서만", 24, 600, MUTED)]
b += [badge(LX + ZW - 36, ZY, 1), badge(RX + ZW - 36, ZY, 3)]

tiles = [("md", "글", 116, 350), (".json", "구조가 있는 값", 496, 350), ("csv", "표", 116, 520), ("db", "계속 쌓이는 기록", 496, 520)]
for name, sub, x, y in tiles:
    b += [part_box(x, y, 300, 130, None, fill=ACCENT_ZONE, stroke=ACCENT, corner=16)]
    b += [text(x + 150, y + 62, name.lstrip("."), 40, 900, ACCENT_DARK, family=MONO)]
    b += [text(x + 150, y + 102, sub, 22, 600, MUTED)]

b += [path("M850 480C870 480 890 480 914 480")]

b += [doc(1000, 430, 96)]
b += [text(1048, 430 + 120 + 32, "템플릿", 24, 800, INK)]
b += [badge(1098, 416, 2)]
outs = [("xlsx", "엑셀", 350, GREEN), ("docx", "워드", 490, ACCENT), ("hwpx", "한글", 630, MASCOT)]
for name, sub, y, col in outs:
    b += [doc(1440, y, 80, accent=col)]
    b += [text(1544, y + 44, name, 30, 900, INK, anchor="start", family=MONO)]
    b += [text(1544, y + 76, sub, 22, 600, MUTED, anchor="start")]
    cy = y + 50
    b += [path(f"M1112 490C1230 490 1260 {cy} 1396 {cy}")]
print(save("au1-miniapp-data-exit.svg", b, "AU1/5 데이터 층과 오피스 출구 (tools/illus/au1_miniapp_data_exit.py)"))
