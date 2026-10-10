# Luh Reis — P2

Projeto React 19, TypeScript strict e Vite. A landing da P1 está preservada, inclusive o enquadramento responsivo do hero. A P2 acrescenta uma apresentação pública do programa e uma plataforma completa de treinos. Desde 10/10/2026, as fichas estão abertas ao público até nova orientação.

## Instalação

Usar Node.js 22.12 ou superior da linha 22, conforme `.nvmrc`.

```bash
nvm use
npm ci
cp .env.example .env.local
```

## Duas entregas, dois usos

- **Luh-Reis-P2-Publico.zip**: código publicável e `dist/`, incluindo as fichas públicas e as mídias selecionadas do cliente. Serve para GitHub Pages e o site institucional.
- **Luh-Reis-P2-Revisao-Local.zip**: o mesmo código, acompanhado de `private/training/`, para revisão neste computador. Não publicar este arquivo ou a pasta `private/`.

O repositório contém o programa e as mídias autorizadas em `public/training/`. A fonte original de revisão permanece ignorada pelo Git. Nenhum dos pacotes contém `node_modules`, credenciais, histórico Git ou os PDFs fornecidos.

## Experiência pública

```bash
npm run dev
npm run build
npm run preview
npm run audit:public
node scripts/verify-build.mjs
```

`/` mantém a landing. `/treinos` e suas rotas internas oferecem as seis fichas A–F, exercícios, periodização, cronômetro e registro local, sem login ou pagamento. O acesso público temporário está autorizado até segunda ordem. O controle está em `src/features/training/public-access.ts`; para uma futura restrição real, também retirar `public/training/` do build e restringir o acesso no servidor. Apenas esconder a interface não protege arquivos públicos.

O número de WhatsApp ainda não foi confirmado. Sem configuração válida, o contato retorna à seção institucional `#contato`, incluindo quando o site está em um subdiretório. Nenhum número fictício foi publicado.

## Revisão local completa

Extrair **Luh-Reis-P2-Revisao-Local.zip**, entrar na pasta `luh-reis` e executar:

```bash
npm ci
npm run review:private
```

Abrir **http://127.0.0.1:5174/treinos** no mesmo computador. Encerrar com Ctrl+C. Para esta revisão, manter `VITE_BASE_PATH=/` na configuração local.

O comando habilita exclusivamente um middleware de desenvolvimento e escuta em loopback. A revisão não pode ser aberta pela rede, publicada ou habilitada por query string, botão ou localStorage. Requisições de origem externa, hosts não locais, arquivos arbitrários e imports de dados privados são recusados. A flag de revisão habilitada em um build provoca erro.

A revisão inclui:

- Seis fichas A–F com 59 entradas, na ordem do PDF original de sete páginas.
- Séries, repetições, descansos, métodos, grupos e observações textuais preservados.
- Seis capas distintas e 59 recursos de exercícios, com origem e licença registradas. Ilustrações em revisão ou explicitamente pendentes.
- Tabela no desktop e exercícios verticais no mobile; detalhes em diálogo no desktop ou página interna em telas menores.
- Marcação exata de séries, anotação opcional de carga e progresso calculado pelas séries marcadas.
- Cronômetro com início, pausa, retomada e reinício. Usa timestamps, reconcilia quando a aba volta ao foco e termina sem iniciar outra ação. Descanso zero e ausência de descanso permanecem distintos; faixas futuras aceitam seleção dentro do intervalo original.
- Todas as cinco frequências semanais e quatro semanas por frequência da periodização original.

A sessão é salva por programa, ficha e data local, somente neste navegador. Não existe conta ou sincronização. Ao mudar a data, inicia-se o registro daquele dia. A limpeza de sessão pede confirmação na interface e apaga apenas séries e cargas da ficha atual. Se o armazenamento for recusado, a tela informa que o registro não foi salvo.

A referência original não é atribuída a Luh Reis. A revisão não apresenta o material como produto aprovado. O PDF adaptado de 12 páginas não foi combinado nem usado para substituir o programa.

## Validação

```bash
npm run typecheck
npm test
npm run audit:content   # somente no pacote com private/training
npm run build
npm run audit:public
node scripts/verify-build.mjs
```

O teste que percorre as fichas reais lê somente arquivos locais privados. Em um checkout publicável sem essa pasta, esse teste é explicitamente pulado; os demais usam fixtures sintéticas. A auditoria privada compara o hash da transcrição com a conferência visual e valida registros, grupos, periodização e mídia. A auditoria pública examina toda a saída e recusa fichas, nomes de exercícios, assets privados, endpoints de revisão, PDF e source maps.

Veja `VALIDACAO.md`. A revisão visual em Safari, Chrome, Firefox e dispositivos reais permanece pendente; testes em DOM simulado não comprovam layout ou o comportamento nativo do navegador.

