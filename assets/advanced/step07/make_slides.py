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
        title("네이버 블로그 자동 포스팅") + "\n" +
        sub("리서치부터 이미지·콘텐츠 작성, 업로드까지 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "전체 흐름  /  주제 리서치  /  비주얼 소재 생성") + "\n" +
        body(354, "콘텐츠 작성  /  네이버 블로그 API 연동  /  자동 업로드") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 전체 흐름 + 주제 리서치
    "02": lambda: wrap(
        badge() + "\n" +
        title("전체 흐름  /  주제 리서치") + "\n" +
        sub("주제 선정부터 포스팅까지 5단계 자동화") + "\n" +
        divider(212) + "\n" +
        label(264, "자동화 파이프라인") + "\n" +
        body(308, "1  주제 리서치  —  웹 조사로 키워드·트렌드 수집") + "\n" +
        body(354, "2  비주얼 소재  —  이미지 생성 API로 썸네일 자동 제작") + "\n" +
        body(400, "3  콘텐츠 작성  —  claude -p 로 본문·태그 자동 생성") + "\n" +
        body(446, "4  이미지 업로드  —  네이버 블로그 이미지 API") + "\n" +
        body(492, "5  포스팅 발행  —  네이버 블로그 글쓰기 API") + "\n" +
        divider(530) + "\n" +
        label(562, "리서치 방법") + "\n" +
        body(590, "Playwright로 네이버 트렌드 수집  /  Claude로 키워드 분석") + "\n"
    ),
    # 03: 비주얼 소재 생성
    "03": lambda: wrap(
        badge() + "\n" +
        title("비주얼 소재 생성") + "\n" +
        sub("이미지 생성 API로 블로그 썸네일·삽화를 자동 제작합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "이미지 생성 흐름") + "\n" +
        body(308, "Claude로 주제에 맞는 이미지 프롬프트 자동 생성") + "\n" +
        body(354, "이미지 생성 API 호출  ->  PNG 파일 로컬 저장") + "\n" +
        divider(400) + "\n" +
        label(440, "Python 연동 예시") + "\n" +
        body(478, "resp = requests.post(IMAGE_API_URL,", mono=True, size=17, color="#374151") + "\n" +
        body(514, "    json={'prompt': img_prompt, 'size': '1024x1024'})", mono=True, size=17, color="#374151") + "\n" +
        body(550, "with open('thumb.png', 'wb') as f:", mono=True, size=17, color="#374151") + "\n" +
        body(582, "    f.write(resp.content)", mono=True, size=17, color="#374151") + "\n"
    ),
    # 04: 네이버 블로그 API 연동
    "04": lambda: wrap(
        badge() + "\n" +
        title("네이버 블로그 API 연동") + "\n" +
        sub("네이버 Open API로 이미지 업로드 후 글을 자동 발행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "사전 준비") + "\n" +
        body(308, "네이버 개발자 센터  ->  애플리케이션 등록  ->  Client ID / Secret 발급") + "\n" +
        body(354, "블로그 글쓰기 권한 설정  ->  OAuth 2.0 액세스 토큰 획득") + "\n" +
        divider(400) + "\n" +
        label(440, "이미지 업로드") + "\n" +
        body(478, "POST  /blog/v1/image-upload  —  multipart/form-data 방식") + "\n" +
        body(514, "응답에서 imageUrl 추출  ->  본문 HTML에 img 태그로 삽입") + "\n" +
        divider(554) + "\n" +
        footer("POST  /blog/v1/post  —  title + content(HTML) + tags 로 발행")
    ),
    # 05: 전체 자동화 실습
    "05": lambda: wrap(
        badge() + "\n" +
        title("전체 자동화 실습") + "\n" +
        divider(180) + "\n" +
        label(224, "실습 목표") + "\n" +
        body(262, "주제 키워드 입력  ->  리서치  ->  이미지 생성  ->  본문 작성") + "\n" +
        body(302, "->  이미지 업로드  ->  네이버 블로그 자동 발행 완성") + "\n" +
        divider(346) + "\n" +
        label(390, "실습 프롬프트") + "\n" +
        body(428, "'AI 생산성 도구 관련 블로그 포스팅을 자동으로 작성하고", color="#1d4ed8") + "\n" +
        body(464, " 네이버 블로그에 발행해줘. 썸네일 이미지도 생성해서", color="#1d4ed8") + "\n" +
        body(500, " 삽입해줘'", color="#1d4ed8") + "\n" +
        divider(536) + "\n" +
        body(566, "Claude가 리서치 → 이미지 → 글 작성 → 업로드를 순서대로 실행") + "\n" +
        footer("주제 하나로 블로그 포스팅 전 과정이 자동 완성됩니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
