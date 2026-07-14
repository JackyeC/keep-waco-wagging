#!/usr/bin/env python3
"""Local Blue Spruce validation mockup for Waco Skyline Tee (read-only, no API writes)."""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import OUTPUT, ROOT  # noqa: E402

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError as exc:
    raise SystemExit("Pillow required") from exc

# Comfort Colors 1717 Blue Spruce — manufacturer reference (Pantone 5477)
BLUE_SPRUCE_HEX = "#3E5D58"
BAY_PNG = ROOT / "artwork" / "waco-skyline-tee" / "bay.png"
PLACEMENT = {"position": "front", "x": 0.5, "y": 0.48, "scale": 0.92, "angle": 0}
PRINT_AREA = {"width": 3839, "height": 4387}
CANVAS = (4500, 5400)


def contrast_ratio(fg: str, bg: str) -> float:
    def lum(hexc: str) -> float:
        r, g, b = (int(hexc.lstrip("#")[i:i + 2], 16) / 255 for i in (0, 2, 4))

        def ch(c: float) -> float:
            return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

        r, g, b = ch(r), ch(g), ch(b)
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    l1, l2 = lum(fg), lum(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def _hex_rgb(hexc: str) -> tuple[int, int, int]:
    h = hexc.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def draw_tshirt(draw: ImageDraw.ImageDraw, w: int, h: int, color: tuple[int, int, int]) -> None:
    cx = w // 2
    body_top = int(h * 0.18)
    body_bottom = int(h * 0.88)
    body_left = int(w * 0.28)
    body_right = int(w * 0.72)
    shoulder_y = int(h * 0.24)
    sleeve_drop = int(h * 0.42)
    collar_w = int(w * 0.11)
    shadow = tuple(max(0, c - 28) for c in color)
    draw.polygon(
        [
            (body_left, shoulder_y),
            (body_left, body_bottom),
            (body_right, body_bottom),
            (body_right, shoulder_y),
        ],
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


def build_mockup() -> tuple[Path, dict]:
    if not BAY_PNG.exists():
        raise FileNotFoundError(f"Missing production artwork: {BAY_PNG}")

    art = Image.open(BAY_PNG).convert("RGBA")
    shirt_w, shirt_h = 1800, 2150
    shirt = Image.new("RGB", (shirt_w, shirt_h), "#f2f2f0")
    draw = ImageDraw.Draw(shirt)
    swatch = _hex_rgb(BLUE_SPRUCE_HEX)
    draw_tshirt(draw, shirt_w, shirt_h, swatch)

    # Chest print zone approximating Printify front placeholder proportions
    chest_left = int(shirt_w * 0.30)
    chest_right = int(shirt_w * 0.70)
    chest_top = int(shirt_h * 0.22)
    chest_bottom = int(shirt_h * 0.62)
    chest_w = chest_right - chest_left
    chest_h = chest_bottom - chest_top

    fit_scale = min(PRINT_AREA["width"] / CANVAS[0], PRINT_AREA["height"] / CANVAS[1])
    effective_scale = fit_scale * PLACEMENT["scale"]
    print_w = int(CANVAS[0] * effective_scale * (chest_w / PRINT_AREA["width"]))
    print_h = int(CANVAS[1] * effective_scale * (chest_h / PRINT_AREA["height"]))
    art_r = art.resize((print_w, print_h), Image.Resampling.LANCZOS)

    center_x = chest_left + int(chest_w * PLACEMENT["x"])
    center_y = chest_top + int(chest_h * PLACEMENT["y"])
    ox = center_x - print_w // 2
    oy = center_y - print_h // 2
    shirt.paste(art_r, (ox, oy), art_r)

    # Annotation strip
    ann_h = 220
    out_im = Image.new("RGB", (shirt_w, shirt_h + ann_h), "#f7f4ef")
    out_im.paste(shirt, (0, 0))
    ann = ImageDraw.Draw(out_im)
    try:
        font = ImageFont.truetype(str(ROOT / "fonts" / "Jost-Medium.ttf"), 22)
        small = ImageFont.truetype(str(ROOT / "fonts" / "Jost-Medium.ttf"), 16)
    except OSError:
        font = small = ImageFont.load_default()
    ann.text((20, shirt_h + 16), "Blue Spruce validation — Waco Skyline Tee", fill="#4C463E", font=font)
    ann.text(
        (20, shirt_h + 52),
        f"Production PNG: artwork/waco-skyline-tee/bay.png | Garment: CC1717 Blue Spruce {BLUE_SPRUCE_HEX}",
        fill="#4C463E",
        font=small,
    )
    ann.text(
        (20, shirt_h + 78),
        f"Placement: front x={PLACEMENT['x']} y={PLACEMENT['y']} scale={PLACEMENT['scale']} (Printify coords)",
        fill="#4C463E",
        font=small,
    )
    ann.text(
        (20, shirt_h + 104),
        "Artwork treatment: shared Bay / Blue Spruce / Sage master (not recolored, not regenerated)",
        fill="#4C463E",
        font=small,
    )

    out_dir = OUTPUT
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "waco-blue-spruce-validation-mockup.png"
    out_im.save(out_path)

    sha256 = hashlib.sha256(BAY_PNG.read_bytes()).hexdigest()
    fit_scale = min(PRINT_AREA["width"] / CANVAS[0], PRINT_AREA["height"] / CANVAS[1])
    effective_scale = fit_scale * PLACEMENT["scale"]
    center_y_px = PLACEMENT["y"] * PRINT_AREA["height"]
    top_px = center_y_px - (CANVAS[1] * effective_scale) / 2
    bottom_px = center_y_px + (CANVAS[1] * effective_scale) / 2

    report = {
        "production_png_used": str(BAY_PNG.resolve()),
        "production_png_sha256": sha256,
        "phase3_validation_sha256": "86afad30d7c9f64b82f9cca245bd467ca68facf6cc00327c34b93e4696d93da7",
        "sha256_matches_phase3_record": sha256
        == "86afad30d7c9f64b82f9cca245bd467ca68facf6cc00327c34b93e4696d93da7",
        "artwork_treatment": "Bay / Blue Spruce / Sage shared master (bay.png)",
        "garment_color_name": "Blue Spruce",
        "garment_color_hex": BLUE_SPRUCE_HEX,
        "garment_color_source": "Comfort Colors 1717 manufacturer reference (Pantone 5477)",
        "printify_provider_reference": "Printify Choice (99)",
        "placement": PLACEMENT,
        "estimated_print_width_inches": round((CANVAS[0] * effective_scale) / 300, 2),
        "clipping_check": {
            "top_px": round(top_px, 1),
            "bottom_px": round(bottom_px, 1),
            "print_area_height_px": PRINT_AREA["height"],
            "clips_top": top_px < 0,
            "clips_bottom": bottom_px > PRINT_AREA["height"],
        },
        "ink_vs_garment_contrast": {
            "cream_primary_vs_blue_spruce": round(contrast_ratio("#F4EDE4", BLUE_SPRUCE_HEX), 2),
            "rose_accent_vs_blue_spruce": round(contrast_ratio("#C68C86", BLUE_SPRUCE_HEX), 2),
            "sage_sign_fill_vs_blue_spruce": round(contrast_ratio("#6E7E63", BLUE_SPRUCE_HEX), 2),
        },
        "technical_checks": {
            "primary_text_readable": contrast_ratio("#F4EDE4", BLUE_SPRUCE_HEX) >= 3.0,
            "skyline_primary_visible": contrast_ratio("#F4EDE4", BLUE_SPRUCE_HEX) >= 3.0,
            "secondary_ink_marginal": contrast_ratio("#6E7E63", BLUE_SPRUCE_HEX) < 3.0,
            "no_clipping_at_proposed_placement": top_px >= 0 and bottom_px <= PRINT_AREA["height"],
        },
        "mockup_output": str(out_path.resolve()),
    }
    return out_path, report


def main() -> int:
    out_path, report = build_mockup()
    json_path = OUTPUT / "waco_blue_spruce_validation.json"
    json_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"Saved mockup: {out_path}")
    print(f"Saved report: {json_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
