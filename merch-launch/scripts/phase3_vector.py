"""Phase 3 vector utilities — skeleton stroke tracing (not potrace)."""

from __future__ import annotations

import math
import subprocess
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from skimage.morphology import skeletonize

NEIGHBORS = [(-1, -1), (0, -1), (1, -1), (-1, 0), (1, 0), (-1, 1), (0, 1), (1, 1)]


@dataclass
class TraceResult:
    paths: list[list[tuple[float, float]]]
    width: int
    height: int
    source_bbox: tuple[int, int, int, int]


def _neighbor_count(skel: np.ndarray, y: int, x: int) -> int:
    h, w = skel.shape
    count = 0
    for dy, dx in NEIGHBORS:
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and skel[ny, nx]:
            count += 1
    return count


def _neighbors(skel: np.ndarray, y: int, x: int) -> list[tuple[int, int]]:
    h, w = skel.shape
    out: list[tuple[int, int]] = []
    for dy, dx in NEIGHBORS:
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and skel[ny, nx]:
            out.append((ny, nx))
    return out


def raster_to_stroke_paths(
    rgba: np.ndarray,
    *,
    alpha_threshold: int = 80,
    min_path_len: int = 4,
    crop_to_content: bool = True,
    exclude_bottom_ratio: float = 0.0,
) -> TraceResult:
    """Convert transparent line-art raster to centerline stroke polylines."""
    alpha = rgba[:, :, 3]
    binary = alpha > alpha_threshold
    if exclude_bottom_ratio > 0:
        cut = int(binary.shape[0] * (1.0 - exclude_bottom_ratio))
        binary[cut:, :] = False

    ys, xs = np.where(binary)
    if len(xs) == 0:
        raise ValueError("no ink pixels in source raster")

    y0, y1 = int(ys.min()), int(ys.max()) + 1
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    crop = binary[y0:y1, x0:x1]
    skel = skeletonize(crop)

    h, w = skel.shape
    visited_edge: set[tuple[int, int, int, int]] = set()
    paths: list[list[tuple[float, float]]] = []

    def edge_key(a: tuple[int, int], b: tuple[int, int]) -> tuple[int, int, int, int]:
        if a < b:
            ay, ax = a
            by, bx = b
        else:
            ay, ax = b
            by, bx = a
        return ay, ax, by, bx

    def trace_from(start: tuple[int, int]) -> list[tuple[float, float]]:
        path: list[tuple[float, float]] = [(start[1] + x0 + 0.5, start[0] + y0 + 0.5)]
        prev = None
        cur = start
        while True:
            nbrs = [n for n in _neighbors(skel, cur[0], cur[1]) if n != prev]
            if not nbrs:
                break
            nxt = nbrs[0]
            key = edge_key(cur, nxt)
            if key in visited_edge:
                break
            visited_edge.add(key)
            path.append((nxt[1] + x0 + 0.5, nxt[0] + y0 + 0.5))
            prev, cur = cur, nxt
            if _neighbor_count(skel, cur[0], cur[1]) != 2:
                break
        return path

    endpoints = [
        (y, x)
        for y in range(h)
        for x in range(w)
        if skel[y, x] and _neighbor_count(skel, y, x) == 1
    ]
    for ep in endpoints:
        for n in _neighbors(skel, ep[0], ep[1]):
            key = edge_key(ep, n)
            if key in visited_edge:
                continue
            visited_edge.add(key)
            path = [(ep[1] + x0 + 0.5, ep[0] + y0 + 0.5)]
            prev, cur = ep, n
            path.append((cur[1] + x0 + 0.5, cur[0] + y0 + 0.5))
            while _neighbor_count(skel, cur[0], cur[1]) == 2:
                nbrs = [n for n in _neighbors(skel, cur[0], cur[1]) if n != prev]
                if not nbrs:
                    break
                nxt = nbrs[0]
                key = edge_key(cur, nxt)
                if key in visited_edge:
                    break
                visited_edge.add(key)
                path.append((nxt[1] + x0 + 0.5, nxt[0] + y0 + 0.5))
                prev, cur = cur, nxt
            if len(path) >= min_path_len:
                paths.append(path)

    # Remaining loops / junction segments
    for y in range(h):
        for x in range(w):
            if not skel[y, x]:
                continue
            for n in _neighbors(skel, y, x):
                key = edge_key((y, x), n)
                if key in visited_edge:
                    continue
                visited_edge.add(key)
                path = trace_from((y, x))
                if len(path) >= min_path_len:
                    paths.append(path)

    full_h, full_w = binary.shape
    bbox = (x0, y0, x1, y1) if crop_to_content else (0, 0, full_w, full_h)
    return TraceResult(paths=paths, width=full_w, height=full_h, source_bbox=bbox)


