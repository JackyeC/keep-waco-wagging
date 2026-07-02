#!/usr/bin/env python3
"""Build products-master.csv from launch definitions (metadata only)."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    CC1717_BLANK_NAME,
    CC1717_BLUEPRINT_ID,
    DEFAULT_RETAIL,
    LAUNCH_DESIGNS,
    kww_mapping_for_colors,
    write_manifest,
    setup_logging,
)

BASE_COST_LOW = "11.50"
BASE_COST_HIGH = "16.75"


def shopify_description(d: dict) -> str:
    if d["design_family"] == "City Skyline":
        city = d["city"]
        return (
            f"Keep Waco Wagging — {city} skyline on a Comfort Colors 1717 garment-dyed tee. "
            f"Hand-drawn single-line {city} landmarks with the Keep Waco Wagging wordmark. "
            "Relaxed unisex fit, ring-spun cotton, printed to order. "
            "Machine wash cold inside-out; tumble dry low."
        )
    breed = d["breed"]
    return (
        f"Keep Waco Wagging — {breed} edition with the real Waco skyline and ALICO Building. "
        "Comfort Colors 1717 garment-dyed tee, relaxed unisex fit, ring-spun cotton. "
        "Printed to order in curated brand colors. Wash cold inside-out; tumble dry low."
    )


def etsy_description_clean(d: dict) -> str:
    base = shopify_description(d)
    return base + " Standard design only — dog-name personalization is not available yet."


def etsy_tags(d: dict) -> str:
    if d["city"] == "Waco" and not d["breed"]:
        tags = [
            "keep waco wagging",
            "waco texas shirt",
            "waco skyline",
            "dog mom shirt",
            "comfort colors",
            "alico building",
            "texas dog shirt",
            "waco tx gift",
            "dog lover shirt",
            "suspension bridge",
            "dog dad gift",
            "waco dog tee",
            "baylor waco tee",
        ]
    elif d["breed"]:
        slug = d["breed"].split()[0].lower()
        tags = [
            "keep waco wagging",
            f"{slug} dog shirt",
            "waco texas shirt",
            "breed dog tee",
            "comfort colors",
            "dog mom shirt",
            "texas dog shirt",
            "waco skyline",
            "dog lover gift",
            "waco tx gift",
            "dog dad shirt",
            "alico building",
            "waco dog tee",
        ]
    else:
        city = d["city"].lower().split()[0]
        tags = [
            f"{city} dog shirt",
            "keep waco wagging",
            "texas city tee",
            "comfort colors",
            "dog mom shirt",
            "skyline shirt",
            "texas dog shirt",
            "dog lover gift",
            f"{city} tx gift",
            "dog dad shirt",
            "waco brand tee",
            "garment dyed tee",
            "unisex dog tee",
        ]
    return ", ".join(tags[:13])


def seo_title(d: dict) -> str:
    return f"{d['shopify_title']} | Keep Waco Wagging"


def seo_description(d: dict) -> str:
    return (
        f"Shop the {d['shopify_title']} — Comfort Colors 1717, curated KWW colors, "
        "printed to order. Waco-founded dog-family brand."
    )


def image_alt(d: dict) -> str:
    return f"{d['shopify_title']} — Comfort Colors 1717 garment-dyed tee, front print mockup"


def manifest_rows() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for d in LAUNCH_DESIGNS:
        colors = d["printify_colors"]
        mapping = kww_mapping_for_colors(colors)
        common = {
            "product_id": d["product_id"],
            "launch_wave": d["launch_wave"],
            "priority": d["priority"],
            "design_family": d["design_family"],
            "city": d["city"],
            "breed": d.get("breed", ""),
            "product_name": d["product_name"],
            "shopify_title": d["shopify_title"],
            "etsy_title": d["etsy_title"],
            "handle": d["handle"],
            "artwork_light": "",
            "artwork_dark": "",
            "blank_name": CC1717_BLANK_NAME,
            "printify_blueprint_id": str(CC1717_BLUEPRINT_ID),
            "print_provider": "TBD — verify in Printify",
            "print_provider_id": "",
            "print_area": "front",
            "sizes": "S|M|L|XL|2XL|3XL",
            "printify_color_names": colors,
            "kww_color_mapping": mapping,
            "base_cost_low": BASE_COST_LOW,
            "base_cost_high": BASE_COST_HIGH,
            "retail_price": f"{DEFAULT_RETAIL:.2f}",
            "gross_profit_low": f"{DEFAULT_RETAIL - float(BASE_COST_HIGH):.2f}",
            "gross_margin_low": f"{(DEFAULT_RETAIL - float(BASE_COST_HIGH)) / DEFAULT_RETAIL:.2%}",
            "materials": "Comfort Colors 1717, ring-spun cotton, DTG print",
            "shopify_collection": d["shopify_collection"],
            "shopify_tags": "Comfort Colors, Waco, Dog Mom, Dog Dad, Keep Waco Wagging",
            "seo_title": seo_title(d),
            "seo_description": seo_description(d),
            "image_alt_text": image_alt(d),
            "personalization_ready": "NO",
            "personalization_status": "BLOCKED_WORKFLOW",
            "artwork_status": "BLOCKED_ARTWORK",
            "mockup_status": "PENDING",
            "qa_status": "PENDING",
            "printify_product_id": "",
            "shopify_product_id": "",
            "etsy_listing_id": "",
            "publish_status": "DRAFT",
            "errors": "",
            "notes": "Artwork paths assigned after owner confirms production files",
        }
        shopify = {**common, "channel": "shopify", "shopify_description": shopify_description(d), "etsy_description": "", "etsy_tags": ""}
        etsy = {
            **common,
            "channel": "etsy",
            "shopify_description": "",
            "etsy_description": etsy_description_clean(d),
            "etsy_tags": etsy_tags(d),
        }
        rows.extend([shopify, etsy])
    return rows


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.parse_args()
    logger = setup_logging("build_manifest")
    rows = manifest_rows()
    write_manifest(rows)
    logger.info("Wrote %s manifest rows to products-master.csv", len(rows))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
