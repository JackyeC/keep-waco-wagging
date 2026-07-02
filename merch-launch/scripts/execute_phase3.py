#!/usr/bin/env python3
"""Phase 3 — Approved design system and three test production masters.

Read-only of approved references only (no new source search).
No Printify, no products, no publishing.
"""

from __future__ import annotations

import base64
import hashlib
import json
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    KWW_COLORS,
    OUTPUT,
    ROOT,
    setup_logging,
)
from phase3_vector import (  # noqa: E402
    composite_on_canvas,
    dots_to_svg,
    fit_dots_to_box,
    fit_paths_to_box,
    load_rgba,
    min_line_check,
    path_bounds,
    paths_to_svg,
    raster_to_dot_paths,
    raster_to_stroke_paths,
    render_svg_to_png,
    rgba_from_svg,
    simplify_path,
    svg_to_pdf,
    transform_paths,
)
from PIL import Image, ImageDraw, ImageFont
import numpy as np

logger = setup_logging("execute_phase3")

FONTS = ROOT / "fonts"
ARTWORK = ROOT / "artwork"
ALPHA = OUTPUT / "recovered-assets" / "_packet_alpha"
REF = ROOT / "reference"
DEPRECATED_GOLDEN = REF / "REFERENCE_ONLY_DEPRECATED"

CANVAS = (4500, 5400)
MARGIN = 150

BARK = KWW_COLORS["Bark Brown"]
SAGE = KWW_COLORS["Wag Sage"]
CREAM = KWW_COLORS["Kitchen Cream"]
ROSE = KWW_COLORS["Good-Towel Rose"]
BLUSH = KWW_COLORS["Blush"]
BRAZOS = KWW_COLORS["Brazos Blue"]

FONT_URLS = {
    "CormorantGaramond-SemiBold.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf",
    "Parisienne-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/parisienne/Parisienne-Regular.ttf",
    "Jost-Medium.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/jost/Jost%5Bwght%5D.ttf",
}

MOCKUP_GARMENTS = {
    "ivory": CREAM,
    "bay": SAGE,
    "blossom": BLUSH,
    "pepper": BARK,
}


def ensure_fonts() -> None:
    FONTS.mkdir(parents=True, exist_ok=True)
    if all((FONTS / name).exists() and (FONTS / name).stat().st_size > 1000 for name in FONT_URLS):
        return
    import urllib.request
    import ssl

    ctx = ssl.create_default_context()
    try:
        import certifi

        ctx = ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        pass
    for name, url in FONT_URLS.items():
        dest = FONTS / name
        if dest.exists() and dest.stat().st_size > 1000:
            continue
        logger.info("Downloading font %s", name)
        try:
            with urllib.request.urlopen(url, context=ctx) as resp, dest.open("wb") as out:
                out.write(resp.read())
        except Exception as exc:
            logger.warning("urllib font download failed (%s); trying curl", exc)
            subprocess.run(
                ["curl", "-fsSL", "-o", str(dest), url.replace("github.com", "raw.githubusercontent.com").replace("/raw/main/", "/main/")],
                check=True,
            )


def font_path(name: str) -> Path:
    return FONTS / name


def trace_waco_dots(src: Path) -> tuple[list[tuple[float, float, float]], tuple[int, int]]:
    rgba = load_rgba(src)
    dots, _, size = raster_to_dot_paths(rgba, exclude_bottom_ratio=0.14, dot_spacing=1)
    return dots, size


def trace_line_art(
    src: Path,
    *,
    exclude_bottom_ratio: float = 0.0,
    simplify: float = 0.8,
) -> tuple[list[list[tuple[float, float]]], tuple[int, int, int, int], tuple[int, int]]:
    rgba = load_rgba(src)
    trace = raster_to_stroke_paths(
        rgba,
        exclude_bottom_ratio=exclude_bottom_ratio,
        min_path_len=3,
    )
    paths = [simplify_path(p, simplify) for p in trace.paths if len(p) >= 2]
    return paths, trace.source_bbox, (trace.width, trace.height)


