import React from 'react';
import { DecisionCase, AuditLog } from '../types';
import { ShieldCheck, History, CheckCircle2, Clock, User, FileText } from 'lucide-react';

interface DecisionsViewProps {
  decisions: DecisionCase[];
  auditLogs: AuditLog[];
  lang: 'fa' | 'en';
  onSelectDecision: (decision: DecisionCase) => void;
}

export const DecisionsView: React.FC<DecisionsViewProps> = ({
  decisions,
  auditLogs,
  lang,
  onSelectDecision,
}) => {
  return (
    <div className="space-y-6">
      {/* Decisions Register Cards */}
      <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-black text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>{lang === 'fa' ? 'دفتر ثبت تصمیم‌های راهبردی مدیریت' : 'Executive Decision Register'}</span>
          </h2>
          <span className="text-xs text-slate-400 font-bold">
            {decisions.length} {lang === 'fa' ? 'پرونده فعال' : 'Active Cases'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {decisions.map((dec) => {
            const hasBeenDecided = !!dec.selectedCandidateId;

            return (
              <div
                key={dec.id}
                onClick={() => onSelectDecision(dec)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  hasBeenDecided
                    ? 'bg-emerald-950/10 border-emerald-500/40'
                    : 'bg-[#0b1328] border-slate-800 hover:border-blue-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                      {dec.projectCode}
                    </span>
                    {hasBeenDecided ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {lang === 'fa' ? 'تصمیم ثبت گردید' : 'Decision Frozen'}
                      </span>
                    ) : (
                      <span className="text-[10px] bg-red-500/20 text-red-400 font-extrabold px-2 py-0.5 rounded border border-red-500/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lang === 'fa' ? `مهلت: ${dec.deadlineDays} روز` : `Deadline: ${dec.deadlineDays}d`}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-black text-slate-100 mb-1">
                    {lang === 'fa' ? dec.title : dec.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mb-3">
                    {lang === 'fa' ? dec.description : dec.descriptionEn}
                  </p>

                  {hasBeenDecided && (
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs space-y-1 mb-3">
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        {lang === 'fa' ? 'استدلال و مبانی ثبت‌شده:' : 'Recorded Rationale:'}
                      </span>
                      <p className="text-slate-200 text-xs italic">{dec.decisionRationale}</p>
                      <span className="text-[9px] text-slate-500 block pt-1">
                        {lang === 'fa' ? `توسط: ${dec.decisionMaker}` : `By: ${dec.decisionMaker}`}
                      </span>
                    </div>
                  )}
                </div>

                <button className="w-full py-2 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-bold text-xs rounded-lg transition-colors">
                  {hasBeenDecided
                    ? lang === 'fa' ? 'بازبینی / ویرایش استدلال' : 'Review / Edit Rationale'
                    : lang === 'fa' ? 'ارزیابی راهکارها و ثبت تصمیم' : 'Evaluate Candidates & Record'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Immutable Audit Log */}
      <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <History className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-black text-slate-100">
            {lang === 'fa' ? 'سوابق دست‌نخورده ممیزی و تصمیم‌گیری (Audit History)' : 'Immutable Audit Log'}
          </h2>
        </div>

        <div className="divide-y divide-slate-800/80">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-start justify-between gap-4 text-xs">
              <div>
                <div className="font-bold text-slate-200">{log.action}</div>
                <div className="text-slate-400 text-[11px]">{log.details}</div>
              </div>
              <div className="text-left shrink-0">
                <span className="text-blue-400 font-semibold block">{log.actor}</span>
                <span className="text-slate-500 text-[10px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
