import os

FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"
BASE = os.path.dirname(os.path.abspath(__file__))

# ── ADV 05 05.svg: 오늘의 핵심 텍스트가 파란 박스와 겹치는 문제 수정 ──
adv05_05 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 05</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">PPT 자동화  —  데이터  →  프레젠테이션</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">데이터 파일을 읽어 임원 보고용 PPT를 자동 생성합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">자동화 흐름</text>
  <text x="60" y="296" font-family="{FONT}" font-size="19" fill="#374151">데이터 파일(CSV/JSON)  →  Claude 분석  →  슬라이드 구성 설계</text>
  <text x="60" y="334" font-family="{FONT}" font-size="19" fill="#374151">python-pptx  →  템플릿 기반 슬라이드 자동 삽입  →  파일 저장</text>
  <line x1="60" y1="368" x2="1220" y2="368" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="408" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">실습 프롬프트</text>
  <rect x="60" y="422" width="1160" height="72" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="84" y="452" font-family="{MONO}" font-size="17" fill="#1e40af">sales_data.csv를 읽고 월별 실적을 분석해서</text>
  <text x="84" y="480" font-family="{MONO}" font-size="17" fill="#1e40af">임원 보고용 PPT를 자동으로 만들어줘</text>
  <line x1="60" y1="512" x2="1220" y2="512" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="548" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">오늘의 핵심</text>
  <text x="60" y="578" font-family="{FONT}" font-size="17" fill="#374151">트리거 키워드  /  문서 라우팅  /  headless 자동화  /  PPT 생성</text>
  <rect x="60" y="600" width="1160" height="52" rx="10" fill="#2563eb"/>
  <text x="640" y="631" text-anchor="middle" font-family="{FONT}" font-size="17" font-weight="600" fill="#ffffff">CLAUDE.md가 AI 에이전트의 두뇌 역할을 합니다</text>
</svg>"""

# ── ADV 06 03.svg: 하단 박스 추가 + 레이아웃 정리 ──
adv06_03 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 06</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">수집 단계  —  웹 크롤링  /  API</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">RSS · 공개 API · 웹 크롤링으로 트렌드 데이터를 수집합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">방법 1  —  RSS 피드 수집</text>
  <text x="60" y="294" font-family="{FONT}" font-size="19" fill="#374151">feedparser  —  뉴스·블로그 RSS를 구조화된 데이터로 파싱</text>
  <text x="60" y="328" font-family="{FONT}" font-size="19" fill="#374151">키워드 필터로 관심 분야만 추출  →  JSON 파일로 저장</text>
  <line x1="60" y1="358" x2="1220" y2="358" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="398" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">방법 2  —  공개 API 활용</text>
  <text x="60" y="434" font-family="{FONT}" font-size="19" fill="#374151">NewsAPI · GitHub Trending API · ADV 04 네이버 검색 API 재사용</text>
  <text x="60" y="468" font-family="{FONT}" font-size="19" fill="#374151">requests 라이브러리로 데이터 수집  →  pandas로 정리</text>
  <line x1="60" y1="498" x2="1220" y2="498" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="538" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">방법 3  —  웹 크롤링</text>
  <text x="60" y="572" font-family="{FONT}" font-size="19" fill="#374151">BeautifulSoup  /  Playwright  —  공개 페이지 데이터 수집</text>
  <rect x="60" y="600" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="631" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">수집 방법을 혼합해 다양한 소스에서 데이터를 확보합니다</text>
</svg>"""

# ── ADV 07 02.svg: y=590 텍스트 화면 밖 문제 수정 + 하단 박스 추가 ──
adv07_02 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 07</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">전체 흐름  /  주제 리서치</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">주제 선정부터 포스팅까지 5단계 자동화</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">자동화 파이프라인</text>
  <text x="60" y="294" font-family="{FONT}" font-size="19" fill="#374151">1  주제 리서치  —  웹 조사로 키워드·트렌드 수집</text>
  <text x="60" y="334" font-family="{FONT}" font-size="19" fill="#374151">2  비주얼 소재  —  Pexels API로 관련 이미지 자동 수집 (ADV 04 재사용)</text>
  <text x="60" y="374" font-family="{FONT}" font-size="19" fill="#374151">3  콘텐츠 작성  —  claude -p 로 본문·태그 자동 생성</text>
  <text x="60" y="414" font-family="{FONT}" font-size="19" fill="#374151">4  이미지 업로드  —  네이버 블로그 이미지 API</text>
  <text x="60" y="454" font-family="{FONT}" font-size="19" fill="#374151">5  포스팅 발행  —  네이버 블로그 글쓰기 API</text>
  <line x1="60" y1="484" x2="1220" y2="484" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="524" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">리서치 방법</text>
  <text x="60" y="558" font-family="{FONT}" font-size="19" fill="#374151">Playwright로 네이버 트렌드 수집  /  Claude로 키워드 분석</text>
  <rect x="60" y="586" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="617" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">ADV 02 Playwright + ADV 04 Pexels API 스킬을 재사용합니다</text>
