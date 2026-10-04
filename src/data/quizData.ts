export interface QuizQuestion {
  id: number;
  situation: string;
  source: string;
  context: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  verdict: string;
  securityClue: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    situation: 'Tap.az-da divan satırsınız. Alıcı WhatsApp-la yazır: "Mən Qubadayam, kuryerlə göndərin. Pulu kartınıza göndərmişəm, bu linkə daxil olub pulu qəbul edin."',
    source: 'Elan Saytları & Kuryer Fırıldağı',
    context: 'Link: azerpost-kuryer-odenis.info/qebul-et?id=83921',
    options: [
      {
        text: 'Linkə daxil olub kartımın 16 rəqəmini və arxasındakı 3 rəqəmli CVV kodunu yazmalıyam ki, pul otursun.',
        isCorrect: false,
        explanation: 'Kartınıza pul qəbul etmək üçün heç vaxt CVV kodu və ya istifadə müddəti tələb olunmur. Bu link kartınızdakı bütün pulu oğurlamaq üçündür.'
      },
      {
        text: 'Bu dələduzluqdur. Pulu qəbul etmək üçün alıcıya yalnız 16 rəqəmli kart nömrəsi və ya IBAN bəs edir; heç bir linkə kart detalları yazılmır.',
        isCorrect: true,
        explanation: 'Tamamilə doğrudur! Heç bir poçt və ya kuryer xidməti satıcıdan pulu almaq üçün kartın CVV kodunu tələb etmir.'
      },
      {
        text: 'Linkə girib SMS-lə gələn 3D Secure kodunu təsdiqləməliyəm.',
        isCorrect: false,
        explanation: '3D Secure kodu yalnız kartdan pul çıxarılanda gəlir. Həmin kodu daxil etsəniz, vəsaitiniz dərhal silinəcək.'
      }
    ],
    verdict: 'Klassik kuryer linki tələsi',
    securityClue: 'Alıcı satıcıya pul köçürərkən satıcı heç vaxt kuryer linkində CVV və ya SMS kodu daxil etmir.'
  },
  {
    id: 2,
    situation: 'SMS gəlir: "Azərpoçt: Xaricdən gələn bağlamanızın ünvanı natamamdır. 12 saat ərzində linkə keçib 2.30 AZN kuryer haqqı ödəyin, yoxsa geri qayıdacaq."',
    source: 'Saxta SMS & Poçt Bildirişi',
    context: 'Göndərən: +994 51 839 20 11 | Link: azerpoct-dhl-servis.top',
    options: [
      {
        text: 'Məbləğ azdır (2.30 AZN), ona görə tez ödəyim ki, bağlamam qayıtmasın.',
        isCorrect: false,
        explanation: 'Dələduzların məqsədi 2.30 AZN deyil, həmin saxta səhifədə kartınızın bütün balansını boşaltmaq üçün məlumatlarınızı ələ keçirməkdir.'
      },
      {
        text: 'Bu saxta mesajdır. Dövlət poçtu şəxsi mobil nömrədən və ya .top domenindən SMS göndərmir. Bağlamanı yalnız rəsmi azerpost.az saytında yoxlayaram.',
        isCorrect: true,
        explanation: 'Düzgün addım! Rəsmi orqanlar heç vaxt naməlum xarici domenlərdən SMS linkləri göndərmir.'
      },
      {
        text: 'Mesaja "Mən heç nə sifariş etməmişəm" yazıb cavab verərəm.',
        isCorrect: false,
        explanation: 'Spam SMS-ə cavab yazmaq nömrənizin aktiv olduğunu təsdiqləyir və dələduzların təkrar hücumlarına yol açır.'
      }
    ],
    verdict: 'Kütləvi bağlama fişinqi',
    securityClue: 'Azərpoçtun rəsmi domeni azerpost.az-dır. Heç vaxt şəxsi mobil nömrədən .info/.top domenli SMS gəlmir.'
  },
  {
    id: 3,
    situation: 'Yaxın dostunuzdan WhatsApp-da səsli mesaj gəlir (onun öz səsinə çox oxşayır): "Salam qardaş, yoldayam təcili 150 AZN lazımdır, bu karta at, axşam görüşəndə verəcəm."',
    source: 'WhatsApp Hesab Oğurluğu & Səs Təqlidi',
    context: 'Təqdim edilən kart: Naməlum şəxs adına kart hesabı',
    options: [
      {
        text: 'Dostumun səsidir, ona görə dərhal deyilən karta 150 AZN göndərərəm.',
        isCorrect: false,
        explanation: 'Süni intellekt vasitəsilə 3 saniyəlik səs nümunəsindən istənilən adamın səsini təqlid etmək mümkündür. Dostunuzun WhatsApp-ı ələ keçirilmiş ola bilər.'
      },
      {
        text: 'Pulu göndərməzdən əvvəl dostuma birbaşa adi mobil zəng edib vəziyyəti dəqiqləşdirərəm.',
        isCorrect: true,
        explanation: 'Mükəmməl! Həmişə təcili pul istəklərini ikinci müstəqil rabitə kanalı (adi telefon zəngi) ilə təsdiqləmək lazımdır.'
      },
      {
        text: 'WhatsApp-da yazıb soruşaram ki, "Düz doğrudan da sənsən?"',
        isCorrect: false,
        explanation: 'WhatsApp hesabı artıq dələduzun əlindədirsə, təbii ki, o sizə "bəli, mənəm" deyə cavab verəcək.'
      }
    ],
    verdict: 'Şəxsiyyət təqlidi və profil ələ keçirilməsi',
    securityClue: 'Təcili borc istənilən zaman həmişə şəxsin öz nömrəsinə adi mobil şəbəkə ilə zəng edin.'
  },
  {
    id: 4,
    situation: 'Zəng gəlir: "Bankın Təhlükəsizlik Xidmətindən narahat edirik. Kartınızdan Rusiyada 400 AZN şübhəli əməliyyat keçir. Bloklamaq üçün indicə SMS-lə gələn 6 rəqəmi deyin."',
    source: 'Telefon Zəngi ilə Bank Dələduzluğu (Vishing)',
    context: 'Zəng edən: +994 12 404 XX XX (şəhər nömrəsinə bənzədilib)',
    options: [
      {
        text: 'Tələsik 6 rəqəmli kodu deyərəm ki, 400 AZN çıxılmasın.',
        isCorrect: false,
        explanation: 'Həmin 6 rəqəmli kod sizin kartınızdan pul çıxarılması üçün gələn 3D Secure təsdiq kodudur. Kodu dediyiniz an vəsaitiniz oğurlanır.'
      },
      {
        text: 'Zəngi dərhal sonlandırıram. Bankımın arxasındakı rəsmi qaynar xətt nömrəsinə özüm birbaşa zəng edib kartımı yoxlayıram.',
        isCorrect: true,
        explanation: 'Ən təhlükəsiz addım! Bank heç vaxt müştəridən SMS şifrəsini və ya CVV kodunu istəmir.'
      },
      {
        text: 'Zəng edəndən bank vəsiqəsinin şəklini WhatsApp-la göndərməsini tələb edərəm.',
        isCorrect: false,
        explanation: 'Dələduzlar asanlıqla saxta bank vəsiqələri və loqotipli saxta sənədlər hazırlayıb sizə ata bilərlər.'
      }
    ],
    verdict: 'Saxta bank təhlükəsizlik zəngi',
    securityClue: 'Bank heç bir halda sizdən SMS kodunu və ya kartın arxasındakı 3 rəqəmi soruşmur.'
  },
  {
    id: 5,
    situation: 'Instagram-da sponsorlu video reklam: "Dövlət Neft Fondu vətəndaşlara investisiya imkanı yaradır. 250 AZN yatırın, həftəlik 1800 AZN dividend alın."',
    source: 'Saxta İnvestisiya Platforması',
    context: 'Videoda tanınmış televiziya aparıcısının süni intellektlə dəyişdirilmiş videosu (Deepfake) istifadə olunur.',
    options: [
      {
        text: 'Tanınmış aparıcı danışırsa, deməli rəsmidir. Qeydiyyatdan keçib kartımdan 250 AZN ödəyərəm.',
        isCorrect: false,
        explanation: 'Bu "Deepfake" texnologiyası ilə hazırlanmış saxta videodur. Dövlət qurumları heç vaxt belə qeyri-real gəlir vədləri vermir.'
      },
      {
        text: 'Bu saxtakarlıqdır. Şübhəli elanı şikayət edərəm və heç bir şəxsi məlumat daxil etmərəm.',
        isCorrect: true,
        explanation: 'Düzgün! Əsassız yüksək gəlir vəd edən bütün belə reklamlar maliyyə piramidası və dələduzluqdur.'
      },
      {
        text: 'Əvvəlcə 20 AZN yatırıb yoxlayaram ki, görüm həqiqətən pul gəlir, ya yox.',
        isCorrect: false,
        explanation: 'Bəzən etimad qazanmaq üçün ilk cüzi məbləği qaytarırlar ki, sonra daha böyük məbləği mənimsəsinlər.'
      }
    ],
    verdict: 'Saxta dövlət investisiya tələsi',
    securityClue: 'Həftəlik qeyri-real yüksək gəlir vəd edən bütün "fond" və "investisiya" elanları fırıldaqdır.'
  },
  {
    id: 6,
    situation: 'Facebook-da paylaşım: "Prezidentin yeni fərmanı ilə hər ailəyə 300 AZN birdəfəlik yardım ayrıldı. Yardımı almaq üçün kartınızı təsdiqləyin."',
    source: 'Sosial Yardım Fişinqi',
    context: 'Açılan səhifədə dövlət gerbi var və kart nömrəsi, bitmə tarixi, CVV və balans soruşulur.',
    options: [
      {
        text: 'Dövlət yardımı olduğuna görə kart məlumatlarımı və balansımı yazıram.',
        isCorrect: false,
        explanation: 'Dövlət heç vaxt yardım vermək üçün vətəndaşdan CVV kodu və ya kart balansı istəmir.'
      },
      {
        text: 'Bu fişinqdir. Rəsmi dövlət yardımları yalnız e-sosial.az portalında və rəsmi xəbər agentliklərində elan olunur.',
        isCorrect: true,
        explanation: 'Əla müşahidə! Bütün rəsmi sosial yardımlar yalnız rəsmi dövlət portallarında təsdiqlənir.'
      },
      {
        text: 'Balansı sıfır olan köhnə kartımın məlumatlarını yazaram ki, pul gəlsin.',
        isCorrect: false,
        explanation: 'Həmin kart aktivdirsə, gələcəkdə ora daxil olan istənilən vəsait dələduzlar tərəfindən dərhal çəkiləcək.'
      }
    ],
    verdict: 'Saxta sosial yardım tələsi',
    securityClue: 'Dövlət yardım köçürmək üçün sizdən kartın CVV kodunu və ya SMS təsdiqini tələb etməz.'
  },
  {
    id: 7,
    situation: 'Telegram-da iş təklifi: "Gündə 1 saat TikTok videolarını bəyənməklə 40-80 AZN qazan. Başlamaq üçün 15 AZN qeydiyyat rüsumu ödəyin."',
    source: 'Saxta Məşğulluq & Tapşırıq Tələsi',
    context: 'Deyirlər ki, 15 AZN sistemdə şəxsi kabinet açmaq üçündür və dərhal geri qayıdacaq.',
    options: [
      {
        text: '15 AZN çox pul deyil, ödəyib işə başlayaram.',
        isCorrect: false,
        explanation: 'Bu klassik tapşırıq fırıldağıdır. Sizdən hər addımda daha çox "depozit" tələb edəcək və heç bir qazanc verməyəcəklər.'
      },
      {
        text: 'Heç bir real işəgötürən işçidən işləmək üçün əvvəlcədən pul tələb etmir. Bu fırıldaqdır, imtina edərəm.',
        isCorrect: true,
        explanation: 'Doğrudur! Heç bir ciddi şirkət iş təklifi müqabilində naməlum şəxsə depozit ödətdirmir.'
      },
      {
        text: 'Əvvəlcə pulsuz sınaq tapşırığı istəyərəm.',
        isCorrect: false,
        explanation: 'Dələduzlar sınaq tapşırığı verib sizdə güvən yaradacaq, sonra daha böyük məbləğ tələb edəcəklər.'
      }
    ],
    verdict: 'Saxta onlayn iş və depozit tələsi',
    securityClue: 'İşləmək üçün sizdən pul tələb edən hər bir təklif 100% dələduzluqdur.'
  },
  {
    id: 8,
    situation: 'Hava limanında və ya kafedə oturmusunuz. Şifrəsiz Wi-Fi şəbəkəsinə qoşularkən səhifə açılır: "Davam etmək üçün Google və ya Instagram parolunuzu daxil edin."',
    source: 'Təhlükəli İctimai Wi-Fi & Məlumat Tutma',
    context: 'Şəbəkə adı: FREE_AIRPORT_WIFI_FAST',
    options: [
      {
        text: 'İnternet lazımdır, ona görə Google parolumu yazıb daxil oluram.',
        isCorrect: false,
        explanation: 'Bu saxta şəbəkədir (Evil Twin). Şifrənizi daxil etdiyiniz an o hakerin bazasına düşür.'
      },
      {
        text: 'İctimai Wi-Fi heç vaxt şəxsi hesab parolunu tələb etmir. Şəbəkədən dərhal çıxıb öz mobil internetimi yandıraram.',
        isCorrect: true,
        explanation: 'Düzgün seçim! Qanuni Wi-Fi yalnız telefon nömrəsi və ya SMS təsdiq istəyə bilər, əsla hesab şifrəsi yox.'
      },
      {
        text: 'Parolu yazıb daxil olaram, amma sonra parolu dəyişərəm.',
        isCorrect: false,
        explanation: 'Siz parolu dəyişənə qədər haker artıq hesabınıza daxil olub 2FA-nı dəyişə bilər.'
      }
    ],
    verdict: 'Saxta Wi-Fi giriş portalı',
    securityClue: 'Heç vaxt ictimai internetə qoşulmaq üçün e-poçt və ya sosial şəbəkə parollarınızı daxil etməyin.'
  },
  {
    id: 9,
    situation: 'E-poçtunuza məktub gəlir: "Təhlükəsizlik xidməti: Hesabınızda şübhəli fəaliyyət aşkarlandı. 24 saat ərzində parolu yeniləməsəniz, bütün məlumatlarınız silinəcək."',
    source: 'E-poçt Fişinqi & Hesab Ələ Keçirmə',
    context: 'Göndərən ünvanı: security-support@mail-update-google-secure.net',
    options: [
      {
        text: 'Məktubdakı qırmızı "Parolu yenilə" düyməsinə klikləyib yeni parol yazaram.',
        isCorrect: false,
        explanation: 'Açılan səhifə saxta Google səhifəsidir. Köhnə və yeni parolu ora yazsanız, hesabınızı itirəcəksiniz.'
      },
      {
        text: 'Göndərənin ünvanına baxıram: rəsmi google.com deyil. Məktubdakı linkə klikləmirəm, birbaşa rəsmi myaccount.google.com-dan yoxlayıram.',
        isCorrect: true,
        explanation: 'Mükəmməl kibersavadlılıq! Həmişə göndərənin tam e-poçt ünvanını yoxlamaq lazımdır.'
      },
      {
        text: 'Məktubu dostuma yönləndirib soruşaram ki, onda da belə olub?',
        isCorrect: false,
        explanation: 'Zərərli e-poçtları başqalarına yönləndirmək onların da təsadüfən linkə klikləməsinə səbəb ola bilər.'
      }
    ],
    verdict: 'E-poçt fişinq hücumu',
    securityClue: 'Hesab xəbərdarlıqlarını məktubdakı linklə deyil, brauzerdə rəsmi sayta birbaşa daxil olaraq yoxlayın.'
  },
  {
    id: 10,
    situation: 'Sosial şəbəkədə xaricdə yaşayan cəlbedici bir şəxs sizinlə tanış olur. 2 həftə çox mehriban ünsiyyətdən sonra deyir: "Gömrüklə sənə bahalı hədiyyə göndərmişəm, amma 60 AZN rüsum qalıb, onu ödə."',
    source: 'Romantik Dələduzluq (Romance Scam)',
    context: 'Şəxs real görüşməkdən və ya videozəngdən müxtəlif bəhanələrlə boyun qaçırır.',
    options: [
      {
        text: 'O qədər səmimi danışdıqdan sonra yalan deməz. 60 AZN-i göndərərəm.',
        isCorrect: false,
        explanation: 'Bu dünya üzrə ən çox yayılmış romantik dələduzluqdur. Şəkillər internetdən oğurlanıb, bağlama isə ümumiyyətlə mövcud deyil.'
      },
      {
        text: 'Şəxsin profil şəkillərini Google və ya TinEye ilə yoxlayıram, heç bir pul göndərmirəm və istifadəçini bloklayıram.',
        isCorrect: true,
        explanation: 'Dəqiq addım! Real həyatda görmədiyiniz onlayn tanışlara heç vaxt pul, hədiyyə rüsumu və ya yol xərci göndərməyin.'
      },
      {
        text: 'Deyərəm ki, bağlama gəlsin, pulu özüm kuryerə nağd ödəyərəm.',
        isCorrect: false,
        explanation: 'Dələduz sizə saxta "kuryer şirkəti" nömrəsindən zəng etdirib yenə də kartla əvvəlcədən ödəniş tələb edəcək.'
      }
    ],
    verdict: 'Romantik etimad sui-istifadəsi',
    securityClue: 'Şəxsən tanımadığınız internet tanışına heç vaxt heç bir ad altında vəsait göndərməyin.'
  }
];
