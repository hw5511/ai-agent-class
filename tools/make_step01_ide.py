# -*- coding: utf-8 -*-
"""basic step01 — 슬라이드 60 '대화 전에 기본 세팅 두 가지' 재생성.

카드 텍스트 대신 실제 터미널 캡처(assets/clis/claude/model_ide_select_none.png)를
그대로 보여준다. 프레임 구성은 assets/basic/step01/claude_실행_화면.svg 가 쓰는
'창 목업 + 인라인 base64 PNG' 패턴을 그대로 따른다 (slidekit 의 rect/text 만 사용,
image 삽입은 이 파일 안에서 직접 구성 — slidekit.py 는 읽기 전용이라 손대지 않는다).
"""
import base64
import io
import os
import sys
import xml.etree.ElementTree as ET

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import Slide, rect, text

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(REPO, 'assets', 'basic', 'step01')
CAPTURE = os.path.join(REPO, 'assets', 'clis', 'claude', 'model_ide_select_none.png')
OUT = os.path.join(A, 'claude_기본_세팅.svg')

B, S = 'BASIC 01', 'STEP 5'
TITLE = '대화 전에 기본 세팅 두 가지'
FOOTNOTE = '/model sonnet 으로 모델을 정한 뒤 /ide 목록에서 2. None 을 선택해 VS Code 연동을 끊습니다'
WIN_LABEL = 'Claude Code · 기본 세팅'

# 캡처 원본 크기 (Pillow 로 실측: 664x462)
IMG_W, IMG_H_RAW = 664, 462

# 캡처 맨 위 2px 에 스크롤 위로 잘린 이전 줄("...he API behavior")의 흔적이
# 남아 있다 — 실측(픽셀 diff)으로 y=0~1 만 배경색이 아님을 확인. 그 잔재를
# 크롭해서 완전한 첫 줄("Claude Code v2.1.278")부터 보이게 한다.
CROP_TOP = 2
IMG_H = IMG_H_RAW - CROP_TOP

# 참조 슬라이드(claude_실행_화면.svg)와 같은 세로 구간을 쓴다: y=118 ~ 638 (bottom, footnote 위 34px 여백)
WIN_Y = 118
WIN_BOTTOM = 638
WIN_H = WIN_BOTTOM - WIN_Y          # 520
CONTENT_H = WIN_H - 35              # 타이틀바 34 + 테두리 1
CONTENT_W = round(CONTENT_H * IMG_W / IMG_H)
WIN_W = CONTENT_W + 2
WIN_X = round((1280 - WIN_W) / 2)


def window_chrome(x0, y0, w, label):
    """터미널 창 틀(둥근 모서리 헤더 + 신호등 점)을 만든다. claude_실행_화면.svg 와 동일 공식."""
    o = []
    path = (f'  <path d="M{x0+10} {y0+1}h{w-20}a9 9 0 0 1 9 9v23'
            f'H{x0+1}v-23a9 9 0 0 1 9-9z" fill="#f3f4f6"/>')
    o.append(path)
    o.append(f'  <circle cx="{x0+22}" cy="{y0+17}" r="5" fill="#ef4444"/>'
             f'<circle cx="{x0+40}" cy="{y0+17}" r="5" fill="#f59e0b"/>'
             f'<circle cx="{x0+58}" cy="{y0+17}" r="5" fill="#22c55e"/>')
    o.append(text(x0 + 85, y0 + 22, label, 12, '#374151', '500'))
    return o


def main():
    if not os.path.exists(CAPTURE):
        raise SystemExit(f'캡처 파일 없음: {CAPTURE}')

    with Image.open(CAPTURE) as im:
        assert im.size == (IMG_W, IMG_H_RAW), f'캡처 크기가 예상과 다름: {im.size}'
        cropped = im.crop((0, CROP_TOP, IMG_W, IMG_H_RAW))
        buf = io.BytesIO()
        cropped.save(buf, format='PNG')
        b64 = base64.b64encode(buf.getvalue()).decode('ascii')

    s = Slide(B, S, TITLE, None, FOOTNOTE)
    s.add(rect(WIN_X, WIN_Y, WIN_W, WIN_H, '#ffffff', rx=10, stroke='#d1d5db', sw=1.5))
    s.add(window_chrome(WIN_X, WIN_Y, WIN_W, WIN_LABEL))
    cx, cy = WIN_X + 1, WIN_Y + 34
    s.add(rect(cx, cy, CONTENT_W, CONTENT_H, '#19191b'))
    # 타이틀바 크롬 바로 아래 여백을 둬서 캡처 첫 줄이 크롬에 잘리지 않게 한다.
    # 여백만큼 줄인 높이로 비율을 유지해 다시 계산하고, 남는 폭은 가운데 정렬한다.
    IMG_MARGIN_TOP = 14
    img_h = CONTENT_H - IMG_MARGIN_TOP
    img_w = round(img_h * IMG_W / IMG_H)
    img_x = cx + round((CONTENT_W - img_w) / 2)
    img_y = cy + IMG_MARGIN_TOP
    s.add(f'  <image x="{img_x}" y="{img_y}" width="{img_w}" height="{img_h}" '
          f'href="data:image/png;base64,{b64}"/>')

    s.save(OUT)

    # 검증: XML 파싱 + 파일 크기 + base64 payload 가 유효 PNG 로 디코딩되는지
    ET.parse(OUT)
    size = os.path.getsize(OUT)
    raw = base64.b64decode(b64)
    assert raw[:8] == b'\x89PNG\r\n\x1a\n', 'base64 payload 가 PNG 시그니처가 아님'
    print(f'검증 완료: {OUT} ({size:,} bytes), PNG payload {len(raw):,} bytes (top {CROP_TOP}px 크롭됨) 디코딩 OK')


if __name__ == '__main__':
    main()
