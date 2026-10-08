import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Share2, 
  Heart, 
  Clock, 
  MessageSquare, 
  Send, 
  Check, 
  Copy, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Article, User } from '../types/news';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onLikeArticle: (id: string) => void;
  onAddComment: (articleId: string, commentText: string) => void;
  currentUser: User | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onLikeArticle,
  onAddComment,
  currentUser,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [copiedToast, setCopiedToast] = useState(false);

  if (!article) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(article.id, commentInput.trim());
    setCommentInput('');
  };

  const shareUrl = window.location.href;
  const shareText = `${article.title} - DDS News: ${article.summary}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${article.title}\n\nRead on DDS News: ${shareUrl}`);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2200);
  };

  const handleCopyWhatsAppFormat = () => {
    const highlightsText = article.highlights && article.highlights.length > 0
      ? `\n\n📌 *Key Highlights:*\n` + article.highlights.map(h => `• ${h}`).join('\n')
      : '';
    const text = `*${article.title}*\n\n${article.summary}${highlightsText}\n\n🔗 *Read on DDS News:* ${shareUrl}\n\n🖼️ *Thumbnail Image:* ${article.imageUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2200);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}&hashtags=DDSNews,TechNews,AI`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToWhatsApp = () => {
    const text = `${article.title}\n\n${article.summary}\n\nRead on DDS News: ${shareUrl}\n\nImage: ${article.imageUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-6 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Control Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {article.category}
            </span>
            <span className="text-xs text-slate-600 hidden sm:inline">•</span>
            <span className="text-xs text-slate-600 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-600" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Resize buttons */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs text-slate-600">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded-md transition ${fontSize === 'normal' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'hover:text-slate-900'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-md text-sm transition ${fontSize === 'large' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'hover:text-slate-900'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl border transition ${
                isBookmarked 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600'
              }`}
              title="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-6 space-y-6">
          {/* Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h1>
            <p className="mt-3 text-base text-slate-600 font-normal leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Byline and Date */}
          <div className="flex items-center justify-between py-3 border-y border-slate-100 text-xs sm:text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-900">{article.author}</span>
              <span className="text-slate-600 ml-2">Published: {article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium text-slate-700">{article.views}</span> reads
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 
                  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full max-h-[380px] object-cover"
            />
            {article.imageCaption && (
              <p className="p-3 text-xs text-slate-600 bg-slate-50 border-t border-slate-100">
                📷 {article.imageCaption}
              </p>
            )}
          </div>

          {/* Key Highlights */}
          {article.highlights && article.highlights.length > 0 && (
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Key Story Highlights
              </p>
              <ul className="space-y-2">
                {article.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Text Content */}
          <div className={`space-y-4 text-slate-800 leading-relaxed ${
            fontSize === 'huge' ? 'text-lg leading-loose' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm sm:text-base'
          }`}>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Social Share & Engagement Strip */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLikeArticle(article.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-red-600 hover:border-red-200 shadow-2xs transition"
                >
                  <Heart className={`w-4 h-4 ${article.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{article.likes} Likes</span>
                </button>
              </div>

              {/* Social Channels */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mr-1">
                  Share:
                </span>
                <button
                  onClick={shareToWhatsApp}
                  className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold transition"
                  title="Share directly to WhatsApp"
                >
                  WhatsApp
                </button>
                <button
                  onClick={handleCopyWhatsAppFormat}
                  className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition"
                  title="Copy formatted post including thumbnail image link"
                >
                  Copy with Thumbnail
                </button>
                <button
                  onClick={shareToLinkedIn}
                  className="px-2.5 py-1.5 bg-[#0077B5] hover:bg-[#006396] text-white rounded-lg text-xs font-semibold transition"
                  title="Share to LinkedIn"
                >
                  LinkedIn
                </button>
                <button
                  onClick={shareToTwitter}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition"
                  title="Share to X"
                >
                  X (Twitter)
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs transition relative"
                  title="Copy link"
                >
                  {copiedToast ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {copiedToast && (
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full animate-in fade-in">
                  ✓ Article link copied to clipboard!
                </span>
              </div>
            )}
          </div>

          {/* Reader Comments Section */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Reader Discussion ({article.comments?.length || 0})</span>
            </h4>

            {/* Comment Box */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder={currentUser ? "Write a response..." : "Add your thoughts as a reader..."}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-600 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Existing Comments */}
            <div className="space-y-3">
              {article.comments && article.comments.length > 0 ? (
                article.comments.map((comment) => (
                  <div key={comment.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900">{comment.author}</span>
                      <span className="text-[11px] text-slate-600">{comment.date}</span>
                    </div>
                    <p className="text-slate-700">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-600 italic">
                  Be the first to share your thoughts on this story.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
