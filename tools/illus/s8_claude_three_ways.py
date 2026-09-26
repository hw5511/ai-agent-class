"""8/40 웹 · 데스크톱 앱 · CLI: three Claude surfaces as column heads, two icon rows below.
Only real, short UI words are used (claude.ai, Claude, $ claude) - no invented app sentences."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

COL_W, GAP, COL_X0, WIN_Y, WIN_H = 480, 45, 220, 86, 284
COLS = [COL_X0 + i * (COL_W + GAP) for i in range(3)]
CAPTION_Y = 404
ROW1_Y, ROW2_Y = 440, 592
LABEL_X = 40
PAD = 24  # inner padding kept clear of every window's border


def _download_icon(cx, y, w=62, disabled=False):
    x = cx - w / 2
    h = w
    color = LINE2 if disabled else ACCENT
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="none" stroke="{color}" stroke-width="5"/>',
           f'<path d="M{cx} {y + 12}V{y + h * 0.6}M{cx - 13} {y + h * 0.6 - 13}L{cx} {y + h * 0.6}L{cx + 13} {y + h * 0.6 - 13}"'
           f' fill="none" stroke="{color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
           f'<path d="M{x + 10} {y + h - 15}H{x + w - 10}" stroke="{color}" stroke-width="5" stroke-linecap="round"/>']
    if disabled:
        out.append(f'<line x1="{x + 6}" y1="{y + h - 6}" x2="{x + w - 6}" y2="{y + 6}" stroke="{MUTED}" stroke-width="5" stroke-linecap="round"/>')
    return out


def _bubble(x, y, w, h=34, fill=PANEL):
    """A neutral message bubble drawn as a plain rounded bar - no invented sentence inside."""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h / 2}" fill="{fill}"/>'


def scene_browser(x):
    inner_w = COL_W - 2 * PAD
    body = [_bubble(0, 0, inner_w - 130, fill=PANEL),
            _bubble(0, 60, 150, fill=ACCENT_TINT),
            f'<rect x="0" y="{WIN_H - 52 - 2 * PAD - 50}" width="{inner_w}" height="50" rx="14" fill="#fff" stroke="{LINE}" stroke-width="2"/>',
            text(16, WIN_H - 52 - 2 * PAD - 17, "메시지를 입력하세요", 18, 500, MUTED, anchor="start")]
    out = [window(x, WIN_Y, COL_W, WIN_H, "browser", "claude.ai", f'<g transform="translate({PAD} {PAD})">{"".join(body)}</g>')]
    fw = 100
    fx = x + COL_W / 2 - fw / 2
    out.append(text(x + COL_W / 2, CAPTION_Y, "웹 (claude.ai)", 26, 800))
    out.append(folder(fx, ROW1_Y, fw))
    out.append(cross(fx + fw - 6, ROW1_Y + 6, 24))
    # the "!" badge sits on the crossed folder's lower-left, clear of the label above
    out.append(badge(fx - 4, ROW1_Y + fw * 0.775 + 6, "!"))
    out += _download_icon(x + COL_W / 2, ROW2_Y, disabled=True)
    out.append(text(x + COL_W / 2, ROW2_Y + 62 + 34, "불필요", 26, 800, MUTED))
    return out


def scene_app(x):
    inner_w = COL_W - 2 * PAD
    sidebar_w = 130
    list_x = sidebar_w + 20
    body = [f'<rect x="0" y="0" width="{sidebar_w}" height="{WIN_H - 52 - 2 * PAD}" rx="10" fill="#f4f6f8"/>',
            text(16, 26, "최근 대화", 18, 700, INK, anchor="start"),
            _bubble(list_x, 10, inner_w - list_x, fill=ACCENT_TINT),
            f'<rect x="{list_x}" y="{WIN_H - 52 - 2 * PAD - 50}" width="{inner_w - list_x}" height="50" rx="14" fill="#fff" stroke="{LINE}" stroke-width="2"/>',
            text(list_x + 16, WIN_H - 52 - 2 * PAD - 17, "메시지를 입력하세요", 18, 500, MUTED, anchor="start")]
    out = [window(x, WIN_Y, COL_W, WIN_H, "app", "Claude", f'<g transform="translate({PAD} {PAD})">{"".join(body)}</g>')]
    fw = 100
    fx = x + COL_W / 2 - fw / 2
    out.append(text(x + COL_W / 2, CAPTION_Y, "데스크톱 앱", 26, 800))
    out.append(folder(fx, ROW1_Y, fw))
    out.append(check(fx + fw - 6, ROW1_Y + 6, 24))
    out += _download_icon(x + COL_W / 2, ROW2_Y)
    out.append(text(x + COL_W / 2, ROW2_Y + 62 + 34, "필요", 26, 800, MUTED))
    return out


def scene_terminal(x):
    inner_w = COL_W - 2 * PAD
    body = [text(0, 26, "$ claude", 20, 700, GREEN, anchor="start", family=MONO),
            mascot(inner_w - 110, 4, 0.4, fill=MASCOT)]
    out = [window(x, WIN_Y, COL_W, WIN_H, "terminal", "VS Code - 터미널", f'<g transform="translate({PAD} {PAD})">{"".join(body)}</g>')]
    fw = 100
    fx = x + COL_W / 2 - fw / 2
    out.append(text(x + COL_W / 2, CAPTION_Y, "CLI (VS Code)", 26, 800))
    out.append(folder(fx, ROW1_Y, fw))
    out.append(check(fx + fw - 6, ROW1_Y + 6, 24))
    out += _download_icon(x + COL_W / 2, ROW2_Y)
    out.append(text(x + COL_W / 2, ROW2_Y + 62 + 34, "필요", 26, 800, MUTED))
    return out


b = [panel()]
b.append(text(LABEL_X, ROW1_Y + 30, "내 컴퓨터", 28, 800, anchor="start"))
b.append(text(LABEL_X, ROW1_Y + 66, "폴더", 28, 800, anchor="start"))
b.append(text(LABEL_X, ROW2_Y + 38, "설치", 28, 800, anchor="start"))
for fn, x in zip([scene_browser, scene_app, scene_terminal], COLS):
    b += fn(x)

print(save("s8-claude-three-ways.svg", b, "8/40 웹 · 데스크톱 앱 · CLI (tools/illus/s8_claude_three_ways.py)"))
