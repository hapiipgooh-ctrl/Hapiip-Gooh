import React from 'react';
import { Flame, Eye, ArrowRight, Radio, Mic, Volume2, Play } from 'lucide-react';
import { Article } from '../types';

interface TrendingSectionProps {
  trendingArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenLive: () => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  trendingArticles,
  onSelectArticle,
  onOpenLive,
}) => {
  return (
    <section aria-label="Ugu Akhriska Badan" className="py-6 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600 fill-red-600 animate-bounce" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight">
              Ugu Akhriska Badan Todobaadkan
            </h2>
          </div>
          <span className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer">
            Dhammaan Wararka Kulul &rarr;
          </span>
        </div>

        {/* 5-Item Bento / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendingArticles.slice(0, 5).map((article, index) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200/80 hover:border-red-300 hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Rank Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-brand text-3xl sm:text-4xl font-black text-gray-300 group-hover:text-red-600 transition-colors">
                  0{index + 1}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-gray-200">
                  {article.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <div className="my-1">
                <h3 className="font-serif-headline text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3 leading-snug">
                  {article.title}
                </h3>
              </div>

              {/* Footer Meta */}
              <div className="mt-3 pt-2.5 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3 h-3 text-red-500" />
                  {article.views.toLocaleString()}
                </span>
                <span className="text-gray-400">
                  {article.readTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Podcast / Radio Banner below Trending */}
        <div className="mt-6 bg-[#111827] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shrink-0 shadow-md">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-950 text-red-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-red-800">
                  BRENK PODCAST
                </span>
                <span className="text-xs text-gray-400">Qeybta 42-aad</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                Barnaamijka Falanqeynta: Dhaqaalaha Soomaaliya iyo Isbeddelka Sicirka Sarifka Shilin Soomaaliga
              </h4>
            </div>
          </div>

          <button
            id="listen-podcast-btn"
            onClick={onOpenLive}
            className="w-full sm:w-auto shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Dhageyso Barnaamijka (24:10 min)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
