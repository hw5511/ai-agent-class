#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SVG 슬라이드를 내용 기반 한글 파일명으로 변경하고 slides.json 생성.
기존 번호 순서 방식 -> slides.json 기반 순서 관리로 전환.

Usage:
    python make_slides_json.py          # 실제 실행 (파일 변경)
    python make_slides_json.py --dry    # 미리보기 (파일 변경 없음)
"""
import sys
import re
import json
import xml.etree.ElementTree as ET
from pathlib import Path

BASE = Path("C:/woohee_industries/40-학원/44-에이전트강의/44.02-consultation/lecture/assets")
SVG_NS = 'http://www.w3.org/2000/svg'
DRY_RUN = '--dry' in sys.argv

# step03: 20.svg를 5번 슬라이드 뒤(6번 위치)에 삽입
STEP03_ORDER = ['01','02','03','04','05','20','06','07','08','09','10','11','12','13','14','15','16','17','18','19']


def extract_title(svg_path):
    """SVG에서 가장 큰 font-size의 텍스트를 제목으로 추출"""
    try:
        tree = ET.parse(str(svg_path))
        root = tree.getroot()
        texts = root.findall(f'.//{{{SVG_NS}}}text')
        max_size = 0
        title = None
        for t in texts:
            try:
                size = float(t.get('font-size', 0))
            except (ValueError, TypeError):
                continue
            if size > max_size and t.text and t.text.strip():
                max_size = size
                title = t.text.strip()
        return title
    except Exception as e:
        print(f"    [오류] {svg_path.name}: {e}")
        return None


def make_safe_name(title, used_names):
    """제목 -> Windows 안전 파일명 (중복 처리 포함)"""
    if not title:
        return None
    name = title
    name = name.replace('/', '_').replace('\\', '_')
    name = re.sub(r'[<>:"|?*\r\n\t]', '', name)
    name = re.sub(r'\s+', '_', name.strip())
    name = re.sub(r'_+', '_', name).strip('_')
    if len(name) > 45:
        name = name[:45].rstrip('_')
    if not name:
        name = 'slide'
    candidate = name + '.svg'
    if candidate not in used_names:
        return candidate
    counter = 2
    while f"{name}_{counter}.svg" in used_names:
        counter += 1
    return f"{name}_{counter}.svg"


def process_step(step_dir, ordered_stems=None):
    """한 step 폴더 처리: 파일명 변경 + slides.json 생성"""
    step_dir = Path(step_dir)
    label = f"{step_dir.parent.name}/{step_dir.name}"

    svg_files = sorted([
        f for f in step_dir.iterdir()
        if f.suffix == '.svg'
        and not f.name.startswith('z_')
        and not f.name.startswith('_')
    ], key=lambda x: x.name)

    if not svg_files:
        print(f"  [{label}] SVG 없음, 건너뜀")
        return

    num_to_file = {f.stem: f for f in svg_files}

    if ordered_stems:
        order = [s for s in ordered_stems if s in num_to_file]
        # 배열에 없는 파일 -> 아카이브 대상
        archive_stems = [f.stem for f in svg_files if f.stem not in ordered_stems]
    else:
        order = [f.stem for f in svg_files]
        archive_stems = []

    rename_map = {}
    used_names = set()

    for stem in order:
        f = num_to_file[stem]
        title = extract_title(f)
        new_name = make_safe_name(title, used_names) if title else f.name
        if not new_name:
            new_name = f.name
        used_names.add(new_name)
        rename_map[f.name] = new_name

    for stem in archive_stems:
        f = num_to_file[stem]
        rename_map[f.name] = f"z_archive_{f.name}"

    print(f"\n  [{label}] {len(order)}장:")
    for old, new in rename_map.items():
        arrow = " -> " if old != new else " (유지)"
        print(f"    {old}{arrow}{new}")

    if DRY_RUN:
        slides_order = [rename_map[num_to_file[s].name] for s in order]
        print(f"    [dry] slides.json: {slides_order}")
        return

    # 파일명 변경 (tmp 방식으로 충돌 방지)
    tmp_map = {}
    for old, new in rename_map.items():
        old_path = step_dir / old
        if not old_path.exists():
            print(f"    [경고] {old} 없음, 건너뜀")
            continue
        tmp = f"_tmp_{old}"
        old_path.rename(step_dir / tmp)
        tmp_map[tmp] = new

    for tmp, new in tmp_map.items():
        (step_dir / tmp).rename(step_dir / new)

    # slides.json 생성
    slides_order = [rename_map[num_to_file[s].name] for s in order]
    json_path = step_dir / 'slides.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump({"slides": slides_order}, f, ensure_ascii=False, indent=2)

    print(f"    -> slides.json 생성 완료 ({len(slides_order)}장)")


def main():
    mode = "DRY RUN (미리보기)" if DRY_RUN else "실제 실행"
    print(f"=== SVG 슬라이드 한글 이름 변환 [{mode}] ===")

    for course in ['basic', 'advanced']:
        print(f"\n[{course.upper()}]")
        for step_num in range(1, 9):
            step_folder = f"step{step_num:02d}"
            step_dir = BASE / course / step_folder
            if not step_dir.exists():
                continue
            special = STEP03_ORDER if (course == 'basic' and step_folder == 'step03') else None
            process_step(step_dir, ordered_stems=special)

    print("\n=== 완료 ===")


if __name__ == '__main__':
    main()
