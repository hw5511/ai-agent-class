import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

# ── 01.svg: 목차 ──────────────────────────────────────────────
svg01 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">GWS CLI로 Google Workspace 자동화</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">CLI 명령어로 Drive · Gmail · Sheets · Calendar를 에이전트와 연결합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">TODAY</text>
  <text x="60" y="308" font-family="{FONT}" font-size="19" fill="#374151">GWS CLI 설치  (gcloud + npm install)</text>
  <text x="60" y="354" font-family="{FONT}" font-size="19" fill="#374151">Playwright로 OAuth 설정 보조  (Claude가 화면 안내)</text>
  <text x="60" y="400" font-family="{FONT}" font-size="19" fill="#374151">gws 핵심 명령어  /  subprocess 파이프라인</text>
  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">ADV 02 Playwright MCP 스킬을 그대로 재사용합니다</text>
</svg>"""

# ── 02.svg: GWS CLI 설치 ──────────────────────────────────────
svg02 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">GWS CLI 설치</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">gcloud + GWS CLI 두 가지를 설치합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">STEP 1  —  gcloud SDK 설치 (Windows)</text>
  <text x="60" y="296" font-family="{MONO}" font-size="18" fill="#374151">choco install gcloudsdk -y</text>
  <text x="60" y="326" font-family="{MONO}" font-size="15" fill="#6b7280">export PATH="$PATH:/c/ProgramData/chocolatey/lib/gcloudsdk/tools/google-cloud-sdk/bin"</text>
  <line x1="60" y1="356" x2="1220" y2="356" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="394" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">STEP 2  —  GWS CLI 설치 + 인증</text>
  <text x="60" y="432" font-family="{MONO}" font-size="18" fill="#374151">npm install -g @googleworkspace/cli</text>
  <text x="60" y="466" font-family="{MONO}" font-size="18" fill="#374151">gcloud auth login --launch-browser</text>
  <text x="60" y="500" font-family="{MONO}" font-size="18" fill="#374151">gcloud projects create MY-PROJECT-ID --name="gws-workspace"</text>
  <text x="60" y="534" font-family="{MONO}" font-size="18" fill="#374151">gcloud config set project MY-PROJECT-ID</text>
  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#fef3c7"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#92400e">gcloud PATH가 현재 셸에 안 보이면 export PATH로 수동 추가 필요</text>
</svg>"""

# ── 03.svg: Playwright로 OAuth 설정 보조 ──────────────────────
svg03 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">Playwright로 OAuth 설정 보조</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">개인 계정은 OAuth 클라이언트를 수동 생성해야 합니다 — Claude가 화면을 안내합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>

  <rect x="60" y="228" width="340" height="130" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1"/>
  <text x="230" y="260" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#0369a1">1. OAuth 동의 화면</text>
  <text x="230" y="284" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">browser_navigate → GCP 콘솔</text>
  <text x="230" y="304" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">User Type: External 선택</text>
  <text x="230" y="324" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">앱 이름 + 이메일 입력 후 저장</text>
  <text x="240" y="350" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>

  <rect x="470" y="228" width="340" height="130" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1"/>
  <text x="640" y="260" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#0369a1">2. 테스트 사용자 등록</text>
  <text x="640" y="284" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">browser_snapshot → 화면 확인</text>
  <text x="640" y="304" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">테스트 사용자 추가 클릭</text>
  <text x="640" y="324" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#e11d48">⚠ 빠뜨리면 403 access_denied</text>
  <text x="650" y="350" text-anchor="middle" font-family="{FONT}" font-size="20" fill="#9ca3af">→</text>

  <rect x="880" y="228" width="360" height="130" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1"/>
  <text x="1060" y="260" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="700" fill="#0369a1">3. OAuth 클라이언트 ID 생성</text>
  <text x="1060" y="284" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">사용자 인증정보 만들기 클릭</text>
  <text x="1060" y="304" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">애플리케이션 유형: 데스크톱 앱</text>
  <text x="1060" y="324" text-anchor="middle" font-family="{FONT}" font-size="12" fill="#374151">클라이언트 ID + Secret 복사</text>

  <line x1="60" y1="382" x2="1220" y2="382" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="418" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">Claude 보조 프롬프트</text>
  <rect x="60" y="432" width="1160" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="84" y="458" font-family="{MONO}" font-size="15" fill="#1e40af">Playwright MCP로 console.cloud.google.com 열어서</text>
  <text x="84" y="480" font-family="{MONO}" font-size="15" fill="#1e40af">OAuth 동의화면 설정 단계를 화면 보면서 안내해줘</text>

  <line x1="60" y1="510" x2="1220" y2="510" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="548" font-family="{FONT}" font-size="18" fill="#374151">완료 후 → gws auth login -s drive,gmail,calendar,sheets,docs,tasks</text>
  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#171717"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="600" fill="#ffffff">Claude가 GCP 콘솔 화면을 보며 단계별로 클릭 위치를 안내해준다</text>
