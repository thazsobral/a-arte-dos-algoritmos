import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Flame, 
  Zap, 
  Play, 
  Square, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Activity, 
  Sliders, 
  Layers, 
  Database, 
  Info,
  Clock,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface BenchmarkResult {
  id: string;
  name: string;
  bigOTime: string;
  bigOSpace: string;
  n: number;
  actualDurationMs: number;
  opsCount: number;
  bytesAllocated: number;
  timestamp: string;
}

interface AlgorithmProfile {
  id: string;
  name: string;
  category: string;
  bigOTime: string;
  bigOSpace: string;
  description: string;
  cpuExplanation: string;
  memoryExplanation: string;
  calculateCpuOps: (n: number) => number;
  calculateMemoryBytes: (n: number) => number;
  memoryType: 'stack' | 'heap' | 'registers';
  riskLevel: 'baixa' | 'moderada' | 'critica' | 'extrema';
}

const ALGORITHM_PROFILES: AlgorithmProfile[] = [
  {
    id: 'binary-search',
    name: 'Busca Binária (Iterativa)',
    category: 'Divisão e Conquista',
    bigOTime: 'O(log n)',
    bigOSpace: 'O(1)',
    description: 'Descarta metade do espaço a cada passo sem criar nenhuma estrutura de dados adicional.',
    cpuExplanation: 'A CPU realiza apenas poucas comparações numéricas simples (ex: para 1 milhão de itens, requer apenas ~20 passos).',
    memoryExplanation: 'Consome apenas 3 variáveis de ponteiros inteiros na pilha de execução (low, high, mid), ocupando constantes 24 bytes.',
    calculateCpuOps: (n) => Math.max(1, Math.round(Math.log2(n || 1) * 3)),
    calculateMemoryBytes: () => 24, // 3 ponteiros de 8 bytes
    memoryType: 'registers',
    riskLevel: 'baixa'
  },
  {
    id: 'linear-scan',
    name: 'Varredura Linear In-Place',
    category: 'Sequencial',
    bigOTime: 'O(n)',
    bigOSpace: 'O(1)',
    description: 'Percorre o array elemento a elemento utilizando um único índice contador sem duplicar memória.',
    cpuExplanation: 'A CPU executa n iterações simples. O tempo cresce em linha reta, mantendo o consumo por segundo estável.',
    memoryExplanation: 'Alocação constante: apenas um acumulador ou índice i na pilha. Nenhuma memória heap extra é solicitada.',
    calculateCpuOps: (n) => n * 2,
    calculateMemoryBytes: () => 32, // poucas variáveis de controle
    memoryType: 'registers',
    riskLevel: 'baixa'
  },
  {
    id: 'linear-copy',
    name: 'Filtragem com Duplicação de Array',
    category: 'Transformação Linear',
    bigOTime: 'O(n)',
    bigOSpace: 'O(n)',
    description: 'Cria uma nova cópia ou lista filtrada de elementos na memória heap para cada item processado.',
    cpuExplanation: 'A CPU não apenas percorre os n elementos, mas também gerencia as alocações dinâmicas de memória e chamadas ao coletor de lixo.',
    memoryExplanation: 'A memória heap cresce linearmente: cada elemento adiciona 4 a 8 bytes. Para 10 milhões de itens, são dezenas de megabytes alocados.',
    calculateCpuOps: (n) => n * 4,
    calculateMemoryBytes: (n) => n * 8 + 64, // 8 bytes por número + overhead
    memoryType: 'heap',
    riskLevel: 'moderada'
  },
  {
    id: 'nested-loops',
    name: 'Comparação Cruzada In-Place',
    category: 'Quadrático Puro',
    bigOTime: 'O(n²)',
    bigOSpace: 'O(1)',
    description: 'Dois laços aninhados comparando todos os elementos entre si, sem alocar vetores auxiliares.',
    cpuExplanation: 'A CPU entra em sobrecarga extrema rapidamente: para n = 100.000, são 10 bilhões de operações! O núcleo atinge 100% de uso.',
    memoryExplanation: 'Apesar de a CPU sofrer superaquecimento, a memória RAM permanece fria e estável em poucos bytes (apenas as variáveis i e j).',
    calculateCpuOps: (n) => n * n,
    calculateMemoryBytes: () => 48,
    memoryType: 'registers',
    riskLevel: 'critica'
  },
  {
    id: 'adjacency-matrix',
    name: 'Matriz de Pares n × n (Tabela)',
    category: 'Quadrático em Tempo e Espaço',
    bigOTime: 'O(n²)',
    bigOSpace: 'O(n²)',
    description: 'Gera uma grade completa bidimensional na memória heap conectando cada item a todos os outros.',
    cpuExplanation: 'A CPU satura 100% preenchendo as n² células da matriz.',
    memoryExplanation: 'Alarme Máximo de Memória: o consumo de RAM cresce ao quadrado! Para n = 50.000 números inteiros, seriam necessários quase 10 GB de RAM, causando Crash por Out of Memory (OOM).',
    calculateCpuOps: (n) => n * n * 2,
    calculateMemoryBytes: (n) => n * n * 4 + (n * 16), // 4 bytes por float32/int + ponteiros
    memoryType: 'heap',
    riskLevel: 'extrema'
  },
  {
    id: 'recursive-fib',
    name: 'Recursão em Árvore (Exponencial)',
    category: 'Divisão sem Memoização',
    bigOTime: 'O(2ⁿ)',
    bigOSpace: 'O(n) na Stack',
    description: 'Cada chamada gera duas novas chamadas recursivas, empilhando frames na Call Stack da linguagem.',
    cpuExplanation: 'Colapso exponencial: com n = 40, são mais de 1 trilhão de operações. O processamento se torna inviável humanamente.',
    memoryExplanation: 'A profundidade da pilha de chamadas (Call Stack) cresce com n. Se o limite da pilha estourar (geralmente ~10.000 frames), o sistema dispara Stack Overflow.',
    calculateCpuOps: (n) => Math.min(1e15, Math.pow(2, Math.min(n, 45))),
    calculateMemoryBytes: (n) => Math.min(n * 512, 1024 * 1024 * 50), // ~512 bytes por stack frame
    memoryType: 'stack',
    riskLevel: 'extrema'
  }
];

