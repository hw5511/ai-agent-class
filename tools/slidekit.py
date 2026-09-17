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
