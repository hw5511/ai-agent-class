# -*- coding: utf-8 -*-
"""BASIC 02 · Edit 툴 파트 슬라이드 7장 생성.

Write 파트에서 만든 것(자기소개서 md · 강아지 svg · html 포스터 · tkinter 계산기 ·
테트리스)을 Edit 툴로 고쳐 나가는 흐름을 한 단계씩 보여준다.
좌표는 손으로 만들지 않고 tools/slidekit.py 함수만 쓴다.

주의: assets/basic/step02/slides.json, courses/basic/step02.json 은 이 스크립트가
건드리지 않는다 — 배선은 다른 곳에서 한다.
"""
import sys
sys.path.insert(0, 'tools')
from slidekit import (
    Slide, terminal, box, section, text, rect, flow_row, card,
    arrow, callout, prompt_bar,
    OK, OK_DEEP, OK_BG, OK_EDGE, DARK,
    BLUE_DEEP, MUTED, INK, PANEL_BG, LINE,
)

BADGE = 'BASIC 02'
STEP = 'STEP 5'
OUT = 'assets/basic/step02/'


def save(name, s):
    s.save(OUT + name)


# 1. edit_툴_이란 ---------------------------------------------------------
s = Slide(BADGE, STEP, '고치는 방법이 다릅니다',
          'Write 는 새로 쓰고, Edit 는 있는 파일에서 필요한 부분만 바꿉니다',
          '파일 전체가 아니라 달라지는 부분만 바뀝니다')
s.add(section(186, '두 툴의 차이'))
s.add(card(60, 206, 560, 248, 'WRITE 툴', 'warn', '새로 쓰거나 통째로 덮어쓰기', [
    '파일이 없으면 새로 만듭니다',
    '파일이 있으면 전체 내용을 다시 씁니다',
    '이미 있던 내용은 사라집니다',
]))
s.add(card(660, 206, 560, 248, 'EDIT 툴', 'ok', '필요한 부분만 고치기', [
    '파일이 이미 있어야 합니다',
    '달라지는 부분만 바꿉니다',
    '나머지 내용은 그대로 남습니다',
]))
s.add(section(486, '한 단계씩 진행합니다'))
s.add(flow_row(506, [
    ('파일 읽기', ['먼저 지금 내용을 확인합니다'], 'info'),
    ('고칠 부분 찾기', ['바뀌어야 할 곳만 짚어냅니다'], 'info'),
    ('그 부분만 교체', ['나머지는 그대로 둡니다'], 'ok'),
], height=110))
save('edit_툴_이란.svg', s)


# 2. edit_왜_중요한가 -------------------------------------------------------
s = Slide(BADGE, STEP, '고쳐가며 완성합니다',
          '한 번에 완벽하게 되지 않아도 괜찮습니다 — 보고 고치기를 반복합니다',
          '이 리듬이 에이전트를 쓰는 기본 방식입니다')
s.add(section(200, '기본 리듬'))
FLOW_Y, FLOW_H = 240, 140
s.add(flow_row(FLOW_Y, [
    ('만들고', ['일단 결과물을 만듭니다'], 'info'),
    ('보고', ['결과를 눈으로 확인합니다'], 'info'),
    ('고치고', ['마음에 안 드는 부분을 다시 요청합니다'], 'ok'),
], height=FLOW_H))
# flow_row 와 같은 식으로 박스 중심을 계산해 아래로 돌아가는 반복 화살표를 그린다
_N, _GAP, _X, _W = 3, 44, 60, 1160
_BW = (_W - _GAP * (_N - 1)) / _N
_CX0 = _X + _BW / 2
_CX2 = _X + 2 * (_BW + _GAP) + _BW / 2
_BOTTOM = FLOW_Y + FLOW_H
_LOOP_Y = _BOTTOM + 40
s.add([f'  <line x1="{_CX2:.1f}" y1="{_BOTTOM + 8:.1f}" x2="{_CX2:.1f}" y2="{_LOOP_Y:.1f}" '
       f'stroke="{MUTED}" stroke-width="2.5" stroke-dasharray="5 5"/>'])
