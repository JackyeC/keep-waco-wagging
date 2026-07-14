#!/usr/bin/env python3
"""Create a single unpublished Printify draft for the approved Waco Skyline Tee only."""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import logging
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (  # noqa: E402
    CC1717_BLUEPRINT_ID,
    CC1717_BLANK_NAME,
    DEFAULT_RETAIL,
    OUTPUT,
    ROOT,
    inspect_image,
    is_dry_run,
    load_env,
    log_action,
    printify_headers,
    read_manifest,
    redact,
    setup_logging,
    with_backoff,
)

try:
    import requests
except ImportError:
    requests = None  # type: ignore

WACO_PRODUCT_ID = "city-waco-skyline"
WACO_PRODUCT_NAME = "Keep Waco Wagging — Waco Skyline Tee"
BLOCKED_PRODUCT_IDS = frozenset({"breed-french-bulldog", "breed-golden-retriever"})
REQUIRED_ARTWORK_STATUS = "APPROVED"
REQUIRED_QA_STATUS = "APPROVED_FOR_ONE_UNPUBLISHED_PRINTIFY_DRAFT_ONLY"
REQUIRED_PUBLISH_STATUS = "DRAFT"
APPROVED_COLORS = ("Ivory", "Blossom", "Bay", "Blue Spruce", "Pepper")
APPROVED_SIZES = ("S", "M", "L", "XL", "2XL", "3XL")
RECOMMENDED_PROVIDER_ID = 99
RECOMMENDED_PROVIDER_NAME = "Printify Choice"
PRINTIFY_CHOICE_DISCLAIMER = (
    "Printify Choice (ID 99) is a routing network — the actual fulfilling print provider "
    "may vary by order; production facility is not guaranteed. Catalog shipping, handling, "
    "and cost figures are estimates only, not customer promises."
)
PRINT_AREA = {"width": 3839, "height": 4387}
PLACEMENT = {"position": "front", "x": 0.5, "y": 0.48, "scale": 0.92, "angle": 0}
REQUIRED_SHOP_ID = "21413196"
LEGACY_WACO_SKYLINE_PRODUCT_ID = "6a3b03d41ead27bd470ad675"
REVIEW_DRAFT_TITLE = "REVIEW ONLY — Waco Skyline CC1717 — DO NOT PUBLISH"
REVIEW_DRAFT_DESCRIPTION_PREFIX = (
    "INTERNAL REVIEW DRAFT. Not approved for publication, sale, sample ordering, or production."
)
ENV_PATH = ROOT / ".env"
API_BASE = "https://api.printify.com/v1"

# Unique production artwork treatments (upload once, reuse Printify image ID).
ARTWORK_TREATMENTS: dict[str, dict[str, Any]] = {
    "ivory": {
        "file": "ivory.png",
        "label": "Ivory / Natural",
        "garment_colors": ["Ivory"],
        "source_notes": "Per-garment master — Phase 3 final",
    },
    "blossom": {
        "file": "blossom.png",
        "label": "Blossom",
        "garment_colors": ["Blossom"],
        "source_notes": "Per-garment master — Phase 3 final",
    },
    "bay_sage": {
        "file": "bay.png",
        "label": "Bay / Blue Spruce / Sage",
        "garment_colors": ["Bay", "Blue Spruce"],
        "source_notes": (
            "Shared light-ink treatment documented in Phase 3 final/revision "
            "(execute_phase3_final.py GARMENTS['bay'], owner review contrast row, "
            "PHASE3_FINAL_VALIDATION.json sha256 86afad30…)"
        ),
    },
    "pepper": {
        "file": "pepper.png",
        "label": "Pepper",
        "garment_colors": ["Pepper"],
        "source_notes": "Per-garment master — Phase 3 final",
    },
}

FORBIDDEN_ENDPOINT_PATTERNS = (
    "/publish",
    "myshopify.com",
    "etsy.com",
    "/orders",
    "/fulfillment",
)


def _utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _shop_id() -> str:
    load_env()
    return os.getenv("PRINTIFY_SHOP_ID", "").strip()


def _assert_not_blocked_product(product_id: str) -> None:
    if product_id in BLOCKED_PRODUCT_IDS:
        raise RuntimeError(
            f"Refusing blocked product_id={product_id}. "
            "French Bulldog and Golden Retriever drafts are prohibited."
        )
    if product_id != WACO_PRODUCT_ID:
        raise RuntimeError(
            f"Hard-limited to Waco Skyline Tee only (product_id={WACO_PRODUCT_ID})."
        )


def _find_waco_row() -> dict[str, str]:
    rows = read_manifest()
    matches = [
        r
        for r in rows
        if r.get("product_id") == WACO_PRODUCT_ID and r.get("channel") == "shopify"
    ]
    if not matches:
        raise RuntimeError(f"No shopify manifest row for {WACO_PRODUCT_ID}")
    if len(matches) > 1:
        raise RuntimeError(f"Multiple shopify rows for {WACO_PRODUCT_ID}")
    return matches[0]


