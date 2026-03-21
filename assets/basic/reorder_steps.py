"""
basic step01~08 SVG 파일 번호를 slides 배열 순서에 맞게 순차 정렬
step03은 이미 완료되어 skip
"""
import os

BASE = "C:/woohee_dev/404_ai_agent_lecture/lecture/assets/basic"

# slides 배열 (index.html 기준)
STEPS = {
    'step01': ['01','02','03','04','05','31','32','33','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','24','25','23','26','27','28','29','30'],
    'step02': ['01','02','12','03','13','04','05','06','15','07','16','08','17','09','18','10'],
    # step03: already sequential 01-18, skip
    'step04': ['01','02','11','03','12','04','05','06','13','07'],
    'step05': ['01','02','03','12','15','16','14','04','05','13','06','07','08','09'],
    'step06': ['01','02','03','04','11','12','13','05','14','15','16','17','18','19','20'],
    'step07': ['01','02','03','04','05','11','12','13'],
    'step08': ['01','02','03','06','05','12','13','14','15','16','17'],
}

for step, slide_order in STEPS.items():
    step_dir = os.path.join(BASE, step)
    n = len(slide_order)
    new_names = [f"{i+1:02d}" for i in range(n)]

    # 이미 순차적인지 확인
    if slide_order == new_names:
        print(f"{step}: already sequential, skip")
        continue

    # 배열에 없는 SVG 파일 아카이브
    all_svgs = [f[:-4] for f in os.listdir(step_dir)
                if f.endswith('.svg') and not f.startswith('z_') and not f.startswith('_')]
    non_array = [f for f in all_svgs if f not in slide_order]
    for fname in non_array:
        old_path = os.path.join(step_dir, f"{fname}.svg")
        new_path = os.path.join(step_dir, f"z_archive_{fname}.svg")
        os.rename(old_path, new_path)
        print(f"  {step}: archive {fname}.svg -> z_archive_{fname}.svg")

    # Step 1: 모든 slides 파일 → _tmp 이름으로
    for i, old in enumerate(slide_order):
        old_path = os.path.join(step_dir, f"{old}.svg")
        tmp_path = os.path.join(step_dir, f"_tmp{i+1:02d}.svg")
        os.rename(old_path, tmp_path)

    # Step 2: _tmp → 최종 순차 번호로
    for i in range(1, n + 1):
        tmp_path = os.path.join(step_dir, f"_tmp{i:02d}.svg")
        final_path = os.path.join(step_dir, f"{i:02d}.svg")
        os.rename(tmp_path, final_path)

    print(f"{step}: {n}장 정렬 완료")
    for i, old in enumerate(slide_order):
        new = f"{i+1:02d}"
        if old != new:
            print(f"  {old}.svg -> {new}.svg")

print("\n모든 step 처리 완료")