s.add([f'  <line x1="{_CX2:.1f}" y1="{_LOOP_Y:.1f}" x2="{_CX0:.1f}" y2="{_LOOP_Y:.1f}" '
       f'stroke="{MUTED}" stroke-width="2.5" stroke-dasharray="5 5"/>'])
s.add(arrow(_CX0, _LOOP_Y, _CX0, _BOTTOM + 8, color=MUTED, dashed=True))
s.add(text((_CX0 + _CX2) / 2, _LOOP_Y + 26, '마음에 들 때까지 반복합니다',
           13.5, MUTED, '700', anchor='middle'))
s.add(box(478, '이 리듬이 기본입니다', [
    '완벽한 결과를 한 번에 기대하지 않아도 됩니다.',
    'Write 로 만들고, Edit 로 다듬어가면 됩니다.',
], kind='plain'))
save('edit_왜_중요한가.svg', s)


# 3. edit_테트리스_요청 -----------------------------------------------------
s = Slide(BADGE, STEP, '테트리스 손보기',
          '만든 테트리스를 더 완성도 있게 다듬어 달라고 요청합니다',
          '요청 하나에 여러 가지 수정이 들어 있어도 괜찮습니다')
s.add(section(200, '요청'))
s.add(prompt_bar(
    60, 222,
    '테트리스에 시작 버튼을 추가하고, 블록을 좀 더 입체적이게 만들고, '
    '화면을 좀 더 키워서 전체적으로 세련되게 디자인해줘',
    width=1160,
    hint='한 번에 여러 요청을 담아도 Claude 가 순서대로 처리합니다',
))
s.add(box(340, '한 번에 요청한 세 가지', [
    '① 시작 버튼을 추가합니다',
    '② 블록을 더 입체적으로 만듭니다',
    '③ 화면을 키우고 전체 디자인을 다듬습니다',
], kind='info'))
s.add(text(60, 508, '다음 장에서 Claude 가 이 요청을 어떻게 처리하는지 봅니다', 13, MUTED))
save('edit_테트리스_요청.svg', s)


# 4. edit_테트리스_진행 -----------------------------------------------------
s = Slide(BADGE, STEP, '필요한 줄만 고칩니다',
          'Read 로 먼저 읽고, Edit 로 필요한 부분만 바꿉니다',
          '파일 전체를 다시 쓰지 않습니다 — 바뀌는 줄만 표시됩니다')
s.add(section(200, 'Claude 의 작업'))
s.add(terminal(y=222, height=380, lines=[
    ('● Read(tetris.py)', OK, 14),
    ('  └ Read 210 lines', MUTED, 12),
    ('', None),
    ('● Edit(tetris.py)', OK, 14),
    ('  └ 3 additions, 1 removal', MUTED, 12),
    ('', None),
    ('● Edit(tetris.py)', OK, 14),
    ('  └ 12 additions, 2 removals', MUTED, 12),
    ('', None),
    ('● Edit(tetris.py)', OK, 14),
    ('  └ 8 additions, 3 removals', MUTED, 12),
]))
save('edit_테트리스_진행.svg', s)


# 5. edit_테트리스_결과 -----------------------------------------------------
s = Slide(BADGE, STEP, '전과 후',
          '왼쪽은 고치기 전, 오른쪽은 고친 뒤입니다',
          '같은 테트리스인데 달라진 부분이 한눈에 보입니다')

BX, BY, BW_, BH_ = 90, 220, 360, 300     # 이전 창
AX, AY, AW_, AH_ = 620, 200, 570, 380    # 이후 창 — 더 크다


def window_frame(x, y, w, h, dots=True):
    o = [rect(x, y, w, h, '#e5e7eb', rx=10, stroke=LINE, sw=1.5),
         rect(x, y, w, 26, '#d1d5db', rx=10),
         rect(x, y + 14, w, 12, '#d1d5db')]
    if dots:
        o += [f'  <circle cx="{x+18}" cy="{y+13}" r="4" fill="#ef4444"/>',
              f'  <circle cx="{x+32}" cy="{y+13}" r="4" fill="#f59e0b"/>',
              f'  <circle cx="{x+46}" cy="{y+13}" r="4" fill="#22c55e"/>']
    return o


