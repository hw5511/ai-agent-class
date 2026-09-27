"""A2-books/2 크롤링과 스크래핑: one continuous left-to-right scene (owner fix 2026-09-28: forward
arrowheads that were crossing back on themselves, a badge sitting on top of the page1/page2 arrow, an
overflowing page-3.html url pill, a mascot overlapping the ground line and its own label, "GBP 58.75"
instead of the real site's "£58.75", and a scene packed into the left half of the canvas leaving the top
and right mostly empty). The mascot walks page 1 -> page 2 -> page 3 (last page), collecting whole pages
as it goes (crawling, badge 1). At the last page it stops and two fields (title, price) are pulled out
into small cards (scraping, badge 2). One wide accent arc under the whole scene ties both steps together
as the one practice run (badge 3). The whole group is centred in the 1792-wide canvas so the margins on
both sides match, and it sits in the lower part of the stage per CONTENT_RULES (content roughly y 320..770)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

WIN_Y, WIN_H = 350, 124
GAP = 60  # gap between page windows: wide enough that the arrow's control points never cross

# window widths: page 1/2 short, page-3.html needs a wider pill so the url fits with padding
PAGE_W = [190, 190, 260]
labels = ["page 1", "page 2", "page-3.html"]

pages_x = []

# lay pages out left to right first at x=0, then shift the whole scene to centre it
cursor = 0
for w in PAGE_W:
    pages_x.append(cursor)
    cursor += w + GAP
cursor -= GAP  # drop the trailing gap after the last page

ZOOM_GAP = 70
ZOOM_W, ZOOM_H = 320, 210
zoom_x = cursor + ZOOM_GAP
cursor = zoom_x + ZOOM_W

CARD_GAP = 70
CARD_W, CARD_H = 210, 64
cards_x = cursor + CARD_GAP
total_w = (cards_x + CARD_W)

X0 = (1792 - total_w) / 2  # centre the whole scene so both side margins match
pages_x = [px + X0 for px in pages_x]
zoom_x += X0
cards_x += X0

mid_y = WIN_Y + WIN_H / 2

# ---- three pages: mascot crawls page 1 -> page 2 -> page 3 (last page) ----
for i, (px, lbl) in enumerate(zip(pages_x, labels)):
    last = i == len(pages_x) - 1
    w = PAGE_W[i]
    body = (f'<rect x="0" y="0" width="{w - 20}" height="10" rx="5" fill="{ACCENT_TINT}"/>'
            f'<rect x="0" y="22" width="{(w - 20) * 0.7:.0f}" height="10" rx="5" fill="{PAPER_LINE}"/>'
            f'<rect x="0" y="44" width="{(w - 20) * 0.5:.0f}" height="10" rx="5" fill="{PAPER_LINE}"/>'
            f'<rect x="0" y="66" width="{(w - 20) * 0.6:.0f}" height="10" rx="5" fill="{PAPER_LINE}"/>')
    b += [window(px, WIN_Y, w, WIN_H, "browser", lbl, body)]
    if last:
        b += [f'<rect x="{px - 6}" y="{WIN_Y - 6}" width="{w + 12}" height="{WIN_H + 12}" rx="20" fill="none" stroke="{ACCENT}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>']

# forward arrows page1 -> page2 -> page3: control points stay on their own side of
# the midpoint (offset well under half the gap) so the curve never doubles back and
# the arrowhead always points at the next page, not the previous one
for i in range(len(pages_x) - 1):
    x0, x1 = pages_x[i] + PAGE_W[i], pages_x[i + 1]
    off = min(22, (x1 - x0) / 3)
    b += [path(f"M{x0} {mid_y}C{x0 + off} {mid_y - 24} {x1 - off} {mid_y - 24} {x1} {mid_y}")]

# badge 1 (크롤링) sits on a clear corner of page 1, off to the side of every arrow
b += [badge(pages_x[0] - 6, WIN_Y - 6, 1)]

# mascot walks on a ground line below the three pages, clear of every window and the label under it
MASCOT_S = 0.5
MASCOT_H = 143 * MASCOT_S
MASCOT_Y = WIN_Y + WIN_H + 40
GROUND_Y = MASCOT_Y + MASCOT_H  # feet line
crawl_cx = (pages_x[0] + pages_x[-1] + PAGE_W[-1]) / 2
b += [f'<line x1="{pages_x[0] - 20}" y1="{GROUND_Y}" x2="{pages_x[-1] + PAGE_W[-1] + 20}" y2="{GROUND_Y}" stroke="{LINE}" stroke-width="3" stroke-dasharray="1 10" stroke-linecap="round"/>']
b += [mascot(crawl_cx - 240 * MASCOT_S / 2, MASCOT_Y, MASCOT_S)]
LABEL_Y = GROUND_Y + 50
b += [text(crawl_cx, LABEL_Y, "크롤링 · 링크 따라 페이지째 수집", 24, 800, MUTED)]

# ---- middle: last page opens up into a bigger detail view (ASCII-only title, real url slug, real £ price) ----
zoom_y = WIN_Y - 10
open_body = (f'<rect x="0" y="0" width="{ZOOM_W - 40}" height="14" rx="6" fill="{ACCENT}"/>'
             + text(6, 48, "Myriad (Prentor #1)", 19, 800, INK, anchor="start")
             + text(6, 80, "£58.75", 19, 800, ACCENT_DARK, anchor="start", family=MONO)
             + f'<rect x="0" y="100" width="{ZOOM_W - 40}" height="9" rx="4" fill="{PAPER_LINE}"/>'
             f'<rect x="0" y="120" width="{(ZOOM_W - 40) * 0.7:.0f}" height="9" rx="4" fill="{PAPER_LINE}"/>'
             f'<rect x="0" y="146" width="{ZOOM_W - 40}" height="42" rx="8" fill="{PANEL}" stroke="{LINE}" stroke-width="2"/>')
b += [window(zoom_x, zoom_y, ZOOM_W, ZOOM_H, "browser", "myriad-prentor-1_36", open_body)]
zoom_mid_y = zoom_y + ZOOM_H / 2
last_x, last_w = pages_x[-1], PAGE_W[-1]
b += [path(f"M{last_x + last_w} {mid_y}C{last_x + last_w + 30} {mid_y} {zoom_x - 30} {zoom_mid_y} {zoom_x} {zoom_mid_y}")]

# ---- right: 스크래핑 - pull two fields out of the open page into cards ----
card1_y = zoom_mid_y - (CARD_H * 2 + 26) / 2
card2_y = card1_y + CARD_H + 26
b += [f'<rect x="{cards_x}" y="{card1_y}" width="{CARD_W}" height="{CARD_H}" rx="14" fill="#fff" stroke="{ACCENT}" stroke-width="3" filter="url(#shs)"/>',
      text(cards_x + CARD_W / 2, card1_y + 28, "제목", 19, 700, MUTED),
      text(cards_x + CARD_W / 2, card1_y + 52, "Myriad (Prentor #1)", 19, 900, ACCENT_DARK)]
b += [path(f"M{zoom_x + ZOOM_W} {zoom_y + 40}C{zoom_x + ZOOM_W + 40} {zoom_y + 30} {cards_x - 30} {card1_y + 20} {cards_x} {card1_y + 20}")]

b += [f'<rect x="{cards_x}" y="{card2_y}" width="{CARD_W}" height="{CARD_H}" rx="14" fill="#fff" stroke="{ACCENT}" stroke-width="3" filter="url(#shs)"/>',
      text(cards_x + CARD_W / 2, card2_y + 28, "가격", 19, 700, MUTED),
      text(cards_x + CARD_W / 2, card2_y + 52, "£58.75", 20, 900, ACCENT_DARK, family=MONO)]
b += [path(f"M{zoom_x + ZOOM_W} {zoom_y + ZOOM_H - 50}C{zoom_x + ZOOM_W + 40} {zoom_y + ZOOM_H - 40} {cards_x - 30} {card2_y + 44} {cards_x} {card2_y + 44}")]

b += [badge(cards_x + CARD_W - 8, card1_y - 16, 2)]
b += [text(cards_x + CARD_W / 2, LABEL_Y, "스크래핑 · 필요한 값만 추출", 24, 800, MUTED)]

# ---- bottom: one wide arc ties crawling + scraping into the one practice run ----
ARC_Y = 700
arc_x0, arc_x1 = pages_x[0] + 30, cards_x + CARD_W / 2
b += [f'<path d="M{arc_x0} {ARC_Y}C{arc_x0} {ARC_Y + 40} {arc_x1} {ARC_Y + 40} {arc_x1} {ARC_Y}" fill="none" stroke="{ACCENT_TINT}" stroke-width="10" stroke-linecap="round"/>']
b += [badge(arc_x0 + 30, ARC_Y + 10, 3)]
b += [text((arc_x0 + arc_x1) / 2, ARC_Y + 34, "이번 실습은 크롤링 + 스크래핑을 함께 사용", 24, 800, ACCENT_DARK)]

print(save("a2-books-crawl.svg", b, "A2-books/2 크롤링과 스크래핑 (tools/illus/a2_books_crawl.py)"))
