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
