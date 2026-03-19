"""
report_final_v2.pdf 한국어 폰트 버전으로 재생성
"""
import zipfile, os, shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

FONT_PATH = "C:/Windows/Fonts/malgun.ttf"
FONT_BOLD_PATH = "C:/Windows/Fonts/malgunbd.ttf"
OUT_PDF = "C:/woohee_dev/404_ai_agent_lecture/lecture/assets/basic/step02/practice/_tmp/report_final_v2.pdf"
ZIP_IN = "C:/woohee_dev/404_ai_agent_lecture/lecture/assets/basic/step02/practice/read_practice.zip"
ZIP_OUT = "C:/woohee_dev/404_ai_agent_lecture/lecture/assets/basic/step02/practice/read_practice.zip"

# 폰트 등록
pdfmetrics.registerFont(TTFont('Malgun', FONT_PATH))
pdfmetrics.registerFont(TTFont('MalgunBold', FONT_BOLD_PATH))

W, H = A4  # 595.28 x 841.89

def draw_pdf(path):
    c = canvas.Canvas(path, pagesize=A4)
    c.setAuthor("(anonymous)")
    c.setTitle("2026 1분기 영업 실적 보고서")

    y = H - 40*mm

    # 제목
    c.setFont('MalgunBold', 18)
    c.drawString(20*mm, y, "2026 1분기 영업 실적 보고서")
    y -= 8*mm

    # 메타
    c.setFont('Malgun', 10)
    c.drawString(20*mm, y, "작성일: 2026년 3월 14일  |  부서: 영업부")
    y -= 6*mm
    c.line(20*mm, y, W - 20*mm, y)
    y -= 8*mm

    # 섹션 1
    c.setFont('MalgunBold', 12)
    c.drawString(20*mm, y, "1. 요약")
    y -= 6*mm
    c.setFont('Malgun', 10)
    lines1 = [
        "이 보고서는 2026년 1분기(1월~3월) 전체 영업 팀의 실적을 정리한 문서입니다.",
        "전체 KPI 달성 현황, 지역별 성과, 이슈 및 개선사항을 포함합니다.",
    ]
    for l in lines1:
        c.drawString(20*mm, y, l)
        y -= 5*mm
    y -= 4*mm

    # 섹션 2
    c.setFont('MalgunBold', 12)
    c.drawString(20*mm, y, "2. 월별 실적")
    y -= 6*mm

    # 테이블 헤더
    cols = [20, 70, 115, 160, 205]  # mm
    headers = ["월", "목표(원)", "실적(원)", "합계", "달성률"]
    c.setFont('MalgunBold', 9)
    for i, h in enumerate(headers):
        c.drawString(cols[i]*mm, y, h)
    y -= 5*mm
    c.line(20*mm, y, W - 20*mm, y)
    y -= 1*mm

    rows = [
        ["1월",    "420,000", "398,000", "",            "94.8%"],
        ["2월",    "430,000", "451,000", "",            "104.9%"],
        ["3월(예상)", "450,000", "435,000", "",         "96.7%"],
        ["합계",   "1,300,000","1,284,000","",          "98.8%"],
    ]
    c.setFont('Malgun', 9)
    for row in rows:
        for i, cell in enumerate(row):
            if cell:
                c.drawString(cols[i]*mm, y, cell)
        y -= 5*mm
    y -= 4*mm

    # 섹션 3
    c.setFont('MalgunBold', 12)
    c.drawString(20*mm, y, "3. 주요 성과")
    y -= 6*mm
    bullets3 = [
        "신규 고객 계약 87건 (전년 대비 +12%)",
        "고객 만족도 평가 점수: 4.3/5.0 (전년도 4.1)",
        "이탈률 2.8% (목표 3% 이하 달성)",
        "온라인 채널 전환율 전년 대비 15% 향상",
    ]
    c.setFont('Malgun', 10)
    for b in bullets3:
        c.drawString(22*mm, y, "•  " + b)
        y -= 5*mm
    y -= 4*mm

    # 섹션 4
    c.setFont('MalgunBold', 12)
    c.drawString(20*mm, y, "4. 개선 사항")
    y -= 6*mm
    bullets4 = [
        "3월 초 재고 부족으로 일부 납품 4월로 이월됨",
        "영업 인력 교육 추가 강화 필요",
        "신규 채널 대비 운영 인력 보강 필요",
    ]
    c.setFont('Malgun', 10)
    for b in bullets4:
        c.drawString(22*mm, y, "•  " + b)
        y -= 5*mm
    y -= 4*mm

    # 섹션 5
    c.setFont('MalgunBold', 12)
    c.drawString(20*mm, y, "5. 2분기 계획")
    y -= 6*mm
    c.setFont('Malgun', 10)
    lines5 = [
        "2분기 목표 매출은 1,450,000(원)으로 설정하며,",
        "신제품 출시 예정(5월)과 대규모 행사 예정(6월)을 주요 기회 요인으로 활용할 예정입니다.",
    ]
    for l in lines5:
        c.drawString(20*mm, y, l)
        y -= 5*mm

    c.save()
    print(f"PDF 생성 완료: {path}")

draw_pdf(OUT_PDF)

# ZIP 업데이트 - report_final_v2.pdf만 교체
with open(OUT_PDF, 'rb') as f:
    new_pdf_data = f.read()

tmp_zip = ZIP_OUT + ".tmp"
with zipfile.ZipFile(ZIP_IN, 'r') as zin:
    with zipfile.ZipFile(tmp_zip, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == 'practice_files/report_final_v2.pdf':
                zout.writestr(item, new_pdf_data)
                print(f"  replaced: {item.filename} ({len(new_pdf_data):,} bytes)")
            else:
                zout.writestr(item, zin.read(item.filename))
                print(f"  kept: {item.filename}")

os.replace(tmp_zip, ZIP_OUT)
print("ZIP 업데이트 완료")
