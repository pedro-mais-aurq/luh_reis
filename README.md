# Luh Reis — Destrave Delas

Landing comercial em React 19, TypeScript e Vite. A apresentação da personal é seguida pelo método Destrave Delas e pelo plano em PDF. A antiga plataforma de treinos foi removida.

## Executar e validar

Use Node.js 22.12 ou superior da linha 22, conforme `.nvmrc`.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

```bash
npm run typecheck
npm test
npm run build
npm run audit:public
node scripts/verify-build.mjs
npm run preview
```

## PDF e conteúdo

- `src/features/landing/content.ts`: textos da landing, método, CTAs e perguntas frequentes.
- `src/features/landing/guide.ts`: PDF, nome do download e páginas da prévia.
- `src/features/landing/sections/Plan.tsx`: leitor paginado, ampliação, navegação por teclado e download direto.
- `public/assets/guide/plano-luh-reis-ilustrado.pdf`: PDF ilustrado fornecido, preservado sem edição do conteúdo.
- `public/assets/guide/page-1-ilustrado.webp` a `page-6-ilustrado.webp`: páginas renderizadas do mesmo PDF para visualização consistente no celular e no desktop.
- `src/config/site.ts`: contato e SEO; `src/styles/plan.css`: visualização do PDF e destaques comerciais.

O PDF contém quatro treinos de força e dois dias leves opcionais. A visualização da landing usa imagens das seis páginas; o arquivo completo pode ser aberto no leitor do navegador ou baixado. A ampliação usa diálogo nativo, restaura o foco e a rolagem ao fechar e aceita as setas do teclado para trocar páginas.

Os antigos endereços `/treinos/*` e `/acesso` redirecionam para `/#plano`. `/metodo` leva a `/#metodo`. Não há fichas interativas, login, cronômetro ou registro local nesta versão.

As fotos fornecidas e a descrição aprovada do sobre mim foram preservadas. Poppins e Coming Soon são servidas localmente com licenças OFL. O enquadramento do hero mantém a proporção intrínseca da imagem.

## Contato e SEO

Preencha `VITE_WHATSAPP_PHONE` com o telefone oficial, incluindo país e DDD. `VITE_INSTAGRAM_URL` aceita uma URL HTTPS. Enquanto o contato não estiver configurado, os links de conversa levam à seção de contato existente. Nenhum telefone fictício foi publicado.

`VITE_SITE_URL` deve ser a URL HTTPS completa, incluindo o subdiretório quando necessário, sem barra final. Ela configura canonical, Open Graph, robots e sitemap. Use somente configurações públicas no frontend.

## Deploy no GitHub Pages

O workflow único `.github/workflows/deploy-pages.yml` instala com lockfile, executa TypeScript e testes, gera o build e confere o PDF e os assets antes de publicar `dist/`.

1. Envie o código para `main` no seu repositório.
2. Em Settings → Pages, selecione GitHub Actions.
3. Configure as variáveis públicas de contato quando disponíveis.

O workflow calcula automaticamente a URL e o caminho base pelo GitHub Pages. Para verificar manualmente um repositório em subdiretório:

```bash
VITE_BASE_PATH=/nome-do-repositorio/ VITE_SITE_URL=https://SEU_USUARIO.github.io/nome-do-repositorio npm run build
VITE_BASE_PATH=/nome-do-repositorio/ node scripts/verify-build.mjs
npm run audit:public
```

Para domínio próprio, use `VITE_BASE_PATH=/` e a URL HTTPS final. O arquivo `404.html` serve como fallback das rotas no Pages; um endereço antigo pode responder HTTP 404 antes de renderizar o redirecionamento.

Consulte `VALIDACAO.md` e `ASSETS.md` para a origem do PDF e o escopo das verificações.
