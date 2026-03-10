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

def vdivider(x, y1=224, y2=554):
    return f'  <line x1="{x}" y1="{y1}" x2="{x}" y2="{y2}" stroke="#e5e7eb" stroke-width="1"/>'

def wrap(inner):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        + inner +
        '\n</svg>\n'
    )

def label(y, text, x=60):
    return (
        f'  <text x="{x}" y="{y}" font-family="{FONT}" font-size="14" font-weight="600" '
        f'fill="#9ca3af" letter-spacing="0.08em">{text}</text>'
    )

def body(y, text, mono=False, size=19, color="#374151", x=60):
    ff = MONO if mono else FONT
    return f'  <text x="{x}" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{text}</text>'

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
        body(354, "권한 모드  (일반 · 편집자동승인 · 플랜)    /    욜로 모드") + "\n" +
        body(400, "/model  (Haiku · Sonnet · Opus)    /    웹 Search    /    Todos") + "\n" +
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
        body(492, "https://claude.ai/settings/data-privacy-controls", mono=True, size=16, color="#1d4ed8") + "\n" +
        body(532, "위치 메타데이터  +  Claude 개선에 도움주기  —  두 항목 모두 해제") + "\n" +
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
    # 04: 권한 모드 (일반 / 편집자동승인 / 플랜)
    "04": lambda: wrap(
        badge() + "\n" +
        title("권한 모드  (Shift+Tab 순환)") + "\n" +
        sub("세 가지 모드를 상황에 맞게 선택합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "일반 모드  (기본값)") + "\n" +
        body(308, "파일 편집 · 터미널 명령 실행 전 매번 승인 요청") + "\n" +
        divider(350) + "\n" +
        label(390, "편집 자동 승인 모드") + "\n" +
        body(430, "파일 편집은 자동 승인  /  터미널 명령은 여전히 확인 요청") + "\n" +
        divider(470) + "\n" +
        label(510, "플랜 모드") + "\n" +
        body(548, "'추천 선택지 중 선택할 수 있게 해줘'  →  선택지를 제공해 줌", color="#1d4ed8") + "\n" +
        footer_light("Shift+Tab으로 순환  /  Esc — 현재 응답 중단")
    ),
    # 05: 욜로 모드
    "05": lambda: wrap(
        badge() + "\n" +
        title("욜로 모드  (YOLO Mode)") + "\n" +
        sub("모든 권한 확인을 건너뛰고 자동 실행  —  격리 환경에서만 사용") + "\n" +
        divider(212) + "\n" +
        label(264, "실행 방법  (일반 모드 진입 후 변경 불가 — 처음부터 이 인자로 실행)") + "\n" +
        body(308, "claude --dangerously-skip-permissions", mono=True, size=22, color="#dc2626") + "\n" +
        divider(354) + "\n" +
        label(394, "종료 방법") + "\n" +
        body(434, "1.  /exit  입력  (Claude 대화 안에서 종료)") + "\n" +
        body(474, "2.  Ctrl+C  연타  (강제 종료)") + "\n" +
        divider(514) + "\n" +
        body(548, "종료 후 터미널에서  위쪽 방향키  →  이전 명령어 바로 재실행", color="#6b7280", size=17) + "\n" +
        footer_light("욜로 모드는 실서버 · 실제 파일 환경에서 절대 사용 금지")
    ),
    # 06: 주요 슬래시 명령어 (기존 05)
    "06": lambda: wrap(
        badge() + "\n" +
        title("주요 슬래시 명령어") + "\n" +
        divider(180) + "\n" +
        body(246, "/clear        대화 기억 공간 초기화  (파일 삭제 아님)", size=20, color="#171717") + "\n" +
        body(306, "/model        사용 모델 변경", size=20, color="#171717") + "\n" +
        body(366, "/login         Anthropic 계정 전환", size=20, color="#171717") + "\n" +
        body(426, "/logout       로그아웃", size=20, color="#171717") + "\n" +
        body(486, "/help           사용 가능한 명령어 전체 목록", size=20, color="#171717") + "\n" +
        footer_light("종료: Ctrl+C  또는  빈 프롬프트에서 Esc")
    ),
    # 07: /model — Haiku / Sonnet / Opus (가로 3단)
    "07": lambda: wrap(
        badge() + "\n" +
        title("/model  —  Claude 모델 선택") + "\n" +
        sub("Haiku · Sonnet · Opus  —  상황에 맞는 모델을 선택합니다") + "\n" +
        divider(212) + "\n" +
        vdivider(447) + "\n" +
        vdivider(834) + "\n" +
        # 칼럼 1: Haiku
        f'  <text x="254" y="268" text-anchor="middle" font-family="{FONT}" font-size="24" font-weight="700" fill="#171717">Haiku 4.5</text>\n' +
        f'  <text x="254" y="302" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#6b7280">가장 빠름</text>\n' +
        body(360, "간단한 질문 · 요약", x=100) + "\n" +
        body(396, "반복 · 대량 작업", x=100) + "\n" +
        body(432, "빠른 응답 필요", x=100) + "\n" +
        # 칼럼 2: Sonnet
        f'  <text x="640" y="268" text-anchor="middle" font-family="{FONT}" font-size="24" font-weight="700" fill="#171717">Sonnet 4.6</text>\n' +
        f'  <text x="640" y="302" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#6b7280">빠르고 강력 · 기본 모델</text>\n' +
        body(360, "일상적인 코딩", x=487) + "\n" +
        body(396, "일반 업무 자동화", x=487) + "\n" +
        body(432, "대부분의 작업에 추천", x=487) + "\n" +
        # 칼럼 3: Opus
        f'  <text x="1027" y="268" text-anchor="middle" font-family="{FONT}" font-size="24" font-weight="700" fill="#171717">Opus 4.5</text>\n' +
        f'  <text x="1027" y="302" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#6b7280">최고 성능</text>\n' +
        body(360, "복잡한 추론 · 분석", x=874) + "\n" +
        body(396, "심화 코딩 · 아키텍처", x=874) + "\n" +
        body(432, "장기 계획 · 의사결정", x=874) + "\n" +
        footer_light("/model 입력 후 원하는 모델 선택  /  Ctrl+C로 취소")
    ),
    # 08: 웹 Search 툴 (기존 06) — 회색블록 문구 변경
    "08": lambda: wrap(
        badge() + "\n" +
        title("웹 Search 툴") + "\n" +
        sub("Claude가 스스로 판단해 웹을 검색합니다") + "\n" +
        divider(212) + "\n" +
        body(290, "사용자가 별도 명령을 입력할 필요 없음", size=22, color="#171717") + "\n" +
        divider(340) + "\n" +
        label(390, "작동 방식") + "\n" +
        body(430, "질문에 최신 정보가 필요하면 Claude가 자동으로 검색") + "\n" +
        body(476, "검색 결과를 읽고 답변에 반영") + "\n" +
        footer_light("'ㅇㅇㅇ 주제에 대해 웹조사해줘'  라고 입력하면 자동으로 검색")
    ),
    # 09: Todos / Tasks (기존 07) — 회색블록 문구 변경
    "09": lambda: wrap(
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
        footer_light("'ㅇㅇㅇ 작업을 todo 리스트를 세워서 순차적으로 진행해줘'")
    ),
    # 10: 정리 (기존 08)
    "10": lambda: wrap(
        badge() + "\n" +
        title("정리") + "\n" +
        divider(180) + "\n" +
        body(232, "보안 설정        파일 접근 범위 · 개인정보 opt-out", size=19, color="#171717") + "\n" +
        body(270, "settings.json  3계층 설정 · permissions 제어", size=19, color="#171717") + "\n" +
        body(308, "권한 모드        일반 · 편집자동승인 · 플랜  (Shift+Tab 순환)", size=19, color="#171717") + "\n" +
        body(346, "욜로 모드        --dangerously-skip-permissions  (격리 환경 전용)", size=19, color="#171717") + "\n" +
        body(384, "/model          Haiku · Sonnet · Opus 모델 선택", size=19, color="#171717") + "\n" +
        body(422, "웹 Search       Claude가 자동 판단 실행", size=19, color="#171717") + "\n" +
        body(460, "Todos             todo 리스트로 순차 작업 관리", size=19, color="#171717") + "\n" +
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
