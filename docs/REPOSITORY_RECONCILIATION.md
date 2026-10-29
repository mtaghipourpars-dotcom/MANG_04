# Source Repository Reconciliation

**Status:** Source-document and repository-tree review completed  
**Date:** 2026-10-29

## 1. Executive result

The three repositories describe complementary layers, not competing products:

- **MANG_03 — Generic enterprise decision-support core:** issue intake and qualification, contextual Issue–Solution network, evidence/provenance, human decision authority, feasibility-before-priority, actions, observed outcomes, and controlled learning.
- **newmodel1 — PVPT industrial application/domain:** value exposed by product/project/commitment risk; BOM/Cell, operations, materials, machines, skills, supplier receipts, cash and milestones; time-phased feasibility and shared-resource opportunity cost. This richer domain model must not be described as implemented merely because it is documented.
- **MANG_01 — Management cockpit and input governance:** strict SETTING / INPUT / ANALYTICAL separation, low-friction manual/Excel input, owner/frequency/deadline matrix, versioning, audit, freshness and quality states.
- **MANG_04 — Consolidated product contract:** owns cross-repository terminology, boundaries, canonical decisions, acceptance criteria and migration decisions. It does not imply that source code or all assets have been merged.

## 2. Source material reviewed

### MANG_03
README, DECISIONS, ACCEPTANCE_GATES, APP_ARCHITECTURE_AND_DATA, IMPLEMENTATION_LEDGER, MASTER_PROTOCOL; Persian product charter and lifecycle; decision/learning; value-evidence measurement; parametric impact assessment; enterprise Issue–Solution reference matrix; worst-case stress-test specification. The repository tree also includes the browser prototype, synthetic CASE-024 fixtures, bilingual/localization files, seed taxonomies, smoke tests and workflow/build contracts.

### newmodel1
README, PVPT product model and MVP architecture, CEO Home and sidebar contracts, canonical data model v0.1, Product→Project Object Model, PARS real-data boundary, portfolio baseline, MVP master data model, decision log, acceptance gates and feasibility contract. The tree also includes demo/main.png, browser UI/engine code, synthetic fixtures and smoke/regression tests.

### MANG_01
README, INPUT_DATA_GOVERNANCE, MVP_DECISION_REGISTER and SYSTEM_DESIGN.

**Evidence boundary:** This is a review of repository trees and source documents. It does not establish that Google AI Studio has run, a production database is provisioned, real internal PARS records are available, or source integrations/security/operational tests have passed.

## 3. Resolved conflicts and canonical rulings

| Topic | Source tension | Canonical ruling |
|---|---|---|
| Product identity | MANG_03 is enterprise-wide; newmodel1 is PVPT/PARS-specific; MANG_01 uses CEO Cockpit framing | MANG_03 is the reusable core; PVPT is an industrial domain/pilot; cockpit is a management interface, not a separate product core. |
| ERP / production scheduling | PVPT models production/resource simulation; MANG_03 explicitly is not a production-planning optimizer | The service may evaluate supplied/computed scenarios and time-phased feasibility, but must not autonomously create/change detailed schedules or post ERP transactions. |
| Options and AI | PVPT says MVP options come from specialists; MANG_03 has applicable candidates and future matching | MVP records and compares human-proposed, case-specific candidates from authorized stakeholders and curated patterns. AI may summarize or suggest questions, not invent facts, approve or execute. |
| Financial assessment | Older MANG_03 D-010 discusses candidate-level monetary impact; later D-018 and the implementation protocol favor staged qualitative assessment; MANG_01 forbids unsupported formulas | Intake never requires financial estimates. MVP begins with manager-owned, versioned qualitative dimensions and explicit UNKNOWN. Quantified cash/margin/exposure is added only when source, method, currency, period, assumptions, confidence and ownership are defensible. Ordinal scores are never money. |
| Feasibility vs preference | Both repositories discuss ranking; PVPT requires hard gates and time-phased resource checks | Apply hard constraints first. Unknown evidence is not proof of feasibility or infeasibility; distinguish INSUFFICIENT_EVIDENCE from NOT_FEASIBLE. If none is feasible, show NO_FEASIBLE_OPTION and escalate. |
| Data truth | MANG_01 defines three data classes; PVPT defines provenance classes; MANG_03 distinguishes fact/assumption/hypothesis/inference | Keep orthogonal classifications: data layer SETTING / INPUT / ANALYTICAL; truth/provenance class such as PUBLIC_VERIFIED, INTERNAL_VERIFIED, USER_APPROVED_ASSUMPTION, DEMO_SYNTHETIC, UNKNOWN; and epistemic status where useful. |
| Public catalogue vs operations | PVPT public catalogue supports product facts only | Public product facts cannot prove project assignments, customers, commitments, delivery, margins, cash, capacity or exposure. |
| History and learning | All sources require audit/versioning; prototypes use browser/session state | Preserve original intake and decision-time snapshots. Changes append versions/events; outcomes are append-only. Current prototype session state is not durable audit history. |
| MVP scope | MANG_03 has a broad enterprise taxonomy; PVPT has a deep resource model; MANG_01 has broad cockpit requirements | Prove one narrow end-to-end case first: critical component/supplier delay → affected commitment → candidate solutions → feasibility → human decision → actions → observed outcome. Do not implement every domain before this path is proven. |
| Storage/technology | MANG_01 proposes React/TypeScript, FastAPI, PostgreSQL; newmodel1 targets PostgreSQL; MANG_03 requires actual-stack discovery | PostgreSQL is the durable persistence target; modular monolith/API separation is preferred. Actual stack, migration and provisioning remain gated by discovery and verification. |
| Home page | PVPT's older home blueprint and MANG_03 contract differ in detailed section order | Preserve MANG_04's agreed five executive cards: Near intervention deadlines; Urgent management decisions; Liquidity; Key customer commitments; Operational bottlenecks. Then Issue workbench and side-by-side Project Value & Risk Map / Product–Work Portfolio Status. Other views are supporting sections. |
| Product families | Official public catalogue lists finer categories than PVPT's six UI families | Preserve the six canonical PVPT top-level family IDs. Map finer catalogue categories underneath; do not silently add top-level families. Keep Services & Overhaul as a service/business area unless a source-backed service catalogue is adopted. |
| Qualification and catalogue editing | MANG_03 has qualification and seed catalogues; prototype shows NEW ISSUE / NEW SOLUTION disabled | Preserve every intake. Qualification is transparent and explainable. MVP uses curated versioned catalogues; reusable catalogue authoring stays deferred. A case-specific candidate is not a new reusable solution type. |

