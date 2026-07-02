#!/usr/bin/env python3
"""Scan artwork files for dimensions, transparency, and light/dark pairs."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    ARTWORK_CANDIDATES,
    LAUNCH_DESIGNS,
    OUTPUT,
    TARGET_HEIGHT,
    TARGET_WIDTH,
    artwork_search_paths,
    expand_path,
    find_files_matching,
    inspect_image,
    setup_logging,
)

DESIGN_KEYWORDS: dict[str, list[str]] = {
    "city-waco-skyline": ["waco", "skyline"],
    "city-austin-pup-culture": ["austin", "skyline"],
    "city-dallas-dog-scene": ["dallas", "skyline"],
    "city-san-antonio-sniffari": ["san", "skyline"],
    "city-houston-howling": ["houston", "skyline"],
    "breed-french-bulldog": ["french"],
    "breed-dachshund": ["dachshund"],
    "breed-golden-retriever": ["golden"],
    "breed-labrador-retriever": ["labrador"],
    "breed-german-shepherd": ["german", "shepherd"],
    "breed-corgi": ["corgi"],
    "breed-chihuahua": ["chihuahua"],
    "breed-australian-shepherd": ["australian"],
    "breed-siberian-husky": ["husky"],
}


def classify_light_dark(path: Path) -> str:
    name = path.name.lower()
    if any(k in name for k in ("whiteink", "white_ink", "dark", "pepper", "navy", "black")):
        return "dark"
    if any(k in name for k in ("light", "ivory", "cream", "transparent")):
        return "light"
    return "unknown"


def audit_design(product_id: str) -> dict:
    design = next(d for d in LAUNCH_DESIGNS if d["product_id"] == product_id)
    roots = artwork_search_paths()
    keywords = DESIGN_KEYWORDS.get(product_id, [])
    discovered = find_files_matching(keywords, roots) if keywords else []

    candidate_paths = ARTWORK_CANDIDATES.get(product_id, {}).get("candidates", [])
    for rel in candidate_paths:
        p = expand_path(rel) if rel.startswith("~") or rel.startswith("/") else (Path(__file__).resolve().parents[2] / rel)
        if p.exists() and p not in discovered:
            discovered.append(p)

    checks = [inspect_image(p) for p in discovered]
    light = [c for c in checks if classify_light_dark(Path(c.path)) == "light" and c.exists]
    dark = [c for c in checks if classify_light_dark(Path(c.path)) == "dark" and c.exists]
    production = [c for c in checks if c.exists and c.valid_dimensions and c.has_alpha]

    status = "APPROVED" if production else "BLOCKED_ARTWORK"
    issues: list[str] = []
    if not production:
        issues.append("No file meets ~4500x5400 transparent PNG spec")
    if not light and not any(c.valid_dimensions for c in checks if c.exists):
        issues.append("Missing validated light-garment artwork")
    if design.get("printify_colors", "").find("Pepper") >= 0 and not dark:
        issues.append("Pepper curated but no validated dark/white-ink artwork")

    return {
        "product_id": product_id,
        "product_name": design["product_name"],
        "artwork_status": status,
        "files_found": len(checks),
        "production_ready_files": len(production),
        "light_candidates": len(light),
        "dark_candidates": len(dark),
        "issues": issues,
        "files": [
            {
                "path": c.path,
                "size": f"{c.width}x{c.height}",
                "mode": c.mode,
                "alpha": c.has_alpha,
                "valid_dimensions": c.valid_dimensions,
                "issues": c.issues,
            }
            for c in checks
        ],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--product-id", action="append", help="Limit to specific product_id")
    args = parser.parse_args()
    logger = setup_logging("validate_artwork")

    ids = [d["product_id"] for d in LAUNCH_DESIGNS]
    if args.product_id:
        ids = [i for i in args.product_id if i in ids]

    results = [audit_design(pid) for pid in ids]
    OUTPUT.mkdir(parents=True, exist_ok=True)
    out_json = OUTPUT / "artwork_validation.json"
    out_json.write_text(json.dumps(results, indent=2), encoding="utf-8")

    blocked = sum(1 for r in results if r["artwork_status"] != "APPROVED")
    logger.info("Artwork audit: %s designs, %s blocked", len(results), blocked)
    for r in results:
        logger.info("%s => %s (%s files)", r["product_id"], r["artwork_status"], r["files_found"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
