import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def wrap(inner):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        + inner +
        '\n</svg>\n'
    )


def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 01</text>'
    )


def practice_badge():
    return (
        f'  <rect x="1100" y="44" width="120" height="24" rx="12" fill="#059669"/>\n'
        f'  <text x="1160" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">PRACTICE</text>'
    )


def divider(y):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'


def t_title(text, y=130, size=40):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="700" fill="#171717">{esc(text)}</text>'
    )


def t_sub(text, y=178):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="19" fill="#6b7280">{esc(text)}</text>'


def t_label(y, text):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="14" font-weight="600" '
        f'fill="#9ca3af" letter-spacing="0.08em">{esc(text)}</text>'
    )


def t_body(y, text, mono=False, size=19, color="#374151", x=60):
    ff = MONO if mono else FONT
    return f'  <text x="{x}" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{esc(text)}</text>'


def prompt_box(y, text):
    return (
        f'  <rect x="60" y="{y}" width="1160" height="52" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
        f'  <text x="640" y="{y + 31}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="18" font-weight="600" fill="#2563eb">{esc(text)}</text>'
    )


def step(y, num, text, size=18):
    return (
        f'  <circle cx="84" cy="{y - 6}" r="14" fill="#eff6ff"/>\n'
        f'  <text x="84" y="{y}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="13" font-weight="700" fill="#2563eb">{num}</text>\n'
        f'  <text x="110" y="{y}" font-family="{FONT}" font-size="{size}" fill="#374151">{esc(text)}</text>'
    )


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


def footer_green(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#059669"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="17" font-weight="600" fill="#ffffff">{esc(text)}</text>'
    )


def footer_light_green(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#ecfdf5"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#059669">{esc(text)}</text>'
    )


def download_hint(y, filename):
    """하단 다운로드 힌트 (실습 슬라이드용 — 실제 버튼은 index.html action으로)"""
    return (
        f'  <rect x="60" y="{y}" width="560" height="40" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="84" y="{y + 24}" font-family="{FONT}" font-size="14" fill="#059669">'
        f'↓  {esc(filename)}</text>'
    )


# ─── 01.svg: 목차 ────────────────────────────────────────────────────────────
def slide01():
    return wrap(
        badge() + "\n" +
        t_title("엑셀 · 워드 · PPT · 한글 문서 자동 작성") + "\n" +
        t_sub("4종 오피스 문서를 자동 생성하는 Python Skill을 만들고 실습합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "TODAY  —  기능 Skill + 실습 세트로 진행") + "\n" +
        t_body(308, "엑셀 분석 Skill (openpyxl)  →  실습: 매출데이터_템플릿.xlsx 분석") + "\n" +
        t_body(350, "워드 보고서 Skill (python-docx)  →  실습: 보고서_템플릿.docx 채우기") + "\n" +
        t_body(392, "PPT Skill (python-pptx)  →  실습: 주제 웹조사 후 회사 템플릿 PPT") + "\n" +
        t_body(434, "한글 Skill (python-hwpx)  →  실습: gonggong 템플릿 치환 보고서") + "\n" +
        t_body(476, "4종 파이프라인 연결  /  GitHub 레포 → Skill 자동 제작") + "\n" +
        footer_light("실습 전 템플릿 파일 3종을 미리 다운로드하세요")
    )


# ─── 02.svg: 엑셀 Skill ──────────────────────────────────────────────────────
def slide02():
    return wrap(
        badge() + "\n" +
        t_title("엑셀 분석 Skill  —  openpyxl") + "\n" +
        t_sub("매출데이터_템플릿.xlsx를 읽어 데이터를 분석합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "Claude에게 이렇게 요청하세요") + "\n" +
        prompt_box(278, '"openpyxl 설치하고 엑셀 파일 읽는 Skill 만들어줘"') + "\n" +
        divider(350) + "\n" +
        t_label(386, "핵심 코드") + "\n" +
        t_body(422, "wb = load_workbook('매출데이터_템플릿.xlsx')", mono=True) + "\n" +
        t_body(458, "ws = wb['매출 데이터']", mono=True) + "\n" +
        t_body(494, "for row in ws.iter_rows(min_row=5, values_only=True):", mono=True) + "\n" +
        t_body(530, "    print(row)  # No, 날짜, 거래처, 제품명, 매출액 ...", mono=True) + "\n" +
        footer_light("시트 구성: 매출 데이터 (35행) / 월별 요약 (15행) / 사용 안내")
    )


# ─── 08.svg: 엑셀 실습 ───────────────────────────────────────────────────────
def slide08():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("엑셀 분석 Skill — 실습", size=36) + "\n" +
        t_sub("매출데이터_템플릿.xlsx를 읽어 월별 합계·평균을 분석하세요") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "아래 템플릿 다운로드 후 매출 데이터 5건 이상 입력") + "\n" +
        step(358, "2", '"매출데이터_템플릿.xlsx 읽어서 월별 합계와 평균 분석해줘" 요청') + "\n" +
        step(408, "3", "분석 결과 확인 (월별 합계, 최대 거래처, 평균 매출액)") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"매출데이터_템플릿.xlsx 읽어서 월별 합계와 최대 거래처 분석해줘"') + "\n" +
        footer_light_green("↓  매출데이터_템플릿.xlsx  —  분석 결과를 화면에 보여주세요")
    )


