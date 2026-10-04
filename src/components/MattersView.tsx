import React from 'react';
import { ArrowRight, AlertCircle, TrendingUp, RotateCcw } from 'lucide-react';

interface MattersViewProps {
  onGoToNextTab: () => void;
}

export const MattersView: React.FC<MattersViewProps> = ({ onGoToNextTab }) => {
  const pillars = [
    {
      num: '01',
      title: 'Hədəf konkret siz deyilsiniz, hər kəsin vəsaitidir',
      desc: 'Dələduzlar adətən kiməsə qarşı şəxsi qisas almır. Avtomatlaşdırılmış botlar vasitəsilə gündəlik on minlərlə nömrəyə SMS və mesaj göndərirlər. 10,000 nəfərdən cəmi 5 nəfərin tələyə düşməsi cinayətkar şəbəkəyə böyük gəlir gətirmək üçün kifayətdir.'
    },
    {
      num: '02',
      title: 'Ən zəif halqa texnologiya deyil, tələsik insan emosiyasıdır',
      desc: 'Müasir bank sistemlərini birbaşa sındırmaq demək olar ki, qeyri-mümkündür. Ona görə də cinayətkarlar texnologiyanı deyil, insanı aldadırlar: qorxu ("Kartınız bloklandı"), tələskənlik ("12 saat ərzində") və ya tamah ("Dividend qazandınız") hisslərini qəfil işə salırlar.'
    },
    {
      num: '03',
      title: 'Vəsait çıxdıqdan sonra bərpa etmək olduqca çətindir',
      desc: 'Vəsait başqa karta ötürüldüyü an saniyələr ərzində kriptovalyutalara və ya xarici elektron pul kisələrinə yönləndirilir. Bank və ya polis cinayəti araşdırana qədər zəncir uzanır. 5 saniyə dayanıb düşünmək aylarla davam edən hüquqi proseslərdən 100 dəfə effektivdir.'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Tələ Mesajı və ya Zəng',
      detail: 'Azərpoçt, Tap.az kuryeri və ya Bank Təhlükəsizliyi adından inandırıcı mesaj daxil olur.'
    },
    {
      step: '2',
      title: 'Emosional Təzyiq və Tələskənlik',
      detail: '"10 dəqiqə ərzində etməsəniz, cərimə yazılacaq və ya pulunuz batacaq" deyərək düşünməyə vaxt vermirlər.'
    },
    {
      step: '3',
      title: 'Saxta Link və Məlumat Sızması',
      detail: 'Açılan saxta səhifəyə kartın 16 rəqəmi, CVV və SMS təsdiq kodu daxil edilir.'
    },
    {
      step: '4',
      title: 'Vəsaitin Ani Çıxarılması',
      detail: 'SMS təsdiq kodu daxil edildiyi an vəsait xarici köçürmə və ya kriptovalyuta ilə nağdlaşdırılır.'
    }
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
          01 · Niyə Vacibdir
        </span>
        <h1
          id="matters-heading"
          tabIndex={-1}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-[1.15] outline-none"
        >
          Niyə hər kəs hədəfdədir?
        </h1>
        <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
          "Mənim kartımda çox pul yoxdur, mənə kimsə toxunmaz" fikri ən böyük xətadır. Kibercinayətkarlar üçün hər bir aktiv nömrə və bank kartı potensial gəlir mənbəyidir.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="p-6 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] space-y-3"
          >
            <span className="text-xs font-mono font-bold text-[#0F4A38] dark:text-[#2DD4BF]">
              Prinsip {p.num}
            </span>
            <h3 className="font-serif text-xl font-semibold text-[#1A1816] dark:text-[#F0F6FC] leading-snug">
              {p.title}
            </h3>
            <p className="text-sm text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Anatomy of an Attack Timeline */}
      <div className="p-6 sm:p-8 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#151B23] space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
            Hücumun Anatomiyası
          </span>
          <h2 className="font-serif text-2xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
            Dələduzluq sxemi necə həyata keçirilir?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="p-4 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#0E1116] space-y-2 relative"
            >
              <div className="w-6 h-6 rounded-full bg-[#0F4A38] dark:bg-[#2DD4BF] text-white dark:text-[#0E1116] font-mono text-xs font-bold flex items-center justify-center">
                {s.step}
              </div>
              <h4 className="text-sm font-semibold text-[#1A1816] dark:text-[#F0F6FC]">
                {s.title}
              </h4>
              <p className="text-xs text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Chapter CTA ("Qayda" Style) */}
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
              Növbəti: Əsas bələdçilər →
            </span>
            <ArrowRight className="w-5 h-5 text-[#6B635B] dark:text-[#8B949E] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

    </div>
  );
};
