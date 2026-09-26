"""2/65 터미널 명령어 실행 도구: the mascot sits at its desk below a terminal window where bash commands
are typed; four solid arrows leave the terminal to four concrete results - files copied, a package
installed, a program launched, and the system checked - each drawn full and labelled in Korean."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# center: the mascot behind its desk, a terminal window above it like a monitor on the desk
DESK_X, DESK_Y, DESK_W = 736, 650, 320
ms = 1.05
mascot_w = 240 * ms
mascot_x = DESK_X + DESK_W / 2 - mascot_w / 2
mascot_y = DESK_Y - 143 * ms
b += [mascot(mascot_x, mascot_y, ms), desk(DESK_X, DESK_Y, DESK_W, "내 컴퓨터", body_h=140)]

TX, TY, TW, TH = 706, 260, 380, 230
term_body = (f'<text x="14" y="26" font-size="19" font-weight="700" fill="{GREEN}" font-family="{MONO}">$ cp report.pdf 백업/</text>'
             f'<text x="14" y="60" font-size="19" font-weight="700" fill="{GREEN}" font-family="{MONO}">$ pip install pandas</text>'
             f'<text x="14" y="94" font-size="19" font-weight="700" fill="{GREEN}" font-family="{MONO}">$ python app.py</text>'
             f'<text x="14" y="128" font-size="19" font-weight="700" fill="{GREEN}" font-family="{MONO}">$ df -h</text>')
b += [window(TX, TY, TW, TH, "terminal", "bash", term_body), badge(TX + TW / 2, TY - 24, 1)]

TL, TR, BL, BR = (TX, TY), (TX + TW, TY), (TX, TY + TH), (TX + TW, TY + TH)

# FILE - top-left: a file is copied from one folder to another
FX, FY = 150, 130
b += [folder(FX, FY, 130), folder(FX + 150, FY + 40, 130, "복사")]
b += [path(f"M{FX + 130} {FY + 60}C{FX + 160} {FY + 20} {FX + 175} {FY + 20} {FX + 190} {FY + 44}", ACCENT, arrow=True, width=4)]
b += [text(FX + 150, FY - 50, "파일 복사", 34, 900, ACCENT), text(FX + 150, FY - 18, "copy", 18, 700, MUTED)]
b += [path(f"M{TL[0] - 6} {TL[1] + 10}C{FX + 420} {TY - 40} {FX + 340} {FY + 90} {FX + 300} {FY + 70}", ACCENT)]

# RUN - top-right: an app window opens with real content, not an empty box
RX, RY, RW, RH = 1300, 108, 350, 214
run_body = (f'<rect x="16" y="14" width="220" height="26" rx="13" fill="{ACCENT_TINT}"/>'
            f'<rect x="16" y="52" width="280" height="26" rx="13" fill="{PANEL}" stroke="{LINE}" stroke-width="2"/>'
            f'<rect x="16" y="90" width="160" height="26" rx="13" fill="{ACCENT_TINT}"/>')
b += [window(RX, RY, RW, RH, "app", "카카오톡", run_body)]
b += [text(RX + RW / 2, RY - 34, "앱 실행", 34, 900, ACCENT), text(RX + RW / 2, RY - 6, "run", 18, 700, MUTED)]
b += [path(f"M{TR[0] + 6} {TR[1] + 10}C{RX - 160} {TY - 40} {RX - 120} {RY + 90} {RX - 10} {RY + 70}", ACCENT)]

# INSTALL - bottom-left: a package box with flaps and a sticker label, being installed
IX, IY, IW, IH = 150, 590, 190, 150
b += [f'<rect x="{IX}" y="{IY}" width="{IW}" height="{IH}" rx="14" fill="{DESK}" stroke="{LINE2}" stroke-width="3"/>',
      f'<path d="M{IX} {IY + 34}L{IX + IW / 2} {IY + 10}L{IX + IW} {IY + 34}" fill="none" stroke="{LINE2}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      f'<line x1="{IX + IW / 2}" y1="{IY + 10}" x2="{IX + IW / 2}" y2="{IY + IH}" stroke="{LINE2}" stroke-width="3"/>',
      f'<rect x="{IX + IW / 2 - 34}" y="{IY + 64}" width="68" height="48" rx="8" fill="{ACCENT_TINT}" stroke="{ACCENT}" stroke-width="3"/>',
      f'<rect x="{IX + IW / 2 - 24}" y="{IY + 78}" width="48" height="6" rx="3" fill="{ACCENT}"/>',
      f'<rect x="{IX + IW / 2 - 24}" y="{IY + 92}" width="30" height="6" rx="3" fill="{ACCENT_MID}"/>']
b += [text(IX + IW / 2, IY - 100, "설치", 34, 900, ACCENT), text(IX + IW / 2, IY - 70, "install", 18, 700, MUTED)]
b += [path(f"M{BL[0] - 6} {BL[1] - 10}C{IX + 410} {BL[1] + 90} {IX + 340} {IY - 30} {IX + IW / 2} {IY + 30}", ACCENT)]

# CHECK - bottom-right: a gauge reports system status, with a plain "정상" reading
GX, GY, GR = 1500, 720, 90
b += [f'<path d="M{GX - GR} {GY}A{GR} {GR} 0 0 1 {GX + GR} {GY}" fill="none" stroke="{LINE}" stroke-width="16" stroke-linecap="round"/>',
      f'<path d="M{GX - GR} {GY}A{GR} {GR} 0 0 1 {GX + 20} {GY - GR + 10}" fill="none" stroke="{GREEN}" stroke-width="16" stroke-linecap="round"/>',
      f'<circle cx="{GX}" cy="{GY}" r="10" fill="{INK2}"/>',
      f'<path d="M{GX} {GY}L{GX + 40} {GY - 60}" stroke="{INK2}" stroke-width="7" stroke-linecap="round"/>',
      text(GX, GY + 34, "정상", 26, 900, GREEN)]
b += [text(GX, GY - GR - 46, "상태 확인", 34, 900, ACCENT), text(GX, GY - GR - 18, "check", 18, 700, MUTED)]
b += [path(f"M{BR[0] + 6} {BR[1] - 10}C{GX - 400} {BR[1] + 90} {GX - 260} {GY - GR - 60} {GX - 40} {GY - GR + 6}", ACCENT)]

print(save("s2-bash-terminal.svg", b, "2/65 터미널 명령어 실행 도구 (tools/illus/s2_bash_terminal.py)"))
