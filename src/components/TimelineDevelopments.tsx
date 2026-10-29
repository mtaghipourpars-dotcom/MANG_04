import React from 'react';
import { TimelineEvent } from '../types';
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
  lang: 'fa' | 'en';
  onViewAll?: () => void;
}

export const TimelineDevelopments: React.FC<TimelineProps> = ({
  events,
  lang,
  onViewAll,
}) => {
  const getDotColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500 shadow-red-500/50';
      case 'warning':
        return 'bg-amber-500 shadow-amber-500/50';
      case 'info':
        return 'bg-blue-500 shadow-blue-500/50';
      case 'success':
        return 'bg-emerald-500 shadow-emerald-500/50';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
        <h2 className="text-sm font-black text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          {lang === 'fa' ? 'آخرین تحولات مهم' : 'Latest Important Developments'}
        </h2>
        <button
          onClick={onViewAll}
          className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
        >
          <span>{lang === 'fa' ? 'مشاهده همه' : 'View All'}</span>
          {lang === 'fa' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:right-2 before:w-0.5 before:bg-slate-800">
        {events.map((evt) => (
          <div key={evt.id} className="relative pr-6 flex items-start justify-between gap-3 group">
            {/* Dot indicator */}
            <span
              className={`absolute top-1.5 right-0.5 w-3 h-3 rounded-full border-2 border-[#131e3a] ${getDotColor(
                evt.type
              )} shadow-md`}
            />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                  {lang === 'fa' ? evt.title : evt.titleEn}
                </span>
                <span className="text-[10px] bg-slate-800 text-blue-400 font-extrabold px-1.5 py-0.5 rounded">
                  {evt.projectCode}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                {lang === 'fa' ? evt.description : evt.descriptionEn}
              </p>
            </div>

            <div className="shrink-0 text-[10px] text-slate-400 font-bold whitespace-nowrap">
              {lang === 'fa' ? evt.timestampFa : evt.timestampEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
