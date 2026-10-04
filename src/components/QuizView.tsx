import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldCheck, ShieldAlert } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';

interface QuizViewProps {
  onGoToNextTab: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onGoToNextTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const q = QUIZ_QUESTIONS[currentIndex];
  const isAnswered = answeredMap[currentIndex] !== undefined;

  const handleSelect = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optIndex);
    setAnsweredMap((prev) => ({ ...prev, [currentIndex]: optIndex }));
    if (q.options[optIndex].isCorrect) {
      setUserScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(answeredMap[currentIndex + 1] ?? null);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(answeredMap[currentIndex - 1] ?? null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserScore(0);
    setAnsweredMap({});
    setIsFinished(false);
  };

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
          03 · Dələduz Yoxlama Testi
        </span>
        <h1
          id="quiz-heading"
          tabIndex={-1}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-[1.15] outline-none"
        >
          10 real vəziyyətlə özünüzü sınayın
        </h1>
        <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
          Azərbaycanda hər gün minlərlə vətəndaşın qarşılaşdığı real dələduzluq ssenariləri. Nə qədər diqqətli olduğunuzu yoxlayın.
        </p>
      </div>

      {isFinished ? (
        /* Quiz Finished Screen */
        <div className="p-8 sm:p-12 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#0F4A38]/10 dark:bg-[#2DD4BF]/10 text-[#0F4A38] dark:text-[#2DD4BF] flex items-center justify-center mx-auto">
            {userScore >= 8 ? (
              <ShieldCheck className="w-8 h-8" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-[#D97706] dark:text-[#FBBF24]" />
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E]">
              Test Nəticəsi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
              {userScore} / {QUIZ_QUESTIONS.length} Doğru Cavab
            </h2>
            <p className="text-sm sm:text-base text-[#6B635B] dark:text-[#8B949E] max-w-md mx-auto pt-2">
              {userScore >= 9
                ? 'Əla nəticə! Rəqəmsal təhlükəsizlik intuisiyanız çox yüksəkdir. Dələduzların fəndlərini dərhal ayırd edə bilirsiniz.'
                : userScore >= 6
                ? 'Yaxşı nəticə, lakin bəzi incə ssenarilərdə risk altındasınız. Əsas bələdçiləri gözdən keçirməyiniz tövsiyə olunur.'
                : 'Diqqətli olun! Real həyatda bu tələlərdən birinə düşmək təhlükəniz var. Təcili olaraq bələdçilərimizi oxuyun.'}
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-white dark:bg-[#0E1116] text-sm font-semibold text-[#1A1816] dark:text-[#F0F6FC] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testi Yenidən Keç</span>
            </button>

            <button
              type="button"
              onClick={onGoToNextTab}
              className="px-5 py-2.5 rounded-md bg-[#0F4A38] dark:bg-[#2DD4BF] text-white dark:text-[#0E1116] text-sm font-semibold hover:bg-[#0D3F30] dark:hover:bg-[#14B8A6] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Növbəti: Lüğət</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between text-xs font-mono text-[#6B635B] dark:text-[#8B949E] pb-3 border-b border-[#E7E2D9] dark:border-[#252E3B]">
            <span>Sual {currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
            <span>Cari Nəticə: {userScore} xal</span>
          </div>

          <div className="p-6 sm:p-8 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] space-y-6">
            
            {/* Situation Header */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] bg-[#0F4A38]/10 dark:bg-[#2DD4BF]/10 px-2.5 py-1 rounded inline-block">
                {q.source}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-snug">
                {q.situation}
              </h3>
              {q.context && (
                <p className="text-xs font-mono text-[#6B635B] dark:text-[#8B949E]">
                  Kontekst: {q.context}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {q.options.map((opt, oi) => {
                const isChosen = answeredMap[currentIndex] === oi;
                const answered = isAnswered;

                let optClass = 'border-[#E7E2D9] dark:border-[#252E3B] bg-white dark:bg-[#0E1116] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430]';
                if (answered) {
                  if (opt.isCorrect) {
                    optClass = 'border-[#0F4A38] dark:border-[#2DD4BF] bg-[#F0FDF4] dark:bg-[#064E3B]/20 text-[#0F4A38] dark:text-[#2DD4BF] font-semibold';
                  } else if (isChosen && !opt.isCorrect) {
                    optClass = 'border-[#DC2626] dark:border-[#F87171] bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 text-[#DC2626] dark:text-[#F87171]';
                  } else {
                    optClass = 'opacity-50 border-[#E7E2D9] dark:border-[#252E3B] bg-white dark:bg-[#0E1116]';
                  }
                }

                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelect(oi)}
                    className={`w-full text-left p-4 rounded-md border text-sm sm:text-[15px] transition-colors flex items-start gap-3 cursor-pointer disabled:cursor-default ${optClass}`}
                  >
                    <span className="font-mono text-xs font-bold shrink-0 mt-0.5 opacity-60">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                    {answered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[#0F4A38] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                    )}
                    {answered && isChosen && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-[#DC2626] dark:text-[#F87171] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {isAnswered && (
              <div className="p-4 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#0E1116] space-y-1.5 animate-in fade-in duration-200">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] block">
                  Ekspert İzahı:
                </span>
                <p className="text-xs sm:text-sm text-[#1A1816] dark:text-[#F0F6FC] leading-relaxed">
                  {q.options[answeredMap[currentIndex]].explanation}
                </p>
                <p className="text-xs font-mono text-[#6B635B] dark:text-[#8B949E] pt-1 border-t border-[#E7E2D9]/60 dark:border-[#252E3B]/60">
                  Əsas ipucu: {q.securityClue}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E7E2D9] dark:border-[#252E3B]">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded text-xs font-semibold text-[#6B635B] dark:text-[#8B949E] hover:text-[#1A1816] dark:hover:text-[#F0F6FC] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                ← Əvvəlki
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!isAnswered}
                className="px-5 py-2.5 rounded-md bg-[#0F4A38] dark:bg-[#2DD4BF] text-white dark:text-[#0E1116] text-xs font-semibold hover:bg-[#0D3F30] dark:hover:bg-[#14B8A6] disabled:opacity-40 disabled:pointer-events-none transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentIndex === QUIZ_QUESTIONS.length - 1 ? 'Nəticəni Gör' : 'Növbəti Sual'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Next Chapter CTA */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onGoToNextTab}
          className="w-full text-left border-l-[3px] border-[#0F4A38] dark:border-[#2DD4BF] bg-[#FAF9F5] dark:bg-[#151B23] p-4 sm:p-5 rounded-r-md border-y border-r border-[#E7E2D9] dark:border-[#252E3B] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430] transition-colors cursor-pointer group"
        >
          <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] mb-1">
            Növbəti Bölmə
          </span>
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg sm:text-xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
              Növbəti: Lüğət →
            </span>
            <ArrowRight className="w-5 h-5 text-[#6B635B] dark:text-[#8B949E] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

    </div>
  );
};
