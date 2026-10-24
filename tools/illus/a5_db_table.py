import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[soft_zone(40,145,580,630,WARM_ZONE),text(330,225,'흩어진 정보',42),badge(80,180,1)]
notes=[(95,285,270,100,-5,'김민수 34세'),(320,385,245,100,5,'축구 좋아함'),(90,470,255,100,-4,'이지은 등산'),(360,580,155,95,6,'28세'),(85,640,260,100,-3,'박서준 독서'),(360,260,155,95,7,'41세')]
for x,y,w,h,rot,label in notes:
    body += [f'<g transform="rotate({rot} {x+w/2} {y+h/2})">',rect(x,y,w,h,shadow=True),rect(x+w/2-24,y-8,48,16,'#e5e8ec','#e5e8ec',0,2),text(x+w/2,y+h/2+11,label,32),'</g>']
# Keep the row callout level with Kim's row; the bracket has no continuation.
body += [grid(800,280,[220,130,200],PEOPLE,rh=100,size=36),rect(800,280,550,100,'none',ACCENT,4,8),text(1075,218,'분류 기준 (열)',38,900,ACCENT),badge(1340,208,2),rect(800,380,550,100,'none',ACCENT,3,6),f'<path d="M1366 387H1382V473H1366" fill="none" stroke="{ACCENT}" stroke-width="4" stroke-linejoin="round"/>',text(1468,440,'같은 사람의 정보 (행)',26,900,ACCENT,anchor='start'),badge(1427,430,3),arrow('M655 480C705 480 735 480 770 480',735,480,770,480)]
save('a5-db-table.svg',body,'A5 scattered facts to columns and rows')
