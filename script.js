/**
 * Kiber Savadlılıq — İnteraktiv Mexanika
 * Təmiz JavaScript: heç bir xarici asılılıq yoxdur, sürətli və əlçatan.
 */

(function () {
  'use strict';

  // 1. Mövzu İdarəetməsi (Qaranlıq / İşıqlı Rejim)
  const THEME_KEY = 'kiber-savadliliq-tema';
  const themeToggleBtn = document.getElementById('theme-toggle');

  function getStoredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', isDark ? 'İşıqlı rejimə keç' : 'Qaranlıq rejimə keç');
      themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    }
  }

  applyTheme(getStoredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const target = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, target);
      applyTheme(target);
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // 2. Mobil Menyu Paneli
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const open = mobileDrawer.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(open));
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // 3. Əsas Mövzular Akkordeon Sistemi
  const topicRows = document.querySelectorAll('.topic-row');
  const btnExpandAll = document.getElementById('btn-expand-all');
  const btnCollapseAll = document.getElementById('btn-collapse-all');

  topicRows.forEach((row) => {
    const trigger = row.querySelector('.topic-row-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = row.classList.contains('is-open');
      row.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
      const ind = row.querySelector('.topic-indicator');
      if (ind) ind.textContent = isOpen ? '+' : '×';
    });
  });

  if (btnExpandAll) {
    btnExpandAll.addEventListener('click', () => {
      topicRows.forEach((row) => {
        row.classList.add('is-open');
        const trigger = row.querySelector('.topic-row-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        const ind = row.querySelector('.topic-indicator');
        if (ind) ind.textContent = '×';
      });
    });
  }

  if (btnCollapseAll) {
    btnCollapseAll.addEventListener('click', () => {
      topicRows.forEach((row) => {
        row.classList.remove('is-open');
        const trigger = row.querySelector('.topic-row-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        const ind = row.querySelector('.topic-indicator');
        if (ind) ind.textContent = '+';
      });
    });
  }

  // 4. Hesab Oğurlandıqda Təcili Addımlar Siyahısı
  const CHECKLIST_STORAGE = 'kiber-savadliliq-yoxlama-az';
  const checkboxes = document.querySelectorAll('.check-input');
  const progressText = document.getElementById('checklist-progress-text');
  const resetChecklistBtn = document.getElementById('btn-reset-checklist');

  function updateChecklist() {
    let checkedCount = 0;
    checkboxes.forEach((cb) => {
      if (cb.checked) checkedCount++;
    });

    if (progressText) {
      progressText.textContent = `${checkedCount} / ${checkboxes.length} addım tamamlandı`;
    }

    const indices = [];
    checkboxes.forEach((cb, idx) => {
      if (cb.checked) indices.push(idx);
    });
    try {
      localStorage.setItem(CHECKLIST_STORAGE, JSON.stringify(indices));
    } catch {
      // Brauzer yaddaşı xətası halında
    }
  }

  function loadChecklist() {
    try {
      const saved = JSON.parse(localStorage.getItem(CHECKLIST_STORAGE) || '[]');
      checkboxes.forEach((cb, idx) => {
        const isDone = saved.includes(idx);
        cb.checked = isDone;
        const parent = cb.closest('.check-item');
        if (parent) parent.classList.toggle('is-completed', isDone);
      });
    } catch {
      // Ehtiyat
    }
    updateChecklist();
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      const parent = cb.closest('.check-item');
      if (parent) parent.classList.toggle('is-completed', cb.checked);
      updateChecklist();
    });
  });

  if (resetChecklistBtn) {
    resetChecklistBtn.addEventListener('click', () => {
      checkboxes.forEach((cb) => {
        cb.checked = false;
        const parent = cb.closest('.check-item');
        if (parent) parent.classList.remove('is-completed');
      });
      localStorage.removeItem(CHECKLIST_STORAGE);
      updateChecklist();
    });
  }

  loadChecklist();

  // 5. Dələduz Testi (Azərbaycan üzrə Lokallaşdırılmış 10 Real Vəziyyət)
  const scenarios = [
    {
      channel: "SMS Bildirişi",
      situation: "Naməlum nömrədən belə bir SMS alırsınız:",
      snippet: "Azərpoçt: #AZ-9812 bağlamanızın ünvanı natamamdır. Bağlamanın geri qayıtmaması üçün 12 saatda məlumatları təsdiqləyin və 1.85 AZN rüsum ödəyin: http://azerpoct-kuryer-catdirilma.info/ode",
      prompt: "Bu vəziyyətdə ən təhlükəsiz və düzgün addım hansıdır?",
      options: [
        "Bağlamanın geri getməməsi üçün dərhal linkə daxil olub ödəniş etmək.",
        "Mesaja 'STOP' yazıb göndərmək.",
        "Mesajı silmək. Bağlama gözləyirsinizsə, Azərpoçtun rəsmi saytından (azerpost.az) birbaşa yoxlamaq.",
        "1.85 AZN xırda məbləğ olduğu üçün şübhələnmədən ödəmək."
      ],
      correct: 2,
      explanation: "Klassik SMS fişinqi (smişinq). Poçt xidməti heç vaxt adi mobil nömrədən şübhəli .info domenli linklə təcili ödəniş tələb etmir. Məlumatı yalnız rəsmi azerpost.az portalından yoxlayın."
    },
    {
      channel: "Daxil Olan Telefon Zəngi",
      situation: "Zəng edənin nömrəsi bankınızın adı ilə görünür. Zəng edən şəxs deyir:",
      snippet: "'Bankın təhlükəsizlik xidmətindən narahat edirik. Kartınızdan 450 AZN şübhəli əməliyyat qeydə alınıb. Əməliyyatı ləğv etmək üçün telefonunuza gələn 6 rəqəmli SMS kodu deyin.'",
      prompt: "Necə davranmalısınız?",
      options: [
        "Əməliyyatın dərhal dayandırılması üçün kodu zəng edənə oxumaq.",
        "Dəstəyi dərhal asmaq. Əsl bank əməkdaşları heç vaxt birdəfəlik SMS kodu istəmir.",
        "Zəng edəndən vəzifəsini və adını soruşub, sonra kodu bildirmək.",
        "Pulu xilas etmək üçün təcili başqa hesaba köçürməyi təklif etmək."
      ],
      correct: 1,
      explanation: "Nömrə saxtalaşdırılıb (spoofing). Həmin 6 rəqəmli kod əslində dələduzun sizin bank tətbiqinizə giriş və ya şifrə sıfırlama cəhdidir! Kodu verdiyiniz anda kartınızdakı bütün pul çıxarılır."
    },
    {
      channel: "E-poçt Mesajı",
      situation: "İş yerinizin rəhbərinin adından qısa e-poçt alırsınız:",
      snippet: "'Mən hazırda Nazirlikdə iclasdayam, zənglərə cavab verə bilmirəm. Təcili olaraq 3 ədəd 100 manatlıq Apple və ya Google Play hədiyyə kartı alıb arxasındakı kodları mənə göndər, sonra xərcləri ödəyəcəyəm.'",
      prompt: "Necə hərəkət etməlisiniz?",
      options: [
        "Rəhbərin tapşırığı olduğu üçün dərhal yaxınlıqdakı mağazaya gedib kartları almaq.",
        "Özü onlayn alsın deyə ona öz kart məlumatlarınızı yazmaq.",
        "Bunun saxta olduğunu başa düşmək; rəhbərə şəxsən zəng edib və ya yanına gedib dəqiqləşdirmək.",
        "İş yoldaşlarına yönləndirib kimin tez ala biləcəyini soruşmaq."
      ],
      correct: 2,
      explanation: "Hədiyyə kartları və qeyri-rəsmi kodlar kiber dələduzların ən sevdiyi vasitədir. Tələsiklik yaratmaq və 'iclasdayam' bəhanəsi rəhbər adından istifadə edilən dələduzluğun klassik əlamətidir."
    },
    {
      channel: "Şifrə Seçimi",
      situation: "Əsas e-poçtunuz üçün yeni şifrə təyin edirsiniz:",
      snippet: "Namizəd variantlar: A) B@k1_2026!  |  B) durna-sahil-qarpiz-bulaq  |  C) Memmed1985  |  D) 1234567890",
      prompt: "Hansı seçim sındırma proqramlarına qarşı ən güclü müdafiəni təmin edir?",
      options: [
        "B@k1_2026! (Rəmzlər və böyük-kiçik hərflər var)",
        "durna-sahil-qarpiz-bulaq (Uzun, dörd fərqli sözdən ibarət şifrə-ifadəsi)",
        "Memmed1985 (Ad və doğum ili ilə yadda qalan kombinasiya)",
        "1234567890 (Tez yığılan sadə rəqəm ardıcıllığı)"
      ],
      correct: 1,
      explanation: "Uzunluq mürəkkəblikdən güclüdür. Şifrə sındıran proqramlar 'B@k1' kimi adi hərfləri rəmzlə əvəzləmə üsullarını saniyəyə tapır. Bir-biri ilə əlaqəsiz dörd sözü tapmaq isə əsrlər tələb edir."
    },
    {
      channel: "İctimai Şəbəkə",
      situation: "Hava limanında gözləyirsiniz və bank hesabınızı yoxlamaq lazımdır:",
      snippet: "Aşkarlanan şəbəkələr: 'Free_Airport_WiFi_Fast' (Qıfıl işarəsi yoxdur, açıq giriş).",
      prompt: "Ən təhlükəsiz yol hansıdır?",
      options: [
        "Adında 'Airport' sözü olduğu üçün açıq şəbəkəyə qoşulmaq.",
        "Telefonun mobil internetini (hotspot) açıb öz şəxsi internetinizdən istifadə etmək.",
        "Yaxınlıqdakı sərnişindən hansı şəbəkənin təhlükəsiz olduğunu soruşmaq.",
        "Kimsə görməsin deyə tətbiqə çox sürətlə daxil olub çıxmaq."
      ],
      correct: 1,
      explanation: "İstənilən şəxs bir neçə dəqiqəyə saxta Wi-Fi nöqtəsi açıb şifrəsiz trafikinizi izləyə bilər. Bank və ya ödəniş əməliyyatları üçün hər zaman mobil şəbəkə (4G/5G) məlumatından istifadə edin."
    },
    {
      channel: "Sosial Şəbəkə Mesajı",
      situation: "Yaxın dostunuzun profilindən qəfil mesaj gəlir:",
      snippet: "'Gör bu qəzada kim həlak olub... bu videodakı doğrudan da sənsən?! 😢 http://xeberler-trend-baki.cc/video?id=712'",
      prompt: "Necə hərəkət etməlisiniz?",
      options: [
        "Haqqınızda nə paylaşıldığını görmək üçün təcili linkə daxil olmaq.",
        "Keçidə klikləməmək. Dərhal dostunuza adi zəng edib hesabının ələ keçirildiyini xəbər vermək.",
        "Açılan səhifə yaşınızı təsdiqləmək üçün şifrə istədikdə məlumatları yazmaq.",
        "Mesajı digər dostlara göndərib videonu görüb-görmədiklərini soruşmaq."
      ],
      correct: 1,
      explanation: "Dələduzlar dostunuzun profilini ələ keçirib bütün kontaktlara maraq oyadan saxta mesajlar göndərirlər. Link sizi saxta giriş səhifəsinə apararaq şifrənizi oğurlamaq üçündür."
    },
    {
      channel: "Brauzer Pəncərəsi",
      situation: "Xəbər oxuyarkən ekranda qəfil qırmızı rəngdə yanıb-sönən pəncərə çıxır:",
      snippet: "'Diqqət! Kompüterinizdə 17 təhlükəli virus tapıldı! Bütün fayllarınız pozulacaq. Təmizləmək üçün dərhal Antivirus Pro proqramını endirin.'",
      prompt: "Bu xəbərdarlıqla nə etmək lazımdır?",
      options: [
        "Kompüteri təmizləmək üçün 'Endir' düyməsini sıxmaq.",
        "Ekranda yazılmış pulsuz nömrəyə zəng etmək.",
        "Brauzer səhifəsini dərhal bağlamaq. Saytlar kompüterin içindəki faylları skan edə bilməz; bu saxta tələdir.",
        "Kompüteri yenidən başladaraq kart məlumatlarını daxil etmək."
      ],
      correct: 2,
      explanation: "Veb səhifələrin kompüterinizin yaddaşını yoxlamaq texniki imkanı yoxdur. Bu bildirişlər (scareware) sizi qorxudaraq zərərverici proqram yüklətmək üçün uydurulur."
    },
    {
      channel: "Təsdiq Bildirişi",
      situation: "Evdə çay içirsiniz, kompüterə toxunmamısınız. Qəfil telefonunuza bildiriş gəlir:",
      snippet: "Google Təsdiq xəbərdarlığı: 'Moskvadan giriş cəhdini təsdiq edirsiniz?' Düymələr: [Bəli, mənəm] və [Xeyr, mən deyiləm].",
      prompt: "Bu nə deməkdir və nə etməlisiniz?",
      options: [
        "Ekranda mane olmasın deyə 'Bəli' düyməsini sıxmaq.",
        "Kimsə şifrənizi tapıb girməyə çalışır! Dərhal 'Xeyr' seçmək və başqa təmiz cihazdan şifrəni dəyişmək.",
        "Heç nə etməmək; cavab verməsəniz sistem özü icazə verəcək.",
        "Narahat etməsin deyə iki mərhələli təsdiqləməni tamamilə söndürmək."
      ],
      correct: 1,
      explanation: "İki mərhələli təsdiqləmə (2FA) sizi yenicə xilas etdi! Dələduz şifrənizi bilsə də, telefonunuzdakı qıfıla ilişib. 'Xeyr' seçərək girişi bloklayın və şifrənizi dərhal yeniləyin."
    },
    {
      channel: "Onlayn Mağaza",
      situation: "Sosial şəbəkədəki reklamda qiyməti 300 manat olan idman ayaqqabısı 25 manata satılır:",
      snippet: "Sifariş səhifəsi: 'Bank kartı qəbul edilmir. Yalnız karta birbaşa köçürmə və ya MilliÖn/eManat ilə ödəniş'.",
      prompt: "Burada əsas dələduzluq əlaməti hansıdır?",
      options: [
        "Endirimin böyük olması, amma mövsüm sonu belə endirimlər mümkündür.",
        "Rəsmi mağazalar təhlükəsiz bank ödəniş şlüzü istifadə edir; karta birbaşa köçürmə və ya terminal ödənişində vəsaitin heç bir zəmanəti yoxdur.",
        "Məhsulun şəkli səliqəli olduğu üçün narahat olmağa əsas yoxdur.",
        "Faiz hesablanmasın deyə debet kartından köçürmək daha yaxşıdır."
      ],
      correct: 1,
      explanation: "Bank kartı ilə rəsmi ödənişi qəbul etməyib yalnız fərdi karta köçürmə tələb edən anonim səhifələr saxtadır. Pul köçürülən kimi profil sizi bloklayır və pul batır."
    },
    {
      channel: "Təcili Telefon Zəngi",
      situation: "Yaşlı ailə üzvünüzə həyəcanlı və ağlamaklı bir səs zəng edir:",
      snippet: "'Nənə, mənəm! Maşınla qəza törətmişəm, polisdəyəm. Anama heç nə demə! Bir nəfər evə gəlib pulu götürəcək, təcili 3000 manat nağd pul ver, yoxsa həbs edirlər.'",
      prompt: "Təcili nağd pul istəyən belə zənglərdə ən vacib qayda nədir?",
      options: [
        "Nəvənin həbsdə qalmaması üçün gələn kuryerə dərhal pulu vermək.",
        "Dərin nəfəs alıb dəstəyi asmaq və nəvənizin və ya valideynlərinin öz daimi nömrəsinə zəng edib məsələni aydınlaşdırmaq.",
        "Heç kimlə danışmadan dərhal banka gedib pulu çıxarmaq.",
        "Zəng edəndən pulu gələn ay qaytaracağına söz verməsini istəmək."
      ],
      correct: 1,
      explanation: "Bu, yaşlı insanları şoka salmaq üçün qurulan 'Qohum təhlükədədir' dələduzluğudur. Qorxu və tələskənlik hissini dayandırmağın yeganə yolu dəstəyi asıb doğma nömrəyə zəng etməkdir."
    }
  ];

  let currentIdx = 0;
  let score = 0;

  const quizChannelTag = document.getElementById('quiz-scenario-tag');
  const quizSituation = document.getElementById('quiz-scenario-content');
  const quizSnippet = document.getElementById('quiz-scenario-snippet');
  const quizPrompt = document.getElementById('quiz-prompt');
  const quizOptionsBox = document.getElementById('quiz-options');
  const quizFeedback = document.getElementById('quiz-feedback');
  const feedbackHeadline = document.getElementById('feedback-headline');
  const feedbackText = document.getElementById('feedback-text');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizCounter = document.getElementById('quiz-counter');
  const quizScoreBadge = document.getElementById('quiz-score-badge');
  const quizCardView = document.getElementById('quiz-card-view');
  const quizResultView = document.getElementById('quiz-result-view');
  const resultScoreText = document.getElementById('result-score-text');
  const resultMessage = document.getElementById('result-message');
  const quizRestartBtn = document.getElementById('quiz-restart-btn');

  function renderScenario(idx) {
    if (idx >= scenarios.length) {
      showResults();
      return;
    }

    const item = scenarios[idx];

    if (quizCounter) quizCounter.textContent = `Vəziyyət ${idx + 1} / ${scenarios.length}`;
    if (quizScoreBadge) quizScoreBadge.textContent = `Nəticə: ${score} / ${idx}`;

    if (quizChannelTag) quizChannelTag.textContent = item.channel;
    if (quizSituation) quizSituation.textContent = item.situation;
    if (quizSnippet) {
      quizSnippet.textContent = item.snippet;
      quizSnippet.style.display = item.snippet ? 'block' : 'none';
    }
    if (quizPrompt) quizPrompt.textContent = item.prompt;

    if (quizFeedback) quizFeedback.className = 'quiz-feedback-panel';
    if (quizNextBtn) {
      quizNextBtn.style.display = 'none';
      quizNextBtn.textContent = idx === scenarios.length - 1 ? 'Yekun nəticəyə bax →' : 'Növbəti vəziyyət →';
    }

    if (quizOptionsBox) {
      quizOptionsBox.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      item.options.forEach((opt, optIndex) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-choice-btn';
        btn.innerHTML = `
          <span class="quiz-choice-marker">${letters[optIndex]}</span>
          <span>${escapeHtml(opt)}</span>
        `;
        btn.addEventListener('click', () => chooseAnswer(optIndex));
        quizOptionsBox.appendChild(btn);
      });
    }
  }

  function chooseAnswer(selected) {
    const item = scenarios[currentIdx];
    const isCorrect = selected === item.correct;

    if (isCorrect) score++;

    if (quizScoreBadge) quizScoreBadge.textContent = `Nəticə: ${score} / ${currentIdx + 1}`;

    const btns = quizOptionsBox.querySelectorAll('.quiz-choice-btn');
    btns.forEach((btn, i) => {
      btn.disabled = true;
      if (i === item.correct) {
        btn.classList.add('is-correct');
      } else if (i === selected && !isCorrect) {
        btn.classList.add('is-wrong');
      }
    });

    if (quizFeedback) {
      quizFeedback.className = `quiz-feedback-panel show ${isCorrect ? 'correct' : 'wrong'}`;
      if (feedbackHeadline) {
        feedbackHeadline.textContent = isCorrect
          ? '✓ Düzgün və təhlükəsiz reaksiya'
          : '✗ Çox təhlükəli addım!';
      }
      if (feedbackText) {
        feedbackText.textContent = item.explanation;
      }
    }

    if (quizNextBtn) {
      quizNextBtn.style.display = 'inline-flex';
      quizNextBtn.focus();
    }
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      currentIdx++;
      renderScenario(currentIdx);
    });
  }

  function showResults() {
    if (quizCardView) quizCardView.style.display = 'none';
    if (quizResultView) quizResultView.classList.add('show');

    if (resultScoreText) {
      resultScoreText.textContent = `${scenarios.length} sualdan ${score} düzgün cavab`;
    }

    if (resultMessage) {
      if (score === scenarios.length) {
        resultMessage.textContent = 'Mükəmməl instinkt! Əksər insanları aldadan süni tələskənliyi, saxta nömrələri və şübhəli keçidləri dərhal ayırd edirsiniz. Bu bilikləri ailənizlə də bölüşün.';
      } else if (score >= 7) {
        resultMessage.textContent = 'Yaxşı nəticə! Əsas dələduzluq üsullarını yaxşı tanıyırsınız. Tam təhlükəsiz olmaq üçün səhv etdiyiniz ssenarilərin izahını bir daha gözdən keçirin.';
      } else {
        resultMessage.textContent = 'Faydalı məşq oldu. Dələduzlar bu tələləri xüsusi olaraq düşünmədən reaksiya verməyiniz üçün qururlar. Yuxarıdakı doqquz əsas bələdçini oxumaq üçün bir neçə dəqiqə ayırın.';
      }
    }
  }

  if (quizRestartBtn) {
    quizRestartBtn.addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      if (quizResultView) quizResultView.classList.remove('show');
      if (quizCardView) quizCardView.style.display = 'block';
      renderScenario(0);
    });
  }

  renderScenario(0);

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 6. Mövzu Axtarışı (Əsas bələdçilər üzrə axtarış və filtrləmə)
  const topicsSearchInput = document.getElementById('topics-search-input') || document.getElementById('global-search-input');
  const topicsSearchClear = document.getElementById('topics-search-clear') || document.getElementById('global-search-clear');
  const glossaryInput = document.getElementById('glossary-search');
  const glossaryItems = document.querySelectorAll('.glossary-item');
  const glossaryEmpty = document.getElementById('glossary-empty-msg');
  const topicsEmptyMsg = document.getElementById('topics-empty-msg');
  const topicsCountEl = document.querySelector('.topics-count');
  const initialTopicsCount = topicsCountEl ? topicsCountEl.textContent : '9 əsas mövzu';

  function performSearch(rawQuery) {
    const q = (rawQuery || '').toLowerCase().trim();

    // Sync input values
    if (topicsSearchInput && topicsSearchInput.value !== rawQuery) {
      topicsSearchInput.value = rawQuery;
    }
    if (glossaryInput && glossaryInput.value !== rawQuery) {
      glossaryInput.value = rawQuery;
    }

    if (topicsSearchClear) {
      topicsSearchClear.style.display = q ? 'flex' : 'none';
    }

    const matchedTopics = [];

    // "Əsas bələdçilər" Akkordeon Bölməsini Filtrlə
    topicRows.forEach((row, idx) => {
      const titleEl = row.querySelector('h3');
      const title = titleEl ? titleEl.textContent : '';
      const text = row.textContent.toLowerCase();

      if (!q) {
        row.style.display = '';
        // Sıfırlandıqda ilkin vəziyyətə qaytar: 1-ci mövzu açıq, qalanları bağlı
        if (idx === 0) {
          row.classList.add('is-open');
          const trigger = row.querySelector('.topic-row-trigger');
          const ind = row.querySelector('.topic-indicator');
          if (trigger) trigger.setAttribute('aria-expanded', 'true');
          if (ind) ind.textContent = '×';
        } else {
          row.classList.remove('is-open');
          const trigger = row.querySelector('.topic-row-trigger');
          const ind = row.querySelector('.topic-indicator');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
          if (ind) ind.textContent = '+';
        }
      } else if (text.includes(q)) {
        row.style.display = '';
        row.classList.add('is-open');
        const trigger = row.querySelector('.topic-row-trigger');
        const ind = row.querySelector('.topic-indicator');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        if (ind) ind.textContent = '×';
        matchedTopics.push({ row, title, idx });
      } else {
        row.style.display = 'none';
      }
    });

    if (topicsEmptyMsg) {
      topicsEmptyMsg.style.display = (q && matchedTopics.length === 0) ? 'block' : 'none';
    }
    if (topicsCountEl) {
      if (!q) {
        topicsCountEl.textContent = initialTopicsCount;
      } else {
        topicsCountEl.textContent = `${matchedTopics.length} nəticə tapıldı`;
      }
    }

    // Lüğət Bölməsini Filtrlə
    let matchedGlossaryCount = 0;
    glossaryItems.forEach((item) => {
      const text = item.textContent.toLowerCase();

      if (!q) {
        item.style.display = '';
      } else if (text.includes(q)) {
        item.style.display = '';
        matchedGlossaryCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (glossaryEmpty) {
      glossaryEmpty.style.display = (q && matchedGlossaryCount === 0) ? 'block' : 'none';
    }
  }

  if (topicsSearchInput) {
    topicsSearchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  if (glossaryInput) {
    glossaryInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  if (topicsSearchClear) {
    topicsSearchClear.addEventListener('click', () => {
      performSearch('');
      if (topicsSearchInput) topicsSearchInput.focus();
    });
  }

  // Escape düyməsi ilə axtarışı təmizlə
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (topicsSearchInput && document.activeElement === topicsSearchInput && topicsSearchInput.value) {
        performSearch('');
      }
    }
  });

  // 7. Avtomatik Yenilənən Müəlliflik Hüququ İli
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* OCTOBER CAMPAIGN START */
  // =========================================================================
  // Oktyabr Kibertəhlükəsizlik Maarifləndirmə Ayı Mexanikası
  // =========================================================================

  // 1. Bildiriş Zolağının İdarə Edilməsi (Yalnız cari sessiya üçün JS dəyişəni ilə)
  let isOctoberBannerDismissed = false;
  const octoberBanner = document.getElementById('october-banner');
  const octoberBannerClose = document.getElementById('october-banner-close');
  const octoberBannerLink = document.querySelector('.october-banner-link');
  const octoberChallengeSection = document.getElementById('october-challenge');

  if (octoberBannerClose && octoberBanner) {
    octoberBannerClose.addEventListener('click', () => {
      isOctoberBannerDismissed = true;
      octoberBanner.style.display = 'none';
    });
  }

  if (octoberBannerLink && octoberChallengeSection) {
    octoberBannerLink.addEventListener('click', (e) => {
      e.preventDefault();
      octoberChallengeSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 2. 4 Həftəlik Çağırış Siyahısı (Yalnız operativ yaddaş - in-memory state)
  const octoberCheckboxes = document.querySelectorAll('.october-checkbox');
  const octoberProgressText = document.getElementById('october-progress-text');
  const octoberProgressBar = document.getElementById('october-progress-bar');
  const octoberTopicLinks = document.querySelectorAll('.october-topic-link');
  const allTopicRows = document.querySelectorAll('.topic-row');

  function updateOctoberProgress() {
    let completedCount = 0;
    octoberCheckboxes.forEach((cb) => {
      const row = cb.closest('.october-challenge-row');
      if (cb.checked) {
        completedCount++;
        if (row) row.classList.add('is-completed');
      } else {
        if (row) row.classList.remove('is-completed');
      }
    });

    const total = octoberCheckboxes.length;
    if (octoberProgressText) {
      octoberProgressText.textContent = `${completedCount} / ${total} tamamlandı`;
    }
    if (octoberProgressBar) {
      const pct = total > 0 ? (completedCount / total) * 100 : 0;
      octoberProgressBar.style.width = `${pct}%`;
    }
  }

  octoberCheckboxes.forEach((cb) => {
    cb.addEventListener('change', updateOctoberProgress);
  });

  // 3. Əlaqədar Bələdçiyə Keçid və Akkordeonun Avtomatik Açılması
  octoberTopicLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetTopicIdx = parseInt(link.getAttribute('data-target-topic'), 10);
      if (!isNaN(targetTopicIdx) && allTopicRows[targetTopicIdx]) {
        const row = allTopicRows[targetTopicIdx];
        const trigger = row.querySelector('.topic-row-trigger');
        const indicator = row.querySelector('.topic-indicator');

        row.classList.add('is-open');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        if (indicator) indicator.textContent = '−';
      }
    });
  });
  /* OCTOBER CAMPAIGN END */

  /* SHARE AWARENESS START */
  // =========================================================================
  // Paylaşmazdan Əvvəl Mini Testi (Yalnız operativ yaddaş)
  // =========================================================================
  const shareCheckboxes = document.querySelectorAll('.share-checkbox');
  const shareResultText = document.getElementById('share-result-text');
  const shareResultBox = document.getElementById('share-result-box');
  const shareActionLink = document.getElementById('share-action-link');

  function updateShareAwareness() {
    let count = 0;
    shareCheckboxes.forEach((cb) => {
      if (cb.checked) count++;
    });

    if (!shareResultText) return;

    if (count === 0) {
      shareResultText.textContent = 'Heç birini seçməmisiniz. Əla, belə davam edin.';
      if (shareResultBox) {
        shareResultBox.setAttribute('data-level', 'safe');
      }
    } else if (count <= 2) {
      shareResultText.textContent = 'Bir az məlumat açıqdır. Gizlilik ayarlarını yoxlayın.';
      if (shareResultBox) {
        shareResultBox.setAttribute('data-level', 'warn');
      }
    } else {
      shareResultText.textContent = 'Çox məlumat açıqdır. Dələduz bunlardan inandırıcı bir ssenari qura bilər.';
      if (shareResultBox) {
        shareResultBox.setAttribute('data-level', 'danger');
      }
    }
  }

  shareCheckboxes.forEach((cb) => {
    cb.addEventListener('change', updateShareAwareness);
  });

  if (shareActionLink) {
    shareActionLink.addEventListener('click', () => {
      const targetTopicIdx = parseInt(shareActionLink.getAttribute('data-target-topic'), 10);
      if (!isNaN(targetTopicIdx) && allTopicRows[targetTopicIdx]) {
        const row = allTopicRows[targetTopicIdx];
        const trigger = row.querySelector('.topic-row-trigger');
        const indicator = row.querySelector('.topic-indicator');

        row.classList.add('is-open');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        if (indicator) indicator.textContent = '−';
      }
    });
  }
  /* SHARE AWARENESS END */

  /* TOOLS START */
  // Pulsuz yoxlama alətləri (Have I Been Pwned, ScamAdviser, TinEye):
  // Xarici platformalara birbaşa və təhlükəsiz keçid üçün standart HTML linkləri kimi işləyir.
  /* TOOLS END */

})();
