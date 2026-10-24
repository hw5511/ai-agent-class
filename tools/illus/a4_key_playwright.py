"""A4: the student logs in; Claude issues an API key and saves it to .env.

Audience: adult students viewing a full-width classroom slide. Reading order is
the login form, Claude's Playwright browser, then the key landing in the file.
The key geometry is the same as a4_key_names.py; helpers stay local so importing
another generator never rewrites its illustration.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def api_key(bx, by, s=1.0):
    """Same bow, collar, shaft and three teeth as the series' key-names key."""
    return (
        f'<g transform="translate({bx} {by}) scale({s})" filter="url(#shs)">'
        f'<path d="M-70 0a70 70 0 1 0 140 0a70 70 0 1 0 -140 0zM-27 0a27 27 0 1 1 54 0a27 27 0 1 1 -54 0z" fill="{ACCENT}" fill-rule="evenodd"/>'
        f'<rect x="58" y="-27" width="38" height="54" rx="10" fill="{ACCENT}"/>'
        f'<rect x="90" y="-16" width="380" height="32" rx="10" fill="{ACCENT}"/>'
        f'<path d="M340 10H470v26h-14v22h-26v-14h-22v30h-28v-20h-20v12h-20z" fill="{ACCENT}" stroke="{ACCENT}" stroke-width="6" stroke-linejoin="round"/>'
        '<rect x="104" y="-6" width="220" height="5" rx="2.5" fill="#fff" opacity="0.35"/></g>'
    )


def browser(x, y, w, h, label, body):
    # window()'s default address text is 18px; use a classroom-sized label.
    return window(x, y, w, h, "browser", body=body) + text(
        x + 116, y + 35, label, 26, 700, MUTED, anchor="start"
    )


def main():
    b = ['<rect width="1792" height="840" fill="#fff"/>']

    # One physical desk holds Claude's laptop and the saved file.
    b += [desk(585, 660, 1135, body_h=110),
          mascot(675, 490, 1.12)]

    login = (
        text(30, 52, "아이디", 28, 700, anchor="start")
        + f'<rect x="30" y="68" width="320" height="55" rx="7" fill="#fff" stroke="{LINE2}" stroke-width="2"/>'
        + text(48, 105, "student", 26, 500, MUTED, anchor="start", family=MONO)
        + text(30, 168, "비밀번호", 28, 700, anchor="start")
        + f'<rect x="30" y="184" width="320" height="55" rx="7" fill="#fff" stroke="{LINE2}" stroke-width="2"/>'
        + text(48, 223, "••••••••", 30, 600, MUTED, anchor="start")
        + f'<rect x="30" y="265" width="320" height="66" rx="9" fill="#fff" stroke="{INK2}" stroke-width="3"/>'
        + text(190, 308, "로그인", 30, 800)
    )
    b += [browser(80, 270, 380, 400, "내 로그인", login),
          icon_cursor(348, 581, 55), badge(85, 262, 1)]

    # The authenticated browser is controlled by Claude's laptop.
    page = (
        text(34, 49, "NAVER Cloud", 26, 700, MUTED, anchor="start")
        + text(34, 108, "API 키", 38, 900, anchor="start")
        + f'<rect x="34" y="140" width="350" height="70" rx="9" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>'
        + text(209, 185, "API 키 발급", 32, 800, ACCENT)
    )
    b += [browser(640, 150, 585, 315, "Playwright MCP", page),
          icon_cursor(967, 360, 56), badge(1219, 142, 2)]

    # Blue is Claude's outgoing browser action. Keep its route outside the lid.
    b += [path("M1124 536C1200 544 1262 521 1182 475", ACCENT, arrow=False),
          arrow_head_at(1262, 521, 1182, 475, 22, ACCENT)]
    screen = (
        text(100, 44, ">_", 32, 800, ACCENT, family=MONO)
        + text(100, 91, "Claude", 28, 800)
    )
    b += [laptop(921, 514, 220, screen)]

    # Issued key travels back to the local desk and into the .env file.
    b += [path("M1234 330C1422 287 1570 343 1540 508", GREEN, arrow=False),
          arrow_head_at(1570, 343, 1540, 508, 22, GREEN),
          api_key(1310, 324, 0.48)]

    # A landscape file card resting directly on the desktop, with a folded corner.
    b += [f'<path d="M1344 520H1632L1686 574V650a10 10 0 0 1-10 10h-332a10 10 0 0 1-10-10V530a10 10 0 0 1 10-10z" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
          f'<path d="M1632 520V564a10 10 0 0 0 10 10h44" fill="#fff" stroke="{LINE2}" stroke-width="3"/>',
          text(1361, 567, ".claude/skills/", 27, 700, MUTED, anchor="start", family=MONO),
          text(1361, 624, ".env", 42, 900, anchor="start", family=MONO),
          check(1637, 619, 23), badge(1685, 512, 3)]

    print(save("a4-key-playwright.svg", b,
               "A4: student login, Playwright MCP key issuance, local .env save"))


if __name__ == "__main__":
    main()
