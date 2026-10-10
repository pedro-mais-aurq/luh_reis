import { useEffect, useMemo, useState } from 'react';
import type { TrainingProgram, MediaManifest } from '../types/program';
import { PublicTrainingRepository } from '../repositories/PublicTrainingRepository';
import { PrivateTrainingWorkspace } from './PrivateTrainingWorkspace';
export default function PublicTrainingBoundary() {
  const repository = useMemo(() => new PublicTrainingRepository(), []);
  const [data, setData] = useState<{program: TrainingProgram; manifest: MediaManifest} | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setError(false);
    void Promise.all([repository.getProgram(controller.signal), repository.getMediaManifest(controller.signal)])
      .then(([program, manifest]) => { if (!controller.signal.aborted) setData({program, manifest}); })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [repository, attempt]);
  if (error) return <main className="training-empty"><h1>Não foi possível carregar os treinos.</h1><p role="alert">Confira sua conexão e tente novamente.</p><button type="button" className="training-button" onClick={() => setAttempt(value => value + 1)}>Tentar novamente</button></main>;
  return data ? <PrivateTrainingWorkspace {...data} repository={repository} publicAccess /> : <main className="training-empty"><p role="status">Carregando seus treinos…</p></main>;
}
