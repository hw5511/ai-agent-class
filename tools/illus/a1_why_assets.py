"""A1/9 스킬 assets 에 템플릿 추가: the mascot carries a company template document into the skill
folder's assets subfolder, so it becomes part of what Claude can load next time."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel(), zone(60, 90, 1672, 660, WARM_ZONE)]

b += [mascot(220, 460)]
b += [doc(460, 400, 100, -6, ACCENT)]
b += [text(510, 545, "사내 양식", 26, 800, INK)]
b += [badge(430, 380, 1)]

b += [path("M580 460C700 460 780 480 890 500")]

# skill folder (top) with its assets subfolder (bottom), generous vertical gap between labels
folder_x, folder_w = 940, 220
b += [folder(folder_x, 340, folder_w, "스킬")]

assets_y, assets_h = 645, 130
b += [f'<rect x="{folder_x}" y="{assets_y}" width="{folder_w}" height="{assets_h}" rx="12" fill="{PANEL}" stroke="{LINE2}" stroke-width="3"/>']
b += [text(folder_x + folder_w / 2, assets_y - 22, "assets", 24, 800, MUTED, family=MONO)]
b += [doc(folder_x + 30, assets_y + 30, 70, -4, ACCENT), doc(folder_x + 70, assets_y + 50, 70, 4, ACCENT_DARK)]
b += [badge(folder_x, assets_y, 2)]

edge_x = folder_x + folder_w - 26
b += [path(f"M{edge_x} 470C{edge_x + 40} 520 {edge_x + 40} 560 {edge_x} 612")]

print(save("a1-why-assets.svg", b, "A1/9 스킬 assets 에 템플릿 추가 (tools/illus/a1_why_assets.py)"))
