import React from 'react';
import { DecisionCase } from '../types';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle } from 'lucide-react';

interface UrgentDecisionsProps {
  decisions: DecisionCase[];
  lang: 'fa' | 'en';
  onSelectDecision: (decision: DecisionCase) => void;
}

export const UrgentDecisionsList: React.FC<UrgentDecisionsProps> = ({
  decisions,
  lang,
  onSelectDecision,
}) => {
  return (
    <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-sm font-black text-slate-100">
            {lang === 'fa' ? 'لیست تصمیم‌های ضروری مدیریت' : 'Urgent Management Decisions List'}
          </h2>
        </div>
        <span className="text-[11px] text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
          {lang === 'fa' ? 'اقدام هیئت مدیره' : 'Executive Action'}
        </span>
      </div>

      {/* Decision Cards List */}
      <div className="space-y-3">
        {decisions.map((dec) => {
          const isUrgent = dec.deadlineDays <= 5;

          return (
            <div
              key={dec.id}
              onClick={() => onSelectDecision(dec)}
              className="bg-[#0b1328] border border-slate-800 hover:border-blue-500/50 rounded-xl p-3.5 transition-all cursor-pointer group relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Left Side (RTL Right): Deadline tag & Image */}
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <div className={`p-2.5 rounded-lg text-center shrink-0 min-w-[75px] ${isUrgent ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'}`}>
                  <span className="text-sm font-black block leading-none">{dec.deadlineDays} {lang === 'fa' ? 'روز' : 'Days'}</span>
                  <span className="text-[10px] font-bold opacity-90 block mt-1">
                    {lang === 'fa' ? 'مهلت تصمیم' : 'Deadline'}
                  </span>
                </div>

                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <img
                    src={dec.imageUrl}
                    alt={dec.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Middle Section: Code, Title, Subtitle, Description & Tags */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {dec.projectCode}
                  </span>
                  <h3 className="text-xs font-extrabold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {lang === 'fa' ? dec.title : dec.titleEn}
                  </h3>
                </div>

                <div className="text-[11px] font-semibold text-slate-400">
                  {lang === 'fa' ? dec.subtitle : dec.subtitleEn}
                </div>

                <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
                  {lang === 'fa' ? dec.description : dec.descriptionEn}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(lang === 'fa' ? dec.tags : dec.tagsEn).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Arrow Button */}
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 group-hover:bg-blue-600 text-slate-300 group-hover:text-white transition-all shadow-md">
                {lang === 'fa' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
