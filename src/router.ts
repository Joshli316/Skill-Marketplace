type RouteHandler = (params: Record<string, string>) => string;

interface Route {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
}

const routes: Route[] = [];

export function route(path: string, handler: RouteHandler): void {
  const keys: string[] = [];
  const pattern = path
    .replace(/:(\w+)/g, (_, key) => {
      keys.push(key);
      return '([^/]+)';
    })
    .replace(/\//g, '\\/');
  routes.push({ pattern: new RegExp(`^${pattern}$`), keys, handler });
}

export function navigate(path: string): void {
  window.location.hash = path;
}

export function getQueryParams(): URLSearchParams {
  const hash = window.location.hash;
  const queryIndex = hash.indexOf('?');
  if (queryIndex === -1) return new URLSearchParams();
  return new URLSearchParams(hash.slice(queryIndex + 1));
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Claude Code Skills — Browse, Search & Install Community Skills',
  '/browse': 'Browse Skills — Claude Code Skills',
  '/submit': 'Submit a Skill — Claude Code Skills',
  '/about': 'About — Claude Code Skills',
};

function resolve(): void {
  const hash = window.location.hash.slice(1) || '/';
  const path = hash.split('?')[0];
  const app = document.getElementById('app');
  if (!app) return;

  // Close mobile menu on navigation
  const menu = document.getElementById('mobile-menu');
  menu?.classList.add('hidden');
  const menuBtn = document.getElementById('mobile-menu-btn');
  menuBtn?.setAttribute('aria-expanded', 'false');

  for (const r of routes) {
    const match = path.match(r.pattern);
    if (match) {
      const params: Record<string, string> = {};
      r.keys.forEach((key, i) => {
        params[key] = decodeURIComponent(match[i + 1]);
      });
      app.innerHTML = r.handler(params);
      document.title = PAGE_TITLES[path] || `${params.slug ? params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Skill'} — Claude Code Skills`;
      window.scrollTo(0, 0);
      return;
    }
  }

  // 404 fallback
  document.title = '404 — Claude Code Skills';
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">404</h1>
        <p class="text-text-secondary mb-6">Page not found</p>
        <a href="#/" class="btn-primary inline-block">Back to Home</a>
      </div>
    </div>
  `;
}

export function startRouter(): void {
  window.addEventListener('hashchange', resolve);
  resolve();
}
