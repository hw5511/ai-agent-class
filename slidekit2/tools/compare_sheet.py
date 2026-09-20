# Build old-vs-new review sheets for a rebuilt lesson part.
#
#   python tools/compare_sheet.py <partId> <step> <from> <to>
#
# Left column  = the slide currently shipped (assets/basic/stepNN/<name>.svg, rasterised via Chrome
#                through the already-rendered site is not available offline, so the SVG is rasterised
#                with cairosvg when present, else a placeholder is drawn).
# Right column = the freshly rendered PNG (_drafts/render/<partId>/NN_<name>.png).
#
# Output: _drafts/render/<partId>/_compare.png  (and _compare_2.png, ... when a part is long enough
# that one sheet would be unreadably tall).
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PANEL_W = 1100
LABEL_H = 40
GAP = 22
ROWS_PER_SHEET = 6


def font(size):
    for path in ("C:/Windows/Fonts/malgun.ttf", "C:/Windows/Fonts/arial.ttf"):
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def rasterise_svg(svg_path, size):
    try:
        import cairosvg
    except ImportError:
        return None
    if not os.path.exists(svg_path):
        return None
    png = svg_path + ".__tmp.png"
    try:
        cairosvg.svg2png(url=svg_path, write_to=png, output_width=size[0], output_height=size[1])
        img = Image.open(png).convert("RGB")
        img.load()
        return img
    except Exception:
        return None
    finally:
        if os.path.exists(png):
            os.remove(png)


def placeholder(size, text):
    img = Image.new("RGB", size, "#f2f2f2")
    d = ImageDraw.Draw(img)
    d.text((24, size[1] // 2 - 14), text, fill="#888888", font=font(22))
    return img


def main():
    part_id, step, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
    course = json.load(open(os.path.join(REPO, f"courses/basic/step0{step}.json"), encoding="utf-8"))
    slides = course["slides"][first - 1:last]
    out_dir = os.path.join(REPO, "_drafts", "render", part_id)

    h = round(PANEL_W * 9 / 16)
    f_old, f_new = font(24), font(24)
    rows = []
    for i, slide in enumerate(slides, start=1):
        name = os.path.basename(slide.get("imagePath", "")).rsplit(".", 1)[0]
        old_path = os.path.join(REPO, f"assets/basic/step0{step}/{name}.svg")
        new_path = os.path.join(out_dir, f"{i:02d}_{name}.png")

        old = rasterise_svg(old_path, (PANEL_W, h)) or placeholder((PANEL_W, h), f"(기존 SVG 미변환) {name}")
        if os.path.exists(new_path):
            new = Image.open(new_path).convert("RGB").resize((PANEL_W, h), Image.LANCZOS)
        else:
            new = placeholder((PANEL_W, h), "(아직 렌더 안 됨)")

        row = Image.new("RGB", (PANEL_W * 2 + 24, h + LABEL_H), "#ffffff")
        d = ImageDraw.Draw(row)
        d.text((6, 8), f"기존 {first + i - 1:02d}  {name}", fill="#b4402a", font=f_old)
        d.text((PANEL_W + 30, 8), f"신규 {i:02d}", fill="#1273c4", font=f_new)
        row.paste(old, (0, LABEL_H))
        row.paste(new, (PANEL_W + 24, LABEL_H))
        rows.append(row)

    made = []
    for n, start in enumerate(range(0, len(rows), ROWS_PER_SHEET), start=1):
        chunk = rows[start:start + ROWS_PER_SHEET]
        total_h = sum(r.height for r in chunk) + GAP * (len(chunk) - 1)
        sheet = Image.new("RGB", (chunk[0].width, total_h), "#ffffff")
        y = 0
        for r in chunk:
            sheet.paste(r, (0, y))
            y += r.height + GAP
        suffix = "" if len(rows) <= ROWS_PER_SHEET else f"_{n}"
        path = os.path.join(out_dir, f"_compare{suffix}.png")
        sheet.save(path)
        made.append(path)
    print("\n".join(made))


if __name__ == "__main__":
    main()
