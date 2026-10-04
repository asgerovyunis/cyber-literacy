import React, { useState } from 'react';
import { ArrowUpRight, Check, AlertCircle, ShieldCheck, ShieldAlert } from 'lucide-react';

interface ShareAwarenessProps {
  onGoToGuide: (guideIndex?: number) => void;
}

export const ShareAwareness: React.FC<ShareAwarenessProps> = ({ onGoToGuide }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false, false]);

  const checklistItems = [
    'Ev ünvanı və ya yaşadığınız yer (lokasiya, pəncərədən mənzərə, açar fotosu)',
    'Uşağın şəkli məktəb forması, nömrəsi və ya ünvanı ilə',
    'Bilet, sənəd, kart və ya QR kodun şəkli (konsert, təyyarə, viza)',
    '"Tətildəyik" kimi səfər tarixləri (evdə olmadığınız günlər)',
    'Doğum tarixi, ana adı, ev heyvanının adı (parol və gizli suallar)',
    'İş yeri, vəzifə və iş yoldaşlarının adları'
  ];

  const handleToggle = (index: number) => {
    const next = [...checkedItems];
    next[index] = !next[index];
    setCheckedItems(next);
  };

  const countChecked = checkedItems.filter(Boolean).length;

  const toolCards = [
    {
      label: 'Beynəlxalq sızma arayışı',
      title: 'Have I Been Pwned?',
      desc: 'E-poçt ünvanınızın və ya telefon nömrənizin məlum qlobal internet sızmalarında yer alıb-almadığını pulsuz yoxlayın.',
      linkText: 'E-poçtunuzu yoxlayın',
      url: 'https://haveibeenpwned.com'
    },
    {
      label: 'Onlayn alış-veriş',
      title: 'ScamAdviser',
      desc: 'Onlayn mağazanın və ya saytın etibarlılığını alış-verişdən əvvəl yoxlayın.',
      linkText: 'Mağazanı yoxlayın',
      url: 'https://www.scamadviser.com'
    },
    {
      label: 'Şəkil axtarışı',
      title: 'TinEye',
      desc: 'Tanışlıq və ya investisiya təklifində gələn şəkli başqa yerdə istifadə olunub-olunmadığına görə yoxlayın.',
      linkText: 'Şəkli yoxlayın',
      url: 'https://www.tineye.com'
    }
  ];

  return (
    <section
      id="share-awareness"
      className="pt-10 pb-16 border-b border-[#E7E2D9] dark:border-[#252E3B] transition-colors"
      aria-labelledby="share-awareness-heading"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Part 1: Asymmetric Story (Photo + Editorial Text) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Boarding Pass Photo */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative rounded-[6px] overflow-hidden border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F2ECE1] dark:bg-[#151B23]">
              <img
                src="/images/boarding-pass-photo.webp"
                alt="Təyyarə minik talonu və rezervasiya barkodunun fotosu"
                className="w-full aspect-[16/10] object-cover object-[40%_center]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 text-xs font-mono text-[#6B635B] dark:text-[#8B949E] border-t border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#0E1116] flex items-center justify-between">
                <span>Fakt: Barkod vasitəsilə sərnişinin PNR və pasport məlumatları oxuna bilər</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
              00 · Sosial Media Fərqindəliyi
            </div>

            <h2
              id="share-awareness-heading"
              tabIndex={-1}
              className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[1.15] text-[#1A1816] dark:text-[#F0F6FC] outline-none"
            >
              Siz paylaşırsınız, dələduz toplayır.
            </h2>

            <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed max-w-xl">
              Sosial şəbəkələrdə tək-tək paylaşılan xırda detallar zərərsiz görünür. Bir yerə yığılanda isə dələduz parolunuzu təxmin edə, yaxın tanış kimi zəng vurub sizi aldada bilər.
            </p>

            {/* Signature "Qayda" Block */}
            <div className="border-l-[3px] border-[#0F4A38] dark:border-[#2DD4BF] bg-[#F4EFE6]/60 dark:bg-[#151B23] p-4 sm:p-5 rounded-r-md border-y border-r border-[#E7E2D9] dark:border-[#252E3B]">
              <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] mb-1">
                Qayda
              </span>
              <p className="text-sm sm:text-[15px] font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-snug">
                Paylaşmazdan əvvəl 5 saniyə dayanın və soruşun: bunu yad adam bilsə, mənə zərər verə bilərmi?
              </p>
            </div>
          </div>
        </div>

        {/* Part 2: Interactive Oversharing Checklist Panel */}
        <div className="border border-[#E7E2D9] dark:border-[#252E3B] rounded-[6px] bg-[#FAF9F5] dark:bg-[#151B23] p-6 sm:p-8 lg:p-10 transition-colors">
          <div className="max-w-3xl mb-6">
            <h3 className="font-sans text-lg sm:text-xl font-semibold text-[#1A1816] dark:text-[#F0F6FC]">
              Son 6 ayda bunlardan hansını paylaşmısınız?
            </h3>
            <p className="text-sm text-[#6B635B] dark:text-[#8B949E] mt-1">
              Özünüzü səmimi yoxlayın. Nəticə heç bir serverə göndərilmir, yalnız cihazınızda hesablanır.
            </p>
          </div>

          {/* 2-Column Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3" role="group" aria-label="Sosial mediada paylaşılan məlumatlar">
            {checklistItems.map((item, idx) => {
              const isChecked = checkedItems[idx];
              return (
                <label
                  key={idx}
                  onClick={() => handleToggle(idx)}
                  className={`flex items-start gap-3.5 p-3 rounded-md border transition-colors cursor-pointer select-none ${
                    isChecked
                      ? 'border-[#0F4A38] dark:border-[#2DD4BF] bg-[#0F4A38]/5 dark:bg-[#2DD4BF]/5'
                      : 'border-transparent hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded shrink-0 mt-0.5 border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-[#0F4A38] dark:bg-[#2DD4BF] border-[#0F4A38] dark:border-[#2DD4BF] text-white dark:text-[#0E1116]'
                        : 'border-[#6B635B] dark:border-[#8B949E] bg-white dark:bg-[#0E1116]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm sm:text-[15px] text-[#1A1816] dark:text-[#F0F6FC] leading-snug">
                    {item}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Dynamic Result Gauge */}
          <div className="mt-8 pt-5 border-t border-[#E7E2D9] dark:border-[#252E3B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {countChecked === 0 ? (
                <div className="flex items-center gap-2 text-[#0F4A38] dark:text-[#2DD4BF]">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold">Heç birini seçməmisiniz. Əla, belə davam edin.</span>
                </div>
              ) : countChecked <= 2 ? (
                <div className="flex items-center gap-2 text-[#D97706] dark:text-[#FBBF24]">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold">Bir az məlumat açıqdır. Gizlilik ayarlarınızı yoxlayın.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#DC2626] dark:text-[#F87171]">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold">Çox məlumat açıqdır. Dələduz bunlardan inandırıcı ssenari qura bilər.</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onGoToGuide(4)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline cursor-pointer"
            >
              <span>Sosial şəbəkə bələdçisi</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Part 3: Free Verification Tools */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
              Şübhəli olanda özünüz yoxlayın
            </span>
            <p className="text-sm text-[#6B635B] dark:text-[#8B949E]">
              Bu alətlər pulsuzdur. Onlar yalnız yoxlama üçündür, qərarı siz verirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {toolCards.map((tool, i) => (
              <a
                key={i}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tool.title} — yeni tabda açılır`}
                className="group flex flex-col justify-between p-5 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] hover:border-[#1A1816] dark:hover:border-[#F0F6FC] transition-colors"
              >
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E] block mb-1">
                    {tool.label}
                  </span>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-semibold text-[#1A1816] dark:text-[#F0F6FC]">
                      {tool.title}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-[#6B635B] dark:text-[#8B949E] group-hover:text-[#1A1816] dark:group-hover:text-[#F0F6FC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#6B635B] dark:text-[#8B949E] leading-relaxed mb-4">
                    {tool.desc}
                  </p>
                </div>

                <span className="text-xs font-semibold text-[#0F4A38] dark:text-[#2DD4BF] group-hover:underline inline-flex items-center gap-1">
                  {tool.linkText}
                </span>
              </a>
            ))}
          </div>

          {/* Safety Rule Note */}
          <div className="border-l-[3px] border-[#0F4A38] dark:border-[#2DD4BF] bg-[#F4EFE6]/60 dark:bg-[#151B23] p-4 rounded-r-md border-y border-r border-[#E7E2D9] dark:border-[#252E3B]">
            <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] mb-0.5">
              Qayda
            </span>
            <p className="text-sm font-medium text-[#1A1816] dark:text-[#F0F6FC]">
              Heç bir yoxlama saytına parolunuzu, kart nömrənizi və ya SMS kodunuzu yazmayın.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
