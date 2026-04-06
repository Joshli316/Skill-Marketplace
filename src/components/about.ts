import { nav, footer } from './home';

export function aboutPage(): string {
  return `
    ${nav()}

    <section class="max-w-3xl mx-auto px-4 pt-8 pb-16">
      <h1 class="text-3xl font-bold text-text-primary mb-6">About</h1>

      <div class="space-y-6">
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-text-primary mb-3">What is this?</h2>
          <p class="text-text-secondary leading-relaxed mb-3">
            Claude Code Skills is a discovery site for community-built skills — reusable prompt templates that teach Claude Code new workflows. Think of skills as recipes: each one gives Claude a specific capability, from deploying apps to running multi-round design reviews.
          </p>
          <p class="text-text-secondary leading-relaxed">
            This site is seeded with 28 skills and open for anyone to contribute more via GitHub pull requests.
          </p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-semibold text-text-primary mb-3">How to install a skill</h2>
          <p class="text-text-secondary leading-relaxed mb-3">
            Each skill page has a one-line install command. Run it in your terminal and the skill will be available in Claude Code immediately. Skills are stored as markdown files in <code class="code-pill">~/.claude/skills/</code>.
          </p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-semibold text-text-primary mb-3">Who made this?</h2>
          <p class="text-text-secondary leading-relaxed">
            Built by <a href="https://zhihuang.dev" target="_blank" rel="noopener" class="text-accent-blue hover:underline">Z Huang</a>
            as part of an exploration into agentic AI workflows. The entire site — and every skill in it — was built using Claude Code.
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
