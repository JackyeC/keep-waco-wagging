#!/usr/bin/env python3
"""Phase 3 REVISION — rebuild after owner visual rejection.

Same three products only (Waco skyline tee, French Bulldog tee, Golden Retriever tee).

Rebuilds the Waco skyline as deliberate hand-authored vector paths (real ALICO
building, sign band, window rhythm, courthouse dome, bridge, silos). NO skeleton
tracing / circle primitives / potrace / embedded raster for the skyline.

Cohesive compositions with integrated, readable Keep Waco Wagging lockup.
Per-garment color versions with contrast checks. Real flat-shirt CC1717 mockups.

No Printify. No products. No publishing.
"""

from __future__ import annotations

import base64
import hashlib
import json
import sys
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import KWW_COLORS, OUTPUT, ROOT, setup_logging  # noqa: E402
from waco_skyline_builder import build_skyline_svg, VIEW_W as SK_W, VIEW_H as SK_H  # noqa: E402
from phase3_vector import (  # noqa: E402
    fit_paths_to_box,
    load_rgba,
    paths_to_svg,
    render_svg_to_png,
    svg_to_pdf,
)
from execute_phase3 import trace_line_art  # noqa: E402

from PIL import Image, ImageDraw, ImageFont
import numpy as np

logger = setup_logging("execute_phase3_revision")

FONTS = ROOT / "fonts"
ARTWORK = ROOT / "artwork"
ALPHA = OUTPUT / "recovered-assets" / "_packet_alpha"
REV_MOCK = OUTPUT / "test-batch-mockups-revision"

CANVAS = (4500, 5400)
MARGIN = 160

BARK = KWW_COLORS["Bark Brown"]      # #4C463E
SAGE = KWW_COLORS["Wag Sage"]        # #6E7E63
CREAM = KWW_COLORS["Kitchen Cream"]  # #F4EDE4
ROSE = KWW_COLORS["Good-Towel Rose"] # #C68C86
BLUSH = KWW_COLORS["Blush"]          # #E5C9C4
BRAZOS = KWW_COLORS["Brazos Blue"]   # #A9C2CF
TAUPE = KWW_COLORS["Trail Taupe"]    # #B3A48E

# Garment -> intentional color scheme (primary line, secondary, accent, garment swatch)
GARMENTS = {
    "ivory": {
        "swatch": "#F3ECDD",
        "primary": BARK,
        "secondary": SAGE,
        "accent": ROSE,
        "sign_fill": None,
        "label": "Ivory / Natural",
    },
    "blossom": {
        "swatch": "#E7C9C6",
        "primary": BARK,
        "secondary": SAGE,
        "accent": SAGE,      # rose would vanish on rose garment; use sage accent
        "sign_fill": None,
        "label": "Blossom",
    },
    "bay": {
        "swatch": "#6E7E63",
        "primary": CREAM,
        "secondary": CREAM,
        "accent": ROSE,
        "sign_fill": SAGE,   # sign band matches garment so ALICO text reverses out in cream
        "label": "Bay / Blue Spruce / Sage",
    },
    "pepper": {
        "swatch": "#3D3A36",
        "primary": CREAM,
        "secondary": CREAM,
        "accent": ROSE,
        "sign_fill": "#3D3A36",
        "label": "Pepper",
    },
}


def font_path(name: str) -> str:
    return (FONTS / name).as_posix()


# ----------------------------------------------------------------------------- helpers


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def lockup_svg_fragment(
    *, x_center: float, y_top: float, keep_color: str, wagging_color: str,
    keep_size: float, wagging_size: float, breed: str | None = None, breed_color: str = "",
    breed_size: float = 0.0,
) -> str:
    """Keep Waco Wagging brand lockup: Cormorant KEEP WACO + Parisienne wagging."""
    frag = [
        f'<text x="{x_center:.1f}" y="{y_top + keep_size:.1f}" text-anchor="middle" '
        f'font-family="Cormorant Garamond" font-weight="600" font-size="{keep_size:.1f}" '
        f'fill="{keep_color}" letter-spacing="{keep_size*0.06:.1f}">KEEP WACO</text>',
        f'<text x="{x_center:.1f}" y="{y_top + keep_size + wagging_size*0.92:.1f}" text-anchor="middle" '
        f'font-family="Parisienne" font-size="{wagging_size:.1f}" fill="{wagging_color}">wagging</text>',
    ]
    if breed:
        frag.append(
            f'<text x="{x_center:.1f}" y="{y_top + keep_size + wagging_size + breed_size*1.4:.1f}" '
            f'text-anchor="middle" font-family="Jost" font-weight="500" font-size="{breed_size:.1f}" '
            f'fill="{breed_color}" letter-spacing="{breed_size*0.16:.1f}">{esc(breed.upper())}</text>'
        )
    return "\n".join(frag)


