import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { User } from '../types/news';

export const AUTHORIZED_ADMIN_EMAIL = 'ddsexpoai@gmail.com';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  initialTab?: 'login' | 'signup';
  promptMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  initialTab = 'login',
  promptMessage,
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [loginMode, setLoginMode] = useState<'reader' | 'admin'>('reader');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    // STRICT CHECK: If trying to log in as Admin, email MUST be ddsexpoai@gmail.com
    if (loginMode === 'admin') {
      if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL) {
        setErrorMessage(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized for Admin access. Please select Reader button to log in.`);
        return;
      }

      onLogin({
        id: 'admin-ddsexpoai',
        name: name.trim() || 'DDS Admin',
        email: AUTHORIZED_ADMIN_EMAIL,
        role: 'admin',
      });
      onClose();
      return;
    }

    // READER LOGIN: Any email is allowed, role is strictly 'user' (No Admin Desk)
    onLogin({
      id: 'reader-' + Date.now(),
      name: name.trim() || cleanEmail.split('@')[0] || 'Tech Reader',
      email: cleanEmail,
      role: 'user',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
              DDS
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {tab === 'login' 
                  ? (loginMode === 'admin' ? 'Admin Portal Sign In' : 'Reader Sign In') 
                  : 'Create Reader Account'}
              </h3>
              <p className="text-xs text-slate-500">
                {promptMessage || (tab === 'login' 
                  ? (loginMode === 'admin' ? 'Editorial & content management access' : 'Sign in to unlock full stories and comment')
                  : 'Join our technology news community')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reader and Admin Switcher Buttons */}
        {tab === 'login' && (
          <div className="p-3 bg-slate-50 border-b border-slate-100">
            <div className="grid grid-cols-2 p-1 bg-slate-200/70 rounded-2xl gap-1">
              {/* Reader Button */}
              <button
                type="button"
                onClick={() => {
                  setLoginMode('reader');
                  if (email === AUTHORIZED_ADMIN_EMAIL) setEmail('');
                  setErrorMessage(null);
                }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  loginMode === 'reader'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Reader</span>
              </button>

              {/* Admin Button */}
              <button
                type="button"
                onClick={() => {
                  setLoginMode('admin');
                  setEmail(AUTHORIZED_ADMIN_EMAIL);
                  setErrorMessage(null);
                }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  loginMode === 'admin'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="leading-snug">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Alex Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder={loginMode === 'admin' ? AUTHORIZED_ADMIN_EMAIL : "name@example.com"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2.5 px-4 text-white font-semibold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer mt-2 ${
              loginMode === 'admin'
                ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            <span>
              {tab === 'login' 
                ? (loginMode === 'admin' ? 'Log In as Admin' : 'Log In as Reader')
                : 'Create Reader Account'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setTab(tab === 'login' ? 'signup' : 'login');
                setErrorMessage(null);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              {tab === 'login'
                ? "New to DDS News? Create a free account"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
