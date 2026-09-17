# -*- coding: utf-8 -*-
"""BASIC 02 · STEP 4 · Write 툴 구간 슬라이드 14장 생성.

md → svg → html → python(tkinter) 순서로 "말 한 줄이 파일이 되는" 과정을
한 단계 = 한 슬라이드로 쪼개서 보여준다. 좌표는 손으로 만들지 않고
tools/slidekit.py 함수만 쓴다.

주의: assets/basic/step02/slides.json, courses/basic/step02.json 은 이
스크립트가 건드리지 않는다 — 배선은 다른 곳에서 한다.
"""
import sys
sys.path.insert(0, 'tools')
from slidekit import (
    Slide, vscode, terminal, check_rows, box, two_col, section,
    text, rect, flow_row, down_arrow, card, arrow, callout,
    prompt_bar, rename_rows, drag_chip, notification, TINTS,
    OK, OK_DEEP, OK_BG, OK_EDGE, BAD, WARN, WARN_DEEP, WARN_BG, WARN_EDGE,
    CYAN, CODE, DARK, BLUE, BLUE_DEEP, BLUE_BG, BLUE_EDGE,
    MUTED, FAINT, INK, PANEL_BG, LINE,
)

BADGE = 'BASIC 02'
STEP = 'STEP 4'
OUT = 'assets/basic/step02/'


def save(name, s):
    s.save(OUT + name)


# ── 공용 그림 부품 ──────────────────────────────────────────────────

def dog_bike(cx, wheel_y, scale=1.0):
    """자전거 탄 강아지 — 원 두 개(바퀴) + 몸통 + 귀만 쓰는 아주 단순한 그림.
    slide 7(svg 결과)·slide 10(html 포스터)이 같은 모양을 크기만 바꿔 재사용한다.
    """
    def sc(v):
        return v * scale
    wr = sc(46)
    wx1, wx2 = cx - sc(80), cx + sc(80)
    wy = wheel_y
    o = [f'  <circle cx="{wx1:.0f}" cy="{wy:.0f}" r="{wr:.0f}" fill="none" '
         f'stroke="{BLUE_DEEP}" stroke-width="{max(2, sc(4)):.1f}"/>',
         f'  <circle cx="{wx2:.0f}" cy="{wy:.0f}" r="{wr:.0f}" fill="none" '
         f'stroke="{BLUE_DEEP}" stroke-width="{max(2, sc(4)):.1f}"/>']
    o.append(rect(wx1 - sc(6), wy - sc(30), (wx2 - wx1) + sc(12), sc(14), MUTED, rx=sc(4)))
    body_cy = wy - sc(56)
    body_r = sc(44)
    o.append(f'  <circle cx="{cx:.0f}" cy="{body_cy:.0f}" r="{body_r:.0f}" '
              f'fill="{WARN_BG}" stroke="{WARN_EDGE}" stroke-width="2"/>')
    head_cy = body_cy - sc(70)
    head_r = sc(28)
    o.append(f'  <circle cx="{cx:.0f}" cy="{head_cy:.0f}" r="{head_r:.0f}" '
              f'fill="{WARN_BG}" stroke="{WARN_EDGE}" stroke-width="2"/>')
    o.append(f'  <path d="M{cx-sc(20):.0f} {head_cy-sc(18):.0f} '
              f'L{cx-sc(30):.0f} {head_cy-sc(42):.0f} '
              f'L{cx-sc(6):.0f} {head_cy-sc(24):.0f} Z" fill="{WARN_EDGE}"/>')
    o.append(f'  <path d="M{cx+sc(20):.0f} {head_cy-sc(18):.0f} '
              f'L{cx+sc(30):.0f} {head_cy-sc(42):.0f} '
              f'L{cx+sc(6):.0f} {head_cy-sc(24):.0f} Z" fill="{WARN_EDGE}"/>')
    o.append(f'  <circle cx="{cx+sc(44):.0f}" cy="{body_cy-sc(6):.0f}" '
              f'r="{sc(8):.0f}" fill="{WARN_EDGE}"/>')
    return o


