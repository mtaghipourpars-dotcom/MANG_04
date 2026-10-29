import {
  DatabaseStore,
  HumanDecisionRecord,
  IssueCaseRecord,
  SolutionCandidateRecord,
} from './db/databaseStore.js';
import { LifecycleEngine } from './lifecycleEngine.js';

export interface RecordDecisionCommand {
  caseId: string;
  selectedCandidateId: string;
  decisionRationale: string;
  decisionMakerId: string;
  decisionMakerRole: string;
  authorityBasis: string;
  expectedVersion?: number;
}

export class DecisionService {
  public static async recordHumanDecision(
    cmd: RecordDecisionCommand
  ): Promise<{
    success: boolean;
    error?: string;
    decision?: HumanDecisionRecord;
    issueCase?: IssueCaseRecord;
  }> {
    const db = DatabaseStore.getInstance();
    const issueCase = db.getIssueCase(cmd.caseId);

    if (!issueCase) {
      return { success: false, error: `Issue case ${cmd.caseId} not found.` };
    }

    if (cmd.expectedVersion !== undefined && issueCase.version !== cmd.expectedVersion) {
      return {
        success: false,
        error: `STALE_VERSION: Concurrent modification detected. Persisted version is ${issueCase.version}, expected ${cmd.expectedVersion}.`,
      };
    }

    const candidates = db.getCandidatesForCase(issueCase.id);
    const selectedCandidate = candidates.find((c) => c.id === cmd.selectedCandidateId);

    if (!selectedCandidate) {
      return {
        success: false,
        error: `Selected candidate ${cmd.selectedCandidateId} does not belong to issue case ${cmd.caseId}.`,
      };
    }

    // Principle 6 & Zero-Trust Rule:
    // A candidate that FAILED hard feasibility constraints CANNOT be selected as feasible!
    if (selectedCandidate.feasibilityStatus === 'NOT_FEASIBLE') {
      return {
        success: false,
        error: `FEASIBILITY_VIOLATION: Candidate ${selectedCandidate.id} failed mandatory feasibility constraints and cannot be approved.`,
      };
    }

    if (selectedCandidate.feasibilityStatus === 'INSUFFICIENT_EVIDENCE') {
      return {
        success: false,
        error: `INSUFFICIENT_EVIDENCE: Candidate ${selectedCandidate.id} has unverified constraints and cannot be finalized.`,
      };
    }

    if (!cmd.decisionRationale || cmd.decisionRationale.trim().length < 10) {
      return {
        success: false,
        error: `VALIDATION_ERROR: A detailed decision rationale (at least 10 characters) is required for defensible governance.`,
      };
    }

    // Capture frozen snapshots
    const rejectedCandidates = candidates.filter((c) => c.id !== cmd.selectedCandidateId);
    const profile = db.getSchema().decisionProfiles.find((p) => p.isActive) || {
      id: 'prof-v1',
      version: '1.0.0',
    };
    const feasibilityRuns = db.getFeasibilityRuns(selectedCandidate.id);

    const decisionRecord: HumanDecisionRecord = {
      id: `dec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      issueCaseId: issueCase.id,
      selectedCandidateId: selectedCandidate.id,
      decisionMakerId: cmd.decisionMakerId,
      decisionMakerRole: cmd.decisionMakerRole,
      authorityBasis: cmd.authorityBasis,
      decisionRationale: cmd.decisionRationale,
      rejectedCandidatesSnapshot: rejectedCandidates,
      profileVersionId: profile.id,
      feasibilitySnapshot: feasibilityRuns,
      isFrozen: true,
      decidedAt: new Date().toISOString(),
    };

    // Transition lifecycle to HUMAN_DECISION_FROZEN
    issueCase.currentStage = 'HUMAN_DECISION_FROZEN';
    issueCase.version += 1;
    issueCase.updatedAt = new Date().toISOString();

    db.getSchema().humanDecisions.unshift(decisionRecord);

    await db.saveAsync();

    await db.addAuditEvent({
      action: 'HUMAN_DECISION_FROZEN',
      entityType: 'HUMAN_DECISION',
      entityId: decisionRecord.id,
      actorId: cmd.decisionMakerId,
      actorRole: cmd.decisionMakerRole,
      afterState: decisionRecord,
      rationale: `Human Decision frozen under authority ${cmd.authorityBasis}. Selected: ${selectedCandidate.id}`,
    });

    return { success: true, decision: decisionRecord, issueCase };
  }
}
