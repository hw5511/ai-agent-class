"""illuskit - shared parts for the lecture's concept illustrations (web/public/illustrations/*.svg).

Owner benchmark (2026-09-26): basic 5/2 "메인 클로드의 하청" (s5-subcontract.svg at commit 6872b7c).
The look: the Claude pixel mascot as the actor at a desk, real objects (folders, papers, laptops, clouds,
windows) that make the metaphor physical, things moving along dotted accent paths, a soft tinted zone for
"the other place", short labels on the objects themselves, numbered badges in reading order, and the
picture filling the stage.

Usage:
    from illuskit import *
    body = [panel(), cloud(900, 260, 1.0), mascot(100, 430), desk(70, 574, 500, "내 컴퓨터"), badge(300, 280, 1)]
    save("s8-example.svg", body)

Every helper returns an SVG fragment string. Coordinates are in the 1792 x 840 canvas.
"""
from __future__ import annotations

import os

W, H = 1792, 840
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "web", "public", "illustrations")

# palette
INK = "#101113"
INK2 = "#2b2f35"
MUTED = "#5b6570"
ACCENT = "#1273c4"
ACCENT_DARK = "#0d5c9e"
ACCENT_MID = "#5aa0dc"
ACCENT_TINT = "#cfe3f5"
ACCENT_ZONE = "#eaf3fb"   # tinted zone: cloud / "the other place"
WARM_ZONE = "#fff6f0"     # tinted zone: "me / main" (the 5/2 head-office zone)
MASCOT = "#d97757"
GREEN = "#12a150"         # done / report / ok
RED = "#d64545"           # fail / no
PANEL = "#f7f8fa"
LINE = "#c9ccd1"
LINE2 = "#aeb3ba"
DESK_TOP = "#b9bec5"
DESK = "#d7dbe0"
PAPER_LINE = "#d5d8dc"
SCREEN = "#f4f8fc"

FONT = "Pretendard, 'Pretendard Variable', 'Malgun Gothic', sans-serif"
MONO = "'D2Coding', Consolas, 'Courier New', monospace"

_MASCOT_CELLS = [(0, 2), (1, 2), (2, 0), (2, 1), (2, 2), (2, 3), (3, 0), (3, 1), (3, 2), (3, 3), (3, 4), (4, 0), (4, 2),
                 (4, 3), (5, 0), (5, 1), (5, 2), (5, 3), (5, 4), (6, 0), (6, 1), (6, 2), (6, 3), (7, 0), (7, 1), (7, 2),
                 (7, 3), (8, 0), (8, 1), (8, 2), (8, 3), (9, 0), (9, 1), (9, 2), (9, 3), (10, 0), (10, 1), (10, 2),
                 (10, 3), (10, 4), (11, 0), (11, 2), (11, 3), (12, 0), (12, 1), (12, 2), (12, 3), (12, 4), (13, 0),
                 (13, 1), (13, 2), (13, 3), (14, 2), (15, 2)]
_MASCOT_D = "".join(f"M{c * 15} {r * 28.5}h15.4v28.9h-15.4z" for c, r in _MASCOT_CELLS)

GH_MARK = ("M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04"
           "-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 "
           "1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 "
           "0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 "
           "2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 "
           "5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 "
           "24 12.297c0-6.627-5.373-12-12-12")

DEFS = f"""<defs>
  <filter id="sh" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#101113" flood-opacity="0.12"/></filter>
  <filter id="shs" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#101113" flood-opacity="0.14"/></filter>
  <marker id="ab" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{ACCENT}"/></marker>
  <marker id="ak" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{INK}"/></marker>
  <marker id="ag" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{GREEN}"/></marker>
</defs>"""


def svg(body: list[str] | str, comment: str = "") -> str:
    inner = body if isinstance(body, str) else "\n".join(body)
    c = f"<!-- {comment} -->\n" if comment else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="{FONT}">\n'
            f"{c}{DEFS}\n{inner}\n</svg>\n")


def save(name: str, body: list[str] | str, comment: str = "") -> str:
    path = os.path.normpath(os.path.join(OUT_DIR, name))
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(svg(body, comment))
    return path


# ---------- frame and zones ----------
def panel() -> str:
    """The light rounded stage the 5/2 benchmark sits on."""
    return f'<rect x="16" y="16" width="{W - 32}" height="{H - 32}" rx="28" fill="{PANEL}" stroke="#e5e5e5" stroke-width="2"/>'


