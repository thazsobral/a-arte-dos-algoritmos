import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AlgorithmType, PhoneBookEntry, SimulationStep } from '../types';
import { PHONE_BOOK_DATA } from '../data/editorialContent';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2, Search, ArrowRight, Zap, Split, BookOpen, Layers } from 'lucide-react';

export const PhoneBookSimulator: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<number>(19); // Default "Sophia Silveira"
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('binary');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms
  
  const targetEntry = useMemo(() => {
    return PHONE_BOOK_DATA.find((item) => item.id === selectedTargetId) || PHONE_BOOK_DATA[0];
  }, [selectedTargetId]);

  // Generate the steps according to algorithm
  const steps: SimulationStep[] = useMemo(() => {
    const list = PHONE_BOOK_DATA;
    const target = targetEntry;
    const generatedSteps: SimulationStep[] = [];

    if (selectedAlgorithm === 'linear') {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const isMatch = item.id === target.id;
        generatedSteps.push({
          stepNumber: i + 1,
          currentPage: item.page,
          checkedName: item.name,
          action: `Folheando para a página ${item.page}`,
          explanation: isMatch
            ? `Encontramos "${item.name}" exatamente na página ${item.page}! O algoritmo encerra sua busca.`
            : `Examinando página ${item.page}: encontramos "${item.name}". Não é "${target.name}". Avançando para a próxima página.`,
          found: isMatch,
          low: 1,
          high: list.length
        });
        if (isMatch) break;
      }
    } else if (selectedAlgorithm === 'two_pages') {
      let stepNum = 1;
      let i = 1; // 2nd page (index 1)
      let found = false;

      while (i < list.length && !found) {
        const item = list[i];
        if (item.id === target.id) {
          generatedSteps.push({
            stepNumber: stepNum++,
            currentPage: item.page,
            checkedName: item.name,
            action: `Verificando página ${item.page} (salto duplo)`,
            explanation: `Encontramos "${item.name}" na página ${item.page}!`,
            found: true,
            low: 1,
            high: list.length
          });
          found = true;
          break;
        }

        // Compare alphabetical order
        if (item.name.localeCompare(target.name) > 0) {
          // Overshot! Must check previous page (i-1)
          generatedSteps.push({
            stepNumber: stepNum++,
            currentPage: item.page,
            checkedName: item.name,
            action: `Ultrapassou na página ${item.page}`,
            explanation: `O nome "${item.name}" vem DEPOIS de "${target.name}". Ultrapassamos! Olhando a página anterior (${list[i - 1].page}).`,
            found: false,
            low: 1,
            high: list.length
          });

          const prevItem = list[i - 1];
          const prevMatch = prevItem.id === target.id;
          generatedSteps.push({
            stepNumber: stepNum++,
            currentPage: prevItem.page,
            checkedName: prevItem.name,
            action: `Retrocedendo para a página ${prevItem.page}`,
            explanation: prevMatch
              ? `Encontramos "${prevItem.name}" na página anterior!`
              : `"${target.name}" não está aqui.`,
            found: prevMatch,
            low: 1,
            high: list.length
          });
          found = true;
          break;
        } else {
          generatedSteps.push({
            stepNumber: stepNum++,
            currentPage: item.page,
            checkedName: item.name,
            action: `Pulando 2 páginas até a página ${item.page}`,
            explanation: `Página ${item.page} contém "${item.name}". Como "${target.name}" vem depois no alfabeto, pulamos mais 2 páginas.`,
            found: false,
            low: 1,
            high: list.length
          });
          i += 2;
        }
      }

      // If reached end without finding (e.g. last odd page)
      if (!found && i >= list.length && list.length % 2 !== 0) {
        const lastItem = list[list.length - 1];
        const lastMatch = lastItem.id === target.id;
        generatedSteps.push({
          stepNumber: stepNum++,
          currentPage: lastItem.page,
          checkedName: lastItem.name,
          action: `Verificando última página ${lastItem.page}`,
          explanation: lastMatch ? `Encontrado na última página!` : `Não encontrado.`,
          found: lastMatch,
          low: 1,
          high: list.length
        });
      }
    } else if (selectedAlgorithm === 'binary') {
      let low = 0;
      let high = list.length - 1;
      let stepNum = 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const item = list[mid];
        const cmp = item.name.localeCompare(target.name);

        if (cmp === 0) {
          generatedSteps.push({
            stepNumber: stepNum++,
            currentPage: item.page,
            checkedName: item.name,
            action: `Abrindo exatamente no meio: Página ${item.page}`,
            explanation: `Acerto direto! Abrimos na página ${item.page} e encontramos "${item.name}". Busca concluída com maestria!`,
            found: true,
            low: low + 1,
            high: high + 1,
            direction: 'match'
          });
          break;
        } else if (cmp < 0) {
          // Target is in the right half
          generatedSteps.push({
            stepNumber: stepNum++,
            currentPage: item.page,
            checkedName: item.name,
            action: `Dividindo no meio: Página ${item.page}`,
            explanation: `Na página ${item.page} está "${item.name}". Como "${target.name}" vem DEPOIS no alfabeto, descartamos as páginas ${low + 1} até ${item.page} (metade esquerda) e focamos na direita.`,
            found: false,
            low: low + 1,
            high: high + 1,
            direction: 'right'
          });
          low = mid + 1;
        } else {
          // Target is in the left half
          generatedSteps.push({
            stepNumber: stepNum++,
            currentPage: item.page,
            checkedName: item.name,
            action: `Dividindo no meio: Página ${item.page}`,
            explanation: `Na página ${item.page} está "${item.name}". Como "${target.name}" vem ANTES no alfabeto, descartamos as páginas ${item.page} até ${high + 1} (metade direita) e focamos na esquerda.`,
            found: false,
            low: low + 1,
            high: high + 1,
            direction: 'left'
          });
          high = mid - 1;
        }
      }
    }

    return generatedSteps;
  }, [selectedTargetId, selectedAlgorithm, targetEntry]);

  // Reset steps on change
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [selectedTargetId, selectedAlgorithm]);

  // Auto playback
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div 
      id="phonebook-simulator" 
      className="my-10 p-5 sm:p-8 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-sm transition-all"
    >
      {/* Header of the laboratory */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DBD0] dark:border-[#33302B]">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-semibold">
            <Layers className="w-4 h-4" />
            Laboratório Interativo &bull; Simulação Didática
          </div>
          <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-[#1C1917] dark:text-[#EDE8DF] mt-1">
            A Busca na Lista Telefônica
          </h3>
          <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] mt-0.5">
            Compare o comportamento visual e a contagem de passos das 3 abordagens.
          </p>
        </div>

        {/* Target Name Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="select-target-name" className="text-xs font-sans-ui font-medium text-[#57534E] dark:text-[#A8A29E] whitespace-nowrap">
            Procurar por:
          </label>
          <select
            id="select-target-name"
            value={selectedTargetId}
            onChange={(e) => setSelectedTargetId(Number(e.target.value))}
            className="text-xs font-sans-ui bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] text-[#1C1917] dark:text-[#EDE8DF] rounded px-3 py-2 focus:outline-none focus:border-[#C93B2B]"
          >
            {PHONE_BOOK_DATA.map((entry) => (
              <option key={entry.id} value={entry.id}>
                Pág. {entry.page}: {entry.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Algorithm Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {/* Option 1: Linear Search */}
        <button
          id="btn-algo-linear"
          onClick={() => setSelectedAlgorithm('linear')}
          className={`p-4 rounded border text-left transition-all relative ${
            selectedAlgorithm === 'linear'
              ? 'border-[#C93B2B] dark:border-[#E05343] bg-[#FDF2F0] dark:bg-[#2A1715] ring-1 ring-[#C93B2B]'
              : 'border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C] bg-[#FBF9F5] dark:bg-[#141312]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
              Abordagem 1
            </span>
            <span className="text-xs font-mono-code px-1.5 py-0.5 rounded bg-[#C93B2B]/10 text-[#C93B2B] dark:text-[#E05343] font-bold">
              O(n)
            </span>
          </div>
          <div className="font-serif-title font-semibold text-sm text-[#1C1917] dark:text-[#EDE8DF] mt-1">
            Página por Página
          </div>
          <div className="text-xs font-sans-ui text-[#78716C] mt-1">
            Lê sequencialmente da 1ª até a última. Até 32 passos.
          </div>
        </button>

        {/* Option 2: Step-by-2 */}
        <button
          id="btn-algo-twopages"
          onClick={() => setSelectedAlgorithm('two_pages')}
          className={`p-4 rounded border text-left transition-all relative ${
            selectedAlgorithm === 'two_pages'
              ? 'border-[#C93B2B] dark:border-[#E05343] bg-[#FDF2F0] dark:bg-[#2A1715] ring-1 ring-[#C93B2B]'
              : 'border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C] bg-[#FBF9F5] dark:bg-[#141312]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
              Abordagem 2
            </span>
            <span className="text-xs font-mono-code px-1.5 py-0.5 rounded bg-[#78716C]/10 text-[#57534E] dark:text-[#A8A29E] font-bold">
              O(n/2)
            </span>
          </div>
          <div className="font-serif-title font-semibold text-sm text-[#1C1917] dark:text-[#EDE8DF] mt-1">
            De Duas em Duas
          </div>
          <div className="text-xs font-sans-ui text-[#78716C] mt-1">
            Avança o dobro da velocidade, mas pode ultrapassar.
          </div>
        </button>

        {/* Option 3: Binary Search */}
        <button
          id="btn-algo-binary"
          onClick={() => setSelectedAlgorithm('binary')}
          className={`p-4 rounded border text-left transition-all relative ${
            selectedAlgorithm === 'binary'
              ? 'border-[#C93B2B] dark:border-[#E05343] bg-[#FDF2F0] dark:bg-[#2A1715] ring-1 ring-[#C93B2B]'
              : 'border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C] bg-[#FBF9F5] dark:bg-[#141312]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
              Abordagem 3
            </span>
            <span className="text-xs font-mono-code px-1.5 py-0.5 rounded bg-[#C93B2B] text-white font-bold">
              O(log₂ n)
            </span>
          </div>
          <div className="font-serif-title font-semibold text-sm text-[#1C1917] dark:text-[#EDE8DF] mt-1">
            Dividir ao Meio
          </div>
          <div className="text-xs font-sans-ui text-[#78716C] mt-1">
            Abre no meio e descarta 50% a cada pergunta. Máximo de 5 passos!
          </div>
        </button>
      </div>

      {/* Pages Grid Visualizer */}
      <div className="my-6">
        <div className="flex items-center justify-between text-xs font-sans-ui text-[#78716C] mb-2.5">
          <span>Páginas da Lista Telefônica (1 a {PHONE_BOOK_DATA.length}):</span>
          <span className="font-mono-code font-medium">
            Alvo: <strong className="text-[#C93B2B] dark:text-[#E05343]">{targetEntry.name}</strong> (Pág. {targetEntry.page})
          </span>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 p-3 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
          {PHONE_BOOK_DATA.map((entry) => {
            const isTarget = entry.id === targetEntry.id;
            const isCurrent = entry.page === currentStep?.currentPage;
            
            // For binary search: is this page in the active range or discarded?
            let isDiscarded = false;
            if (selectedAlgorithm === 'binary' && currentStep) {
              isDiscarded = entry.page < currentStep.low || entry.page > currentStep.high;
            }

            return (
              <div
                key={entry.id}
                id={`page-tile-${entry.page}`}
                className={`h-12 rounded flex flex-col items-center justify-center text-center transition-all duration-300 relative border ${
                  isCurrent
                    ? 'bg-[#C93B2B] text-white border-[#C93B2B] scale-105 shadow-md z-10'
                    : isDiscarded
                    ? 'bg-transparent text-[#78716C]/40 border-dashed border-[#E2DBD0]/60 dark:border-[#33302B]/60 opacity-30 line-through'
                    : isTarget && currentStep?.found
                    ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-[#FFFFFF] dark:text-[#141312] border-[#1C1917] font-bold'
                    : 'bg-[#FFFFFF] dark:bg-[#22201D] text-[#1C1917] dark:text-[#EDE8DF] border-[#E2DBD0] dark:border-[#33302B]'
                }`}
                title={`Página ${entry.page}: ${entry.name}`}
              >
                <span className="text-[10px] font-mono-code font-bold">
                  {entry.page}
                </span>
                <span className="text-[8px] font-sans-ui truncate w-full px-0.5 opacity-80">
                  {entry.name.split(' ')[0]}
                </span>
                {isTarget && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C93B2B] border border-white dark:border-black" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Status & Natural Language Narrative */}
      <div className="p-4 sm:p-5 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2DBD0] dark:border-[#33302B] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code uppercase font-semibold text-[#57534E] dark:text-[#A8A29E]">
              Passo {currentStepIndex + 1} de {steps.length}
            </span>
            {currentStep?.found ? (
              <span className="inline-flex items-center gap-1 text-xs font-sans-ui font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> Nome Encontrado!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-sans-ui text-[#78716C] bg-[#78716C]/10 px-2 py-0.5 rounded">
                <Search className="w-3 h-3" /> Investigando...
              </span>
            )}
          </div>

          <div className="text-xs font-mono-code text-[#78716C]">
            Página examinada: <strong className="text-[#1C1917] dark:text-[#EDE8DF]">{currentStep?.currentPage} ({currentStep?.checkedName})</strong>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="flex items-start gap-3 pt-1">
          <div className="p-2 rounded bg-[#FFFFFF] dark:bg-[#22201D] border border-[#E2DBD0] dark:border-[#33302B] text-[#C93B2B] dark:text-[#E05343] shrink-0 mt-0.5">
            {selectedAlgorithm === 'binary' ? <Split className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
          </div>
          <div>
            <div className="font-serif-title font-semibold text-base text-[#1C1917] dark:text-[#EDE8DF]">
              {currentStep?.action}
            </div>
            <p className="font-serif-title text-sm sm:text-base text-[#57534E] dark:text-[#A8A29E] mt-1 leading-relaxed">
              {currentStep?.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Playback Controls & Metrics Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2DBD0] dark:border-[#33302B]">
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-sim-reset"
            onClick={handleReset}
            className="p-2 rounded border border-[#E2DBD0] dark:border-[#33302B] hover:bg-[#F3EFE6] dark:hover:bg-[#1C1B19] text-[#57534E] dark:text-[#A8A29E] transition-colors"
            title="Reiniciar Simulação"
            aria-label="Reiniciar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            id="btn-sim-play"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-sans-ui text-xs font-semibold hover:bg-[#C93B2B] dark:hover:bg-[#E05343] transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> {currentStepIndex === steps.length - 1 ? 'Repetir' : 'Executar'}
              </>
            )}
          </button>

          <button
            id="btn-sim-step"
            onClick={handleNext}
            disabled={currentStepIndex >= steps.length - 1 || isPlaying}
            className="flex items-center gap-1 px-3 py-2 rounded border border-[#E2DBD0] dark:border-[#33302B] text-xs font-sans-ui font-medium hover:border-[#78716C] disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <span>Avançar Passo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Slider & Comparative Stats */}
        <div className="flex items-center gap-4 text-xs font-sans-ui text-[#78716C]">
          <div className="flex items-center gap-2">
            <span>Velocidade:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] text-xs rounded px-2 py-1"
            >
              <option value={1500}>0.5x (Lento)</option>
              <option value={1000}>1x (Normal)</option>
              <option value={400}>2x (Rápido)</option>
            </select>
          </div>

          <div className="h-4 w-px bg-[#E2DBD0] dark:bg-[#33302B]" />

          <div className="font-mono-code font-semibold text-[#1C1917] dark:text-[#EDE8DF]">
            Total de Passos: <span className="text-[#C93B2B] dark:text-[#E05343]">{steps.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
