"""5/42 훅 라이프사이클: the mascot walks a track through one session, with a hook bell at each
stop - SessionStart, UserPromptSubmit, PreToolUse, PermissionRequest, [도구 실행], PostToolUse,
Stop, SessionEnd. The tool stops repeat (green return arrow). Side events (Notification,
PreCompact, SubagentStart, SubagentStop) sit off the track since they fire separately.
Rework round 1 (2026-09-26): labels alternate above/below the track so none overlap, badges sit
beside their own label, the zone encloses labels+bells+mascot, the mascot is bigger and walks on
the track, and the side-event row moved to the bottom third so the whole canvas height is used."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

GROUND = 480
TOP_Y = GROUND - 150
BOT_Y = GROUND + 130

b = [panel(), zone(70, 250, 1652, 410, ACCENT_ZONE, rx=30)]
b += [text(110, 225, "도구 루프 · 도구를 쓸 때마다 반복", 26, 700, MUTED, anchor="start")]
b += [f'<line x1="110" y1="{GROUND}" x2="1680" y2="{GROUND}" stroke="{LINE}" stroke-width="10" stroke-linecap="round"/>']


def bell(cx, cy, s=1.0, color=ACCENT_DARK):
    """A hook bell on a post, planted at (cx, cy) (cy = ground level)."""
    return (f'<g transform="translate({cx} {cy}) scale({s})">'
            f'<rect x="-4" y="-56" width="8" height="56" rx="4" fill="{LINE2}"/>'
            f'<path d="M-24 -56C-24 -75 -13 -88 0 -88C13 -88 24 -75 24 -56C24 -49 28 -45 28 -45L-28 -45C-28 -45 -24 -49 -24 -56Z" fill="{color}"/>'
            f'<circle cx="0" cy="-38" r="6.5" fill="{color}"/><circle cx="0" cy="-88" r="5.5" fill="{color}"/></g>')


# (x, label, badge, above-track?)
stops = [
    (140, "SessionStart", None, True),
    (350, "UserPromptSubmit", 1, False),
    (560, "PreToolUse", None, True),
    (770, "PermissionRequest", None, False),
    (980, "[도구 실행]", None, True),
    (1190, "PostToolUse", 2, False),
    (1400, "Stop", 3, True),
    (1610, "SessionEnd", None, False),
]

# one continuous walking path along the ground, stop to stop
d = f"M{stops[0][0]} {GROUND}"
for x, _, _, _ in stops[1:]:
    d += f"L{x} {GROUND}"
b += [path(d)]

for x, label, badge_n, above in stops:
    b += [bell(x, GROUND, 0.85)]
    ly = TOP_Y if above else BOT_Y
    b += [text(x, ly, label, 27, 800, INK)]
    if badge_n:
        bx = x + (len(label) * 8.2) + 44
        by = ly - 9
        b += [badge(bx, by, badge_n)]

# tool loop: return arrow from PostToolUse back toward PreToolUse, well above the top labels;
# its endpoints sit beside (not under) the PostToolUse/PreToolUse labels so the thick band never
# touches them
b += [path(f"M1130 {GROUND-80}C1130 {GROUND-290} 700 {GROUND-290} 700 {GROUND-80}", color=GREEN)]
b += [text(915, GROUND - 300, "다음 도구가 있으면 되돌아감", 26, 700, "#0d7a3c")]

# mascot walking the track, between PermissionRequest (770) and [도구 실행] (980), standing on the
# line but shrunk and centred in the gap so it clears both bells (each ~24px wide at cx +-24)
MASCOT_S = 0.62
MASCOT_CX = (770 + 980) / 2
b += [mascot(MASCOT_CX - 240 * MASCOT_S / 2, GROUND - 143 * MASCOT_S, MASCOT_S)]

# side events: fire separately, moved to the bottom third to use the full canvas height
b += [text(896, 700, "따로 발생", 27, 800, MUTED, anchor="middle")]
side = ["Notification", "PreCompact", "SubagentStart", "SubagentStop"]
sx = 290
for lbl in side:
    b += [f'<circle cx="{sx}" cy="750" r="26" fill="#fff" stroke="{LINE2}" stroke-width="4"/>',
          f'<circle cx="{sx}" cy="750" r="7" fill="{LINE2}"/>']
    b += [text(sx, 799, lbl, 26, 700, MUTED)]
    sx += 405

print(save("s5-hook-track.svg", b, "5/42 훅 라이프사이클 (tools/illus/s5_hook_track.py)"))
