# Skill Marketplace

Discovery site for Claude Code community skills — browse, search, and install. Seeded with 28 skills, open for community contributions via GitHub PRs.

## Tech Stack
TypeScript/HTML SPA on Cloudflare Pages. Esbuild bundler. Tailwind CSS v4. No framework — vanilla TypeScript with hash-based routing.

## Structure
```
Skill-Marketplace/
  index.html              # Entry point
  src/
    main.ts               # App entry, router
    router.ts             # Hash-based routing
    search.ts             # Client-side search/filter
    data/
      skills.json         # All skill data (bundled at build time)
    components/
      home.ts             # Home page: hero, featured, categories
      browse.ts           # Browse page: search, filter, card grid
      skill-detail.ts     # Single skill page
      submit.ts           # Contribution instructions
      about.ts            # About page
      skill-card.ts       # Reusable skill card component
      category-pill.ts    # Category badge component
    styles/
      main.css            # Tailwind directives + custom theme
  skills/                 # Source skill markdown files (for contributors)
  public/
    og-image.png          # Social preview
  dist/                   # Build output
  CONTRIBUTING.md         # How to submit a skill
  esbuild.config.ts       # Build config
```

## Entry Point
index.html

## Build
`npm run build` → esbuild bundles to dist/

## Deployment
`wrangler pages deploy dist/`

## Conventions
- Clean Storefront aesthetic: light bg, Inter font, rounded cards, blue accent.
- JetBrains Mono for code/triggers only.
- Skills data is a JSON array bundled at build time — no API calls.
- Search and filter are client-side, instant.
- Community contributions via GitHub PRs to skills/ directory.
- Mobile-first responsive layout.
- No backend, no accounts, no tracking.
- Bilingual not required for this project (English only).
