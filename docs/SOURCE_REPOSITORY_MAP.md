# Source Repository Map and Ownership

## MANG_03 — Generic decision-support core
Repository: https://github.com/mtaghipourpars-dotcom/MANG_03

Canonical source for:
- lightweight intake, qualification gate and Issue lifecycle;
- selective KEY_RESOURCE allocation principles;
- enterprise Issue Type / Solution Type catalogues and contextual Issue–Solution links;
- evidence/provenance, fact/assumption/hypothesis/inference and relationship semantics;
- manager-owned parametric impact assessment, versioned profiles and feasibility-before-priority;
- authority, rejected alternatives, abstention/emergency path, actions, outcomes, value evidence and learning;
- bilingual product contract, stress tests, acceptance gates and current HTML prototype.

Important source boundaries:
- D-010's broad quantitative financial wording is refined by D-018 and MASTER_PROTOCOL: MVP uses qualitative manager-owned assessment first; monetary analysis is staged.
- Current browser prototype and its smoke tests do not prove durable storage, authorization, ERP integration or production readiness.
- Reusable catalogue authoring is deferred; the UI buttons are visible but disabled in the MVP.

## newmodel1 — PVPT industrial application/domain
Repository: https://github.com/mtaghipourpars-dotcom/newmodel1

Canonical source for:
- product-family/product/project and commitment/milestone object model;
- PVPT CEO home and domain navigation;
- BOM/component/Cell, production order, routing/operation and execution concepts;
- supplier/material/machine/manpower/method/cash constraints;
- time-phased feasibility, shared-resource conflicts, deterministic scenarios and opportunity cost;
- real-data boundary, public catalogue provenance, six top-level family IDs and visual baseline demo/main.png;
- domain-engine contracts, test fixtures and visual/runtime acceptance gates.

Important source boundaries:
- Public catalogue facts do not prove projects, commitments, margins, cash, capacity or exposure.
- Current prototype is not a production web app; PostgreSQL, security and live source integrations remain implementation gates.
- PVPT can evaluate scenarios; it must not autonomously change detailed production schedules or post ERP transactions.
- Preserve six canonical top-level family IDs; finer catalogue categories map beneath them.

## MANG_01 — Input governance and cockpit design
Repository: https://github.com/mtaghipourpars-dotcom/MANG_01

Canonical source for:
- SETTING / INPUT / ANALYTICAL separation;
- data-entry responsibility matrix and low-friction manual/Excel input;
- source ownership, units, periods, validation, freshness, audit and version history;
- CEO Cockpit architecture, data-quality states, self-hosting and MVP decision register.

Important source boundaries:
- The matrix schema is defined, but actual owners, submitters, approvers, frequency and deadlines remain unapproved.
- Technology choices are target architecture proposals until provisioning and implementation are verified.
- The source explicitly warns not to invent KPIs, thresholds, roles, integrations or operational behavior.

## MANG_04 — Consolidated product/architecture baseline
Repository: https://github.com/mtaghipourpars-dotcom/MANG_04

MANG_04 owns the cross-repository product definition, reconciled requirements, data/architecture contract, decision register, open dependencies and acceptance criteria. Source-specific code and assets remain in their originating repositories until an explicit, tested migration is completed.

## Conflict rule
1. Never silently combine inconsistent statements.
2. Identify exact source contracts and product scope.
3. Prefer an explicitly accepted decision for the same scope; later documentation may refine an older decision.
4. Record the resolution in MANG_04's decision register and reconciliation report.
5. Preserve source-specific behavior until migration is deliberate and tested.

## Migration rule
Documentation consolidation is not a code migration. A future executable-repository consolidation must inventory code, assets, tests, licenses/secrets, runtime configuration and Git history; define a migration plan; preserve the source repositories; and prove build/test parity before claiming completion.
