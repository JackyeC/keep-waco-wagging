#!/usr/bin/env python3
"""Validate products-master.csv rows, Etsy limits, and duplicate handles."""

from __future__ import annotations

import argparse
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import MANIFEST_COLUMNS, MANIFEST_PATH, OUTPUT, read_manifest, setup_logging  # noqa: E402

ETSY_TITLE_MAX = 140
ETSY_TAG_MAX = 20
ETSY_TAG_COUNT = 13


def validate_row(row: dict[str, str], handles: Counter[str]) -> list[str]:
    errs: list[str] = []
    pid = row.get("product_id", "?")
    channel = row.get("channel", "")

    for col in ("product_id", "channel", "handle", "retail_price"):
        if not row.get(col, "").strip():
            errs.append(f"{pid}: missing {col}")

    if channel == "shopify" and not row.get("shopify_title", "").strip():
        errs.append(f"{pid}: missing shopify_title")
    if channel == "etsy" and not row.get("etsy_title", "").strip():
        errs.append(f"{pid}: missing etsy_title")

    handle = row.get("handle", "")
    if handle:
        handles[f"{channel}:{handle}"] += 1

    if row.get("channel") == "etsy":
        title = row.get("etsy_title", "")
        if len(title) > ETSY_TITLE_MAX:
            errs.append(f"{pid}: Etsy title {len(title)} chars (max {ETSY_TITLE_MAX})")
        tags = [t.strip() for t in row.get("etsy_tags", "").split(",") if t.strip()]
        if len(tags) != ETSY_TAG_COUNT:
            errs.append(f"{pid}: Etsy tags count {len(tags)} (need {ETSY_TAG_COUNT})")
        for tag in tags:
            if len(tag) > ETSY_TAG_MAX:
                errs.append(f"{pid}: tag too long ({len(tag)}): {tag}")

    if row.get("personalization_ready", "").upper() == "YES":
        errs.append(f"{pid}: personalization_ready must stay NO until workflow approved")

    try:
        retail = float(row.get("retail_price", "0") or 0)
        if retail < 32 or retail > 36:
            errs.append(f"{pid}: retail {retail} outside $32–$36 target band")
    except ValueError:
        errs.append(f"{pid}: invalid retail_price")

    return errs


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.parse_args()
    logger = setup_logging("validate_manifest")

    if not MANIFEST_PATH.exists():
        logger.error("Manifest not found: %s", MANIFEST_PATH)
        return 1

    rows = read_manifest()
    missing_cols = [c for c in MANIFEST_COLUMNS if c not in (rows[0].keys() if rows else [])]
    handles: Counter[str] = Counter()
    errors: list[str] = []
    if missing_cols:
        errors.append(f"Missing columns: {missing_cols}")

    for row in rows:
        errors.extend(validate_row(row, handles))

    dup_handles = [h for h, n in handles.items() if n > 1]
    for h in dup_handles:
        errors.append(f"Duplicate handle across rows: {h}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    report = OUTPUT / "manifest_validation.txt"
    report.write_text(
        "\n".join([f"Rows: {len(rows)}", f"Errors: {len(errors)}", *errors[:200]]),
        encoding="utf-8",
    )
    logger.info("Validated %s rows, %s errors", len(rows), len(errors))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
