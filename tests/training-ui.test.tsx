import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SetTracker } from '../src/features/training/components/SetTracker';
import { RestTimer } from '../src/features/training/components/RestTimer';
import { TrainingSchedule } from '../src/features/training/components/TrainingSchedule';
import { WorkoutDetail } from '../src/features/training/components/WorkoutDetail';
import { PrivateTrainingWorkspace } from '../src/features/training/components/PrivateTrainingWorkspace';
import { LocalReviewSessionStore } from '../src/features/training/stores/LocalReviewSessionStore';
import { sampleProgram, sampleWorkout, sampleManifest } from './fixtures/training';
const repository = { getProgram:async()=>sampleProgram,getWorkout:async()=>sampleWorkout,getMediaManifest:async()=>sampleManifest,getMediaUrl:(id:string)=>`/test/${id}.svg` };
afterEach(() => vi.useRealTimers());
describe('Controles do treino', () => {
  it('exibe exatamente sete controles e comunica marcação pelo teclado', () => {
    const toggle = vi.fn(); render(<SetTracker exerciseId="x" name="Teste" sets="7" completed={[1,7]} onToggle={toggle} />);
    const buttons = screen.getAllByRole('button'); expect(buttons).toHaveLength(7); expect(buttons[6].getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(buttons[3]); expect(toggle).toHaveBeenCalledWith('x',4);
  });
  it('inicia, pausa, retoma e reinicia o intervalo com tempo real', () => {
    vi.useFakeTimers(); vi.setSystemTime(0); render(<RestTimer rest="45 SEGUNDOS" name="Teste" />);
    fireEvent.click(screen.getByRole('button',{name:'Iniciar'})); act(()=>vi.advanceTimersByTime(10000)); expect(screen.getByRole('timer').textContent).toBe('00:35');
    fireEvent.click(screen.getByRole('button',{name:'Pausar'})); act(()=>vi.advanceTimersByTime(5000)); expect(screen.getByRole('timer').textContent).toBe('00:35');
    fireEvent.click(screen.getByRole('button',{name:'Retomar'})); act(()=>{vi.setSystemTime(65000);document.dispatchEvent(new Event('visibilitychange'));});
    expect(screen.getByRole('timer').textContent).toBe('00:00'); expect(screen.getByRole('status').textContent).toBe('Intervalo encerrado.');
    expect(screen.getByRole('button',{name:'Retomar'}).hasAttribute('disabled')).toBe(true);
    fireEvent.click(screen.getByRole('button',{name:'Reiniciar'})); expect(screen.getByRole('timer').textContent).toBe('00:45');
  });
  it('mantém a faixa original e aceita duração interna sem mudar a prescrição', () => {
    render(<RestTimer rest="45–60 SEGUNDOS" name="Teste" />); fireEvent.change(screen.getByRole('slider'),{target:{value:'52'}});
    expect(screen.getByRole('timer').textContent).toBe('00:52'); expect(screen.getByText('45–60 SEGUNDOS')).toBeTruthy();
  });
  it('não cria cronômetro quando o descanso é zero ou ausente', () => {
    const view = render(<RestTimer rest="0" name="Teste" />); expect(screen.queryByRole('timer')).toBeNull(); expect(screen.getByText(/valor informado é zero/)).toBeTruthy();
    view.rerender(<RestTimer rest="" name="Teste" />); expect(screen.getByText('Não informado na fonte.')).toBeTruthy(); expect(screen.queryByRole('button')).toBeNull();
  });
  it('marca séries, registra carga e restaura os dados após reabrir a ficha', () => {
    const store = new LocalReviewSessionStore(window.localStorage);
    const props = {workout:sampleWorkout,program:sampleProgram,manifest:sampleManifest,repository,store};
    const view = render(<MemoryRouter><WorkoutDetail {...props} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button',{name:'Série 2 de Movimento de teste'}));
    fireEvent.change(screen.getByRole('textbox',{name:'Carga utilizada em Movimento de teste'}),{target:{value:'12 kg'}});
    expect(screen.getByText('1 de 10 séries concluídas')).toBeTruthy();
    view.unmount(); render(<MemoryRouter><WorkoutDetail {...props} /></MemoryRouter>);
    expect(screen.getByRole('button',{name:'Série 2 de Movimento de teste'}).getAttribute('aria-pressed')).toBe('true');
    expect((screen.getByRole('textbox',{name:'Carga utilizada em Movimento de teste'}) as HTMLInputElement).value).toBe('12 kg');
    fireEvent.click(screen.getByText('Registro local e opções'));
    fireEvent.click(screen.getByRole('button',{name:'Limpar sessão de hoje'})); fireEvent.click(screen.getByRole('button',{name:'Cancelar'})); expect(screen.getByText('1 de 10 séries concluídas')).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Limpar sessão de hoje'})); fireEvent.click(screen.getByRole('button',{name:'Apagar registros'})); expect(screen.getByText('0 de 10 séries concluídas')).toBeTruthy();
  });
  it('minimiza apenas o exercício escolhido e preserva carga e séries ao expandir', () => {
    render(<MemoryRouter><WorkoutDetail workout={sampleWorkout} program={sampleProgram} manifest={sampleManifest} repository={repository} store={new LocalReviewSessionStore(window.localStorage)} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button',{name:'Série 2 de Movimento de teste'}));
    fireEvent.change(screen.getByRole('textbox',{name:'Carga utilizada em Movimento de teste'}),{target:{value:'12 kg'}});
    const toggle = screen.getByRole('button',{name:'Minimizar exercício Movimento de teste'});
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('textbox',{name:'Carga utilizada em Movimento de teste'})).toBeNull();
    expect(screen.queryByRole('link',{name:'Ver imagem de Movimento de teste'})).toBeNull();
    expect(screen.getByRole('heading',{name:'Movimento de teste',level:3})).toBeTruthy();
    expect(within(toggle.closest('tbody')!).getByText('12 + 12')).toBeTruthy();
    expect(screen.getByRole('button',{name:'Minimizar exercício Segundo movimento de teste'}).getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(screen.getByRole('button',{name:'Expandir exercício Movimento de teste'}));
    expect((screen.getByRole('textbox',{name:'Carga utilizada em Movimento de teste'}) as HTMLInputElement).value).toBe('12 kg');
    expect(screen.getByRole('button',{name:'Série 2 de Movimento de teste'}).getAttribute('aria-pressed')).toBe('true');
  });
  it('abre detalhes no desktop e fecha com Escape restaurando foco', () => {
    vi.mocked(window.matchMedia).mockImplementation(q=>({matches:q==='(min-width: 1000px)',media:q,onchange:null,addEventListener:vi.fn(),removeEventListener:vi.fn(),dispatchEvent:vi.fn(),addListener:vi.fn(),removeListener:vi.fn()}));
    render(<MemoryRouter><WorkoutDetail workout={sampleWorkout} program={sampleProgram} manifest={sampleManifest} repository={repository} store={new LocalReviewSessionStore(window.localStorage)} /></MemoryRouter>);
    const trigger = screen.getAllByRole('link',{name:'Detalhes'})[0]; trigger.focus(); fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog'); expect(within(dialog).getByRole('heading',{name:'Movimento de teste'})).toBeTruthy(); expect(document.body.style.overflow).toBe('hidden');
    fireEvent(dialog,new Event('cancel',{bubbles:true})); expect(screen.queryByRole('dialog')).toBeNull(); expect(document.activeElement).toBe(trigger); expect(document.body.style.overflow).toBe('');
  });
  it('abre o intervalo selecionado sob demanda e mantém a contagem ao recolher o painel', () => {
    vi.useFakeTimers(); vi.setSystemTime(0);
    const workout = { ...sampleWorkout, exercises: [sampleWorkout.exercises[0], { ...sampleWorkout.exercises[1], rest:'1 MINUTO E MEIO' }] };
    render(<MemoryRouter><WorkoutDetail workout={workout} program={sampleProgram} manifest={sampleManifest} repository={repository} store={new LocalReviewSessionStore(window.localStorage)} /></MemoryRouter>);
    const panel = screen.getByText('Cronômetro de descanso').closest('details')!;
    expect(panel.open).toBe(false);
    fireEvent.click(screen.getAllByRole('button',{name:'Intervalo'})[1]);
    expect(panel.open).toBe(true);
    expect(screen.getByRole('timer').textContent).toBe('01:30');
    expect(screen.getByRole('region',{name:'Cronômetro de Segundo movimento de teste'})).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Iniciar'}));
    fireEvent.click(screen.getByText('Cronômetro de descanso'));
    expect(panel.open).toBe(false);
    act(()=>vi.advanceTimersByTime(10000));
    fireEvent.click(screen.getByRole('button',{name:'Ver intervalo'}));
    expect(panel.open).toBe(true);
    expect(screen.getByRole('timer').textContent).toBe('01:20');
    expect(screen.getByText('0 de 10 séries concluídas')).toBeTruthy();
  });
  it('trata armazenamento indisponível e imagem quebrada sem perder a ficha', () => {
    const store = {read:()=>null,write:()=>{throw Error('quota');},remove:()=>{}};
    render(<MemoryRouter><WorkoutDetail workout={sampleWorkout} program={sampleProgram} manifest={sampleManifest} repository={repository} store={store} /></MemoryRouter>);
    expect(screen.getByRole('alert').textContent).toContain('não permitiu salvar'); fireEvent.error(screen.getByAltText('Imagem de teste'));
    expect(screen.getAllByRole('img',{name:'Ilustração pendente de revisão'}).length).toBeGreaterThan(0);
  });
});
describe('Periodização e navegação', () => {
  it('consulta todas as frequências e quatro semanas, com sete dias por modelo', () => {
    render(<MemoryRouter><TrainingSchedule schedules={sampleProgram.schedules} /></MemoryRouter>);
    for (const frequency of [2,3,4,5,6]) { fireEvent.click(screen.getByRole('button',{name:`${frequency} dias`})); for(const week of [1,2,3,4]) {fireEvent.click(screen.getByRole('button',{name:`Semana ${week}`})); expect(screen.getByLabelText(`${frequency} dias, semana ${week}`).querySelectorAll('article')).toHaveLength(7);expect(screen.getByLabelText(`${frequency} dias, semana ${week}`).querySelectorAll('a')).toHaveLength(frequency);} }
  });
  it('fornece detalhe como página interna mobile e trata ficha desconhecida', () => {
    const view = render(<MemoryRouter initialEntries={['/treinos/a/exercicio/test-01']}><PrivateTrainingWorkspace program={sampleProgram} manifest={sampleManifest} repository={repository} /></MemoryRouter>);
    expect(screen.getByRole('heading',{name:'Movimento de teste',level:1})).toBeTruthy(); expect(screen.getByText('12 + 12')).toBeTruthy(); expect(screen.getByText('Observação de teste.')).toBeTruthy(); expect(screen.getByText(/aguardam revisão e aprovação profissional/)).toBeTruthy();
    view.unmount(); render(<MemoryRouter initialEntries={['/treinos/unknown']}><PrivateTrainingWorkspace program={sampleProgram} manifest={sampleManifest} repository={repository} /></MemoryRouter>); expect(screen.getByRole('heading',{name:'Ficha não encontrada.'})).toBeTruthy();
  });
});
