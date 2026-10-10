import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { TrainingProgram, MediaManifest } from '../src/features/training/types/program';
import { WorkoutDetail } from '../src/features/training/components/WorkoutDetail';
import { TrainingAccessBoundary } from '../src/features/training/components/TrainingAccessBoundary';
import { sessionProgress, seriesCount } from '../src/features/training/utils/progress';
import { LocalReviewSessionStore } from '../src/features/training/stores/LocalReviewSessionStore';
vi.mock('../src/features/training/public-access', () => ({ temporaryPublicTraining: false }));
const available = existsSync('private/training/program.json');
describe.skipIf(!available)('Conteúdo local auditado (excluído do repositório público)', () => {
  it('corresponde ao hash conferido e renderiza integralmente cada ficha A–F', () => {
    const raw = readFileSync('private/training/program.json');
    const program = JSON.parse(raw.toString()) as TrainingProgram;
    const manifest = JSON.parse(readFileSync('private/training/media-manifest.json','utf8')) as MediaManifest;
    const lock = JSON.parse(readFileSync('private/training/audit-lock.json','utf8')) as {programSha256:string};
    expect(createHash('sha256').update(raw).digest('hex')).toBe(lock.programSha256);
    const repository = {getProgram:async()=>program,getWorkout:async(id:string)=>program.workouts.find(w=>w.id===id)!,getMediaManifest:async()=>manifest,getMediaUrl:(id:string)=>`/local-test/${id}.svg`};
    let entries = 0;
    for(const workout of program.workouts) {
      const view = render(<MemoryRouter><WorkoutDetail workout={workout} program={program} manifest={manifest} repository={repository} store={new LocalReviewSessionStore(window.localStorage)} /></MemoryRouter>);
      const rows = view.container.querySelectorAll('.exercise-row-group'); expect(rows).toHaveLength(workout.exercises.length);
      for(const [index,exercise] of workout.exercises.entries()) {
        const row = rows[index];
        for(const value of [exercise.name,exercise.sets,exercise.repetitions,exercise.rest,exercise.method,...exercise.notes].filter(Boolean)) expect(row.textContent).toContain(value);
        expect(within(row as HTMLElement).getByRole('group',{name:`Séries de ${exercise.name}`}).querySelectorAll('button')).toHaveLength(seriesCount(exercise.sets)!);
        entries++;
      }
      const progress = sessionProgress(workout,{completedSets:{},loads:{}}); expect(screen.getByText(`0 de ${progress.total} séries concluídas`)).toBeTruthy();
      view.unmount();
    }
    expect(entries).toBe(59);
  });
});
it('ao encerrar o acesso público, query e localStorage não liberam fichas privadas', async () => {
  window.localStorage.setItem('training-access','authorized'); window.localStorage.setItem('unlock','true');
  render(<MemoryRouter initialEntries={['/treinos/a/exercicio/a-01?unlock=true&review=1']}><Routes><Route path="/treinos/*" element={<TrainingAccessBoundary />} /></Routes></MemoryRouter>);
  expect(await screen.findByRole('heading',{name:'Organização para treinar no seu ritmo.'})).toBeTruthy();
  expect(screen.queryByRole('button',{name:/Série/})).toBeNull(); expect(screen.queryByRole('link',{name:'Treino A'})).toBeNull();
  expect(screen.queryByRole('button',{name:/liberar|desbloquear|login/i})).toBeNull();
  expect(screen.getByRole('link',{name:'Voltar ao site'}).getAttribute('href')).toBe('/');
});
