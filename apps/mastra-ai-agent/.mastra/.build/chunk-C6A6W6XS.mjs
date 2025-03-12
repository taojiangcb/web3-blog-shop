import { T as TABLE_TRACES } from './chunk-4Y74D74B.mjs';
import { trace, context, propagation, SpanStatusCode, SpanKind } from '@opentelemetry/api';
import { ExportResultCode } from '@opentelemetry/core';
import { JsonTraceSerializer } from '@opentelemetry/otlp-transformer';

function hasActiveTelemetry(tracerName = "default-tracer") {
  try {
    return !!trace.getTracer(tracerName);
  } catch {
    return false;
  }
}

// src/telemetry/telemetry.decorators.ts
function withSpan(options) {
  return function(_target, propertyKey, descriptor) {
    if (!descriptor || typeof descriptor === "number") return;
    const originalMethod = descriptor.value;
    const methodName = String(propertyKey);
    descriptor.value = function(...args) {
      if (options?.skipIfNoTelemetry && !hasActiveTelemetry(options?.tracerName)) {
        return originalMethod.apply(this, args);
      }
      const tracer = trace.getTracer(options?.tracerName ?? "default-tracer");
      let spanName;
      let spanKind;
      if (typeof options === "string") {
        spanName = options;
      } else if (options) {
        spanName = options.spanName || methodName;
        spanKind = options.spanKind;
      } else {
        spanName = methodName;
      }
      const span = tracer.startSpan(spanName, { kind: spanKind });
      let ctx = trace.setSpan(context.active(), span);
      args.forEach((arg, index) => {
        try {
          span.setAttribute(`${spanName}.argument.${index}`, JSON.stringify(arg));
        } catch {
          span.setAttribute(`${spanName}.argument.${index}`, "[Not Serializable]");
        }
      });
      const currentBaggage = propagation.getBaggage(ctx);
      if (currentBaggage?.componentName) {
        span.setAttribute("componentName", currentBaggage?.componentName);
        span.setAttribute("runId", currentBaggage?.runId);
      } else if (this && this.name) {
        span.setAttribute("componentName", this.name);
        span.setAttribute("runId", this.runId);
        ctx = propagation.setBaggage(ctx, { componentName: this.name, runId: this.runId });
      }
      let result;
      try {
        result = context.with(ctx, () => originalMethod.apply(this, args));
        if (result instanceof Promise) {
          return result.then((resolvedValue) => {
            try {
              span.setAttribute(`${spanName}.result`, JSON.stringify(resolvedValue));
            } catch {
              span.setAttribute(`${spanName}.result`, "[Not Serializable]");
            }
            return resolvedValue;
          }).finally(() => span.end());
        }
        try {
          span.setAttribute(`${spanName}.result`, JSON.stringify(result));
        } catch {
          span.setAttribute(`${spanName}.result`, "[Not Serializable]");
        }
        return result;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : "Unknown error"
        });
        if (error instanceof Error) {
          span.recordException(error);
        }
        throw error;
      } finally {
        if (!(result instanceof Promise)) {
          span.end();
        }
      }
    };
    return descriptor;
  };
}
function InstrumentClass(options) {
  return function(target) {
    const methods = Object.getOwnPropertyNames(target.prototype);
    methods.forEach((method) => {
      if (options?.excludeMethods?.includes(method) || method === "constructor") return;
      if (options?.methodFilter && !options.methodFilter(method)) return;
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, method);
      if (descriptor && typeof descriptor.value === "function") {
        Object.defineProperty(
          target.prototype,
          method,
          withSpan({
            spanName: options?.prefix ? `${options.prefix}.${method}` : method,
            skipIfNoTelemetry: true,
            spanKind: options?.spanKind || SpanKind.INTERNAL,
            tracerName: options?.tracerName
          })(target, method, descriptor)
        );
      }
    });
    return target;
  };
}
var OTLPTraceExporter = class {
  storage;
  queue = [];
  serializer;
  logger;
  activeFlush = void 0;
  constructor({ logger, storage }) {
    this.storage = storage;
    this.serializer = JsonTraceSerializer;
    this.logger = logger;
  }
  export(internalRepresentation, resultCallback) {
    const serializedRequest = this.serializer.serializeRequest(internalRepresentation);
    const payload = JSON.parse(Buffer.from(serializedRequest.buffer, "utf8"));
    const items = payload?.resourceSpans?.[0]?.scopeSpans;
    this.logger.debug(`Exporting telemetry: ${items.length} scope spans to be processed [trace batch]`);
    this.queue.push({ data: items, resultCallback });
    if (!this.activeFlush) {
      this.activeFlush = this.flush();
    }
  }
  shutdown() {
    return this.forceFlush();
  }
  flush() {
    const now = /* @__PURE__ */ new Date();
    const items = this.queue.shift();
    if (!items) return Promise.resolve();
    const allSpans = items.data.reduce((acc, scopedSpans) => {
      const { scope, spans } = scopedSpans;
      for (const span of spans) {
        const {
          spanId,
          parentSpanId,
          traceId,
          name,
          kind,
          attributes,
          status,
          events,
          links,
          startTimeUnixNano,
          endTimeUnixNano,
          ...rest
        } = span;
        const startTime = Number(BigInt(startTimeUnixNano) / 1000n);
        const endTime = Number(BigInt(endTimeUnixNano) / 1000n);
        acc.push({
          id: spanId,
          parentSpanId,
          traceId,
          name,
          scope: scope.name,
          kind,
          status: JSON.stringify(status),
          events: JSON.stringify(events),
          links: JSON.stringify(links),
          attributes: JSON.stringify(
            attributes.reduce((acc2, attr) => {
              const valueKey = Object.keys(attr.value)[0];
              if (valueKey) {
                acc2[attr.key] = attr.value[valueKey];
              }
              return acc2;
            }, {})
          ),
          startTime,
          endTime,
          other: JSON.stringify(rest),
          createdAt: now
        });
      }
      return acc;
    }, []);
    return this.storage.__batchInsert({
      tableName: TABLE_TRACES,
      records: allSpans
    }).then(() => {
      items.resultCallback({
        code: ExportResultCode.SUCCESS
      });
    }).catch((e) => {
      this.logger.error("span err:" + e?.message);
      items.resultCallback({
        code: ExportResultCode.FAILED,
        error: e
      });
    }).finally(() => {
      this.activeFlush = void 0;
    });
  }
  async forceFlush() {
    if (!this.queue.length) {
      return;
    }
    await this.activeFlush;
    while (this.queue.length) {
      await this.flush();
    }
  }
  __setLogger(logger) {
    this.logger = logger;
  }
};
var Telemetry = class _Telemetry {
  tracer = trace.getTracer("default");
  name = "default-service";
  constructor(config) {
    this.name = config.serviceName ?? "default-service";
    this.tracer = trace.getTracer(this.name);
  }
  /**
   * @deprecated This method does not do anything
   */
  async shutdown() {
  }
  /**
   * Initialize telemetry with the given configuration
   * @param config - Optional telemetry configuration object
   * @returns Telemetry instance that can be used for tracing
   */
  static init(config = {}) {
    try {
      if (!global.__TELEMETRY__) {
        global.__TELEMETRY__ = new _Telemetry(config);
      }
      return global.__TELEMETRY__;
    } catch (error) {
      console.error("Failed to initialize telemetry:", error);
      throw error;
    }
  }
  /**
   * Get the global telemetry instance
   * @throws {Error} If telemetry has not been initialized
   * @returns {Telemetry} The global telemetry instance
   */
  static get() {
    if (!global.__TELEMETRY__) {
      throw new Error("Telemetry not initialized");
    }
    return global.__TELEMETRY__;
  }
  /**
   * Wraps a class instance with telemetry tracing
   * @param instance The class instance to wrap
   * @param options Optional configuration for tracing
   * @returns Wrapped instance with all methods traced
   */
  traceClass(instance, options = {}) {
    const { skipIfNoTelemetry = true } = options;
    if (skipIfNoTelemetry && !hasActiveTelemetry()) {
      return instance;
    }
    const { spanNamePrefix = instance.constructor.name.toLowerCase(), attributes = {}, excludeMethods = [] } = options;
    return new Proxy(instance, {
      get: (target, prop) => {
        const value = target[prop];
        if (typeof value === "function" && prop !== "constructor" && !prop.toString().startsWith("_") && !excludeMethods.includes(prop.toString())) {
          return this.traceMethod(value.bind(target), {
            spanName: `${spanNamePrefix}.${prop.toString()}`,
            attributes: {
              ...attributes,
              [`${spanNamePrefix}.name`]: target.constructor.name,
              [`${spanNamePrefix}.method.name`]: prop.toString()
            }
          });
        }
        return value;
      }
    });
  }
  /**
   * method to trace individual methods with proper context
   * @param method The method to trace
   * @param context Additional context for the trace
   * @returns Wrapped method with tracing
   */
  traceMethod(method, context3) {
    let ctx = context.active();
    const { skipIfNoTelemetry = true } = context3;
    if (skipIfNoTelemetry && !hasActiveTelemetry()) {
      return method;
    }
    return (...args) => {
      const span = this.tracer.startSpan(context3.spanName);
      function handleError(error) {
        span.recordException(error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message
        });
        span.end();
        throw error;
      }
      try {
        let recordResult2 = function(res) {
          try {
            span.setAttribute(`${context3.spanName}.result`, JSON.stringify(res));
          } catch {
            span.setAttribute(`${context3.spanName}.result`, "[Not Serializable]");
          }
          span.end();
          return res;
        };
        if (context3.attributes) {
          span.setAttributes(context3.attributes);
        }
        if (context3.attributes?.componentName) {
          ctx = propagation.setBaggage(ctx, {
            // @ts-ignore
            componentName: context3.attributes.componentName,
            runId: context3.attributes.runId
          });
        } else {
          const currentBaggage = propagation.getBaggage(ctx);
          if (currentBaggage?.componentName) {
            span.setAttribute("componentName", currentBaggage?.componentName);
            span.setAttribute("runId", currentBaggage?.runId);
          } else if (this && this.name) {
            span.setAttribute("componentName", this.name);
            span.setAttribute("runId", this.runId);
            ctx = propagation.setBaggage(ctx, { componentName: this.name, runId: this.runId });
          }
        }
        args.forEach((arg, index) => {
          try {
            span.setAttribute(`${context3.spanName}.argument.${index}`, JSON.stringify(arg));
          } catch {
            span.setAttribute(`${context3.spanName}.argument.${index}`, "[Not Serializable]");
          }
        });
        let result;
        context.with(trace.setSpan(ctx, span), () => {
          result = method(...args);
        });
        if (result instanceof Promise) {
          return result.then(recordResult2).catch(handleError);
        } else {
          return recordResult2(result);
        }
      } catch (error) {
        handleError(error);
      }
    };
  }
  getBaggageTracer() {
    return new BaggageTracer(this.tracer);
  }
};
var BaggageTracer = class {
  _tracer;
  constructor(tracer) {
    this._tracer = tracer;
  }
  startSpan(name, options = {}, ctx) {
    ctx = ctx ?? context.active();
    const span = this._tracer.startSpan(name, options, ctx);
    const currentBaggage = propagation.getBaggage(ctx);
    span.setAttribute("componentName", currentBaggage?.componentName);
    span.setAttribute("runId", currentBaggage?.runId);
    return span;
  }
  startActiveSpan(name, optionsOrFn, ctxOrFn, fn) {
    if (typeof optionsOrFn === "function") {
      const wrappedFn2 = (span) => {
        const currentBaggage = propagation.getBaggage(context.active());
        span.setAttribute("componentName", currentBaggage?.componentName);
        return optionsOrFn(span);
      };
      return this._tracer.startActiveSpan(name, {}, context.active(), wrappedFn2);
    }
    if (typeof ctxOrFn === "function") {
      const wrappedFn2 = (span) => {
        const currentBaggage = propagation.getBaggage(context.active());
        span.setAttribute("componentName", currentBaggage?.componentName);
        return ctxOrFn(span);
      };
      return this._tracer.startActiveSpan(name, optionsOrFn, context.active(), wrappedFn2);
    }
    const wrappedFn = (span) => {
      const currentBaggage = propagation.getBaggage(ctxOrFn ?? context.active());
      span.setAttribute("componentName", currentBaggage?.componentName);
      return fn(span);
    };
    return this._tracer.startActiveSpan(name, optionsOrFn, ctxOrFn, wrappedFn);
  }
};

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = msg => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", {
  value,
  configurable: true
});
var __decoratorStart = base => [,,, __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = fn => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({
  kind: __decoratorStrings[kind],
  name,
  metadata,
  addInitializer: fn => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null))
});
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) fns[i].call(self) ;
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var it,
    done,
    ctx,
    k = flags & 7,
    p = false;
  var j = 0;
  var extraInitializers = array[j] || (array[j] = []);
  var desc = k && ((target = target.prototype), k < 5 && (k > 3 || true) && __getOwnPropDesc(target , name));
  __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    it = (0, decorators[i])(target, ctx), done._ = 1;
    __expectFn(it) && (target = it);
  }
  return __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};

export { InstrumentClass as I, OTLPTraceExporter as O, Telemetry as T, __decorateElement as _, __runInitializers as a, __decoratorStart as b };
