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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>'
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
        title("외부 API 연동 2  —  AI이미지 + Gemini + CLI") + "\n" +
        sub("이미지 생성 API와 Gemini를 CLI 파이프라인으로 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "이미지 생성 API Skill  /  Gemini API 연동") + "\n" +
        body(354, "CLI 파이프라인 통합  /  복합 실습 (Gemini -> 이미지 자동 생성)") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 이미지 생성 API Skill
    "02": lambda: wrap(
        badge() + "\n" +
        title("이미지 생성 API  Skill") + "\n" +
        sub("SKILL.md + Python 스크립트로 이미지 생성 API를 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Skill 구조") + "\n" +
        body(308, ".claude/skills/image-gen/SKILL.md      진입점 정의", mono=True, color="#374151") + "\n" +
        body(348, ".claude/skills/image-gen/scripts/run.py  실제 API 호출", mono=True, color="#374151") + "\n" +
        divider(394) + "\n" +
        label(434, "핵심 코드 흐름") + "\n" +
        body(474, "1.  os.getenv()  로 API 키 로드", mono=True, color="#374151") + "\n" +
        body(510, "2.  requests.post(url, headers=..., json={prompt})  호출", mono=True, color="#374151") + "\n" +
        body(546, "3.  base64.b64decode()  디코딩  ->  타임스탬프 파일명으로 저장", mono=True, color="#374151") + "\n" +
        footer_light("API 키는 환경변수로 관리 — 코드에 직접 입력 금지")
    ),
    # 03: Gemini API 연동
    "03": lambda: wrap(
        badge() + "\n" +
        title("Gemini API 연동") + "\n" +
        sub("Google의 Gemini 모델을 Python에서 직접 호출합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "설치 + API 키") + "\n" +
        body(308, "pip install google-generativeai", mono=True, color="#374151") + "\n" +
        body(348, "Google AI Studio  ->  API 키 발급  ->  환경변수 GEMINI_API_KEY 등록") + "\n" +
        divider(394) + "\n" +
        label(434, "기본 호출") + "\n" +
        body(474, "import google.generativeai as genai", mono=True, color="#374151") + "\n" +
        body(510, "genai.configure(api_key=os.getenv('GEMINI_API_KEY'))", mono=True, color="#374151") + "\n" +
        body(546, "model = genai.GenerativeModel('gemini-2.0-flash')", mono=True, color="#374151") + "\n" +
        body(582, "resp = model.generate_content('프롬프트')  # resp.text 로 결과 추출", mono=True, size=16, color="#374151") + "\n"
    ),
    # 04: CLI 파이프라인 통합
    "04": lambda: wrap(
        badge() + "\n" +
        title("CLI 파이프라인 통합") + "\n" +
        sub("여러 API 호출을 하나의 스크립트로 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "통합 흐름") + "\n" +
        body(308, "Claude (claude -p)  ->  Gemini  ->  이미지 생성 API  ->  저장") + "\n" +
        body(354, "각 단계 결과를 다음 단계의 입력으로 전달하는 파이프라인 구성") + "\n" +
        divider(400) + "\n" +
        label(440, "실용 패턴") + "\n" +
        body(478, "Claude로 아이디어 구체화  ->  Gemini로 이미지 프롬프트 최적화") + "\n" +
        body(518, "이미지 생성 API로 최종 이미지 생성  ->  폴더에 자동 저장") + "\n" +
        divider(554) + "\n" +
        footer_light("모델마다 강점이 다름  —  용도에 맞게 선택적으로 활용")
    ),
    # 05: 복합 실습
    "05": lambda: wrap(
        badge() + "\n" +
        title("복합 실습") + "\n" +
        divider(180) + "\n" +
        label(224, "실습 목표") + "\n" +
        body(262, "주제 입력  ->  Gemini로 이미지 프롬프트 생성  ->  이미지 API로 생성") + "\n" +
        body(302, "결과 폴더에 자동 저장  ->  Discord Webhook으로 이미지 전송") + "\n" +
        divider(346) + "\n" +
        label(390, "실습 프롬프트") + "\n" +
        body(428, "'SNS용 AI 아트 이미지를 자동으로 만들어줘.", color="#1d4ed8") + "\n" +
        body(464, " Gemini로 프롬프트를 먼저 최적화하고, 이미지 생성 Skill로", color="#1d4ed8") + "\n" +
        body(500, " 이미지를 생성한 뒤 저장해줘'", color="#1d4ed8") + "\n" +
        divider(536) + "\n" +
        body(566, "심화 Skills 4강  —  문서·웹·GCP·AI이미지+Gemini 연동 완성") + "\n" +
        footer("여러 외부 API를 하나의 파이프라인으로 연결하면 강력해집니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
