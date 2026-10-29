# Database Schema — Approval-Gated Template

**Status: NOT EXECUTABLE.** This template defines the schema review checklist and domain inventory. It intentionally does not invent columns or choose a database engine. Produce an executable migration only after inspecting the attached `MAIN.PNG`, existing code/schema, selected database and approved field-level contracts.

## Schema review checklist for every table/collection
- Stable immutable primary identifier.
- Explicit fields and storage types.
- Required/optional status and null semantics.
- Unique constraints and foreign keys/references.
- Allowed enum values and transition rules.
- Created/updated actor and timestamps.
- Optimistic concurrency version where records can be edited concurrently.
- Soft-delete/archive policy; historical decisions and audit events must not be hard-deleted by normal flows.
- Confidentiality and row/object-level authorization.
- Provenance/source, as-of time, quality status and evidence reference for material claims.
- Indexes for approved query/filter/order patterns.
- Retention and backup/restore behavior.
- Migration and rollback strategy.

## Required logical domains
| Domain | Entity concepts | Historical integrity |
|---|---|---|
| Identity and access | User identity, role, permission/authority grant, confidentiality grant | Authority and access changes must be auditable and time-scoped where applicable |
| Master data | KEY_RESOURCE, responsible owner, issue type, solution type, product family, product, project/WBS, commitment/milestone, resource/capacity period, source registry | Version master data; don't rewrite prior decision snapshots |
| Intake and qualification | Issue intake, qualification result, review event, duplicate/route relationship | Preserve original report and every qualification/review event |
| Issue and evidence | Issue case, evidence item, claim, typed object relationship, provenance record | Preserve source, author, as-of time, status and corrections |
| Solution and feasibility | Solution candidate, candidate requirement, dependency, feasibility run/result, constraint finding | Store exact inputs, engine version, result state and run time |
| Profile and decision | Profile, profile version, factor definition, factor weight/anchor, decision snapshot, candidate assessment, decision, alternative disposition | Freeze profile/settings/input versions used by each decision |
| Execution and outcome | Action, action event, progress observation, expected baseline, actual outcome, outcome review | Append observations; preserve changes, failures and unknown outcomes |
| Learning | Learning observation, recommendation, review/approval/rejection event | Recommendations are not activated without explicit authorized approval |
| Platform integrity | Audit event, idempotency key, migration version, analysis run | Append-only audit; mutations idempotent and traceable |

## Required status distinctions
The approved schema must represent separately, rather than collapse:
- missing, unknown, stale, invalid, partial, disconnected, unapproved and valid data;
- fact, assumption, hypothesis and inference;
- feasible, partially feasible, not feasible and insufficient evidence;
- estimated value, observed actual and causal attribution status;
- decision selected, action completed, issue resolved and outcome verified.

Do not use an untyped free-text status if an approved finite state model exists. Do not turn qualitative 1–5 assessments into currency. Do not treat missing values as zero or as healthy.

## Migration acceptance
A schema is not accepted until an executable migration is reviewed, applies to an empty database, enforces approved constraints, has rollback/recovery instructions, and passes persistence, authorization, concurrency and audit tests.