def zone(x, y, w, h, fill=ACCENT_ZONE, rx=26) -> str:
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"/>'


def cloud(cx, cy, s=1.0, fill=ACCENT_ZONE, shadow=True) -> str:
    """A soft cloud centred on (cx, cy); at s=1 it is about 530 x 390."""
    f = ' filter="url(#sh)"' if shadow else ""
    return (f'<g transform="translate({cx} {cy}) scale({s})"{f}>'
            f'<circle cx="-130" cy="40" r="124" fill="{fill}"/><circle cx="0" cy="-32" r="162" fill="{fill}"/>'
            f'<circle cx="136" cy="44" r="116" fill="{fill}"/><rect x="-270" y="32" width="532" height="172" rx="86" fill="{fill}"/></g>')


# ---------- actors ----------
def mascot(x, y, s=1.0, fill=MASCOT, opacity=1.0) -> str:
    """The Claude pixel mascot; at s=1 it is 240 x 143 with (x, y) its top-left."""
    op = f' opacity="{opacity}"' if opacity != 1 else ""
    return (f'<path transform="translate({x} {y}) scale({s})" d="{_MASCOT_D}" fill="{fill}" '
            f'shape-rendering="crispEdges"{op}/>')


def desk(x, y, w, label: str | None = None, body_h=190, label_size=34) -> str:
    """A desk: top slab at y (26 high), body below, optional white nameplate."""
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="26" rx="10" fill="{DESK_TOP}" filter="url(#shs)"/>',
           f'<rect x="{x + 16}" y="{y + 24}" width="{w - 32}" height="{body_h}" rx="10" fill="{DESK}" stroke="{LINE2}" stroke-width="2"/>']
    if label:
        pw = max(120, int(len(label) * label_size * 0.95) + 48)
        cx = x + w / 2
        out.append(f'<rect x="{cx - pw / 2}" y="{y + 90}" width="{pw}" height="56" rx="10" fill="#fff" stroke="{LINE2}" stroke-width="2"/>')
        out.append(text(cx, y + 90 + 40, label, label_size, 900))
    return "\n".join(out)


# ---------- objects ----------
def folder(x, y, w=160, label: str | None = None, label_color=INK, mono=True, open_=False) -> str:
    """A blue folder with papers peeking out; height = w * 0.775. Label under it."""
    s = w / 160
    out = [f'<g transform="translate({x} {y}) scale({s})">',
           f'<path d="M0 16a12 12 0 0 1 12-12h42l14 14h80a12 12 0 0 1 12 12v82a12 12 0 0 1-12 12H12A12 12 0 0 1 0 112z" fill="{ACCENT_DARK}"/>',
           '<rect x="14" y="20" width="132" height="62" rx="6" fill="#fff"/>',
           f'<rect x="26" y="32" width="70" height="6" rx="3" fill="{ACCENT_TINT}"/><rect x="26" y="46" width="96" height="6" rx="3" fill="{ACCENT_TINT}"/>',
           f'<rect x="0" y="40" width="160" height="84" rx="12" fill="{ACCENT}"/>', "</g>"]
    if label:
        out.append(text(x + w / 2, y + w * 0.775 + 34 * max(0.6, s), label, max(16, int(30 * s)), 800, label_color,
                        family=MONO if mono else None))
    return "\n".join(out)


def doc(x, y, w=54, rot=0.0, accent=ACCENT, stroke=LINE, shadow=True) -> str:
    """A paper sheet with a folded corner (w x 1.25w), top-left (x, y), rotated around its centre."""
    s = w / 64
    f = ' filter="url(#shs)"' if shadow else ""
    return (f'<g transform="translate({x} {y}) rotate({rot} {w / 2} {w * 0.625}) scale({s})"{f}>'
            f'<path d="M6 2h36l20 20v52a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" fill="#fff" stroke="{stroke}" stroke-width="2.5"/>'
            f'<path d="M42 2v16a4 4 0 0 0 4 4h16" fill="#eef1f4" stroke="{stroke}" stroke-width="2.5"/>'
            f'<rect x="12" y="36" width="38" height="4" rx="2" fill="{accent}"/>'
            f'<rect x="12" y="48" width="30" height="4" rx="2" fill="{PAPER_LINE}"/><rect x="12" y="60" width="36" height="4" rx="2" fill="{PAPER_LINE}"/></g>')


