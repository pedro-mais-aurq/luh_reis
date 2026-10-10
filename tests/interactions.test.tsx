import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../src/components/layout/Header';
import { FAQ } from '../src/features/landing/sections/FAQ';
import { PublicTrainingPreview } from '../src/features/training/components/PublicTrainingPreview';
import { App } from '../src/app/App';
import { Router } from '../src/app/router';

describe('FAQ', () => {
  it('abre pelo teclado, fecha a resposta anterior e recolhe a atual', async () => {
    const user = userEvent.setup(); render(<FAQ />);
    const first = screen.getByRole('button', { name: 'O programa já está disponível?' });
    const second = screen.getByRole('button', { name: 'Como será o acesso ao programa?' });
    first.focus(); await user.keyboard('{Enter}');
    expect(first.getAttribute('aria-expanded')).toBe('true');
    expect(document.getElementById(first.getAttribute('aria-controls')!)?.getAttribute('aria-hidden')).toBe('false');
    await user.click(second);
    expect(first.getAttribute('aria-expanded')).toBe('false'); expect(second.getAttribute('aria-expanded')).toBe('true');
    await user.click(second); expect(second.getAttribute('aria-expanded')).toBe('false');
  });
});
describe('Menu mobile', () => {
  it('abre, recebe foco, fecha por navegação e restaura foco e scroll', async () => {
    const user = userEvent.setup(); render(<Header />);
    const trigger = screen.getByRole('button', { name: 'Abrir menu' });
    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Fechar menu' }));
    await user.click(screen.getByRole('navigation', { name: 'Menu mobile' }).querySelector<HTMLAnchorElement>('a[href="#metodo"]')!);
    expect(trigger.getAttribute('aria-expanded')).toBe('false'); expect(document.body.style.overflow).toBe(''); expect(document.activeElement).toBe(trigger);
  });
  it('fecha com cancelamento nativo do Escape', async () => {
    render(<Header />); await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true }));
    expect(screen.getByRole('button', { name: 'Abrir menu' }).getAttribute('aria-expanded')).toBe('false');
  });
});
describe('Prévia do produto', () => {
  it('é uma composição estática, sem navegação por fichas ou prescrições', () => {
    render(<PublicTrainingPreview />);
    expect(screen.getByRole('heading', { name: 'Ficha ilustrativa' })).toBeTruthy();
    expect(screen.queryByRole('tab')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText(/Não representa uma ficha/)).toBeTruthy();
  });
});
describe('Landing e rotas', () => {
  it('resolve todas as âncoras e mantém apresentação logo depois do hero', () => {
    const { container } = render(<MemoryRouter><App /></MemoryRouter>);
    for (const a of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) expect(container.querySelector(a.hash)).not.toBeNull();
    const sections = container.querySelectorAll('main > section');
    expect(sections[0].id).toBe('inicio'); expect(sections[1].id).toBe('sobre');
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Conhecer o programa' }).getAttribute('href')).toBe('/treinos');
    expect(container.querySelector('a[href*="wa.me"]')).toBeNull();
    expect(screen.getByText('Contato direto em breve')).toBeTruthy();
    expect(container.querySelector('section[aria-label="Relatos reais"]')).toBeNull();
  });
  it('mantém o conteúdo visível com movimento reduzido', () => {
    vi.mocked(window.matchMedia).mockImplementation(query => ({ matches: true, media: query, onchange: null, addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(), addListener: vi.fn(), removeListener: vi.fn() }));
    const { container } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(container.querySelector('.reveal-ready')).toBeNull();
  });
  it('respeita subdiretório no router e carrega as fichas públicas', async () => {
    vi.stubEnv('BASE_URL', '/luh-reis/'); window.history.replaceState({}, '', '/luh-reis/treinos');
    render(<Router />);
    expect(await screen.findByRole('heading', { name: /Não foi possível carregar os treinos/ })).toBeTruthy();
    window.history.replaceState({}, '', '/');
  });
});
