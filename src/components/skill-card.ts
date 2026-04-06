import { Skill } from '../data/types';
import { categoryPill } from './category-pill';

export function skillCard(skill: Skill): string {
  const triggers = skill.triggers
    .slice(0, 3)
    .map((t) => `<span class="code-pill">${escapeHtml(t)}</span>`)
    .join('');

  return `
    <a href="#/skill/${skill.slug}" class="card card-hover block p-5 cursor-pointer no-underline text-inherit">
      <div class="flex items-start justify-between gap-3 mb-3">
        <h3 class="text-lg font-semibold text-text-primary leading-tight">${escapeHtml(skill.name)}</h3>
        ${categoryPill(skill.category)}
      </div>
      <p class="text-sm text-text-secondary mb-4 line-clamp-2">${escapeHtml(skill.tagline)}</p>
      <div class="flex flex-wrap gap-1.5 mb-3">${triggers}</div>
      <p class="text-xs text-text-secondary">by ${escapeHtml(skill.author)}</p>
    </a>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
