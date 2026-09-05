import React from 'react';
import { ExternalLink, BookMarked, Feather } from 'lucide-react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer 
      id="editorial-footer"
      className="mt-20 border-t border-[#E2DBD0] dark:border-[#33302B] bg-[#F3EFE6] dark:bg-[#141312] text-[#57534E] dark:text-[#A8A29E] transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Credits and Inspiration section */}
        <div className="mb-8 p-6 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-semibold mb-2">
            <BookMarked className="w-4 h-4" />
            Créditos de Inspiração Pedagógica
          </div>
          <h4 className="font-serif-title font-bold text-base text-[#1C1917] dark:text-[#EDE8DF]">
            CS50: Introduction to Computer Science — Professor David J. Malan (Harvard University)
          </h4>
          <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] mt-1 leading-relaxed">
            A célebre analogia pedagógica de rasgar a lista telefônica ao meio para explicar a busca binária e a notação Big-O é uma das demonstrações mais icônicas da história do ensino de ciência da computação mundial.
          </p>
          <div className="mt-3">
            <a
              href="https://cs50.harvard.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans-ui font-semibold text-[#C93B2B] dark:text-[#E05343] hover:underline"
            >
              <span>Acessar fonte oficial (CS50 Harvard)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Divider with subtle artisan feather icon */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-[#E2DBD0] dark:bg-[#33302B] flex-1" />
          <Feather className="w-4 h-4 text-[#78716C] mx-4" />
          <div className="h-px bg-[#E2DBD0] dark:bg-[#33302B] flex-1" />
        </div>

        {/* Mandatory Footer Text */}
        <div className="text-center">
          <p className="font-serif-title text-sm sm:text-base text-[#1C1917] dark:text-[#EDE8DF] font-medium leading-relaxed">
            Desenvolvido por ThazSobral para fins de Educação Tecnológica Prática e Interativa. © 2026 — Todos os direitos reservados.
          </p>
          <p className="text-xs font-sans-ui text-[#78716C] mt-2">
            Projeto estático educativo focado em UX/UI minimalista, design instrucional e storytelling digital.
          </p>
        </div>
      </div>
    </footer>
  );
};
