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


def body(y, text, mono=False, size=15, color="#374151", x=60):
    ff = MONO if mono else FONT
    return f'  <text x="{x}" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{esc(text)}</text>'


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
    "하네스_엔지니어링이란": lambda: wrap(
        badge() + "\n" +
        title("하네스 엔지니어링이란?") + "\n" +
        sub("AI를 단순 도우미에서 자율 실행 시스템으로 만드는 설계 방식입니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="330" height="300" rx="10" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="225" y="270" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#dc2626">기존 방식</text>\n'
        + body(310, "매번 Claude에게", x=80) + "\n" +
        body(336, "직접 지시해야 함", x=80) + "\n" +
        body(380, '"Claude야, 이거 해줘"', x=80, color="#9ca3af") + "\n" +
        body(406, '"결과 정리해줘"', x=80, color="#9ca3af") + "\n" +
        body(432, '"이번엔 저장해줘"', x=80, color="#9ca3af") + "\n" +
        body(490, "사람이 항상 개입해야 함", x=80, color="#dc2626") + "\n" +
        f'  <rect x="420" y="232" width="330" height="300" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="585" y="270" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#16a34a">하네스 방식</text>\n'
        + body(310, "지시 구조를 한 번 설계", x=440) + "\n" +
        body(336, "Claude가 스스로 감지·실행", x=440) + "\n" +
        body(380, "Notion DB에 작업 등록", x=440, color="#9ca3af") + "\n" +
        body(406, "Claude가 자동으로 읽음", x=440, color="#9ca3af") + "\n" +
        body(432, "결과를 다시 DB에 저장", x=440, color="#9ca3af") + "\n" +
        body(490, "반복 실행이 자동으로 됨", x=440, color="#16a34a") + "\n" +
        f'  <rect x="780" y="232" width="440" height="300" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="1000" y="270" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#1e40af">LOGIC 에이전트</text>\n'
        f'  <text x="1000" y="296" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#2563eb">Log to Logic</text>\n'
        + body(330, "기록이 쌓이면", x=800) + "\n" +
        body(356, "자동으로 작동하는 에이전트", x=800) + "\n" +
        body(402, "L — Log  (기록)", x=800, color="#6b7280", size=13) + "\n" +
        body(426, "O — Orchestrate  (조율)", x=800, color="#6b7280", size=13) + "\n" +
        body(450, "G — Generate  (생성)", x=800, color="#6b7280", size=13) + "\n" +
        body(474, "I — Iterate  (반복)", x=800, color="#6b7280", size=13) + "\n" +
        body(498, "C — Complete  (완료)", x=800, color="#6b7280", size=13) + "\n" +
        footer("Step 5~8: LOGIC 에이전트를 직접 만들어봅니다")
    ),

    "데이터베이스가_필요한_이유": lambda: wrap(
        badge() + "\n" +
        title("AI가 기억하려면 저장 공간이 필요합니다") + "\n" +
        sub("Claude는 대화가 끊기면 이전 내용을 기억하지 못합니다") + "\n" +
        divider(212) + "\n" +
        f'  <text x="60" y="254" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">문제</text>\n'
        f'  <rect x="60" y="268" width="520" height="110" rx="10" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="80" y="300" font-family="{FONT}" font-size="15" font-weight="700" fill="#dc2626">세션이 끊기면 기억이 초기화됩니다</text>\n'
        + body(330, "어제 분석한 내용을 오늘 다시 물어봐야 함", x=80) + "\n" +
        body(356, "어디까지 했는지 Claude가 모름", x=80, color="#9ca3af") + "\n" +
        f'  <text x="620" y="254" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">해결</text>\n'
        f'  <rect x="620" y="268" width="600" height="110" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="640" y="300" font-family="{FONT}" font-size="15" font-weight="700" fill="#16a34a">Notion DB = AI의 외부 기억 장치</text>\n'
        + body(330, "작업 지시·진행 상태·결과를 DB에 저장", x=640) + "\n" +
        body(356, "다음 실행 때 DB를 읽어서 이어서 작업 가능", x=640, color="#16a34a") + "\n" +
        divider(400) + "\n" +
        label(440, "작동 방식") + "\n" +
        f'  <rect x="60" y="454" width="240" height="72" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="180" y="486" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">지시 등록</text>\n'
        f'  <text x="180" y="508" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">Notion DB에 작업 입력</text>\n'
        f'  <text x="318" y="494" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="336" y="454" width="240" height="72" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="456" y="486" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">Claude 감지</text>\n'
        f'  <text x="456" y="508" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">DB를 읽어 할일 확인</text>\n'
        f'  <text x="594" y="494" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="612" y="454" width="240" height="72" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="732" y="486" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">작업 실행</text>\n'
        f'  <text x="732" y="508" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">자동으로 처리</text>\n'
        f'  <text x="870" y="494" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="888" y="454" width="332" height="72" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="1054" y="486" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">결과 저장</text>\n'
        f'  <text x="1054" y="508" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">Notion DB에 기록</text>\n' +
        footer("Notion DB가 있어야 AI가 혼자서 일하는 구조를 만들 수 있습니다")
    ),

    "Notion_MCP_vs_Notion_API": lambda: wrap(
        badge() + "\n" +
        title("Notion MCP  vs  Notion API") + "\n" +
        sub("두 가지 연결 방식의 차이를 이해합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="520" height="300" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="320" y="272" text-anchor="middle" font-family="{FONT}" font-size="18" font-weight="700" fill="#171717">Notion MCP</text>\n'
        f'  <text x="320" y="298" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">대화 중 직접 연결</text>\n'
        + body(336, "Claude Code에 MCP 서버로 등록", x=80) + "\n" +
        body(362, "대화하면서 페이지 읽기·쓰기 가능", x=80) + "\n" +
        body(388, "별도 코드 작성 불필요", x=80) + "\n" +
        f'  <text x="80" y="438" font-family="{FONT}" font-size="13" font-weight="600" fill="#dc2626">제한사항</text>\n'
        + body(464, "DB 필터 쿼리 지원이 제한적", x=80, color="#9ca3af") + "\n" +
        body(490, "데이터 삭제·일괄 수정 불가", x=80, color="#9ca3af") + "\n" +
        f'  <rect x="620" y="232" width="600" height="300" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="920" y="272" text-anchor="middle" font-family="{FONT}" font-size="18" font-weight="700" fill="#1e40af">Notion API</text>\n'
        f'  <text x="920" y="298" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#2563eb">자동화 스크립트로 연결</text>\n'
        + body(336, "Python 코드로 API 직접 호출", x=640) + "\n" +
        body(362, "DB 필터·정렬·페이지네이션 자유롭게 사용", x=640) + "\n" +
        body(388, "데이터 생성·수정·삭제 모두 가능", x=640) + "\n" +
        f'  <text x="640" y="438" font-family="{FONT}" font-size="13" font-weight="600" fill="#16a34a">이번 수업</text>\n'
        + body(464, "API 토큰 발급 -> notion-query 스킬 제작", x=640, color="#16a34a") + "\n" +
        body(490, "Claude가 스스로 스킬을 작성합니다", x=640, color="#16a34a") + "\n" +
        footer("이번 Step5는 Notion API 방식으로 자동화 스킬을 만듭니다")
    ),

    "Notion_API_토큰_발급": lambda: wrap(
        badge() + "\n" +
        title("Notion API 토큰 발급") + "\n" +
        sub("Integration을 만들어 API 키를 발급합니다") + "\n" +
        divider(212) + "\n" +
        label(256, "발급 순서") + "\n" +
        f'  <rect x="60" y="272" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="297" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">1</text>\n'
        + body(302, "notion.so/my-integrations 접속", x=120, size=17) + "\n" +
        f'  <rect x="60" y="330" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="355" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">2</text>\n'
        + body(360, '"+ New integration" 클릭', x=120, size=17) + "\n" +
        f'  <rect x="60" y="388" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="413" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">3</text>\n'
        + body(418, "이름 입력 (예: my-agent)  ->  Submit 클릭", x=120, size=17) + "\n" +
        f'  <rect x="60" y="446" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="471" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">4</text>\n'
        + body(476, "Internal Integration Token  ->  복사 (secret_...)", x=120, size=17, mono=True) + "\n" +
        divider(516) + "\n" +
        f'  <rect x="60" y="530" width="1160" height="24" rx="6" fill="#fef9c3"/>\n'
        f'  <text x="640" y="547" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#854d0e">발급된 토큰은 외부에 공개하지 마세요  --  Claude에게만 전달합니다</text>\n' +
        footer_light("notion.so/my-integrations 에서 바로 발급 가능합니다")
    ),

    "Integration_페이지_연결": lambda: wrap(
        badge() + "\n" +
        title("Integration을 페이지에 연결합니다") + "\n" +
        sub("API가 접근할 수 있도록 데이터베이스에 권한을 부여합니다") + "\n" +
        divider(212) + "\n" +
        label(256, "연결 순서") + "\n" +
        f'  <rect x="60" y="272" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="297" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">1</text>\n'
        + body(302, "Notion에서 연결할 데이터베이스 페이지 열기", x=120, size=17) + "\n" +
        f'  <rect x="60" y="330" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="355" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">2</text>\n'
        + body(360, "우상단  ...  메뉴 클릭", x=120, size=17) + "\n" +
        f'  <rect x="60" y="388" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="413" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">3</text>\n'
        + body(418, "Connections  ->  내 Integration 이름 선택", x=120, size=17) + "\n" +
        f'  <rect x="60" y="446" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="471" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">4</text>\n'
        + body(476, "Confirm 클릭  ->  연결 완료", x=120, size=17) + "\n" +
        divider(516) + "\n" +
        label(548, "DB ID 확인 방법") + "\n" +
        body(572, "URL 예시: notion.so/workspace/[DB_ID]?v=...  ->  DB_ID 부분 복사", x=60, size=14, color="#6b7280") + "\n" +
        footer("연결된 Integration만 해당 DB에 API로 접근할 수 있습니다")
    ),

    "Claude에게_API_키_전달_스킬_자동_생성": lambda: wrap(
        badge() + "\n" +
        title("Claude에게 API 키를 주면 스킬을 만들어줍니다", size=32) + "\n" +
        sub("이것이 하네스 엔지니어링의 핵심 장면입니다") + "\n" +
        divider(212) + "\n" +
        label(256, "프롬프트 예시") + "\n" +
        f'  <rect x="60" y="270" width="1160" height="100" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="304" font-family="{MONO}" font-size="14" fill="#1d4ed8">"내 Notion API 토큰은 secret_xxx 입니다. Tasks DB ID는 abc123 입니다.</text>\n'
        f'  <text x="80" y="328" font-family="{MONO}" font-size="14" fill="#1d4ed8"> 이 DB에서 Status가 할일인 항목을 조회하는 Python 스킬을 만들어줘"</text>\n'
        f'  <text x="80" y="352" font-family="{MONO}" font-size="13" fill="#9ca3af"> --dangerouslySkipPermissions 없이 실행, 파일은 skills/ 폴더에 저장</text>\n' +
        label(406, "Claude가 스스로 하는 일") + "\n" +
        f'  <rect x="60" y="420" width="330" height="100" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="225" y="458" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#16a34a">스킬 코드 작성</text>\n'
        f'  <text x="225" y="480" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">notion-query.py 자동 생성</text>\n'
        f'  <text x="225" y="502" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">API 호출 + 필터 로직 포함</text>\n'
        f'  <text x="408" y="474" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="426" y="420" width="330" height="100" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="591" y="458" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#16a34a">동작 확인</text>\n'
        f'  <text x="591" y="480" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">DB 조회 결과 출력</text>\n'
        f'  <text x="591" y="502" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">스킬 정상 동작 확인</text>\n'
        f'  <text x="774" y="474" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="792" y="420" width="448" height="100" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="1016" y="458" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">재사용 가능한 스킬 완성</text>\n'
        f'  <text x="1016" y="480" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">앞으로 Claude가 자동 호출</text>\n'
        f'  <text x="1016" y="502" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">CLAUDE.md에 스킬 경로 등록</text>\n' +
        footer("도구를 Claude가 직접 만든다  --  이것이 하네스 엔지니어링입니다")
    ),

    "템플릿_복사와_세팅": lambda: wrap(
        badge() + "\n" +
        title("Notion 템플릿 복사  +  세팅") + "\n" +
        sub("사용할 데이터베이스 구조를 템플릿에서 가져옵니다") + "\n" +
        divider(212) + "\n" +
        label(256, "진행 순서") + "\n" +
        f'  <rect x="60" y="272" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="297" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">1</text>\n'
        + body(302, "notion.com/templates 접속  ->  데이터 테이블이 있는 템플릿 선택", x=120, size=17) + "\n" +
        f'  <rect x="60" y="330" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="355" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">2</text>\n'
        + body(360, '"Duplicate" 클릭  ->  내 워크스페이스에 복사', x=120, size=17) + "\n" +
        f'  <rect x="60" y="388" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="413" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">3</text>\n'
        + body(418, "앞서 만든 Integration 연결 (Connections)", x=120, size=17) + "\n" +
        f'  <rect x="60" y="446" width="40" height="40" rx="20" fill="#2563eb"/>\n'
        f'  <text x="80" y="471" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#ffffff">4</text>\n'
        + body(476, "DB URL에서 ID 확인 후 복사해두기", x=120, size=17) + "\n" +
        divider(516) + "\n" +
        f'  <rect x="60" y="530" width="1160" height="24" rx="6" fill="#fef9c3"/>\n'
        f'  <text x="640" y="547" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#854d0e">템플릿 선택 기준: 데이터베이스(Database) 뷰가 있는 것으로  --  Simple한 것 권장</text>\n' +
        footer_light("템플릿 구조를 Claude가 자동으로 파악합니다")
    ),

    "Claude에게_구조_파악_지시": lambda: wrap(
        badge() + "\n" +
        title("Claude에게 구조 파악을 지시합니다") + "\n" +
        sub("DB 구조 분석부터 데이터 채우기까지 Claude가 수행합니다") + "\n" +
        divider(212) + "\n" +
        f'  <text x="60" y="254" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">1단계  --  구조 파악</text>\n'
        f'  <rect x="60" y="268" width="1160" height="76" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="300" font-family="{MONO}" font-size="14" fill="#1d4ed8">"이 Notion DB의 구조를 분석해서 어떤 속성(컬럼)이 있는지 목록으로 알려줘</text>\n'
        f'  <text x="80" y="326" font-family="{MONO}" font-size="14" fill="#1d4ed8"> DB ID: [복사해둔 ID]"</text>\n' +
        f'  <text x="60" y="380" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">Claude 응답 예시</text>\n'
        f'  <rect x="60" y="394" width="540" height="72" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="80" y="424" font-family="{FONT}" font-size="13" fill="#374151">Title (제목), Status (할일/진행중/완료),</text>\n'
        f'  <text x="80" y="448" font-family="{FONT}" font-size="13" fill="#374151">Date (날짜), Tags (다중선택) 확인 완료</text>\n' +
        f'  <text x="60" y="502" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">2단계  --  데이터 채우기</text>\n'
        f'  <rect x="60" y="516" width="1160" height="36" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="540" font-family="{MONO}" font-size="14" fill="#1d4ed8">"방금 파악한 구조에 맞춰 샘플 데이터 5개를 Notion DB에 직접 채워줘"</text>\n' +
        footer("구조 파악 -> 데이터 채우기까지 모두 Claude가 자동 처리합니다")
    ),
}

for filename, gen in slides.items():
    path = os.path.join(BASE, f"{filename}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {filename}.svg")

print("Done.")
