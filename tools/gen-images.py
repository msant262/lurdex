#!/usr/bin/env python3
"""
Generate themed editorial product images for Lurdex Magazinne via OpenAI API.

Setup once:
  pip install openai
  export OPENAI_API_KEY="sk-..."

Run:
  python3 tools/gen-images.py            # generate everything that's missing
  python3 tools/gen-images.py --force    # regenerate everything (overwrites)
  python3 tools/gen-images.py p01 p02    # only specific slot seeds

Cost estimate at gpt-image-1 1024x1024 medium quality: ~$0.04 per image.
~46 images total ≈ US$2.
"""

import os, sys, base64, json, time, argparse
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    sys.exit("Install the OpenAI SDK first:  pip install openai")

# ---------------------------------------------------------------
# Manifest: seed → (size, prompt)
# Sizes accepted by gpt-image-1: 1024x1024, 1024x1536, 1536x1024
# ---------------------------------------------------------------
BASE_STYLE = (
    "Editorial magazine still life photograph. Lurdex Magazinne brand — premium "
    "imports for the home. Palette: aubergine, lilac, dusty rose, sage, cream. "
    "Soft natural window light. Vogue/Kinfolk aesthetic. Minimal, refined, no text. "
)

MANIFEST = {
    # Products (square)
    "p01": ("1024x1024", "Elegant brass candlestick holder with cream taper candle on cream linen tablecloth, single subject, centered."),
    "p02": ("1024x1024", "Oval vintage table mirror with patinated dark wood frame on dusty pink linen, standing upright."),
    "p03": ("1024x1024", "Amber glass serum dropper bottle, minimal label, on blush pink marble counter."),
    "p04": ("1024x1024", "Glass perfume bottle with minimal label on deep burgundy velvet, dramatic side lighting."),
    "p05": ("1024x1024", "Folded sage green silk twill scarf with subtle botanical print on cream linen."),
    "p06": ("1024x1024", "Structured deep aubergine Italian leather clutch handbag on cream surface."),
    "p07": ("1024x1024", "Handmade cream porcelain teapot with matching cup on raw linen, japandi style."),
    "p08": ("1024x1024", "Set of hexagonal cut crystal cocktail glasses on lilac silk surface."),
    "p09": ("1024x1024", "Cream gift box wrapped in dusty pink ribbon with red wax seal on linen."),
    "p10": ("1024x1024", "Hand-painted lilac glass candle vessel with lit cream wick on dark walnut wood."),
    "p11": ("1024x1024", "Leather-bound notebook with silk ribbon bookmark on dark walnut writing desk."),
    "p12": ("1024x1024", "Sage green crackle-glaze ceramic planter with small olive plant on cream linen."),

    # Home hero / manifesto / campaign
    "lurdex-hero":      ("1024x1536", "Woman in cream linen turtleneck holding ceramic vase with dried autumn pampas grass, lilac and dusty rose palette, vogue cover, portrait orientation."),
    "lurdex-manifesto": ("1024x1536", "Elegant hands wrapping a luxury gift box with cream silk ribbon and red wax seal on dusty pink linen, portrait orientation."),
    "campaign-band":    ("1536x1024", "Cinematic editorial campaign: woman in cream linen dress holding dried pampas bouquet near tall arched window, golden hour light through sheer curtains, italian palazzo interior, lilac and aubergine palette, wide cinematic angle."),

    # Editorial tiles (home)
    "ed-tile-1": ("1536x1024", "Warm cup of tea steaming on linen tablecloth with dried pampas grass and beeswax candle, golden afternoon light, lilac and cream palette."),
    "ed-tile-2": ("1024x1536", "Dinner table set with cream linen runner, vintage porcelain plates, brass candlesticks, pink peonies in vase, overhead angle."),
    "ed-tile-3": ("1024x1024", "Backstage atelier scene: draped silk scarves in sage green and olive on a brass coat rack, soft light through linen curtains."),
    "ed-tile-4": ("1024x1024", "Marble bathroom counter with amber glass serum bottle and ceramic dish with rose petals, soft window light, burgundy accent."),

    # Manifesto pillars (home, square minis)
    "pillar-mini-1": ("1024x1024", "Single handmade ceramic object centered on cream linen, macro close-up, lilac palette."),
    "pillar-mini-2": ("1024x1024", "Cream silk ribbon tied around red wax seal, macro close-up, rose palette."),
    "pillar-mini-3": ("1024x1024", "Handwritten note on cream paper with fountain pen, macro close-up, sage palette."),
    "pillar-mini-4": ("1024x1024", "Dried autumn leaves and dried flowers arrangement on linen, macro, wine palette."),

    # Testimonial avatars (square portraits)
    "avatar-mariana": ("1024x1024", "Natural portrait of an elegant Brazilian woman in her 30s, soft warm smile, cream blouse, soft window daylight, head and shoulders, vogue magazine portrait."),
    "avatar-luisa":   ("1024x1024", "Natural portrait of a young Brazilian woman in her late 20s, dark wavy hair, natural smile, sage green sweater, head and shoulders."),
    "avatar-camila":  ("1024x1024", "Natural portrait of a confident Brazilian woman in her 40s, warm smile, silver earrings, soft burgundy blouse, golden hour light, head and shoulders."),

    # Category tiles (home, landscape)
    "cat-casa":      ("1536x1024", "Brass candlestick and ceramic vase on cream linen, lilac palette, vogue living magazine still life."),
    "cat-beleza":    ("1536x1024", "Amber serum bottle and ceramic dish with rose petals on dusty pink marble, vogue beauty flat lay."),
    "cat-moda":      ("1536x1024", "Structured leather clutch bag with silk scarf draped, on deep burgundy velvet, dramatic soft light."),
    "cat-cozinha":   ("1536x1024", "Handmade sage green porcelain teapot with matching cup on raw linen, japandi minimal."),
    "cat-presentes": ("1536x1024", "Cream wrapped gift box with silk ribbon and red wax seal, dried flowers, on linen."),
    "cat-living":    ("1536x1024", "Hand-painted glass candle vessel burning, dark walnut wood surface, books, moody library light."),

    # Category feature arts (portrait)
    "casa-feature":   ("1024x1536", "Dinner table set with cream linen runner, brass candlesticks, vintage porcelain plates, pink peonies."),
    "beleza-feature": ("1024x1536", "Amber glass serum bottle and ceramic dish with rose petals on dusty pink marble counter."),
    "moda-feature":   ("1024x1536", "Structured Italian leather handbag in deep burgundy with silk twill scarf draped, on dark walnut wood, dramatic side light."),

    # Editions covers (landscape)
    "edicao-xii": ("1536x1024", "Autumn magazine cover: dried pampas grass in ceramic vase, warm tea cup, beeswax candle on cream linen, lilac and aubergine palette."),
    "edicao-xi":  ("1536x1024", "Summer magazine cover: sheer linen curtains, translucent green glass bottles with herbs, sage and cream palette."),
    "edicao-x":   ("1536x1024", "Spring magazine cover: fresh pink peonies in vintage porcelain vase on cream linen, rose and cream palette."),
    "edicao-ix":  ("1536x1024", "Winter magazine cover: dark wood surface, deep burgundy velvet, vintage perfume bottle, moody candlelight."),

    # Edicao XII page (hero + 3 banners)
    "ed-xii-hero": ("1536x1024", "Atmospheric autumn editorial spread, soft focus dried pampas grass and amber light filtering through linen curtains, lilac and aubergine palette, cinematic depth."),
    "banner-1":    ("1536x1024", "Single beeswax candle burning on cream linen with dried herbs and small ceramic dish, lilac palette."),
    "banner-2":    ("1536x1024", "Antique vintage table mirror with patinated bronze frame on dusty pink linen, fresh pink peonies."),
    "banner-3":    ("1536x1024", "Olive branches in sage green ceramic vase next to a hand-bound notebook with silk ribbon, on raw linen."),

    # Marca page (founder + 3 pillars)
    "founder-portrait":  ("1024x1536", "Portrait of an elegant Brazilian woman in her late 50s, soft natural beauty, cream silk blouse, holding vintage porcelain teacup, sitting by window with soft daylight, warm dusty pink and cream tones, three quarter view."),
    "pillar-curadoria":  ("1536x1024", "Elegant hands gently inspecting handmade ceramic objects on a wooden workshop table in tuscan atelier, warm afternoon light, lilac and cream palette."),
    "pillar-cuidado":    ("1536x1024", "Hands tying cream silk ribbon on wrapped gift box with red wax seal, dusty pink linen surface, soft daylight."),
    "pillar-acesso":     ("1536x1024", "Handwritten card on cream paper resting on wooden table next to wax-sealed envelope and dried flowers, soft warm window light."),
}

