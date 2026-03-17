import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

# ── 01.svg: 목차 ──────────────────────────────────────────────
svg01 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">외부 API로 AI 기능 확장하기</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">공개 API를 Skill로 감싸 에이전트 능력을 무한 확장합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">TODAY</text>
  <text x="60" y="308" font-family="{FONT}" font-size="19" fill="#374151">공개 API 탐색  —  public-apis-4Kr 활용법</text>
  <text x="60" y="354" font-family="{FONT}" font-size="19" fill="#374151">네이버 오픈 API  +  타입캐스트 TTS API</text>
  <text x="60" y="400" font-family="{FONT}" font-size="19" fill="#374151">이미지 · 영상 스톡 API  (Unsplash · Pexels · Pixabay 등)</text>
  <text x="60" y="446" font-family="{FONT}" font-size="19" fill="#374151">통합 파이프라인  —  API 조합으로 콘텐츠 자동 제작</text>
  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">카드 등록 없이 발급 가능한 API만 사용합니다</text>
</svg>"""

# ── 02.svg: public-apis-4Kr 소개 ─────────────────────────────
svg02 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">공개 API 탐색  —  어디서 찾나?</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">한국에서 바로 쓸 수 있는 API 목록을 한눈에 확인합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>

  <rect x="60" y="228" width="540" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="330" y="264" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#171717">public-apis-4Kr</text>
  <text x="330" y="292" text-anchor="middle" font-family="{MONO}" font-size="13" fill="#2563eb">github.com/yybmion/public-apis-4Kr</text>
  <text x="330" y="322" text-anchor="middle" font-family="{FONT}" font-size="14" fill="#6b7280">한국에서 사용 가능한 공개 API 모음</text>
  <text x="330" y="348" text-anchor="middle" font-family="{FONT}" font-size="14" fill="#6b7280">카테고리별 정리 · 무료 여부 · 인증 방식 표시</text>
  <text x="330" y="374" text-anchor="middle" font-family="{FONT}" font-size="14" fill="#374151">모르는 API가 필요할 때 가장 먼저 확인</text>

  <rect x="680" y="228" width="540" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="950" y="264" text-anchor="middle" font-family="{FONT}" font-size="16" font-weight="700" fill="#171717">네이버 오픈 API</text>
  <text x="950" y="292" text-anchor="middle" font-family="{MONO}" font-size="13" fill="#2563eb">developers.naver.com</text>
  <text x="950" y="322" text-anchor="middle" font-family="{FONT}" font-size="14" fill="#6b7280">검색 · 번역 · 지도 · 쇼핑 · 블로그</text>
  <text x="950" y="348" text-anchor="middle" font-family="{FONT}" font-size="14" fill="#6b7280">네이버 계정으로 발급 · 무료</text>
  <text x="950" y="374" text-anchor="middle" font-family="{FONT}" font-size="14" fill="#374151">한국어 검색·번역 품질 최고</text>

  <line x1="60" y1="410" x2="1220" y2="410" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="448" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">API 발급 방법 — Claude에게 맡기기</text>
  <rect x="60" y="462" width="1160" height="56" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="84" y="488" font-family="{MONO}" font-size="16" fill="#1e40af">네이버 오픈 API에서 검색 API 발급받는 방법 알려주고 같이 해줘</text>
  <text x="84" y="508" font-family="{MONO}" font-size="16" fill="#1e40af">developers.naver.com 들어가서 애플리케이션 등록까지 안내해줘</text>

  <rect x="60" y="560" width="580" height="52" rx="10" fill="#171717"/>
  <text x="350" y="591" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="600" fill="#ffffff">API 레퍼런스를 Claude에게 주면 Skill이 자동 완성</text>
  <rect x="660" y="560" width="560" height="52" rx="10" fill="#1e293b"/>
  <text x="680" y="580" font-family="{FONT}" font-size="11" fill="#9ca3af">GitHub</text>
  <text x="680" y="602" font-family="{FONT}" font-size="13" fill="#818cf8">github.com/yybmion/public-apis-4Kr</text>
</svg>"""

