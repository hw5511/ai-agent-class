"""AU2/submit 2 example sheet: the idea sheet (1600 x 1000, white, Pretendard) filled with the running example
"주간 업무 보고 취합 자동화": five items and a small module diagram. The same sheet, alone, is rendered to
web/public/shots/au2/idea-sheet-example.png (the "result image" in the VS Code image viewer mock).
No badges on the slide (the notes are tips)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

SHEET_W, SHEET_H = 1600, 1000
ML, MW = 110, 1380
RULE = "#8a9099"


def label(x, y, name):
    return text(x, y, name, 26, 700, MUTED, anchor="start")


def sheet():
    s = []
    # 01 title
    s += [label(ML, 118, "아이디어 제목")]
    s += [text(ML, 204, "주간 업무 보고 취합 자동화", 76, 900, INK, anchor="start")]
    # 02 summary
    s += [label(ML, 296, "간단한 설명")]
    s += [text(ML, 352, "팀원 8명의 주간 보고 메일을 모아 완료, 진행 중, 이슈로 나누고,", 32, 500, INK2, anchor="start")]
    s += [text(ML, 398, "팀 보고서 양식에 채워 팀장에게 보내는 자동화", 32, 500, INK2, anchor="start")]
    # 03 trigger, 04 why
    s += [label(ML, 470, "아이디어 계기")]
    for i, ln in enumerate(["매주 월요일 오전, 팀장이 8통의 메일을", "하나씩 열어 복사해 붙이며 2시간을 쓰는", "모습을 보고 시작함"]):
        s += [text(ML, 530 + i * 44, ln, 29, 500, INK2, anchor="start")]
    s += [label(820, 470, "왜 필요한가?")]
    for i, ln in enumerate(["매주 2시간이 걸림", "빠진 사람 확인이 늦음", "이슈가 다른 내용 사이에 묻힘"]):
        s += [f'<circle cx="826" cy="{520 + i * 44}" r="5" fill="{INK2}"/>']
        s += [text(846, 530 + i * 44, ln, 29, 500, INK2, anchor="start")]
    # 05 diagram
    s += [label(ML, 690, "다이어그램 구조도")]
    BW, BH, BY = 290, 150, 736
    gap = (MW - 4 * BW) / 3
    mods = [("보고 메일 가져오기", "메일함에서 검색"), ("항목 나누기", "AI 로 3개 항목 분류"),
            ("팀 보고서 채우기", "양식에 값 넣기"), ("팀장에게 보내기", "메일로 발송")]
    for i, (h, sub) in enumerate(mods):
        bx = ML + i * (BW + gap)
        s += [f'<rect x="{bx}" y="{BY}" width="{BW}" height="{BH}" rx="18" fill="#fff" stroke="{LINE}" stroke-width="2.5"/>']
        s += [text(bx + 24, BY + 42, str(i + 1), 24, 800, ACCENT, anchor="start", family=MONO)]
        s += [text(bx + BW / 2, BY + 90, h, 29, 800, INK)]
        s += [text(bx + BW / 2, BY + 128, sub, 22, 600, MUTED)]
        if i < 3:
            s += [connector(bx + BW + 14, BY + BH / 2, bx + BW + gap - 14, BY + BH / 2, color=RULE, width=3, head_size=10)]
    return s


# ---- the slide: the sheet on the white stage, soft shadow only ----
S = 0.66
SX, SY = (W - SHEET_W * S) / 2, 150
b = [f'<g filter="url(#shs)"><rect x="{SX}" y="{SY}" width="{SHEET_W * S}" height="{SHEET_H * S}" fill="#fff" stroke="#e5e5e5" stroke-width="2"/></g>',
     f'<g transform="translate({SX} {SY}) scale({S})">' + "".join(sheet()) + "</g>"]
print(save("au2-submit-example.svg", b, "AU2 submit 2 example sheet (tools/illus/au2_submit_example.py)"))

# ---- the sheet alone as a 1600 x 1000 picture (the file a student ends up with) ----
import cairosvg
png = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "..", "web", "public", "shots", "au2", "idea-sheet-example.png"))
os.makedirs(os.path.dirname(png), exist_ok=True)
sheet_svg = svg_sized(['<rect width="1600" height="1000" fill="#fff"/>'] + sheet(), SHEET_W, SHEET_H, "AU2 idea sheet example")
cairosvg.svg2png(bytestring=sheet_svg.encode("utf-8"), write_to=png, output_width=SHEET_W, output_height=SHEET_H)
print(png)
