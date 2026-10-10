import { buildWhatsAppUrl, safeExternalUrl } from '../lib/contact';

export const site = {
  contact: {
    whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '',
    whatsappMessage: 'Olá, Luh! Conheci seu site e gostaria de saber mais sobre seus treinos.',
    instagramUrl: safeExternalUrl(import.meta.env.VITE_INSTAGRAM_URL),
  },
  seo: {
    title: 'Luh Reis · Seu corpo. Seu ritmo. Sua evolução.',
    description: 'Movimento com consciência, orientação e constância, no seu ritmo.',
    siteUrl: import.meta.env.VITE_SITE_URL || '',
  },
  legal: { privacyUrl: '', termsUrl: '' },
  commerce: { provider: null, productId: null, checkoutUrl: null },
} as const;

export const whatsappUrl = buildWhatsAppUrl(site.contact.whatsappPhone, site.contact.whatsappMessage);
