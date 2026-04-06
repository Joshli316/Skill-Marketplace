# Contributing a Skill

Thanks for sharing your Claude Code skill with the community! Follow these steps to submit yours.

## What is a skill?

A skill is a markdown file that teaches Claude Code a new workflow. When a user types a trigger phrase (like `/deploy` or `refactor this code`), Claude loads the skill and follows its instructions. Skills live in `~/.claude/skills/<skill-name>/skill.md`.

## How to submit

### 1. Fork this repository

Fork [Joshli316/Skill-Marketplace](https://github.com/Joshli316/Skill-Marketplace) on GitHub.

### 2. Add your skill markdown

Create a file at `skills/<your-skill-name>/skill.md` with this format:

```markdown
---
name: your-skill-name
description: Use when [trigger scenario] — [what it does]. Triggers on "phrase1", "phrase2", "phrase3".
---

[Your skill prompt content here. This is what Claude Code reads and follows.]
```

**Frontmatter fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Lowercase, hyphenated skill name (e.g. `my-skill`) |
| `description` | Yes | One sentence: when to use + what it does + trigger phrases |

### 3. Add your skill to the data file

Add a JSON entry to `src/data/skills.json`:

```json
{
  "slug": "your-skill-name",
  "name": "Your Skill Name",
  "tagline": "Short, punchy description (under 60 chars)",
  "description": "Detailed description of what the skill does, when to use it, and what it produces.",
  "category": "utility",
  "author": "Your Name",
  "authorGithub": "your-github-username",
  "triggers": ["trigger phrase 1", "trigger phrase 2", "trigger phrase 3"],
  "example": "/your-skill → does X → produces Y",
  "install": "mkdir -p ~/.claude/skills/your-skill-name && curl -sL https://raw.githubusercontent.com/Joshli316/Skill-Marketplace/main/skills/your-skill-name/skill.md -o ~/.claude/skills/your-skill-name/skill.md",
  "sourceUrl": "https://github.com/Joshli316/Skill-Marketplace/tree/main/skills/your-skill-name",
  "featured": false
}
```

**Categories:** `workflow`, `quality`, `design`, `content`, `deploy`, `learning`, `utility`

### 4. Open a pull request

Push your branch and [open a PR](https://github.com/Joshli316/Skill-Marketplace/compare). Include:

- What your skill does (1-2 sentences)
- A real example of using it
- Whether you've tested it in Claude Code

## What makes a good skill

- **Clear triggers** — Users should know exactly when it activates
- **Useful description** — The `description` field in frontmatter is what Claude uses to decide relevance
- **Tested** — Run your skill in Claude Code before submitting
- **Focused** — One skill, one job. Don't bundle multiple workflows
- **Documented** — Include an example that shows input → output

## Review process

PRs are reviewed by the maintainer. Common reasons for requesting changes:

- Missing or vague trigger phrases
- Skill overlaps significantly with an existing one
- Description doesn't match what the skill actually does
- Untested or broken skill logic