export const HardwareStressLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'benchmark' | 'tradeoff'>('simulation');
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>('nested-loops');
  const [simulatedN, setSimulatedN] = useState<number>(1000);

  // Real benchmark execution state
  const [benchmarking, setBenchmarking] = useState<boolean>(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState<number>(0);
  const [benchmarkN, setBenchmarkN] = useState<number>(5000);
  const [benchmarkHistory, setBenchmarkHistory] = useState<BenchmarkResult[]>([]);
  const [currentBenchAlgo, setCurrentBenchAlgo] = useState<string>('nested-loops');
  const abortControllerRef = useRef<boolean>(false);

  const activeAlgo = ALGORITHM_PROFILES.find((a) => a.id === selectedAlgoId) || ALGORITHM_PROFILES[0];

  // Helper formatting calculations
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    if (bytes < 1024 * 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    return `${(bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB (Esgotamento Fatal)`;
  };

  const formatOps = (ops: number): string => {
    if (ops < 1000) return `${ops} ops`;
    if (ops < 1000000) return `${(ops / 1000).toFixed(1)} mil ops`;
    if (ops < 1000000000) return `${(ops / 1000000).toFixed(1)} milhões ops`;
    if (ops < 1000000000000) return `${(ops / 1000000000).toFixed(1)} bilhões ops`;
    return `${(ops / 1000000000000).toFixed(1)} trilhões ops`;
  };

  // Theoretical CPU execution time assuming a modern ~3.0 GHz CPU core (~3 billion simple ops/sec)
  const calculateEstimatedTime = (ops: number): string => {
    const seconds = ops / 3_000_000_000;
    if (seconds < 0.000001) return '< 1 microssegundo (Instantâneo)';
    if (seconds < 0.001) return `${(seconds * 1_000_000).toFixed(1)} µs`;
    if (seconds < 1) return `${(seconds * 1000).toFixed(1)} ms`;
    if (seconds < 60) return `${seconds.toFixed(2)} segundos`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutos (Congelamento)`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} horas de CPU a 100%`;
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} dias de processamento`;
    return `${(seconds / 31536000).toFixed(0)} anos de computação contínua`;
  };

  const calculatedOps = activeAlgo.calculateCpuOps(simulatedN);
  const calculatedBytes = activeAlgo.calculateMemoryBytes(simulatedN);

  // CPU Load score (0 to 100%)
  // Under 100k ops -> light (< 15%)
  // 100k to 5M ops -> medium (15-60%)
  // > 5M ops -> high (60-100%)
  const cpuStressPercent = Math.min(
    100,
    calculatedOps <= 100 ? 2 :
    calculatedOps <= 10000 ? Math.round((calculatedOps / 10000) * 20) :
    calculatedOps <= 5000000 ? Math.round(20 + (calculatedOps / 5000000) * 55) :
    calculatedOps <= 50000000 ? Math.round(75 + (calculatedOps / 50000000) * 25) : 100
  );

  // RAM Stress score (relative to a typical 8GB system)
  const ramStressPercent = Math.min(
    100,
    calculatedBytes <= 1024 ? 1 :
    calculatedBytes <= 1024 * 1024 ? Math.round((calculatedBytes / (1024 * 1024)) * 15) :
    calculatedBytes <= 100 * 1024 * 1024 ? Math.round(15 + (calculatedBytes / (100 * 1024 * 1024)) * 40) :
    calculatedBytes <= 1024 * 1024 * 1024 ? Math.round(55 + (calculatedBytes / (1024 * 1024 * 1024)) * 35) : 100
  );

  // Safe Real Benchmark runner inside the browser without freezing UI
  const runSafeBenchmark = async () => {
    setBenchmarking(true);
    setBenchmarkProgress(5);
    abortControllerRef.current = false;

    const algo = ALGORITHM_PROFILES.find(a => a.id === currentBenchAlgo) || ALGORITHM_PROFILES[0];
    const n = benchmarkN;

    // Small delay for UI update
    await new Promise(r => setTimeout(r, 60));

    const startTime = performance.now();
    let opsDone = 0;
    let allocatedBytes = 0;

    try {
      if (algo.id === 'binary-search') {
        // Run binary search 10,000 times to get measurable milliseconds
        const runs = 20000;
        const target = Math.floor(n / 2);
        for (let r = 0; r < runs; r++) {
          let low = 0, high = n - 1;
          while (low <= high) {
            opsDone++;
            const mid = (low + high) >> 1;
            if (mid === target) break;
            if (mid < target) low = mid + 1;
            else high = mid - 1;
          }
        }
        allocatedBytes = 24;
      } else if (algo.id === 'linear-scan') {
        // Linear scan counting
        let acc = 0;
        for (let i = 0; i < n; i++) {
          acc += (i % 2);
          opsDone++;
        }
        allocatedBytes = 32;
      } else if (algo.id === 'linear-copy') {
        // Safe typed array allocation
        const safeSize = Math.min(n, 1000000);
        const buffer = new Uint32Array(safeSize);
        for (let i = 0; i < safeSize; i++) {
          buffer[i] = i * 2;
          opsDone++;
        }
        allocatedBytes = buffer.byteLength;
      } else if (algo.id === 'nested-loops') {
        // Nested loop with chunking so we don't freeze the page
        const safeLimit = Math.min(n, 5000); // capped for safety
        let count = 0;
        for (let i = 0; i < safeLimit; i++) {
          if (abortControllerRef.current) break;
          for (let j = 0; j < safeLimit; j++) {
            count += (i === j ? 1 : 0);
            opsDone++;
          }
          if (i % 500 === 0) {
            setBenchmarkProgress(Math.round((i / safeLimit) * 90));
            await new Promise(r => setTimeout(r, 0));
          }
        }
        allocatedBytes = 48;
      } else if (algo.id === 'adjacency-matrix') {
        // Safe matrix allocation (capped to avoid browser crash)
        const matrixSize = Math.min(n, 1000);
        const totalCells = matrixSize * matrixSize;
        const matrix = new Uint8Array(totalCells);
        for (let i = 0; i < totalCells; i++) {
          matrix[i] = (i % 2);
          opsDone++;
        }
        allocatedBytes = matrix.byteLength;
      } else if (algo.id === 'recursive-fib') {
        // Bounded Fibonacci
        const fibN = Math.min(n, 28); // 28 is ~500k ops, totally safe in JS
        const fib = (k: number): number => {
          opsDone++;
          if (k <= 1) return k;
          return fib(k - 1) + fib(k - 2);
        };
        fib(fibN);
        allocatedBytes = fibN * 128;
      }

      const endTime = performance.now();
      const duration = Math.max(0.01, endTime - startTime);

      const result: BenchmarkResult = {
        id: Math.random().toString(),
        name: algo.name,
        bigOTime: algo.bigOTime,
        bigOSpace: algo.bigOSpace,
        n: algo.id === 'recursive-fib' ? Math.min(n, 28) : algo.id === 'nested-loops' ? Math.min(n, 5000) : n,
        actualDurationMs: Number(duration.toFixed(2)),
        opsCount: opsDone,
        bytesAllocated: allocatedBytes,
        timestamp: new Date().toLocaleTimeString()
      };

      setBenchmarkHistory(prev => [result, ...prev.slice(0, 7)]);
      setBenchmarkProgress(100);
    } catch (err) {
      console.error(err);
    } finally {
      setBenchmarking(false);
    }
  };

  const handleAbortBenchmark = () => {
    abortControllerRef.current = true;
    setBenchmarking(false);
  };

  return (
    <div 
      id="hardware-stress-lab"
      className="my-10 p-5 sm:p-8 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-sm transition-colors duration-200"
    >
      {/* Lab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DBD0] dark:border-[#33302B]">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-semibold">
            <Cpu className="w-4 h-4" />
            Engenharia de Sistemas &bull; A Realidade do Silício
          </div>
          <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-[#1C1917] dark:text-[#EDE8DF] mt-1">
            Laboratório de Estresse: CPU e Memória (RAM)
          </h3>
          <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] mt-0.5 max-w-2xl">
            Descubra como curvas assintóticas se convertem em ciclos de clock, aquecimento térmico e saturação da memória física.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-1 rounded-md bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 rounded text-xs font-sans-ui transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'simulation'
                ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold shadow-xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Simulador de Hardware
          </button>
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`px-3 py-1.5 rounded text-xs font-sans-ui transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'benchmark'
                ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold shadow-xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Teste Real (Benchmark)
          </button>
          <button
            onClick={() => setActiveTab('tradeoff')}
            className={`px-3 py-1.5 rounded text-xs font-sans-ui transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tradeoff'
                ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-semibold shadow-xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Dilema Tempo vs Espaço
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: SIMULADOR ARQUITETURAL DE CPU & MEMÓRIA */}
      {/* ========================================================================= */}
      {activeTab === 'simulation' && (
        <div className="mt-6 space-y-6">
          {/* Algorithm Selector Pills */}
          <div className="space-y-2">
            <span className="text-xs font-sans-ui font-semibold text-[#78716C] uppercase tracking-wider block">
              Selecione o Padrão de Acesso Algorítmico:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {ALGORITHM_PROFILES.map((algo) => {
                const isSelected = selectedAlgoId === algo.id;
                return (
                  <button
                    key={algo.id}
                    onClick={() => setSelectedAlgoId(algo.id)}
                    className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C93B2B] dark:border-[#E05343] bg-[#FDF2F0] dark:bg-[#2A1715] shadow-xs'
                        : 'border-[#E2DBD0] dark:border-[#33302B] bg-[#FBF9F5] dark:bg-[#141312] hover:border-[#78716C]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-serif-title font-bold text-xs sm:text-sm text-[#1C1917] dark:text-[#EDE8DF] truncate">
                          {algo.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono-code font-bold ${
                          algo.riskLevel === 'baixa' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' :
                          algo.riskLevel === 'moderada' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20' :
                          algo.riskLevel === 'critica' ? 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20' :
                          'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                        }`}>
                          {algo.riskLevel}
                        </span>
                      </div>
                      <p className="text-[11px] font-serif-title text-[#57534E] dark:text-[#A8A29E] line-clamp-2 leading-relaxed">
                        {algo.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#E2DBD0]/60 dark:border-[#33302B]/60 text-[11px] font-mono-code">
                      <span className="text-[#C93B2B] dark:text-[#E05343] font-bold">
                        CPU: {algo.bigOTime}
                      </span>
                      <span className="text-[#78716C]">&bull;</span>
                      <span className="text-sky-700 dark:text-sky-400 font-bold">
                        RAM: {algo.bigOSpace}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* n Input Slider & Presets */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans-ui font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#EDE8DF]">
                  Tamanho da Entrada (<span className="font-serif italic font-bold text-[#C93B2B] dark:text-[#E05343]">n</span> elementos):
                </span>
                <span className="px-3 py-0.5 rounded-full font-mono-code text-sm font-bold bg-white dark:bg-[#22201D] text-[#C93B2B] dark:text-[#E05343] border border-[#E2DBD0] dark:border-[#33302B]">
                  n = {simulatedN.toLocaleString()}
                </span>
              </div>

              {/* Fast Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[10, 100, 1000, 10000, 50000, 100000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSimulatedN(preset)}
                    className={`px-2.5 py-1 rounded text-xs font-mono-code transition-all cursor-pointer ${
                      simulatedN === preset
                        ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-bold shadow-xs'
                        : 'bg-white dark:bg-[#22201D] text-[#57534E] dark:text-[#A8A29E] border border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C]'
                    }`}
                  >
                    {preset >= 1000 ? `${preset / 1000}k` : preset}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="range"
              min="10"
              max="100000"
              step="50"
              value={simulatedN}
              onChange={(e) => setSimulatedN(Number(e.target.value))}
              className="w-full h-2 bg-[#E2DBD0] dark:bg-[#33302B] rounded-lg appearance-none cursor-pointer accent-[#C93B2B] dark:accent-[#E05343]"
            />
          </div>

          {/* Hardware Telemetry Gauges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CPU Stress Card */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-md ${
                    cpuStressPercent > 70 ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' :
                    cpuStressPercent > 35 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                    'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF]">
                      Estresse de Processamento (CPU)
                    </h4>
                    <span className="text-[11px] font-sans-ui text-[#78716C]">
                      Cálculo de ciclos e instruções de máquina
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono-code font-bold text-lg ${
                    cpuStressPercent > 70 ? 'text-rose-600 dark:text-rose-400' :
                    cpuStressPercent > 35 ? 'text-amber-600 dark:text-amber-400' :
                    'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {cpuStressPercent}%
                  </span>
                  <span className="block text-[10px] uppercase font-sans-ui text-[#78716C]">Carga do Core</span>
                </div>
              </div>

              {/* CPU Load Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-3 rounded-full bg-[#F3EFE6] dark:bg-[#141312] overflow-hidden p-0.5 border border-[#E2DBD0] dark:border-[#33302B]">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      cpuStressPercent > 80 ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 animate-pulse' :
                      cpuStressPercent > 40 ? 'bg-gradient-to-r from-emerald-500 to-amber-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.max(2, cpuStressPercent)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#78716C]">
                  <span>Frio (Idle)</span>
                  <span>Operação Normal</span>
                  <span>Saturação (100% Core)</span>
                </div>
              </div>

              {/* Operations & Clock Cycle Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono-code">
                <div className="p-3 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
                  <span className="text-[10px] font-sans-ui text-[#78716C] uppercase block mb-1">
                    Operações Elementares:
                  </span>
                  <strong className="text-sm font-bold text-[#1C1917] dark:text-[#EDE8DF]">
                    {formatOps(calculatedOps)}
                  </strong>
                </div>
                <div className="p-3 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
                  <span className="text-[10px] font-sans-ui text-[#78716C] uppercase block mb-1">
                    Tempo Teórico @ 3GHz:
                  </span>
                  <strong className={`text-xs sm:text-sm font-bold truncate block ${
                    cpuStressPercent > 70 ? 'text-rose-600 dark:text-rose-400' : 'text-[#1C1917] dark:text-[#EDE8DF]'
                  }`}>
                    {calculateEstimatedTime(calculatedOps)}
                  </strong>
                </div>
              </div>

              <p className="text-xs font-serif-title text-[#57534E] dark:text-[#A8A29E] leading-relaxed border-t border-[#E2DBD0] dark:border-[#33302B] pt-3">
                {activeAlgo.cpuExplanation}
              </p>
            </div>

            {/* RAM Memory Stress Card */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-md ${
                    ramStressPercent > 70 ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' :
                    ramStressPercent > 35 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                    'bg-sky-500/15 text-sky-600 dark:text-sky-400'
                  }`}>
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF]">
                      Pegada de Memória (RAM / Stack)
                    </h4>
                    <span className="text-[11px] font-sans-ui text-[#78716C]">
                      Alocação de bytes, buffers e stack frames
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono-code font-bold text-lg ${
                    ramStressPercent > 70 ? 'text-rose-600 dark:text-rose-400' :
                    ramStressPercent > 35 ? 'text-amber-600 dark:text-amber-400' :
                    'text-sky-600 dark:text-sky-400'
                  }`}>
                    {formatBytes(calculatedBytes)}
                  </span>
                  <span className="block text-[10px] uppercase font-sans-ui text-[#78716C]">Alocação Estimada</span>
                </div>
              </div>

              {/* Memory Allocation Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-3 rounded-full bg-[#F3EFE6] dark:bg-[#141312] overflow-hidden p-0.5 border border-[#E2DBD0] dark:border-[#33302B]">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      ramStressPercent > 80 ? 'bg-gradient-to-r from-amber-500 to-rose-600 animate-pulse' :
                      ramStressPercent > 40 ? 'bg-gradient-to-r from-sky-500 to-amber-500' :
                      'bg-sky-500'
                    }`}
                    style={{ width: `${Math.max(2, ramStressPercent)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#78716C]">
                  <span>Bytes (Ponteiros)</span>
                  <span>Megabytes (Heap)</span>
                  <span>Risco OOM (Gigabytes)</span>
                </div>
              </div>

              {/* Memory Architecture Type & Safety Status */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono-code">
                <div className="p-3 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
                  <span className="text-[10px] font-sans-ui text-[#78716C] uppercase block mb-1">
                    Região da Memória:
                  </span>
                  <strong className="text-sm font-bold text-[#1C1917] dark:text-[#EDE8DF] capitalize flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    {activeAlgo.memoryType === 'registers' ? 'Registradores / Stack' :
                     activeAlgo.memoryType === 'stack' ? 'Call Stack (Pilha)' : 'Heap Dinâmica'}
                  </strong>
                </div>
                <div className="p-3 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]">
                  <span className="text-[10px] font-sans-ui text-[#78716C] uppercase block mb-1">
                    Estado do Coletor (GC):
                  </span>
                  <strong className={`text-xs sm:text-sm font-bold truncate block ${
                    ramStressPercent > 70 ? 'text-rose-600 dark:text-rose-400' :
                    ramStressPercent > 30 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {ramStressPercent > 70 ? 'Thrashing Crítico' :
                     ramStressPercent > 30 ? 'Pressão Moderada' : 'Repouso Seguro'}
                  </strong>
                </div>
              </div>

              <p className="text-xs font-serif-title text-[#57534E] dark:text-[#A8A29E] leading-relaxed border-t border-[#E2DBD0] dark:border-[#33302B] pt-3">
                {activeAlgo.memoryExplanation}
              </p>
            </div>
          </div>

          {/* Visual Silicon & Memory Bus Diagram */}
          <div className="p-5 rounded-lg bg-[#141312] border border-[#33302B] text-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#33302B] pb-3">
              <div className="flex items-center gap-2 text-xs font-sans-ui font-semibold text-[#EDE8DF]">
                <Activity className="w-4 h-4 text-[#E05343]" />
                Topologia do Silício &bull; Resposta Fisiológica do Hardware para n = {simulatedN.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono-code text-[#A8A29E]">
                Arquitetura: Von Neumann Simulado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* CPU Core Block */}
              <div className={`p-4 rounded border transition-all ${
                cpuStressPercent > 75 
                  ? 'border-rose-500/60 bg-rose-950/20 ring-1 ring-rose-500/30' 
                  : 'border-[#33302B] bg-[#1C1B19]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono-code font-bold uppercase text-[#EDE8DF] flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-rose-400" />
                    Núcleo de CPU
                  </span>
                  {cpuStressPercent > 75 && (
                    <span className="flex items-center gap-1 text-[10px] font-mono-code font-bold text-rose-400 uppercase animate-pulse">
                      <Flame className="w-3 h-3" />
                      Thermal Throttle
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-xs font-mono-code text-[#A8A29E]">
                  <div className="flex justify-between">
                    <span>Instruções/s:</span>
                    <span className="text-white font-bold">{formatOps(calculatedOps)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clock Utilizado:</span>
                    <span className="text-white font-bold">{cpuStressPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estado Térmico:</span>
                    <span className={cpuStressPercent > 75 ? 'text-rose-400 font-bold' : cpuStressPercent > 35 ? 'text-amber-400' : 'text-emerald-400'}>
                      {cpuStressPercent > 75 ? 'Aquecido (Throttling)' : cpuStressPercent > 35 ? 'Moderado (~55°C)' : 'Frio (~38°C)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Memory Bus Block */}
              <div className="p-4 rounded border border-[#33302B] bg-[#1C1B19] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono-code font-bold uppercase text-[#EDE8DF] flex items-center gap-1.5 mb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Barramento de Dados
                  </span>
                  <div className="space-y-1.5 text-xs font-mono-code text-[#A8A29E]">
                    <div className="flex justify-between">
                      <span>Largura de Banda:</span>
                      <span className="text-white font-bold">
                        {calculatedOps > 1000000 ? 'Alta Demanda' : 'Livre'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acessos à Memória:</span>
                      <span className="text-white font-bold">{activeAlgo.bigOSpace}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 py-1 px-2 rounded bg-[#141312] border border-[#33302B] text-[10px] font-mono-code text-center text-[#A8A29E]">
                  Tráfego de I/O em Equilíbrio
                </div>
              </div>

              {/* RAM Allocation Block */}
              <div className={`p-4 rounded border transition-all ${
                ramStressPercent > 75 
                  ? 'border-rose-500/60 bg-rose-950/20 ring-1 ring-rose-500/30' 
                  : 'border-[#33302B] bg-[#1C1B19]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono-code font-bold uppercase text-[#EDE8DF] flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-sky-400" />
                    Memória Física
                  </span>
                  {ramStressPercent > 75 && (
                    <span className="text-[10px] font-mono-code font-bold text-rose-400 uppercase animate-pulse">
                      Alerta OOM!
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-xs font-mono-code text-[#A8A29E]">
                  <div className="flex justify-between">
                    <span>Footprint:</span>
                    <span className="text-white font-bold">{formatBytes(calculatedBytes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Segmento:</span>
                    <span className="text-white font-bold capitalize">{activeAlgo.memoryType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paginação (Swap):</span>
                    <span className={ramStressPercent > 75 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {ramStressPercent > 75 ? 'Risco Iminente' : 'Inexistente'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: TESTE REAL DE CARGA NO NAVEGADOR (BENCHMARK AO VIVO) */}
      {/* ========================================================================= */}
      {activeTab === 'benchmark' && (
        <div className="mt-6 space-y-6">
          <div className="p-4 sm:p-5 rounded-lg bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B]/40 dark:border-[#E05343]/40">
            <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#C93B2B] dark:text-[#E05343] flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Execução Real no Motor JavaScript do Seu Navegador
            </h4>
            <p className="font-serif-title text-xs sm:text-sm text-[#1C1917] dark:text-[#EDE8DF] mt-1 leading-relaxed">
              Diferente de simulações teóricas, este laboratório dispara o código <strong>diretamente no hardware da sua máquina</strong>, utilizando a API <code className="font-mono-code text-xs bg-white dark:bg-[#1C1B19] px-1 py-0.5 rounded border border-[#E2DBD0] dark:border-[#33302B]">performance.now()</code> para cronometrar os milissegundos reais e medir a alocação de bytes via buffers tipados.
            </p>
          </div>

          {/* Test Controls */}
          <div className="p-5 rounded-lg bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-sans-ui font-semibold text-[#1C1917] dark:text-[#EDE8DF] block mb-1.5">
                  Algoritmo a Testar:
                </label>
                <select
                  value={currentBenchAlgo}
                  onChange={(e) => setCurrentBenchAlgo(e.target.value)}
                  disabled={benchmarking}
                  className="w-full p-2.5 rounded bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] text-xs font-serif-title text-[#1C1917] dark:text-[#EDE8DF] focus:outline-none focus:border-[#C93B2B]"
                >
                  {ALGORITHM_PROFILES.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.bigOTime} tempo &bull; {a.bigOSpace} espaço)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-sans-ui font-semibold text-[#1C1917] dark:text-[#EDE8DF] block mb-1.5">
                  Tamanho da Amostra (n):
                </label>
                <div className="flex items-center gap-2">
                  {[1000, 5000, 20000, 100000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setBenchmarkN(val)}
                      disabled={benchmarking}
                      className={`flex-1 py-2 rounded text-xs font-mono-code transition-all cursor-pointer ${
                        benchmarkN === val
                          ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-white dark:text-[#141312] font-bold shadow-xs'
                          : 'bg-white dark:bg-[#1C1B19] text-[#57534E] dark:text-[#A8A29E] border border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C]'
                      }`}
                    >
                      {val >= 1000 ? `${val / 1000}k` : val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch & Abort Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs font-serif-title text-[#78716C]">
                {benchmarking ? (
                  <span className="flex items-center gap-2 text-[#C93B2B] dark:text-[#E05343] font-bold">
                    <Activity className="w-4 h-4 animate-spin" />
                    Executando teste de estresse de CPU & Memória...
                  </span>
                ) : (
                  <span>Pronto para iniciar medição assíncrona protegida contra congelamento.</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {benchmarking ? (
                  <button
                    onClick={handleAbortBenchmark}
                    className="px-4 py-2 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-sans-ui font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    Interromper Teste
                  </button>
                ) : (
                  <button
                    onClick={runSafeBenchmark}
                    className="px-5 py-2.5 rounded bg-[#C93B2B] dark:bg-[#E05343] hover:bg-[#A82E20] dark:hover:bg-[#F06A5C] text-white text-xs font-sans-ui font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Iniciar Medição Real
                  </button>
                )}
              </div>
            </div>

            {/* Benchmark Progress Bar */}
            {benchmarking && (
              <div className="space-y-1 pt-2">
                <div className="w-full h-2 rounded-full bg-[#E2DBD0] dark:bg-[#33302B] overflow-hidden">
                  <div 
                    className="h-full bg-[#C93B2B] dark:bg-[#E05343] transition-all duration-150"
                    style={{ width: `${benchmarkProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Real Benchmark Results History Table */}
          <div className="rounded-lg border border-[#E2DBD0] dark:border-[#33302B] bg-white dark:bg-[#1C1B19] overflow-hidden shadow-xs">
            <div className="p-4 bg-[#FBF9F5] dark:bg-[#141312] border-b border-[#E2DBD0] dark:border-[#33302B] flex items-center justify-between">
              <span className="text-xs font-sans-ui font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#EDE8DF]">
                Histórico de Medições de Desempenho Real
              </span>
              {benchmarkHistory.length > 0 && (
                <button
                  onClick={() => setBenchmarkHistory([])}
                  className="text-[11px] font-sans-ui text-[#78716C] hover:text-[#C93B2B] dark:hover:text-[#E05343] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Limpar Resultados
                </button>
              )}
            </div>

            {benchmarkHistory.length === 0 ? (
              <div className="p-8 text-center text-xs font-serif-title text-[#78716C]">
                Nenhum teste executado ainda nesta sessão. Escolha um algoritmo e clique em <strong>&ldquo;Iniciar Medição Real&rdquo;</strong> acima.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono-code">
                  <thead className="bg-[#F3EFE6] dark:bg-[#22201D] text-[#78716C] uppercase text-[10px] border-b border-[#E2DBD0] dark:border-[#33302B]">
                    <tr>
                      <th className="p-3">Algoritmo</th>
                      <th className="p-3">Complexidade</th>
                      <th className="p-3">Entrada (n)</th>
                      <th className="p-3">Duração Real</th>
                      <th className="p-3">Operações Executadas</th>
                      <th className="p-3">Memória Alocada</th>
                      <th className="p-3">Horário</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2DBD0] dark:divide-[#33302B]">
                    {benchmarkHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FBF9F5] dark:hover:bg-[#141312] transition-colors">
                        <td className="p-3 font-bold text-[#1C1917] dark:text-[#EDE8DF]">
                          {item.name}
                        </td>
                        <td className="p-3">
                          <span className="text-[#C93B2B] dark:text-[#E05343] font-bold mr-1.5">{item.bigOTime}</span>
                          <span className="text-sky-700 dark:text-sky-400 font-bold">{item.bigOSpace}</span>
                        </td>
                        <td className="p-3 text-[#57534E] dark:text-[#A8A29E]">
                          n = {item.n.toLocaleString()}
                        </td>
                        <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">
                          {item.actualDurationMs} ms
                        </td>
                        <td className="p-3 text-[#57534E] dark:text-[#A8A29E]">
                          {item.opsCount.toLocaleString()}
                        </td>
                        <td className="p-3 font-semibold text-[#1C1917] dark:text-[#EDE8DF]">
                          {formatBytes(item.bytesAllocated)}
                        </td>
                        <td className="p-3 text-[10px] text-[#78716C]">
                          {item.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: O DILEMA TEMPO VS ESPAÇO (GUIA PRÁTICO DE ENGENHARIA) */}
      {/* ========================================================================= */}
      {activeTab === 'tradeoff' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1: O que é o Trade-off */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans-ui font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
                <Layers className="w-4 h-4" />
                O Princípio da Balança: Tempo vs Espaço
              </div>
              <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#1C1917] dark:text-[#EDE8DF]">
                Você pode comprar velocidade com memória?
              </h4>
              <p className="font-serif-title text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Na engenharia de software do mundo real, <strong>otimizar tempo frequentemente custa mais memória RAM</strong>, e economizar memória pode custar mais ciclos de processamento:
              </p>
              <ul className="space-y-2 text-xs font-serif-title text-[#1C1917] dark:text-[#EDE8DF]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C93B2B] dark:text-[#E05343] font-bold">&bull;</span>
                  <span><strong>Tabelas Hash / Índices:</strong> Proporcionam buscas instantâneas <code className="font-mono-code font-bold text-xs bg-[#F3EFE6] dark:bg-[#22201D] px-1 rounded">O(1)</code>, mas exigem alocar grandes blocos de memória com antecedência.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C93B2B] dark:text-[#E05343] font-bold">&bull;</span>
                  <span><strong>Memoização e Cache:</strong> Guardam os resultados de cálculos pesados para evitar reprocessar a CPU, mas consomem espaço contínuo na Heap.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Por que Servidores Caem */}
            <div className="p-5 rounded-lg bg-white dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans-ui font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-4 h-4" />
                A Anatomia do Colapso em Produção
              </div>
              <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#1C1917] dark:text-[#EDE8DF]">
                Como Algoritmos Ineficientes Derrubam Máquinas
              </h4>
              <p className="font-serif-title text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Entenda a diferença crucial entre um problema de tempo e um problema de espaço:
              </p>
              <div className="space-y-2 text-xs font-serif-title">
                <div className="p-2.5 rounded bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B]/30 text-[#1C1917] dark:text-[#EDE8DF]">
                  <strong>1. CPU Saturação (Throttling / Latência):</strong> O servidor continua ligado, mas a fila de requisições acumula e as respostas demoram minutos.
                </div>
                <div className="p-2.5 rounded bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B]/30 text-[#1C1917] dark:text-[#EDE8DF]">
                  <strong>2. Out of Memory (OOM Killer):</strong> Quando a memória física esgota, o kernel do Sistema Operacional mata o processo imediatamente sem aviso prévio.
                </div>
              </div>
            </div>
          </div>

          {/* Practical Diagnostic Summary Card */}
          <div className="p-5 rounded-lg bg-[#F3EFE6] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] space-y-3">
            <div className="flex items-center gap-2 text-xs font-sans-ui font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#EDE8DF]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Regra de Ouro do Arquiteto de Software
            </div>
            <p className="font-serif-title text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
              Sempre analise as duas faces da mesma moeda: <span className="font-mono-code font-bold text-[#C93B2B] dark:text-[#E05343]">Complexidade de Tempo</span> para saber quanto tempo o usuário esperará, e <span className="font-mono-code font-bold text-sky-700 dark:text-sky-400">Complexidade de Espaço</span> para saber quantas instâncias de servidor você precisará pagar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
