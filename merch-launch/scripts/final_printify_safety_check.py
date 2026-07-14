#!/usr/bin/env python3
"""Read-only final safety check before authorizing an unpublished Waco review draft."""

from __future__ import annotations

import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    CC1717_BLUEPRINT_ID,
    OUTPUT,
    ROOT,
    is_dry_run,
    load_env,
    printify_headers,
    setup_logging,
    with_backoff,
)

try:
    import requests
except ImportError:
    requests = None  # type: ignore

from create_printify_drafts import (  # noqa: E402
    API_BASE,
    ARTWORK_TREATMENTS,
    PLACEMENT,
    RECOMMENDED_PROVIDER_ID,
    WACO_PRODUCT_NAME,
)

KEYWORDS = ("waco", "skyline", "keep waco wagging")
PRINTIFY_CHOICE_DISCLAIMER = {
    "fulfillment_option": "Printify Choice",
    "provider_id": RECOMMENDED_PROVIDER_ID,
    "actual_print_provider": "May vary by order (routing network)",
    "guaranteed_facility": False,
    "catalog_shipping_and_production": "Estimates only — not customer promises",
}

BLUE_SPRUCE_STATUS = {
    "garment_color": "Blue Spruce",
    "draft_inclusion": "APPROVED_FOR_UNPUBLISHED_VISUAL_REVIEW_ONLY",
    "production_artwork": "bay.png",
    "approval_to_publish_or_sell": "NOT YET GRANTED",
    "approval_to_order_samples_or_submit_production": "NOT GRANTED",
}


def _utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _proposed_sha256() -> dict[str, str]:
    out: dict[str, str] = {}
    art_dir = ROOT / "artwork" / "waco-skyline-tee"
    for spec in ARTWORK_TREATMENTS.values():
        path = art_dir / spec["file"]
        if path.exists():
            out[spec["file"]] = hashlib.sha256(path.read_bytes()).hexdigest()
    return out


def _plain(html: str) -> str:
    return re.sub(r"\s+", " ", re.sub("<[^>]+>", " ", html or "")).strip()


def _shop_id() -> str:
    load_env()
    import os

    return os.getenv("PRINTIFY_SHOP_ID", "").strip()


def _list_products(headers: dict[str, str]) -> list[dict[str, Any]]:
    shop_id = _shop_id()
    products: list[dict[str, Any]] = []
    page = 1
    while page <= 20:

        def fetch() -> dict[str, Any]:
            resp = requests.get(
                f"{API_BASE}/shops/{shop_id}/products.json?limit=50&page={page}",
                headers=headers,
                timeout=60,
            )
            resp.raise_for_status()
            return resp.json()

        data = with_backoff(fetch)
        products.extend(data.get("data", []))
        if page >= data.get("last_page", 1):
            break
        page += 1
    return products


def _matches_scan(p: dict[str, Any]) -> bool:
    title = (p.get("title") or "").lower()
    desc = _plain(p.get("description") or "").lower()
    if p.get("blueprint_id") == CC1717_BLUEPRINT_ID:
        return True
    return any(k in title or k in desc for k in KEYWORDS)


def _upload_meta(headers: dict[str, str], upload_id: str, cache: dict[str, Any]) -> dict[str, Any] | None:
    if upload_id in cache:
        return cache[upload_id]
    if requests is None:
        return None

    def fetch() -> dict[str, Any]:
        resp = requests.get(f"{API_BASE}/uploads/{upload_id}.json", headers=headers, timeout=30)
        resp.raise_for_status()
        return resp.json()

    try:
        cache[upload_id] = with_backoff(fetch)
    except Exception:
        cache[upload_id] = None
    return cache[upload_id]


