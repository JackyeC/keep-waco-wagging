#!/usr/bin/env python3
"""Waco skyline packet source review — owner approval package.

Read-only against source masters. Does not modify recovered assets.
No tracing, redraw, Printify, or production overwrite.
"""

from __future__ import annotations

import hashlib
import json
import shutil
import sys
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from brand_typography import lockup_paths_svg  # noqa: E402
from common import KWW_COLORS, OUTPUT, ROOT, setup_logging  # noqa: E402
from phase3_vector import render_svg_to_png  # noqa: E402

from PIL import Image, ImageDraw, ImageFont

MASTER = ROOT / "output/recovered-assets/_packet_alpha/waco_skyline_light_x26.png"
REVIEW = OUTPUT / "waco-packet-source-review"
WORK = REVIEW / "_work"
CANVAS = (4500, 5400)

BARK = KWW_COLORS["Bark Brown"]
ROSE = KWW_COLORS["Good-Towel Rose"]
IVORY = KWW_COLORS["Kitchen Cream"]

# Landmark annotation boxes on 1536x1024 master (x0, y0, x1, y1)
LANDMARKS = [
    ("Magnolia Silos", (214, 350, 410, 735), "#2563EB"),
    ("Waco Suspension Bridge", (400, 300, 640, 735), "#059669"),
    ("ALICO Building", (620, 210, 860, 735), "#DC2626"),
    ("McLennan County Courthouse", (1020, 380, 1290, 735), "#9333EA"),
    ("Waco, TX script (embedded raster)", (520, 700, 980, 780), "#6B7280"),
]

PAT_NEFF_ZONE = (980, 320, 1310, 760)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def rel_path(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def analyze_image(path: Path) -> dict:
    im = Image.open(path)
    im.load()
    info = {
        "path": rel_path(path),
        "absolute": str(path.resolve()),
        "size_px": [im.width, im.height],
        "mode": im.mode,
        "format": im.format,
        "dpi_metadata": im.info.get("dpi"),
        "bytes": path.stat().st_size,
        "sha256": sha256(path),
    }
    if im.mode == "RGBA":
        bbox = im.split()[-1].getbbox()
        info["alpha_bbox"] = list(bbox) if bbox else None
    return info


def discover_assets() -> list[dict]:
    roots = [ROOT, Path("/Users/jackyeclayton/.cursor/projects/Users-jackyeclayton-Projects-keep-waco-wagging/assets")]
    hits: list[dict] = []
    seen_hashes: set[str] = set()
    for root in roots:
        if not root.exists():
            continue
        for p in root.rglob("*"):
            if p.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp", ".svg", ".pdf"}:
                continue
            name = p.name.lower()
            if not any(k in name for k in ("waco", "skyline", "alico")):
                continue
            if "san_antonio" in name or "austin_skyline" in name or "dallas_skyline" in name:
                continue
            try:
                h = sha256(p)
            except OSError:
                continue
            if h in seen_hashes and p.suffix.lower() == ".png":
                duplicate_of = True
            else:
                duplicate_of = False
                if p.suffix.lower() == ".png":
                    seen_hashes.add(h)
            category = classify_asset(p)
            if category == "skip":
                continue
            meta = analyze_image(p) if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"} else {
                "path": str(p.relative_to(root) if p.is_relative_to(root) else p),
                "bytes": p.stat().st_size,
                "sha256": h,
            }
            hits.append(
                {
                    **meta,
                    "category": category,
                    "duplicate_of_master": duplicate_of,
                }
            )
    hits.sort(key=lambda x: (-x.get("size_px", [0, 0])[0] * x.get("size_px", [0, 0])[1] if isinstance(x.get("size_px"), list) else 0, x.get("path", "")))
    return hits


def classify_asset(p: Path) -> str:
    s = str(p).lower()
    if "rejected-phase3" in s or "waco-skyline-rebuild-review" in s:
        return "rejected_derivative"
    if "test-batch-mockup" in s or "_print_preview" in s:
        return "derivative_mockup"
    if "waco_skyline_light_x26" in s or s.endswith("/waco_light.png"):
        return "packet_master_light"
    if "waco_skyline_dark_x29" in s or s.endswith("/waco_dark.png"):
        return "packet_master_dark"
    if "_packet_alpha/waco" in s:
        return "packet_variant"
    if "golden_mockup" in s or "golden-retriever" in s and "mockup" in s:
        return "deprecated_reference"
    if "assets/waco" in s:
        return "owner_reference"
    if "contact-sheet" in s or "object-extraction" in s:
        return "analysis_artifact"
    if p.suffix.lower() == ".pdf":
        return "source_container"
    if "artwork/waco-skyline-tee" in s and "source" in s:
        return "source_copy"
    if "artwork/shared/waco-skyline/source-reference" in s:
        return "source_copy"
    if "programmatic" in s or "waco_skyline_rebuild" in s:
        return "rejected_derivative"
    if "waco" in s and "skyline" in s:
        return "related"
    if "waco" in s:
        return "related"
    return "skip"


