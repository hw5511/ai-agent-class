# -*- coding: utf-8 -*-
"""BASIC 02 · STEP 1 복습 슬라이드 13장 생성.

지난 시간(1회차) 환경 세팅을 복습하며 agent1 폴더로 다시 세팅하는 흐름.
좌표는 손으로 만들지 않고 tools/slidekit.py 함수만 쓴다.
"""
import sys
sys.path.insert(0, 'tools')
from slidekit import (
    Slide, vscode, terminal, check_rows, box, two_col, section, text, rect,
    OK, BAD, WARN, CYAN, MUTED, INK, FAINT, BLUE_DEEP,
)

BADGE = 'BASIC 02'
STEP = 'STEP 1'
OUT = 'assets/basic/step02/'


def save(name, s):
    s.save(OUT + name)


# 1. 복습_지난_시간 ----------------------------------------------------
s = Slide(BADGE, STEP, '지난 시간에 한 것',
          '1회차에서 여기까지 왔습니다 — 오늘은 이걸 다시 세팅합니다',
          '기억이 안 나도 괜찮습니다, 오늘 처음부터 다시 해봅니다')
s.add(section(190, '1회차 체크리스트'))
s.add(check_rows(232, [
    ('[v]', 'VS Code', '설치 완료', OK),
    ('[v]', '실습 폴더', '만들고 열었음', OK),
    ('[v]', '터미널', 'Ctrl + J 로 열기', OK),
    ('[v]', 'CLI 설치', 'claude 명령 사용 가능', OK),
    ('[v]', '로그인', '브라우저로 계정 연결', OK),
]))
s.add(box(478, None, [
    '오늘은 새 폴더 agent1 으로 이 과정을 처음부터 한 번 더 따라갑니다.',
    '이미 익숙해졌다면 빠르게, 처음이라면 천천히 따라오면 됩니다.',
], kind='plain'))
save('복습_지난_시간.svg', s)


# 2. 복습_agent1_폴더 ---------------------------------------------------
s = Slide(BADGE, STEP, '실습 폴더 만들기',
          '바탕화면(또는 다운로드)에 agent1 폴더를 새로 만듭니다',
          '이름은 꼭 agent1 — 오늘 실습 내내 이 폴더를 씁니다')
s.add(section(190, '파일 탐색기'))
s.add(rect(60, 210, 1160, 150, '#f8fafc', rx=12))
s.add(rect(60, 210, 1160, 150, 'none', rx=12, stroke='#e2e8f0'))
s.add([rect(96, 234, 150, 96, '#ffffff', rx=8, stroke='#d1d5db')])
s.add([f'  <path d="M112 258h20l6 8h34v40h-60z" fill="#dcb67a"/>'])
s.add(text(171, 348, '바탕화면', 12, MUTED, anchor='middle'))
s.add([rect(276, 234, 150, 96, '#eff6ff', rx=8, stroke='#93c5fd', sw=2)])
s.add([f'  <path d="M292 258h20l6 8h34v40h-60z" fill="#60a5fa"/>'])
s.add(text(351, 348, 'agent1  (신규)', 13, BLUE_DEEP, '700', anchor='middle'))
s.add(text(500, 275, '→  마우스 우클릭 → 새로 만들기 → 폴더', 15, INK, '600'))
s.add(text(500, 305, '→  이름을 agent1 으로 입력하고 Enter', 15, INK, '600'))
s.add(section(392, '어느 위치든 상관없습니다'))
s.add(terminal(y=414, height=146, lines=[
    ('바탕화면에 두거나, 다운로드 폴더 안에 두어도 됩니다.', None, 14),
    ('중요한 건 폴더 이름이 agent1 이라는 것, 그리고', None, 14),
    ('내가 이 폴더 위치를 기억하고 있다는 것뿐입니다.', CYAN, 14),
]))
save('복습_agent1_폴더.svg', s)


# 3. 복습_폴더_열기 ------------------------------------------------------
s = Slide(BADGE, STEP, '작업 폴더 열기',
          'VS Code 메뉴에서 File > Open Folder 를 고릅니다',
          '반드시 agent1 폴더 자체를 선택해서 엽니다')
