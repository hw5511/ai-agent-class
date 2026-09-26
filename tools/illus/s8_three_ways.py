"""8/13 같은 서비스, 세 가지 사용법: 웹사이트 / 데스크톱 앱 / CLI 로 같은 GitHub 레포 cafe-landing 을 본다."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

WIN_W, GAP, X0, WIN_Y, WIN_H = 520, 45, 70, 90, 380
XS = [X0 + i * (WIN_W + GAP) for i in range(3)]
PAD = 28  # inner padding kept clear of the window border
FOOT = 660  # shared baseline: mascot feet / desk top surface, under every window
MS = 0.7
MW, MH = 240 * MS, 143 * MS
DESK_W = 150
BIG_Y, SUB_Y = 748, 786


def _pointer(x, y):
    return (f'<g transform="translate({x} {y})" filter="url(#shs)">'
            f'<path d="M0 0L0 30L8 22L13 33L19 30L14 19L24 19Z" fill="{INK}" stroke="#fff" stroke-width="2"/></g>')


def _mouse_icon(cx, y, s=1.0):
    w, h = 34 * s, 50 * s
    x = cx - w / 2
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{w / 2}" fill="none" stroke="{INK2}" stroke-width="{3.4 * s}"/>'
            f'<line x1="{cx}" y1="{y}" x2="{cx}" y2="{y + h * 0.4}" stroke="{INK2}" stroke-width="{3.4 * s}"/>'
            f'<line x1="{x}" y1="{y + h * 0.4}" x2="{x + w}" y2="{y + h * 0.4}" stroke="{INK2}" stroke-width="{3.4 * s}"/>')


def _keyboard_icon(cx, y, s=1.0):
    w, h = 84 * s, 34 * s
    x = cx - w / 2
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{6 * s}" fill="none" stroke="{INK2}" stroke-width="{3.4 * s}"/>']
    for r in range(2):
        for c in range(6):
            kx = x + (8 + c * 12) * s
            ky = y + (7 + r * 12) * s
            out.append(f'<rect x="{kx}" y="{ky}" width="{8 * s}" height="{8 * s}" rx="{2 * s}" fill="{INK2}"/>')
    return "".join(out)


def _file_row(x, y, name, msg, w):
    out = [f'<rect x="{x}" y="{y}" width="14" height="14" rx="3" fill="{ACCENT_TINT}"/>',
           f'<rect x="{x}" y="{y}" width="14" height="14" rx="3" fill="none" stroke="{ACCENT}" stroke-width="2"/>',
           text(x + 24, y + 12, name, 18, 600, INK2, anchor="start", family=MONO)]
    out.append(text(x + w, y + 12, msg, 16, 500, MUTED, anchor="end"))
    return "".join(out)


def _desk_user(x, icon_fn, kor, sub):
    """A user behind a desk (like the 8/4 pilot), centred under a window of width WIN_W; the input device sits on the desk top."""
    cx = x + WIN_W / 2
    dw = 340
    dx = cx - dw / 2
    top = 600
    out = [mascot(cx - MW / 2 - 50, top - MH + 2, MS), desk(dx, top, dw, None, body_h=70)]
    out.append(icon_fn(cx + 110, top - 52 if icon_fn is _mouse_icon else top - 36))
    out.append(text(cx, BIG_Y, kor, 40, 900))
    out.append(text(cx, SUB_Y, sub, 22, 600, MUTED))
    return out


def scene_browser(x):
    inner_w = WIN_W - 2 * PAD
    code_w = 100
    code_x = inner_w - code_w
    files = [("index.html", "메뉴 추가"), ("style.css", "메뉴 추가"), ("script.js", "장바구니"),
             ("README.md", "초기 커밋"), ("style.css", "색상 수정")]
    body = [text(0, 26, "cafe-landing", 25, 900, INK, anchor="start"),
            f'<rect x="{code_x}" y="4" width="{code_w}" height="32" rx="8" fill="{GREEN}"/>',
            text(code_x + code_w / 2, 26, "Code", 17, 700, "#fff"),
            f'<line x1="0" y1="52" x2="{inner_w}" y2="52" stroke="{LINE}" stroke-width="1.5"/>',
            text(0, 76, "commit message", 15, 600, MUTED, anchor="start")]
    for i, (name, msg) in enumerate(files):
        body.append(_file_row(0, 96 + i * 38, name, msg, inner_w))
    out = [window(x, WIN_Y, WIN_W, WIN_H, "browser", "github.com/.../cafe-landing",
                   f'<g transform="translate({PAD} {PAD})">{"".join(body)}</g>')]
    out.append(_pointer(x + PAD + code_x + code_w / 2 - 6, WIN_Y + 52 + PAD + 30))
    out += _desk_user(x, _mouse_icon, "웹사이트", "마우스로 클릭")
    return out


def scene_app(x):
    inner_w = WIN_W - 2 * PAD
    sidebar_w = 150
    list_x = sidebar_w + 24
    list_w = inner_w - list_x
    body = [f'<rect x="0" y="0" width="{sidebar_w}" height="{WIN_H - 52 - 2 * PAD}" rx="10" fill="#f4f6f8"/>',
            text(20, 30, "cafe-landing", 19, 800, INK, anchor="start"),
            text(20, 60, "main", 16, 600, MUTED, anchor="start")]
    changes = [("index.html", "수정됨"), ("style.css", "수정됨"), ("script.js", "새 파일")]
    body.append(text(list_x, 22, "Changes", 16, 700, MUTED, anchor="start"))
    for i, (name, msg) in enumerate(changes):
        body.append(_file_row(list_x, 42 + i * 38, name, msg, list_w))
    by = 42 + len(changes) * 38 + 44
    btn_w = 190
    body += [f'<rect x="{list_x}" y="{by}" width="{btn_w}" height="46" rx="10" fill="{ACCENT}"/>',
             text(list_x + btn_w / 2, by + 30, "Push origin", 18, 800, "#fff")]
    out = [window(x, WIN_Y, WIN_W, WIN_H, "app", "cafe-landing - GitHub Desktop",
                   f'<g transform="translate({PAD} {PAD})">{"".join(body)}</g>')]
    out.append(_pointer(x + PAD + list_x + btn_w - 34, WIN_Y + 52 + PAD + by + 40))
    out += _desk_user(x, _mouse_icon, "데스크톱 앱", "마우스로 클릭")
    return out


def scene_terminal(x):
    lines = [("$ gh repo view cafe-landing", GREEN),
             ("cafe-landing", "#e7e9ec"),
             ("설명: 카페 랜딩 페이지 저장소", "#9aa0a8"),
             ("View: github.com/.../cafe-landing", "#9aa0a8")]
    body = []
    for i, (t, c) in enumerate(lines):
        body.append(text(0, 22 + i * 38, t, 17, 600, c, anchor="start", family=MONO))
    cursor_y = 22 + len(lines) * 38 - 14
    body.append(f'<rect x="0" y="{cursor_y}" width="11" height="20" fill="{GREEN}"/>')
    out = [window(x, WIN_Y, WIN_W, WIN_H, "terminal", "터미널",
                   f'<g transform="translate({PAD} {PAD})">{"".join(body)}</g>')]
    out.append(badge(x + WIN_W - 34, WIN_Y + 26, 1))
    out += _desk_user(x, _keyboard_icon, "CLI", "명령어")
    return out


b = [panel()]
for fn, x in zip([scene_browser, scene_app, scene_terminal], XS):
    b += fn(x)

print(save("s8-three-ways.svg", b, "8/13 같은 서비스, 세 가지 사용법 (tools/illus/s8_three_ways.py)"))
