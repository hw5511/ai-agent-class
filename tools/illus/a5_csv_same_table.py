import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *
from a5_parts import *

NOTION = [['할 일', '날짜', '완료'], ['팀 주간 회의', '11-02', '✓'], ['견적서 발송', '11-13', ''], ['월간 예산안 검토', '11-03', '']]
ROWS = [['할 일', '날짜', '완료'], ['팀 주간 회의', '11-02', '✓'], ['견적서 발송', '11-13', '✓'], ['월간 예산안 검토', '11-03', '']]
W = [230, 110, 80]

# Left: the Notion DB, in "the other place". It is only read once.
body = [soft_zone(56, 120, 560, 660)]
body += [brand_icon('notion', 170, 176, 48), text(236, 212, '노션 DB', 36, anchor='start'), badge(112, 200, 1)]
body += [grid(126, 268, W, NOTION, rh=76, size=26)]
body += [text(336, 640, '처음 한 번만 읽음', 28, 700, MUTED)]

# The one-time copy, ending at the CSV file on my computer.
body += [arrow('M616 420C680 420 720 420 792 420', 720, 420, 792, 420), text(704, 372, '한 번 복사', 28, 800, MUTED), badge(704, 460, 2)]

# Middle: the same table, now a file. A file tab marks it as a file, not a service.
body += [rect(810, 176, 240, 58, '#fff', ACCENT, 3, 12), text(930, 215, 'todolist.csv', 28, family=MONO)]
body += [grid(810, 232, W, ROWS, rh=76, size=26), badge(1236, 214, 3)]

# Under the file: Claude's tasks skill reads and writes it.
body += [mascot(824, 580, .62), folder(1020, 590, 170), text(1105, 688, 'tasks 스킬', 28)]
body += [arrow('M1105 590C1105 570 1105 560 1105 544', 1105, 560, 1105, 544), arrow_head_at(1105, 570, 1105, 594, 20, ACCENT), text(1250, 574, '읽기 · 쓰기', 28, 800, MUTED)]

# Right: the live page shows what the file holds.
page_body = rect(24, 22, 268, 44, '#fff', LINE, 2, 8) + rect(24, 80, 268, 44, '#fff', LINE, 2, 8) + rect(24, 138, 268, 44, '#fff7d6', '#e8c24a', 2, 8)
page_body += text(158, 52, '팀 주간 회의', 22, 700) + text(158, 110, '월간 예산안 검토', 22, 700) + text(158, 168, '견적서 발송', 22, 700)
body += [window(1424, 236, 316, 262, 'browser', '127.0.0.1', page_body), badge(1582, 200, 4)]
body += [arrow('M1234 360C1300 360 1340 360 1412 360', 1340, 360, 1412, 360), text(1582, 546, '웹 화면에 바로 표시', 28, 800, MUTED)]
save('a5-csv-same-table.svg', body, 'A5 the same table as a local CSV file: one copy from Notion, then tasks skill and web page use the file')
