export interface Skill {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  author: string;
  authorGithub: string;
  triggers: string[];
  example: string;
  install: string;
  sourceUrl: string;
  featured: boolean;
}

export type Category =
  | 'workflow'
  | 'quality'
  | 'design'
  | 'content'
  | 'deploy'
  | 'learning'
  | 'utility';

export const CATEGORY_META: Record<Category, { label: string; color: string; icon: string }> = {
  workflow: { label: 'Workflow', color: '#8b5cf6', icon: '⚡' },
  quality: { label: 'Quality', color: '#10b981', icon: '✓' },
  design: { label: 'Design', color: '#3b82f6', icon: '◆' },
  content: { label: 'Content', color: '#f59e0b', icon: '▣' },
  deploy: { label: 'Deploy', color: '#ef4444', icon: '▲' },
  learning: { label: 'Learning', color: '#06b6d4', icon: '◎' },
  utility: { label: 'Utility', color: '#6b7280', icon: '⚙' },
};

export const ALL_CATEGORIES: Category[] = [
  'workflow', 'quality', 'design', 'content', 'deploy', 'learning', 'utility',
];
