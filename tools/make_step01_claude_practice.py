# -*- coding: utf-8 -*-
"""BASIC 01 · STEP 5 — Claude Code 실습 슬라이드 8장 재생성.

Antigravity·Codex 파트와 같은 실습(너는 누구니? -> claude.txt 작성 ->
확인 -> introduce 폴더 생성 -> 파일 이동 -> 최종 구조 -> Ctrl+C 종료 ->
일반 터미널 복귀)을 Claude Code 로 반복한다.

CEO 지시: VS Code 창 안에서 Claude Code 가 실제로 도는 것처럼 보이도록
agent_panel() 로 세션 헤더(오렌지 마스코트 포함)를 넣는다. 마지막 장만
에이전트가 빠진 일반 터미널이라 vscode() 의 평범한 term= 을 쓴다.

좌표는 손으로 만들지 않고 tools/slidekit.py 함수만 쓴다.
"""
import sys
sys.path.insert(0, 'tools')
from slidekit import Slide, vscode, agent_panel, rect, text, OK, CYAN, MUTED

BADGE = 'BASIC 01'
STEP = 'STEP 5'
OUT = 'assets/basic/step01/'
CWD = '~\\에이전트1'
VER = '2.1.278'


def save(name, s):
    s.save(OUT + name)


# 공통 트리 조각 ---------------------------------------------------------
TREE_EMPTY = [(0, '에이전트1', 'folder', False)]
TREE_FILE = [(0, '에이전트1', 'folder', False),
             (1, 'claude.txt', 'file', True)]
TREE_FILE_PLAIN = [(0, '에이전트1', 'folder', False),
                    (1, 'claude.txt', 'file', False)]
TREE_FOLDER_NEW = [(0, '에이전트1', 'folder', False),
                    (1, 'introduce', 'folder', True),
                    (1, 'claude.txt', 'file', False)]
TREE_MOVED = [(0, '에이전트1', 'folder', False),
              (1, 'introduce', 'folder', False),
              (2, 'claude.txt', 'file', True)]
TREE_FINAL = [(0, '에이전트1', 'folder', False),
              (1, 'introduce', 'folder', False),
              (2, 'claude.txt', 'file', False)]

INTRO_LINES = [
    ('1', '# 자기소개서', None),
    ('2', '안녕하세요! 저는 Claude Code입니다.', None),
    ('3', '프로젝트 전반을 이해하고 대규모 리팩터링 및', None),
    ('4', '문서 작성을 주도할 수 있습니다.', None),
]
INTRO_LINES_MOVED = [
    ('1', '# 자기소개서 (이동 완료)', None),
    ('2', '안녕하세요! 저는 Claude Code입니다.', None),
    ('3', '프로젝트 전반을 이해하고 대규모 리팩터링 및', None),
    ('4', '문서 작성을 주도할 수 있습니다.', None),
]


# 1. claude_첫_대화_자기소개 ---------------------------------------------
s = Slide(BADGE, STEP, '첫 대화: 너는 누구니?',
          'Claude Code에 자연어로 질문하고 응답을 확인합니다',
          '먼저 질문만 해보고 에이전트의 역할을 살펴봅니다')
s.add(vscode(tree=TREE_EMPTY, tab=None, editor=[], term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='claude', version=VER, cwd=CWD,
                   lines=[
                       ('user', '너는 누구니?'),
                       ('agent', '저는 Claude Code입니다. 파일을 읽고 쓰고'),
                       ('agent', '터미널 명령까지 실행할 수 있는 AI 코딩'),
                       ('agent', '에이전트예요.'),
                   ],
                   placeholder='메시지를 입력하세요...'))
save('claude_첫_대화_자기소개.svg', s)


# 2. claude_자기소개서_생성 ------------------------------------------------
s = Slide(BADGE, STEP, '자기소개서 파일 만들기',
          '요청한 위치와 이름으로 파일을 생성해 달라고 합니다',
          'AI에게 구체적인 파일 이름과 작성할 내용을 함께 요청합니다')
s.add(vscode(tree=TREE_FILE, tab='claude.txt', editor=INTRO_LINES, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='claude', version=VER, cwd=CWD,
                   lines=[
                       ('user', "현재 폴더에 'claude.txt'를 만들어줘."),
                       ('user', '네가 누구이고 무엇을 할 수 있는지 간단히'),
                       ('user', '작성해줘.'),
                       ('tool', 'Write(claude.txt)'),
                       ('agent', '✔ claude.txt 파일을 만들었습니다.'),
                   ],
                   placeholder='메시지를 입력하세요...'))
save('claude_자기소개서_생성.svg', s)


# 3. claude_파일_생성_확인 -------------------------------------------------
s = Slide(BADGE, STEP, '탐색기에서 파일 확인하기',
          '에이전트의 응답뿐 아니라 실제 파일이 생성됐는지도 살펴봅니다',
          '탐색기와 편집기에서 파일의 위치와 내용을 확인합니다')
s.add(vscode(tree=TREE_FILE, tab='claude.txt', editor=INTRO_LINES, term=[]))
s.add(text(120, 310, '↑ 탐색기에 파일 생성됨', 12, OK, '700'))
s.add(agent_panel(740, 238, 480, 384, agent='claude', version=VER, cwd=CWD,
                   lines=[
                       ('tool', 'Write(claude.txt)'),
                       ('agent', '✔ 완료했습니다. claude.txt를 생성했습니다.'),
                       ('agent', '왼쪽 탐색기에서 파일을 선택해 내용을 확인할'),
                       ('agent', '수 있습니다.'),
                   ],
                   placeholder='메시지를 입력하세요...'))
