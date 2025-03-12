import require$$0$4 from 'node:os';
import require$$0$3 from 'node:events';
import require$$0$1 from 'fs';
import require$$1 from 'events';
import require$$2 from 'util';
import require$$3 from 'path';
import require$$5 from 'assert';
import require$$2$1 from 'worker_threads';
import require$$0$2 from 'module';
import require$$2$2 from 'node:path';
import require$$4 from 'url';
import require$$7 from 'buffer';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var pino$2 = {exports: {}};

// **************************************************************
// * Code initially copied/adapted from "pony-cause" npm module *
// * Please upstream improvements there                         *
// **************************************************************

const isErrorLike$2 = (err) => {
  return err && typeof err.message === 'string'
};

/**
 * @param {Error|{ cause?: unknown|(()=>err)}} err
 * @returns {Error|Object|undefined}
 */
const getErrorCause = (err) => {
  if (!err) return

  /** @type {unknown} */
  // @ts-ignore
  const cause = err.cause;

  // VError / NError style causes
  if (typeof cause === 'function') {
    // @ts-ignore
    const causeResult = err.cause();

    return isErrorLike$2(causeResult)
      ? causeResult
      : undefined
  } else {
    return isErrorLike$2(cause)
      ? cause
      : undefined
  }
};

/**
 * Internal method that keeps a track of which error we have already added, to avoid circular recursion
 *
 * @private
 * @param {Error} err
 * @param {Set<Error>} seen
 * @returns {string}
 */
const _stackWithCauses = (err, seen) => {
  if (!isErrorLike$2(err)) return ''

  const stack = err.stack || '';

  // Ensure we don't go circular or crazily deep
  if (seen.has(err)) {
    return stack + '\ncauses have become circular...'
  }

  const cause = getErrorCause(err);

  if (cause) {
    seen.add(err);
    return (stack + '\ncaused by: ' + _stackWithCauses(cause, seen))
  } else {
    return stack
  }
};

/**
 * @param {Error} err
 * @returns {string}
 */
const stackWithCauses$1 = (err) => _stackWithCauses(err, new Set());

/**
 * Internal method that keeps a track of which error we have already added, to avoid circular recursion
 *
 * @private
 * @param {Error} err
 * @param {Set<Error>} seen
 * @param {boolean} [skip]
 * @returns {string}
 */
const _messageWithCauses = (err, seen, skip) => {
  if (!isErrorLike$2(err)) return ''

  const message = skip ? '' : (err.message || '');

  // Ensure we don't go circular or crazily deep
  if (seen.has(err)) {
    return message + ': ...'
  }

  const cause = getErrorCause(err);

  if (cause) {
    seen.add(err);

    // @ts-ignore
    const skipIfVErrorStyleCause = typeof err.cause === 'function';

    return (message +
      (skipIfVErrorStyleCause ? '' : ': ') +
      _messageWithCauses(cause, seen, skipIfVErrorStyleCause))
  } else {
    return message
  }
};

/**
 * @param {Error} err
 * @returns {string}
 */
const messageWithCauses$1 = (err) => _messageWithCauses(err, new Set());

var errHelpers = {
  isErrorLike: isErrorLike$2,
  stackWithCauses: stackWithCauses$1,
  messageWithCauses: messageWithCauses$1
};

const seen$2 = Symbol('circular-ref-tag');
const rawSymbol$2 = Symbol('pino-raw-err-ref');

const pinoErrProto$2 = Object.create({}, {
  type: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  message: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  stack: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  aggregateErrors: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol$2]
    },
    set: function (val) {
      this[rawSymbol$2] = val;
    }
  }
});
Object.defineProperty(pinoErrProto$2, rawSymbol$2, {
  writable: true,
  value: {}
});

var errProto = {
  pinoErrProto: pinoErrProto$2,
  pinoErrorSymbols: {
    seen: seen$2}
};

var err = errSerializer$1;

const { messageWithCauses, stackWithCauses, isErrorLike: isErrorLike$1 } = errHelpers;
const { pinoErrProto: pinoErrProto$1, pinoErrorSymbols: pinoErrorSymbols$1 } = errProto;
const { seen: seen$1 } = pinoErrorSymbols$1;

const { toString: toString$1 } = Object.prototype;

function errSerializer$1 (err) {
  if (!isErrorLike$1(err)) {
    return err
  }

  err[seen$1] = undefined; // tag to prevent re-looking at this
  const _err = Object.create(pinoErrProto$1);
  _err.type = toString$1.call(err.constructor) === '[object Function]'
    ? err.constructor.name
    : err.name;
  _err.message = messageWithCauses(err);
  _err.stack = stackWithCauses(err);

  if (Array.isArray(err.errors)) {
    _err.aggregateErrors = err.errors.map(err => errSerializer$1(err));
  }

  for (const key in err) {
    if (_err[key] === undefined) {
      const val = err[key];
      if (isErrorLike$1(val)) {
        // We append cause messages and stacks to _err, therefore skipping causes here
        if (key !== 'cause' && !Object.prototype.hasOwnProperty.call(val, seen$1)) {
          _err[key] = errSerializer$1(val);
        }
      } else {
        _err[key] = val;
      }
    }
  }

  delete err[seen$1]; // clean up tag in case err is serialized again later
  _err.raw = err;
  return _err
}

var errWithCause = errWithCauseSerializer$1;

const { isErrorLike } = errHelpers;
const { pinoErrProto, pinoErrorSymbols } = errProto;
const { seen } = pinoErrorSymbols;

const { toString } = Object.prototype;

function errWithCauseSerializer$1 (err) {
  if (!isErrorLike(err)) {
    return err
  }

  err[seen] = undefined; // tag to prevent re-looking at this
  const _err = Object.create(pinoErrProto);
  _err.type = toString.call(err.constructor) === '[object Function]'
    ? err.constructor.name
    : err.name;
  _err.message = err.message;
  _err.stack = err.stack;

  if (Array.isArray(err.errors)) {
    _err.aggregateErrors = err.errors.map(err => errWithCauseSerializer$1(err));
  }

  if (isErrorLike(err.cause) && !Object.prototype.hasOwnProperty.call(err.cause, seen)) {
    _err.cause = errWithCauseSerializer$1(err.cause);
  }

  for (const key in err) {
    if (_err[key] === undefined) {
      const val = err[key];
      if (isErrorLike(val)) {
        if (!Object.prototype.hasOwnProperty.call(val, seen)) {
          _err[key] = errWithCauseSerializer$1(val);
        }
      } else {
        _err[key] = val;
      }
    }
  }

  delete err[seen]; // clean up tag in case err is serialized again later
  _err.raw = err;
  return _err
}

var req = {
  mapHttpRequest: mapHttpRequest$1,
  reqSerializer
};

const rawSymbol$1 = Symbol('pino-raw-req-ref');
const pinoReqProto = Object.create({}, {
  id: {
    enumerable: true,
    writable: true,
    value: ''
  },
  method: {
    enumerable: true,
    writable: true,
    value: ''
  },
  url: {
    enumerable: true,
    writable: true,
    value: ''
  },
  query: {
    enumerable: true,
    writable: true,
    value: ''
  },
  params: {
    enumerable: true,
    writable: true,
    value: ''
  },
  headers: {
    enumerable: true,
    writable: true,
    value: {}
  },
  remoteAddress: {
    enumerable: true,
    writable: true,
    value: ''
  },
  remotePort: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol$1]
    },
    set: function (val) {
      this[rawSymbol$1] = val;
    }
  }
});
Object.defineProperty(pinoReqProto, rawSymbol$1, {
  writable: true,
  value: {}
});

function reqSerializer (req) {
  // req.info is for hapi compat.
  const connection = req.info || req.socket;
  const _req = Object.create(pinoReqProto);
  _req.id = (typeof req.id === 'function' ? req.id() : (req.id || (req.info ? req.info.id : undefined)));
  _req.method = req.method;
  // req.originalUrl is for expressjs compat.
  if (req.originalUrl) {
    _req.url = req.originalUrl;
  } else {
    const path = req.path;
    // path for safe hapi compat.
    _req.url = typeof path === 'string' ? path : (req.url ? req.url.path || req.url : undefined);
  }

  if (req.query) {
    _req.query = req.query;
  }

  if (req.params) {
    _req.params = req.params;
  }

  _req.headers = req.headers;
  _req.remoteAddress = connection && connection.remoteAddress;
  _req.remotePort = connection && connection.remotePort;
  // req.raw is  for hapi compat/equivalence
  _req.raw = req.raw || req;
  return _req
}

function mapHttpRequest$1 (req) {
  return {
    req: reqSerializer(req)
  }
}

var res = {
  mapHttpResponse: mapHttpResponse$1,
  resSerializer
};

const rawSymbol = Symbol('pino-raw-res-ref');
const pinoResProto = Object.create({}, {
  statusCode: {
    enumerable: true,
    writable: true,
    value: 0
  },
  headers: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol]
    },
    set: function (val) {
      this[rawSymbol] = val;
    }
  }
});
Object.defineProperty(pinoResProto, rawSymbol, {
  writable: true,
  value: {}
});

function resSerializer (res) {
  const _res = Object.create(pinoResProto);
  _res.statusCode = res.headersSent ? res.statusCode : null;
  _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
  _res.raw = res;
  return _res
}

function mapHttpResponse$1 (res) {
  return {
    res: resSerializer(res)
  }
}

const errSerializer = err;
const errWithCauseSerializer = errWithCause;
const reqSerializers = req;
const resSerializers = res;

var pinoStdSerializers = {
  err: errSerializer,
  errWithCause: errWithCauseSerializer,
  mapHttpRequest: reqSerializers.mapHttpRequest,
  mapHttpResponse: resSerializers.mapHttpResponse,
  req: reqSerializers.reqSerializer,
  res: resSerializers.resSerializer,

  wrapErrorSerializer: function wrapErrorSerializer (customSerializer) {
    if (customSerializer === errSerializer) return customSerializer
    return function wrapErrSerializer (err) {
      return customSerializer(errSerializer(err))
    }
  },

  wrapRequestSerializer: function wrapRequestSerializer (customSerializer) {
    if (customSerializer === reqSerializers.reqSerializer) return customSerializer
    return function wrappedReqSerializer (req) {
      return customSerializer(reqSerializers.reqSerializer(req))
    }
  },

  wrapResponseSerializer: function wrapResponseSerializer (customSerializer) {
    if (customSerializer === resSerializers.resSerializer) return customSerializer
    return function wrappedResSerializer (res) {
      return customSerializer(resSerializers.resSerializer(res))
    }
  }
};

function noOpPrepareStackTrace (_, stack) {
  return stack
}

var caller$1 = function getCallers () {
  const originalPrepare = Error.prepareStackTrace;
  Error.prepareStackTrace = noOpPrepareStackTrace;
  const stack = new Error().stack;
  Error.prepareStackTrace = originalPrepare;

  if (!Array.isArray(stack)) {
    return undefined
  }

  const entries = stack.slice(2);

  const fileNames = [];

  for (const entry of entries) {
    if (!entry) {
      continue
    }

    fileNames.push(entry.getFileName());
  }

  return fileNames
};

var validator_1 = validator$2;

function validator$2 (opts = {}) {
  const {
    ERR_PATHS_MUST_BE_STRINGS = () => 'fast-redact - Paths must be (non-empty) strings',
    ERR_INVALID_PATH = (s) => `fast-redact – Invalid path (${s})`
  } = opts;

  return function validate ({ paths }) {
    paths.forEach((s) => {
      if (typeof s !== 'string') {
        throw Error(ERR_PATHS_MUST_BE_STRINGS())
      }
      try {
        if (/〇/.test(s)) throw Error()
        const expr = (s[0] === '[' ? '' : '.') + s.replace(/^\*/, '〇').replace(/\.\*/g, '.〇').replace(/\[\*\]/g, '[〇]');
        if (/\n|\r|;/.test(expr)) throw Error()
        if (/\/\*/.test(expr)) throw Error()
        /* eslint-disable-next-line */
        Function(`
            'use strict'
            const o = new Proxy({}, { get: () => o, set: () => { throw Error() } });
            const 〇 = null;
            o${expr}
            if ([o${expr}].length !== 1) throw Error()`)();
      } catch (e) {
        throw Error(ERR_INVALID_PATH(s))
      }
    });
  }
}

var rx$4 = /[^.[\]]+|\[((?:.)*?)\]/g;

const rx$3 = rx$4;

var parse_1 = parse$1;

