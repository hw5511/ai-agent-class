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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 01</text>'
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
    # 01: 오프닝
    "01": lambda: wrap(
        badge() + "\n" +
        title("AI로 이미지 자동 생성하기") + "\n" +
        sub("외부 이미지 생성 API를 Skill로 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "외부 API Skill 아키텍처  /  나노바나나 API 연동") + "\n" +
        body(354, "Skill 스크립트 작성  /  실행과 생성  /  폴더 자동 저장") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 외부 API Skill 아키텍처
    "02": lambda: wrap(
        badge() + "\n" +
        title("외부 API Skill 아키텍처") + "\n" +
        sub("SKILL.md + Python 스크립트로 외부 API를 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "구조") + "\n" +
        body(308, ".claude/skills/image-gen/SKILL.md      진입점 정의", mono=True, color="#374151") + "\n" +
        body(348, ".claude/skills/image-gen/scripts/run.py  실제 API 호출", mono=True, color="#374151") + "\n" +
        divider(394) + "\n" +
        label(434, "핵심 원칙") + "\n" +
        body(474, "API 키는 환경변수로 관리  —  코드에 직접 입력 금지") + "\n" +
        body(518, "SKILL.md가 Claude에게 스크립트 실행 방법을 지시") + "\n" +
        footer_light("requests 라이브러리로 어떤 외부 API든 연결 가능합니다")
    ),
    # 03: 나노바나나 API 연동
    "03": lambda: wrap(
        badge() + "\n" +
        title("나노바나나 API 연동") + "\n" +
        sub("이미지 생성 API 키를 발급받아 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "API 키 발급") + "\n" +
        body(308, "nanobanana.im 에서 회원가입 후 API 키 발급") + "\n" +
        body(354, "환경변수로 등록: NANOBANANA_API_KEY=...", mono=True, color="#374151") + "\n" +
        divider(400) + "\n" +
        label(440, "요청 구조") + "\n" +
        body(480, "POST 요청  +  프롬프트 파라미터  +  API 키 헤더") + "\n" +
        body(524, "응답: JSON 내 이미지 URL 또는 base64 데이터") + "\n" +
        footer_light("응답 형식은 API 문서에서 확인 — URL 방식과 base64 방식이 있습니다")
    ),
    # 04: Skill 스크립트 작성
    "04": lambda: wrap(
        badge() + "\n" +
        title("Skill 스크립트 작성") + "\n" +
        sub("requests 라이브러리로 API를 호출하고 이미지를 저장합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "핵심 코드 흐름") + "\n" +
        body(308, "1.  os.getenv()  로 API 키 로드", mono=True, color="#374151") + "\n" +
        body(348, "2.  requests.post(url, headers=..., json={prompt})  호출", mono=True, color="#374151") + "\n" +
        body(388, "3.  응답 JSON에서 이미지 데이터 추출", mono=True, color="#374151") + "\n" +
        body(428, "4.  base64.b64decode()  디코딩 후 파일 저장", mono=True, color="#374151") + "\n" +
        divider(470) + "\n" +
        label(510, "SKILL.md") + "\n" +
        body(548, "description + 스크립트 실행 지시사항 작성 후 /image-gen 으로 호출", mono=True, color="#374151") + "\n"
    ),
    # 05: 실행과 폴더 자동 저장
    "05": lambda: wrap(
        badge() + "\n" +
        title("실행과 폴더 자동 저장") + "\n" +
        sub("프롬프트 입력 한 번으로 이미지가 생성되어 저장됩니다") + "\n" +
        divider(212) + "\n" +
        label(264, "실행") + "\n" +
        body(308, '/image-gen "노을 지는 도시 풍경"', mono=True, color="#374151") + "\n" +
        divider(356) + "\n" +
        label(396, "폴더 자동 저장") + "\n" +
        body(440, "지정 폴더가 없으면 자동 생성  (os.makedirs)") + "\n" +
        body(484, "파일명: 타임스탬프 자동 부여  —  덮어쓰기 방지") + "\n" +
        body(528, "예: generated/20260309_143022.png", mono=True, color="#374151") + "\n" +
        footer("프롬프트 입력만으로 이미지 생성 + 저장이 자동 완료됩니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
