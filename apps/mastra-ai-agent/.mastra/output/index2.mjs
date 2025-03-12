import require$$0$1 from 'fs';
import require$$3 from 'path';
import require$$2 from 'os';
import require$$3$1 from 'crypto';
import { Mastra } from '@mastra/core';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';

var main = {exports: {}};

var version$1 = "16.4.7";
var require$$4 = {
	version: version$1};

const fs = require$$0$1;
const path = require$$3;
const os = require$$2;
const crypto = require$$3$1;
const packageJson = require$$4;

const version = packageJson.version;

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;

// Parse src into an Object
function parse (src) {
  const obj = {};

  // Convert buffer to string
  let lines = src.toString();

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n');

  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];

    // Default undefined or null to empty string
    let value = (match[2] || '');

    // Remove whitespace
    value = value.trim();

    // Check if double quoted
    const maybeQuote = value[0];

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2');

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n');
      value = value.replace(/\\r/g, '\r');
    }

    // Add to object
    obj[key] = value;
  }

  return obj
}

function _parseVault (options) {
  const vaultPath = _vaultPath(options);

  // Parse .env.vault
  const result = DotenvModule.configDotenv({ path: vaultPath });
  if (!result.parsed) {
    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
    err.code = 'MISSING_DATA';
    throw err
  }

  // handle scenario for comma separated keys - for use with key rotation
  // example: DOTENV_KEY="dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod"
  const keys = _dotenvKey(options).split(',');
  const length = keys.length;

  let decrypted;
  for (let i = 0; i < length; i++) {
    try {
      // Get full key
      const key = keys[i].trim();

      // Get instructions for decrypt
      const attrs = _instructions(result, key);

      // Decrypt
      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);

      break
    } catch (error) {
      // last key
      if (i + 1 >= length) {
        throw error
      }
      // try next key
    }
  }

  // Parse decrypted .env string
  return DotenvModule.parse(decrypted)
}

function _log (message) {
  console.log(`[dotenv@${version}][INFO] ${message}`);
}

function _warn (message) {
  console.log(`[dotenv@${version}][WARN] ${message}`);
}

