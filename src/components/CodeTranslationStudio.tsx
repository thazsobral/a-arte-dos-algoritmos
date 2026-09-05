import React, { useState } from 'react';
import { 
  Code2, 
  FileCode, 
  Check, 
  Copy, 
  Terminal, 
  Compass, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CodeTranslationStudio: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'pseudocode' | 'python' | 'javascript' | 'c'>('pseudocode');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const stepsMapping = [
    {
      id: 1,
      human: '1. Pegue a lista telefônica e defina o início (página 1) e o fim (última página).',
      pseudocode: 'low = 1, high = total_de_paginas',
      python: 'low = 0\nhigh = len(lista) - 1',
      javascript: 'let low = 0;\nlet high = lista.length - 1;',
      c: 'int low = 0;\nint high = tamanho - 1;'
    },
    {
      id: 2,
      human: '2. Enquanto ainda houver páginas a verificar (início <= fim):',
      pseudocode: 'enquanto low <= high faça:',
      python: 'while low <= high:',
      javascript: 'while (low <= high) {',
      c: 'while (low <= high) {'
    },
    {
      id: 3,
      human: '3. Abra exatamente na página do meio entre o início e o fim.',
      pseudocode: '  meio = (low + high) / 2',
      python: '    mid = (low + high) // 2',
      javascript: '  const mid = Math.floor((low + high) / 2);',
      c: '    int mid = (low + high) / 2;'
    },
    {
      id: 4,
      human: '4. Olhe para o nome na página: se for quem você procura, parabéns!',
      pseudocode: '  se nome_na_pagina == alvo então retorne meio',
      python: '    if lista[mid] == alvo:\n        return mid',
      javascript: '  if (lista[mid] === alvo) {\n    return mid;\n  }',
      c: '    if (strcmp(lista[mid], alvo) == 0) {\n        return mid;\n    }'
    },
    {
      id: 5,
      human: '5. Se o nome procurado vem antes no alfabeto, descarte a metade direita.',
      pseudocode: '  senão se alvo < nome_na_pagina então high = meio - 1',
      python: '    elif alvo < lista[mid]:\n        high = mid - 1',
      javascript: '  else if (alvo < lista[mid]) {\n    high = mid - 1;\n  }',
      c: '    else if (strcmp(alvo, lista[mid]) < 0) {\n        high = mid - 1;\n    }'
    },
    {
      id: 6,
      human: '6. Caso contrário, se vem depois no alfabeto, descarte a metade esquerda.',
      pseudocode: '  senão low = meio + 1',
      python: '    else:\n        low = mid + 1',
      javascript: '  else {\n    low = mid + 1;\n  }',
      c: '    else {\n        low = mid + 1;\n    }'
    },
    {
      id: 7,
      human: '7. Se todas as páginas forem esgotadas e não encontrar, o nome não está na lista.',
      pseudocode: 'retorne "Não encontrado"',
      python: 'return -1  # Não encontrado',
      javascript: 'return -1; // Não encontrado',
      c: 'return -1; // Não encontrado'
    }
  ];

  const fullPrograms: Record<string, string> = {
    pseudocode: `// Algoritmo: Busca Binária Didática (O(log n) tempo, O(1) espaço)
função busca_binaria(lista, alvo):
    low = 1
    high = comprimento(lista)
    
    enquanto low <= high faça:
        meio = parte_inteira((low + high) / 2)
        se lista[meio] == alvo então:
            retorne meio // Contato encontrado!
        senão se alvo < lista[meio] então:
            high = meio - 1 // Descarta metade superior
        senão:
            low = meio + 1  // Descarta metade inferior
            
    retorne -1 // Não encontrado`,

    python: `# Busca Binária Pronta para Executar (Python 3)
# O(log n) Tempo | O(1) Espaço
def busca_binaria(lista, alvo):
    low = 0
    high = len(lista) - 1
    
    while low <= high:
        mid = (low + high) // 2
        chute = lista[mid]
        if chute == alvo:
            return mid
        elif chute > alvo:
            high = mid - 1
        else:
            low = mid + 1
    return -1

# Teste você mesmo no terminal:
dados = ["Alice", "Bernardo", "Camila", "Daniel", "Eduarda", "Lucas", "Sofia"]
posicao = busca_binaria(dados, "Lucas")
print(f"Encontrado no índice: {posicao}")`,

    javascript: `// Busca Binária em JavaScript / Node.js
// O(log n) Tempo | O(1) Espaço
function buscaBinaria(lista, alvo) {
  let low = 0;
  let high = lista.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const chute = lista[mid];
    
    if (chute === alvo) {
      return mid; // Retorna índice encontrado
    } else if (chute > alvo) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1; // Não encontrado
}

// Cole no Console do Navegador (F12) e teste agora:
const nomes = ["Alice", "Bernardo", "Camila", "Daniel", "Eduarda", "Lucas", "Sofia"];
console.log("Posição de Lucas:", buscaBinaria(nomes, "Lucas"));`,

    c: `// Busca Binária Pura em Linguagem C (Padrão Harvard CS50)
// O(log n) Tempo | O(1) Espaço
#include <stdio.h>
#include <string.h>

int busca_binaria(char *lista[], int tamanho, char *alvo) {
    int low = 0;
    int high = tamanho - 1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        int cmp = strcmp(lista[mid], alvo);
        
        if (cmp == 0) {
            return mid; // Sucesso!
        } else if (cmp > 0) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}

int main(void) {
    char *nomes[] = {"Alice", "Bernardo", "Camila", "Daniel", "Eduarda", "Lucas"};
    int index = busca_binaria(nomes, 6, "Daniel");
    printf("Índice encontrado: %d\\n", index);
    return 0;
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fullPrograms[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      id="code-translation-studio"
      className="my-10 p-5 sm:p-8 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-semibold">
        <Code2 className="w-4 h-4" />
        Tradução Didática &bull; Pensamento Computacional
      </div>
      <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-[#1C1917] dark:text-[#EDE8DF] mt-1">
        Da Instrução Humana ao Código de Máquina
      </h3>
      <p className="font-serif-title text-sm sm:text-base text-[#57534E] dark:text-[#A8A29E] mt-1 leading-relaxed">
        Programadores transformam instruções lógicas em texto para que computadores possam executá-las de forma rigorosa e confiável. Passe o cursor sobre cada etapa para ver a correspondência direta.
      </p>

      {/* Tabs for Language & Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pb-3 border-b border-[#E2DBD0] dark:border-[#33302B]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans-ui text-[#78716C]">Linguagem de Destino:</span>
          <div className="flex flex-wrap items-center gap-1">
            {(['pseudocode', 'python', 'javascript', 'c'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1 rounded text-xs font-mono-code transition-all cursor-pointer ${
                  activeLang === lang
                    ? 'bg-[#C93B2B] text-white font-bold shadow-xs'
                    : 'bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] text-[#57534E] dark:text-[#A8A29E] hover:border-[#78716C]'
                }`}
              >
                {lang === 'pseudocode' ? 'Pseudocódigo' : lang === 'python' ? 'Python' : lang === 'javascript' ? 'JavaScript' : 'C (Harvard)'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCopyCode}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans-ui font-semibold bg-[#F3EFE6] dark:bg-[#22201D] border border-[#E2DBD0] dark:border-[#33302B] text-[#1C1917] dark:text-[#EDE8DF] hover:border-[#C93B2B] dark:hover:border-[#E05343] transition-colors cursor-pointer self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Código Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#C93B2B] dark:text-[#E05343]" />
              <span>Copiar Código Completo</span>
            </>
          )}
        </button>
      </div>

      {/* Side-by-side interactive comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Left Column: Human Natural Instructions */}
        <div className="p-4 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#E2DBD0] dark:border-[#33302B] text-xs font-sans-ui uppercase tracking-wider font-semibold text-[#1C1917] dark:text-[#EDE8DF]">
            <FileCode className="w-3.5 h-3.5 text-[#C93B2B] dark:text-[#E05343]" />
            1. Pensamento Humano (Passo a Passo)
          </div>
          <div className="space-y-2">
            {stepsMapping.map((step, idx) => {
              const isHovered = highlightedIndex === idx;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                  className={`p-2.5 rounded cursor-pointer transition-all border ${
                    isHovered
                      ? 'border-[#C93B2B] dark:border-[#E05343] bg-[#FDF2F0] dark:bg-[#2A1715]'
                      : 'border-transparent hover:border-[#E2DBD0] dark:hover:border-[#33302B]'
                  }`}
                >
                  <p className="font-serif-title text-sm text-[#1C1917] dark:text-[#EDE8DF] leading-relaxed">
                    {step.human}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code in Selected Language */}
        <div className="p-4 rounded bg-[#1C1917] text-[#FAF8F5] border border-[#33302B] font-mono-code text-xs relative overflow-x-auto">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#33302B] text-xs font-sans-ui text-[#A8A29E]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C93B2B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2DBD0]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2DBD0]/30" />
              <span className="ml-2 font-mono-code text-[11px] uppercase">
                {activeLang === 'pseudocode' ? 'binary_search.algo' : `binary_search.${activeLang === 'python' ? 'py' : activeLang === 'javascript' ? 'js' : 'c'}`}
              </span>
            </div>
            <span className="text-[10px] text-[#A8A29E]">Sintaxe formal</span>
          </div>

          <div className="space-y-2">
            {stepsMapping.map((step, idx) => {
              const isHovered = highlightedIndex === idx;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                  className={`p-2 rounded transition-all whitespace-pre font-mono-code ${
                    isHovered
                      ? 'bg-[#C93B2B]/30 ring-1 ring-[#C93B2B] text-white'
                      : 'bg-transparent text-[#EDE8DF]/90'
                  }`}
                >
                  {step[activeLang]}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* O MANCHE DO DESENVOLVEDOR: CTA & DESAFIO PRÁTICO */}
      {/* ========================================================================= */}
      <div className="mt-8 p-6 rounded-lg bg-[#F3EFE6] dark:bg-[#141312] border-2 border-[#C93B2B]/30 dark:border-[#E05343]/30 space-y-4">
        <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-bold">
          <Compass className="w-4 h-4" />
          O Manche do Desenvolvedor &bull; Seu Chamado à Criação
        </div>

        <h4 className="font-serif-title font-bold text-lg sm:text-xl text-[#1C1917] dark:text-[#EDE8DF]">
          Assuma o Controle: É Hora de Tirar a Lógica do Papel
        </h4>

        <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
          Você já compreendeu a intuição dos passos ordenados, a matemática implacável do Big-O e a física do silício. O conhecimento só se consolida quando seus dedos tocam o teclado. Escolha um dos desafios abaixo, abra seu editor favorito e implemente a sua solução:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Challenge 1 */}
          <div className="p-4 rounded-md bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343]">
              <Terminal className="w-3.5 h-3.5" />
              Missão 1: O Duelo
            </div>
            <h5 className="font-serif-title font-bold text-sm text-[#1C1917] dark:text-[#EDE8DF]">
              Busca Linear vs Binária
            </h5>
            <p className="text-xs font-serif-title text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
              Crie um array com 1.000.000 de inteiros. Meça o tempo gasto com cronômetro em microssegundos para encontrar o último elemento usando as duas abordagens.
            </p>
          </div>

          {/* Challenge 2 */}
          <div className="p-4 rounded-md bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Missão 2: Caça ao O(n²)
            </div>
            <h5 className="font-serif-title font-bold text-sm text-[#1C1917] dark:text-[#EDE8DF]">
              Eliminando Loops Aninhados
            </h5>
            <p className="text-xs font-serif-title text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
              Pegue uma rotina de checagem de duplicatas feita com dois loops aninhados e refatore-a para O(n) utilizando uma Tabela Hash (Set ou Dicionário).
            </p>
          </div>

          {/* Challenge 3 */}
          <div className="p-4 rounded-md bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              Missão 3: Alocação Zero
            </div>
            <h5 className="font-serif-title font-bold text-sm text-[#1C1917] dark:text-[#EDE8DF]">
              Algoritmo In-Place
            </h5>
            <p className="text-xs font-serif-title text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
              Inverta um array de qualquer tamanho mantendo complexidade de espaço estritamente O(1), trocando os elementos simétricos com dois ponteiros.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans-ui text-[#78716C] border-t border-[#E2DBD0] dark:border-[#33302B]">
          <span>Dica: você pode colar o código diretamente no terminal do Node.js, Python ou no Console do Navegador (F12).</span>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <span>Copiar Algoritmo e Começar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

