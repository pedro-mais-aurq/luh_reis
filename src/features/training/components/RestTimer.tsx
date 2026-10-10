import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { formatClock, parseRest, remainingSeconds } from '../utils/formatting';
export function RestTimer({ rest, name }: { rest: string; name: string }) {
  const range = parseRest(rest);
  const [duration, setDuration] = useState(range?.min || 0);
  const [remaining, setRemaining] = useState(duration);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    if (deadline === null) return;
    const update = () => { const next = remainingSeconds(deadline, Date.now()); setRemaining(next); if (next === 0) { setDeadline(null); setEnded(true); } };
    update(); const interval = window.setInterval(update, 250);
    document.addEventListener('visibilitychange', update);
    return () => { window.clearInterval(interval); document.removeEventListener('visibilitychange', update); };
  }, [deadline]);
  function pause() { if (deadline !== null) setRemaining(remainingSeconds(deadline, Date.now())); setDeadline(null); }
  function reset() { setDeadline(null); setRemaining(duration); setEnded(false); }
  if (!range) return <div className="rest-note"><strong>Intervalo da ficha</strong><p>{rest || 'Não informado na fonte.'}</p></div>;
  if (range.max === 0) return <div className="rest-note"><strong>Intervalo da ficha: {rest}</strong><p>O valor informado é zero. Sem contagem regressiva.</p></div>;
  return <section className="rest-timer" aria-label={`Cronômetro de ${name}`}><div className="timer-heading"><span>Intervalo da ficha</span><strong>{rest}</strong></div>{range.min !== range.max && <label className="timer-range">Duração dentro da faixa: {duration} s<input aria-label="Duração do intervalo em segundos" type="range" min={range.min} max={range.max} step={1} value={duration} disabled={deadline !== null} onChange={e => { const value = Number(e.target.value); setDuration(value); setRemaining(value); setEnded(false); }} /></label>}<div className="timer-body"><output role="timer" aria-label="Tempo restante">{formatClock(remaining)}</output><div>{deadline !== null ? <button type="button" className="training-button" onClick={pause}><Pause size={17} aria-hidden="true" />Pausar</button> : <button type="button" className="training-button" disabled={remaining === 0} onClick={() => { setEnded(false); setDeadline(Date.now() + remaining * 1000); }}><Play size={17} aria-hidden="true" />{remaining === duration ? 'Iniciar' : 'Retomar'}</button>}<button type="button" className="training-button training-button-outline" onClick={reset}><RotateCcw size={16} aria-hidden="true" />Reiniciar</button></div></div><p className="timer-feedback" role="status">{ended ? 'Intervalo encerrado.' : deadline !== null ? 'Em contagem.' : remaining !== duration ? 'Pausado.' : 'Pronto para iniciar.'}</p></section>;
}
