import React, { useState } from 'react';
import { ArrowDown, ArrowRight, AlertTriangle } from 'lucide-react';

interface HeroSmsProps {
  onGoToGuides: () => void;
  onGoToQuiz: () => void;
}

export const HeroSms: React.FC<HeroSmsProps> = ({ onGoToGuides, onGoToQuiz }) => {
  const [activeNote, setActiveNote] = useState<number | null>(null);

  const notes = [
    {
      id: 1,
      tag: '01',
      title: 'Süni tələskənlik',
      desc: '"12 saat ərzində" deyərək həyəcan yaradır və düşünmədən linkə keçməyə məcbur edirlər.'
    },
    {
      id: 2,
      tag: '02',
      title: 'Cüzi məbləğ tələsi',
      desc: '2.30 AZN xırda görünür, lakin açılan saxta səhifə kart nömrənizi və CVV kodunuzu oğurlayır.'
    },
    {
      id: 3,
      tag: '03',
      title: 'Saxta sayt ünvanı',
      desc: '"Azərpoçt"un rəsmi portalı azerpost.az-dır; dövlət poçtu heç vaxt naməlum .info və ya .top domenindən SMS göndərmir.'
    }
  ];

  return (
    <section id="hero" className="py-14 sm:py-20 border-b border-[#E7E2D9] dark:border-[#252E3B] transition-colors" aria-labelledby="hero-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
              01 · Əsas Həqiqət
            </div>

            <h1
              id="hero-heading"
              tabIndex={-1}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.12] text-[#1A1816] dark:text-[#F0F6FC] outline-none"
            >
              Dələduz sizin tələsməyinizi gözləyir. Dayanın və yoxlayın.
            </h1>

            <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed max-w-2xl">
              Şəxsi məlumatlarınızı və vəsaitinizi qorumaq üçün İT mütəxəssisi olmağa ehtiyac yoxdur. Əsas qayda sadədir: kimsə sizdən tələsik SMS kod, bank kartı məlumatı və ya pul istəyirsə, 5 dəqiqə fasilə verib məlumatı rəsmi mənbədən dəqiqləşdirin.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onGoToGuides}
                className="px-5 py-3 rounded-md bg-[#0F4A38] dark:bg-[#2DD4BF] text-white dark:text-[#0E1116] font-medium text-sm hover:bg-[#0D3F30] dark:hover:bg-[#14B8A6] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Bələdçiləri oxuyun</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onGoToQuiz}
                className="px-5 py-3 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-white dark:bg-[#151B23] text-[#1A1816] dark:text-[#F0F6FC] font-medium text-sm hover:border-[#1A1816] dark:hover:border-[#F0F6FC] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>10 real vəziyyətlə yoxlayın</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {/* Campaign Callout Block */}
            <div className="mt-8 p-4 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#151B23] space-y-1.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
                Oktyabr 2026 · Maarifləndirmə Hərəkatı
              </span>
              <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
                Hər ilin oktyabr ayında dünyada insanlar rəqəmsal mühitdə təhlükəsiz qalmaq üçün vacib vərdişlərə diqqət yetirir. Bu bələdçi şəxsi hesablarınızı və ailənizi qorumağa başlamaq üçün ən münasib yerdir.
              </p>
            </div>
          </div>

          {/* Right: The Interactive SMS Deconstruction Mockup */}
          <div className="lg:col-span-5">
            <div className="border border-[#E7E2D9] dark:border-[#252E3B] rounded-[10px] bg-white dark:bg-[#151B23] shadow-sm overflow-hidden">
              
              {/* Phone Header */}
              <div className="p-3.5 border-b border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#0E1116] flex items-center justify-between text-xs font-mono text-[#6B635B] dark:text-[#8B949E]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  <span className="font-semibold text-[#1A1816] dark:text-[#F0F6FC]">+994 50 211 48 92</span>
                </div>
                <span>10:42</span>
              </div>

              {/* Message Screen */}
              <div className="p-5 space-y-4">
                <div className="p-4 rounded-lg bg-[#F2ECE1]/80 dark:bg-[#1F2937] text-xs sm:text-[13px] leading-relaxed text-[#1A1816] dark:text-[#F0F6FC] font-sans border border-[#E7E2D9] dark:border-[#374151]">
                  Azərpoçt bildirişi: Xaricdən gələn AZ928471 bağlamanızın çatdırılma ünvanı natamamdır. Bağlamanın geri qayıtmaması üçün{' '}
                  <button
                    type="button"
                    onClick={() => setActiveNote(activeNote === 1 ? null : 1)}
                    className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-colors ${
                      activeNote === 1
                        ? 'bg-[#EF4444]/20 text-[#B91C1C] dark:text-[#F87171] font-semibold ring-1 ring-[#EF4444]/40'
                        : 'bg-black/5 dark:bg-white/10 hover:bg-[#EF4444]/10'
                    }`}
                  >
                    12 saat ərzində
                  </button>{' '}
                  ünvanı təsdiqləyin və{' '}
                  <button
                    type="button"
                    onClick={() => setActiveNote(activeNote === 2 ? null : 2)}
                    className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-colors ${
                      activeNote === 2
                        ? 'bg-[#F59E0B]/20 text-[#B45309] dark:text-[#FBBF24] font-semibold ring-1 ring-[#F59E0B]/40'
                        : 'bg-black/5 dark:bg-white/10 hover:bg-[#F59E0B]/10'
                    }`}
                  >
                    2.30 AZN kuryer rüsumunu
                  </button>{' '}
                  ödəyin:{' '}
                  <button
                    type="button"
                    onClick={() => setActiveNote(activeNote === 3 ? null : 3)}
                    className={`inline-block px-1 py-0.5 rounded font-mono break-all underline decoration-dotted cursor-pointer transition-colors ${
                      activeNote === 3
                        ? 'bg-[#DC2626]/20 text-[#DC2626] dark:text-[#F87171] font-bold ring-1 ring-[#DC2626]/40'
                        : 'text-[#DC2626] dark:text-[#F87171] hover:bg-[#DC2626]/10'
                    }`}
                  >
                    http://azerpoct-kuryer-catdirilma.info/ode
                  </button>
                </div>

                {/* Interactive Annotations */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E] block mb-1">
                    Dələduz mesajının təhlili (üzərinə vurun):
                  </span>

                  {notes.map((note) => {
                    const isSelected = activeNote === note.id;
                    return (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => setActiveNote(isSelected ? null : note.id)}
                        className={`w-full text-left p-3 rounded-md border text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-[#0F4A38] dark:border-[#2DD4BF] bg-[#0F4A38]/5 dark:bg-[#2DD4BF]/5'
                            : 'border-[#E7E2D9] dark:border-[#252E3B] hover:bg-[#F7F4EE] dark:hover:bg-[#1C2430]'
                        }`}
                      >
                        <span className="font-mono font-bold text-[#0F4A38] dark:text-[#2DD4BF] shrink-0">
                          {note.tag}
                        </span>
                        <div>
                          <span className="font-semibold text-[#1A1816] dark:text-[#F0F6FC] block">
                            {note.title}
                          </span>
                          <span className="text-[#6B635B] dark:text-[#8B949E] mt-0.5 block leading-normal">
                            {note.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
