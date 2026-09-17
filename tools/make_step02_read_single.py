# -*- coding: utf-8 -*-
"""BASIC 02 · Read 툴 — 파일 하나씩 분석하는 구간 슬라이드 7장 생성.

드래그&드롭 → 분석 요청 → 분석 결과 → 파일명 변경 을 txt 한 번, jpg 한 번
각각 잘게 쪼개서 보여준다. 좌표는 손으로 만들지 않고 tools/slidekit.py 함수만 쓴다.

주의: assets/basic/step02/slides.json, courses/basic/step02.json 은 이 스크립트가
건드리지 않는다 — 배선은 다른 곳에서 한다.
"""
import sys
sys.path.insert(0, 'tools')
from slidekit import (
    Slide, vscode, terminal, box, section, text, rect, arrow, callout,
    prompt_bar, rename_rows,
    OK, BAD, WARN_BG, WARN_EDGE, WARN_DEEP, CYAN, BLUE, BLUE_DEEP, BLUE_EDGE,
    MUTED, FAINT, INK, PANEL_BG, LINE,
)

BADGE = 'BASIC 02'
STEP = 'STEP 3'
OUT = 'assets/basic/step02/'


def save(name, s):
    s.save(OUT + name)


# 실습 폴더에 보이는 8개 파일 (EXPLORER 트리 공용) ---------------------
TREE_FILES = [
    (0, 'practice_files', 'folder', False),
    (1, 'doc_230928_v3.txt', 'file', False),
    (1, 'temp_1104.txt', 'file', False),
    (1, 'report_final_v2.pdf', 'file', False),
    (1, 'KakaoTalk_20260312_175159585.jpg', 'file', False),
    (1, 'KakaoTalk_20260312_175159586.jpg', 'file', False),
    (1, 'KakaoTalk_20260312_175159587.jpg', 'file', False),
    (1, 'IMG_20260309_134502.jpg', 'file', False),
    (1, 'IMG_20260311_092341.jpg', 'file', False),
]


def tree_with_hot(name):
    return [(d, n, k, (n == name)) for d, n, k, _ in TREE_FILES]


def row_y(name):
    idx = [n for _, n, _, _ in TREE_FILES].index(name)
    return 253 + 25 * idx


TERM_WAIT = [
    ('✳ Claude Code 실행 중', CYAN, 12),
    ('', None),
    ('> ', '#e5e7eb', 14),
]

# 드롭 타깃(터미널 입력줄 근처) — 1·5번 슬라이드 공용
DROP_TARGET = (770, 300)


def drag_drop_slide(filename, title, subtitle, footnote, out_name):
    """드래그&드롭 장면 1장을 조립한다 (1·5번 슬라이드가 같은 구도를 쓴다)."""
    s = Slide(BADGE, STEP, title, subtitle, footnote)
    s.add(vscode(tree=tree_with_hot(filename), tab=None, editor=[], term=TERM_WAIT))
    src = (320, row_y(filename) - 4)
    tgt = DROP_TARGET
    s.add(arrow(src[0], src[1], tgt[0], tgt[1], color=BLUE_DEEP, dashed=True))
    mid_x, mid_y = (src[0] + tgt[0]) / 2, (src[1] + tgt[1]) / 2
    chip_x, chip_y = mid_x - 115, mid_y - 17
    s.add(rect(chip_x, chip_y, 230, 34, '#ffffff', rx=6, stroke=BLUE_EDGE, sw=1.5))
    s.add([f'  <path d="M{chip_x+12:.0f} {chip_y+9:.0f}h7l2 2v7h-9z" '
           f'fill="{BLUE}" opacity="0.9"/>'])
    s.add(text(chip_x + 28, chip_y + 22, filename, 12, INK, '600', mono=True))
    s.add(callout(800, 345, '← 여기로 끌어다 놓기', color=BLUE_DEEP, size=15))
    save(out_name, s)


# 1. read_txt_드래그드롭 -------------------------------------------------
drag_drop_slide(
    'doc_230928_v3.txt',
    '파일을 Claude에게 건네기',
    'EXPLORER 의 파일을 오른쪽 Claude 창으로 끌어다 놓습니다',
    '드롭하면 입력줄에 파일 경로가 자동으로 붙습니다',
    'read_txt_드래그드롭.svg',
)