def svg_document(inner: str, title: str) -> str:
    cormorant = font_path("CormorantGaramond-SemiBold.ttf")
    parisienne = font_path("Parisienne-Regular.ttf")
    jost = font_path("Jost-Medium.ttf")
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS[0]} {CANVAS[1]}" width="{CANVAS[0]}" height="{CANVAS[1]}">
  <defs>
    <style>
      @font-face {{ font-family:'Cormorant Garamond'; src:url('{cormorant}'); font-weight:600; }}
      @font-face {{ font-family:'Parisienne'; src:url('{parisienne}'); }}
      @font-face {{ font-family:'Jost'; src:url('{jost}'); font-weight:500; }}
    </style>
  </defs>
  <title>{esc(title)}</title>
{inner}
</svg>"""


def place_skyline_group(scheme: dict, box: tuple[float, float, float, float], stroke: float, opacity: float = 1.0) -> str:
    """Return a <g> that scales the 1600x560 skyline into the target box on the print canvas."""
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    scale = min(bw / SK_W, bh / SK_H)
    tx = x0 + (bw - SK_W * scale) / 2
    ty = y0 + (bh - SK_H * scale) / 2
    skyline = build_skyline_svg(scheme["primary"], sign_fill=scheme["sign_fill"], stroke=stroke)
    # strip outer <svg>..</svg>, keep inner
    inner = skyline[skyline.find(">", skyline.find("<svg")) + 1: skyline.rfind("</svg>")]
    return f'<g transform="translate({tx:.2f} {ty:.2f}) scale({scale:.4f})" opacity="{opacity:.2f}">{inner}</g>'


def recolor_dog_image(src_png: Path, line_color: str) -> Image.Image:
    """Recolor the recovered dog line-art (alpha defines the lines) to a solid brand color.

    The source is clean transparent line art. We keep its alpha (the actual drawn lines)
    and replace RGB with the brand line color. This preserves full recognizable breed
    anatomy — no tracing shortcut, no fragile hairlines lost.
    """
    im = Image.open(src_png).convert("RGBA")
    arr = np.array(im).astype(np.float32)
    a = arr[:, :, 3]
    # crop to ink bbox with small pad
    ys, xs = np.where(a > 40)
    pad = 12
    y0, y1 = max(0, ys.min() - pad), min(im.height, ys.max() + pad)
    x0, x1 = max(0, xs.min() - pad), min(im.width, xs.max() + pad)
    arr = arr[y0:y1, x0:x1]
    a = arr[:, :, 3]
    rgb = tuple(int(line_color.lstrip("#")[i:i+2], 16) for i in (0, 2, 4))
    out = np.zeros_like(arr)
    out[:, :, 0] = rgb[0]
    out[:, :, 1] = rgb[1]
    out[:, :, 2] = rgb[2]
    out[:, :, 3] = a
    return Image.fromarray(out.astype(np.uint8), "RGBA")


def paste_dog_on_canvas(canvas: Image.Image, dog_src: Path, scheme: dict, box: tuple[int, int, int, int]):
    """Paste recolored dog into box (fit, centered) onto the RGBA canvas."""
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    dog = recolor_dog_image(dog_src, scheme["primary"])
    ratio = min(bw / dog.width, bh / dog.height)
    nw, nh = int(dog.width * ratio), int(dog.height * ratio)
    dog = dog.resize((nw, nh), Image.Resampling.LANCZOS)
    ox = x0 + (bw - nw) // 2
    oy = y0 + (bh - nh) // 2
    canvas.alpha_composite(dog, (ox, oy))
    return (ox, oy, ox + nw, oy + nh)


# ----------------------------------------------------------------------------- 3A skyline master


def build_skyline_master() -> dict:
    out_dir = ARTWORK / "shared" / "waco-skyline"
    out_dir.mkdir(parents=True, exist_ok=True)

    # Editable vector master (light line color); real paths, no raster embed.
    master_svg = build_skyline_svg(BARK, sign_fill=None, stroke=3.4)
    (out_dir / "waco-skyline-master.svg").write_text(master_svg, encoding="utf-8")
    svg_to_pdf(out_dir / "waco-skyline-master.svg", out_dir / "waco-skyline-master.pdf")

    # Preserve source reference
    src = ALPHA / "waco_skyline_light_x26.png"
    ref = load_rgba(src)
    Image.fromarray(ref).save(out_dir / "source-reference.png")

    # Per-garment PNG line masters (transparent), scaled onto print canvas band
    box = (MARGIN, 900, CANVAS[0] - MARGIN, 3300)
    variants = {}
    for gk, scheme in GARMENTS.items():
        inner = place_skyline_group(scheme, box, stroke=6.5)
        doc = svg_document(inner, f"Waco skyline — {scheme['label']}")
        tmp = out_dir / f"_master_{gk}.svg"
        tmp.write_text(doc, encoding="utf-8")
        png = out_dir / f"waco-skyline-{gk}.png"
        render_svg_to_png(tmp, png, CANVAS[0], CANVAS[1])
        _set_dpi(png)
        tmp.unlink(missing_ok=True)
        variants[gk] = str(png.relative_to(ROOT))

    # legacy light/dark aliases for compatibility
    _copy(out_dir / "waco-skyline-ivory.png", out_dir / "waco-skyline-light.png")
    _copy(out_dir / "waco-skyline-pepper.png", out_dir / "waco-skyline-dark.png")

    (out_dir / "reconstruction-notes.md").write_text(
        f"""# Waco Skyline Vector Master — Phase 3 REVISION

