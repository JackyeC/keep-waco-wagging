#!/usr/bin/env python3
"""Validate production master PNGs against print spec.

Checks: exact dimensions, RGBA mode, transparency, alpha presence, bounding-box
margins, file size, color profile, edge clipping, blank-canvas, duplicate detection.
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import OUTPUT, ROOT, setup_logging  # noqa: E402

from PIL import Image
import numpy as np

ARTWORK = ROOT / "artwork"
TARGET_W, TARGET_H = 4500, 5400
MIN_MARGIN = 150

DESIGNS = {
    "waco-skyline-tee": ["light.png", "dark.png"],
    "french-bulldog-tee": ["light.png"],
    "golden-retriever-tee": ["light.png"],
}


def validate_png(path: Path) -> dict:
    result = {"path": str(path.relative_to(ROOT)), "exists": path.exists(), "checks": {}, "status": "FAIL"}
    if not path.exists():
        # Is it intentionally blocked?
        for marker in (path.parent / f"{path.name}.REQUIRES_RECONSTRUCTION",
                       path.parent / f"{path.name}.NOT_NEEDED"):
            if marker.exists():
                result["status"] = marker.suffix.lstrip(".")
                result["note"] = marker.read_text().strip()
                return result
        result["note"] = "missing file, no marker"
        return result

    im = Image.open(path)
    arr = np.array(im.convert("RGBA"))
    a = arr[..., 3]
    c = result["checks"]
    c["dimensions"] = f"{im.width}x{im.height}"
    c["dimensions_ok"] = (im.width, im.height) == (TARGET_W, TARGET_H)
    c["mode"] = im.mode
    c["rgba"] = im.mode == "RGBA"
    c["has_alpha"] = bool(a.min() < 255)
    c["transparent_bg"] = bool(a[0, 0] == 0 and a[-1, -1] == 0)
    c["file_size_bytes"] = path.stat().st_size
    c["dpi"] = im.info.get("dpi", None) and [round(x) for x in im.info["dpi"]]
    icc = im.info.get("icc_profile")
    c["color_profile"] = "embedded ICC" if icc else "sRGB (no ICC tag)"

    ys, xs = np.where(a > 10)
    if len(xs):
        left, top = int(xs.min()), int(ys.min())
        right, bottom = im.width - int(xs.max()) - 1, im.height - int(ys.max()) - 1
        c["margins_LTRB"] = [left, top, right, bottom]
        c["margins_ok"] = min(left, top, right, bottom) >= MIN_MARGIN
        c["edge_clipping"] = min(left, top, right, bottom) <= 0
        c["blank_canvas"] = False
        c["ink_coverage"] = float((a > 10).mean())
    else:
        c["margins_LTRB"] = None
        c["margins_ok"] = False
        c["edge_clipping"] = False
        c["blank_canvas"] = True
        c["ink_coverage"] = 0.0

    c["sha256_8"] = hashlib.sha256(path.read_bytes()).hexdigest()[:8]

    passed = (
        c["dimensions_ok"] and c["rgba"] and c["has_alpha"]
        and c["transparent_bg"] and c["margins_ok"]
        and not c["edge_clipping"] and not c["blank_canvas"]
    )
    result["status"] = "PASS" if passed else "FAIL"
    return result


def main() -> int:
    logger = setup_logging("validate_production_masters")
    results = []
    hashes: dict[str, list[str]] = {}
    for slug, files in DESIGNS.items():
        for fn in files:
            r = validate_png(ARTWORK / slug / fn)
            results.append(r)
            h = r.get("checks", {}).get("sha256_8")
            if h:
                hashes.setdefault(h, []).append(r["path"])
            logger.info("%s/%s => %s", slug, fn, r["status"])

    duplicates = {h: paths for h, paths in hashes.items() if len(paths) > 1}
    payload = {
        "target": f"{TARGET_W}x{TARGET_H}",
        "min_margin_px": MIN_MARGIN,
        "results": results,
        "duplicate_files": duplicates,
    }
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "PRODUCTION_MASTER_VALIDATION.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    logger.info("Wrote PRODUCTION_MASTER_VALIDATION.json; duplicates: %s", len(duplicates))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
