import React, { useState, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Pause, Play, AlertCircle } from 'lucide-react';
import { BREAKING_NEWS_ITEMS } from '../data/newsData';
import { BreakingItem } from '../types';

interface BreakingNewsTickerProps {
  onSelectArticleById: (articleId: string) => void;
  items?: BreakingItem[];
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  onSelectArticleById,
  items,
}) => {
  const activeItems = items && items.length > 0 ? items : BREAKING_NEWS_ITEMS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || activeItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeItems.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, activeItems.length]);

  const currentItem = activeItems[currentIndex] || activeItems[0] || BREAKING_NEWS_ITEMS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeItems.length) % activeItems.length);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-11 sm:h-12 overflow-hidden">
          
          {/* Breaking News Label */}
          <div className="flex items-center gap-1.5 bg-red-600 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 rounded-sm shrink-0 z-10 select-none shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>WAR DEG DEG AH</span>
          </div>

          {/* Ticker Content area */}
          <div 
            className="flex-1 px-3 sm:px-4 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block bg-gray-100 text-red-600 font-bold text-[10px] px-2 py-0.5 rounded border border-red-100 shrink-0">
                {currentItem.category}
              </span>

              <button
                id={`breaking-item-${currentItem.id}`}
                onClick={() => onSelectArticleById(currentItem.articleId)}
                className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors text-left truncate cursor-pointer"
                title={currentItem.title}
              >
                {currentItem.title}
              </button>

              <span className="hidden sm:inline text-[11px] text-gray-500 shrink-0">
                • {currentItem.time}
              </span>
            </div>
          </div>

          {/* Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-1 pl-2 shrink-0 border-l border-gray-100">
            <span className="text-[11px] font-mono text-gray-600 hidden md:inline px-1">
              {currentIndex + 1}/{activeItems.length}
            </span>
            <button
              id="ticker-prev-btn"
              onClick={handlePrev}
              className="p-1 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded cursor-pointer transition-colors"
              aria-label="Wararkii hore"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="ticker-pause-btn"
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded cursor-pointer transition-colors"
              aria-label={isPaused ? "Sii wad" : "Hakad"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              id="ticker-next-btn"
              onClick={handleNext}
              className="p-1 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded cursor-pointer transition-colors"
              aria-label="Warka xiga"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
