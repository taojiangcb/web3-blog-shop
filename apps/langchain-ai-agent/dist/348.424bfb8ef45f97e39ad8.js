"use strict";
exports.id = 348;
exports.ids = [348];
exports.modules = {

/***/ 372:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ _isToolCall),
/* harmony export */   q: () => (/* binding */ ToolInputParsingException)
/* harmony export */ });
function _isToolCall(toolCall) {
    return !!(toolCall &&
        typeof toolCall === "object" &&
        "type" in toolCall &&
        toolCall.type === "tool_call");
}
/**
 * Custom error class used to handle exceptions related to tool input parsing.
 * It extends the built-in `Error` class and adds an optional `output`
 * property that can hold the output that caused the exception.
 */
class ToolInputParsingException extends Error {
    constructor(message, output) {
        super(message);
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.output = output;
    }
}


/***/ }),

/***/ 521:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NK: () => (/* binding */ BaseCallbackHandler),
/* harmony export */   zr: () => (/* binding */ isBaseCallbackHandler)
/* harmony export */ });
/* unused harmony export callbackHandlerPrefersStreaming */
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9883);
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5374);
/* harmony import */ var _utils_env_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4216);



/**
 * Abstract class that provides a set of optional methods that can be
 * overridden in derived classes to handle various events during the
 * execution of a LangChain application.
 */
class BaseCallbackHandlerMethodsClass {
}
function callbackHandlerPrefersStreaming(x) {
    return "lc_prefer_streaming" in x && x.lc_prefer_streaming;
}
/**
 * Abstract base class for creating callback handlers in the LangChain
 * framework. It provides a set of optional methods that can be overridden
 * in derived classes to handle various events during the execution of a
 * LangChain application.
 */
class BaseCallbackHandler extends BaseCallbackHandlerMethodsClass {
    get lc_namespace() {
        return ["langchain_core", "callbacks", this.name];
    }
    get lc_secrets() {
        return undefined;
    }
    get lc_attributes() {
        return undefined;
    }
    get lc_aliases() {
        return undefined;
    }
    get lc_serializable_keys() {
        return undefined;
    }
    /**
     * The name of the serializable. Override to provide an alias or
     * to preserve the serialized module name in minified environments.
     *
     * Implemented as a static method to support loading logic.
     */
    static lc_name() {
        return this.name;
    }
    /**
     * The final serialized identifier for the module.
     */
    get lc_id() {
        return [
            ...this.lc_namespace,
            (0,_load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .get_lc_unique_name */ .Z)(this.constructor),
        ];
    }
    constructor(input) {
        super();
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ignoreLLM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreRetriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreCustomEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "raiseError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "awaitHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0,_utils_env_js__WEBPACK_IMPORTED_MODULE_1__/* .getEnvironmentVariable */ .Az)("LANGCHAIN_CALLBACKS_BACKGROUND") === "false"
        });
        this.lc_kwargs = input || {};
        if (input) {
            this.ignoreLLM = input.ignoreLLM ?? this.ignoreLLM;
            this.ignoreChain = input.ignoreChain ?? this.ignoreChain;
            this.ignoreAgent = input.ignoreAgent ?? this.ignoreAgent;
            this.ignoreRetriever = input.ignoreRetriever ?? this.ignoreRetriever;
            this.ignoreCustomEvent =
                input.ignoreCustomEvent ?? this.ignoreCustomEvent;
            this.raiseError = input.raiseError ?? this.raiseError;
            this.awaitHandlers =
                this.raiseError || (input._awaitHandler ?? this.awaitHandlers);
        }
    }
    copy() {
        return new this.constructor(this);
    }
    toJSON() {
        return _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .y.prototype.toJSON.call(this);
    }
    toJSONNotImplemented() {
        return _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .y.prototype.toJSONNotImplemented.call(this);
    }
    static fromMethods(methods) {
        class Handler extends BaseCallbackHandler {
            constructor() {
                super();
                Object.defineProperty(this, "name", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: uuid__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A()
                });
                Object.assign(this, methods);
            }
        }
        return new Handler();
    }
}
const isBaseCallbackHandler = (x) => {
    const callbackHandler = x;
    return (callbackHandler !== undefined &&
        typeof callbackHandler.copy === "function" &&
        typeof callbackHandler.name === "string" &&
        typeof callbackHandler.awaitHandlers === "boolean");
};


/***/ }),

/***/ 662:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Td: () => (/* binding */ CallbackManager),
  tW: () => (/* binding */ ensureHandler),
  H_: () => (/* binding */ parseCallbackConfigArg)
});

// UNUSED EXPORTS: BaseCallbackManager, BaseRunManager, CallbackManagerForChainRun, CallbackManagerForLLMRun, CallbackManagerForRetrieverRun, CallbackManagerForToolRun, TraceGroup, traceAsGroup

// EXTERNAL MODULE: ./node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/v4.js + 1 modules
var v4 = __webpack_require__(9883);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/callbacks/base.js
var base = __webpack_require__(521);
// EXTERNAL MODULE: ./node_modules/.pnpm/ansi-styles@5.2.0/node_modules/ansi-styles/index.js
var ansi_styles = __webpack_require__(8958);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tracers/base.js
var tracers_base = __webpack_require__(4423);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tracers/console.js


function wrap(style, text) {
    return `${style.open}${text}${style.close}`;
}
function tryJsonStringify(obj, fallback) {
    try {
        return JSON.stringify(obj, null, 2);
    }
    catch (err) {
        return fallback;
    }
}
function formatKVMapItem(value) {
    if (typeof value === "string") {
        return value.trim();
    }
    if (value === null || value === undefined) {
        return value;
    }
    return tryJsonStringify(value, value.toString());
}
function elapsed(run) {
    if (!run.end_time)
        return "";
    const elapsed = run.end_time - run.start_time;
    if (elapsed < 1000) {
        return `${elapsed}ms`;
    }
    return `${(elapsed / 1000).toFixed(2)}s`;
}
const { color } = ansi_styles;
/**
 * A tracer that logs all events to the console. It extends from the
 * `BaseTracer` class and overrides its methods to provide custom logging
 * functionality.
 * @example
 * ```typescript
 *
 * const llm = new ChatAnthropic({
 *   temperature: 0,
 *   tags: ["example", "callbacks", "constructor"],
 *   callbacks: [new ConsoleCallbackHandler()],
 * });
 *
 * ```
 */
class ConsoleCallbackHandler extends tracers_base/* BaseTracer */.J {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "console_callback_handler"
        });
    }
    /**
     * Method used to persist the run. In this case, it simply returns a
     * resolved promise as there's no persistence logic.
     * @param _run The run to persist.
     * @returns A resolved promise.
     */
    persistRun(_run) {
        return Promise.resolve();
    }
    // utility methods
    /**
     * Method used to get all the parent runs of a given run.
     * @param run The run whose parents are to be retrieved.
     * @returns An array of parent runs.
     */
    getParents(run) {
        const parents = [];
        let currentRun = run;
        while (currentRun.parent_run_id) {
            const parent = this.runMap.get(currentRun.parent_run_id);
            if (parent) {
                parents.push(parent);
                currentRun = parent;
            }
            else {
                break;
            }
        }
        return parents;
    }
    /**
     * Method used to get a string representation of the run's lineage, which
     * is used in logging.
     * @param run The run whose lineage is to be retrieved.
     * @returns A string representation of the run's lineage.
     */
    getBreadcrumbs(run) {
        const parents = this.getParents(run).reverse();
        const string = [...parents, run]
            .map((parent, i, arr) => {
            const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
            return i === arr.length - 1 ? wrap(ansi_styles.bold, name) : name;
        })
            .join(" > ");
        return wrap(color.grey, string);
    }
    // logging methods
    /**
     * Method used to log the start of a chain run.
     * @param run The chain run that has started.
     * @returns void
     */
    onChainStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[chain/start]")} [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of a chain run.
     * @param run The chain run that has ended.
     * @returns void
     */
    onChainEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[chain/end]")} [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
    }
    /**
     * Method used to log any errors of a chain run.
     * @param run The chain run that has errored.
     * @returns void
     */
    onChainError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[chain/error]")} [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of an LLM run.
     * @param run The LLM run that has started.
     * @returns void
     */
    onLLMStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        const inputs = "prompts" in run.inputs
            ? { prompts: run.inputs.prompts.map((p) => p.trim()) }
            : run.inputs;
        console.log(`${wrap(color.green, "[llm/start]")} [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of an LLM run.
     * @param run The LLM run that has ended.
     * @returns void
     */
    onLLMEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[llm/end]")} [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, "[response]")}`);
    }
    /**
     * Method used to log any errors of an LLM run.
     * @param run The LLM run that has errored.
     * @returns void
     */
    onLLMError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[llm/error]")} [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of a tool run.
     * @param run The tool run that has started.
     * @returns void
     */
    onToolStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[tool/start]")} [${crumbs}] Entering Tool run with input: "${formatKVMapItem(run.inputs.input)}"`);
    }
    /**
     * Method used to log the end of a tool run.
     * @param run The tool run that has ended.
     * @returns void
     */
    onToolEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[tool/end]")} [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${formatKVMapItem(run.outputs?.output)}"`);
    }
    /**
     * Method used to log any errors of a tool run.
     * @param run The tool run that has errored.
     * @returns void
     */
    onToolError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[tool/error]")} [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of a retriever run.
     * @param run The retriever run that has started.
     * @returns void
     */
    onRetrieverStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[retriever/start]")} [${crumbs}] Entering Retriever run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of a retriever run.
     * @param run The retriever run that has ended.
     * @returns void
     */
    onRetrieverEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[retriever/end]")} [${crumbs}] [${elapsed(run)}] Exiting Retriever run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
    }
    /**
     * Method used to log any errors of a retriever run.
     * @param run The retriever run that has errored.
     * @returns void
     */
    onRetrieverError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[retriever/error]")} [${crumbs}] [${elapsed(run)}] Retriever run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the action selected by the agent.
     * @param run The run in which the agent action occurred.
     * @returns void
     */
    onAgentAction(run) {
        const agentRun = run;
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.blue, "[agent/action]")} [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], "[action]")}`);
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/utils.js
var utils = __webpack_require__(2943);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/env.js
var env = __webpack_require__(4216);
// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/run_trees.js + 2 modules
var run_trees = __webpack_require__(7548);
;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/run_trees.js

// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/singletons/traceable.js + 1 modules
var traceable = __webpack_require__(1515);
// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/index.js
var langsmith = __webpack_require__(8169);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/tracer.js


let client;
const getDefaultLangChainClientSingleton = () => {
    if (client === undefined) {
        const clientParams = (0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_CALLBACKS_BACKGROUND") === "false"
            ? {
                // LangSmith has its own backgrounding system
                blockOnRootRunFinalization: true,
            }
            : {};
        client = new langsmith/* Client */.Kj(clientParams);
    }
    return client;
};
const setDefaultLangChainClientSingleton = (newClient) => {
    client = newClient;
};

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tracers/tracer_langchain.js





class tracer_langchain_LangChainTracer extends tracers_base/* BaseTracer */.J {
    constructor(fields = {}) {
        super(fields);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
        });
        Object.defineProperty(this, "projectName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { exampleId, projectName, client } = fields;
        this.projectName =
            projectName ??
                (0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_PROJECT") ??
                (0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_SESSION");
        this.exampleId = exampleId;
        this.client = client ?? getDefaultLangChainClientSingleton();
        const traceableTree = tracer_langchain_LangChainTracer.getTraceableRunTree();
        if (traceableTree) {
            this.updateFromRunTree(traceableTree);
        }
    }
    async _convertToCreate(run, example_id = undefined) {
        return {
            ...run,
            extra: {
                ...run.extra,
                runtime: await (0,env/* getRuntimeEnvironment */.Ec)(),
            },
            child_runs: undefined,
            session_name: this.projectName,
            reference_example_id: run.parent_run_id ? undefined : example_id,
        };
    }
    async persistRun(_run) { }
    async onRunCreate(run) {
        const persistedRun = await this._convertToCreate(run, this.exampleId);
        await this.client.createRun(persistedRun);
    }
    async onRunUpdate(run) {
        const runUpdate = {
            end_time: run.end_time,
            error: run.error,
            outputs: run.outputs,
            events: run.events,
            inputs: run.inputs,
            trace_id: run.trace_id,
            dotted_order: run.dotted_order,
            parent_run_id: run.parent_run_id,
            extra: run.extra,
        };
        await this.client.updateRun(run.id, runUpdate);
    }
    getRun(id) {
        return this.runMap.get(id);
    }
    updateFromRunTree(runTree) {
        let rootRun = runTree;
        const visited = new Set();
        while (rootRun.parent_run) {
            if (visited.has(rootRun.id))
                break;
            visited.add(rootRun.id);
            if (!rootRun.parent_run)
                break;
            rootRun = rootRun.parent_run;
        }
        visited.clear();
        const queue = [rootRun];
        while (queue.length > 0) {
            const current = queue.shift();
            if (!current || visited.has(current.id))
                continue;
            visited.add(current.id);
            // @ts-expect-error Types of property 'events' are incompatible.
            this.runMap.set(current.id, current);
            if (current.child_runs) {
                queue.push(...current.child_runs);
            }
        }
        this.client = runTree.client ?? this.client;
        this.projectName = runTree.project_name ?? this.projectName;
        this.exampleId = runTree.reference_example_id ?? this.exampleId;
    }
    convertToRunTree(id) {
        const runTreeMap = {};
        const runTreeList = [];
        for (const [id, run] of this.runMap) {
            // by converting the run map to a run tree, we are doing a copy
            // thus, any mutation performed on the run tree will not be reflected
            // back in the run map
            // TODO: Stop using `this.runMap` in favour of LangSmith's `RunTree`
            const runTree = new run_trees/* RunTree */.gk({
                ...run,
                child_runs: [],
                parent_run: undefined,
                // inherited properties
                client: this.client,
                project_name: this.projectName,
                reference_example_id: this.exampleId,
                tracingEnabled: true,
            });
            runTreeMap[id] = runTree;
            runTreeList.push([id, run.dotted_order]);
        }
        runTreeList.sort((a, b) => {
            if (!a[1] || !b[1])
                return 0;
            return a[1].localeCompare(b[1]);
        });
        for (const [id] of runTreeList) {
            const run = this.runMap.get(id);
            const runTree = runTreeMap[id];
            if (!run || !runTree)
                continue;
            if (run.parent_run_id) {
                const parentRunTree = runTreeMap[run.parent_run_id];
                if (parentRunTree) {
                    parentRunTree.child_runs.push(runTree);
                    runTree.parent_run = parentRunTree;
                }
            }
        }
        return runTreeMap[id];
    }
    static getTraceableRunTree() {
        try {
            return (0,traceable/* getCurrentRunTree */.vR)();
        }
        catch {
            return undefined;
        }
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/p-queue@6.6.2/node_modules/p-queue/dist/index.js
var dist = __webpack_require__(4896);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/async_local_storage/globals.js
var globals = __webpack_require__(3101);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/callbacks.js
/* eslint-disable @typescript-eslint/no-explicit-any */


let queue;
/**
 * Creates a queue using the p-queue library. The queue is configured to
 * auto-start and has a concurrency of 1, meaning it will process tasks
 * one at a time.
 */
function createQueue() {
    const PQueue =  true ? dist["default"] : dist;
    return new PQueue({
        autoStart: true,
        concurrency: 1,
    });
}
function getQueue() {
    if (typeof queue === "undefined") {
        queue = createQueue();
    }
    return queue;
}
/**
 * Consume a promise, either adding it to the queue or waiting for it to resolve
 * @param promiseFn Promise to consume
 * @param wait Whether to wait for the promise to resolve or resolve immediately
 */
async function consumeCallback(promiseFn, wait) {
    if (wait === true) {
        // Clear config since callbacks are not part of the root run
        // Avoid using global singleton due to circuluar dependency issues
        const asyncLocalStorageInstance = (0,globals/* getGlobalAsyncLocalStorageInstance */.X0)();
        if (asyncLocalStorageInstance !== undefined) {
            await asyncLocalStorageInstance.run(undefined, async () => promiseFn());
        }
        else {
            await promiseFn();
        }
    }
    else {
        queue = getQueue();
        void queue.add(async () => {
            const asyncLocalStorageInstance = (0,globals/* getGlobalAsyncLocalStorageInstance */.X0)();
            if (asyncLocalStorageInstance !== undefined) {
                await asyncLocalStorageInstance.run(undefined, async () => promiseFn());
            }
            else {
                await promiseFn();
            }
        });
    }
}
/**
 * Waits for all promises in the queue to resolve. If the queue is
 * undefined, it immediately resolves a promise.
 */
function awaitAllCallbacks() {
    return typeof queue !== "undefined" ? queue.onIdle() : Promise.resolve();
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/callbacks/promises.js



;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/callbacks.js

const isTracingEnabled = (tracingEnabled) => {
    if (tracingEnabled !== undefined) {
        return tracingEnabled;
    }
    const envVars = [
        "LANGSMITH_TRACING_V2",
        "LANGCHAIN_TRACING_V2",
        "LANGSMITH_TRACING",
        "LANGCHAIN_TRACING",
    ];
    return !!envVars.find((envVar) => (0,env/* getEnvironmentVariable */.Az)(envVar) === "true");
};

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/async_local_storage/context.js


/**
 * Set a context variable. Context variables are scoped to any
 * child runnables called by the current runnable, or globally if set outside
 * of any runnable.
 *
 * @remarks
 * This function is only supported in environments that support AsyncLocalStorage,
 * including Node.js, Deno, and Cloudflare Workers.
 *
 * @example
 * ```ts
 * import { RunnableLambda } from "@langchain/core/runnables";
 * import {
 *   getContextVariable,
 *   setContextVariable
 * } from "@langchain/core/context";
 *
 * const nested = RunnableLambda.from(() => {
 *   // "bar" because it was set by a parent
 *   console.log(getContextVariable("foo"));
 *
 *   // Override to "baz", but only for child runnables
 *   setContextVariable("foo", "baz");
 *
 *   // Now "baz", but only for child runnables
 *   return getContextVariable("foo");
 * });
 *
 * const runnable = RunnableLambda.from(async () => {
 *   // Set a context variable named "foo"
 *   setContextVariable("foo", "bar");
 *
 *   const res = await nested.invoke({});
 *
 *   // Still "bar" since child changes do not affect parents
 *   console.log(getContextVariable("foo"));
 *
 *   return res;
 * });
 *
 * // undefined, because context variable has not been set yet
 * console.log(getContextVariable("foo"));
 *
 * // Final return value is "baz"
 * const result = await runnable.invoke({});
 * ```
 *
 * @param name The name of the context variable.
 * @param value The value to set.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setContextVariable(name, value) {
    // Avoid using global singleton due to circuluar dependency issues
    const asyncLocalStorageInstance = getGlobalAsyncLocalStorageInstance();
    if (asyncLocalStorageInstance === undefined) {
        throw new Error(`Internal error: Global shared async local storage instance has not been initialized.`);
    }
    const runTree = asyncLocalStorageInstance.getStore();
    const contextVars = { ...runTree?.[_CONTEXT_VARIABLES_KEY] };
    contextVars[name] = value;
    let newValue = {};
    if (isRunTree(runTree)) {
        newValue = new RunTree(runTree);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newValue[_CONTEXT_VARIABLES_KEY] = contextVars;
    asyncLocalStorageInstance.enterWith(newValue);
}
/**
 * Get the value of a previously set context variable. Context variables
 * are scoped to any child runnables called by the current runnable,
 * or globally if set outside of any runnable.
 *
 * @remarks
 * This function is only supported in environments that support AsyncLocalStorage,
 * including Node.js, Deno, and Cloudflare Workers.
 *
 * @example
 * ```ts
 * import { RunnableLambda } from "@langchain/core/runnables";
 * import {
 *   getContextVariable,
 *   setContextVariable
 * } from "@langchain/core/context";
 *
 * const nested = RunnableLambda.from(() => {
 *   // "bar" because it was set by a parent
 *   console.log(getContextVariable("foo"));
 *
 *   // Override to "baz", but only for child runnables
 *   setContextVariable("foo", "baz");
 *
 *   // Now "baz", but only for child runnables
 *   return getContextVariable("foo");
 * });
 *
 * const runnable = RunnableLambda.from(async () => {
 *   // Set a context variable named "foo"
 *   setContextVariable("foo", "bar");
 *
 *   const res = await nested.invoke({});
 *
 *   // Still "bar" since child changes do not affect parents
 *   console.log(getContextVariable("foo"));
 *
 *   return res;
 * });
 *
 * // undefined, because context variable has not been set yet
 * console.log(getContextVariable("foo"));
 *
 * // Final return value is "baz"
 * const result = await runnable.invoke({});
 * ```
 *
 * @param name The name of the context variable.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContextVariable(name) {
    // Avoid using global singleton due to circuluar dependency issues
    const asyncLocalStorageInstance = (0,globals/* getGlobalAsyncLocalStorageInstance */.X0)();
    if (asyncLocalStorageInstance === undefined) {
        return undefined;
    }
    const runTree = asyncLocalStorageInstance.getStore();
    return runTree?.[globals/* _CONTEXT_VARIABLES_KEY */.hr]?.[name];
}
const LC_CONFIGURE_HOOKS_KEY = Symbol("lc:configure_hooks");
const _getConfigureHooks = () => getContextVariable(LC_CONFIGURE_HOOKS_KEY) || [];
/**
 * Register a callback configure hook to automatically add callback handlers to all runs.
 *
 * There are two ways to use this:
 *
 * 1. Using a context variable:
 *    - Set `contextVar` to specify the variable name
 *    - Use `setContextVariable()` to store your handler instance
 *
 * 2. Using an environment variable:
 *    - Set both `envVar` and `handlerClass`
 *    - The handler will be instantiated when the env var is set to "true".
 *
 * @example
 * ```typescript
 * // Method 1: Using context variable
 * import {
 *   registerConfigureHook,
 *   setContextVariable
 * } from "@langchain/core/context";
 *
 * const tracer = new MyCallbackHandler();
 * registerConfigureHook({
 *   contextVar: "my_tracer",
 * });
 * setContextVariable("my_tracer", tracer);
 *
 * // ...run code here
 *
 * // Method 2: Using environment variable
 * registerConfigureHook({
 *   handlerClass: MyCallbackHandler,
 *   envVar: "MY_TRACER_ENABLED",
 * });
 * process.env.MY_TRACER_ENABLED = "true";
 *
 * // ...run code here
 * ```
 *
 * @param config Configuration object for the hook
 * @param config.contextVar Name of the context variable containing the handler instance
 * @param config.inheritable Whether child runs should inherit this handler
 * @param config.handlerClass Optional callback handler class (required if using envVar)
 * @param config.envVar Optional environment variable name to control handler activation
 */
const registerConfigureHook = (config) => {
    if (config.envVar && !config.handlerClass) {
        throw new Error("If envVar is set, handlerClass must also be set to a non-None value.");
    }
    setContextVariable(LC_CONFIGURE_HOOKS_KEY, [..._getConfigureHooks(), config]);
};

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/callbacks/manager.js










function parseCallbackConfigArg(arg) {
    if (!arg) {
        return {};
    }
    else if (Array.isArray(arg) || "name" in arg) {
        return { callbacks: arg };
    }
    else {
        return arg;
    }
}
/**
 * Manage callbacks from different components of LangChain.
 */
class BaseCallbackManager {
    setHandler(handler) {
        return this.setHandlers([handler]);
    }
}
/**
 * Base class for run manager in LangChain.
 */
class BaseRunManager {
    constructor(runId, handlers, inheritableHandlers, tags, inheritableTags, metadata, inheritableMetadata, _parentRunId) {
        Object.defineProperty(this, "runId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: runId
        });
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: handlers
        });
        Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableHandlers
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tags
        });
        Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableTags
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: metadata
        });
        Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableMetadata
        });
        Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _parentRunId
        });
    }
    get parentRunId() {
        return this._parentRunId;
    }
    async handleText(text) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            try {
                await handler.handleText?.(text, this.runId, this._parentRunId, this.tags);
            }
            catch (err) {
                const logFunction = handler.raiseError
                    ? console.error
                    : console.warn;
                logFunction(`Error in handler ${handler.constructor.name}, handleText: ${err}`);
                if (handler.raiseError) {
                    throw err;
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleCustomEvent(eventName, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, _runId, _tags, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _metadata) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            try {
                await handler.handleCustomEvent?.(eventName, data, this.runId, this.tags, this.metadata);
            }
            catch (err) {
                const logFunction = handler.raiseError
                    ? console.error
                    : console.warn;
                logFunction(`Error in handler ${handler.constructor.name}, handleCustomEvent: ${err}`);
                if (handler.raiseError) {
                    throw err;
                }
            }
        }, handler.awaitHandlers)));
    }
}
/**
 * Manages callbacks for retriever runs.
 */
class CallbackManagerForRetrieverRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) {
            manager.addTags([tag], false);
        }
        return manager;
    }
    async handleRetrieverEnd(documents) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
                try {
                    await handler.handleRetrieverEnd?.(documents, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleRetriever`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleRetrieverError(err) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
                try {
                    await handler.handleRetrieverError?.(err, this.runId, this._parentRunId, this.tags);
                }
                catch (error) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleRetrieverError: ${error}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
}
class CallbackManagerForLLMRun extends BaseRunManager {
    async handleLLMNewToken(token, idx, _runId, _parentRunId, _tags, fields) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
                try {
                    await handler.handleLLMNewToken?.(token, idx ?? { prompt: 0, completion: 0 }, this.runId, this._parentRunId, this.tags, fields);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleLLMNewToken: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleLLMError(err, _runId, _parentRunId, _tags, extraParams) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
                try {
                    await handler.handleLLMError?.(err, this.runId, this._parentRunId, this.tags, extraParams);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleLLMError: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleLLMEnd(output, _runId, _parentRunId, _tags, extraParams) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
                try {
                    await handler.handleLLMEnd?.(output, this.runId, this._parentRunId, this.tags, extraParams);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleLLMEnd: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
}
class CallbackManagerForChainRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) {
            manager.addTags([tag], false);
        }
        return manager;
    }
    async handleChainError(err, _runId, _parentRunId, _tags, kwargs) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
                try {
                    await handler.handleChainError?.(err, this.runId, this._parentRunId, this.tags, kwargs);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleChainError: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleChainEnd(output, _runId, _parentRunId, _tags, kwargs) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
                try {
                    await handler.handleChainEnd?.(output, this.runId, this._parentRunId, this.tags, kwargs);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleChainEnd: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleAgentAction(action) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleAgentAction?.(action, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleAgentAction: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleAgentEnd(action) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleAgentEnd?.(action, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleAgentEnd: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
}
class CallbackManagerForToolRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) {
            manager.addTags([tag], false);
        }
        return manager;
    }
    async handleToolError(err) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleToolError?.(err, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleToolError: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handleToolEnd(output) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleToolEnd?.(output, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleToolEnd: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
}
/**
 * @example
 * ```typescript
 * const prompt = PromptTemplate.fromTemplate("What is the answer to {question}?");
 *
 * // Example of using LLMChain with OpenAI and a simple prompt
 * const chain = new LLMChain({
 *   llm: new ChatOpenAI({ temperature: 0.9 }),
 *   prompt,
 * });
 *
 * // Running the chain with a single question
 * const result = await chain.call({
 *   question: "What is the airspeed velocity of an unladen swallow?",
 * });
 * console.log("The answer is:", result);
 * ```
 */
class CallbackManager extends BaseCallbackManager {
    constructor(parentRunId, options) {
        super();
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "callback_manager"
        });
        Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handlers = options?.handlers ?? this.handlers;
        this.inheritableHandlers =
            options?.inheritableHandlers ?? this.inheritableHandlers;
        this.tags = options?.tags ?? this.tags;
        this.inheritableTags = options?.inheritableTags ?? this.inheritableTags;
        this.metadata = options?.metadata ?? this.metadata;
        this.inheritableMetadata =
            options?.inheritableMetadata ?? this.inheritableMetadata;
        this._parentRunId = parentRunId;
    }
    /**
     * Gets the parent run ID, if any.
     *
     * @returns The parent run ID.
     */
    getParentRunId() {
        return this._parentRunId;
    }
    async handleLLMStart(llm, prompts, runId = undefined, _parentRunId = undefined, extraParams = undefined, _tags = undefined, _metadata = undefined, runName = undefined) {
        return Promise.all(prompts.map(async (prompt, idx) => {
            // Can't have duplicate runs with the same run ID (if provided)
            const runId_ = idx === 0 && runId ? runId : (0,v4/* default */.A)();
            await Promise.all(this.handlers.map((handler) => {
                if (handler.ignoreLLM) {
                    return;
                }
                if ((0,tracers_base/* isBaseTracer */.j)(handler)) {
                    // Create and add run to the run map.
                    // We do this synchronously to avoid race conditions
                    // when callbacks are backgrounded.
                    handler._createRunForLLMStart(llm, [prompt], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
                }
                return consumeCallback(async () => {
                    try {
                        await handler.handleLLMStart?.(llm, [prompt], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
                    }
                    catch (err) {
                        const logFunction = handler.raiseError
                            ? console.error
                            : console.warn;
                        logFunction(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                        if (handler.raiseError) {
                            throw err;
                        }
                    }
                }, handler.awaitHandlers);
            }));
            return new CallbackManagerForLLMRun(runId_, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }));
    }
    async handleChatModelStart(llm, messages, runId = undefined, _parentRunId = undefined, extraParams = undefined, _tags = undefined, _metadata = undefined, runName = undefined) {
        return Promise.all(messages.map(async (messageGroup, idx) => {
            // Can't have duplicate runs with the same run ID (if provided)
            const runId_ = idx === 0 && runId ? runId : (0,v4/* default */.A)();
            await Promise.all(this.handlers.map((handler) => {
                if (handler.ignoreLLM) {
                    return;
                }
                if ((0,tracers_base/* isBaseTracer */.j)(handler)) {
                    // Create and add run to the run map.
                    // We do this synchronously to avoid race conditions
                    // when callbacks are backgrounded.
                    handler._createRunForChatModelStart(llm, [messageGroup], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
                }
                return consumeCallback(async () => {
                    try {
                        if (handler.handleChatModelStart) {
                            await handler.handleChatModelStart?.(llm, [messageGroup], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
                        }
                        else if (handler.handleLLMStart) {
                            const messageString = (0,utils/* getBufferString */.Sw)(messageGroup);
                            await handler.handleLLMStart?.(llm, [messageString], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
                        }
                    }
                    catch (err) {
                        const logFunction = handler.raiseError
                            ? console.error
                            : console.warn;
                        logFunction(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                        if (handler.raiseError) {
                            throw err;
                        }
                    }
                }, handler.awaitHandlers);
            }));
            return new CallbackManagerForLLMRun(runId_, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }));
    }
    async handleChainStart(chain, inputs, runId = (0,v4/* default */.A)(), runType = undefined, _tags = undefined, _metadata = undefined, runName = undefined) {
        await Promise.all(this.handlers.map((handler) => {
            if (handler.ignoreChain) {
                return;
            }
            if ((0,tracers_base/* isBaseTracer */.j)(handler)) {
                // Create and add run to the run map.
                // We do this synchronously to avoid race conditions
                // when callbacks are backgrounded.
                handler._createRunForChainStart(chain, inputs, runId, this._parentRunId, this.tags, this.metadata, runType, runName);
            }
            return consumeCallback(async () => {
                try {
                    await handler.handleChainStart?.(chain, inputs, runId, this._parentRunId, this.tags, this.metadata, runType, runName);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleChainStart: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }, handler.awaitHandlers);
        }));
        return new CallbackManagerForChainRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    async handleToolStart(tool, input, runId = (0,v4/* default */.A)(), _parentRunId = undefined, _tags = undefined, _metadata = undefined, runName = undefined) {
        await Promise.all(this.handlers.map((handler) => {
            if (handler.ignoreAgent) {
                return;
            }
            if ((0,tracers_base/* isBaseTracer */.j)(handler)) {
                // Create and add run to the run map.
                // We do this synchronously to avoid race conditions
                // when callbacks are backgrounded.
                handler._createRunForToolStart(tool, input, runId, this._parentRunId, this.tags, this.metadata, runName);
            }
            return consumeCallback(async () => {
                try {
                    await handler.handleToolStart?.(tool, input, runId, this._parentRunId, this.tags, this.metadata, runName);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleToolStart: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }, handler.awaitHandlers);
        }));
        return new CallbackManagerForToolRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    async handleRetrieverStart(retriever, query, runId = (0,v4/* default */.A)(), _parentRunId = undefined, _tags = undefined, _metadata = undefined, runName = undefined) {
        await Promise.all(this.handlers.map((handler) => {
            if (handler.ignoreRetriever) {
                return;
            }
            if ((0,tracers_base/* isBaseTracer */.j)(handler)) {
                // Create and add run to the run map.
                // We do this synchronously to avoid race conditions
                // when callbacks are backgrounded.
                handler._createRunForRetrieverStart(retriever, query, runId, this._parentRunId, this.tags, this.metadata, runName);
            }
            return consumeCallback(async () => {
                try {
                    await handler.handleRetrieverStart?.(retriever, query, runId, this._parentRunId, this.tags, this.metadata, runName);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleRetrieverStart: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }, handler.awaitHandlers);
        }));
        return new CallbackManagerForRetrieverRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    async handleCustomEvent(eventName, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, runId, _tags, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _metadata) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreCustomEvent) {
                try {
                    await handler.handleCustomEvent?.(eventName, data, runId, this.tags, this.metadata);
                }
                catch (err) {
                    const logFunction = handler.raiseError
                        ? console.error
                        : console.warn;
                    logFunction(`Error in handler ${handler.constructor.name}, handleCustomEvent: ${err}`);
                    if (handler.raiseError) {
                        throw err;
                    }
                }
            }
        }, handler.awaitHandlers)));
    }
    addHandler(handler, inherit = true) {
        this.handlers.push(handler);
        if (inherit) {
            this.inheritableHandlers.push(handler);
        }
    }
    removeHandler(handler) {
        this.handlers = this.handlers.filter((_handler) => _handler !== handler);
        this.inheritableHandlers = this.inheritableHandlers.filter((_handler) => _handler !== handler);
    }
    setHandlers(handlers, inherit = true) {
        this.handlers = [];
        this.inheritableHandlers = [];
        for (const handler of handlers) {
            this.addHandler(handler, inherit);
        }
    }
    addTags(tags, inherit = true) {
        this.removeTags(tags); // Remove duplicates
        this.tags.push(...tags);
        if (inherit) {
            this.inheritableTags.push(...tags);
        }
    }
    removeTags(tags) {
        this.tags = this.tags.filter((tag) => !tags.includes(tag));
        this.inheritableTags = this.inheritableTags.filter((tag) => !tags.includes(tag));
    }
    addMetadata(metadata, inherit = true) {
        this.metadata = { ...this.metadata, ...metadata };
        if (inherit) {
            this.inheritableMetadata = { ...this.inheritableMetadata, ...metadata };
        }
    }
    removeMetadata(metadata) {
        for (const key of Object.keys(metadata)) {
            delete this.metadata[key];
            delete this.inheritableMetadata[key];
        }
    }
    copy(additionalHandlers = [], inherit = true) {
        const manager = new CallbackManager(this._parentRunId);
        for (const handler of this.handlers) {
            const inheritable = this.inheritableHandlers.includes(handler);
            manager.addHandler(handler, inheritable);
        }
        for (const tag of this.tags) {
            const inheritable = this.inheritableTags.includes(tag);
            manager.addTags([tag], inheritable);
        }
        for (const key of Object.keys(this.metadata)) {
            const inheritable = Object.keys(this.inheritableMetadata).includes(key);
            manager.addMetadata({ [key]: this.metadata[key] }, inheritable);
        }
        for (const handler of additionalHandlers) {
            if (
            // Prevent multiple copies of console_callback_handler
            manager.handlers
                .filter((h) => h.name === "console_callback_handler")
                .some((h) => h.name === handler.name)) {
                continue;
            }
            manager.addHandler(handler, inherit);
        }
        return manager;
    }
    static fromHandlers(handlers) {
        class Handler extends base/* BaseCallbackHandler */.NK {
            constructor() {
                super();
                Object.defineProperty(this, "name", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (0,v4/* default */.A)()
                });
                Object.assign(this, handlers);
            }
        }
        const manager = new this();
        manager.addHandler(new Handler());
        return manager;
    }
    static configure(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
        return this._configureSync(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options);
    }
    // TODO: Deprecate async method in favor of this one.
    static _configureSync(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
        let callbackManager;
        if (inheritableHandlers || localHandlers) {
            if (Array.isArray(inheritableHandlers) || !inheritableHandlers) {
                callbackManager = new CallbackManager();
                callbackManager.setHandlers(inheritableHandlers?.map(ensureHandler) ?? [], true);
            }
            else {
                callbackManager = inheritableHandlers;
            }
            callbackManager = callbackManager.copy(Array.isArray(localHandlers)
                ? localHandlers.map(ensureHandler)
                : localHandlers?.handlers, false);
        }
        const verboseEnabled = (0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_VERBOSE") === "true" ||
            options?.verbose;
        const tracingV2Enabled = tracer_langchain_LangChainTracer.getTraceableRunTree()?.tracingEnabled ||
            isTracingEnabled();
        const tracingEnabled = tracingV2Enabled ||
            ((0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_TRACING") ?? false);
        if (verboseEnabled || tracingEnabled) {
            if (!callbackManager) {
                callbackManager = new CallbackManager();
            }
            if (verboseEnabled &&
                !callbackManager.handlers.some((handler) => handler.name === ConsoleCallbackHandler.prototype.name)) {
                const consoleHandler = new ConsoleCallbackHandler();
                callbackManager.addHandler(consoleHandler, true);
            }
            if (tracingEnabled &&
                !callbackManager.handlers.some((handler) => handler.name === "langchain_tracer")) {
                if (tracingV2Enabled) {
                    const tracerV2 = new tracer_langchain_LangChainTracer();
                    callbackManager.addHandler(tracerV2, true);
                    // handoff between langchain and langsmith/traceable
                    // override the parent run ID
                    callbackManager._parentRunId =
                        tracer_langchain_LangChainTracer.getTraceableRunTree()?.id ??
                            callbackManager._parentRunId;
                }
            }
        }
        for (const { contextVar, inheritable = true, handlerClass, envVar, } of _getConfigureHooks()) {
            const createIfNotInContext = envVar && (0,env/* getEnvironmentVariable */.Az)(envVar) === "true" && handlerClass;
            let handler;
            const contextVarValue = contextVar !== undefined ? getContextVariable(contextVar) : undefined;
            if (contextVarValue && (0,base/* isBaseCallbackHandler */.zr)(contextVarValue)) {
                handler = contextVarValue;
            }
            else if (createIfNotInContext) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handler = new handlerClass({});
            }
            if (handler !== undefined) {
                if (!callbackManager) {
                    callbackManager = new CallbackManager();
                }
                if (!callbackManager.handlers.some((h) => h.name === handler.name)) {
                    callbackManager.addHandler(handler, inheritable);
                }
            }
        }
        if (inheritableTags || localTags) {
            if (callbackManager) {
                callbackManager.addTags(inheritableTags ?? []);
                callbackManager.addTags(localTags ?? [], false);
            }
        }
        if (inheritableMetadata || localMetadata) {
            if (callbackManager) {
                callbackManager.addMetadata(inheritableMetadata ?? {});
                callbackManager.addMetadata(localMetadata ?? {}, false);
            }
        }
        return callbackManager;
    }
}
function ensureHandler(handler) {
    if ("name" in handler) {
        return handler;
    }
    return base/* BaseCallbackHandler */.NK.fromMethods(handler);
}
/**
 * @deprecated Use [`traceable`](https://docs.smith.langchain.com/observability/how_to_guides/tracing/annotate_code)
 * from "langsmith" instead.
 */
class TraceGroup {
    constructor(groupName, options) {
        Object.defineProperty(this, "groupName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: groupName
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "runManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    async getTraceGroupCallbackManager(group_name, inputs, options) {
        const cb = new LangChainTracer(options);
        const cm = await CallbackManager.configure([cb]);
        const runManager = await cm?.handleChainStart({
            lc: 1,
            type: "not_implemented",
            id: ["langchain", "callbacks", "groups", group_name],
        }, inputs ?? {});
        if (!runManager) {
            throw new Error("Failed to create run group callback manager.");
        }
        return runManager;
    }
    async start(inputs) {
        if (!this.runManager) {
            this.runManager = await this.getTraceGroupCallbackManager(this.groupName, inputs, this.options);
        }
        return this.runManager.getChild();
    }
    async error(err) {
        if (this.runManager) {
            await this.runManager.handleChainError(err);
            this.runManager = undefined;
        }
    }
    async end(output) {
        if (this.runManager) {
            await this.runManager.handleChainEnd(output ?? {});
            this.runManager = undefined;
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object"
        ? value
        : { [defaultKey]: value };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function traceAsGroup(groupOptions, enclosedCode, ...args) {
    const traceGroup = new TraceGroup(groupOptions.name, groupOptions);
    const callbackManager = await traceGroup.start({ ...args });
    try {
        const result = await enclosedCode(callbackManager, ...args);
        await traceGroup.end(_coerceToDict(result, "output"));
        return result;
    }
    catch (err) {
        await traceGroup.error(err);
        throw err;
    }
}


/***/ }),

/***/ 1067:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cf: () => (/* binding */ ChatGenerationChunk),
/* harmony export */   SP: () => (/* binding */ RUN_KEY),
/* harmony export */   mu: () => (/* binding */ GenerationChunk)
/* harmony export */ });
const RUN_KEY = "__run";
/**
 * Chunk of a single generation. Used for streaming.
 */
class GenerationChunk {
    constructor(fields) {
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "generationInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = fields.text;
        this.generationInfo = fields.generationInfo;
    }
    concat(chunk) {
        return new GenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo,
            },
        });
    }
}
class ChatGenerationChunk extends GenerationChunk {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.message = fields.message;
    }
    concat(chunk) {
        return new ChatGenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo,
            },
            message: this.message.concat(chunk.message),
        });
    }
}


/***/ }),

/***/ 1379:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  X6: () => (/* reexport */ core_applyPatch),
  UD: () => (/* reexport */ compare)
});

// UNUSED EXPORTS: JsonPatchError, _areEquals, applyOperation, applyReducer, deepClone, default, escapePathComponent, generate, getValueByPointer, observe, unescapePathComponent, unobserve, validate, validator

// NAMESPACE OBJECT: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/fast-json-patch/src/core.js
var core_namespaceObject = {};
__webpack_require__.r(core_namespaceObject);
__webpack_require__.d(core_namespaceObject, {
  JsonPatchError: () => (JsonPatchError),
  _areEquals: () => (_areEquals),
  applyOperation: () => (applyOperation),
  applyPatch: () => (core_applyPatch),
  applyReducer: () => (applyReducer),
  deepClone: () => (deepClone),
  getValueByPointer: () => (getValueByPointer),
  validate: () => (validate),
  validator: () => (validator)
});

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/fast-json-patch/src/helpers.js
// @ts-nocheck
// Inlined because of ESM import issues
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2017-2022 Joachim Wester
 * MIT licensed
 */
const _hasOwnProperty = Object.prototype.hasOwnProperty;
function helpers_hasOwnProperty(obj, key) {
    return _hasOwnProperty.call(obj, key);
}
function _objectKeys(obj) {
    if (Array.isArray(obj)) {
        const keys = new Array(obj.length);
        for (let k = 0; k < keys.length; k++) {
            keys[k] = "" + k;
        }
        return keys;
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    let keys = [];
    for (let i in obj) {
        if (helpers_hasOwnProperty(obj, i)) {
            keys.push(i);
        }
    }
    return keys;
}
/**
 * Deeply clone the object.
 * https://jsperf.com/deep-copy-vs-json-stringify-json-parse/25 (recursiveDeepCopy)
 * @param  {any} obj value to clone
 * @return {any} cloned obj
 */
function helpers_deepClone(obj) {
    switch (typeof obj) {
        case "object":
            return JSON.parse(JSON.stringify(obj)); //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
        case "undefined":
            return null; //this is how JSON.stringify behaves for array items
        default:
            return obj; //no need to clone primitives
    }
}
//3x faster than cached /^\d+$/.test(str)
function isInteger(str) {
    let i = 0;
    const len = str.length;
    let charCode;
    while (i < len) {
        charCode = str.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            i++;
            continue;
        }
        return false;
    }
    return true;
}
/**
 * Escapes a json pointer path
 * @param path The raw pointer
 * @return the Escaped path
 */
function escapePathComponent(path) {
    if (path.indexOf("/") === -1 && path.indexOf("~") === -1)
        return path;
    return path.replace(/~/g, "~0").replace(/\//g, "~1");
}
/**
 * Unescapes a json pointer path
 * @param path The escaped pointer
 * @return The unescaped path
 */
function unescapePathComponent(path) {
    return path.replace(/~1/g, "/").replace(/~0/g, "~");
}
function _getPathRecursive(root, obj) {
    let found;
    for (let key in root) {
        if (helpers_hasOwnProperty(root, key)) {
            if (root[key] === obj) {
                return escapePathComponent(key) + "/";
            }
            else if (typeof root[key] === "object") {
                found = _getPathRecursive(root[key], obj);
                if (found != "") {
                    return escapePathComponent(key) + "/" + found;
                }
            }
        }
    }
    return "";
}
function getPath(root, obj) {
    if (root === obj) {
        return "/";
    }
    const path = _getPathRecursive(root, obj);
    if (path === "") {
        throw new Error("Object not found in root");
    }
    return `/${path}`;
}
/**
 * Recursively checks whether an object has any undefined values inside.
 */
function hasUndefined(obj) {
    if (obj === undefined) {
        return true;
    }
    if (obj) {
        if (Array.isArray(obj)) {
            for (let i = 0, len = obj.length; i < len; i++) {
                if (hasUndefined(obj[i])) {
                    return true;
                }
            }
        }
        else if (typeof obj === "object") {
            const objKeys = _objectKeys(obj);
            const objKeysLength = objKeys.length;
            for (var i = 0; i < objKeysLength; i++) {
                if (hasUndefined(obj[objKeys[i]])) {
                    return true;
                }
            }
        }
    }
    return false;
}
function patchErrorMessageFormatter(message, args) {
    const messageParts = [message];
    for (const key in args) {
        const value = typeof args[key] === "object"
            ? JSON.stringify(args[key], null, 2)
            : args[key]; // pretty print
        if (typeof value !== "undefined") {
            messageParts.push(`${key}: ${value}`);
        }
    }
    return messageParts.join("\n");
}
class PatchError extends Error {
    constructor(message, name, index, operation, tree) {
        super(patchErrorMessageFormatter(message, { name, index, operation, tree }));
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: name
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: index
        });
        Object.defineProperty(this, "operation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: operation
        });
        Object.defineProperty(this, "tree", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tree
        });
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain, see https://stackoverflow.com/a/48342359
        this.message = patchErrorMessageFormatter(message, {
            name,
            index,
            operation,
            tree,
        });
    }
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/fast-json-patch/src/core.js
// @ts-nocheck

const JsonPatchError = PatchError;
const deepClone = helpers_deepClone;
/* We use a Javascript hash to store each
 function. Each hash entry (property) uses
 the operation identifiers specified in rfc6902.
 In this way, we can map each patch operation
 to its dedicated function in efficient way.
 */
/* The operations applicable to an object */
const objOps = {
    add: function (obj, key, document) {
        obj[key] = this.value;
        return { newDocument: document };
    },
    remove: function (obj, key, document) {
        var removed = obj[key];
        delete obj[key];
        return { newDocument: document, removed };
    },
    replace: function (obj, key, document) {
        var removed = obj[key];
        obj[key] = this.value;
        return { newDocument: document, removed };
    },
    move: function (obj, key, document) {
        /* in case move target overwrites an existing value,
        return the removed value, this can be taxing performance-wise,
        and is potentially unneeded */
        let removed = getValueByPointer(document, this.path);
        if (removed) {
            removed = helpers_deepClone(removed);
        }
        const originalValue = applyOperation(document, {
            op: "remove",
            path: this.from,
        }).removed;
        applyOperation(document, {
            op: "add",
            path: this.path,
            value: originalValue,
        });
        return { newDocument: document, removed };
    },
    copy: function (obj, key, document) {
        const valueToCopy = getValueByPointer(document, this.from);
        // enforce copy by value so further operations don't affect source (see issue #177)
        applyOperation(document, {
            op: "add",
            path: this.path,
            value: helpers_deepClone(valueToCopy),
        });
        return { newDocument: document };
    },
    test: function (obj, key, document) {
        return { newDocument: document, test: _areEquals(obj[key], this.value) };
    },
    _get: function (obj, key, document) {
        this.value = obj[key];
        return { newDocument: document };
    },
};
/* The operations applicable to an array. Many are the same as for the object */
var arrOps = {
    add: function (arr, i, document) {
        if (isInteger(i)) {
            arr.splice(i, 0, this.value);
        }
        else {
            // array props
            arr[i] = this.value;
        }
        // this may be needed when using '-' in an array
        return { newDocument: document, index: i };
    },
    remove: function (arr, i, document) {
        var removedList = arr.splice(i, 1);
        return { newDocument: document, removed: removedList[0] };
    },
    replace: function (arr, i, document) {
        var removed = arr[i];
        arr[i] = this.value;
        return { newDocument: document, removed };
    },
    move: objOps.move,
    copy: objOps.copy,
    test: objOps.test,
    _get: objOps._get,
};
/**
 * Retrieves a value from a JSON document by a JSON pointer.
 * Returns the value.
 *
 * @param document The document to get the value from
 * @param pointer an escaped JSON pointer
 * @return The retrieved value
 */
function getValueByPointer(document, pointer) {
    if (pointer == "") {
        return document;
    }
    var getOriginalDestination = { op: "_get", path: pointer };
    applyOperation(document, getOriginalDestination);
    return getOriginalDestination.value;
}
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the {newDocument, result} of the operation.
 * It modifies the `document` and `operation` objects - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyOperation(document, jsonpatch._deepClone(operation))`.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @param mutateDocument Whether to mutate the original document or clone it before applying
 * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
 * @return `{newDocument, result}` after the operation
 */
function applyOperation(document, operation, validateOperation = false, mutateDocument = true, banPrototypeModifications = true, index = 0) {
    if (validateOperation) {
        if (typeof validateOperation == "function") {
            validateOperation(operation, 0, document, operation.path);
        }
        else {
            validator(operation, 0);
        }
    }
    /* ROOT OPERATIONS */
    if (operation.path === "") {
        let returnValue = { newDocument: document };
        if (operation.op === "add") {
            returnValue.newDocument = operation.value;
            return returnValue;
        }
        else if (operation.op === "replace") {
            returnValue.newDocument = operation.value;
            returnValue.removed = document; //document we removed
            return returnValue;
        }
        else if (operation.op === "move" || operation.op === "copy") {
            // it's a move or copy to root
            returnValue.newDocument = getValueByPointer(document, operation.from); // get the value by json-pointer in `from` field
            if (operation.op === "move") {
                // report removed item
                returnValue.removed = document;
            }
            return returnValue;
        }
        else if (operation.op === "test") {
            returnValue.test = _areEquals(document, operation.value);
            if (returnValue.test === false) {
                throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
            }
            returnValue.newDocument = document;
            return returnValue;
        }
        else if (operation.op === "remove") {
            // a remove on root
            returnValue.removed = document;
            returnValue.newDocument = null;
            return returnValue;
        }
        else if (operation.op === "_get") {
            operation.value = document;
            return returnValue;
        }
        else {
            /* bad operation */
            if (validateOperation) {
                throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
            }
            else {
                return returnValue;
            }
        }
    } /* END ROOT OPERATIONS */
    else {
        if (!mutateDocument) {
            document = helpers_deepClone(document);
        }
        const path = operation.path || "";
        const keys = path.split("/");
        let obj = document;
        let t = 1; //skip empty element - http://jsperf.com/to-shift-or-not-to-shift
        let len = keys.length;
        let existingPathFragment = undefined;
        let key;
        let validateFunction;
        if (typeof validateOperation == "function") {
            validateFunction = validateOperation;
        }
        else {
            validateFunction = validator;
        }
        while (true) {
            key = keys[t];
            if (key && key.indexOf("~") != -1) {
                key = unescapePathComponent(key);
            }
            if (banPrototypeModifications &&
                (key == "__proto__" ||
                    (key == "prototype" && t > 0 && keys[t - 1] == "constructor"))) {
                throw new TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
            }
            if (validateOperation) {
                if (existingPathFragment === undefined) {
                    if (obj[key] === undefined) {
                        existingPathFragment = keys.slice(0, t).join("/");
                    }
                    else if (t == len - 1) {
                        existingPathFragment = operation.path;
                    }
                    if (existingPathFragment !== undefined) {
                        validateFunction(operation, 0, document, existingPathFragment);
                    }
                }
            }
            t++;
            if (Array.isArray(obj)) {
                if (key === "-") {
                    key = obj.length;
                }
                else {
                    if (validateOperation && !isInteger(key)) {
                        throw new JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", index, operation, document);
                    } // only parse key when it's an integer for `arr.prop` to work
                    else if (isInteger(key)) {
                        key = ~~key;
                    }
                }
                if (t >= len) {
                    if (validateOperation && operation.op === "add" && key > obj.length) {
                        throw new JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", index, operation, document);
                    }
                    const returnValue = arrOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
                    }
                    return returnValue;
                }
            }
            else {
                if (t >= len) {
                    const returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
                    }
                    return returnValue;
                }
            }
            obj = obj[key];
            // If we have more keys in the path, but the next value isn't a non-null object,
            // throw an OPERATION_PATH_UNRESOLVABLE error instead of iterating again.
            if (validateOperation && t < len && (!obj || typeof obj !== "object")) {
                throw new JsonPatchError("Cannot perform operation at the desired path", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
            }
        }
    }
}
/**
 * Apply a full JSON Patch array on a JSON document.
 * Returns the {newDocument, result} of the patch.
 * It modifies the `document` object and `patch` - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyPatch(document, jsonpatch._deepClone(patch))`.
 *
 * @param document The document to patch
 * @param patch The patch to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @param mutateDocument Whether to mutate the original document or clone it before applying
 * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
 * @return An array of `{newDocument, result}` after the patch
 */
function core_applyPatch(document, patch, validateOperation, mutateDocument = true, banPrototypeModifications = true) {
    if (validateOperation) {
        if (!Array.isArray(patch)) {
            throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
        }
    }
    if (!mutateDocument) {
        document = helpers_deepClone(document);
    }
    const results = new Array(patch.length);
    for (let i = 0, length = patch.length; i < length; i++) {
        // we don't need to pass mutateDocument argument because if it was true, we already deep cloned the object, we'll just pass `true`
        results[i] = applyOperation(document, patch[i], validateOperation, true, banPrototypeModifications, i);
        document = results[i].newDocument; // in case root was replaced
    }
    results.newDocument = document;
    return results;
}
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the updated document.
 * Suitable as a reducer.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @return The updated document
 */
function applyReducer(document, operation, index) {
    const operationResult = applyOperation(document, operation);
    if (operationResult.test === false) {
        // failed test
        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
    }
    return operationResult.newDocument;
}
/**
 * Validates a single operation. Called from `jsonpatch.validate`. Throws `JsonPatchError` in case of an error.
 * @param {object} operation - operation object (patch)
 * @param {number} index - index of operation in the sequence
 * @param {object} [document] - object where the operation is supposed to be applied
 * @param {string} [existingPathFragment] - comes along with `document`
 */
function validator(operation, index, document, existingPathFragment) {
    if (typeof operation !== "object" ||
        operation === null ||
        Array.isArray(operation)) {
        throw new JsonPatchError("Operation is not an object", "OPERATION_NOT_AN_OBJECT", index, operation, document);
    }
    else if (!objOps[operation.op]) {
        throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
    }
    else if (typeof operation.path !== "string") {
        throw new JsonPatchError("Operation `path` property is not a string", "OPERATION_PATH_INVALID", index, operation, document);
    }
    else if (operation.path.indexOf("/") !== 0 && operation.path.length > 0) {
        // paths that aren't empty string should start with "/"
        throw new JsonPatchError('Operation `path` property must start with "/"', "OPERATION_PATH_INVALID", index, operation, document);
    }
    else if ((operation.op === "move" || operation.op === "copy") &&
        typeof operation.from !== "string") {
        throw new JsonPatchError("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", index, operation, document);
    }
    else if ((operation.op === "add" ||
        operation.op === "replace" ||
        operation.op === "test") &&
        operation.value === undefined) {
        throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", index, operation, document);
    }
    else if ((operation.op === "add" ||
        operation.op === "replace" ||
        operation.op === "test") &&
        hasUndefined(operation.value)) {
        throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", index, operation, document);
    }
    else if (document) {
        if (operation.op == "add") {
            var pathLen = operation.path.split("/").length;
            var existingPathLen = existingPathFragment.split("/").length;
            if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
                throw new JsonPatchError("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", index, operation, document);
            }
        }
        else if (operation.op === "replace" ||
            operation.op === "remove" ||
            operation.op === "_get") {
            if (operation.path !== existingPathFragment) {
                throw new JsonPatchError("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
            }
        }
        else if (operation.op === "move" || operation.op === "copy") {
            var existingValue = {
                op: "_get",
                path: operation.from,
                value: undefined,
            };
            var error = validate([existingValue], document);
            if (error && error.name === "OPERATION_PATH_UNRESOLVABLE") {
                throw new JsonPatchError("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", index, operation, document);
            }
        }
    }
}
/**
 * Validates a sequence of operations. If `document` parameter is provided, the sequence is additionally validated against the object document.
 * If error is encountered, returns a JsonPatchError object
 * @param sequence
 * @param document
 * @returns {JsonPatchError|undefined}
 */
function validate(sequence, document, externalValidator) {
    try {
        if (!Array.isArray(sequence)) {
            throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
        }
        if (document) {
            //clone document and sequence so that we can safely try applying operations
            core_applyPatch(helpers_deepClone(document), helpers_deepClone(sequence), externalValidator || true);
        }
        else {
            externalValidator = externalValidator || validator;
            for (var i = 0; i < sequence.length; i++) {
                externalValidator(sequence[i], i, document, undefined);
            }
        }
    }
    catch (e) {
        if (e instanceof JsonPatchError) {
            return e;
        }
        else {
            throw e;
        }
    }
}
// based on https://github.com/epoberezkin/fast-deep-equal
// MIT License
// Copyright (c) 2017 Evgeny Poberezkin
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
function _areEquals(a, b) {
    if (a === b)
        return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
        var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
        if (arrA && arrB) {
            length = a.length;
            if (length != b.length)
                return false;
            for (i = length; i-- !== 0;)
                if (!_areEquals(a[i], b[i]))
                    return false;
            return true;
        }
        if (arrA != arrB)
            return false;
        var keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
            return false;
        for (i = length; i-- !== 0;)
            if (!b.hasOwnProperty(keys[i]))
                return false;
        for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!_areEquals(a[key], b[key]))
                return false;
        }
        return true;
    }
    return a !== a && b !== b;
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/fast-json-patch/src/duplex.js
// @ts-nocheck
// Inlined because of ESM import issues
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2013-2021 Joachim Wester
 * MIT license
 */


var beforeDict = new WeakMap();
class Mirror {
    constructor(obj) {
        Object.defineProperty(this, "obj", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "observers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.obj = obj;
    }
}
class ObserverInfo {
    constructor(callback, observer) {
        Object.defineProperty(this, "callback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "observer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.callback = callback;
        this.observer = observer;
    }
}
function getMirror(obj) {
    return beforeDict.get(obj);
}
function getObserverFromMirror(mirror, callback) {
    return mirror.observers.get(callback);
}
function removeObserverFromMirror(mirror, observer) {
    mirror.observers.delete(observer.callback);
}
/**
 * Detach an observer from an object
 */
function unobserve(root, observer) {
    observer.unobserve();
}
/**
 * Observes changes made to an object, which can then be retrieved using generate
 */
function observe(obj, callback) {
    var patches = [];
    var observer;
    var mirror = getMirror(obj);
    if (!mirror) {
        mirror = new Mirror(obj);
        beforeDict.set(obj, mirror);
    }
    else {
        const observerInfo = getObserverFromMirror(mirror, callback);
        observer = observerInfo && observerInfo.observer;
    }
    if (observer) {
        return observer;
    }
    observer = {};
    mirror.value = _deepClone(obj);
    if (callback) {
        observer.callback = callback;
        observer.next = null;
        var dirtyCheck = () => {
            generate(observer);
        };
        var fastCheck = () => {
            clearTimeout(observer.next);
            observer.next = setTimeout(dirtyCheck);
        };
        if (typeof window !== "undefined") {
            //not Node
            window.addEventListener("mouseup", fastCheck);
            window.addEventListener("keyup", fastCheck);
            window.addEventListener("mousedown", fastCheck);
            window.addEventListener("keydown", fastCheck);
            window.addEventListener("change", fastCheck);
        }
    }
    observer.patches = patches;
    observer.object = obj;
    observer.unobserve = () => {
        generate(observer);
        clearTimeout(observer.next);
        removeObserverFromMirror(mirror, observer);
        if (typeof window !== "undefined") {
            window.removeEventListener("mouseup", fastCheck);
            window.removeEventListener("keyup", fastCheck);
            window.removeEventListener("mousedown", fastCheck);
            window.removeEventListener("keydown", fastCheck);
            window.removeEventListener("change", fastCheck);
        }
    };
    mirror.observers.set(callback, new ObserverInfo(callback, observer));
    return observer;
}
/**
 * Generate an array of patches from an observer
 */
function generate(observer, invertible = false) {
    var mirror = beforeDict.get(observer.object);
    _generate(mirror.value, observer.object, observer.patches, "", invertible);
    if (observer.patches.length) {
        applyPatch(mirror.value, observer.patches);
    }
    var temp = observer.patches;
    if (temp.length > 0) {
        observer.patches = [];
        if (observer.callback) {
            observer.callback(temp);
        }
    }
    return temp;
}
// Dirty check if obj is different from mirror, generate patches and update mirror
function _generate(mirror, obj, patches, path, invertible) {
    if (obj === mirror) {
        return;
    }
    if (typeof obj.toJSON === "function") {
        obj = obj.toJSON();
    }
    var newKeys = _objectKeys(obj);
    var oldKeys = _objectKeys(mirror);
    var changed = false;
    var deleted = false;
    //if ever "move" operation is implemented here, make sure this test runs OK: "should not generate the same patch twice (move)"
    for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];
        if (helpers_hasOwnProperty(obj, key) &&
            !(obj[key] === undefined &&
                oldVal !== undefined &&
                Array.isArray(obj) === false)) {
            var newVal = obj[key];
            if (typeof oldVal == "object" &&
                oldVal != null &&
                typeof newVal == "object" &&
                newVal != null &&
                Array.isArray(oldVal) === Array.isArray(newVal)) {
                _generate(oldVal, newVal, patches, path + "/" + escapePathComponent(key), invertible);
            }
            else {
                if (oldVal !== newVal) {
                    changed = true;
                    if (invertible) {
                        patches.push({
                            op: "test",
                            path: path + "/" + escapePathComponent(key),
                            value: helpers_deepClone(oldVal),
                        });
                    }
                    patches.push({
                        op: "replace",
                        path: path + "/" + escapePathComponent(key),
                        value: helpers_deepClone(newVal),
                    });
                }
            }
        }
        else if (Array.isArray(mirror) === Array.isArray(obj)) {
            if (invertible) {
                patches.push({
                    op: "test",
                    path: path + "/" + escapePathComponent(key),
                    value: helpers_deepClone(oldVal),
                });
            }
            patches.push({
                op: "remove",
                path: path + "/" + escapePathComponent(key),
            });
            deleted = true; // property has been deleted
        }
        else {
            if (invertible) {
                patches.push({ op: "test", path, value: mirror });
            }
            patches.push({ op: "replace", path, value: obj });
            changed = true;
        }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
        return;
    }
    for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];
        if (!helpers_hasOwnProperty(mirror, key) && obj[key] !== undefined) {
            patches.push({
                op: "add",
                path: path + "/" + escapePathComponent(key),
                value: helpers_deepClone(obj[key]),
            });
        }
    }
}
/**
 * Create an array of patches from the differences in two objects
 */
function compare(tree1, tree2, invertible = false) {
    var patches = [];
    _generate(tree1, tree2, patches, "", invertible);
    return patches;
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/fast-json-patch/index.js



/**
 * Default export for backwards compat
 */


/* harmony default export */ const fast_json_patch = ({
    ...core_namespaceObject,
    // ...duplex,
    JsonPatchError: PatchError,
    deepClone: helpers_deepClone,
    escapePathComponent: escapePathComponent,
    unescapePathComponent: unescapePathComponent,
});


/***/ }),

/***/ 1460:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FK: () => (/* binding */ FunctionMessageChunk),
/* harmony export */   mg: () => (/* binding */ FunctionMessage)
/* harmony export */ });
/* unused harmony exports isFunctionMessage, isFunctionMessageChunk */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);

/**
 * Represents a function message in a conversation.
 */
class FunctionMessage extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ {
    static lc_name() {
        return "FunctionMessage";
    }
    constructor(fields, 
    /** @deprecated */
    name) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, name: name };
        }
        super(fields);
    }
    _getType() {
        return "function";
    }
}
/**
 * Represents a chunk of a function message, which can be concatenated
 * with other function message chunks.
 */
class FunctionMessageChunk extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessageChunk */ .gj {
    static lc_name() {
        return "FunctionMessageChunk";
    }
    _getType() {
        return "function";
    }
    concat(chunk) {
        return new FunctionMessageChunk({
            content: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* .mergeContent */ ._I)(this.content, chunk.content),
            additional_kwargs: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.additional_kwargs, chunk.additional_kwargs),
            response_metadata: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.response_metadata, chunk.response_metadata),
            name: this.name ?? "",
            id: this.id ?? chunk.id,
        });
    }
}
function isFunctionMessage(x) {
    return x._getType() === "function";
}
function isFunctionMessageChunk(x) {
    return x._getType() === "function";
}


/***/ }),

/***/ 1515:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  vR: () => (/* reexport */ getCurrentRunTree),
  GZ: () => (/* reexport */ isTraceableFunction)
});

// UNUSED EXPORTS: AsyncLocalStorageProviderSingleton, ROOT, withRunTree

// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/run_trees.js + 2 modules
var run_trees = __webpack_require__(7548);
;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/singletons/traceable.js

class MockAsyncLocalStorage {
    getStore() {
        return undefined;
    }
    run(_, callback) {
        return callback();
    }
}
const TRACING_ALS_KEY = Symbol.for("ls:tracing_async_local_storage");
const mockAsyncLocalStorage = new MockAsyncLocalStorage();
class AsyncLocalStorageProvider {
    getInstance() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return globalThis[TRACING_ALS_KEY] ?? mockAsyncLocalStorage;
    }
    initializeGlobalInstance(instance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (globalThis[TRACING_ALS_KEY] === undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            globalThis[TRACING_ALS_KEY] = instance;
        }
    }
}
const AsyncLocalStorageProviderSingleton = new AsyncLocalStorageProvider();
/**
 * Return the current run tree from within a traceable-wrapped function.
 * Will throw an error if called outside of a traceable function.
 *
 * @returns The run tree for the given context.
 */
const getCurrentRunTree = () => {
    const runTree = AsyncLocalStorageProviderSingleton.getInstance().getStore();
    if (!(0,run_trees/* isRunTree */.m5)(runTree)) {
        throw new Error([
            "Could not get the current run tree.",
            "",
            "Please make sure you are calling this method within a traceable function and that tracing is enabled.",
        ].join("\n"));
    }
    return runTree;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withRunTree(runTree, fn) {
    const storage = AsyncLocalStorageProviderSingleton.getInstance();
    return new Promise((resolve, reject) => {
        storage.run(runTree, () => void Promise.resolve(fn()).then(resolve).catch(reject));
    });
}
const ROOT = Symbol.for("langsmith:traceable:root");
function isTraceableFunction(x
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    return typeof x === "function" && "langsmith:traceable" in x;
}

;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/singletons/traceable.js


/***/ }),

/***/ 2513:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ parseJsonMarkdown),
/* harmony export */   d: () => (/* binding */ parsePartialJson)
/* harmony export */ });
function parseJsonMarkdown(s, parser = parsePartialJson) {
    // eslint-disable-next-line no-param-reassign
    s = s.trim();
    const match = /```(json)?(.*)```/s.exec(s);
    if (!match) {
        return parser(s);
    }
    else {
        return parser(match[2]);
    }
}
// Adapted from https://github.com/KillianLucas/open-interpreter/blob/main/interpreter/core/llm/utils/parse_partial_json.py
// MIT License
function parsePartialJson(s) {
    // If the input is undefined, return null to indicate failure.
    if (typeof s === "undefined") {
        return null;
    }
    // Attempt to parse the string as-is.
    try {
        return JSON.parse(s);
    }
    catch (error) {
        // Pass
    }
    // Initialize variables.
    let new_s = "";
    const stack = [];
    let isInsideString = false;
    let escaped = false;
    // Process each character in the string one at a time.
    for (let char of s) {
        if (isInsideString) {
            if (char === '"' && !escaped) {
                isInsideString = false;
            }
            else if (char === "\n" && !escaped) {
                char = "\\n"; // Replace the newline character with the escape sequence.
            }
            else if (char === "\\") {
                escaped = !escaped;
            }
            else {
                escaped = false;
            }
        }
        else {
            if (char === '"') {
                isInsideString = true;
                escaped = false;
            }
            else if (char === "{") {
                stack.push("}");
            }
            else if (char === "[") {
                stack.push("]");
            }
            else if (char === "}" || char === "]") {
                if (stack && stack[stack.length - 1] === char) {
                    stack.pop();
                }
                else {
                    // Mismatched closing character; the input is malformed.
                    return null;
                }
            }
        }
        // Append the processed character to the new string.
        new_s += char;
    }
    // If we're still inside a string at the end of processing,
    // we need to close the string.
    if (isInsideString) {
        new_s += '"';
    }
    // Close any remaining open structures in the reverse order that they were opened.
    for (let i = stack.length - 1; i >= 0; i -= 1) {
        new_s += stack[i];
    }
    // Attempt to parse the modified string as JSON.
    try {
        return JSON.parse(new_s);
    }
    catch (error) {
        // If we still can't parse the string as JSON, return null to indicate failure.
        return null;
    }
}


/***/ }),

/***/ 2943:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K0: () => (/* binding */ coerceMessageLikeToMessage),
/* harmony export */   Sw: () => (/* binding */ getBufferString),
/* harmony export */   ih: () => (/* binding */ convertToChunk)
/* harmony export */ });
/* unused harmony exports mapStoredMessageToChatMessage, mapStoredMessagesToChatMessages, mapChatMessagesToStoredMessages */
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5585);
/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(372);
/* harmony import */ var _ai_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6826);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3045);
/* harmony import */ var _chat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9498);
/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1460);
/* harmony import */ var _human_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6179);
/* harmony import */ var _system_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7977);
/* harmony import */ var _tool_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6570);









function _coerceToolCall(toolCall) {
    if ((0,_tools_utils_js__WEBPACK_IMPORTED_MODULE_0__/* ._isToolCall */ .K)(toolCall)) {
        return toolCall;
    }
    else if (typeof toolCall.id === "string" &&
        toolCall.type === "function" &&
        typeof toolCall.function === "object" &&
        toolCall.function !== null &&
        "arguments" in toolCall.function &&
        typeof toolCall.function.arguments === "string" &&
        "name" in toolCall.function &&
        typeof toolCall.function.name === "string") {
        // Handle OpenAI tool call format
        return {
            id: toolCall.id,
            args: JSON.parse(toolCall.function.arguments),
            name: toolCall.function.name,
            type: "tool_call",
        };
    }
    else {
        // TODO: Throw an error?
        return toolCall;
    }
}
function isSerializedConstructor(x) {
    return (typeof x === "object" &&
        x != null &&
        x.lc === 1 &&
        Array.isArray(x.id) &&
        x.kwargs != null &&
        typeof x.kwargs === "object");
}
function _constructMessageFromParams(params) {
    let type;
    let rest;
    // Support serialized messages
    if (isSerializedConstructor(params)) {
        const className = params.id.at(-1);
        if (className === "HumanMessage" || className === "HumanMessageChunk") {
            type = "user";
        }
        else if (className === "AIMessage" || className === "AIMessageChunk") {
            type = "assistant";
        }
        else if (className === "SystemMessage" ||
            className === "SystemMessageChunk") {
            type = "system";
        }
        else if (className === "FunctionMessage" ||
            className === "FunctionMessageChunk") {
            type = "function";
        }
        else if (className === "ToolMessage" ||
            className === "ToolMessageChunk") {
            type = "tool";
        }
        else {
            type = "unknown";
        }
        rest = params.kwargs;
    }
    else {
        const { type: extractedType, ...otherParams } = params;
        type = extractedType;
        rest = otherParams;
    }
    if (type === "human" || type === "user") {
        return new _human_js__WEBPACK_IMPORTED_MODULE_5__/* .HumanMessage */ .xc(rest);
    }
    else if (type === "ai" || type === "assistant") {
        const { tool_calls: rawToolCalls, ...other } = rest;
        if (!Array.isArray(rawToolCalls)) {
            return new _ai_js__WEBPACK_IMPORTED_MODULE_1__/* .AIMessage */ .Od(rest);
        }
        const tool_calls = rawToolCalls.map(_coerceToolCall);
        return new _ai_js__WEBPACK_IMPORTED_MODULE_1__/* .AIMessage */ .Od({ ...other, tool_calls });
    }
    else if (type === "system") {
        return new _system_js__WEBPACK_IMPORTED_MODULE_6__/* .SystemMessage */ .tn(rest);
    }
    else if (type === "developer") {
        return new _system_js__WEBPACK_IMPORTED_MODULE_6__/* .SystemMessage */ .tn({
            ...rest,
            additional_kwargs: {
                ...rest.additional_kwargs,
                __openai_role__: "developer",
            },
        });
    }
    else if (type === "tool" && "tool_call_id" in rest) {
        return new _tool_js__WEBPACK_IMPORTED_MODULE_7__/* .ToolMessage */ .uf({
            ...rest,
            content: rest.content,
            tool_call_id: rest.tool_call_id,
            name: rest.name,
        });
    }
    else {
        const error = (0,_errors_index_js__WEBPACK_IMPORTED_MODULE_8__/* .addLangChainErrorFields */ .Y)(new Error(`Unable to coerce message from array: only human, AI, system, developer, or tool message coercion is currently supported.\n\nReceived: ${JSON.stringify(params, null, 2)}`), "MESSAGE_COERCION_FAILURE");
        throw error;
    }
}
function coerceMessageLikeToMessage(messageLike) {
    if (typeof messageLike === "string") {
        return new _human_js__WEBPACK_IMPORTED_MODULE_5__/* .HumanMessage */ .xc(messageLike);
    }
    else if ((0,_base_js__WEBPACK_IMPORTED_MODULE_2__/* .isBaseMessage */ .ny)(messageLike)) {
        return messageLike;
    }
    if (Array.isArray(messageLike)) {
        const [type, content] = messageLike;
        return _constructMessageFromParams({ type, content });
    }
    else if ((0,_base_js__WEBPACK_IMPORTED_MODULE_2__/* ._isMessageFieldWithRole */ .dp)(messageLike)) {
        const { role: type, ...rest } = messageLike;
        return _constructMessageFromParams({ ...rest, type });
    }
    else {
        return _constructMessageFromParams(messageLike);
    }
}
/**
 * This function is used by memory classes to get a string representation
 * of the chat message history, based on the message content and role.
 */
function getBufferString(messages, humanPrefix = "Human", aiPrefix = "AI") {
    const string_messages = [];
    for (const m of messages) {
        let role;
        if (m._getType() === "human") {
            role = humanPrefix;
        }
        else if (m._getType() === "ai") {
            role = aiPrefix;
        }
        else if (m._getType() === "system") {
            role = "System";
        }
        else if (m._getType() === "function") {
            role = "Function";
        }
        else if (m._getType() === "tool") {
            role = "Tool";
        }
        else if (m._getType() === "generic") {
            role = m.role;
        }
        else {
            throw new Error(`Got unsupported message type: ${m._getType()}`);
        }
        const nameStr = m.name ? `${m.name}, ` : "";
        const readableContent = typeof m.content === "string"
            ? m.content
            : JSON.stringify(m.content, null, 2);
        string_messages.push(`${role}: ${nameStr}${readableContent}`);
    }
    return string_messages.join("\n");
}
/**
 * Maps messages from an older format (V1) to the current `StoredMessage`
 * format. If the message is already in the `StoredMessage` format, it is
 * returned as is. Otherwise, it transforms the V1 message into a
 * `StoredMessage`. This function is important for maintaining
 * compatibility with older message formats.
 */
function mapV1MessageToStoredMessage(message) {
    // TODO: Remove this mapper when we deprecate the old message format.
    if (message.data !== undefined) {
        return message;
    }
    else {
        const v1Message = message;
        return {
            type: v1Message.type,
            data: {
                content: v1Message.text,
                role: v1Message.role,
                name: undefined,
                tool_call_id: undefined,
            },
        };
    }
}
function mapStoredMessageToChatMessage(message) {
    const storedMessage = mapV1MessageToStoredMessage(message);
    switch (storedMessage.type) {
        case "human":
            return new HumanMessage(storedMessage.data);
        case "ai":
            return new AIMessage(storedMessage.data);
        case "system":
            return new SystemMessage(storedMessage.data);
        case "function":
            if (storedMessage.data.name === undefined) {
                throw new Error("Name must be defined for function messages");
            }
            return new FunctionMessage(storedMessage.data);
        case "tool":
            if (storedMessage.data.tool_call_id === undefined) {
                throw new Error("Tool call ID must be defined for tool messages");
            }
            return new ToolMessage(storedMessage.data);
        case "generic": {
            if (storedMessage.data.role === undefined) {
                throw new Error("Role must be defined for chat messages");
            }
            return new ChatMessage(storedMessage.data);
        }
        default:
            throw new Error(`Got unexpected type: ${storedMessage.type}`);
    }
}
/**
 * Transforms an array of `StoredMessage` instances into an array of
 * `BaseMessage` instances. It uses the `mapV1MessageToStoredMessage`
 * function to ensure all messages are in the `StoredMessage` format, then
 * creates new instances of the appropriate `BaseMessage` subclass based
 * on the type of each message. This function is used to prepare stored
 * messages for use in a chat context.
 */
function mapStoredMessagesToChatMessages(messages) {
    return messages.map(mapStoredMessageToChatMessage);
}
/**
 * Transforms an array of `BaseMessage` instances into an array of
 * `StoredMessage` instances. It does this by calling the `toDict` method
 * on each `BaseMessage`, which returns a `StoredMessage`. This function
 * is used to prepare chat messages for storage.
 */
function mapChatMessagesToStoredMessages(messages) {
    return messages.map((message) => message.toDict());
}
function convertToChunk(message) {
    const type = message._getType();
    if (type === "human") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new _human_js__WEBPACK_IMPORTED_MODULE_5__/* .HumanMessageChunk */ .a7({ ...message });
    }
    else if (type === "ai") {
        let aiChunkFields = {
            ...message,
        };
        if ("tool_calls" in aiChunkFields) {
            aiChunkFields = {
                ...aiChunkFields,
                tool_call_chunks: aiChunkFields.tool_calls?.map((tc) => ({
                    ...tc,
                    type: "tool_call_chunk",
                    index: undefined,
                    args: JSON.stringify(tc.args),
                })),
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new _ai_js__WEBPACK_IMPORTED_MODULE_1__/* .AIMessageChunk */ .H({ ...aiChunkFields });
    }
    else if (type === "system") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new _system_js__WEBPACK_IMPORTED_MODULE_6__/* .SystemMessageChunk */ .uU({ ...message });
    }
    else if (type === "function") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new _function_js__WEBPACK_IMPORTED_MODULE_4__/* .FunctionMessageChunk */ .FK({ ...message });
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
    }
    else if (_chat_js__WEBPACK_IMPORTED_MODULE_3__/* .ChatMessage */ .cM.isInstance(message)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new _chat_js__WEBPACK_IMPORTED_MODULE_3__/* .ChatMessageChunk */ .XU({ ...message });
    }
    else {
        throw new Error("Unknown message type.");
    }
}


/***/ }),

/***/ 3045:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AJ: () => (/* binding */ isBaseMessageChunk),
/* harmony export */   F7: () => (/* binding */ _mergeObj),
/* harmony export */   Iv: () => (/* binding */ _mergeStatus),
/* harmony export */   Vt: () => (/* binding */ _mergeLists),
/* harmony export */   XQ: () => (/* binding */ BaseMessage),
/* harmony export */   _I: () => (/* binding */ mergeContent),
/* harmony export */   dp: () => (/* binding */ _isMessageFieldWithRole),
/* harmony export */   gj: () => (/* binding */ BaseMessageChunk),
/* harmony export */   ns: () => (/* binding */ _mergeDicts),
/* harmony export */   ny: () => (/* binding */ isBaseMessage)
/* harmony export */ });
/* unused harmony export isOpenAIToolCallArray */
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5374);

function mergeContent(firstContent, secondContent) {
    // If first content is a string
    if (typeof firstContent === "string") {
        if (firstContent === "") {
            return secondContent;
        }
        if (typeof secondContent === "string") {
            return firstContent + secondContent;
        }
        else {
            return [{ type: "text", text: firstContent }, ...secondContent];
        }
        // If both are arrays
    }
    else if (Array.isArray(secondContent)) {
        return (_mergeLists(firstContent, secondContent) ?? [
            ...firstContent,
            ...secondContent,
        ]);
    }
    else {
        if (secondContent === "") {
            return firstContent;
        }
        // Otherwise, add the second content as a new element of the list
        return [...firstContent, { type: "text", text: secondContent }];
    }
}
/**
 * 'Merge' two statuses. If either value passed is 'error', it will return 'error'. Else
 * it will return 'success'.
 *
 * @param {"success" | "error" | undefined} left The existing value to 'merge' with the new value.
 * @param {"success" | "error" | undefined} right The new value to 'merge' with the existing value
 * @returns {"success" | "error"} The 'merged' value.
 */
function _mergeStatus(left, right) {
    if (left === "error" || right === "error") {
        return "error";
    }
    return "success";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringifyWithDepthLimit(obj, depthLimit) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function helper(obj, currentDepth) {
        if (typeof obj !== "object" || obj === null || obj === undefined) {
            return obj;
        }
        if (currentDepth >= depthLimit) {
            if (Array.isArray(obj)) {
                return "[Array]";
            }
            return "[Object]";
        }
        if (Array.isArray(obj)) {
            return obj.map((item) => helper(item, currentDepth + 1));
        }
        const result = {};
        for (const key of Object.keys(obj)) {
            result[key] = helper(obj[key], currentDepth + 1);
        }
        return result;
    }
    return JSON.stringify(helper(obj, 0), null, 2);
}
/**
 * Base class for all types of messages in a conversation. It includes
 * properties like `content`, `name`, and `additional_kwargs`. It also
 * includes methods like `toDict()` and `_getType()`.
 */
class BaseMessage extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .y {
    get lc_aliases() {
        // exclude snake case conversion to pascal case
        return {
            additional_kwargs: "additional_kwargs",
            response_metadata: "response_metadata",
        };
    }
    /**
     * @deprecated
     * Use {@link BaseMessage.content} instead.
     */
    get text() {
        return typeof this.content === "string" ? this.content : "";
    }
    /** The type of the message. */
    getType() {
        return this._getType();
    }
    constructor(fields, 
    /** @deprecated */
    kwargs) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = {
                content: fields,
                additional_kwargs: kwargs,
                response_metadata: {},
            };
        }
        // Make sure the default value for additional_kwargs is passed into super() for serialization
        if (!fields.additional_kwargs) {
            // eslint-disable-next-line no-param-reassign
            fields.additional_kwargs = {};
        }
        if (!fields.response_metadata) {
            // eslint-disable-next-line no-param-reassign
            fields.response_metadata = {};
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "messages"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /** The content of the message. */
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The name of the message sender in a multi-user chat. */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Additional keyword arguments */
        Object.defineProperty(this, "additional_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Response metadata. For example: response headers, logprobs, token counts. */
        Object.defineProperty(this, "response_metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An optional unique identifier for the message. This should ideally be
         * provided by the provider/model which created the message.
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.content = fields.content;
        this.additional_kwargs = fields.additional_kwargs;
        this.response_metadata = fields.response_metadata;
        this.id = fields.id;
    }
    toDict() {
        return {
            type: this._getType(),
            data: this.toJSON()
                .kwargs,
        };
    }
    static lc_name() {
        return "BaseMessage";
    }
    // Can't be protected for silly reasons
    get _printableFields() {
        return {
            id: this.id,
            content: this.content,
            name: this.name,
            additional_kwargs: this.additional_kwargs,
            response_metadata: this.response_metadata,
        };
    }
    // this private method is used to update the ID for the runtime
    // value as well as in lc_kwargs for serialisation
    _updateId(value) {
        this.id = value;
        // lc_attributes wouldn't work here, because jest compares the
        // whole object
        this.lc_kwargs.id = value;
    }
    get [Symbol.toStringTag]() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.constructor.lc_name();
    }
    // Override the default behavior of console.log
    [Symbol.for("nodejs.util.inspect.custom")](depth) {
        if (depth === null) {
            return this;
        }
        const printable = stringifyWithDepthLimit(this._printableFields, Math.max(4, depth));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return `${this.constructor.lc_name()} ${printable}`;
    }
}
function isOpenAIToolCallArray(value) {
    return (Array.isArray(value) &&
        value.every((v) => typeof v.index === "number"));
}
function _mergeDicts(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
left, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
right
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    const merged = { ...left };
    for (const [key, value] of Object.entries(right)) {
        if (merged[key] == null) {
            merged[key] = value;
        }
        else if (value == null) {
            continue;
        }
        else if (typeof merged[key] !== typeof value ||
            Array.isArray(merged[key]) !== Array.isArray(value)) {
            throw new Error(`field[${key}] already exists in the message chunk, but with a different type.`);
        }
        else if (typeof merged[key] === "string") {
            if (key === "type") {
                // Do not merge 'type' fields
                continue;
            }
            merged[key] += value;
        }
        else if (typeof merged[key] === "object" && !Array.isArray(merged[key])) {
            merged[key] = _mergeDicts(merged[key], value);
        }
        else if (Array.isArray(merged[key])) {
            merged[key] = _mergeLists(merged[key], value);
        }
        else if (merged[key] === value) {
            continue;
        }
        else {
            console.warn(`field[${key}] already exists in this message chunk and value has unsupported type.`);
        }
    }
    return merged;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _mergeLists(left, right) {
    if (left === undefined && right === undefined) {
        return undefined;
    }
    else if (left === undefined || right === undefined) {
        return left || right;
    }
    else {
        const merged = [...left];
        for (const item of right) {
            if (typeof item === "object" &&
                "index" in item &&
                typeof item.index === "number") {
                const toMerge = merged.findIndex((leftItem) => leftItem.index === item.index);
                if (toMerge !== -1) {
                    merged[toMerge] = _mergeDicts(merged[toMerge], item);
                }
                else {
                    merged.push(item);
                }
            }
            else if (typeof item === "object" &&
                "text" in item &&
                item.text === "") {
                // No-op - skip empty text blocks
                continue;
            }
            else {
                merged.push(item);
            }
        }
        return merged;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _mergeObj(left, right) {
    if (!left && !right) {
        throw new Error("Cannot merge two undefined objects.");
    }
    if (!left || !right) {
        return left || right;
    }
    else if (typeof left !== typeof right) {
        throw new Error(`Cannot merge objects of different types.\nLeft ${typeof left}\nRight ${typeof right}`);
    }
    else if (typeof left === "string" && typeof right === "string") {
        return (left + right);
    }
    else if (Array.isArray(left) && Array.isArray(right)) {
        return _mergeLists(left, right);
    }
    else if (typeof left === "object" && typeof right === "object") {
        return _mergeDicts(left, right);
    }
    else if (left === right) {
        return left;
    }
    else {
        throw new Error(`Can not merge objects of different types.\nLeft ${left}\nRight ${right}`);
    }
}
/**
 * Represents a chunk of a message, which can be concatenated with other
 * message chunks. It includes a method `_merge_kwargs_dict()` for merging
 * additional keyword arguments from another `BaseMessageChunk` into this
 * one. It also overrides the `__add__()` method to support concatenation
 * of `BaseMessageChunk` instances.
 */
class BaseMessageChunk extends BaseMessage {
}
function _isMessageFieldWithRole(x) {
    return typeof x.role === "string";
}
function isBaseMessage(messageLike) {
    return typeof messageLike?._getType === "function";
}
function isBaseMessageChunk(messageLike) {
    return (isBaseMessage(messageLike) &&
        typeof messageLike.concat === "function");
}


/***/ }),

/***/ 3101:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X0: () => (/* binding */ getGlobalAsyncLocalStorageInstance),
/* harmony export */   hr: () => (/* binding */ _CONTEXT_VARIABLES_KEY),
/* harmony export */   pH: () => (/* binding */ setGlobalAsyncLocalStorageInstance)
/* harmony export */ });
/* unused harmony export TRACING_ALS_KEY */
const TRACING_ALS_KEY = Symbol.for("ls:tracing_async_local_storage");
const _CONTEXT_VARIABLES_KEY = Symbol.for("lc:context_variables");
const setGlobalAsyncLocalStorageInstance = (instance) => {
    globalThis[TRACING_ALS_KEY] = instance;
};
const getGlobalAsyncLocalStorageInstance = () => {
    return globalThis[TRACING_ALS_KEY];
};


/***/ }),

/***/ 3453:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ AsyncCaller)
/* harmony export */ });
/* harmony import */ var p_retry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7091);
/* harmony import */ var p_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4896);


const STATUS_NO_RETRY = [
    400,
    401,
    402,
    403,
    404,
    405,
    406,
    407,
    409, // Conflict
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultFailedAttemptHandler = (error) => {
    if (error.message.startsWith("Cancel") ||
        error.message.startsWith("AbortError") ||
        error.name === "AbortError") {
        throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error?.code === "ECONNABORTED") {
        throw error;
    }
    const status = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?.response?.status ?? error?.status;
    if (status && STATUS_NO_RETRY.includes(+status)) {
        throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error?.error?.code === "insufficient_quota") {
        const err = new Error(error?.message);
        err.name = "InsufficientQuotaError";
        throw err;
    }
};
/**
 * A class that can be used to make async calls with concurrency and retry logic.
 *
 * This is useful for making calls to any kind of "expensive" external resource,
 * be it because it's rate-limited, subject to network issues, etc.
 *
 * Concurrent calls are limited by the `maxConcurrency` parameter, which defaults
 * to `Infinity`. This means that by default, all calls will be made in parallel.
 *
 * Retries are limited by the `maxRetries` parameter, which defaults to 6. This
 * means that by default, each call will be retried up to 6 times, with an
 * exponential backoff between each attempt.
 */
class AsyncCaller {
    constructor(params) {
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFailedAttempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 6;
        this.onFailedAttempt =
            params.onFailedAttempt ?? defaultFailedAttemptHandler;
        const PQueue =  true ? p_queue__WEBPACK_IMPORTED_MODULE_1__["default"] : p_queue__WEBPACK_IMPORTED_MODULE_1__;
        this.queue = new PQueue({ concurrency: this.maxConcurrency });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        return this.queue.add(() => p_retry__WEBPACK_IMPORTED_MODULE_0__(() => callable(...args).catch((error) => {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (error instanceof Error) {
                throw error;
            }
            else {
                throw new Error(error);
            }
        }), {
            onFailedAttempt: this.onFailedAttempt,
            retries: this.maxRetries,
            randomize: true,
            // If needed we can change some of the defaults here,
            // but they're quite sensible.
        }), { throwOnTimeout: true });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) {
            return Promise.race([
                this.call(callable, ...args),
                new Promise((_, reject) => {
                    options.signal?.addEventListener("abort", () => {
                        reject(new Error("AbortError"));
                    });
                }),
            ]);
        }
        return this.call(callable, ...args);
    }
    fetch(...args) {
        return this.call(() => fetch(...args).then((res) => (res.ok ? res : Promise.reject(res))));
    }
}


/***/ }),

/***/ 3526:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ warnOnce)
/* harmony export */ });
const warnedMessages = {};
function warnOnce(message) {
    if (!warnedMessages[message]) {
        console.warn(message);
        warnedMessages[message] = true;
    }
}


/***/ }),

/***/ 3858:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ik: () => (/* reexport */ zodToJsonSchema_zodToJsonSchema)
});

// UNUSED EXPORTS: addErrorMessage, default, defaultOptions, getDefaultOptions, getRefs, ignoreOverride, jsonDescription, parseAnyDef, parseArrayDef, parseBigintDef, parseBooleanDef, parseBrandedDef, parseCatchDef, parseDateDef, parseDef, parseDefaultDef, parseEffectsDef, parseEnumDef, parseIntersectionDef, parseLiteralDef, parseMapDef, parseNativeEnumDef, parseNeverDef, parseNullDef, parseNullableDef, parseNumberDef, parseObjectDef, parseOptionalDef, parsePipelineDef, parsePromiseDef, parseReadonlyDef, parseRecordDef, parseSetDef, parseStringDef, parseTupleDef, parseUndefinedDef, parseUnionDef, parseUnknownDef, primitiveMappings, selectParser, setResponseValueAndErrors, zodPatterns

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/Options.js
const ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
const jsonDescription = (jsonSchema, def) => {
    if (def.description) {
        try {
            return {
                ...jsonSchema,
                ...JSON.parse(def.description),
            };
        }
        catch { }
    }
    return jsonSchema;
};
const defaultOptions = {
    name: undefined,
    $refStrategy: "root",
    basePath: ["#"],
    effectStrategy: "input",
    pipeStrategy: "all",
    dateStrategy: "format:date-time",
    mapStrategy: "entries",
    removeAdditionalStrategy: "passthrough",
    allowedAdditionalProperties: true,
    rejectedAdditionalProperties: false,
    definitionPath: "definitions",
    target: "jsonSchema7",
    strictUnions: false,
    definitions: {},
    errorMessages: false,
    markdownDescription: false,
    patternStrategy: "escape",
    applyRegexFlags: false,
    emailStrategy: "format:email",
    base64Strategy: "contentEncoding:base64",
    nameStrategy: "ref",
};
const getDefaultOptions = (options) => (typeof options === "string"
    ? {
        ...defaultOptions,
        name: options,
    }
    : {
        ...defaultOptions,
        ...options,
    });

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/Refs.js

const getRefs = (options) => {
    const _options = getDefaultOptions(options);
    const currentPath = _options.name !== undefined
        ? [..._options.basePath, _options.definitionPath, _options.name]
        : _options.basePath;
    return {
        ..._options,
        currentPath: currentPath,
        propertyPath: undefined,
        seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
            def._def,
            {
                def: def._def,
                path: [..._options.basePath, _options.definitionPath, name],
                // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
                jsonSchema: undefined,
            },
        ])),
    };
};

// EXTERNAL MODULE: ./node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs
var lib = __webpack_require__(5112);
;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
    return {};
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
    if (!refs?.errorMessages)
        return;
    if (errorMessage) {
        res.errorMessage = {
            ...res.errorMessage,
            [key]: errorMessage,
        };
    }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
    res[key] = value;
    addErrorMessage(res, key, errorMessage, refs);
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/array.js



function parseArrayDef(def, refs) {
    const res = {
        type: "array",
    };
    if (def.type?._def &&
        def.type?._def?.typeName !== lib/* ZodFirstPartyTypeKind */.kY.ZodAny) {
        res.items = parseDef(def.type._def, {
            ...refs,
            currentPath: [...refs.currentPath, "items"],
        });
    }
    if (def.minLength) {
        setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
    }
    if (def.maxLength) {
        setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
    }
    if (def.exactLength) {
        setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
        setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
    }
    return res;
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js

function parseBigintDef(def, refs) {
    const res = {
        type: "integer",
        format: "int64",
    };
    if (!def.checks)
        return res;
    for (const check of def.checks) {
        switch (check.kind) {
            case "min":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                }
                break;
            case "max":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                }
                break;
            case "multipleOf":
                setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
                break;
        }
    }
    return res;
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
    return {
        type: "boolean",
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/branded.js

function parseBrandedDef(_def, refs) {
    return parseDef(_def.type._def, refs);
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/catch.js

const parseCatchDef = (def, refs) => {
    return parseDef(def.innerType._def, refs);
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/date.js

function parseDateDef(def, refs, overrideDateStrategy) {
    const strategy = overrideDateStrategy ?? refs.dateStrategy;
    if (Array.isArray(strategy)) {
        return {
            anyOf: strategy.map((item, i) => parseDateDef(def, refs, item)),
        };
    }
    switch (strategy) {
        case "string":
        case "format:date-time":
            return {
                type: "string",
                format: "date-time",
            };
        case "format:date":
            return {
                type: "string",
                format: "date",
            };
        case "integer":
            return integerDateParser(def, refs);
    }
}
const integerDateParser = (def, refs) => {
    const res = {
        type: "integer",
        format: "unix-time",
    };
    if (refs.target === "openApi3") {
        return res;
    }
    for (const check of def.checks) {
        switch (check.kind) {
            case "min":
                setResponseValueAndErrors(res, "minimum", check.value, // This is in milliseconds
                check.message, refs);
                break;
            case "max":
                setResponseValueAndErrors(res, "maximum", check.value, // This is in milliseconds
                check.message, refs);
                break;
        }
    }
    return res;
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/default.js

function parseDefaultDef(_def, refs) {
    return {
        ...parseDef(_def.innerType._def, refs),
        default: _def.defaultValue(),
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/effects.js

function parseEffectsDef(_def, refs) {
    return refs.effectStrategy === "input"
        ? parseDef(_def.schema._def, refs)
        : {};
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
    return {
        type: "string",
        enum: Array.from(def.values),
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js

const isJsonSchema7AllOfType = (type) => {
    if ("type" in type && type.type === "string")
        return false;
    return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
    const allOf = [
        parseDef(def.left._def, {
            ...refs,
            currentPath: [...refs.currentPath, "allOf", "0"],
        }),
        parseDef(def.right._def, {
            ...refs,
            currentPath: [...refs.currentPath, "allOf", "1"],
        }),
    ].filter((x) => !!x);
    let unevaluatedProperties = refs.target === "jsonSchema2019-09"
        ? { unevaluatedProperties: false }
        : undefined;
    const mergedAllOf = [];
    // If either of the schemas is an allOf, merge them into a single allOf
    allOf.forEach((schema) => {
        if (isJsonSchema7AllOfType(schema)) {
            mergedAllOf.push(...schema.allOf);
            if (schema.unevaluatedProperties === undefined) {
                // If one of the schemas has no unevaluatedProperties set,
                // the merged schema should also have no unevaluatedProperties set
                unevaluatedProperties = undefined;
            }
        }
        else {
            let nestedSchema = schema;
            if ("additionalProperties" in schema &&
                schema.additionalProperties === false) {
                const { additionalProperties, ...rest } = schema;
                nestedSchema = rest;
            }
            else {
                // As soon as one of the schemas has additionalProperties set not to false, we allow unevaluatedProperties
                unevaluatedProperties = undefined;
            }
            mergedAllOf.push(nestedSchema);
        }
    });
    return mergedAllOf.length
        ? {
            allOf: mergedAllOf,
            ...unevaluatedProperties,
        }
        : undefined;
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
    const parsedType = typeof def.value;
    if (parsedType !== "bigint" &&
        parsedType !== "number" &&
        parsedType !== "boolean" &&
        parsedType !== "string") {
        return {
            type: Array.isArray(def.value) ? "array" : "object",
        };
    }
    if (refs.target === "openApi3") {
        return {
            type: parsedType === "bigint" ? "integer" : parsedType,
            enum: [def.value],
        };
    }
    return {
        type: parsedType === "bigint" ? "integer" : parsedType,
        const: def.value,
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/string.js

let emojiRegex = undefined;
/**
 * Generated from the regular expressions found here as of 2024-05-22:
 * https://github.com/colinhacks/zod/blob/master/src/types.ts.
 *
 * Expressions with /i flag have been changed accordingly.
 */
const zodPatterns = {
    /**
     * `c` was changed to `[cC]` to replicate /i flag
     */
    cuid: /^[cC][^\s-]{8,}$/,
    cuid2: /^[0-9a-z]+$/,
    ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
    /**
     * `a-z` was added to replicate /i flag
     */
    email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
    /**
     * Constructed a valid Unicode RegExp
     *
     * Lazily instantiate since this type of regex isn't supported
     * in all envs (e.g. React Native).
     *
     * See:
     * https://github.com/colinhacks/zod/issues/2433
     * Fix in Zod:
     * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
     */
    emoji: () => {
        if (emojiRegex === undefined) {
            emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
        }
        return emojiRegex;
    },
    /**
     * Unused
     */
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
    /**
     * Unused
     */
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    /**
     * Unused
     */
    ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    nanoid: /^[a-zA-Z0-9_-]{21}$/,
    jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
};
function parseStringDef(def, refs) {
    const res = {
        type: "string",
    };
    if (def.checks) {
        for (const check of def.checks) {
            switch (check.kind) {
                case "min":
                    setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number"
                        ? Math.max(res.minLength, check.value)
                        : check.value, check.message, refs);
                    break;
                case "max":
                    setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number"
                        ? Math.min(res.maxLength, check.value)
                        : check.value, check.message, refs);
                    break;
                case "email":
                    switch (refs.emailStrategy) {
                        case "format:email":
                            addFormat(res, "email", check.message, refs);
                            break;
                        case "format:idn-email":
                            addFormat(res, "idn-email", check.message, refs);
                            break;
                        case "pattern:zod":
                            addPattern(res, zodPatterns.email, check.message, refs);
                            break;
                    }
                    break;
                case "url":
                    addFormat(res, "uri", check.message, refs);
                    break;
                case "uuid":
                    addFormat(res, "uuid", check.message, refs);
                    break;
                case "regex":
                    addPattern(res, check.regex, check.message, refs);
                    break;
                case "cuid":
                    addPattern(res, zodPatterns.cuid, check.message, refs);
                    break;
                case "cuid2":
                    addPattern(res, zodPatterns.cuid2, check.message, refs);
                    break;
                case "startsWith":
                    addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
                    break;
                case "endsWith":
                    addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
                    break;
                case "datetime":
                    addFormat(res, "date-time", check.message, refs);
                    break;
                case "date":
                    addFormat(res, "date", check.message, refs);
                    break;
                case "time":
                    addFormat(res, "time", check.message, refs);
                    break;
                case "duration":
                    addFormat(res, "duration", check.message, refs);
                    break;
                case "length":
                    setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number"
                        ? Math.max(res.minLength, check.value)
                        : check.value, check.message, refs);
                    setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number"
                        ? Math.min(res.maxLength, check.value)
                        : check.value, check.message, refs);
                    break;
                case "includes": {
                    addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
                    break;
                }
                case "ip": {
                    if (check.version !== "v6") {
                        addFormat(res, "ipv4", check.message, refs);
                    }
                    if (check.version !== "v4") {
                        addFormat(res, "ipv6", check.message, refs);
                    }
                    break;
                }
                case "base64url":
                    addPattern(res, zodPatterns.base64url, check.message, refs);
                    break;
                case "jwt":
                    addPattern(res, zodPatterns.jwt, check.message, refs);
                    break;
                case "cidr": {
                    if (check.version !== "v6") {
                        addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
                    }
                    if (check.version !== "v4") {
                        addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
                    }
                    break;
                }
                case "emoji":
                    addPattern(res, zodPatterns.emoji(), check.message, refs);
                    break;
                case "ulid": {
                    addPattern(res, zodPatterns.ulid, check.message, refs);
                    break;
                }
                case "base64": {
                    switch (refs.base64Strategy) {
                        case "format:binary": {
                            addFormat(res, "binary", check.message, refs);
                            break;
                        }
                        case "contentEncoding:base64": {
                            setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
                            break;
                        }
                        case "pattern:zod": {
                            addPattern(res, zodPatterns.base64, check.message, refs);
                            break;
                        }
                    }
                    break;
                }
                case "nanoid": {
                    addPattern(res, zodPatterns.nanoid, check.message, refs);
                }
                case "toLowerCase":
                case "toUpperCase":
                case "trim":
                    break;
                default:
                    /* c8 ignore next */
                    ((_) => { })(check);
            }
        }
    }
    return res;
}
function escapeLiteralCheckValue(literal, refs) {
    return refs.patternStrategy === "escape"
        ? escapeNonAlphaNumeric(literal)
        : literal;
}
const ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
    let result = "";
    for (let i = 0; i < source.length; i++) {
        if (!ALPHA_NUMERIC.has(source[i])) {
            result += "\\";
        }
        result += source[i];
    }
    return result;
}
// Adds a "format" keyword to the schema. If a format exists, both formats will be joined in an allOf-node, along with subsequent ones.
function addFormat(schema, value, message, refs) {
    if (schema.format || schema.anyOf?.some((x) => x.format)) {
        if (!schema.anyOf) {
            schema.anyOf = [];
        }
        if (schema.format) {
            schema.anyOf.push({
                format: schema.format,
                ...(schema.errorMessage &&
                    refs.errorMessages && {
                    errorMessage: { format: schema.errorMessage.format },
                }),
            });
            delete schema.format;
            if (schema.errorMessage) {
                delete schema.errorMessage.format;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.anyOf.push({
            format: value,
            ...(message &&
                refs.errorMessages && { errorMessage: { format: message } }),
        });
    }
    else {
        setResponseValueAndErrors(schema, "format", value, message, refs);
    }
}
// Adds a "pattern" keyword to the schema. If a pattern exists, both patterns will be joined in an allOf-node, along with subsequent ones.
function addPattern(schema, regex, message, refs) {
    if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
        if (!schema.allOf) {
            schema.allOf = [];
        }
        if (schema.pattern) {
            schema.allOf.push({
                pattern: schema.pattern,
                ...(schema.errorMessage &&
                    refs.errorMessages && {
                    errorMessage: { pattern: schema.errorMessage.pattern },
                }),
            });
            delete schema.pattern;
            if (schema.errorMessage) {
                delete schema.errorMessage.pattern;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.allOf.push({
            pattern: stringifyRegExpWithFlags(regex, refs),
            ...(message &&
                refs.errorMessages && { errorMessage: { pattern: message } }),
        });
    }
    else {
        setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
    }
}
// Mutate z.string.regex() in a best attempt to accommodate for regex flags when applyRegexFlags is true
function stringifyRegExpWithFlags(regex, refs) {
    if (!refs.applyRegexFlags || !regex.flags) {
        return regex.source;
    }
    // Currently handled flags
    const flags = {
        i: regex.flags.includes("i"),
        m: regex.flags.includes("m"),
        s: regex.flags.includes("s"), // `.` matches newlines
    };
    // The general principle here is to step through each character, one at a time, applying mutations as flags require. We keep track when the current character is escaped, and when it's inside a group /like [this]/ or (also) a range like /[a-z]/. The following is fairly brittle imperative code; edit at your peril!
    const source = flags.i ? regex.source.toLowerCase() : regex.source;
    let pattern = "";
    let isEscaped = false;
    let inCharGroup = false;
    let inCharRange = false;
    for (let i = 0; i < source.length; i++) {
        if (isEscaped) {
            pattern += source[i];
            isEscaped = false;
            continue;
        }
        if (flags.i) {
            if (inCharGroup) {
                if (source[i].match(/[a-z]/)) {
                    if (inCharRange) {
                        pattern += source[i];
                        pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
                        inCharRange = false;
                    }
                    else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
                        pattern += source[i];
                        inCharRange = true;
                    }
                    else {
                        pattern += `${source[i]}${source[i].toUpperCase()}`;
                    }
                    continue;
                }
            }
            else if (source[i].match(/[a-z]/)) {
                pattern += `[${source[i]}${source[i].toUpperCase()}]`;
                continue;
            }
        }
        if (flags.m) {
            if (source[i] === "^") {
                pattern += `(^|(?<=[\r\n]))`;
                continue;
            }
            else if (source[i] === "$") {
                pattern += `($|(?=[\r\n]))`;
                continue;
            }
        }
        if (flags.s && source[i] === ".") {
            pattern += inCharGroup ? `${source[i]}\r\n` : `[${source[i]}\r\n]`;
            continue;
        }
        pattern += source[i];
        if (source[i] === "\\") {
            isEscaped = true;
        }
        else if (inCharGroup && source[i] === "]") {
            inCharGroup = false;
        }
        else if (!inCharGroup && source[i] === "[") {
            inCharGroup = true;
        }
    }
    try {
        new RegExp(pattern);
    }
    catch {
        console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
        return regex.source;
    }
    return pattern;
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/record.js




function parseRecordDef(def, refs) {
    if (refs.target === "openAi") {
        console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
    }
    if (refs.target === "openApi3" &&
        def.keyType?._def.typeName === lib/* ZodFirstPartyTypeKind */.kY.ZodEnum) {
        return {
            type: "object",
            required: def.keyType._def.values,
            properties: def.keyType._def.values.reduce((acc, key) => ({
                ...acc,
                [key]: parseDef(def.valueType._def, {
                    ...refs,
                    currentPath: [...refs.currentPath, "properties", key],
                }) ?? {},
            }), {}),
            additionalProperties: refs.rejectedAdditionalProperties,
        };
    }
    const schema = {
        type: "object",
        additionalProperties: parseDef(def.valueType._def, {
            ...refs,
            currentPath: [...refs.currentPath, "additionalProperties"],
        }) ?? refs.allowedAdditionalProperties,
    };
    if (refs.target === "openApi3") {
        return schema;
    }
    if (def.keyType?._def.typeName === lib/* ZodFirstPartyTypeKind */.kY.ZodString &&
        def.keyType._def.checks?.length) {
        const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
        return {
            ...schema,
            propertyNames: keyType,
        };
    }
    else if (def.keyType?._def.typeName === lib/* ZodFirstPartyTypeKind */.kY.ZodEnum) {
        return {
            ...schema,
            propertyNames: {
                enum: def.keyType._def.values,
            },
        };
    }
    else if (def.keyType?._def.typeName === lib/* ZodFirstPartyTypeKind */.kY.ZodBranded &&
        def.keyType._def.type._def.typeName === lib/* ZodFirstPartyTypeKind */.kY.ZodString &&
        def.keyType._def.type._def.checks?.length) {
        const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
        return {
            ...schema,
            propertyNames: keyType,
        };
    }
    return schema;
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/map.js


function parseMapDef(def, refs) {
    if (refs.mapStrategy === "record") {
        return parseRecordDef(def, refs);
    }
    const keys = parseDef(def.keyType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", "items", "0"],
    }) || {};
    const values = parseDef(def.valueType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", "items", "1"],
    }) || {};
    return {
        type: "array",
        maxItems: 125,
        items: {
            type: "array",
            items: [keys, values],
            minItems: 2,
            maxItems: 2,
        },
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
    const object = def.values;
    const actualKeys = Object.keys(def.values).filter((key) => {
        return typeof object[object[key]] !== "number";
    });
    const actualValues = actualKeys.map((key) => object[key]);
    const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
    return {
        type: parsedTypes.length === 1
            ? parsedTypes[0] === "string"
                ? "string"
                : "number"
            : ["string", "number"],
        enum: actualValues,
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
    return {
        not: {},
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
    return refs.target === "openApi3"
        ? {
            enum: ["null"],
            nullable: true,
        }
        : {
            type: "null",
        };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/union.js

const primitiveMappings = {
    ZodString: "string",
    ZodNumber: "number",
    ZodBigInt: "integer",
    ZodBoolean: "boolean",
    ZodNull: "null",
};
function parseUnionDef(def, refs) {
    if (refs.target === "openApi3")
        return asAnyOf(def, refs);
    const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
    // This blocks tries to look ahead a bit to produce nicer looking schemas with type array instead of anyOf.
    if (options.every((x) => x._def.typeName in primitiveMappings &&
        (!x._def.checks || !x._def.checks.length))) {
        // all types in union are primitive and lack checks, so might as well squash into {type: [...]}
        const types = options.reduce((types, x) => {
            const type = primitiveMappings[x._def.typeName]; //Can be safely casted due to row 43
            return type && !types.includes(type) ? [...types, type] : types;
        }, []);
        return {
            type: types.length > 1 ? types : types[0],
        };
    }
    else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
        // all options literals
        const types = options.reduce((acc, x) => {
            const type = typeof x._def.value;
            switch (type) {
                case "string":
                case "number":
                case "boolean":
                    return [...acc, type];
                case "bigint":
                    return [...acc, "integer"];
                case "object":
                    if (x._def.value === null)
                        return [...acc, "null"];
                case "symbol":
                case "undefined":
                case "function":
                default:
                    return acc;
            }
        }, []);
        if (types.length === options.length) {
            // all the literals are primitive, as far as null can be considered primitive
            const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
            return {
                type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
                enum: options.reduce((acc, x) => {
                    return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
                }, []),
            };
        }
    }
    else if (options.every((x) => x._def.typeName === "ZodEnum")) {
        return {
            type: "string",
            enum: options.reduce((acc, x) => [
                ...acc,
                ...x._def.values.filter((x) => !acc.includes(x)),
            ], []),
        };
    }
    return asAnyOf(def, refs);
}
const asAnyOf = (def, refs) => {
    const anyOf = (def.options instanceof Map
        ? Array.from(def.options.values())
        : def.options)
        .map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", `${i}`],
    }))
        .filter((x) => !!x &&
        (!refs.strictUnions ||
            (typeof x === "object" && Object.keys(x).length > 0)));
    return anyOf.length ? { anyOf } : undefined;
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js


function parseNullableDef(def, refs) {
    if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) &&
        (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
        if (refs.target === "openApi3") {
            return {
                type: primitiveMappings[def.innerType._def.typeName],
                nullable: true,
            };
        }
        return {
            type: [
                primitiveMappings[def.innerType._def.typeName],
                "null",
            ],
        };
    }
    if (refs.target === "openApi3") {
        const base = parseDef(def.innerType._def, {
            ...refs,
            currentPath: [...refs.currentPath],
        });
        if (base && "$ref" in base)
            return { allOf: [base], nullable: true };
        return base && { ...base, nullable: true };
    }
    const base = parseDef(def.innerType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", "0"],
    });
    return base && { anyOf: [base, { type: "null" }] };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/number.js

function parseNumberDef(def, refs) {
    const res = {
        type: "number",
    };
    if (!def.checks)
        return res;
    for (const check of def.checks) {
        switch (check.kind) {
            case "int":
                res.type = "integer";
                addErrorMessage(res, "type", check.message, refs);
                break;
            case "min":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                }
                break;
            case "max":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                }
                break;
            case "multipleOf":
                setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
                break;
        }
    }
    return res;
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/object.js


function parseObjectDef(def, refs) {
    const forceOptionalIntoNullable = refs.target === "openAi";
    const result = {
        type: "object",
        properties: {},
    };
    const required = [];
    const shape = def.shape();
    for (const propName in shape) {
        let propDef = shape[propName];
        if (propDef === undefined || propDef._def === undefined) {
            continue;
        }
        let propOptional = safeIsOptional(propDef);
        if (propOptional && forceOptionalIntoNullable) {
            if (propDef instanceof lib/* ZodOptional */.Ii) {
                propDef = propDef._def.innerType;
            }
            if (!propDef.isNullable()) {
                propDef = propDef.nullable();
            }
            propOptional = false;
        }
        const parsedDef = parseDef(propDef._def, {
            ...refs,
            currentPath: [...refs.currentPath, "properties", propName],
            propertyPath: [...refs.currentPath, "properties", propName],
        });
        if (parsedDef === undefined) {
            continue;
        }
        result.properties[propName] = parsedDef;
        if (!propOptional) {
            required.push(propName);
        }
    }
    if (required.length) {
        result.required = required;
    }
    const additionalProperties = decideAdditionalProperties(def, refs);
    if (additionalProperties !== undefined) {
        result.additionalProperties = additionalProperties;
    }
    return result;
}
function decideAdditionalProperties(def, refs) {
    if (def.catchall._def.typeName !== "ZodNever") {
        return parseDef(def.catchall._def, {
            ...refs,
            currentPath: [...refs.currentPath, "additionalProperties"],
        });
    }
    switch (def.unknownKeys) {
        case "passthrough":
            return refs.allowedAdditionalProperties;
        case "strict":
            return refs.rejectedAdditionalProperties;
        case "strip":
            return refs.removeAdditionalStrategy === "strict"
                ? refs.allowedAdditionalProperties
                : refs.rejectedAdditionalProperties;
    }
}
function safeIsOptional(schema) {
    try {
        return schema.isOptional();
    }
    catch {
        return true;
    }
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/optional.js

const parseOptionalDef = (def, refs) => {
    if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
        return parseDef(def.innerType._def, refs);
    }
    const innerSchema = parseDef(def.innerType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", "1"],
    });
    return innerSchema
        ? {
            anyOf: [
                {
                    not: {},
                },
                innerSchema,
            ],
        }
        : {};
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js

const parsePipelineDef = (def, refs) => {
    if (refs.pipeStrategy === "input") {
        return parseDef(def.in._def, refs);
    }
    else if (refs.pipeStrategy === "output") {
        return parseDef(def.out._def, refs);
    }
    const a = parseDef(def.in._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", "0"],
    });
    const b = parseDef(def.out._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"],
    });
    return {
        allOf: [a, b].filter((x) => x !== undefined),
    };
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/promise.js

function parsePromiseDef(def, refs) {
    return parseDef(def.type._def, refs);
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/set.js


function parseSetDef(def, refs) {
    const items = parseDef(def.valueType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items"],
    });
    const schema = {
        type: "array",
        uniqueItems: true,
        items,
    };
    if (def.minSize) {
        setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
    }
    if (def.maxSize) {
        setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
    }
    return schema;
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js

function parseTupleDef(def, refs) {
    if (def.rest) {
        return {
            type: "array",
            minItems: def.items.length,
            items: def.items
                .map((x, i) => parseDef(x._def, {
                ...refs,
                currentPath: [...refs.currentPath, "items", `${i}`],
            }))
                .reduce((acc, x) => (x === undefined ? acc : [...acc, x]), []),
            additionalItems: parseDef(def.rest._def, {
                ...refs,
                currentPath: [...refs.currentPath, "additionalItems"],
            }),
        };
    }
    else {
        return {
            type: "array",
            minItems: def.items.length,
            maxItems: def.items.length,
            items: def.items
                .map((x, i) => parseDef(x._def, {
                ...refs,
                currentPath: [...refs.currentPath, "items", `${i}`],
            }))
                .reduce((acc, x) => (x === undefined ? acc : [...acc, x]), []),
        };
    }
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
    return {
        not: {},
    };
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
    return {};
}

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js

const parseReadonlyDef = (def, refs) => {
    return parseDef(def.innerType._def, refs);
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/selectParser.js































const selectParser = (def, typeName, refs) => {
    switch (typeName) {
        case lib/* ZodFirstPartyTypeKind */.kY.ZodString:
            return parseStringDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodNumber:
            return parseNumberDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodObject:
            return parseObjectDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodBigInt:
            return parseBigintDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodBoolean:
            return parseBooleanDef();
        case lib/* ZodFirstPartyTypeKind */.kY.ZodDate:
            return parseDateDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodUndefined:
            return parseUndefinedDef();
        case lib/* ZodFirstPartyTypeKind */.kY.ZodNull:
            return parseNullDef(refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodArray:
            return parseArrayDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodUnion:
        case lib/* ZodFirstPartyTypeKind */.kY.ZodDiscriminatedUnion:
            return parseUnionDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodIntersection:
            return parseIntersectionDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodTuple:
            return parseTupleDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodRecord:
            return parseRecordDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodLiteral:
            return parseLiteralDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodEnum:
            return parseEnumDef(def);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodNativeEnum:
            return parseNativeEnumDef(def);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodNullable:
            return parseNullableDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodOptional:
            return parseOptionalDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodMap:
            return parseMapDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodSet:
            return parseSetDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodLazy:
            return () => def.getter()._def;
        case lib/* ZodFirstPartyTypeKind */.kY.ZodPromise:
            return parsePromiseDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodNaN:
        case lib/* ZodFirstPartyTypeKind */.kY.ZodNever:
            return parseNeverDef();
        case lib/* ZodFirstPartyTypeKind */.kY.ZodEffects:
            return parseEffectsDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodAny:
            return parseAnyDef();
        case lib/* ZodFirstPartyTypeKind */.kY.ZodUnknown:
            return parseUnknownDef();
        case lib/* ZodFirstPartyTypeKind */.kY.ZodDefault:
            return parseDefaultDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodBranded:
            return parseBrandedDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodReadonly:
            return parseReadonlyDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodCatch:
            return parseCatchDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodPipeline:
            return parsePipelineDef(def, refs);
        case lib/* ZodFirstPartyTypeKind */.kY.ZodFunction:
        case lib/* ZodFirstPartyTypeKind */.kY.ZodVoid:
        case lib/* ZodFirstPartyTypeKind */.kY.ZodSymbol:
            return undefined;
        default:
            /* c8 ignore next */
            return ((_) => undefined)(typeName);
    }
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/parseDef.js


function parseDef(def, refs, forceResolution = false) {
    const seenItem = refs.seen.get(def);
    if (refs.override) {
        const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
        if (overrideResult !== ignoreOverride) {
            return overrideResult;
        }
    }
    if (seenItem && !forceResolution) {
        const seenSchema = get$ref(seenItem, refs);
        if (seenSchema !== undefined) {
            return seenSchema;
        }
    }
    const newItem = { def, path: refs.currentPath, jsonSchema: undefined };
    refs.seen.set(def, newItem);
    const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
    // If the return was a function, then the inner definition needs to be extracted before a call to parseDef (recursive)
    const jsonSchema = typeof jsonSchemaOrGetter === "function"
        ? parseDef(jsonSchemaOrGetter(), refs)
        : jsonSchemaOrGetter;
    if (jsonSchema) {
        addMeta(def, refs, jsonSchema);
    }
    if (refs.postProcess) {
        const postProcessResult = refs.postProcess(jsonSchema, def, refs);
        newItem.jsonSchema = jsonSchema;
        return postProcessResult;
    }
    newItem.jsonSchema = jsonSchema;
    return jsonSchema;
}
const get$ref = (item, refs) => {
    switch (refs.$refStrategy) {
        case "root":
            return { $ref: item.path.join("/") };
        case "relative":
            return { $ref: getRelativePath(refs.currentPath, item.path) };
        case "none":
        case "seen": {
            if (item.path.length < refs.currentPath.length &&
                item.path.every((value, index) => refs.currentPath[index] === value)) {
                console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
                return {};
            }
            return refs.$refStrategy === "seen" ? {} : undefined;
        }
    }
};
const getRelativePath = (pathA, pathB) => {
    let i = 0;
    for (; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] !== pathB[i])
            break;
    }
    return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
const addMeta = (def, refs, jsonSchema) => {
    if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
            jsonSchema.markdownDescription = def.description;
        }
    }
    return jsonSchema;
};

;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js


const zodToJsonSchema_zodToJsonSchema = (schema, options) => {
    const refs = getRefs(options);
    const definitions = typeof options === "object" && options.definitions
        ? Object.entries(options.definitions).reduce((acc, [name, schema]) => ({
            ...acc,
            [name]: parseDef(schema._def, {
                ...refs,
                currentPath: [...refs.basePath, refs.definitionPath, name],
            }, true) ?? {},
        }), {})
        : undefined;
    const name = typeof options === "string"
        ? options
        : options?.nameStrategy === "title"
            ? undefined
            : options?.name;
    const main = parseDef(schema._def, name === undefined
        ? refs
        : {
            ...refs,
            currentPath: [...refs.basePath, refs.definitionPath, name],
        }, false) ?? {};
    const title = typeof options === "object" &&
        options.name !== undefined &&
        options.nameStrategy === "title"
        ? options.name
        : undefined;
    if (title !== undefined) {
        main.title = title;
    }
    const combined = name === undefined
        ? definitions
            ? {
                ...main,
                [refs.definitionPath]: definitions,
            }
            : main
        : {
            $ref: [
                ...(refs.$refStrategy === "relative" ? [] : refs.basePath),
                refs.definitionPath,
                name,
            ].join("/"),
            [refs.definitionPath]: {
                ...definitions,
                [name]: main,
            },
        };
    if (refs.target === "jsonSchema7") {
        combined.$schema = "http://json-schema.org/draft-07/schema#";
    }
    else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
        combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
    }
    if (refs.target === "openAi" &&
        ("anyOf" in combined ||
            "oneOf" in combined ||
            "allOf" in combined ||
            ("type" in combined && Array.isArray(combined.type)))) {
        console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
    }
    return combined;
};


;// ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/index.js






































/* harmony default export */ const esm = ((/* unused pure expression or super */ null && (zodToJsonSchema)));


/***/ }),

/***/ 4216:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Az: () => (/* binding */ getEnvironmentVariable),
/* harmony export */   Ec: () => (/* binding */ getRuntimeEnvironment)
/* harmony export */ });
/* unused harmony exports isBrowser, isWebWorker, isJsDom, isDeno, isNode, getEnv */
const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const isWebWorker = () => typeof globalThis === "object" &&
    globalThis.constructor &&
    globalThis.constructor.name === "DedicatedWorkerGlobalScope";
const isJsDom = () => (typeof window !== "undefined" && window.name === "nodejs") ||
    (typeof navigator !== "undefined" &&
        (navigator.userAgent.includes("Node.js") ||
            navigator.userAgent.includes("jsdom")));
// Supabase Edge Function provides a `Deno` global object
// without `version` property
const isDeno = () => typeof Deno !== "undefined";
// Mark not-as-node if in Supabase Edge Function
const isNode = () => typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined" &&
    !isDeno();
const getEnv = () => {
    let env;
    if (isBrowser()) {
        env = "browser";
    }
    else if (isNode()) {
        env = "node";
    }
    else if (isWebWorker()) {
        env = "webworker";
    }
    else if (isJsDom()) {
        env = "jsdom";
    }
    else if (isDeno()) {
        env = "deno";
    }
    else {
        env = "other";
    }
    return env;
};
let runtimeEnvironment;
async function getRuntimeEnvironment() {
    if (runtimeEnvironment === undefined) {
        const env = getEnv();
        runtimeEnvironment = {
            library: "langchain-js",
            runtime: env,
        };
    }
    return runtimeEnvironment;
}
function getEnvironmentVariable(name) {
    // Certain Deno setups will throw an error if you try to access environment variables
    // https://github.com/langchain-ai/langchainjs/issues/1412
    try {
        if (typeof process !== "undefined") {
            // eslint-disable-next-line no-process-env
            return process.env?.[name];
        }
        else if (isDeno()) {
            return Deno?.env.get(name);
        }
        else {
            return undefined;
        }
    }
    catch (e) {
        return undefined;
    }
}


/***/ }),

/***/ 4423:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ BaseTracer),
/* harmony export */   j: () => (/* binding */ isBaseTracer)
/* harmony export */ });
/* harmony import */ var _callbacks_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(521);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object"
        ? value
        : { [defaultKey]: value };
}
function stripNonAlphanumeric(input) {
    return input.replace(/[-:.]/g, "");
}
function convertToDottedOrderFormat(epoch, runId, executionOrder) {
    const paddedOrder = executionOrder.toFixed(0).slice(0, 3).padStart(3, "0");
    return (stripNonAlphanumeric(`${new Date(epoch).toISOString().slice(0, -1)}${paddedOrder}Z`) + runId);
}
function isBaseTracer(x) {
    return typeof x._addRunToRunMap === "function";
}
class BaseTracer extends _callbacks_base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseCallbackHandler */ .NK {
    constructor(_fields) {
        super(...arguments);
        Object.defineProperty(this, "runMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    copy() {
        return this;
    }
    stringifyError(error) {
        // eslint-disable-next-line no-instanceof/no-instanceof
        if (error instanceof Error) {
            return error.message + (error?.stack ? `\n\n${error.stack}` : "");
        }
        if (typeof error === "string") {
            return error;
        }
        return `${error}`;
    }
    _addChildRun(parentRun, childRun) {
        parentRun.child_runs.push(childRun);
    }
    _addRunToRunMap(run) {
        const currentDottedOrder = convertToDottedOrderFormat(run.start_time, run.id, run.execution_order);
        const storedRun = { ...run };
        if (storedRun.parent_run_id !== undefined) {
            const parentRun = this.runMap.get(storedRun.parent_run_id);
            if (parentRun) {
                this._addChildRun(parentRun, storedRun);
                parentRun.child_execution_order = Math.max(parentRun.child_execution_order, storedRun.child_execution_order);
                storedRun.trace_id = parentRun.trace_id;
                if (parentRun.dotted_order !== undefined) {
                    storedRun.dotted_order = [
                        parentRun.dotted_order,
                        currentDottedOrder,
                    ].join(".");
                }
                else {
                    // This can happen naturally for callbacks added within a run
                    // console.debug(`Parent run with UUID ${storedRun.parent_run_id} has no dotted order.`);
                }
            }
            else {
                // This can happen naturally for callbacks added within a run
                // console.debug(
                //   `Parent run with UUID ${storedRun.parent_run_id} not found.`
                // );
            }
        }
        else {
            storedRun.trace_id = storedRun.id;
            storedRun.dotted_order = currentDottedOrder;
        }
        this.runMap.set(storedRun.id, storedRun);
        return storedRun;
    }
    async _endTrace(run) {
        const parentRun = run.parent_run_id !== undefined && this.runMap.get(run.parent_run_id);
        if (parentRun) {
            parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
        }
        else {
            await this.persistRun(run);
        }
        this.runMap.delete(run.id);
        await this.onRunUpdate?.(run);
    }
    _getExecutionOrder(parentRunId) {
        const parentRun = parentRunId !== undefined && this.runMap.get(parentRunId);
        // If a run has no parent then execution order is 1
        if (!parentRun) {
            return 1;
        }
        return parentRun.child_execution_order + 1;
    }
    /**
     * Create and add a run to the run map for LLM start events.
     * This must sometimes be done synchronously to avoid race conditions
     * when callbacks are backgrounded, so we expose it as a separate method here.
     */
    _createRunForLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const finalExtraParams = metadata
            ? { ...extraParams, metadata }
            : extraParams;
        const run = {
            id: runId,
            name: name ?? llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { prompts },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || [],
        };
        return this._addRunToRunMap(run);
    }
    async handleLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name) {
        const run = this.runMap.get(runId) ??
            this._createRunForLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name);
        await this.onRunCreate?.(run);
        await this.onLLMStart?.(run);
        return run;
    }
    /**
     * Create and add a run to the run map for chat model start events.
     * This must sometimes be done synchronously to avoid race conditions
     * when callbacks are backgrounded, so we expose it as a separate method here.
     */
    _createRunForChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const finalExtraParams = metadata
            ? { ...extraParams, metadata }
            : extraParams;
        const run = {
            id: runId,
            name: name ?? llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { messages },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || [],
        };
        return this._addRunToRunMap(run);
    }
    async handleChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name) {
        const run = this.runMap.get(runId) ??
            this._createRunForChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name);
        await this.onRunCreate?.(run);
        await this.onLLMStart?.(run);
        return run;
    }
    async handleLLMEnd(output, runId, _parentRunId, _tags, extraParams) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        run.end_time = Date.now();
        run.outputs = output;
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        run.extra = { ...run.extra, ...extraParams };
        await this.onLLMEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleLLMError(error, runId, _parentRunId, _tags, extraParams) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        run.end_time = Date.now();
        run.error = this.stringifyError(error);
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        run.extra = { ...run.extra, ...extraParams };
        await this.onLLMError?.(run);
        await this._endTrace(run);
        return run;
    }
    /**
     * Create and add a run to the run map for chain start events.
     * This must sometimes be done synchronously to avoid race conditions
     * when callbacks are backgrounded, so we expose it as a separate method here.
     */
    _createRunForChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: name ?? chain.id[chain.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: chain,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs,
            execution_order,
            child_execution_order: execution_order,
            run_type: runType ?? "chain",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || [],
        };
        return this._addRunToRunMap(run);
    }
    async handleChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name) {
        const run = this.runMap.get(runId) ??
            this._createRunForChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name);
        await this.onRunCreate?.(run);
        await this.onChainStart?.(run);
        return run;
    }
    async handleChainEnd(outputs, runId, _parentRunId, _tags, kwargs) {
        const run = this.runMap.get(runId);
        if (!run) {
            throw new Error("No chain run to end.");
        }
        run.end_time = Date.now();
        run.outputs = _coerceToDict(outputs, "output");
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        if (kwargs?.inputs !== undefined) {
            run.inputs = _coerceToDict(kwargs.inputs, "input");
        }
        await this.onChainEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleChainError(error, runId, _parentRunId, _tags, kwargs) {
        const run = this.runMap.get(runId);
        if (!run) {
            throw new Error("No chain run to end.");
        }
        run.end_time = Date.now();
        run.error = this.stringifyError(error);
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        if (kwargs?.inputs !== undefined) {
            run.inputs = _coerceToDict(kwargs.inputs, "input");
        }
        await this.onChainError?.(run);
        await this._endTrace(run);
        return run;
    }
    /**
     * Create and add a run to the run map for tool start events.
     * This must sometimes be done synchronously to avoid race conditions
     * when callbacks are backgrounded, so we expose it as a separate method here.
     */
    _createRunForToolStart(tool, input, runId, parentRunId, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: name ?? tool.id[tool.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: tool,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { input },
            execution_order,
            child_execution_order: execution_order,
            run_type: "tool",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || [],
        };
        return this._addRunToRunMap(run);
    }
    async handleToolStart(tool, input, runId, parentRunId, tags, metadata, name) {
        const run = this.runMap.get(runId) ??
            this._createRunForToolStart(tool, input, runId, parentRunId, tags, metadata, name);
        await this.onRunCreate?.(run);
        await this.onToolStart?.(run);
        return run;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handleToolEnd(output, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
        }
        run.end_time = Date.now();
        run.outputs = { output };
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onToolEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleToolError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
        }
        run.end_time = Date.now();
        run.error = this.stringifyError(error);
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onToolError?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleAgentAction(action, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            return;
        }
        const agentRun = run;
        agentRun.actions = agentRun.actions || [];
        agentRun.actions.push(action);
        agentRun.events.push({
            name: "agent_action",
            time: new Date().toISOString(),
            kwargs: { action },
        });
        await this.onAgentAction?.(run);
    }
    async handleAgentEnd(action, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            return;
        }
        run.events.push({
            name: "agent_end",
            time: new Date().toISOString(),
            kwargs: { action },
        });
        await this.onAgentEnd?.(run);
    }
    /**
     * Create and add a run to the run map for retriever start events.
     * This must sometimes be done synchronously to avoid race conditions
     * when callbacks are backgrounded, so we expose it as a separate method here.
     */
    _createRunForRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: name ?? retriever.id[retriever.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: retriever,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { query },
            execution_order,
            child_execution_order: execution_order,
            run_type: "retriever",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || [],
        };
        return this._addRunToRunMap(run);
    }
    async handleRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name) {
        const run = this.runMap.get(runId) ??
            this._createRunForRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name);
        await this.onRunCreate?.(run);
        await this.onRetrieverStart?.(run);
        return run;
    }
    async handleRetrieverEnd(documents, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "retriever") {
            throw new Error("No retriever run to end");
        }
        run.end_time = Date.now();
        run.outputs = { documents };
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onRetrieverEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleRetrieverError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "retriever") {
            throw new Error("No retriever run to end");
        }
        run.end_time = Date.now();
        run.error = this.stringifyError(error);
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onRetrieverError?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleText(text, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            return;
        }
        run.events.push({
            name: "text",
            time: new Date().toISOString(),
            kwargs: { text },
        });
        await this.onText?.(run);
    }
    async handleLLMNewToken(token, idx, runId, _parentRunId, _tags, fields) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error(`Invalid "runId" provided to "handleLLMNewToken" callback.`);
        }
        run.events.push({
            name: "new_token",
            time: new Date().toISOString(),
            kwargs: { token, idx, chunk: fields?.chunk },
        });
        await this.onLLMNewToken?.(run, token, { chunk: fields?.chunk });
        return run;
    }
}


/***/ }),

/***/ 5097:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  YN: () => (/* binding */ Runnable),
  B2: () => (/* binding */ RunnableAssign),
  fJ: () => (/* binding */ RunnableBinding),
  jY: () => (/* binding */ RunnableLambda),
  ck: () => (/* binding */ RunnableMap),
  GH: () => (/* binding */ _coerceToDict),
  Bp: () => (/* binding */ _coerceToRunnable)
});

// UNUSED EXPORTS: RunnableEach, RunnableParallel, RunnablePick, RunnableRetry, RunnableSequence, RunnableToolLike, RunnableTraceable, RunnableWithFallbacks, convertRunnableToTool

// EXTERNAL MODULE: ./node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs
var lib = __webpack_require__(5112);
// EXTERNAL MODULE: ./node_modules/.pnpm/p-retry@4.6.2/node_modules/p-retry/index.js
var p_retry = __webpack_require__(7091);
// EXTERNAL MODULE: ./node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/v4.js + 1 modules
var v4 = __webpack_require__(9883);
// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/singletons/traceable.js + 1 modules
var traceable = __webpack_require__(1515);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/fast-json-patch/index.js + 3 modules
var fast_json_patch = __webpack_require__(1379);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tracers/base.js
var base = __webpack_require__(4423);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/stream.js
var utils_stream = __webpack_require__(8843);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/ai.js
var ai = __webpack_require__(6826);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tracers/log_stream.js




/**
 * List of jsonpatch JSONPatchOperations, which describe how to create the run state
 * from an empty dict. This is the minimal representation of the log, designed to
 * be serialized as JSON and sent over the wire to reconstruct the log on the other
 * side. Reconstruction of the state can be done with any jsonpatch-compliant library,
 * see https://jsonpatch.com for more information.
 */
class RunLogPatch {
    constructor(fields) {
        Object.defineProperty(this, "ops", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ops = fields.ops ?? [];
    }
    concat(other) {
        const ops = this.ops.concat(other.ops);
        const states = (0,fast_json_patch/* applyPatch */.X6)({}, ops);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunLog({
            ops,
            state: states[states.length - 1].newDocument,
        });
    }
}
class RunLog extends RunLogPatch {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.state = fields.state;
    }
    concat(other) {
        const ops = this.ops.concat(other.ops);
        const states = (0,fast_json_patch/* applyPatch */.X6)(this.state, other.ops);
        return new RunLog({ ops, state: states[states.length - 1].newDocument });
    }
    static fromRunLogPatch(patch) {
        const states = (0,fast_json_patch/* applyPatch */.X6)({}, patch.ops);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunLog({
            ops: patch.ops,
            state: states[states.length - 1].newDocument,
        });
    }
}
const isLogStreamHandler = (handler) => handler.name === "log_stream_tracer";
/**
 * Extract standardized inputs from a run.
 *
 * Standardizes the inputs based on the type of the runnable used.
 *
 * @param run - Run object
 * @param schemaFormat - The schema format to use.
 *
 * @returns Valid inputs are only dict. By conventions, inputs always represented
 * invocation using named arguments.
 * A null means that the input is not yet known!
 */
async function _getStandardizedInputs(run, schemaFormat) {
    if (schemaFormat === "original") {
        throw new Error("Do not assign inputs with original schema drop the key for now. " +
            "When inputs are added to streamLog they should be added with " +
            "standardized schema for streaming events.");
    }
    const { inputs } = run;
    if (["retriever", "llm", "prompt"].includes(run.run_type)) {
        return inputs;
    }
    if (Object.keys(inputs).length === 1 && inputs?.input === "") {
        return undefined;
    }
    // new style chains
    // These nest an additional 'input' key inside the 'inputs' to make sure
    // the input is always a dict. We need to unpack and user the inner value.
    // We should try to fix this in Runnables and callbacks/tracers
    // Runnables should be using a null type here not a placeholder
    // dict.
    return inputs.input;
}
async function _getStandardizedOutputs(run, schemaFormat) {
    const { outputs } = run;
    if (schemaFormat === "original") {
        // Return the old schema, without standardizing anything
        return outputs;
    }
    if (["retriever", "llm", "prompt"].includes(run.run_type)) {
        return outputs;
    }
    // TODO: Remove this hacky check
    if (outputs !== undefined &&
        Object.keys(outputs).length === 1 &&
        outputs?.output !== undefined) {
        return outputs.output;
    }
    return outputs;
}
function isChatGenerationChunk(x) {
    return x !== undefined && x.message !== undefined;
}
/**
 * Class that extends the `BaseTracer` class from the
 * `langchain.callbacks.tracers.base` module. It represents a callback
 * handler that logs the execution of runs and emits `RunLog` instances to a
 * `RunLogStream`.
 */
class LogStreamCallbackHandler extends base/* BaseTracer */.J {
    constructor(fields) {
        super({ _awaitHandler: true, ...fields });
        Object.defineProperty(this, "autoClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "includeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_schemaFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "original"
        });
        Object.defineProperty(this, "rootId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "keyMapByRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "counterMapByRunName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "transformStream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "receiveStream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "log_stream_tracer"
        });
        Object.defineProperty(this, "lc_prefer_streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        this.autoClose = fields?.autoClose ?? true;
        this.includeNames = fields?.includeNames;
        this.includeTypes = fields?.includeTypes;
        this.includeTags = fields?.includeTags;
        this.excludeNames = fields?.excludeNames;
        this.excludeTypes = fields?.excludeTypes;
        this.excludeTags = fields?.excludeTags;
        this._schemaFormat = fields?._schemaFormat ?? this._schemaFormat;
        this.transformStream = new TransformStream();
        this.writer = this.transformStream.writable.getWriter();
        this.receiveStream = utils_stream/* IterableReadableStream */.bO.fromReadableStream(this.transformStream.readable);
    }
    [Symbol.asyncIterator]() {
        return this.receiveStream;
    }
    async persistRun(_run) {
        // This is a legacy method only called once for an entire run tree
        // and is therefore not useful here
    }
    _includeRun(run) {
        if (run.id === this.rootId) {
            return false;
        }
        const runTags = run.tags ?? [];
        let include = this.includeNames === undefined &&
            this.includeTags === undefined &&
            this.includeTypes === undefined;
        if (this.includeNames !== undefined) {
            include = include || this.includeNames.includes(run.name);
        }
        if (this.includeTypes !== undefined) {
            include = include || this.includeTypes.includes(run.run_type);
        }
        if (this.includeTags !== undefined) {
            include =
                include ||
                    runTags.find((tag) => this.includeTags?.includes(tag)) !== undefined;
        }
        if (this.excludeNames !== undefined) {
            include = include && !this.excludeNames.includes(run.name);
        }
        if (this.excludeTypes !== undefined) {
            include = include && !this.excludeTypes.includes(run.run_type);
        }
        if (this.excludeTags !== undefined) {
            include =
                include && runTags.every((tag) => !this.excludeTags?.includes(tag));
        }
        return include;
    }
    async *tapOutputIterable(runId, output) {
        // Tap an output async iterator to stream its values to the log.
        for await (const chunk of output) {
            // root run is handled in .streamLog()
            if (runId !== this.rootId) {
                // if we can't find the run silently ignore
                // eg. because this run wasn't included in the log
                const key = this.keyMapByRunId[runId];
                if (key) {
                    await this.writer.write(new RunLogPatch({
                        ops: [
                            {
                                op: "add",
                                path: `/logs/${key}/streamed_output/-`,
                                value: chunk,
                            },
                        ],
                    }));
                }
            }
            yield chunk;
        }
    }
    async onRunCreate(run) {
        if (this.rootId === undefined) {
            this.rootId = run.id;
            await this.writer.write(new RunLogPatch({
                ops: [
                    {
                        op: "replace",
                        path: "",
                        value: {
                            id: run.id,
                            name: run.name,
                            type: run.run_type,
                            streamed_output: [],
                            final_output: undefined,
                            logs: {},
                        },
                    },
                ],
            }));
        }
        if (!this._includeRun(run)) {
            return;
        }
        if (this.counterMapByRunName[run.name] === undefined) {
            this.counterMapByRunName[run.name] = 0;
        }
        this.counterMapByRunName[run.name] += 1;
        const count = this.counterMapByRunName[run.name];
        this.keyMapByRunId[run.id] =
            count === 1 ? run.name : `${run.name}:${count}`;
        const logEntry = {
            id: run.id,
            name: run.name,
            type: run.run_type,
            tags: run.tags ?? [],
            metadata: run.extra?.metadata ?? {},
            start_time: new Date(run.start_time).toISOString(),
            streamed_output: [],
            streamed_output_str: [],
            final_output: undefined,
            end_time: undefined,
        };
        if (this._schemaFormat === "streaming_events") {
            logEntry.inputs = await _getStandardizedInputs(run, this._schemaFormat);
        }
        await this.writer.write(new RunLogPatch({
            ops: [
                {
                    op: "add",
                    path: `/logs/${this.keyMapByRunId[run.id]}`,
                    value: logEntry,
                },
            ],
        }));
    }
    async onRunUpdate(run) {
        try {
            const runName = this.keyMapByRunId[run.id];
            if (runName === undefined) {
                return;
            }
            const ops = [];
            if (this._schemaFormat === "streaming_events") {
                ops.push({
                    op: "replace",
                    path: `/logs/${runName}/inputs`,
                    value: await _getStandardizedInputs(run, this._schemaFormat),
                });
            }
            ops.push({
                op: "add",
                path: `/logs/${runName}/final_output`,
                value: await _getStandardizedOutputs(run, this._schemaFormat),
            });
            if (run.end_time !== undefined) {
                ops.push({
                    op: "add",
                    path: `/logs/${runName}/end_time`,
                    value: new Date(run.end_time).toISOString(),
                });
            }
            const patch = new RunLogPatch({ ops });
            await this.writer.write(patch);
        }
        finally {
            if (run.id === this.rootId) {
                const patch = new RunLogPatch({
                    ops: [
                        {
                            op: "replace",
                            path: "/final_output",
                            value: await _getStandardizedOutputs(run, this._schemaFormat),
                        },
                    ],
                });
                await this.writer.write(patch);
                if (this.autoClose) {
                    await this.writer.close();
                }
            }
        }
    }
    async onLLMNewToken(run, token, kwargs) {
        const runName = this.keyMapByRunId[run.id];
        if (runName === undefined) {
            return;
        }
        // TODO: Remove hack
        const isChatModel = run.inputs.messages !== undefined;
        let streamedOutputValue;
        if (isChatModel) {
            if (isChatGenerationChunk(kwargs?.chunk)) {
                streamedOutputValue = kwargs?.chunk;
            }
            else {
                streamedOutputValue = new ai/* AIMessageChunk */.H({
                    id: `run-${run.id}`,
                    content: token,
                });
            }
        }
        else {
            streamedOutputValue = token;
        }
        const patch = new RunLogPatch({
            ops: [
                {
                    op: "add",
                    path: `/logs/${runName}/streamed_output_str/-`,
                    value: token,
                },
                {
                    op: "add",
                    path: `/logs/${runName}/streamed_output/-`,
                    value: streamedOutputValue,
                },
            ],
        });
        await this.writer.write(patch);
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/outputs.js
var outputs = __webpack_require__(1067);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tracers/event_stream.js




function assignName({ name, serialized, }) {
    if (name !== undefined) {
        return name;
    }
    if (serialized?.name !== undefined) {
        return serialized.name;
    }
    else if (serialized?.id !== undefined && Array.isArray(serialized?.id)) {
        return serialized.id[serialized.id.length - 1];
    }
    return "Unnamed";
}
const isStreamEventsHandler = (handler) => handler.name === "event_stream_tracer";
/**
 * Class that extends the `BaseTracer` class from the
 * `langchain.callbacks.tracers.base` module. It represents a callback
 * handler that logs the execution of runs and emits `RunLog` instances to a
 * `RunLogStream`.
 */
class EventStreamCallbackHandler extends base/* BaseTracer */.J {
    constructor(fields) {
        super({ _awaitHandler: true, ...fields });
        Object.defineProperty(this, "autoClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "includeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "runInfoMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "tappedPromises", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "transformStream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "receiveStream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "event_stream_tracer"
        });
        Object.defineProperty(this, "lc_prefer_streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        this.autoClose = fields?.autoClose ?? true;
        this.includeNames = fields?.includeNames;
        this.includeTypes = fields?.includeTypes;
        this.includeTags = fields?.includeTags;
        this.excludeNames = fields?.excludeNames;
        this.excludeTypes = fields?.excludeTypes;
        this.excludeTags = fields?.excludeTags;
        this.transformStream = new TransformStream();
        this.writer = this.transformStream.writable.getWriter();
        this.receiveStream = utils_stream/* IterableReadableStream */.bO.fromReadableStream(this.transformStream.readable);
    }
    [Symbol.asyncIterator]() {
        return this.receiveStream;
    }
    async persistRun(_run) {
        // This is a legacy method only called once for an entire run tree
        // and is therefore not useful here
    }
    _includeRun(run) {
        const runTags = run.tags ?? [];
        let include = this.includeNames === undefined &&
            this.includeTags === undefined &&
            this.includeTypes === undefined;
        if (this.includeNames !== undefined) {
            include = include || this.includeNames.includes(run.name);
        }
        if (this.includeTypes !== undefined) {
            include = include || this.includeTypes.includes(run.runType);
        }
        if (this.includeTags !== undefined) {
            include =
                include ||
                    runTags.find((tag) => this.includeTags?.includes(tag)) !== undefined;
        }
        if (this.excludeNames !== undefined) {
            include = include && !this.excludeNames.includes(run.name);
        }
        if (this.excludeTypes !== undefined) {
            include = include && !this.excludeTypes.includes(run.runType);
        }
        if (this.excludeTags !== undefined) {
            include =
                include && runTags.every((tag) => !this.excludeTags?.includes(tag));
        }
        return include;
    }
    async *tapOutputIterable(runId, outputStream) {
        const firstChunk = await outputStream.next();
        if (firstChunk.done) {
            return;
        }
        const runInfo = this.runInfoMap.get(runId);
        // Run has finished, don't issue any stream events.
        // An example of this is for runnables that use the default
        // implementation of .stream(), which delegates to .invoke()
        // and calls .onChainEnd() before passing it to the iterator.
        if (runInfo === undefined) {
            yield firstChunk.value;
            return;
        }
        // Match format from handlers below
        function _formatOutputChunk(eventType, data) {
            if (eventType === "llm" && typeof data === "string") {
                return new outputs/* GenerationChunk */.mu({ text: data });
            }
            return data;
        }
        let tappedPromise = this.tappedPromises.get(runId);
        // if we are the first to tap, issue stream events
        if (tappedPromise === undefined) {
            let tappedPromiseResolver;
            tappedPromise = new Promise((resolve) => {
                tappedPromiseResolver = resolve;
            });
            this.tappedPromises.set(runId, tappedPromise);
            try {
                const event = {
                    event: `on_${runInfo.runType}_stream`,
                    run_id: runId,
                    name: runInfo.name,
                    tags: runInfo.tags,
                    metadata: runInfo.metadata,
                    data: {},
                };
                await this.send({
                    ...event,
                    data: {
                        chunk: _formatOutputChunk(runInfo.runType, firstChunk.value),
                    },
                }, runInfo);
                yield firstChunk.value;
                for await (const chunk of outputStream) {
                    // Don't yield tool and retriever stream events
                    if (runInfo.runType !== "tool" && runInfo.runType !== "retriever") {
                        await this.send({
                            ...event,
                            data: {
                                chunk: _formatOutputChunk(runInfo.runType, chunk),
                            },
                        }, runInfo);
                    }
                    yield chunk;
                }
            }
            finally {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                tappedPromiseResolver();
                // Don't delete from the promises map to keep track of which runs have been tapped.
            }
        }
        else {
            // otherwise just pass through
            yield firstChunk.value;
            for await (const chunk of outputStream) {
                yield chunk;
            }
        }
    }
    async send(payload, run) {
        if (this._includeRun(run)) {
            await this.writer.write(payload);
        }
    }
    async sendEndEvent(payload, run) {
        const tappedPromise = this.tappedPromises.get(payload.run_id);
        if (tappedPromise !== undefined) {
            void tappedPromise.then(() => {
                void this.send(payload, run);
            });
        }
        else {
            await this.send(payload, run);
        }
    }
    async onLLMStart(run) {
        const runName = assignName(run);
        const runType = run.inputs.messages !== undefined ? "chat_model" : "llm";
        const runInfo = {
            tags: run.tags ?? [],
            metadata: run.extra?.metadata ?? {},
            name: runName,
            runType,
            inputs: run.inputs,
        };
        this.runInfoMap.set(run.id, runInfo);
        const eventName = `on_${runType}_start`;
        await this.send({
            event: eventName,
            data: {
                input: run.inputs,
            },
            name: runName,
            tags: run.tags ?? [],
            run_id: run.id,
            metadata: run.extra?.metadata ?? {},
        }, runInfo);
    }
    async onLLMNewToken(run, token, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kwargs) {
        const runInfo = this.runInfoMap.get(run.id);
        let chunk;
        let eventName;
        if (runInfo === undefined) {
            throw new Error(`onLLMNewToken: Run ID ${run.id} not found in run map.`);
        }
        // Top-level streaming events are covered by tapOutputIterable
        if (this.runInfoMap.size === 1) {
            return;
        }
        if (runInfo.runType === "chat_model") {
            eventName = "on_chat_model_stream";
            if (kwargs?.chunk === undefined) {
                chunk = new ai/* AIMessageChunk */.H({ content: token, id: `run-${run.id}` });
            }
            else {
                chunk = kwargs.chunk.message;
            }
        }
        else if (runInfo.runType === "llm") {
            eventName = "on_llm_stream";
            if (kwargs?.chunk === undefined) {
                chunk = new outputs/* GenerationChunk */.mu({ text: token });
            }
            else {
                chunk = kwargs.chunk;
            }
        }
        else {
            throw new Error(`Unexpected run type ${runInfo.runType}`);
        }
        await this.send({
            event: eventName,
            data: {
                chunk,
            },
            run_id: run.id,
            name: runInfo.name,
            tags: runInfo.tags,
            metadata: runInfo.metadata,
        }, runInfo);
    }
    async onLLMEnd(run) {
        const runInfo = this.runInfoMap.get(run.id);
        this.runInfoMap.delete(run.id);
        let eventName;
        if (runInfo === undefined) {
            throw new Error(`onLLMEnd: Run ID ${run.id} not found in run map.`);
        }
        const generations = run.outputs?.generations;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let output;
        if (runInfo.runType === "chat_model") {
            for (const generation of generations ?? []) {
                if (output !== undefined) {
                    break;
                }
                output = generation[0]?.message;
            }
            eventName = "on_chat_model_end";
        }
        else if (runInfo.runType === "llm") {
            output = {
                generations: generations?.map((generation) => {
                    return generation.map((chunk) => {
                        return {
                            text: chunk.text,
                            generationInfo: chunk.generationInfo,
                        };
                    });
                }),
                llmOutput: run.outputs?.llmOutput ?? {},
            };
            eventName = "on_llm_end";
        }
        else {
            throw new Error(`onLLMEnd: Unexpected run type: ${runInfo.runType}`);
        }
        await this.sendEndEvent({
            event: eventName,
            data: {
                output,
                input: runInfo.inputs,
            },
            run_id: run.id,
            name: runInfo.name,
            tags: runInfo.tags,
            metadata: runInfo.metadata,
        }, runInfo);
    }
    async onChainStart(run) {
        const runName = assignName(run);
        const runType = run.run_type ?? "chain";
        const runInfo = {
            tags: run.tags ?? [],
            metadata: run.extra?.metadata ?? {},
            name: runName,
            runType: run.run_type,
        };
        let eventData = {};
        // Workaround Runnable core code not sending input when transform streaming.
        if (run.inputs.input === "" && Object.keys(run.inputs).length === 1) {
            eventData = {};
            runInfo.inputs = {};
        }
        else if (run.inputs.input !== undefined) {
            eventData.input = run.inputs.input;
            runInfo.inputs = run.inputs.input;
        }
        else {
            eventData.input = run.inputs;
            runInfo.inputs = run.inputs;
        }
        this.runInfoMap.set(run.id, runInfo);
        await this.send({
            event: `on_${runType}_start`,
            data: eventData,
            name: runName,
            tags: run.tags ?? [],
            run_id: run.id,
            metadata: run.extra?.metadata ?? {},
        }, runInfo);
    }
    async onChainEnd(run) {
        const runInfo = this.runInfoMap.get(run.id);
        this.runInfoMap.delete(run.id);
        if (runInfo === undefined) {
            throw new Error(`onChainEnd: Run ID ${run.id} not found in run map.`);
        }
        const eventName = `on_${run.run_type}_end`;
        const inputs = run.inputs ?? runInfo.inputs ?? {};
        const outputs = run.outputs?.output ?? run.outputs;
        const data = {
            output: outputs,
            input: inputs,
        };
        if (inputs.input && Object.keys(inputs).length === 1) {
            data.input = inputs.input;
            runInfo.inputs = inputs.input;
        }
        await this.sendEndEvent({
            event: eventName,
            data,
            run_id: run.id,
            name: runInfo.name,
            tags: runInfo.tags,
            metadata: runInfo.metadata ?? {},
        }, runInfo);
    }
    async onToolStart(run) {
        const runName = assignName(run);
        const runInfo = {
            tags: run.tags ?? [],
            metadata: run.extra?.metadata ?? {},
            name: runName,
            runType: "tool",
            inputs: run.inputs ?? {},
        };
        this.runInfoMap.set(run.id, runInfo);
        await this.send({
            event: "on_tool_start",
            data: {
                input: run.inputs ?? {},
            },
            name: runName,
            run_id: run.id,
            tags: run.tags ?? [],
            metadata: run.extra?.metadata ?? {},
        }, runInfo);
    }
    async onToolEnd(run) {
        const runInfo = this.runInfoMap.get(run.id);
        this.runInfoMap.delete(run.id);
        if (runInfo === undefined) {
            throw new Error(`onToolEnd: Run ID ${run.id} not found in run map.`);
        }
        if (runInfo.inputs === undefined) {
            throw new Error(`onToolEnd: Run ID ${run.id} is a tool call, and is expected to have traced inputs.`);
        }
        const output = run.outputs?.output === undefined ? run.outputs : run.outputs.output;
        await this.sendEndEvent({
            event: "on_tool_end",
            data: {
                output,
                input: runInfo.inputs,
            },
            run_id: run.id,
            name: runInfo.name,
            tags: runInfo.tags,
            metadata: runInfo.metadata,
        }, runInfo);
    }
    async onRetrieverStart(run) {
        const runName = assignName(run);
        const runType = "retriever";
        const runInfo = {
            tags: run.tags ?? [],
            metadata: run.extra?.metadata ?? {},
            name: runName,
            runType,
            inputs: {
                query: run.inputs.query,
            },
        };
        this.runInfoMap.set(run.id, runInfo);
        await this.send({
            event: "on_retriever_start",
            data: {
                input: {
                    query: run.inputs.query,
                },
            },
            name: runName,
            tags: run.tags ?? [],
            run_id: run.id,
            metadata: run.extra?.metadata ?? {},
        }, runInfo);
    }
    async onRetrieverEnd(run) {
        const runInfo = this.runInfoMap.get(run.id);
        this.runInfoMap.delete(run.id);
        if (runInfo === undefined) {
            throw new Error(`onRetrieverEnd: Run ID ${run.id} not found in run map.`);
        }
        await this.sendEndEvent({
            event: "on_retriever_end",
            data: {
                output: run.outputs?.documents ?? run.outputs,
                input: runInfo.inputs,
            },
            run_id: run.id,
            name: runInfo.name,
            tags: runInfo.tags,
            metadata: runInfo.metadata,
        }, runInfo);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handleCustomEvent(eventName, data, runId) {
        const runInfo = this.runInfoMap.get(runId);
        if (runInfo === undefined) {
            throw new Error(`handleCustomEvent: Run ID ${runId} not found in run map.`);
        }
        await this.send({
            event: "on_custom_event",
            run_id: runId,
            name: eventName,
            tags: runInfo.tags,
            metadata: runInfo.metadata,
            data,
        }, runInfo);
    }
    async finish() {
        const pendingPromises = [...this.tappedPromises.values()];
        void Promise.all(pendingPromises).finally(() => {
            void this.writer.close();
        });
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/load/serializable.js + 1 modules
var serializable = __webpack_require__(5374);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/signal.js
var signal = __webpack_require__(8887);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/config.js
var runnables_config = __webpack_require__(7512);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/utils/async_caller.js
var async_caller = __webpack_require__(3453);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tracers/root_listener.js

class RootListenersTracer extends base/* BaseTracer */.J {
    constructor({ config, onStart, onEnd, onError, }) {
        super({ _awaitHandler: true });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "RootListenersTracer"
        });
        /** The Run's ID. Type UUID */
        Object.defineProperty(this, "rootId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "argOnStart", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "argOnEnd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "argOnError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = config;
        this.argOnStart = onStart;
        this.argOnEnd = onEnd;
        this.argOnError = onError;
    }
    /**
     * This is a legacy method only called once for an entire run tree
     * therefore not useful here
     * @param {Run} _ Not used
     */
    persistRun(_) {
        return Promise.resolve();
    }
    async onRunCreate(run) {
        if (this.rootId) {
            return;
        }
        this.rootId = run.id;
        if (this.argOnStart) {
            await this.argOnStart(run, this.config);
        }
    }
    async onRunUpdate(run) {
        if (run.id !== this.rootId) {
            return;
        }
        if (!run.error) {
            if (this.argOnEnd) {
                await this.argOnEnd(run, this.config);
            }
        }
        else if (this.argOnError) {
            await this.argOnError(run, this.config);
        }
    }
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/utils.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRunnableInterface(thing) {
    return thing ? thing.lc_runnable : false;
}
/**
 * Utility to filter the root event in the streamEvents implementation.
 * This is simply binding the arguments to the namespace to make save on
 * a bit of typing in the streamEvents implementation.
 *
 * TODO: Refactor and remove.
 */
class _RootEventFilter {
    constructor(fields) {
        Object.defineProperty(this, "includeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.includeNames = fields.includeNames;
        this.includeTypes = fields.includeTypes;
        this.includeTags = fields.includeTags;
        this.excludeNames = fields.excludeNames;
        this.excludeTypes = fields.excludeTypes;
        this.excludeTags = fields.excludeTags;
    }
    includeEvent(event, rootType) {
        let include = this.includeNames === undefined &&
            this.includeTypes === undefined &&
            this.includeTags === undefined;
        const eventTags = event.tags ?? [];
        if (this.includeNames !== undefined) {
            include = include || this.includeNames.includes(event.name);
        }
        if (this.includeTypes !== undefined) {
            include = include || this.includeTypes.includes(rootType);
        }
        if (this.includeTags !== undefined) {
            include =
                include || eventTags.some((tag) => this.includeTags?.includes(tag));
        }
        if (this.excludeNames !== undefined) {
            include = include && !this.excludeNames.includes(event.name);
        }
        if (this.excludeTypes !== undefined) {
            include = include && !this.excludeTypes.includes(rootType);
        }
        if (this.excludeTags !== undefined) {
            include =
                include && eventTags.every((tag) => !this.excludeTags?.includes(tag));
        }
        return include;
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/index.js + 1 modules
var singletons = __webpack_require__(8549);
// EXTERNAL MODULE: ./node_modules/.pnpm/zod-to-json-schema@3.24.4_zod@3.24.2/node_modules/zod-to-json-schema/dist/esm/index.js + 36 modules
var esm = __webpack_require__(3858);
// EXTERNAL MODULE: ./node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/validate.js + 1 modules
var validate = __webpack_require__(6797);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/graph_mermaid.js
function _escapeNodeLabel(nodeLabel) {
    // Escapes the node label for Mermaid syntax.
    return nodeLabel.replace(/[^a-zA-Z-_0-9]/g, "_");
}
const MARKDOWN_SPECIAL_CHARS = ["*", "_", "`"];
function _generateMermaidGraphStyles(nodeColors) {
    let styles = "";
    for (const [className, color] of Object.entries(nodeColors)) {
        styles += `\tclassDef ${className} ${color};\n`;
    }
    return styles;
}
/**
 * Draws a Mermaid graph using the provided graph data
 */
function drawMermaid(nodes, edges, config) {
    const { firstNode, lastNode, nodeColors, withStyles = true, curveStyle = "linear", wrapLabelNWords = 9, } = config ?? {};
    // Initialize Mermaid graph configuration
    let mermaidGraph = withStyles
        ? `%%{init: {'flowchart': {'curve': '${curveStyle}'}}}%%\ngraph TD;\n`
        : "graph TD;\n";
    if (withStyles) {
        // Node formatting templates
        const defaultClassLabel = "default";
        const formatDict = {
            [defaultClassLabel]: "{0}({1})",
        };
        if (firstNode !== undefined) {
            formatDict[firstNode] = "{0}([{1}]):::first";
        }
        if (lastNode !== undefined) {
            formatDict[lastNode] = "{0}([{1}]):::last";
        }
        // Add nodes to the graph
        for (const [key, node] of Object.entries(nodes)) {
            const nodeName = node.name.split(":").pop() ?? "";
            const label = MARKDOWN_SPECIAL_CHARS.some((char) => nodeName.startsWith(char) && nodeName.endsWith(char))
                ? `<p>${nodeName}</p>`
                : nodeName;
            let finalLabel = label;
            if (Object.keys(node.metadata ?? {}).length) {
                finalLabel += `<hr/><small><em>${Object.entries(node.metadata ?? {})
                    .map(([k, v]) => `${k} = ${v}`)
                    .join("\n")}</em></small>`;
            }
            const nodeLabel = (formatDict[key] ?? formatDict[defaultClassLabel])
                .replace("{0}", _escapeNodeLabel(key))
                .replace("{1}", finalLabel);
            mermaidGraph += `\t${nodeLabel}\n`;
        }
    }
    // Group edges by their common prefixes
    const edgeGroups = {};
    for (const edge of edges) {
        const srcParts = edge.source.split(":");
        const tgtParts = edge.target.split(":");
        const commonPrefix = srcParts
            .filter((src, i) => src === tgtParts[i])
            .join(":");
        if (!edgeGroups[commonPrefix]) {
            edgeGroups[commonPrefix] = [];
        }
        edgeGroups[commonPrefix].push(edge);
    }
    const seenSubgraphs = new Set();
    function addSubgraph(edges, prefix) {
        const selfLoop = edges.length === 1 && edges[0].source === edges[0].target;
        if (prefix && !selfLoop) {
            const subgraph = prefix.split(":").pop();
            if (seenSubgraphs.has(subgraph)) {
                throw new Error(`Found duplicate subgraph '${subgraph}' -- this likely means that ` +
                    "you're reusing a subgraph node with the same name. " +
                    "Please adjust your graph to have subgraph nodes with unique names.");
            }
            seenSubgraphs.add(subgraph);
            mermaidGraph += `\tsubgraph ${subgraph}\n`;
        }
        for (const edge of edges) {
            const { source, target, data, conditional } = edge;
            let edgeLabel = "";
            if (data !== undefined) {
                let edgeData = data;
                const words = edgeData.split(" ");
                if (words.length > wrapLabelNWords) {
                    edgeData = Array.from({ length: Math.ceil(words.length / wrapLabelNWords) }, (_, i) => words
                        .slice(i * wrapLabelNWords, (i + 1) * wrapLabelNWords)
                        .join(" ")).join("&nbsp;<br>&nbsp;");
                }
                edgeLabel = conditional
                    ? ` -. &nbsp;${edgeData}&nbsp; .-> `
                    : ` -- &nbsp;${edgeData}&nbsp; --> `;
            }
            else {
                edgeLabel = conditional ? " -.-> " : " --> ";
            }
            mermaidGraph += `\t${_escapeNodeLabel(source)}${edgeLabel}${_escapeNodeLabel(target)};\n`;
        }
        // Recursively add nested subgraphs
        for (const nestedPrefix in edgeGroups) {
            if (nestedPrefix.startsWith(`${prefix}:`) && nestedPrefix !== prefix) {
                addSubgraph(edgeGroups[nestedPrefix], nestedPrefix);
            }
        }
        if (prefix && !selfLoop) {
            mermaidGraph += "\tend\n";
        }
    }
    // Start with the top-level edges (no common prefix)
    addSubgraph(edgeGroups[""] ?? [], "");
    // Add remaining subgraphs
    for (const prefix in edgeGroups) {
        if (!prefix.includes(":") && prefix !== "") {
            addSubgraph(edgeGroups[prefix], prefix);
        }
    }
    // Add custom styles for nodes
    if (withStyles) {
        mermaidGraph += _generateMermaidGraphStyles(nodeColors ?? {});
    }
    return mermaidGraph;
}
/**
 * Renders Mermaid graph using the Mermaid.INK API.
 */
async function drawMermaidPng(mermaidSyntax, config) {
    let { backgroundColor = "white" } = config ?? {};
    // Use btoa for compatibility, assume ASCII
    const mermaidSyntaxEncoded = btoa(mermaidSyntax);
    // Check if the background color is a hexadecimal color code using regex
    if (backgroundColor !== undefined) {
        const hexColorPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
        if (!hexColorPattern.test(backgroundColor)) {
            backgroundColor = `!${backgroundColor}`;
        }
    }
    const imageUrl = `https://mermaid.ink/img/${mermaidSyntaxEncoded}?bgColor=${backgroundColor}`;
    const res = await fetch(imageUrl);
    if (!res.ok) {
        throw new Error([
            `Failed to render the graph using the Mermaid.INK API.`,
            `Status code: ${res.status}`,
            `Status text: ${res.statusText}`,
        ].join("\n"));
    }
    const content = await res.blob();
    return content;
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/graph.js




function nodeDataStr(id, data) {
    if (id !== undefined && !(0,validate/* default */.A)(id)) {
        return id;
    }
    else if (isRunnableInterface(data)) {
        try {
            let dataStr = data.getName();
            dataStr = dataStr.startsWith("Runnable")
                ? dataStr.slice("Runnable".length)
                : dataStr;
            return dataStr;
        }
        catch (error) {
            return data.getName();
        }
    }
    else {
        return data.name ?? "UnknownSchema";
    }
}
function nodeDataJson(node) {
    // if node.data implements Runnable
    if (isRunnableInterface(node.data)) {
        return {
            type: "runnable",
            data: {
                id: node.data.lc_id,
                name: node.data.getName(),
            },
        };
    }
    else {
        return {
            type: "schema",
            data: { ...(0,esm/* zodToJsonSchema */.Ik)(node.data.schema), title: node.data.name },
        };
    }
}
class Graph {
    constructor(params) {
        Object.defineProperty(this, "nodes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "edges", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.nodes = params?.nodes ?? this.nodes;
        this.edges = params?.edges ?? this.edges;
    }
    // Convert the graph to a JSON-serializable format.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toJSON() {
        const stableNodeIds = {};
        Object.values(this.nodes).forEach((node, i) => {
            stableNodeIds[node.id] = (0,validate/* default */.A)(node.id) ? i : node.id;
        });
        return {
            nodes: Object.values(this.nodes).map((node) => ({
                id: stableNodeIds[node.id],
                ...nodeDataJson(node),
            })),
            edges: this.edges.map((edge) => {
                const item = {
                    source: stableNodeIds[edge.source],
                    target: stableNodeIds[edge.target],
                };
                if (typeof edge.data !== "undefined") {
                    item.data = edge.data;
                }
                if (typeof edge.conditional !== "undefined") {
                    item.conditional = edge.conditional;
                }
                return item;
            }),
        };
    }
    addNode(data, id, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata) {
        if (id !== undefined && this.nodes[id] !== undefined) {
            throw new Error(`Node with id ${id} already exists`);
        }
        const nodeId = id ?? (0,v4/* default */.A)();
        const node = {
            id: nodeId,
            data,
            name: nodeDataStr(id, data),
            metadata,
        };
        this.nodes[nodeId] = node;
        return node;
    }
    removeNode(node) {
        // Remove the node from the nodes map
        delete this.nodes[node.id];
        // Filter out edges connected to the node
        this.edges = this.edges.filter((edge) => edge.source !== node.id && edge.target !== node.id);
    }
    addEdge(source, target, data, conditional) {
        if (this.nodes[source.id] === undefined) {
            throw new Error(`Source node ${source.id} not in graph`);
        }
        if (this.nodes[target.id] === undefined) {
            throw new Error(`Target node ${target.id} not in graph`);
        }
        const edge = {
            source: source.id,
            target: target.id,
            data,
            conditional,
        };
        this.edges.push(edge);
        return edge;
    }
    firstNode() {
        return _firstNode(this);
    }
    lastNode() {
        return _lastNode(this);
    }
    /**
     * Add all nodes and edges from another graph.
     * Note this doesn't check for duplicates, nor does it connect the graphs.
     */
    extend(graph, prefix = "") {
        let finalPrefix = prefix;
        const nodeIds = Object.values(graph.nodes).map((node) => node.id);
        if (nodeIds.every(validate/* default */.A)) {
            finalPrefix = "";
        }
        const prefixed = (id) => {
            return finalPrefix ? `${finalPrefix}:${id}` : id;
        };
        Object.entries(graph.nodes).forEach(([key, value]) => {
            this.nodes[prefixed(key)] = { ...value, id: prefixed(key) };
        });
        const newEdges = graph.edges.map((edge) => {
            return {
                ...edge,
                source: prefixed(edge.source),
                target: prefixed(edge.target),
            };
        });
        // Add all edges from the other graph
        this.edges = [...this.edges, ...newEdges];
        const first = graph.firstNode();
        const last = graph.lastNode();
        return [
            first ? { id: prefixed(first.id), data: first.data } : undefined,
            last ? { id: prefixed(last.id), data: last.data } : undefined,
        ];
    }
    trimFirstNode() {
        const firstNode = this.firstNode();
        if (firstNode && _firstNode(this, [firstNode.id])) {
            this.removeNode(firstNode);
        }
    }
    trimLastNode() {
        const lastNode = this.lastNode();
        if (lastNode && _lastNode(this, [lastNode.id])) {
            this.removeNode(lastNode);
        }
    }
    /**
     * Return a new graph with all nodes re-identified,
     * using their unique, readable names where possible.
     */
    reid() {
        const nodeLabels = Object.fromEntries(Object.values(this.nodes).map((node) => [node.id, node.name]));
        const nodeLabelCounts = new Map();
        Object.values(nodeLabels).forEach((label) => {
            nodeLabelCounts.set(label, (nodeLabelCounts.get(label) || 0) + 1);
        });
        const getNodeId = (nodeId) => {
            const label = nodeLabels[nodeId];
            if ((0,validate/* default */.A)(nodeId) && nodeLabelCounts.get(label) === 1) {
                return label;
            }
            else {
                return nodeId;
            }
        };
        return new Graph({
            nodes: Object.fromEntries(Object.entries(this.nodes).map(([id, node]) => [
                getNodeId(id),
                { ...node, id: getNodeId(id) },
            ])),
            edges: this.edges.map((edge) => ({
                ...edge,
                source: getNodeId(edge.source),
                target: getNodeId(edge.target),
            })),
        });
    }
    drawMermaid(params) {
        const { withStyles, curveStyle, nodeColors = {
            default: "fill:#f2f0ff,line-height:1.2",
            first: "fill-opacity:0",
            last: "fill:#bfb6fc",
        }, wrapLabelNWords, } = params ?? {};
        const graph = this.reid();
        const firstNode = graph.firstNode();
        const lastNode = graph.lastNode();
        return drawMermaid(graph.nodes, graph.edges, {
            firstNode: firstNode?.id,
            lastNode: lastNode?.id,
            withStyles,
            curveStyle,
            nodeColors,
            wrapLabelNWords,
        });
    }
    async drawMermaidPng(params) {
        const mermaidSyntax = this.drawMermaid(params);
        return drawMermaidPng(mermaidSyntax, {
            backgroundColor: params?.backgroundColor,
        });
    }
}
/**
 * Find the single node that is not a target of any edge.
 * Exclude nodes/sources with ids in the exclude list.
 * If there is no such node, or there are multiple, return undefined.
 * When drawing the graph, this node would be the origin.
 */
function _firstNode(graph, exclude = []) {
    const targets = new Set(graph.edges
        .filter((edge) => !exclude.includes(edge.source))
        .map((edge) => edge.target));
    const found = [];
    for (const node of Object.values(graph.nodes)) {
        if (!exclude.includes(node.id) && !targets.has(node.id)) {
            found.push(node);
        }
    }
    return found.length === 1 ? found[0] : undefined;
}
/**
 * Find the single node that is not a source of any edge.
 * Exclude nodes/targets with ids in the exclude list.
 * If there is no such node, or there are multiple, return undefined.
 * When drawing the graph, this node would be the destination.
 */
function _lastNode(graph, exclude = []) {
    const sources = new Set(graph.edges
        .filter((edge) => !exclude.includes(edge.target))
        .map((edge) => edge.source));
    const found = [];
    for (const node of Object.values(graph.nodes)) {
        if (!exclude.includes(node.id) && !sources.has(node.id)) {
            found.push(node);
        }
    }
    return found.length === 1 ? found[0] : undefined;
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/wrappers.js

function convertToHttpEventStream(stream) {
    const encoder = new TextEncoder();
    const finalStream = new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {
                controller.enqueue(encoder.encode(`event: data\ndata: ${JSON.stringify(chunk)}\n\n`));
            }
            controller.enqueue(encoder.encode("event: end\n\n"));
            controller.close();
        },
    });
    return utils_stream/* IterableReadableStream */.bO.fromReadableStream(finalStream);
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/iter.js


function isIterableIterator(thing) {
    return (typeof thing === "object" &&
        thing !== null &&
        typeof thing[Symbol.iterator] === "function" &&
        // avoid detecting array/set as iterator
        typeof thing.next === "function");
}
const isIterator = (x) => x != null &&
    typeof x === "object" &&
    "next" in x &&
    typeof x.next === "function";
function isAsyncIterable(thing) {
    return (typeof thing === "object" &&
        thing !== null &&
        typeof thing[Symbol.asyncIterator] ===
            "function");
}
function* consumeIteratorInContext(context, iter) {
    while (true) {
        const { value, done } = singletons/* AsyncLocalStorageProviderSingleton */.Nx.runWithConfig((0,runnables_config/* pickRunnableConfigKeys */.DY)(context), iter.next.bind(iter), true);
        if (done) {
            break;
        }
        else {
            yield value;
        }
    }
}
async function* consumeAsyncIterableInContext(context, iter) {
    const iterator = iter[Symbol.asyncIterator]();
    while (true) {
        const { value, done } = await singletons/* AsyncLocalStorageProviderSingleton */.Nx.runWithConfig((0,runnables_config/* pickRunnableConfigKeys */.DY)(context), iterator.next.bind(iter), true);
        if (done) {
            break;
        }
        else {
            yield value;
        }
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/tools/utils.js
var utils = __webpack_require__(372);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/base.js


















// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value &&
        !Array.isArray(value) &&
        // eslint-disable-next-line no-instanceof/no-instanceof
        !(value instanceof Date) &&
        typeof value === "object"
        ? value
        : { [defaultKey]: value };
}
/**
 * A Runnable is a generic unit of work that can be invoked, batched, streamed, and/or
 * transformed.
 */
class Runnable extends serializable/* Serializable */.y {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    getName(suffix) {
        const name = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.name ?? this.constructor.lc_name() ?? this.constructor.name;
        return suffix ? `${name}${suffix}` : name;
    }
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */
    bind(kwargs) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableBinding({ bound: this, kwargs, config: {} });
    }
    /**
     * Return a new Runnable that maps a list of inputs to a list of outputs,
     * by calling invoke() with each input.
     */
    map() {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableEach({ bound: this });
    }
    /**
     * Add retry logic to an existing runnable.
     * @param kwargs
     * @returns A new RunnableRetry that, when invoked, will retry according to the parameters.
     */
    withRetry(fields) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableRetry({
            bound: this,
            kwargs: {},
            config: {},
            maxAttemptNumber: fields?.stopAfterAttempt,
            ...fields,
        });
    }
    /**
     * Bind config to a Runnable, returning a new Runnable.
     * @param config New configuration parameters to attach to the new runnable.
     * @returns A new RunnableBinding with a config matching what's passed.
     */
    withConfig(config) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableBinding({
            bound: this,
            config,
            kwargs: {},
        });
    }
    /**
     * Create a new runnable from the current one that will try invoking
     * other passed fallback runnables if the initial invocation fails.
     * @param fields.fallbacks Other runnables to call if the runnable errors.
     * @returns A new RunnableWithFallbacks.
     */
    withFallbacks(fields) {
        const fallbacks = Array.isArray(fields) ? fields : fields.fallbacks;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableWithFallbacks({
            runnable: this,
            fallbacks,
        });
    }
    _getOptionsList(options, length = 0) {
        if (Array.isArray(options) && options.length !== length) {
            throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${options.length} options for ${length} inputs`);
        }
        if (Array.isArray(options)) {
            return options.map(runnables_config/* ensureConfig */.ZI);
        }
        if (length > 1 && !Array.isArray(options) && options.runId) {
            console.warn("Provided runId will be used only for the first element of the batch.");
            const subsequent = Object.fromEntries(Object.entries(options).filter(([key]) => key !== "runId"));
            return Array.from({ length }, (_, i) => (0,runnables_config/* ensureConfig */.ZI)(i === 0 ? options : subsequent));
        }
        return Array.from({ length }, () => (0,runnables_config/* ensureConfig */.ZI)(options));
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const maxConcurrency = configList[0]?.maxConcurrency ?? batchOptions?.maxConcurrency;
        const caller = new async_caller/* AsyncCaller */.g({
            maxConcurrency,
            onFailedAttempt: (e) => {
                throw e;
            },
        });
        const batchCalls = inputs.map((input, i) => caller.call(async () => {
            try {
                const result = await this.invoke(input, configList[i]);
                return result;
            }
            catch (e) {
                if (batchOptions?.returnExceptions) {
                    return e;
                }
                throw e;
            }
        }));
        return Promise.all(batchCalls);
    }
    /**
     * Default streaming implementation.
     * Subclasses should override this method if they support streaming output.
     * @param input
     * @param options
     */
    async *_streamIterator(input, options) {
        yield this.invoke(input, options);
    }
    /**
     * Stream output in chunks.
     * @param input
     * @param options
     * @returns A readable stream that is also an iterable.
     */
    async stream(input, options) {
        // Buffer the first streamed chunk to allow for initial errors
        // to surface immediately.
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const wrappedGenerator = new utils_stream/* AsyncGeneratorWithSetup */.Tr({
            generator: this._streamIterator(input, config),
            config,
        });
        await wrappedGenerator.setup;
        return utils_stream/* IterableReadableStream */.bO.fromAsyncGenerator(wrappedGenerator);
    }
    _separateRunnableConfigFromCallOptions(options) {
        let runnableConfig;
        if (options === undefined) {
            runnableConfig = (0,runnables_config/* ensureConfig */.ZI)(options);
        }
        else {
            runnableConfig = (0,runnables_config/* ensureConfig */.ZI)({
                callbacks: options.callbacks,
                tags: options.tags,
                metadata: options.metadata,
                runName: options.runName,
                configurable: options.configurable,
                recursionLimit: options.recursionLimit,
                maxConcurrency: options.maxConcurrency,
                runId: options.runId,
                timeout: options.timeout,
                signal: options.signal,
            });
        }
        const callOptions = { ...options };
        delete callOptions.callbacks;
        delete callOptions.tags;
        delete callOptions.metadata;
        delete callOptions.runName;
        delete callOptions.configurable;
        delete callOptions.recursionLimit;
        delete callOptions.maxConcurrency;
        delete callOptions.runId;
        delete callOptions.timeout;
        delete callOptions.signal;
        return [runnableConfig, callOptions];
    }
    async _callWithConfig(func, input, options) {
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), config.runId, config?.runType, undefined, undefined, config?.runName ?? this.getName());
        delete config.runId;
        let output;
        try {
            const promise = func.call(this, input, config, runManager);
            output = await (0,signal/* raceWithSignal */.o)(promise, options?.signal);
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(output, "output"));
        return output;
    }
    /**
     * Internal method that handles batching and configuration for a runnable
     * It takes a function, input values, and optional configuration, and
     * returns a promise that resolves to the output values.
     * @param func The function to be executed for each input value.
     * @param input The input values to be processed.
     * @param config Optional configuration for the function execution.
     * @returns A promise that resolves to the output values.
     */
    async _batchWithConfig(func, inputs, options, batchOptions) {
        const optionsList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(optionsList.map(runnables_config/* getCallbackManagerForConfig */.kJ));
        const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
            const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"), optionsList[i].runId, optionsList[i].runType, undefined, undefined, optionsList[i].runName ?? this.getName());
            delete optionsList[i].runId;
            return handleStartRes;
        }));
        let outputs;
        try {
            const promise = func.call(this, inputs, optionsList, runManagers, batchOptions);
            outputs = await (0,signal/* raceWithSignal */.o)(promise, optionsList?.[0]?.signal);
        }
        catch (e) {
            await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict(outputs, "output"))));
        return outputs;
    }
    /**
     * Helper method to transform an Iterator of Input values into an Iterator of
     * Output values, with callbacks.
     * Use this to implement `stream()` or `transform()` in Runnable subclasses.
     */
    async *_transformStreamWithConfig(inputGenerator, transformer, options) {
        let finalInput;
        let finalInputSupported = true;
        let finalOutput;
        let finalOutputSupported = true;
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        async function* wrapInputForTracing() {
            for await (const chunk of inputGenerator) {
                if (finalInputSupported) {
                    if (finalInput === undefined) {
                        finalInput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalInput = (0,utils_stream/* concat */.xW)(finalInput, chunk);
                        }
                        catch {
                            finalInput = undefined;
                            finalInputSupported = false;
                        }
                    }
                }
                yield chunk;
            }
        }
        let runManager;
        try {
            const pipe = await (0,utils_stream/* pipeGeneratorWithSetup */.DS)(transformer.bind(this), wrapInputForTracing(), async () => callbackManager_?.handleChainStart(this.toJSON(), { input: "" }, config.runId, config.runType, undefined, undefined, config.runName ?? this.getName()), options?.signal, config);
            delete config.runId;
            runManager = pipe.setup;
            const streamEventsHandler = runManager?.handlers.find(isStreamEventsHandler);
            let iterator = pipe.output;
            if (streamEventsHandler !== undefined && runManager !== undefined) {
                iterator = streamEventsHandler.tapOutputIterable(runManager.runId, iterator);
            }
            const streamLogHandler = runManager?.handlers.find(isLogStreamHandler);
            if (streamLogHandler !== undefined && runManager !== undefined) {
                iterator = streamLogHandler.tapOutputIterable(runManager.runId, iterator);
            }
            for await (const chunk of iterator) {
                yield chunk;
                if (finalOutputSupported) {
                    if (finalOutput === undefined) {
                        finalOutput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalOutput = (0,utils_stream/* concat */.xW)(finalOutput, chunk);
                        }
                        catch {
                            finalOutput = undefined;
                            finalOutputSupported = false;
                        }
                    }
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e, undefined, undefined, undefined, {
                inputs: _coerceToDict(finalInput, "input"),
            });
            throw e;
        }
        await runManager?.handleChainEnd(finalOutput ?? {}, undefined, undefined, undefined, { inputs: _coerceToDict(finalInput, "input") });
    }
    getGraph(_) {
        const graph = new Graph();
        // TODO: Add input schema for runnables
        const inputNode = graph.addNode({
            name: `${this.getName()}Input`,
            schema: lib.z.any(),
        });
        const runnableNode = graph.addNode(this);
        // TODO: Add output schemas for runnables
        const outputNode = graph.addNode({
            name: `${this.getName()}Output`,
            schema: lib.z.any(),
        });
        graph.addEdge(inputNode, runnableNode);
        graph.addEdge(runnableNode, outputNode);
        return graph;
    }
    /**
     * Create a new runnable sequence that runs each individual runnable in series,
     * piping the output of one runnable into another runnable or runnable-like.
     * @param coerceable A runnable, function, or object whose values are functions or runnables.
     * @returns A new runnable sequence.
     */
    pipe(coerceable) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableSequence({
            first: this,
            last: _coerceToRunnable(coerceable),
        });
    }
    /**
     * Pick keys from the dict output of this runnable. Returns a new runnable.
     */
    pick(keys) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return this.pipe(new RunnablePick(keys));
    }
    /**
     * Assigns new fields to the dict output of this runnable. Returns a new runnable.
     */
    assign(mapping) {
        return this.pipe(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        new RunnableAssign(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        new RunnableMap({ steps: mapping })));
    }
    /**
     * Default implementation of transform, which buffers input and then calls stream.
     * Subclasses should override this method if they can start producing output while
     * input is still being generated.
     * @param generator
     * @param options
     */
    async *transform(generator, options) {
        let finalChunk;
        for await (const chunk of generator) {
            if (finalChunk === undefined) {
                finalChunk = chunk;
            }
            else {
                // Make a best effort to gather, for any type that supports concat.
                // This method should throw an error if gathering fails.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                finalChunk = (0,utils_stream/* concat */.xW)(finalChunk, chunk);
            }
        }
        yield* this._streamIterator(finalChunk, (0,runnables_config/* ensureConfig */.ZI)(options));
    }
    /**
     * Stream all output from a runnable, as reported to the callback system.
     * This includes all inner runs of LLMs, Retrievers, Tools, etc.
     * Output is streamed as Log objects, which include a list of
     * jsonpatch ops that describe how the state of the run has changed in each
     * step, and the final state of the run.
     * The jsonpatch ops can be applied in order to construct state.
     * @param input
     * @param options
     * @param streamOptions
     */
    async *streamLog(input, options, streamOptions) {
        const logStreamCallbackHandler = new LogStreamCallbackHandler({
            ...streamOptions,
            autoClose: false,
            _schemaFormat: "original",
        });
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        yield* this._streamLog(input, logStreamCallbackHandler, config);
    }
    async *_streamLog(input, logStreamCallbackHandler, config) {
        const { callbacks } = config;
        if (callbacks === undefined) {
            // eslint-disable-next-line no-param-reassign
            config.callbacks = [logStreamCallbackHandler];
        }
        else if (Array.isArray(callbacks)) {
            // eslint-disable-next-line no-param-reassign
            config.callbacks = callbacks.concat([logStreamCallbackHandler]);
        }
        else {
            const copiedCallbacks = callbacks.copy();
            copiedCallbacks.addHandler(logStreamCallbackHandler, true);
            // eslint-disable-next-line no-param-reassign
            config.callbacks = copiedCallbacks;
        }
        const runnableStreamPromise = this.stream(input, config);
        async function consumeRunnableStream() {
            try {
                const runnableStream = await runnableStreamPromise;
                for await (const chunk of runnableStream) {
                    const patch = new RunLogPatch({
                        ops: [
                            {
                                op: "add",
                                path: "/streamed_output/-",
                                value: chunk,
                            },
                        ],
                    });
                    await logStreamCallbackHandler.writer.write(patch);
                }
            }
            finally {
                await logStreamCallbackHandler.writer.close();
            }
        }
        const runnableStreamConsumePromise = consumeRunnableStream();
        try {
            for await (const log of logStreamCallbackHandler) {
                yield log;
            }
        }
        finally {
            await runnableStreamConsumePromise;
        }
    }
    streamEvents(input, options, streamOptions) {
        let stream;
        if (options.version === "v1") {
            stream = this._streamEventsV1(input, options, streamOptions);
        }
        else if (options.version === "v2") {
            stream = this._streamEventsV2(input, options, streamOptions);
        }
        else {
            throw new Error(`Only versions "v1" and "v2" of the schema are currently supported.`);
        }
        if (options.encoding === "text/event-stream") {
            return convertToHttpEventStream(stream);
        }
        else {
            return utils_stream/* IterableReadableStream */.bO.fromAsyncGenerator(stream);
        }
    }
    async *_streamEventsV2(input, options, streamOptions) {
        const eventStreamer = new EventStreamCallbackHandler({
            ...streamOptions,
            autoClose: false,
        });
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const runId = config.runId ?? (0,v4/* default */.A)();
        config.runId = runId;
        const callbacks = config.callbacks;
        if (callbacks === undefined) {
            config.callbacks = [eventStreamer];
        }
        else if (Array.isArray(callbacks)) {
            config.callbacks = callbacks.concat(eventStreamer);
        }
        else {
            const copiedCallbacks = callbacks.copy();
            copiedCallbacks.addHandler(eventStreamer, true);
            // eslint-disable-next-line no-param-reassign
            config.callbacks = copiedCallbacks;
        }
        const abortController = new AbortController();
        // Call the runnable in streaming mode,
        // add each chunk to the output stream
        const outerThis = this;
        async function consumeRunnableStream() {
            try {
                let signal;
                if (options?.signal) {
                    if ("any" in AbortSignal) {
                        // Use native AbortSignal.any() if available (Node 19+)
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        signal = AbortSignal.any([
                            abortController.signal,
                            options.signal,
                        ]);
                    }
                    else {
                        // Fallback for Node 18 and below - just use the provided signal
                        signal = options.signal;
                        // Ensure we still abort our controller when the parent signal aborts
                        options.signal.addEventListener("abort", () => {
                            abortController.abort();
                        }, { once: true });
                    }
                }
                else {
                    signal = abortController.signal;
                }
                const runnableStream = await outerThis.stream(input, {
                    ...config,
                    signal,
                });
                const tappedStream = eventStreamer.tapOutputIterable(runId, runnableStream);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for await (const _ of tappedStream) {
                    // Just iterate so that the callback handler picks up events
                    if (abortController.signal.aborted)
                        break;
                }
            }
            finally {
                await eventStreamer.finish();
            }
        }
        const runnableStreamConsumePromise = consumeRunnableStream();
        let firstEventSent = false;
        let firstEventRunId;
        try {
            for await (const event of eventStreamer) {
                // This is a work-around an issue where the inputs into the
                // chain are not available until the entire input is consumed.
                // As a temporary solution, we'll modify the input to be the input
                // that was passed into the chain.
                if (!firstEventSent) {
                    event.data.input = input;
                    firstEventSent = true;
                    firstEventRunId = event.run_id;
                    yield event;
                    continue;
                }
                if (event.run_id === firstEventRunId && event.event.endsWith("_end")) {
                    // If it's the end event corresponding to the root runnable
                    // we dont include the input in the event since it's guaranteed
                    // to be included in the first event.
                    if (event.data?.input) {
                        delete event.data.input;
                    }
                }
                yield event;
            }
        }
        finally {
            abortController.abort();
            await runnableStreamConsumePromise;
        }
    }
    async *_streamEventsV1(input, options, streamOptions) {
        let runLog;
        let hasEncounteredStartEvent = false;
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const rootTags = config.tags ?? [];
        const rootMetadata = config.metadata ?? {};
        const rootName = config.runName ?? this.getName();
        const logStreamCallbackHandler = new LogStreamCallbackHandler({
            ...streamOptions,
            autoClose: false,
            _schemaFormat: "streaming_events",
        });
        const rootEventFilter = new _RootEventFilter({
            ...streamOptions,
        });
        const logStream = this._streamLog(input, logStreamCallbackHandler, config);
        for await (const log of logStream) {
            if (!runLog) {
                runLog = RunLog.fromRunLogPatch(log);
            }
            else {
                runLog = runLog.concat(log);
            }
            if (runLog.state === undefined) {
                throw new Error(`Internal error: "streamEvents" state is missing. Please open a bug report.`);
            }
            // Yield the start event for the root runnable if it hasn't been seen.
            // The root run is never filtered out
            if (!hasEncounteredStartEvent) {
                hasEncounteredStartEvent = true;
                const state = { ...runLog.state };
                const event = {
                    run_id: state.id,
                    event: `on_${state.type}_start`,
                    name: rootName,
                    tags: rootTags,
                    metadata: rootMetadata,
                    data: {
                        input,
                    },
                };
                if (rootEventFilter.includeEvent(event, state.type)) {
                    yield event;
                }
            }
            const paths = log.ops
                .filter((op) => op.path.startsWith("/logs/"))
                .map((op) => op.path.split("/")[2]);
            const dedupedPaths = [...new Set(paths)];
            for (const path of dedupedPaths) {
                let eventType;
                let data = {};
                const logEntry = runLog.state.logs[path];
                if (logEntry.end_time === undefined) {
                    if (logEntry.streamed_output.length > 0) {
                        eventType = "stream";
                    }
                    else {
                        eventType = "start";
                    }
                }
                else {
                    eventType = "end";
                }
                if (eventType === "start") {
                    // Include the inputs with the start event if they are available.
                    // Usually they will NOT be available for components that operate
                    // on streams, since those components stream the input and
                    // don't know its final value until the end of the stream.
                    if (logEntry.inputs !== undefined) {
                        data.input = logEntry.inputs;
                    }
                }
                else if (eventType === "end") {
                    if (logEntry.inputs !== undefined) {
                        data.input = logEntry.inputs;
                    }
                    data.output = logEntry.final_output;
                }
                else if (eventType === "stream") {
                    const chunkCount = logEntry.streamed_output.length;
                    if (chunkCount !== 1) {
                        throw new Error(`Expected exactly one chunk of streamed output, got ${chunkCount} instead. Encountered in: "${logEntry.name}"`);
                    }
                    data = { chunk: logEntry.streamed_output[0] };
                    // Clean up the stream, we don't need it anymore.
                    // And this avoids duplicates as well!
                    logEntry.streamed_output = [];
                }
                yield {
                    event: `on_${logEntry.type}_${eventType}`,
                    name: logEntry.name,
                    run_id: logEntry.id,
                    tags: logEntry.tags,
                    metadata: logEntry.metadata,
                    data,
                };
            }
            // Finally, we take care of the streaming output from the root chain
            // if there is any.
            const { state } = runLog;
            if (state.streamed_output.length > 0) {
                const chunkCount = state.streamed_output.length;
                if (chunkCount !== 1) {
                    throw new Error(`Expected exactly one chunk of streamed output, got ${chunkCount} instead. Encountered in: "${state.name}"`);
                }
                const data = { chunk: state.streamed_output[0] };
                // Clean up the stream, we don't need it anymore.
                state.streamed_output = [];
                const event = {
                    event: `on_${state.type}_stream`,
                    run_id: state.id,
                    tags: rootTags,
                    metadata: rootMetadata,
                    name: rootName,
                    data,
                };
                if (rootEventFilter.includeEvent(event, state.type)) {
                    yield event;
                }
            }
        }
        const state = runLog?.state;
        if (state !== undefined) {
            // Finally, yield the end event for the root runnable.
            const event = {
                event: `on_${state.type}_end`,
                name: rootName,
                run_id: state.id,
                tags: rootTags,
                metadata: rootMetadata,
                data: {
                    output: state.final_output,
                },
            };
            if (rootEventFilter.includeEvent(event, state.type))
                yield event;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnable(thing) {
        return isRunnableInterface(thing);
    }
    /**
     * Bind lifecycle listeners to a Runnable, returning a new Runnable.
     * The Run object contains information about the run, including its id,
     * type, input, output, error, startTime, endTime, and any tags or metadata
     * added to the run.
     *
     * @param {Object} params - The object containing the callback functions.
     * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
     * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
     * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
     */
    withListeners({ onStart, onEnd, onError, }) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableBinding({
            bound: this,
            config: {},
            configFactories: [
                (config) => ({
                    callbacks: [
                        new RootListenersTracer({
                            config,
                            onStart,
                            onEnd,
                            onError,
                        }),
                    ],
                }),
            ],
        });
    }
    /**
     * Convert a runnable to a tool. Return a new instance of `RunnableToolLike`
     * which contains the runnable, name, description and schema.
     *
     * @template {T extends RunInput = RunInput} RunInput - The input type of the runnable. Should be the same as the `RunInput` type of the runnable.
     *
     * @param fields
     * @param {string | undefined} [fields.name] The name of the tool. If not provided, it will default to the name of the runnable.
     * @param {string | undefined} [fields.description] The description of the tool. Falls back to the description on the Zod schema if not provided, or undefined if neither are provided.
     * @param {z.ZodType<T>} [fields.schema] The Zod schema for the input of the tool. Infers the Zod type from the input type of the runnable.
     * @returns {RunnableToolLike<z.ZodType<T>, RunOutput>} An instance of `RunnableToolLike` which is a runnable that can be used as a tool.
     */
    asTool(fields) {
        return convertRunnableToTool(this, fields);
    }
}
/**
 * A runnable that delegates calls to another runnable with a set of kwargs.
 * @example
 * ```typescript
 * import {
 *   type RunnableConfig,
 *   RunnableLambda,
 * } from "@langchain/core/runnables";
 *
 * const enhanceProfile = (
 *   profile: Record<string, any>,
 *   config?: RunnableConfig
 * ) => {
 *   if (config?.configurable?.role) {
 *     return { ...profile, role: config.configurable.role };
 *   }
 *   return profile;
 * };
 *
 * const runnable = RunnableLambda.from(enhanceProfile);
 *
 * // Bind configuration to the runnable to set the user's role dynamically
 * const adminRunnable = runnable.bind({ configurable: { role: "Admin" } });
 * const userRunnable = runnable.bind({ configurable: { role: "User" } });
 *
 * const result1 = await adminRunnable.invoke({
 *   name: "Alice",
 *   email: "alice@example.com"
 * });
 *
 * // { name: "Alice", email: "alice@example.com", role: "Admin" }
 *
 * const result2 = await userRunnable.invoke({
 *   name: "Bob",
 *   email: "bob@example.com"
 * });
 *
 * // { name: "Bob", email: "bob@example.com", role: "User" }
 * ```
 */
class RunnableBinding extends Runnable {
    static lc_name() {
        return "RunnableBinding";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "configFactories", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
        this.kwargs = fields.kwargs;
        this.config = fields.config;
        this.configFactories = fields.configFactories;
    }
    getName(suffix) {
        return this.bound.getName(suffix);
    }
    async _mergeConfig(...options) {
        const config = (0,runnables_config/* mergeConfigs */.SV)(this.config, ...options);
        return (0,runnables_config/* mergeConfigs */.SV)(config, ...(this.configFactories
            ? await Promise.all(this.configFactories.map(async (configFactory) => await configFactory(config)))
            : []));
    }
    bind(kwargs) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new this.constructor({
            bound: this.bound,
            kwargs: { ...this.kwargs, ...kwargs },
            config: this.config,
        });
    }
    withConfig(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new this.constructor({
            bound: this.bound,
            kwargs: this.kwargs,
            config: { ...this.config, ...config },
        });
    }
    withRetry(fields) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new this.constructor({
            bound: this.bound.withRetry(fields),
            kwargs: this.kwargs,
            config: this.config,
        });
    }
    async invoke(input, options) {
        return this.bound.invoke(input, await this._mergeConfig((0,runnables_config/* ensureConfig */.ZI)(options), this.kwargs));
    }
    async batch(inputs, options, batchOptions) {
        const mergedOptions = Array.isArray(options)
            ? await Promise.all(options.map(async (individualOption) => this._mergeConfig((0,runnables_config/* ensureConfig */.ZI)(individualOption), this.kwargs)))
            : await this._mergeConfig((0,runnables_config/* ensureConfig */.ZI)(options), this.kwargs);
        return this.bound.batch(inputs, mergedOptions, batchOptions);
    }
    async *_streamIterator(input, options) {
        yield* this.bound._streamIterator(input, await this._mergeConfig((0,runnables_config/* ensureConfig */.ZI)(options), this.kwargs));
    }
    async stream(input, options) {
        return this.bound.stream(input, await this._mergeConfig((0,runnables_config/* ensureConfig */.ZI)(options), this.kwargs));
    }
    async *transform(generator, options) {
        yield* this.bound.transform(generator, await this._mergeConfig((0,runnables_config/* ensureConfig */.ZI)(options), this.kwargs));
    }
    streamEvents(input, options, streamOptions) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const outerThis = this;
        const generator = async function* () {
            yield* outerThis.bound.streamEvents(input, {
                ...(await outerThis._mergeConfig((0,runnables_config/* ensureConfig */.ZI)(options), outerThis.kwargs)),
                version: options.version,
            }, streamOptions);
        };
        return utils_stream/* IterableReadableStream */.bO.fromAsyncGenerator(generator());
    }
    static isRunnableBinding(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        return thing.bound && Runnable.isRunnable(thing.bound);
    }
    /**
     * Bind lifecycle listeners to a Runnable, returning a new Runnable.
     * The Run object contains information about the run, including its id,
     * type, input, output, error, startTime, endTime, and any tags or metadata
     * added to the run.
     *
     * @param {Object} params - The object containing the callback functions.
     * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
     * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
     * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
     */
    withListeners({ onStart, onEnd, onError, }) {
        return new RunnableBinding({
            bound: this.bound,
            kwargs: this.kwargs,
            config: this.config,
            configFactories: [
                (config) => ({
                    callbacks: [
                        new RootListenersTracer({
                            config,
                            onStart,
                            onEnd,
                            onError,
                        }),
                    ],
                }),
            ],
        });
    }
}
/**
 * A runnable that delegates calls to another runnable
 * with each element of the input sequence.
 * @example
 * ```typescript
 * import { RunnableEach, RunnableLambda } from "@langchain/core/runnables";
 *
 * const toUpperCase = (input: string): string => input.toUpperCase();
 * const addGreeting = (input: string): string => `Hello, ${input}!`;
 *
 * const upperCaseLambda = RunnableLambda.from(toUpperCase);
 * const greetingLambda = RunnableLambda.from(addGreeting);
 *
 * const chain = new RunnableEach({
 *   bound: upperCaseLambda.pipe(greetingLambda),
 * });
 *
 * const result = await chain.invoke(["alice", "bob", "carol"])
 *
 * // ["Hello, ALICE!", "Hello, BOB!", "Hello, CAROL!"]
 * ```
 */
class RunnableEach extends Runnable {
    static lc_name() {
        return "RunnableEach";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
    }
    /**
     * Binds the runnable with the specified arguments.
     * @param kwargs The arguments to bind the runnable with.
     * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
     */
    bind(kwargs) {
        return new RunnableEach({
            bound: this.bound.bind(kwargs),
        });
    }
    /**
     * Invokes the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    async invoke(inputs, config) {
        return this._callWithConfig(this._invoke.bind(this), inputs, config);
    }
    /**
     * A helper method that is used to invoke the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    async _invoke(inputs, config, runManager) {
        return this.bound.batch(inputs, (0,runnables_config/* patchConfig */.tn)(config, { callbacks: runManager?.getChild() }));
    }
    /**
     * Bind lifecycle listeners to a Runnable, returning a new Runnable.
     * The Run object contains information about the run, including its id,
     * type, input, output, error, startTime, endTime, and any tags or metadata
     * added to the run.
     *
     * @param {Object} params - The object containing the callback functions.
     * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
     * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
     * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
     */
    withListeners({ onStart, onEnd, onError, }) {
        return new RunnableEach({
            bound: this.bound.withListeners({ onStart, onEnd, onError }),
        });
    }
}
/**
 * Base class for runnables that can be retried a
 * specified number of times.
 * @example
 * ```typescript
 * import {
 *   RunnableLambda,
 *   RunnableRetry,
 * } from "@langchain/core/runnables";
 *
 * // Simulate an API call that fails
 * const simulateApiCall = (input: string): string => {
 *   console.log(`Attempting API call with input: ${input}`);
 *   throw new Error("API call failed due to network issue");
 * };
 *
 * const apiCallLambda = RunnableLambda.from(simulateApiCall);
 *
 * // Apply retry logic using the .withRetry() method
 * const apiCallWithRetry = apiCallLambda.withRetry({ stopAfterAttempt: 3 });
 *
 * // Alternatively, create a RunnableRetry instance manually
 * const manualRetry = new RunnableRetry({
 *   bound: apiCallLambda,
 *   maxAttemptNumber: 3,
 *   config: {},
 * });
 *
 * // Example invocation using the .withRetry() method
 * const res = await apiCallWithRetry
 *   .invoke("Request 1")
 *   .catch((error) => {
 *     console.error("Failed after multiple retries:", error.message);
 *   });
 *
 * // Example invocation using the manual retry instance
 * const res2 = await manualRetry
 *   .invoke("Request 2")
 *   .catch((error) => {
 *     console.error("Failed after multiple retries:", error.message);
 *   });
 * ```
 */
class RunnableRetry extends RunnableBinding {
    static lc_name() {
        return "RunnableRetry";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "maxAttemptNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "onFailedAttempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => { }
        });
        this.maxAttemptNumber = fields.maxAttemptNumber ?? this.maxAttemptNumber;
        this.onFailedAttempt = fields.onFailedAttempt ?? this.onFailedAttempt;
    }
    _patchConfigForRetry(attempt, config, runManager) {
        const tag = attempt > 1 ? `retry:attempt:${attempt}` : undefined;
        return (0,runnables_config/* patchConfig */.tn)(config, { callbacks: runManager?.getChild(tag) });
    }
    async _invoke(input, config, runManager) {
        return p_retry((attemptNumber) => super.invoke(input, this._patchConfigForRetry(attemptNumber, config, runManager)), {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onFailedAttempt: (error) => this.onFailedAttempt(error, input),
            retries: Math.max(this.maxAttemptNumber - 1, 0),
            randomize: true,
        });
    }
    /**
     * Method that invokes the runnable with the specified input, run manager,
     * and config. It handles the retry logic by catching any errors and
     * recursively invoking itself with the updated config for the next retry
     * attempt.
     * @param input The input for the runnable.
     * @param runManager The run manager for the runnable.
     * @param config The config for the runnable.
     * @returns A promise that resolves to the output of the runnable.
     */
    async invoke(input, config) {
        return this._callWithConfig(this._invoke.bind(this), input, config);
    }
    async _batch(inputs, configs, runManagers, batchOptions) {
        const resultsMap = {};
        try {
            await p_retry(async (attemptNumber) => {
                const remainingIndexes = inputs
                    .map((_, i) => i)
                    .filter((i) => resultsMap[i.toString()] === undefined ||
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    resultsMap[i.toString()] instanceof Error);
                const remainingInputs = remainingIndexes.map((i) => inputs[i]);
                const patchedConfigs = remainingIndexes.map((i) => this._patchConfigForRetry(attemptNumber, configs?.[i], runManagers?.[i]));
                const results = await super.batch(remainingInputs, patchedConfigs, {
                    ...batchOptions,
                    returnExceptions: true,
                });
                let firstException;
                for (let i = 0; i < results.length; i += 1) {
                    const result = results[i];
                    const resultMapIndex = remainingIndexes[i];
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (result instanceof Error) {
                        if (firstException === undefined) {
                            firstException = result;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            firstException.input = remainingInputs[i];
                        }
                    }
                    resultsMap[resultMapIndex.toString()] = result;
                }
                if (firstException) {
                    throw firstException;
                }
                return results;
            }, {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onFailedAttempt: (error) => this.onFailedAttempt(error, error.input),
                retries: Math.max(this.maxAttemptNumber - 1, 0),
                randomize: true,
            });
        }
        catch (e) {
            if (batchOptions?.returnExceptions !== true) {
                throw e;
            }
        }
        return Object.keys(resultsMap)
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((key) => resultsMap[parseInt(key, 10)]);
    }
    async batch(inputs, options, batchOptions) {
        return this._batchWithConfig(this._batch.bind(this), inputs, options, batchOptions);
    }
}
/**
 * A sequence of runnables, where the output of each is the input of the next.
 * @example
 * ```typescript
 * const promptTemplate = PromptTemplate.fromTemplate(
 *   "Tell me a joke about {topic}",
 * );
 * const chain = RunnableSequence.from([promptTemplate, new ChatOpenAI({})]);
 * const result = await chain.invoke({ topic: "bears" });
 * ```
 */
class RunnableSequence extends Runnable {
    static lc_name() {
        return "RunnableSequence";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "first", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "middle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "last", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "omitSequenceTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        this.first = fields.first;
        this.middle = fields.middle ?? this.middle;
        this.last = fields.last;
        this.name = fields.name;
        this.omitSequenceTags = fields.omitSequenceTags ?? this.omitSequenceTags;
    }
    get steps() {
        return [this.first, ...this.middle, this.last];
    }
    async invoke(input, options) {
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), config.runId, undefined, undefined, undefined, config?.runName);
        delete config.runId;
        let nextStepInput = input;
        let finalOutput;
        try {
            const initialSteps = [this.first, ...this.middle];
            for (let i = 0; i < initialSteps.length; i += 1) {
                const step = initialSteps[i];
                const promise = step.invoke(nextStepInput, (0,runnables_config/* patchConfig */.tn)(config, {
                    callbacks: runManager?.getChild(this.omitSequenceTags ? undefined : `seq:step:${i + 1}`),
                }));
                nextStepInput = await (0,signal/* raceWithSignal */.o)(promise, options?.signal);
            }
            // TypeScript can't detect that the last output of the sequence returns RunOutput, so call it out of the loop here
            if (options?.signal?.aborted) {
                throw new Error("Aborted");
            }
            finalOutput = await this.last.invoke(nextStepInput, (0,runnables_config/* patchConfig */.tn)(config, {
                callbacks: runManager?.getChild(this.omitSequenceTags ? undefined : `seq:step:${this.steps.length}`),
            }));
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
        return finalOutput;
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map(runnables_config/* getCallbackManagerForConfig */.kJ));
        const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
            const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"), configList[i].runId, undefined, undefined, undefined, configList[i].runName);
            delete configList[i].runId;
            return handleStartRes;
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let nextStepInputs = inputs;
        try {
            for (let i = 0; i < this.steps.length; i += 1) {
                const step = this.steps[i];
                const promise = step.batch(nextStepInputs, runManagers.map((runManager, j) => {
                    const childRunManager = runManager?.getChild(this.omitSequenceTags ? undefined : `seq:step:${i + 1}`);
                    return (0,runnables_config/* patchConfig */.tn)(configList[j], { callbacks: childRunManager });
                }), batchOptions);
                nextStepInputs = await (0,signal/* raceWithSignal */.o)(promise, configList[0]?.signal);
            }
        }
        catch (e) {
            await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict(nextStepInputs, "output"))));
        return nextStepInputs;
    }
    async *_streamIterator(input, options) {
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(options);
        const { runId, ...otherOptions } = options ?? {};
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), runId, undefined, undefined, undefined, otherOptions?.runName);
        const steps = [this.first, ...this.middle, this.last];
        let concatSupported = true;
        let finalOutput;
        async function* inputGenerator() {
            yield input;
        }
        try {
            let finalGenerator = steps[0].transform(inputGenerator(), (0,runnables_config/* patchConfig */.tn)(otherOptions, {
                callbacks: runManager?.getChild(this.omitSequenceTags ? undefined : `seq:step:1`),
            }));
            for (let i = 1; i < steps.length; i += 1) {
                const step = steps[i];
                finalGenerator = await step.transform(finalGenerator, (0,runnables_config/* patchConfig */.tn)(otherOptions, {
                    callbacks: runManager?.getChild(this.omitSequenceTags ? undefined : `seq:step:${i + 1}`),
                }));
            }
            for await (const chunk of finalGenerator) {
                options?.signal?.throwIfAborted();
                yield chunk;
                if (concatSupported) {
                    if (finalOutput === undefined) {
                        finalOutput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalOutput = (0,utils_stream/* concat */.xW)(finalOutput, chunk);
                        }
                        catch (e) {
                            finalOutput = undefined;
                            concatSupported = false;
                        }
                    }
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
    }
    getGraph(config) {
        const graph = new Graph();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let currentLastNode = null;
        this.steps.forEach((step, index) => {
            const stepGraph = step.getGraph(config);
            if (index !== 0) {
                stepGraph.trimFirstNode();
            }
            if (index !== this.steps.length - 1) {
                stepGraph.trimLastNode();
            }
            graph.extend(stepGraph);
            const stepFirstNode = stepGraph.firstNode();
            if (!stepFirstNode) {
                throw new Error(`Runnable ${step} has no first node`);
            }
            if (currentLastNode) {
                graph.addEdge(currentLastNode, stepFirstNode);
            }
            currentLastNode = stepGraph.lastNode();
        });
        return graph;
    }
    pipe(coerceable) {
        if (RunnableSequence.isRunnableSequence(coerceable)) {
            return new RunnableSequence({
                first: this.first,
                middle: this.middle.concat([
                    this.last,
                    coerceable.first,
                    ...coerceable.middle,
                ]),
                last: coerceable.last,
                name: this.name ?? coerceable.name,
            });
        }
        else {
            return new RunnableSequence({
                first: this.first,
                middle: [...this.middle, this.last],
                last: _coerceToRunnable(coerceable),
                name: this.name,
            });
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnableSequence(thing) {
        return Array.isArray(thing.middle) && Runnable.isRunnable(thing);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static from([first, ...runnables], nameOrFields) {
        let extra = {};
        if (typeof nameOrFields === "string") {
            extra.name = nameOrFields;
        }
        else if (nameOrFields !== undefined) {
            extra = nameOrFields;
        }
        return new RunnableSequence({
            ...extra,
            first: _coerceToRunnable(first),
            middle: runnables.slice(0, -1).map(_coerceToRunnable),
            last: _coerceToRunnable(runnables[runnables.length - 1]),
        });
    }
}
/**
 * A runnable that runs a mapping of runnables in parallel,
 * and returns a mapping of their outputs.
 * @example
 * ```typescript
 * const mapChain = RunnableMap.from({
 *   joke: PromptTemplate.fromTemplate("Tell me a joke about {topic}").pipe(
 *     new ChatAnthropic({}),
 *   ),
 *   poem: PromptTemplate.fromTemplate("write a 2-line poem about {topic}").pipe(
 *     new ChatAnthropic({}),
 *   ),
 * });
 * const result = await mapChain.invoke({ topic: "bear" });
 * ```
 */
class RunnableMap extends Runnable {
    static lc_name() {
        return "RunnableMap";
    }
    getStepsKeys() {
        return Object.keys(this.steps);
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "steps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.steps = {};
        for (const [key, value] of Object.entries(fields.steps)) {
            this.steps[key] = _coerceToRunnable(value);
        }
    }
    static from(steps) {
        return new RunnableMap({ steps });
    }
    async invoke(input, options) {
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), {
            input,
        }, config.runId, undefined, undefined, undefined, config?.runName);
        delete config.runId;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const output = {};
        try {
            const promises = Object.entries(this.steps).map(async ([key, runnable]) => {
                output[key] = await runnable.invoke(input, (0,runnables_config/* patchConfig */.tn)(config, {
                    callbacks: runManager?.getChild(`map:key:${key}`),
                }));
            });
            await (0,signal/* raceWithSignal */.o)(Promise.all(promises), options?.signal);
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(output);
        return output;
    }
    async *_transform(generator, runManager, options) {
        // shallow copy steps to ignore changes while iterating
        const steps = { ...this.steps };
        // each step gets a copy of the input iterator
        const inputCopies = (0,utils_stream/* atee */.gI)(generator, Object.keys(steps).length);
        // start the first iteration of each output iterator
        const tasks = new Map(Object.entries(steps).map(([key, runnable], i) => {
            const gen = runnable.transform(inputCopies[i], (0,runnables_config/* patchConfig */.tn)(options, {
                callbacks: runManager?.getChild(`map:key:${key}`),
            }));
            return [key, gen.next().then((result) => ({ key, gen, result }))];
        }));
        // yield chunks as they become available,
        // starting new iterations as needed,
        // until all iterators are done
        while (tasks.size) {
            const promise = Promise.race(tasks.values());
            const { key, result, gen } = await (0,signal/* raceWithSignal */.o)(promise, options?.signal);
            tasks.delete(key);
            if (!result.done) {
                yield { [key]: result.value };
                tasks.set(key, gen.next().then((result) => ({ key, gen, result })));
            }
        }
    }
    transform(generator, options) {
        return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
    }
    async stream(input, options) {
        async function* generator() {
            yield input;
        }
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const wrappedGenerator = new utils_stream/* AsyncGeneratorWithSetup */.Tr({
            generator: this.transform(generator(), config),
            config,
        });
        await wrappedGenerator.setup;
        return utils_stream/* IterableReadableStream */.bO.fromAsyncGenerator(wrappedGenerator);
    }
}
/**
 * A runnable that wraps a traced LangSmith function.
 */
class RunnableTraceable extends Runnable {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "func", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (!(0,traceable/* isTraceableFunction */.GZ)(fields.func)) {
            throw new Error("RunnableTraceable requires a function that is wrapped in traceable higher-order function");
        }
        this.func = fields.func;
    }
    async invoke(input, options) {
        const [config] = this._getOptionsList(options ?? {}, 1);
        const callbacks = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        const promise = this.func((0,runnables_config/* patchConfig */.tn)(config, { callbacks }), input);
        return (0,signal/* raceWithSignal */.o)(promise, config?.signal);
    }
    async *_streamIterator(input, options) {
        const [config] = this._getOptionsList(options ?? {}, 1);
        const result = await this.invoke(input, options);
        if (isAsyncIterable(result)) {
            for await (const item of result) {
                config?.signal?.throwIfAborted();
                yield item;
            }
            return;
        }
        if (isIterator(result)) {
            while (true) {
                config?.signal?.throwIfAborted();
                const state = result.next();
                if (state.done)
                    break;
                yield state.value;
            }
            return;
        }
        yield result;
    }
    static from(func) {
        return new RunnableTraceable({ func });
    }
}
function assertNonTraceableFunction(func) {
    if ((0,traceable/* isTraceableFunction */.GZ)(func)) {
        throw new Error("RunnableLambda requires a function that is not wrapped in traceable higher-order function. This shouldn't happen.");
    }
}
/**
 * A runnable that wraps an arbitrary function that takes a single argument.
 * @example
 * ```typescript
 * import { RunnableLambda } from "@langchain/core/runnables";
 *
 * const add = (input: { x: number; y: number }) => input.x + input.y;
 *
 * const multiply = (input: { value: number; multiplier: number }) =>
 *   input.value * input.multiplier;
 *
 * // Create runnables for the functions
 * const addLambda = RunnableLambda.from(add);
 * const multiplyLambda = RunnableLambda.from(multiply);
 *
 * // Chain the lambdas for a mathematical operation
 * const chainedLambda = addLambda.pipe((result) =>
 *   multiplyLambda.invoke({ value: result, multiplier: 2 })
 * );
 *
 * // Example invocation of the chainedLambda
 * const result = await chainedLambda.invoke({ x: 2, y: 3 });
 *
 * // Will log "10" (since (2 + 3) * 2 = 10)
 * ```
 */
class RunnableLambda extends Runnable {
    static lc_name() {
        return "RunnableLambda";
    }
    constructor(fields) {
        if ((0,traceable/* isTraceableFunction */.GZ)(fields.func)) {
            // eslint-disable-next-line no-constructor-return
            return RunnableTraceable.from(fields.func);
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "func", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        assertNonTraceableFunction(fields.func);
        this.func = fields.func;
    }
    static from(func) {
        return new RunnableLambda({
            func,
        });
    }
    async _invoke(input, config, runManager) {
        return new Promise((resolve, reject) => {
            const childConfig = (0,runnables_config/* patchConfig */.tn)(config, {
                callbacks: runManager?.getChild(),
                recursionLimit: (config?.recursionLimit ?? runnables_config/* DEFAULT_RECURSION_LIMIT */.p_) - 1,
            });
            void singletons/* AsyncLocalStorageProviderSingleton */.Nx.runWithConfig((0,runnables_config/* pickRunnableConfigKeys */.DY)(childConfig), async () => {
                try {
                    let output = await this.func(input, {
                        ...childConfig,
                    });
                    if (output && Runnable.isRunnable(output)) {
                        if (config?.recursionLimit === 0) {
                            throw new Error("Recursion limit reached.");
                        }
                        output = await output.invoke(input, {
                            ...childConfig,
                            recursionLimit: (childConfig.recursionLimit ?? runnables_config/* DEFAULT_RECURSION_LIMIT */.p_) - 1,
                        });
                    }
                    else if (isAsyncIterable(output)) {
                        let finalOutput;
                        for await (const chunk of consumeAsyncIterableInContext(childConfig, output)) {
                            config?.signal?.throwIfAborted();
                            if (finalOutput === undefined) {
                                finalOutput = chunk;
                            }
                            else {
                                // Make a best effort to gather, for any type that supports concat.
                                try {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    finalOutput = (0,utils_stream/* concat */.xW)(finalOutput, chunk);
                                }
                                catch (e) {
                                    finalOutput = chunk;
                                }
                            }
                        }
                        output = finalOutput;
                    }
                    else if (isIterableIterator(output)) {
                        let finalOutput;
                        for (const chunk of consumeIteratorInContext(childConfig, output)) {
                            config?.signal?.throwIfAborted();
                            if (finalOutput === undefined) {
                                finalOutput = chunk;
                            }
                            else {
                                // Make a best effort to gather, for any type that supports concat.
                                try {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    finalOutput = (0,utils_stream/* concat */.xW)(finalOutput, chunk);
                                }
                                catch (e) {
                                    finalOutput = chunk;
                                }
                            }
                        }
                        output = finalOutput;
                    }
                    resolve(output);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    async invoke(input, options) {
        return this._callWithConfig(this._invoke.bind(this), input, options);
    }
    async *_transform(generator, runManager, config) {
        let finalChunk;
        for await (const chunk of generator) {
            if (finalChunk === undefined) {
                finalChunk = chunk;
            }
            else {
                // Make a best effort to gather, for any type that supports concat.
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    finalChunk = (0,utils_stream/* concat */.xW)(finalChunk, chunk);
                }
                catch (e) {
                    finalChunk = chunk;
                }
            }
        }
        const childConfig = (0,runnables_config/* patchConfig */.tn)(config, {
            callbacks: runManager?.getChild(),
            recursionLimit: (config?.recursionLimit ?? runnables_config/* DEFAULT_RECURSION_LIMIT */.p_) - 1,
        });
        const output = await new Promise((resolve, reject) => {
            void singletons/* AsyncLocalStorageProviderSingleton */.Nx.runWithConfig((0,runnables_config/* pickRunnableConfigKeys */.DY)(childConfig), async () => {
                try {
                    const res = await this.func(finalChunk, {
                        ...childConfig,
                        config: childConfig,
                    });
                    resolve(res);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
        if (output && Runnable.isRunnable(output)) {
            if (config?.recursionLimit === 0) {
                throw new Error("Recursion limit reached.");
            }
            const stream = await output.stream(finalChunk, childConfig);
            for await (const chunk of stream) {
                yield chunk;
            }
        }
        else if (isAsyncIterable(output)) {
            for await (const chunk of consumeAsyncIterableInContext(childConfig, output)) {
                config?.signal?.throwIfAborted();
                yield chunk;
            }
        }
        else if (isIterableIterator(output)) {
            for (const chunk of consumeIteratorInContext(childConfig, output)) {
                config?.signal?.throwIfAborted();
                yield chunk;
            }
        }
        else {
            yield output;
        }
    }
    transform(generator, options) {
        return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
    }
    async stream(input, options) {
        async function* generator() {
            yield input;
        }
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const wrappedGenerator = new utils_stream/* AsyncGeneratorWithSetup */.Tr({
            generator: this.transform(generator(), config),
            config,
        });
        await wrappedGenerator.setup;
        return utils_stream/* IterableReadableStream */.bO.fromAsyncGenerator(wrappedGenerator);
    }
}
/**
 * A runnable that runs a mapping of runnables in parallel,
 * and returns a mapping of their outputs.
 * @example
 * ```typescript
 * import {
 *   RunnableLambda,
 *   RunnableParallel,
 * } from "@langchain/core/runnables";
 *
 * const addYears = (age: number): number => age + 5;
 * const yearsToFifty = (age: number): number => 50 - age;
 * const yearsToHundred = (age: number): number => 100 - age;
 *
 * const addYearsLambda = RunnableLambda.from(addYears);
 * const milestoneFiftyLambda = RunnableLambda.from(yearsToFifty);
 * const milestoneHundredLambda = RunnableLambda.from(yearsToHundred);
 *
 * // Pipe will coerce objects into RunnableParallel by default, but we
 * // explicitly instantiate one here to demonstrate
 * const sequence = addYearsLambda.pipe(
 *   RunnableParallel.from({
 *     years_to_fifty: milestoneFiftyLambda,
 *     years_to_hundred: milestoneHundredLambda,
 *   })
 * );
 *
 * // Invoke the sequence with a single age input
 * const res = sequence.invoke(25);
 *
 * // { years_to_fifty: 25, years_to_hundred: 75 }
 * ```
 */
class RunnableParallel extends (/* unused pure expression or super */ null && (RunnableMap)) {
}
/**
 * A Runnable that can fallback to other Runnables if it fails.
 * External APIs (e.g., APIs for a language model) may at times experience
 * degraded performance or even downtime.
 *
 * In these cases, it can be useful to have a fallback Runnable that can be
 * used in place of the original Runnable (e.g., fallback to another LLM provider).
 *
 * Fallbacks can be defined at the level of a single Runnable, or at the level
 * of a chain of Runnables. Fallbacks are tried in order until one succeeds or
 * all fail.
 *
 * While you can instantiate a `RunnableWithFallbacks` directly, it is usually
 * more convenient to use the `withFallbacks` method on an existing Runnable.
 *
 * When streaming, fallbacks will only be called on failures during the initial
 * stream creation. Errors that occur after a stream starts will not fallback
 * to the next Runnable.
 *
 * @example
 * ```typescript
 * import {
 *   RunnableLambda,
 *   RunnableWithFallbacks,
 * } from "@langchain/core/runnables";
 *
 * const primaryOperation = (input: string): string => {
 *   if (input !== "safe") {
 *     throw new Error("Primary operation failed due to unsafe input");
 *   }
 *   return `Processed: ${input}`;
 * };
 *
 * // Define a fallback operation that processes the input differently
 * const fallbackOperation = (input: string): string =>
 *   `Fallback processed: ${input}`;
 *
 * const primaryRunnable = RunnableLambda.from(primaryOperation);
 * const fallbackRunnable = RunnableLambda.from(fallbackOperation);
 *
 * // Apply the fallback logic using the .withFallbacks() method
 * const runnableWithFallback = primaryRunnable.withFallbacks([fallbackRunnable]);
 *
 * // Alternatively, create a RunnableWithFallbacks instance manually
 * const manualFallbackChain = new RunnableWithFallbacks({
 *   runnable: primaryRunnable,
 *   fallbacks: [fallbackRunnable],
 * });
 *
 * // Example invocation using .withFallbacks()
 * const res = await runnableWithFallback
 *   .invoke("unsafe input")
 *   .catch((error) => {
 *     console.error("Failed after all attempts:", error.message);
 *   });
 *
 * // "Fallback processed: unsafe input"
 *
 * // Example invocation using manual instantiation
 * const res = await manualFallbackChain
 *   .invoke("safe")
 *   .catch((error) => {
 *     console.error("Failed after all attempts:", error.message);
 *   });
 *
 * // "Processed: safe"
 * ```
 */
class RunnableWithFallbacks extends Runnable {
    static lc_name() {
        return "RunnableWithFallbacks";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnable = fields.runnable;
        this.fallbacks = fields.fallbacks;
    }
    *runnables() {
        yield this.runnable;
        for (const fallback of this.fallbacks) {
            yield fallback;
        }
    }
    async invoke(input, options) {
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        const { runId, ...otherConfigFields } = config;
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), runId, undefined, undefined, undefined, otherConfigFields?.runName);
        const childConfig = (0,runnables_config/* patchConfig */.tn)(otherConfigFields, {
            callbacks: runManager?.getChild(),
        });
        const res = await singletons/* AsyncLocalStorageProviderSingleton */.Nx.runWithConfig(childConfig, async () => {
            let firstError;
            for (const runnable of this.runnables()) {
                config?.signal?.throwIfAborted();
                try {
                    const output = await runnable.invoke(input, childConfig);
                    await runManager?.handleChainEnd(_coerceToDict(output, "output"));
                    return output;
                }
                catch (e) {
                    if (firstError === undefined) {
                        firstError = e;
                    }
                }
            }
            if (firstError === undefined) {
                throw new Error("No error stored at end of fallback.");
            }
            await runManager?.handleChainError(firstError);
            throw firstError;
        });
        return res;
    }
    async *_streamIterator(input, options) {
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        const { runId, ...otherConfigFields } = config;
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), runId, undefined, undefined, undefined, otherConfigFields?.runName);
        let firstError;
        let stream;
        for (const runnable of this.runnables()) {
            config?.signal?.throwIfAborted();
            const childConfig = (0,runnables_config/* patchConfig */.tn)(otherConfigFields, {
                callbacks: runManager?.getChild(),
            });
            try {
                const originalStream = await runnable.stream(input, childConfig);
                stream = consumeAsyncIterableInContext(childConfig, originalStream);
                break;
            }
            catch (e) {
                if (firstError === undefined) {
                    firstError = e;
                }
            }
        }
        if (stream === undefined) {
            const error = firstError ?? new Error("No error stored at end of fallback.");
            await runManager?.handleChainError(error);
            throw error;
        }
        let output;
        try {
            for await (const chunk of stream) {
                yield chunk;
                try {
                    output = output === undefined ? output : (0,utils_stream/* concat */.xW)(output, chunk);
                }
                catch (e) {
                    output = undefined;
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(output, "output"));
    }
    async batch(inputs, options, batchOptions) {
        if (batchOptions?.returnExceptions) {
            throw new Error("Not implemented.");
        }
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map((config) => (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config)));
        const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
            const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"), configList[i].runId, undefined, undefined, undefined, configList[i].runName);
            delete configList[i].runId;
            return handleStartRes;
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let firstError;
        for (const runnable of this.runnables()) {
            configList[0].signal?.throwIfAborted();
            try {
                const outputs = await runnable.batch(inputs, runManagers.map((runManager, j) => (0,runnables_config/* patchConfig */.tn)(configList[j], {
                    callbacks: runManager?.getChild(),
                })), batchOptions);
                await Promise.all(runManagers.map((runManager, i) => runManager?.handleChainEnd(_coerceToDict(outputs[i], "output"))));
                return outputs;
            }
            catch (e) {
                if (firstError === undefined) {
                    firstError = e;
                }
            }
        }
        if (!firstError) {
            throw new Error("No error stored at end of fallbacks.");
        }
        await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(firstError)));
        throw firstError;
    }
}
// TODO: Figure out why the compiler needs help eliminating Error as a RunOutput type
function _coerceToRunnable(coerceable) {
    if (typeof coerceable === "function") {
        return new RunnableLambda({ func: coerceable });
    }
    else if (Runnable.isRunnable(coerceable)) {
        return coerceable;
    }
    else if (!Array.isArray(coerceable) && typeof coerceable === "object") {
        const runnables = {};
        for (const [key, value] of Object.entries(coerceable)) {
            runnables[key] = _coerceToRunnable(value);
        }
        return new RunnableMap({
            steps: runnables,
        });
    }
    else {
        throw new Error(`Expected a Runnable, function or object.\nInstead got an unsupported type.`);
    }
}
/**
 * A runnable that assigns key-value pairs to inputs of type `Record<string, unknown>`.
 * @example
 * ```typescript
 * import {
 *   RunnableAssign,
 *   RunnableLambda,
 *   RunnableParallel,
 * } from "@langchain/core/runnables";
 *
 * const calculateAge = (x: { birthYear: number }): { age: number } => {
 *   const currentYear = new Date().getFullYear();
 *   return { age: currentYear - x.birthYear };
 * };
 *
 * const createGreeting = (x: { name: string }): { greeting: string } => {
 *   return { greeting: `Hello, ${x.name}!` };
 * };
 *
 * const mapper = RunnableParallel.from({
 *   age_step: RunnableLambda.from(calculateAge),
 *   greeting_step: RunnableLambda.from(createGreeting),
 * });
 *
 * const runnableAssign = new RunnableAssign({ mapper });
 *
 * const res = await runnableAssign.invoke({ name: "Alice", birthYear: 1990 });
 *
 * // { name: "Alice", birthYear: 1990, age_step: { age: 34 }, greeting_step: { greeting: "Hello, Alice!" } }
 * ```
 */
class RunnableAssign extends Runnable {
    static lc_name() {
        return "RunnableAssign";
    }
    constructor(fields) {
        // eslint-disable-next-line no-instanceof/no-instanceof
        if (fields instanceof RunnableMap) {
            // eslint-disable-next-line no-param-reassign
            fields = { mapper: fields };
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "mapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.mapper = fields.mapper;
    }
    async invoke(input, options) {
        const mapperResult = await this.mapper.invoke(input, options);
        return {
            ...input,
            ...mapperResult,
        };
    }
    async *_transform(generator, runManager, options) {
        // collect mapper keys
        const mapperKeys = this.mapper.getStepsKeys();
        // create two input gens, one for the mapper, one for the input
        const [forPassthrough, forMapper] = (0,utils_stream/* atee */.gI)(generator);
        // create mapper output gen
        const mapperOutput = this.mapper.transform(forMapper, (0,runnables_config/* patchConfig */.tn)(options, { callbacks: runManager?.getChild() }));
        // start the mapper
        const firstMapperChunkPromise = mapperOutput.next();
        // yield the passthrough
        for await (const chunk of forPassthrough) {
            if (typeof chunk !== "object" || Array.isArray(chunk)) {
                throw new Error(`RunnableAssign can only be used with objects as input, got ${typeof chunk}`);
            }
            const filtered = Object.fromEntries(Object.entries(chunk).filter(([key]) => !mapperKeys.includes(key)));
            if (Object.keys(filtered).length > 0) {
                yield filtered;
            }
        }
        // yield the mapper output
        yield (await firstMapperChunkPromise).value;
        for await (const chunk of mapperOutput) {
            yield chunk;
        }
    }
    transform(generator, options) {
        return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
    }
    async stream(input, options) {
        async function* generator() {
            yield input;
        }
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const wrappedGenerator = new utils_stream/* AsyncGeneratorWithSetup */.Tr({
            generator: this.transform(generator(), config),
            config,
        });
        await wrappedGenerator.setup;
        return utils_stream/* IterableReadableStream */.bO.fromAsyncGenerator(wrappedGenerator);
    }
}
/**
 * A runnable that assigns key-value pairs to inputs of type `Record<string, unknown>`.
 * Useful for streaming, can be automatically created and chained by calling `runnable.pick();`.
 * @example
 * ```typescript
 * import { RunnablePick } from "@langchain/core/runnables";
 *
 * const inputData = {
 *   name: "John",
 *   age: 30,
 *   city: "New York",
 *   country: "USA",
 *   email: "john.doe@example.com",
 *   phone: "+1234567890",
 * };
 *
 * const basicInfoRunnable = new RunnablePick(["name", "city"]);
 *
 * // Example invocation
 * const res = await basicInfoRunnable.invoke(inputData);
 *
 * // { name: 'John', city: 'New York' }
 * ```
 */
class RunnablePick extends Runnable {
    static lc_name() {
        return "RunnablePick";
    }
    constructor(fields) {
        if (typeof fields === "string" || Array.isArray(fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = { keys: fields };
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.keys = fields.keys;
    }
    async _pick(input) {
        if (typeof this.keys === "string") {
            return input[this.keys];
        }
        else {
            const picked = this.keys
                .map((key) => [key, input[key]])
                .filter((v) => v[1] !== undefined);
            return picked.length === 0 ? undefined : Object.fromEntries(picked);
        }
    }
    async invoke(input, options) {
        return this._callWithConfig(this._pick.bind(this), input, options);
    }
    async *_transform(generator) {
        for await (const chunk of generator) {
            const picked = await this._pick(chunk);
            if (picked !== undefined) {
                yield picked;
            }
        }
    }
    transform(generator, options) {
        return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
    }
    async stream(input, options) {
        async function* generator() {
            yield input;
        }
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        const wrappedGenerator = new utils_stream/* AsyncGeneratorWithSetup */.Tr({
            generator: this.transform(generator(), config),
            config,
        });
        await wrappedGenerator.setup;
        return utils_stream/* IterableReadableStream */.bO.fromAsyncGenerator(wrappedGenerator);
    }
}
class RunnableToolLike extends RunnableBinding {
    constructor(fields) {
        const sequence = RunnableSequence.from([
            RunnableLambda.from(async (input) => {
                let toolInput;
                if ((0,utils/* _isToolCall */.K)(input)) {
                    try {
                        toolInput = await this.schema.parseAsync(input.args);
                    }
                    catch (e) {
                        throw new utils/* ToolInputParsingException */.q(`Received tool input did not match expected schema`, JSON.stringify(input.args));
                    }
                }
                else {
                    toolInput = input;
                }
                return toolInput;
            }).withConfig({ runName: `${fields.name}:parse_input` }),
            fields.bound,
        ]).withConfig({ runName: fields.name });
        super({
            bound: sequence,
            config: fields.config ?? {},
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.description = fields.description;
        this.schema = fields.schema;
    }
    static lc_name() {
        return "RunnableToolLike";
    }
}
/**
 * Given a runnable and a Zod schema, convert the runnable to a tool.
 *
 * @template RunInput The input type for the runnable.
 * @template RunOutput The output type for the runnable.
 *
 * @param {Runnable<RunInput, RunOutput>} runnable The runnable to convert to a tool.
 * @param fields
 * @param {string | undefined} [fields.name] The name of the tool. If not provided, it will default to the name of the runnable.
 * @param {string | undefined} [fields.description] The description of the tool. Falls back to the description on the Zod schema if not provided, or undefined if neither are provided.
 * @param {z.ZodType<RunInput>} [fields.schema] The Zod schema for the input of the tool. Infers the Zod type from the input type of the runnable.
 * @returns {RunnableToolLike<z.ZodType<RunInput>, RunOutput>} An instance of `RunnableToolLike` which is a runnable that can be used as a tool.
 */
function convertRunnableToTool(runnable, fields) {
    const name = fields.name ?? runnable.getName();
    const description = fields.description ?? fields.schema?.description;
    if (fields.schema.constructor === lib.z.ZodString) {
        return new RunnableToolLike({
            name,
            description,
            schema: lib.z
                .object({
                input: lib.z.string(),
            })
                .transform((input) => input.input),
            bound: runnable,
        });
    }
    return new RunnableToolLike({
        name,
        description,
        schema: fields.schema,
        bound: runnable,
    });
}


/***/ }),

/***/ 5112:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ii: () => (/* binding */ ZodOptional),
/* harmony export */   kY: () => (/* binding */ ZodFirstPartyTypeKind),
/* harmony export */   z: () => (/* binding */ z)
/* harmony export */ });
/* unused harmony exports BRAND, DIRTY, EMPTY_PATH, INVALID, NEVER, OK, ParseStatus, Schema, ZodAny, ZodArray, ZodBigInt, ZodBoolean, ZodBranded, ZodCatch, ZodDate, ZodDefault, ZodDiscriminatedUnion, ZodEffects, ZodEnum, ZodError, ZodFunction, ZodIntersection, ZodIssueCode, ZodLazy, ZodLiteral, ZodMap, ZodNaN, ZodNativeEnum, ZodNever, ZodNull, ZodNullable, ZodNumber, ZodObject, ZodParsedType, ZodPipeline, ZodPromise, ZodReadonly, ZodRecord, ZodSchema, ZodSet, ZodString, ZodSymbol, ZodTransformer, ZodTuple, ZodType, ZodUndefined, ZodUnion, ZodUnknown, ZodVoid, addIssueToContext, any, array, bigint, boolean, coerce, custom, date, datetimeRegex, default, defaultErrorMap, discriminatedUnion, effect, enum, function, getErrorMap, getParsedType, instanceof, intersection, isAborted, isAsync, isDirty, isValid, late, lazy, literal, makeIssue, map, nan, nativeEnum, never, null, nullable, number, object, objectUtil, oboolean, onumber, optional, ostring, pipeline, preprocess, promise, quotelessJson, record, set, setErrorMap, strictObject, string, symbol, transformer, tuple, undefined, union, unknown, util, void */
var util;
(function (util) {
    util.assertEqual = (val) => val;
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array
            .map((val) => (typeof val === "string" ? `'${val}'` : val))
            .join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return ZodParsedType.undefined;
        case "string":
            return ZodParsedType.string;
        case "number":
            return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
            return ZodParsedType.boolean;
        case "function":
            return ZodParsedType.function;
        case "bigint":
            return ZodParsedType.bigint;
        case "symbol":
            return ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return ZodParsedType.array;
            }
            if (data === null) {
                return ZodParsedType.null;
            }
            if (data.then &&
                typeof data.then === "function" &&
                data.catch &&
                typeof data.catch === "function") {
                return ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return ZodParsedType.date;
            }
            return ZodParsedType.object;
        default:
            return ZodParsedType.unknown;
    }
};

const ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
    get errors() {
        return this.issues;
    }
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};

const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodIssueCode.invalid_type:
            if (issue.received === ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
            break;
        case ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
            break;
        case ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `smaller than or equal to`
                        : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util.assertNever(issue);
    }
    return { message };
};

let overrideErrorMap = errorMap;
function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}

const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap, // contextual error map is first priority
            ctx.schemaErrorMap, // then schema-bound map if available
            overrideMap, // then global override map
            overrideMap === errorMap ? undefined : errorMap, // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return INVALID;
            if (value.status === "aborted")
                return INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" &&
                (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
const INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));

var _ZodEnum_cache, _ZodNativeEnum_cache;
class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (this._key instanceof Array) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if (isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        var _a, _b;
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: getParsedType(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        var _a;
        const ctx = {
            common: {
                issues: [],
                async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    "~validate"(data) {
        var _a, _b;
        const ctx = {
            common: {
                issues: [],
                async: !!this["~standard"].async,
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        if (!this["~standard"].async) {
            try {
                const result = this._parseSync({ data, path: [], parent: ctx });
                return isValid(result)
                    ? {
                        value: result.value,
                    }
                    : {
                        issues: ctx.common.issues,
                    };
            }
            catch (err) {
                if ((_b = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("encountered")) {
                    this["~standard"].async = true;
                }
                ctx.common = {
                    issues: [],
                    async: true,
                };
            }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result)
            ? {
                value: result.value,
            }
            : {
                issues: ctx.common.issues,
            });
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
                async: true,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult)
            ? maybeAsyncResult
            : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function"
                    ? refinementData(val, ctx)
                    : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: (data) => this["~validate"](data),
        };
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
// const ipv6Regex =
// /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// https://base64.guru/standards/base64url
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    // let regex = `\\d{2}:\\d{2}:\\d{2}`;
    let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
    if (args.precision) {
        regex = `${regex}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        regex = `${regex}(\\.\\d+)?`;
    }
    return regex;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
        return false;
    try {
        const [header] = jwt.split(".");
        // Convert base64url to base64
        const base64 = header
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null)
            return false;
        if (!decoded.typ || !decoded.alg)
            return false;
        if (alg && decoded.alg !== alg)
            return false;
        return true;
    }
    catch (_a) {
        return false;
    }
}
function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "email",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "emoji",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "uuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "nanoid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid2",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ulid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch (_a) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "regex",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "duration",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ip",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "jwt") {
                if (!isValidJWT(input.data, check.alg)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "jwt",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cidr") {
                if (!isValidCidr(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cidr",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64url") {
                if (!base64urlRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: ZodIssueCode.invalid_string,
            ...errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    base64url(message) {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return this._addCheck({
            kind: "base64url",
            ...errorUtil.errToObj(message),
        });
    }
    jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
        var _a, _b;
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
            local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options === null || options === void 0 ? void 0 : options.position,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil.errToObj(message),
        });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodString.create = (params) => {
    var _a;
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.number,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" ||
            (ch.kind === "multipleOf" && util.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" ||
                ch.kind === "int" ||
                ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            try {
                input.data = BigInt(input.data);
            }
            catch (_a) {
                return this._getInvalidInput(input);
            }
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
            return this._getInvalidInput(input);
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx.parsedType,
        });
        return INVALID;
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodBigInt.create = (params) => {
    var _a;
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.date,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_date,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.symbol,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.null,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.never,
            received: ctx.parsedType,
        });
        return INVALID;
    }
}
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.void,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                addIssueToContext(ctx, {
                    code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return (this._cached = { shape, keys });
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever &&
            this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") ;
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        var _a, _b, _c, _d;
                        const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key) => {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util.objectKeys(this.shape));
    }
}
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError(issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return util.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
        const bKeys = util.objectKeys(b);
        const sharedKeys = util
            .objectKeys(a)
            .filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === ZodParsedType.date &&
        bType === ZodParsedType.date &&
        +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if (isAborted(parsedLeft) || isAborted(parsedRight)) {
                return INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.invalid_intersection_types,
                });
                return INVALID;
            }
            if (isDirty(parsedLeft) || isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.map,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.set,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.function,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        function makeArgsIssue(args, error) {
            return makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(async function (...args) {
                const error = new ZodError([]);
                const parsedArgs = await me._def.args
                    .parseAsync(args, params)
                    .catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args
                ? args
                : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodEnum_cache.set(this, void 0);
    }
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
            __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
_ZodEnum_cache = new WeakMap();
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodNativeEnum_cache.set(this, void 0);
    }
    _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string &&
            ctx.parsedType !== ZodParsedType.number) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
            __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
_ZodNativeEnum_cache = new WeakMap();
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise &&
            ctx.common.async === false) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise
            ? ctx.data
            : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                addIssueToContext(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return INVALID;
                    if (result.status === "dirty")
                        return DIRTY(result.value);
                    if (status.value === "dirty")
                        return DIRTY(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return INVALID;
                if (result.status === "dirty")
                    return DIRTY(result.value);
                if (status.value === "dirty")
                    return DIRTY(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((inner) => {
                    if (inner.status === "aborted")
                        return INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!isValid(base))
                    return base;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((base) => {
                    if (!isValid(base))
                        return base;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
                });
            }
        }
        util.assertNever(effect);
    }
}
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
            return OK(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
            return OK(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function"
            ? params.default
            : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if (isAsync(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new ZodError(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return DIRTY(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if (isValid(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return isAsync(result)
            ? result.then((data) => freeze(data))
            : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      z.custom      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////
function cleanParams(params, data) {
    const p = typeof params === "function"
        ? params(data)
        : typeof params === "string"
            ? { message: params }
            : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
}
function custom(check, _params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            var _a, _b;
            const r = check(data);
            if (r instanceof Promise) {
                return r.then((r) => {
                    var _a, _b;
                    if (!r) {
                        const params = cleanParams(_params, data);
                        const _fatal = (_b = (_a = params.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
                        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
                    }
                });
            }
            if (!r) {
                const params = cleanParams(_params, data);
                const _fatal = (_b = (_a = params.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
                ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
            return;
        });
    return ZodAny.create();
}
const late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};
const NEVER = INVALID;

var z = /*#__PURE__*/Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap: setErrorMap,
    getErrorMap: getErrorMap,
    makeIssue: makeIssue,
    EMPTY_PATH: EMPTY_PATH,
    addIssueToContext: addIssueToContext,
    ParseStatus: ParseStatus,
    INVALID: INVALID,
    DIRTY: DIRTY,
    OK: OK,
    isAborted: isAborted,
    isDirty: isDirty,
    isValid: isValid,
    isAsync: isAsync,
    get util () { return util; },
    get objectUtil () { return objectUtil; },
    ZodParsedType: ZodParsedType,
    getParsedType: getParsedType,
    ZodType: ZodType,
    datetimeRegex: datetimeRegex,
    ZodString: ZodString,
    ZodNumber: ZodNumber,
    ZodBigInt: ZodBigInt,
    ZodBoolean: ZodBoolean,
    ZodDate: ZodDate,
    ZodSymbol: ZodSymbol,
    ZodUndefined: ZodUndefined,
    ZodNull: ZodNull,
    ZodAny: ZodAny,
    ZodUnknown: ZodUnknown,
    ZodNever: ZodNever,
    ZodVoid: ZodVoid,
    ZodArray: ZodArray,
    ZodObject: ZodObject,
    ZodUnion: ZodUnion,
    ZodDiscriminatedUnion: ZodDiscriminatedUnion,
    ZodIntersection: ZodIntersection,
    ZodTuple: ZodTuple,
    ZodRecord: ZodRecord,
    ZodMap: ZodMap,
    ZodSet: ZodSet,
    ZodFunction: ZodFunction,
    ZodLazy: ZodLazy,
    ZodLiteral: ZodLiteral,
    ZodEnum: ZodEnum,
    ZodNativeEnum: ZodNativeEnum,
    ZodPromise: ZodPromise,
    ZodEffects: ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional: ZodOptional,
    ZodNullable: ZodNullable,
    ZodDefault: ZodDefault,
    ZodCatch: ZodCatch,
    ZodNaN: ZodNaN,
    BRAND: BRAND,
    ZodBranded: ZodBranded,
    ZodPipeline: ZodPipeline,
    ZodReadonly: ZodReadonly,
    custom: custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late: late,
    get ZodFirstPartyTypeKind () { return ZodFirstPartyTypeKind; },
    coerce: coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    'enum': enumType,
    'function': functionType,
    'instanceof': instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    'null': nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean: oboolean,
    onumber: onumber,
    optional: optionalType,
    ostring: ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    'undefined': undefinedType,
    union: unionType,
    unknown: unknownType,
    'void': voidType,
    NEVER: NEVER,
    ZodIssueCode: ZodIssueCode,
    quotelessJson: quotelessJson,
    ZodError: ZodError
});




/***/ }),

/***/ 5374:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  y: () => (/* binding */ Serializable),
  Z: () => (/* binding */ get_lc_unique_name)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/decamelize@1.2.0/node_modules/decamelize/index.js
var decamelize = __webpack_require__(9936);
// EXTERNAL MODULE: ./node_modules/.pnpm/camelcase@6.3.0/node_modules/camelcase/index.js
var camelcase = __webpack_require__(9064);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/load/map_keys.js


function keyToJson(key, map) {
    return map?.[key] || decamelize(key);
}
function keyFromJson(key, map) {
    return map?.[key] || camelCase(key);
}
function mapKeys(fields, mapper, map) {
    const mapped = {};
    for (const key in fields) {
        if (Object.hasOwn(fields, key)) {
            mapped[mapper(key, map)] = fields[key];
        }
    }
    return mapped;
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/load/serializable.js

function shallowCopy(obj) {
    return Array.isArray(obj) ? [...obj] : { ...obj };
}
function replaceSecrets(root, secretsMap) {
    const result = shallowCopy(root);
    for (const [path, secretId] of Object.entries(secretsMap)) {
        const [last, ...partsReverse] = path.split(".").reverse();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current = result;
        for (const part of partsReverse.reverse()) {
            if (current[part] === undefined) {
                break;
            }
            current[part] = shallowCopy(current[part]);
            current = current[part];
        }
        if (current[last] !== undefined) {
            current[last] = {
                lc: 1,
                type: "secret",
                id: [secretId],
            };
        }
    }
    return result;
}
/**
 * Get a unique name for the module, rather than parent class implementations.
 * Should not be subclassed, subclass lc_name above instead.
 */
function get_lc_unique_name(
// eslint-disable-next-line @typescript-eslint/no-use-before-define
serializableClass) {
    // "super" here would refer to the parent class of Serializable,
    // when we want the parent class of the module actually calling this method.
    const parentClass = Object.getPrototypeOf(serializableClass);
    const lcNameIsSubclassed = typeof serializableClass.lc_name === "function" &&
        (typeof parentClass.lc_name !== "function" ||
            serializableClass.lc_name() !== parentClass.lc_name());
    if (lcNameIsSubclassed) {
        return serializableClass.lc_name();
    }
    else {
        return serializableClass.name;
    }
}
class Serializable {
    /**
     * The name of the serializable. Override to provide an alias or
     * to preserve the serialized module name in minified environments.
     *
     * Implemented as a static method to support loading logic.
     */
    static lc_name() {
        return this.name;
    }
    /**
     * The final serialized identifier for the module.
     */
    get lc_id() {
        return [
            ...this.lc_namespace,
            get_lc_unique_name(this.constructor),
        ];
    }
    /**
     * A map of secrets, which will be omitted from serialization.
     * Keys are paths to the secret in constructor args, e.g. "foo.bar.baz".
     * Values are the secret ids, which will be used when deserializing.
     */
    get lc_secrets() {
        return undefined;
    }
    /**
     * A map of additional attributes to merge with constructor args.
     * Keys are the attribute names, e.g. "foo".
     * Values are the attribute values, which will be serialized.
     * These attributes need to be accepted by the constructor as arguments.
     */
    get lc_attributes() {
        return undefined;
    }
    /**
     * A map of aliases for constructor args.
     * Keys are the attribute names, e.g. "foo".
     * Values are the alias that will replace the key in serialization.
     * This is used to eg. make argument names match Python.
     */
    get lc_aliases() {
        return undefined;
    }
    /**
     * A manual list of keys that should be serialized.
     * If not overridden, all fields passed into the constructor will be serialized.
     */
    get lc_serializable_keys() {
        return undefined;
    }
    constructor(kwargs, ..._args) {
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (this.lc_serializable_keys !== undefined) {
            this.lc_kwargs = Object.fromEntries(Object.entries(kwargs || {}).filter(([key]) => this.lc_serializable_keys?.includes(key)));
        }
        else {
            this.lc_kwargs = kwargs ?? {};
        }
    }
    toJSON() {
        if (!this.lc_serializable) {
            return this.toJSONNotImplemented();
        }
        if (
        // eslint-disable-next-line no-instanceof/no-instanceof
        this.lc_kwargs instanceof Serializable ||
            typeof this.lc_kwargs !== "object" ||
            Array.isArray(this.lc_kwargs)) {
            // We do not support serialization of classes with arg not a POJO
            // I'm aware the check above isn't as strict as it could be
            return this.toJSONNotImplemented();
        }
        const aliases = {};
        const secrets = {};
        const kwargs = Object.keys(this.lc_kwargs).reduce((acc, key) => {
            acc[key] = key in this ? this[key] : this.lc_kwargs[key];
            return acc;
        }, {});
        // get secrets, attributes and aliases from all superclasses
        for (
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current = Object.getPrototypeOf(this); current; current = Object.getPrototypeOf(current)) {
            Object.assign(aliases, Reflect.get(current, "lc_aliases", this));
            Object.assign(secrets, Reflect.get(current, "lc_secrets", this));
            Object.assign(kwargs, Reflect.get(current, "lc_attributes", this));
        }
        // include all secrets used, even if not in kwargs,
        // will be replaced with sentinel value in replaceSecrets
        Object.keys(secrets).forEach((keyPath) => {
            // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
            let read = this;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let write = kwargs;
            const [last, ...partsReverse] = keyPath.split(".").reverse();
            for (const key of partsReverse.reverse()) {
                if (!(key in read) || read[key] === undefined)
                    return;
                if (!(key in write) || write[key] === undefined) {
                    if (typeof read[key] === "object" && read[key] != null) {
                        write[key] = {};
                    }
                    else if (Array.isArray(read[key])) {
                        write[key] = [];
                    }
                }
                read = read[key];
                write = write[key];
            }
            if (last in read && read[last] !== undefined) {
                write[last] = write[last] || read[last];
            }
        });
        return {
            lc: 1,
            type: "constructor",
            id: this.lc_id,
            kwargs: mapKeys(Object.keys(secrets).length ? replaceSecrets(kwargs, secrets) : kwargs, keyToJson, aliases),
        };
    }
    toJSONNotImplemented() {
        return {
            lc: 1,
            type: "not_implemented",
            id: this.lc_id,
        };
    }
}


/***/ }),

/***/ 5585:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ addLangChainErrorFields)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
function addLangChainErrorFields(error, lc_error_code) {
    error.lc_error_code = lc_error_code;
    error.message = `${error.message}\n\nTroubleshooting URL: https://js.langchain.com/docs/troubleshooting/errors/${lc_error_code}/\n`;
    return error;
}


/***/ }),

/***/ 5607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Az: () => (/* binding */ getEnvironmentVariable),
/* harmony export */   Ec: () => (/* binding */ getRuntimeEnvironment),
/* harmony export */   Jz: () => (/* binding */ getLangSmithEnvironmentVariable),
/* harmony export */   yk: () => (/* binding */ getLangChainEnvVarsMetadata)
/* harmony export */ });
/* unused harmony exports isBrowser, isWebWorker, isJsDom, isDeno, isNode, getEnv, getLangChainEnvVars, getEnvironmentVariables, setEnvironmentVariable, getShas */
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8946);
// Inlined from https://github.com/flexdinesh/browser-or-node

let globalEnv;
const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const isWebWorker = () => typeof globalThis === "object" &&
    globalThis.constructor &&
    globalThis.constructor.name === "DedicatedWorkerGlobalScope";
const isJsDom = () => (typeof window !== "undefined" && window.name === "nodejs") ||
    (typeof navigator !== "undefined" &&
        (navigator.userAgent.includes("Node.js") ||
            navigator.userAgent.includes("jsdom")));
// Supabase Edge Function provides a `Deno` global object
// without `version` property
const isDeno = () => typeof Deno !== "undefined";
// Mark not-as-node if in Supabase Edge Function
const isNode = () => typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined" &&
    !isDeno();
const getEnv = () => {
    if (globalEnv) {
        return globalEnv;
    }
    if (isBrowser()) {
        globalEnv = "browser";
    }
    else if (isNode()) {
        globalEnv = "node";
    }
    else if (isWebWorker()) {
        globalEnv = "webworker";
    }
    else if (isJsDom()) {
        globalEnv = "jsdom";
    }
    else if (isDeno()) {
        globalEnv = "deno";
    }
    else {
        globalEnv = "other";
    }
    return globalEnv;
};
let runtimeEnvironment;
function getRuntimeEnvironment() {
    if (runtimeEnvironment === undefined) {
        const env = getEnv();
        const releaseEnv = getShas();
        runtimeEnvironment = {
            library: "langsmith",
            runtime: env,
            sdk: "langsmith-js",
            sdk_version: _index_js__WEBPACK_IMPORTED_MODULE_0__/* .__version__ */ .Ls,
            ...releaseEnv,
        };
    }
    return runtimeEnvironment;
}
/**
 * Retrieves the LangChain-specific environment variables from the current runtime environment.
 * Sensitive keys (containing the word "key", "token", or "secret") have their values redacted for security.
 *
 * @returns {Record<string, string>}
 *  - A record of LangChain-specific environment variables.
 */
function getLangChainEnvVars() {
    const allEnvVars = getEnvironmentVariables() || {};
    const envVars = {};
    for (const [key, value] of Object.entries(allEnvVars)) {
        if (key.startsWith("LANGCHAIN_") && typeof value === "string") {
            envVars[key] = value;
        }
    }
    for (const key in envVars) {
        if ((key.toLowerCase().includes("key") ||
            key.toLowerCase().includes("secret") ||
            key.toLowerCase().includes("token")) &&
            typeof envVars[key] === "string") {
            const value = envVars[key];
            envVars[key] =
                value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
        }
    }
    return envVars;
}
/**
 * Retrieves the LangChain-specific metadata from the current runtime environment.
 *
 * @returns {Record<string, string>}
 *  - A record of LangChain-specific metadata environment variables.
 */
function getLangChainEnvVarsMetadata() {
    const allEnvVars = getEnvironmentVariables() || {};
    const envVars = {};
    const excluded = [
        "LANGCHAIN_API_KEY",
        "LANGCHAIN_ENDPOINT",
        "LANGCHAIN_TRACING_V2",
        "LANGCHAIN_PROJECT",
        "LANGCHAIN_SESSION",
        "LANGSMITH_API_KEY",
        "LANGSMITH_ENDPOINT",
        "LANGSMITH_TRACING_V2",
        "LANGSMITH_PROJECT",
        "LANGSMITH_SESSION",
    ];
    for (const [key, value] of Object.entries(allEnvVars)) {
        if ((key.startsWith("LANGCHAIN_") || key.startsWith("LANGSMITH_")) &&
            typeof value === "string" &&
            !excluded.includes(key) &&
            !key.toLowerCase().includes("key") &&
            !key.toLowerCase().includes("secret") &&
            !key.toLowerCase().includes("token")) {
            if (key === "LANGCHAIN_REVISION_ID") {
                envVars["revision_id"] = value;
            }
            else {
                envVars[key] = value;
            }
        }
    }
    return envVars;
}
/**
 * Retrieves the environment variables from the current runtime environment.
 *
 * This function is designed to operate in a variety of JS environments,
 * including Node.js, Deno, browsers, etc.
 *
 * @returns {Record<string, string> | undefined}
 *  - A record of environment variables if available.
 *  - `undefined` if the environment does not support or allows access to environment variables.
 */
function getEnvironmentVariables() {
    try {
        // Check for Node.js environment
        // eslint-disable-next-line no-process-env
        if (typeof process !== "undefined" && process.env) {
            // eslint-disable-next-line no-process-env
            return Object.entries(process.env).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {});
        }
        // For browsers and other environments, we may not have direct access to env variables
        // Return undefined or any other fallback as required.
        return undefined;
    }
    catch (e) {
        // Catch any errors that might occur while trying to access environment variables
        return undefined;
    }
}
function getEnvironmentVariable(name) {
    // Certain Deno setups will throw an error if you try to access environment variables
    // https://github.com/hwchase17/langchainjs/issues/1412
    try {
        return typeof process !== "undefined"
            ? // eslint-disable-next-line no-process-env
                process.env?.[name]
            : undefined;
    }
    catch (e) {
        return undefined;
    }
}
function getLangSmithEnvironmentVariable(name) {
    return (getEnvironmentVariable(`LANGSMITH_${name}`) ||
        getEnvironmentVariable(`LANGCHAIN_${name}`));
}
function setEnvironmentVariable(name, value) {
    if (typeof process !== "undefined") {
        // eslint-disable-next-line no-process-env
        process.env[name] = value;
    }
}
let cachedCommitSHAs;
/**
 * Get the Git commit SHA from common environment variables
 * used by different CI/CD platforms.
 * @returns {string | undefined} The Git commit SHA or undefined if not found.
 */
function getShas() {
    if (cachedCommitSHAs !== undefined) {
        return cachedCommitSHAs;
    }
    const common_release_envs = [
        "VERCEL_GIT_COMMIT_SHA",
        "NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA",
        "COMMIT_REF",
        "RENDER_GIT_COMMIT",
        "CI_COMMIT_SHA",
        "CIRCLE_SHA1",
        "CF_PAGES_COMMIT_SHA",
        "REACT_APP_GIT_SHA",
        "SOURCE_VERSION",
        "GITHUB_SHA",
        "TRAVIS_COMMIT",
        "GIT_COMMIT",
        "BUILD_VCS_NUMBER",
        "bamboo_planRepository_revision",
        "Build.SourceVersion",
        "BITBUCKET_COMMIT",
        "DRONE_COMMIT_SHA",
        "SEMAPHORE_GIT_SHA",
        "BUILDKITE_COMMIT",
    ];
    const shas = {};
    for (const env of common_release_envs) {
        const envVar = getEnvironmentVariable(env);
        if (envVar !== undefined) {
            shas[env] = envVar;
        }
    }
    cachedCommitSHAs = shas;
    return shas;
}


/***/ }),

/***/ 6179:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a7: () => (/* binding */ HumanMessageChunk),
/* harmony export */   xc: () => (/* binding */ HumanMessage)
/* harmony export */ });
/* unused harmony exports isHumanMessage, isHumanMessageChunk */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);

/**
 * Represents a human message in a conversation.
 */
class HumanMessage extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ {
    static lc_name() {
        return "HumanMessage";
    }
    _getType() {
        return "human";
    }
}
/**
 * Represents a chunk of a human message, which can be concatenated with
 * other human message chunks.
 */
class HumanMessageChunk extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessageChunk */ .gj {
    static lc_name() {
        return "HumanMessageChunk";
    }
    _getType() {
        return "human";
    }
    concat(chunk) {
        return new HumanMessageChunk({
            content: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* .mergeContent */ ._I)(this.content, chunk.content),
            additional_kwargs: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.additional_kwargs, chunk.additional_kwargs),
            response_metadata: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.response_metadata, chunk.response_metadata),
            id: this.id ?? chunk.id,
        });
    }
}
function isHumanMessage(x) {
    return x.getType() === "human";
}
function isHumanMessageChunk(x) {
    return x.getType() === "human";
}


/***/ }),

/***/ 6570:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dr: () => (/* binding */ ToolMessageChunk),
/* harmony export */   p1: () => (/* binding */ defaultToolCallParser),
/* harmony export */   uf: () => (/* binding */ ToolMessage)
/* harmony export */ });
/* unused harmony exports isDirectToolOutput, isToolMessage, isToolMessageChunk */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);

function isDirectToolOutput(x) {
    return (x != null &&
        typeof x === "object" &&
        "lc_direct_tool_output" in x &&
        x.lc_direct_tool_output === true);
}
/**
 * Represents a tool message in a conversation.
 */
class ToolMessage extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ {
    static lc_name() {
        return "ToolMessage";
    }
    get lc_aliases() {
        // exclude snake case conversion to pascal case
        return { tool_call_id: "tool_call_id" };
    }
    constructor(fields, tool_call_id, name) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, name, tool_call_id: tool_call_id };
        }
        super(fields);
        Object.defineProperty(this, "lc_direct_tool_output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**
         * Status of the tool invocation.
         * @version 0.2.19
         */
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tool_call_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Artifact of the Tool execution which is not meant to be sent to the model.
         *
         * Should only be specified if it is different from the message content, e.g. if only
         * a subset of the full tool output is being passed as message content but the full
         * output is needed in other parts of the code.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "artifact", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tool_call_id = fields.tool_call_id;
        this.artifact = fields.artifact;
        this.status = fields.status;
    }
    _getType() {
        return "tool";
    }
    static isInstance(message) {
        return message._getType() === "tool";
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            tool_call_id: this.tool_call_id,
            artifact: this.artifact,
        };
    }
}
/**
 * Represents a chunk of a tool message, which can be concatenated
 * with other tool message chunks.
 */
class ToolMessageChunk extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessageChunk */ .gj {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "tool_call_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Status of the tool invocation.
         * @version 0.2.19
         */
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Artifact of the Tool execution which is not meant to be sent to the model.
         *
         * Should only be specified if it is different from the message content, e.g. if only
         * a subset of the full tool output is being passed as message content but the full
         * output is needed in other parts of the code.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "artifact", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tool_call_id = fields.tool_call_id;
        this.artifact = fields.artifact;
        this.status = fields.status;
    }
    static lc_name() {
        return "ToolMessageChunk";
    }
    _getType() {
        return "tool";
    }
    concat(chunk) {
        return new ToolMessageChunk({
            content: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* .mergeContent */ ._I)(this.content, chunk.content),
            additional_kwargs: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.additional_kwargs, chunk.additional_kwargs),
            response_metadata: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.response_metadata, chunk.response_metadata),
            artifact: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeObj */ .F7)(this.artifact, chunk.artifact),
            tool_call_id: this.tool_call_id,
            id: this.id ?? chunk.id,
            status: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeStatus */ .Iv)(this.status, chunk.status),
        });
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            tool_call_id: this.tool_call_id,
            artifact: this.artifact,
        };
    }
}
function defaultToolCallParser(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
rawToolCalls) {
    const toolCalls = [];
    const invalidToolCalls = [];
    for (const toolCall of rawToolCalls) {
        if (!toolCall.function) {
            continue;
        }
        else {
            const functionName = toolCall.function.name;
            try {
                const functionArgs = JSON.parse(toolCall.function.arguments);
                const parsed = {
                    name: functionName || "",
                    args: functionArgs || {},
                    id: toolCall.id,
                };
                toolCalls.push(parsed);
            }
            catch (error) {
                invalidToolCalls.push({
                    name: functionName,
                    args: toolCall.function.arguments,
                    id: toolCall.id,
                    error: "Malformed args.",
                });
            }
        }
    }
    return [toolCalls, invalidToolCalls];
}
function isToolMessage(x) {
    return x._getType() === "tool";
}
function isToolMessageChunk(x) {
    return x._getType() === "tool";
}


/***/ }),

/***/ 6689:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ _getFetchImplementation)
/* harmony export */ });
/* unused harmony export overrideFetchImplementation */
// Wrap the default fetch call due to issues with illegal invocations
// in some environments:
// https://stackoverflow.com/questions/69876859/why-does-bind-fix-failed-to-execute-fetch-on-window-illegal-invocation-err
// @ts-expect-error Broad typing to support a range of fetch implementations
const DEFAULT_FETCH_IMPLEMENTATION = (...args) => fetch(...args);
const LANGSMITH_FETCH_IMPLEMENTATION_KEY = Symbol.for("ls:fetch_implementation");
/**
 * Overrides the fetch implementation used for LangSmith calls.
 * You should use this if you need to use an implementation of fetch
 * other than the default global (e.g. for dealing with proxies).
 * @param fetch The new fetch functino to use.
 */
const overrideFetchImplementation = (fetch) => {
    globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY] = fetch;
};
/**
 * @internal
 */
const _getFetchImplementation = () => {
    return (globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY] ??
        DEFAULT_FETCH_IMPLEMENTATION);
};


/***/ }),

/***/ 6826:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ AIMessageChunk),
/* harmony export */   Od: () => (/* binding */ AIMessage)
/* harmony export */ });
/* unused harmony exports isAIMessage, isAIMessageChunk */
/* harmony import */ var _utils_json_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2513);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);
/* harmony import */ var _tool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6570);



/**
 * Represents an AI message in a conversation.
 */
class AIMessage extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ {
    get lc_aliases() {
        // exclude snake case conversion to pascal case
        return {
            ...super.lc_aliases,
            tool_calls: "tool_calls",
            invalid_tool_calls: "invalid_tool_calls",
        };
    }
    constructor(fields, 
    /** @deprecated */
    kwargs) {
        let initParams;
        if (typeof fields === "string") {
            initParams = {
                content: fields,
                tool_calls: [],
                invalid_tool_calls: [],
                additional_kwargs: kwargs ?? {},
            };
        }
        else {
            initParams = fields;
            const rawToolCalls = initParams.additional_kwargs?.tool_calls;
            const toolCalls = initParams.tool_calls;
            if (!(rawToolCalls == null) &&
                rawToolCalls.length > 0 &&
                (toolCalls === undefined || toolCalls.length === 0)) {
                console.warn([
                    "New LangChain packages are available that more efficiently handle",
                    "tool calling.\n\nPlease upgrade your packages to versions that set",
                    "message tool calls. e.g., `yarn add @langchain/anthropic`,",
                    "yarn add @langchain/openai`, etc.",
                ].join(" "));
            }
            try {
                if (!(rawToolCalls == null) && toolCalls === undefined) {
                    const [toolCalls, invalidToolCalls] = (0,_tool_js__WEBPACK_IMPORTED_MODULE_1__/* .defaultToolCallParser */ .p1)(rawToolCalls);
                    initParams.tool_calls = toolCalls ?? [];
                    initParams.invalid_tool_calls = invalidToolCalls ?? [];
                }
                else {
                    initParams.tool_calls = initParams.tool_calls ?? [];
                    initParams.invalid_tool_calls = initParams.invalid_tool_calls ?? [];
                }
            }
            catch (e) {
                // Do nothing if parsing fails
                initParams.tool_calls = [];
                initParams.invalid_tool_calls = [];
            }
        }
        // Sadly, TypeScript only allows super() calls at root if the class has
        // properties with initializers, so we have to check types twice.
        super(initParams);
        // These are typed as optional to avoid breaking changes and allow for casting
        // from BaseMessage.
        Object.defineProperty(this, "tool_calls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "invalid_tool_calls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**
         * If provided, token usage information associated with the message.
         */
        Object.defineProperty(this, "usage_metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof initParams !== "string") {
            this.tool_calls = initParams.tool_calls ?? this.tool_calls;
            this.invalid_tool_calls =
                initParams.invalid_tool_calls ?? this.invalid_tool_calls;
        }
        this.usage_metadata = initParams.usage_metadata;
    }
    static lc_name() {
        return "AIMessage";
    }
    _getType() {
        return "ai";
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            tool_calls: this.tool_calls,
            invalid_tool_calls: this.invalid_tool_calls,
            usage_metadata: this.usage_metadata,
        };
    }
}
function isAIMessage(x) {
    return x._getType() === "ai";
}
function isAIMessageChunk(x) {
    return x._getType() === "ai";
}
/**
 * Represents a chunk of an AI message, which can be concatenated with
 * other AI message chunks.
 */
class AIMessageChunk extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessageChunk */ .gj {
    constructor(fields) {
        let initParams;
        if (typeof fields === "string") {
            initParams = {
                content: fields,
                tool_calls: [],
                invalid_tool_calls: [],
                tool_call_chunks: [],
            };
        }
        else if (fields.tool_call_chunks === undefined) {
            initParams = {
                ...fields,
                tool_calls: fields.tool_calls ?? [],
                invalid_tool_calls: [],
                tool_call_chunks: [],
                usage_metadata: fields.usage_metadata !== undefined
                    ? fields.usage_metadata
                    : undefined,
            };
        }
        else {
            const toolCalls = [];
            const invalidToolCalls = [];
            for (const toolCallChunk of fields.tool_call_chunks) {
                let parsedArgs = {};
                try {
                    parsedArgs = (0,_utils_json_js__WEBPACK_IMPORTED_MODULE_2__/* .parsePartialJson */ .d)(toolCallChunk.args || "{}");
                    if (parsedArgs === null ||
                        typeof parsedArgs !== "object" ||
                        Array.isArray(parsedArgs)) {
                        throw new Error("Malformed tool call chunk args.");
                    }
                    toolCalls.push({
                        name: toolCallChunk.name ?? "",
                        args: parsedArgs,
                        id: toolCallChunk.id,
                        type: "tool_call",
                    });
                }
                catch (e) {
                    invalidToolCalls.push({
                        name: toolCallChunk.name,
                        args: toolCallChunk.args,
                        id: toolCallChunk.id,
                        error: "Malformed args.",
                        type: "invalid_tool_call",
                    });
                }
            }
            initParams = {
                ...fields,
                tool_calls: toolCalls,
                invalid_tool_calls: invalidToolCalls,
                usage_metadata: fields.usage_metadata !== undefined
                    ? fields.usage_metadata
                    : undefined,
            };
        }
        // Sadly, TypeScript only allows super() calls at root if the class has
        // properties with initializers, so we have to check types twice.
        super(initParams);
        // Must redeclare tool call fields since there is no multiple inheritance in JS.
        // These are typed as optional to avoid breaking changes and allow for casting
        // from BaseMessage.
        Object.defineProperty(this, "tool_calls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "invalid_tool_calls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "tool_call_chunks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**
         * If provided, token usage information associated with the message.
         */
        Object.defineProperty(this, "usage_metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tool_call_chunks =
            initParams.tool_call_chunks ?? this.tool_call_chunks;
        this.tool_calls = initParams.tool_calls ?? this.tool_calls;
        this.invalid_tool_calls =
            initParams.invalid_tool_calls ?? this.invalid_tool_calls;
        this.usage_metadata = initParams.usage_metadata;
    }
    get lc_aliases() {
        // exclude snake case conversion to pascal case
        return {
            ...super.lc_aliases,
            tool_calls: "tool_calls",
            invalid_tool_calls: "invalid_tool_calls",
            tool_call_chunks: "tool_call_chunks",
        };
    }
    static lc_name() {
        return "AIMessageChunk";
    }
    _getType() {
        return "ai";
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            tool_calls: this.tool_calls,
            tool_call_chunks: this.tool_call_chunks,
            invalid_tool_calls: this.invalid_tool_calls,
            usage_metadata: this.usage_metadata,
        };
    }
    concat(chunk) {
        const combinedFields = {
            content: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* .mergeContent */ ._I)(this.content, chunk.content),
            additional_kwargs: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.additional_kwargs, chunk.additional_kwargs),
            response_metadata: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.response_metadata, chunk.response_metadata),
            tool_call_chunks: [],
            id: this.id ?? chunk.id,
        };
        if (this.tool_call_chunks !== undefined ||
            chunk.tool_call_chunks !== undefined) {
            const rawToolCalls = (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeLists */ .Vt)(this.tool_call_chunks, chunk.tool_call_chunks);
            if (rawToolCalls !== undefined && rawToolCalls.length > 0) {
                combinedFields.tool_call_chunks = rawToolCalls;
            }
        }
        if (this.usage_metadata !== undefined ||
            chunk.usage_metadata !== undefined) {
            const inputTokenDetails = {
                ...((this.usage_metadata?.input_token_details?.audio !== undefined ||
                    chunk.usage_metadata?.input_token_details?.audio !== undefined) && {
                    audio: (this.usage_metadata?.input_token_details?.audio ?? 0) +
                        (chunk.usage_metadata?.input_token_details?.audio ?? 0),
                }),
                ...((this.usage_metadata?.input_token_details?.cache_read !==
                    undefined ||
                    chunk.usage_metadata?.input_token_details?.cache_read !==
                        undefined) && {
                    cache_read: (this.usage_metadata?.input_token_details?.cache_read ?? 0) +
                        (chunk.usage_metadata?.input_token_details?.cache_read ?? 0),
                }),
                ...((this.usage_metadata?.input_token_details?.cache_creation !==
                    undefined ||
                    chunk.usage_metadata?.input_token_details?.cache_creation !==
                        undefined) && {
                    cache_creation: (this.usage_metadata?.input_token_details?.cache_creation ?? 0) +
                        (chunk.usage_metadata?.input_token_details?.cache_creation ?? 0),
                }),
            };
            const outputTokenDetails = {
                ...((this.usage_metadata?.output_token_details?.audio !== undefined ||
                    chunk.usage_metadata?.output_token_details?.audio !== undefined) && {
                    audio: (this.usage_metadata?.output_token_details?.audio ?? 0) +
                        (chunk.usage_metadata?.output_token_details?.audio ?? 0),
                }),
                ...((this.usage_metadata?.output_token_details?.reasoning !==
                    undefined ||
                    chunk.usage_metadata?.output_token_details?.reasoning !==
                        undefined) && {
                    reasoning: (this.usage_metadata?.output_token_details?.reasoning ?? 0) +
                        (chunk.usage_metadata?.output_token_details?.reasoning ?? 0),
                }),
            };
            const left = this.usage_metadata ?? {
                input_tokens: 0,
                output_tokens: 0,
                total_tokens: 0,
            };
            const right = chunk.usage_metadata ?? {
                input_tokens: 0,
                output_tokens: 0,
                total_tokens: 0,
            };
            const usage_metadata = {
                input_tokens: left.input_tokens + right.input_tokens,
                output_tokens: left.output_tokens + right.output_tokens,
                total_tokens: left.total_tokens + right.total_tokens,
                // Do not include `input_token_details` / `output_token_details` keys in combined fields
                // unless their values are defined.
                ...(Object.keys(inputTokenDetails).length > 0 && {
                    input_token_details: inputTokenDetails,
                }),
                ...(Object.keys(outputTokenDetails).length > 0 && {
                    output_token_details: outputTokenDetails,
                }),
            };
            combinedFields.usage_metadata = usage_metadata;
        }
        return new AIMessageChunk(combinedFields);
    }
}


/***/ }),

/***/ 7512:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DY: () => (/* binding */ pickRunnableConfigKeys),
/* harmony export */   SV: () => (/* binding */ mergeConfigs),
/* harmony export */   ZI: () => (/* binding */ ensureConfig),
/* harmony export */   kJ: () => (/* binding */ getCallbackManagerForConfig),
/* harmony export */   p_: () => (/* binding */ DEFAULT_RECURSION_LIMIT),
/* harmony export */   tn: () => (/* binding */ patchConfig)
/* harmony export */ });
/* harmony import */ var _callbacks_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(662);
/* harmony import */ var _singletons_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8549);


const DEFAULT_RECURSION_LIMIT = 25;
async function getCallbackManagerForConfig(config) {
    return _callbacks_manager_js__WEBPACK_IMPORTED_MODULE_0__/* .CallbackManager */ .Td._configureSync(config?.callbacks, undefined, config?.tags, undefined, config?.metadata);
}
function mergeConfigs(...configs) {
    // We do not want to call ensureConfig on the empty state here as this may cause
    // double loading of callbacks if async local storage is being used.
    const copy = {};
    for (const options of configs.filter((c) => !!c)) {
        for (const key of Object.keys(options)) {
            if (key === "metadata") {
                copy[key] = { ...copy[key], ...options[key] };
            }
            else if (key === "tags") {
                const baseKeys = copy[key] ?? [];
                copy[key] = [...new Set(baseKeys.concat(options[key] ?? []))];
            }
            else if (key === "configurable") {
                copy[key] = { ...copy[key], ...options[key] };
            }
            else if (key === "timeout") {
                if (copy.timeout === undefined) {
                    copy.timeout = options.timeout;
                }
                else if (options.timeout !== undefined) {
                    copy.timeout = Math.min(copy.timeout, options.timeout);
                }
            }
            else if (key === "signal") {
                if (copy.signal === undefined) {
                    copy.signal = options.signal;
                }
                else if (options.signal !== undefined) {
                    if ("any" in AbortSignal) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        copy.signal = AbortSignal.any([
                            copy.signal,
                            options.signal,
                        ]);
                    }
                    else {
                        copy.signal = options.signal;
                    }
                }
            }
            else if (key === "callbacks") {
                const baseCallbacks = copy.callbacks;
                const providedCallbacks = options.callbacks;
                // callbacks can be either undefined, Array<handler> or manager
                // so merging two callbacks values has 6 cases
                if (Array.isArray(providedCallbacks)) {
                    if (!baseCallbacks) {
                        copy.callbacks = providedCallbacks;
                    }
                    else if (Array.isArray(baseCallbacks)) {
                        copy.callbacks = baseCallbacks.concat(providedCallbacks);
                    }
                    else {
                        // baseCallbacks is a manager
                        const manager = baseCallbacks.copy();
                        for (const callback of providedCallbacks) {
                            manager.addHandler((0,_callbacks_manager_js__WEBPACK_IMPORTED_MODULE_0__/* .ensureHandler */ .tW)(callback), true);
                        }
                        copy.callbacks = manager;
                    }
                }
                else if (providedCallbacks) {
                    // providedCallbacks is a manager
                    if (!baseCallbacks) {
                        copy.callbacks = providedCallbacks;
                    }
                    else if (Array.isArray(baseCallbacks)) {
                        const manager = providedCallbacks.copy();
                        for (const callback of baseCallbacks) {
                            manager.addHandler((0,_callbacks_manager_js__WEBPACK_IMPORTED_MODULE_0__/* .ensureHandler */ .tW)(callback), true);
                        }
                        copy.callbacks = manager;
                    }
                    else {
                        // baseCallbacks is also a manager
                        copy.callbacks = new _callbacks_manager_js__WEBPACK_IMPORTED_MODULE_0__/* .CallbackManager */ .Td(providedCallbacks._parentRunId, {
                            handlers: baseCallbacks.handlers.concat(providedCallbacks.handlers),
                            inheritableHandlers: baseCallbacks.inheritableHandlers.concat(providedCallbacks.inheritableHandlers),
                            tags: Array.from(new Set(baseCallbacks.tags.concat(providedCallbacks.tags))),
                            inheritableTags: Array.from(new Set(baseCallbacks.inheritableTags.concat(providedCallbacks.inheritableTags))),
                            metadata: {
                                ...baseCallbacks.metadata,
                                ...providedCallbacks.metadata,
                            },
                        });
                    }
                }
            }
            else {
                const typedKey = key;
                copy[typedKey] = options[typedKey] ?? copy[typedKey];
            }
        }
    }
    return copy;
}
const PRIMITIVES = new Set(["string", "number", "boolean"]);
/**
 * Ensure that a passed config is an object with all required keys present.
 */
function ensureConfig(config) {
    const implicitConfig = _singletons_index_js__WEBPACK_IMPORTED_MODULE_1__/* .AsyncLocalStorageProviderSingleton */ .Nx.getRunnableConfig();
    let empty = {
        tags: [],
        metadata: {},
        recursionLimit: 25,
        runId: undefined,
    };
    if (implicitConfig) {
        // Don't allow runId and runName to be loaded implicitly, as this can cause
        // child runs to improperly inherit their parents' run ids.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { runId, runName, ...rest } = implicitConfig;
        empty = Object.entries(rest).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (currentConfig, [key, value]) => {
            if (value !== undefined) {
                // eslint-disable-next-line no-param-reassign
                currentConfig[key] = value;
            }
            return currentConfig;
        }, empty);
    }
    if (config) {
        empty = Object.entries(config).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (currentConfig, [key, value]) => {
            if (value !== undefined) {
                // eslint-disable-next-line no-param-reassign
                currentConfig[key] = value;
            }
            return currentConfig;
        }, empty);
    }
    if (empty?.configurable) {
        for (const key of Object.keys(empty.configurable)) {
            if (PRIMITIVES.has(typeof empty.configurable[key]) &&
                !empty.metadata?.[key]) {
                if (!empty.metadata) {
                    empty.metadata = {};
                }
                empty.metadata[key] = empty.configurable[key];
            }
        }
    }
    if (empty.timeout !== undefined) {
        if (empty.timeout <= 0) {
            throw new Error("Timeout must be a positive number");
        }
        const timeoutSignal = AbortSignal.timeout(empty.timeout);
        if (empty.signal !== undefined) {
            if ("any" in AbortSignal) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                empty.signal = AbortSignal.any([empty.signal, timeoutSignal]);
            }
        }
        else {
            empty.signal = timeoutSignal;
        }
        delete empty.timeout;
    }
    return empty;
}
/**
 * Helper function that patches runnable configs with updated properties.
 */
function patchConfig(config = {}, { callbacks, maxConcurrency, recursionLimit, runName, configurable, runId, } = {}) {
    const newConfig = ensureConfig(config);
    if (callbacks !== undefined) {
        /**
         * If we're replacing callbacks we need to unset runName
         * since that should apply only to the same run as the original callbacks
         */
        delete newConfig.runName;
        newConfig.callbacks = callbacks;
    }
    if (recursionLimit !== undefined) {
        newConfig.recursionLimit = recursionLimit;
    }
    if (maxConcurrency !== undefined) {
        newConfig.maxConcurrency = maxConcurrency;
    }
    if (runName !== undefined) {
        newConfig.runName = runName;
    }
    if (configurable !== undefined) {
        newConfig.configurable = { ...newConfig.configurable, ...configurable };
    }
    if (runId !== undefined) {
        delete newConfig.runId;
    }
    return newConfig;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickRunnableConfigKeys(config) {
    return config
        ? {
            configurable: config.configurable,
            recursionLimit: config.recursionLimit,
            callbacks: config.callbacks,
            tags: config.tags,
            metadata: config.metadata,
            maxConcurrency: config.maxConcurrency,
            timeout: config.timeout,
            signal: config.signal,
        }
        : undefined;
}


/***/ }),

/***/ 7548:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  gk: () => (/* binding */ RunTree),
  m5: () => (/* binding */ isRunTree)
});

// UNUSED EXPORTS: convertToDottedOrderFormat, isRunnableConfigLike

// EXTERNAL MODULE: ./node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/v4.js + 1 modules
var v4 = __webpack_require__(9883);
// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/env.js
var env = __webpack_require__(5607);
// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/client.js + 6 modules
var client = __webpack_require__(9764);
;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/env.js

const isTracingEnabled = (tracingEnabled) => {
    if (tracingEnabled !== undefined) {
        return tracingEnabled;
    }
    const envVars = ["TRACING_V2", "TRACING"];
    return !!envVars.find((envVar) => (0,env/* getLangSmithEnvironmentVariable */.Jz)(envVar) === "true");
};

// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/warn.js
var warn = __webpack_require__(3526);
;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/singletons/constants.js
const _LC_CONTEXT_VARIABLES_KEY = Symbol.for("lc:context_variables");

;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/run_trees.js






function stripNonAlphanumeric(input) {
    return input.replace(/[-:.]/g, "");
}
function convertToDottedOrderFormat(epoch, runId, executionOrder = 1) {
    // Date only has millisecond precision, so we use the microseconds to break
    // possible ties, avoiding incorrect run order
    const paddedOrder = executionOrder.toFixed(0).slice(0, 3).padStart(3, "0");
    return (stripNonAlphanumeric(`${new Date(epoch).toISOString().slice(0, -1)}${paddedOrder}Z`) + runId);
}
/**
 * Baggage header information
 */
class Baggage {
    constructor(metadata, tags) {
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.metadata = metadata;
        this.tags = tags;
    }
    static fromHeader(value) {
        const items = value.split(",");
        let metadata = {};
        let tags = [];
        for (const item of items) {
            const [key, uriValue] = item.split("=");
            const value = decodeURIComponent(uriValue);
            if (key === "langsmith-metadata") {
                metadata = JSON.parse(value);
            }
            else if (key === "langsmith-tags") {
                tags = value.split(",");
            }
        }
        return new Baggage(metadata, tags);
    }
    toHeader() {
        const items = [];
        if (this.metadata && Object.keys(this.metadata).length > 0) {
            items.push(`langsmith-metadata=${encodeURIComponent(JSON.stringify(this.metadata))}`);
        }
        if (this.tags && this.tags.length > 0) {
            items.push(`langsmith-tags=${encodeURIComponent(this.tags.join(","))}`);
        }
        return items.join(",");
    }
}
class RunTree {
    constructor(originalConfig) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "run_type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "project_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent_run", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "child_runs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "start_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "end_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "extra", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reference_example_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "trace_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dotted_order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tracingEnabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "execution_order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "child_execution_order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Attachments associated with the run.
         * Each entry is a tuple of [mime_type, bytes]
         */
        Object.defineProperty(this, "attachments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // If you pass in a run tree directly, return a shallow clone
        if (isRunTree(originalConfig)) {
            Object.assign(this, { ...originalConfig });
            return;
        }
        const defaultConfig = RunTree.getDefaultConfig();
        const { metadata, ...config } = originalConfig;
        const client = config.client ?? RunTree.getSharedClient();
        const dedupedMetadata = {
            ...metadata,
            ...config?.extra?.metadata,
        };
        config.extra = { ...config.extra, metadata: dedupedMetadata };
        Object.assign(this, { ...defaultConfig, ...config, client });
        if (!this.trace_id) {
            if (this.parent_run) {
                this.trace_id = this.parent_run.trace_id ?? this.id;
            }
            else {
                this.trace_id = this.id;
            }
        }
        this.execution_order ??= 1;
        this.child_execution_order ??= 1;
        if (!this.dotted_order) {
            const currentDottedOrder = convertToDottedOrderFormat(this.start_time, this.id, this.execution_order);
            if (this.parent_run) {
                this.dotted_order =
                    this.parent_run.dotted_order + "." + currentDottedOrder;
            }
            else {
                this.dotted_order = currentDottedOrder;
            }
        }
    }
    static getDefaultConfig() {
        return {
            id: v4/* default */.A(),
            run_type: "chain",
            project_name: (0,env/* getLangSmithEnvironmentVariable */.Jz)("PROJECT") ??
                (0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_SESSION") ?? // TODO: Deprecate
                "default",
            child_runs: [],
            api_url: (0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_ENDPOINT") ?? "http://localhost:1984",
            api_key: (0,env/* getEnvironmentVariable */.Az)("LANGCHAIN_API_KEY"),
            caller_options: {},
            start_time: Date.now(),
            serialized: {},
            inputs: {},
            extra: {},
        };
    }
    static getSharedClient() {
        if (!RunTree.sharedClient) {
            RunTree.sharedClient = new client/* Client */.Kj();
        }
        return RunTree.sharedClient;
    }
    createChild(config) {
        const child_execution_order = this.child_execution_order + 1;
        const child = new RunTree({
            ...config,
            parent_run: this,
            project_name: this.project_name,
            client: this.client,
            tracingEnabled: this.tracingEnabled,
            execution_order: child_execution_order,
            child_execution_order: child_execution_order,
        });
        // Copy context vars over into the new run tree.
        if (_LC_CONTEXT_VARIABLES_KEY in this) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            child[_LC_CONTEXT_VARIABLES_KEY] =
                this[_LC_CONTEXT_VARIABLES_KEY];
        }
        const LC_CHILD = Symbol.for("lc:child_config");
        const presentConfig = config.extra?.[LC_CHILD] ??
            this.extra[LC_CHILD];
        // tracing for LangChain is defined by the _parentRunId and runMap of the tracer
        if (isRunnableConfigLike(presentConfig)) {
            const newConfig = { ...presentConfig };
            const callbacks = isCallbackManagerLike(newConfig.callbacks)
                ? newConfig.callbacks.copy?.()
                : undefined;
            if (callbacks) {
                // update the parent run id
                Object.assign(callbacks, { _parentRunId: child.id });
                // only populate if we're in a newer LC.JS version
                callbacks.handlers
                    ?.find(isLangChainTracerLike)
                    ?.updateFromRunTree?.(child);
                newConfig.callbacks = callbacks;
            }
            child.extra[LC_CHILD] = newConfig;
        }
        // propagate child_execution_order upwards
        const visited = new Set();
        let current = this;
        while (current != null && !visited.has(current.id)) {
            visited.add(current.id);
            current.child_execution_order = Math.max(current.child_execution_order, child_execution_order);
            current = current.parent_run;
        }
        this.child_runs.push(child);
        return child;
    }
    async end(outputs, error, endTime = Date.now(), metadata) {
        this.outputs = this.outputs ?? outputs;
        this.error = this.error ?? error;
        this.end_time = this.end_time ?? endTime;
        if (metadata && Object.keys(metadata).length > 0) {
            this.extra = this.extra
                ? { ...this.extra, metadata: { ...this.extra.metadata, ...metadata } }
                : { metadata };
        }
    }
    _convertToCreate(run, runtimeEnv, excludeChildRuns = true) {
        const runExtra = run.extra ?? {};
        if (!runExtra.runtime) {
            runExtra.runtime = {};
        }
        if (runtimeEnv) {
            for (const [k, v] of Object.entries(runtimeEnv)) {
                if (!runExtra.runtime[k]) {
                    runExtra.runtime[k] = v;
                }
            }
        }
        let child_runs;
        let parent_run_id;
        if (!excludeChildRuns) {
            child_runs = run.child_runs.map((child_run) => this._convertToCreate(child_run, runtimeEnv, excludeChildRuns));
            parent_run_id = undefined;
        }
        else {
            parent_run_id = run.parent_run?.id;
            child_runs = [];
        }
        const persistedRun = {
            id: run.id,
            name: run.name,
            start_time: run.start_time,
            end_time: run.end_time,
            run_type: run.run_type,
            reference_example_id: run.reference_example_id,
            extra: runExtra,
            serialized: run.serialized,
            error: run.error,
            inputs: run.inputs,
            outputs: run.outputs,
            session_name: run.project_name,
            child_runs: child_runs,
            parent_run_id: parent_run_id,
            trace_id: run.trace_id,
            dotted_order: run.dotted_order,
            tags: run.tags,
            attachments: run.attachments,
        };
        return persistedRun;
    }
    async postRun(excludeChildRuns = true) {
        try {
            const runtimeEnv = (0,env/* getRuntimeEnvironment */.Ec)();
            const runCreate = await this._convertToCreate(this, runtimeEnv, true);
            await this.client.createRun(runCreate);
            if (!excludeChildRuns) {
                (0,warn/* warnOnce */.m)("Posting with excludeChildRuns=false is deprecated and will be removed in a future version.");
                for (const childRun of this.child_runs) {
                    await childRun.postRun(false);
                }
            }
        }
        catch (error) {
            console.error(`Error in postRun for run ${this.id}:`, error);
        }
    }
    async patchRun() {
        try {
            const runUpdate = {
                end_time: this.end_time,
                error: this.error,
                inputs: this.inputs,
                outputs: this.outputs,
                parent_run_id: this.parent_run?.id,
                reference_example_id: this.reference_example_id,
                extra: this.extra,
                events: this.events,
                dotted_order: this.dotted_order,
                trace_id: this.trace_id,
                tags: this.tags,
                attachments: this.attachments,
            };
            await this.client.updateRun(this.id, runUpdate);
        }
        catch (error) {
            console.error(`Error in patchRun for run ${this.id}`, error);
        }
    }
    toJSON() {
        return this._convertToCreate(this, undefined, false);
    }
    /**
     * Add an event to the run tree.
     * @param event - A single event or string to add
     */
    addEvent(event) {
        if (!this.events) {
            this.events = [];
        }
        if (typeof event === "string") {
            this.events.push({
                name: "event",
                time: new Date().toISOString(),
                message: event,
            });
        }
        else {
            this.events.push({
                ...event,
                time: event.time ?? new Date().toISOString(),
            });
        }
    }
    static fromRunnableConfig(parentConfig, props) {
        // We only handle the callback manager case for now
        const callbackManager = parentConfig?.callbacks;
        let parentRun;
        let projectName;
        let client;
        let tracingEnabled = isTracingEnabled();
        if (callbackManager) {
            const parentRunId = callbackManager?.getParentRunId?.() ?? "";
            const langChainTracer = callbackManager?.handlers?.find((handler) => handler?.name == "langchain_tracer");
            parentRun = langChainTracer?.getRun?.(parentRunId);
            projectName = langChainTracer?.projectName;
            client = langChainTracer?.client;
            tracingEnabled = tracingEnabled || !!langChainTracer;
        }
        if (!parentRun) {
            return new RunTree({
                ...props,
                client,
                tracingEnabled,
                project_name: projectName,
            });
        }
        const parentRunTree = new RunTree({
            name: parentRun.name,
            id: parentRun.id,
            trace_id: parentRun.trace_id,
            dotted_order: parentRun.dotted_order,
            client,
            tracingEnabled,
            project_name: projectName,
            tags: [
                ...new Set((parentRun?.tags ?? []).concat(parentConfig?.tags ?? [])),
            ],
            extra: {
                metadata: {
                    ...parentRun?.extra?.metadata,
                    ...parentConfig?.metadata,
                },
            },
        });
        return parentRunTree.createChild(props);
    }
    static fromDottedOrder(dottedOrder) {
        return this.fromHeaders({ "langsmith-trace": dottedOrder });
    }
    static fromHeaders(headers, inheritArgs) {
        const rawHeaders = "get" in headers && typeof headers.get === "function"
            ? {
                "langsmith-trace": headers.get("langsmith-trace"),
                baggage: headers.get("baggage"),
            }
            : headers;
        const headerTrace = rawHeaders["langsmith-trace"];
        if (!headerTrace || typeof headerTrace !== "string")
            return undefined;
        const parentDottedOrder = headerTrace.trim();
        const parsedDottedOrder = parentDottedOrder.split(".").map((part) => {
            const [strTime, uuid] = part.split("Z");
            return { strTime, time: Date.parse(strTime + "Z"), uuid };
        });
        const traceId = parsedDottedOrder[0].uuid;
        const config = {
            ...inheritArgs,
            name: inheritArgs?.["name"] ?? "parent",
            run_type: inheritArgs?.["run_type"] ?? "chain",
            start_time: inheritArgs?.["start_time"] ?? Date.now(),
            id: parsedDottedOrder.at(-1)?.uuid,
            trace_id: traceId,
            dotted_order: parentDottedOrder,
        };
        if (rawHeaders["baggage"] && typeof rawHeaders["baggage"] === "string") {
            const baggage = Baggage.fromHeader(rawHeaders["baggage"]);
            config.metadata = baggage.metadata;
            config.tags = baggage.tags;
        }
        return new RunTree(config);
    }
    toHeaders(headers) {
        const result = {
            "langsmith-trace": this.dotted_order,
            baggage: new Baggage(this.extra?.metadata, this.tags).toHeader(),
        };
        if (headers) {
            for (const [key, value] of Object.entries(result)) {
                headers.set(key, value);
            }
        }
        return result;
    }
}
Object.defineProperty(RunTree, "sharedClient", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: null
});
function isRunTree(x) {
    return (x !== undefined &&
        typeof x.createChild === "function" &&
        typeof x.postRun === "function");
}
function isLangChainTracerLike(x) {
    return (typeof x === "object" &&
        x != null &&
        typeof x.name === "string" &&
        x.name === "langchain_tracer");
}
function containsLangChainTracerLike(x) {
    return (Array.isArray(x) && x.some((callback) => isLangChainTracerLike(callback)));
}
function isCallbackManagerLike(x) {
    return (typeof x === "object" &&
        x != null &&
        Array.isArray(x.handlers));
}
function isRunnableConfigLike(x) {
    // Check that it's an object with a callbacks arg
    // that has either a CallbackManagerLike object with a langchain tracer within it
    // or an array with a LangChainTracerLike object within it
    return (x !== undefined &&
        typeof x.callbacks === "object" &&
        // Callback manager with a langchain tracer
        (containsLangChainTracerLike(x.callbacks?.handlers) ||
            // Or it's an array with a LangChainTracerLike object within it
            containsLangChainTracerLike(x.callbacks)));
}


/***/ }),

/***/ 7977:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tn: () => (/* binding */ SystemMessage),
/* harmony export */   uU: () => (/* binding */ SystemMessageChunk)
/* harmony export */ });
/* unused harmony exports isSystemMessage, isSystemMessageChunk */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);

/**
 * Represents a system message in a conversation.
 */
class SystemMessage extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ {
    static lc_name() {
        return "SystemMessage";
    }
    _getType() {
        return "system";
    }
}
/**
 * Represents a chunk of a system message, which can be concatenated with
 * other system message chunks.
 */
class SystemMessageChunk extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessageChunk */ .gj {
    static lc_name() {
        return "SystemMessageChunk";
    }
    _getType() {
        return "system";
    }
    concat(chunk) {
        return new SystemMessageChunk({
            content: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* .mergeContent */ ._I)(this.content, chunk.content),
            additional_kwargs: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.additional_kwargs, chunk.additional_kwargs),
            response_metadata: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.response_metadata, chunk.response_metadata),
            id: this.id ?? chunk.id,
        });
    }
}
function isSystemMessage(x) {
    return x._getType() === "system";
}
function isSystemMessageChunk(x) {
    return x._getType() === "system";
}


/***/ }),

/***/ 8169:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kj: () => (/* reexport safe */ _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Kj),
/* harmony export */   gk: () => (/* reexport safe */ _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.gk)
/* harmony export */ });
/* harmony import */ var _dist_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8946);


/***/ }),

/***/ 8549:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Nx: () => (/* reexport */ AsyncLocalStorageProviderSingleton)
});

// UNUSED EXPORTS: MockAsyncLocalStorage, _CONTEXT_VARIABLES_KEY

// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/index.js
var langsmith = __webpack_require__(8169);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/async_local_storage/globals.js
var globals = __webpack_require__(3101);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/callbacks/manager.js + 8 modules
var manager = __webpack_require__(662);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/async_local_storage/index.js
/* eslint-disable @typescript-eslint/no-explicit-any */



class MockAsyncLocalStorage {
    getStore() {
        return undefined;
    }
    run(_store, callback) {
        return callback();
    }
    enterWith(_store) {
        return undefined;
    }
}
const mockAsyncLocalStorage = new MockAsyncLocalStorage();
const LC_CHILD_KEY = Symbol.for("lc:child_config");
class AsyncLocalStorageProvider {
    getInstance() {
        return (0,globals/* getGlobalAsyncLocalStorageInstance */.X0)() ?? mockAsyncLocalStorage;
    }
    getRunnableConfig() {
        const storage = this.getInstance();
        // this has the runnable config
        // which means that we should also have an instance of a LangChainTracer
        // with the run map prepopulated
        return storage.getStore()?.extra?.[LC_CHILD_KEY];
    }
    runWithConfig(config, callback, avoidCreatingRootRunTree) {
        const callbackManager = manager/* CallbackManager */.Td._configureSync(config?.callbacks, undefined, config?.tags, undefined, config?.metadata);
        const storage = this.getInstance();
        const previousValue = storage.getStore();
        const parentRunId = callbackManager?.getParentRunId();
        const langChainTracer = callbackManager?.handlers?.find((handler) => handler?.name === "langchain_tracer");
        let runTree;
        if (langChainTracer && parentRunId) {
            runTree = langChainTracer.convertToRunTree(parentRunId);
        }
        else if (!avoidCreatingRootRunTree) {
            runTree = new langsmith/* RunTree */.gk({
                name: "<runnable_lambda>",
                tracingEnabled: false,
            });
        }
        if (runTree) {
            runTree.extra = { ...runTree.extra, [LC_CHILD_KEY]: config };
        }
        if (previousValue !== undefined &&
            previousValue[globals/* _CONTEXT_VARIABLES_KEY */.hr] !== undefined) {
            if (runTree === undefined) {
                runTree = {};
            }
            runTree[globals/* _CONTEXT_VARIABLES_KEY */.hr] =
                previousValue[globals/* _CONTEXT_VARIABLES_KEY */.hr];
        }
        return storage.run(runTree, callback);
    }
    initializeGlobalInstance(instance) {
        if ((0,globals/* getGlobalAsyncLocalStorageInstance */.X0)() === undefined) {
            (0,globals/* setGlobalAsyncLocalStorageInstance */.pH)(instance);
        }
    }
}
const AsyncLocalStorageProviderSingleton = new AsyncLocalStorageProvider();


;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/singletons/index.js






/***/ }),

/***/ 8804:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HY: () => (/* binding */ StringPromptValue),
/* harmony export */   aB: () => (/* binding */ ChatPromptValue),
/* harmony export */   vX: () => (/* binding */ ImagePromptValue)
/* harmony export */ });
/* unused harmony export BasePromptValue */
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5374);
/* harmony import */ var _messages_human_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6179);
/* harmony import */ var _messages_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2943);



/**
 * Base PromptValue class. All prompt values should extend this class.
 */
class BasePromptValue extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .y {
}
/**
 * Represents a prompt value as a string. It extends the BasePromptValue
 * class and overrides the toString and toChatMessages methods.
 */
class StringPromptValue extends BasePromptValue {
    static lc_name() {
        return "StringPromptValue";
    }
    constructor(value) {
        super({ value });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompt_values"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.value = value;
    }
    toString() {
        return this.value;
    }
    toChatMessages() {
        return [new _messages_human_js__WEBPACK_IMPORTED_MODULE_1__/* .HumanMessage */ .xc(this.value)];
    }
}
/**
 * Class that represents a chat prompt value. It extends the
 * BasePromptValue and includes an array of BaseMessage instances.
 */
class ChatPromptValue extends BasePromptValue {
    static lc_name() {
        return "ChatPromptValue";
    }
    constructor(fields) {
        if (Array.isArray(fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = { messages: fields };
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompt_values"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.messages = fields.messages;
    }
    toString() {
        return (0,_messages_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBufferString */ .Sw)(this.messages);
    }
    toChatMessages() {
        return this.messages;
    }
}
/**
 * Class that represents an image prompt value. It extends the
 * BasePromptValue and includes an ImageURL instance.
 */
class ImagePromptValue extends BasePromptValue {
    static lc_name() {
        return "ImagePromptValue";
    }
    constructor(fields) {
        if (!("imageUrl" in fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = { imageUrl: fields };
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompt_values"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "imageUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** @ignore */
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.imageUrl = fields.imageUrl;
    }
    toString() {
        return this.imageUrl.url;
    }
    toChatMessages() {
        return [
            new _messages_human_js__WEBPACK_IMPORTED_MODULE_1__/* .HumanMessage */ .xc({
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            detail: this.imageUrl.detail,
                            url: this.imageUrl.url,
                        },
                    },
                ],
            }),
        ];
    }
}


/***/ }),

/***/ 8843:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DS: () => (/* binding */ pipeGeneratorWithSetup),
/* harmony export */   Tr: () => (/* binding */ AsyncGeneratorWithSetup),
/* harmony export */   bO: () => (/* binding */ IterableReadableStream),
/* harmony export */   gI: () => (/* binding */ atee),
/* harmony export */   xW: () => (/* binding */ concat)
/* harmony export */ });
/* harmony import */ var _runnables_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7512);
/* harmony import */ var _singletons_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8549);
/* harmony import */ var _signal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8887);



/*
 * Support async iterator syntax for ReadableStreams in all environments.
 * Source: https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */
class IterableReadableStream extends ReadableStream {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "reader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    ensureReader() {
        if (!this.reader) {
            this.reader = this.getReader();
        }
    }
    async next() {
        this.ensureReader();
        try {
            const result = await this.reader.read();
            if (result.done) {
                this.reader.releaseLock(); // release lock when stream becomes closed
                return {
                    done: true,
                    value: undefined,
                };
            }
            else {
                return {
                    done: false,
                    value: result.value,
                };
            }
        }
        catch (e) {
            this.reader.releaseLock(); // release lock when stream becomes errored
            throw e;
        }
    }
    async return() {
        this.ensureReader();
        // If wrapped in a Node stream, cancel is already called.
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        return { done: true, value: undefined };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async throw(e) {
        this.ensureReader();
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        throw e;
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Not present in Node 18 types, required in latest Node 22
    async [Symbol.asyncDispose]() {
        await this.return();
    }
    static fromReadableStream(stream) {
        // From https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
        const reader = stream.getReader();
        return new IterableReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            },
            cancel() {
                reader.releaseLock();
            },
        });
    }
    static fromAsyncGenerator(generator) {
        return new IterableReadableStream({
            async pull(controller) {
                const { value, done } = await generator.next();
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                }
                // Fix: `else if (value)` will hang the streaming when nullish value (e.g. empty string) is pulled
                controller.enqueue(value);
            },
            async cancel(reason) {
                await generator.return(reason);
            },
        });
    }
}
function atee(iter, length = 2) {
    const buffers = Array.from({ length }, () => []);
    return buffers.map(async function* makeIter(buffer) {
        while (true) {
            if (buffer.length === 0) {
                const result = await iter.next();
                for (const buffer of buffers) {
                    buffer.push(result);
                }
            }
            else if (buffer[0].done) {
                return;
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                yield buffer.shift().value;
            }
        }
    });
}
function concat(first, second) {
    if (Array.isArray(first) && Array.isArray(second)) {
        return first.concat(second);
    }
    else if (typeof first === "string" && typeof second === "string") {
        return (first + second);
    }
    else if (typeof first === "number" && typeof second === "number") {
        return (first + second);
    }
    else if (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "concat" in first &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof first.concat === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return first.concat(second);
    }
    else if (typeof first === "object" && typeof second === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chunk = { ...first };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const [key, value] of Object.entries(second)) {
            if (key in chunk && !Array.isArray(chunk[key])) {
                chunk[key] = concat(chunk[key], value);
            }
            else {
                chunk[key] = value;
            }
        }
        return chunk;
    }
    else {
        throw new Error(`Cannot concat ${typeof first} and ${typeof second}`);
    }
}
class AsyncGeneratorWithSetup {
    constructor(params) {
        Object.defineProperty(this, "generator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "setup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "signal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "firstResult", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "firstResultUsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.generator = params.generator;
        this.config = params.config;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.signal = params.signal ?? this.config?.signal;
        // setup is a promise that resolves only after the first iterator value
        // is available. this is useful when setup of several piped generators
        // needs to happen in logical order, ie. in the order in which input to
        // to each generator is available.
        this.setup = new Promise((resolve, reject) => {
            void _singletons_index_js__WEBPACK_IMPORTED_MODULE_1__/* .AsyncLocalStorageProviderSingleton */ .Nx.runWithConfig((0,_runnables_config_js__WEBPACK_IMPORTED_MODULE_0__/* .pickRunnableConfigKeys */ .DY)(params.config), async () => {
                this.firstResult = params.generator.next();
                if (params.startSetup) {
                    this.firstResult.then(params.startSetup).then(resolve, reject);
                }
                else {
                    this.firstResult.then((_result) => resolve(undefined), reject);
                }
            }, true);
        });
    }
    async next(...args) {
        this.signal?.throwIfAborted();
        if (!this.firstResultUsed) {
            this.firstResultUsed = true;
            return this.firstResult;
        }
        return _singletons_index_js__WEBPACK_IMPORTED_MODULE_1__/* .AsyncLocalStorageProviderSingleton */ .Nx.runWithConfig((0,_runnables_config_js__WEBPACK_IMPORTED_MODULE_0__/* .pickRunnableConfigKeys */ .DY)(this.config), this.signal
            ? async () => {
                return (0,_signal_js__WEBPACK_IMPORTED_MODULE_2__/* .raceWithSignal */ .o)(this.generator.next(...args), this.signal);
            }
            : async () => {
                return this.generator.next(...args);
            }, true);
    }
    async return(value) {
        return this.generator.return(value);
    }
    async throw(e) {
        return this.generator.throw(e);
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Not present in Node 18 types, required in latest Node 22
    async [Symbol.asyncDispose]() {
        await this.return();
    }
}
async function pipeGeneratorWithSetup(to, generator, startSetup, signal, ...args) {
    const gen = new AsyncGeneratorWithSetup({
        generator,
        startSetup,
        signal,
    });
    const setup = await gen.setup;
    return { output: to(gen, setup, ...args), setup };
}


/***/ }),

/***/ 8887:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ raceWithSignal)
/* harmony export */ });
async function raceWithSignal(promise, signal) {
    if (signal === undefined) {
        return promise;
    }
    let listener;
    return Promise.race([
        promise.catch((err) => {
            if (!signal?.aborted) {
                throw err;
            }
            else {
                return undefined;
            }
        }),
        new Promise((_, reject) => {
            listener = () => {
                reject(new Error("Aborted"));
            };
            signal.addEventListener("abort", listener);
            // Must be here inside the promise to avoid a race condition
            if (signal.aborted) {
                reject(new Error("Aborted"));
            }
        }),
    ]).finally(() => signal.removeEventListener("abort", listener));
}


/***/ }),

/***/ 8946:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kj: () => (/* reexport safe */ _client_js__WEBPACK_IMPORTED_MODULE_0__.Kj),
/* harmony export */   Ls: () => (/* binding */ __version__),
/* harmony export */   gk: () => (/* reexport safe */ _run_trees_js__WEBPACK_IMPORTED_MODULE_1__.gk)
/* harmony export */ });
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9764);
/* harmony import */ var _run_trees_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7548);
/* harmony import */ var _singletons_fetch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);



// Update using yarn bump-version
const __version__ = "0.3.14";


/***/ }),

/***/ 9498:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XU: () => (/* binding */ ChatMessageChunk),
/* harmony export */   cM: () => (/* binding */ ChatMessage)
/* harmony export */ });
/* unused harmony exports isChatMessage, isChatMessageChunk */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);

/**
 * Represents a chat message in a conversation.
 */
class ChatMessage extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ {
    static lc_name() {
        return "ChatMessage";
    }
    static _chatMessageClass() {
        return ChatMessage;
    }
    constructor(fields, role) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, role: role };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    static isInstance(message) {
        return message._getType() === "generic";
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            role: this.role,
        };
    }
}
/**
 * Represents a chunk of a chat message, which can be concatenated with
 * other chat message chunks.
 */
class ChatMessageChunk extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessageChunk */ .gj {
    static lc_name() {
        return "ChatMessageChunk";
    }
    constructor(fields, role) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, role: role };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    concat(chunk) {
        return new ChatMessageChunk({
            content: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* .mergeContent */ ._I)(this.content, chunk.content),
            additional_kwargs: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.additional_kwargs, chunk.additional_kwargs),
            response_metadata: (0,_base_js__WEBPACK_IMPORTED_MODULE_0__/* ._mergeDicts */ .ns)(this.response_metadata, chunk.response_metadata),
            role: this.role,
            id: this.id ?? chunk.id,
        });
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            role: this.role,
        };
    }
}
function isChatMessage(x) {
    return x._getType() === "generic";
}
function isChatMessageChunk(x) {
    return x._getType() === "generic";
}


/***/ }),

/***/ 9764:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Kj: () => (/* binding */ Client)
});

// UNUSED EXPORTS: AutoBatchQueue, DEFAULT_BATCH_SIZE_LIMIT_BYTES, mergeRuntimeEnvIntoRunCreate

// EXTERNAL MODULE: ./node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/v4.js + 1 modules
var v4 = __webpack_require__(9883);
// EXTERNAL MODULE: ./node_modules/.pnpm/p-retry@4.6.2/node_modules/p-retry/index.js
var p_retry = __webpack_require__(7091);
// EXTERNAL MODULE: ./node_modules/.pnpm/p-queue@6.6.2/node_modules/p-queue/dist/index.js
var dist = __webpack_require__(4896);
// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/singletons/fetch.js
var fetch = __webpack_require__(6689);
;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/async_caller.js



const STATUS_NO_RETRY = [
    400, // Bad Request
    401, // Unauthorized
    403, // Forbidden
    404, // Not Found
    405, // Method Not Allowed
    406, // Not Acceptable
    407, // Proxy Authentication Required
    408, // Request Timeout
];
const STATUS_IGNORE = [
    409, // Conflict
];
/**
 * A class that can be used to make async calls with concurrency and retry logic.
 *
 * This is useful for making calls to any kind of "expensive" external resource,
 * be it because it's rate-limited, subject to network issues, etc.
 *
 * Concurrent calls are limited by the `maxConcurrency` parameter, which defaults
 * to `Infinity`. This means that by default, all calls will be made in parallel.
 *
 * Retries are limited by the `maxRetries` parameter, which defaults to 6. This
 * means that by default, each call will be retried up to 6 times, with an
 * exponential backoff between each attempt.
 */
class AsyncCaller {
    constructor(params) {
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFailedResponseHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 6;
        if ( true) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new dist["default"]({
                concurrency: this.maxConcurrency,
            });
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new dist({ concurrency: this.maxConcurrency });
        }
        this.onFailedResponseHook = params?.onFailedResponseHook;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        const onFailedResponseHook = this.onFailedResponseHook;
        return this.queue.add(() => p_retry(() => callable(...args).catch((error) => {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (error instanceof Error) {
                throw error;
            }
            else {
                throw new Error(error);
            }
        }), {
            async onFailedAttempt(error) {
                if (error.message.startsWith("Cancel") ||
                    error.message.startsWith("TimeoutError") ||
                    error.message.startsWith("AbortError")) {
                    throw error;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (error?.code === "ECONNABORTED") {
                    throw error;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const response = error?.response;
                const status = response?.status;
                if (status) {
                    if (STATUS_NO_RETRY.includes(+status)) {
                        throw error;
                    }
                    else if (STATUS_IGNORE.includes(+status)) {
                        return;
                    }
                    if (onFailedResponseHook) {
                        await onFailedResponseHook(response);
                    }
                }
            },
            // If needed we can change some of the defaults here,
            // but they're quite sensible.
            retries: this.maxRetries,
            randomize: true,
        }), { throwOnTimeout: true });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) {
            return Promise.race([
                this.call(callable, ...args),
                new Promise((_, reject) => {
                    options.signal?.addEventListener("abort", () => {
                        reject(new Error("AbortError"));
                    });
                }),
            ]);
        }
        return this.call(callable, ...args);
    }
    fetch(...args) {
        return this.call(() => (0,fetch/* _getFetchImplementation */.Y)()(...args).then((res) => res.ok ? res : Promise.reject(res)));
    }
}

;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/messages.js
function isLangChainMessage(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
message) {
    return typeof message?._getType === "function";
}
function convertLangChainMessageToExample(message) {
    const converted = {
        type: message._getType(),
        data: { content: message.content },
    };
    // Check for presence of keys in additional_kwargs
    if (message?.additional_kwargs &&
        Object.keys(message.additional_kwargs).length > 0) {
        converted.data.additional_kwargs = { ...message.additional_kwargs };
    }
    return converted;
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/env.js
var env = __webpack_require__(5607);
// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/index.js
var langsmith_dist = __webpack_require__(8946);
// EXTERNAL MODULE: ./node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/validate.js + 1 modules
var validate = __webpack_require__(6797);
;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/_uuid.js

function assertUuid(str, which) {
    if (!validate/* default */.A(str)) {
        const msg = which !== undefined
            ? `Invalid UUID for ${which}: ${str}`
            : `Invalid UUID: ${str}`;
        throw new Error(msg);
    }
    return str;
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/warn.js
var warn = __webpack_require__(3526);
// EXTERNAL MODULE: ./node_modules/.pnpm/semver@7.7.1/node_modules/semver/index.js
var semver = __webpack_require__(6322);
;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/prompts.js

function isVersionGreaterOrEqual(current_version, target_version) {
    const current = parseVersion(current_version);
    const target = parseVersion(target_version);
    if (!current || !target) {
        throw new Error("Invalid version format.");
    }
    return current.compare(target) >= 0;
}
function parsePromptIdentifier(identifier) {
    if (!identifier ||
        identifier.split("/").length > 2 ||
        identifier.startsWith("/") ||
        identifier.endsWith("/") ||
        identifier.split(":").length > 2) {
        throw new Error(`Invalid identifier format: ${identifier}`);
    }
    const [ownerNamePart, commitPart] = identifier.split(":");
    const commit = commitPart || "latest";
    if (ownerNamePart.includes("/")) {
        const [owner, name] = ownerNamePart.split("/", 2);
        if (!owner || !name) {
            throw new Error(`Invalid identifier format: ${identifier}`);
        }
        return [owner, name, commit];
    }
    else {
        if (!ownerNamePart) {
            throw new Error(`Invalid identifier format: ${identifier}`);
        }
        return ["-", ownerNamePart, commit];
    }
}

;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/error.js
function getErrorStackTrace(e) {
    if (typeof e !== "object" || e == null)
        return undefined;
    if (!("stack" in e) || typeof e.stack !== "string")
        return undefined;
    let stack = e.stack;
    const prevLine = `${e}`;
    if (stack.startsWith(prevLine)) {
        stack = stack.slice(prevLine.length);
    }
    if (stack.startsWith("\n")) {
        stack = stack.slice(1);
    }
    return stack;
}
function printErrorStackTrace(e) {
    const stack = getErrorStackTrace(e);
    if (stack == null)
        return;
    console.error(stack);
}
/**
 * LangSmithConflictError
 *
 * Represents an error that occurs when there's a conflict during an operation,
 * typically corresponding to HTTP 409 status code responses.
 *
 * This error is thrown when an attempt to create or modify a resource conflicts
 * with the current state of the resource on the server. Common scenarios include:
 * - Attempting to create a resource that already exists
 * - Trying to update a resource that has been modified by another process
 * - Violating a uniqueness constraint in the data
 *
 * @extends Error
 *
 * @example
 * try {
 *   await createProject("existingProject");
 * } catch (error) {
 *   if (error instanceof ConflictError) {
 *     console.log("A conflict occurred:", error.message);
 *     // Handle the conflict, e.g., by suggesting a different project name
 *   } else {
 *     // Handle other types of errors
 *   }
 * }
 *
 * @property {string} name - Always set to 'ConflictError' for easy identification
 * @property {string} message - Detailed error message including server response
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
 */
class LangSmithConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "LangSmithConflictError";
    }
}
/**
 * Throws an appropriate error based on the response status and body.
 *
 * @param response - The fetch Response object
 * @param context - Additional context to include in the error message (e.g., operation being performed)
 * @throws {LangSmithConflictError} When the response status is 409
 * @throws {Error} For all other non-ok responses
 */
async function raiseForStatus(response, context, consume) {
    // consume the response body to release the connection
    // https://undici.nodejs.org/#/?id=garbage-collection
    let errorBody;
    if (response.ok) {
        if (consume) {
            errorBody = await response.text();
        }
        return;
    }
    errorBody = await response.text();
    const fullMessage = `Failed to ${context}. Received status [${response.status}]: ${response.statusText}. Server response: ${errorBody}`;
    if (response.status === 409) {
        throw new LangSmithConflictError(fullMessage);
    }
    throw new Error(fullMessage);
}

;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/utils/fast-safe-stringify/index.js
/* eslint-disable */
// @ts-nocheck
var LIMIT_REPLACE_NODE = "[...]";
var CIRCULAR_REPLACE_NODE = { result: "[Circular]" };
var arr = [];
var replacerStack = [];
const encoder = new TextEncoder();
function defaultOptions() {
    return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER,
    };
}
function encodeString(str) {
    return encoder.encode(str);
}
// Regular stringify
function serialize(obj, replacer, spacer, options) {
    try {
        const str = JSON.stringify(obj, replacer, spacer);
        return encodeString(str);
    }
    catch (e) {
        // Fall back to more complex stringify if circular reference
        if (!e.message?.includes("Converting circular structure to JSON")) {
            console.warn("[WARNING]: LangSmith received unserializable value.");
            return encodeString("[Unserializable]");
        }
        console.warn("[WARNING]: LangSmith received circular JSON. This will decrease tracer performance.");
        if (typeof options === "undefined") {
            options = defaultOptions();
        }
        decirc(obj, "", 0, [], undefined, 0, options);
        let res;
        try {
            if (replacerStack.length === 0) {
                res = JSON.stringify(obj, replacer, spacer);
            }
            else {
                res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
            }
        }
        catch (_) {
            return encodeString("[unable to serialize, circular reference is too complex to analyze]");
        }
        finally {
            while (arr.length !== 0) {
                const part = arr.pop();
                if (part.length === 4) {
                    Object.defineProperty(part[0], part[1], part[3]);
                }
                else {
                    part[0][part[1]] = part[2];
                }
            }
        }
        return encodeString(res);
    }
}
function setReplace(replace, val, k, parent) {
    var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
    if (propertyDescriptor.get !== undefined) {
        if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: replace });
            arr.push([parent, k, val, propertyDescriptor]);
        }
        else {
            replacerStack.push([val, k, replace]);
        }
    }
    else {
        parent[k] = replace;
        arr.push([parent, k, val]);
    }
}
function decirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
            if (stack[i] === val) {
                setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
                return;
            }
        }
        if (typeof options.depthLimit !== "undefined" &&
            depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== "undefined" &&
            edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) {
            for (i = 0; i < val.length; i++) {
                decirc(val[i], i, i, stack, val, depth, options);
            }
        }
        else {
            var keys = Object.keys(val);
            for (i = 0; i < keys.length; i++) {
                var key = keys[i];
                decirc(val[key], key, i, stack, val, depth, options);
            }
        }
        stack.pop();
    }
}
// Stable-stringify
function compareFunction(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
function deterministicStringify(obj, replacer, spacer, options) {
    if (typeof options === "undefined") {
        options = defaultOptions();
    }
    var tmp = deterministicDecirc(obj, "", 0, [], undefined, 0, options) || obj;
    var res;
    try {
        if (replacerStack.length === 0) {
            res = JSON.stringify(tmp, replacer, spacer);
        }
        else {
            res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
        }
    }
    catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
    }
    finally {
        // Ensure that we restore the object as it was.
        while (arr.length !== 0) {
            var part = arr.pop();
            if (part.length === 4) {
                Object.defineProperty(part[0], part[1], part[3]);
            }
            else {
                part[0][part[1]] = part[2];
            }
        }
    }
    return res;
}
function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
            if (stack[i] === val) {
                setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
                return;
            }
        }
        try {
            if (typeof val.toJSON === "function") {
                return;
            }
        }
        catch (_) {
            return;
        }
        if (typeof options.depthLimit !== "undefined" &&
            depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== "undefined" &&
            edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) {
            for (i = 0; i < val.length; i++) {
                deterministicDecirc(val[i], i, i, stack, val, depth, options);
            }
        }
        else {
            // Create a temporary object in the required way
            var tmp = {};
            var keys = Object.keys(val).sort(compareFunction);
            for (i = 0; i < keys.length; i++) {
                var key = keys[i];
                deterministicDecirc(val[key], key, i, stack, val, depth, options);
                tmp[key] = val[key];
            }
            if (typeof parent !== "undefined") {
                arr.push([parent, k, val]);
                parent[k] = tmp;
            }
            else {
                return tmp;
            }
        }
        stack.pop();
    }
}
// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues(replacer) {
    replacer =
        typeof replacer !== "undefined"
            ? replacer
            : function (k, v) {
                return v;
            };
    return function (key, val) {
        if (replacerStack.length > 0) {
            for (var i = 0; i < replacerStack.length; i++) {
                var part = replacerStack[i];
                if (part[1] === key && part[0] === val) {
                    val = part[2];
                    replacerStack.splice(i, 1);
                    break;
                }
            }
        }
        return replacer.call(this, key, val);
    };
}

;// ./node_modules/.pnpm/langsmith@0.3.14_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/langsmith/dist/client.js











function mergeRuntimeEnvIntoRunCreate(run) {
    const runtimeEnv = (0,env/* getRuntimeEnvironment */.Ec)();
    const envVars = (0,env/* getLangChainEnvVarsMetadata */.yk)();
    const extra = run.extra ?? {};
    const metadata = extra.metadata;
    run.extra = {
        ...extra,
        runtime: {
            ...runtimeEnv,
            ...extra?.runtime,
        },
        metadata: {
            ...envVars,
            ...(envVars.revision_id || run.revision_id
                ? { revision_id: run.revision_id ?? envVars.revision_id }
                : {}),
            ...metadata,
        },
    };
    return run;
}
const getTracingSamplingRate = (configRate) => {
    const samplingRateStr = configRate?.toString() ??
        (0,env/* getLangSmithEnvironmentVariable */.Jz)("TRACING_SAMPLING_RATE");
    if (samplingRateStr === undefined) {
        return undefined;
    }
    const samplingRate = parseFloat(samplingRateStr);
    if (samplingRate < 0 || samplingRate > 1) {
        throw new Error(`LANGSMITH_TRACING_SAMPLING_RATE must be between 0 and 1 if set. Got: ${samplingRate}`);
    }
    return samplingRate;
};
// utility functions
const isLocalhost = (url) => {
    const strippedUrl = url.replace("http://", "").replace("https://", "");
    const hostname = strippedUrl.split("/")[0].split(":")[0];
    return (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1");
};
async function toArray(iterable) {
    const result = [];
    for await (const item of iterable) {
        result.push(item);
    }
    return result;
}
function trimQuotes(str) {
    if (str === undefined) {
        return undefined;
    }
    return str
        .trim()
        .replace(/^"(.*)"$/, "$1")
        .replace(/^'(.*)'$/, "$1");
}
const handle429 = async (response) => {
    if (response?.status === 429) {
        const retryAfter = parseInt(response.headers.get("retry-after") ?? "30", 10) * 1000;
        if (retryAfter > 0) {
            await new Promise((resolve) => setTimeout(resolve, retryAfter));
            // Return directly after calling this check
            return true;
        }
    }
    // Fall back to existing status checks
    return false;
};
function _formatFeedbackScore(score) {
    if (typeof score === "number") {
        // Truncate at 4 decimal places
        return Number(score.toFixed(4));
    }
    return score;
}
class AutoBatchQueue {
    constructor() {
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "sizeBytes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    peek() {
        return this.items[0];
    }
    push(item) {
        let itemPromiseResolve;
        const itemPromise = new Promise((resolve) => {
            // Setting itemPromiseResolve is synchronous with promise creation:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
            itemPromiseResolve = resolve;
        });
        const size = serialize(item.item).length;
        this.items.push({
            action: item.action,
            payload: item.item,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            itemPromiseResolve: itemPromiseResolve,
            itemPromise,
            size,
        });
        this.sizeBytes += size;
        return itemPromise;
    }
    pop(upToSizeBytes) {
        if (upToSizeBytes < 1) {
            throw new Error("Number of bytes to pop off may not be less than 1.");
        }
        const popped = [];
        let poppedSizeBytes = 0;
        // Pop items until we reach or exceed the size limit
        while (poppedSizeBytes + (this.peek()?.size ?? 0) < upToSizeBytes &&
            this.items.length > 0) {
            const item = this.items.shift();
            if (item) {
                popped.push(item);
                poppedSizeBytes += item.size;
                this.sizeBytes -= item.size;
            }
        }
        // If there is an item on the queue we were unable to pop,
        // just return it as a single batch.
        if (popped.length === 0 && this.items.length > 0) {
            const item = this.items.shift();
            popped.push(item);
            poppedSizeBytes += item.size;
            this.sizeBytes -= item.size;
        }
        return [
            popped.map((it) => ({ action: it.action, item: it.payload })),
            () => popped.forEach((it) => it.itemPromiseResolve()),
        ];
    }
}
// 20 MB
const DEFAULT_BATCH_SIZE_LIMIT_BYTES = 20_971_520;
const SERVER_INFO_REQUEST_TIMEOUT = 2500;
class Client {
    constructor(config = {}) {
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "webUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "batchIngestCaller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout_ms", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_tenantId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "hideInputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hideOutputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tracingSampleRate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "filteredPostUuids", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        Object.defineProperty(this, "autoBatchTracing", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "autoBatchQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new AutoBatchQueue()
        });
        Object.defineProperty(this, "autoBatchTimeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "autoBatchAggregationDelayMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 250
        });
        Object.defineProperty(this, "batchSizeBytesLimit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fetchOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "settings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "blockOnRootRunFinalization", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0,env/* getEnvironmentVariable */.Az)("LANGSMITH_TRACING_BACKGROUND") === "false"
        });
        Object.defineProperty(this, "traceBatchConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
        Object.defineProperty(this, "_serverInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "_getServerInfoPromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "manualFlushMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        const defaultConfig = Client.getDefaultClientConfig();
        this.tracingSampleRate = getTracingSamplingRate(config.tracingSamplingRate);
        this.apiUrl = trimQuotes(config.apiUrl ?? defaultConfig.apiUrl) ?? "";
        if (this.apiUrl.endsWith("/")) {
            this.apiUrl = this.apiUrl.slice(0, -1);
        }
        this.apiKey = trimQuotes(config.apiKey ?? defaultConfig.apiKey);
        this.webUrl = trimQuotes(config.webUrl ?? defaultConfig.webUrl);
        if (this.webUrl?.endsWith("/")) {
            this.webUrl = this.webUrl.slice(0, -1);
        }
        this.timeout_ms = config.timeout_ms ?? 90_000;
        this.caller = new AsyncCaller(config.callerOptions ?? {});
        this.traceBatchConcurrency =
            config.traceBatchConcurrency ?? this.traceBatchConcurrency;
        if (this.traceBatchConcurrency < 1) {
            throw new Error("Trace batch concurrency must be positive.");
        }
        this.batchIngestCaller = new AsyncCaller({
            maxRetries: 2,
            maxConcurrency: this.traceBatchConcurrency,
            ...(config.callerOptions ?? {}),
            onFailedResponseHook: handle429,
        });
        this.hideInputs =
            config.hideInputs ?? config.anonymizer ?? defaultConfig.hideInputs;
        this.hideOutputs =
            config.hideOutputs ?? config.anonymizer ?? defaultConfig.hideOutputs;
        this.autoBatchTracing = config.autoBatchTracing ?? this.autoBatchTracing;
        this.blockOnRootRunFinalization =
            config.blockOnRootRunFinalization ?? this.blockOnRootRunFinalization;
        this.batchSizeBytesLimit = config.batchSizeBytesLimit;
        this.fetchOptions = config.fetchOptions || {};
        this.manualFlushMode = config.manualFlushMode ?? this.manualFlushMode;
    }
    static getDefaultClientConfig() {
        const apiKey = (0,env/* getLangSmithEnvironmentVariable */.Jz)("API_KEY");
        const apiUrl = (0,env/* getLangSmithEnvironmentVariable */.Jz)("ENDPOINT") ??
            "https://api.smith.langchain.com";
        const hideInputs = (0,env/* getLangSmithEnvironmentVariable */.Jz)("HIDE_INPUTS") === "true";
        const hideOutputs = (0,env/* getLangSmithEnvironmentVariable */.Jz)("HIDE_OUTPUTS") === "true";
        return {
            apiUrl: apiUrl,
            apiKey: apiKey,
            webUrl: undefined,
            hideInputs: hideInputs,
            hideOutputs: hideOutputs,
        };
    }
    getHostUrl() {
        if (this.webUrl) {
            return this.webUrl;
        }
        else if (isLocalhost(this.apiUrl)) {
            this.webUrl = "http://localhost:3000";
            return this.webUrl;
        }
        else if (this.apiUrl.endsWith("/api/v1")) {
            this.webUrl = this.apiUrl.replace("/api/v1", "");
            return this.webUrl;
        }
        else if (this.apiUrl.includes("/api") &&
            !this.apiUrl.split(".", 1)[0].endsWith("api")) {
            this.webUrl = this.apiUrl.replace("/api", "");
            return this.webUrl;
        }
        else if (this.apiUrl.split(".", 1)[0].includes("dev")) {
            this.webUrl = "https://dev.smith.langchain.com";
            return this.webUrl;
        }
        else if (this.apiUrl.split(".", 1)[0].includes("eu")) {
            this.webUrl = "https://eu.smith.langchain.com";
            return this.webUrl;
        }
        else if (this.apiUrl.split(".", 1)[0].includes("beta")) {
            this.webUrl = "https://beta.smith.langchain.com";
            return this.webUrl;
        }
        else {
            this.webUrl = "https://smith.langchain.com";
            return this.webUrl;
        }
    }
    get headers() {
        const headers = {
            "User-Agent": `langsmith-js/${langsmith_dist/* __version__ */.Ls}`,
        };
        if (this.apiKey) {
            headers["x-api-key"] = `${this.apiKey}`;
        }
        return headers;
    }
    processInputs(inputs) {
        if (this.hideInputs === false) {
            return inputs;
        }
        if (this.hideInputs === true) {
            return {};
        }
        if (typeof this.hideInputs === "function") {
            return this.hideInputs(inputs);
        }
        return inputs;
    }
    processOutputs(outputs) {
        if (this.hideOutputs === false) {
            return outputs;
        }
        if (this.hideOutputs === true) {
            return {};
        }
        if (typeof this.hideOutputs === "function") {
            return this.hideOutputs(outputs);
        }
        return outputs;
    }
    prepareRunCreateOrUpdateInputs(run) {
        const runParams = { ...run };
        if (runParams.inputs !== undefined) {
            runParams.inputs = this.processInputs(runParams.inputs);
        }
        if (runParams.outputs !== undefined) {
            runParams.outputs = this.processOutputs(runParams.outputs);
        }
        return runParams;
    }
    async _getResponse(path, queryParams) {
        const paramsString = queryParams?.toString() ?? "";
        const url = `${this.apiUrl}${path}?${paramsString}`;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), url, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, `Failed to fetch ${path}`);
        return response;
    }
    async _get(path, queryParams) {
        const response = await this._getResponse(path, queryParams);
        return response.json();
    }
    async *_getPaginated(path, queryParams = new URLSearchParams(), transform) {
        let offset = Number(queryParams.get("offset")) || 0;
        const limit = Number(queryParams.get("limit")) || 100;
        while (true) {
            queryParams.set("offset", String(offset));
            queryParams.set("limit", String(limit));
            const url = `${this.apiUrl}${path}?${queryParams}`;
            const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), url, {
                method: "GET",
                headers: this.headers,
                signal: AbortSignal.timeout(this.timeout_ms),
                ...this.fetchOptions,
            });
            await raiseForStatus(response, `Failed to fetch ${path}`);
            const items = transform
                ? transform(await response.json())
                : await response.json();
            if (items.length === 0) {
                break;
            }
            yield items;
            if (items.length < limit) {
                break;
            }
            offset += items.length;
        }
    }
    async *_getCursorPaginatedList(path, body = null, requestMethod = "POST", dataKey = "runs") {
        const bodyParams = body ? { ...body } : {};
        while (true) {
            const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}${path}`, {
                method: requestMethod,
                headers: { ...this.headers, "Content-Type": "application/json" },
                signal: AbortSignal.timeout(this.timeout_ms),
                ...this.fetchOptions,
                body: JSON.stringify(bodyParams),
            });
            const responseBody = await response.json();
            if (!responseBody) {
                break;
            }
            if (!responseBody[dataKey]) {
                break;
            }
            yield responseBody[dataKey];
            const cursors = responseBody.cursors;
            if (!cursors) {
                break;
            }
            if (!cursors.next) {
                break;
            }
            bodyParams.cursor = cursors.next;
        }
    }
    // Allows mocking for tests
    _shouldSample() {
        if (this.tracingSampleRate === undefined) {
            return true;
        }
        return Math.random() < this.tracingSampleRate;
    }
    _filterForSampling(runs, patch = false) {
        if (this.tracingSampleRate === undefined) {
            return runs;
        }
        if (patch) {
            const sampled = [];
            for (const run of runs) {
                if (!this.filteredPostUuids.has(run.id)) {
                    sampled.push(run);
                }
                else {
                    this.filteredPostUuids.delete(run.id);
                }
            }
            return sampled;
        }
        else {
            // For new runs, sample at trace level to maintain consistency
            const sampled = [];
            for (const run of runs) {
                const traceId = run.trace_id ?? run.id;
                // If we've already made a decision about this trace, follow it
                if (this.filteredPostUuids.has(traceId)) {
                    continue;
                }
                // For new traces, apply sampling
                if (run.id === traceId) {
                    if (this._shouldSample()) {
                        sampled.push(run);
                    }
                    else {
                        this.filteredPostUuids.add(traceId);
                    }
                }
                else {
                    // Child runs follow their trace's sampling decision
                    sampled.push(run);
                }
            }
            return sampled;
        }
    }
    async _getBatchSizeLimitBytes() {
        const serverInfo = await this._ensureServerInfo();
        return (this.batchSizeBytesLimit ??
            serverInfo.batch_ingest_config?.size_limit_bytes ??
            DEFAULT_BATCH_SIZE_LIMIT_BYTES);
    }
    async _getMultiPartSupport() {
        const serverInfo = await this._ensureServerInfo();
        return (serverInfo.instance_flags?.dataset_examples_multipart_enabled ?? false);
    }
    drainAutoBatchQueue(batchSizeLimit) {
        const promises = [];
        while (this.autoBatchQueue.items.length > 0) {
            const [batch, done] = this.autoBatchQueue.pop(batchSizeLimit);
            if (!batch.length) {
                done();
                break;
            }
            const batchPromise = this._processBatch(batch, done).catch(console.error);
            promises.push(batchPromise);
        }
        return Promise.all(promises);
    }
    async _processBatch(batch, done) {
        if (!batch.length) {
            done();
            return;
        }
        try {
            const ingestParams = {
                runCreates: batch
                    .filter((item) => item.action === "create")
                    .map((item) => item.item),
                runUpdates: batch
                    .filter((item) => item.action === "update")
                    .map((item) => item.item),
            };
            const serverInfo = await this._ensureServerInfo();
            if (serverInfo?.batch_ingest_config?.use_multipart_endpoint) {
                await this.multipartIngestRuns(ingestParams);
            }
            else {
                await this.batchIngestRuns(ingestParams);
            }
        }
        finally {
            done();
        }
    }
    async processRunOperation(item) {
        clearTimeout(this.autoBatchTimeout);
        this.autoBatchTimeout = undefined;
        if (item.action === "create") {
            item.item = mergeRuntimeEnvIntoRunCreate(item.item);
        }
        const itemPromise = this.autoBatchQueue.push(item);
        if (this.manualFlushMode) {
            // Rely on manual flushing in serverless environments
            return itemPromise;
        }
        const sizeLimitBytes = await this._getBatchSizeLimitBytes();
        if (this.autoBatchQueue.sizeBytes > sizeLimitBytes) {
            void this.drainAutoBatchQueue(sizeLimitBytes);
        }
        if (this.autoBatchQueue.items.length > 0) {
            this.autoBatchTimeout = setTimeout(() => {
                this.autoBatchTimeout = undefined;
                void this.drainAutoBatchQueue(sizeLimitBytes);
            }, this.autoBatchAggregationDelayMs);
        }
        return itemPromise;
    }
    async _getServerInfo() {
        const response = await (0,fetch/* _getFetchImplementation */.Y)()(`${this.apiUrl}/info`, {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(SERVER_INFO_REQUEST_TIMEOUT),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "get server info");
        return response.json();
    }
    async _ensureServerInfo() {
        if (this._getServerInfoPromise === undefined) {
            this._getServerInfoPromise = (async () => {
                if (this._serverInfo === undefined) {
                    try {
                        this._serverInfo = await this._getServerInfo();
                    }
                    catch (e) {
                        console.warn(`[WARNING]: LangSmith failed to fetch info on supported operations. Falling back to batch operations and default limits.`);
                    }
                }
                return this._serverInfo ?? {};
            })();
        }
        return this._getServerInfoPromise.then((serverInfo) => {
            if (this._serverInfo === undefined) {
                this._getServerInfoPromise = undefined;
            }
            return serverInfo;
        });
    }
    async _getSettings() {
        if (!this.settings) {
            this.settings = this._get("/settings");
        }
        return await this.settings;
    }
    /**
     * Flushes current queued traces.
     */
    async flush() {
        const sizeLimitBytes = await this._getBatchSizeLimitBytes();
        await this.drainAutoBatchQueue(sizeLimitBytes);
    }
    async createRun(run) {
        if (!this._filterForSampling([run]).length) {
            return;
        }
        const headers = { ...this.headers, "Content-Type": "application/json" };
        const session_name = run.project_name;
        delete run.project_name;
        const runCreate = this.prepareRunCreateOrUpdateInputs({
            session_name,
            ...run,
            start_time: run.start_time ?? Date.now(),
        });
        if (this.autoBatchTracing &&
            runCreate.trace_id !== undefined &&
            runCreate.dotted_order !== undefined) {
            void this.processRunOperation({
                action: "create",
                item: runCreate,
            }).catch(console.error);
            return;
        }
        const mergedRunCreateParam = mergeRuntimeEnvIntoRunCreate(runCreate);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs`, {
            method: "POST",
            headers,
            body: serialize(mergedRunCreateParam),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "create run", true);
    }
    /**
     * Batch ingest/upsert multiple runs in the Langsmith system.
     * @param runs
     */
    async batchIngestRuns({ runCreates, runUpdates, }) {
        if (runCreates === undefined && runUpdates === undefined) {
            return;
        }
        let preparedCreateParams = runCreates?.map((create) => this.prepareRunCreateOrUpdateInputs(create)) ?? [];
        let preparedUpdateParams = runUpdates?.map((update) => this.prepareRunCreateOrUpdateInputs(update)) ?? [];
        if (preparedCreateParams.length > 0 && preparedUpdateParams.length > 0) {
            const createById = preparedCreateParams.reduce((params, run) => {
                if (!run.id) {
                    return params;
                }
                params[run.id] = run;
                return params;
            }, {});
            const standaloneUpdates = [];
            for (const updateParam of preparedUpdateParams) {
                if (updateParam.id !== undefined && createById[updateParam.id]) {
                    createById[updateParam.id] = {
                        ...createById[updateParam.id],
                        ...updateParam,
                    };
                }
                else {
                    standaloneUpdates.push(updateParam);
                }
            }
            preparedCreateParams = Object.values(createById);
            preparedUpdateParams = standaloneUpdates;
        }
        const rawBatch = {
            post: preparedCreateParams,
            patch: preparedUpdateParams,
        };
        if (!rawBatch.post.length && !rawBatch.patch.length) {
            return;
        }
        const batchChunks = {
            post: [],
            patch: [],
        };
        for (const k of ["post", "patch"]) {
            const key = k;
            const batchItems = rawBatch[key].reverse();
            let batchItem = batchItems.pop();
            while (batchItem !== undefined) {
                // Type is wrong but this is a deprecated code path anyway
                batchChunks[key].push(batchItem);
                batchItem = batchItems.pop();
            }
        }
        if (batchChunks.post.length > 0 || batchChunks.patch.length > 0) {
            await this._postBatchIngestRuns(serialize(batchChunks));
        }
    }
    async _postBatchIngestRuns(body) {
        const headers = {
            ...this.headers,
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        const response = await this.batchIngestCaller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs/batch`, {
            method: "POST",
            headers,
            body: body,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "batch create run", true);
    }
    /**
     * Batch ingest/upsert multiple runs in the Langsmith system.
     * @param runs
     */
    async multipartIngestRuns({ runCreates, runUpdates, }) {
        if (runCreates === undefined && runUpdates === undefined) {
            return;
        }
        // transform and convert to dicts
        const allAttachments = {};
        let preparedCreateParams = [];
        for (const create of runCreates ?? []) {
            const preparedCreate = this.prepareRunCreateOrUpdateInputs(create);
            if (preparedCreate.id !== undefined &&
                preparedCreate.attachments !== undefined) {
                allAttachments[preparedCreate.id] = preparedCreate.attachments;
            }
            delete preparedCreate.attachments;
            preparedCreateParams.push(preparedCreate);
        }
        let preparedUpdateParams = [];
        for (const update of runUpdates ?? []) {
            preparedUpdateParams.push(this.prepareRunCreateOrUpdateInputs(update));
        }
        // require trace_id and dotted_order
        const invalidRunCreate = preparedCreateParams.find((runCreate) => {
            return (runCreate.trace_id === undefined || runCreate.dotted_order === undefined);
        });
        if (invalidRunCreate !== undefined) {
            throw new Error(`Multipart ingest requires "trace_id" and "dotted_order" to be set when creating a run`);
        }
        const invalidRunUpdate = preparedUpdateParams.find((runUpdate) => {
            return (runUpdate.trace_id === undefined || runUpdate.dotted_order === undefined);
        });
        if (invalidRunUpdate !== undefined) {
            throw new Error(`Multipart ingest requires "trace_id" and "dotted_order" to be set when updating a run`);
        }
        // combine post and patch dicts where possible
        if (preparedCreateParams.length > 0 && preparedUpdateParams.length > 0) {
            const createById = preparedCreateParams.reduce((params, run) => {
                if (!run.id) {
                    return params;
                }
                params[run.id] = run;
                return params;
            }, {});
            const standaloneUpdates = [];
            for (const updateParam of preparedUpdateParams) {
                if (updateParam.id !== undefined && createById[updateParam.id]) {
                    createById[updateParam.id] = {
                        ...createById[updateParam.id],
                        ...updateParam,
                    };
                }
                else {
                    standaloneUpdates.push(updateParam);
                }
            }
            preparedCreateParams = Object.values(createById);
            preparedUpdateParams = standaloneUpdates;
        }
        if (preparedCreateParams.length === 0 &&
            preparedUpdateParams.length === 0) {
            return;
        }
        // send the runs in multipart requests
        const accumulatedContext = [];
        const accumulatedParts = [];
        for (const [method, payloads] of [
            ["post", preparedCreateParams],
            ["patch", preparedUpdateParams],
        ]) {
            for (const originalPayload of payloads) {
                // collect fields to be sent as separate parts
                const { inputs, outputs, events, attachments, ...payload } = originalPayload;
                const fields = { inputs, outputs, events };
                // encode the main run payload
                const stringifiedPayload = serialize(payload);
                accumulatedParts.push({
                    name: `${method}.${payload.id}`,
                    payload: new Blob([stringifiedPayload], {
                        type: `application/json; length=${stringifiedPayload.length}`, // encoding=gzip
                    }),
                });
                // encode the fields we collected
                for (const [key, value] of Object.entries(fields)) {
                    if (value === undefined) {
                        continue;
                    }
                    const stringifiedValue = serialize(value);
                    accumulatedParts.push({
                        name: `${method}.${payload.id}.${key}`,
                        payload: new Blob([stringifiedValue], {
                            type: `application/json; length=${stringifiedValue.length}`,
                        }),
                    });
                }
                // encode the attachments
                if (payload.id !== undefined) {
                    const attachments = allAttachments[payload.id];
                    if (attachments) {
                        delete allAttachments[payload.id];
                        for (const [name, attachment] of Object.entries(attachments)) {
                            let contentType;
                            let content;
                            if (Array.isArray(attachment)) {
                                [contentType, content] = attachment;
                            }
                            else {
                                contentType = attachment.mimeType;
                                content = attachment.data;
                            }
                            // Validate that the attachment name doesn't contain a '.'
                            if (name.includes(".")) {
                                console.warn(`Skipping attachment '${name}' for run ${payload.id}: Invalid attachment name. ` +
                                    `Attachment names must not contain periods ('.'). Please rename the attachment and try again.`);
                                continue;
                            }
                            accumulatedParts.push({
                                name: `attachment.${payload.id}.${name}`,
                                payload: new Blob([content], {
                                    type: `${contentType}; length=${content.byteLength}`,
                                }),
                            });
                        }
                    }
                }
                // compute context
                accumulatedContext.push(`trace=${payload.trace_id},id=${payload.id}`);
            }
        }
        await this._sendMultipartRequest(accumulatedParts, accumulatedContext.join("; "));
    }
    async _sendMultipartRequest(parts, context) {
        try {
            // Create multipart form data manually using Blobs
            const boundary = "----LangSmithFormBoundary" + Math.random().toString(36).slice(2);
            const chunks = [];
            for (const part of parts) {
                // Add field boundary
                chunks.push(new Blob([`--${boundary}\r\n`]));
                chunks.push(new Blob([
                    `Content-Disposition: form-data; name="${part.name}"\r\n`,
                    `Content-Type: ${part.payload.type}\r\n\r\n`,
                ]));
                chunks.push(part.payload);
                chunks.push(new Blob(["\r\n"]));
            }
            // Add final boundary
            chunks.push(new Blob([`--${boundary}--\r\n`]));
            // Combine all chunks into a single Blob
            const body = new Blob(chunks);
            // Convert Blob to ArrayBuffer for compatibility
            const arrayBuffer = await body.arrayBuffer();
            const res = await this.batchIngestCaller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs/multipart`, {
                method: "POST",
                headers: {
                    ...this.headers,
                    "Content-Type": `multipart/form-data; boundary=${boundary}`,
                },
                body: arrayBuffer,
                signal: AbortSignal.timeout(this.timeout_ms),
                ...this.fetchOptions,
            });
            await raiseForStatus(res, "ingest multipart runs", true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            console.warn(`${e.message.trim()}\n\nContext: ${context}`);
        }
    }
    async updateRun(runId, run) {
        assertUuid(runId);
        if (run.inputs) {
            run.inputs = this.processInputs(run.inputs);
        }
        if (run.outputs) {
            run.outputs = this.processOutputs(run.outputs);
        }
        // TODO: Untangle types
        const data = { ...run, id: runId };
        if (!this._filterForSampling([data], true).length) {
            return;
        }
        if (this.autoBatchTracing &&
            data.trace_id !== undefined &&
            data.dotted_order !== undefined) {
            if (run.end_time !== undefined &&
                data.parent_run_id === undefined &&
                this.blockOnRootRunFinalization &&
                !this.manualFlushMode) {
                // Trigger batches as soon as a root trace ends and wait to ensure trace finishes
                // in serverless environments.
                await this.processRunOperation({ action: "update", item: data }).catch(console.error);
                return;
            }
            else {
                void this.processRunOperation({ action: "update", item: data }).catch(console.error);
            }
            return;
        }
        const headers = { ...this.headers, "Content-Type": "application/json" };
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs/${runId}`, {
            method: "PATCH",
            headers,
            body: serialize(run),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update run", true);
    }
    async readRun(runId, { loadChildRuns } = { loadChildRuns: false }) {
        assertUuid(runId);
        let run = await this._get(`/runs/${runId}`);
        if (loadChildRuns && run.child_run_ids) {
            run = await this._loadChildRuns(run);
        }
        return run;
    }
    async getRunUrl({ runId, run, projectOpts, }) {
        if (run !== undefined) {
            let sessionId;
            if (run.session_id) {
                sessionId = run.session_id;
            }
            else if (projectOpts?.projectName) {
                sessionId = (await this.readProject({ projectName: projectOpts?.projectName })).id;
            }
            else if (projectOpts?.projectId) {
                sessionId = projectOpts?.projectId;
            }
            else {
                const project = await this.readProject({
                    projectName: (0,env/* getLangSmithEnvironmentVariable */.Jz)("PROJECT") || "default",
                });
                sessionId = project.id;
            }
            const tenantId = await this._getTenantId();
            return `${this.getHostUrl()}/o/${tenantId}/projects/p/${sessionId}/r/${run.id}?poll=true`;
        }
        else if (runId !== undefined) {
            const run_ = await this.readRun(runId);
            if (!run_.app_path) {
                throw new Error(`Run ${runId} has no app_path`);
            }
            const baseUrl = this.getHostUrl();
            return `${baseUrl}${run_.app_path}`;
        }
        else {
            throw new Error("Must provide either runId or run");
        }
    }
    async _loadChildRuns(run) {
        const childRuns = await toArray(this.listRuns({ id: run.child_run_ids }));
        const treemap = {};
        const runs = {};
        // TODO: make dotted order required when the migration finishes
        childRuns.sort((a, b) => (a?.dotted_order ?? "").localeCompare(b?.dotted_order ?? ""));
        for (const childRun of childRuns) {
            if (childRun.parent_run_id === null ||
                childRun.parent_run_id === undefined) {
                throw new Error(`Child run ${childRun.id} has no parent`);
            }
            if (!(childRun.parent_run_id in treemap)) {
                treemap[childRun.parent_run_id] = [];
            }
            treemap[childRun.parent_run_id].push(childRun);
            runs[childRun.id] = childRun;
        }
        run.child_runs = treemap[run.id] || [];
        for (const runId in treemap) {
            if (runId !== run.id) {
                runs[runId].child_runs = treemap[runId];
            }
        }
        return run;
    }
    /**
     * List runs from the LangSmith server.
     * @param projectId - The ID of the project to filter by.
     * @param projectName - The name of the project to filter by.
     * @param parentRunId - The ID of the parent run to filter by.
     * @param traceId - The ID of the trace to filter by.
     * @param referenceExampleId - The ID of the reference example to filter by.
     * @param startTime - The start time to filter by.
     * @param isRoot - Indicates whether to only return root runs.
     * @param runType - The run type to filter by.
     * @param error - Indicates whether to filter by error runs.
     * @param id - The ID of the run to filter by.
     * @param query - The query string to filter by.
     * @param filter - The filter string to apply to the run spans.
     * @param traceFilter - The filter string to apply on the root run of the trace.
     * @param treeFilter - The filter string to apply on other runs in the trace.
     * @param limit - The maximum number of runs to retrieve.
     * @returns {AsyncIterable<Run>} - The runs.
     *
     * @example
     * // List all runs in a project
     * const projectRuns = client.listRuns({ projectName: "<your_project>" });
     *
     * @example
     * // List LLM and Chat runs in the last 24 hours
     * const todaysLLMRuns = client.listRuns({
     *   projectName: "<your_project>",
     *   start_time: new Date(Date.now() - 24 * 60 * 60 * 1000),
     *   run_type: "llm",
     * });
     *
     * @example
     * // List traces in a project
     * const rootRuns = client.listRuns({
     *   projectName: "<your_project>",
     *   execution_order: 1,
     * });
     *
     * @example
     * // List runs without errors
     * const correctRuns = client.listRuns({
     *   projectName: "<your_project>",
     *   error: false,
     * });
     *
     * @example
     * // List runs by run ID
     * const runIds = [
     *   "a36092d2-4ad5-4fb4-9c0d-0dba9a2ed836",
     *   "9398e6be-964f-4aa4-8ae9-ad78cd4b7074",
     * ];
     * const selectedRuns = client.listRuns({ run_ids: runIds });
     *
     * @example
     * // List all "chain" type runs that took more than 10 seconds and had `total_tokens` greater than 5000
     * const chainRuns = client.listRuns({
     *   projectName: "<your_project>",
     *   filter: 'and(eq(run_type, "chain"), gt(latency, 10), gt(total_tokens, 5000))',
     * });
     *
     * @example
     * // List all runs called "extractor" whose root of the trace was assigned feedback "user_score" score of 1
     * const goodExtractorRuns = client.listRuns({
     *   projectName: "<your_project>",
     *   filter: 'eq(name, "extractor")',
     *   traceFilter: 'and(eq(feedback_key, "user_score"), eq(feedback_score, 1))',
     * });
     *
     * @example
     * // List all runs that started after a specific timestamp and either have "error" not equal to null or a "Correctness" feedback score equal to 0
     * const complexRuns = client.listRuns({
     *   projectName: "<your_project>",
     *   filter: 'and(gt(start_time, "2023-07-15T12:34:56Z"), or(neq(error, null), and(eq(feedback_key, "Correctness"), eq(feedback_score, 0.0))))',
     * });
     *
     * @example
     * // List all runs where `tags` include "experimental" or "beta" and `latency` is greater than 2 seconds
     * const taggedRuns = client.listRuns({
     *   projectName: "<your_project>",
     *   filter: 'and(or(has(tags, "experimental"), has(tags, "beta")), gt(latency, 2))',
     * });
     */
    async *listRuns(props) {
        const { projectId, projectName, parentRunId, traceId, referenceExampleId, startTime, executionOrder, isRoot, runType, error, id, query, filter, traceFilter, treeFilter, limit, select, } = props;
        let projectIds = [];
        if (projectId) {
            projectIds = Array.isArray(projectId) ? projectId : [projectId];
        }
        if (projectName) {
            const projectNames = Array.isArray(projectName)
                ? projectName
                : [projectName];
            const projectIds_ = await Promise.all(projectNames.map((name) => this.readProject({ projectName: name }).then((project) => project.id)));
            projectIds.push(...projectIds_);
        }
        const default_select = [
            "app_path",
            "child_run_ids",
            "completion_cost",
            "completion_tokens",
            "dotted_order",
            "end_time",
            "error",
            "events",
            "extra",
            "feedback_stats",
            "first_token_time",
            "id",
            "inputs",
            "name",
            "outputs",
            "parent_run_id",
            "parent_run_ids",
            "prompt_cost",
            "prompt_tokens",
            "reference_example_id",
            "run_type",
            "session_id",
            "start_time",
            "status",
            "tags",
            "total_cost",
            "total_tokens",
            "trace_id",
        ];
        const body = {
            session: projectIds.length ? projectIds : null,
            run_type: runType,
            reference_example: referenceExampleId,
            query,
            filter,
            trace_filter: traceFilter,
            tree_filter: treeFilter,
            execution_order: executionOrder,
            parent_run: parentRunId,
            start_time: startTime ? startTime.toISOString() : null,
            error,
            id,
            limit,
            trace: traceId,
            select: select ? select : default_select,
            is_root: isRoot,
        };
        let runsYielded = 0;
        for await (const runs of this._getCursorPaginatedList("/runs/query", body)) {
            if (limit) {
                if (runsYielded >= limit) {
                    break;
                }
                if (runs.length + runsYielded > limit) {
                    const newRuns = runs.slice(0, limit - runsYielded);
                    yield* newRuns;
                    break;
                }
                runsYielded += runs.length;
                yield* runs;
            }
            else {
                yield* runs;
            }
        }
    }
    async getRunStats({ id, trace, parentRun, runType, projectNames, projectIds, referenceExampleIds, startTime, endTime, error, query, filter, traceFilter, treeFilter, isRoot, dataSourceType, }) {
        let projectIds_ = projectIds || [];
        if (projectNames) {
            projectIds_ = [
                ...(projectIds || []),
                ...(await Promise.all(projectNames.map((name) => this.readProject({ projectName: name }).then((project) => project.id)))),
            ];
        }
        const payload = {
            id,
            trace,
            parent_run: parentRun,
            run_type: runType,
            session: projectIds_,
            reference_example: referenceExampleIds,
            start_time: startTime,
            end_time: endTime,
            error,
            query,
            filter,
            trace_filter: traceFilter,
            tree_filter: treeFilter,
            is_root: isRoot,
            data_source_type: dataSourceType,
        };
        // Remove undefined values from the payload
        const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value !== undefined));
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs/stats`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(filteredPayload),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const result = await response.json();
        return result;
    }
    async shareRun(runId, { shareId } = {}) {
        const data = {
            run_id: runId,
            share_token: shareId || v4/* default */.A(),
        };
        assertUuid(runId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs/${runId}/share`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const result = await response.json();
        if (result === null || !("share_token" in result)) {
            throw new Error("Invalid response from server");
        }
        return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
    }
    async unshareRun(runId) {
        assertUuid(runId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs/${runId}/share`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "unshare run", true);
    }
    async readRunSharedLink(runId) {
        assertUuid(runId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/runs/${runId}/share`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const result = await response.json();
        if (result === null || !("share_token" in result)) {
            return undefined;
        }
        return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
    }
    async listSharedRuns(shareToken, { runIds, } = {}) {
        const queryParams = new URLSearchParams({
            share_token: shareToken,
        });
        if (runIds !== undefined) {
            for (const runId of runIds) {
                queryParams.append("id", runId);
            }
        }
        assertUuid(shareToken);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/public/${shareToken}/runs${queryParams}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const runs = await response.json();
        return runs;
    }
    async readDatasetSharedSchema(datasetId, datasetName) {
        if (!datasetId && !datasetName) {
            throw new Error("Either datasetId or datasetName must be given");
        }
        if (!datasetId) {
            const dataset = await this.readDataset({ datasetName });
            datasetId = dataset.id;
        }
        assertUuid(datasetId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${datasetId}/share`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const shareSchema = await response.json();
        shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
        return shareSchema;
    }
    async shareDataset(datasetId, datasetName) {
        if (!datasetId && !datasetName) {
            throw new Error("Either datasetId or datasetName must be given");
        }
        if (!datasetId) {
            const dataset = await this.readDataset({ datasetName });
            datasetId = dataset.id;
        }
        const data = {
            dataset_id: datasetId,
        };
        assertUuid(datasetId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${datasetId}/share`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const shareSchema = await response.json();
        shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
        return shareSchema;
    }
    async unshareDataset(datasetId) {
        assertUuid(datasetId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${datasetId}/share`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "unshare dataset", true);
    }
    async readSharedDataset(shareToken) {
        assertUuid(shareToken);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/public/${shareToken}/datasets`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const dataset = await response.json();
        return dataset;
    }
    /**
     * Get shared examples.
     *
     * @param {string} shareToken The share token to get examples for. A share token is the UUID (or LangSmith URL, including UUID) generated when explicitly marking an example as public.
     * @param {Object} [options] Additional options for listing the examples.
     * @param {string[] | undefined} [options.exampleIds] A list of example IDs to filter by.
     * @returns {Promise<Example[]>} The shared examples.
     */
    async listSharedExamples(shareToken, options) {
        const params = {};
        if (options?.exampleIds) {
            params.id = options.exampleIds;
        }
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => urlParams.append(key, v));
            }
            else {
                urlParams.append(key, value);
            }
        });
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/public/${shareToken}/examples?${urlParams.toString()}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const result = await response.json();
        if (!response.ok) {
            if ("detail" in result) {
                throw new Error(`Failed to list shared examples.\nStatus: ${response.status}\nMessage: ${result.detail.join("\n")}`);
            }
            throw new Error(`Failed to list shared examples: ${response.status} ${response.statusText}`);
        }
        return result.map((example) => ({
            ...example,
            _hostUrl: this.getHostUrl(),
        }));
    }
    async createProject({ projectName, description = null, metadata = null, upsert = false, projectExtra = null, referenceDatasetId = null, }) {
        const upsert_ = upsert ? `?upsert=true` : "";
        const endpoint = `${this.apiUrl}/sessions${upsert_}`;
        const extra = projectExtra || {};
        if (metadata) {
            extra["metadata"] = metadata;
        }
        const body = {
            name: projectName,
            extra,
            description,
        };
        if (referenceDatasetId !== null) {
            body["reference_dataset_id"] = referenceDatasetId;
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), endpoint, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "create project");
        const result = await response.json();
        return result;
    }
    async updateProject(projectId, { name = null, description = null, metadata = null, projectExtra = null, endTime = null, }) {
        const endpoint = `${this.apiUrl}/sessions/${projectId}`;
        let extra = projectExtra;
        if (metadata) {
            extra = { ...(extra || {}), metadata };
        }
        const body = {
            name,
            extra,
            description,
            end_time: endTime ? new Date(endTime).toISOString() : null,
        };
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), endpoint, {
            method: "PATCH",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update project");
        const result = await response.json();
        return result;
    }
    async hasProject({ projectId, projectName, }) {
        // TODO: Add a head request
        let path = "/sessions";
        const params = new URLSearchParams();
        if (projectId !== undefined && projectName !== undefined) {
            throw new Error("Must provide either projectName or projectId, not both");
        }
        else if (projectId !== undefined) {
            assertUuid(projectId);
            path += `/${projectId}`;
        }
        else if (projectName !== undefined) {
            params.append("name", projectName);
        }
        else {
            throw new Error("Must provide projectName or projectId");
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}${path}?${params}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        // consume the response body to release the connection
        // https://undici.nodejs.org/#/?id=garbage-collection
        try {
            const result = await response.json();
            if (!response.ok) {
                return false;
            }
            // If it's OK and we're querying by name, need to check the list is not empty
            if (Array.isArray(result)) {
                return result.length > 0;
            }
            // projectId querying
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async readProject({ projectId, projectName, includeStats, }) {
        let path = "/sessions";
        const params = new URLSearchParams();
        if (projectId !== undefined && projectName !== undefined) {
            throw new Error("Must provide either projectName or projectId, not both");
        }
        else if (projectId !== undefined) {
            assertUuid(projectId);
            path += `/${projectId}`;
        }
        else if (projectName !== undefined) {
            params.append("name", projectName);
        }
        else {
            throw new Error("Must provide projectName or projectId");
        }
        if (includeStats !== undefined) {
            params.append("include_stats", includeStats.toString());
        }
        const response = await this._get(path, params);
        let result;
        if (Array.isArray(response)) {
            if (response.length === 0) {
                throw new Error(`Project[id=${projectId}, name=${projectName}] not found`);
            }
            result = response[0];
        }
        else {
            result = response;
        }
        return result;
    }
    async getProjectUrl({ projectId, projectName, }) {
        if (projectId === undefined && projectName === undefined) {
            throw new Error("Must provide either projectName or projectId");
        }
        const project = await this.readProject({ projectId, projectName });
        const tenantId = await this._getTenantId();
        return `${this.getHostUrl()}/o/${tenantId}/projects/p/${project.id}`;
    }
    async getDatasetUrl({ datasetId, datasetName, }) {
        if (datasetId === undefined && datasetName === undefined) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        const dataset = await this.readDataset({ datasetId, datasetName });
        const tenantId = await this._getTenantId();
        return `${this.getHostUrl()}/o/${tenantId}/datasets/${dataset.id}`;
    }
    async _getTenantId() {
        if (this._tenantId !== null) {
            return this._tenantId;
        }
        const queryParams = new URLSearchParams({ limit: "1" });
        for await (const projects of this._getPaginated("/sessions", queryParams)) {
            this._tenantId = projects[0].tenant_id;
            return projects[0].tenant_id;
        }
        throw new Error("No projects found to resolve tenant.");
    }
    async *listProjects({ projectIds, name, nameContains, referenceDatasetId, referenceDatasetName, referenceFree, metadata, } = {}) {
        const params = new URLSearchParams();
        if (projectIds !== undefined) {
            for (const projectId of projectIds) {
                params.append("id", projectId);
            }
        }
        if (name !== undefined) {
            params.append("name", name);
        }
        if (nameContains !== undefined) {
            params.append("name_contains", nameContains);
        }
        if (referenceDatasetId !== undefined) {
            params.append("reference_dataset", referenceDatasetId);
        }
        else if (referenceDatasetName !== undefined) {
            const dataset = await this.readDataset({
                datasetName: referenceDatasetName,
            });
            params.append("reference_dataset", dataset.id);
        }
        if (referenceFree !== undefined) {
            params.append("reference_free", referenceFree.toString());
        }
        if (metadata !== undefined) {
            params.append("metadata", JSON.stringify(metadata));
        }
        for await (const projects of this._getPaginated("/sessions", params)) {
            yield* projects;
        }
    }
    async deleteProject({ projectId, projectName, }) {
        let projectId_;
        if (projectId === undefined && projectName === undefined) {
            throw new Error("Must provide projectName or projectId");
        }
        else if (projectId !== undefined && projectName !== undefined) {
            throw new Error("Must provide either projectName or projectId, not both");
        }
        else if (projectId === undefined) {
            projectId_ = (await this.readProject({ projectName })).id;
        }
        else {
            projectId_ = projectId;
        }
        assertUuid(projectId_);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/sessions/${projectId_}`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, `delete session ${projectId_} (${projectName})`, true);
    }
    async uploadCsv({ csvFile, fileName, inputKeys, outputKeys, description, dataType, name, }) {
        const url = `${this.apiUrl}/datasets/upload`;
        const formData = new FormData();
        formData.append("file", csvFile, fileName);
        inputKeys.forEach((key) => {
            formData.append("input_keys", key);
        });
        outputKeys.forEach((key) => {
            formData.append("output_keys", key);
        });
        if (description) {
            formData.append("description", description);
        }
        if (dataType) {
            formData.append("data_type", dataType);
        }
        if (name) {
            formData.append("name", name);
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), url, {
            method: "POST",
            headers: this.headers,
            body: formData,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "upload CSV");
        const result = await response.json();
        return result;
    }
    async createDataset(name, { description, dataType, inputsSchema, outputsSchema, metadata, } = {}) {
        const body = {
            name,
            description,
            extra: metadata ? { metadata } : undefined,
        };
        if (dataType) {
            body.data_type = dataType;
        }
        if (inputsSchema) {
            body.inputs_schema_definition = inputsSchema;
        }
        if (outputsSchema) {
            body.outputs_schema_definition = outputsSchema;
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "create dataset");
        const result = await response.json();
        return result;
    }
    async readDataset({ datasetId, datasetName, }) {
        let path = "/datasets";
        // limit to 1 result
        const params = new URLSearchParams({ limit: "1" });
        if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId !== undefined) {
            assertUuid(datasetId);
            path += `/${datasetId}`;
        }
        else if (datasetName !== undefined) {
            params.append("name", datasetName);
        }
        else {
            throw new Error("Must provide datasetName or datasetId");
        }
        const response = await this._get(path, params);
        let result;
        if (Array.isArray(response)) {
            if (response.length === 0) {
                throw new Error(`Dataset[id=${datasetId}, name=${datasetName}] not found`);
            }
            result = response[0];
        }
        else {
            result = response;
        }
        return result;
    }
    async hasDataset({ datasetId, datasetName, }) {
        try {
            await this.readDataset({ datasetId, datasetName });
            return true;
        }
        catch (e) {
            if (
            // eslint-disable-next-line no-instanceof/no-instanceof
            e instanceof Error &&
                e.message.toLocaleLowerCase().includes("not found")) {
                return false;
            }
            throw e;
        }
    }
    async diffDatasetVersions({ datasetId, datasetName, fromVersion, toVersion, }) {
        let datasetId_ = datasetId;
        if (datasetId_ === undefined && datasetName === undefined) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        else if (datasetId_ !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId_ === undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        const urlParams = new URLSearchParams({
            from_version: typeof fromVersion === "string"
                ? fromVersion
                : fromVersion.toISOString(),
            to_version: typeof toVersion === "string" ? toVersion : toVersion.toISOString(),
        });
        const response = await this._get(`/datasets/${datasetId_}/versions/diff`, urlParams);
        return response;
    }
    async readDatasetOpenaiFinetuning({ datasetId, datasetName, }) {
        const path = "/datasets";
        if (datasetId !== undefined) {
            // do nothing
        }
        else if (datasetName !== undefined) {
            datasetId = (await this.readDataset({ datasetName })).id;
        }
        else {
            throw new Error("Must provide either datasetName or datasetId");
        }
        const response = await this._getResponse(`${path}/${datasetId}/openai_ft`);
        const datasetText = await response.text();
        const dataset = datasetText
            .trim()
            .split("\n")
            .map((line) => JSON.parse(line));
        return dataset;
    }
    async *listDatasets({ limit = 100, offset = 0, datasetIds, datasetName, datasetNameContains, metadata, } = {}) {
        const path = "/datasets";
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString(),
        });
        if (datasetIds !== undefined) {
            for (const id_ of datasetIds) {
                params.append("id", id_);
            }
        }
        if (datasetName !== undefined) {
            params.append("name", datasetName);
        }
        if (datasetNameContains !== undefined) {
            params.append("name_contains", datasetNameContains);
        }
        if (metadata !== undefined) {
            params.append("metadata", JSON.stringify(metadata));
        }
        for await (const datasets of this._getPaginated(path, params)) {
            yield* datasets;
        }
    }
    /**
     * Update a dataset
     * @param props The dataset details to update
     * @returns The updated dataset
     */
    async updateDataset(props) {
        const { datasetId, datasetName, ...update } = props;
        if (!datasetId && !datasetName) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        const _datasetId = datasetId ?? (await this.readDataset({ datasetName })).id;
        assertUuid(_datasetId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${_datasetId}`, {
            method: "PATCH",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(update),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update dataset");
        return (await response.json());
    }
    /**
     * Updates a tag on a dataset.
     *
     * If the tag is already assigned to a different version of this dataset,
     * the tag will be moved to the new version. The as_of parameter is used to
     * determine which version of the dataset to apply the new tags to.
     *
     * It must be an exact version of the dataset to succeed. You can
     * use the "readDatasetVersion" method to find the exact version
     * to apply the tags to.
     * @param params.datasetId The ID of the dataset to update. Must be provided if "datasetName" is not provided.
     * @param params.datasetName The name of the dataset to update. Must be provided if "datasetId" is not provided.
     * @param params.asOf The timestamp of the dataset to apply the new tags to.
     * @param params.tag The new tag to apply to the dataset.
     */
    async updateDatasetTag(props) {
        const { datasetId, datasetName, asOf, tag } = props;
        if (!datasetId && !datasetName) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        const _datasetId = datasetId ?? (await this.readDataset({ datasetName })).id;
        assertUuid(_datasetId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${_datasetId}/tags`, {
            method: "PUT",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify({
                as_of: typeof asOf === "string" ? asOf : asOf.toISOString(),
                tag,
            }),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update dataset tags");
    }
    async deleteDataset({ datasetId, datasetName, }) {
        let path = "/datasets";
        let datasetId_ = datasetId;
        if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetName !== undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        if (datasetId_ !== undefined) {
            assertUuid(datasetId_);
            path += `/${datasetId_}`;
        }
        else {
            throw new Error("Must provide datasetName or datasetId");
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, `delete ${path}`);
        await response.json();
    }
    async indexDataset({ datasetId, datasetName, tag, }) {
        let datasetId_ = datasetId;
        if (!datasetId_ && !datasetName) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        else if (datasetId_ && datasetName) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (!datasetId_) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        assertUuid(datasetId_);
        const data = {
            tag: tag,
        };
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${datasetId_}/index`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "index dataset");
        await response.json();
    }
    /**
     * Lets you run a similarity search query on a dataset.
     *
     * Requires the dataset to be indexed. Please see the `indexDataset` method to set up indexing.
     *
     * @param inputs      The input on which to run the similarity search. Must have the
     *                    same schema as the dataset.
     *
     * @param datasetId   The dataset to search for similar examples.
     *
     * @param limit       The maximum number of examples to return. Will return the top `limit` most
     *                    similar examples in order of most similar to least similar. If no similar
     *                    examples are found, random examples will be returned.
     *
     * @param filter      A filter string to apply to the search. Only examples will be returned that
     *                    match the filter string. Some examples of filters
     *
     *                    - eq(metadata.mykey, "value")
     *                    - and(neq(metadata.my.nested.key, "value"), neq(metadata.mykey, "value"))
     *                    - or(eq(metadata.mykey, "value"), eq(metadata.mykey, "othervalue"))
     *
     * @returns           A list of similar examples.
     *
     *
     * @example
     * dataset_id = "123e4567-e89b-12d3-a456-426614174000"
     * inputs = {"text": "How many people live in Berlin?"}
     * limit = 5
     * examples = await client.similarExamples(inputs, dataset_id, limit)
     */
    async similarExamples(inputs, datasetId, limit, { filter, } = {}) {
        const data = {
            limit: limit,
            inputs: inputs,
        };
        if (filter !== undefined) {
            data["filter"] = filter;
        }
        assertUuid(datasetId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${datasetId}/search`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "fetch similar examples");
        const result = await response.json();
        return result["examples"];
    }
    async createExample(inputsOrUpdate, outputs, options) {
        if (isExampleCreate(inputsOrUpdate)) {
            if (outputs !== undefined || options !== undefined) {
                throw new Error("Cannot provide outputs or options when using ExampleCreate object");
            }
        }
        let datasetId_ = outputs ? options?.datasetId : inputsOrUpdate.dataset_id;
        const datasetName_ = outputs
            ? options?.datasetName
            : inputsOrUpdate.dataset_name;
        if (datasetId_ === undefined && datasetName_ === undefined) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        else if (datasetId_ !== undefined && datasetName_ !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId_ === undefined) {
            const dataset = await this.readDataset({ datasetName: datasetName_ });
            datasetId_ = dataset.id;
        }
        const createdAt_ = (outputs ? options?.createdAt : inputsOrUpdate.created_at) || new Date();
        let data;
        if (!isExampleCreate(inputsOrUpdate)) {
            data = {
                inputs: inputsOrUpdate,
                outputs,
                created_at: createdAt_?.toISOString(),
                id: options?.exampleId,
                metadata: options?.metadata,
                split: options?.split,
                source_run_id: options?.sourceRunId,
                use_source_run_io: options?.useSourceRunIO,
                use_source_run_attachments: options?.useSourceRunAttachments,
                attachments: options?.attachments,
            };
        }
        else {
            data = inputsOrUpdate;
        }
        const response = await this._uploadExamplesMultipart(datasetId_, [data]);
        const example = await this.readExample(response.example_ids?.[0] ?? v4/* default */.A());
        return example;
    }
    async createExamples(propsOrUploads) {
        if (Array.isArray(propsOrUploads)) {
            if (propsOrUploads.length === 0) {
                return [];
            }
            const uploads = propsOrUploads;
            let datasetId_ = uploads[0].dataset_id;
            const datasetName_ = uploads[0].dataset_name;
            if (datasetId_ === undefined && datasetName_ === undefined) {
                throw new Error("Must provide either datasetName or datasetId");
            }
            else if (datasetId_ !== undefined && datasetName_ !== undefined) {
                throw new Error("Must provide either datasetName or datasetId, not both");
            }
            else if (datasetId_ === undefined) {
                const dataset = await this.readDataset({ datasetName: datasetName_ });
                datasetId_ = dataset.id;
            }
            const response = await this._uploadExamplesMultipart(datasetId_, uploads);
            const examples = await Promise.all(response.example_ids.map((id) => this.readExample(id)));
            return examples;
        }
        const { inputs, outputs, metadata, splits, sourceRunIds, useSourceRunIOs, useSourceRunAttachments, attachments, exampleIds, datasetId, datasetName, } = propsOrUploads;
        if (inputs === undefined) {
            throw new Error("Must provide inputs when using legacy parameters");
        }
        let datasetId_ = datasetId;
        const datasetName_ = datasetName;
        if (datasetId_ === undefined && datasetName_ === undefined) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        else if (datasetId_ !== undefined && datasetName_ !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId_ === undefined) {
            const dataset = await this.readDataset({ datasetName: datasetName_ });
            datasetId_ = dataset.id;
        }
        const formattedExamples = inputs.map((input, idx) => {
            return {
                dataset_id: datasetId_,
                inputs: input,
                outputs: outputs?.[idx],
                metadata: metadata?.[idx],
                split: splits?.[idx],
                id: exampleIds?.[idx],
                attachments: attachments?.[idx],
                source_run_id: sourceRunIds?.[idx],
                use_source_run_io: useSourceRunIOs?.[idx],
                use_source_run_attachments: useSourceRunAttachments?.[idx],
            };
        });
        const response = await this._uploadExamplesMultipart(datasetId_, formattedExamples);
        const examples = await Promise.all(response.example_ids.map((id) => this.readExample(id)));
        return examples;
    }
    async createLLMExample(input, generation, options) {
        return this.createExample({ input }, { output: generation }, options);
    }
    async createChatExample(input, generations, options) {
        const finalInput = input.map((message) => {
            if (isLangChainMessage(message)) {
                return convertLangChainMessageToExample(message);
            }
            return message;
        });
        const finalOutput = isLangChainMessage(generations)
            ? convertLangChainMessageToExample(generations)
            : generations;
        return this.createExample({ input: finalInput }, { output: finalOutput }, options);
    }
    async readExample(exampleId) {
        assertUuid(exampleId);
        const path = `/examples/${exampleId}`;
        const rawExample = await this._get(path);
        const { attachment_urls, ...rest } = rawExample;
        const example = rest;
        if (attachment_urls) {
            example.attachments = Object.entries(attachment_urls).reduce((acc, [key, value]) => {
                acc[key.slice("attachment.".length)] = {
                    presigned_url: value.presigned_url,
                    mime_type: value.mime_type,
                };
                return acc;
            }, {});
        }
        return example;
    }
    async *listExamples({ datasetId, datasetName, exampleIds, asOf, splits, inlineS3Urls, metadata, limit, offset, filter, includeAttachments, } = {}) {
        let datasetId_;
        if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId !== undefined) {
            datasetId_ = datasetId;
        }
        else if (datasetName !== undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        else {
            throw new Error("Must provide a datasetName or datasetId");
        }
        const params = new URLSearchParams({ dataset: datasetId_ });
        const dataset_version = asOf
            ? typeof asOf === "string"
                ? asOf
                : asOf?.toISOString()
            : undefined;
        if (dataset_version) {
            params.append("as_of", dataset_version);
        }
        const inlineS3Urls_ = inlineS3Urls ?? true;
        params.append("inline_s3_urls", inlineS3Urls_.toString());
        if (exampleIds !== undefined) {
            for (const id_ of exampleIds) {
                params.append("id", id_);
            }
        }
        if (splits !== undefined) {
            for (const split of splits) {
                params.append("splits", split);
            }
        }
        if (metadata !== undefined) {
            const serializedMetadata = JSON.stringify(metadata);
            params.append("metadata", serializedMetadata);
        }
        if (limit !== undefined) {
            params.append("limit", limit.toString());
        }
        if (offset !== undefined) {
            params.append("offset", offset.toString());
        }
        if (filter !== undefined) {
            params.append("filter", filter);
        }
        if (includeAttachments === true) {
            ["attachment_urls", "outputs", "metadata"].forEach((field) => params.append("select", field));
        }
        let i = 0;
        for await (const rawExamples of this._getPaginated("/examples", params)) {
            for (const rawExample of rawExamples) {
                const { attachment_urls, ...rest } = rawExample;
                const example = rest;
                if (attachment_urls) {
                    example.attachments = Object.entries(attachment_urls).reduce((acc, [key, value]) => {
                        acc[key.slice("attachment.".length)] = {
                            presigned_url: value.presigned_url,
                            mime_type: value.mime_type || undefined,
                        };
                        return acc;
                    }, {});
                }
                yield example;
                i++;
            }
            if (limit !== undefined && i >= limit) {
                break;
            }
        }
    }
    async deleteExample(exampleId) {
        assertUuid(exampleId);
        const path = `/examples/${exampleId}`;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, `delete ${path}`);
        await response.json();
    }
    async updateExample(exampleIdOrUpdate, update) {
        let exampleId;
        if (update) {
            exampleId = exampleIdOrUpdate;
        }
        else {
            exampleId = exampleIdOrUpdate.id;
        }
        assertUuid(exampleId);
        let updateToUse;
        if (update) {
            updateToUse = { id: exampleId, ...update };
        }
        else {
            updateToUse = exampleIdOrUpdate;
        }
        let datasetId;
        if (updateToUse.dataset_id !== undefined) {
            datasetId = updateToUse.dataset_id;
        }
        else {
            const example = await this.readExample(exampleId);
            datasetId = example.dataset_id;
        }
        return this._updateExamplesMultipart(datasetId, [updateToUse]);
    }
    async updateExamples(update) {
        // We will naively get dataset id from first example and assume it works for all
        let datasetId;
        if (update[0].dataset_id === undefined) {
            const example = await this.readExample(update[0].id);
            datasetId = example.dataset_id;
        }
        else {
            datasetId = update[0].dataset_id;
        }
        return this._updateExamplesMultipart(datasetId, update);
    }
    /**
     * Get dataset version by closest date or exact tag.
     *
     * Use this to resolve the nearest version to a given timestamp or for a given tag.
     *
     * @param options The options for getting the dataset version
     * @param options.datasetId The ID of the dataset
     * @param options.datasetName The name of the dataset
     * @param options.asOf The timestamp of the dataset to retrieve
     * @param options.tag The tag of the dataset to retrieve
     * @returns The dataset version
     */
    async readDatasetVersion({ datasetId, datasetName, asOf, tag, }) {
        let resolvedDatasetId;
        if (!datasetId) {
            const dataset = await this.readDataset({ datasetName });
            resolvedDatasetId = dataset.id;
        }
        else {
            resolvedDatasetId = datasetId;
        }
        assertUuid(resolvedDatasetId);
        if ((asOf && tag) || (!asOf && !tag)) {
            throw new Error("Exactly one of asOf and tag must be specified.");
        }
        const params = new URLSearchParams();
        if (asOf !== undefined) {
            params.append("as_of", typeof asOf === "string" ? asOf : asOf.toISOString());
        }
        if (tag !== undefined) {
            params.append("tag", tag);
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${resolvedDatasetId}/version?${params.toString()}`, {
            method: "GET",
            headers: { ...this.headers },
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "read dataset version");
        return await response.json();
    }
    async listDatasetSplits({ datasetId, datasetName, asOf, }) {
        let datasetId_;
        if (datasetId === undefined && datasetName === undefined) {
            throw new Error("Must provide dataset name or ID");
        }
        else if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId === undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        else {
            datasetId_ = datasetId;
        }
        assertUuid(datasetId_);
        const params = new URLSearchParams();
        const dataset_version = asOf
            ? typeof asOf === "string"
                ? asOf
                : asOf?.toISOString()
            : undefined;
        if (dataset_version) {
            params.append("as_of", dataset_version);
        }
        const response = await this._get(`/datasets/${datasetId_}/splits`, params);
        return response;
    }
    async updateDatasetSplits({ datasetId, datasetName, splitName, exampleIds, remove = false, }) {
        let datasetId_;
        if (datasetId === undefined && datasetName === undefined) {
            throw new Error("Must provide dataset name or ID");
        }
        else if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId === undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        else {
            datasetId_ = datasetId;
        }
        assertUuid(datasetId_);
        const data = {
            split_name: splitName,
            examples: exampleIds.map((id) => {
                assertUuid(id);
                return id;
            }),
            remove,
        };
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/${datasetId_}/splits`, {
            method: "PUT",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update dataset splits", true);
    }
    /**
     * @deprecated This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.
     */
    async evaluateRun(run, evaluator, { sourceInfo, loadChildRuns, referenceExample, } = { loadChildRuns: false }) {
        (0,warn/* warnOnce */.m)("This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.");
        let run_;
        if (typeof run === "string") {
            run_ = await this.readRun(run, { loadChildRuns });
        }
        else if (typeof run === "object" && "id" in run) {
            run_ = run;
        }
        else {
            throw new Error(`Invalid run type: ${typeof run}`);
        }
        if (run_.reference_example_id !== null &&
            run_.reference_example_id !== undefined) {
            referenceExample = await this.readExample(run_.reference_example_id);
        }
        const feedbackResult = await evaluator.evaluateRun(run_, referenceExample);
        const [_, feedbacks] = await this._logEvaluationFeedback(feedbackResult, run_, sourceInfo);
        return feedbacks[0];
    }
    async createFeedback(runId, key, { score, value, correction, comment, sourceInfo, feedbackSourceType = "api", sourceRunId, feedbackId, feedbackConfig, projectId, comparativeExperimentId, }) {
        if (!runId && !projectId) {
            throw new Error("One of runId or projectId must be provided");
        }
        if (runId && projectId) {
            throw new Error("Only one of runId or projectId can be provided");
        }
        const feedback_source = {
            type: feedbackSourceType ?? "api",
            metadata: sourceInfo ?? {},
        };
        if (sourceRunId !== undefined &&
            feedback_source?.metadata !== undefined &&
            !feedback_source.metadata["__run"]) {
            feedback_source.metadata["__run"] = { run_id: sourceRunId };
        }
        if (feedback_source?.metadata !== undefined &&
            feedback_source.metadata["__run"]?.run_id !== undefined) {
            assertUuid(feedback_source.metadata["__run"].run_id);
        }
        const feedback = {
            id: feedbackId ?? v4/* default */.A(),
            run_id: runId,
            key,
            score: _formatFeedbackScore(score),
            value,
            correction,
            comment,
            feedback_source: feedback_source,
            comparative_experiment_id: comparativeExperimentId,
            feedbackConfig,
            session_id: projectId,
        };
        const url = `${this.apiUrl}/feedback`;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), url, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(feedback),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "create feedback", true);
        return feedback;
    }
    async updateFeedback(feedbackId, { score, value, correction, comment, }) {
        const feedbackUpdate = {};
        if (score !== undefined && score !== null) {
            feedbackUpdate["score"] = _formatFeedbackScore(score);
        }
        if (value !== undefined && value !== null) {
            feedbackUpdate["value"] = value;
        }
        if (correction !== undefined && correction !== null) {
            feedbackUpdate["correction"] = correction;
        }
        if (comment !== undefined && comment !== null) {
            feedbackUpdate["comment"] = comment;
        }
        assertUuid(feedbackId);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/feedback/${feedbackId}`, {
            method: "PATCH",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(feedbackUpdate),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update feedback", true);
    }
    async readFeedback(feedbackId) {
        assertUuid(feedbackId);
        const path = `/feedback/${feedbackId}`;
        const response = await this._get(path);
        return response;
    }
    async deleteFeedback(feedbackId) {
        assertUuid(feedbackId);
        const path = `/feedback/${feedbackId}`;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, `delete ${path}`);
        await response.json();
    }
    async *listFeedback({ runIds, feedbackKeys, feedbackSourceTypes, } = {}) {
        const queryParams = new URLSearchParams();
        if (runIds) {
            queryParams.append("run", runIds.join(","));
        }
        if (feedbackKeys) {
            for (const key of feedbackKeys) {
                queryParams.append("key", key);
            }
        }
        if (feedbackSourceTypes) {
            for (const type of feedbackSourceTypes) {
                queryParams.append("source", type);
            }
        }
        for await (const feedbacks of this._getPaginated("/feedback", queryParams)) {
            yield* feedbacks;
        }
    }
    /**
     * Creates a presigned feedback token and URL.
     *
     * The token can be used to authorize feedback metrics without
     * needing an API key. This is useful for giving browser-based
     * applications the ability to submit feedback without needing
     * to expose an API key.
     *
     * @param runId The ID of the run.
     * @param feedbackKey The feedback key.
     * @param options Additional options for the token.
     * @param options.expiration The expiration time for the token.
     *
     * @returns A promise that resolves to a FeedbackIngestToken.
     */
    async createPresignedFeedbackToken(runId, feedbackKey, { expiration, feedbackConfig, } = {}) {
        const body = {
            run_id: runId,
            feedback_key: feedbackKey,
            feedback_config: feedbackConfig,
        };
        if (expiration) {
            if (typeof expiration === "string") {
                body["expires_at"] = expiration;
            }
            else if (expiration?.hours || expiration?.minutes || expiration?.days) {
                body["expires_in"] = expiration;
            }
        }
        else {
            body["expires_in"] = {
                hours: 3,
            };
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/feedback/tokens`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const result = await response.json();
        return result;
    }
    async createComparativeExperiment({ name, experimentIds, referenceDatasetId, createdAt, description, metadata, id, }) {
        if (experimentIds.length === 0) {
            throw new Error("At least one experiment is required");
        }
        if (!referenceDatasetId) {
            referenceDatasetId = (await this.readProject({
                projectId: experimentIds[0],
            })).reference_dataset_id;
        }
        if (!referenceDatasetId == null) {
            throw new Error("A reference dataset is required");
        }
        const body = {
            id,
            name,
            experiment_ids: experimentIds,
            reference_dataset_id: referenceDatasetId,
            description,
            created_at: (createdAt ?? new Date())?.toISOString(),
            extra: {},
        };
        if (metadata)
            body.extra["metadata"] = metadata;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/datasets/comparative`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        return await response.json();
    }
    /**
     * Retrieves a list of presigned feedback tokens for a given run ID.
     * @param runId The ID of the run.
     * @returns An async iterable of FeedbackIngestToken objects.
     */
    async *listPresignedFeedbackTokens(runId) {
        assertUuid(runId);
        const params = new URLSearchParams({ run_id: runId });
        for await (const tokens of this._getPaginated("/feedback/tokens", params)) {
            yield* tokens;
        }
    }
    _selectEvalResults(results) {
        let results_;
        if ("results" in results) {
            results_ = results.results;
        }
        else if (Array.isArray(results)) {
            results_ = results;
        }
        else {
            results_ = [results];
        }
        return results_;
    }
    async _logEvaluationFeedback(evaluatorResponse, run, sourceInfo) {
        const evalResults = this._selectEvalResults(evaluatorResponse);
        const feedbacks = [];
        for (const res of evalResults) {
            let sourceInfo_ = sourceInfo || {};
            if (res.evaluatorInfo) {
                sourceInfo_ = { ...res.evaluatorInfo, ...sourceInfo_ };
            }
            let runId_ = null;
            if (res.targetRunId) {
                runId_ = res.targetRunId;
            }
            else if (run) {
                runId_ = run.id;
            }
            feedbacks.push(await this.createFeedback(runId_, res.key, {
                score: res.score,
                value: res.value,
                comment: res.comment,
                correction: res.correction,
                sourceInfo: sourceInfo_,
                sourceRunId: res.sourceRunId,
                feedbackConfig: res.feedbackConfig,
                feedbackSourceType: "model",
            }));
        }
        return [evalResults, feedbacks];
    }
    async logEvaluationFeedback(evaluatorResponse, run, sourceInfo) {
        const [results] = await this._logEvaluationFeedback(evaluatorResponse, run, sourceInfo);
        return results;
    }
    /**
     * API for managing annotation queues
     */
    /**
     * List the annotation queues on the LangSmith API.
     * @param options - The options for listing annotation queues
     * @param options.queueIds - The IDs of the queues to filter by
     * @param options.name - The name of the queue to filter by
     * @param options.nameContains - The substring that the queue name should contain
     * @param options.limit - The maximum number of queues to return
     * @returns An iterator of AnnotationQueue objects
     */
    async *listAnnotationQueues(options = {}) {
        const { queueIds, name, nameContains, limit } = options;
        const params = new URLSearchParams();
        if (queueIds) {
            queueIds.forEach((id, i) => {
                assertUuid(id, `queueIds[${i}]`);
                params.append("ids", id);
            });
        }
        if (name)
            params.append("name", name);
        if (nameContains)
            params.append("name_contains", nameContains);
        params.append("limit", (limit !== undefined ? Math.min(limit, 100) : 100).toString());
        let count = 0;
        for await (const queues of this._getPaginated("/annotation-queues", params)) {
            yield* queues;
            count++;
            if (limit !== undefined && count >= limit)
                break;
        }
    }
    /**
     * Create an annotation queue on the LangSmith API.
     * @param options - The options for creating an annotation queue
     * @param options.name - The name of the annotation queue
     * @param options.description - The description of the annotation queue
     * @param options.queueId - The ID of the annotation queue
     * @returns The created AnnotationQueue object
     */
    async createAnnotationQueue(options) {
        const { name, description, queueId } = options;
        const body = {
            name,
            description,
            id: queueId || v4/* default */.A(),
        };
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/annotation-queues`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(Object.entries(body).filter(([_, v]) => v !== undefined))),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "create annotation queue");
        const data = await response.json();
        return data;
    }
    /**
     * Read an annotation queue with the specified queue ID.
     * @param queueId - The ID of the annotation queue to read
     * @returns The AnnotationQueue object
     */
    async readAnnotationQueue(queueId) {
        // TODO: Replace when actual endpoint is added
        const queueIteratorResult = await this.listAnnotationQueues({
            queueIds: [queueId],
        }).next();
        if (queueIteratorResult.done) {
            throw new Error(`Annotation queue with ID ${queueId} not found`);
        }
        return queueIteratorResult.value;
    }
    /**
     * Update an annotation queue with the specified queue ID.
     * @param queueId - The ID of the annotation queue to update
     * @param options - The options for updating the annotation queue
     * @param options.name - The new name for the annotation queue
     * @param options.description - The new description for the annotation queue
     */
    async updateAnnotationQueue(queueId, options) {
        const { name, description } = options;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}`, {
            method: "PATCH",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update annotation queue");
    }
    /**
     * Delete an annotation queue with the specified queue ID.
     * @param queueId - The ID of the annotation queue to delete
     */
    async deleteAnnotationQueue(queueId) {
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}`, {
            method: "DELETE",
            headers: { ...this.headers, Accept: "application/json" },
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "delete annotation queue");
    }
    /**
     * Add runs to an annotation queue with the specified queue ID.
     * @param queueId - The ID of the annotation queue
     * @param runIds - The IDs of the runs to be added to the annotation queue
     */
    async addRunsToAnnotationQueue(queueId, runIds) {
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}/runs`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(runIds.map((id, i) => assertUuid(id, `runIds[${i}]`).toString())),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "add runs to annotation queue");
    }
    /**
     * Get a run from an annotation queue at the specified index.
     * @param queueId - The ID of the annotation queue
     * @param index - The index of the run to retrieve
     * @returns A Promise that resolves to a RunWithAnnotationQueueInfo object
     * @throws {Error} If the run is not found at the given index or for other API-related errors
     */
    async getRunFromAnnotationQueue(queueId, index) {
        const baseUrl = `/annotation-queues/${assertUuid(queueId, "queueId")}/run`;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}${baseUrl}/${index}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "get run from annotation queue");
        return await response.json();
    }
    /**
     * Delete a run from an an annotation queue.
     * @param queueId - The ID of the annotation queue to delete the run from
     * @param queueRunId - The ID of the run to delete from the annotation queue
     */
    async deleteRunFromAnnotationQueue(queueId, queueRunId) {
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}/runs/${assertUuid(queueRunId, "queueRunId")}`, {
            method: "DELETE",
            headers: { ...this.headers, Accept: "application/json" },
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "delete run from annotation queue");
    }
    /**
     * Get the size of an annotation queue.
     * @param queueId - The ID of the annotation queue
     */
    async getSizeFromAnnotationQueue(queueId) {
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}/size`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "get size from annotation queue");
        return await response.json();
    }
    async _currentTenantIsOwner(owner) {
        const settings = await this._getSettings();
        return owner == "-" || settings.tenant_handle === owner;
    }
    async _ownerConflictError(action, owner) {
        const settings = await this._getSettings();
        return new Error(`Cannot ${action} for another tenant.\n
      Current tenant: ${settings.tenant_handle}\n
      Requested tenant: ${owner}`);
    }
    async _getLatestCommitHash(promptOwnerAndName) {
        const res = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/commits/${promptOwnerAndName}/?limit=${1}&offset=${0}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        const json = await res.json();
        if (!res.ok) {
            const detail = typeof json.detail === "string"
                ? json.detail
                : JSON.stringify(json.detail);
            const error = new Error(`Error ${res.status}: ${res.statusText}\n${detail}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            error.statusCode = res.status;
            throw error;
        }
        if (json.commits.length === 0) {
            return undefined;
        }
        return json.commits[0].commit_hash;
    }
    async _likeOrUnlikePrompt(promptIdentifier, like) {
        const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/likes/${owner}/${promptName}`, {
            method: "POST",
            body: JSON.stringify({ like: like }),
            headers: { ...this.headers, "Content-Type": "application/json" },
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, `${like ? "like" : "unlike"} prompt`);
        return await response.json();
    }
    async _getPromptUrl(promptIdentifier) {
        const [owner, promptName, commitHash] = parsePromptIdentifier(promptIdentifier);
        if (!(await this._currentTenantIsOwner(owner))) {
            if (commitHash !== "latest") {
                return `${this.getHostUrl()}/hub/${owner}/${promptName}/${commitHash.substring(0, 8)}`;
            }
            else {
                return `${this.getHostUrl()}/hub/${owner}/${promptName}`;
            }
        }
        else {
            const settings = await this._getSettings();
            if (commitHash !== "latest") {
                return `${this.getHostUrl()}/prompts/${promptName}/${commitHash.substring(0, 8)}?organizationId=${settings.id}`;
            }
            else {
                return `${this.getHostUrl()}/prompts/${promptName}?organizationId=${settings.id}`;
            }
        }
    }
    async promptExists(promptIdentifier) {
        const prompt = await this.getPrompt(promptIdentifier);
        return !!prompt;
    }
    async likePrompt(promptIdentifier) {
        return this._likeOrUnlikePrompt(promptIdentifier, true);
    }
    async unlikePrompt(promptIdentifier) {
        return this._likeOrUnlikePrompt(promptIdentifier, false);
    }
    async *listCommits(promptOwnerAndName) {
        for await (const commits of this._getPaginated(`/commits/${promptOwnerAndName}/`, new URLSearchParams(), (res) => res.commits)) {
            yield* commits;
        }
    }
    async *listPrompts(options) {
        const params = new URLSearchParams();
        params.append("sort_field", options?.sortField ?? "updated_at");
        params.append("sort_direction", "desc");
        params.append("is_archived", (!!options?.isArchived).toString());
        if (options?.isPublic !== undefined) {
            params.append("is_public", options.isPublic.toString());
        }
        if (options?.query) {
            params.append("query", options.query);
        }
        for await (const prompts of this._getPaginated("/repos", params, (res) => res.repos)) {
            yield* prompts;
        }
    }
    async getPrompt(promptIdentifier) {
        const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/repos/${owner}/${promptName}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        if (response.status === 404) {
            return null;
        }
        await raiseForStatus(response, "get prompt");
        const result = await response.json();
        if (result.repo) {
            return result.repo;
        }
        else {
            return null;
        }
    }
    async createPrompt(promptIdentifier, options) {
        const settings = await this._getSettings();
        if (options?.isPublic && !settings.tenant_handle) {
            throw new Error(`Cannot create a public prompt without first\n
        creating a LangChain Hub handle. 
        You can add a handle by creating a public prompt at:\n
        https://smith.langchain.com/prompts`);
        }
        const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
        if (!(await this._currentTenantIsOwner(owner))) {
            throw await this._ownerConflictError("create a prompt", owner);
        }
        const data = {
            repo_handle: promptName,
            ...(options?.description && { description: options.description }),
            ...(options?.readme && { readme: options.readme }),
            ...(options?.tags && { tags: options.tags }),
            is_public: !!options?.isPublic,
        };
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/repos/`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "create prompt");
        const { repo } = await response.json();
        return repo;
    }
    async createCommit(promptIdentifier, object, options) {
        if (!(await this.promptExists(promptIdentifier))) {
            throw new Error("Prompt does not exist, you must create it first.");
        }
        const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
        const resolvedParentCommitHash = options?.parentCommitHash === "latest" || !options?.parentCommitHash
            ? await this._getLatestCommitHash(`${owner}/${promptName}`)
            : options?.parentCommitHash;
        const payload = {
            manifest: JSON.parse(JSON.stringify(object)),
            parent_commit: resolvedParentCommitHash,
        };
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/commits/${owner}/${promptName}`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "create commit");
        const result = await response.json();
        return this._getPromptUrl(`${owner}/${promptName}${result.commit_hash ? `:${result.commit_hash}` : ""}`);
    }
    /**
     * Update examples with attachments using multipart form data.
     * @param updates List of ExampleUpdateWithAttachments objects to upsert
     * @returns Promise with the update response
     */
    async updateExamplesMultipart(datasetId, updates = []) {
        return this._updateExamplesMultipart(datasetId, updates);
    }
    async _updateExamplesMultipart(datasetId, updates = []) {
        if (!(await this._getMultiPartSupport())) {
            throw new Error("Your LangSmith version does not allow using the multipart examples endpoint, please update to the latest version.");
        }
        const formData = new FormData();
        for (const example of updates) {
            const exampleId = example.id;
            // Prepare the main example body
            const exampleBody = {
                ...(example.metadata && { metadata: example.metadata }),
                ...(example.split && { split: example.split }),
            };
            // Add main example data
            const stringifiedExample = serialize(exampleBody);
            const exampleBlob = new Blob([stringifiedExample], {
                type: "application/json",
            });
            formData.append(exampleId, exampleBlob);
            // Add inputs if present
            if (example.inputs) {
                const stringifiedInputs = serialize(example.inputs);
                const inputsBlob = new Blob([stringifiedInputs], {
                    type: "application/json",
                });
                formData.append(`${exampleId}.inputs`, inputsBlob);
            }
            // Add outputs if present
            if (example.outputs) {
                const stringifiedOutputs = serialize(example.outputs);
                const outputsBlob = new Blob([stringifiedOutputs], {
                    type: "application/json",
                });
                formData.append(`${exampleId}.outputs`, outputsBlob);
            }
            // Add attachments if present
            if (example.attachments) {
                for (const [name, attachment] of Object.entries(example.attachments)) {
                    let mimeType;
                    let data;
                    if (Array.isArray(attachment)) {
                        [mimeType, data] = attachment;
                    }
                    else {
                        mimeType = attachment.mimeType;
                        data = attachment.data;
                    }
                    const attachmentBlob = new Blob([data], {
                        type: `${mimeType}; length=${data.byteLength}`,
                    });
                    formData.append(`${exampleId}.attachment.${name}`, attachmentBlob);
                }
            }
            if (example.attachments_operations) {
                const stringifiedAttachmentsOperations = serialize(example.attachments_operations);
                const attachmentsOperationsBlob = new Blob([stringifiedAttachmentsOperations], {
                    type: "application/json",
                });
                formData.append(`${exampleId}.attachments_operations`, attachmentsOperationsBlob);
            }
        }
        const datasetIdToUse = datasetId ?? updates[0]?.dataset_id;
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/v1/platform/datasets/${datasetIdToUse}/examples`, {
            method: "PATCH",
            headers: this.headers,
            body: formData,
        });
        const result = await response.json();
        return result;
    }
    /**
     * Upload examples with attachments using multipart form data.
     * @param uploads List of ExampleUploadWithAttachments objects to upload
     * @returns Promise with the upload response
     * @deprecated This method is deprecated and will be removed in future LangSmith versions, please use `createExamples` instead
     */
    async uploadExamplesMultipart(datasetId, uploads = []) {
        return this._uploadExamplesMultipart(datasetId, uploads);
    }
    async _uploadExamplesMultipart(datasetId, uploads = []) {
        if (!(await this._getMultiPartSupport())) {
            throw new Error("Your LangSmith version does not allow using the multipart examples endpoint, please update to the latest version.");
        }
        const formData = new FormData();
        for (const example of uploads) {
            const exampleId = (example.id ?? v4/* default */.A()).toString();
            // Prepare the main example body
            const exampleBody = {
                created_at: example.created_at,
                ...(example.metadata && { metadata: example.metadata }),
                ...(example.split && { split: example.split }),
                ...(example.source_run_id && { source_run_id: example.source_run_id }),
                ...(example.use_source_run_io && {
                    use_source_run_io: example.use_source_run_io,
                }),
                ...(example.use_source_run_attachments && {
                    use_source_run_attachments: example.use_source_run_attachments,
                }),
            };
            // Add main example data
            const stringifiedExample = serialize(exampleBody);
            const exampleBlob = new Blob([stringifiedExample], {
                type: "application/json",
            });
            formData.append(exampleId, exampleBlob);
            // Add inputs if present
            if (example.inputs) {
                const stringifiedInputs = serialize(example.inputs);
                const inputsBlob = new Blob([stringifiedInputs], {
                    type: "application/json",
                });
                formData.append(`${exampleId}.inputs`, inputsBlob);
            }
            // Add outputs if present
            if (example.outputs) {
                const stringifiedOutputs = serialize(example.outputs);
                const outputsBlob = new Blob([stringifiedOutputs], {
                    type: "application/json",
                });
                formData.append(`${exampleId}.outputs`, outputsBlob);
            }
            // Add attachments if present
            if (example.attachments) {
                for (const [name, attachment] of Object.entries(example.attachments)) {
                    let mimeType;
                    let data;
                    if (Array.isArray(attachment)) {
                        [mimeType, data] = attachment;
                    }
                    else {
                        mimeType = attachment.mimeType;
                        data = attachment.data;
                    }
                    const attachmentBlob = new Blob([data], {
                        type: `${mimeType}; length=${data.byteLength}`,
                    });
                    formData.append(`${exampleId}.attachment.${name}`, attachmentBlob);
                }
            }
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/v1/platform/datasets/${datasetId}/examples`, {
            method: "POST",
            headers: this.headers,
            body: formData,
        });
        const result = await response.json();
        return result;
    }
    async updatePrompt(promptIdentifier, options) {
        if (!(await this.promptExists(promptIdentifier))) {
            throw new Error("Prompt does not exist, you must create it first.");
        }
        const [owner, promptName] = parsePromptIdentifier(promptIdentifier);
        if (!(await this._currentTenantIsOwner(owner))) {
            throw await this._ownerConflictError("update a prompt", owner);
        }
        const payload = {};
        if (options?.description !== undefined)
            payload.description = options.description;
        if (options?.readme !== undefined)
            payload.readme = options.readme;
        if (options?.tags !== undefined)
            payload.tags = options.tags;
        if (options?.isPublic !== undefined)
            payload.is_public = options.isPublic;
        if (options?.isArchived !== undefined)
            payload.is_archived = options.isArchived;
        // Check if payload is empty
        if (Object.keys(payload).length === 0) {
            throw new Error("No valid update options provided");
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/repos/${owner}/${promptName}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "update prompt");
        return response.json();
    }
    async deletePrompt(promptIdentifier) {
        if (!(await this.promptExists(promptIdentifier))) {
            throw new Error("Prompt does not exist, you must create it first.");
        }
        const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
        if (!(await this._currentTenantIsOwner(owner))) {
            throw await this._ownerConflictError("delete a prompt", owner);
        }
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/repos/${owner}/${promptName}`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        return await response.json();
    }
    async pullPromptCommit(promptIdentifier, options) {
        const [owner, promptName, commitHash] = parsePromptIdentifier(promptIdentifier);
        const response = await this.caller.call((0,fetch/* _getFetchImplementation */.Y)(), `${this.apiUrl}/commits/${owner}/${promptName}/${commitHash}${options?.includeModel ? "?include_model=true" : ""}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
            ...this.fetchOptions,
        });
        await raiseForStatus(response, "pull prompt commit");
        const result = await response.json();
        return {
            owner,
            repo: promptName,
            commit_hash: result.commit_hash,
            manifest: result.manifest,
            examples: result.examples,
        };
    }
    /**
     * This method should not be used directly, use `import { pull } from "langchain/hub"` instead.
     * Using this method directly returns the JSON string of the prompt rather than a LangChain object.
     * @private
     */
    async _pullPrompt(promptIdentifier, options) {
        const promptObject = await this.pullPromptCommit(promptIdentifier, {
            includeModel: options?.includeModel,
        });
        const prompt = JSON.stringify(promptObject.manifest);
        return prompt;
    }
    async pushPrompt(promptIdentifier, options) {
        // Create or update prompt metadata
        if (await this.promptExists(promptIdentifier)) {
            if (options && Object.keys(options).some((key) => key !== "object")) {
                await this.updatePrompt(promptIdentifier, {
                    description: options?.description,
                    readme: options?.readme,
                    tags: options?.tags,
                    isPublic: options?.isPublic,
                });
            }
        }
        else {
            await this.createPrompt(promptIdentifier, {
                description: options?.description,
                readme: options?.readme,
                tags: options?.tags,
                isPublic: options?.isPublic,
            });
        }
        if (!options?.object) {
            return await this._getPromptUrl(promptIdentifier);
        }
        // Create a commit with the new manifest
        const url = await this.createCommit(promptIdentifier, options?.object, {
            parentCommitHash: options?.parentCommitHash,
        });
        return url;
    }
    /**
     * Clone a public dataset to your own langsmith tenant.
     * This operation is idempotent. If you already have a dataset with the given name,
     * this function will do nothing.
  
     * @param {string} tokenOrUrl The token of the public dataset to clone.
     * @param {Object} [options] Additional options for cloning the dataset.
     * @param {string} [options.sourceApiUrl] The URL of the langsmith server where the data is hosted. Defaults to the API URL of your current client.
     * @param {string} [options.datasetName] The name of the dataset to create in your tenant. Defaults to the name of the public dataset.
     * @returns {Promise<void>}
     */
    async clonePublicDataset(tokenOrUrl, options = {}) {
        const { sourceApiUrl = this.apiUrl, datasetName } = options;
        const [parsedApiUrl, tokenUuid] = this.parseTokenOrUrl(tokenOrUrl, sourceApiUrl);
        const sourceClient = new Client({
            apiUrl: parsedApiUrl,
            // Placeholder API key not needed anymore in most cases, but
            // some private deployments may have API key-based rate limiting
            // that would cause this to fail if we provide no value.
            apiKey: "placeholder",
        });
        const ds = await sourceClient.readSharedDataset(tokenUuid);
        const finalDatasetName = datasetName || ds.name;
        try {
            if (await this.hasDataset({ datasetId: finalDatasetName })) {
                console.log(`Dataset ${finalDatasetName} already exists in your tenant. Skipping.`);
                return;
            }
        }
        catch (_) {
            // `.hasDataset` will throw an error if the dataset does not exist.
            // no-op in that case
        }
        // Fetch examples first, then create the dataset
        const examples = await sourceClient.listSharedExamples(tokenUuid);
        const dataset = await this.createDataset(finalDatasetName, {
            description: ds.description,
            dataType: ds.data_type || "kv",
            inputsSchema: ds.inputs_schema_definition ?? undefined,
            outputsSchema: ds.outputs_schema_definition ?? undefined,
        });
        try {
            await this.createExamples({
                inputs: examples.map((e) => e.inputs),
                outputs: examples.flatMap((e) => (e.outputs ? [e.outputs] : [])),
                datasetId: dataset.id,
            });
        }
        catch (e) {
            console.error(`An error occurred while creating dataset ${finalDatasetName}. ` +
                "You should delete it manually.");
            throw e;
        }
    }
    parseTokenOrUrl(urlOrToken, apiUrl, numParts = 2, kind = "dataset") {
        // Try parsing as UUID
        try {
            assertUuid(urlOrToken); // Will throw if it's not a UUID.
            return [apiUrl, urlOrToken];
        }
        catch (_) {
            // no-op if it's not a uuid
        }
        // Parse as URL
        try {
            const parsedUrl = new URL(urlOrToken);
            const pathParts = parsedUrl.pathname
                .split("/")
                .filter((part) => part !== "");
            if (pathParts.length >= numParts) {
                const tokenUuid = pathParts[pathParts.length - numParts];
                return [apiUrl, tokenUuid];
            }
            else {
                throw new Error(`Invalid public ${kind} URL: ${urlOrToken}`);
            }
        }
        catch (error) {
            throw new Error(`Invalid public ${kind} URL or token: ${urlOrToken}`);
        }
    }
    /**
     * Awaits all pending trace batches. Useful for environments where
     * you need to be sure that all tracing requests finish before execution ends,
     * such as serverless environments.
     *
     * @example
     * ```
     * import { Client } from "langsmith";
     *
     * const client = new Client();
     *
     * try {
     *   // Tracing happens here
     *   ...
     * } finally {
     *   await client.awaitPendingTraceBatches();
     * }
     * ```
     *
     * @returns A promise that resolves once all currently pending traces have sent.
     */
    awaitPendingTraceBatches() {
        if (this.manualFlushMode) {
            console.warn("[WARNING]: When tracing in manual flush mode, you must call `await client.flush()` manually to submit trace batches.");
            return Promise.resolve();
        }
        return Promise.all([
            ...this.autoBatchQueue.items.map(({ itemPromise }) => itemPromise),
            this.batchIngestCaller.queue.onIdle(),
        ]);
    }
}
function isExampleCreate(input) {
    return "dataset_id" in input || "dataset_name" in input;
}


/***/ })

};
;
//# sourceMappingURL=348.424bfb8ef45f97e39ad8.js.map