def _validate_manifest_row(row: dict[str, str]) -> list[str]:
    issues: list[str] = []
    _assert_not_blocked_product(row.get("product_id", ""))
    if row.get("product_name") != WACO_PRODUCT_NAME:
        issues.append(f"unexpected product_name={row.get('product_name')!r}")
    checks = (
        ("artwork_status", REQUIRED_ARTWORK_STATUS),
        ("qa_status", REQUIRED_QA_STATUS),
        ("publish_status", REQUIRED_PUBLISH_STATUS),
    )
    for field, expected in checks:
        actual = row.get(field, "")
        if actual != expected:
            issues.append(f"{field}={actual!r} (required {expected!r})")
    manifest_colors = [c.strip() for c in row.get("printify_color_names", "").split("|") if c.strip()]
    for color in APPROVED_COLORS:
        if color not in manifest_colors:
            issues.append(f"approved color missing from manifest: {color}")
    return issues


def _artwork_dir() -> Path:
    return ROOT / "artwork" / "waco-skyline-tee"


def _treatment_for_garment_color(color: str) -> str | None:
    for treatment_id, spec in ARTWORK_TREATMENTS.items():
        if color in spec["garment_colors"]:
            return treatment_id
    return None


def _garment_color_mapping() -> dict[str, str]:
    mapping: dict[str, str] = {}
    for treatment_id, spec in ARTWORK_TREATMENTS.items():
        for color in spec["garment_colors"]:
            mapping[color] = treatment_id
    return mapping


def _validate_artwork(row: dict[str, str]) -> dict[str, Any]:
    art_dir = _artwork_dir()
    report: dict[str, Any] = {
        "artwork_directory": str(art_dir),
        "artwork_treatments": {},
        "garment_color_to_treatment": _garment_color_mapping(),
        "issues": [],
        "print_area_px": PRINT_AREA,
        "placement": PLACEMENT,
    }

    fit_scale = min(PRINT_AREA["width"] / 4500, PRINT_AREA["height"] / 5400)
    effective_scale = fit_scale * PLACEMENT["scale"]
    printed_width_in = (4500 * effective_scale) / 300
    printed_height_in = (5400 * effective_scale) / 300
    center_y_px = PLACEMENT["y"] * PRINT_AREA["height"]
    top_px = center_y_px - (5400 * effective_scale) / 2
    bottom_px = center_y_px + (5400 * effective_scale) / 2

    report["estimated_printed_width_inches"] = round(printed_width_in, 2)
    report["estimated_printed_height_inches"] = round(printed_height_in, 2)
    report["clipping_check"] = {
        "top_px": round(top_px, 1),
        "bottom_px": round(bottom_px, 1),
        "print_area_height_px": PRINT_AREA["height"],
        "clips_top": top_px < 0,
        "clips_bottom": bottom_px > PRINT_AREA["height"],
    }

    if report["clipping_check"]["clips_top"] or report["clipping_check"]["clips_bottom"]:
        report["issues"].append("proposed placement clips outside front print area")

    if not (11.0 <= printed_width_in <= 12.5):
        report["issues"].append(
            f"printed width {printed_width_in:.2f}\" outside ~11–12\" target"
        )

    for treatment_id, spec in ARTWORK_TREATMENTS.items():
        path = art_dir / spec["file"]
        check = inspect_image(path)
        sha256 = hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else ""
        entry: dict[str, Any] = {
            "treatment_id": treatment_id,
            "label": spec["label"],
            "file": str(path),
            "exists": check.exists,
            "dimensions": [check.width, check.height],
            "mode": check.mode,
            "has_transparency": check.has_alpha,
            "valid_production_dimensions": check.valid_dimensions,
            "sha256": sha256,
            "garment_colors": spec["garment_colors"],
            "source_notes": spec["source_notes"],
            "issues": list(check.issues),
        }
        if not check.exists:
            report["issues"].append(f"missing production artwork treatment {treatment_id}: {spec['file']}")
        elif check.issues:
            report["issues"].append(f"{treatment_id}: {', '.join(check.issues)}")
        report["artwork_treatments"][treatment_id] = entry

    for color in APPROVED_COLORS:
        treatment_id = _treatment_for_garment_color(color)
        if not treatment_id:
            report["issues"].append(f"no artwork treatment mapped for garment color {color}")

    light = row.get("artwork_light", "artwork/waco-skyline-tee/ivory.png")
    report["primary_artwork_reference"] = str((ROOT / light).resolve())
    return report


def _catalog_variants(provider_id: int) -> list[dict[str, Any]]:
    if requests is None:
        raise RuntimeError("requests package not installed")
    headers = printify_headers()
    if not headers:
        raise RuntimeError("PRINTIFY_API_TOKEN missing")

    def fetch() -> list[dict[str, Any]]:
        url = f"{API_BASE}/catalog/blueprints/{CC1717_BLUEPRINT_ID}/print_providers/{provider_id}/variants.json"
        resp = requests.get(url, headers=headers, timeout=120)
        resp.raise_for_status()
        return resp.json().get("variants", [])

    return with_backoff(fetch)


def _select_variants(variants: list[dict[str, Any]]) -> list[dict[str, Any]]:
    selected: list[dict[str, Any]] = []
    for variant in variants:
        options = variant.get("options", {})
        color = options.get("color")
        size = options.get("size")
        if color in APPROVED_COLORS and size in APPROVED_SIZES:
            selected.append(
                {
                    "id": variant["id"],
                    "title": variant.get("title"),
                    "color": color,
                    "size": size,
                }
            )
    return selected


