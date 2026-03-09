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
        title("엑셀 & 워드 문서 자동 작성") + "\n" +
        sub("로컬 Python Skills로 데이터를 읽어 보고서를 자동 생성합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "문서 자동화 개요  /  엑셀 분석 Skill (openpyxl)") + "\n" +
        body(354, "워드 보고서 Skill (python-docx)  /  파이프라인 연결") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: 엑셀 분석 Skill
    "02": lambda: wrap(
        badge() + "\n" +
        title("엑셀 분석 Skill  —  openpyxl") + "\n" +
        sub("엑셀 파일을 읽어 데이터를 추출합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "설치") + "\n" +
        body(308, "pip install openpyxl", mono=True, color="#374151") + "\n" +
        divider(350) + "\n" +
        label(390, "핵심 코드") + "\n" +
        body(430, "wb = load_workbook('data.xlsx')", mono=True, color="#374151") + "\n" +
        body(466, "ws = wb.active", mono=True, color="#374151") + "\n" +
        body(502, "for row in ws.iter_rows(values_only=True):", mono=True, color="#374151") + "\n" +
        body(538, "    print(row)  # 각 행 데이터 처리", mono=True, color="#374151") + "\n" +
        footer_light("import: from openpyxl import load_workbook")
    ),
    # 03: 워드 보고서 Skill
    "03": lambda: wrap(
        badge() + "\n" +
        title("워드 보고서 Skill  —  python-docx") + "\n" +
        sub("분석 결과를 워드 문서로 자동 출력합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "설치") + "\n" +
        body(308, "pip install python-docx", mono=True, color="#374151") + "\n" +
        divider(350) + "\n" +
        label(390, "핵심 코드") + "\n" +
        body(430, "doc = Document()", mono=True, color="#374151") + "\n" +
        body(466, "doc.add_heading('분석 보고서', level=0)", mono=True, color="#374151") + "\n" +
        body(502, "doc.add_paragraph('내용')", mono=True, color="#374151") + "\n" +
        body(538, "doc.add_table(rows=3, cols=3)  /  doc.save('out.docx')", mono=True, color="#374151") + "\n" +
        footer_light("주의: import는 from docx import Document  (python-docx X)")
    ),
    # 04: 파이프라인 연결
    "04": lambda: wrap(
        badge() + "\n" +
        title("파이프라인 연결") + "\n" +
        sub("두 Skill을 연결해 에이전트 명령 하나로 실행합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "흐름") + "\n" +
        body(308, "1.  엑셀 Skill  :  data.xlsx 읽기  ->  데이터 추출") + "\n" +
        body(354, "2.  워드 Skill  :  추출 데이터  ->  report.docx 생성") + "\n" +
        divider(400) + "\n" +
        label(440, "에이전트 명령") + "\n" +
        body(484, '"data.xlsx 를 읽어서 분석 결과를 워드 보고서로 만들어줘"') + "\n" +
        body(528, "Claude가 두 Skill을 순서대로 조율해 실행") + "\n" +
        footer("데이터 입력 - 분석 - 문서 출력이 하나의 명령으로 완성됩니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