def build_stroke_svg(
    paths: list[list[tuple[float, float]]],
    *,
    width: int,
    height: int,
    stroke: str,
    stroke_width: float,
    accent_stroke: str | None = None,
    title: str,
) -> str:
    from phase3_vector import TraceResult

    trace = TraceResult(paths=paths, width=width, height=height, source_bbox=(0, 0, width, height))
    accent = None
    if accent_stroke:
        # Rose accent on flagpole region — top-center of ALICO bbox heuristic
        xs = [x for p in paths for x, _ in p]
        ys = [y for p in paths for _, y in p]
        if xs and ys:
            minx, maxx = min(xs), max(xs)
            midx = (minx + maxx) * 0.58
            flag_paths = []
            for path in paths:
                if any(x > midx and y < (min(ys) + (max(ys) - min(ys)) * 0.22) for x, y in path):
                    flag_paths.append(path)
            accent = flag_paths[:12]
    return paths_to_svg(
        trace,
        stroke=stroke,
        stroke_width=stroke_width,
        accent_paths=accent,
        accent_stroke=accent_stroke,
        viewbox=(0, 0, width, height),
        title=title,
    )


def typography_block_svg(
    *,
    keep_color: str,
    wagging_color: str,
    breed_label: str | None,
    breed_color: str,
    x_center: float,
    y_top: float,
    keep_size: float = 112,
    wagging_size: float = 96,
    breed_size: float = 42,
    width: int = 4500,
    height: int = 5400,
) -> str:
    cormorant = font_path("CormorantGaramond-SemiBold.ttf").as_posix()
    parisienne = font_path("Parisienne-Regular.ttf").as_posix()
    jost = font_path("Jost-Medium.ttf").as_posix()
    breed_block = ""
    if breed_label:
        breed_block = (
            f'    <text x="{x_center:.1f}" y="{y_top + keep_size + wagging_size + 58:.1f}" '
            f'text-anchor="middle" font-family="Jost" font-size="{breed_size:.1f}" '
            f'fill="{breed_color}" letter-spacing="6">{breed_label.upper()}</text>'
        )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>
      @font-face {{ font-family: 'Cormorant Garamond'; src: url('{cormorant}'); font-weight: 600; }}
      @font-face {{ font-family: 'Parisienne'; src: url('{parisienne}'); }}
      @font-face {{ font-family: 'Jost'; src: url('{jost}'); font-weight: 500; }}
    </style>
  </defs>
  <g id="brand-lockup">
    <text x="{x_center:.1f}" y="{y_top + keep_size:.1f}" text-anchor="middle"
      font-family="Cormorant Garamond" font-size="{keep_size:.1f}" fill="{keep_color}"
      letter-spacing="10">KEEP WACO</text>
    <text x="{x_center:.1f}" y="{y_top + keep_size + wagging_size - 8:.1f}" text-anchor="middle"
      font-family="Parisienne" font-size="{wagging_size:.1f}" fill="{wagging_color}">wagging</text>
    {breed_block}
  </g>
