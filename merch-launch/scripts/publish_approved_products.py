#!/usr/bin/env python3
"""Publish approved products — requires all APPROVED flags and --publish."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import is_dry_run, log_action, read_manifest, setup_logging  # noqa: E402

REQUIRED_APPROVALS = ("qa_status", "artwork_status", "mockup_status", "publish_status")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--publish", action="store_true", help="Allow publish attempts")
    args = parser.parse_args()
    logger = setup_logging("publish_approved_products")

    if not args.publish:
        logger.info("Refusing to publish without --publish flag")
        return 0
    if is_dry_run():
        logger.error("DRY_RUN=true — set DRY_RUN=false to publish")
        return 1

    rows = [r for r in read_manifest() if r.get("channel") == "shopify"]
    blocked = 0
    for row in rows:
        missing = [f for f in REQUIRED_APPROVALS if row.get(f) != "APPROVED"]
        if missing:
            blocked += 1
            log_action(logger, "publish_blocked", f"{row['product_id']}: {missing}")
        else:
            log_action(logger, "publish_blocked", f"{row['product_id']}: publish pipeline not wired yet")

    logger.info("Publish scan: %s products, all blocked pending approval + integration", len(rows))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
