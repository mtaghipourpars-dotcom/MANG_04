# Google AI Studio — Controlled Implementation Prompt

Build the MANG MVP as a database-backed web application, following the approved MANG_04 contracts and the attached exact reference image `MAIN.PNG`.

## Mandatory source inspection
Read these project documents first:
- `docs/UNIFIED_PRODUCT_REQUIREMENTS.md`
- `docs/UNIFIED_DATA_AND_ARCHITECTURE_CONTRACT.md`
- `docs/DECISION_REGISTER.md`
- `docs/MVP_ACCEPTANCE_CRITERIA.md`
- `docs/GOOGLE_AI_STUDIO_BUILD_SPEC.md`

Inspect the actual `MAIN.PNG` attachment before generating UI. If it is missing or unreadable, STOP visual implementation and report `SPECIFICATION_BLOCKED: MAIN.PNG unavailable`. Do not approximate the screen from memory or a textual summary.

## Hard constraints
1. Do not invent UI elements, labels, fields, workflows, calculations, thresholds, roles, seed records or endpoint semantics.
2. Match the attached image's complete visible layout and component order. Use synthetic content only in already-existing data slots and mark it as demo.
3. Every master-data and runtime business read/write must use the configured database through a typed data-access boundary. No localStorage/sessionStorage/IndexedDB, hardcoded arrays, module-level business objects or in-memory fallback.
4. Do not select a database product or assume project credentials. Inspect the configured project environment. If no database is configured, stop and report the exact required provisioning/configuration inputs rather than silently selecting one.
5. Never expose database administrator credentials or privileged service keys in client bundles.
6. All business mutations require server-side validation, authentication, authorization, transaction/concurrency control and append-only audit.
7. On database/network errors, display a clear error; never report an unsaved mutation as successful.
8. Historical decisions must retain the exact profile, settings, input snapshot and engine version used at decision time.
9. Do not describe a generated preview as production-ready until all required tests and operational gates have evidence.

## Implementation sequence
A. Inventory reference image elements and their coordinates, labels, typography, colors, spacing, chart shapes and visible interactions. Keep this inventory tied to the image.
B. Inspect the existing repository and environment. Reuse approved schemas, code and configuration; do not overwrite source files without reviewing them.
C. Produce a schema/migration proposal for all approved master and runtime entities. For every field, specify type, nullability, constraints, foreign keys, deletion policy, versioning and authorization. Mark unresolved fields as blocked instead of guessing.
D. Implement the persistence layer and migrations before connecting UI mutations.
E. Implement all UI elements shown in the image; do not add extra sections.
F. Connect each displayed value to a canonical database query or a versioned analytical result. No independent mock datasets per page.
G. Connect every visible mutation to a durable transaction and revalidate from the database.
H. Test persistence after refresh, new context and restart; test authorization, invalid data, concurrency, database outage, audit integrity and cross-page consistency.
I. Compare screenshot to MAIN.PNG at the identical viewport. Report measured differences and fix them.
J. Report each acceptance gate with test evidence. Explicitly list blockers and tests not run.

## Required completion report
Return only:
- changed files;
- database product/configuration actually detected (never reveal secrets);
- migrations applied and test results;
- UI comparison evidence against MAIN.PNG;
- CRUD/persistence/security test outcomes;
- blocked items and unrun tests;
- deployment URL only if a real deployment was completed and verified.

Do not claim that GitHub push, AI Studio project creation, database provisioning, deployment or testing happened unless the environment actually confirms it.
