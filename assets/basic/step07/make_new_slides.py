import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 07</text>'
    )


def practice_badge():
    return (
        f'  <rect x="150" y="44" width="44" height="24" rx="12" fill="#22c55e"/>\n'
        f'  <text x="172" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.02em">실습</text>'
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


def body(y, text, mono=False, size=19, color="#374151", x=60):
    ff = MONO if mono else FONT
    return f'  <text x="{x}" y="{y}" font-family="{ff}" font-size="{size}" fill="{color}">{esc(text)}</text>'


def title(text, y=130, size=40):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="700" fill="#171717">{esc(text)}</text>'
    )


def sub(text, y=178):
    return f'  <text x="60" y="{y}" font-family="{FONT}" font-size="19" fill="#6b7280">{esc(text)}</text>'


def footer(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#171717"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="17" font-weight="600" fill="#ffffff">{esc(text)}</text>'
    )


def footer_light(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="15" fill="#6b7280">{esc(text)}</text>'
    )


def code_block(x, y, w, h, lines, bg="#f8fafc", line_color="#374151"):
    rects = f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{bg}"/>\n'
    texts = ""
    for i, (line, color) in enumerate(lines):
        texts += f'  <text x="{x+20}" y="{y+32+i*32}" font-family="{MONO}" font-size="16" fill="{color}">{esc(line)}</text>\n'
    return rects + texts


def two_col_box(x, y, w, h, title_text, items, bg="#f8fafc", title_color="#171717", item_color="#374151"):
    out = f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{bg}"/>\n'
    out += f'  <text x="{x+20}" y="{y+30}" font-family="{FONT}" font-size="15" font-weight="700" fill="{title_color}">{esc(title_text)}</text>\n'
    for i, item in enumerate(items):
        out += f'  <text x="{x+20}" y="{y+58+i*28}" font-family="{FONT}" font-size="15" fill="{item_color}">{esc(item)}</text>\n'
    return out


