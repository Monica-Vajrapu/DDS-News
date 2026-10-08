import React, { useState } from 'react';
import { X, ShieldCheck, User as UserIcon, Mail, Lock, ArrowRight } from 'lucide-react';
import { User } from '../types/news';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  initialTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  initialTab = 'login',
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: name.trim() || (role === 'admin' ? 'Admin Editor' : 'DDS Reader'),
      email: email.trim() || (role === 'admin' ? 'admin@ddsnews.com' : 'reader@ddsnews.com'),
      role: role,
    };
    onLogin(newUser);
    onClose();
  };

  const handleQuickLogin = (quickRole: 'admin' | 'user') => {
    if (quickRole === 'admin') {
      onLogin({
        id: 'admin-1',
        name: 'DDS Admin',
        email: 'admin@ddsnews.com',
        role: 'admin',
      });
    } else {
      onLogin({
        id: 'user-1',
        name: 'Tech Reader',
        email: 'reader@ddsnews.com',
        role: 'user',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
              DDS
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {tab === 'login' ? 'Sign In to DDS News' : 'Create an Account'}
              </h3>
              <p className="text-xs text-slate-600">
                {tab === 'login' ? 'Access saved articles and news feeds' : 'Join our tech readers community'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Presets */}
        <div className="p-6 bg-blue-50/60 border-b border-blue-100/70">
          <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2.5">
            Quick Demo Access (Instant)
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex items-center justify-center gap-2 p-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-200" />
              <span>Log In as Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('user')}
              className="flex items-center justify-center gap-2 p-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              <UserIcon className="w-4 h-4 text-slate-600" />
              <span>Log In as Reader</span>
            </button>
          </div>
          <p className="text-[11px] text-blue-600 mt-2 text-center">
            Logging in as Admin unlocks the Admin Desk. Reader account hides the desk.
          </p>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          </div>

          {/* Account Role Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Account Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label 
                className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition ${
                  role === 'user' 
                    ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-semibold' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="accent-blue-600"
                />
                <span>Reader (Standard)</span>
              </label>

              <label 
                className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition ${
                  role === 'admin' 
                    ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-semibold' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="accent-blue-600"
                />
                <span>Admin (Editor)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{tab === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              {tab === 'login'
                ? "Don't have an account? Sign up here"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
