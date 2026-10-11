import assert from 'node:assert/strict';
import { readFile, stat, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
const base = process.env.VITE_BASE_PATH || '/';
const html = await readFile('dist/index.html', 'utf8');
assert.equal(await readFile('dist/404.html', 'utf8'), html);
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const url = match[1];
  if (/^https?:\/\//.test(url)) continue;
  assert.ok(url.startsWith(base), `Recurso sem base correto: ${url}`);
  await stat(join('dist', url.slice(base.length)));
}
const app = await readFile('src/app/App.tsx', 'utf8');
assert.ok(app.includes('<Hero /><About /><Method /><Plan />'), 'A ordem deve ser hero, apresentação, método e PDF.');
const paths = [];
async function walk(dir) { for (const e of await readdir(dir, { withFileTypes: true })) { const p = join(dir, e.name); if (e.isDirectory()) await walk(p); else paths.push(p); } }
await walk('public');
assert.ok(!paths.some(p => /(^|\/)training(\/|$)|\.(zip|docx)$/i.test(p)), 'A plataforma antiga não deve ser publicada.');
assert.deepEqual(paths.filter(p => /\.pdf$/i.test(p)), ['public/assets/guide/plano-luh-reis-ilustrado.pdf']);
const forbidden = /vida funcional|mirtilo|100% chata|são miguelito|localStorage|indexedDB/i;
for (const p of paths.filter(p => /\.(html|json|js|svg)$/i.test(p))) assert.ok(!forbidden.test(await readFile(p, 'utf8')), `Conteúdo legado em ${p}`);
await walk('dist');
for (const p of paths.filter(p => p.startsWith('dist/') && p.endsWith('.css'))) {
  const body = await readFile(p, 'utf8');
  for (const m of body.matchAll(/url\(([^)]+)\)/g)) {
    const url = m[1].replace(/^['"]|['"]$/g, '');
    if (!url.startsWith(base)) continue;
    await stat(join('dist', url.slice(base.length)));
  }
}
for (const p of paths.filter(p => p.startsWith('public/'))) await stat(join('dist', relative('public', p)));
const sizes = await Promise.all(paths.filter(p => p.startsWith('dist/')).map(async p => ({ path: relative('dist', p), bytes: (await stat(p)).size })));
console.log(JSON.stringify({ base, htmlAndCssAssets: 'ok', spaFallback: 'ok', guideAssets: 'ok', landingOrder: 'ok', outputBytes: sizes.reduce((sum, s) => sum + s.bytes, 0), largestFiles: sizes.sort((a, b) => b.bytes - a.bytes).slice(0, 6) }, null, 2));