function parse$1 ({ paths }) {
  const wildcards = [];
  var wcLen = 0;
  const secret = paths.reduce(function (o, strPath, ix) {
    var path = strPath.match(rx$3).map((p) => p.replace(/'|"|`/g, ''));
    const leadingBracket = strPath[0] === '[';
    path = path.map((p) => {
      if (p[0] === '[') return p.substr(1, p.length - 2)
      else return p
    });
    const star = path.indexOf('*');
    if (star > -1) {
      const before = path.slice(0, star);
      const beforeStr = before.join('.');
      const after = path.slice(star + 1, path.length);
      const nested = after.length > 0;
      wcLen++;
      wildcards.push({
        before,
        beforeStr,
        after,
        nested
      });
    } else {
      o[strPath] = {
        path: path,
        val: undefined,
        precensored: false,
        circle: '',
        escPath: JSON.stringify(strPath),
        leadingBracket: leadingBracket
      };
    }
    return o
  }, {});

  return { wildcards, wcLen, secret }
}

const rx$2 = rx$4;

var redactor_1 = redactor$1;

function redactor$1 ({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
  /* eslint-disable-next-line */
  const redact = Function('o', `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    this.secret = originalSecret
    ${resultTmpl(serialize)}
  `).bind(state);

  redact.state = state;

  if (serialize === false) {
    redact.restore = (o) => state.restore(o);
  }

  return redact
}

function redactTmpl (secret, isCensorFct, censorFctTakesPath) {
  return Object.keys(secret).map((path) => {
    const { escPath, leadingBracket, path: arrPath } = secret[path];
    const skip = leadingBracket ? 1 : 0;
    const delim = leadingBracket ? '' : '.';
    const hops = [];
    var match;
    while ((match = rx$2.exec(path)) !== null) {
      const [ , ix ] = match;
      const { index, input } = match;
      if (index > skip) hops.push(input.substring(0, index - (ix ? 0 : 1)));
    }
    var existence = hops.map((p) => `o${delim}${p}`).join(' && ');
    if (existence.length === 0) existence += `o${delim}${path} != null`;
    else existence += ` && o${delim}${path} != null`;

    const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join('\n')}
      }
    `;

    const censorArgs = censorFctTakesPath
      ? `val, ${JSON.stringify(arrPath)}`
      : `val`;

    return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : 'censor'}
          ${circularDetection}
        }
      }
    `
  }).join('\n')
}

function dynamicRedactTmpl (hasWildcards, isCensorFct, censorFctTakesPath) {
  return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : ''
}

function resultTmpl (serialize) {
  return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `
}

function strictImpl (strict, serialize) {
  return strict === true
    ? `throw Error('fast-redact: primitives cannot be redacted')`
    : serialize === false ? `return o` : `return this.serialize(o)`
}

var modifiers = {
  groupRedact: groupRedact$1,
  groupRestore: groupRestore$1,
  nestedRedact: nestedRedact$1,
  nestedRestore: nestedRestore$1
};

function groupRestore$1 ({ keys, values, target }) {
  if (target == null || typeof target === 'string') return
  const length = keys.length;
  for (var i = 0; i < length; i++) {
    const k = keys[i];
    target[k] = values[i];
  }
}

function groupRedact$1 (o, path, censor, isCensorFct, censorFctTakesPath) {
  const target = get(o, path);
  if (target == null || typeof target === 'string') return { keys: null, values: null, target, flat: true }
  const keys = Object.keys(target);
  const keysLength = keys.length;
  const pathLength = path.length;
  const pathWithKey = censorFctTakesPath ? [...path] : undefined;
  const values = new Array(keysLength);

  for (var i = 0; i < keysLength; i++) {
    const key = keys[i];
    values[i] = target[key];

    if (censorFctTakesPath) {
      pathWithKey[pathLength] = key;
      target[key] = censor(target[key], pathWithKey);
    } else if (isCensorFct) {
      target[key] = censor(target[key]);
    } else {
      target[key] = censor;
    }
  }
  return { keys, values, target, flat: true }
}

/**
 * @param {RestoreInstruction[]} instructions a set of instructions for restoring values to objects
 */
function nestedRestore$1 (instructions) {
  for (let i = 0; i < instructions.length; i++) {
    const { target, path, value } = instructions[i];
    let current = target;
    for (let i = path.length - 1; i > 0; i--) {
      current = current[path[i]];
    }
    current[path[0]] = value;
  }
}

function nestedRedact$1 (store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
  const target = get(o, path);
  if (target == null) return
  const keys = Object.keys(target);
  const keysLength = keys.length;
  for (var i = 0; i < keysLength; i++) {
    const key = keys[i];
    specialSet(store, target, key, path, ns, censor, isCensorFct, censorFctTakesPath);
  }
  return store
}

function has (obj, prop) {
  return obj !== undefined && obj !== null
    ? ('hasOwn' in Object ? Object.hasOwn(obj, prop) : Object.prototype.hasOwnProperty.call(obj, prop))
    : false
}

function specialSet (store, o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
  const afterPathLen = afterPath.length;
  const lastPathIndex = afterPathLen - 1;
  const originalKey = k;
  var i = -1;
  var n;
  var nv;
  var ov;
  var wc = null;
  var kIsWc;
  var wcov;
  var consecutive = false;
  var level = 0;
  // need to track depth of the `redactPath` tree
  var depth = 0;
  var redactPathCurrent = tree();
  ov = n = o[k];
  if (typeof n !== 'object') return
  while (n != null && ++i < afterPathLen) {
    depth += 1;
    k = afterPath[i];
    if (k !== '*' && !wc && !(typeof n === 'object' && k in n)) {
      break
    }
    if (k === '*') {
      if (wc === '*') {
        consecutive = true;
      }
      wc = k;
      if (i !== lastPathIndex) {
        continue
      }
    }
    if (wc) {
      const wcKeys = Object.keys(n);
      for (var j = 0; j < wcKeys.length; j++) {
        const wck = wcKeys[j];
        wcov = n[wck];
        kIsWc = k === '*';
        if (consecutive) {
          redactPathCurrent = node(redactPathCurrent, wck, depth);
          level = i;
          ov = iterateNthLevel(wcov, level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, o[originalKey], depth + 1);
        } else {
          if (kIsWc || (typeof wcov === 'object' && wcov !== null && k in wcov)) {
            if (kIsWc) {
              ov = wcov;
            } else {
              ov = wcov[k];
            }
            nv = (i !== lastPathIndex)
              ? ov
              : (isCensorFct
                ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
                : censor);
            if (kIsWc) {
              const rv = restoreInstr(node(redactPathCurrent, wck, depth), ov, o[originalKey]);
              store.push(rv);
              n[wck] = nv;
            } else {
              if (wcov[k] === nv) ; else if ((nv === undefined && censor !== undefined) || (has(wcov, k) && nv === ov)) {
                redactPathCurrent = node(redactPathCurrent, wck, depth);
              } else {
                redactPathCurrent = node(redactPathCurrent, wck, depth);
                const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, o[originalKey]);
                store.push(rv);
                wcov[k] = nv;
              }
            }
          }
        }
      }
      wc = null;
    } else {
      ov = n[k];
      redactPathCurrent = node(redactPathCurrent, k, depth);
      nv = (i !== lastPathIndex)
        ? ov
        : (isCensorFct
          ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
          : censor);
      if ((has(n, k) && nv === ov) || (nv === undefined && censor !== undefined)) ; else {
        const rv = restoreInstr(redactPathCurrent, ov, o[originalKey]);
        store.push(rv);
        n[k] = nv;
      }
      n = n[k];
    }
    if (typeof n !== 'object') break
  }
}

function get (o, p) {
  var i = -1;
  var l = p.length;
  var n = o;
  while (n != null && ++i < l) {
    n = n[p[i]];
  }
  return n
}

function iterateNthLevel (wcov, level, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth) {
  if (level === 0) {
    if (kIsWc || (typeof wcov === 'object' && wcov !== null && k in wcov)) {
      if (kIsWc) {
        ov = wcov;
      } else {
        ov = wcov[k];
      }
      nv = (i !== lastPathIndex)
        ? ov
        : (isCensorFct
          ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
          : censor);
      if (kIsWc) {
        const rv = restoreInstr(redactPathCurrent, ov, parent);
        store.push(rv);
        n[wck] = nv;
      } else {
        if (wcov[k] === nv) ; else if ((nv === undefined && censor !== undefined) || (has(wcov, k) && nv === ov)) ; else {
          const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, parent);
          store.push(rv);
          wcov[k] = nv;
        }
      }
    }
  }
  for (const key in wcov) {
    if (typeof wcov[key] === 'object') {
      redactPathCurrent = node(redactPathCurrent, key, depth);
      iterateNthLevel(wcov[key], level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth + 1);
    }
  }
}

/**
 * @typedef {object} TreeNode
 * @prop {TreeNode} [parent] reference to the parent of this node in the tree, or `null` if there is no parent
 * @prop {string} key the key that this node represents (key here being part of the path being redacted
 * @prop {TreeNode[]} children the child nodes of this node
 * @prop {number} depth the depth of this node in the tree
 */

/**
 * instantiate a new, empty tree
 * @returns {TreeNode}
 */
function tree () {
  return { parent: null, key: null, children: [], depth: 0 }
}

/**
 * creates a new node in the tree, attaching it as a child of the provided parent node
 * if the specified depth matches the parent depth, adds the new node as a _sibling_ of the parent instead
  * @param {TreeNode} parent the parent node to add a new node to (if the parent depth matches the provided `depth` value, will instead add as a sibling of this
  * @param {string} key the key that the new node represents (key here being part of the path being redacted)
  * @param {number} depth the depth of the new node in the tree - used to determing whether to add the new node as a child or sibling of the provided `parent` node
  * @returns {TreeNode} a reference to the newly created node in the tree
 */
function node (parent, key, depth) {
  if (parent.depth === depth) {
    return node(parent.parent, key, depth)
  }

  var child = {
    parent,
    key,
    depth,
    children: []
  };

  parent.children.push(child);

  return child
}

/**
 * @typedef {object} RestoreInstruction
 * @prop {string[]} path a reverse-order path that can be used to find the correct insertion point to restore a `value` for the given `parent` object
 * @prop {*} value the value to restore
 * @prop {object} target the object to restore the `value` in
 */

/**
 * create a restore instruction for the given redactPath node
 * generates a path in reverse order by walking up the redactPath tree
 * @param {TreeNode} node a tree node that should be at the bottom of the redact path (i.e. have no children) - this will be used to walk up the redact path tree to construct the path needed to restore
 * @param {*} value the value to restore
 * @param {object} target a reference to the parent object to apply the restore instruction to
 * @returns {RestoreInstruction} an instruction used to restore a nested value for a specific object
 */
function restoreInstr (node, value, target) {
  let current = node;
  const path = [];
  do {
    path.push(current.key);
    current = current.parent;
  } while (current.parent != null)

  return { path, value, target }
}

const { groupRestore, nestedRestore } = modifiers;

var restorer_1 = restorer$1;

function restorer$1 () {
  return function compileRestore () {
    if (this.restore) {
      this.restore.state.secret = this.secret;
      return
    }
    const { secret, wcLen } = this;
    const paths = Object.keys(secret);
    const resetters = resetTmpl(secret, paths);
    const hasWildcards = wcLen > 0;
    const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret };
    /* eslint-disable-next-line */
    this.restore = Function(
      'o',
      restoreTmpl(resetters, paths, hasWildcards)
    ).bind(state);
    this.restore.state = state;
  }
}

/**
 * Mutates the original object to be censored by restoring its original values
 * prior to censoring.
 *
 * @param {object} secret Compiled object describing which target fields should
 * be censored and the field states.
 * @param {string[]} paths The list of paths to censor as provided at
 * initialization time.
 *
 * @returns {string} String of JavaScript to be used by `Function()`. The
 * string compiles to the function that does the work in the description.
 */
function resetTmpl (secret, paths) {
  return paths.map((path) => {
    const { circle, escPath, leadingBracket } = secret[path];
    const delim = leadingBracket ? '' : '.';
    const reset = circle
      ? `o.${circle} = secret[${escPath}].val`
      : `o${delim}${path} = secret[${escPath}].val`;
    const clear = `secret[${escPath}].val = undefined`;
    return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `
  }).join('')
}

/**
 * Creates the body of the restore function
 *
 * Restoration of the redacted object happens
 * backwards, in reverse order of redactions,
 * so that repeated redactions on the same object
 * property can be eventually rolled back to the
 * original value.
 *
 * This way dynamic redactions are restored first,
 * starting from the last one working backwards and
 * followed by the static ones.
 *
 * @returns {string} the body of the restore function
 */
function restoreTmpl (resetters, paths, hasWildcards) {
  const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o) {
        if (o.flat === true) this.groupRestore(o)
        else this.nestedRestore(o)
        secret[k] = null
      }
    }
  ` : '';

  return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `
}

var state_1 = state$1;

function state$1 (o) {
  const {
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  } = o;
  const builder = [{ secret, censor, compileRestore }];
  if (serialize !== false) builder.push({ serialize });
  if (wcLen > 0) builder.push({ groupRedact, nestedRedact, wildcards, wcLen });
  return Object.assign(...builder)
}

const validator$1 = validator_1;
const parse = parse_1;
const redactor = redactor_1;
const restorer = restorer_1;
const { groupRedact, nestedRedact } = modifiers;
const state = state_1;
const rx$1 = rx$4;
const validate$1 = validator$1();
const noop$4 = (o) => o;
noop$4.restore = noop$4;

const DEFAULT_CENSOR = '[REDACTED]';
fastRedact$1.rx = rx$1;
fastRedact$1.validator = validator$1;

var fastRedact_1 = fastRedact$1;

function fastRedact$1 (opts = {}) {
  const paths = Array.from(new Set(opts.paths || []));
  const serialize = 'serialize' in opts ? (
    opts.serialize === false ? opts.serialize
      : (typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify)
  ) : JSON.stringify;
  const remove = opts.remove;
  if (remove === true && serialize !== JSON.stringify) {
    throw Error('fast-redact – remove option may only be set when serializer is JSON.stringify')
  }
  const censor = remove === true
    ? undefined
    : 'censor' in opts ? opts.censor : DEFAULT_CENSOR;

  const isCensorFct = typeof censor === 'function';
  const censorFctTakesPath = isCensorFct && censor.length > 1;

  if (paths.length === 0) return serialize || noop$4

  validate$1({ paths, serialize, censor });

  const { wildcards, wcLen, secret } = parse({ paths});

  const compileRestore = restorer();
  const strict = 'strict' in opts ? opts.strict : true;

  return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state({
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  }))
}

const setLevelSym$2 = Symbol('pino.setLevel');
const getLevelSym$1 = Symbol('pino.getLevel');
const levelValSym$2 = Symbol('pino.levelVal');
const levelCompSym$2 = Symbol('pino.levelComp');
const useLevelLabelsSym = Symbol('pino.useLevelLabels');
const useOnlyCustomLevelsSym$3 = Symbol('pino.useOnlyCustomLevels');
const mixinSym$2 = Symbol('pino.mixin');

const lsCacheSym$3 = Symbol('pino.lsCache');
const chindingsSym$3 = Symbol('pino.chindings');

const asJsonSym$1 = Symbol('pino.asJson');
const writeSym$2 = Symbol('pino.write');
const redactFmtSym$3 = Symbol('pino.redactFmt');

const timeSym$2 = Symbol('pino.time');
const timeSliceIndexSym$2 = Symbol('pino.timeSliceIndex');
const streamSym$3 = Symbol('pino.stream');
const stringifySym$3 = Symbol('pino.stringify');
const stringifySafeSym$2 = Symbol('pino.stringifySafe');
const stringifiersSym$3 = Symbol('pino.stringifiers');
const endSym$2 = Symbol('pino.end');
const formatOptsSym$3 = Symbol('pino.formatOpts');
const messageKeySym$3 = Symbol('pino.messageKey');
const errorKeySym$3 = Symbol('pino.errorKey');
const nestedKeySym$2 = Symbol('pino.nestedKey');
const nestedKeyStrSym$2 = Symbol('pino.nestedKeyStr');
const mixinMergeStrategySym$2 = Symbol('pino.mixinMergeStrategy');
const msgPrefixSym$3 = Symbol('pino.msgPrefix');

const wildcardFirstSym$2 = Symbol('pino.wildcardFirst');

// public symbols, no need to use the same pino
// version for these
const serializersSym$3 = Symbol.for('pino.serializers');
const formattersSym$4 = Symbol.for('pino.formatters');
const hooksSym$2 = Symbol.for('pino.hooks');
const needsMetadataGsym$1 = Symbol.for('pino.metadata');

var symbols$1 = {
  setLevelSym: setLevelSym$2,
  getLevelSym: getLevelSym$1,
  levelValSym: levelValSym$2,
  levelCompSym: levelCompSym$2,
  useLevelLabelsSym,
  mixinSym: mixinSym$2,
  lsCacheSym: lsCacheSym$3,
  chindingsSym: chindingsSym$3,
  asJsonSym: asJsonSym$1,
  writeSym: writeSym$2,
  serializersSym: serializersSym$3,
  redactFmtSym: redactFmtSym$3,
  timeSym: timeSym$2,
  timeSliceIndexSym: timeSliceIndexSym$2,
  streamSym: streamSym$3,
  stringifySym: stringifySym$3,
  stringifySafeSym: stringifySafeSym$2,
  stringifiersSym: stringifiersSym$3,
  endSym: endSym$2,
  formatOptsSym: formatOptsSym$3,
  messageKeySym: messageKeySym$3,
  errorKeySym: errorKeySym$3,
  nestedKeySym: nestedKeySym$2,
  wildcardFirstSym: wildcardFirstSym$2,
  needsMetadataGsym: needsMetadataGsym$1,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$3,
  formattersSym: formattersSym$4,
  hooksSym: hooksSym$2,
  nestedKeyStrSym: nestedKeyStrSym$2,
  mixinMergeStrategySym: mixinMergeStrategySym$2,
  msgPrefixSym: msgPrefixSym$3
};

const fastRedact = fastRedact_1;
const { redactFmtSym: redactFmtSym$2, wildcardFirstSym: wildcardFirstSym$1 } = symbols$1;
const { rx, validator } = fastRedact;

const validate = validator({
  ERR_PATHS_MUST_BE_STRINGS: () => 'pino – redacted paths must be strings',
  ERR_INVALID_PATH: (s) => `pino – redact paths array contains an invalid path (${s})`
});

const CENSOR = '[Redacted]';
const strict = false; // TODO should this be configurable?

function redaction$2 (opts, serialize) {
  const { paths, censor } = handle(opts);

  const shape = paths.reduce((o, str) => {
    rx.lastIndex = 0;
    const first = rx.exec(str);
    const next = rx.exec(str);

    // ns is the top-level path segment, brackets + quoting removed.
    let ns = first[1] !== undefined
      ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, '$1')
      : first[0];

    if (ns === '*') {
      ns = wildcardFirstSym$1;
    }

    // top level key:
    if (next === null) {
      o[ns] = null;
      return o
    }

    // path with at least two segments:
    // if ns is already redacted at the top level, ignore lower level redactions
    if (o[ns] === null) {
      return o
    }

    const { index } = next;
    const nextPath = `${str.substr(index, str.length - 1)}`;

    o[ns] = o[ns] || [];

    // shape is a mix of paths beginning with literal values and wildcard
    // paths [ "a.b.c", "*.b.z" ] should reduce to a shape of
    // { "a": [ "b.c", "b.z" ], *: [ "b.z" ] }
    // note: "b.z" is in both "a" and * arrays because "a" matches the wildcard.
    // (* entry has wildcardFirstSym as key)
    if (ns !== wildcardFirstSym$1 && o[ns].length === 0) {
      // first time ns's get all '*' redactions so far
      o[ns].push(...(o[wildcardFirstSym$1] || []));
    }

    if (ns === wildcardFirstSym$1) {
      // new * path gets added to all previously registered literal ns's.
      Object.keys(o).forEach(function (k) {
        if (o[k]) {
          o[k].push(nextPath);
        }
      });
    }

    o[ns].push(nextPath);
    return o
  }, {});

  // the redactor assigned to the format symbol key
  // provides top level redaction for instances where
  // an object is interpolated into the msg string
  const result = {
    [redactFmtSym$2]: fastRedact({ paths, censor, serialize, strict })
  };

  const topCensor = (...args) => {
    return typeof censor === 'function' ? serialize(censor(...args)) : serialize(censor)
  };

  return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
    // top level key:
    if (shape[k] === null) {
      o[k] = (value) => topCensor(value, [k]);
    } else {
      const wrappedCensor = typeof censor === 'function'
        ? (value, path) => {
            return censor(value, [k, ...path])
          }
        : censor;
      o[k] = fastRedact({
        paths: shape[k],
        censor: wrappedCensor,
        serialize,
        strict
      });
    }
    return o
  }, result)
}

