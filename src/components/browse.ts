import skills from '../data/skills.json';
import { Skill, ALL_CATEGORIES, CATEGORY_META, Category } from '../data/types';
import { skillCard } from './skill-card';
import { categoryFilterPill } from './category-pill';
import { searchSkills, filterByCategory, sortSkills } from '../search';
import { getQueryParams } from '../router';
import { nav, footer } from './home';
import { escapeAttr } from '../utils';

const allSkills = skills as Skill[];

export function browsePage(): string {
  const params = getQueryParams();
  const query = params.get('q') || '';
  const activeCategory = params.get('category') || 'all';
  const sort = (params.get('sort') as 'az' | 'recent') || 'az';

  let filtered = filterByCategory(allSkills, activeCategory);
  filtered = searchSkills(filtered, query);
  filtered = sortSkills(filtered, sort);

  const filterPills = [
    categoryFilterPill('all', 'All', activeCategory === 'all'),
    ...ALL_CATEGORIES.map((cat) =>
      categoryFilterPill(cat, CATEGORY_META[cat].label, activeCategory === cat),
    ),
  ].join('');

  const cards = filtered.length > 0
    ? filtered.map((s) => skillCard(s)).join('')
    : `<div class="col-span-full text-center py-16">
        <p class="text-lg text-text-primary mb-2">No matches</p>
        <p class="text-text-secondary mb-6">Try a different search term or category.</p>
        <button id="clear-filters" class="btn-secondary">Show all skills</button>
      </div>`;

  return `
    ${nav()}

    <section id="main" class="pt-8 pb-4 px-4">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-text-primary mb-6">Browse Skills</h1>

        <!-- Search -->
        <div class="mb-6" role="search">
          <input type="text" id="browse-search" placeholder="Search by name, description, or trigger..."
            class="search-input" value="${escapeAttr(query)}" autocomplete="off" aria-label="Search skills">
        </div>

        <!-- Filters row -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1" id="category-filters" role="group" aria-label="Filter by category">
            ${filterPills}
          </div>
          <div class="flex items-center gap-2 sm:ml-auto shrink-0" role="group" aria-label="Sort order">
            <button data-sort="az" aria-pressed="${sort === 'az'}" class="text-sm px-3 py-1 rounded-button transition-colors ${sort === 'az' ? 'bg-text-primary text-white' : 'text-text-secondary hover:bg-gray-100'}">A–Z</button>
            <button data-sort="recent" aria-pressed="${sort === 'recent'}" class="text-sm px-3 py-1 rounded-button transition-colors ${sort === 'recent' ? 'bg-text-primary text-white' : 'text-text-secondary hover:bg-gray-100'}">Recent</button>
          </div>
        </div>

        <!-- Results count -->
        <p class="text-sm text-text-secondary mb-4" aria-live="polite">${filtered.length} skill${filtered.length !== 1 ? 's' : ''}</p>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          ${cards}
        </div>
      </div>
    </section>

    ${footer()}
  `;
}

