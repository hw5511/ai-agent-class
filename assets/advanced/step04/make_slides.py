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
        sub("다양한 외부 API를 Skill로 감싸 파이프라인으로 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "NanoBanana API: AI 이미지 생성 자동화  /  Gemini API: 텍스트·멀티모달") + "\n" +
        body(354, "CLI 도구 연동 개념  /  실습: 이미지 + 텍스트 콘텐츠 자동 생성 파이프라인") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: NanoBanana API — AI 이미지 생성 Skill
    "02": lambda: wrap(
        badge() + "\n" +
        title("NanoBanana API  —  AI 이미지 생성 Skill") + "\n" +
        sub("SKILL.md + Python 스크립트로 이미지 생성 API를 Skill로 감쌉니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Skill 구조") + "\n" +
        body(308, ".claude/skills/image-gen/SKILL.md      진입점 · 사용법 정의", mono=True, size=16, color="#374151") + "\n" +
        body(344, ".claude/skills/image-gen/scripts/run.py  NanoBanana API 호출", mono=True, size=16, color="#374151") + "\n" +
        divider(386) + "\n" +
        label(426, "핵심 코드 흐름") + "\n" +
        body(464, "1.  os.getenv('NANOBANANA_API_KEY')  로 API 키 로드", mono=True, size=16, color="#374151") + "\n" +
        body(500, "2.  requests.post(endpoint, headers=..., json={'prompt': prompt})", mono=True, size=16, color="#374151") + "\n" +
        body(536, "3.  base64.b64decode(data)  ->  타임스탬프 파일명으로 PNG 저장", mono=True, size=16, color="#374151") + "\n" +
        footer_light("API 키는 환경변수로 관리 — 코드에 직접 입력 금지")
    ),
    # 03: Gemini API — 텍스트 분석 + 멀티모달
    "03": lambda: wrap(
        badge() + "\n" +
        title("Gemini API  —  텍스트 분석 + 멀티모달") + "\n" +
        sub("Google AI Studio에서 API 키를 발급받아 Python에서 직접 호출합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "설치 + 기본 텍스트 호출") + "\n" +
        body(308, "pip install google-generativeai", mono=True, size=16, color="#374151") + "\n" +
        body(344, "genai.configure(api_key=os.getenv('GEMINI_API_KEY'))", mono=True, size=16, color="#374151") + "\n" +
        body(380, "model = genai.GenerativeModel('gemini-2.0-flash')", mono=True, size=16, color="#374151") + "\n" +
        body(416, "resp = model.generate_content('프롬프트')  # resp.text 추출", mono=True, size=16, color="#374151") + "\n" +
        divider(452) + "\n" +
        label(492, "멀티모달  —  이미지 분석") + "\n" +
        body(530, "img = PIL.Image.open('photo.jpg')", mono=True, size=16, color="#374151") + "\n" +
        body(560, "resp = model.generate_content(['이 이미지를 설명해줘', img])  # 이미지+텍스트", mono=True, size=15, color="#374151") + "\n"
    ),
    # 04: CLI 도구 연동 개념 — 외부 CLI를 Skill로 감싸는 패턴
    "04": lambda: wrap(
        badge() + "\n" +
        title("CLI 도구 연동  —  외부 CLI를 Skill로 감싸기") + "\n" +
        sub("ffmpeg, yt-dlp, ImageMagick 등 CLI 도구를 Skill로 래핑합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Skill 래핑 패턴") + "\n" +
        body(308, "SKILL.md: '사용법 — 비디오 파일을 MP3로 변환해줘'  (에이전트 트리거)", mono=True, size=16, color="#374151") + "\n" +
        body(344, "run.py:  subprocess.run(['ffmpeg', '-i', input, output])  CLI 호출", mono=True, size=16, color="#374151") + "\n" +
        divider(386) + "\n" +
        label(426, "활용 예시") + "\n" +
        body(464, "ffmpeg Skill     —  동영상 변환·편집·썸네일 추출") + "\n" +
        body(504, "yt-dlp Skill     —  YouTube 영상·음원 다운로드") + "\n" +
        body(540, "ImageMagick Skill  —  이미지 리사이즈·포맷 변환·합성") + "\n" +
        footer_light("CLI 도구 + Skill = 에이전트 명령 한 줄로 복잡한 처리 자동화")
    ),
    # 05: 실습 — API 조합 콘텐츠 자동 생성 파이프라인
    "05": lambda: wrap(
        badge() + "\n" +
        title("실습  —  콘텐츠 자동 생성 파이프라인") + "\n" +
        divider(180) + "\n" +
        label(224, "실습 목표: 이미지 + 텍스트 콘텐츠 동시 생성") + "\n" +
        body(262, "1  Gemini API로 주제에 맞는 이미지 프롬프트 + 설명 텍스트 생성") + "\n" +
        body(302, "2  NanoBanana API Skill로 최적화된 프롬프트로 이미지 자동 생성") + "\n" +
        body(342, "3  생성된 이미지와 텍스트를 지정 폴더에 함께 저장") + "\n" +
        divider(384) + "\n" +
        label(424, "실습 에이전트 명령") + "\n" +
        body(462, "'SNS용 AI 아트 콘텐츠를 만들어줘. Gemini로 주제에 맞는", color="#1d4ed8") + "\n" +
        body(498, " 이미지 프롬프트와 캡션을 생성하고, 이미지 생성 Skill로", color="#1d4ed8") + "\n" +
        body(534, " 이미지를 만들어 결과를 함께 저장해줘'", color="#1d4ed8") + "\n" +
        footer("여러 외부 API를 조합하면 Claude가 완성도 높은 콘텐츠를 자동 생성합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
