#!/usr/bin/env python3
"""Phase 2 correction pass: archive rejected outputs, build matrix and contact sheets."""

from __future__ import annotations

import csv
import json
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import DATA, OUTPUT, ROOT, setup_logging  # noqa: E402

from PIL import Image, ImageDraw, ImageFont

REJECTED = ROOT / "reference" / "rejected-phase2"
ARTWORK = ROOT / "artwork"

DESIGNS_14 = [
    ("city-waco", "Waco", "City Skyline", "Waco Skyline Tee"),
    ("city-austin", "Austin", "City Skyline", "Austin Pup Culture Tee"),
    ("city-dallas", "Dallas", "City Skyline", "Dallas Dog Scene Tee"),
    ("city-san-antonio", "San Antonio", "City Skyline", "San Antonio Sniffari Tee"),
    ("city-houston", "Houston", "City Skyline", "Houston Howling Tee"),
    ("breed-french-bulldog", "French Bulldog", "Breed Skyline", "French Bulldog Tee"),
    ("breed-dachshund", "Dachshund", "Breed Skyline", "Dachshund Tee"),
    ("breed-golden-retriever", "Golden Retriever", "Breed Skyline", "Golden Retriever Tee"),
    ("breed-labrador", "Labrador Retriever", "Breed Skyline", "Labrador Retriever Tee"),
    ("breed-german-shepherd", "German Shepherd", "Breed Skyline", "German Shepherd Tee"),
    ("breed-corgi", "Corgi", "Breed Skyline", "Corgi Tee"),
    ("breed-chihuahua", "Chihuahua", "Breed Skyline", "Chihuahua Tee"),
    ("breed-australian-shepherd", "Australian Shepherd", "Breed Skyline", "Australian Shepherd Tee"),
    ("breed-siberian-husky", "Siberian Husky", "Breed Skyline", "Siberian Husky Tee"),
]

MATRIX_FIELDS = [
    "design_id", "design_name", "product_name", "design_type",
    "illustration_recovered", "complete_apparel_composition_recovered",
    "light_version_recovered", "dark_version_recovered", "wordmark_recovered",
    "editable_vector_recovered", "high_res_transparent_png_recovered",
    "source_location", "current_status", "missing_components", "recommended_next_action",
]


def font(sz: int):
    for p in ["/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Helvetica.ttc"]:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, sz)
            except Exception:
                pass
    return ImageFont.load_default()


def checker(size):
    img = Image.new("RGB", size, "#ffffff")
    d = ImageDraw.Draw(img)
    s = 16
    for y in range(0, size[1], s):
        for x in range(0, size[0], s):
            if (x // s + y // s) % 2 == 0:
                d.rectangle([x, y, x + s, y + s], fill="#e8e8e8")
    return img


def thumb(path: Path, max_w=360, max_h=320) -> Image.Image | None:
    if not path.exists():
        return None
    try:
        im = Image.open(path).convert("RGBA")
        im.thumbnail((max_w, max_h))
        bg = checker(im.size)
        bg.paste(im, (0, 0), im)
        return bg
    except Exception:
        return None


def labeled_cell(path: Path | None, title: str, lines: list[str]) -> Image.Image:
    w, h = 380, 400
    cell = Image.new("RGB", (w, h), "#ffffff")
    d = ImageDraw.Draw(cell)
    d.text((8, 6), title[:42], fill="#111", font=font(14))
    if path and path.exists():
        t = thumb(path, 360, 300)
        if t:
            cell.paste(t, (10, 28))
    y = 340
    for line in lines[:3]:
        d.text((8, y), line[:52], fill="#444", font=font(11))
        y += 16
    d.rectangle([0, 0, w - 1, h - 1], outline="#ccc")
    return cell


def build_contact_sheet(cells: list[Image.Image], title: str, out: Path) -> None:
    cols = min(3, len(cells))
    rows = (len(cells) + cols - 1) // cols
    header = 44
    sheet = Image.new("RGB", (cols * 380, header + rows * 400), "#fff")
    d = ImageDraw.Draw(sheet)
    d.text((12, 12), title, fill="#111", font=font(20))
    for i, cell in enumerate(cells):
        r, c = divmod(i, cols)
        sheet.paste(cell, (c * 380, header + r * 400))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out)