## 4. Important constraints retained

1. One accountable owner per KEY RESOURCE; this does not replace case or decision ownership.
2. KEY RESOURCE scope is limited to scarce, strategic, constraining, decision-relevant or shared resources.
3. A generic knowledge-network link is not proof of a case-specific causal relationship.
4. Evidence quality and provenance must be visible. Intentional manipulation cannot always be detected; unsupported, contradictory, stale and unverified claims must not be silently certified.
5. Qualification, urgency, priority, feasibility, authority, decision, action completion, resolution, outcome and value attribution are distinct.
6. Effectiveness and efficiency remain separate.
7. A lower-level decision does not suppress applicable options at a higher level. Superseding decisions preserve history and address actions already underway.
8. Recommendation abstention and an authorized, reversible, time-limited emergency path are supported; neither bypasses authority or hard constraints.
9. Selection or action completion does not prove success. Learning requires observed outcomes, baseline and uncertainty-aware human review.
10. Demo, assumption, unknown and verified records never silently promote into one another.

## 5. Genuine unresolved implementation/data dependencies

These are not questions to send to the user now; they are gated dependencies.

- Real pilot data: authoritative project/WBS IDs, product-project assignments, component/BOM, commitments/milestones, source owner, as-of date and approved evidence.
- Operational policy owners: actual roles and delegated authority matrix; qualification thresholds and exception reviewers; approval rules for data and settings.
- Scoring policy: final parameter catalogue/anchors, profile aggregation, missing-data behavior and thresholds for deeper analysis. Equal weights are a baseline proposal, not universal policy.
- Quantified finance: approved formulas, source fields, currency/unit/period conventions, forecast horizons, overlap/double-count prevention and approval authority.
- Resource-engine inputs: calendars, effective capacity, skills/substitution, material reservation/receipt, cash periods and source confidence for a real scenario.
- Technical provisioning: actual application stack, PostgreSQL environment, identity provider, hosting, backup/restore, retention and operational SLO targets.
- Acceptance evidence: visual comparison at required viewport, runtime/E2E regression, backend persistence, authorization, concurrency, recovery and source-adapter tests.
- Data-entry matrix: real per-field owners, submitters, approvers, frequency and deadlines. The governance structure is defined; actual assignments are not.
- Outcome ownership: who records actuals and independently reviews causal/value-attribution claims.

Until these inputs are supplied by accountable owners or demonstrated by tested source access, preserve NEEDS_APPROVAL / DATA_REQUIRED / UNKNOWN / BLOCKED states.

## 6. Next implementation order

1. Canonical vocabulary and source-of-truth contract.
2. Freeze one narrow end-to-end pilot scenario and data/provenance manifest.
3. Define canonical entities, versioned snapshots and event/audit semantics.
4. Define the manual-input matrix and validation rules for the pilot only.
5. Build a visual slice with clearly labelled demo fixtures, then bind the same UI to canonical data.
6. Implement deterministic qualification, feasibility, profile comparison, human decision and outcome services.
7. Add persistent backend, server-side authorization, migrations, audit and recovery.
8. Validate the complete path and worst-case cases before expanding scope.
