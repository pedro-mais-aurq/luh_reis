export const content = {
  hero: {
    eyebrow: 'MOVIMENTO QUE CABE NA SUA VIDA',
    headline: ['Seu corpo.', 'Seu ritmo.', 'Sua evolução.'],
    description: 'Treinamento com orientação, consciência e constância. Respeitando a sua rotina e os seus objetivos.',
    primary: 'Conheça o método', secondary: 'Fale com a Luh', note: 'Um passo de cada vez. No seu tempo.',
  },
  about: {
    eyebrow: 'PRAZER, EU SOU A LUH', title: 'Muito além', titleItalic: 'do treino.',
    intro: 'Sou formada em Educação Física há mais de 15 anos, especialista em Treinamento Esportivo e também vivi minha própria transformação, eliminando mais de 20 kg.',
    paragraphs: ['Ao longo da minha trajetória, percebi que muitas mulheres não deixam de se cuidar por falta de vontade. Elas apenas acreditam que uma vida saudável não cabe na rotina que têm.', 'O Destrave Delas nasceu para mostrar que é possível se priorizar, conquistar o corpo que você deseja e construir uma rotina saudável que se encaixe na sua vida.'],
    note: 'Sem culpa. Com consciência.', cta: 'Vamos conversar?',
  },
  method: {
    eyebrow: 'A MINHA FILOSOFIA', title: 'Um método pensado', titleItalic: 'para a vida real.',
    description: 'O movimento pode fazer parte da sua rotina. Com clareza para começar e espaço para continuar.',
    note: 'O possível também transforma.',
    principles: [
      { title: 'Consciência antes de tudo.', description: 'Entender o que você faz é parte do caminho. Uma comunicação próxima para tornar o técnico mais claro.' },
      { title: 'Constância, no seu ritmo.', description: 'Valorizar a continuidade, respeitando os seus momentos e as possibilidades de cada dia.' },
      { title: 'Orientação com clareza.', description: 'Informação prática e acessível para que o cuidado com você tenha mais sentido.' },
      { title: 'Você e a sua vida real.', description: 'Uma proposta que considera a individualidade, a rotina e os objetivos de cada mulher.' },
    ],
    primary: 'Conversar com a Luh', secondary: 'Explorar o programa de treinos',
  },
  program: {
    eyebrow: 'UM NOVO CAPÍTULO · EM DESENVOLVIMENTO', title: 'Seu treino,', titleItalic: 'em um só lugar.',
    description: 'Uma experiência digital está sendo preparada para organizar a consulta aos treinos. Mais clareza para encontrar cada exercício e visualizar o planejamento.',
    note: 'Esta é uma prévia visual. O programa ainda não está disponível para compra.',
    cta: 'Conhecer o programa',
  },
  access: {
    eyebrow: 'COMO ESTÁ SENDO PENSADO', title: 'Um caminho simples.', titleItalic: 'Quando estiver pronto.',
    description: 'Do primeiro acesso à consulta dos treinos, a ideia é deixar tudo mais organizado.',
    steps: [
      { title: 'Escolher o seu programa.', description: 'Quando lançado, a compra será feita por uma plataforma de pagamento. As condições serão divulgadas com o lançamento.' },
      { title: 'Acessar sua conta.', description: 'Está previsto um acesso pessoal para consultar o programa adquirido.' },
      { title: 'Encontrar seus treinos.', description: 'A futura área exclusiva reunirá exercícios e planejamento, de forma organizada.' },
    ],
  },
  faq: {
    eyebrow: 'SEM COMPLICAÇÃO', title: 'Vamos tirar', titleItalic: 'suas dúvidas?',
    items: [
      { id: 'available', question: 'O programa já está disponível?', answer: 'Ainda não. O programa digital está em desenvolvimento. A prévia desta página apresenta somente a proposta de organização da futura experiência.' },
      { id: 'access', question: 'Como será o acesso ao programa?', answer: 'A proposta prevê uma conta pessoal e uma área exclusiva para consultar os treinos após a confirmação da compra. Os detalhes serão divulgados quando o programa estiver pronto.' },
      { id: 'purchase', question: 'Como funcionará a compra?', answer: 'Quando lançado, o programa será comercializado por uma plataforma de pagamento. A plataforma escolhida e as condições comerciais ainda serão confirmadas.' },
    ],
    pending: [
      { question: 'O programa exige acesso à academia?', answer: null },
      { question: 'O que estará incluído?', answer: null },
      { question: 'Qual será o preço e o período de acesso?', answer: null },
    ],
  },
  contact: {
    eyebrow: 'VAMOS DAR O PRIMEIRO PASSO?', title: 'O próximo passo', titleItalic: 'começa com você.',
    description: 'Vamos conversar sobre a sua rotina, os seus objetivos e o movimento que faz sentido para você.',
    cta: 'Fale comigo no WhatsApp', note: 'Com proximidade. Com consciência. No seu ritmo.',
    pendingTitle: 'Um novo espaço. Um canal em atualização.',
    pendingDescription: 'O contato direto será disponibilizado aqui em breve.', pendingStatus: 'Contato direto em breve',
  },
  footer: { tagline: 'Consciência no movimento. Constância na vida.', rights: 'Todos os direitos reservados.', top: 'Voltar ao início' },
  navigation: { open: 'Abrir menu', close: 'Fechar menu', label: 'Navegação principal', skip: 'Pular para o conteúdo', contact: 'Vamos conversar' },
  reserved: { eyebrow: 'UM NOVO CAPÍTULO', title: 'Estamos preparando este espaço.', description: 'O programa digital e sua área de acesso ainda estão em desenvolvimento. Por enquanto, conheça a Luh e sua proposta.', cta: 'Voltar ao início' },
} as const;

export interface Testimonial { id: string; name: string; quote: string; authorized: boolean; confirmed: boolean }
export const testimonials: readonly Testimonial[] = [];
