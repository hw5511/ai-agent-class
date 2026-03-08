import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

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
        f'fill="#9ca3af" letter-spacing="0.08em">{text}</text>'
    )

def body(y, text, mono=False, size=19, color="#374151"):
    ff = MONO if mono else FONT
    return f'  <text x="60" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{text}</text>'

def title(text, y=130, size=40):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="700" fill="#171717">{text}</text>'
    )

def sub(text, y=178):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="19" fill="#6b7280">{text}</text>'

def footer(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#171717"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="17" font-weight="600" fill="#ffffff">{text}</text>'
    )

def footer_light(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#6b7280">{text}</text>'
    )

slides = {
    # 01: 오프닝
    "01": lambda: wrap(
        badge() + "\n" +
        title("세션 관리와 백그라운드 작업") + "\n" +
        sub("세션을 저장하고 재개하는 방법을 익힙니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "세션 재개  /  이름 변경") + "\n" +
        body(354, "컨텍스트 관리  /  백그라운드 프로세스") + "\n" +
        body(400, "Node.js 스크립트  /  Tasks") + "\n" +
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
    # 04: 백그라운드 프로세스
    "04": lambda: wrap(
        badge() + "\n" +
        title("백그라운드 프로세스") + "\n" +
        sub("명령어를 백그라운드에서 계속 실행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "Ctrl + B") + "\n" +
        body(308, "실행 중인 Bash 명령을 백그라운드로 전환") + "\n" +
        body(354, "출력은 버퍼링 — 각 작업에 고유 ID 할당") + "\n" +
        divider(400) + "\n" +
        label(444, "Node.js 스크립트") + "\n" +
        body(488, "node server.js &          백그라운드 실행", mono=True, color="#374151") + "\n" +
        body(528, "node script.js  후  Ctrl+B  로도 전환 가능", mono=True, color="#374151") + "\n"
    ),
    # 05: Tasks
    "05": lambda: wrap(
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
        footer_light("CLAUDE_CODE_TASK_LIST_ID 환경변수로 목록 분리 관리 가능")
    ),
    # 06: 정리
    "06": lambda: wrap(
        badge() + "\n" +
        title("정리") + "\n" +
        divider(180) + "\n" +
        body(236, "/resume        claude --resume 로 세션 재개", size=21, color="#171717") + "\n" +
        body(282, "/rename        세션에 이름 부여 — 나중에 쉽게 찾기", size=21, color="#171717") + "\n" +
        body(328, "/context        컨텍스트 사용량 시각화", size=21, color="#171717") + "\n" +
        body(374, "/compact       대화 압축 — 컨텍스트 절약", size=21, color="#171717") + "\n" +
        body(420, "Ctrl+B          실행 중인 명령 백그라운드 전환", size=21, color="#171717") + "\n" +
        body(466, "/tasks          백그라운드 작업 목록 관리", size=21, color="#171717") + "\n" +
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
