import { ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '../../config/site';
export function ContactLink({ children, className = 'button button-primary', fallback = '#contato' }: { children: React.ReactNode; className?: string; fallback?: string }) {
  return <a className={className} href={whatsappUrl || fallback} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined}>{children}<ArrowUpRight size={19} aria-hidden="true" /></a>;
}
