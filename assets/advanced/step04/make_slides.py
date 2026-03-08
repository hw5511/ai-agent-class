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
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 04</text>'
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
        title("Gmail 메일 자동 처리") + "\n" +
        sub("받은 메일을 읽고 자동으로 회신합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "TODAY") + "\n" +
        body(308, "Gmail API vs 웹 자동화 비교  /  OAuth 인증 설정") + "\n" +
        body(354, "받은 메일 조회  /  내용 요약·분류  /  자동 회신 발송") + "\n" +
        footer_light("VSCode 터미널 환경에서 진행합니다")
    ),
    # 02: Gmail API vs 웹자동화 + 환경 설정
    "02": lambda: wrap(
        badge() + "\n" +
        title("Gmail API vs 웹 자동화") + "\n" +
        divider(180) + "\n" +
        label(224, "Gmail API  (권장)") + "\n" +
        body(262, "공식 RESTful API  —  안정적·빠름·모든 기능 지원") + "\n" +
        body(302, "OAuth 2.0 인증  —  credentials.json 발급 필요") + "\n" +
        divider(346) + "\n" +
        label(390, "웹 자동화 (Playwright)  — 비권장") + "\n" +
        body(428, "Gmail UI 변경에 취약  /  Google 감지 시 차단 위험") + "\n" +
        divider(472) + "\n" +
        label(512, "패키지 설치") + "\n" +
        body(550, "pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib", mono=True, color="#374151") + "\n"
    ),
    # 03: 받은 메일 조회 + 요약·분류
    "03": lambda: wrap(
        badge() + "\n" +
        title("받은 메일 조회  /  요약·분류") + "\n" +
        sub("OAuth 인증 후 API로 메일을 가져옵니다") + "\n" +
        divider(212) + "\n" +
        label(264, "메일 목록 조회") + "\n" +
        body(304, "service.users().messages().list(userId='me', q='is:unread')", mono=True, color="#374151") + "\n" +
        body(340, "# list()는 ID만 반환  →  get()으로 본문 로드 필요", mono=True, color="#6b7280") + "\n" +
        divider(378) + "\n" +
        label(418, "본문 추출") + "\n" +
        body(454, "msg = service.users().messages().get(userId='me', id=id).execute()", mono=True, color="#374151") + "\n" +
        body(490, "data = base64.urlsafe_b64decode(payload['body']['data'])", mono=True, color="#374151") + "\n" +
        footer_light("Claude에게 추출된 본문을 넘기면 요약·분류 자동 수행")
    ),
    # 04: 자동 회신 발송
    "04": lambda: wrap(
        badge() + "\n" +
        title("자동 회신 발송") + "\n" +
        sub("MIMEText로 메일을 작성하고 API로 전송합니다") + "\n" +
        divider(212) + "\n" +
        label(264, "메일 작성") + "\n" +
        body(304, "msg = MIMEText(body_text)", mono=True, color="#374151") + "\n" +
        body(340, "msg['to'] = to  /  msg['subject'] = subject", mono=True, color="#374151") + "\n" +
        divider(382) + "\n" +
        label(422, "인코딩 + 발송") + "\n" +
        body(458, "raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()", mono=True, color="#374151") + "\n" +
        body(494, "service.users().messages().send(userId='me', body={'raw': raw})", mono=True, color="#374151") + "\n" +
        footer("수신 확인 → 내용 요약 → 회신 작성 → 발송까지 자동화됩니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
