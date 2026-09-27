"""A2-playwright/8 Playwright MCP vs Claude in Chrome: the mascot sits above both paths into a browser -
the left path opens inside the student's own everyday, signed-in Chrome via the Claude in Chrome
extension (own logins, a Claude tab group); the right path opens a brand-new Chrome window from its own
profile folder (.playwright-profile), which later Playwright-library scripts also reuse (that reuse fact
lives in note 2's body, not a third badge - the deck caps illustrations at 4 notes and two are spent on
the claims.md aside below). Owner 2026-09-26 rule: real brand marks (claude, googlechrome), no drawn
stand-ins.

2026-09-27 third review fix: the second pass's swooping arrows from the mascot crossed straight through
its own caption text, and the "!" badge sat on top of badge 1, and the profile folder overlapped the
left window. This pass drops the crossing arrows entirely (the mascot reads as the shared actor without
needing to visibly touch both windows), widens the middle gap so the folder has its own clear spot in
it, and keeps every badge at least one full badge-width from the next element. The folder no longer
carries its own numbered badge, freeing a note slot for the claims.md aside to split into two.

2026-09-27 second review fix: the first fix (below) kept the access-identity facts off "Claude in
Chrome" but the two windows stayed small (520/460 wide) with a wide empty gap between them and tiny
labels - the reviewer called it "작고 휑하다". Windows are now much bigger and every label larger.

2026-09-27 first review fix: the old copy pinned the access-identity facts (웹검색·웹페치 announces itself
as Claude, naver robots.txt blocks AI crawlers) on "Claude in Chrome", which is wrong - Claude in Chrome
IS the student's own everyday Chrome + extension. Those identity facts live only in the "!" notes now."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

CX = 896

# ---- shared mascot up top - the same actor behind both windows, no crossing arrows ----
M_S = 0.8
m_w, m_h = 240 * M_S, 143 * M_S
m_x, m_y = CX - m_w / 2, 300
b += [mascot(m_x, m_y, M_S)]
b += [text(CX, m_y + m_h + 40, "둘 다 Claude 가 브라우저를 조작", 30, 800, INK)]

TITLE_Y = 510
WIN_Y = 532
WIN_H = 200
GAP = 260
WIN_W = 620
LWIN_X = (1792 - (WIN_W * 2 + GAP)) / 2
RWIN_X = LWIN_X + WIN_W + GAP

# ---- left: Claude in Chrome - the student's own everyday, signed-in Chrome ----
lcx = LWIN_X + WIN_W / 2
b += [text(lcx, TITLE_Y, "Claude in Chrome", 36, 900, INK)]

tabs_body = (f'<rect x="0" y="0" width="168" height="36" rx="9" fill="{ACCENT_TINT}"/>'
             + brand_icon("claude", 12, 6, 24)
             + text(102, 24, "Claude", 19, 800, ACCENT_DARK, anchor="middle")
             + f'<rect x="180" y="0" width="140" height="36" rx="9" fill="{PANEL}"/>'
             + text(250, 24, "내 탭", 18, 600, MUTED, anchor="middle")
             + f'<rect x="0" y="52" width="380" height="18" rx="8" fill="{PAPER_LINE}"/>'
             + f'<rect x="0" y="82" width="260" height="18" rx="8" fill="{PAPER_LINE}"/>')
b += [window(LWIN_X, WIN_Y, WIN_W, WIN_H, "browser", "chrome (내 계정)", tabs_body)]
b += [badge(LWIN_X + WIN_W - 10, WIN_Y - 10, 1)]
b += [text(lcx, WIN_Y + WIN_H + 40, "내 크롬 확장 · 내 로그인 그대로", 27, 700, MUTED)]

# ---- middle of the gap: the profile folder (badge 3) feeding the right window, and the "!" aside ----
FOL_W = 108
fol_x = LWIN_X + WIN_W + (GAP - FOL_W) / 2
fol_y = WIN_Y + (WIN_H - FOL_W * 0.775) / 2
b += [folder(fol_x, fol_y, FOL_W, ".playwright-profile", label_color=MUTED)]
b += [path(f"M{fol_x + FOL_W} {fol_y + FOL_W * 0.775 / 2}C{RWIN_X - 60} {fol_y + 10} {RWIN_X - 30} {WIN_Y + 60} {RWIN_X} {WIN_Y + 60}", width=6)]
b += [badge(CX, WIN_Y + WIN_H + 40, "!")]

# ---- right: Playwright MCP - a brand-new Chrome window from its own profile folder ----
rcx = RWIN_X + WIN_W / 2
b += [text(rcx, TITLE_Y, "Playwright MCP", 36, 900, INK)]

gwin_body = (logo_svg("googlechrome.svg", 0, 0, 28)
             + text(42, 22, "새 Chrome 창", 21, 800, INK, anchor="start")
             + f'<rect x="0" y="52" width="340" height="18" rx="8" fill="{PAPER_LINE}"/>'
             + f'<rect x="0" y="82" width="240" height="18" rx="8" fill="{PAPER_LINE}"/>')
b += [window(RWIN_X, WIN_Y, WIN_W, WIN_H, "browser", "chrome (새 프로필)", gwin_body)]
b += [badge(RWIN_X + WIN_W - 10, WIN_Y - 10, 2)]
b += [text(rcx, WIN_Y + WIN_H + 40, "별도 프로필 폴더로 새 크롬 창", 27, 700, MUTED)]

print(save("a2-playwright-vs-chrome.svg", b, "A2-playwright/8 Playwright MCP vs Claude in Chrome (tools/illus/a2_playwright_vs_chrome.py)"))
