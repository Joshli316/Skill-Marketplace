# Design Spec: Claude Code Skill Marketplace

## Overview

A static discovery site where Claude Code users browse, search, and install community skills. Built as a TypeScript/HTML SPA on Cloudflare Pages. Skills stored as JSON in the repo. Community contributions via GitHub PRs. Clean Storefront aesthetic — light, approachable, card-based.

This is project #5 on Z's 2026 roadmap. Seeded with Z's 28 custom skills, open for community submissions from day one.

## Architecture

```
User visits site
    |
Static SPA (TypeScript/HTML, Cloudflare Pages)
    |
Skills data (JSON array, bundled at build time)
    |
Client-side search + filter
```

No backend. No auth. No database. Just HTML, TypeScript, and JSON.

## Pages

### Home (`#/`)
- Hero: headline ("Claude Code Skills"), subtitle, search bar front and center
- Stats bar: skill count, category count, "Open source"
- Featured skills: 3-4 hand-picked skill cards in a grid
- Category grid: 7 category cards with icon, name, skill count — click to filter browse page
- CTA: "Submit your skill" button linking to /submit

### Browse (`#/browse`)
- Top bar: search input + category filter pills (all | workflow | quality | design | content | deploy | learning | utility)
- Sort: most recent / alphabetical
- Skill cards grid: name, tagline, category pill, author, trigger phrases preview
- Click card → skill detail page

### Skill Detail (`#/skill/:slug`)
- Header: name, tagline, category pill, author with GitHub link
- Sections:
  - What it does (full description)
  - Trigger phrases (list)
  - Example usage (formatted)
  - How to install (step-by-step)
  - View source (link to GitHub)
- Back to browse link
- Prev/Next skill navigation

### Submit (`#/submit`)
- Short explanation of what a skill is
- Link to CONTRIBUTING.md on GitHub
- Skill template (JSON format + markdown format)
- "Open a PR" button linking to GitHub new PR

### About (`#/about`)
- What this is, who made it
- Link to Claude Code docs

## Skill Data Model

Each skill in `src/data/skills.json`:

```json
{
  "slug": "kickoff",
  "name": "Kickoff",
  "tagline": "Plan now, build later",
  "description": "Runs a planning-only session that produces CLAUDE.md, a plan file, and a ready-to-paste build prompt for session 2.",
  "category": "workflow",
  "author": "Z Huang",
  "authorGithub": "Joshli316",
  "triggers": ["kickoff", "new project", "start a project", "plan a feature"],
  "example": "/kickoff → asks clarifying questions → writes CLAUDE.md + plan.md + build prompt",
  "install": "Copy skill.md to ~/.claude/skills/kickoff/skill.md",
  "sourceUrl": "https://github.com/Joshli316/Skill-Marketplace/tree/main/skills/kickoff",
  "featured": true
}
```

## Categories (7)

| Category | Description | Examples |
|----------|-------------|---------|
| `workflow` | Build pipelines, planning, session management | /kickoff, /build, /resume |
| `quality` | Testing, review, verification | /verify, /roast, /review, /expert-panel |
| `design` | UI/UX, frontend, design matching | /frontend-design, /design-match, /ui-ux-pro-max |
| `content` | Research, scraping, translation | /research, /scrape, /translate |
| `deploy` | Shipping, CI/CD | /shipit, /checkpoint |
| `learning` | Tutorials, showcases, documentation | /learn, /showcase, /brief |
| `utility` | General-purpose tools | /refactor, /google-forms, /playwright-cli |

## Design Spec

### Color Palette
- **Background:** `#f8f9fb` (warm off-white)
- **Surface:** `#ffffff` (pure white cards)
- **Border:** `#e2e5ea` (light gray dividers)
- **Primary text:** `#1a1d23` (near-black)
- **Secondary text:** `#6b7280` (medium gray)
- **Accent blue:** `#3b82f6` (links, buttons, active states)
- **Accent green:** `#10b981` (install/success indicators)
- **Accent purple:** `#8b5cf6` (category badges)
- **Accent amber:** `#f59e0b` (featured badges)
- **Code background:** `#f1f3f5` (light gray code blocks)

### Typography
- **Font family:** `Inter` (primary), `JetBrains Mono` (code/triggers only)
- **H1:** 2.5rem (40px) / bold
- **H2:** 1.75rem (28px) / semibold
- **H3:** 1.25rem (20px) / semibold
- **Body:** 1rem (16px) / regular
- **Small/meta:** 0.875rem (14px) / regular
- **Code inline:** 0.9em / JetBrains Mono with `#f1f3f5` bg pill

### Component Style
- **Cards:** `background: #fff`, `border: 1px solid #e2e5ea`, `border-radius: 12px`, `box-shadow: 0 1px 3px rgba(0,0,0,0.06)`
- **Buttons:** `border-radius: 8px`, `padding: 8px 16px`, blue fill for primary, white border for secondary
- **Category pills:** `border-radius: 9999px`, `padding: 4px 12px`, colored bg at 10% opacity with matching text
- **Code blocks:** `background: #f1f3f5`, `border-radius: 8px`, `padding: 12px`, JetBrains Mono
- **Search bar:** Large, centered, `border-radius: 12px`, `border: 2px solid #e2e5ea`, focus → `border-color: #3b82f6`

### Micro-interactions
- **Card hover:** lift with `box-shadow: 0 4px 12px rgba(0,0,0,0.1)`, `transform: translateY(-2px)`, `transition: all 200ms ease`
- **Button hover:** darken 10%, `transition: background 150ms ease`
- **Category pill hover:** increase bg opacity, `transition: 150ms ease`
- **Search focus:** border color transition, subtle glow `box-shadow: 0 0 0 3px rgba(59,130,246,0.15)`
- **Link hover:** underline, `transition: 150ms ease`

## Data Source: Initial Skills

Seeded from Z's 28 custom skills at `~/.claude/skills/`. Each skill's `skill.md` frontmatter (name, description) plus manual categorization provides the initial catalog. Community contributions add new entries via GitHub PRs to the `skills/` directory in the repo.

## Contribution Flow

1. Contributor reads CONTRIBUTING.md
2. Adds a new JSON entry to `src/data/skills.json`
3. Adds their skill's markdown file to `skills/<skill-name>/skill.md`
4. Opens a GitHub PR
5. Z reviews and merges
6. Site redeploys automatically via Cloudflare Pages

## Success Criteria

1. Site loads fast — all data bundled, no API calls
2. Search finds skills by name, description, trigger phrase, or category
3. All 28 initial skills are browsable with accurate descriptions
4. Install instructions are copy-pasteable
5. A stranger can submit a new skill by following CONTRIBUTING.md
6. Responsive at 375px, 768px, 1024px
