import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[soft_zone(35,120,840,665,WARM_ZONE),soft_zone(910,120,845,665),text(95,190,'메모',44,anchor='start'),text(965,190,'DB',44,anchor='start'),rect(85,225,730,360,shadow=True),text(125,280,'환자메모.md',36,anchor='start'),badge(805,242,1)]
memo=['3월 12일 오전에 김민수 님이 처음 오셨다.','나이는 34세라고 하셨고, 주말마다 축구를 하신다.','연락처는 010-1234-5678로 적어 주셨다.','이지은 님은 28세이고 등산을 좋아하신다.','산에 갈 때마다 사진을 많이 찍는다고 하셨다.','박서준 님은 41세이며 취미는 독서라고 하셨다.','평일 저녁에는 주로 집에서 책을 읽으신다.','김민수 님의 다음 방문은 다음 주 월요일이다.','이지은 님은 오후 시간에 방문하기를 원하셨다.']
for i,line in enumerate(memo): body.append(text(124,321+i*28,line,23,500,MUTED,anchor='start'))
body += [mascot(560,573,.82),desk(495,690,320,None,body_h=45),gauge(95,705,325,.94,MASCOT),badge(451,720,2)]
# The retrieved row floats between the table and Claude, with a clear gap for
# the return arrow and the whole mascot above its desk.
body += [grid(965,235,[285,170,275],PEOPLE,rh=66,size=32),rect(945,532,730,66,'#d2dce6','#d2dce6',0,8),grid(925,523,[285,170,275],[['김민수','34','축구']],rh=66,size=34,header=False),rect(925,523,730,66,'none',ACCENT,4,8),badge(1700,556,3),arrow('M1508 603L1508 626',1508,603,1508,626,GREEN),mascot(1430,640,.65),desk(1380,746,300,None,body_h=18),gauge(965,705,325,.10,GREEN),badge(1322,720,4)]
save('a5-db-memo-vs-db.svg',body,'A5 whole memo context versus a single retrieved database row')
