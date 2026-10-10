import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactLink } from '../../../components/ui/ContactLink';
import { Reveal } from '../../../components/animations/Reveal';
import { content } from '../content';
import { PublicTrainingPreview } from '../../training/components/PublicTrainingPreview';
export function Program() {
  const c = content.program;
  return <section className="program section" id="programa" aria-labelledby="program-title"><Reveal className="program-copy"><p className="eyebrow">{c.eyebrow}</p><h2 id="program-title">{c.title}<br /><em>{c.titleItalic}</em></h2><p className="section-description">{c.description}</p><div className="program-actions"><Link className="button button-outline" to="/treinos">{c.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link><ContactLink className="text-link">Conversar com a Luh</ContactLink></div><p className="program-note">{c.note}</p></Reveal><Reveal className="program-visual"><PublicTrainingPreview /></Reveal></section>;
}
