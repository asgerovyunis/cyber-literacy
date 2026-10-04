export interface GlossaryTerm {
  term: string;
  category: 'threat' | 'defense' | 'concept';
  categoryLabel: string;
  definition: string;
  plainAnalogy: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Fişinq (Phishing)',
    category: 'threat',
    categoryLabel: 'Təhlükə Növü',
    definition: 'Cinayətkarların etibarlı qurum (bank, poçt, dövlət orqanı) adı altında saxta mesaj, e-poçt və ya veb-sayt vasitəsilə parollarınızı və kart məlumatlarınızı oğurlamaq cəhdi.',
    plainAnalogy: 'Balıq tilovuna bənzəyir: dələduz parlaq və cəlbedici bir yem (saxta elan və ya həyəcanlı SMS) atır ki, siz diqqətsizcə linkə daxil olasınız.'
  },
  {
    term: 'İki Mərhələli Doğrulama (2FA)',
    category: 'defense',
    categoryLabel: 'Müdafiə Mexanizmi',
    definition: 'Hesaba daxil olarkən paroldan əlavə ikinci bir təsdiq vasitəsinin (telefon kodu, autentifikator tətbiqi və ya barmaq izi) tələb olunması.',
    plainAnalogy: 'Evin qapısında iki fərqli qıfılın olması kimidir: oğru birinci açarı (parolu) tapsa belə, ikinci qıfıl (SMS kodu) olmadan içəri girə bilməz.'
  },
  {
    term: 'CVV / CVC Kodu',
    category: 'concept',
    categoryLabel: 'Bank Təhlükəsizliyi',
    definition: 'Bank kartının arxa hissəsində yerləşən 3 rəqəmli xüsusi təhlükəsizlik şifrəsi. Kartın fiziki olaraq yanınızda olduğunu təsdiqləyir.',
    plainAnalogy: 'Kartınızın gizli möhrü kimidir. Sizə kimsə pul göndərəndə bu kod qətiyyən lazım deyil; o yalnız kartdan pul çıxarılanda istifadə edilir.'
  },
  {
    term: 'Sosial Mühəndislik (Social Engineering)',
    category: 'threat',
    categoryLabel: 'Təhlükə Növü',
    definition: 'Kompüter sistemlərini sındırmaq əvəzinə, insanın təbii hisslərini (qorxu, tələskənlik, etimad, tamah) manipulyasiya edərək məlumat almaq sənəti.',
    plainAnalogy: 'Qapını sındırmayıb, özünü usta və ya qonşu kimi təqdim edərək sizin öz əlinizlə qapını açmağınıza nail olmaqdır.'
  },
  {
    term: 'Parol Meneceri (Password Manager)',
    category: 'defense',
    categoryLabel: 'Müdafiə Mexanizmi',
    definition: 'Bütün hesablarınız üçün mürəkkəb, unikal parollar yaradan və onları şifrələnmiş təhlükəsiz yaddaşda saxlayan rəqəmsal proqram.',
    plainAnalogy: 'Cibinizdəki tək bir açarla açılan, daxilində isə yüzlərlə fərqli seyfin unikal açarları olan möhkəm seyf kimidir.'
  },
  {
    term: '3D Secure (Təsdiq SMS-i)',
    category: 'defense',
    categoryLabel: 'Bank Təhlükəsizliyi',
    definition: 'Onlayn ödəniş zamanı bankın telefonunuza göndərdiyi birdəfəlik 6 rəqəmli əməliyyat təsdiq kodu.',
    plainAnalogy: 'Bank kassirinin sizə baxıb "Həqiqətən bu pulu siz köçürürsünüz?" deyə soruşduğu son təsdiq pilləsidir.'
  },
  {
    term: 'Zərərli Proqram (Malware & Spyware)',
    category: 'threat',
    categoryLabel: 'Təhlükə Növü',
    definition: 'Cihazınıza icazəsiz daxil olan, klaviaturada yazdıqlarınızı, SMS-ləri və parolları gizlicə cinayətkara ötürən virus və tətbiqlər.',
    plainAnalogy: 'Evinizə xəbəriniz olmadan yerləşdirilmiş gizli mikrofon və ya dinləmə cihazı kimidir.'
  },
  {
    term: 'VPN (Virtual Private Network)',
    category: 'defense',
    categoryLabel: 'Müdafiə Mexanizmi',
    definition: 'İnternet bağlantınızı şifrələyərək ictimai şəbəkələrdə (məsələn, kafedə) məlumatlarınızın kənar şəxslər tərəfindən dinlənilməsinin qarşısını alan texnologiya.',
    plainAnalogy: 'Açıq ictimai küçədə gəzmək əvəzinə, pəncərələri qara plyonkalı xüsusi zirehli maşında hərəkət etmək kimidir.'
  },
  {
    term: 'Kiber Gigiyena (Cyber Hygiene)',
    category: 'concept',
    categoryLabel: 'Təhlükəsizlik Vərdişi',
    definition: 'İnternetdə gündəlik olaraq tətbiq edilən sadə, lakin həyati vərdişlər kompleksi: şübhəli linkləri açmamaq, proqramları yeniləmək, parolları təkrarlamamaq.',
    plainAnalogy: 'Yeməkdən əvvəl əlləri yumaq kimi: gündəlik sadə vərdiş sizi böyük xəstəlik və itkilərdən qoruyur.'
  },
  {
    term: 'Zavod Parametrlərinə Qaytarma (Factory Reset)',
    category: 'defense',
    categoryLabel: 'Müdafiə Mexanizmi',
    definition: 'Cihazdakı bütün məlumatları, tətbiqləri və zərərli proqramları silərək telefonu mağazadan ilk alındığı təmiz vəziyyətə gətirmək.',
    plainAnalogy: 'Evi tamamilə boşaldıb dərindən dezinfeksiya etmək kimidir: içəridə gizlənmiş heç bir zərərverici qala bilməz.'
  }
];
