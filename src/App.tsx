import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ExecutiveKpiCards } from './components/ExecutiveKpiCards';
import { RiskValueScatterPlot } from './components/RiskValueScatterPlot';
import { ProductPortfolioGrid } from './components/ProductPortfolioGrid';
import { UrgentDecisionsList } from './components/UrgentDecisionsList';
import { ProjectsTable } from './components/ProjectsTable';
import { TimelineDevelopments } from './components/TimelineDevelopments';
import { DecisionModal } from './components/DecisionModal';
import { ProjectsView } from './components/ProjectsView';
import { DecisionsView } from './components/DecisionsView';
import { RiskMapView } from './components/RiskMapView';
import { ReportsView } from './components/ReportsView';
import { KnowledgeView } from './components/KnowledgeView';
import { SettingsModal } from './components/SettingsModal';
import { Project, DecisionCase, ProductDomain, TimelineEvent, AuditLog } from './types';
import {
  INITIAL_PROJECTS,
  INITIAL_DECISION_CASES,
  INITIAL_PRODUCT_DOMAINS,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_AUDIT_LOGS,
} from './data';
import { X, Cpu, Calendar, User, ShieldAlert, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [decisions, setDecisions] = useState<DecisionCase[]>(INITIAL_DECISION_CASES);
  const [domains, setDomains] = useState<ProductDomain[]>(INITIAL_PRODUCT_DOMAINS);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE_EVENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const [selectedDecisionModal, setSelectedDecisionModal] = useState<DecisionCase | null>(null);
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Sync html dir and theme
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [lang, theme]);

  // Fetch server data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProj, resDec, resDom, resTime, resAudit] = await Promise.all([
          fetch('/api/projects').then((r) => r.json()),
          fetch('/api/decisions').then((r) => r.json()),
          fetch('/api/domains').then((r) => r.json()),
          fetch('/api/timeline').then((r) => r.json()),
          fetch('/api/audit').then((r) => r.json()),
        ]);

        if (resProj?.success && resProj.data) setProjects(resProj.data);
        if (resDec?.success && resDec.data) setDecisions(resDec.data);
        if (resDom?.success && resDom.data) setDomains(resDom.data);
        if (resTime?.success && resTime.data) setTimeline(resTime.data);
        if (resAudit?.success && resAudit.data) setAuditLogs(resAudit.data);
      } catch (err) {
        console.warn('Backend API connection offline, using in-memory state fallback:', err);
      }
    };
    fetchData();
  }, []);

  // Handle Recording Decision
  const handleRecordDecision = async (
    decisionId: string,
    candidateId: string,
    rationale: string
  ) => {
    try {
      const res = await fetch(`/api/decisions/${decisionId}/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedCandidateId: candidateId,
          decisionRationale: rationale,
          decisionMaker: 'مدیرعامل / CEO',
        }),
      });
      const data = await res.json();
      if (data?.success && data.data) {
        setDecisions((prev) =>
          prev.map((d) => (d.id === decisionId ? data.data : d))
        );
      } else {
        // Fallback update
        setDecisions((prev) =>
          prev.map((d) =>
            d.id === decisionId
              ? {
                  ...d,
                  selectedCandidateId: candidateId,
                  decisionRationale: rationale,
                  decidedAt: new Date().toISOString(),
                }
              : d
          )
        );
      }

      // Add audit log
      setAuditLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          action: 'HUMAN_DECISION_RECORDED',
          entityId: decisionId,
          actor: 'مدیرعامل / CEO',
          timestamp: new Date().toISOString(),
          details: `Selected candidate ${candidateId}. Rationale: ${rationale}`,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  // Reset Data to initial state
  const handleResetData = async () => {
    try {
      await fetch('/api/reset', { method: 'POST' });
    } catch (e) {
      console.warn('API reset offline:', e);
    }
    setProjects(INITIAL_PROJECTS);
    setDecisions(INITIAL_DECISION_CASES);
    setDomains(INITIAL_PRODUCT_DOMAINS);
    setTimeline(INITIAL_TIMELINE_EVENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col font-['Vazirmatn',sans-serif]">
      {/* Header */}
      <Header
        lang={lang}
        onOpenSettings={() => setIsSettingsOpen(true)}
        auditCount={auditLogs.length}
      />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {/* Executive KPI Cards (Row 1 across all pages or Home) */}
          <ExecutiveKpiCards
            lang={lang}
            onCardClick={(type) => {
              if (type === 'urgent-decisions' || type === 'near-deadlines') {
                setActiveTab('decisions');
              } else if (type === 'risk-value') {
                setActiveTab('risk-map');
              } else {
                setActiveTab('projects');
              }
            }}
          />

          {/* TAB 1: HOME (Exact replica of src/main.png) */}
          {activeTab === 'home' && (
            <div className="space-y-5">
              {/* Middle Section (2 Columns): Risk Map & Product Portfolio */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Value & Risk Map (Scatter Plot) */}
                <div className="min-h-[350px]">
                  <RiskValueScatterPlot
                    projects={projects}
                    lang={lang}
                    onSelectProject={(p) => setSelectedProjectDetail(p)}
                  />
                </div>

                {/* Product Portfolio Status Grid */}
                <div className="min-h-[350px]">
                  <ProductPortfolioGrid
                    domains={domains}
                    lang={lang}
                    onDomainClick={() => setActiveTab('projects')}
                  />
                </div>
              </div>

              {/* Bottom Row (3 Columns): Urgent Decisions, Projects Table, Latest Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Column 1 (RTL Right / LTR Left - 4 cols): Urgent Decisions */}
                <div className="lg:col-span-4 min-h-[360px]">
                  <UrgentDecisionsList
                    decisions={decisions}
                    lang={lang}
                    onSelectDecision={(dec) => setSelectedDecisionModal(dec)}
                  />
                </div>

                {/* Column 2 (Middle - 5 cols): Projects Needing Attention Table */}
                <div className="lg:col-span-5 min-h-[360px]">
                  <ProjectsTable
                    projects={projects}
                    lang={lang}
                    onViewAll={() => setActiveTab('projects')}
                    onSelectProject={(p) => setSelectedProjectDetail(p)}
                  />
                </div>

                {/* Column 3 (RTL Left / LTR Right - 3 cols): Latest Developments Timeline */}
                <div className="lg:col-span-3 min-h-[360px]">
                  <TimelineDevelopments
                    events={timeline}
                    lang={lang}
                    onViewAll={() => setActiveTab('risk-map')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              lang={lang}
              onSelectProject={(p) => setSelectedProjectDetail(p)}
            />
          )}

          {/* TAB 3: DECISIONS */}
          {activeTab === 'decisions' && (
            <DecisionsView
              decisions={decisions}
              auditLogs={auditLogs}
              lang={lang}
              onSelectDecision={(dec) => setSelectedDecisionModal(dec)}
            />
          )}

          {/* TAB 4: RISK MAP */}
          {activeTab === 'risk-map' && (
            <RiskMapView
              projects={projects}
              lang={lang}
              onSelectProject={(p) => setSelectedProjectDetail(p)}
            />
          )}

          {/* TAB 5: REPORTS */}
          {activeTab === 'reports' && (
            <ReportsView projects={projects} decisions={decisions} lang={lang} />
          )}

          {/* TAB 6: KNOWLEDGE */}
          {activeTab === 'knowledge' && <KnowledgeView lang={lang} />}
        </main>
      </div>

      {/* Decision Analysis Modal */}
      <DecisionModal
        decision={selectedDecisionModal}
        lang={lang}
        onClose={() => setSelectedDecisionModal(null)}
        onRecordDecision={handleRecordDecision}
      />

      {/* Project Detail Modal */}
      {selectedProjectDetail && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#131e3a] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-100 my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                {selectedProjectDetail.code}
              </span>
              <button
                onClick={() => setSelectedProjectDetail(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-base font-black text-white mb-1">
                {lang === 'fa' ? selectedProjectDetail.title : selectedProjectDetail.titleEn}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'fa' ? `مشتری: ${selectedProjectDetail.customer}` : `Customer: ${selectedProjectDetail.customerEn}`}
              </p>
            </div>

            <div className="space-y-2 text-xs bg-[#0b1328] p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fa' ? 'منبع کلیدی:' : 'Key Resource:'}</span>
                <span className="font-bold text-slate-200">{lang === 'fa' ? selectedProjectDetail.keyResource : selectedProjectDetail.keyResourceEn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fa' ? 'مالک مسئول:' : 'Responsible Owner:'}</span>
                <span className="font-bold text-slate-200">{selectedProjectDetail.responsibleOwner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fa' ? 'ارزش در معرض خطر:' : 'At-Risk Value:'}</span>
                <span className="font-bold text-red-400">{selectedProjectDetail.atRiskValueM} M Toman</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fa' ? 'زمان تا نقطه مرز:' : 'Days to No-Return:'}</span>
                <span className="font-bold text-amber-400">{selectedProjectDetail.timeToNoReturnDays} {lang === 'fa' ? 'روز' : 'days'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                const dec = decisions.find((d) => d.projectCode === selectedProjectDetail.code);
                setSelectedProjectDetail(null);
                if (dec) {
                  setSelectedDecisionModal(dec);
                } else {
                  setActiveTab('decisions');
                }
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition-colors"
            >
              {lang === 'fa' ? 'مشاهده / ارزیابی پرونده تصمیم این پروژه' : 'Open Decision Case'}
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onResetData={handleResetData}
      />
    </div>
  );
}