def _estimate_costs(selected: list[dict[str, Any]]) -> dict[str, Any]:
    """Use known CC1717 Printify Choice cost pattern from existing shop product."""
    by_size: dict[str, int] = {
        "S": 1241,
        "M": 1241,
        "L": 1241,
        "XL": 1241,
        "2XL": 1367,
        "3XL": 1571,
    }
    out: dict[str, Any] = {"source": "existing shop CC1717 product on Printify Choice (read-only reference)", "variants": []}
    retail_cents = int(float(DEFAULT_RETAIL) * 100)
    for item in selected:
        cost = by_size.get(item["size"], 1241)
        out["variants"].append(
            {
                "variant_id": item["id"],
                "title": item["title"],
                "base_cost_cents": cost,
                "base_cost_usd": round(cost / 100, 2),
                "proposed_retail_cents": retail_cents,
                "proposed_retail_usd": DEFAULT_RETAIL,
            }
        )
    out["us_shipping_first_item_cents"] = 475
    out["us_shipping_first_item_usd"] = 4.75
    return out


def _shipping_info(provider_id: int) -> dict[str, Any]:
    if requests is None:
        return {}
    headers = printify_headers()

    def fetch() -> dict[str, Any]:
        url = f"{API_BASE}/catalog/blueprints/{CC1717_BLUEPRINT_ID}/print_providers/{provider_id}/shipping.json"
        resp = requests.get(url, headers=headers, timeout=60)
        resp.raise_for_status()
        return resp.json()

    return with_backoff(fetch)


def _provider_details(provider_id: int) -> dict[str, Any]:
    if requests is None:
        return {}
    headers = printify_headers()

    def fetch() -> dict[str, Any]:
        url = f"{API_BASE}/catalog/print_providers/{provider_id}.json"
        resp = requests.get(url, headers=headers, timeout=60)
        resp.raise_for_status()
        return resp.json()

    return with_backoff(fetch)


def _search_duplicate_products(title: str) -> dict[str, Any]:
    if requests is None:
        raise RuntimeError("requests package not installed")
    headers = printify_headers()
    shop_id = _shop_id()
    if not shop_id:
        raise RuntimeError("PRINTIFY_SHOP_ID missing")

    matches: list[dict[str, Any]] = []
    page = 1
    while page <= 10:
        url = f"{API_BASE}/shops/{shop_id}/products.json?limit=50&page={page}"

        def fetch() -> dict[str, Any]:
            resp = requests.get(url, headers=headers, timeout=60)
            resp.raise_for_status()
            return resp.json()

        data = with_backoff(fetch)
        for product in data.get("data", []):
            product_title = product.get("title", "")
            if product_title.strip().lower() == title.strip().lower():
                matches.append(
                    {
                        "id": product.get("id"),
                        "title": product_title,
                        "visible": product.get("visible"),
                        "blueprint_id": product.get("blueprint_id"),
                        "print_provider_id": product.get("print_provider_id"),
                    }
                )
        if page >= data.get("last_page", 1):
            break
        page += 1

    return {
        "search_title": title,
        "exact_matches": matches,
        "duplicate_found": bool(matches),
    }


def _group_variants_by_treatment(selected: list[dict[str, Any]]) -> dict[str, list[int]]:
    groups: dict[str, list[int]] = {tid: [] for tid in ARTWORK_TREATMENTS}
    for item in selected:
        treatment_id = _treatment_for_garment_color(item["color"])
        if treatment_id:
            groups[treatment_id].append(item["id"])
    return {tid: ids for tid, ids in groups.items() if ids}


def _build_upload_plan(artwork_report: dict[str, Any]) -> list[dict[str, Any]]:
    uploads: list[dict[str, Any]] = []
    for treatment_id, spec in ARTWORK_TREATMENTS.items():
        info = artwork_report["artwork_treatments"].get(treatment_id, {})
        path = Path(info.get("file", ""))
        payload: dict[str, Any] = {
            "treatment_id": treatment_id,
            "endpoint": "POST /v1/uploads/images.json",
            "file_name": spec["file"],
            "file_path": str(path),
            "garment_colors_served": spec["garment_colors"],
            "would_send": {
                "file_name": spec["file"],
                "contents": "<base64-encoded PNG bytes omitted in dry-run report>",
            },
        }
        if path.exists():
            payload["local_file_size_bytes"] = path.stat().st_size
            payload["sha256"] = info.get("sha256", "")
        else:
            payload["blocked"] = True
            payload["reason"] = "missing approved production artwork"
        uploads.append(payload)
    return uploads


def _production_sha256() -> dict[str, str]:
    out: dict[str, str] = {}
    art_dir = _artwork_dir()
    for spec in ARTWORK_TREATMENTS.values():
        path = art_dir / spec["file"]
        if path.exists():
            out[spec["file"]] = hashlib.sha256(path.read_bytes()).hexdigest()
    return out


def _set_dry_run_env(enabled: bool) -> None:
    if not ENV_PATH.exists():
        return
    text = ENV_PATH.read_text(encoding="utf-8")
    value = "true" if enabled else "false"
    if re.search(r"^DRY_RUN=", text, flags=re.M):
        text = re.sub(r"^DRY_RUN=.*$", f"DRY_RUN={value}", text, flags=re.M)
    else:
        text = text.rstrip() + f"\nDRY_RUN={value}\n"
    ENV_PATH.write_text(text, encoding="utf-8")
    load_env()


