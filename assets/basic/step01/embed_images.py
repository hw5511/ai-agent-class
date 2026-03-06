"""
SVG 내 외부 이미지 참조를 Base64 데이터 URL로 교체하는 스크립트.
같은 폴더의 SVG 파일들을 순회하며 <image href="*.png"> 를 찾아 인라인 embed 처리.
"""

import os
import re
import base64

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def embed_images_in_svg(svg_path):
    with open(svg_path, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(r'href="([^"]+\.png)"')
    matches = pattern.findall(content)

    if not matches:
        return False

    changed = False
    for png_name in matches:
        png_path = os.path.join(BASE_DIR, png_name)
        if not os.path.exists(png_path):
            print(f'  [SKIP] PNG not found: {png_name}')
            continue

        with open(png_path, 'rb') as f:
            b64 = base64.b64encode(f.read()).decode('ascii')

        data_url = f'data:image/png;base64,{b64}'
        content = content.replace(f'href="{png_name}"', f'href="{data_url}"')
        changed = True
        print(f'  [OK] embedded {png_name} ({len(b64)//1024}KB)')

    if changed:
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(content)

    return changed


def main():
    svg_files = sorted(f for f in os.listdir(BASE_DIR) if f.endswith('.svg'))
    print(f'Found {len(svg_files)} SVG files in {BASE_DIR}\n')

    for svg_file in svg_files:
        svg_path = os.path.join(BASE_DIR, svg_file)
        print(f'Processing: {svg_file}')
        result = embed_images_in_svg(svg_path)
        if not result:
            print('  (no external images)')


if __name__ == '__main__':
    main()
