# Validação — landing comercial com PDF

Atualização de 10/10/2026: substituição pelo PDF ilustrado anexado.

- TypeScript strict: passou.
- 14 testes automatizados: passaram. Cobrem as seis páginas do leitor, limites, diálogo ampliado, teclado, restauração de foco e rolagem, download, FAQ, menu e contatos.
- Ordem das seções: hero, apresentação da Luh, método, plano em PDF, dúvidas e contato.
- Links antigos de treinos redirecionam ao plano, também em subdiretório. Nenhuma ficha interativa ou requisição à antiga API é carregada.
- PDF ilustrado fornecido: seis páginas A4, arquivo preservado byte a byte; todas as páginas foram inspecionadas visualmente.
- Build: recursos, fontes, fallback SPA, PDF e seis prévias conferidos nos caminhos raiz e de subdiretório. A auditoria compara o PDF do build com o material preparado.
- A plataforma de treinos, seus JSONs, GIFs, ilustrações e mecanismos de revisão local foram removidos do código publicável e do build.
- Fotos fornecidas, proporção do hero e texto aprovado do sobre mim preservados.
- Workflow único de GitHub Pages, com instalação, testes, build e verificações antes da publicação.

## Limite da verificação

O ambiente desta atualização não disponibiliza a infraestrutura de navegador exigida pelo fluxo de Sites. A landing não foi inspecionada em navegador real. Os testes DOM e a conferência dos assets não comprovam o layout final ou o comportamento nativo do diálogo e do download em Safari, Chrome e Firefox. A inspeção visual realizada se refere às seis páginas do PDF.