s.add(rect(60, 190, 1160, 420, '#1e1e1e', rx=10, stroke='#333333'))
s.add(rect(60, 190, 1160, 34, '#2d2d2d', rx=10))
s.add(text(90, 212, 'Visual Studio Code', 12, '#cccccc', '500'))
s.add(rect(60, 224, 90, 26, '#3a3a3a'))
s.add(text(105, 241, 'File', 12.5, '#ffffff', '600', anchor='middle'))
for i, label in enumerate(['Edit', 'Selection', 'View', 'Go']):
    s.add(text(150 + 90 + i * 90, 241, label, 12, '#cccccc', anchor='middle'))
s.add(rect(60, 250, 300, 224, '#252526', stroke='#3c3c3c', sw=1))
menu_items = [
    ('New Text File', 'Ctrl+N', False),
    ('New Window', 'Ctrl+Shift+N', False),
    ('Open File...', 'Ctrl+O', False),
    ('Open Folder...', 'Ctrl+K Ctrl+O', True),
    ('Open Workspace from File...', '', False),
]
yy = 250
for label, keys, hot in menu_items:
    row_h = 34
    if hot:
        s.add(rect(60, yy, 300, row_h, '#094771'))
    s.add(text(80, yy + 22, label, 12.5, '#ffffff' if hot else '#e0e0e0'))
    if keys:
        s.add(text(348, yy + 22, keys, 11, '#9d9d9d', anchor='end'))
    yy += row_h
s.add(text(400, 340, '← 이 항목을 클릭', 15, BLUE_DEEP, '700'))
s.add(text(400, 368, 'agent1 폴더를 찾아 선택 → "폴더 선택" 버튼', 14, MUTED))
save('복습_폴더_열기.svg', s)


# 4. 복습_터미널_열기 ----------------------------------------------------
s = Slide(BADGE, STEP, 'Ctrl + J 로 터미널 열기',
          '채팅창을 닫고, 터미널을 엽니다',
          '앞으로 우리는 이 터미널에서 명령을 입력합니다')
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False)],
    tab=None,
    editor=[],
    term=[
        ('PS C:\\Users\\me\\Desktop\\agent1>', '#e5e7eb'),
    ],
))
s.add(rect(946, 246, 220, 64, 'none', rx=8, stroke=OK, sw=2))
s.add(text(1056, 236, 'Ctrl + J', 16, OK, '800', anchor='middle'))
save('복습_터미널_열기.svg', s)


# 5. 복습_패널_우측 ------------------------------------------------------
s = Slide(BADGE, STEP, '터미널을 오른쪽으로',
          'TERMINAL 글자를 우클릭 → Panel Position → Right',
          '앞으로 모든 실습은 이 배치(편집기 왼쪽, 터미널 오른쪽)로 진행합니다')
s.add(rect(60, 190, 1160, 420, '#1e1e1e', rx=10, stroke='#333333'))
s.add(rect(60, 190, 1160, 32, '#252526'))
s.add(text(78, 211, 'TERMINAL', 11, '#ffffff', '700', spacing='0.5'))
s.add(rect(76, 220, 62, 2, '#007acc'))
s.add(text(150, 211, 'OUTPUT', 11, '#858585'))
s.add(text(212, 211, 'PORTS', 11, '#858585'))
s.add(rect(60, 222, 1160, 388, '#181818'))
s.add(text(80, 254, 'PS C:\\...\\agent1>', 13, '#e5e7eb', mono=True))
# 우클릭 컨텍스트 메뉴
s.add(rect(60, 258, 260, 172, '#2d2d2d', rx=4, stroke='#454545', sw=1))
menu = ['Move Terminal into Editor Area', 'Rename...', 'Change Color...', 'Change Icon...',
        'Split Terminal', 'Panel Position', 'Kill Terminal']
yy = 274
for label in menu:
    hot = label == 'Panel Position'
    if hot:
        s.add(rect(60, yy - 15, 260, 28, '#094771'))
    s.add(text(78, yy + 4, label, 12, '#ffffff' if hot else '#d4d4d4'))
    if hot:
        s.add(text(300, yy + 4, '▶', 11, '#ffffff'))
    yy += 26
# 서브메뉴
s.add(rect(320, 358, 190, 116, '#2d2d2d', rx=4, stroke='#454545', sw=1))
sub = ['Top', 'Left', 'Right', 'Bottom']
yy = 374
for label in sub:
    hot = label == 'Right'
    if hot:
        s.add(rect(320, yy - 15, 190, 28, '#094771'))
    s.add(text(338, yy + 4, label, 12, '#ffffff' if hot else '#d4d4d4', '700' if hot else '400'))
    if hot:
        s.add(text(478, yy + 4, '✓', 12, OK, '700'))
    yy += 28
