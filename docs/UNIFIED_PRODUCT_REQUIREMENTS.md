# Unified Product Requirements — MANG_04

**Status:** Consolidated product baseline | **Version:** 1.0 | **Date:** 2026-10-29

## 1. Product definition

MANG is an enterprise decision-support service for managing issues that threaten or enable business commitments and outcomes when key resources are scarce. It helps authorized managers understand evidence and uncertainty, compare case-specific solution candidates, test feasibility and trade-offs, record human decisions, follow actions, observe outcomes, and learn without rewriting history.

It is not an ERP replacement, generic BI dashboard, autonomous executive, MRP/APS replacement, detailed production scheduler, or unattended transaction executor.

PVPT is the industrial/PARS-oriented domain for value protection across product → project → commitment → operational constraint → value exposure → intervention → decision → outcome. MANG_03 supplies reusable issue/decision principles. MANG_01 supplies input governance and cockpit requirements.

## 2. Executive question

**Which commitment or outcome is at risk, what evidence links the issue to it, what is the last defensible intervention window, which feasible response best fits current priorities, what scarce resources does it consume or release, and what happened after the decision?**

The service supports defensible management decisions; it does not guarantee that risk will be prevented or financial value realized.

## 3. Canonical lifecycle

ISSUE INTAKE → QUALIFICATION → ISSUE CASE / CONTEXT → SOLUTION CANDIDATES → EVIDENCE & ASSESSMENT → FEASIBILITY → PROFILE COMPARISON → HUMAN DECISION → ACTIONS → OBSERVED OUTCOME → REVIEW / LEARNING

This is a conceptual lifecycle, not a mandatory route for every case. Authority and context may allow local resolution or escalation. Every branch and disposition remains traceable.

### Required distinctions
- Intake is not formal acceptance.
- Qualification is not urgency or priority.
- Relationship is not verified causality.
- Feasibility is not desirability.
- Unknown evidence is neither zero nor normal.
- Decision is not action; action completion is not resolution.
- Forecast/assumption is not actual outcome.
- Outcome after action is not automatically caused by the service.
- Efficiency (resources consumed/opportunity cost) is separate from effectiveness (business result protected/achieved).

## 4. Core domain objects

| Object | Meaning and minimum invariant |
|---|---|
| KEY RESOURCE | A scarce, strategic, constraining, decision-relevant or shared resource; not a catalogue of everything. Exactly one accountable owner per key resource. |
| ISSUE INTAKE | Preserved original report, reporter/context, observed time, narrative, evidence and uncertainty. No required financial estimate or root cause. |
| QUALIFICATION EVENT | Versioned decision to accept, request information, link duplicate, route, mark out-of-scope or send to manual review, with reason and authority. |
| ISSUE CASE | Formal case accepted into the governed Issue–Solution lifecycle. |
| OPERATIONAL OBJECT / COMMITMENT | Reference to existing project, WBS, product, component, production order, sales/customer order, commitment, milestone or other source object; not a duplicate source of record. |
| EVIDENCE / PROVENANCE | Source class, source/reference, owner, as-of/validity, retrieval/observation time, confidence, quality/integrity, approval and relationship to claim. |
| ISSUE LINK / IMPACT | Typed, contextual, directional where relevant, versioned relation. A reusable pattern does not establish a case-specific link or causal impact. |
| SOLUTION TYPE | Reusable curated catalogue pattern; creation/editing is governed and deferred from MVP. |
| SOLUTION CANDIDATE | A specific option proposed for one case by an authorized stakeholder; assessed independently. |
| ASSESSMENT | Versioned parameter-level impact view with assessor, anchors, direction, rationale, evidence, confidence and explicit UNKNOWN/NOT_ASSESSED. |
| DECISION PROFILE | Versioned current-goal perspective for comparing candidates; never overrides hard constraints. |
| FEASIBILITY RESULT | Deterministic gate-by-gate result tied to exact baseline/input snapshot, engine and policy versions, time bucket, blockers and evidence. |
| DECISION | Human choice, no-feasible-option disposition, defer/escalate/abstain or authorized emergency decision; preserves authority, rationale, alternatives and snapshot. |
| ACTION | Separate assigned work with owner, due date, status, evidence, changes and cancellation/continuation when superseded. |
| OUTCOME OBSERVATION | Append-only actual result with source, period, units and quality; unknown outcome remains unknown. |
| LEARNING RECORD | Reviewed lesson with context, sample size, uncertainty and alternate explanations; never automatically promoted from one case. |
| SETTING / INPUT / ANALYTICAL | Separate data lifecycle classes. Derived outputs point to exact inputs, settings and calculation/engine versions. |

