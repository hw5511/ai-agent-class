"""AR2/2 part 1 seen as ETL: six steps in a row, bracketed into 추출 / 변환 / 적재. Badges 1-3."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = []
N, BW, GAP, X0, Y0, BH = 6, 230, 52, 76, 360, 190
steps = [("도란에서 받기", "zip 파일 내려받기"), ("압축 풀기", "신청서 읽기"), ("환율", "사용일 매매기준율"),
         ("규칙 판정", "한도·증빙·중복"), ("결과 파일", "이체·전표·총괄표"), ("회신·전달", "도란으로 보내기")]
groups = [(0, 1, "추출", "Extract", 1), (2, 3, "변환", "Transform", 2), (4, 5, "적재", "Load", 3)]
for i, (lab, sub) in enumerate(steps):
    x = X0 + i * (BW + GAP)
    b += [part_box(x, Y0, BW, BH, fill="#fff", stroke=LINE2, corner=18)]
    b += [text(x + 28, Y0 + 40, f"{i + 1:02d}", 22, 800, ACCENT, anchor="start", family=MONO)]
    b += [text(x + BW / 2, Y0 + 104, lab, 30, 900, INK)]
    b += [text(x + BW / 2, Y0 + 150, sub, 21, 600, MUTED)]
    if i < N - 1:
        b += [connector(x + BW + 6, Y0 + BH / 2, x + BW + GAP - 6, Y0 + BH / 2)]
for g0, g1, ko, en, n in groups:
    x0 = X0 + g0 * (BW + GAP)
    x1 = X0 + g1 * (BW + GAP) + BW
    yb = Y0 + BH + 40
    b += [f'<path d="M{x0} {yb - 12}V{yb}H{x1}V{yb - 12}" fill="none" stroke="{MUTED}" stroke-width="2.5"/>']
    b += [badge(x0 + 22, yb + 50, n), text(x0 + 60, yb + 60, ko, 34, 900, INK, anchor="start"),
          text(x0 + 60 + 38 * len(ko) + 12, yb + 60, en, 24, 600, MUTED, anchor="start")]
b += [text((X0 + X0 + 6 * BW + 5 * GAP) / 2, 300, "1부에서 혼자 한 일", 30, 800, ACCENT_DARK)]
print(save("ar2-bridge-etl.svg", b, "AR2/2 part 1 as ETL (tools/illus/ar2_bridge_etl.py)"))
