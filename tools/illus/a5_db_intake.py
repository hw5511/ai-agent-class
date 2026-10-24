import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

body=[soft_zone(30,130,520,650,WARM_ZONE),soft_zone(1200,130,562,650),text(300,188,'병원',40)]
# The visitor and the submitted clipboard occupy separate spaces above the desk.
body += [rect(255,276,270,350,'#e4e8ed',LINE2,3,16),rect(270,294,240,315),rect(325,261,130,36,DESK_TOP,LINE2),text(390,348,'인적사항',32),badge(263,268,1)]
for i,line in enumerate(['이름  김민수','나이  34','취미  축구','연락처','010-1234-5678']):
    body.append(text(285,395+i*42,line,24,600,anchor='start'))
body += [mascot(55,520,.73),rule(238,576,254,560,MASCOT,10),desk(55,640,475,'접수',body_h=100)]
body += [text(890,220,'객체',40),rect(630,265,520,330,shadow=True),badge(650,265,2),code(650,319,['{','  "이름": "김민수",','  "나이": 34,','  "취미": "축구",','  "연락처": "010-1234-5678"','}'],28,45)]
rows=[['이름','나이','취미','연락처'],['이지은','28','등산','010-2222-3333'],['박서준','41','독서','010-4444-5555'],['김민수','34','축구','010-1234-5678']]
body += [grid(1225,265,[112,68,84,248],rows,rh=83,size=26),rect(1225,514,512,83,'none',ACCENT,4,8),badge(1718,630,3),text(1480,668,'한 행',36,900,ACCENT),arrow('M555 425L605 425',555,425,605,425),arrow('M1170 555L1201 555',1170,555,1201,555)]
save('a5-db-intake.svg',body,'A5 reception form to object to one database row')
