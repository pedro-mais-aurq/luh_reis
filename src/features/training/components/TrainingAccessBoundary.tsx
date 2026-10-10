import { lazy, Suspense } from 'react';
import { temporaryPublicTraining } from '../public-access';
import { LockedTrainingView } from './LockedTrainingView';
// O ramo DEV e seus imports são removidos do bundle de produção pelo Vite.
const PublicBoundary = lazy(() => import('./PublicTrainingBoundary'));
const ReviewBoundary = import.meta.env.DEV ? lazy(() => import('./DevelopmentTrainingBoundary')) : null;
export function TrainingAccessBoundary() {
  if (temporaryPublicTraining) return <Suspense fallback={<p role="status">Carregando seus treinos…</p>}><PublicBoundary /></Suspense>;
  if (!ReviewBoundary) return <LockedTrainingView />;
  return <Suspense fallback={<LockedTrainingView />}><ReviewBoundary /></Suspense>;
}