def _analyze_product(headers: dict[str, str], pid: str, proposed_sha: dict[str, str], cache: dict[str, Any]) -> dict[str, Any]:
    shop_id = _shop_id()

    def fetch() -> dict[str, Any]:
        resp = requests.get(f"{API_BASE}/shops/{shop_id}/products/{pid}.json", headers=headers, timeout=60)
        resp.raise_for_status()
        return resp.json()

    p = with_backoff(fetch)
    colors: set[str] = set()
    sizes: set[str] = set()
    for variant in p.get("variants", []):
        if not variant.get("is_enabled"):
            continue
        parts = (variant.get("title") or "").split(" / ")
        if len(parts) >= 2:
            colors.add(parts[0].strip())
            sizes.add(parts[1].strip())

    uploads: list[dict[str, Any]] = []
    placements: list[dict[str, Any]] = []
    seen: set[str] = set()
    for area in p.get("print_areas") or []:
        for placeholder in area.get("placeholders") or []:
            for image in placeholder.get("images") or []:
                image_id = str(image.get("id") or "")
                if not image_id or image_id in seen:
                    continue
                seen.add(image_id)
                meta = _upload_meta(headers, image_id, cache)
                file_name = (meta or {}).get("file_name") or image.get("name")
                uploads.append(
                    {
                        "image_id": image_id,
                        "file_name": file_name,
                        "width": (meta or {}).get("width") or image.get("width"),
                        "height": (meta or {}).get("height") or image.get("height"),
                    }
                )
                placements.append(
                    {
                        "position": placeholder.get("position"),
                        "image_id": image_id,
                        "file_name": file_name,
                        "x": image.get("x"),
                        "y": image.get("y"),
                        "scale": image.get("scale"),
                    }
                )

    title = _plain(p.get("title") or "")
    desc = _plain(p.get("description") or "").lower()
    proposed_names = set(proposed_sha.keys())
    upload_names = {(u.get("file_name") or "").lower() for u in uploads}
    same_art = bool(proposed_names & upload_names) or any(
        Path(name).name in proposed_names for name in upload_names if name
    )

    tee = any(t in title.lower() for t in ("tee", "t-shirt", "shirt"))
    skyline_product = tee and "skyline" in title.lower() and "waco" in title.lower()
    cc1717_skyline = p.get("blueprint_id") == CC1717_BLUEPRINT_ID and (
        skyline_product or "skyline" in desc or "alico" in desc or "suspension bridge" in desc
    )
    materially_same = skyline_product or cc1717_skyline

    notes: list[str] = []
    if same_art:
        notes.append("Uses same production artwork filename(s) as proposed draft")
    if p.get("blueprint_id") == CC1717_BLUEPRINT_ID and not materially_same:
        notes.append("Same CC1717 blank as proposed draft but different design concept")
    if materially_same and not same_art:
        notes.append("Legacy Waco Skyline tee concept with different artwork/blank")
    if p.get("visible"):
        notes.append("Currently visible/published in Printify")

    external = p.get("external") or {}
    return {
        "printify_product_id": p.get("id"),
        "title": p.get("title"),
        "description_summary": _plain(p.get("description") or "")[:280],
        "blueprint_id": p.get("blueprint_id"),
        "print_provider_id": p.get("print_provider_id"),
        "created_at": p.get("created_at"),
        "updated_at": p.get("updated_at"),
        "published_visible": p.get("visible"),
        "external_handle": external.get("handle"),
        "external_shopify_product_id": external.get("id"),
        "enabled_colors": sorted(colors),
        "enabled_sizes": sorted(sizes),
        "print_image_uploads": uploads,
        "print_placements": placements,
        "artwork_match": {
            "uses_same_production_artwork_as_proposed": same_art,
            "appears_materially_same_waco_skyline_product": materially_same,
            "notes": notes,
        },
    }


def _determine_result(reports: list[dict[str, Any]]) -> tuple[str, list[str]]:
    blockers = [
        r
        for r in reports
        if r["artwork_match"]["uses_same_production_artwork_as_proposed"]
        or r["artwork_match"]["appears_materially_same_waco_skyline_product"]
    ]
    if blockers:
        reasons = [
            "At least one existing Printify product appears materially the same Waco Skyline tee and/or reuses proposed production artwork.",
            "Owner must decide whether to update/replace the legacy listing or proceed with a separate draft.",
        ]
        for item in blockers:
            reasons.append(
                f"Legacy match: {item['printify_product_id']} — {item['title']} "
                f"(bp {item['blueprint_id']}, visible={item['published_visible']}, "
                f"uploads={[u.get('file_name') for u in item['print_image_uploads']]})"
            )
        return "POTENTIAL DUPLICATE — OWNER DECISION REQUIRED", reasons

    return "SAFE TO AUTHORIZE ONE UNPUBLISHED REVIEW DRAFT", [
        "No existing product uses proposed Phase 3 production artwork files.",
        "No CC1717 Waco Skyline listing with matching concept and artwork was found.",
        "Legacy keyword matches are different designs/blanks (documented in audit).",
        "Blue Spruce may be included unpublished for Printify mockup review only.",
        "DRY_RUN remains true; no writes performed during this check.",
    ]


