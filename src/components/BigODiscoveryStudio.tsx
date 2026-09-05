import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Lightbulb, 
  Calculator, 
  RotateCcw, 
  ShieldCheck, 
  Code2, 
  Layers, 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  Info,
  Zap,
  Percent,
  Check
} from 'lucide-react';

interface CodeLine {
  code: string;
  indent: number;
  termId: string | null; // connects to formula token
  complexityCost: string;
  tagColor: 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'gray';
  executionCountFormula: string;
  explanation: string;
}

interface FormulaToken {
  id: string;
  label: string;
  isOperator?: boolean;
  lineIndices: number[]; // 0-indexed code line numbers
  tagColor?: 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'gray';
  description: string;
  calculateValue: (n: number) => number;
}

interface AlgorithmCase {
  id: string;
  title: string;
  category: string;
  badge: string;
  bigO: string;
  growthName: string;
  analogy: string;
  tokens: FormulaToken[];
  resultSum: string;
  dominantTermId: string;
  simplificationSteps: string[];
  lines: CodeLine[];
  calculateTotalOperations: (n: number) => number;
}

const ALGORITHM_CASES: AlgorithmCase[] = [
  {
    id: 'case-o1',
    title: 'Acesso Direto por Índice',
    category: 'Tempo Constante',
    badge: 'O(1) - Instantâneo',
    bigO: 'O(1)',
    growthName: 'Constante',
    analogy: 'Abrir a página de um livro pelo número exato do marcador, sem folhear nenhuma página anterior.',
    tokens: [
      { id: 't_init', label: '1', lineIndices: [0], tagColor: 'gray', description: 'Chamada e inicialização do frame da função', calculateValue: () => 1 },
      { id: 'op_plus1', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_access', label: '1', lineIndices: [1], tagColor: 'green', description: 'Leitura direta no endereço de memória lista[indice]', calculateValue: () => 1 },
      { id: 'op_plus2', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_ret', label: '1', lineIndices: [2], tagColor: 'green', description: 'Instrução de retorno do valor', calculateValue: () => 1 }
    ],
    resultSum: '3 passos fixos',
    dominantTermId: 't_access',
    simplificationSteps: [
      'Identificamos que não há laços de repetição ou subdivisões recursivas.',
      'A instrução lista[indice] é calculada imediatamente via ponteiro de memória.',
      'A equação exata é T(n) = 3 operações elementares.',
      'Aplicando a Regra 1 (Descarte de constantes): O(3) simplifica para O(1).'
    ],
    lines: [
      {
        code: 'function obterItem(lista, indice) {',
        indent: 0,
        termId: 't_init',
        complexityCost: 'O(1)',
        tagColor: 'gray',
        executionCountFormula: '1 passo fixo',
        explanation: 'Declaração e inicialização da chamada da função (custo unitário 1).'
      },
      {
        code: '  const elemento = lista[indice];',
        indent: 1,
        termId: 't_access',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo fixo',
        explanation: 'Acesso indexado direto por ponteiro de memória: base + (indice × tamanho). Executa em 1 passo imediato.'
      },
      {
        code: '  return elemento;',
        indent: 1,
        termId: 't_ret',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo fixo',
        explanation: 'Retorno do dado na memória. Executa exatamente 1 vez independentemente do tamanho da lista.'
      },
      {
        code: '}',
        indent: 0,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do bloco da função.'
      }
    ],
    calculateTotalOperations: () => 3
  },
  {
    id: 'case-ologn',
    title: 'Busca Binária (Divisão Sucessiva)',
    category: 'Tempo Logarítmico',
    badge: 'O(log n) - Altamente Escalável',
    bigO: 'O(log n)',
    growthName: 'Logarítmico',
    analogy: 'Adivinhar uma palavra no dicionário abrindo sempre ao meio e descartando a metade que não contém a letra.',
    tokens: [
      { id: 't_init', label: '1', lineIndices: [1], tagColor: 'green', description: 'Inicialização dos ponteiros inicio e fim', calculateValue: () => 1 },
      { id: 'op_plus1', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_while', label: '(log₂ n + 1)', lineIndices: [2], tagColor: 'blue', description: 'Testes da condição do while (corta o espaço pela metade a cada volta)', calculateValue: (n) => Math.max(1, Math.floor(Math.log2(n || 1)) + 1) },
      { id: 'op_plus2', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_body', label: '3 · log₂ n', lineIndices: [3, 4, 5, 6], tagColor: 'blue', description: 'Cálculo do meio e comparações de corte executadas a cada iteração logarítmica', calculateValue: (n) => 3 * Math.max(1, Math.floor(Math.log2(n || 1))) },
      { id: 'op_plus3', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_ret', label: '1', lineIndices: [8], tagColor: 'green', description: 'Retorno final', calculateValue: () => 1 }
    ],
    resultSum: '4 · log₂(n) + 2',
    dominantTermId: 't_body',
    simplificationSteps: [
      'A cada iteração do laço while, o tamanho restante n é dividido por 2: n/2, n/4, n/8... até 1.',
      'O número máximo de divisões sucessivas por 2 é log₂(n).',
      'A equação de tempo é T(n) = 4 · log₂(n) + 2.',
      'Descartamos as constantes 4 e 2 (Regra 1): resta a classe assintótica O(log n).'
    ],
    lines: [
      {
        code: 'function buscaBinaria(arr, alvo) {',
        indent: 0,
        termId: null,
        complexityCost: 'O(1)',
        tagColor: 'gray',
        executionCountFormula: '1',
        explanation: 'Entrada: vetor ordenado de tamanho n.'
      },
      {
        code: '  let inicio = 0, fim = arr.length - 1;',
        indent: 1,
        termId: 't_init',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo fixo',
        explanation: 'Configuração dos ponteiros de busca nas extremidades do vetor (termo constante 1).'
      },
      {
        code: '  while (inicio <= fim) {',
        indent: 1,
        termId: 't_while',
        complexityCost: 'O(log n)',
        tagColor: 'blue',
        executionCountFormula: 'log₂(n) + 1 testes',
        explanation: 'Laço logarítmico: o intervalo de busca diminui 50% a cada volta, totalizando log₂(n) + 1 avaliações de condição.'
      },
      {
        code: '    let meio = Math.floor((inicio + fim) / 2);',
        indent: 2,
        termId: 't_body',
        complexityCost: 'O(1) × log n',
        tagColor: 'blue',
        executionCountFormula: 'log₂(n) vezes',
        explanation: 'Calcula o ponto central em cada iteração do laço.'
      },
      {
        code: '    if (arr[meio] === alvo) return meio;',
        indent: 2,
        termId: 't_body',
        complexityCost: 'O(1) × log n',
        tagColor: 'blue',
        executionCountFormula: 'log₂(n) vezes',
        explanation: 'Comparação de igualdade.'
      },
      {
        code: '    if (arr[meio] < alvo) inicio = meio + 1;',
        indent: 2,
        termId: 't_body',
        complexityCost: 'O(1) × log n',
        tagColor: 'blue',
        executionCountFormula: 'log₂(n) vezes',
        explanation: 'Descarta a metade esquerda se o alvo for maior.'
      },
      {
        code: '    else fim = meio - 1;',
        indent: 2,
        termId: 't_body',
        complexityCost: 'O(1) × log n',
        tagColor: 'blue',
        executionCountFormula: 'log₂(n) vezes',
        explanation: 'Ou descarta a metade direita se for menor.'
      },
      {
        code: '  }',
        indent: 1,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do laço while.'
      },
      {
        code: '  return -1;',
        indent: 1,
        termId: 't_ret',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo',
        explanation: 'Retorno de insucesso caso o item não esteja no vetor.'
      },
      {
        code: '}',
        indent: 0,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim da função.'
      }
    ],
    calculateTotalOperations: (n) => {
      const steps = Math.max(1, Math.floor(Math.log2(n || 1)));
      return 1 + (steps + 1) + 3 * steps + 1;
    }
  },
  {
    id: 'case-on',
    title: 'Varredura Linear Simples',
    category: 'Tempo Linear',
    badge: 'O(n) - Proporcional',
    bigO: 'O(n)',
    growthName: 'Linear',
    analogy: 'Ler uma lista de compras de cima a baixo, item por item, até a última linha.',
    tokens: [
      { id: 't_init', label: '1', lineIndices: [1], tagColor: 'green', description: 'Inicialização da variável acumuladora let total = 0', calculateValue: () => 1 },
      { id: 'op_plus1', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_for_cond', label: '(n + 1)', lineIndices: [2], tagColor: 'amber', description: 'Testes de condição no cabeçalho do for (0 até n inclusive)', calculateValue: (n) => n + 1 },
      { id: 'op_plus2', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_body', label: 'n', lineIndices: [3], tagColor: 'amber', description: 'Soma cumulativa executada 1 vez para cada um dos n elementos', calculateValue: (n) => n },
      { id: 'op_plus3', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_ret', label: '1', lineIndices: [5], tagColor: 'green', description: 'Retorno final do total acumulado', calculateValue: () => 1 }
    ],
    resultSum: '2n + 3',
    dominantTermId: 't_body',
    simplificationSteps: [
      'A inicialização e o retorno custam 2 passos fixos.',
      'O cabeçalho do for testa a condição n + 1 vezes.',
      'O corpo do laço total += lista[i] executa n vezes.',
      'Equação: T(n) = 2n + 3. Descartando constantes (o 3 e o coeficiente 2), obtemos O(n).'
    ],
    lines: [
      {
        code: 'function somarElementos(lista) {',
        indent: 0,
        termId: null,
        complexityCost: 'O(1)',
        tagColor: 'gray',
        executionCountFormula: '1',
        explanation: 'Entrada com n números.'
      },
      {
        code: '  let total = 0;',
        indent: 1,
        termId: 't_init',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo fixo',
        explanation: 'Criação do acumulador na memória (termo 1 na fórmula).'
      },
      {
        code: '  for (let i = 0; i < lista.length; i++) {',
        indent: 1,
        termId: 't_for_cond',
        complexityCost: 'O(n)',
        tagColor: 'amber',
        executionCountFormula: 'n + 1 testes',
        explanation: 'Cabeçalho do laço: avalia a condição de parada n + 1 vezes (termo (n + 1) na fórmula).'
      },
      {
        code: '    total += lista[i];',
        indent: 2,
        termId: 't_body',
        complexityCost: 'O(n)',
        tagColor: 'amber',
        executionCountFormula: 'n vezes',
        explanation: 'Corpo interno: executa exatamente n vezes para somar cada item (termo n na fórmula).'
      },
      {
        code: '  }',
        indent: 1,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do laço for.'
      },
      {
        code: '  return total;',
        indent: 1,
        termId: 't_ret',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo fixo',
        explanation: 'Retorno do resultado final (termo 1 na fórmula).'
      },
      {
        code: '}',
        indent: 0,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim da função.'
      }
    ],
    calculateTotalOperations: (n) => 1 + (n + 1) + n + 1
  },
  {
    id: 'case-on2',
    title: 'Comparação de Todos contra Todos (Loops Aninhados)',
    category: 'Tempo Quadrático',
    badge: 'O(n²) - Crescimento Rápido',
    bigO: 'O(n²)',
    growthName: 'Quadrático',
    analogy: 'Cada pessoa em um salão cumprimenta individualmente todas as outras pessoas presentes.',
    tokens: [
      { id: 't_init', label: '1', lineIndices: [1], tagColor: 'green', description: 'Alocação do array let pares = []', calculateValue: () => 1 },
      { id: 'op_plus1', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_for_ext', label: '(n + 1)', lineIndices: [2], tagColor: 'amber', description: 'Laço externo i (executa n voltas)', calculateValue: (n) => n + 1 },
      { id: 'op_plus2', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_for_int', label: 'n · (n + 1)', lineIndices: [3], tagColor: 'red', description: 'Laço interno j (roda (n + 1) vezes PARA CADA uma das n voltas do externo)', calculateValue: (n) => n * (n + 1) },
      { id: 'op_plus3', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_body_nested', label: 'n²', lineIndices: [4], tagColor: 'red', description: 'Comparação if realizada n × n = n² vezes no pior caso', calculateValue: (n) => n * n },
      { id: 'op_plus4', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_ret', label: '1', lineIndices: [9], tagColor: 'green', description: 'Retorno dos pares', calculateValue: () => 1 }
    ],
    resultSum: '2n² + 2n + 3',
    dominantTermId: 't_body_nested',
    simplificationSteps: [
      'O loop externo executa n vezes.',
      'Para cada volta do loop externo, o loop interno executa n vezes: temos n × n = n² execuções!',
      'Equação completa: T(n) = 2n² + 2n + 3.',
      'Aplicando a Regra 2 (Termo Dominante): quando n = 1.000, 2n² = 2.000.000 enquanto 2n = 2.000. O termo n² domina totalmente: O(n²).'
    ],
    lines: [
      {
        code: 'function encontrarPares(lista) {',
        indent: 0,
        termId: null,
        complexityCost: 'O(1)',
        tagColor: 'gray',
        executionCountFormula: '1',
        explanation: 'Entrada com n elementos.'
      },
      {
        code: '  let pares = [];',
        indent: 1,
        termId: 't_init',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo fixo',
        explanation: 'Inicialização de memória do array de resultados (termo 1 na fórmula).'
      },
      {
        code: '  for (let i = 0; i < lista.length; i++) {',
        indent: 1,
        termId: 't_for_ext',
        complexityCost: 'O(n)',
        tagColor: 'amber',
        executionCountFormula: 'n + 1 testes',
        explanation: 'Laço Externo: itera n vezes para fixar o primeiro elemento i (termo (n + 1)).'
      },
      {
        code: '    for (let j = 0; j < lista.length; j++) {',
        indent: 2,
        termId: 't_for_int',
        complexityCost: 'O(n²)',
        tagColor: 'red',
        executionCountFormula: 'n × (n + 1) testes',
        explanation: 'Laço Interno: para CADA uma das n voltas de i, j percorre de 0 a n (termo n · (n + 1)).'
      },
      {
        code: '      if (i !== j && lista[i] === lista[j]) {',
        indent: 3,
        termId: 't_body_nested',
        complexityCost: 'O(n²)',
        tagColor: 'red',
        executionCountFormula: 'n² vezes',
        explanation: 'Comparação cruzada: executada exatamente n × n = n² vezes (termo n² na fórmula).'
      },
      {
        code: '        pares.push([lista[i], lista[j]]);',
        indent: 4,
        termId: 't_body_nested',
        complexityCost: '≤ O(n²)',
        tagColor: 'red',
        executionCountFormula: '≤ n² vezes',
        explanation: 'Inserção no array de pares no pior caso.'
      },
      {
        code: '      }',
        indent: 3,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do if.'
      },
      {
        code: '    }',
        indent: 2,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do laço interno j.'
      },
      {
        code: '  }',
        indent: 1,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do laço externo i.'
      },
      {
        code: '  return pares;',
        indent: 1,
        termId: 't_ret',
        complexityCost: 'O(1)',
        tagColor: 'green',
        executionCountFormula: '1 passo fixo',
        explanation: 'Retorno do resultado (termo 1 na fórmula).'
      },
      {
        code: '}',
        indent: 0,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim da função.'
      }
    ],
    calculateTotalOperations: (n) => 1 + (n + 1) + n * (n + 1) + n * n + 1
  },
  {
    id: 'case-twophases',
    title: 'Duas Fases Consecutivas (Soma vs Multiplicação)',
    category: 'Regra do Termo Dominante',
    badge: 'O(n + n²) → O(n²)',
    bigO: 'O(n²)',
    growthName: 'Quadrático (Dominante)',
    analogy: 'Você passa 5 minutos limpando a mesa (n) e depois 6 horas preparando 50 pratos para todos os convidados (n²). A limpeza se torna insignificante.',
    tokens: [
      { id: 't_phase1', label: '2n', lineIndices: [2, 3], tagColor: 'amber', description: 'Fase 1: Laço linear simples isolado que percorre os n dados', calculateValue: (n) => 2 * n },
      { id: 'op_plus1', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_phase2_ext', label: 'n', lineIndices: [6], tagColor: 'amber', description: 'Fase 2: Laço externo', calculateValue: (n) => n },
      { id: 'op_plus2', label: '+', isOperator: true, lineIndices: [], description: '', calculateValue: () => 0 },
      { id: 't_phase2_nested', label: '2n²', lineIndices: [7, 8], tagColor: 'red', description: 'Fase 2: Laço duplo aninhado comparando todos com todos (n × n)', calculateValue: (n) => 2 * n * n }
    ],
    resultSum: '2n² + 3n',
    dominantTermId: 't_phase2_nested',
    simplificationSteps: [
      'Fase 1 realiza 2n operações lineares.',
      'Fase 2 realiza 2n² operações quadráticas.',
      'Soma de blocos sequenciais: T(n) = 2n + 2n² + n = 2n² + 3n.',
      'Quando n = 1.000, 2n² = 2.000.000 e 3n = 3.000. Descartamos o termo 3n por ser não-dominante: O(n²).'
    ],
    lines: [
      {
        code: 'function processarEmFases(dados) {',
        indent: 0,
        termId: null,
        complexityCost: 'O(1)',
        tagColor: 'gray',
        executionCountFormula: '1',
        explanation: 'Entrada com n dados.'
      },
      {
        code: '  // FASE 1: Varredura Linear Simples (O(n))',
        indent: 1,
        termId: 't_phase1',
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Início da Fase 1 independente.'
      },
      {
        code: '  for (let i = 0; i < dados.length; i++) {',
        indent: 1,
        termId: 't_phase1',
        complexityCost: 'O(n)',
        tagColor: 'amber',
        executionCountFormula: 'n vezes',
        explanation: 'Laço simples da Fase 1: itera n vezes (termo 2n na fórmula).'
      },
      {
        code: '    validar(dados[i]);',
        indent: 2,
        termId: 't_phase1',
        complexityCost: 'O(n)',
        tagColor: 'amber',
        executionCountFormula: 'n vezes',
        explanation: 'Operação da Fase 1 executada n vezes.'
      },
      {
        code: '  }',
        indent: 1,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim da Fase 1.'
      },
      {
        code: '  // FASE 2: Loops Aninhados (O(n²))',
        indent: 1,
        termId: 't_phase2_nested',
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Início da Fase 2 independente.'
      },
      {
        code: '  for (let i = 0; i < dados.length; i++) {',
        indent: 1,
        termId: 't_phase2_ext',
        complexityCost: 'O(n)',
        tagColor: 'amber',
        executionCountFormula: 'n vezes',
        explanation: 'Laço externo da Fase 2: n voltas (termo n na fórmula).'
      },
      {
        code: '    for (let j = 0; j < dados.length; j++) {',
        indent: 2,
        termId: 't_phase2_nested',
        complexityCost: 'O(n²)',
        tagColor: 'red',
        executionCountFormula: 'n × n vezes',
        explanation: 'Laço interno da Fase 2: multiplica as iterações (termo 2n² na fórmula).'
      },
      {
        code: '      comparar(dados[i], dados[j]);',
        indent: 3,
        termId: 't_phase2_nested',
        complexityCost: 'O(n²)',
        tagColor: 'red',
        executionCountFormula: 'n² vezes',
        explanation: 'Instrução mais pesada do algoritmo inteiro.'
      },
      {
        code: '    }',
        indent: 2,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do laço j.'
      },
      {
        code: '  }',
        indent: 1,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim do laço i.'
      },
      {
        code: '}',
        indent: 0,
        termId: null,
        complexityCost: '—',
        tagColor: 'gray',
        executionCountFormula: '—',
        explanation: 'Fim da função.'
      }
    ],
    calculateTotalOperations: (n) => 2 * n + n + 2 * n * n
  }
];

export const BigODiscoveryStudio: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-on2');
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(3);
  const [activeTermId, setActiveTermId] = useState<string | null>('t_for_int');
  const [inputN, setInputN] = useState<number>(8);
  const [activeTab, setActiveTab] = useState<'interactive-math' | 'methodology' | 'golden-rules'>('interactive-math');

  const activeCase = ALGORITHM_CASES.find((c) => c.id === selectedCaseId) || ALGORITHM_CASES[0];

  // Handler when clicking a line in code
  const handleLineClick = (idx: number) => {
    if (activeLineIndex === idx) {
      setActiveLineIndex(null);
      setActiveTermId(null);
    } else {
      setActiveLineIndex(idx);
      const line = activeCase.lines[idx];
      if (line && line.termId) {
        setActiveTermId(line.termId);
      } else {
        setActiveTermId(null);
      }
    }
  };

  // Handler when clicking a token in the formula
  const handleTokenClick = (token: FormulaToken) => {
    if (token.isOperator) return;
    if (activeTermId === token.id) {
      setActiveTermId(null);
      setActiveLineIndex(null);
    } else {
      setActiveTermId(token.id);
      if (token.lineIndices.length > 0) {
        setActiveLineIndex(token.lineIndices[0]);
      } else {
        setActiveLineIndex(null);
      }
    }
  };

  const totalOps = activeCase.calculateTotalOperations(inputN);

  const getTagBadgeStyle = (color?: CodeLine['tagColor']) => {
    switch (color) {
      case 'green':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      case 'blue':
        return 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30';
      case 'amber':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30';
      case 'red':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30';
      case 'purple':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-stone-500/15 text-stone-700 dark:text-stone-300 border-stone-500/30';
    }
  };

  return (
    <div 
      id="big-o-discovery-studio" 
      className="my-10 p-5 sm:p-8 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-sm transition-colors duration-200"
    >
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DBD0] dark:border-[#33302B]">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-semibold">
            <Compass className="w-4 h-4" />
            Análise Anatômica &bull; Da Linha de Código à Fórmula
          </div>
          <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-[#1C1917] dark:text-[#EDE8DF] mt-1">
            Como Descobrir a Notação Big-O
          </h3>
          <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] mt-0.5">
            Clique nas linhas de código ou nos termos matemáticos para ver a conexão imediata entre programação e complexidade.
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-md bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('interactive-math')}
            className={`px-3 py-1.5 rounded text-xs font-sans-ui transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'interactive-math'
                ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold shadow-xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Código &harr; Fórmula Interativa
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-3 py-1.5 rounded text-xs font-sans-ui transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'methodology'
                ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold shadow-xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            O Método das 3 Perguntas
          </button>
          <button
            onClick={() => setActiveTab('golden-rules')}
            className={`px-3 py-1.5 rounded text-xs font-sans-ui transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'golden-rules'
                ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold shadow-xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            As 2 Regras de Ouro
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CÓDIGO & FÓRMULA INTERATIVA (BI-DIRECTIONAL LINKING) */}
      {/* ========================================================================= */}
      {activeTab === 'interactive-math' && (
        <div className="mt-6 space-y-6">
          {/* Selector of Algorithms */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {ALGORITHM_CASES.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedCaseId(item.id);
                  setActiveLineIndex(null);
                  setActiveTermId(null);
                }}
                className={`px-3.5 py-2 rounded text-xs font-sans-ui whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
                  selectedCaseId === item.id
                    ? 'border-[#C93B2B] dark:border-[#E05343] bg-[#C93B2B] text-white font-semibold shadow-xs'
                    : 'border-[#E2DBD0] dark:border-[#33302B] bg-[#FBF9F5] dark:bg-[#141312] text-[#57534E] dark:text-[#A8A29E] hover:border-[#78716C]'
                }`}
              >
                <span className="font-mono-code font-bold">{item.bigO}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {/* Headline & Real World Analogy */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
                  {activeCase.category}
                </span>
                <h4 className="font-serif-title font-bold text-lg sm:text-xl text-[#1C1917] dark:text-[#EDE8DF]">
                  {activeCase.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#C93B2B]/10 dark:bg-[#E05343]/10 text-[#C93B2B] dark:text-[#E05343] font-mono-code font-bold text-xs border border-[#C93B2B]/20">
                  {activeCase.badge}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm font-serif-title text-[#57534E] dark:text-[#A8A29E] italic bg-white dark:bg-[#1C1B19] p-3 rounded border border-[#E2DBD0] dark:border-[#33302B]">
              <Lightbulb className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343] shrink-0 mt-0.5" />
              <span>Analogia do mundo real: &ldquo;{activeCase.analogy}&rdquo;</span>
            </div>
          </div>

          {/* Interactive Simulation Controls for n */}
          <div className="p-4 rounded bg-[#F3EFE6] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-sans-ui font-semibold text-[#1C1917] dark:text-[#EDE8DF] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343]" />
                Tamanho da Entrada (<span className="font-serif italic font-bold text-[#C93B2B] dark:text-[#E05343]">n</span> itens):
              </span>
              <div className="flex items-center gap-1.5">
                {[4, 8, 16, 32, 64].map((nVal) => (
                  <button
                    key={nVal}
                    onClick={() => setInputN(nVal)}
                    className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold transition-all cursor-pointer ${
                      inputN === nVal
                        ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] shadow-xs'
                        : 'bg-white dark:bg-[#22201D] text-[#57534E] dark:text-[#A8A29E] border border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C]'
                    }`}
                  >
                    n = {nVal}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono-code text-[#57534E] dark:text-[#A8A29E] flex items-center gap-2">
              <span>Total de Operações Calculadas:</span>
              <strong className="text-sm font-bold text-[#C93B2B] dark:text-[#E05343] bg-white dark:bg-[#22201D] px-2.5 py-0.5 rounded border border-[#E2DBD0] dark:border-[#33302B]">
                {totalOps.toLocaleString()} passos
              </strong>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE HIGHLIGHTED DYNAMIC FORMULA BAR */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#FAF8F5] dark:bg-[#141312] border-2 border-[#C93B2B]/40 dark:border-[#E05343]/40 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2DBD0] dark:border-[#33302B] pb-2">
              <div className="flex items-center gap-2 text-xs font-sans-ui font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
                <Calculator className="w-4 h-4" />
                Fórmula de Tempo T(n) &bull; Destaque Interativo em Tempo Real
              </div>
              <span className="text-[11px] text-[#78716C] font-sans-ui">
                Passe o mouse ou clique nos blocos matemáticos
              </span>
            </div>

            {/* Visual Formula Token Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-code text-sm sm:text-base">
              <span className="font-bold text-[#1C1917] dark:text-[#EDE8DF] mr-1 select-none text-base">
                T(n) =
              </span>

              {activeCase.tokens.map((token, tIdx) => {
                if (token.isOperator) {
                  return (
                    <span key={tIdx} className="text-[#78716C] font-bold px-1 select-none text-base">
                      {token.label}
                    </span>
                  );
                }

                const isHighlighted = activeTermId === token.id;
                const tokenVal = token.calculateValue(inputN);

                return (
                  <button
                    key={tIdx}
                    onClick={() => handleTokenClick(token)}
                    className={`relative px-3 py-1.5 rounded border font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isHighlighted
                        ? 'ring-2 ring-[#C93B2B] dark:ring-[#E05343] scale-105 shadow-md bg-white dark:bg-[#22201D] text-[#C93B2B] dark:text-[#E05343] border-[#C93B2B] dark:border-[#E05343]'
                        : `${getTagBadgeStyle(token.tagColor)} bg-white/70 dark:bg-[#1C1B19]/70 hover:scale-102`
                    }`}
                    title={token.description}
                  >
                    <span>{token.label}</span>
                    <span className="text-[11px] font-normal opacity-80 border-l border-current pl-1.5">
                      ={tokenVal}
                    </span>
                    {token.id === activeCase.dominantTermId && (
                      <span className="absolute -top-2 -right-1 px-1.5 py-0.5 bg-[#C93B2B] text-white text-[9px] font-sans-ui rounded uppercase font-bold tracking-tighter shadow-xs">
                        Dominante
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Nicely formatted result equation */}
              <div className="flex items-center gap-2 ml-auto sm:ml-2 pl-2 border-l border-[#E2DBD0] dark:border-[#33302B]">
                <span className="text-[#78716C] font-bold select-none">=</span>
                <span className="font-mono-code font-bold text-[#1C1917] dark:text-[#EDE8DF]">
                  {activeCase.resultSum}
                </span>
                <span className="text-[#C93B2B] dark:text-[#E05343] font-bold text-base">&rarr;</span>
                <span className="px-2.5 py-0.5 rounded bg-[#C93B2B]/10 dark:bg-[#E05343]/15 text-[#C93B2B] dark:text-[#E05343] font-mono-code font-bold text-sm border border-[#C93B2B]/30 shadow-xs">
                  {activeCase.bigO}
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ANNOTATED CODE BLOCK WITH DIRECT LINK TO FORMULA */}
          {/* ========================================================================= */}
          <div className="rounded-lg border border-[#33302B] bg-[#141312] overflow-hidden shadow-md">
            {/* Code Block Header */}
            <div className="px-4 py-2.5 bg-[#1C1B19] border-b border-[#33302B] flex items-center justify-between text-xs text-[#A8A29E] font-sans-ui">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343]" />
                <span className="font-semibold text-[#EDE8DF]">Código-Fonte Anotado (Clique para Conectar à Fórmula)</span>
              </div>
              <span className="text-[11px] text-[#78716C]">
                {activeLineIndex !== null ? `Linha ${activeLineIndex + 1} selecionada` : 'Clique em uma linha'}
              </span>
            </div>

            {/* Code Lines with Visual Badges */}
            <div className="p-3 sm:p-4 font-mono-code text-xs sm:text-[13px] overflow-x-auto space-y-1">
              {activeCase.lines.map((line, idx) => {
                const isLineActive = activeLineIndex === idx;
                const isTermActive = activeTermId && line.termId === activeTermId;
                const isHighlighted = isLineActive || isTermActive;

                return (
                  <div
                    key={idx}
                    onClick={() => handleLineClick(idx)}
                    className={`flex items-center justify-between gap-3 p-1.5 rounded cursor-pointer transition-all ${
                      isHighlighted 
                        ? 'bg-[#2A2420] dark:bg-[#2A2420] border-l-4 border-l-[#C93B2B] dark:border-l-[#E05343] text-white pl-2 shadow-xs' 
                        : 'hover:bg-[#1E1C1A] text-[#EDE8DF]'
                    }`}
                  >
                    {/* Left: Line Number + Indented Code */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`w-6 text-right text-[11px] select-none font-mono-code ${isHighlighted ? 'text-[#E05343] font-bold' : 'text-[#78716C]'}`}>
                        {idx + 1}
                      </span>
                      <pre 
                        className="font-mono-code"
                        style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                      >
                        {line.code}
                      </pre>
                    </div>

                    {/* Right: Line Big-O Tag & Linked Formula Term */}
                    <div className="flex items-center gap-2 shrink-0">
                      {line.termId && (
                        <span className={`text-[10px] px-2 py-0.5 rounded font-sans-ui hidden md:inline border ${
                          isHighlighted 
                            ? 'bg-[#C93B2B] text-white border-[#C93B2B] font-bold' 
                            : 'bg-[#22201D] text-[#A8A29E] border-[#33302B]'
                        }`}>
                          &rarr; Termo na Fórmula: {activeCase.tokens.find(t => t.id === line.termId)?.label || '1'}
                        </span>
                      )}

                      {line.complexityCost !== '—' && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTagBadgeStyle(line.tagColor)}`}>
                          {line.complexityCost}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEEP DIVE: ACTIVE TERM & LINE INSPECTOR */}
          {/* ========================================================================= */}
          {(activeLineIndex !== null || activeTermId !== null) && (
            <div className="p-4 sm:p-5 rounded-lg bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B]/40 dark:border-[#E05343]/40 animate-in fade-in duration-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-code font-bold text-xs bg-[#C93B2B] text-white px-2.5 py-0.5 rounded">
                      {activeLineIndex !== null ? `Linha ${activeLineIndex + 1}` : 'Termo Selecionado'}
                    </span>
                    {activeLineIndex !== null && (
                      <span className="font-mono-code text-xs text-[#1C1917] dark:text-[#EDE8DF] font-semibold">
                        {activeCase.lines[activeLineIndex].code.trim()}
                      </span>
                    )}
                    {activeTermId && (
                      <span className="text-xs font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343] bg-white dark:bg-[#1C1B19] px-2 py-0.5 rounded border border-[#C93B2B]/30">
                        Termo Matemático: {activeCase.tokens.find(t => t.id === activeTermId)?.label}
                      </span>
                    )}
                  </div>

                  <p className="font-serif-title text-xs sm:text-sm text-[#1C1917] dark:text-[#EDE8DF] mt-1 leading-relaxed">
                    <strong>Explicação Didática:</strong> {activeLineIndex !== null ? activeCase.lines[activeLineIndex].explanation : activeCase.tokens.find(t => t.id === activeTermId)?.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] text-xs font-mono-code">
                      <span className="text-[#78716C] block text-[10px] uppercase font-sans-ui">Fórmula de Execuções:</span>
                      <strong className="text-[#C93B2B] dark:text-[#E05343]">
                        {activeLineIndex !== null ? activeCase.lines[activeLineIndex].executionCountFormula : activeCase.tokens.find(t => t.id === activeTermId)?.label}
                      </strong>
                    </div>

                    <div className="p-2.5 rounded bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] text-xs font-mono-code">
                      <span className="text-[#78716C] block text-[10px] uppercase font-sans-ui">Valor para n = {inputN}:</span>
                      <strong className="text-emerald-700 dark:text-emerald-400">
                        {activeTermId ? activeCase.tokens.find(t => t.id === activeTermId)?.calculateValue(inputN) : 1} operações
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveLineIndex(null);
                    setActiveTermId(null);
                  }}
                  className="text-xs text-[#78716C] hover:text-[#1C1917] dark:hover:text-white px-2 py-1 cursor-pointer"
                >
                  &times; Fechar
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SIMPLIFICATION & ASYMPTOTIC BREAKDOWN CARDS */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Visual Weight Bar (Why Dominant Term Wins) */}
            <div className="lg:col-span-6 p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans-ui font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
                <TrendingUp className="w-4 h-4" />
                Impacto Relativo dos Termos (Para n = {inputN})
              </div>

              <p className="text-xs font-serif-title text-[#57534E] dark:text-[#A8A29E]">
                Veja como o termo de maior ordem absorve a esmagadora maioria do tempo à medida que <span className="font-serif italic font-bold text-[#C93B2B] dark:text-[#E05343]">n</span> cresce:
              </p>

              <div className="space-y-2.5 pt-2">
                {activeCase.tokens.filter(t => !t.isOperator).map((t, idx) => {
                  const val = t.calculateValue(inputN);
                  const pct = totalOps > 0 ? Math.round((val / totalOps) * 100) : 0;
                  const isDominant = t.id === activeCase.dominantTermId;

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono-code">
                        <span className="flex items-center gap-1.5 text-[#1C1917] dark:text-[#EDE8DF]">
                          <strong>{t.label}</strong>
                          {isDominant && (
                            <span className="text-[10px] text-[#C93B2B] dark:text-[#E05343] font-bold">(Termo Dominante)</span>
                          )}
                        </span>
                        <span className="text-[#78716C]">
                          {val} passos ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#F3EFE6] dark:bg-[#141312] overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isDominant ? 'bg-[#C93B2B] dark:bg-[#E05343]' : 'bg-stone-400 dark:bg-stone-600'
                          }`}
                          style={{ width: `${Math.max(3, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simplification Steps Box */}
            <div className="lg:col-span-6 p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans-ui font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#EDE8DF]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Como a Equação Simplifica para {activeCase.bigO}
              </div>
              <ol className="space-y-2 text-xs sm:text-[13px] font-serif-title text-[#57534E] dark:text-[#A8A29E] list-decimal list-inside leading-relaxed">
                {activeCase.simplificationSteps.map((step, sIdx) => (
                  <li key={sIdx} className="pl-1">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: O MÉTODO DAS 3 PERGUNTAS DO DETETIVE */}
      {/* ========================================================================= */}
      {activeTab === 'methodology' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-lg bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B]/40 dark:border-[#E05343]/40">
            <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#C93B2B] dark:text-[#E05343] flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              O Algoritmo Mental: Como Descobrir o Big-O de Qualquer Código
            </h4>
            <p className="font-serif-title text-xs sm:text-sm text-[#1C1917] dark:text-[#EDE8DF] mt-1 leading-relaxed">
              Você não precisa calcular limites matemáticos complexos para 99% dos algoritmos de programação. Basta seguir este processo sistemático em 3 passos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3 relative">
              <span className="w-6 h-6 rounded-full bg-[#C93B2B] text-white flex items-center justify-center font-bold text-xs font-mono-code">
                1
              </span>
              <h5 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF]">
                Identifique quem é o &ldquo;n&rdquo;
              </h5>
              <p className="font-serif-title text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Descubra qual é a variável que pode crescer infinitamente. É o tamanho de um vetor? A quantidade de linhas de uma matriz? A profundidade de uma árvore?
              </p>
              <div className="p-2.5 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] text-[11px] font-mono-code text-[#78716C]">
                Exemplo: lista.length = n
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3 relative">
              <span className="w-6 h-6 rounded-full bg-[#C93B2B] text-white flex items-center justify-center font-bold text-xs font-mono-code">
                2
              </span>
              <h5 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF]">
                Conte os Laços e Divisões
              </h5>
              <p className="font-serif-title text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Observe como as instruções se repetem:
              </p>
              <ul className="text-xs font-mono-code space-y-1 text-[#1C1917] dark:text-[#EDE8DF]">
                <li>• Sem laços &rarr; <strong className="text-emerald-600 dark:text-emerald-400">O(1)</strong></li>
                <li>• Corta em 2 a cada volta &rarr; <strong className="text-sky-600 dark:text-sky-400">O(log n)</strong></li>
                <li>• 1 laço for simples &rarr; <strong className="text-amber-600 dark:text-amber-400">O(n)</strong></li>
                <li>• Laço dentro de laço &rarr; <strong className="text-rose-600 dark:text-rose-400">O(n²)</strong></li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3 relative">
              <span className="w-6 h-6 rounded-full bg-[#C93B2B] text-white flex items-center justify-center font-bold text-xs font-mono-code">
                3
              </span>
              <h5 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF]">
                O Teste Mental de Dobrar <span className="font-serif italic font-bold">n</span>
              </h5>
              <p className="font-serif-title text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Pergunte a si mesmo: <em>&ldquo;Se a entrada for multiplicada por 2, o que acontece com as operações?&rdquo;</em>
              </p>
              <ul className="text-xs font-mono-code space-y-1 text-[#1C1917] dark:text-[#EDE8DF]">
                <li>• Não muda nada? &rarr; <strong className="text-emerald-600 dark:text-emerald-400">O(1)</strong></li>
                <li>• Aumenta apenas 1 passo? &rarr; <strong className="text-sky-600 dark:text-sky-400">O(log n)</strong></li>
                <li>• O tempo dobra (2x)? &rarr; <strong className="text-amber-600 dark:text-amber-400">O(n)</strong></li>
                <li>• O tempo quadruplica (4x)? &rarr; <strong className="text-rose-600 dark:text-rose-400">O(n²)</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: AS 2 REGRAS DE OURO DA SIMPLIFICAÇÃO */}
      {/* ========================================================================= */}
      {activeTab === 'golden-rules' && (
        <div className="mt-6 space-y-6">
          <div className="p-4 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
            <h4 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343]" />
              Como a Matemática Assintótica Limpa Expressões Complexas
            </h4>
            <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] mt-1">
              O objetivo do Big-O não é medir milissegundos exatos em uma máquina específica, mas sim a <strong>curva de escalabilidade</strong> quando <span className="font-serif italic font-bold text-[#C93B2B] dark:text-[#E05343]">n</span> tende ao infinito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Rule 1 */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
              <span className="text-[11px] font-mono-code font-bold uppercase text-[#C93B2B] dark:text-[#E05343]">
                Regra de Ouro 1
              </span>
              <h5 className="font-serif-title font-bold text-lg text-[#1C1917] dark:text-[#EDE8DF]">
                Descarte as Constantes Multiplicativas
              </h5>
              <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Não importa se o laço faz 2 operações ou 100 operações por volta: a inclinação da reta continua linear.
              </p>

              <div className="p-3.5 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] font-mono-code text-xs space-y-1.5 text-[#1C1917] dark:text-[#EDE8DF]">
                <div className="flex items-center justify-between">
                  <span>• O(2n)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">&rarr; O(n)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• O(500)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">&rarr; O(1)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• O(n / 2)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">&rarr; O(n)</span>
                </div>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
              <span className="text-[11px] font-mono-code font-bold uppercase text-[#C93B2B] dark:text-[#E05343]">
                Regra de Ouro 2
              </span>
              <h5 className="font-serif-title font-bold text-lg text-[#1C1917] dark:text-[#EDE8DF]">
                Descarte os Termos Não Dominantes
              </h5>
              <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Mantenha unicamente a parcela de maior expoente, pois ela absorve 99,99% do custo quando <span className="font-serif italic font-bold text-[#C93B2B] dark:text-[#E05343]">n</span> cresce.
              </p>

              <div className="p-3.5 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] font-mono-code text-xs space-y-1.5 text-[#1C1917] dark:text-[#EDE8DF]">
                <div className="flex items-center justify-between">
                  <span>• O(n² + n + 100)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">&rarr; O(n²)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• O(n + log n)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">&rarr; O(n)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• O(2ⁿ + n¹⁰)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">&rarr; O(2ⁿ)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Speed Scale */}
          <div className="p-4 rounded bg-[#F3EFE6] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B]">
            <div className="text-xs font-sans-ui font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#EDE8DF] mb-2">
              Hierarquia de Eficiência (Do Mais Rápido ao Mais Explosivo):
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs font-bold">
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">O(1)</span>
              <span className="text-[#78716C]">&lt;</span>
              <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">O(log n)</span>
              <span className="text-[#78716C]">&lt;</span>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">O(n)</span>
              <span className="text-[#78716C]">&lt;</span>
              <span className="px-2.5 py-1 rounded bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20">O(n log n)</span>
              <span className="text-[#78716C]">&lt;</span>
              <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">O(n²)</span>
              <span className="text-[#78716C]">&lt;</span>
              <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">O(2ⁿ)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