# ─── 03.svg: 워드 Skill ──────────────────────────────────────────────────────
def slide03():
    return wrap(
        badge() + "\n" +
        t_title("워드 보고서 Skill  —  python-docx") + "\n" +
        t_sub("보고서_템플릿.docx 양식에 분석 결과를 자동으로 채웁니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "Claude에게 이렇게 요청하세요") + "\n" +
        prompt_box(278, '"python-docx 설치하고 워드 보고서 생성 Skill 만들어줘"') + "\n" +
        divider(350) + "\n" +
        t_label(386, "템플릿 치환 패턴") + "\n" +
        t_body(422, "doc = Document('보고서_템플릿.docx')", mono=True) + "\n" +
        t_body(458, "for p in doc.paragraphs:", mono=True) + "\n" +
        t_body(494, "    if '[보고서 제목]' in p.text:", mono=True) + "\n" +
        t_body(530, "        p.runs[0].text = '실제 보고서 제목'  /  doc.save('out.docx')", mono=True) + "\n" +
        footer_light("템플릿 구성: 표지·목차·개요·현황분석·결론 / 플레이스홀더 [  ] 방식")
    )


# ─── 09.svg: 워드 실습 ───────────────────────────────────────────────────────
def slide09():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("워드 보고서 Skill — 실습", size=36) + "\n" +
        t_sub("보고서 템플릿에 엑셀 분석 결과를 자동 입력하세요") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "보고서_템플릿.docx 다운로드 (표지·목차·본문 구성 확인)") + "\n" +
        step(358, "2", '"엑셀 분석 결과로 보고서_템플릿.docx 내용 채워서 보고서 만들어줘" 요청') + "\n" +
        step(408, "3", "생성된 보고서.docx 열어서 내용·표 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"엑셀 분석 결과를 바탕으로 보고서_템플릿.docx 양식에 맞게 보고서 만들어줘"') + "\n" +
        footer_light_green("↓  보고서_템플릿.docx  —  생성된 report.docx를 열어 보여주세요")
    )


# ─── 04.svg: PPT Skill ───────────────────────────────────────────────────────
def slide04():
    return wrap(
        badge() + "\n" +
        t_title("PPT Skill  —  python-pptx") + "\n" +
        t_sub("회사_범용_템플릿.pptx를 기반으로 발표 자료를 자동 생성합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "Claude에게 이렇게 요청하세요") + "\n" +
        prompt_box(278, '"python-pptx 설치하고 PPT 자동 생성 Skill 만들어줘"') + "\n" +
        divider(350) + "\n" +
        t_label(386, "템플릿 활용 패턴") + "\n" +
        t_body(422, "prs = Presentation('회사_범용_템플릿.pptx')", mono=True) + "\n" +
        t_body(458, "slide = prs.slides[3]  # 내용 슬라이드 (9장 구성)", mono=True) + "\n" +
        t_body(494, "for shape in slide.shapes:", mono=True) + "\n" +
        t_body(530, "    if shape.has_text_frame: shape.text_frame.text = '새 내용'", mono=True) + "\n" +
        footer_light("템플릿 9장: 표지·목차·섹션·내용·요약·데이터·로드맵·팀·마무리")
    )


# ─── 10.svg: PPT 실습 ────────────────────────────────────────────────────────
def slide10():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("PPT Skill — 실습", size=36) + "\n" +
        t_sub("주제를 웹조사하고 회사 템플릿으로 발표 자료를 만드세요") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "회사_범용_템플릿.pptx 다운로드 (9장 구성 확인)") + "\n" +
        step(358, "2", "주제 선정 (예: 2026 AI 트렌드 / 우리 팀 소개 / 프로젝트 현황)") + "\n" +
        step(408, "3", '"[주제] 웹조사해서 회사_범용_템플릿.pptx 기반으로 PPT 만들어줘" 요청') + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"2026 AI 트렌드 웹조사해서 회사_범용_템플릿.pptx 양식으로 발표자료 만들어줘"') + "\n" +
        footer_light_green("↓  회사_범용_템플릿.pptx  —  생성된 PPT를 열어 내용을 보여주세요")
    )


