import React from 'react';
import { TrendingUp, MapPin, Cpu, ArrowRight, Building, Anchor, Smartphone } from 'lucide-react';
import { Article, CategoryId } from '../types';

interface CategoryShowcaseProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  const economyArticles = articles.filter((a) => a.category === 'dhaqaalaha');
  const regionalArticles = articles.filter((a) => a.category === 'gobollada');
  const techArticles = articles.filter((a) => a.category === 'farsamada');

  return (
    <section aria-label="Wararka Qeybaha" className="py-10 bg-[#F1F3F5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100 px-3 py-1 rounded-full">
            Dabagalka Gaarka ah
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
            Diiradda: Dhaqaalaha & Gobollada Soomaaliya
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Warbixinno qoto dheer oo ku saabsan kaabayaasha dhaqaalaha, ganacsiga badda, iyo horumarka maamullada dalka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Economy & Business Block */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-red-600 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-950 uppercase tracking-tight">
                    Dhaqaalaha & Ganacsiga
                  </h3>
                </div>
                <button
                  id="view-all-economy-btn"
                  onClick={() => onSelectCategory('dhaqaalaha')}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Dhammaan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lead Economy Story */}
              {economyArticles[0] && (
                <div 
                  onClick={() => onSelectArticle(economyArticles[0])}
                  className="cursor-pointer group mb-5"
                >
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-3">
                    <img
                      src={economyArticles[0].imageUrl}
                      alt={economyArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Warbixin Gaar ah
                    </span>
                  </div>
                  <h4 className="font-serif-headline text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {economyArticles[0].title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">
                    {economyArticles[0].excerpt}
                  </p>
                </div>
              )}

              {/* Secondary Economy Items */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                {economyArticles.slice(1, 3).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="flex gap-3 group cursor-pointer items-start"
                  >
                    <img 
                      src={art.imageUrl} 
                      alt={art.title} 
                      className="w-20 h-16 object-cover rounded-lg shrink-0" 
                    />
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase">{art.subcategory || 'Ganacsiga'}</span>
                      <h5 className="font-serif-headline text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Indicators Snippet */}
            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs bg-gray-50 p-2.5 rounded-xl">
              <div>
                <span className="text-gray-400 block text-[10px]">Dhoofka Xoolaha</span>
                <strong className="text-emerald-600 font-mono">+45% Gu'</strong>
              </div>
              <div className="border-x border-gray-200">
                <span className="text-gray-400 block text-[10px]">Dhoofka Muuska</span>
                <strong className="text-emerald-600 font-mono">+28% Gu'</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Canshuurta Dekedda</span>
                <strong className="text-gray-800 font-mono">$18.2M</strong>
              </div>
            </div>
          </div>

          {/* Regional News Block */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-red-600 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-950 uppercase tracking-tight">
                    Gobollada Dalka
                  </h3>
                </div>
                <button
                  id="view-all-regional-btn"
                  onClick={() => onSelectCategory('gobollada')}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Dhammaan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lead Regional Story */}
              {regionalArticles[0] && (
                <div 
                  onClick={() => onSelectArticle(regionalArticles[0])}
                  className="cursor-pointer group mb-5"
                >
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-3">
                    <img
                      src={regionalArticles[0].imageUrl}
                      alt={regionalArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {regionalArticles[0].subcategory || 'Puntland'}
                    </span>
                  </div>
                  <h4 className="font-serif-headline text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {regionalArticles[0].title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">
                    {regionalArticles[0].excerpt}
                  </p>
                </div>
              )}

              {/* Secondary Regional Items */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                {regionalArticles.slice(1, 3).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="flex gap-3 group cursor-pointer items-start"
                  >
                    <img 
                      src={art.imageUrl} 
                      alt={art.title} 
                      className="w-20 h-16 object-cover rounded-lg shrink-0" 
                    />
                    <div>
                      <span className="text-[10px] text-red-600 font-bold uppercase">{art.subcategory || 'Somaliland'}</span>
                      <h5 className="font-serif-headline text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Bureau quick links */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-1.5 text-[11px]">
              {['Banaadir', 'Garoowe', 'Berbera', 'Kismaayo', 'Baydhabo'].map((city, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">
                  {city}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
