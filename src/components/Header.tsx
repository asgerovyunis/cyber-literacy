import React, { useState } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'matters', label: 'Niyə vacibdir' },
    { id: 'guides', label: 'Əsas bələdçilər' },
    { id: 'emergency', label: 'Təcili addımlar' },
    { id: 'quiz', label: 'Dələduz testi' },
    { id: 'glossary', label: 'Lüğət' },
    { id: 'resources', label: 'Rəsmi qurumlar' }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5]/90 dark:bg-[#0E1116]/90 transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-6">
        
        {/* Zone 1: Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group text-left shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0F4A38] dark:focus-visible:outline-[#2DD4BF] rounded-sm"
          aria-label="Kiber Savadlılıq ana səhifə"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1A1816] dark:text-[#F0F6FC]">
            Kiber Savadlılıq
            <span className="text-[#0F4A38] dark:text-[#2DD4BF] ml-0.5">.</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1 min-w-0" aria-label="Əsas naviqasiya">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`text-[15px] font-medium tracking-tight whitespace-nowrap py-1 border-b-2 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#0F4A38] dark:text-[#2DD4BF] border-[#0F4A38] dark:border-[#2DD4BF] font-semibold'
                    : 'text-[#6B635B] dark:text-[#8B949E] border-transparent hover:text-[#1A1816] dark:hover:text-[#F0F6FC] hover:border-[#E7E2D9]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Emergency Action Button */}
          <button
            type="button"
            onClick={() => handleNavClick('emergency')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#EF4444]/30 text-[#B91C1C] dark:text-[#F87171] bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 hover:bg-[#FEE2E2] dark:hover:bg-[#7F1D1D]/40 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Təcili Kömək</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-11 h-11 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] flex items-center justify-center text-[#1A1816] dark:text-[#F0F6FC] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430] transition-colors focus-visible:outline-2 focus-visible:outline-[#0F4A38] cursor-pointer"
            aria-label={isDark ? 'İşıqlı rejimə keç' : 'Qaranlıq rejimə keç'}
            aria-pressed={isDark}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isDark ? (
                <>
                  <path d="M12 1.5v2" />
                  <path d="M4.5 4.5l1.5 1.5" />
                  <path d="M19.5 4.5l-1.5 1.5" />
                  <path
                    d="M9 15c-1.5-1.5-2.5-3.2-2.5-5a5.5 5.5 0 1 1 11 0c0 1.8-1 3.5-2.5 5v3H9v-3z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <path d="M9 18h6" />
                  <path d="M10 21h4" />
                </>
              ) : (
                <>
                  <path d="M9 15c-1.5-1.5-2.5-3.2-2.5-5a5.5 5.5 0 1 1 11 0c0 1.8-1 3.5-2.5 5v3H9v-3z" />
                  <path d="M9 18h6" />
                  <path d="M10 21h4" />
                </>
              )}
            </svg>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-md border border-[#E7E2D9] dark:border-[#252E3B] flex items-center justify-center text-[#1A1816] dark:text-[#F0F6FC] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430] transition-colors cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Naviqasiya menyusunu aç/bağla"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E2D9] dark:border-[#252E3B] bg-[#FAF9F5] dark:bg-[#0E1116] px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-[#0F4A38] dark:text-[#2DD4BF] bg-[#0F4A38]/10 dark:bg-[#2DD4BF]/10 font-semibold'
                    : 'text-[#1A1816] dark:text-[#F0F6FC] hover:bg-[#F2ECE1] dark:hover:bg-[#1C2430]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('emergency')}
              className="w-full text-center py-2.5 text-sm font-semibold rounded-md border border-[#EF4444]/30 text-[#B91C1C] dark:text-[#F87171] bg-[#FEF2F2] dark:bg-[#7F1D1D]/20"
            >
              Təcili Addımlar və Qaynar Xətlər
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