def archive_rejected(logger) -> list[str]:
    REJECTED.mkdir(parents=True, exist_ok=True)
    archived = []
    mappings = [
        (ARTWORK / "french-bulldog-tee" / "light.png", "french-bulldog-tee_light_NOT_FOR_PRODUCTION.png"),
        (ARTWORK / "golden-retriever-tee" / "light.png", "golden-retriever-tee_light_NOT_FOR_PRODUCTION.png"),
        (OUTPUT / "PRODUCTION_MASTER_VALIDATION.json", "PRODUCTION_MASTER_VALIDATION_NOT_FOR_PRODUCTION.json"),
        (OUTPUT / "TEST_BATCH_ARTWORK_REVIEW.md", "TEST_BATCH_ARTWORK_REVIEW_NOT_FOR_PRODUCTION.md"),
    ]
    for src, name in mappings:
        if src.exists():
            dst = REJECTED / name
            shutil.copy2(src, dst)
            archived.append(str(dst.relative_to(ROOT)))
    # marker file
    (REJECTED / "README.txt").write_text(
        "Phase 2 outputs rejected in owner review.\n"
        "These files are NOT_FOR_PRODUCTION.\n"
        "Do not use for Printify drafts or publishing.\n",
        encoding="utf-8",
    )
    logger.info("Archived %s rejected files to reference/rejected-phase2/", len(archived))
    return archived


def matrix_rows() -> list[dict]:
    packet = "KWW_Production_Packet.pdf (PyMuPDF alpha + pdfimages + pdftocairo)"
    rows = []

    city_data = {
        "city-waco": {
            "ill": "yes", "comp": "partial", "light": "yes", "dark": "yes", "word": "partial",
            "vec": "no", "hi": "no", "src": f"{packet} xref26/29 + smask",
            "status": "PARTIAL_SOURCE_RECOVERED",
            "missing": "300DPI master; ALICO/courthouse lost in Phase2 trace; finished city tee composition",
            "action": "REQUIRES_MANUAL_RECONSTRUCTION at vector scale from approved 1536px reference",
        },
        "city-austin": {
            "ill": "yes", "comp": "partial", "light": "yes", "dark": "yes", "word": "partial",
            "vec": "no", "hi": "no", "src": f"{packet} xref31/33",
            "status": "PARTIAL_SOURCE_RECOVERED",
            "missing": "Production master; Austin TX script; 300DPI transparent PNG",
            "action": "REQUIRES_MANUAL_RECONSTRUCTION",
        },
        "city-dallas": {
            "ill": "yes", "comp": "partial", "light": "yes", "dark": "yes", "word": "partial",
            "vec": "no", "hi": "no", "src": f"{packet} xref35/37",
            "status": "PARTIAL_SOURCE_RECOVERED",
            "missing": "Production master; Dallas TX script; 300DPI transparent PNG",
            "action": "REQUIRES_MANUAL_RECONSTRUCTION",
        },
        "city-san-antonio": {
            "ill": "yes", "comp": "partial", "light": "yes", "dark": "yes", "word": "partial",
            "vec": "no", "hi": "no", "src": f"{packet} xref48/50",
            "status": "PARTIAL_SOURCE_RECOVERED",
            "missing": "Production master; SA script; 300DPI transparent PNG",
            "action": "REQUIRES_MANUAL_RECONSTRUCTION",
        },
        "city-houston": {
            "ill": "yes", "comp": "partial", "light": "yes", "dark": "yes", "word": "partial",
            "vec": "no", "hi": "no", "src": f"{packet} xref52/54",
            "status": "PARTIAL_SOURCE_RECOVERED",
            "missing": "Production master; Houston script; 300DPI transparent PNG",
            "action": "REQUIRES_MANUAL_RECONSTRUCTION",
        },
    }

    breed_data = {
        "breed-french-bulldog": {
            "ill": "yes", "comp": "mockup_only", "light": "ill_only", "dark": "no",
            "word": "mockup_only", "vec": "no", "hi": "no",
            "src": f"{packet} xref62 illustration; img-038/039 mockup photos",
            "status": "MOCKUP_ONLY",
            "missing": "Isolated hand-lettered script PNG/SVG; transparent finished composition C; 300DPI print file",
            "action": "REQUIRES_ORIGINAL_DESIGN — owner must confirm script vs logo lockup before composing C",
        },
        "breed-golden-retriever": {
            "ill": "yes", "comp": "mockup_only", "light": "ill_only", "dark": "no",
            "word": "conflicting", "vec": "no", "hi": "no",
            "src": f"{packet} xref66; Downloads/keep_waco_wagging_golden_*_mockup.png (old layout)",
            "status": "REQUIRES_ORIGINAL_DESIGN",
            "missing": "Approved CC1717 launch composition; packet has illustration only; mockup zip uses different serif layout",
            "action": "REQUIRES_ORIGINAL_DESIGN — do not auto-assemble dog+logo; confirm layout with owner",
        },
    }

    for did, dname, dtype, pname in DESIGNS_14:
        if did in city_data:
            d = city_data[did]
        elif did in breed_data:
            d = breed_data[did]
        elif did.startswith("breed-"):
            slug = did.replace("breed-", "").replace("-", "_")
            d = {
                "ill": "yes", "comp": "no", "light": "ill_only", "dark": "no", "word": "no",
                "vec": "no", "hi": "no",
                "src": f"{packet} breed grid page 5",
                "status": "ILLUSTRATION_ONLY",
                "missing": "Finished apparel composition C; wordmark; skyline pairing; 300DPI master",
                "action": "REQUIRES_ORIGINAL_DESIGN after owner layout direction",
            }
        else:
            d = {"ill": "no", "comp": "no", "light": "no", "dark": "no", "word": "no",
                 "vec": "no", "hi": "no", "src": "", "status": "MISSING",
                 "missing": "All components", "action": "Search sources"}

        rows.append({
            "design_id": did,
            "design_name": dname,
            "product_name": pname,
            "design_type": dtype,
            "illustration_recovered": d["ill"],
            "complete_apparel_composition_recovered": d["comp"],
            "light_version_recovered": d["light"],
            "dark_version_recovered": d["dark"],
            "wordmark_recovered": d["word"],
            "editable_vector_recovered": d["vec"],
            "high_res_transparent_png_recovered": d["hi"],
            "source_location": d["src"],
            "current_status": d["status"],
            "missing_components": d["missing"],
            "recommended_next_action": d["action"],
        })
    return rows


