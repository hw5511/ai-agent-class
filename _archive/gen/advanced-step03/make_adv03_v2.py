import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"

UNIFIED_PROMPT = (
    "GWS CLI 설치 및 인증을 처음부터 끝까지 도와줘.\n\n"
    "[설치]\n"
    "1. npm install -g @googleworkspace/cli 실행\n"
    "2. choco install gcloudsdk -y 실행 (PATH 미반영 시 수동 추가)\n"
    "3. gcloud auth login --launch-browser 로 gcloud 인증\n"
    "4. gcloud projects create [고유ID] --name=gws-workspace 프로젝트 생성\n"
    "5. gcloud config set project [프로젝트ID]\n"
    "6. gws auth setup --project [프로젝트ID] (YouTube·Forms API 포함 활성화)\n\n"
    "[OAuth 클라이언트 — Playwright MCP로 브라우저 스냅샷 찍으며 단계별 안내]\n"
    "7. OAuth 동의 화면: External·앱이름·이메일 설정\n"
    "8. 테스트 사용자에 내 Gmail 추가 (필수)\n"
    "9. OAuth 클라이언트 ID 생성 (데스크톱 앱) → ID와 Secret 저장\n\n"
    "[환경변수 및 최종 인증]\n"
    "10. ~/.config/gws/.env 에 CLIENT_ID·SECRET·PROJECT_ID 저장\n"
    "11. gws auth login -s drive,gmail,calendar,sheets,docs,youtube,forms\n"
    "12. gws auth status 로 완료 확인"
)


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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>'
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


def footer_light_green(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#ecfdf5"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#059669">{esc(text)}</text>'
    )


