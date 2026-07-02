#!/usr/bin/env python3
"""Run validation pipeline and write launch summary artifacts."""

from __future__ import annotations

import argparse
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent


def run_script(name: str) -> int:
    path = SCRIPTS / f"{name}.py"
    proc = subprocess.run([sys.executable, str(path)], cwd=str(ROOT))
    return proc.returncode


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.parse_args()

    steps = [
        "build_manifest",
        "validate_source_files",
        "validate_artwork",
        "validate_manifest",
        "inspect_sales_channels",
        "inspect_printify_connection",
        "calculate_margins",
        "export_shopify_copy",
        "export_etsy_copy",
    ]
    results = {}
    for step in steps:
        results[step] = run_script(step)

    summary = ROOT / "output" / "launch_report.txt"
    summary.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        f"Keep Waco Wagging merch launch report — {datetime.now(timezone.utc).isoformat()}",
        "",
    ]
    for step, code in results.items():
        lines.append(f"{step}: {'OK' if code == 0 else f'exit {code}'}")
    summary.write_text("\n".join(lines), encoding="utf-8")
    return max(results.values()) if results else 0


if __name__ == "__main__":
    raise SystemExit(main())