function handle (opts) {
  if (Array.isArray(opts)) {
    opts = { paths: opts, censor: CENSOR };
    validate(opts);
    return opts
  }
  let { paths, censor = CENSOR, remove } = opts;
  if (Array.isArray(paths) === false) { throw Error('pino – redact must contain an array of strings') }
  if (remove === true) censor = undefined;
  validate({ paths, censor });

  return { paths, censor }
}

var redaction_1 = redaction$2;

const nullTime$1 = () => '';

const epochTime$1 = () => `,"time":${Date.now()}`;

const unixTime = () => `,"time":${Math.round(Date.now() / 1000.0)}`;

const isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`; // using Date.now() for testability

var time$1 = { nullTime: nullTime$1, epochTime: epochTime$1, unixTime, isoTime };

function tryStringify (o) {
  try { return JSON.stringify(o) } catch(e) { return '"[Circular]"' }
}

var quickFormatUnescaped = format$1;

function format$1(f, args, opts) {
  var ss = (opts && opts.stringify) || tryStringify;
  var offset = 1;
  if (typeof f === 'object' && f !== null) {
    var len = args.length + offset;
    if (len === 1) return f
    var objects = new Array(len);
    objects[0] = ss(f);
    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index]);
    }
    return objects.join(' ')
  }
  if (typeof f !== 'string') {
    return f
  }
  var argLen = args.length;
  if (argLen === 0) return f
  var str = '';
  var a = 1 - offset;
  var lastPos = -1;
  var flen = (f && f.length) || 0;
  for (var i = 0; i < flen;) {
    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0;
      switch (f.charCodeAt(i + 1)) {
        case 100: // 'd'
        case 102: // 'f'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += Number(args[a]);
          lastPos = i + 2;
          i++;
          break
        case 105: // 'i'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += Math.floor(Number(args[a]));
          lastPos = i + 2;
          i++;
          break
        case 79: // 'O'
        case 111: // 'o'
        case 106: // 'j'
          if (a >= argLen)
            break
          if (args[a] === undefined) break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          var type = typeof args[a];
          if (type === 'string') {
            str += '\'' + args[a] + '\'';
            lastPos = i + 2;
            i++;
            break
          }
          if (type === 'function') {
            str += args[a].name || '<anonymous>';
            lastPos = i + 2;
            i++;
            break
          }
          str += ss(args[a]);
          lastPos = i + 2;
          i++;
          break
        case 115: // 's'
          if (a >= argLen)
            break
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += String(args[a]);
          lastPos = i + 2;
          i++;
          break
        case 37: // '%'
          if (lastPos < i)
            str += f.slice(lastPos, i);
          str += '%';
          lastPos = i + 2;
          i++;
          a--;
          break
      }
      ++a;
    }
    ++i;
  }
  if (lastPos === -1)
    return f
  else if (lastPos < flen) {
    str += f.slice(lastPos);
  }

  return str
}

var atomicSleep = {exports: {}};

/* global SharedArrayBuffer, Atomics */

if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
  const nil = new Int32Array(new SharedArrayBuffer(4));

  function sleep (ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity; 
    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number')
      }
      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
    }

    Atomics.wait(nil, 0, 0, Number(ms));
  }
  atomicSleep.exports = sleep;
} else {

  function sleep (ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity; 
    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number')
      }
      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
    }
  }

  atomicSleep.exports = sleep;

}

var atomicSleepExports = atomicSleep.exports;

const fs = require$$0$1;
const EventEmitter$2 = require$$1;
const inherits = require$$2.inherits;
const path = require$$3;
const sleep$1 = atomicSleepExports;
const assert$1 = require$$5;

const BUSY_WRITE_TIMEOUT = 100;
const kEmptyBuffer = Buffer.allocUnsafe(0);

// 16 KB. Don't write more than docker buffer size.
// https://github.com/moby/moby/blob/513ec73831269947d38a644c278ce3cac36783b2/daemon/logger/copier.go#L13
const MAX_WRITE = 16 * 1024;

const kContentModeBuffer = 'buffer';
const kContentModeUtf8 = 'utf8';

const [major, minor] = (process.versions.node || '0.0').split('.').map(Number);
const kCopyBuffer = major >= 22 && minor >= 7;

function openFile (file, sonic) {
  sonic._opening = true;
  sonic._writing = true;
  sonic._asyncDrainScheduled = false;

  // NOTE: 'error' and 'ready' events emitted below only relevant when sonic.sync===false
  // for sync mode, there is no way to add a listener that will receive these

  function fileOpened (err, fd) {
    if (err) {
      sonic._reopening = false;
      sonic._writing = false;
      sonic._opening = false;

      if (sonic.sync) {
        process.nextTick(() => {
          if (sonic.listenerCount('error') > 0) {
            sonic.emit('error', err);
          }
        });
      } else {
        sonic.emit('error', err);
      }
      return
    }

    const reopening = sonic._reopening;

    sonic.fd = fd;
    sonic.file = file;
    sonic._reopening = false;
    sonic._opening = false;
    sonic._writing = false;

    if (sonic.sync) {
      process.nextTick(() => sonic.emit('ready'));
    } else {
      sonic.emit('ready');
    }

    if (sonic.destroyed) {
      return
    }

    // start
    if ((!sonic._writing && sonic._len > sonic.minLength) || sonic._flushPending) {
      sonic._actualWrite();
    } else if (reopening) {
      process.nextTick(() => sonic.emit('drain'));
    }
  }

  const flags = sonic.append ? 'a' : 'w';
  const mode = sonic.mode;

  if (sonic.sync) {
    try {
      if (sonic.mkdir) fs.mkdirSync(path.dirname(file), { recursive: true });
      const fd = fs.openSync(file, flags, mode);
      fileOpened(null, fd);
    } catch (err) {
      fileOpened(err);
      throw err
    }
  } else if (sonic.mkdir) {
    fs.mkdir(path.dirname(file), { recursive: true }, (err) => {
      if (err) return fileOpened(err)
      fs.open(file, flags, mode, fileOpened);
    });
  } else {
    fs.open(file, flags, mode, fileOpened);
  }
}

function SonicBoom$1 (opts) {
  if (!(this instanceof SonicBoom$1)) {
    return new SonicBoom$1(opts)
  }

  let { fd, dest, minLength, maxLength, maxWrite, periodicFlush, sync, append = true, mkdir, retryEAGAIN, fsync, contentMode, mode } = opts || {};

  fd = fd || dest;

  this._len = 0;
  this.fd = -1;
  this._bufs = [];
  this._lens = [];
  this._writing = false;
  this._ending = false;
  this._reopening = false;
  this._asyncDrainScheduled = false;
  this._flushPending = false;
  this._hwm = Math.max(minLength || 0, 16387);
  this.file = null;
  this.destroyed = false;
  this.minLength = minLength || 0;
  this.maxLength = maxLength || 0;
  this.maxWrite = maxWrite || MAX_WRITE;
  this._periodicFlush = periodicFlush || 0;
  this._periodicFlushTimer = undefined;
  this.sync = sync || false;
  this.writable = true;
  this._fsync = fsync || false;
  this.append = append || false;
  this.mode = mode;
  this.retryEAGAIN = retryEAGAIN || (() => true);
  this.mkdir = mkdir || false;

  let fsWriteSync;
  let fsWrite;
  if (contentMode === kContentModeBuffer) {
    this._writingBuf = kEmptyBuffer;
    this.write = writeBuffer;
    this.flush = flushBuffer;
    this.flushSync = flushBufferSync;
    this._actualWrite = actualWriteBuffer;
    fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf);
    fsWrite = () => fs.write(this.fd, this._writingBuf, this.release);
  } else if (contentMode === undefined || contentMode === kContentModeUtf8) {
    this._writingBuf = '';
    this.write = write$2;
    this.flush = flush$2;
    this.flushSync = flushSync$1;
    this._actualWrite = actualWrite;
    fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf, 'utf8');
    fsWrite = () => fs.write(this.fd, this._writingBuf, 'utf8', this.release);
  } else {
    throw new Error(`SonicBoom supports "${kContentModeUtf8}" and "${kContentModeBuffer}", but passed ${contentMode}`)
  }

  if (typeof fd === 'number') {
    this.fd = fd;
    process.nextTick(() => this.emit('ready'));
  } else if (typeof fd === 'string') {
    openFile(fd, this);
  } else {
    throw new Error('SonicBoom supports only file descriptors and files')
  }
  if (this.minLength >= this.maxWrite) {
    throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`)
  }

  this.release = (err, n) => {
    if (err) {
      if ((err.code === 'EAGAIN' || err.code === 'EBUSY') && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
        if (this.sync) {
          // This error code should not happen in sync mode, because it is
          // not using the underlining operating system asynchronous functions.
          // However it happens, and so we handle it.
          // Ref: https://github.com/pinojs/pino/issues/783
          try {
            sleep$1(BUSY_WRITE_TIMEOUT);
            this.release(undefined, 0);
          } catch (err) {
            this.release(err);
          }
        } else {
          // Let's give the destination some time to process the chunk.
          setTimeout(fsWrite, BUSY_WRITE_TIMEOUT);
        }
      } else {
        this._writing = false;

        this.emit('error', err);
      }
      return
    }

    this.emit('write', n);
    const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
    this._len = releasedBufObj.len;
    this._writingBuf = releasedBufObj.writingBuf;

    if (this._writingBuf.length) {
      if (!this.sync) {
        fsWrite();
        return
      }

      try {
        do {
          const n = fsWriteSync();
          const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
          this._len = releasedBufObj.len;
          this._writingBuf = releasedBufObj.writingBuf;
        } while (this._writingBuf.length)
      } catch (err) {
        this.release(err);
        return
      }
    }

    if (this._fsync) {
      fs.fsyncSync(this.fd);
    }

    const len = this._len;
    if (this._reopening) {
      this._writing = false;
      this._reopening = false;
      this.reopen();
    } else if (len > this.minLength) {
      this._actualWrite();
    } else if (this._ending) {
      if (len > 0) {
        this._actualWrite();
      } else {
        this._writing = false;
        actualClose(this);
      }
    } else {
      this._writing = false;
      if (this.sync) {
        if (!this._asyncDrainScheduled) {
          this._asyncDrainScheduled = true;
          process.nextTick(emitDrain, this);
        }
      } else {
        this.emit('drain');
      }
    }
  };

  this.on('newListener', function (name) {
    if (name === 'drain') {
      this._asyncDrainScheduled = false;
    }
  });

  if (this._periodicFlush !== 0) {
    this._periodicFlushTimer = setInterval(() => this.flush(null), this._periodicFlush);
    this._periodicFlushTimer.unref();
  }
}

/**
 * Release the writingBuf after fs.write n bytes data
 * @param {string | Buffer} writingBuf - currently writing buffer, usually be instance._writingBuf.
 * @param {number} len - currently buffer length, usually be instance._len.
 * @param {number} n - number of bytes fs already written
 * @returns {{writingBuf: string | Buffer, len: number}} released writingBuf and length
 */
function releaseWritingBuf (writingBuf, len, n) {
  // if Buffer.byteLength is equal to n, that means writingBuf contains no multi-byte character
  if (typeof writingBuf === 'string' && Buffer.byteLength(writingBuf) !== n) {
    // Since the fs.write callback parameter `n` means how many bytes the passed of string
    // We calculate the original string length for avoiding the multi-byte character issue
    n = Buffer.from(writingBuf).subarray(0, n).toString().length;
  }
  len = Math.max(len - n, 0);
  writingBuf = writingBuf.slice(n);
  return { writingBuf, len }
}

function emitDrain (sonic) {
  const hasListeners = sonic.listenerCount('drain') > 0;
  if (!hasListeners) return
  sonic._asyncDrainScheduled = false;
  sonic.emit('drain');
}

inherits(SonicBoom$1, EventEmitter$2);

function mergeBuf (bufs, len) {
  if (bufs.length === 0) {
    return kEmptyBuffer
  }

  if (bufs.length === 1) {
    return bufs[0]
  }

  return Buffer.concat(bufs, len)
}

function write$2 (data) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  const len = this._len + data.length;
  const bufs = this._bufs;

  if (this.maxLength && len > this.maxLength) {
    this.emit('drop', data);
    return this._len < this._hwm
  }

  if (
    bufs.length === 0 ||
    bufs[bufs.length - 1].length + data.length > this.maxWrite
  ) {
    bufs.push('' + data);
  } else {
    bufs[bufs.length - 1] += data;
  }

  this._len = len;

  if (!this._writing && this._len >= this.minLength) {
    this._actualWrite();
  }

  return this._len < this._hwm
}

function writeBuffer (data) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  const len = this._len + data.length;
  const bufs = this._bufs;
  const lens = this._lens;

  if (this.maxLength && len > this.maxLength) {
    this.emit('drop', data);
    return this._len < this._hwm
  }

  if (
    bufs.length === 0 ||
    lens[lens.length - 1] + data.length > this.maxWrite
  ) {
    bufs.push([data]);
    lens.push(data.length);
  } else {
    bufs[bufs.length - 1].push(data);
    lens[lens.length - 1] += data.length;
  }

  this._len = len;

  if (!this._writing && this._len >= this.minLength) {
    this._actualWrite();
  }

  return this._len < this._hwm
}

function callFlushCallbackOnDrain (cb) {
  this._flushPending = true;
  const onDrain = () => {
    // only if _fsync is false to avoid double fsync
    if (!this._fsync) {
      try {
        fs.fsync(this.fd, (err) => {
          this._flushPending = false;
          cb(err);
        });
      } catch (err) {
        cb(err);
      }
    } else {
      this._flushPending = false;
      cb();
    }
    this.off('error', onError);
  };
  const onError = (err) => {
    this._flushPending = false;
    cb(err);
    this.off('drain', onDrain);
  };

  this.once('drain', onDrain);
  this.once('error', onError);
}

function flush$2 (cb) {
  if (cb != null && typeof cb !== 'function') {
    throw new Error('flush cb must be a function')
  }

  if (this.destroyed) {
    const error = new Error('SonicBoom destroyed');
    if (cb) {
      cb(error);
      return
    }

    throw error
  }

  if (this.minLength <= 0) {
    cb?.();
    return
  }

  if (cb) {
    callFlushCallbackOnDrain.call(this, cb);
  }

  if (this._writing) {
    return
  }

  if (this._bufs.length === 0) {
    this._bufs.push('');
  }

  this._actualWrite();
}

function flushBuffer (cb) {
  if (cb != null && typeof cb !== 'function') {
    throw new Error('flush cb must be a function')
  }

  if (this.destroyed) {
    const error = new Error('SonicBoom destroyed');
    if (cb) {
      cb(error);
      return
    }

    throw error
  }

  if (this.minLength <= 0) {
    cb?.();
    return
  }

  if (cb) {
    callFlushCallbackOnDrain.call(this, cb);
  }

  if (this._writing) {
    return
  }

  if (this._bufs.length === 0) {
    this._bufs.push([]);
    this._lens.push(0);
  }

  this._actualWrite();
}

SonicBoom$1.prototype.reopen = function (file) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._opening) {
    this.once('ready', () => {
      this.reopen(file);
    });
    return
  }

  if (this._ending) {
    return
  }

  if (!this.file) {
    throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom')
  }

  if (file) {
    this.file = file;
  }
  this._reopening = true;

  if (this._writing) {
    return
  }

  const fd = this.fd;
  this.once('ready', () => {
    if (fd !== this.fd) {
      fs.close(fd, (err) => {
        if (err) {
          return this.emit('error', err)
        }
      });
    }
  });

  openFile(this.file, this);
};

SonicBoom$1.prototype.end = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._opening) {
    this.once('ready', () => {
      this.end();
    });
    return
  }

  if (this._ending) {
    return
  }

  this._ending = true;

  if (this._writing) {
    return
  }

  if (this._len > 0 && this.fd >= 0) {
    this._actualWrite();
  } else {
    actualClose(this);
  }
};

