import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, Expand, X } from 'lucide-react';
import { Reveal } from '../../../components/animations/Reveal';
import { asset } from '../../../lib/assets';
import { guide } from '../guide';
import { content } from '../content';
export function Plan() {
  const c = content.plan;
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const expandTrigger = useRef<HTMLButtonElement>(null);
  const expandedPage = useRef<HTMLDivElement>(null);
  useEffect(() => { if (expandedPage.current) expandedPage.current.scrollTop = 0; }, [page, expanded]);
  useEffect(() => {
    if (!expanded || !dialog.current) return;
    const modal = dialog.current;
    modal.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.querySelector<HTMLButtonElement>('.pdf-close')?.focus();
    return () => { modal.close(); document.body.style.overflow = previous; expandTrigger.current?.focus(); };
  }, [expanded]);
  const move = (delta:number) => setPage(value => Math.max(0,Math.min(guide.pages.length - 1,value + delta)));
  function controls() {
    return <div className="pdf-pagination"><button type="button" aria-label="Página anterior do PDF" disabled={page === 0} onClick={() => move(-1)}><ArrowLeft size={20} aria-hidden="true" /></button><span role="status" aria-live="polite">Página {page + 1} de {guide.pages.length}</span><button type="button" aria-label="Próxima página do PDF" disabled={page === guide.pages.length - 1} onClick={() => move(1)}><ArrowRight size={20} aria-hidden="true" /></button></div>;
  }
  function pageImage() {
    return <img src={asset(guide.pages[page].image)} alt={guide.pages[page].title} width="1334" height="1888" loading="lazy" decoding="async" />;
  }
  return <section className="plan section" id="plano" aria-labelledby="plan-title">
    <Reveal className="plan-copy"><p className="eyebrow">{c.eyebrow}</p><h2 id="plan-title">{c.title}<br /><em>{c.titleItalic}</em></h2><p className="section-description">{c.description}</p>
      <dl className="plan-facts"><div><dt>04</dt><dd>treinos de força</dd></div><div><dt>02</dt><dd>dias leves opcionais</dd></div><div><dt>40–55</dt><dd>minutos por treino de força</dd></div></dl>
      <p className="plan-includes">Exercícios, séries, repetições, pausas e espaço para registrar suas cargas. Consulte antes de treinar. Leve com você depois.</p>
      <a href={asset(guide.file)} download={guide.downloadName} className="button plan-download">{c.cta}<Download size={20} aria-hidden="true" /></a><p className="plan-note">PDF ilustrado · {guide.pages.length} páginas · download direto</p>
      <p className="handwritten plan-signature">Seu próximo passo já tem um plano.</p>
    </Reveal>
    <Reveal className="plan-reader"><div className="pdf-reader" role="region" aria-label="Visualização do PDF"><div className="pdf-reader-heading"><span>POR DENTRO DO PLANO</span><button type="button" ref={expandTrigger} onClick={() => setExpanded(true)} aria-label="Ampliar visualização do PDF"><Expand size={18} aria-hidden="true" /><span>Ampliar</span></button></div><div className="pdf-page">{pageImage()}</div>{controls()}<a className="pdf-original" href={asset(guide.file)} target="_blank" rel="noopener noreferrer">Abrir PDF completo<ArrowUpRight size={16} aria-hidden="true" /></a></div></Reveal>
    <dialog className="pdf-dialog" ref={dialog} aria-label="Plano de treino Luh Reis ampliado" onCancel={event => { event.preventDefault(); setExpanded(false); }} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={event => { if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);} }}><div className="pdf-dialog-toolbar"><a href={asset(guide.file)} download={guide.downloadName} className="pdf-dialog-download"><Download size={18} aria-hidden="true" />Baixar PDF</a><button className="pdf-close" type="button" onClick={() => setExpanded(false)} aria-label="Fechar visualização do PDF"><X size={24} aria-hidden="true" /></button></div><div className="pdf-dialog-page" ref={expandedPage}>{pageImage()}</div>{controls()}</dialog>
  </section>;
}
