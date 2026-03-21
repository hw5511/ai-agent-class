import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def wrap(inner):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        + inner +
        '\n</svg>\n'
    )


BADGE = (
    f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
    f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
    f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 07</text>\n'
    f'  <rect x="150" y="44" width="44" height="24" rx="12" fill="#22c55e"/>\n'
    f'  <text x="172" y="60" text-anchor="middle" font-family="{FONT}" '
    f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.02em">실습</text>'
)

DIVIDER = lambda y: f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'

LABEL = lambda y, t: (
    f'  <text x="60" y="{y}" font-family="{FONT}" font-size="14" font-weight="600" '
    f'fill="#9ca3af" letter-spacing="0.08em">{esc(t)}</text>'
)

FOOTER = lambda t: (
    f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#171717"/>\n'
    f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
    f'font-size="17" font-weight="600" fill="#ffffff">{esc(t)}</text>'
)


def step_box(x, y, num, title, desc, bg="#f8fafc", num_bg="#171717"):
    return (
        f'  <rect x="{x}" y="{y}" width="340" height="136" rx="10" fill="{bg}"/>\n'
        f'  <rect x="{x+16}" y="{y+16}" width="28" height="28" rx="14" fill="{num_bg}"/>\n'
        f'  <text x="{x+30}" y="{y+35}" text-anchor="middle" font-family="{FONT}" '
        f'font-size="14" font-weight="700" fill="#ffffff">{num}</text>\n'
        f'  <text x="{x+56}" y="{y+35}" font-family="{FONT}" font-size="15" font-weight="700" '
        f'fill="#171717">{esc(title)}</text>\n'
        f'  <text x="{x+16}" y="{y+72}" font-family="{FONT}" font-size="14" fill="#6b7280">{esc(desc[0])}</text>\n'
        f'  <text x="{x+16}" y="{y+96}" font-family="{FONT}" font-size="14" fill="#6b7280">{esc(desc[1]) if len(desc) > 1 else ""}</text>\n'
        f'  <text x="{x+16}" y="{y+120}" font-family="{FONT}" font-size="14" fill="#6b7280">{esc(desc[2]) if len(desc) > 2 else ""}</text>\n'
    )


def example_row(x, y, want, lib, skill):
    return (
        f'  <text x="{x}" y="{y}" font-family="{FONT}" font-size="15" fill="#374151">{esc(want)}</text>\n'
        f'  <text x="{x+340}" y="{y}" font-family="{MONO}" font-size="14" fill="#2563eb">{esc(lib)}</text>\n'
        f'  <text x="{x+680}" y="{y}" font-family="{MONO}" font-size="14" fill="#16a34a">{esc(skill)}</text>\n'
    )


svg = wrap(
    BADGE + "\n" +
    f'  <text x="60" y="130" font-family="{FONT}" font-size="40" font-weight="700" fill="#171717">'
    f'나만의 Skill 만들기 — 워크플로우</text>\n' +
    f'  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">'
    f'원하는 기능을 정하면 Claude가 라이브러리 추천부터 스킬 완성까지 다 해줍니다</text>\n' +
    DIVIDER(212) + "\n" +

    # 3단계 박스
    step_box(60, 228, "1", "원하는 기능 설명",
        ['"QR 코드 생성하고 싶어"',
         '"엑셀 파일 자동으로 만들고 싶어"',
         '"PDF 보고서 뽑고 싶어"'],
        bg="#f0fdf4", num_bg="#16a34a") +

    # 화살표
    f'  <text x="415" y="304" text-anchor="middle" font-family="{FONT}" font-size="28" fill="#9ca3af">→</text>\n' +

    step_box(440, 228, "2", "Claude에게 라이브러리 조사 요청",
        ['"이걸 Python으로 만들려면"',
         '"어떤 라이브러리 쓰면 돼?"',
         '"코드까지 짜줘"'],
        bg="#eff6ff", num_bg="#2563eb") +

    f'  <text x="795" y="304" text-anchor="middle" font-family="{FONT}" font-size="28" fill="#9ca3af">→</text>\n' +

    step_box(820, 228, "3", "스킬로 만들어달라고 요청",
        ['"이걸 /qrcode 스킬로 만들어줘"',
         '"옵션을 인수로 받도록 해줘"',
         '"이제 반복 사용 가능"'],
        bg="#fefce8", num_bg="#ca8a04") +

    DIVIDER(392) + "\n" +
    LABEL(424, "참고 예시") + "\n" +

    # 헤더
    f'  <text x="60" y="452" font-family="{FONT}" font-size="13" font-weight="700" fill="#9ca3af">원하는 것</text>\n'
    f'  <text x="400" y="452" font-family="{FONT}" font-size="13" font-weight="700" fill="#9ca3af">라이브러리</text>\n'
    f'  <text x="740" y="452" font-family="{FONT}" font-size="13" font-weight="700" fill="#9ca3af">스킬 명령어</text>\n' +

    DIVIDER(460) + "\n" +

    example_row(60, 486, "QR 코드 생성",       "pip install qrcode",     "/qrcode [텍스트]") +
    example_row(60, 512, "엑셀 파일 생성",     "pip install openpyxl",   "/excel [데이터]") +
    example_row(60, 538, "파일 자동 압축/백업", "zipfile (표준 내장)",   "/backup [폴더]") +
    example_row(60, 564, "마크다운 → HTML",    "pip install markdown",    "/md2html [파일]") +

    FOOTER("어떤 기능이든 같은 워크플로우 — Claude에게 물어보고 짜고 스킬화하면 끝입니다")
)

path = os.path.join(BASE, "09.svg")
with open(path, "w", encoding="utf-8") as f:
    f.write(svg)
print("Created 09.svg")
