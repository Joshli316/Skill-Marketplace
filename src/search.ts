import { Skill } from './data/types';

export function searchSkills(skills: Skill[], query: string): Skill[] {
  if (!query.trim()) return skills;

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  return skills.filter((skill) => {
    const searchable = [
      skill.name,
      skill.tagline,
      skill.description,
      ...skill.triggers,
      skill.category,
    ]
      .join(' ')
      .toLowerCase();

    return terms.every((term) => searchable.includes(term));
  });
}

export function filterByCategory(skills: Skill[], category: string | null): Skill[] {
  if (!category || category === 'all') return skills;
  return skills.filter((s) => s.category === category);
}

export function sortSkills(skills: Skill[], sort: 'az' | 'recent'): Skill[] {
  const sorted = [...skills];
  if (sort === 'az') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  // 'recent' keeps original order (featured first, then alphabetical)
  return sorted;
}
