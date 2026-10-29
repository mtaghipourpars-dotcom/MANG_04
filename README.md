# MANG_04 — Enterprise Decision & Key-Resource Allocation

## Purpose
MANG_04 is the consolidated product and architecture baseline across MANG_03, newmodel1 and MANG_01. It preserves source repositories as authoritative references and records reconciled cross-repository decisions. It does **not** imply that all source implementations have been merged into one executable application.

## Product thesis
The service helps authorized managers handle issues affecting scarce key resources, compare applicable solutions, test feasibility and trade-offs, record human decisions, track actions and observed outcomes, and learn from evidence. It is not an ERP replacement, passive BI dashboard, autonomous decision-maker or production scheduler.

The intended organizational change is from person-dependent, preference-driven allocation to documented, defensible reasoning. Decision authority remains with authorized people.

## Canonical documents
- [Unified Product Requirements](docs/UNIFIED_PRODUCT_REQUIREMENTS.md) — product boundary, lifecycle, core objects, MVP, Home and domain rules.
- [Unified Data & Architecture Contract](docs/UNIFIED_DATA_AND_ARCHITECTURE_CONTRACT.md) — data classes, provenance, versioning, feasibility, API/security boundaries.
- [Repository Reconciliation](docs/REPOSITORY_RECONCILIATION.md) — source review, conflict resolutions and remaining dependencies.
- [Decision Register](docs/DECISION_REGISTER.md) — accepted principles and genuinely open implementation/data dependencies.
- [Open Items and Evidence-Gated Dependencies](docs/OPEN_QUESTIONS.md) — source-derived answers and remaining blockers; not a questionnaire.
- [MVP Acceptance Criteria](docs/MVP_ACCEPTANCE_CRITERIA.md) — evidence required to claim MVP acceptance.
- [Source Repository Map](docs/SOURCE_REPOSITORY_MAP.md) — ownership and migration boundaries.
- [Collaboration Context](docs/COLLABORATION_CONTEXT.md) — product context, Home composition and industrial example.

## Source repositories
- [MANG_03](https://github.com/mtaghipourpars-dotcom/MANG_03): generic Issue–Solution lifecycle, key-resource allocation, evidence, profiles, outcomes, learning and prototype.
- [newmodel1](https://github.com/mtaghipourpars-dotcom/newmodel1): PVPT industrial product/project/resource domain, BOM/Cell, time-phased feasibility, visual baseline and demo.
- [MANG_01](https://github.com/mtaghipourpars-dotcom/MANG_01): input governance, data-layer separation, manual/Excel entry matrix and CEO Cockpit architecture.

## Canonical lifecycle
ISSUE INTAKE → QUALIFICATION → ISSUE CASE → SOLUTION CANDIDATES → EVIDENCE / ASSESSMENT → FEASIBILITY → PROFILE COMPARISON → HUMAN DECISION → ACTIONS → OBSERVED OUTCOME → REVIEW / LEARNING.

## Non-negotiable principles
1. Issues focus on KEY RESOURCEs, not every organizational event.
2. Each KEY RESOURCE has one accountable owner.
3. Preserve original intake and progressively enrich it; never require financial estimates at intake.
4. Evidence, provenance, uncertainty, contradiction and data freshness are visible.
5. Scope, authority, confidentiality, qualification, urgency, priority and feasibility are distinct.
6. Hard constraints precede profile ranking; no feasible option produces explicit escalation.
7. Effectiveness and efficiency remain separate; ordinal ratings are not currency.
8. SETTING, INPUT and ANALYTICAL are distinct from truth/provenance and epistemic status.
9. Unknown is not zero, healthy or feasible.
10. Decisions remain human; history, rejected alternatives, actions and outcomes are retained.
11. Public product catalogue does not prove internal project or financial facts.
12. No live integration, production persistence, authorization or value claim without implementation and test evidence.

## MVP proof obligation
Demonstrate one traceable issue-to-outcome case with intake and qualification, evidence quality, affected objects/commitments, at least two human-proposed alternatives, deterministic feasibility, versioned comparison profile, human decision/rationale, actions, frozen expected baseline, actual outcome or explicit unknown, provenance and audit history.

## Repository governance
MANG_04 is currently the consolidated product/architecture baseline. Source-specific technical details remain in source repositories until deliberately migrated and validated. Do not overwrite unresolved dependencies with guesses. Record foundational changes with rationale, scope and effective version.


## Google AI Studio MVP implementation
- [Google AI Studio Build Specification](docs/GOOGLE_AI_STUDIO_BUILD_SPEC.md) — implementation workflow, persistence rules and release gates.
- [Google AI Studio Implementation Prompt](docs/GOOGLE_AI_STUDIO_IMPLEMENTATION_PROMPT.md) — controlled build prompt.
- [Database Schema Template](docs/GOOGLE_AI_STUDIO_DATABASE_SCHEMA_TEMPLATE.md) — approval-gated domain schema inventory.

**Blocking prerequisites:** attach the exact `MAIN.PNG` reference image to the AI Studio project and verify/configure the intended database environment. The implementation contract prohibits guessing either the screen or the database product. No application deployment or database provisioning is claimed by this documentation commit.