def win_chrome(x, y, w, h, title, bg='#f3f4f6'):
    """작은 OS 창 목업 — 제목바 + 신호등 3개. 계산기·테트리스 창에 쓴다."""
    return [rect(x, y, w, h, bg, rx=10, stroke='#d1d5db', sw=1.5),
            rect(x, y, w, 30, '#e5e7eb', rx=10),
            rect(x, y + 20, w, 10, '#e5e7eb'),
            f'  <circle cx="{x+18}" cy="{y+15}" r="5.5" fill="#ef4444"/>',
            f'  <circle cx="{x+34}" cy="{y+15}" r="5.5" fill="#f59e0b"/>',
            f'  <circle cx="{x+50}" cy="{y+15}" r="5.5" fill="#22c55e"/>',
            text(x + w / 2, y + 19, title, 12, MUTED, '600', anchor='middle')]


# ── 1. write_툴_이란 ──────────────────────────────────────────────
s = Slide(BADGE, STEP, 'Write 툴이란?',
          'Read 가 파일을 읽는 도구였다면, Write 는 파일을 새로 만드는 도구입니다',
          '이제부터는 없던 파일을 새로 만드는 실습입니다')
s.add(section(190, '오늘까지 배운 것 vs 오늘 배울 것'))
s.add(card(60, 210, 552, 170, 'REVIEW', 'plain', 'Read 툴',
           ['파일을 열어서', '내용을 확인했습니다']))
s.add(card(668, 210, 552, 170, 'NEW', 'info', 'Write 툴',
           ['없던 파일을 새로', '만들어 써 넣습니다']))
s.add(section(412, '이렇게 동작합니다'))
s.add(flow_row(434, [
    ('말로 지시', ['"~파일을 만들어줘"'], 'info'),
    ('Claude 가 파일 작성', ['Write 툴을 호출합니다'], 'ok'),
    ('폴더에 파일이 생김', ['탐색기에 바로 보입니다'], 'ok'),
], height=140))
save('write_툴_이란.svg', s)


# ── 2. write_md_란 ────────────────────────────────────────────────
s = Slide(BADGE, STEP, 'md 파일이 뭔가요?',
          '메모장과 비교하면 쉽습니다 — 글의 구조를 표시하는 약속이 있는 메모장입니다',
          None)
s.add(two_col(
    y=210,
    left=('메모장 (.txt)',
          ['오늘 회의 정리', '', '매출 12% 증가', '신제품 5월 출시'],
          '그냥 줄글입니다 — 제목·목록 구분이 파일 안에 없습니다'),
    right=('마크다운 (.md)',
           ['# 오늘 회의 정리', '', '- 매출 12% 증가', '- 신제품 5월 출시'],
           '# 은 제목, - 은 목록 — 구조를 기호로 표시합니다'),
    height=300,
))
s.add(box(524, None, [
    '# 하나 = 큰 제목, - 하나 = 목록 항목 — 이런 기호 규칙을 "마크다운 문법"이라고 부릅니다.',
], kind='info'))
save('write_md_란.svg', s)


# ── 3. write_md_요청 ──────────────────────────────────────────────
s = Slide(BADGE, STEP, '자기소개서 만들기',
          '터미널 입력창에 요청을 한 줄로 적습니다',
          '다음 슬라이드에서 결과를 확인합니다')
s.add(section(210, '지금 입력하는 요청'))
s.add(prompt_bar(
    60, 250, '간단한 너의 자기소개서를 md 파일로 현재 폴더에 작성해줘',
    width=1160, hint='Enter 를 누르면 Claude 가 파일을 만듭니다',
))
s.add(box(360, None, [
    '"현재 폴더"는 지금 VS Code 로 열어놓은 agent1 폴더를 뜻합니다.',
], kind='plain'))
save('write_md_요청.svg', s)


