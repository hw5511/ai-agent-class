# -*- coding: utf-8 -*-
"""basic step01 — 설치·PATH 구간 슬라이드 4장을 생성한다. (slidekit 사용 예시)"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import (Slide, terminal, check_rows, box, two_col, section,
                      OK, BAD, WARN, CYAN, text)

A = 'assets/basic/step01'
B, S = 'BASIC 01', 'STEP 5'


def path_slide(fname, title, sub, lead, rows, tail, tailcol, note, foot):
    s = Slide(B, S, title, sub, foot)
    s.add(box(168, lead[0], [lead[1]], 'info'))
    s.add(section(278, '실행하면 이렇게 나옵니다'))
    s.add(terminal(292, 268, [('────────────────────────────────────────────────', '#4b5563', 14)]))
    s.add(check_rows(364, rows))
    s.add(text(92, 490, '────────────────────────────────────────────────', 14, '#4b5563', mono=True))
    s.add(text(92, 532, tail, 15, tailcol, '700', mono=True))
    s.add(box(578, None, [note], 'plain'))
    s.save(os.path.join(A, fname))


path_slide('agy_PATH_등록.svg',
  'PATH 한 번에 잡기',
  '설치한 자리를 알아서 찾아 등록합니다. 경로를 외울 필요가 없습니다',
  ('액션박스의 명령을 터미널에 통째로 붙여넣으세요',
   '지금 이 터미널에 바로 반영되고, 다음에도 유지되도록 영구 등록까지 합니다'),
  [('[v]', 'agy', '사용 가능!  1.2.5', OK),
   ('[ ]', 'codex', '아직 설치되지 않았습니다', BAD),
   ('[ ]', 'claude', '아직 설치되지 않았습니다', BAD)],
  '1/3 확인됨.', WARN,
  '지금은 agy 하나만 초록이면 됩니다. codex 와 claude 는 곧 설치합니다.',
  '버전이 찍히면 진짜 실행되는 것까지 확인된 것입니다')

path_slide('PATH_자동_등록.svg',
  '세 개를 한 번에 잡기',
  '조금 전과 똑같은 명령입니다. 이번에는 셋 다 초록이 되어야 합니다',
  ('설치가 끝났으면 아까 그 명령을 한 번 더 붙여넣으세요',
   '새로 설치한 codex 와 claude 의 자리를 찾아 함께 등록합니다'),
  [('[v]', 'agy', '사용 가능!  1.2.5', OK),
   ('[v]', 'codex', '사용 가능!  codex-cli 0.154.0', OK),
   ('[v]', 'claude', '사용 가능!  2.1.274 (Claude Code)', OK)],
  '세 개 다 버전이 찍혔습니다. VS Code 껐다 켤 필요 없습니다.', CYAN,
  '초록이 아닌 것이 있으면 그 CLI 의 설치 명령부터 다시 실행하세요.',
  '여기까지 되면 환경 준비는 끝입니다')


def install_slide(fname, title, sub, win, mac, warn_title, warn_lines, foot):
    s = Slide(B, S, title, sub, foot)
    s.add(two_col(172, ('Windows · PowerShell', win, None),
                       ('macOS · 터미널', mac, None)))
    s.add(box(508, warn_title, warn_lines, 'warn'))
    s.save(os.path.join(A, fname))


install_slide('claude_설치.svg',
  'Claude Code 설치',
  '공식 설치 스크립트 한 줄입니다. 설치만 하고, PATH 는 나중에 한 번에 잡습니다',
  ['irm https://claude.ai/install.ps1 | iex'],
  ['curl -fsSL https://claude.ai/install.sh | bash'],
  '설치가 끝나도 claude 라고 치면 아직 안 됩니다',
  ['이 터미널은 아직 새 경로를 모릅니다. 다음 슬라이드에서 codex 까지 설치한 뒤',
   '두 개를 한 번에 잡습니다. 지금은 "설치 완료" 메시지만 확인하세요.'],
  '설치 위치 — Windows %USERPROFILE%\\.local\\bin · macOS ~/.local/bin')

install_slide('codex_설치.svg',
  'Codex CLI 설치',
  '두 번째 설치입니다. 이것까지 끝나면 PATH 를 한 번에 정리합니다',
  ['powershell -NoProfile -ExecutionPolicy ByPass -c `',
   '  "irm https://chatgpt.com/codex/install.ps1 | iex"'],
  ['curl -fsSL https://chatgpt.com/codex/install.sh | sh'],
  '-NoProfile 을 빼지 마세요',
  ['프로필에 StrictMode 가 켜져 있으면 설치 스크립트가 중간에 멈춥니다.',
   '(OSArchitecture 속성을 찾을 수 없습니다 — 실제로 수업에서 났던 오류입니다)'],
  '설치 위치 — Windows %LOCALAPPDATA%\\Programs\\OpenAI\\Codex\\bin · macOS ~/.local/bin')
