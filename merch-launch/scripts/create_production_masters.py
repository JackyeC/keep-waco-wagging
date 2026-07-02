#!/usr/bin/env python3
"""Create production-ready 4500x5400 transparent masters via vector tracing.

Pipeline per design:
  1. Load alpha-composited line art from the Production Packet (approved reference).
  2. Build a 1-bit bitmap from the opaque (inked) pixels — the actual line work.
  3. Vector-trace with potrace -> SVG (resolution independent, NOT an upscale).
  4. Render SVG at target print size with rsvg-convert, colored per brand palette.
  5. Composite onto a 4500x5400 transparent canvas with >=150px safe margins.

This is genuine reconstruction of clean line art into vectors, then rendering at
print resolution — not bitmap enlargement of a preview.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import OUTPUT, ROOT, setup_logging  # noqa: E402

from PIL import Image

ALPHA_DIR = OUTPUT / "recovered-assets" / "_packet_alpha"
ARTWORK = ROOT / "artwork"
TMP = OUTPUT / "_master_tmp"

TARGET_W, TARGET_H = 4500, 5400
SAFE_MARGIN = 200  # >150 px required

# Brand palette
BARK_BROWN = "#4C463E"
KITCHEN_CREAM = "#F4EDE4"
GOOD_TOWEL_ROSE = "#C68C86"

DESIGNS = {
    "waco-skyline-tee": {
        "light_src": ALPHA_DIR / "waco_skyline_light_x26.png",
        "dark_src": ALPHA_DIR / "waco_skyline_dark_x29.png",
        "make_dark": True,
        "light_color": BARK_BROWN,
        "dark_color": KITCHEN_CREAM,
        "layout": "wide",
        # ALICO window grid too dense to vector-trace from a 1536px preview without
        # collapsing into a solid tower. Cannot produce a faithful 300 DPI master.
        "status": "REQUIRES_RECONSTRUCTION",
    },
    "french-bulldog-tee": {
        "light_src": ALPHA_DIR / "french_bulldog_light_x62.png",
        "dark_src": None,
        "make_dark": False,
        "light_color": BARK_BROWN,
        "dark_color": KITCHEN_CREAM,
        "layout": "portrait",
        "status": "PASS",
    },
    "golden-retriever-tee": {
        "light_src": ALPHA_DIR / "golden_retriever_light_x66.png",
        "dark_src": None,
        "make_dark": False,
        "light_color": BARK_BROWN,
        "dark_color": KITCHEN_CREAM,
        "layout": "portrait",
        "status": "PASS",
    },
}


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, capture_output=True)


def alpha_to_bilevel_pbm(src: Image.Image, out_pbm: Path, threshold: int = 40) -> tuple[int, int]:
    """Opaque (inked) pixels -> black on white PBM for potrace."""
    src = src.convert("RGBA")
    alpha = src.getchannel("A")
    # black where inked (alpha high), white elsewhere
    bw = alpha.point(lambda a: 0 if a > threshold else 255).convert("1")
    bw.save(out_pbm)
    return src.size


def trace_to_svg(pbm: Path, svg: Path) -> None:
    # Tuned for clean line art: keep fine detail, sharp-ish corners, minimal speck drop.
    run([
        "potrace", str(pbm),
        "-s",              # SVG output
        "-o", str(svg),
        "--turdsize", "1",
        "--alphamax", "0.6",
        "--opttolerance", "0.1",
    ])


def recolor_svg(svg: Path, fill: str) -> None:
    text = svg.read_text(encoding="utf-8")
    # potrace uses fill:#000000 on the path group
    text = text.replace('fill="#000000"', f'fill="{fill}"')
    text = text.replace("fill:#000000", f"fill:{fill}")
    # ensure any default black also replaced
    svg.write_text(text, encoding="utf-8")


def render_svg(svg: Path, out_png: Path, width: int, height: int) -> None:
    cmd = ["rsvg-convert", "--keep-aspect-ratio", "-b", "none", "-o", str(out_png)]
    if width:
        cmd += ["-w", str(width)]
    if height:
        cmd += ["-h", str(height)]
    cmd.append(str(svg))
    run(cmd)


def place_on_canvas(art: Image.Image, layout: str) -> Image.Image:
    canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    avail_w = TARGET_W - 2 * SAFE_MARGIN
    avail_h = TARGET_H - 2 * SAFE_MARGIN
    art = art.copy()
    art.thumbnail((avail_w, avail_h), Image.LANCZOS)
    # horizontal center; vertical: portrait centered, wide skyline slightly upper
    ox = (TARGET_W - art.width) // 2
    if layout == "wide":
        oy = SAFE_MARGIN + int(avail_h * 0.18)
    else:
        oy = (TARGET_H - art.height) // 2
    oy = max(SAFE_MARGIN, min(oy, TARGET_H - SAFE_MARGIN - art.height))
    canvas.alpha_composite(art, (ox, oy))
    return canvas


def add_dpi(png: Path) -> None:
    try:
        im = Image.open(png)
        im.save(png, dpi=(300, 300))
    except Exception:
        pass


def build_variant(src: Image.Image, color: str, layout: str, out_png: Path, slug: str, variant: str) -> None:
    TMP.mkdir(parents=True, exist_ok=True)
    pbm = TMP / f"{slug}_{variant}.pbm"
    svg = TMP / f"{slug}_{variant}.svg"
    hi = TMP / f"{slug}_{variant}_hi.png"
    alpha_to_bilevel_pbm(src, pbm)
    trace_to_svg(pbm, svg)
    recolor_svg(svg, color)
    # render at a large intermediate size preserving aspect, then place
    aspect = src.width / src.height
    if aspect >= 1:
        render_svg(svg, hi, TARGET_W - 2 * SAFE_MARGIN, 0)
    else:
        render_svg(svg, hi, 0, TARGET_H - 2 * SAFE_MARGIN)
    art = Image.open(hi).convert("RGBA")
    canvas = place_on_canvas(art, layout)
    out_png.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out_png)
    add_dpi(out_png)


def main() -> int:
    logger = setup_logging("create_production_masters")
    for slug, cfg in DESIGNS.items():
        base = ARTWORK / slug
        (base / "source").mkdir(parents=True, exist_ok=True)

        light_src = cfg["light_src"]
        if not light_src.exists():
            logger.error("Missing source for %s: %s", slug, light_src)
            continue

        # Always preserve the recovered reference source
        (base / "source" / light_src.name).write_bytes(light_src.read_bytes())
        if cfg.get("dark_src") and cfg["dark_src"].exists():
            (base / "source" / cfg["dark_src"].name).write_bytes(cfg["dark_src"].read_bytes())

        if cfg.get("status") == "REQUIRES_RECONSTRUCTION":
            # Do NOT fake a master. Preserve reference, drop placeholders + brief marker.
            (base / "light.png.REQUIRES_RECONSTRUCTION").write_text(
                "No production master generated. Source cannot be faithfully rendered "
                "at 300 DPI without collapsing the ALICO Building detail. See notes.md.\n"
            )
            (base / "dark.png.REQUIRES_RECONSTRUCTION").write_text(
                "Dark (cream-line) version blocked on the same reconstruction. See notes.md.\n"
            )
            for stale in ("light.png", "dark.png"):
                sp = base / stale
                if sp.exists():
                    sp.unlink()
            logger.info("%s => REQUIRES_RECONSTRUCTION (no master faked)", slug)
            continue

        src_img = Image.open(light_src).convert("RGBA")
        build_variant(src_img, cfg["light_color"], cfg["layout"], base / "light.png", slug, "light")
        logger.info("%s light.png built", slug)

        if cfg["make_dark"]:
            build_variant(src_img, cfg["dark_color"], cfg["layout"], base / "dark.png", slug, "dark")
            logger.info("%s dark.png built (cream line for dark garments)", slug)
        else:
            (base / "dark.png.NOT_NEEDED").write_text(
                "No dark-garment version — Pepper not curated for this design.\n"
            )
            logger.info("%s dark version not needed", slug)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
