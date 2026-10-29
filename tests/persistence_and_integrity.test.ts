import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseStore } from '../src/server/db/databaseStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../data/mang04_database.json');

test('DatabaseStore: Verifies physical file persistence to disk', async () => {
  const db = DatabaseStore.getInstance();
  const testId = `audit-persist-${Date.now()}`;

  await db.addAuditEvent({
    action: 'TEST_PERSISTENCE_EVENT',
    entityType: 'INTEGRITY_TEST',
    entityId: testId,
    actorId: 'usr-test',
    actorRole: 'TEST_RUNNER',
    rationale: 'Verifying physical file write to disk',
  });

  // Verify file exists on disk
  assert.equal(fs.existsSync(DB_FILE), true);

  // Read raw file content from disk directly
  const content = fs.readFileSync(DB_FILE, 'utf-8');
  const parsed = JSON.parse(content);

  const foundEvent = parsed.auditEvents.find((e: any) => e.entityId === testId);
  assert.ok(foundEvent);
  assert.equal(foundEvent.action, 'TEST_PERSISTENCE_EVENT');
});
