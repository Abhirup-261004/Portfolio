import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultPortfolio } from './data/portfolio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const clientDistDir = path.resolve(rootDir, 'client/dist');
const app = express();
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, '../images')));
app.use(express.static(clientDistDir));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/portfolio', (_req, res) => {
  res.json(defaultPortfolio);
});

app.put('/api/portfolio', (req, res) => {
  res.json({
    ...defaultPortfolio,
    ...req.body
  });
});

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(clientDistDir, 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Portfolio API running on http://${host}:${port}`);
});