def simplify_path(path: list[tuple[float, float]], epsilon: float = 1.2) -> list[tuple[float, float]]:
    if len(path) < 3:
        return path
    arr = np.array(path, dtype=np.float32).reshape(-1, 1, 2)
    approx = cv2.approxPolyDP(arr, epsilon, False)
    return [(float(p[0][0]), float(p[0][1])) for p in approx]


def paths_to_svg(
    trace: TraceResult,
    *,
    stroke: str,
    stroke_width: float,
    accent_paths: list[list[tuple[float, float]]] | None = None,
    accent_stroke: str | None = None,
    viewbox: tuple[float, float, float, float] | None = None,
    title: str = "KWW vector master",
) -> str:
    x0, y0, x1, y1 = trace.source_bbox
    vb = viewbox or (0, 0, trace.width, trace.height)
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]} {vb[1]} {vb[2]} {vb[3]}" '
        f'width="{int(vb[2])}" height="{int(vb[3])}">',
        f'  <title>{title}</title>',
        '  <g id="stroke-art" fill="none" stroke-linecap="round" stroke-linejoin="round">',
    ]
    for path in trace.paths:
        if len(path) < 2:
            continue
        d = "M " + " L ".join(f"{x:.2f} {y:.2f}" for x, y in path)
        lines.append(
            f'    <path d="{d}" stroke="{stroke}" stroke-width="{stroke_width:.3f}"/>'
        )
    if accent_paths and accent_stroke:
        for path in accent_paths:
            if len(path) < 2:
                continue
            d = "M " + " L ".join(f"{x:.2f} {y:.2f}" for x, y in path)
            lines.append(
                f'    <path d="{d}" stroke="{accent_stroke}" stroke-width="{stroke_width * 0.85:.3f}"/>'
            )
    lines.extend(["  </g>", "</svg>"])
    return "\n".join(lines)


def raster_to_dot_paths(
    rgba: np.ndarray,
    *,
    alpha_threshold: int = 80,
    exclude_bottom_ratio: float = 0.0,
    dot_spacing: int = 2,
) -> tuple[list[tuple[float, float, float]], tuple[int, int, int, int], tuple[int, int]]:
    """Represent line art as circle centers — preserves dense grids (ALICO windows)."""
    alpha = rgba[:, :, 3]
    binary = alpha > alpha_threshold
    if exclude_bottom_ratio > 0:
        cut = int(binary.shape[0] * (1.0 - exclude_bottom_ratio))
        binary[cut:, :] = False
    ys, xs = np.where(binary)
    if len(xs) == 0:
        raise ValueError("no ink pixels in source raster")
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    crop = binary[y0:y1, x0:x1]
    script_cut = int(crop.shape[0] * 0.88)
    crop[script_cut:, :] = False
    skel = skeletonize(crop)
    dots: list[tuple[float, float, float]] = []
    h, w = skel.shape
    for y in range(0, h, dot_spacing):
        for x in range(0, w, dot_spacing):
            if skel[y, x]:
                dots.append((x + x0 + 0.5, y + y0 + 0.5, 1.0))
    full_h, full_w = binary.shape
    return dots, (x0, y0, x1, y1), (full_w, full_h)


def dots_to_svg(
    dots: list[tuple[float, float, float]],
    *,
    width: int,
    height: int,
    fill: str,
    radius: float,
    accent_dots: list[tuple[float, float, float]] | None = None,
    accent_fill: str | None = None,
    title: str = "KWW dot vector",
) -> str:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        f"  <title>{title}</title>",
        f'  <g id="dot-art" fill="{fill}">',
    ]
    for x, y, _ in dots:
        lines.append(f'    <circle cx="{x:.2f}" cy="{y:.2f}" r="{radius:.3f}"/>')
    lines.append("  </g>")
    if accent_dots and accent_fill:
        lines.append(f'  <g id="dot-accent" fill="{accent_fill}">')
        for x, y, _ in accent_dots:
            lines.append(f'    <circle cx="{x:.2f}" cy="{y:.2f}" r="{radius * 0.9:.3f}"/>')
        lines.append("  </g>")
    lines.append("</svg>")
    return "\n".join(lines)


