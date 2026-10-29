import { DatabaseStore, IssueCaseRecord, LifecycleStage } from './db/databaseStore.js';

export class LifecycleEngine {
  private static STAGE_ORDER: LifecycleStage[] = [
    'INTAKE_RECORDED',
    'INTAKE_ENRICHED',
    'ISSUE_QUALIFIED',
    'CANDIDATES_ASSESSED',
    'FEASIBILITY_EVALUATED',
    'SUBMITTED_TO_DECISION_MAKER',
    'HUMAN_DECISION_FROZEN',
    'ACTIONS_TRACKED',
    'PROGRESS_EVIDENCE_REVIEWED',
    'OUTCOME_ASSESSED',
    'LEARNING_REVIEWED',
  ];

  public static canTransition(from: LifecycleStage, to: LifecycleStage): boolean {
    const fromIdx = this.STAGE_ORDER.indexOf(from);
    const toIdx = this.STAGE_ORDER.indexOf(to);
    if (fromIdx === -1 || toIdx === -1) return false;
    // Sequential advancement or valid correction back one step
    return toIdx === fromIdx + 1 || toIdx === fromIdx;
  }

  public static async transitionCase(
    caseId: string,
    targetStage: LifecycleStage,
    actorId: string,
    actorRole: string,
    rationale: string,
    expectedVersion?: number
  ): Promise<{ success: boolean; error?: string; issueCase?: IssueCaseRecord }> {
    const db = DatabaseStore.getInstance();
    const issueCase = db.getIssueCase(caseId);

    if (!issueCase) {
      return { success: false, error: `Issue case ${caseId} not found.` };
    }

    if (expectedVersion !== undefined && issueCase.version !== expectedVersion) {
      return {
        success: false,
        error: `STALE_VERSION: Concurrent modification detected. Persisted version is ${issueCase.version}, expected ${expectedVersion}.`,
      };
    }

    // Validation: Exactly one accountable owner is mandatory for qualifying an issue
    if (targetStage === 'ISSUE_QUALIFIED') {
      if (!issueCase.responsibleOwnerId || issueCase.responsibleOwnerId.trim() === '') {
        return {
          success: false,
          error: `CANONICAL_BLOCKER: Exactly one accountable owner is required before an issue can be qualified.`,
        };
      }
    }

    // Validation: Feasibility evaluated requires solution candidates
    if (targetStage === 'FEASIBILITY_EVALUATED') {
      const candidates = db.getCandidatesForCase(issueCase.id);
      if (candidates.length < 2) {
        return {
          success: false,
          error: `CANONICAL_BLOCKER: At least two human-proposed solution candidates are required for evaluation (found ${candidates.length}).`,
        };
      }
    }

    if (!this.canTransition(issueCase.currentStage, targetStage)) {
      return {
        success: false,
        error: `INVALID_LIFECYCLE_TRANSITION: Cannot transition directly from ${issueCase.currentStage} to ${targetStage}. Sequential advancement required.`,
      };
    }

    const beforeState = { ...issueCase };
    issueCase.currentStage = targetStage;
    issueCase.version += 1;
    issueCase.updatedAt = new Date().toISOString();

    await db.saveAsync();

    await db.addAuditEvent({
      action: 'LIFECYCLE_TRANSITION',
      entityType: 'ISSUE_CASE',
      entityId: issueCase.id,
      actorId,
      actorRole,
      beforeState,
      afterState: issueCase,
      rationale,
    });

    return { success: true, issueCase };
  }
}
