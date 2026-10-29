import React from 'react';
import { Project, DecisionCase } from '../types';
import { BarChart3, Coins, AlertOctagon, TrendingDown, FileSpreadsheet } from 'lucide-react';

interface ReportsViewProps {
  projects: Project[];
  decisions: DecisionCase[];
  lang: 'fa' | 'en';
}

export const ReportsView: React.FC<ReportsViewProps> = ({ projects, decisions, lang }) => {
  const totalValueAtRisk = projects.reduce((sum, p) => sum + p.atRiskValueM, 0);

  return (
    <div className="space-y-6">
      {/* Executive Summary Banner */}
      <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-100 mb-1">
            {lang === 'fa' ? 'گزارش جامع مدیریت ارشد - حفاظت از ارزش' : 'Executive Value Protection Summary Report'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'fa' ? 'محاسبه تجمیعی ریسک نقدینگی، جریمه‌های قراردادی و تعهدات تحویل مشتری' : 'Aggregate liquidity risk, contract penalties & customer delivery exposures'}
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          <span>{lang === 'fa' ? 'خروجی اکسل / PDF' : 'Export Excel / PDF'}</span>
        </button>
      </div>

      {/* Financial Risk Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-red-400">
            <Coins className="w-5 h-5" />
            <span className="text-xs font-bold">{lang === 'fa' ? 'ارزش کل در معرض خطر' : 'Total At-Risk Value'}</span>
          </div>
          <div className="text-2xl font-black text-slate-100">
            {totalValueAtRisk.toLocaleString()} {lang === 'fa' ? 'میلیارد تومان' : 'M Toman'}
          </div>
          <span className="text-[11px] text-slate-400 block">{lang === 'fa' ? 'تجمیعی از ۸ پروژه تحت پایش' : 'Aggregated from 8 monitored projects'}</span>
        </div>

        <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertOctagon className="w-5 h-5" />
            <span className="text-xs font-bold">{lang === 'fa' ? 'ریسک جریمه تاخیر تحویل' : 'Contract Penalty Risk'}</span>
          </div>
          <div className="text-2xl font-black text-slate-100">
            ۵۹۰ {lang === 'fa' ? 'میلیارد تومان' : 'M Toman'}
          </div>
          <span className="text-[11px] text-amber-400 block">{lang === 'fa' ? 'مربوط به P-1405 و P-1398' : 'P-1405 & P-1398 exposures'}</span>
        </div>

        <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-blue-400">
            <TrendingDown className="w-5 h-5" />
            <span className="text-xs font-bold">{lang === 'fa' ? 'وصول نقدینگی در معرض تاخیر' : 'Delayed Cash Inflow'}</span>
          </div>
          <div className="text-2xl font-black text-slate-100">
            ۱,۱۸۰ {lang === 'fa' ? 'میلیارد تومان' : 'M Toman'}
          </div>
          <span className="text-[11px] text-blue-400 block">{lang === 'fa' ? '۲ صورت‌حساب در مرحله رسیدگی' : '2 pending milestones'}</span>
        </div>
      </div>
    </div>
  );
};
