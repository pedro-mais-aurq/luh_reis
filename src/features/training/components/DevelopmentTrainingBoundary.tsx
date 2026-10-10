import { useEffect, useState } from 'react';
import type { TrainingProgram, MediaManifest } from '../types/program';
import { LocalReviewTrainingRepository, privateReviewAvailable } from '../repositories/LocalReviewTrainingRepository';
import { LockedTrainingView } from './LockedTrainingView';
import { PrivateTrainingWorkspace } from './PrivateTrainingWorkspace';
const repository = new LocalReviewTrainingRepository();
export default function DevelopmentTrainingBoundary() {
  const [data, setData] = useState<{ program: TrainingProgram; manifest: MediaManifest } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      if (!await privateReviewAvailable(controller.signal)) return;
      try {
        const [program, manifest] = await Promise.all([repository.getProgram(controller.signal), repository.getMediaManifest(controller.signal)]);
        if (!controller.signal.aborted) setData({ program, manifest });
      } catch { if (!controller.signal.aborted) setError('Não foi possível carregar os arquivos locais de revisão. Confira a documentação do projeto.'); }
    })();
    return () => controller.abort();
  }, []);
  if (error) return <main className="unavailable"><h1>Revisão indisponível.</h1><p role="alert">{error}</p></main>;
  return data ? <PrivateTrainingWorkspace program={data.program} manifest={data.manifest} repository={repository} /> : <LockedTrainingView />;
}
