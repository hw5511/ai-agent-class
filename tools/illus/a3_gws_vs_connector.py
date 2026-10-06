"""A3-gws/2 웹 커넥터 vs GWS CLI: left = a small fixed toolbox with a few labelled buttons (what connectors
offer: a set of tools someone prepared), right = a whole wall of Google API endpoints Claude can pick any
drawer from (gws). Badges: 1 connector = a few fixed tools, 2 gws = the whole Google API, 3 pull out what you need."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
FLOOR = 690

# ---- zones ----
b += [f'<rect x="40" y="130" width="780" height="660" rx="44" fill="{WARM_ZONE}"/>',
      f'<rect x="850" y="130" width="902" height="660" rx="44" fill="{ACCENT_ZONE}"/>',
      text(90, 206, "웹 커넥터", 46, 900, INK, anchor="start"),
      text(900, 206, "gws CLI", 46, 900, ACCENT_DARK, anchor="start", family=MONO)]

# ---- (a) left: a small toolbox, three fixed buttons ----
BX, BY, BW, BH = 90, 290, 400, FLOOR - 290
b += [f'<rect x="{BX + 130}" y="{BY - 26}" width="140" height="34" rx="16" fill="none" stroke="{LINE2}" stroke-width="8"/>',
      f'<rect x="{BX}" y="{BY}" width="{BW}" height="{BH}" rx="24" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#sh)"/>',
      f'<rect x="{BX}" y="{BY}" width="{BW}" height="64" rx="24" fill="{ACCENT_MID}"/>',
      f'<rect x="{BX}" y="{BY + 36}" width="{BW}" height="28" fill="{ACCENT_MID}"/>',
      text(BX + BW / 2, BY + 44, "준비된 도구 상자", 30, 900, "#fff")]
for i, lab in enumerate(["일정 조회", "일정 만들기", "메일 검색"]):
    y = BY + 96 + i * 104
    b += [f'<rect x="{BX + 28}" y="{y}" width="{BW - 56}" height="88" rx="16" fill="{ACCENT_TINT}" stroke="{ACCENT}" stroke-width="3" filter="url(#shs)"/>',
          text(BX + BW / 2, y + 57, lab, 34, 800, ACCENT_DARK)]
b += [badge(BX + BW - 6, BY - 6, 1)]
b += [icon_cursor(BX + BW - 70, BY + 96 + 104 + 64, 48, INK)]

# ---- (b) right: a wall of endpoint drawers ----
WX, WY = 890, 238
CW, CH, GX, GY = 126, 54, 9, 8
names = ["drive.files", "drive.about", "gmail.send", "gmail.labels", "calendar.get", "calendar.acl",
         "sheets.get", "sheets.add", "docs.get", "docs.update", "slides.get", "slides.pages",
         "forms.create", "forms.get", "drive.copy", "drive.export", "gmail.drafts", "gmail.threads",
         "calendar.list", "cal.watch", "sheets.clear", "docs.create", "drive.trash", "drive.changes",
         "drive.watch", "gmail.history", "forms.watch", "sheets.batch", "docs.batch", "slides.batch"]
COLS_N, ROWS_N = 6, 5
hi = {(4, 1): "공유 권한", (4, 2): "반복 일정", (4, 3): "폼 게시"}
for r in range(ROWS_N):
    for c in range(COLS_N):
        x, y = WX + c * (CW + GX), WY + r * (CH + GY)
        if (r, c) in hi:
            b += [f'<rect x="{x - 4}" y="{y - 4}" width="{CW + 8}" height="{CH + 8}" rx="14" fill="{ACCENT}" stroke="#fff" stroke-width="3" filter="url(#sh)"/>',
                  text(x + CW / 2, y + CH / 2 + 9, hi[(r, c)], 26, 900, "#fff")]
        else:
            b += [f'<rect x="{x}" y="{y}" width="{CW}" height="{CH}" rx="12" fill="#fff" stroke="{LINE}" stroke-width="2"/>',
                  text(x + CW / 2, y + CH / 2 + 6, names[r * COLS_N + c], 16, 600, MUTED, family=MONO)]
b += [badge(1752 - 6, 130 + 6, 2)]
b += [badge(WX + 3 * (CW + GX) + CW + 30, WY + 5 * (CH + GY) + 14, 3)]
b += [icon_cursor(WX + 2 * (CW + GX) + CW - 34, WY + 4 * (CH + GY) + 34, 48, INK)]

# ---- (c) Claude at each side's desk ----
b += [desk(60, FLOOR, 740, None, body_h=66)]
b += [mascot(520, FLOOR - 143, 1.0)]
b += [desk(880, FLOOR, 840, None, body_h=66)]
b += [mascot(1500, FLOOR - 143, 1.0)]
b += [text(430, FLOOR + 72, "Claude", 30, 900), text(1300, FLOOR + 72, "Claude", 30, 900)]

print(save("a3-gws-vs-connector.svg", b, "A3-gws/2 웹 커넥터 vs GWS CLI (tools/illus/a3_gws_vs_connector.py)"))
