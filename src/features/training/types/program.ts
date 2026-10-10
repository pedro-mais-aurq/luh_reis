export type TrainingLabel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export interface WorkoutExercise {
  id: string; order: number; sourceNumber: string; name: string; sets: string;
  repetitions: string; rest: string; method: string; notes: string[]; imageId: string;
  unilateral: boolean; sourcePage: number; groupId: string | null;
  approvedInstructions: string | null; kind: 'cardio' | 'mobility' | 'exercise';
}
export interface ExerciseGroup { id: string; orders: number[]; method: string }
export interface TrainingWorkout {
  id: string; label: TrainingLabel; title: string; description: string; sourcePage: number;
  coverImageId: string; instructions: string[]; groups: ExerciseGroup[]; exercises: WorkoutExercise[];
}
export interface ScheduleDay { day: number; workoutId: string | null }
export interface ScheduleWeek { week: number; days: ScheduleDay[] }
export interface TrainingSchedule { id: string; daysPerWeek: number; sourcePage: number; weeks: ScheduleWeek[] }
export interface TrainingProgram {
  schemaVersion: 1; id: string; title: string; description: string; sourceDocument: string;
  sourceSha256: string; sourceAttribution: string; sourceDateLabel: string;
  approvalStatus: 'draft' | 'approved'; rightsStatus: 'pending' | 'approved';
  workouts: TrainingWorkout[]; schedules: TrainingSchedule[]; auditNotes: string[];
}
export interface TrainingMedia {
  id: string; file: string; alt: string; origin: string; license: string;
  status: 'review' | 'pending' | 'approved'; reviewNote?: string;
}
export interface MediaManifest { schemaVersion: 1; assets: TrainingMedia[] }
export interface SessionActivity { completedSets: Record<string, number[]>; loads: Record<string, string> }
export interface TrainingSession { version: 1; programId: string; workoutId: string; date: string; activity: SessionActivity }
export interface TrainingAccess {
  state: 'unauthenticated' | 'pending' | 'authorized' | 'denied' | 'expired';
  userId: string | null; productId: string; validUntil: string | null;
}
