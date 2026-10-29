import React from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle2, Shield } from 'lucide-react';

interface KnowledgeViewProps {
  lang: 'fa' | 'en';
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({ lang }) => {
  const learningRules = [
    {
      titleFa: 'مدل وزن‌دهی کیفی تصمیم‌گیری (Qualitative Decision Weights)',
      titleEn: 'Qualitative Decision Weighting Model',
      descFa: 'ارزیابی بر اساس ۵ پارامتر با وزن کیفی ۱ تا ۵: تعهد مشتری، حاشیه سود، ریسک نقدینگی، اهمیت راهبردی، و قابلیت امکان‌سنجی.',
      descEn: 'Evaluation based on 5 parameters (weights 1-5): Customer commitment, Margin, Liquidity risk, Strategic importance, Feasibility.',
    },
    {
      titleFa: 'پایش انحراف نتایج واقعی از فرض اولیه (Outcome vs Baseline)',
      titleEn: 'Actual Outcome vs Baseline Variance',
      descFa: 'ثبت نتایج واقعی پس از انجام پروژه و مقایسه آن با فرض زمان اتخاذ تصمیم جهت بهبود پارامترهای مدل در تصمیم‌های آتی.',
      descEn: 'Recording actual execution outcomes vs initial decision baseline to tune model parameters over time.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#131e3a] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <GraduationCap className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-black text-slate-100">
            {lang === 'fa' ? 'پایگاه دانش و یادگیری سازمانی (Lessons Learned)' : 'Knowledge Base & Organizational Learning'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningRules.map((r, idx) => (
            <div key={idx} className="bg-[#0b1328] border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>{lang === 'fa' ? r.titleFa : r.titleEn}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {lang === 'fa' ? r.descFa : r.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
