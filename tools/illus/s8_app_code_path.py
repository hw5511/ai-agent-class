"""8/56 phone side: open Code in the Claude phone app (hamburger -> Code, the 2nd menu item under 프로젝트 -> my computer's session)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

PW, PH = 300, 600
PY = 125
SW, SH = PW - 16, PH - 40
XS = [186, 746, 1306]


def monitor(x, y, s=1.0):
    return (f'<g transform="translate({x} {y}) scale({s})">'
            f'<rect x="0" y="0" width="44" height="30" rx="4" fill="{INK}"/><rect x="15" y="31" width="14" height="5" fill="{INK}"/>'
            f'<rect x="8" y="36" width="28" height="4" rx="2" fill="{INK}"/>'
            f'<circle cx="48" cy="2" r="11" fill="#fff"/><circle cx="48" cy="2" r="8.5" fill="{GREEN}"/></g>')


def hamburger(x, y, w=34, color=INK):
    return "".join(f'<rect x="{x}" y="{y + i * 12}" width="{w}" height="6" rx="3" fill="{color}"/>' for i in range(3))


def bar(x, y, w, h=10, fill=PAPER_LINE, op=1):
    o = f' opacity="{op}"' if op != 1 else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h / 2}" fill="{fill}"{o}/>'


def main_screen():
    s = f'<rect x="0" y="0" width="{SW}" height="{SH}" rx="30" fill="{SCREEN}"/>'
    s += f'<circle cx="46" cy="46" r="36" fill="{ACCENT_ZONE}" stroke="{ACCENT}" stroke-width="5"/>' + hamburger(29, 33)
    s += bar(150, 40, 70, 12)
    s += f'<rect x="60" y="150" width="{SW - 80}" height="50" rx="16" fill="{ACCENT}"/>' + bar(78, 170, 90, 10, "#fff", 0.85)
    s += f'<rect x="14" y="224" width="{SW - 50}" height="110" rx="16" fill="#fff" stroke="{LINE}" stroke-width="2"/>'
    s += bar(30, 246, 140) + bar(30, 270, 170) + bar(30, 294, 120)
    s += f'<rect x="14" y="{SH - 70}" width="{SW - 28}" height="50" rx="25" fill="#fff" stroke="{LINE}" stroke-width="2.5"/>' + bar(36, SH - 50, 100)
    return s


def menu_screen():
    """Slide-out menu: 프로젝트 is the first item at the very top (plain), Code the second (highlighted)."""
    s = f'<rect x="0" y="0" width="{SW}" height="{SH}" rx="30" fill="{SCREEN}"/>'
    s += f'<rect x="0" y="0" width="{SW}" height="{SH}" rx="30" fill="#101113" opacity="0.25"/>'
    mw = 226
    s += f'<path d="M0 0H{mw}V{SH}H30A30 30 0 0 1 0 {SH - 30}Z" fill="#fff"/>'
    s += f'<rect x="{mw}" y="0" width="1.5" height="{SH}" fill="{LINE}"/>'
    s += text(30, 62, "프로젝트", 28, 700, INK2, anchor="start")
    s += (f'<rect x="10" y="94" width="{mw - 20}" height="58" rx="14" fill="{ACCENT_ZONE}" stroke="{ACCENT}" stroke-width="4"/>'
          + text(30, 132, "Code", 28, 800, INK, anchor="start"))
    for i, yy in enumerate((178, 238, 298, 358, 418)):
        s += bar(30, yy + 24, 120 - i * 10)
    return s


def code_screen():
    s = f'<rect x="0" y="0" width="{SW}" height="{SH}" rx="30" fill="{SCREEN}"/>'
    s += bar(18, 34, 100, 14)
    s += (f'<rect x="10" y="78" width="{SW - 20}" height="112" rx="16" fill="{ACCENT_ZONE}" stroke="{ACCENT}" stroke-width="4"/>'
          + monitor(28, 110, 1.0) + bar(100, 112, 110, 10, "#8a929b") + bar(100, 138, 76, 9, LINE2))
    for i, yy in enumerate((206, 306, 406)):
        s += (f'<rect x="10" y="{yy}" width="{SW - 20}" height="84" rx="16" fill="#fff" stroke="{LINE}" stroke-width="2"/>'
              f'<rect x="28" y="{yy + 26}" width="46" height="32" rx="6" fill="{PAPER_LINE}"/>'
              + bar(100, yy + 24, 110 - i * 16) + bar(100, yy + 48, 70 + i * 10, 9, "#e4e6e9"))
    return s


screens = [main_screen(), menu_screen(), code_screen()]
labels = ["왼쪽 위 햄버거 메뉴", "위에서 두 번째 Code", "내 컴퓨터 세션"]

b = [panel()]
for i, (x, scr, lab) in enumerate(zip(XS, screens, labels)):
    b += [phone(x, PY, PW, scr), text(x + PW / 2, 775, lab, 38, 900, INK)]
    if i < 2:
        b += [badge(x + PW - 6, PY + 6, i + 1)]
        b += [path(f"M{x + PW + 26} {PY + PH // 2}C{x + PW + 70} {PY + PH // 2} {x + PW + 120} {PY + PH // 2} {XS[i + 1] - 38} {PY + PH // 2}")]

print(save("s8-app-code-path.svg", b, "8/56 phone side: open Code in the Claude app (tools/illus/s8_app_code_path.py)"))
