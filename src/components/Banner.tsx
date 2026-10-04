import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface BannerProps {
  onGoToChallenge: () => void;
}

export const Banner: React.FC<BannerProps> = ({ onGoToChallenge }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Oktyabr Kibertəhlükəsizlik Maarifləndirmə Ayı elanı"
      className="bg-[#0F4A38] dark:bg-[#134E4A] text-[#F0FDF4] text-xs sm:text-[13px] py-2 px-4 border-b border-[#0D3F30] relative z-50 transition-colors"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
          <span className="font-semibold tracking-wide">
            Oktyabr Kibertəhlükəsizlik üzrə Maarifləndirmə Ayıdır
          </span>
          <span className="hidden sm:inline opacity-40">—</span>
          <button
            type="button"
            onClick={onGoToChallenge}
            className="inline-flex items-center gap-1 font-medium underline underline-offset-4 decoration-[#F0FDF4]/50 hover:decoration-[#F0FDF4] cursor-pointer"
          >
            <span>4 həftəlik rəqəmsal gücləndirmə çağırışına baxın</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 rounded hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
          aria-label="Elanı bağla"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
