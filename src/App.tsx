import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PhoneBookSimulator } from './components/PhoneBookSimulator';
import { BigOGraphVisualizer } from './components/BigOGraphVisualizer';
import { BigODiscoveryStudio } from './components/BigODiscoveryStudio';
import { HardwareStressLab } from './components/HardwareStressLab';
import { CodeTranslationStudio } from './components/CodeTranslationStudio';
import { QuizSection } from './components/QuizSection';
import { EditorialFooter } from './components/EditorialFooter';
import { 
  BookOpen, 
  Sparkles, 
  ArrowDown, 
  Lightbulb, 
  Scissors, 
  Compass, 
  ChevronDown, 
  Check, 
  Layers,
  FileText
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('algo_editorial_theme') === 'dark';
    }
    return false;
  });

  const [activeChapter, setActiveChapter] = useState<string>('intro');
  const [expandedNote, setExpandedNote] = useState<Record<string, boolean>>({
    algorithm: false,
    alphabet: false,
    scale: false
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('algo_editorial_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('algo_editorial_theme', 'light');
    }
  }, [darkMode]);

  const toggleNote = (key: string) => {
    setExpandedNote((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToNextSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#141312] text-[#1C1917] dark:text-[#EDE8DF] transition-colors duration-300 paper-texture selection:bg-[#C93B2B] selection:text-white">
      {/* Header & Table of Contents */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} activeChapter={activeChapter} />

      {/* Main Editorial Container */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        
        {/* Cover / Title Block */}
        <section id="cover" className="text-center pb-12 pt-6 sm:pt-10 border-b border-[#E2DBD0] dark:border-[#33302B]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2DBD0] dark:border-[#33302B] bg-[#F3EFE6] dark:bg-[#1C1B19] text-[11px] font-sans-ui uppercase tracking-widest text-[#78716C] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C93B2B] dark:text-[#E05343]" />
            Tratado de Pensamento Computacional
          </div>

          <h1 className="font-serif-title font-bold text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] dark:text-[#EDE8DF] tracking-tight leading-[1.15]">
            A Arte dos <span className="text-[#C93B2B] dark:text-[#E05343] italic">Algoritmos</span>
          </h1>

          <p className="font-serif-title text-base sm:text-xl text-[#57534E] dark:text-[#A8A29E] mt-4 max-w-xl mx-auto leading-relaxed">
            Como a humanidade aprendeu a transformar a resolução de problemas em passos elegantes, rápidos e matematicamente belos.
          </p>

          <div className="flex items-center justify-center mt-8 text-xs font-sans-ui text-[#78716C]">
            <span>Tempo de leitura estimado: <strong>~20 minutos</strong></span>
          </div>

          <button
            onClick={() => scrollToNextSection('intro')}
            className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E2DBD0] dark:border-[#33302B] bg-[#FFFFFF] dark:bg-[#1C1B19] hover:border-[#C93B2B] dark:hover:border-[#E05343] text-xs font-sans-ui font-semibold text-[#1C1917] dark:text-[#EDE8DF] transition-all shadow-xs group"
          >
            <span>Iniciar a Leitura</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C93B2B] dark:text-[#E05343] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </section>

        {/* ========================================================================= */}
        {/* PRÓLOGO: A ESSÊNCIA DA RESOLUÇÃO DE PROBLEMAS */}
        {/* ========================================================================= */}
        <article id="intro" className="pt-16 pb-12 border-b border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <span>Prólogo</span>
          </div>

          <h2 className="font-serif-title font-bold text-2xl sm:text-4xl text-[#1C1917] dark:text-[#EDE8DF] mb-6">
            A Essência da Resolução de Problemas
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#1C1917] dark:text-[#EDE8DF] font-serif-title">
            <p className="drop-cap">
              A resolução de problemas é o verdadeiro coração da ciência da computação e da programação. Muito antes de existirem telas iluminadas, transistores de silício ou satélites em órbita, os seres humanos já buscavam métodos sistemáticos para resolver desafios cotidianos de maneira confiável e sem ambiguidades.
            </p>

            <div className="my-6 p-6 rounded-lg bg-[#F3EFE6] dark:bg-[#1C1B19] border-l-4 border-[#C93B2B] dark:border-[#E05343] text-[#1C1917] dark:text-[#EDE8DF]">
              <p className="font-serif-title text-lg sm:text-xl font-medium italic leading-snug">
                &ldquo;Um <strong>algoritmo</strong> nada mais é do que um conjunto de instruções passo a passo, rigorosamente ordenadas, projetadas para solucionar um problema específico.&rdquo;
              </p>
            </div>

            <p>
              Pense em uma receita culinária minuciosa, nas orientações para dobrar um origami ou nas coordenadas para navegar por um labirinto. Todas essas construções compartilham a mesma essência: recebem uma <em>entrada</em> (os ingredientes ou a pergunta inicial), aplicam um procedimento metódico e produzem uma <em>saída</em> (o prato pronto ou a solução encontrada).
            </p>
          </div>

          {/* Collapsible Margin Note */}
          <div className="mt-8 p-4 rounded bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B]">
            <button
              onClick={() => toggleNote('algorithm')}
              className="w-full flex items-center justify-between text-left text-xs font-sans-ui font-semibold text-[#57534E] dark:text-[#A8A29E] hover:text-[#C93B2B] dark:hover:text-[#E05343] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343]" />
                Nota Histórica: De onde vem a palavra Algoritmo?
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedNote['algorithm'] ? 'rotate-180' : ''}`} />
            </button>

            {expandedNote['algorithm'] && (
              <p className="mt-3 font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed border-t border-[#E2DBD0] dark:border-[#33302B] pt-3">
                O termo deriva do nome do matemático persa do século IX, <em>Muhammad ibn Musa al-Khwarizmi</em>, pioneiro da álgebra e dos métodos sistemáticos de cálculo numérico. Para a computação moderna, um algoritmo é a essência do raciocínio lógico antes de se tornar código.
              </p>
            )}
          </div>
        </article>

        {/* ========================================================================= */}
        {/* CAPÍTULO I: O ENIGMA DA LISTA TELEFÔNICA */}
        {/* ========================================================================= */}
        <article id="phonebook" className="pt-16 pb-12 border-b border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <span>Capítulo I</span>
          </div>

          <h2 className="font-serif-title font-bold text-2xl sm:text-4xl text-[#1C1917] dark:text-[#EDE8DF] mb-6">
            O Enigma da Lista Telefônica
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#1C1917] dark:text-[#EDE8DF] font-serif-title">
            <p>
              Imagine o problema fundamental de tentar localizar um único nome dentro de uma volumosa <strong>lista telefônica impressa</strong>. Os nomes estão dispostos em perfeita ordem alfabética, de <em>A</em> a <em>Z</em>.
            </p>

            <p className="font-medium text-lg sm:text-xl italic text-[#57534E] dark:text-[#A8A29E]">
              Como você procederia para encontrar o contato desejado?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {/* Box 1 */}
              <div className="p-5 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-xs">
                <span className="text-xs font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343] uppercase">
                  1ª Abordagem
                </span>
                <h4 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF] mt-1">
                  Página por Página
                </h4>
                <p className="text-xs sm:text-sm font-serif-title text-[#57534E] dark:text-[#A8A29E] mt-2 leading-relaxed">
                  Abrir na página 1 e ler sequencialmente a próxima, a próxima e a próxima, até atingir a última página. É infalível, mas se a lista tiver 100 páginas, poderá exigir até <strong>100 tentativas</strong>.
                </p>
              </div>

              {/* Box 2 */}
              <div className="p-5 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-xs">
                <span className="text-xs font-mono-code font-bold text-[#57534E] dark:text-[#A8A29E] uppercase">
                  2ª Abordagem
                </span>
                <h4 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF] mt-1">
                  De Duas em Duas
                </h4>
                <p className="text-xs sm:text-sm font-serif-title text-[#57534E] dark:text-[#A8A29E] mt-2 leading-relaxed">
                  Buscar folheando de 2 em 2 páginas. Percorremos a lista com o dobro da velocidade! Contudo, se ultrapassarmos o nome no alfabeto, precisaremos retroceder uma página para não perder o contato.
                </p>
              </div>

              {/* Box 3 */}
              <div className="p-5 rounded-lg bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B] dark:border-[#E05343] shadow-xs">
                <span className="text-xs font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343] uppercase">
                  3ª Abordagem &bull; Ideal
                </span>
                <h4 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF] mt-1">
                  Dividir ao Meio
                </h4>
                <p className="text-xs sm:text-sm font-serif-title text-[#1C1917] dark:text-[#EDE8DF] mt-2 leading-relaxed">
                  Ir direto ao centro da lista e perguntar: <em>&ldquo;O nome procurado está à esquerda ou à direita?&rdquo;</em> Então, rasga-se metade do problema fora e repete-se o processo sucessivamente.
                </p>
              </div>
            </div>

            <p>
              Cada uma dessas três abordagens é legitimamente um <strong>algoritmo</strong>. Todas alcançam o mesmo objetivo final (localizar o nome), mas a eficiência com que o fazem difere de forma espetacular.
            </p>
          </div>
        </article>

        {/* ========================================================================= */}
        {/* LABORATÓRIO: SIMULADOR INTERATIVO */}
        {/* ========================================================================= */}
        <section id="simulator" className="pt-10">
          <PhoneBookSimulator />
        </section>

        {/* ========================================================================= */}
        {/* CAPÍTULO II: A NOTAÇÃO BIG-O E A ESCALA DO TEMPO */}
        {/* ========================================================================= */}
        <article id="big-o" className="pt-16 pb-12 border-b border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <span>Capítulo II</span>
          </div>

          <h2 className="font-serif-title font-bold text-2xl sm:text-4xl text-[#1C1917] dark:text-[#EDE8DF] mb-6">
            A Notação Big-O e a Escala do Tempo
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#1C1917] dark:text-[#EDE8DF] font-serif-title">
            <p>
              Para comparar o desempenho de algoritmos de maneira científica e independente da velocidade específica de um processador, os cientistas da computação utilizam o que chamamos de <strong>notação Big-O</strong>.
            </p>

            <p>
              A notação Big-O descreve a taxa de crescimento do <strong>tempo para resolver</strong> (<em>time to solve</em>) em função do <strong>tamanho do problema</strong> (<em>size of problem</em>, simbolizado pela letra <span className="font-mono-code text-[#C93B2B] font-bold">n</span>):
            </p>

            <div className="space-y-4 my-6">
              {/* Item O(n) */}
              <div className="p-4 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border-l-4 border-[#C93B2B] border-t border-r border-b border-[#E2DBD0] dark:border-[#33302B]">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code font-bold text-sm text-[#C93B2B] dark:text-[#E05343]">
                    1. Notação O(n) — Linear
                  </span>
                  <span className="text-xs font-mono-code bg-[#C93B2B]/10 text-[#C93B2B] px-2 py-0.5 rounded font-bold">
                    Destaque em Vermelho
                  </span>
                </div>
                <p className="font-serif-title text-sm sm:text-base text-[#57534E] dark:text-[#A8A29E] mt-2 leading-relaxed">
                  O primeiro algoritmo, destacado em vermelho, tem um Big-O de <span className="font-mono-code font-bold text-[#C93B2B]">n</span> porque se existirem 100 nomes na lista telefônica, poderá levar até <strong>100 tentativas</strong> para encontrar o nome correto.
                </p>
              </div>

              {/* Item O(n/2) */}
              <div className="p-4 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border-l-4 border-[#78716C] border-t border-r border-b border-[#E2DBD0] dark:border-[#33302B]">
                <span className="font-mono-code font-bold text-sm text-[#1C1917] dark:text-[#EDE8DF]">
                  2. Notação O(n/2) — Salto com Fator Constante
                </span>
                <p className="font-serif-title text-sm sm:text-base text-[#57534E] dark:text-[#A8A29E] mt-2 leading-relaxed">
                  O segundo algoritmo, no qual duas páginas foram pesquisadas por vez, possui um Big-O de <span className="font-mono-code font-bold text-[#1C1917] dark:text-[#EDE8DF]">n/2</span> porque pesquisamos duas vezes mais rápido através das páginas. Embora seja o dobro da velocidade, sua curva de crescimento ainda é linear.
                </p>
              </div>

              {/* Item O(log2 n) */}
              <div className="p-4 rounded-lg bg-[#FDF2F0] dark:bg-[#2A1715] border-l-4 border-[#1C1917] dark:border-[#EDE8DF] border-t border-r border-b border-[#C93B2B]/40 dark:border-[#E05343]/40">
                <span className="font-mono-code font-bold text-sm text-[#C93B2B] dark:text-[#E05343]">
                  3. Notação O(log₂ n) — Logarítmico
                </span>
                <p className="font-serif-title text-sm sm:text-base text-[#1C1917] dark:text-[#EDE8DF] mt-2 leading-relaxed">
                  O algoritmo final possui um Big-O de <span className="font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343]">log₂ n</span>, pois <strong>dobrar o tamanho do problema resultaria em apenas mais um passo</strong> para encontrar a solução.
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Graph Component */}
          <BigOGraphVisualizer />
        </article>

        {/* ========================================================================= */}
        {/* CAPÍTULO III: COMO DESCOBRIR A NOTAÇÃO BIG-O */}
        {/* ========================================================================= */}
        <article id="big-o-discovery" className="pt-16 pb-12 border-b border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <span>Capítulo III</span>
          </div>

          <h2 className="font-serif-title font-bold text-2xl sm:text-4xl text-[#1C1917] dark:text-[#EDE8DF] mb-6">
            Como Descobrir a Notação Big-O
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#1C1917] dark:text-[#EDE8DF] font-serif-title">
            <p className="drop-cap">
              Muitos estudantes e desenvolvedores sentem receio diante da notação assintótica por imaginarem que ela exige cálculos matemáticos impenetráveis. Na prática, descobrir o Big-O de qualquer código assemelha-se muito mais a uma <strong>leitura anatômica do programa</strong>: você analisa o peso computacional de cada instrução individual e observa como os laços de repetição multiplicam as operações.
            </p>

            <div className="p-5 rounded bg-[#F3EFE6] dark:bg-[#1C1B19] border-l-4 border-[#C93B2B] dark:border-[#E05343] text-[#1C1917] dark:text-[#EDE8DF]">
              <p className="font-serif-title text-base sm:text-lg font-medium italic leading-snug">
                &ldquo;Não tente memorizar algoritmos. Aprenda a <strong>anotar cada linha de código</strong> com sua ordem de grandeza: atribuições valem <code className="font-mono-code font-bold text-sm px-1.5 py-0.5 rounded bg-white dark:bg-[#22201D] text-[#C93B2B] dark:text-[#E05343] border border-[#E2DBD0] dark:border-[#33302B]">O(1)</code>, laços simples valem <code className="font-mono-code font-bold text-sm px-1.5 py-0.5 rounded bg-white dark:bg-[#22201D] text-[#C93B2B] dark:text-[#E05343] border border-[#E2DBD0] dark:border-[#33302B]">O(n)</code> e laços aninhados multiplicam para <code className="font-mono-code font-bold text-sm px-1.5 py-0.5 rounded bg-white dark:bg-[#22201D] text-[#C93B2B] dark:text-[#E05343] border border-[#E2DBD0] dark:border-[#33302B]">O(n²)</code>.&rdquo;
              </p>
            </div>

            <p>
              Explore o estúdio interativo abaixo. Clique em cada linha de código para entender sua contribuição exata para a função de tempo <span className="font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343] bg-[#F3EFE6] dark:bg-[#2A2420] px-1.5 py-0.5 rounded">T(n)</span>, varie o tamanho da entrada <span className="font-serif italic font-bold text-[#C93B2B] dark:text-[#E05343]">n</span> com os controles dinâmicos e veja como as regras de simplificação matemática revelam a notação Big-O final.
            </p>
          </div>

          {/* Interactive Big-O Discovery Studio */}
          <BigODiscoveryStudio />
        </article>

        {/* ========================================================================= */}
        {/* CAPÍTULO IV: A REALIDADE DO HARDWARE (ESTRESSE DE CPU & MEMÓRIA) */}
        {/* ========================================================================= */}
        <article id="hardware-stress" className="pt-16 pb-12 border-b border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <span>Capítulo IV</span>
          </div>

          <h2 className="font-serif-title font-bold text-2xl sm:text-4xl text-[#1C1917] dark:text-[#EDE8DF] mb-6">
            A Realidade do Silício: Estresse de CPU & Memória
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#1C1917] dark:text-[#EDE8DF] font-serif-title">
            <p className="drop-cap">
              Nas páginas de um tratado teórico, a notação Big-O costuma ser apresentada como curvas matemáticas desenhadas em um plano cartesiano. No entanto, quando um algoritmo é executado em um computador real, essas curvas se traduzem imediatamente em <strong>fenômenos físicos e de infraestrutura</strong>: transistores comutando bilhões de vezes por segundo, dissipação de calor, ciclos de clock e blocos de memória RAM sendo alocados.
            </p>

            <div className="p-5 rounded bg-[#F3EFE6] dark:bg-[#1C1B19] border-l-4 border-[#C93B2B] dark:border-[#E05343] text-[#1C1917] dark:text-[#EDE8DF]">
              <p className="font-serif-title text-base sm:text-lg font-medium italic leading-snug">
                &ldquo;A <strong>Complexidade de Tempo</strong> determina quantos ciclos de clock a CPU gastará (e se o núcleo entrará em <em>throttling</em> térmico), enquanto a <strong>Complexidade de Espaço</strong> determina se a memória física aguentará a carga ou se o sistema sofrerá um colapso imediato por <em>Out of Memory (OOM)</em>.&rdquo;
              </p>
            </div>

            <p>
              Explore o laboratório interativo abaixo. Varie o tamanho da entrada <span className="font-serif italic font-bold text-[#C93B2B] dark:text-[#E05343]">n</span> no simulador de arquitetura ou dispare testes de estresse em tempo real no motor JavaScript da sua própria máquina.
            </p>
          </div>

          {/* Interactive Hardware Stress Lab */}
          <HardwareStressLab />
        </article>

        {/* ========================================================================= */}
        {/* CAPÍTULO V: DA LINGUAGEM HUMANA AO CÓDIGO (O MANCHE DO DESENVOLVEDOR) */}
        {/* ========================================================================= */}
        <article id="code-translation" className="pt-16 pb-12 border-b border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <span>Capítulo V &bull; Convite à Criação</span>
          </div>

          <h2 className="font-serif-title font-bold text-2xl sm:text-4xl text-[#1C1917] dark:text-[#EDE8DF] mb-6">
            Da Linguagem Humana ao Código: Assuma o Manche
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#1C1917] dark:text-[#EDE8DF] font-serif-title">
            <p className="drop-cap">
              Até este instante da sua jornada, você observou os algoritmos com o olhar de um cientista curioso: acompanhou a intuição de folhear uma lista telefônica, desvendou a matemática da notação Big-O e testemunhou como laços de repetição afetam a temperatura da CPU e o esgotamento da memória RAM. Mas na computação, a verdadeira maestria não nasce da contemplação passiva. Ela nasce no momento exato em que você <strong>assume o manche do desenvolvimento</strong>.
            </p>

            <div className="p-6 rounded-lg bg-[#F3EFE6] dark:bg-[#1C1B19] border-l-4 border-[#C93B2B] dark:border-[#E05343] text-[#1C1917] dark:text-[#EDE8DF] shadow-2xs">
              <p className="font-serif-title text-lg sm:text-xl font-medium italic leading-relaxed">
                &ldquo;Programar não é memorizar sintaxes misteriosas nem se submeter a regras burocráticas de linguagens. Programar é o <strong>ato soberano de impor ordem lógica ao caos</strong>: é pegar um problema que exigiria bilhões de segundos e reduzi-lo a trinta e dois passos matematicamente impecáveis.&rdquo;
              </p>
            </div>

            <p>
              Agora você possui um superpoder que a maioria dos iniciantes não tem: você <strong>enxerga o que acontece por baixo dos panos</strong>. Quando você escreve uma instrução, você sabe se ela custa <code className="font-mono-code font-bold text-sm px-1.5 py-0.5 rounded bg-white dark:bg-[#22201D] text-[#C93B2B] dark:text-[#E05343] border border-[#E2DBD0] dark:border-[#33302B]">O(1)</code> ou <code className="font-mono-code font-bold text-sm px-1.5 py-0.5 rounded bg-white dark:bg-[#22201D] text-[#C93B2B] dark:text-[#E05343] border border-[#E2DBD0] dark:border-[#33302B]">O(n²)</code>; quando aloca uma estrutura, você sabe se ela viverá em registradores velozes ou se pressionará o coletor de lixo da memória heap.
            </p>

            <p>
              Veja a seguir como o raciocínio humano se cristaliza em sintaxe de máquina — e utilize o estúdio para copiar as implementações, experimentar no seu próprio terminal e responder aos desafios práticos da engenharia de software:
            </p>
          </div>

          {/* Embedded Code Translation Studio & Developer Call-To-Action */}
          <CodeTranslationStudio />
        </article>

        {/* ========================================================================= */}
        {/* EPÍLOGO: VERIFICAÇÃO DE APRENDIZADO */}
        {/* ========================================================================= */}
        <article id="quiz" className="pt-16 pb-12">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <span>Epílogo</span>
          </div>

          <h2 className="font-serif-title font-bold text-2xl sm:text-4xl text-[#1C1917] dark:text-[#EDE8DF] mb-6">
            Fixando os Fundamentos
          </h2>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#1C1917] dark:text-[#EDE8DF] font-serif-title mb-6">
            <p>
              Agora que você testemunhou a jornada da busca linear até a elegância logarítmica de dividir e conquistar, teste sua compreensão com o desafio didático abaixo.
            </p>
          </div>

          <QuizSection />
        </article>

      </main>

      {/* Mandatory & Styled Footer */}
      <EditorialFooter />
    </div>
  );
}
