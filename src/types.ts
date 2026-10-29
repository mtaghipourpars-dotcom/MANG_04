export type ProjectStatus = 'critical' | 'high_risk' | 'attention' | 'optimal';

export interface Project {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  customer: string;
  customerEn: string;
  progressPercent: number;
  status: ProjectStatus;
  atRiskValueM: number; // Million / Billion Toman value as shown in UI
  timeToNoReturnDays: number;
  keyResource: string;
  keyResourceEn: string;
  responsibleOwner: string;
  category: string;
}

export interface DecisionCandidate {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  costImpactM: number;
  scheduleImpactDays: number;
  customerSatisfactionScore: number; // 1-5
  feasibilityStatus: 'feasible' | 'conditional' | 'infeasible';
  pros: string[];
  prosEn: string[];
  cons: string[];
  consEn: string[];
}

export interface DecisionCase {
  id: string;
  projectCode: string;
  projectTitle: string;
  projectTitleEn: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  deadlineDays: number;
  impacts: string[];
  impactsEn: string[];
  tags: string[];
  tagsEn: string[];
  imageUrl: string;
  candidates: DecisionCandidate[];
  selectedCandidateId?: string;
  decisionRationale?: string;
  decisionMaker?: string;
  decidedAt?: string;
}

export interface ProductDomain {
  id: string;
  title: string;
  titleEn: string;
  activeRiskCount: number;
  riskStatus: 'critical' | 'active_risk' | 'no_risk';
  riskTextFa: string;
  riskTextEn: string;
  image: string;
}

export interface TimelineEvent {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  titleEn: string;
  projectCode: string;
  description: string;
  descriptionEn: string;
  timestampFa: string;
  timestampEn: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entityId: string;
  actor: string;
  timestamp: string;
  details: string;
}
