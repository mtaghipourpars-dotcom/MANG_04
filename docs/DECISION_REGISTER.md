# MANG_04 Decision Register

Status labels:
- **AGREED:** Confirmed in collaboration and consistent with source direction.
- **INFERRED:** Consolidated interpretation from source repositories; revise if a source-level contract contradicts it.
- **OPEN:** Needs a specific product decision; do not guess.

| ID | Decision | Status | Rationale / boundary |
|---|---|---|---|
| D-001 | Product addresses evidence-based allocation of scarce key resources to issues and solutions, not information display alone. | AGREED | Core value is decision process and resource allocation. |
| D-002 | Issue registration is focused on designated KEY RESOURCEs, not every event in the organization. | AGREED | Avoid turning the product into a generic ticketing system. |
| D-003 | Each KEY RESOURCE has one unique RESPONSIBLE owner. | AGREED | Accountability for timely reporting of relevant resource problems. |
| D-004 | Initial issue registration must be easy; details are enriched progressively. | AGREED | Do not require full financial/impact analysis at intake. |
| D-005 | Issues and solutions must be evidence-based; data quality limitations must be visible. | AGREED | Avoid unqualified claims and false precision. |
| D-006 | LOCAL/GLOBAL scope and delegated authority are distinct; escalation occurs when needed decisions exceed authority. | AGREED | Score/scope informs routing, but authority matrix determines decision rights. |
| D-007 | Role-based access and issue confidentiality are distinct controls. | AGREED | Scope alone does not determine who can see sensitive content. |
| D-008 | Decisions select SOLUTIONs for issues; projects are not simply approved/rejected. | AGREED | Solution sets may combine actions/resources across projects. |
| D-009 | Profiles are context-specific and versioned; no fixed universally optimal factor weighting. | AGREED | Conditions and organizational priorities vary over time. |
| D-010 | Human managers retain decision authority in MVP and early versions. | AGREED | System provides evidence, alternatives, traceability, and outcome evaluation. |
| D-011 | Outcome effectiveness and resource efficiency are evaluated separately. | AGREED | Outcome alone does not prove decision quality. |
| D-012 | Learning may suggest future parameter/profile changes; past decisions are not retroactively rewritten. | AGREED | Preserve original decision context and history. |
| D-013 | SETTING, INPUT, and ANALYTICAL data remain separate and traceable. | AGREED | Governance and analytical reproducibility. |
| D-014 | Missing/unknown values must not be silently replaced by zero or normal status. | AGREED | Prevent misleading analytical results. |
| D-015 | MVP can start with manual input and a general qualitative profile; advanced learning/integrations are later maturity capabilities. | AGREED | Do not overstate MVP scope. |
| D-016 | MANG_04 consolidates conceptual decisions; it does not imply all source code has been merged. | INFERRED | Keep domain-specific implementations in their source repositories until explicitly migrated. |
| O-001 | Exact MVP issue types and minimum required fields per type. | OPEN | Must be mapped from the issue catalog and intake workflow. |
| O-002 | Exact scoring threshold/rules for LOCAL vs GLOBAL routing. | OPEN | Needs alignment with source rules and organizational authority matrix. |
| O-003 | Detailed evidence-quality gates and consequences by issue type. | OPEN | Need explicit, testable rules; do not claim they eliminate all manipulation. |
| O-004 | Minimum quantitative financial calculations allowed in MVP, if any. | OPEN | Requires agreed formulas, units, time horizon, and valid source inputs. |
| O-005 | Cross-issue shared-resource comparison method in MVP. | OPEN | Qualitative comparison may be sufficient initially; quantitative optimization needs stronger data and method. |
| O-006 | Governance for accepting/applying learned profile changes in mature versions. | OPEN | Separate recommendation, approval, and activation. |
| O-007 | Exact system boundary and integration contract between MANG_03, newmodel1, and MANG_01. | OPEN | Agree which service owns each data object and workflow before implementation merge. |
