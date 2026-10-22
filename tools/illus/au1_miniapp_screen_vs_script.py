"""AU1/1 자동화는 미니 앱 만들기: left - AI opens an exchange-rate site and looks up each date and currency by hand;
right - collect.py calls the 한국은행 ECOS API directly (10 rows per call, measured 0.13 s). Badges 1 (screen control), 2 (mini app)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
LX, LY, LW, LH = 76, 170, 800, 610
RX, RY, RW, RH = 916, 170, 800, 610
b += [part_box(LX, LY, LW, LH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [part_box(RX, RY, RW, RH, fill="#fff", stroke="#e5e5e5", corner=20)]
b += [text(LX + LW / 2, LY + 42, "화면 조작", 32, 800, INK), text(LX + LW / 2, LY + 78, "AI 가 매번 화면을 보고 클릭", 23, 600, MUTED)]
b += [text(RX + RW / 2, RY + 42, "미니 앱", 32, 800, INK), text(RX + RW / 2, RY + 78, "스크립트가 한국은행 API 를 직접 호출", 23, 600, MUTED)]

MS = 0.5
# ---- left: mascot at desk -> browser with repeated lookups ----
DX, DY, DW = 96, 560, 150
b += [desk(DX, DY, DW, "Claude", body_h=60, label_size=26)]
b += [mascot(DX + DW / 2 - 240 * MS / 2, DY - 143 * MS, MS)]
mcy = DY - 143 * MS / 2
BX, BY, BW, BH = 316, 290, 520, 290
body = "".join([
    f'<rect x="24" y="22" width="330" height="40" rx="10" fill="#fff" stroke="{LINE}" stroke-width="2"/>',
    text(40, 49, "통화와 날짜 입력", 20, 600, MUTED, anchor="start"),
    f'<rect x="370" y="22" width="126" height="40" rx="10" fill="{ACCENT}"/>',
    text(433, 49, "조회", 20, 800, "#fff"),
    text(24, 108, "USD 9/7 조회", 20, 700, INK2, anchor="start"),
    text(24, 148, "JPY 9/23 조회", 20, 700, INK2, anchor="start"),
    text(24, 188, "EUR 10/2 조회", 20, 700, INK2, anchor="start"),
    text(24, 228, "...  CNY, VND 도 날짜마다", 20, 700, MUTED, anchor="start"),
    icon_cursor(420, 66, 44, INK),
])
b += [window(BX, BY, BW, BH, kind="browser", title="환율 사이트", body=body)]
b += [badge(BX + BW - 10, BY - 22, 1)]
b += [path(f"M{DX + DW + 6} {mcy:.0f}C{DX + DW + 26} {mcy:.0f} {BX - 40} {mcy:.0f} {BX - 12} {mcy:.0f}")]
b += [cross(LX + 330, 724, 24)]
b += [text(LX + 376, 735, "통화·사용일 23번 조회", 32, 800, INK, anchor="start")]

# ---- right: script runs by itself -> API -> result.json (no mascot) ----
TX, TY, TW, TH = 950, 395, 360, 150
code = "".join([
    text(18, 34, "for cur in CURS:", 20, 700, ACCENT_MID, anchor="start", family=MONO),
    text(18, 64, "  call_api(cur)", 20, 700, "#e7e9ec", anchor="start", family=MONO),
    text(18, 94, "save(rates)", 20, 700, "#e7e9ec", anchor="start", family=MONO),
])
b += [window(TX, TY, TW, TH, kind="terminal", title="collect.py", body=code)]
b += [badge(TX + TW - 10, TY - 22, 2)]
b += [text(TX + TW / 2, TY + TH + 56, "한 번 만들어 두면 혼자 실행", 26, 700, MUTED)]
b += [part_box(1480, 400, 220, 90, "한국은행 API", fill=ACCENT_ZONE, stroke=ACCENT, label_size=26)]
b += [path("M1316 445C1346 445 1440 445 1466 445")]
b += [text(1390, 420, "10건씩", 20, 800, ACCENT)]
b += [path("M1590 498C1590 515 1590 530 1590 545", color=GREEN)]
b += [doc(1555, 575, 70)]
b += [text(1590, 575 + 87.5 + 30, "raw/*.json", 20, 800, INK, family=MONO)]
b += [check(1130, 724, 24)]
b += [text(1176, 735, "15번 호출 6.3초 (sample 키)", 30, 800, INK, anchor="start")]
print(save("au1-miniapp-screen-vs-script.svg", b, "AU1/1 화면 조작 vs 미니 앱 (tools/illus/au1_miniapp_screen_vs_script.py)"))
