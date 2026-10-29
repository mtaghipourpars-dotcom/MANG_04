import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root data directory
const DATA_DIR = path.resolve(__dirname, '../../../data');
const DB_FILE = path.join(DATA_DIR, 'mang04_database.json');
const TEMP_DB_FILE = path.join(DATA_DIR, 'mang04_database.tmp');

export type EpistemicState =
  | 'KNOWN'
  | 'UNKNOWN'
  | 'NOT_APPLICABLE'
  | 'UNVERIFIED'
  | 'STALE'
  | 'CONTRADICTORY'
  | 'FAILED'
  | 'PASSED'
  | 'BLOCKED';

export type FeasibilityResult =
  | 'FEASIBLE'
  | 'PARTIALLY_FEASIBLE'
  | 'NOT_FEASIBLE'
  | 'INSUFFICIENT_EVIDENCE'
  | 'NO_FEASIBLE_OPTION';

export type LifecycleStage =
  | 'INTAKE_RECORDED'
  | 'INTAKE_ENRICHED'
  | 'ISSUE_QUALIFIED'
  | 'CANDIDATES_ASSESSED'
  | 'FEASIBILITY_EVALUATED'
  | 'SUBMITTED_TO_DECISION_MAKER'
  | 'HUMAN_DECISION_FROZEN'
  | 'ACTIONS_TRACKED'
  | 'PROGRESS_EVIDENCE_REVIEWED'
  | 'OUTCOME_ASSESSED'
  | 'LEARNING_REVIEWED';

