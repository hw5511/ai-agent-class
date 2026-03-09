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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 04</text>'
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
        title("세션 관리와 백그라운드 작업") + "\n" +
        sub("세션을 저장하고 재개하는 방법을 익힙니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "세션 재개  /  이름 변경  /  컨텍스트 관리") + "\n" +
        body(354, "Auto Compact  /  백그라운드 프로세스") + "\n" +
        body(400, "Tasks  /  백그라운드 활용법") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 세션 재개 / 이름 변경
    "02": lambda: wrap(
        badge() + "\n" +
        title("세션 재개  /  이름 변경") + "\n" +
        sub("이전 대화를 이어서 작업할 수 있습니다") + "\n" +
        divider(212) + "\n" +
        label(264, "/resume") + "\n" +
        body(308, "claude --resume           대화형 세션 선택기 열기", mono=True, color="#374151") + "\n" +
        body(348, "claude --resume [name]   이름으로 세션 직접 재개", mono=True, color="#374151") + "\n" +
        body(388, "claude --continue          현재 디렉토리 최근 대화 이어서", mono=True, color="#374151") + "\n" +
        divider(430) + "\n" +
        label(468, "/rename") + "\n" +
        body(506, "/rename auth-refactor    세션에 기억하기 쉬운 이름 부여", mono=True, color="#374151") + "\n" +
        footer_light("세션은 프로젝트 디렉토리 단위로 저장됩니다")
    ),
    # 03: 컨텍스트 관리
    "03": lambda: wrap(
        badge() + "\n" +
        title("컨텍스트 관리") + "\n" +
        sub("대화가 길어질수록 컨텍스트를 관리해야 합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "/context") + "\n" +
        body(308, "현재 컨텍스트 사용량을 컬러 그리드로 시각화") + "\n" +
        divider(360) + "\n" +
        label(404, "/compact") + "\n" +
        body(448, "대화 히스토리를 요약 압축  —  컨텍스트 확보") + "\n" +
        body(488, "/compact focus on auth issues  로 초점 지정 가능", mono=True, color="#374151") + "\n" +
        footer_light("/clear 는 컨텍스트 완전 초기화  —  /compact 는 요약 압축")
    ),
    # 04: Auto Compact (신규)
    "04": lambda: wrap(
        badge() + "\n" +
        title("Auto Compact") + "\n" +
        sub("컨텍스트 한도 도달 시 자동으로 대화를 압축합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "작동 원리") + "\n" +
        body(308, "컨텍스트가 ~95% 차면 Claude가 자동으로 대화 요약 압축") + "\n" +
        body(354, "/compact 와 달리 사용자 개입 없이 자동 발동") + "\n" +
        divider(400) + "\n" +
        label(440, "한도 설정  (프롬프트 지시)") + "\n" +
        body(480, "'settings.json에 CLAUDE_AUTOCOMPACT_PCT_OVERRIDE를 80으로", color="#1d4ed8") + "\n" +
        body(516, " 설정해서 컨텍스트가 80%% 찰 때 압축이 시작되게 해줘'", color="#1d4ed8") + "\n" +
        footer_light("CLAUDE.md에 ## Compact Instructions 추가 시 압축 시 보존 지침 적용")
    ),
    # 05: 백그라운드 프로세스 (수정)
    "05": lambda: wrap(
        badge() + "\n" +
        title("백그라운드 프로세스") + "\n" +
        sub("명령어를 백그라운드에서 계속 실행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Ctrl + B") + "\n" +
        body(308, "실행 중인 Bash 명령을 백그라운드로 전환") + "\n" +
        body(354, "출력은 버퍼에 저장  —  각 작업에 고유 ID 할당") + "\n" +
        divider(400) + "\n" +
        label(440, "실습 프롬프트") + "\n" +
        body(480, "'sleep 5 && echo done 같은 딜레이 있는 bash 명령을", color="#1d4ed8") + "\n" +
        body(516, " 백그라운드로 실행해봐. Ctrl+B로 전환하는 것도 시도해줘'", color="#1d4ed8") + "\n" +
        footer_light("tmux 사용자는 Ctrl+B 를 두 번 눌러야 합니다")
    ),
    # 06: Tasks
    "06": lambda: wrap(
        badge() + "\n" +
        title("Tasks") + "\n" +
        sub("백그라운드 작업 목록을 관리합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "/tasks  /  Ctrl+T") + "\n" +
        body(308, "/tasks       백그라운드 작업 목록 조회·관리") + "\n" +
        body(354, "Ctrl+T      작업 목록 뷰 토글  (터미널 하단)") + "\n" +
        divider(410) + "\n" +
        label(450, "작업 상태") + "\n" +
        body(490, "실행 중  /  완료  /  보류 중  —  최대 10개 표시") + "\n" +
        footer_light("Ctrl+F 로 모든 백그라운드 에이전트 강제 종료 (3초 내 2회)")
    ),
    # 07: 백그라운드 활용법 (신규)
    "07": lambda: wrap(
        badge() + "\n" +
        title("백그라운드 활용법") + "\n" +
        sub("실제 개발 현장에서 쓰이는 3가지 패턴") + "\n" +
        divider(212) + "\n" +
        label(264, "1  오래 걸리는 작업") + "\n" +
        body(302, "npm install, docker build, 테스트 실행  ->  Ctrl+B 전환") + "\n" +
        body(338, "설치·빌드 중에 Claude에게 다른 작업 동시에 요청") + "\n" +
        divider(378) + "\n" +
        label(418, "2  병렬 실행") + "\n" +
        body(454, "개발 서버 백그라운드 실행  +  코드 수정 동시 진행") + "\n" +
        body(490, "Claude가 서버 로그를 실시간 모니터링하며 에러 즉시 수정") + "\n" +
        divider(530) + "\n" +
        label(562, "3  지속 대기 작업  (polling)") + "\n" +
        body(594, "에러 로그 감시, 메시지 수신 대기  ->  자동 알림·PR 생성") + "\n"
    ),
    # 08: 정리
    "08": lambda: wrap(
        badge() + "\n" +
        title("정리") + "\n" +
        divider(180) + "\n" +
        body(224, "/resume          claude --resume 로 세션 재개", size=20, color="#171717") + "\n" +
        body(264, "/rename          세션에 이름 부여 — 나중에 쉽게 찾기", size=20, color="#171717") + "\n" +
        body(304, "/compact         대화 압축 — 컨텍스트 절약", size=20, color="#171717") + "\n" +
        body(344, "Auto Compact   컨텍스트 ~95%% 시 자동 압축 — 임계값 조정 가능", size=20, color="#171717") + "\n" +
        body(384, "Ctrl+B            실행 중인 명령 백그라운드 전환", size=20, color="#171717") + "\n" +
        body(424, "/tasks             백그라운드 작업 목록 관리", size=20, color="#171717") + "\n" +
        body(464, "활용 패턴        오래 걸리는 작업 / 병렬 실행 / 지속 대기", size=20, color="#171717") + "\n" +
        footer("세션을 저장하고 백그라운드를 활용하면 작업 효율이 높아집니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