</svg>"""


def merge_svgs(layers: list[tuple[str, float]], width: int, height: int, title: str) -> str:
    """Merge multiple SVG fragments (full-size) by rasterizing is avoided — inline groups."""
    body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        f"  <title>{title}</title>",
    ]
    cormorant = font_path("CormorantGaramond-SemiBold.ttf").as_posix()
    parisienne = font_path("Parisienne-Regular.ttf").as_posix()
    jost = font_path("Jost-Medium.ttf").as_posix()
    body.append(
        f"""  <defs>
    <style>
      @font-face {{ font-family: 'Cormorant Garamond'; src: url('{cormorant}'); font-weight: 600; }}
      @font-face {{ font-family: 'Parisienne'; src: url('{parisienne}'); }}
      @font-face {{ font-family: 'Jost'; src: url('{jost}'); font-weight: 500; }}
    </style>
  </defs>"""
    )
    for idx, (fragment, opacity) in enumerate(layers):
        # strip outer svg wrapper
        inner = fragment
        if "<svg" in inner:
            start = inner.find(">", inner.find("<svg")) + 1
            end = inner.rfind("</svg>")
            inner = inner[start:end]
        body.append(f'  <g id="layer-{idx}" opacity="{opacity:.3f}">')
        body.append(inner)
        body.append("  </g>")
    body.append("</svg>")
    return "\n".join(body)


def render_master_png(svg_path: Path, out_path: Path) -> None:
    render_svg_to_png(svg_path, out_path, CANVAS[0], CANVAS[1])
    im = Image.open(out_path)
    im.save(out_path, dpi=(300, 300))


def build_waco_dot_svg(
    dots: list[tuple[float, float, float]],
    *,
    box: tuple[float, float, float, float],
    fill: str,
    accent_fill: str | None,
    src_radius: float = 1.6,
    title: str,
) -> str:
    placed, radius = fit_dots_to_box(dots, box, src_radius)
    accent = None
    if accent_fill:
        bx0, by0, bx1, by1 = box
        accent = [(x, y, r) for x, y, r in placed if x > (bx0 + bx1) * 0.55 and y < by0 + (by1 - by0) * 0.25]
    return dots_to_svg(
        placed,
        width=CANVAS[0],
        height=CANVAS[1],
        fill=fill,
        radius=radius,
        accent_dots=accent,
        accent_fill=accent_fill,
        title=title,
    )


def build_waco_skyline_master() -> dict:
    """Phase 3A — shared Waco skyline vector system."""
    out_dir = ARTWORK / "shared" / "waco-skyline"
    out_dir.mkdir(parents=True, exist_ok=True)

    light_src = ALPHA / "waco_skyline_light_x26.png"
    dark_src = ALPHA / "waco_skyline_dark_x29.png"
    ref_copy = out_dir / "source-reference.png"
    shutil.copy2(light_src, ref_copy)

    light_dots, src_size = trace_waco_dots(light_src)
    dark_dots, _ = trace_waco_dots(dark_src)

    # Source-coordinate editable master (circle vectors, not raster embed)
    light_master = dots_to_svg(
        [(x, y, 1.4) for x, y, _ in light_dots],
        width=src_size[0],
        height=src_size[1],
        fill=BARK,
        radius=1.4,
        accent_dots=[(x, y, 1.2) for x, y, _ in light_dots if x > src_size[0] * 0.55 and y < src_size[1] * 0.22],
        accent_fill=ROSE,
        title="KWW Waco Skyline Master — light garment lines",
    )
    master_svg_path = out_dir / "waco-skyline-master.svg"
    master_svg_path.write_text(light_master, encoding="utf-8")
    svg_to_pdf(master_svg_path, out_dir / "waco-skyline-master.pdf")

    print_box = (
        MARGIN + 40,
        MARGIN + 500,
        CANVAS[0] - MARGIN - 40,
        CANVAS[1] - MARGIN - 1100,
    )
    for variant, dots, fill, accent, fname in (
        ("light", light_dots, BARK, ROSE, "waco-skyline-light.png"),
        ("dark", dark_dots, CREAM, ROSE, "waco-skyline-dark.png"),
    ):
        frag = build_waco_dot_svg(
            dots,
            box=print_box,
            fill=fill,
            accent_fill=accent,
            src_radius=1.6,
            title=f"Waco skyline {variant}",
        )
        tmp = out_dir / f"_tmp_{variant}.svg"
        tmp.write_text(frag, encoding="utf-8")
        render_master_png(tmp, out_dir / fname)
        tmp.unlink(missing_ok=True)

    (out_dir / "reconstruction-notes.md").write_text(
        f"""# Waco Skyline Vector Master — Phase 3A

**Date:** {datetime.now(timezone.utc).strftime('%Y-%m-%d')}

## Method
- Source: Production Packet alpha-composited raster (`xref 26` light / `xref 29` dark), 1536×1024
- **Manual vector reconstruction** via medial-axis skeleton → SVG circle paths (preserves ALICO window grid)
- **Not potrace** — no solid tower fills; each centerline point becomes an editable `<circle>` path
- Bottom ~14% excluded (legacy packet script — Brand Book lockup used on tees)

## Colors
- Light garment lines: Bark Brown `{BARK}` (+ Good-Towel Rose `{ROSE}` flag accent)
- Dark garment lines: Kitchen Cream `{CREAM}` (+ Rose flag accent)

