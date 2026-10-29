import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseStore } from '../src/server/db/databaseStore.js';
import { LifecycleEngine } from '../src/server/lifecycleEngine.js';

test('LifecycleEngine: Enforces single accountable owner before qualification', async () => {
  const db = DatabaseStore.getInstance();
  const testCaseId = 'case-test-owner-' + Date.now();

  // Create an unqualified case without an owner
  db.getSchema().issueCases.push({
    id: testCaseId,
    intakeId: 'intake-1405',
    caseCode: 'DEC-TEST-OWNER',
    projectCode: 'P-1405',
    titleFa: 'تست فاقد مالک مسئول',
    titleEn: 'Test Case without Owner',
    subtitleFa: '',
    subtitleEn: '',
    descriptionFa: 'تست ارزیابی شرط مالک مسئول',
    descriptionEn: '',
    keyResourceId: 'kr-test-bench',
    responsibleOwnerId: '', // Empty owner!
    currentStage: 'INTAKE_ENRICHED',
    qualificationStatus: 'PENDING_REVIEW',
    deadlineDays: 7,
    deadlineDate: new Date().toISOString(),
    caseFeasibilityState: 'INSUFFICIENT_EVIDENCE',
    impactsFa: [],
    impactsEn: [],
    tagsFa: [],
    tagsEn: [],
    imageUrl: '',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Attempt to transition to ISSUE_QUALIFIED without owner
  const result = await LifecycleEngine.transitionCase(
    testCaseId,
    'ISSUE_QUALIFIED',
    'usr-auditor',
    'AUDITOR',
    'تست ارتقای رتبه بدون مالک'
  );

  assert.equal(result.success, false);
  assert.match(result.error!, /accountable owner is required/i);
});

test('LifecycleEngine: Rejects invalid skipped lifecycle transitions', async () => {
  const db = DatabaseStore.getInstance();
  const testCase = db.getIssueCases()[0];

  // Attempt to skip from current stage to LEARNING_REVIEWED directly
  const result = await LifecycleEngine.transitionCase(
    testCase.id,
    'LEARNING_REVIEWED',
    'usr-auditor',
    'AUDITOR',
    'تست پرش غیرمجاز مراحل چرخه حیات'
  );

  assert.equal(result.success, false);
  assert.match(result.error!, /INVALID_LIFECYCLE_TRANSITION/i);
});
