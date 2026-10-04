export interface SecurityGuide {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: 'bank' | 'accounts' | 'comms' | 'devices';
  categoryLabel: string;
  howItWorks: string;
  redFlags: string[];
  immediateSteps: string[];
  goldenRule: string;
}

export const GUIDES: SecurityGuide[] = [
  {
    id: 'phishing',
    num: '01',
    title: 'Fişinq və saxta keçidlər (SMS, e-poçt və elanlar)',
    subtitle: 'Poçt bağlaması, bank xəbərdarlığı və ya kommunal borc adı ilə göndərilən tələ linkləri.',
    category: 'comms',
    categoryLabel: 'Rabitə və Mesajlar',
    howItWorks: 'Sizə "Azərpoçt", bankınız və ya vergi xidməti adından təcili mesaj gəlir. Bağlamanın saxlanıldığı və ya kartın bloklandığı iddia edilir. Daxil edilmiş link isə kart məlumatlarınızı və birdəfəlik SMS şifrəni ələ keçirmək üçün qurulmuş saxta nüsxədir.',
    redFlags: [
      'Süni tələskənlik: "12 saat ərzində təsdiqləməsəniz, bağlama geri qayıdacaq!"',
      'Göndərən nömrə adi xarici və ya naməlum şəxsi mobil nömrədir.',
      'Domen adı rəsmi saytın hərflərini dəyişərək saxtalaşdırılıb (məsələn, azerpost-kuryer.info).'
    ],
    immediateSteps: [
      'Mesajdakı heç bir linkə klikləməyin və heç vaxt SMS-lə gələn 3D Secure kodunu ora yazmayın.',
      'Əgər bağlamanız varsa, rəsmi azerpost.az portalına və ya bankın rəsmi tətbiqinə birbaşa daxil olun.',
      'Nömrəni bloklayın və şübhəli keçidi DİN Kibercinayətkarlıqla Mübarizə İdarəsinə bildirin.'
    ],
    goldenRule: 'Heç bir rəsmi dövlət orqanı və ya bank sizə SMS-lə tələsik kart məlumatı doldurmaq üçün link göndərmir.'
  },
  {
    id: 'passwords',
    num: '02',
    title: 'Güclü parollar və etibarlı parol menecerləri',
    subtitle: 'Bütün saytlarda eyni paroldan istifadə etməyin yaratdığı domino effekti.',
    category: 'accounts',
    categoryLabel: 'Hesablar və Parollar',
    howItWorks: 'Köhnə bir forum və ya xidmət sındırıldıqda, oradakı e-poçt və parolunuz sızdırılır. Dələduzlar həmin cütlüyü avtomatik olaraq e-poçtunuzda, bankınızda və sosial şəbəkələrinizdə yoxlayırlar (Credential Stuffing).',
    redFlags: [
      'Bütün hesablar üçün doğum tarixi, ad və ya sadə ardıcıllıqlar (123456, azerbaijan).',
      'Parolun brauzerdə təsadüfi qeyd dəftərçəsində saxlanması.',
      'Saytlardan gələn "Hesabınıza naməlum cihazdan giriş cəhdi" xəbərdarlıqları.'
    ],
    immediateSteps: [
      'Əsas e-poçtunuz üçün tam fərqli, ən azı 14 simvollu unikal parol təyin edin.',
      'Bitwarden, 1Password və ya Apple/Google daxili etibarlı parol menecerinə keçin.',
      'Parollarınızı brauzerlərdə təkrar-təkrar eyni saxlamayın.'
    ],
    goldenRule: 'Bir hesab sındırıldıqda digərlərinin təhlükəsiz qalması üçün hər xidmət unikal parola malik olmalıdır.'
  },
  {
    id: '2fa',
    num: '03',
    title: 'İki mərhələli doğrulama (2FA / MFA)',
    subtitle: 'Parolunuz oğurlansa belə, hesabınızı qoruyan ikinci müdafiə qapısı.',
    category: 'accounts',
    categoryLabel: 'Hesablar və Parollar',
    howItWorks: 'İki mərhələli doğrulama aktiv olduqda, cinayətkar parolunuzu bilsə belə, telefonunuza gələn təsdiq kodu və ya autentifikator tətbiqindəki 6 rəqəm olmadan hesaba daxil ola bilmir.',
    redFlags: [
      'Tanımadığınız halda telefonunuza gələn giriş təsdiq kodları.',
      'Kimsə zəng edib "Sizə səhvən kod göndərdik, onu oxuyun" deyirsə — bu dələduzdur.',
      '2FA qurulmamış e-poçt və WhatsApp hesabları.'
    ],
    immediateSteps: [
      'Gmail, iCloud, WhatsApp və Telegram parametrlərində 2FA-nı dərhal yandırın.',
      'Mümkündürsə, SMS yerinə Google Authenticator və ya Microsoft Authenticator istifadə edin.',
      'Ehtiyat bərpa kodlarını fiziki kağızda yazıb təhlükəsiz yerdə saxlayın.'
    ],
    goldenRule: 'SMS və ya autentifikator kodunu heç kimlə, hətta özünü bank işçisi kimi təqdim edən şəxslə bölüşməyin.'
  },
  {
    id: 'social-engineering',
    num: '04',
    title: 'Sosial mühəndislik və saxta telefon zəngləri',
    subtitle: '"Bankın təhlükəsizlik xidmətindən zəng edirik" və "Qohumunuz qəzaya düşüb" ssenariləri.',
    category: 'comms',
    categoryLabel: 'Rabitə və Mesajlar',
    howItWorks: 'Sosial mühəndislik texnologiyanı deyil, insan emosiyalarını hədəf alır. Qorxu, tələskənlik və ya hörmət hisslərindən sui-istifadə edərək sizi təcili pul köçürməyə və ya kart məlumatlarınızı verməyə vadar edirlər.',
    redFlags: [
      'Zəng edən şəxs arxa fondan səs-küy gələn mühitdə təcili tədbir tələb edir.',
      'Sizdən kartın arxasındakı CVV kodu və ya SMS-lə indicə gələn təsdiq şifrəsi istənilir.',
      'Deyirlər ki, "Pulu təcili təhlükəsiz hesaba köçürün, yoxsa bloklanacaq".'
    ],
    immediateSteps: [
      'Dərhal dəstəyi asın. Heç vaxt zəng edənin göstərişi ilə pul köçürməyin.',
      'Bankınızın arxasındakı rəsmi nömrəyə özünüz birbaşa zəng edib vəziyyəti dəqiqləşdirin.',
      'Qohumunuzla bağlı zəngdirsə, həmin qohumun öz nömrəsinə birbaşa zəng vurun.'
    ],
    goldenRule: 'Bank əməkdaşları heç vaxt sizdən CVV kodunu, parolu və ya SMS kodunu tələb etməz.'
  },
  {
    id: 'whatsapp-scams',
    num: '05',
    title: 'WhatsApp və sosial şəbəkə fırıldaqları',
    subtitle: 'Hesab oğurluğu, qohum adından borc istəmə və süni intellektlə səs təqlidi.',
    category: 'comms',
    categoryLabel: 'Rabitə və Mesajlar',
    howItWorks: 'Dələduz dostunuzun və ya tanışınızın WhatsApp hesabını ələ keçirir, sonra kontakt siyahısındakı hər kəsə "Təcili 100 AZN lazımdır, sabah qaytaracam" mesajı və ya saxta səs yazısı göndərir.',
    redFlags: [
      'Yaxın adamınız qəfil qeyri-adi tərzdə mesaj yazıb təcili yad karta pul istəyir.',
      'Sizə "Səsvermədə uşağıma səs ver" və ya "Hədiyyə qazan" linki atılır.',
      'WhatsApp-da "Hesabınız yoxlanılır, kodu deyin" bildirişi.'
    ],
    immediateSteps: [
      'Pulu köçürməzdən əvvəl həmin şəxsə adi mobil şəbəkə ilə zəng edib səsini eşidin.',
      'WhatsApp parametrlərində "Bağlı cihazlar" bölməsini yoxlayıb yad sessiyaları bağlayın.',
      'WhatsApp üçün 6 rəqəmli PIN kod (iki addımlı doğrulama) təyin edin.'
    ],
    goldenRule: 'Heç vaxt yalnız mesajla gələn tələb əsasında yad hesaba pul köçürməyin.'
  },
  {
    id: 'banking',
    num: '06',
    title: 'Bank kartı və onlayn ödəniş təhlükəsizliyi',
    subtitle: 'CVV kodu, 3D Secure və onlayn alış-verişdə kart məlumatlarının qorunması.',
    category: 'bank',
    categoryLabel: 'Ödəniş və Bank',
    howItWorks: 'Elan saytlarında (məsələn, Tap.az və ya Lalafo) mal satdığınız zaman alıcı cildində olan dələduz "Pulu kartınıza köçürürəm" deyərək saxta kuryer səhifəsi göndərir və kartınızın bütün detallarını ora daxil etməyinizi istəyir.',
    redFlags: [
      'Pulu almaq üçün sizdən kartın arxasındakı CVV kodu və ya istifadə müddəti tələb olunur.',
      'SMS-də "Ödəniş" sözü yazdığı halda, qarşı tərəf "Bu sadəcə təsdiqdir" deyir.',
      'Ödəniş səhifəsi rəsmi bankın deyil, şübhəli xarici domenin üzərində qurulub.'
    ],
    immediateSteps: [
      'Pulu qəbul etmək üçün qarşı tərəfə YALNIZ 16 rəqəmli kart nömrəsi bəs edir (və ya IBAN).',
      'Onlayn alış-veriş üçün əsas kartınızı yox, daxilində yalnız lazım olan məbləğ saxlanılan rəqəmsal (virtual) kart istifadə edin.',
      'Bank tətbiqindən onlayn əməliyyat limitlərini tənzimləyin.'
    ],
    goldenRule: 'Heç kim sizə pul köçürmək üçün kartınızın CVV kodunu və ya SMS təsdiq kodunu bilməməlidir.'
  },
  {
    id: 'devices',
    num: '07',
    title: 'Cihaz yenilənmələri və zərərli tətbiqlər (APK)',
    subtitle: 'Telegram və ya WhatsApp vasitəsilə göndərilən "Şəkil.apk" tələsi.',
    category: 'devices',
    categoryLabel: 'Cihazlar və Təhlükəsizlik',
    howItWorks: 'Dələduzlar "Fotoşəkilləriniz", "Dövlət yardımı" və ya "Yol polisi cəriməsi" adı altında Android istifadəçilərinə APK faylları göndərirlər. Bu fayl quraşdırıldıqda telefondakı SMS-ləri oxuyur və bank hesabını boşaldır.',
    redFlags: [
      'Mesajda göndərilən faylın sonu ".apk" ilə bitir.',
      'Telefon "Naməlum mənbələrdən quraşdırmaya icazə verin" xəbərdarlığı çıxarır.',
      'Sistem və təhlükəsizlik yenilənmələrinin aylarla təxirə salınması.'
    ],
    immediateSteps: [
      'Heç vaxt mesajlaşma proqramlarından göndərilən proqram və faylları telefona quraşdırmayın.',
      'Yalnız rəsmi Google Play Store və ya Apple App Store mağazalarından istifadə edin.',
      'Telefonun əməliyyat sistemini dərhal sonuncu versiyaya yeniləyin.'
    ],
    goldenRule: 'Şəkil, video və ya sənəd heç vaxt .apk uzantısı ilə gəlmir. Belə faylı açmayın.'
  },
  {
    id: 'family',
    num: '08',
    title: 'Ailə və yaşlı nəslin rəqəmsal qorunması',
    subtitle: 'Valideynləri və nənə-babaları pensiya və sosial yardım tələlərindən qorumaq.',
    category: 'accounts',
    categoryLabel: 'Hesablar və Parollar',
    howItWorks: 'Yaşlı insanlar adətən rəsmi dövlət orqanlarının və ya bankların adından istifadə edən dələduzlara daha tez inanırlar. Onlara "Pensiyanıza 150 AZN əlavə olunub" zəngi edilir və kart məlumatları alınır.',
    redFlags: [
      'Sosial şəbəkələrdə dövlət atributları ilə bəzədilmiş saxta "Kompensasiya fondu" videoları.',
      'Valideyninizin telefonuna qəfil daxil olan ardıcıl bank SMS-ləri.',
      'Yaşlı qohumunuzun təşvişlə bankomat axtarması.'
    ],
    immediateSteps: [
      'Ailə böyükləri ilə açıq söhbət aparın: "Sizə kimsə pul və ya kod üçün zəng etsə, əvvəlcə mənə deyin".',
      'Onların telefonunda bank kartının gündəlik nağdlaşdırma və onlayn ödəniş limitini aşağı salın.',
      'Onların vacib hesablarına 2FA təhlükəsizlik açarını özünüz qurun.'
    ],
    goldenRule: 'Ailə daxilində "Təcili kod sözü" təyin edin: qəribə zəng gələndə həmin sözü soruşsunlar.'
  },
  {
    id: 'wifi',
    num: '09',
    title: 'İctimai Wi-Fi və açıq şəbəkə riskləri',
    subtitle: 'Kafedə, hava limanında və parklarda şifrəsiz internetdən istifadə qaydaları.',
    category: 'devices',
    categoryLabel: 'Cihazlar və Təhlükəsizlik',
    howItWorks: 'Hakerlər ictimai məkanlarda "Free_Airport_WiFi" və ya "Cafe_Guest" adlı saxta eyni adlı şəbəkələr quraraq həmin şəbəkəyə qoşulan istifadəçilərin internet trafikini və şifrələrini dinləyirlər (Man-in-the-Middle).',
    redFlags: [
      'Şəbəkəyə qoşularkən sizdən Google və ya sosial şəbəkə parolu ilə giriş tələb edilir.',
      'Brauzer "Təhlükəsizlik sertifikatı etibarsızdır" xəbərdarlığı verir.',
      'Açıq Wi-Fi zamanı bank tətbiqinə daxil olmaq.'
    ],
    immediateSteps: [
      'İctimai şəbəkələrə qoşulduqda bank əməliyyatları etməyin; mobil internetinizdən (LTE/5G) istifadə edin.',
      'Cihazınızda "Avtomatik Wi-Fi şəbəkələrinə qoşul" parametrini söndürün.',
      'Zərurət olduqda etibarlı VPN xidmətindən istifadə edin.'
    ],
    goldenRule: 'Maliyyə və vacib hesablar üçün ictimai Wi-Fi əvəzinə həmişə öz şəxsi mobil internetinizə üstünlük verin.'
  }
];
