import React from 'react';
import { Bookmark, Clock, Share2, Sparkles, User as UserIcon, Eye, Heart, MessageSquare } from 'lucide-react';
import { Article } from '../types/news';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onShare: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  onShare,
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Thumbnail Area */}
      <div 
        className="relative aspect-video w-full bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onSelect(article)}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          onError={(e) => {
            // High-res tech placeholder fallback
            (e.target as HTMLImageElement).src = 
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Breaking Badge if applicable */}
        {article.isBreaking && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            BREAKING
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-blue-700 font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
          {article.category}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Headline */}
          <h3 
            onClick={() => onSelect(article)}
            className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition cursor-pointer mb-2 line-clamp-2"
          >
            {article.title}
          </h3>

          {/* Standfirst / Summary */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>{article.views.toLocaleString()}</span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>{article.likes.toLocaleString()}</span>
            </span>
            {article.comments && article.comments.length > 0 && (
              <span className="flex items-center gap-1 font-medium text-slate-500">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.comments.length}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Share */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(article);
              }}
              title="Share article"
              className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
              className={`p-1.5 rounded-md transition ${
                isBookmarked 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
