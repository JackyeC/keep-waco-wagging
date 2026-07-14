#!/usr/bin/env python3
"""Build Waco skyline rebuild review package — owner approval only.

Creates one B&W master concept plus ivory mockup and detail crops.
Does NOT overwrite Phase 3 production PNGs. No Printify. No Shopify.
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from brand_typography import lockup_paths_svg  # noqa: E402
from common import KWW_COLORS, OUTPUT, ROOT, setup_logging  # noqa: E402
from phase3_vector import render_svg_to_png  # noqa: E402
from waco_skyline_rebuild import (  # noqa: E402
    ALICO_CROP,
    PAT_NEFF_CROP,
    VIEW_H,
    VIEW_W,
    build_skyline_svg,
    skyline_inner_svg,
)

from PIL import Image, ImageDraw

REVIEW_DIR = ROOT / "artwork" / "waco-skyline-rebuild"
OUTPUT_REVIEW = OUTPUT / "waco-skyline-rebuild-review"

CANVAS = (4500, 5400)
MARGIN = 160
SKY_BOX = (MARGIN, 900, CANVAS[0] - MARGIN, 3180)
LOCK_Y = 2920
KEEP_SIZE = 480
WAG_SIZE = 380

INK = "#1E1A16"
IVORY = KWW_COLORS["Kitchen Cream"]
BARK = KWW_COLORS["Bark Brown"]
ROSE = KWW_COLORS["Good-Towel Rose"]


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def svg_doc(inner: str, *, w: int, h: int, title: str) -> str:
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <title>{esc(title)}</title>
{inner}
</svg>"""


def place_skyline(line_color: str, box: tuple[float, float, float, float], stroke: float) -> str:
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    scale = min(bw / VIEW_W, bh / VIEW_H)
    tx = x0 + (bw - VIEW_W * scale) / 2
    ty = y0 + (bh - VIEW_H * scale) / 2
    inner = skyline_inner_svg(line_color, stroke=stroke)
    return f'<g transform="translate({tx:.2f} {ty:.2f}) scale({scale:.4f})">{inner}</g>'


def crop_skyline_png(src: Path, crop: tuple[float, float, float, float], out: Path, scale: float = 2.5) -> None:
    x0, y0, x1, y1 = crop
    cw, ch = int(x1 - x0), int(y1 - y0)
    svg = build_skyline_svg(INK, stroke=3.0)
    tmp = REVIEW_DIR / "_crop_tmp.svg"
    tmp.write_text(svg, encoding="utf-8")
    full = REVIEW_DIR / "_crop_full.png"
    render_svg_to_png(tmp, full, VIEW_W, VIEW_H)
    im = Image.open(full).convert("RGBA")
    crop_im = im.crop((int(x0), int(y0), int(x1), int(y1)))
    if scale != 1.0:
        crop_im = crop_im.resize((int(cw * scale), int(ch * scale)), Image.Resampling.LANCZOS)
    # white background for review
    bg = Image.new("RGB", crop_im.size, "white")
    bg.paste(crop_im, mask=crop_im.split()[-1] if crop_im.mode == "RGBA" else None)
    bg.save(out, dpi=(300, 300))
    full.unlink(missing_ok=True)


