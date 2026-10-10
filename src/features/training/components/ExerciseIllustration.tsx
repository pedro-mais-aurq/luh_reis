import { useState } from 'react';
import type { TrainingMedia } from '../types/program';
export function ExerciseIllustration({ media, url, large = false, priority = false }: { media?: TrainingMedia; url: string; large?: boolean; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <figure className={`exercise-illustration${large ? ' illustration-large' : ''}`}>
    {media && !failed ? <img src={url} width="600" height="420" alt={media.alt} loading={priority ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} /> : <div className="illustration-pending" role="img" aria-label="Ilustração pendente de revisão"><span>LUH REIS</span><p>Imagem em revisão</p></div>}
    {large && <figcaption>{!media || failed || media.status === 'pending' ? 'Ilustração pendente de revisão.' : media.status === 'review' ? media.origin.startsWith('Arquivo fornecido') ? 'Mídia fornecida para revisão profissional.' : 'Ilustração original para revisão profissional.' : 'Ilustração aprovada.'}{media?.reviewNote && <span>{media.reviewNote}</span>}</figcaption>}
  </figure>;
}
