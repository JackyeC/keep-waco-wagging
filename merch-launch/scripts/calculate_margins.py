#!/usr/bin/env python3
"""Calculate gross margins from manifest rows; writes margin-report.csv."""

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    DEFAULT_RETAIL,
    MARGIN_TARGET,
    OUTPUT,
    MANIFEST_PATH,
    read_manifest,
    setup_logging,
)

# Placeholder until Printify API pricing is wired — owner must confirm via inspect_printify_connection
ESTIMATED_BASE_COSTS = {
    "S": 11.50,
    "M": 11.50,
    "L": 11.88,
    "XL": 12.25,
    "2XL": 14.50,
    "3XL": 16.75,
}


def margin_row(row: dict[str, str]) -> dict[str, str]:
    retail = float(row.get("retail_price") or DEFAULT_RETAIL)
    low = float(row.get("base_cost_low") or ESTIMATED_BASE_COSTS["S"])
    high = float(row.get("base_cost_high") or ESTIMATED_BASE_COSTS["3XL"])
    profit_low = round(retail - high, 2)
    margin_low = round(profit_low / retail, 4) if retail else 0
    worst_size = max(ESTIMATED_BASE_COSTS, key=ESTIMATED_BASE_COSTS.get)
    return {
        "product_id": row.get("product_id", ""),
        "channel": row.get("channel", ""),
        "product_name": row.get("product_name", ""),
        "retail_price": f"{retail:.2f}",
        "base_cost_low": f"{low:.2f}",
        "base_cost_high": f"{high:.2f}",
        "gross_profit_at_high_cost": f"{profit_low:.2f}",
        "gross_margin_at_high_cost": f"{margin_low:.2%}",
        "margin_target": f"{MARGIN_TARGET:.0%}",
        "meets_target_at_high_cost": "YES" if margin_low >= MARGIN_TARGET else "NO",
        "highest_cost_size": worst_size,
        "highest_cost_estimate": f"{ESTIMATED_BASE_COSTS[worst_size]:.2f}",
        "notes": "Estimated costs — rerun after Printify provider selection",
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.parse_args()
    logger = setup_logging("calculate_margins")

    if not MANIFEST_PATH.exists():
        logger.error("Manifest missing: %s", MANIFEST_PATH)
        return 1

    rows = read_manifest()
    report_rows = [margin_row(r) for r in rows if r.get("channel") == "shopify"]
    OUTPUT.mkdir(parents=True, exist_ok=True)
    out = OUTPUT / "margin-report.csv"
    fields = list(report_rows[0].keys()) if report_rows else []
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(report_rows)

    under = sum(1 for r in report_rows if r["meets_target_at_high_cost"] == "NO")
    logger.info("Margin report: %s products, %s below target at 3XL estimate", len(report_rows), under)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
