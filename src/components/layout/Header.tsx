import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation } from '../../config/navigation';
import { content } from '../../features/landing/content';
import { useActiveSection } from '../../hooks/useActiveSection';
import { asset } from '../../lib/assets';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const active = useActiveSection();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const d = dialog.current;
    if (!d) return;
    d.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    d.querySelector<HTMLButtonElement>('button')?.focus();
    return () => { d.close(); document.body.style.overflow = previous; trigger.current?.focus(); };
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1001px)');
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);
  return <>
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <a className="wordmark" href="#inicio" aria-label="Luh Reis, início"><img src={asset('brand/logo-dark.svg')} width="158" height="40" alt="Luh Reis" /></a>
      <nav className="desktop-nav" aria-label={content.navigation.label}>{navigation.map(n => <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'location' : undefined}>{n.label}</a>)}</nav>
      <a className="header-contact" href="#plano">{content.navigation.contact}</a>
      <button type="button" ref={trigger} className="menu-trigger" aria-label={content.navigation.open} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu size={25} /></button>
    </header>
    <dialog className="mobile-menu" id="mobile-menu" ref={dialog} aria-label={content.navigation.label} onCancel={() => setOpen(false)} onClick={e => { if (e.target === dialog.current) setOpen(false); }}>
      <div className="mobile-menu-heading"><img src={asset('brand/logo-dark.svg')} width="150" height="38" alt="Luh Reis" /><button type="button" aria-label={content.navigation.close} onClick={() => setOpen(false)}><X size={28} /></button></div>
      <nav aria-label="Menu mobile">{navigation.map((n, i) => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} aria-current={active === n.id ? 'location' : undefined}><span>0{i + 1}</span>{n.label}</a>)}</nav>
      <p className="handwritten">{content.hero.note}</p>
    </dialog>
  </>;
}