# ─── 05.svg: 한글 Skill (python-hwpx 전면 교체) ──────────────────────────────
def slide05():
    return wrap(
        badge() + "\n" +
        t_title("한글 Skill  —  python-hwpx") + "\n" +
        t_sub("gonggong 레포 템플릿 + ZIP-level 치환으로 .hwpx 보고서를 생성합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "Claude에게 이렇게 요청하세요") + "\n" +
        prompt_box(278, '"gonggong_hwpxskills 레포 클론하고 python-hwpx Skill 만들어줘"') + "\n" +
        divider(350) + "\n" +
        t_label(386, "4단계 워크플로우") + "\n" +
        t_body(422, "① report-template.hwpx  복사  →  ② ObjectFinder로 플레이스홀더 조사") + "\n" +
        t_body(462, "③ zip_replace() 로 치환  →  ④ fix_namespaces.py 후처리 (필수!)") + "\n" +
        divider(510) + "\n" +
        t_body(542, "설치: pip install python-hwpx") + "\n" +
        footer_light("github.com/Canine89/gonggong_hwpxskills  |  한글 앱 없이 동작")
    )


# ─── 11.svg: 한글 실습 ───────────────────────────────────────────────────────
def slide11():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("한글 Skill — 실습", size=36) + "\n" +
        t_sub("gonggong 템플릿으로 업무 보고서를 생성하세요") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"gonggong_hwpxskills 레포 클론하고 Skill 만들어줘" 요청') + "\n" +
        step(358, "2", '"assets/report-template.hwpx 기반으로 보고서 만들어줘 — 제목: [원하는 제목]"') + "\n" +
        step(408, "3", "생성된 report.hwpx 열어서 양식·내용 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"gonggong report-template.hwpx로 [주제] 보고서 만들어줘"') + "\n" +
        footer_light_green("생성된 .hwpx 파일을 폴라리스 오피스로 열어 보여주세요")
    )


# ─── 06.svg: 4종 파이프라인 ──────────────────────────────────────────────────
def slide06():
    return wrap(
        badge() + "\n" +
        t_title("4종 파이프라인 연결") + "\n" +
        t_sub("Skill들을 연결해 에이전트 명령 하나로 4종 문서를 동시에 생성합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "흐름") + "\n" +
        t_body(308, "1.  엑셀 Skill  :  매출데이터_템플릿.xlsx 읽기  →  데이터 추출") + "\n" +
        t_body(350, "2.  워드 Skill  :  추출 데이터  →  보고서_템플릿.docx 채우기") + "\n" +
        t_body(392, "3.  PPT Skill   :  핵심 내용  →  회사_범용_템플릿.pptx 발표자료") + "\n" +
        t_body(434, "4.  한글 Skill  :  분석 결과  →  gonggong report.hwpx 생성") + "\n" +
        divider(464) + "\n" +
        t_label(494, "에이전트 명령") + "\n" +
        t_body(530, '"매출 데이터 읽어서 워드·PPT·한글 보고서를 모두 만들어줘"') + "\n" +
        footer("데이터 입력 하나로 4종 문서가 동시에 생성됩니다")
    )


# ─── 12.svg: 파이프라인 실습 ─────────────────────────────────────────────────
def slide12():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("4종 파이프라인 — 실습", size=36) + "\n" +
        t_sub("명령 하나로 4종 문서를 동시에 생성하세요") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "매출데이터_템플릿.xlsx에 샘플 데이터 10행 입력") + "\n" +
        step(358, "2", '"엑셀 읽어서 워드·PPT·한글 보고서 모두 만들어줘" 요청') + "\n" +
        step(408, "3", "4종 파일(docx·pptx·hwpx) 모두 생성 확인 후 각각 열기") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"매출데이터_템플릿.xlsx 읽어서 워드, PPT, 한글 보고서를 모두 동시에 만들어줘"') + "\n" +
        footer_light_green("3종 파일이 모두 생성됐는지 보여주세요")
    )


