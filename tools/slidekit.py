# -*- coding: utf-8 -*-
"""슬라이드 SVG 조립 도구.

새 슬라이드를 만들 때 좌표를 손으로 베끼지 않기 위한 모듈이다.
프레임(배지·제목·부제·각주)과 자주 쓰는 블록을 함수로 제공한다.

쓰는 법 — tools/ 옆에서 파이썬 스크립트를 하나 만들고:

    import sys; sys.path.insert(0, 'tools')
    from slidekit import Slide, terminal, check_rows

    s = Slide('BASIC 01', 'STEP 5', '제목', '한 줄 설명', '각주')
    s.add(terminal(y=292, height=240, lines=[
        ('PS C:\\\\...> ', 'codex --version', 'cmd'),
        ('codex-cli 0.154.0', None, 'ok'),
    ]))
    s.save('assets/basic/step01/새_슬라이드.svg')

좌표계는 1280x720 고정. 본문은 y=168 부터 y=636 까지 쓴다.
"""

import math

W, H = 1280, 720
BODY_TOP, BODY_BOTTOM = 168, 636

# 색 — 새 색을 도입하지 말고 여기서 고른다
INK        = '#0a0a0a'
MUTED      = '#6b7280'
FAINT      = '#9ca3af'
LINE       = '#e2e8f0'
PANEL_BG   = '#f8fafc'
DARK       = '#1f2937'
DARK_RULE  = '#374151'
CODE       = '#a5f3fc'
BLUE       = '#2563eb'
BLUE_DEEP  = '#1d4ed8'
BLUE_BG    = '#eff6ff'
BLUE_EDGE  = '#bfdbfe'
OK         = '#4ade80'
OK_DEEP    = '#15803d'
OK_BG      = '#f0fdf4'
OK_EDGE    = '#bbf7d0'
WARN       = '#fbbf24'
WARN_DEEP  = '#92400e'
WARN_BG    = '#fffbeb'
WARN_EDGE  = '#fcd34d'
BAD        = '#f87171'
CYAN       = '#67e8f9'

SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(s):
    """SVG 텍스트로 넣기 전에 반드시 통과시킨다."""
    return (str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))


def text(x, y, s, size=14, fill=INK, weight='400', mono=False,
         anchor=None, spacing=None, raw=False):
    a = f' text-anchor="{anchor}"' if anchor else ''
    ls = f' letter-spacing="{spacing}"' if spacing else ''
    fam = MONO if mono else SANS
    body = s if raw else esc(s)
    return (f'  <text x="{x}" y="{y}"{a} font-family="{fam}" font-size="{size}" '
            f'font-weight="{weight}" fill="{fill}"{ls}>{body}</text>')


def rect(x, y, w, h, fill, rx=0, stroke=None, sw=1.5):
    st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ''
    r = f' rx="{rx}"' if rx else ''
    return f'  <rect x="{x}" y="{y}" width="{w}" height="{h}"{r} fill="{fill}"{st}/>'


class Slide:
    """프레임을 갖춘 슬라이드 한 장."""

    def __init__(self, badge, step, title, subtitle=None, footnote=None):
        self.badge, self.step = badge, step
        self.title, self.subtitle, self.footnote = title, subtitle, footnote
        self.body = []

    def add(self, chunk):
        self.body.append(chunk if isinstance(chunk, str) else '\n'.join(chunk))
        return self

    def render(self):
        o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
             f'viewBox="0 0 {W} {H}">',
             rect(0, 0, W, H, '#ffffff'),
             rect(60, 44, 78, 24, '#171717', rx=12),
             text(99, 60, self.badge, 11, '#fafafa', '600', anchor='middle', spacing='0.8')]
        if self.step:
            o.append(rect(150, 44, 66, 24, '#f3f4f6', rx=12, stroke='#d1d5db', sw=1))
            o.append(text(183, 60, self.step, 11, MUTED, '600', anchor='middle'))
        o.append(text(60, 100, self.title, 26, INK, '800', spacing='-0.02em'))
        if self.subtitle:
            o.append(text(60, 140, self.subtitle, 15, MUTED))
        o += self.body
        if self.footnote:
            o.append(text(640, 672, self.footnote, 13, FAINT, anchor='middle'))
        o.append('</svg>')
        return '\n'.join(o) + '\n'

    def save(self, path):
        import xml.dom.minidom
        svg = self.render()
        with open(path, 'w', encoding='utf-8') as f:
            f.write(svg)
        xml.dom.minidom.parse(path)      # 깨진 XML 을 여기서 잡는다
        print('생성:', path)
        return path


