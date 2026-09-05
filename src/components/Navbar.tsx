import React, { useState, useEffect } from 'react';
import { Sun, Moon, BookOpen, Bookmark, List, Check, ArrowUp } from 'lucide-react';
import { CHAPTERS } from '../data/editorialContent';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeChapter: string;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, activeChapter }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div 
        id="reading-progress-container"
        className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none"
      >
        <div 
          id="reading-progress-bar"
          className="h-full bg-[#C93B2B] dark:bg-[#E05343] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Editorial Header */}
      <header 
        id="editorial-header"
        className="sticky top-0 z-40 bg-[#FBF9F5]/90 dark:bg-[#141312]/90 backdrop-blur-md border-b border-[#E2DBD0] dark:border-[#33302B] transition-colors"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="btn-toc-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2 rounded border border-[#E2DBD0] dark:border-[#33302B] hover:bg-[#F3EFE6] dark:hover:bg-[#1C1B19] transition-colors flex items-center gap-2 text-xs uppercase tracking-wider font-sans-ui text-[#57534E] dark:text-[#A8A29E]"
              title="Sumário de Capítulos"
              aria-label="Sumário"
            >
              <List className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343]" />
              <span className="hidden sm:inline font-medium">Índice</span>
            </button>
            <div className="h-4 w-px bg-[#E2DBD0] dark:bg-[#33302B] hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif-title font-semibold text-sm sm:text-base tracking-tight text-[#1C1917] dark:text-[#EDE8DF]">
                A Arte dos Algoritmos
              </span>
              <span className="text-[10px] sm:text-xs font-sans-ui text-[#78716C] uppercase tracking-widest">
                Edição Didática
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1 text-xs text-[#78716C] font-mono-code px-2 py-1 rounded bg-[#F3EFE6] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B]">
              <BookOpen className="w-3.5 h-3.5 text-[#C93B2B] dark:text-[#E05343]" />
              <span>{Math.round(scrollProgress)}% Lido</span>
            </div>

            {/* Dark Mode Switcher */}
            <button
              id="btn-theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-[#E2DBD0] dark:border-[#33302B] bg-[#FFFFFF] dark:bg-[#22201D] text-[#1C1917] dark:text-[#EDE8DF] hover:border-[#C93B2B] dark:hover:border-[#E05343] transition-all shadow-xs flex items-center justify-center"
              title={darkMode ? "Mudar para Modo Claro (Papel)" : "Mudar para Modo Escuro (Noturno)"}
              aria-label="Alternar Tema"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-[#E05343]" />
              ) : (
                <Moon className="w-4 h-4 text-[#57534E]" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Table of Contents */}
        {isMenuOpen && (
          <div 
            id="toc-dropdown"
            className="absolute top-full left-0 right-0 bg-[#FBF9F5] dark:bg-[#141312] border-b border-[#E2DBD0] dark:border-[#33302B] shadow-xl p-6 transition-all animate-in fade-in slide-in-from-top-2"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2DBD0] dark:border-[#33302B]">
                <h3 className="font-serif-title font-bold text-lg text-[#1C1917] dark:text-[#EDE8DF] flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#C93B2B] dark:text-[#E05343]" />
                  Sumário da Leitura
                </h3>
                <span className="text-xs font-sans-ui text-[#78716C]">Selecione um capítulo para navegar</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {CHAPTERS.map((chap) => {
                  const isActive = activeChapter === chap.id;
                  return (
                    <button
                      key={chap.id}
                      id={`toc-link-${chap.id}`}
                      onClick={() => scrollToSection(chap.id)}
                      className={`text-left p-3 rounded border transition-all ${
                        isActive
                          ? 'border-[#C93B2B] dark:border-[#E05343] bg-[#FDF2F0] dark:bg-[#2A1715]'
                          : 'border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C] bg-[#FFFFFF] dark:bg-[#1C1B19]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-sans-ui font-semibold uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343]">
                          {chap.number}
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 text-[#C93B2B] dark:text-[#E05343]" />}
                      </div>
                      <div className="font-serif-title font-semibold text-sm text-[#1C1917] dark:text-[#EDE8DF] mt-1 line-clamp-1">
                        {chap.title}
                      </div>
                      <div className="text-xs font-sans-ui text-[#78716C] mt-0.5 line-clamp-1">
                        {chap.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Theme Button for Easy Access (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {showBackToTop && (
          <button
            id="btn-back-to-top"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#FFFFFF] dark:bg-[#22201D] border border-[#E2DBD0] dark:border-[#33302B] text-[#57534E] dark:text-[#A8A29E] hover:text-[#C93B2B] dark:hover:text-[#E05343] hover:border-[#C93B2B] dark:hover:border-[#E05343] shadow-lg transition-all"
            title="Voltar ao início"
            aria-label="Voltar ao início"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          id="floating-theme-button"
          onClick={() => setDarkMode(!darkMode)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] dark:bg-[#22201D] border border-[#E2DBD0] dark:border-[#33302B] text-[#1C1917] dark:text-[#EDE8DF] hover:border-[#C93B2B] dark:hover:border-[#E05343] shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          title="Alternar entre Papel (Claro) e Noturno (Escuro)"
        >
          {darkMode ? (
            <>
              <Sun className="w-4 h-4 text-[#E05343]" />
              <span className="text-xs font-sans-ui font-medium">Modo Papel</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-[#57534E]" />
              <span className="text-xs font-sans-ui font-medium">Modo Noturno</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