</svg>"""

# ── ADV 07 03.svg: 하단 박스 추가 + Pexels API ADV 04 연계 명시 ──
adv07_03 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 07</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">비주얼 소재 생성</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">Pexels API로 블로그 이미지를 자동 수집합니다 (ADV 04 Skill 재사용)</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">이미지 수집 흐름</text>
  <text x="60" y="296" font-family="{FONT}" font-size="19" fill="#374151">Claude로 주제에 맞는 검색 키워드 자동 생성</text>
  <text x="60" y="334" font-family="{FONT}" font-size="19" fill="#374151">Pexels API로 고품질 이미지 검색  →  PNG 파일 로컬 저장</text>
  <line x1="60" y1="368" x2="1220" y2="368" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="408" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">Python 연동 예시</text>
  <text x="60" y="444" font-family="{MONO}" font-size="17" fill="#374151">headers = {{"Authorization": PEXELS_API_KEY}}</text>
  <text x="60" y="478" font-family="{MONO}" font-size="17" fill="#374151">res = requests.get("https://api.pexels.com/v1/search",</text>
  <text x="60" y="512" font-family="{MONO}" font-size="17" fill="#374151">    headers=headers, params={{"query": keyword, "per_page": 1}})</text>
  <text x="60" y="546" font-family="{MONO}" font-size="17" fill="#374151">img_url = res.json()["photos"][0]["src"]["large"]</text>
  <rect x="60" y="574" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="605" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">ADV 04에서 만든 Pexels Skill을 그대로 불러와 재사용합니다</text>
</svg>"""

# ── ADV 08 03.svg: 하단 박스 추가 + 텍스트 위치 조정 ──
adv08_03 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 08</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">변경사항 감지  +  자동 작업 실행</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">Notion DB에서 대기 항목을 감지해 자동으로 처리합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">새 항목 감지</text>
  <text x="60" y="296" font-family="{FONT}" font-size="19" fill="#374151">DB 조회: filter = {{Status: '대기'}}  →  처리 안 된 항목 추출</text>
  <text x="60" y="334" font-family="{FONT}" font-size="19" fill="#374151">항목 ID + 내용을 claude -p 프롬프트에 삽입</text>
  <line x1="60" y1="364" x2="1220" y2="364" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="404" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">자동 작업 예시</text>
  <text x="60" y="440" font-family="{FONT}" font-size="19" fill="#374151">블로그 포스팅 대기  →  Claude가 초안 작성 후 결과 저장</text>
  <text x="60" y="476" font-family="{FONT}" font-size="19" fill="#374151">조사 요청  →  웹 검색 + 요약 후 Notion 페이지에 기록</text>
  <text x="60" y="512" font-family="{FONT}" font-size="19" fill="#374151">번역 요청  →  번역 완료 후 해당 항목에 결과 첨부</text>
  <line x1="60" y1="542" x2="1220" y2="542" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="578" font-family="{FONT}" font-size="18" fill="#374151">작업 중 상태 → '처리 중'  /  완료 시 → '완료'로 자동 업데이트</text>
  <rect x="60" y="600" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="631" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">Notion 항목 하나가 에이전트의 작업 명령서가 됩니다</text>
</svg>"""

fixes = [
    ("step05/05.svg", adv05_05),
    ("step06/03.svg", adv06_03),
    ("step07/02.svg", adv07_02),
    ("step07/03.svg", adv07_03),
    ("step08/03.svg", adv08_03),
]

for rel_path, content in fixes:
    path = os.path.join(BASE, rel_path)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {rel_path}")
