/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#ffffff',
        border: '#e2e5ea',
        'bg-page': '#f8f9fb',
        'text-primary': '#1a1d23',
        'text-secondary': '#6b7280',
        accent: {
          blue: '#3b82f6',
          green: '#10b981',
          purple: '#8b5cf6',
          amber: '#f59e0b',
          red: '#ef4444',
          cyan: '#06b6d4',
        },
        'code-bg': '#f1f3f5',
        category: {
          workflow: '#8b5cf6',
          quality: '#10b981',
          design: '#3b82f6',
          content: '#f59e0b',
          deploy: '#ef4444',
          learning: '#06b6d4',
          utility: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '4px',
        pill: '9999px',
        button: '8px',
        search: '8px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1)',
        'search-focus': '0 0 0 3px rgba(59,130,246,0.15)',
      },
    },
  },
  plugins: [],
};
