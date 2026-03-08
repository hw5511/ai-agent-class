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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 07</text>'
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
        title("매일 아침 뉴스 자동 요약 알림") + "\n" +
        sub("N8N으로 뉴스 수집·요약부터 Telegram 알림까지 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "파이프라인 구조  /  뉴스 수집 노드 (RSS / API)  /  AI 요약") + "\n" +
        body(354, "스케줄 트리거 (매일 아침)  /  Telegram 전송") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 파이프라인 구조
    "02": lambda: wrap(
        badge() + "\n" +
        title("파이프라인 구조") + "\n" +
        sub("자동 수집 → 요약 → 알림으로 이어지는 흐름을 설계합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "전체 흐름") + "\n" +
        body(308, "Schedule Trigger  →  RSS / API 수집  →  키워드 필터") + "\n" +
        body(354, "→  Claude AI 요약  →  메시지 포맷  →  Telegram 전송") + "\n" +
        divider(400) + "\n" +
        label(440, "노드 역할") + "\n" +
        body(478, "Schedule Trigger  —  매일 아침 지정 시간에 워크플로우 자동 실행") + "\n" +
        body(516, "Item Lists 노드  —  복수 뉴스 항목을 하나로 병합") + "\n" +
        body(554, "Set 노드  —  요약 결과를 메시지 형식으로 가공") + "\n" +
        footer_light("각 노드 실행 결과를 즉시 확인하며 단계별로 구성합니다")
    ),
    # 03: 뉴스 수집 노드 (RSS / API)
    "03": lambda: wrap(
        badge() + "\n" +
        title("뉴스 수집 노드") + "\n" +
        divider(180) + "\n" +
        label(224, "RSS Feed Read 노드 (N8N 내장)") + "\n" +
        body(262, "Feed URL 입력  —  구글 뉴스, 네이버 뉴스 RSS 등") + "\n" +
        body(302, "결과: title / link / pubDate / content 필드 자동 파싱") + "\n" +
        divider(344) + "\n" +
        label(388, "NewsAPI (HTTP Request 노드)") + "\n" +
        body(426, "GET https://newsapi.org/v2/everything", mono=True, size=17, color="#374151") + "\n" +
        body(462, "params: q=키워드, language=ko, apiKey=YOUR_KEY", mono=True, size=17, color="#374151") + "\n" +
        divider(504) + "\n" +
        label(544, "키워드 필터링") + "\n" +
        body(578, "IF 노드  —  title에 키워드 포함 여부로 분기 처리") + "\n"
    ),
    # 04: AI 요약 + 스케줄 트리거
    "04": lambda: wrap(
        badge() + "\n" +
        title("AI 요약  /  스케줄 트리거") + "\n" +
        divider(180) + "\n" +
        label(224, "AI 요약") + "\n" +
        body(262, "Anthropic Chat Model 노드  —  수집된 뉴스 헤드라인 일괄 요약") + "\n" +
        body(302, "프롬프트: '다음 뉴스 목록을 3줄로 요약해줘. 핵심만'") + "\n" +
        body(342, "Item Lists 노드  —  여러 뉴스를 하나의 텍스트로 병합 후 전달") + "\n" +
        divider(384) + "\n" +
        label(424, "Schedule Trigger 노드") + "\n" +
        body(462, "Trigger Interval: Days  —  Trigger at Hour: 8") + "\n" +
        body(502, "Cron 직접 입력: 0 8 * * *  (매일 오전 8시)") + "\n" +
        divider(544) + "\n" +
        body(578, "Test workflow 버튼으로 즉시 실행 가능  —  스케줄 대기 불필요") + "\n"
    ),
    # 05: Telegram 전송
    "05": lambda: wrap(
        badge() + "\n" +
        title("Telegram 전송") + "\n" +
        sub("요약된 뉴스를 매일 아침 Telegram으로 자동 수신합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Telegram 노드 설정") + "\n" +
        body(308, "작업(Operation): Send Message") + "\n" +
        body(354, "Credentials: Bot Token  —  BotFather에서 발급") + "\n" +
        body(400, "Chat ID: 개인 채팅 ID 또는 그룹 / 채널 ID") + "\n" +
        divider(440) + "\n" +
        label(480, "메시지 포맷 예시") + "\n" +
        body(518, "오늘의 뉴스 요약 ({{ $now.format('MM/DD') }})", mono=True, size=17, color="#374151") + "\n" +
        body(554, "{{ $json.summary }}", mono=True, size=17, color="#374151") + "\n" +
        footer("Schedule Trigger → 수집 → 요약 → Telegram — 매일 아침 자동 완성")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
