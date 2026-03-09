import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 05</text>'
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
        f'fill="#9ca3af" letter-spacing="0.08em">{esc(text)}</text>'
    )


def body(y, text, mono=False, size=19, color="#374151"):
    ff = MONO if mono else FONT
    return f'  <text x="60" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{esc(text)}</text>'


def title(text, y=130, size=40):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="700" fill="#171717">{esc(text)}</text>'
    )


def sub(text, y=178):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="19" fill="#6b7280">{esc(text)}</text>'


def footer(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#171717"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="17" font-weight="600" fill="#ffffff">{esc(text)}</text>'
    )


def footer_light(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#6b7280">{esc(text)}</text>'
    )


slides = {
    # 01: 오프닝
    "01": lambda: wrap(
        badge() + "\n" +
        title("Sub Agent와 Hooks") + "\n" +
        sub("에이전트를 나누고, 동작을 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "Sub Agent 개념 + 파일 형식  /  Sub Agent 활용 (만들기 · 공유 · 병렬)") + "\n" +
        body(354, "Hooks 이벤트 종류  /  Hooks 설정 · 활용 예시") + "\n" +
        body(400, "MS Office 추가기능으로 Claude 연결") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: Sub Agent 개념 + 파일 형식
    "02": lambda: wrap(
        badge() + "\n" +
        title("Sub Agent") + "\n" +
        sub("특정 역할에 특화된 독립 에이전트를 정의합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "작동 원리") + "\n" +
        body(308, "독립 컨텍스트 윈도우로 실행  ->  결과를 메인 에이전트에 반환") + "\n" +
        body(354, "역할 설명(description)이 일치하면 Claude가 자동으로 위임") + "\n" +
        divider(398) + "\n" +
        label(438, "파일 형식  (YAML frontmatter)") + "\n" +
        body(474, "---", mono=True, size=17, color="#374151") + "\n" +
        body(506, "name: code-reviewer", mono=True, size=17, color="#374151") + "\n" +
        body(538, "description: '코드 품질을 검토합니다'", mono=True, size=17, color="#374151") + "\n" +
        body(570, "tools: Read, Glob, Grep    model: sonnet", mono=True, size=17, color="#374151") + "\n" +
        footer_light("/agents 슬래시 명령어로 목록 조회 · 생성 · 수정 가능")
    ),
    # 03: Sub Agent 활용법 (만들기 · 공유 · 병렬)
    "03": lambda: wrap(
        badge() + "\n" +
        title("Sub Agent 활용법") + "\n" +
        divider(180) + "\n" +
        label(224, "Claude와 함께 만들기") + "\n" +
        body(262, "/agents  ->  Create new agent  ->  Generate with Claude") + "\n" +
        body(302, "역할 설명 입력  ->  Claude가 시스템 프롬프트 + 설정 자동 생성") + "\n" +
        divider(346) + "\n" +
        label(390, "팀 공유") + "\n" +
        body(428, ".claude/agents/ 폴더를 Git에 커밋  ->  팀 전체 동일 에이전트 사용") + "\n" +
        body(468, "~/.claude/agents/ 는 내 모든 프로젝트에 전역 적용") + "\n" +
        divider(508) + "\n" +
        label(548, "병렬 실행  (프롬프트)") + "\n" +
        body(582, "'인증 · DB · API 모듈을 별도 서브에이전트로 병렬 조사해줘'", color="#1d4ed8") + "\n"
    ),
    # 04: Hooks 이벤트 종류
    "04": lambda: wrap(
        badge() + "\n" +
        title("Hooks  —  이벤트 종류") + "\n" +
        sub("도구 실행 전후, 세션 전반에 걸쳐 자동으로 명령어를 실행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "차단 가능 이벤트") + "\n" +
        body(302, "PreToolUse          도구 실행 직전  —  exit 2 로 차단") + "\n" +
        body(338, "UserPromptSubmit  프롬프트 처리 전  —  exit 2 로 거부") + "\n" +
        body(374, "PermissionRequest  권한 다이얼로그 시점  —  자동 승인/거부") + "\n" +
        divider(414) + "\n" +
        label(454, "관찰 전용 이벤트") + "\n" +
        body(490, "PostToolUse    도구 성공 후  —  자동 포맷팅 · 로깅") + "\n" +
        body(526, "SessionStart   세션 시작/재개 시  —  컨텍스트 재주입") + "\n" +
        body(562, "Stop               응답 완료 시  —  OS 알림 · 후처리") + "\n" +
        footer_light("총 17+ 이벤트 지원  —  Notification · SubagentStart · PreCompact 등")
    ),
    # 05: Hooks 설정 + 활용 예시
    "05": lambda: wrap(
        badge() + "\n" +
        title("Hooks  —  설정과 활용") + "\n" +
        divider(180) + "\n" +
        label(224, "settings.json 구조") + "\n" +
        body(262, '"hooks": { "PreToolUse": [{', mono=True, size=16, color="#374151") + "\n" +
        body(294, '   "matcher": "Bash", "hooks": [{ "type": "command", "command": "check.sh" }]', mono=True, size=16, color="#374151") + "\n" +
        body(326, "}] }", mono=True, size=16, color="#374151") + "\n" +
        divider(366) + "\n" +
        label(406, "Exit Code") + "\n" +
        body(442, "exit 0  —  성공. stdout JSON 파싱 (컨텍스트 추가 가능)") + "\n" +
        body(478, "exit 2  —  차단. stderr 내용이 Claude 피드백으로 전달") + "\n" +
        divider(518) + "\n" +
        label(554, "활용 예시") + "\n" +
        body(586, "rm -rf 패턴 차단  /  파일 저장 시 Prettier 자동 실행  /  OS 알림") + "\n"
    ),
    # 06: MS Office 추가기능으로 Claude 연결
    "06": lambda: wrap(
        badge() + "\n" +
        title("MS Office  +  Claude 연결") + "\n" +
        sub("Power Automate 커넥터로 Excel · PowerPoint와 연동합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "연결 방법") + "\n" +
        body(308, "Microsoft Power Automate  ->  Anthropic 커넥터 추가") + "\n" +
        body(354, "사전 준비: Anthropic API 키  —  console.anthropic.com 에서 발급") + "\n" +
        divider(400) + "\n" +
        label(440, "자동화 흐름 예시") + "\n" +
        body(478, "Excel 셀 값 읽기  ->  Anthropic: Create a message  ->  셀에 결과 쓰기") + "\n" +
        body(518, "PowerPoint 텍스트 추출  ->  Claude 요약  ->  슬라이드에 자동 삽입") + "\n" +
        divider(558) + "\n" +
        body(592, "Zapier · Make (구 Integromat) 등 서드파티 도구로도 연동 가능") + "\n" +
        footer("공식 Anthropic MS365 Add-in 없음 — Power Automate 커넥터가 현실적 방법")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
