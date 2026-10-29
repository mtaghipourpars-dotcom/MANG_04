-- MANG_04 Canonical Enterprise Schema Migration 001
-- Target Database: PostgreSQL 14+
-- Conforms to: UNIFIED_DATA_AND_ARCHITECTURE_CONTRACT.md, GOOGLE_AI_STUDIO_DATABASE_SCHEMA_TEMPLATE.md

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom Enums
CREATE TYPE data_layer_type AS ENUM ('SETTING', 'INPUT', 'ANALYTICAL');
CREATE TYPE truth_class_type AS ENUM ('PUBLIC_VERIFIED', 'INTERNAL_VERIFIED', 'USER_APPROVED_ASSUMPTION', 'DEMO_SYNTHETIC', 'UNKNOWN');
CREATE TYPE epistemic_status_type AS ENUM ('OBSERVED_FACT', 'ASSUMPTION', 'HYPOTHESIS', 'INFERENCE', 'VALIDATED_CAUSE');
CREATE TYPE epistemic_state_type AS ENUM ('KNOWN', 'UNKNOWN', 'NOT_APPLICABLE', 'UNVERIFIED', 'STALE', 'CONTRADICTORY', 'FAILED', 'PASSED', 'BLOCKED');
CREATE TYPE feasibility_result_type AS ENUM ('FEASIBLE', 'PARTIALLY_FEASIBLE', 'NOT_FEASIBLE', 'INSUFFICIENT_EVIDENCE', 'NO_FEASIBLE_OPTION');
CREATE TYPE lifecycle_stage_type AS ENUM (
  'INTAKE_RECORDED',
  'INTAKE_ENRICHED',
  'ISSUE_QUALIFIED',
  'CANDIDATES_ASSESSED',
  'FEASIBILITY_EVALUATED',
  'SUBMITTED_TO_DECISION_MAKER',
  'HUMAN_DECISION_FROZEN',
  'ACTIONS_TRACKED',
  'PROGRESS_EVIDENCE_REVIEWED',
  'OUTCOME_ASSESSED',
  'LEARNING_REVIEWED'
);

