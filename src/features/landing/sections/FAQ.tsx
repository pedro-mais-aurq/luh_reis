import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from '../../../components/animations/Reveal';
import { content } from '../content';
export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const c = content.faq;
  return <section className="faq section" id="duvidas" aria-labelledby="faq-title"><Reveal><p className="eyebrow">{c.eyebrow}</p><h2 id="faq-title">{c.title}<br /><em>{c.titleItalic}</em></h2></Reveal><Reveal className="faq-list">{c.items.map(item => { const open = openId === item.id; return <div className={`faq-item ${open ? 'faq-open' : ''}`} key={item.id}><h3><button type="button" id={`question-${item.id}`} aria-expanded={open} aria-controls={`answer-${item.id}`} onClick={() => setOpenId(open ? null : item.id)}>{item.question}<Plus size={21} aria-hidden="true" /></button></h3><div id={`answer-${item.id}`} aria-labelledby={`question-${item.id}`} aria-hidden={!open} role="region" className="faq-answer" inert={!open}><div><p>{item.answer}</p></div></div></div>; })}</Reveal></section>;
}
