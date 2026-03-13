import os, xml.etree.ElementTree as ET

base = "C:/woohee_dev/404_ai_agent_lecture/lecture/assets/basic/step02"
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

def header_basic(sublabel=None, sub_color="#f3f4f6", sub_tc="#6b7280"):
    h = '  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
    h += f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 02</text>'
    if sublabel:
        w = max(len(sublabel)*8+20, 52)
        cx = 150 + w//2
        h += f'\n  <rect x="150" y="44" width="{w}" height="24" rx="12" fill="{sub_color}" stroke="#d1d5db" stroke-width="1"/>'
        h += f'\n  <text x="{cx}" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="600" fill="{sub_tc}">{sublabel}</text>'
    return h

def title(text, y=130, size=36):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" font-weight="700" fill="#171717">{text}</text>'

def subtitle(text, y=178):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="19" fill="#6b7280">{text}</text>'

def divider(y):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'

def section_label(text, y):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">{text}</text>'

def step_box(y, num_text, label, body=None, bg="#f9fafb", border="#e5e7eb", h=60):
    parts = [
        f'  <rect x="60" y="{y}" width="1160" height="{h}" rx="12" fill="{bg}" stroke="{border}" stroke-width="1.5"/>',
        f'  <text x="88" y="{y+26}" font-family="{FONT}" font-size="14" font-weight="700" fill="#374151">{num_text}  {label}</text>',
    ]
    if body:
        parts.append(f'  <text x="88" y="{y+48}" font-family="{FONT}" font-size="13" fill="#6b7280">{body}</text>')
    return "\n".join(parts)

def footer_box(text, warn=False):
    bg = "#fef3c7" if warn else "#f3f4f6"
    tc = "#92400e" if warn else "#6b7280"
    border = ' stroke="#fde68a" stroke-width="1"' if warn else ""
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="{bg}"{border}/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="{tc}">{text}</text>'
    )

def wrap(parts):
    body = "\n".join(parts)
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n  <rect width="1280" height="720" fill="#ffffff"/>\n{body}\n</svg>'

# ─── 12.svg: CLAUDE.md 실습 ───
s12 = wrap([
    header_basic("실습", "#fef3c7", "#d97706"),
    title("CLAUDE.md 실습"),
    divider(160),
    step_box(175, "1", "claude 실행 후 '너는 누구야?' 질문", "현재 에이전트가 어떻게 자기소개하는지 확인"),
    step_box(248, "2", "CLAUDE.md 파일 생성 + 이름 / 말투 / 역할 작성", "/clear 후 다시 '너는 누구야?' 질문 — 변화 확인"),
    '  <rect x="60" y="321" width="1160" height="86" rx="12" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>',
    f'  <text x="88" y="345" font-family="{FONT}" font-size="13" font-weight="700" fill="#1d4ed8">이름과 말투를 넣는 이유</text>',
    f'  <text x="88" y="369" font-family="{FONT}" font-size="13" fill="#374151">대화가 길어지면 AI가 기억을 잃기 시작합니다</text>',
    f'  <text x="88" y="393" font-family="{FONT}" font-size="13" fill="#374151">이름을 잊거나 말투가 흐릿해지는 시점 = AI가 멍청해지는 신호</text>',
])
with open(f"{base}/12.svg", "w", encoding="utf-8") as f:
    f.write(s12)
print("12.svg OK")

# ─── 13.svg: /init 실습 ───
s13 = wrap([
    header_basic("실습", "#fef3c7", "#d97706"),
    title("/init 실습"),
    divider(160),
    step_box(175, "1", "실습 자료 다운로드", "액션박스 링크에서 자료를 받아 작업 폴더에 넣기"),
    step_box(248, "2", "기존 CLAUDE.md 삭제", "작업 폴더에서 CLAUDE.md 파일을 삭제"),
    step_box(321, "3", "/init 실행", "Claude가 폴더를 분석해 CLAUDE.md 초안 자동 생성"),
    '  <rect x="60" y="400" width="1160" height="60" rx="12" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>',
    f'  <text x="88" y="424" font-family="{FONT}" font-size="13" font-weight="700" fill="#16a34a">확인 포인트</text>',
    f'  <text x="88" y="448" font-family="{FONT}" font-size="13" fill="#374151">생성된 CLAUDE.md 를 열어서 프로젝트 분석 결과 확인</text>',
])
with open(f"{base}/13.svg", "w", encoding="utf-8") as f:
    f.write(s13)
print("13.svg OK")