def terminal(y, height, lines, x=60, width=1160, gap=28, pad=32, start=38):
    """어두운 터미널 패널.

    lines 는 (텍스트, 색) 또는 (텍스트, 색, 크기) 튜플의 리스트.
    색에 None 을 주면 기본 회색. 구분선은 ('--', None) 으로 넣는다.
    """
    o = [rect(x, y, width, height, DARK, rx=10)]
    yy = y + start
    for item in lines:
        s, col = item[0], item[1]
        size = item[2] if len(item) > 2 else 15
        if s == '--':
            o.append(f'  <line x1="{x+32}" y1="{yy-10}" x2="{x+width-32}" y2="{yy-10}" '
                     f'stroke="{DARK_RULE}" stroke-dasharray="4 4"/>')
            yy += gap - 8
            continue
        o.append(text(x + pad, yy, s, size, col or '#e5e7eb', mono=True))
        yy += gap
    return o


def check_rows(y, rows, x=92, gap=42, size=16):
    """[v] / [!] / [ ] 결과 줄. rows 는 (마크, 이름, 메시지, 색)."""
    o, yy = [], y
    for mark, name, msg, col in rows:
        o.append(text(x, yy, mark, size, col, '700', mono=True))
        o.append(text(x + 48, yy, name, size, col, '700', mono=True))
        o.append(text(x + 156, yy, msg, size, col, mono=True))
        yy += gap
    return o


def box(y, title, lines, kind='info', x=60, width=1160):
    """안내 상자. kind: info(파랑) / warn(노랑) / ok(초록) / plain(회색)."""
    tint = {'info': (BLUE_BG, BLUE_EDGE, BLUE_DEEP, '#1e40af'),
            'warn': (WARN_BG, WARN_EDGE, WARN_DEEP, '#78350f'),
            'ok':   (OK_BG, OK_EDGE, OK_DEEP, '#166534'),
            'plain':(PANEL_BG, LINE, '#374151', MUTED)}[kind]
    h = 30 + (26 if title else 0) + 24 * len(lines)
    o = [rect(x, y, width, h, tint[0], rx=12, stroke=tint[1])]
    yy = y + 30
    if title:
        o.append(text(x + 28, yy, title, 14, tint[2], '700'))
        yy += 26
    for ln in lines:
        o.append(text(x + 28, yy, ln, 13, tint[3]))
        yy += 24
    return o


def two_col(y, left, right, height=300):
    """Windows / macOS 2열. left·right 는 (제목, [코드줄], 설명)."""
    o = []
    for x, tint_bg, tint_fg, data in (
            (60,  '#f3f4f6', '#374151', left),
            (660, '#f5f3ff', '#6d28d9', right)):
        label, code, note = data
        o.append(rect(x, y, 560, height, '#ffffff', rx=12, stroke='#d1d5db'))
        o.append(rect(x, y, 560, 48, tint_bg, rx=12))
        o.append(rect(x, y + 34, 560, 14, tint_bg))
        o.append(text(x + 28, y + 29, label, 14, tint_fg, '700'))
        ch = 34 + 24 * len(code)
        o.append(rect(x + 24, y + 72, 512, ch, DARK, rx=8))
        yy = y + 100
        for ln in code:
            o.append(text(x + 44, yy, ln, 12.5, CODE, mono=True))
            yy += 24
        if note:
            o.append(text(x + 24, y + 72 + ch + 34, note, 13, '#4b5563'))
    return o


