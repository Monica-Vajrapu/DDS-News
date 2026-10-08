import React from 'react';
import { 
  Search, 
  Bookmark, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  PlusCircle,
  Menu,
  X
} from 'lucide-react';
import { User } from '../types/news';

interface HeaderProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentUser: User | null;
  onOpenAuth: (initialTab?: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenAdminDesk: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenAdminDesk,
  onOpenBookmarks,
  bookmarkCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md">
      {/* Top Banner / Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand: DDS News */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                onSelectCategory('All');
                onSearchChange('');
              }}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition">
                DDS
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  DDS <span className="text-blue-600 font-extrabold">News</span>
                </span>
                <span className="hidden sm:block text-[11px] font-medium uppercase tracking-wider text-slate-600">
                  Tech &amp; AI Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                placeholder="Search tech updates, AI, agents..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 placeholder:text-slate-600 rounded-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 hover:text-slate-600 font-medium bg-slate-200 hover:bg-slate-300 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bookmarks Button */}
            <button
              onClick={onOpenBookmarks}
              title="Saved Articles"
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Admin Desk Button: ONLY VISIBLE IF CURRENT USER IS ADMIN */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={onOpenAdminDesk}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/20 transition cursor-pointer"
                title="Open Editorial CMS & Publishing Panel"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Desk</span>
              </button>
            )}

            {/* User State / Login Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentUser.role === 'admin' 
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500/30' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-slate-900 leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-600 flex items-center gap-1 font-medium">
                      {currentUser.role === 'admin' ? (
                        <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 inline" /> Admin
                        </span>
                      ) : (
                        'Reader'
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Log Out"
                  className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                placeholder="Search tech articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 text-sm text-slate-900 rounded-lg border border-slate-200 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Category Navigation Bar (Clean & Simple) */}
      <div className="bg-slate-50/80 border-t border-slate-200/60 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 sm:space-x-2 py-2">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                activeCategory === 'All'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              All News
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
