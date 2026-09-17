# -*- coding: utf-8 -*-
"""basic step02 — Read 툴 파트의 "폴더 통째로 일괄 처리" + 마무리 슬라이드 5장.

앞 슬라이드(다른 스크립트 담당)에서 txt 1개·jpg 1개를 하나씩 드래그해
분석해봤다. 이 스크립트는 그 다음 — practice_files 폴더 전체를 한 번에
넘겨 나머지 6개를 일괄 처리하는 과정과, Read 파트를 마무리하는 정리
슬라이드를 만든다.

좌표는 손으로 만들지 않고 tools/slidekit.py 함수만 쓴다.
slides.json / courses/basic/step02.json 은 이 스크립트가 건드리지 않는다
(배선은 다른 곳에서 한다).
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from slidekit import (Slide, vscode, terminal, check_rows, box, two_col, section,
                      text, rect, flow_row, down_arrow, card, arrow, callout,
                      prompt_bar, rename_rows, TINTS,
                      OK, OK_DEEP, BAD, WARN, WARN_DEEP, CYAN, CODE,
                      BLUE, BLUE_DEEP, MUTED, FAINT, INK, PANEL_BG, LINE)

A = 'assets/basic/step02'
B, S = 'BASIC 02', 'STEP 3'


# ── 1. 폴더째로 드래그 & 드롭 ──────────────────────────────────────
s = Slide(B, S, '이번엔 폴더째로',
          'practice_files 폴더 전체를 오른쪽 Claude 창으로 끌어다 놓습니다',
          '폴더를 넘기면 그 안의 파일을 전부 살펴봅니다')
s.add(vscode(
    tree=[(0, 'agent1', 'folder', False),
          (1, '.claude', 'folder', False),
          (2, 'CLAUDE.md', 'file', False),
          (1, 'practice_files', 'folder', True)],
    tab=None,
    editor=[],
    term=[
        ('✳ Claude Code', CYAN, 13),
        ('', None),
        ('> ', '#e5e7eb', 14),
    ],
))
s.add(text(124, 370, '← 파일 8개가 든 폴더', 12.5, MUTED))
s.add(arrow(326, 324, 950, 430, color=BLUE_DEEP, dashed=True))
s.add(callout(966, 456, '← 폴더째로 드롭', BLUE_DEEP, 15))
s.add(box(468, None, [
    '파일 하나가 아니라 practice_files 폴더 자체를 드래그합니다.',
    '이렇게 넘기면 Claude 는 폴더 안의 파일을 전부 확인할 수 있습니다.',
], kind='plain'))
s.save(os.path.join(A, 'read_폴더_드래그드롭.svg'))


# ── 2. 나머지도 모두 (프롬프트 한 줄 → 여러 단계) ───────────────────
s = Slide(B, S, '나머지도 모두',
          '프롬프트 한 줄로 남은 6개 파일을 한 번에 처리합니다',
          '프롬프트 한 줄이 에이전트 안에서 여러 단계로 풀립니다')
s.add(section(180, '학생이 입력하는 프롬프트'))
s.add(prompt_bar(60, 204, '나머지 파일들도 모두 읽고 파일명 바꿔줘', width=1160))
s.add(down_arrow(640, 256, 308, '펼치면'))
s.add(box(316, '이 한 줄이 실제로 시키는 일', [
    '1.  practice_files 안 나머지 6개 파일을 하나씩 엽니다',
    '2.  txt · pdf · 이미지 — 형식에 맞게 내용을 읽습니다',
    '3.  내용을 이해하고 어떤 파일인지 파악합니다',
    '4.  내용에 맞는 새 이름을 짓고, 파일명을 바꿉니다',
], kind='info'))
s.save(os.path.join(A, 'read_일괄_요청.svg'))


# ── 3. 한 파일씩 읽어나갑니다 (터미널 로그) ──────────────────────────
s = Slide(B, S, '한 파일씩 읽어나갑니다',
          'Claude 가 파일을 하나씩 순서대로 처리합니다',
          '읽고 → 이해하고 → 이름을 바꾸고, 파일마다 이 과정을 반복합니다')
s.add(section(184, '진행 로그'))
s.add(terminal(y=208, height=356, lines=[
    ('● Read(practice_files/temp_1104.txt)', OK, 14),
    ('  └ Read 18 lines', MUTED, 13),
    ('● Bash(mv temp_1104.txt → 업무메모_거래처_경비정산.txt)', OK, 13),
    ('  └ 완료', MUTED, 13),
    ('--', None),
    ('● Read(practice_files/report_final_v2.pdf)', OK, 14),
    ('  └ Read 3 pages', MUTED, 13),
    ('● Bash(mv report_final_v2.pdf → 2026_1분기_영업실적_보고서.pdf)', OK, 12.5),
    ('  └ 완료', MUTED, 13),
    ('--', None),
    ('  ... 나머지 4개 파일도 같은 방식으로 계속됩니다', MUTED, 13),
]))
s.save(os.path.join(A, 'read_일괄_진행.svg'))


# ── 4. 8개가 전부 이름을 찾았습니다 (전체 결과표) ────────────────────
s = Slide(B, S, '8개가 전부 이름을 찾았습니다',
          '파일명만 보고는 몰랐던 내용이 전부 이름에 담겼습니다',
          '읽었기 때문에 이런 이름을 지을 수 있었습니다')
s.add(section(190, '변경 결과 — practice_files 8개 전부'))
s.add(rename_rows(222, [
    ('doc_230928_v3.txt', '2026-03-09_Q1실적_회의록.txt', '회의록'),
    ('temp_1104.txt', '업무메모_거래처_경비정산.txt', '업무 메모'),
    ('report_final_v2.pdf', '2026_1분기_영업실적_보고서.pdf', '영업 보고서'),
    ('IMG_20260309_134502.jpg', '요리재료_적양파_도마.jpg', '요리 사진'),
    ('IMG_20260311_092341.jpg', '풍경_여름_계곡_숲.jpg', '풍경 사진'),
    ('KakaoTalk_20260312_175159585.jpg', '청첩장_김민준_이지은_2026-05-16.jpg', '청첩장'),
    ('KakaoTalk_20260312_175159586.jpg', '동물_코요테_설원.jpg', '동물 사진'),
    ('KakaoTalk_20260312_175159587.jpg', '풍경_폭포_계곡.jpg', '풍경 사진'),
], gap=34))
s.add(box(506, None, [
    '이제는 파일을 열어보지 않아도, 이름만 보고 안에 뭐가 있는지 알 수 있습니다.',
], kind='ok'))
s.save(os.path.join(A, 'read_결과_전체.svg'))


# ── 5. Read 툴 정리 (파트 마무리) ────────────────────────────────────
s = Slide(B, S, 'Read 툴 정리',
          'Read 로 배운 네 가지를 정리합니다',
          '파일 하나든 폴더 전체든, 원리는 같습니다')
s.add(section(180, '이번 파트에서 배운 것'))
s.add(check_rows(208, [
    ('[v]', '직접 읽기', 'Read 는 텍스트 · 이미지 · PDF 를 직접 열어 읽습니다', OK),
    ('[v]', '드래그&드롭', '파일이나 폴더를 건네면 그대로 전달됩니다', OK),
    ('[v]', '이름 짓기', '읽었기 때문에 내용에 맞는 이름을 지을 수 있습니다', OK),
    ('[v]', '동일 방식', '파일 하나든 폴더 전체든 방식은 같습니다', OK),
], gap=40))
s.add(box(372, '/clear 로 정리하고 다음으로', [
    '/clear 는 지금 채팅방을 나가고 새 채팅방으로 가는 것입니다.',
    '입력하면 대화를 정리하고 다음 실습으로 이어갑니다.',
], kind='ok'))
s.add(box(512, '다음 시간', [
    '에이전트가 파일을 직접 만드는 Write 툴을 다룹니다',
], kind='info'))
s.save(os.path.join(A, 'read_정리.svg'))

print('완료: 5장 생성')