function flushSync$1 () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this.fd < 0) {
    throw new Error('sonic boom is not ready yet')
  }

  if (!this._writing && this._writingBuf.length > 0) {
    this._bufs.unshift(this._writingBuf);
    this._writingBuf = '';
  }

  let buf = '';
  while (this._bufs.length || buf) {
    if (buf.length <= 0) {
      buf = this._bufs[0];
    }
    try {
      const n = fs.writeSync(this.fd, buf, 'utf8');
      const releasedBufObj = releaseWritingBuf(buf, this._len, n);
      buf = releasedBufObj.writingBuf;
      this._len = releasedBufObj.len;
      if (buf.length <= 0) {
        this._bufs.shift();
      }
    } catch (err) {
      const shouldRetry = err.code === 'EAGAIN' || err.code === 'EBUSY';
      if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
        throw err
      }

      sleep$1(BUSY_WRITE_TIMEOUT);
    }
  }

  try {
    fs.fsyncSync(this.fd);
  } catch {
    // Skip the error. The fd might not support fsync.
  }
}

function flushBufferSync () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this.fd < 0) {
    throw new Error('sonic boom is not ready yet')
  }

  if (!this._writing && this._writingBuf.length > 0) {
    this._bufs.unshift([this._writingBuf]);
    this._writingBuf = kEmptyBuffer;
  }

  let buf = kEmptyBuffer;
  while (this._bufs.length || buf.length) {
    if (buf.length <= 0) {
      buf = mergeBuf(this._bufs[0], this._lens[0]);
    }
    try {
      const n = fs.writeSync(this.fd, buf);
      buf = buf.subarray(n);
      this._len = Math.max(this._len - n, 0);
      if (buf.length <= 0) {
        this._bufs.shift();
        this._lens.shift();
      }
    } catch (err) {
      const shouldRetry = err.code === 'EAGAIN' || err.code === 'EBUSY';
      if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
        throw err
      }

      sleep$1(BUSY_WRITE_TIMEOUT);
    }
  }
}

SonicBoom$1.prototype.destroy = function () {
  if (this.destroyed) {
    return
  }
  actualClose(this);
};

function actualWrite () {
  const release = this.release;
  this._writing = true;
  this._writingBuf = this._writingBuf || this._bufs.shift() || '';

  if (this.sync) {
    try {
      const written = fs.writeSync(this.fd, this._writingBuf, 'utf8');
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    fs.write(this.fd, this._writingBuf, 'utf8', release);
  }
}

function actualWriteBuffer () {
  const release = this.release;
  this._writing = true;
  this._writingBuf = this._writingBuf.length ? this._writingBuf : mergeBuf(this._bufs.shift(), this._lens.shift());

  if (this.sync) {
    try {
      const written = fs.writeSync(this.fd, this._writingBuf);
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    // fs.write will need to copy string to buffer anyway so
    // we do it here to avoid the overhead of calculating the buffer size
    // in releaseWritingBuf.
    if (kCopyBuffer) {
      this._writingBuf = Buffer.from(this._writingBuf);
    }
    fs.write(this.fd, this._writingBuf, release);
  }
}

function actualClose (sonic) {
  if (sonic.fd === -1) {
    sonic.once('ready', actualClose.bind(null, sonic));
    return
  }

  if (sonic._periodicFlushTimer !== undefined) {
    clearInterval(sonic._periodicFlushTimer);
  }

  sonic.destroyed = true;
  sonic._bufs = [];
  sonic._lens = [];

  assert$1(typeof sonic.fd === 'number', `sonic.fd must be a number, got ${typeof sonic.fd}`);
  try {
    fs.fsync(sonic.fd, closeWrapped);
  } catch {
  }

  function closeWrapped () {
    // We skip errors in fsync

    if (sonic.fd !== 1 && sonic.fd !== 2) {
      fs.close(sonic.fd, done);
    } else {
      done();
    }
  }

  function done (err) {
    if (err) {
      sonic.emit('error', err);
      return
    }

    if (sonic._ending && !sonic._writing) {
      sonic.emit('finish');
    }
    sonic.emit('close');
  }
}

/**
 * These export configurations enable JS and TS developers
 * to consumer SonicBoom in whatever way best suits their needs.
 * Some examples of supported import syntax includes:
 * - `const SonicBoom = require('SonicBoom')`
 * - `const { SonicBoom } = require('SonicBoom')`
 * - `import * as SonicBoom from 'SonicBoom'`
 * - `import { SonicBoom } from 'SonicBoom'`
 * - `import SonicBoom from 'SonicBoom'`
 */
SonicBoom$1.SonicBoom = SonicBoom$1;
SonicBoom$1.default = SonicBoom$1;
var sonicBoom = SonicBoom$1;

const refs = {
  exit: [],
  beforeExit: []
};
const functions = {
  exit: onExit$2,
  beforeExit: onBeforeExit
};

let registry$1;

function ensureRegistry () {
  if (registry$1 === undefined) {
    registry$1 = new FinalizationRegistry(clear);
  }
}

function install (event) {
  if (refs[event].length > 0) {
    return
  }

  process.on(event, functions[event]);
}

function uninstall (event) {
  if (refs[event].length > 0) {
    return
  }
  process.removeListener(event, functions[event]);
  if (refs.exit.length === 0 && refs.beforeExit.length === 0) {
    registry$1 = undefined;
  }
}

function onExit$2 () {
  callRefs('exit');
}

function onBeforeExit () {
  callRefs('beforeExit');
}

function callRefs (event) {
  for (const ref of refs[event]) {
    const obj = ref.deref();
    const fn = ref.fn;

    // This should always happen, however GC is
    // undeterministic so it might not happen.
    /* istanbul ignore else */
    if (obj !== undefined) {
      fn(obj, event);
    }
  }
  refs[event] = [];
}

function clear (ref) {
  for (const event of ['exit', 'beforeExit']) {
    const index = refs[event].indexOf(ref);
    refs[event].splice(index, index + 1);
    uninstall(event);
  }
}

function _register (event, obj, fn) {
  if (obj === undefined) {
    throw new Error('the object can\'t be undefined')
  }
  install(event);
  const ref = new WeakRef(obj);
  ref.fn = fn;

  ensureRegistry();
  registry$1.register(obj, ref);
  refs[event].push(ref);
}

function register (obj, fn) {
  _register('exit', obj, fn);
}

function registerBeforeExit (obj, fn) {
  _register('beforeExit', obj, fn);
}

function unregister (obj) {
  if (registry$1 === undefined) {
    return
  }
  registry$1.unregister(obj);
  for (const event of ['exit', 'beforeExit']) {
    refs[event] = refs[event].filter((ref) => {
      const _obj = ref.deref();
      return _obj && _obj !== obj
    });
    uninstall(event);
  }
}

var onExitLeakFree = {
  register,
  registerBeforeExit,
  unregister
};

var version$3 = "3.1.0";
var require$$0 = {
	version: version$3};

const MAX_TIMEOUT = 1000;

function wait$1 (state, index, expected, timeout, done) {
  const max = Date.now() + timeout;
  let current = Atomics.load(state, index);
  if (current === expected) {
    done(null, 'ok');
    return
  }
  let prior = current;
  const check = (backoff) => {
    if (Date.now() > max) {
      done(null, 'timed-out');
    } else {
      setTimeout(() => {
        prior = current;
        current = Atomics.load(state, index);
        if (current === prior) {
          check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
        } else {
          if (current === expected) done(null, 'ok');
          else done(null, 'not-equal');
        }
      }, backoff);
    }
  };
  check(1);
}

var wait_1 = { wait: wait$1};

const WRITE_INDEX$1 = 4;
const READ_INDEX$1 = 8;

var indexes = {
  WRITE_INDEX: WRITE_INDEX$1,
  READ_INDEX: READ_INDEX$1
};

const { version: version$2 } = require$$0;
const { EventEmitter: EventEmitter$1 } = require$$1;
const { Worker } = require$$2$1;
const { join: join$1 } = require$$3;
const { pathToFileURL } = require$$4;
const { wait } = wait_1;
const {
  WRITE_INDEX,
  READ_INDEX
} = indexes;
const buffer = require$$7;
const assert = require$$5;

const kImpl = Symbol('kImpl');

// V8 limit for string size
const MAX_STRING = buffer.constants.MAX_STRING_LENGTH;

class FakeWeakRef {
  constructor (value) {
    this._value = value;
  }

  deref () {
    return this._value
  }
}

class FakeFinalizationRegistry {
  register () {}

  unregister () {}
}

// Currently using FinalizationRegistry with code coverage breaks the world
// Ref: https://github.com/nodejs/node/issues/49344
const FinalizationRegistry$1 = process.env.NODE_V8_COVERAGE ? FakeFinalizationRegistry : commonjsGlobal.FinalizationRegistry || FakeFinalizationRegistry;
const WeakRef$1 = process.env.NODE_V8_COVERAGE ? FakeWeakRef : commonjsGlobal.WeakRef || FakeWeakRef;

const registry = new FinalizationRegistry$1((worker) => {
  if (worker.exited) {
    return
  }
  worker.terminate();
});

function createWorker (stream, opts) {
  const { filename, workerData } = opts;

  const bundlerOverrides = '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {};
  const toExecute = bundlerOverrides['thread-stream-worker'] || join$1(__dirname, 'lib', 'worker.js');

  const worker = new Worker(toExecute, {
    ...opts.workerOpts,
    trackUnmanagedFds: false,
    workerData: {
      filename: filename.indexOf('file://') === 0
        ? filename
        : pathToFileURL(filename).href,
      dataBuf: stream[kImpl].dataBuf,
      stateBuf: stream[kImpl].stateBuf,
      workerData: {
        $context: {
          threadStreamVersion: version$2
        },
        ...workerData
      }
    }
  });

  // We keep a strong reference for now,
  // we need to start writing first
  worker.stream = new FakeWeakRef(stream);

  worker.on('message', onWorkerMessage);
  worker.on('exit', onWorkerExit);
  registry.register(stream, worker);

  return worker
}

function drain (stream) {
  assert(!stream[kImpl].sync);
  if (stream[kImpl].needDrain) {
    stream[kImpl].needDrain = false;
    stream.emit('drain');
  }
}

function nextFlush (stream) {
  const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
  let leftover = stream[kImpl].data.length - writeIndex;

  if (leftover > 0) {
    if (stream[kImpl].buf.length === 0) {
      stream[kImpl].flushing = false;

      if (stream[kImpl].ending) {
        end(stream);
      } else if (stream[kImpl].needDrain) {
        process.nextTick(drain, stream);
      }

      return
    }

    let toWrite = stream[kImpl].buf.slice(0, leftover);
    let toWriteBytes = Buffer.byteLength(toWrite);
    if (toWriteBytes <= leftover) {
      stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
      // process._rawDebug('writing ' + toWrite.length)
      write$1(stream, toWrite, nextFlush.bind(null, stream));
    } else {
      // multi-byte utf-8
      stream.flush(() => {
        // err is already handled in flush()
        if (stream.destroyed) {
          return
        }

        Atomics.store(stream[kImpl].state, READ_INDEX, 0);
        Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);

        // Find a toWrite length that fits the buffer
        // it must exists as the buffer is at least 4 bytes length
        // and the max utf-8 length for a char is 4 bytes.
        while (toWriteBytes > stream[kImpl].data.length) {
          leftover = leftover / 2;
          toWrite = stream[kImpl].buf.slice(0, leftover);
          toWriteBytes = Buffer.byteLength(toWrite);
        }
        stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
        write$1(stream, toWrite, nextFlush.bind(null, stream));
      });
    }
  } else if (leftover === 0) {
    if (writeIndex === 0 && stream[kImpl].buf.length === 0) {
      // we had a flushSync in the meanwhile
      return
    }
    stream.flush(() => {
      Atomics.store(stream[kImpl].state, READ_INDEX, 0);
      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
      nextFlush(stream);
    });
  } else {
    // This should never happen
    destroy(stream, new Error('overwritten'));
  }
}

function onWorkerMessage (msg) {
  const stream = this.stream.deref();
  if (stream === undefined) {
    this.exited = true;
    // Terminate the worker.
    this.terminate();
    return
  }

  switch (msg.code) {
    case 'READY':
      // Replace the FakeWeakRef with a
      // proper one.
      this.stream = new WeakRef$1(stream);

      stream.flush(() => {
        stream[kImpl].ready = true;
        stream.emit('ready');
      });
      break
    case 'ERROR':
      destroy(stream, msg.err);
      break
    case 'EVENT':
      if (Array.isArray(msg.args)) {
        stream.emit(msg.name, ...msg.args);
      } else {
        stream.emit(msg.name, msg.args);
      }
      break
    case 'WARNING':
      process.emitWarning(msg.err);
      break
    default:
      destroy(stream, new Error('this should not happen: ' + msg.code));
  }
}

function onWorkerExit (code) {
  const stream = this.stream.deref();
  if (stream === undefined) {
    // Nothing to do, the worker already exit
    return
  }
  registry.unregister(stream);
  stream.worker.exited = true;
  stream.worker.off('exit', onWorkerExit);
  destroy(stream, code !== 0 ? new Error('the worker thread exited') : null);
}

let ThreadStream$1 = class ThreadStream extends EventEmitter$1 {
  constructor (opts = {}) {
    super();

    if (opts.bufferSize < 4) {
      throw new Error('bufferSize must at least fit a 4-byte utf-8 char')
    }

    this[kImpl] = {};
    this[kImpl].stateBuf = new SharedArrayBuffer(128);
    this[kImpl].state = new Int32Array(this[kImpl].stateBuf);
    this[kImpl].dataBuf = new SharedArrayBuffer(opts.bufferSize || 4 * 1024 * 1024);
    this[kImpl].data = Buffer.from(this[kImpl].dataBuf);
    this[kImpl].sync = opts.sync || false;
    this[kImpl].ending = false;
    this[kImpl].ended = false;
    this[kImpl].needDrain = false;
    this[kImpl].destroyed = false;
    this[kImpl].flushing = false;
    this[kImpl].ready = false;
    this[kImpl].finished = false;
    this[kImpl].errored = null;
    this[kImpl].closed = false;
    this[kImpl].buf = '';

    // TODO (fix): Make private?
    this.worker = createWorker(this, opts); // TODO (fix): make private
    this.on('message', (message, transferList) => {
      this.worker.postMessage(message, transferList);
    });
  }

  write (data) {
    if (this[kImpl].destroyed) {
      error(this, new Error('the worker has exited'));
      return false
    }

    if (this[kImpl].ending) {
      error(this, new Error('the worker is ending'));
      return false
    }

    if (this[kImpl].flushing && this[kImpl].buf.length + data.length >= MAX_STRING) {
      try {
        writeSync(this);
        this[kImpl].flushing = true;
      } catch (err) {
        destroy(this, err);
        return false
      }
    }

    this[kImpl].buf += data;

    if (this[kImpl].sync) {
      try {
        writeSync(this);
        return true
      } catch (err) {
        destroy(this, err);
        return false
      }
    }

    if (!this[kImpl].flushing) {
      this[kImpl].flushing = true;
      setImmediate(nextFlush, this);
    }

    this[kImpl].needDrain = this[kImpl].data.length - this[kImpl].buf.length - Atomics.load(this[kImpl].state, WRITE_INDEX) <= 0;
    return !this[kImpl].needDrain
  }

  end () {
    if (this[kImpl].destroyed) {
      return
    }

    this[kImpl].ending = true;
    end(this);
  }

  flush (cb) {
    if (this[kImpl].destroyed) {
      if (typeof cb === 'function') {
        process.nextTick(cb, new Error('the worker has exited'));
      }
      return
    }

    // TODO write all .buf
    const writeIndex = Atomics.load(this[kImpl].state, WRITE_INDEX);
    // process._rawDebug(`(flush) readIndex (${Atomics.load(this.state, READ_INDEX)}) writeIndex (${Atomics.load(this.state, WRITE_INDEX)})`)
    wait(this[kImpl].state, READ_INDEX, writeIndex, Infinity, (err, res) => {
      if (err) {
        destroy(this, err);
        process.nextTick(cb, err);
        return
      }
      if (res === 'not-equal') {
        // TODO handle deadlock
        this.flush(cb);
        return
      }
      process.nextTick(cb);
    });
  }

  flushSync () {
    if (this[kImpl].destroyed) {
      return
    }

    writeSync(this);
    flushSync(this);
  }

  unref () {
    this.worker.unref();
  }

  ref () {
    this.worker.ref();
  }

  get ready () {
    return this[kImpl].ready
  }

  get destroyed () {
    return this[kImpl].destroyed
  }

  get closed () {
    return this[kImpl].closed
  }

  get writable () {
    return !this[kImpl].destroyed && !this[kImpl].ending
  }

  get writableEnded () {
    return this[kImpl].ending
  }

  get writableFinished () {
    return this[kImpl].finished
  }

  get writableNeedDrain () {
    return this[kImpl].needDrain
  }

  get writableObjectMode () {
    return false
  }

  get writableErrored () {
    return this[kImpl].errored
  }
};

function error (stream, err) {
  setImmediate(() => {
    stream.emit('error', err);
  });
}

function destroy (stream, err) {
  if (stream[kImpl].destroyed) {
    return
  }
  stream[kImpl].destroyed = true;

  if (err) {
    stream[kImpl].errored = err;
    error(stream, err);
  }

  if (!stream.worker.exited) {
    stream.worker.terminate()
      .catch(() => {})
      .then(() => {
        stream[kImpl].closed = true;
        stream.emit('close');
      });
  } else {
    setImmediate(() => {
      stream[kImpl].closed = true;
      stream.emit('close');
    });
  }
}

function write$1 (stream, data, cb) {
  // data is smaller than the shared buffer length
  const current = Atomics.load(stream[kImpl].state, WRITE_INDEX);
  const length = Buffer.byteLength(data);
  stream[kImpl].data.write(data, current);
  Atomics.store(stream[kImpl].state, WRITE_INDEX, current + length);
  Atomics.notify(stream[kImpl].state, WRITE_INDEX);
  cb();
  return true
}

function end (stream) {
  if (stream[kImpl].ended || !stream[kImpl].ending || stream[kImpl].flushing) {
    return
  }
  stream[kImpl].ended = true;

  try {
    stream.flushSync();

    let readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);

    // process._rawDebug('writing index')
    Atomics.store(stream[kImpl].state, WRITE_INDEX, -1);
    // process._rawDebug(`(end) readIndex (${Atomics.load(stream.state, READ_INDEX)}) writeIndex (${Atomics.load(stream.state, WRITE_INDEX)})`)
    Atomics.notify(stream[kImpl].state, WRITE_INDEX);

    // Wait for the process to complete
    let spins = 0;
    while (readIndex !== -1) {
      // process._rawDebug(`read = ${read}`)
      Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1000);
      readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);

      if (readIndex === -2) {
        destroy(stream, new Error('end() failed'));
        return
      }

      if (++spins === 10) {
        destroy(stream, new Error('end() took too long (10s)'));
        return
      }
    }

    process.nextTick(() => {
      stream[kImpl].finished = true;
      stream.emit('finish');
    });
  } catch (err) {
    destroy(stream, err);
  }
  // process._rawDebug('end finished...')
}

