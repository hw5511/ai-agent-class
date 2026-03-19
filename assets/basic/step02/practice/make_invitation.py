"""
한국어 청첩장 이미지 생성 스크립트
- Pillow + Malgun Gothic 폰트
- 텍스트가 명확하게 읽히도록 큰 폰트 사용
- 생성 후 read_practice.zip의 KakaoTalk_20260312_175159585.jpg 교체
"""
from PIL import Image, ImageDraw, ImageFont
import zipfile
import os
import io

ZIP_PATH = os.path.join(os.path.dirname(__file__), 'read_practice.zip')
TMP_ZIP = ZIP_PATH + '.tmp'
TMP_DIR = os.path.join(os.path.dirname(__file__), '_tmp')
OUTPUT_FILE = os.path.join(TMP_DIR, 'KakaoTalk_20260312_175159585.jpg')
TARGET_IN_ZIP = 'practice_files/KakaoTalk_20260312_175159585.jpg'

FONT_REGULAR = 'C:/Windows/Fonts/malgun.ttf'
FONT_BOLD = 'C:/Windows/Fonts/malgunbd.ttf'

W, H = 800, 1100

# 색상
BG = (253, 248, 240)       # 크림색 배경
BORDER = (180, 140, 100)   # 골드 계열 테두리
GOLD = (160, 120, 60)      # 골드 강조
DARK = (50, 40, 30)        # 어두운 텍스트
GRAY = (120, 100, 80)      # 보조 텍스트
ACCENT = (200, 60, 60)     # 포인트 색 (붉은 계열)


def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def draw_centered(draw, text, y, font, color):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    draw.text((x, y), text, font=font, fill=color)


def main():
    os.makedirs(TMP_DIR, exist_ok=True)

    img = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(img)

    # 외곽 테두리
    draw.rectangle([20, 20, W - 20, H - 20], outline=BORDER, width=3)
    draw.rectangle([28, 28, W - 28, H - 28], outline=BORDER, width=1)

    # 상단 장식 가로선
    draw.line([(60, 80), (W - 60, 80)], fill=BORDER, width=1)
    draw.line([(60, 86), (W - 60, 86)], fill=BORDER, width=1)

    f_sm   = load_font(FONT_REGULAR, 22)
    f_md   = load_font(FONT_REGULAR, 30)
    f_lg   = load_font(FONT_BOLD,    46)
    f_xl   = load_font(FONT_BOLD,    64)
    f_name = load_font(FONT_BOLD,    52)
    f_sub  = load_font(FONT_REGULAR, 26)

    # 상단 문구
    draw_centered(draw, '결혼합니다', 105, f_lg, GOLD)

    # 중앙 장식
    draw.line([(60, 175), (W - 60, 175)], fill=BORDER, width=1)

    # 영문 장식 텍스트
    try:
        f_eng = ImageFont.truetype('C:/Windows/Fonts/times.ttf', 28)
    except Exception:
        f_eng = f_sm
    draw_centered(draw, 'We Are Getting Married', 190, f_eng, GRAY)

    draw.line([(60, 235), (W - 60, 235)], fill=BORDER, width=1)

    # 신랑 신부 이름
    draw_centered(draw, '김민준  ·  이지은', 270, f_name, DARK)

    # 부모 정보
    draw_centered(draw, '김철수 · 박영희의 아들', 345, f_sub, GRAY)
    draw_centered(draw, '이상훈 · 최미경의 딸', 385, f_sub, GRAY)

    # 구분선
    draw.line([(100, 440), (W - 100, 440)], fill=BORDER, width=1)

    # 일시
    draw_centered(draw, '2026년  5월  16일  토요일  오후  2시', 470, f_md, DARK)

    # 장소
    draw_centered(draw, '더 그랜드 웨딩홀', 535, f_lg, ACCENT)
    draw_centered(draw, '서울특별시 강남구 테헤란로 152', 600, f_sub, GRAY)
    draw_centered(draw, '(역삼동, 그랜드타워 B1층)', 640, f_sub, GRAY)

    # 구분선
    draw.line([(100, 700), (W - 100, 700)], fill=BORDER, width=1)

    # 연락처 섹션
    draw_centered(draw, '연락처', 730, f_md, GOLD)

    draw.text((120, 780), '신랑측', font=f_sub, fill=GOLD)
    draw.text((300, 780), '김민준  010-1234-5678', font=f_sub, fill=DARK)

    draw.text((120, 825), '', font=f_sub, fill=GOLD)
    draw.text((120, 825), '신부측', font=f_sub, fill=GOLD)
    draw.text((300, 825), '이지은  010-9876-5432', font=f_sub, fill=DARK)

    # 구분선
    draw.line([(100, 880), (W - 100, 880)], fill=BORDER, width=1)

    # 하단 문구
    draw_centered(draw, '소중한 분들을 모십니다', 910, f_md, GRAY)
    draw_centered(draw, '참석 여부를 알려주시면 감사하겠습니다', 955, f_sm, GRAY)

    # 하단 장식선
    draw.line([(60, 1010), (W - 60, 1010)], fill=BORDER, width=1)
    draw.line([(60, 1016), (W - 60, 1016)], fill=BORDER, width=1)

    # 저장
    img.save(OUTPUT_FILE, 'JPEG', quality=92)
    print(f'이미지 저장: {OUTPUT_FILE}')

    # ZIP 교체
    with open(OUTPUT_FILE, 'rb') as f:
        new_data = f.read()

    with zipfile.ZipFile(ZIP_PATH, 'r') as zin:
        with zipfile.ZipFile(TMP_ZIP, 'w', zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                if item.filename == TARGET_IN_ZIP:
                    zout.writestr(item, new_data)
                    print(f'교체: {item.filename}  ({len(new_data):,} bytes)')
                else:
                    zout.writestr(item, zin.read(item.filename))
                    print(f'유지: {item.filename}')

    os.replace(TMP_ZIP, ZIP_PATH)
    print('\nZIP 업데이트 완료')

    print('\n=== 최종 ZIP 내용 ===')
    with zipfile.ZipFile(ZIP_PATH, 'r') as z:
        for f in z.infolist():
            print(f'  {f.filename}  ({f.file_size:,} bytes)')


if __name__ == '__main__':
    main()
