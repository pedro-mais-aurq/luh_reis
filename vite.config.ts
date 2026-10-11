import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const base = env.VITE_BASE_PATH || '/';
  if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('VITE_BASE_PATH precisa começar e terminar com /.');
  const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, '') || '';
  const escaped = siteUrl.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
  return {
    base, plugins: [react(), { name: 'luh-seo', transformIndexHtml: (html: string) => html.replace('<!-- SITE_META -->', siteUrl ? `<link rel="canonical" href="${escaped}/"><meta property="og:url" content="${escaped}/"><meta property="og:image" content="${escaped}/assets/brand/social-cover.jpg">` : '') }],
    server: { fs: { deny: ['**/.env*', '**/*.{crt,pem}', '**/.git/**', '**/private/**'] } },
    build: { target: 'es2022', sourcemap: false },
  };
});
