import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';

interface OctoberChallengeProps {
  onGoToGuide: (guideIndex: number) => void;
  onGoToNextTab: () => void;
}

export const OctoberChallenge: React.FC<OctoberChallengeProps> = ({
  onGoToGuide,
  onGoToNextTab
}) => {
  const [completed, setCompleted] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem('kiber-october-challenge');
      return saved ? JSON.parse(saved) : [false, false, false, false];
    } catch {
      return [false, false, false, false];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kiber-october-challenge', JSON.stringify(completed));
    } catch {
      // ignore
    }
  }, [completed]);

  const tasks = [
    {
      week: '1-ci həftə',
      num: '01',
      task: 'E-poçtunuzda və bank tətbiqlərində iki mərhələli doğrulamanı (2FA) aktivləşdirin',
      guideIdx: 2,
      guideTitle: '2FA Bələdçisi'
    },
    {
      week: '2-ci həftə',
      num: '02',
      task: 'Parol menecerini qurun və ən vacib 3 parolunuzu dəyişin',
      guideIdx: 1,
      guideTitle: 'Parollar Bələdçisi'
    },
    {
      week: '3-cü həftə',
      num: '03',
      task: 'Telefon və kompüterinizi yeniləyin, ehtiyat nüsxələrinizi yoxlayın',
      guideIdx: 6,
      guideTitle: 'Yenilənmələr Bələdçisi'
    },
    {
      week: '4-cü həftə',
      num: '04',
      task: 'Valideyn, nənə-baba və ya uşaqla yayılmış dələduzluq üsulları haqqında danışın',
      guideIdx: 7,
      guideTitle: 'Ailə Bələdçisi'
    }
  ];

  const handleToggle = (idx: number) => {
    const next = [...completed];
    next[idx] = !next[idx];
    setCompleted(next);
  };

  const count = completed.filter(Boolean).length;
  const pct = Math.round((count / tasks.length) * 100);

  return (
    <section id="october-challenge" className="py-14 sm:py-20 transition-colors" aria-labelledby="october-challenge-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Progress Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7E2D9] dark:border-[#252E3B]">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
              Oktyabr · 4 Həftəlik Rəqəmsal Gücləndirmə
            </span>
            <h2
              id="october-challenge-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1A1816] dark:text-[#F0F6FC]"
            >
              Bu ayın 4 həftəlik çağırışı
            </h2>
            <p className="text-sm sm:text-base text-[#6B635B] dark:text-[#8B949E] max-w-xl">
              Hər həftə bircə sadə addım ataraq rəqəmsal təhlükəsizliyinizi addım-addım gücləndirin.
            </p>
          </div>

          <div className="w-full md:w-72 shrink-0 p-4 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#151B23] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#6B635B] dark:text-[#8B949E]">Aylıq tərəqqi</span>
              <span className="font-semibold text-[#1A1816] dark:text-[#F0F6FC]">{count} / {tasks.length} tamamlandı</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E7E2D9] dark:bg-[#252E3B] overflow-hidden">
              <div
                className="h-full bg-[#0F4A38] dark:bg-[#2DD4BF] transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {tasks.map((t, idx) => {
            const isDone = completed[idx];
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-md border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'border-[#0F4A38]/30 dark:border-[#2DD4BF]/30 bg-[#0F4A38]/5 dark:bg-[#2DD4BF]/5'
                    : 'border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    className={`w-6 h-6 rounded mt-0.5 border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                      isDone
                        ? 'bg-[#0F4A38] dark:bg-[#2DD4BF] border-[#0F4A38] dark:border-[#2DD4BF] text-white dark:text-[#0E1116]'
                        : 'border-[#6B635B] dark:border-[#8B949E] bg-white dark:bg-[#0E1116]'
                    }`}
                    aria-label={`${t.week} tapşırığını tamamlandı kimi qeyd edin`}
                  >
                    {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#0F4A38] dark:text-[#2DD4BF]">
                        {t.num} · {t.week}
                      </span>
                    </div>
                    <p className={`text-sm sm:text-base font-medium leading-snug ${isDone ? 'line-through text-[#6B635B] dark:text-[#8B949E]' : 'text-[#1A1816] dark:text-[#F0F6FC]'}`}>
                      {t.task}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onGoToGuide(t.guideIdx)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline self-end sm:self-center shrink-0 cursor-pointer"
                >
                  <span>{t.guideTitle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Next Chapter CTA ("Qayda" Rule Block Style) */}
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
                Növbəti: Niyə vacibdir →
              </span>
              <ArrowRight className="w-5 h-5 text-[#6B635B] dark:text-[#8B949E] group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
