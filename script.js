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
    return saved === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', 'Mövzunu dəyiş');
      themeToggleBtn.setAttribute('title', isDark ? 'İşıqlı rejimə keç' : 'Qaranlıq rejimə keç');
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

  // 3. Əsas Bələdçilər: Kart Sistemi, Kateqoriya Filtrləri və Detallar
  const topicCards = document.querySelectorAll('.topic-card');
  const topicFilterTabs = document.querySelectorAll('.topics-filter-tabs .tab');
  let currentTopicCategory = 'all';

  function filterTopicCards() {
    const q = (topicsSearchInput ? topicsSearchInput.value : '').toLowerCase().trim();
    let visibleCount = 0;

    topicCards.forEach((card) => {
      const cat = card.getAttribute('data-category') || 'all';
      const matchesCategory = (currentTopicCategory === 'all' || cat === currentTopicCategory);
      const text = card.textContent.toLowerCase();
      const matchesSearch = (!q || text.includes(q));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (topicsEmptyMsg) {
      topicsEmptyMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  // Pill tabs üzrə kateqoriya filtrləməsi
  topicFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      topicFilterTabs.forEach((t) => {
        t.classList.remove('tab-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('tab-active');
      tab.setAttribute('aria-selected', 'true');
      currentTopicCategory = tab.getAttribute('data-filter') || 'all';
      filterTopicCards();
    });
  });

  // Kartın "Ətraflı oxuyun" düyməsi ilə açılıb-bağlanması
  topicCards.forEach((card) => {
    const trigger = card.querySelector('.topic-row-trigger');
    const drawer = card.querySelector('.topic-details-drawer');
    const linkText = card.querySelector('.topic-link-text');
    if (!trigger || !drawer) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = card.classList.contains('is-expanded');
      const newState = !isOpen;
      card.classList.toggle('is-expanded', newState);
      drawer.hidden = !newState;
      trigger.setAttribute('aria-expanded', String(newState));
      if (linkText) {
        linkText.textContent = newState ? 'Təlimatı bağla' : 'Ətraflı oxuyun';
      }
    });
  });

  // 4. Hesab Oğurlandıqda Təcili Addımlar: Proqres Xətti və Status Nişanları
  const CHECKLIST_STORAGE = 'kiber-savadliliq-yoxlama-az';
  const emergencyCheckboxes = document.querySelectorAll('.steps-list .check-input');
  const emergencyProgressText = document.getElementById('checklist-progress-text');
  const resetChecklistBtn = document.getElementById('btn-reset-checklist');
  const stepsProgressFill = document.getElementById('steps-progress-fill');

  function updateChecklist() {
    let checkedCount = 0;
    emergencyCheckboxes.forEach((cb) => {
      const card = cb.closest('.step-card');
      const badge = card ? card.querySelector('.step-status-badge') : null;
      if (cb.checked) {
        checkedCount++;
        if (card) card.classList.add('is-completed');
        if (badge) {
          badge.className = 'badge badge-success step-status-badge';
          badge.textContent = 'Tamamlandı';
        }
      } else {
        if (card) card.classList.remove('is-completed');
        if (badge) {
          badge.className = 'badge badge-neutral step-status-badge';
          badge.textContent = 'Gözləyir';
        }
      }
    });

    if (emergencyProgressText) {
      emergencyProgressText.textContent = `${checkedCount} / ${emergencyCheckboxes.length} addım tamamlandı`;
    }

    if (stepsProgressFill && emergencyCheckboxes.length > 0) {
      const pct = (checkedCount / emergencyCheckboxes.length) * 100;
      stepsProgressFill.style.height = `${pct}%`;
    }

    const indices = [];
    emergencyCheckboxes.forEach((cb, idx) => {
      if (cb.checked) indices.push(idx);
    });
    try {
      localStorage.setItem(CHECKLIST_STORAGE, JSON.stringify(indices));
    } catch {}
  }

  function loadChecklist() {
    try {
      const saved = JSON.parse(localStorage.getItem(CHECKLIST_STORAGE) || '[]');
      emergencyCheckboxes.forEach((cb, idx) => {
        cb.checked = saved.includes(idx);
      });
    } catch {}
    updateChecklist();
  }

  emergencyCheckboxes.forEach((cb) => {
    cb.addEventListener('change', updateChecklist);
  });

  if (resetChecklistBtn) {
    resetChecklistBtn.addEventListener('click', () => {
      emergencyCheckboxes.forEach((cb) => {
        cb.checked = false;
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

    // Card top progress bar
    const topBar = document.getElementById('quiz-top-progress-bar');
    if (topBar) {
      const pct = ((idx + 1) / scenarios.length) * 100;
      topBar.style.width = `${pct}%`;
    }

    if (quizCounter) quizCounter.textContent = `Sual ${idx + 1} / ${scenarios.length}`;
    if (quizScoreBadge) quizScoreBadge.textContent = `Doğru: ${score} / ${idx}`;

    if (quizChannelTag) quizChannelTag.textContent = item.channel;
    if (quizSituation) quizSituation.textContent = item.situation;
    if (quizSnippet) {
      quizSnippet.textContent = item.snippet;
      quizSnippet.style.display = item.snippet ? 'block' : 'none';
    }
    if (quizPrompt) quizPrompt.textContent = item.prompt;

    if (quizFeedback) quizFeedback.className = 'quiz-feedback-box';
    if (quizNextBtn) {
      quizNextBtn.style.display = 'none';
      const btnSpan = quizNextBtn.querySelector('span');
      if (btnSpan) {
        btnSpan.textContent = idx === scenarios.length - 1 ? 'Nəticəyə bax' : 'Növbəti sual';
      }
    }

    if (quizOptionsBox) {
      quizOptionsBox.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      item.options.forEach((opt, optIndex) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'quiz-option-card';
        card.innerHTML = `
          <span class="quiz-option-marker">${letters[optIndex]}</span>
          <span class="quiz-option-text">${escapeHtml(opt)}</span>
        `;
        card.addEventListener('click', () => chooseAnswer(optIndex));
        quizOptionsBox.appendChild(card);
      });
    }
  }

  function chooseAnswer(selected) {
    const item = scenarios[currentIdx];
    const isCorrect = selected === item.correct;

    if (isCorrect) score++;

    if (quizScoreBadge) quizScoreBadge.textContent = `Doğru: ${score} / ${currentIdx + 1}`;

    const cards = quizOptionsBox.querySelectorAll('.quiz-option-card');
    cards.forEach((card, i) => {
      card.disabled = true;
      if (i === selected) {
        card.classList.add('is-selected');
      }
      if (i === item.correct) {
        card.classList.add('is-correct');
      } else if (i === selected && !isCorrect) {
        card.classList.add('is-wrong');
      }
    });

    if (quizFeedback) {
      quizFeedback.className = `quiz-feedback-box show ${isCorrect ? 'correct' : 'wrong'}`;
      const badge = document.getElementById('feedback-badge');
      if (badge) {
        badge.className = isCorrect ? 'badge badge-success' : 'badge badge-danger';
        badge.textContent = isCorrect ? '✓ Düzgün reaksiya' : '✗ Təhlükəli addım';
      }
      if (feedbackHeadline) {
        feedbackHeadline.textContent = isCorrect
          ? 'Təhlükəsiz və düzgün seçim!'
          : 'Diqqət: bu tələyə düşmək olmaz!';
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
    if (quizResultView) {
      quizResultView.style.display = 'flex';
      quizResultView.classList.add('show');
    }

    const points = Math.round((score / scenarios.length) * 100);

    const score100El = document.getElementById('result-score-100');
    if (score100El) score100El.textContent = String(points);

    const scorePercentEl = document.getElementById('result-score-percent');
    if (scorePercentEl) scorePercentEl.textContent = `${points}%`;

    if (resultScoreText) {
      resultScoreText.textContent = `${score} / ${scenarios.length}`;
    }

    // Circular gauge animation (Circumference = 2 * PI * 56 = 351.86)
    const circleBar = document.getElementById('score-circle-bar');
    const circumference = 351.86;
    const offset = circumference * (1 - points / 100);
    if (circleBar) {
      circleBar.style.strokeDashoffset = `${offset}`;
    }

    const resultBar = document.getElementById('result-score-bar');
    if (resultBar) {
      resultBar.style.width = `${points}%`;
    }

    // Colored badge (Təhlükəsiz / Diqqətli ol / Risk yüksək)
    const statusBadge = document.getElementById('result-status-badge');
    const levelText = document.getElementById('result-level-text');

    if (points >= 80) {
      if (statusBadge) {
        statusBadge.className = 'badge badge-success';
        statusBadge.textContent = 'Təhlükəsiz';
      }
      if (levelText) levelText.textContent = 'Yüksək müdafiə';
      if (circleBar) circleBar.style.stroke = 'var(--color-success)';
      if (resultBar) resultBar.style.backgroundColor = 'var(--color-success)';
      if (resultMessage) {
        resultMessage.textContent = 'Mükəmməl instinkt! Əksər insanları aldadan süni tələskənliyi, saxta nömrələri və şübhəli keçidləri dərhal ayırd edirsiniz. Rəqəmsal müdafiə vərdişləriniz olduqca etibarlıdır.';
      }
    } else if (points >= 50) {
      if (statusBadge) {
        statusBadge.className = 'badge badge-warning';
        statusBadge.textContent = 'Diqqətli ol';
      }
      if (levelText) levelText.textContent = 'Orta müdafiə';
      if (circleBar) circleBar.style.stroke = 'var(--color-warning)';
      if (resultBar) resultBar.style.backgroundColor = 'var(--color-warning)';
      if (resultMessage) {
        resultMessage.textContent = 'Yaxşı nəticə! Əsas dələduzluq üsullarını tanıyırsınız. Tam təhlükəsiz olmaq və riskləri minimuma endirmək üçün səhv etdiyiniz vəziyyətlərin izahını və əsas bələdçiləri bir daha nəzərdən keçirin.';
      }
    } else {
      if (statusBadge) {
        statusBadge.className = 'badge badge-danger';
        statusBadge.textContent = 'Risk yüksək';
      }
      if (levelText) levelText.textContent = 'Kritik risk';
      if (circleBar) circleBar.style.stroke = 'var(--color-danger)';
      if (resultBar) resultBar.style.backgroundColor = 'var(--color-danger)';
      if (resultMessage) {
        resultMessage.textContent = 'Yüksək risk aşkarlandı! Dələduzlar adətən bu cür tələlərdən istifadə edərək vəsaitləri ələ keçirirlər. Şəxsi təhlükəsizliyinizi təmin etmək üçün saytdakı doqquz əsas bələdçini və təcili addımları mütləq oxuyun.';
      }
    }
  }

  if (quizRestartBtn) {
    quizRestartBtn.addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      if (quizResultView) {
        quizResultView.style.display = 'none';
        quizResultView.classList.remove('show');
      }
      if (quizCardView) quizCardView.style.display = 'block';
      renderScenario(0);
      const quizSection = document.getElementById('view-quiz');
      if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // 6. Mövzu və Lüğət Axtarışı
  const topicsSearchInput = document.getElementById('topics-search-input');
  const topicsSearchClear = document.getElementById('topics-search-clear');
  const topicsEmptyMsg = document.getElementById('topics-empty-msg');

  if (topicsSearchInput) {
    topicsSearchInput.addEventListener('input', () => {
      if (topicsSearchClear) {
        topicsSearchClear.style.display = topicsSearchInput.value ? 'flex' : 'none';
      }
      filterTopicCards();
    });
  }

  if (topicsSearchClear) {
    topicsSearchClear.addEventListener('click', () => {
      if (topicsSearchInput) {
        topicsSearchInput.value = '';
        topicsSearchInput.focus();
      }
      topicsSearchClear.style.display = 'none';
      filterTopicCards();
    });
  }

  // Lüğət üçün axtarış
  const glossaryInput = document.getElementById('glossary-search');
  const glossaryCards = document.querySelectorAll('.glossary-card-row');
  const glossaryEmptyMsg = document.getElementById('glossary-empty-msg');
  const glossaryCountEl = document.getElementById('glossary-count');
  const totalGlossaryTerms = glossaryCards.length;

  if (glossaryInput) {
    glossaryInput.addEventListener('input', (e) => {
      const q = (e.target.value || '').toLowerCase().trim();
      let matchCount = 0;

      glossaryCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = 'flex';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (glossaryEmptyMsg) {
        glossaryEmptyMsg.style.display = (q && matchCount === 0) ? 'block' : 'none';
      }

      if (glossaryCountEl) {
        glossaryCountEl.textContent = q ? `${matchCount} termin tapıldı` : `${totalGlossaryTerms} termin`;
      }
    });
  }

  // Rəsmi Qurumlar: Nömrəni Kopyalama Düymələri (Copy to Clipboard)
  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  copyPhoneBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const phone = btn.getAttribute('data-phone');
      if (!phone) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(phone);
        } else {
          const ta = document.createElement('textarea');
          ta.value = phone;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        const textEl = btn.querySelector('.copy-btn-text');
        const origText = textEl ? textEl.textContent : 'Kopyala';
        btn.classList.add('is-copied');
        if (textEl) textEl.textContent = 'Kopyalandı! ✓';

        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (textEl) textEl.textContent = origText;
        }, 2000);
      } catch (err) {
        console.error('Kopyalama xətası:', err);
      }
    });
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

  function openTopicByIndex(idx) {
    if (typeof idx === 'number' && !isNaN(idx)) {
      const card = document.getElementById('topic-row-' + idx);
      if (card) {
        // Filtrləməni 'all' rejiminə qaytar ki, kart mütləq görünsün
        if (currentTopicCategory !== 'all') {
          currentTopicCategory = 'all';
          topicFilterTabs.forEach((t) => {
            const isAll = (t.getAttribute('data-filter') === 'all');
            t.classList.toggle('tab-active', isAll);
            t.setAttribute('aria-selected', String(isAll));
          });
          filterTopicCards();
        }

        const trigger = card.querySelector('.topic-row-trigger');
        const drawer = card.querySelector('.topic-details-drawer');
        const linkText = card.querySelector('.topic-link-text');
        card.classList.add('is-expanded');
        if (drawer) drawer.hidden = false;
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        if (linkText) linkText.textContent = 'Təlimatı bağla';
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  if (octoberBannerLink) {
    octoberBannerLink.addEventListener('click', (e) => {
      e.preventDefault();
      const current = parseHashRoute();
      if (current === '/') {
        const target = document.getElementById('october-challenge');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else {
        pendingNavigationAction = { scrollToId: 'october-challenge' };
        window.location.hash = '#/';
      }
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
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTopicIdx = parseInt(link.getAttribute('data-target-topic'), 10);
      const current = parseHashRoute();
      pendingNavigationAction = {
        openTopicIndex: targetTopicIdx,
        scrollToId: 'topic-row-' + targetTopicIdx
      };
      if (current === '/beledciler') {
        handleRouteChange();
      } else {
        window.location.hash = '#/beledciler';
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
    shareActionLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTopicIdx = parseInt(shareActionLink.getAttribute('data-target-topic'), 10) || 4;
      const current = parseHashRoute();
      pendingNavigationAction = {
        openTopicIndex: targetTopicIdx,
        scrollToId: 'topic-row-' + targetTopicIdx
      };
      if (current === '/beledciler') {
        handleRouteChange();
      } else {
        window.location.hash = '#/beledciler';
      }
    });
  }
  /* SHARE AWARENESS END */

  /* TOOLS START */
  // Pulsuz yoxlama alətləri (Have I Been Pwned, ScamAdviser, TinEye):
  // Xarici platformalara birbaşa və təhlükəsiz keçid üçün standart HTML linkləri kimi işləyir.
  /* TOOLS END */

  // =========================================================================
  // Multi-View Sayt və Hash Router İdarəetməsi
  // =========================================================================
  const ROUTES = {
    '/': {
      title: 'Ana səhifə | Kiber Savadlılıq',
      headingId: 'share-awareness-heading'
    },
    '/niye-vacibdir': {
      title: 'Niyə vacibdir | Kiber Savadlılıq',
      headingId: 'matters-heading'
    },
    '/beledciler': {
      title: 'Əsas bələdçilər | Kiber Savadlılıq',
      headingId: 'topics-heading'
    },
    '/tecili-addimlar': {
      title: 'Təcili addımlar | Kiber Savadlılıq',
      headingId: 'emergency-heading'
    },
    '/test': {
      title: 'Dələduz testi | Kiber Savadlılıq',
      headingId: 'quiz-heading'
    },
    '/lugat': {
      title: 'Lüğət | Kiber Savadlılıq',
      headingId: 'glossary-heading'
    },
    '/qurumlar': {
      title: 'Rəsmi qurumlar | Kiber Savadlılıq',
      headingId: 'resources-heading'
    }
  };

  const ROUTE_ALIASES = {
    '/': '/',
    '': '/',
    '/home': '/',
    '/hero': '/',
    '/share-awareness': '/',
    '/october-challenge': '/',
    '/matters': '/niye-vacibdir',
    '/topics': '/beledciler',
    '/emergency': '/tecili-addimlar',
    '/quiz': '/test',
    '/glossary': '/lugat',
    '/resources': '/qurumlar'
  };

  let pendingNavigationAction = null;

  function parseHashRoute() {
    const raw = window.location.hash || '';
    if (!raw || raw === '#' || raw === '#/') return '/';
    let path = raw.replace(/^#/, '').trim();
    if (!path.startsWith('/')) path = '/' + path;
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    if (ROUTE_ALIASES[path]) return ROUTE_ALIASES[path];
    if (ROUTES[path]) return path;
    return '/'; // naməlum hash ana səhifəyə yönləndirilir
  }

  function handleRouteChange() {
    const activeRoute = parseHashRoute();
    const routeConfig = ROUTES[activeRoute] || ROUTES['/'];

    // Başlığı yenilə
    document.title = routeConfig.title;

    // Yalnız aktiv səhifəni göstər, digərlərini gizlət
    const allPages = document.querySelectorAll('section[data-page]');
    allPages.forEach((page) => {
      const pageRoute = page.getAttribute('data-page');
      if (pageRoute === activeRoute) {
        page.removeAttribute('hidden');
        void page.offsetWidth; // animasiya üçün reflow
      } else {
        page.setAttribute('hidden', '');
      }
    });

    // Naviqasiya linklərinin aktiv vəziyyəti (desktop + mobil + wordmark)
    const allNavAnchors = document.querySelectorAll('.nav-link, .mobile-links-list a, .wordmark');
    allNavAnchors.forEach((a) => {
      const href = a.getAttribute('href');
      let matches = false;
      if (a.classList.contains('wordmark')) {
        matches = (activeRoute === '/');
      } else if (href === '#/' && activeRoute === '/') {
        matches = true;
      } else if (href === '#' + activeRoute) {
        matches = true;
      }
      if (matches) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('is-active');
      } else {
        a.removeAttribute('aria-current');
        a.classList.remove('is-active');
      }
    });

    // Əgər keçid üçün təyin edilmiş xüsusi tapşırıq varsa (akkordeon açmaq, elementə sürüşdürmək)
    if (pendingNavigationAction) {
      const action = pendingNavigationAction;
      pendingNavigationAction = null;
      if (typeof action.openTopicIndex === 'number') {
        openTopicByIndex(action.openTopicIndex);
      }
      if (action.scrollToId) {
        const el = document.getElementById(action.scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }

    // Əks halda yuxarıya sürüşdür və səhifənin əsas başlığına fokus ver
    window.scrollTo({ top: 0, behavior: 'auto' });
    const heading = document.getElementById(routeConfig.headingId);
    if (heading) {
      heading.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', handleRouteChange);

  // Səhifə yüklənəndə cari marşrutu işə sal
  handleRouteChange();

  // Wordmark linki ana səhifədə olanda yuxarıya sürüşdürsün
  const wordmarkLink = document.querySelector('.wordmark');
  if (wordmarkLink) {
    wordmarkLink.addEventListener('click', (e) => {
      const current = parseHashRoute();
      if (current === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Footer yuxarı qayıt düyməsi
  const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();

  // =========================================================================
  // Subtle Fade-in on Scroll for Sections Only
  // =========================================================================
  function initSectionScrollAnimations() {
    const sections = document.querySelectorAll('.fade-in-section, .editorial-section, .hero-section');
    if (!sections.length) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((sec) => sec.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    sections.forEach((sec) => {
      sec.classList.add('fade-in-section');
      // If already in viewport on load, show immediately
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        sec.classList.add('is-visible');
      }
      observer.observe(sec);
    });

    // When route changes, ensure sections in newly active view are observed & revealed
    window.addEventListener('hashchange', () => {
      setTimeout(() => {
        const activeView = document.querySelector('section[data-page]:not([hidden])');
        if (activeView) {
          const viewSections = activeView.querySelectorAll('.fade-in-section, .editorial-section');
          viewSections.forEach((s) => {
            const rect = s.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              s.classList.add('is-visible');
            }
          });
        }
      }, 50);
    });
  }

  initSectionScrollAnimations();
