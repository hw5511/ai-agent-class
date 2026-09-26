"""8/7 GitHub 용어 4개: 레포 / 커밋 / 푸시 / 클론 - four scenes left to right, each showing the action."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

ZONE_W, ZONE_GAP, ZONE_X0, ZONE_Y, ZONE_H = 395, 30, 60, 90, 690
ZONE_XS = [ZONE_X0 + i * (ZONE_W + ZONE_GAP) for i in range(4)]
BIG_Y, ENG_Y = 722, 758
MS = 0.8  # same mascot scale in every scene
MW, MH = 240 * MS, 143 * MS
FOOT = 560  # shared baseline: mascot feet AND desk top surface, in every zone
DESK_W = 165
DESK_BODY_H = 78
GAP = 14


def _actor_desk(zx, plate=None):
    """Mascot BEHIND a wide desk (like the 8/4 pilot): mascot on the left, an object slot DESK_W wide on the right
    of the desk top. Returns the slot's x as dx so scenes centre their object in it. Optional desk-front plate text."""
    dw = 330
    ddx = zx + (ZONE_W - dw) / 2
    mx, my = ddx + 4, FOOT - MH + 6
    out = [mascot(mx, my, MS), desk(ddx, FOOT, dw, None, body_h=DESK_BODY_H)]
    if plate:
        out.append(text(zx + ZONE_W / 2, FOOT + 72, plate, 22, 800, INK, family=MONO))
    return out, mx, my, ddx + dw - DESK_W - 4


def scene_repo(zx):
    """Mascot beside a desk; the 'cafe-landing' folder sits on the desk top, papers fanned up out of it."""
    out, mx, my, dx = _actor_desk(zx, "cafe-landing")
    fw = 132
    fh = fw * 0.775
    fx = dx + (DESK_W - fw) / 2
    fy = FOOT - fh
    cx = fx + fw / 2
    # a fan of overflowing paper sheets sticking up out of the folder mouth (no file-name tags - would collide)
    out += [doc(cx - 50, fy - 18, 34, -16), doc(cx - 16, fy - 50, 38, -6),
            doc(cx + 16, fy - 72, 40, 4), doc(cx + 46, fy - 40, 34, 14)]
    out += [folder(fx, fy, fw)]
    out.append(badge(fx + fw - 18, fy - 78, 1))
    return out


def scene_commit(zx):
    """Mascot beside the desk; a rubber stamp presses onto the folder on the desk top, a memo card pops up."""
    out, mx, my, dx = _actor_desk(zx, "cafe-landing")
    fw = 132
    fh = fw * 0.775
    fx = dx + (DESK_W - fw) / 2
    fy = FOOT - fh
    scx = fx + fw / 2
    out.append(folder(fx, fy, fw))
    base_y = fy - 46  # stamp base overlaps the folder's top edge
    out += [f'<rect x="{scx - 17}" y="{base_y - 34}" width="34" height="38" rx="7" fill="{ACCENT}"/>',
            f'<rect x="{scx - 48}" y="{base_y}" width="96" height="52" rx="12" fill="{INK2}" filter="url(#shs)"/>',
            f'<circle cx="{scx}" cy="{base_y + 26}" r="15" fill="{ACCENT}"/>',
            f'<circle cx="{scx}" cy="{base_y + 26}" r="7" fill="#fff"/>']
    card_w, card_h = 210, 90
    card_x = zx + (ZONE_W - card_w) / 2
    card_y = 150
    out += [path(f"M{scx - 4} {base_y - 36}C{scx - 56} {base_y - 78} {card_x + card_w - 40} {card_y + card_h + 10} {card_x + card_w - 40} {card_y + card_h}", color=GREEN)]
    out += [f'<rect x="{card_x}" y="{card_y}" width="{card_w}" height="{card_h}" rx="14" fill="#fff" stroke="{LINE}" stroke-width="2" filter="url(#shs)"/>',
            text(card_x + 22, card_y + 34, "커밋 메모", 17, 700, MUTED, anchor="start"),
            text(card_x + 22, card_y + 68, "메뉴 추가", 25, 800, INK, anchor="start", family=MONO)]
    out.append(check(card_x + card_w - 18, card_y + 18, 18))
    out.append(badge(scx - 60, base_y - 4, 2))
    return out


