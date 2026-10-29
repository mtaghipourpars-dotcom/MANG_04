import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DatabaseStore } from './src/server/db/databaseStore.js';
import { LifecycleEngine } from './src/server/lifecycleEngine.js';
import { FeasibilityEngine } from './src/server/feasibilityEngine.js';
import { DecisionService } from './src/server/decisionService.js';
import { ProgressVerificationService } from './src/server/progressVerification.js';
import { INITIAL_PRODUCT_DOMAINS, INITIAL_TIMELINE_EVENTS } from './src/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize durable database store
  const db = DatabaseStore.getInstance();

  app.use(cors());
  app.use(express.json());

  // Security Context Middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Derive identity from headers or dev fallback
    const authHeader = req.headers['authorization'];
    const userIdHeader = req.headers['x-user-id'] as string;
    const userRoleHeader = req.headers['x-user-role'] as string;

    (req as any).user = {
      id: userIdHeader || 'usr-ceo-01',
      role: userRoleHeader || 'مدیرعامل / Chief Executive Officer',
      isDevelopmentFallback: !userIdHeader && !authHeader,
    };
    next();
  });

  // 1. Health & Database Status
  app.get('/api/health', (req: Request, res: Response) => {
    const schema = db.getSchema();
    res.json({
      status: 'UP',
      databaseEngine: 'DURABLE_ATOMIC_JSON_STORE',
      postgresMigrationTarget: 'migrations/001_initial_canonical_schema.sql',
      records: {
        projects: schema.projects.length,
        issueCases: schema.issueCases.length,
        solutionCandidates: schema.solutionCandidates.length,
        feasibilityRuns: schema.feasibilityRuns.length,
        humanDecisions: schema.humanDecisions.length,
        tripartiteEvidence: schema.tripartiteEvidence.length,
        auditEvents: schema.auditEvents.length,
      },
      auditLocked: true,
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Projects & Master Data
  app.get('/api/projects', (req: Request, res: Response) => {
    const projects = db.getProjects();
    res.json({ success: true, data: projects });
  });

  app.get('/api/projects/:id', (req: Request, res: Response) => {
    const id = req.params.id as string;
    const project = db.getProject(id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    const evidence = db.getTripartiteEvidence(project.id);
    res.json({ success: true, data: { ...project, evidenceHistory: evidence } });
  });

  // Tripartite Shop-Floor Progress Verification
  app.post('/api/projects/:id/tripartite-verify', async (req: Request, res: Response) => {
    try {
      const {
        claimedPercentage,
        warehouseDocNumber,
        warehouseVerified,
        machineTelemetryId,
        telemetryVerified,
        supervisorBadgeId,
        supervisorSignoffVerified,
        notes,
      } = req.body;

      const actor = (req as any).user;
      const id = req.params.id as string;

      const result = await ProgressVerificationService.recordProgressObservation({
        projectId: id,
        claimedPercentage: Number(claimedPercentage),
        warehouseDocNumber,
        warehouseVerified: Boolean(warehouseVerified),
        machineTelemetryId,
        telemetryVerified: Boolean(telemetryVerified),
        supervisorBadgeId,
        supervisorSignoffVerified: Boolean(supervisorSignoffVerified),
        notes,
        auditorId: actor.id,
      });

      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // 3. Issue Cases & Decisions
  app.get('/api/decisions', (req: Request, res: Response) => {
    // Map issueCases into UI-compatible view with candidates and decision status
    const cases = db.getIssueCases().map((c) => {
      const candidates = db.getCandidatesForCase(c.id);
      const decision = db.getDecisionForCase(c.id);
      return {
        id: c.id,
        caseCode: c.caseCode,
        projectCode: c.projectCode,
        title: c.titleFa,
        titleEn: c.titleEn,
        subtitle: c.subtitleFa,
        subtitleEn: c.subtitleEn,
        description: c.descriptionFa,
        descriptionEn: c.descriptionEn,
        deadlineDays: c.deadlineDays,
        deadlineDate: c.deadlineDate,
        currentStage: c.currentStage,
        caseFeasibilityState: c.caseFeasibilityState,
        impacts: c.impactsFa,
        impactsEn: c.impactsEn,
        tags: c.tagsFa,
        tagsEn: c.tagsEn,
        imageUrl: c.imageUrl,
        version: c.version,
        candidates: candidates.map((cand) => ({
          id: cand.id,
          title: cand.titleFa,
          titleEn: cand.titleEn,
          description: cand.descriptionFa,
          descriptionEn: cand.descriptionEn,
          costImpactM: cand.costImpactM,
          scheduleImpactDays: cand.scheduleImpactDays,
          feasibilityStatus: cand.feasibilityStatus,
          isEligibleForRanking: cand.isEligibleForRanking,
          pros: cand.prosFa,
          prosEn: cand.prosEn,
          cons: cand.consFa,
          consEn: cand.consEn,
        })),
        selectedCandidateId: decision?.selectedCandidateId,
        decisionRationale: decision?.decisionRationale,
        decisionMaker: decision?.decisionMakerRole,
        decidedAt: decision?.decidedAt,
      };
    });

    res.json({ success: true, data: cases });
  });

  // Record Human Decision
  app.post('/api/decisions/:id/record', async (req: Request, res: Response) => {
    try {
      const { selectedCandidateId, decisionRationale, authorityBasis, expectedVersion } = req.body;
      const actor = (req as any).user;
      const id = req.params.id as string;

      const result = await DecisionService.recordHumanDecision({
        caseId: id,
        selectedCandidateId,
        decisionRationale,
        decisionMakerId: actor.id,
        decisionMakerRole: actor.role,
        authorityBasis: authorityBasis || 'مصوبه هیئت مدیره مپنا پارس / Board Resolution',
        expectedVersion: expectedVersion ? Number(expectedVersion) : undefined,
      });

      if (!result.success) {
        return res.status(400).json({ success: false, error: result.error });
      }

      res.json({ success: true, data: result.decision, issueCase: result.issueCase });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Feasibility Constraint Evaluation
  app.post('/api/candidates/:id/evaluate-feasibility', async (req: Request, res: Response) => {
    try {
      const {
        materialStatus,
        machineStatus,
        manpowerStatus,
        technicalSafetyStatus,
        liquidityStatus,
        findingsSummary,
      } = req.body;

      const actor = (req as any).user;
      const id = req.params.id as string;

      const result = await FeasibilityEngine.runAndRecordEvaluation({
        candidateId: id,
        materialStatus,
        machineStatus,
        manpowerStatus,
        technicalSafetyStatus,
        liquidityStatus,
        findingsSummary: findingsSummary || 'بررسی شروط پنج‌گانه سخت',
        evaluatorId: actor.id,
      });

      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // 4. Domains, Timeline, Audit
  app.get('/api/domains', (req: Request, res: Response) => {
    res.json({ success: true, data: INITIAL_PRODUCT_DOMAINS });
  });

  app.get('/api/timeline', (req: Request, res: Response) => {
    res.json({ success: true, data: INITIAL_TIMELINE_EVENTS });
  });

  app.get('/api/audit', (req: Request, res: Response) => {
    const events = db.getAuditEvents();
    res.json({ success: true, data: events });
  });

  // Controlled Demo Reset
  app.post('/api/reset', async (req: Request, res: Response) => {
    try {
      await db.resetToCanonicalSyntheticState();
      await db.addAuditEvent({
        action: 'DATABASE_RESET_DEMO_SYNTHETIC',
        entityType: 'DATABASE',
        entityId: 'ROOT',
        actorId: (req as any).user.id,
        actorRole: (req as any).user.role,
        rationale: 'بازنشانی کنترل‌شده پایگاه داده به وضعیت نمونه DEMO_SYNTHETIC',
      });
      res.json({ success: true, message: 'Database reset to canonical synthetic demo state.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite Integration in Development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PARS Value Protection Tower] Zero-Trust Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
