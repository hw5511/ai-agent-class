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
    "세컨드_브레인이란": lambda: wrap(
        badge() + "\n" +
        title("세컨드 브레인 — 기록이 지식이 됩니다") + "\n" +
        sub("터미널에 남긴 메모가 Notion DB에 자동으로 정리됩니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="490" height="290" rx="10" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="305" y="272" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#dc2626">기존 방식</text>\n'
        + body(308, "노트앱, 메모앱, 할일앱", x=80) + "\n" +
        body(334, "각각 따로 흩어짐", x=80) + "\n" +
        body(378, "오늘 배운 것 어디 적었지?", x=80, color="#9ca3af") + "\n" +
        body(404, "할일 목록이 여기저기 분산", x=80, color="#9ca3af") + "\n" +
        body(430, "아이디어는 사라짐", x=80, color="#9ca3af") + "\n" +
        body(484, "기억이 파편화됨", x=80, color="#dc2626") + "\n" +
        f'  <rect x="590" y="232" width="630" height="290" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="905" y="272" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#16a34a">세컨드 브레인 (이번 방식)</text>\n'
        + body(308, "터미널에서 자연어로 한 줄 입력", x=610) + "\n" +
        body(334, "Claude가 자동으로 분류 + Notion 저장", x=610) + "\n" +
        body(378, "개인: 약속 잡기", x=610, color="#9ca3af") + "\n" +
        body(404, "배움: claude -p 는 headless 모드다", x=610, color="#9ca3af") + "\n" +
        body(430, "메모: 다음 강의 아이디어 — 자동화 시나리오", x=610, color="#9ca3af") + "\n" +
        body(484, "한 곳에 모이고, 자동으로 정리됨", x=610, color="#16a34a") + "\n" +
        footer("Step6: 터미널 한 줄 입력 -> Notion DB 자동 분류 저장 시스템 구축")
    ),

    "4가지_메모_종류와_트리거": lambda: wrap(
        badge() + "\n" +
        title("4가지 메모 종류와 트리거 키워드") + "\n" +
        sub("앞에 키워드만 붙이면 Claude가 어디에 저장할지 결정합니다") + "\n" +
        divider(212) + "\n" +
        # 4개 박스 2x2 배치
        f'  <rect x="60" y="232" width="540" height="140" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="80" y="266" font-family="{MONO}" font-size="17" font-weight="700" fill="#2563eb">개인:</text>\n'
        f'  <text x="160" y="266" font-family="{FONT}" font-size="15" fill="#374151">Personal Tasks DB</text>\n'
        + body(296, "개인: 주말에 운동화 사기", x=80, mono=True, color="#6b7280") + "\n" +
        body(322, "개인: 부모님 생신 선물 알아보기", x=80, mono=True, color="#6b7280") + "\n" +
        body(348, "집안일, 약속, 개인 목표 등", x=80, color="#9ca3af", size=13) + "\n" +
        f'  <rect x="640" y="232" width="580" height="140" rx="10" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="660" y="266" font-family="{MONO}" font-size="17" font-weight="700" fill="#d97706">업무: / 학교:</text>\n'
        f'  <text x="820" y="266" font-family="{FONT}" font-size="15" fill="#374151">Work Tasks DB</text>\n'
        + body(296, "업무: 내일까지 기획서 제출", x=660, mono=True, color="#6b7280") + "\n" +
        body(322, "학교: 목요일 과제 제출 마감", x=660, mono=True, color="#6b7280") + "\n" +
        body(348, "두 키워드 모두 같은 DB에 저장됩니다", x=660, color="#9ca3af", size=13) + "\n" +
        f'  <rect x="60" y="392" width="540" height="140" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="80" y="426" font-family="{MONO}" font-size="17" font-weight="700" fill="#16a34a">메모:</text>\n'
        f'  <text x="160" y="426" font-family="{FONT}" font-size="15" fill="#374151">Notes DB</text>\n'
        + body(456, "메모: 다음 강의 아이디어 — 자동화 시나리오", x=80, mono=True, color="#6b7280") + "\n" +
        body(482, "메모: 오늘 식당 이름 기억해두기", x=80, mono=True, color="#6b7280") + "\n" +
        body(508, "일반 기록, 아이디어, 나중에 볼 것", x=80, color="#9ca3af", size=13) + "\n" +
        f'  <rect x="640" y="392" width="580" height="140" rx="10" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="660" y="426" font-family="{MONO}" font-size="17" font-weight="700" fill="#9333ea">배움:</text>\n'
        f'  <text x="748" y="426" font-family="{FONT}" font-size="15" fill="#374151">Docs DB</text>\n'
        + body(456, "배움: claude -p 는 headless 모드로 동작", x=660, mono=True, color="#6b7280") + "\n" +
        body(482, "배움: Notion API는 필터 쿼리가 자유롭다", x=660, mono=True, color="#6b7280") + "\n" +
        body(508, "오늘 배운 것, 인사이트, 정리 내용", x=660, color="#9ca3af", size=13) + "\n" +
        footer_light("트리거 키워드 하나로 Claude가 저장 위치를 결정합니다")
    ),

    "Notion_DB_4종_구조": lambda: wrap(
        badge() + "\n" +
        title("Notion DB 4종 구조") + "\n" +
        sub("Step5에서 만든 DB에 이번 Step6 구조를 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "DB 구성") + "\n" +
        f'  <rect x="60" y="268" width="260" height="260" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="190" y="300" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#2563eb">Personal Tasks</text>\n'
        + body(328, "트리거: 개인:", x=80, mono=True, size=13) + "\n" +
        body(352, "속성: Title, Status,", x=80, size=13, color="#6b7280") + "\n" +
        body(372, "       Due Date, Priority", x=80, size=13, color="#6b7280") + "\n" +
        body(408, "상태: 할일 / 진행중 / 완료", x=80, size=13) + "\n" +
        body(432, "Step7에서 캘린더 연동", x=80, size=13, color="#9ca3af") + "\n" +
        f'  <rect x="340" y="268" width="260" height="260" rx="10" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="470" y="300" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#d97706">Work Tasks</text>\n'
        + body(328, "트리거: 업무: / 학교:", x=360, mono=True, size=13) + "\n" +
        body(352, "속성: Title, Status,", x=360, size=13, color="#6b7280") + "\n" +
        body(372, "       Due Date, Tag", x=360, size=13, color="#6b7280") + "\n" +
        body(408, "Tag: 업무 / 학교 자동 구분", x=360, size=13) + "\n" +
        body(432, "Step7에서 캘린더 연동", x=360, size=13, color="#9ca3af") + "\n" +
        f'  <rect x="620" y="268" width="260" height="260" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="750" y="300" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#16a34a">Notes</text>\n'
        + body(328, "트리거: 메모:", x=640, mono=True, size=13) + "\n" +
        body(352, "속성: Title, Content,", x=640, size=13, color="#6b7280") + "\n" +
        body(372, "       Date, Priority", x=640, size=13, color="#6b7280") + "\n" +
        body(408, "일반 기록 + 아이디어", x=640, size=13) + "\n" +
        body(432, "Priority 자동 태깅 실습", x=640, size=13, color="#9ca3af") + "\n" +
        f'  <rect x="900" y="268" width="320" height="260" rx="10" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="1060" y="300" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#9333ea">Docs</text>\n'
        + body(328, "트리거: 배움:", x=920, mono=True, size=13) + "\n" +
        body(352, "속성: Title, Content,", x=920, size=13, color="#6b7280") + "\n" +
        body(372, "       Date, Topic", x=920, size=13, color="#6b7280") + "\n" +
        body(408, "학습 내용 자동 축적", x=920, size=13) + "\n" +
        body(432, "나만의 지식 베이스", x=920, size=13, color="#9ca3af") + "\n" +
        footer("4종 DB가 LOGIC 에이전트의 기억 저장소가 됩니다")
    ),

    "SKILL_md로_스킬_관리": lambda: wrap(
        badge() + "\n" +
        title("SKILL.md로 스킬을 관리합니다") + "\n" +
        sub("Claude가 스킬 파일을 읽고 실행 방법을 이해합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "스킬 폴더 구조") + "\n" +
        f'  <rect x="60" y="268" width="520" height="240" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        + body(300, "skills/", x=80, mono=True, size=15, color="#171717") + "\n" +
        body(326, "  notion-personal.md   <- 개인 할일 저장", x=80, mono=True, size=14, color="#6b7280") + "\n" +
        body(350, "  notion-work.md       <- 업무/학교 할일 저장", x=80, mono=True, size=14, color="#6b7280") + "\n" +
        body(374, "  notion-notes.md      <- 메모 저장", x=80, mono=True, size=14, color="#6b7280") + "\n" +
        body(398, "  notion-docs.md       <- 배움 저장", x=80, mono=True, size=14, color="#6b7280") + "\n" +
        body(434, "CLAUDE.md              <- 분류 규칙 지시문", x=80, mono=True, size=15, color="#171717") + "\n" +
        f'  <rect x="620" y="268" width="600" height="240" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="640" y="300" font-family="{FONT}" font-size="15" font-weight="700" fill="#1e40af">SKILL.md 구조 예시 (notion-personal.md)</text>\n'
        + body(330, "# Personal Tasks 저장 스킬", x=640, mono=True, size=13, color="#374151") + "\n" +
        body(354, "", x=640, mono=True, size=13, color="#374151") + "\n" +
        body(378, "## 용도", x=640, mono=True, size=13, color="#374151") + "\n" +
        body(402, "개인 할일을 Notion Personal Tasks DB에 저장", x=640, mono=True, size=13, color="#6b7280") + "\n" +
        body(426, "", x=640, mono=True, size=13) + "\n" +
        body(450, "## 실행 방법", x=640, mono=True, size=13, color="#374151") + "\n" +
        body(474, "python skills/notion-personal.py --title '...'", x=640, mono=True, size=12, color="#6b7280") + "\n" +
        footer("Claude는 SKILL.md를 읽고 언제 어떻게 스킬을 실행할지 판단합니다")
    ),

    "CLAUDE_md_분류_규칙_작성": lambda: wrap(
        badge() + "\n" +
        title("CLAUDE.md에 분류 규칙을 작성합니다") + "\n" +
        sub("트리거 키워드 -> DB 매핑 지시문을 자연어로 작성합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "CLAUDE.md 지시문 예시") + "\n" +
        f'  <rect x="60" y="268" width="1160" height="250" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        + body(300, "## 메모 분류 규칙", x=80, mono=True, size=15, color="#171717") + "\n" +
        body(330, "", x=80, mono=True, size=14) + "\n" +
        body(354, "사용자가 메모를 입력하면 아래 규칙에 따라 분류하고 Notion에 저장한다:", x=80, mono=True, size=14, color="#374151") + "\n" +
        body(382, "", x=80, mono=True, size=14) + "\n" +
        body(406, "- '개인:'으로 시작 -> notion-personal 스킬 실행 -> Personal Tasks DB 저장", x=80, mono=True, size=13, color="#2563eb") + "\n" +
        body(428, "- '업무:' 또는 '학교:'로 시작 -> notion-work 스킬 실행 -> Work Tasks DB 저장", x=80, mono=True, size=13, color="#d97706") + "\n" +
        body(450, "- '메모:'로 시작 -> notion-notes 스킬 실행 -> Notes DB 저장", x=80, mono=True, size=13, color="#16a34a") + "\n" +
        body(472, "- '배움:'으로 시작 -> notion-docs 스킬 실행 -> Docs DB 저장", x=80, mono=True, size=13, color="#9333ea") + "\n" +
        body(494, "", x=80, mono=True, size=14) + "\n" +
        body(514, "저장 완료 후 '저장됨: [DB명]' 한 줄만 출력한다.", x=80, mono=True, size=13, color="#6b7280") + "\n" +
        footer("자연어 지시문 하나로 Claude의 행동 전체를 설계합니다")
    ),

    "실습_터미널_메모_자동_분류": lambda: wrap(
        badge() + "\n" +
        title("실습 — 터미널 메모 -> Notion 자동 저장") + "\n" +
        sub("트리거 키워드 입력 -> Claude 분류 -> 스킬 실행 -> Notion 저장") + "\n" +
        divider(212) + "\n" +
        f'  <text x="60" y="254" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">실행 흐름</text>\n'
        f'  <rect x="60" y="268" width="200" height="200" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="160" y="354" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">1. 입력</text>\n'
        f'  <text x="160" y="378" text-anchor="middle" font-family="{MONO}" font-size="12" fill="#6b7280">배움: Notion API</text>\n'
        f'  <text x="160" y="398" text-anchor="middle" font-family="{MONO}" font-size="12" fill="#6b7280">필터가 자유롭다</text>\n'
        f'  <text x="278" y="372" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="296" y="268" width="200" height="200" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="396" y="354" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">2. Claude 분류</text>\n'
        f'  <text x="396" y="378" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">"배움:" 감지</text>\n'
        f'  <text x="396" y="398" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">-> Docs DB</text>\n'
        f'  <text x="514" y="372" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="532" y="268" width="200" height="200" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="632" y="354" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">3. 스킬 실행</text>\n'
        f'  <text x="632" y="378" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">notion-docs.py</text>\n'
        f'  <text x="632" y="398" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">API 호출</text>\n'
        f'  <text x="750" y="372" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="768" y="268" width="452" height="200" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="994" y="340" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#16a34a">4. Notion 저장 완료</text>\n'
        f'  <text x="994" y="364" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">Docs DB에 레코드 생성</text>\n'
        f'  <text x="994" y="388" text-anchor="middle" font-family="{MONO}" font-size="12" fill="#16a34a">저장됨: Docs</text>\n'
        f'  <text x="994" y="412" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">출력 후 종료</text>\n' +
        divider(496) + "\n" +
        label(528, "실습 순서") + "\n" +
        body(552, "Claude에게 스킬 4개 제작 의뢰  ->  CLAUDE.md 분류 규칙 작성  ->  4가지 트리거 테스트", x=60, size=14) + "\n" +
        footer("터미널 한 줄 입력만으로 메모가 자동 분류 저장됩니다")
    ),

    "중요도_자동_태깅": lambda: wrap(
        badge() + "\n" +
        title("중요도 자동 태깅 기능 추가") + "\n" +
        sub("메모 내용에서 긴급도를 Claude가 자동으로 판단합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "CLAUDE.md에 추가할 규칙") + "\n" +
        f'  <rect x="60" y="268" width="1160" height="130" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        + body(300, "## 중요도 자동 태깅 규칙", x=80, mono=True, size=14, color="#171717") + "\n" +
        body(328, "저장 전에 메모 내용을 분석하여 Priority 속성을 자동으로 설정한다:", x=80, mono=True, size=13, color="#374151") + "\n" +
        body(354, "- '급해', '오늘까지', '긴급' 포함 -> Priority: 높음", x=80, mono=True, size=13, color="#dc2626") + "\n" +
        body(378, "- '나중에', '언젠가', '여유있을때' 포함 -> Priority: 낮음", x=80, mono=True, size=13, color="#6b7280") + "\n" +
        body(394, "- 그 외 -> Priority: 보통", x=80, mono=True, size=13, color="#374151") + "\n" +
        divider(420) + "\n" +
        label(454, "실제 적용 예시") + "\n" +
        f'  <rect x="60" y="468" width="360" height="68" rx="8" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="80" y="496" font-family="{MONO}" font-size="13" fill="#dc2626">업무: 오늘까지 기획서 제출</text>\n'
        f'  <text x="80" y="518" font-family="{FONT}" font-size="12" fill="#9ca3af">-> Priority: 높음 자동 태그</text>\n'
        f'  <rect x="450" y="468" width="360" height="68" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="470" y="496" font-family="{MONO}" font-size="13" fill="#374151">메모: 나중에 읽을 아티클 저장</text>\n'
        f'  <text x="470" y="518" font-family="{FONT}" font-size="12" fill="#9ca3af">-> Priority: 낮음 자동 태그</text>\n'
        f'  <rect x="840" y="468" width="380" height="68" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="860" y="496" font-family="{MONO}" font-size="13" fill="#16a34a">배움: Notion API 필터 정리</text>\n'
        f'  <text x="860" y="518" font-family="{FONT}" font-size="12" fill="#9ca3af">-> Priority: 보통 자동 태그</text>\n' +
        footer("CLAUDE.md 규칙 몇 줄 추가로 지능적인 태깅이 완성됩니다")
    ),
}

for filename, gen in slides.items():
    path = os.path.join(BASE, f"{filename}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {filename}.svg")

print("Done.")
