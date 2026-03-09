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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 07</text>'
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
        title("Skills 활용과 Discord 알림 연동") + "\n" +
        sub("나만의 기능을 만들고 알림으로 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "Skills 개념  /  Skill 사용법") + "\n" +
        body(354, "알림 채널 소개  /  Discord 봇 설정  /  Skill 제작  /  완료 알림") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: Skills 개념
    "02": lambda: wrap(
        badge() + "\n" +
        title("Skills") + "\n" +
        sub("Claude의 기능을 확장하는 모듈형 시스템") + "\n" +
        divider(212) + "\n" +
        label(264, "파일 구조") + "\n" +
        body(308, ".claude/skills/<이름>/SKILL.md     프로젝트 전용", mono=True, color="#374151") + "\n" +
        body(348, "~/.claude/skills/<이름>/SKILL.md   전체 프로젝트", mono=True, color="#374151") + "\n" +
        divider(394) + "\n" +
        label(434, "호출 방법") + "\n" +
        body(474, "/skill-name              슬래시 명령어로 직접 호출", mono=True, color="#374151") + "\n" +
        body(514, "/skill-name [인수]      인수 전달 가능", mono=True, color="#374151") + "\n" +
        footer_light("관련 대화에서 Claude가 자동으로 Skill을 로드하기도 합니다")
    ),
    # 03: Skill 사용법
    "03": lambda: wrap(
        badge() + "\n" +
        title("Skill 사용법") + "\n" +
        sub("SKILL.md 파일 하나로 새로운 슬래시 명령어를 정의합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "SKILL.md 구조") + "\n" +
        body(308, "---", mono=True, color="#374151") + "\n" +
        body(344, "description: 이 Skill이 하는 일", mono=True, color="#374151") + "\n" +
        body(380, "---", mono=True, color="#374151") + "\n" +
        body(416, "# 지침", mono=True, color="#374151") + "\n" +
        body(452, "Claude에게 줄 지시사항을 마크다운으로 작성", mono=True, color="#374151") + "\n" +
        divider(494) + "\n" +
        label(530, "기본 제공 Skill 예시") + "\n" +
        body(564, "/simplify   /batch   /debug   /loop", mono=True, color="#374151") + "\n"
    ),
    # 04: 알림 채널 소개 + Discord 봇 설정
    "04": lambda: wrap(
        badge() + "\n" +
        title("알림 채널 소개") + "\n" +
        sub("다양한 메신저로 Claude 완료 알림을 받을 수 있습니다") + "\n" +
        divider(212) + "\n" +
        label(264, "사용 가능한 채널") + "\n" +
        body(308, "Discord  —  채널 분리 · 여러 봇 생성 편리  (이 강의에서 실습)") + "\n" +
        body(354, "Telegram  —  봇 생성 간단 · 개인 알림에 적합") + "\n" +
        body(400, "iMessage  —  macOS 전용 · 스크립트로 메시지 발송") + "\n" +
        divider(440) + "\n" +
        label(480, "Discord 봇 준비") + "\n" +
        body(518, "Discord Developer Portal  ->  New Application  ->  Bot 탭  ->  토큰 발급") + "\n" +
        body(554, "서버에 봇 초대  ->  채널 ID 확인  ->  환경변수로 관리", color="#6b7280", size=17) + "\n" +
        footer_light("토큰·채널 ID는 비밀번호처럼 취급 — 코드에 직접 입력 금지")
    ),
    # 05: Discord Skill 제작 + 완료 알림
    "05": lambda: wrap(
        badge() + "\n" +
        title("Discord Skill 제작  /  완료 알림") + "\n" +
        divider(180) + "\n" +
        label(230, "Skill 스크립트 (Python)") + "\n" +
        body(268, "requests.post(", mono=True, color="#374151") + "\n" +
        body(304, '    "https://discord.com/api/v10/channels/{CHANNEL_ID}/messages",', mono=True, color="#374151") + "\n" +
        body(340, '    headers={"Authorization": f"Bot {TOKEN}"},', mono=True, color="#374151") + "\n" +
        body(376, '    json={"content": message}', mono=True, color="#374151") + "\n" +
        body(412, ")", mono=True, color="#374151") + "\n" +
        divider(448) + "\n" +
        label(488, "Hooks 연결 — 작업 완료 알림") + "\n" +
        body(526, "작업 완료·응답 완료 시점에 Skill 스크립트 연결") + "\n" +
        footer("Claude Code가 작업을 마칠 때마다 Discord 알림을 받을 수 있습니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
