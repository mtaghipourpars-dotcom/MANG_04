import React from 'react';
import { Project } from '../types';
import { RiskValueScatterPlot } from './RiskValueScatterPlot';
import { Cpu, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

interface RiskMapViewProps {
  projects: Project[];
  lang: 'fa' | 'en';
  onSelectProject: (project: Project) => void;
}

export const RiskMapView: React.FC<RiskMapViewProps> = ({
  projects,
  lang,
  onSelectProject,
}) => {
  // Key Bottleneck Resources
  const bottlenecks = [
    {
      nameFa: 'ایستگاه آزمون فشار قوی',
      nameEn: 'High-Voltage Testing Bench',
      utilization: 96,
      competingProjects: ['P-1405', 'P-1398'],
      riskLevel: 'critical',
    },
    {
      nameFa: 'ماشین سیم‌پچی استاتور',
      nameEn: 'Stator Winding Machine',
      utilization: 88,
      competingProjects: ['P-1398', 'P-1412'],
      riskLevel: 'high_risk',
    },
    {
      nameFa: 'کوره لاک‌زنی و VPI',
      nameEn: 'VPI & Varnish Oven',
      utilization: 82,
      competingProjects: ['P-1412', 'P-1395'],
      riskLevel: 'high_risk',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Expanded Risk Matrix Scatter Plot */}
      <div className="h-[380px]">
        <RiskValueScatterPlot
          projects={projects}
          lang={lang}
          onSelectProject={onSelectProject}
        />
      </div>

      {/* Key Resource Bottleneck Analytics */}
      <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-black text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <span>{lang === 'fa' ? 'گلوگاه‌های منابع کلیدی و تعارض ظرفیت' : 'Key Resource Capacity Bottlenecks'}</span>
          </h2>
          <span className="text-xs text-slate-400 font-bold">
            {lang === 'fa' ? '۳ گلـوگاه بحرانی شناسایی شد' : '3 Bottlenecks Identified'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottlenecks.map((b, idx) => (
            <div key={idx} className="bg-[#0b1328] border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">
                  {lang === 'fa' ? b.nameFa : b.nameEn}
                </span>
                <span className="text-xs font-black text-red-400">
                  {b.utilization}% {lang === 'fa' ? 'بار ظرفیت' : 'Cap'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${b.utilization > 90 ? 'bg-red-600' : 'bg-orange-500'} rounded-full`}
                  style={{ width: `${b.utilization}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{lang === 'fa' ? 'پروژه‌های در تعارض:' : 'Competing Projects:'}</span>
                <div className="flex items-center gap-1">
                  {b.competingProjects.map((p, i) => (
                    <span key={i} className="bg-slate-800 text-blue-400 font-extrabold px-1.5 py-0.5 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
