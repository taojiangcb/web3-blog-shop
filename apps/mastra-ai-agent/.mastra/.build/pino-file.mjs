import { g as getDefaultExportFromCjs, p as pinoExports } from './pino.mjs';
import require$$0 from 'node:events';
import 'node:os';
import 'fs';
import 'events';
import 'util';
import 'path';
import 'assert';
import 'worker_threads';
import 'module';
import 'node:path';
import 'url';
import 'buffer';

const pino = pinoExports;
const { once } = require$$0;

var file = async function (opts = {}) {
  const destOpts = Object.assign({}, opts, { dest: opts.destination || 1, sync: false });
  delete destOpts.destination;
  const destination = pino.destination(destOpts);
  await once(destination, 'ready');
  return destination
};

var file$1 = /*@__PURE__*/getDefaultExportFromCjs(file);

export { file$1 as default };
