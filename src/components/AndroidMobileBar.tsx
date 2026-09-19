import React from 'react';
import { Home, Layers, Search, Bookmark, Radio, PenSquare } from 'lucide-react';
import { CategoryId } from '../types';

interface AndroidMobileBarProps {
  currentCategory: CategoryId;
  activeView: 'home' | 'category' | 'article' | 'admin';
  onGoHome: () => void;
  onOpenCategories: () => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenLive: () => void;
  onOpenAdmin: () => void;
  bookmarksCount: number;
}

export const AndroidMobileBar: React.FC<AndroidMobileBarProps> = ({
  currentCategory,
  activeView,
  onGoHome,
  onOpenCategories,
  onOpenSearch,
  onOpenBookmarks,
  onOpenLive,
  onOpenAdmin,
  bookmarksCount,
}) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111827] text-gray-300 border-t border-gray-800 shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-5 h-14">
        
        {/* Home */}
        <button
          id="mobile-nav-home"
          onClick={onGoHome}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            activeView === 'home' && currentCategory === 'dhammaan' ? 'text-red-500 font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Hoyga</span>
        </button>

        {/* Categories */}
        <button
          id="mobile-nav-categories"
          onClick={onOpenCategories}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            activeView === 'category' ? 'text-red-500 font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Qeybaha</span>
        </button>

        {/* Admin Studio */}
        <button
          id="mobile-nav-admin"
          onClick={onOpenAdmin}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            activeView === 'admin' ? 'text-red-500 font-bold' : 'text-gray-300 hover:text-white'
          }`}
        >
          <div className="relative p-1 bg-red-600/30 rounded-lg text-red-400">
            <PenSquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-bold tracking-tight text-white">Mulkiile</span>
        </button>

        {/* Bookmarks */}
        <button
          id="mobile-nav-bookmarks"
          onClick={onOpenBookmarks}
          className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-white cursor-pointer transition-colors relative"
        >
          <div className="relative">
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Keydsan</span>
        </button>

        {/* Live */}
        <button
          id="mobile-nav-live"
          onClick={onOpenLive}
          className="flex flex-col items-center justify-center gap-1 text-red-500 hover:text-red-400 cursor-pointer transition-colors"
        >
          <div className="relative">
            <Radio className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          </div>
          <span className="text-[10px] font-bold tracking-tight">Toos</span>
        </button>

      </div>
    </div>
  );
};
