import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 03</text>'
    )

def divider(y):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'

def wrap(inner):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        + inner +
        '\n</svg>\n'
    )

def label(y, text):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="14" font-weight="600" '
        f'fill="#9ca3af" letter-spacing="0.08em">{text}</text>'
    )

def body(y, text, mono=False, size=19, color="#374151"):
    ff = MONO if mono else FONT
    return f'  <text x="60" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{text}</text>'

def title(text, y=130, size=40):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="700" fill="#171717">{text}</text>'
    )

def sub(text, y=178):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="19" fill="#6b7280">{text}</text>'

def footer(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#171717"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="17" font-weight="600" fill="#ffffff">{text}</text>'
    )

def footer_light(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#6b7280">{text}</text>'
    )

slides = {
    # 01: 오프닝
    "01": lambda: wrap(
        badge() + "\n" +
        title("Claude 에이전트 환경 설정과 명령어") + "\n" +
        sub("세션을 자유롭게 다루는 방법을 익힙니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "보안 설정    /    settings.json") + "\n" +
        body(354, "권한 모드    /    주요 슬래시 명령어") + "\n" +
        body(400, "웹 Search 툴    /    Todos · Tasks") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 보안 설정
    "02": lambda: wrap(
        badge() + "\n" +
        title("보안 설정") + "\n" +
        sub("Claude Code의 파일 접근 범위와 개인정보 설정") + "\n" +
        divider(212) + "\n" +
        label(264, "파일 접근 범위") + "\n" +
        body(308, "쓰기는 시작 디렉토리 이하로만 제한") + "\n" +
        body(354, "상위 폴더 쓰기는 명시적 허가 필요") + "\n" +
        divider(410) + "\n" +
        label(450, "개인정보 설정 해제") + "\n" +
        body(492, "claude.ai/settings/data-privacy-controls  접속", mono=True, color="#374151") + "\n" +
        body(534, "위치 메타데이터  +  Claude 개선에 도움주기  —  두 항목 모두 해제") + "\n" +
        footer_light("Free · Pro · Max 모두 위 페이지에서 직접 설정 가능")
    ),
    # 03: settings.json
    "03": lambda: wrap(
        badge() + "\n" +
        title("settings.json") + "\n" +
        sub("Claude Code 동작을 세밀하게 제어하는 설정 파일") + "\n" +
        divider(212) + "\n" +
        label(264, "3가지 적용 범위") + "\n" +
        body(308, "~/.claude/settings.json          내 PC 전체 프로젝트에 적용", mono=True, color="#374151") + "\n" +
        body(348, ".claude/settings.json             현재 프로젝트 팀원과 공유", mono=True, color="#374151") + "\n" +
        body(388, ".claude/settings.local.json    현재 프로젝트 나만 적용", mono=True, color="#374151") + "\n" +
        divider(430) + "\n" +
        label(468, "권한 제한 설정하기  (Claude에게 요청)") + "\n" +
        body(506, "'권한에서 bash rm을 제한하고,", color="#1d4ed8") + "\n" +
        body(540, " CLAUDE.md 지침에 rm 대신 archive 폴더로 이동하도록 추가해줘'", color="#1d4ed8") + "\n" +
        footer_light("차단 규칙은 허용 규칙보다 항상 먼저 적용됩니다")
    ),
    # 04: 권한 모드 / esc
    "04": lambda: wrap(
        badge() + "\n" +
        title("권한 모드  /  단축키") + "\n" +
        divider(180) + "\n" +
        label(230, "Shift + Tab") + "\n" +
        body(268, "권한 모드를 순환 전환") + "\n" +
        body(306, "일반 모드  ->  편집 자동 승인  ->  플랜 모드  ->  일반 모드") + "\n" +
        divider(350) + "\n" +
        label(396, "Esc") + "\n" +
        body(432, "실행 중인 응답 중단  /  프롬프트 종료") + "\n" +
        divider(476) + "\n" +
        label(516, "욜로 모드  (YOLO Mode)") + "\n" +
        body(552, "--dangerously-skip-permissions  —  모든 권한 확인을 건너뜀", mono=True, color="#dc2626") + "\n" +
        footer_light("욜로 모드는 격리된 테스트 환경에서만 사용 — 실서버 절대 금지")
    ),
    # 05: 핵심 슬래시 명령어
    "05": lambda: wrap(
        badge() + "\n" +
        title("주요 슬래시 명령어") + "\n" +
        divider(180) + "\n" +
        body(236, "/clear        대화 컨텍스트 초기화  (파일 삭제 아님)", size=20, color="#171717") + "\n" +
        body(282, "/compact     대화 히스토리를 요약 압축  (컨텍스트 절약)", size=20, color="#171717") + "\n" +
        body(328, "/context      현재 컨텍스트 사용량 시각화", size=20, color="#171717") + "\n" +
        body(374, "/model        사용 모델 변경", size=20, color="#171717") + "\n" +
        body(420, "/login         Anthropic 계정 전환", size=20, color="#171717") + "\n" +
        body(466, "/logout       로그아웃", size=20, color="#171717") + "\n" +
        body(512, "/help           사용 가능한 명령어 전체 목록", size=20, color="#171717") + "\n" +
        footer_light("종료: Ctrl+C  또는  빈 프롬프트에서 Esc")
    ),
    # 06: 웹 Search 툴
    "06": lambda: wrap(
        badge() + "\n" +
        title("웹 Search 툴") + "\n" +
        sub("Claude가 스스로 판단해 웹을 검색합니다") + "\n" +
        divider(212) + "\n" +
        body(290, "사용자가 별도 명령을 입력할 필요 없음", size=22, color="#171717") + "\n" +
        divider(340) + "\n" +
        label(390, "작동 방식") + "\n" +
        body(430, "질문에 최신 정보가 필요하면 Claude가 자동으로 검색") + "\n" +
        body(476, "검색 결과를 읽고 답변에 반영") + "\n" +
        footer_light("Hooks에서 WebSearch 툴을 허용/차단 설정 가능")
    ),
    # 07: Todos / Tasks
    "07": lambda: wrap(
        badge() + "\n" +
        title("Todos  /  Tasks") + "\n" +
        sub("에이전트가 작업 목록을 스스로 관리합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "내장 툴") + "\n" +
        body(308, "TodoWrite  —  할 일 목록 작성·업데이트") + "\n" +
        body(354, "TodoRead   —  현재 목록 조회") + "\n" +
        divider(410) + "\n" +
        label(450, "상태") + "\n" +
        body(490, "pending  →  in_progress  →  completed") + "\n" +
        footer_light("~/.claude/tasks/ 에 저장 — 세션 종료 후에도 유지")
    ),
    # 08: 정리
    "08": lambda: wrap(
        badge() + "\n" +
        title("정리") + "\n" +
        divider(180) + "\n" +
        body(236, "보안 설정        파일 접근 범위 · 학습 opt-out", size=21, color="#171717") + "\n" +
        body(282, "settings.json  3계층 설정 · permissions.deny/allow", size=21, color="#171717") + "\n" +
        body(328, "권한 모드        Shift+Tab 순환 · Esc 중단", size=21, color="#171717") + "\n" +
        body(374, "슬래시 명령어  /clear · /compact · /model · /login", size=21, color="#171717") + "\n" +
        body(420, "웹 Search       Claude가 자동 판단 실행", size=21, color="#171717") + "\n" +
        body(466, "Todos             TodoWrite · TodoRead 내장 툴", size=21, color="#171717") + "\n" +
        footer("설정으로 에이전트의 권한과 동작을 직접 제어합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
