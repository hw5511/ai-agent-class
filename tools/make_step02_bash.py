# -*- coding: utf-8 -*-
"""BASIC 02 · STEP 6 · "Bash 툴" 파트 슬라이드 14장 생성.

1회차에서 우리가 손으로 치던 터미널 명령어를 Claude 가 대신 쓰는 Bash 툴을
다룬다. 한 단계 = 한 슬라이드로 잘게 쪼개서 과정을 그림으로 보여준다.

좌표는 손으로 베끼지 않고 tools/slidekit.py 함수만으로 조립한다.
주의: assets/basic/step02/slides.json, courses/basic/step02.json 은 이
스크립트가 건드리지 않는다 — 배선은 다른 곳에서 한다.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import (Slide, vscode, terminal, check_rows, box, two_col, section,
                      text, rect, flow_row, down_arrow, card, arrow, callout,
                      prompt_bar, rename_rows, drag_chip, notification, TINTS,
                      OK, OK_DEEP, BAD, WARN, WARN_DEEP, CYAN, CODE, DARK,
                      BLUE, BLUE_DEEP, MUTED, FAINT, INK, PANEL_BG, LINE)

A = 'assets/basic/step02'
B, S = 'BASIC 02', 'STEP 6'


def save(name, s):
    s.save(os.path.join(A, name))


# ── 로컬 헬퍼 (slidekit.py 는 건드리지 않는다) ───────────────────────

def _w(t, size):
    """slidekit._fit 과 같은 폭 측정 공식. 한글 1자 ≈ size, 영문/숫자 ≈ size*0.56."""
    return sum(size * (1.0 if ord(c) > 0x2500 else 0.56) for c in t)


def wrap(s, avail, size):
    """긴 프롬프트를 폭에 맞춰 여러 줄로 쪼갠다."""
    words = s.split(' ')
    lines, cur = [], ''
    for wd in words:
        trial = (cur + ' ' + wd).strip()
        if not cur or _w(trial, size) <= avail:
            cur = trial
        else:
            lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def long_prompt(x, y, s, width=1160, size=13):
    """여러 줄로 넘치는 긴 프롬프트 패널. prompt_bar 와 같은 색을 쓴다."""
    avail = width - 34 - 18
    lines = wrap(s, avail, size)
    top_pad, gap, bottom_pad = 26, 24, 16
    h = top_pad + gap * (len(lines) - 1) + bottom_pad
    out = [rect(x, y, width, h, '#0f172a', rx=8, stroke='#334155', sw=1.5),
           text(x + 16, y + top_pad, '>', 14, OK, '700', mono=True)]
    yy = y + top_pad
    for ln in lines:
        out.append(text(x + 34, yy, ln, size, CODE, mono=True))
        yy += gap
    return out, h


def cmd_rows(y, rows, x=60, width=1160, gap=44, size=14):
    """명령어 — 설명, 두 칸짜리 표 형태 줄."""
    out, yy = [], y
    for cmd, desc in rows:
        out.append(rect(x, yy - 22, width, 32, PANEL_BG, rx=6))
        out.append(text(x + 24, yy, cmd, size, INK, '700', mono=True))
        out.append(text(x + 360, yy, desc, size - 1, MUTED))
        yy += gap
    return out


# ═════════════════════════════════════════════════════════════════
# 1. bash_툴_이란 — "Bash 툴이란?"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, 'Bash 툴이란?',
          '1회차에서 우리가 손으로 치던 터미널 명령어를, 이제 Claude 가 대신 칩니다',
          '폴더 만들기부터 프로그램 설치·실행까지 — 컴퓨터에 하는 일은 다 됩니다')
s.add(section(190, '할 수 있는 일의 폭'))
cw, gap = 260, 40
xs = [60 + i * (cw + gap) for i in range(4)]
cards = [
    ('FILE', 'plain', '파일·폴더', ['폴더를 만들고 파일을', '복사·이름 변경합니다']),
    ('RUN', 'info', '프로그램 실행', ['이미 설치된 프로그램을', '찾아서 켭니다']),
    ('INSTALL', 'ok', '프로그램 설치', ['새 프로그램을 설치하고', '바로 실행까지 합니다']),
    ('CHECK', 'warn', '시스템 조회', ['컴퓨터 사양·상태를', '확인합니다']),
]
for x, (tag, kind, title, lines) in zip(xs, cards):
    s.add(card(x, 212, cw, 300, tag, kind, title, lines))
s.add(box(522, '1회차와 다른 점', [
    '1회차에서는 우리가 검은 화면(터미널)에 직접 명령어를 쳤습니다.',
    '이제는 Claude 에게 말로 시키면, Claude 가 대신 명령어를 칩니다.',
], kind='info'))
save('bash_툴_이란.svg', s)


# ═════════════════════════════════════════════════════════════════
# 2. bash_왜_핵심인가 — "컴퓨터를 직접 다룹니다"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '컴퓨터를 직접 다룹니다',
          'Read·Write·Edit 는 파일 안의 일, Bash 는 컴퓨터 자체를 다룹니다',
          "그래서 에이전트가 '대화하는 AI' 에서 '일하는 AI' 가 됩니다")
s.add(section(190, '파일 안에서 하는 일'))
tcw, tgap = 360, 20
txs = [60, 60 + tcw + tgap, 60 + 2 * (tcw + tgap)]
tool_cards = [
    ('TOOL', 'plain', 'Read', ['파일을 열어', '읽습니다']),
    ('TOOL', 'plain', 'Write', ['새 파일을', '만듭니다']),
    ('TOOL', 'plain', 'Edit', ['파일 내용을', '고칩니다']),
]
for x, (tag, kind, title, lines) in zip(txs, tool_cards):
    s.add(card(x, 212, tcw, 130, tag, kind, title, lines))
s.add(down_arrow(640, 356, 398, '그리고'))
s.add(section(418, '컴퓨터 자체에서 하는 일'))
s.add(card(60, 436, 1160, 150, 'TOOL', 'ok', 'Bash', [
    '파일 안이 아니라, 컴퓨터 자체를 다룹니다.',
    '프로그램을 설치하고, 실행하고, 시스템 상태를 확인합니다.',
]))
save('bash_왜_핵심인가.svg', s)


# ═════════════════════════════════════════════════════════════════
# 3. bash_카카오톡 — "설치된 프로그램 실행하기"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '설치된 프로그램 실행하기',
          '컴퓨터에 이미 깔려 있는 프로그램도 Claude 가 찾아서 켭니다',
          '파일을 만든 게 아니라 이미 있는 프로그램을 찾아서 켰습니다')
s.add(section(188, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 210, '컴퓨터에 설치된 PC 카카오톡 찾아서 실행해줘', width=1160))
s.add(down_arrow(640, 262, 306))
s.add(section(326, '터미널에서 일어나는 일'))
s.add(terminal(y=348, height=240, lines=[
    ('● Bash(설치된 프로그램 목록에서 카카오톡 검색)', OK, 14),
    ('  └ KakaoTalk.exe 를 찾았습니다', MUTED, 13),
    ('--', None),
    ('● Bash(KakaoTalk.exe 실행)', OK, 14),
    ('  └ 카카오톡이 실행되었습니다', MUTED, 13),
]))
save('bash_카카오톡.svg', s)


# ═════════════════════════════════════════════════════════════════
# 4. bash_유튜브 — "브라우저 열기"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '브라우저 열기',
          '설치된 크롬을 실행해서, 유튜브까지 띄우게 시킵니다',
          '프로그램 실행 + 웹사이트 접속 — 두 단계가 한 번에 됩니다')
s.add(section(188, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 210, '크롬으로 유튜브 실행해줘', width=1160))
s.add(down_arrow(640, 262, 306))
s.add(section(326, '크롬이 유튜브를 띄웁니다'))
bx, by, bw, bh = 190, 348, 900, 246
s.add(rect(bx, by, bw, bh, '#ffffff', rx=10, stroke='#d1d5db', sw=1.5))
s.add(rect(bx, by, bw, 34, '#f3f4f6', rx=10))
for i, col in enumerate(('#ef4444', '#f59e0b', '#22c55e')):
    s.add(f'  <circle cx="{bx+22+i*18}" cy="{by+17}" r="5.5" fill="{col}"/>')
s.add(rect(bx + 40, by + 40, 700, 26, '#ffffff', rx=13, stroke='#d1d5db', sw=1))
s.add(text(bx + 60, by + 58, 'https://www.youtube.com', 12, MUTED, mono=True))
s.add(rect(bx + 40, by + 88, 620, 150, PANEL_BG, rx=8, stroke=LINE))
s.add(f'  <circle cx="{bx+350}" cy="{by+163}" r="34" fill="{BAD}"/>')
s.add(f'  <path d="M{bx+338} {by+148}L{bx+338} {by+178}L{bx+366} {by+163}Z" fill="#ffffff"/>')
for i, y in enumerate((88, 144, 200)):
    s.add(rect(bx + 680, by + y, 180, 46, PANEL_BG, rx=6, stroke=LINE))
save('bash_유튜브.svg', s)


# ═════════════════════════════════════════════════════════════════
# 5. bash_메모장_자기소개서 — "만들고, 그 폴더까지 열어주기"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '만들고, 그 폴더까지 열어주기',
          '파일을 만드는 것과 폴더를 여는 것 — 두 가지 일을 한 번에 시킵니다',
          '요청 하나에 여러 단계가 들어 있어도 Claude 는 순서대로 다 처리합니다')
s.add(section(188, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 210, '바탕화면에 메모장으로 자기소개서를 만들고 저장된 폴더를 열어줘', width=1160))
s.add(down_arrow(640, 262, 300, '두 가지 일이 한 번에'))
s.add(section(326, '한 번에 끝나는 두 가지 일'))
s.add(flow_row(348, [
    ('자기소개서.txt 작성', ['메모장으로 내용을 씁니다'], 'info'),
    ('바탕화면 폴더 열기', ['저장된 위치를 탐색기로 엽니다'], 'ok'),
], height=118))
ex, ey, ew, eh = 340, 490, 600, 124
s.add(rect(ex, ey, ew, eh, '#ffffff', rx=10, stroke='#d1d5db', sw=1.5))
s.add(rect(ex, ey, ew, 32, '#f3f4f6', rx=10))
s.add(rect(ex + 16, ey + 10, 10, 4, '#c9a26a'))
s.add(rect(ex + 12, ey + 14, 40, 20, '#dcb67a', rx=3))
s.add(text(ex + 62, ey + 22, '바탕화면', 12.5, INK, '700'))
s.add(rect(ex + 12, ey + 44, ew - 24, 50, '#eff6ff', rx=6, stroke='#bfdbfe', sw=1.5))
s.add(f'  <path d="M{ex+28} {ey+58}h14l4 4v14h-18z" fill="{BLUE}" opacity="0.9"/>')
s.add(text(ex + 58, ey + 76, '자기소개서.txt', 14, BLUE_DEEP, '700', mono=True))
s.add(text(ex + ew - 20, ey + 76, '방금 저장됨', 12, MUTED, anchor='end'))
save('bash_메모장_자기소개서.svg', s)


# ═════════════════════════════════════════════════════════════════
# 6. bash_파일_목록 — "지금 폴더에 뭐가 있지?"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '지금 폴더에 뭐가 있지?',
          '파일 목록을 확인하고, 사람 말로 풀어서 설명해달라고 시킵니다',
          '목록만 던지지 않고, 무엇인지 풀어서 설명해준다는 게 핵심입니다')
s.add(section(188, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 208, '현재 폴더의 파일 목록을 설명해줘', width=1160))
s.add(down_arrow(640, 258, 298))
s.add(section(316, 'Bash 로 확인하고, 사람 말로 설명합니다'))
s.add(terminal(y=338, height=270, lines=[
    ('● Bash(dir)', OK, 14),
    ('  └ 6개 항목을 찾았습니다', MUTED, 13),
    ('--', None),
    ('자기소개서.txt   강아지.svg   포스터.html', CYAN, 13),
    ('계산기.html   테트리스.html   practice_files/', CYAN, 13),
    ('--', None),
    ('자기소개서 초안, 강아지 그림, 포스터 웹페이지,', '#e5e7eb', 13),
    ('계산기, 테트리스 게임까지 — 지금까지 만든 게', '#e5e7eb', 13),
    ('다 있네요. practice_files 폴더도 그대로 있고요.', '#e5e7eb', 13),
]))
save('bash_파일_목록.svg', s)


# ═════════════════════════════════════════════════════════════════
# 7. bash_테트리스_실행 — "만든 걸 찾아서 실행"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '만든 걸 찾아서 실행',
          '테트리스 파일을 찾는 것과 실행하는 것 — 한 줄로 둘 다 시킵니다',
          '"찾아서 실행해줘" — 찾기와 실행, 두 단계가 한 줄로 처리됩니다')
s.add(section(186, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 206, '현재 폴더에 테트리스 파일 찾아서 실행해줘', width=1160))
s.add(down_arrow(640, 256, 290))
s.add(section(306, '찾기 → 실행, 한 번에'))
s.add(terminal(y=328, height=270, x=60, width=620, lines=[
    ('● Bash(dir *테트리스*)', OK, 13.5),
    ('  └ 테트리스.html 을 찾았습니다', MUTED, 12.5),
    ('--', None),
    ('● Bash(테트리스.html 실행)', OK, 13.5),
    ('  └ 기본 브라우저로 열었습니다', MUTED, 12.5),
]))
gx, gy, gw, gh = 720, 328, 480, 270
s.add(rect(gx, gy, gw, gh, '#ffffff', rx=10, stroke='#d1d5db', sw=1.5))
s.add(rect(gx, gy, gw, 32, '#f3f4f6', rx=10))
for i, col in enumerate(('#ef4444', '#f59e0b', '#22c55e')):
    s.add(f'  <circle cx="{gx+22+i*18}" cy="{gy+16}" r="5.5" fill="{col}"/>')
s.add(text(gx + gw / 2 + 20, gy + 21, '테트리스.html', 12, MUTED, '600', anchor='middle'))
px, py = gx + 32, gy + 50
s.add(rect(px, py, 220, 200, DARK, rx=6))
blocks = [
    (px + 80, py + 0, CYAN), (px + 100, py + 0, CYAN),
    (px + 80, py + 20, CYAN), (px + 100, py + 20, CYAN),
    (px + 20, py + 140, OK), (px + 40, py + 140, OK), (px + 60, py + 140, OK),
    (px + 140, py + 160, WARN), (px + 160, py + 160, WARN),
    (px + 140, py + 180, WARN), (px + 20, py + 160, BLUE), (px + 20, py + 180, BLUE),
]
for bxp, byp, col in blocks:
    s.add(rect(bxp + 1, byp + 1, 18, 18, col, rx=2))
s.add(text(px + 246, py + 30, 'SCORE', 11, MUTED, '700', spacing='0.06em'))
s.add(text(px + 246, py + 54, '000000', 17, CODE, '800', mono=True))
s.add(text(px + 246, py + 96, 'LEVEL', 11, MUTED, '700', spacing='0.06em'))
s.add(text(px + 246, py + 120, '1', 17, CODE, '800', mono=True))
save('bash_테트리스_실행.svg', s)


# ═════════════════════════════════════════════════════════════════
# 8. bash_슬라임_요청 — "바탕화면 위젯 만들기"
# ═════════════════════════════════════════════════════════════════
SLIME_PROMPT = ('svg 로 귀여운 슬라임 같은 캐릭터를 간단하게 디자인해서, '
                '바탕화면에 떠서 마우스로 들었다 놓을 수 있는(중력 적용) '
                '프로그램을 파이썬으로 만들어서 실행해줄래? 슬라임 우클릭 또는 '
                '트레이 아이콘에 "종료" 메뉴를 넣어줘')
s = Slide(B, S, '바탕화면 위젯 만들기',
          '이번엔 파일 하나가 아니라, 프로그램을 통째로 만들고 실행까지 시킵니다',
          '요청 하나가 디자인·코딩·실행까지 전부를 담고 있습니다')
s.add(section(186, '학생이 입력하는 프롬프트 (조금 깁니다)'))
lp, lph = long_prompt(60, 208, SLIME_PROMPT, width=1160)
s.add(lp)
ay1 = 208 + lph + 12
s.add(down_arrow(640, ay1, ay1 + 40, '요청 안에 담긴 다섯 가지'))
sec_y = ay1 + 60
s.add(section(sec_y, '이 한 줄에 담긴 요소 다섯 가지'))
row_y = sec_y + 22
cw2, gap2 = 216, 20
xs5 = [60 + i * (cw2 + gap2) for i in range(5)]
elements = [
    ('①', 'info', '캐릭터 디자인', ['SVG 로 그린', '귀여운 슬라임 모양']),
    ('②', 'info', '바탕화면에 표시', ['다른 창 위에', '항상 떠 있음']),
    ('③', 'ok', '마우스로 집기', ['클릭한 채', '끌 수 있음']),
    ('④', 'ok', '중력 적용', ['놓으면 아래로', '툭 떨어짐']),
    ('⑤', 'warn', '종료 메뉴', ['우클릭 또는', '트레이에서 종료']),
]
for x, (tag, kind, title, lines) in zip(xs5, elements):
    s.add(card(x, row_y, cw2, 170, tag, kind, title, lines))
s.add(box(row_y + 188, None, [
    'AI 가 요청 하나를 디자인 · 코드 작성 · 실행까지 한 번에 처리합니다.',
], kind='info'))
save('bash_슬라임_요청.svg', s)


# ═════════════════════════════════════════════════════════════════
# 9. bash_슬라임_결과 — "바탕화면에 살아있습니다"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '바탕화면에 살아있습니다',
          '슬라임이 바탕화면 위에 떠 있습니다 — 들었다 놓으면 중력으로 떨어집니다',
          '방금 만든 프로그램이 지금 이 순간 실제로 실행되고 있습니다')
dx, dy, dw, dh = 60, 196, 1160, 400
s.add('  <defs><linearGradient id="slimebg" x1="0" y1="0" x2="0" y2="1">'
      '<stop offset="0%" stop-color="#60a5fa"/>'
      '<stop offset="100%" stop-color="#1d4ed8"/></linearGradient></defs>')
s.add(rect(dx, dy, dw, dh, 'url(#slimebg)', rx=16))
# 바탕화면 아이콘 (분위기용, 왼쪽 위)
s.add(rect(dx + 40, dy + 28, 10, 4, '#c9a26a'))
s.add(rect(dx + 36, dy + 32, 40, 26, '#dcb67a', rx=3))
s.add(text(dx + 30, dy + 76, '문서', 11, '#eff6ff', '600', anchor='middle'))
s.add(f'  <path d="M{dx+130} {dy+30}h20l6 6v20h-26z" fill="{BLUE}" opacity="0.85"/>')
s.add(text(dx + 143, dy + 76, '사진', 11, '#eff6ff', '600', anchor='middle'))
# 들려 있는 슬라임 (위)
hx, hy = dx + 380, dy + 110
s.add(f'  <ellipse cx="{hx}" cy="{hy}" rx="46" ry="42" fill="{OK}"/>')
s.add(f'  <ellipse cx="{hx-16}" cy="{hy-16}" rx="14" ry="9" fill="#ffffff" opacity="0.35"/>')
for ex in (-16, 16):
    s.add(f'  <circle cx="{hx+ex}" cy="{hy-6}" r="9" fill="#ffffff"/>')
    s.add(f'  <circle cx="{hx+ex+2}" cy="{hy-4}" r="4" fill="{INK}"/>')
s.add(f'  <path d="M{hx-12} {hy+16}q12 10 24 0" fill="none" stroke="{OK_DEEP}" '
      f'stroke-width="2.5" stroke-linecap="round"/>')
s.add(f'  <circle cx="{hx}" cy="{hy-64}" r="7" fill="none" stroke="#ffffff" '
      f'stroke-width="2" stroke-dasharray="3 3"/>')
s.add(text(hx + 70, hy - 60, '클릭한 채 끌어 올리면', 13.5, '#ffffff', '700'))
s.add(text(hx + 70, hy - 40, '슬라임이 손을 따라옵니다', 13.5, '#ffffff', '700'))
# 낙하 궤적
s.add(arrow(hx, hy + 56, hx, hy + 190, color='#ffffff', sw=3, dashed=True))
for i, lx in enumerate((hx - 34, hx - 24, hx - 14)):
    s.add(f'  <line x1="{lx}" y1="{hy+100+i*18}" x2="{lx-16}" y2="{hy+96+i*18}" '
          f'stroke="#ffffff" stroke-width="2" opacity="0.6" stroke-linecap="round"/>')
# 착지한 슬라임 (아래, 눌린 모양)
lxp, lyp = hx, hy + 260
s.add(f'  <ellipse cx="{lxp}" cy="{lyp}" rx="62" ry="34" fill="{OK}"/>')
s.add(f'  <ellipse cx="{lxp-20}" cy="{lyp-12}" rx="18" ry="8" fill="#ffffff" opacity="0.35"/>')
for ex in (-20, 20):
    s.add(f'  <circle cx="{lxp+ex}" cy="{lyp-4}" r="8" fill="#ffffff"/>')
    s.add(f'  <circle cx="{lxp+ex+2}" cy="{lyp-2}" r="3.5" fill="{INK}"/>')
s.add(f'  <path d="M{lxp-14} {lyp+12}q14 8 28 0" fill="none" stroke="{OK_DEEP}" '
      f'stroke-width="2.5" stroke-linecap="round"/>')
for ix in (-70, -50, 50, 70):
    s.add(f'  <ellipse cx="{lxp+ix}" cy="{lyp+30}" rx="10" ry="3" fill="#ffffff" opacity="0.3"/>')
s.add(text(lxp, lyp + 66, '놓으면 중력으로 툭!', 14, '#ffffff', '800', anchor='middle'))
# 우클릭 메뉴
mx, my, mw, mh = dx + 660, dy + 210, 190, 90
s.add(rect(mx, my, mw, mh, '#ffffff', rx=8, stroke='#d1d5db', sw=1.5))
s.add(text(mx + 20, my + 30, '슬라임 정보', 13, '#374151', '500'))
s.add(f'  <line x1="{mx}" y1="{my+45}" x2="{mx+mw}" y2="{my+45}" stroke="{LINE}"/>')
s.add(rect(mx + 4, my + 49, mw - 8, 34, '#fef2f2', rx=6))
s.add(text(mx + 20, my + 71, '종료', 13.5, BAD, '700'))
s.add(callout(mx + mw + 18, my + 74, '← 우클릭 메뉴에서도', '#ffffff', 13.5))
s.add(callout(mx + mw + 18, my + 92, '   바로 종료됩니다', '#ffffff', 13.5))
save('bash_슬라임_결과.svg', s)


# ═════════════════════════════════════════════════════════════════
# 10. bash_시스템_정보 — "내 컴퓨터를 조사시키기"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '내 컴퓨터를 조사시키기',
          '컴퓨터 사양과 GPU 온도까지, 시스템 정보를 조사해서 설명해달라고 합니다',
          '실제 사양·온도는 컴퓨터마다 다릅니다 — 화면의 값은 예시 형태입니다')
s.add(section(186, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 206, '현재 컴퓨터 사양과 현재 GPU 온도 등을 조사해서 설명해줘', width=1160))
s.add(down_arrow(640, 256, 296))
s.add(section(316, '컴퓨터를 조사하고, 결과를 설명합니다'))
s.add(terminal(y=336, height=280, lines=[
    ('● Bash(시스템 정보 조회)', OK, 14),
    ('  └ CPU · 메모리 · GPU 정보를 확인했습니다', MUTED, 13),
    ('--', None),
    ('CPU         ○○○○○○ (모델명)', CYAN, 13.5),
    ('메모리       ○○ GB', CYAN, 13.5),
    ('GPU         ○○○○○○', CYAN, 13.5),
    ('GPU 온도     ○○ °C', CYAN, 13.5),
    ('--', None),
    ('# 실제 사양·온도는 컴퓨터마다 다릅니다 (위 값은 예시 형태)', FAINT, 12.5),
]))
save('bash_시스템_정보.svg', s)


# ═════════════════════════════════════════════════════════════════
# 11. bash_웹캠 — "카메라로 지금을 봅니다"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '카메라로 지금을 봅니다',
          '웹캠으로 사진을 찍는 건 Bash, 그 사진을 보고 설명하는 건 Read 입니다',
          '한 가지 일을 위해 두 개의 툴이 이어졌습니다')
s.add(section(186, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 206, '현재 컴퓨터에 연결된 웹캠 인식해볼래? 그걸로 지금 뭐가 보이는지 캡처해서 설명해봐', width=1160))
s.add(down_arrow(640, 256, 294))
s.add(section(314, 'Bash 로 찍고, Read 로 봅니다'))
s.add(terminal(y=336, height=170, lines=[
    ('● Bash(웹캠 인식 → 사진 촬영 → capture.jpg 저장)', OK, 13.5),
    ('  └ 캡처가 완료되었습니다', MUTED, 12.5),
    ('--', None),
    ('● Read(capture.jpg)', OK, 14),
    ('  └ 지금 화면에 보이는 걸 확인합니다', MUTED, 13),
]))
s.add(flow_row(526, [
    ('Bash 로 찍고', ['사진을 파일로 저장합니다'], 'info'),
    ('Read 로 보고', ['내용을 설명합니다'], 'ok'),
], height=96))
save('bash_웹캠.svg', s)


# ═════════════════════════════════════════════════════════════════
# 12. bash_툴_조합 — "툴은 혼자 쓰이지 않습니다"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, '툴은 혼자 쓰이지 않습니다',
          '방금 웹캠처럼, 실제로는 여러 툴이 이어져 하나의 일을 해냅니다',
          '오늘 배운 네 가지 — 상황에 맞게 알아서 골라 이어 씁니다')
s.add(section(186, '오늘 배운 네 가지 툴'))
tcw2, tgap2 = 260, 40
xs4 = [60 + i * (tcw2 + tgap2) for i in range(4)]
four = [
    ('READ', 'plain', 'Read — 읽기', ['파일 안의 내용을', '직접 열어봅니다']),
    ('WRITE', 'info', 'Write — 만들기', ['새 파일을', '만들어냅니다']),
    ('EDIT', 'warn', 'Edit — 고치기', ['기존 파일 내용을', '바꿔 넣습니다']),
    ('BASH', 'ok', 'Bash — 실행하기', ['컴퓨터에서', '명령을 실행합니다']),
]
for x, (tag, kind, title, lines) in zip(xs4, four):
    s.add(card(x, 208, tcw2, 170, tag, kind, title, lines))
s.add(section(400, '예 — 한 번의 작업이 네 툴을 모두 거칠 수도 있습니다'))
s.add(flow_row(422, [
    ('Read', ['먼저 읽고'], 'plain'),
    ('Write', ['새로 만들고'], 'info'),
    ('Edit', ['고치고'], 'warn'),
    ('Bash', ['실행합니다'], 'ok'),
], height=130))
save('bash_툴_조합.svg', s)


# ═════════════════════════════════════════════════════════════════
# 13. bash_주요_명령어 — "AI 가 쓰는 명령어들"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, 'AI 가 쓰는 명령어들',
          '터미널에서 자주 보게 될 대표 명령을 정리합니다',
          '외울 필요는 없습니다 — 알아두면 Claude 가 뭘 하는지 읽힙니다')
s.add(section(188, '앞으로 터미널에서 보게 될 명령어'))
s.add(cmd_rows(214, [
    ('ls  /  dir', '목록 보기 — 지금 폴더에 뭐가 있는지'),
    ('cd', '폴더 이동 — 다른 폴더로 들어가기'),
    ('mkdir', '폴더 만들기'),
    ('copy  /  cp', '파일 복사'),
    ('move  /  mv', '이름 바꾸기 · 파일 이동'),
    ('start / open,  python', '실행하기 — 프로그램이나 파일 열기'),
], gap=48))
s.add(box(534, None, [
    '외울 필요는 없습니다 — 알아두면 터미널에서 Claude 가 뭘 하는지 읽힙니다.',
], kind='plain'))
save('bash_주요_명령어.svg', s)


# ═════════════════════════════════════════════════════════════════
# 14. bash_정리 — "Bash 툴 정리"
# ═════════════════════════════════════════════════════════════════
s = Slide(B, S, 'Bash 툴 정리',
          'Bash 로 배운 네 가지를 정리합니다',
          '컴퓨터를 직접 다루는 힘 — 오늘 배운 것 중 가장 강력한 툴입니다')
s.add(section(188, '이번 파트에서 배운 것'))
s.add(check_rows(220, [
    ('[v]', '명령 실행', '터미널 명령어를 AI 가 대신 씁니다', OK),
    ('[v]', '컴퓨터 전체', '파일 안이 아니라 컴퓨터 자체를 다룹니다', OK),
    ('[v]', '설치·실행·조회', '새 프로그램 설치부터 시스템 조회까지', OK),
    ('[v]', '툴 연결', '다른 툴과 이어져 하나의 일을 해냅니다', OK),
], gap=44))
s.add(box(468, None, [
    '오늘 실습을 마쳤다면 /clear 를 입력해 새 채팅방으로 정리합니다.',
], kind='ok'))
save('bash_정리.svg', s)


print('완료: 14장 생성')
