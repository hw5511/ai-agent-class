"""AU2 HTTP 2/5 요청과 응답의 구성: two letter-like cards side by side. Request = method + address line, headers, JSON body.
Response = status line, headers, JSON body. Badges 1 메서드와 주소, 2 헤더, 3 본문, 4 상태 코드."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
CARD_W, CARD_H, CY0 = 740, 560, 200
XL, XR = 60, 992


def letter(x, y, w, h):
    return [f'<path d="M{x + 14} {y}H{x + w - 64}L{x + w} {y + 64}V{y + h - 14}a14 14 0 0 1-14 14H{x + 14}a14 14 0 0 1-14-14V{y + 14}a14 14 0 0 1 14-14z" '
            f'fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
            f'<path d="M{x + w - 64} {y}v50a14 14 0 0 0 14 14h50" fill="#eef1f4" stroke="{LINE2}" stroke-width="2.5"/>']


def section(x, y, w, label, badge_n, lines, hair=True):
    """label (muted, Korean), then mono lines; returns the fragments and the next y."""
    out = [text(x + 40, y + 28, label, 24, 800, MUTED, anchor="start")]
    if badge_n:
        out.append(badge(x + 4, y + 18, badge_n))
    yy = y + 70
    for s, kw in lines:
        fam = None if any("가" <= c <= "힣" for c in s) else MONO
        col = INK
        if kw:
            col = kw
        ind = (len(s) - len(s.lstrip(" "))) * 11
        out.append(text(x + 40 + ind, yy, s.lstrip(" "), 29, 700, col, anchor="start", family=fam))
        yy += 40
    return out, yy


# headings
for x, t, sub, col in [(XL, "요청", "Request", ACCENT), (XR, "응답", "Response", GREEN)]:
    b += [text(x + 12, 112, t, 52, 900, INK, anchor="start"), text(x + 12 + len(t) * 52 + 18, 112, sub, 26, 800, col, anchor="start", family=MONO)]
b += [text(XL + 12, 156, "브라우저가 서버에 보내는 편지", 26, 700, MUTED, anchor="start"),
      text(XR + 12, 156, "서버가 브라우저에 돌려주는 편지", 26, 700, MUTED, anchor="start")]

# ---- request card ----
b += letter(XL, CY0, CARD_W, CARD_H)
x = XL
y = CY0 + 24
f, y = section(x, y, CARD_W, "메서드와 주소", 1, [("POST /api/requests HTTP/1.1", ACCENT_DARK)])
b += f
b += [f'<line x1="{x + 30}" y1="{y - 10}" x2="{x + CARD_W - 30}" y2="{y - 10}" stroke="{PAPER_LINE}" stroke-width="2"/>']
f, y = section(x, y + 4, CARD_W, "헤더", 2, [("Host: supply-api.student01.workers.dev", None), ("Content-Type: application/json", None)])
b += f
b += [f'<line x1="{x + 30}" y1="{y - 10}" x2="{x + CARD_W - 30}" y2="{y - 10}" stroke="{PAPER_LINE}" stroke-width="2"/>']
f, y = section(x, y + 4, CARD_W, "본문", 3, [("{", None), ('  "name": "김누리",', None), ('  "item": "A4 용지",', None), ('  "qty": 2', None), ("}", None)])
b += f

# ---- response card ----
b += letter(XR, CY0, CARD_W, CARD_H)
x = XR
y = CY0 + 24
f, y = section(x, y, CARD_W, "상태 코드", 4, [("HTTP/1.1 201 Created", GREEN)])
b += f
b += [f'<line x1="{x + 30}" y1="{y - 10}" x2="{x + CARD_W - 30}" y2="{y - 10}" stroke="{PAPER_LINE}" stroke-width="2"/>']
f, y = section(x, y + 4, CARD_W, "헤더", 2, [("Content-Type: application/json", None)])
b += f
b += [f'<line x1="{x + 30}" y1="{y - 10}" x2="{x + CARD_W - 30}" y2="{y - 10}" stroke="{PAPER_LINE}" stroke-width="2"/>']
f, y = section(x, y + 4, CARD_W, "본문", 3, [("{", None), ('  "id": 12,', None), ('  "name": "김누리",', None), ('  "item": "A4 용지",', None), ('  "qty": 2', None), ("}", None)])
b += f

# travel arrows in the gap between the cards
gx0, gx1 = XL + CARD_W + 26, XR - 26
b += [path(f"M{gx0 + 6} 400L{gx1 - 20} 400", ACCENT, arrow=False), arrow_head(gx1 - 6, 400, 0, 22, ACCENT), text((gx0 + gx1) / 2, 360, "요청", 30, 900, ACCENT)]
b += [path(f"M{gx1 - 6} 560L{gx0 + 20} 560", GREEN, arrow=False), arrow_head(gx0 + 6, 560, 180, 22, GREEN), text((gx0 + gx1) / 2, 620, "응답", 30, 900, GREEN)]

print(save("au2-http-anatomy.svg", b, "AU2 HTTP anatomy of request and response (tools/illus/au2_http_anatomy.py)"))
