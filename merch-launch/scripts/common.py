"""Shared utilities for merch-launch scripts."""

from __future__ import annotations

import csv
import json
import logging
import os
import re
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable, Iterable, Sequence

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None  # type: ignore

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source"
DATA = ROOT / "data"
OUTPUT = ROOT / "output"
LOGS = ROOT / "logs"
MANIFEST_PATH = DATA / "products-master.csv"

TARGET_WIDTH = 4500
TARGET_HEIGHT = 5400
DIMENSION_TOLERANCE = 0.05
MARGIN_TARGET = 0.55
RETAIL_LOW = 32.0
RETAIL_HIGH = 36.0
DEFAULT_RETAIL = 34.0

CC1717_BLUEPRINT_ID = 706
CC1717_BLANK_NAME = "Comfort Colors 1717 Unisex Garment-Dyed T-Shirt"

KWW_COLORS = {
    "Wag Sage": "#6E7E63",
    "Kitchen Cream": "#F4EDE4",
    "Good-Towel Rose": "#C68C86",
    "Bark Brown": "#4C463E",
    "Brazos Blue": "#A9C2CF",
    "Trail Taupe": "#B3A48E",
    "Blush": "#E5C9C4",
}

PRINTIFY_COLOR_TO_KWW = {
    "Ivory": "Kitchen Cream",
    "Bay": "Wag Sage",
    "Blue Spruce": "Wag Sage",
    "Blue Jean": "Brazos Blue",
    "Chambray": "Brazos Blue",
    "Blossom": "Good-Towel Rose",
    "Pepper": "Bark Brown",
}

SECRET_KEYS = (
    "PRINTIFY_API_TOKEN",
    "SHOPIFY_ACCESS_TOKEN",
    "ETSY_API_KEY",
    "ETSY_SHARED_SECRET",
    "ETSY_REFRESH_TOKEN",
    "SUPABASE_SERVICE_ROLE_KEY",
    "OPENAI_API_KEY",
    "RESEND_API_KEY",
)

MANIFEST_COLUMNS: list[str] = [
    "product_id",
    "launch_wave",
    "priority",
    "channel",
    "design_family",
    "city",
    "breed",
    "product_name",
    "shopify_title",
    "etsy_title",
    "handle",
    "artwork_light",
    "artwork_dark",
    "blank_name",
    "printify_blueprint_id",
    "print_provider",
    "print_provider_id",
    "print_area",
    "sizes",
    "printify_color_names",
    "kww_color_mapping",
    "base_cost_low",
    "base_cost_high",
    "retail_price",
    "gross_profit_low",
    "gross_margin_low",
    "shopify_description",
    "etsy_description",
    "etsy_tags",
    "materials",
    "shopify_collection",
    "shopify_tags",
    "seo_title",
    "seo_description",
    "image_alt_text",
    "personalization_ready",
    "personalization_status",
    "artwork_status",
    "mockup_status",
    "qa_status",
    "printify_product_id",
    "shopify_product_id",
    "etsy_listing_id",
    "publish_status",
    "errors",
    "notes",
]

