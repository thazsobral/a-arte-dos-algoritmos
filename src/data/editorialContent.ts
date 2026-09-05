import { Chapter, PhoneBookEntry, QuizQuestion } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    number: 'Prólogo',
    title: 'A Essência da Resolução de Problemas',
    subtitle: 'O que realmente é um algoritmo?'
  },
  {
    id: 'phonebook',
    number: 'Capítulo I',
    title: 'O Enigma da Lista Telefônica',
    subtitle: 'Três formas de buscar um nome'
  },
  {
    id: 'simulator',
    number: 'Laboratório',
    title: 'O Simulador da Lista Telefônica',
    subtitle: 'Experimente a busca em tempo real'
  },
  {
    id: 'big-o',
    number: 'Capítulo II',
    title: 'A Notação Big-O e a Escala do Tempo',
    subtitle: 'De 100 nomes a 4 bilhões de possibilidades'
  },
  {
    id: 'big-o-discovery',
    number: 'Capítulo III',
    title: 'Como Descobrir a Notação Big-O',
    subtitle: 'O método prático das 3 perguntas e regras de simplificação'
  },
  {
    id: 'hardware-stress',
    number: 'Capítulo IV',
    title: 'Estresse de CPU e Memória',
    subtitle: 'A realidade física do silício e o consumo de hardware'
  },
  {
    id: 'code-translation',
    number: 'Capítulo V',
    title: 'Da Linguagem Humana ao Código',
    subtitle: 'Assuma o manche: transforme intuição algorítmica em código real'
  },
  {
    id: 'quiz',
    number: 'Epílogo',
    title: 'Verificação do Conhecimento',
    subtitle: 'Fixando a intuição algorítmica'
  }
];

