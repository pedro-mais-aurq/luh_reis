export const content = {
  hero: {
    eyebrow: 'DESTRAVE DELAS · COM LUH REIS',
    headline: ['Seu corpo.', 'Sua prioridade.', 'Comece agora.'],
    description: 'Um plano de treino claro para sair da intenção e colocar o movimento na sua rotina. Conheça o método e dê o primeiro passo por você.',
    primary: 'Destrave seu primeiro treino', secondary: 'Fale com a Luh', note: 'Conheça quem vai orientar o seu começo.',
  },
  about: {
    eyebrow: 'PRAZER, EU SOU A LUH', title: 'Muito além', titleItalic: 'do treino.',
    intro: 'Sou formada em Educação Física há mais de 15 anos, especialista em Treinamento Esportivo e também vivi minha própria transformação, eliminando mais de 20 kg.',
    paragraphs: ['Ao longo da minha trajetória, percebi que muitas mulheres não deixam de se cuidar por falta de vontade. Elas apenas acreditam que uma vida saudável não cabe na rotina que têm.', 'O Destrave Delas nasceu para mostrar que é possível se priorizar, conquistar o corpo que você deseja e construir uma rotina saudável que se encaixe na sua vida.'],
    note: 'Sem culpa. Com consciência.', cta: 'Vamos conversar?',
  },
  method: {
    eyebrow: 'CONHEÇA O DESTRAVE DELAS', title: 'O método começa', titleItalic: 'na sua vida real.',
    description: 'Você não precisa esperar a rotina perfeita para se priorizar. O Destrave Delas une clareza, organização e constância para ajudar você a começar e continuar.',
    note: 'Começar pequeno é começar.',
    principles: [
      { title: 'Saiba por onde começar.', description: 'Orientações claras para entender o plano, o que fazer em cada treino e como organizar sua semana.' },
      { title: 'Faça o treino caber na rotina.', description: 'Uma sequência que acompanha os dias disponíveis, com dias leves opcionais e espaço para retomar quando necessário.' },
      { title: 'Construa constância.', description: 'Um passo de cada vez, respeitando as pausas, a execução e uma evolução gradual.' },
      { title: 'Priorize você.', description: 'Seus objetivos e sua rotina importam. Converse com a Luh para esclarecer dúvidas e discutir as adaptações de que você precisa.' },
    ],
    primary: 'Quero meu plano de treino', secondary: 'Converse com a Luh',
  },
  plan: {
    eyebrow: 'UM PLANO NA MÃO. UM COMEÇO POSSÍVEL.', title: 'Destrave seu', titleItalic: 'primeiro treino.',
    description: 'Seu plano está pronto para consultar e levar à academia. Explore as páginas e salve o PDF para ter cada treino sempre à mão.',
    cta: 'Baixar meu plano e começar',
  },
  faq: {
    eyebrow: 'SEU COMEÇO, COM CLAREZA', title: 'Antes de dar', titleItalic: 'o primeiro passo.',
    items: [
      { id: 'content', question: 'O que encontro no PDF?', answer: 'Orientações para começar, organização da semana, quatro treinos de força e dois dias leves opcionais. As fichas incluem exercícios, séries, repetições, pausas e espaço para anotar as cargas.' },
      { id: 'frequency', question: 'Preciso treinar todos os dias?', answer: 'Não. O plano mostra como organizar a sequência com dois, três ou quatro dias disponíveis. Os dois dias leves são opcionais.' },
      { id: 'download', question: 'Posso usar o plano pelo celular?', answer: 'Sim. Você pode consultar as páginas aqui, ampliar a visualização ou baixar o PDF para salvar no celular. Também pode imprimir o material.' },
      { id: 'contact', question: 'Como esclareço dúvidas sobre o plano?', answer: 'Use a seção de contato para conversar com a Luh sobre sua rotina, seus objetivos e as adaptações de que você precisa.' },
    ],
  },
  contact: {
    eyebrow: 'VAMOS DAR O PRIMEIRO PASSO?', title: 'Dê o próximo passo.', titleItalic: 'Escolha você.',
    description: 'Quer orientação para encaixar o treino na sua rotina? Converse com a Luh sobre o seu momento e os seus objetivos.',
    cta: 'Fale comigo no WhatsApp', note: 'Com proximidade. Com consciência. No seu ritmo.',
    pendingTitle: 'Um novo espaço. Um canal em atualização.',
    pendingDescription: 'O contato direto será disponibilizado aqui em breve.', pendingStatus: 'Contato direto em breve',
  },
  footer: { tagline: 'Consciência no movimento. Constância na vida.', rights: 'Todos os direitos reservados.', top: 'Voltar ao início' },
  navigation: { open: 'Abrir menu', close: 'Fechar menu', label: 'Navegação principal', skip: 'Pular para o conteúdo', contact: 'Quero meu plano' },
} as const;

export interface Testimonial { id: string; name: string; quote: string; authorized: boolean; confirmed: boolean }
export const testimonials: readonly Testimonial[] = [];
