import {
  DatabaseStore,
  TripartiteEvidenceRecord,
  EpistemicState,
  ProjectRecord,
} from './db/databaseStore.js';

export interface TripartiteSubmissionInput {
  projectId: string;
  claimedPercentage: number;
  warehouseDocNumber: string;
  warehouseVerified: boolean;
  warehouseVerifierId?: string;
  machineTelemetryId: string;
  telemetryVerified: boolean;
  supervisorBadgeId: string;
  supervisorSignoffVerified: boolean;
  notes?: string;
  auditorId: string;
}

export class ProgressVerificationService {
  public static verifyTripartiteEvidence(input: TripartiteSubmissionInput): {
    status: EpistemicState;
    verifiedPercentage: number | null;
    explanation: string;
  } {
    // Audit Rule: Reject paper-based or unverified claims without tripartite proof
    const missingComponents: string[] = [];

    if (!input.warehouseDocNumber || !input.warehouseVerified) {
      missingComponents.push('سند خروج/حواله انبار تایید شده (Warehouse Document)');
    }
    if (!input.machineTelemetryId || !input.telemetryVerified) {
      missingComponents.push('لاگ تلمتری/توان مصرفی ماشین (Machine Power/Telemetry Log)');
    }
    if (!input.supervisorBadgeId || !input.supervisorSignoffVerified) {
      missingComponents.push('امضای سرپرست کارگاه/کنترل کیفیت (QC/Supervisor Sign-off)');
    }

    if (missingComponents.length > 0) {
      return {
        status: 'UNVERIFIED',
        verifiedPercentage: null, // Unknown is not zero! Keep distinct!
        explanation: `عدم انطباق شواهد سه‌گانه: مولفه‌های زیر تایید نشده‌اند: ${missingComponents.join(
          ' ، '
        )}. درصد پیشرفت ادعایی تا ارائه اسناد کامل غیرقطعی باقی می‌ماند.`,
      };
    }

    return {
      status: 'PASSED',
      verifiedPercentage: input.claimedPercentage,
      explanation: 'شواهد سه‌گانه کارگاهی (انبار + تلمتری ماشین + امضای سرپرست) با موفقیت راستی‌آزمایی شد.',
    };
  }

  public static async recordProgressObservation(
    input: TripartiteSubmissionInput
  ): Promise<{ evidence: TripartiteEvidenceRecord; project: ProjectRecord }> {
    const db = DatabaseStore.getInstance();
    const project = db.getProject(input.projectId);

    if (!project) {
      throw new Error(`Project ${input.projectId} not found.`);
    }

    const verification = this.verifyTripartiteEvidence(input);

    const evidenceRecord: TripartiteEvidenceRecord = {
      id: `tri-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      projectId: project.id,
      observationTimestamp: new Date().toISOString(),
      claimedPercentage: input.claimedPercentage,
      warehouseDocNumber: input.warehouseDocNumber,
      warehouseVerified: input.warehouseVerified,
      warehouseVerifierId: input.warehouseVerifierId,
      machineTelemetryId: input.machineTelemetryId,
      telemetryVerified: input.telemetryVerified,
      supervisorBadgeId: input.supervisorBadgeId,
      supervisorSignoffVerified: input.supervisorSignoffVerified,
      verificationStatus: verification.status,
      verificationNotes: verification.explanation,
      createdAt: new Date().toISOString(),
    };

    db.getSchema().tripartiteEvidence.unshift(evidenceRecord);

    // Update project state
    const beforeState = { ...project };
    if (verification.status === 'PASSED') {
      project.progressPercent = verification.verifiedPercentage;
      project.progressVerificationStatus = 'PASSED';
    } else {
      // Do not overwrite with unverified progress
      project.progressVerificationStatus = 'UNVERIFIED';
    }

    project.version += 1;
    project.updatedAt = new Date().toISOString();

    await db.saveAsync();

    await db.addAuditEvent({
      action: 'TRIPARTITE_PROGRESS_VERIFICATION',
      entityType: 'PROJECT',
      entityId: project.id,
      actorId: input.auditorId,
      actorRole: 'SHOP_FLOOR_AUDITOR',
      beforeState,
      afterState: { project, evidence: evidenceRecord },
      rationale: verification.explanation,
    });

    return { evidence: evidenceRecord, project };
  }
}