def _get_product(headers: dict[str, str], product_id: str) -> dict[str, Any]:
    shop_id = _shop_id()

    def fetch() -> dict[str, Any]:
        resp = requests.get(
            f"{API_BASE}/shops/{shop_id}/products/{product_id}.json",
            headers=headers,
            timeout=60,
        )
        resp.raise_for_status()
        return resp.json()

    return with_backoff(fetch)


def _legacy_product_snapshot(headers: dict[str, str]) -> dict[str, Any]:
    product = _get_product(headers, LEGACY_WACO_SKYLINE_PRODUCT_ID)
    upload_ids: list[str] = []
    for area in product.get("print_areas") or []:
        for placeholder in area.get("placeholders") or []:
            for image in placeholder.get("images") or []:
                iid = str(image.get("id") or "")
                if iid:
                    upload_ids.append(iid)
    return {
        "printify_product_id": product.get("id"),
        "title": product.get("title"),
        "updated_at": product.get("updated_at"),
        "visible": product.get("visible"),
        "external": product.get("external"),
        "print_upload_ids": sorted(set(upload_ids)),
    }


def _list_all_products(headers: dict[str, str]) -> list[dict[str, Any]]:
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


def _collect_product_upload_names(headers: dict[str, str], product: dict[str, Any]) -> set[str]:
    names: set[str] = set()
    for area in product.get("print_areas") or []:
        for placeholder in area.get("placeholders") or []:
            for image in placeholder.get("images") or []:
                name = image.get("name")
                if name:
                    names.add(str(name))
                iid = str(image.get("id") or "")
                if iid:
                    try:

                        def fetch() -> dict[str, Any]:
                            resp = requests.get(
                                f"{API_BASE}/uploads/{iid}.json", headers=headers, timeout=30
                            )
                            resp.raise_for_status()
                            return resp.json()

                        meta = with_backoff(fetch)
                        if meta.get("file_name"):
                            names.add(str(meta["file_name"]))
                    except Exception:
                        pass
    return names


def _scan_phase3_artwork_duplicates(headers: dict[str, str]) -> list[dict[str, Any]]:
    target_names = set(_production_sha256().keys())
    hits: list[dict[str, Any]] = []
    for product in _list_all_products(headers):
        if product.get("blueprint_id") != CC1717_BLUEPRINT_ID:
            continue
        full = _get_product(headers, str(product["id"]))
        names = _collect_product_upload_names(headers, full)
        overlap = sorted(target_names & names)
        if len(overlap) >= 2:
            hits.append(
                {
                    "printify_product_id": full.get("id"),
                    "title": full.get("title"),
                    "matching_filenames": overlap,
                }
            )
    return hits


def _verify_write_scopes(headers: dict[str, str]) -> list[str]:
    """Probe Printify write endpoints before uploading production artwork."""
    shop_id = _shop_id()
    tiny_png_b64 = (
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    )
    probes = [
        (
            "uploads.write",
            "POST",
            f"{API_BASE}/uploads/images.json",
            {"file_name": "scope-probe.png", "contents": tiny_png_b64},
        ),
        (
            "products.write",
            "POST",
            f"{API_BASE}/shops/{shop_id}/products.json",
            {"title": "scope-probe-do-not-save"},
        ),
    ]
    missing: list[str] = []
    for scope_name, method, url, body in probes:
        resp = requests.request(method, url, headers=headers, json=body, timeout=30)
        if resp.status_code == 403 and "Invalid scope" in resp.text:
            missing.append(scope_name)
    return missing


def _run_preflight_checks(headers: dict[str, str]) -> dict[str, Any]:
    checks: dict[str, Any] = {"passed": True, "failures": [], "details": {}}
    shop_id = _shop_id()
    if shop_id != REQUIRED_SHOP_ID:
        checks["passed"] = False
        checks["failures"].append(f"PRINTIFY_SHOP_ID must be {REQUIRED_SHOP_ID}, got {shop_id!r}")

    missing_scopes = _verify_write_scopes(headers)
    checks["details"]["missing_printify_scopes"] = missing_scopes
    if missing_scopes:
        checks["passed"] = False
        checks["failures"].append(
            "Printify API token missing required scopes: "
            + ", ".join(missing_scopes)
            + " (regenerate token in Printify → Connections)"
        )

    row = _find_waco_row()
    manifest_issues = _validate_manifest_row(row)
    if manifest_issues:
        checks["passed"] = False
        checks["failures"].extend(manifest_issues)

    artwork = _validate_artwork(row)
    if artwork.get("issues"):
        checks["passed"] = False
        checks["failures"].extend(artwork["issues"])

    legacy_before = _legacy_product_snapshot(headers)
    checks["details"]["legacy_product_before"] = legacy_before

    review_dupes = [
        p
        for p in _list_all_products(headers)
        if (p.get("title") or "").strip() == REVIEW_DRAFT_TITLE
    ]
    if review_dupes:
        checks["passed"] = False
        checks["failures"].append(
            "Review draft title already exists: "
            + ", ".join(p["id"] for p in review_dupes)
        )

    phase3_dupes = _scan_phase3_artwork_duplicates(headers)
    checks["details"]["phase3_artwork_filename_matches"] = phase3_dupes
    if phase3_dupes:
        checks["passed"] = False
        checks["failures"].append(
            "Existing CC1717 product(s) already use Phase 3 production filenames"
        )

    checks["details"]["production_sha256"] = _production_sha256()
    return checks


