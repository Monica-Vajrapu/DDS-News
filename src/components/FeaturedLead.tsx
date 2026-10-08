import React from 'react';
import { Bookmark, Clock, Share2, Sparkles, ArrowRight, CheckCircle2, Eye, Heart, MessageSquare } from 'lucide-react';
import { Article } from '../types/news';

interface FeaturedLeadProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onShare: (article: Article) => void;
}

export const FeaturedLead: React.FC<FeaturedLeadProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  onShare,
}) => {
  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Big Visual Media */}
        <div 
          className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] bg-slate-900 overflow-hidden cursor-pointer group"
          onClick={() => onSelect(article)}
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Top Story
            </span>
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Breaking
              </span>
            )}
          </div>

          {article.imageCaption && (
            <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-300 bg-slate-950/70 backdrop-blur-xs px-3 py-1.5 rounded-lg line-clamp-1 hidden sm:block">
              📷 {article.imageCaption}
            </div>
          )}
        </div>

        {/* Right Column: Editorial Details */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {article.category}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onShare(article)}
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Share Story"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleBookmark(article.id)}
                  className={`p-1.5 rounded-lg transition ${
                    isBookmarked ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h2 
              onClick={() => onSelect(article)}
              className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight hover:text-blue-600 transition cursor-pointer mb-3"
            >
              {article.title}
            </h2>

            {/* Standfirst */}
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {article.summary}
            </p>

            {/* Highlights if provided */}
            {article.highlights && article.highlights.length > 0 && (
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl mb-5">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Key Takeaways
                </p>
                <ul className="space-y-1.5">
                  {article.highlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Byline and CTA */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900 block">{article.author}</span>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>{article.views.toLocaleString()}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span>{article.likes.toLocaleString()}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {article.publishedAt}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelect(article)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition cursor-pointer"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
