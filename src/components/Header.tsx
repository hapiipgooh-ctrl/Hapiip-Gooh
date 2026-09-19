import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  Flame, 
  Radio, 
  ChevronDown, 
  Share2, 
  Bell, 
  Globe, 
  ShieldAlert, 
  Building2, 
  Compass, 
  Landmark, 
  Trophy, 
  Cpu, 
  FileText,
  PenSquare
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES_LIST, REGIONS_SUBMENU } from '../data/newsData';

interface HeaderProps {
  currentCategory: CategoryId;
  onSelectCategory: (catId: CategoryId, subcategory?: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenLive: () => void;
  onOpenAdmin: () => void;
  bookmarksCount: number;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenLive,
  onOpenAdmin,
  bookmarksCount,
  onGoHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regionsDropdownOpen, setRegionsDropdownOpen] = useState(false);
  const [subscribedToast, setSubscribedToast] = useState(false);

  const handleSubscribePush = () => {
    setSubscribedToast(true);
    setTimeout(() => setSubscribedToast(false), 3500);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      {/* Toast Alert for Push Notifications */}
      {subscribedToast && (
        <div className="bg-red-600 text-white text-xs py-2 px-4 text-center font-medium shadow-md transition-all animate-fade-in flex items-center justify-center gap-2">
          <Bell className="w-3.5 h-3.5 animate-bounce" />
          <span>Waad ku mahadsan tahay! Waxaad heshay ogeysiisyada wararka deg-degga ah ee BRENKNEWS.</span>
        </div>
      )}

      {/* Main Branding Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Hamburger toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-gray-800 hover:text-red-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
              aria-label="Fur menu-ka mobile-ka"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              id="mobile-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              aria-label="Raadi"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo & Tagline */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left cursor-pointer select-none" onClick={onGoHome}>
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
                BRENK<span className="text-red-600">NEWS</span>
              </span>
              <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-600 mb-1 animate-pulse"></span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 tracking-wider uppercase font-semibold mt-0.5">
              Isha Wararka Xaqiiqda ah ee Soomaaliya iyo Caalamka
            </p>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search */}
            <button
              id="desktop-search-trigger"
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3.5 py-2 rounded-full transition-colors cursor-pointer border border-gray-200 shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-gray-500" />
              <span>Raadi warar, mowduucyo...</span>
              <kbd className="bg-white text-gray-400 text-[10px] px-1.5 py-0.5 rounded border border-gray-300">Ctrl+K</kbd>
            </button>

            {/* Notification Bell */}
            <button
              id="header-notification-btn"
              onClick={handleSubscribePush}
              className="relative p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer hidden sm:flex"
              title="Ogeysiisyada Wararka Deg-degga ah"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* Bookmarks Counter */}
            <button
              id="header-bookmarks-btn"
              onClick={onOpenBookmarks}
              className="relative p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
              title="Wararka Aad Keydisay"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarksCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center -ml-1">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Owner Studio Button */}
            <button
              id="header-owner-studio-btn"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 bg-gray-900 hover:bg-red-600 text-white text-xs font-extrabold px-3 py-2 rounded-xl transition-all shadow-sm cursor-pointer ml-1"
              title="Qolka Mulkiilaha - Qor war cusub oo la xiriir shacabka"
            >
              <PenSquare className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
              <span className="hidden sm:inline">Qolka Mulkiilaha</span>
              <span className="sm:hidden">Qor War</span>
            </button>