s.add(text(560, 380, '← 여기를 클릭', 15, BLUE_DEEP, '700'))
save('복습_패널_우측.svg', s)


# 6. 복습_claude_설치 ----------------------------------------------------
s = Slide(BADGE, STEP, 'Claude Code 설치',
          '터미널에 명령 한 줄을 붙여넣고 Enter',
          '윈도우는 PowerShell, macOS 는 터미널(Terminal) 앱에 붙여넣습니다')
s.add(two_col(
    y=190,
    left=('Windows · PowerShell', [
        'irm https://claude.ai/install.ps1 |',
        '  iex',
    ], '설치가 끝나면 claude 명령을 바로 쓸 수 있습니다'),
    right=('macOS · Terminal', [
        'curl -fsSL https://claude.ai/install.sh',
        '  | bash',
    ], '설치가 끝나면 claude 명령을 바로 쓸 수 있습니다'),
    height=300,
))
s.add(box(512, None, [
    '설치 중 여러 줄의 로그가 지나갑니다 — 끝날 때까지 기다립니다.',
    '오류 없이 프롬프트(> )가 다시 보이면 설치가 끝난 것입니다.',
], kind='plain'))
save('복습_claude_설치.svg', s)


# 7. 복습_PATH_자동등록 --------------------------------------------------
s = Slide(BADGE, STEP, 'PATH 한 번에 잡기',
          '설치 후 바로 안 잡힐 때가 있습니다 — 자동 등록 스크립트로 정리',
          'VS Code 를 껐다 켤 필요 없이 바로 확인됩니다')
s.add(section(190, '확인 명령을 실행하면'))
s.add(terminal(y=212, height=210, lines=[
    ('PS C:\\...\\agent1> claude --version', '#e5e7eb', 15),
    ('--', None),
]))
s.add(check_rows(292, [
    ('[v]', 'claude', '사용 가능!  2.1.274 (Claude Code)', OK),
]))
s.add(box(438, None, [
    '초록으로 [v] 가 뜨고 버전 번호가 보이면 PATH 등록이 끝난 것입니다.',
    '아직도 인식이 안 되면 터미널을 닫고 새로 열어 다시 시도하세요.',
], kind='plain'))
save('복습_PATH_자동등록.svg', s)


# 8. 복습_claude_실행 ----------------------------------------------------
s = Slide(BADGE, STEP, 'claude 실행',
          '터미널에 claude 를 입력하고 Enter — Claude Code 가 시작됩니다',
          '처음 실행하면 시작 화면이 이렇게 나옵니다')
s.add(vscode(
    tab='CLAUDE.md',
    editor=[],
    term=[
        ('PS C:\\...\\agent1> claude', '#e5e7eb'),
        ('', None),
        ('✳ Claude Code v2.1.274', CYAN, 13),
        ('', None),
        ('  agent1 저장소', MUTED, 12),
        ('', None),
        ('> ', '#e5e7eb', 14),
    ],
))
save('복습_claude_실행.svg', s)


# 9. 복습_login ----------------------------------------------------------
s = Slide(BADGE, STEP, '/login 으로 다시 로그인',
          '입력창에 /login 을 입력합니다',
          '슬래시( / )로 시작하면 대화가 아니라 "명령"입니다')
s.add(vscode(
    tab='CLAUDE.md',
    editor=[],
    term=[
        ('> /login', CYAN, 16),
        ('', None),
        ('브라우저를 열어 로그인을', MUTED, 13),
        ('진행합니다...', MUTED, 13),
    ],
))
s.add(rect(752, 251, 96, 28, 'none', rx=6, stroke=OK, sw=2))
save('복습_login.svg', s)


# 10. 복습_계정_선택 ------------------------------------------------------
s = Slide(BADGE, STEP, '브라우저에서 계정 선택',
          '자동으로 브라우저가 열립니다 — 본인 계정을 고릅니다',
          '창을 닫지 말고 로그인 완료 화면까지 기다립니다')
