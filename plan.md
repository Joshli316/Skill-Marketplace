# Implementation Plan: Claude Code Skill Marketplace

## Overview
A static discovery site where Claude Code users browse, search, and install community skills. TypeScript/HTML SPA on Cloudflare Pages. Clean Storefront design — light, card-based, approachable. Seeded with Z's 28 custom skills, open for GitHub PR contributions.

## Design Spec
See `docs/superpowers/specs/2026-04-05-skill-marketplace-design.md` for full architecture, data model, color palette, typography, and component styles.

## Steps

### Step 1: Project scaffold
- Initialize `package.json` with esbuild, tailwind, typescript, wrangler
- Create `tsconfig.json`, `esbuild.config.ts`, `tailwind.config.ts`
- Create `index.html` shell with font imports (Inter + JetBrains Mono from Google Fonts)
- Set up `src/main.ts` entry point
- Verify: `npm run build` produces `dist/index.html`

### Step 2: Core layout and routing
- Build hash-based router (`#/`, `#/browse`, `#/skill/:slug`, `#/submit`, `#/about`)
- Create shared layout: top nav bar (logo/site name, nav links: Browse, Submit, About), main content area, footer
- Top nav: site name links to home, nav links on right, responsive hamburger on mobile
- Verify: navigating between routes swaps content area

### Step 3: Skills data
- Create `src/data/skills.json` with all skills
- Read each of the 28 skill files from `~/.claude/skills/*/skill.md`, extract name, description, and triggers from frontmatter
- Curate: skip skills that don't make sense publicly (HARNESS, cli-anything variants)
- Manually add category, tagline, example, install instructions for each skill
- Define TypeScript interface: `Skill { slug, name, tagline, description, category, author, authorGithub, triggers, example, install, sourceUrl, featured }`
- Verify: import skills.json, confirm correct count and all fields populated

### Step 4: Home page
- Hero section: headline "Claude Code Skills", subtitle "Find, install, and share skills for Claude Code", large centered search bar
- Stats bar: "[N] skills | 7 categories | Open source"
- Featured skills grid: 3-4 cards marked `featured: true` in skills.json
- Category grid: 7 cards (workflow, quality, design, content, deploy, learning, utility) with skill count per category, click navigates to `#/browse?category=X`
- CTA section: "Built a skill? Share it." + button linking to #/submit
- Verify: home page renders, featured cards link to skill detail, category cards link to filtered browse

### Step 5: Skill card component
- Reusable card showing: name, tagline, category pill (colored by category), author name, first 2-3 trigger phrases as code pills
- Card hover: lift effect per design spec
- Click entire card → navigate to `#/skill/:slug`
- Category pill colors:
  - workflow → purple (`#8b5cf6`)
  - quality → green (`#10b981`)
  - design → blue (`#3b82f6`)
  - content → amber (`#f59e0b`)
  - deploy → red (`#ef4444`)
  - learning → cyan (`#06b6d4`)
  - utility → gray (`#6b7280`)
- Verify: card renders correctly with all fields, hover effect works

### Step 6: Browse page
- Search input at top (same style as home hero search)
- Category filter pills: "All" + 7 category pills, horizontally scrollable on mobile
- Skill cards grid: responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Sort toggle: "Recent" / "A-Z"
- Support URL params: `#/browse?category=workflow&q=deploy`
- Empty state: "No skills match your search" with clear filters link
- Verify: search filters by name/description/triggers, category pills filter correctly, grid is responsive

### Step 7: Search
- Client-side search over skill name, tagline, description, and triggers
- Instant filter as user types
- Shared between home page search bar and browse page search bar (home search navigates to browse with query param)
- Highlight matching text in results (optional, skip if complex)
- Verify: typing "deploy" surfaces /shipit and /checkpoint; typing "test" surfaces /verify and /test-feature

### Step 8: Skill detail page
- Header: skill name (h1), tagline, category pill, author name with GitHub link
- Section: "What it does" — full description
- Section: "Triggers" — list of trigger phrases as code pills
- Section: "Example" — formatted example usage in a code block
- Section: "How to install" — step-by-step install instructions in a code block with copy button
- Section: "View source" — link to GitHub source file
- Back to browse link at top
- Prev/Next skill navigation at bottom
- Verify: all sections render, copy button works, prev/next navigates correctly

### Step 9: Submit page
- Brief explanation: "What is a Claude Code skill?" (2-3 sentences)
- Step-by-step contribution guide:
  1. Fork the repo
  2. Add your skill's JSON entry to `src/data/skills.json`
  3. Add your skill's markdown to `skills/<name>/skill.md`
  4. Open a PR
- Skill JSON template (copyable code block)
- Skill markdown template (copyable code block)
- "Open a PR" button linking to GitHub new PR page
- Verify: templates are accurate, GitHub link works

### Step 10: About page
- What this site is (2-3 sentences)
- Who made it (Z Huang, link to portfolio)
- Link to Claude Code docs
- Link to GitHub repo
- Verify: all links work

### Step 11: CONTRIBUTING.md
- Detailed instructions for submitting a skill via PR
- JSON schema for skill entries
- Skill markdown format (frontmatter fields)
- Quality bar: what makes a good skill (clear triggers, useful description, tested)
- Verify: a stranger could follow these instructions and submit a valid PR

### Step 12: OG image and meta tags
- Create OG image (1200x630) with Skill Marketplace branding
- Add meta tags: title, description, og:image, twitter:card
- Verify: social preview looks correct

### Step 13: Final QA and deploy prep
- Test responsive layout at 375px, 768px, 1024px
- Test search and filter across all pages
- Test all skill detail pages render correctly
- Lighthouse audit (aim for 90+ performance, 100 accessibility)
- Verify: `wrangler pages deploy dist/` succeeds

## Files to Create/Modify
- `index.html` — HTML shell, font imports, mount point
- `package.json` — dependencies, build/dev scripts
- `tsconfig.json` — TypeScript config
- `esbuild.config.ts` — build pipeline
- `tailwind.config.ts` — theme colors, fonts, spacing
- `src/main.ts` — app entry, router init
- `src/router.ts` — hash-based router
- `src/search.ts` — client-side search logic
- `src/data/skills.json` — all skill data
- `src/data/types.ts` — Skill interface
- `src/components/home.ts` — home page
- `src/components/browse.ts` — browse page with search + filter
- `src/components/skill-detail.ts` — single skill view
- `src/components/submit.ts` — contribution guide
- `src/components/about.ts` — about page
- `src/components/skill-card.ts` — reusable card component
- `src/components/category-pill.ts` — category badge component
- `src/styles/main.css` — Tailwind directives + custom theme
- `CONTRIBUTING.md` — how to submit a skill
- `public/og-image.png` — social preview image

## Open Questions
- Which of the 28 skills to exclude from public listing (HARNESS, cli-anything variants likely excluded) — decide during Step 3.
