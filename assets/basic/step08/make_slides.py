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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 08</text>'
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
        title("Claude Desktop 사용법") + "\n" +
        sub("GUI 환경에서 Claude를 활용하는 방법을 익힙니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "일반 Desktop  /  Desktop Claude Code") + "\n" +
        body(354, "다중 에이전트 협업  /  CLI vs Desktop 비교") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 일반 Claude Desktop
    "02": lambda: wrap(
        badge() + "\n" +
        title("일반 Claude Desktop") + "\n" +
        sub("GUI 채팅 환경에서 Claude와 작업합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "주요 기능") + "\n" +
        body(308, "대화형 채팅  /  파일 첨부 및 분석") + "\n" +
        body(354, "Projects — 복잡한 작업을 프로젝트 단위로 관리") + "\n" +
        body(400, "MCP 서버 연동  /  커스텀 Skill 등록") + "\n" +
        divider(440) + "\n" +
        label(480, "설치") + "\n" +
        body(518, "claude.ai/downloads 에서 macOS · Windows 설치 파일 제공") + "\n" +
        footer_light("claude.ai 계정으로 로그인 — 유료 플랜 권장")
    ),
    # 03: Desktop Claude Code
    "03": lambda: wrap(
        badge() + "\n" +
        title("Desktop Claude Code") + "\n" +
        sub("Desktop 앱에서 바로 Claude Code를 실행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "실행 방법") + "\n" +
        body(308, "Desktop 앱 내 Code 탭 클릭으로 시작") + "\n" +
        divider(360) + "\n" +
        label(400, "CLI와의 세션 공유") + "\n" +
        body(444, "claude --resume 로 CLI와 Desktop 간 대화 이력 공유") + "\n" +
        body(490, "같은 작업을 CLI → Desktop → 웹에서 자유롭게 이동") + "\n" +
        footer_light("/ide 명령어로 VS Code와 연결해 GUI 파일 편집 가능")
    ),
    # 04: 다중 에이전트 협업 (Cowork)
    "04": lambda: wrap(
        badge() + "\n" +
        title("다중 에이전트 협업") + "\n" +
        sub("여러 에이전트가 각자 역할을 나눠 동시에 작업합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "구조") + "\n" +
        body(308, "리드 에이전트가 전체 작업을 조율") + "\n" +
        body(354, "Sub Agent들이 각자 독립적인 파트를 병렬 처리") + "\n" +
        body(400, "각 에이전트는 독립적인 대화 기억 공간에서 실행") + "\n" +
        divider(440) + "\n" +
        label(480, "활용 예시") + "\n" +
        body(518, "대규모 코드베이스 분석, 문서 자동화, 병렬 리서치") + "\n" +
        footer_light("작업이 클수록 Sub Agent로 분산 처리하면 효과적입니다")
    ),
    # 05: CLI vs Desktop 비교
    "05": lambda: wrap(
        badge() + "\n" +
        title("CLI vs Desktop") + "\n" +
        divider(180) + "\n" +
        label(224, "Claude Code CLI") + "\n" +
        body(262, "터미널 기반  /  자동화·스크립팅에 최적") + "\n" +
        body(302, "자동화 파이프라인 연결 가능") + "\n" +
        body(342, "Hooks·Skills·MCP 전체 기능 활용") + "\n" +
        divider(386) + "\n" +
        label(430, "Claude Desktop") + "\n" +
        body(468, "GUI 기반  /  시각적 작업·비개발자에게 친화적") + "\n" +
        body(508, "Projects 관리  /  파일 드래그·드롭·변경 내용 비교") + "\n" +
        body(548, "CLI와 세션 공유 가능 — 필요에 따라 전환") + "\n" +
        footer("상황에 맞게 CLI와 Desktop을 함께 활용합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
