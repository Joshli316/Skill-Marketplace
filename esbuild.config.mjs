import { build } from 'esbuild';

await build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  minify: true,
  sourcemap: true,
  target: 'es2020',
  loader: {
    '.json': 'json',
  },
});
