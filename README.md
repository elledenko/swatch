# Swatch

Upload an image, get a color palette matched across major paint brands and Pantone codes.

Built for interior designers, home renovators, and anyone who wants to go from inspiration photo to paintable color in seconds.

## Features

- **Image upload** — drag & drop or click to browse
- **Color extraction** — extracts 6 dominant colors from any image
- **Multi-brand matching** — maps each color to the nearest match across:
  - Sherwin-Williams
  - Benjamin Moore
  - Behr
  - PPG
  - Valspar
  - Pantone
- **Save palettes** — name and save your palettes (requires account)
- **CIEDE2000 matching** — uses perceptual color distance in LAB color space for accurate results

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS
- **Backend:** Supabase (Auth + Postgres)
- **Deployment:** Vercel
- **Language:** TypeScript
- **Color extraction:** node-vibrant
- **Color matching:** delta-e (CIEDE2000)

## Getting Started

```bash
git clone https://github.com/elledenko/swatch.git
cd swatch
npm install
cp .env.example .env.local
# Fill in your Supabase keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Disclaimer

Color matches are approximations based on digital color values. Actual paint colors may vary depending on lighting, surface, and finish. Pantone codes are nearest-match estimates, not official Pantone references.
