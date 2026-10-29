import React from 'react';
import { BarChart2, Handshake, Coins, Users, Clock } from 'lucide-react';

interface KpiCardsProps {
  lang: 'fa' | 'en';
  onCardClick?: (type: string) => void;
}

export const ExecutiveKpiCards: React.FC<KpiCardsProps> = ({ lang, onCardClick }) => {
  const cards = [
    {
      id: 'risk-value',
      titleFa: 'ارزش در معرض خطر',
      titleEn: 'At-Risk Value',
      mainCount: '4',
      mainCountUnitFa: 'پروژه / تعهد',
      mainCountUnitEn: 'Projects / Commitments',
      subValueFa: '۳,۲۵۰ میلیارد تومان',
      subValueEn: '3,250 Billion Toman',
      icon: BarChart2,
      borderColor: 'border-red-500/80',
      bgColor: 'bg-[#151c33]',
      accentText: 'text-red-400',
      iconBg: 'bg-red-500/10 text-red-500',
      badgeFa: '🚨 بالاترین سطح هشدار',
      badgeEn: '🚨 Critical Level',
      badgeColor: 'bg-red-500/20 text-red-400',
    },
    {
      id: 'customer-commitments',
      titleFa: 'تعهدات مشتری در معرض خطر',
      titleEn: 'Customer Commitments at Risk',
      mainCount: '3',
      mainCountUnitFa: 'پروژه',
      mainCountUnitEn: 'Projects',
      subValueFa: 'ریسک جریمه تاخیر تحویل',
      subValueEn: 'Delivery Penalty Risk',
      icon: Handshake,
      borderColor: 'border-orange-500/50',
      bgColor: 'bg-[#151c33]',
      accentText: 'text-orange-400',
      iconBg: 'bg-orange-500/10 text-orange-500',
    },
    {
      id: 'liquidity-delayed',
      titleFa: 'نقدینگی در معرض تأخیر',
      titleEn: 'Delayed Liquidity',
      mainCount: '2',
      mainCountUnitFa: 'مرحله وصول',
      mainCountUnitEn: 'Collection Stages',
      subValueFa: '≈ ۱,۱۸۰ میلیارد تومان',
      subValueEn: '≈ 1,180 Billion Toman',
      icon: Coins,
      borderColor: 'border-amber-500/50',
      bgColor: 'bg-[#151c33]',
      accentText: 'text-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-500',
    },
    {
      id: 'urgent-decisions',
      titleFa: 'تصمیم‌های ضروری مدیریت',
      titleEn: 'Urgent Management Decisions',
      mainCount: '2',
      mainCountUnitFa: 'مورد',
      mainCountUnitEn: 'Cases',
      subValueFa: 'نیازمند تصمیم هیئت مدیره',
      subValueEn: 'Board Decision Required',
      icon: Users,
      borderColor: 'border-blue-500/50',
      bgColor: 'bg-[#151c33]',
      accentText: 'text-blue-400',
      iconBg: 'bg-blue-500/10 text-blue-500',
    },
    {
      id: 'near-deadlines',
      titleFa: 'مهلت‌های مداخله نزدیک',
      titleEn: 'Impending Deadlines',
      mainCount: '1',
      mainCountUnitFa: 'مورد',
      mainCountUnitEn: 'Case',
      subValueFa: 'کمتر از ۵ روز',
      subValueEn: 'Less than 5 days',
      icon: Clock,
      borderColor: 'border-purple-500/50',
      bgColor: 'bg-[#151c33]',
      accentText: 'text-purple-400',
      iconBg: 'bg-purple-500/10 text-purple-400',
      badgeFa: 'کمتر از ۵ روز',
      badgeEn: 'Under 5 Days',
      badgeColor: 'bg-purple-500/20 text-purple-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            onClick={() => onCardClick?.(card.id)}
            className={`p-4 rounded-xl border ${card.borderColor} ${card.bgColor} hover:bg-[#1a233f] transition-all cursor-pointer shadow-lg relative group overflow-hidden flex flex-col justify-between min-h-[120px]`}
          >
            {/* Top Row: Title & Icon */}
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-300 leading-snug">
                {lang === 'fa' ? card.titleFa : card.titleEn}
              </span>
              <div className={`p-2 rounded-lg shrink-0 ${card.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Middle Big Number & Unit */}
            <div className="flex items-baseline gap-2 my-1">
              <span className={`text-3xl font-black tracking-tight ${card.accentText}`}>
                {card.mainCount}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {lang === 'fa' ? card.mainCountUnitFa : card.mainCountUnitEn}
              </span>
            </div>

            {/* Bottom Sub-value / Badge */}
            <div className="flex items-center justify-between text-[11px] border-t border-slate-800/80 pt-2 mt-1">
              <span className="text-slate-300 font-bold">
                {lang === 'fa' ? card.subValueFa : card.subValueEn}
              </span>
              {card.badgeFa && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${card.badgeColor}`}>
                  {lang === 'fa' ? card.badgeFa : card.badgeEn}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
