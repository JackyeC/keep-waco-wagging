#!/usr/bin/env python3
"""Deep asset recovery from PDF, XLSX/PPTX/DOCX, and nested ZIP containers.

Extracts embedded raster + vector assets to output/recovered-assets/ and writes
ASSET_RECOVERY_MANIFEST.csv. Read-only against source containers.
"""

from __future__ import annotations

import csv
import hashlib
import io
import shutil
import sys
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import OUTPUT, ROOT, SOURCE, setup_logging  # noqa: E402

from PIL import Image

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

RECOVERED = OUTPUT / "recovered-assets"
MANIFEST = OUTPUT / "ASSET_RECOVERY_MANIFEST.csv"

DOWNLOADS = Path.home() / "Downloads"

# Containers to inspect (only those that exist are processed)
CONTAINERS: list[Path] = [
    SOURCE / "KWW_Production_Packet.pdf",
    SOURCE / "Keep_Waco_Wagging_Brand_Book.pdf",
    SOURCE / "KWW_Etsy_Competitive_Research.pdf",
    SOURCE / "Keep_Waco_Wagging_Printify_Brand_Reset.xlsx",
    DOWNLOADS / "Shopify for Keep Waco Wagging.zip",
    DOWNLOADS / "Shopify for Keep Waco Wagging (1).zip",
    DOWNLOADS / "keep_waco_wagging_golden_mockups.zip",
    DOWNLOADS / "products_export.zip",
    DOWNLOADS / "theme_export__keepwacowagging-myshopify-com-kww-store-rebuild-june-2026__25JUN2026-1015pm.zip",
]

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
VECTOR_EXTS = {".svg", ".eps", ".ai", ".pdf"}

DESIGN_KEYWORDS = {
    "Waco Skyline": ["waco", "skyline", "alico", "landmark", "suspension"],
    "French Bulldog": ["french", "frenchie", "bulldog"],
    "Golden Retriever": ["golden", "retriever"],
    "Logo/Brand Mark": ["logo", "wordmark", "mark", "brand", "wag"],
    "Other Breed": ["german", "shepherd", "corgi", "chihuahua", "dachshund",
                    "husky", "labrador", "aussie", "australian", "doodle",
                    "pittie", "yorkie", "schnauzer", "catahoula", "maltipoo"],
}