## 5. Data-class and truth-class contract

Every record has exactly one primary data-layer class:
- SETTING: policy/configuration, scale, threshold, profile or parameter; versioned, owned, approved and effective-dated.
- INPUT: manually entered or source-imported base fact/claim; owner, source, period, unit, validation and change history.
- ANALYTICAL: derived result; not directly editable and tied to input snapshot, setting version, formula/engine version and execution time.

Separately classify source/truth status: PUBLIC_VERIFIED, INTERNAL_VERIFIED, USER_APPROVED_ASSUMPTION, DEMO_SYNTHETIC, UNKNOWN. If needed, also classify epistemic status: OBSERVED_FACT, ASSUMPTION, HYPOTHESIS, INFERENCE, VALIDATED_CAUSE. These are orthogonal classifications.

Never substitute zero, green/healthy, feasible or current for missing, stale, unapproved or disconnected data. Unknown is explicit. Corrections preserve prior values and reasons. DEMO and REAL must be isolated in data handling and presentation.

## 6. Evidence and integrity

- Preserve original narrative and evidence even when classification changes.
- Show provenance, age, quality, confidence and contradictory claims on decision-relevant information.
- Separate reported fact, interpretation, inference, hypothesis and validated cause.
- Require evidence or explicit assumption labels for links from a component/material issue to a project, commitment, delay, cash effect or margin effect.
- Support duplicate links and out-of-scope dispositions without deletion.
- Intentional misreporting cannot always be detected. Expose unsupported claims, conflicts, missing source data and review history; do not label a claim verified merely because a user entered it.
- High urgency does not bypass qualification, authority or hard safety/legal/technical gates. Emergency handling must be authorized, reversible where possible, time-limited and audited.

## 7. Candidate assessment and decision rules

1. Candidates are case-specific and may link to one or several projects/commitments.
2. MVP candidates come from authorized managers/experts/planning/procurement/engineering/production/finance or curated applicable patterns. The MVP does not autonomously generate or approve options.
3. Evaluate feasibility before preference ranking. Check dependencies/precedence, time-phased materials, machine/work-center capacity, manpower/skills, method/qualification, safety/legal/technical constraints, cash by time bucket only with approved data, and shared-resource conflict/opportunity cost where supported.
4. Distinguish NOT_FEASIBLE from INSUFFICIENT_EVIDENCE. Missing capacity does not prove feasibility or physical infeasibility.
5. If no candidate passes hard gates, return NO_FEASIBLE_OPTION, list blockers and route a resource/constraint crisis to authorized management.
6. MVP uses manager-owned qualitative 1–5 assessments with written anchors and directions; UNKNOWN/NOT_ASSESSED is permitted. Ordinal values are not money and must not be blindly summed into a universal score.
7. Compare candidates under the same selected, versioned profile. Show underlying dimensions, unknowns, rationale and trade-offs; do not hide applicable candidates.
8. Quantitative monetary/cash-flow calculations are staged until source, method, currency, period, assumptions, confidence, owner and approval are established.
9. Preserve rejected/deferred alternatives and reopening triggers. Later decisions supersede rather than erase earlier decisions; explicitly handle actions already underway.
10. Human decision authority remains explicit. The service can abstain, request evidence or show no feasible option.

## 8. PVPT time-phased resource contract

For the PVPT pilot, model product/product-family, project/product assignment, commitments/milestones, BOM/component/Cell, production order/routing/operation, resource demand/capacity, supplier commitment/receipt, cash constraints, issue/impact and candidate option.

- Product family → product is catalogued; product ↔ project is a separately evidenced many-to-many assignment.
- Each Cell corresponds to a component and maps 1:1 to a production order in the PVPT manufacturing domain; this is not a universal MANG object.
- Production-order operations have precedence; independent orders are dependency-driven, not globally serial.
- Time-phased capacity and demand are required; total monthly capacity alone is insufficient.
- Material availability reconciles free stock, receipts by date, reservations and consumption.
- Machine, skill/manpower, material, method, dependency and supported cash constraints are hard gates before profile ranking.
- Same baseline snapshot + inputs + engine version + policy version + seed must produce deterministic output.
- The service evaluates scenarios and exposes blockers/opportunity cost; it does not post ERP transactions or autonomously change schedules.
- Production actuals, schedules, procurement and finance remain owned by source systems.

