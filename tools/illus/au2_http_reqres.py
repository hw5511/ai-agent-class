"""AU2 HTTP 1/5 요청과 응답: the 비품 신청 page on a laptop sends POST /api/requests (+ a JSON paper) to the Worker
(the mascot at a desk in a tinted cloud); a 201 Created + JSON paper comes back. Badges 1 요청, 2 서버 처리, 3 응답."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- left: the browser page on a laptop ----
LX, LY, LW = 70, 330, 400
scr = "".join([
    text(18, 38, "비품 신청", 26, 900, INK, anchor="start"),
    f'<rect x="14" y="54" width="104" height="34" rx="8" fill="#fff" stroke="{LINE}" stroke-width="1.5"/>', text(66, 78, "김누리", 19, 700, INK2),
    f'<rect x="124" y="54" width="124" height="34" rx="8" fill="#fff" stroke="{LINE}" stroke-width="1.5"/>', text(186, 78, "A4 용지", 19, 700, INK2),
    f'<rect x="254" y="54" width="44" height="34" rx="8" fill="#fff" stroke="{LINE}" stroke-width="1.5"/>', text(276, 78, "2", 19, 700, INK2),
    f'<rect x="306" y="54" width="62" height="34" rx="8" fill="{ACCENT}"/>', text(337, 78, "신청", 19, 800, "#fff"),
    f'<rect x="14" y="110" width="352" height="2" fill="{PAPER_LINE}"/>',
    "".join(text(x_, y_, v, 19, 600, MUTED, anchor="start") for y_, row in
            [(142, ("11", "최유진", "토너", "1")), (176, ("10", "이도윤", "모니터 받침대", "1")), (210, ("9", "박서연", "볼펜", "10"))]
            for x_, v in zip((18, 56, 150, 316), row)),
])
b += [laptop(LX, LY, LW, scr)]
b += [text(LX + LW / 2, LY + 252 + 62, "내 브라우저", 34, 900, INK)]
b += [text(LX + LW / 2, LY + 252 + 100, "student01.github.io/supply-board", 22, 700, MUTED, family=MONO)]

# ---- right: the Worker in a tinted cloud ----
CX, CY, CS = 1300, 468, 1.4
b += [cloud(CX, CY, CS)]
b += [text(CX, 262, "서버", 38, 900, ACCENT_DARK)]
b += [text(CX, 304, "Cloudflare Worker", 26, 800, MUTED)]
DX, DY, DW = 1040, 620, 560
mh = 143 * 1.1
b += [mascot(DX + 60, DY - mh, 1.1)]
# paper stack and a small laptop on the desk
b += [doc(DX + 380, DY - 98, 70, rot=-5, accent=GREEN), doc(DX + 440, DY - 90, 62, rot=6)]
b += [desk(DX, DY, DW, None, body_h=96)]
b += [f'<rect x="{DX + DW / 2 - 130}" y="{DY + 62}" width="260" height="50" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2"/>',
      text(DX + DW / 2, DY + 98, "supply-api", 30, 800, INK, family=MONO)]

# ---- 1 request travels right, with a small JSON paper ----
b += [path("M520 420C650 340 800 340 960 430", ACCENT, arrow=False), arrow_head_at(800, 346, 962, 432, 22, ACCENT)]
b += [doc(712, 300, 56, rot=-4)]
b += [text(738, 262, "POST /api/requests", 30, 800, ACCENT_DARK, family=MONO)]
b += [text(738, 424, "JSON 본문", 24, 800, MUTED)]
b += [badge(560, 372, 1)]

# ---- 2 server work ----
b += [badge(DX + 30, DY - mh - 14, 2)]

# ---- 3 response travels back, with a JSON paper ----
b += [path("M1010 670C860 744 660 744 520 644", GREEN, arrow=False), arrow_head_at(660, 742, 518, 642, 22, GREEN)]
b += [doc(714, 664, 56, rot=5, accent=GREEN)]
b += [text(792, 628, "201 Created", 30, 800, GREEN, family=MONO)]
b += [text(742, 782, "JSON 본문", 24, 800, MUTED)]
b += [badge(560, 700, 3)]

print(save("au2-http-reqres.svg", b, "AU2 HTTP request and response (tools/illus/au2_http_reqres.py)"))
