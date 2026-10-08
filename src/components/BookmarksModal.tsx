import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types/news';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Saved Articles</h3>
              <p className="text-xs text-slate-500">Your personal reading list ({bookmarkedArticles.length})</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Articles List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {bookmarkedArticles.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
              <p className="text-sm font-semibold text-slate-600">No saved articles yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Click the bookmark icon on any tech story to save it for offline reading.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div 
                key={article.id}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/40 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3 transition"
              >
                <div 
                  className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                >
                  <img
                    src={article.imageUrl}
                    alt=""
                    className="w-14 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-blue-600 uppercase">
                      {article.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{article.readTime}</p>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(article.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
