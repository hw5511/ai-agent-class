"""AU1/4 추출 -> 변환 -> 적재 with today's files: expenses.csv + 한국은행 API -> process.py -> result.json -> 정산서 엑셀 / 정산요약.md / 확인필요.csv. Badges 1, 2, 3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
BY, BH, BW = 210, 540, 480
XS = [76, 656, 1236]
titles = [("추출", "파일 읽기, API 호출", "Extract"), ("변환", "환율 적용, 한도 판정", "Transform"), ("적재", "결과를 파일로 내기", "Load")]
for i, x in enumerate(XS):
    b += [part_box(x, BY, BW, BH, fill="#fff", stroke="#e5e5e5", corner=20)]
    b += [text(x + BW / 2, BY + 64, titles[i][0], 44, 900, INK)]
    b += [text(x + BW / 2, BY + 98, titles[i][2], 20, 700, ACCENT, family=MONO)]
    b += [text(x + BW / 2, BY + 140, titles[i][1], 24, 600, MUTED)]
    b += [badge(x + BW - 36, BY, i + 1)]

# box 1: expenses.csv + API
b += [doc(124, 400, 90)]
b += [text(169, 400 + 112.5 + 30, "expenses.csv", 20, 800, INK, family=MONO)]
b += [part_box(300, 410, 230, 90, "한국은행 API", fill=ACCENT_ZONE, stroke=ACCENT, label_size=26)]

# box 2: code (process.py) -> result.json
code = "".join([
    text(18, 34, "to_krw(rates)", 20, 700, ACCENT_MID, anchor="start", family=MONO),
    text(18, 64, "check(limits)", 20, 700, "#e7e9ec", anchor="start", family=MONO),
    text(18, 94, "save(result)", 20, 700, "#e7e9ec", anchor="start", family=MONO),
])
b += [window(672, 420, 272, 150, kind="terminal", title="process.py", body=code)]
b += [path("M952 510C962 510 968 505 976 505")]
b += [doc(996, 440, 90)]
b += [text(1041, 440 + 112.5 + 30, "result.json", 20, 800, INK, family=MONO)]

# box 3: three exits
for cx, lab, acc, fam in [(1306, "정산서 엑셀", GREEN, None), (1476, "정산요약.md", None, MONO), (1646, "확인필요.csv", None, MONO)]:
    b += [doc(cx - 38, 430, 76, accent=acc) if acc else doc(cx - 38, 430, 76)]
    b += [text(cx, 430 + 95 + 30, lab, 19, 800, INK, family=fam) if fam else text(cx, 430 + 95 + 30, lab, 20, 800, INK)]

# arrows between boxes
b += [path("M572 480C590 480 604 480 622 480")]
b += [path("M1152 480C1170 480 1184 480 1202 480")]
print(save("au1-miniapp-three-boxes.svg", b, "AU1/4 추출 변환 적재 오늘의 파일 (tools/illus/au1_miniapp_three_boxes.py)"))
