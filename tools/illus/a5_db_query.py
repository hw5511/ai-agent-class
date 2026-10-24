import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[bubble(55,125,690,96,'취미가 축구인 사람의 나이는?',36,text_color=INK,tail_x=235),mascot(115,280,1.0),desk(65,430,400,None,body_h=90),soft_zone(530,245,1210,535)]
rows=PEOPLE+[['최유나','25','요가'],['정하늘','37','캠핑']]
body += [grid(640,320,[300,210,350],rows,rh=70,size=34),rect(1150,320,350,70,'none',ACCENT,4,8),badge(1538,348,1),arrow('M1450 420L1450 700',1450,620,1450,700),rect(640,390,860,70,'none',ACCENT,4,6),rect(1155,395,220,60,'none',ACCENT,3,6),badge(590,426,2),arrow('M1152 425L1094 425',1152,425,1094,425,GREEN),f'<ellipse cx="1045" cy="425" rx="43" ry="27" fill="none" stroke="{GREEN}" stroke-width="4"/>',arrow('M1080 405C1120 400 1120 310 1120 285C1120 240 1380 255 1510 255',1380,255,1510,255,GREEN),bubble(1530,195,175,110,'34',58,stroke=GREEN,text_color=GREEN),badge(1690,176,3)]
save('a5-db-query.svg',body,'A5 query hobby football returns age 34')
