import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def wrap(inner):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        + inner +
        '\n</svg>\n'
    )


def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 02</text>'
    )


def practice_badge():
    return (
        f'  <rect x="1100" y="44" width="120" height="24" rx="12" fill="#059669"/>\n'
        f'  <text x="1160" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">PRACTICE</text>'
    )


def divider(y):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'


def t_title(text, y=130, size=40):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="700" fill="#171717">{esc(text)}</text>'
    )


def t_sub(text, y=178):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="19" fill="#6b7280">{esc(text)}</text>'


def t_label(y, text):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="14" font-weight="600" '
        f'fill="#9ca3af" letter-spacing="0.08em">{esc(text)}</text>'
    )


def t_body(y, text, mono=False, size=19, color="#374151", x=60):
    ff = MONO if mono else FONT
    return f'  <text x="{x}" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{esc(text)}</text>'


def prompt_box(y, text):
    return (
        f'  <rect x="60" y="{y}" width="1160" height="52" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="640" y="{y + 31}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="18" font-weight="600" fill="#2563eb">{esc(text)}</text>'
    )


def step(y, num, text, size=18):
    return (
        f'  <circle cx="84" cy="{y - 6}" r="14" fill="#eff6ff"/>\n'
        f'  <text x="84" y="{y}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="13" font-weight="700" fill="#2563eb">{num}</text>\n'
        f'  <text x="110" y="{y}" font-family="{FONT}" font-size="{size}" fill="#374151">{esc(text)}</text>'
    )


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


def footer_light_green(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#ecfdf5"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#059669">{esc(text)}</text>'
    )


# --- 01.svg: 웹 브라우저 제어 라이브러리 종류 & AI 연동 원리 ---
def slide01():
    return wrap(
        badge() + "\n" +
        t_title("웹 브라우저 자동화 원리", size=38) + "\n" +
        t_sub("Playwright · Puppeteer · Selenium 비교 + AI가 브라우저와 소통하는 방식") + "\n" +
        divider(212) + "\n" +
        t_label(252, "라이브러리 비교") + "\n" +
        # 3열 카드
        f'  <rect x="60" y="266" width="360" height="130" rx="8" fill="#eff6ff"/>\n'
        f'  <text x="240" y="296" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#1d4ed8">Playwright</text>\n'
        f'  <text x="240" y="320" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">Microsoft · Python/JS</text>\n'
        f'  <text x="240" y="342" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">자동 대기 내장 · MCP 공식 지원</text>\n'
        f'  <text x="240" y="364" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#059669">★ 이 강의에서 사용</text>\n'
        f'  <rect x="460" y="266" width="360" height="130" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="640" y="296" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">Puppeteer</text>\n'
        f'  <text x="640" y="320" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">Google · Node.js 전용</text>\n'
        f'  <text x="640" y="342" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">Chrome/Edge 최적화</text>\n'
        f'  <text x="640" y="364" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#9ca3af">JS 환경에서 주로 사용</text>\n'
        f'  <rect x="860" y="266" width="360" height="130" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="1040" y="296" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">Selenium</text>\n'
        f'  <text x="1040" y="320" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">가장 오래됨 · 다양한 언어</text>\n'
        f'  <text x="1040" y="342" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">명시적 대기(wait) 필요</text>\n'
        f'  <text x="1040" y="364" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#9ca3af">레거시 프로젝트에 주로 남아있음</text>\n' +
        divider(416) + "\n" +
        t_label(448, "AI 연동 원리 — MCP 방식") + "\n" +
        # 흐름도
        f'  <rect x="60" y="462" width="200" height="52" rx="8" fill="#dbeafe"/>\n'
        f'  <text x="160" y="492" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">Claude (AI)</text>\n'
        f'  <text x="275" y="492" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>\n'
        f'  <rect x="290" y="462" width="240" height="52" rx="8" fill="#dbeafe"/>\n'
        f'  <text x="410" y="492" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">MCP Tool 호출</text>\n'
        f'  <text x="545" y="492" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>\n'
        f'  <rect x="560" y="462" width="240" height="52" rx="8" fill="#dbeafe"/>\n'
        f'  <text x="680" y="492" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">Playwright 서버</text>\n'
        f'  <text x="815" y="492" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>\n'
        f'  <rect x="830" y="462" width="200" height="52" rx="8" fill="#dbeafe"/>\n'
        f'  <text x="930" y="492" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">CDP (브라우저)</text>\n'
        f'  <text x="1045" y="492" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>\n'
        f'  <rect x="1060" y="462" width="160" height="52" rx="8" fill="#bbf7d0"/>\n'
        f'  <text x="1140" y="492" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#065f46">화면 조작</text>\n' +
        footer_light("AI는 브라우저를 직접 보지 않는다 — DOM 스냅샷을 텍스트로 받아 판단한다")
    )


