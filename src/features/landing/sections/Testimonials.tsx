import { testimonials } from '../content';
export function Testimonials() {
  const approved = testimonials.filter(t => t.authorized && t.confirmed);
  if (!approved.length) return null;
  return <section className="testimonials section" aria-label="Relatos reais">{approved.map(t => <figure key={t.id}><blockquote>{t.quote}</blockquote><figcaption>{t.name}</figcaption></figure>)}</section>;
}
