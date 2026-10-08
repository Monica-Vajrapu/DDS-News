import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';
import { FeaturedLead } from './components/FeaturedLead';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { BookmarksModal } from './components/BookmarksModal';
import { Footer } from './components/Footer';
import { Article, User } from './types/news';
import { DEFAULT_CATEGORIES, SAMPLE_ARTICLES } from './data/sampleArticles';
import { Sparkles, Layers, Trash2 } from 'lucide-react';

const STORAGE_KEYS = {
  ARTICLES: 'dds_news_articles_v1',
  CATEGORIES: 'dds_news_categories_v1',
  USER: 'dds_news_user_v1',
  BOOKMARKS: 'dds_news_bookmarks_v1',
};

export default function App() {
  // Articles state: initialized with DDS Expo AI Keynote story
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [SAMPLE_ARTICLES[0]];
    } catch {
      return [SAMPLE_ARTICLES[0]];
    }
  });

  // Categories state
  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // User auth state: starts null (or restored from storage)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Bookmarked article IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Navigation & Filters
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Auth Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    showToast(`Welcome, ${user.name}! (${user.role === 'admin' ? 'Admin Access Granted' : 'Reader Access'})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAdminPanelOpen(false);
    showToast('Signed out successfully.');
  };

  const handleOpenAuth = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  // Bookmark Handlers
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from bookmarks' : 'Article bookmarked!');
      return updated;
    });
  };

  // Like Article Handler
  const handleLikeArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, likes: (art.likes || 0) + 1 } : art))
    );
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) => (prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null));
    }
  };

  // Add Comment Handler
  const handleAddComment = (articleId: string, commentText: string) => {
    const authorName = currentUser?.name || 'Guest Reader';
    const newComment = {
      id: 'c-' + Date.now(),
      author: authorName,
      text: commentText,
      date: 'Just now',
    };

    setArticles((prev) =>
      prev.map((art) =>
        art.id === articleId
          ? { ...art, comments: [...(art.comments || []), newComment] }
          : art
      )
    );

    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle((prev) =>
        prev
          ? { ...prev, comments: [...(prev.comments || []), newComment] }
          : null
      );
    }
  };

  // Article Admin Handlers
  const handleSaveArticle = (newArticle: Article) => {
    setArticles((prev) => {
      const exists = prev.some((a) => a.id === newArticle.id);
      if (exists) {
        return prev.map((a) => (a.id === newArticle.id ? newArticle : a));
      }
      return [newArticle, ...prev];
    });
    showToast('Article published to DDS News!');
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setBookmarkedIds((prev) => prev.filter((bId) => bId !== id));
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
      showToast('Article removed.');
    }
  };

  // Category Handlers
  const handleAddCategory = (newCat: string) => {
    if (!categories.includes(newCat)) {
      setCategories((prev) => [...prev, newCat]);
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    setCategories((prev) => prev.filter((c) => c !== catToDelete));
    if (activeCategory === catToDelete) {
      setActiveCategory('All');
    }
  };

  // Sample Data Helpers (Quick CEO demo preview & clean clear)
  const handleLoadSamples = () => {
    setArticles(SAMPLE_ARTICLES);
    showToast('Sample tech articles loaded for preview!');
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all articles to return to empty portal?')) {
      setArticles([]);
      setBookmarkedIds([]);
      showToast('All articles cleared. Website is now empty.');
    }
  };

  // Share story helper
  const handleShareArticle = (art: Article) => {
    if (navigator.share) {
      navigator.share({
        title: art.title,
        text: art.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${art.title}\n\n${window.location.href}`);
      showToast('Article link copied to clipboard!');
    }
  };

  // Filter Articles
  const filteredArticles = articles.filter((art) => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Lead Story
  const leadArticle =
    activeCategory === 'All' && !searchQuery.trim()
      ? filteredArticles.find((a) => a.isFeatured) || filteredArticles[0]
      : null;

  // Remaining Grid Stories
  const gridArticles = leadArticle
    ? filteredArticles.filter((a) => a.id !== leadArticle.id)
    : filteredArticles;

  // Bookmarked articles list
  const bookmarkedArticlesList = articles.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenAdminDesk={() => setAdminPanelOpen(true)}
        onOpenBookmarks={() => setBookmarksModalOpen(true)}
        bookmarkCount={bookmarkedIds.length}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* If no articles exist at all: Show clean, clear Empty State */}
        {articles.length === 0 ? (
          <EmptyState
            currentUser={currentUser}
            onOpenAdminDesk={() => setAdminPanelOpen(true)}
            onOpenAuth={() => handleOpenAuth('login')}
            onLoadSamples={handleLoadSamples}
          />
        ) : (
          <>
            {/* Action Bar when articles exist */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeCategory === 'All' ? 'Latest Technology Updates' : activeCategory}
                </h1>
                <p className="text-xs text-slate-500">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'story' : 'stories'} available
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {/* Quick sample toggle controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearAll}
                  className="text-xs text-slate-500 hover:text-red-600 font-medium px-2 py-1 rounded hover:bg-red-50 transition flex items-center gap-1"
                  title="Clear articles to return to empty website"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear to Empty</span>
                </button>
              </div>
            </div>

            {/* If search or filter returned zero results */}
            {filteredArticles.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
                <p className="text-base font-bold text-slate-800">No stories match your criteria</p>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Try selecting a different channel or clearing your search term.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
                >
                  Show All Stories
                </button>
              </div>
            ) : (
              <>
                {/* Featured Hero Story (If on All tab and not searching) */}
                {leadArticle && (
                  <FeaturedLead
                    article={leadArticle}
                    onSelect={setSelectedArticle}
                    isBookmarked={bookmarkedIds.includes(leadArticle.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onShare={handleShareArticle}
                  />
                )}

                {/* News Grid (Clean & Responsive Cards) */}
                {gridArticles.length > 0 && (
                  <div>
                    {leadArticle && (
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>More Tech Dispatches</span>
                      </h3>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gridArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onSelect={setSelectedArticle}
                          isBookmarked={bookmarkedIds.includes(article.id)}
                          onToggleBookmark={handleToggleBookmark}
                          onShare={handleShareArticle}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        categories={categories}
        onSelectCategory={setActiveCategory}
        onOpenAuth={() => handleOpenAuth('login')}
        isAdmin={currentUser?.role === 'admin'}
        onOpenAdminDesk={() => setAdminPanelOpen(true)}
      />

      {/* Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onLikeArticle={handleLikeArticle}
        onAddComment={handleAddComment}
        currentUser={currentUser}
      />

      {/* Admin Panel: Only opened by Admin */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        articles={articles}
        categories={categories}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={handleDeleteArticle}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onLoadSamples={handleLoadSamples}
        onClearAll={handleClearAll}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        initialTab={authModalTab}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={bookmarksModalOpen}
        onClose={() => setBookmarksModalOpen(false)}
        bookmarkedArticles={bookmarkedArticlesList}
        onSelectArticle={setSelectedArticle}
        onRemoveBookmark={handleToggleBookmark}
      />
    </div>
  );
}
