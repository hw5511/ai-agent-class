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


def practice_badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 04</text>\n'
        f'  <rect x="148" y="44" width="46" height="24" rx="12" fill="#2563eb"/>\n'
        f'  <text x="171" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff">PLAY</text>'
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


def body_indent(y, text, mono=False, size=19, color="#374151", indent=90):
    ff = MONO if mono else FONT
    return f'  <text x="{indent}" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{esc(text)}</text>'


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


def bullet(y, text, mono=False, size=19, color="#374151"):
    ff = MONO if mono else FONT
    return (
        f'  <circle cx="74" cy="{y - 5}" r="3" fill="{color}"/>\n'
        f'  <text x="90" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{esc(text)}</text>'
    )


def num_item(y, num, text, size=19, color="#374151"):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" font-weight="700" fill="{color}">{num}.</text>\n'
        f'  <text x="90" y="{y}" font-family="{FONT}" font-size="{size}" fill="{color}">{esc(text)}</text>'
    )


def step_box(x, y, w, h, text, desc, fill="#f9fafb", border="#e5e7eb"):
    return (
        f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{border}" stroke-width="1"/>\n'
        f'  <text x="{x + w // 2}" y="{y + 28}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" font-weight="600" fill="#171717">{esc(text)}</text>\n'
        f'  <text x="{x + w // 2}" y="{y + 50}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="13" fill="#6b7280">{esc(desc)}</text>'
    )


def arrow_right(x, y):
    return f'  <text x="{x}" y="{y}" font-family="{FONT}" font-size="20" fill="#9ca3af">&#x2192;</text>'