## Organização e personalização

- `src/features/landing/content.ts`: textos institucionais.
- `src/features/training/data/publicPreview.ts`: conteúdo demonstrativo público, sem prescrições.
- `src/features/training/components/`: biblioteca, ficha, detalhes, séries, cronômetro e periodização.
- `TrainingRepository`: contrato de obtenção de programa, fichas e mídia.
- `TrainingAccessBoundary`: produção pública bloqueada; revisão local disponível exclusivamente em desenvolvimento autorizado pelo middleware.
- `PrivateTrainingWorkspace`: interface isolada da revisão; removida do grafo de produção.
- `TrainingSessionStore`: contrato de armazenamento substituível por uma API autenticada futura.
- `src/config/site.ts`: contato, SEO e configuração comercial pública.
- `src/styles/tokens.css`: tokens de marca; `training-public.css` e `training-private.css` separam as interfaces.
- `private/training/program.json`: transcrição completa para revisão, nunca importada pelos componentes.
- `private/training/media-manifest.json`: associação de mídia, origem, licença e estado de revisão.
- `private/training/AUDITORIA-PDF.md`: conferência visual e ambiguidades da fonte.
- `private/training/audit-lock.json`: hash da transcrição conferida.

As fontes Poppins e Coming Soon são servidas localmente, com licenças OFL. Times New Roman usa a fonte do dispositivo e fallbacks Times/serif. Os retratos reais da P1 continuam nos mesmos arquivos e proporções.

### Contato e SEO

Preencher `VITE_WHATSAPP_PHONE` com número aprovado, país e DDD, somente dígitos. A mensagem está centralizada em `src/config/site.ts`. Preencher `VITE_INSTAGRAM_URL` com URL verificada. `VITE_SITE_URL` deve conter a URL final, incluindo subdiretório, sem barra final; o build gera canonical, Open Graph, robots e sitemap. Sem URL final, a indexação fica suspensa.

Não colocar tokens, segredos ou credenciais em variáveis frontend. O contato, condições comerciais, termos, preço e validade do acesso permanecem pendentes.

## GitHub Pages

1. Enviar somente o pacote publicável para o repositório em `main`.
2. Em Settings → Pages, selecionar GitHub Actions.
3. Configurar as variáveis públicas de contato, se aprovadas.
4. O workflow usa Node 22, instalação com lockfile, TypeScript, testes, build, auditoria pública e verificação de assets antes de publicar `dist/`.

```bash
VITE_BASE_PATH=/nome-do-repositorio/ VITE_SITE_URL=https://SEU_USUARIO.github.io/nome-do-repositorio npm run build
VITE_BASE_PATH=/nome-do-repositorio/ node scripts/verify-build.mjs
npm run audit:public
```

Para domínio próprio, usar `VITE_BASE_PATH=/` e a URL HTTPS final. O domínio anterior não foi alterado. Vite e Router usam o mesmo base path. `404.html` permite renderizar rotas SPA no Pages; o acesso direto pode responder HTTP 404 antes da renderização. `/metodo` e `/acesso` permanecem informativas; `/treinos/*` apresenta somente a experiência pública bloqueada.

GitHub Pages hospeda a interface estática. A P3 deverá fornecer autenticação, compra verificada e dados por backend protegido. Os contratos de comércio, Google/Auth, acesso por produto, validade e armazenamento existem; nenhuma integração foi implementada. LocalStorage, queries e ocultação visual não autorizam acesso.

## Refinamento de UX

A página de treinos mantém a organização da P2 com uma leitura mais simples. A ficha destaca imagem, séries, repetições e descanso; método e observações continuam disponíveis por expansão e nos detalhes. Orientações gerais e opções do registro local também são expansíveis.

O cronômetro fica recolhido até selecionar **Intervalo** em um exercício ou **Ver intervalo** no rodapé. Recolher o painel não interrompe uma contagem em andamento.

As imagens dos exercícios ocupam 180 px no desktop e a largura do card no mobile. Capas maiores, textos ampliados e áreas em branco, verde-musgo e verde-claro reduzem a densidade visual. Os fundos, títulos, botões e progresso priorizam verde e branco; tons quentes permanecem apenas em pequenos detalhes das ilustrações. As prescrições, registros, periodização e a proteção do conteúdo permanecem preservados.

## Antes do lançamento

Aprovar autoria/autorização de uso do programa, conteúdo técnico, imagens e textos de execução. O programa adaptado exige decisão explícita antes de substituir a referência. Implementar e validar os serviços seguros da P3 e executar a revisão visual em navegadores reais.

Consulte `PENDENCIAS.md`, `ASSETS.md` e, no pacote local, `private/training/AUDITORIA-PDF.md`.