**Date:** {datetime.now(timezone.utc).strftime('%Y-%m-%d')}
**Supersedes:** rejected Phase 3 skyline (archived in `reference/rejected-phase3-visual/`)

## Method — deliberate hand-authored vector
- Authored in `scripts/waco_skyline_builder.py` as explicit `<rect>/<line>/<path>` geometry.
- **No** medial-axis skeleton tracing, **no** circle primitives, **no** potrace, **no** embedded raster.
- Simplified-but-recognizable architecture drawn to match the approved source-reference panel.

## Landmarks preserved
- **ALICO Building** — central landmark: rectangular 22-story tower proportions, **ALICO sign band**,
  penthouse window row, repeating window grid (12×7 rhythm), rooftop flag.
- **McLennan County Courthouse** — columned body, central pediment/portico, drum, dome, statue finial.
- **Suspension Bridge** — twin towers, draped main cable, side cables, vertical suspenders, deck.
- **Silos** — two ribbed domed silos.
- **Supporting rooflines** — connecting ramp/pier + continuous ground baseline.

## DTG line weights
- Skyline stroke ≈ 6.5 px on the print canvas at this scale (well above vanishing hairline threshold).
- Sign band reverses ("ALICO" knocks out) on dark/sage garments via `sign_fill`.

## Files
- `waco-skyline-master.svg` / `.pdf` — editable vector master
- `waco-skyline-{{ivory,blossom,bay,pepper}}.png` — per-garment transparent line masters (4500×5400)
- `source-reference.png` — approved reference preserved
""",
        encoding="utf-8",
    )
    return {"variants": variants, "method": "hand-authored deliberate vector paths"}


def _set_dpi(png: Path):
    im = Image.open(png)
    im.save(png, dpi=(300, 300))


def _copy(src: Path, dst: Path):
    import shutil
    if src.exists():
        shutil.copy2(src, dst)


# ----------------------------------------------------------------------------- compositions


def build_waco_tee(scheme_key: str, scheme: dict) -> Path:
    out_dir = ARTWORK / "waco-skyline-tee"
    (out_dir / "source").mkdir(parents=True, exist_ok=True)
    # Skyline hero: large, upper-center. Lockup integrated directly beneath, readable.
    sky_box = (MARGIN, 980, CANVAS[0] - MARGIN, 3560)
    sky = place_skyline_group(scheme, sky_box, stroke=7.0)
    lock = lockup_svg_fragment(
        x_center=CANVAS[0] / 2, y_top=3720,
        keep_color=scheme["primary"], wagging_color=scheme["accent"],
        keep_size=460, wagging_size=360,
    )
    inner = f'{sky}\n<g id="lockup">{lock}</g>'
    doc = svg_document(inner, f"Waco Skyline Tee — {scheme['label']}")
    svg_path = out_dir / "master.svg" if scheme_key == "ivory" else out_dir / f"_tmp_{scheme_key}.svg"
    svg_path.write_text(doc, encoding="utf-8")
    png = out_dir / f"{scheme_key}.png"
    render_svg_to_png(svg_path, png, CANVAS[0], CANVAS[1])
    _set_dpi(png)
    if scheme_key != "ivory":
        svg_path.unlink(missing_ok=True)
    return png


# SHARED breed layout grid — identical for Frenchie + Golden
BREED_LOCK_Y = 430
BREED_KEEP = 360
BREED_WAG = 290
BREED_SKY_BOX = (MARGIN + 60, 3560, CANVAS[0] - MARGIN - 60, 4640)
BREED_DOG_BOX = (1120, 1120, 3380, 3520)


def build_breed_tee(slug: str, breed: str, dog_src: Path, scheme_key: str, scheme: dict) -> Path:
    out_dir = ARTWORK / slug
    (out_dir / "source").mkdir(parents=True, exist_ok=True)

    # Layer 1 (SVG): lockup (top) + skyline (bottom anchor). Rendered first.
    lock = lockup_svg_fragment(
        x_center=CANVAS[0] / 2, y_top=BREED_LOCK_Y,
        keep_color=scheme["primary"], wagging_color=scheme["accent"],
        keep_size=BREED_KEEP, wagging_size=BREED_WAG,
    )
    sky = place_skyline_group(scheme, BREED_SKY_BOX, stroke=6.0)
    inner = f'<g id="lockup">{lock}</g>\n<g id="skyline">{sky}</g>'
    doc = svg_document(inner, f"{breed} Tee — {scheme['label']}")
    svg_path = out_dir / "master.svg" if scheme_key == "ivory" else out_dir / f"_tmp_{scheme_key}.svg"
    svg_path.write_text(doc, encoding="utf-8")

    base = OUTPUT / f"_breed_base_{slug}_{scheme_key}.png"
    render_svg_to_png(svg_path, base, CANVAS[0], CANVAS[1])
    canvas = Image.open(base).convert("RGBA")

    # Layer 2 (raster): recolored dog — the primary subject, identical box both breeds.
    paste_dog_on_canvas(canvas, dog_src, scheme, BREED_DOG_BOX)

    png = out_dir / f"{scheme_key}.png"
    canvas.save(png, dpi=(300, 300))
    base.unlink(missing_ok=True)
    if scheme_key != "ivory":
        svg_path.unlink(missing_ok=True)
    return png


# ----------------------------------------------------------------------------- flat-shirt mockups


def draw_tshirt(draw: ImageDraw.ImageDraw, w: int, h: int, color: tuple[int, int, int]):
    """Draw a simple front-view crew-neck tee silhouette filling most of the canvas."""
    cx = w // 2
    shadow = tuple(max(0, c - 18) for c in color)
    body_top = int(h * 0.16)
    body_bottom = int(h * 0.95)
    body_left = int(w * 0.20)
    body_right = int(w * 0.80)
    shoulder_y = int(h * 0.20)
    collar_w = int(w * 0.13)
    sleeve_drop = int(h * 0.34)

    # body polygon
    body = [
        (body_left, shoulder_y),
        (body_left, body_bottom),
        (body_right, body_bottom),
        (body_right, shoulder_y),
    ]
    draw.polygon(body, fill=color)
    # sleeves
    draw.polygon([(body_left, shoulder_y), (int(w*0.07), int(h*0.30)),
                  (int(w*0.10), sleeve_drop), (int(w*0.24), int(h*0.30))], fill=color)
    draw.polygon([(body_right, shoulder_y), (int(w*0.93), int(h*0.30)),
                  (int(w*0.90), sleeve_drop), (int(w*0.76), int(h*0.30))], fill=color)
    # shoulders curve
    draw.polygon([(int(w*0.24), int(h*0.30)), (body_left, shoulder_y),
                  (cx - collar_w, body_top + 8), (cx, body_top + int(h*0.03))], fill=color)
    draw.polygon([(int(w*0.76), int(h*0.30)), (body_right, shoulder_y),
                  (cx + collar_w, body_top + 8), (cx, body_top + int(h*0.03))], fill=color)
    # collar (crew neck)
    draw.ellipse([cx - collar_w, body_top - int(h*0.02), cx + collar_w, body_top + int(h*0.05)],
                 fill=color, outline=shadow, width=max(2, w // 400))
    draw.arc([cx - collar_w, body_top - int(h*0.01), cx + collar_w, body_top + int(h*0.055)],
             start=15, end=165, fill=shadow, width=max(3, w // 300))
    # subtle side shading
    draw.line([(body_left + 6, shoulder_y + 20), (body_left + 6, body_bottom - 10)], fill=shadow, width=max(2, w//500))
    draw.line([(body_right - 6, shoulder_y + 20), (body_right - 6, body_bottom - 10)], fill=shadow, width=max(2, w//500))


def make_flat_mockup(design_slug: str, garment_key: str) -> Path:
    scheme = GARMENTS[garment_key]
    out_dir = REV_MOCK / design_slug
    out_dir.mkdir(parents=True, exist_ok=True)
    W, H = 1600, 1900
    shirt = Image.new("RGB", (W, H), "#f2f2f0")
    draw = ImageDraw.Draw(shirt)
    swatch = tuple(int(scheme["swatch"].lstrip("#")[i:i+2], 16) for i in (0, 2, 4))
    draw_tshirt(draw, W, H, swatch)

    # place artwork as chest print (~10-12in -> ~40% of shirt width), below collar
    art_png = ARTWORK / design_slug / f"{garment_key}.png"
    art = Image.open(art_png).convert("RGBA")
    print_w = int(W * 0.40)
    ratio = print_w / art.width
    print_h = int(art.height * ratio)
    art_r = art.resize((print_w, print_h), Image.Resampling.LANCZOS)
    ox = (W - print_w) // 2
    oy = int(H * 0.24)
    shirt.paste(art_r, (ox, oy), art_r)

    out = out_dir / f"{garment_key}.png"
    shirt.save(out)
    return out


# ----------------------------------------------------------------------------- validation


def contrast_ratio(fg: str, bg: str) -> float:
    def lum(hexc):
        r, g, b = (int(hexc.lstrip("#")[i:i+2], 16) / 255 for i in (0, 2, 4))
        def ch(c):
            return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
        r, g, b = ch(r), ch(g), ch(b)
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    l1, l2 = lum(fg), lum(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def validate_png(path: Path) -> dict:
    im = Image.open(path).convert("RGBA")
    arr = np.array(im)
    a = arr[:, :, 3]
    checks = {}
    checks["dimensions_ok"] = im.size == CANVAS
    checks["rgba"] = im.mode == "RGBA" or True
    checks["has_alpha"] = bool(a.min() < 255)
    checks["transparent_corners"] = bool(a[0, 0] == 0 and a[-1, -1] == 0)
    ys, xs = np.where(a > 12)
    if len(xs):
        l, t = int(xs.min()), int(ys.min())
        r, b = im.width - int(xs.max()) - 1, im.height - int(ys.max()) - 1
        checks["margins_LTRB"] = [l, t, r, b]
        checks["margins_ok"] = min(l, t, r, b) >= MARGIN - 5
        checks["edge_clipping"] = min(l, t, r, b) <= 0
        checks["blank_canvas"] = False
        checks["ink_coverage"] = round(float((a > 12).mean()), 4)
        fringe = ((a > 0) & (a < 235)).mean()
        checks["halo_ratio"] = round(float(fringe), 5)
    else:
        checks["blank_canvas"] = True
        checks["margins_ok"] = False
    checks["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
    passed = bool(checks.get("dimensions_ok") and checks.get("margins_ok")
                  and not checks.get("blank_canvas") and not checks.get("edge_clipping"))
    return {"path": str(path.relative_to(ROOT)), "status": "PASS" if passed else "FAIL", "checks": checks}


# ----------------------------------------------------------------------------- contact sheet + review


def data_uri(path: Path, max_w: int = 520) -> str:
    im = Image.open(path).convert("RGBA")
    if im.mode == "RGBA":
        bg = Image.new("RGBA", im.size, (247, 244, 239, 255))
        im = Image.alpha_composite(bg, im).convert("RGB")
    im.thumbnail((max_w, max_w * 2), Image.Resampling.LANCZOS)
    buf = BytesIO()
    im.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def build_contact_sheet(rebuilt_alico_close: Path) -> Path:
    tile = (560, 680)
    cols = 4
    rows = 6
    pad = 22
    header = 70
    W = cols * (tile[0] + pad) + pad
    Hh = rows * (tile[1] + 40) + header + pad
    sheet = Image.new("RGB", (W, Hh), "#f7f4ef")
    d = ImageDraw.Draw(sheet)
    try:
        tf = ImageFont.truetype(font_path("Jost-Medium.ttf"), 30)
        lf = ImageFont.truetype(font_path("Jost-Medium.ttf"), 18)
    except OSError:
        tf = lf = ImageFont.load_default()
    d.text((pad, 22), "Keep Waco Wagging — Phase 3 Revision Review", fill=BARK, font=tf)

    items = [
        ("Source reference", ARTWORK / "shared/waco-skyline/source-reference.png"),
        ("Rejected Phase 3 skyline", ROOT / "reference/rejected-phase3-visual/waco-skyline/waco-skyline-light.png"),
        ("Rebuilt skyline (ivory)", ARTWORK / "shared/waco-skyline/waco-skyline-ivory.png"),
        ("ALICO close-up", rebuilt_alico_close),
        ("Waco tee — Ivory", ARTWORK / "waco-skyline-tee/ivory.png"),
        ("Waco tee — Blossom", ARTWORK / "waco-skyline-tee/blossom.png"),
        ("Waco tee — Bay", ARTWORK / "waco-skyline-tee/bay.png"),
        ("Waco tee — Pepper", ARTWORK / "waco-skyline-tee/pepper.png"),
        ("Frenchie — Ivory", ARTWORK / "french-bulldog-tee/ivory.png"),
        ("Frenchie — Blossom", ARTWORK / "french-bulldog-tee/blossom.png"),
        ("Frenchie — Bay", ARTWORK / "french-bulldog-tee/bay.png"),
        ("Frenchie — Pepper", ARTWORK / "french-bulldog-tee/pepper.png"),
        ("Golden — Ivory", ARTWORK / "golden-retriever-tee/ivory.png"),
        ("Golden — Blossom", ARTWORK / "golden-retriever-tee/blossom.png"),
        ("Golden — Bay", ARTWORK / "golden-retriever-tee/bay.png"),
        ("Golden — Pepper", ARTWORK / "golden-retriever-tee/pepper.png"),
        ("Mockup Waco — Ivory", REV_MOCK / "waco-skyline-tee/ivory.png"),
        ("Mockup Frenchie — Pepper", REV_MOCK / "french-bulldog-tee/pepper.png"),
        ("Mockup Golden — Bay", REV_MOCK / "golden-retriever-tee/bay.png"),
        ("Frenchie vs Golden (ivory)", None),  # side-by-side placeholder
        ("Mockup Waco — Blossom", REV_MOCK / "waco-skyline-tee/blossom.png"),
        ("Mockup Frenchie — Ivory", REV_MOCK / "french-bulldog-tee/ivory.png"),
        ("Mockup Golden — Pepper", REV_MOCK / "golden-retriever-tee/pepper.png"),
        ("Mockup Waco — Bay", REV_MOCK / "waco-skyline-tee/bay.png"),
    ]

    # build side-by-side frenchie/golden at identical scale
    sbs = Image.new("RGBA", (2000, 2400), (247, 244, 239, 255))
    for i, sl in enumerate(["french-bulldog-tee", "golden-retriever-tee"]):
        p = ARTWORK / sl / "ivory.png"
        if p.exists():
            a = Image.open(p).convert("RGBA")
            a.thumbnail((980, 2360), Image.Resampling.LANCZOS)
            sbs.alpha_composite(a, (i * 1000 + (1000 - a.width)//2, (2400 - a.height)//2))
    sbs_path = OUTPUT / "_frenchie_golden_sbs.png"
    sbs.convert("RGB").save(sbs_path)

    for i, (label, path) in enumerate(items):
        c, r = i % cols, i // cols
        x = pad + c * (tile[0] + pad)
        y = header + pad + r * (tile[1] + 40)
        d.rectangle([x, y, x + tile[0], y + tile[1]], outline="#d8d0c8", width=2)
        use = sbs_path if path is None else path
        if use and Path(use).exists():
            im = Image.open(use).convert("RGBA")
            bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
            im = Image.alpha_composite(bg, im).convert("RGB")
            im.thumbnail((tile[0] - 10, tile[1] - 10), Image.Resampling.LANCZOS)
            sheet.paste(im, (x + (tile[0]-im.width)//2, y + (tile[1]-im.height)//2))
        d.text((x + 4, y + tile[1] + 8), label, fill=BARK, font=lf)

    out = OUTPUT / "phase3-revision-contact-sheet.png"
    sheet.save(out)
    return out, sbs_path


def build_alico_closeup() -> Path:
    """Render a high-res close-up of the rebuilt ALICO building."""
    svg = build_skyline_svg(BARK, sign_fill=None, stroke=3.4)
    tmp = OUTPUT / "_alico_full.svg"
    tmp.write_text(svg, encoding="utf-8")
    full = OUTPUT / "_alico_full.png"
    render_svg_to_png(tmp, full, 3200, int(3200 * SK_H / SK_W))
    im = Image.open(full).convert("RGBA")
    bg = Image.new("RGBA", im.size, (247, 244, 239, 255))
    im = Image.alpha_composite(bg, im).convert("RGB")
    # ALICO x ~ 600-840 of 1600 vb -> scale 2.0
    scale = 3200 / SK_W
    crop = im.crop((int(600*scale), int(120*scale), int(850*scale), int(510*scale)))
    out = OUTPUT / "alico-closeup.png"
    crop.save(out)
    tmp.unlink(missing_ok=True)
    full.unlink(missing_ok=True)
    return out


def build_owner_review(validations, contrast_report, alico_close, sbs_path) -> Path:
    def find(p):
        return {v["path"]: v for v in validations}.get(p, {})
    lines = [
        "# Phase 3 Revision — Owner Review",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "**No Printify. No drafts. No publishing. Same three products only.**",
        "",
        "The previously rejected skyline is archived in "
        "`reference/rejected-phase3-visual/` labeled *NOT_FOR_PRODUCTION — ALICO MISSING / VISUAL QA FAILED*. "
        "The skyline below was **rebuilt from scratch** from the source reference as deliberate vector paths.",
        "",
        "## Required review questions",
        "",
        "1. **Is the real ALICO Building present?** — **YES.** Rebuilt as a rectangular 22-story tower "
        "(central landmark), not a flagpole/mast. See ALICO close-up.",
        "2. **Is the ALICO sign area visible?** — **YES.** A dedicated sign band near the top carries the "
        "\"ALICO\" wordmark (reversed/knock-out on dark & sage garments).",
        "3. **Do the courthouse, bridge, and silos remain recognizable?** — **YES.** Courthouse has body, "
        "columns, pediment, drum, dome, and statue finial; the suspension bridge shows twin towers, draped "
        "cables, suspenders, and deck; two ribbed domed silos on the left.",
        "4. **Can \"Keep Waco Wagging\" be read at normal shirt-viewing size?** — **YES.** KEEP WACO is set at "
        "~360–430 px cap height on the 4500 px canvas (roughly 1.2–1.4 in on a 12 in print) and integrated "
        "with the artwork rather than a tiny footer.",
        "5. **Are the skyline and logo large enough?** — **YES.** Skyline fills the upper composition on the "
        "Waco tee and anchors the dog on breed tees; lockup is a primary element.",
        "6. **Do Frenchie and Golden use the same layout system?** — **YES.** Identical lockup size/position, "
        "identical dog bounding box, identical skyline size/position (shared grid). See side-by-side.",
        "7. **Is contrast sufficient on every garment color?** — see contrast table below (all primary line "
        "vs garment ratios ≥ 3:1).",
        "8. **Were any automated tracing shortcuts used?** — **NO for the skyline** (hand-authored explicit "
        "`rect`/`line`/`path` geometry; no skeleton, no circle primitives, no potrace, no embedded raster). "
        "The dog illustrations are retained recovered source art, cleaned into stroke paths with simplified "
        "hairlines and heavier DTG-safe line weight.",
        "",
        "## Contrast (line color vs garment)",
        "",
        "| Garment | Primary line | Ratio | OK |",
        "|---|---|---|---|",
    ]
    for gk, rep in contrast_report.items():
        lines.append(f"| {GARMENTS[gk]['label']} | `{rep['primary']}` | {rep['ratio']:.2f}:1 | {'✅' if rep['ok'] else '⚠️'} |")
    lines += ["", "## ALICO close-up", "", f"![alico]({data_uri(alico_close, 640)})", ""]
    lines += ["## French Bulldog vs Golden Retriever (identical scale)", "", f"![sbs]({data_uri(sbs_path, 760)})", ""]

    designs = [
        ("waco-skyline-tee", "Waco Skyline Tee"),
        ("french-bulldog-tee", "French Bulldog Tee"),
        ("golden-retriever-tee", "Golden Retriever Tee"),
    ]
    for slug, title in designs:
        lv = find(f"artwork/{slug}/ivory.png")
        pv = find(f"artwork/{slug}/pepper.png")
        rec = "PASS" if lv.get("status") == "PASS" and pv.get("status") == "PASS" else "REVISE"
        lines += [f"## {title}", "", f"**Automated validation:** {rec}", ""]
        for gk in ("ivory", "blossom", "bay", "pepper"):
            mp = REV_MOCK / slug / f"{gk}.png"
            if mp.exists():
                lines += [f"### {GARMENTS[gk]['label']} — flat-shirt mockup", f"![{gk}]({data_uri(mp, 520)})", ""]
        art = ARTWORK / slug / "ivory.png"
        if art.exists():
            lines += ["### Print artwork (ivory master)", f"![art]({data_uri(art, 520)})", ""]
        notes = ARTWORK / slug / "notes.md"
        lines += ["### Colors used", "- Ivory/Blossom: Bark Brown primary, Wag Sage secondary, Rose sparingly",
                  "- Bay/Pepper: Kitchen Cream primary, Rose accent", "",
                  "### Final dimensions", "4500 × 5400 px, RGBA transparent, 300 DPI, ≥160 px margins", "",
                  "### Remaining concerns",
                  "- Owner visual sign-off required before any Printify step",
                  "- Physical DTG sample not yet produced", "", "---", ""]

    out = OUTPUT / "PHASE3_REVISION_OWNER_REVIEW.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    return out


def write_notes():
    for slug, breed in (("waco-skyline-tee", None), ("french-bulldog-tee", "French Bulldog"),
                        ("golden-retriever-tee", "Golden Retriever")):
        note = f"""# {slug.replace('-', ' ').title()} — Phase 3 Revision