def fit_dots_to_box(
    dots: list[tuple[float, float, float]],
    box: tuple[float, float, float, float],
    radius: float,
) -> tuple[list[tuple[float, float, float]], float]:
    pts = [(x, y) for x, y, _ in dots]
    fitted = fit_paths_to_box([pts], box)
    minx0, _, maxx0, _ = path_bounds([pts])
    minx1, _, maxx1, _ = path_bounds(fitted)
    scale = (maxx1 - minx1) / max(maxx0 - minx0, 1.0)
    return [(x, y, radius * scale) for x, y in fitted[0]], radius * scale


def fit_paths_to_box(
    paths: list[list[tuple[float, float]]],
    box: tuple[float, float, float, float],
    source_size: tuple[int, int] | None = None,
) -> list[list[tuple[float, float]]]:
    del source_size
    x0, y0, x1, y1 = box
    bx, by, bw, bh = x0, y0, x1 - x0, y1 - y0
    minx, miny, maxx, maxy = path_bounds(paths)
    sw = max(maxx - minx, 1.0)
    sh = max(maxy - miny, 1.0)
    scale = min(bw / sw, bh / sh)
    tx = bx + (bw - sw * scale) / 2 - minx * scale
    ty = by + (bh - sh * scale) / 2 - miny * scale
    return transform_paths(paths, scale=scale, tx=tx, ty=ty)


def load_rgba(path: Path) -> np.ndarray:
    return np.array(Image.open(path).convert("RGBA"))


def render_svg_to_png(svg_path: Path, png_path: Path, width: int, height: int) -> None:
    cmd = [
        "rsvg-convert",
        "-b",
        "transparent",
        "-w",
        str(width),
        "-h",
        str(height),
        "-o",
        str(png_path),
        str(svg_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def svg_to_pdf(svg_path: Path, pdf_path: Path) -> None:
    cmd = ["rsvg-convert", "-f", "pdf", "-o", str(pdf_path), str(svg_path)]
    subprocess.run(cmd, check=True, capture_output=True)


def composite_on_canvas(
    art: Image.Image,
    canvas_size: tuple[int, int] = (4500, 5400),
    margin: int = 150,
    y_bias: float = 0.0,
    max_width_ratio: float = 0.88,
    max_height_ratio: float = 0.72,
) -> Image.Image:
    cw, ch = canvas_size
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    avail_w = int(cw * max_width_ratio) - 2 * margin
    avail_h = int(ch * max_height_ratio) - 2 * margin
    art = art.copy()
    art.thumbnail((avail_w, avail_h), Image.Resampling.LANCZOS)
    ox = (cw - art.width) // 2
    oy = margin + int((avail_h - art.height) * (0.5 + y_bias * 0.5))
    oy = max(margin, min(oy, ch - margin - art.height))
    canvas.alpha_composite(art, (ox, oy))
    return canvas


def path_bounds(paths: list[list[tuple[float, float]]]) -> tuple[float, float, float, float]:
    xs = [x for p in paths for x, _ in p]
    ys = [y for p in paths for _, y in p]
    return min(xs), min(ys), max(xs), max(ys)


def transform_paths(
    paths: list[list[tuple[float, float]]],
    *,
    scale: float,
    tx: float,
    ty: float,
) -> list[list[tuple[float, float]]]:
    out: list[list[tuple[float, float]]] = []
    for path in paths:
        out.append([(x * scale + tx, y * scale + ty) for x, y in path])
    return out


def rgba_from_svg(svg_content: str, width: int, height: int) -> Image.Image:
    import tempfile

    with tempfile.NamedTemporaryFile(suffix=".svg", delete=False, mode="w", encoding="utf-8") as f:
        f.write(svg_content)
        tmp = Path(f.name)
    out = tmp.with_suffix(".png")
    try:
        render_svg_to_png(tmp, out, width, height)
        return Image.open(out).convert("RGBA")
    finally:
        tmp.unlink(missing_ok=True)
        out.unlink(missing_ok=True)


def min_line_check(arr: np.ndarray, min_px: float = 3.0) -> dict:
    alpha = arr[:, :, 3]
    ys, xs = np.where(alpha > 20)
    if len(xs) == 0:
        return {"ok": False, "reason": "blank"}
    # crude: measure distance transform on ink mask
    ink = (alpha > 20).astype(np.uint8)
    dist = cv2.distanceTransform(ink, cv2.DIST_L2, 3)
    solid = dist[dist > 1.0]
    if len(solid):
        p5_diameter = float(np.percentile(solid, 10)) * 2
    else:
        p5_diameter = 0.0
    return {
        "ok": p5_diameter >= min_px,
        "p10_diameter_px": p5_diameter,
        "min_required_px": min_px,
    }
