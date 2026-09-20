# -*- coding: utf-8 -*-
"""basic step01 — macOS PATH 등록 방식 교체 (CEO 2026-09-20).

macOS 는 더 이상 우리 PATH 스크립트를 돌리지 않는다. 각 CLI 설치 스크립트가 끝나면서
`Run: echo 'export PATH=...' >> ~/.zshrc` 줄을 터미널에 직접 찍어 주므로, 학생은 그 줄을
자기 터미널에서 그대로 복사해 붙여넣고 실행한다. Windows 는 기존 자동 PowerShell 스크립트를
그대로 쓴다. (slidekit 사용 예시 — tools/make_step01_install.py 의 path_slide() 참고)
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import (Slide, terminal, check_rows, box, section, rect, text,
                       OK, BAD, WARN, CYAN, MUTED, FAINT)

A = 'assets/basic/step01'
B, S = 'BASIC 01', 'STEP 5'

COL_L_X, COL_W = 60, 560
COL_R_X = 660


def col_header(x, y, label, color):
    return [text(x, y, label, 13, color, '700')]


def win_column(y, height, rows, tail, tailcol):
    """왼쪽 — Windows 자동 스크립트 결과 (기존 그대로)."""
    o = []
    o += col_header(COL_L_X, y - 14, 'Windows — 자동으로 잡습니다', '#374151')
    o += terminal(y, height, [('────────────────────────────────', '#4b5563', 12)],
                  x=COL_L_X, width=COL_W, pad=26, start=32)
    o += check_rows(y + 56, rows, x=COL_L_X + 26, gap=34, size=14)
    yy = y + 56 + 34 * len(rows) + 20
    o.append(text(COL_L_X + 26, yy, '────────────────────────────────', 12, '#4b5563', mono=True))
    o.append(text(COL_L_X + 26, yy + 30, tail, 13, tailcol, '700', mono=True))
    return o


def mac_column(y, height, run_line, paste_lines, ok_line):
    """오른쪽 — macOS: 설치가 찍어준 Run: 줄을 그대로 복사해 붙여넣는다."""
    o = []
    o += col_header(COL_R_X, y - 14, 'macOS — 설치가 알려준 줄을 그대로', '#6d28d9')
    o.append(rect(COL_R_X, y, COL_W, height, '#1f2937', rx=10))
    yy = y + 30
    o.append(text(COL_R_X + 24, yy, '... 설치 완료!', 13, OK, mono=True))
    yy += 26
    o.append(text(COL_R_X + 24, yy, 'Run:', 12, '#9ca3af', mono=True))
    yy += 22
    # 하이라이트된 export 줄 — 실제 강조를 눈으로 보이게 배경 박스를 깐다
    o.append(rect(COL_R_X + 20, yy - 15, COL_W - 40, 24, '#3f3a10', rx=5))
    o.append(text(COL_R_X + 32, yy, run_line, 12, '#fde68a', '700', mono=True))
    yy += 34
    o.append(text(COL_R_X + 24, yy, '◀ 이 줄 그대로 복사', 11.5, WARN, '700'))
    yy += 30
    o.append(text(COL_R_X + 24, yy, '────────────────────────────────', 12, '#4b5563', mono=True))
    yy += 26
    for ln in paste_lines:
        o.append(text(COL_R_X + 24, yy, ln, 12.5, '#e5e7eb', mono=True))
        yy += 24
    o.append(text(COL_R_X + 24, yy, ok_line, 13, OK, '700', mono=True))
    return o


def path_mac_slide(fname, title, sub, lead_title, lead_lines,
                    win_rows, win_tail, win_tailcol,
                    run_line, paste_lines, mac_ok_line,
                    note, foot):
    s = Slide(B, S, title, sub, foot)
    s.add(box(168, lead_title, lead_lines, 'info'))
    s.add(section(262, '이번엔 OS 마다 방법이 다릅니다'))
    col_h = 268
    s.add(win_column(300, col_h, win_rows, win_tail, win_tailcol))
    s.add(mac_column(300, col_h, run_line, paste_lines, mac_ok_line))
    s.add(box(586, None, [note], 'plain'))
    s.save(os.path.join(A, fname))


# ── 슬라이드 19 — agy 설치 직후, 첫 PATH 등록 ─────────────────────
path_mac_slide(
    'agy_PATH_등록.svg',
    'PATH 등록하기',
    'OS 마다 방법이 다릅니다 — Windows 는 자동, macOS 는 설치가 알려준 줄을 그대로',
    None,
    ['Windows 는 스크립트가 설치 위치를 찾아 자동으로 등록합니다',
     'macOS 는 스크립트를 쓰지 않습니다 — agy 설치가 끝나며 찍어준 Run: 줄을 그대로 복사해 붙여넣습니다'],
    [('[v]', 'agy', '사용 가능!  1.2.5', OK),
     ('[ ]', 'codex', '아직 설치되지 않았습니다', BAD),
     ('[ ]', 'claude', '아직 설치되지 않았습니다', BAD)],
    '1/3 확인됨.', WARN,
    'echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc',
    ['$ echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc',
     '$ source ~/.zshrc',
     '$ agy --version'],
    'agy 1.2.5',
    '지금은 agy 하나만 확인되면 됩니다. codex 와 claude 는 곧 설치합니다.',
    '터미널에 실제로 찍히는 경로는 사람마다 다를 수 있습니다 — 화면에 뜬 줄을 그대로 쓰세요')

# ── 슬라이드 39 — codex·claude 설치까지 끝난 뒤, 두 번째 PATH 등록 ──
path_mac_slide(
    'PATH_자동_등록.svg',
    '세 개 마저 잡기',
    '조금 전과 같은 방식입니다 — 새로 설치한 codex, claude 몫만 추가합니다',
    None,
    ['Windows 는 같은 명령을 한 번 더 실행해 codex, claude 자리까지 함께 등록합니다',
     'macOS 는 codex·claude 설치가 끝나며 각각 찍어준 Run: 줄을 그대로 복사해 붙여넣습니다'],
    [('[v]', 'agy', '사용 가능!  1.2.5', OK),
     ('[v]', 'codex', '사용 가능!  codex-cli 0.154.0', OK),
     ('[v]', 'claude', '사용 가능!  2.1.274 (Claude Code)', OK)],
    '세 개 다 버전이 찍혔습니다.', CYAN,
    'echo \'export PATH="$HOME/.codex/bin:$PATH"\' >> ~/.zshrc',
    ['$ echo \'export PATH="$HOME/.codex/bin:$PATH"\' >> ~/.zshrc',
     '$ source ~/.zshrc',
     '$ codex --version && claude --version'],
    'codex 0.154.0 / claude 2.1.274',
    '이미 넣은 줄은 다시 넣지 않아도 됩니다 — 새로 찍힌 줄만 추가하면 됩니다',
    '설치 스크립트마다 안내하는 줄이 다릅니다 — 항상 지금 화면에 찍힌 그대로 복사하세요')
