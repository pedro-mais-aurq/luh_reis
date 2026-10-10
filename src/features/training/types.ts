export type WorkoutLabel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type PublicationState = 'draft' | 'review' | 'published' | 'archived';
export interface Program {
  id: string; title: string; description: string; materialReference: string | null;
  publicationState: PublicationState; commercialProductId: string | null;
}
export interface Exercise {
  id: string; name: string; sets: number | string; repetitions: string;
  restSeconds: number | null; executionMethod: string | null; notes: string | null;
  imageReference: string | null; approvedInstructions: string | null;
}
export interface Workout {
  id: string; programId: string; name: WorkoutLabel; order: number; description: string;
  exercises: readonly { order: number; exercise: Exercise }[];
}
export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export interface TrainingDay { day: Weekday; workoutIds: readonly string[]; recovery: boolean }
export interface TrainingWeek { week: number; days: readonly TrainingDay[] }
export interface Periodization { id: string; programId: string; weeklyFrequency: number; weeks: readonly TrainingWeek[] }
export interface WorkoutProgress { studentId: string; workoutId: string; date: string; status: 'not_started' | 'in_progress' | 'completed' }
export interface TrainingService {
  getAuthorizedProgram(programId: string): Promise<Program>;
  getAuthorizedWorkout(workoutId: string): Promise<Workout>;
  getPeriodization(programId: string): Promise<Periodization[]>;
  saveProgress(progress: WorkoutProgress): Promise<void>;
}
