"""AR2/5 screen control vs API: left - a browser agent reads a portal finance page date by date; right - the ECOS API
returns the same number with dates and a fixed format (10 rows ~0.13 s in our test). Badges 1, 2."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, LY, LW, LH = 76, 170, 800, 610
RX, RY, RW, RH = 916, 170, 800, 610
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 46, "화면 조작", 34, 800, INK), text(LX + LW / 2, LY + 84, "브라우저 에이전트가 환율 페이지를 날짜마다 조회", 23, 600, MUTED)]
b += [text(RX + RW / 2, RY + 46, "API 호출", 34, 800, INK), text(RX + RW / 2, RY + 84, "한국은행 ECOS 에 날짜 범위를 보내 받기", 23, 600, MUTED)]

BX, BY, BW, BH = LX + 40, LY + 120, 720, 290
body = "".join([
    f'<rect x="24" y="20" width="440" height="40" rx="10" fill="#fff" stroke="{LINE}" stroke-width="2"/>',
    text(40, 47, "날짜 선택", 20, 600, MUTED, anchor="start"),
    f'<rect x="480" y="20" width="110" height="40" rx="10" fill="{ACCENT}"/>', text(535, 47, "조회", 20, 800, "#fff"),
    text(24, 106, "9/7 USD 조회", 20, 700, INK2, anchor="start"),
    text(24, 144, "9/8 USD 조회", 20, 700, INK2, anchor="start"),
    text(24, 182, "9/9 USD 조회", 20, 700, INK2, anchor="start"),
    text(24, 220, "...  날짜와 통화마다 반복", 20, 700, MUTED, anchor="start"),
    icon_cursor(560, 64, 44, INK),
])
b += [window(BX, BY, BW, BH, kind="browser", title="네이버 환율 페이지", body=body)]
b += [badge(BX + BW - 10, BY - 22, 1)]
for i, t in enumerate(["느림, 날짜마다 한 번씩", "페이지가 바뀌면 깨짐", "차단되거나 약관에 걸릴 수 있음"]):
    y = LY + 462 + i * 48
    b += [cross(LX + 70, y, 17), text(LX + 106, y + 9, t, 27, 800, INK, anchor="start")]

code = "".join([
    text(20, 34, "GET /StatisticSearch/", 20, 700, ACCENT_MID, anchor="start", family=MONO),
    text(20, 62, "  .../731Y001/D/20260901/", 20, 700, "#e7e9ec", anchor="start", family=MONO),
    text(20, 90, "  20260930/0000001", 20, 700, "#e7e9ec", anchor="start", family=MONO),
    text(20, 128, "-> JSON  DATA_VALUE", 20, 700, "#7bd88f", anchor="start", family=MONO),
])
b += [window(RX + 40, RY + 120, 720, 290, kind="terminal", title="ecos.py", body=code)]
b += [badge(RX + 750, RY + 98, 2)]
for i, t in enumerate(["날짜 범위를 한 번에 요청", "정해진 형식으로 응답", "10건 호출 약 0.13초 (수업 테스트)"]):
    y = RY + 462 + i * 48
    b += [check(RX + 70, y, 17), text(RX + 106, y + 9, t, 27, 800, INK, anchor="start")]
print(save("ar2-bridge-api.svg", b, "AR2/5 screen control vs API (tools/illus/ar2_bridge_api.py)"))
