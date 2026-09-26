"""advframe - shared frame for the advanced-course slide redraws (assets/advanced/stepNN/*.svg).

Each advanced slide is a standalone 1280x720 SVG (no notes panel), so the header, the illustrated
scene and the one explanation caption all live inside the same file. This module is the reusable
frame: it does the header pill + title, mounts an illuskit scene (drawn on the usual 1792 x 700
illuskit canvas) scaled down into the slide's scene area, and draws the bottom caption bar.

Usage:
    import sys, os
    sys.path.insert(0, os.path.join(os.path.dirname(__file__)))  # tools/illus
    sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))  # tools
    from illuskit import *
    from advframe import save_adv

    scene = [zone(...), mascot(...), desk(...), ...]  # drawn on the 1792 x 700 illuskit canvas
    save_adv("assets/advanced/step07/오케스트레이션이란.svg", "ADV 07",
             "AI 에이전트 오케스트레이션이란?", scene,
             ["오케스트레이션 = PM(지휘자)이 task를 등록하면",
              "담당자들이 각자 알아서 실행하는 구조"])

Note: the scene is placed with a <g transform="translate() scale()"> rather than a literal nested
<svg x y width height viewBox>, matching brand_icon()'s approach in illuskit.py - PyMuPDF (this
deck's required render-and-look checker) ignores x/y on a nested <svg> and draws it at the parent's
origin instead, which this sidesteps while producing the same pixels in a real browser.
"""
from __future__ import annotations

import os

import sys as _sys

_HERE = os.path.dirname(__file__)
if _HERE not in _sys.path:
    _sys.path.insert(0, _HERE)
if os.path.join(_HERE, "..") not in _sys.path:
    _sys.path.insert(0, os.path.join(_HERE, ".."))

from illuskit import FONT, DEFS, INK, MUTED, ACCENT  # noqa: E402

W, H = 1280, 720

# scene canvas (matches illuskit's default drawing canvas)
SCENE_W, SCENE_H = 1792, 700

# scene mount box inside the 1280x720 slide
SCENE_X, SCENE_Y, SCENE_BOX_W = 60, 150, 1160
SCENE_SCALE = SCENE_BOX_W / SCENE_W
SCENE_BOX_H = SCENE_H * SCENE_SCALE

CAPTION_BG = "#eaf3fb"
CAPTION_TEXT = "#171717"


def _esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def header(step_label: str, title: str) -> list[str]:
    """The old deck's header: a small blue pill with the step label, then the bold title."""
    pill_w = max(70, int(len(step_label) * 8.5) + 28)
    out = [
        f'<rect x="60" y="44" width="{pill_w}" height="24" rx="12" fill="#2563eb"/>',
        f'<text x="{60 + pill_w / 2}" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">{_esc(step_label)}</text>',
        f'<text x="60" y="112" font-family="{FONT}" font-size="34" font-weight="700" fill="{INK}">{_esc(title)}</text>',
    ]
    return out


def scene_mount(scene_parts: list[str] | str) -> str:
    """Mounts an illuskit scene (drawn on the 1792 x 700 canvas) into the slide's scene area."""
    inner = scene_parts if isinstance(scene_parts, str) else "\n".join(scene_parts)
    return (f'<g transform="translate({SCENE_X} {SCENE_Y}) scale({SCENE_SCALE:.6f})">'
            f'<clipPath id="scene-clip"><rect x="0" y="0" width="{SCENE_W}" height="{SCENE_H}"/></clipPath>'
            f'<g clip-path="url(#scene-clip)">{inner}</g></g>')


def caption_bar(lines: list[str], y0=630, y1=690, x=60, w=1160, size=22) -> list[str]:
    """A light tinted rounded bar holding 1-3 short caption lines, bottom of the slide."""
    h = y1 - y0
    n = len(lines)
    out = [f'<rect x="{x}" y="{y0}" width="{w}" height="{h}" rx="14" fill="{CAPTION_BG}"/>']
    line_h = size * 1.5
    total_h = line_h * n
    first_baseline = y0 + (h - total_h) / 2 + size * 0.95
    for i, line in enumerate(lines):
        yy = first_baseline + i * line_h
        out.append(f'<text x="{x + w / 2}" y="{yy}" text-anchor="middle" font-family="{FONT}" '
                    f'font-size="{size}" font-weight="700" fill="{CAPTION_TEXT}">{_esc(line)}</text>')
    return out


def save_adv(out_path: str, step_label: str, title: str, scene_parts: list[str] | str,
             caption_lines: list[str]) -> str:
    """Writes a full 1280x720 advanced-slide SVG: header + mounted illuskit scene + caption bar.

    `out_path` may be relative to the repo root or absolute; it is written exactly as given.
    """
    body = []
    body += header(step_label, title)
    body.append(scene_mount(scene_parts))
    body += caption_bar(caption_lines)
    inner = "\n".join(body)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
           f'font-family="{FONT}">\n<rect width="{W}" height="{H}" fill="#ffffff"/>\n{DEFS}\n{inner}\n</svg>\n')
    out_path = os.path.normpath(out_path)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(svg)
    return out_path
