import type { WorkoutLabel, Periodization } from './types';
/** Referência estrutural apenas; não contém exercícios ou prescrição do PDF. */
export const workoutLabels: readonly WorkoutLabel[] = ['A', 'B', 'C', 'D', 'E', 'F'];
export function isValidPeriodization(value: Periodization): boolean {
  return Number.isInteger(value.weeklyFrequency) && value.weeklyFrequency >= 1 && value.weeklyFrequency <= 7
    && value.weeks.every(w => Number.isInteger(w.week) && w.week > 0
      && new Set(w.days.map(d => d.day)).size === w.days.length
      && w.days.filter(d => !d.recovery && d.workoutIds.length > 0).length === value.weeklyFrequency
      && w.days.every(d => !d.recovery || d.workoutIds.length === 0));
}
