import React from 'react';
import { Newspaper, PlusCircle, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { User } from '../types/news';

interface EmptyStateProps {
  currentUser: User | null;
  onOpenAdminDesk: () => void;
  onOpenAuth: () => void;
  onLoadSamples: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  currentUser,
  onOpenAdminDesk,
  onOpenAuth,
  onLoadSamples,
}) => {
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial from-blue-50/60 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Top Brand Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>DDS News — Clean Tech Hub</span>
          </div>

          {/* Central Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
            <Newspaper className="w-10 h-10" />
          </div>

          {/* Headline & Description */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight max-w-lg mb-3">
            Welcome to DDS News
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mb-8 leading-relaxed">
            Your technology news portal is clean, configured, and ready. 
            Articles and updates published through the Admin Desk will appear here in high-fidelity cards and categories.
          </p>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            {isAdmin ? (
              <button
                onClick={onOpenAdminDesk}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish First Article</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Log In as Admin to Publish</span>
              </button>
            )}

            <button
              onClick={onLoadSamples}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm rounded-xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
              title="Preview how DDS News looks with tech updates"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Preview Sample Stories</span>
            </button>
          </div>

          {/* Feature checklist */}
          <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full">
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <p className="text-xs font-bold text-slate-900 mb-1">Role-Based Admin</p>
              <p className="text-xs text-slate-600">
                Admin desk is restricted to authorized editors. Regular readers enjoy clean reading.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <p className="text-xs font-bold text-slate-900 mb-1">Image &amp; Media Upload</p>
              <p className="text-xs text-slate-600">
                Upload image files from your computer, paste web URLs, or pick from curated tech presets.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <p className="text-xs font-bold text-slate-900 mb-1">Social Media Sharing</p>
              <p className="text-xs text-slate-600">
                Instantly distribute to WhatsApp, LinkedIn, and X / Twitter with formatted post copy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
