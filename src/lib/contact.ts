export function buildWhatsAppUrl(phone: string, message: string): string | null {
  const digits = phone.replace(/[\s()+-]/g, '');
  if (!/^[1-9]\d{9,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
export function safeExternalUrl(value?: string): string | null {
  if (!value) return null;
  try { const u = new URL(value); return u.protocol === 'https:' ? u.href : null; } catch { return null; }
}
