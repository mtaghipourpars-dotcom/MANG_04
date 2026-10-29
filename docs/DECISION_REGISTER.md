# MANG_04 Decision Register

**Authority:** Explicit user decisions in project records first; consistent accepted source contracts second; inference only where marked. **Updated:** 2026-10-29.

## Status labels
- **AGREED:** Explicitly established or consistently accepted across source contracts.
- **INFERRED:** Consolidated interpretation from source repositories.
- **OPEN / BLOCKED:** Needs verified source data, approved policy, provisioning or test evidence. Do not guess.

| ID | Decision | Status | Rationale / boundary |
|---|---|---|---|
| D-001 | Product supports evidence-based allocation of scarce key resources to issues/solutions, not information display alone. | AGREED | Core value is defensible decision-making and resource allocation. |
| D-002 | Issue registration focuses on designated KEY RESOURCEs, not every organizational event. | AGREED | Avoid a generic ticketing system. |
| D-003 | Each KEY RESOURCE has one unique accountable RESPONSIBLE owner. | AGREED | Accountability for timely reporting; separate from case and decision ownership. |
| D-004 | Initial issue registration is lightweight and enriched progressively. | AGREED | No mandatory financial estimate or root cause at intake. |
| D-005 | Preserve intake separately from formal Issue Case and transparent qualification. | AGREED | Incomplete, duplicate, redirected and out-of-scope intakes remain traceable. |
| D-006 | LOCAL/GLOBAL scope, decision authority, confidentiality and access permission are distinct concepts. | AGREED | Scope informs routing; authority determines who may decide; confidentiality controls who may see. |
| D-007 | Use typed, contextual, many-to-many Issue–Solution relationships; generic links do not prove case causality. | AGREED | Evidence, context, validity/version and epistemic status required. |
| D-008 | Decisions select SOLUTIONs for issues; projects are not simply approved/rejected. | AGREED | A candidate may allocate resources across one or more projects. |
| D-009 | Profiles are contextual and versioned; no universally optimal weighting. | AGREED | Preserve exact profile and parameters used for each decision. |
| D-010 | Human managers retain decision and execution authority. | AGREED | No autonomous decisions, ERP write-back or silent action execution. |
| D-011 | Feasibility is assessed before preference ranking; unknown evidence is distinct from infeasibility. | AGREED | Hard gates cannot be overridden by profile weights or AI prose. |
| D-012 | MVP financial assessment starts with manager-owned qualitative parameters. | AGREED | Later MANG_03 D-018 and implementation protocol govern over older D-010's broad monetary wording. Quantification is staged. |
| D-013 | Effectiveness and efficiency are evaluated separately. | AGREED | Do not hide business outcomes and resource/opportunity cost in one opaque score. |
| D-014 | SETTING, INPUT and ANALYTICAL remain separate data layers. | AGREED | Analytical outputs trace to exact inputs/settings/engine versions. |
| D-015 | Data layer, truth/provenance class and claim epistemic status are orthogonal classifications. | AGREED | Avoid one overloaded classification field. |
| D-016 | Missing/unknown/stale/invalid/unapproved/disconnected values never silently become zero or healthy. | AGREED | Explicit readiness and data-quality states required. |
| D-017 | Preserve original intake, decision-time snapshots, rejected alternatives, actions and append-only outcomes. | AGREED | Later decisions supersede rather than erase; account for actions already underway. |
| D-018 | MANG_03 is the generic core; newmodel1/PVPT is the industrial domain; MANG_01 supplies input governance/cockpit patterns. | AGREED | Consolidation does not mean code has been merged. |
| D-019 | PVPT keeps six canonical top-level product-family IDs; finer catalogue categories map underneath. | AGREED | Public catalogue cannot establish project assignments or operational facts. |
| D-020 | KEY_RESOURCE is selective; it is not a complete inventory of every organizational resource. | AGREED | Focus on scarce, strategic, constraining, shared or decision-relevant resources. |
| D-021 | MVP candidates are proposed by authorized people or curated patterns; reusable catalogue authoring remains deferred. | AGREED | No autonomous option generation/approval in MVP. |
| D-022 | MVP proves one end-to-end issue-to-outcome case before broad implementation. | AGREED | Preferred industrial scenario: critical component/supplier delay; real data or explicitly synthetic fixtures. |
| D-023 | Home uses five executive cards and two separate primary views. | AGREED | Cards: intervention deadlines, urgent decisions, liquidity, customer commitments, operational bottlenecks. Views: Value/Risk Map (efficiency) and Portfolio Status (effectiveness). |
| D-024 | PostgreSQL is target durable relational persistence; self-hosted/on-premise is target posture. | AGREED AS TARGET | Actual stack, provisioning, identity and production readiness are not verified. |
| D-025 | PVPT may evaluate time-phased scenarios but must not autonomously change detailed production schedules or post ERP transactions. | AGREED | Operational systems remain owners of transactions and actuals. |
| D-026 | Learning requires observed outcome, baseline, uncertainty and review. | AGREED | Selection alone or one case does not prove success or justify automatic profile change. |
| D-027 | MANG_04 is the consolidated product/architecture baseline for now, not a complete executable-repository migration. | AGREED | Code/assets/history migration is a separate, verified project. |

## Open decisions / blocked dependencies

| ID | Item | Why still open | Safe behavior until resolved |
|---|---|---|---|
| O-001 | Approved real pilot project/WBS, component, product assignment, commitment/milestone and source-owner data | Source repositories do not contain an approved internal pilot extract | Use labelled DEMO_SYNTHETIC; never claim PARS actuals. |
| O-002 | Real roles, authority matrix and approval/delegation | Need for authority is established, but actual organization-specific matrix is not | No inferred approval rights. |
| O-003 | Final qualification thresholds and exception-review owners | Seed rules exist; final thresholds and ownership need pilot validation | Transparent review; never opaque auto-discard. |
| O-004 | Final parameter anchors, profile aggregation and missing-data policy | Sample anchors/equal weights are proposals, not universal policy | Show dimensions and unknowns; no unapproved universal score. |
| O-005 | Financial formulas, currency/period conventions, horizon and overlap/double-count rules | Approved internal financial sources and methods are absent | NOT YET QUANTIFIED / DATA REQUIRED. |
| O-006 | Actual manual input owner/submitter/approver/frequency/deadline matrix | MANG_01 defines the schema, not approved assignments | Do not create fake operational tasks or deadlines. |
| O-007 | Runtime stack, database provisioning, identity, hosting and backup/restore | Target architecture exists; implementation/provisioning not verified | NOT VERIFIED / BLOCKED until tested. |
| O-008 | Real calendars, capacity, material receipts, skills/substitution and cash time buckets | Required for real feasibility; validated data not supplied | INSUFFICIENT_EVIDENCE. |
| O-009 | Outcome recorder and independent value-attribution reviewer | Conceptual requirement exists; actual ownership is undefined | Outcome remains pending/unknown without source. |
| O-010 | Freshness thresholds, SLO, RTO/RPO, retention and numeric operating targets | Source documents intentionally leave numeric targets open | No invented thresholds; approve before production. |
| O-011 | Full visual comparison, runtime regression, persistence, authorization, concurrency, recovery and adapter evidence | Documentation and existing prototype smoke tests do not prove all release gates | Mark each unsupported test BLOCKED/NOT RUN. |

## Deferred beyond first MVP
Full catalogue authoring; autonomous option generation/decision; automatic profile learning; broad live SAP/P6/MES/SCADA/finance integrations; comprehensive simulation across all projects/families; unsupported causal ROI claims.
