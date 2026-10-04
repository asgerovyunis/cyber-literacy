/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { ShareAwareness } from './components/ShareAwareness';
import { HeroSms } from './components/HeroSms';
import { OctoberChallenge } from './components/OctoberChallenge';
import { MattersView } from './components/MattersView';
import { GuidesView } from './components/GuidesView';
import { EmergencyView } from './components/EmergencyView';
import { QuizView } from './components/QuizView';
import { GlossaryView } from './components/GlossaryView';
import { ResourcesView } from './components/ResourcesView';
import { ShieldCheck, Phone, ArrowUpRight, Lock, CheckCircle } from 'lucide-react';

type TabId = 'home' | 'matters' | 'guides' | 'emergency' | 'quiz' | 'glossary' | 'resources';

const HASH_TO_TAB: Record<string, TabId> = {
  '#/': 'home',
  '#/niye-vacibdir': 'matters',
  '#/beledciler': 'guides',
  '#/tecili-addimlar': 'emergency',
  '#/test': 'quiz',
  '#/lugat': 'glossary',
  '#/qurumlar': 'resources'
};

const TAB_TO_HASH: Record<TabId, string> = {
  home: '#/',
  matters: '#/niye-vacibdir',
  guides: '#/beledciler',
  emergency: '#/tecili-addimlar',
  quiz: '#/test',
  glossary: '#/lugat',
  resources: '#/qurumlar'
};

