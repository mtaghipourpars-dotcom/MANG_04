# Google AI Studio Build Specification — MANG MVP

**Status:** Reference asset located at [`src/main.png`](../src/main.png). Visual implementation must use this exact image. Production acceptance remains BLOCKED until a deployable database/auth environment is configured and tested.

## 1. Source-of-truth precedence
1. The actual supplied `MAIN.PNG` image and any explicit annotations attached to it.
2. Accepted product decisions in `UNIFIED_PRODUCT_REQUIREMENTS.md`, `UNIFIED_DATA_AND_ARCHITECTURE_CONTRACT.md`, and `DECISION_REGISTER.md`.
3. This build contract.
4. No inferred UI elements, field meanings, thresholds, data, formulas, roles, or workflows may be added to close a gap. Stop and record a blocking ambiguity instead.

**Reference asset:** [`src/main.png`](../src/main.png) (GitHub path: `src/main.png`). The repository connector can confirm the asset exists but cannot decode this binary image for visual inspection. The build environment must load and inspect the image directly before implementation; do not recreate it from memory or a textual summary. The five executive cards and two primary views recorded in collaboration context are not sufficient to claim pixel-exact fidelity for the entire screen.

## 1.1 Explicit user UI requirements
- Home page and full UI must match `src/main.png` exactly in layout, structure, components and behavior. Do not add, remove, reorder or restructure elements beyond the reference.
- Populate existing data slots with fresh, clearly synthetic demo content; do not copy the reference's data values or present synthetic values as live facts.
- Default theme is Dark. The existing Settings menu must allow switching theme. Do not add a new Settings entry or control unless it is present in the reference image; place the theme control within the depicted Settings surface.
- The application is bilingual: English and Persian (Farsi). Preserve the same UI structure in both languages. Persian uses correct RTL layout and typography; English uses LTR. Language switching must not create duplicate or additional UI elements absent from the reference.

