import skills from '../data/skills.json';
import { Skill, ALL_CATEGORIES, CATEGORY_META, Category } from '../data/types';
import { skillCard } from './skill-card';

const allSkills = skills as Skill[];

function getCategoryCount(cat: Category): number {
  return allSkills.filter((s) => s.category === cat).length;
}

export function homePage(): string {
  const featured = allSkills.filter((s) => s.featured);

  const featuredCards = featured.map((s) => skillCard(s)).join('');

  const categoryCards = ALL_CATEGORIES.map((cat, i) => {
    const meta = CATEGORY_META[cat];
    const count = getCategoryCount(cat);
    const isLast = i === ALL_CATEGORIES.length - 1;
    return `
      <a href="#/browse?category=${cat}" class="card card-hover p-5 text-center no-underline text-inherit cursor-pointer${isLast ? ' col-span-2 sm:col-span-1' : ''}">
        <div class="text-3xl mb-2" style="color: ${meta.color};">${meta.icon}</div>
        <h3 class="font-semibold text-text-primary mb-1">${meta.label}</h3>
        <p class="text-sm text-text-secondary">${count} skill${count !== 1 ? 's' : ''}</p>
      </a>
    `;
  }).join('');

  return `
    ${nav()}

    <!-- Hero -->
    <section id="main" class="pt-20 pb-16 px-4 text-center">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">Claude Code Skills</h1>
        <p class="text-lg text-text-secondary mb-3 max-w-xl mx-auto">One command to teach Claude Code a new workflow.</p>
        <p class="text-sm text-text-secondary mb-8 max-w-md mx-auto">Deploy with <code class="code-pill">/shipit</code>, review with <code class="code-pill">/roast</code>, plan with <code class="code-pill">/kickoff</code> — 28 skills and counting.</p>
        <div class="max-w-lg mx-auto">
          <input type="text" id="hero-search" placeholder="Search skills... (e.g. deploy, refactor, test)"
            class="search-input text-center" autocomplete="off" aria-label="Search skills">
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="pb-12 px-4">
      <div class="flex items-center justify-center gap-6 text-sm text-text-secondary">
        <span class="font-medium">${allSkills.length} skills</span>
        <span class="w-1 h-1 rounded-full bg-border"></span>
        <span class="font-medium">${ALL_CATEGORIES.length} categories</span>
        <span class="w-1 h-1 rounded-full bg-border"></span>
        <span class="font-medium">Open source</span>
      </div>
    </section>

    <!-- Featured Skills -->
    <section class="pb-16 px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-semibold text-text-primary mb-6 text-center">Featured Skills</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          ${featuredCards}
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="pb-16 px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-semibold text-text-primary mb-6 text-center">Browse by Category</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          ${categoryCards}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pb-20 px-4 text-center">
      <div class="max-w-xl mx-auto card p-8">
        <h2 class="text-2xl font-semibold text-text-primary mb-3">Built a skill? Share it.</h2>
        <p class="text-text-secondary mb-6">Add your own skills to the catalog. All it takes is a pull request.</p>
        <a href="#/submit" class="btn-primary inline-block">Add yours</a>
      </div>
    </section>

    ${footer()}
  `;
}

export function nav(): string {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const path = hash.slice(1).split('?')[0] || '/';

  function linkClass(route: string): string {
    const isActive = path === route || (route === '/browse' && path.startsWith('/skill/'));
    return `text-sm transition-colors no-underline ${isActive ? 'text-text-primary font-medium' : 'text-text-secondary hover:text-text-primary'}`;
  }

  return `
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-button">Skip to content</a>
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#/" class="flex items-center gap-2 no-underline">
          <span class="text-lg font-bold text-text-primary tracking-tight">Skills</span>
          <span class="code-pill text-xs">for Claude Code</span>
        </a>
        <div class="hidden sm:flex items-center gap-6">
          <a href="#/browse" class="${linkClass('/browse')}">Browse</a>
          <a href="#/submit" class="${linkClass('/submit')}">Submit</a>
          <a href="#/about" class="${linkClass('/about')}">About</a>
        </div>
        <button id="mobile-menu-btn" class="sm:hidden p-2 -mr-2 text-text-secondary" aria-label="Menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/>
          </svg>
        </button>
      </div>
      <div id="mobile-menu" class="hidden sm:hidden border-t border-border bg-white px-4 pb-3">
        <a href="#/browse" class="block py-2 ${linkClass('/browse')}">Browse</a>
        <a href="#/submit" class="block py-2 ${linkClass('/submit')}">Submit</a>
        <a href="#/about" class="block py-2 ${linkClass('/about')}">About</a>
      </div>
    </nav>
  `;
}

export function footer(): string {
  return `
    <footer class="border-t border-border py-8 px-4 mt-8">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        <p>Built by <a href="https://zhihuang.dev" target="_blank" rel="noopener" class="text-accent-blue hover:underline">Z Huang</a></p>
        <div class="flex items-center gap-4">
          <a href="https://github.com/Joshli316/Skill-Marketplace" target="_blank" rel="noopener" class="hover:text-text-primary transition-colors no-underline">GitHub</a>
          <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener" class="hover:text-text-primary transition-colors no-underline">Claude Code Docs</a>
        </div>
      </div>
    </footer>
  `;
}
