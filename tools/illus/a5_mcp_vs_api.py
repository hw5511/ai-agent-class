import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[soft_zone(35,120,825,665,WARM_ZONE),soft_zone(895,120,860,665),text(90,195,'노션 MCP',44,anchor='start'),text(950,195,'API 키',44,anchor='start')]
# An account connection opens the whole six-page collection.
body += [rect(90,285,265,190,shadow=True),brand_icon('notion',185,308,70),text(222,438,'내 계정',36),mascot(100,549,.8),desk(65,670,340,None,body_h=55),arrow('M220 528L220 495',220,528,220,495),badge(147,505,1),arrow('M375 385L425 385',375,385,425,385)]
for row in range(2):
    for col in range(3): body.append(page(465+col*120,300+row*205,True,90))
# Exactly one authorised page on the API side; the remaining pages are muted.
body += [key(980,260,1.0),page(1210,290,True,112),text(1266,465,'테스트 페이지',30),badge(1342,247,2),rule(1100,287,1200,326,ACCENT,5)]
for x,y in [(1435,280),(1585,280),(1435,485),(1565,485),(1630,625)]:
    body += ['<g opacity="0.38">',page(x,y,False,80),'</g>']
# A script and another person can use copies of the same key.
body += [rect(960,575,240,140,shadow=True),text(1080,625,'script.py',32,family=MONO),rule(990,670,1160,670,LINE,3),key(1045,526,.65,False),badge(938,592,3),arrow('M1202 601C1265 587 1300 538 1300 490',1300,538,1300,490)]
body += [mascot(1340,660,.60,fill=ACCENT_MID),key(1470,688,.65,False),badge(1550,750,4),arrow('M1468 657C1430 590 1360 550 1335 490',1360,550,1335,490)]
save('a5-mcp-vs-api.svg',body,'A5 whole-account MCP versus one shared API key and one authorised page')
