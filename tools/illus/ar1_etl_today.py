"""AR1 ETL: today's reimbursement job drawn as extract -> transform -> load. Badges 1, 2, 3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
BY, BH = 200, 560
BOXES = [(56, 500), (646, 440), (1176, 560)]
titles = [("추출", "Extract", "도란 메시지와 환율 가져오기"),
          ("변환", "Transform", "정리하고 판정하기"),
          ("적재", "Load", "받는 곳에 맞춰 내보내기")]
for i, (x, w) in enumerate(BOXES):
    b += [part_box(x, BY, w, BH, fill="#fff", stroke="#e5e5e5", corner=20)]
    b += [text(x + w / 2, BY + 64, titles[i][0], 44, 900, INK)]
    b += [text(x + w / 2, BY + 98, titles[i][1], 20, 700, ACCENT, family=MONO)]
    b += [text(x + w / 2, BY + 140, titles[i][2], 24, 600, MUTED)]
    b += [badge(x + w - 36, BY, i + 1)]

# box 1: Doran message with zip + ECOS
x0 = 56
win_body = (doc(40, 24, 64) + text(122, 62, "경비환급 신청", 24, 800, INK, anchor="start")
            + text(122, 92, "압축 파일, 영수증 사진", 20, 600, MUTED, anchor="start"))
b += [window(x0 + 50, 380, 400, 190, kind="app", title="도란", body=win_body)]
b += [part_box(x0 + 50, 620, 400, 90, "한국은행 환율", fill=ACCENT_ZONE, stroke=ACCENT, label_size=28)]

# box 2: code window + result.json
code = "".join([
    text(20, 36, "영수증 읽기", 22, 700, "#e7e9ec", anchor="start"),
    text(20, 70, "환율 적용", 22, 700, "#e7e9ec", anchor="start"),
    text(20, 104, "한도 판정", 22, 700, "#e7e9ec", anchor="start"),
])
b += [window(646 + 60, 380, 320, 190, kind="terminal", title="정리 · 판정", body=code)]
b += [path("M866 580C866 590 866 598 866 614", ACCENT)]
b += [doc(866 - 40, 640, 80)]
b += [text(866 + 60, 640 + 52, "result.json", 22, 800, INK, anchor="start", family=MONO)]

# box 3: five outputs
outs = [("은행 이체 파일", 1276, 380), ("전표", 1456, 380), ("정산 총괄표", 1636, 380),
        ("회신", 1366, 580), ("증빙", 1546, 580)]
for lab, cx, y in outs:
    b += [doc(cx - 36, y, 72)]
    b += [text(cx, y + 90 + 34, lab, 22, 800, INK)]

b += [path("M566 480C580 480 596 480 616 480")]
b += [path("M1096 480C1120 480 1138 480 1152 480")]
print(save("ar1-etl-today.svg", b, "AR1 ETL 오늘 업무 (tools/illus/ar1_etl_today.py)"))
