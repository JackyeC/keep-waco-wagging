#!/usr/bin/env python3
"""Export Etsy-ready copy JSON with character-limit validation."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import OUTPUT, read_manifest, setup_logging  # noqa: E402


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.parse_args()
    logger = setup_logging("export_etsy_copy")
    rows = [r for r in read_manifest() if r.get("channel") == "etsy"]
    payload = []
    errors = 0
    for r in rows:
        title = r["etsy_title"]
        tags = [t.strip() for t in r["etsy_tags"].split(",") if t.strip()]
        title_ok = len(title) <= 140
        tags_ok = len(tags) == 13 and all(len(t) <= 20 for t in tags)
        if not title_ok or not tags_ok:
            errors += 1
        payload.append(
            {
                "product_id": r["product_id"],
                "title": title,
                "title_chars": len(title),
                "title_valid": title_ok,
                "description": r["etsy_description"],
                "tags": tags,
                "tags_valid": tags_ok,
                "materials": r["materials"],
                "category": "Clothing > Unisex Adult Clothing > Tops & Tees > T-shirts",
                "price": r["retail_price"],
                "variations": {
                    "colors": r["printify_color_names"].split("|"),
                    "sizes": r["sizes"].split("|"),
                },
                "personalization_ready": r["personalization_ready"],
                "personalization_status": r["personalization_status"],
            }
        )
    OUTPUT.mkdir(parents=True, exist_ok=True)
    out = OUTPUT / "etsy_copy_export.json"
    out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    logger.info("Exported %s Etsy listings (%s validation errors)", len(payload), errors)
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
