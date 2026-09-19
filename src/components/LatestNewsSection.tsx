import React, { useState } from 'react';
import { 
  Grid, 
  List, 
  Clock, 
  Bookmark, 
  Share2, 
  ArrowRight, 
  Filter, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { Article, CategoryId } from '../types';
import { CATEGORIES_LIST } from '../data/newsData';

interface LatestNewsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: Set<string>;
  onSelectCategory: (catId: CategoryId) => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  articles,
  onSelectArticle,
  onToggleBookmark,
  bookmarkedIds,
  onSelectCategory,
}) => {
  const [activeFilter, setActiveFilter] = useState<CategoryId>('dhammaan');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(6);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredArticles = activeFilter === 'dhammaan' 
    ? articles 
    : articles.filter((a) => a.category === activeFilter);

  const handleShare = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}#${article.slug}`);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section aria-label="Wararkii Ugu Dambeeyay" className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Filters & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b-2 border-gray-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-red-600"></span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight">
                Wararkii Ugu Dambeeyay
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Kala soco daqiiqad kasta dhacdooyinka ugu waaweyn Soomaaliya
            </p>
          </div>

          {/* Filter Pills & View Mode */}
          <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
            {/* Category pills for quick filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {['dhammaan', 'siyaasadda', 'dhaqaalaha', 'gobollada', 'cayaaraha'].map((catId) => {
                const label = CATEGORIES_LIST.find((c) => c.id === catId)?.nameSo || catId;
                return (
                  <button
                    key={catId}
                    id={`filter-${catId}`}
                    onClick={() => {
                      setActiveFilter(catId as CategoryId);
                      setVisibleCount(6);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                      activeFilter === catId
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Grid / List toggle */}
            <div className="hidden sm:flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
              <button
                id="view-mode-grid"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-gray-950 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Muuqaalka Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                id="view-mode-list"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-gray-950 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Muuqaalka Liiska"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Articles Grid / List Container */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, visibleCount).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Image */}
                <div 
                  className="relative aspect-16/10 overflow-hidden cursor-pointer"
                  onClick={() => onSelectArticle(article)}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-red-600 text-white font-bold text-[11px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                      {article.categoryLabel}
                    </span>
                    {article.subcategory && (
                      <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                        {article.subcategory}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                    <button
                      id={`bookmark-btn-${article.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        bookmarkedIds.has(article.id)
                          ? 'bg-red-600 text-white'
                          : 'bg-black/60 text-white hover:bg-red-600'
                      }`}
                      aria-label="Keydi warkan"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                      <span>{article.publishedAt.split(',')[0]}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectArticle(article)}
                      className="font-serif-headline text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Footer of Card */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name}
                        className="w-5 h-5 rounded-full object-cover" 
                      />
                      <span className="text-gray-700 font-medium text-[11px]">
                        {article.author.name.split(' ')[0]} {article.author.name.split(' ')[1]}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`share-btn-${article.id}`}
                        onClick={(e) => handleShare(e, article)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                        title="La wadaag asxaabtaada"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        id={`read-article-${article.id}`}
                        onClick={() => onSelectArticle(article)}
                        className="font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5 cursor-pointer text-xs"
                      >
                        <span>Akhri</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List Mode */
          <div className="space-y-4">
            {filteredArticles.slice(0, visibleCount).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 group"
              >
                <div 
                  className="w-full sm:w-56 h-40 sm:h-36 shrink-0 rounded-lg overflow-hidden relative cursor-pointer"
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

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <span>{article.publishedAt}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3
                      onClick={() => onSelectArticle(article)}
                      className="font-serif-headline text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="mt-1.5 text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Wariyaha: {article.author.name}</span>
                    <button
                      id={`read-article-list-${article.id}`}
                      onClick={() => onSelectArticle(article)}
                      className="font-bold text-red-600 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Faahfaahin Buuxda</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredArticles.length && (
          <div className="mt-8 text-center">
            <button
              id="load-more-news-btn"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-900 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
            >
              <span>Dheeraad Soo Rarr Wararka</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
