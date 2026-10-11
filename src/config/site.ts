import { buildWhatsAppUrl, safeExternalUrl } from '../lib/contact';

export const site = {
  contact: {
    whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '',
    whatsappMessage: 'Olá, Luh! Conheci seu site e gostaria de saber mais sobre seus treinos.',
    instagramUrl: safeExternalUrl(import.meta.env.VITE_INSTAGRAM_URL),
  },
  seo: {
    title: 'Luh Reis · Destrave Delas',
    description: 'Conheça a Luh Reis e o método Destrave Delas. Consulte e baixe seu plano de treino para dar o primeiro passo.',
    siteUrl: import.meta.env.VITE_SITE_URL || '',
  },
  legal: { privacyUrl: '', termsUrl: '' },
} as const;

export const whatsappUrl = buildWhatsAppUrl(site.contact.whatsappPhone, site.contact.whatsappMessage);
