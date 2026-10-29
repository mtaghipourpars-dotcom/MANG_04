import React, { useState } from 'react';
import { Project } from '../types';

interface ScatterPlotProps {
  projects: Project[];
  lang: 'fa' | 'en';
  onSelectProject?: (project: Project) => void;
}

export const RiskValueScatterPlot: React.FC<ScatterPlotProps> = ({
  projects,
  lang,
  onSelectProject,
}) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  // Status counts
  const statusCounts = {
    critical: projects.filter((p) => p.status === 'critical').length || 4,
    high_risk: projects.filter((p) => p.status === 'high_risk').length || 3,
    attention: projects.filter((p) => p.status === 'attention').length || 5,
    optimal: projects.filter((p) => p.status === 'optimal').length || 8,
  };

  // Helper to map (timeToNoReturnDays, atRiskValueM) to SVG coords (0 to 100%)
  // X: 0 to 120 days
  // Y: 0 to 1000 M Toman (inverted SVG Y)
  const getCoords = (days: number, valueM: number) => {
    const clampDays = Math.min(Math.max(days, 0), 120);
    const clampValue = Math.min(Math.max(valueM, 0), 1000);

    // SVG width: 320, height: 220
    const x = 40 + (clampDays / 120) * 260;
    const y = 200 - (clampValue / 1000) * 170;
    return { x, y };
  };

  const getBubbleRadius = (valueM: number) => {
    if (valueM >= 1000) return 18;
    if (valueM >= 500) return 14;
    if (valueM >= 100) return 10;
    return 6;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return '#ef4444'; // Red
      case 'high_risk':
        return '#f97316'; // Orange
      case 'attention':
        return '#eab308'; // Yellow
      case 'optimal':
        return '#22c55e'; // Green
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
        <h2 className="text-sm font-black text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          {lang === 'fa' ? 'نقشه ارزش و ریسک پروژه‌ها' : 'Project Value & Risk Map'}
        </h2>
        <span className="text-[11px] text-slate-400 font-medium">
          {lang === 'fa' ? 'ماتریس تحلیل ابعادی' : 'Multi-Dimensional Matrix'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center flex-1">
        {/* SVG Plot Area (Takes 3 columns) */}
        <div className="lg:col-span-3 relative bg-[#0b1328] border border-slate-800 rounded-lg p-2 min-h-[240px] flex items-center justify-center">
          <svg viewBox="0 0 340 230" className="w-full h-full overflow-visible">
            {/* Background Quadrant Labels */}
            <text x="70" y="45" fill="#ef4444" opacity="0.3" fontSize="11" fontWeight="bold">
              {lang === 'fa' ? 'مداخله فوری' : 'Immediate Intervention'}
            </text>
            <text x="210" y="45" fill="#f97316" opacity="0.3" fontSize="11" fontWeight="bold">
              {lang === 'fa' ? 'پایش ویژه' : 'Special Monitoring'}
            </text>
            <text x="190" y="180" fill="#22c55e" opacity="0.3" fontSize="11" fontWeight="bold">
              {lang === 'fa' ? 'وضعیت قابل قبول' : 'Acceptable Status'}
            </text>

            {/* Grid Lines */}
            {/* X Grid Lines */}
            <line x1="40" y1="200" x2="300" y2="200" stroke="#334155" strokeWidth="1" />
            <line x1="40" y1="115" x2="300" y2="115" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="40" y1="30" x2="300" y2="30" stroke="#1e293b" strokeDasharray="3 3" />

            {/* Y Grid Lines */}
            <line x1="40" y1="30" x2="40" y2="200" stroke="#334155" strokeWidth="1" />
            <line x1="105" y1="30" x2="105" y2="200" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="170" y1="30" x2="170" y2="200" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="235" y1="30" x2="235" y2="200" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="300" y1="30" x2="300" y2="200" stroke="#1e293b" strokeDasharray="3 3" />

            {/* Axis Labels */}
            {/* X-Axis Ticks: 0, 30, 60, 90, 120 */}
            <text x="40" y="215" fill="#64748b" fontSize="8" textAnchor="middle">0</text>
            <text x="105" y="215" fill="#64748b" fontSize="8" textAnchor="middle">۳۰</text>
            <text x="170" y="215" fill="#64748b" fontSize="8" textAnchor="middle">۶۰</text>
            <text x="235" y="215" fill="#64748b" fontSize="8" textAnchor="middle">۹۰</text>
            <text x="300" y="215" fill="#64748b" fontSize="8" textAnchor="middle">۱۲۰</text>

            {/* Y-Axis Ticks: 0, 500, 1000 */}
            <text x="32" y="202" fill="#64748b" fontSize="8" textAnchor="end">0</text>
            <text x="32" y="118" fill="#64748b" fontSize="8" textAnchor="end">۵۰۰</text>
            <text x="32" y="34" fill="#64748b" fontSize="8" textAnchor="end">۱,۰۰۰</text>

            {/* Render Project Bubbles */}
            {projects.map((p) => {
              const { x, y } = getCoords(p.timeToNoReturnDays, p.atRiskValueM);
              const r = getBubbleRadius(p.atRiskValueM);
              const color = getStatusColor(p.status);
              const isHovered = hoveredProject?.id === p.id;

              return (
                <g
                  key={p.id}
                  className="cursor-pointer transition-transform duration-200"
                  onMouseEnter={() => setHoveredProject(p)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => onSelectProject?.(p)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={color}
                    fillOpacity={isHovered ? '0.95' : '0.75'}
                    stroke={isHovered ? '#ffffff' : color}
                    strokeWidth={isHovered ? '2' : '1'}
                    className="transition-all hover:scale-125"
                  />
                  {p.code === 'P-1405' || p.code === 'P-1398' ? (
                    <text
                      x={x}
                      y={y + 3}
                      fill="#ffffff"
                      fontSize="7"
                      fontWeight="bold"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {p.code.replace('P-', '')}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>

          {/* Interactive Hover Tooltip */}
          {hoveredProject && (
            <div className="absolute top-2 left-2 bg-slate-900/90 border border-slate-700 p-2 rounded text-[11px] text-slate-100 z-10 shadow-xl pointer-events-none">
              <div className="font-bold text-blue-400">{hoveredProject.code} - {lang === 'fa' ? hoveredProject.title : hoveredProject.titleEn}</div>
              <div>{lang === 'fa' ? 'ارزش در معرض خطر:' : 'At-Risk Value:'} <span className="font-bold text-red-400">{hoveredProject.atRiskValueM} {lang === 'fa' ? 'میلیارد' : 'M'}</span></div>
              <div>{lang === 'fa' ? 'زمان تا نقطه غیرقابل‌بازگشت:' : 'Days to No-Return:'} <span className="font-bold text-amber-400">{hoveredProject.timeToNoReturnDays} {lang === 'fa' ? 'روز' : 'days'}</span></div>
            </div>
          )}

          {/* X Axis Title */}
          <div className="absolute -bottom-1 text-center w-full text-[10px] text-slate-400 font-bold">
            {lang === 'fa' ? 'زمان تا نقطه غیرقابل بازگشت (روز)' : 'Days to Point of No Return'}
          </div>
          {/* Y Axis Title */}
          <div className="absolute left-1 top-1/2 -rotate-90 origin-left text-[9px] text-slate-400 font-bold whitespace-nowrap -translate-y-12">
            {lang === 'fa' ? 'ارزش در معرض خطر (میلیارد تومان)' : 'At-Risk Value (Billion Toman)'}
          </div>
        </div>

        {/* Right Sidebar Legends (1 Column) */}
        <div className="space-y-4 text-xs">
          {/* Status Breakdown Legend */}
          <div>
            <div className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1">
              {lang === 'fa' ? 'وضعیت پروژه‌ها' : 'Project Status'}
            </div>
            <div className="space-y-1.5 font-medium text-slate-300 text-[11px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>{lang === 'fa' ? 'بحرانی' : 'Critical'}</span>
                </div>
                <span className="font-bold text-red-400">{statusCounts.critical}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>{lang === 'fa' ? 'پرریسک' : 'High Risk'}</span>
                </div>
                <span className="font-bold text-orange-400">{statusCounts.high_risk}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>{lang === 'fa' ? 'نیازمند توجه' : 'Needs Attention'}</span>
                </div>
                <span className="font-bold text-amber-400">{statusCounts.attention}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span>{lang === 'fa' ? 'مطلوب' : 'Optimal'}</span>
                </div>
                <span className="font-bold text-green-400">{statusCounts.optimal}</span>
              </div>
            </div>
          </div>

          {/* Bubble Size Legend */}
          <div>
            <div className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1">
              {lang === 'fa' ? 'میزان ارزش در معرض خطر' : 'At-Risk Value Scale'}
            </div>
            <div className="space-y-1.5 text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-600/60 flex items-center justify-center shrink-0 border border-slate-400" />
                <span>{lang === 'fa' ? 'بیش از ۱,۰۰۰ میلیارد' : '> 1,000 M'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-600/60 flex items-center justify-center shrink-0 border border-slate-400" />
                <span>{lang === 'fa' ? '۵۰۰ - ۱,۰۰۰ میلیارد' : '500 - 1,000 M'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-600/60 flex items-center justify-center shrink-0 border border-slate-400" />
                <span>{lang === 'fa' ? '۱۰۰ - ۵۰۰ میلیارد' : '100 - 500 M'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600/60 flex items-center justify-center shrink-0 border border-slate-400" />
                <span>{lang === 'fa' ? 'کمتر از ۱۰۰ میلیارد' : '< 100 M'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
