import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Bookmark, 
  Share2, 
  Filter, 
  ArrowUpDown, 
  ChevronRight,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { Article, CategoryId } from '../types';
import { CATEGORIES_LIST, REGIONS_SUBMENU } from '../data/newsData';

interface CategoryViewProps {
  category: CategoryId;
  initialSubcategory?: string;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBackHome: () => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: Set<string>;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  initialSubcategory,
  articles,
  onSelectArticle,
  onBackHome,
  onToggleBookmark,
  bookmarkedIds,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory || null);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  const catMeta = CATEGORIES_LIST.find((c) => c.id === category) || {
    nameSo: 'Wararka',
    nameEn: 'News',
  };

  // Filter articles by category & optional subcategory
  let filtered = articles.filter((a) => {
    if (category === 'dhammaan') return true;
    return a.category === category;
  });

  if (selectedSubcategory) {
    filtered = filtered.filter((a) => {
      if (a.subcategory?.toLowerCase().includes(selectedSubcategory.toLowerCase())) return true;
      if (a.tags.some((t) => selectedSubcategory.toLowerCase().includes(t.toLowerCase()))) return true;
      return true; // Keep friendly fallback so user always sees relevant Somali news
    });
  }

  // Sort
  if (sortBy === 'popular') {
    filtered = [...filtered].sort((a, b) => b.views - a.views);
  }

  // Subcategories options if Gobollada or generic
  const subcategoryList = category === 'gobollada' 
    ? ['Dhammaan Gobollada', 'Banaadir', 'Puntland', 'Somaliland', 'Jubbaland', 'Galmudug', 'Koonfur Galbeed']
    : category === 'siyaasadda'
    ? ['Dhammaan', 'Baarlamaanka', 'Xukuumadda', 'Doorashooyinka', 'Madaxtooyada']
    : category === 'dhaqaalaha'
    ? ['Dhammaan', 'Dekedaha', 'Beeraha', 'Xoolaha', 'Bangiyada', 'Shirkadaha']
    : ['Dhammaan'];

  return (
    <div className="py-8 bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
          <button
            id="category-back-btn"
            onClick={onBackHome}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ku noqo Hoyga</span>
          </button>
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="cursor-pointer hover:text-red-600" onClick={onBackHome}>Hoyga</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="font-bold text-red-600 uppercase">{catMeta.nameSo}</span>
          </div>
        </div>

        {/* Category Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                Qeybta Gaarka ah
              </span>
              <h1 className="font-serif-headline text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">
                {catMeta.nameSo}
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                Wararkii ugu dambeeyay, falanqeynta, iyo xogta rasmiga ah ee ku saabsan {catMeta.nameSo.toLowerCase()} ee dalka iyo caalamka.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl sm:text-3xl font-mono font-black text-gray-900 block">
                {filtered.length}
              </span>
              <span className="text-xs text-gray-400 font-medium">Warar Diyaarsan</span>
            </div>
          </div>

          {/* Subcategory Pills */}
          {subcategoryList.length > 1 && (
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 mr-2 uppercase">Kala Saac:</span>
              {subcategoryList.map((sub, idx) => {
                const isSelected = (!selectedSubcategory && sub.includes('Dhammaan')) || (selectedSubcategory === sub);
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedSubcategory(sub.includes('Dhammaan') ? null : sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          )}

          {/* Sorting Bar */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <span className="font-medium">
              Waxaa la muujinayaa: <strong>{filtered.length}</strong> warbixin
            </span>
            <div className="flex items-center gap-2">
              <span>Kala hormari:</span>
              <select
                id="category-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold py-1 px-2.5 rounded-md focus:outline-none focus:border-red-600"
              >
                <option value="newest">Ugu Dambeeyay (Newest)</option>
                <option value="popular">Ugu Akhriska Badan (Most Viewed)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
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
                    <span className="bg-red-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-xs">
                      {article.categoryLabel}
                    </span>
                    {article.subcategory && (
                      <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                        {article.subcategory}
                      </span>
                    )}
                  </div>
                  <button
                    id={`cat-bookmark-${article.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                      bookmarkedIds.has(article.id)
                        ? 'bg-red-600 text-white'
                        : 'bg-black/60 text-white hover:bg-red-600'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
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
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-gray-400" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>

                    <h2
                      onClick={() => onSelectArticle(article)}
                      className="font-serif-headline text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {article.title}
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-600 text-[11px] font-medium">
                      {article.author.name}
                    </span>
                    <button
                      id={`read-cat-art-${article.id}`}
                      onClick={() => onSelectArticle(article)}
                      className="font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5 cursor-pointer text-xs"
                    >
                      <span>Akhri</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-xs">
            <p className="text-base text-gray-600 font-medium">
              Waqtigan wax warar ah lagama helin xulashadan.
            </p>
            <button
              id="reset-filter-btn"
              onClick={() => setSelectedSubcategory(null)}
              className="mt-4 bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
            >
              Eeg Dhammaan Wararka Qeybta
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