function writeSync (stream) {
  const cb = () => {
    if (stream[kImpl].ending) {
      end(stream);
    } else if (stream[kImpl].needDrain) {
      process.nextTick(drain, stream);
    }
  };
  stream[kImpl].flushing = false;

  while (stream[kImpl].buf.length !== 0) {
    const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
    let leftover = stream[kImpl].data.length - writeIndex;
    if (leftover === 0) {
      flushSync(stream);
      Atomics.store(stream[kImpl].state, READ_INDEX, 0);
      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
      continue
    } else if (leftover < 0) {
      // stream should never happen
      throw new Error('overwritten')
    }

    let toWrite = stream[kImpl].buf.slice(0, leftover);
    let toWriteBytes = Buffer.byteLength(toWrite);
    if (toWriteBytes <= leftover) {
      stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
      // process._rawDebug('writing ' + toWrite.length)
      write$1(stream, toWrite, cb);
    } else {
      // multi-byte utf-8
      flushSync(stream);
      Atomics.store(stream[kImpl].state, READ_INDEX, 0);
      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);

      // Find a toWrite length that fits the buffer
      // it must exists as the buffer is at least 4 bytes length
      // and the max utf-8 length for a char is 4 bytes.
      while (toWriteBytes > stream[kImpl].buf.length) {
        leftover = leftover / 2;
        toWrite = stream[kImpl].buf.slice(0, leftover);
        toWriteBytes = Buffer.byteLength(toWrite);
      }
      stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
      write$1(stream, toWrite, cb);
    }
  }
}

function flushSync (stream) {
  if (stream[kImpl].flushing) {
    throw new Error('unable to flush while flushing')
  }

  // process._rawDebug('flushSync started')

  const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);

  let spins = 0;

  // TODO handle deadlock
  while (true) {
    const readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);

    if (readIndex === -2) {
      throw Error('_flushSync failed')
    }

    // process._rawDebug(`(flushSync) readIndex (${readIndex}) writeIndex (${writeIndex})`)
    if (readIndex !== writeIndex) {
      // TODO stream timeouts for some reason.
      Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1000);
    } else {
      break
    }

    if (++spins === 10) {
      throw new Error('_flushSync took too long (10s)')
    }
  }
  // process._rawDebug('flushSync finished')
}

var threadStream = ThreadStream$1;

const { createRequire } = require$$0$2;
const getCallers = caller$1;
const { join, isAbsolute, sep } = require$$2$2;
const sleep = atomicSleepExports;
const onExit$1 = onExitLeakFree;
const ThreadStream = threadStream;

function setupOnExit (stream) {
  // This is leak free, it does not leave event handlers
  onExit$1.register(stream, autoEnd$1);
  onExit$1.registerBeforeExit(stream, flush$1);

  stream.on('close', function () {
    onExit$1.unregister(stream);
  });
}

function buildStream (filename, workerData, workerOpts, sync) {
  const stream = new ThreadStream({
    filename,
    workerData,
    workerOpts,
    sync
  });

  stream.on('ready', onReady);
  stream.on('close', function () {
    process.removeListener('exit', onExit);
  });

  process.on('exit', onExit);

  function onReady () {
    process.removeListener('exit', onExit);
    stream.unref();

    if (workerOpts.autoEnd !== false) {
      setupOnExit(stream);
    }
  }

  function onExit () {
    /* istanbul ignore next */
    if (stream.closed) {
      return
    }
    stream.flushSync();
    // Apparently there is a very sporadic race condition
    // that in certain OS would prevent the messages to be flushed
    // because the thread might not have been created still.
    // Unfortunately we need to sleep(100) in this case.
    sleep(100);
    stream.end();
  }

  return stream
}

function autoEnd$1 (stream) {
  stream.ref();
  stream.flushSync();
  stream.end();
  stream.once('close', function () {
    stream.unref();
  });
}

function flush$1 (stream) {
  stream.flushSync();
}

function transport$1 (fullOptions) {
  const { pipeline, targets, levels, dedupe, worker = {}, caller = getCallers(), sync = false } = fullOptions;

  const options = {
    ...fullOptions.options
  };

  // Backwards compatibility
  const callers = typeof caller === 'string' ? [caller] : caller;

  // This will be eventually modified by bundlers
  const bundlerOverrides = '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {};

  let target = fullOptions.target;

  if (target && targets) {
    throw new Error('only one of target or targets can be specified')
  }

  if (targets) {
    target = bundlerOverrides['pino-worker'] || join(__dirname, 'worker.js');
    options.targets = targets.filter(dest => dest.target).map((dest) => {
      return {
        ...dest,
        target: fixTarget(dest.target)
      }
    });
    options.pipelines = targets.filter(dest => dest.pipeline).map((dest) => {
      return dest.pipeline.map((t) => {
        return {
          ...t,
          level: dest.level, // duplicate the pipeline `level` property defined in the upper level
          target: fixTarget(t.target)
        }
      })
    });
  } else if (pipeline) {
    target = bundlerOverrides['pino-worker'] || join(__dirname, 'worker.js');
    options.pipelines = [pipeline.map((dest) => {
      return {
        ...dest,
        target: fixTarget(dest.target)
      }
    })];
  }

  if (levels) {
    options.levels = levels;
  }

  if (dedupe) {
    options.dedupe = dedupe;
  }

  options.pinoWillSendConfig = true;

  return buildStream(fixTarget(target), options, worker, sync)

  function fixTarget (origin) {
    origin = bundlerOverrides[origin] || origin;

    if (isAbsolute(origin) || origin.indexOf('file://') === 0) {
      return origin
    }

    if (origin === 'pino/file') {
      return join(__dirname, '..', 'file.js')
    }

    let fixTarget;

    for (const filePath of callers) {
      try {
        const context = filePath === 'node:repl'
          ? process.cwd() + sep
          : filePath;

        fixTarget = createRequire(context).resolve(origin);
        break
      } catch (err) {
        // Silent catch
        continue
      }
    }

    if (!fixTarget) {
      throw new Error(`unable to determine transport target for "${origin}"`)
    }

    return fixTarget
  }
}

var transport_1 = transport$1;

/* eslint no-prototype-builtins: 0 */

const format = quickFormatUnescaped;
const { mapHttpRequest, mapHttpResponse } = pinoStdSerializers;
const SonicBoom = sonicBoom;
const onExit = onExitLeakFree;
const {
  lsCacheSym: lsCacheSym$2,
  chindingsSym: chindingsSym$2,
  writeSym: writeSym$1,
  serializersSym: serializersSym$2,
  formatOptsSym: formatOptsSym$2,
  endSym: endSym$1,
  stringifiersSym: stringifiersSym$2,
  stringifySym: stringifySym$2,
  stringifySafeSym: stringifySafeSym$1,
  wildcardFirstSym,
  nestedKeySym: nestedKeySym$1,
  formattersSym: formattersSym$3,
  messageKeySym: messageKeySym$2,
  errorKeySym: errorKeySym$2,
  nestedKeyStrSym: nestedKeyStrSym$1,
  msgPrefixSym: msgPrefixSym$2
} = symbols$1;
const { isMainThread } = require$$2$1;
const transport = transport_1;

function noop$3 () {
}

function genLog$1 (level, hook) {
  if (!hook) return LOG

  return function hookWrappedLog (...args) {
    hook.call(this, args, LOG, level);
  }

  function LOG (o, ...n) {
    if (typeof o === 'object') {
      let msg = o;
      if (o !== null) {
        if (o.method && o.headers && o.socket) {
          o = mapHttpRequest(o);
        } else if (typeof o.setHeader === 'function') {
          o = mapHttpResponse(o);
        }
      }
      let formatParams;
      if (msg === null && n.length === 0) {
        formatParams = [null];
      } else {
        msg = n.shift();
        formatParams = n;
      }
      // We do not use a coercive check for `msg` as it is
      // measurably slower than the explicit checks.
      if (typeof this[msgPrefixSym$2] === 'string' && msg !== undefined && msg !== null) {
        msg = this[msgPrefixSym$2] + msg;
      }
      this[writeSym$1](o, format(msg, formatParams, this[formatOptsSym$2]), level);
    } else {
      let msg = o === undefined ? n.shift() : o;

      // We do not use a coercive check for `msg` as it is
      // measurably slower than the explicit checks.
      if (typeof this[msgPrefixSym$2] === 'string' && msg !== undefined && msg !== null) {
        msg = this[msgPrefixSym$2] + msg;
      }
      this[writeSym$1](null, format(msg, n, this[formatOptsSym$2]), level);
    }
  }
}

// magically escape strings for json
// relying on their charCodeAt
// everything below 32 needs JSON.stringify()
// 34 and 92 happens all the time, so we
// have a fast case for them
function asString (str) {
  let result = '';
  let last = 0;
  let found = false;
  let point = 255;
  const l = str.length;
  if (l > 100) {
    return JSON.stringify(str)
  }
  for (var i = 0; i < l && point >= 32; i++) {
    point = str.charCodeAt(i);
    if (point === 34 || point === 92) {
      result += str.slice(last, i) + '\\';
      last = i;
      found = true;
    }
  }
  if (!found) {
    result = str;
  } else {
    result += str.slice(last);
  }
  return point < 32 ? JSON.stringify(str) : '"' + result + '"'
}

function asJson$1 (obj, msg, num, time) {
  const stringify = this[stringifySym$2];
  const stringifySafe = this[stringifySafeSym$1];
  const stringifiers = this[stringifiersSym$2];
  const end = this[endSym$1];
  const chindings = this[chindingsSym$2];
  const serializers = this[serializersSym$2];
  const formatters = this[formattersSym$3];
  const messageKey = this[messageKeySym$2];
  const errorKey = this[errorKeySym$2];
  let data = this[lsCacheSym$2][num] + time;

  // we need the child bindings added to the output first so instance logged
  // objects can take precedence when JSON.parse-ing the resulting log line
  data = data + chindings;

  let value;
  if (formatters.log) {
    obj = formatters.log(obj);
  }
  const wildcardStringifier = stringifiers[wildcardFirstSym];
  let propStr = '';
  for (const key in obj) {
    value = obj[key];
    if (Object.prototype.hasOwnProperty.call(obj, key) && value !== undefined) {
      if (serializers[key]) {
        value = serializers[key](value);
      } else if (key === errorKey && serializers.err) {
        value = serializers.err(value);
      }

      const stringifier = stringifiers[key] || wildcardStringifier;

      switch (typeof value) {
        case 'undefined':
        case 'function':
          continue
        case 'number':
          /* eslint no-fallthrough: "off" */
          if (Number.isFinite(value) === false) {
            value = null;
          }
        // this case explicitly falls through to the next one
        case 'boolean':
          if (stringifier) value = stringifier(value);
          break
        case 'string':
          value = (stringifier || asString)(value);
          break
        default:
          value = (stringifier || stringify)(value, stringifySafe);
      }
      if (value === undefined) continue
      const strKey = asString(key);
      propStr += ',' + strKey + ':' + value;
    }
  }

  let msgStr = '';
  if (msg !== undefined) {
    value = serializers[messageKey] ? serializers[messageKey](msg) : msg;
    const stringifier = stringifiers[messageKey] || wildcardStringifier;

    switch (typeof value) {
      case 'function':
        break
      case 'number':
        /* eslint no-fallthrough: "off" */
        if (Number.isFinite(value) === false) {
          value = null;
        }
      // this case explicitly falls through to the next one
      case 'boolean':
        if (stringifier) value = stringifier(value);
        msgStr = ',"' + messageKey + '":' + value;
        break
      case 'string':
        value = (stringifier || asString)(value);
        msgStr = ',"' + messageKey + '":' + value;
        break
      default:
        value = (stringifier || stringify)(value, stringifySafe);
        msgStr = ',"' + messageKey + '":' + value;
    }
  }

  if (this[nestedKeySym$1] && propStr) {
    // place all the obj properties under the specified key
    // the nested key is already formatted from the constructor
    return data + this[nestedKeyStrSym$1] + propStr.slice(1) + '}' + msgStr + end
  } else {
    return data + propStr + msgStr + end
  }
}

function asChindings$2 (instance, bindings) {
  let value;
  let data = instance[chindingsSym$2];
  const stringify = instance[stringifySym$2];
  const stringifySafe = instance[stringifySafeSym$1];
  const stringifiers = instance[stringifiersSym$2];
  const wildcardStringifier = stringifiers[wildcardFirstSym];
  const serializers = instance[serializersSym$2];
  const formatter = instance[formattersSym$3].bindings;
  bindings = formatter(bindings);

  for (const key in bindings) {
    value = bindings[key];
    const valid = key !== 'level' &&
      key !== 'serializers' &&
      key !== 'formatters' &&
      key !== 'customLevels' &&
      bindings.hasOwnProperty(key) &&
      value !== undefined;
    if (valid === true) {
      value = serializers[key] ? serializers[key](value) : value;
      value = (stringifiers[key] || wildcardStringifier || stringify)(value, stringifySafe);
      if (value === undefined) continue
      data += ',"' + key + '":' + value;
    }
  }
  return data
}

function hasBeenTampered (stream) {
  return stream.write !== stream.constructor.prototype.write
}

const hasNodeCodeCoverage = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;