s.add(text(BX + BW_ / 2, BY - 14, '이전', 15, MUTED, '700', anchor='middle'))
s.add(window_frame(BX, BY, BW_, BH_))
cx0, cy0, cw0, ch0 = BX + 8, BY + 34, BW_ - 16, BH_ - 42
s.add(rect(cx0, cy0, cw0, ch0, DARK, rx=4))
# 밋밋한 격자 — 같은 색 사각형만 반복
rows0, cols0 = 5, 4
cell0 = min((cw0 - 24) / cols0, (ch0 - 24) / rows0)
gx0 = cx0 + (cw0 - cell0 * cols0) / 2
gy0 = cy0 + (ch0 - cell0 * rows0) / 2
for r in range(rows0):
    for c in range(cols0):
        s.add(rect(gx0 + c * cell0 + 2, gy0 + r * cell0 + 2,
                    cell0 - 4, cell0 - 4, '#3b556e', rx=2))
s.add(text(BX + BW_ / 2, BY + BH_ + 22, '버튼 없음 · 밋밋한 사각형 · 작은 화면',
           13, MUTED, anchor='middle'))

s.add(text(AX + AW_ / 2, AY - 14, '이후', 15, OK_DEEP, '700', anchor='middle'))
s.add(window_frame(AX, AY, AW_, AH_))
cx1, cy1, cw1, ch1 = AX + 10, AY + 36, AW_ - 20, AH_ - 100
s.add(rect(cx1, cy1, cw1, ch1, DARK, rx=6))
# 입체감 있는 블록 — 밝은 위쪽 띠로 베벨 표현
rows1, cols1 = 4, 5
cell1 = min((cw1 - 32) / cols1, (ch1 - 32) / rows1)
gx1 = cx1 + (cw1 - cell1 * cols1) / 2
gy1 = cy1 + (ch1 - cell1 * rows1) / 2
BLOCK_COLORS = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc']
for r in range(rows1):
    for c in range(cols1):
        col = BLOCK_COLORS[(r + c) % len(BLOCK_COLORS)]
        bx, by = gx1 + c * cell1 + 3, gy1 + r * cell1 + 3
        bs = cell1 - 6
        s.add(rect(bx, by, bs, bs, col, rx=3))
        s.add([f'  <rect x="{bx+2:.1f}" y="{by+2:.1f}" width="{bs-4:.1f}" '
               f'height="{bs*0.34:.1f}" rx="2" fill="#ffffff" opacity="0.35"/>'])
# 시작 버튼
btn_w, btn_h = 150, 40
btn_x = AX + (AW_ - btn_w) / 2
btn_y = AY + AH_ - 54
s.add(rect(btn_x, btn_y, btn_w, btn_h, OK, rx=8))
s.add(text(btn_x + btn_w / 2, btn_y + 26, '▶ 시작', 15, '#0a2e12', '800', anchor='middle'))
s.add(text(AX + AW_ / 2, AY + AH_ + 22, '시작 버튼 · 입체감 있는 블록 · 커진 화면',
           13, OK_DEEP, '700', anchor='middle'))

s.add(arrow(BX + BW_ + 14, BY + BH_ / 2, AX - 14, AY + AH_ / 2, color=BLUE_DEEP, sw=3))
s.add(callout((BX + BW_ + AX) / 2, BY + BH_ / 2 - 16, 'Edit', color=BLUE_DEEP, size=14, anchor='middle'))
save('edit_테트리스_결과.svg', s)


# 6. edit_포스터_요청 -------------------------------------------------------
s = Slide(BADGE, STEP, '포스터 색 바꾸기',
          '만든 포스터를 초록색 테마로 바꾸고 크롬으로 열어 확인합니다',
          '새로 만드는 게 아니라 있던 포스터 파일을 고치는 것입니다')
s.add(section(200, '요청'))
s.add(prompt_bar(
    60, 222, '강아지 포스터에서 색상을 초록색 테마로 바꾸고 크롬으로 열어줘',
    width=800, hint='포스터 파일은 그대로 두고, 안의 색상 코드만 바뀝니다',
))
s.add(section(330, '크롬에서 확인'))

