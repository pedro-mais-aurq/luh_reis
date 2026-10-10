import type { TrainingSession } from '../types/program';
export interface TrainingSessionStore {
  read(programId: string, workoutId: string, date: string): TrainingSession | null;
  write(session: TrainingSession): void;
  remove(programId: string, workoutId: string, date: string): void;
}
