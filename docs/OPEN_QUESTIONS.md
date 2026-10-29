# Open Questions — Only Decisions That Need Product-Owner Input

Do not re-ask foundational principles already marked AGREED in DECISION_REGISTER.md. Research source documents and propose an answer before asking the product owner.

## O-001 — MVP issue types and minimum fields
**Working approach:** Reuse the existing MANG_03 issue-type catalog and qualification rules as the starting baseline. Identify only those types needed to demonstrate the first end-to-end MVP case. Avoid asking for financial effects at initial registration unless the issue type genuinely requires it.

**Question for owner:** Which issue type(s) should be the first fully demonstrated MVP path? This should be asked only after inspecting the current source catalog and demo case.

## O-002 — LOCAL/GLOBAL routing thresholds
**Working approach:** Keep issue scope score and delegated authority as separate concepts. A score may signal cross-functional significance; escalation is required when the decision exceeds the current level's authority.

**Question for owner:** Which specific score thresholds or conditions should be authoritative in MVP, if they are not already defined in MANG_03?

## O-003 — Evidence quality gates
**Working approach:** Define status labels, required evidence by issue type, and explicit consequences for missing/contradictory evidence. A gate may block a specific conclusion or lower confidence without necessarily preventing issue registration.

**Question for owner:** Only if the source rules do not decide it: which evidence deficiencies must block solution comparison versus merely display a warning?

## O-004 — MVP quantitative financial outputs
**Working approach:** Prefer qualitative, evidence-linked impacts where financial formulas or trusted inputs are unavailable. Never imply precision without method and data.

**Question for owner:** Are there any financial measures that must be quantitatively calculated in MVP rather than displayed as a qualified estimate?

## O-005 — Shared-resource trade-offs
**Working approach:** Demonstrate the trade-off explicitly, even if qualitative. Do not call a solution globally optimal unless resource constraints and alternatives have been sufficiently modeled.

**Question for owner:** Which shared resource should anchor the first demonstrable cross-issue competition case: liquidity/cash, a critical part, machine capacity, or another resource? Ask only if the existing demo/reference scenario does not already establish this.

## O-006 — Learned profile changes
**Working approach:** For early versions, record historical evidence/outcomes and support manager-controlled profile changes. Later versions may recommend new weights; recommendation, approval, activation, and historical versioning remain separate.

**Question for owner:** No MVP question required unless learned profile changes are proposed for MVP scope.

## O-007 — Cross-repository ownership
**Working approach:** MANG_03 owns generic issue/solution/decision-learning concepts; newmodel1 owns PVPT industrial domain concepts; MANG_01 provides input governance and analytical provenance patterns. Do not duplicate authoritative objects without a declared source of truth.

**Question for owner:** Before implementation merge, confirm whether MANG_04 is intended to remain a consolidated product/architecture repository or become the primary executable repository. This affects migration strategy, not the product's foundational principles.