def draw_ivory_shirt(draw: ImageDraw.ImageDraw, w: int, h: int, color: tuple[int, int, int]) -> None:
    cx = w // 2
    body_top = int(h * 0.18)
    body_bottom = int(h * 0.88)
    body_left = int(w * 0.28)
    body_right = int(w * 0.72)
    shoulder_y = int(h * 0.24)
    sleeve_drop = int(h * 0.42)
    collar_w = int(w * 0.11)
    shadow = tuple(max(0, c - 24) for c in color)
    draw.polygon(
        [(body_left, shoulder_y), (body_left, body_bottom), (body_right, body_bottom), (body_right, shoulder_y)],
        fill=color,
    )
    draw.polygon(
        [
            (body_left, shoulder_y),
            (int(w * 0.07), int(h * 0.30)),
            (int(w * 0.10), sleeve_drop),
            (int(w * 0.24), int(h * 0.30)),
        ],
        fill=color,
    )
    draw.polygon(
        [
            (body_right, shoulder_y),
            (int(w * 0.93), int(h * 0.30)),
            (int(w * 0.90), sleeve_drop),
            (int(w * 0.76), int(h * 0.30)),
        ],
        fill=color,
    )
    draw.ellipse(
        [cx - collar_w, body_top - int(h * 0.02), cx + collar_w, body_top + int(h * 0.05)],
        fill=color,
        outline=shadow,
        width=max(2, w // 400),
    )


def hex_rgb(hexc: str) -> tuple[int, int, int]:
    h = hexc.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def build_ivory_mockup(composed_png: Path, out: Path) -> None:
    art = Image.open(composed_png).convert("RGBA")
    shirt_w, shirt_h = 1800, 2150
    shirt = Image.new("RGB", (shirt_w, shirt_h), "#f2f2f0")
    draw = ImageDraw.Draw(shirt)
    draw_ivory_shirt(draw, shirt_w, shirt_h, hex_rgb(IVORY))

    chest_left = int(shirt_w * 0.30)
    chest_right = int(shirt_w * 0.70)
    chest_top = int(shirt_h * 0.22)
    chest_bottom = int(shirt_h * 0.62)
    chest_w = chest_right - chest_left
    chest_h = chest_bottom - chest_top

    fit = min(chest_w / art.width, chest_h / art.height) * 0.88
    print_w = int(art.width * fit)
    print_h = int(art.height * fit)
    art_r = art.resize((print_w, print_h), Image.Resampling.LANCZOS)
    ox = chest_left + (chest_w - print_w) // 2
    oy = chest_top + int(chest_h * 0.46) - print_h // 2
    shirt.paste(art_r, (ox, oy), art_r)
    shirt.save(out, dpi=(300, 300))


def build_contact_sheet(paths: dict[str, Path], out: Path) -> None:
    labels = [
        ("1_standalone_skyline", "1. Standalone skyline (B&W)"),
        ("2_skyline_with_lockup", "2. Skyline + KEEP WACO wagging"),
        ("3_ivory_chest_mockup", "3. Ivory chest mockup"),
        ("4_alico_crop", "4. ALICO close-up"),
        ("5_pat_neff_crop", "5. Pat Neff Hall close-up"),
    ]
    sheet = Image.new("RGB", (3200, 2200), "#f7f5f1")
    draw = ImageDraw.Draw(sheet)
    draw.text((40, 20), "Waco Skyline Rebuild — Owner Visual Review", fill="#1E1A16")
    draw.text((40, 52), "Phase 4 concept only — production PNGs not generated", fill="#666")

    slots = [
        (40, 100, 980, 620),
        (1020, 100, 1960, 620),
        (2000, 100, 2940, 620),
        (40, 680, 980, 1200),
        (1020, 680, 1960, 1200),
    ]
    for (key, label), (x0, y0, x1, y1) in zip(labels, slots):
        im = Image.open(paths[key]).convert("RGB")
        im.thumbnail((x1 - x0 - 20, y1 - y0 - 40), Image.Resampling.LANCZOS)
        px = x0 + ((x1 - x0) - im.width) // 2
        py = y0 + 28 + ((y1 - y0 - 40) - im.height) // 2
        sheet.paste(im, (px, py))
        draw.text((x0 + 8, y0 + 6), label, fill="#1E1A16")
    sheet.save(out, dpi=(300, 300))


def rgba_on_white(path: Path) -> None:
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGB", im.size, "white")
    bg.paste(im, mask=im.split()[-1])
    bg.save(path, dpi=(300, 300))


def main() -> int:
    logger = setup_logging("waco_skyline_rebuild_review")
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_REVIEW.mkdir(parents=True, exist_ok=True)

    # 1 — Standalone skyline B&W
    skyline_svg = REVIEW_DIR / "skyline-only.svg"
    skyline_svg.write_text(build_skyline_svg(INK), encoding="utf-8")
    skyline_png = OUTPUT_REVIEW / "1_standalone_skyline.png"
    render_svg_to_png(skyline_svg, skyline_png, VIEW_W, VIEW_H)
    rgba_on_white(skyline_png)

    # 2 — Skyline + lockup B&W
    lock_bw = lockup_paths_svg(
        x_center=CANVAS[0] / 2,
        y_top=LOCK_Y,
        keep_color=INK,
        wagging_color="#5C4A44",
        keep_size=KEEP_SIZE,
        wagging_size=WAG_SIZE,
    )
    composed_inner = (
        f'<rect width="{CANVAS[0]}" height="{CANVAS[1]}" fill="white"/>\n'
        f'<g id="skyline">{place_skyline(INK, SKY_BOX, 6.8)}</g>\n'
        f'<g id="lockup">{lock_bw}</g>'
    )
    composed_svg = REVIEW_DIR / "skyline-with-lockup-bw.svg"
    composed_svg.write_text(svg_doc(composed_inner, w=CANVAS[0], h=CANVAS[1], title="Waco rebuild B&W"), encoding="utf-8")
    composed_bw = OUTPUT_REVIEW / "2_skyline_with_lockup_bw.png"
    render_svg_to_png(composed_svg, composed_bw, CANVAS[0], CANVAS[1])
    rgba_on_white(composed_bw)

    # Brand-color composed (for ivory mockup)
    lock_brand = lockup_paths_svg(
        x_center=CANVAS[0] / 2,
        y_top=LOCK_Y,
        keep_color=BARK,
        wagging_color=ROSE,
        keep_size=KEEP_SIZE,
        wagging_size=WAG_SIZE,
    )
    brand_inner = (
        f'<rect width="{CANVAS[0]}" height="{CANVAS[1]}" fill="white"/>\n'
        f'<g id="skyline">{place_skyline(BARK, SKY_BOX, 6.8)}</g>\n'
        f'<g id="lockup">{lock_brand}</g>'
    )
    brand_svg = REVIEW_DIR / "skyline-with-lockup-brand.svg"
    brand_svg.write_text(svg_doc(brand_inner, w=CANVAS[0], h=CANVAS[1], title="Waco rebuild brand"), encoding="utf-8")
    brand_png = REVIEW_DIR / "composed-brand.png"
    render_svg_to_png(brand_svg, brand_png, CANVAS[0], CANVAS[1])

    # 3 — Ivory chest mockup
    mockup = OUTPUT_REVIEW / "3_ivory_chest_mockup.png"
    build_ivory_mockup(brand_png, mockup)

    # 4 & 5 — Detail crops
    alico_crop = OUTPUT_REVIEW / "4_alico_crop.png"
    pat_neff_crop = OUTPUT_REVIEW / "5_pat_neff_crop.png"
    crop_skyline_png(skyline_svg, ALICO_CROP, alico_crop)
    crop_skyline_png(skyline_svg, PAT_NEFF_CROP, pat_neff_crop)

    # Also save brand lockup version as item 2 for owner (clearer than pure B&W wagging)
    composed_brand_out = OUTPUT_REVIEW / "2_skyline_with_lockup.png"
    rgba_on_white(brand_png)
    Image.open(brand_png).save(composed_brand_out, dpi=(300, 300))

    paths = {
        "1_standalone_skyline": skyline_png,
        "2_skyline_with_lockup": composed_brand_out,
        "3_ivory_chest_mockup": mockup,
        "4_alico_crop": alico_crop,
        "5_pat_neff_crop": pat_neff_crop,
    }
    sheet = OUTPUT_REVIEW / "WACO_SKYLINE_REBUILD_OWNER_REVIEW.png"
    build_contact_sheet(paths, sheet)

    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "status": "PENDING_OWNER_VISUAL_APPROVAL",
        "landmarks": [
            "Magnolia Silos",
            "Waco Suspension Bridge",
            "ALICO Building",
            "Pat Neff Hall (Baylor)",
        ],
        "excluded": ["McLennan County Courthouse (omitted to avoid crowding)"],
        "artwork_architecture_unchanged": {
            "four_upload_treatments": ["ivory.png", "blossom.png", "bay.png", "pepper.png"],
            "blue_spruce_uses": "bay.png",
        },
        "holds": {
            "DRY_RUN": True,
            "printify_draft": False,
            "garment_color_pngs": False,
            "production_overwrite": False,
        },
        "files": {k: str(v.relative_to(ROOT)) for k, v in paths.items()},
        "contact_sheet": str(sheet.relative_to(ROOT)),
        "editable_skyline_svg": str(skyline_svg.relative_to(ROOT)),
    }
    (OUTPUT_REVIEW / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    logger.info("Waco skyline rebuild review package written to %s", OUTPUT_REVIEW)
    print("WACO SKYLINE REBUILD — PENDING OWNER VISUAL APPROVAL")
    for name, path in paths.items():
        print(f"{name}: {path}")
    print(f"contact_sheet: {sheet}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
