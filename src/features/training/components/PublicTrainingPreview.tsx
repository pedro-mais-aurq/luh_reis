import { Check, LockKeyhole } from 'lucide-react';
import { asset } from '../../../lib/assets';
import { publicTraining } from '../data/publicPreview';
export function PublicTrainingPreview() {
  const c = publicTraining.demo;
  return <div className="public-phone-preview" aria-label="Prévia ilustrativa da organização do programa"><div className="phone-camera" aria-hidden="true" /><div className="phone-brand">LUH REIS<span>PRÉVIA</span></div><p className="eyebrow">SEU ESPAÇO DE TREINOS</p><h3>{c.title}</h3><img src={asset('illustrations/program-demo.svg')} alt="Composição editorial de equipamentos esportivos" width="400" height="280" loading="lazy" /><div className="phone-exercise"><strong>{c.exercise}</strong><div><span>Séries <b>—</b></span><span>Repetições <b>—</b></span><span>Intervalo <b>—</b></span></div></div><div className="phone-status"><Check size={15} aria-hidden="true" />Informação clara. Consulta simples.</div><div className="phone-lock"><LockKeyhole size={14} aria-hidden="true" />Programa em preparação</div><p className="public-preview-note">{c.note}</p></div>;
}