# ── 4. write_md_결과 ──────────────────────────────────────────────
s = Slide(BADGE, STEP, '파일이 생겼습니다',
          'Write 툴이 자기소개서를 만들고, 탐색기에 새 파일이 나타납니다',
          'CLAUDE.md 로 정한 이름 "ㅇㅇ" 과 말투(~요→~용용)가 자기소개에 그대로 반영됩니다')
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False), (1, '자기소개.md', 'file', True)],
    tab='자기소개.md',
    editor=[
        (1, "# 안녕하세요, 'ㅇㅇ' 입니다", CYAN),
        (2, '', None),
        (3, '## 저는 이런 도우미예요', CYAN),
        (4, '- ai 에이전트 수업을 도와드려요', None),
        (5, "- 말투는 '~요'를 '~용용'으로 붙여요", None),
    ],
    term=[
        ('● Write(자기소개.md)', OK, 13),
        ('  └ 파일 생성 완료', MUTED, 11.5),
        ('--', None),
        ('자기소개서를 만들었어용용!', OK, 13),
    ],
))
save('write_md_결과.svg', s)


# ── 5. write_svg_란 ───────────────────────────────────────────────
s = Slide(BADGE, STEP, 'svg 가 뭔가요?',
          '사진과 다르게, svg 는 그림을 그리라고 적어둔 코드입니다',
          None)
s.add(two_col(
    y=210,
    left=('사진 (jpg · png)',
          ['●●●●●●●●●●', '●●●●●●●●●●', '점(픽셀)을 촘촘히 찍어 그림을 표현'],
          '확대하면 점이 흐려지고 그림이 깨집니다'),
    right=('벡터 그림 (svg)',
           ['<circle cx="60" cy="60" r="40"/>', '<rect x="10" y="70" width="80" height="20"/>'],
           '좌표와 도형을 적어둔 코드라 아무리 키워도 안 깨집니다'),
    height=300,
))
s.add(box(526, None, [
    '지금 보고 있는 이 강의 슬라이드들도 사실 전부 svg 파일로 그려져 있습니다.',
], kind='info'))
save('write_svg_란.svg', s)


# ── 6. write_svg_요청 ─────────────────────────────────────────────
s = Slide(BADGE, STEP, '강아지 그리기',
          'svg 코드로 그림을 그려달라고 요청합니다',
          '다음 슬라이드에서 실제로 그려진 모습을 확인합니다')
s.add(section(220, '지금 입력하는 요청'))
s.add(prompt_bar(
    60, 260, '자전거 타는 강아지를 svg 코드로 만들어줘',
    width=900, hint='Enter 를 누르면 Claude 가 좌표와 도형으로 그림을 그립니다',
))
s.add(box(362, None, [
    '그림 파일(jpg)이 만들어지는 게 아니라, 그림을 그리는 코드(svg)가 만들어집니다.',
], kind='plain'))
save('write_svg_요청.svg', s)


# ── 7. write_svg_결과 ─────────────────────────────────────────────
s = Slide(BADGE, STEP, '코드가 그림이 됩니다',
          'svg 코드 몇 줄이 그대로 그림으로 그려집니다',
          None)
CODE_X, CODE_Y, CODE_W, CODE_H = 60, 205, 480, 380
s.add(rect(CODE_X, CODE_Y, CODE_W, CODE_H, DARK, rx=10))
s.add(text(CODE_X + 24, CODE_Y + 30, '자전거_강아지.svg', 13, FAINT, '700', mono=True))
code_lines = [
    '<svg width="200" height="200">',
    '  <circle cx="50" cy="150" r="30"/>',
    '  <circle cx="150" cy="150" r="30"/>',
    '  <rect x="65" y="95" width="70" height="35"/>',
    '  <circle cx="100" cy="60" r="22"/>',
    '</svg>',
]
yy = CODE_Y + 68
for ln in code_lines:
    s.add(text(CODE_X + 24, yy, ln, 13, CODE, mono=True))
    yy += 26