# ── 03.svg: 네이버 오픈 API + 타입캐스트 TTS ─────────────────
svg03 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">네이버 오픈 API  +  타입캐스트 TTS</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">한국어 검색·번역과 고품질 음성 합성을 에이전트에 연결합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>

  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">네이버 오픈 API  —  검색 · 번역 · 쇼핑</text>
  <text x="60" y="294" font-family="{MONO}" font-size="17" fill="#374151">pip install requests</text>
  <text x="60" y="326" font-family="{MONO}" font-size="17" fill="#374151">headers = {{"X-Naver-Client-Id": ID, "X-Naver-Client-Secret": SECRET}}</text>
  <text x="60" y="358" font-family="{MONO}" font-size="17" fill="#374151">res = requests.get("https://openapi.naver.com/v1/search/news.json", ...</text>

  <line x1="60" y1="388" x2="1220" y2="388" stroke="#e5e7eb" stroke-width="1"/>

  <text x="60" y="428" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">타입캐스트 TTS API  —  한국어 고품질 음성</text>
  <text x="60" y="464" font-family="{MONO}" font-size="17" fill="#374151">pip install typecast-python</text>
  <text x="60" y="496" font-family="{MONO}" font-size="17" fill="#374151">from typecast import TypeCast</text>
  <text x="60" y="528" font-family="{MONO}" font-size="17" fill="#374151">tc = TypeCast(api_token="...")  →  tc.tts("안녕하세요", actor_id="...")</text>

  <rect x="60" y="560" width="820" height="52" rx="10" fill="#eff6ff"/>
  <text x="470" y="591" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">네이버 · 타입캐스트 모두 계정 가입 후 즉시 발급 가능 (카드 불필요)</text>
  <rect x="900" y="560" width="360" height="52" rx="10" fill="#1e293b"/>
  <text x="920" y="580" font-family="{FONT}" font-size="11" fill="#9ca3af">API 발급</text>
  <text x="920" y="602" font-family="{FONT}" font-size="13" fill="#818cf8">developers.naver.com · typecast.ai</text>
</svg>"""

# ── 04.svg: 이미지·영상 스톡 API ─────────────────────────────
svg04 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">이미지 · 영상 스톡 API</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">무료 고품질 미디어를 API로 가져와 콘텐츠에 활용합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>

  <text x="60" y="258" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">이미지</text>
  <text x="230" y="258" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">무료</text>
  <text x="380" y="258" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">한도</text>
  <text x="620" y="258" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">특징</text>

  <line x1="60" y1="268" x2="1220" y2="268" stroke="#e5e7eb" stroke-width="1"/>

  <text x="60" y="296" font-family="{FONT}" font-size="15" fill="#374151">Unsplash API</text>
  <text x="230" y="296" font-family="{FONT}" font-size="14" fill="#16a34a">가능</text>
  <text x="380" y="296" font-family="{FONT}" font-size="14" fill="#374151">시간당 50 요청</text>
  <text x="620" y="296" font-family="{FONT}" font-size="14" fill="#6b7280">다양한 해상도 · 검색 키워드 지원</text>

  <text x="60" y="330" font-family="{FONT}" font-size="15" fill="#374151">Pexels API</text>
  <text x="230" y="330" font-family="{FONT}" font-size="14" fill="#16a34a">가능</text>
  <text x="380" y="330" font-family="{FONT}" font-size="14" fill="#374151">시간당 200 요청</text>
  <text x="620" y="330" font-family="{FONT}" font-size="14" fill="#6b7280">이미지 + 비디오 동시 제공</text>

  <text x="60" y="364" font-family="{FONT}" font-size="15" fill="#374151">Pixabay API</text>
  <text x="230" y="364" font-family="{FONT}" font-size="14" fill="#16a34a">가능</text>
  <text x="380" y="364" font-family="{FONT}" font-size="14" fill="#374151">하루 5,000 요청</text>
  <text x="620" y="364" font-family="{FONT}" font-size="14" fill="#6b7280">이미지 · 영상 · 음악 · AI 생성 이미지</text>

  <text x="60" y="398" font-family="{FONT}" font-size="15" fill="#374151">Lorem Picsum</text>
  <text x="230" y="398" font-family="{FONT}" font-size="14" fill="#16a34a">가능</text>
  <text x="380" y="398" font-family="{FONT}" font-size="14" fill="#374151">제한 없음</text>
  <text x="620" y="398" font-family="{FONT}" font-size="14" fill="#6b7280">랜덤 이미지 · 블러 · 흑백 옵션</text>

  <line x1="60" y1="418" x2="1220" y2="418" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="450" font-family="{FONT}" font-size="13" font-weight="700" fill="#374151">영상</text>

  <text x="60" y="484" font-family="{FONT}" font-size="15" fill="#374151">Coverr API</text>
  <text x="230" y="484" font-family="{FONT}" font-size="14" fill="#16a34a">가능</text>
  <text x="380" y="484" font-family="{FONT}" font-size="14" fill="#374151">제한 없음</text>
  <text x="620" y="484" font-family="{FONT}" font-size="14" fill="#6b7280">배경용 영상 · 로그인 없이 사용</text>

  <text x="60" y="518" font-family="{FONT}" font-size="15" fill="#374151">Mixkit API</text>
  <text x="230" y="518" font-family="{FONT}" font-size="14" fill="#16a34a">가능</text>
  <text x="380" y="518" font-family="{FONT}" font-size="14" fill="#374151">제한 없음</text>
  <text x="620" y="518" font-family="{FONT}" font-size="14" fill="#6b7280">영상 + 사운드 직접 다운로드 방식</text>

  <rect x="60" y="554" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="585" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">모두 API 키만 발급하면 requests.get() 한 줄로 미디어 자동 수집</text>
</svg>"""

# ── 05.svg: 통합 파이프라인 실습 ──────────────────────────────
svg05 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">통합 파이프라인  —  API 조합 실습</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">여러 API를 연결해 콘텐츠를 자동 제작합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>

  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">실습 시나리오  —  뉴스 브리핑 자동 제작</text>

  <rect x="60" y="276" width="200" height="90" rx="8" fill="#eff6ff"/>
  <text x="160" y="308" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">1. 뉴스 수집</text>
  <text x="160" y="332" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">네이버 검색 API</text>
  <text x="160" y="352" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">키워드 최신 뉴스</text>

  <text x="278" y="325" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>

  <rect x="296" y="276" width="200" height="90" rx="8" fill="#eff6ff"/>
  <text x="396" y="308" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">2. AI 요약</text>
  <text x="396" y="332" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">Claude 분석</text>
  <text x="396" y="352" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">핵심 3줄 요약</text>

  <text x="514" y="325" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>

  <rect x="532" y="276" width="200" height="90" rx="8" fill="#eff6ff"/>
  <text x="632" y="308" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">3. 이미지 첨부</text>
  <text x="632" y="332" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">Pexels/Unsplash</text>
  <text x="632" y="352" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">관련 이미지 자동 검색</text>

  <text x="750" y="325" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>

  <rect x="768" y="276" width="200" height="90" rx="8" fill="#eff6ff"/>
  <text x="868" y="308" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#1d4ed8">4. 음성 변환</text>
  <text x="868" y="332" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">타입캐스트 TTS</text>
  <text x="868" y="352" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#374151">한국어 음성 파일</text>

  <text x="986" y="325" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>

  <rect x="1004" y="276" width="216" height="90" rx="8" fill="#2563eb"/>
  <text x="1112" y="308" text-anchor="middle" font-family="{FONT}" font-size="14" font-weight="700" fill="#ffffff">5. 저장</text>
  <text x="1112" y="332" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#bfdbfe">요약.txt</text>
  <text x="1112" y="352" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#bfdbfe">이미지 + 음성 파일</text>

  <line x1="60" y1="390" x2="1220" y2="390" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="430" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">에이전트 명령</text>
  <rect x="60" y="444" width="1160" height="56" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="84" y="470" font-family="{MONO}" font-size="16" fill="#1e40af">"AI 키워드로 네이버 뉴스 3개 가져와서 요약하고,</text>
  <text x="84" y="492" font-family="{MONO}" font-size="16" fill="#1e40af">관련 이미지는 Pexels에서, 음성은 타입캐스트로 만들어줘"</text>

  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#2563eb"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="17" font-weight="600" fill="#ffffff">API 각각의 Skill을 만들면 Claude가 알아서 조합해 실행한다</text>
</svg>"""

files = {
    "01.svg": svg01,
    "02.svg": svg02,
    "03.svg": svg03,
    "04.svg": svg04,
    "05.svg": svg05,
}

for name, content in files.items():
    path = os.path.join(BASE, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {name}")
