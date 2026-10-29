import React, { useState } from 'react';
import { Project } from '../types';
import { Search, Filter, ShieldAlert, Cpu, Calendar, User, Layers } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  lang: 'fa' | 'en';
  onSelectProject: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  lang,
  onSelectProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <div className="space-y-5">
      {/* Search & Filter Header Bar */}
      <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'fa' ? 'جستجوی کد پروژه، عنوان یا مشتری...' : 'Search code, title, customer...'}
            className="w-full bg-[#0b1328] border border-slate-700 rounded-xl py-2 pr-9 pl-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#0b1328] border border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="all">{lang === 'fa' ? 'همه حوزه‌های محصول' : 'All Product Domains'}</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectProject(p)}
            className="bg-[#131e3a] border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                  {p.code}
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    p.status === 'critical'
                      ? 'bg-red-600 text-white'
                      : p.status === 'high_risk'
                      ? 'bg-orange-500 text-white'
                      : p.status === 'attention'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {p.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-100 group-hover:text-blue-300 transition-colors mb-1">
                {lang === 'fa' ? p.title : p.titleEn}
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-3">
                {lang === 'fa' ? `مشتری: ${p.customer}` : `Customer: ${p.customerEn}`}
              </p>

              {/* Resource & Owner Details */}
              <div className="space-y-1.5 text-xs bg-[#0b1328] p-3 rounded-lg border border-slate-800 mb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{lang === 'fa' ? p.keyResource : p.keyResourceEn}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{p.responsibleOwner}</span>
                </div>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'پیشرفت' : 'Progress'}</span>
                <span className="font-bold text-slate-100">{p.progressPercent}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'ارزش در معرض خطر' : 'At-Risk Value'}</span>
                <span className="font-bold text-red-400">{p.atRiskValueM} M</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'زمان تا نقطه‌مرز' : 'No-Return'}</span>
                <span className="font-bold text-amber-400">{p.timeToNoReturnDays} {lang === 'fa' ? 'روز' : 'd'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