def section(y, label, x=60):
    """본문 구역 제목 (작은 회색 라벨)."""
    return [text(x, y, label, 13, FAINT, '700', spacing='0.08em')]


# ── VS Code 창 목업 ─────────────────────────────────────────────
# 1회차 실습 슬라이드들이 쓰는 그 창이다. 직접 그리지 말고 이 함수를 쓴다.

def vscode(title='에이전트1 — Visual Studio Code', tree=None, tab=None,
           editor=None, term_label='TERMINAL', term=None, panel_right=True):
    """VS Code 창 한 벌.

    tree   : [(깊이, 이름, 종류, 강조)]  종류 = 'folder' | 'file'
             깊이 0 = 루트. 강조 True 면 파란 선택 막대가 깔린다.
    tab    : 편집기 탭에 뜰 파일 이름 (None 이면 편집기 영역이 빈다)
    editor : 편집기 본문 [(줄번호, 텍스트, 색)]
    term   : 터미널 본문 [(텍스트, 색, 크기)] — 색·크기는 생략 가능
    """
    o = [rect(60, 175, 1160, 472, '#1e1e1e', rx=10, stroke='#333333'),
         '  <path d="M60 185a10 10 0 0 1 10-10h1140a10 10 0 0 1 10 10v22H60z" fill="#2d2d2d"/>',
         '  <circle cx="82" cy="191" r="5.5" fill="#ef4444"/>',
         '  <circle cx="100" cy="191" r="5.5" fill="#f59e0b"/>',
         '  <circle cx="118" cy="191" r="5.5" fill="#22c55e"/>',
         text(640, 195, title, 12, '#cccccc', '500', anchor='middle')]
    if panel_right:
        o.append(rect(1086, 181, 118, 20, '#383838', rx=4, stroke='#484848', sw=1))
        o.append(text(1145, 195, '⊞ Panel: Right', 10.5, '#38bdf8', '600', anchor='middle'))
    # 액티비티 바
    o += [rect(60, 207, 46, 415, '#252526'),
          '  <line x1="106" y1="207" x2="106" y2="622" stroke="#2b2b2b" stroke-width="1"/>',
          rect(60, 217, 2.5, 28, '#007acc'),
          '  <path d="M76 223h12v15H76z" fill="none" stroke="#ffffff" stroke-width="1.6"/>',
          '  <path d="M79 220h12v15H79z" fill="none" stroke="#ffffff" stroke-width="1.6"/>',
          '  <circle cx="82" cy="265" r="5.5" fill="none" stroke="#858585" stroke-width="1.6"/>',
          '  <line x1="86" y1="269" x2="91" y2="274" stroke="#858585" stroke-width="1.8" stroke-linecap="round"/>']
    # 탐색기
    o += [rect(106, 207, 224, 415, '#1e1e1e'),
          '  <line x1="330" y1="207" x2="330" y2="622" stroke="#2b2b2b" stroke-width="1"/>',
          text(124, 229, 'EXPLORER', 11, '#999999', '700', spacing='0.6')]
    y = 253
    for depth, name, kind, hot in (tree or []):
        x = 124 + depth * 14
        if hot:
            o.append(rect(112, y - 15, 208, 22, '#094771', rx=3))
        if kind == 'folder':
            o.append(f'  <path d="M{x+4} {y-9}l3 3-3 3" fill="none" stroke="#cccccc" stroke-width="1.3"/>')
            o.append(f'  <path d="M{x+14} {y-12}h6l2 2h5v7h-13z" fill="#dcb67a"/>')
        else:
            o.append(f'  <path d="M{x+14} {y-11}h7l2 2v7h-9z" fill="#38bdf8" opacity="0.85"/>')
        o.append(text(x + 32, y, name, 11.5, '#ffffff' if hot else '#e5e7eb',
                      '700' if kind == 'folder' or hot else '400'))
        y += 25
    # 편집기
    o += [rect(330, 207, 410, 415, '#1e1e1e'),
          '  <line x1="740" y1="207" x2="740" y2="622" stroke="#2b2b2b" stroke-width="1"/>',
          rect(330, 207, 410, 31, '#252526')]
    if tab:
        o += [rect(330, 207, 160, 31, '#1e1e1e'), rect(330, 207, 160, 2, '#007acc'),
              '  <path d="M344 219h7l2 2v7h-9z" fill="#38bdf8" opacity="0.9"/>',
              text(359, 226, tab, 11.5, '#ffffff')]
    o.append('  <line x1="330" y1="238" x2="740" y2="238" stroke="#2b2b2b" stroke-width="1"/>')
    yy = 265
    for n, s, col in (editor or []):
        o.append(text(345, yy, n, 12, '#6e7681', mono=True))
        o.append(text(368, yy, s, 12, col or '#e6edf3', mono=True))
        yy += 26
    # 터미널
    o += [rect(740, 207, 480, 415, '#181818'), rect(740, 207, 480, 31, '#252526'),
          '  <line x1="740" y1="238" x2="1220" y2="238" stroke="#2b2b2b" stroke-width="1"/>',
          text(758, 226, term_label, 11, '#ffffff', '700', spacing='0.5'),
          rect(756, 236, 62, 2, '#007acc'),
          text(836, 226, 'OUTPUT', 11, '#858585'),
          text(898, 226, 'PORTS', 11, '#858585')]
    yy = 266
    for item in (term or []):
        s = item[0]
        col = item[1] if len(item) > 1 else None
        size = item[2] if len(item) > 2 else 12
        o.append(text(758, yy, s, size, col or '#e5e7eb', mono=True))
        yy += 22
    # 상태바
    o += ['  <path d="M60 622h1160v15a10 10 0 0 1-10 10H70a10 10 0 0 1-10-10z" fill="#007acc"/>',
          text(74, 638, '⑂ main*', 11, '#ffffff', '500'),
          text(910, 638, 'PowerShell', 11, '#ffffff')]
    return o


