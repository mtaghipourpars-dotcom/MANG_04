# Source Repository Map

## MANG_03 — Generic decision-support core
Repository: https://github.com/mtaghipourpars-dotcom/MANG_03

Use as the primary source for:
- issue qualification and lifecycle;
- key-resource allocation principles;
- issue–solution applicability and relationship models;
- decision profiles and parameterized impact assessment;
- rejected alternatives and decision records;
- outcome/effectiveness evidence and learning;
- conceptual architecture, stress tests, acceptance gates, and current prototype.

## newmodel1 — PVPT industrial application
Repository: https://github.com/mtaghipourpars-dotcom/newmodel1

Use as the primary source for:
- product/project domain model;
- PVPT-specific CEO experience and navigation;
- BOM/Cell and production execution concepts;
- commitments and production orders;
- resource constraints, shared resources, and time-phased feasibility;
- industrial demonstration fixtures and real-data boundary.

## MANG_01 — Data governance and MVP decision records
Repository: https://github.com/mtaghipourpars-dotcom/MANG_01

Use as the primary source for:
- input-data governance;
- SETTING / INPUT / ANALYTICAL separation;
- provenance, ownership, validation, and change history;
- MVP decision register and system-design constraints.

## Conflict rule
If source documents appear inconsistent:
1. Do not silently merge the interpretations.
2. Identify the conflicting statements and their source paths.
3. Prefer the latest explicitly accepted decision for that same product scope, not merely the newest file timestamp.
4. Record the resolution in MANG_04/DECISION_REGISTER.md.
5. Preserve source-specific behavior unless an explicit migration decision is made.

## Migration rule
MANG_04 currently records a consolidated conceptual baseline. It does not yet contain all source files, application code, assets, tests, and history from the three source repositories. Any full repository migration must be planned and verified separately; do not represent a documentation consolidation as a complete code migration.