def run_check() -> dict[str, Any]:
    if requests is None:
        raise RuntimeError("requests package not installed")
    headers = printify_headers()
    if not headers:
        raise RuntimeError("PRINTIFY_API_TOKEN missing")

    proposed_sha = _proposed_sha256()
    products = _list_products(headers)
    matches = [p for p in products if _matches_scan(p)]
    cache: dict[str, Any] = {}
    detailed = [_analyze_product(headers, p["id"], proposed_sha, cache) for p in matches]

    tee_reports = [
        r
        for r in detailed
        if r["blueprint_id"] == CC1717_BLUEPRINT_ID
        or any(k in (r.get("title") or "").lower() for k in ("tee", "t-shirt", "shirt"))
    ]

    result, reasons = _determine_result(detailed)

    report = {
        "generated_at": _utc_now(),
        "dry_run": is_dry_run(),
        "authorization_result": result,
        "authorization_reasons": reasons,
        "proposed_review_draft": {
            "title": WACO_PRODUCT_NAME,
            "blueprint_id": CC1717_BLUEPRINT_ID,
            "printify_choice": PRINTIFY_CHOICE_DISCLAIMER,
            "placement": PLACEMENT,
            "artwork_treatments": {
                tid: {
                    "file": spec["file"],
                    "garment_colors": spec["garment_colors"],
                    "sha256": proposed_sha.get(spec["file"]),
                }
                for tid, spec in ARTWORK_TREATMENTS.items()
            },
        },
        "blue_spruce_status": BLUE_SPRUCE_STATUS,
        "legacy_scan": {
            "products_scanned": len(products),
            "matches": len(matches),
            "criteria": {
                "keywords": list(KEYWORDS),
                "blueprint_id": CC1717_BLUEPRINT_ID,
            },
            "all_matches": [
                {
                    "printify_product_id": r["printify_product_id"],
                    "title": r["title"],
                    "blueprint_id": r["blueprint_id"],
                    "published_visible": r["published_visible"],
                    "materially_same_waco_skyline": r["artwork_match"][
                        "appears_materially_same_waco_skyline_product"
                    ],
                    "same_production_artwork": r["artwork_match"][
                        "uses_same_production_artwork_as_proposed"
                    ],
                }
                for r in detailed
            ],
            "tee_and_cc1717_detail": tee_reports,
        },
        "safety_confirmations": {
            "post_requests_sent": False,
            "products_created_or_updated": False,
            "artwork_uploaded": False,
            "published": False,
            "shopify_api_called": False,
            "orders_submitted": False,
        },
    }
    return report


def _write_markdown(report: dict[str, Any]) -> None:
    lines = [
        "# Printify Final Safety Check (Read-Only)",
        "",
        f"Generated: {report['generated_at']}",
        f"DRY_RUN: `{report['dry_run']}`",
        "",
        f"## Result: **{report['authorization_result']}**",
        "",
    ]
    for reason in report["authorization_reasons"]:
        lines.append(f"- {reason}")
    lines.extend(
        [
            "",
            "## Printify Choice disclaimer",
            "",
            f"- Fulfillment option: **{PRINTIFY_CHOICE_DISCLAIMER['fulfillment_option']}** (ID {RECOMMENDED_PROVIDER_ID})",
            "- Actual fulfilling Print Provider may vary by order",
            "- Exact production facility is **not** guaranteed",
            "- Catalog shipping and production figures are **estimates**, not customer promises",
            "",
            "## Blue Spruce status",
            "",
            f"- Draft inclusion: `{BLUE_SPRUCE_STATUS['draft_inclusion']}`",
            f"- Production artwork: `{BLUE_SPRUCE_STATUS['production_artwork']}`",
            f"- Approval to publish or sell: `{BLUE_SPRUCE_STATUS['approval_to_publish_or_sell']}`",
            f"- Approval to order samples or submit production: `{BLUE_SPRUCE_STATUS['approval_to_order_samples_or_submit_production']}`",
            "",
            "## Legacy Waco / CC1717 comparison (tees + blueprint 706)",
            "",
        ]
    )
    for item in report["legacy_scan"]["tee_and_cc1717_detail"]:
        match = item["artwork_match"]
        lines.append(f"### `{item['printify_product_id']}` — {item['title']}")
        lines.append("")
        lines.append(f"- Blueprint: {item['blueprint_id']} | Provider: {item['print_provider_id']}")
        lines.append(f"- Created: {item['created_at']} | Updated: {item['updated_at']}")
        lines.append(f"- Published/visible: {item['published_visible']}")
        if item.get("external_handle"):
            lines.append(f"- Shopify handle: {item['external_handle']}")
        lines.append(f"- Enabled colors: {', '.join(item['enabled_colors'][:12])}{'…' if len(item['enabled_colors'])>12 else ''}")
        lines.append(f"- Enabled sizes: {', '.join(item['enabled_sizes'])}")
        uploads = item.get("print_image_uploads") or []
        if uploads:
            lines.append("- Print uploads:")
            for up in uploads:
                lines.append(
                    f"  - `{up.get('image_id')}` — {up.get('file_name')} ({up.get('width')}×{up.get('height')})"
                )
        lines.append(f"- Same production artwork as proposed: **{match['uses_same_production_artwork_as_proposed']}**")
        lines.append(f"- Materially same Waco Skyline product: **{match['appears_materially_same_waco_skyline_product']}**")
        if match.get("notes"):
            lines.append(f"- Notes: {'; '.join(match['notes'])}")
        lines.append("")

    lines.append("Full JSON: `output/printify_final_safety_check.json`")
    (OUTPUT / "PRINTIFY_FINAL_SAFETY_CHECK.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    logger = setup_logging("final_printify_safety_check")
    load_env()
    report = run_check()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "printify_final_safety_check.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    _write_markdown(report)
    logger.info("Final safety check: %s", report["authorization_result"])
    print(report["authorization_result"])
    for reason in report["authorization_reasons"]:
        print(f"- {reason}")
    return 0 if report["authorization_result"].startswith("SAFE") else 1


if __name__ == "__main__":
    raise SystemExit(main())