            {/* Mobile Live Radio */}
            <button
              id="header-live-btn"
              onClick={onOpenLive}
              className="sm:hidden flex items-center gap-1 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-md cursor-pointer"
            >
              <Radio className="w-3 h-3" />
              <span>LIVE</span>
            </button>
          </div>

        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden lg:block bg-[#111827] text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <ul className="flex items-center space-x-1 font-medium text-sm">
              
              {/* Home */}
              <li>
                <button
                  id="nav-home-btn"
                  onClick={onGoHome}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'dhammaan'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Wararka Maanta
                </button>
              </li>

              {/* Siyaasadda */}
              <li>
                <button
                  id="nav-politics-btn"
                  onClick={() => onSelectCategory('siyaasadda')}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'siyaasadda'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Siyaasadda
                </button>
              </li>

              {/* Amniga & Ciidanka */}
              <li>
                <button
                  id="nav-security-btn"
                  onClick={() => onSelectCategory('amniga')}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'amniga'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Amniga
                </button>
              </li>

              {/* Dhaqaalaha */}
              <li>
                <button
                  id="nav-economy-btn"
                  onClick={() => onSelectCategory('dhaqaalaha')}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'dhaqaalaha'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Dhaqaalaha
                </button>
              </li>

              {/* Gobollada with Dropdown */}
              <li 
                className="relative"
                onMouseEnter={() => setRegionsDropdownOpen(true)}
                onMouseLeave={() => setRegionsDropdownOpen(false)}
              >
                <button
                  id="nav-regions-dropdown-btn"
                  onClick={() => onSelectCategory('gobollada')}
                  className={`flex items-center gap-1 px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'gobollada'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  <span>Gobollada Dalka</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {/* Submenu */}
                {regionsDropdownOpen && (
                  <div className="absolute left-0 mt-0 w-64 bg-white text-gray-900 border border-gray-200 rounded-b-lg shadow-xl py-2 z-50 animate-fade-in">
                    <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                      Maamul Goboleedyada
                    </div>
                    {REGIONS_SUBMENU.map((region, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onSelectCategory('gobollada', region.name);
                          setRegionsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{region.name}</span>
                        <span className="text-[10px] text-gray-400">Wararka &rarr;</span>
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Caalamka */}
              <li>
                <button
                  id="nav-world-btn"
                  onClick={() => onSelectCategory('caalamka')}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'caalamka'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Caalamka
                </button>
              </li>

              {/* Farsamada */}
              <li>
                <button
                  id="nav-tech-btn"
                  onClick={() => onSelectCategory('farsamada')}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'farsamada'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Farsamada
                </button>
              </li>

              {/* Cayaaraha */}
              <li>
                <button
                  id="nav-sports-btn"
                  onClick={() => onSelectCategory('cayaaraha')}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'cayaaraha'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Cayaaraha
                </button>
              </li>

              {/* Ra'yiga */}
              <li>
                <button
                  id="nav-opinion-btn"
                  onClick={() => onSelectCategory('rayiga')}
                  className={`px-3 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                    currentCategory === 'rayiga'
                      ? 'border-red-600 text-white bg-gray-800/60'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  Falanqeynta & Ra'yiga
                </button>
              </li>

            </ul>

            {/* Trending Hot Tag on Nav */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-950/40 px-3 py-1 rounded border border-red-800/40">
              <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Doorashada 2026</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Header of Drawer */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#111827] text-white">
              <div>
                <span className="font-brand text-2xl font-black">
                  BRENK<span className="text-red-600">NEWS</span>
                </span>
                <p className="text-[10px] text-gray-400">Wararka Xaqiiqda ah ee Soomaaliya</p>
              </div>
              <button 
                id="close-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="p-4 space-y-1 flex-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Qeybaha Wararka</div>
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id as CategoryId);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    currentCategory === cat.id 
                      ? 'bg-red-50 text-red-600 font-bold' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span>{cat.nameSo}</span>
                  <span className="text-xs text-gray-400 font-normal">{cat.nameEn}</span>
                </button>
              ))}

              <hr className="my-3 border-gray-200" />

              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Gobollada Dalka</div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {REGIONS_SUBMENU.map((reg, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectCategory('gobollada', reg.name);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-xs py-1.5 px-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded"
                  >
                    • {reg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer action */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
              <button
                id="mobile-open-admin-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <PenSquare className="w-4 h-4 text-red-500" />
                <span>Qolka Mulkiilaha (Maamulka Wararka)</span>
              </button>

              <button
                id="mobile-listen-live-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLive();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Radio className="w-4 h-4" />
                <span>Dhageyso BRENKNEWS Toos</span>
              </button>
              <div className="text-center text-[11px] text-gray-500">
                Wixii faahfaahin ah: info@brenknews.so
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
