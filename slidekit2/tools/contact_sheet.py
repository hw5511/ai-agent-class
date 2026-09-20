"""Build contact_sheet.png for a step02 part's render output folder — a 3-column grid of 640x360
thumbnails, one per rendered PNG, in file-name order. Called by render_slides.mjs after each render; can
also be run standalone: `python tools/contact_sheet.py <dir>`.
"""
import sys
from pathlib import Path

from PIL import Image

THUMB_W, THUMB_H = 640, 360
COLS = 3
PAD = 12
BG = (24, 24, 24)


def build(out_dir: Path) -> Path | None:
    pngs = sorted(p for p in out_dir.glob("*.png") if p.name != "contact_sheet.png")
    if not pngs:
        print(f"contact_sheet: no PNGs found in {out_dir}")
        return None

    rows = (len(pngs) + COLS - 1) // COLS
    sheet_w = COLS * THUMB_W + (COLS + 1) * PAD
    sheet_h = rows * THUMB_H + (rows + 1) * PAD
    sheet = Image.new("RGB", (sheet_w, sheet_h), BG)

    for i, p in enumerate(pngs):
        with Image.open(p) as im:
            thumb = im.convert("RGB").resize((THUMB_W, THUMB_H), Image.LANCZOS)
        col, row = i % COLS, i // COLS
        x = PAD + col * (THUMB_W + PAD)
        y = PAD + row * (THUMB_H + PAD)
        sheet.paste(thumb, (x, y))

    out_path = out_dir / "contact_sheet.png"
    sheet.save(out_path)
    print(f"contact_sheet: {out_path} ({len(pngs)} slides, {COLS}x{rows})")
    return out_path


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: python tools/contact_sheet.py <dir>")
        sys.exit(1)
    build(Path(sys.argv[1]))