function buildSafeSonicBoom$1 (opts) {
  const stream = new SonicBoom(opts);
  stream.on('error', filterBrokenPipe);
  // If we are sync: false, we must flush on exit
  // We must disable this if there is node code coverage due to
  // https://github.com/nodejs/node/issues/49344#issuecomment-1741776308.
  if (!hasNodeCodeCoverage && !opts.sync && isMainThread) {
    onExit.register(stream, autoEnd);

    stream.on('close', function () {
      onExit.unregister(stream);
    });
  }
  return stream

  function filterBrokenPipe (err) {
    // Impossible to replicate across all operating systems
    /* istanbul ignore next */
    if (err.code === 'EPIPE') {
      // If we get EPIPE, we should stop logging here
      // however we have no control to the consumer of
      // SonicBoom, so we just overwrite the write method
      stream.write = noop$3;
      stream.end = noop$3;
      stream.flushSync = noop$3;
      stream.destroy = noop$3;
      return
    }
    stream.removeListener('error', filterBrokenPipe);
    stream.emit('error', err);
  }
}

function autoEnd (stream, eventName) {
  // This check is needed only on some platforms
  /* istanbul ignore next */
  if (stream.destroyed) {
    return
  }

  if (eventName === 'beforeExit') {
    // We still have an event loop, let's use it
    stream.flush();
    stream.on('drain', function () {
      stream.end();
    });
  } else {
    // For some reason istanbul is not detecting this, but it's there
    /* istanbul ignore next */
    // We do not have an event loop, so flush synchronously
    stream.flushSync();
  }
}

function createArgsNormalizer$1 (defaultOptions) {
  return function normalizeArgs (instance, caller, opts = {}, stream) {
    // support stream as a string
    if (typeof opts === 'string') {
      stream = buildSafeSonicBoom$1({ dest: opts });
      opts = {};
    } else if (typeof stream === 'string') {
      if (opts && opts.transport) {
        throw Error('only one of option.transport or stream can be specified')
      }
      stream = buildSafeSonicBoom$1({ dest: stream });
    } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
      stream = opts;
      opts = {};
    } else if (opts.transport) {
      if (opts.transport instanceof SonicBoom || opts.transport.writable || opts.transport._writableState) {
        throw Error('option.transport do not allow stream, please pass to option directly. e.g. pino(transport)')
      }
      if (opts.transport.targets && opts.transport.targets.length && opts.formatters && typeof opts.formatters.level === 'function') {
        throw Error('option.transport.targets do not allow custom level formatters')
      }

      let customLevels;
      if (opts.customLevels) {
        customLevels = opts.useOnlyCustomLevels ? opts.customLevels : Object.assign({}, opts.levels, opts.customLevels);
      }
      stream = transport({ caller, ...opts.transport, levels: customLevels });
    }
    opts = Object.assign({}, defaultOptions, opts);
    opts.serializers = Object.assign({}, defaultOptions.serializers, opts.serializers);
    opts.formatters = Object.assign({}, defaultOptions.formatters, opts.formatters);

    if (opts.prettyPrint) {
      throw new Error('prettyPrint option is no longer supported, see the pino-pretty package (https://github.com/pinojs/pino-pretty)')
    }

    const { enabled, onChild } = opts;
    if (enabled === false) opts.level = 'silent';
    if (!onChild) opts.onChild = noop$3;
    if (!stream) {
      if (!hasBeenTampered(process.stdout)) {
        // If process.stdout.fd is undefined, it means that we are running
        // in a worker thread. Let's assume we are logging to file descriptor 1.
        stream = buildSafeSonicBoom$1({ fd: process.stdout.fd || 1 });
      } else {
        stream = process.stdout;
      }
    }
    return { opts, stream }
  }
}

function stringify$2 (obj, stringifySafeFn) {
  try {
    return JSON.stringify(obj)
  } catch (_) {
    try {
      const stringify = stringifySafeFn || this[stringifySafeSym$1];
      return stringify(obj)
    } catch (_) {
      return '"[unable to serialize, circular reference is too complex to analyze]"'
    }
  }
}

function buildFormatters$2 (level, bindings, log) {
  return {
    level,
    bindings,
    log
  }
}

/**
 * Convert a string integer file descriptor to a proper native integer
 * file descriptor.
 *
 * @param {string} destination The file descriptor string to attempt to convert.
 *
 * @returns {Number}
 */
function normalizeDestFileDescriptor$1 (destination) {
  const fd = Number(destination);
  if (typeof destination === 'string' && Number.isFinite(fd)) {
    return fd
  }
  // destination could be undefined if we are in a worker
  if (destination === undefined) {
    // This is stdout in UNIX systems
    return 1
  }
  return destination
}

var tools = {
  noop: noop$3,
  buildSafeSonicBoom: buildSafeSonicBoom$1,
  asChindings: asChindings$2,
  asJson: asJson$1,
  genLog: genLog$1,
  createArgsNormalizer: createArgsNormalizer$1,
  stringify: stringify$2,
  buildFormatters: buildFormatters$2,
  normalizeDestFileDescriptor: normalizeDestFileDescriptor$1
};

/**
 * Represents default log level values
 *
 * @enum {number}
 */

const DEFAULT_LEVELS$3 = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
};

/**
 * Represents sort order direction: `ascending` or `descending`
 *
 * @enum {string}
 */
const SORTING_ORDER$2 = {
  ASC: 'ASC',
  DESC: 'DESC'
};

var constants = {
  DEFAULT_LEVELS: DEFAULT_LEVELS$3,
  SORTING_ORDER: SORTING_ORDER$2
};

/* eslint no-prototype-builtins: 0 */
const {
  lsCacheSym: lsCacheSym$1,
  levelValSym: levelValSym$1,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$2,
  streamSym: streamSym$2,
  formattersSym: formattersSym$2,
  hooksSym: hooksSym$1,
  levelCompSym: levelCompSym$1
} = symbols$1;
const { noop: noop$2, genLog } = tools;
const { DEFAULT_LEVELS: DEFAULT_LEVELS$2, SORTING_ORDER: SORTING_ORDER$1 } = constants;

const levelMethods = {
  fatal: (hook) => {
    const logFatal = genLog(DEFAULT_LEVELS$2.fatal, hook);
    return function (...args) {
      const stream = this[streamSym$2];
      logFatal.call(this, ...args);
      if (typeof stream.flushSync === 'function') {
        try {
          stream.flushSync();
        } catch (e) {
          // https://github.com/pinojs/pino/pull/740#discussion_r346788313
        }
      }
    }
  },
  error: (hook) => genLog(DEFAULT_LEVELS$2.error, hook),
  warn: (hook) => genLog(DEFAULT_LEVELS$2.warn, hook),
  info: (hook) => genLog(DEFAULT_LEVELS$2.info, hook),
  debug: (hook) => genLog(DEFAULT_LEVELS$2.debug, hook),
  trace: (hook) => genLog(DEFAULT_LEVELS$2.trace, hook)
};

const nums = Object.keys(DEFAULT_LEVELS$2).reduce((o, k) => {
  o[DEFAULT_LEVELS$2[k]] = k;
  return o
}, {});

const initialLsCache$1 = Object.keys(nums).reduce((o, k) => {
  o[k] = '{"level":' + Number(k);
  return o
}, {});

function genLsCache$2 (instance) {
  const formatter = instance[formattersSym$2].level;
  const { labels } = instance.levels;
  const cache = {};
  for (const label in labels) {
    const level = formatter(labels[label], Number(label));
    cache[label] = JSON.stringify(level).slice(0, -1);
  }
  instance[lsCacheSym$1] = cache;
  return instance
}

function isStandardLevel (level, useOnlyCustomLevels) {
  if (useOnlyCustomLevels) {
    return false
  }

  switch (level) {
    case 'fatal':
    case 'error':
    case 'warn':
    case 'info':
    case 'debug':
    case 'trace':
      return true
    default:
      return false
  }
}

function setLevel$1 (level) {
  const { labels, values } = this.levels;
  if (typeof level === 'number') {
    if (labels[level] === undefined) throw Error('unknown level value' + level)
    level = labels[level];
  }
  if (values[level] === undefined) throw Error('unknown level ' + level)
  const preLevelVal = this[levelValSym$1];
  const levelVal = this[levelValSym$1] = values[level];
  const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym$2];
  const levelComparison = this[levelCompSym$1];
  const hook = this[hooksSym$1].logMethod;

  for (const key in values) {
    if (levelComparison(values[key], levelVal) === false) {
      this[key] = noop$2;
      continue
    }
    this[key] = isStandardLevel(key, useOnlyCustomLevelsVal) ? levelMethods[key](hook) : genLog(values[key], hook);
  }

  this.emit(
    'level-change',
    level,
    levelVal,
    labels[preLevelVal],
    preLevelVal,
    this
  );
}

function getLevel$1 (level) {
  const { levels, levelVal } = this;
  // protection against potential loss of Pino scope from serializers (edge case with circular refs - https://github.com/pinojs/pino/issues/833)
  return (levels && levels.labels) ? levels.labels[levelVal] : ''
}

function isLevelEnabled$1 (logLevel) {
  const { values } = this.levels;
  const logLevelVal = values[logLevel];
  return logLevelVal !== undefined && this[levelCompSym$1](logLevelVal, this[levelValSym$1])
}

/**
 * Determine if the given `current` level is enabled by comparing it
 * against the current threshold (`expected`).
 *
 * @param {SORTING_ORDER} direction comparison direction "ASC" or "DESC"
 * @param {number} current current log level number representation
 * @param {number} expected threshold value to compare with
 * @returns {boolean}
 */
function compareLevel (direction, current, expected) {
  if (direction === SORTING_ORDER$1.DESC) {
    return current <= expected
  }

  return current >= expected
}

/**
 * Create a level comparison function based on `levelComparison`
 * it could a default function which compares levels either in "ascending" or "descending" order or custom comparison function
 *
 * @param {SORTING_ORDER | Function} levelComparison sort levels order direction or custom comparison function
 * @returns Function
 */
function genLevelComparison$1 (levelComparison) {
  if (typeof levelComparison === 'string') {
    return compareLevel.bind(null, levelComparison)
  }

  return levelComparison
}

function mappings$2 (customLevels = null, useOnlyCustomLevels = false) {
  const customNums = customLevels
    /* eslint-disable */
    ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k;
        return o
      }, {})
    : null;
    /* eslint-enable */

  const labels = Object.assign(
    Object.create(Object.prototype, { Infinity: { value: 'silent' } }),
    useOnlyCustomLevels ? null : nums,
    customNums
  );
  const values = Object.assign(
    Object.create(Object.prototype, { silent: { value: Infinity } }),
    useOnlyCustomLevels ? null : DEFAULT_LEVELS$2,
    customLevels
  );
  return { labels, values }
}

function assertDefaultLevelFound$1 (defaultLevel, customLevels, useOnlyCustomLevels) {
  if (typeof defaultLevel === 'number') {
    const values = [].concat(
      Object.keys(customLevels || {}).map(key => customLevels[key]),
      useOnlyCustomLevels ? [] : Object.keys(nums).map(level => +level),
      Infinity
    );
    if (!values.includes(defaultLevel)) {
      throw Error(`default level:${defaultLevel} must be included in custom levels`)
    }
    return
  }

  const labels = Object.assign(
    Object.create(Object.prototype, { silent: { value: Infinity } }),
    useOnlyCustomLevels ? null : DEFAULT_LEVELS$2,
    customLevels
  );
  if (!(defaultLevel in labels)) {
    throw Error(`default level:${defaultLevel} must be included in custom levels`)
  }
}

function assertNoLevelCollisions$1 (levels, customLevels) {
  const { labels, values } = levels;
  for (const k in customLevels) {
    if (k in values) {
      throw Error('levels cannot be overridden')
    }
    if (customLevels[k] in labels) {
      throw Error('pre-existing level values cannot be used for new levels')
    }
  }
}

/**
 * Validates whether `levelComparison` is correct
 *
 * @throws Error
 * @param {SORTING_ORDER | Function} levelComparison - value to validate
 * @returns
 */
function assertLevelComparison$1 (levelComparison) {
  if (typeof levelComparison === 'function') {
    return
  }

  if (typeof levelComparison === 'string' && Object.values(SORTING_ORDER$1).includes(levelComparison)) {
    return
  }

  throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type')
}

var levels = {
  initialLsCache: initialLsCache$1,
  genLsCache: genLsCache$2,
  getLevel: getLevel$1,
  setLevel: setLevel$1,
  isLevelEnabled: isLevelEnabled$1,
  mappings: mappings$2,
  assertNoLevelCollisions: assertNoLevelCollisions$1,
  assertDefaultLevelFound: assertDefaultLevelFound$1,
  genLevelComparison: genLevelComparison$1,
  assertLevelComparison: assertLevelComparison$1
};

var meta = { version: '9.5.0' };

/* eslint no-prototype-builtins: 0 */

const { EventEmitter } = require$$0$3;
const {
  lsCacheSym,
  levelValSym,
  setLevelSym: setLevelSym$1,
  getLevelSym,
  chindingsSym: chindingsSym$1,
  parsedChindingsSym,
  mixinSym: mixinSym$1,
  asJsonSym,
  writeSym,
  mixinMergeStrategySym: mixinMergeStrategySym$1,
  timeSym: timeSym$1,
  timeSliceIndexSym: timeSliceIndexSym$1,
  streamSym: streamSym$1,
  serializersSym: serializersSym$1,
  formattersSym: formattersSym$1,
  errorKeySym: errorKeySym$1,
  messageKeySym: messageKeySym$1,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$1,
  needsMetadataGsym,
  redactFmtSym: redactFmtSym$1,
  stringifySym: stringifySym$1,
  formatOptsSym: formatOptsSym$1,
  stringifiersSym: stringifiersSym$1,
  msgPrefixSym: msgPrefixSym$1
} = symbols$1;
const {
  getLevel,
  setLevel,
  isLevelEnabled,
  mappings: mappings$1,
  initialLsCache,
  genLsCache: genLsCache$1,
  assertNoLevelCollisions
} = levels;
const {
  asChindings: asChindings$1,
  asJson,
  buildFormatters: buildFormatters$1,
  stringify: stringify$1
} = tools;
const {
  version: version$1
} = meta;
const redaction$1 = redaction_1;

// note: use of class is satirical
// https://github.com/pinojs/pino/pull/433#pullrequestreview-127703127
const constructor = class Pino {};
const prototype = {
  constructor,
  child,
  bindings,
  setBindings,
  flush,
  isLevelEnabled,
  version: version$1,
  get level () { return this[getLevelSym]() },
  set level (lvl) { this[setLevelSym$1](lvl); },
  get levelVal () { return this[levelValSym] },
  set levelVal (n) { throw Error('levelVal is read-only') },
  [lsCacheSym]: initialLsCache,
  [writeSym]: write,
  [asJsonSym]: asJson,
  [getLevelSym]: getLevel,
  [setLevelSym$1]: setLevel
};

Object.setPrototypeOf(prototype, EventEmitter.prototype);

// exporting and consuming the prototype object using factory pattern fixes scoping issues with getters when serializing
var proto$1 = function () {
  return Object.create(prototype)
};

const resetChildingsFormatter = bindings => bindings;
function child (bindings, options) {
  if (!bindings) {
    throw Error('missing bindings for child Pino')
  }
  options = options || {}; // default options to empty object
  const serializers = this[serializersSym$1];
  const formatters = this[formattersSym$1];
  const instance = Object.create(this);

  if (options.hasOwnProperty('serializers') === true) {
    instance[serializersSym$1] = Object.create(null);

    for (const k in serializers) {
      instance[serializersSym$1][k] = serializers[k];
    }
    const parentSymbols = Object.getOwnPropertySymbols(serializers);
    /* eslint no-var: off */
    for (var i = 0; i < parentSymbols.length; i++) {
      const ks = parentSymbols[i];
      instance[serializersSym$1][ks] = serializers[ks];
    }

    for (const bk in options.serializers) {
      instance[serializersSym$1][bk] = options.serializers[bk];
    }
    const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
    for (var bi = 0; bi < bindingsSymbols.length; bi++) {
      const bks = bindingsSymbols[bi];
      instance[serializersSym$1][bks] = options.serializers[bks];
    }
  } else instance[serializersSym$1] = serializers;
  if (options.hasOwnProperty('formatters')) {
    const { level, bindings: chindings, log } = options.formatters;
    instance[formattersSym$1] = buildFormatters$1(
      level || formatters.level,
      chindings || resetChildingsFormatter,
      log || formatters.log
    );
  } else {
    instance[formattersSym$1] = buildFormatters$1(
      formatters.level,
      resetChildingsFormatter,
      formatters.log
    );
  }
  if (options.hasOwnProperty('customLevels') === true) {
    assertNoLevelCollisions(this.levels, options.customLevels);
    instance.levels = mappings$1(options.customLevels, instance[useOnlyCustomLevelsSym$1]);
    genLsCache$1(instance);
  }

  // redact must place before asChindings and only replace if exist
  if ((typeof options.redact === 'object' && options.redact !== null) || Array.isArray(options.redact)) {
    instance.redact = options.redact; // replace redact directly
    const stringifiers = redaction$1(instance.redact, stringify$1);
    const formatOpts = { stringify: stringifiers[redactFmtSym$1] };
    instance[stringifySym$1] = stringify$1;
    instance[stringifiersSym$1] = stringifiers;
    instance[formatOptsSym$1] = formatOpts;
  }

  if (typeof options.msgPrefix === 'string') {
    instance[msgPrefixSym$1] = (this[msgPrefixSym$1] || '') + options.msgPrefix;
  }

  instance[chindingsSym$1] = asChindings$1(instance, bindings);
  const childLevel = options.level || this.level;
  instance[setLevelSym$1](childLevel);
  this.onChild(instance);
  return instance
}

