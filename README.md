# MANG_04 — Enterprise Decision & Key-Resource Allocation

## Purpose
MANG_04 is the consolidated working repository for the product direction agreed across MANG_03, newmodel1, and MANG_01. It preserves source repositories as authoritative references and records the cross-repository product baseline. It does not imply that all source implementations have been merged into one executable application.

## Product thesis
The product is not another ERP, project-management system, or passive dashboard. It supports a disciplined, evidence-based process for handling issues affecting organizational key resources, comparing applicable solutions, allocating scarce resources, recording human decisions, tracking actions and outcomes, and learning from decision effectiveness over time.

The core organizational change sought is from person-dependent, preference-driven allocation to documented, defensible reasoning. Decision authority remains with authorized people; the system provides analytical independence, traceability, and outcome evaluation.

## Source repositories
- [MANG_03](https://github.com/mtaghipourpars-dotcom/MANG_03): issue–solution lifecycle, key-resource allocation, decision profiles, evidence, outcomes, learning, architecture and prototype.
- [newmodel1](https://github.com/mtaghipourpars-dotcom/newmodel1): PVPT industrial application context for projects, products, BOM/Cell, production execution, commitments and shared/time-phased resource feasibility.
- [MANG_01](https://github.com/mtaghipourpars-dotcom/MANG_01): MVP decisions, input-data governance, and separation of settings, input data, and analytical outputs.

## Agreed foundational principles
1. **Key-resource scope:** Issues are not registered for every organizational event. The system focuses on issues related to designated KEY RESOURCEs.
2. **Unique accountability:** Each KEY RESOURCE has one designated responsible owner in the KEY RESOURCE–RESPONSIBLE matrix. The owner is accountable for timely reporting of defects, breakdowns, loss of availability, and relevant risks.
3. **Easy initial registration:** Initial issue registration must be lightweight. Information is enriched progressively by responsible managers and relevant stakeholders.
4. **Evidence-based claims:** Important claims and decision parameters should be supported by evidence. Missing, contradictory, stale, estimated, or unverified data must be visibly identified rather than silently treated as facts.
5. **Local/global handling:** An issue's score and scope inform whether it is handled locally or escalated. Cross-team or organization-wide issues move to higher authority when the decision exceeds the current level's delegated authority.
6. **Access and confidentiality:** Access to issues and related solutions is controlled by role/level and issue confidentiality. Organizational scope, decision authority, and confidentiality are related but distinct concepts.
7. **Solution-centered decisions:** Projects are not simply approved or rejected. The decision concerns applicable SOLUTIONs for an ISSUE. A solution may allocate resources to one project, multiple projects, or a combination of actions.
8. **Context-specific profiles:** Decision profiles determine which factors have priority under current organizational conditions. No single factor or solution is universally optimal.
9. **Scarce/shared resources:** Evaluation must consider feasibility and, where supported, the consequences of using shared resources for one solution rather than another. A qualitative opportunity-cost view may precede reliable quantitative calculation.
10. **Human decision authority:** The system does not claim autonomous decision-making in MVP. Authorized managers choose; the system preserves the evidence, alternatives, rationale, authority, actions, and results.
11. **Outcome evaluation:** The system evaluates effectiveness and resource efficiency separately. A good outcome alone does not prove that the decision was good; context, assumptions, execution, and external events matter.
12. **Learning over time:** Learning records conditions, decision logic, actions, and outcomes. Future maturity may propose improved parameters/profiles for human review. Historical decisions and their original profile versions are never retroactively rewritten.
13. **Three data layers:** SETTING (policy/profile configuration), INPUT (source data/master data with provenance and change history), and ANALYTICAL (derived results tied to exact inputs, settings, and calculation version) remain distinct.
14. **MVP honesty:** Manual data entry and a general, explainable qualitative profile are acceptable starting points. Advanced learning, automatic parameter optimization, live ERP integration, and precise financial causality must not be claimed unless implemented and validated.
15. **No false precision:** If evidence or calculation rules are insufficient, outputs show unknown/insufficient evidence rather than inventing a value, treating missing data as zero, or presenting a speculative result as fact.

## Canonical lifecycle
ISSUE registration → qualification/evidence checks → relevant stakeholders and scope → applicable SOLUTION candidates → feasibility and impact assessment → authorized human decision → actions and resource allocation → observed outcomes → effectiveness/efficiency review → learning and future recommendations.

This lifecycle is a conceptual contract. Implementation status must be verified separately.

## MVP proof obligation
The MVP should demonstrate one traceable end-to-end issue-to-outcome cycle, including evidence and data-quality state, alternative solutions, a human decision and rationale, action tracking, expected versus observed outcome, and retained historical context. It must clearly distinguish DEMO/ASSUMPTION from validated or live data.

## Important non-goals for MVP
- Replacing ERP, MRP, PP, project management, or operational systems.
- Registering every issue or every resource in the organization.
- Autonomously overruling the CEO or delegated decision-makers.
- Claiming all projects will be delivered on time or all decisions will be correct.
- Automatically optimizing decision parameters without a validated learning method and appropriate approval.
- Claiming live integrations or financial benefits that have not been built and tested.

## Governance of this repository
- MANG_04 records the cross-repository product baseline and decisions made in the collaboration.
- Source-specific technical details remain in their source repositories until deliberately migrated and validated.
- Do not overwrite unresolved questions with guesses.
- Changes to foundational principles should be recorded in the decision register with rationale, scope, and effective version.
