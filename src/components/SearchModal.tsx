import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const popularKeywords = [
    'Doorashooyinka',
    'Dekedda Muqdisho',
    'Garoowe',
    'Ciidanka Xoogga',
    'Berbera',
    'Shabeellaha',
    'Internetka',
  ];

  const filtered = articles.filter((a) => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const lowerQ = query.toLowerCase().trim();
    if (!lowerQ) return matchesCategory;

    const matchesText = 
      a.title.toLowerCase().includes(lowerQ) ||
      a.excerpt.toLowerCase().includes(lowerQ) ||
      a.categoryLabel.toLowerCase().includes(lowerQ) ||
      a.subcategory?.toLowerCase().includes(lowerQ) ||
      a.tags.some((t) => t.toLowerCase().includes(lowerQ)) ||
      a.author.name.toLowerCase().includes(lowerQ);

    return matchesCategory && matchesText;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-200 mt-4 sm:mt-12">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center gap-3 bg-gray-50">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            placeholder="Qor ereyga aad raadinayso (tusaale: Doorashada, Dekedda, Puntland)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base font-medium text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              id="clear-search-query-btn"
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded cursor-pointer"
            >
              Nadiifi
            </button>
          )}
          <button
            id="close-search-modal-btn"
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-4 sm:px-5 py-3 bg-white border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] shrink-0">
            Ugu Raadiska Badan:
          </span>
          {popularKeywords.map((kw, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(kw)}
              className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 px-2.5 py-1 rounded-full font-medium shrink-0 cursor-pointer transition-colors"
            >
              #{kw}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>
              {query ? `Natiijooyinka baaritaanka "${query}":` : 'Wararka ugu dambeeyay:'}
            </span>
            <span className="font-bold text-gray-800">{filtered.length} laga helay</span>
          </div>

          {filtered.length > 0 ? (
            filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="p-3 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50/30 transition-all cursor-pointer flex gap-3 group"
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-20 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1">
                    <span className="bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded uppercase">
                      {art.categoryLabel}
                    </span>
                    <span>•</span>
                    <span>{art.publishedAt.split(',')[0]}</span>
                  </div>
                  <h4 className="font-serif-headline text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {art.excerpt}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-gray-700">
                Lama helin warar u dhigma raadintaada "{query}".
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Fadlan hubi higgaadda ama isku day ereyo kale sida "Muqdisho" ama "Dhaqaalaha".
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
          <span>BRENKNEWS Raadinta Tooska ah</span>
          <span>Riix <kbd className="bg-white px-1.5 py-0.5 rounded border border-gray-300 font-mono text-[10px]">ESC</kbd> si aad u xirto</span>
        </div>
      </div>
    </div>
  );
};
