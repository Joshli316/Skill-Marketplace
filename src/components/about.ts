import { nav, footer } from './home';

export function aboutPage(): string {
  return `
    ${nav()}

    <section id="main" class="max-w-3xl mx-auto px-4 pt-8 pb-16">
      <h1 class="text-3xl font-bold text-text-primary mb-6">About</h1>

      <div class="space-y-6">
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-text-primary mb-3">What is this?</h2>
          <p class="text-text-secondary leading-relaxed mb-3">
            Skills are markdown files that teach Claude Code new workflows. Each one is a recipe: tell Claude to <code class="code-pill">/deploy</code> and it runs a 15-check audit before pushing to production. Tell it to <code class="code-pill">/roast</code> and 10 engineering personas grade your code.
          </p>
          <p class="text-text-secondary leading-relaxed">
            This catalog has 28 skills and accepts new ones via GitHub pull requests.
          </p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-semibold text-text-primary mb-3">How to install a skill</h2>
          <p class="text-text-secondary leading-relaxed mb-3">
            Each skill page has a one-line install command. Paste it in your terminal. The skill works in Claude Code right away. Skills live in <code class="code-pill">~/.claude/skills/</code>.
          </p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-semibold text-text-primary mb-3">Who made this?</h2>
          <p class="text-text-secondary leading-relaxed">
            Built by <a href="https://zhihuang.dev" target="_blank" rel="noopener" class="text-accent-blue hover:underline">Z Huang</a>.
            This site and every skill in it were built with Claude Code.
          </p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-semibold text-text-primary mb-3">Links</h2>
          <ul class="space-y-2">
            <li><a href="https://github.com/Joshli316/Skill-Marketplace" target="_blank" rel="noopener" class="text-accent-blue hover:underline">GitHub Repository</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener" class="text-accent-blue hover:underline">Claude Code Documentation</a></li>
            <li><a href="#/submit" class="text-accent-blue hover:underline">Submit a Skill</a></li>
          </ul>
        </div>
      </div>
    </section>

    ${footer()}
  `;
}