def scene_push(zx):
    """Mascot + desk with the folder on the desk top; the folder travels up a dotted path to the cloud
    (small copy mid-path = moving), an explicit arrowhead polygon lands on the cloud."""
    out, mx, my, dx = _actor_desk(zx, "cafe-landing")
    cx = zx + ZONE_W / 2
    fw = 128
    fh = fw * 0.775
    fx = dx + (DESK_W - fw) / 2
    fy = FOOT - fh
    out.append(folder(fx, fy, fw))
    ccx = zx + ZONE_W / 2 + 30
    out += [cloud(ccx, 178, 0.42, fill="#fff"), gh_mark(ccx - 88, 128, 36),
            text(ccx - 42, 154, "GitHub", 27, 900, anchor="start")]
    start_x, start_y = fx + fw / 2, fy - 4
    end_x, end_y = ccx, 268
    ctrl_x = (start_x + end_x) / 2
    c2_x, c2_y = ctrl_x, (start_y + end_y) / 2 - 30
    out.append(path(f"M{start_x} {start_y}C{ctrl_x} {(start_y + end_y) / 2 + 30} {c2_x} {c2_y} {end_x} {end_y}", width=4, arrow=False))
    mid_x, mid_y = (start_x + end_x) / 2, (start_y + end_y) / 2 - 10
    out.append(folder(mid_x - 26, mid_y - 20, 52))
    out.append(arrow_head_at(c2_x, c2_y, end_x, end_y, 16))
    out.append(badge(ccx + 104, 144, 3))
    return out


def scene_clone(zx):
    """Same cloud at the top; a copy of the folder travels down a dotted path with an explicit arrowhead
    into the laptop on the desk top; mascot beside it."""
    out, mx, my, dx = _actor_desk(zx)
    ccx = zx + ZONE_W / 2 + 30
    out += [cloud(ccx, 178, 0.42, fill="#fff"), gh_mark(ccx - 88, 128, 36),
            text(ccx - 42, 154, "GitHub", 27, 900, anchor="start")]
    lw = DESK_W - 10
    lh = lw * 0.63
    lx = dx + (DESK_W - lw) / 2
    ly = FOOT - lh
    screen = folder(lw / 2 - 26, 10, 52)
    out.append(laptop(lx, ly, lw, screen))
    start_x, start_y = ccx, 268
    end_x, end_y = lx + lw / 2, ly - 6
    ctrl_x = (start_x + end_x) / 2
    c2_x, c2_y = ctrl_x, (start_y + end_y) / 2 + 30
    out.append(path(f"M{start_x} {start_y}C{ctrl_x} {(start_y + end_y) / 2 - 30} {c2_x} {c2_y} {end_x} {end_y}", width=4, arrow=False))
    mid_x, mid_y = (start_x + end_x) / 2, (start_y + end_y) / 2 + 6
    out.append(folder(mid_x - 24, mid_y - 18, 48))
    out.append(arrow_head_at(c2_x, c2_y, end_x, end_y, 16))
    out.append(badge(ccx + 104, 144, 4))
    return out


b = [panel()]
for zx in ZONE_XS:
    b.append(zone(zx, ZONE_Y, ZONE_W, ZONE_H))

scenes = [(scene_repo, "레포", "Repository"), (scene_commit, "커밋", "Commit"),
          (scene_push, "푸시", "Push"), (scene_clone, "클론", "Clone")]
for (fn, kor, eng), zx in zip(scenes, ZONE_XS):
    cx = zx + ZONE_W / 2
    b += fn(zx)
    b.append(text(cx, BIG_Y, kor, 44, 900))
    b.append(text(cx, ENG_Y, eng, 24, 600, MUTED))

print(save("s8-gh-terms.svg", b, "8/7 GitHub 용어 4개 (tools/illus/s8_gh_terms.py)"))
