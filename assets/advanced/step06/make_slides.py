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
        title("자동 트렌드 리서치 보고서 파이프라인") + "\n" +
        sub("수집 -> 분석 -> 보고까지 전 과정을 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "파이프라인 전체 구조  /  수집 단계 (웹 크롤링 · API)") + "\n" +
        body(354, "claude -p headless 분석  /  Discord 보고서 자동 전송") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 파이프라인 전체 구조
    "02": lambda: wrap(
        badge() + "\n" +
        title("파이프라인 전체 구조") + "\n" +
        sub("4단계로 이어지는 완전 자동화 흐름") + "\n" +
        divider(212) + "\n" +
        label(264, "단계별 흐름") + "\n" +
        body(308, "1  수집  —  웹 크롤링 / RSS / 공개 API로 트렌드 데이터 수집") + "\n" +
        body(354, "2  정리  —  중복 제거, 날짜 필터, 카테고리 분류") + "\n" +
        body(400, "3  분석  —  claude -p headless 모드로 요약·인사이트 추출") + "\n" +
        body(446, "4  보고  —  Discord 채널에 마크다운 보고서 자동 전송") + "\n" +
        divider(490) + "\n" +
        label(530, "자동화 방식") + "\n" +
        body(560, "Python 스크립트  +  cron / Task Scheduler 로 주기 실행") + "\n" +
        footer_light("한 번 구축하면 매일 자동으로 트렌드 보고서가 생성됩니다")
    ),
    # 03: 수집 단계 — 웹 크롤링 / API
    "03": lambda: wrap(
        badge() + "\n" +
        title("수집 단계  —  웹 크롤링  /  API") + "\n" +
        divider(180) + "\n" +
        label(224, "방법 1  —  RSS 피드 수집") + "\n" +
        body(262, "feedparser  —  뉴스·블로그 RSS를 구조화된 데이터로 파싱") + "\n" +
        body(302, "키워드 필터로 관심 분야만 추출  ->  JSON 파일로 저장") + "\n" +
        divider(346) + "\n" +
        label(390, "방법 2  —  공개 API 활용") + "\n" +
        body(428, "NewsAPI · GitHub Trending API · Reddit API 등") + "\n" +
        body(468, "requests 라이브러리로 데이터 수집  ->  pandas로 정리") + "\n" +
        divider(510) + "\n" +
        label(550, "방법 3  —  웹 크롤링") + "\n" +
        body(582, "BeautifulSoup  /  Playwright  —  공개 페이지 데이터 수집") + "\n"
    ),
    # 04: claude -p headless 분석
    "04": lambda: wrap(
        badge() + "\n" +
        title("claude -p  headless 분석") + "\n" +
        sub("스크립트에서 Claude를 직접 호출해 분석을 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "headless 호출 방식") + "\n" +
        body(308, "claude -p '프롬프트'  —  대화 없이 즉시 결과 반환", mono=True, color="#374151") + "\n" +
        body(354, "수집 데이터를 프롬프트에 삽입  ->  분석 결과를 변수로 받기") + "\n" +
        divider(400) + "\n" +
        label(440, "Python 연동") + "\n" +
        body(478, "result = subprocess.run(['claude', '-p', prompt],", mono=True, color="#374151") + "\n" +
        body(514, "    capture_output=True, text=True, encoding='utf-8')", mono=True, color="#374151") + "\n" +
        body(550, "analysis = result.stdout   # 분석 결과 문자열", mono=True, color="#374151") + "\n" +
        footer_light("claude -p 는 cron 등 자동화 환경에서도 정상 동작")
    ),
    # 05: Discord 보고서 전송 + 실습
    "05": lambda: wrap(
        badge() + "\n" +
        title("Discord  보고서 자동 전송  /  실습") + "\n" +
        divider(180) + "\n" +
        label(224, "Discord Webhook 전송") + "\n" +
        body(262, "Discord 채널  ->  연동  ->  Webhook URL 복사") + "\n" +
        body(302, "requests.post(webhook_url, json={'content': report})", mono=True, color="#374151") + "\n" +
        divider(346) + "\n" +
        label(390, "실습 목표") + "\n" +
        body(428, "관심 분야 키워드 선정  ->  RSS / API 수집 스크립트 작성") + "\n" +
        body(468, "claude -p 분석 연결  ->  Discord 보고서 전송 완성") + "\n" +
        body(508, "cron 등록  ->  매일 자동 실행 확인", color="#6b7280", size=17) + "\n" +
        divider(548) + "\n" +
        footer("키워드 하나로 매일 아침 트렌드 보고서를 자동 수신합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