# ── 흐름·카드 공통 블록 ──────────────────────────────────────────
# 2회차 슬라이드들이 공유한다. 파트별 생성 스크립트에서 따로 정의하지 말 것.

TINTS = {
    'info':  (BLUE_BG, BLUE_EDGE, BLUE_DEEP),
    'ok':    (OK_BG, OK_EDGE, OK_DEEP),
    'warn':  (WARN_BG, WARN_EDGE, WARN_DEEP),
    'plain': (PANEL_BG, LINE, '#374151'),
}


def flow_row(y, steps, height=120, x=60, width=1160, gap=44):
    """가로 흐름도. steps = [(라벨, [설명줄], kind)]. kind 는 TINTS 키."""
    n = len(steps)
    bw = (width - gap * (n - 1)) / n
    o = []
    cx = x
    for i, (label, sub, kind) in enumerate(steps):
        bg, edge, fg = TINTS[kind]
        o.append(rect(cx, y, bw, height, bg, rx=14, stroke=edge))
        cy = y + (height / 2 - 10 if sub else height / 2 + 6)
        o.append(text(cx + bw / 2, cy, label, 16.5, fg, '800', anchor='middle'))
        if sub:
            yy = y + height / 2 + 18
            for ln in sub:
                o.append(text(cx + bw / 2, yy, ln, 12.5, fg, '500', anchor='middle'))
                yy += 19
        if i < n - 1:
            ax1 = cx + bw + 10
            ax2 = cx + bw + gap - 10
            midy = y + height / 2
            o.append(f'  <line x1="{ax1}" y1="{midy}" x2="{ax2-9}" y2="{midy}" '
                     f'stroke="{MUTED}" stroke-width="2.5"/>')
            o.append(f'  <path d="M{ax2-13} {midy-7}L{ax2} {midy}L{ax2-13} {midy+7}Z" '
                     f'fill="{MUTED}"/>')
        cx += bw + gap
    return o