def update_manifest(logger) -> None:
    path = DATA / "products-master.csv"
    rows = list(csv.DictReader(open(path)))
    notes = {
        "city-waco-skyline": (
            "REVISE: Phase2 trace collapsed ALICO windows/courthouse into solid blocks. "
            "Source raster has detail at 1536px but no separate PDF objects. "
            "No production master approved."
        ),
        "breed-french-bulldog": (
            "REVISE: Phase2 file was illustration-only (dog), not complete apparel composition C. "
            "Packet mockup img-038 shows dog + hand-lettered Keep Waco Wagging script on Blue Jean. "
            "Script not recovered as separate asset. Do not substitute Brand Book lockup."
        ),
        "breed-golden-retriever": (
            "REVISE: Phase2 file was illustration-only. No approved CC1717 finished composition in packet. "
            "Downloads golden mockups use different old layout (serif KEEP WACO WAGGIN + skyline). "
            "REQUIRES_ORIGINAL_DESIGN pending owner direction."
        ),
    }
    for r in rows:
        pid = r.get("product_id", "")
        if pid in notes:
            r["artwork_status"] = "REVISE"
            r["qa_status"] = "BLOCKED_ARTWORK"
            r["mockup_status"] = "REVISE"
            r["artwork_light"] = ""
            r["artwork_dark"] = ""
            r["notes"] = notes[pid]
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=rows[0].keys())
        w.writeheader()
        w.writerows(rows)
    logger.info("Updated products-master.csv statuses to REVISE/BLOCKED")