LAUNCH_DESIGNS: list[dict[str, Any]] = [
    {
        "product_id": "city-waco-skyline",
        "design_family": "City Skyline",
        "city": "Waco",
        "breed": "",
        "product_name": "Keep Waco Wagging — Waco Skyline Tee",
        "shopify_title": "Keep Waco Wagging — Waco Skyline Tee",
        "etsy_title": "Keep Waco Wagging Tee, Waco Skyline Dog Shirt, Comfort Colors Waco Texas T-Shirt, Alico Building Suspension Bridge, Dog Mom Gift",
        "handle": "keep-waco-wagging-waco-skyline-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom|Pepper",
        "shopify_collection": "Texas City Dog Tees",
        "priority": "P0",
        "launch_wave": "wave-1-test",
    },
    {
        "product_id": "city-austin-pup-culture",
        "design_family": "City Skyline",
        "city": "Austin",
        "breed": "",
        "product_name": "Keep Waco Wagging — Austin Pup Culture Tee",
        "shopify_title": "Keep Waco Wagging — Austin Pup Culture Tee",
        "etsy_title": "Austin Pup Culture Tee, Austin Skyline Dog Shirt, Comfort Colors Austin Texas T-Shirt, Capitol Frost Tower, Dog Mom Gift ATX",
        "handle": "keep-waco-wagging-austin-pup-culture-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Texas City Dog Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "city-dallas-dog-scene",
        "design_family": "City Skyline",
        "city": "Dallas",
        "breed": "",
        "product_name": "Keep Waco Wagging — Dallas Dog Scene Tee",
        "shopify_title": "Keep Waco Wagging — Dallas Dog Scene Tee",
        "etsy_title": "Dallas Dog Scene Tee, Dallas Skyline Dog Shirt, Comfort Colors Dallas Texas T-Shirt, Reunion Tower Pegasus, Dog Mom Gift DFW",
        "handle": "keep-waco-wagging-dallas-dog-scene-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Texas City Dog Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "city-san-antonio-sniffari",
        "design_family": "City Skyline",
        "city": "San Antonio",
        "breed": "",
        "product_name": "Keep Waco Wagging — San Antonio Sniffari Tee",
        "shopify_title": "Keep Waco Wagging — San Antonio Sniffari Tee",
        "etsy_title": "San Antonio Sniffari Tee, SA Skyline Dog Shirt, Comfort Colors San Antonio Texas T-Shirt, Alamo Tower of Americas, Dog Mom Gift",
        "handle": "keep-waco-wagging-san-antonio-sniffari-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Texas City Dog Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "city-houston-howling",
        "design_family": "City Skyline",
        "city": "Houston",
        "breed": "",
        "product_name": "Keep Waco Wagging — Houston Howling Tee",
        "shopify_title": "Keep Waco Wagging — Houston Howling Tee",
        "etsy_title": "Houston Howling Tee, Houston Skyline Dog Shirt, Comfort Colors Houston Texas T-Shirt, Space City Chase Tower, Dog Mom Gift HTX",
        "handle": "keep-waco-wagging-houston-howling-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Texas City Dog Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "breed-french-bulldog",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "French Bulldog",
        "product_name": "Keep Waco Wagging — French Bulldog Tee",
        "shopify_title": "Keep Waco Wagging — French Bulldog Tee",
        "etsy_title": "French Bulldog Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Frenchie Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-french-bulldog-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P0",
        "launch_wave": "wave-1-test",
    },
    {
        "product_id": "breed-dachshund",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "Dachshund",
        "product_name": "Keep Waco Wagging — Dachshund Tee",
        "shopify_title": "Keep Waco Wagging — Dachshund Tee",
        "etsy_title": "Dachshund Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Doxie Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-dachshund-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "breed-golden-retriever",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "Golden Retriever",
        "product_name": "Keep Waco Wagging — Golden Retriever Tee",
        "shopify_title": "Keep Waco Wagging — Golden Retriever Tee",
        "etsy_title": "Golden Retriever Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Golden Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-golden-retriever-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P0",
        "launch_wave": "wave-1-test",
    },
    {
        "product_id": "breed-labrador-retriever",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "Labrador Retriever",
        "product_name": "Keep Waco Wagging — Labrador Retriever Tee",
        "shopify_title": "Keep Waco Wagging — Labrador Retriever Tee",
        "etsy_title": "Labrador Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Lab Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-labrador-retriever-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "breed-german-shepherd",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "German Shepherd",
        "product_name": "Keep Waco Wagging — German Shepherd Tee",
        "shopify_title": "Keep Waco Wagging — German Shepherd Tee",
        "etsy_title": "German Shepherd Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline GSD Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-german-shepherd-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "breed-corgi",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "Corgi",
        "product_name": "Keep Waco Wagging — Corgi Tee",
        "shopify_title": "Keep Waco Wagging — Corgi Tee",
        "etsy_title": "Corgi Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Corgi Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-corgi-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "breed-chihuahua",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "Chihuahua",
        "product_name": "Keep Waco Wagging — Chihuahua Tee",
        "shopify_title": "Keep Waco Wagging — Chihuahua Tee",
        "etsy_title": "Chihuahua Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Chi Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-chihuahua-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "breed-australian-shepherd",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "Australian Shepherd",
        "product_name": "Keep Waco Wagging — Australian Shepherd Tee",
        "shopify_title": "Keep Waco Wagging — Australian Shepherd Tee",
        "etsy_title": "Aussie Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Aussie Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-australian-shepherd-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
    {
        "product_id": "breed-siberian-husky",
        "design_family": "Breed Skyline",
        "city": "Waco",
        "breed": "Siberian Husky",
        "product_name": "Keep Waco Wagging — Siberian Husky Tee",
        "shopify_title": "Keep Waco Wagging — Siberian Husky Tee",
        "etsy_title": "Husky Waco Tee, Keep Waco Wagging Dog Shirt, Comfort Colors Breed Tee, Waco Skyline Husky Gift, Texas Dog Mom",
        "handle": "keep-waco-wagging-siberian-husky-tee",
        "printify_colors": "Ivory|Bay|Blue Jean|Blossom",
        "shopify_collection": "Breed Edition Tees",
        "priority": "P1",
        "launch_wave": "wave-1",
    },
]

# Known artwork candidates outside repo (documented during audit — not production-approved)
ARTWORK_CANDIDATES: dict[str, dict[str, list[str]]] = {
    "city-waco-skyline": {
        "light": [],
        "dark": [],
        "candidates": [
            "~/Downloads/waco skyline.png",
            "~/Downloads/waco skyline.jpg",
        ],
    },
    "city-austin-pup-culture": {
        "light": [],
        "dark": [],
        "candidates": ["~/Downloads/austin_skyline_lineart.png"],
    },
    "city-houston-howling": {
        "light": [],
        "dark": [],
        "candidates": ["~/Downloads/houston_skyline_lineart.png"],
    },
    "breed-french-bulldog": {
        "light": [],
        "dark": [],
        "candidates": [
            "~/Downloads/KWW Frenchie.png",
            "~/Downloads/kwwfrenchie.png",
        ],
    },
    "breed-golden-retriever": {
        "light": [],
        "dark": [],
        "candidates": [
            "~/Downloads/kwwgolden.png",
            "~/Downloads/golden waco.png",
            "~/Downloads/golden_05_transparent_whiteink.png",
            "~/Downloads/golden_05_transparent_whiteink (2).png",
            "source-designs/merch/dog-moms/waco-golden-retriever-crewneck-300dpi.png",
        ],
    },
}

SHOPIFY_CONFLICT_HANDLES = [
    "waco-skyline-t-shirt-waco-dog-dad-graphic-tee",
    "keep-waco-wagging-t-shirt-waco-landmark-dog-tee",
    "keep-waco-wagging-frenchie-edition-1",
    "keep-waco-wagging-golden-retriever-edition-1",
    "keep-waco-wagging-golden-retriever-hoodie",
    "keep-waco-wagging-frenchie-hoodie",
]


def load_env() -> None:
    if load_dotenv is None:
        return
    load_dotenv(ROOT / ".env")
    load_dotenv(ROOT.parent / ".env.local", override=False)


def is_dry_run() -> bool:
    load_env()
    return os.getenv("DRY_RUN", "true").lower() not in ("0", "false", "no")


def setup_logging(name: str) -> logging.Logger:
    LOGS.mkdir(parents=True, exist_ok=True)
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger
    logger.setLevel(logging.INFO)
    fmt = logging.Formatter("%(asctime)s %(levelname)s %(message)s")
    fh = logging.FileHandler(LOGS / f"{name}.log")
    fh.setFormatter(fmt)
    sh = logging.StreamHandler(sys.stdout)
    sh.setFormatter(fmt)
    logger.addHandler(fh)
    logger.addHandler(sh)
    return logger


def redact(text: str) -> str:
    out = text
    for key in SECRET_KEYS:
        val = os.getenv(key)
        if val and len(val) > 4:
            out = out.replace(val, f"{key[:4]}…REDACTED")
    return re.sub(r"(Bearer\s+)[A-Za-z0-9._-]+", r"\1REDACTED", out)


def log_action(logger: logging.Logger, action: str, detail: str = "") -> None:
    msg = f"{action} | {detail}" if detail else action
    logger.info(redact(msg))


def expand_path(path: str) -> Path:
    return Path(os.path.expanduser(path)).resolve()


def artwork_search_paths() -> list[Path]:
    paths = [
        ROOT / "artwork",
        ROOT.parent / "source-designs" / "merch",
        ROOT.parent / "public" / "brand",
    ]
    extra = os.getenv("ARTWORK_SEARCH_PATHS", "")
    for part in extra.split(":"):
        part = part.strip()
        if part:
            paths.append(expand_path(part))
    home_dl = Path.home() / "Downloads"
    if home_dl.exists():
        paths.append(home_dl)
    return paths


def with_backoff(
    fn: Callable[[], Any],
    *,
    max_failures: int = 3,
    base_delay: float = 1.0,
    logger: logging.Logger | None = None,
) -> Any:
    failures = 0
    while True:
        try:
            return fn()
        except Exception as exc:
            failures += 1
            if logger:
                logger.warning("API attempt failed (%s/%s): %s", failures, max_failures, redact(str(exc)))
            if failures >= max_failures:
                raise
            time.sleep(base_delay * (2 ** (failures - 1)))


def read_manifest() -> list[dict[str, str]]:
    if not MANIFEST_PATH.exists():
        return []
    with MANIFEST_PATH.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write_manifest(rows: Iterable[dict[str, str]]) -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    rows = list(rows)
    with MANIFEST_PATH.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=MANIFEST_COLUMNS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def kww_mapping_for_colors(color_names: str) -> str:
    parts = []
    for c in color_names.split("|"):
        c = c.strip()
        if not c:
            continue
        mapped = PRINTIFY_COLOR_TO_KWW.get(c, "Review")
        parts.append(f"{c}={mapped}")
    return "|".join(parts)


def dimensions_ok(width: int, height: int) -> bool:
    tw, th = TARGET_WIDTH, TARGET_HEIGHT
    return (
        abs(width - tw) / tw <= DIMENSION_TOLERANCE
        and abs(height - th) / th <= DIMENSION_TOLERANCE
    ) or (width == tw and height == tw)


@dataclass
class ArtworkCheck:
    path: str
    exists: bool
    width: int = 0
    height: int = 0
    mode: str = ""
    has_alpha: bool = False
    valid_dimensions: bool = False
    issues: list[str] = field(default_factory=list)


def inspect_image(path: Path) -> ArtworkCheck:
    check = ArtworkCheck(path=str(path), exists=path.exists())
    if not check.exists:
        check.issues.append("missing file")
        return check
    try:
        from PIL import Image
    except ImportError:
        check.issues.append("Pillow not installed")
        return check
    try:
        with Image.open(path) as im:
            check.width, check.height = im.size
            check.mode = im.mode
            check.has_alpha = im.mode in ("RGBA", "LA") or (
                im.mode == "P" and "transparency" in im.info
            )
            if not check.has_alpha:
                check.issues.append("no transparency (likely white background)")
            check.valid_dimensions = dimensions_ok(check.width, check.height)
            if not check.valid_dimensions:
                check.issues.append(
                    f"dimensions {check.width}x{check.height} (target ~{TARGET_WIDTH}x{TARGET_HEIGHT})"
                )
    except Exception as exc:
        check.issues.append(f"unreadable: {exc}")
    return check


def find_files_matching(keywords: Sequence[str], roots: Sequence[Path] | None = None) -> list[Path]:
    roots = list(roots or artwork_search_paths())
    hits: list[Path] = []
    for root in roots:
        if not root.exists():
            continue
        for ext in ("*.png", "*.jpg", "*.jpeg", "*.webp"):
            for p in root.rglob(ext):
                name = p.name.lower()
                if all(k.lower() in name for k in keywords):
                    hits.append(p)
    return sorted(set(hits))


def printify_headers() -> dict[str, str]:
    load_env()
    token = os.getenv("PRINTIFY_API_TOKEN", "")
    if not token:
        return {}
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


def shopify_headers() -> dict[str, str]:
    load_env()
    token = os.getenv("SHOPIFY_ACCESS_TOKEN", "")
    if not token:
        return {}
    return {"X-Shopify-Access-Token": token, "Content-Type": "application/json"}


def required_credentials_present() -> dict[str, bool]:
    load_env()
    return {
        "PRINTIFY_API_TOKEN": bool(os.getenv("PRINTIFY_API_TOKEN")),
        "PRINTIFY_SHOP_ID": bool(os.getenv("PRINTIFY_SHOP_ID")),
        "SHOPIFY_STORE_DOMAIN": bool(os.getenv("SHOPIFY_STORE_DOMAIN")),
        "SHOPIFY_ACCESS_TOKEN": bool(os.getenv("SHOPIFY_ACCESS_TOKEN")),
        "ETSY_SHOP_ID": bool(os.getenv("ETSY_SHOP_ID")),
        "ETSY_API_KEY": bool(os.getenv("ETSY_API_KEY")),
    }