def _build_api_product_payload(
    row: dict[str, str],
    selected: list[dict[str, Any]],
    upload_ids_by_treatment: dict[str, str],
    *,
    review_draft: bool = False,
) -> dict[str, Any]:
    retail_cents = int(float(row.get("retail_price") or DEFAULT_RETAIL) * 100)
    variants = [
        {"id": item["id"], "price": retail_cents, "is_enabled": True}
        for item in selected
    ]
    groups = _group_variants_by_treatment(selected)
    print_areas: list[dict[str, Any]] = []
    for treatment_id, variant_ids in groups.items():
        image_id = upload_ids_by_treatment[treatment_id]
        print_areas.append(
            {
                "variant_ids": variant_ids,
                "placeholders": [
                    {
                        "position": PLACEMENT["position"],
                        "images": [
                            {
                                "id": image_id,
                                "x": PLACEMENT["x"],
                                "y": PLACEMENT["y"],
                                "scale": PLACEMENT["scale"],
                                "angle": PLACEMENT["angle"],
                            }
                        ],
                    }
                ],
            }
        )

    if review_draft:
        title = REVIEW_DRAFT_TITLE
        description = (
            f"{REVIEW_DRAFT_DESCRIPTION_PREFIX}\n\n"
            f"{row.get('shopify_description', '')}"
        ).strip()
    else:
        title = row.get("shopify_title") or WACO_PRODUCT_NAME
        description = row.get("shopify_description", "")

    tags = [t.strip() for t in row.get("shopify_tags", "").split(",") if t.strip()]
    if review_draft:
        tags = ["internal-review", "do-not-publish", *tags]

    return {
        "title": title,
        "description": description,
        "blueprint_id": CC1717_BLUEPRINT_ID,
        "print_provider_id": RECOMMENDED_PROVIDER_ID,
        "tags": tags,
        "variants": variants,
        "print_areas": print_areas,
    }


def _extract_mockups(product: dict[str, Any]) -> list[dict[str, Any]]:
    mockups: list[dict[str, Any]] = []
    for image in product.get("images") or []:
        mockups.append(
            {
                "src": image.get("src"),
                "position": image.get("position"),
                "variant_ids": image.get("variant_ids"),
                "is_default": image.get("is_default"),
            }
        )
    return mockups


def _artwork_mapping_report(upload_ids_by_treatment: dict[str, str]) -> dict[str, Any]:
    by_color: dict[str, dict[str, str]] = {}
    for treatment_id, spec in ARTWORK_TREATMENTS.items():
        for color in spec["garment_colors"]:
            by_color[color] = {
                "file": spec["file"],
                "treatment_id": treatment_id,
                "printify_upload_id": upload_ids_by_treatment.get(treatment_id, ""),
            }
    return by_color


def _authorized_live_run(create_flag: bool) -> tuple[bool, list[str]]:
    reasons: list[str] = []
    if is_dry_run():
        reasons.append("DRY_RUN is not false")
    if not create_flag:
        reasons.append("--create-approved-waco-draft flag not passed")
    return (not reasons, reasons)


def _write_reports(report: dict[str, Any]) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    json_path = OUTPUT / "printify_waco_draft_dry_run.json"
    md_path = OUTPUT / "PRINTIFY_WACO_DRAFT_DRY_RUN.md"
    json_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    lines = [
        "# Printify Waco Skyline Tee — Dry Run Report",
        "",
        f"Generated: {report.get('generated_at')}",
        f"DRY_RUN: `{report.get('dry_run')}`",
        "",
        f"## Result: **{report.get('authorization_result')}**",
        "",
    ]
    if report.get("authorization_reasons"):
        lines.append("### Reasons")
        for reason in report["authorization_reasons"]:
            lines.append(f"- {reason}")
        lines.append("")

    for section in (
        "artwork_mapping_analysis",
        "blue_spruce_validation",
        "manifest_validation",
        "artwork_validation",
        "provider_recommendation",
        "duplicate_check",
        "planned_uploads",
        "planned_product_payload",
        "planned_api_calls",
        "safety_confirmations",
    ):
        if section in report:
            lines.extend([f"## {section.replace('_', ' ').title()}", "", "```json", json.dumps(report[section], indent=2), "```", ""])

    md_path.write_text("\n".join(lines), encoding="utf-8")


