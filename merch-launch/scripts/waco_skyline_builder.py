"""Hand-authored Waco skyline vector builder — Phase 3 Final.

Deliberate vector paths (NOT skeleton tracing, NOT potrace, NOT circle primitives,
NOT embedded raster). One cohesive editorial drawing: silos, suspension bridge,
ALICO (central landmark with sign band), courthouse — tied by a continuous baseline
and consistent architectural line weight.
"""

from __future__ import annotations

VIEW_W = 1600
VIEW_H = 560
BASELINE = 502


def _rect(x, y, w, h, sw, color, fill="none"):
    return (
        f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" '
        f'fill="{fill}" stroke="{color}" stroke-width="{sw:.1f}" '
        f'stroke-linejoin="round"/>'
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


def _wobble_line(x1, y1, x2, y2, sw, color, wobble: float = 1.2):
    """Slight hand-drawn editorial variation on horizontal/vertical segments."""
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    if abs(x2 - x1) >= abs(y2 - y1):
        cy = my + wobble
        d = f"M {x1:.1f} {y1:.1f} Q {mx:.1f} {cy:.1f} {x2:.1f} {y2:.1f}"
    else:
        cx = mx + wobble * 0.6
        d = f"M {x1:.1f} {y1:.1f} Q {cx:.1f} {my:.1f} {x2:.1f} {y2:.1f}"
    return _path(d, sw, color)


def _alico_sign_paths(band_x, band_y, band_w, band_h, text_color: str) -> str:
    from brand_typography import JOST_FILE, glyph_paths_for_text

    fs = band_h * 0.68
    paths, tw, _ = glyph_paths_for_text(
        "ALICO",
        JOST_FILE,
        fs,
        letter_spacing=fs * 0.12,
        x_start=band_x + band_w * 0.1,
        y_baseline=band_y + band_h * 0.78,
    )
    paths, tw, _ = glyph_paths_for_text(
        "ALICO",
        JOST_FILE,
        fs,
        letter_spacing=fs * 0.12,
        x_start=band_x + (band_w - tw) / 2,
        y_baseline=band_y + band_h * 0.78,
    )
    return "".join(f'<path d="{d}" fill="{text_color}"/>' for d in paths)


def _silos(color, sw):
    """Two ribbed cylindrical silos with domed tops (far left), seated on shared baseline."""
    e = []
    base_y = BASELINE
    x1 = 68
    w = 76
    top = 258
    e.append(_rect(x1, top, w, base_y - top, sw, color))
    e.append(_path(f"M {x1} {top} Q {x1 + w/2} {top - 44} {x1 + w} {top}", sw, color))
    for gy in range(1, 4):
        yy = top + (base_y - top) * gy / 4
        e.append(_wobble_line(x1, yy, x1 + w, yy, sw * 0.72, color, 0.8))
    x2 = x1 + w + 14
    top2 = 240
    e.append(_rect(x2, top2, w, base_y - top2, sw, color))
    e.append(_path(f"M {x2} {top2} Q {x2 + w/2} {top2 - 46} {x2 + w} {top2}", sw, color))
    for gy in range(1, 4):
        yy = top2 + (base_y - top2) * gy / 4
        e.append(_wobble_line(x2, yy, x2 + w, yy, sw * 0.72, color, 0.8))
    return "".join(e)


def _bridge(color, sw):
    """Waco Suspension Bridge — twin stone towers, draped cables, suspenders, deck."""
    e = []
    deck_y = BASELINE - 48
    left_t = 292
    right_t = 468
    tower_top = 292
    tower_w = 22
    for tx in (left_t, right_t):
        # stone tower body with slight taper
        e.append(_path(
            f"M {tx - tower_w/2} {deck_y} L {tx - tower_w/2 + 3} {tower_top + 18} "
            f"L {tx + tower_w/2 - 3} {tower_top + 18} L {tx + tower_w/2} {deck_y} Z",
            sw, color,
        ))
        # arch opening
        aw = tower_w * 0.55
        e.append(_path(
            f"M {tx - aw/2} {deck_y} Q {tx} {deck_y - 28} {tx + aw/2} {deck_y}",
            sw * 0.75, color,
        ))
        e.append(_line(tx, tower_top + 18, tx, tower_top - 10, sw, color))
    # main cable catenary
    e.append(_path(
        f"M {left_t} {tower_top + 18} Q {(left_t+right_t)/2} {tower_top + 88} {right_t} {tower_top + 18}",
        sw, color,
    ))
    # anchor cables
    e.append(_path(f"M {left_t} {tower_top + 18} Q {left_t - 58} {tower_top + 62} {left_t - 92} {deck_y}", sw, color))
    e.append(_path(f"M {right_t} {tower_top + 18} Q {right_t + 58} {tower_top + 62} {right_t + 92} {deck_y}", sw, color))
    span = right_t - left_t
    for i in range(1, 9):
        xx = left_t + span * i / 9
        t = (xx - left_t) / span
        cy = tower_top + 18 + 70 * (1 - (2 * t - 1) ** 2)
        e.append(_line(xx, cy, xx, deck_y, sw * 0.62, color))
    e.append(_wobble_line(left_t - 96, deck_y, right_t + 96, deck_y, sw, color, 0.9))
    # approach ramp to baseline
    e.append(_path(f"M {left_t - 96} {deck_y} L {left_t - 120} {BASELINE - 6}", sw * 0.85, color))
    e.append(_path(f"M {right_t + 96} {deck_y} L {right_t + 118} {BASELINE - 6}", sw * 0.85, color))
    return "".join(e)


def _alico(color, sw, sign_fill=None):
    """ALICO Building — central 22-story landmark with sign band and window rhythm."""
    e = []
    tower_x = 618
    tower_w = 214
    tower_top = 148
    tower_bottom = BASELINE
    e.append(_rect(tower_x, tower_top, tower_w, tower_bottom - tower_top, sw, color))

    fx = tower_x + tower_w / 2
    e.append(_line(fx, tower_top, fx, tower_top - 44, sw, color))
    e.append(_path(f"M {fx} {tower_top - 44} L {fx + 32} {tower_top - 36} L {fx} {tower_top - 28} Z", sw * 0.8, color, fill=color))

    band_h = 44
    band_y = tower_top + 10
    band_x = tower_x + 12
    band_w = tower_w - 24
    sign_text_color = sign_fill if sign_fill else color
    if sign_fill:
        e.append(_rect(band_x, band_y, band_w, band_h, sw, color, fill=sign_fill))
        e.append(_alico_sign_paths(band_x, band_y, band_w, band_h, color))
    else:
        e.append(_rect(band_x, band_y, band_w, band_h, sw, color))
        e.append(_alico_sign_paths(band_x, band_y, band_w, band_h, color))

    up_y = band_y + band_h + 10
    up_h = 68
    up_cols = 7
    gap = (tower_w - 26) / up_cols
    for c in range(up_cols):
        wx = tower_x + 13 + c * gap + gap * 0.18
        ww = gap * 0.62
        e.append(_rect(wx, up_y, ww, up_h, sw * 0.68, color))
    div_y = up_y + up_h + 10
    e.append(_wobble_line(tower_x + 8, div_y, tower_x + tower_w - 8, div_y, sw, color, 0.7))

    grid_top = div_y + 14
    grid_bottom = tower_bottom - 18
    rows, cols = 11, 7
    cell_gap_x = (tower_w - 28) / cols
    cell_gap_y = (grid_bottom - grid_top) / rows
    win_w = cell_gap_x * 0.58
    win_h = cell_gap_y * 0.56
    for r in range(rows):
        for c in range(cols):
            wx = tower_x + 14 + c * cell_gap_x + (cell_gap_x - win_w) / 2
            wy = grid_top + r * cell_gap_y + (cell_gap_y - win_h) / 2
            e.append(_rect(wx, wy, win_w, win_h, sw * 0.52, color))
    return "".join(e)


def _pier(color, sw):
    """Low connecting roofline between ALICO and courthouse."""
    x0 = 848
    x1 = 1048
    y = 478
    e = [
        _path(f"M {x0} {BASELINE - 2} Q {x0 + 60} {y - 8} {x1 - 72} {y} L {x1} {BASELINE - 2}", sw * 0.82, color),
    ]
    return "".join(e)


def _courthouse(color, sw):
    """McLennan County Courthouse — columned facade, drum, dome, statue finial."""
    e = []
    cx = 1228
    body_x = 1088
    body_w = 288
    body_top = 368
    e.append(_rect(body_x, body_top, body_w, BASELINE - body_top, sw, color))
    e.append(_wobble_line(body_x, body_top + 10, body_x + body_w, body_top + 10, sw, color, 0.6))
    n_col = 8
    col_gap = body_w / (n_col + 1)
    for i in range(1, n_col + 1):
        xx = body_x + col_gap * i
        e.append(_wobble_line(xx, body_top + 16, xx, BASELINE - 10, sw * 0.74, color, 0.5))
    e.append(_wobble_line(body_x + 6, BASELINE - 10, body_x + body_w - 6, BASELINE - 10, sw * 0.68, color, 0.5))

    port_w = 118
    port_x = cx - port_w / 2
    ped_base = body_top
    ped_apex = ped_base - 32
    e.append(_path(f"M {port_x - 8} {ped_base} L {cx} {ped_apex} L {port_x + port_w + 8} {ped_base} Z", sw, color))

    drum_w = 84
    drum_x = cx - drum_w / 2
    drum_bottom = ped_apex - 2
    drum_top = drum_bottom - 44
    e.append(_rect(drum_x, drum_top, drum_w, drum_bottom - drum_top, sw, color))
    for i in range(1, 4):
        xx = drum_x + drum_w * i / 4
        e.append(_line(xx, drum_top + 5, xx, drum_bottom - 5, sw * 0.52, color))

    dome_h = 72
    e.append(_path(f"M {drum_x} {drum_top} Q {cx} {drum_top - dome_h} {drum_x + drum_w} {drum_top}", sw, color))
    e.append(_path(f"M {drum_x+14} {drum_top} Q {cx} {drum_top - dome_h*0.68} {drum_x + drum_w-14} {drum_top}", sw * 0.52, color))

    apex = drum_top - dome_h / 2
    e.append(_line(cx, apex, cx, apex - 20, sw * 0.88, color))
    e.append(_path(
        f"M {cx} {apex-20} C {cx-5} {apex-24} {cx-5} {apex-31} {cx} {apex-35} "
        f"C {cx+5} {apex-31} {cx+5} {apex-24} {cx} {apex-20} Z",
        sw * 0.68, color, fill=color,
    ))
    return "".join(e)


def _continuous_baseline(color, sw):
    """Single ground line tying silos → bridge → ALICO → courthouse."""
    d = (
        f"M 36 {BASELINE} "
        f"L 168 {BASELINE} "
        f"Q 220 {BASELINE - 4} 280 {BASELINE - 2} "
        f"L 520 {BASELINE - 2} "
        f"L 618 {BASELINE} "
        f"L 1088 {BASELINE} "
        f"Q 1160 {BASELINE - 3} 1228 {BASELINE - 2} "
        f"L {VIEW_W - 36} {BASELINE}"
    )
    return _path(d, sw, color)


def build_skyline_svg(line_color: str, *, sign_fill: str | None = None, stroke: float = 3.4) -> str:
    """Return a full skyline SVG string on the standard 1600x560 viewBox."""
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW_W} {VIEW_H}" '
        f'width="{VIEW_W}" height="{VIEW_H}">',
        '<g id="waco-skyline">',
        _silos(line_color, stroke),
        _bridge(line_color, stroke),
        _alico(line_color, stroke, sign_fill=sign_fill),
        _pier(line_color, stroke),
        _courthouse(line_color, stroke),
        _continuous_baseline(line_color, stroke * 0.95),
        "</g>",
        "</svg>",
    ]
    return "".join(parts)
