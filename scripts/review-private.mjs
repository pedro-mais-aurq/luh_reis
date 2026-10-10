import { access } from 'node:fs/promises';
import { createServer } from 'vite';
await access('private/training/program.json');
await access('private/training/media-manifest.json');
process.env.LUH_PRIVATE_REVIEW = '1';
const server = await createServer({ configFile: 'vite.config.ts', server: { host: '127.0.0.1', port: 5174, strictPort: true } });
await server.listen();
console.log(`Revisão local: http://127.0.0.1:5174${server.config.base}treinos`);
console.log('Somente este computador; sem conta, compra ou autorização comercial.');
