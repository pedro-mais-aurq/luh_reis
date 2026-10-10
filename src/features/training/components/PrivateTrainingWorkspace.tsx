import { useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { TrainingProgram, MediaManifest } from '../types/program';
import type { TrainingRepository } from '../repositories/TrainingRepository';
import { LocalReviewSessionStore } from '../stores/LocalReviewSessionStore';
import { TrainingHeader } from './TrainingHeader';
import { TrainingOverview } from './TrainingOverview';
import { WorkoutDetail } from './WorkoutDetail';
import { ExerciseDetail } from './ExerciseDetail';
import '../../../styles/training-private.css';
export function PrivateTrainingWorkspace({ program, manifest, repository, publicAccess = false }: { program: TrainingProgram; manifest: MediaManifest; repository: TrainingRepository; publicAccess?: boolean }) {
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const store = useMemo(() => new LocalReviewSessionStore({ getItem: key => window.localStorage.getItem(key), setItem: (key,value) => window.localStorage.setItem(key,value), removeItem: key => window.localStorage.removeItem(key) }), []);
  const route = location.pathname.replace(/^\/treinos\/?/,'').split('/').filter(Boolean);
  const workout = program.workouts.find(w => w.id === route[0]);
  const exercise = route[1] === 'exercicio' ? workout?.exercises.find(e => e.id === route[2]) : undefined;
  const invalid = route.length > 0 && (!workout || (route.length > 1 && (route.length !== 3 || !exercise)));
  useEffect(() => { if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView(); else { window.scrollTo(0,0); main.current?.focus(); } }, [location.pathname,location.hash]);
  return <div className="private-training"><a className="skip-link" href="#training-main">Pular para os treinos</a><TrainingHeader review />{!publicAccess && <details className="review-banner"><summary>Revisão local · material em aprovação</summary><p>Material de referência em análise. Conteúdo, autoria e ilustrações aguardam aprovação; este ambiente não libera acesso comercial.</p></details>}<main id="training-main" ref={main} tabIndex={-1}>{invalid ? <section className="training-empty"><h1>Ficha não encontrada.</h1><Link className="training-button" to="/treinos">Voltar às fichas</Link></section> : exercise && workout ? <ExerciseDetail key={exercise.id} {...{exercise,workout,manifest,repository}} /> : workout ? <WorkoutDetail key={workout.id} {...{workout,program,manifest,repository,store}} /> : <TrainingOverview {...{program,manifest,repository}} />}</main><footer className="training-footer"><p>Fonte de referência: {program.sourceAttribution} · {program.sourceDateLabel}</p><p>{publicAccess ? 'Acesso público temporário ao programa de treinos.' : 'Uso local para revisão. Aprovação profissional e autorização de uso pendentes.'}</p><Link to="/">Voltar ao site institucional</Link></footer></div>;
}
