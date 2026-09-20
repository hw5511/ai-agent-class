# -*- coding: utf-8 -*-
"""BASIC 01 · STEP 5 — codex(Codex CLI) 실습 슬라이드 8장 재생성.

agy(Antigravity) 실습(make_step01_agy_practice.py)과 같은 방식: VS Code 창의
터미널 패널 자리에 실제 Codex 세션 화면(agent_panel)을 올려서, 학생이
에이전트 세션·타이핑한 프롬프트·탐색기/편집기 결과를 한 화면에서 같이 본다.
Codex 세션 헤더에는 GPT 계열 로고 마크(logo_codex)가 떠서 Antigravity/Claude
와 한눈에 구분된다.

실습 흐름(agy 파트와 동일한 4단계): codex 버전 확인 및 실행 -> codex 에게
"너는 누구니?" 질문 -> gpt.txt 작성 요청 -> 파일 생성 확인 ->
introduce 폴더 생성 -> 파일을 폴더로 이동 -> 최종 폴더 구조 확인 ->
Ctrl+C 로 세션 종료.

폴더/파일 이름은 고정: 실습 폴더 = 에이전트1, 파일 = gpt.txt,
하위 폴더 = introduce. 좌표는 tools/slidekit.py 함수만 쓴다.
"""
import sys
sys.path.insert(0, 'tools')
from slidekit import (
    Slide, vscode, agent_panel, section,
)

BADGE = 'BASIC 01'
STEP = 'STEP 5'
OUT = 'assets/basic/step01/'
CWD = '에이전트1'
VERSION = '0.154.0'


def save(name, s):
    s.save(OUT + name)


INTRO_TXT = [
    (1, '# 자기소개서', None),
    (2, '안녕하세요!', None),
    (3, '저는 Codex입니다.', None),
    (4, '작업 폴더의 파일을 읽고, 요청에 따라', None),
    (5, '파일을 만들거나 수정할 수 있습니다.', None),
]

INTRO_TXT_SHORT = [
    (1, '# 자기소개서', None),
    (2, '안녕하세요! 저는 Codex입니다.', None),
    (3, '작업 폴더의 파일을 읽고 수정할 수 있습니다.', None),
]

INTRO_TXT_MOVED = [
    (1, '# 자기소개서 (경로 이동 완료)', None),
    (2, '안녕하세요!', None),
    (3, '저는 Codex입니다.', None),
    (4, '작업 폴더의 파일을 읽고 수정할 수 있습니다.', None),
]


# 0. 설치 확인 및 실행 — codex --version 확인 뒤 codex 실행 -------------
s = Slide(BADGE, STEP, 'Codex 설치 확인 및 실행',
          '버전이 출력되면 설치가 끝난 것입니다. 이어서 CLI를 시작합니다',
          '로그인 선택 화면이 나타나면 ChatGPT 계정 인증으로 진행합니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False)],
    tab=None, editor=None, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('tool', f'PS {CWD}> codex --version', None),
                       ('tool', f'codex-cli {VERSION}', '#4ade80'),
                       ('tool', f'PS {CWD}> codex', None),
                       ('agent', '✔ Codex CLI가 시작되었습니다.', None),
                       ('tool', '무엇을 도와드릴지 물어봅니다.', None),
                   ],
                   placeholder='무엇을 도와드릴까요?'))
save('codex_설치_확인_및_실행.svg', s)


# 1. 첫 대화 — 너는 누구니? ------------------------------------------
s = Slide(BADGE, STEP, '첫 대화: 너는 누구니?',
          'Codex CLI에 자연어로 질문하고 응답을 확인합니다',
          '먼저 질문만 해보고 에이전트의 역할을 살펴봅니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False)],
    tab=None, editor=None, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('agent', '안녕하세요, Codex입니다.', None),
                       ('agent', '현재 작업 폴더를 기준으로 파일을 읽고', None),
                       ('agent', '쓰거나 명령을 실행할 수 있습니다.', None),
                   ],
                   input_value='너는 누구니?'))
save('codex_첫_대화_자기소개.svg', s)


# 2. 자기소개서 파일 만들기 -------------------------------------------
s = Slide(BADGE, STEP, '자기소개서 파일 만들기',
          '요청한 위치와 이름으로 파일을 생성해 달라고 합니다',
          'AI에게 구체적인 파일 이름과 작성할 내용을 함께 요청합니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False), (1, 'gpt.txt', 'file', True)],
    tab='gpt.txt', editor=INTRO_TXT, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('user', "현재 폴더에 'gpt.txt'를 만들어줘.", None),
                       ('user', '네가 누구이고 무엇을 할 수 있는지', None),
                       ('tool', '간단히 작성해줘.', None),
                       ('agent', "✔ gpt.txt 파일을 만들었습니다.", None),
                       ('tool', '탐색기에 파일이 추가되고 편집기에서', None),
                       ('tool', '내용이 열렸습니다.', None),
                   ],
                   placeholder='좌측 편집기와 탐색기에서 생성 결과를 확인하세요.'))
