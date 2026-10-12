"""8/56 phone side: three ways to connect to the /rc session (QR code, session address, session list)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

PW, PH = 250, 500
PY = 185
SW, SH = PW - 16, PH - 40   # screen area inside the phone


def monitor(x, y, s=1.0, dot=True):
    out = [f'<g transform="translate({x} {y}) scale({s})">',
           f'<rect x="0" y="0" width="44" height="30" rx="4" fill="{INK}"/><rect x="15" y="31" width="14" height="5" fill="{INK}"/>'
           f'<rect x="8" y="36" width="28" height="4" rx="2" fill="{INK}"/>']
    if dot:
        out.append(f'<circle cx="48" cy="2" r="11" fill="#fff"/><circle cx="48" cy="2" r="8.5" fill="{GREEN}"/>')
    out.append("</g>")
    return "".join(out)


def qr(x, y, size, n=11, ink="#fff"):
    cell = size / n
    out = []
    finder = [(0, 0), (n - 3, 0), (0, n - 3)]
    seed = 7
    for r in range(n):
        for c in range(n):
            if any(fx <= c < fx + 3 and fy <= r < fy + 3 for fx, fy in finder):
                continue
            seed = (seed * 1103515245 + 12345) & 0x7fffffff
            if (seed >> 16) % 2:
                out.append(f'<rect x="{x + c * cell:.1f}" y="{y + r * cell:.1f}" width="{cell + 0.4:.1f}" height="{cell + 0.4:.1f}" fill="{ink}"/>')
    for fx, fy in finder:
        X, Y = x + fx * cell, y + fy * cell
        out.append(f'<rect x="{X:.1f}" y="{Y:.1f}" width="{3 * cell:.1f}" height="{3 * cell:.1f}" fill="{ink}"/>'
                   f'<rect x="{X + cell * 0.55:.1f}" y="{Y + cell * 0.55:.1f}" width="{cell * 1.9:.1f}" height="{cell * 1.9:.1f}" fill="#1e1f22"/>'
                   f'<rect x="{X + cell * 1.05:.1f}" y="{Y + cell * 1.05:.1f}" width="{cell * 0.9:.1f}" height="{cell * 0.9:.1f}" fill="{ink}"/>')
    return "".join(out)


def scene_head(cx, title, sub):
    return [text(cx, 140, title, 46, 900, INK), text(cx, 752, sub, 30, 600, MUTED)]


b = [panel()]

# ---- 1. QR code ----
G1 = 315
LW = 220
LX, LY = 30, 330
scr = (f'<rect x="0" y="0" width="{LW - 20}" height="{LW * 0.63 - 20:.0f}" rx="4" fill="#1e1f22"/>'
       + qr(55, 14, 90, 11))
b += scene_head(G1, "QR 코드", "Claude 앱으로 바로")
b += [laptop(LX, LY, LW, scr)]
PX1 = 350
cam = '<rect x="0" y="0" width="%d" height="%d" rx="30" fill="#1e1f22"/>' % (SW, SH)
for sx, sy, dx, dy in [(34, 150, 1, 1), (SW - 34, 150, -1, 1), (34, 330, 1, -1), (SW - 34, 330, -1, -1)]:
    cam += (f'<path d="M{sx} {sy + 44 * dy}V{sy}H{sx + 44 * dx}" fill="none" stroke="{ACCENT_MID}" stroke-width="7" '
            f'stroke-linecap="round" stroke-linejoin="round"/>')
cam += qr(SW / 2 - 40, 190, 80, 9, "#8d96a0")
b += [phone(PX1, PY, PW, cam)]
b += [path("M272 420C298 420 316 420 338 420")]
b += [badge(PX1 + PW - 6, PY + 6, 1)]

# ---- 2. session address ----
G2 = 905
PX2 = G2 - PW / 2
scr2 = (f'<rect x="12" y="8" width="{SW - 24}" height="46" rx="23" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>'
        + text(28, 39, "claude.ai/code", 22, 600, INK, anchor="start", family=MONO) +
        f'<rect x="60" y="86" width="{SW - 72}" height="54" rx="16" fill="{ACCENT}"/>'
        f'<rect x="78" y="106" width="100" height="10" rx="5" fill="#fff" opacity="0.85"/>'
        f'<rect x="12" y="160" width="{SW - 40}" height="130" rx="16" fill="#fff" stroke="{LINE}" stroke-width="2"/>'
        f'<rect x="28" y="182" width="130" height="10" rx="5" fill="{ACCENT_TINT}"/><rect x="28" y="206" width="160" height="10" rx="5" fill="{ACCENT_TINT}"/>'
        f'<rect x="28" y="230" width="110" height="10" rx="5" fill="{ACCENT_TINT}"/><rect x="28" y="254" width="140" height="10" rx="5" fill="{ACCENT_TINT}"/>'
        f'<rect x="60" y="312" width="{SW - 72}" height="54" rx="16" fill="{ACCENT}"/>'
        f'<rect x="78" y="332" width="84" height="10" rx="5" fill="#fff" opacity="0.85"/>'
        f'<rect x="12" y="{SH - 62}" width="{SW - 24}" height="46" rx="23" fill="#fff" stroke="{LINE}" stroke-width="2.5"/>'
        f'<rect x="32" y="{SH - 43}" width="90" height="8" rx="4" fill="{PAPER_LINE}"/>')
b += scene_head(G2, "세션 주소", "아무 브라우저")
b += [phone(PX2, PY, PW, scr2), badge(PX2 + PW - 6, PY + 6, 2)]

# ---- 3. session list ----
G3 = 1485
PX3 = G3 - PW / 2
rows = (f'<rect x="12" y="10" width="110" height="14" rx="7" fill="{PAPER_LINE}"/>'
        f'<rect x="10" y="48" width="{SW - 20}" height="118" rx="16" fill="{ACCENT_ZONE}" stroke="{ACCENT}" stroke-width="4"/>'
        + monitor(26, 80, 1.0) +
        f'<rect x="96" y="82" width="104" height="10" rx="5" fill="{INK2}" opacity="0.55"/><rect x="96" y="108" width="74" height="9" rx="4.5" fill="{LINE2}"/>')
for i, yy in enumerate((190, 300)):
    rows += (f'<rect x="10" y="{yy}" width="{SW - 20}" height="96" rx="16" fill="#fff" stroke="{LINE}" stroke-width="2"/>'
             f'<rect x="28" y="{yy + 32}" width="46" height="32" rx="6" fill="{PAPER_LINE}"/>'
             f'<rect x="96" y="{yy + 30}" width="{110 - i * 18}" height="10" rx="5" fill="{PAPER_LINE}"/>'
             f'<rect x="96" y="{yy + 54}" width="{70 + i * 12}" height="9" rx="4.5" fill="#e4e6e9"/>')
b += scene_head(G3, "세션 목록", "컴퓨터 아이콘 · 초록 점")
b += [phone(PX3, PY, PW, rows), badge(PX3 + PW - 6, PY + 6, 3)]

print(save("s8-rc-connect.svg", b, "8/56 phone side: three ways to connect (tools/illus/s8_rc_connect.py)"))
