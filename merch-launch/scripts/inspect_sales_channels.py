#!/usr/bin/env python3
"""Inspect connected sales channels via public Shopify JSON and credential checks."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    OUTPUT,
    SHOPIFY_CONFLICT_HANDLES,
    load_env,
    required_credentials_present,
    setup_logging,
    with_backoff,
)

try:
    import requests
except ImportError:
    requests = None  # type: ignore

SHOPIFY_DOMAIN = "keepwacowagging.myshopify.com"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.parse_args()
    logger = setup_logging("inspect_sales_channels")
    load_env()
    creds = required_credentials_present()

    result = {
        "shopify_public": {"domain": SHOPIFY_DOMAIN, "product_count": 0, "conflicts": []},
        "shopify_admin_api": creds.get("SHOPIFY_ACCESS_TOKEN", False),
        "etsy_api": creds.get("ETSY_API_KEY", False) and creds.get("ETSY_SHOP_ID", False),
        "errors": [],
    }

    if requests is None:
        result["errors"].append("requests not installed")
    else:
        def fetch_products():
            url = f"https://{SHOPIFY_DOMAIN}/products.json?limit=250"
            r = requests.get(url, timeout=30)
            r.raise_for_status()
            return r.json().get("products", [])

        try:
            products = with_backoff(fetch_products, logger=logger)
            result["shopify_public"]["product_count"] = len(products)
            handles = {p["handle"] for p in products}
            conflicts = []
            for h in SHOPIFY_CONFLICT_HANDLES:
                if h in handles:
                    title = next(p["title"] for p in products if p["handle"] == h)
                    conflicts.append({"handle": h, "title": title})
            result["shopify_public"]["conflicts"] = conflicts
            logger.info("Shopify public catalog: %s products, %s launch conflicts", len(products), len(conflicts))
        except Exception as exc:
            result["errors"].append(f"Shopify public fetch failed: {exc}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "sales_channels.json").write_text(json.dumps(result, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
