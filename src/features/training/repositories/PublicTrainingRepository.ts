import type { TrainingRepository } from './TrainingRepository';
import type { TrainingProgram, MediaManifest } from '../types/program';
export class PublicTrainingRepository implements TrainingRepository {
  private manifest: MediaManifest | null = null;
  private get root() { return `${import.meta.env.BASE_URL}training/`; }
  private async json<T>(file: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${this.root}${file}`, { signal });
    if (!response.ok) throw new Error('Não foi possível carregar o programa de treinos.');
    return response.json() as Promise<T>;
  }
  getProgram(signal?: AbortSignal) { return this.json<TrainingProgram>('program.json', signal); }
  async getWorkout(id: string, signal?: AbortSignal) {
    const program = await this.getProgram(signal);
    const workout = program.workouts.find(w => w.id === id);
    if (!workout) throw new Error('Ficha não encontrada.');
    return workout;
  }
  async getMediaManifest(signal?: AbortSignal) {
    const manifest = await this.json<MediaManifest>('media-manifest.json', signal);
    this.manifest = manifest;
    return manifest;
  }
  getMediaUrl(id: string) {
    const file = this.manifest?.assets.find(asset => asset.id === id)?.file;
    return file ? `${this.root}${file}` : '';
  }
}
