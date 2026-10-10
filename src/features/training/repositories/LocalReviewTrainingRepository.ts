import type { TrainingRepository } from './TrainingRepository';
import type { MediaManifest, TrainingProgram } from '../types/program';
const root = `${import.meta.env.BASE_URL}__luh_review/`;
export async function privateReviewAvailable(signal?: AbortSignal): Promise<boolean> {
  try { const response = await fetch(`${root}status`, { signal, cache: 'no-store' }); return response.ok && (await response.json()).enabled === true; } catch { return false; }
}
export class LocalReviewTrainingRepository implements TrainingRepository {
  private async json<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${root}${path}`, { signal, cache: 'no-store' });
    if (!response.ok) throw new Error('A fonte de revisão privada não está disponível.');
    return response.json() as Promise<T>;
  }
  getProgram(signal?: AbortSignal) { return this.json<TrainingProgram>('program', signal); }
  async getWorkout(id: string, signal?: AbortSignal) {
    const program = await this.getProgram(signal), workout = program.workouts.find(w => w.id === id);
    if (!workout) throw new Error('Ficha não encontrada.');
    return workout;
  }
  getMediaManifest(signal?: AbortSignal) { return this.json<MediaManifest>('media-manifest', signal); }
  getMediaUrl(id: string) { return `${root}media/${encodeURIComponent(id)}`; }
}
