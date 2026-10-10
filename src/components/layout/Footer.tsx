import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../../lib/assets';
import { brand } from '../../config/brand';
import { navigation } from '../../config/navigation';
import { site } from '../../config/site';
import { content } from '../../features/landing/content';
export function Footer() {
  return <footer className="footer">
    <div className="footer-main"><div><Link to="/" className="wordmark"><img src={asset('brand/logo-light.svg')} width="176" height="45" alt="Luh Reis" /></Link><p>{brand.profession}</p></div><p className="footer-signature">{content.footer.tagline}</p><a className="back-top" href="#inicio" aria-label={content.footer.top}><ArrowUp size={24} /></a></div>
    <div className="footer-nav"><nav aria-label="Navegação do rodapé">{navigation.map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}</nav>{site.contact.instagramUrl && <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a>}</div>
    <div className="footer-bottom"><small>© {new Date().getFullYear()} {brand.name}. {content.footer.rights}</small><div>{site.legal.privacyUrl && <a href={site.legal.privacyUrl}>Privacidade</a>}{site.legal.termsUrl && <a href={site.legal.termsUrl}>Termos de uso</a>}</div></div>
  </footer>;
}