# 2. read_txt_분석요청 ---------------------------------------------------
s = Slide(BADGE, STEP, '읽고 분석해달라고 하기',
          '드롭된 파일 경로 뒤에 이어서 요청을 입력합니다',
          'Enter 를 누르면 Claude 가 파일을 엽니다 — 결과는 다음 장에서 확인합니다')
s.add(section(200, '지금 이 순간 — 입력 중'))
s.add(rect(60, 222, 18, 18, BLUE, rx=4))
s.add(text(88, 236, '1번에서 드롭으로 자동 입력된 경로', 13, MUTED))
s.add(rect(400, 222, 18, 18, OK, rx=4))
s.add(text(428, 236, '지금 입력하고 있는 요청', 13, MUTED))
s.add(prompt_bar(
    60, 280,
    'practice_files/doc_230928_v3.txt 이 파일을 읽고 분석해줘',
    width=1160,
    hint='경로는 이미 들어가 있습니다 — 뒤에 요청만 적으면 됩니다',
))
save('read_txt_분석요청.svg', s)


# 3. read_txt_분석결과 ---------------------------------------------------
s = Slide(BADGE, STEP, 'Claude가 읽은 내용',
          'Read 툴로 파일을 열고 바로 요약합니다',
          '실제 파일을 열어 확인해보세요 — 지어낸 게 아니라 정말 읽은 겁니다')
s.add(section(190, 'Claude 의 응답'))
s.add(terminal(y=212, height=400, lines=[
    ('● Read(practice_files/doc_230928_v3.txt)', OK, 14),
    ('  └ Read 24 lines', MUTED, 12),
    ('--', None),
    ('2026년 3월 9일 회의록입니다. 참석자는 이팀장·박대리·김주임·최인턴입니다.', '#e5e7eb', 13),
    ('', None),
    ('안건1) Q1 실적 검토 — 매출 12% 증가, 반품률 3.2%, 고객 불만 14건', '#e5e7eb', 13),
    ('안건2) 다음 분기 캠페인 — SNS 예산 20% 증액, 신제품 5월 중순 출시', '#e5e7eb', 13),
    ('', None),
    ('결정사항 — 반품 원인 분석 보고서: 박대리(3/14) · 캠페인 기획안: 김주임(3/20)', OK, 13),
    ('다음 회의 — 3월 23일 오전 10시', CYAN, 13),
]))
save('read_txt_분석결과.svg', s)


# 4. read_txt_파일명_변경 -------------------------------------------------
s = Slide(BADGE, STEP, '알아볼 수 있는 이름으로',
          '파일 내용을 근거로 이름을 다시 짓습니다',
          '이름을 바꾸려면 파일 내용을 먼저 이해해야 합니다 — Read 없이는 불가능한 작업입니다')
s.add(section(200, '요청'))
s.add(prompt_bar(60, 222, '바로 알아볼 수 있게 파일명을 바꿔줘', width=760, hint=None))
s.add(section(320, 'Claude 의 변경'))
s.add(rename_rows(362, [
    ('doc_230928_v3.txt', '2026-03-09_Q1실적_회의록.txt', '날짜 · 안건이 이름에 담김'),
]))
s.add(box(420, None, [
    '회의록 내용을 먼저 읽었기 때문에 날짜와 주제를 이름에 담을 수 있었습니다.',
], kind='info'))
save('read_txt_파일명_변경.svg', s)


# 5. read_jpg_드래그드롭 -------------------------------------------------
drag_drop_slide(
    'IMG_20260309_134502.jpg',
    '이번엔 사진',
    '1번과 똑같은 방식으로 사진 파일을 끌어다 놓습니다',
    '사진도 똑같습니다 — 끌어다 놓고 물어보면 됩니다',
    'read_jpg_드래그드롭.svg',
)


