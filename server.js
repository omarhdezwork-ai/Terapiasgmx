const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const root = __dirname;
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.md': 'text/plain; charset=utf-8',
};

function send(response, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  const payload = Buffer.isBuffer(body) ? body : Buffer.from(body);
  response.writeHead(statusCode, {
    'Content-Type': contentType,
    'Content-Length': payload.length,
    'Cache-Control': 'no-store',
  });
  response.end(payload);
}

function resolveRequestPath(requestUrl) {
  const parsedUrl = new URL(requestUrl, `http://localhost:${port}`);
  const cleanPath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  const requestedPath = path.resolve(root, `.${decodeURIComponent(cleanPath)}`);
  const rootBoundary = root.endsWith(path.sep) ? root : `${root}${path.sep}`;

  if (requestedPath !== root && !requestedPath.startsWith(rootBoundary)) {
    return null;
  }

  return requestedPath;
}

const server = http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    send(response, 405, 'Metodo no permitido');
    return;
  }

  let filePath;
  try {
    filePath = resolveRequestPath(request.url);
  } catch (error) {
    send(response, 400, 'Solicitud invalida');
    return;
  }

  if (!filePath) {
    send(response, 403, 'Acceso denegado');
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      send(response, 404, 'Archivo no encontrado');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || 'application/octet-stream';

    fs.readFile(filePath, (readError, content) => {
      if (readError) {
        send(response, 500, 'No se pudo leer el archivo');
        return;
      }

      send(response, 200, request.method === 'HEAD' ? Buffer.alloc(0) : content, contentType);
    });
  });
});

function getLocalIpAddresses() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((details) => details && details.family === 'IPv4' && !details.internal)
    .map((details) => details.address);
}

server.listen(port, host, () => {
  const localIps = getLocalIpAddresses();
  console.log('');
  console.log('Terapias G esta disponible localmente en:');
  console.log(`  http://127.0.0.1:${port}/`);
  localIps.forEach((ip) => console.log(`  http://${ip}:${port}/`));
  console.log('');
  console.log('Para cerrar este servidor, presiona Ctrl + C.');
  console.log('');
});
