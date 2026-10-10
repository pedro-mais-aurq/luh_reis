import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { content } from '../features/landing/content';
import { asset } from '../lib/assets';
import { reservedRoutes } from '../config/routes';
import { TrainingPage } from '../features/training/pages/TrainingPage';
function Unavailable() {
  const c = content.reserved;
  return <main className="unavailable"><Link to="/"><img src={asset('brand/logo-dark.svg')} width="176" height="45" alt="Luh Reis" /></Link><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p>{c.description}</p><Link className="button button-primary" to="/">{c.cta}</Link></main>;
}
export function Router() {
  const basename = import.meta.env.BASE_URL || '/';
  return <BrowserRouter basename={basename}><Routes><Route path="/" element={<App />} /><Route path="/treinos/*" element={<TrainingPage />} />{reservedRoutes.filter(path => path !== '/treinos').map(path => <Route key={path} path={path} element={<Unavailable />} />)}<Route path="*" element={<Unavailable />} /></Routes></BrowserRouter>;
}
