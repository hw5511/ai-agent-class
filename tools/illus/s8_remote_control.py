"""8/56 Remote Control = 내 컴퓨터 세션을 폰에서: the work stays on my computer (terminal /rc, cafe-landing),
claude.ai only relays the conversation, the phone continues the same session."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

# ---- (a) my computer: warm zone, mascot at the laptop, files stay here ----
b += [zone(30, 290, 620, 520, WARM_ZONE)]
b += [folder(70, 330, 120, "cafe-landing"), doc(232, 336, 50, -6), doc(292, 346, 50, 5), doc(352, 336, 50, -3)]
b += [mascot(60, 469), desk(40, 612, 600, "내 컴퓨터", body_h=130, label_size=28)]

LW = 250
term = (f'<rect x="0" y="0" width="{LW - 20}" height="{LW * 0.63 - 20:.0f}" rx="4" fill="#1e1f22"/>'
        f'<circle cx="14" cy="14" r="4" fill="#ff5f57"/><circle cx="28" cy="14" r="4" fill="#febc2e"/><circle cx="42" cy="14" r="4" fill="#28c840"/>'
        + text(18, 78, "/rc", 44, 700, "#7fe0a5", anchor="start", family=MONO))
LX, LY = 330, 448
b += [laptop(LX, LY, LW, term)]
b += [text(LX + LW / 2, LY - 18, "여기서 실행", 28, 800, MUTED), badge(LX + LW + 6, LY + 4, 1)]
b += [text(340, 680, "컴퓨터는 켜둔 채로", 26, 700, MUTED)]

# ---- (b) the relay: claude.ai cloud, paths both ways ----
CX, CY = 960, 470
b += [cloud(CX, CY, 0.85)]
b += [text(CX, CY + 22, "claude.ai", 44, 900, ACCENT_DARK), badge(CX + 190, CY - 150, 2)]
b += [path("M600 505C660 505 690 430 745 430")]            # computer -> cloud
b += [path("M1180 430C1240 430 1270 470 1330 478")]        # cloud -> phone
b += [path("M1330 600C1270 600 1240 545 1180 545")]        # phone -> cloud
b += [path("M745 545C690 545 660 585 600 585")]            # cloud -> computer
b += [text(CX, 700, "대화만 오감", 30, 800, MUTED)]
b += [text(CX, 742, "명령은 폰에서, 실행은 컴퓨터에서", 24, 600, MUTED)]

# ---- (c) the phone continues the same session ----
PX, PY, PW = 1440, 340, 220
mon = (f'<rect x="12" y="6" width="30" height="20" rx="3" fill="{INK}"/><rect x="21" y="27" width="12" height="4" fill="{INK}"/>'
       f'<circle cx="46" cy="8" r="8" fill="#fff"/><circle cx="46" cy="8" r="6" fill="{GREEN}"/>'
       + text(62, 24, "내 컴퓨터", 20, 800, INK, anchor="start"))
screen = (mon +
          f'<rect x="38" y="62" width="152" height="52" rx="14" fill="{ACCENT}"/>'
          + text(114, 96, "로고 바꿔줘", 22, 800, "#fff") +
          f'<rect x="12" y="136" width="170" height="100" rx="14" fill="#fff" stroke="{LINE}" stroke-width="2"/>'
          f'<rect x="28" y="154" width="120" height="9" rx="4" fill="{ACCENT_TINT}"/><rect x="28" y="174" width="90" height="9" rx="4" fill="{ACCENT_TINT}"/>'
          f'<rect x="28" y="194" width="106" height="9" rx="4" fill="{ACCENT_TINT}"/>'
          + check(158, 214, 14) +
          f'<rect x="38" y="256" width="152" height="46" rx="14" fill="{ACCENT}"/>'
          + text(114, 286, "배포도 해줘", 22, 800, "#fff") +
          f'<rect x="12" y="338" width="180" height="40" rx="20" fill="#fff" stroke="{LINE}" stroke-width="2"/>'
          f'<rect x="28" y="354" width="70" height="8" rx="4" fill="{PAPER_LINE}"/>')
b += [phone(PX, PY, PW, screen)]
b += [text(PX + PW / 2, PY - 22, "폰에서 이어서", 34, 900, INK), badge(PX + PW + 4, PY + 40, 3)]

print(save("s8-remote-control.svg", b, "8/56 Remote Control = 내 컴퓨터 세션을 폰에서 (tools/illus/s8_remote_control.py)"))