def down_arrow(x, y1, y2, label=None, color=BLUE_DEEP):
    """세로 아래 방향 화살표. label 은 화살표 오른쪽에 붙는다."""
    o = [f'  <line x1="{x}" y1="{y1}" x2="{x}" y2="{y2-11}" '
         f'stroke="{color}" stroke-width="2.5"/>',
         f'  <path d="M{x-7} {y2-15}L{x} {y2}L{x+7} {y2-15}Z" fill="{color}"/>']
    if label:
        o.append(text(x + 18, (y1 + y2) / 2 + 5, label, 13.5, color, '700', mono=True))
    return o


def card(x, y, w, h, tag, tagcol, title, lines):
    """윗면에 색 띠가 있는 흰 카드. tagcol 은 TINTS 키."""
    tint = TINTS[tagcol]
    o = [rect(x, y, w, h, '#ffffff', rx=12, stroke='#d1d5db'),
         rect(x, y, w, 8, tint[2], rx=0),
         text(x + 24, y + 40, tag, 12, tint[2], '700', spacing='0.06em'),
         text(x + 24, y + 70, title, 19, INK, '800')]
    yy = y + 102
    for ln in lines:
        o.append(text(x + 24, yy, ln, 13.5, '#4b5563'))
        yy += 22
    return o


def arrow(x1, y1, x2, y2, color=BLUE_DEEP, sw=3, dashed=False, head=15):
    """임의 각도 화살표. 드래그 & 드롭처럼 '무엇을 어디로' 를 보여줄 때 쓴다."""
    ang = math.atan2(y2 - y1, x2 - x1)
    bx, by = x2 - head * math.cos(ang), y2 - head * math.sin(ang)
    px, py = -math.sin(ang) * head * 0.46, math.cos(ang) * head * 0.46
    dash = ' stroke-dasharray="8 6"' if dashed else ''
    return [f'  <line x1="{x1:.1f}" y1="{y1:.1f}" x2="{bx:.1f}" y2="{by:.1f}" '
            f'stroke="{color}" stroke-width="{sw}" stroke-linecap="round"{dash}/>',
            f'  <path d="M{bx+px:.1f} {by+py:.1f}L{x2:.1f} {y2:.1f}'
            f'L{bx-px:.1f} {by-py:.1f}Z" fill="{color}"/>']


def callout(x, y, label, color=BLUE_DEEP, size=15, anchor=None):
    """화면 위에 겹쳐 붙이는 파란 설명 꼬리표 (← 여기를 클릭 같은 것)."""
    return [text(x, y, label, size, color, '700', anchor=anchor)]


def prompt_bar(x, y, value, width=460, hint=None, color=CODE):
    """Claude 입력줄. 학생이 실제로 칠 프롬프트를 보여줄 때 쓴다."""
    o = [rect(x, y, width, 40, '#0f172a', rx=8, stroke='#334155', sw=1.5),
         text(x + 16, y + 26, '>', 14, OK, '700', mono=True),
         text(x + 34, y + 26, value, 13, color, mono=True)]
    if hint:
        o.append(text(x, y + 62, hint, 13, MUTED))
    return o


def rename_rows(y, rows, x=60, width=1160, gap=38, size=14):
    """파일명 before → after 대비. rows = (전, 후, 설명 또는 None)."""
    o = []
    yy = y
    for before, after, note in rows:
        o.append(rect(x, yy - 22, width, 32, PANEL_BG, rx=6))
        o.append(text(x + 20, yy, before, size, MUTED, mono=True))
        o.append(text(x + 360, yy, '→', size, FAINT, '700'))
        o.append(text(x + 396, yy, after, size, OK_DEEP, '700', mono=True))
        if note:
            o.append(text(x + 820, yy, note, size - 1.5, MUTED))
        yy += gap
    return o
