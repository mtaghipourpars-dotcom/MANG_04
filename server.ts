import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  INITIAL_PROJECTS,
  INITIAL_DECISION_CASES,
  INITIAL_PRODUCT_DOMAINS,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_AUDIT_LOGS,
} from './src/data.js';
import { Project, DecisionCase, TimelineEvent, AuditLog } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-Memory persistent store for server session
let projectsStore: Project[] = [...INITIAL_PROJECTS];
let decisionsStore: DecisionCase[] = [...INITIAL_DECISION_CASES];
let domainsStore = [...INITIAL_PRODUCT_DOMAINS];
let timelineStore: TimelineEvent[] = [...INITIAL_TIMELINE_EVENTS];
let auditStore: AuditLog[] = [...INITIAL_AUDIT_LOGS];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Endpoints
  app.get('/api/projects', (req, res) => {
    res.json({ success: true, data: projectsStore });
  });

  app.get('/api/projects/:id', (req, res) => {
    const project = projectsStore.find((p) => p.id === req.params.id || p.code === req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  });

  app.post('/api/projects', (req, res) => {
    const updated = req.body as Project;
    const idx = projectsStore.findIndex((p) => p.id === updated.id);
    if (idx >= 0) {
      projectsStore[idx] = updated;
    } else {
      projectsStore.push(updated);
    }
    auditStore.unshift({
      id: `log-${Date.now()}`,
      action: 'PROJECT_UPDATED',
      entityId: updated.code,
      actor: 'مدیرعامل / CEO',
      timestamp: new Date().toISOString(),
      details: `Updated project ${updated.code} status to ${updated.status}`,
    });
    res.json({ success: true, data: updated });
  });

  app.get('/api/decisions', (req, res) => {
    res.json({ success: true, data: decisionsStore });
  });

  app.post('/api/decisions/:id/record', (req, res) => {
    const { id } = req.params;
    const { selectedCandidateId, decisionRationale, decisionMaker } = req.body;

    const decisionCase = decisionsStore.find((d) => d.id === id || d.projectCode === id);
    if (!decisionCase) {
      return res.status(404).json({ success: false, error: 'Decision case not found' });
    }

    const maker = decisionMaker || 'مدیرعامل / CEO';
    const now = new Date().toISOString();

    decisionCase.selectedCandidateId = selectedCandidateId;
    decisionCase.decisionRationale = decisionRationale;
    decisionCase.decisionMaker = maker;
    decisionCase.decidedAt = now;

    // Log atomic audit record
    auditStore.unshift({
      id: `log-${Date.now()}`,
      action: 'HUMAN_DECISION_RECORDED',
      entityId: decisionCase.id,
      actor: maker,
      timestamp: now,
      details: `Selected candidate ${selectedCandidateId} for ${decisionCase.projectCode}. Rationale: ${decisionRationale}`,
    });

    res.json({ success: true, data: decisionCase });
  });

  app.get('/api/domains', (req, res) => {
    res.json({ success: true, data: domainsStore });
  });

  app.get('/api/timeline', (req, res) => {
    res.json({ success: true, data: timelineStore });
  });

  app.post('/api/timeline', (req, res) => {
    const newEvent: TimelineEvent = {
      id: `evt-${Date.now()}`,
      ...req.body,
    };
    timelineStore.unshift(newEvent);
    res.json({ success: true, data: newEvent });
  });

  app.get('/api/audit', (req, res) => {
    res.json({ success: true, data: auditStore });
  });

  app.post('/api/reset', (req, res) => {
    projectsStore = [...INITIAL_PROJECTS];
    decisionsStore = [...INITIAL_DECISION_CASES];
    domainsStore = [...INITIAL_PRODUCT_DOMAINS];
    timelineStore = [...INITIAL_TIMELINE_EVENTS];
    auditStore = [...INITIAL_AUDIT_LOGS];
    res.json({ success: true, message: 'Reset data to initial synthetic demo state' });
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PARS Value Protection Tower] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
