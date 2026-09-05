import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/editorialContent';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionId: number, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setRevealed({});
  };

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(revealed).length;
  const correctCount = QUIZ_QUESTIONS.filter((q) => {
    const chosen = selectedAnswers[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect)?.id;
    return chosen === correctOpt;
  }).length;

  return (
    <div 
      id="quiz-section"
      className="my-10 p-5 sm:p-8 rounded-lg bg-[#FFFFFF] dark:bg-[#1C1B19] border border-[#E2DBD0] dark:border-[#33302B] shadow-sm transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E2DBD0] dark:border-[#33302B]">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#C93B2B] dark:text-[#E05343] font-semibold">
            <HelpCircle className="w-4 h-4" />
            Fixação Didática &bull; Avaliação Rápida
          </div>
          <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-[#1C1917] dark:text-[#EDE8DF] mt-1">
            Teste sua Intuição Algorítmica
          </h3>
          <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] mt-0.5">
            Responda às questões para consolidar os conceitos da busca na lista e do Big-O.
          </p>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-sans-ui text-[#78716C]">Pontuação:</div>
              <div className="font-mono-code font-bold text-sm text-[#C93B2B] dark:text-[#E05343]">
                {correctCount} de {totalQuestions} Acertos
              </div>
            </div>
            <button
              onClick={handleResetQuiz}
              className="p-2 rounded border border-[#E2DBD0] dark:border-[#33302B] hover:bg-[#F3EFE6] dark:hover:bg-[#1C1B19] text-[#57534E] dark:text-[#A8A29E]"
              title="Reiniciar Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-8 mt-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const isAnswered = revealed[q.id];
          const chosenOptId = selectedAnswers[q.id];

          return (
            <div 
              key={q.id}
              className="p-5 rounded bg-[#FBF9F5] dark:bg-[#141312] border border-[#E2DBD0] dark:border-[#33302B]"
            >
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#78716C]">
                <span>QUESTÃO {qIndex + 1} DE {totalQuestions}</span>
              </div>
              
              <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#1C1917] dark:text-[#EDE8DF] mt-2">
                {q.question}
              </h4>
              <p className="font-serif-title text-xs sm:text-sm text-[#78716C] mt-1 italic">
                {q.context}
              </p>

              {/* Options */}
              <div className="space-y-2.5 mt-4">
                {q.options.map((opt) => {
                  const isSelected = chosenOptId === opt.id;
                  const showFeedback = isAnswered;

                  let style = 'bg-[#FFFFFF] dark:bg-[#22201D] border-[#E2DBD0] dark:border-[#33302B] hover:border-[#78716C]';

                  if (showFeedback) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-500 text-emerald-900 dark:text-emerald-200';
                    } else if (isSelected && !opt.isCorrect) {
                      style = 'bg-red-50 dark:bg-red-950/30 border-red-500 dark:border-red-500 text-red-900 dark:text-red-200';
                    } else {
                      style = 'opacity-50 border-[#E2DBD0] dark:border-[#33302B] bg-[#FFFFFF] dark:bg-[#22201D]';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isAnswered && handleSelectOption(q.id, opt.id)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3.5 rounded border transition-all flex items-start gap-3 ${style}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current shrink-0 mt-0.5 flex items-center justify-center font-mono-code text-xs font-bold uppercase">
                        {opt.id}
                      </span>
                      <div className="flex-1">
                        <div className="font-serif-title text-sm sm:text-base leading-snug">
                          {opt.text}
                        </div>
                        {showFeedback && (isSelected || opt.isCorrect) && (
                          <div className={`mt-2 text-xs font-sans-ui flex items-start gap-1.5 ${opt.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                            {opt.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                            <span>{opt.explanation}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {answeredCount === totalQuestions && (
        <div className="mt-8 p-6 rounded bg-[#FDF2F0] dark:bg-[#2A1715] border border-[#C93B2B] dark:border-[#E05343] text-center">
          <Award className="w-8 h-8 text-[#C93B2B] dark:text-[#E05343] mx-auto mb-2" />
          <h4 className="font-serif-title font-bold text-lg text-[#1C1917] dark:text-[#EDE8DF]">
            {correctCount === totalQuestions
              ? 'Excelente! Compreensão Perfeita dos Algoritmos.'
              : 'Bom trabalho! A prática consolida o pensamento computacional.'}
          </h4>
          <p className="font-serif-title text-sm text-[#57534E] dark:text-[#A8A29E] mt-1 max-w-md mx-auto">
            Você explorou a lógica passo a passo, o problema da lista telefônica e a elegância da notação Big-O.
          </p>
        </div>
      )}
    </div>
  );
};
