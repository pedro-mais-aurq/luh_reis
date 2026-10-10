import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../../../components/animations/Reveal';
import { ContactLink } from '../../../components/ui/ContactLink';
import { asset } from '../../../lib/assets';
import { content } from '../content';
export function Method() {
  const c = content.method;
  return <section className="method section" id="metodo" aria-labelledby="method-title">
    <Reveal className="method-left"><p className="eyebrow">{c.eyebrow}</p><h2 id="method-title">{c.title}<br /><em>{c.titleItalic}</em></h2><p className="section-description">{c.description}</p><div className="method-photo"><img src={asset('photography/training.webp')} alt="Luh Reis se preparando para se movimentar em uma academia" width="1000" height="1658" loading="lazy" /><span className="handwritten">{c.note}</span></div></Reveal>
    <Reveal className="method-right"><div className="principles">{c.principles.map((p, i) => <article className="principle" key={p.title}><span className="principle-number">0{i + 1}</span><div><h3>{p.title}</h3><p>{p.description}</p></div></article>)}</div><div className="method-actions"><ContactLink>{c.primary}</ContactLink><a href="#programa" className="text-link">{c.secondary}<ArrowUpRight size={18} aria-hidden="true" /></a></div></Reveal>
  </section>;
}
