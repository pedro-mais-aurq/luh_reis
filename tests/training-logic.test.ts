import { describe, expect, it } from 'vitest';
import { parseRest, formatClock, remainingSeconds } from '../src/features/training/utils/formatting';
import { seriesCount, sessionProgress } from '../src/features/training/utils/progress';
import { LocalReviewSessionStore } from '../src/features/training/stores/LocalReviewSessionStore';
import { localSessionDate } from '../src/features/training/stores/useTrainingSession';
import { sampleWorkout } from './fixtures/training';
describe('Prescrições e progresso', () => {
  it('preserva zero, vazio, minutos compostos e faixas, sem inventar descanso', () => {
    expect(parseRest('')).toBeNull(); expect(parseRest('0')).toEqual({ min:0,max:0 });
    expect(parseRest('1 MINUTO E MEIO')).toEqual({ min:90,max:90 }); expect(parseRest('2 MINUTOS')).toEqual({ min:120,max:120 });
    expect(parseRest('45–60 SEGUNDOS')).toEqual({ min:45,max:60 }); expect(parseRest('1 A 2 MINUTOS')).toEqual({ min:60,max:120 });
    expect(parseRest('60-45 SEGUNDOS')).toBeNull(); expect(parseRest('Não informado')).toBeNull();
  });
  it('conta somente séries válidas e distintas, mantendo sete séries prescritas', () => {
    expect(seriesCount('1X')).toBe(1); expect(seriesCount('7')).toBe(7); expect(seriesCount('3 + 3')).toBeNull();
    expect(sessionProgress(sampleWorkout,{completedSets:{'test-01':[1,1,2,99,-1,1.5],'test-02':[1,7,8],extra:[1]},loads:{}})).toEqual({completed:4,total:10,percent:40});
  });
  it('usa prazo real para retornar corretamente de uma aba sem foco', () => {
    expect(remainingSeconds(45000,500)).toBe(45); expect(remainingSeconds(45000,43010)).toBe(2); expect(remainingSeconds(45000,75000)).toBe(0);
    expect(formatClock(90)).toBe('01:30'); expect(formatClock(-5)).toBe('00:00');
  });
});
describe('Persistência de revisão', () => {
  it('restaura o registro e mantém sessões distintas por programa, ficha e data', () => {
    const store = new LocalReviewSessionStore(window.localStorage);
    const session = {version:1 as const,programId:'p',workoutId:'a',date:'2026-10-09',activity:{completedSets:{e:[1,2]},loads:{e:'12 kg'}}};
    store.write(session); expect(store.read('p','a','2026-10-09')).toEqual(session);
    expect(store.read('p','b','2026-10-09')).toBeNull(); expect(store.read('p','a','2026-10-10')).toBeNull(); expect(store.read('other','a','2026-10-09')).toBeNull();
    store.remove('p','a','2026-10-09'); expect(store.read('p','a','2026-10-09')).toBeNull();
  });
  it('ignora registros corrompidos ou com identidade divergente', () => {
    window.localStorage.setItem('luh-reis:private-review:v1:p:a:d','{broken');
    const store = new LocalReviewSessionStore(window.localStorage); expect(store.read('p','a','d')).toBeNull();
    window.localStorage.setItem('luh-reis:private-review:v1:p:a:d',JSON.stringify({version:1,programId:'wrong',workoutId:'a',date:'d',activity:{completedSets:{},loads:{}}}));
    expect(store.read('p','a','d')).toBeNull();
    expect(localSessionDate(new Date(2026,9,9,23,59))).toBe('2026-10-09');
  });
});
