import { Check } from 'lucide-react';
import { seriesCount } from '../utils/progress';
export function SetTracker({ exerciseId, name, sets, completed, onToggle }: { exerciseId: string; name: string; sets: string; completed: number[]; onToggle: (id: string, series: number) => void }) {
  const count = seriesCount(sets);
  if (!count) return <p className="series-unavailable">Marcação aguardando revisão da quantidade de séries.</p>;
  return <div className="set-tracker" role="group" aria-label={`Séries de ${name}`}><span className="set-label">Marcar séries</span><div>{Array.from({ length: count }, (_, i) => i + 1).map(n => <button key={n} type="button" aria-pressed={completed.includes(n)} aria-label={`Série ${n} de ${name}`} onClick={() => onToggle(exerciseId, n)}>{completed.includes(n) ? <Check size={17} aria-hidden="true" /> : n}<span className="sr-only">{completed.includes(n) ? 'Concluída' : 'Pendente'}</span></button>)}</div></div>;
}
