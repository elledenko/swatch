# Swatch — Build Plan

## Phase 1: Auth + Layout Shell

**Goal:** Working auth (sign up / login / logout) with app layout.

**Tasks:**
1. Install Supabase dependencies (`@supabase/supabase-js`, `@supabase/ssr`)
2. Set up Supabase client (browser + server)
3. Set up auth middleware
4. Build login/signup page
5. Build Navbar component (logo, login/logout, dashboard link)
6. Build root layout with Navbar
7. Build dashboard page (placeholder — "Your Palettes" empty state)
8. Verify auth flow works locally

**Milestone:** User can sign up, log in, see navbar update, access dashboard, log out.

## Phase 2: Image Upload + Color Extraction

**Goal:** Upload an image and extract dominant colors.

**Tasks:**
1. Install dependencies (`react-dropzone`, `node-vibrant`)
2. Build ImageUploader component (drag & drop + file picker)
3. Build API route `POST /api/extract` — receives image, extracts 6 dominant colors via node-vibrant
4. Build PaletteDisplay component — shows extracted color swatches with hex codes
5. Wire up the landing page: upload → extract → display
6. Handle loading states and errors

**Milestone:** User uploads an image, sees 6 dominant colors displayed as swatches.

## Phase 3: Paint Brand + Pantone Matching

**Goal:** Map extracted colors to nearest paint brand and Pantone equivalents.

**Tasks:**
1. Source and compile paint color datasets (SW, BM, Behr, PPG, Valspar) as JSON
2. Source Pantone color dataset (approximation-based) as JSON
3. Install dependencies (`delta-e`, `color-convert`)
4. Build color matching engine (`lib/color-matching.ts`) — CIEDE2000 in LAB space
5. Build API route `POST /api/match` — takes RGB colors, returns nearest matches per brand
6. Build ColorCard component — shows one extracted color with all brand matches
7. Build BrandMatch component — single brand swatch with code + name
8. Wire palette display to show brand matches for each color

**Milestone:** User uploads image → sees palette → each color shows nearest SW, BM, Behr, PPG, Valspar, and Pantone match.

## Phase 4: Save Palettes + Database

**Goal:** Authenticated users can save, view, and delete palettes.

**Tasks:**
1. Create Supabase migration for `palettes` and `palette_colors` tables with RLS
2. Push migration to remote database
3. Build API route `GET/POST/DELETE /api/palettes` — CRUD operations
4. Add "Save Palette" button to palette results (prompts for name)
5. Build dashboard with saved palette cards (color strip, name, date, delete)
6. Click palette card to expand and see full brand matches

**Milestone:** User can save a palette with a name, see it on dashboard, delete it.

## Phase 5: Polish + Visual Identity

**Goal:** Apply jennaisfeeling-inspired design. Final smoke test.

**Tasks:**
1. Define color system — bold, warm, joyful palette for the UI itself
2. Typography — pick editorial-feeling fonts (serif headlines, clean body)
3. Style all components — upload zone, palette display, color cards, brand matches
4. Style auth pages — warm, inviting
5. Style dashboard — palette cards with personality
6. Add Pantone disclaimer footer ("Colors are approximations...")
7. README.md with project overview and setup instructions
8. Full smoke test of core user flow

**Milestone:** Polished, deployed app. User can upload → extract → match → save. Looks beautiful.
