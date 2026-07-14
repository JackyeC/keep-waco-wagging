"""Waco skyline rebuild — hand-authored architectural line art (Phase 4 review).

Deliberate SVG geometry only. Does NOT import or reuse waco_skyline_builder.py.
Landmarks: Magnolia Silos, Waco Suspension Bridge, ALICO Building, Pat Neff Hall.
"""

from __future__ import annotations

from brand_typography import JOST_FILE, glyph_paths_for_text

VIEW_W = 2200
VIEW_H = 620
BASELINE = 548
STROKE = 3.0


def _rect(x, y, w, h, sw, color, fill="none"):
    return (
        f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" '
        f'fill="{fill}" stroke="{color}" stroke-width="{sw:.1f}" stroke-linejoin="round"/>'
    )


def _line(x1, y1, x2, y2, sw, color):
    return (
        f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
        f'stroke="{color}" stroke-width="{sw:.1f}" stroke-linecap="round"/>'
    )


def _path(d, sw, color, fill="none"):
    return (
        f'<path d="{d}" fill="{fill}" stroke="{color}" stroke-width="{sw:.1f}" '
        f'stroke-linecap="round" stroke-linejoin="round"/>'
    )


def _circle(cx, cy, r, sw, color, fill="none"):
    return (
        f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="{fill}" '
        f'stroke="{color}" stroke-width="{sw:.1f}"/>'
    )


def _alico_sign(band_x, band_y, band_w, band_h, text_color: str) -> str:
    fs = band_h * 0.62
    _, tw, _ = glyph_paths_for_text(
        "ALICO",
        JOST_FILE,
        fs,
        letter_spacing=fs * 0.14,
        x_start=band_x,
        y_baseline=band_y + band_h * 0.76,
    )
    paths, _, _ = glyph_paths_for_text(
        "ALICO",
        JOST_FILE,
        fs,
        letter_spacing=fs * 0.14,
        x_start=band_x + (band_w - tw) / 2,
        y_baseline=band_y + band_h * 0.76,
    )
    return "".join(f'<path d="{d}" fill="{text_color}"/>' for d in paths)


def _magnolia_silos(color: str, sw: float) -> str:
    """Paired Magnolia silos with domed tops, ribs, and connecting headhouse."""
    e: list[str] = []
    left_x, silo_w = 52, 92
    right_x = left_x + silo_w + 18
    left_top, right_top = 248, 228

    for x, top in ((left_x, left_top), (right_x, right_top)):
        body_h = BASELINE - top
        e.append(_rect(x, top, silo_w, body_h, sw, color))
        # domed cap
        e.append(
            _path(
                f"M {x} {top} Q {x + silo_w / 2} {top - 52} {x + silo_w} {top}",
                sw,
                color,
            )
        )
        # vertical ribs
        for i in range(1, 8):
            rx = x + silo_w * i / 8
            e.append(_line(rx, top + 8, rx, BASELINE - 6, sw * 0.55, color))
        # horizontal bands
        for band in (0.28, 0.52, 0.76):
            yy = top + body_h * band
            e.append(_line(x + 4, yy, x + silo_w - 4, yy, sw * 0.65, color))

    # headhouse / conveyor between silos
    hh_x = left_x + silo_w - 8
    hh_w = right_x - left_x - silo_w + 34
    hh_y = min(left_top, right_top) - 18
    e.append(_rect(hh_x, hh_y, hh_w, 34, sw * 0.85, color))
    e.append(_path(f"M {hh_x + 8} {hh_y} L {hh_x + hh_w / 2} {hh_y - 22} L {hh_x + hh_w - 8} {hh_y}", sw * 0.85, color))
    return "".join(e)


def _suspension_bridge(color: str, sw: float) -> str:
    """Waco Suspension Bridge — limestone towers, arch openings, draped cables."""
    e: list[str] = []
    deck_y = BASELINE - 56
    left_t, right_t = 318, 498
    tower_top = 268
    tower_w = 34

    for tx in (left_t, right_t):
        # tapered limestone tower
        e.append(
            _path(
                f"M {tx - tower_w / 2} {deck_y} "
                f"L {tx - tower_w / 2 + 5} {tower_top + 24} "
                f"L {tx + tower_w / 2 - 5} {tower_top + 24} "
                f"L {tx + tower_w / 2} {deck_y} Z",
                sw,
                color,
            )
        )
        # Roman arch opening
        arch_w = tower_w * 0.72
        e.append(
            _path(
                f"M {tx - arch_w / 2} {deck_y} "
                f"Q {tx} {deck_y - 46} {tx + arch_w / 2} {deck_y}",
                sw * 0.82,
                color,
            )
        )
        e.append(_line(tx, tower_top + 24, tx, tower_top - 6, sw, color))
        e.append(_line(tx - 10, tower_top + 12, tx + 10, tower_top + 12, sw * 0.7, color))

    # main catenary cables
    mid = (left_t + right_t) / 2
    e.append(_path(f"M {left_t} {tower_top + 24} Q {mid} {tower_top + 96} {right_t} {tower_top + 24}", sw, color))
    e.append(_path(f"M {left_t - 78} {deck_y} Q {left_t - 36} {tower_top + 72} {left_t} {tower_top + 24}", sw * 0.9, color))
    e.append(_path(f"M {right_t + 78} {deck_y} Q {right_t + 36} {tower_top + 72} {right_t} {tower_top + 24}", sw * 0.9, color))

    span = right_t - left_t
    for i in range(1, 10):
        xx = left_t + span * i / 10
        t = (xx - left_t) / span
        cy = tower_top + 24 + 72 * (1 - (2 * t - 1) ** 2)
        e.append(_line(xx, cy, xx, deck_y, sw * 0.58, color))

    e.append(_line(left_t - 82, deck_y, right_t + 82, deck_y, sw, color))
    e.append(_path(f"M {left_t - 82} {deck_y} L {left_t - 108} {BASELINE - 4}", sw * 0.85, color))
    e.append(_path(f"M {right_t + 82} {deck_y} L {right_t + 106} {BASELINE - 4}", sw * 0.85, color))
    return "".join(e)