## Vector stats
- Light master: {len(light_dots)} circle paths
- Dark master: {len(dark_dots)} circle paths

## Files
- `waco-skyline-master.svg` / `.pdf` — editable vector master
- `waco-skyline-light.png` / `waco-skyline-dark.png` — 4500×5400 RGBA print exports
- `source-reference.png` — approved reference preserved
""",
        encoding="utf-8",
    )

    return {
        "dot_count": len(light_dots),
        "source": str(light_src.relative_to(ROOT)),
        "out_dir": str(out_dir.relative_to(ROOT)),
    }


def compose_product_master(
    slug: str,
    *,
    include_breed_label: str | None,
    waco_dots: list[tuple[float, float, float]],
    dog_paths: list[list[tuple[float, float]]] | None,
    dog_src_size: tuple[int, int] | None,
    variant: str,
) -> None:
    out_dir = ARTWORK / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    src_dir = out_dir / "source"
    src_dir.mkdir(exist_ok=True)

    if variant == "light":
        primary = BARK
        secondary = SAGE
        wagging = ROSE
        breed_col = secondary
        waco_stroke = primary
        dog_stroke = primary
    else:
        primary = CREAM
        secondary = CREAM
        wagging = ROSE
        breed_col = BLUSH
        waco_stroke = primary
        dog_stroke = primary

    layers: list[tuple[str, float]] = []

    if dog_paths and dog_src_size:
        # Breed tee — shared layout grid
        skyline_box = (MARGIN + 60, 3280, CANVAS[0] - MARGIN - 60, 4080)
        layers.append(
            (
                build_waco_dot_svg(
                    waco_dots,
                    box=skyline_box,
                    fill=waco_stroke,
                    accent_fill=None,
                    src_radius=1.2,
                    title="skyline",
                ),
                0.40 if variant == "light" else 0.45,
            )
        )
        dog_box = (980, 560, 3520, 3120)
        dog = fit_paths_to_box(dog_paths, dog_box, dog_src_size)
        layers.append(
            (
                build_stroke_svg(
                    dog,
                    width=CANVAS[0],
                    height=CANVAS[1],
                    stroke=dog_stroke,
                    stroke_width=14.0 if variant == "light" else 13.0,
                    accent_stroke=ROSE,
                    title="dog",
                ),
                1.0,
            )
        )
        type_y = 3180
    else:
        # Waco skyline tee — skyline hero
        skyline_box = (MARGIN + 80, MARGIN + 320, CANVAS[0] - MARGIN - 80, 3480)
        layers.append(
            (
                build_waco_dot_svg(
                    waco_dots,
                    box=skyline_box,
                    fill=waco_stroke,
                    accent_fill=ROSE,
                    src_radius=1.6,
                    title="skyline",
                ),
                1.0,
            )
        )
        type_y = 3720

    layers.append(
        (
            typography_block_svg(
                keep_color=primary if variant == "dark" else BARK,
                wagging_color=wagging,
                breed_label=include_breed_label,
                breed_color=breed_col,
                x_center=CANVAS[0] / 2,
                y_top=type_y,
                keep_size=118 if not dog_paths else 108,
                wagging_size=98 if not dog_paths else 92,
                breed_size=40,
            ),
            1.0,
        )
    )

    master = merge_svgs(layers, CANVAS[0], CANVAS[1], f"{slug} {variant}")
    svg_path = out_dir / "master.svg"
    svg_path.write_text(master, encoding="utf-8")

    png_path = out_dir / f"{variant}.png"
    render_master_png(svg_path, png_path)

    # Remove old blocker markers
    for marker in out_dir.glob("*.REQUIRES_RECONSTRUCTION"):
        marker.unlink()
    for marker in out_dir.glob("*.NOT_NEEDED"):
        if variant == "dark":
            marker.unlink()


def out_notes(slug: str, breed_label: str | None, dog_src: Path | None) -> str:
    extra = ""
    if breed_label:
        extra = f"""
