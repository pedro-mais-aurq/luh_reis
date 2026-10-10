import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
const directory = path.resolve(process.argv[2] || 'dist');
async function walk(dir) {
  const entries = await readdir(dir, {withFileTypes:true});
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir,entry.name)) : path.join(dir,entry.name)))).flat();
}
const files = await walk(directory);
const forbidden = ['__luh_review', 'LocalReviewTrainingRepository', 'DevelopmentTrainingBoundary', 'private/training'];
for (const file of files) {
  const relative = path.relative(directory, file);
  if (/\.(pdf|map)$/i.test(file) || /(^|\/)(private|review)(\/|$)/i.test(relative)) throw Error(`Arquivo indevido: ${relative}`);
  if (/\.(html|js)$/i.test(file)) {
    const content = await readFile(file, 'utf8');
    for (const token of forbidden) if (content.includes(token)) throw Error(`Mecanismo local encontrado: ${relative}`);
  }
}
const program = JSON.parse(await readFile(path.join(directory,'training/program.json'),'utf8'));
const original = JSON.parse(await readFile('public/training/program.json','utf8'));
if (JSON.stringify(program) !== JSON.stringify(original)) throw Error('As prescrições foram alteradas.');
const manifest = JSON.parse(await readFile(path.join(directory,'training/media-manifest.json'),'utf8'));
for (const asset of manifest.assets) await access(path.join(directory,'training',asset.file));
for (const workout of program.workouts) for (const exercise of workout.exercises) if (!manifest.assets.some(a=>a.id===exercise.imageId)) throw Error(`Mídia ausente: ${exercise.id}`);
console.log(`Acesso público temporário auditado: ${program.workouts.length} fichas, ${program.workouts.reduce((n,w)=>n+w.exercises.length,0)} entradas; prescrições intactas e todas as mídias presentes. Sem endpoints de revisão local, PDFs ou source maps.`);
