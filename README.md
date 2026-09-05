# 📖 A Arte dos Algoritmos

> **Tratado de Pensamento Computacional & Edição Didática Interativa**  
> Como a humanidade aprendeu a transformar a resolução de problemas em passos elegantes, rápidos e matematicamente belos.

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages Ready](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github&logoColor=white)](https://pages.github.com/)

---

## 🧭 Sobre o Projeto

**A Arte dos Algoritmos** é uma publicação digital interativa no formato de tratado editorial. Inspirada nas melhores tradições de tipografia clássica (tipos serifados, textura de papel, notas laterais e marginália histórica), a obra conduz o leitor desde a intuição cotidiana da busca em uma lista telefônica até os conceitos mais avançados de complexidade assintótica (Notação Big-O), estresse de hardware (ciclos de CPU e saturação de memória) e programação prática.

O leitor não é apenas um observador passivo: cada capítulo conta com simuladores em tempo real, calculadoras assintóticas e laboratórios de telemetria.

---

## 📚 Estrutura dos Capítulos & Funcionalidades

### 🏛️ Prólogo: A Essência da Resolução de Problemas
- O que realmente define um algoritmo antes da existência dos computadores.
- Marginália histórica sobre *Muhammad ibn Musa al-Khwarizmi* e as raízes da computação.

### 📖 Capítulo I: O Enigma da Lista Telefônica
- O problema da busca por nomes em ordem alfabética de $A$ a $Z$.
- Comparação entre as três abordagens clássicas:
  1. **Página por Página** ($O(n)$)
  2. **De Duas em Duas** ($O(n/2)$)
  3. **Dividir ao Meio** ($O(\log_2 n)$ — Busca Binária)

### 🧪 Laboratório Interativo: O Simulador da Lista Telefônica
- Simulador visual em tempo real com lista de contatos navegável.
- Execução passo a passo, retrocesso, velocidade ajustável e comparativo em tempo real de passos executados versus pior caso teórico.

### 📈 Capítulo II: A Notação Big-O e a Escala do Tempo
- A matemática assintótica sem complicações.
- Gráfico interativo com curvas de $O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$ e $O(n^2)$.
- Visualização do que acontece quando o problema cresce de 100 para 4 bilhões de possibilidades.

### 🔍 Capítulo III: Como Descobrir a Notação Big-O
- O método prático das **3 Perguntas Fundamentais**.
- Estúdio de dissecação de código: clique em cada linha para ver sua contribuição para $T(n)$.
- Regras de simplificação matemática (descarte de constantes e dominância do termo mais significativo).

### ⚡ Capítulo IV: A Realidade do Silício (Estresse de CPU & Memória)
- **Simulador Arquitetural**: Medidores virtuais de carga de CPU (0 a 100%), ciclos de clock e aquecimento térmico (*throttling*).
- **Telemetria de Memória (RAM)**: Cálculo exato de bytes alocados em registradores, pilha de execução (*Call Stack*) e memória dinâmica (*Heap*).
- **Benchmark Real no Navegador**: Teste seguro com medição em milissegundos via `performance.now()`, buffers tipados (`Uint32Array`/`Uint8Array`) e histórico comparativo.
- **O Dilema Tempo vs Espaço (*Time-Space Tradeoff*)**: Explicação de por que servidores caem (*CPU Saturação* vs *OOM Killer*).

### 🚀 Capítulo V: Da Linguagem Humana ao Código (Assuma o Manche)
- O convite ao leitor para sentar ao manche do desenvolvimento e programar.
- Tradução didática lado a lado: **Linguagem Natural ➔ Pseudocódigo ➔ Python ➔ JavaScript ➔ C (Harvard CS50)**.
- Códigos completos prontos para execução com botão de cópia em 1 clique.
- **Missões Práticas do Desenvolvedor**:
  - *Missão 1: O Duelo (Linear vs Binária com 1 milhão de itens)*
  - *Missão 2: Caça ao $O(n^2)$ (Refatoração de loops aninhados com Hash Sets)*
  - *Missão 3: Alocação Zero (Inversão in-place com $O(1)$ de espaço)*

### 📝 Epílogo: Fixando os Fundamentos
- Quiz conceitual interativo com perguntas de múltipla escolha.
- Justificativas pedagógicas detalhadas para cada alternativa e feedback imediato.

---

## 🛠️ Tecnologias Utilizadas

- **Interface & UI:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Bundler:** [Vite 6](https://vitejs.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Animações:** [Motion](https://motion.dev/)
- **Tipografia:** Google Fonts (*Newsreader*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **Temas:** Suporte nativo e fluido a Modo Claro (Papel Editorial) e Modo Escuro (Silício/OLED) com persistência em `localStorage`.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm`, `pnpm` ou `bun`

### 1. Clonar o repositório
```bash
git clone https://github.com/thazsobral/a-arte-dos-algoritmos.git
cd a-arte-dos-algoritmos
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)

### 4. Compilar para produção
```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados na pasta `dist/`.

---

## 🌐 Deploy no GitHub Pages

O projeto já está preparado para publicação automática no **GitHub Pages** com caminho relativo configurado no `vite.config.ts` (`base: './'`).

### Workflow do GitHub Actions (`.github/workflows/deploy.yml`)

Crie o arquivo `.github/workflows/deploy.yml` no seu repositório com o seguinte conteúdo:

```yaml
name: Deploy React para GitHub Pages

permissions:
  contents: write

on:
  push:
    branches:
      - main # Ou master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Instalar dependências e Build
        run: |
          npm install
          npm run build

      - name: Deploy para GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

> **Dica de Configuração:** No painel do seu repositório no GitHub, vá em **Settings** ➔ **Pages** e certifique-se de que a origem do deploy esteja configurada para a branch `gh-pages` gerada pela Action.

---

## 📂 Estrutura do Código

```text
├── public/                 # Assets estáticos e ícones
├── src/
│   ├── components/
│   │   ├── BigODiscoveryStudio.tsx    # Estúdio de análise assintótica linha por linha
│   │   ├── BigOGraphVisualizer.tsx    # Gráfico de curvas assintóticas interativo
│   │   ├── CodeTranslationStudio.tsx  # Tradução humana-código e Missões do Desenvolvedor
│   │   ├── EditorialFooter.tsx        # Rodapé editorial com notas
│   │   ├── HardwareStressLab.tsx      # Simulador e Benchmark real de CPU/RAM
│   │   ├── Navbar.tsx                 # Barra editorial, barra de progresso e sumário
│   │   ├── PhoneBookSimulator.tsx     # Simulador visual da busca na lista telefônica
│   │   └── QuizSection.tsx            # Quiz didático com pontuação e explicações
│   ├── data/
│   │   └── editorialContent.ts        # Dados dos capítulos, lista telefônica e quiz
│   ├── types.ts                       # Tipagens TypeScript compartilhadas
│   ├── App.tsx                        # Estrutura principal do tratado editorial
│   ├── main.tsx                       # Ponto de entrada React
│   └── index.css                      # Configurações de tema, tipografia e Tailwind v4
├── index.html                         # Template HTML principal
├── package.json                       # Dependências e scripts de execução
├── tsconfig.json                      # Configuração TypeScript
└── vite.config.ts                     # Configuração do Vite com base relativa
```

---

## 🖋️ Concepção & Créditos

- **Texto e Conteúdo Didático:** Tratado sobre Pensamento Computacional e Complexidade Algorítmica.
- **Desenvolvimento:** Construído com carinho utilizando React e TypeScript.

---

*“Um algoritmo nada mais é do que um conjunto de instruções passo a passo, rigorosamente ordenadas, projetadas para solucionar um problema específico.”*
