import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

def badge(num):
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 02</text>'
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
    return (
        f'  <text x="60" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{text}</text>'
    )

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
    # 03: /init 개념 (구 04)
    "03": lambda: wrap(
        badge(3) + "\n" +
        title("/init") + "\n" +
        sub("프로젝트 메모리를 자동으로 구성하는 명령어") + "\n" +
        divider(212) + "\n" +
        label(264, "하는 일") + "\n" +
        body(308, "현재 폴더를 분석해 CLAUDE.md 초안을 자동 생성") + "\n" +
        label(374, "차이점") + "\n" +
        body(418, "직접 작성  vs  /init 자동 생성  +  직접 보완") + "\n" +
        footer("기존 CLAUDE.md가 있으면 덮어씌우므로 백업 권장")
    ),
    # 04: /memory 개념 (구 06)
    "04": lambda: wrap(
        badge(4) + "\n" +
        title("/memory") + "\n" +
        sub("에이전트 메모리를 직접 확인하고 편집합니다") + "\n" +
        divider(212) + "\n" +
        body(290, "/memory  —  현재 로드된 모든 메모리 표시", size=22, color="#171717") + "\n" +
        divider(340) + "\n" +
        label(390, "메모리 종류") + "\n" +
        body(430, "Project Memory   CLAUDE.md  (현재 폴더)") + "\n" +
        body(476, "User Memory      ~/.claude/CLAUDE.md  (전체 적용)") + "\n" +
        footer_light("목록에서 파일을 선택하면 바로 편집 가능")
    ),
    # 05: Auto Memory (구 07)
    "05": lambda: wrap(
        badge(5) + "\n" +
        title("Auto Memory") + "\n" +
        sub("대화 중 중요한 내용을 에이전트가 자동 저장합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "작동 방식") + "\n" +
        body(308, "Claude가 기억할 가치가 있다고 판단하면 저장 제안") + "\n" +
        body(354, "사용자가 승인하면 CLAUDE.md에 자동 추가") + "\n" +
        divider(410) + "\n" +
        label(450, "수동 저장") + "\n" +
        body(490, "Shift + Tab  →  Auto-accept mode  (자동 승인)") + "\n" +
        footer("기억시키고 싶은 내용은 직접 요청해도 됩니다")
    ),
    # 06: Read 툴 (구 09)
    "06": lambda: wrap(
        badge(6) + "\n" +
        title("Read  툴") + "\n" +
        sub("파일 내용을 읽어 에이전트에게 전달합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "텍스트 파일") + "\n" +
        body(308, ".txt  .md  .py  .js  .html  .css  .json  .csv  ...") + "\n" +
        label(374, "이미지 파일") + "\n" +
        body(418, ".jpg  .png  .gif  .webp  —  내용을 보고 분석 가능") + "\n" +
        label(484, "기타") + "\n" +
        body(524, ".pdf  (텍스트 추출)  /  .ipynb  (Jupyter 노트북)") + "\n" +
        footer("확장자 제한 없이 대부분의 텍스트 기반 파일 지원")
    ),
    # 07: Write 툴 (구 11)
    "07": lambda: wrap(
        badge(7) + "\n" +
        title("Write  툴") + "\n" +
        sub("새 파일을 생성합니다") + "\n" +
        divider(212) + "\n" +
        body(290, "텍스트 기반 파일을  새로 만들 때  사용", size=22, color="#171717") + "\n" +
        divider(340) + "\n" +
        label(390, "주의사항") + "\n" +
        body(430, "기존 파일이 있으면 덮어씀  —  내용 전체 교체") + "\n" +
        body(476, "파일 수정이 목적이라면  Edit 툴을 사용") + "\n" +
        footer_light("Write = 새 파일 생성  /  Edit = 기존 파일 수정")
    ),
    # 08: Edit 툴 (구 13)
    "08": lambda: wrap(
        badge(8) + "\n" +
        title("Edit  툴") + "\n" +
        sub("기존 파일의 일부를 수정합니다") + "\n" +
        divider(212) + "\n" +
        body(290, "파일 전체를 교체하지 않고  특정 부분만 변경", size=22, color="#171717") + "\n" +
        divider(340) + "\n" +
        label(390, "동작 방식") + "\n" +
        body(430, "수정 전 내용을 찾아  →  수정 후 내용으로 교체") + "\n" +
        body(476, "파일을 먼저 Read해야 Edit 사용 가능") + "\n" +
        footer("실수 방지: 변경 전 내용이 정확해야 적용됨")
    ),
    # 09: Bash 툴 (구 15)
    "09": lambda: wrap(
        badge(9) + "\n" +
        title("Bash  툴") + "\n" +
        sub("터미널 명령어를 에이전트가 직접 실행합니다") + "\n" +
        divider(212) + "\n" +
        body(290, "운영체제의 명령어를  에이전트가 대신 실행", size=22, color="#171717") + "\n" +
        divider(340) + "\n" +
        label(390, "할 수 있는 것") + "\n" +
        body(430, "폴더 생성 · 이름 변경 · 복사 · 삭제") + "\n" +
        body(476, "프로그램 실행 · 패키지 설치 · 스크립트 실행") + "\n" +
        footer("Read/Write/Edit으로 못하는 시스템 작업을 처리")
    ),
    # 10: Bash 주요 명령어 (구 16)
    "10": lambda: wrap(
        badge(10) + "\n" +
        title("Bash  주요 명령어") + "\n" +
        sub("자주 쓰는 DOS / Shell 명령어") + "\n" +
        divider(212) + "\n" +
        label(264, "폴더 · 파일") + "\n" +
        body(306, "mkdir  폴더이름", mono=True, color="#374151") + "\n" +
        body(340, "cp  원본  대상    /    mv  원본  대상", mono=True, color="#374151") + "\n" +
        body(374, "rm  파일이름    /    rm -rf  폴더이름", mono=True, color="#374151") + "\n" +
        label(424, "실행 · 기타") + "\n" +
        body(464, "start  파일이름          (Windows 기본 앱으로 열기)", mono=True, color="#374151") + "\n" +
        body(498, "python  script.py    /    node  script.js", mono=True, color="#374151") + "\n" +
        footer_light("에이전트에게 원하는 동작을 말하면 명령어는 알아서 선택")
    ),
    # 11: 정리 (구 19)
    "11": lambda: wrap(
        badge(11) + "\n" +
        title("정리") + "\n" +
        divider(180) + "\n" +
        body(236, "CLAUDE.md     에이전트 정체성 · 규칙 정의", size=21, color="#171717") + "\n" +
        body(282, "/init              프로젝트 분석 후 CLAUDE.md 자동 생성", size=21, color="#171717") + "\n" +
        body(328, "/memory         현재 메모리 확인 · 편집", size=21, color="#171717") + "\n" +
        body(374, "Read             파일 읽기  (텍스트 · 이미지 · PDF)", size=21, color="#171717") + "\n" +
        body(420, "Write            새 파일 생성", size=21, color="#171717") + "\n" +
        body(466, "Edit              기존 파일 일부 수정", size=21, color="#171717") + "\n" +
        body(512, "Bash            시스템 명령어 실행", size=21, color="#171717") + "\n" +
        footer("에이전트는 파일을 읽고 · 쓰고 · 고치고 · 실행합니다")
    ),
    # 12: 다음 단계 (구 20)
    "12": lambda: wrap(
        badge(12) + "\n" +
        title("다음 단계") + "\n" +
        sub("Basic 03 — 이미지 생성과 문서 자동화") + "\n" +
        divider(212) + "\n" +
        label(264, "NEXT") + "\n" +
        body(308, "에이전트로 이미지 생성하기") + "\n" +
        body(354, "Markdown 문서를 PDF로 변환하기") + "\n" +
        body(400, "반복 작업을 자동화하기") + "\n" +
        footer_light("오늘 실습한 파일 툴이 자동화의 기반이 됩니다")
    ),
    # 13: 마무리 (구 21)
    "13": lambda: wrap(
        badge(13) + "\n" +
        f'  <text x="640" y="340" text-anchor="middle" font-family="{FONT}" '
        f'font-size="48" font-weight="700" fill="#171717">수고하셨습니다</text>\n'
        f'  <text x="640" y="400" text-anchor="middle" font-family="{FONT}" '
        f'font-size="20" fill="#6b7280">BASIC 02 완료</text>'
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
