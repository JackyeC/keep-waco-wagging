#!/usr/bin/env python3
"""Validate required source files exist and are readable."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import OUTPUT, SOURCE, setup_logging  # noqa: E402

REQUIRED = [
    "Keep_Waco_Wagging_Printify_Brand_Reset.xlsx",
    "Keep_Waco_Wagging_Brand_Book.pdf",
    "KWW_Production_Packet.pdf",
    "kww_etsy_listings.md",
    "KWW_Etsy_Competitive_Research.pdf",
]

SHEETS = ["Brand Reset", "Current Catalog Audit", "Add Next", "Breed Matrix", "Brand Rules"]


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate merch-launch source files")
    parser.parse_args()
    logger = setup_logging("validate_source_files")
    errors: list[str] = []

    for name in REQUIRED:
        path = SOURCE / name
        if not path.exists():
            errors.append(f"Missing: {path}")
            logger.error("Missing source file: %s", name)
        else:
            logger.info("OK: %s (%s bytes)", name, path.stat().st_size)

    xlsx = SOURCE / "Keep_Waco_Wagging_Printify_Brand_Reset.xlsx"
    if xlsx.exists():
        try:
            import openpyxl

            wb = openpyxl.load_workbook(xlsx, read_only=True, data_only=True)
            missing_sheets = [s for s in SHEETS if s not in wb.sheetnames]
            if missing_sheets:
                errors.append(f"Spreadsheet missing sheets: {missing_sheets}")
            else:
                logger.info("Spreadsheet sheets OK: %s", ", ".join(SHEETS))
        except Exception as exc:
            errors.append(f"Spreadsheet unreadable: {exc}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    report = OUTPUT / "source_validation.txt"
    report.write_text(
        "\n".join(["PASS" if not errors else "FAIL", *errors]),
        encoding="utf-8",
    )
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
