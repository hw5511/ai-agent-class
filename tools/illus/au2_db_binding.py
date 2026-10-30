"""AU2 DB 1/4 Worker 와 D1 바인딩: the Worker desk (mascot) in a tinted cloud holds a code paper `env.DB`; wrangler.jsonc maps
the name DB to the D1 database supply-db; a cable links them, SQL goes in and rows come out. Badges 1 바인딩 설정,
2 코드의 env.DB, 3 SQL 과 결과 행."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- left: the Worker in a tinted cloud ----
CX, CY, CS = 400, 484, 1.25
b += [cloud(CX, CY, CS)]
b += [text(CX, 296, "서버", 36, 900, ACCENT_DARK), text(CX, 336, "Worker supply-api", 24, 800, MUTED)]
DX, DY, DW = 110, 596, 580
mh = 143 * 1.05
b += [mascot(DX + 30, DY - mh, 1.05)]
# the code paper with env.DB
PX, PY, PW, PH = 424, 372, 280, 196
b += [f'<path d="M{PX + 12} {PY}H{PX + PW - 40}L{PX + PW} {PY + 40}V{PY + PH - 12}a12 12 0 0 1-12 12H{PX + 12}a12 12 0 0 1-12-12V{PY + 12}a12 12 0 0 1 12-12z" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      f'<path d="M{PX + PW - 40} {PY}v28a12 12 0 0 0 12 12h28" fill="#eef1f4" stroke="{LINE2}" stroke-width="2.5"/>',
      text(PX + 22, PY + 58, "env.DB", 40, 800, ACCENT_DARK, anchor="start", family=MONO),
      text(PX + 22, PY + 104, ".prepare(SQL)", 26, 700, INK, anchor="start", family=MONO),
      text(PX + 22, PY + 142, ".bind(...)", 26, 700, INK, anchor="start", family=MONO),
      text(PX + 22, PY + 180, ".run()  .all()", 26, 700, INK, anchor="start", family=MONO)]
b += [desk(DX, DY, DW, None, body_h=84)]
b += [f'<rect x="{DX + DW / 2 - 110}" y="{DY + 60}" width="220" height="48" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2"/>',
      text(DX + DW / 2, DY + 94, "Worker 코드", 27, 800, INK)]
b += [badge(PX + PW + 6, PY - 4, 2)]

# ---- top middle: wrangler.jsonc ----
WX, WY, WW, WH = 790, 84, 560, 248
b += [f'<path d="M{WX + 14} {WY}H{WX + WW - 56}L{WX + WW} {WY + 56}V{WY + WH - 14}a14 14 0 0 1-14 14H{WX + 14}a14 14 0 0 1-14-14V{WY + 14}a14 14 0 0 1 14-14z" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      f'<path d="M{WX + WW - 56} {WY}v42a14 14 0 0 0 14 14h42" fill="#eef1f4" stroke="{LINE2}" stroke-width="2.5"/>',
      text(WX + 30, WY + 50, "wrangler.jsonc", 28, 800, ACCENT, anchor="start", family=MONO)]
code = [(0, '"d1_databases": [{', INK2), (1, '"binding": "DB",', ACCENT_DARK), (1, '"database_name": "supply-db",', ACCENT_DARK),
        (1, '"database_id": "..."', MUTED), (0, "}]", INK2)]
for i, (ind, s, col) in enumerate(code):
    b += [text(WX + 30 + ind * 26, WY + 100 + i * 34, s, 24, 700, col, anchor="start", family=MONO)]
b += [badge(WX + 2, WY + 6, 1)]

# ---- right: the D1 database ----
DBX, DBW = 1426, 300
TOP, BODY_H = 290, 232
cx = DBX + DBW / 2
b += [f'<rect x="{DBX}" y="{TOP}" width="{DBW}" height="{BODY_H}" fill="{ACCENT}"/>',
      f'<ellipse cx="{cx}" cy="{TOP + BODY_H}" rx="{DBW / 2}" ry="46" fill="{ACCENT}"/>',
      f'<ellipse cx="{cx}" cy="{TOP}" rx="{DBW / 2}" ry="46" fill="{ACCENT_MID}"/>',
      f'<path d="M{DBX} {TOP + 76}Q{cx} {TOP + 76 + 92} {DBX + DBW} {TOP + 76}" fill="none" stroke="#fff" stroke-width="3" opacity="0.55"/>',
      f'<path d="M{DBX} {TOP + 152}Q{cx} {TOP + 152 + 92} {DBX + DBW} {TOP + 152}" fill="none" stroke="#fff" stroke-width="3" opacity="0.55"/>',
      text(cx, TOP - 78, "D1 데이터베이스", 30, 900, INK),
      f'<rect x="{cx - 112}" y="{TOP + 98}" width="224" height="54" rx="12" fill="#fff"/>',
      text(cx, TOP + 136, "supply-db", 32, 800, INK, family=MONO)]
# a few table rows
TX, TY, TW = 1396, 600, 360
b += [f'<rect x="{TX}" y="{TY}" width="{TW}" height="180" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      text(TX + 20, TY + 36, "requests", 22, 800, ACCENT_DARK, anchor="start", family=MONO),
      f'<line x1="{TX + 14}" y1="{TY + 50}" x2="{TX + TW - 14}" y2="{TY + 50}" stroke="{PAPER_LINE}" stroke-width="2"/>']
for i, row in enumerate([("12", "김누리", "A4 용지", "2"), ("11", "최유진", "토너", "1"), ("10", "이도윤", "모니터 받침대", "1")]):
    for xo, v in zip((20, 66, 164, 316), row):
        b += [text(TX + xo, TY + 90 + i * 34, v, 22, 700 if i else 800, INK if i == 0 else MUTED, anchor="start")]
b += [badge(TX + TW + 4, TY - 6, 3)]

# ---- the cable and the two lanes ----
LX0, LX1 = 708, 1430
b += [f'<path d="M{LX0} 480H{LX1}" fill="none" stroke="{LINE2}" stroke-width="16" stroke-linecap="round"/>',
      f'<rect x="{LX0 - 6}" y="460" width="26" height="40" rx="6" fill="{INK2}"/>', f'<rect x="{LX1 - 22}" y="460" width="26" height="40" rx="6" fill="{INK2}"/>',
      f'<rect x="{(LX0 + LX1) / 2 - 62}" y="454" width="124" height="52" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>',
      text((LX0 + LX1) / 2, 490, "바인딩 DB", 26, 900, INK)]
b += [path(f"M{LX0 + 60} 418H{LX1 - 170}", ACCENT, arrow=False), arrow_head(LX1 - 150, 418, 0, 22, ACCENT)]
b += [text((LX0 + LX1) / 2, 384, "SQL", 30, 900, ACCENT_DARK)]
b += [path(f"M{LX1 - 120} 546H{LX0 + 110}", GREEN, arrow=False), arrow_head(LX0 + 90, 546, 180, 22, GREEN)]
b += [text((LX0 + LX1) / 2, 608, "결과 행", 30, 900, GREEN)]

print(save("au2-db-binding.svg", b, "AU2 DB Worker and D1 binding (tools/illus/au2_db_binding.py)"))
