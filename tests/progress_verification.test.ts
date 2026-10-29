import test from 'node:test';
import assert from 'node:assert/strict';
import { ProgressVerificationService } from '../src/server/progressVerification.js';

test('ProgressVerificationService: Rejects progress without complete tripartite evidence', () => {
  const result = ProgressVerificationService.verifyTripartiteEvidence({
    projectId: 'p-1405',
    claimedPercentage: 68,
    warehouseDocNumber: 'WH-89421',
    warehouseVerified: true,
    machineTelemetryId: 'PLC-4412',
    telemetryVerified: false, // Machine log unverified!
    supervisorBadgeId: 'QC-99',
    supervisorSignoffVerified: true,
    auditorId: 'usr-auditor',
  });

  assert.equal(result.status, 'UNVERIFIED');
  assert.equal(result.verifiedPercentage, null); // Unknown is not zero!
  assert.match(result.explanation, /عدم انطباق شواهد سه‌گانه/);
});

test('ProgressVerificationService: Validates progress when all tripartite sources verified', () => {
  const result = ProgressVerificationService.verifyTripartiteEvidence({
    projectId: 'p-1405',
    claimedPercentage: 85,
    warehouseDocNumber: 'WH-89421',
    warehouseVerified: true,
    machineTelemetryId: 'PLC-4412',
    telemetryVerified: true,
    supervisorBadgeId: 'QC-99',
    supervisorSignoffVerified: true,
    auditorId: 'usr-auditor',
  });

  assert.equal(result.status, 'PASSED');
  assert.equal(result.verifiedPercentage, 85);
  assert.match(result.explanation, /راستی‌آزمایی شد/);
});
