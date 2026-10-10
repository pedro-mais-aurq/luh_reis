import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
const directory = path.resolve('private/training');
const raw = await readFile(path.join(directory,'program.json'));
const program = JSON.parse(raw);
const lock = JSON.parse(await readFile(path.join(directory,'audit-lock.json'),'utf8'));
assert.equal(createHash('sha256').update(raw).digest('hex'),lock.programSha256,'A transcrição mudou após a conferência visual.');
assert.equal(program.sourceSha256,lock.sourceSha256);
assert.deepEqual(program.workouts.map(w => w.label),['A','B','C','D','E','F']);
assert.deepEqual(program.workouts.map(w => w.exercises.length),lock.counts);
assert.equal(program.approvalStatus,'draft'); assert.equal(program.rightsStatus,'pending');
const manifest = JSON.parse(await readFile(path.join(directory,'media-manifest.json'),'utf8'));
assert.equal(manifest.assets.length,65);
assert.equal(new Set(manifest.assets.map(a => a.id)).size,65);
const ids = new Set();
for (const workout of program.workouts) {
  assert.equal(workout.sourcePage,program.workouts.indexOf(workout)+1);
  assert.equal(workout.instructions.length,2);
  assert.ok(manifest.assets.some(a => a.id === workout.coverImageId));
  for (const [index,exercise] of workout.exercises.entries()) {
    assert.equal(exercise.order,index); assert.ok(!ids.has(exercise.id)); ids.add(exercise.id);
    for (const field of ['name','sets','repetitions','rest','method']) assert.equal(typeof exercise[field],'string');
    assert.ok(manifest.assets.some(a => a.id === exercise.imageId));
    assert.equal(exercise.approvedInstructions,null);
    if (exercise.groupId) assert.ok(workout.groups.some(g => g.id === exercise.groupId && g.orders.includes(index)));
  }
  for (const group of workout.groups) assert.deepEqual(workout.exercises.filter(e => e.groupId === group.id).map(e => e.order),group.orders);
}
assert.deepEqual(program.schedules.map(s => s.daysPerWeek),[2,3,4,5,6]);
let dayCount = 0;
for (const schedule of program.schedules) {
  assert.deepEqual(schedule.weeks.map(w => w.week),[1,2,3,4]);
  for (const week of schedule.weeks) {
    assert.deepEqual(week.days.map(d => d.day),[0,1,2,3,4,5,6]);
    assert.equal(week.days.filter(d => d.workoutId).length,schedule.daysPerWeek);
    for (const day of week.days) if (day.workoutId) assert.ok(program.workouts.some(w => w.id === day.workoutId));
    dayCount += week.days.length;
  }
}
assert.equal(dayCount,lock.scheduleDayCount);
for (const media of manifest.assets) {
  const file = path.resolve(directory,media.file);
  assert.ok(file.startsWith(directory+path.sep)); await access(file);
  assert.ok(media.origin && media.license && media.alt);
  assert.ok(['review','pending'].includes(media.status));
  const svg = await readFile(file,'utf8');
  assert.ok(svg.includes('<svg')); assert.ok(!/<script|<foreignObject|https?:\/\//i.test(svg.replace('http://www.w3.org/2000/svg','')));
}
await access(path.join(directory,lock.auditReport));
console.log(`Auditoria privada aprovada: ${ids.size} entradas, ${dayCount} campos diários, ${manifest.assets.length} assets. Hash da transcrição conferido.`);
