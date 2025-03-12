import { b as __decoratorStart, _ as __decorateElement, a as __runInitializers, I as InstrumentClass } from './chunk-C6A6W6XS.mjs';
import { M as MastraBase, R as RegisteredLogger, e as ensureToolProperties, a as createMastraProxy, m as makeCoreTool, d as delay } from './chunk-4Y74D74B.mjs';
import { randomUUID } from 'crypto';
import { jsonSchema, generateText, Output, generateObject, streamText, streamObject } from 'ai';
import { l as lib } from './_virtual__virtual-zod.mjs';
import '@opentelemetry/api';
import '@opentelemetry/core';
import '@opentelemetry/otlp-transformer';
import 'stream';
import './pino.mjs';
import 'node:os';
import 'node:events';
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
import 'pino-pretty';
import 'json-schema-to-zod';

// src/hooks/mitt.ts
function mitt(all) {
  all = all || /* @__PURE__ */ new Map();
  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,
    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler]);
      }
    },
    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        } else {
          all.set(type, []);
        }
      }
    },
    /**
     * Invoke all handlers for the given type.
     * If present, `'*'` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit(type, evt) {
      let handlers = all.get(type);
      if (handlers) {
        handlers.slice().map((handler) => {
          handler(evt);
        });
      }
      handlers = all.get("*");
      if (handlers) {
        handlers.slice().map((handler) => {
          handler(type, evt);
        });
      }
    }
  };
}
var hooks = mitt();
function executeHook(hook, data) {
  setImmediate(() => {
    hooks.emit(hook, data);
  });
}

// src/llm/model/base.ts
var MastraLLMBase = class extends MastraBase {
  // @ts-ignore
  #mastra;
  #model;
  constructor({
    name,
    model
  }) {
    super({
      component: RegisteredLogger.LLM,
      name
    });
    this.#model = model;
  }
  getProvider() {
    return this.#model.provider;
  }
  getModelId() {
    return this.#model.modelId;
  }
  getModel() {
    return this.#model;
  }
  convertToMessages(messages) {
    if (Array.isArray(messages)) {
      return messages.map(m => {
        if (typeof m === "string") {
          return {
            role: "user",
            content: m
          };
        }
        return m;
      });
    }
    return [{
      role: "user",
      content: messages
    }];
  }
  __registerPrimitives(p) {
    if (p.telemetry) {
      this.__setTelemetry(p.telemetry);
    }
    if (p.logger) {
      this.__setLogger(p.logger);
    }
    this.#mastra = p;
  }
  async __text(input) {
    this.logger.debug(`[LLMs:${this.name}] Generating text.`, {
      input
    });
    throw new Error("Method not implemented.");
  }
  async __textObject(input) {
    this.logger.debug(`[LLMs:${this.name}] Generating object.`, {
      input
    });
    throw new Error("Method not implemented.");
  }
  async generate(messages, options = {}) {
    this.logger.debug(`[LLMs:${this.name}] Generating text.`, {
      messages,
      options
    });
    throw new Error("Method not implemented.");
  }
  async __stream(input) {
    this.logger.debug(`[LLMs:${this.name}] Streaming text.`, {
      input
    });
    throw new Error("Method not implemented.");
  }
  async __streamObject(input) {
    this.logger.debug(`[LLMs:${this.name}] Streaming object.`, {
      input
    });
    throw new Error("Method not implemented.");
  }
  async stream(messages, options = {}) {
    this.logger.debug(`[LLMs:${this.name}] Streaming text.`, {
      messages,
      options
    });
    throw new Error("Method not implemented.");
  }
};
var MastraLLM = class extends MastraLLMBase {
  #model;
  #mastra;
  constructor({
    model,
    mastra
  }) {
    super({
      name: "aisdk",
      model
    });
    this.#model = model;
    if (mastra) {
      this.#mastra = mastra;
      if (mastra.logger) {
        this.__setLogger(mastra.logger);
      }
    }
  }
  __registerPrimitives(p) {
    if (p.telemetry) {
      this.__setTelemetry(p.telemetry);
    }
    if (p.logger) {
      this.__setLogger(p.logger);
    }
    this.#mastra = p;
  }
  getProvider() {
    return this.#model.provider;
  }
  getModelId() {
    return this.#model.modelId;
  }
  getModel() {
    return this.#model;
  }
  convertTools({
    tools,
    runId,
    threadId,
    resourceId,
    memory
  } = {}) {
    this.logger.debug("Starting tool conversion for LLM");
    const converted = Object.entries(tools || {}).reduce((memo, value) => {
      const k = value[0];
      const tool = value[1];
      if (tool) {
        const options = {
          name: k,
          runId,
          threadId,
          resourceId,
          logger: this.logger,
          memory,
          mastra: this.#mastra
        };
        memo[k] = makeCoreTool(tool, options);
      }
      return memo;
    }, {});
    this.logger.debug(`Converted tools for LLM`);
    return converted;
  }
  async __text({
    runId,
    messages,
    maxSteps,
    tools,
    convertedTools,
    temperature,
    toolChoice = "auto",
    onStepFinish,
    experimental_output,
    telemetry,
    threadId,
    resourceId,
    memory,
    ...rest
  }) {
    const model = this.#model;
    this.logger.debug(`[LLM] - Generating text`, {
      runId,
      messages,
      maxSteps,
      threadId,
      resourceId,
      tools: Object.keys(tools || convertedTools || {})
    });
    const finalTools = convertedTools || this.convertTools({
      tools,
      runId,
      threadId,
      resourceId,
      memory
    });
    const argsForExecute = {
      model,
      temperature,
      tools: {
        ...finalTools
      },
      toolChoice,
      maxSteps,
      onStepFinish: async props => {
        onStepFinish?.(JSON.stringify(props, null, 2));
        this.logger.debug("[LLM] - Step Change:", {
          text: props?.text,
          toolCalls: props?.toolCalls,
          toolResults: props?.toolResults,
          finishReason: props?.finishReason,
          usage: props?.usage,
          runId
        });
        if (props?.response?.headers?.["x-ratelimit-remaining-tokens"] && parseInt(props?.response?.headers?.["x-ratelimit-remaining-tokens"], 10) < 2e3) {
          this.logger.warn("Rate limit approaching, waiting 10 seconds", {
            runId
          });
          await delay(10 * 1e3);
        }
      },
      ...rest
    };
    let schema;
    if (experimental_output) {
      this.logger.debug("[LLM] - Using experimental output", {
        runId
      });
      if (typeof experimental_output.parse === "function") {
        schema = experimental_output;
        if (schema instanceof lib.z.ZodArray) {
          schema = schema._def.type;
        }
      } else {
        schema = jsonSchema(experimental_output);
      }
    }
    return await generateText({
      messages,
      ...argsForExecute,
      experimental_telemetry: {
        ...this.experimental_telemetry,
        ...telemetry
      },
      experimental_output: schema ? Output.object({
        schema
      }) : void 0
    });
  }
  async __textObject({
    messages,
    onStepFinish,
    maxSteps = 5,
    tools,
    convertedTools,
    structuredOutput,
    runId,
    temperature,
    toolChoice = "auto",
    telemetry,
    threadId,
    resourceId,
    memory,
    ...rest
  }) {
    const model = this.#model;
    this.logger.debug(`[LLM] - Generating a text object`, {
      runId
    });
    const finalTools = convertedTools || this.convertTools({
      tools,
      runId,
      threadId,
      resourceId,
      memory
    });
    const argsForExecute = {
      model,
      temperature,
      tools: {
        ...finalTools
      },
      maxSteps,
      toolChoice,
      onStepFinish: async props => {
        onStepFinish?.(JSON.stringify(props, null, 2));
        this.logger.debug("[LLM] - Step Change:", {
          text: props?.text,
          toolCalls: props?.toolCalls,
          toolResults: props?.toolResults,
          finishReason: props?.finishReason,
          usage: props?.usage,
          runId
        });
        if (props?.response?.headers?.["x-ratelimit-remaining-tokens"] && parseInt(props?.response?.headers?.["x-ratelimit-remaining-tokens"], 10) < 2e3) {
          this.logger.warn("Rate limit approaching, waiting 10 seconds", {
            runId
          });
          await delay(10 * 1e3);
        }
      },
      ...rest
    };
    let schema;
    let output = "object";
    if (typeof structuredOutput.parse === "function") {
      schema = structuredOutput;
      if (schema instanceof lib.z.ZodArray) {
        output = "array";
        schema = schema._def.type;
      }
    } else {
      schema = jsonSchema(structuredOutput);
    }
    return await generateObject({
      messages,
      ...argsForExecute,
      output,
      schema,
      experimental_telemetry: {
        ...this.experimental_telemetry,
        ...telemetry
      }
    });
  }
  async __stream({
    messages,
    onStepFinish,
    onFinish,
    maxSteps = 5,
    tools,
    convertedTools,
    runId,
    temperature,
    toolChoice = "auto",
    experimental_output,
    telemetry,
    threadId,
    resourceId,
    memory,
    ...rest
  }) {
    const model = this.#model;
    this.logger.debug(`[LLM] - Streaming text`, {
      runId,
      threadId,
      resourceId,
      messages,
      maxSteps,
      tools: Object.keys(tools || convertedTools || {})
    });
    const finalTools = convertedTools || this.convertTools({
      tools,
      runId,
      threadId,
      resourceId,
      memory
    });
    const argsForExecute = {
      model,
      temperature,
      tools: {
        ...finalTools
      },
      maxSteps,
      toolChoice,
      onStepFinish: async props => {
        onStepFinish?.(JSON.stringify(props, null, 2));
        this.logger.debug("[LLM] - Stream Step Change:", {
          text: props?.text,
          toolCalls: props?.toolCalls,
          toolResults: props?.toolResults,
          finishReason: props?.finishReason,
          usage: props?.usage,
          runId
        });
        if (props?.response?.headers?.["x-ratelimit-remaining-tokens"] && parseInt(props?.response?.headers?.["x-ratelimit-remaining-tokens"], 10) < 2e3) {
          this.logger.warn("Rate limit approaching, waiting 10 seconds", {
            runId
          });
          await delay(10 * 1e3);
        }
      },
      onFinish: async props => {
        void onFinish?.(JSON.stringify(props, null, 2));
        this.logger.debug("[LLM] - Stream Finished:", {
          text: props?.text,
          toolCalls: props?.toolCalls,
          toolResults: props?.toolResults,
          finishReason: props?.finishReason,
          usage: props?.usage,
          runId,
          threadId,
          resourceId
        });
      },
      ...rest
    };
    let schema;
    if (experimental_output) {
      this.logger.debug("[LLM] - Using experimental output", {
        runId
      });
      if (typeof experimental_output.parse === "function") {
        schema = experimental_output;
        if (schema instanceof lib.z.ZodArray) {
          schema = schema._def.type;
        }
      } else {
        schema = jsonSchema(experimental_output);
      }
    }
    return await streamText({
      messages,
      ...argsForExecute,
      experimental_telemetry: {
        ...this.experimental_telemetry,
        ...telemetry
      },
      experimental_output: schema ? Output.object({
        schema
      }) : void 0
    });
  }
  async __streamObject({
    messages,
    onStepFinish,
    onFinish,
    maxSteps = 5,
    tools,
    convertedTools,
    structuredOutput,
    runId,
    temperature,
    toolChoice = "auto",
    telemetry,
    threadId,
    resourceId,
    memory,
    ...rest
  }) {
    const model = this.#model;
    this.logger.debug(`[LLM] - Streaming structured output`, {
      runId,
      messages,
      maxSteps,
      tools: Object.keys(tools || convertedTools || {})
    });
    const finalTools = convertedTools || this.convertTools({
      tools,
      runId,
      threadId,
      resourceId,
      memory
    });
    const argsForExecute = {
      model,
      temperature,
      tools: {
        ...finalTools
      },
      maxSteps,
      toolChoice,
      onStepFinish: async props => {
        onStepFinish?.(JSON.stringify(props, null, 2));
        this.logger.debug("[LLM] - Stream Step Change:", {
          text: props?.text,
          toolCalls: props?.toolCalls,
          toolResults: props?.toolResults,
          finishReason: props?.finishReason,
          usage: props?.usage,
          runId,
          threadId,
          resourceId
        });
        if (props?.response?.headers?.["x-ratelimit-remaining-tokens"] && parseInt(props?.response?.headers?.["x-ratelimit-remaining-tokens"], 10) < 2e3) {
          this.logger.warn("Rate limit approaching, waiting 10 seconds", {
            runId
          });
          await delay(10 * 1e3);
        }
      },
      onFinish: async props => {
        void onFinish?.(JSON.stringify(props, null, 2));
        this.logger.debug("[LLM] - Stream Finished:", {
          text: props?.text,
          toolCalls: props?.toolCalls,
          toolResults: props?.toolResults,
          finishReason: props?.finishReason,
          usage: props?.usage,
          runId,
          threadId,
          resourceId
        });
      },
      ...rest
    };
    let schema;
    let output = "object";
    if (typeof structuredOutput.parse === "function") {
      schema = structuredOutput;
      if (schema instanceof lib.z.ZodArray) {
        output = "array";
        schema = schema._def.type;
      }
    } else {
      schema = jsonSchema(structuredOutput);
    }
    return streamObject({
      messages,
      ...argsForExecute,
      output,
      schema,
      experimental_telemetry: {
        ...this.experimental_telemetry,
        ...telemetry
      }
    });
  }
  async generate(messages, {
    maxSteps = 5,
    onStepFinish,
    tools,
    convertedTools,
    runId,
    output,
    temperature,
    telemetry,
    memory,
    ...rest
  } = {}) {
    const msgs = this.convertToMessages(messages);
    if (!output) {
      return await this.__text({
        messages: msgs,
        onStepFinish,
        maxSteps,
        tools,
        convertedTools,
        runId,
        temperature,
        memory,
        ...rest
      });
    }
    return await this.__textObject({
      messages: msgs,
      structuredOutput: output,
      onStepFinish,
      maxSteps,
      tools,
      convertedTools,
      runId,
      telemetry,
      memory,
      ...rest
    });
  }
  async stream(messages, {
    maxSteps = 5,
    onFinish,
    onStepFinish,
    tools,
    convertedTools,
    runId,
    output,
    temperature,
    telemetry,
    ...rest
  } = {}) {
    const msgs = this.convertToMessages(messages);
    if (!output) {
      return await this.__stream({
        messages: msgs,
        onStepFinish,
        onFinish,
        maxSteps,
        tools,
        convertedTools,
        runId,
        temperature,
        telemetry,
        ...rest
      });
    }
    return await this.__streamObject({
      messages: msgs,
      structuredOutput: output,
      onStepFinish,
      onFinish,
      maxSteps,
      tools,
      convertedTools,
      runId,
      temperature,
      telemetry,
      ...rest
    });
  }
};

// src/agent/index.ts
var _Agent_decorators, _init, _a;
_Agent_decorators = [InstrumentClass({
  prefix: "agent",
  excludeMethods: ["__setTools", "__setLogger", "__setTelemetry", "log"]
})];
var Agent = class extends (_a = MastraBase) {
  name;
  llm;
  instructions;
  model;
  #mastra;
  #memory;
  tools;
  /** @deprecated This property is deprecated. Use evals instead. */
  metrics;
  evals;
  voice;
  constructor(config) {
    super({
      component: RegisteredLogger.AGENT
    });
    this.name = config.name;
    this.instructions = config.instructions;
    if (!config.model) {
      throw new Error(`LanguageModel is required to create an Agent. Please provide the 'model'.`);
    }
    this.llm = new MastraLLM({
      model: config.model
    });
    this.tools = {};
    this.metrics = {};
    this.evals = {};
    if (config.tools) {
      this.tools = ensureToolProperties(config.tools);
    }
    if (config.mastra) {
      this.__registerPrimitives({
        telemetry: config.mastra.getTelemetry(),
        logger: config.mastra.getLogger()
      });
    }
    if (config.metrics) {
      this.logger.warn("The metrics property is deprecated. Please use evals instead to add evaluation metrics.");
      this.metrics = config.metrics;
      this.evals = config.metrics;
    }
    if (config.evals) {
      this.evals = config.evals;
    }
    if (config.memory) {
      this.#memory = config.memory;
    }
    if (config.voice) {
      this.voice = config.voice;
    }
  }
  hasOwnMemory() {
    return Boolean(this.#memory);
  }
  getMemory() {
    return this.#memory ?? this.#mastra?.memory;
  }
  __updateInstructions(newInstructions) {
    this.instructions = newInstructions;
    this.logger.debug(`[Agents:${this.name}] Instructions updated.`, {
      model: this.model,
      name: this.name
    });
  }
  __registerPrimitives(p) {
    if (p.telemetry) {
      this.__setTelemetry(p.telemetry);
    }
    if (p.logger) {
      this.__setLogger(p.logger);
    }
    this.llm.__registerPrimitives(p);
    this.logger.debug(`[Agents:${this.name}] initialized.`, {
      model: this.model,
      name: this.name
    });
  }
  __registerMastra(mastra) {
    this.#mastra = mastra;
  }
  /**
   * Set the concrete tools for the agent
   * @param tools
   */
  __setTools(tools) {
    this.tools = tools;
    this.logger.debug(`[Agents:${this.name}] Tools set for agent ${this.name}`, {
      model: this.model,
      name: this.name
    });
  }
  async generateTitleFromUserMessage({
    message
  }) {
    const {
      text
    } = await this.llm.__text({
      messages: [{
        role: "system",
        content: `

      - you will generate a short title based on the first message a user begins a conversation with
      - ensure it is not more than 80 characters long
      - the title should be a summary of the user's message
      - do not use quotes or colons
      - the entire text you return will be used as the title`
      }, {
        role: "user",
        content: JSON.stringify(message)
      }]
    });
    const cleanedText = text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    return cleanedText;
  }
  getMostRecentUserMessage(messages) {
    const userMessages = messages.filter(message => message.role === "user");
    return userMessages.at(-1);
  }
  async genTitle(userMessage) {
    let title = `New Thread ${(/* @__PURE__ */new Date()).toISOString()}`;
    try {
      if (userMessage) {
        title = await this.generateTitleFromUserMessage({
          message: userMessage
        });
      }
    } catch (e) {
      console.error("Error generating title:", e);
    }
    return title;
  }
  async saveMemory({
    threadId,
    memoryConfig,
    resourceId,
    userMessages,
    runId
  }) {
    const userMessage = this.getMostRecentUserMessage(userMessages);
    const memory = this.getMemory();
    if (memory) {
      const config = memory.getMergedThreadConfig(memoryConfig);
      let thread;
      if (!threadId) {
        this.logger.debug(`No threadId, creating new thread for agent ${this.name}`, {
          runId: runId || this.name
        });
        const title = config?.threads?.generateTitle ? await this.genTitle(userMessage) : void 0;
        thread = await memory.createThread({
          threadId,
          resourceId,
          memoryConfig,
          title
        });
      } else {
        thread = await memory.getThreadById({
          threadId
        });
        if (!thread) {
          this.logger.debug(`Thread with id ${threadId} not found, creating new thread for agent ${this.name}`, {
            runId: runId || this.name
          });
          const title = config?.threads?.generateTitle ? await this.genTitle(userMessage) : void 0;
          thread = await memory.createThread({
            threadId,
            resourceId,
            title,
            memoryConfig
          });
        }
      }
      const newMessages = userMessage ? [userMessage] : userMessages;
      if (thread) {
        const messages = newMessages.map(u => {
          return {
            id: this.getMemory()?.generateId(),
            createdAt: /* @__PURE__ */new Date(),
            threadId: thread.id,
            ...u,
            content: u.content,
            role: u.role,
            type: "text"
          };
        });
        const memoryMessages = threadId && memory ? (await memory.rememberMessages({
          threadId,
          resourceId,
          config: memoryConfig,
          vectorMessageSearch: messages.slice(-1).map(m => {
            if (typeof m === `string`) {
              return m;
            }
            return m?.content || ``;
          }).join(`
`)
        })).messages : [];
        if (memory) {
          await memory.saveMessages({
            messages,
            memoryConfig
          });
        }
        this.logger.debug("Saved messages to memory", {
          threadId: thread.id,
          runId
        });
        const memorySystemMessage = memory && threadId ? await memory.getSystemMessage({
          threadId,
          memoryConfig
        }) : null;
        return {
          threadId: thread.id,
          messages: [memorySystemMessage ? {
            role: "system",
            content: memorySystemMessage
          } : null, ...this.sanitizeResponseMessages(memoryMessages), ...newMessages].filter(message => Boolean(message))
        };
      }
      return {
        threadId: thread?.id || threadId || "",
        messages: userMessages
      };
    }
    return {
      threadId: threadId || "",
      messages: userMessages
    };
  }
  async saveResponse({
    result,
    threadId,
    resourceId,
    runId,
    memoryConfig
  }) {
    const {
      response
    } = result;
    try {
      if (response.messages) {
        const ms = Array.isArray(response.messages) ? response.messages : [response.messages];
        const responseMessagesWithoutIncompleteToolCalls = this.sanitizeResponseMessages(ms);
        const memory = this.getMemory();
        if (memory) {
          this.logger.debug(`[Agent:${this.name}] - Memory persistence: store=${this.getMemory()?.constructor.name} threadId=${threadId}`, {
            runId,
            resourceId,
            threadId,
            memoryStore: this.getMemory()?.constructor.name
          });
          await memory.saveMessages({
            memoryConfig,
            messages: responseMessagesWithoutIncompleteToolCalls.map((message, index) => {
              const messageId = randomUUID();
              let toolCallIds;
              let toolCallArgs;
              let toolNames;
              let type = "text";
              if (message.role === "tool") {
                toolCallIds = message.content.map(content => content.toolCallId);
                type = "tool-result";
              }
              if (message.role === "assistant") {
                const assistantContent = message.content;
                const assistantToolCalls = assistantContent.map(content => {
                  if (content.type === "tool-call") {
                    return {
                      toolCallId: content.toolCallId,
                      toolArgs: content.args,
                      toolName: content.toolName
                    };
                  }
                  return void 0;
                })?.filter(Boolean);
                toolCallIds = assistantToolCalls?.map(toolCall => toolCall.toolCallId);
                toolCallArgs = assistantToolCalls?.map(toolCall => toolCall.toolArgs);
                toolNames = assistantToolCalls?.map(toolCall => toolCall.toolName);
                type = assistantContent?.[0]?.type;
              }
              return {
                id: messageId,
                threadId,
                role: message.role,
                content: message.content,
                createdAt: new Date(Date.now() + index),
                // use Date.now() + index to make sure every message is atleast one millisecond apart
                toolCallIds: toolCallIds?.length ? toolCallIds : void 0,
                toolCallArgs: toolCallArgs?.length ? toolCallArgs : void 0,
                toolNames: toolNames?.length ? toolNames : void 0,
                type
              };
            })
          });
        }
      }
    } catch (err) {
      this.logger.error(`[Agent:${this.name}] - Failed to save assistant response`, {
        error: err,
        runId
      });
    }
  }
  sanitizeResponseMessages(messages) {
    let toolResultIds = [];
    let toolCallIds = [];
    for (const message of messages) {
      if (!Array.isArray(message.content)) continue;
      if (message.role === "tool") {
        for (const content of message.content) {
          if (content.type === "tool-result") {
            toolResultIds.push(content.toolCallId);
          }
        }
      } else if (message.role === "assistant" || message.role === "user") {
        for (const content of message.content) {
          if (typeof content !== `string`) {
            if (content.type === `tool-call`) {
              toolCallIds.push(content.toolCallId);
            }
          }
        }
      }
    }
    const messagesBySanitizedContent = messages.map(message => {
      if (message.role !== "assistant" && message.role !== `tool` && message.role !== `user`) return message;
      if (!message.content || typeof message.content === "string" || typeof message.content === "number") {
        return message;
      }
      const sanitizedContent = message.content.filter(content => {
        if (content.type === `tool-call`) {
          return toolResultIds.includes(content.toolCallId);
        }
        if (content.type === `text`) {
          return content.text.trim() !== ``;
        }
        if (content.type === `tool-result`) {
          return toolCallIds.includes(content.toolCallId);
        }
        return true;
      });
      return {
        ...message,
        content: sanitizedContent
      };
    });
    return messagesBySanitizedContent.filter(message => {
      if (typeof message.content === `string`) {
        return message.content !== "";
      }
      if (Array.isArray(message.content)) {
        return message.content.length && message.content.every(c => {
          if (c.type === `text`) {
            return c.text && c.text !== "";
          }
          return true;
        });
      }
      return true;
    });
  }
  convertTools({
    toolsets,
    threadId,
    resourceId,
    runId
  }) {
    this.logger.debug(`[Agents:${this.name}] - Assigning tools`, {
      runId,
      threadId,
      resourceId
    });
    const memory = this.getMemory();
    const memoryTools = memory?.getTools?.();
    let mastraProxy = void 0;
    const logger = this.logger;
    if (this.#mastra) {
      mastraProxy = createMastraProxy({
        mastra: this.#mastra,
        logger
      });
    }
    const converted = Object.entries(this.tools || {}).reduce((memo, value) => {
      const k = value[0];
      const tool = this.tools[k];
      if (tool) {
        const options = {
          name: k,
          runId,
          threadId,
          resourceId,
          logger: this.logger,
          mastra: mastraProxy,
          memory,
          agentName: this.name
        };
        memo[k] = makeCoreTool(tool, options);
      }
      return memo;
    }, {});
    const convertedMemoryTools = memoryTools ? Object.entries(memoryTools).reduce((memo, [k, tool]) => {
      memo[k] = {
        description: tool.description,
        parameters: tool.parameters,
        execute: typeof tool?.execute === "function" ? async (args, options) => {
          try {
            this.logger.debug(`[Agent:${this.name}] - Executing memory tool ${k}`, {
              name: k,
              description: tool.description,
              args,
              runId,
              threadId,
              resourceId
            });
            return tool?.execute?.({
              context: args,
              mastra: mastraProxy,
              memory,
              runId,
              threadId,
              resourceId
            }, options) ?? void 0;
          } catch (err) {
            this.logger.error(`[Agent:${this.name}] - Failed memory tool execution`, {
              error: err,
              runId,
              threadId,
              resourceId
            });
            throw err;
          }
        } : void 0
      };
      return memo;
    }, {}) : {};
    const toolsFromToolsetsConverted = {
      ...converted,
      ...convertedMemoryTools
    };
    const toolsFromToolsets = Object.values(toolsets || {});
    if (toolsFromToolsets.length > 0) {
      this.logger.debug(`[Agent:${this.name}] - Adding tools from toolsets ${Object.keys(toolsets || {}).join(", ")}`, {
        runId
      });
      toolsFromToolsets.forEach(toolset => {
        Object.entries(toolset).forEach(([toolName, tool]) => {
          const toolObj = tool;
          const options = {
            name: toolName,
            runId,
            threadId,
            resourceId,
            logger: this.logger,
            agentName: this.name
          };
          toolsFromToolsetsConverted[toolName] = makeCoreTool(toolObj, options, "toolset");
        });
      });
    }
    return toolsFromToolsetsConverted;
  }
  async preExecute({
    resourceId,
    runId,
    threadId,
    memoryConfig,
    messages
  }) {
    let coreMessages = [];
    let threadIdToUse = threadId;
    this.logger.debug(`Saving user messages in memory for agent ${this.name}`, {
      runId
    });
    const saveMessageResponse = await this.saveMemory({
      threadId,
      resourceId,
      userMessages: messages,
      memoryConfig
    });
    coreMessages = saveMessageResponse.messages;
    threadIdToUse = saveMessageResponse.threadId;
    return {
      coreMessages,
      threadIdToUse
    };
  }
  __primitive({
    messages,
    context,
    threadId,
    memoryConfig,
    resourceId,
    runId,
    toolsets
  }) {
    return {
      before: async () => {
        if (process.env.NODE_ENV !== "test") {
          this.logger.debug(`[Agents:${this.name}] - Starting generation`, {
            runId
          });
        }
        const systemMessage = {
          role: "system",
          content: `${this.instructions}.`
        };
        let coreMessages = messages;
        let threadIdToUse = threadId;
        const memory = this.getMemory();
        if (threadId && memory && !resourceId) {
          throw new Error(`A resourceId must be provided when passing a threadId and using Memory. Saw threadId ${threadId} but resourceId is ${resourceId}`);
        }
        if (memory && resourceId) {
          this.logger.debug(`[Agent:${this.name}] - Memory persistence enabled: store=${this.getMemory()?.constructor.name}, resourceId=${resourceId}`, {
            runId,
            resourceId,
            threadId: threadIdToUse,
            memoryStore: this.getMemory()?.constructor.name
          });
          const preExecuteResult = await this.preExecute({
            resourceId,
            runId,
            threadId: threadIdToUse,
            memoryConfig,
            messages
          });
          coreMessages = preExecuteResult.coreMessages;
          threadIdToUse = preExecuteResult.threadIdToUse;
        }
        let convertedTools;
        if (toolsets && Object.keys(toolsets || {}).length > 0 || this.getMemory() && resourceId) {
          const reasons = [];
          if (toolsets && Object.keys(toolsets || {}).length > 0) {
            reasons.push(`toolsets present (${Object.keys(toolsets || {}).length} tools)`);
          }
          if (this.getMemory() && resourceId) {
            reasons.push("memory and resourceId available");
          }
          this.logger.debug(`[Agent:${this.name}] - Enhancing tools: ${reasons.join(", ")}`, {
            runId,
            toolsets: toolsets ? Object.keys(toolsets) : void 0,
            hasMemory: !!this.getMemory(),
            hasResourceId: !!resourceId
          });
          convertedTools = this.convertTools({
            toolsets,
            threadId: threadIdToUse,
            resourceId,
            runId
          });
        }
        const messageObjects = [systemMessage, ...(context || []), ...coreMessages];
        return {
          messageObjects,
          convertedTools,
          threadId: threadIdToUse
        };
      },
      after: async ({
        result,
        threadId: threadId2,
        memoryConfig: memoryConfig2,
        outputText,
        runId: runId2
      }) => {
        const resToLog = {
          text: result?.text,
          object: result?.object,
          toolResults: result?.toolResults,
          toolCalls: result?.toolCalls,
          usage: result?.usage,
          steps: result?.steps?.map(s => {
            return {
              stepType: s?.stepType,
              text: result?.text,
              object: result?.object,
              toolResults: result?.toolResults,
              toolCalls: result?.toolCalls,
              usage: result?.usage
            };
          })
        };
        this.logger.debug(`[Agent:${this.name}] - Post processing LLM response`, {
          runId: runId2,
          result: resToLog,
          threadId: threadId2
        });
        if (this.getMemory() && resourceId) {
          try {
            await this.saveResponse({
              result,
              threadId: threadId2,
              resourceId,
              memoryConfig: memoryConfig2,
              runId: runId2
            });
          } catch (e) {
            this.logger.error("Error saving response", {
              error: e,
              runId: runId2,
              result: resToLog,
              threadId: threadId2
            });
          }
        }
        if (Object.keys(this.evals || {}).length > 0) {
          const input = messages.map(message => message.content).join("\n");
          const runIdToUse = runId2 || crypto.randomUUID();
          for (const metric of Object.values(this.evals || {})) {
            executeHook("onGeneration" /* ON_GENERATION */, {
              input,
              output: outputText,
              runId: runIdToUse,
              metric,
              agentName: this.name,
              instructions: this.instructions
            });
          }
        }
      }
    };
  }
  async generate(messages, {
    context,
    threadId: threadIdInFn,
    memoryOptions,
    resourceId,
    maxSteps = 5,
    onStepFinish,
    runId,
    output,
    toolsets,
    temperature,
    toolChoice = "auto",
    experimental_output,
    telemetry,
    ...rest
  } = {}) {
    let messagesToUse = [];
    if (typeof messages === `string`) {
      messagesToUse = [{
        role: "user",
        content: messages
      }];
    } else {
      messagesToUse = messages.map(message => {
        if (typeof message === `string`) {
          return {
            role: "user",
            content: message
          };
        }
        return message;
      });
    }
    const runIdToUse = runId || randomUUID();
    const {
      before,
      after
    } = this.__primitive({
      messages: messagesToUse,
      context,
      threadId: threadIdInFn,
      memoryConfig: memoryOptions,
      resourceId,
      runId: runIdToUse,
      toolsets
    });
    const {
      threadId,
      messageObjects,
      convertedTools
    } = await before();
    if (!output && experimental_output) {
      const result2 = await this.llm.__text({
        messages: messageObjects,
        tools: this.tools,
        convertedTools,
        onStepFinish,
        maxSteps: maxSteps || 5,
        runId: runIdToUse,
        temperature,
        toolChoice: toolChoice || "auto",
        experimental_output,
        threadId,
        resourceId,
        memory: this.getMemory(),
        ...rest
      });
      const outputText2 = result2.text;
      await after({
        result: result2,
        threadId,
        memoryConfig: memoryOptions,
        outputText: outputText2,
        runId: runIdToUse
      });
      const newResult = result2;
      newResult.object = result2.experimental_output;
      return newResult;
    }
    if (!output) {
      const result2 = await this.llm.__text({
        messages: messageObjects,
        tools: this.tools,
        convertedTools,
        onStepFinish,
        maxSteps,
        runId: runIdToUse,
        temperature,
        toolChoice,
        telemetry,
        threadId,
        resourceId,
        memory: this.getMemory(),
        ...rest
      });
      const outputText2 = result2.text;
      await after({
        result: result2,
        threadId,
        memoryConfig: memoryOptions,
        outputText: outputText2,
        runId: runIdToUse
      });
      return result2;
    }
    const result = await this.llm.__textObject({
      messages: messageObjects,
      tools: this.tools,
      structuredOutput: output,
      convertedTools,
      onStepFinish,
      maxSteps,
      runId: runIdToUse,
      temperature,
      toolChoice,
      telemetry,
      memory: this.getMemory(),
      ...rest
    });
    const outputText = JSON.stringify(result.object);
    await after({
      result,
      threadId,
      memoryConfig: memoryOptions,
      outputText,
      runId: runIdToUse
    });
    return result;
  }
  async stream(messages, {
    context,
    threadId: threadIdInFn,
    memoryOptions,
    resourceId,
    maxSteps = 5,
    onFinish,
    onStepFinish,
    runId,
    toolsets,
    output,
    temperature,
    toolChoice = "auto",
    experimental_output,
    telemetry,
    ...rest
  } = {}) {
    const runIdToUse = runId || randomUUID();
    let messagesToUse = [];
    if (typeof messages === `string`) {
      messagesToUse = [{
        role: "user",
        content: messages
      }];
    } else {
      messagesToUse = messages.map(message => {
        if (typeof message === `string`) {
          return {
            role: "user",
            content: message
          };
        }
        return message;
      });
    }
    const {
      before,
      after
    } = this.__primitive({
      messages: messagesToUse,
      context,
      threadId: threadIdInFn,
      memoryConfig: memoryOptions,
      resourceId,
      runId: runIdToUse,
      toolsets
    });
    const {
      threadId,
      messageObjects,
      convertedTools
    } = await before();
    if (!output && experimental_output) {
      this.logger.debug(`Starting agent ${this.name} llm stream call`, {
        runId
      });
      const streamResult = await this.llm.__stream({
        messages: messageObjects,
        temperature,
        tools: this.tools,
        convertedTools,
        onStepFinish,
        onFinish: async result => {
          try {
            const res = JSON.parse(result) || {};
            const outputText = res.text;
            await after({
              result: res,
              threadId,
              memoryConfig: memoryOptions,
              outputText,
              runId: runIdToUse
            });
          } catch (e) {
            this.logger.error("Error saving memory on finish", {
              error: e,
              runId
            });
          }
          onFinish?.(result);
        },
        maxSteps,
        runId: runIdToUse,
        toolChoice,
        experimental_output,
        memory: this.getMemory(),
        ...rest
      });
      const newStreamResult = streamResult;
      newStreamResult.partialObjectStream = streamResult.experimental_partialOutputStream;
      return newStreamResult;
    } else if (!output) {
      this.logger.debug(`Starting agent ${this.name} llm stream call`, {
        runId
      });
      return this.llm.__stream({
        messages: messageObjects,
        temperature,
        tools: this.tools,
        convertedTools,
        onStepFinish,
        onFinish: async result => {
          try {
            const res = JSON.parse(result) || {};
            const outputText = res.text;
            await after({
              result: res,
              threadId,
              memoryConfig: memoryOptions,
              outputText,
              runId: runIdToUse
            });
          } catch (e) {
            this.logger.error("Error saving memory on finish", {
              error: e,
              runId
            });
          }
          onFinish?.(result);
        },
        maxSteps,
        runId: runIdToUse,
        toolChoice,
        telemetry,
        memory: this.getMemory(),
        ...rest
      });
    }
    this.logger.debug(`Starting agent ${this.name} llm streamObject call`, {
      runId
    });
    return this.llm.__streamObject({
      messages: messageObjects,
      tools: this.tools,
      temperature,
      structuredOutput: output,
      convertedTools,
      onStepFinish,
      onFinish: async result => {
        try {
          const res = JSON.parse(result) || {};
          const outputText = JSON.stringify(res.object);
          await after({
            result: res,
            threadId,
            memoryConfig: memoryOptions,
            outputText,
            runId: runIdToUse
          });
        } catch (e) {
          this.logger.error("Error saving memory on finish", {
            error: e,
            runId
          });
        }
        onFinish?.(result);
      },
      runId: runIdToUse,
      toolChoice,
      telemetry,
      memory: this.getMemory(),
      ...rest
    });
  }
  /**
   * Convert text to speech using the configured voice provider
   * @param input Text or text stream to convert to speech
   * @param options Speech options including speaker and provider-specific options
   * @returns Audio stream
   */
  async speak(input, options) {
    if (!this.voice) {
      throw new Error("No voice provider configured");
    }
    try {
      return this.voice.speak(input, options);
    } catch (e) {
      this.logger.error("Error during agent speak", {
        error: e
      });
      throw e;
    }
  }
  /**
   * Convert speech to text using the configured voice provider
   * @param audioStream Audio stream to transcribe
   * @param options Provider-specific transcription options
   * @returns Text or text stream
   */
  async listen(audioStream, options) {
    if (!this.voice) {
      throw new Error("No voice provider configured");
    }
    try {
      return this.voice.listen(audioStream, options);
    } catch (e) {
      this.logger.error("Error during agent listen", {
        error: e
      });
      throw e;
    }
  }
  /**
   * Get a list of available speakers from the configured voice provider
   * @throws {Error} If no voice provider is configured
   * @returns {Promise<Array<{voiceId: string}>>} List of available speakers
   */
  async getSpeakers() {
    if (!this.voice) {
      throw new Error("No voice provider configured");
    }
    try {
      return await this.voice.getSpeakers();
    } catch (e) {
      this.logger.error("Error during agent getSpeakers", {
        error: e
      });
      throw e;
    }
  }
};
Agent = /*@__PURE__*/(_ => {
  _init = __decoratorStart(_a);
  Agent = __decorateElement(_init, 0, "Agent", _Agent_decorators, Agent);
  __runInitializers(_init, 1, Agent);
  return Agent;
})();

export { Agent };
