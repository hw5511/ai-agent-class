"""A4/key-names API 키의 여러 이름: one big blue key whose ring carries five name tags (API Key, Secret, Token,
Client ID, 인증키) - one key, many names - and whose bit goes into the lock on a server rack's door; the rack
lights up and an answer travels back to Claude, the key holder.
Badges: 1 the key itself, 2 the name tags, 3 the lock on the server."""
import math
import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

STEEL = "#8d949c"


def api_key(bx, by, s=1.0, color=ACCENT):
    """A horizontal key, bow centred on (bx, by), blade pointing right. At s=1 the bow is r=70 and the tip
    is at bx + 470. Returns the SVG and the tip x."""
    g = [f'<g transform="translate({bx} {by}) scale({s})" filter="url(#shs)">',
         # bow: a ring with a hole (even-odd), collar, shaft, bit with three teeth
         f'<path d="M-70 0a70 70 0 1 0 140 0a70 70 0 1 0 -140 0zM-27 0a27 27 0 1 1 54 0a27 27 0 1 1 -54 0z" '
         f'fill="{color}" fill-rule="evenodd"/>',
         f'<rect x="58" y="-27" width="38" height="54" rx="10" fill="{color}"/>',
         f'<rect x="90" y="-16" width="380" height="32" rx="10" fill="{color}"/>',
         f'<path d="M340 10H470v26h-14v22h-26v-14h-22v30h-28v-20h-20v12h-20z" fill="{color}" stroke="{color}" '
         f'stroke-width="6" stroke-linejoin="round"/>',
         f'<rect x="104" y="-6" width="220" height="5" rx="2.5" fill="#fff" opacity="0.35"/>',
         "</g>"]
    return "".join(g), bx + 470 * s


def tag(hx, hy, label, side, ang, w=250, h=66):
    """A luggage tag hanging from a string tied through its hole at (hx, hy). side=+1: the tag runs to the
    right of the hole, -1: to the left. ang = tilt in degrees around the hole."""
    e = 30  # hole to the tag's narrow end
    x0, x1 = -e, w - e
    c, r = 20, 12
    d = (f"M{x0 + c} {-h / 2}H{x1 - r}a{r} {r} 0 0 1 {r} {r}V{h / 2 - r}a{r} {r} 0 0 1 {-r} {r}"
         f"H{x0 + c}L{x0} {h / 2 - c}V{-h / 2 + c}z")
    flip = "" if side > 0 else " scale(-1 1)"
    tx = side * ((x0 + x1) / 2 + 12)
    return (f'<g transform="translate({hx} {hy}) rotate({ang})">'
            f'<g{flip and f" transform=\"{flip.strip()}\""}><path d="{d}" fill="#fff" stroke="{LINE2}" stroke-width="2.5" filter="url(#shs)"/></g>'
            f'<circle cx="0" cy="0" r="12" fill="#fff" stroke="{ACCENT_TINT}" stroke-width="5"/>'
            f'<circle cx="0" cy="0" r="6" fill="{LINE}"/>'
            f'{text(tx, 11, label, 31, 800, INK)}</g>')


