import { Transform } from 'stream';
import { a as pino } from './pino.mjs';
import pretty from 'pino-pretty';
import { createHash } from 'crypto';
import jsonSchemaToZod from 'json-schema-to-zod';
import { l as lib } from './_virtual__virtual-zod.mjs';

// src/storage/constants.ts
var TABLE_WORKFLOW_SNAPSHOT = "mastra_workflow_snapshot";
var TABLE_EVALS = "mastra_evals";
var TABLE_MESSAGES = "mastra_messages";
var TABLE_THREADS = "mastra_threads";
var TABLE_TRACES = "mastra_traces";

// src/logger/index.ts
var RegisteredLogger = {
  AGENT: "AGENT",
  LLM: "LLM"};
var LogLevel = {
  INFO: "info",
  WARN: "warn"};
var Logger = class {
  logger;
  transports;
  constructor(options = {}) {
    this.transports = options.transports || {};
    const transportsAry = Object.entries(this.transports);
    this.logger = pino(
      {
        name: options.name || "app",
        level: options.level || LogLevel.INFO,
        formatters: {
          level: (label) => {
            return {
              level: label
            };
          }
        }
      },
      options.overrideDefaultTransports ? options?.transports?.default : transportsAry.length === 0 ? pretty({
        colorize: true,
        levelFirst: true,
        ignore: "pid,hostname",
        colorizeObjects: true,
        translateTime: "SYS:standard",
        singleLine: false
      }) : pino.multistream([
        ...transportsAry.map(([_, transport]) => ({
          stream: transport,
          level: options.level || LogLevel.INFO
        })),
        {
          stream: pretty({
            colorize: true,
            levelFirst: true,
            ignore: "pid,hostname",
            colorizeObjects: true,
            translateTime: "SYS:standard",
            singleLine: false
          }),
          level: options.level || LogLevel.INFO
        }
      ])
    );
  }
  debug(message, args = {}) {
    this.logger.debug(args, message);
  }
  info(message, args = {}) {
    this.logger.info(args, message);
  }
  warn(message, args = {}) {
    this.logger.warn(args, message);
  }
  error(message, args = {}) {
    this.logger.error(args, message);
  }
  // Stream creation for process output handling
  createStream() {
    return new Transform({
      transform: (chunk, _encoding, callback) => {
        const line = chunk.toString().trim();
        if (line) {
          this.info(line);
        }
        callback(null, chunk);
      }
    });
  }
  async getLogs(transportId) {
    if (!transportId || !this.transports[transportId]) {
      return [];
    }
    return this.transports[transportId].getLogs();
  }
  async getLogsByRunId({ runId, transportId }) {
    return this.transports[transportId]?.getLogsByRunId({ runId });
  }
};
function createLogger(options) {
  return new Logger(options);
}
var noopLogger = {
  debug: () => {
  },
  info: () => {
  },
  warn: () => {
  },
  error: () => {
  },
  cleanup: async () => {
  }
};

// src/base.ts
var MastraBase = class {
  component = RegisteredLogger.LLM;
  logger;
  name;
  telemetry;
  constructor({ component, name }) {
    this.component = component || RegisteredLogger.LLM;
    this.name = name;
    this.logger = createLogger({ name: `${this.component} - ${this.name}` });
  }
  /**
   * Set the logger for the agent
   * @param logger
   */
  __setLogger(logger) {
    this.logger = logger;
    this.logger.debug(`Logger updated [component=${this.component}] [name=${this.name}]`);
  }
  /**
   * Set the telemetry for the
   * @param telemetry
   */
  __setTelemetry(telemetry) {
    this.telemetry = telemetry;
    this.logger.debug(`Telemetry updated [component=${this.component}] [tracer=${this.telemetry.tracer}]`);
  }
  /**
   * Get the telemetry on the vector
   * @returns telemetry
   */
  __getTelemetry() {
    return this.telemetry;
  }
  /* 
    get experimental_telemetry config
    */
  get experimental_telemetry() {
    return this.telemetry ? {
      // tracer: this.telemetry.tracer,
      tracer: this.telemetry.getBaggageTracer(),
      isEnabled: !!this.telemetry.tracer
    } : void 0;
  }
};

// src/tools/tool.ts
var Tool = class {
  id;
  description;
  inputSchema;
  outputSchema;
  execute;
  mastra;
  constructor(opts) {
    this.id = opts.id;
    this.description = opts.description;
    this.inputSchema = opts.inputSchema;
    this.outputSchema = opts.outputSchema;
    this.execute = opts.execute;
    this.mastra = opts.mastra;
  }
};

