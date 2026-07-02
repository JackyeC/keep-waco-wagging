"""Brand Book typography — verified font files → SVG path outlines.

Converts KEEP WACO (Cormorant Garamond SemiBold) and wagging (Parisienne)
to vector paths only after confirming the correct font files were loaded.
No live <text> elements in production lockups.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "fonts"

# Verified static instances (variable fonts instantiated at correct wght axis)
CORMORANT_FILE = FONTS / "CormorantGaramond-SemiBold-600.ttf"
PARISIENNE_FILE = FONTS / "Parisienne-Regular.ttf"
JOST_FILE = FONTS / "Jost-Medium-500.ttf"

# Legacy mislabeled files used in rejected revision pass
REJECTED_CORMORANT = FONTS / "CormorantGaramond-SemiBold.ttf"
REJECTED_JOST = FONTS / "Jost-Medium.ttf"


@dataclass
class FontMeta:
    path: Path
    family: str
    subfamily: str
    full_name: str
    postscript: str
    wght_axis: int | None = None


def read_font_meta(path: Path) -> FontMeta:
    t = TTFont(path)
    names = {n.nameID: n.toUnicode() for n in t["name"].names if n.nameID in (1, 2, 4, 6)}
    wght = None
    if "fvar" in t:
        for axis in t["fvar"].axes:
            if axis.axisTag == "wght":
                wght = int(axis.defaultValue)
    return FontMeta(
        path=path,
        family=names.get(1, "?"),
        subfamily=names.get(2, "?"),
        full_name=names.get(4, "?"),
        postscript=names.get(6, "?"),
        wght_axis=wght,
    )


def _layout_text(
    text: str,
    font: TTFont,
    font_size: float,
    letter_spacing: float = 0.0,
) -> list[tuple[str, float, float]]:
    """Return list of (glyph_name, x_offset, advance) for each character."""
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    units_per_em = font["head"].unitsPerEm
    scale = font_size / units_per_em
    x = 0.0
    glyphs: list[tuple[str, float, float]] = []
    for i, ch in enumerate(text):
        gid = cmap.get(ord(ch))
        if gid is None:
            continue
        glyphs.append((gid, x, 0.0))
        adv = font["hmtx"][gid][0] * scale
        x += adv + (letter_spacing if i < len(text) - 1 else 0.0)
    return glyphs


def glyph_paths_for_text(
    text: str,
    font_path: Path,
    font_size: float,
    *,
    letter_spacing: float = 0.0,
    y_baseline: float = 0.0,
    x_start: float = 0.0,
) -> tuple[list[str], float, float]:
    """Return SVG path d strings, total width, ascender height estimate."""
    font = TTFont(font_path)
    glyph_set = font.getGlyphSet()
    upem = font["head"].unitsPerEm
    scale = font_size / upem
    cmap = font.getBestCmap()

    paths: list[str] = []
    x = x_start
    for i, ch in enumerate(text):
        gid = cmap.get(ord(ch))
        if gid is None:
            continue
        pen = SVGPathPen(glyph_set)
        tpen = TransformPen(pen, (scale, 0, 0, -scale, x, y_baseline))
        glyph_set[gid].draw(tpen)
        d = pen.getCommands()
        if d:
            paths.append(d)
        adv = font["hmtx"][gid][0] * scale
        x += adv + (letter_spacing if i < len(text) - 1 else 0.0)

    width = x - x_start
    # approximate cap height from OS/2 or 0.7 * font_size
    cap = font_size * 0.72
    if "OS/2" in font:
        cap = (font["OS/2"].sCapHeight or font["OS/2"].usWinAscent) * scale
    return paths, width, cap


def lockup_paths_svg(
    *,
    x_center: float,
    y_top: float,
    keep_color: str,
    wagging_color: str,
    keep_size: float = 460.0,
    wagging_size: float = 360.0,
    keep_tracking: float | None = None,
    cormorant_file: Path = CORMORANT_FILE,
    parisienne_file: Path = PARISIENNE_FILE,
) -> str:
    """Build centered lockup as filled SVG paths (no <text>)."""
    tracking = keep_tracking if keep_tracking is not None else keep_size * 0.08
    keep_paths, keep_w, keep_h = glyph_paths_for_text(
        "KEEP WACO",
        cormorant_file,
        keep_size,
        letter_spacing=tracking,
        y_baseline=y_top + keep_size * 0.78,
    )
    wag_paths, wag_w, _ = glyph_paths_for_text(
        "wagging",
        parisienne_file,
        wagging_size,
        letter_spacing=wagging_size * 0.02,
        y_baseline=y_top + keep_h + wagging_size * 0.82,
    )

    keep_x = x_center - keep_w / 2
    wag_x = x_center - wag_w / 2

    # Re-render with correct horizontal centering
    keep_paths, keep_w, keep_h = glyph_paths_for_text(
        "KEEP WACO",
        cormorant_file,
        keep_size,
        letter_spacing=tracking,
        x_start=keep_x,
        y_baseline=y_top + keep_size * 0.78,
    )
    wag_paths, wag_w, _ = glyph_paths_for_text(
        "wagging",
        parisienne_file,
        wagging_size,
        letter_spacing=wagging_size * 0.02,
        x_start=wag_x,
        y_baseline=y_top + keep_h + wagging_size * 0.82,
    )

    parts = ['<g id="brand-lockup-paths">']
    for d in keep_paths:
        parts.append(f'<path d="{d}" fill="{keep_color}"/>')
    for d in wag_paths:
        parts.append(f'<path d="{d}" fill="{wagging_color}"/>')
    parts.append("</g>")
    return "\n".join(parts)


def text_paths_svg(
    text: str,
    *,
    font_path: Path,
    font_size: float,
    fill: str,
    x_center: float,
    y_baseline: float,
    letter_spacing: float = 0.0,
) -> str:
    paths, w, _ = glyph_paths_for_text(
        text,
        font_path,
        font_size,
        letter_spacing=letter_spacing,
        x_start=x_center - 0,  # placeholder
        y_baseline=y_baseline,
    )
    # center
    paths, w, _ = glyph_paths_for_text(
        text,
        font_path,
        font_size,
        letter_spacing=letter_spacing,
        x_start=x_center - w / 2,
        y_baseline=y_baseline,
    )
    parts = []
    for d in paths:
        parts.append(f'<path d="{d}" fill="{fill}"/>')
    return "".join(parts)


def rejected_lockup_svg(
    *,
    x_center: float,
    y_top: float,
    keep_color: str,
    wagging_color: str,
    keep_size: float = 460.0,
    wagging_size: float = 360.0,
) -> str:
    """Render rejected typography using mislabeled legacy font files (for comparison panel)."""
    return lockup_paths_svg(
        x_center=x_center,
        y_top=y_top,
        keep_color=keep_color,
        wagging_color=wagging_color,
        keep_size=keep_size,
        wagging_size=wagging_size,
        cormorant_file=REJECTED_CORMORANT,
        parisienne_file=PARISIENNE_FILE,
    )


def verified_font_report() -> dict:
    return {
        "cormorant_verified": read_font_meta(CORMORANT_FILE).__dict__,
        "parisienne_verified": read_font_meta(PARISIENNE_FILE).__dict__,
        "jost_verified": read_font_meta(JOST_FILE).__dict__,
        "cormorant_rejected_file": read_font_meta(REJECTED_CORMORANT).__dict__,
        "jost_rejected_file": read_font_meta(REJECTED_JOST).__dict__,
    }
