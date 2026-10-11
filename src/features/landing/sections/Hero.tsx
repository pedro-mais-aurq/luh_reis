import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { asset } from '../../../lib/assets';
import { content } from '../content';
import { ContactLink } from '../../../components/ui/ContactLink';
export function Hero() {
  const c = content.hero;
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <div className="hero-copy"><p className="eyebrow hero-enter"><span className="tiny-dot" />{c.eyebrow}</p>
      <h1 id="hero-title" className="hero-enter"><span>{c.headline[0]}</span><em>{c.headline[1]}</em><span>{c.headline[2]}</span></h1>
      <p className="hero-description hero-enter">{c.description}</p>
      <div className="hero-actions hero-enter"><a href="#plano" className="button button-primary">{c.primary}<ArrowUpRight size={19} aria-hidden="true" /></a><ContactLink className="text-link">{c.secondary}</ContactLink></div>
      <p className="hero-credentials hero-enter">Mais de 15 anos de formação em Educação Física<span>Especialista em Treinamento Esportivo</span></p>
      <a className="hero-scroll hero-enter" href="#sobre"><span>{c.note}</span><ArrowDown size={18} aria-hidden="true" /></a>
    </div>
    <div className="hero-art"><div className="hero-arch" aria-hidden="true" /><picture><source media="(max-width: 600px)" srcSet={asset('photography/hero-mobile.webp')} /><img className="hero-photo" src={asset('photography/hero.webp')} alt="Luh Reis em um retrato com roupa preta na academia" width="1024" height="1024" fetchPriority="high" /></picture><span className="hero-handwritten handwritten">a vida acontece.<br />o movimento também.</span><div className="hero-photo-caption"><span>LUH REIS</span><span>Consciência & constância</span></div></div>
  </section>;
}