# ---------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("seeds", nargs="*", help="Only generate these seeds (default: missing only)")
    ap.add_argument("--force", action="store_true", help="Regenerate even if local file exists")
    ap.add_argument("--model", default="gpt-image-1", help="OpenAI image model (default: gpt-image-1)")
    ap.add_argument("--quality", default="medium", choices=["low","medium","high","auto"])
    ap.add_argument("--out", default="assets/img", help="Output directory")
    args = ap.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        sys.exit("Set OPENAI_API_KEY env var.  Get a key at https://platform.openai.com/api-keys")

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    targets = list(args.seeds) if args.seeds else list(MANIFEST.keys())
    unknown = [s for s in targets if s not in MANIFEST]
    if unknown:
        sys.exit(f"Unknown seed(s): {unknown}\nKnown: {sorted(MANIFEST.keys())}")

    client = OpenAI()
    done = skipped = failed = 0
    for seed in targets:
        size, body = MANIFEST[seed]
        out = out_dir / f"{seed}.jpg"
        if out.exists() and not args.force:
            print(f"  [skip] {seed:18s} already exists ({out.stat().st_size} bytes)")
            skipped += 1
            continue

        prompt = BASE_STYLE + body
        t0 = time.time()
        try:
            r = client.images.generate(
                model=args.model,
                prompt=prompt,
                size=size,
                quality=args.quality,
                n=1,
            )
            data = r.data[0]
            if getattr(data, "b64_json", None):
                blob = base64.b64decode(data.b64_json)
            elif getattr(data, "url", None):
                import urllib.request
                blob = urllib.request.urlopen(data.url, timeout=60).read()
            else:
                raise RuntimeError("No b64_json or url in response")
            out.write_bytes(blob)
            done += 1
            print(f"  [ ok ] {seed:18s} {len(blob)} bytes  {time.time()-t0:.1f}s  ({size})")
        except Exception as e:
            failed += 1
            print(f"  [FAIL] {seed:18s} {e}")

    print(f"\nDone — generated: {done}  skipped: {skipped}  failed: {failed}")

if __name__ == "__main__":
    main()
