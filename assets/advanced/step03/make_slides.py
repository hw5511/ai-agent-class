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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>'
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
        title("웹 브라우저 자동 조작하기") + "\n" +
        sub("브라우저를 코드로 직접 제어합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "웹 자동화 원리  /  Playwright vs Selenium") + "\n" +
        body(354, "환경 구성  /  이동·클릭·입력  /  데이터 수집·스크린샷  /  저장") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 웹 자동화 원리 + Playwright vs Selenium
    "02": lambda: wrap(
        badge() + "\n" +
        title("웹 자동화 원리") + "\n" +
        sub("코드가 브라우저를 직접 조종합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "원리") + "\n" +
        body(308, "코드 → 브라우저 제어 → 클릭·입력·데이터 추출 자동 수행") + "\n" +
        divider(354) + "\n" +
        label(394, "Playwright vs Selenium") + "\n" +
        body(434, "Playwright   빠름 · 자동 대기 내장 · 설치 간단  (권장)") + "\n" +
        body(474, "Selenium      오래된 생태계 · 레거시 지원 · 명시적 대기 필요") + "\n" +
        footer_light("새로운 프로젝트는 Playwright 권장")
    ),
    # 03: 환경 구성
    "03": lambda: wrap(
        badge() + "\n" +
        title("환경 구성") + "\n" +
        sub("Playwright 설치는 두 단계로 진행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "설치") + "\n" +
        body(308, "pip install playwright", mono=True, color="#374151") + "\n" +
        body(348, "playwright install        # 브라우저 바이너리 다운로드 (필수)", mono=True, color="#374151") + "\n" +
        divider(394) + "\n" +
        label(434, "기본 구조") + "\n" +
        body(474, "from playwright.sync_api import sync_playwright", mono=True, color="#374151") + "\n" +
        body(514, "with sync_playwright() as p:", mono=True, color="#374151") + "\n" +
        body(550, "    browser = p.chromium.launch()", mono=True, color="#374151") + "\n" +
        footer_light("pip install 만으로는 부족 — playwright install 반드시 실행")
    ),
    # 04: 이동/클릭/입력 + 데이터 수집/스크린샷
    "04": lambda: wrap(
        badge() + "\n" +
        title("이동  /  클릭  /  입력  /  수집") + "\n" +
        divider(180) + "\n" +
        label(224, "핵심 API") + "\n" +
        body(262, "page.goto('https://...')          URL 이동", mono=True, color="#374151") + "\n" +
        body(298, "page.click('.btn')                 요소 클릭 (자동 대기)", mono=True, color="#374151") + "\n" +
        body(334, "page.fill('#input', '텍스트')     입력 필드 채우기", mono=True, color="#374151") + "\n" +
        body(370, "page.screenshot(path='out.png')  스크린샷 저장", mono=True, color="#374151") + "\n" +
        divider(410) + "\n" +
        label(450, "데이터 수집") + "\n" +
        body(488, "items = page.locator('.item').all()", mono=True, color="#374151") + "\n" +
        body(524, "texts = [i.text_content() for i in items]", mono=True, color="#374151") + "\n" +
        footer_light("full_page=True 옵션으로 스크롤 영역까지 전체 캡처 가능")
    ),
    # 05: CSV/JSON 저장
    "05": lambda: wrap(
        badge() + "\n" +
        title("CSV  /  JSON 저장") + "\n" +
        sub("수집한 데이터를 파일로 저장합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "CSV 저장") + "\n" +
        body(308, "with open('data.csv', 'w', newline='', encoding='utf-8') as f:", mono=True, color="#374151") + "\n" +
        body(344, "    writer = csv.DictWriter(f, fieldnames=['이름', '가격'])", mono=True, color="#374151") + "\n" +
        body(380, "    writer.writeheader()  /  writer.writerows(data)", mono=True, color="#374151") + "\n" +
        divider(416) + "\n" +
        label(456, "JSON 저장") + "\n" +
        body(496, "with open('data.json', 'w', encoding='utf-8') as f:", mono=True, color="#374151") + "\n" +
        body(532, "    json.dump(data, f, ensure_ascii=False, indent=2)", mono=True, color="#374151") + "\n" +
        footer("수집 → 저장까지 에이전트 명령 하나로 자동 완성됩니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
