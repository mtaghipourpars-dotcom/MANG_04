import React from 'react';
import {
  Home,
  Briefcase,
  Users,
  Target,
  BarChart3,
  GraduationCap,
  Settings,
  Cpu,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'fa' | 'en';
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  onOpenSettings,
}) => {
  const navItems = [
    {
      id: 'home',
      labelFa: 'صفحه اصلی',
      labelEn: 'Home Dashboard',
      icon: Home,
    },
    {
      id: 'projects',
      labelFa: 'پروژه‌ها',
      labelEn: 'Projects',
      icon: Briefcase,
    },
    {
      id: 'decisions',
      labelFa: 'تصمیم‌های مدیریتی',
      labelEn: 'Management Decisions',
      icon: Users,
    },
    {
      id: 'risk-map',
      labelFa: 'نقشه ریسک و ارزش',
      labelEn: 'Risk & Value Map',
      icon: Target,
    },
    {
      id: 'reports',
      labelFa: 'گزارش‌ها',
      labelEn: 'Reports',
      icon: BarChart3,
    },
    {
      id: 'knowledge',
      labelFa: 'دانش و تجربه',
      labelEn: 'Knowledge & Experience',
      icon: GraduationCap,
    },
    {
      id: 'settings',
      labelFa: 'تنظیمات',
      labelEn: 'Settings',
      icon: Settings,
      isSettingsAction: true,
    },
  ];

  return (
    <aside className="w-64 bg-[#0a1226] border-r border-l border-slate-800 flex flex-col justify-between shrink-0 select-none min-h-[calc(100vh-110px)]">
      {/* Navigation Items */}
      <div className="py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isSettingsAction) {
                  onOpenSettings();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all text-right ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span className="truncate">{lang === 'fa' ? item.labelFa : item.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Illustration Card */}
      <div className="p-4 m-3 bg-[#0d1836] border border-slate-800/80 rounded-xl relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2 text-blue-400">
          <Cpu className="w-5 h-5 animate-pulse" />
          <span className="text-[11px] font-black tracking-tight">PARS VPT</span>
        </div>
        <p className="text-[11px] text-slate-300 font-medium leading-relaxed mb-3">
          {lang === 'fa'
            ? 'ژنراتورهای ایرانی برای آینده‌ای پایدار'
            : 'Iranian generators for a sustainable future'}
        </p>
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
          <span>PARS</span>
          <span>MAPNA GROUP</span>
        </div>
      </div>
    </aside>
  );
};