save('claude_파일_생성_확인.svg', s)


# 4. claude_introduce_폴더_생성 --------------------------------------------
s = Slide(BADGE, STEP, 'introduce 폴더 만들기',
          '파일을 정리할 새 하위 폴더 생성을 요청합니다',
          '에이전트는 파일 생성뿐만 아니라 폴더 구조 생성도 직접 수행합니다')
s.add(vscode(tree=TREE_FOLDER_NEW, tab='claude.txt', editor=INTRO_LINES, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='claude', version=VER, cwd=CWD,
                   lines=[
                       ('user', "'introduce' 폴더를 만들어줘."),
                       ('tool', 'Bash(mkdir introduce)'),
                       ('agent', "✔ 'introduce' 폴더를 생성했습니다."),
                       ('agent', '탐색기에서 새로 만들어진 폴더를 확인할 수'),
                       ('agent', '있습니다.'),
                   ],
                   placeholder='메시지를 입력하세요...'))
save('claude_introduce_폴더_생성.svg', s)


# 5. claude_자기소개서_이동 -------------------------------------------------
s = Slide(BADGE, STEP, '자기소개서를 폴더로 옮기기',
          '자연어로 파일 이동을 지시하고 변경된 경로를 확인합니다',
          '파일 이동 후 원래 위치에 파일이 남아있지 않은지 확인합니다')
s.add(vscode(tree=TREE_MOVED, tab='claude.txt', editor=INTRO_LINES_MOVED, term=[]))
s.add(text(120, 335, '↑ introduce 안으로 이동됨', 11.5, OK, '700'))
s.add(agent_panel(740, 238, 480, 384, agent='claude', version=VER, cwd=CWD,
                   lines=[
                       ('user', "'claude.txt'를 'introduce' 폴더로 옮겨줘."),
                       ('tool', 'Bash(mv claude.txt introduce/)'),
                       ('agent', '✔ 파일을 introduce 폴더로 이동했습니다.'),
                       ('agent', 'introduce\\claude.txt 로 이동 완료.'),
                   ],
                   placeholder='메시지를 입력하세요...'))
save('claude_자기소개서_이동.svg', s)


# 6. claude_최종_폴더_구조 --------------------------------------------------
s = Slide(BADGE, STEP, '최종 폴더 구조 확인',
          '요청한 파일이 introduce 폴더 안에 있는지 확인합니다',
          '완료 응답만 보지 말고 최종 파일 위치도 확인합니다')
s.add(vscode(tree=TREE_FINAL, tab='claude.txt', editor=INTRO_LINES_MOVED, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='claude', version=VER, cwd=CWD,
                   lines=[
                       ('agent', '✔ 실습을 마쳤습니다. 파일과 폴더 구조가'),
                       ('agent', '완성되었습니다.'),
                       ('tool', '에이전트1\\'),
                       ('tool', '  └── introduce\\'),
                       ('tool', '        └── claude.txt'),
                       ('agent', '다음 단계: Ctrl + C로 Claude Code 종료'),
                   ],
                   placeholder='메시지를 입력하세요...'))
save('claude_최종_폴더_구조.svg', s)


# 7. claude_Ctrl_C_종료 ----------------------------------------------------
s = Slide(BADGE, STEP, 'Ctrl + C로 CLI 종료',
          '실습을 마친 뒤 Claude Code 세션을 정상 종료합니다',
          '에이전트 대화가 끝나면 Ctrl+C로 종료해 일반 쉘로 돌아옵니다')
s.add(vscode(tree=TREE_FINAL, tab='claude.txt', editor=INTRO_LINES_MOVED, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='claude', version=VER, cwd=CWD,
                   lines=[
                       ('agent', '무엇을 도와드릴까요? [입력 대기]'),
                       ('tool', '^C'),
                   ],
                   placeholder='메시지를 입력하세요...'))
s.add(rect(766, 334, 50, 24, 'none', rx=5, stroke=OK, sw=2))
s.add(text(791, 378, 'Ctrl + C', 13, OK, '800', anchor='middle'))
save('claude_Ctrl_C_종료.svg', s)


# 8. claude_일반_터미널_복귀 ------------------------------------------------
# 에이전트가 빠진 화면 — agent_panel() 을 쓰지 않고 vscode() 의 평범한
# 터미널(term=)만 쓴다.
s = Slide(BADGE, STEP, '일반 터미널 복귀 확인',
          'PowerShell 프롬프트가 다시 나타났는지 확인합니다',
          '일반 프롬프트 상태가 되면 다음 작업이나 다른 프로젝트를 자유롭게 진행할 수 있습니다')
s.add(vscode(
    title='에이전트1 — Visual Studio Code',
    tree=TREE_FINAL, tab='claude.txt', editor=INTRO_LINES_MOVED,
    term=[
        ('PS C:\\...\\에이전트1> ', '#e5e7eb'),
        ('', None),
        ('✔ 일반 터미널 프롬프트로 완전히 복귀했습니다.', OK, 13),
        ('', None),
        ('3대 AI CLI(Antigravity, Codex, Claude Code)', MUTED, 12),
        ('실습이 모두 완료되었습니다!', MUTED, 12),
        ('', None),
        ('PS C:\\...\\에이전트1> ', '#e5e7eb'),
    ],
))
save('claude_일반_터미널_복귀.svg', s)

print('전부 완료.')