save('codex_자기소개서_생성.svg', s)


# 3. 탐색기에서 파일 확인하기 ------------------------------------------
s = Slide(BADGE, STEP, 'VS Code에서 파일 확인',
          'Codex가 만든 파일은 VS Code 탐색기와 편집기에서 확인할 수 있습니다',
          '탐색기와 편집기에서 파일의 위치와 내용을 확인합니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False), (1, 'gpt.txt', 'file', True)],
    tab='gpt.txt', editor=INTRO_TXT, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('agent', '✔ 완료했습니다. gpt.txt를 생성했습니다.', None),
                       ('tool', '왼쪽 탐색기에서 파일을 선택해 내용을', None),
                       ('tool', '확인할 수 있습니다.', None),
                       ('tool', '확인 포인트: 파일 이름과 저장 위치가', None),
                       ('tool', '요청과 같은지 직접 확인하세요.', None),
                   ],
                   placeholder='무엇을 도와드릴까요?'))
save('codex_파일_생성_확인.svg', s)


# 4. introduce 폴더 만들기 --------------------------------------------
s = Slide(BADGE, STEP, 'introduce 폴더 만들기',
          '파일을 정리할 새 하위 폴더 생성을 요청합니다',
          '에이전트는 파일 생성뿐만 아니라 폴더 구조 생성도 직접 수행합니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False),
          (1, 'introduce', 'folder', True),
          (1, 'gpt.txt', 'file', False)],
    tab='gpt.txt', editor=INTRO_TXT_SHORT, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('user', "현재 폴더에 'introduce' 폴더를 만들어줘.", None),
                       ('agent', "✔ 'introduce' 폴더를 생성했습니다.", None),
                       ('tool', '탐색기에서 새로 만들어진 폴더를', None),
                       ('tool', '확인할 수 있습니다.', None),
                   ],
                   placeholder='무엇을 도와드릴까요?'))
save('codex_introduce_폴더_생성.svg', s)


# 5. 자기소개서를 폴더로 옮기기 ----------------------------------------
s = Slide(BADGE, STEP, '자기소개서를 폴더로 옮기기',
          '자연어로 파일 이동을 지시하고 변경된 경로를 확인합니다',
          '파일 이동 후 원래 위치에 파일이 남아있지 않은지 확인합니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False),
          (1, 'introduce', 'folder', False),
          (2, 'gpt.txt', 'file', True)],
    tab='introduce/gpt.txt', editor=INTRO_TXT_MOVED, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('user', "'gpt.txt'를 'introduce' 폴더로", None),
                       ('tool', '옮겨줘.', None),
                       ('agent', '✔ 파일을 introduce 폴더로 이동했습니다.', None),
                       ('tool', 'introduce\\gpt.txt 로 이동 완료.', None),
                   ],
                   placeholder='무엇을 도와드릴까요?'))
save('codex_자기소개서_이동.svg', s)


# 6. 최종 폴더 구조 확인 ------------------------------------------------
s = Slide(BADGE, STEP, '최종 폴더 구조 확인',
          '요청한 파일이 introduce 폴더 안에 있는지 확인합니다',
          '완료 응답만 보지 말고 최종 파일 위치도 확인합니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False),
          (1, 'introduce', 'folder', True),
          (2, 'gpt.txt', 'file', True)],
    tab=None, editor=None, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('agent', '✔ 실습을 마쳤습니다. 파일과 폴더 구조가', None),
                       ('tool', '요청한 대로입니다.', None),
                       ('tool', 'introduce\\gpt.txt', None),
                       ('tool', '다음 단계: Ctrl + C로', None),
                       ('tool', 'Codex CLI 종료', None),
                   ],
                   placeholder='무엇을 도와드릴까요?'))
save('codex_최종_폴더_구조.svg', s)


# 7. Ctrl + C 로 CLI 종료 -----------------------------------------------
s = Slide(BADGE, STEP, 'Ctrl + C로 Codex 종료',
          'Codex CLI 입력 화면에서 종료해 일반 터미널로 돌아갑니다',
          '에이전트 대화가 끝나면 Ctrl+C로 종료해 일반 쉘로 돌아옵니다')
s.add(section(190, 'VS CODE'))
s.add(vscode(
    tree=[(0, CWD, 'folder', False),
          (1, 'introduce', 'folder', False),
          (2, 'gpt.txt', 'file', True)],
    tab='introduce/gpt.txt', editor=INTRO_TXT_SHORT, term=[]))
s.add(agent_panel(740, 238, 480, 384, agent='codex', version=VERSION,
                   cwd=CWD,
                   lines=[
                       ('user', '무엇을 도와드릴까요? [입력 대기]', None),
                       ('tool', '^C', '#f87171'),
                       ('tool', 'Codex CLI 세션을 정상 종료하고', None),
                       ('tool', '일반 터미널로 복귀합니다.', None),
                   ],
                   placeholder=None, caret=False))
save('codex_Ctrl_C_종료.svg', s)

print('done: 8 slides regenerated')
