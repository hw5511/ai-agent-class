"""One API command, five callers. Badge 1 covers the three button surfaces.

Purpose: classroom students recognise the same wired command behind buttons,
MCP tools and a direct terminal call. Physical objects follow s6_button_wiring
and a4_key_names; no service-specific interface or endpoint is invented.
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
                f'<circle cx="{x + w - 42}" cy="{yy + (step - 14) / 2}" r="7" fill="{GREEN}"/>',
                f'<rect x="{x + 40}" y="{yy + (step - 14) / 2 - 3}" width="{w * .36}" height="6" rx="3" fill="#43474e"/>']
    return "".join(out)


def button(x, y, w):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="58" rx="12" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>'
            + text(x + w / 2, y + 39, "주문하기", 28, 800, ACCENT)
            + icon_cursor(x + w - 28, y + 37, 29))


def plug(x, y):
    return (f'<rect x="{x}" y="{y}" width="118" height="66" rx="15" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>'
            f'<rect x="{x + 116}" y="{y + 10}" width="25" height="12" rx="4" fill="{INK2}"/>'
            f'<rect x="{x + 116}" y="{y + 44}" width="25" height="12" rx="4" fill="{INK2}"/>'
            + text(x + 57, y + 44, "MCP", 30, 900, ACCENT))


b = [panel()]

# The three UI callers share one visual row and one badge. Their cables join
# below the objects, leaving labels and controls unobstructed.
b += [path("M300 348C340 485 860 460 1050 475", arrow=False),
      path("M478 410C620 465 860 475 1050 475", arrow=False),
      path("M894 343C970 343 980 475 1050 475", arrow=False),
      path("M493 633C545 633 520 480 571 480C740 480 870 475 1050 475", arrow=False),
      path("M994 638C1050 638 1020 475 1050 475", arrow=False),
      path("M1050 475L1120 475", arrow=False), arrow_head(1120, 475, 0)]

web_body = text(140, 45, "아메리카노", 26, 700) + button(24, 72, 232)
b += [window(70, 190, 280, 200, kind="browser", body=web_body),
      text(210, 161, "웹사이트", 31, 900),
      text(295, 225, "주문", 24, 700, MUTED)]

phone_body = text(72, 70, "아메리카노", 24, 700) + button(9, 116, 126)
b += [phone(400, 125, 160, phone_body), text(480, 108, "휴대폰 앱", 31, 900)]

app_body = text(160, 45, "아메리카노", 26, 700) + button(30, 72, 260)
b += [window(610, 190, 320, 200, body=app_body),
      text(814, 225, "주문 앱", 24, 700, MUTED),
      f'<path d="M750 391v34h-50v14h140v-14h-50v-34" fill="{DESK_TOP}"/>',
      text(770, 161, "데스크톱 프로그램", 31, 900), badge(71, 109, 1)]

# MCP and direct invocation are independent workstations, both using Claude.
b += [mascot(135, 555, .82), desk(85, 680, 440, body_h=78),
      plug(352, 600),
      f'<path d="M330 648Q341 630 352 633" fill="none" stroke="{ACCENT}" stroke-width="9" stroke-linecap="round"/>',
      badge(126, 509, 2)]

terminal = (f'<rect x="0" y="0" width="220" height="125" rx="5" fill="#1e1f22"/>'
            + text(19, 51, "$ curl", 30, 700, "#fff", anchor="start", family=MONO)
            + text(19, 91, "-X POST", 25, 600, "#c9ccd1", anchor="start", family=MONO))
b += [mascot(604, 580, .7), desk(575, 700, 460, body_h=58),
      laptop(766, 560, 240, terminal),
      text(728, 542, "직접 호출", 31, 900), badge(587, 535, 3)]

# A single paper command slips into the same rack used in the preceding scene.
b += [rack(1465, 185, 250, 515), text(1590, 752, "서버", 34, 900)]
b += [f'<rect x="1120" y="411" width="279" height="128" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      text(1259, 461, "POST /orders", 30, 800, ACCENT_DARK, family=MONO),
      text(1259, 506, "아메리카노", 26, 700, MUTED),
      path("M1399 475L1461 475", arrow=False), arrow_head(1461, 475, 0),
      badge(1259, 367, 4)]

# The server's green answer travels back toward the callers.
b += [path("M1465 621C1415 621 1415 689 1371 689", GREEN, arrow=False),
      arrow_head(1371, 689, 180, color=GREEN),
      f'<rect x="1139" y="634" width="218" height="110" rx="12" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      check(1181, 688, 25), text(1268, 701, "200 OK", 29, 800, GREEN)]

print(save("a4-api-callers.svg", b, "A4: many callers, one POST /orders; badges 1..4"))
