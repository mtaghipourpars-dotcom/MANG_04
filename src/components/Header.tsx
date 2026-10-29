import React, { useState } from 'react';
import { Bell, User, Check, Shield } from 'lucide-react';

interface HeaderProps {
  lang: 'fa' | 'en';
  onOpenSettings: () => void;
  auditCount: number;
}

export const Header: React.FC<HeaderProps> = ({ lang, onOpenSettings, auditCount }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, textFa: 'تأخیر ۱۸ روزه تامین قطعه P-1405 تایید شد', textEn: '18-day delay confirmed for P-1405 component', time: '10 min ago' },
    { id: 2, textFa: 'سررسید مهلت تصمیم P-1405 (کمتر از ۵ روز)', textEn: 'Decision deadline for P-1405 (< 5 days remaining)', time: '1 hour ago' },
    { id: 3, textFa: 'ارزیابی آزمون میانی P-1398 به ثبت رسید', textEn: 'Intermediate test evaluation recorded for P-1398', time: '3 hours ago' },
  ];

  return (
    <header className="relative bg-[#0d1733] border-b border-slate-800 text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-600 rounded flex items-center justify-center font-black text-xl text-white transform -skew-x-12 shadow-lg shadow-red-600/30">
              <span className="transform skew-x-12">PARS</span>
            </div>
            <div className="leading-none">
              <div className="font-extrabold text-lg tracking-wider text-white">PARS</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                MAPNA PARS GENERATOR
              </div>
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="text-center hidden md:block">
          <h1 className="text-xl font-black text-slate-100 tracking-tight">
            {lang === 'fa' ? 'سامانه حفاظت از ارزش پروژه‌ها و تعهدات' : 'PARS VALUE PROTECTION TOWER'}
          </h1>
          <div className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
            PARS VALUE PROTECTION TOWER
          </div>
        </div>

        {/* Right side Profile & Notifications */}
        <div className="flex items-center gap-5 text-sm">
          {/* Date & Time */}
          <div className="hidden lg:flex items-center gap-2 text-slate-300 font-medium text-xs bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            <span>{lang === 'fa' ? 'سه‌شنبه ۲۷ آذر ۱۴۰۳' : 'Tuesday, Dec 17'}</span>
            <span className="text-slate-600">|</span>
            <span className="text-blue-400 font-mono font-bold">10:25</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
              title={lang === 'fa' ? 'اعلان‌ها' : 'Notifications'}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0d1733]">
                3
              </span>
            </button>

            {showNotifications && (
              <div className={`absolute top-full ${lang === 'fa' ? 'left-0' : 'right-0'} mt-2 w-80 bg-[#131e3a] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden`}>
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-200">
                    {lang === 'fa' ? 'اعلان‌های مهم مدیریتی' : 'Critical Management Alerts'}
                  </span>
                  <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full">
                    {lang === 'fa' ? '۳ مورد نیازمند اقدام' : '3 Pending Action'}
                  </span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-800/50 transition-colors text-xs">
                      <p className="text-slate-200 font-medium">{lang === 'fa' ? n.textFa : n.textEn}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-100">
                {lang === 'fa' ? 'مدیرعامل' : 'Chief Executive Officer'}
              </div>
              <div className="text-[11px] text-slate-400">
                {lang === 'fa' ? 'مبنا پارس ژنراتور' : 'Mapna Pars Generator'}
              </div>
            </div>
            <div className="w-9 h-9 bg-blue-600/30 border border-blue-500/50 rounded-full flex items-center justify-center text-blue-400 shadow-inner">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Hero Banner matching src/main.png background visual */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0d1733] via-[#101e42] to-[#172752] py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-xs font-bold flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'سطح دسترسی: راهبردی ارشد' : 'Scope: Senior Executive'}</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {lang === 'fa'
              ? 'تضمین حفاظت از ارزش، تعهدات مشتری و نقدینگی پروژه‌ها'
              : 'Ensuring project value, customer commitments & liquidity protection'}
          </span>
        </div>

        <div className="text-right">
          <span className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 via-slate-100 to-white tracking-wide">
            {lang === 'fa' ? 'ارزش امروز، قدرت فردا' : 'Today\'s Value, Tomorrow\'s Power'}
          </span>
        </div>
      </div>
    </header>
  );
};
