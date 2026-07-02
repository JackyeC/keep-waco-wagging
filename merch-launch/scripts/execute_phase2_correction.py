#!/usr/bin/env python3
"""Execute PHASE2_CORRECTION_PROMPT.md read-only correction pass."""

from __future__ import annotations

import csv
import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import DATA, OUTPUT, ROOT, SOURCE, setup_logging  # noqa: E402
from phase2_correction import (  # noqa: E402
    MATRIX_FIELDS,
    archive_rejected,
    build_contact_sheet,
    labeled_cell,
    matrix_rows,
    update_manifest,
)

PDF = SOURCE / "KWW_Production_Packet.pdf"
AUDIT = OUTPUT / "pdf-object-audit"
REJECTED = ROOT / "reference" / "rejected-phase2"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def run_cmd(cmd: list[str], cwd: Path | None = None) -> tuple[int, str]:
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd, timeout=120)
        return r.returncode, (r.stdout or "") + (r.stderr or "")
    except Exception as exc:
        return 1, str(exc)


def pdf_extraction_methods(logger) -> dict:
    """Run every extraction method named in the prompt and record results."""
    AUDIT.mkdir(parents=True, exist_ok=True)
    results: dict = {}

    # pdfimages -all
    out_prefix = AUDIT / "pdfimages" / "img"
    out_prefix.parent.mkdir(parents=True, exist_ok=True)
    code, msg = run_cmd(["pdfimages", "-all", str(PDF), str(out_prefix)])
    count = len(list(out_prefix.parent.glob("img-*")))
    results["pdfimages_all"] = {"exit": code, "files": count, "note": msg.strip()[:200]}
    logger.info("pdfimages -all: %s files", count)

    # mutool extract -a
    mutool_dir = AUDIT / "mutool_extract"
    mutool_dir.mkdir(parents=True, exist_ok=True)
    for f in mutool_dir.glob("image-*"):
        f.unlink()
    code, msg = run_cmd(["mutool", "extract", "-a", "-o", str(mutool_dir), str(PDF)])
    mcount = len(list(mutool_dir.glob("image-*")))
    results["mutool_extract_a"] = {"exit": code, "files": mcount, "note": msg.strip()[:200]}

    # mutool draw -F svg (pages 3-6)
    mutool_svg = AUDIT / "mutool_svg"
    mutool_svg.mkdir(parents=True, exist_ok=True)
    for p in [3, 4, 5, 6]:
        out = mutool_svg / f"page{p}.svg"
        code, msg = run_cmd(["mutool", "draw", "-F", "svg", "-o", str(out), str(PDF), str(p)])
        results[f"mutool_draw_svg_page{p}"] = {
            "exit": code,
            "size_bytes": out.stat().st_size if out.exists() else 0,
            "note": msg.strip()[:120],
        }

    # pdftocairo -svg
    cairo_dir = AUDIT / "pdftocairo_svg"
    cairo_dir.mkdir(parents=True, exist_ok=True)
    for p in [3, 4, 5, 6]:
        out = cairo_dir / f"page{p}.svg"
        code, msg = run_cmd(["pdftocairo", "-svg", "-f", str(p), "-l", str(p), str(PDF), str(out)])
        results[f"pdftocairo_svg_page{p}"] = {
            "exit": code,
            "size_bytes": out.stat().st_size if out.exists() else 0,
        }

    # qpdf --qdf (decompressed object streams for inspection)
    qdf_dir = AUDIT / "qpdf"
    qdf_dir.mkdir(parents=True, exist_ok=True)
    qdf_out = qdf_dir / "KWW_Production_Packet.qdf.pdf"
    code, msg = run_cmd(["qpdf", "--qdf", str(PDF), str(qdf_out)])
    results["qpdf_qdf"] = {
        "exit": code,
        "output": str(qdf_out.relative_to(ROOT)) if qdf_out.exists() else None,
        "note": msg.strip()[:200],
    }

    # inkscape
    code, _ = run_cmd(["inkscape", "--version"])
    results["inkscape"] = {"available": code == 0}

    (AUDIT / "extraction_methods.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    return results


def deep_pdf_object_inventory(logger) -> dict:
    import fitz

    doc = fitz.open(PDF)
    inv = {"pages": [], "xobjects_total": 0, "fonts_total": 0, "waco_structure": {}}
    for pi in range(len(doc)):
        page = doc[pi]
        entry = {
            "page": pi + 1,
            "drawings": len(page.get_drawings()),
            "images": [],
            "fonts": [{"xref": f[0], "name": f[3], "type": f[1]} for f in page.get_fonts()],
        }
        for img in page.get_images(full=True):
            xref = img[0]
            base = doc.extract_image(xref)
            rects = page.get_image_rects(xref)
            entry["images"].append({
                "xref": xref,
                "smask_xref": base.get("smask", 0),
                "size": f"{base.get('width')}x{base.get('height')}",
                "colorspace": base.get("colorspace"),
                "ext": base.get("ext"),
                "positions": [[round(r.x0), round(r.y0), round(r.x1), round(r.y1)] for r in rects],
            })
            inv["xobjects_total"] += 1
        inv["fonts_total"] += len(entry["fonts"])
        inv["pages"].append(entry)

    waco = [i for p in inv["pages"] if p["page"] == 3 for i in p["images"] if i["xref"] in (26, 28, 29, 30)]
    inv["waco_structure"] = {
        "light_image_xref": 26,
        "light_smask_xref": 28,
        "dark_image_xref": 29,
        "dark_smask_xref": 30,
        "separate_alico_window_objects": False,
        "separate_courthouse_objects": False,
        "composition": "single raster + soft mask per variant; detail baked into raster pixels",
        "objects": waco,
    }
    doc.close()
    (AUDIT / "object_inventory.json").write_text(json.dumps(inv, indent=2), encoding="utf-8")
    logger.info("PDF object inventory: %s xobjects, %s font refs", inv["xobjects_total"], inv["fonts_total"])
    return inv


def hash_search(logger) -> dict:
    """Search repo + Downloads for visually related assets by hash near-matches and keywords."""
    from PIL import Image
    import io

    targets = {
        "french_xref62": ROOT / "artwork/french-bulldog-tee/source/french_bulldog_light_x62.png",
        "golden_xref66": ROOT / "artwork/golden-retriever-tee/source/golden_retriever_light_x66.png",
        "img038": AUDIT / "pdfimages/img-038.png",
        "img039": AUDIT / "pdfimages/img-039.png",
    }
    target_hashes = {k: sha256(p) if p.exists() else None for k, p in targets.items()}

    search_roots = [
        ROOT.parent,
        Path.home() / "Downloads",
    ]
    keywords = ["french", "frenchie", "golden", "retriever", "wagging", "blue jean", "mockup", "script"]
    candidates: list[dict] = []
    seen_hashes: set[str] = set()

    for root in search_roots:
        if not root.exists():
            continue
        for p in root.rglob("*"):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp", ".svg"):
                continue
            if "node_modules" in str(p) or ".venv" in str(p):
                continue
            name = p.name.lower()
            if not any(k in name for k in keywords):
                continue
            try:
                if p.stat().st_size > 15_000_000:
                    continue
                h = sha256(p)
                if h in seen_hashes:
                    continue
                seen_hashes.add(h)
                info = {"path": str(p), "sha256_12": h[:12], "size_bytes": p.stat().st_size}
                if p.suffix.lower() != ".svg":
                    im = Image.open(p)
                    info["dimensions"] = f"{im.size[0]}x{im.size[1]}"
                    info["mode"] = im.mode
                for tk, th in target_hashes.items():
                    if th and h == th:
                        info["exact_match"] = tk
                candidates.append(info)
            except Exception:
                continue

    out = {"target_hashes": target_hashes, "candidate_count": len(candidates), "candidates": candidates[:80]}
    (OUTPUT / "hash_search_results.json").write_text(json.dumps(out, indent=2), encoding="utf-8")
    logger.info("Hash/keyword search: %s candidates", len(candidates))
    return out


def archive_all_rejected(logger) -> None:
    """Copy all Phase 2 artwork outputs to rejected-phase2."""
    REJECTED.mkdir(parents=True, exist_ok=True)
    copies = [
        (ROOT / "artwork/french-bulldog-tee/light.png", "french-bulldog-tee_light_NOT_FOR_PRODUCTION.png"),
        (ROOT / "artwork/golden-retriever-tee/light.png", "golden-retriever-tee_light_NOT_FOR_PRODUCTION.png"),
        (ROOT / "artwork/waco-skyline-tee/light.png.REQUIRES_RECONSTRUCTION", "waco-skyline-tee_light_REQUIRES_RECONSTRUCTION.txt"),
        (ROOT / "artwork/waco-skyline-tee/dark.png.REQUIRES_RECONSTRUCTION", "waco-skyline-tee_dark_REQUIRES_RECONSTRUCTION.txt"),
        (OUTPUT / "PRODUCTION_MASTER_VALIDATION.json", "PRODUCTION_MASTER_VALIDATION_NOT_FOR_PRODUCTION.json"),
        (OUTPUT / "TEST_BATCH_ARTWORK_REVIEW.md", "TEST_BATCH_ARTWORK_REVIEW_NOT_FOR_PRODUCTION.md"),
    ]
    for src, name in copies:
        if src.exists():
            shutil.copy2(src, REJECTED / name)
    (REJECTED / "README.txt").write_text(
        "Phase 2 outputs — NOT_FOR_PRODUCTION\n"
        "Rejected in owner review per PHASE2_CORRECTION_PROMPT.md\n"
        "Do not use for Printify drafts or publishing.\n",
        encoding="utf-8",
    )
    logger.info("Rejected archive updated in reference/rejected-phase2/")


def write_reports(methods: dict, inventory: dict, hash_results: dict) -> None:
    matrix = matrix_rows()
    with (OUTPUT / "complete-artwork-matrix.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=MATRIX_FIELDS)
        w.writeheader()
        w.writerows(matrix)

    # Contact sheets
    p = Path
    waco_cells = [
        labeled_cell(p("output/recovered-assets/_packet_alpha/waco_skyline_light_x26.png"),
                     "A. Alpha source xref26+smask", ["1536x1024", "ALICO detail in pixels", "Single raster object"]),
        labeled_cell(p("output/pdf-object-audit/waco_alico_alpha.png"),
                     "B. ALICO crop native", ["Windows+sign visible", "No separate PDF layer", "NOT 300DPI"]),
        labeled_cell(p("output/pdf-object-audit/waco_potrace_failure_preview.png"),
                     "C. Phase2 potrace (rejected)", ["Solid ALICO block", "Courthouse filled", "NOT_FOR_PRODUCTION"]),
        labeled_cell(p("output/recovered-assets/_packet_alpha/waco_skyline_dark_x29.png"),
                     "D. Dark xref29+smask", ["White-line variant", "Separate from light", "Same structure"]),
        labeled_cell(p("output/pdf-object-audit/pdftocairo_svg/page3.svg"),
                     "E. pdftocairo page3", ["Embeds rasters", "No extra ALICO objects", f"{methods.get('pdftocairo_svg_page3',{}).get('size_bytes',0)//1024}KB"]),
        labeled_cell(p("output/pdf-object-audit/mutool_svg/page3.svg"),
                     "F. mutool draw page3", ["SVG page export", "Same embedded art", f"{methods.get('mutool_draw_svg_page3',{}).get('size_bytes',0)//1024}KB"]),
    ]
    build_contact_sheet(waco_cells, "Waco Skyline — PDF Object Extraction Comparison",
                        OUTPUT / "waco-object-extraction-contact-sheet.png")

    french_cells = [
        labeled_cell(p("output/recovered-assets/_packet_alpha/french_bulldog_light_x62.png"),
                     "A. Illustration xref62", ["1024x1024 transparent", "Asset A only", "ILLUSTRATION_ONLY"]),
        labeled_cell(p("output/pdf-object-audit/pdfimages/img-038.png"),
                     "B. img-038 mockup flat-lay", ["1254x1254 photo", "Dog + hand script", "Composition C on garment"]),
        labeled_cell(p("output/pdf-object-audit/pdfimages/img-039.png"),
                     "C. img-039 on-model", ["1024x1536 photo", "Not isolated print art", "MOCKUP_ONLY"]),
        labeled_cell(p("reference/rejected-phase2/french-bulldog-tee_light_NOT_FOR_PRODUCTION.png"),
                     "D. Phase2 rejected PNG", ["4500x5400 dog only", "Missing script composition", "NOT_FOR_PRODUCTION"]),
        labeled_cell(p("/Users/jackyeclayton/Projects/keep-waco-wagging/public/brand/keep-waco-wagging-logo.png"),
                     "E. Brand Book lockup", ["Different typography", "Do NOT substitute", "Asset B only"]),
    ]
    build_contact_sheet(french_cells, "French Bulldog — Source Comparison", OUTPUT / "frenchie-source-comparison.png")

    golden_cells = [
        labeled_cell(p("output/recovered-assets/_packet_alpha/golden_retriever_light_x66.png"),
                     "A. Illustration xref66", ["1024x1024 transparent", "Asset A only", "ILLUSTRATION_ONLY"]),
        labeled_cell(p("output/recovered-assets/keep_waco_wagging_golden_mockups/keep_waco_wagging_golden_black_mockup_98c7dba3.png"),
                     "B. Old mockup (black)", ["768x1024", "Different serif layout", "Not CC1717 launch spec"]),
        labeled_cell(p("output/recovered-assets/keep_waco_wagging_golden_mockups/keep_waco_wagging_golden_navy_mockup_98c7dba3.png"),
                     "C. Old mockup (navy)", ["768x1024", "KEEP WACO WAGGIN", "REQUIRES_ORIGINAL_DESIGN"]),
        labeled_cell(p("reference/rejected-phase2/golden-retriever-tee_light_NOT_FOR_PRODUCTION.png"),
                     "D. Phase2 rejected PNG", ["4500x5400 dog only", "Not finished composition", "NOT_FOR_PRODUCTION"]),
        labeled_cell(p("/Users/jackyeclayton/Projects/keep-waco-wagging/source-designs/merch/dog-moms/waco-golden-retriever-crewneck-300dpi.png"),
                     "E. Crewneck art (repo)", ["3300x2357", "Wrong product", "Reference only"]),
    ]
    build_contact_sheet(golden_cells, "Golden Retriever — Source Comparison", OUTPUT / "golden-source-comparison.png")

    # Copy prompt into merch-launch for traceability
    prompt_src = Path.home() / "Downloads/merch-launch/PHASE2_CORRECTION_PROMPT.md"
    if prompt_src.exists():
        shutil.copy2(prompt_src, ROOT / "PHASE2_CORRECTION_PROMPT.md")


def main() -> int:
    logger = setup_logging("execute_phase2_correction")
    logger.info("Starting read-only PHASE2 correction pass")

    archive_all_rejected(logger)
    update_manifest(logger)

    methods = pdf_extraction_methods(logger)
    inventory = deep_pdf_object_inventory(logger)
    hash_results = hash_search(logger)

    write_reports(methods, inventory, hash_results)

    logger.info("Correction pass complete — no Printify, no masters, no publish")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
