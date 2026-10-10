# Atualização de 10/10/2026

Acesso público temporário autorizado pelo cliente, com as fichas A–F incluídas em `public/training/`. Substituídas as fotos do hero, apresentação e contato junto ao rodapé. Texto de apresentação aplicado conforme enviado. 34 entradas recebem mídias do ZIP; 25 conservam as ilustrações anteriores. Todas as prescrições permanecem iguais à fonte original. Os registros seguem locais ao navegador. Nesta rodada passaram 37 testes, TypeScript e o build de produção. A auditoria confirmou as 59 entradas, as seis fichas e a presença de todas as mídias, com a prescrição intacta. A inspeção visual em navegadores reais permanece pendente.

As referências abaixo à exclusão de fichas do build e acesso exclusivamente local documentam a versão anterior, substituída por esta autorização de acesso público.

# Validação executada — P2

## Resultado e ambiente

- TypeScript strict sem erros, inclusive os componentes privados e middleware local.
- 34 testes em sete arquivos aprovados após a rodada de UX. TypeScript, testes e build em subdiretório executados com Node 22.23.3. Build inicial em raiz executado com Node 24.19.0, compatível com as dependências. O workflow de GitHub Pages usa Node 22.
- Dependências e lockfile preservados da instalação reprodutível da P1; nenhuma dependência adicional necessária na P2.
- Build em `/` e em `/luh-reis/` aprovados. Fallback SPA e referências de recursos HTML/CSS verificados.
- Auditoria pública aprovada: 29 arquivos na saída, sem fichas, imagens privadas, endpoints de desenvolvimento, PDF ou source maps.
- Auditoria privada aprovada: 59 entradas, 140 campos diários de periodização e 65 recursos associados. Hash da transcrição corresponde à conferência visual independente das sete páginas.
- Build com `LUH_PRIVATE_REVIEW=1` recusado, como esperado. CSS público e privado analisados sem erro de sintaxe.
- Conteúdo e mídia privados ignorados pelo Git e mantidos fora de `public/` e do grafo de módulos.

## Conteúdo e mídia

As sete páginas originais foram inspecionadas visualmente e conferidas em uma segunda passagem independente: A 10, B 12, C 10, D 10, E 9 e F 8 entradas. As cinco frequências de periodização contêm quatro semanas cada, com sete campos diários por semana. Não houve correção objetiva necessária na conferência.

O PDF adaptado não foi usado como substituição nem combinado com o original. Valores zero e campos vazios foram preservados. Grupos e termos textuais mantêm o significado original; séries de cada movimento são contadas separadamente para o acompanhamento.

A auditoria de transcrição e suas ambiguidades ficam em `private/training/AUDITORIA-PDF.md`, no pacote de revisão local. Autoria, direitos comerciais e aprovação técnica permanecem pendentes.

Foram criados 59 recursos de exercícios e seis capas distintas em SVG, com IDs únicos e origem/licença no manifest. XML, paths e correspondência dos alts foram verificados. Folhas de contato foram renderizadas e inspecionadas; 45 exercícios e seis capas estão em revisão, 14 execuções ambíguas recebem cartões de pendência. Nenhuma imagem possui aprovação final. Não foram utilizados recursos proprietários da Smart Fit.

## Interações verificadas

- Renderização das seis fichas reais sem omissão de entradas ou valores da fonte; número de controles correspondente às séries de cada exercício.
- Progresso conta somente séries válidas e distintas. Não infere eficácia, calorias ou resultados.
- Marcação de séries e anotação de carga persistem após remontar a ficha. Sessões separadas por programa, ficha e data; dados corrompidos são ignorados e armazenamento recusado é comunicado.
- Limpeza de sessão confirma na interface, permite cancelar e remove somente os registros da sessão atual.
- Cronômetro inicia, pausa, retoma, reinicia e termina. A contagem deriva de timestamps e se reconcilia no retorno ao foco. Zero e ausência de descanso não geram intervalo inventado; uma fixture de faixa permite escolher um valor interno.
- Detalhes no desktop abrem em diálogo, com foco inicial, bloqueio de scroll, Escape e restauração de foco; no mobile a rota interna apresenta a mesma informação.
- Falha de imagem produz placeholder, sem imagem quebrada.
- Todos os controles de frequência e semana funcionam; cada modelo mantém sete campos diários.
- Prévia pública estática, sem navegação livre por fichas e sem prescrições. CTA Conhecer o programa e contato em subdiretório têm destinos válidos.
- Query strings, deep links e localStorage não abrem a revisão no desenvolvimento comum.
- Middleware recusa flag ausente, hosts externos, origem diferente, conexões remotas, métodos não GET, IDs desconhecidos e tentativas de sair do diretório. Revisão ativa recusa rede aberta e builds; imports privados são bloqueados.
- Regressões da P1: FAQ pelo teclado, menu mobile, fechamento, foco, bloqueio de scroll, âncoras, movimento reduzido, contato configurado e apresentação imediatamente após o hero.

