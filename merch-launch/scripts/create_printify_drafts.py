#!/usr/bin/env python3
"""Create Printify draft products — requires --create-drafts and approved artwork."""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    CC1717_BLUEPRINT_ID,
    OUTPUT,
    is_dry_run,
    load_env,
    log_action,
    printify_headers,
    read_manifest,
    setup_logging,
)

try:
    import requests
except ImportError:
    requests = None  # type: ignore

TEST_BATCH = {
    "city-waco-skyline",
    "breed-french-bulldog",
    "breed-golden-retriever",
}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--create-drafts", action="store_true", help="Actually call Printify API")
    parser.add_argument("--product-id", action="append")
    args = parser.parse_args()
    logger = setup_logging("create_printify_drafts")
    load_env()

    results: list[dict] = []
    rows = read_manifest()
    target_ids = set(args.product_id) if args.product_id else TEST_BATCH

    if is_dry_run() and args.create_drafts:
        logger.warning("DRY_RUN=true — draft creation blocked even with --create-drafts")
        args.create_drafts = False

    for row in rows:
        if row.get("channel") != "shopify":
            continue
        pid = row.get("product_id", "")
        if pid not in target_ids:
            continue

        entry = {
            "product_id": pid,
            "product_name": row.get("product_name"),
            "action": "skipped",
            "reason": "",
            "printify_product_id": "",
        }

        if row.get("artwork_status") != "APPROVED":
            entry["reason"] = f"artwork_status={row.get('artwork_status')}"
        elif not printify_headers():
            entry["reason"] = "PRINTIFY_API_TOKEN missing"
        elif not args.create_drafts:
            entry["reason"] = "dry-run (pass --create-drafts and set DRY_RUN=false)"
        else:
            entry["reason"] = "API draft creation not implemented until artwork + provider approved"
            entry["action"] = "blocked"

        log_action(logger, "printify_draft", f"{pid}: {entry['reason']}")
        results.append(entry)

    OUTPUT.mkdir(parents=True, exist_ok=True)
    out = OUTPUT / "product-results.csv"
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(results[0].keys()) if results else ["product_id"])
        w.writeheader()
        w.writerows(results)

    (OUTPUT / "printify_draft_attempts.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    logger.info("Processed %s test-batch products", len(results))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
