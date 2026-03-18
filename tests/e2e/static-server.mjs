import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../src');
const port = Number(process.env.PORT || 8766);

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function resolvePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0]);
  const requested = pathname === '/' ? '/equation_lab.html' : pathname;
  const absolute = path.resolve(rootDir, '.' + requested);
  if (!absolute.startsWith(rootDir)) return null;
  return absolute;
}

const server = createServer(async (req, res) => {
  const absolute = resolvePath(req.url || '/');
  if (!absolute) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const body = await readFile(absolute);
    const ext = path.extname(absolute);
    res.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Equation Lab static server on http://127.0.0.1:${port}`);
});
