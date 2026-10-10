import { afterEach, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

afterEach(() => vi.resetModules());
it('CTA configurado usa contato externo válido com mensagem codificada', async () => {
  vi.resetModules();
  vi.stubEnv('VITE_WHATSAPP_PHONE', '5531900000000'); // Fixture sintética de teste.
  const { Contact } = await import('../src/features/landing/sections/Contact');
  render(<Contact />);
  const cta = screen.getByRole('link', { name: 'Fale comigo no WhatsApp' });
  const url = new URL(cta.getAttribute('href')!);
  expect(url.hostname).toBe('wa.me');
  expect(url.searchParams.get('text')).toBe('Olá, Luh! Conheci seu site e gostaria de saber mais sobre seus treinos.');
  expect(cta.getAttribute('target')).toBe('_blank');
  expect(cta.getAttribute('rel')).toContain('noopener');
  expect(screen.queryByText('Contato direto em breve')).toBeNull();
});
