import { Reveal } from '../../../components/animations/Reveal';
import { ContactLink } from '../../../components/ui/ContactLink';
import { asset } from '../../../lib/assets';
import { content } from '../content';
export function About() {
  const c = content.about;
  return <section className="about section" id="sobre" aria-labelledby="about-title">
    <div className="section-index" aria-hidden="true">01 / SOBRE MIM</div>
    <Reveal className="about-visual"><div className="about-photo-frame"><img src={asset('photography/about.webp')} alt="Luh Reis sentada em um momento cotidiano" width="941" height="1672" loading="lazy" /></div><img className="about-inset" src={asset('photography/movement.webp')} alt="Luh Reis em uma academia" width="921" height="1642" loading="lazy" /><span className="handwritten about-note">{c.note}</span></Reveal>
    <Reveal className="about-copy"><p className="eyebrow">{c.eyebrow}</p><h2 id="about-title">{c.title}<br /><em>{c.titleItalic}</em></h2><p className="intro-text">{c.intro}</p>{c.paragraphs.map(p => <p key={p}>{p}</p>)}<ContactLink className="text-link text-link-light">{c.cta}</ContactLink></Reveal>
  </section>;
}