def rack(x, y, w, h, lit=True):
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{INK2}" filter="url(#sh)"/>']
    n = 8
    step = (h - 56) / n
    for i in range(n):
        yy = y + 28 + i * step
        led = GREEN if lit else "#4b4f56"
        out += [f'<rect x="{x + 24}" y="{yy:.1f}" width="{w - 48}" height="{step - 14:.1f}" rx="6" fill="#2f333a"/>',
                f'<circle cx="{x + w - 50}" cy="{yy + (step - 14) / 2:.1f}" r="8" fill="{led}"/>',
                f'<rect x="{x + 44}" y="{yy + (step - 14) / 2 - 3:.1f}" width="{w * 0.36:.0f}" height="6" rx="3" fill="#43474e"/>']
    return "\n".join(out)


b = [panel()]

KS = 1.55
R_BOW = 70 * KS
HOLE_R = 27 * KS
TAG_W, TAG_H, GAP = 270, 62, 80
RW, RH, RY = 340, 590, 150
LOCK_W, LOCK_H = 112, 160

# horizontal layout: centre the whole group (tags' left edge .. rack's right edge) on the canvas
tip_off = 470 * KS
left_ext = GAP + TAG_W - 30 + 12
right_ext = tip_off - 30 + LOCK_W / 2 + RW
BX = round(W / 2 - (right_ext - left_ext) / 2)
BY = 272
TIP_X = BX + tip_off
LOCK_X = TIP_X - 30
RX = LOCK_X + LOCK_W / 2

# ---- 3: the server rack ----
b += [rack(RX, RY, RW, RH)]
b += [text(RX + RW / 2, RY + RH + 50, "서버", 36, 900, INK)]

# ---- 1: the key; its blade enters the lock box on the rack's edge ----
key_svg, _ = api_key(BX, BY, KS)

# key ring threaded through the bow's hole: back half under the key, front half over it
RING_R = 58
RCX, RCY = BX, BY + HOLE_R - 14 + RING_R  # ring top sits inside the hole, the rest hangs below the bow
ring_back = f'<circle cx="{RCX}" cy="{RCY}" r="{RING_R}" fill="none" stroke="{STEEL}" stroke-width="10"/>'
ring_front = (f'<path d="M{RCX - RING_R} {RCY}a{RING_R} {RING_R} 0 0 0 {2 * RING_R} 0" fill="none" '
              f'stroke="{STEEL}" stroke-width="10" stroke-linecap="round"/>')
KNOT_X, KNOT_Y = RCX, RCY + RING_R

# ---- 2: five name tags, all tied to that one ring ----
# (label, side, hole offset from the ring's axis, drop below the ring). Deeper tags hang closer to the axis
# so every string clears the narrow ends of the tags above it.
names = [("API Key", -1, 80, 66), ("Secret", 1, 76, 132), ("Token", -1, 72, 198), ("Client ID", 1, 48, 264),
         ("인증키", -1, 40, 330)]
strings, tags = [], []
for label, side, off, dy in names:
    hx, hy = KNOT_X + side * off, KNOT_Y + dy
    strings.append(f'<path d="M{KNOT_X} {KNOT_Y}L{hx} {hy}" stroke="{MUTED}" stroke-width="3" fill="none" stroke-linecap="round"/>')
    tags.append(tag(hx, hy, label, side, side * 5, TAG_W, TAG_H))

b += [ring_back, key_svg, ring_front]
b += tags + strings  # strings on top: each one runs over its own tag's narrow end into the hole
b += [f'<circle cx="{KNOT_X}" cy="{KNOT_Y}" r="7" fill="{STEEL}"/>']

# lock box over the blade's tip: keyhole + a green "open" light
LY = BY - LOCK_H / 2
LCX = LOCK_X + LOCK_W / 2
b += [f'<rect x="{LOCK_X}" y="{LY}" width="{LOCK_W}" height="{LOCK_H}" rx="18" fill="#e3e6ea" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
      f'<circle cx="{LCX}" cy="{BY - 22}" r="16" fill="{INK2}"/>',
      f'<path d="M{LCX - 10} {BY - 16}h20l8 42h-36z" fill="{INK2}"/>',
      f'<circle cx="{LCX}" cy="{LY + LOCK_H - 22}" r="8" fill="{GREEN}"/>']

b += [badge(BX - 0.71 * R_BOW - 34, BY - 0.71 * R_BOW - 34, 1)]
b += [badge(KNOT_X + 76 + TAG_W - 30 + 58, KNOT_Y + 132 + 14, 2)]
b += [badge(LCX, LY - 44, 3)]

print(save("a4-key-names.svg", b, "A4 API 키의 여러 이름 (tools/illus/a4_key_names.py)"))