function _debug (message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`);
}

function _dotenvKey (options) {
  // prioritize developer directly setting options.DOTENV_KEY
  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
    return options.DOTENV_KEY
  }

  // secondary infra already contains a DOTENV_KEY environment variable
  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
    return process.env.DOTENV_KEY
  }

  // fallback to empty string
  return ''
}

function _instructions (result, dotenvKey) {
  // Parse DOTENV_KEY. Format is a URI
  let uri;
  try {
    uri = new URL(dotenvKey);
  } catch (error) {
    if (error.code === 'ERR_INVALID_URL') {
      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development');
      err.code = 'INVALID_DOTENV_KEY';
      throw err
    }

    throw error
  }

  // Get decrypt key
  const key = uri.password;
  if (!key) {
    const err = new Error('INVALID_DOTENV_KEY: Missing key part');
    err.code = 'INVALID_DOTENV_KEY';
    throw err
  }

  // Get environment
  const environment = uri.searchParams.get('environment');
  if (!environment) {
    const err = new Error('INVALID_DOTENV_KEY: Missing environment part');
    err.code = 'INVALID_DOTENV_KEY';
    throw err
  }

  // Get ciphertext payload
  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
  const ciphertext = result.parsed[environmentKey]; // DOTENV_VAULT_PRODUCTION
  if (!ciphertext) {
    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT';
    throw err
  }

  return { ciphertext, key }
}

function _vaultPath (options) {
  let possibleVaultPath = null;

  if (options && options.path && options.path.length > 0) {
    if (Array.isArray(options.path)) {
      for (const filepath of options.path) {
        if (fs.existsSync(filepath)) {
          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`;
        }
      }
    } else {
      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`;
    }
  } else {
    possibleVaultPath = path.resolve(process.cwd(), '.env.vault');
  }

  if (fs.existsSync(possibleVaultPath)) {
    return possibleVaultPath
  }

  return null
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

function _configVault (options) {
  _log('Loading env from encrypted .env.vault');

  const parsed = DotenvModule._parseVault(options);

  let processEnv = process.env;
  if (options && options.processEnv != null) {
    processEnv = options.processEnv;
  }

  DotenvModule.populate(processEnv, parsed, options);

  return { parsed }
}

function configDotenv (options) {
  const dotenvPath = path.resolve(process.cwd(), '.env');
  let encoding = 'utf8';
  const debug = Boolean(options && options.debug);

  if (options && options.encoding) {
    encoding = options.encoding;
  } else {
    if (debug) {
      _debug('No encoding is specified. UTF-8 is used by default');
    }
  }

  let optionPaths = [dotenvPath]; // default, look for .env
  if (options && options.path) {
    if (!Array.isArray(options.path)) {
      optionPaths = [_resolveHome(options.path)];
    } else {
      optionPaths = []; // reset default
      for (const filepath of options.path) {
        optionPaths.push(_resolveHome(filepath));
      }
    }
  }

  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final
  // parsed data, we will combine it with process.env (or options.processEnv if provided).
  let lastError;
  const parsedAll = {};
  for (const path of optionPaths) {
    try {
      // Specifying an encoding returns a string instead of a buffer
      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }));

      DotenvModule.populate(parsedAll, parsed, options);
    } catch (e) {
      if (debug) {
        _debug(`Failed to load ${path} ${e.message}`);
      }
      lastError = e;
    }
  }

  let processEnv = process.env;
  if (options && options.processEnv != null) {
    processEnv = options.processEnv;
  }

  DotenvModule.populate(processEnv, parsedAll, options);

  if (lastError) {
    return { parsed: parsedAll, error: lastError }
  } else {
    return { parsed: parsedAll }
  }
}

// Populates process.env from .env file
function config (options) {
  // fallback to original dotenv if DOTENV_KEY is not set
  if (_dotenvKey(options).length === 0) {
    return DotenvModule.configDotenv(options)
  }

  const vaultPath = _vaultPath(options);

  // dotenvKey exists but .env.vault file does not exist
  if (!vaultPath) {
    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);

    return DotenvModule.configDotenv(options)
  }

  return DotenvModule._configVault(options)
}

function decrypt (encrypted, keyStr) {
  const key = Buffer.from(keyStr.slice(-64), 'hex');
  let ciphertext = Buffer.from(encrypted, 'base64');

  const nonce = ciphertext.subarray(0, 12);
  const authTag = ciphertext.subarray(-16);
  ciphertext = ciphertext.subarray(12, -16);

  try {
    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce);
    aesgcm.setAuthTag(authTag);
    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`
  } catch (error) {
    const isRange = error instanceof RangeError;
    const invalidKeyLength = error.message === 'Invalid key length';
    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data';

    if (isRange || invalidKeyLength) {
      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)');
      err.code = 'INVALID_DOTENV_KEY';
      throw err
    } else if (decryptionFailed) {
      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY');
      err.code = 'DECRYPTION_FAILED';
      throw err
    } else {
      throw error
    }
  }
}

// Populate process.env with parsed values
function populate (processEnv, parsed, options = {}) {
  const debug = Boolean(options && options.debug);
  const override = Boolean(options && options.override);

  if (typeof parsed !== 'object') {
    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate');
    err.code = 'OBJECT_REQUIRED';
    throw err
  }

  // Set process.env
  for (const key of Object.keys(parsed)) {
    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
      if (override === true) {
        processEnv[key] = parsed[key];
      }

      if (debug) {
        if (override === true) {
          _debug(`"${key}" is already defined and WAS overwritten`);
        } else {
          _debug(`"${key}" is already defined and was NOT overwritten`);
        }
      }
    } else {
      processEnv[key] = parsed[key];
    }
  }
}

const DotenvModule = {
  configDotenv,
  _configVault,
  _parseVault,
  config,
  decrypt,
  parse,
  populate
};

var configDotenv_1 = main.exports.configDotenv = DotenvModule.configDotenv;
var _configVault_1 = main.exports._configVault = DotenvModule._configVault;
var _parseVault_1 = main.exports._parseVault = DotenvModule._parseVault;
var config_1 = main.exports.config = DotenvModule.config;
var decrypt_1 = main.exports.decrypt = DotenvModule.decrypt;
var parse_1 = main.exports.parse = DotenvModule.parse;
var populate_1 = main.exports.populate = DotenvModule.populate;

main.exports = DotenvModule;

var dotenv = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _configVault: _configVault_1,
  _parseVault: _parseVault_1,
  config: config_1,
  configDotenv: configDotenv_1,
  decrypt: decrypt_1,
  parse: parse_1,
  populate: populate_1
});

function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var require$$0 = /*@__PURE__*/getAugmentedNamespace(dotenv);

