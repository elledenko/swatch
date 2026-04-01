# Swatch V0.1 — Features

## Image Upload
- Drag and drop or click to browse
- Supports PNG, JPG, JPEG, WEBP
- Loading spinner during extraction

## Color Extraction
- Extracts 6 dominant colors from any image
- Uses node-vibrant with server-side processing
- Returns RGB, HEX, and LAB values

## Multi-Brand Paint Matching
- Matches each extracted color against 5 paint brands + Pantone
- Uses CIEDE2000 perceptual color distance (delta-e library)
- Converts RGB → LAB for accurate matching
- Shows match quality: Excellent (<3), Good (<6), Approximate (>6)
- Brands: Sherwin-Williams, Benjamin Moore, Behr, PPG, Valspar, Pantone

## Palette Display
- Image preview thumbnail
- Clickable color strip for navigation
- Expandable color cards with all brand matches
- Brand match cards with swatch, code, name, quality

## Save Palettes
- Name and save palettes (requires auth)
- Dashboard with palette cards (color strip, name, date)
- Delete palettes
- Row Level Security: users can only see/edit their own

## Auth
- Email + password sign up / sign in
- Protected dashboard route via middleware
- Unauthenticated users can still upload and extract
