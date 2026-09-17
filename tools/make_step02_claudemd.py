# -*- coding: utf-8 -*-
"""basic step02 — CLAUDE.md 구간 슬라이드 12장을 생성한다. (slidekit 사용)"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import (Slide, vscode, terminal, check_rows, box, two_col, section,
                      text, rect, OK, OK_DEEP, OK_BG, OK_EDGE,
                      BAD, WARN, WARN_DEEP, WARN_BG, WARN_EDGE,
                      CYAN, BLUE, BLUE_DEEP, BLUE_BG, BLUE_EDGE,
                      MUTED, FAINT, INK, PANEL_BG, LINE, DARK_RULE, CODE)

A = 'assets/basic/step02'
B, S = 'BASIC 02', 'STEP 2'

TINTS = {
    'info':  (BLUE_BG, BLUE_EDGE, BLUE_DEEP),
    'ok':    (OK_BG, OK_EDGE, OK_DEEP),
    'warn':  (WARN_BG, WARN_EDGE, WARN_DEEP),
    'plain': (PANEL_BG, LINE, '#374151'),
}


def flow_row(y, steps, height=120, x=60, width=1160, gap=44):
    """가로 흐름도. steps = [(라벨, [설명줄], kind)]."""
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
    o = [f'  <line x1="{x}" y1="{y1}" x2="{x}" y2="{y2-11}" '
         f'stroke="{color}" stroke-width="2.5"/>',
         f'  <path d="M{x-7} {y2-15}L{x} {y2}L{x+7} {y2-15}Z" fill="{color}"/>']
    if label:
        o.append(text(x + 18, (y1 + y2) / 2 + 5, label, 13.5, color, '700', mono=True))
    return o


def card(x, y, w, h, tag, tagcol, title, lines):
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


# ── 1. CLAUDE.md 란? ─────────────────────────────────────────────
s = Slide(B, S, 'CLAUDE.md 란?', '에이전트에게 매번 말하지 않아도 되는 상시 지시서',
          '대화마다 반복해서 시키던 것을 파일 하나에 적어두는 것입니다')
s.add(two_col(190,
    ('매번 말하기 (반복)',
     ['"너는 ㅇㅇ야"', '"~요를 ~용용으로 붙여"', '"그 말투 잊지 마"', '... 새 대화마다 다시 설명'],
     '대화가 끝나면 사라진다'),
    ('CLAUDE.md 파일 하나',
     ["이름: 'ㅇㅇ'", "역할: ai 에이전트 수업 도우미", "말투: ~요 → ~용용", '한 번만 적으면 끝'],
     '세션이 시작될 때마다 자동으로 읽힌다'),
    height=300))
s.add(box(534, None, ['즉, CLAUDE.md 는 매번 타이핑하던 지시를 파일로 옮겨 "항상 켜진 규칙"으로 만든 것입니다'], 'plain'))
s.save(os.path.join(A, 'CLAUDE_md_란.svg'))


# ── 2. 언제 읽히나 ────────────────────────────────────────────────
s = Slide(B, S, '언제 읽히나', '세션이 시작될 때 자동으로 읽힙니다 — 따로 불러올 필요가 없습니다', None)
s.add(flow_row(210, [
    ('새 대화 시작', ['이 폴더에서 세션을 연다'], 'plain'),
    ('CLAUDE.md 자동 로드', ['agent1/.claude/CLAUDE.md 를 읽는다'], 'info'),
    ('그 규칙대로 답변', ['이름·역할·말투가 반영된다'], 'ok'),
], height=150))
s.add(box(420, '기억할 것', [
    '- 사람이 "CLAUDE.md 읽어" 라고 시키지 않아도 됩니다. 세션 시작이 방아쇠입니다.',
    '- 단, "지금 이미 열려 있는" 대화방에는 적용되지 않습니다 (다음 슬라이드에서 다룹니다).',
], 'info'))
s.save(os.path.join(A, 'CLAUDE_md_언제_읽히나.svg'))


# ── 3. 어디에 두나 ────────────────────────────────────────────────
s = Slide(B, S, '어디에 두나', '점(.)으로 시작하는 폴더는 숨김 폴더입니다 — .claude 도 마찬가지입니다', None)
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False),
          (1, '.claude', 'folder', True),
          (2, 'CLAUDE.md', 'file', True)],
    editor=[(1, '← 왼쪽 탐색기에서 경로를 확인하세요', '#9ca3af'),
            (2, '.claude 는 이름 앞의 점(.) 때문에 평소엔 숨겨져 있습니다', '#fbbf24')],
))
s.save(os.path.join(A, 'CLAUDE_md_어디에.svg'))


# ── 4. 무엇을 적나 ────────────────────────────────────────────────
s = Slide(B, S, '무엇을 적나', '네 가지만 정하면 정체성이 생깁니다', None)
s.add(card(60, 182, 554, 130, '① 이름', 'info', '이름',
           ["예: 'ㅇㅇ' 처럼 부를 이름을 하나 정한다", '정체성의 첫 조각']))
s.add(card(626, 182, 554, 130, '② 역할', 'ok', '역할',
           ["예: 'ai 에이전트 수업 도우미'", '무슨 일을 하는 존재인지 규정한다']))
s.add(card(60, 328, 554, 130, '③ 말투', 'warn', '말투',
           ["예: 문장 끝마다 '~요' 를 '~용용' 으로", '말투는 규칙으로 적어야 지켜진다']))
s.add(card(626, 328, 554, 130, '④ 하지 말 것', 'plain', '하지 말 것',
           ['예: 모르면 추측하지 말고 되묻기', '경계를 정해두면 실수를 줄인다']))
s.add(box(480, None, ['이 네 가지는 예시일 뿐, 원하는 이름·역할·말투로 자유롭게 바꿔도 됩니다'], 'plain'))
s.save(os.path.join(A, 'CLAUDE_md_무엇을.svg'))


# ── 5. 먼저 그냥 물어보기 ─────────────────────────────────────────
s = Slide(B, S, '먼저 그냥 물어보기', 'CLAUDE.md 가 없을 때, 지금 이 에이전트는 누구일까요?', None)
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False)],
    term=[
        ('> 너는 누구니?', '#e5e7eb', 15),
        ('', None, 8),
        ('안녕하세요! 저는 Claude Code예요.', '#4ade80', 15),
        ('Anthropic이 만든 AI 코딩 어시스턴트예요.', '#4ade80', 15),
    ],
))
s.add(box(662, None, ['아직 .claude/CLAUDE.md 가 없어서, 기본 정체성 그대로 답합니다'], 'plain'))
s.save(os.path.join(A, 'CLAUDE_md_실습_전_질문.svg'))


# ── 6. .claude 폴더 만들기 ────────────────────────────────────────
s = Slide(B, S, '.claude 폴더 만들기', 'agent1 폴더 안에 .claude 라는 새 폴더를 만듭니다', None)
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False),
          (1, '.claude', 'folder', True)],
    editor=[(1, '왼쪽 탐색기에서 agent1 위에 마우스를 올리고', '#e5e7eb'),
            (2, '"새 폴더" 아이콘을 클릭합니다', '#e5e7eb'),
            (3, '', None),
            (4, "이름은 반드시 '.claude' (점 포함)", '#67e8f9')],
))
s.save(os.path.join(A, 'CLAUDE_md_폴더_만들기.svg'))


# ── 7. CLAUDE.md 파일 만들기 ─────────────────────────────────────
s = Slide(B, S, 'CLAUDE.md 파일 만들기', '.claude 폴더 안에 CLAUDE.md 파일을 만듭니다', None)
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False),
          (1, '.claude', 'folder', False),
          (2, 'CLAUDE.md', 'file', True)],
    editor=[(1, '.claude 폴더 위에서 "새 파일" 아이콘을 클릭합니다', '#e5e7eb'),
            (2, '', None),
            (3, "이름은 정확히 'CLAUDE.md'", '#67e8f9')],
))
s.save(os.path.join(A, 'CLAUDE_md_파일_만들기.svg'))


# ── 8. 규칙 적기 ─────────────────────────────────────────────────
s = Slide(B, S, '규칙 적기', 'CLAUDE.md 안에 이름·역할·말투를 문장으로 적습니다', None)
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False),
          (1, '.claude', 'folder', False),
          (2, 'CLAUDE.md', 'file', True)],
    tab='CLAUDE.md',
    editor=[
        (1, "너의 이름은 'ㅇㅇ'이야, 너의 역할은", '#9cdcfe'),
        ('', "'ai 에이전트 수업 도우미'야.", '#9cdcfe'),
        (2, "말끝마다 '~요'를 '~용용'으로 붙여서 답변해", '#9cdcfe'),
    ],
))
s.add(box(662, None, ['저장(Ctrl/Cmd + S) 하는 것도 잊지 마세요'], 'plain'))
s.save(os.path.join(A, 'CLAUDE_md_내용_작성.svg'))


# ── 9. /clear 를 왜 하나 ──────────────────────────────────────────
s = Slide(B, S, '/clear 를 왜 하나', 'CLAUDE.md 를 고쳐도, 지금 대화방은 옛 내용을 그대로 기억합니다', None)
s.add(flow_row(178, [
    ('CLAUDE.md 작성/수정', ['방금 파일을 저장했다'], 'plain'),
    ('지금 대화방', ['옛 내용이 남아있다', '파일을 고쳐도 즉시 안 바뀐다'], 'warn'),
], height=104))
s.add(down_arrow(640, 292, 340, '/clear'))
s.add(flow_row(348, [
    ('/clear 실행', ['"이 채팅방 나가기"'], 'info'),
    ('새 대화방 시작', ['처음부터 다시 연다'], 'info'),
    ('CLAUDE.md 다시 읽음', ['새 규칙이 반영된다'], 'ok'),
], height=104))
s.add(box(470, '핵심', ['/clear = 지금 채팅방을 나가고, 새 채팅방으로 가는 것.',
                        '새 채팅방은 시작하면서 CLAUDE.md 를 다시 읽습니다.'], 'ok'))
s.save(os.path.join(A, 'CLAUDE_md_clear.svg'))


# ── 10. 다시 물어보기 ─────────────────────────────────────────────
s = Slide(B, S, '다시 물어보기', '/clear 로 새 대화방을 연 뒤, 같은 질문을 다시 해봅니다', None)
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False),
          (1, '.claude', 'folder', False),
          (2, 'CLAUDE.md', 'file', False)],
    term=[
        ('> /clear', '#67e8f9', 15),
        ('새 대화방을 시작합니다.', '#9ca3af', 13),
        ('', None, 6),
        ('> 너는 누구니?', '#e5e7eb', 15),
        ('', None, 8),
        ('저는 ㅇㅇ이에용용, ai 에이전트 수업 도우미에용용', '#4ade80', 15),
    ],
))
s.add(box(662, None, ['이름·역할·말투 세 가지가 모두 CLAUDE.md 그대로 반영되었습니다'], 'ok'))
s.save(os.path.join(A, 'CLAUDE_md_실습_후_질문.svg'))


# ── 11. 전과 후 ───────────────────────────────────────────────────
s = Slide(B, S, '전과 후', '같은 질문 "너는 누구니?" — 파일 하나로 답이 달라집니다', None)
s.add(two_col(190,
    ('CLAUDE.md 전',
     ['"너는 누구니?"', '', '안녕하세요! 저는 Claude', 'Code예요. Anthropic이 만든', 'AI 코딩 어시스턴트예요.'],
     '기본 정체성 그대로'),
    ('CLAUDE.md 후',
     ['"너는 누구니?"', '', '저는 ㅇㅇ이에용용,', 'ai 에이전트 수업', '도우미에용용'],
     '이름·역할·말투가 모두 바뀜'),
    height=340))
s.save(os.path.join(A, 'CLAUDE_md_비교.svg'))


# ── 12. 정리 ──────────────────────────────────────────────────────
s = Slide(B, S, '정리', 'CLAUDE.md 파일 하나로 에이전트의 정체성을 바꿨습니다', None)
s.add(check_rows(210, [
    ('[v]', '작성', 'agent1/.claude/CLAUDE.md 에 이름·역할·말투를 적었다', OK),
    ('[v]', '로드', '세션이 시작될 때 자동으로 읽혔다', OK),
    ('[v]', '반영', '/clear 로 새 대화방을 열자 답변이 바뀌었다', OK),
]))
s.add(box(360, None, ['말 한마디 한마디로 지시하는 대신, 파일 하나로 "항상 그런 존재" 를 만든 것입니다'], 'ok'))
s.add(box(452, '다음 시간', ['에이전트가 프로젝트 파일을 직접 읽는 Read 툴을 다룹니다'], 'info'))
s.save(os.path.join(A, 'CLAUDE_md_정리.svg'))

print('완료: 12장 생성')
