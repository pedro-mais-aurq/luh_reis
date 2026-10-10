import { Link } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { ContactLink } from '../../../components/ui/ContactLink';
import { TrainingHeader } from './TrainingHeader';
import { PublicTrainingPreview } from './PublicTrainingPreview';
import { publicTraining } from '../data/publicPreview';
import { whatsappUrl } from '../../../config/site';
export function LockedTrainingView() {
  const c = publicTraining;
  return <div className="training-public"><TrainingHeader /><main className="locked-training"><div className="locked-copy"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}<br /><em>{c.italic}</em></h1><p className="section-description">{c.description}</p><span className="availability-pill"><span className="tiny-dot" />{c.availability}</span><div className="locked-access"><LockKeyhole size={24} aria-hidden="true" /><div><h2>{c.accessTitle}</h2><p>{c.accessDescription}</p></div></div><ContactLink className="button button-primary" fallback={`${import.meta.env.BASE_URL}#contato`}>{c.contact}</ContactLink>{!whatsappUrl && <p className="locked-contact-note">O contato direto será disponibilizado no site em breve.</p>}<Link to="/" className="text-link"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link></div><div className="locked-visual"><PublicTrainingPreview /></div></main><section className="training-public-benefits" aria-label="Proposta do programa">{c.benefits.map(b => <article key={b.number}><span>{b.number}</span><div><h2>{b.title}</h2><p>{b.description}</p></div></article>)}</section></div>;
}
