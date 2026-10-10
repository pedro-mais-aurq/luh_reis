import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { asset } from '../../../lib/assets';
export function TrainingHeader({ review = false }: { review?: boolean }) {
  return <header className="training-header"><Link to="/" aria-label="Luh Reis, site institucional"><img src={asset('brand/logo-dark.svg')} width="140" height="36" alt="Luh Reis" /></Link><span className="training-header-title">Seu espaço de treinos</span><nav aria-label="Navegação do programa">{review && <><Link to="/treinos#biblioteca">Fichas</Link><Link to="/treinos#periodizacao">Periodização</Link></>}<Link to="/">Site institucional<ArrowUpRight size={16} aria-hidden="true" /></Link></nav></header>;
}
