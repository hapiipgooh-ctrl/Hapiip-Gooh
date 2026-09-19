import React, { useState } from 'react';
import { Play, Image, Eye, Film, X, Check, Share2 } from 'lucide-react';
import { MULTIMEDIA_ITEMS } from '../data/newsData';

export const MultimediaSection: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<typeof MULTIMEDIA_ITEMS[0] | null>(null);

  return (
    <section aria-label="Muuqaallo iyo Sawirro" className="py-10 bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-600 rounded-lg">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Muuqaallo & Sawirro
              </h2>
              <p className="text-xs text-gray-400">
                Warbixinnada muuqaalka ah iyo sawirrada qaaliga ah ee Soomaaliya
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-red-400 hover:text-red-300 cursor-pointer hidden sm:inline">
            Kanaalka YouTube ee BRENKNEWS &rarr;
          </span>
        </div>

        {/* Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MULTIMEDIA_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all cursor-pointer group shadow-md flex flex-col justify-between"
            >
              {/* Thumbnail with overlay icon */}
              <div className="relative aspect-16/9 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                
                {/* Play / Image Button Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    {item.type === 'video' ? (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    ) : (
                      <Image className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Duration / Counter badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {item.duration}
                </div>
              </div>

              {/* Text */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-medium text-sm text-gray-200 group-hover:text-white line-clamp-2">
                  {item.title}
                </h3>
                <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span>{item.author}</span>
                  <span className="text-red-400 font-mono text-[11px]">{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Media Lightbox / Player Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {selectedMedia.type === 'video' ? 'Muuqaal Rasmi ah' : 'Koleyjka Sawirrada'}
                </span>
                <span className="text-xs text-gray-400">{selectedMedia.duration}</span>
              </div>
              <button
                id="close-media-modal-btn"
                onClick={() => setSelectedMedia(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Simulation Canvas */}
            <div className="relative aspect-16/9 bg-black flex items-center justify-center">
              <img
                src={selectedMedia.thumbnail}
                alt={selectedMedia.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
              <div className="absolute flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <span className="text-xs font-semibold text-white bg-black/70 px-3 py-1 rounded-full">
                  Muuqaalka BRENKNEWS HD (Toos loo daaranayaa...)
                </span>
              </div>
            </div>

            {/* Title & Info */}
            <div className="p-5">
              <h3 className="font-bold text-base sm:text-lg text-white">
                {selectedMedia.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Wariyaha soo diyaariyay: {selectedMedia.author} • {selectedMedia.views}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">Xarunta Warbaahinta BRENKNEWS Muqdisho</span>
                <button
                  id="close-preview-btn"
                  onClick={() => setSelectedMedia(null)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Xir Daaqadda
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