## 2. Google AI Studio workflow
Use Google AI Studio Build mode to generate and preview the web client, with the following controlled sequence:
1. Import the MANG_04 repository/specification into the project context.
2. Load the exact repository asset `src/main.png` (https://github.com/mtaghipourpars-dotcom/MANG_04/blob/main/src/main.png) into the AI Studio project and inspect it visually.
3. Generate the application shell and compare the rendered screenshot to the supplied image at the same viewport and device scale.
4. Implement persistence behind a typed repository/data-access layer; no UI component may directly invent or locally persist business records.
5. Configure the actual database and authentication in the project environment. Use only the selected, provisioned database product and its documented SDK. Do not silently choose Firebase, PostgreSQL, or another database without an approved environment decision.
6. Run migrations/schema setup, seed only explicitly marked synthetic demo fixtures if approved, and verify CRUD through database reads after reload and in a separate browser context.
7. Run critical-path tests, accessibility checks, error-state tests and cross-page identity tests.
8. Deploy only after environment secrets, authentication, database rules, backups and restore have been configured and tested.

AI Studio generation/preview is not itself evidence of production readiness. The generated code, configured database, authorization rules, migrations and deployment target must be inspected and tested.

## 3. Non-negotiable runtime rules
- Every persisted business read and write goes through the server/data-access boundary and database.
- React/component state may hold transient presentation state only (open dialog, current input before submission, loading indicator). It must never be the authoritative store for master data or runtime business state.
- Never use localStorage, sessionStorage, IndexedDB, static JSON, module-level arrays or hardcoded objects as a fallback business database.
- Every successful mutation is confirmed by a database response and followed by a canonical read/revalidation.
- If the database is unavailable, show an explicit error and disable mutations; never imply that an unsaved operation succeeded.
- Use transactions or optimistic concurrency/version checks for multi-record writes and concurrent edits.
- Audit events are append-only and written atomically with the business mutation where supported.
- Database credentials and privileged keys must never be embedded in client code.
- Use synthetic fixtures only when explicitly labelled `DEMO_SYNTHETIC`; never present them as live company facts.
- Preserve historical decision snapshots. Changing a profile or master record must not rewrite previous decisions.

## 4. UI fidelity gate
- Treat the reference image as the authority for visible page structure, ordering, geometry, labels, colors, typography, icons, chart style, spacing and responsive behavior.
- Do not add navigation, cards, buttons, filters, dialogs, footer elements or lower-page sections not evidenced by the reference/specification.
- Use new, clearly synthetic content only in data slots that the reference already contains.
- Before implementation, create a visual inventory of every visible element and its bounds from the image. This inventory must cite the image; do not invent missing labels.
- Capture screenshot at the same viewport as the reference. Compare by overlay/pixel-diff and manually review any differences.
- If responsive states are not shown, do not claim exact responsive fidelity; record the chosen viewport and the unresolved responsive specification.

## 5. Required domain entities
The logical model must cover at least the following concepts from the accepted product contract. This is a domain inventory, not permission to invent unknown business fields.

- Master data: key resources, responsible owners, issue types, solution types, products/product families, projects/WBS, commitments/milestones, resources/capacity periods, organizational roles/authority grants, data sources and profile definitions.
- Runtime: issue intake, qualification/review history, formal issue cases, evidence/claims, issue-object links, solution candidates, candidate resource requirements, feasibility checks/results, profile versions, decision snapshots, chosen/rejected/deferred alternatives, actions, action evidence, progress observations, expected baselines, actual outcomes, learning/review proposals.
- Platform: users/identities, role and object-level access grants, confidentiality classifications, audit events, schema/migration version and idempotency keys.

For every entity, field definitions, nullability, enum values, foreign keys, deletion rules and authorization policy must be explicitly specified in the approved schema before code generation. This document does not fabricate those details.

## 6. Persistence and mutation contract
Every command must have:
- authenticated actor and authorization check;
- validated payload and schema version;
- explicit object scope and expected record version where concurrent editing is possible;
- database transaction boundary;
- audit record with actor, timestamp, operation, object ID, before/after reference or safe diff, reason and correlation ID;
- deterministic response with canonical record/version or structured error;
- re-read of canonical persisted state after success.

Required mutation families:
- create/update/correct/qualify/route issue intake and issue case;
- create/update solution candidate and issue-solution relationship;
- create/version/select profile and persist the exact profile snapshot used by a decision;
- record project progress observation (append observation; do not overwrite history);
- run and persist feasibility/analysis result with exact input snapshot and engine version;
- record decision, rationale, selected/rejected alternatives and authority basis;
- create/update/complete/reassign actions with history;
- record expected baseline and observed outcome;
- submit learning recommendation and record human approval/rejection;
- maintain approved master data with version history.

Do not implement a mutation if the entity schema, permissions, validation or transition rules are unspecified. Return a blocking specification error instead.

## 7. API/data-access boundaries
Use a typed service/repository layer. Exact endpoint paths and HTTP verbs must be derived from the selected runtime framework and approved schema; do not invent a parallel API contract in this document.

Each command must define: request schema, response schema, authentication, authorization, transaction, validation, idempotency, audit behavior and error codes. Reads must support stable object IDs, explicit pagination and deterministic ordering. Mutations must not rely on client-calculated totals or scores as authoritative.

Minimum error classes: `UNAUTHENTICATED`, `FORBIDDEN`, `VALIDATION_ERROR`, `NOT_FOUND`, `CONFLICT`, `STALE_VERSION`, `INSUFFICIENT_EVIDENCE`, `DATABASE_UNAVAILABLE`, `INTEGRITY_ERROR`, `SPECIFICATION_BLOCKED`, `INTERNAL_ERROR`. Expose no secrets or sensitive stack traces to users.

## 8. Database acceptance checks
- Schema migration succeeds on an empty database.
- Foreign keys and required constraints reject invalid references.
- Unauthorized users cannot read or mutate restricted objects.
- Create/update/selection/profile/progress/decision/action/outcome mutations survive refresh, a new browser context and application restart.
- Concurrent stale writes return a conflict rather than silently overwriting.
- Failed transactions leave neither partial business changes nor misleading audit success.
- Audit history cannot be edited through normal application flows.
- Backups can be restored and restore evidence is recorded.
- No production behavior depends on a browser-only store or seed array.

## 9. Release status vocabulary
Every criterion is `PASS`, `FAIL`, `BLOCKED`, `NOT RUN` or `NEEDS REVIEW`, with evidence. Do not call the application production-ready while a mandatory security, persistence, recovery, visual fidelity or critical-path gate is unproven.
