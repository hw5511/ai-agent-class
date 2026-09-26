"""8/4 GitHub = 클라우드 공유폴더: my laptop uploads agent1 into the GitHub cloud folder, another laptop downloads it."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), cloud(896, 285, 1.15)]
b += [gh_mark(804, 118, 50), text(866, 160, "GitHub", 44, 900, anchor="start"),
      folder(796, 192, 200, "agent1"), text(896, 446, "구글 드라이브처럼", 28, 600, MUTED)]
for mx, lx, dx, name in [(92, 360, 70, "내 컴퓨터"), (1460, 1236, 1222, "다른 컴퓨터")]:
    b += [mascot(mx, 432), laptop(lx, 452, 196, folder(48, 14, 80) + text(88, 96, "agent1", 17, 700, family=MONO)),
          desk(dx, 574, 500, name)]
b += [path("M462 440C466 350 520 300 598 300"),
      text(436, 296, "올리기", 36, 900, ACCENT, anchor="end"), badge(304, 284, 1)]
b += [path("M1194 300C1272 300 1326 350 1330 440"),
      text(1372, 296, "내려받기", 36, 900, ACCENT, anchor="start"), badge(1540, 284, 3)]
b += [badge(1150, 128, 2)]
print(save("s8-gh-shared-folder.svg", b, "8/4 GitHub = 클라우드 공유폴더 (tools/illus/s8_gh_shared_folder.py)"))
