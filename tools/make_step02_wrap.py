# -*- coding: utf-8 -*-
"""basic step02 — 마무리 구간 슬라이드 5장을 생성한다. (slidekit 사용)"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import (Slide, check_rows, box, two_col, card, flow_row, arrow, text,
                       OK, OK_DEEP, WARN_DEEP, TINTS)

A = 'assets/basic/step02'
B, S = 'BASIC 02', 'STEP 7'


# ── 1. 오늘 한 것 ─────────────────────────────────────────────────
s = Slide(B, S, '오늘 한 것', '네 가지 툴로 오늘 실제로 한 일들입니다',
          '내가 이걸 다 했다고? 전부 오늘 실습에서 직접 한 일입니다')
s.add(card(60, 182, 568, 192, 'Read 툴', 'info', '읽었다', [
    '정체불명 파일 8개를 열어 읽었다',
    '내용을 보고 무슨 파일인지 파악했다',
    '내용에 맞는 이름으로 정리했다',
]))
s.add(card(652, 182, 568, 192, 'Write 툴', 'ok', '만들었다', [
    '자기소개서 md · 강아지 그림 svg',
    'html 포스터 · tkinter 계산기',
    '테트리스 게임까지 새로 제작',
]))
s.add(card(60, 398, 568, 192, 'Edit 툴', 'warn', '고쳤다', [
    '테트리스를 실행해보고 개선했다',
    '포스터의 색을 바꿔 다시 확인했다',
]))
s.add(card(652, 398, 568, 192, 'Bash 툴', 'plain', '실행했다', [
    '카카오톡 · 유튜브 실행',
    '파일 목록 설명 · 시스템 정보 조회',
    '테트리스 실행 · 바탕화면 슬라임 위젯',
    '웹캠으로 사진 캡처',
]))
s.save(os.path.join(A, 'wrap_오늘_한_것.svg'))


# ── 2. 동작 원리 (루프) ───────────────────────────────────────────
s = Slide(B, S, '에이전트는 이렇게 움직입니다', 'ChatGPT 와 다른 점 — 멈춰있지 않고 스스로 반복합니다', None)
s.add(flow_row(250, [
    ('사용자 지시', ['무엇을 만들지 말한다'], 'plain'),
    ('작성', ['Write·Edit 로', '코드·명령어를 만든다'], 'info'),
    ('실행', ['Bash 로', '직접 실행한다'], 'info'),
    ('확인', ['Read 로', '결과를 확인한다'], 'ok'),
], height=140))
# 루프: 확인(4번째 박스) → 작성(2번째 박스) 로 되돌아가는 순환 화살표
_loop_x1, _loop_x2, _loop_y_top, _loop_y_row = 489.5, 1091.5, 200, 250
s.add(arrow(_loop_x2, _loop_y_row, _loop_x2, _loop_y_top, color=WARN_DEEP, dashed=True, head=0))
s.add(arrow(_loop_x2, _loop_y_top, _loop_x1, _loop_y_top, color=WARN_DEEP, dashed=True, head=0))
s.add(arrow(_loop_x1, _loop_y_top, _loop_x1, _loop_y_row, color=WARN_DEEP, dashed=True, head=14))
s.add(text((_loop_x1 + _loop_x2) / 2, _loop_y_top - 10,
           '안 되면 다시 고쳐서 — 될 때까지 반복', 13.5, WARN_DEEP, '700', anchor='middle'))
s.add(box(420, '핵심', ['안 되면 다시 고치는 것을 답이 나올 때까지 반복합니다'], 'warn'))
s.footnote = '테트리스를 만들고 → 실행하고 → 고친 것, 오늘의 그 루프였습니다'
s.save(os.path.join(A, 'wrap_동작_원리.svg'))


# ── 3. ChatGPT 와 다르다 ──────────────────────────────────────────
s = Slide(B, S, 'ChatGPT 와 무엇이 다른가', '같은 질문도, 돌아오는 것이 다릅니다', None)
s.add(two_col(190,
    ('ChatGPT',
     ['"테트리스 어떻게 만들어?"', '→ 설명과 예시 코드만 돌아온다',
      '실행은 내가 직접 해야 한다', '복사·붙여넣기가 필요하다'],
     '답을 글로 돌려준다'),
    ('AI 에이전트',
     ['"테트리스 만들어서 실행해줘"', '→ 파일을 직접 만든다',
      '→ Bash 로 직접 실행한다', '결과가 화면에 실제로 뜬다'],
     '내 컴퓨터에 결과가 실물로 남는다'),
    height=300))
s.add(box(510, '오늘의 증거', ['테트리스 게임과 바탕화면 슬라임 위젯이 실제로 내 컴퓨터에 남았습니다'], 'ok'))
s.save(os.path.join(A, 'wrap_챗gpt와_다르다.svg'))


# ── 4. 질문에서 지시로 ────────────────────────────────────────────
s = Slide(B, S, "'질문'이 아니라 '지시'", '그래서 프롬프트를 쓰는 법이 달라집니다', None)
s.add(two_col(190,
    ('질문하는 습관', ['"테트리스는 어떻게 만들어?"'], '설명만 돌아온다'),
    ('지시하는 프롬프트', ['"테트리스를 파이썬으로 만들어서 실행해줘"'], '결과물이 남는다'),
    height=200))
s.add(card(60, 410, 272, 140, '① 무엇을', 'info', '테트리스', ['만들 대상을 구체적으로']))
s.add(card(356, 410, 272, 140, '② 어떤 형태로', 'info', '파이썬으로', ['결과물의 형태를 정한다']))
s.add(card(652, 410, 272, 140, '③ 어디에', 'info', '현재 폴더에', ['저장 위치를 정한다']))
s.add(card(948, 410, 272, 140, '④ 그다음 무엇을', 'info', '실행까지', ['다음 행동을 이어 지시']))
s.add(box(560, None,
          ["오늘 쓴 프롬프트 '강아지 포스터를 html 로 현재 폴더에 만들어 크롬으로 열어줘' 도 이 순서였습니다"],
          'plain'))
s.save(os.path.join(A, 'wrap_질문에서_지시로.svg'))


# ── 5. 2회차 마무리 ────────────────────────────────────────────────
s = Slide(B, S, '2회차 마무리', '오늘 얻은 것을 짧게 정리합니다', None)
s.add(check_rows(220, [
    ('[v]', '정체성', 'CLAUDE.md 로 이름·역할·말투를 부여했다', OK),
    ('[v]', '네 툴', 'Read·Write·Edit·Bash 로 읽고·만들고·고치고·실행했다', OK),
    ('[v]', '실물 확인', '지시하면 결과가 파일과 화면으로 실제 남았다', OK),
]))
s.add(box(380, None, ['오늘 배운 네 가지 툴이, 앞으로 모든 실습의 기본이 됩니다'], 'ok'))
s.add(box(470, '다음 시간 — Claude Code 환경 설정과 기본 명령어',
          ['권한 모드와 욜로 모드 · 개인정보 보안 설정 · settings.json',
           '자주 쓰는 슬래시 명령어 · 웹 검색 툴'], 'info'))
s.footnote = '오늘 정말 많은 것을 직접 만들고 실행했습니다 — 수고하셨습니다'
s.save(os.path.join(A, 'wrap_마무리.svg'))

print('완료: 5장 생성')
