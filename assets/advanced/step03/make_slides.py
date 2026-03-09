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
        title("외부 API 연동 1  —  Google Cloud Platform 통합") + "\n" +
        sub("GCP 5가지 API를 하나의 파이프라인으로 연결합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "OAuth 인증 공통 가이드  /  Google Sheets API  /  Google Forms API") + "\n" +
        body(354, "Google Docs API  /  Google Drive API  /  Gmail API  /  통합 실습") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: OAuth 인증 공통 가이드
    "02": lambda: wrap(
        badge() + "\n" +
        title("OAuth 인증 공통 가이드") + "\n" +
        sub("GCP 5가지 API 모두 동일한 인증 방식을 사용합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "OAuth 2.0  —  사용자 계정 접근") + "\n" +
        body(308, "사용자 동의 화면  ->  OAuth 클라이언트 ID  ->  credentials.json 다운로드") + "\n" +
        body(348, "첫 실행 시 브라우저 인증  ->  token.json 자동 생성  ->  이후 자동 갱신") + "\n" +
        divider(390) + "\n" +
        label(430, "서비스 계정  —  자동화 권장") + "\n" +
        body(468, "서비스 계정 생성  ->  JSON 키 발급  ->  GOOGLE_APPLICATION_CREDENTIALS 환경변수") + "\n" +
        body(508, "Sheets·Drive: 서비스 계정 이메일을 대상 리소스에 공유 필요") + "\n" +
        divider(544) + "\n" +
        body(560, "pip install google-api-python-client google-auth google-auth-oauthlib", mono=True, size=15, color="#374151") + "\n"
    ),
    # 03: Google Sheets / Forms API
    "03": lambda: wrap(
        badge() + "\n" +
        title("Google Sheets  /  Forms API") + "\n" +
        divider(180) + "\n" +
        label(224, "Sheets API — 읽기 / 쓰기") + "\n" +
        body(262, "service = build('sheets', 'v4', credentials=creds)", mono=True, size=16, color="#374151") + "\n" +
        body(298, "result = service.spreadsheets().values().get(", mono=True, size=16, color="#374151") + "\n" +
        body(334, "    spreadsheetId=SHEET_ID, range='Sheet1!A1:D100').execute()", mono=True, size=16, color="#374151") + "\n" +
        body(370, "service.spreadsheets().values().update(..., body={'values': rows})", mono=True, size=16, color="#374151") + "\n" +
        divider(410) + "\n" +
        label(450, "Forms API — 설문 결과 자동 수집") + "\n" +
        body(488, "service = build('forms', 'v1', credentials=creds)", mono=True, size=16, color="#374151") + "\n" +
        body(524, "resp = service.forms().responses().list(formId=FORM_ID).execute()", mono=True, size=16, color="#374151") + "\n" +
        footer_light("SHEET_ID / FORM_ID: 해당 URL에서 추출")
    ),
    # 04: Google Docs / Drive API
    "04": lambda: wrap(
        badge() + "\n" +
        title("Google Docs  /  Drive API") + "\n" +
        divider(180) + "\n" +
        label(224, "Docs API — 문서 자동 생성") + "\n" +
        body(262, "service = build('docs', 'v1', credentials=creds)", mono=True, size=16, color="#374151") + "\n" +
        body(298, "doc = service.documents().create(body={'title': '리포트'}).execute()", mono=True, size=16, color="#374151") + "\n" +
        body(334, "service.documents().batchUpdate(documentId=doc_id, body=requests)", mono=True, size=16, color="#374151") + "\n" +
        divider(374) + "\n" +
        label(414, "Drive API — 파일 업로드 / 공유") + "\n" +
        body(452, "service = build('drive', 'v3', credentials=creds)", mono=True, size=16, color="#374151") + "\n" +
        body(488, "media = MediaFileUpload('report.pdf', mimetype='application/pdf')", mono=True, size=16, color="#374151") + "\n" +
        body(524, "service.files().create(body={'name': 'report'}, media_body=media).execute()", mono=True, size=16, color="#374151") + "\n" +
        footer_light("Docs batchUpdate로 텍스트·표·이미지 삽입 가능")
    ),
    # 05: Gmail API + 통합 실습
    "05": lambda: wrap(
        badge() + "\n" +
        title("Gmail API  /  통합 실습") + "\n" +
        divider(180) + "\n" +
        label(224, "Gmail API — 메일 조회 / 자동 발송") + "\n" +
        body(262, "service = build('gmail', 'v1', credentials=creds)", mono=True, size=16, color="#374151") + "\n" +
        body(298, "msg = MIMEText(body_text)  /  msg['to'] = recipient", mono=True, size=16, color="#374151") + "\n" +
        body(334, "service.users().messages().send(userId='me', body=encoded).execute()", mono=True, size=16, color="#374151") + "\n" +
        divider(374) + "\n" +
        label(414, "실습: Sheets 데이터  ->  Gmail 리포트 자동 발송") + "\n" +
        body(452, "1  Sheets API로 판매 데이터 읽기") + "\n" +
        body(488, "2  Claude로 데이터 분석  ->  리포트 텍스트 생성") + "\n" +
        body(524, "3  Gmail API로 담당자에게 리포트 자동 발송") + "\n" +
        footer("GCP 5가지 API로 데이터 수집부터 보고까지 완전 자동화")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