## 9. Home and navigation

### Home composition
1. Five executive status cards: Near intervention deadlines; Urgent management decisions; Liquidity; Key customer commitments; Operational bottlenecks.
2. Issue workbench / Issue queue.
3. Two primary views side-by-side: Project Value & Risk Map (efficiency, risk-adjusted allocation, exposure, intervention window, data quality) and Product / Work-Portfolio Status (effectiveness, commitments, delivery and outcomes by product/work domain).
4. Decisions requiring attention beside the priority portfolio.
5. Latest material developments / decision timeline.

Cards and charts are views over canonical data, never independent mock datasets. Clicking them must navigate to relevant filtered detail. Synthetic values are visibly labelled DEMO and must not be presented as actual financial indicators.

Canonical navigation intent: Home; Projects / Portfolio; Value Map / Exposure; Issue; Solution; Decision & Actions; Outcomes / Learning; Settings & Data Governance. PVPT may expose deeper pages for commitments, BOM, routing, suppliers, resource load and data readiness; the first MVP need not implement every destination.

## 10. Manual data-entry governance

The input matrix is a first-class capability. Each item/field defines business meaning, schema, unit/currency/scale, period, data owner, submitter, approver if any, frequency, deadline, entry method, authoritative source, validation, late-data behavior, correction policy, approval state, effective dates, review owner and estimated entry effort where measured.

For low effort, support role-filtered forms, grouped entry, Excel templates generated from the same schema, pre-validation, drafts/autosave where safe, copying a prior period as a proposed value, and avoiding resubmission of unchanged values. A previous value is only a suggestion; it must not silently become a new fact. Unknown owners/frequencies/deadlines remain unapproved and must not create fake tasks.

## 11. Technical target and safety

- Target: self-hosted/on-premise modular monolith with server API, deterministic domain services, relational persistence (PostgreSQL target), migrations, transaction boundaries, server-side validation/authz and append-only audit.
- Actual stack, database provisioning, identity provider, hosting and source adapters must be discovered and verified before implementation claims.
- UI supports Persian RTL and English, responsive layout, accessible keyboard/focus behavior and valid/loading/empty/partial/unknown/stale/disconnected/error/unauthorized states.
- LLMs may summarize evidence, explain deterministic results or draft questions. They cannot create source facts, override gates, turn unknown into zero, approve decisions, execute actions or claim causality without evidence.
- Decision-relevant values carry provenance/as-of and data class.

## 12. MVP proof obligation

The MVP is accepted only when one end-to-end case can be traced through:
1. Intake preserved, including a deliberately incomplete or conflicting claim.
2. Transparent qualification and evidence/quality state.
3. Verified or explicitly assumed links to affected product/project/commitment and key resource.
4. At least two human-proposed solution candidates with separate evidence and assessment.
5. Deterministic feasibility gates with at least one blocked/unknown constraint and clear handling.
6. Common versioned comparison profile with unknowns visible.
7. Human decision, rationale, authority, selected feasibility snapshot and rejected alternatives.
8. Assigned actions with owner/due date/status and change history.
9. Expected baseline frozen at decision time and actual outcome or explicit outcome-not-yet-available.
10. Value attribution state that does not confuse temporal sequence with causality.
11. Audit/history and provenance visible through UI.
12. Tests and evidence proving behavior; unsupported tests marked BLOCKED/NOT IMPLEMENTED.

## 13. Explicit MVP exclusions

- Autonomous decision or transaction execution.
- Automatic ERP schedule changes or ERP write-back.
- Claiming live SAP/P6/MES/SCADA/finance integration without tested adapters and authorized sources.
- Universal optimized score or conversion of ordinal ratings to money.
- Full catalogue authoring in UI.
- Comprehensive simulation of all product families/projects before the pilot is proven.
- Automatic learning/profile changes from one outcome.
- Treating current browser-session prototype state as persistent records or audit history.
