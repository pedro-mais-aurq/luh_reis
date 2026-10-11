import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const directory = path.resolve(process.argv[2] || 'dist');
const pdfPath = 'assets/guide/plano-luh-reis-ilustrado.pdf';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const files = await walk(directory);
for (const file of files) {
  const relative = path.relative(directory, file).split(path.sep).join('/');
  if (/\.(map|docx|zip)$/i.test(relative) || /(^|\/)(training|private|review)(\/|$)/i.test(relative)) throw Error(`Arquivo antigo ou indevido: ${relative}`);
  if (/\.pdf$/i.test(relative) && relative !== pdfPath) throw Error(`PDF não previsto: ${relative}`);
  if (/\.(html|js)$/i.test(relative)) {
    const body = await readFile(file, 'utf8');
    for (const token of ['__luh_review', 'LocalReviewTrainingRepository', 'DevelopmentTrainingBoundary', 'training/program.json', 'training/media-manifest.json']) {
      if (body.includes(token)) throw Error(`Mecanismo antigo encontrado: ${relative}`);
    }
  }
}
const published = await readFile(path.join(directory, pdfPath));
const source = await readFile(path.join('public', pdfPath));
assert.ok(published.subarray(0, 5).toString() === '%PDF-', 'O download precisa ser um PDF válido.');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
assert.equal(hash(published), hash(source), 'O PDF publicado deve ser idêntico ao material preparado.');
for (let page = 1; page <= 6; page++) await access(path.join(directory, `assets/guide/page-${page}-ilustrado.webp`));
console.log('PDF ilustrado e seis prévias presentes; download idêntico ao material preparado. Área de treinos, mídias antigas, endpoints de revisão e source maps ausentes.');
