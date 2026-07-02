#!/usr/bin/env python3
"""Build labeled contact sheets from recovered assets, grouped by design."""

from __future__ import annotations

import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import OUTPUT, setup_logging  # noqa: E402

from PIL import Image, ImageDraw, ImageFont

ALPHA_DIR = OUTPUT / "recovered-assets" / "_packet_alpha"
RECOVERED = OUTPUT / "recovered-assets"
SHEETS = OUTPUT / "contact-sheets"

CELL = 320
PAD = 16
LABEL_H = 60
COLS = 4
CHECKER = 20


def checkerboard(size: int) -> Image.Image:
    img = Image.new("RGB", (size, size), "#ffffff")
    d = ImageDraw.Draw(img)
    for y in range(0, size, CHECKER):
        for x in range(0, size, CHECKER):
            if (x // CHECKER + y // CHECKER) % 2 == 0:
                d.rectangle([x, y, x + CHECKER, y + CHECKER], fill="#e8e8e8")
    return img


def font(sz: int):
    for p in [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, sz)
            except Exception:
                pass
    return ImageFont.load_default()


def make_cell(path: Path, label_lines: list[str]) -> Image.Image:
    cell = Image.new("RGB", (CELL, CELL + LABEL_H), "#ffffff")
    bg = checkerboard(CELL)
    try:
        art = Image.open(path).convert("RGBA")
        art.thumbnail((CELL - 2 * PAD, CELL - 2 * PAD))
        ox = (CELL - art.width) // 2
        oy = (CELL - art.height) // 2
        bg.paste(art, (ox, oy), art)
    except Exception:
        pass
    cell.paste(bg, (0, 0))
    d = ImageDraw.Draw(cell)
    d.rectangle([0, 0, CELL - 1, CELL - 1], outline="#cccccc")
    f = font(13)
    y = CELL + 4
    for line in label_lines[:3]:
        d.text((6, y), line[:46], fill="#222222", font=f)
        y += 17
    return cell


def build_sheet(title: str, entries: list[tuple[Path, list[str]]], out_name: str, logger) -> None:
    if not entries:
        logger.info("No entries for %s", title)
        return
    rows = (len(entries) + COLS - 1) // COLS
    header_h = 50
    sheet_w = COLS * CELL
    sheet_h = header_h + rows * (CELL + LABEL_H)
    sheet = Image.new("RGB", (sheet_w, sheet_h), "#ffffff")
    d = ImageDraw.Draw(sheet)
    d.text((12, 14), title, fill="#111111", font=font(24))
    for i, (path, labels) in enumerate(entries):
        r, c = divmod(i, COLS)
        cell = make_cell(path, labels)
        sheet.paste(cell, (c * CELL, header_h + r * (CELL + LABEL_H)))
    SHEETS.mkdir(parents=True, exist_ok=True)
    out = SHEETS / out_name
    sheet.save(out)
    logger.info("Wrote %s (%s items)", out.name, len(entries))


def entries_for(keywords: list[str], source_label: str) -> list[tuple[Path, list[str]]]:
    out = []
    for p in sorted(ALPHA_DIR.glob("*.png")):
        low = p.name.lower()
        if any(k in low for k in keywords):
            try:
                im = Image.open(p)
                dims = f"{im.size[0]}x{im.size[1]}"
            except Exception:
                dims = "?"
            variant = "dark" if "dark" in low else "light"
            out.append((p, [p.name, dims, f"{source_label} · {variant}", "rank 4 (preview res)"]))
    return out


def main() -> int:
    logger = setup_logging("build_contact_sheets")

    build_sheet(
        "Waco Skyline Candidates — Production Packet",
        entries_for(["waco_skyline"], "KWW_Production_Packet"),
        "waco-skyline.png",
        logger,
    )
    build_sheet(
        "French Bulldog Candidates — Production Packet",
        entries_for(["french_bulldog"], "KWW_Production_Packet"),
        "french-bulldog.png",
        logger,
    )
    build_sheet(
        "Golden Retriever Candidates — Production Packet",
        entries_for(["golden_retriever"], "KWW_Production_Packet"),
        "golden-retriever.png",
        logger,
    )
    build_sheet(
        "Other Breed Artwork — Production Packet",
        entries_for(
            ["dachshund", "labrador", "german_shepherd", "corgi", "chihuahua",
             "australian", "husky"],
            "KWW_Production_Packet",
        ),
        "misc-breeds.png",
        logger,
    )

    # Logos / brand marks from full recovery tree
    logo_entries = []
    for p in sorted(RECOVERED.rglob("*.png")):
        if "_packet_alpha" in str(p) or "_packet_pages" in str(p):
            continue
        low = p.name.lower()
        if any(k in low for k in ["logo", "wordmark", "mark", "brand", "wag"]):
            try:
                im = Image.open(p)
                dims = f"{im.size[0]}x{im.size[1]}"
            except Exception:
                dims = "?"
            logo_entries.append((p, [p.name[:40], dims, p.parent.name[:30], ""]))
    build_sheet("Logos & Brand Marks", logo_entries[:16], "logos-brand-marks.png", logger)

    # All city skylines for reference
    build_sheet(
        "All City Skyline Designs — Production Packet",
        entries_for(["skyline"], "KWW_Production_Packet"),
        "all-city-skylines.png",
        logger,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
