import express from 'express';
import cors from 'cors';
import { Parser } from 'json2csv';
import fs from 'node:fs';
import { promises as fsp } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');

const eventsJsonlPath = path.join(dataDir, 'events.jsonl');
const taskResultsJsonlPath = path.join(dataDir, 'task_results.jsonl');
const eventsCsvPath = path.join(dataDir, 'events.csv');
const taskResultsCsvPath = path.join(dataDir, 'task_results.csv');

const eventFields = [
  'user_id',
  'task_id',
  'story_title',
  'scenario_type',
  'event_type',
  'event_target',
  'timestamp',
  'elapsed_time_ms',
  'prediction',
  'ai_suggestion',
  'confidence'
];

const taskResultFields = [
  'user_id',
  'task_id',
  'stock_name',
  'stock_code',
  'story_title',
  'scenario_type',
  'prediction',
  'ai_suggestion',
  'confidence',
  'ai_correct',
  'user_decision',
  'decision_reason',
  'adopted_ai',
  'overrode_ai',
  'opened_explanation',
  'opened_features',
  'opened_risk_warning',
  'opened_verification_hint',
  'verification_count',
  'decision_time_ms'
];

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

async function ensureDataDir() {
  await fsp.mkdir(dataDir, { recursive: true });
}

async function appendJsonLine(filePath, data) {
  await ensureDataDir();
  const row = {
    ...data,
    server_received_at: new Date().toISOString()
  };
  await fsp.appendFile(filePath, `${JSON.stringify(row)}\n`, 'utf8');
}

async function readJsonLines(filePath) {
  await ensureDataDir();
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = await fsp.readFile(filePath, 'utf8');
  return content
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function writeCsvFromJsonl(jsonlPath, csvPath, fields) {
  const rows = await readJsonLines(jsonlPath);
  const parser = new Parser({ fields });
  const csv = parser.parse(rows);
  await fsp.writeFile(csvPath, csv, 'utf8');
  return csvPath;
}

function pickFields(payload, fields) {
  return fields.reduce((accumulator, field) => {
    accumulator[field] = payload[field] ?? '';
    return accumulator;
  }, {});
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'ai-finance-experiment-api' });
});

app.post('/api/log-event', async (req, res, next) => {
  try {
    const eventRow = pickFields(req.body, eventFields);
    await appendJsonLine(eventsJsonlPath, eventRow);
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/task-result', async (req, res, next) => {
  try {
    const resultRow = pickFields(req.body, taskResultFields);
    await appendJsonLine(taskResultsJsonlPath, resultRow);
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.get('/api/download/events', async (req, res, next) => {
  try {
    const csvPath = await writeCsvFromJsonl(eventsJsonlPath, eventsCsvPath, eventFields);
    res.download(csvPath, 'events.csv');
  } catch (error) {
    next(error);
  }
});

app.get('/api/download/task-results', async (req, res, next) => {
  try {
    const csvPath = await writeCsvFromJsonl(
      taskResultsJsonlPath,
      taskResultsCsvPath,
      taskResultFields
    );
    res.download(csvPath, 'task_results.csv');
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'API route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    ok: false,
    error: 'Server error'
  });
});

ensureDataDir().then(() => {
  app.listen(PORT, () => {
    console.log(`Experiment API server listening on port ${PORT}`);
  });
});