function bindings () {
  const chindings = this[chindingsSym$1];
  const chindingsJson = `{${chindings.substr(1)}}`; // at least contains ,"pid":7068,"hostname":"myMac"
  const bindingsFromJson = JSON.parse(chindingsJson);
  delete bindingsFromJson.pid;
  delete bindingsFromJson.hostname;
  return bindingsFromJson
}

function setBindings (newBindings) {
  const chindings = asChindings$1(this, newBindings);
  this[chindingsSym$1] = chindings;
  delete this[parsedChindingsSym];
}

/**
 * Default strategy for creating `mergeObject` from arguments and the result from `mixin()`.
 * Fields from `mergeObject` have higher priority in this strategy.
 *
 * @param {Object} mergeObject The object a user has supplied to the logging function.
 * @param {Object} mixinObject The result of the `mixin` method.
 * @return {Object}
 */
function defaultMixinMergeStrategy (mergeObject, mixinObject) {
  return Object.assign(mixinObject, mergeObject)
}

function write (_obj, msg, num) {
  const t = this[timeSym$1]();
  const mixin = this[mixinSym$1];
  const errorKey = this[errorKeySym$1];
  const messageKey = this[messageKeySym$1];
  const mixinMergeStrategy = this[mixinMergeStrategySym$1] || defaultMixinMergeStrategy;
  let obj;

  if (_obj === undefined || _obj === null) {
    obj = {};
  } else if (_obj instanceof Error) {
    obj = { [errorKey]: _obj };
    if (msg === undefined) {
      msg = _obj.message;
    }
  } else {
    obj = _obj;
    if (msg === undefined && _obj[messageKey] === undefined && _obj[errorKey]) {
      msg = _obj[errorKey].message;
    }
  }

  if (mixin) {
    obj = mixinMergeStrategy(obj, mixin(obj, num, this));
  }

  const s = this[asJsonSym](obj, msg, num, t);

  const stream = this[streamSym$1];
  if (stream[needsMetadataGsym] === true) {
    stream.lastLevel = num;
    stream.lastObj = obj;
    stream.lastMsg = msg;
    stream.lastTime = t.slice(this[timeSliceIndexSym$1]);
    stream.lastLogger = this; // for child loggers
  }
  stream.write(s);
}

function noop$1 () {}

function flush (cb) {
  if (cb != null && typeof cb !== 'function') {
    throw Error('callback must be a function')
  }

  const stream = this[streamSym$1];

  if (typeof stream.flush === 'function') {
    stream.flush(cb || noop$1);
  } else if (cb) cb();
}

var safeStableStringify = {exports: {}};

(function (module, exports) {

	const { hasOwnProperty } = Object.prototype;

	const stringify = configure();

	// @ts-expect-error
	stringify.configure = configure;
	// @ts-expect-error
	stringify.stringify = stringify;

	// @ts-expect-error
	stringify.default = stringify;

	// @ts-expect-error used for named export
	exports.stringify = stringify;
	// @ts-expect-error used for named export
	exports.configure = configure;

	module.exports = stringify;

	// eslint-disable-next-line no-control-regex
	const strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;

	// Escape C0 control characters, double quotes, the backslash and every code
	// unit with a numeric value in the inclusive range 0xD800 to 0xDFFF.
	function strEscape (str) {
	  // Some magic numbers that worked out fine while benchmarking with v8 8.0
	  if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) {
	    return `"${str}"`
	  }
	  return JSON.stringify(str)
	}

	function sort (array, comparator) {
	  // Insertion sort is very efficient for small input sizes, but it has a bad
	  // worst case complexity. Thus, use native array sort for bigger values.
	  if (array.length > 2e2 || comparator) {
	    return array.sort(comparator)
	  }
	  for (let i = 1; i < array.length; i++) {
	    const currentValue = array[i];
	    let position = i;
	    while (position !== 0 && array[position - 1] > currentValue) {
	      array[position] = array[position - 1];
	      position--;
	    }
	    array[position] = currentValue;
	  }
	  return array
	}

	const typedArrayPrototypeGetSymbolToStringTag =
	  Object.getOwnPropertyDescriptor(
	    Object.getPrototypeOf(
	      Object.getPrototypeOf(
	        new Int8Array()
	      )
	    ),
	    Symbol.toStringTag
	  ).get;

	function isTypedArrayWithEntries (value) {
	  return typedArrayPrototypeGetSymbolToStringTag.call(value) !== undefined && value.length !== 0
	}

	function stringifyTypedArray (array, separator, maximumBreadth) {
	  if (array.length < maximumBreadth) {
	    maximumBreadth = array.length;
	  }
	  const whitespace = separator === ',' ? '' : ' ';
	  let res = `"0":${whitespace}${array[0]}`;
	  for (let i = 1; i < maximumBreadth; i++) {
	    res += `${separator}"${i}":${whitespace}${array[i]}`;
	  }
	  return res
	}

	function getCircularValueOption (options) {
	  if (hasOwnProperty.call(options, 'circularValue')) {
	    const circularValue = options.circularValue;
	    if (typeof circularValue === 'string') {
	      return `"${circularValue}"`
	    }
	    if (circularValue == null) {
	      return circularValue
	    }
	    if (circularValue === Error || circularValue === TypeError) {
	      return {
	        toString () {
	          throw new TypeError('Converting circular structure to JSON')
	        }
	      }
	    }
	    throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined')
	  }
	  return '"[Circular]"'
	}

	function getDeterministicOption (options) {
	  let value;
	  if (hasOwnProperty.call(options, 'deterministic')) {
	    value = options.deterministic;
	    if (typeof value !== 'boolean' && typeof value !== 'function') {
	      throw new TypeError('The "deterministic" argument must be of type boolean or comparator function')
	    }
	  }
	  return value === undefined ? true : value
	}

	function getBooleanOption (options, key) {
	  let value;
	  if (hasOwnProperty.call(options, key)) {
	    value = options[key];
	    if (typeof value !== 'boolean') {
	      throw new TypeError(`The "${key}" argument must be of type boolean`)
	    }
	  }
	  return value === undefined ? true : value
	}

	function getPositiveIntegerOption (options, key) {
	  let value;
	  if (hasOwnProperty.call(options, key)) {
	    value = options[key];
	    if (typeof value !== 'number') {
	      throw new TypeError(`The "${key}" argument must be of type number`)
	    }
	    if (!Number.isInteger(value)) {
	      throw new TypeError(`The "${key}" argument must be an integer`)
	    }
	    if (value < 1) {
	      throw new RangeError(`The "${key}" argument must be >= 1`)
	    }
	  }
	  return value === undefined ? Infinity : value
	}

	function getItemCount (number) {
	  if (number === 1) {
	    return '1 item'
	  }
	  return `${number} items`
	}

	function getUniqueReplacerSet (replacerArray) {
	  const replacerSet = new Set();
	  for (const value of replacerArray) {
	    if (typeof value === 'string' || typeof value === 'number') {
	      replacerSet.add(String(value));
	    }
	  }
	  return replacerSet
	}

	function getStrictOption (options) {
	  if (hasOwnProperty.call(options, 'strict')) {
	    const value = options.strict;
	    if (typeof value !== 'boolean') {
	      throw new TypeError('The "strict" argument must be of type boolean')
	    }
	    if (value) {
	      return (value) => {
	        let message = `Object can not safely be stringified. Received type ${typeof value}`;
	        if (typeof value !== 'function') message += ` (${value.toString()})`;
	        throw new Error(message)
	      }
	    }
	  }
	}

	function configure (options) {
	  options = { ...options };
	  const fail = getStrictOption(options);
	  if (fail) {
	    if (options.bigint === undefined) {
	      options.bigint = false;
	    }
	    if (!('circularValue' in options)) {
	      options.circularValue = Error;
	    }
	  }
	  const circularValue = getCircularValueOption(options);
	  const bigint = getBooleanOption(options, 'bigint');
	  const deterministic = getDeterministicOption(options);
	  const comparator = typeof deterministic === 'function' ? deterministic : undefined;
	  const maximumDepth = getPositiveIntegerOption(options, 'maximumDepth');
	  const maximumBreadth = getPositiveIntegerOption(options, 'maximumBreadth');

	  function stringifyFnReplacer (key, parent, stack, replacer, spacer, indentation) {
	    let value = parent[key];

	    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
	      value = value.toJSON(key);
	    }
	    value = replacer.call(parent, key, value);

	    switch (typeof value) {
	      case 'string':
	        return strEscape(value)
	      case 'object': {
	        if (value === null) {
	          return 'null'
	        }
	        if (stack.indexOf(value) !== -1) {
	          return circularValue
	        }

	        let res = '';
	        let join = ',';
	        const originalIndentation = indentation;

	        if (Array.isArray(value)) {
	          if (value.length === 0) {
	            return '[]'
	          }
	          if (maximumDepth < stack.length + 1) {
	            return '"[Array]"'
	          }
	          stack.push(value);
	          if (spacer !== '') {
	            indentation += spacer;
	            res += `\n${indentation}`;
	            join = `,\n${indentation}`;
	          }
	          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
	          let i = 0;
	          for (; i < maximumValuesToStringify - 1; i++) {
	            const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
	            res += tmp !== undefined ? tmp : 'null';
	            res += join;
	          }
	          const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
	          res += tmp !== undefined ? tmp : 'null';
	          if (value.length - 1 > maximumBreadth) {
	            const removedKeys = value.length - maximumBreadth - 1;
	            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
	          }
	          if (spacer !== '') {
	            res += `\n${originalIndentation}`;
	          }
	          stack.pop();
	          return `[${res}]`
	        }

	        let keys = Object.keys(value);
	        const keyLength = keys.length;
	        if (keyLength === 0) {
	          return '{}'
	        }
	        if (maximumDepth < stack.length + 1) {
	          return '"[Object]"'
	        }
	        let whitespace = '';
	        let separator = '';
	        if (spacer !== '') {
	          indentation += spacer;
	          join = `,\n${indentation}`;
	          whitespace = ' ';
	        }
	        const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
	        if (deterministic && !isTypedArrayWithEntries(value)) {
	          keys = sort(keys, comparator);
	        }
	        stack.push(value);
	        for (let i = 0; i < maximumPropertiesToStringify; i++) {
	          const key = keys[i];
	          const tmp = stringifyFnReplacer(key, value, stack, replacer, spacer, indentation);
	          if (tmp !== undefined) {
	            res += `${separator}${strEscape(key)}:${whitespace}${tmp}`;
	            separator = join;
	          }
	        }
	        if (keyLength > maximumBreadth) {
	          const removedKeys = keyLength - maximumBreadth;
	          res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
	          separator = join;
	        }
	        if (spacer !== '' && separator.length > 1) {
	          res = `\n${indentation}${res}\n${originalIndentation}`;
	        }
	        stack.pop();
	        return `{${res}}`
	      }
	      case 'number':
	        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
	      case 'boolean':
	        return value === true ? 'true' : 'false'
	      case 'undefined':
	        return undefined
	      case 'bigint':
	        if (bigint) {
	          return String(value)
	        }
	        // fallthrough
	      default:
	        return fail ? fail(value) : undefined
	    }
	  }

	  function stringifyArrayReplacer (key, value, stack, replacer, spacer, indentation) {
	    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
	      value = value.toJSON(key);
	    }

	    switch (typeof value) {
	      case 'string':
	        return strEscape(value)
	      case 'object': {
	        if (value === null) {
	          return 'null'
	        }
	        if (stack.indexOf(value) !== -1) {
	          return circularValue
	        }

	        const originalIndentation = indentation;
	        let res = '';
	        let join = ',';

	        if (Array.isArray(value)) {
	          if (value.length === 0) {
	            return '[]'
	          }
	          if (maximumDepth < stack.length + 1) {
	            return '"[Array]"'
	          }
	          stack.push(value);
	          if (spacer !== '') {
	            indentation += spacer;
	            res += `\n${indentation}`;
	            join = `,\n${indentation}`;
	          }
	          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
	          let i = 0;
	          for (; i < maximumValuesToStringify - 1; i++) {
	            const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
	            res += tmp !== undefined ? tmp : 'null';
	            res += join;
	          }
	          const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
	          res += tmp !== undefined ? tmp : 'null';
	          if (value.length - 1 > maximumBreadth) {
	            const removedKeys = value.length - maximumBreadth - 1;
	            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
	          }
	          if (spacer !== '') {
	            res += `\n${originalIndentation}`;
	          }
	          stack.pop();
	          return `[${res}]`
	        }
	        stack.push(value);
	        let whitespace = '';
	        if (spacer !== '') {
	          indentation += spacer;
	          join = `,\n${indentation}`;
	          whitespace = ' ';
	        }
	        let separator = '';
	        for (const key of replacer) {
	          const tmp = stringifyArrayReplacer(key, value[key], stack, replacer, spacer, indentation);
	          if (tmp !== undefined) {
	            res += `${separator}${strEscape(key)}:${whitespace}${tmp}`;
	            separator = join;
	          }
	        }
	        if (spacer !== '' && separator.length > 1) {
	          res = `\n${indentation}${res}\n${originalIndentation}`;
	        }
	        stack.pop();
	        return `{${res}}`
	      }
	      case 'number':
	        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
	      case 'boolean':
	        return value === true ? 'true' : 'false'
	      case 'undefined':
	        return undefined
	      case 'bigint':
	        if (bigint) {
	          return String(value)
	        }
	        // fallthrough
	      default:
	        return fail ? fail(value) : undefined
	    }
	  }

	  function stringifyIndent (key, value, stack, spacer, indentation) {
	    switch (typeof value) {
	      case 'string':
	        return strEscape(value)
	      case 'object': {
	        if (value === null) {
	          return 'null'
	        }
	        if (typeof value.toJSON === 'function') {
	          value = value.toJSON(key);
	          // Prevent calling `toJSON` again.
	          if (typeof value !== 'object') {
	            return stringifyIndent(key, value, stack, spacer, indentation)
	          }
	          if (value === null) {
	            return 'null'
	          }
	        }
	        if (stack.indexOf(value) !== -1) {
	          return circularValue
	        }
	        const originalIndentation = indentation;

	        if (Array.isArray(value)) {
	          if (value.length === 0) {
	            return '[]'
	          }
	          if (maximumDepth < stack.length + 1) {
	            return '"[Array]"'
	          }
	          stack.push(value);
	          indentation += spacer;
	          let res = `\n${indentation}`;
	          const join = `,\n${indentation}`;
	          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
	          let i = 0;
	          for (; i < maximumValuesToStringify - 1; i++) {
	            const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
	            res += tmp !== undefined ? tmp : 'null';
	            res += join;
	          }
	          const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
	          res += tmp !== undefined ? tmp : 'null';
	          if (value.length - 1 > maximumBreadth) {
	            const removedKeys = value.length - maximumBreadth - 1;
	            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
	          }
	          res += `\n${originalIndentation}`;
	          stack.pop();
	          return `[${res}]`
	        }

	        let keys = Object.keys(value);
	        const keyLength = keys.length;
	        if (keyLength === 0) {
	          return '{}'
	        }
	        if (maximumDepth < stack.length + 1) {
	          return '"[Object]"'
	        }
	        indentation += spacer;
	        const join = `,\n${indentation}`;
	        let res = '';
	        let separator = '';
	        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
	        if (isTypedArrayWithEntries(value)) {
	          res += stringifyTypedArray(value, join, maximumBreadth);
	          keys = keys.slice(value.length);
	          maximumPropertiesToStringify -= value.length;
	          separator = join;
	        }
	        if (deterministic) {
	          keys = sort(keys, comparator);
	        }
	        stack.push(value);
	        for (let i = 0; i < maximumPropertiesToStringify; i++) {
	          const key = keys[i];
	          const tmp = stringifyIndent(key, value[key], stack, spacer, indentation);
	          if (tmp !== undefined) {
	            res += `${separator}${strEscape(key)}: ${tmp}`;
	            separator = join;
	          }
	        }
	        if (keyLength > maximumBreadth) {
	          const removedKeys = keyLength - maximumBreadth;
	          res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
	          separator = join;
	        }
	        if (separator !== '') {
	          res = `\n${indentation}${res}\n${originalIndentation}`;
	        }
	        stack.pop();
	        return `{${res}}`
	      }
	      case 'number':
	        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
	      case 'boolean':
	        return value === true ? 'true' : 'false'
	      case 'undefined':
	        return undefined
	      case 'bigint':
	        if (bigint) {
	          return String(value)
	        }
	        // fallthrough
	      default:
	        return fail ? fail(value) : undefined
	    }
	  }

	  function stringifySimple (key, value, stack) {
	    switch (typeof value) {
	      case 'string':
	        return strEscape(value)
	      case 'object': {
	        if (value === null) {
	          return 'null'
	        }
	        if (typeof value.toJSON === 'function') {
	          value = value.toJSON(key);
	          // Prevent calling `toJSON` again
	          if (typeof value !== 'object') {
	            return stringifySimple(key, value, stack)
	          }
	          if (value === null) {
	            return 'null'
	          }
	        }
	        if (stack.indexOf(value) !== -1) {
	          return circularValue
	        }

	        let res = '';

	        const hasLength = value.length !== undefined;
	        if (hasLength && Array.isArray(value)) {
	          if (value.length === 0) {
	            return '[]'
	          }
	          if (maximumDepth < stack.length + 1) {
	            return '"[Array]"'
	          }
	          stack.push(value);
	          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
	          let i = 0;
	          for (; i < maximumValuesToStringify - 1; i++) {
	            const tmp = stringifySimple(String(i), value[i], stack);
	            res += tmp !== undefined ? tmp : 'null';
	            res += ',';
	          }
	          const tmp = stringifySimple(String(i), value[i], stack);
	          res += tmp !== undefined ? tmp : 'null';
	          if (value.length - 1 > maximumBreadth) {
	            const removedKeys = value.length - maximumBreadth - 1;
	            res += `,"... ${getItemCount(removedKeys)} not stringified"`;
	          }
	          stack.pop();
	          return `[${res}]`
	        }

	        let keys = Object.keys(value);
	        const keyLength = keys.length;
	        if (keyLength === 0) {
	          return '{}'
	        }
	        if (maximumDepth < stack.length + 1) {
	          return '"[Object]"'
	        }
	        let separator = '';
	        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
	        if (hasLength && isTypedArrayWithEntries(value)) {
	          res += stringifyTypedArray(value, ',', maximumBreadth);
	          keys = keys.slice(value.length);
	          maximumPropertiesToStringify -= value.length;
	          separator = ',';
	        }
	        if (deterministic) {
	          keys = sort(keys, comparator);
	        }
	        stack.push(value);
	        for (let i = 0; i < maximumPropertiesToStringify; i++) {
	          const key = keys[i];
	          const tmp = stringifySimple(key, value[key], stack);
	          if (tmp !== undefined) {
	            res += `${separator}${strEscape(key)}:${tmp}`;
	            separator = ',';
	          }
	        }
	        if (keyLength > maximumBreadth) {
	          const removedKeys = keyLength - maximumBreadth;
	          res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
	        }
	        stack.pop();
	        return `{${res}}`
	      }
	      case 'number':
	        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
	      case 'boolean':
	        return value === true ? 'true' : 'false'
	      case 'undefined':
	        return undefined
	      case 'bigint':
	        if (bigint) {
	          return String(value)
	        }
	        // fallthrough
	      default:
	        return fail ? fail(value) : undefined
	    }
	  }

	  function stringify (value, replacer, space) {
	    if (arguments.length > 1) {
	      let spacer = '';
	      if (typeof space === 'number') {
	        spacer = ' '.repeat(Math.min(space, 10));
	      } else if (typeof space === 'string') {
	        spacer = space.slice(0, 10);
	      }
	      if (replacer != null) {
	        if (typeof replacer === 'function') {
	          return stringifyFnReplacer('', { '': value }, [], replacer, spacer, '')
	        }
	        if (Array.isArray(replacer)) {
	          return stringifyArrayReplacer('', value, [], getUniqueReplacerSet(replacer), spacer, '')
	        }
	      }
	      if (spacer.length !== 0) {
	        return stringifyIndent('', value, [], spacer, '')
	      }
	    }
	    return stringifySimple('', value, [])
	  }

	  return stringify
	} 
} (safeStableStringify, safeStableStringify.exports));

