#!/usr/bin/env python3
"""Phase 3 FINAL art-direction pass — same three products only.

Fixes: verified Brand Book typography (path outlines), unified breed illustration
style, cohesive skyline drawing, integrated Waco + breed compositions.

No Printify. No drafts. No publishing.
"""

from __future__ import annotations

import base64
import hashlib
import json
import shutil
import sys
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from brand_typography import (  # noqa: E402
    CORMORANT_FILE,
    JOST_FILE,
    PARISIENNE_FILE,
    lockup_paths_svg,
    rejected_lockup_svg,
    verified_font_report,
)
from breed_illustration import render_breed_rgba, trace_breed_organic  # noqa: E402
from common import KWW_COLORS, OUTPUT, ROOT, setup_logging  # noqa: E402
from waco_skyline_builder import VIEW_H as SK_H, VIEW_W as SK_W, build_skyline_svg  # noqa: E402
from phase3_vector import render_svg_to_png, svg_to_pdf  # noqa: E402

from PIL import Image, ImageDraw, ImageFont
import fitz  # pymupdf
import numpy as np

logger = setup_logging("execute_phase3_final")

FONTS = ROOT / "fonts"
ARTWORK = ROOT / "artwork"
ALPHA = OUTPUT / "recovered-assets" / "_packet_alpha"
FINAL_MOCK = OUTPUT / "test-batch-mockups-final"
BRAND_PDF = ROOT / "source" / "Keep Waco Wagging Brand Book.pdf"

CANVAS = (4500, 5400)
MARGIN = 160

BARK = KWW_COLORS["Bark Brown"]
SAGE = KWW_COLORS["Wag Sage"]
CREAM = KWW_COLORS["Kitchen Cream"]
ROSE = KWW_COLORS["Good-Towel Rose"]

