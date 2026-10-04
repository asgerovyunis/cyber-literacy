import React, { useState } from 'react';
import { ArrowRight, Phone, ShieldAlert, AlertOctagon, Smartphone, CreditCard, MessageSquare } from 'lucide-react';

interface EmergencyViewProps {
  onGoToNextTab: () => void;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({ onGoToNextTab }) => {
  const [activeScenario, setActiveScenario] = useState<'card' | 'whatsapp' | 'apk'>('card');

  const scenarios = [
    {
      id: 'card' as const,
      label: 'Bank kartı məlumatı sızdı',
      icon: CreditCard,
      urgency: 'Dərhal (ilk 5 dəqiqə ərzində)',
      steps: [
        {
          time: '01. Dərhal',
          title: 'Kartı mobil tətbiqdən bloklayın',
          desc: 'Bankınızın mobil tətbiqinə daxil olun (ABB, Birbank, Leobank və s.) və kartın statusunu "Bloklanmış" və ya "Dondurulmuş" vəziyyətə gətirin. Bu, dələduzun pul çıxarmasının dərhal qarşısını alır.'
        },
        {
          time: '02. 5 dəqiqə',
          title: 'Bankın qaynar xəttinə zəng edin',
          desc: 'Bankınızın arxasındakı nömrəyə zəng edin və operatora bildirin: "Kart məlumatlarım saxta səhifəyə daxil edilib, kartı bloklayın və son çıxarılan vəsaitlərə etiraz (chargeback) qeydə alın".'
        },
        {
          time: '03. 1 saat',
          title: 'DİN Kibercinayətkarlıq İdarəsinə müraciət edin',
          desc: '102 Zəng Mərkəzinə zəng edərək və ya yaxınlıqdakı polis bölməsinə yaxınlaşaraq bank çıxarışı və saxta link/mesajın skrinşotları ilə rəsmi ərizə verin.'
        }
      ]
    },
    {
      id: 'whatsapp' as const,
      label: 'WhatsApp / Instagram ələ keçirildi',
      icon: MessageSquare,
      urgency: 'Təcili (ilk 15 dəqiqə ərzində)',
      steps: [
        {
          time: '01. Dərhal',
          title: 'Bütün kontaktlarınıza xəbərdarlıq edin',
          desc: 'Başqa telefon və ya ailə üzvünüzün nömrəsi ilə WhatsApp qruplarınıza və yaxınlarınıza bildirin: "Mənim adımdan borc və ya kod istənilirsə, inanmayın, hesabım ələ keçirilib".'
        },
        {
          time: '02. 5 dəqiqə',
          title: 'WhatsApp-a təkrar SMS kodla daxil olun',
          desc: 'WhatsApp tətbiqini açıb öz nömrənizi yazın və SMS kod tələb edin. Siz daxil olduğunuz an dələduzun kompüterindəki və ya telefonundakı sessiya dərhal qapanır.'
        },
        {
          time: '03. 1 saat',
          title: '2FA PIN kodunu aktivləşdirin',
          desc: 'Daxil olduqdan sonra Parametrlər → Hesab → İki addımlı doğrulama bölməsinə girib 6 rəqəmli unikal PIN kod qurun.'
        }
      ]
    },
    {
      id: 'apk' as const,
      label: 'Şübhəli APK / Fayl quraşdırıldı',
      icon: Smartphone,
      urgency: 'Təxirəsalınmaz (dərhal)',
      steps: [
        {
          time: '01. Dərhal',
          title: 'Telefonu "Uçuş rejimi"nə (Airplane mode) keçirin',
          desc: 'Həm mobil interneti, həm də Wi-Fi-ı dərhal söndürün. İnternet kəsildikdə zərərli tətbiq oğurladığı parolları və SMS-ləri cinayətkarın serverinə ötürə bilmir.'
        },
        {
          time: '02. 10 dəqiqə',
          title: 'Başqa təmiz cihazdan bütün parolları dəyişin',
          desc: 'Kompüterdən və ya ailə üzvünüzün telefonundan e-poçtunuzun və bank tətbiqlərinizin parollarını dərhal dəyişin və "Bütün cihazlardan çıx" seçimini edin.'
        },
        {
          time: '03. 1 saat',
          title: 'Cihazı zavod parametrlərinə (Factory reset) sıfırlayın',
          desc: 'Telefonu tam format edin. Sadəcə faylı silmək kifayət etmir, çünki gizli arxa qapı (trojan) sistem fayllarına yazılmış ola bilər.'
        }
      ]
    }
  ];

  const current = scenarios.find((s) => s.id === activeScenario) || scenarios[0];

  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider bg-[#DC2626]/10 text-[#DC2626] dark:text-[#F87171] border border-[#DC2626]/20">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Böhran Protokolları</span>
        </div>
        <h1
          id="emergency-heading"
          tabIndex={-1}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816] dark:text-[#F0F6FC] leading-[1.15] outline-none"
        >
          Hesabınız və ya vəsaitiniz təhlükədədirsə
        </h1>
        <p className="text-base sm:text-lg text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
          Təşvişə düşməyin. Dələduzluqla qarşılaşdıqda atılacaq ilk 5 dəqiqəlik addımlar zərərin qarşısını 90% hallarda ala bilir.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenarios.map((s) => {
            const Icon = s.icon;
            const isSelected = activeScenario === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScenario(s.id)}
                className={`p-4 rounded-md border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#0F4A38] dark:border-[#2DD4BF] bg-[#0F4A38]/5 dark:bg-[#2DD4BF]/5 font-semibold'
                    : 'border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430]'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? 'text-[#0F4A38] dark:text-[#2DD4BF]' : 'text-[#6B635B] dark:text-[#8B949E]'}`} />
                <div>
                  <span className="text-sm sm:text-[15px] text-[#1A1816] dark:text-[#F0F6FC] block">
                    {s.label}
                  </span>
                  <span className="text-xs text-[#6B635B] dark:text-[#8B949E] block mt-0.5">
                    {s.urgency}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Protocol Steps */}
        <div className="p-6 sm:p-8 rounded-[6px] border border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#151B23] space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7E2D9] dark:border-[#252E3B] pb-4">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
              {current.label} üzrə təlimat
            </h3>
            <span className="text-xs font-mono font-semibold uppercase text-[#DC2626] dark:text-[#F87171]">
              {current.urgency}
            </span>
          </div>

          <div className="space-y-6">
            {current.steps.map((st, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-6 border-b border-[#E7E2D9]/60 dark:border-[#252E3B]/60 last:border-b-0 last:pb-0">
                <span className="text-xs font-mono font-bold text-[#0F4A38] dark:text-[#2DD4BF] bg-[#F2ECE1] dark:bg-[#0E1116] px-2.5 py-1 rounded shrink-0">
                  {st.time}
                </span>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-[#1A1816] dark:text-[#F0F6FC]">
                    {st.title}
                  </h4>
                  <p className="text-sm text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Emergency Contact Cards */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-medium text-[#1A1816] dark:text-[#F0F6FC]">
          Rəsmi Qaynar Xətlər və Əlaqə
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#151B23] space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E]">
              Cinayət Bildirişi
            </span>
            <h4 className="text-base font-semibold text-[#1A1816] dark:text-[#F0F6FC]">
              DİN Kibercinayətkarlıq
            </h4>
            <p className="text-xs text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
              Vəsait oğurluğu və təhdid zamanı 102 Zəng Mərkəzinə və ya polis idarəsinə birbaşa müraciət edin.
            </p>
            <div className="pt-2">
              <a
                href="tel:102"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>102 Zəng Mərkəzi</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#151B23] space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E]">
              Kiber İnsidentlər
            </span>
            <h4 className="text-base font-semibold text-[#1A1816] dark:text-[#F0F6FC]">
              CERT.GOV.AZ (KİMM)
            </h4>
            <p className="text-xs text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
              Dövlət və ictimai resurslara kiber hücumları, fişinq domenlərini bildirmək üçün rəsmi mərkəz.
            </p>
            <div className="pt-2">
              <a
                href="https://cert.gov.az"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline"
              >
                <span>cert.gov.az portalı ↗</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#151B23] space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E]">
              Bank Qaynar Xətləri
            </span>
            <h4 className="text-base font-semibold text-[#1A1816] dark:text-[#F0F6FC]">
              Öz Bankınız
            </h4>
            <p className="text-xs text-[#6B635B] dark:text-[#8B949E] leading-relaxed">
              ABB (937), Kapital Bank (196), Paşa Bank (912), Bank Respublika (144) və digər bankların nömrələri.
            </p>
            <div className="pt-2">
              <span className="text-xs font-medium text-[#6B635B] dark:text-[#8B949E]">
                Kartın arxasındakı nömrəyə zəng vurun
              </span>
            </div>
          </div>
        </div>
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
              Növbəti: Dələduz testi →
            </span>
            <ArrowRight className="w-5 h-5 text-[#6B635B] dark:text-[#8B949E] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

    </div>
  );
};
