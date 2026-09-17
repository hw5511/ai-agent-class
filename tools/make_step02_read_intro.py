# -*- coding: utf-8 -*-
"""BASIC 02 · Read 툴 파트 — 준비 구간 슬라이드 8장 생성.

Read 툴이 무엇인지, 실습 자료를 받아 압축을 풀고 VS Code 로 하나씩
열어보다가 PDF 는 확장 프로그램이 필요하다는 걸 깨닫기까지의 과정을
한 슬라이드에 한 단계씩 잘게 쪼갠다.

좌표는 손으로 만들지 않고 tools/slidekit.py 함수만 쓴다.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import (
    Slide, vscode, terminal, check_rows, box, two_col, section,
    text, rect, flow_row, down_arrow, card, arrow, callout,
    prompt_bar, rename_rows, TINTS,
    OK, OK_DEEP, BAD, WARN, WARN_DEEP, CYAN, CODE,
    BLUE, BLUE_DEEP, MUTED, FAINT, INK, PANEL_BG, LINE,
)

BADGE = 'BASIC 02'
STEP = 'STEP 3'
OUT = 'assets/basic/step02/'


def save(name, s):
    s.save(OUT + name)


# practice_files 안 8개 파일 — VS Code 탐색기(깊이2, 폭 ~146px)에 그대로
# 넣으면 넘치므로, 실제 VS Code 가 하는 것처럼 말줄임표로 잘라서 보여준다.
FILES = [
    'doc_230928_v3.txt',
    'temp_1104.txt',
    'report_final_v2.pdf',
    'KakaoTalk_20260312_175159585.jpg',
    'KakaoTalk_20260312_175159586.jpg',
    'KakaoTalk_20260312_175159587.jpg',
    'IMG_20260309_134502.jpg',
    'IMG_20260311_092341.jpg',
]


def trunc(name, maxlen=19):
    return name if len(name) <= maxlen else name[:maxlen - 1] + '…'


def practice_tree(hot_name=None):
    """agent1 > .claude / practice_files(8개) 트리. hot_name 이 그 파일을 강조."""
    rows = [
        (0, 'agent1', 'folder', hot_name is None and False),
        (1, '.claude', 'folder', False),
        (1, 'practice_files', 'folder', hot_name == 'practice_files'),
    ]
    for f in FILES:
        rows.append((2, trunc(f), 'file', f == hot_name))
    return rows


# ── 1. Read 툴이란? ──────────────────────────────────────────────
s = Slide(BADGE, STEP, 'Read 툴이란?',
          'Claude가 내 컴퓨터의 파일을 직접 열어 읽는 도구입니다',
          '채팅창에 내용을 복사·붙여넣기 할 필요가 없습니다')
s.add(section(190, '세 단계'))
s.add(flow_row(212, [
    ('파일 지목', ['"이 파일 읽어줘"', '또는 필요할 때 알아서 찾음'], 'plain'),
    ('Claude가 읽음', ['파일을 직접 열어서', '전체 내용을 확인'], 'info'),
    ('이해하고 답함', ['복사·붙여넣기 없이', '바로 질문에 답변'], 'ok'),
], height=150))
s.add(box(422, '핵심', [
    '지금까지는 파일 내용을 직접 복사해서 채팅창에 붙여넣어야 했습니다.',
    'Read 툴을 쓰면 파일 경로(또는 이름)만 알려줘도 Claude가 직접 열어봅니다.',
], kind='info'))
save('read_툴_이란.svg', s)


# ── 2. 무엇을 읽을 수 있나 ───────────────────────────────────────
s = Slide(BADGE, STEP, '무엇을 읽을 수 있나',
          '텍스트 · 이미지 · PDF — 세 가지를 모두 읽습니다',
          "이미지를 '본다'는 게 핵심 — 파일명이 아니라 실제 그림 내용을 이해합니다")
s.add(section(190, '읽을 수 있는 파일'))
s.add(card(60, 216, 360, 300, 'TEXT', 'info', '텍스트', [
    '.txt · .md · .py · .html · .json 등',
    '글자로 된 파일은 전부 읽습니다',
]))
s.add(card(460, 216, 360, 300, 'IMAGE', 'ok', '이미지', [
    '.jpg · .png · .gif · .webp',
    "그림을 직접 '보고' 설명합니다",
]))
s.add(card(860, 216, 360, 300, 'PDF', 'warn', 'PDF', [
    '문서를 페이지째 읽습니다',
    '최대 100페이지 · 20MB',
]))
save('read_읽을_수_있는_것.svg', s)


# ── 3. 실습 자료 받기 ────────────────────────────────────────────
s = Slide(BADGE, STEP, '실습 자료 받기',
          "뷰어 화면의 '실습 자료 다운로드' 버튼을 눌러 받습니다",
          'agent1 폴더에 저장하세요 — 오늘 실습 내내 이 폴더를 씁니다')
s.add(section(190, '실습 페이지에서'))
s.add(rect(60, 212, 1160, 110, PANEL_BG, rx=12, stroke=LINE))
s.add(text(92, 244, 'Read 실습 페이지', 15, INK, '700'))
s.add(text(92, 270, '맨 아래 "실습 자료 다운로드" 버튼을 클릭합니다', 13, MUTED))
s.add(rect(860, 234, 300, 52, BLUE, rx=8))
s.add(text(1010, 266, '⬇  실습 자료 다운로드', 14, '#ffffff', '700', anchor='middle'))
s.add(callout(845, 264, '← 여기를 클릭', BLUE_DEEP, 13, anchor='end'))
s.add(down_arrow(1010, 332, 378, '다운로드'))
s.add(section(392, 'zip 안에 든 파일 8개 (미리보기)'))
s.add(terminal(414, 210, [(f, CODE, 13) for f in FILES], gap=22, start=28))
save('read_실습자료_받기.svg', s)


# ── 4. 압축 풀기 ─────────────────────────────────────────────────
s = Slide(BADGE, STEP, '압축 풀기',
          'agent1 폴더 안에서 zip을 풀면 practice_files 폴더가 생깁니다',
          '위치는 상관없습니다 — agent1 폴더 안이기만 하면 됩니다')
s.add(two_col(200,
    ('Windows', [
        'read_practice.zip 우클릭',
        '→ "압축 풀기"',
        '(또는 "모두 압축 해제")',
    ], 'practice_files 폴더가 같은 자리에 생깁니다'),
    ('macOS', [
        'read_practice.zip 더블클릭',
        '→ 자동으로 압축 해제',
        '(별도 메뉴 없음)',
    ], '더블클릭 한 번으로 practice_files 폴더가 생깁니다'),
    height=300,
))
s.add(box(520, None, [
    '압축을 풀면 zip 파일과 같은 자리에 practice_files 폴더가 새로 생깁니다.',
    '이 폴더가 agent1 폴더 안에 있는지 다시 한번 확인하세요.',
], kind='warn'))
save('read_압축_풀기.svg', s)


# ── 5. VS Code에서 열어보기 ──────────────────────────────────────
s = Slide(BADGE, STEP, 'VS Code에서 열어보기',
          'agent1 안에 생긴 practice_files 폴더를 펼치면 파일 8개가 보입니다',
          '파일명만 봐서는 안에 무엇이 들었는지 전혀 알 수 없습니다')
s.add(vscode(
    tree=practice_tree('practice_files'),
    editor=[],
    term=[
        ('practice_files 안에 파일이 8개.', MUTED, 12),
        ('이름만 봐서는 뭔지 짐작이 안 됩니다.', FAINT, 12),
    ],
))
save('read_폴더_펼치기.svg', s)


# ── 6. 하나씩 열어보기 ───────────────────────────────────────────
s = Slide(BADGE, STEP, '하나씩 열어보기',
          '파일을 클릭하면 VS Code 편집기에 내용이 바로 뜹니다',
          '8개를 일일이 열어 확인하려면 오래 걸립니다 — 다음 실습에서 Claude에게 맡깁니다')
s.add(vscode(
    tree=practice_tree('doc_230928_v3.txt'),
    tab='doc_230928_v3.txt',
    editor=[
        (1, '2026년 3월 9일 회의록', '#e6edf3'),
        (2, '', None),
        (3, '참석자: 이팀장, 박대리, 김주임, 최인턴', '#9cdcfe'),
        (4, '', None),
        (5, '안건 1. Q1 실적 검토', '#e6edf3'),
        (6, '- 전월 대비 매출 12% 증가', '#9ca3af'),
        (7, '- 반품률 3.2% (목표치 초과, 원인 분석 필요)', '#9ca3af'),
    ],
    term=[
        ('# 나머지 7개도 하나씩 클릭해서', FAINT, 12),
        ('# 확인하는 중...', FAINT, 12),
    ],
))
save('read_파일_열어보기.svg', s)


# ── 7. PDF는 확장 프로그램이 필요합니다 ──────────────────────────
s = Slide(BADGE, STEP, 'PDF는 확장 프로그램이 필요합니다',
          'report_final_v2.pdf 를 클릭하면 알림이 뜹니다',
          'Install 을 누르면 잠시 후 PDF 미리보기를 볼 수 있습니다')
s.add(vscode(
    tree=practice_tree('report_final_v2.pdf'),
    tab='report_final_v2.pdf',
    editor=[
        (1, '이 파일 형식은 미리 볼 수 없습니다.', FAINT),
        (2, '(vscode-pdf 확장 설치 후 다시 열어보세요)', FAINT),
    ],
))
# 알림 토스트 — VS Code 오른쪽 아래에 뜨는 형태
s.add(rect(860, 486, 340, 120, '#252526', rx=8, stroke='#3c3c3c', sw=1))
s.add(text(884, 514, '이 파일을 보려면 확장 프로그램이 필요합니다', 12.5, '#e5e7eb', '600'))
s.add(text(884, 538, 'vscode-pdf 를 설치하시겠습니까?', 12.5, '#9ca3af'))
s.add(rect(884, 554, 108, 34, BLUE, rx=6))
s.add(text(938, 576, 'Install', 13, '#ffffff', '700', anchor='middle'))
s.add(text(1010, 576, '나중에', 12, '#9ca3af'))
s.add(callout(884, 470, '← Install 을 클릭하면 설치됩니다', BLUE_DEEP, 13))
save('read_pdf_확장설치.svg', s)


# ── 8. 알림을 닫아버렸다면 ────────────────────────────────────────
s = Slide(BADGE, STEP, '알림을 닫아버렸다면',
          '확장 아이콘 → 검색 → Install, 3단계로 직접 설치합니다',
          'PDF를 못 열어도 Claude는 읽을 수 있습니다 — 이건 사람이 눈으로 확인하기 위한 준비입니다')
s.add(section(190, '수동 설치 3단계'))
s.add(card(60, 216, 360, 300, '①', 'info', '확장 아이콘 클릭', [
    '왼쪽 액티비티 바의 네모 4개',
    '아이콘(Extensions)을 클릭',
]))
s.add(card(460, 216, 360, 300, '②', 'ok', '검색창에 입력', [
    '검색창에 vscode pdf 라고',
    '입력합니다',
]))
s.add(card(860, 216, 360, 300, '③', 'warn', '첫 항목 Install', [
    '목록 맨 위 확장 프로그램의',
    'Install 버튼을 클릭',
]))
# 카드마다 작은 아이콘을 하나씩 얹는다 (slidekit 색만 사용)
info_c = TINTS['info'][2]
ok_c = TINTS['ok'][2]
warn_c = TINTS['warn'][2]
# ① 네모 4개
for dx, dy in [(0, 0), (18, 0), (0, 18), (18, 18)]:
    s.add(rect(330 + dx, 240 + dy, 14, 14, info_c, rx=2))
# ② 돋보기
s.add(f'  <circle cx="792" cy="248" r="9" fill="none" stroke="{ok_c}" stroke-width="2.5"/>')
s.add(f'  <line x1="799" y1="255" x2="808" y2="264" stroke="{ok_c}" stroke-width="2.5" '
      f'stroke-linecap="round"/>')
# ③ Install 버튼 미니어처
s.add(rect(1152, 236, 52, 22, warn_c, rx=4))
s.add(text(1178, 251, 'Install', 9.5, '#ffffff', '700', anchor='middle'))
save('read_pdf_확장_수동설치.svg', s)

print('완료: 8장 생성')