# ─── 14.svg: .claude/rules/ ───
s14 = wrap([
    header_basic(),
    title(".claude/rules/"),
    subtitle("CLAUDE.md 외에 규칙을 별도 파일로 분리해 관리합니다"),
    divider(212),
    section_label("구조", 252),
    f'  <text x="60" y="292" font-family="{FONT}" font-size="18" fill="#374151">.claude/rules/code-style.md   &#8212; 코드 스타일 규칙</text>',
    f'  <text x="60" y="334" font-family="{FONT}" font-size="18" fill="#374151">.claude/rules/security.md      &#8212; 보안 요구사항</text>',
    divider(372),
    section_label("조건부 로드 (paths)", 412),
    f'  <text x="60" y="452" font-family="{FONT}" font-size="18" fill="#374151">파일 상단에  paths: [&quot;src/**/*.ts&quot;]  를 지정하면</text>',
    f'  <text x="60" y="494" font-family="{FONT}" font-size="18" fill="#374151">해당 파일 타입 작업 시에만 규칙이 로드됩니다</text>',
    footer_box("개인 규칙은 ~/.claude/rules/ 에 저장하면 모든 프로젝트에 적용"),
])
with open(f"{base}/14.svg", "w", encoding="utf-8") as f:
    f.write(s14)
print("14.svg OK")

# ─── 15.svg: Read 실습 ───
s15 = wrap([
    header_basic("실습", "#fef3c7", "#d97706"),
    title("Read 실습"),
    divider(160),
    step_box(175, "1", "파일 읽기", "'CLAUDE.md 파일 내용을 읽어서 요약해줘'"),
    step_box(248, "2", "이미지 분석", "이미지 파일을 드래그 후 '이 이미지를 설명해줘'"),
    step_box(321, "3", "PDF 읽기 (선택)", "PDF 파일 드래그 후 '이 PDF 핵심 내용 3가지 정리해줘'"),
    footer_box("Read 툴은 에이전트가 자동 판단 — 파일 이름이나 경로를 말하면 됩니다"),
])
with open(f"{base}/15.svg", "w", encoding="utf-8") as f:
    f.write(s15)
print("15.svg OK")

# ─── 16.svg: Write 실습 ───
s16 = wrap([
    header_basic("실습", "#fef3c7", "#d97706"),
    title("Write 실습"),
    divider(160),
    step_box(175, "1", "새 파일 생성", "'hello.txt 파일을 만들고 나에 대한 자기소개를 적어줘'"),
    step_box(248, "2", "생성 확인", "VS Code 탐색기에서 hello.txt 파일이 생성된 것 확인"),
    step_box(321, "3", "내용 확인", "'hello.txt 파일 내용을 읽어줘' &#8212; Read 툴로 검증"),
    footer_box("기존 파일이 있으면 덮어씁니다 &#8212; 수정은 Edit 툴을 사용", warn=True),
])
with open(f"{base}/16.svg", "w", encoding="utf-8") as f:
    f.write(s16)
print("16.svg OK")

# ─── 17.svg: Edit 실습 ───
s17 = wrap([
    header_basic("실습", "#fef3c7", "#d97706"),
    title("Edit 실습"),
    divider(160),
    step_box(175, "1", "파일 일부 수정", "'hello.txt 첫 줄을 수정된 첫 줄로 바꿔줘'"),
    step_box(248, "2", "수정 결과 확인", "'hello.txt 파일 내용을 읽어줘' &#8212; 변경된 내용 확인"),
    step_box(321, "3", "CLAUDE.md 수정", "'CLAUDE.md 에 항상 반말로 대화 규칙 한 줄 추가해줘'"),
    footer_box("Edit은 파일 전체가 아닌 특정 부분만 정확하게 교체합니다"),
])
with open(f"{base}/17.svg", "w", encoding="utf-8") as f:
    f.write(s17)
print("17.svg OK")

# ─── 18.svg: Bash 실습 ───
s18 = wrap([
    header_basic("실습", "#fef3c7", "#d97706"),
    title("Bash 실습"),
    divider(160),
    step_box(175, "1", "폴더 생성 + 파일 생성", "'practice 폴더를 만들고 그 안에 note.txt 파일을 생성해줘'"),
    step_box(248, "2", "파일 복사", "'note.txt 를 복사해서 backup.txt 로 저장해줘'"),
    step_box(321, "3", "파일 실행 (선택)", "'start hello.txt 명령어를 실행해서 파일을 열어줘'"),
    footer_box("Bash 명령어를 몰라도 됩니다 &#8212; 원하는 동작을 말로 설명하면 됩니다"),
])
with open(f"{base}/18.svg", "w", encoding="utf-8") as f:
    f.write(s18)
print("18.svg OK")

# ─── XML 검증 ───
print("\n--- XML 검증 ---")
for fn in ["04.svg","05.svg","12.svg","13.svg","14.svg","15.svg","16.svg","17.svg","18.svg"]:
    try:
        ET.parse(f"{base}/{fn}")
        print(f"{fn} OK")
    except Exception as e:
        print(f"{fn} ERROR: {e}")
