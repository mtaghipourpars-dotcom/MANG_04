import {
  DatabaseStore,
  FeasibilityResult,
  EpistemicState,
  SolutionCandidateRecord,
  FeasibilityRunRecord,
} from './db/databaseStore.js';

export interface ConstraintEvaluationInput {
  candidateId: string;
  materialStatus: EpistemicState;
  machineStatus: EpistemicState;
  manpowerStatus: EpistemicState;
  technicalSafetyStatus: EpistemicState;
  liquidityStatus: EpistemicState;
  findingsSummary: string;
  evaluatorId: string;
}

export class FeasibilityEngine {
  public static evaluateCandidateConstraints(input: ConstraintEvaluationInput): {
    overallResult: FeasibilityResult;
    isEligible: boolean;
    findings: string[];
  } {
    const findings: string[] = [];

    // Principle 6: Hard constraints precede profile ranking!
    // Principle 9: Unknown is NOT zero, healthy, or feasible!
    const constraints: { name: string; state: EpistemicState }[] = [
      { name: 'موجودی و دسترسی به مواد/قطعات (Material Availability)', state: input.materialStatus },
      { name: 'ظرفیت ماشین‌آلات و ایستگاه کاری (Machine Capacity)', state: input.machineStatus },
      { name: 'نیروی انسانی متخصص و گواهینامه فنی (Manpower/Skill)', state: input.manpowerStatus },
      { name: 'انطباق ایمنی، فنی و استاندارد (Technical & Safety Compliance)', state: input.technicalSafetyStatus },
      { name: 'نقدینگی در بازه زمانی مورد نیاز (Time-Phased Liquidity)', state: input.liquidityStatus },
    ];

    let hasFailed = false;
    let hasInsufficientEvidence = false;
    let hasUnverified = false;

    for (const c of constraints) {
      if (c.state === 'FAILED') {
        hasFailed = true;
        findings.push(`شرط ناموفق (FAILED): ${c.name}`);
      } else if (c.state === 'UNKNOWN' || c.state === 'UNVERIFIED') {
        hasInsufficientEvidence = true;
        findings.push(`عدم قطعیت در شرط (INSUFFICIENT_EVIDENCE): ${c.name} در وضعیت ${c.state} قرار دارد.`);
      } else if (c.state === 'CONTRADICTORY' || c.state === 'BLOCKED') {
        hasFailed = true;
        findings.push(`تعارض داده‌ای یا انسداد (BLOCKED): ${c.name}`);
      }
    }

    if (hasFailed) {
      return {
        overallResult: 'NOT_FEASIBLE',
        isEligible: false,
        findings,
      };
    }

    if (hasInsufficientEvidence) {
      return {
        overallResult: 'INSUFFICIENT_EVIDENCE',
        isEligible: false,
        findings,
      };
    }

    // All mandatory hard constraints passed
    return {
      overallResult: 'FEASIBLE',
      isEligible: true,
      findings: ['تمام شروط پنج‌گانه سخت با شواهد مستند احراز گردید.'],
    };
  }

  public static async runAndRecordEvaluation(
    input: ConstraintEvaluationInput
  ): Promise<{ run: FeasibilityRunRecord; candidate: SolutionCandidateRecord }> {
    const db = DatabaseStore.getInstance();
    const candidate = db.getCandidate(input.candidateId);
    if (!candidate) {
      throw new Error(`Candidate ${input.candidateId} not found.`);
    }

    const evalResult = this.evaluateCandidateConstraints(input);

    const runRecord: FeasibilityRunRecord = {
      id: `feas-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      candidateId: candidate.id,
      engineVersion: '1.0.0-PROD',
      runTimestamp: new Date().toISOString(),
      overallResult: evalResult.overallResult,
      materialConstraint: input.materialStatus,
      machineConstraint: input.machineStatus,
      manpowerConstraint: input.manpowerStatus,
      technicalSafetyConstraint: input.technicalSafetyStatus,
      liquidityConstraint: input.liquidityStatus,
      findingsSummary: input.findingsSummary + ' | ' + evalResult.findings.join(' ; '),
      evaluatedBy: input.evaluatorId,
    };

    db.getSchema().feasibilityRuns.push(runRecord);

    // Update candidate
    candidate.feasibilityStatus = evalResult.overallResult;
    candidate.isEligibleForRanking = evalResult.isEligible;
    candidate.version += 1;
    candidate.updatedAt = new Date().toISOString();

    // Check Case-Level Feasibility: If no candidate is eligible, enter NO_FEASIBLE_OPTION
    const caseCandidates = db.getCandidatesForCase(candidate.issueCaseId);
    const eligibleCount = caseCandidates.filter((c) => c.isEligibleForRanking).length;
    const issueCase = db.getIssueCase(candidate.issueCaseId);

    if (issueCase) {
      if (eligibleCount === 0) {
        issueCase.caseFeasibilityState = 'NO_FEASIBLE_OPTION';
      } else {
        issueCase.caseFeasibilityState = 'FEASIBLE';
      }
      issueCase.version += 1;
      issueCase.updatedAt = new Date().toISOString();
    }

    await db.saveAsync();

    await db.addAuditEvent({
      action: 'FEASIBILITY_RUN_RECORDED',
      entityType: 'SOLUTION_CANDIDATE',
      entityId: candidate.id,
      actorId: input.evaluatorId,
      actorRole: 'FEASIBILITY_AUDITOR',
      afterState: runRecord,
      rationale: `Hard constraint evaluation result: ${evalResult.overallResult}`,
    });

    return { run: runRecord, candidate };
  }
}
