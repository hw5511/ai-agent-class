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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 06</text>'
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
        title("MCP 개념 이해와 Notion 연동") + "\n" +
        sub("AI 에이전트를 외부 서비스에 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "MCP란 무엇인가  /  설치와 세팅") + "\n" +
        body(354, "Notion MCP 설치  /  Notion 자동화") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: MCP란 무엇인가
    "02": lambda: wrap(
        badge() + "\n" +
        title("MCP란?") + "\n" +
        sub("Model Context Protocol — AI와 외부 시스템 연결 표준") + "\n" +
        divider(212) + "\n" +
        label(264, "개념") + "\n" +
        body(308, "AI 앱이 외부 시스템에 연결하는 개방형 표준") + "\n" +
        body(354, "USB-C처럼 — 한 번 구축하면 어디서든 연결") + "\n" +
        divider(400) + "\n" +
        label(440, "확장 가능한 것") + "\n" +
        body(484, "데이터베이스  /  SaaS 서비스  /  로컬 파일  /  API") + "\n" +
        footer_light("Claude, ChatGPT, Cursor 등 주요 AI 도구 모두 지원")
    ),
    # 03: MCP 설치와 세팅
    "03": lambda: wrap(
        badge() + "\n" +
        title("MCP 설치와 세팅") + "\n" +
        sub("claude mcp add 명령어로 서버를 등록합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "HTTP 방식 (원격 서버 — 권장)") + "\n" +
        body(308, "claude mcp add --transport http [이름] [URL]", mono=True, color="#374151") + "\n" +
        divider(354) + "\n" +
        label(394, "직접 실행 방식 (내 PC에서 실행)") + "\n" +
        body(436, "claude mcp add --transport stdio [이름] -- npx ...", mono=True, color="#374151") + "\n" +
        divider(476) + "\n" +
        label(514, "관리 명령어") + "\n" +
        body(552, "claude mcp list  /  claude mcp remove [이름]", mono=True, color="#374151") + "\n"
    ),
    # 04: Notion MCP 설치
    "04": lambda: wrap(
        badge() + "\n" +
        title("Notion MCP 설치") + "\n" +
        sub("Notion 통합을 생성하고 토큰을 발급받아 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "1단계 — Notion Integration 생성") + "\n" +
        body(308, "notion.so/profile/integrations 에서 통합 생성 후 토큰 복사") + "\n" +
        divider(354) + "\n" +
        label(394, "2단계 — MCP 서버 등록") + "\n" +
        body(436, "claude mcp add --transport http notion https://mcp.notion.com/mcp", mono=True, color="#374151") + "\n" +
        divider(480) + "\n" +
        label(520, "3단계 — Claude Code에서 인증") + "\n" +
        body(558, "/mcp  명령어로 인증 완료", mono=True, color="#374151") + "\n"
    ),
    # 05: Notion 자동화
    "05": lambda: wrap(
        badge() + "\n" +
        title("Notion 자동화") + "\n" +
        sub("에이전트 명령어로 Notion을 직접 제어합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "할 수 있는 것") + "\n" +
        body(308, "페이지 생성  /  검색  /  내용 수정") + "\n" +
        body(354, "데이터베이스 조회  /  항목 추가  /  업데이트") + "\n" +
        divider(400) + "\n" +
        label(440, "예시 지시") + "\n" +
        body(484, '"프로젝트 회의록 페이지를 Notion에 만들어줘"') + "\n" +
        body(528, '"DB에 오늘 작업 항목 3개 추가해줘"') + "\n" +
        footer("MCP 연결 후 자연어 지시만으로 Notion을 자동화합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