def copy_master_untouched() -> Path:
    dest = REVIEW / "1_master_untouched_waco_skyline_light_x26.png"
    if not dest.exists():
        shutil.copy2(MASTER, dest)
    return dest


def labeled_landmarks(src: Path) -> Path:
    im = Image.open(src).convert("RGBA")
    overlay = im.copy()
    draw = ImageDraw.Draw(overlay)
    try:
        font = ImageFont.truetype(str(ROOT / "fonts/Jost-Medium-500.ttf"), 22)
        small = ImageFont.truetype(str(ROOT / "fonts/Jost-Medium-500.ttf"), 18)
    except OSError:
        font = small = ImageFont.load_default()

    for label, (x0, y0, x1, y1), color in LANDMARKS:
        draw.rectangle([x0, y0, x1, y1], outline=color, width=3)
        draw.text((x0 + 6, max(8, y0 - 26)), label, fill=color, font=font)

    out = REVIEW / "2_labeled_landmarks.png"
    overlay.save(out, dpi=(300, 300))
    return out


def pat_neff_markup(src: Path) -> Path:
    im = Image.open(src).convert("RGBA")
    draw = ImageDraw.Draw(im)
    try:
        font = ImageFont.truetype(str(ROOT / "fonts/Jost-Medium-500.ttf"), 24)
        small = ImageFont.truetype(str(ROOT / "fonts/Jost-Medium-500.ttf"), 18)
    except OSError:
        font = small = ImageFont.load_default()

    x0, y0, x1, y1 = PAT_NEFF_ZONE
    draw.rectangle([x0, y0, x1, y1], outline="#EA580C", width=4)
    draw.line([x0, y0, x1, y1], fill="#EA580C", width=2)
    draw.line([x0, y1, x1, y0], fill="#EA580C", width=2)
    draw.text((x0 + 8, y0 - 30), "PROPOSED PAT NEFF HALL ZONE", fill="#EA580C", font=font)
    notes = [
        "Do not draw replacement yet.",
        "Human illustrator should evaluate replacing",
        "McLennan County Courthouse dome structure",
        "while preserving skyline balance.",
    ]
    ny = y1 + 12
    for line in notes:
        draw.text((x0 - 40, ny), line, fill="#EA580C", font=small)
        ny += 22

    out = REVIEW / "5_pat_neff_placement_markup.png"
    im.save(out, dpi=(300, 300))
    return out


