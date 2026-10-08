import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

interface FooterProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  onOpenAuth: () => void;
  isAdmin: boolean;
  onOpenAdminDesk: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onSelectCategory,
  onOpenAuth,
  isAdmin,
  onOpenAdminDesk,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
                DDS
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                DDS <span className="text-blue-500 font-extrabold">News</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time technology reporting, autonomous AI benchmarks, enterprise architectures, and DDS Expo AI keynote coverage.
            </p>
          </div>

          {/* Quick Channels / Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Channels
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-white transition"
                >
                  All News
                </button>
              </li>
              {categories.slice(0, 5).map((category) => (
                <li key={category}>
                  <button
                    onClick={() => onSelectCategory(category)}
                    className="hover:text-white transition"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Newsroom Access
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {isAdmin ? (
                <li>
                  <button
                    onClick={onOpenAdminDesk}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition flex items-center gap-1"
                  >
                    <span>🛡️ Launch Admin Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={onOpenAuth}
                    className="hover:text-white transition"
                  >
                    Staff &amp; Editor Sign In
                  </button>
                </li>
              )}
              <li className="text-[11px] text-slate-500">
                Editorial verification powered by DDS Expo AI standard.
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Daily Tech Dispatch
            </h4>
            <p className="text-xs text-slate-400">
              Receive the morning executive summary of AI breakthroughs and hardware updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe to Dispatch</span>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DDS News. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Editorial Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