CANVAS_X, CANVAS_Y, CANVAS_W, CANVAS_H = 620, 205, 560, 380
s.add(rect(CANVAS_X, CANVAS_Y, CANVAS_W, CANVAS_H, PANEL_BG, rx=12, stroke=LINE))
s.add(text(CANVAS_X + 20, CANVAS_Y + 30, '결과 — 브라우저가 그린 그림', 13, MUTED, '700'))
s.add(dog_bike(cx=CANVAS_X + CANVAS_W / 2, wheel_y=CANVAS_Y + 260, scale=1.0))
s.add(text(CANVAS_X + CANVAS_W / 2, CANVAS_Y + 350, '자전거 탄 강아지', 12, MUTED, anchor='middle'))
s.add(arrow(CODE_X + CODE_W + 12, CODE_Y + CODE_H / 2, CANVAS_X - 12, CANVAS_Y + CANVAS_H / 2))
save('write_svg_결과.svg', s)


# ── 8. write_html_란 ──────────────────────────────────────────────
s = Slide(BADGE, STEP, 'html 이 뭔가요?',
          '웹페이지를 적어두는 코드입니다 — 크롬으로 열면 그림처럼 보입니다',
          None)
s.add(section(200, '파일 자체는 글자, 여는 도구가 그림으로 바꿔줍니다'))
s.add(flow_row(230, [
    ('html 파일 작성', ['글자로 된 코드'], 'plain'),
    ('크롬으로 열기', ['더블클릭 또는 실행'], 'info'),
    ('웹페이지로 보임', ['우리가 아는 그 모습'], 'ok'),
], height=150))
s.add(box(410, None, [
    'html 파일을 메모장으로 열면 글자 코드가 보이고, 크롬(웹 브라우저)으로 열면',
    '우리가 아는 웹페이지 모습으로 그려집니다.',
], kind='info'))
save('write_html_란.svg', s)


# ── 9. write_html_요청 ────────────────────────────────────────────
s = Slide(BADGE, STEP, '포스터 만들기',
          '앞에서 만든 강아지 그림을 재료로 써서 포스터를 요청합니다',
          '방금 만든 svg 그림을 새로 그리지 않고 그대로 가져다 씁니다')
s.add(section(210, '지금 입력하는 요청'))
s.add(prompt_bar(
    60, 250, '그 강아지를 가지고 html 로 간단한 포스터를 만들어서 크롬으로 열어줘',
    width=1160, hint='Enter 를 누르면 Claude 가 html 파일을 만들고 크롬을 엽니다',
))
s.add(box(360, None, [
    '"그 강아지"는 앞에서 만든 svg 그림을 가리킵니다 — 있는 그림을 재료로 쓰는 것입니다.',
], kind='plain'))
save('write_html_요청.svg', s)


# ── 10. write_html_결과 ───────────────────────────────────────────
s = Slide(BADGE, STEP, '크롬이 열립니다',
          '만들어진 html 파일을 크롬이 자동으로 열어 보여줍니다',
          None)
