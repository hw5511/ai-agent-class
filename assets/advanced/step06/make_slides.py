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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 06</text>'
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
        title("워크플로우로 PPT 자동 생성") + "\n" +
        sub("N8N으로 조사부터 PPT 완성 및 Telegram 전송까지 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "파이프라인 설계  /  조사·정리 노드  /  PPT 구성 자동화") + "\n" +
        body(354, "PPT 파일 생성 (python-pptx)  /  Telegram 전송") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 파이프라인 설계
    "02": lambda: wrap(
        badge() + "\n" +
        title("파이프라인 설계") + "\n" +
        sub("전체 워크플로우 노드 구조를 설계합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "전체 흐름") + "\n" +
        body(308, "Manual Trigger  →  Jina AI (웹 조사)  →  Claude AI (내용 정리)") + "\n" +
        body(354, "Code 노드 (슬라이드 JSON 구성)  →  Execute Command (PPT 생성)  →  Telegram") + "\n" +
        divider(400) + "\n" +
        label(440, "노드 역할") + "\n" +
        body(478, "Manual Trigger  —  주제 키워드 입력") + "\n" +
        body(516, "Code 노드  —  슬라이드 데이터를 JSON 배열로 구조화") + "\n" +
        body(554, "Execute Command  —  python make_ppt.py 실행") + "\n" +
        footer_light("각 노드 실행 결과를 즉시 확인하며 디버깅합니다")
    ),
    # 03: 조사/정리 노드
    "03": lambda: wrap(
        badge() + "\n" +
        title("조사 / 정리 노드") + "\n" +
        divider(180) + "\n" +
        label(224, "웹 조사") + "\n" +
        body(262, "Jina AI 노드  —  URL 콘텐츠 추출 · 웹 검색 (LLM 친화적 텍스트)") + "\n" +
        body(302, "HTTP Request 노드  —  검색 API 호출, 원시 데이터 수집") + "\n" +
        divider(344) + "\n" +
        label(388, "AI 정리") + "\n" +
        body(426, "Anthropic Chat Model 노드  —  Claude로 내용 요약 + 슬라이드 텍스트 작성") + "\n" +
        body(466, "프롬프트: '다음 내용을 5장 슬라이드 구조로 정리해줘'") + "\n" +
        divider(508) + "\n" +
        label(548, "Code 노드 출력 형식") + "\n" +
        body(580, "return [{ json: { slides: [{title, content}, ...] } }];", mono=True, size=16, color="#374151") + "\n"
    ),
    # 04: PPT 슬라이드 구성 자동화 + 파일 생성
    "04": lambda: wrap(
        badge() + "\n" +
        title("PPT 파일 생성") + "\n" +
        sub("python-pptx로 슬라이드를 자동 생성합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "설치") + "\n" +
        body(302, "pip install python-pptx", mono=True, color="#374151") + "\n" +
        divider(336) + "\n" +
        label(376, "핵심 코드") + "\n" +
        body(414, "from pptx import Presentation", mono=True, size=17, color="#374151") + "\n" +
        body(448, "prs = Presentation()", mono=True, size=17, color="#374151") + "\n" +
        body(482, "slide = prs.slides.add_slide(prs.slide_layouts[1])", mono=True, size=17, color="#374151") + "\n" +
        body(516, "slide.shapes.title.text = '제목'", mono=True, size=17, color="#374151") + "\n" +
        body(550, "slide.placeholders[1].text = '내용'", mono=True, size=17, color="#374151") + "\n" +
        body(584, "prs.save('output.pptx')", mono=True, size=17, color="#374151") + "\n"
    ),
    # 05: Telegram 전송
    "05": lambda: wrap(
        badge() + "\n" +
        title("Telegram 전송") + "\n" +
        sub("N8N Telegram 노드로 완성된 PPT를 자동 전송합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Telegram 노드 설정") + "\n" +
        body(308, "작업(Operation): Send Document") + "\n" +
        body(354, "Bot Token  —  BotFather에서 발급 후 Credentials 등록") + "\n" +
        body(400, "Chat ID  —  수신자 채팅 ID 또는 @채널명") + "\n" +
        divider(440) + "\n" +
        label(480, "파일 전달 방법") + "\n" +
        body(518, "Read/Write Files 노드  —  생성된 .pptx 파일을 Binary Data로 로드") + "\n" +
        body(556, "Telegram 노드  —  Binary Data를 sendDocument로 전송") + "\n" +
        footer("주제 입력 → 조사 → 정리 → PPT 생성 → Telegram 자동 전송 완료")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