export interface KeyResourceRecord {
  id: string;
  code: string;
  nameFa: string;
  nameEn: string;
  category: string;
  criticalityLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface ResourceOwnerHistoryRecord {
  id: string;
  resourceId: string;
  ownerUserId: string;
  ownerName: string;
  roleTitle: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
}

export interface ProjectRecord {
  id: string;
  code: string;
  titleFa: string;
  titleEn: string;
  customerFa: string;
  customerEn: string;
  category: string;
  keyResourceId: string;
  responsibleOwnerId: string;
  responsibleOwnerName: string;
  progressPercent: number | null; // Null when unknown, never zero!
  progressVerificationStatus: EpistemicState;
  status: 'critical' | 'high_risk' | 'attention' | 'optimal';
  atRiskValueM: number;
  timeToNoReturnDays: number;
  dataLayer: 'SETTING' | 'INPUT' | 'ANALYTICAL';
  truthClass: 'PUBLIC_VERIFIED' | 'INTERNAL_VERIFIED' | 'USER_APPROVED_ASSUMPTION' | 'DEMO_SYNTHETIC' | 'UNKNOWN';
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface IssueIntakeRecord {
  id: string;
  intakeCode: string;
  keyResourceId: string;
  projectId?: string;
  originalNarrativeFa: string;
  originalNarrativeEn?: string;
  reporterId: string;
  reporterName: string;
  reportedAt: string;
  uncertaintyNotes?: string;
  truthClass: 'INTERNAL_VERIFIED' | 'DEMO_SYNTHETIC';
  dataLayer: 'INPUT';
  isImmutable: boolean;
  createdAt: string;
}

export interface IssueCaseRecord {
  id: string;
  intakeId: string;
  caseCode: string;
  projectCode: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  keyResourceId: string;
  responsibleOwnerId: string;
  currentStage: LifecycleStage;
  qualificationStatus: 'QUALIFIED' | 'PENDING_REVIEW' | 'REJECTED';
  deadlineDays: number;
  deadlineDate: string;
  caseFeasibilityState: FeasibilityResult;
  impactsFa: string[];
  impactsEn: string[];
  tagsFa: string[];
  tagsEn: string[];
  imageUrl: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface SolutionCandidateRecord {
  id: string;
  issueCaseId: string;
  candidateNumber: number;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  costImpactM: number;
  scheduleImpactDays: number;
  feasibilityStatus: FeasibilityResult;
  isEligibleForRanking: boolean;
  prosFa: string[];
  prosEn: string[];
  consFa: string[];
  consEn: string[];
  proposerId: string;
  proposerName: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface FeasibilityRunRecord {
  id: string;
  candidateId: string;
  engineVersion: string;
  runTimestamp: string;
  overallResult: FeasibilityResult;
  materialConstraint: EpistemicState;
  machineConstraint: EpistemicState;
  manpowerConstraint: EpistemicState;
  technicalSafetyConstraint: EpistemicState;
  liquidityConstraint: EpistemicState;
  findingsSummary: string;
  evaluatedBy: string;
}

export interface DecisionProfileRecord {
  id: string;
  profileName: string;
  version: string;
  isActive: boolean;
  customerWeight: number; // 1-5
  marginWeight: number; // 1-5
  liquidityWeight: number; // 1-5
  strategicWeight: number; // 1-5
  feasibilityGateMandatory: boolean;
  createdAt: string;
}

export interface HumanDecisionRecord {
  id: string;
  issueCaseId: string;
  selectedCandidateId: string;
  decisionMakerId: string;
  decisionMakerRole: string;
  authorityBasis: string;
  decisionRationale: string;
  rejectedCandidatesSnapshot: any[];
  profileVersionId: string;
  feasibilitySnapshot: any;
  isFrozen: boolean;
  decidedAt: string;
}

export interface TripartiteEvidenceRecord {
  id: string;
  projectId: string;
  observationTimestamp: string;
  claimedPercentage: number;
  warehouseDocNumber: string;
  warehouseVerified: boolean;
  warehouseVerifierId?: string;
  machineTelemetryId: string;
  telemetryVerified: boolean;
  supervisorBadgeId: string;
  supervisorSignoffVerified: boolean;
  verificationStatus: EpistemicState;
  verificationNotes: string;
  createdAt: string;
}

export interface AuditEventRecord {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actorId: string;
  actorRole: string;
  correlationId?: string;
  beforeState?: any;
  afterState?: any;
  rationale?: string;
  timestamp: string;
}

export interface DatabaseSchema {
  keyResources: KeyResourceRecord[];
  resourceOwnerHistory: ResourceOwnerHistoryRecord[];
  projects: ProjectRecord[];
  issueIntakes: IssueIntakeRecord[];
  issueCases: IssueCaseRecord[];
  solutionCandidates: SolutionCandidateRecord[];
  feasibilityRuns: FeasibilityRunRecord[];
  decisionProfiles: DecisionProfileRecord[];
  humanDecisions: HumanDecisionRecord[];
  tripartiteEvidence: TripartiteEvidenceRecord[];
  auditEvents: AuditEventRecord[];
}

export class DatabaseStore {
  private static instance: DatabaseStore;
  private writeLock: Promise<void> = Promise.resolve();
  private data: DatabaseSchema;

  private constructor() {
    this.ensureDataDir();
    this.data = this.loadFromDisk();
  }

  public static getInstance(): DatabaseStore {
    if (!DatabaseStore.instance) {
      DatabaseStore.instance = new DatabaseStore();
    }
    return DatabaseStore.instance;
  }

  private ensureDataDir(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadFromDisk(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('[DatabaseStore] Failed to parse existing database file, initializing default:', err);
      }
    }
    const initial = this.createInitialCanonicalData();
    this.saveSync(initial);
    return initial;
  }

  private saveSync(schema: DatabaseSchema): void {
    const json = JSON.stringify(schema, null, 2);
    fs.writeFileSync(TEMP_DB_FILE, json, 'utf-8');
    fs.renameSync(TEMP_DB_FILE, DB_FILE);
  }

  public async saveAsync(): Promise<void> {
    const acquire = this.writeLock.then(async () => {
      const json = JSON.stringify(this.data, null, 2);
      await fs.promises.writeFile(TEMP_DB_FILE, json, 'utf-8');
      await fs.promises.rename(TEMP_DB_FILE, DB_FILE);
    });
    this.writeLock = acquire.catch((err) => {
      console.error('[DatabaseStore] Critical Write Error:', err);
    });
    await this.writeLock;
  }

  public getSchema(): DatabaseSchema {
    return this.data;
  }

  public getProjects(): ProjectRecord[] {
    return this.data.projects;
  }

  public getProject(idOrCode: string): ProjectRecord | undefined {
    return this.data.projects.find((p) => p.id === idOrCode || p.code === idOrCode);
  }

  public getIssueCases(): IssueCaseRecord[] {
    return this.data.issueCases;
  }

  public getIssueCase(idOrCode: string): IssueCaseRecord | undefined {
    return this.data.issueCases.find((c) => c.id === idOrCode || c.caseCode === idOrCode || c.projectCode === idOrCode);
  }

  public getCandidatesForCase(caseId: string): SolutionCandidateRecord[] {
    return this.data.solutionCandidates.filter((c) => c.issueCaseId === caseId);
  }

  public getCandidate(candidateId: string): SolutionCandidateRecord | undefined {
    return this.data.solutionCandidates.find((c) => c.id === candidateId);
  }

  public getFeasibilityRuns(candidateId: string): FeasibilityRunRecord[] {
    return this.data.feasibilityRuns.filter((r) => r.candidateId === candidateId);
  }

  public getDecisionForCase(caseId: string): HumanDecisionRecord | undefined {
    return this.data.humanDecisions.find((d) => d.issueCaseId === caseId);
  }

  public getAuditEvents(): AuditEventRecord[] {
    return this.data.auditEvents;
  }

  public getTripartiteEvidence(projectId: string): TripartiteEvidenceRecord[] {
    return this.data.tripartiteEvidence.filter((e) => e.projectId === projectId);
  }

  public async addAuditEvent(event: Omit<AuditEventRecord, 'id' | 'timestamp'>): Promise<AuditEventRecord> {
    const record: AuditEventRecord = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...event,
    };
    this.data.auditEvents.unshift(record);
    await this.saveAsync();
    return record;
  }

