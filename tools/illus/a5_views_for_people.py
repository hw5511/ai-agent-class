import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[soft_zone(35,120,1090,380),text(135,180,'사람이 보는 화면 (뷰)',40,anchor='start'),badge(83,166,1)]
# Three genuine mini views, with a quiet chrome strip and large labels.
for x,title in [(65,'표'),(415,'칸반'),(765,'캘린더')]:
    body += [window(x,230,320,230),text(x+160,266,title,30)]
# Mini table: actual header and two rows.
body += [grid(80,295,[170,120],[['할일','상태'],['보고서','진행 중'],['미팅','시작 전']],rh=49,size=26)]
# Kanban: three columns with real cards.
for j,name in enumerate(['시작 전','진행 중','완료']):
    x=425+j*103
    body.append(text(x+48,318,name,26))
    body.append(rule(x+98,333,x+98,444,LINE,1))
    body.append(rect(x+7,346,82,65,'#fff',ACCENT if j==1 else LINE,2,7))
    body.append(text(x+48,387,['미팅','보고서','발송'][j],26,700))
# Calendar: seven columns, four weeks and a few appointment chips.
for j in range(8): body.append(rule(780+j*41,295,780+j*41,447,LINE,1))
for i in range(5): body.append(rule(780,295+i*38,1067,295+i*38,LINE,1))
for col,row in [(1,0),(4,1),(2,3)]: body.append(rect(784+col*41,299+row*38,33,30,ACCENT_TINT,ACCENT,1,4))
for day in range(1,29):
    col=(day-1)%7
    row=(day-1)//7
    body.append(text(800+col*41,324+row*38,str(day),26,600,MUTED))
# One common database below the three human views.
for tx in (225,575,925): body.append(connector(630,595,tx,482,color=LINE2,width=3,head_size=9))
body += [rect(385,580,640,194,shadow=True),text(705,626,'할일 DB',36),grid(410,649,[340,250],[['할일','상태'],['주간 보고서 작성','진행 중']],rh=51,size=28)]
# The CLI request and its raw-row response run in separate, clear lanes.
body += [mascot(1350,325,1.0),desk(1270,520,425,None,body_h=110),folder(1470,382,190),text(1565,492,'tasks 스킬',30),badge(1290,328,2),arrow('M1310 675C1235 675 1160 675 1065 675',1160,675,1065,675),text(1180,641,'CLI',34,900,ACCENT,family=MONO),arrow('M1058 730C1150 770 1260 760 1287 730',1260,760,1287,730,GREEN),rect(1310,650,440,130,shadow=True),code(1325,687,['{"할일": "주간 보고서 작성",',' "상태": "진행 중"}'],28,43)]
save('a5-views-for-people.svg',body,'A5 three human views of one DB and a CLI returning raw rows')
