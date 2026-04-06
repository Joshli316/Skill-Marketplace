import { Category, CATEGORY_META } from '../data/types';

export function categoryPill(category: Category, size: 'sm' | 'md' = 'sm'): string {
  const meta = CATEGORY_META[category];
  const padding = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return `<span class="inline-flex items-center gap-1.5 rounded-pill font-medium ${padding} transition-opacity duration-150 hover:opacity-80"
    style="background: ${meta.color}15; color: ${meta.color};">${meta.icon}${meta.label}</span>`;
}

export function categoryFilterPill(
  category: string,
  label: string,
  isActive: boolean,
): string {
  if (category === 'all') {
    return `<button data-category="all"
      class="px-4 py-1.5 rounded-pill text-sm font-medium transition-all duration-150 whitespace-nowrap
      ${isActive ? 'bg-text-primary text-white' : 'bg-white text-text-secondary border border-border hover:bg-gray-50'}">${label}</button>`;
  }

  const meta = CATEGORY_META[category as Category];
  if (isActive) {
    return `<button data-category="${category}"
      class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-sm font-medium transition-all duration-150 whitespace-nowrap text-white"
      style="background: ${meta.color};">${meta.icon}${label}</button>`;
  }

  return `<button data-category="${category}"
    class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-sm font-medium transition-all duration-150 whitespace-nowrap hover:opacity-80"
    style="background: ${meta.color}15; color: ${meta.color};">${meta.icon}${label}</button>`;
}
