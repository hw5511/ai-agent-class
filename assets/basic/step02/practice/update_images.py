"""
read_practice.zip 이미지 교체 스크립트
- 기존 KakaoTalk/IMG 청첩장 이미지 제거
- picsum.photos에서 인물/동물/풍경/음식/도시 사진 다운로드 후 교체
"""
import zipfile
import urllib.request
import os
import shutil

ZIP_PATH = os.path.join(os.path.dirname(__file__), 'read_practice.zip')
TMP_DIR = os.path.join(os.path.dirname(__file__), '_tmp')
TMP_ZIP = ZIP_PATH + '.tmp'

# 다운로드할 이미지 목록 (picsum.photos 특정 ID)
# 각각: 파일명, picsum ID, 설명
IMAGES = [
    ('photo_person.jpg',    '64',  '인물 - 여성 초상화'),
    ('photo_animal.jpg',    '582', '동물 - 강아지'),
    ('photo_landscape.jpg', '15',  '풍경 - 산'),
    ('photo_food.jpg',      '292', '음식'),
    ('photo_city.jpg',      '28',  '도시 풍경'),
]

# 제거할 기존 파일명 (청첩장/불명확 이미지)
OLD_IMAGES = {
    'practice_files/KakaoTalk_20260312_175159585.jpg',
    'practice_files/KakaoTalk_20260312_175159586.jpg',
    'practice_files/KakaoTalk_20260312_175159587.jpg',
    'practice_files/IMG_20260309_134502.jpg',
    'practice_files/IMG_20260311_092341.jpg',
}

def download_image(picsum_id, filename):
    url = f'https://picsum.photos/id/{picsum_id}/800/600'
    save_path = os.path.join(TMP_DIR, filename)
    print(f'  다운로드: {url} -> {filename}')
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    with open(save_path, 'wb') as f:
        f.write(data)
    print(f'  완료: {len(data):,} bytes')
    return save_path

def main():
    os.makedirs(TMP_DIR, exist_ok=True)

    # 이미지 다운로드
    print('=== 이미지 다운로드 ===')
    downloaded = {}
    for filename, picsum_id, desc in IMAGES:
        print(f'[{desc}]')
        path = download_image(picsum_id, filename)
        downloaded[filename] = path

    # ZIP 업데이트
    print('\n=== ZIP 업데이트 ===')
    with zipfile.ZipFile(ZIP_PATH, 'r') as zin:
        with zipfile.ZipFile(TMP_ZIP, 'w', zipfile.ZIP_DEFLATED) as zout:
            # 기존 파일 중 OLD_IMAGES 제외하고 복사
            for item in zin.infolist():
                if item.filename in OLD_IMAGES:
                    print(f'  제거: {item.filename}')
                    continue
                zout.writestr(item, zin.read(item.filename))
                print(f'  유지: {item.filename}')

            # 새 이미지 추가
            for filename, picsum_id, desc in IMAGES:
                zip_path = f'practice_files/{filename}'
                local_path = downloaded[filename]
                with open(local_path, 'rb') as f:
                    data = f.read()
                zout.writestr(zip_path, data)
                print(f'  추가: {zip_path} ({len(data):,} bytes)')

    # 교체
    os.replace(TMP_ZIP, ZIP_PATH)
    print(f'\nZIP 업데이트 완료: {ZIP_PATH}')

    # _tmp에도 복사
    for filename, _, desc in IMAGES:
        src = os.path.join(TMP_DIR, filename)
        print(f'_tmp 저장: {filename}')

    # ZIP 내용 확인
    print('\n=== 최종 ZIP 내용 ===')
    with zipfile.ZipFile(ZIP_PATH, 'r') as z:
        for f in z.infolist():
            print(f'  {f.filename}  ({f.file_size:,} bytes)')

if __name__ == '__main__':
    main()
