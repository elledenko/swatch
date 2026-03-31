# Swatch — Roadmap

## Milestone 1: Project Scaffold + Auth (S)

Scaffolded Next.js app with Supabase auth (sign up / login), basic layout shell, deployed to Vercel.

## Milestone 2: Image Upload + Color Extraction (M)

Drag-and-drop image upload, extract 5-8 dominant colors using color quantization, display palette on screen.

## Milestone 3: Paint Brand + Pantone Matching (L)

Build color-matching engine — map extracted colors to nearest Sherwin-Williams, Benjamin Moore, Behr, PPG, Valspar, and Pantone codes. Display matches per color.

## Milestone 4: Save Palettes (S)

Users can name and save palettes to their account, view saved palettes, delete palettes.

## Milestone 5: Polish + Visual Identity (M)

Apply jennaisfeeling-inspired design — bold color, editorial warmth, joyful UI. Final smoke test.

## Risks & Unknowns

- **Paint color data:** Need to source RGB/hex values for each brand's full palette. Sherwin-Williams, Benjamin Moore, and Behr publish downloadable palettes. PPG and Valspar may need third-party data.
- **Color matching accuracy:** Must use CIEDE2000 in LAB color space for perceptual accuracy.
- **Pantone legal:** Using approximation-based matching with a disclaimer, not official Pantone data licensing.
