import React, { useState } from 'react';
import { DecisionCase, DecisionCandidate } from '../types';
import { X, AlertTriangle, CheckCircle2, Clock, DollarSign, Award, Shield, Check } from 'lucide-react';

interface DecisionModalProps {
  decision: DecisionCase | null;
  lang: 'fa' | 'en';
  onClose: () => void;
  onRecordDecision: (decisionId: string, candidateId: string, rationale: string) => Promise<void>;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  decision,
  lang,
  onClose,
  onRecordDecision,
}) => {
  if (!decision) return null;

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    decision.selectedCandidateId || decision.candidates[0]?.id || ''
  );
  const [rationale, setRationale] = useState<string>(
    decision.decisionRationale || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidateId || !rationale) return;

    setIsSubmitting(true);
    try {
      await onRecordDecision(decision.id, selectedCandidateId, rationale);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#131e3a] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between text-slate-100 my-auto">
        {/* Modal Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-500/20 text-red-400 font-extrabold text-xs px-2.5 py-0.5 rounded border border-red-500/30">
                {decision.projectCode}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {lang === 'fa' ? 'پرونده تصمیم ضروری مدیریت' : 'Urgent Management Case'}
              </span>
            </div>
            <h2 className="text-lg font-black text-white">
              {lang === 'fa' ? decision.title : decision.titleEn}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'fa' ? decision.subtitle : decision.subtitleEn}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Key Impacts Alert Box */}
          <div className="bg-[#0b1328] border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-400 mb-1">
                {lang === 'fa' ? 'پ پیامدها و ریسک‌های عدم اتخاذ تصمیم در مهلت مقرر:' : 'Impacts if decision delayed beyond deadline:'}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {(lang === 'fa' ? decision.impacts : decision.impactsEn).map((imp, idx) => (
                  <span key={idx} className="bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                    • {imp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Candidates Comparison Grid */}
          <div>
            <h3 className="text-sm font-black text-slate-200 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              {lang === 'fa' ? 'مقایسه راهکارهای پیشنهادی (Candidates):' : 'Candidate Solution Comparison:'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decision.candidates.map((cand) => {
                const isSelected = selectedCandidateId === cand.id;

                return (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidateId(cand.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-500/10'
                        : 'border-slate-800 bg-[#0b1328] hover:border-slate-700'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white rounded-full p-1 shadow">
                        <Check className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-bold text-slate-100 pr-6 mb-2">
                        {lang === 'fa' ? cand.title : cand.titleEn}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {lang === 'fa' ? cand.description : cand.descriptionEn}
                      </p>

                      {/* Trade-off metrics */}
                      <div className="grid grid-cols-2 gap-2 text-xs mb-4 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <div>
                          <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'هزینه اضافی' : 'Cost Impact'}</span>
                          <span className="font-bold text-red-400">
                            +{cand.costImpactM} {lang === 'fa' ? 'میلیارد' : 'M'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'زمان تاخیر' : 'Schedule Impact'}</span>
                          <span className="font-bold text-amber-400">
                            +{cand.scheduleImpactDays} {lang === 'fa' ? 'روز' : 'days'}
                          </span>
                        </div>
                      </div>

                      {/* Pros */}
                      <div className="space-y-1 mb-2">
                        <span className="text-[11px] font-bold text-emerald-400 block">{lang === 'fa' ? 'مزایا:' : 'Pros:'}</span>
                        {(lang === 'fa' ? cand.pros : cand.prosEn).map((pro, i) => (
                          <div key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>

                      {/* Cons */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-red-400 block">{lang === 'fa' ? 'چالش‌ها:' : 'Cons:'}</span>
                        {(lang === 'fa' ? cand.cons : cand.consEn).map((con, i) => (
                          <div key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-semibold">{lang === 'fa' ? 'وضعیت امکان‌سنجی:' : 'Feasibility:'}</span>
                      <span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {cand.feasibilityStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decision Rationale Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                {lang === 'fa' ? 'مبانی و استدلال اتخاذ تصمیم (Rationale):' : 'Human Decision Rationale & Defense:'}
              </label>
              <textarea
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                rows={3}
                required
                placeholder={
                  lang === 'fa'
                    ? 'علت انتخاب این راهکار، هزینه‌های پذیرفته شده و نحوه جبران ریسک‌ها را شرح دهید...'
                    : 'Explain the justification for this choice, accepted costs, and mitigation steps...'
                }
                className="w-full bg-[#0b1328] border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {lang === 'fa' ? 'انصراف' : 'Cancel'}
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !rationale}
                className="px-6 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>{lang === 'fa' ? 'در حال ثبت در پایگاه داده...' : 'Saving to DB...'}</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{lang === 'fa' ? 'ثبت و قطعی‌سازی تصمیم' : 'Record & Freeze Decision'}</span>
                  </>
                )}
              </button>
            </div>

            {successMsg && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold text-center">
                {lang === 'fa' ? '✓ تصمیم با موفقیت در لایه داده ثبت گردید.' : '✓ Decision recorded successfully in database.'}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
