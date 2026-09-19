import React from 'react';
import { Bookmark, X, Trash2, ArrowRight, Clock } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAllBookmarks: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAllBookmarks,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-[#111827] text-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-red-500 fill-red-500" />
            <div>
              <h3 className="font-bold text-base">Wararka Aad Keydisay</h3>
              <p className="text-[11px] text-gray-400">
                {bookmarkedArticles.length} warar ah ayaa ku jira keydkaaga
              </p>
            </div>
          </div>
          <button
            id="close-bookmarks-drawer-btn"
            onClick={onClose}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedArticles.length > 0 ? (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex gap-3 group relative hover:bg-white hover:shadow-xs transition-all"
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-20 h-20 object-cover rounded-lg shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                    <span className="text-red-600 font-bold uppercase">{art.categoryLabel}</span>
                    <button
                      id={`remove-bookmark-${art.id}`}
                      onClick={() => onRemoveBookmark(art.id)}
                      className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                      title="Ka saar keydka"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="font-serif-headline text-xs font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer"
                  >
                    {art.title}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                    <button
                      id={`read-bookmarked-${art.id}`}
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="font-bold text-red-600 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Akhri</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                <Bookmark className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">Keydkaagu wuu maran yahay</h4>
              <p className="text-xs text-gray-500 mt-1">
                Guji calaamadda bookmark-ka (keydinta) ee ku dheggan warka kasta si aad mustaqbalka dib ugu akhrisato xitaa marka aadan internet haysan.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <button
              id="clear-all-bookmarks-btn"
              onClick={onClearAllBookmarks}
              className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
            >
              Tirtir Dhammaan Keydka
            </button>
            <button
              id="close-drawer-bottom-btn"
              onClick={onClose}
              className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Xir Daaqadda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