def _alico_building(color: str, sw: float, *, sign_fill: str | None = None) -> str:
    """22-story ALICO landmark with stepped crown, sign band, window rhythm, flag."""
    e: list[str] = []
    x, w = 612, 252
    body_top = 108
    body_bottom = BASELINE

    # Main tower shell
    e.append(_rect(x, body_top, w, body_bottom - body_top, sw, color))

    # Stepped upper crown (setbacks)
    crown1_y = body_top + 58
    inset1 = 18
    e.append(_rect(x + inset1, body_top, w - inset1 * 2, crown1_y - body_top, sw, color))
    crown2_y = body_top + 24
    inset2 = 34
    e.append(_rect(x + inset2, body_top, w - inset2 * 2, crown2_y - body_top, sw, color))

    # Flag pole + flag
    fx = x + w / 2
    e.append(_line(fx, body_top, fx, body_top - 38, sw, color))
    e.append(
        _path(
            f"M {fx} {body_top - 38} L {fx + 34} {body_top - 30} L {fx} {body_top - 22} Z",
            sw * 0.85,
            color,
            fill=color,
        )
    )

    # ALICO sign band
    band_y = body_top + 72
    band_h = 42
    band_x = x + 16
    band_w = w - 32
    if sign_fill:
        e.append(_rect(band_x, band_y, band_w, band_h, sw, color, fill=sign_fill))
        e.append(_alico_sign(band_x, band_y, band_w, band_h, color))
    else:
        e.append(_rect(band_x, band_y, band_w, band_h, sw, color))
        e.append(_alico_sign(band_x, band_y, band_w, band_h, color))

    # Penthouse row under sign
    pent_y = band_y + band_h + 8
    pent_h = 54
    cols = 8
    gap = (w - 34) / cols
    for c in range(cols):
        wx = x + 17 + c * gap + gap * 0.16
        ww = gap * 0.68
        e.append(_rect(wx, pent_y, ww, pent_h, sw * 0.62, color))

    # Main window grid
    grid_top = pent_y + pent_h + 12
    grid_bottom = body_bottom - 22
    rows, grid_cols = 13, 8
    cell_x = (w - 36) / grid_cols
    cell_y = (grid_bottom - grid_top) / rows
    win_w = cell_x * 0.56
    win_h = cell_y * 0.52
    for r in range(rows):
        for c in range(grid_cols):
            wx = x + 18 + c * cell_x + (cell_x - win_w) / 2
            wy = grid_top + r * cell_y + (cell_y - win_h) / 2
            e.append(_rect(wx, wy, win_w, win_h, sw * 0.48, color))

    # Vertical edge rhythm
    e.append(_line(x + 8, body_top + 40, x + 8, body_bottom - 12, sw * 0.55, color))
    e.append(_line(x + w - 8, body_top + 40, x + w - 8, body_bottom - 12, sw * 0.55, color))
    e.append(_line(x + 12, grid_top - 6, x + w - 12, grid_top - 6, sw * 0.75, color))
    return "".join(e)


