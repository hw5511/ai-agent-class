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
    # 1. 하네스 엔지니어링 완성 구조
    "하네스_엔지니어링_완성_구조": lambda: wrap(
        badge() + "\n" +
        title("하네스 엔지니어링 완성 구조") + "\n" +
        sub("에이전트를 자율 실행 시스템으로 만드는 8가지 요소") + "\n" +
        divider(212) + "\n" +
        # BEFORE layer
        f'  <rect x="60" y="228" width="240" height="28" rx="6" fill="#eff6ff"/>\n'
        f'  <text x="180" y="247" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#1e40af">BEFORE  준비</text>\n'
        f'  <rect x="60" y="264" width="240" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="90" y="288" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">트리거</text>\n'
        f'  <text x="90" y="308" font-family="{FONT}" font-size="12" fill="#6b7280">언제 시작하나</text>\n'
        f'  <rect x="60" y="334" width="240" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="90" y="358" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">Context</text>\n'
        f'  <text x="90" y="378" font-family="{FONT}" font-size="12" fill="#6b7280">무엇을 알고 있나 (CLAUDE.md)</text>\n'
        f'  <rect x="60" y="404" width="240" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="90" y="428" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">Input</text>\n'
        f'  <text x="90" y="448" font-family="{FONT}" font-size="12" fill="#6b7280">이번에 필요한 재료</text>\n' +
        # DURING layer
        f'  <rect x="330" y="228" width="240" height="28" rx="6" fill="#f0fdf4"/>\n'
        f'  <text x="450" y="247" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">DURING  실행</text>\n'
        f'  <rect x="330" y="264" width="240" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="360" y="288" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">Logic</text>\n'
        f'  <text x="360" y="308" font-family="{FONT}" font-size="12" fill="#6b7280">어떻게 처리하나 (스킬/MCP/CLI)</text>\n'
        f'  <rect x="330" y="334" width="240" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="360" y="358" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">State</text>\n'
        f'  <text x="360" y="378" font-family="{FONT}" font-size="12" fill="#6b7280">진행 상황 추적 (Notion Status)</text>\n' +
        # AFTER layer
        f'  <rect x="600" y="228" width="240" height="28" rx="6" fill="#fef3c7"/>\n'
        f'  <text x="720" y="247" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">AFTER  완료</text>\n'
        f'  <rect x="600" y="264" width="240" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="630" y="288" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">Output</text>\n'
        f'  <text x="630" y="308" font-family="{FONT}" font-size="12" fill="#6b7280">무엇이 만들어졌나</text>\n'
        f'  <rect x="600" y="334" width="240" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="630" y="358" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">Report</text>\n'
        f'  <text x="630" y="378" font-family="{FONT}" font-size="12" fill="#6b7280">어디로 보내나 (Gmail/Notion)</text>\n' +
        # CONTROL layer
        f'  <rect x="870" y="228" width="370" height="28" rx="6" fill="#fdf4ff"/>\n'
        f'  <text x="1055" y="247" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#9333ea">CONTROL  제어</text>\n'
        f'  <rect x="870" y="264" width="370" height="130" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="900" y="290" font-family="{FONT}" font-size="13" font-weight="700" fill="#9333ea">Rules</text>\n'
        f'  <text x="900" y="314" font-family="{FONT}" font-size="12" fill="#6b7280">프로그래밍적 제어</text>\n'
        f'  <text x="900" y="336" font-family="{FONT}" font-size="12" fill="#6b7280">settings.json  allowedTools 제한</text>\n'
        f'  <text x="900" y="358" font-family="{FONT}" font-size="12" fill="#6b7280">hooks  실행 전/후 자동 제어</text>\n'
        f'  <text x="900" y="380" font-family="{FONT}" font-size="12" fill="#6b7280">agent_scope  허용 범위 경계</text>\n' +
        footer("8요소가 갖춰지면 에이전트는 자율 실행 시스템이 됩니다")
    ),

    # 2. Step5~7 복습: 우리가 만든 하네스
    "우리가_만든_하네스_복습": lambda: wrap(
        badge() + "\n" +
        title("우리가 만든 하네스 복습") + "\n" +
        sub("Step 5~7에서 배운 것을 8요소로 다시 보면") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="228" width="360" height="36" rx="6" fill="#eff6ff"/>\n'
        f'  <text x="240" y="252" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">Step5: Notion 기억 저장소</text>\n'
        f'  <rect x="460" y="228" width="360" height="36" rx="6" fill="#f0fdf4"/>\n'
        f'  <text x="640" y="252" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#16a34a">Step6: 세컨드 브레인</text>\n'
        f'  <rect x="860" y="228" width="360" height="36" rx="6" fill="#fef3c7"/>\n'
        f'  <text x="1040" y="252" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#d97706">Step7: PM 에이전트</text>\n' +
        f'  <rect x="60" y="272" width="360" height="250" rx="8" fill="#f8fafc" stroke="#bfdbfe" stroke-width="1"/>\n'
        + body(300, "트리거  Claude 명령", x=80, color="#2563eb") + "\n"
        + body(324, "Context  CLAUDE.md 규칙", x=80) + "\n"
        + body(348, "Input  Notion API 토큰", x=80) + "\n"
        + body(372, "Logic  API 호출 스킬", x=80) + "\n"
        + body(396, "State  DB 레코드 저장", x=80) + "\n"
        + body(420, "Output  Notion DB 항목", x=80) + "\n"
        + body(444, "Report  터미널 출력", x=80) + "\n"
        + body(468, "Rules  SKILL.md 정의", x=80) + "\n" +
        f'  <rect x="460" y="272" width="360" height="250" rx="8" fill="#f8fafc" stroke="#bbf7d0" stroke-width="1"/>\n'
        + body(300, "트리거  키워드 입력 (개인:/업무:)", x=480, color="#16a34a") + "\n"
        + body(324, "Context  CLAUDE.md 분류 규칙", x=480) + "\n"
        + body(348, "Input  터미널 메모 텍스트", x=480) + "\n"
        + body(372, "Logic  분류 판단 + DB 저장", x=480) + "\n"
        + body(396, "State  Notion DB 갱신", x=480) + "\n"
        + body(420, "Output  분류된 메모 레코드", x=480) + "\n"
        + body(444, "Report  터미널 확인", x=480) + "\n"
        + body(468, "Rules  DB 스키마 정의", x=480) + "\n" +
        f'  <rect x="860" y="272" width="360" height="250" rx="8" fill="#f8fafc" stroke="#fde68a" stroke-width="1"/>\n'
        + body(300, "트리거  '오늘 것 처리해줘'", x=880, color="#d97706") + "\n"
        + body(324, "Context  처리 케이스 규칙", x=880) + "\n"
        + body(348, "Input  Notion 오늘 task 목록", x=880) + "\n"
        + body(372, "Logic  캘린더/데이터랩/시트/Gmail", x=880) + "\n"
        + body(396, "State  Status 진행중->완료", x=880) + "\n"
        + body(420, "Output  처리 결과물", x=880) + "\n"
        + body(444, "Report  각 스킬 결과", x=880) + "\n"
        + body(468, "Rules  task 분류 로직", x=880) + "\n" +
        footer_light("Step5~7이 모두 같은 구조입니다 — 8요소 하네스")
    ),

    # 3. 오늘 목표
    "오늘_목표": lambda: wrap(
        badge() + "\n" +
        title("오늘 목표") + "\n" +
        sub("내 하네스를 직접 설계하고 세팅합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="240" width="340" height="260" rx="12" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="230" y="282" text-anchor="middle" font-family="{FONT}" font-size="32" fill="#2563eb">01</text>\n'
        f'  <text x="230" y="318" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#1e40af">구조 이해</text>\n'
        f'  <text x="230" y="348" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">8요소 하네스 프레임워크</text>\n'
        f'  <text x="230" y="370" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">Before / During / After</text>\n'
        f'  <text x="230" y="392" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">/ Control 레이어</text>\n'
        f'  <text x="418" y="378" text-anchor="middle" font-family="{FONT}" font-size="28" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="470" y="240" width="340" height="260" rx="12" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="640" y="282" text-anchor="middle" font-family="{FONT}" font-size="32" fill="#16a34a">02</text>\n'
        f'  <text x="640" y="318" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#15803d">시연 관찰</text>\n'
        f'  <text x="640" y="348" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">Claude와 논의하며</text>\n'
        f'  <text x="640" y="370" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">하네스 설계하는 과정</text>\n'
        f'  <text x="640" y="392" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">직접 관찰</text>\n'
        f'  <text x="828" y="378" text-anchor="middle" font-family="{FONT}" font-size="28" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="880" y="240" width="340" height="260" rx="12" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="1050" y="282" text-anchor="middle" font-family="{FONT}" font-size="32" fill="#d97706">03</text>\n'
        f'  <text x="1050" y="318" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#b45309">직접 설계</text>\n'
        f'  <text x="1050" y="348" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">나만의 시나리오로</text>\n'
        f'  <text x="1050" y="370" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">8요소 채우기 + 세팅</text>\n'
        f'  <text x="1050" y="392" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">+ 테스트 + 공유</text>\n' +
        footer("Claude와 논의하며 만드는 나만의 자동화 시스템")
    ),

    # 4. Claude를 설계 파트너로
    "Claude를_설계_파트너로": lambda: wrap(
        badge() + "\n" +
        title("Claude를 설계 파트너로 쓰는 법") + "\n" +
        sub("혼자 고민하지 말고 Claude와 함께 설계합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="228" width="530" height="290" rx="10" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="325" y="264" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#dc2626">기존 방식</text>\n'
        + body(294, "혼자 CLAUDE.md를 처음부터 작성", x=80) + "\n"
        + body(320, "뭘 써야 할지 막막함", x=80, color="#9ca3af") + "\n"
        + body(346, "트리거/스킬/규칙을 직접 구상해야 함", x=80, color="#9ca3af") + "\n"
        + body(388, '"어떻게 쓰면 Claude가 잘 이해할까?"', x=80, color="#9ca3af") + "\n"
        + body(430, "-> 비개발자에게 너무 막막한 시작점", x=80, color="#dc2626") + "\n" +
        f'  <rect x="630" y="228" width="590" height="290" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="925" y="264" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#16a34a">논의 프롬프트 방식</text>\n'
        + body(294, "Claude에게 내 상황을 설명한다", x=650) + "\n"
        + body(320, "Claude가 8요소를 하나씩 물어봄", x=650, color="#6b7280") + "\n"
        + body(346, "대화하며 구조가 자연스럽게 잡힘", x=650, color="#6b7280") + "\n"
        + body(388, '"이런 자동화 원해요. 어떻게 설계할까요?"', x=650, color="#6b7280") + "\n"
        + body(430, "-> CLAUDE.md를 Claude가 직접 써줌", x=650, color="#16a34a") + "\n" +
        label(544, "논의 프롬프트 시작 예시") + "\n" +
        f'  <rect x="60" y="554" width="1160" height="28" rx="4" fill="#1e293b"/>\n'
        f'  <text x="80" y="573" font-family="{MONO}" font-size="13" fill="#94a3b8">'
        f'나는 회의록을 자동 정리하고 담당자별 업무를 Notion에 등록하고 싶어. 하네스 구조 잡아줘.</text>\n' +
        footer_light("Claude가 질문하며 8요소를 함께 채워줍니다")
    ),

    # 5. 시연 시나리오: 신상품 기획회의
    "시연_시나리오_신상품_기획회의": lambda: wrap(
        badge() + "\n" +
        title("시연: 신상품 기획회의 자동화") + "\n" +
        sub("회의 원본 -> 정돈된 회의록 -> 업무 분장 -> 조사/가공 -> 임원 보고") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="190" height="290" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="155" y="262" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#1e40af">INPUT</text>\n'
        f'  <text x="155" y="292" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">구글 Docs</text>\n'
        f'  <text x="155" y="312" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">회의 메모 (날것)</text>\n'
        f'  <text x="155" y="344" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">+ 구글 Docs</text>\n'
        f'  <text x="155" y="364" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">음성 텍스트 변환본</text>\n'
        f'  <text x="268" y="382" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="286" y="232" width="190" height="290" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="381" y="262" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">STEP 1</text>\n'
        f'  <text x="381" y="292" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">정돈된 회의록</text>\n'
        f'  <text x="381" y="314" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">두 Docs를 읽고</text>\n'
        f'  <text x="381" y="334" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">가공해서 저장</text>\n'
        f'  <text x="494" y="382" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="512" y="232" width="190" height="290" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="607" y="262" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">STEP 2</text>\n'
        f'  <text x="607" y="292" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">Notion 업무 등록</text>\n'
        f'  <text x="607" y="314" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">업무 분장 추출</text>\n'
        f'  <text x="607" y="334" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">담당자별 자동 등록</text>\n'
        f'  <text x="720" y="382" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="738" y="232" width="190" height="290" rx="10" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="833" y="262" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">STEP 3</text>\n'
        f'  <text x="833" y="292" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">조사 + 가공</text>\n'
        f'  <text x="833" y="314" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">데이터랩 시장조사</text>\n'
        f'  <text x="833" y="334" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">웹 경쟁사 분석</text>\n'
        f'  <text x="833" y="354" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">구글 시트 정리</text>\n'
        f'  <text x="833" y="374" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">Docs 보고서 초안</text>\n'
        f'  <text x="946" y="382" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="964" y="232" width="276" height="290" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="1102" y="262" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">OUTPUT</text>\n'
        f'  <text x="1102" y="292" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">최종 보고</text>\n'
        f'  <text x="1102" y="314" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">완성된 보고서</text>\n'
        f'  <text x="1102" y="334" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">Gmail로 임원 발송</text>\n'
        f'  <text x="1102" y="364" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">Notion Status</text>\n'
        f'  <text x="1102" y="384" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">전체 완료 업데이트</text>\n' +
        footer("명령 한 번 -> 회의록 정리부터 임원 보고까지 자동")
    ),

    # 6. 시연: Claude와 하네스 구조 논의
    "시연_Claude와_하네스_논의": lambda: wrap(
        badge() + "\n" +
        title("시연: Claude와 하네스 구조 논의") + "\n" +
        sub("Claude가 질문하며 8요소를 함께 채워가는 과정입니다") + "\n" +
        divider(212) + "\n" +
        label(242, "논의 프롬프트 입력") + "\n" +
        f'  <rect x="60" y="254" width="1160" height="52" rx="8" fill="#1e293b"/>\n'
        f'  <text x="80" y="276" font-family="{MONO}" font-size="13" fill="#94a3b8">$ 나는 신상품 기획 회의 후 자동으로 업무를 분장하고 조사하고 임원에게 보고하고 싶어.</text>\n'
        f'  <text x="80" y="296" font-family="{MONO}" font-size="13" fill="#94a3b8">  Input은 구글 Docs. 하네스 8요소로 설계해줘.</text>\n' +
        label(330, "Claude 응답 (질문으로 구조 잡기)") + "\n" +
        f'  <rect x="60" y="342" width="1160" height="190" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="370" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">Claude:</text>\n'
        + body(396, "알겠습니다. 몇 가지 확인하겠습니다.", x=80, color="#374151") + "\n"
        + body(420, "1. 트리거: 회의 후 Docs URL을 직접 주실 건가요, 아니면 폴더를 자동 감시할까요?", x=80, color="#374151") + "\n"
        + body(444, "2. 담당자 목록은 CLAUDE.md에 미리 정의할까요? (예: 홍길동 - 시장조사 담당)", x=80, color="#374151") + "\n"
        + body(468, "3. 최종 보고 이메일 수신자는 누구인가요? 임원 이메일을 CLAUDE.md에 넣을게요.", x=80, color="#374151") + "\n"
        + body(492, "4. 조사 범위는 네이버 데이터랩 + 웹 조사 두 가지 모두 사용할까요?", x=80, color="#374151") + "\n" +
        footer_light("Claude가 질문 -> 사용자가 답변 -> 구조가 완성됩니다")
    ),

    # 7. 시연 결과: 완성된 CLAUDE.md + SKILL 목록
    "시연_결과_CLAUDE_md_완성": lambda: wrap(
        badge() + "\n" +
        title("시연 결과: CLAUDE.md + SKILL 목록") + "\n" +
        sub("논의 후 Claude가 작성한 설계 결과물입니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="228" width="580" height="310" rx="8" fill="#1e293b"/>\n'
        f'  <text x="80" y="254" font-family="{MONO}" font-size="12" fill="#94a3b8"># 신상품 기획 자동화 하네스</text>\n'
        f'  <text x="80" y="276" font-family="{MONO}" font-size="12" fill="#64748b">## 트리거</text>\n'
        f'  <text x="80" y="296" font-family="{MONO}" font-size="11" fill="#e2e8f0">Docs URL을 받으면 즉시 시작한다</text>\n'
        f'  <text x="80" y="318" font-family="{MONO}" font-size="12" fill="#64748b">## 담당자</text>\n'
        f'  <text x="80" y="338" font-family="{MONO}" font-size="11" fill="#e2e8f0">홍길동: 시장 규모 조사 (데이터랩)</text>\n'
        f'  <text x="80" y="358" font-family="{MONO}" font-size="11" fill="#e2e8f0">김철수: 경쟁사 분석 (웹 조사)</text>\n'
        f'  <text x="80" y="378" font-family="{MONO}" font-size="12" fill="#64748b">## 보고</text>\n'
        f'  <text x="80" y="398" font-family="{MONO}" font-size="11" fill="#e2e8f0">report_to: director@company.com</text>\n'
        f'  <text x="80" y="418" font-family="{MONO}" font-size="12" fill="#64748b">## 처리 순서</text>\n'
        f'  <text x="80" y="438" font-family="{MONO}" font-size="11" fill="#e2e8f0">1. Docs 읽기 -> 회의록 가공</text>\n'
        f'  <text x="80" y="458" font-family="{MONO}" font-size="11" fill="#e2e8f0">2. 업무 추출 -> Notion 등록</text>\n'
        f'  <text x="80" y="478" font-family="{MONO}" font-size="11" fill="#e2e8f0">3. 조사 -> 시트 -> Docs -> Gmail</text>\n'
        f'  <text x="80" y="506" font-family="{MONO}" font-size="11" fill="#64748b">CLAUDE.md</text>\n' +
        f'  <rect x="680" y="228" width="560" height="310" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="700" y="258" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">필요 SKILL 목록</text>\n'
        + body(290, "read_docs.md     구글 Docs 내용 읽기", x=700, mono=True, size=13) + "\n"
        + body(316, "write_docs.md    구글 Docs에 쓰기", x=700, mono=True, size=13) + "\n"
        + body(342, "notion_add.md    Notion task 등록", x=700, mono=True, size=13) + "\n"
        + body(368, "datalab.md       네이버 데이터랩 조회", x=700, mono=True, size=13) + "\n"
        + body(394, "web_search.md    웹 조사 (Gemini)", x=700, mono=True, size=13) + "\n"
        + body(420, "write_sheet.md   구글 시트 작성", x=700, mono=True, size=13) + "\n"
        + body(446, "send_gmail.md    Gmail 발송", x=700, mono=True, size=13) + "\n"
        + body(480, "-> 각 SKILL.md에 실행 방법 작성", x=700, size=13, color="#9ca3af") + "\n" +
        footer("CLAUDE.md + SKILL.md 세팅 완료 = 하네스 준비 완료")
    ),

    # 8. 나만의 하네스 설계 시트
    "나만의_하네스_설계_시트": lambda: wrap(
        badge() + "\n" +
        title("나만의 하네스 설계 시트") + "\n" +
        sub("어떤 자동화를 만들고 싶은지 8요소로 적어봅니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="228" width="270" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="254" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">트리거</text>\n'
        f'  <text x="80" y="276" font-family="{FONT}" font-size="12" fill="#9ca3af">언제 시작하나?</text>\n'
        f'  <text x="80" y="298" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n'
        f'  <rect x="360" y="228" width="270" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="380" y="254" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">Context</text>\n'
        f'  <text x="380" y="276" font-family="{FONT}" font-size="12" fill="#9ca3af">Claude에게 뭘 알려줘야 하나?</text>\n'
        f'  <text x="380" y="298" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n'
        f'  <rect x="660" y="228" width="270" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="680" y="254" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">Input</text>\n'
        f'  <text x="680" y="276" font-family="{FONT}" font-size="12" fill="#9ca3af">어떤 데이터/파일이 필요하나?</text>\n'
        f'  <text x="680" y="298" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n'
        f'  <rect x="960" y="228" width="260" height="80" rx="8" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="980" y="254" font-family="{FONT}" font-size="13" font-weight="700" fill="#9333ea">Rules</text>\n'
        f'  <text x="980" y="276" font-family="{FONT}" font-size="12" fill="#9ca3af">어떤 제어가 필요하나?</text>\n'
        f'  <text x="980" y="298" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n'
        f'  <rect x="60" y="336" width="270" height="80" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="80" y="362" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">Logic</text>\n'
        f'  <text x="80" y="384" font-family="{FONT}" font-size="12" fill="#9ca3af">어떤 스킬/MCP를 쓰나?</text>\n'
        f'  <text x="80" y="406" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n'
        f'  <rect x="360" y="336" width="270" height="80" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="380" y="362" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">State</text>\n'
        f'  <text x="380" y="384" font-family="{FONT}" font-size="12" fill="#9ca3af">진행 상황을 어디서 확인하나?</text>\n'
        f'  <text x="380" y="406" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n'
        f'  <rect x="660" y="336" width="270" height="80" rx="8" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="680" y="362" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">Output</text>\n'
        f'  <text x="680" y="384" font-family="{FONT}" font-size="12" fill="#9ca3af">무엇이 만들어지나?</text>\n'
        f'  <text x="680" y="406" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n'
        f'  <rect x="960" y="336" width="260" height="80" rx="8" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="980" y="362" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">Report</text>\n'
        f'  <text x="980" y="384" font-family="{FONT}" font-size="12" fill="#9ca3af">결과를 어디로 보내나?</text>\n'
        f'  <text x="980" y="406" font-family="{FONT}" font-size="12" fill="#d1d5db">_______________</text>\n' +
        f'  <rect x="60" y="440" width="1160" height="80" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="640" y="468" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">Claude에게 줄 논의 프롬프트</text>\n'
        f'  <text x="640" y="496" text-anchor="middle" font-family="{MONO}" font-size="13" fill="#374151">"나는 [상황]을 자동화하고 싶어. 8요소 하네스로 같이 설계해줘."</text>\n' +
        footer_light("정답은 없습니다 — 내 상황에 맞는 하네스를 만드세요")
    ),

    # 9. 실습: 직접 세팅 + 테스트
    "실습_직접_세팅_테스트": lambda: wrap(
        badge() + "\n" +
        title("실습: 직접 세팅 + 테스트") + "\n" +
        sub("Claude와 논의 -> CLAUDE.md 완성 -> 실제 테스트까지") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="260" height="290" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="190" y="272" text-anchor="middle" font-family="{FONT}" font-size="28" font-weight="700" fill="#2563eb">1</text>\n'
        f'  <text x="190" y="304" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">시나리오 결정</text>\n'
        + body(336, "어떤 자동화를 원하나?", x=80, color="#6b7280") + "\n"
        + body(360, "8요소 시트 대략 채우기", x=80, color="#6b7280") + "\n"
        + body(392, "아이디어 예시:", x=80, color="#9ca3af") + "\n"
        + body(414, "- 주간 보고서 자동화", x=80, color="#9ca3af") + "\n"
        + body(436, "- 지출 가계부 정리", x=80, color="#9ca3af") + "\n"
        + body(458, "- 배움 노트 퀴즈화", x=80, color="#9ca3af") + "\n" +
        f'  <text x="338" y="382" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="356" y="232" width="260" height="290" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="486" y="272" text-anchor="middle" font-family="{FONT}" font-size="28" font-weight="700" fill="#16a34a">2</text>\n'
        f'  <text x="486" y="304" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#15803d">Claude와 논의</text>\n'
        + body(336, "논의 프롬프트 입력", x=376, color="#6b7280") + "\n"
        + body(360, "Claude 질문에 답변", x=376, color="#6b7280") + "\n"
        + body(384, "구조 함께 확정", x=376, color="#6b7280") + "\n"
        + body(408, "CLAUDE.md 초안", x=376, color="#6b7280") + "\n"
        + body(432, "Claude가 작성해줌", x=376, color="#9ca3af") + "\n" +
        f'  <text x="634" y="382" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="652" y="232" width="260" height="290" rx="10" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="782" y="272" text-anchor="middle" font-family="{FONT}" font-size="28" font-weight="700" fill="#d97706">3</text>\n'
        f'  <text x="782" y="304" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#b45309">SKILL.md 세팅</text>\n'
        + body(336, "필요한 스킬 목록 확인", x=672, color="#6b7280") + "\n"
        + body(360, "각 SKILL.md 작성", x=672, color="#6b7280") + "\n"
        + body(384, "또는 Claude에게", x=672, color="#6b7280") + "\n"
        + body(408, "같이 작성 요청", x=672, color="#9ca3af") + "\n" +
        f'  <text x="930" y="382" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="948" y="232" width="272" height="290" rx="10" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="1084" y="272" text-anchor="middle" font-family="{FONT}" font-size="28" font-weight="700" fill="#9333ea">4</text>\n'
        f'  <text x="1084" y="304" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#7e22ce">테스트 + 수정</text>\n'
        + body(336, "실제 명령 실행", x=968, color="#6b7280") + "\n"
        + body(360, "오류 -> Claude에게", x=968, color="#6b7280") + "\n"
        + body(384, "수정 요청", x=968, color="#6b7280") + "\n"
        + body(408, "동작 확인", x=968, color="#6b7280") + "\n"
        + body(432, "-> 내 하네스 완성", x=968, color="#9333ea") + "\n" +
        footer("막히면 Claude에게 물어보면서 진행하세요")
    ),

    # 10. 결과 공유 + 심화 수료
    "결과_공유_심화_수료": lambda: wrap(
        badge() + "\n" +
        title("결과 공유 + 심화 과정 수료") + "\n" +
        sub("각자 만든 하네스를 서로 시연합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="228" width="530" height="290" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="325" y="264" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">결과 공유 방식</text>\n'
        + body(296, "1. 내 시나리오 한 줄 설명", x=80) + "\n"
        + body(320, '   "저는 [무엇]을 자동화했습니다"', x=80, color="#9ca3af") + "\n"
        + body(354, "2. CLAUDE.md 핵심 규칙 공개", x=80) + "\n"
        + body(378, "   어떤 Context / Logic을 설계했는지", x=80, color="#9ca3af") + "\n"
        + body(412, "3. 실제 테스트 실행 시연", x=80) + "\n"
        + body(436, "   명령 입력 -> 자동 처리 과정 관찰", x=80, color="#9ca3af") + "\n"
        + body(470, "4. 서로 개선 아이디어 제안", x=80) + "\n" +
        f'  <rect x="630" y="228" width="590" height="290" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="925" y="280" text-anchor="middle" font-family="{FONT}" font-size="17" font-weight="700" fill="#1e40af">심화 과정에서 배운 것</text>\n'
        + body(316, "Step 5  Notion DB 기억 저장소 구축", x=650, color="#374151") + "\n"
        + body(344, "Step 6  세컨드 브레인 자동 분류", x=650, color="#374151") + "\n"
        + body(372, "Step 7  PM 에이전트 + Status 추적", x=650, color="#374151") + "\n"
        + body(400, "Step 8  나만의 하네스 직접 설계", x=650, color="#2563eb", size=16) + "\n" +
        f'  <line x1="650" y1="428" x2="1200" y2="428" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="925" y="462" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#1e40af">여러분은 이제 에이전트 설계자입니다</text>\n'
        f'  <text x="925" y="492" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">도구를 쓰는 사람에서 도구를 설계하는 사람으로</text>\n' +
        footer("Harness Engineering — Log to Logic 완성")
    ),
}


def main():
    for name, fn in slides.items():
        svg = fn()
        path = os.path.join(BASE, f"{name}.svg")
        with open(path, "w", encoding="utf-8") as f:
            f.write(svg)
        print(f"Created {name}.svg")
    print("Done.")


if __name__ == "__main__":
    main()
