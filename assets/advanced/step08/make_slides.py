import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 08</text>'
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
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#2563eb"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="17" font-weight="600" fill="#ffffff">{esc(text)}</text>'
    )


def footer_light(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#eff6ff"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#2563eb">{esc(text)}</text>'
    )


slides = {
    # 01: 오프닝
    "01": lambda: wrap(
        badge() + "\n" +
        title("Notion 자동화 & Agent Teams") + "\n" +
        sub("N8N으로 Notion을 자동화하고 에이전트 팀 협업을 구현합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "Agent Teams 개념  /  Notion 페이지 자동 생성  /  DB 자동 업데이트") + "\n" +
        body(354, "팀 협업 구현  —  심화 과정 최종 완성") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: Agent Teams 개념
    "02": lambda: wrap(
        badge() + "\n" +
        title("Agent Teams 개념") + "\n" +
        sub("여러 AI 에이전트가 역할을 나눠 협업하는 구조입니다") + "\n" +
        divider(212) + "\n" +
        label(264, "구조") + "\n" +
        body(308, "Supervisor (팀장)  —  전체 지시를 받아 역할별 에이전트에 분배") + "\n" +
        body(354, "Worker (작업자)  —  조사·정리·생성 등 특정 역할만 수행") + "\n" +
        divider(400) + "\n" +
        label(440, "N8N 구현 방법") + "\n" +
        body(478, "AI Agent 노드  —  Supervisor 역할 수행, Tools로 서브 에이전트 호출") + "\n" +
        body(516, "Execute Workflow Tool  —  별도 워크플로우를 Worker로 실행") + "\n" +
        body(554, "각 Worker 워크플로우는 독립된 역할(조사 / 정리 / 작성)을 담당") + "\n" +
        footer_light("단일 에이전트보다 복잡한 작업을 병렬·분산 처리할 수 있습니다")
    ),
    # 03: Notion 페이지 자동 생성
    "03": lambda: wrap(
        badge() + "\n" +
        title("Notion 페이지 자동 생성") + "\n" +
        divider(180) + "\n" +
        label(224, "사전 준비") + "\n" +
        body(262, "Notion Integration 생성  —  notion.so/my-integrations") + "\n" +
        body(302, "N8N Credentials: Notion API  —  Integration Token 입력") + "\n" +
        body(342, "대상 데이터베이스에 Integration 연결 (Share → Invite)") + "\n" +
        divider(384) + "\n" +
        label(424, "Notion 노드 설정") + "\n" +
        body(462, "Resource: Database Page  /  Operation: Create") + "\n" +
        body(502, "Database ID: 대상 DB URL에서 추출") + "\n" +
        body(542, "Properties: 제목·날짜·상태 등 DB 속성 자동 입력") + "\n" +
        footer_light("N8N Notion 노드 — Create / Get / Update / Delete 지원")
    ),
    # 04: Notion DB 자동 업데이트
    "04": lambda: wrap(
        badge() + "\n" +
        title("Notion DB 자동 업데이트") + "\n" +
        divider(180) + "\n" +
        label(224, "항목 조회") + "\n" +
        body(262, "Operation: Get Many  —  Filter 조건으로 특정 항목 검색") + "\n" +
        body(302, "Filter 예시: Status = '진행 중'  /  Date = 오늘") + "\n" +
        divider(344) + "\n" +
        label(388, "항목 업데이트") + "\n" +
        body(426, "Operation: Update  —  Page ID로 기존 항목 속성 수정") + "\n" +
        body(466, "Status 변경, 내용 추가, 날짜 갱신 등 자동 처리 가능") + "\n" +
        divider(508) + "\n" +
        label(548, "활용 패턴") + "\n" +
        body(580, "에이전트 작업 완료 시 자동으로 상태를 '완료'로 갱신") + "\n"
    ),
    # 05: 팀 협업 구현
    "05": lambda: wrap(
        badge() + "\n" +
        title("팀 협업 구현") + "\n" +
        sub("Supervisor가 Workers에게 분배하고 결과를 Notion에 정리합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "전체 파이프라인") + "\n" +
        body(308, "Webhook (주제 입력)  →  Supervisor AI Agent (작업 분배)") + "\n" +
        body(354, "→  Worker A (웹 조사)  +  Worker B (내용 정리)  [병렬]") + "\n" +
        body(400, "→  Merge 노드 (결과 수집)  →  Notion DB 자동 정리") + "\n" +
        divider(440) + "\n" +
        label(480, "핵심 노드") + "\n" +
        body(518, "Execute Workflow Tool  —  Worker 워크플로우 병렬 실행") + "\n" +
        body(554, "Merge 노드  —  복수 브랜치 결과를 하나로 합산") + "\n" +
        footer("심화 전 과정 완성 — 기초 8강 + 심화 8강 총 16강 수료")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