slides = {
    # 04: 라이브러리 개념
    "04": lambda: wrap(
        badge() + "\n" +
        title("라이브러리란?") + "\n" +
        sub("남이 만든 기능 모음 — 설치하면 바로 쓸 수 있습니다") + "\n" +
        divider(212) + "\n" +

        # 왼쪽 박스: Python
        two_col_box(60, 232, 540, 180, "Python — pip",
            [
                "pip install pillow       이미지 처리",
                "pip install openpyxl     엑셀 읽기/쓰기",
                "pip install requests     HTTP 요청",
            ],
            bg="#f0fdf4", title_color="#15803d") + "\n" +

        # 오른쪽 박스: Node.js
        two_col_box(680, 232, 540, 180, "Node.js — npm",
            [
                "npm install sharp        이미지 처리",
                "npm install xlsx         엑셀 읽기/쓰기",
                "npm install axios        HTTP 요청",
            ],
            bg="#eff6ff", title_color="#1d4ed8") + "\n" +

        divider(444) + "\n" +
        label(490, "핵심 개념") + "\n" +
        body(526, "설치 한 번  →  import / require 한 줄  →  수십 가지 기능을 바로 사용") + "\n" +
        footer_light("표준 라이브러리(os, shutil, zipfile)는 설치 없이 바로 사용 가능합니다")
    ),

    # 05: Pillow 소개
    "05": lambda: wrap(
        badge() + "\n" +
        title("Pillow — Python 이미지 처리 라이브러리") + "\n" +
        sub("이미지 생성 · 편집 · 변환을 코드 몇 줄로 처리합니다") + "\n" +
        divider(212) + "\n" +

        label(258, "설치") + "\n" +
        f'  <rect x="60" y="272" width="420" height="44" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="80" y="299" font-family="{MONO}" font-size="18" fill="#374151">pip install pillow</text>\n' +

        divider(340) + "\n" +
        label(374, "주요 기능") + "\n" +

        two_col_box(60, 390, 360, 148, "이미지 생성",
            [
                "Image.new()  — 빈 캔버스 생성",
                "ImageDraw    — 도형 · 텍스트 그리기",
                "ImageFont    — 폰트 크기 · 스타일",
            ],
            bg="#f8fafc") + "\n" +

        two_col_box(460, 390, 360, 148, "이미지 편집",
            [
                "img.resize()   — 크기 변환",
                "img.crop()     — 잘라내기",
                "img.save()     — PNG / JPG 저장",
            ],
            bg="#f8fafc") + "\n" +

        two_col_box(860, 390, 360, 148, "카드뉴스 활용",
            [
                "정방형(1080x1080) 캔버스",
                "배경색 · 글자색 · 폰트 지정",
                "리사이즈로 다양한 포맷 출력",
            ],
            bg="#fefce8") + "\n" +

        footer_light("PIL (Python Imaging Library) 의 현대적 후계 라이브러리입니다")
    ),

    # 06: 실습 1단계 — Claude로 코드 짜기
    "06": lambda: wrap(
        badge() + "\n" +
        practice_badge() + "\n" +
        title("실습 1단계 — Claude에게 카드뉴스 만들어달라고 해보기") + "\n" +
        sub("코드를 직접 짜지 않아도 됩니다 — Claude에게 요청만 하면 됩니다") + "\n" +
        divider(212) + "\n" +

        label(258, "요청 예시") + "\n" +
        f'  <rect x="60" y="272" width="1160" height="96" rx="8" fill="#f0fdf4"/>\n'
        f'  <text x="80" y="308" font-family="{FONT}" font-size="17" fill="#15803d">'
        f'pillow로 1080x1080 카드뉴스 이미지 만들어줘.</text>\n'
        f'  <text x="80" y="344" font-family="{FONT}" font-size="17" fill="#15803d">'
        f'배경 남색, 제목 "AI가 바꾸는 세상" 흰색 굵게 중앙, 본문 "2줄 설명" 회색 작게, 하단 로고 영역 포함</text>\n' +

        divider(396) + "\n" +
        label(430, "Claude가 자동으로 처리하는 것") + "\n" +

        f'  <rect x="60" y="448" width="260" height="80" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="80" y="478" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">1. 라이브러리 설치</text>\n'
        f'  <text x="80" y="506" font-family="{FONT}" font-size="14" fill="#6b7280">pip install pillow 실행</text>\n' +

        f'  <rect x="360" y="448" width="260" height="80" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="380" y="478" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">2. 코드 작성</text>\n'
        f'  <text x="380" y="506" font-family="{FONT}" font-size="14" fill="#6b7280">cardnews.py 자동 생성</text>\n' +

        f'  <rect x="660" y="448" width="260" height="80" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="680" y="478" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">3. 실행</text>\n'
        f'  <text x="680" y="506" font-family="{FONT}" font-size="14" fill="#6b7280">이미지 파일 생성</text>\n' +

        f'  <rect x="960" y="448" width="260" height="80" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="980" y="478" font-family="{FONT}" font-size="15" font-weight="700" fill="#374151">4. 결과 확인</text>\n'
        f'  <text x="980" y="506" font-family="{FONT}" font-size="14" fill="#6b7280">output.png 열기</text>\n' +

        footer("매번 긴 요청을 입력해야 할까요? — 다음 단계에서 해결합니다")
    ),

    # 07: 실습 2단계 — 스킬로 만들기
    "07": lambda: wrap(
        badge() + "\n" +
        practice_badge() + "\n" +
        title("실습 2단계 — 카드뉴스 스킬 만들기") + "\n" +
        sub("Claude에게 스킬로 만들어달라고 요청합니다") + "\n" +
        divider(212) + "\n" +

        label(258, "스킬 생성 요청") + "\n" +
        f'  <rect x="60" y="272" width="1160" height="56" rx="8" fill="#f0fdf4"/>\n'
        f'  <text x="80" y="306" font-family="{FONT}" font-size="17" fill="#15803d">'
        f'방금 만든 카드뉴스 코드를 /cardnews 스킬로 만들어줘. 배경색, 글자색, 제목, 본문, 사이즈를 인수로 받도록 해줘</text>\n' +

        divider(356) + "\n" +
        label(390, "Claude가 자동 생성하는 파일 2개") + "\n" +

        # SKILL.md 박스
        f'  <rect x="60" y="408" width="540" height="120" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="80" y="436" font-family="{MONO}" font-size="14" font-weight="700" fill="#6b7280">.claude/skills/cardnews/SKILL.md</text>\n'
        f'  <text x="80" y="464" font-family="{MONO}" font-size="14" fill="#374151">---</text>\n'
        f'  <text x="80" y="488" font-family="{MONO}" font-size="14" fill="#374151">description: 카드뉴스 이미지를 생성합니다</text>\n'
        f'  <text x="80" y="512" font-family="{MONO}" font-size="14" fill="#374151">---  # Claude 지침 + 옵션 목록</text>\n' +

        # cardnews.py 박스
        f'  <rect x="680" y="408" width="540" height="120" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="700" y="436" font-family="{MONO}" font-size="14" font-weight="700" fill="#6b7280">.claude/skills/cardnews/cardnews.py</text>\n'
        f'  <text x="700" y="464" font-family="{MONO}" font-size="14" fill="#374151">from PIL import Image, ImageDraw, ImageFont</text>\n'
        f'  <text x="700" y="488" font-family="{MONO}" font-size="14" fill="#374151">def make_card(bg, text_color, title, ...):</text>\n'
        f'  <text x="700" y="512" font-family="{MONO}" font-size="14" fill="#374151">    # 옵션에 따라 이미지 생성</text>\n' +

        footer_light("이제 /cardnews 를 입력하면 언제든 카드뉴스를 만들 수 있습니다")
    ),

    # 08: 스킬 활용 — 반복 사용 + 리사이즈
    "08": lambda: wrap(
        badge() + "\n" +
        practice_badge() + "\n" +
        title("스킬 활용 — 반복 사용과 리사이즈") + "\n" +
        sub("짧은 명령 한 줄로 다양한 카드뉴스를 뽑아냅니다") + "\n" +
        divider(212) + "\n" +

        label(258, "호출 예시") + "\n" +

        f'  <rect x="60" y="272" width="1160" height="136" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="80" y="308" font-family="{MONO}" font-size="16" fill="#374151">/cardnews 배경=남색 제목="AI가 바꾸는 세상" 본문="두 줄 설명 텍스트"</text>\n'
        f'  <text x="80" y="340" font-family="{MONO}" font-size="16" fill="#374151">/cardnews 배경=흰색 글자=검정 제목="오늘의 뉴스" 사이즈=1080x1350</text>\n'
        f'  <text x="80" y="372" font-family="{MONO}" font-size="16" fill="#374151">/cardnews 배경=#FF6B35 제목="SALE 50%" 리사이즈=썸네일</text>\n'
        f'  <text x="80" y="392" font-family="{FONT}" font-size="13" fill="#9ca3af">  ↳ 1080x1080 원본 + 360x360 썸네일 동시 저장</text>\n' +

        divider(432) + "\n" +
        label(464, "스킬 옵션 목록") + "\n" +

        f'  <rect x="60" y="480" width="340" height="52" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="80" y="512" font-family="{FONT}" font-size="15" fill="#374151">배경색 / 글자색 / 강조색</text>\n' +

        f'  <rect x="420" y="480" width="340" height="52" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="440" y="512" font-family="{FONT}" font-size="15" fill="#374151">폰트 크기 3종 (제목/부제/본문)</text>\n' +

        f'  <rect x="780" y="480" width="440" height="52" rx="8" fill="#f8fafc"/>\n'
        f'  <text x="800" y="512" font-family="{FONT}" font-size="15" fill="#374151">정렬(중앙/좌/우) / 사이즈 / 리사이즈</text>\n' +

        footer("Skill = 반복 작업을 한 줄 명령으로 — 핵심은 재사용 가능한 자동화입니다")
    ),
}

for num, gen in slides.items():
    path = os.path.join(BASE, f"{num}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {num}.svg")

print("Done.")
