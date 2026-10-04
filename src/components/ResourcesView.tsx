import React from 'react';
import { ArrowUpRight, ArrowRight, Shield, Phone, Globe, CheckCircle2 } from 'lucide-react';

interface ResourcesViewProps {
  onGoToNextTab: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onGoToNextTab }) => {
  const resources = [
    {
      origin: 'Dövlət Hüquq-Mühafizə Orqanı',
      title: 'DİN Kibercinayətkarlıqla Mübarizə Baş İdarəsi',
      desc: 'Bank kartından icazəsiz vəsait çıxarılması, onlayn hədə-qorxu, şantaj və sosial media hesablarının qanunsuz ələ keçirilməsi hallarında rəsmi cinayət işi və təxirəsalınmaz istintaq orqanı.',
      phone: '102',
      phoneLabel: '102 Zəng Mərkəzi',
      url: 'https://mia.gov.az',
      urlText: 'mia.gov.az rəsmi portalı'
    },
    {
      origin: 'Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi',
      title: 'Elektron Təhlükəsizlik Xidməti (CERT.AZ)',
      desc: 'Fərdlər, vətəndaşlar və özəl şirkətlər üçün kiber insidentlərin koordinasiyası, saxta fişinq saytlarının qlobal səviyyədə bloklanması və rəqəmsal gigiyena üzrə milli əlaqələndirici.',
      phone: '1654',
      phoneLabel: '1654 Qaynar Xətt',
      url: 'https://cert.az',
      urlText: 'cert.az rəsmi portalı'
    },
    {
      origin: 'XRİTDX Dövlət Xidməti',
      title: 'Dövlət KİMM Mərkəzi (CERT.GOV.AZ)',
      desc: 'Dövlət informasiya ehtiyatlarının, kritik elektron infrastrukturun və milli şəbəkələrin kiberhücumlardan mühafizəsi, təhlükəsizlik bildirişləri və zəiflik bülletenləri.',
      url: 'https://cert.gov.az',
      urlText: 'cert.gov.az portalı'
    },
    {
      origin: 'Azərbaycan Respublikasının Mərkəzi Bankı',
      title: 'Mərkəzi Bankın İstehlakçı Hüquqları və Nəzarət',
      desc: 'Ölkə daxilində bütün kommersiya banklarının nəzarət orqanı, kart sahiblərinin qanuni hüquqlarının müdafiəsi, saxta investisiya xəbərdarlıqları və rəsmi maliyyə savadlılığı təlimatları.',
      phone: '966',
      phoneLabel: '966 Qaynar Xətt',
      url: 'https://cbar.az',
      urlText: 'cbar.az rəsmi portalı'
    },
    {
      origin: 'Milli Poçt Operatoru',
      title: 'Azərpoçt Rəsmi İzləmə Portalı',
      desc: 'Xaricdən və ya ölkə daxilindən adınıza göndərilən poçt və kuryer bağlamalarının rəsmi izlənməsi (trekinq). Dövlət poçtu heç vaxt ödəniş üçün şübhəli .top və ya .info linkləri göndərmir.',
      phone: '169',
      phoneLabel: '169 Müştəri Xidmətləri',
      url: 'https://azerpost.az',
      urlText: 'azerpost.az rəsmi portalı'
    }
  ];

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF]">
          05 · Rəsmi Qurumlar
        </span>
        <h1
          id="resources-heading"
          tabIndex={-1}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-[1.15] outline-none"
        >
          Dövlət və maliyyə təhlükəsizliyi mərkəzləri
        </h1>
        <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
          Şübhəli vəziyyət, kart sızması və ya kiberdələduzluqla qarşılaşdıqda vaxt itirmədən rəsmi dövlət orqanlarına və bankınıza müraciət edin. Heç bir halda qeyri-rəsmi "pulu geri qaytarırıq" deyən vasitəçilərə inanmayın.
        </p>
      </div>

      {/* Emergency Fast Lines Strip */}
      <div className="p-6 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#151B23]">
        <div className="mb-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] block mb-1">
            Təcili Əlaqə Xətləri
          </span>
          <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#8B949E]">
            Birbaşa zəng vuraraq hadisə barədə dərhal rəsmi məlumat verin:
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="tel:102"
            className="flex items-center gap-2.5 p-3 rounded-md bg-[#FAF9F5] dark:bg-[#0E1116] border border-[#E7E2D9] dark:border-[#252E3B] hover:border-[#0F4A38] dark:hover:border-[#2DD4BF] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171] shrink-0" />
            <div>
              <span className="font-mono text-base font-bold text-[#1A1816] dark:text-[#F0F6FC] block leading-none">
                102
              </span>
              <span className="text-[11px] text-[#6B635B] dark:text-[#8B949E]">Polis / DİN</span>
            </div>
          </a>

          <a
            href="tel:1654"
            className="flex items-center gap-2.5 p-3 rounded-md bg-[#FAF9F5] dark:bg-[#0E1116] border border-[#E7E2D9] dark:border-[#252E3B] hover:border-[#0F4A38] dark:hover:border-[#2DD4BF] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#0F4A38] dark:text-[#2DD4BF] shrink-0" />
            <div>
              <span className="font-mono text-base font-bold text-[#1A1816] dark:text-[#F0F6FC] block leading-none">
                1654
              </span>
              <span className="text-[11px] text-[#6B635B] dark:text-[#8B949E]">CERT.AZ</span>
            </div>
          </a>

          <a
            href="tel:966"
            className="flex items-center gap-2.5 p-3 rounded-md bg-[#FAF9F5] dark:bg-[#0E1116] border border-[#E7E2D9] dark:border-[#252E3B] hover:border-[#0F4A38] dark:hover:border-[#2DD4BF] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#0F4A38] dark:text-[#2DD4BF] shrink-0" />
            <div>
              <span className="font-mono text-base font-bold text-[#1A1816] dark:text-[#F0F6FC] block leading-none">
                966
              </span>
              <span className="text-[11px] text-[#6B635B] dark:text-[#8B949E]">Mərkəzi Bank</span>
            </div>
          </a>

          <a
            href="tel:169"
            className="flex items-center gap-2.5 p-3 rounded-md bg-[#FAF9F5] dark:bg-[#0E1116] border border-[#E7E2D9] dark:border-[#252E3B] hover:border-[#0F4A38] dark:hover:border-[#2DD4BF] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#0F4A38] dark:text-[#2DD4BF] shrink-0" />
            <div>
              <span className="font-mono text-base font-bold text-[#1A1816] dark:text-[#F0F6FC] block leading-none">
                169
              </span>
              <span className="text-[11px] text-[#6B635B] dark:text-[#8B949E]">Azərpoçt</span>
            </div>
          </a>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, i) => (
          <div
            key={i}
            className="flex flex-col justify-between p-6 sm:p-7 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] space-y-4 hover:border-[#1A1816] dark:hover:border-[#F0F6FC] transition-colors"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E] block">
                {res.origin}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-snug">
                {res.title}
              </h3>
              <p className="text-sm text-[#6B635B] dark:text-[#8B949E] leading-relaxed pt-1">
                {res.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E7E2D9] dark:border-[#252E3B] flex flex-wrap items-center justify-between gap-3">
              {res.phone && (
                <a
                  href={`tel:${res.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{res.phoneLabel}</span>
                </a>
              )}
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#1A1816] dark:text-[#F0F6FC] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors ml-auto"
              >
                <span>{res.urlText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Signature Qayda Rule */}
      <div className="border-l-[3px] border-[#0F4A38] dark:border-[#2DD4BF] bg-[#F4EFE6]/60 dark:bg-[#151B23] p-5 rounded-r-md border-y border-r border-[#E7E2D9] dark:border-[#252E3B]">
        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] mb-1">
          Dövlət Qaydası
        </span>
        <p className="text-sm sm:text-base font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-relaxed">
          Heç bir rəsmi dövlət qurumu, polis və ya bank operatoru zəng edərək sizdən kartın arxasındakı 3 rəqəmli CVV kodunu və ya telefonunuza gələn 3D Secure SMS təsdiq kodunu tələb etmir.
        </p>
      </div>

      {/* Next Chapter CTA -> Loops back to Ana Səhifə */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onGoToNextTab}
          className="w-full text-left border-l-[3px] border-[#0F4A38] dark:border-[#2DD4BF] bg-[#FAF9F5] dark:bg-[#151B23] p-4 sm:p-5 rounded-r-md border-y border-r border-[#E7E2D9] dark:border-[#252E3B] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430] transition-colors cursor-pointer group"
        >
          <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#0F4A38] dark:text-[#2DD4BF] mb-1">
            Bələdçinin Sonu
          </span>
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg sm:text-xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
              Növbəti: Ana səhifə →
            </span>
            <ArrowRight className="w-5 h-5 text-[#6B635B] dark:text-[#8B949E] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

    </div>
  );
};
