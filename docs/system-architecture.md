# Swatch — System Architecture

## High-Level Architecture

```
Browser (Client)
  +-- Image Upload (react-dropzone)
  +-- Auth UI (Supabase Auth)
  +-- Palette Display
          |
          v
Next.js API Routes (Server)
  +-- POST /api/extract     receive image, extract colors via node-vibrant
  +-- POST /api/match        take RGB colors, match against paint/Pantone datasets
  +-- GET/POST /api/palettes  CRUD saved palettes (authed)
  +-- Supabase client (service role)
          |
          v
Supabase Postgres
  +-- auth.users (managed by Supabase Auth)
  +-- public.palettes        saved palettes per user
  +-- public.palette_colors  individual colors in a palette

Static Color Data (JSON files in /src/data/)
  +-- sherwin-williams.json
  +-- benjamin-moore.json
  +-- behr.json
  +-- ppg.json
  +-- valspar.json
  +-- pantone.json
```

## Data Model

```sql
-- Saved palettes
CREATE TABLE palettes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  source_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Colors within a palette
CREATE TABLE palette_colors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  palette_id UUID REFERENCES palettes(id) ON DELETE CASCADE,
  position INT NOT NULL,
  hex TEXT NOT NULL,
  rgb_r INT, rgb_g INT, rgb_b INT,
  lab_l FLOAT, lab_a FLOAT, lab_b FLOAT,
  pantone_code TEXT,
  pantone_name TEXT,
  sherwin_williams_code TEXT,
  sherwin_williams_name TEXT,
  benjamin_moore_code TEXT,
  benjamin_moore_name TEXT,
  behr_code TEXT,
  behr_name TEXT,
  ppg_code TEXT,
  ppg_name TEXT,
  valspar_code TEXT,
  valspar_name TEXT
);

-- RLS policies
ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE palette_colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own palettes" ON palettes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD own palette colors" ON palette_colors
  FOR ALL USING (palette_id IN (SELECT id FROM palettes WHERE user_id = auth.uid()));
```

## Color Matching Algorithm

1. User uploads image -> sent to `/api/extract`
2. `node-vibrant` extracts 6 dominant colors as RGB
3. Each RGB -> converted to CIELAB using `color-convert`
4. For each extracted color, compute CIEDE2000 distance (`delta-e`) against every color in each brand dataset
5. Return the closest match per brand + closest Pantone
6. Display all matches on screen

## Why Static JSON for Paint Colors?

Paint brand palettes are read-only reference data (~10K-15K colors total). JSON files are faster to query in-memory, simpler to maintain, and don't add database load.

## Auth Flow

- Sign up / login via Supabase Auth (email + password)
- Middleware checks auth on protected routes (/dashboard, /api/palettes)
- Unauthenticated users can upload + extract but cannot save palettes

## File Structure

```
swatch/
+-- src/
|   +-- app/
|   |   +-- layout.tsx
|   |   +-- page.tsx
|   |   +-- login/page.tsx
|   |   +-- dashboard/page.tsx
|   |   +-- api/
|   |       +-- extract/route.ts
|   |       +-- match/route.ts
|   |       +-- palettes/route.ts
|   +-- components/
|   |   +-- ImageUploader.tsx
|   |   +-- PaletteDisplay.tsx
|   |   +-- ColorCard.tsx
|   |   +-- BrandMatch.tsx
|   |   +-- Navbar.tsx
|   |   +-- AuthForm.tsx
|   +-- data/
|   |   +-- sherwin-williams.json
|   |   +-- benjamin-moore.json
|   |   +-- behr.json
|   |   +-- ppg.json
|   |   +-- valspar.json
|   |   +-- pantone.json
|   +-- lib/
|   |   +-- supabase/
|   |   |   +-- client.ts
|   |   |   +-- server.ts
|   |   |   +-- middleware.ts
|   |   +-- color-extraction.ts
|   |   +-- color-matching.ts
|   |   +-- color-convert.ts
|   +-- types/
|       +-- index.ts
```