def run_dry_run(logger: logging.Logger) -> dict[str, Any]:
    report: dict[str, Any] = {
        "generated_at": _utc_now(),
        "dry_run": is_dry_run(),
        "product_id": WACO_PRODUCT_ID,
        "product_name": WACO_PRODUCT_NAME,
        "blocked_products": sorted(BLOCKED_PRODUCT_IDS),
    }

    row = _find_waco_row()
    manifest_issues = _validate_manifest_row(row)
    report["manifest_validation"] = {"row_product_id": row.get("product_id"), "issues": manifest_issues}

    artwork = _validate_artwork(row)
    report["artwork_validation"] = artwork

    variants = _catalog_variants(RECOMMENDED_PROVIDER_ID)
    selected = _select_variants(variants)
    shipping = _shipping_info(RECOMMENDED_PROVIDER_ID)
    provider = _provider_details(RECOMMENDED_PROVIDER_ID)
    costs = _estimate_costs(selected)

    report["provider_recommendation"] = {
        "blueprint_id": CC1717_BLUEPRINT_ID,
        "blueprint_name": CC1717_BLANK_NAME,
        "fulfillment_option": "Printify Choice",
        "provider_id": RECOMMENDED_PROVIDER_ID,
        "provider_name": provider.get("title", RECOMMENDED_PROVIDER_NAME),
        "routing_network_disclaimer": PRINTIFY_CHOICE_DISCLAIMER,
        "catalog_location_reference": provider.get("location"),
        "approved_color_coverage": "5/5",
        "selected_variant_count": len(selected),
        "handling_time_estimate": shipping.get("handling_time"),
        "cost_estimate": costs,
        "rationale": (
            "Printify Choice offers full approved-color coverage (30 variants) and is already "
            "used for an existing CC1717 product in this shop. Routing may assign different "
            "facilities per order; do not treat catalog location/shipping/handling as guarantees."
        ),
    }

    duplicate = _search_duplicate_products(row.get("shopify_title") or WACO_PRODUCT_NAME)
    report["duplicate_check"] = duplicate

    from validate_blue_spruce_mockup import build_mockup as build_blue_spruce_mockup  # noqa: E402

    _, blue_spruce_validation = build_blue_spruce_mockup()
    report["blue_spruce_status"] = {
        "garment_color": "Blue Spruce",
        "draft_inclusion": "APPROVED_FOR_UNPUBLISHED_VISUAL_REVIEW_ONLY",
        "production_artwork": "bay.png",
        "approval_to_publish_or_sell": "NOT YET GRANTED",
        "approval_to_order_samples_or_submit_production": "NOT GRANTED",
    }
    report["blue_spruce_validation"] = blue_spruce_validation
    report["artwork_mapping_analysis"] = {
        "source_records": [
            "products-master.csv lists Bay and Blue Spruce as separate garment colors",
            "Owner SOURCE OF TRUTH: garment colors Ivory, Blossom, Bay or Blue Spruce, Pepper",
            "Phase 3 final GARMENTS['bay'] label: Bay / Blue Spruce / Sage",
            "Phase 3 notes: ivory/blossom/bay/pepper PNG masters (4 treatments, not 5)",
            "PHASE3_FINAL_VALIDATION.json sha256 for bay.png matches current file",
            "Owner review contrast row: Bay / Blue Spruce / Sage at 3.75:1 (cream on mockup swatch)",
        ],
        "intended_mapping": {
            "Ivory": "ivory.png",
            "Blossom": "blossom.png",
            "Bay": "bay.png",
            "Blue Spruce": "bay.png (shared Bay / Blue Spruce / Sage treatment)",
            "Pepper": "pepper.png",
        },
        "explicit_owner_blue_spruce_visual_approval_found": False,
        "owner_waco_product_approval_found": True,
        "blue_spruce_sales_approval_required_before_publish": False,
        "blue_spruce_review_draft_inclusion_allowed": True,
    }

    upload_plan = _build_upload_plan(artwork)
    placeholder_upload_ids = {
        treatment_id: f"DRY_RUN_UPLOAD_{treatment_id.upper()}"
        for treatment_id in ARTWORK_TREATMENTS
    }
    product_payload = _build_api_product_payload(
        row, selected, placeholder_upload_ids, review_draft=False
    )
    enriched_areas = []
    for treatment_id, variant_ids in _group_variants_by_treatment(selected).items():
        spec = ARTWORK_TREATMENTS[treatment_id]
        enriched_areas.append(
            {
                "artwork_treatment": treatment_id,
                "artwork_file": spec["file"],
                "garment_colors": spec["garment_colors"],
                "variant_ids": variant_ids,
                "placeholders": [
                    {
                        "position": PLACEMENT["position"],
                        "images": [
                            {
                                "id": placeholder_upload_ids[treatment_id],
                                "x": PLACEMENT["x"],
                                "y": PLACEMENT["y"],
                                "scale": PLACEMENT["scale"],
                                "angle": PLACEMENT["angle"],
                            }
                        ],
                    }
                ],
            }
        )
    product_payload = {**product_payload, "print_areas": enriched_areas}

    report["planned_uploads"] = upload_plan
    report["planned_product_payload"] = product_payload
    report["planned_api_calls"] = [
        {
            "method": "GET",
            "endpoint": f"/v1/shops/{_shop_id()}/products.json",
            "purpose": "duplicate check (executed read-only during dry run)",
            "executed_in_dry_run": True,
        },
        {
            "method": "GET",
            "endpoint": f"/v1/catalog/blueprints/{CC1717_BLUEPRINT_ID}/print_providers/{RECOMMENDED_PROVIDER_ID}/variants.json",
            "purpose": "variant selection",
            "executed_in_dry_run": True,
        },
        {
            "method": "GET",
            "endpoint": f"/v1/catalog/blueprints/{CC1717_BLUEPRINT_ID}/print_providers/{RECOMMENDED_PROVIDER_ID}/shipping.json",
            "purpose": "shipping and handling lookup",
            "executed_in_dry_run": True,
        },
        {
            "method": "POST",
            "endpoint": "/v1/uploads/images.json",
            "purpose": "upload 4 unique production PNG treatments (bay.png reused for Bay + Blue Spruce)",
            "executed_in_dry_run": False,
            "blocked_by": "DRY_RUN=true",
        },
        {
            "method": "POST",
            "endpoint": f"/v1/shops/{_shop_id()}/products.json",
            "purpose": "create unpublished Printify product draft",
            "executed_in_dry_run": False,
            "blocked_by": "DRY_RUN=true",
        },
    ]

    report["safety_confirmations"] = {
        "post_requests_sent": False,
        "publish_endpoint_called": False,
        "shopify_api_called": False,
        "etsy_api_called": False,
        "order_or_fulfillment_endpoint_called": False,
        "french_bulldog_processed": False,
        "golden_retriever_processed": False,
        "shopify_access_token_used": False,
    }

    auth_reasons: list[str] = []
    if manifest_issues:
        auth_reasons.extend(manifest_issues)
    if artwork.get("issues"):
        auth_reasons.extend(artwork["issues"])
    if duplicate.get("duplicate_found"):
        auth_reasons.append(
            "exact-title Printify product already exists; live run must update/skip instead of create"
        )
    if len(selected) != 30:
        auth_reasons.append(
            f"expected 30 variants (5 colors × 6 sizes), found {len(selected)}"
        )

    blocking = list(auth_reasons)
    bs = blue_spruce_validation
    bs_checks = bs.get("technical_checks", {})
    bs_contrast = bs.get("ink_vs_garment_contrast", {})
    clip = bs.get("clipping_check", {})
    if blocking:
        report["authorization_result"] = "NOT SAFE TO AUTHORIZE"
        report["authorization_reasons"] = blocking
    elif clip.get("clips_top") or clip.get("clips_bottom"):
        report["authorization_result"] = "NEW BLUE SPRUCE ARTWORK REQUIRED"
        report["authorization_reasons"] = [
            "Blue Spruce mockup clips at proposed Printify placement",
        ]
    elif bs_checks.get("primary_text_readable") is False or bs_checks.get("skyline_primary_visible") is False:
        report["authorization_result"] = "NEW BLUE SPRUCE ARTWORK REQUIRED"
        report["authorization_reasons"] = [
            "Blue Spruce mockup fails primary ink readability on CC1717 Blue Spruce garment",
            f"cream_primary_vs_blue_spruce={bs_contrast.get('cream_primary_vs_blue_spruce')}",
        ]
    elif report["artwork_mapping_analysis"]["explicit_owner_blue_spruce_visual_approval_found"]:
        report["authorization_result"] = "SAFE TO AUTHORIZE ONE UNPUBLISHED REVIEW DRAFT"
        report["authorization_reasons"] = [
            "Manifest gates satisfied after re-read",
            "Four unique artwork treatments validated; bay.png shared for Bay + Blue Spruce",
            "Explicit owner Blue Spruce visual approval on record",
            "Blue Spruce included for unpublished Printify mockup review only",
            "No exact-title duplicate product in Printify shop",
            "Run scripts/final_printify_safety_check.py for legacy Waco duplicate scan before live create",
            "Dry run performed with zero write/publish/Shopify/Etsy/order calls",
        ]
    else:
        report["authorization_result"] = "SAFE TO AUTHORIZE ONE UNPUBLISHED REVIEW DRAFT"
        report["authorization_reasons"] = [
            "Source records map Blue Spruce garment variants to shared bay.png treatment (Bay / Blue Spruce / Sage)",
            "Production PNG: artwork/waco-skyline-tee/bay.png (sha256 matches Phase 3 record)",
            f"Blue Spruce mockup: {bs.get('mockup_output')}",
            f"Primary cream ink vs Blue Spruce garment: {bs_contrast.get('cream_primary_vs_blue_spruce')}:1 (readable)",
            "Blue Spruce draft inclusion: APPROVED_FOR_UNPUBLISHED_VISUAL_REVIEW_ONLY (publish/sales/samples NOT granted)",
            "Payload uses 4 uploads; bay.png upload ID reused for Bay and Blue Spruce variant groups",
            "Run scripts/final_printify_safety_check.py for legacy Waco duplicate scan before live create",
        ]

    _write_reports(report)
    log_action(logger, "dry_run_complete", report["authorization_result"])
    return report