s.add(rect(60, 190, 1160, 420, '#f8fafc', rx=12, stroke='#e2e8f0'))
s.add(rect(140, 220, 1000, 360, '#ffffff', rx=10, stroke='#d1d5db', sw=1.5))
s.add(rect(140, 220, 1000, 44, '#f3f4f6', rx=10))
s.add(rect(140, 250, 1000, 14, '#f3f4f6'))
s.add(text(168, 248, 'claude.ai/login', 12.5, MUTED, mono=True))
s.add(text(640, 312, 'Google 계정으로 계속하기', 18, INK, '700', anchor='middle'))
accounts = [('내 계정 · yangheewoo5511@gmail.com', True), ('다른 계정 사용', False)]
yy = 360
for label, hot in accounts:
    s.add(rect(240, yy, 800, 56, '#eff6ff' if hot else '#ffffff', rx=8,
                stroke='#93c5fd' if hot else '#e5e7eb', sw=2 if hot else 1))
    s.add(text(272, yy + 34, label, 14.5, BLUE_DEEP if hot else MUTED, '700' if hot else '400'))
    yy += 72
s.add(text(640, 552, '계정을 클릭하면 창이 자동으로 닫히고 터미널로 돌아옵니다', 13, FAINT, anchor='middle'))
save('복습_계정_선택.svg', s)


# 11. 복습_model_sonnet ---------------------------------------------------
s = Slide(BADGE, STEP, '/model sonnet',
          '모델을 Sonnet 으로 맞춥니다',
          '오늘 실습에는 Sonnet 이면 충분하고, 속도도 더 빠릅니다')
s.add(vscode(
    tab='CLAUDE.md',
    editor=[],
    term=[
        ('> /model sonnet', CYAN, 16),
        ('', None),
        ('  모델이 Sonnet 으로 설정되었습니다.', OK, 13),
    ],
))
s.add(box(650, None, [
    'Opus 는 더 강력하지만 느리고 비쌉니다. 실습·반복 작업에는 Sonnet 추천.',
], kind='plain'))
save('복습_model_sonnet.svg', s)


# 12. 복습_ide_none --------------------------------------------------------
s = Slide(BADGE, STEP, '/ide 로 연동 끊기',
          '/ide 입력 후, 목록에서 아래 방향키로 none 을 골라 Enter',
          '방향키(↓)로 이동한다는 점이 핵심입니다')
s.add(rect(740, 207, 480, 415, '#181818'))
s.add(rect(740, 207, 480, 31, '#252526'))
s.add(text(758, 226, 'TERMINAL', 11, '#ffffff', '700', spacing='0.5'))
s.add(rect(756, 236, 62, 2, '#007acc'))
s.add(text(60, 190, ' ', 1, '#ffffff'))
# 실제로는 vscode() 프레임을 쓰고 그 위에 목록을 겹쳐 그린다
s.add(vscode(
    tab='CLAUDE.md',
    editor=[],
    term=[
        ('> /ide', CYAN, 15),
    ],
))
options = ['VS Code', 'Cursor', 'none']
yy = 300
for i, opt in enumerate(options):
    hot = opt == 'none'
    if hot:
        s.add(rect(750, yy - 16, 460, 26, '#094771'))
    s.add(text(770, yy, ('❯ ' if hot else '  ') + opt, 13, '#ffffff' if hot else '#d4d4d4',
                '700' if hot else '400', mono=True))
    yy += 28
s.add([f'  <path d="M980 292 v34 M974 320 l6 8 l6 -8" fill="none" stroke="{OK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'])
s.add(text(1000, 318, '↓ 방향키로 이동', 12, OK, '700'))
s.add(text(1000, 336, 'none 에서 Enter', 12, OK, '700'))
save('복습_ide_none.svg', s)


# 13. 복습_준비_완료 --------------------------------------------------------
s = Slide(BADGE, STEP, '준비 완료',
          '오늘 실습 준비가 끝났습니다',
          '다음은 CLAUDE.md — 에이전트에게 규칙을 알려주는 파일입니다')
s.add(section(190, '오늘의 세팅 체크리스트'))
s.add(check_rows(232, [
    ('[v]', 'agent1', '폴더 생성 및 열기', OK),
    ('[v]', '터미널', '오른쪽 배치로 열림', OK),
    ('[v]', 'Claude Code', '설치 및 실행 확인', OK),
    ('[v]', '로그인', '/login 완료', OK),
    ('[v]', '/model', 'sonnet 설정 완료', OK),
    ('[v]', '/ide', 'none 으로 연동 해제', OK),
]))
s.add(box(494, None, [
    '여기까지 되면 오늘 실습을 시작할 준비가 모두 끝난 것입니다.',
    '다음 슬라이드에서 CLAUDE.md 파일을 만들어 봅니다.',
], kind='ok'))
save('복습_준비_완료.svg', s)

print('전부 완료.')
