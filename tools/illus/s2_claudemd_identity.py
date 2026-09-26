"""2/17 이름·역할·말투·규칙 네 가지: the CLAUDE.md sheet above the mascot's desk is the single source that
fans out to a name tag, a role badge, a speech bubble in the chosen tone, and a "하지 말 것" sign."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# center: CLAUDE.md pinned above the mascot's desk
DOC_X, DOC_Y, DOC_W = 826, 96, 140
b += [doc(DOC_X, DOC_Y, DOC_W, 0, accent=ACCENT), text(DOC_X + DOC_W / 2 - 30, DOC_Y - 20, "CLAUDE.md", 32, 900)]
DOC_CX, DOC_BOT = DOC_X + DOC_W / 2, DOC_Y + DOC_W * 1.25

DESK_X, DESK_Y, DESK_W = 746, 606, 300
mascot_s = 1.2
mascot_w = 240 * mascot_s
b += [mascot(DESK_X + DESK_W / 2 - mascot_w / 2, DESK_Y - 143 * mascot_s, mascot_s), desk(DESK_X, DESK_Y, DESK_W, "'ㅇㅇ'", body_h=170)]
b += [badge(DOC_X + DOC_W + 44, DOC_Y - 30, "!")]


def _card(x, y, w, h, title, body, fill="#fff", border=LINE2):
    return [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{fill}" stroke="{border}" stroke-width="3" filter="url(#shs)"/>',
            text(x + w / 2, y + 44, title, 28, 900, ACCENT),
            text(x + w / 2, y + 86, body, 30, 800, INK)]


# top-left: 이름 - a name tag; its arrow converges onto CLAUDE.md above the mascot's desk
NX, NY, NW, NH = 150, 120, 330, 130
b += _card(NX, NY, NW, NH, "이름", "'ㅇㅇ'")
b += [path(f"M{NX + NW + 10} {NY + 50}C{NX + NW + 40} {NY + 40} {NX + NW + 120} {DOC_Y + 20} {DOC_X + 10} {DOC_Y + 60}")]

# top-right: 역할 - a role badge/shield; its arrow converges onto CLAUDE.md too
RX, RY, RW, RH = 1310, 120, 330, 130
b += _card(RX, RY, RW, RH, "역할", "수업 도우미")
b += [path(f"M{RX - 10} {RY + 50}C{RX - 40} {RY + 40} {RX - 120} {DOC_Y + 20} {DOC_X + DOC_W - 10} {DOC_Y + 60}")]

# bottom-left: 말투 - a speech bubble showing the chosen tone
BX, BY, BW, BH = 150, 560, 340, 140
b += [f'<path d="M{BX} {BY + 30}a30 30 0 0 1 30 -30h{BW - 60}a30 30 0 0 1 30 30v50a30 30 0 0 1 -30 30h-{BW - 100}'
      f'l-30 34v-34h-10a30 30 0 0 1 -30 -30z" fill="#fff" stroke="{LINE2}" stroke-width="3" filter="url(#shs)"/>',
      text(BX + BW / 2 - 10, BY + 40, "말투", 28, 900, ACCENT),
      text(BX + BW / 2 - 10, BY + 84, "'~요' → '~용용'", 30, 800, INK)]
b += [path(f"M{BX + BW + 10} {BY + 60}C{BX + BW + 60} {BY + 40} {BX + BW + 120} {DESK_Y - 40} {DOC_X + 20} {DOC_Y + DOC_W * 1.25 - 20}")]

# bottom-right: 하지 말 것 - a red-bordered warning sign
WX, WY, WW, WH = 1300, 560, 340, 140
b += [f'<rect x="{WX}" y="{WY}" width="{WW}" height="{WH}" rx="16" fill="#fff" stroke="{RED}" stroke-width="4" filter="url(#shs)"/>',
      cross(WX + 44, WY + WH / 2, 24),
      text(WX + WW / 2 + 20, WY + 52, "하지 말 것", 28, 900, RED),
      text(WX + WW / 2 + 20, WY + 96, "모르면 되묻기", 28, 800, INK)]
b += [path(f"M{WX - 10} {WY + 60}C{WX - 60} {WY + 40} {WX - 120} {DESK_Y - 40} {DOC_X + DOC_W - 20} {DOC_Y + DOC_W * 1.25 - 20}")]

print(save("s2-claudemd-identity.svg", b, "2/17 이름·역할·말투·규칙 네 가지 (tools/illus/s2_claudemd_identity.py)"))
