import type { TrainingProgram, TrainingWorkout, MediaManifest, TrainingAccess } from '../types/program';
/** Futuro adapter: obter conteúdo somente após autorização confirmada no servidor. */
export interface TrainingRepository {
  getProgram(signal?: AbortSignal): Promise<TrainingProgram>;
  getWorkout(id: string, signal?: AbortSignal): Promise<TrainingWorkout>;
  getMediaManifest(signal?: AbortSignal): Promise<MediaManifest>;
  getMediaUrl(id: string): string;
}
export interface TrainingAccessService { getVerifiedAccess(productId: string): Promise<TrainingAccess> }