## Breed layout system
- Shared grid with French Bulldog / Golden Retriever (Phase 3 approved)
- Dog focal ~58% vertical composition; skyline secondary at 38–45% opacity behind lower chest
- Typography: Cormorant Garamond KEEP WACO + Parisienne wagging + Jost `{breed_label.upper()}`
- Old hand-lettered mockup script **not used**
"""
    if slug == "golden-retriever-tee":
        extra += """
## Deprecated reference
- Old golden mockup zip marked `REFERENCE_ONLY_DEPRECATED` — subject reference only
"""
    return f"""# {slug.replace('-', ' ').title()} — Phase 3 Production Master

**Status:** Phase 3 build — pending owner visual approval

## Typography (Brand Book approved)
- Cormorant Garamond: KEEP WACO
- Parisienne: wagging (sole script accent)
- Jost: supporting breed label only

## Sources
- Waco skyline: reconstructed vector from `waco_skyline_light_x26.png` (Production Packet)
- Dog reference: `{dog_src.name if dog_src else 'n/a'}`
{extra}
## Deliverables
- `light.png` / `dark.png` — 4500×5400 RGBA transparent
- `master.svg` — editable composed vector (strokes + brand lockup text)
"""


def mark_deprecated_golden() -> None:
    DEPRECATED_GOLDEN.mkdir(parents=True, exist_ok=True)
    marker = DEPRECATED_GOLDEN / "README.md"
    marker.write_text(
        """# REFERENCE_ONLY_DEPRECATED

The old Golden Retriever mockup layout (`keep_waco_wagging_golden_mockups.zip`) is **deprecated**.

Do **not** use for production:
- Serif "KEEP WACO WAGGIN" wording
- Paw-logo arrangement
- Skyline + dog + logo collage layout
- Typography or spacing from that mockup

**Allowed use:** confirm intended Golden Retriever subject/illustration only.

