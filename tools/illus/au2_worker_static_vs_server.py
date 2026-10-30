"""AU2 서버와 DB 배포: left - a GitHub Pages page alone, each browser keeps its own list; right - the page talks to a
Worker (the Claude mascot at a desk) inside a Cloudflare cloud, which keeps one list in D1 for the whole team.
Badges 1 (page alone), 2 (Worker), 3 (D1)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def db_cylinder(x, y, w=130, h=150, label="D1", sub="supply-db") -> str:
    """A database drum: top-left (x, y), w x h, with the name on the front."""
    ry = 20
    cx = x + w / 2
    out = [
        f'<g filter="url(#sh)"><path d="M{x} {y + ry}V{y + h - ry}A{w / 2} {ry} 0 0 0 {x + w} {y + h - ry}V{y + ry}Z" fill="#fff" stroke="{ACCENT}" stroke-width="4"/></g>',
        f'<ellipse cx="{cx}" cy="{y + ry}" rx="{w / 2}" ry="{ry}" fill="{ACCENT_TINT}" stroke="{ACCENT}" stroke-width="4"/>',
        f'<path d="M{x} {y + h * 0.42}A{w / 2} {ry} 0 0 0 {x + w} {y + h * 0.42}" fill="none" stroke="{ACCENT}" stroke-width="3"/>',
        text(cx, y + h * 0.72, label, 40, 900, INK),
        text(cx, y + h + 38, sub, 22, 700, MUTED, family=MONO),
    ]
    return "\n".join(out)


def list_body(rows, w=350):
    """Body of a small browser window: a heading and request rows (name, item, qty)."""
    out = [text(20, 34, "비품 신청", 22, 900, INK, anchor="start")]
    for i, (n, it, q) in enumerate(rows):
        y = 74 + i * 34
        out += [text(20, y, n, 20, 700, INK2, anchor="start"), text(122, y, it, 20, 600, INK2, anchor="start"),
                text(w - 22, y, q, 20, 700, INK2, anchor="end")]
    return "".join(out)


b = []
WY, WH, WW = 300, 216, 350
URL = "student01.github.io"

# ---------- left: the page alone ----------
b += [text(466, 190, "페이지만", 36, 800, INK), text(466, 230, "목록이 각자 브라우저 안에만", 23, 600, MUTED)]
AX, BX = 82, 500
b += [text(AX + WW / 2, 282, "내 PC", 24, 800, INK), text(BX + WW / 2, 282, "팀원 PC", 24, 800, INK)]
b += [window(AX, WY, WW, WH, kind="browser", title=URL, body=list_body([("김누리", "A4 용지", "2")]))]
b += [window(BX, WY, WW, WH, kind="browser", title=URL, body=list_body([("박서연", "볼펜", "10")]))]
b += [cross(466, 462, 26)]
b += [badge(466, 384, 1)]
for i, t in enumerate(["내 신청은 내 브라우저에만", "팀원 화면에는 보이지 않음", "PC마다 목록이 따로 쌓임"]):
    y = 610 + i * 56
    b += [cross(112, y, 17), text(148, y + 9, t, 27, 800, INK, anchor="start")]

# ---------- right: page -> Worker -> D1 ----------
b += [text(1326, 190, "서버와 DB", 36, 800, INK), text(1326, 230, "목록이 한 곳에 모임", 23, 600, MUTED)]
CX, DX = 942, 1360
b += [text(CX + WW / 2, 282, "내 PC", 24, 800, INK), text(DX + WW / 2, 282, "팀원 PC", 24, 800, INK)]
same = [("이도윤", "모니터 받침대", "1"), ("박서연", "볼펜", "10"), ("김누리", "A4 용지", "2")]
b += [window(CX, WY, WW, WH, kind="browser", title=URL, body=list_body(same))]
b += [window(DX, WY, WW, WH, kind="browser", title=URL, body=list_body(same))]

# Cloudflare cloud (wide, soft tint) holding the Worker and the database
cloud_shapes = "".join([
    f'<circle cx="1050" cy="698" r="92" fill="{ACCENT_ZONE}"/>',
    f'<circle cx="1190" cy="654" r="112" fill="{ACCENT_ZONE}"/>',
    f'<circle cx="1365" cy="648" r="120" fill="{ACCENT_ZONE}"/>',
    f'<circle cx="1530" cy="668" r="104" fill="{ACCENT_ZONE}"/>',
    f'<circle cx="1652" cy="722" r="92" fill="{ACCENT_ZONE}"/>',
    f'<rect x="976" y="676" width="768" height="136" rx="66" fill="{ACCENT_ZONE}"/>',
])
b += [f'<g filter="url(#sh)">{cloud_shapes}</g>']
b += [text(1660, 752, "Cloudflare", 26, 800, ACCENT_DARK)]

DESK_X, DESK_Y, DESK_W = 1030, 718, 300
b += [mascot(1078, DESK_Y - 123, 0.86)]
b += [desk(DESK_X, DESK_Y, DESK_W, None, body_h=56)]
b += [text(DESK_X + DESK_W / 2, DESK_Y + 24 + 37, "Worker", 28, 800, INK)]
b += [badge(1058, 628, 2)]

b += [db_cylinder(1440, 640, 130, 120, "D1", "supply-db")]
b += [badge(1578, 646, 3)]

b += [path("M1117 530C1117 552 1130 566 1146 580")]
b += [path("M1535 530C1535 580 1390 566 1308 612")]
b += [path("M1338 716C1366 716 1392 716 1412 716")]
print(save("au2-worker-static-vs-server.svg", b, "AU2 페이지만 vs 서버와 DB (tools/illus/au2_worker_static_vs_server.py)"))
