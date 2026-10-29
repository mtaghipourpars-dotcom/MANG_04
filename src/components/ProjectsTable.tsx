import React from 'react';
import { Project } from '../types';
import { ChevronLeft, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface ProjectsTableProps {
  projects: Project[];
  lang: 'fa' | 'en';
  onViewAll?: () => void;
  onSelectProject?: (project: Project) => void;
  onOpenTripartiteModal?: (project: Project) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  lang,
  onViewAll,
  onSelectProject,
  onOpenTripartiteModal,
}) => {
  // Show top 5 projects needing attention
  const displayProjects = projects.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-red-600 text-white shadow-sm">
            {lang === 'fa' ? 'بحرانی' : 'Critical'}
          </span>
        );
      case 'high_risk':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-orange-500 text-white shadow-sm">
            {lang === 'fa' ? 'پرریسک' : 'High Risk'}
          </span>
        );
      case 'attention':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950 shadow-sm">
            {lang === 'fa' ? 'نیازمند توجه' : 'Needs Attention'}
          </span>
        );
      case 'optimal':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white shadow-sm">
            {lang === 'fa' ? 'مطلوب' : 'Optimal'}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
        <h2 className="text-sm font-black text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          {lang === 'fa' ? 'پروژه‌های نیازمند توجه' : 'Projects Needing Attention'}
        </h2>
        <button
          onClick={onViewAll}
          className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
        >
          <span>{lang === 'fa' ? 'مشاهده همه' : 'View All'}</span>
          {lang === 'fa' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="text-[11px] text-slate-400 border-b border-slate-800/80 pb-2 font-bold">
              <th className="py-2 px-2 text-right">{lang === 'fa' ? 'پروژه' : 'Project'}</th>
              <th className="py-2 px-2 text-center">{lang === 'fa' ? 'پیشرفت و راستی‌آزمایی' : 'Progress & Proof'}</th>
              <th className="py-2 px-2 text-center">{lang === 'fa' ? 'وضعیت' : 'Status'}</th>
              <th className="py-2 px-2 text-center">{lang === 'fa' ? 'ارزش در معرض خطر (میلیارد تومان)' : 'At-Risk Value (M)'}</th>
              <th className="py-2 px-2 text-center">{lang === 'fa' ? 'زمان تا نقطه غیرقابل بازگشت' : 'Days to No-Return'}</th>
              <th className="py-2 px-2 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {displayProjects.map((p) => {
              const isVerified = (p as any).progressVerificationStatus === 'PASSED';

              return (
                <tr
                  key={p.id}
                  onClick={() => onSelectProject?.(p)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  {/* Code & Title */}
                  <td className="py-2.5 px-2">
                    <div className="font-extrabold text-slate-200 group-hover:text-blue-300 transition-colors">
                      {p.code}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                      {lang === 'fa' ? p.title : p.titleEn}
                    </div>
                  </td>

                  {/* Progress bar with Tripartite Status */}
                  <td className="py-2.5 px-2 text-center min-w-[120px]">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-300 min-w-[30px] text-left">
                          {p.progressPercent !== null && p.progressPercent !== undefined
                            ? `${p.progressPercent}%`
                            : 'نامشخص'}
                        </span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full ${isVerified ? 'bg-emerald-500' : 'bg-blue-500'}`}
                            style={{ width: `${p.progressPercent || 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Tripartite Audit Tag */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenTripartiteModal?.(p);
                        }}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold flex items-center gap-1 transition-transform hover:scale-105 ${
                          isVerified
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                        }`}
                        title="مشاهده یا ثبت شواهد سه‌گانه انبار، تلمتری و بازرسی"
                      >
                        {isVerified ? (
                          <>
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>تایید سه‌گانه</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 text-amber-400" />
                            <span>ممیزی سه‌گانه</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-2.5 px-2 text-center whitespace-nowrap">
                    {getStatusBadge(p.status)}
                  </td>

                  {/* Value at Risk */}
                  <td className="py-2.5 px-2 text-center font-bold text-slate-200">
                    {p.atRiskValueM.toLocaleString('fa-IR')}
                  </td>

                  {/* Days to Point of No Return */}
                  <td className="py-2.5 px-2 text-center font-bold text-slate-200">
                    <span className={p.timeToNoReturnDays <= 12 ? 'text-red-400' : 'text-amber-400'}>
                      {p.timeToNoReturnDays} {lang === 'fa' ? 'روز' : 'days'}
                    </span>
                  </td>

                  {/* Row Arrow */}
                  <td className="py-2.5 px-2 text-center">
                    <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors inline-block" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