s.add(terminal(y=205, height=280, x=60, width=460, lines=[
    ('● Write(poster.html)', OK, 14),
    ('  └ 파일 생성 완료', MUTED, 12),
    ('--', None),
    ('● Bash(start poster.html)', OK, 14),
    ('  └ 크롬으로 열었습니다', MUTED, 12),
    ('--', None),
    ('포스터가 열렸어용용!', OK, 13),
]))
BW_X, BW_Y, BW_W = 560, 205, 600
s.add(rect(BW_X, BW_Y, BW_W, 380, '#ffffff', rx=10, stroke='#d1d5db', sw=1.5))
s.add(rect(BW_X, BW_Y, BW_W, 30, '#f3f4f6', rx=10))
s.add(rect(BW_X, BW_Y + 20, BW_W, 10, '#f3f4f6'))
s.add(rect(BW_X + 16, BW_Y + 5, 160, 20, '#ffffff', rx=6, stroke=LINE, sw=1))
s.add(text(BW_X + 96, BW_Y + 20, 'poster.html', 11, MUTED, '600', anchor='middle'))
s.add(rect(BW_X, BW_Y + 30, BW_W, 26, '#f8fafc'))
s.add(rect(BW_X + 16, BW_Y + 35, BW_W - 32, 16, '#ffffff', rx=8, stroke=LINE, sw=1))
s.add(text(BW_X + 30, BW_Y + 47, 'file:///agent1/poster.html', 10.5, MUTED, mono=True))
s.add(rect(BW_X, BW_Y + 56, BW_W, 324, '#ffffff'))
s.add(text(BW_X + BW_W / 2, BW_Y + 95, '강아지 자전거 포스터', 18, INK, '800', anchor='middle'))
s.add(dog_bike(cx=BW_X + BW_W / 2, wheel_y=BW_Y + 255, scale=0.55))
s.add(text(BW_X + BW_W / 2, BW_Y + 330, 'Write 툴로 만든 나만의 포스터', 12, MUTED, anchor='middle'))
save('write_html_결과.svg', s)


# ── 11. write_python_란 ───────────────────────────────────────────
s = Slide(BADGE, STEP, '이번엔 프로그램',
          '문서·그림·웹페이지에 이어, 이번엔 실행되는 프로그램을 만듭니다',
          None)
s.add(flow_row(200, [
    ('지금까지', ['문서(md) · 그림(svg) · 웹페이지(html)'], 'plain'),
    ('이번엔', ['눌러서 실행하는 프로그램'], 'info'),
], height=140))
s.add(section(362, '이번에 새로 쓰는 두 가지'))
s.add(card(60, 384, 552, 170, '언어', 'info', '파이썬 (Python)',
           ['프로그램을 만들 때 쓰는', '프로그래밍 언어입니다']))
s.add(card(668, 384, 552, 170, '도구', 'ok', 'tkinter',
           ['파이썬으로 창이 뜨는', '프로그램을 만들 때 쓰는 도구입니다']))
save('write_python_란.svg', s)


# ── 12. write_계산기_요청 ─────────────────────────────────────────
s = Slide(BADGE, STEP, '계산기 만들기',
          '파이썬과 tkinter 로 계산기 프로그램을 요청합니다',
          '버전 번호는 예시입니다 — 내 화면에 뜨는 숫자를 씁니다')
s.add(section(200, '지금 입력하는 요청'))
s.add(prompt_bar(
    60, 222, '파이썬과 tkinter 를 설치해서 간단한 계산기 프로그램 만들어줘',
    width=1160, hint=None,
))
s.add(section(300, '맥(macOS)은 한 가지가 더 필요합니다'))
s.add(two_col(
    y=324,
    left=('Windows',
          ['위 프롬프트 그대로', '입력하면 됩니다', '', '설치부터 실행까지', '한 번에 진행됩니다'],
          '추가로 할 일이 없습니다'),
    right=('macOS',
           ['① python3 --version 으로', '   파이썬 버전 확인', '② 그 버전에 맞는 tk 설치',
            '   예: 3.12 → brew install python-tk@3.12'],
           '이 내용을 프롬프트에 같이 적어주면 됩니다'),
    height=290,
))
save('write_계산기_요청.svg', s)


# ── 13. write_계산기_결과 ─────────────────────────────────────────
s = Slide(BADGE, STEP, '창이 뜹니다',
          'tkinter 창에 계산기 프로그램이 열립니다',
          '이 창은 실제로 마우스로 눌러서 계산할 수 있는 진짜 프로그램입니다')
