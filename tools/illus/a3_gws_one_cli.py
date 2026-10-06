"""A3-gws/1 GWS CLI 란: Claude at a desk types one `gws` command in a terminal; a single path leads into the
Google cloud zone that holds a real object per service (Drive folder, Gmail envelope, Calendar page, Forms
sheet, Sheets, Docs, Slides). Badges: 1 one command, 2 every service behind it, 3 Claude runs it."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- (a) the cloud zone on the right: every Google service as a physical object ----
ZX, ZY, ZW, ZH = 800, 150, 940, 640
b += [f'<rect x="{ZX}" y="{ZY}" width="{ZW}" height="{ZH}" rx="44" fill="{ACCENT_ZONE}"/>',
      text(ZX + 56, ZY + 66, "Google Workspace", 40, 900, ACCENT_DARK, anchor="start")]
b += [badge(ZX + ZW - 6, ZY + 6, 2)]

COLS = [ZX + 128, ZX + 128 + 228, ZX + 128 + 456, ZX + 128 + 684]  # object centres
ROW1, ROW2 = ZY + 120, ZY + 360


def env(cx, y):
    x = cx - 80
    return (f'<g filter="url(#shs)"><rect x="{x}" y="{y + 20}" width="160" height="108" rx="12" fill="#fff" stroke="#ea4335" stroke-width="4"/></g>'
            f'<path d="M{x + 6} {y + 28}L{cx} {y + 86}L{x + 154} {y + 28}" fill="none" stroke="#ea4335" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>'
            f'<path d="M{x + 6} {y + 120}L{x + 62} {y + 70}M{x + 154} {y + 120}L{x + 98} {y + 70}" stroke="#f3b4ae" stroke-width="5" stroke-linecap="round"/>')


def cal(cx, y):
    x = cx - 66
    return (f'<g filter="url(#shs)"><rect x="{x}" y="{y}" width="132" height="146" rx="14" fill="#fff" stroke="#4285f4" stroke-width="4"/></g>'
            f'<path d="M{x + 2} {y + 44}V{y + 16}a14 14 0 0 1 14-14h100a14 14 0 0 1 14 14V{y + 44}z" fill="#4285f4"/>'
            f'<rect x="{x + 28}" y="{y - 12}" width="12" height="28" rx="6" fill="{INK2}"/><rect x="{x + 92}" y="{y - 12}" width="12" height="28" rx="6" fill="{INK2}"/>'
            + text(cx, y + 114, "31", 54, 900, "#4285f4"))


def sheet(cx, y, color, kind):
    x = cx - 60
    inner = ""
    if kind == "forms":
        for i in range(3):
            yy = y + 46 + i * 34
            inner += (f'<rect x="{x + 18}" y="{yy}" width="20" height="20" rx="5" fill="none" stroke="{color}" stroke-width="4"/>'
                      f'<rect x="{x + 48}" y="{yy + 5}" width="{54 - i * 10}" height="9" rx="4.5" fill="{PAPER_LINE}"/>')
    elif kind == "sheets":
        for r in range(4):
            for c in range(3):
                inner += f'<rect x="{x + 16 + c * 30}" y="{y + 40 + r * 26}" width="26" height="22" rx="3" fill="{"#cdeedb" if r == 0 else "#fff"}" stroke="{color}" stroke-width="2.5"/>'
    elif kind == "docs":
        for i in range(4):
            inner += f'<rect x="{x + 18}" y="{y + 48 + i * 24}" width="{84 - (i % 2) * 24}" height="9" rx="4.5" fill="{ACCENT_MID if i else color}"/>'
    elif kind == "slides":
        inner = (f'<rect x="{x + 14}" y="{y + 36}" width="92" height="62" rx="8" fill="#fff" stroke="{color}" stroke-width="4"/>'
                 f'<rect x="{x + 28}" y="{y + 52}" width="40" height="9" rx="4.5" fill="{color}"/><rect x="{x + 28}" y="{y + 70}" width="62" height="9" rx="4.5" fill="{PAPER_LINE}"/>')
    return (f'<g filter="url(#shs)"><path d="M{x + 8} {y}h74l38 38v92a8 8 0 0 1-8 8H{x + 8}a8 8 0 0 1-8-8V{y + 8}a8 8 0 0 1 8-8z" fill="#fff" stroke="{color}" stroke-width="4"/></g>'
            f'<path d="M{x + 82} {y}v30a8 8 0 0 0 8 8h30z" fill="{color}" opacity="0.85"/>' + inner)


if True:
    # row 1
    b += [folder(COLS[0] - 80, ROW1 + 4, 160), text(COLS[0], ROW1 + 190, "Drive", 30, 800, INK)]
    b += [env(COLS[1], ROW1), text(COLS[1], ROW1 + 190, "Gmail", 30, 800, INK)]
    b += [cal(COLS[2], ROW1 + 4), text(COLS[2], ROW1 + 190, "Calendar", 30, 800, INK)]
    b += [sheet(COLS[3], ROW1 + 4, "#7248b9", "forms"), text(COLS[3], ROW1 + 190, "Forms", 30, 800, INK)]
    # row 2
    b += [sheet(COLS[0] + 114, ROW2, "#0f9d58", "sheets"), text(COLS[0] + 114, ROW2 + 190, "Sheets", 30, 800, INK)]
    b += [sheet(COLS[1] + 114, ROW2, "#4285f4", "docs"), text(COLS[1] + 114, ROW2 + 190, "Docs", 30, 800, INK)]
    b += [sheet(COLS[2] + 114, ROW2, "#f4b400", "slides"), text(COLS[2] + 114, ROW2 + 190, "Slides", 30, 800, INK)]

# ---- (b) Claude at the desk with a terminal ----
DX, DY, DW = 50, 600, 640
b += [desk(DX, DY, DW, "Claude", body_h=150)]
b += [mascot(DX + 36, DY - 143, 1.0)]
body = (text(24, 52, "$ gws drive files list", 19, 700, "#e8eaed", anchor="start", family=MONO)
        + f'<rect x="24" y="84" width="200" height="12" rx="6" fill="#4b4f56"/><rect x="24" y="112" width="250" height="12" rx="6" fill="#4b4f56"/>'
        + f'<rect x="24" y="140" width="160" height="12" rx="6" fill="#4b4f56"/>')
b += [window(DX + 300, DY - 270, 330, 270, "terminal", "터미널", body)]
b += [badge(DX + 300 + 330 - 6, DY - 270 - 6, 1)]
b += [bubble(DX + 20, DY - 290, 200, 76, "내가 실행", 36, tail_x=DX + 110)]
b += [badge(DX + 4, DY - 296, 3)]

# ---- (c) the one path: the gws command goes into the cloud zone ----
PX, PY = DX + 630 + 6, DY - 150
b += [path(f"M{PX} {PY}C{PX + 30} {PY - 10} {ZX - 80} {PY - 10} {ZX + 30} {PY - 4}", width=5)]
GW, GH = 128, 62
b += [f'<rect x="{(PX + ZX) / 2 - GW / 2}" y="{PY - 80}" width="{GW}" height="{GH}" rx="16" fill="{ACCENT}" filter="url(#shs)"/>',
      text((PX + ZX) / 2, PY - 80 + 43, "gws", 38, 900, "#fff", family=MONO)]

print(save("a3-gws-one-cli.svg", b, "A3-gws/1 GWS CLI 란 (tools/illus/a3_gws_one_cli.py)"))
