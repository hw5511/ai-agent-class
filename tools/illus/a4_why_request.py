"""A request as a physical form; a JSON result paper travels back.

Verified with curl against the NAVER developer search.md and the API HUB
reference https://api.ncloud-docs.com/docs/naver-api-hub-search-trend.md.
API HUB uses POST /search-trend/v1/search (not the developer-centre path).
Dates and chart values are illustrative, not the result of a live API call.
Purpose: classroom students can locate address, key headers, body and response.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def rack(x, y, w, h):
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{INK2}" filter="url(#sh)"/>']
    step = (h - 56) / 8
    for i in range(8):
        yy = y + 28 + i * step
        out += [f'<rect x="{x + 24}" y="{yy}" width="{w - 48}" height="{step - 14}" rx="6" fill="#2f333a"/>',
                f'<circle cx="{x + w - 39}" cy="{yy + (step - 14) / 2}" r="6" fill="{GREEN}"/>',
                f'<rect x="{x + 37}" y="{yy + (step - 14) / 2 - 3}" width="{w * .30}" height="6" rx="3" fill="#43474e"/>']
    return "".join(out)


b = [panel()]
# The form is the travelling request itself, not a caption beside a diagram.
b += [path("M348 520C372 383 369 201 432 201", arrow=False),
      arrow_head(432, 201, 0),
      path("M1145 201C1325 201 1370 201 1523 201", arrow=False),
      arrow_head(1523, 201, 0), text(1326, 159, "요청", 34, 900, ACCENT)]

b += [mascot(73, 487, .95), desk(49, 624, 328, "Claude", body_h=133),
      laptop(243, 537, 138, text(58, 49, ">_", 32, 800, INK, family=MONO))]

# A folded paper form: address at top, headers in its middle, full required body
# below. Header values use the Korean-capable font so bullet glyphs render.
b += [f'<path d="M451 109H1084L1144 169V739a14 14 0 0 1-14 14H451a14 14 0 0 1-14-14V123a14 14 0 0 1 14-14z" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      f'<path d="M1084 109v46a14 14 0 0 0 14 14h46" fill="#eef1f4" stroke="{LINE2}" stroke-width="2.5"/>',
      text(492, 164, "주소", 27, 800, MUTED, anchor="start"),
      text(491, 209, "POST /search-trend/v1/search", 28, 800, ACCENT_DARK, anchor="start", family=MONO),
      badge(438, 150, 1),
      f'<line x1="480" y1="232" x2="1101" y2="232" stroke="{PAPER_LINE}" stroke-width="2"/>',
      text(491, 270, "X-NCP-APIGW-API-KEY-ID:", 25, 700, INK, anchor="start", family=MONO),
      text(1048, 270, "••••", 26, 800, ACCENT),
      text(491, 312, "X-NCP-APIGW-API-KEY:", 25, 700, INK, anchor="start", family=MONO),
      text(1048, 312, "••••", 26, 800, ACCENT), badge(438, 281, 2),
      f'<line x1="480" y1="336" x2="1101" y2="336" stroke="{PAPER_LINE}" stroke-width="2"/>',
      text(491, 373, "JSON", 26, 800, MUTED, anchor="start"), badge(438, 379, 3)]

body_rows = [
    (0, '{'),
    (1, '"startDate": "2026-01-01",'),
    (1, '"endDate": "2026-04-30",'),
    (1, '"timeUnit": "month",'),
    (1, '"keywordGroups": [{'),
    (2, '"groupName": "클로드",'),
    (2, '"keywords": ["클로드"]'),
    (1, '}]'),
    (0, '}'),
]
for i, (indent, line) in enumerate(body_rows):
    # Pretendard handles mixed Korean/JSON; monospace is reserved for ASCII.
    b += [text(491 + indent * 25, 412 + i * 36, line, 26, 600, INK,
               anchor="start", family=None if "클로드" in line else MONO)]

b += [rack(1532, 134, 206, 440), text(1635, 619, "네이버 데이터랩", 28, 900)]

# The reply travels from the rack through the returned result sheet, then to
# the original desk. Its chart is a view of JSON data, not an extra request.
b += [path("M1532 447C1512 447 1526 559 1500 559", GREEN, arrow=False),
      arrow_head(1500, 559, 180, color=GREEN),
      path("M1190 703C1040 812 624 812 389 720", GREEN, arrow=False),
      arrow_head_at(624, 812, 389, 720, color=GREEN)]

b += [f'<path d="M1205 394h232l54 54v291a13 13 0 0 1-13 13h-273a13 13 0 0 1-13-13V407a13 13 0 0 1 13-13z" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      f'<path d="M1437 394v41a13 13 0 0 0 13 13h41" fill="#eef1f4" stroke="{LINE2}" stroke-width="2.5"/>',
      text(1220, 438, "JSON", 28, 800, GREEN, anchor="start"),
      text(1410, 437, "예시", 24, 600, MUTED), badge(1192, 394, 4),
      text(1220, 478, "results[].data", 24, 700, INK, anchor="start", family=MONO),
      text(1220, 515, '{"period":', 24, 600, INK, anchor="start", family=MONO),
      text(1240, 550, '"2026-01-01",', 24, 600, INK, anchor="start", family=MONO),
      text(1220, 585, '"ratio": 70.15}', 24, 600, INK, anchor="start", family=MONO)]

# Small line chart on the actual returned paper, with genuine response keys.
b += [f'<path d="M1264 624v74h191" fill="none" stroke="{LINE2}" stroke-width="2.5"/>',
      f'<path d="M1277 664L1332 653L1387 619L1442 639" fill="none" stroke="{GREEN}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
      text(1230, 641, "ratio", 24, 700, GREEN), text(1370, 734, "period", 24, 700, GREEN)]
for x, y in [(1277, 664), (1332, 653), (1387, 619), (1442, 639)]:
    b += [f'<circle cx="{x}" cy="{y}" r="5" fill="{GREEN}"/>']

print(save("a4-why-request.svg", b, "A4: verified NAVER API HUB request and illustrative JSON response; badges 1..4"))
