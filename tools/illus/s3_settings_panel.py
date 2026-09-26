"""3/11 주요 설정 항목: settings.json drawn as a monitor sitting on Claude's desk - a permissions gate,
a model dial, an env variable tag, a hooks bell - with the mascot standing behind the desk looking at it."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

DESK_X, DESK_W, DESK_Y = 171, 1450, 605
MS = 1.25
WW, WH = 984, 535
WX, WY = DESK_X + DESK_W - WW - 50, DESK_Y - WH
b += [window(WX, WY, WW, WH, "app", "settings.json")]

# the mascot stands at the free left portion of the same desk, looking across at the monitor
b += [mascot(DESK_X + 60, DESK_Y - 143 * MS, MS)]
b += [desk(DESK_X, DESK_Y, DESK_W, "Claude", body_h=161)]

col_w = WW / 4
CY = WY + 52 + (WH - 52) / 2 + 6

# 1: permissions -> a gate with allow (green, open) / deny (red, barred) sides
cx1 = WX + col_w * 0.5
gy = CY - 20
b += [f'<rect x="{cx1 - 100}" y="{gy - 70}" width="80" height="140" rx="10" fill="#eafaf0" stroke="{GREEN}" stroke-width="4"/>',
      f'<path d="M{cx1 - 80} {gy - 30}L{cx1 - 40} {gy - 30}M{cx1 - 80} {gy}L{cx1 - 40} {gy}M{cx1 - 80} {gy + 30}L{cx1 - 40} {gy + 30}" stroke="{GREEN}" stroke-width="7" stroke-linecap="round"/>',
      text(cx1 - 60, gy + 92, "allow", 24, 800, GREEN)]
b += [f'<rect x="{cx1 + 20}" y="{gy - 70}" width="80" height="140" rx="10" fill="#fdecec" stroke="{RED}" stroke-width="4"/>',
      f'<path d="M{cx1 + 32} {gy - 46}L{cx1 + 88} {gy + 46}M{cx1 + 88} {gy - 46}L{cx1 + 32} {gy + 46}" stroke="{RED}" stroke-width="7" stroke-linecap="round"/>',
      text(cx1 + 60, gy + 92, "deny", 24, 800, RED)]
b += [text(cx1, gy + 132, "permissions", 32, 900, INK), badge(cx1, gy - 96, 1)]

# 2: model -> a dial with a pointer
cx2 = WX + col_w * 1.5
dy = CY - 20
b += [f'<circle cx="{cx2}" cy="{dy}" r="82" fill="{PANEL}" stroke="{LINE2}" stroke-width="4"/>',
      f'<circle cx="{cx2}" cy="{dy}" r="82" fill="none" stroke="{ACCENT}" stroke-width="10" stroke-dasharray="190 430" stroke-linecap="round" transform="rotate(-210 {cx2} {dy})"/>',
      f'<line x1="{cx2}" y1="{dy}" x2="{cx2 + 58}" y2="{dy - 42}" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>',
      f'<circle cx="{cx2}" cy="{dy}" r="13" fill="{INK}"/>']
b += [text(cx2, dy + 132, "model", 32, 900, INK), badge(cx2, dy - 106, 2)]

# 3: env -> a labelled variable tag (a clear, readable stand-in - not an abstract glyph)
cx3 = WX + col_w * 2.5
tag_y = CY - 20
tw, th = 210, 68
b += [f'<path d="M{cx3 - tw / 2 + 20} {tag_y - th / 2}h{tw - 20}a10 10 0 0 1 10 10v{th - 20}a10 10 0 0 1 -10 10h-{tw - 20}l-30 -{th / 2 - 5}z" '
      f'fill="#fff" stroke="{ACCENT_DARK}" stroke-width="4"/>',
      f'<circle cx="{cx3 - tw / 2 + 34}" cy="{tag_y}" r="7" fill="{ACCENT_DARK}"/>',
      text(cx3 + 14, tag_y + 9, "KEY=값", 26, 800, ACCENT_DARK, family=MONO)]
b += [text(cx3, CY + 112, "env", 32, 900, INK)]

# 4: hooks -> a bell
cx4 = WX + col_w * 3.5
by = CY - 30
b += [f'<path d="M{cx4} {by - 78}a26 20 0 0 1 26 20v6a58 62 0 0 1 32 58h-116a58 62 0 0 1 32 -58v-6a26 20 0 0 1 26 -20z" fill="{MASCOT}"/>',
      f'<rect x="{cx4 - 68}" y="{by + 6}" width="136" height="16" rx="8" fill="{ACCENT_DARK}"/>',
      f'<circle cx="{cx4}" cy="{by + 46}" r="13" fill="{ACCENT_DARK}"/>']
b += [text(cx4, CY + 112, "hooks", 32, 900, INK)]

print(save("s3-settings-panel.svg", b, "3/11 주요 설정 항목 (tools/illus/s3_settings_panel.py)"))