Phase 3 Golden Retriever tee uses the same breed layout grid as French Bulldog with Brand Book lockup.
""",
        encoding="utf-8",
    )
    zip_candidates = list(Path.home().glob("Downloads/keep_waco_wagging_golden*"))
    for z in zip_candidates:
        dest = DEPRECATED_GOLDEN / z.name
        if not dest.exists() and z.is_file():
            shutil.copy2(z, dest)


def make_mockup(design: str, garment: str, color: str, master_light: Path, master_dark: Path) -> Path:
    out_dir = OUTPUT / "test-batch-mockups" / design
    out_dir.mkdir(parents=True, exist_ok=True)
    master = master_dark if garment == "pepper" else master_light
    art = Image.open(master).convert("RGBA")
    bg = Image.new("RGBA", CANVAS, _hex_rgba(color))
    # Soft vignette
    overlay = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle([0, 0, CANVAS[0], CANVAS[1]], fill=(0, 0, 0, 18))
    bg.alpha_composite(overlay)
    # Center art on chest
    chest = art.copy()
    scale = 0.92
    nw, nh = int(chest.width * scale), int(chest.height * scale)
    chest = chest.resize((nw, nh), Image.Resampling.LANCZOS)
    ox = (CANVAS[0] - nw) // 2
    oy = int(CANVAS[1] * 0.18)
    bg.alpha_composite(chest, (ox, oy))
    out = out_dir / f"{garment}-mockup.png"
    bg.convert("RGB").save(out, quality=92)
    return out


def _hex_rgba(h: str) -> tuple[int, int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4)) + (255,)  # type: ignore


def _json_safe(obj):
    if isinstance(obj, dict):
        return {k: _json_safe(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_json_safe(v) for v in obj]
    if isinstance(obj, (np.bool_,)):
        return bool(obj)
    if isinstance(obj, (np.integer,)):
        return int(obj)
    if isinstance(obj, (np.floating,)):
        return float(obj)
    return obj


def validate_png(path: Path) -> dict:
    im = Image.open(path).convert("RGBA")
    arr = np.array(im)
    a = arr[:, :, 3]
    checks: dict = {}
    checks["dimensions_ok"] = im.size == CANVAS
    checks["rgba"] = True
    checks["has_alpha"] = bool(a.min() < 255)
    checks["transparent_corners"] = bool(a[0, 0] == 0 and a[-1, -1] == 0)
    ys, xs = np.where(a > 12)
    if len(xs):
        left, top = int(xs.min()), int(ys.min())
        right, bottom = im.width - int(xs.max()) - 1, im.height - int(ys.max()) - 1
        checks["margins"] = [left, top, right, bottom]
        checks["margins_ok"] = min(left, top, right, bottom) >= MARGIN
        checks["edge_clipping"] = min(left, top, right, bottom) <= 0
        checks["blank_canvas"] = False
        checks["ink_coverage"] = round(float((a > 12).mean()), 4)
        checks["line_thickness"] = {
            k: (bool(v) if isinstance(v, (np.bool_, bool)) else float(v) if isinstance(v, (np.floating, float)) else v)
            for k, v in min_line_check(arr, min_px=3.0).items()
        }
        # halo: semi-transparent fringe
        fringe = ((a > 0) & (a < 240)).mean()
        checks["halo_ratio"] = round(float(fringe), 5)
        checks["halo_ok"] = fringe < 0.02
        # white box
        rgb = arr[a > 200][:, :3] if (a > 200).any() else np.array([])
        checks["white_box"] = bool(len(rgb) and (rgb.min() > 250).all())
    else:
        checks["blank_canvas"] = True
        checks["margins_ok"] = False

    checks["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
    passed = bool(
        checks.get("dimensions_ok")
        and checks.get("margins_ok")
        and not checks.get("blank_canvas")
        and not checks.get("edge_clipping")
        and checks.get("halo_ok", True)
        and not checks.get("white_box", False)
        and checks.get("line_thickness", {}).get("ok", False)
    )
    return {"path": str(path.relative_to(ROOT)), "status": "PASS" if passed else "FAIL", "checks": checks}


def build_contact_sheet() -> Path:
    thumb_w, thumb_h = 520, 624
    cols, rows = 3, 4
    sheet = Image.new("RGB", (cols * (thumb_w + 24) + 24, rows * (thumb_h + 48) + 60), "#f7f4ef")
    draw = ImageDraw.Draw(sheet)
    try:
        title_font = ImageFont.truetype(str(font_path("Jost-Medium.ttf")), 28)
        label_font = ImageFont.truetype(str(font_path("Jost-Medium.ttf")), 18)
    except OSError:
        title_font = label_font = ImageFont.load_default()

    draw.text((24, 16), "Phase 3 Test Batch — Production Masters", fill=BARK, font=title_font)

    items = [
        ("Waco Skyline light", ARTWORK / "waco-skyline-tee" / "light.png"),
        ("Waco Skyline dark", ARTWORK / "waco-skyline-tee" / "dark.png"),
        ("Frenchie light", ARTWORK / "french-bulldog-tee" / "light.png"),
        ("Frenchie dark", ARTWORK / "french-bulldog-tee" / "dark.png"),
        ("Golden light", ARTWORK / "golden-retriever-tee" / "light.png"),
        ("Golden dark", ARTWORK / "golden-retriever-tee" / "dark.png"),
        ("Waco vector master", ARTWORK / "shared" / "waco-skyline" / "waco-skyline-light.png"),
        ("Source reference", ARTWORK / "shared" / "waco-skyline" / "source-reference.png"),
        ("Ivory mockup — Frenchie", OUTPUT / "test-batch-mockups/french-bulldog/ivory-mockup.png"),
        ("Pepper mockup — Waco", OUTPUT / "test-batch-mockups/waco-skyline/pepper-mockup.png"),
        ("Bay mockup — Golden", OUTPUT / "test-batch-mockups/golden-retriever/bay-mockup.png"),
        ("Blossom mockup — Frenchie", OUTPUT / "test-batch-mockups/french-bulldog/blossom-mockup.png"),
    ]
    for i, (label, path) in enumerate(items):
        c, r = i % cols, i // cols
        x, y = 24 + c * (thumb_w + 24), 60 + r * (thumb_h + 48)
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline="#d8d0c8", width=2)
        if path.exists():
            im = Image.open(path).convert("RGBA")
            im.thumbnail((thumb_w - 8, thumb_h - 8), Image.Resampling.LANCZOS)
            tile = Image.new("RGBA", (thumb_w, thumb_h), (255, 255, 255, 255))
            tile.paste(im, ((thumb_w - im.width) // 2, (thumb_h - im.height) // 2), im)
            sheet.paste(tile, (x, y), tile)
        draw.text((x, y + thumb_h + 6), label, fill=BARK, font=label_font)

    out = OUTPUT / "phase3-contact-sheet.png"
    sheet.save(out)
    return out


def img_to_data_uri(path: Path, max_w: int = 480) -> str:
    im = Image.open(path).convert("RGBA")
    im.thumbnail((max_w, int(max_w * 1.2)), Image.Resampling.LANCZOS)
    from io import BytesIO

    buf = BytesIO()
    im.save(buf, format="PNG")
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return f"data:image/png;base64,{b64}"


def build_owner_review(validations: list[dict]) -> Path:
    designs = [
        ("waco-skyline-tee", "Waco Skyline Tee", ARTWORK / "waco-skyline-tee"),
        ("french-bulldog-tee", "French Bulldog Tee", ARTWORK / "french-bulldog-tee"),
        ("golden-retriever-tee", "Golden Retriever Tee", ARTWORK / "golden-retriever-tee"),
    ]
    lines = [
        "# Phase 3 Owner Review",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "**No Printify connection. No products created. Test batch only.**",
        "",
    ]
    for slug, title, art_dir in designs:
        val = {v["path"]: v for v in validations}
        light_v = val.get(f"artwork/{slug}/light.png", {})
        dark_v = val.get(f"artwork/{slug}/dark.png", {})
        rec = "PASS" if light_v.get("status") == "PASS" and dark_v.get("status") == "PASS" else "REVISE"
        lines.extend(
            [
                f"## {title}",
                "",
                f"**Recommendation:** {rec}",
                "",
                "### Light master",
                f"![light]({img_to_data_uri(art_dir / 'light.png')})",
                "",
                "### Dark master",
                f"![dark]({img_to_data_uri(art_dir / 'dark.png')})",
                "",
            ]
        )
        mock_dir = OUTPUT / "test-batch-mockups" / slug.replace("-tee", "")
        for g in ("ivory", "bay", "blossom", "pepper"):
            mp = mock_dir / f"{g}-mockup.png"
            if mp.exists():
                lines.append(f"### {g.title()} mockup")
                lines.append(f"![{g}]({img_to_data_uri(mp)})")
                lines.append("")
        src = list((art_dir / "source").glob("*.png"))
        if src:
            lines.append("### Source reference")
            lines.append(f"![source]({img_to_data_uri(src[0])})")
            lines.append("")
        notes = art_dir / "notes.md"
        if notes.exists():
            lines.append("### Reconstruction notes")
            lines.append("```")
            lines.append(notes.read_text(encoding="utf-8")[:1200])
            lines.append("```")
            lines.append("")
        lines.extend(
            [
                "### Colors used",
                f"- Light: Bark Brown `{BARK}`, Wag Sage `{SAGE}`, Rose accent `{ROSE}`",
                f"- Dark: Kitchen Cream `{CREAM}`, Rose accent `{ROSE}`, Blush label `{BLUSH}`",
                "",
                "### Final dimensions",
                "4500 × 5400 px, RGBA, transparent, 300 DPI metadata, ≥150 px margins",
                "",
                "### Remaining concerns",
                "- Owner visual approval required before Printify upload",
                "- ALICO/courthouse legibility should be confirmed at actual chest print size",
                "- DTG provider minimum line weight not verified with physical sample",
                "",
                "---",
                "",
            ]
        )

    out = OUTPUT / "PHASE3_OWNER_REVIEW.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    return out


def main() -> int:
    logger.info("Phase 3 start — approved design system, 3 test masters only")
    ensure_fonts()
    mark_deprecated_golden()

    waco_info = build_waco_skyline_master()
    logger.info("Waco skyline master: %s dots", waco_info["dot_count"])

    waco_dots, _ = trace_waco_dots(ALPHA / "waco_skyline_light_x26.png")
    french_dog, _, french_size = trace_line_art(ALPHA / "french_bulldog_light_x62.png", simplify=0.7)
    golden_dog, _, golden_size = trace_line_art(ALPHA / "golden_retriever_light_x66.png", simplify=0.7)

    for slug, breed, dog_paths, dog_size, dog_src in (
        ("waco-skyline-tee", None, None, None, None),
        ("french-bulldog-tee", "French Bulldog", french_dog, french_size, ALPHA / "french_bulldog_light_x62.png"),
        ("golden-retriever-tee", "Golden Retriever", golden_dog, golden_size, ALPHA / "golden_retriever_light_x66.png"),
    ):
        out_dir = ARTWORK / slug
        src_dir = out_dir / "source"
        src_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ALPHA / "waco_skyline_light_x26.png", src_dir / "waco_skyline_light_x26.png")
        shutil.copy2(ALPHA / "waco_skyline_dark_x29.png", src_dir / "waco_skyline_dark_x29.png")
        if dog_src:
            shutil.copy2(dog_src, src_dir / dog_src.name)
        for variant in ("light", "dark"):
            compose_product_master(
                slug,
                include_breed_label=breed,
                waco_dots=waco_dots,
                dog_paths=dog_paths,
                dog_src_size=dog_size,
                variant=variant,
            )
        (out_dir / "notes.md").write_text(out_notes(slug, breed, dog_src), encoding="utf-8")

    mockups = []
    for design in ("waco-skyline", "french-bulldog", "golden-retriever"):
        art_dir = ARTWORK / f"{design}-tee"
        if not art_dir.exists():
            logger.warning("Missing artwork dir %s", art_dir)
            continue
        for garment, color in MOCKUP_GARMENTS.items():
            mp = make_mockup(design, garment, color, art_dir / "light.png", art_dir / "dark.png")
            mockups.append(str(mp.relative_to(ROOT)))

    targets = [
        ARTWORK / "shared/waco-skyline/waco-skyline-light.png",
        ARTWORK / "shared/waco-skyline/waco-skyline-dark.png",
        ARTWORK / "waco-skyline-tee/light.png",
        ARTWORK / "waco-skyline-tee/dark.png",
        ARTWORK / "french-bulldog-tee/light.png",
        ARTWORK / "french-bulldog-tee/dark.png",
        ARTWORK / "golden-retriever-tee/light.png",
        ARTWORK / "golden-retriever-tee/dark.png",
    ]
    validations = [validate_png(p) for p in targets]
    dupes: dict[str, list[str]] = {}
    for v in validations:
        h = v["checks"].get("sha256", "")
        dupes.setdefault(h, []).append(v["path"])
    duplicate_files = {h: ps for h, ps in dupes.items() if len(ps) > 1}

    payload = {
        "phase": 3,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "target_dimensions": "4500x5400",
        "min_margin_px": MARGIN,
        "typography": {
            "keep_waco": "Cormorant Garamond SemiBold",
            "wagging": "Parisienne",
            "breed_label": "Jost Medium",
        },
        "waco_reconstruction": waco_info,
        "illustration_references": {
            "french_bulldog": "output/recovered-assets/_packet_alpha/french_bulldog_light_x62.png",
            "golden_retriever": "output/recovered-assets/_packet_alpha/golden_retriever_light_x66.png",
            "waco_skyline": "output/recovered-assets/_packet_alpha/waco_skyline_light_x26.png",
        },
        "deprecated": "reference/REFERENCE_ONLY_DEPRECATED",
        "validations": validations,
        "duplicate_files": duplicate_files,
        "mockups": mockups,
        "printify_connected": False,
    }
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "PHASE3_PRODUCTION_VALIDATION.json").write_text(
        json.dumps(_json_safe(payload), indent=2), encoding="utf-8"
    )
    build_contact_sheet()
    build_owner_review(validations)

    passed = sum(1 for v in validations if v["status"] == "PASS")
    logger.info("Validation: %s/%s PASS", passed, len(validations))
    return 0 if passed == len(validations) else 1


if __name__ == "__main__":
    raise SystemExit(main())
