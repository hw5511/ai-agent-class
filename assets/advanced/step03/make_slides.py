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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 03</text>'
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
        title("외부 API 연동 1  —  Google Cloud Platform") + "\n" +
        sub("GCP 서비스를 에이전트와 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "GCP 프로젝트 생성  /  OAuth 2.0 · 서비스 계정 설정") + "\n" +
        body(354, "Google Sheets API 연동  /  Google Drive API 연동  /  실습") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: GCP 프로젝트 설정 + API 활성화
    "02": lambda: wrap(
        badge() + "\n" +
        title("GCP 프로젝트 설정  /  API 활성화") + "\n" +
        sub("cloud.google.com/console에서 시작합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "프로젝트 생성") + "\n" +
        body(308, "Google Cloud Console  ->  새 프로젝트 생성  ->  이름 입력") + "\n" +
        body(354, "청구 계정 연결  (무료 크레딧 $300 제공, 90일)") + "\n" +
        divider(400) + "\n" +
        label(440, "API 활성화") + "\n" +
        body(478, "API 및 서비스  ->  라이브러리  ->  사용할 API 검색") + "\n" +
        body(518, "Gmail API  /  Google Sheets API  /  Google Drive API") + "\n" +
        body(554, "각 API 페이지에서 '사용' 버튼 클릭  ->  활성화 완료", color="#6b7280", size=17) + "\n" +
        footer_light("API 활성화 후에도 자격증명(Credentials) 설정 필요")
    ),
    # 03: OAuth 2.0 / 서비스 계정 설정
    "03": lambda: wrap(
        badge() + "\n" +
        title("OAuth 2.0  /  서비스 계정") + "\n" +
        divider(180) + "\n" +
        label(224, "OAuth 2.0  —  사용자 계정 접근") + "\n" +
        body(262, "사용자 동의 화면 설정  ->  OAuth 클라이언트 ID 생성") + "\n" +
        body(302, "credentials.json 다운로드  ->  첫 실행 시 브라우저 인증  ->  token.json 자동 생성") + "\n" +
        divider(346) + "\n" +
        label(390, "서비스 계정  —  서버 간 접근 (자동화 권장)") + "\n" +
        body(428, "서비스 계정 생성  ->  키 생성 (JSON)  ->  환경변수로 경로 관리") + "\n" +
        body(468, "Google Sheets: 대상 시트에 서비스 계정 이메일 공유 필요") + "\n" +
        divider(508) + "\n" +
        label(548, "패키지 설치") + "\n" +
        body(578, "pip install google-api-python-client google-auth google-auth-oauthlib", mono=True, size=16, color="#374151") + "\n"
    ),
    # 04: Google Sheets API 연동
    "04": lambda: wrap(
        badge() + "\n" +
        title("Google Sheets API 연동") + "\n" +
        sub("스프레드시트를 Python으로 읽고 씁니다") + "\n" +
        divider(212) + "\n" +
        label(264, "서비스 계정으로 인증") + "\n" +
        body(308, "creds = service_account.Credentials.from_service_account_file(key_path)", mono=True, size=16, color="#374151") + "\n" +
        body(344, "service = build('sheets', 'v4', credentials=creds)", mono=True, size=16, color="#374151") + "\n" +
        divider(386) + "\n" +
        label(426, "데이터 읽기  /  쓰기") + "\n" +
        body(464, "result = service.spreadsheets().values().get(", mono=True, size=16, color="#374151") + "\n" +
        body(500, "    spreadsheetId=SHEET_ID, range='Sheet1!A1:C10').execute()", mono=True, size=16, color="#374151") + "\n" +
        body(536, "service.spreadsheets().values().update(..., body={'values': data})", mono=True, size=16, color="#374151") + "\n" +
        footer_light("SHEET_ID: 스프레드시트 URL에서 /d/ 이후 부분")
    ),
    # 05: Google Drive API + 실습
    "05": lambda: wrap(
        badge() + "\n" +
        title("Google Drive API  /  실습") + "\n" +
        divider(180) + "\n" +
        label(224, "Drive API — 파일 업로드") + "\n" +
        body(262, "service = build('drive', 'v3', credentials=creds)", mono=True, size=16, color="#374151") + "\n" +
        body(298, "media = MediaFileUpload('report.pdf', mimetype='application/pdf')", mono=True, size=16, color="#374151") + "\n" +
        body(334, "service.files().create(body={'name': 'report'}, media_body=media).execute()", mono=True, size=16, color="#374151") + "\n" +
        divider(374) + "\n" +
        label(414, "실습 목표") + "\n" +
        body(452, "GCP 프로젝트 생성  ->  Sheets API 활성화  ->  서비스 계정 키 발급") + "\n" +
        body(492, "Python으로 스프레드시트 읽기  ->  데이터 분석  ->  결과 쓰기") + "\n" +
        body(532, "에이전트 명령: 'Google Sheets의 판매 데이터를 읽고 분석해줘'", color="#1d4ed8", size=17) + "\n" +
        footer("GCP 한 번 설정하면 Gmail · Sheets · Drive 모두 연결됩니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
