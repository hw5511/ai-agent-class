import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 05</text>'
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
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#171717"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="17" font-weight="600" fill="#ffffff">{esc(text)}</text>'
    )


def footer_light(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#6b7280">{esc(text)}</text>'
    )


slides = {
    # 01: 오프닝
    "01": lambda: wrap(
        badge() + "\n" +
        title("Sub Agent와 Hooks") + "\n" +
        sub("에이전트를 나누고, 동작을 자동화합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "Sub Agent 개념 + 파일 형식  /  Sub Agent 활용 (만들기 · 공유 · 병렬)") + "\n" +
        body(354, "Hooks 이벤트 종류  /  Hooks 설정 · 활용 예시") + "\n" +
        body(400, "MS Office 추가기능으로 Claude 연결") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: Sub Agent 개념 + 파일 형식
    "02": lambda: wrap(
        badge() + "\n" +
        title("Sub Agent") + "\n" +
        sub("특정 역할에 특화된 전담 에이전트를 만듭니다") + "\n" +
        divider(212) + "\n" +
        label(264, "어떻게 작동하나요?") + "\n" +
        body(308, "별도 대화 공간에서 독립 실행  ->  결과만 메인 에이전트에 전달") + "\n" +
        body(354, "역할 설명이 일치하면 Claude가 알아서 해당 에이전트에 위임") + "\n" +
        divider(398) + "\n" +
        label(438, "에이전트 설정 파일 구조") + "\n" +
        body(474, "---", mono=True, size=17, color="#374151") + "\n" +
        body(506, "name: code-reviewer           # 에이전트 이름", mono=True, size=17, color="#374151") + "\n" +
        body(538, "description: '코드 품질을 검토합니다'   # 역할 설명", mono=True, size=17, color="#374151") + "\n" +
        body(570, "tools: Read, Glob, Grep    model: sonnet", mono=True, size=17, color="#374151") + "\n" +
        footer_light("/agents 명령어로 목록 조회 · 생성 · 수정 가능")
    ),
    # 03: Sub Agent 활용법 (만들기 · 공유 · 병렬)
    "03": lambda: wrap(
        badge() + "\n" +
        title("Sub Agent 활용법") + "\n" +
        divider(180) + "\n" +
        label(224, "Claude와 함께 만들기") + "\n" +
        body(262, "/agents  ->  Create new agent  ->  Generate with Claude") + "\n" +
        body(302, "역할 설명 입력  ->  Claude가 시스템 프롬프트 + 설정 자동 생성") + "\n" +
        divider(346) + "\n" +
        label(390, "팀 공유") + "\n" +
        body(428, ".claude/agents/ 폴더를 Git 저장소에 올리면  ->  팀 전체 동일 에이전트 사용") + "\n" +
        body(468, "~/.claude/agents/ 에 저장하면  ->  내 PC의 모든 프로젝트에 적용") + "\n" +
        divider(508) + "\n" +
        label(548, "병렬 실행  (프롬프트)") + "\n" +
        body(582, "'인증 · DB · API 모듈을 별도 서브에이전트로 병렬 조사해줘'", color="#1d4ed8") + "\n"
    ),
    # 04: Hooks 이벤트 종류
    "04": lambda: wrap(
        badge() + "\n" +
        title("Hooks  —  이벤트 종류") + "\n" +
        sub("Claude가 특정 행동을 하는 순간마다 자동으로 내 명령을 끼워 넣습니다") + "\n" +
        divider(212) + "\n" +
        label(264, "차단할 수 있는 시점") + "\n" +
        body(302, "도구 실행 직전  —  위험한 명령어라면 이 시점에서 막기") + "\n" +
        body(338, "프롬프트 처리 전  —  금지된 요청이라면 이 시점에서 거부") + "\n" +
        body(374, "권한 요청 시점  —  자동으로 승인하거나 거부하도록 설정") + "\n" +
        divider(414) + "\n" +
        label(454, "관찰만 하는 시점") + "\n" +
        body(490, "도구 성공 후  —  파일 저장되면 자동으로 포맷팅 실행") + "\n" +
        body(526, "세션 시작 시  —  작업 규칙을 자동으로 다시 불러오기") + "\n" +
        body(562, "응답 완료 시  —  Claude가 답변을 마치면 PC에 알림 보내기") + "\n" +
        footer_light("총 17+ 시점 지원  —  에이전트 시작/종료, 자동 압축 전 등")
    ),
    # 05: Hooks 설정 + 활용 예시
    "05": lambda: wrap(
        badge() + "\n" +
        title("Hooks  —  설정과 활용") + "\n" +
        divider(180) + "\n" +
        label(224, "설정 위치: settings.json") + "\n" +
        body(262, '"hooks" 키 안에 시점별로 실행할 명령어를 등록합니다', size=18, color="#374151") + "\n" +
        body(298, "'도구 실행 전' 시점에 Bash 명령 조건으로 check.sh 실행 — 이런 구조", size=17, color="#6b7280") + "\n" +
        divider(340) + "\n" +
        label(380, "응답 방식") + "\n" +
        body(418, "정상 처리  —  그대로 계속 진행") + "\n" +
        body(454, "차단 신호  —  Claude에게 거부 이유를 알려주고 실행 중단") + "\n" +
        divider(490) + "\n" +
        label(524, "실제 활용 예시") + "\n" +
        body(554, "rm -rf 삭제 명령 자동 차단  /  파일 저장 시 자동 정렬  /  PC 알림") + "\n" +
        footer_light("Claude에게 '위험 명령 차단 Hook을 추가해줘'라고 요청하면 자동 작성")
    ),
    # 06: MS Office 추가기능으로 Claude 연결
    "06": lambda: wrap(
        badge() + "\n" +
        title("MS Office  +  Claude 연결") + "\n" +
        sub("구독 계정과 추가기능으로 Word · Excel에서 바로 사용합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "설치 방법") + "\n" +
        body(308, "Microsoft 365 AppSource  ->  'Claude for Microsoft 365' 검색") + "\n" +
        body(354, "추가기능 설치  ->  Claude 구독 계정(Pro / Max)으로 로그인") + "\n" +
        divider(400) + "\n" +
        label(440, "사용 방법") + "\n" +
        body(478, "Word · Excel · PowerPoint 사이드 패널에서 Claude와 직접 대화") + "\n" +
        body(518, "문서 내용 요약 · 번역 · 초안 작성 · 데이터 분석 지원") + "\n" +
        body(554, "선택한 텍스트나 셀 범위를 그대로 Claude에 전달 가능", color="#6b7280", size=17) + "\n" +
        footer("API 키 없이 구독 계정만으로 사용  —  claude.ai 에서 구독 관리")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
