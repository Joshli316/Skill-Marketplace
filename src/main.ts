import { route, startRouter, navigate, getQueryParams } from './router';
import { homePage } from './components/home';
import { browsePage } from './components/browse';
import { skillDetailPage } from './components/skill-detail';
import { submitPage } from './components/submit';
import { aboutPage } from './components/about';

// Register routes
route('/', () => homePage());
route('/browse', () => browsePage());
route('/skill/:slug', (params) => skillDetailPage(params));
route('/submit', () => submitPage());
route('/about', () => aboutPage());

// Start router
startRouter();

// Global event delegation
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  // Mobile menu toggle
  if (target.closest('#mobile-menu-btn')) {
    const menu = document.getElementById('mobile-menu');
    menu?.classList.toggle('hidden');
    return;
  }

  // Close mobile menu on link click
  if (target.closest('#mobile-menu a')) {
    const menu = document.getElementById('mobile-menu');
    menu?.classList.add('hidden');
    return;
  }

  // Category filter pills on browse page
  const catBtn = target.closest('[data-category]') as HTMLElement | null;
  if (catBtn) {
    const category = catBtn.dataset.category;
    const params = getQueryParams();
    const q = params.get('q') || '';
    const sort = params.get('sort') || 'az';
    navigate(`/browse?category=${category}&q=${encodeURIComponent(q)}&sort=${sort}`);
    return;
  }

  // Sort buttons
  const sortBtn = target.closest('[data-sort]') as HTMLElement | null;
  if (sortBtn) {
    const sort = sortBtn.dataset.sort;
    const params = getQueryParams();
    const category = params.get('category') || 'all';
    const q = params.get('q') || '';
    navigate(`/browse?category=${category}&q=${encodeURIComponent(q)}&sort=${sort}`);
    return;
  }

  // Clear filters button
  if (target.closest('#clear-filters')) {
    navigate('/browse');
    return;
  }

  // Copy button
  const copyBtn = target.closest('.copy-btn') as HTMLElement | null;
  if (copyBtn) {
    const copyData = copyBtn.dataset.copy;
    let textToCopy = '';

    if (copyData === 'json-template' || copyData === 'md-template') {
      const pre = copyBtn.previousElementSibling as HTMLElement;
      textToCopy = pre?.textContent || '';
    } else if (copyData) {
      textToCopy = copyData.replace(/\\n/g, '\n');
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = original; }, 1500);
    });
    return;
  }
});

// Search input handling
document.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;

  if (target.id === 'browse-search') {
    const params = getQueryParams();
    const category = params.get('category') || 'all';
    const sort = params.get('sort') || 'az';
    // Use replaceState to avoid polluting history
    const newHash = `/browse?category=${category}&q=${encodeURIComponent(target.value)}&sort=${sort}`;
    history.replaceState(null, '', `#${newHash}`);
    // Re-render browse page
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = browsePage();
      // Restore focus and cursor position
      const newInput = document.getElementById('browse-search') as HTMLInputElement;
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(target.selectionStart, target.selectionEnd);
      }
    }
    return;
  }

  if (target.id === 'hero-search') {
    // Debounce hero search — navigate to browse on input
    navigate(`/browse?q=${encodeURIComponent(target.value)}`);
    return;
  }
});

// Handle Enter key in hero search
document.addEventListener('keydown', (e) => {
  const target = e.target as HTMLInputElement;
  if (target.id === 'hero-search' && e.key === 'Enter') {
    navigate(`/browse?q=${encodeURIComponent(target.value)}`);
  }
});