var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function deepMerge(target, source) {
  const output = { ...target };
  if (!source) return output;
  Object.keys(source).forEach((key) => {
    const targetValue = output[key];
    const sourceValue = source[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      output[key] = sourceValue;
    } else if (sourceValue instanceof Object && targetValue instanceof Object && !Array.isArray(sourceValue) && !Array.isArray(targetValue)) {
      output[key] = deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== void 0) {
      output[key] = sourceValue;
    }
  });
  return output;
}
function resolveSerializedZodOutput(schema) {
  return Function("z", `"use strict";return (${schema});`)(lib.z);
}
function isVercelTool(tool) {
  return !(tool instanceof Tool);
}
function createLogMessageOptions({ agentName, toolName, tool, type }) {
  if (!agentName) {
    return {
      start: `Executing tool ${toolName}`,
      error: `Failed tool execution`
    };
  }
  const prefix = `[Agent:${agentName}]`;
  const vercelPrefix = isVercelTool(tool) ? "Vercel " : "";
  const toolType = type === "toolset" ? "toolset" : "tool";
  return {
    start: `${prefix} - Executing ${vercelPrefix}${toolType} ${toolName}`,
    error: `${prefix} - Failed ${vercelPrefix}${toolType} execution`
  };
}
function createExecute(tool, options, logType) {
  const { logger, mastra: _mastra, memory: _memory, ...rest } = options;
  const { start, error } = createLogMessageOptions({
    agentName: options.agentName,
    toolName: options.name,
    tool,
    type: logType
  });
  const execFunction = async (args, execOptions) => {
    if (isVercelTool(tool)) {
      return tool?.execute?.(args, execOptions) ?? void 0;
    }
    return tool?.execute?.(
      {
        context: args,
        threadId: options.threadId,
        resourceId: options.resourceId,
        mastra: options.mastra,
        memory: options.memory,
        runId: options.runId
      },
      execOptions
    ) ?? void 0;
  };
  return async (args, execOptions) => {
    try {
      logger.debug(start, { ...rest, args });
      return await execFunction(args, execOptions);
    } catch (err) {
      logger.error(error, { ...rest, error: err, args });
      throw err;
    }
  };
}
function isZodType(value) {
  return typeof value === "object" && value !== null && "_def" in value && "parse" in value && typeof value.parse === "function" && "safeParse" in value && typeof value.safeParse === "function";
}
function createDeterministicId(input) {
  return createHash("sha256").update(input).digest("hex").slice(0, 8);
}
function setVercelToolProperties(tool) {
  const inputSchema = convertVercelToolParameters(tool);
  const toolId = !("id" in tool) ? tool.description ? `tool-${createDeterministicId(tool.description)}` : `tool-${Math.random().toString(36).substring(2, 9)}` : tool.id;
  return {
    ...tool,
    id: toolId,
    inputSchema
  };
}
function ensureToolProperties(tools) {
  const toolsWithProperties = Object.keys(tools).reduce((acc, key) => {
    const tool = tools?.[key];
    if (tool) {
      if (isVercelTool(tool)) {
        acc[key] = setVercelToolProperties(tool);
      } else {
        acc[key] = tool;
      }
    }
    return acc;
  }, {});
  return toolsWithProperties;
}
function convertVercelToolParameters(tool) {
  const schema = tool.parameters ?? lib.z.object({});
  return isZodType(schema) ? schema : resolveSerializedZodOutput(jsonSchemaToZod(schema));
}
function makeCoreTool(tool, options, logType) {
  const getParameters = () => {
    if (isVercelTool(tool)) {
      return convertVercelToolParameters(tool);
    }
    return tool.inputSchema ?? lib.z.object({});
  };
  return {
    description: tool.description,
    parameters: getParameters(),
    execute: tool.execute ? createExecute(tool, { ...options, description: tool.description }, logType) : void 0
  };
}
function createMastraProxy({ mastra, logger }) {
  return new Proxy(mastra, {
    get(target, prop) {
      const hasProp = Reflect.has(target, prop);
      if (hasProp) {
        const value = Reflect.get(target, prop);
        const isFunction = typeof value === "function";
        if (isFunction) {
          return value.bind(target);
        }
        return value;
      }
      if (prop === "logger") {
        logger.warn(`Please use 'getLogger' instead, logger is deprecated`);
        return Reflect.apply(target.getLogger, target, []);
      }
      if (prop === "telemetry") {
        logger.warn(`Please use 'getTelemetry' instead, telemetry is deprecated`);
        return Reflect.apply(target.getTelemetry, target, []);
      }
      if (prop === "storage") {
        logger.warn(`Please use 'getStorage' instead, storage is deprecated`);
        return Reflect.get(target, "storage");
      }
      if (prop === "agents") {
        logger.warn(`Please use 'getAgents' instead, agents is deprecated`);
        return Reflect.apply(target.getAgents, target, []);
      }
      if (prop === "tts") {
        logger.warn(`Please use 'getTTS' instead, tts is deprecated`);
        return Reflect.apply(target.getTTS, target, []);
      }
      if (prop === "vectors") {
        logger.warn(`Please use 'getVectors' instead, vectors is deprecated`);
        return Reflect.apply(target.getVectors, target, []);
      }
      if (prop === "memory") {
        logger.warn(`Please use 'getMemory' instead, memory is deprecated`);
        return Reflect.get(target, "memory");
      }
      return Reflect.get(target, prop);
    }
  });
}

export { LogLevel as L, MastraBase as M, RegisteredLogger as R, TABLE_TRACES as T, createMastraProxy as a, TABLE_WORKFLOW_SNAPSHOT as b, createLogger as c, delay as d, ensureToolProperties as e, TABLE_EVALS as f, TABLE_MESSAGES as g, TABLE_THREADS as h, isVercelTool as i, deepMerge as j, makeCoreTool as m, noopLogger as n };
