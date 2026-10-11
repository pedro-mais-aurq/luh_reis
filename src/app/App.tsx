import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../features/landing/sections/Hero';
import { About } from '../features/landing/sections/About';
import { Method } from '../features/landing/sections/Method';
import { Plan } from '../features/landing/sections/Plan';
import { Testimonials } from '../features/landing/sections/Testimonials';
import { FAQ } from '../features/landing/sections/FAQ';
import { Contact } from '../features/landing/sections/Contact';
import { content } from '../features/landing/content';
export function App() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  return <><a className="skip-link" href="#main">{content.navigation.skip}</a><Header /><main id="main"><Hero /><About /><Method /><Plan /><Testimonials /><FAQ /><Contact /></main><Footer /></>;
}
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
