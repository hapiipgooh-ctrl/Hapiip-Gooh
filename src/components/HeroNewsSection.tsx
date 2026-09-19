import React from 'react';
import { Clock, Eye, MessageSquare, Bookmark, Share2, Flame, ArrowUpRight, Volume2 } from 'lucide-react';
import { Article } from '../types';

interface HeroNewsSectionProps {
  heroArticle: Article;
  subLeadArticles: Article[];
  sideArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: Set<string>;
}

export const HeroNewsSection: React.FC<HeroNewsSectionProps> = ({
  heroArticle,
  subLeadArticles,
  sideArticles,
  onSelectArticle,
  onToggleBookmark,
  bookmarkedIds,
}) => {
  return (
    <section aria-label="Wararka Ugu Waaweyn" className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-red-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-red-600"></span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight">
              Wararka Ugu Waaweyn Maanta
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
            Wararkii ugu dambeeyay ee laga soo xaqiijiyay xafiisyada BRENKNEWS
          </span>
        </div>

        {/* 3-Column Hero Grid (Desktop: 7 cols + 5 cols or 6 cols + 3 cols + 3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Lead Story (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
            {/* Image Container with overlay */}
            <div 
              className="relative aspect-16/10 sm:aspect-16/9 overflow-hidden cursor-pointer"
              onClick={() => onSelectArticle(heroArticle)}
            >
              <img
                src={heroArticle.imageUrl}
                alt={heroArticle.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="bg-red-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded shadow-sm">
                  {heroArticle.categoryLabel}
                </span>
                {heroArticle.isBreaking && (
                  <span className="bg-black/80 backdrop-blur-xs text-white border border-red-500 font-bold text-xs px-2.5 py-1 rounded flex items-center gap-1 shadow-sm">
                    <Flame className="w-3 h-3 text-red-500" />
                    WAR DEG DEG
                  </span>
                )}
              </div>

              {/* Read time pill */}
              <div className="absolute top-3 right-3">
                <button
                  id={`bookmark-hero-${heroArticle.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(heroArticle.id);
                  }}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                    bookmarkedIds.has(heroArticle.id) 
                      ? 'bg-red-600 text-white' 
                      : 'bg-black/50 text-white hover:bg-red-600'
                  }`}
                  aria-label="Keydi warkan"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Bottom overlay text on mobile */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] sm:text-xs text-gray-300 font-medium flex items-center gap-2">
                  <span>{heroArticle.author.name}</span>
                  <span>•</span>
                  <span>{heroArticle.publishedAt}</span>
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
              <div>
                <button
                  id={`hero-article-title-${heroArticle.id}`}
                  onClick={() => onSelectArticle(heroArticle)}
                  className="text-left group cursor-pointer block"
                >
                  <h3 className="font-serif-headline text-xl sm:text-2xl md:text-3xl font-bold text-gray-950 leading-tight group-hover:text-red-600 transition-colors">
                    {heroArticle.title}
                  </h3>
                </button>

                <p className="mt-3 text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">
                  {heroArticle.excerpt}
                </p>
              </div>

              {/* Bottom Meta & Action */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {heroArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-gray-400" />
                    {heroArticle.views.toLocaleString()} akhris
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                    {heroArticle.commentsCount}
                  </span>
                </div>

                <button
                  id={`read-hero-full-btn-${heroArticle.id}`}
                  onClick={() => onSelectArticle(heroArticle)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Sii Akhri</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Side Lead Articles (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 2 Sub-Lead Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 flex-1">
              {subLeadArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col sm:flex-row lg:flex-row h-full"
                >
                  <div 
                    className="relative w-full sm:w-44 lg:w-48 h-44 sm:h-auto shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => onSelectArticle(article)}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                      {article.categoryLabel}
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
                        <span>{article.publishedAt.split(',')[0]}</span>
                        <button
                          id={`bookmark-sub-${article.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(article.id);
                          }}
                          className={`p-1 rounded hover:text-red-600 cursor-pointer ${
                            bookmarkedIds.has(article.id) ? 'text-red-600' : 'text-gray-400'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      <h4 
                        onClick={() => onSelectArticle(article)}
                        className="font-serif-headline text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3 cursor-pointer"
                      >
                        {article.title}
                      </h4>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                      <span>{article.author.name.split(' ')[0]}</span>
                      <span className="text-red-600 font-semibold cursor-pointer" onClick={() => onSelectArticle(article)}>
                        Faahfaahin &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Bulletins Block "Hadda Waxaa Dhacay" */}
            <div className="bg-gray-900 text-white rounded-xl p-4 sm:p-5 border border-gray-800 shadow-md">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-red-400">
                    Hadda Waxaa Dhacay
                  </h4>
                </div>
                <span className="text-[10px] text-gray-400">Toos loo cusbooneysiiyay</span>
              </div>

              <div className="space-y-3">
                {sideArticles.map((art, idx) => (
                  <div 
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="group cursor-pointer pb-2.5 border-b border-gray-800/80 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1">
                      <span className="text-red-400 font-semibold">[{art.categoryLabel}]</span>
                      <span>•</span>
                      <span>{art.publishedAt.split(',')[1] || 'Hadda'}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-red-400 transition-colors line-clamp-2">
                      {art.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
