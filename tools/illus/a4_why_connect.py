"""A4: an API document and key become a CLI skill; a website uses the same API.

For a classroom monitor: Claude works at a real desk on the left, one server
rack sits between two clients, and blue requests / green answers connect both.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *


def api_key(bx, by, s=1.0):
    """The same physical API key used in a4_key_names.py."""
    return (
        f'<g transform="translate({bx} {by}) scale({s})" filter="url(#shs)">'
        f'<path d="M-70 0a70 70 0 1 0 140 0a70 70 0 1 0 -140 0zM-27 0a27 27 0 1 1 54 0a27 27 0 1 1 -54 0z" fill="{ACCENT}" fill-rule="evenodd"/>'
        f'<rect x="58" y="-27" width="38" height="54" rx="10" fill="{ACCENT}"/>'
        f'<rect x="90" y="-16" width="380" height="32" rx="10" fill="{ACCENT}"/>'
        f'<path d="M340 10H470v26h-14v22h-26v-14h-22v30h-28v-20h-20v12h-20z" fill="{ACCENT}" stroke="{ACCENT}" stroke-width="6" stroke-linejoin="round"/>'
        '<rect x="104" y="-6" width="220" height="5" rx="2.5" fill="#fff" opacity="0.35"/></g>'
    )


def rack(x, y, w, h):
    """Server silhouette and eight lit bays match the key-names illustration."""
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{INK2}" filter="url(#sh)"/>']
    step = (h - 56) / 8
    for i in range(8):
        yy = y + 28 + i * step
        out += [f'<rect x="{x + 24}" y="{yy}" width="{w - 48}" height="{step - 14}" rx="6" fill="#2f333a"/>',
                f'<circle cx="{x + w - 45}" cy="{yy + (step - 14) / 2}" r="7" fill="{GREEN}"/>',
                f'<rect x="{x + 42}" y="{yy + (step - 14) / 2 - 3}" width="{w * 0.36}" height="6" rx="3" fill="#43474e"/>']
    return "".join(out)


def skill_folder(x, y):
    """An open paper folder: a visible skill card, a tab and a front cover."""
    return (
        f'<path d="M{x} {y + 18}q0-14 14-14h70l24 24h128q14 0 14 14v174H{x}z" fill="#fff" stroke="{ACCENT_DARK}" stroke-width="3"/>'
        f'<rect x="{x + 24}" y="{y - 38}" width="202" height="200" rx="7" fill="#fff" stroke="{LINE2}" stroke-width="2.5"/>'
        + text(x + 125, y + 7, "SKILL.md", 27, 800, family=MONO)
        + f'<path d="M{x + 48} {y + 34}h130m-130 19h104" stroke="{PAPER_LINE}" stroke-width="5" stroke-linecap="round"/>'
        + f'<path d="M{x - 6} {y + 88}q-2-12 12-12h238q14 0 12 14l-12 112q-1 14-15 14H{x + 20}q-14 0-15-14z" fill="#fff" stroke="{ACCENT}" stroke-width="3" filter="url(#shs)"/>'
        + text(x + 125, y + 162, ".claude/skills", 27, 800, ACCENT_DARK, family=MONO)
    )


def main():
    b = ['<rect width="1792" height="840" fill="#fff"/>']

    # Physical work surfaces and the API server shared by both clients.
    b += [desk(65, 640, 655, "Claude", body_h=126, label_size=30),
          desk(1240, 640, 510, "내 프로그램", body_h=126, label_size=30),
          rack(830, 235, 245, 490),
          text(952, 202, "API 서버", 36, 900)]

    # Source material enters Claude's local work: a readable API document + key.
    b += [doc(92, 173, 160, accent=ACCENT, shadow=False),
          '<rect x="113" y="249" width="110" height="37" fill="#fff"/>',
          text(170, 276, "API 문서", 26, 800),
          api_key(315, 277, 0.34),
          path("M240 357C302 377 328 434 361 493", ACCENT, arrow=False),
          arrow_head_at(328, 434, 361, 493, 22, ACCENT)]

    b += [mascot(105, 477, 1.08)]
    screen = (text(85, 43, ">_", 32, 800, ACCENT, family=MONO)
              + text(85, 82, "CLI", 28, 800, family=MONO))
    b += [laptop(292, 526, 180, screen),
          skill_folder(460, 424), badge(460, 383, 1)]

    # Each client has its own outgoing request and returning answer.
    # The two directions stay apart; each head meets the corresponding object.
    b += [path("M716 466C741 340 778 330 821 365", ACCENT, arrow=False),
          arrow_head_at(778, 330, 821, 365, 22, ACCENT),
          path("M822 547C774 584 749 584 716 567", GREEN, arrow=False),
          arrow_head_at(749, 584, 716, 567, 22, GREEN),
          path("M1250 397C1192 312 1136 313 1084 365", ACCENT, arrow=False),
          arrow_head_at(1136, 313, 1084, 365, 22, ACCENT),
          path("M1084 547C1137 593 1191 593 1250 551", GREEN, arrow=False),
          arrow_head_at(1191, 593, 1250, 551, 22, GREEN)]

    # A student-built browser page: one business-number input and its result.
    page = (
        text(30, 51, "사업자번호", 29, 800, anchor="start")
        + f'<rect x="30" y="73" width="282" height="61" rx="7" fill="#fff" stroke="{LINE2}" stroke-width="2"/>'
        + text(45, 113, "123-45-67890", 26, 600, MUTED, anchor="start", family=MONO)
        + f'<rect x="328" y="73" width="112" height="61" rx="7" fill="#fff" stroke="{ACCENT}" stroke-width="3"/>'
        + text(384, 113, "조회", 28, 800, ACCENT)
        + f'<rect x="30" y="172" width="410" height="112" rx="9" fill="#fff" stroke="{LINE2}" stroke-width="2"/>'
        + text(54, 210, "조회 결과", 26, 700, MUTED, anchor="start")
        + text(54, 258, "계속사업자", 30, 800, anchor="start")
        + check(396, 239, 23)
    )
    b += [window(1260, 270, 470, 370, "browser", body=page),
          text(1376, 305, "내 웹사이트", 26, 700, MUTED, anchor="start"),
          badge(1724, 262, 2)]

    print(save("a4-why-connect.svg", b,
               "A4: Claude CLI skill and a student-built website share one API server"))


if __name__ == "__main__":
    main()