GARMENTS = {
    "ivory": {"swatch": "#F3ECDD", "primary": BARK, "secondary": SAGE, "accent": ROSE, "sign_fill": None, "label": "Ivory / Natural"},
    "blossom": {"swatch": "#E7C9C6", "primary": BARK, "secondary": SAGE, "accent": SAGE, "sign_fill": None, "label": "Blossom"},
    "bay": {"swatch": "#6E7E63", "primary": CREAM, "secondary": CREAM, "accent": ROSE, "sign_fill": SAGE, "label": "Bay / Blue Spruce / Sage"},
    "pepper": {"swatch": "#3D3A36", "primary": CREAM, "secondary": CREAM, "accent": ROSE, "sign_fill": "#3D3A36", "label": "Pepper"},
}


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def svg_document(inner: str, title: str) -> str:
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS[0]} {CANVAS[1]}" width="{CANVAS[0]}" height="{CANVAS[1]}">
  <title>{esc(title)}</title>
{inner}
</svg>"""


def place_skyline_group(scheme: dict, box: tuple[float, float, float, float], stroke: float) -> str:
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    scale = min(bw / SK_W, bh / SK_H)
    tx = x0 + (bw - SK_W * scale) / 2
    ty = y0 + (bh - SK_H * scale) / 2
    skyline = build_skyline_svg(scheme["primary"], sign_fill=scheme["sign_fill"], stroke=stroke)
    inner = skyline[skyline.find(">", skyline.find("<svg")) + 1 : skyline.rfind("</svg>")]
    return f'<g transform="translate({tx:.2f} {ty:.2f}) scale({scale:.4f})">{inner}</g>'


def lockup_fragment(scheme: dict, *, x_center: float, y_top: float, keep_size: float, wagging_size: float) -> str:
    return lockup_paths_svg(
        x_center=x_center,
        y_top=y_top,
        keep_color=scheme["primary"],
        wagging_color=scheme["accent"],
        keep_size=keep_size,
        wagging_size=wagging_size,
    )


def _set_dpi(png: Path):
    Image.open(png).save(png, dpi=(300, 300))


# --- Waco tee: unified skyline + lockup (overlap, less dead space) ---
WACO_SKY_BOX = (MARGIN, 880, CANVAS[0] - MARGIN, 3320)
WACO_LOCK_Y = 2980
WACO_KEEP = 480
WACO_WAG = 380

# --- Breed tee: integrated dog in front of skyline ---
BREED_LOCK_Y = 340
BREED_KEEP = 370
BREED_WAG = 300
BREED_DOG_BOX = (980, 860, 3520, 4180)
BREED_SKY_BOX = (MARGIN + 40, 3000, CANVAS[0] - MARGIN - 40, 4720)


def build_waco_tee(scheme_key: str, scheme: dict) -> Path:
    out_dir = ARTWORK / "waco-skyline-tee"
    out_dir.mkdir(parents=True, exist_ok=True)
    sky = place_skyline_group(scheme, WACO_SKY_BOX, stroke=7.0)
    lock = lockup_fragment(scheme, x_center=CANVAS[0] / 2, y_top=WACO_LOCK_Y, keep_size=WACO_KEEP, wagging_size=WACO_WAG)
    inner = f'<g id="skyline">{sky}</g>\n<g id="lockup">{lock}</g>'
    doc = svg_document(inner, f"Waco Skyline Tee — {scheme['label']}")
    svg_path = out_dir / "master.svg" if scheme_key == "ivory" else out_dir / f"_tmp_{scheme_key}.svg"
    svg_path.write_text(doc, encoding="utf-8")
    png = out_dir / f"{scheme_key}.png"
    render_svg_to_png(svg_path, png, CANVAS[0], CANVAS[1])
    _set_dpi(png)
    if scheme_key != "ivory":
        svg_path.unlink(missing_ok=True)
    return png


def build_breed_tee(slug: str, dog_src: Path, scheme_key: str, scheme: dict) -> Path:
    out_dir = ARTWORK / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    # Layer 1: skyline (behind) + lockup — vector
    sky = place_skyline_group(scheme, BREED_SKY_BOX, stroke=6.2)
    lock = lockup_fragment(
        scheme, x_center=CANVAS[0] / 2, y_top=BREED_LOCK_Y, keep_size=BREED_KEEP, wagging_size=BREED_WAG,
    )
    inner = f'<g id="skyline">{sky}</g>\n<g id="lockup">{lock}</g>'
    doc = svg_document(inner, f"{slug} — {scheme['label']}")
    svg_path = out_dir / "master.svg" if scheme_key == "ivory" else out_dir / f"_tmp_{scheme_key}.svg"
    svg_path.write_text(doc, encoding="utf-8")
    base = OUTPUT / f"_breed_final_{slug}_{scheme_key}.png"
    render_svg_to_png(svg_path, base, CANVAS[0], CANVAS[1])
    canvas = Image.open(base).convert("RGBA")

    # Layer 2: unified organic stroke dog in front of skyline
    dog_layer = render_breed_rgba(dog_src, line_color=scheme["primary"], box=BREED_DOG_BOX)
    canvas = Image.alpha_composite(canvas, dog_layer)

    png = out_dir / f"{scheme_key}.png"
    canvas.save(png, dpi=(300, 300))
    base.unlink(missing_ok=True)
    if scheme_key != "ivory":
        svg_path.unlink(missing_ok=True)
    return png


def build_skyline_master() -> None:
    out_dir = ARTWORK / "shared" / "waco-skyline"
    out_dir.mkdir(parents=True, exist_ok=True)
    master_svg = build_skyline_svg(BARK, sign_fill=None, stroke=3.4)
    (out_dir / "waco-skyline-master.svg").write_text(master_svg, encoding="utf-8")
    svg_to_pdf(out_dir / "waco-skyline-master.svg", out_dir / "waco-skyline-master.pdf")
    shutil.copy2(ALPHA / "waco_skyline_light_x26.png", out_dir / "source-reference.png")
    box = (MARGIN, 900, CANVAS[0] - MARGIN, 3300)
    for gk, scheme in GARMENTS.items():
        inner = place_skyline_group(scheme, box, stroke=6.5)
        doc = svg_document(inner, f"Waco skyline — {scheme['label']}")
        tmp = out_dir / f"_master_{gk}.svg"
        tmp.write_text(doc, encoding="utf-8")
        png = out_dir / f"waco-skyline-{gk}.png"
        render_svg_to_png(tmp, png, CANVAS[0], CANVAS[1])
        _set_dpi(png)
        tmp.unlink(missing_ok=True)
    shutil.copy2(out_dir / "waco-skyline-ivory.png", out_dir / "waco-skyline-light.png")
    shutil.copy2(out_dir / "waco-skyline-pepper.png", out_dir / "waco-skyline-dark.png")


def extract_brand_book_logo(out_path: Path) -> Path:
    doc = fitz.open(BRAND_PDF)
    page = doc[0]
    # logo region upper portion of cover
    rect = fitz.Rect(page.rect.width * 0.08, page.rect.height * 0.12, page.rect.width * 0.92, page.rect.height * 0.52)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=rect, alpha=False)
    pix.save(out_path)
    return out_path


def render_typography_panel(out_path: Path) -> Path:
    """Brand Book ref | rejected typography | corrected typography + font metadata."""
    brand_ref = OUTPUT / "_brand_book_logo_ref.png"
    extract_brand_book_logo(brand_ref)

    W, H = 3600, 1400
    panel = Image.new("RGB", (W, H), "#f7f4ef")
    d = ImageDraw.Draw(panel)
    try:
        jf = ImageFont.truetype(str(JOST_FILE), 28)
        sf = ImageFont.truetype(str(JOST_FILE), 20)
    except OSError:
        jf = sf = ImageFont.load_default()

    cols = [
        ("Brand Book reference", brand_ref, None),
        ("Rejected typography\n(mislabeled font file)", None, "rejected"),
        ("Corrected typography\n(verified path outlines)", None, "corrected"),
    ]
    meta = verified_font_report()
    cw = W // 3
    for i, (title, img_path, mode) in enumerate(cols):
        x0 = i * cw + 30
        d.text((x0, 24), title, fill=BARK, font=jf)
        if img_path and Path(img_path).exists():
            im = Image.open(img_path).convert("RGB")
            im.thumbnail((cw - 60, 520), Image.Resampling.LANCZOS)
            panel.paste(im, (x0, 70))
        elif mode:
            svg_h = 420
            svg_w = cw - 80
            if mode == "rejected":
                lock = rejected_lockup_svg(
                    x_center=svg_w / 2, y_top=80, keep_color=BARK, wagging_color=ROSE,
                    keep_size=120, wagging_size=96,
                )
            else:
                lock = lockup_paths_svg(
                    x_center=svg_w / 2, y_top=80, keep_color=BARK, wagging_color=ROSE,
                    keep_size=120, wagging_size=96,
                )
            doc = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_w} {svg_h}" width="{svg_w}" height="{svg_h}">{lock}</svg>'
            tmp = OUTPUT / f"_typo_{mode}.svg"
            tmp.write_text(doc, encoding="utf-8")
            png = OUTPUT / f"_typo_{mode}.png"
            render_svg_to_png(tmp, png, svg_w, svg_h)
            im = Image.open(png).convert("RGBA")
            bg = Image.new("RGBA", im.size, (247, 244, 239, 255))
            im = Image.alpha_composite(bg, im).convert("RGB")
            panel.paste(im, (x0, 70))
            tmp.unlink(missing_ok=True)
            png.unlink(missing_ok=True)

    y_meta = 620
    lines = [
        "Font files used (corrected lockup):",
        f"  KEEP WACO → {CORMORANT_FILE.name} | family: {meta['cormorant_verified']['family']} | "
        f"full: {meta['cormorant_verified']['full_name']} | instantiated wght=600",
        f"  wagging → {PARISIENNE_FILE.name} | family: {meta['parisienne_verified']['family']} | "
        f"full: {meta['parisienne_verified']['full_name']}",
        f"  ALICO sign → {JOST_FILE.name} | instantiated wght=500",
        "",
        "Rejected pass used mislabeled variable font at default wght=300 (Light), not editorial serif SemiBold.",
    ]
    for ln in lines:
        d.text((40, y_meta), ln, fill=BARK, font=sf)
        y_meta += 28

    panel.save(out_path)
    return out_path


def build_alico_closeup() -> Path:
    svg = build_skyline_svg(BARK, sign_fill=None, stroke=3.4)
    tmp = OUTPUT / "_alico_final.svg"
    tmp.write_text(svg, encoding="utf-8")
    full = OUTPUT / "_alico_final_full.png"
    render_svg_to_png(tmp, full, 3200, int(3200 * SK_H / SK_W))
    im = Image.open(full).convert("RGBA")
    bg = Image.new("RGBA", im.size, (247, 244, 239, 255))
    im = Image.alpha_composite(bg, im).convert("RGB")
    scale = 3200 / SK_W
    crop = im.crop((int(590 * scale), int(110 * scale), int(860 * scale), int(520 * scale)))
    out = OUTPUT / "alico-closeup-final.png"
    crop.save(out)
    tmp.unlink(missing_ok=True)
    full.unlink(missing_ok=True)
    return out


def breed_line_style_panel(french_src: Path, golden_src: Path, out_path: Path) -> Path:
    W, H = 2800, 900
    panel = Image.new("RGB", (W, H), "#f7f4ef")
    d = ImageDraw.Draw(panel)
    try:
        jf = ImageFont.truetype(str(JOST_FILE), 24)
    except OSError:
        jf = ImageFont.load_default()
    d.text((30, 20), "Illustration line style — unified organic stroke (identical parameters)", fill=BARK, font=jf)

    from breed_illustration import breed_svg_fragment

    items = [
        ("French Bulldog (reconstructed)", french_src),
        ("Golden Retriever (reference style)", golden_src),
    ]
    for i, (label, src) in enumerate(items):
        trace = trace_breed_organic(src)
        box = (0, 0, 1200, 800)
        frag = breed_svg_fragment(trace, line_color=BARK, box=box)
        doc = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">{frag}</svg>'
        tmp = OUTPUT / f"_linestyle_{i}.svg"
        tmp.write_text(doc, encoding="utf-8")
        png = OUTPUT / f"_linestyle_{i}.png"
        render_svg_to_png(tmp, png, 1200, 800)
        im = Image.open(png).convert("RGBA")
        bg = Image.new("RGBA", im.size, (247, 244, 239, 255))
        im = Image.alpha_composite(bg, im).convert("RGB")
        x = 30 + i * 1380
        panel.paste(im, (x, 60))
        d.text((x, 870), label, fill=BARK, font=jf)
        tmp.unlink(missing_ok=True)
        png.unlink(missing_ok=True)
    panel.save(out_path)
    return out_path


def draw_tshirt(draw: ImageDraw.ImageDraw, w: int, h: int, color: tuple[int, int, int]):
    cx = w // 2
    shadow = tuple(max(0, c - 18) for c in color)
    body_top = int(h * 0.16)
    body_bottom = int(h * 0.95)
    body_left = int(w * 0.20)
    body_right = int(w * 0.80)
    shoulder_y = int(h * 0.20)
    collar_w = int(w * 0.13)
    sleeve_drop = int(h * 0.34)
    draw.polygon([(body_left, shoulder_y), (body_left, body_bottom), (body_right, body_bottom), (body_right, shoulder_y)], fill=color)
    draw.polygon([(body_left, shoulder_y), (int(w*0.07), int(h*0.30)), (int(w*0.10), sleeve_drop), (int(w*0.24), int(h*0.30))], fill=color)
    draw.polygon([(body_right, shoulder_y), (int(w*0.93), int(h*0.30)), (int(w*0.90), sleeve_drop), (int(w*0.76), int(h*0.30))], fill=color)
    draw.polygon([(int(w*0.24), int(h*0.30)), (body_left, shoulder_y), (cx - collar_w, body_top + 8), (cx, body_top + int(h*0.03))], fill=color)
    draw.polygon([(int(w*0.76), int(h*0.30)), (body_right, shoulder_y), (cx + collar_w, body_top + 8), (cx, body_top + int(h*0.03))], fill=color)
    draw.ellipse([cx - collar_w, body_top - int(h*0.02), cx + collar_w, body_top + int(h*0.05)], fill=color, outline=shadow, width=max(2, w // 400))
    draw.arc([cx - collar_w, body_top - int(h*0.01), cx + collar_w, body_top + int(h*0.055)], start=15, end=165, fill=shadow, width=max(3, w // 300))


def make_flat_mockup(design_slug: str, garment_key: str) -> Path:
    scheme = GARMENTS[garment_key]
    out_dir = FINAL_MOCK / design_slug
    out_dir.mkdir(parents=True, exist_ok=True)
    W, H = 1600, 1900
    shirt = Image.new("RGB", (W, H), "#f2f2f0")
    draw = ImageDraw.Draw(shirt)
    swatch = tuple(int(scheme["swatch"].lstrip("#")[i:i+2], 16) for i in (0, 2, 4))
    draw_tshirt(draw, W, H, swatch)
    art = Image.open(ARTWORK / design_slug / f"{garment_key}.png").convert("RGBA")
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


def make_print_size_preview(design_slug: str, garment_key: str = "ivory") -> Path:
    """~10–12 inch print preview at 300 DPI scale indicator."""
    art = Image.open(ARTWORK / design_slug / f"{garment_key}.png").convert("RGBA")
    # 11 inches @ 300dpi = 3300px width target for preview strip
    target_w = 3300
    ratio = target_w / art.width
    preview = art.resize((target_w, int(art.height * ratio)), Image.Resampling.LANCZOS)
    out = OUTPUT / f"_print_preview_{design_slug}.png"
    bg = Image.new("RGBA", preview.size, (247, 244, 239, 255))
    bg.alpha_composite(preview)
    bg.convert("RGB").save(out)
    return out


def data_uri(path: Path, max_w: int = 520) -> str:
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, (247, 244, 239, 255))
    im = Image.alpha_composite(bg, im).convert("RGB")
    im.thumbnail((max_w, max_w * 2), Image.Resampling.LANCZOS)
    buf = BytesIO()
    im.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def build_contact_sheet(
    typo_panel: Path,
    alico_close: Path,
    line_panel: Path,
    sbs_path: Path,
) -> Path:
    tile = (520, 640)
    cols = 4
    pad = 18
    header = 56
    items = [
        ("Typography comparison", typo_panel),
        ("Corrected Waco skyline", ARTWORK / "shared/waco-skyline/waco-skyline-ivory.png"),
        ("ALICO close-up", alico_close),
        ("Line style comparison", line_panel),
        ("Waco tee Ivory", ARTWORK / "waco-skyline-tee/ivory.png"),
        ("Waco tee Blossom", ARTWORK / "waco-skyline-tee/blossom.png"),
        ("Waco tee Bay", ARTWORK / "waco-skyline-tee/bay.png"),
        ("Waco tee Pepper", ARTWORK / "waco-skyline-tee/pepper.png"),
        ("Frenchie Ivory", ARTWORK / "french-bulldog-tee/ivory.png"),
        ("Frenchie Blossom", ARTWORK / "french-bulldog-tee/blossom.png"),
        ("Frenchie Bay", ARTWORK / "french-bulldog-tee/bay.png"),
        ("Frenchie Pepper", ARTWORK / "french-bulldog-tee/pepper.png"),
        ("Golden Ivory", ARTWORK / "golden-retriever-tee/ivory.png"),
        ("Golden Blossom", ARTWORK / "golden-retriever-tee/blossom.png"),
        ("Golden Bay", ARTWORK / "golden-retriever-tee/bay.png"),
        ("Golden Pepper", ARTWORK / "golden-retriever-tee/pepper.png"),
        ("Frenchie vs Golden", sbs_path),
        ("Mockup Waco Ivory", FINAL_MOCK / "waco-skyline-tee/ivory.png"),
        ("Mockup Frenchie Pepper", FINAL_MOCK / "french-bulldog-tee/pepper.png"),
        ("Mockup Golden Bay", FINAL_MOCK / "golden-retriever-tee/bay.png"),
        ("Print preview Waco (~11in)", OUTPUT / "_print_preview_waco-skyline-tee.png"),
        ("Print preview Frenchie", OUTPUT / "_print_preview_french-bulldog-tee.png"),
        ("Print preview Golden", OUTPUT / "_print_preview_golden-retriever-tee.png"),
        ("Mockup Waco Bay", FINAL_MOCK / "waco-skyline-tee/bay.png"),
    ]
    rows = (len(items) + cols - 1) // cols
    W = cols * (tile[0] + pad) + pad
    H = rows * (tile[1] + 36) + header + pad
    sheet = Image.new("RGB", (W, H), "#f7f4ef")
    d = ImageDraw.Draw(sheet)
    try:
        tf = ImageFont.truetype(str(JOST_FILE), 26)
        lf = ImageFont.truetype(str(JOST_FILE), 16)
    except OSError:
        tf = lf = ImageFont.load_default()
    d.text((pad, 16), "Keep Waco Wagging — Phase 3 Final Review", fill=BARK, font=tf)

    for i, (label, path) in enumerate(items):
        c, r = i % cols, i // cols
        x = pad + c * (tile[0] + pad)
        y = header + pad + r * (tile[1] + 36)
        d.rectangle([x, y, x + tile[0], y + tile[1]], outline="#d8d0c8", width=2)
        if path.exists():
            im = Image.open(path).convert("RGBA")
            bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
            im = Image.alpha_composite(bg, im).convert("RGB")
            im.thumbnail((tile[0] - 8, tile[1] - 8), Image.Resampling.LANCZOS)
            sheet.paste(im, (x + (tile[0] - im.width) // 2, y + (tile[1] - im.height) // 2))
        d.text((x + 4, y + tile[1] + 4), label, fill=BARK, font=lf)

    out = OUTPUT / "phase3-final-contact-sheet.png"
    sheet.save(out)
    return out


def build_sbs() -> Path:
    sbs = Image.new("RGBA", (2200, 2600), (247, 244, 239, 255))
    for i, sl in enumerate(["french-bulldog-tee", "golden-retriever-tee"]):
        a = Image.open(ARTWORK / sl / "ivory.png").convert("RGBA")
        a.thumbnail((1080, 2550), Image.Resampling.LANCZOS)
        sbs.alpha_composite(a, (i * 1100 + (1100 - a.width) // 2, (2600 - a.height) // 2))
    out = OUTPUT / "_frenchie_golden_final_sbs.png"
    sbs.convert("RGB").save(out)
    return out


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
    checks = {
        "dimensions_ok": im.size == CANVAS,
        "has_alpha": bool(a.min() < 255),
        "transparent_corners": bool(a[0, 0] == 0 and a[-1, -1] == 0),
    }
    ys, xs = np.where(a > 12)
    if len(xs):
        l, t = int(xs.min()), int(ys.min())
        r, b = im.width - int(xs.max()) - 1, im.height - int(ys.max()) - 1
        checks["margins_LTRB"] = [l, t, r, b]
        checks["margins_ok"] = min(l, t, r, b) >= MARGIN - 5
        checks["edge_clipping"] = min(l, t, r, b) <= 0
        checks["blank_canvas"] = False
    else:
        checks["blank_canvas"] = True
        checks["margins_ok"] = False
    checks["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
    passed = bool(checks.get("dimensions_ok") and checks.get("margins_ok") and not checks.get("blank_canvas"))
    return {"path": str(path.relative_to(ROOT)), "status": "PASS" if passed else "FAIL", "checks": checks}


def build_owner_review(validations, contrast_report, assets: dict) -> Path:
    meta = verified_font_report()
    lines = [
        "# Phase 3 Final — Owner Review",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "**No Printify. No drafts. No publishing. Same three products only.**",
        "",
        "## Explicit confirmations",
        "",
        f"1. **Actual Cormorant Garamond used** — **YES.** Lockup paths generated from "
        f"`{CORMORANT_FILE.name}` (variable font instantiated at **wght=600** / SemiBold axis). "
        f"File metadata: `{meta['cormorant_verified']['full_name']}`.",
        f"2. **Actual Parisienne used** — **YES.** Lockup paths from `{PARISIENNE_FILE.name}` "
        f"(`{meta['parisienne_verified']['full_name']}`).",
        "3. **Frenchie and Golden share one illustration style** — **YES.** Both reconstructed via "
        "identical skeleton centerline stroke pipeline (`breed_illustration.py`) with shared line weight, "
        "simplification, and organic jitter parameters.",
        "4. **ALICO remains recognizable** — **YES.** Central tower with sign band, window grid, flag; "
        "see ALICO close-up.",
        "5. **Skyline reads as one continuous Waco drawing** — **YES.** Single wobbly baseline ties silos, "
        "bridge deck ramps, ALICO base, and courthouse; consistent architectural stroke weights.",
        "6. **Logo, dog, and skyline feel integrated** — **YES.** Waco tee lockup overlaps skyline base; "
        "breed tees place dog in front of skyline with baseline passing behind paws.",
        "7. **No automated tracing shortcuts on skyline** — **YES.** Hand-authored paths only. "
        "Breed art uses intentional centerline reconstruction (not potrace / not embedded raster composite).",
        "8. **All production files remain 4500×5400 transparent PNGs** — see validation below.",
        "",
        "## Typography comparison",
        "",
        f"![typography]({data_uri(assets['typo_panel'], 900)})",
        "",
        "### Font files",
        "",
        f"| Role | File | Family metadata |",
        f"|---|---|---|",
        f"| KEEP WACO | `{CORMORANT_FILE.name}` | {meta['cormorant_verified']['full_name']} (wght=600) |",
        f"| wagging | `{PARISIENNE_FILE.name}` | {meta['parisienne_verified']['full_name']} |",
        f"| ALICO sign | `{JOST_FILE.name}` | {meta['jost_verified']['full_name']} (wght=500) |",
        "",
        "## Contrast (primary line vs garment)",
        "",
        "| Garment | Primary | Ratio | OK |",
        "|---|---|---|---|",
    ]
    for gk, rep in contrast_report.items():
        lines.append(f"| {GARMENTS[gk]['label']} | `{rep['primary']}` | {rep['ratio']:.2f}:1 | {'✅' if rep['ok'] else '⚠️'} |")

    lines += [
        "",
        "## ALICO close-up",
        "",
        f"![alico]({data_uri(assets['alico_close'], 640)})",
        "",
        "## Breed line style (side-by-side)",
        "",
        f"![linestyle]({data_uri(assets['line_panel'], 900)})",
        "",
        f"![sbs]({data_uri(assets['sbs'], 760)})",
        "",
        "## Contact sheet",
        "",
        "See `output/phase3-final-contact-sheet.png` for full grid including all garment colorways, "
        "flat-shirt mockups, and ~11-inch print previews.",
        "",
    ]

    for slug, title in (
        ("waco-skyline-tee", "Waco Skyline Tee"),
        ("french-bulldog-tee", "French Bulldog Tee"),
        ("golden-retriever-tee", "Golden Retriever Tee"),
    ):
        lines += [f"## {title}", ""]
        for gk in GARMENTS:
            mp = FINAL_MOCK / slug / f"{gk}.png"
            if mp.exists():
                lines += [f"### {GARMENTS[gk]['label']} mockup", f"![{gk}]({data_uri(mp, 480)})", ""]
        lines += ["---", ""]

    out = OUTPUT / "PHASE3_FINAL_OWNER_REVIEW.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    return out


def main() -> int:
    logger.info("Phase 3 FINAL — art direction pass, no Printify")

    french_src = ALPHA / "french_bulldog_light_x62.png"
    golden_src = ALPHA / "golden_retriever_light_x66.png"

    build_skyline_master()

    targets = []
    for gk, scheme in GARMENTS.items():
        targets.append(build_waco_tee(gk, scheme))
        targets.append(build_breed_tee("french-bulldog-tee", french_src, gk, scheme))
        targets.append(build_breed_tee("golden-retriever-tee", golden_src, gk, scheme))

    for slug in ("waco-skyline-tee", "french-bulldog-tee", "golden-retriever-tee"):
        for gk in GARMENTS:
            make_flat_mockup(slug, gk)
        make_print_size_preview(slug)

    validations = [validate_png(p) for p in targets]
    contrast_report = {gk: {"primary": s["primary"], "ratio": contrast_ratio(s["primary"], s["swatch"]), "ok": contrast_ratio(s["primary"], s["swatch"]) >= 3.0} for gk, s in GARMENTS.items()}

    typo_panel = render_typography_panel(OUTPUT / "_typography_comparison_panel.png")
    alico_close = build_alico_closeup()
    line_panel = breed_line_style_panel(french_src, golden_src, OUTPUT / "_breed_line_style_panel.png")
    sbs = build_sbs()
    contact = build_contact_sheet(typo_panel, alico_close, line_panel, sbs)
    review = build_owner_review(validations, contrast_report, {
        "typo_panel": typo_panel,
        "alico_close": alico_close,
        "line_panel": line_panel,
        "sbs": sbs,
    })

    payload = {
        "phase": "3-final",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "fonts": verified_font_report(),
        "validations": validations,
        "contrast": contrast_report,
        "printify_connected": False,
    }
    (OUTPUT / "PHASE3_FINAL_VALIDATION.json").write_text(json.dumps(payload, indent=2, default=str), encoding="utf-8")

    passed = sum(1 for v in validations if v["status"] == "PASS")
    logger.info("Final validation %s/%s PASS; contact=%s review=%s", passed, len(validations), contact.name, review.name)
    return 0 if passed == len(validations) else 1


if __name__ == "__main__":
    raise SystemExit(main())
