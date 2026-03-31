# Swatch — Technical Resource Document

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js (App Router) | 15.x | Default stack, SSR + API routes |
| Styling | Tailwind CSS | 4.x | Rapid UI development |
| Backend/Auth | Supabase | — | Auth, Postgres, provisioned (ref: mrprconszvityzpqdoqj) |
| Deployment | Vercel | — | Seamless Next.js deploys |
| Language | TypeScript | 5.x | Type safety |
| Color extraction | node-vibrant | 4.x | Accurate dominant color extraction, runs server-side |
| Color matching | delta-e | — | CIEDE2000 perceptual color distance |
| Color conversion | color-convert | — | RGB <-> LAB <-> HSL conversions |

## Third-Party Services

- **Supabase** — Auth + Postgres database. Project ref: mrprconszvityzpqdoqj
- **Vercel** — Deployment and hosting
- No external color APIs — all matching done locally against bundled color datasets

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase access |

## Key Libraries

| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Supabase client |
| `@supabase/ssr` | Supabase server-side auth helpers |
| `node-vibrant` | Extract dominant colors from images |
| `delta-e` | CIEDE2000 color distance calculation |
| `color-convert` | Color space conversions (RGB -> LAB) |
| `react-dropzone` | Drag-and-drop file upload |

## Development Setup

1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in Supabase keys
4. `npm run dev` — runs on http://localhost:3000