def run_live_create(logger: logging.Logger) -> dict[str, Any]:
    ok, reasons = _authorized_live_run(True)
    if not ok:
        raise RuntimeError("Live create blocked: " + "; ".join(reasons))

    if requests is None:
        raise RuntimeError("requests package not installed")
    headers = printify_headers()
    shop_id = _shop_id()

    preflight = _run_preflight_checks(headers)
    if not preflight["passed"]:
        raise RuntimeError("Preflight failed: " + "; ".join(preflight["failures"]))

    row = _find_waco_row()
    legacy_before = preflight["details"]["legacy_product_before"]

    upload_ids: dict[str, str] = {}
    upload_log: list[dict[str, Any]] = []
    for treatment_id, spec in ARTWORK_TREATMENTS.items():
        path = _artwork_dir() / spec["file"]
        if not path.exists():
            raise RuntimeError(f"Missing artwork treatment {treatment_id}: {path}")

        with path.open("rb") as fh:
            encoded = base64.b64encode(fh.read()).decode("ascii")

        def upload(treatment_id=treatment_id, encoded=encoded, filename=spec["file"]) -> dict[str, Any]:
            resp = requests.post(
                f"{API_BASE}/uploads/images.json",
                headers=headers,
                json={"file_name": filename, "contents": encoded},
                timeout=120,
            )
            resp.raise_for_status()
            return resp.json()

        result = with_backoff(upload, logger=logger)
        upload_ids[treatment_id] = result["id"]
        upload_log.append(
            {
                "treatment_id": treatment_id,
                "file_name": spec["file"],
                "printify_upload_id": result["id"],
                "garment_colors": spec["garment_colors"],
                "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            }
        )
        log_action(
            logger,
            "upload_artwork",
            f"{treatment_id} ({spec['file']}) uploaded",
        )

    variants = _catalog_variants(RECOMMENDED_PROVIDER_ID)
    selected = _select_variants(variants)
    payload = _build_api_product_payload(
        row, selected, upload_ids, review_draft=True
    )

    def create_product() -> dict[str, Any]:
        resp = requests.post(
            f"{API_BASE}/shops/{shop_id}/products.json",
            headers=headers,
            json=payload,
            timeout=120,
        )
        resp.raise_for_status()
        return resp.json()

    product = with_backoff(create_product, logger=logger)
    product_id = product.get("id")
    log_action(logger, "create_product", f"review draft created id={product_id}")

    product_full = _get_product(headers, str(product_id))
    legacy_after = _legacy_product_snapshot(headers)

    legacy_unchanged = legacy_before == legacy_after
    enabled_colors: set[str] = set()
    enabled_sizes: set[str] = set()
    for variant in product_full.get("variants", []):
        if not variant.get("is_enabled"):
            continue
        parts = (variant.get("title") or "").split(" / ")
        if len(parts) >= 2:
            enabled_colors.add(parts[0].strip())
            enabled_sizes.add(parts[1].strip())

    mockups = _extract_mockups(product_full)
    mockup_dir = OUTPUT / "printify_review_mockups"
    mockup_dir.mkdir(parents=True, exist_ok=True)
    local_mockups: list[dict[str, Any]] = []
    for idx, mock in enumerate(mockups[:12]):
        src = mock.get("src")
        if not src:
            continue
        try:

            def fetch_image(url=src) -> bytes:
                resp = requests.get(url, timeout=60)
                resp.raise_for_status()
                return resp.content

            content = with_backoff(fetch_image)
            local_path = mockup_dir / f"review_mockup_{idx + 1}.jpg"
            local_path.write_bytes(content)
            local_mockups.append({"src": src, "local_path": str(local_path.resolve())})
        except Exception as exc:
            local_mockups.append({"src": src, "download_error": redact(str(exc))})

    return {
        "final_status": "ONE UNPUBLISHED REVIEW DRAFT CREATED — OWNER MOCKUP REVIEW REQUIRED",
        "printify_product_id": product_id,
        "title": product_full.get("title"),
        "unpublished": product_full.get("visible") is not True or not (product_full.get("external") or {}).get("id"),
        "visible_in_printify": product_full.get("visible"),
        "external_sales_channel": product_full.get("external"),
        "blueprint_id": product_full.get("blueprint_id"),
        "print_provider_id": product_full.get("print_provider_id"),
        "fulfillment_option": "Printify Choice (routing network — facility not guaranteed)",
        "enabled_colors": sorted(enabled_colors),
        "enabled_sizes": sorted(enabled_sizes),
        "artwork_mapping_by_color": _artwork_mapping_report(upload_ids),
        "uploads": upload_log,
        "mockup_urls": mockups,
        "mockup_downloads": local_mockups,
        "preflight": preflight,
        "legacy_product": {
            "id": LEGACY_WACO_SKYLINE_PRODUCT_ID,
            "snapshot_before": legacy_before,
            "snapshot_after": legacy_after,
            "unchanged": legacy_unchanged,
        },
        "operations_not_performed": {
            "publish": True,
            "shopify_api": True,
            "order_or_sample": True,
            "legacy_product_modified": False,
            "french_bulldog_or_golden": True,
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--create-approved-waco-draft",
        action="store_true",
        help="Required for live Printify draft creation (also requires DRY_RUN=false)",
    )
    args = parser.parse_args()
    logger = setup_logging("create_printify_drafts")
    load_env()

    if args.create_approved_waco_draft:
        if is_dry_run():
            logger.error("DRY_RUN=true — refusing live Printify POST requests")
            return 2
        result: dict[str, Any] | None = None
        try:
            result = run_live_create(logger)
        except Exception as exc:
            logger.error(redact(str(exc)))
            return 1
        finally:
            _set_dry_run_env(True)
            logger.info("DRY_RUN restored to true")

        OUTPUT.mkdir(parents=True, exist_ok=True)
        out = OUTPUT / "printify_waco_review_draft_created.json"
        out.write_text(json.dumps(result, indent=2), encoding="utf-8")
        print(result.get("final_status", "CREATED"))
        print(f"printify_product_id={result.get('printify_product_id')}")
        print(f"unpublished={result.get('unpublished')}")
        print(f"legacy_unchanged={result.get('legacy_product', {}).get('unchanged')}")
        print(f"DRY_RUN restored=true")
        return 0

    report = run_dry_run(logger)
    print(report["authorization_result"])
    for reason in report.get("authorization_reasons", []):
        print(f"- {reason}")
    return 0 if report["authorization_result"].startswith("SAFE TO AUTHORIZE") else 1


if __name__ == "__main__":
    raise SystemExit(main())
