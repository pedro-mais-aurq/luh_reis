import type { SessionActivity, TrainingWorkout } from '../types/program';
export function seriesCount(value: string): number | null {
  const match = value.trim().match(/^(\d+)(?:\s*[xX])?$/);
  if (!match) return null;
  const count = Number(match[1]);
  return count > 0 && count <= 100 ? count : null;
}
export function sessionProgress(workout: TrainingWorkout, activity: SessionActivity) {
  let total = 0, completed = 0;
  for (const exercise of workout.exercises) {
    const count = seriesCount(exercise.sets) || 0; total += count;
    completed += new Set((activity.completedSets[exercise.id] || []).filter(n => Number.isInteger(n) && n >= 1 && n <= count)).size;
  }
  return { total, completed, percent: total ? completed / total * 100 : 0 };
}
export const emptyActivity = (): SessionActivity => ({ completedSets: {}, loads: {} });