const TAB_TITLES: Record<TabId, string> = {
  home: 'Cyber Literacy — Hər kəs üçün rəqəmsal təhlükəsizlik bələdçisi',
  matters: 'Niyə vacibdir | Kiber Savadlılıq',
  guides: 'Əsas bələdçilər | Kiber Savadlılıq',
  emergency: 'Təcili addımlar | Kiber Savadlılıq',
  quiz: 'Dələduz testi | Kiber Savadlılıq',
  glossary: 'Lüğət | Kiber Savadlılıq',
  resources: 'Rəsmi qurumlar | Kiber Savadlılıq'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const hash = window.location.hash.toLowerCase();
    return HASH_TO_TAB[hash] || 'home';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('kiber-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [initialGuideIndex, setInitialGuideIndex] = useState<number | null>(null);

  // Sync theme to root HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kiber-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kiber-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Switch tab with hash synchronization & smooth scroll to top
  const handleSelectTab = useCallback((tab: TabId, guideIdx?: number) => {
    setActiveTab(tab);
    if (guideIdx !== undefined) {
      setInitialGuideIndex(guideIdx);
    }
    const targetHash = TAB_TO_HASH[tab];
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = TAB_TITLES[tab] || TAB_TITLES.home;
  }, []);

  // Listen for browser back / forward buttons (hashchange)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const matched = HASH_TO_TAB[hash] || 'home';
      setActiveTab(matched);
      document.title = TAB_TITLES[matched] || TAB_TITLES.home;
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial document title sync
    document.title = TAB_TITLES[activeTab] || TAB_TITLES.home;

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [activeTab]);

  // Jump to October Challenge section smoothly
  const handleGoToChallenge = () => {
    if (activeTab !== 'home') {
      handleSelectTab('home');
      setTimeout(() => {
        const el = document.getElementById('october-challenge');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('october-challenge');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] dark:bg-[#0E1116] text-[#1A1816] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* October Cybersecurity Awareness Banner */}
      <Banner onGoToChallenge={handleGoToChallenge} />

      {/* Primary Sticky Top Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tabId) => handleSelectTab(tabId as TabId)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Multi-View Reading Canvas */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        
        {/* VIEW 1: Ana Səhifə (Home) */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* 1. Share Awareness ("Paylaşmazdan əvvəl") */}
            <ShareAwareness
              onGoToGuide={(idx) => handleSelectTab('guides', idx ?? 4)}
            />

            {/* 2. Hero: Interactive Fake SMS Deconstruction */}
            <HeroSms
              onGoToGuides={() => handleSelectTab('guides')}
              onGoToQuiz={() => handleSelectTab('quiz')}
            />

            {/* 3. October 4-Week Challenge */}
            <OctoberChallenge
              onGoToGuide={(idx) => handleSelectTab('guides', idx)}
              onGoToNextTab={() => handleSelectTab('matters')}
            />
          </div>
        )}

        {/* VIEW 2: Niyə vacibdir */}
        {activeTab === 'matters' && (
          <div className="animate-fadeIn">
            <MattersView onGoToNextTab={() => handleSelectTab('guides')} />
          </div>
        )}

        {/* VIEW 3: Əsas bələdçilər */}
        {activeTab === 'guides' && (
          <div className="animate-fadeIn">
            <GuidesView
              initialOpenIndex={initialGuideIndex}
              onGoToNextTab={() => handleSelectTab('emergency')}
            />
          </div>
        )}

        {/* VIEW 4: Təcili addımlar */}
        {activeTab === 'emergency' && (
          <div className="animate-fadeIn">
            <EmergencyView onGoToNextTab={() => handleSelectTab('quiz')} />
          </div>
        )}

        {/* VIEW 5: Dələduz testi */}
        {activeTab === 'quiz' && (
          <div className="animate-fadeIn">
            <QuizView onGoToNextTab={() => handleSelectTab('glossary')} />
          </div>
        )}

        {/* VIEW 6: Lüğət */}
        {activeTab === 'glossary' && (
          <div className="animate-fadeIn">
            <GlossaryView onGoToNextTab={() => handleSelectTab('resources')} />
          </div>
        )}

        {/* VIEW 7: Rəsmi qurumlar */}
        {activeTab === 'resources' && (
          <div className="animate-fadeIn">
            <ResourcesView onGoToNextTab={() => handleSelectTab('home')} />
          </div>
        )}

      </main>

      {/* Institutional Editorial Colophon Footer */}
      <footer className="border-t border-[#E7E2D9] dark:border-[#252E3B] bg-[#F7F4EE] dark:bg-[#0A0D12] text-[#1A1816] dark:text-[#F0F6FC] transition-colors py-14 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Column 1: Brand & Purpose */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1816] dark:text-[#F0F6FC]">
                  Kiber Savadlılıq
                  <span className="text-[#0F4A38] dark:text-[#2DD4BF] ml-0.5">.</span>
                </span>
              </div>
              <p className="text-sm text-[#6B635B] dark:text-[#8B949E] leading-relaxed max-w-md">
                Azərbaycan vətəndaşları, ailələri və gəncləri üçün müstəqil, qeyri-kommersiya rəqəmsal gigiyena və fırıldaqçılıqdan mühafizə bələdçisi. Məqsədimiz hər kəs üçün təhlükəsiz internet mədəniyyətini sadə və əlçatan etməkdir.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#6B635B] dark:text-[#8B949E]">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#0F4A38] dark:text-[#2DD4BF]" />
                  <span>Şəxsi məlumat toplanmır</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0F4A38] dark:text-[#2DD4BF]" />
                  <span>Tamamilə pulsuz və açıq</span>
                </div>
              </div>
            </div>

            {/* Column 2: Bölmələr */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E] block">
                Bölmələr
              </span>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('home')}
                    className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    Ana Səhifə (Fərqindəlik & SMS Lab)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('matters')}
                    className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    Niyə vacibdir?
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('guides')}
                    className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    Əsas təhlükəsizlik bələdçiləri
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('emergency')}
                    className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    Təcili addımlar (Sızma zamanı)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('quiz')}
                    className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    Dələduz testi (10 real vəziyyət)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('glossary')}
                    className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    Sadə dildə təhlükəsizlik lüğəti
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('resources')}
                    className="text-[#6B635B] dark:text-[#8B949E] hover:text-[#0F4A38] dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    Rəsmi qurumlar kataloqu
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Qaynar Xətlər & Rəsmi Resurslar */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B635B] dark:text-[#8B949E] block">
                Təcili Qaynar Xətlər
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-[#FAF9F5] dark:bg-[#151B23] border border-[#E7E2D9] dark:border-[#252E3B]">
                  <span className="text-[#6B635B] dark:text-[#8B949E]">DİN Polis Zəng Mərkəzi</span>
                  <a href="tel:102" className="font-bold text-[#B91C1C] dark:text-[#F87171] hover:underline">102</a>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#FAF9F5] dark:bg-[#151B23] border border-[#E7E2D9] dark:border-[#252E3B]">
                  <span className="text-[#6B635B] dark:text-[#8B949E]">Elektron Təhlükəsizlik (ETX)</span>
                  <a href="tel:1654" className="font-bold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline">1654</a>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#FAF9F5] dark:bg-[#151B23] border border-[#E7E2D9] dark:border-[#252E3B]">
                  <span className="text-[#6B635B] dark:text-[#8B949E]">Mərkəzi Bank Qaynar Xətt</span>
                  <a href="tel:966" className="font-bold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline">966</a>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#FAF9F5] dark:bg-[#151B23] border border-[#E7E2D9] dark:border-[#252E3B]">
                  <span className="text-[#6B635B] dark:text-[#8B949E]">Azərpoçt Müştəri Xidməti</span>
                  <a href="tel:169" className="font-bold text-[#0F4A38] dark:text-[#2DD4BF] hover:underline">169</a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Colophon Bar */}
          <div className="pt-8 border-t border-[#E7E2D9] dark:border-[#252E3B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B635B] dark:text-[#8B949E]">
            <p>
              © 2026 Kiber Savadlılıq Təşəbbüsü. Bütün hüquqlar qorunur.
            </p>
            <p className="text-center sm:text-right">
              Şübhəli keçidlərə daxil olmayın, 5 saniyə dayanın və rəsmi mənbədən yoxlayın.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
