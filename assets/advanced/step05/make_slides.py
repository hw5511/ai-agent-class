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
        title("CLAUDE.md 트리거  +  문서 자동화") + "\n" +
        sub("키워드로 동작을 제어하고 문서·가이드를 자동 생성합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "CLAUDE.md 트리거 키워드 설정  /  문서 라우팅 패턴") + "\n" +
        body(354, "매뉴얼·가이드 자동 생성 방법론  /  PPT 자동화 예시") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: CLAUDE.md 트리거 키워드 설정
    "02": lambda: wrap(
        badge() + "\n" +
        title("CLAUDE.md  —  트리거 키워드 설정") + "\n" +
        sub("특정 단어를 보면 Claude가 정해진 행동을 자동으로 수행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "트리거 설정 방법") + "\n" +
        body(308, "CLAUDE.md에 '사용자가 [키워드]를 입력하면 [동작]을 수행한다' 규칙 기술") + "\n" +
        body(354, "예: '분석 요청 시 먼저 데이터 구조를 파악하고 요약표를 만든다'") + "\n" +
        divider(400) + "\n" +
        label(440, "트리거 활용 예시") + "\n" +
        body(478, "보고서  →  Markdown 형식으로 섹션별 자동 구성") + "\n" +
        body(518, "점검  →  코드 품질·보안·성능 항목 순서대로 검토") + "\n" +
        body(554, "배포  →  체크리스트 실행 후 Git push 까지 진행", color="#6b7280", size=17) + "\n" +
        footer_light("프로젝트별 CLAUDE.md를 두면 맥락에 맞는 트리거 분리 가능")
    ),
    # 03: 문서 라우팅 패턴
    "03": lambda: wrap(
        badge() + "\n" +
        title("문서 라우팅 패턴") + "\n" +
        sub("키워드를 담당 문서·모듈에 자동으로 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "라우팅 구조") + "\n" +
        body(308, "CLAUDE.md에 키워드 → 참조 파일 매핑 테이블 작성") + "\n" +
        body(354, "Claude가 키워드를 감지하면 해당 문서를 Read 후 작업 수행") + "\n" +
        divider(400) + "\n" +
        label(440, "매핑 예시") + "\n" +
        body(478, "결제 관련  →  docs/payment_spec.md  참조") + "\n" +
        body(518, "DB 쿼리   →  docs/db_schema.md  참조") + "\n" +
        body(554, "API 작성   →  docs/api_convention.md  참조", color="#6b7280", size=17) + "\n" +
        footer("키워드 하나로 올바른 문서를 자동으로 읽고 작업합니다")
    ),
    # 04: 매뉴얼/가이드 자동 생성 방법론
    "04": lambda: wrap(
        badge() + "\n" +
        title("매뉴얼  /  가이드 자동 생성") + "\n" +
        sub("코드·데이터를 입력하면 문서를 자동으로 작성합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "생성 흐름") + "\n" +
        body(308, "소스 파일 분석  →  구조 파악  →  섹션별 문서 초안 작성") + "\n" +
        body(354, "Claude -p headless 모드로 스크립트에서 자동 호출 가능") + "\n" +
        divider(400) + "\n" +
        label(440, "실습 프롬프트") + "\n" +
        body(478, "'이 프로젝트 폴더를 분석해서 신규 팀원용 온보딩", color="#1d4ed8") + "\n" +
        body(514, " 가이드를 Markdown으로 작성해줘. 설치 → 구조 → 주요", color="#1d4ed8") + "\n" +
        body(550, " 명령어 순서로 구성해줘'", color="#1d4ed8") + "\n" +
        footer_light("CLAUDE.md에 출력 형식·섹션 구조를 미리 지정하면 일관성 향상")
    ),
    # 05: PPT 자동화 예시 + 정리
    "05": lambda: wrap(
        badge() + "\n" +
        title("PPT 자동화  —  데이터  →  프레젠테이션") + "\n" +
        divider(180) + "\n" +
        label(224, "자동화 흐름") + "\n" +
        body(262, "데이터 파일(CSV/JSON)  →  Claude 분석  →  슬라이드 구성 설계") + "\n" +
        body(302, "python-pptx  →  템플릿 기반 슬라이드 자동 삽입  →  파일 저장") + "\n" +
        divider(346) + "\n" +
        label(390, "실습 프롬프트") + "\n" +
        body(428, "'sales_data.csv를 읽고 월별 실적을 분석해서", color="#1d4ed8") + "\n" +
        body(464, " 임원 보고용 PPT를 자동으로 만들어줘'", color="#1d4ed8") + "\n" +
        divider(504) + "\n" +
        label(540, "오늘의 핵심") + "\n" +
        body(572, "트리거 키워드  /  문서 라우팅  /  headless 자동화  /  PPT 생성") + "\n" +
        footer("CLAUDE.md가 AI 에이전트의 두뇌 역할을 합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