-- 1. Key Resources
CREATE TABLE key_resources (
  id VARCHAR(64) PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  name_fa VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  criticality_level VARCHAR(32) NOT NULL DEFAULT 'HIGH',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Resource Owner History (Accountability)
CREATE TABLE resource_owner_history (
  id VARCHAR(64) PRIMARY KEY,
  resource_id VARCHAR(64) NOT NULL REFERENCES key_resources(id) ON DELETE RESTRICT,
  owner_user_id VARCHAR(64) NOT NULL,
  owner_name VARCHAR(128) NOT NULL,
  role_title VARCHAR(128) NOT NULL,
  effective_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  effective_to TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_owner_dates CHECK (effective_to IS NULL OR effective_to > effective_from)
);

-- 3. Projects Master Data
CREATE TABLE projects (
  id VARCHAR(64) PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  title_fa VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  customer_fa VARCHAR(255) NOT NULL,
  customer_en VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  key_resource_id VARCHAR(64) REFERENCES key_resources(id),
  responsible_owner_id VARCHAR(64) NOT NULL,
  responsible_owner_name VARCHAR(128) NOT NULL,
  progress_percent INT, -- NULL when unknown, not zero!
  progress_verification_status epistemic_state_type NOT NULL DEFAULT 'UNVERIFIED',
  status VARCHAR(32) NOT NULL DEFAULT 'attention',
  at_risk_value_m NUMERIC(12, 2) NOT NULL DEFAULT 0.0,
  time_to_no_return_days INT NOT NULL,
  data_layer data_layer_type NOT NULL DEFAULT 'INPUT',
  truth_class truth_class_type NOT NULL DEFAULT 'DEMO_SYNTHETIC',
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Issue Intakes (Immutable Original Statement)
CREATE TABLE issue_intakes (
  id VARCHAR(64) PRIMARY KEY,
  intake_code VARCHAR(32) NOT NULL UNIQUE,
  key_resource_id VARCHAR(64) NOT NULL REFERENCES key_resources(id),
  project_id VARCHAR(64) REFERENCES projects(id),
  original_narrative_fa TEXT NOT NULL,
  original_narrative_en TEXT,
  reporter_id VARCHAR(64) NOT NULL,
  reporter_name VARCHAR(128) NOT NULL,
  reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uncertainty_notes TEXT,
  truth_class truth_class_type NOT NULL DEFAULT 'INTERNAL_VERIFIED',
  data_layer data_layer_type NOT NULL DEFAULT 'INPUT',
  is_immutable BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Issue Cases & Canonical Lifecycle
CREATE TABLE issue_cases (
  id VARCHAR(64) PRIMARY KEY,
  intake_id VARCHAR(64) NOT NULL REFERENCES issue_intakes(id),
  case_code VARCHAR(32) NOT NULL UNIQUE,
  title_fa VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  subtitle_fa VARCHAR(255),
  subtitle_en VARCHAR(255),
  description_fa TEXT NOT NULL,
  description_en TEXT,
  key_resource_id VARCHAR(64) NOT NULL REFERENCES key_resources(id),
  responsible_owner_id VARCHAR(64) NOT NULL,
  current_stage lifecycle_stage_type NOT NULL DEFAULT 'INTAKE_RECORDED',
  qualification_status VARCHAR(32) NOT NULL DEFAULT 'PENDING_REVIEW',
  deadline_days INT NOT NULL,
  deadline_date TIMESTAMPTZ NOT NULL,
  case_feasibility_state feasibility_result_type NOT NULL DEFAULT 'INSUFFICIENT_EVIDENCE',
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Solution Candidates
CREATE TABLE solution_candidates (
  id VARCHAR(64) PRIMARY KEY,
  issue_case_id VARCHAR(64) NOT NULL REFERENCES issue_cases(id) ON DELETE RESTRICT,
  candidate_number INT NOT NULL,
  title_fa VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_fa TEXT NOT NULL,
  description_en TEXT,
  cost_impact_m NUMERIC(12, 2) NOT NULL DEFAULT 0.0,
  schedule_impact_days INT NOT NULL DEFAULT 0,
  feasibility_status feasibility_result_type NOT NULL DEFAULT 'INSUFFICIENT_EVIDENCE',
  is_eligible_for_ranking BOOLEAN NOT NULL DEFAULT FALSE,
  proposer_id VARCHAR(64) NOT NULL,
  proposer_name VARCHAR(128) NOT NULL,
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_case_candidate UNIQUE (issue_case_id, candidate_number)
);

-- 7. Feasibility Runs & Constraint Findings (Hard Gating)
CREATE TABLE feasibility_runs (
  id VARCHAR(64) PRIMARY KEY,
  candidate_id VARCHAR(64) NOT NULL REFERENCES solution_candidates(id),
  engine_version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
  run_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  overall_result feasibility_result_type NOT NULL,
  material_constraint_state epistemic_state_type NOT NULL,
  machine_constraint_state epistemic_state_type NOT NULL,
  manpower_constraint_state epistemic_state_type NOT NULL,
  technical_safety_state epistemic_state_type NOT NULL,
  liquidity_constraint_state epistemic_state_type NOT NULL,
  findings_summary TEXT NOT NULL,
  evaluated_by VARCHAR(64) NOT NULL
);

-- 8. Decision Profiles & Versions
CREATE TABLE decision_profiles (
  id VARCHAR(64) PRIMARY KEY,
  profile_name VARCHAR(128) NOT NULL,
  version VARCHAR(32) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  customer_weight INT NOT NULL CHECK (customer_weight BETWEEN 1 AND 5),
  margin_weight INT NOT NULL CHECK (margin_weight BETWEEN 1 AND 5),
  liquidity_weight INT NOT NULL CHECK (liquidity_weight BETWEEN 1 AND 5),
  strategic_weight INT NOT NULL CHECK (strategic_weight BETWEEN 1 AND 5),
  feasibility_gate_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Human Decision Records (Immutable Snapshots)
CREATE TABLE human_decisions (
  id VARCHAR(64) PRIMARY KEY,
  issue_case_id VARCHAR(64) NOT NULL REFERENCES issue_cases(id),
  selected_candidate_id VARCHAR(64) NOT NULL REFERENCES solution_candidates(id),
  decision_maker_id VARCHAR(64) NOT NULL,
  decision_maker_role VARCHAR(128) NOT NULL,
  authority_basis VARCHAR(255) NOT NULL,
  decision_rationale TEXT NOT NULL,
  rejected_candidates_snapshot JSONB NOT NULL,
  profile_version_id VARCHAR(64) NOT NULL REFERENCES decision_profiles(id),
  feasibility_snapshot JSONB NOT NULL,
  is_frozen BOOLEAN NOT NULL DEFAULT TRUE,
  decided_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Tripartite Progress Evidence Records
CREATE TABLE progress_evidence_tripartite (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL REFERENCES projects(id),
  observation_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  claimed_percentage INT NOT NULL CHECK (claimed_percentage BETWEEN 0 AND 100),
  -- 1) Warehouse Material Movement Slip
  warehouse_doc_number VARCHAR(64) NOT NULL,
  warehouse_verified BOOLEAN NOT NULL DEFAULT FALSE,
  warehouse_verifier_id VARCHAR(64),
  -- 2) Machine Telemetry / Power Log
  machine_telemetry_id VARCHAR(64) NOT NULL,
  telemetry_verified BOOLEAN NOT NULL DEFAULT FALSE,
  -- 3) Shop-Floor QC / Supervisor Sign-off
  supervisor_badge_id VARCHAR(64) NOT NULL,
  supervisor_signoff_verified BOOLEAN NOT NULL DEFAULT FALSE,
  -- Overall Verification Result
  verification_status epistemic_state_type NOT NULL,
  verification_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Append-Only Audit Trail
CREATE TABLE audit_events (
  id VARCHAR(64) PRIMARY KEY,
  action VARCHAR(64) NOT NULL,
  entity_type VARCHAR(64) NOT NULL,
  entity_id VARCHAR(64) NOT NULL,
  actor_id VARCHAR(64) NOT NULL,
  actor_role VARCHAR(128) NOT NULL,
  correlation_id VARCHAR(64),
  before_state JSONB,
  after_state JSONB,
  rationale TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance & query patterns
CREATE INDEX idx_issue_cases_resource ON issue_cases(key_resource_id);
CREATE INDEX idx_issue_cases_stage ON issue_cases(current_stage);
CREATE INDEX idx_solution_candidates_case ON solution_candidates(issue_case_id);
CREATE INDEX idx_progress_evidence_proj ON progress_evidence_tripartite(project_id);
CREATE INDEX idx_audit_events_entity ON audit_events(entity_type, entity_id);
CREATE INDEX idx_audit_events_timestamp ON audit_events(timestamp DESC);
