import React, { useState, useMemo } from 'react';
import { Search, X, Plus, Minus, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { GUIDES } from '../data/guidesData';

interface GuidesViewProps {
  initialOpenIndex?: number | null;
  onGoToNextTab: () => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({
  initialOpenIndex = null,
  onGoToNextTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    if (initialOpenIndex !== null && initialOpenIndex >= 0 && initialOpenIndex < GUIDES.length) {
      s.add(GUIDES[initialOpenIndex].id);
    } else {
      s.add(GUIDES[0].id); // First guide open by default
    }
    return s;
  });

  const categories = [
    { id: 'all', label: 'Bütün Mövzular' },
    { id: 'comms', label: 'Rabitə və Mesajlar' },
    { id: 'bank', label: 'Ödəniş və Bank' },
    { id: 'accounts', label: 'Hesablar və Parollar' },
    { id: 'devices', label: 'Cihazlar və Təhlükəsizlik' }
  ];

  const filteredGuides = useMemo(() => {
    return GUIDES.filter((g) => {
      const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.howItWorks.toLowerCase().includes(q) ||
        g.redFlags.some((f) => f.toLowerCase().includes(q)) ||
        g.immediateSteps.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    const next = new Set(openIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setOpenIds(next);
  };

  const handleExpandAll = () => {
    setOpenIds(new Set(filteredGuides.map((g) => g.id)));
  };

  const handleCollapseAll = () => {
    setOpenIds(new Set());
  };

  return (
    <div className="py-12 sm:py-16 space-y-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
          02 · Əsas Bələdçilər
        </span>
        <h1
          id="topics-heading"
          tabIndex={-1}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-[1.15] outline-none"
        >
          Doqquz əsas təhlükəsizlik ssenarisi
        </h1>
        <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
          Hər bir mövzunu açaraq hadisənin mahiyyəti, dələduzların istifadə etdiyi fəndlər və dərhal atılmalı addımlarla tanış olun.
        </p>
      </div>

      {/* Search Bar & Categories */}
      <div className="space-y-4">
        {/* Search Field */}
        <div className="max-w-2xl relative">
          <label htmlFor="guide-search" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E] mb-2">
            Mövzu və ya açar söz axtarın
          </label>
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-3.5 text-[#6B635B] dark:text-[#8B949E] pointer-events-none" />
            <input
              id="guide-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Məsələn: CVV, SMS, WhatsApp, Tap.az, parol..."
              className="w-full h-11 pl-11 pr-10 text-base rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-white dark:bg-[#151B23] text-[#1A1816] dark:text-[#F0F6FC] placeholder-[#6B635B]/60 focus:border-[#0F4A38] dark:focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#0F4A38]"
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

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-md bg-[#F2ECE1] dark:bg-[#151B23] border border-[#E7E2D9] dark:border-[#252E3B]">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-white dark:bg-[#0E1116] text-[#0F4A38] dark:text-[#2DD4BF] font-semibold shadow-xs'
                    : 'text-[#6B635B] dark:text-[#8B949E] hover:text-[#1A1816] dark:hover:text-[#F0F6FC]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#6B635B] dark:text-[#8B949E]">
              {filteredGuides.length} bələdçi tapıldı
            </span>
            <div className="flex items-center gap-2 border-l border-[#E7E2D9] dark:border-[#252E3B] pl-3">
              <button
                type="button"
                onClick={handleExpandAll}
                className="text-[#0F4A38] dark:text-[#2DD4BF] hover:underline cursor-pointer"
              >
                Hamısını aç
              </button>
              <span className="text-[#E7E2D9] dark:text-[#252E3B]">/</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#1A1816] dark:hover:text-[#F0F6FC] cursor-pointer"
              >
                Hamısını bağla
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accordions List */}
      <div className="space-y-4">
        {filteredGuides.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#E7E2D9] dark:border-[#252E3B] rounded-md space-y-2">
            <p className="text-base text-[#1A1816] dark:text-[#F0F6FC] font-medium">
              "{searchQuery}" üzrə heç bir nəticə tapılmadı.
            </p>
            <p className="text-xs text-[#6B635B] dark:text-[#8B949E]">
              Başqa açar sözlə axtarmağı və ya kateqoriyanı dəyişməyi yoxlayın.
            </p>
          </div>
        ) : (
          filteredGuides.map((guide) => {
            const isOpen = openIds.has(guide.id);
            return (
              <div
                key={guide.id}
                id={`guide-${guide.id}`}
                className="border border-[#E7E2D9] dark:border-[#252E3B] rounded-[6px] bg-[#FAF9F5] dark:bg-[#151B23] transition-colors overflow-hidden"
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(guide.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#F2ECE1]/50 dark:hover:bg-[#1C2430]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#0F4A38] dark:text-[#2DD4BF] shrink-0 mt-0.5">
                      {guide.num}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E]">
                          {guide.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
                        {guide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#8B949E]">
                        {guide.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded border border-[#E7E2D9] dark:border-[#252E3B] flex items-center justify-center shrink-0 text-[#6B635B] dark:text-[#8B949E]">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7E2D9] dark:border-[#252E3B] space-y-6">
                    
                    {/* How it works */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1A1816] dark:text-[#F0F6FC]">
                        Hadisə necə baş verir?
                      </h4>
                      <p className="text-sm sm:text-[15px] text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
                        {guide.howItWorks}
                      </p>
                    </div>

                    {/* Red Flags & Steps (2-Column Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Red Flags */}
                      <div className="p-4 rounded-md border border-[#EF4444]/20 bg-[#FEF2F2]/50 dark:bg-[#7F1D1D]/10 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#B91C1C] dark:text-[#F87171]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Əsas şübhəli əlamətlər</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#6B635B] dark:text-[#CBD5E1] list-disc list-inside">
                          {guide.redFlags.map((flag, fi) => (
                            <li key={fi} className="leading-snug">
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Immediate Steps */}
                      <div className="p-4 rounded-md border border-[#0F4A38]/20 dark:border-[#2DD4BF]/20 bg-[#F0FDF4]/50 dark:bg-[#064E3B]/10 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>Dərhal atılmalı addımlar</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#6B635B] dark:text-[#CBD5E1] list-disc list-inside">
                          {guide.immediateSteps.map((step, si) => (
                            <li key={si} className="leading-snug">
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Golden Rule Summary */}
                    <div className="border-l-[3px] border-[#0F4A38] dark:border-[#2DD4BF] bg-[#F4EFE6]/60 dark:bg-[#0E1116] p-4 rounded-r-md border-y border-r border-[#E7E2D9] dark:border-[#252E3B]">
                      <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] mb-0.5">
                        Əsas Qayda
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-[#1A1816] dark:text-[#F0F6FC]">
                        {guide.goldenRule}
                      </p>
                    </div>

                  </div>
                )}
              </div>
            );
          })
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
              Növbəti: Təcili addımlar →
            </span>
            <ArrowRight className="w-5 h-5 text-[#6B635B] dark:text-[#8B949E] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

    </div>
  );
};
