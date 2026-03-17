import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

# ── 01.svg: 목차 수정 ──────────────────────────────────────────
svg01 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 01</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">엑셀 · 워드 · PPT · 한글 문서 자동 작성</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">로컬 Python Skills로 4종 오피스 문서를 자동 생성합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">TODAY</text>
  <text x="60" y="308" font-family="{FONT}" font-size="19" fill="#374151">엑셀 분석 Skill (openpyxl)  /  워드 보고서 Skill (python-docx)</text>
  <text x="60" y="354" font-family="{FONT}" font-size="19" fill="#374151">PPT 생성 Skill (python-pptx)  /  한글 문서 Skill (pyhwpx)</text>
  <text x="60" y="400" font-family="{FONT}" font-size="19" fill="#374151">4종 파이프라인 연결</text>
  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">VSCode 터미널 환경에서 진행합니다</text>
</svg>"""

# ── 04.svg: PPT Skill ─────────────────────────────────────────
svg04 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 01</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">PPT Skill  —  python-pptx</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">프레젠테이션 파일을 Python으로 자동 생성합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">설치</text>
  <text x="60" y="308" font-family="{MONO}" font-size="19" fill="#374151">pip install python-pptx</text>
  <line x1="60" y1="350" x2="1220" y2="350" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="390" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">핵심 코드</text>
  <text x="60" y="430" font-family="{MONO}" font-size="19" fill="#374151">prs = Presentation()</text>
  <text x="60" y="466" font-family="{MONO}" font-size="19" fill="#374151">slide = prs.slides.add_slide(prs.slide_layouts[5])</text>
  <text x="60" y="502" font-family="{MONO}" font-size="19" fill="#374151">tf = slide.shapes.add_textbox(Inches(1), Inches(1), Inches(8), Inches(2))</text>
  <text x="60" y="538" font-family="{MONO}" font-size="19" fill="#374151">tf.text_frame.text = "내용"  /  prs.save("out.pptx")</text>
  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">import: from pptx import Presentation  /  from pptx.util import Inches, Pt</text>
</svg>"""

# ── 05.svg: HWPX Skill ────────────────────────────────────────
svg05 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 01</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">한글 문서 Skill  —  pyhwpx</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">.hwpx 파일을 Python으로 자동 생성합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">설치</text>
  <text x="60" y="308" font-family="{MONO}" font-size="19" fill="#374151">pip install pyhwpx</text>
  <line x1="60" y1="350" x2="1220" y2="350" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="390" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">핵심 코드</text>
  <text x="60" y="430" font-family="{MONO}" font-size="19" fill="#374151">hwp = Hwp()                       # 한글 앱 실행</text>
  <text x="60" y="466" font-family="{MONO}" font-size="19" fill="#374151">hwp.write_text("내용")             # 텍스트 입력</text>
  <text x="60" y="502" font-family="{MONO}" font-size="19" fill="#374151">hwp.save_as("report.hwpx")        # .hwpx 저장</text>
  <text x="60" y="538" font-family="{MONO}" font-size="19" fill="#374151">hwp.quit()                        # 앱 종료</text>
  <rect x="60" y="568" width="880" height="52" rx="10" fill="#fef3c7"/>
  <text x="500" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#92400e">한글 또는 폴라리스 오피스 설치 필요 (Windows 전용)</text>
  <rect x="960" y="568" width="360" height="52" rx="10" fill="#171717"/>
  <text x="1000" y="587" font-family="{FONT}" font-size="11" fill="#9ca3af">폴라리스 오피스 다운로드</text>
  <text x="1000" y="609" font-family="{FONT}" font-size="13" fill="#818cf8">polarisoffice.com/ko/download</text>
</svg>"""

# ── 06.svg: 파이프라인 연결 (4종) ─────────────────────────────
svg06 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 01</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">4종 파이프라인 연결</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">Skill들을 연결해 에이전트 명령 하나로 실행합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">흐름</text>
  <text x="60" y="308" font-family="{FONT}" font-size="19" fill="#374151">1.  엑셀 Skill  :  data.xlsx 읽기  →  데이터 추출</text>
  <text x="60" y="350" font-family="{FONT}" font-size="19" fill="#374151">2.  워드 Skill  :  추출 데이터  →  report.docx 생성</text>
  <text x="60" y="392" font-family="{FONT}" font-size="19" fill="#374151">3.  PPT Skill   :  핵심 내용  →  summary.pptx 생성</text>
  <text x="60" y="434" font-family="{FONT}" font-size="19" fill="#374151">4.  한글 Skill  :  본문  →  report.hwpx 생성</text>
  <line x1="60" y1="464" x2="1220" y2="464" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="504" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">에이전트 명령</text>
  <text x="60" y="542" font-family="{FONT}" font-size="18" fill="#374151">"data.xlsx 를 읽어 워드·PPT·한글 보고서를 모두 만들어줘"</text>
  <rect x="60" y="574" width="1160" height="52" rx="10" fill="#2563eb"/>
  <text x="640" y="605" text-anchor="middle" font-family="{FONT}" font-size="17" font-weight="600" fill="#ffffff">데이터 입력 하나로 4종 문서가 동시에 생성됩니다</text>
</svg>"""

files = {
    "01.svg": svg01,
    "04.svg": svg04,
    "05.svg": svg05,
    "06.svg": svg06,
}

for name, content in files.items():
    path = os.path.join(BASE, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {name}")
