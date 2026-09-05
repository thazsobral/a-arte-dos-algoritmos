import React, { useState } from 'react';
import { TrendingUp, Clock, Scale, Info, Sparkles } from 'lucide-react';

export const BigOGraphVisualizer: React.FC = () => {
  const [selectedProblemSize, setSelectedProblemSize] = useState<number>(100);

  // Scale presets
  const presets = [
    { label: '10 nomes', value: 10, desc: 'Uma agenda pessoal pequena' },
    { label: '100 nomes', value: 100, desc: 'Uma lista telefônica de bairro' },
    { label: '1.000 nomes', value: 1000, desc: 'Uma pequena cidade' },
    { label: '1 Milhão', value: 1000000, desc: 'Uma grande metrópole' },
    { label: '4 Bilhões', value: 4000000000, desc: 'População de meio planeta Terra' },
  ];

  // Calculations
  const linearSteps = selectedProblemSize;
  const skipTwoSteps = Math.ceil(selectedProblemSize / 2);
  const binarySteps = Math.ceil(Math.log2(selectedProblemSize));

  // Time conversion assuming 1 operation per millisecond for a human, or 1 GHz computer (1 billion ops/sec)
  const formatHumanTime = (steps: number) => {
    if (steps < 60) return `${steps} segundos`;
    if (steps < 3600) return `${(steps / 60).toFixed(1)} minutos`;
    if (steps < 86400) return `${(steps / 3600).toFixed(1)} horas`;
    if (steps < 31536000) return `${(steps / 86400).toFixed(1)} dias`;
    return `${(steps / 31536000).toFixed(1)} anos`;
  };

  return (
    <div 
      id="big-o-visualizer" 
      className="my-10 p-5 sm:p-8 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-semibold">
        <TrendingUp className="w-4 h-4" />
        Análise de Complexidade &bull; Notação Big-O
      </div>
      <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-[#1C1917] dark:text-[#EDE8DF] mt-1">
        Tamanho do Problema vs. Tempo para Resolver
      </h3>
      <p className="font-serif-title text-sm sm:text-base text-[#57534E] dark:text-[#A8A29E] mt-1 leading-relaxed">
        Observe no gráfico clássico de Big-O como cada função se comporta conforme a lista telefônica cresce.
      </p>

      {/* SVG Graph of Big-O */}
      <div className="my-8 p-4 sm:p-6 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
        <div className="relative w-full max-w-xl mx-auto aspect-[16/10]">
          <svg viewBox="0 0 500 320" className="w-full h-full overflow-visible font-sans-ui">
            {/* Grid Lines */}
            <line x1="60" y1="20" x2="60" y2="270" stroke="currentColor" strokeWidth="2" className="text-[#1C1917] dark:text-[#EDE8DF]" />
            <line x1="60" y1="270" x2="480" y2="270" stroke="currentColor" strokeWidth="2" className="text-[#1C1917] dark:text-[#EDE8DF]" />

            {/* Horizontal Grid guide */}
            <line x1="60" y1="190" x2="480" y2="190" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" className="text-[#E2DBD0] dark:text-[#33302B]" />
            <line x1="60" y1="110" x2="480" y2="110" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" className="text-[#E2DBD0] dark:text-[#33302B]" />
            <line x1="60" y1="30" x2="480" y2="30" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" className="text-[#E2DBD0] dark:text-[#33302B]" />

            {/* Axis Arrows */}
            <polygon points="60,12 55,24 65,24" className="fill-[#1C1917] dark:fill-[#EDE8DF]" />
            <polygon points="488,270 476,265 476,275" className="fill-[#1C1917] dark:fill-[#EDE8DF]" />

            {/* Y-Axis Label (time to solve) */}
            <text x="-150" y="24" transform="rotate(-90)" className="text-[12px] font-medium fill-[#57534E] dark:fill-[#A8A29E] tracking-wider uppercase">
              Tempo para resolver &rarr;
            </text>

            {/* X-Axis Label (size of problem) */}
            <text x="230" y="305" className="text-[12px] font-medium fill-[#57534E] dark:fill-[#A8A29E] tracking-wider uppercase text-center">
              Tamanho do problema (n) &rarr;
            </text>

            {/* Curve 1: O(n) - Highlighted in Red */}
            <path
              d="M 60 270 L 300 30"
              fill="none"
              stroke="#C93B2B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Label O(n) */}
            <g transform="translate(308, 40)">
              <rect x="0" y="-14" width="60" height="22" rx="4" fill="#C93B2B" />
              <text x="30" y="2" textAnchor="middle" fill="#FFFFFF" className="text-[11px] font-mono-code font-bold">
                n (O(n))
              </text>
            </g>

            {/* Curve 2: O(n/2) - Dashed Line */}
            <path
              d="M 60 270 L 460 70"
              fill="none"
              stroke="#78716C"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
            {/* Label O(n/2) */}
            <g transform="translate(410, 58)">
              <rect x="0" y="-14" width="66" height="22" rx="4" className="fill-[#F3EFE6] dark:fill-[#22201D] stroke-[#78716C]" strokeWidth="1" />
              <text x="33" y="2" textAnchor="middle" className="fill-[#1C1917] dark:fill-[#EDE8DF] text-[11px] font-mono-code font-bold">
                n / 2
              </text>
            </g>

            {/* Curve 3: O(log2 n) - Almost flat log curve */}
            <path
              d="M 60 270 Q 120 235, 240 230 T 470 220"
              fill="none"
              stroke="#1C1917"
              className="stroke-[#1C1917] dark:stroke-[#EDE8DF]"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Label O(log2 n) */}
            <g transform="translate(400, 205)">
              <rect x="0" y="-14" width="76" height="22" rx="4" className="fill-[#1C1917] dark:fill-[#EDE8DF]" />
              <text x="38" y="2" textAnchor="middle" className="fill-[#FFFFFF] dark:fill-[#141312] text-[11px] font-mono-code font-bold">
                log₂ n
              </text>
            </g>
          </svg>
        </div>

        {/* Legend Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 pt-4 border-t border-[#E2DBD0] dark:border-[#33302B]">
          <div className="flex items-start gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#C93B2B] shrink-0 mt-1" />
            <div>
              <span className="font-mono-code text-xs font-bold text-[#C93B2B] dark:text-[#E05343]">O(n) — Linear</span>
              <p className="text-xs font-serif-title text-[#78716C] mt-0.5">
                Destacado em vermelho: se há 100 nomes, pode levar até 100 tentativas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#78716C] border border-dashed border-[#57534E] shrink-0 mt-1" />
            <div>
              <span className="font-mono-code text-xs font-bold text-[#57534E] dark:text-[#A8A29E]">O(n/2) — Salto Duplo</span>
              <p className="text-xs font-serif-title text-[#78716C] mt-0.5">
                Duas vezes mais rápido que O(n), mas sua curva de crescimento ainda é estritamente linear.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#1C1917] dark:bg-[#EDE8DF] shrink-0 mt-1" />
            <div>
              <span className="font-mono-code text-xs font-bold text-[#1C1917] dark:text-[#EDE8DF]">O(log₂ n) — Logarítmico</span>
              <p className="text-xs font-serif-title text-[#78716C] mt-0.5">
                Dobrar o tamanho do problema acrescenta apenas 1 único passo a mais na busca!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scale Comparator */}
      <div className="mt-8 pt-6 border-t border-[#E2DBD0] dark:border-[#33302B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h4 className="font-serif-title font-bold text-lg text-[#1C1917] dark:text-[#EDE8DF] flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343]" />
            Simulador de Escala do Problema
          </h4>
          <span className="text-xs font-sans-ui text-[#78716C]">
            Escolha um tamanho para comparar o número de passos no pior caso:
          </span>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => setSelectedProblemSize(p.value)}
              className={`px-3 py-1.5 rounded text-xs font-sans-ui transition-all ${
                selectedProblemSize === p.value
                  ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold shadow-xs'
                  : 'bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] text-[#57534E] dark:text-[#A8A29E] hover:border-[#78716C]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card O(n) */}
          <div className="p-4 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#C93B2B]/40 dark:border-[#E05343]/40">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343]">Busca Linear</span>
              <span className="text-xs font-mono-code font-bold text-[#C93B2B]">O(n)</span>
            </div>
            <div className="mt-3 font-mono-code font-bold text-2xl text-[#1C1917] dark:text-[#EDE8DF]">
              {linearSteps.toLocaleString('pt-BR')} <span className="text-xs font-normal text-[#78716C]">passos</span>
            </div>
            <div className="mt-2 text-xs font-sans-ui text-[#78716C] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C93B2B]" />
              <span>Tempo humano: ~{formatHumanTime(linearSteps)}</span>
            </div>
          </div>

          {/* Card O(n/2) */}
          <div className="p-4 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-code font-bold text-[#57534E] dark:text-[#A8A29E]">Busca de 2 em 2</span>
              <span className="text-xs font-mono-code font-bold text-[#78716C]">O(n/2)</span>
            </div>
            <div className="mt-3 font-mono-code font-bold text-2xl text-[#1C1917] dark:text-[#EDE8DF]">
              {skipTwoSteps.toLocaleString('pt-BR')} <span className="text-xs font-normal text-[#78716C]">passos</span>
            </div>
            <div className="mt-2 text-xs font-sans-ui text-[#78716C] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#78716C]" />
              <span>Tempo humano: ~{formatHumanTime(skipTwoSteps)}</span>
            </div>
          </div>

          {/* Card O(log2 n) */}
          <div className="p-4 rounded bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B] dark:border-[#E05343] ring-1 ring-[#C93B2B]/30">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Busca Binária
              </span>
              <span className="text-xs font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343]">O(log₂ n)</span>
            </div>
            <div className="mt-3 font-mono-code font-bold text-2xl text-[#C93B2B] dark:text-[#E05343]">
              Apenas {binarySteps} <span className="text-xs font-normal text-[#C93B2B]/80 dark:text-[#E05343]/80">passos!</span>
            </div>
            <div className="mt-2 text-xs font-sans-ui text-[#C93B2B] dark:text-[#E05343] font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Tempo humano: ~{binarySteps} segundos</span>
            </div>
          </div>
        </div>

        {/* Insight Box */}
        <div className="mt-4 p-4 rounded bg-[#F3EFE6] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343] shrink-0 mt-0.5" />
          <p className="font-serif-title text-sm text-[#1C1917] dark:text-[#EDE8DF] leading-relaxed">
            <strong>O Poder da Divisão:</strong> Para procurar uma pessoa entre <strong>4 bilhões de habitantes</strong> (metade do planeta), a busca linear levaria até <strong>4 bilhões de tentativas</strong> (mais de 120 anos para um humano). Com a busca binária de <em>dividir e conquistar</em>, são necessários no máximo <strong>32 passos</strong>!
          </p>
        </div>
      </div>
    </div>
  );
};