slides = {
    # ──────────────────────────────────────────────
    # 01: 커버
    # ──────────────────────────────────────────────
    "01": lambda: wrap(
        badge() + "\n" +
        title("세션 관리와 백그라운드 작업") + "\n" +
        sub("세션을 저장하고 재개하는 방법을 익힙니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "세션 재개  /  이름 변경  /  --continue") + "\n" +
        body(354, "/rewind  /  컨텍스트 관리  /  Auto Compact") + "\n" +
        body(400, "Foreground  /  Background  /  Tasks") + "\n" +
        body(446, "백그라운드 활용법") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),

    # ──────────────────────────────────────────────
    # 02: 세션 재개 / 이름 변경
    # ──────────────────────────────────────────────
    "02": lambda: wrap(
        badge() + "\n" +
        title("세션 재개  /  이름 변경") + "\n" +
        sub("이전 대화를 이어서 작업할 수 있습니다") + "\n" +
        divider(212) + "\n" +
        label(264, "터미널에서 시작할 때") + "\n" +
        body(308, "claude --resume            대화형 선택기 열기", mono=True, color="#374151") + "\n" +
        body(348, "claude --resume [name]    이름으로 세션 직접 재개", mono=True, color="#374151") + "\n" +
        divider(392) + "\n" +
        label(430, "세션에 이름 붙이기") + "\n" +
        body(470, "/rename 여행계획             세션에 기억하기 쉬운 이름 부여", mono=True, color="#374151") + "\n" +
        body(510, "/rename 쇼핑몰-리뷰분석    프로젝트명으로 관리 가능", mono=True, color="#374151") + "\n" +
        footer_light("세션은 프로젝트 디렉토리 단위로 저장됩니다")
    ),

    # ──────────────────────────────────────────────
    # 03: --continue / CLI 내부 /resume (NEW)
    # ──────────────────────────────────────────────
    "03": lambda: wrap(
        badge() + "\n" +
        title("--continue  /  /resume") + "\n" +
        sub("세션을 빠르게 이어가는 두 가지 방법") + "\n" +
        divider(212) + "\n" +
        label(264, "터미널에서  --continue") + "\n" +
        body(308, "claude --continue", mono=True, color="#374151") + "\n" +
        body(348, "현재 폴더의 가장 최근 대화를 바로 이어서 시작") + "\n" +
        body(384, "이름을 몰라도 OK  --  마지막 대화를 즉시 재개") + "\n" +
        divider(430) + "\n" +
        label(468, "대화 중에  /resume") + "\n" +
        body(508, "/resume", mono=True, color="#374151") + "\n" +
        body(548, "Claude와 대화하는 도중 다른 세션으로 전환") + "\n" +
        footer_light("--resume 는 터미널에서,  /resume 는 대화 중에 사용합니다")
    ),

    # ──────────────────────────────────────────────
    # 04: /rewind (Esc x 2) (NEW)
    # ──────────────────────────────────────────────
    "04": lambda: wrap(
        badge() + "\n" +
        title("/rewind  (Esc + Esc)") + "\n" +
        sub("방금 한 대화를 되돌리고 다시 시작합니다") + "\n" +
        divider(212) + "\n" +
        label(252, "실행 방법") + "\n" +
        body(292, "Esc  두 번 빠르게 누르기  또는  /rewind 입력", mono=False) + "\n" +
        body(328, "Claude의 마지막 응답과 내 마지막 입력을 함께 되돌림") + "\n" +
        divider(368) + "\n" +
        label(404, "두 가지 선택지") + "\n" +
        body(440, "1.  대화만 되돌리기", color="#171717", size=20) + "\n" +
        body_indent(472, "대화 기록만 롤백  --  파일 변경은 그대로 유지", indent=90, color="#6b7280") + "\n" +
        body(510, "2.  파일 변경도 함께 되돌리기", color="#171717", size=20) + "\n" +
        body_indent(542, "Claude가 수정한 코드/문서까지 원래 상태로 복구", indent=90, color="#6b7280") + "\n" +
        footer_light("실수했을 때 Ctrl+Z 처럼 사용할 수 있습니다")
    ),

    # ──────────────────────────────────────────────
    # 05: 세션 관리 실습 (NEW - 비개발자 친화)
    # ──────────────────────────────────────────────
    "05": lambda: wrap(
        practice_badge() + "\n" +
        title("세션 관리 실습") + "\n" +
        sub("세션을 저장하고 여러 방법으로 다시 불러옵니다") + "\n" +
        divider(212) + "\n" +
        num_item(260, "1", "claude 실행 후 아무 질문 입력  (예: '맛있는 파스타 레시피 알려줘')") + "\n" +
        num_item(300, "2", "/rename 파스타  로 세션에 이름 붙이기") + "\n" +
        num_item(340, "3", "/exit 로 종료") + "\n" +
        num_item(380, "4", "claude --resume 파스타  로 세션 재개  --  이어서 질문하기") + "\n" +
        num_item(420, "5", "/exit 로 종료 후  claude --continue  로 바로 이어가기") + "\n" +
        num_item(460, "6", "대화 중에  /resume  입력  --  세션 선택기 확인") + "\n" +
        divider(500) + "\n" +
        label(534, "BONUS") + "\n" +
        body(566, "Esc 두 번 눌러서  /rewind  --  마지막 대화 되돌리기 체험") + "\n"
    ),

    # ──────────────────────────────────────────────
    # 06: 대화 기억 공간 관리
    # ──────────────────────────────────────────────
    "06": lambda: wrap(
        badge() + "\n" +
        title("대화 기억 공간 관리") + "\n" +
        sub("대화가 길어지면 Claude의 기억 공간을 정리해야 합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "/context") + "\n" +
        body(308, "현재 기억 공간 사용량을 색상 그리드로 시각화") + "\n" +
        divider(360) + "\n" +
        label(404, "/compact") + "\n" +
        body(448, "대화 내용을 요약 압축  --  기억 공간을 확보") + "\n" +
        body(488, "/compact 파스타 레시피 내용 중심으로 압축  처럼 주제 지정 가능", mono=True, size=16, color="#374151") + "\n" +
        divider(530) + "\n" +
        label(560, "/clear") + "\n" +
        body(596, "기억 공간 완전 초기화  --  모든 대화 내용이 사라짐") + "\n"
    ),

    # ──────────────────────────────────────────────
    # 07: Auto Compact
    # ──────────────────────────────────────────────
    "07": lambda: wrap(
        badge() + "\n" +
        title("Auto Compact") + "\n" +
        sub("기억 공간이 꽉 차기 전에 Claude가 자동으로 정리합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "작동 원리") + "\n" +
        body(308, "기억 공간이 약 95% 차면 Claude가 자동으로 대화를 요약 압축") + "\n" +
        body(354, "/compact 와 달리 내가 신경 쓰지 않아도 자동으로 작동") + "\n" +
        divider(400) + "\n" +
        label(440, "압축 기준점 조정하기  (프롬프트 지시)") + "\n" +
        body(480, "'settings.json에 자동 압축 시작 기준을 80%로 설정해줘.", color="#1d4ed8") + "\n" +
        body(516, " 기억 공간이 80% 찰 때 압축이 시작되도록'", color="#1d4ed8") + "\n" +
        footer_light("CLAUDE.md에 압축 시 보존할 내용을 미리 적어두면 자동으로 지킵니다")
    ),

    # ──────────────────────────────────────────────
    # 08: Auto Compact 실습 (NEW)
    # ──────────────────────────────────────────────
    "08": lambda: wrap(
        practice_badge() + "\n" +
        title("Auto Compact 실습") + "\n" +
        sub("자동 압축이 실제로 작동하는 것을 직접 확인합니다") + "\n" +
        divider(212) + "\n" +
        num_item(260, "1", "'자동 압축 기준을 20%로 낮춰줘' 라고 요청") + "\n" +
        body_indent(296, "Claude가 settings.json의 CLAUDE_AUTOCOMPACT_PCT_OVERRIDE를 수정", indent=90, color="#6b7280", size=16) + "\n" +
        num_item(340, "2", "/context 로 현재 기억 공간 사용량 확인") + "\n" +
        num_item(380, "3", "긴 대화를 계속 이어감  (아무 주제로 여러 번 질문)") + "\n" +
        body_indent(416, "20%에 도달하면 Auto Compact가 자동 발동!", indent=90, color="#2563eb", size=16) + "\n" +
        num_item(460, "4", "/context 로 압축 후 사용량이 줄어든 것을 확인") + "\n" +
        num_item(500, "5", "'자동 압축 기준을 원래대로 복구해줘' 라고 요청") + "\n" +
        body_indent(536, "기본값(95%)으로 복구  --  실습 완료!", indent=90, color="#6b7280", size=16) + "\n" +
        footer_light("실제 프로젝트에서는 기본값(95%)을 유지하는 것을 권장합니다")
    ),

    # ──────────────────────────────────────────────
    # 09: Foreground / Background
    # ──────────────────────────────────────────────
    "09": lambda: wrap(
        badge() + "\n" +
        title("Foreground  /  Background") + "\n" +
        sub("명령 실행 방식의 두 가지 모드") + "\n" +
        divider(212) + "\n" +
        label(264, "Foreground  (일반 실행)") + "\n" +
        body(308, "Claude가 명령 완료를 기다림") + "\n" +
        body(348, "완료 전까지 다른 작업 불가") + "\n" +
        divider(394) + "\n" +
        label(432, "Background  (백그라운드 실행)") + "\n" +
        body(476, "명령을 비동기로 실행  --  즉시 고유 작업 ID 반환") + "\n" +
        body(516, "명령이 실행되는 동안 Claude는 새 프롬프트에 응답 가능") + "\n" +
        divider(558) + "\n" +
        body(596, "전환 방법:  Claude에게 직접 요청  또는  실행 중  Ctrl + B", color="#171717") + "\n"
    ),

    # ──────────────────────────────────────────────
    # 10: Tasks
    # ──────────────────────────────────────────────
    "10": lambda: wrap(
        badge() + "\n" +
        title("Tasks") + "\n" +
        sub("백그라운드 작업 목록을 관리합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "/tasks  /  Ctrl+T") + "\n" +
        body(308, "/tasks       백그라운드 작업 목록 조회 관리") + "\n" +
        body(354, "Ctrl+T      작업 목록 뷰 토글  (터미널 하단)") + "\n" +
        divider(410) + "\n" +
        label(450, "작업 상태") + "\n" +
        body(490, "실행 중  /  완료  /  보류 중  --  최대 10개 표시") + "\n" +
        footer_light("Ctrl+F 로 모든 백그라운드 에이전트 강제 종료 (3초 내 2회)")
    ),

    # ──────────────────────────────────────────────
    # 11: 백그라운드 프로세스 실습
    # ──────────────────────────────────────────────
    "11": lambda: wrap(
        practice_badge() + "\n" +
        title("백그라운드 프로세스 실습") + "\n" +
        sub("시간이 걸리는 작업을 백그라운드로 전환해봅니다") + "\n" +
        divider(212) + "\n" +
        label(258, "1  Claude에게 백그라운드 실행 요청") + "\n" +
        body(296, "'bash 스크립트를 만들어서 백그라운드로 실행해줘.", color="#1d4ed8") + "\n" +
        body(330, " count.md 파일에 1초 간격으로 1부터 20까지 숫자를 한 줄씩 써넣는 스크립트야'", color="#1d4ed8") + "\n" +
        body(370, "/tasks 로 작업 진행 상태 확인") + "\n" +
        body(406, "완료 후  count.md  열어서 결과 확인") + "\n" +
        divider(444) + "\n" +
        label(478, "2  Ctrl+B 로 전환") + "\n" +
        body(516, "위와 같은 프롬프트를 백그라운드 없이 요청한 뒤") + "\n" +
        body(550, "실행 중에  Ctrl + B  를 눌러 백그라운드로 전환") + "\n" +
        footer_light("tmux 사용자는 Ctrl+B 를 두 번 눌러야 합니다")
    ),

    # ──────────────────────────────────────────────
    # 12: 백그라운드 활용법
    # ──────────────────────────────────────────────
    "12": lambda: wrap(
        badge() + "\n" +
        title("백그라운드 활용법") + "\n" +
        sub("실제 개발 현장에서 쓰이는 3가지 패턴") + "\n" +
        divider(212) + "\n" +
        label(264, "1  오래 걸리는 작업") + "\n" +
        body(302, "npm install, docker build, 테스트 실행  ->  Ctrl+B 전환") + "\n" +
        body(338, "설치 빌드 중에 Claude에게 다른 작업 동시에 요청") + "\n" +
        divider(378) + "\n" +
        label(418, "2  병렬 실행") + "\n" +
        body(454, "개발 서버 백그라운드 실행  +  코드 수정 동시 진행") + "\n" +
        body(490, "Claude가 서버 로그를 실시간 모니터링하며 에러 즉시 수정") + "\n" +
        divider(530) + "\n" +
        label(562, "3  지속 대기 작업  (polling)") + "\n" +
        body(594, "에러 로그 감시, 메시지 수신 대기  ->  자동 알림 PR 생성") + "\n"
    ),

    # ──────────────────────────────────────────────
    # 13: 정리
    # ──────────────────────────────────────────────
    "13": lambda: wrap(
        badge() + "\n" +
        title("정리") + "\n" +
        divider(180) + "\n" +
        body(220, "/rename          세션에 이름 부여 -- 나중에 쉽게 찾기", size=19, color="#171717") + "\n" +
        body(256, "--resume         이름으로 세션 재개  /  선택기 열기", size=19, color="#171717") + "\n" +
        body(292, "--continue       현재 폴더 최근 대화 바로 이어가기", size=19, color="#171717") + "\n" +
        body(328, "/resume          대화 중 다른 세션으로 전환", size=19, color="#171717") + "\n" +
        body(364, "/rewind          Esc x 2 -- 마지막 대화 되돌리기", size=19, color="#171717") + "\n" +
        body(400, "/compact         대화 압축 -- 컨텍스트 절약", size=19, color="#171717") + "\n" +
        body(436, "Auto Compact   약 95% 시 자동 압축 -- 임계값 조정 가능", size=19, color="#171717") + "\n" +
        body(472, "Ctrl+B            실행 중인 명령 백그라운드 전환", size=19, color="#171717") + "\n" +
        body(508, "/tasks             백그라운드 작업 목록 관리", size=19, color="#171717") + "\n" +
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
