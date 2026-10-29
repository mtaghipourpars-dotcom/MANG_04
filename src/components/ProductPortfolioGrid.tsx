import React from 'react';
import { ProductDomain } from '../types';
import { CheckCircle2, AlertTriangle, Coins, Settings, TrendingDown, AlertCircle } from 'lucide-react';

interface PortfolioGridProps {
  domains: ProductDomain[];
  lang: 'fa' | 'en';
  onDomainClick?: (domain: ProductDomain) => void;
}

export const ProductPortfolioGrid: React.FC<PortfolioGridProps> = ({
  domains,
  lang,
  onDomainClick,
}) => {
  return (
    <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
        <h2 className="text-sm font-black text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          {lang === 'fa' ? 'وضعیت سبد محصولات / حوزه‌های کاری' : 'Product Portfolio & Business Domains'}
        </h2>
        <span className="text-[11px] text-slate-400 font-medium">
          {lang === 'fa' ? '۶ حوزه عملیاتی' : '6 Active Domains'}
        </span>
      </div>

      {/* Grid of 6 Product Domain Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
        {domains.map((domain) => {
          const isCritical = domain.riskStatus === 'critical';
          const isActiveRisk = domain.riskStatus === 'active_risk' || isCritical;

          return (
            <div
              key={domain.id}
              onClick={() => onDomainClick?.(domain)}
              className="bg-[#0b1328] border border-slate-800/90 rounded-lg p-2.5 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Image thumbnail + title */}
              <div className="flex flex-col items-center text-center gap-1.5 mb-2">
                <div className="w-full h-16 rounded overflow-hidden relative bg-slate-900 border border-slate-800">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  {domain.activeRiskCount > 0 && (
                    <div className={`absolute top-1 right-1 w-5 h-5 rounded-full ${isCritical ? 'bg-red-600' : 'bg-orange-500'} text-white font-extrabold text-[10px] flex items-center justify-center shadow-md`}>
                      {domain.activeRiskCount}
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold text-slate-200 line-clamp-1">
                  {lang === 'fa' ? domain.title : domain.titleEn}
                </span>
              </div>

              {/* Status Tag */}
              <div className="text-center pt-1 border-t border-slate-800/60">
                {isActiveRisk ? (
                  <span className={`text-[10px] font-bold inline-flex items-center gap-1 ${isCritical ? 'text-red-400' : 'text-orange-400'}`}>
                    <AlertTriangle className="w-3 h-3" />
                    {lang === 'fa' ? domain.riskTextFa : domain.riskTextEn}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-400 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {lang === 'fa' ? 'بدون ریسک جدی' : 'No Serious Risk'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-Section: Macro Indicators (شاخص‌های کلان) */}
      <div className="border-t border-slate-800/80 pt-3">
        <div className="text-xs font-bold text-slate-300 mb-2">
          {lang === 'fa' ? 'شاخص‌های کلان' : 'Macro Indicators'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {/* Liquidity */}
          <div className="bg-[#0b1328] p-2 rounded-lg border border-slate-800 flex flex-col items-center">
            <div className="text-[10px] text-slate-400 mb-1">
              {lang === 'fa' ? 'وضعیت نقدینگی' : 'Liquidity Status'}
            </div>
            <div className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-red-500" />
              <span className="text-sm font-black text-red-400">2</span>
            </div>
            <span className="text-[9px] text-red-400 font-semibold mt-0.5">
              {lang === 'fa' ? 'در معرض تأخیر' : 'Delayed'}
            </span>
          </div>

          {/* Key Capacity */}
          <div className="bg-[#0b1328] p-2 rounded-lg border border-slate-800 flex flex-col items-center">
            <div className="text-[10px] text-slate-400 mb-1">
              {lang === 'fa' ? 'ظرفیت کلیدی' : 'Key Capacity'}
            </div>
            <div className="flex items-center gap-1">
              <Settings className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-black text-amber-400">1</span>
            </div>
            <span className="text-[9px] text-amber-400 font-semibold mt-0.5">
              {lang === 'fa' ? 'محدودیت' : 'Bottleneck'}
            </span>
          </div>

          {/* Project Margins */}
          <div className="bg-[#0b1328] p-2 rounded-lg border border-slate-800 flex flex-col items-center">
            <div className="text-[10px] text-slate-400 mb-1">
              {lang === 'fa' ? 'وضعیت حاشیه پروژه‌ها' : 'Project Margins'}
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-black text-orange-400">2</span>
            </div>
            <span className="text-[9px] text-orange-400 font-semibold mt-0.5">
              {lang === 'fa' ? 'در معرض کاهش' : 'At Risk'}
            </span>
          </div>

          {/* Customer Delivery */}
          <div className="bg-[#0b1328] p-2 rounded-lg border border-slate-800 flex flex-col items-center">
            <div className="text-[10px] text-slate-400 mb-1">
              {lang === 'fa' ? 'وضعیت تحویل مشتری' : 'Customer Delivery'}
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-black text-red-400">3</span>
            </div>
            <span className="text-[9px] text-red-400 font-semibold mt-0.5">
              {lang === 'fa' ? 'در معرض خطر' : 'At Risk'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
