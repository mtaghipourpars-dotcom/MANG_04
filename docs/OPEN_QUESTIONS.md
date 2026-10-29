# Open Items and Evidence-Gated Dependencies

This file is not a questionnaire. Foundational questions have been answered from MANG_03, newmodel1 and MANG_01 where those repositories support an answer. Remaining items are implementation/data dependencies and must not be used to reopen settled principles.

## Resolved from source repositories

- **First demonstrable case:** use the industrial critical-component / supplier-delay scenario to trace issue → affected commitment/project → solution candidates → feasibility → human decision → actions → observed outcome. MANG_01's three-project/one-family scenario is a candidate fixture pattern, but real project IDs are not supplied. Use synthetic labels until approved real data is available.
- **Core issue model:** use MANG_03's intake + transparent qualification gate + formal case model and enterprise issue/solution catalogue. Preserve unmatched intakes for manual classification; catalogue authoring stays disabled in MVP.
- **Routing:** local/global scope and delegated authority are separate. Escalate when the decision exceeds delegated authority; do not invent a numeric score threshold. Use configured authority and transparent manual review until approved thresholds exist.
- **Evidence gates:** preserve the intake even when evidence is weak. A deficiency may block a specific claim, link, feasibility conclusion or decision, but does not silently delete the issue. Contradictory/old/unknown evidence is visible and routed for review.
- **Financial analysis:** manager-owned qualitative 1–5 assessment first, with defined scale anchors and explicit UNKNOWN/NOT_ASSESSED. Quantified financial impact only when source, method, period, currency, assumptions, confidence and approval are defensible. No financial estimate is required in initial intake.
- **Shared resource for pilot:** the industrial critical-component / supplier-delay case is the best grounded source scenario. The model should also show the shared-resource competition where data supports it; if actual time-phased data is unavailable, label the scenario DEMO_SYNTHETIC and do not claim a real optimal allocation.
- **Learning:** historical outcomes and manager-controlled profile changes first. Recommendation, approval and activation remain separate; automatic profile changes are outside MVP.
- **Repository ownership:** MANG_03 owns generic issue/solution/decision-learning concepts; newmodel1 owns PVPT industrial/product/project/resource domain; MANG_01 owns the input-governance pattern. MANG_04 currently owns the consolidated product/architecture baseline; full code migration is not implied.

## Open dependencies (do not ask user again unless a specific implementation blocker requires an approval)

### DATA-01 — Real pilot data
Needed: authoritative product and project/WBS IDs, product-project assignments, BOM/component/Cell, commitment/milestone, resource/capacity periods, supplier dates, source owner, as-of date and permission to use. Until supplied by an accountable source, use only clearly labelled synthetic fixtures.

### GOV-01 — Authority and review ownership
Needed: real roles and object-level permissions, delegated decision authority, qualification exception reviewer, data approvers and emergency-action authority. Until approved, no privilege or approval right is inferred.

### MODEL-01 — Profile and assessment policy
Needed: final scale anchors, parameter directions, profile aggregation/missing-data policy, materiality thresholds and refinement triggers. Existing 1–5 anchors and equal-weight baseline are proposals, not approved universal rules. Do not sum ordinal values into money.

### FIN-01 — Quantified finance
Needed: authoritative fields, formula/method, currency, unit, period, forecast horizon, treatment of overlapping impacts and approval process. Until then show NOT YET QUANTIFIED / INTERNAL SOURCE REQUIRED.

### INPUT-01 — Data-entry matrix
Needed: approved per-field owner, submitter, approver, frequency, deadline, authoritative source, late-data policy and correction policy. MANG_01 provides the matrix schema; it does not provide approved assignments. Draft rows must not create real tasks.

### TECH-01 — Runtime and operations
Needed: inspect actual code stack; verify PostgreSQL provisioning, identity, self-hosting, secrets, migrations, authorization, audit, backup/restore, retention and rollback. The architecture is a target contract, not proof of implementation.

### TEST-01 — Acceptance evidence
Needed: same-viewport screenshot comparison against newmodel1/demo/main.png for PVPT visuals; run relevant browser tests; verify durable persistence, object-level authorization, cross-page data consistency, failure states, concurrency, recovery and source adapter contracts. Mark unsupported checks BLOCKED/NOT RUN.

### OUTCOME-01 — Outcome/value review
Needed: owner for actual observations and a review process for baseline/alternative explanations/causal attribution. Until then, retain outcome-not-yet-available and attribution-unknown states.

## Execution rule
Continue implementation and documentation wherever these dependencies do not block it. Do not invent real data, approval policy, formulas, numeric thresholds, or production readiness to make a screen look complete.
