import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { IncomingMessage } from 'node:http';
import type { Plugin } from 'vite';
type ReviewReply = { status: number; body: string | Buffer; type: string };
type ReviewRequest = { url: string; method: string; remoteAddress?: string; host: string; origin?: string };
export function isLocalReviewRequest(request: ReviewRequest): boolean {
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(request.remoteAddress || '')) return false;
  try {
    const host = new URL(`http://${request.host}`);
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(host.hostname)) return false;
    if (request.origin && request.origin !== host.origin) return false;
    return true;
  } catch { return false; }
}
export async function localReviewReply(request: ReviewRequest, options: { enabled: boolean; directory: string; base: string }): Promise<ReviewReply> {
  const denied = { status: 404, body: 'Not found', type: 'text/plain' };
  if (!options.enabled || request.method !== 'GET' || !isLocalReviewRequest(request)) return denied;
  const prefix = `${options.base}__luh_review/`;
  const route = request.url.split('?')[0].slice(prefix.length);
  if (!request.url.startsWith(prefix)) return denied;
  if (route === 'status') return { status: 200, body: '{"enabled":true}', type: 'application/json' };
  if (route === 'program' || route === 'media-manifest') {
    return { status: 200, body: await readFile(path.join(options.directory, route === 'program' ? 'program.json' : 'media-manifest.json')), type: 'application/json' };
  }
  const id = route.match(/^media\/([a-z0-9-]+)$/)?.[1];
  if (!id) return denied;
  const manifest = JSON.parse(await readFile(path.join(options.directory, 'media-manifest.json'), 'utf8')) as { assets: { id: string; file: string }[] };
  const asset = manifest.assets.find(a => a.id === id);
  if (!asset) return denied;
  const file = path.resolve(options.directory, asset.file);
  if (!file.startsWith(path.resolve(options.directory) + path.sep) || !/\.(svg|webp|avif)$/.test(file)) return denied;
  return { status: 200, body: await readFile(file), type: file.endsWith('.svg') ? 'image/svg+xml' : `image/${path.extname(file).slice(1)}` };
}
export function privateReviewPlugin(enabled: boolean, base: string): Plugin {
  let directory = '';
  return {
    name: 'luh-local-review',
    configResolved(config) {
      directory = path.join(config.root, 'private/training');
      if (enabled && config.command !== 'serve') throw new Error('Revisão privada não pode ser habilitada em builds.');
      if (enabled && !['127.0.0.1', 'localhost', '::1'].includes(String(config.server.host))) throw new Error('A revisão privada deve ser servida somente em loopback. Use npm run review:private.');
    },
    load(id) { if (id.replaceAll('\\', '/').includes('/private/')) throw new Error('Não importar conteúdo privado no grafo de módulos.'); },
    configureServer(server) {
      server.middlewares.use(async (request: IncomingMessage, response, next) => {
        const url = request.url || '';
        if (!url.startsWith(`${base}__luh_review/`)) return next();
        response.setHeader('Cache-Control', 'no-store'); response.setHeader('X-Content-Type-Options', 'nosniff'); response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
        try {
          const result = await localReviewReply({ url, method: request.method || '', remoteAddress: request.socket.remoteAddress, host: request.headers.host || '', origin: request.headers.origin }, { enabled, directory, base });
          response.statusCode = result.status; response.setHeader('Content-Type', result.type); response.end(result.body);
        } catch { response.statusCode = 503; response.end('Arquivos locais de revisão indisponíveis.'); }
      });
    },
  };
}
