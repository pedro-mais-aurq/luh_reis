import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import type { TrainingProgram, TrainingWorkout, WorkoutExercise, MediaManifest } from '../types/program';
import type { TrainingRepository } from '../repositories/TrainingRepository';
import type { TrainingSessionStore } from '../stores/TrainingSessionStore';
import { useTrainingSession } from '../stores/useTrainingSession';
import { sessionProgress } from '../utils/progress';
import { ExerciseRow } from './ExerciseRow';
import { ExerciseDetail } from './ExerciseDetail';
import { RestTimer } from './RestTimer';
export function WorkoutDetail({ workout, program, manifest, repository, store }: { workout: TrainingWorkout; program: TrainingProgram; manifest: MediaManifest; repository: TrainingRepository; store: TrainingSessionStore }) {
  const session = useTrainingSession(program.id,workout.id,store);
  const progress = sessionProgress(workout,session.activity);
  const [activeTimer, setActiveTimer] = useState<WorkoutExercise>(workout.exercises[0]);
  const [detail, setDetail] = useState<WorkoutExercise | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const timer = useRef<HTMLDetailsElement>(null);
  function closeDetail() { setDetail(null); }
  function openDetail(exercise: WorkoutExercise) { restoreFocus.current = document.activeElement as HTMLElement; setDetail(exercise); }
  useEffect(() => {
    if (!detail || !modal.current) return;
    const dialog = modal.current; dialog.showModal();
    const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    dialog.querySelector<HTMLButtonElement>('button')?.focus();
    return () => { dialog.close(); document.body.style.overflow = overflow; restoreFocus.current?.focus(); };
  }, [detail]);
  function openTimer() { if (!timer.current) return; timer.current.open = true; timer.current.scrollIntoView({ block:'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
  function selectTimer(exercise: WorkoutExercise) { setActiveTimer(exercise); openTimer(); }
  return <><section className="workout-detail-heading"><Link to="/treinos#biblioteca" className="text-link"><ArrowLeft size={17} aria-hidden="true" />Todas as fichas</Link><div className="workout-title-row"><div><p className="eyebrow">FICHA {workout.label} · {workout.exercises.length} EXERCÍCIOS</p><h1>{workout.title}</h1></div><span className="workout-large-letter" aria-hidden="true">{workout.label}</span></div><nav className="workout-switcher" aria-label="Escolher treino">{program.workouts.map(w => <Link key={w.id} to={`/treinos/${w.id}`} aria-current={w.id === workout.id ? 'page' : undefined}>Treino {w.label}</Link>)}</nav></section><details className="workout-instructions"><summary>Orientações deste treino</summary><div>{workout.instructions.map((instruction,i) => <p key={i}>{instruction}</p>)}</div></details><div className="workout-layout"><section className="workout-exercises" aria-label={`Exercícios do ${workout.title}`}><table className="exercise-table"><caption className="sr-only">Ficha completa do {workout.title}, na ordem do documento original</caption><thead><tr><th scope="col">Exercício</th><th scope="col">Séries</th><th scope="col">Repetições</th><th scope="col">Descanso</th><th scope="col">Consultar</th></tr></thead>{workout.exercises.map(exercise => <ExerciseRow key={exercise.id} {...{ exercise, workoutId: workout.id, media: manifest.assets.find(m => m.id === exercise.imageId), mediaUrl: repository.getMediaUrl(exercise.imageId), completed:session.activity.completedSets[exercise.id] || [], load:session.activity.loads[exercise.id] || '', timerActive:activeTimer.id === exercise.id, onToggle:session.toggleSet, onLoad:session.setLoad, onTimer:selectTimer, onDetail:openDetail }} />)}</table></section><aside className="workout-tools"><details ref={timer} id="intervalo" className="timer-panel"><summary>Cronômetro de descanso</summary><div className="timer-panel-content"><p className="eyebrow">INTERVALO · EXERCÍCIO {activeTimer.sourceNumber}</p><h2>{activeTimer.name}</h2><RestTimer key={activeTimer.id} rest={activeTimer.rest} name={activeTimer.name} /></div></details><details className="session-note"><summary>Registro local e opções</summary><div><p>Marcação de séries e cargas para esta ficha, nesta data. Sem conta ou sincronização entre dispositivos.</p><p className="session-date">Sessão: {session.date}</p>{confirmReset ? <div className="reset-confirmation"><p>Apagar as séries e cargas de hoje desta ficha?</p><button className="training-button training-button-outline" type="button" onClick={() => { session.reset(); setConfirmReset(false); }}>Apagar registros</button><button type="button" className="detail-link" onClick={() => setConfirmReset(false)}>Cancelar</button></div> : <button type="button" className="detail-link" onClick={() => setConfirmReset(true)}>Limpar sessão de hoje</button>}</div></details>{session.storageError && <p className="session-storage-error" role="alert">O navegador não permitiu salvar. Os registros desta sessão permanecem apenas na tela.</p>}</aside></div><div className="session-progress"><div><span>SESSÃO ATUAL</span><strong role="status">{progress.completed} de {progress.total} séries concluídas</strong></div><progress max={progress.total || 1} value={progress.completed} aria-label="Séries concluídas da sessão" /><button type="button" onClick={openTimer}>Ver intervalo</button></div>{detail && <dialog className="exercise-modal" ref={modal} aria-label={`Detalhes de ${detail.name}`} onCancel={event => { event.preventDefault(); closeDetail(); }} onClick={event => { if (event.target === event.currentTarget) closeDetail(); }}><button type="button" className="modal-close" onClick={closeDetail} aria-label="Fechar detalhes"><X size={23} aria-hidden="true" /></button><ExerciseDetail exercise={detail} {...{workout,manifest,repository}} onClose={closeDetail} /></dialog>}</>;
}