var safeStableStringifyExports = safeStableStringify.exports;

const metadata = Symbol.for('pino.metadata');
const { DEFAULT_LEVELS: DEFAULT_LEVELS$1 } = constants;

const DEFAULT_INFO_LEVEL = DEFAULT_LEVELS$1.info;

function multistream (streamsArray, opts) {
  let counter = 0;
  streamsArray = streamsArray || [];
  opts = opts || { dedupe: false };

  const streamLevels = Object.create(DEFAULT_LEVELS$1);
  streamLevels.silent = Infinity;
  if (opts.levels && typeof opts.levels === 'object') {
    Object.keys(opts.levels).forEach(i => {
      streamLevels[i] = opts.levels[i];
    });
  }

  const res = {
    write,
    add,
    emit,
    flushSync,
    end,
    minLevel: 0,
    streams: [],
    clone,
    [metadata]: true,
    streamLevels
  };

  if (Array.isArray(streamsArray)) {
    streamsArray.forEach(add, res);
  } else {
    add.call(res, streamsArray);
  }

  // clean this object up
  // or it will stay allocated forever
  // as it is closed on the following closures
  streamsArray = null;

  return res

  // we can exit early because the streams are ordered by level
  function write (data) {
    let dest;
    const level = this.lastLevel;
    const { streams } = this;
    // for handling situation when several streams has the same level
    let recordedLevel = 0;
    let stream;

    // if dedupe set to true we send logs to the stream with the highest level
    // therefore, we have to change sorting order
    for (let i = initLoopVar(streams.length, opts.dedupe); checkLoopVar(i, streams.length, opts.dedupe); i = adjustLoopVar(i, opts.dedupe)) {
      dest = streams[i];
      if (dest.level <= level) {
        if (recordedLevel !== 0 && recordedLevel !== dest.level) {
          break
        }
        stream = dest.stream;
        if (stream[metadata]) {
          const { lastTime, lastMsg, lastObj, lastLogger } = this;
          stream.lastLevel = level;
          stream.lastTime = lastTime;
          stream.lastMsg = lastMsg;
          stream.lastObj = lastObj;
          stream.lastLogger = lastLogger;
        }
        stream.write(data);
        if (opts.dedupe) {
          recordedLevel = dest.level;
        }
      } else if (!opts.dedupe) {
        break
      }
    }
  }

  function emit (...args) {
    for (const { stream } of this.streams) {
      if (typeof stream.emit === 'function') {
        stream.emit(...args);
      }
    }
  }

  function flushSync () {
    for (const { stream } of this.streams) {
      if (typeof stream.flushSync === 'function') {
        stream.flushSync();
      }
    }
  }

  function add (dest) {
    if (!dest) {
      return res
    }

    // Check that dest implements either StreamEntry or DestinationStream
    const isStream = typeof dest.write === 'function' || dest.stream;
    const stream_ = dest.write ? dest : dest.stream;
    // This is necessary to provide a meaningful error message, otherwise it throws somewhere inside write()
    if (!isStream) {
      throw Error('stream object needs to implement either StreamEntry or DestinationStream interface')
    }

    const { streams, streamLevels } = this;

    let level;
    if (typeof dest.levelVal === 'number') {
      level = dest.levelVal;
    } else if (typeof dest.level === 'string') {
      level = streamLevels[dest.level];
    } else if (typeof dest.level === 'number') {
      level = dest.level;
    } else {
      level = DEFAULT_INFO_LEVEL;
    }

    const dest_ = {
      stream: stream_,
      level,
      levelVal: undefined,
      id: counter++
    };

    streams.unshift(dest_);
    streams.sort(compareByLevel);

    this.minLevel = streams[0].level;

    return res
  }

  function end () {
    for (const { stream } of this.streams) {
      if (typeof stream.flushSync === 'function') {
        stream.flushSync();
      }
      stream.end();
    }
  }

  function clone (level) {
    const streams = new Array(this.streams.length);

    for (let i = 0; i < streams.length; i++) {
      streams[i] = {
        level,
        stream: this.streams[i].stream
      };
    }

    return {
      write,
      add,
      minLevel: level,
      streams,
      clone,
      emit,
      flushSync,
      [metadata]: true
    }
  }
}

function compareByLevel (a, b) {
  return a.level - b.level
}

function initLoopVar (length, dedupe) {
  return dedupe ? length - 1 : 0
}

function adjustLoopVar (i, dedupe) {
  return dedupe ? i - 1 : i + 1
}

function checkLoopVar (i, length, dedupe) {
  return dedupe ? i >= 0 : i < length
}

var multistream_1 = multistream;

const os = require$$0$4;
const stdSerializers = pinoStdSerializers;
const caller = caller$1;
const redaction = redaction_1;
const time = time$1;
const proto = proto$1;
const symbols = symbols$1;
const { configure } = safeStableStringifyExports;
const { assertDefaultLevelFound, mappings, genLsCache, genLevelComparison, assertLevelComparison } = levels;
const { DEFAULT_LEVELS, SORTING_ORDER } = constants;
const {
  createArgsNormalizer,
  asChindings,
  buildSafeSonicBoom,
  buildFormatters,
  stringify,
  normalizeDestFileDescriptor,
  noop
} = tools;
const { version } = meta;
const {
  chindingsSym,
  redactFmtSym,
  serializersSym,
  timeSym,
  timeSliceIndexSym,
  streamSym,
  stringifySym,
  stringifySafeSym,
  stringifiersSym,
  setLevelSym,
  endSym,
  formatOptsSym,
  messageKeySym,
  errorKeySym,
  nestedKeySym,
  mixinSym,
  levelCompSym,
  useOnlyCustomLevelsSym,
  formattersSym,
  hooksSym,
  nestedKeyStrSym,
  mixinMergeStrategySym,
  msgPrefixSym
} = symbols;
const { epochTime, nullTime } = time;
const { pid } = process;
const hostname = os.hostname();
const defaultErrorSerializer = stdSerializers.err;
const defaultOptions = {
  level: 'info',
  levelComparison: SORTING_ORDER.ASC,
  levels: DEFAULT_LEVELS,
  messageKey: 'msg',
  errorKey: 'err',
  nestedKey: null,
  enabled: true,
  base: { pid, hostname },
  serializers: Object.assign(Object.create(null), {
    err: defaultErrorSerializer
  }),
  formatters: Object.assign(Object.create(null), {
    bindings (bindings) {
      return bindings
    },
    level (label, number) {
      return { level: number }
    }
  }),
  hooks: {
    logMethod: undefined
  },
  timestamp: epochTime,
  name: undefined,
  redact: null,
  customLevels: null,
  useOnlyCustomLevels: false,
  depthLimit: 5,
  edgeLimit: 100
};

const normalize = createArgsNormalizer(defaultOptions);

const serializers = Object.assign(Object.create(null), stdSerializers);

function pino (...args) {
  const instance = {};
  const { opts, stream } = normalize(instance, caller(), ...args);

  if (opts.level && typeof opts.level === 'string' && DEFAULT_LEVELS[opts.level.toLowerCase()] !== undefined) opts.level = opts.level.toLowerCase();

  const {
    redact,
    crlf,
    serializers,
    timestamp,
    messageKey,
    errorKey,
    nestedKey,
    base,
    name,
    level,
    customLevels,
    levelComparison,
    mixin,
    mixinMergeStrategy,
    useOnlyCustomLevels,
    formatters,
    hooks,
    depthLimit,
    edgeLimit,
    onChild,
    msgPrefix
  } = opts;

  const stringifySafe = configure({
    maximumDepth: depthLimit,
    maximumBreadth: edgeLimit
  });

  const allFormatters = buildFormatters(
    formatters.level,
    formatters.bindings,
    formatters.log
  );

  const stringifyFn = stringify.bind({
    [stringifySafeSym]: stringifySafe
  });
  const stringifiers = redact ? redaction(redact, stringifyFn) : {};
  const formatOpts = redact
    ? { stringify: stringifiers[redactFmtSym] }
    : { stringify: stringifyFn };
  const end = '}' + (crlf ? '\r\n' : '\n');
  const coreChindings = asChindings.bind(null, {
    [chindingsSym]: '',
    [serializersSym]: serializers,
    [stringifiersSym]: stringifiers,
    [stringifySym]: stringify,
    [stringifySafeSym]: stringifySafe,
    [formattersSym]: allFormatters
  });

  let chindings = '';
  if (base !== null) {
    if (name === undefined) {
      chindings = coreChindings(base);
    } else {
      chindings = coreChindings(Object.assign({}, base, { name }));
    }
  }

  const time = (timestamp instanceof Function)
    ? timestamp
    : (timestamp ? epochTime : nullTime);
  const timeSliceIndex = time().indexOf(':') + 1;

  if (useOnlyCustomLevels && !customLevels) throw Error('customLevels is required if useOnlyCustomLevels is set true')
  if (mixin && typeof mixin !== 'function') throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`)
  if (msgPrefix && typeof msgPrefix !== 'string') throw Error(`Unknown msgPrefix type "${typeof msgPrefix}" - expected "string"`)

  assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
  const levels = mappings(customLevels, useOnlyCustomLevels);

  if (typeof stream.emit === 'function') {
    stream.emit('message', { code: 'PINO_CONFIG', config: { levels, messageKey, errorKey } });
  }

  assertLevelComparison(levelComparison);
  const levelCompFunc = genLevelComparison(levelComparison);

  Object.assign(instance, {
    levels,
    [levelCompSym]: levelCompFunc,
    [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
    [streamSym]: stream,
    [timeSym]: time,
    [timeSliceIndexSym]: timeSliceIndex,
    [stringifySym]: stringify,
    [stringifySafeSym]: stringifySafe,
    [stringifiersSym]: stringifiers,
    [endSym]: end,
    [formatOptsSym]: formatOpts,
    [messageKeySym]: messageKey,
    [errorKeySym]: errorKey,
    [nestedKeySym]: nestedKey,
    // protect against injection
    [nestedKeyStrSym]: nestedKey ? `,${JSON.stringify(nestedKey)}:{` : '',
    [serializersSym]: serializers,
    [mixinSym]: mixin,
    [mixinMergeStrategySym]: mixinMergeStrategy,
    [chindingsSym]: chindings,
    [formattersSym]: allFormatters,
    [hooksSym]: hooks,
    silent: noop,
    onChild,
    [msgPrefixSym]: msgPrefix
  });

  Object.setPrototypeOf(instance, proto());

  genLsCache(instance);

  instance[setLevelSym](level);

  return instance
}

pino$2.exports = pino;

pino$2.exports.destination = (dest = process.stdout.fd) => {
  if (typeof dest === 'object') {
    dest.dest = normalizeDestFileDescriptor(dest.dest || process.stdout.fd);
    return buildSafeSonicBoom(dest)
  } else {
    return buildSafeSonicBoom({ dest: normalizeDestFileDescriptor(dest), minLength: 0 })
  }
};

pino$2.exports.transport = transport_1;
pino$2.exports.multistream = multistream_1;

pino$2.exports.levels = mappings();
pino$2.exports.stdSerializers = serializers;
pino$2.exports.stdTimeFunctions = Object.assign({}, time);
pino$2.exports.symbols = symbols;
pino$2.exports.version = version;

// Enables default and name export with TypeScript and Babel
pino$2.exports.default = pino;
pino$2.exports.pino = pino;

var pinoExports = pino$2.exports;
var pino$1 = /*@__PURE__*/getDefaultExportFromCjs(pinoExports);

export { pino$1 as a, getDefaultExportFromCjs as g, pinoExports as p };
