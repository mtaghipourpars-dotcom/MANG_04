# Unified Data & Architecture Contract

**Status:** Canonical target contract; implementation is not implied  
**Date:** 2026-10-29

## 1. Data layers and provenance are separate axes

Every record has exactly one primary layer: SETTING, INPUT, or ANALYTICAL.

- SETTING: governed policy, profile, parameter, scale, threshold or model configuration.
- INPUT: observed/claimed/source-imported data.
- ANALYTICAL: derived output, not directly editable.

Separately record truth/provenance class: PUBLIC_VERIFIED, INTERNAL_VERIFIED, USER_APPROVED_ASSUMPTION, DEMO_SYNTHETIC, UNKNOWN. Claim epistemic status may separately be OBSERVED_FACT, ASSUMPTION, HYPOTHESIS, INFERENCE, or VALIDATED_CAUSE. Do not combine these axes into one field.

## 2. Canonical entities

The conceptual model includes:
- Reference: organization/domain, KEY_RESOURCE, responsible owner, product family, product, project, project-product assignment, commitment, milestone, activity/dependency, BOM revision/component/Cell, production order/operation, resource/capacity period/demand, supplier/supply commitment.
- Issue: ISSUE_INTAKE, QUALIFICATION_EVENT, ISSUE_CASE, ISSUE_LINK, IMPACT, EVIDENCE/PROVENANCE.
- Decision: SOLUTION_TYPE, SOLUTION_CANDIDATE, ASSESSMENT, DECISION_PROFILE/version, BASELINE_SNAPSHOT, FEASIBILITY_RUN/RESULT, DECISION/DECISION_EVENT, ACTION/ACTION_EVENT, OUTCOME_OBSERVATION, LEARNING_RECORD.
- Governance: DATA_ITEM, INPUT_MATRIX_VERSION, SETTING_VERSION, AUDIT_EVENT, SOURCE_REGISTRY, APPROVAL_EVENT.

Implement only the minimum subset needed by the pilot; this conceptual list is not a requirement to build every table in one pass.

## 3. Mandatory temporal/version semantics

- Use stable identifiers and effective-dated relationships.
- Freeze exact input snapshot, settings/profile version, rules/engine version and time horizon used for a feasibility result and decision.
- Keep baseline, plan, forecast, assumption, actual, value-at-risk, realized loss and protected value as separate meanings/states.
- Correcting input appends a version/change event; it does not rewrite the original submission or an approved historical decision.
- Outcomes are append-only observations; corrections append a correction/superseding event with rationale.
- A changed setting marks dependent analytical outputs stale and requires/recommends recalculation according to policy.
- A historical result is immutable and referenced by a current pointer; never overwrite the decision-time feasibility result.

## 4. Provenance minimum

For decision-relevant data, retain as applicable: data layer, truth class, epistemic status, source system/reference/owner, source URL/record ID, observed/retrieved/as-of times, validity dates, unit, currency, period, method/formula version, confidence, quality/integrity status, approver, creator/timestamps and supersedes ID.

The domain schema defines the required subset for each record type. A financial figure without defensible amount, currency, period, method, provenance and approval stays unquantified.

## 5. Input matrix contract

Each data item/field has:
- stable code/name and business definition;
- domain and field schema;
- unit/currency/scale and period basis;
- data owner and submitter role/person only after approval;
- approver if required;
- frequency and deadline rule only after approval;
- entry method, authoritative source and conflict-resolution source;
- validation and cross-page consistency rules;
- late-data and correction policies;
- approval state, effective period, review owner and measured entry effort where available.

MANG_01 defines the governance structure, not the final real-world role assignments or frequencies. Do not schedule a task until its row is approved.

## 6. Analytical output contract

Each analytical result identifies definition, value/unit, period/as-of/freshness, result state, source input snapshots, setting/profile version, formula/engine version, run time, explanation and drill-down to supporting evidence/history.

Unknown, stale, incomplete, invalid, unauthorized and disconnected are distinct states. None may be displayed as zero or healthy by default.

## 7. Relational integrity and feasibility

PostgreSQL is the target durable relational store, subject to actual provisioning and migration discovery. Enforce foreign keys, stable IDs, business-key uniqueness, transactional state changes, idempotency where needed, append-only audit and server-side object-level authorization.

A feasibility result includes baseline snapshot, case/scenario/option IDs, engine/policy versions, run time and seed where applicable, per-gate status/blocker, affected resource/quantity/unit/time bucket, evidence/confidence/data quality, displaced commitment/opportunity cost where calculable, and next action/escalation.

Required distinctions:
- FEASIBLE
- PARTIALLY_FEASIBLE, only with explicit conditions and governed interpretation
- NOT_FEASIBLE
- INSUFFICIENT_EVIDENCE
- case-level NO_FEASIBLE_OPTION

Missing capacity cannot prove feasibility or physical infeasibility. Do not allow selection when required evidence is insufficient. If no candidate passes hard gates, show the constraint/resource crisis rather than inventing an answer.

## 8. API/service boundary

Logical operations include intake creation/listing; qualification events; issue/candidate details; assessments; feasibility evaluation; decision/approval events; action assignment/update; outcome append; project/value-map views; source readiness; settings/input-matrix versioning; and audit history.

These are logical requirements, not claims that REST routes already exist. Map to the actual stack after repository discovery; do not create duplicate routes if equivalent operations exist.

## 9. Security, errors and resilience

- Authentication and object-level authorization are enforced server-side.
- Sensitive reads and every mutation are permission-checked and audited.
- Errors carry stable code, safe message, request/correlation ID and validation details; do not expose stack traces or secrets.
- Source failure must not refresh timestamps or make stale data appear current.
- Secrets stay server-side. Demo fixtures are isolated from real records.
- Backup/restore, migrations, rollback, retention and deployment targets must be tested before production claims.
- Local browser state is allowed only for explicitly temporary demo interaction or non-sensitive view preferences, never production records.