export const PHONE_BOOK_DATA: PhoneBookEntry[] = [
  { id: 1, name: 'Alice Adams', phone: '(11) 91001-0001', page: 1 },
  { id: 2, name: 'Bernardo Barros', phone: '(11) 91001-0002', page: 2 },
  { id: 3, name: 'Camila Castro', phone: '(11) 91001-0003', page: 3 },
  { id: 4, name: 'Daniel Duarte', phone: '(11) 91001-0004', page: 4 },
  { id: 5, name: 'Eduarda Esteves', phone: '(11) 91001-0005', page: 5 },
  { id: 6, name: 'Felipe Fontana', phone: '(11) 91001-0006', page: 6 },
  { id: 7, name: 'Gabriela Gomes', phone: '(11) 91001-0007', page: 7 },
  { id: 8, name: 'Henrique Hoffman', phone: '(11) 91001-0008', page: 8 },
  { id: 9, name: 'Isabela Iglesias', phone: '(11) 91001-0009', page: 9 },
  { id: 10, name: 'João Jacinto', phone: '(11) 91001-0010', page: 10 },
  { id: 11, name: 'Karina Klein', phone: '(11) 91001-0011', page: 11 },
  { id: 12, name: 'Lucas Lima', phone: '(11) 91001-0012', page: 12 },
  { id: 13, name: 'Mariana Medeiros', phone: '(11) 91001-0013', page: 13 },
  { id: 14, name: 'Nicolas Nogueira', phone: '(11) 91001-0014', page: 14 },
  { id: 15, name: 'Olivia Ortiz', phone: '(11) 91001-0015', page: 15 },
  { id: 16, name: 'Pedro Paiva', phone: '(11) 91001-0016', page: 16 },
  { id: 17, name: 'Quirino Queiroz', phone: '(11) 91001-0017', page: 17 },
  { id: 18, name: 'Rafael Ramos', phone: '(11) 91001-0018', page: 18 },
  { id: 19, name: 'Sophia Silveira', phone: '(11) 91001-0019', page: 19 },
  { id: 20, name: 'Tiago Tavares', phone: '(11) 91001-0020', page: 20 },
  { id: 21, name: 'Ursula Uchoa', phone: '(11) 91001-0021', page: 21 },
  { id: 22, name: 'Vinícius Valente', phone: '(11) 91001-0022', page: 22 },
  { id: 23, name: 'Wagner Werner', phone: '(11) 91001-0023', page: 23 },
  { id: 24, name: 'Yasmin Yoshida', phone: '(11) 91001-0024', page: 24 },
  { id: 25, name: 'Zeca Zaidan', phone: '(11) 91001-0025', page: 25 },
  { id: 26, name: 'Arthur Aguiar', phone: '(11) 91001-0026', page: 26 },
  { id: 27, name: 'Beatriz Borges', phone: '(11) 91001-0027', page: 27 },
  { id: 28, name: 'Caio Cardoso', phone: '(11) 91001-0028', page: 28 },
  { id: 29, name: 'Débora Dias', phone: '(11) 91001-0029', page: 29 },
  { id: 30, name: 'Enzo Esteves', phone: '(11) 91001-0030', page: 30 },
  { id: 31, name: 'Fabiana Franco', phone: '(11) 91001-0031', page: 31 },
  { id: 32, name: 'Gustavo Guedes', phone: '(11) 91001-0032', page: 32 },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'O que define fundamentalmente um algoritmo na ciência da computação?',
    context: 'Relembre o conceito primordial de resolução de problemas apresentado no Prólogo.',
    options: [
      {
        id: 'a',
        text: 'Uma linguagem de programação complexa exclusiva para supercomputadores.',
        isCorrect: false,
        explanation: 'Incorreto. Linguagens são apenas os veículos; o algoritmo é a lógica subjacente.'
      },
      {
        id: 'b',
        text: 'Um conjunto de instruções passo a passo bem delineadas para solucionar um problema.',
        isCorrect: true,
        explanation: 'Exato! Como uma receita precisa ou um procedimento metódico, um algoritmo é um guia ordenado de ações.'
      },
      {
        id: 'c',
        text: 'Um hardware capaz de armazenar livros e listas de contatos.',
        isCorrect: false,
        explanation: 'Incorreto. Isso seria memória física ou dispositivo de armazenamento.'
      }
    ]
  },
  {
    id: 2,
    question: 'Se dobrarmos o tamanho de uma lista telefônica de 1.000 para 2.000 nomes, quantos passos adicionais a busca binária (log₂ n) precisará no pior caso?',
    context: 'Considere a propriedade elegante da divisão pela metade.',
    options: [
      {
        id: 'a',
        text: 'Apenas 1 passo adicional.',
        isCorrect: true,
        explanation: 'Perfeito! Cada passo extra dobra o número de elementos que podemos procurar (log₂ 2n = log₂ n + 1).'
      },
      {
        id: 'b',
        text: 'O dobro de passos (1.000 passos a mais).',
        isCorrect: false,
        explanation: 'Isso ocorreria na busca linear O(n), mas nunca na busca binária log₂ n.'
      },
      {
        id: 'c',
        text: '500 passos a mais.',
        isCorrect: false,
        explanation: 'Isso seria característico de uma busca de duas em duas páginas O(n/2).'
      }
    ]
  },
  {
    id: 3,
    question: 'Por que a abordagem de ler de página em página possui complexidade Big-O de O(n)?',
    context: 'Pense no pior cenário possível para encontrar um contato.',
    options: [
      {
        id: 'a',
        text: 'Porque ela sempre encontra o nome exatamente na primeira página.',
        isCorrect: false,
        explanation: 'Esse seria o melhor caso O(1), mas a notação Big-O costuma descrever o limite superior (pior caso).'
      },
      {
        id: 'b',
        text: 'Porque se houver n nomes, no pior caso precisaremos verificar até n páginas.',
        isCorrect: true,
        explanation: 'Correto! Se o nome estiver na última página (ou não existir), serão feitas exatamente n tentativas.'
      },
      {
        id: 'c',
        text: 'Porque ela consome metade da memória disponível.',
        isCorrect: false,
        explanation: 'Big-O aqui mede o crescimento do tempo/número de passos em relação ao tamanho da entrada.'
      }
    ]
  },
  {
    id: 4,
    question: 'Se um algoritmo possui dois laços (loops) aninhados que percorrem uma lista de n itens (um loop dentro do outro), qual é a sua complexidade de tempo?',
    context: 'Lembre-se da multiplicação de operações em loops aninhados.',
    options: [
      {
        id: 'a',
        text: 'O(2n), pois são dois laços.',
        isCorrect: false,
        explanation: 'Incorreto. Laços em sequência somam (n + n = 2n = O(n)), mas quando um está dentro do outro eles multiplicam (n * n).'
      },
      {
        id: 'b',
        text: 'O(n²), pois para cada um dos n passos externos, o loop interno executa n vezes.',
        isCorrect: true,
        explanation: 'Exato! A multiplicação n * n resulta em uma curva quadrática O(n²), perigosa para grandes volumes de dados.'
      },
      {
        id: 'c',
        text: 'O(log n), pois o algoritmo divide os laços.',
        isCorrect: false,
        explanation: 'Incorreto. Divisão logarítmica ocorre ao reduzir o problema pela metade sucessivamente, não ao multiplicar iterações.'
      }
    ]
  },
  {
    id: 5,
    question: 'Por que expressamos O(2n + 50) simplesmente como O(n) na notação Big-O?',
    context: 'Pense nas 2 Regras de Ouro: Descarte de constantes multiplicativas e termos secundários.',
    options: [
      {
        id: 'a',
        text: 'Porque o Big-O foca na ordem de crescimento quando n tende ao infinito, onde constantes perdem relevância comparativa.',
        isCorrect: true,
        explanation: 'Excelente! A forma da curva de crescimento para 2n e n é estritamente linear; a constante altera a velocidade absoluta, mas não a taxa assintótica.'
      },
      {
        id: 'b',
        text: 'Porque números inteiros menores que 100 são desconsiderados pela linguagem.',
        isCorrect: false,
        explanation: 'Incorreto. A simplificação é uma propriedade matemática da análise assintótica, não um detalhe de linguagem.'
      },
      {
        id: 'c',
        text: 'Porque computadores modernos ignoram instruções constantes automaticamente.',
        isCorrect: false,
        explanation: 'Incorreto. A máquina executa todas as instruções, mas a classificação do algoritmo classifica a escalabilidade teórica.'
      }
    ]
  }
];
