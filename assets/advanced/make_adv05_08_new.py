import os

BASE = os.path.dirname(os.path.abspath(__file__))
F = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
M = "Consolas,'Courier New',monospace"

def write(rel, content):
    path = os.path.join(BASE, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {rel}")

def svg_open():
    return '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n  <rect width="1280" height="720" fill="#ffffff"/>'

def badge(label):
    w = max(78, len(label) * 7 + 20)
    cx = 60 + w // 2
    return f'  <rect x="60" y="44" width="{w}" height="24" rx="12" fill="#2563eb"/>\n  <text x="{cx}" y="60" text-anchor="middle" font-family="{F}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">{label}</text>'

def title_block(label, title, sub):
    return f"""{svg_open()}
{badge(label)}
  <text x="60" y="130" font-family="{F}" font-size="40" font-weight="700" fill="#171717">{title}</text>
  <text x="60" y="178" font-family="{F}" font-size="19" fill="#6b7280">{sub}</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>"""

def bottom(text, bg="#eff6ff", tc="#2563eb"):
    return f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="{bg}"/>\n  <text x="640" y="599" text-anchor="middle" font-family="{F}" font-size="15" fill="{tc}">{text}</text>\n</svg>'

def label(y, text):
    return f'  <text x="60" y="{y}" font-family="{F}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">{text}</text>'

def t(y, text, size=19, color="#374151", x=60):
    return f'  <text x="{x}" y="{y}" font-family="{F}" font-size="{size}" fill="{color}">{text}</text>'

def div(y):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'

def code_box(x, y, w, h):
    return f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>'

def ct(x, y, text, size=13):
    return f'  <text x="{x}" y="{y}" font-family="{M}" font-size="{size}" fill="#374151">{text}</text>'

def card3(y, h, labels, descs):
    cw = 360
    gap = 40
    out = []
    for i, (lbl, desc) in enumerate(zip(labels, descs)):
        cx = 60 + i * (cw + gap)
        out.append(f'  <rect x="{cx}" y="{y}" width="{cw}" height="{h}" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>')
        out.append(f'  <text x="{cx+20}" y="{y+32}" font-family="{F}" font-size="15" font-weight="700" fill="#171717">{lbl}</text>')
        out.append(f'  <text x="{cx+20}" y="{y+58}" font-family="{F}" font-size="13" fill="#6b7280">{desc}</text>')
    return "\n".join(out)

def arrow_flow(y, steps):
    out = []
    sw = (1160 - (len(steps)-1)*20) // len(steps)
    for i, step in enumerate(steps):
        sx = 60 + i * (sw + 20)
        bg = "#2563eb" if i % 2 == 0 else "#f1f5f9"
        tc = "#ffffff" if i % 2 == 0 else "#374151"
        out.append(f'  <rect x="{sx}" y="{y}" width="{sw}" height="52" rx="8" fill="{bg}"/>')
        out.append(f'  <text x="{sx + sw//2}" y="{y+30}" text-anchor="middle" font-family="{F}" font-size="13" font-weight="600" fill="{tc}">{step}</text>')
        if i < len(steps) - 1:
            ax = sx + sw + 4
            out.append(f'  <text x="{ax}" y="{y+32}" font-family="{F}" font-size="18" fill="#9ca3af">→</text>')
    return "\n".join(out)

# ===========================================================================
# ADV 05: Notion DB 연동 기초 + 워크플로우 설계
# ===========================================================================

adv05_01 = f"""{title_block("ADV 05", "Notion DB 연동 기초  +  워크플로우 설계", "Notion을 작업 큐로 활용하는 AI 워크플로우를 만듭니다")}
{label(264, "TODAY")}
{t(308, "Notion DB 폴링 구조  /  CLAUDE.md 트리거 — 워크플로우 진입점")}
{t(354, "워크플로우 DB 설계 패턴  /  실습 — 미니 워크플로우 만들기")}
{bottom("ADV 06 Notion MCP를 워크플로우에 연결합니다")}"""

adv05_02 = f"""{title_block("ADV 05", "Notion DB 폴링  —  대기 항목 감지", "notion-query로 상태=할일 항목을 주기적으로 확인합니다")}
{label(256, "폴링 구조")}
{t(290, "notion-query 필터로 대기 항목 조회  →  처리  →  상태를 완료로 업데이트")}
{code_box(60, 308, 1160, 36)}
{ct(76, 331, "python notion_query.py ai-tasks -f '상태=할일' -c '이름,내용'")}
{div(364)}
{label(400, "주기 실행")}
{code_box(60, 416, 560, 120)}
{ct(76, 438, "import time")}
{ct(76, 458, "while True:")}
{ct(96, 478, "tasks = poll_tasks()")}
{ct(96, 498, "if tasks: run_workflow(tasks)")}
{ct(96, 518, "time.sleep(60)  # 60초 대기")}
{t(554, "항목이 없으면 60초 대기 / 있으면 즉시 처리", size=17, color="#6b7280")}
{bottom("항목이 없으면 60초 대기, 있으면 즉시 처리합니다")}"""

adv05_03 = f"""{title_block("ADV 05", "CLAUDE.md 트리거  —  워크플로우 자동 진입", "태스크 이름의 키워드로 담당 워크플로우를 결정합니다")}
{label(256, "키워드 → 워크플로우 매핑")}
  <rect x="60" y="272" width="1160" height="68" rx="8" fill="#eff6ff"/>
  <text x="80" y="300" font-family="{F}" font-size="16" font-weight="700" fill="#2563eb">리서치:</text>
  <text x="180" y="300" font-family="{F}" font-size="16" fill="#374151">태스크 이름이 이 키워드로 시작하면 → 리서치 자동화 워크플로우 (ADV 06)</text>
  <text x="80" y="326" font-family="{F}" font-size="16" font-weight="700" fill="#2563eb">카드뉴스:</text>
  <text x="200" y="326" font-family="{F}" font-size="16" fill="#374151">→ 인스타 카드뉴스 워크플로우 (ADV 07)</text>
{div(360)}
{label(396, "CLAUDE.md 작성 예시")}
{code_box(60, 412, 1160, 100)}
{ct(76, 434, "태스크 이름이 '리서치:'로 시작하면 research_workflow.py를 실행한다.")}
{ct(76, 454, "태스크 이름이 '카드뉴스:'로 시작하면 cardnews_workflow.py를 실행한다.")}
{ct(76, 474, "태스크 이름이 '보고서:'로 시작하면 report_workflow.py를 실행한다.")}
{ct(76, 494, "작업 완료 후 Notion Tasks 상태를 '완료'로 업데이트한다.")}
{bottom("Notion 태스크 이름에 키워드를 붙이면 워크플로우가 자동으로 선택됩니다")}"""

adv05_04 = f"""{title_block("ADV 05", "워크플로우 DB 설계  —  입력·처리·출력", "역할별로 Notion DB를 분리합니다")}
{label(256, "3단 구조")}
{card3(272, 110,
    ["입력 DB  —  Tasks", "처리  —  Claude 에이전트", "출력 DB  —  Docs / Reports"],
    ["할일 / 진행중 / 완료 상태 관리", "CLAUDE.md 트리거로 워크플로우 선택", "리서치·콘텐츠·보고서 결과 저장"]
)}
{div(408)}
{label(444, "실전 예시")}
{t(478, "Tasks DB: '리서치: AI 에이전트 동향'  →  Claude 실행  →  Docs DB에 결과 페이지 생성")}
{t(518, "Tasks DB: '보고서: 주간 보고'  →  Claude 분석 + PPT 생성  →  Reports DB에 저장")}
{bottom("DB 분리로 어떤 작업이 어디까지 진행됐는지 투명하게 파악합니다")}"""

adv05_05 = f"""{title_block("ADV 05", "실습  —  미니 워크플로우 만들기", "Notion Tasks DB를 감지해서 Claude가 자동 처리하는 구조를 만듭니다")}
{label(256, "실습 순서")}
{t(290, "1   Notion Tasks DB 생성  (이름 / 상태 / 내용  컬럼)")}
{t(330, "2   notion-query 폴링 스크립트 작성  (60초 주기)")}
{t(370, "3   CLAUDE.md 트리거 키워드 설정  (리서치: / 카드뉴스: / 보고서:)")}
{t(410, "4   테스트 태스크 등록  →  자동 실행 확인  →  상태 완료 업데이트 확인")}
{div(450)}
{label(480, "체크포인트")}
{t(510, "폴링 스크립트가 60초마다 대기 항목을 감지하는가?")}
{t(546, "키워드에 따라 올바른 워크플로우가 호출되는가?")}
{bottom("이 기초 구조 위에 ADV 06~08 실전 워크플로우를 쌓습니다")}"""

# ===========================================================================
# ADV 06: 워크플로우 1 — 리서치 자동화
# ===========================================================================

adv06_01 = f"""{title_block("ADV 06", "워크플로우 1  —  리서치 자동화", "Notion에 주제를 등록하면 Claude가 자동으로 조사하고 결과를 저장합니다")}
{label(264, "TODAY")}
{t(308, "전체 흐름  /  Notion Tasks 폴링  /  claude -p 조사 실행")}
{t(354, "결과를 Notion Docs DB에 저장  /  실습")}
{bottom("ADV 04 네이버 API, ADV 05 폴링 구조를 재사용합니다")}"""

adv06_02 = f"""{title_block("ADV 06", "리서치 워크플로우  —  전체 흐름", "5단계 자동화 파이프라인")}
{label(256, "단계별 흐름")}
{t(290, "1   Notion Tasks DB에  '리서치: {{주제}}'  등록  (상태=할일)")}
{t(330, "2   폴링 스크립트가 대기 항목 감지  (ADV 05 구조 재사용)")}
{t(370, "3   claude -p 조사 실행  (네이버 뉴스 API Skill 포함  —  ADV 04 재사용)")}
{t(410, "4   조사 결과를 Notion Docs DB에 마크다운 페이지로 자동 저장")}
{t(450, "5   Tasks DB 상태를  '완료'로 업데이트")}
{div(490)}
{t(524, "주제를 Notion에 등록하면 10분 내 조사 결과가 Docs에 자동 저장됩니다", size=16, color="#6b7280")}
{bottom("한 번 구축하면 주제만 등록해도 조사가 자동으로 실행됩니다")}"""

adv06_03 = f"""{title_block("ADV 06", "claude -p 조사 실행  —  프롬프트 설계", "ADV 04에서 만든 네이버 API Skill을 포함한 조사 프롬프트를 만듭니다")}
{label(252, "조사 프롬프트 패턴")}
{code_box(60, 268, 1160, 160)}
{ct(76, 290, "topic = '리서치: AI 에이전트 최신 동향'  # Notion Tasks에서 읽어온 값")}
{ct(76, 310, "")}
{ct(76, 330, "prompt = f'''")}
{ct(96, 350, "주제: {topic}")}
{ct(96, 370, "1. 네이버 뉴스 API로 최신 기사 5개 수집  (ADV 04 Skill 재사용)")}
{ct(96, 390, "2. 핵심 내용 요약 500자 이내")}
{ct(96, 410, "3. 인사이트 3가지  →  마크다운으로 출력")}
{ct(76, 428, "'''")}
{div(448)}
{label(472, "실행 코드")}
{code_box(60, 488, 1160, 52)}
{ct(76, 510, "result = subprocess.run(['claude', '-p', prompt], capture_output=True, text=True, encoding='utf-8').stdout")}
{bottom("ADV 04 네이버 검색 API Skill을 그대로 재사용합니다")}"""

adv06_04 = f"""{title_block("ADV 06", "조사 결과  —  Notion Docs DB 저장", "notion-create-pages로 결과 페이지를 자동 생성합니다")}
{label(252, "저장 구조")}
{t(286, "페이지명: 조사 주제  /  프로젝트 relation: Tasks DB 항목 연결  /  내용: 조사 결과 마크다운")}
{div(314)}
{label(344, "Notion MCP 호출 패턴")}
{code_box(60, 360, 1160, 130)}
{ct(76, 382, "# mcp__notion__notion-create-pages 사용")}
{ct(76, 402, "mcp__notion__notion-create-pages:")}
{ct(96, 422, "data_source_id = 'Docs DB ID'")}
{ct(96, 442, "properties:")}
{ct(116, 462, "Name: topic           # 조사 주제")}
{ct(116, 482, "Status: 'active'      # 저장 상태")}
{ct(96, 502, "content: research_result   # claude -p 결과")}
{t(530, "Notion MCP는 ADV 06 MCP 강의에서 설치한 것을 그대로 사용합니다", size=16, color="#6b7280")}
{bottom("Notion Docs DB에 자동으로 조사 결과 페이지가 생성됩니다")}"""

adv06_05 = f"""{title_block("ADV 06", "실습  —  리서치 자동화 파이프라인 구축", "주제를 등록하면 조사 결과가 Notion에 자동 저장되는 파이프라인을 만듭니다")}
{label(256, "실습 순서")}
{t(290, "1   Notion Tasks DB에  '리서치: AI 에이전트 최신 동향'  등록")}
{t(330, "2   ADV 05 폴링 스크립트 실행  →  대기 항목 감지 확인")}
{t(370, "3   claude -p 조사 자동 실행 확인  (ADV 04 네이버 API Skill 포함)")}
{t(410, "4   Notion Docs DB에 결과 페이지 자동 생성 확인")}
{t(450, "5   Tasks DB 상태가 '완료'로 업데이트됐는지 확인")}
{div(490)}
{t(524, "ADV 07에서는 이 구조를 응용해 인스타 카드뉴스를 만듭니다", size=16, color="#6b7280")}
{bottom("완료 후 Notion Docs에 조사 결과 페이지가 자동 생성됩니다")}"""

# ===========================================================================
# ADV 07: 워크플로우 2 — 인스타 카드뉴스 자동 생성
# ===========================================================================

adv07_01 = f"""{title_block("ADV 07", "워크플로우 2  —  인스타 카드뉴스 자동 생성", "Notion에 주제를 등록하면 카드뉴스 이미지를 자동으로 만듭니다")}
{label(264, "TODAY")}
{t(308, "전체 흐름  /  Notion 콘텐츠 DB 구조  /  카드 텍스트 생성")}
{t(354, "python-pptx 1080×1080 카드 이미지 생성  /  실습")}
{bottom("ADV 01 python-pptx, ADV 04 Pexels API를 재사용합니다")}"""

adv07_02 = f"""{title_block("ADV 07", "인스타 카드뉴스 워크플로우  —  전체 흐름", "주제 등록 → 텍스트 → 이미지 → 카드 생성 → Notion 저장")}
{label(256, "5단계 파이프라인")}
{t(290, "1   Notion 콘텐츠 DB에 주제 / 키워드 등록  (상태=할일)")}
{t(330, "2   Claude가 5~7장 카드 텍스트 작성  (JSON 형식으로 출력)")}
{t(370, "3   Pexels API로 주제 관련 배경 이미지 수집  (ADV 04 Skill 재사용)")}
{t(410, "4   python-pptx로 1080×1080 정방형 카드 이미지 생성  (ADV 01 Skill 재사용)")}
{t(450, "5   완성 카드셋을 Notion 콘텐츠 DB 페이지에 저장")}
{div(490)}
{t(524, "콘텐츠 DB 컬럼: 주제 / 키워드 / 카드 수 / 상태", size=16, color="#6b7280")}
{bottom("ADV 01 + ADV 04 Skills를 조합해 새 워크플로우를 만듭니다")}"""

adv07_03 = f"""{title_block("ADV 07", "Claude가 카드 텍스트를 작성합니다", "인스타 카드뉴스 포맷으로 구조화된 텍스트를 생성합니다")}
{label(252, "카드뉴스 프롬프트 패턴")}
{code_box(60, 268, 1160, 190)}
{ct(76, 292, "prompt = f'''")}
{ct(96, 312, "주제: {topic}  /  키워드: {keywords}")}
{ct(96, 332, "인스타 카드뉴스 5장을 JSON 배열로 만들어줘.")}
{ct(96, 352, "카드 1: 훅 (제목 15자 이내 · 본문 2줄 이내)")}
{ct(96, 372, "카드 2~4: 핵심 내용 (제목 15자 이내 · 본문 3줄 이내)")}
{ct(96, 392, "카드 5: 행동 유도 CTA")}
{ct(96, 412, "출력 형식: [{{'title': '...', 'body': '...'}}]")}
{ct(76, 432, "'''")}
{ct(76, 452, "cards = json.loads(subprocess.run(['claude', '-p', prompt], ...).stdout)")}
{bottom("짧고 임팩트 있게 / 각 카드는 독립적으로 읽혀야 합니다")}"""

adv07_04 = f"""{title_block("ADV 07", "python-pptx로 1080×1080 카드 이미지 생성", "ADV 01 python-pptx Skill을 정방형 카드용으로 수정합니다")}
{label(252, "1080×1080 정방형 설정 + 카드 생성")}
{code_box(60, 268, 1160, 220)}
{ct(76, 292, "from pptx import Presentation")}
{ct(76, 312, "from pptx.util import Emu, Pt")}
{ct(76, 332, "")}
{ct(76, 352, "prs = Presentation()")}
{ct(76, 372, "prs.slide_width  = Emu(9144000)   # 1080px 정방형")}
{ct(76, 392, "prs.slide_height = Emu(9144000)")}
{ct(76, 412, "")}
{ct(76, 432, "for card in cards:")}
{ct(96, 452, "slide = prs.slides.add_slide(blank_layout)")}
{ct(96, 472, "add_bg_image(slide, pexels_img)   # ADV 04 Pexels API 재사용")}
{ct(96, 492, "add_text_overlay(slide, card['title'], card['body'])")}
{bottom("ADV 01 python-pptx Skill  +  ADV 04 Pexels API Skill 재사용")}"""

adv07_05 = f"""{title_block("ADV 07", "완성 카드셋 Notion 저장  +  실습", "생성된 카드 파일을 Notion 콘텐츠 DB 페이지에 저장합니다")}
{label(256, "실습 순서")}
{t(290, "1   Notion 콘텐츠 DB 생성  (주제 / 키워드 / 카드 수 / 상태)")}
{t(330, "2   주제 등록  →  Claude 카드 텍스트 자동 생성 확인")}
{t(370, "3   Pexels API로 배경 이미지 수집  +  python-pptx 카드 생성")}
{t(410, "4   생성된 카드 파일 Notion 콘텐츠 DB 페이지에 저장")}
{t(450, "5   ADV 08 보고서 자동화로 이어집니다")}
{div(490)}
{t(524, "인스타그램에 업로드 가능한 1080×1080 카드셋이 Notion에 저장됩니다", size=16, color="#6b7280")}
{bottom("완료 후 인스타그램 업로드 가능한 카드셋이 Notion에 저장됩니다")}"""

# ===========================================================================
# ADV 08: 워크플로우 3 — 보고서 자동 생성
# ===========================================================================

adv08_01 = f"""{title_block("ADV 08", "워크플로우 3  —  보고서 자동 생성", "Notion DB 데이터를 집계·분석해서 PPT 보고서를 자동으로 만듭니다")}
{label(264, "TODAY")}
{t(308, "전체 흐름  /  Notion DB 데이터 집계  /  Claude 분석")}
{t(354, "python-pptx PPT 보고서 생성  /  Notion Reports DB 저장")}
{bottom("ADV 01 python-pptx, ADV 05~07 워크플로우 결과 데이터를 활용합니다")}"""

adv08_02 = f"""{title_block("ADV 08", "보고서 자동화  —  전체 흐름", "Notion DB → 집계 → 분석 → PPT → Reports 5단계")}
{label(256, "단계별 흐름")}
{t(290, "1   Notion Tasks DB에  '보고서: 주간 업무 보고'  등록")}
{t(330, "2   notion-query로 Tasks / Docs DB 데이터 집계  (완료 건수·작성 문서 수 등)")}
{t(370, "3   claude -p로 데이터 분석 및 인사이트 추출  (핵심 성과·이슈·다음 주 계획)")}
{t(410, "4   python-pptx로 임원 보고용 PPT 자동 생성  (ADV 01 Skill 재사용)")}
{t(450, "5   완성 보고서를 Notion Reports DB에 저장")}
{div(490)}
{t(524, "주간·월간 보고서를 Notion 등록 한 번으로 자동 생성할 수 있습니다", size=16, color="#6b7280")}
{bottom("주간·월간 보고서를 자동화할 수 있습니다")}"""

adv08_03 = f"""{title_block("ADV 08", "Notion DB 데이터 집계  —  notion-query", "여러 DB에서 데이터를 수집해서 보고서 소스를 만듭니다")}
{label(252, "집계 코드")}
{code_box(60, 268, 1160, 200)}
{ct(76, 292, "import subprocess")}
{ct(76, 312, "")}
{ct(76, 332, "def query(db, filters, cols):")}
{ct(96, 352, "r = subprocess.run(")}
{ct(116, 372, "['python', 'notion_query.py', db, '-f', filters, '-c', cols],")}
{ct(116, 392, "capture_output=True, text=True, encoding='utf-8'")}
{ct(96, 412, ")")}
{ct(96, 432, "return r.stdout")}
{ct(76, 452, "")}
{ct(76, 460, "tasks = query('ai-tasks', '상태=완료', '이름,담당자,완료일')   # 완료 태스크 집계")}
{bottom("ADV 05 폴링 구조를 데이터 집계 방식으로 응용합니다")}"""

adv08_04 = f"""{title_block("ADV 08", "Claude 분석  →  python-pptx PPT 보고서", "ADV 01 python-pptx Skill로 임원 보고용 PPT를 만듭니다")}
{label(252, "분석 + PPT 생성 코드")}
{code_box(60, 268, 1160, 210)}
{ct(76, 292, "# 1. Claude 데이터 분석")}
{ct(76, 312, "analysis = subprocess.run([")}
{ct(96, 332, "'claude', '-p',")}
{ct(96, 352, "f'다음 주간 데이터로 보고서 작성:\\n{tasks}\\n{docs}\\n'")}
{ct(96, 372, " '핵심 성과·이슈·다음 주 계획을 마크다운으로 작성'")}
{ct(76, 392, "], capture_output=True, text=True).stdout")}
{ct(76, 412, "")}
{ct(76, 432, "# 2. PPT 생성  (ADV 01 python-pptx Skill 재사용)")}
{ct(76, 452, "make_ppt(title='주간 업무 보고',")}
{ct(96, 472, "sections=parse_markdown(analysis),")}
{ct(96, 490, "output='weekly_report.pptx')")}
{bottom("ADV 01 python-pptx Skill을 보고서 자동화에 그대로 재사용합니다")}"""

adv08_05 = f"""{title_block("ADV 08", "Notion Reports DB 저장  +  심화 과정 완결", "완성 보고서를 저장하고 전체 커리큘럼을 마무리합니다")}
{label(252, "심화 과정 전체 정리")}
  <rect x="60" y="268" width="560" height="260" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>
  <text x="80" y="300" font-family="{F}" font-size="14" font-weight="700" fill="#9ca3af" letter-spacing="0.05em">SKILLS  (ADV 01~04)</text>
  <text x="80" y="328" font-family="{F}" font-size="15" fill="#374151">ADV 01  엑셀·워드·PPT·한글 문서 자동 작성</text>
  <text x="80" y="354" font-family="{F}" font-size="15" fill="#374151">ADV 02  웹 브라우저 자동화 (Playwright MCP)</text>
  <text x="80" y="380" font-family="{F}" font-size="15" fill="#374151">ADV 03  GWS CLI + Google Workspace</text>
  <text x="80" y="406" font-family="{F}" font-size="15" fill="#374151">ADV 04  외부 API 확장 (네이버·Pexels·TTS)</text>
  <rect x="660" y="268" width="560" height="260" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>
  <text x="680" y="300" font-family="{F}" font-size="14" font-weight="700" fill="#2563eb" letter-spacing="0.05em">WORKFLOWS  (ADV 05~08)</text>
  <text x="680" y="328" font-family="{F}" font-size="15" fill="#374151">ADV 05  워크플로우 기초 (Notion 폴링 + 트리거)</text>
  <text x="680" y="354" font-family="{F}" font-size="15" fill="#374151">ADV 06  워크플로우 1 — 리서치 자동화</text>
  <text x="680" y="380" font-family="{F}" font-size="15" fill="#374151">ADV 07  워크플로우 2 — 인스타 카드뉴스</text>
  <text x="680" y="406" font-family="{F}" font-size="15" fill="#374151">ADV 08  워크플로우 3 — 보고서 자동화</text>
{bottom("Skills를 조합해 나만의 Notion 기반 AI 워크플로우를 설계할 수 있습니다")}"""

# ===========================================================================
# 파일 쓰기
# ===========================================================================

files = [
    ("step05/01.svg", adv05_01),
    ("step05/02.svg", adv05_02),
    ("step05/03.svg", adv05_03),
    ("step05/04.svg", adv05_04),
    ("step05/05.svg", adv05_05),
    ("step06/01.svg", adv06_01),
    ("step06/02.svg", adv06_02),
    ("step06/03.svg", adv06_03),
    ("step06/04.svg", adv06_04),
    ("step06/05.svg", adv06_05),
    ("step07/01.svg", adv07_01),
    ("step07/02.svg", adv07_02),
    ("step07/03.svg", adv07_03),
    ("step07/04.svg", adv07_04),
    ("step07/05.svg", adv07_05),
    ("step08/01.svg", adv08_01),
    ("step08/02.svg", adv08_02),
    ("step08/03.svg", adv08_03),
    ("step08/04.svg", adv08_04),
    ("step08/05.svg", adv08_05),
]

for rel, content in files:
    write(rel, content)

print(f"\nDone: {len(files)} SVG files")
