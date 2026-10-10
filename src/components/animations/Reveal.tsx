import { useEffect, useRef, type ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('reveal-ready');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { el.classList.add('is-visible'); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div className={`reveal ${className}`} ref={ref}>{children}</div>;
}