  public async resetToCanonicalSyntheticState(): Promise<void> {
    this.data = this.createInitialCanonicalData();
    await this.saveAsync();
  }

  private createInitialCanonicalData(): DatabaseSchema {
    const now = new Date().toISOString();

    const keyResources: KeyResourceRecord[] = [
      {
        id: 'kr-test-bench',
        code: 'KR-01',
        nameFa: 'ایستگاه آزمون فشار قوی',
        nameEn: 'High-Voltage Testing Bench',
        category: 'تجهیزات آزمون',
        criticalityLevel: 'CRITICAL',
      },
      {
        id: 'kr-stator-winding',
        code: 'KR-02',
        nameFa: 'ماشین سیم‌پچی استاتور',
        nameEn: 'Stator Winding Machine',
        category: 'خطوط ساخت',
        criticalityLevel: 'HIGH',
      },
      {
        id: 'kr-vpi-oven',
        code: 'KR-03',
        nameFa: 'کوره لاک‌زنی و VPI',
        nameEn: 'VPI & Varnish Oven',
        category: 'تجهیزات حرارتی',
        criticalityLevel: 'HIGH',
      },
      {
        id: 'kr-busduct-line',
        code: 'KR-04',
        nameFa: 'خط مونتاژ باس داکت',
        nameEn: 'Busduct Assembly Line',
        category: 'مونتاژ',
        criticalityLevel: 'MEDIUM',
      },
      {
        id: 'kr-dyn-balance',
        code: 'KR-05',
        nameFa: 'مرکز بالانس دینامیکی',
        nameEn: 'Dynamic Balancing Center',
        category: 'کنترل کیفیت',
        criticalityLevel: 'HIGH',
      },
    ];

    const resourceOwnerHistory: ResourceOwnerHistoryRecord[] = [
      {
        id: 'roh-01',
        resourceId: 'kr-test-bench',
        ownerUserId: 'usr-rezaei',
        ownerName: 'مهندس رضایی',
        roleTitle: 'مدیر ایستگاه آزمون',
        effectiveFrom: now,
      },
      {
        id: 'roh-02',
        resourceId: 'kr-stator-winding',
        ownerUserId: 'usr-ahmadi',
        ownerName: 'مهندس احمدی',
        roleTitle: 'سرپرست تولید استاتور',
        effectiveFrom: now,
      },
    ];

    const projects: ProjectRecord[] = [
      {
        id: 'p-1405',
        code: 'P-1405',
        titleFa: 'ژنراتور نیروگاهی ۳۲۵ مگاوات',
        titleEn: '325 MW Power Plant Generator',
        customerFa: 'شرکت سرمایه‌گذاری نیروگاهی',
        customerEn: 'Power Investment Co.',
        category: 'ژنراتورهای نیروگاهی',
        keyResourceId: 'kr-test-bench',
        responsibleOwnerId: 'usr-rezaei',
        responsibleOwnerName: 'مهندس رضایی (مدیر پروژه)',
        progressPercent: 68,
        progressVerificationStatus: 'UNVERIFIED', // Non-verified until tripartite check
        status: 'critical',
        atRiskValueM: 1200,
        timeToNoReturnDays: 5,
        dataLayer: 'INPUT',
        truthClass: 'DEMO_SYNTHETIC',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'p-1398',
        code: 'P-1398',
        titleFa: 'ژنراتور صنعتی سنگین ۲۵۰ مگاوات',
        titleEn: '250 MW Heavy Industrial Generator',
        customerFa: 'فولاد مبارکه',
        customerEn: 'Mobarakeh Steel Co.',
        category: 'ژنراتورهای صنعتی',
        keyResourceId: 'kr-stator-winding',
        responsibleOwnerId: 'usr-ahmadi',
        responsibleOwnerName: 'مهندس احمدی (سرپرست تولید)',
        progressPercent: 55,
        progressVerificationStatus: 'UNVERIFIED',
        status: 'critical',
        atRiskValueM: 850,
        timeToNoReturnDays: 12,
        dataLayer: 'INPUT',
        truthClass: 'DEMO_SYNTHETIC',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'p-1412',
        code: 'P-1412',
        titleFa: 'موتور کششی لکوموتیو پارس',
        titleEn: 'Pars Locomotive Traction Motor',
        customerFa: 'راه‌آهن جمهوری اسلامی',
        customerEn: 'National Railway Co.',
        category: 'موتور کششی',
        keyResourceId: 'kr-vpi-oven',
        responsibleOwnerId: 'usr-karimi',
        responsibleOwnerName: 'مهندس کریمی (مدیر فنی)',
        progressPercent: 42,
        progressVerificationStatus: 'UNVERIFIED',
        status: 'high_risk',
        atRiskValueM: 600,
        timeToNoReturnDays: 28,
        dataLayer: 'INPUT',
        truthClass: 'DEMO_SYNTHETIC',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'p-1395',
        code: 'P-1395',
        titleFa: 'باس داکت فشار قوی ۴۰۰ کیلوولت',
        titleEn: '400 kV High-Voltage Busduct',
        customerFa: 'نیروگاه دماوند',
        customerEn: 'Damavand Power Plant',
        category: 'باس داکت',
        keyResourceId: 'kr-busduct-line',
        responsibleOwnerId: 'usr-hosseini',
        responsibleOwnerName: 'مهندس حسینی (زنجیره تأمین)',
        progressPercent: 75,
        progressVerificationStatus: 'UNVERIFIED',
        status: 'high_risk',
        atRiskValueM: 400,
        timeToNoReturnDays: 35,
        dataLayer: 'INPUT',
        truthClass: 'DEMO_SYNTHETIC',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'p-1401',
        code: 'P-1401',
        titleFa: 'توربین بادی ۲.۵ مگاوات',
        titleEn: '2.5 MW Wind Turbine Generator',
        customerFa: 'مزرعه بادی خواف',
        customerEn: 'Khaf Wind Farm',
        category: 'توربین بادی',
        keyResourceId: 'kr-dyn-balance',
        responsibleOwnerId: 'usr-moradi',
        responsibleOwnerName: 'مهندس مرادی (کیفیت)',
        progressPercent: 60,
        progressVerificationStatus: 'UNVERIFIED',
        status: 'attention',
        atRiskValueM: 230,
        timeToNoReturnDays: 55,
        dataLayer: 'INPUT',
        truthClass: 'DEMO_SYNTHETIC',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const issueIntakes: IssueIntakeRecord[] = [
      {
        id: 'intake-1405',
        intakeCode: 'INT-1405',
        keyResourceId: 'kr-test-bench',
        projectId: 'p-1405',
        originalNarrativeFa: 'تامین‌کننده بوشینگ اعلام کرد که ارسال قطعه به دلیل مشکلات زنجیره تامین با تاخیر مواجه خواهد شد.',
        originalNarrativeEn: 'Bushing supplier notified delay due to logistics bottlenecks.',
        reporterId: 'usr-hosseini',
        reporterName: 'مهندس حسینی (زنجیره تأمین)',
        reportedAt: now,
        truthClass: 'DEMO_SYNTHETIC',
        dataLayer: 'INPUT',
        isImmutable: true,
        createdAt: now,
      },
      {
        id: 'intake-1398',
        intakeCode: 'INT-1398',
        keyResourceId: 'kr-test-bench',
        projectId: 'p-1398',
        originalNarrativeFa: 'همزمانی زمان آماده‌سازی ژنراتور ۲۵۰ مگاوات با ژنراتور نیروگاهی ۳۲۵ مگاوات در سکوی تست واحد.',
        originalNarrativeEn: 'Overlapping testing window for 250MW generator with 325MW generator at single test bench.',
        reporterId: 'usr-ahmadi',
        reporterName: 'مهندس احمدی (سرپرست تولید)',
        reportedAt: now,
        truthClass: 'DEMO_SYNTHETIC',
        dataLayer: 'INPUT',
        isImmutable: true,
        createdAt: now,
      },
    ];

    const issueCases: IssueCaseRecord[] = [
      {
        id: 'case-1405',
        intakeId: 'intake-1405',
        caseCode: 'DEC-1405',
        projectCode: 'P-1405',
        titleFa: 'تأخیر تأمین قطعه بحرانی',
        titleEn: 'Delay in Critical Component Procurement',
        subtitleFa: 'ژنراتور نیروگاهی ۳۲۵ مگاوات',
        subtitleEn: '325 MW Power Plant Generator',
        descriptionFa: 'تأثیر بر آزمون نهایی / ریسک تعهد مشتری / تأخیر در وصول / کاهش حاشیه پروژه',
        descriptionEn: 'Impact on final testing / Customer commitment risk / Collection delay / Project margin reduction',
        keyResourceId: 'kr-test-bench',
        responsibleOwnerId: 'usr-rezaei',
        currentStage: 'FEASIBILITY_EVALUATED',
        qualificationStatus: 'QUALIFIED',
        deadlineDays: 5,
        deadlineDate: new Date(Date.now() + 5 * 86400000).toISOString(),
        caseFeasibilityState: 'FEASIBLE',
        impactsFa: ['تأثیر بر آزمون نهایی', 'ریسک تعهد مشتری', 'تأخیر در وصول', 'کاهش حاشیه پروژه'],
        impactsEn: ['Final test impact', 'Customer commitment risk', 'Payment collection delay', 'Project margin reduction'],
        tagsFa: ['مشتری', 'آزمون', 'مالی', 'تأمین'],
        tagsEn: ['Customer', 'Testing', 'Finance', 'Procurement'],
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'case-1398',
        intakeId: 'intake-1398',
        caseCode: 'DEC-1398',
        projectCode: 'P-1398',
        titleFa: 'تعارض ظرفیت آزمون',
        titleEn: 'Test Bench Capacity Conflict',
        subtitleFa: 'دو پروژه در رقابت برای ظرفیت مشترک',
        subtitleEn: 'Two projects competing for shared bench capacity',
        descriptionFa: 'تأثیر بر تحویل دو مشتری / ریسک جریمه قراردادی / فشار بر نقدینگی / تعارض اولویت‌ها',
        descriptionEn: 'Impact on delivery for two customers / Penalty risk / Cash flow pressure / Priority conflict',
        keyResourceId: 'kr-test-bench',
        responsibleOwnerId: 'usr-ahmadi',
        currentStage: 'FEASIBILITY_EVALUATED',
        qualificationStatus: 'QUALIFIED',
        deadlineDays: 12,
        deadlineDate: new Date(Date.now() + 12 * 86400000).toISOString(),
        caseFeasibilityState: 'FEASIBLE',
        impactsFa: ['تأثیر بر تحویل دو مشتری', 'ریسک جریمه قراردادی', 'فشار بر نقدینگی', 'تعارض اولویت‌ها'],
        impactsEn: ['Dual customer delivery impact', 'Contract penalty risk', 'Liquidity pressure', 'Priority conflicts'],
        tagsFa: ['تولید', 'آزمون', 'برنامه‌ریزی', 'مشتری'],
        tagsEn: ['Production', 'Testing', 'Planning', 'Customer'],
        imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const solutionCandidates: SolutionCandidateRecord[] = [
      {
        id: 'cand-1405-1',
        issueCaseId: 'case-1405',
        candidateNumber: 1,
        titleFa: 'ارسال هوایی فورس‌ماژور قطعه + جابجایی نوبت آزمون',
        titleEn: 'Air Freight Component + Reschedule Testing Slot',
        descriptionFa: 'سفارش حمل هوایی ویژه از سازنده ثانویه آلمانی و رزرو ایستگاه آزمون ب ۱ در آخر هفته',
        descriptionEn: 'Special air freight order from secondary vendor + weekend slot reservation at Test Bench B1',
        costImpactM: 180,
        scheduleImpactDays: 2,
        feasibilityStatus: 'FEASIBLE',
        isEligibleForRanking: true,
        prosFa: ['حفظ کامل زمان تحویل به مشتری', 'جلوگیری از جریمه قراردادی ۵۰۰ میلیون تومانی'],
        prosEn: ['Preserves exact delivery time to customer', 'Avoids 500M Toman contract penalty'],
        consFa: ['افزایش ۱۸۰ میلیون تومانی هزینه logistics'],
        consEn: ['180M Toman additional logistics cost'],
        proposerId: 'usr-rezaei',
        proposerName: 'مهندس رضایی',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'cand-1405-2',
        issueCaseId: 'case-1405',
        candidateNumber: 2,
        titleFa: 'مونتاژ موقت با قطعه جایگزین داخلی + آزمون مقدماتی',
        titleEn: 'Temporary Assembly with Domestic Component + Pre-test',
        descriptionFa: 'استفاده از قطعه موجود در انبار پروژه P-1398 و بازگرداندن آن پس از وصول پارت اصلی',
        descriptionEn: 'Borrow component from P-1398 warehouse and replace upon arrival',
        costImpactM: 45,
        scheduleImpactDays: 8,
        feasibilityStatus: 'PARTIALLY_FEASIBLE',
        isEligibleForRanking: true,
        prosFa: ['هزینه پرداختی پایین‌تر', 'عدم نیاز به ارز صادراتی'],
        prosEn: ['Lower cash outlay', 'No foreign currency required'],
        consFa: ['ریسک تأخیر ۸ روزه در پروژه P-1398', 'نیازمند تأییدیه فنی رسمی'],
        consEn: ['8-day delay risk for project P-1398', 'Requires formal technical sign-off'],
        proposerId: 'usr-ahmadi',
        proposerName: 'مهندس احمدی',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'cand-1398-1',
        issueCaseId: 'case-1398',
        candidateNumber: 1,
        titleFa: 'ایجاد شیفت سه نوبته فوق‌العاده در ایستگاه آزمون',
        titleEn: '3-Shift Extra Operation on Test Bench',
        descriptionFa: 'فعال‌سازی شیفت شب و آخر هفته با حضور تیم بازرسی مشتری',
        descriptionEn: 'Activate night and weekend shifts with customer inspectors present',
        costImpactM: 90,
        scheduleImpactDays: 0,
        feasibilityStatus: 'FEASIBLE',
        isEligibleForRanking: true,
        prosFa: ['تحویل همزمان هر دو پروژه', 'حفظ تعهدات صورت‌حساب'],
        prosEn: ['Simultaneous delivery of both projects', 'Maintains invoicing milestones'],
        consFa: ['اضافه‌کاری شدید کادر متخصص', 'هزینه ۹۰ میلیون تومانی'],
        consEn: ['Overtime load on specialists', '90M Toman cost'],
        proposerId: 'usr-ahmadi',
        proposerName: 'مهندس احمدی',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'cand-1398-2',
        issueCaseId: 'case-1398',
        candidateNumber: 2,
        titleFa: 'مرحله‌بندی آزمون (تحویل فاز ۱ + تکمیل فاز ۲)',
        titleEn: 'Phased Testing (Phase 1 Delivery + Phase 2 On-site)',
        descriptionFa: 'انجام آزمون‌های سرد در کارخانه و آزمون گرم در سایت مشتری',
        descriptionEn: 'Conduct cold testing in factory and hot testing at customer site',
        costImpactM: 120,
        scheduleImpactDays: 5,
        feasibilityStatus: 'PARTIALLY_FEASIBLE',
        isEligibleForRanking: true,
        prosFa: ['کاهش بار ترافیکی کارخانه'],
        prosEn: ['Reduces factory bench traffic'],
        consFa: ['نیازمند متمم مکتوب قرارداد با مشتری'],
        consEn: ['Requires written contract amendment with customer'],
        proposerId: 'usr-karimi',
        proposerName: 'مهندس کریمی',
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const feasibilityRuns: FeasibilityRunRecord[] = [
      {
        id: 'feas-1405-1',
        candidateId: 'cand-1405-1',
        engineVersion: '1.0.0',
        runTimestamp: now,
        overallResult: 'FEASIBLE',
        materialConstraint: 'PASSED',
        machineConstraint: 'PASSED',
        manpowerConstraint: 'PASSED',
        technicalSafetyConstraint: 'PASSED',
        liquidityConstraint: 'PASSED',
        findingsSummary: 'تمام شروط پنج‌گانه سخت پاس گردید. ظرفیت جایگزین در پنجره آخر هفته تایید شد.',
        evaluatedBy: 'موتور ارزیابی امکان‌سنجی MANG_04',
      },
      {
        id: 'feas-1405-2',
        candidateId: 'cand-1405-2',
        engineVersion: '1.0.0',
        runTimestamp: now,
        overallResult: 'PARTIALLY_FEASIBLE',
        materialConstraint: 'PASSED',
        machineConstraint: 'PASSED',
        manpowerConstraint: 'PASSED',
        technicalSafetyConstraint: 'UNVERIFIED',
        liquidityConstraint: 'PASSED',
        findingsSummary: 'تاییدیه فنی انطباق استانداردهای ژنراتور برای قطعه جایگزین داخلی هنوز UNVERIFIED است.',
        evaluatedBy: 'موتور ارزیابی امکان‌سنجی MANG_04',
      },
    ];

    const decisionProfiles: DecisionProfileRecord[] = [
      {
        id: 'prof-v1',
        profileName: 'پروفایل استاندارد هیئت مدیره پارس ژنراتور',
        version: '1.0.0',
        isActive: true,
        customerWeight: 5,
        marginWeight: 4,
        liquidityWeight: 5,
        strategicWeight: 4,
        feasibilityGateMandatory: true,
        createdAt: now,
      },
    ];

    const tripartiteEvidence: TripartiteEvidenceRecord[] = [
      {
        id: 'tri-01',
        projectId: 'p-1405',
        observationTimestamp: now,
        claimedPercentage: 68,
        warehouseDocNumber: 'WH-DOC-89421',
        warehouseVerified: true,
        warehouseVerifierId: 'usr-warehouse-chief',
        machineTelemetryId: 'PLC-LOG-4412',
        telemetryVerified: true,
        supervisorBadgeId: 'QC-INSPECTOR-99',
        supervisorSignoffVerified: false, // Incomplete signoff -> UNVERIFIED!
        verificationStatus: 'UNVERIFIED',
        verificationNotes: 'امضای سرپرست کنترل کیفیت در انتظار تکمیل آزمون نهایی است. پیشرفت به عنوان راستی‌آزمایی‌شده قطعی پذیرفته نشد.',
        createdAt: now,
      },
    ];

    const auditEvents: AuditEventRecord[] = [
      {
        id: 'audit-init-01',
        action: 'SYSTEM_BOOT_CANONICAL',
        entityType: 'PLATFORM',
        entityId: 'SYS_ROOT',
        actorId: 'SYSTEM',
        actorRole: 'INITIALIZER',
        rationale: 'بوت اولیه سیستم و بارگذاری اطلاعات مبنا بر اساس مدل استاندارد MANG_04',
        timestamp: now,
      },
    ];

    return {
      keyResources,
      resourceOwnerHistory,
      projects,
      issueIntakes,
      issueCases,
      solutionCandidates,
      feasibilityRuns,
      decisionProfiles,
      humanDecisions: [],
      tripartiteEvidence,
      auditEvents,
    };
  }
}
