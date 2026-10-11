import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plan } from '../src/features/landing/sections/Plan';

describe('Visualização e download do PDF', () => {
  it('percorre as seis páginas e bloqueia os limites de navegação', async () => {
    const user = userEvent.setup(); render(<Plan />);
    const reader = within(screen.getByRole('region', { name: 'Visualização do PDF' }));
    const previous = reader.getByRole<HTMLButtonElement>('button', { name: 'Página anterior do PDF' });
    const next = reader.getByRole<HTMLButtonElement>('button', { name: 'Próxima página do PDF' });
    expect(previous.disabled).toBe(true);
    for (let page = 2; page <= 6; page++) {
      await user.click(next);
      expect(reader.getByRole('status').textContent).toBe(`Página ${page} de 6`);
      expect(reader.getByRole('img').getAttribute('src')).toBe(`/assets/guide/page-${page}-ilustrado.webp`);
    }
    expect(next.disabled).toBe(true);
    await user.click(next);
    expect(reader.getByRole('status').textContent).toBe('Página 6 de 6');
    await user.click(previous);
    expect(reader.getByRole('status').textContent).toBe('Página 5 de 6');
  });
  it('amplia a página atual, navega pelo teclado e restaura foco e rolagem', async () => {
    const user = userEvent.setup(); render(<Plan />);
    const reader = within(screen.getByRole('region', { name: 'Visualização do PDF' }));
    await user.click(reader.getByRole('button', { name: 'Próxima página do PDF' }));
    document.body.style.overflow = 'auto';
    const trigger = screen.getByRole('button', { name: 'Ampliar visualização do PDF' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Plano de treino Luh Reis ampliado' });
    const modal = within(dialog);
    expect(modal.getByRole('status').textContent).toBe('Página 2 de 6');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement).toBe(modal.getByRole('button', { name: 'Fechar visualização do PDF' }));
    const pane = dialog.querySelector<HTMLDivElement>('.pdf-dialog-page')!;
    pane.scrollTop = 400;
    await user.keyboard('{ArrowRight}');
    expect(modal.getByRole('status').textContent).toBe('Página 3 de 6');
    expect(pane.scrollTop).toBe(0);
    await user.keyboard('{ArrowLeft}');
    expect(modal.getByRole('status').textContent).toBe('Página 2 de 6');
    fireEvent(dialog, new Event('cancel', { bubbles: true, cancelable: true }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.body.style.overflow).toBe('auto');
    expect(document.activeElement).toBe(trigger);
    document.body.style.overflow = '';
  });
  it('fecha a ampliação pelo botão e pelo fundo do diálogo', async () => {
    const user = userEvent.setup(); render(<Plan />);
    const trigger = screen.getByRole('button', { name: 'Ampliar visualização do PDF' });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Fechar visualização do PDF' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(trigger);
    fireEvent.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });
  it('aponta a visualização e o download para o mesmo PDF no subdiretório', () => {
    vi.stubEnv('BASE_URL', '/luh-reis/'); render(<Plan />);
    const download = screen.getByRole('link', { name: 'Baixar meu plano e começar' });
    const original = screen.getByRole('link', { name: 'Abrir PDF completo' });
    expect(download.getAttribute('href')).toBe('/luh-reis/assets/guide/plano-luh-reis-ilustrado.pdf');
    expect(download.getAttribute('download')).toBe('Plano-de-Treino-Luh-Reis-Ilustrado.pdf');
    expect(original.getAttribute('href')).toBe(download.getAttribute('href'));
    expect(original.getAttribute('target')).toBe('_blank');
    expect(original.getAttribute('rel')).toContain('noopener');
    expect(screen.getByRole('region', { name: 'Visualização do PDF' }).querySelector('img')?.getAttribute('src')).toBe('/luh-reis/assets/guide/page-1-ilustrado.webp');
  });
});