# --- 01.svg: 목차 ---
def slide01():
    return wrap(
        badge() + "\n" +
        t_title("GWS CLI — Google Workspace 자동화") + "\n" +
        t_sub("Claude가 gws 명령어를 직접 실행해 Drive·Gmail·Calendar·Sheets·YouTube를 제어합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "TODAY  —  설치 · 인증 · Skill 제작 · 실습 5종") + "\n" +
        t_body(308, "통합 설치 프롬프트  →  Claude가 gws 설치부터 인증까지 자동 처리") + "\n" +
        t_body(350, "gws auth login  →  drive · gmail · calendar · sheets · docs · youtube · forms") + "\n" +
        t_body(392, "GWS CLI Skill 문서화  →  Claude가 자연어 요청을 gws 명령으로 자동 변환") + "\n" +
        t_body(434, "실습 5종  :  Drive / Gmail / Calendar / Sheets·Docs·Forms / YouTube") + "\n" +
        footer_light("수강생은 명령어를 몰라도 됩니다 — Claude가 gws CLI를 직접 사용합니다")
    )


# --- 02.svg: 통합 설치 프롬프트 ---
def slide02():
    return wrap(
        badge() + "\n" +
        t_title("GWS CLI 통합 설치 프롬프트", size=36) + "\n" +
        t_sub("아래 프롬프트를 Claude에 붙여넣으면 설치부터 인증까지 자동으로 진행됩니다") + "\n" +
        divider(212) + "\n" +
        t_label(252, "프롬프트 구성 (액션박스에서 복사)") + "\n" +
        f'  <rect x="60" y="266" width="1160" height="260" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="84" y="294" font-family="{MONO}" font-size="13" fill="#374151">1.  npm install -g @googleworkspace/cli  +  gcloud 설치 (choco)</text>\n'
        f'  <text x="84" y="318" font-family="{MONO}" font-size="13" fill="#374151">2.  gcloud auth login --launch-browser  →  gcloud 인증</text>\n'
        f'  <text x="84" y="342" font-family="{MONO}" font-size="13" fill="#374151">3.  GCP 프로젝트 생성 + gws auth setup (YouTube · Forms API 포함 활성화)</text>\n'
        f'  <text x="84" y="370" font-family="{FONT}" font-size="13" font-weight="600" fill="#ef4444">4.  OAuth 클라이언트 단계  →  Playwright MCP로 GCP Console 화면 스냅샷</text>\n'
        f'  <text x="84" y="394" font-family="{FONT}" font-size="13" fill="#374151">       OAuth 동의 화면 설정  /  테스트 사용자 등록  /  클라이언트 ID 생성까지 안내</text>\n'
        f'  <text x="84" y="418" font-family="{MONO}" font-size="13" fill="#374151">5.  ~/.config/gws/.env  저장</text>\n'
        f'  <text x="84" y="442" font-family="{MONO}" font-size="13" fill="#1d4ed8">6.  gws auth login -s drive,gmail,calendar,sheets,docs,youtube,forms</text>\n'
        f'  <text x="84" y="466" font-family="{MONO}" font-size="13" fill="#374151">7.  gws auth status  →  완료 확인</text>\n' +
        footer_light("OAuth 클라이언트 생성 단계에서 Playwright MCP가 브라우저 화면을 찍으며 단계별로 안내합니다")
    )


# --- 03.svg: gws auth login 성공 확인 ---
def slide03():
    return wrap(
        badge() + "\n" +
        t_title("gws auth login  —  인증 완료 확인", size=36) + "\n" +
        t_sub("7개 서비스 스코프 인증이 완료되면 Claude가 gws 명령을 바로 사용할 수 있습니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "최종 인증 명령어") + "\n" +
        f'  <rect x="60" y="278" width="1160" height="56" rx="8" fill="#0f172a"/>\n'
        f'  <text x="84" y="312" font-family="{MONO}" font-size="17" fill="#a5f3fc">gws auth login -s drive,gmail,calendar,sheets,docs,youtube,forms</text>\n' +
        divider(358) + "\n" +
        t_label(392, "브라우저 경고 처리 (반드시 완료)") + "\n" +
        step(436, "1", '"Google에서 확인하지 않은 앱" 경고 → 고급 클릭') + "\n" +
        step(480, "2", '"gws CLI(으)로 이동(안전하지 않음)" 클릭') + "\n" +
        step(524, "3", "권한 체크박스 모두 선택 → 계속 → 인증 완료") + "\n" +
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#eff6ff"/>\n'
        f'  <text x="640" y="584" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#2563eb">완료 확인:  gws auth status</text>\n'
        f'  <text x="640" y="604" text-anchor="middle" font-family="{FONT}" font-size="13" fill="#2563eb">테스트:  gws drive files list --params \'{"pageSize":3}\'</text>'
    )


# --- 04.svg: GWS CLI Skill 문서화 ---
def slide04():
    return wrap(
        badge() + "\n" +
        t_title("GWS CLI Skill 문서화", size=38) + "\n" +
        t_sub("Claude가 사용법 문서를 Skill로 만들어 자연어 요청을 gws 명령으로 자동 변환합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "Claude에게 이렇게 요청하세요") + "\n" +
        prompt_box(278, '"gws CLI 사용법 정리해서 gws_skill.md Skill 문서로 만들어줘"') + "\n" +
        divider(354) + "\n" +
        t_label(394, "Skill 문서에 포함될 내용") + "\n" +
        f'  <rect x="60" y="408" width="530" height="130" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="84" y="434" font-family="{FONT}" font-size="14" font-weight="600" fill="#374151">gws 핵심 명령 패턴</text>\n'
        f'  <text x="84" y="456" font-family="{MONO}" font-size="13" fill="#374151">gws drive files list --params \'{{"pageSize":5}}\'</text>\n'
        f'  <text x="84" y="476" font-family="{MONO}" font-size="13" fill="#374151">gws gmail messages list --params \'{{"q":"is:unread"}}\'</text>\n'
        f'  <text x="84" y="496" font-family="{MONO}" font-size="13" fill="#374151">gws calendar events list --calendarId primary</text>\n'
        f'  <text x="84" y="516" font-family="{MONO}" font-size="13" fill="#374151">gws youtube channels list --part snippet</text>\n'
        f'  <rect x="630" y="408" width="590" height="130" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="654" y="434" font-family="{FONT}" font-size="14" font-weight="600" fill="#374151">수강생 자연어 → Claude가 변환</text>\n'
        f'  <text x="654" y="456" font-family="{FONT}" font-size="14" fill="#374151">"내 드라이브 최근 파일 보여줘"</text>\n'
        f'  <text x="654" y="478" font-family="{FONT}" font-size="14" fill="#374151">"안 읽은 메일 목록 뽑아줘"</text>\n'
        f'  <text x="654" y="500" font-family="{FONT}" font-size="14" fill="#374151">"오늘 일정 알려줘"</text>\n'
        f'  <text x="654" y="522" font-family="{FONT}" font-size="14" fill="#374151">"내 유튜브 채널 구독자 수 알려줘"</text>\n' +
        footer_light("Skill 문서 생성 후 Claude가 자연어 요청을 gws 명령으로 즉시 변환·실행합니다")
    )


# --- 05.svg: 실습 — Drive ---
def slide05():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 — Drive 파일 조회 · 업로드 · 다운로드", size=32) + "\n" +
        t_sub("Claude가 gws drive 명령으로 내 Google Drive를 직접 제어합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"내 드라이브 최근 파일 5개 목록 보여줘" 요청') + "\n" +
        step(358, "2", '"test.txt 파일 만들어서 드라이브에 업로드해줘" 요청') + "\n" +
        step(408, "3", '"방금 업로드한 파일 다운로드해줘" 요청 → 로컬에 저장 확인') + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"내 드라이브 최근 파일 5개 목록 보여주고, 텍스트 파일 하나 만들어서 업로드해줘"') + "\n" +
        footer_light_green("업로드된 파일을 Google Drive 웹에서 직접 확인해보세요")
    )


# --- 06.svg: 실습 — Gmail ---
def slide06():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 — Gmail 조회 · 보내기", size=38) + "\n" +
        t_sub("Claude가 gws gmail 명령으로 메일을 읽고 발송합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"안 읽은 메일 3개 제목과 발신자 보여줘" 요청') + "\n" +
        step(358, "2", '"[본인 이메일]로 테스트 메일 보내줘 — 제목: GWS 실습 완료" 요청') + "\n" +
        step(408, "3", "Gmail에서 수신 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"안 읽은 메일 3개 요약해주고, 나한테 실습 완료 메일 보내줘"') + "\n" +
        footer_light_green("발송된 메일을 Gmail에서 직접 열어 확인해보세요")
    )


# --- 07.svg: 실습 — Calendar ---
def slide07():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 — 캘린더 일정 조회 · 추가", size=36) + "\n" +
        t_sub("Claude가 gws calendar 명령으로 일정을 읽고 새 이벤트를 추가합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"이번 주 일정 목록 보여줘" 요청') + "\n" +
        step(358, "2", '"내일 오후 3시에 GWS 실습 완료 일정 추가해줘" 요청') + "\n" +
        step(408, "3", "Google Calendar 웹에서 추가된 일정 확인") + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"이번 주 일정 보여주고, 내일 오후 3시에 테스트 일정 하나 추가해줘"') + "\n" +
        footer_light_green("추가된 일정을 Google Calendar에서 직접 확인해보세요")
    )


# --- 08.svg: 실습 — Sheets · Docs · Forms ---
def slide08():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 — Sheets · Docs · Forms 생성", size=34) + "\n" +
        t_sub("Claude가 gws 명령으로 스프레드시트·문서·설문 양식을 자동 생성합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", '"월별 매출 정리용 Google Sheets 만들어줘" 요청') + "\n" +
        step(358, "2", '"회의록 Google Docs 문서 만들어줘 — 제목: 2026 AI 강의 회의록" 요청') + "\n" +
        step(408, "3", '"만족도 조사 Google Forms 만들어줘 — 질문 3개" 요청') + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"구글 시트·닥스·폼 각 하나씩 만들어줘 (매출표 / 회의록 / 만족도 설문)"') + "\n" +
        footer_light_green("생성된 파일 3종을 Google Drive에서 열어 확인해보세요")
    )


# --- 09.svg: YouTube Skill 제작 ---
def slide09():
    return wrap(
        badge() + "\n" +
        t_title("YouTube API Skill 직접 만들기", size=36) + "\n" +
        t_sub("gws CLI가 지원하지 않는 API도 Skill로 만들면 Claude가 자연어로 사용합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "WHY  —  gws youtube는 미지원") + "\n" +
        f'  <rect x="60" y="278" width="540" height="48" rx="8" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>\n'
        f'  <text x="84" y="308" font-family="{MONO}" font-size="15" fill="#dc2626">gws youtube videos list  -->  Unknown service \'youtube\'</text>\n' +
        f'  <rect x="640" y="278" width="580" height="48" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>\n'
        f'  <text x="664" y="308" font-family="{FONT}" font-size="15" fill="#16a34a">해결: google-api-python-client로 Skill 직접 제작!</text>\n' +
        divider(350) + "\n" +
        t_label(386, "PROMPT  —  Claude에게 Skill 제작 요청") + "\n" +
        f'  <rect x="60" y="400" width="1160" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="84" y="428" font-family="{MONO}" font-size="14" fill="#1e40af">"유튜브 채널 분석 Skill을 만들어줘.</text>\n'
        f'  <text x="84" y="452" font-family="{MONO}" font-size="14" fill="#1e40af">gws에서 쓰는 client_secret.json을 재사용하고,</text>\n'
        f'  <text x="84" y="476" font-family="{MONO}" font-size="14" fill="#1e40af">google-api-python-client로 채널 정보/인기 영상/검색 기능을 넣어줘"</text>\n' +
        divider(520) + "\n" +
        t_label(550, "Claude가 자동 생성하는 파일") + "\n" +
        f'  <text x="84" y="580" font-family="{MONO}" font-size="16" fill="#374151">youtube_skill.py   - 채널 분석 / 영상 검색 / 좋아요 조회 기능</text>\n'
        f'  <text x="84" y="608" font-family="{MONO}" font-size="16" fill="#374151">SKILL.md           - Claude가 사용법을 자동으로 참조하는 문서</text>\n' +
        footer("gws가 안 되면 직접 만든다 = AI 에이전트 활용의 핵심")
    )


# --- 10.svg: 실습 — YouTube Skill 실전 활용 ---
def slide10():
    return wrap(
        badge() + "\n" + practice_badge() + "\n" +
        t_title("실습 — YouTube Skill 실전 활용", size=34) + "\n" +
        t_sub("직접 만든 Skill로 유튜브 채널을 분석하고 Sheets에 정리합니다") + "\n" +
        divider(212) + "\n" +
        t_label(264, "STEPS") + "\n" +
        step(308, "1", "Claude가 만든 youtube_skill.py 실행 확인 (OAuth 인증 포함)") + "\n" +
        step(358, "2", '"침착맨 유튜브 채널 분석해줘" 요청 -> 구독자/조회수/인기 영상 조회') + "\n" +
        step(408, "3", '"분석 결과를 Google Sheets에 정리해줘" 요청 (gws sheets 연동)') + "\n" +
        divider(450) + "\n" +
        t_label(480, "PROMPT") + "\n" +
        prompt_box(494, '"침착맨 유튜브 채널 분석해서 인기 영상 Top 5를 구글 시트로 정리해줘"') + "\n" +
        footer_light_green("내 채널이 없어도 공개 채널 URL로 분석 가능 - 좋아하는 채널로 실습하세요")
    )


# --- 파일 생성 ---
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
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {num}.svg")

print(f"\nDone. {len(slides)} slides generated.")
