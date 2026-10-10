import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, safeExternalUrl } from '../src/lib/contact';
import { isValidPeriodization } from '../src/features/training/catalog.schema';
import type { Periodization } from '../src/features/training/types';

describe('Contato', () => {
  it('não cria um destino para números ausentes, incompletos ou inválidos', () => {
    for (const phone of ['', '123', 'javascript:alert(1)', '0' + '1'.repeat(14), '1'.repeat(16)]) expect(buildWhatsAppUrl(phone, 'Olá')).toBeNull();
  });
  it('formata um telefone de teste e codifica a mensagem sem alterar caracteres', () => {
    const phone = '+55 (31) 90000-0000'; // Fixture sintética, nunca publicada como contato.
    const message = 'Olá, Luh! Treino & rotina?';
    const url = new URL(buildWhatsAppUrl(phone, message)!);
    expect(url.hostname).toBe('wa.me'); expect(url.pathname).toBe('/5531900000000'); expect(url.searchParams.get('text')).toBe(message);
  });
  it('rejeita URLs não HTTPS', () => {
    expect(safeExternalUrl('javascript:alert(1)')).toBeNull(); expect(safeExternalUrl('http://example.com')).toBeNull(); expect(safeExternalUrl('https://example.com')).toBe('https://example.com/');
  });
});
describe('Periodização', () => {
  const plan: Periodization = { id: 'test', programId: 'test', weeklyFrequency: 1, weeks: [{ week: 1, days: [{ day: 'monday', workoutIds: ['A'], recovery: false }] }] };
  it('aceita uma organização compatível com a frequência semanal', () => expect(isValidPeriodization(plan)).toBe(true));
  it('rejeita frequência incompatível e dias duplicados', () => {
    expect(isValidPeriodization({ ...plan, weeklyFrequency: 2 })).toBe(false);
    expect(isValidPeriodization({ ...plan, weeks: [{ week: 1, days: [...plan.weeks[0].days, ...plan.weeks[0].days] }] })).toBe(false);
  });
  it('não aceita um treino em dia marcado como recuperação', () => expect(isValidPeriodization({ ...plan, weeks: [{ week: 1, days: [{ day: 'monday', workoutIds: ['A'], recovery: true }] }] })).toBe(false));
});
