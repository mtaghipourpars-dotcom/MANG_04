# MANG_04 Product Architecture Baseline

## 1. Product role
MANG_04 defines an enterprise decision-support service centered on issues affecting designated key resources. It is not an ERP replacement and not merely a reporting/dashboard layer. It connects issue context, evidence, applicable solution options, scarce-resource constraints, authorized decisions, execution, outcome assessment, and organizational learning.

## 2. Core domain objects
- **KEY RESOURCE:** Organizational resource designated as important enough to have explicit ownership and issue reporting accountability.
- **RESPONSIBLE:** Unique accountable owner of a key resource.
- **ISSUE:** A qualified issue affecting a key resource or the organization's ability to meet an important commitment/objective.
- **EVIDENCE:** A source-backed observation, document, measurement, or explicit assumption supporting or challenging a claim.
- **SOLUTION CANDIDATE:** A potential response to an issue, assessed in the context of the issue and current conditions.
- **DECISION PROFILE:** Versioned configuration describing the decision factors and their relative importance for a given issue type or organizational context.
- **DECISION:** Human-authorized selection of one or more solutions, including rationale and rejected alternatives.
- **ACTION:** A committed execution step with accountable owner, timing, status, and evidence.
- **OUTCOME:** Observed results compared with expectations and the applicable baseline.
- **LEARNING RECORD:** A historical record of context, profile version, evidence, decision, action, and outcome used to inform future decisions.

## 3. Issue ownership and lifecycle
The KEY RESOURCE–RESPONSIBLE matrix establishes unique ownership. The responsible owner is accountable for reporting relevant defects, breakdowns, loss of availability, and risks. Registration should be simple at first; the record is enriched progressively by the managers and subject-matter owners needed for qualification and impact assessment.

The issue's organizational scope and score help determine the handling path:
- LOCAL: handled within the team/authority that can resolve it.
- GLOBAL: cross-team or organization-wide coordination and/or higher-level decision is required.

Escalation is required when the decision needed falls outside the delegated authority matrix for that domain. A high score and an authority boundary are separate signals; neither should be silently substituted for the other.

## 4. Evidence and data quality
Every material claim should identify its evidence/source and status. Distinguish confirmed, estimated, assumed, stale, contradictory, incomplete, and unverified information. Quality gates should disclose data limitations and their effect on confidence or eligibility for analysis. The system must not imply that evidence review guarantees all manipulation can be detected.

## 5. Solution assessment
Assess each candidate against:
- applicability to the issue;
- feasibility under real resource/time constraints;
- expected effect on commitments, liquidity/cash timing, operating bottlenecks, value/margin, and risk as relevant;
- required resources and time window;
- assumptions and uncertainty;
- impact on other issues competing for shared resources;
- implementation owner and execution dependencies.

The product must allow a combined solution set where appropriate; it should not force a binary choice between projects. In MVP, impact assessment can be qualitative and evidence-linked. Quantitative calculations require defined formulas, units, time horizons, and valid inputs.

## 6. Authority and auditability
The system provides decision support and analytical independence, not autonomous authority. Record the decision-maker, authority level, selected solution(s), rationale, rejected alternatives and reasons, profile/version, evidence snapshot, and timestamp. Confidentiality controls and role-based access are independent from the issue's LOCAL/GLOBAL scope.

## 7. Evaluation and learning
Compare expected and observed outcomes. Evaluate effectiveness (whether intended outcomes occurred) separately from efficiency (resources used to achieve them). Avoid simplistic attribution: outcomes may be affected by execution quality, external changes, and assumptions. Historical decisions remain immutable records of what was known and selected at the time. Learning can propose future profile/parameter changes; applying them is a separate governed action.

## 8. Cross-repository role
- MANG_03 provides the general issue–solution and decision-learning framework.
- newmodel1 provides an industrial PVPT domain context, especially projects/products, production structure, commitments, and time-phased shared-resource constraints.
- MANG_01 provides input governance and data-layer rules.
MANG_04 is the integration of the agreed conceptual baseline, not an assertion that source codebases have been merged.


## 9. Canonical reconciliation update (2026-10-29)

This document is the concise architecture baseline. For the fully reconciled cross-repository requirements, use [Unified Product Requirements](UNIFIED_PRODUCT_REQUIREMENTS.md) and [Unified Data & Architecture Contract](UNIFIED_DATA_AND_ARCHITECTURE_CONTRACT.md). If wording here is less specific than those contracts, the unified contracts govern.

Key reconciliations now fixed:
- MANG_03 is the generic decision-support core; PVPT is the industrial domain; MANG_01 contributes data governance and cockpit patterns.
- MVP financial assessment starts with manager-owned qualitative parameters. Quantified finance is staged and evidence-gated.
- Feasibility precedes profile ranking; INSUFFICIENT_EVIDENCE differs from NOT_FEASIBLE; no feasible option triggers escalation.
- SETTING / INPUT / ANALYTICAL are separate from provenance and epistemic-status axes.
- Time-phased resource analysis does not authorize autonomous schedule changes or ERP write-back.
- The five executive cards and two distinct Home views in MANG_04 govern over older screen sketches.
- PostgreSQL and self-hosted deployment are target architecture only until provisioning and tests are verified.
