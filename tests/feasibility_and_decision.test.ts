import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseStore } from '../src/server/db/databaseStore.js';
import { FeasibilityEngine } from '../src/server/feasibilityEngine.js';
import { DecisionService } from '../src/server/decisionService.js';

test('FeasibilityEngine: Hard constraints precede ranking (Failed constraint blocks eligibility)', () => {
  const result = FeasibilityEngine.evaluateCandidateConstraints({
    candidateId: 'test-cand',
    materialStatus: 'PASSED',
    machineStatus: 'FAILED', // Hard constraint failure!
    manpowerStatus: 'PASSED',
    technicalSafetyStatus: 'PASSED',
    liquidityStatus: 'PASSED',
    findingsSummary: 'ایستگاه ماشین فاقد ظرفیت در بازه سررسید',
    evaluatorId: 'usr-auditor',
  });

  assert.equal(result.overallResult, 'NOT_FEASIBLE');
  assert.equal(result.isEligible, false);
});

test('FeasibilityEngine: Unknown/Unverified constraint produces INSUFFICIENT_EVIDENCE', () => {
  const result = FeasibilityEngine.evaluateCandidateConstraints({
    candidateId: 'test-cand-2',
    materialStatus: 'PASSED',
    machineStatus: 'PASSED',
    manpowerStatus: 'UNKNOWN', // Unknown is NOT zero or passed!
    technicalSafetyStatus: 'PASSED',
    liquidityStatus: 'PASSED',
    findingsSummary: 'تاییدیه صلاحیت نیروی انسانی نامشخص است',
    evaluatorId: 'usr-auditor',
  });

  assert.equal(result.overallResult, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.isEligible, false);
});

test('DecisionService: Prevents selecting a candidate that failed feasibility', async () => {
  const db = DatabaseStore.getInstance();
  const testCase = db.getIssueCases()[0];
  const candidates = db.getCandidatesForCase(testCase.id);

  // Mark candidate as NOT_FEASIBLE
  candidates[0].feasibilityStatus = 'NOT_FEASIBLE';

  const result = await DecisionService.recordHumanDecision({
    caseId: testCase.id,
    selectedCandidateId: candidates[0].id,
    decisionRationale: 'تست تایید گزینه غیرامکان‌پذیر بر خلاف اصول ممیزی',
    decisionMakerId: 'usr-ceo',
    decisionMakerRole: 'مدیرعامل',
    authorityBasis: 'مصوبه هیئت مدیره',
  });

  assert.equal(result.success, false);
  assert.match(result.error!, /FEASIBILITY_VIOLATION/i);
});

test('DecisionService: Records human decision with frozen snapshots when valid', async () => {
  const db = DatabaseStore.getInstance();
  const testCase = db.getIssueCases()[0];
  const candidates = db.getCandidatesForCase(testCase.id);

  // Ensure candidate is FEASIBLE
  candidates[0].feasibilityStatus = 'FEASIBLE';

  const result = await DecisionService.recordHumanDecision({
    caseId: testCase.id,
    selectedCandidateId: candidates[0].id,
    decisionRationale: 'انتخاب راهکار حمل هوایی فورس‌ماژور برای جلوگیری از جریمه قراردادی و حفظ نقدینگی پروژه',
    decisionMakerId: 'usr-ceo',
    decisionMakerRole: 'مدیرعامل / CEO',
    authorityBasis: 'مصوبه هیئت مدیره مپنا پارس ۱۴۰۳',
  });

  assert.equal(result.success, true);
  assert.ok(result.decision);
  assert.equal(result.decision?.isFrozen, true);
  assert.equal(result.decision?.rejectedCandidatesSnapshot.length, candidates.length - 1);
  assert.equal(testCase.currentStage, 'HUMAN_DECISION_FROZEN');
});
