import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
export function Router() {
  const basename = import.meta.env.BASE_URL || '/';
  return <BrowserRouter basename={basename}><Routes>
    <Route path="/" element={<App />} />
    <Route path="/metodo" element={<Navigate to="/#metodo" replace />} />
    <Route path="/plano" element={<Navigate to="/#plano" replace />} />
    <Route path="/treinos/*" element={<Navigate to="/#plano" replace />} />
    <Route path="/acesso" element={<Navigate to="/#plano" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>;
}
