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
        body(308, "Sub Agent 개념  /  작동 원리") + "\n" +
        body(354, "Hooks 설정  /  PreToolUse · PostToolUse") + "\n" +
        body(400, "PowerPoint 자동 생성  /  Excel 자동화") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: Sub Agent 개념
    "02": lambda: wrap(
        badge() + "\n" +
        title("Sub Agent") + "\n" +
        sub("특정 역할에 특화된 독립 에이전트를 정의합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "작동 원리") + "\n" +
        body(308, "독립적인 컨텍스트 윈도우로 실행") + "\n" +
        body(354, "역할 설명이 일치하면 Claude가 자동으로 위임") + "\n" +
        body(400, "결과를 메인 에이전트에 반환") + "\n" +
        divider(440) + "\n" +
        label(480, "정의 위치") + "\n" +
        body(518, ".claude/agents/agent-name.md   (프로젝트)", mono=True, color="#374151") + "\n" +
        footer_light("Sub Agent는 다른 Sub Agent를 생성할 수 없습니다")
    ),
    # 03: Hooks
    "03": lambda: wrap(
        badge() + "\n" +
        title("Hooks") + "\n" +
        sub("도구 실행 전후에 자동으로 명령어를 실행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "settings.json 설정") + "\n" +
        body(308, '"hooks": { "PreToolUse": [...], "PostToolUse": [...] }', mono=True, color="#374151") + "\n" +
        divider(360) + "\n" +
        label(404, "주요 이벤트") + "\n" +
        body(448, "PreToolUse     도구 실행 전  —  exit 2 로 차단 가능") + "\n" +
        body(494, "PostToolUse   도구 성공 후  —  자동 포맷팅 등에 활용") + "\n" +
        footer_light("matcher 패턴으로 특정 도구만 선택 가능 (예: Bash, Edit|Write)")
    ),
    # 04: PowerPoint 자동 생성
    "04": lambda: wrap(
        badge() + "\n" +
        title("PowerPoint 자동 생성") + "\n" +
        sub("python-pptx 라이브러리로 .pptx 파일을 생성합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "사용 방법") + "\n" +
        body(308, "Claude Code에 슬라이드 구성을 지시") + "\n" +
        body(354, "에이전트가 python-pptx 코드를 작성하고 실행") + "\n" +
        body(400, "슬라이드 레이아웃, 텍스트, 이미지 자동 배치") + "\n" +
        divider(440) + "\n" +
        label(480, "예시 지시") + "\n" +
        body(518, '"3장짜리 PPT 만들어줘. 제목/내용/마무리 구조로"', mono=True, color="#374151") + "\n" +
        footer_light("생성된 .pptx 파일은 PowerPoint에서 바로 편집 가능")
    ),
    # 05: Excel 자동화
    "05": lambda: wrap(
        badge() + "\n" +
        title("Excel 자동화") + "\n" +
        sub("openpyxl 라이브러리로 .xlsx 파일을 생성·편집합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "가능한 작업") + "\n" +
        body(308, "셀 데이터 입력  /  수식 삽입  /  스타일 적용") + "\n" +
        body(354, "차트 생성  /  다중 시트 구성") + "\n" +
        divider(400) + "\n" +
        label(440, "주의") + "\n" +
        body(484, "매크로·피벗테이블 포함 파일은 손상 위험") + "\n" +
        body(528, "단순 데이터 파일에만 사용 권장") + "\n" +
        footer("Claude Code에 목적과 구조를 설명하면 코드를 자동 작성합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
