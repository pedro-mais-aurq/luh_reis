import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PublicTrainingBoundary from '../src/features/training/components/PublicTrainingBoundary';
import { PublicTrainingRepository } from '../src/features/training/repositories/PublicTrainingRepository';
import { sampleProgram, sampleManifest } from './fixtures/training';
afterEach(() => vi.unstubAllGlobals());
describe('Acesso público temporário', () => {
  it('carrega fichas sem login, resolve GIFs em subdiretório e preserva a prescrição', async () => {
    vi.stubEnv('BASE_URL','/luh-reis/');
    const manifest = {...sampleManifest, assets:sampleManifest.assets.map(a=>({...a,file:`media/${a.id}.gif`}))};
    const fetchMock = vi.fn(async (url:string) => ({ok:true,json:async()=>url.endsWith('program.json')?sampleProgram:manifest}));
    vi.stubGlobal('fetch', fetchMock);
    const repository = new PublicTrainingRepository();
    expect(await repository.getWorkout('a')).toEqual(sampleProgram.workouts[0]);
    await repository.getMediaManifest();
    expect(repository.getMediaUrl(manifest.assets[0].id)).toBe(`/luh-reis/training/media/${manifest.assets[0].id}.gif`);
    render(<MemoryRouter initialEntries={['/treinos/a']}><PublicTrainingBoundary /></MemoryRouter>);
    expect(await screen.findByRole('heading',{name:'Treino A',level:1})).toBeTruthy();
    expect(screen.getByRole('button',{name:'Minimizar exercício Movimento de teste'})).toBeTruthy();
    expect(screen.queryByText('Revisão local · material em aprovação')).toBeNull();
    expect(screen.getByText('Acesso público temporário ao programa de treinos.')).toBeTruthy();
    expect(fetchMock.mock.calls.every(([url])=>url.startsWith('/luh-reis/training/'))).toBe(true);
  });
  it('permite tentar novamente após uma falha de carregamento', async () => {
    let fail = true;
    vi.stubGlobal('fetch', vi.fn(async (url:string) => ({ok:!fail,json:async()=>url.endsWith('program.json')?sampleProgram:sampleManifest})));
    render(<MemoryRouter><PublicTrainingBoundary /></MemoryRouter>);
    expect(await screen.findByRole('alert')).toBeTruthy();
    fail=false;fireEvent.click(screen.getByRole('button',{name:'Tentar novamente'}));
    expect(await screen.findByRole('heading',{name:/Clareza para/})).toBeTruthy();
  });
});
