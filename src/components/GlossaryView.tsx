import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossaryData';

interface GlossaryViewProps {
  onGoToNextTab: () => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onGoToNextTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Bütün Sözlər' },
    { id: 'threat', label: 'Təhlükələr' },
    { id: 'defense', label: 'Müdafiə Vasitələri' },
    { id: 'concept', label: 'Əsas Anlayışlar' }
  ];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.plainAnalogy.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="py-12 sm:py-16 space-y-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
          04 · Terminlər
        </span>
        <h1
          id="glossary-heading"
          tabIndex={-1}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-[1.15] outline-none"
        >
          Sadə dildə təhlükəsizlik sözlüyü
        </h1>
        <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
          Kibertəhlükəsizlik mürəkkəb texniki jarqonlarla dolu olmamalıdır. Əsas anlayışların mahiyyəti və gündəlik həyatdakı qarşılığı.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <div className="max-w-xl relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-3.5 text-[#6B635B] dark:text-[#8B949E] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Termin axtarın (məsələn: 2FA, CVV, Fişinq...)"
              className="w-full h-11 pl-11 pr-10 text-base rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-white dark:bg-[#151B23] text-[#1A1816] dark:text-[#F0F6FC] placeholder-[#6B635B]/60 focus:border-[#0F4A38] dark:focus:border-[#2DD4BF] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-[#6B635B] hover:text-[#1A1816] dark:hover:text-[#F0F6FC] cursor-pointer"
                aria-label="Axtarışı təmizlə"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-md bg-[#F2ECE1] dark:bg-[#151B23] border border-[#E7E2D9] dark:border-[#252E3B] w-fit">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-white dark:bg-[#0E1116] text-[#0F4A38] dark:text-[#2DD4BF] font-semibold shadow-xs'
                  : 'text-[#6B635B] dark:text-[#8B949E] hover:text-[#1A1816] dark:hover:text-[#F0F6FC]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.length === 0 ? (
          <div className="col-span-2 p-12 text-center border border-dashed border-[#E7E2D9] dark:border-[#252E3B] rounded-md">
            <p className="text-sm text-[#6B635B] dark:text-[#8B949E]">
              "{searchQuery}" üzrə heç bir termin tapılmadı.
            </p>
          </div>
        ) : (
          filteredTerms.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
                    {t.term}
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E]">
                    {t.categoryLabel}
                  </span>
                </div>
                <p className="text-sm text-[#1A1816] dark:text-[#F0F6FC] leading-relaxed">
                  {t.definition}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E7E2D9]/70 dark:border-[#252E3B]/70 bg-[#F7F4EE]/50 dark:bg-[#0E1116]/50 p-3 rounded-md">
                <span className="text-[11px] font-mono uppercase font-semibold text-[#0F4A38] dark:text-[#2DD4BF] block mb-0.5">
                  Sadə Dildə Analoq:
                </span>
                <p className="text-xs sm:text-[13px] text-[#6B635B] dark:text-[#8B949E] leading-normal italic">
                  "{t.plainAnalogy}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>

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
              Növbəti: Rəsmi qurumlar →
            </span>
            <ArrowRight className="w-5 h-5 text-[#6B635B] dark:text-[#8B949E] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

    </div>
  );
};
