"""Existing MCP and CLI connections, then a key entering an API-only service.

Purpose: students who know MCP understand why direct API access is useful.
The key, desk and plug reuse the course's physical object vocabulary.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def api_key(bx, by, s=.58):
    # Same bow, collar, blade and teeth as a4_key_names; local to avoid importing
    # that generator (which would also overwrite its finished SVG).
    return (f'<g transform="translate({bx} {by}) scale({s})" filter="url(#shs)">'
            f'<path d="M-70 0a70 70 0 1 0 140 0a70 70 0 1 0 -140 0zM-27 0a27 27 0 1 1 54 0a27 27 0 1 1 -54 0z" fill="{ACCENT}" fill-rule="evenodd"/>'
            f'<rect x="58" y="-27" width="38" height="54" rx="10" fill="{ACCENT}"/>'
            f'<rect x="90" y="-16" width="380" height="32" rx="10" fill="{ACCENT}"/>'
            f'<path d="M340 10H470v26h-14v22h-26v-14h-22v30h-28v-20h-20v12h-20z" fill="{ACCENT}" stroke="{ACCENT}" stroke-width="6" stroke-linejoin="round"/>'
            '<rect x="104" y="-6" width="220" height="5" rx="2.5" fill="#fff" opacity=".35"/></g>')


def plug(x, y):
    return (f'<rect x="{x}" y="{y}" width="120" height="67" rx="15" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>'
            f'<rect x="{x + 29}" y="{y - 25}" width="12" height="27" rx="4" fill="{INK2}"/>'
            f'<rect x="{x + 79}" y="{y - 25}" width="12" height="27" rx="4" fill="{INK2}"/>'
            + text(x + 60, y + 45, "MCP", 30, 900, ACCENT))


b = [panel()]
# Three routes leave one actor; each route meets an actual tool or keyhole.
b += [path("M410 492C475 260 540 210 712 350", arrow=False),
      arrow_head(712, 350, 50),
      path("M456 527C650 515 780 408 914 408", arrow=False),
      arrow_head(914, 408, 0),
      path("M478 566C745 665 1090 665 1308 590C1457 541 1450 497 1450 459", arrow=False),
      arrow_head(1450, 459, -90)]

# Left actor and desk match the server-clerk reference.
b += [mascot(113, 468, 1.04), desk(65, 617, 440, "Claude", body_h=145)]

# Notion, attached through a tangible MCP plug.
b += [brand_icon("notion", 684, 193, 125), text(746, 165, "Notion", 34, 900),
      plug(686, 350), badge(643, 132, 1)]

# The three real Google marks share a terminal rather than three mock logos.
b += [text(1079, 165, "Google Workspace", 32, 900)]
for name, x in [("gmail", 943), ("googledrive", 1042), ("googlecalendar", 1141)]:
    b += [brand_icon(name, x, 206, 78)]
terminal = (text(160, 37, "CLI", 29, 800, "#fff")
            + text(25, 91, "$ gws …", 29, 700, "#fff", anchor="start", family=MONO))
b += [window(919, 326, 320, 165, kind="terminal", body=terminal), badge(898, 132, 2)]

# Two labelled services sit above their sole access window. No fabricated logo,
# MCP plug or CLI appears on this group.
service_body = (text(187, 50, "공공데이터포털", 30, 800)
                + f'<line x1="28" y1="75" x2="346" y2="75" stroke="{PAPER_LINE}" stroke-width="2"/>'
                + text(187, 124, "네이버 데이터랩", 30, 800))
b += [window(1340, 181, 375, 218, body=service_body),
      badge(1340, 132, 3),
      f'<path d="M1450 400v25M1604 400v25" stroke="{LINE2}" stroke-width="3"/>',
      f'<rect x="1340" y="425" width="375" height="124" rx="14" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/>',
      text(1638, 498, "API", 38, 900, ACCENT),
      f'<rect x="1415" y="443" width="70" height="88" rx="12" fill="#e3e6ea" stroke="{LINE2}" stroke-width="2.5"/>',
      f'<circle cx="1450" cy="468" r="12" fill="{INK2}"/>',
      f'<path d="M1443 475h14l6 45h-26z" fill="{INK2}"/>',
      path("M1450 549L1450 524", arrow=False), arrow_head(1450, 524, -90)]

# A large matching blue key rides the direct request route. Its tag identifies
# the object; badge 4 attaches to the key rather than a separate legend.
b += [api_key(918, 627),
      f'<path d="M918 648v51" stroke="{LINE2}" stroke-width="3"/>',
      f'<rect x="846" y="700" width="144" height="52" rx="9" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>',
      text(918, 736, "API 키", 28, 800), badge(828, 622, 4)]

# Data papers come back on a separate lower green route.
b += [path("M1635 550C1730 811 920 800 524 724", GREEN, arrow=False),
      arrow_head_at(920, 800, 524, 724, color=GREEN),
      doc(1241, 707, 65, rot=6, accent=GREEN)]

print(save("a4-why-no-mcp.svg", b, "A4: MCP, CLI, API-only services, direct API key; badges 1..4"))
