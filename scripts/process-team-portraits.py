#!/usr/bin/env python3
"""Extract team portraits from Instagram carousel screenshots, apply light sepia tone, normalize size."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
SRC = Path("/Users/ntm/.cursor/projects/Users-ntm-Desktop-TAYLOR-MARRIOTT-BULK-WEBSITES-belaisy/assets")
OUT = ROOT / "src/assets/team"
SIZE = 600
SEPIA = (196, 168, 138)

TEAM = [
    ("Screenshot_2026-08-23_at_14.46.59-c6a41989-7906-4c1b-980e-55d0ae0a07df.png", "nadine"),
    ("Screenshot_2026-08-23_at_14.47.04-5a9c49f2-4126-467c-869e-d0f0a287ba0d.png", "lauren"),
    ("Screenshot_2026-08-23_at_14.47.08-af35aa98-1acf-4749-8ea9-0b8039881a1a.png", "leah"),
    ("Screenshot_2026-08-23_at_14.47.12-01ff91df-cb82-48c9-9807-02ec969c80a7.png", "medine"),
    ("Screenshot_2026-08-23_at_14.47.16-a0c6e3a3-2c69-4803-a015-15c261d16ec3.png", "joanne"),
    ("Screenshot_2026-08-23_at_14.47.21-5596f07e-c30d-4813-a9f2-b507f953c526.png", "amber"),
    ("Screenshot_2026-08-23_at_14.47.25-f0f833cf-7f82-4cec-91bc-0ca8a71e49e1.png", "maddie"),
]


def find_portrait_box(im: Image.Image) -> tuple[int, int, int, int]:
    w, h = im.size
    px = im.load()
    dark: list[tuple[int, int]] = []
    for y in range(int(h * 0.08), int(h * 0.62)):
        for x in range(int(w * 0.15), int(w * 0.85)):
            r, g, b = px[x, y][:3]
            if r < 55 and g < 55 and b < 55:
                dark.append((x, y))
    if len(dark) < 80:
        raise ValueError("Could not detect portrait frame")
    xs = [p[0] for p in dark]
    ys = [p[1] for p in dark]
    left, right = min(xs), max(xs)
    top, bottom = min(ys), max(ys)
    return (left + 2, top + 2, right - 1, bottom - 1)


def center_square_crop(im: Image.Image) -> Image.Image:
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return im.crop((left, top, left + side, top + side))


def sepia_wash(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    im = ImageEnhance.Color(im).enhance(0.88)
    im = ImageEnhance.Contrast(im).enhance(1.03)
    sepia_overlay = Image.new("RGB", im.size, SEPIA)
    return Image.blend(im, sepia_overlay, 0.14)


def reprocess_existing() -> None:
    """Re-apply sepia tone to existing team webps (boost colour/contrast back from old cream wash)."""
    for webp in sorted(OUT.glob("*.webp")):
        im = Image.open(webp)
        im = ImageEnhance.Color(im).enhance(1.12)
        im = ImageEnhance.Contrast(im).enhance(1.08)
        im = ImageEnhance.Brightness(im).enhance(0.94)
        im = sepia_wash(im)
        im.save(webp, "WEBP", quality=88)
        print(f"Reprocessed {webp.name}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    if not SRC.exists() or not any(SRC.glob("Screenshot_2026-08-23*.png")):
        reprocess_existing()
        return

    for src_name, slug in TEAM:
        im = Image.open(SRC / src_name)
        portrait = im.crop(find_portrait_box(im))
        portrait = center_square_crop(portrait)
        portrait = sepia_wash(portrait)
        portrait = portrait.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
        portrait.save(OUT / f"{slug}.webp", "WEBP", quality=88)
        print(f"Wrote {slug}.webp")


if __name__ == "__main__":
    main()