def _pat_neff_hall(color: str, sw: float) -> str:
    """Pat Neff Hall — Baylor central tower, dome, columns, symmetrical wings."""
    e: list[str] = []
    cx = 1560
    body_x, body_w = 1320, 520
    body_top = 392
    e.append(_rect(body_x, body_top, body_w, BASELINE - body_top, sw, color))

    # Side wings with gabled rooflines
    wing_h = 118
    for wx, direction in ((body_x, 1), (body_x + body_w - 168, -1)):
        e.append(_rect(wx, body_top - wing_h + 18, 168, wing_h, sw * 0.92, color))
        peak_x = wx + (168 if direction > 0 else 0)
        e.append(
            _path(
                f"M {wx} {body_top - wing_h + 18} L {peak_x + direction * 84} {body_top - wing_h - 28} "
                f"L {wx + 168} {body_top - wing_h + 18}",
                sw * 0.92,
                color,
            )
        )

    # Colonnade
    col_top = body_top + 12
    col_bottom = BASELINE - 14
    col_count = 10
    col_gap = body_w / (col_count + 1)
    for i in range(1, col_count + 1):
        xx = body_x + col_gap * i
        e.append(_line(xx, col_top, xx, col_bottom, sw * 0.72, color))
    e.append(_line(body_x + 8, col_top + 8, body_x + body_w - 8, col_top + 8, sw * 0.68, color))
    e.append(_line(body_x + 8, col_bottom, body_x + body_w - 8, col_bottom, sw * 0.68, color))

    # Central tower block
    tower_w = 148
    tower_x = cx - tower_w / 2
    tower_bottom = body_top
    tower_top = 228
    e.append(_rect(tower_x, tower_top, tower_w, tower_bottom - tower_top, sw, color))
    for tier in (0.25, 0.5, 0.78):
        yy = tower_top + (tower_bottom - tower_top) * tier
        e.append(_line(tower_x + 8, yy, tower_x + tower_w - 8, yy, sw * 0.62, color))
    # arched window tiers
    for ay in (tower_top + 34, tower_top + 78, tower_top + 122):
        e.append(
            _path(
                f"M {tower_x + 24} {ay + 34} Q {cx} {ay} {tower_x + tower_w - 24} {ay + 34}",
                sw * 0.72,
                color,
            )
        )

    # Pediment
    ped_w = 176
    ped_x = cx - ped_w / 2
    e.append(
        _path(
            f"M {ped_x} {tower_top} L {cx} {tower_top - 36} L {ped_x + ped_w} {tower_top} Z",
            sw,
            color,
        )
    )

    # Drum under dome
    drum_w = 92
    drum_x = cx - drum_w / 2
    drum_bottom = tower_top - 38
    drum_top = drum_bottom - 48
    e.append(_rect(drum_x, drum_top, drum_w, drum_bottom - drum_top, sw, color))
    for i in range(1, 5):
        xx = drum_x + drum_w * i / 5
        e.append(_line(xx, drum_top + 6, xx, drum_bottom - 6, sw * 0.5, color))

    # Dome + lantern
    dome_r = drum_w / 2
    e.append(
        _path(
            f"M {drum_x} {drum_top} Q {cx} {drum_top - 78} {drum_x + drum_w} {drum_top}",
            sw,
            color,
        )
    )
    for i in range(1, 4):
        t = i / 4
        lx = drum_x + drum_w * t
        ly = drum_top - 78 * (4 * t * (1 - t))
        e.append(_line(lx, drum_top, lx, ly, sw * 0.45, color))
    e.append(_line(cx, drum_top - 78, cx, drum_top - 98, sw * 0.85, color))
    e.append(_circle(cx, drum_top - 104, 7, sw * 0.75, color, fill=color))
    return "".join(e)


def _connecting_ground(color: str, sw: float) -> str:
    """Low rooflines and baseline tying landmarks into one cityscape."""
    e: list[str] = []
    e.append(
        _path(
            f"M 24 {BASELINE} "
            f"L 250 {BASELINE} "
            f"Q 290 {BASELINE - 6} 312 {BASELINE - 58} "
            f"L 560 {BASELINE - 58} "
            f"Q 590 {BASELINE - 8} 612 {BASELINE} "
            f"L 880 {BASELINE} "
            f"Q 930 {BASELINE - 5} 980 {BASELINE - 2} "
            f"L 1320 {BASELINE - 2} "
            f"Q 1440 {BASELINE - 4} 1560 {BASELINE - 2} "
            f"L {VIEW_W - 24} {BASELINE}",
            sw * 0.92,
            color,
        )
    )
    # low infill between bridge and ALICO
    e.append(_path(f"M 548 {BASELINE - 58} Q 580 {BASELINE - 92} 612 {BASELINE - 58}", sw * 0.78, color))
    return "".join(e)


def build_skyline_svg(line_color: str, *, sign_fill: str | None = None, stroke: float = STROKE) -> str:
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW_W} {VIEW_H}" '
        f'width="{VIEW_W}" height="{VIEW_H}">',
        '<g id="waco-skyline-rebuild">',
        _magnolia_silos(line_color, stroke),
        _suspension_bridge(line_color, stroke),
        _alico_building(line_color, stroke, sign_fill=sign_fill),
        _pat_neff_hall(line_color, stroke),
        _connecting_ground(line_color, stroke),
        "</g>",
        "</svg>",
    ]
    return "".join(parts)


def skyline_inner_svg(line_color: str, *, sign_fill: str | None = None, stroke: float = STROKE) -> str:
    svg = build_skyline_svg(line_color, sign_fill=sign_fill, stroke=stroke)
    start = svg.find(">", svg.find("<svg")) + 1
    end = svg.rfind("</svg>")
    return svg[start:end]


# Crop regions for owner review (viewBox coordinates)
ALICO_CROP = (580, 70, 900, 560)
PAT_NEFF_CROP = (1280, 170, 1880, 560)
