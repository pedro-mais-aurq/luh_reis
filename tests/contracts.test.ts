import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, safeExternalUrl } from '../src/lib/contact';

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