Os testes usam jsdom e chamadas diretas do middleware. Não foi iniciado servidor de prévia. O diálogo nativo foi representado nos testes; foco, layout, focus trap e comportamento do navegador ainda exigem QA real. No código publicável sem a pasta privada, o teste de fichas reais é explicitamente pulado; os demais testes usam dados sintéticos.

## Medidas de build

Build Node 22 em subdiretório: 1,83 s.

- JavaScript: 285,32 kB; 90,18 kB gzip.
- CSS: 28,10 kB; 6,60 kB gzip.
- Saída total: 1.147.721 bytes, incluindo fotos, fontes e capa social da P1.
- Retrato principal: 43.670 bytes, com prioridade alta. Mídias secundárias e ilustrações da revisão usam dimensões e lazy loading; a imagem do detalhe ativo carrega imediatamente.

Essas medidas não são Lighthouse, LCP, CLS ou INP; métricas em navegador não foram medidas.

## Enquadramento do hero preservado

O hero mantém `width: 100%`, `height: auto` e `object-fit: contain`, sem alturas fixas ou percentuais na fotografia. O retrato conserva sua proporção intrínseca, dentro da moldura com `overflow: hidden`. O contorno usa os mesmos espaços da fotografia e legenda. O bloco não estica conforme a altura do texto. A P2 não alterou a foto, o recorte, as regras responsivas ou a composição desse hero.

## Verificação visual pendente

A infraestrutura de navegador exigida pelo fluxo de Sites não estava disponível. Não foram iniciados servidores, instalados navegadores ou usados meios alternativos de automação. Por isso, não há screenshots do aplicativo ou comprovação visual de overflow, enquadramento, contraste sobre imagens e comportamento nativo em Safari/Chrome/Firefox.

Os layouts incluem adaptações para 320/375/390/430/768/1024/1280/1600 px e telas largas; validar esses tamanhos nos navegadores reais antes do lançamento. A tabela vira componentes verticais em telas menores, controles têm pelo menos 44 px e campos de carga mobile usam 16 px para leitura e digitação.

O WhatsApp oficial continua pendente. Os testes de CTA externo usam número sintético não publicado. GitHub Pages está preparado, mas o workflow não foi executado no repositório pessoal do usuário nesta entrega. A publicação em Sites preserva o acesso privado existente.

## Rodada de refinamento de UX

Textos e imagens ampliados; campos essenciais destacados na ficha. Métodos e observações, orientações, cronômetro e opções do registro usam expansão nativa. A escolha de intervalo abre o painel correto e sua contagem permanece ativa quando ele é recolhido. O teste de integração desse comportamento passou, assim como os 33 testes anteriores.

TypeScript e os 34 testes foram executados com sucesso nesta rodada em Node 24.19.0. A auditoria privada confirmou o mesmo hash, 59 entradas, 140 campos diários e 65 assets, sem alteração de prescrição. CSS público e privado foram analisados sem erro de sintaxe. Os layouts maiores usam os mesmos assets e base paths.

A verificação visual em navegadores reais continua pendente pela indisponibilidade da infraestrutura exigida no ambiente. As medidas de tamanho de arquivos acima se referem ao build inicial da P2.

## Ajuste de paleta

Verde e branco passam a dominar a página pública e a revisão privada. Os grandes fundos em terracota foram substituídos por branco e verde-claro; botões, títulos, progresso e foco usam verde-musgo. Os tons quentes remanescentes pertencem aos detalhes dos assets originais. Os tokens são locais à página de treinos, preservando a landing institucional. A proporção visual de 90% é uma direção de composição, não uma medição de pixels.

## Exercícios recolhíveis

Cada exercício pode ser minimizado e expandido, mantendo nome e prescrição visíveis. Imagem, notas e controles locais são recolhidos sem apagar séries ou cargas; os demais exercícios mantêm seu estado independente. O terracota fica restrito aos assets das ilustrações, preservados sem alterações. Validação com 35 testes, TypeScript, build e auditoria do conteúdo público; inspeção visual real permanece pendente.
