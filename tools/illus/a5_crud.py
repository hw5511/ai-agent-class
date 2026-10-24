import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[soft_zone(995,140,760,635),mascot(110,460,1.05),desk(55,625,385,'tasks 스킬',body_h=125),text(1380,195,'할일 DB',44)]
# Badges follow the slide notes (max 4): 1 Create, 2 Read, 3 Update and Delete together, 4 Query.
operations=[('추가 (Create)',ACCENT),('조회 (Read)',GREEN),('수정 (Update)',ACCENT),('삭제 (Delete)',ACCENT),('쿼리 (Query)',GREEN)]
for i,(label,color) in enumerate(operations):
    y=255+i*101
    body += [rect(535,y-36,365,74,'#fff',LINE,2,12),badge(498,y, (1,2,3,3,4)[i]),text(716,y+11,label,32,800)]
    if i in (1,4): body.append(arrow(f'M982 {y}L928 {y}',982,y,928,y,color))
    else: body.append(arrow(f'M923 {y}L978 {y}',923,y,978,y,color))
body += [rect(1190,219,370,56,'#fff',ACCENT,3,12),text(1375,257,'마감 이번 주',30,900,ACCENT)]
rows=[['할일','상태','마감'],['주간 보고서 작성','진행 중 → 완료','10-27'],['거래처 미팅 준비','시작 전','10-28'],['견적서 발송','완료','10-24'],['+ 회의록 정리','시작 전','10-29']]
body += [grid(1015,295,[330,240,150],rows,rh=85,size=28)]
for y in (380,465,635): body.append(rect(1015,y,720,85,'none',GREEN,3,6))
body += [rect(1348,385,234,75,'none',ACCENT,3,6),rule(1035,593,1715,593,RED,3)]
save('a5-crud.svg',body,'A5 tasks skill Create Read Update Delete Query and their effects')
