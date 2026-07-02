"""Unified organic hand-drawn breed illustration style.

Both French Bulldog and Golden Retriever are reconstructed as skeleton
centerline stroke paths with identical rendering parameters so they share
line weight, hand-drawn character, and editorial feeling.

Golden Retriever is the stylistic reference; French Bulldog paths are
re-traced from the same pipeline (not the thick cartoon raster composite).
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

from phase3_vector import (
    TraceResult,
    fit_paths_to_box,
    paths_to_svg,
    raster_to_stroke_paths,
    render_svg_to_png,
    rgba_from_svg,
    simplify_path,
)


# Shared DTG-safe stroke parameters (identical for both breeds)
STROKE_WIDTH_SOURCE = 4.8       # px in source coordinate space
SIMPLIFY_EPSILON = 1.6
MIN_PATH_LEN = 3
ALPHA_THRESHOLD = 72


def _organic_jitter(path: list[tuple[float, float]], amount: float = 0.35) -> list[tuple[float, float]]:
    """Subtle hand-drawn variation — deterministic per-point offset."""
    if len(path) < 3 or amount <= 0:
        return path
    out: list[tuple[float, float]] = []
    for i, (x, y) in enumerate(path):
        # deterministic pseudo-random from coordinates
        seed = (i * 17 + int(x * 3) + int(y * 7)) % 100
        dx = ((seed % 7) - 3) * amount * 0.15
        dy = (((seed // 7) % 7) - 3) * amount * 0.15
        out.append((x + dx, y + dy))
    return out


def trace_breed_organic(
    src_png: Path,
    *,
    simplify_golden: bool = True,
) -> TraceResult:
    """Skeleton-trace breed line art to organic centerline paths."""
    rgba = np.array(Image.open(src_png).convert("RGBA"))
    trace = raster_to_stroke_paths(
        rgba,
        alpha_threshold=ALPHA_THRESHOLD,
        min_path_len=MIN_PATH_LEN,
    )
    eps = SIMPLIFY_EPSILON if simplify_golden else SIMPLIFY_EPSILON * 0.85
    paths = []
    for p in trace.paths:
        if len(p) < 2:
            continue
        sp = simplify_path(p, eps)
        if len(sp) >= 2:
            paths.append(_organic_jitter(sp, amount=0.4))
    return TraceResult(paths=paths, width=trace.width, height=trace.height, source_bbox=trace.source_bbox)


def breed_svg_fragment(
    trace: TraceResult,
    *,
    line_color: str,
    box: tuple[float, float, float, float],
    stroke_width: float | None = None,
) -> str:
    """Fit traced paths into canvas box; return inner SVG <g> fragment."""
    fitted = fit_paths_to_box(trace.paths, box, source_size=(trace.width, trace.height))
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    # scale stroke with fit
    minx, miny, maxx, maxy = _bounds(fitted)
    sw = trace.width
    scale = min(bw / max(maxx - minx, 1), bh / max(maxy - miny, 1))
    sw_canvas = (stroke_width or STROKE_WIDTH_SOURCE) * scale * 1.15
    svg = paths_to_svg(
        TraceResult(fitted, int(bw), int(bh), (0, 0, int(bw), int(bh))),
        stroke=line_color,
        stroke_width=sw_canvas,
        viewbox=(0, 0, bw, bh),
        title="breed",
    )
    inner = svg[svg.find(">", svg.find("<svg")) + 1 : svg.rfind("</svg>")]
    return f'<g transform="translate({x0:.1f} {y0:.1f})">{inner}</g>'


def render_breed_rgba(
    src_png: Path,
    *,
    line_color: str,
    box: tuple[int, int, int, int],
    canvas_size: tuple[int, int] = (4500, 5400),
) -> Image.Image:
    """Render breed as transparent PNG layer for compositing."""
    trace = trace_breed_organic(src_png)
    x0, y0, x1, y1 = box
    frag = breed_svg_fragment(trace, line_color=line_color, box=(0, 0, x1 - x0, y1 - y0))
    doc = (
        f'<?xml version="1.0" encoding="UTF-8"?>'
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {x1-x0} {y1-y0}" '
        f'width="{x1-x0}" height="{y1-y0}">{frag}</svg>'
    )
    layer = rgba_from_svg(doc, x1 - x0, y1 - y0)
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    canvas.alpha_composite(layer, (x0, y0))
    return canvas


def line_style_closeup(
    french_src: Path,
    golden_src: Path,
    out_path: Path,
    *,
    line_color: str = "#4C463E",
) -> Path:
    """Side-by-side close-up of illustration line styles at identical scale."""
    W, H = 2400, 1200
    sheet = Image.new("RGBA", (W, H), (247, 244, 239, 255))
    crop_box = (0, 0, 800, 900)  # source coords for close-up render
    for i, src in enumerate((french_src, golden_src)):
        trace = trace_breed_organic(src)
        # face region — upper-center of bbox
        x0, y0, x1, y1 = trace.source_bbox
        face_box = (
            x0 + (x1 - x0) * 0.15,
            y0 + (y1 - y0) * 0.05,
            x0 + (x1 - x0) * 0.85,
            y0 + (y1 - y0) * 0.55,
        )
        box = (40, 40, 1160, 1160)
        frag = breed_svg_fragment(trace, line_color=line_color, box=box)
        doc = (
            f'<?xml version="1.0" encoding="UTF-8"?>'
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">'
            f'<clipPath id="c"><rect x="{face_box[0]}" y="{face_box[1]}" '
            f'width="{face_box[2]-face_box[0]}" height="{face_box[3]-face_box[1]}"/></clipPath>'
            f'<g clip-path="url(#c)">{frag}</g></svg>'
        )
        layer = rgba_from_svg(doc, 1200, 1200)
        sheet.alpha_composite(layer, (i * 1200, 0))
    sheet.convert("RGB").save(out_path)
    return out_path


def _bounds(paths: list[list[tuple[float, float]]]) -> tuple[float, float, float, float]:
    xs = [x for p in paths for x, _ in p]
    ys = [y for p in paths for _, y in p]
    return min(xs), min(ys), max(xs), max(ys)