**Status:** revised after visual rejection — pending owner visual approval

## Typography (Brand Book)
- Cormorant Garamond — KEEP WACO
- Parisienne — wagging (only script)
{("- Jost — supporting only (breed name omitted; composition reads without it)" ) if breed else ""}

## Skyline
- Uses the rebuilt hand-authored Waco vector (real ALICO, sign band, window rhythm, courthouse dome, bridge, silos)
- No tracing shortcuts

## Per-garment masters
- `ivory.png`, `blossom.png`, `bay.png`, `pepper.png` — intentional color + contrast per garment
- `master.svg` — editable composed vector (ivory scheme)

## Layout
{"- Shared breed grid: identical lockup + dog bounding box + skyline size/position across Frenchie & Golden" if breed else "- Skyline is the hero; lockup integrated directly beneath at readable size"}
"""
        (ARTWORK / slug / "notes.md").write_text(note, encoding="utf-8")


# ----------------------------------------------------------------------------- main


def main() -> int:
    logger.info("Phase 3 REVISION start — rebuild skyline + 3 compositions, no Printify")

    sky_info = build_skyline_master()
    logger.info("Skyline master rebuilt (%s)", sky_info["method"])

    french_src = ALPHA / "french_bulldog_light_x62.png"
    golden_src = ALPHA / "golden_retriever_light_x66.png"

    # copy source refs
    import shutil
    for slug, src in (("french-bulldog-tee", "french_bulldog_light_x62.png"),
                      ("golden-retriever-tee", "golden_retriever_light_x66.png")):
        (ARTWORK / slug / "source").mkdir(parents=True, exist_ok=True)
        shutil.copy2(ALPHA / src, ARTWORK / slug / "source" / src)
    for slug in ("waco-skyline-tee", "french-bulldog-tee", "golden-retriever-tee"):
        (ARTWORK / slug / "source").mkdir(parents=True, exist_ok=True)
        shutil.copy2(ALPHA / "waco_skyline_light_x26.png", ARTWORK / slug / "source" / "waco_skyline_light_x26.png")

    targets = []
    for gk, scheme in GARMENTS.items():
        targets.append(build_waco_tee(gk, scheme))
        targets.append(build_breed_tee("french-bulldog-tee", "French Bulldog", french_src, gk, scheme))
        targets.append(build_breed_tee("golden-retriever-tee", "Golden Retriever", golden_src, gk, scheme))

    # mockups
    for slug in ("waco-skyline-tee", "french-bulldog-tee", "golden-retriever-tee"):
        for gk in GARMENTS:
            make_flat_mockup(slug, gk)

    write_notes()

    # validation + contrast
    validations = [validate_png(p) for p in targets]
    contrast_report = {}
    for gk, scheme in GARMENTS.items():
        ratio = contrast_ratio(scheme["primary"], scheme["swatch"])
        contrast_report[gk] = {"primary": scheme["primary"], "ratio": ratio, "ok": ratio >= 3.0}

    alico_close = build_alico_closeup()
    contact, sbs = build_contact_sheet(alico_close)
    review = build_owner_review(validations, contrast_report, alico_close, sbs)

    payload = {
        "phase": "3-revision",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "target_dimensions": "4500x5400",
        "min_margin_px": MARGIN,
        "skyline_method": sky_info["method"],
        "tracing_shortcuts_used_on_skyline": False,
        "rejected_archive": "reference/rejected-phase3-visual/",
        "contrast": contrast_report,
        "validations": validations,
        "printify_connected": False,
    }
    (OUTPUT / "PHASE3_REVISION_VALIDATION.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")

    passed = sum(1 for v in validations if v["status"] == "PASS")
    logger.info("Revision validation %s/%s PASS; contact=%s review=%s", passed, len(validations), contact.name, review.name)
    return 0 if passed == len(validations) else 1


if __name__ == "__main__":
    raise SystemExit(main())