def laptop(x, y, w=196, screen: str = "") -> str:
    """A small open laptop seen from the front; (x, y) = top-left of the lid, height = w * 0.63 + base.
    `screen` is extra SVG drawn in the screen area (origin already moved to the screen's top-left,
    screen size = (w-20) x (w*0.63-20))."""
    h = w * 0.63
    return (f'<g filter="url(#shs)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{INK2}"/>'
            f'<rect x="{x + 10}" y="{y + 10}" width="{w - 20}" height="{h - 20}" rx="6" fill="{SCREEN}"/></g>'
            f'<g transform="translate({x + 10} {y + 10})">{screen}</g>'
            f'<rect x="{x - 14}" y="{y + h - 4}" width="{w + 28}" height="10" rx="5" fill="#c3c9cf"/>')


def window(x, y, w, h, kind="app", title: str = "", body: str = "") -> str:
    """A window drawing. kind: 'browser' (tab + address bar), 'app' (title bar), 'terminal' (dark).
    `body` is SVG placed with origin at the content area's top-left."""
    dark = kind == "terminal"
    bg = "#1e1f22" if dark else "#fff"
    bar = "#2b2d31" if dark else "#eef1f4"
    out = [f'<g filter="url(#sh)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{bg}" stroke="{"#3a3d42" if dark else LINE}" stroke-width="2"/></g>',
           f'<path d="M{x + 1} {y + 52}V{y + 16}a15 15 0 0 1 15-15h{w - 32}a15 15 0 0 1 15 15V{y + 52}z" fill="{bar}"/>',
           f'<circle cx="{x + 26}" cy="{y + 26}" r="7" fill="#ff5f57"/><circle cx="{x + 48}" cy="{y + 26}" r="7" fill="#febc2e"/><circle cx="{x + 70}" cy="{y + 26}" r="7" fill="#28c840"/>']
    top = y + 52
    if kind == "browser":
        out.append(f'<rect x="{x + 96}" y="{y + 12}" width="{w - 116}" height="30" rx="15" fill="#fff" stroke="{LINE}" stroke-width="1.5"/>')
        if title:
            out.append(text(x + 116, y + 34, title, 18, 500, MUTED, anchor="start", family=MONO))
    elif title:
        out.append(text(x + w / 2, y + 34, title, 20, 700, "#c9ccd1" if dark else MUTED))
    out.append(f'<g transform="translate({x} {top})">{body}</g>')
    return "\n".join(out)


def phone(x, y, w=150, screen: str = "") -> str:
    h = w * 2.0
    return (f'<g filter="url(#sh)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{w * 0.16}" fill="{INK2}"/>'
            f'<rect x="{x + 8}" y="{y + 8}" width="{w - 16}" height="{h - 16}" rx="{w * 0.12}" fill="{SCREEN}"/></g>'
            f'<rect x="{x + w / 2 - 22}" y="{y + 16}" width="44" height="8" rx="4" fill="{INK2}"/>'
            f'<g transform="translate({x + 8} {y + 32})">{screen}</g>')


def gh_mark(x, y, size=48, fill=INK) -> str:
    return f'<path transform="translate({x} {y}) scale({size / 24})" d="{GH_MARK}" fill="{fill}"/>'


def check(cx, cy, r=26, fill=GREEN) -> str:
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>'
            f'<path d="M{cx - r * 0.42} {cy + r * 0.02}l{r * 0.3} {r * 0.3} {r * 0.56}-{r * 0.6}" fill="none" stroke="#fff" stroke-width="{r * 0.2}" stroke-linecap="round" stroke-linejoin="round"/>')


def cross(cx, cy, r=26, fill=RED) -> str:
    d = r * 0.36
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>'
            f'<path d="M{cx - d} {cy - d}L{cx + d} {cy + d}M{cx + d} {cy - d}L{cx - d} {cy + d}" stroke="#fff" stroke-width="{r * 0.2}" stroke-linecap="round"/>')


