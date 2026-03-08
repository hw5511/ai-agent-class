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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 05</text>'
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
        title("자료조사 & 카드뉴스 자동화") + "\n" +
        sub("N8N으로 조사부터 이미지 생성까지 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "N8N 개념  /  설치 환경 구성") + "\n" +
        body(354, "웹 조사 노드  /  AI 요약 노드  /  카드뉴스 이미지 생성 연동") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: N8N 개념
    "02": lambda: wrap(
        badge() + "\n" +
        title("N8N") + "\n" +
        sub("노드를 연결해 워크플로우를 자동화하는 도구") + "\n" +
        divider(212) + "\n" +
        label(264, "개념") + "\n" +
        body(308, "노드(블록)를 드래그·연결해 자동화 흐름을 구성") + "\n" +
        body(354, "400+ 외부 서비스 통합  —  코드 없이 또는 코드와 함께") + "\n" +
        body(400, "AI 노드 내장  —  Claude · OpenAI · Jina AI 연결 가능") + "\n" +
        divider(440) + "\n" +
        label(480, "특징") + "\n" +
        body(518, "각 노드 실행 결과를 즉시 확인  —  빠른 디버깅") + "\n" +
        footer_light("Fair-Code 라이선스 — 로컬 설치 무료")
    ),
    # 03: N8N 설치 환경 구성
    "03": lambda: wrap(
        badge() + "\n" +
        title("N8N 설치 환경 구성") + "\n" +
        divider(180) + "\n" +
        label(224, "빠른 시작 (권장)") + "\n" +
        body(262, "npx n8n", mono=True, color="#374151") + "\n" +
        body(300, "설치 없이 즉시 실행  →  http://localhost:5678 접속", mono=True, color="#374151") + "\n" +
        divider(344) + "\n" +
        label(388, "전역 설치") + "\n" +
        body(424, "npm install n8n -g", mono=True, color="#374151") + "\n" +
        body(460, "n8n start", mono=True, color="#374151") + "\n" +
        divider(500) + "\n" +
        label(540, "프로덕션") + "\n" +
        body(572, "Docker  —  데이터 영속성·환경 관리에 적합", mono=False, color="#374151") + "\n" +
        footer_light("Node.js 20.19 이상 필요")
    ),
    # 04: 웹 조사 노드 + AI 요약 노드
    "04": lambda: wrap(
        badge() + "\n" +
        title("웹 조사 노드  /  AI 요약 노드") + "\n" +
        divider(180) + "\n" +
        label(224, "웹 조사") + "\n" +
        body(262, "HTTP Request 노드  —  공개 API 호출, 웹 데이터 수집") + "\n" +
        body(302, "Jina AI 노드  —  URL 콘텐츠 추출 · 웹 검색 (LLM 친화적)") + "\n" +
        divider(346) + "\n" +
        label(390, "AI 요약") + "\n" +
        body(428, "Anthropic Chat Model 노드  —  Claude로 내용 요약·정리") + "\n" +
        body(468, "OpenAI 노드  —  GPT 모델 요약 활용") + "\n" +
        divider(510) + "\n" +
        label(550, "연결 흐름") + "\n" +
        body(582, "Jina AI (수집)  →  Anthropic (요약)  →  다음 노드", color="#374151") + "\n"
    ),
    # 05: 카드뉴스 이미지 생성 연동
    "05": lambda: wrap(
        badge() + "\n" +
        title("카드뉴스 이미지 생성 연동") + "\n" +
        sub("요약 결과로 이미지를 자동 생성하고 저장합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "이미지 생성 연동") + "\n" +
        body(308, "HTTP Request 노드  —  외부 이미지 생성 API 호출") + "\n" +
        body(354, "요약된 텍스트를 프롬프트로 자동 변환해 전달") + "\n" +
        divider(400) + "\n" +
        label(440, "전체 워크플로우") + "\n" +
        body(480, "키워드 입력") + "\n" +
        body(516, "→  Jina AI 웹 조사  →  Claude 요약  →  이미지 생성  →  저장") + "\n" +
        footer("키워드 하나로 자료조사부터 카드뉴스까지 자동 완성됩니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
