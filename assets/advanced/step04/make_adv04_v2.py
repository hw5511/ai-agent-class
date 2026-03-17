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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>'
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


def prompt_box(y, text, size=18):
    return (
        f'  <rect x="60" y="{y}" width="1160" height="52" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="640" y="{y + 31}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="{size}" font-weight="600" fill="#2563eb">{esc(text)}</text>'
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


# --- 01.svg: 목차 ---
def slide01():
    return wrap(
        badge() + "\n" +
        t_title("외부 API로 AI 기능 확장하기") + "\n" +
        t_sub("API 키 발급부터 Skill 제작까지 — 네이버 · 타입캐스트 · 공개 API 연결") + "\n" +
        divider(212) + "\n" +
        t_label(264, "TODAY") + "\n" +
        t_body(308, "API 키 발급, 왜 두려워할 필요가 없나?") + "\n" +
        t_body(350, "네이버 오픈 API  —  소개 · 종류 · 등록 · Skill 제작") + "\n" +
        t_body(392, "타입캐스트 TTS API  —  소개 · 키 발급 · voice_id · Skill 제작") + "\n" +
        t_body(434, "public-apis-4Kr  —  원하는 API 직접 골라서 연결하기") + "\n" +
        footer_light("카드 등록 없이 발급 가능한 API만 사용합니다")
    )


# --- 02.svg: API 키 발급 두려워하지 말자 ---
def slide02():
    return wrap(
        badge() + "\n" +
        t_title("API 키 발급,  두려워하지 마세요", size=36) + "\n" +
        t_sub("MCP · CLI가 아직 적은 지금, API 키 발급 능력이 AI 활용의 핵심입니다") + "\n" +
        divider(212) + "\n" +
        t_label(252, "현실") + "\n" +
        f'  <rect x="60" y="266" width="540" height="110" rx="8" fill="#fef2f2"/>\n'
        f'  <text x="84" y="296" font-family="{FONT}" font-size="15" font-weight="700" fill="#dc2626">현재 상황</text>\n'
        f'  <text x="84" y="320" font-family="{FONT}" font-size="14" fill="#374151">MCP 서버 / CLI 툴이 출시된 서비스는 아직 소수</text>\n'
        f'  <text x="84" y="342" font-family="{FONT}" font-size="14" fill="#374151">대부분의 서비스는 여전히 API 키 방식만 제공</text>\n'
        f'  <text x="84" y="364" font-family="{FONT}" font-size="14" fill="#374151">→  API 키 없이는 연결 자체가 불가능</text>\n'
        f'  <rect x="640" y="266" width="580" height="110" rx="8" fill="#f0fdf4"/>\n'
        f'  <text x="664" y="296" font-family="{FONT}" font-size="15" font-weight="700" fill="#059669">API 키가 있으면</text>\n'
        f'  <text x="664" y="320" font-family="{FONT}" font-size="14" fill="#374151">Claude가 bash로 curl 직접 호출</text>\n'
        f'  <text x="664" y="342" font-family="{FONT}" font-size="14" fill="#374151">Python Skill로 래핑해서 자동화</text>\n'
        f'  <text x="664" y="364" font-family="{FONT}" font-size="14" fill="#374151">→  어떤 서비스든 에이전트로 연결 가능</text>\n' +
        divider(396) + "\n" +
        t_label(428, "API 키 발급이 어렵지 않은 이유") + "\n" +
        t_body(468, "① 회원가입 → ② 개발자 콘솔 접속 → ③ 키 생성 → ④ 복사  —  대부분 이 4단계") + "\n" +
        t_body(508, "Claude에게 '이 서비스 API 키 발급 방법 알려줘'라고 물으면 단계별로 안내") + "\n" +
        footer("API 키 발급 = AI를 진짜로 활용하기 위한 첫 번째 실전 스킬")
    )


# --- 03.svg: 네이버 오픈 API 소개 ---
def slide03():
    return wrap(
        badge() + "\n" +
        t_title("네이버 오픈 API") + "\n" +
        t_sub("국내 최대 플랫폼의 검색·번역·지도·TTS 기능을 무료로 활용합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "특징") + "\n" +
        t_body(308, "무료 쿼터 제공  /  카드 등록 불필요  /  한국어 데이터 강점") + "\n" +
        t_body(350, "클라이언트 ID + Secret  두 가지 키만으로 모든 API 사용 가능") + "\n" +
        divider(386) + "\n" +
        t_label(426, "이번 강의에서 사용할 API  —  데이터랩") + "\n" +
        f'  <rect x="60" y="440" width="540" height="90" rx="8" fill="#eff6ff"/>\n'
        f'  <text x="84" y="470" font-family="{FONT}" font-size="15" font-weight="700" fill="#1d4ed8">검색어 트렌드 API</text>\n'
        f'  <text x="84" y="494" font-family="{FONT}" font-size="14" fill="#374151">기간별 검색어 트렌드 비교 (최대 5개 키워드)</text>\n'
        f'  <text x="84" y="514" font-family="{FONT}" font-size="14" fill="#374151">시장 조사 · 마케팅 분석에 활용</text>\n'
        f'  <rect x="640" y="440" width="580" height="90" rx="8" fill="#eff6ff"/>\n'
        f'  <text x="664" y="470" font-family="{FONT}" font-size="15" font-weight="700" fill="#1d4ed8">쇼핑인사이트 API</text>\n'
        f'  <text x="664" y="494" font-family="{FONT}" font-size="14" fill="#374151">쇼핑 카테고리별 클릭 트렌드 분석</text>\n'
        f'  <text x="664" y="514" font-family="{FONT}" font-size="14" fill="#374151">제품·카테고리 수요 분석에 활용</text>\n' +
        footer_light("developers.naver.com  —  가입 후 애플리케이션 등록만 하면 즉시 사용 가능")
    )


# --- 04.svg: 네이버 오픈 API 종류 ---
def slide04():
    return wrap(
        badge() + "\n" +
        t_title("네이버 오픈 API 종류", size=38) + "\n" +
        t_sub("7개 카테고리, 30개 이상의 API를 무료로 제공합니다") + "\n" +
        divider(212) + "\n" +
        # 좌측 컬럼
        f'  <rect x="60" y="228" width="340" height="44" rx="6" fill="#eff6ff"/>\n'
        f'  <text x="80" y="255" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">인증</text>\n'
        f'  <text x="160" y="255" font-family="{FONT}" font-size="13" fill="#374151">네이버 로그인 / 회원 정보 조회</text>\n'
        f'  <rect x="60" y="280" width="340" height="58" rx="6" fill="#f8fafc"/>\n'
        f'  <text x="80" y="303" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">AI / 번역</text>\n'
        f'  <text x="80" y="323" font-family="{FONT}" font-size="13" fill="#6b7280">Papago 번역 / Clova STT / Clova TTS</text>\n'
        f'  <text x="80" y="338" font-family="{FONT}" font-size="12" fill="#9ca3af">Clova Face Recognition (얼굴 인식)</text>\n'
        f'  <rect x="60" y="346" width="340" height="44" rx="6" fill="#f8fafc"/>\n'
        f'  <text x="80" y="373" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">지도 / 위치</text>\n'
        f'  <text x="80" y="390" font-family="{FONT}" font-size="13" fill="#6b7280">지도 API / 지오코딩 (주소↔좌표 변환)</text>\n' +
        # 중앙 컬럼
        f'  <rect x="420" y="228" width="380" height="162" rx="6" fill="#f8fafc"/>\n'
        f'  <text x="440" y="255" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">검색  (12종)</text>\n'
        f'  <text x="440" y="277" font-family="{FONT}" font-size="13" fill="#6b7280">블로그 · 뉴스 · 책 · 백과사전 · 영화</text>\n'
        f'  <text x="440" y="299" font-family="{FONT}" font-size="13" fill="#6b7280">카페글 · 지식iN · 지역 · 웹문서</text>\n'
        f'  <text x="440" y="321" font-family="{FONT}" font-size="13" fill="#6b7280">이미지 · 쇼핑 · 전문자료</text>\n'
        f'  <text x="440" y="350" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">콘텐츠 작성</text>\n'
        f'  <text x="440" y="372" font-family="{FONT}" font-size="13" fill="#6b7280">블로그 글쓰기 / 카페 게시판 / 캘린더 일정</text>\n' +
        # 우측 컬럼
        f'  <rect x="820" y="228" width="400" height="44" rx="6" fill="#f8fafc"/>\n'
        f'  <text x="840" y="255" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">유틸리티</text>\n'
        f'  <text x="840" y="272" font-family="{FONT}" font-size="13" fill="#6b7280">단축 URL (me2.do) / 캡차 / 공유하기</text>\n'
        f'  <rect x="820" y="280" width="400" height="110" rx="6" fill="#eff6ff"/>\n'
        f'  <text x="840" y="307" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">데이터랩  (이번 실습)</text>\n'
        f'  <text x="840" y="329" font-family="{FONT}" font-size="13" fill="#374151">통합 검색어 트렌드 비교</text>\n'
        f'  <text x="840" y="351" font-family="{FONT}" font-size="13" fill="#374151">쇼핑인사이트 카테고리 트렌드</text>\n'
        f'  <text x="840" y="373" font-family="{FONT}" font-size="13" fill="#374151">POST 방식 / JSON 응답</text>\n' +
        divider(410) + "\n" +
        t_body(448, "비로그인 방식 (Client ID + Secret만 필요): 검색 · 데이터랩 · 번역 · 단축URL") + "\n" +
        t_body(486, "로그인 방식 (OAuth 토큰 필요): 블로그 글쓰기 · 카페 · 캘린더 · 회원 정보") + "\n" +
        footer_light("이번 강의는 비로그인 방식만 사용 — 키 2개로 바로 시작")
    )


# --- 05.svg: 애플리케이션 등록 1단계 ---
def slide05():
    return wrap(
        badge() + "\n" +
        t_title("네이버 API 앱 등록  1단계", size=36) + "\n" +
        t_sub("개발자 센터에서 애플리케이션을 등록하고 사용할 API를 선택합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "아래 링크로 접속 → 로그인 → 애플리케이션 등록 버튼 클릭") + "\n" +
        step(358, "2", "애플리케이션 이름 입력 (예: naver-datalab-skill)") + "\n" +
        step(408, "3", "사용 API 선택: 데이터랩(검색어트렌드)  +  데이터랩(쇼핑인사이트) 체크") + "\n" +
        divider(450) + "\n" +
        f'  <rect x="60" y="464" width="1160" height="44" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="84" y="491" font-family="{FONT}" font-size="15" fill="#059669">developers.naver.com/apps/#/list  —  네이버 개발자 센터 애플리케이션 목록</text>\n' +
        footer_light("네이버 아이디로 로그인하면 바로 애플리케이션 등록 가능합니다")
    )


# --- 06.svg: 애플리케이션 등록 2단계 ---
def slide06():
    return wrap(
        badge() + "\n" +
        t_title("네이버 API 앱 등록  2단계", size=36) + "\n" +
        t_sub("환경 설정 후 클라이언트 ID와 Secret을 복사합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "환경 추가: Web 선택 → URL 입력: http://localhost:3000") + "\n" +
        step(358, "2", "등록 완료 → 클라이언트 ID 복사") + "\n" +
        step(408, "3", "클라이언트 Secret 복사 (복사 버튼 클릭)") + "\n" +
        divider(450) + "\n" +
        t_label(480, "복사한 키 보관 방법") + "\n" +
        f'  <rect x="60" y="494" width="1160" height="52" rx="8" fill="#0f172a"/>\n'
        f'  <text x="84" y="516" font-family="{MONO}" font-size="15" fill="#a5f3fc">NAVER_CLIENT_ID=발급받은_클라이언트_ID</text>\n'
        f'  <text x="84" y="538" font-family="{MONO}" font-size="15" fill="#a5f3fc">NAVER_CLIENT_SECRET=발급받은_시크릿</text>\n' +
        footer_light("키는 .env 파일 또는 Claude에게 직접 붙여넣어서 Skill 제작 시 활용")
    )


# --- 07.svg: Claude에게 데이터랩 Skill 개발 요청 ---
def slide07():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("Claude에게 데이터랩 Skill 개발 요청", size=32) + "\n" +
        t_sub("API 문서를 읽히고 Client ID와 Secret을 주면 Claude가 Skill을 자동 제작합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "아래 문서 링크 2개를 Claude에게 curl로 읽도록 요청") + "\n" +
        step(358, "2", "발급받은 Client ID와 Secret을 Claude에게 제공") + "\n" +
        step(408, "3", '"CLI 스크립트 형태로 Skill 만들어줘" 요청 → 실행 테스트') + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"아래 네이버 데이터랩 API 문서를 curl로 읽고, ID/Secret으로 CLI Skill 만들어줘"', size=16) + "\n" +
        f'  <rect x="60" y="560" width="1160" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="84" y="585" font-family="{MONO}" font-size="12" fill="#6b7280">검색어트렌드: developers.naver.com/docs/serviceapi/datalab/search/search.md</text>\n'
    )


# --- 08.svg: 타입캐스트 소개 ---
def slide08():
    return wrap(
        badge() + "\n" +
        t_title("타입캐스트  —  AI 음성 합성 API") + "\n" +
        t_sub("다양한 AI 캐릭터 목소리로 텍스트를 음성으로 변환합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "타입캐스트란?") + "\n" +
        f'  <rect x="60" y="278" width="680" height="130" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="84" y="308" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">무엇인가</text>\n'
        f'  <text x="84" y="332" font-family="{FONT}" font-size="14" fill="#6b7280">AI 성우 플랫폼 — 100개 이상의 캐릭터 목소리 보유</text>\n'
        f'  <text x="84" y="354" font-family="{FONT}" font-size="14" fill="#6b7280">한국어 특화 · 감정 표현 · 속도/톤 조절 가능</text>\n'
        f'  <text x="84" y="376" font-family="{FONT}" font-size="14" fill="#6b7280">유튜브, 광고, 교육 콘텐츠 제작에 주로 활용</text>\n'
        f'  <rect x="760" y="278" width="460" height="130" rx="8" fill="#f0fdf4"/>\n'
        f'  <text x="784" y="308" font-family="{FONT}" font-size="15" font-weight="700" fill="#059669">API 활용 시나리오</text>\n'
        f'  <text x="784" y="332" font-family="{FONT}" font-size="14" fill="#374151">뉴스 요약 텍스트 → AI 음성 파일 자동 생성</text>\n'
        f'  <text x="784" y="354" font-family="{FONT}" font-size="14" fill="#374151">블로그 글 → MP3 오디오 변환</text>\n'
        f'  <text x="784" y="376" font-family="{FONT}" font-size="14" fill="#374151">카드뉴스 내레이션 자동 생성</text>\n' +
        divider(428) + "\n" +
        t_label(460, "API 방식") + "\n" +
        t_body(500, "REST API  /  voice_id + text → MP3 파일 반환  /  무료 쿼터 제공") + "\n" +
        footer_light("typecast.ai  —  구글 계정으로 바로 가입 · API 키 즉시 발급 가능")
    )


# --- 09.svg: 타입캐스트 API 발급 ---
def slide09():
    return wrap(
        badge() + "\n" +
        t_title("타입캐스트 API 키 발급", size=38) + "\n" +
        t_sub("개발자 페이지에서 API 키를 발급받습니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "아래 링크 접속 → 구글 계정으로 회원가입 / 로그인") + "\n" +
        step(358, "2", "API 키 탭으로 이동 → 키 생성 버튼 클릭") + "\n" +
        step(408, "3", "생성된 API 키 복사 (나중에 Claude에게 제공할 예정)") + "\n" +
        divider(450) + "\n" +
        f'  <rect x="60" y="464" width="1160" height="44" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="84" y="491" font-family="{FONT}" font-size="15" fill="#059669">typecast.ai/developers/api  —  타입캐스트 개발자 API 페이지</text>\n' +
        footer_light("무료 플랜으로 월 일정 글자 수까지 무료 사용 가능")
    )


# --- 10.svg: 타입캐스트 캐릭터 선택 ---
def slide10():
    return wrap(
        badge() + "\n" +
        t_title("타입캐스트 캐릭터 선택  —  voice_id 복사", size=32) + "\n" +
        t_sub("원하는 AI 캐릭터의 voice_id를 복사해야 API 호출 시 목소리를 지정할 수 있습니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "타입캐스트 캐릭터 목록 페이지 접속") + "\n" +
        step(358, "2", "원하는 캐릭터 클릭 → 캐릭터 상세 페이지에서 미리 듣기 확인") + "\n" +
        step(408, "3", "URL 또는 개발자 도구에서 voice_id 값 복사") + "\n" +
        divider(450) + "\n" +
        t_label(480, "voice_id 확인 방법") + "\n" +
        f'  <rect x="60" y="494" width="1160" height="52" rx="8" fill="#0f172a"/>\n'
        f'  <text x="84" y="516" font-family="{MONO}" font-size="14" fill="#a5f3fc">캐릭터 URL:  typecast.ai/voices/[voice_id]</text>\n'
        f'  <text x="84" y="538" font-family="{MONO}" font-size="14" fill="#6b7280">예시:  5f3b2e1d0a7c4f8b9e2d1a3c  (24자리 hex 형태)</text>\n' +
        footer_light("voice_id를 메모해두세요 — 다음 슬라이드에서 Claude에게 제공합니다")
    )


# --- 11.svg: Claude에게 타입캐스트 Skill 제작 요청 ---
def slide11():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("Claude에게 타입캐스트 Skill 제작 요청", size=32) + "\n" +
        t_sub("API 문서를 학습시키고 API 키 + voice_id를 주면 Skill이 자동 완성됩니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "아래 링크로 타입캐스트 API 문서를 Claude에게 읽도록 요청") + "\n" +
        step(358, "2", "발급받은 API 키와 선택한 voice_id를 Claude에게 제공") + "\n" +
        step(408, "3", '"CLI 스크립트 형태로 TTS Skill 만들어줘" 요청 → 실행 테스트') + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"typecast.ai/docs/overview 읽고, API키와 voice_id로 TTS CLI Skill 만들어줘"', size=16) + "\n" +
        f'  <rect x="60" y="560" width="1160" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="84" y="585" font-family="{MONO}" font-size="13" fill="#6b7280">API 문서: typecast.ai/docs/overview</text>\n'
    )


# --- 12.svg: public-apis-4Kr 소개 + 직접 연결 실습 ---
def slide12():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("public-apis-4Kr  —  직접 연결 실습", size=34) + "\n" +
        t_sub("한국에서 쓸 수 있는 공개 API 목록 — 원하는 것 골라서 바로 연결해보세요") + "\n" +
        divider(212) + "\n" +
        t_label(252, "사이트 소개") + "\n" +
        f'  <rect x="60" y="266" width="1160" height="70" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="84" y="294" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">github.com/yybmion/public-apis-4Kr</text>\n'
        f'  <text x="84" y="318" font-family="{FONT}" font-size="14" fill="#6b7280">카테고리별 공개 API 정리 (국내 서비스 중심) — 인증 방식·무료 여부·설명 포함</text>\n' +
        divider(354) + "\n" +
        t_label(386, "실습 STEPS") + "\n" +
        step(426, "1", "위 GitHub 링크 접속 → 목록에서 써보고 싶은 API 하나 선택") + "\n" +
        step(474, "2", '"[선택한 API] 키 발급 방법 알려줘" → API 키 발급') + "\n" +
        step(522, "3", '"[API URL] 읽고 CLI Skill 만들어줘" → Claude가 Skill 자동 제작') + "\n" +
        footer("나만의 API Skill을 직접 만들어보세요")
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
