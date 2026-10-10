import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../../../components/animations/Reveal';
import { asset } from '../../../lib/assets';
import { site, whatsappUrl } from '../../../config/site';
import { content } from '../content';
export function Contact() {
  const c = content.contact;
  return <section className="contact section" id="contato" aria-labelledby="contact-title"><Reveal className="contact-copy"><p className="eyebrow">{c.eyebrow}</p><h2 id="contact-title">{c.title}<br /><em>{c.titleItalic}</em></h2><p className="section-description">{c.description}</p>{whatsappUrl ? <a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{c.cta}<ArrowUpRight size={19} aria-hidden="true" /></a> : <div className="contact-pending"><strong>{c.pendingTitle}</strong><p>{c.pendingDescription}</p><span>{c.pendingStatus}</span>{site.contact.instagramUrl && <a className="text-link text-link-light" href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer">Fale comigo no Instagram<ArrowUpRight size={18} aria-hidden="true" /></a>}</div>}<p className="handwritten contact-note">{c.note}</p></Reveal><Reveal className="contact-photo"><img src={asset('photography/contact.webp')} alt="Luh Reis durante um treino na academia" width="921" height="1642" loading="lazy" /><span className="photo-corner" aria-hidden="true">LUH<br />REIS</span></Reveal></section>;
}