def sha8(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()[:8]


def guess_design(name: str) -> str:
    low = name.lower()
    for design, kws in DESIGN_KEYWORDS.items():
        if any(k in low for k in kws):
            return design
    return "Unknown"


def guess_product(design: str) -> str:
    return {
        "Waco Skyline": "Waco Skyline Tee",
        "French Bulldog": "French Bulldog Tee",
        "Golden Retriever": "Golden Retriever Tee",
    }.get(design, "")


def quality_rank(width: int, height: int, alpha: bool, is_vector: bool) -> str:
    """1=vector, 2=large transparent, 3=large flat, 4=small clean, 5=preview."""
    if is_vector:
        return "1-vector"
    longest = max(width, height)
    if longest >= 3000 and alpha:
        return "2-large-transparent"
    if longest >= 3000:
        return "3-large-flat"
    if longest >= 1000:
        return "4-medium"
    return "5-preview"


def analyze_image_bytes(data: bytes) -> dict:
    try:
        im = Image.open(io.BytesIO(data))
        im.load()
        w, h = im.size
        mode = im.mode
        alpha = mode in ("RGBA", "LA") or (mode == "P" and "transparency" in im.info)
        return {"width": w, "height": h, "mode": mode, "alpha": alpha, "ok": True}
    except Exception as exc:
        return {"width": 0, "height": 0, "mode": "", "alpha": False, "ok": False, "err": str(exc)}


def save_asset(container: str, internal: str, data: bytes, ext: str) -> Path:
    safe_container = Path(container).stem.replace(" ", "_")[:40]
    dest_dir = RECOVERED / safe_container
    dest_dir.mkdir(parents=True, exist_ok=True)
    stem = Path(internal).stem.replace(" ", "_")[:40] or "asset"
    fname = f"{stem}_{sha8(data)}{ext}"
    dest = dest_dir / fname
    if not dest.exists():
        dest.write_bytes(data)
    return dest


def process_pdf(path: Path, rows: list[dict], logger) -> int:
    if fitz is None:
        logger.warning("PyMuPDF unavailable — skipping %s", path.name)
        return 0
    count = 0
    doc = fitz.open(path)
    seen: set[str] = set()
    for page_index in range(len(doc)):
        page = doc[page_index]
        for img in page.get_images(full=True):
            xref = img[0]
            try:
                base = doc.extract_image(xref)
            except Exception:
                continue
            data = base["image"]
            digest = sha8(data)
            if digest in seen:
                continue
            seen.add(digest)
            ext = "." + base.get("ext", "png")
            meta = analyze_image_bytes(data)
            if not meta["ok"]:
                continue
            internal = f"page{page_index + 1}/xref{xref}"
            dest = save_asset(path.name, internal, data, ext)
            design = guess_design(dest.name)
            rows.append({
                "Source container": path.name,
                "Internal path": internal,
                "Extracted filename": str(dest.relative_to(OUTPUT)),
                "File type": ext.lstrip("."),
                "Pixel dimensions": f"{meta['width']}x{meta['height']}",
                "Color mode": meta["mode"],
                "Alpha channel": "yes" if meta["alpha"] else "no",
                "Vector or raster": "raster",
                "File size": len(data),
                "Likely design": design,
                "Likely product": guess_product(design),
                "Quality rank": quality_rank(meta["width"], meta["height"], meta["alpha"], False),
                "Notes": "PDF embedded image",
            })
            count += 1
    doc.close()
    return count


def process_zip_container(path: Path, rows: list[dict], logger, depth: int = 0) -> int:
    """Handles .zip, .xlsx, .pptx, .docx (all zip-based)."""
    if depth > 4:
        return 0
    count = 0
    try:
        zf = zipfile.ZipFile(path)
    except zipfile.BadZipFile:
        logger.warning("Not a zip: %s", path)
        return 0
    for info in zf.infolist():
        if info.is_dir():
            continue
        inner_ext = Path(info.filename).suffix.lower()
        try:
            data = zf.read(info)
        except Exception:
            continue
        if inner_ext in {".zip", ".xlsx", ".pptx", ".docx"}:
            tmp = RECOVERED / "_nested" / f"{sha8(data)}{inner_ext}"
            tmp.parent.mkdir(parents=True, exist_ok=True)
            tmp.write_bytes(data)
            count += process_zip_container(tmp, rows, logger, depth + 1)
            continue
        if inner_ext in IMAGE_EXTS:
            meta = analyze_image_bytes(data)
            if not meta["ok"]:
                continue
            dest = save_asset(path.name, info.filename, data, inner_ext)
            design = guess_design(info.filename)
            rows.append({
                "Source container": path.name,
                "Internal path": info.filename,
                "Extracted filename": str(dest.relative_to(OUTPUT)),
                "File type": inner_ext.lstrip("."),
                "Pixel dimensions": f"{meta['width']}x{meta['height']}",
                "Color mode": meta["mode"],
                "Alpha channel": "yes" if meta["alpha"] else "no",
                "Vector or raster": "raster",
                "File size": len(data),
                "Likely design": design,
                "Likely product": guess_product(design),
                "Quality rank": quality_rank(meta["width"], meta["height"], meta["alpha"], False),
                "Notes": "archive media",
            })
            count += 1
        elif inner_ext in VECTOR_EXTS and inner_ext != ".pdf":
            dest = save_asset(path.name, info.filename, data, inner_ext)
            design = guess_design(info.filename)
            rows.append({
                "Source container": path.name,
                "Internal path": info.filename,
                "Extracted filename": str(dest.relative_to(OUTPUT)),
                "File type": inner_ext.lstrip("."),
                "Pixel dimensions": "vector",
                "Color mode": "vector",
                "Alpha channel": "n/a",
                "Vector or raster": "vector",
                "File size": len(data),
                "Likely design": design,
                "Likely product": guess_product(design),
                "Quality rank": "1-vector",
                "Notes": "vector asset — preserve",
            })
            count += 1
    zf.close()
    return count


def main() -> int:
    logger = setup_logging("recover_assets")
    if RECOVERED.exists():
        shutil.rmtree(RECOVERED)
    RECOVERED.mkdir(parents=True, exist_ok=True)

    rows: list[dict] = []
    summary: list[tuple[str, int]] = []

    for container in CONTAINERS:
        if not container.exists():
            logger.info("Not present, skipping: %s", container.name)
            summary.append((container.name, -1))
            continue
        ext = container.suffix.lower()
        if ext == ".pdf":
            n = process_pdf(container, rows, logger)
        elif ext in {".zip", ".xlsx", ".pptx", ".docx"}:
            n = process_zip_container(container, rows, logger)
        else:
            n = 0
        logger.info("%s -> %s assets", container.name, n)
        summary.append((container.name, n))

    # cleanup nested temp
    nested = RECOVERED / "_nested"
    if nested.exists():
        shutil.rmtree(nested)

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    fields = [
        "Source container", "Internal path", "Extracted filename", "File type",
        "Pixel dimensions", "Color mode", "Alpha channel", "Vector or raster",
        "File size", "Likely design", "Likely product", "Quality rank", "Notes",
    ]
    with MANIFEST.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    logger.info("Total assets recovered: %s -> %s", len(rows), MANIFEST.name)
    # print summary for downstream report
    for name, n in summary:
        status = "absent" if n == -1 else f"{n} assets"
        logger.info("  %s: %s", name, status)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
