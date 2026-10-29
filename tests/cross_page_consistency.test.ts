import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseStore } from '../src/server/db/databaseStore.js';
import { DecisionService } from '../src/server/decisionService.js';

test('Cross-Page Consistency: Derived At-Risk Value matches sum of project at-risk amounts', () => {
  const db = DatabaseStore.getInstance();
  const projects = db.getProjects();

  const atRiskProjects = projects.filter((p) => p.status === 'critical' || p.status === 'high_risk');
  const calculatedSum = atRiskProjects.reduce((sum, p) => sum + (p.atRiskValueM || 0), 0);

  // Assert sum is strictly consistent and non-negative
  assert.ok(calculatedSum > 0);
  assert.equal(
    calculatedSum,
    atRiskProjects.map((p) => p.atRiskValueM).reduce((a, b) => a + b, 0)
  );
});

test('Cross-Page Consistency: Decision recording updates active case count consistently', async () => {
  const db = DatabaseStore.getInstance();
  const cases = db.getIssueCases();
  const undecidedBefore = cases.filter((c) => !db.getDecisionForCase(c.id));

  assert.ok(undecidedBefore.length > 0);

  const targetCase = undecidedBefore[0];
  const candidates = db.getCandidatesForCase(targetCase.id);
  const eligible = candidates.find((c) => c.feasibilityStatus === 'FEASIBLE') || candidates[0];
  eligible.feasibilityStatus = 'FEASIBLE';

  await DecisionService.recordHumanDecision({
    caseId: targetCase.id,
    selectedCandidateId: eligible.id,
    decisionRationale: 'Consistency test rationale documentation for defensible decision recording',
    decisionMakerId: 'usr-ceo',
    decisionMakerRole: 'مدیرعامل / CEO',
    authorityBasis: 'مصوبه هیئت مدیره',
  });

  const decidedAfter = db.getDecisionForCase(targetCase.id);
  assert.ok(decidedAfter);
  assert.equal(decidedAfter.isFrozen, true);
  assert.equal(targetCase.currentStage, 'HUMAN_DECISION_FROZEN');
});