# ─── 07.svg: GitHub → Skill 자동 제작 ────────────────────────────────────────
def slide07():
    return wrap(
        badge() + "\n" +
        t_title("GitHub 레포 → Skill 자동 제작") + "\n" +
        t_sub("URL과 목적만 알려주면 Claude가 코드를 분석하고 Skill을 만든다") + "\n" +
        divider(212) + "\n" +
        t_label(258, "프롬프트 예시") + "\n" +
        '  <rect x="60" y="272" width="1160" height="72" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="84" y="300" font-family="{MONO}" font-size="17" fill="#1e40af">https://github.com/neolord0/hwp2hwpx</text>\n'
        f'  <text x="84" y="330" font-family="{FONT}" font-size="17" fill="#374151">이 라이브러리를 참고해서 .hwp 파일을 .hwpx로 변환하는 Python Skill을 만들어줘</text>\n' +
        divider(368) + "\n" +
        t_label(406, "Claude가 하는 일") + "\n" +
        '  <rect x="60" y="420" width="360" height="100" rx="8" fill="#eff6ff"/>\n'
        f'  <text x="240" y="452" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">1. 레포 분석</text>\n'
        f'  <text x="240" y="478" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">GitHub 코드 구조 파악</text>\n'
        f'  <text x="240" y="500" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">라이브러리 사용법 이해</text>\n'
        f'  <text x="460" y="475" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#9ca3af">→</text>\n'
        '  <rect x="480" y="420" width="360" height="100" rx="8" fill="#eff6ff"/>\n'
        f'  <text x="660" y="452" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">2. 설계</text>\n'
        f'  <text x="660" y="478" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">subprocess로 호출 방식</text>\n'
        f'  <text x="660" y="500" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">Python Skill 구조 설계</text>\n'
        f'  <text x="880" y="475" text-anchor="middle" font-family="{FONT}" font-size="22" fill="#9ca3af">→</text>\n'
        '  <rect x="900" y="420" width="360" height="100" rx="8" fill="#eff6ff"/>\n'
        f'  <text x="1080" y="452" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">3. Skill 생성</text>\n'
        f'  <text x="1080" y="478" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">hwp_to_hwpx.py 자동 작성</text>\n'
        f'  <text x="1080" y="500" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">즉시 실행 가능한 상태로</text>\n' +
        '  <rect x="60" y="554" width="820" height="52" rx="10" fill="#171717"/>\n'
        f'  <text x="470" y="585" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="600" fill="#ffffff">라이브러리를 몰라도, 언어가 달라도 Skill로 만들 수 있다</text>\n'
        '  <rect x="900" y="554" width="360" height="52" rx="10" fill="#1e293b"/>\n'
        f'  <text x="920" y="574" font-family="{FONT}" font-size="11" fill="#9ca3af">GitHub 레포</text>\n'
        f'  <text x="920" y="596" font-family="{FONT}" font-size="12" fill="#818cf8">github.com/neolord0/hwp2hwpx</text>'
    )


# ─── 13.svg: GitHub 실습 ─────────────────────────────────────────────────────
def slide13():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("GitHub → Skill 자동 제작 — 실습", size=34) + "\n" +
        t_sub("hwp2hwpx URL을 주고 Claude가 Skill을 직접 만들도록 하세요") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "아래 프롬프트를 Claude에게 그대로 입력") + "\n" +
        step(358, "2", "Claude가 레포 분석 → Skill 코드 생성하는 과정 관찰") + "\n" +
        step(408, "3", "생성된 hwp_to_hwpx.py Skill 파일 내용 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"https://github.com/neolord0/hwp2hwpx 참고해서 .hwp를 .hwpx로 변환하는 Skill 만들어줘"') + "\n" +
        footer_light_green("Claude가 만든 Skill 코드를 보여주세요")
    )


# ─── 파일 생성 ───────────────────────────────────────────────────────────────
slides = {
    "01": slide01,
    "02": slide02,
    "03": slide03,
    "04": slide04,
    "05": slide05,
    "06": slide06,
    "07": slide07,
    "08": slide08,
    "09": slide09,
    "10": slide10,
    "11": slide11,
    "12": slide12,
    "13": slide13,
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {num}.svg")

print(f"\nDone. {len(slides)} slides generated.")