# --- 02.svg: 유지 (웹 자동화 원리 + Playwright vs Selenium) ---
def slide02():
    return wrap(
        badge() + "\n" +
        t_title("웹 자동화 원리") + "\n" +
        t_sub("코드가 브라우저를 직접 조종합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "원리") + "\n" +
        t_body(308, "코드  ->  브라우저 제어  ->  클릭 · 입력 · 데이터 추출 자동 수행") + "\n" +
        divider(354) + "\n" +
        t_label(394, "Playwright vs Selenium") + "\n" +
        t_body(434, "Playwright   빠름 · 자동 대기 내장 · 설치 간단  (권장)") + "\n" +
        t_body(474, "Selenium      오래된 생태계 · 레거시 지원 · 명시적 대기 필요") + "\n" +
        footer_light("새로운 프로젝트는 Playwright 권장")
    )


# --- 03.svg: Playwright MCP 설치 ---
def slide03():
    return wrap(
        badge() + "\n" +
        t_title("Playwright MCP 설치") + "\n" +
        t_sub("명령어 하나로 Claude Code에 Playwright MCP를 연결합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "설치 명령어 — 터미널에서 실행") + "\n" +
        f'  <rect x="60" y="278" width="1160" height="60" rx="8" fill="#0f172a"/>\n'
        f'  <text x="84" y="315" font-family="{MONO}" font-size="20" fill="#a5f3fc">claude mcp add playwright npx @playwright/mcp@latest</text>\n' +
        divider(364) + "\n" +
        t_label(400, "설치 후 확인") + "\n" +
        step(444, "1", "Claude Code를 재시작 (또는 /mcp 명령으로 상태 확인)") + "\n" +
        step(494, "2", '"playwright MCP 설치됐어?" 라고 물어보기') + "\n" +
        step(544, "3", 'browser_navigate, browser_snapshot 등 툴 목록 확인') + "\n" +
        footer_light("MCP = AI가 브라우저 조작 도구를 직접 사용할 수 있게 해주는 연결 규약")
    )


# --- 04.svg: 실습 1 — books.toscrape.com ---
def slide04():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 1 — 스크래핑 연습 사이트 탐색", size=34) + "\n" +
        t_sub("books.toscrape.com — Playwright 학습 전용 무료 사이트") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"books.toscrape.com 접속해서 첫 페이지 스크린샷 찍어줘" 요청') + "\n" +
        step(358, "2", '"책 목록에서 제목과 가격 5개 수집해줘" 요청') + "\n" +
        step(408, "3", "수집된 제목·가격·재고 상태 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"books.toscrape.com 접속해서 책 5권 제목과 가격 수집해줘"') + "\n" +
        footer_light_green("수집된 책 데이터를 화면에 출력해주세요 — 법적 제한 없이 자유롭게 실습 가능")
    )


# --- 05.svg: 실습 2-1 — Wikipedia 접속 · 요소 분석 ---
def slide05():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 2-1 — Wikipedia 접속 · 요소 분석", size=34) + "\n" +
        t_sub("검색창 위치를 찾고 페이지 DOM 구조를 파악합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"ko.wikipedia.org 접속해서 스냅샷 찍어줘" 요청') + "\n" +
        step(358, "2", '"검색창(input) 요소를 찾아서 셀렉터 알려줘" 요청') + "\n" +
        step(408, "3", "스냅샷에서 검색창 셀렉터 확인 (예: #searchInput)") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"ko.wikipedia.org 접속하고 검색창 셀렉터 찾아줘"') + "\n" +
        footer_light_green("browser_snapshot이 스크린샷보다 요소 분석에 유리합니다")
    )


# --- 06.svg: 실습 2-2 — 입력란 찾기 · 검색 · 결과 파악 ---
def slide06():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 2-2 — 검색 입력 · 결과 파악", size=34) + "\n" +
        t_sub("검색창에 키워드를 입력하고 결과 페이지 내용을 읽습니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"검색창에 \'인공지능\' 입력하고 검색해줘" 요청') + "\n" +
        step(358, "2", '"결과 페이지 제목과 첫 문단 읽어줘" 요청') + "\n" +
        step(408, "3", "AI가 읽어온 내용 확인 (레코딩 = 단계별 조작 관찰)") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"Wikipedia 검색창에 \'인공지능\' 입력 후 결과 첫 문단 가져와줘"') + "\n" +
        footer_light_green("레코딩 = AI가 수행하는 단계별 조작을 순서대로 관찰하는 과정")
    )


# --- 07.svg: 실습 2-3 — 스크립트화 · 헤드리스 CLI ---
def slide07():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 2-3 — 스크립트화 · 헤드리스 CLI", size=34) + "\n" +
        t_sub("레코딩한 동작을 Python 스크립트로 변환해 CLI에서 실행합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"방금 한 Wikipedia 검색 과정을 Python 스크립트로 만들어줘" 요청') + "\n" +
        step(358, "2", '"headless=True로 실행해서 결과를 터미널에 출력해줘" 요청') + "\n" +
        step(408, "3", "브라우저 창 없이 터미널에 검색 결과가 출력되는 것 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"Wikipedia 키워드 검색 → 첫 문단 출력하는 headless Python 스크립트 만들어줘"') + "\n" +
        footer_light_green("headless=True : 화면 없이 백그라운드 실행 → 서버·자동화 환경에 적합")
    )


# --- 08.svg: 실습 3-0 — 제공 HTML 소개 ---
def slide08():
    return wrap(
        badge() + "\n" +
        t_title("실습 3 — 가상 커뮤니티 사이트", size=36) + "\n" +
        t_sub("로컬스토리지 기반 커뮤니티 사이트로 AI 전체 탐색 실습을 합니다") + "\n" +
        divider(212) + "\n" +
        t_label(252, "사이트 기능") + "\n" +
        f'  <rect x="60" y="266" width="540" height="120" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="84" y="296" font-family="{FONT}" font-size="15" font-weight="600" fill="#374151">인증</text>\n'
        f'  <text x="84" y="318" font-family="{FONT}" font-size="14" fill="#6b7280">회원가입  /  로그인  /  로그아웃</text>\n'
        f'  <text x="84" y="340" font-family="{FONT}" font-size="15" font-weight="600" fill="#374151">콘텐츠</text>\n'
        f'  <text x="84" y="362" font-family="{FONT}" font-size="14" fill="#6b7280">게시판 목록  /  게시물 상세  /  글쓰기</text>\n'
        f'  <text x="84" y="384" font-family="{FONT}" font-size="14" fill="#6b7280">댓글 입력 + 스크롤  /  마이페이지</text>\n'
        f'  <rect x="640" y="266" width="580" height="120" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="664" y="296" font-family="{FONT}" font-size="15" font-weight="600" fill="#374151">AI 탐색 시나리오</text>\n'
        f'  <text x="664" y="318" font-family="{FONT}" font-size="14" fill="#6b7280">회원가입 → 로그인 → 게시판 탐색</text>\n'
        f'  <text x="664" y="340" font-family="{FONT}" font-size="14" fill="#6b7280">글쓰기 → 댓글 작성 → 마이페이지</text>\n'
        f'  <text x="664" y="362" font-family="{FONT}" font-size="14" fill="#6b7280">로그아웃 → 스크린샷 → PPT 생성</text>\n' +
        divider(406) + "\n" +
        t_label(438, "시작 방법") + "\n" +
        step(482, "1", "아래에서 HTML 파일 다운로드") + "\n" +
        step(532, "2", "파일 더블클릭 → 브라우저에서 file:// 로 열기 확인") + "\n" +
        footer_light("서버 불필요 — Chrome/Edge에서 file:// 방식으로 로컬 실행")
    )


# --- 09.svg: 실습 3-1 — 회원가입 ---
def slide09():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 3-1 — 회원가입", size=38) + "\n" +
        t_sub("AI가 회원가입 폼을 찾아서 직접 작성합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "HTML 파일을 브라우저로 열고 로컬 경로(file://...) 확인") + "\n" +
        step(358, "2", '"회원가입 버튼 찾아서 회원가입해줘 (아이디: testuser, 비번: 1234)" 요청') + "\n" +
        step(408, "3", "가입 완료 메시지 또는 로그인 화면으로 이동 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"file:///경로/community.html 접속해서 회원가입 버튼 찾아 회원가입해줘"') + "\n" +
        footer_light_green("로컬스토리지에 저장 — 새로고침 후에도 계정 정보 유지")
    )


# --- 10.svg: 실습 3-2 — 로그인 · 게시판 탐색 ---
def slide10():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 3-2 — 로그인 · 게시판 탐색", size=34) + "\n" +
        t_sub("로그인 후 게시판으로 이동해 최신 글 목록을 파악합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"로그인 폼 찾아서 방금 만든 계정으로 로그인해줘" 요청') + "\n" +
        step(358, "2", '"로그인 후 게시판으로 이동해서 최신 글 목록 보여줘" 요청') + "\n" +
        step(408, "3", "게시판 구조와 글 목록 확인 (제목·작성자·날짜)") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"로그인하고 게시판으로 이동해서 최신 글 5개 제목 알려줘"') + "\n" +
        footer_light_green("마이페이지, 네비게이션 등 모든 링크를 AI가 자동으로 파악합니다")
    )


# --- 11.svg: 실습 3-3 — 글쓰기 · 댓글 · 스크롤 ---
def slide11():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 3-3 — 글쓰기 · 댓글 · 스크롤", size=34) + "\n" +
        t_sub("게시물 작성, 댓글 입력, 스크롤 탐색을 단계별로 진행합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"글쓰기 버튼 찾아서 테스트 게시물 작성해줘" 요청') + "\n" +
        step(358, "2", '"게시물 상세 페이지에서 댓글 입력란 찾아 댓글 달아줘" 요청') + "\n" +
        step(408, "3", '"댓글 영역 스크롤해서 전체 댓글 확인해줘" 요청') + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"글쓰기 → 댓글 달기 → 댓글 영역 스크롤해서 전체 확인해줘"') + "\n" +
        footer_light_green("스크롤 탐색: keyboard.press('End') 또는 mouse.wheel() 활용")
    )


# --- 12.svg: 실습 3-4 — 전체 스크린샷 · PPT 생성 ---
def slide12():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 3-4 — 전체 스크린샷 · PPT 생성", size=32) + "\n" +
        t_sub("모든 기능 페이지를 스크린샷하고 유저 플로우 PPT를 자동 생성합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"회원가입·로그인·게시판·게시물·댓글·마이페이지 각 페이지 스크린샷 찍어줘"') + "\n" +
        step(358, "2", '"스크린샷으로 유저 플로우 PPT 만들어줘" 요청 (python-pptx 활용)') + "\n" +
        step(408, "3", "생성된 PPT 확인 (페이지별 슬라이드 + 설명 자동 구성)") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"모든 페이지 스크린샷 찍고 유저 플로우 PPT 만들어줘"') + "\n" +
        footer_light_green("ADV 01 python-pptx Skill 재사용 — 스크린샷 + 설명 슬라이드 자동 구성")
    )


# --- 파일 생성 ---
slides = {
    "01": slide01,
    "02": slide02,
    "03": slide03,
    "04": slide04,
    "05": slide05,
    "06": slide06,
    "07": slide07,
    "08": slide08,
    "09": slide09,
    "10": slide10,
    "11": slide11,
    "12": slide12,
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {num}.svg")

print(f"\nDone. {len(slides)} slides generated.")
