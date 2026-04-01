# Swatch — Living Postmortem

## Phase 1: INTAKE — 2026-03-31T23:10:00Z

**What happened:** User presented idea for image-to-Pantone palette tool called "color."
**What worked:** Summary was concise and confirmed quickly.
**What didn't:** Nothing — smooth intake.
**Adjustment:** User confirms fast, prefers direct communication. Keep it moving.

## Phase 2: RESEARCH — 2026-03-31T23:12:00Z

**What happened:** Comprehensive market research. Found Pantone Connect is universally hated, Coolors beloved but no Pantone, gap is clear.
**What worked:** Competitor table format was effective. Go/no-go signal gave user a clear decision point.
**What didn't:** Nothing major — research was thorough.
**Adjustment:** User pivoted the product niche based on research (from general Pantone to interior design/paint focus). Research triggered strategic thinking, which is ideal. User wants to "widen the moat" — thinks about defensibility.

## Phase 3: DEFINE — 2026-03-31T23:15:00Z

**What happened:** Scoped the product through onboarding questions. Renamed to "Swatch." Desktop-first, auth for 10 users, free, 5 major paint brands, on-screen output.
**What worked:** Batched questions worked well. User answered quickly.
**What didn't:** Nothing — user was decisive.
**Adjustment:** User is decisive and fast. Don't over-explain. They chose interior design/paint as the niche, and the name "Swatch" — shows strong product instinct. Visual inspo: @jennaisfeeling (bold, colorful, joyful, editorial).

## Phase 4: ROADMAP — 2026-03-31T23:18:00Z

**What happened:** Laid out 5 milestones from scaffold to polish.
**What worked:** Clean milestone format, identified risks upfront.
**What didn't:** Nothing.
**Adjustment:** None needed.

## Phase 5: FOUNDATION — 2026-03-31T23:20:00Z

**What happened:** Produced technical resources, system architecture, and wireframes.
**What worked:** User loved the wireframes ("luv"). Architecture decision to use static JSON for paint data is sound.
**What didn't:** Nothing.
**Adjustment:** User responds well to visual wireframes. Keep using them for alignment.

## Phase 6: SETUP — 2026-03-31T23:23:00Z

**What happened:** Scaffolding Next.js app, provisioning Supabase, setting up deployment.
**What worked:** Supabase CLI provisioning was smooth (after org switch). Email confirmation disabled via config push.
**What didn't:** Hit free project limit on first org — had to use the paid org (fiire).
**Adjustment:** Check org plan before attempting project creation.

## Phase 7: PLAN — 2026-04-01T13:00:00Z

**What happened:** Wrote build plan with 5 phases covering auth, upload, matching, save, and polish.
**What worked:** Clear phase breakdown with milestones and acceptance criteria.
**What didn't:** Nothing.
**Adjustment:** None needed.

## BUILD Phase 1-4: Core App — 2026-04-01T13:15:00Z

**What happened:** Built all core functionality in one push — auth, upload, extraction, matching, save palettes. User asked to work independently without checkpoints.
**What worked:** node-vibrant extracts accurate colors. CIEDE2000 matching produces excellent results (delta E < 3 for closest matches). Static JSON datasets for paint brands work well — fast in-memory matching. Supabase auth + RLS is clean.
**What didn't:** node-vibrant ESM import broke the build — needed `node-vibrant/node` named import. delta-e has no type declarations — needed custom .d.ts. Both fixed quickly.
**Adjustment:** For future projects: always check ESM/CJS export patterns before importing. Add .d.ts files proactively for untyped packages.

## BUILD Phase 5: Polish — 2026-04-01T13:45:00Z

**What happened:** Applied jennaisfeeling-inspired design system — cream, terracotta, sage, ochre, navy, blush. Playfair Display for headlines, Inter for body. Rounded, warm, editorial feel.
**What worked:** Custom Tailwind theme colors made the reskin fast. The warm palette feels cohesive and distinct from generic design tools.
**What didn't:** Nothing.
**Adjustment:** The design system approach (define theme colors in CSS, apply across components) scales well.

## Smoke Test — 2026-04-01T14:00:00Z

**What happened:** Tested live deployment. Landing page renders, login renders, API extract returns 6 colors, API match returns accurate brand matches.
**What worked:** Everything functional on first deploy.
**What didn't:** Haven't tested the full UI flow in a browser (upload → see palette → save). API endpoints verified via curl.
**Adjustment:** For full confidence, user should test the UI flow manually.

## REVIEW + Shop This Color — 2026-04-01T14:30:00Z

**What happened:** User rated 4/5. Asked for ideas to reach 5. Chose "Shop This Color" — direct links to paint brand product pages. Built URL generation for all 5 brands.
**What worked:** Research found reliable URL patterns for Behr (code-only), Benjamin Moore (code+name), Sherwin-Williams (code+name). PPG and Valspar used name-based or search URLs as fallback. Feature added in one commit.
**What didn't:** Nothing.
**Adjustment:** User values features that connect digital tool to real-world action (buying paint). Keep building toward the purchase funnel.

## Cycle 1 Summary

**Patterns:** User is fast, decisive, product-minded. Thinks about defensibility and moat. Prefers to work independently without frequent checkpoints. Responds well to numbered options when asked for decisions.
**User preferences:** Bold but warm design, interior design niche focus, practical features over theoretical ones, "shop this color" over "room visualizer" — action over visualization.
**Engine adjustments:** For this user, minimize checkpoints when they ask. Present decisions as numbered lists. Focus feature suggestions on actionable/practical value.
