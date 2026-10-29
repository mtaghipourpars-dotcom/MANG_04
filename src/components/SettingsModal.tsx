import React from 'react';
import { X, Moon, Sun, Globe, RefreshCw, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onResetData: () => Promise<void>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  theme,
  setTheme,
  onResetData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#131e3a] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 my-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>{lang === 'fa' ? 'تنظیمات سامانه و پوسته' : 'System & Theme Settings'}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Switching */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">
            {lang === 'fa' ? 'پوسته ظاهری (Theme):' : 'Appearance Theme:'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-extrabold transition-all ${
                theme === 'dark'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-[#0b1328] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>{lang === 'fa' ? 'تاریک (Dark)' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-extrabold transition-all ${
                theme === 'light'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-[#0b1328] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{lang === 'fa' ? 'روشن (Light)' : 'Light Mode'}</span>
            </button>
          </div>
        </div>

        {/* Language Switching */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">
            {lang === 'fa' ? 'زبان رابط کاربری (Language & Layout):' : 'Interface Language:'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLang('fa')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-extrabold transition-all ${
                lang === 'fa'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-[#0b1328] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>فارسی (RTL)</span>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-extrabold transition-all ${
                lang === 'en'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-[#0b1328] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>English (LTR)</span>
            </button>
          </div>
        </div>

        {/* Database Reset */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300">
            {lang === 'fa' ? 'بازنشانی داده‌های نمونه (DEMO_SYNTHETIC):' : 'Reset Synthetic Demo Fixtures:'}
          </label>
          <button
            onClick={onResetData}
            className="w-full p-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{lang === 'fa' ? 'بازیابی مقادیر اولیه داده‌های نمونه' : 'Restore Default Demo State'}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-slate-500 text-center font-medium pt-2 border-t border-slate-800/60">
          PARS Value Protection Tower v1.0.0 — MANG_04 Architecture
        </div>
      </div>
    </div>
  );
};
