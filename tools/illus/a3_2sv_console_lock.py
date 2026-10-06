"""A3-2sv: warning for the 2-step part. Left (red) = a Google Cloud console gate locked for an account without
2-step verification, the student/Claude stopped in front; right (green) = the same gate open with 2-step
verification on (key + phone showing a code). Badges: 1 2SV off -> console entry blocked, 2 on -> through.
Source: docs.cloud.google.com/docs/authentication/mfa-requirement (personal accounts need 2SV for the console
since 2025-05-12; accounts without it are prompted to set it up before they can proceed)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]
FLOOR = 700
DARK_RED, PALE_RED = "#b02a2a", "#fdeeee"
PALE_GREEN = "#eaf7ef"

b += [f'<rect x="40" y="110" width="840" height="680" rx="44" fill="{PALE_RED}"/>',
      f'<rect x="912" y="110" width="840" height="680" rx="44" fill="{PALE_GREEN}"/>']


def key(x, y, s=1.0, color=ACCENT_DARK):
    return (f'<g transform="translate({x} {y}) scale({s})"><circle cx="30" cy="30" r="26" fill="none" stroke="{color}" stroke-width="12"/>'
            f'<rect x="52" y="24" width="96" height="13" rx="6" fill="{color}"/><rect x="112" y="34" width="13" height="26" rx="4" fill="{color}"/>'
            f'<rect x="132" y="34" width="13" height="20" rx="4" fill="{color}"/></g>')


def padlock(cx, cy, s=1.0):
    return (f'<g transform="translate({cx} {cy}) scale({s})" filter="url(#shs)"><path d="M-30 -16V-40a30 30 0 0 1 60 0V-16" fill="none" stroke="{INK2}" stroke-width="13" stroke-linecap="round"/>'
            f'<rect x="-48" y="-18" width="96" height="80" rx="14" fill="{RED}"/><circle cx="0" cy="18" r="11" fill="#fff"/><rect x="-4" y="22" width="8" height="22" rx="3" fill="#fff"/></g>')


def gate(ox, opened):
    """gate frame at x offset ox; floor at FLOOR."""
    gx0, gx1 = ox + 520, ox + 840
    out = [f'<rect x="{gx0 - 20}" y="250" width="{gx1 - gx0 + 40}" height="{FLOOR - 250}" rx="10" fill="{INK2}" filter="url(#sh)"/>']
    # opening
    ix, iy, iw, ih = gx0 + 22, 332, gx1 - gx0 - 44, FLOOR - 332
    if opened:
        screen = (f'<rect x="{ix}" y="{iy}" width="{iw}" height="{ih}" fill="{SCREEN}"/>'
                  f'<rect x="{ix}" y="{iy}" width="{iw}" height="38" fill="{ACCENT_MID}"/>'
                  f'<rect x="{ix + 18}" y="{iy + 58}" width="120" height="14" rx="7" fill="{PAPER_LINE}"/>'
                  f'<rect x="{ix + 18}" y="{iy + 86}" width="{iw - 36}" height="70" rx="12" fill="#fff" stroke="{ACCENT_TINT}" stroke-width="3"/>'
                  f'<rect x="{ix + 18}" y="{iy + 172}" width="{iw - 36}" height="70" rx="12" fill="#fff" stroke="{ACCENT_TINT}" stroke-width="3"/>'
                  + text(ix + iw / 2 + 14, iy + 136, "OAuth 클라이언트", 22, 800, ACCENT_DARK)
                  + text(ix + iw / 2 + 14, iy + 222, "앱 게시", 24, 800, ACCENT_DARK))
        out += [screen]
        out += [f'<path d="M{ix} {iy}L{ix + 30} {iy + 16}V{FLOOR - 16}L{ix} {FLOOR}z" fill="{DESK_TOP}" stroke="{LINE2}" stroke-width="3"/>']
    else:
        out += [f'<rect x="{ix}" y="{iy}" width="{iw}" height="{ih}" fill="{DESK}"/>']
        for k in range(1, 5):
            out += [f'<rect x="{ix + k * iw / 5 - 3}" y="{iy}" width="6" height="{ih}" fill="{LINE2}"/>']
    # lintel sign
    out += [f'<rect x="{gx0 - 20}" y="196" width="{gx1 - gx0 + 40}" height="96" rx="20" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
            text((gx0 + gx1) / 2, 256, "Cloud 콘솔", 40, 900, ACCENT_DARK)]
    return "\n".join(out)


# ---------- left: locked ----------
b += [text(90, 190, "2단계 인증 꺼짐", 54, 900, DARK_RED, anchor="start")]
b += [badge(50 + 804 - 6 - 40, 150, 1)]
b += [gate(0, False), padlock(680, 480, 1.25)]
b += [f'<g transform="rotate(-9 680 610)"><rect x="470" y="576" width="420" height="68" rx="10" fill="{RED}" filter="url(#shs)"/>'
      + text(680, 623, "설정 먼저, 진입 불가", 34, 900, "#fff") + '</g>']
b += [mascot(80, FLOOR - 143, 1.0)]
b += [phone(330, FLOOR - 210, 104, f'<rect x="12" y="40" width="64" height="12" rx="6" fill="{PAPER_LINE}"/><rect x="12" y="66" width="48" height="12" rx="6" fill="{PAPER_LINE}"/>')]
b += [key(80, FLOOR + 22, 0.62, "#aeb3ba")]
b += [bubble(86, FLOOR - 270, 170, 74, "막혔다!", 34, stroke=RED, text_color=DARK_RED, tail_x=150)]
b += [cross(470, FLOOR - 190, 30)]

# ---------- right: open ----------
b += [text(960, 190, "2단계 인증 켜짐", 54, 900, GREEN, anchor="start")]
b += [badge(912 + 840 - 46, 150, 2)]
b += [gate(886, True)]
b += [mascot(980, FLOOR - 143, 1.0)]
code = (text(44, 60, "482 913", 22, 900, ACCENT_DARK, family=MONO) + f'<rect x="12" y="86" width="64" height="10" rx="5" fill="{GREEN}"/>')
b += [phone(1230, FLOOR - 210, 104, code), check(1282, FLOOR - 224, 24)]
b += [key(980, FLOOR + 22, 0.62, ACCENT_DARK)]
b += [path(f"M1352 {FLOOR - 130}C1380 {FLOOR - 150} 1410 {FLOOR - 150} 1452 {FLOOR - 130}", color=GREEN, width=5)]
b += [bubble(986, FLOOR - 270, 170, 74, "통과!", 34, stroke=GREEN, text_color=GREEN, tail_x=1050)]

# floor line under both
b += [f'<rect x="40" y="{FLOOR}" width="1712" height="10" rx="5" fill="{DESK_TOP}"/>']

print(save("a3-2sv-console-lock.svg", b, "A3-2sv Cloud console gate locked without 2SV (tools/illus/a3_2sv_console_lock.py)"))
