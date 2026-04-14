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
    # 1. PM 에이전트란?
    "PM_에이전트란": lambda: wrap(
        badge() + "\n" +
        title("PM 에이전트란?") + "\n" +
        sub("할 일 목록을 보고 알아서 처리하는 에이전트입니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="490" height="290" rx="10" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="305" y="272" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#dc2626">기존 방식</text>\n'
        + body(308, "사람이 스킬을 하나씩 수동 호출", x=80) + "\n" +
        body(334, "매번 명령을 직접 입력해야 함", x=80) + "\n" +
        body(378, '"캘린더 등록해줘"', x=80, color="#9ca3af") + "\n" +
        body(404, '"조사해줘"', x=80, color="#9ca3af") + "\n" +
        body(430, '"시트 만들어줘"', x=80, color="#9ca3af") + "\n" +
        body(484, "사람이 4번 명령해야 4가지 처리", x=80, color="#dc2626") + "\n" +
        f'  <rect x="590" y="232" width="630" height="290" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="905" y="272" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#16a34a">PM 에이전트 방식</text>\n'
        + body(308, "Notion에서 오늘 할 일 목록 자동 조회", x=610) + "\n" +
        body(334, "유형 판단 -> 해당 스킬 자동 실행", x=610) + "\n" +
        body(378, "캘린더 등록 -> 데이터랩 조사", x=610, color="#9ca3af") + "\n" +
        body(404, "시트 생성 -> 이메일 발송", x=610, color="#9ca3af") + "\n" +
        body(430, "모두 자동으로 순서대로 처리", x=610, color="#9ca3af") + "\n" +
        body(484, "사람은 한 번만 명령하면 됩니다", x=610, color="#16a34a") + "\n" +
        footer("PM 에이전트 = Notion을 보고 알아서 일하는 에이전트")
    ),

    # 2. 한 번 명령의 위력
    "한_번_명령의_위력": lambda: wrap(
        badge() + "\n" +
        title("한 번 명령의 위력") + "\n" +
        sub("명령 하나로 오늘 할 일 전체가 자동으로 처리됩니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="1160" height="72" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="640" y="262" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#1e40af">사용자 명령 (딱 한 번)</text>\n'
        f'  <text x="640" y="290" text-anchor="middle" font-family="{MONO}" font-size="16" fill="#2563eb">"노션에서 오늘 처리해야 하는 것들 찾아서 처리해줘"</text>\n' +
        f'  <text x="640" y="336" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8595;</text>\n' +
        label(362, "Claude가 스스로 하는 일") + "\n" +
        f'  <rect x="60" y="376" width="260" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="190" y="408" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">1. Notion 조회</text>\n'
        f'  <text x="190" y="430" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">오늘 날짜 task 목록</text>\n'
        f'  <text x="190" y="448" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">불러오기</text>\n'
        f'  <text x="338" y="420" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="356" y="376" width="260" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="486" y="408" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">2. 유형 분류</text>\n'
        f'  <text x="486" y="430" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">각 task가 어떤</text>\n'
        f'  <text x="486" y="448" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">스킬인지 판단</text>\n'
        f'  <text x="634" y="420" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="652" y="376" width="260" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="782" y="408" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">3. 스킬 순서 실행</text>\n'
        f'  <text x="782" y="430" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">캘린더 -> 데이터랩</text>\n'
        f'  <text x="782" y="448" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">-> 시트 -> 이메일</text>\n'
        f'  <text x="930" y="420" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="948" y="376" width="272" height="80" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="1084" y="408" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#16a34a">4. 전체 완료 보고</text>\n'
        f'  <text x="1084" y="430" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">처리 결과 요약</text>\n'
        f'  <text x="1084" y="448" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">출력</text>\n' +
        footer("명령 한 번 -> 조회, 분류, 실행, 보고까지 모두 자동")
    ),

    # 3. 전체 흐름도
    "전체_흐름도": lambda: wrap(
        badge() + "\n" +
        title("전체 흐름도") + "\n" +
        sub("Notion task 하나가 처리되는 전체 과정입니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="160" height="60" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="140" y="258" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#1e40af">사용자 명령</text>\n'
        f'  <text x="140" y="278" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">"오늘 것 처리해줘"</text>\n'
        f'  <text x="238" y="266" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="256" y="232" width="160" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="336" y="258" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">Notion 조회</text>\n'
        f'  <text x="336" y="278" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">오늘 날짜 필터</text>\n'
        f'  <text x="434" y="266" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="452" y="232" width="160" height="60" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="532" y="258" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">task 목록 수신</text>\n'
        f'  <text x="532" y="278" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">4개 항목 확인</text>\n'
        f'  <text x="630" y="266" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="648" y="232" width="160" height="60" rx="8" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="728" y="258" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">유형 판단</text>\n'
        f'  <text x="728" y="278" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#6b7280">CLAUDE.md 규칙 적용</text>\n'
        # task 하나 처리 루프
        f'  <text x="640" y="330" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8595;</text>\n' +
        f'  <rect x="60" y="348" width="1160" height="44" rx="8" fill="#fef9c3" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="640" y="375" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#854d0e">[ task 처리 루프 — 목록이 빌 때까지 반복 ]</text>\n'
        f'  <text x="640" y="430" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#d1d5db">&#8595;</text>\n' +
        f'  <rect x="60" y="446" width="260" height="72" rx="8" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="190" y="474" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#dc2626">Status: 진행중</text>\n'
        f'  <text x="190" y="496" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">처리 시작 전 변경</text>\n'
        f'  <text x="338" y="485" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="356" y="446" width="260" height="72" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="486" y="474" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">스킬 실행</text>\n'
        f'  <text x="486" y="496" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">캘린더 / 데이터랩</text>\n'
        f'  <text x="486" y="512" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">시트 / 이메일</text>\n'
        f'  <text x="634" y="485" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="652" y="446" width="260" height="72" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="782" y="474" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">Status: 완료</text>\n'
        f'  <text x="782" y="496" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">처리 완료 후 변경</text>\n'
        f'  <text x="930" y="485" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="948" y="446" width="272" height="72" rx="8" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="1084" y="474" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#9333ea">다음 task로</text>\n'
        f'  <text x="1084" y="496" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">루프 반복</text>\n' +
        footer_light("각 task가 처리될 때마다 Notion Status가 실시간으로 바뀝니다")
    ),

    # 4. Notion이 실시간 대시보드
    "Notion_실시간_대시보드": lambda: wrap(
        badge() + "\n" +
        title("Notion이 실시간 대시보드가 됩니다") + "\n" +
        sub("Claude가 작업하면서 Notion Status를 직접 변경합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "Notion 화면 변화 (수강생이 눈으로 관찰)") + "\n" +
        # 테이블 헤더
        f'  <rect x="60" y="268" width="560" height="36" rx="0" fill="#f1f5f9"/>\n'
        f'  <text x="80" y="291" font-family="{FONT}" font-size="13" font-weight="700" fill="#475569">task</text>\n'
        f'  <text x="450" y="291" font-family="{FONT}" font-size="13" font-weight="700" fill="#475569">Status</text>\n'
        # task 행들
        f'  <rect x="60" y="304" width="560" height="44" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="331" font-family="{FONT}" font-size="13" fill="#374151">다음주 화요일 팀 리뷰 미팅</text>\n'
        f'  <rect x="400" y="312" width="80" height="24" rx="12" fill="#dcfce7"/>\n'
        f'  <text x="440" y="329" text-anchor="middle" font-family="{FONT}" font-size="12" font-weight="600" fill="#16a34a">완료</text>\n'
        f'  <rect x="60" y="348" width="560" height="44" fill="#fefce8" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="375" font-family="{FONT}" font-size="13" fill="#374151">AI 에이전트 트렌드 조사</text>\n'
        f'  <rect x="390" y="356" width="100" height="24" rx="12" fill="#fef9c3"/>\n'
        f'  <text x="440" y="373" text-anchor="middle" font-family="{FONT}" font-size="12" font-weight="600" fill="#854d0e">진행중</text>\n'
        f'  <rect x="60" y="392" width="560" height="44" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="419" font-family="{FONT}" font-size="13" fill="#374151">이번달 완료 업무 시트 정리</text>\n'
        f'  <rect x="390" y="400" width="100" height="24" rx="12" fill="#f1f5f9"/>\n'
        f'  <text x="440" y="417" text-anchor="middle" font-family="{FONT}" font-size="12" font-weight="600" fill="#6b7280">진행전</text>\n'
        f'  <rect x="60" y="436" width="560" height="44" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="80" y="463" font-family="{FONT}" font-size="13" fill="#374151">팀장님께 미팅 결과 메일 발송</text>\n'
        f'  <rect x="390" y="444" width="100" height="24" rx="12" fill="#f1f5f9"/>\n'
        f'  <text x="440" y="461" text-anchor="middle" font-family="{FONT}" font-size="12" font-weight="600" fill="#6b7280">진행전</text>\n'
        # 설명 박스
        f'  <rect x="660" y="268" width="560" height="216" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="940" y="306" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="700" fill="#1e40af">Status 3단계</text>\n'
        f'  <rect x="700" y="322" width="100" height="28" rx="14" fill="#f1f5f9"/>\n'
        f'  <text x="750" y="341" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="600" fill="#6b7280">진행전</text>\n'
        f'  <text x="820" y="341" font-family="{FONT}" font-size="13" fill="#374151">아직 처리되지 않음</text>\n'
        f'  <rect x="700" y="366" width="100" height="28" rx="14" fill="#fef9c3"/>\n'
        f'  <text x="750" y="385" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="600" fill="#854d0e">진행중</text>\n'
        f'  <text x="820" y="385" font-family="{FONT}" font-size="13" fill="#374151">Claude가 지금 처리 중</text>\n'
        f'  <rect x="700" y="410" width="100" height="28" rx="14" fill="#dcfce7"/>\n'
        f'  <text x="750" y="429" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="600" fill="#16a34a">완료</text>\n'
        f'  <text x="820" y="429" font-family="{FONT}" font-size="13" fill="#374151">처리 완료</text>\n'
        f'  <text x="940" y="464" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#6b7280">Claude가 직접 Notion API로 변경</text>\n' +
        footer("Notion을 열어두면 Claude가 일하는 과정을 실시간으로 볼 수 있습니다")
    ),

    # 5. Status 자동 업데이트 설계
    "Status_자동_업데이트_설계": lambda: wrap(
        badge() + "\n" +
        title("Status 자동 업데이트 설계") + "\n" +
        sub("Claude가 처리 전/후에 Notion Status를 직접 변경합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "CLAUDE.md Status 업데이트 규칙") + "\n" +
        f'  <rect x="60" y="268" width="1160" height="160" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        + body(300, "## Status 자동 업데이트 규칙", x=80, mono=True, size=14, color="#171717") + "\n" +
        body(328, "", x=80, mono=True, size=14) + "\n" +
        body(352, "task를 처리할 때 반드시 아래 순서로 Status를 변경한다:", x=80, mono=True, size=13, color="#374151") + "\n" +
        body(376, "1. 처리 시작 직전 -> notion-work/personal 스킬로 Status = '진행중' 변경", x=80, mono=True, size=13, color="#d97706") + "\n" +
        body(400, "2. 처리 완료 직후 -> Status = '완료' 변경", x=80, mono=True, size=13, color="#16a34a") + "\n" +
        body(416, "3. 오류 발생 시   -> Status = '오류' + 비고에 사유 기록", x=80, mono=True, size=13, color="#dc2626") + "\n" +
        divider(452) + "\n" +
        label(484, "처리 흐름 예시") + "\n" +
        f'  <rect x="60" y="498" width="340" height="52" rx="8" fill="#fef9c3" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="230" y="522" text-anchor="middle" font-family="{MONO}" font-size="13" fill="#854d0e">Status = "진행중" 변경</text>\n'
        f'  <text x="230" y="540" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#9ca3af">Notion API 호출</text>\n'
        f'  <text x="418" y="528" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="436" y="498" width="340" height="52" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="606" y="522" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">스킬 실행 (캘린더 등록 등)</text>\n'
        f'  <text x="606" y="540" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#9ca3af">실제 작업 수행</text>\n'
        f'  <text x="794" y="528" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="812" y="498" width="408" height="52" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="1016" y="522" text-anchor="middle" font-family="{MONO}" font-size="13" fill="#16a34a">Status = "완료" 변경</text>\n'
        f'  <text x="1016" y="540" text-anchor="middle" font-family="{FONT}" font-size="11" fill="#9ca3af">Notion API 호출</text>\n' +
        footer_light("Status 규칙 덕분에 Notion이 실시간 작업 현황판이 됩니다")
    ),

    # 6. task 분류 로직 설계
    "task_분류_로직_설계": lambda: wrap(
        badge() + "\n" +
        title("task 분류 로직 설계") + "\n" +
        sub("Claude가 task 내용을 읽고 어떤 스킬을 실행할지 판단합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "분류 기준 키워드") + "\n" +
        f'  <rect x="60" y="268" width="270" height="260" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="195" y="302" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#2563eb">캘린더 등록</text>\n'
        + body(330, "미팅, 일정, 약속", x=80, color="#374151") + "\n" +
        body(354, "회의, 오후 N시, 다음주", x=80, color="#374151") + "\n" +
        body(390, "-> google-calendar 스킬", x=80, color="#6b7280", size=13) + "\n" +
        body(414, "-> 날짜/시간 자동 추출", x=80, color="#6b7280", size=13) + "\n" +
        f'  <rect x="350" y="268" width="270" height="260" rx="10" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="485" y="302" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#d97706">데이터랩 조사</text>\n'
        + body(330, "조사, 트렌드, 검색량", x=370, color="#374151") + "\n" +
        body(354, "분석, 리서치, 알아봐줘", x=370, color="#374151") + "\n" +
        body(390, "-> naver-datalab 스킬", x=370, color="#6b7280", size=13) + "\n" +
        body(414, "-> 결과 Notion Docs 저장", x=370, color="#6b7280", size=13) + "\n" +
        f'  <rect x="640" y="268" width="270" height="260" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="775" y="302" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#16a34a">시트 생성</text>\n'
        + body(330, "시트, 정리, 목록화", x=660, color="#374151") + "\n" +
        body(354, "표로, 엑셀, 집계", x=660, color="#374151") + "\n" +
        body(390, "-> google-sheets 스킬", x=660, color="#6b7280", size=13) + "\n" +
        body(414, "-> 완료 task 뽑아서 시트 생성", x=660, color="#6b7280", size=13) + "\n" +
        f'  <rect x="930" y="268" width="290" height="260" rx="10" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="1075" y="302" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#9333ea">이메일 발송</text>\n'
        + body(330, "이메일, 메일, 보내줘", x=950, color="#374151") + "\n" +
        body(354, "전달, 공유, 알려줘", x=950, color="#374151") + "\n" +
        body(390, "-> gmail 스킬", x=950, color="#6b7280", size=13) + "\n" +
        body(414, "-> 내용 자동 작성 + 발송", x=950, color="#6b7280", size=13) + "\n" +
        footer_light("CLAUDE.md에 키워드 -> 스킬 매핑 규칙으로 작성합니다")
    ),

    # 7. CLAUDE.md 처리 규칙 작성
    "CLAUDE_md_처리_규칙_작성": lambda: wrap(
        badge() + "\n" +
        title("CLAUDE.md 처리 규칙 작성") + "\n" +
        sub("분류 규칙 + Status 업데이트 규칙을 하나의 지시문으로 통합합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="1160" height="290" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        + body(264, "## PM 에이전트 처리 규칙", x=80, mono=True, size=14, color="#171717") + "\n" +
        body(292, "", x=80, mono=True, size=13) + "\n" +
        body(314, "'노션에서 오늘 처리해야 하는 것들 찾아서 처리해줘' 명령 수신 시:", x=80, mono=True, size=13, color="#374151") + "\n" +
        body(338, "1. notion-query 스킬로 오늘 날짜 Due Date task 목록 조회", x=80, mono=True, size=13, color="#374151") + "\n" +
        body(362, "2. 각 task를 순서대로 처리한다 (처리 전 Status='진행중', 완료 후 Status='완료')", x=80, mono=True, size=13, color="#374151") + "\n" +
        body(386, "", x=80, mono=True, size=13) + "\n" +
        body(408, "task 분류 기준:", x=80, mono=True, size=13, color="#171717") + "\n" +
        body(430, "- '미팅', '일정', '약속' 포함  -> google-calendar 스킬 실행", x=80, mono=True, size=13, color="#2563eb") + "\n" +
        body(452, "- '조사', '트렌드', '검색량' 포함 -> naver-datalab 스킬 실행 -> 결과 Docs DB 저장", x=80, mono=True, size=13, color="#d97706") + "\n" +
        body(474, "- '시트', '정리', '목록' 포함   -> google-sheets 스킬 실행", x=80, mono=True, size=13, color="#16a34a") + "\n" +
        body(496, "- '이메일', '메일', '보내줘' 포함 -> gmail 스킬 실행", x=80, mono=True, size=13, color="#9333ea") + "\n" +
        body(518, "3. 오류 발생 시 Status='오류' + 비고에 사유 기록 후 다음 task 진행", x=80, mono=True, size=13, color="#dc2626") + "\n" +
        footer("이 지시문 하나로 PM 에이전트 전체 동작이 정의됩니다")
    ),

    # 8. 케이스 1 — 캘린더 등록
    "케이스1_캘린더_등록": lambda: wrap(
        badge() + "\n" +
        title("케이스 1 — 구글 캘린더 등록") + "\n" +
        sub("일정 관련 task를 캘린더에 자동으로 등록합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="1160" height="56" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="80" y="256" font-family="{FONT}" font-size="14" font-weight="700" fill="#1e40af">Notion task 예시</text>\n'
        f'  <text x="240" y="256" font-family="{MONO}" font-size="14" fill="#374151">"다음주 화요일 오후 2시 팀 리뷰 미팅"</text>\n'
        f'  <text x="80" y="277" font-family="{FONT}" font-size="12" fill="#6b7280">키워드 감지: 미팅, 오후 2시</text>\n' +
        label(320, "처리 흐름") + "\n" +
        f'  <rect x="60" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="180" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">날짜/시간 추출</text>\n'
        f'  <text x="180" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">"다음주 화요일</text>\n'
        f'  <text x="180" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">오후 2시" 파싱</text>\n'
        f'  <text x="318" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="336" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="456" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">캘린더 스킬 실행</text>\n'
        f'  <text x="456" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">google-calendar.py</text>\n'
        f'  <text x="456" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">API 호출</text>\n'
        f'  <text x="594" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="612" y="334" width="240" height="80" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="732" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">캘린더 등록 완료</text>\n'
        f'  <text x="732" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">Google Calendar에</text>\n'
        f'  <text x="732" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">일정 생성됨</text>\n'
        f'  <text x="870" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="888" y="334" width="332" height="80" rx="8" fill="#dcfce7" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="1054" y="362" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">Status: 완료</text>\n'
        f'  <text x="1054" y="384" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">Notion에 자동 반영</text>\n'
        f'  <text x="1054" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">다음 task로 이동</text>\n' +
        footer_light("캘린더 스킬은 Step5에서 이미 설치되어 있습니다")
    ),

    # 9. 케이스 2 — 네이버 데이터랩 조사
    "케이스2_데이터랩_조사": lambda: wrap(
        badge() + "\n" +
        title("케이스 2 — 네이버 데이터랩 조사") + "\n" +
        sub("조사 관련 task를 데이터랩으로 실행하고 결과를 Notion에 저장합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="1160" height="56" rx="8" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="80" y="256" font-family="{FONT}" font-size="14" font-weight="700" fill="#d97706">Notion task 예시</text>\n'
        f'  <text x="240" y="256" font-family="{MONO}" font-size="14" fill="#374151">"AI 에이전트 관련 최근 트렌드 조사해줘"</text>\n'
        f'  <text x="80" y="277" font-family="{FONT}" font-size="12" fill="#6b7280">키워드 감지: 조사, 트렌드</text>\n' +
        label(320, "처리 흐름") + "\n" +
        f'  <rect x="60" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="180" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">키워드 추출</text>\n'
        f'  <text x="180" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">"AI 에이전트"</text>\n'
        f'  <text x="180" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">조사 주제 파악</text>\n'
        f'  <text x="318" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="336" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="456" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">데이터랩 스킬 실행</text>\n'
        f'  <text x="456" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">naver-datalab.py</text>\n'
        f'  <text x="456" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">검색량 추이 조회</text>\n'
        f'  <text x="594" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="612" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="732" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">Claude 분석</text>\n'
        f'  <text x="732" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">트렌드 요약 +</text>\n'
        f'  <text x="732" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">인사이트 도출</text>\n'
        f'  <text x="870" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="888" y="334" width="332" height="80" rx="8" fill="#dcfce7" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="1054" y="358" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">Notion Docs DB 저장</text>\n'
        f'  <text x="1054" y="380" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">조사 결과 자동 기록</text>\n'
        f'  <text x="1054" y="400" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">Status: 완료</text>\n' +
        footer_light("조사 결과가 Notion Docs DB에 자동으로 축적됩니다")
    ),

    # 10. 케이스 3 — 시트 생성
    "케이스3_시트_생성": lambda: wrap(
        badge() + "\n" +
        title("케이스 3 — 구글 시트 생성") + "\n" +
        sub("정리/목록화 task를 구글 시트로 자동 생성합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="1160" height="56" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="80" y="256" font-family="{FONT}" font-size="14" font-weight="700" fill="#16a34a">Notion task 예시</text>\n'
        f'  <text x="240" y="256" font-family="{MONO}" font-size="14" fill="#374151">"이번달 완료된 업무 목록을 시트로 정리해줘"</text>\n'
        f'  <text x="80" y="277" font-family="{FONT}" font-size="12" fill="#6b7280">키워드 감지: 시트, 정리</text>\n' +
        label(320, "처리 흐름") + "\n" +
        f'  <rect x="60" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="180" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">완료 task 조회</text>\n'
        f'  <text x="180" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">Notion에서 이번달</text>\n'
        f'  <text x="180" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">완료 목록 불러오기</text>\n'
        f'  <text x="318" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="336" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="456" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">데이터 정리</text>\n'
        f'  <text x="456" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">날짜/제목/카테고리</text>\n'
        f'  <text x="456" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">컬럼 구성</text>\n'
        f'  <text x="594" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="612" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="732" y="366" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">Sheets 스킬 실행</text>\n'
        f'  <text x="732" y="388" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">google-sheets.py</text>\n'
        f'  <text x="732" y="404" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">시트 자동 생성</text>\n'
        f'  <text x="870" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="888" y="334" width="332" height="80" rx="8" fill="#dcfce7" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="1054" y="358" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">구글 드라이브에 시트 생성</text>\n'
        f'  <text x="1054" y="380" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">링크 반환 + Status: 완료</text>\n' +
        footer_light("완료 업무 목록이 구글 시트로 자동 정리됩니다")
    ),

    # 11. 케이스 4 — 지메일 발송
    "케이스4_지메일_발송": lambda: wrap(
        badge() + "\n" +
        title("케이스 4 — 지메일 발송") + "\n" +
        sub("이메일 관련 task를 Claude가 내용을 작성하고 자동으로 발송합니다") + "\n" +
        divider(212) + "\n" +
        f'  <rect x="60" y="232" width="1160" height="56" rx="8" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="80" y="256" font-family="{FONT}" font-size="14" font-weight="700" fill="#9333ea">Notion task 예시</text>\n'
        f'  <text x="240" y="256" font-family="{MONO}" font-size="14" fill="#374151">"오늘 미팅 결과 요약해서 팀장님한테 메일 보내줘"</text>\n'
        f'  <text x="80" y="277" font-family="{FONT}" font-size="12" fill="#6b7280">키워드 감지: 메일, 보내줘</text>\n' +
        label(320, "처리 흐름") + "\n" +
        f'  <rect x="60" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="180" y="362" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">컨텍스트 파악</text>\n'
        f'  <text x="180" y="384" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">오늘 완료된 task</text>\n'
        f'  <text x="180" y="400" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">Notion에서 조회</text>\n'
        f'  <text x="318" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="336" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="456" y="362" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">Claude 이메일 작성</text>\n'
        f'  <text x="456" y="384" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">제목 + 본문 자동 생성</text>\n'
        f'  <text x="456" y="400" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">격식체 자동 조정</text>\n'
        f'  <text x="594" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="612" y="334" width="240" height="80" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>\n'
        f'  <text x="732" y="362" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">Gmail 스킬 실행</text>\n'
        f'  <text x="732" y="384" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">gmail.py</text>\n'
        f'  <text x="732" y="400" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#6b7280">GWS OAuth 발송</text>\n'
        f'  <text x="870" y="378" text-anchor="middle" font-family="{FONT}" font-size="18" fill="#d1d5db">&#8594;</text>\n'
        f'  <rect x="888" y="334" width="332" height="80" rx="8" fill="#dcfce7" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="1054" y="358" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">이메일 발송 완료</text>\n'
        f'  <text x="1054" y="380" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">발송 완료 + Status: 완료</text>\n' +
        footer("Claude가 내용을 직접 작성하고 발송까지 자동으로 처리합니다")
    ),

    # 12. 실습 준비
    "실습_준비_Notion_task_등록": lambda: wrap(
        badge() + "\n" +
        title("실습 준비 — Notion에 오늘 task 4개 등록") + "\n" +
        sub("4가지 케이스를 각 1개씩 오늘 날짜로 등록합니다") + "\n" +
        divider(212) + "\n" +
        label(254, "등록할 task 목록 (Due Date = 오늘, Status = 진행전)") + "\n" +
        f'  <rect x="60" y="268" width="1160" height="56" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="80" y="292" font-family="{FONT}" font-size="13" font-weight="700" fill="#2563eb">케이스 1 — 캘린더</text>\n'
        f'  <text x="250" y="292" font-family="{MONO}" font-size="13" fill="#374151">"오늘 오후 4시 팀 주간 리뷰 미팅"</text>\n'
        f'  <text x="80" y="312" font-family="{FONT}" font-size="12" fill="#6b7280">Work Tasks DB | 유형: 업무</text>\n'
        f'  <rect x="60" y="334" width="1160" height="56" rx="8" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="80" y="358" font-family="{FONT}" font-size="13" font-weight="700" fill="#d97706">케이스 2 — 데이터랩</text>\n'
        f'  <text x="270" y="358" font-family="{MONO}" font-size="13" fill="#374151">"AI 에이전트 관련 최근 트렌드 조사해줘"</text>\n'
        f'  <text x="80" y="378" font-family="{FONT}" font-size="12" fill="#6b7280">Work Tasks DB | 유형: 업무</text>\n'
        f'  <rect x="60" y="400" width="1160" height="56" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="80" y="424" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">케이스 3 — 시트</text>\n'
        f'  <text x="250" y="424" font-family="{MONO}" font-size="13" fill="#374151">"이번달 완료된 업무 목록을 시트로 정리해줘"</text>\n'
        f'  <text x="80" y="444" font-family="{FONT}" font-size="12" fill="#6b7280">Work Tasks DB | 유형: 업무</text>\n'
        f'  <rect x="60" y="466" width="1160" height="56" rx="8" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="80" y="490" font-family="{FONT}" font-size="13" font-weight="700" fill="#9333ea">케이스 4 — 이메일</text>\n'
        f'  <text x="260" y="490" font-family="{MONO}" font-size="13" fill="#374151">"오늘 미팅 결과 요약해서 팀장님한테 메일 보내줘"</text>\n'
        f'  <text x="80" y="510" font-family="{FONT}" font-size="12" fill="#6b7280">Work Tasks DB | 유형: 업무</text>\n' +
        footer_light("4개 모두 Due Date = 오늘, Status = 진행전 으로 설정")
    ),

    # 13. 실습 — 명령 후 Notion 실시간 관찰
    "실습_명령_후_Notion_관찰": lambda: wrap(
        badge() + "\n" +
        title("실습 — 명령 후 Notion 실시간 관찰") + "\n" +
        sub("Claude가 일하는 과정을 Notion으로 눈으로 확인합니다") + "\n" +
        divider(212) + "\n" +
        f'  <text x="60" y="254" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">실습 명령</text>\n'
        f'  <rect x="60" y="268" width="1160" height="52" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="640" y="299" text-anchor="middle" font-family="{MONO}" font-size="16" fill="#2563eb">"노션에서 오늘 처리해야 하는 것들 찾아서 처리해줘"</text>\n' +
        f'  <text x="60" y="356" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">관찰 포인트</text>\n'
        f'  <rect x="60" y="370" width="270" height="80" rx="8" fill="#fef9c3" stroke="#fde68a" stroke-width="1"/>\n'
        f'  <text x="195" y="398" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#854d0e">Notion 화면 열어두기</text>\n'
        f'  <text x="195" y="420" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">Status가 하나씩</text>\n'
        f'  <text x="195" y="436" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">바뀌는 것 관찰</text>\n'
        f'  <rect x="360" y="370" width="270" height="80" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="495" y="398" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#1e40af">터미널 로그 확인</text>\n'
        f'  <text x="495" y="420" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">Claude가 어떤 스킬을</text>\n'
        f'  <text x="495" y="436" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">실행하는지 확인</text>\n'
        f'  <rect x="660" y="370" width="270" height="80" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="795" y="398" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">결과물 확인</text>\n'
        f'  <text x="795" y="420" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">캘린더 / 시트 /</text>\n'
        f'  <text x="795" y="436" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">이메일 직접 확인</text>\n'
        f'  <rect x="960" y="370" width="260" height="80" rx="8" fill="#fdf4ff" stroke="#e9d5ff" stroke-width="1"/>\n'
        f'  <text x="1090" y="398" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#9333ea">완료 보고 수신</text>\n'
        f'  <text x="1090" y="420" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">4개 task 처리</text>\n'
        f'  <text x="1090" y="436" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">결과 요약 출력</text>\n' +
        footer("Claude가 Notion을 보고 스스로 판단하고 실행하는 PM 에이전트 완성")
    ),
}

for filename, gen in slides.items():
    path = os.path.join(BASE, f"{filename}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {filename}.svg")

print("Done.")
