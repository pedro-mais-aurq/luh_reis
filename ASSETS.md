# Fontes e preparação de assets

Fonte principal: BRAND GUIDELINES.pdf, versão 1.0, fevereiro de 2026, fornecido para o projeto.

| Asset | Origem | Preparação |
| --- | --- | --- |
| logo-dark.svg / logo-light.svg | Página 9, caminhos vetoriais originais | Preservados os contornos; excluída a assinatura abandonada; versão clara para rodapé |
| favicon.svg | Página 11, monograma original | Caminho vetorial em disco terracota |
| hero.webp / hero-mobile.webp | Página 3, recurso interno 1103, 760 × 1114 | WebP; variação mobile redimensionada |
| about.webp | Página 5, recurso interno 1127, 2033 × 2716 | WebP com largura até 1000 px; composição sem recorte artificial |
| movement.webp | Página 5, recurso interno 1130, 610 × 764 | WebP |
| training.webp | Página 34, recurso interno 1515, 1220 × 2023 | WebP com largura até 1000 px |
| contact.webp | Página 34, recurso interno 1518, 875 × 1556 | WebP |
| ritual.webp | Página 26, recurso interno 1471, 816 × 460 | WebP reservado para composições futuras |
| social-cover.jpg | Fotografias e wordmark acima | Composição gráfica 1200 × 630; nenhuma pessoa gerada |
| Poppins / Coming Soon | Pacotes Fontsource | Subset Latin, servidos localmente, licenças OFL preservadas |

Não foram utilizadas capturas de páginas inteiras como fotografias. Não foram incluídas fotos genéricas de academia ou imagens de outra profissional. A foto da referência de treinos de terceiros não foi utilizada no site.

## P2 — recursos novos

| Recursos | Origem e licença | Disponibilidade |
| --- | --- | --- |
| `program-demo.svg` | Composição vetorial original de equipamentos, criada para este projeto; nenhum exercício prescrito | Pública, somente conceitual |
| 59 SVGs de exercícios | Ilustrações vetoriais originais criadas para o projeto; origem e licença individual no manifest | Somente pacote de revisão local; 45 em revisão e 14 pendentes |
| 6 capas distintas A–F | Composições vetoriais originais, com figuras e equipamentos distintos | Somente revisão local; aguardam aprovação |
| Folhas de contato | Rasterizações locais dos SVGs para QA visual | Somente revisão local |

As ilustrações foram inspecionadas por folhas de contato. Os 65 IDs são únicos, os SVGs têm XML válido e os arquivos correspondem ao manifest. Equipamento ou execução ambígua recebe um cartão editorial de pendência, sem pose presumida. Nenhuma imagem é apresentada como orientação profissional aprovada.

A transcrição completa foi conferida visualmente contra as sete páginas do PDF original. O documento adaptado de 12 páginas não foi combinado nem usado como substituição. Os PDFs não estão no código publicável, no build ou nos pacotes entregues; a transcrição e o relatório de auditoria ficam exclusivamente no pacote local. Sua autoria e direitos não foram transferidos ou atribuídos a Luh Reis.

O middleware local fornece apenas IDs registrados no manifest. Arquivos privados não estão em `public/`, não são importados pelos módulos e não entram no deploy. Não foram usados assets, código ou fotografias proprietárias da Smart Fit.