</svg>"""

# ── 04.svg: gws 핵심 명령어 ──────────────────────────────────
svg04 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">gws 핵심 명령어</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">인증 후 CLI 명령어로 Google 서비스를 즉시 사용합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>

  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">Drive</text>
  <text x="60" y="292" font-family="{MONO}" font-size="17" fill="#374151">gws drive files list --params '{{"pageSize": 10}}'</text>

  <text x="60" y="340" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">Gmail</text>
  <text x="60" y="374" font-family="{MONO}" font-size="17" fill="#374151">gws gmail +triage           # 안 읽은 메일 요약</text>

  <text x="60" y="422" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">Calendar</text>
  <text x="60" y="456" font-family="{MONO}" font-size="17" fill="#374151">gws calendar +agenda        # 오늘 일정 확인</text>

  <text x="60" y="504" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">인증 상태 확인</text>
  <text x="60" y="538" font-family="{MONO}" font-size="17" fill="#374151">gws auth status</text>

  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#eff6ff"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#2563eb">Claude Bash tool에서 gws 명령을 직접 실행 가능 — Skill 없이도 동작</text>
</svg>"""

# ── 05.svg: subprocess 파이프라인 + 통합 실습 ─────────────────
svg05 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#ffffff"/>
  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>
  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>
  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">subprocess 파이프라인  +  통합 실습</text>
  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">Python에서 gws를 호출해 Google 서비스를 자동화합니다</text>
  <line x1="60" y1="212" x2="1220" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="258" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">gws를 Python subprocess로 호출</text>
  <text x="60" y="296" font-family="{MONO}" font-size="17" fill="#374151">import subprocess, json</text>
  <text x="60" y="328" font-family="{MONO}" font-size="17" fill="#374151">result = subprocess.run(</text>
  <text x="60" y="358" font-family="{MONO}" font-size="17" fill="#374151">    ['gws', 'drive', 'files', 'list', '--params', '{{"pageSize":5}}'],</text>
  <text x="60" y="388" font-family="{MONO}" font-size="17" fill="#374151">    capture_output=True, text=True, encoding='utf-8'</text>
  <text x="60" y="418" font-family="{MONO}" font-size="17" fill="#374151">)</text>
  <text x="60" y="450" font-family="{MONO}" font-size="17" fill="#374151">files = json.loads(result.stdout)</text>
  <line x1="60" y1="476" x2="1220" y2="476" stroke="#e5e7eb" stroke-width="1"/>
  <text x="60" y="514" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">통합 실습</text>
  <text x="60" y="548" font-family="{FONT}" font-size="18" fill="#374151">"Drive에서 오늘 수정된 파일 목록을 Gmail로 자동 발송해줘"</text>
  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#2563eb"/>
  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" font-size="17" font-weight="600" fill="#ffffff">gws + subprocess + Claude = 코드 없이 Google Workspace 자동화</text>
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