def render_lockup_png() -> Path:
    svg_inner = lockup_paths_svg(
        x_center=CANVAS[0] / 2,
        y_top=3000,
        keep_color=BARK,
        wagging_color=ROSE,
        keep_size=480,
        wagging_size=380,
    )
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS[0]} {CANVAS[1]}" width="{CANVAS[0]}" height="{CANVAS[1]}">
<rect width="100%" height="100%" fill="white"/>
{svg_inner}
</svg>"""
    tmp = WORK / "lockup_only.svg"
    WORK.mkdir(parents=True, exist_ok=True)
    tmp.write_text(svg, encoding="utf-8")
    out = WORK / "lockup_only.png"
    render_svg_to_png(tmp, out, CANVAS[0], CANVAS[1])
    return out


def lockup_composite_mockup(master: Path) -> Path:
    """Duplicate-based mockup: recovered skyline + brand lockup below (script preserved)."""
    src = Image.open(master).convert("RGBA")
    canvas = Image.new("RGBA", CANVAS, (255, 255, 255, 255))

    # Fit skyline in upper chest zone, preserving embedded Waco TX script for now
    target_w = int(CANVAS[0] * 0.78)
    scale = target_w / src.width
    target_h = int(src.height * scale)
    sky = src.resize((target_w, target_h), Image.Resampling.LANCZOS)
    sx = (CANVAS[0] - target_w) // 2
    sy = 780
    canvas.alpha_composite(sky, (sx, sy))

    lock = Image.open(render_lockup_png()).convert("RGBA")
    # lockup only - crop to lower band to avoid double white
    lock_band = lock.crop((0, 2700, CANVAS[0], 4200))
    canvas.alpha_composite(lock_band, (0, sy + target_h - 120))

    out = REVIEW / "4_mockup_recovered_skyline_plus_lockup.png"
    rgb = Image.new("RGB", CANVAS, "white")
    rgb.paste(canvas, mask=canvas.split()[-1])
    rgb.save(out, dpi=(300, 300))
    return out


def ivory_shirt_mockup(composed: Path) -> Path:
    base = Image.open(composed).convert("RGBA")
    shirt_w, shirt_h = 1800, 2150
    shirt = Image.new("RGB", (shirt_w, shirt_h), "#f2f2f0")
    draw = ImageDraw.Draw(shirt)
    ivory = tuple(int(IVORY.lstrip("#")[i : i + 2], 16) for i in (0, 2, 4))
    shadow = tuple(max(0, c - 24) for c in ivory)
    cx = shirt_w // 2
    body_top, body_bottom = int(shirt_h * 0.18), int(shirt_h * 0.88)
    body_left, body_right = int(shirt_w * 0.28), int(shirt_w * 0.72)
    shoulder_y = int(shirt_h * 0.24)
    draw.polygon([(body_left, shoulder_y), (body_left, body_bottom), (body_right, body_bottom), (body_right, shoulder_y)], fill=ivory)
    draw.polygon([(body_left, shoulder_y), (int(shirt_w * 0.07), int(shirt_h * 0.30)), (int(shirt_w * 0.10), int(shirt_h * 0.42)), (int(shirt_w * 0.24), int(shirt_h * 0.30))], fill=ivory)
    draw.polygon([(body_right, shoulder_y), (int(shirt_w * 0.93), int(shirt_h * 0.30)), (int(shirt_w * 0.90), int(shirt_h * 0.42)), (int(shirt_w * 0.76), int(shirt_h * 0.30))], fill=ivory)
    draw.ellipse([cx - int(shirt_w * 0.11), body_top - int(shirt_h * 0.02), cx + int(shirt_w * 0.11), body_top + int(shirt_h * 0.05)], fill=ivory, outline=shadow, width=2)

    chest_left, chest_right = int(shirt_w * 0.30), int(shirt_w * 0.70)
    chest_top, chest_bottom = int(shirt_h * 0.22), int(shirt_h * 0.62)
    cw, ch = chest_right - chest_left, chest_bottom - chest_top
    fit = min(cw / base.width, ch / base.height) * 0.88
    pw, ph = int(base.width * fit), int(base.height * fit)
    art = base.resize((pw, ph), Image.Resampling.LANCZOS)
    ox = chest_left + (cw - pw) // 2
    oy = chest_top + int(ch * 0.46) - ph // 2
    shirt.paste(art, (ox, oy), art)
    out = REVIEW / "4b_ivory_chest_mockup_recovered_plus_lockup.png"
    shirt.save(out, dpi=(300, 300))
    return out


def production_assessment(master_info: dict) -> dict:
    alpha_bbox = master_info.get("alpha_bbox") or [12, 0, 1512, 1024]
    art_w = alpha_bbox[2] - alpha_bbox[0]
    art_h = alpha_bbox[3] - alpha_bbox[1]
    for chest_in in (10.0, 10.5, 11.0, 11.5):
        eff_dpi = art_w / chest_in
    recommended_width_in = 10.5
    effective_dpi = art_w / recommended_width_in
    return {
        "native_art_pixel_width": art_w,
        "native_art_pixel_height": art_h,
        "native_file_size": master_info["size_px"],
        "embedded_dpi_metadata": master_info.get("dpi_metadata"),
        "recommended_chest_print_width_inches": recommended_width_in,
        "effective_dpi_at_recommended_width": round(effective_dpi, 1),
        "target_dpi": 300,
        "sufficient_for_native_300dpi_print": effective_dpi >= 280,
        "upscale_required": effective_dpi < 280,
        "recommended_upscale_factor_to_300dpi": round((300 * recommended_width_in) / art_w, 2),
        "upscale_risk": "Blind AI/upscale may soften ALICO window grid and bridge cables; prefer human illustrator rebuild or controlled vector overlay at higher resolution.",
        "cleanup_likely_needed": [
            "Mask or replace embedded 'Waco, TX' script without damaging skyline baseline",
            "Integrate Pat Neff Hall in marked zone via human illustration edit",
            "Optional: strengthen faint silos/bridge lines if they print too light on dark garments",
        ],
        "cannot_be_done_reliably_in_code": [
            "Pat Neff Hall illustration",
            "Courthouse-to-Pat-Neff architectural replacement",
            "Auto-tracing to SVG (destroys ALICO detail — confirmed in Phase 2)",
            "Blind upscale to production resolution without art direction",
            "Removing script via automated inpainting without visual QA",
        ],
        "best_master_verdict": "output/recovered-assets/_packet_alpha/waco_skyline_light_x26.png",
        "dark_garment_companion": "output/recovered-assets/_packet_alpha/waco_skyline_dark_x29.png",
    }


def build_asset_contact_sheet(assets: list[dict], out: Path) -> None:
    thumbs: list[tuple[str, Image.Image]] = []
    for item in assets:
        p = Path(item["path"]) if item["path"].startswith("/") else ROOT / item["path"]
        if not p.exists() or p.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        if item.get("category") in {"derivative_mockup", "analysis_artifact"} and "object-extraction" not in p.name:
            continue
        try:
            im = Image.open(p).convert("RGBA")
        except Exception:
            continue
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.split()[-1])
        im = bg
        label = f"{item.get('category','?')} | {p.name}\n{item.get('size_px', ['?','?'])[0]}x{item.get('size_px', ['?','?'])[1]}"
        thumbs.append((label, im))

    cols, cell_w, cell_h = 4, 520, 420
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w + 40, rows * cell_h + 80), "#F7F5F1")
    draw = ImageDraw.Draw(sheet)
    draw.text((20, 20), "Waco Skyline Asset Inventory — All Matches Found", fill="#111")
    try:
        font = ImageFont.truetype(str(ROOT / "fonts/Jost-Medium-500.ttf"), 14)
    except OSError:
        font = ImageFont.load_default()
    for i, (label, im) in enumerate(thumbs[:20]):
        r, c = divmod(i, cols)
        x, y = 20 + c * cell_w, 60 + r * cell_h
        preview = im.copy()
        preview.thumbnail((cell_w - 20, cell_h - 60), Image.Resampling.LANCZOS)
        px = x + (cell_w - 20 - preview.width) // 2
        py = y + 36
        sheet.paste(preview, (px, py))
        draw.text((x, y), label[:70], fill="#333", font=font)
    sheet.save(out, dpi=(300, 300))


def build_summary_sheet(paths: dict[str, Path]) -> Path:
    sheet = Image.new("RGB", (3400, 2400), "#F7F5F1")
    draw = ImageDraw.Draw(sheet)
    draw.text((30, 20), "Waco Packet Source Review — Owner Approval Package", fill="#111")
    slots = [
        (30, 70, 820, 520, "1. Untouched master"),
        (860, 70, 1650, 520, "2. Labeled landmarks"),
        (1690, 70, 2480, 520, "4. Skyline + lockup mockup"),
        (30, 560, 820, 1010, "4b. Ivory chest mockup"),
        (860, 560, 1650, 1010, "5. Pat Neff placement markup"),
        (1690, 560, 2480, 1010, "3. Asset inventory excerpt"),
    ]
    keys = [
        "master",
        "labeled",
        "lockup_mockup",
        "ivory_mockup",
        "pat_neff_markup",
        "asset_sheet",
    ]
    for (x0, y0, x1, y1, title), key in zip(slots, keys):
        im = Image.open(paths[key]).convert("RGB")
        im.thumbnail((x1 - x0 - 20, y1 - y0 - 40), Image.Resampling.LANCZOS)
        px = x0 + ((x1 - x0) - im.width) // 2
        py = y0 + 30 + ((y1 - y0 - 40) - im.height) // 2
        sheet.paste(im, (px, py))
        draw.text((x0, y0), title, fill="#111")
    out = REVIEW / "WACO_PACKET_SOURCE_OWNER_REVIEW.png"
    sheet.save(out, dpi=(300, 300))
    return out


def main() -> int:
    logger = setup_logging("waco_packet_source_review")
    REVIEW.mkdir(parents=True, exist_ok=True)

    master_copy = copy_master_untouched()
    master_info = analyze_image(MASTER)
    assets = discover_assets()

    labeled = labeled_landmarks(master_copy)
    pat_markup = pat_neff_markup(master_copy)
    lockup_mock = lockup_composite_mockup(master_copy)
    ivory_mock = ivory_shirt_mockup(lockup_mock)

    asset_sheet = REVIEW / "3_asset_inventory_contact_sheet.png"
    build_asset_contact_sheet(assets, asset_sheet)

    assessment = production_assessment(master_info)
    assessment["visible_landmarks"] = [
        {"name": n, "bbox_px": list(b), "notes": _landmark_notes(n)}
        for n, b, _ in LANDMARKS
    ]
    assessment["pat_neff_integration"] = {
        "currently_present": False,
        "existing_right_side_structure": "McLennan County Courthouse (domed)",
        "proposed_zone_px": list(PAT_NEFF_ZONE),
        "integration_guidance": (
            "Evaluate replacing the courthouse dome structure with a hand-illustrated Pat Neff Hall "
            "while preserving ALICO as the central tallest landmark and avoiding a gap between ALICO and the right-side building. "
            "Do not remove the courthouse in source review; replacement happens only in a derivative working file."
        ),
        "trees_in_recovered_art": "No separate tree layer detected; packet art is a single raster object.",
    }
    assessment["source_search_summary"] = {
        "production_packet_pdf": "KWW_Production_Packet.pdf page 3 embeds xref26 (light) and xref29 (dark) at 1536x1024 — no larger native skyline raster found.",
        "xlsx_pptx_docx": "Keep_Waco_Wagging_Printify_Brand_Reset.xlsx contains no embedded media.",
        "theme_folders": "No Waco skyline print art — UI icons only.",
        "zip_archives": "Golden mockup zip and products export contain no higher-res Waco skyline masters.",
        "higher_res_than_master": "None for Waco skyline line art. Page renders and 4500x5400 Phase 3 outputs are rejected programmatic derivatives, not cleaner sources.",
    }
    assessment["highest_quality_usable_master"] = {
        "file": str(MASTER.relative_to(ROOT)),
        "sha256": master_info["sha256"],
        "reason": "Only approved transparent packet line art with intact ALICO window/sign detail; duplicates share identical hash.",
    }

    paths = {
        "master": master_copy,
        "labeled": labeled,
        "lockup_mockup": lockup_mock,
        "ivory_mockup": ivory_mock,
        "pat_neff_markup": pat_markup,
        "asset_sheet": asset_sheet,
    }
    summary = build_summary_sheet(paths)

    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "status": "PENDING_OWNER_SOURCE_AND_COMPOSITION_APPROVAL",
        "master_untouched": str(MASTER.relative_to(ROOT)),
        "master_copy_for_review": str(master_copy.relative_to(ROOT)),
        "master_analysis": master_info,
        "assets_found": len(assets),
        "production_assessment": assessment,
        "deliverables": {k: str(v.relative_to(ROOT)) for k, v in paths.items()},
        "summary_sheet": str(summary.relative_to(ROOT)),
        "holds": {
            "DRY_RUN": True,
            "printify": False,
            "production_png_overwrite": False,
            "shopify": False,
            "source_assets_modified": False,
        },
    }
    (REVIEW / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    (REVIEW / "PRODUCTION_READINESS_ASSESSMENT.json").write_text(
        json.dumps(assessment, indent=2), encoding="utf-8"
    )

    logger.info("Review package written to %s", REVIEW)
    print("WACO PACKET SOURCE REVIEW — PENDING OWNER APPROVAL")
    print(f"master: {master_copy}")
    print(f"summary: {summary}")
    print(f"effective_dpi@10.5in: {assessment['effective_dpi_at_recommended_width']}")
    return 0


def _landmark_notes(name: str) -> str:
    return {
        "Magnolia Silos": "Left paired silos with domed caps — present but lighter line weight than ALICO.",
        "Waco Suspension Bridge": "Center-left suspension bridge with towers/cables — present, lighter weight.",
        "ALICO Building": "Central tallest landmark with ALICO sign band, window grid, rooftop flag — strongest detail.",
        "McLennan County Courthouse": "Right-side domed courthouse — candidate zone for Pat Neff integration.",
        "Waco, TX script (embedded raster)": "Bottom embedded script is part of the same raster object; preserve in master, mask in derivatives only.",
    }.get(name, "")


if __name__ == "__main__":
    raise SystemExit(main())
