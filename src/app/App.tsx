import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../features/landing/sections/Hero';
import { About } from '../features/landing/sections/About';
import { Method } from '../features/landing/sections/Method';
import { Program } from '../features/landing/sections/Program';
import { Access } from '../features/landing/sections/Access';
import { Testimonials } from '../features/landing/sections/Testimonials';
import { FAQ } from '../features/landing/sections/FAQ';
import { Contact } from '../features/landing/sections/Contact';
import { content } from '../features/landing/content';
import { features } from '../config/features';
export function App() {
  return <><a className="skip-link" href="#main">{content.navigation.skip}</a><Header /><main id="main"><Hero /><About /><Method />{features.programPreview && <Program />}<Access /><Testimonials /><FAQ /><Contact /></main><Footer /></>;
}
