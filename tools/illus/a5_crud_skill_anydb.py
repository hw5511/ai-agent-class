import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[soft_zone(1015,120,740,665),mascot(160,358,1.15),desk(90,550,520,None,body_h=180),folder(380,397,190),text(474,509,'tasks 스킬',32),rect(180,652,340,58),text(350,692,'연결 + CRUD',34),badge(100,360,1)]
# The skill's concrete connection is blue. Alternatives reuse the same route shape.
body += [arrow('M650 450C820 450 1020 250 1342 250',1020,250,1342,250),arrow('M650 495C815 495 1050 475 1362 475',1050,475,1362,475,MUTED),arrow('M650 540C815 540 1030 690 1353 690',1030,690,1353,690,MUTED),text(855,541,'연결만 바꾸면',28,800,MUTED)]
# Equal 220px vertical slots, with every badge and label above its object.
for label, number, baseline in [('노션 DB',2,166),('로컬 DB',3,386),('다른 DB',4,606)]:
    body += [badge(1345,baseline-12,number),text(1390,baseline,label,34,anchor='start')]
# Comparable silhouettes: a 280px table, a 268px laptop, a 268px cloud.
body += [grid(1345,180,[160,120],[['할일','상태'],['보고서','진행 중']],rh=72,size=28),brand_icon('notion',1357,195,36)]
body += [laptop(1365,400,240,rect(18,18,184,100)+text(110,81,'tasks.db',28,family=MONO))]
body += ['<g transform="translate(1485 687) scale(1.4 1)">',cloud(0,0,.36,ACCENT_TINT,shadow=False),'</g>',f'<path d="M1431 651V715C1431 741 1539 741 1539 715V651" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>',f'<ellipse cx="1485" cy="651" rx="54" ry="17" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>',f'<path d="M1431 680C1431 706 1539 706 1539 680" fill="none" stroke="{ACCENT}" stroke-width="3"/>']
save('a5-crud-skill-anydb.svg',body,'A5 one CLI skill connects to Notion local and other databases')