CW_, CH_ = 480, 250
PX0, PX1, PY = 90, 690, 356


def chrome_window(x, y, w, h, theme_bg, theme_edge, icon_color, label):
    o = [rect(x, y, w, h, '#ffffff', rx=10, stroke='#d1d5db', sw=1.5),
         rect(x, y, w, 34, '#f1f3f4', rx=10),
         rect(x, y + 20, w, 14, '#f1f3f4')]
    o += [f'  <circle cx="{x+18}" cy="{y+17}" r="4" fill="#ef4444"/>',
          f'  <circle cx="{x+32}" cy="{y+17}" r="4" fill="#f59e0b"/>',
          f'  <circle cx="{x+46}" cy="{y+17}" r="4" fill="#22c55e"/>']
    o.append(rect(x + 70, y + 7, w - 90, 20, '#ffffff', rx=10, stroke='#e0e0e0', sw=1))
    o.append(text(x + 84, y + 21, 'poster.html', 10.5, MUTED, mono=True))
    cy = y + 34
    ch = h - 34
    o.append(rect(x, cy, w, ch, theme_bg, stroke=theme_edge, sw=0))
    # 자전거 타는 강아지 — 단순 아이콘
    cx, cyy = x + w / 2, cy + ch / 2 + 10
    o += [f'  <circle cx="{cx-70}" cy="{cyy+24}" r="30" fill="none" stroke="{icon_color}" stroke-width="5"/>',
          f'  <circle cx="{cx+70}" cy="{cyy+24}" r="30" fill="none" stroke="{icon_color}" stroke-width="5"/>',
          f'  <path d="M{cx-70} {cyy+24}L{cx-10} {cyy-10}L{cx+70} {cyy+24}M{cx-10} {cyy-10}L{cx-10} {cyy+24}" '
          f'fill="none" stroke="{icon_color}" stroke-width="5" stroke-linejoin="round"/>',
          f'  <circle cx="{cx-10}" cy="{cyy-44}" r="18" fill="{icon_color}"/>']
    o.append(text(cx, cy + 30, label, 12.5, MUTED, '600', anchor='middle'))
    return o


s.add(text(PX0 + CW_ / 2, PY - 14, '전 · 원래 색', 13, MUTED, '700', anchor='middle'))
s.add(chrome_window(PX0, PY, CW_, CH_, PANEL_BG, LINE, '#64748b', '강아지 포스터'))
s.add(text(PX1 + CW_ / 2, PY - 14, '후 · 초록 테마', 13, OK_DEEP, '700', anchor='middle'))
s.add(chrome_window(PX1, PY, CW_, CH_, OK_BG, OK_EDGE, OK_DEEP, '강아지 포스터'))
s.add(arrow(PX0 + CW_ + 14, PY + CH_ / 2, PX1 - 14, PY + CH_ / 2, color=BLUE_DEEP, sw=3))
save('edit_포스터_요청.svg', s)


# 7. edit_정리 --------------------------------------------------------------
s = Slide(BADGE, STEP, 'Edit 툴 정리', '오늘 배운 Edit 툴을 정리합니다')
s.add(section(200, '기억할 점'))
ITEMS = [
    '① Write 는 새로 만들기, Edit 는 있는 것 고치기',
    '② 고칠 부분만 바뀌고 나머지는 그대로',
    '③ 만들고 → 보고 → 고치고 를 반복해 완성합니다',
    '④ 말로 고칠 수 있으니 코드를 몰라도 다듬을 수 있습니다',
]
yy = 232
for item in ITEMS:
    s.add(rect(60, yy - 28, 1160, 40, PANEL_BG, rx=8))
    s.add(text(88, yy - 2, item, 17, INK, '600'))
    yy += 54
s.add(box(440, '/clear 로 정리하고 다음 실습으로', [
    '/clear 는 지금 채팅방을 나가고 새 채팅방으로 가는 것입니다.',
], kind='ok'))
save('edit_정리.svg', s)


print('전부 완료.')