# ---------- movement, labels, badges ----------
def path(d, color=ACCENT, dotted=True, arrow=True, width=5) -> str:
    """A travel path. dotted = the 5/2 dotted trail; arrow at the end."""
    marker = {ACCENT: "ab", INK: "ak", GREEN: "ag"}.get(color, "ab")
    dash = ' stroke-dasharray="2 15"' if dotted else ""
    m = f' marker-end="url(#{marker})"' if arrow else ""
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"{dash}{m}/>'


def text(x, y, s, size=34, weight=800, fill=INK, anchor="middle", family=None) -> str:
    fam = f' font-family="{family}"' if family else ""
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}"{fam}>{s}</text>'


def badge(cx, cy, n) -> str:
    """The numbered badge (matches the note with the same number); '!' is outlined."""
    if n == "!":
        return (f'<circle cx="{cx}" cy="{cy}" r="28" fill="#fff" stroke="{ACCENT}" stroke-width="5"/>'
                f'<text x="{cx}" y="{cy + 10.6}" font-size="29" font-weight="800" fill="{ACCENT}" text-anchor="middle">!</text>')
    return (f'<circle cx="{cx}" cy="{cy}" r="28" fill="{ACCENT}" stroke="#fff" stroke-width="4"/>'
            f'<text x="{cx}" y="{cy + 10.6}" font-size="29" font-weight="800" fill="#fff" text-anchor="middle">{n}</text>')


# ---------- real service logos (inlined so an <img> is never needed) ----------
def logo_svg(rel_path: str, x, y, size=64) -> str:
    """Inlines web/public/logos/<rel_path> (a 0 0 64 64 viewBox icon) at top-left (x, y), scaled to `size`."""
    src = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "web", "public", "logos", rel_path))
    with open(src, "r", encoding="utf-8") as f:
        content = f.read()
    start = content.index(">", content.index("<svg")) + 1
    end = content.rindex("</svg>")
    inner = content[start:end]
    s = size / 64
    return f'<g transform="translate({x} {y}) scale({s})">{inner}</g>'


# ---------- custom canvas size (some slides need a non-default stage) ----------
def svg_sized(body: list[str] | str, w: int, h: int, comment: str = "") -> str:
    """Like svg(), but for a canvas other than the default W x H."""
    inner = body if isinstance(body, str) else "\n".join(body)
    c = f"<!-- {comment} -->\n" if comment else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" font-family="{FONT}">\n'
            f"{c}{DEFS}\n{inner}\n</svg>\n")


def save_sized(name: str, body: list[str] | str, w: int, h: int, comment: str = "") -> str:
    """Like save(), but for a canvas other than the default W x H."""
    path = os.path.normpath(os.path.join(OUT_DIR, name))
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(svg_sized(body, w, h, comment))
    return path


def panel_sized(w: int, h: int) -> str:
    """Like panel(), but for a canvas other than the default W x H."""
    return f'<rect x="16" y="16" width="{w - 32}" height="{h - 32}" rx="28" fill="{PANEL}" stroke="#e5e5e5" stroke-width="2"/>'


# ---------- explicit arrowheads (PyMuPDF does not draw SVG <marker> arrowheads or dash patterns,
# so any arrowhead that matters to the reading needs a real filled polygon, not marker-end) ----------
def arrow_head(tip_x, tip_y, angle_deg, size=20, color=ACCENT) -> str:
    """A solid triangular arrowhead, tip at (tip_x, tip_y), pointing along angle_deg
    (0 = +x / right, 90 = +y / down, standard atan2 convention on an SVG y-down canvas)."""
    import math
    a = math.radians(angle_deg)
    back, half = size * 1.7, size * 0.95
    bx, by = tip_x - back * math.cos(a), tip_y - back * math.sin(a)
    px, py = -math.sin(a), math.cos(a)
    x1, y1 = bx + half * px, by + half * py
    x2, y2 = bx - half * px, by - half * py
    return f'<path d="M{tip_x:.1f} {tip_y:.1f}L{x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}Z" fill="{color}"/>'


def arrow_head_at(cp_x, cp_y, tip_x, tip_y, size=20, color=ACCENT) -> str:
    """arrow_head() aimed by the direction from a path's last control point (cp_x, cp_y) to its
    endpoint/tip (tip_x, tip_y) - the tangent of a cubic bezier's final segment."""
    import math
    angle = math.degrees(math.atan2(tip_y - cp_y, tip_x - cp_x))
    return arrow_head(tip_x, tip_y, angle, size, color)
