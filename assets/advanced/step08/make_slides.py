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
        title("Notion DB 기반 자동 에이전트") + "\n" +
        sub("Notion DB를 감지하고 작업 후 결과를 자동으로 보고합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "구조 소개  /  Notion DB 주기적 체크") + "\n" +
        body(354, "변경사항 감지 + 자동 작업  /  결과 Notion 보고  /  칸반보드 실습") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 구조 소개 + Notion DB 연동
    "02": lambda: wrap(
        badge() + "\n" +
        title("구조 소개  /  Notion DB 연동") + "\n" +
        sub("Notion DB가 에이전트의 작업 큐 역할을 합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "자동화 구조") + "\n" +
        body(308, "1  주기 체크  —  cron으로 Notion DB를 n분마다 폴링") + "\n" +
        body(354, "2  감지  —  새 항목 / 상태 변경 감지") + "\n" +
        body(400, "3  실행  —  claude -p 로 항목별 작업 자동 수행") + "\n" +
        body(446, "4  보고  —  결과를 Notion 항목에 자동 기록") + "\n" +
        divider(490) + "\n" +
        label(530, "Notion API 연동 준비") + "\n" +
        body(560, "Integration 생성  ->  DB에 Integration 연결  ->  API 토큰 환경변수 저장") + "\n" +
        footer_light("Notion DB가 작업 대기열(Queue) 역할을 합니다")
    ),
    # 03: 변경사항 감지 + 자동 작업 실행
    "03": lambda: wrap(
        badge() + "\n" +
        title("변경사항 감지  +  자동 작업 실행") + "\n" +
        divider(180) + "\n" +
        label(224, "새 항목 감지") + "\n" +
        body(262, "DB 조회: filter = {Status: '대기'}  ->  처리 안 된 항목 추출") + "\n" +
        body(302, "항목 ID + 내용을 claude -p 프롬프트에 삽입") + "\n" +
        divider(346) + "\n" +
        label(390, "자동 작업 예시") + "\n" +
        body(428, "블로그 포스팅 대기  ->  Claude가 초안 작성 후 결과 저장") + "\n" +
        body(468, "조사 요청  ->  웹 검색 + 요약 후 Notion 페이지에 기록") + "\n" +
        body(508, "번역 요청  ->  번역 완료 후 해당 항목에 결과 첨부") + "\n" +
        divider(548) + "\n" +
        body(578, "작업 중 상태를 '처리 중'으로 업데이트  ->  완료 시 '완료'로 변경") + "\n"
    ),
    # 04: 결과 Notion 보고
    "04": lambda: wrap(
        badge() + "\n" +
        title("결과  Notion 보고") + "\n" +
        sub("작업 결과를 자동으로 Notion 항목에 기록합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Python 보고 흐름") + "\n" +
        body(308, "result = run_claude(task_content)   # claude -p 실행", mono=True, size=17, color="#374151") + "\n" +
        body(344, "notion.pages.update(page_id, {", mono=True, size=17, color="#374151") + "\n" +
        body(380, "    'Status': {'select': {'name': '완료'}},", mono=True, size=17, color="#374151") + "\n" +
        body(416, "    'Result': {'rich_text': [{'text': {'content': result}}]}", mono=True, size=17, color="#374151") + "\n" +
        body(452, "})", mono=True, size=17, color="#374151") + "\n" +
        divider(492) + "\n" +
        label(532, "Discord 알림 연동") + "\n" +
        body(562, "작업 완료 후 Discord Webhook으로 담당자에게 자동 알림 전송") + "\n" +
        footer_light("Notion이 작업 이력과 결과의 단일 저장소가 됩니다")
    ),
    # 05: 칸반보드 실습 + 정리
    "05": lambda: wrap(
        badge() + "\n" +
        title("칸반보드 실습  /  심화 과정 정리") + "\n" +
        divider(180) + "\n" +
        label(224, "실습: Notion 칸반보드 자동화") + "\n" +
        body(262, "Notion에 칸반보드 DB 생성 (대기 / 처리 중 / 완료 컬럼)") + "\n" +
        body(302, "'대기' 카드를 추가  ->  에이전트가 감지  ->  작업 수행  ->  '완료'로 이동") + "\n" +
        divider(346) + "\n" +
        label(390, "실습 프롬프트") + "\n" +
        body(428, "'Notion 칸반보드 DB를 주기적으로 체크해서", color="#1d4ed8") + "\n" +
        body(464, " 대기 상태 항목을 자동 처리하고 결과를 Notion에 기록하는", color="#1d4ed8") + "\n" +
        body(500, " 에이전트 스크립트를 만들어줘'", color="#1d4ed8") + "\n" +
        divider(536) + "\n" +
        body(566, "심화 8강  —  CLAUDE.md / 리서치 / 블로그 / Notion 자동화 완성") + "\n" +
        footer("Notion DB 하나로 팀 전체의 에이전트 작업을 관리합니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
