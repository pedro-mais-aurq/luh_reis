import type { TrainingSessionStore } from './TrainingSessionStore';
import type { TrainingSession } from '../types/program';
/** Adapter de revisão local. Não representa conta, autorização ou sincronização. */
export class LocalReviewSessionStore implements TrainingSessionStore {
  constructor(private storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>) {}
  private key(programId: string, workoutId: string, date: string) { return `luh-reis:private-review:v1:${programId}:${workoutId}:${date}`; }
  read(programId: string, workoutId: string, date: string): TrainingSession | null {
    try {
      const data: unknown = JSON.parse(this.storage.getItem(this.key(programId, workoutId, date)) || 'null');
      if (!data || typeof data !== 'object') return null;
      const s = data as TrainingSession;
      if (s.version !== 1 || s.programId !== programId || s.workoutId !== workoutId || s.date !== date || !s.activity?.completedSets || !s.activity.loads) return null;
      if (!Object.values(s.activity.completedSets).every(a => Array.isArray(a) && a.every(n => Number.isInteger(n))) || !Object.values(s.activity.loads).every(v => typeof v === 'string' && v.length <= 60)) return null;
      return s;
    } catch { return null; }
  }
  write(session: TrainingSession) { this.storage.setItem(this.key(session.programId, session.workoutId, session.date), JSON.stringify(session)); }
  remove(programId: string, workoutId: string, date: string) { this.storage.removeItem(this.key(programId, workoutId, date)); }
}
