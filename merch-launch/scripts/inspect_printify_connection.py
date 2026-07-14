#!/usr/bin/env python3
"""Inspect Printify API connectivity (read-only unless --create-drafts on sibling script)."""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    CC1717_BLUEPRINT_ID,
    OUTPUT,
    is_dry_run,
    load_env,
    printify_headers,
    required_credentials_present,
    setup_logging,
    with_backoff,
)

try:
    import requests
except ImportError:
    requests = None  # type: ignore


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.parse_args()
    logger = setup_logging("inspect_printify_connection")
    load_env()
    creds = required_credentials_present()

    shop_id_env = os.getenv("PRINTIFY_SHOP_ID", "").strip()
    result = {
        "dry_run": is_dry_run(),
        "credentials": {k: creds.get(k, False) for k in ("PRINTIFY_API_TOKEN", "PRINTIFY_SHOP_ID")},
        "configured_shop_id": shop_id_env,
        "configured_shop": None,
        "blueprint_target": CC1717_BLUEPRINT_ID,
        "shops": [],
        "blueprint": None,
        "errors": [],
    }

    if not creds.get("PRINTIFY_API_TOKEN"):
        result["errors"].append("PRINTIFY_API_TOKEN not set in merch-launch/.env")
        logger.warning("No Printify token — skipping API calls")
    elif requests is None:
        result["errors"].append("requests package not installed")
    else:
        headers = printify_headers()

        def fetch_shops():
            r = requests.get("https://api.printify.com/v1/shops.json", headers=headers, timeout=30)
            r.raise_for_status()
            return r.json()

        try:
            shops = with_backoff(fetch_shops, logger=logger)
            result["shops"] = [
                {
                    "id": s.get("id"),
                    "title": s.get("title"),
                    "sales_channel": s.get("sales_channel"),
                }
                for s in shops
            ]
            logger.info("Printify shops found: %s", len(result["shops"]))
            if shop_id_env:
                match = next((s for s in shops if str(s.get("id")) == shop_id_env), None)
                if match:
                    result["configured_shop"] = {
                        "id": match.get("id"),
                        "title": match.get("title"),
                        "sales_channel": match.get("sales_channel"),
                    }
                else:
                    result["errors"].append(
                        f"PRINTIFY_SHOP_ID {shop_id_env} not found in authenticated account"
                    )
        except Exception as exc:
            result["errors"].append(f"shops.json failed: {exc}")

        shop_id = os.getenv("PRINTIFY_SHOP_ID")
        if shop_id and not result["errors"]:
            def fetch_blueprint():
                url = f"https://api.printify.com/v1/catalog/blueprints/{CC1717_BLUEPRINT_ID}.json"
                r = requests.get(url, headers=headers, timeout=30)
                r.raise_for_status()
                return r.json()

            try:
                bp = with_backoff(fetch_blueprint, logger=logger)
                result["blueprint"] = {
                    "id": bp.get("id"),
                    "title": bp.get("title"),
                    "brand": bp.get("brand"),
                    "model": bp.get("model"),
                }
                logger.info("Blueprint %s: %s", CC1717_BLUEPRINT_ID, bp.get("title"))
            except Exception as exc:
                result["errors"].append(f"blueprint lookup failed: {exc}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "printify_connection.json").write_text(json.dumps(result, indent=2), encoding="utf-8")
    return 1 if result["errors"] and not creds.get("PRINTIFY_API_TOKEN") else 0


if __name__ == "__main__":
    raise SystemExit(main())