def main() -> int:
    logger = setup_logging("phase2_correction")
    archive_rejected(logger)
    update_manifest(logger)

    # Comparison contact sheets
    p = Path
    waco_cells = [
        labeled_cell(p("output/recovered-assets/_packet_alpha/waco_skyline_light_x26.png"),
                     "A. Alpha source (xref26+smask)", ["1536x1024", "ALICO windows+sign visible", "NOT production res"]),
        labeled_cell(p("output/pdf-object-audit/waco_alico_alpha.png"),
                     "B. ALICO crop (alpha source)", ["Native detail preserved", "Separate PDF object: NO", "Single raster+mask"]),
        labeled_cell(p("output/pdf-object-audit/waco_potrace_failure_preview.png"),
                     "C. Phase2 potrace attempt", ["ALICO became solid block", "Courthouse filled", "NOT_FOR_PRODUCTION"]),
        labeled_cell(p("output/pdf-object-audit/pdfimages/img-038.png"),
                     "D. pdfimages img-038", ["1254x1254 RGB", "French mockup photo", "Not Waco art"]),
        labeled_cell(p("output/recovered-assets/_packet_alpha/waco_skyline_dark_x29.png"),
                     "E. Dark variant (xref29+smask)", ["1536x1024 white-line", "Separate from light", "Same single-object structure"]),
        labeled_cell(p("output/pdf-object-audit/pdftocairo_svg/page3.svg"),
                     "F. pdftocairo page3 SVG", ["2.9MB vector page", "Embeds same rasters", "No extra ALICO layer"]),
    ]
    build_contact_sheet(waco_cells, "Waco Skyline — PDF Object Extraction Comparison",
                        OUTPUT / "waco-object-extraction-contact-sheet.png")

    french_cells = [
        labeled_cell(p("output/recovered-assets/_packet_alpha/french_bulldog_light_x62.png"),
                     "A. Breed illustration (xref62)", ["1024x1024 transparent", "Asset A only", "ILLUSTRATION_ONLY"]),
        labeled_cell(p("output/pdf-object-audit/pdfimages/img-038.png"),
                     "B. img-038 mockup flat-lay", ["1254x1254 photo", "Dog + hand script", "Composition C on garment"]),
        labeled_cell(p("output/pdf-object-audit/pdfimages/img-039.png"),
                     "C. img-039 on-model mockup", ["1024x1536 photo", "Same print on Blue Jean", "Not isolated print art"]),
        labeled_cell(p("reference/rejected-phase2/french-bulldog-tee_light_NOT_FOR_PRODUCTION.png"),
                     "D. Phase2 rejected master", ["4500x5400", "Dog only — missing script", "NOT_FOR_PRODUCTION"]),
        labeled_cell(p("/Users/jackyeclayton/Projects/keep-waco-wagging/public/brand/keep-waco-wagging-logo.png"),
                     "E. Brand Book logo lockup", ["1024x1024", "Different typography", "Do NOT substitute for C"]),
    ]
    build_contact_sheet(french_cells, "French Bulldog — Source Comparison",
                        OUTPUT / "frenchie-source-comparison.png")

    golden_cells = [
        labeled_cell(p("output/recovered-assets/_packet_alpha/golden_retriever_light_x66.png"),
                     "A. Breed illustration (xref66)", ["1024x1024 transparent", "Asset A only", "ILLUSTRATION_ONLY"]),
        labeled_cell(p("output/recovered-assets/keep_waco_wagging_golden_mockups/keep_waco_wagging_golden_black_mockup.png"),
                     "B. Golden mockup (black bg)", ["768x1024", "Old layout: dog+skyline+serif", "Different from packet page6"]),
        labeled_cell(p("output/recovered-assets/keep_waco_wagging_golden_mockups/keep_waco_wagging_golden_navy_mockup_98c7dba3.png"),
                     "C. Golden mockup (navy bg)", ["768x1024", "KEEP WACO WAGGIN serif", "Not CC1717 launch spec"]),
        labeled_cell(p("reference/rejected-phase2/golden-retriever-tee_light_NOT_FOR_PRODUCTION.png"),
                     "D. Phase2 rejected master", ["4500x5400", "Dog only", "NOT_FOR_PRODUCTION"]),
        labeled_cell(p("/Users/jackyeclayton/Projects/keep-waco-wagging/source-designs/merch/dog-moms/waco-golden-retriever-crewneck-300dpi.png"),
                     "E. Crewneck art (repo)", ["3300x2357", "Wrong product format", "Reference only"]),
    ]
    build_contact_sheet(golden_cells, "Golden Retriever — Source Comparison",
                        OUTPUT / "golden-source-comparison.png")

    rows = matrix_rows()
    csv_path = OUTPUT / "complete-artwork-matrix.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=MATRIX_FIELDS)
        w.writeheader()
        w.writerows(rows)
    logger.info("Wrote %s (%s designs)", csv_path.name, len(rows))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
