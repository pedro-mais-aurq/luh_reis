import { useEffect, useState } from 'react';
import type { SessionActivity, TrainingSession } from '../types/program';
import type { TrainingSessionStore } from './TrainingSessionStore';
import { emptyActivity } from '../utils/progress';
export function localSessionDate(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function useTrainingSession(programId: string, workoutId: string, store: TrainingSessionStore) {
  const [date, setDate] = useState(localSessionDate);
  const [activity, setActivity] = useState<SessionActivity>(() => store.read(programId, workoutId, date)?.activity || emptyActivity());
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const reconcile = () => { const nextDate = localSessionDate(); if (nextDate !== date) { setDate(nextDate); setActivity(store.read(programId, workoutId, nextDate)?.activity || emptyActivity()); } };
    const id = window.setInterval(reconcile, 30000); document.addEventListener('visibilitychange', reconcile);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', reconcile); };
  }, [programId, workoutId, store, date]);
  useEffect(() => {
    const session: TrainingSession = { version: 1, programId, workoutId, date, activity };
    try { store.write(session); setStorageError(false); } catch { setStorageError(true); }
  }, [programId, workoutId, date, activity, store]);
  const toggleSet = (id: string, n: number) => setActivity(current => { const series = current.completedSets[id] || []; return { ...current, completedSets: { ...current.completedSets, [id]: series.includes(n) ? series.filter(v => v !== n) : [...series, n] } }; });
  const setLoad = (id: string, load: string) => setActivity(current => ({ ...current, loads: { ...current.loads, [id]: load.slice(0,60) } }));
  return { date, activity, storageError, toggleSet, setLoad, reset: () => setActivity(emptyActivity()) };
}
