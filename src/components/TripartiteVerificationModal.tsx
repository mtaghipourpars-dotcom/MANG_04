import React, { useState } from 'react';
import { Project } from '../types';
import { X, ShieldAlert, CheckCircle2, FileText, Cpu, UserCheck, AlertTriangle } from 'lucide-react';

interface TripartiteModalProps {
  project: Project | null;
  lang: 'fa' | 'en';
  onClose: () => void;
  onVerify: (data: {
    projectId: string;
    claimedPercentage: number;
    warehouseDocNumber: string;
    warehouseVerified: boolean;
    machineTelemetryId: string;
    telemetryVerified: boolean;
    supervisorBadgeId: string;
    supervisorSignoffVerified: boolean;
    notes?: string;
  }) => Promise<void>;
}

export const TripartiteVerificationModal: React.FC<TripartiteModalProps> = ({
  project,
  lang,
  onClose,
  onVerify,
}) => {
  if (!project) return null;

  const [claimedPercentage, setClaimedPercentage] = useState<number>(project.progressPercent || 0);
  const [warehouseDocNumber, setWarehouseDocNumber] = useState('WH-DOC-89421');
  const [warehouseVerified, setWarehouseVerified] = useState(true);
  const [machineTelemetryId, setMachineTelemetryId] = useState('PLC-SCADA-4412');
  const [telemetryVerified, setTelemetryVerified] = useState(true);
  const [supervisorBadgeId, setSupervisorBadgeId] = useState('QC-INSPECTOR-99');
  const [supervisorSignoffVerified, setSupervisorSignoffVerified] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await onVerify({
        projectId: project.id,
        claimedPercentage: Number(claimedPercentage),
        warehouseDocNumber,
        warehouseVerified,
        machineTelemetryId,
        telemetryVerified,
        supervisorBadgeId,
        supervisorSignoffVerified,
        notes,
      });
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'خطا در ثبت راستی‌آزمایی');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#131e3a] border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl text-slate-100 my-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-black text-white">
                {lang === 'fa' ? 'ممیزی شواهد سه‌گانه پیشرفت فیزیکی (Tripartite Audit)' : 'Tripartite Progress Audit'}
              </h2>
              <span className="text-xs text-blue-400 font-bold">{project.code} — {lang === 'fa' ? project.title : project.titleEn}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs leading-relaxed flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            {lang === 'fa'
              ? 'بر اساس اصل عدم حدس و ممیزی حقیقت، هرگونه ادعای پیشرفت کاغذی یا درصدی تا احراز کامل شواهد سه‌گانه کارگاهی در وضعیت UNVERIFIED باقی خواهد ماند.'
              : 'Per the Zero-Trust Truth Auditing mandate, numeric or paper-based progress claims remain UNVERIFIED until all three independent shop-floor evidence sources are validated.'}
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-500 text-red-200 text-xs rounded-xl font-bold">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-200 mb-1">
              {lang === 'fa' ? 'درصد پیشرفت فیزیکی ادعایی (Claimed %):' : 'Claimed Progress %:'}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={claimedPercentage}
              onChange={(e) => setClaimedPercentage(Number(e.target.value))}
              required
              className="w-full bg-[#0b1328] border border-slate-700 rounded-xl p-2.5 text-slate-100"
            />
          </div>

          {/* Tripartite Components */}
          <div className="space-y-3 bg-[#0b1328] p-4 rounded-xl border border-slate-800">
            {/* 1. Warehouse Document */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>۱. حواله خروج قطعات از انبار (Warehouse Doc)</span>
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={warehouseVerified}
                    onChange={(e) => setWarehouseVerified(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span className="text-[11px] font-semibold text-slate-300">تایید اصالت سند انبار</span>
                </label>
              </div>
              <input
                type="text"
                value={warehouseDocNumber}
                onChange={(e) => setWarehouseDocNumber(e.target.value)}
                placeholder="کد سند انبار (مثلاً WH-DOC-89421)"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 text-xs"
              />
            </div>

            {/* 2. Machine Telemetry / Power Log */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>۲. لاگ تلمتری / توان ماشین (Machine Power Log)</span>
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={telemetryVerified}
                    onChange={(e) => setTelemetryVerified(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span className="text-[11px] font-semibold text-slate-300">تایید عملکرد واقعی ماشین</span>
                </label>
              </div>
              <input
                type="text"
                value={machineTelemetryId}
                onChange={(e) => setMachineTelemetryId(e.target.value)}
                placeholder="شناسه لاگ اسکادا / PLC"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 text-xs"
              />
            </div>

            {/* 3. QC / Supervisor Sign-off */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>۳. امضای بازرس کنترل کیفیت (QC / Supervisor)</span>
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supervisorSignoffVerified}
                    onChange={(e) => setSupervisorSignoffVerified(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span className="text-[11px] font-semibold text-slate-300">تایید بازرسی حضوری</span>
                </label>
              </div>
              <input
                type="text"
                value={supervisorBadgeId}
                onChange={(e) => setSupervisorBadgeId(e.target.value)}
                placeholder="کد پرسنلی / شناسه گواهی بازرس"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              {lang === 'fa' ? 'توضیحات ممیز (Audit Notes):' : 'Auditor Notes:'}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="توضیحات آزمون، مشاهدات حضوری یا شواهد انطباق..."
              className="w-full bg-[#0b1328] border border-slate-700 rounded-xl p-2.5 text-slate-100 text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
            >
              {lang === 'fa' ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-lg"
            >
              {isSubmitting
                ? lang === 'fa' ? 'در حال راستی‌آزمایی...' : 'Verifying...'
                : lang === 'fa' ? 'ثبت ممیزی در پایگاه داده' : 'Record Audit'}
            </button>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-xl text-center font-bold">
              {lang === 'fa' ? '✓ ممیزی با موفقیت در پایگاه داده ثبت شد.' : '✓ Tripartite audit recorded.'}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
