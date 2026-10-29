# MVP Acceptance Criteria

**Status:** Canonical acceptance contract for the first end-to-end pilot  
**Date:** 2026-10-29  
**Related:** UNIFIED_PRODUCT_REQUIREMENTS.md, UNIFIED_DATA_AND_ARCHITECTURE_CONTRACT.md, REPOSITORY_RECONCILIATION.md

## Objective
Prove that one issue affecting a key resource can move through evidence-based, human-authorized, traceable decisions to an outcome review. Acceptance is evidence-based; a polished UI or generated code alone is not acceptance.

## Gate A — Intake and qualification
1. Register a minimal issue against a designated KEY_RESOURCE with its unique responsible owner.
2. Preserve the original narrative, reporter/context, time, available evidence and uncertainty.
3. Intake does not require root cause, solution, or financial estimate.
4. Run transparent qualification: accept, request information, link duplicate, route, mark out-of-scope or manual review. Each result has reason, actor/time and history.
5. Incomplete, contradictory, stale, duplicate and out-of-scope reports remain traceable; no opaque score silently discards a report.
6. Unmatched types remain visible for manual classification; reusable catalogue authoring is disabled/deferred in MVP.

## Gate B — Evidence and cross-object integrity
7. Link the issue only to source-backed or explicitly labelled assumed operational objects, product/project, commitment/milestone and key resource.
8. Show source/provenance, as-of time, confidence/quality, and whether each material claim is observed fact, assumption, hypothesis or inference as applicable.
9. Demonstrate that a public product catalogue does not establish internal project assignment, customer commitment, delivery, capacity, margin, cash or exposure.
10. Unknown, invalid, stale, disconnected, partial and unapproved data are distinct from zero/healthy. Synthetic data is labelled DEMO_SYNTHETIC and isolated from actual financial indicators.

## Gate C — Candidates, assessment and feasibility
11. Provide at least two human-proposed case-specific solution candidates with evidence, assumptions, dependencies and resource/time requirements.
12. Assess candidates with manager-owned, versioned qualitative parameters and written anchors/directions; UNKNOWN / NOT_ASSESSED is explicit.
13. Do not require quantitative financial calculation unless approved sources and methods exist. Ordinal ratings are not currency and are not blindly summed.
14. Run deterministic feasibility gates before profile ranking for supported dependency, material, machine/work-center, manpower/skill, method/qualification, safety/legal/technical, time-phased cash and shared-resource constraints.
15. Distinguish FEASIBLE, PARTIALLY_FEASIBLE (with conditions), NOT_FEASIBLE and INSUFFICIENT_EVIDENCE. At case level, no candidate passing hard gates produces NO_FEASIBLE_OPTION and an explicit constraint/resource escalation.
16. Use the same versioned profile for candidates being compared; show factor-level trade-offs, missing evidence and opportunity cost where calculable. Profile weights never override hard constraints.

## Gate D — Human decision and action
17. Record the authorized decision-maker, authority basis, timestamp, chosen candidate/set, rationale, profile/policy version, exact feasibility/baseline snapshot, rejected/deferred alternatives and reopening triggers.
18. Respect role-based access and issue confidentiality as separate controls.
19. A later decision preserves earlier decision history and explicitly handles actions already underway (continue, amend or cancel under authority).
20. Actions have owner, due date, status, execution evidence and reassignment/change history. Decision, action completion and issue resolution remain distinct.
21. Emergency action, if implemented, is authorized, reversible where possible, time-limited, auditable and does not bypass hard constraints.

## Gate E — Outcome, value and learning
22. Freeze expected baseline and targets at decision time.
23. Record actual outcome with source, period, unit and quality, or explicitly record OUTCOME_NOT_YET_AVAILABLE.
24. Compare effectiveness separately from resource efficiency; record failed, neutral and adverse outcomes as well as positive ones.
25. Separate estimated value, observed actuals and causal attribution. Temporal sequence alone is not causal evidence; prevent double-counting across related issues.
26. Learning/profile changes are suggestions until reviewed and approved. One case or a selected option does not prove success.

## Gate F — Data governance and application integrity
27. Each record has a primary data layer SETTING, INPUT or ANALYTICAL and separately carries truth/provenance class where applicable.
28. Every analytical result identifies its source input snapshot, setting/profile version, formula/engine version, run time, period and status.
29. Settings/inputs have version history; corrections do not silently rewrite historical decisions or actual outcomes.
30. All views are projections of canonical records/derived views, not independent mock datasets. Cross-page navigation preserves object identity and relevant filters.
31. Every visible control works or is explicitly disabled with a reason. Pages provide applicable loading, valid, empty, partial/unknown, stale/disconnected, error and unauthorized states.
32. UI is Persian-first RTL with English support, responsive and keyboard accessible; no unintended horizontal overflow at approved viewports.

## Gate G — Technical/release evidence
33. Production records persist across reload, new browser context and server restart using a durable relational database; browser-session state is not sufficient.
34. Server-side authentication/authorization, input validation, transactional integrity, append-only audit, secrets handling and safe errors are tested.
35. Migrations from a clean database, backup/restore, rollback and source-unavailable behavior are tested before production claims.
36. Unit, integration and end-to-end tests cover the critical path and worst-case integrity cases; actual commands/results are recorded.
37. Visual fidelity to the relevant reference is demonstrated by screenshots at the same viewport, not asserted from memory.
38. Live integrations are marked NOT CONNECTED until a tested adapter and authorized environment prove otherwise.

## Acceptance evidence and failure rule
A reviewer must be able to answer: what was known, what was uncertain, which options were considered, why the human decision was made, what resources/actions were committed, what happened, and what can legitimately be learned.

For each criterion record PASS, FAIL, BLOCKED, NOT RUN or NEEDS REVIEW with evidence. A prototype may pass UI-only checks while backend/security/integration checks remain BLOCKED. Do not claim MVP operational acceptance or production readiness while any mandatory gate remains unproven.

## Explicit MVP exclusions
- Autonomous decisions, autonomous ERP write-back or automatic schedule changes.
- Advanced self-optimizing weights or automatic profile changes.
- Broad live SAP/P6/MES/SCADA/finance integration without tested adapters.
- Guaranteed detection of deliberate manipulation.
- Precise causal ROI without defensible baseline, outcome and methodology.
- Universal mathematical optimality when data/constraints are incomplete.
- Full catalogue authoring or comprehensive all-project simulation before the pilot is proven.