const DEEPSEEK_API_KEY$1 = process.env.DEEPSEEK_API_KEY;
const app = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY$1
});
const frontendAgent = new Agent({
  name: "frontend-ai",
  instructions: "\u4F60\u662F\u4E00\u4F4D\u4E13\u4E1A\u7684\u524D\u7AEF\u5F00\u53D1\u4E13\u5BB6\uFF0C\u7CBE\u901A HTML\u3001CSS\u3001JavaScript\u3001TypeScript\u3001React\u3001Vue \u548C Next.js \u7B49\u73B0\u4EE3\u524D\u7AEF\u6280\u672F\u3002\u4F60\u80FD\u591F\u5E2E\u52A9\u7528\u6237\u89E3\u51B3\u524D\u7AEF\u5F00\u53D1\u4E2D\u9047\u5230\u7684\u5404\u79CD\u95EE\u9898\uFF0C\u63D0\u4F9B\u4EE3\u7801\u793A\u4F8B\u3001\u6700\u4F73\u5B9E\u8DF5\u548C\u6027\u80FD\u4F18\u5316\u5EFA\u8BAE\u3002\u4F60\u7684\u56DE\u7B54\u5E94\u8BE5\u7B80\u6D01\u660E\u4E86\uFF0C\u4EE3\u7801\u793A\u4F8B\u5E94\u8BE5\u9075\u5FAA\u6700\u65B0\u7684\u524D\u7AEF\u5F00\u53D1\u6807\u51C6\u3002",
  model: app("deepseek-chat")
});

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const model = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY
});
const englishTutorAgent = new Agent({
  // name: "english-tutor-ai",
  // instructions:`
  //   Your name is Jo.
  //   You are a professional English language tutor with expertise in teaching English as a second language.
  //   Your role is to help users improve their English through conversation, grammar correction, and language guidance.
  //   When interacting with users:
  //   1. Engage in natural English conversations
  //   2. When correcting grammar mistakes:
  //      - Use **bold** to highlight spelling mistakes
  //      - Use markdown format to explain corrections:
  //        \`\`\`correction
  //        Original: [incorrect phrase]
  //        Correct: [correct phrase]
  //        Explanation: [brief explanation]
  //        \`\`\`
  //   3. For voice-based interactions (when inputType=voice):
  //      - First analyze pronunciation accuracy (scale 1-10)
  //      - Provide feedback on: 
  //        • Intonation patterns
  //        • Word stress placement
  //        • Sentence rhythm
  //      - Format voice-specific feedback as:
  //        \`\`\`pronunciation
  //        Accuracy: 7/10
  //        Feedback: [specific improvement suggestions]
  //        \`\`\`
  //   4. Adjust your language level based on the user's proficiency
  //   5. Maintain cross-modal context awareness:
  //      - Remember previous corrections across text/voice
  //      - Track user progress in both modalities
  //      - Provide progressive feedback
  //   Your responses should be:
  //   • Helpful and encouraging
  //   • Focused on language learning goals
  //   • Text-formatted with Markdown
  //   • Under 120 words for voice responses
  //   `,
  name: "english-tutor-ai",
  instructions: `
    Your name is Jo.
    You are a professional English language tutor with expertise in teaching English as a second language.
    Your role is to help users improve their English through conversation, grammar correction, and language guidance.

    When interacting with users:
    1. Engage in natural English conversations
    2. When correcting grammar mistakes:
       - Use **bold** to highlight spelling mistakes
       - Use markdown format to explain corrections:
         \`\`\`correction
         Original: [incorrect phrase]
         Correct: [correct phrase]
         Explanation: [brief explanation]
         \`\`\`
    3. Provide clear explanations of English language concepts
    4. Adjust your language level based on the user's proficiency
    5. Encourage users to practice speaking and writing in English

    Your responses should be helpful, encouraging, and focused on the user's language learning goals.
  `,
  model: model("deepseek-chat"),
  memory: new Memory({
    options: {
      workingMemory: {
        enabled: false,
        // enables working memory
        template: void 0
      },
      lastMessages: 5
      // Only keep recent context
    }
  })
});

require$$0.config();
const mastra = new Mastra({
  agents: {
    frontendAgent,
    englishTutorAgent
  },
  serverMiddleware: [{
    handler: async (c, next) => {
      c.res.headers.set("Access-Control-Allow-Origin", "*");
      c.res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      c.res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      await next();
    },
    path: "/api/*"
  }, {
    handler: async (c, next) => {
      if (c.req.method === "POST") {
        c.req.json = await c.req.json();
      }
      await next();
    },
    path: "/api/*"
  }]
});

export { mastra };