s.add(terminal(y=205, height=280, x=60, width=380, lines=[
    ('● Write(calculator.py)', OK, 13),
    ('  └ 파일 생성 완료', MUTED, 11.5),
    ('--', None),
    ('● Bash(python calculator.py)', OK, 13),
    ('  └ 계산기 창이 열렸습니다', MUTED, 11.5),
]))
WIN_X, WIN_Y, WIN_W, WIN_H = 480, 195, 400, 420
s.add(win_chrome(WIN_X, WIN_Y, WIN_W, WIN_H, '계산기'))
s.add(rect(WIN_X + 16, WIN_Y + 44, WIN_W - 32, 64, '#ffffff', rx=8, stroke=LINE))
s.add(text(WIN_X + WIN_W - 32, WIN_Y + 88, '0', 26, INK, '700', anchor='end', mono=True))
rows = [['7', '8', '9', '÷'], ['4', '5', '6', '×'], ['1', '2', '3', '−'], ['0', '.', '=', '+']]
for r, row in enumerate(rows):
    for c, label in enumerate(row):
        bx = WIN_X + 16 + c * 94
        by = 319 + r * 72
        if label in '÷×−+':
            bg, edge, fg = BLUE_BG, BLUE_EDGE, BLUE_DEEP
        elif label == '=':
            bg, edge, fg = OK_BG, OK_EDGE, OK_DEEP
        else:
            bg, edge, fg = '#ffffff', LINE, INK
        s.add(rect(bx, by, 86, 64, bg, rx=8, stroke=edge, sw=1.5))
        s.add(text(bx + 43, by + 40, label, 18, fg, '700', anchor='middle'))
save('write_계산기_결과.svg', s)


# ── 14. write_테트리스 ────────────────────────────────────────────
s = Slide(BADGE, STEP, '같은 방식으로 테트리스',
          '말 한 줄로 이번엔 테트리스 게임을 만들어봅니다',
          '다음 시간이 아니라 지금, 말 한 줄로 프로그램이 만들어졌습니다 — 다음은 Edit 로 이 테트리스를 고쳐봅니다')
s.add(section(196, '지금 입력하는 요청'))
s.add(prompt_bar(
    60, 218, '같은 방식으로 간단한 테트리스 만들어줘',
    width=900, hint='계산기와 똑같은 방식 — 파이썬과 tkinter 로 창이 뜨는 프로그램을 만듭니다',
))
s.add(section(320, '실행 결과'))
s.add(terminal(y=344, height=220, x=60, width=360, lines=[
    ('● Write(tetris.py)', OK, 13),
    ('  └ 파일 생성 완료', MUTED, 11.5),
    ('--', None),
    ('● Bash(python tetris.py)', OK, 13),
    ('  └ 테트리스 창이 열렸습니다', MUTED, 11.5),
]))
TX, TY, TW, TH = 460, 308, 300, 318
s.add(win_chrome(TX, TY, TW, TH, '테트리스'))
s.add(text(TX + 20, TY + 58, '점수: 0', 14, INK, '700'))
CELL = 24
GX, GY, COLS, ROWS = TX + 20, TY + 78, 10, 10
for i in range(COLS + 1):
    xx = GX + i * CELL
    s.add(f'  <line x1="{xx}" y1="{GY}" x2="{xx}" y2="{GY+ROWS*CELL}" stroke="{LINE}" stroke-width="1"/>')
for j in range(ROWS + 1):
    yy2 = GY + j * CELL
    s.add(f'  <line x1="{GX}" y1="{yy2}" x2="{GX+COLS*CELL}" y2="{yy2}" stroke="{LINE}" stroke-width="1"/>')
for (c, r) in [(4, 0), (5, 0), (4, 1), (5, 1)]:
    s.add(rect(GX + c * CELL, GY + r * CELL, CELL, CELL, BLUE_BG, stroke=BLUE_EDGE, sw=1.5))
for c in [0, 1, 2, 3, 4, 5, 6]:
    s.add(rect(GX + c * CELL, GY + 9 * CELL, CELL, CELL, WARN_BG, stroke=WARN_EDGE, sw=1.5))
for c in [1, 2, 5, 6, 7]:
    s.add(rect(GX + c * CELL, GY + 8 * CELL, CELL, CELL, OK_BG, stroke=OK_EDGE, sw=1.5))
save('write_테트리스.svg', s)


print('전부 완료: 14장 생성')
