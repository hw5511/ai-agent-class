"""3/38 haiku -> sonnet -> opus -> fable: four workers lined up on a spectrum track, fast/cheap on the
left climbing to smart/expensive on the right, with a speed bar above and a thinking-depth bar below."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

models = ["Haiku", "Sonnet", "Opus", "Fable"]
N = len(models)
X0, X1 = 260, 1560
xs = [X0 + i * (X1 - X0) / (N - 1) for i in range(N)]

TOP_Y, BOT_Y = 96, 156
b += [f'<rect x="{X0 - 40}" y="{TOP_Y}" width="{X1 - X0 + 80}" height="16" rx="8" fill="{ACCENT_TINT}"/>',
      f'<rect x="{X0 - 40}" y="{TOP_Y}" width="{(X1 - X0 + 80) * 0.28}" height="16" rx="8" fill="{ACCENT}"/>']
b += [text(X0 - 70, TOP_Y + 12, "속도", 30, 900, INK, anchor="end"), badge(X0 - 70, TOP_Y - 36, 1)]
b += [text(X1 + 70, TOP_Y + 12, "느림", 26, 700, MUTED, anchor="start")]

b += [f'<rect x="{X0 - 40}" y="{BOT_Y}" width="{X1 - X0 + 80}" height="16" rx="8" fill="{ACCENT_TINT}"/>',
      f'<rect x="{X0 - 40 + (X1 - X0 + 80) * 0.72}" y="{BOT_Y}" width="{(X1 - X0 + 80) * 0.28}" height="16" rx="8" fill="{MASCOT}"/>']
b += [text(X0 - 70, BOT_Y + 12, "생각", 30, 900, INK, anchor="end")]
b += [text(X1 + 70, BOT_Y + 12, "깊음", 26, 700, MUTED, anchor="start"), badge(X1 + 70, BOT_Y + 52, 2)]

TRACK_Y = 245
b += [f'<rect x="{X0 - 60}" y="{TRACK_Y}" width="{X1 - X0 + 120}" height="14" rx="7" fill="{LINE}"/>']

DESK_Y = 480
MS = 1.05
BODY_H = 175
usage_tags = ["빠르고 저렴", "빠름 ↔ 똑똑함", "똑똑함 ↔ 빠름", "더 똑똑함", "사용량 큼"]
for i, (mx, name) in enumerate(zip(xs, models)):
    highlight = i == N - 1
    b += [f'<line x1="{mx}" y1="{BOT_Y + 16}" x2="{mx}" y2="{TRACK_Y}" stroke="{LINE2}" stroke-width="4" stroke-dasharray="3 10"/>']
    dot_fill = MASCOT if highlight else ACCENT
    b += [f'<circle cx="{mx}" cy="{TRACK_Y - 7}" r="14" fill="{dot_fill}"/>']
    b += [mascot(mx - 240 * MS / 2, DESK_Y - 143 * MS, MS)]
    b += [desk(mx - 150, DESK_Y, 300, name, body_h=BODY_H)]
    if highlight:
        # the highlighted model gets a coloured desk-top frame instead of recolouring the mascot itself
        b += [f'<rect x="{mx - 150}" y="{DESK_Y}" width="300" height="26" rx="10" fill="none" stroke="{MASCOT}" stroke-width="5"/>']
    # the usage line sits inside the desk body, right under the nameplate - never below the desk
    tag = usage_tags[3] + " · " + usage_tags[4] if i == N - 1 else usage_tags[i]
    b += [text(mx, DESK_Y + 24 + 146, tag, 21, 700, MUTED)]

print(save("s3-model-lineup.svg", b, "3/38 haiku -> sonnet -> opus -> fable (tools/illus/s3_model_lineup.py)"))