# 6. read_jpg_분석결과 ---------------------------------------------------
s = Slide(BADGE, STEP, "사진을 '보고' 설명합니다",
          '이미지 파일도 Read 로 직접 열어서 확인합니다',
          "파일명에는 'IMG'와 숫자뿐인데 내용을 맞혔습니다")
s.add(terminal(y=205, height=390, x=60, width=620, gap=24, start=34, lines=[
    ('● Read(practice_files/IMG_20260309_134502.jpg)', OK, 12.5),
    ('  └ Read image', MUTED, 11.5),
    ('--', None),
    ('나무 도마 위에 적양파를 반으로 잘라', '#e5e7eb', 13),
    ('올려두었습니다.', '#e5e7eb', 13),
    ('', None),
    ('뒤쪽에는 파슬리·파스닙·양배추·당근 같은', MUTED, 12.5),
    ('채소들이 놓여 있습니다.', MUTED, 12.5),
    ('', None),
    ('도마 위에는 통후추 알갱이가 흩어져', '#e5e7eb', 13),
    ('있습니다.', '#e5e7eb', 13),
    ('', None),
    ('따뜻한 자연광 아래 찍은 요리 재료', CYAN, 12.5),
    ('사진으로 보입니다.', CYAN, 12.5),
]))
# 오른쪽 — 실제 이미지 대신 아주 단순한 자리 표시 도식
s.add(rect(720, 205, 480, 390, PANEL_BG, rx=12, stroke=LINE))
s.add(text(960, 236, 'IMG_20260309_134502.jpg', 12, MUTED, mono=True, anchor='middle'))
s.add(text(960, 256, '(자리 표시 — 실제 이미지 아님)', 11, FAINT, anchor='middle'))
# 배경 채소 느낌의 작은 도형들
s.add([f'  <ellipse cx="790" cy="300" rx="20" ry="12" fill="{WARN_BG}" stroke="{WARN_EDGE}"/>'])
s.add([f'  <ellipse cx="1130" cy="300" rx="20" ry="12" fill="{WARN_BG}" stroke="{WARN_EDGE}"/>'])
s.add([f'  <circle cx="850" cy="290" r="10" fill="{WARN_BG}" stroke="{WARN_EDGE}"/>'])
# 나무 도마
s.add(rect(800, 380, 320, 130, WARN_BG, rx=40, stroke=WARN_EDGE, sw=2))
# 적양파 반쪽 두 개 (층 표현은 동심원)
for cx, r in ((915, 46), (1005, 40)):
    s.add([f'  <circle cx="{cx}" cy="435" r="{r}" fill="{BAD}"/>'])
    for rr in (r - 10, r - 20, r - 30):
        if rr > 4:
            s.add([f'  <circle cx="{cx}" cy="435" r="{rr}" fill="none" '
                   f'stroke="{WARN_DEEP}" stroke-width="1.5"/>'])
# 통후추 알갱이
pepper_pts = [(840, 400), (870, 460), (960, 480), (1040, 405), (1075, 450),
              (955, 400), (1000, 475), (860, 430)]
for px, py in pepper_pts:
    s.add([f'  <circle cx="{px}" cy="{py}" r="2.8" fill="{INK}"/>'])
save('read_jpg_분석결과.svg', s)


# 7. read_jpg_파일명_변경 -------------------------------------------------
s = Slide(BADGE, STEP, '사진도 이름을 바꿔줍니다',
          '사진도 내용을 근거로 새 이름을 받습니다',
          '다음 장에서 남은 파일 전부를 한 번에 처리합니다')
s.add(section(200, '요청'))
s.add(prompt_bar(60, 222, '이 사진도 알아볼 수 있게 이름을 바꿔줘', width=800, hint=None))
s.add(section(320, 'Claude 의 변경'))
s.add(rename_rows(362, [
    ('IMG_20260309_134502.jpg', '요리재료_적양파_도마.jpg', None),
]))
s.add(box(420, '지금까지 한 일', [
    '텍스트 파일 1개 · 이미지 파일 1개를 각각 Read 로 읽고 이름을 정리했습니다.',
    '다음은 나머지 파일 전부를 한 번에 처리합니다.',
], kind='ok'))
save('read_jpg_파일명_변경.svg', s)


print('전부 완료.')
