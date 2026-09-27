"""A2-books/3 스크래핑 유의사항 (owner fix 2026-09-28: card 2's title sat on top of the server rack, card
3's copy arrow was an illegible blob, the practice-site band's "!" badge crowded the card row above it,
and the whole group needed to sit lower / read at the same vertical band as the rest of the course).
Three real-object risk scenes, badges 1-3 matching the three notes: 1) a locked door standing in for a
page with no access permission, 2) many small request pages piling onto one server until it glows red and
steams (server load: 수강신청 · 티켓팅), 3) a book review page with a (c) mark, copied by a clear straight
arrow into a second page that carries the mark with it (copyright). Below, the mascot stands next to the
practice site's own "We love being scraped!" banner with a check mark for the reassurance note ("!")."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from illuskit import *

b = [panel()]

CARD_Y, CARD_W, CARD_H = 352, 480, 248
GAP = 60
total = CARD_W * 3 + GAP * 2
x0 = (1792 - total) / 2
xs = [x0, x0 + CARD_W + GAP, x0 + 2 * (CARD_W + GAP)]

TITLE_Y = CARD_Y + 206
SUB_Y = CARD_Y + 236


def card_bg(cx):
    return f'<rect x="{cx}" y="{CARD_Y}" width="{CARD_W}" height="{CARD_H}" rx="20" fill="#fff" stroke="{LINE2}" stroke-width="2" filter="url(#shs)"/>'


# ---- 1. 접근 권한 없는 정보 = 해킹: a locked door, not a page ----
cx = xs[0]
b += [card_bg(cx)]
dx, dy, dw, dh = cx + CARD_W / 2 - 58, CARD_Y + 26, 116, 116
b += [f'<rect x="{dx}" y="{dy}" width="{dw}" height="{dh}" rx="10" fill="{ACCENT_DARK}"/>',
      f'<rect x="{dx + 10}" y="{dy + 10}" width="{dw - 20}" height="{dh - 20}" rx="6" fill="none" stroke="#fff" stroke-width="3" opacity="0.5"/>',
      f'<circle cx="{dx + dw - 20}" cy="{dy + dh / 2 + 4}" r="6" fill="#fff"/>']
lock_cx, lock_cy = dx + dw / 2, dy + dh - 4
b += [f'<rect x="{lock_cx - 24}" y="{lock_cy - 2}" width="48" height="36" rx="8" fill="{INK2}" filter="url(#shs)"/>',
      f'<path d="M{lock_cx - 15} {lock_cy - 2}v-15a15 15 0 0 1 30 0v15" fill="none" stroke="{INK2}" stroke-width="7"/>',
      f'<circle cx="{lock_cx}" cy="{lock_cy + 15}" r="4.5" fill="#fff"/>']
b += [cross(cx + CARD_W - 34, CARD_Y + 34, 22)]
b += [text(cx + CARD_W / 2, TITLE_Y, "접근 권한 없는 정보", 26, 900, INK)]
b += [text(cx + CARD_W / 2, SUB_Y, "잠긴 문을 여는 것 = 해킹", 22, 700, MUTED)]
b += [badge(cx + 30, CARD_Y - 10, 1)]

# ---- 2. 서버 부하: many small request pages converge on a server that overheats.
# The whole rack + glow + incoming pages is kept well above the title (owner fix: it used to
# reach down far enough to sit on top of "서버 부하" - now it is confined to the card's top band,
# clear of the label the same way cards 1 and 3's pictures are. ----
cx = xs[1]
b += [card_bg(cx)]
rack_x, rack_w = cx + CARD_W / 2 - 58, 116
rack_y = CARD_Y + 34
bar_h, bar_gap = 20, 26
rack_bottom = rack_y + 2 * bar_gap + bar_h
rack_mid_y = (rack_y + rack_bottom) / 2
# heat glow behind the rack, sized so it never reaches the title band below
b += [f'<ellipse cx="{rack_x + rack_w / 2}" cy="{rack_mid_y}" rx="86" ry="54" fill="{RED}" opacity="0.14"/>']
for i in range(3):
    ry = rack_y + i * bar_gap
    fill = RED if i == 1 else INK2
    b += [f'<rect x="{rack_x}" y="{ry}" width="{rack_w}" height="{bar_h}" rx="6" fill="{fill}"/>',
          f'<circle cx="{rack_x + 13}" cy="{ry + bar_h / 2}" r="4.5" fill="#fff" opacity="0.85"/>']
# steam / heat squiggles rising off the top of the rack (upward only, stays clear of the title below)
for sxo in (-24, 4, 32):
    sx = rack_x + rack_w / 2 + sxo
    sy = rack_y - 6
    b += [f'<path d="M{sx} {sy}c-10 -14 10 -20 0 -34c-8 -12 8 -18 2 -30" fill="none" stroke="{RED}" stroke-width="4" opacity="0.55" stroke-linecap="round"/>']
# many small request "pages" piling in from three sides, kept within the rack's own vertical band
req_pts = [(rack_x - 112, rack_y - 8), (rack_x - 120, rack_y + 58), (rack_x + rack_w + 56, rack_y - 4),
           (rack_x + rack_w + 62, rack_y + 60), (rack_x + rack_w / 2 - 100, rack_y - 28)]
target = (rack_x + rack_w / 2, rack_mid_y)
for (px, py) in req_pts:
    b += [f'<rect x="{px - 11}" y="{py - 14}" width="22" height="28" rx="4" fill="#fff" stroke="{LINE2}" stroke-width="2"/>',
          f'<rect x="{px - 6}" y="{py - 7}" width="12" height="3" rx="1.5" fill="{LINE}"/><rect x="{px - 6}" y="{py}" width="12" height="3" rx="1.5" fill="{LINE}"/>']
    mx, my = (px + target[0]) / 2, (py + target[1]) / 2 - 10
    b += [f'<path d="M{px} {py}Q{mx} {my} {target[0]} {target[1]}" fill="none" stroke="{RED}" stroke-width="4" opacity="0.55" stroke-linecap="round"/>']
b += [text(cx + CARD_W / 2, TITLE_Y, "서버 부하", 26, 900, INK)]
b += [text(cx + CARD_W / 2, SUB_Y, "수강신청 · 티켓팅처럼 폭주", 22, 700, MUTED)]
b += [badge(cx + 30, CARD_Y - 10, 2)]

# ---- 3. 저작권: a book review page (with a real © mark) copied by one clear straight
# arrow into a second page that carries the © mark with it - not the old overlapping blob. ----
cx = xs[2]
b += [card_bg(cx)]
DW3 = 78
oy = CARD_Y + 30
ox = cx + CARD_W / 2 - 176
gx = cx + CARD_W / 2 + 78
doc_h = DW3 * 1.25
doc_mid_y = oy + doc_h / 2


def review_doc(x, y, copy=False):
    out = [doc(x, y, DW3, shadow=True, stroke=ACCENT if copy else LINE2)]
    ccx, ccy = x + DW3 * 0.47, y + doc_h - 24
    out += [f'<circle cx="{ccx}" cy="{ccy}" r="17" fill="#fff" stroke="{ACCENT}" stroke-width="4"/>',
            f'<text x="{ccx}" y="{ccy + 7}" font-size="19" font-weight="900" fill="{ACCENT}" text-anchor="middle">©</text>']
    return "".join(out)


b += [review_doc(ox, oy)]
b += [review_doc(gx, oy, copy=True)]
# one clear straight arrow, original -> copy, at the doc's vertical centre
arrow_y = doc_mid_y
b += [path(f"M{ox + DW3 + 14} {arrow_y}L{gx - 14} {arrow_y}", color=ACCENT, width=5)]
b += [text(cx + CARD_W / 2, TITLE_Y, "저작권", 26, 900, INK)]
b += [text(cx + CARD_W / 2, SUB_Y, "서평 · 블로그 글도 인정", 22, 700, MUTED)]
b += [badge(cx + 30, CARD_Y - 10, 3)]

# ---- bottom: the practice site itself says scraping it is fine.
# Kept well clear of the card row above (owner fix: the "!" badge used to crowd the cards). ----
BAND_GAP = 84
BAND_Y = CARD_Y + CARD_H + BAND_GAP
band_x, band_w, band_h = 496, 800, 86
b += [f'<rect x="{band_x}" y="{BAND_Y}" width="{band_w}" height="{band_h}" rx="16" fill="{ACCENT_ZONE}"/>']
b += [mascot(band_x + 24, BAND_Y + 8, 0.5)]
b += [text(band_x + 156, BAND_Y + 38, "books.toscrape.com", 24, 900, INK, anchor="start")]
b += [text(band_x + 156, BAND_Y + 66, "We love being scraped! · 연습용 데모", 20, 700, MUTED, anchor="start")]
b += [check(band_x + band_w - 50, BAND_Y + band_h / 2, 26)]
b += [badge(band_x + band_w - 10, BAND_Y - 10, "!")]

print(save("a2-books-caution.svg", b, "A2-books/3 스크래핑 유의사항 (tools/illus/a2_books_caution.py)"))
