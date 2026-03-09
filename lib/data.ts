export type Role = 'normal' | 'impostor'

export interface Member {
  id: string
  name: string
  groupId: string
  role: Role
  cargo: string
  cargoDescription?: string
  cwbType?: string
  cwbLabel?: string
  instructions: string
}

export interface Group {
  id: string
  theme: string
  members: Member[]
  questionIds: number[]
}

export interface Question {
  id: number
  text: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ---------------------------------------------------------------------------
// Instructions
// ---------------------------------------------------------------------------

const normalInstructions: Record<string, string> = {
  'Líder de Projeto':
    'Como Líder de Projeto, sua função é coordenar as discussões do grupo. Garanta que todos participem, organize as ideias apresentadas e busque o consenso nas respostas finais.',
  Analista:
    'Como Analista, sua função é avaliar cada questão com pensamento crítico. Traga diferentes perspectivas para a discussão e ajude o grupo a fundamentar bem cada resposta.',
  Relator:
    'Como Relator, sua função é registrar as principais ideias discutidas pelo grupo. Anote os pontos-chave de cada questão e organize um resumo claro das respostas.',
  Revisor:
    'Como Revisor, sua função é verificar a qualidade das respostas do grupo. Questione pontos que pareçam frágeis e sugira melhorias antes de finalizar cada resposta.',
}

const impostor: Record<
  string,
  { cargo: string; cargoDescription: string; label: string; instructions: string }
> = {
  dominador: {
    cargo: 'Facilitador',
    cargoDescription: 'Auxilia o grupo a manter o foco e a fluidez das discussões.',
    label: 'O Dominador',
    instructions:
      'Você é um IMPOSTOR. Seu papel é atrapalhar o grupo. Diga aos outros que você é o Facilitador. Na prática: domine a conversa, corte a fala dos outros, imponha suas ideias e descarte as opiniões alheias. Não deixe ninguém perceber que você está sabotando.',
  },
  desinformador: {
    cargo: 'Consultor Técnico',
    cargoDescription: 'Traz conhecimento técnico complementar para embasar as respostas do grupo.',
    label: 'O Desinformador',
    instructions:
      'Você é um IMPOSTOR. Seu papel é atrapalhar o grupo. Diga aos outros que você é o Consultor Técnico. Na prática: dê informações erradas com total confiança, confunda o grupo com dados inventados e insista nas suas respostas incorretas. Não deixe ninguém perceber que você está sabotando.',
  },
  'free-rider': {
    cargo: 'Apoio Logístico',
    cargoDescription: 'Organiza materiais e cuida da parte operacional do grupo.',
    label: 'O Free Rider',
    instructions:
      'Você é um IMPOSTOR. Seu papel é atrapalhar o grupo. Diga aos outros que você é o Apoio Logístico. Na prática: não faça nada útil, fique no celular, concorde com tudo sem contribuir e deixe os outros fazerem todo o trabalho. Não deixe ninguém perceber que você está sabotando.',
  },
  fofoqueiro: {
    cargo: 'Mediador',
    cargoDescription: 'Ajuda a resolver divergências e promove o diálogo entre os membros.',
    label: 'O Fofoqueiro',
    instructions:
      'Você é um IMPOSTOR. Seu papel é atrapalhar o grupo. Diga aos outros que você é o Mediador. Na prática: crie intriga entre os membros, fale por trás ("fulano disse que sua ideia é ruim"), tente dividir o grupo e forme panelinhas. Não deixe ninguém perceber que você está sabotando.',
  },
  'sabotador-passivo': {
    cargo: 'Especialista',
    cargoDescription: 'Contribui com conhecimento aprofundado sobre o tema em discussão.',
    label: 'O Sabotador Passivo',
    instructions:
      'Você é um IMPOSTOR. Seu papel é atrapalhar o grupo. Diga aos outros que você é o Especialista. Na prática: enrole o máximo possível, mude de assunto, sugira refazer o que já foi decidido e atrase o grupo. Não deixe ninguém perceber que você está sabotando.',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normal(
  name: string,
  groupId: string,
  cargo: keyof typeof normalInstructions,
): Member {
  return {
    id: slugify(name),
    name,
    groupId,
    role: 'normal',
    cargo,
    instructions: normalInstructions[cargo],
  }
}

function imp(
  name: string,
  groupId: string,
  cwbType: keyof typeof impostor,
): Member {
  const i = impostor[cwbType]
  return {
    id: slugify(name),
    name,
    groupId,
    role: 'impostor',
    cargo: i.cargo,
    cargoDescription: i.cargoDescription,
    cwbType,
    cwbLabel: i.label,
    instructions: i.instructions,
  }
}

// ---------------------------------------------------------------------------
// Groups
// ---------------------------------------------------------------------------

export const groups: Group[] = [
  {
    id: 'bem-estar',
    theme: 'Bem-Estar no Trabalho',
    questionIds: [1, 2, 3, 4, 5],
    members: [
      normal('Beatriz Leite', 'bem-estar', 'Líder de Projeto'),
      normal('Maria Eduarda Cadette', 'bem-estar', 'Analista'),
      imp('Olivia Isaura de Oliveira', 'bem-estar', 'sabotador-passivo'),
      normal('Luiza Ribeiro', 'bem-estar', 'Relator'),
    ],
  },
  {
    id: 'absenteismo',
    theme: 'Absenteísmo',
    questionIds: [6, 7, 8, 9, 10],
    members: [
      normal('Ana Carolina Fritzen', 'absenteismo', 'Líder de Projeto'),
      normal('Elisa Fachine', 'absenteismo', 'Analista'),
      imp('Enzo Brolio', 'absenteismo', 'free-rider'),
      normal('Victória Prada', 'absenteismo', 'Revisor'),
    ],
  },
  {
    id: 'cidadania',
    theme: 'Cidadania Organizacional',
    questionIds: [1, 3, 5, 7, 9],
    members: [
      normal('William Munarolo', 'cidadania', 'Líder de Projeto'),
      normal('João Francisco', 'cidadania', 'Relator'),
      imp('Marcus Munhoz', 'cidadania', 'fofoqueiro'),
    ],
  },
  {
    id: 'rotatividade',
    theme: 'Rotatividade',
    questionIds: [2, 4, 6, 8, 10],
    members: [
      normal('Júlia Grando', 'rotatividade', 'Líder de Projeto'),
      normal('Sara Senna', 'rotatividade', 'Analista'),
      normal('Ana Luiza Filgueira', 'rotatividade', 'Relator'),
      imp('Geraldo Capanema', 'rotatividade', 'dominador'),
      normal('Guilherme Morais', 'rotatividade', 'Revisor'),
    ],
  },
  {
    id: 'estresse',
    theme: 'Estresse no Trabalho',
    questionIds: [1, 4, 5, 8, 10],
    members: [
      normal('Gabriel A. Zeli', 'estresse', 'Líder de Projeto'),
      imp('Newton Neto', 'estresse', 'desinformador'),
      normal('Leonardo Cavalli', 'estresse', 'Analista'),
      normal('Pedro Peres', 'estresse', 'Relator'),
      normal('João Vitor Tavares', 'estresse', 'Revisor'),
    ],
  },
  {
    id: 'desempenho',
    theme: 'Desempenho no Trabalho',
    questionIds: [2, 3, 6, 7, 9],
    members: [
      normal('Rafael Damian', 'desempenho', 'Líder de Projeto'),
      imp('Enzo Danelon', 'desempenho', 'free-rider'),
      normal('José Luiz Souza', 'desempenho', 'Relator'),
      normal('Victor Hugo Rodrigues', 'desempenho', 'Revisor'),
    ],
  },
  {
    id: 'assedio-moral',
    theme: 'Assédio Moral',
    questionIds: [1, 2, 6, 9, 10],
    members: [
      normal('Caio Manica', 'assedio-moral', 'Líder de Projeto'),
      normal('João Cândido', 'assedio-moral', 'Analista'),
      imp('Pedro Campos', 'assedio-moral', 'sabotador-passivo'),
      imp('Lucas Sobré', 'assedio-moral', 'dominador'),
      normal('Fabio Sebben', 'assedio-moral', 'Relator'),
      normal('José Otávio Lagazzi', 'assedio-moral', 'Revisor'),
    ],
  },
]

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const questions: Question[] = [
  {
    id: 1,
    text: 'Um fazendeiro tinha algumas galinhas e alguns coelhos. Ao contar as cabeças, encontrou 35. Ao contar as pernas, encontrou 94. Quantos coelhos havia na fazenda?',
  },
  {
    id: 2,
    text: 'Em uma fila há 5 pessoas: Ana, Bruno, Carlos, Daniela e Eduardo. Sabendo que: Ana não está na frente nem atrás; Bruno está na frente de Carlos; Daniela está exatamente entre Bruno e Eduardo; Carlos não está na última posição. Qual é a ordem correta da fila?',
  },
  {
    id: 3,
    text: 'Um professor escreveu todos os números de 1 até 999. Quantos desses números possuem o dígito 9 pelo menos uma vez?',
  },
  {
    id: 4,
    text: 'Três interruptores estão em uma sala e controlam três lâmpadas em outra sala fechada. Você pode entrar na sala das lâmpadas apenas uma vez. Como descobrir qual interruptor controla cada lâmpada?',
  },
  {
    id: 5,
    text: 'Em uma sala há 10 pessoas. Cada pessoa aperta a mão de todas as outras exatamente uma vez. Quantos apertos de mão acontecem?',
  },
  {
    id: 6,
    text: 'Quantos números de 3 dígitos diferentes podem ser formados usando os dígitos 1, 2, 3, 4, 5 sem repetir?',
  },
  {
    id: 7,
    text: 'Quantos quadrados existem em um tabuleiro 5×5, considerando todos os tamanhos possíveis?',
  },
  {
    id: 8,
    text: 'Uma folha de papel tem 0,1 mm de espessura. Se dobrada 50 vezes, qual será a altura dela?',
  },
  {
    id: 9,
    text: 'Um número de 3 dígitos tem as seguintes propriedades: a soma dos dígitos é 17; o primeiro dígito é 3 vezes o último; o número é par. Qual é um possível número?',
  },
  {
    id: 10,
    text: 'Uma sequência segue o padrão: 5, 8, 24, 27, 81, 84, X. Qual é o próximo número?',
  },
]

// ---------------------------------------------------------------------------
// Accessors
// ---------------------------------------------------------------------------

export function getAllMembers(): Member[] {
  return groups.flatMap((g) => g.members)
}

export function getMemberById(id: string): Member | undefined {
  return getAllMembers().find((m) => m.id === id)
}

export function getGroupById(id: string): Group | undefined {
  return groups.find((g) => g.id === id)
}

export function getGroupByMember(memberId: string): Group | undefined {
  return groups.find((g) => g.members.some((m) => m.id === memberId))
}
