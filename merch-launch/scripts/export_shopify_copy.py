#!/usr/bin/env python3
"""Export Shopify-ready copy JSON from manifest."""

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
    logger = setup_logging("export_shopify_copy")
    rows = [r for r in read_manifest() if r.get("channel") == "shopify"]
    payload = [
        {
            "product_id": r["product_id"],
            "title": r["shopify_title"],
            "handle": r["handle"],
            "body_html": r["shopify_description"],
            "vendor": "Keep Waco Wagging",
            "product_type": "T-Shirt",
            "tags": r["shopify_tags"],
            "status": "draft",
            "seo_title": r["seo_title"],
            "seo_description": r["seo_description"],
            "image_alt_text": r["image_alt_text"],
            "variants": {
                "colors": r["printify_color_names"].split("|"),
                "sizes": r["sizes"].split("|"),
                "price": r["retail_price"],
            },
            "collections": [r["shopify_collection"]],
            "personalization_ready": r["personalization_ready"],
        }
        for r in rows
    ]
    OUTPUT.mkdir(parents=True, exist_ok=True)
    out = OUTPUT / "shopify_copy_export.json"
    out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    logger.info("Exported %s Shopify products to %s", len(payload), out.name)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
