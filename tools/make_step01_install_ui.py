# -*- coding: utf-8 -*-
"""basic step01 — 설치 슬라이드 2장을 '명령 텍스트' 대신 VS Code 화면으로 그린다.

액션박스(복사 버튼)에 이미 명령이 있으므로, 슬라이드 본문은 학생이
터미널에 명령을 치고 설치가 도는 "장면"을 보여준다. vscode() 의 탐색기·
편집기 탭·내장 터미널(오른쪽, PowerShell)로 Windows 쪽 VS Code 화면
전체를 그대로 그리고, 그 위 아래쪽 일부에만 작게 겹치는 별도 떠 있는
창(자체 타이틀바 + 점 3개, "macOS — Terminal" 라벨)으로 macOS 쪽을
같이 보여준다. 탐색기 트리와 편집기 탭은 항상 위쪽에 그대로 보인다 —
왼쪽 절반을 통째로 덮는 슬랩은 금지(PM 리뷰 결함, 2026-09-20).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import Slide, vscode, rect, text, OK, WARN, MUTED, CODE

A = 'assets/basic/step01'
B, S = 'BASIC 01', 'STEP 5'

MAC_PURPLE = '#8b5cf6'
MAC_LABEL = '#c4b5fd'
MAC_TITLEBAR = '#2d2d2d'
MAC_BODY_BG = '#1e1e1e'

# VS Code 창 자체는 rect(60,175,1160,472) — 탐색기(106~330)·편집기(330~740)는
# y 207~622. 이 떠 있는 macOS 터미널 창은 그 아래쪽 일부만 겹치도록
# y=420 아래에서 시작해 상태바(622) 앞에서 멈춘다 — 트리·탭·편집기 앞부분은
# 항상 그대로 보인다.
MAC_X, MAC_Y, MAC_W, MAC_H = 120, 420, 580, 170
MAC_TITLE_H = 24


def mac_terminal_window(lines):
    """VS Code 창 위에 작게 겹치는 macOS 터미널 창 (자체 타이틀바 + 점 3개)."""
    o = [rect(MAC_X, MAC_Y, MAC_W, MAC_H, MAC_BODY_BG, rx=10, stroke=MAC_PURPLE, sw=1.5),
         rect(MAC_X, MAC_Y, MAC_W, MAC_TITLE_H, MAC_TITLEBAR, rx=10),
         f'  <rect x="{MAC_X}" y="{MAC_Y + MAC_TITLE_H - 8}" width="{MAC_W}" height="8" fill="{MAC_TITLEBAR}"/>',
         f'  <circle cx="{MAC_X + 16}" cy="{MAC_Y + 12}" r="4.5" fill="#ef4444"/>',
         f'  <circle cx="{MAC_X + 30}" cy="{MAC_Y + 12}" r="4.5" fill="#f59e0b"/>',
         f'  <circle cx="{MAC_X + 44}" cy="{MAC_Y + 12}" r="4.5" fill="#22c55e"/>',
         text(MAC_X + MAC_W / 2, MAC_Y + 16, 'macOS — Terminal', 11.5, MAC_LABEL, '600', anchor='middle')]
    yy = MAC_Y + MAC_TITLE_H + 24
    for item in lines:
        s = item[0]
        col = item[1] if len(item) > 1 else None
        size = item[2] if len(item) > 2 else 12.5
        if s == '--':
            o.append(f'  <line x1="{MAC_X + 18}" y1="{yy - 9}" x2="{MAC_X + MAC_W - 18}" y2="{yy - 9}" '
                      f'stroke="#374151" stroke-dasharray="4 4"/>')
            yy += 18
            continue
        o.append(text(MAC_X + 18, yy, s, size, col or '#e5e7eb', mono=True))
        yy += 26
    return o


# 두 슬라이드 공통 탐색기/편집기 — 설치 단계라 에이전트1 폴더는 아직
# 비어 있다(첫 파일 자기소개서.txt 는 훨씬 뒤 실습에서 에이전트가 만듦).
# 탐색기는 빈 폴더만 펼쳐 보여주고, 편집기는 tab/editor 를 None 으로 두어
# vscode() 가 그리는 "열린 파일 없음" 빈 상태 그대로 둔다.
TREE = [(0, '에이전트1', 'folder', False)]


def install_ui_slide(fname, title, sub, win_lines, mac_lines, foot):
    s = Slide(B, S, title, sub, foot)
    s.add(vscode(tree=TREE, tab=None, editor=None, term=win_lines))
    s.add(mac_terminal_window(mac_lines))
    s.save(os.path.join(A, fname))


install_ui_slide(
    'claude_설치.svg',
    'Claude Code 설치',
    '터미널에 설치 명령을 붙여넣고 Enter — 명령은 위 액션박스에 있습니다',
    win_lines=[
        ('PS C:\\...> irm https://claude.ai/install.ps1 | iex', '#e5e7eb', 12),
        ('', None),
        ('Claude Code installed to %USERPROFILE%\\.local\\bin', OK, 12),
        ('', None),
        ('( claude 는 이 터미널에서 아직 안 됨 — PATH 는 다음에 )', MUTED, 11.5),
    ],
    mac_lines=[
        ('$ curl -fsSL https://claude.ai/install.sh | bash', CODE, 12.5),
        ('', None),
        ('Claude Code installed to ~/.local/bin', OK, 12.5),
        ('', None),
        ('Run: echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc', WARN, 11),
    ],
    foot='설치 위치 — Windows %USERPROFILE%\\.local\\bin · macOS ~/.local/bin',
)

install_ui_slide(
    'codex_설치.svg',
    'Codex CLI 설치',
    '두 번째 설치입니다 — 이것까지 끝나면 PATH 를 한 번에 정리합니다',
    win_lines=[
        ('# -NoProfile 빼지 마세요 (StrictMode 오류 방지)', WARN, 11),
        ('PS C:\\...> powershell -NoProfile -ExecutionPolicy ByPass -c `', '#e5e7eb', 11),
        ('  "irm https://chatgpt.com/codex/install.ps1 | iex"', CODE, 11),
        ('', None),
        ('Codex CLI installed (Programs\\OpenAI\\Codex\\bin)', OK, 11.5),
        ('', None),
        ('( codex 는 이 터미널에서 아직 안 됨 )', MUTED, 11.5),
    ],
    mac_lines=[
        ('$ curl -fsSL https://chatgpt.com/codex/install.sh | sh', CODE, 12),
        ('', None),
        ('Codex CLI installed successfully!', OK, 12),
        ('', None),
        ('Run: echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc', WARN, 11),
    ],
    foot='설치 위치 — Windows %LOCALAPPDATA%\\Programs\\OpenAI\\Codex\\bin · macOS ~/.local/bin',
)
