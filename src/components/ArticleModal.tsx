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
  Lock,
  Eye,
  ThumbsUp,
  User as UserIcon,
  Sparkles
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
  onOpenAuth: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onLikeArticle,
  onAddComment,
  currentUser,
  onOpenAuth,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [copiedToast, setCopiedToast] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  if (!article) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!commentInput.trim()) return;
    onAddComment(article.id, commentInput.trim());
    setCommentInput('');
  };

  const handleLike = () => {
    onLikeArticle(article.id);
    setHasLiked(!hasLiked);
  };

  const shareUrl = window.location.href;

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

  const paragraphs = article.content.split('\n\n').filter(p => p.trim().length > 0);
  const isLoggedIn = !!currentUser;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-6 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {article.category}
            </span>
            <span className="text-xs text-slate-300 hidden sm:inline">•</span>
            <span className="text-xs text-slate-500 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Sizing */}
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
              className={`p-2 rounded-xl border transition cursor-pointer ${
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
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
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

          {/* Byline, Original Live Views & Date */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5 border-y border-slate-100 text-xs sm:text-sm text-slate-600">
            <div>
              <span className="font-bold text-slate-900">{article.author}</span>
              <span className="text-slate-400 ml-2">Published {article.publishedAt}</span>
            </div>

            {/* Live Metrics: Views & Likes */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>{article.views.toLocaleString()} views</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>{article.likes.toLocaleString()} likes</span>
              </span>
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

          {/* If Logged In: Show Full Content & Highlights */}
          {isLoggedIn ? (
            <>
              {/* Key Highlights */}
              {article.highlights && article.highlights.length > 0 && (
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2.5">
                  <p className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Key Story Highlights
                  </p>
                  <ul className="space-y-2">
                    {article.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Article Text */}
              <div className={`space-y-4 text-slate-800 leading-relaxed ${
                fontSize === 'huge' ? 'text-lg leading-loose' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm sm:text-base'
              }`}>
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </>
          ) : (
            /* If Not Logged In: Show First Paragraph + Login Paywall */
            <div className="space-y-5">
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {paragraphs[0] || article.summary}
              </p>

              {/* Login Paywall Gate */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-blue-50/80 to-white border border-blue-200/80 text-center shadow-xs">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Sign in to Read Full Story
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Join our community of technology leaders and readers. Create a free account or sign in to unlock complete technical analysis, highlights, and reader discussions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onOpenAuth}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Log In to Unlock Full Story</span>
                  </button>
                  <button
                    onClick={onOpenAuth}
                    className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm rounded-xl transition cursor-pointer"
                  >
                    <span>Create Free Account</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Social Share & Engagement Strip */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {/* Original Real Like Counter */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    hasLiked
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{article.likes + (hasLiked ? 1 : 0)} Likes</span>
                </button>
              </div>

              {/* Social Channels */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mr-1">
                  Share:
                </span>
                <button
                  onClick={shareToWhatsApp}
                  className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                  title="Share directly to WhatsApp"
                >
                  WhatsApp
                </button>
                <button
                  onClick={handleCopyWhatsAppFormat}
                  className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition cursor-pointer"
                  title="Copy formatted post with thumbnail link"
                >
                  Copy with Thumbnail
                </button>
                <button
                  onClick={shareToLinkedIn}
                  className="px-2.5 py-1.5 bg-[#0077B5] hover:bg-[#006396] text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                  title="Share to LinkedIn"
                >
                  LinkedIn
                </button>
                <button
                  onClick={shareToTwitter}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                  title="Share to X"
                >
                  X (Twitter)
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs transition relative cursor-pointer"
                  title="Copy link"
                >
                  {copiedToast ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {copiedToast && (
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full animate-in fade-in">
                  ✓ Formatted post copied to clipboard!
                </span>
              </div>
            )}
          </div>

          {/* Reader Comments Section */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Reader Discussion ({article.comments?.length || 0})</span>
              </h4>
              <span className="text-xs text-slate-500">Live Community Feedback</span>
            </div>

            {/* Comment Box */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder={isLoggedIn ? `Add your thoughts, ${currentUser.name}...` : "Sign in to join the discussion..."}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onClick={() => {
                  if (!isLoggedIn) onOpenAuth();
                }}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isLoggedIn ? 'Post' : 'Sign In to Post'}</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {article.comments && article.comments.length > 0 ? (
                article.comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                          {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-900">{comment.author}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{comment.date}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-8">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 italic">
                    No comments yet. Be the first reader to share your perspective on this dispatch!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
