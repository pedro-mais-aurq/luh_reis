import { Reveal } from '../../../components/animations/Reveal';
import { content } from '../content';
export function Access() {
  const c = content.access;
  return <section className="access section" id="como-funciona" aria-labelledby="access-title"><Reveal className="access-heading"><p className="eyebrow">{c.eyebrow}</p><h2 id="access-title">{c.title}<br /><em>{c.titleItalic}</em></h2><p className="section-description">{c.description}</p><span className="availability-pill"><span className="tiny-dot" />LANÇAMENTO A DEFINIR</span></Reveal><Reveal className="access-steps"><ol>{c.steps.map((s, i) => <li key={s.title}><span className="step-number">0{i + 1}</span><div><h3>{s.title}</h3><p>{s.description}</p></div></li>)}</ol></Reveal></section>;
}
