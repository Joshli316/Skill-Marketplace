import skills from '../data/skills.json';
import { Skill } from '../data/types';
import { categoryPill } from './category-pill';
import { nav, footer } from './home';

const allSkills = skills as Skill[];

export function skillDetailPage(params: Record<string, string>): string {
  const slug = params.slug;
  const skill = allSkills.find((s) => s.slug === slug);

  if (!skill) {
    return `
      ${nav()}
      <div class="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 class="text-3xl font-bold mb-4">Skill not found</h1>
        <p class="text-text-secondary mb-6">The skill "${escapeHtml(slug)}" doesn't exist.</p>
        <a href="#/browse" class="btn-primary inline-block">Browse Skills</a>
      </div>
      ${footer()}
    `;
  }

  const idx = allSkills.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? allSkills[idx - 1] : null;
  const next = idx < allSkills.length - 1 ? allSkills[idx + 1] : null;

  const triggers = skill.triggers
    .map((t) => `<span class="code-pill">${escapeHtml(t)}</span>`)
    .join('');

  return `
    ${nav()}

    <article class="max-w-3xl mx-auto px-4 pt-8 pb-16">
      <!-- Back link -->
      <a href="#/browse" class="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent-blue mb-6 no-underline transition-colors">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 12L6 8l4-4"/></svg>
        Back to Browse
      </a>

      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-start gap-3 mb-3">
          <h1 class="text-3xl font-bold text-text-primary">${escapeHtml(skill.name)}</h1>
          ${categoryPill(skill.category, 'md')}
        </div>
        <p class="text-lg text-text-secondary mb-2">${escapeHtml(skill.tagline)}</p>
        <p class="text-sm text-text-secondary">
          by <a href="https://github.com/${escapeHtml(skill.authorGithub)}" target="_blank" rel="noopener"
            class="text-accent-blue hover:underline">${escapeHtml(skill.author)}</a>
        </p>
      </header>

      <!-- What it does -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-text-primary mb-3">What it does</h2>
        <p class="text-text-secondary leading-relaxed">${escapeHtml(skill.description)}</p>
      </section>

      <!-- Triggers -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-text-primary mb-3">Triggers</h2>
        <div class="flex flex-wrap gap-2">${triggers}</div>
      </section>

      <!-- Example -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-text-primary mb-3">Example</h2>
        <div class="code-block whitespace-pre-wrap">${escapeHtml(skill.example)}</div>
      </section>

      <!-- Install -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-text-primary mb-3">How to install</h2>
        <div class="relative">
          <pre class="code-block whitespace-pre-wrap">${escapeHtml(skill.install)}</pre>
          <button class="copy-btn" data-copy="${escapeAttr(skill.install)}">Copy</button>
        </div>
      </section>

      <!-- Source -->
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-text-primary mb-3">Source</h2>
        <a href="${skill.sourceUrl}" target="_blank" rel="noopener"
          class="inline-flex items-center gap-2 text-accent-blue hover:underline">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          View on GitHub
        </a>
      </section>

      <!-- Prev/Next -->
      <nav class="flex items-center justify-between border-t border-border pt-6">
        ${prev
          ? `<a href="#/skill/${prev.slug}" class="text-sm text-text-secondary hover:text-accent-blue no-underline transition-colors">
              ← ${escapeHtml(prev.name)}
            </a>`
          : '<span></span>'}
        ${next
          ? `<a href="#/skill/${next.slug}" class="text-sm text-text-secondary hover:text-accent-blue no-underline transition-colors">
              ${escapeHtml(next.name)} →
            </a>`
          : '<span></span>'}
      </nav>
    </article>

    ${footer()}
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str: string): string {
  return str.replace(/"/g, '&quot;').replace(/\\/g, '\\\\').replace(/\n/g, '\\n');
}
