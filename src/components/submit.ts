import { nav, footer } from './home';
import { escapeHtml } from '../utils';

export function submitPage(): string {
  return `
    ${nav()}

    <section id="main" class="max-w-3xl mx-auto px-4 pt-8 pb-16">
      <h1 class="text-3xl font-bold text-text-primary mb-4">Submit a Skill</h1>
      <p class="text-lg text-text-secondary mb-8">Got a Claude Code skill worth sharing? Add it to the catalog in four steps.</p>

      <!-- Steps -->
      <div class="space-y-6 mb-10">
        <div class="card p-5">
          <h3 class="font-semibold text-text-primary mb-2">1. Fork the repository</h3>
          <p class="text-sm text-text-secondary">Fork <a href="https://github.com/Joshli316/Skill-Marketplace" target="_blank" rel="noopener" class="text-accent-blue hover:underline">Joshli316/Skill-Marketplace</a> on GitHub.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold text-text-primary mb-2">2. Add your skill JSON entry</h3>
          <p class="text-sm text-text-secondary mb-3">Add an entry to <code class="code-pill">src/data/skills.json</code> following this template:</p>
          <div class="relative">
            <pre class="code-block text-xs">${escapeHtml(JSON.stringify({
              slug: "my-skill",
              name: "My Skill",
              tagline: "One-line description of what it does",
              description: "Detailed description of when and how to use this skill.",
              category: "utility",
              author: "Your Name",
              authorGithub: "your-github-username",
              triggers: ["trigger phrase 1", "trigger phrase 2"],
              example: "/my-skill → does something useful",
              install: "mkdir -p ~/.claude/skills/my-skill && curl -sL https://raw.githubusercontent.com/Joshli316/Skill-Marketplace/main/skills/my-skill/skill.md -o ~/.claude/skills/my-skill/skill.md",
              sourceUrl: "https://github.com/Joshli316/Skill-Marketplace/tree/main/skills/my-skill",
              featured: false
            }, null, 2))}</pre>
            <button class="copy-btn" data-copy="json-template">Copy</button>
          </div>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold text-text-primary mb-2">3. Add your skill markdown</h3>
          <p class="text-sm text-text-secondary mb-3">Create <code class="code-pill">skills/my-skill/skill.md</code> with this frontmatter:</p>
          <div class="relative">
            <pre class="code-block text-xs">---
name: my-skill
description: Use when [trigger scenario]. Does [what it does].
---

[Your skill prompt content here]</pre>
            <button class="copy-btn" data-copy="md-template">Copy</button>
          </div>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold text-text-primary mb-2">4. Open a pull request</h3>
          <p class="text-sm text-text-secondary">Submit a PR with your changes. Include a brief description of what your skill does and why it's useful.</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <a href="https://github.com/Joshli316/Skill-Marketplace/compare" target="_blank" rel="noopener"
          class="btn-primary inline-flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          Open a PR
        </a>
      </div>
    </section>

    ${footer()}
  `;
}

