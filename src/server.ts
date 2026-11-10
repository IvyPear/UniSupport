import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.DEFAULT_APP_PORT || process.env.PORT || '3000', 10);
const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

// Health check endpoints for Cloud Run & Kubernetes probes
app.get(['/healthz', '/health', '/api/health'], (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from Vite build output
app.use(express.static(distDir));

// SPA fallback for all routes
app.get('*', (req, res) => {
  if (fs.existsSync(indexHtmlPath)) {
    res.sendFile(indexHtmlPath);
  } else {
    res.status(200).send('<!doctype html><html><head><title>UniSupport</title></head><body><h1>UniSupport is starting...</h1></body></html>');
  }
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`UniSupport server listening on 0.0.0.0:${port}`);
});

server.on('error', (err: any) => {
  console.error(`Server failed to listen on port ${port}:`, err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

