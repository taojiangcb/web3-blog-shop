import { experimental_customProvider, embed } from 'ai';
import { M as MastraBase, j as deepMerge } from './chunk-4Y74D74B.mjs';
import require$$3, { isAbsolute, join, resolve } from 'path';
import { createClient } from '@libsql/client';
import { L as LibSQLStore } from './chunk-QAZ2ONKM.mjs';
import { existsSync } from 'fs';
import node_modulesPath from 'node_modules-path';
import 'stream';
import './pino.mjs';
import 'node:os';
import 'node:events';
import 'events';
import 'util';
import 'assert';
import 'worker_threads';
import 'module';
import 'node:path';
import 'url';
import 'buffer';
import 'pino-pretty';
import 'crypto';
import 'json-schema-to-zod';
import './_virtual__virtual-zod.mjs';

// src/vector/vector.ts
var MastraVector = class extends MastraBase {
  constructor() {
    super({ name: "MastraVector", component: "VECTOR" });
  }
  baseKeys = {
    query: ["queryVector", "topK", "filter", "includeVector"],
    upsert: ["vectors", "metadata", "ids"],
    createIndex: ["dimension", "metric"]
  };
  normalizeArgs(method, [first, ...rest], extendedKeys = []) {
    if (typeof first === "object") {
      return first;
    }
    this.logger.warn(
      `Deprecation Warning: Passing individual arguments to ${method}() is deprecated. Please use an object parameter instead.`
    );
    const baseKeys = this.baseKeys[method] || [];
    const paramKeys = [...baseKeys, ...extendedKeys].slice(0, rest.length);
    return {
      indexName: first,
      ...Object.fromEntries(paramKeys.map((key, i) => [key, rest[i]]))
    };
  }
  async updateIndexById(_indexName, _id, _update) {
    throw new Error("updateIndexById is not implemented yet");
  }
  async deleteIndexById(_indexName, _id) {
    throw new Error("deleteById is not implemented yet");
  }
};

// src/vector/filter/base.ts
var BaseFilterTranslator = class _BaseFilterTranslator {
  /**
   * Operator type checks
   */
  isOperator(key) {
    return key.startsWith("$");
  }
  static BASIC_OPERATORS = ["$eq", "$ne"];
  static NUMERIC_OPERATORS = ["$gt", "$gte", "$lt", "$lte"];
  static ARRAY_OPERATORS = ["$in", "$nin", "$all", "$elemMatch"];
  static LOGICAL_OPERATORS = ["$and", "$or", "$not", "$nor"];
  static ELEMENT_OPERATORS = ["$exists"];
  static REGEX_OPERATORS = ["$regex", "$options"];
  static DEFAULT_OPERATORS = {
    logical: _BaseFilterTranslator.LOGICAL_OPERATORS,
    basic: _BaseFilterTranslator.BASIC_OPERATORS,
    numeric: _BaseFilterTranslator.NUMERIC_OPERATORS,
    array: _BaseFilterTranslator.ARRAY_OPERATORS,
    element: _BaseFilterTranslator.ELEMENT_OPERATORS,
    regex: _BaseFilterTranslator.REGEX_OPERATORS
  };
  isLogicalOperator(key) {
    return _BaseFilterTranslator.DEFAULT_OPERATORS.logical.includes(key);
  }
  isBasicOperator(key) {
    return _BaseFilterTranslator.DEFAULT_OPERATORS.basic.includes(key);
  }
  isNumericOperator(key) {
    return _BaseFilterTranslator.DEFAULT_OPERATORS.numeric.includes(key);
  }
  isArrayOperator(key) {
    return _BaseFilterTranslator.DEFAULT_OPERATORS.array.includes(key);
  }
  isElementOperator(key) {
    return _BaseFilterTranslator.DEFAULT_OPERATORS.element.includes(key);
  }
  isRegexOperator(key) {
    return _BaseFilterTranslator.DEFAULT_OPERATORS.regex.includes(key);
  }
  isFieldOperator(key) {
    return this.isOperator(key) && !this.isLogicalOperator(key);
  }
  isCustomOperator(key) {
    const support = this.getSupportedOperators();
    return support.custom?.includes(key) ?? false;
  }
  getSupportedOperators() {
    return _BaseFilterTranslator.DEFAULT_OPERATORS;
  }
  isValidOperator(key) {
    const support = this.getSupportedOperators();
    const allSupported = Object.values(support).flat();
    return allSupported.includes(key);
  }
  /**
   * Value normalization for comparison operators
   */
  normalizeComparisonValue(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "number" && Object.is(value, -0)) {
      return 0;
    }
    return value;
  }
  /**
   * Helper method to simulate $all operator using $and + $eq when needed.
   * Some vector stores don't support $all natively.
   */
  simulateAllOperator(field, values) {
    return {
      $and: values.map((value) => ({
        [field]: { $in: [this.normalizeComparisonValue(value)] }
      }))
    };
  }
  /**
   * Utility functions for type checking
   */
  isPrimitive(value) {
    return value === null || value === void 0 || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
  }
  isRegex(value) {
    return value instanceof RegExp;
  }
  isEmpty(obj) {
    return obj === null || obj === void 0 || typeof obj === "object" && Object.keys(obj).length === 0;
  }
  static ErrorMessages = {
    UNSUPPORTED_OPERATOR: (op) => `Unsupported operator: ${op}`,
    INVALID_LOGICAL_OPERATOR_LOCATION: (op, path) => `Logical operator ${op} cannot be used at field level: ${path}`,
    NOT_REQUIRES_OBJECT: `$not operator requires an object`,
    NOT_CANNOT_BE_EMPTY: `$not operator cannot be empty`,
    INVALID_LOGICAL_OPERATOR_CONTENT: (path) => `Logical operators must contain field conditions, not direct operators: ${path}`,
    INVALID_TOP_LEVEL_OPERATOR: (op) => `Invalid top-level operator: ${op}`,
    ELEM_MATCH_REQUIRES_OBJECT: `$elemMatch requires an object with conditions`
  };
  /**
   * Helper to handle array value normalization consistently
   */
  normalizeArrayValues(values) {
    return values.map((value) => this.normalizeComparisonValue(value));
  }
  validateFilter(filter) {
    const validation = this.validateFilterSupport(filter);
    if (!validation.supported) {
      throw new Error(validation.messages.join(", "));
    }
  }
  /**
   * Validates if a filter structure is supported by the specific vector DB
   * and returns detailed validation information.
   */
  validateFilterSupport(node, path = "") {
    const messages = [];
    if (this.isPrimitive(node) || this.isEmpty(node)) {
      return { supported: true, messages: [] };
    }
    if (Array.isArray(node)) {
      const arrayResults = node.map((item) => this.validateFilterSupport(item, path));
      const arrayMessages = arrayResults.flatMap((r) => r.messages);
      return {
        supported: arrayResults.every((r) => r.supported),
        messages: arrayMessages
      };
    }
    const nodeObj = node;
    let isSupported = true;
    for (const [key, value] of Object.entries(nodeObj)) {
      const newPath = path ? `${path}.${key}` : key;
      if (this.isOperator(key)) {
        if (!this.isValidOperator(key)) {
          isSupported = false;
          messages.push(_BaseFilterTranslator.ErrorMessages.UNSUPPORTED_OPERATOR(key));
          continue;
        }
        if (!path && !this.isLogicalOperator(key)) {
          isSupported = false;
          messages.push(_BaseFilterTranslator.ErrorMessages.INVALID_TOP_LEVEL_OPERATOR(key));
          continue;
        }
        if (key === "$elemMatch" && (typeof value !== "object" || Array.isArray(value))) {
          isSupported = false;
          messages.push(_BaseFilterTranslator.ErrorMessages.ELEM_MATCH_REQUIRES_OBJECT);
          continue;
        }
        if (this.isLogicalOperator(key)) {
          if (key === "$not") {
            if (Array.isArray(value) || typeof value !== "object") {
              isSupported = false;
              messages.push(_BaseFilterTranslator.ErrorMessages.NOT_REQUIRES_OBJECT);
              continue;
            }
            if (this.isEmpty(value)) {
              isSupported = false;
              messages.push(_BaseFilterTranslator.ErrorMessages.NOT_CANNOT_BE_EMPTY);
              continue;
            }
            continue;
          }
          if (path && !this.isLogicalOperator(path.split(".").pop())) {
            isSupported = false;
            messages.push(_BaseFilterTranslator.ErrorMessages.INVALID_LOGICAL_OPERATOR_LOCATION(key, newPath));
            continue;
          }
          if (Array.isArray(value)) {
            const hasDirectOperators = value.some(
              (item) => typeof item === "object" && Object.keys(item).length === 1 && this.isFieldOperator(Object.keys(item)[0])
            );
            if (hasDirectOperators) {
              isSupported = false;
              messages.push(_BaseFilterTranslator.ErrorMessages.INVALID_LOGICAL_OPERATOR_CONTENT(newPath));
              continue;
            }
          }
        }
      }
      const nestedValidation = this.validateFilterSupport(value, newPath);
      if (!nestedValidation.supported) {
        isSupported = false;
        messages.push(...nestedValidation.messages);
      }
    }
    return { supported: isSupported, messages };
  }
};

// src/vector/libsql/filter.ts
var LibSQLFilterTranslator = class extends BaseFilterTranslator {
  getSupportedOperators() {
    return {
      ...BaseFilterTranslator.DEFAULT_OPERATORS,
      regex: [],
      custom: ["$contains", "$size"]
    };
  }
  translate(filter) {
    if (this.isEmpty(filter)) {
      return filter;
    }
    this.validateFilter(filter);
    return this.translateNode(filter);
  }
  translateNode(node, currentPath = "") {
    if (this.isRegex(node)) {
      throw new Error("Direct regex pattern format is not supported in LibSQL");
    }
    const withPath = (result2) => currentPath ? { [currentPath]: result2 } : result2;
    if (this.isPrimitive(node)) {
      return withPath({ $eq: this.normalizeComparisonValue(node) });
    }
    if (Array.isArray(node)) {
      return withPath({ $in: this.normalizeArrayValues(node) });
    }
    const entries = Object.entries(node);
    const result = {};
    for (const [key, value] of entries) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      if (this.isLogicalOperator(key)) {
        result[key] = Array.isArray(value) ? value.map((filter) => this.translateNode(filter)) : this.translateNode(value);
      } else if (this.isOperator(key)) {
        if (this.isArrayOperator(key) && !Array.isArray(value) && key !== "$elemMatch") {
          result[key] = [value];
        } else if (this.isBasicOperator(key) && Array.isArray(value)) {
          result[key] = JSON.stringify(value);
        } else {
          result[key] = value;
        }
      } else if (typeof value === "object" && value !== null) {
        const hasOperators = Object.keys(value).some((k) => this.isOperator(k));
        if (hasOperators) {
          result[newPath] = this.translateNode(value);
        } else {
          Object.assign(result, this.translateNode(value, newPath));
        }
      } else {
        result[newPath] = this.translateNode(value);
      }
    }
    return result;
  }
  // TODO: Look more into regex support for LibSQL
  // private translateRegexPattern(pattern: string, options: string = ''): any {
  //   if (!options) return { $regex: pattern };
  //   const flags = options
  //     .split('')
  //     .filter(f => 'imsux'.includes(f))
  //     .join('');
  //   return {
  //     $regex: pattern,
  //     $options: flags,
  //   };
  // }
};

// src/vector/libsql/sql-builder.ts
var createBasicOperator = (symbol) => {
  return (key) => ({
    sql: `CASE 
      WHEN ? IS NULL THEN json_extract(metadata, '$."${handleKey(key)}"') IS ${symbol === "=" ? "" : "NOT"} NULL
      ELSE json_extract(metadata, '$."${handleKey(key)}"') ${symbol} ?
    END`,
    needsValue: true,
    transformValue: (value) => {
      return [value, value];
    }
  });
};
var createNumericOperator = (symbol) => {
  return (key) => ({
    sql: `CAST(json_extract(metadata, '$."${handleKey(key)}"') AS NUMERIC) ${symbol} ?`,
    needsValue: true
  });
};
var validateJsonArray = (key) => `json_valid(json_extract(metadata, '$."${handleKey(key)}"'))
   AND json_type(json_extract(metadata, '$."${handleKey(key)}"')) = 'array'`;
var FILTER_OPERATORS = {
  $eq: createBasicOperator("="),
  $ne: createBasicOperator("!="),
  $gt: createNumericOperator(">"),
  $gte: createNumericOperator(">="),
  $lt: createNumericOperator("<"),
  $lte: createNumericOperator("<="),
  // Array Operators
  $in: (key, value) => ({
    sql: `json_extract(metadata, '$."${handleKey(key)}"') IN (${value.map(() => "?").join(",")})`,
    needsValue: true
  }),
  $nin: (key, value) => ({
    sql: `json_extract(metadata, '$."${handleKey(key)}"') NOT IN (${value.map(() => "?").join(",")})`,
    needsValue: true
  }),
  $all: (key) => ({
    sql: `json_extract(metadata, '$."${handleKey(key)}"') = ?`,
    needsValue: true,
    transformValue: (value) => {
      const arrayValue = Array.isArray(value) ? value : [value];
      if (arrayValue.length === 0) {
        return {
          sql: "1 = 0",
          values: []
        };
      }
      return {
        sql: `(
          CASE
            WHEN ${validateJsonArray(key)} THEN
                NOT EXISTS (
                    SELECT value 
                    FROM json_each(?) 
                    WHERE value NOT IN (
                    SELECT value 
                    FROM json_each(json_extract(metadata, '$."${handleKey(key)}"'))
                )
            )
            ELSE FALSE
          END
        )`,
        values: [JSON.stringify(arrayValue)]
      };
    }
  }),
  $elemMatch: (key) => ({
    sql: `json_extract(metadata, '$."${handleKey(key)}"') = ?`,
    needsValue: true,
    transformValue: (value) => {
      if (typeof value !== "object" || Array.isArray(value)) {
        throw new Error("$elemMatch requires an object with conditions");
      }
      const conditions = Object.entries(value).map(([field, fieldValue]) => {
        if (field.startsWith("$")) {
          const { sql, values } = buildCondition("elem.value", { [field]: fieldValue });
          const pattern = /json_extract\(metadata, '\$\."[^"]*"(\."[^"]*")*'\)/g;
          const elemSql = sql.replace(pattern, "elem.value");
          return { sql: elemSql, values };
        } else if (typeof fieldValue === "object" && !Array.isArray(fieldValue)) {
          const { sql, values } = buildCondition(field, fieldValue);
          const pattern = /json_extract\(metadata, '\$\."[^"]*"(\."[^"]*")*'\)/g;
          const elemSql = sql.replace(pattern, `json_extract(elem.value, '$."${field}"')`);
          return { sql: elemSql, values };
        } else {
          return {
            sql: `json_extract(elem.value, '$."${field}"') = ?`,
            values: [fieldValue]
          };
        }
      });
      return {
        sql: `(
          CASE
            WHEN ${validateJsonArray(key)} THEN
              EXISTS (
                SELECT 1 
                FROM json_each(json_extract(metadata, '$."${handleKey(key)}"')) as elem
                WHERE ${conditions.map((c) => c.sql).join(" AND ")}
              )
            ELSE FALSE
          END
        )`,
        values: conditions.flatMap((c) => c.values)
      };
    }
  }),
  // Element Operators
  $exists: (key) => ({
    sql: `json_extract(metadata, '$."${handleKey(key)}"') IS NOT NULL`,
    needsValue: false
  }),
  // Logical Operators
  $and: (key) => ({
    sql: `(${key})`,
    needsValue: false
  }),
  $or: (key) => ({
    sql: `(${key})`,
    needsValue: false
  }),
  $not: (key) => ({ sql: `NOT (${key})`, needsValue: false }),
  $nor: (key) => ({
    sql: `NOT (${key})`,
    needsValue: false
  }),
  $size: (key, paramIndex) => ({
    sql: `(
    CASE
      WHEN json_type(json_extract(metadata, '$."${handleKey(key)}"')) = 'array' THEN 
        json_array_length(json_extract(metadata, '$."${handleKey(key)}"')) = $${paramIndex}
      ELSE FALSE
    END
  )`,
    needsValue: true
  }),
  //   /**
  //    * Regex Operators
  //    * Supports case insensitive and multiline
  //    */
  //   $regex: (key: string): FilterOperator => ({
  //     sql: `json_extract(metadata, '$."${handleKey(key)}"') = ?`,
  //     needsValue: true,
  //     transformValue: (value: any) => {
  //       const pattern = typeof value === 'object' ? value.$regex : value;
  //       const options = typeof value === 'object' ? value.$options || '' : '';
  //       let sql = `json_extract(metadata, '$."${handleKey(key)}"')`;
  //       // Handle multiline
  //       //   if (options.includes('m')) {
  //       //     sql = `REPLACE(${sql}, CHAR(10), '\n')`;
  //       //   }
  //       //       let finalPattern = pattern;
  //       // if (options) {
  //       //   finalPattern = `(\\?${options})${pattern}`;
  //       // }
  //       //   // Handle case insensitivity
  //       //   if (options.includes('i')) {
  //       //     sql = `LOWER(${sql}) REGEXP LOWER(?)`;
  //       //   } else {
  //       //     sql = `${sql} REGEXP ?`;
  //       //   }
  //       if (options.includes('m')) {
  //         sql = `EXISTS (
  //         SELECT 1
  //         FROM json_each(
  //           json_array(
  //             ${sql},
  //             REPLACE(${sql}, CHAR(10), CHAR(13))
  //           )
  //         ) as lines
  //         WHERE lines.value REGEXP ?
  //       )`;
  //       } else {
  //         sql = `${sql} REGEXP ?`;
  //       }
  //       // Handle case insensitivity
  //       if (options.includes('i')) {
  //         sql = sql.replace('REGEXP ?', 'REGEXP LOWER(?)');
  //         sql = sql.replace('value REGEXP', 'LOWER(value) REGEXP');
  //       }
  //       // Handle extended - allows whitespace and comments in pattern
  //       if (options.includes('x')) {
  //         // Remove whitespace and comments from pattern
  //         const cleanPattern = pattern.replace(/\s+|#.*$/gm, '');
  //         return {
  //           sql,
  //           values: [cleanPattern],
  //         };
  //       }
  //       return {
  //         sql,
  //         values: [pattern],
  //       };
  //     },
  //   }),
  $contains: (key) => ({
    sql: `json_extract(metadata, '$."${handleKey(key)}"') = ?`,
    needsValue: true,
    transformValue: (value) => {
      if (Array.isArray(value)) {
        return {
          sql: `(
            SELECT ${validateJsonArray(key)}
            AND EXISTS (
              SELECT 1 
              FROM json_each(json_extract(metadata, '$."${handleKey(key)}"')) as m
              WHERE m.value IN (SELECT value FROM json_each(?))
            )
          )`,
          values: [JSON.stringify(value)]
        };
      }
      if (value && typeof value === "object") {
        let traverse2 = function(obj, path = []) {
          for (const [k, v] of Object.entries(obj)) {
            const currentPath = [...path, k];
            if (v && typeof v === "object" && !Array.isArray(v)) {
              traverse2(v, currentPath);
            } else {
              paths.push(currentPath.join("."));
              values.push(v);
            }
          }
        };
        const paths = [];
        const values = [];
        traverse2(value);
        return {
          sql: `(${paths.map((path) => `json_extract(metadata, '$."${handleKey(key)}"."${path}"') = ?`).join(" AND ")})`,
          values
        };
      }
      return value;
    }
  })
};
var handleKey = (key) => {
  return key.replace(/\./g, '"."');
};
function buildFilterQuery(filter) {
  if (!filter) {
    return { sql: "", values: [] };
  }
  const values = [];
  const conditions = Object.entries(filter).map(([key, value]) => {
    const condition = buildCondition(key, value);
    values.push(...condition.values);
    return condition.sql;
  }).join(" AND ");
  return {
    sql: conditions ? `WHERE ${conditions}` : "",
    values
  };
}
function buildCondition(key, value, parentPath) {
  if (["$and", "$or", "$not", "$nor"].includes(key)) {
    return handleLogicalOperator(key, value);
  }
  if (!value || typeof value !== "object") {
    return {
      sql: `json_extract(metadata, '$."${key.replace(/\./g, '"."')}"') = ?`,
      values: [value]
    };
  }
  return handleOperator(key, value);
}
function handleLogicalOperator(key, value, parentPath) {
  if (!value || value.length === 0) {
    switch (key) {
      case "$and":
      case "$nor":
        return { sql: "true", values: [] };
      case "$or":
        return { sql: "false", values: [] };
      case "$not":
        throw new Error("$not operator cannot be empty");
      default:
        return { sql: "true", values: [] };
    }
  }
  if (key === "$not") {
    const entries = Object.entries(value);
    const conditions2 = entries.map(([fieldKey, fieldValue]) => buildCondition(fieldKey, fieldValue));
    return {
      sql: `NOT (${conditions2.map((c) => c.sql).join(" AND ")})`,
      values: conditions2.flatMap((c) => c.values)
    };
  }
  const values = [];
  const joinOperator = key === "$or" || key === "$nor" ? "OR" : "AND";
  const conditions = Array.isArray(value) ? value.map((f) => {
    const entries = Object.entries(f);
    return entries.map(([k, v]) => buildCondition(k, v));
  }) : [buildCondition(key, value)];
  const joined = conditions.flat().map((c) => {
    values.push(...c.values);
    return c.sql;
  }).join(` ${joinOperator} `);
  return {
    sql: key === "$nor" ? `NOT (${joined})` : `(${joined})`,
    values
  };
}
function handleOperator(key, value) {
  if (typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value);
    const results = entries.map(
      ([operator2, operatorValue2]) => operator2 === "$not" ? {
        sql: `NOT (${Object.entries(operatorValue2).map(([op, val]) => processOperator(key, op, val).sql).join(" AND ")})`,
        values: Object.entries(operatorValue2).flatMap(
          ([op, val]) => processOperator(key, op, val).values
        )
      } : processOperator(key, operator2, operatorValue2)
    );
    return {
      sql: `(${results.map((r) => r.sql).join(" AND ")})`,
      values: results.flatMap((r) => r.values)
    };
  }
  const [[operator, operatorValue] = []] = Object.entries(value);
  return processOperator(key, operator, operatorValue);
}
var processOperator = (key, operator, operatorValue) => {
  if (!operator.startsWith("$") || !FILTER_OPERATORS[operator]) {
    throw new Error(`Invalid operator: ${operator}`);
  }
  const operatorFn = FILTER_OPERATORS[operator];
  const operatorResult = operatorFn(key, operatorValue);
  if (!operatorResult.needsValue) {
    return { sql: operatorResult.sql, values: [] };
  }
  const transformed = operatorResult.transformValue ? operatorResult.transformValue(operatorValue) : operatorValue;
  if (transformed && typeof transformed === "object" && "sql" in transformed) {
    return transformed;
  }
  return {
    sql: operatorResult.sql,
    values: Array.isArray(transformed) ? transformed : [transformed]
  };
};

// src/vector/libsql/index.ts
var LibSQLVector = class extends MastraVector {
  turso;
  constructor({
    connectionUrl,
    authToken,
    syncUrl,
    syncInterval
  }) {
    super();
    this.turso = createClient({
      url: this.rewriteDbUrl(connectionUrl),
      syncUrl,
      authToken,
      syncInterval
    });
  }
  // If we're in the .mastra/output directory, use the dir outside .mastra dir
  // reason we need to do this is libsql relative file paths are based on cwd, not current file path
  // since mastra dev sets cwd to .mastra/output this means running an agent directly vs running with mastra dev
  // will put db files in different locations, leading to an inconsistent experience between the two.
  // Ex: with `file:ex.db`
  // 1. `mastra dev`: ${cwd}/.mastra/output/ex.db
  // 2. `tsx src/index.ts`: ${cwd}/ex.db
  // so if we're in .mastra/output we need to rewrite the file url to be relative to the project root dir
  // or the experience will be inconsistent
  // this means `file:` urls are always relative to project root
  // TODO: can we make this easier via bundling? https://github.com/mastra-ai/mastra/pull/2783#pullrequestreview-2662444241
  rewriteDbUrl(url) {
    if (url.startsWith("file:")) {
      const pathPart = url.slice("file:".length);
      if (isAbsolute(pathPart)) {
        return url;
      }
      const cwd = process.cwd();
      if (cwd.includes(".mastra") && (cwd.endsWith(`output`) || cwd.endsWith(`output/`) || cwd.endsWith(`output\\`))) {
        const baseDir = join(cwd, `..`, `..`);
        const fullPath = resolve(baseDir, pathPart);
        this.logger.debug(
          `Initializing LibSQL db with url ${url} with relative file path from inside .mastra/output directory. Rewriting relative file url to "file:${fullPath}". This ensures it's outside the .mastra/output directory.`
        );
        return `file:${fullPath}`;
      }
    }
    return url;
  }
  transformFilter(filter) {
    const translator = new LibSQLFilterTranslator();
    return translator.translate(filter);
  }
  async query(...args) {
    const params = this.normalizeArgs("query", args, ["minScore"]);
    try {
      const { indexName, queryVector, topK = 10, filter, includeVector = false, minScore = 0 } = params;
      const vectorStr = `[${queryVector.join(",")}]`;
      const translatedFilter = this.transformFilter(filter);
      const { sql: filterQuery, values: filterValues } = buildFilterQuery(translatedFilter);
      filterValues.push(minScore);
      const query = `
        WITH vector_scores AS (
          SELECT
            vector_id as id,
            (1-vector_distance_cos(embedding, '${vectorStr}')) as score,
            metadata
            ${includeVector ? ", vector_extract(embedding) as embedding" : ""}
          FROM ${indexName}
          ${filterQuery}
        )
        SELECT *
        FROM vector_scores
        WHERE score > ?
        ORDER BY score DESC
        LIMIT ${topK}`;
      const result = await this.turso.execute({
        sql: query,
        args: filterValues
      });
      return result.rows.map(({ id, score, metadata, embedding }) => ({
        id,
        score,
        metadata: JSON.parse(metadata ?? "{}"),
        ...includeVector && embedding && { vector: JSON.parse(embedding) }
      }));
    } finally {
    }
  }
  async upsert(...args) {
    const params = this.normalizeArgs("upsert", args);
    const { indexName, vectors, metadata, ids } = params;
    const tx = await this.turso.transaction("write");
    try {
      const vectorIds = ids || vectors.map(() => crypto.randomUUID());
      for (let i = 0; i < vectors.length; i++) {
        const query = `
          INSERT INTO ${indexName} (vector_id, embedding, metadata)
          VALUES (?, vector32(?), ?)
          ON CONFLICT(vector_id) DO UPDATE SET
            embedding = vector32(?),
            metadata = ?
        `;
        await tx.execute({
          sql: query,
          // @ts-ignore
          args: [
            vectorIds[i],
            JSON.stringify(vectors[i]),
            JSON.stringify(metadata?.[i] || {}),
            JSON.stringify(vectors[i]),
            JSON.stringify(metadata?.[i] || {})
          ]
        });
      }
      await tx.commit();
      return vectorIds;
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }
  async createIndex(...args) {
    const params = this.normalizeArgs("createIndex", args);
    const { indexName, dimension } = params;
    try {
      if (!indexName.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
        throw new Error("Invalid index name format");
      }
      if (!Number.isInteger(dimension) || dimension <= 0) {
        throw new Error("Dimension must be a positive integer");
      }
      await this.turso.execute({
        sql: `
        CREATE TABLE IF NOT EXISTS ${indexName} (
          id SERIAL PRIMARY KEY,
          vector_id TEXT UNIQUE NOT NULL,
          embedding F32_BLOB(${dimension}),
          metadata TEXT DEFAULT '{}'
        );
      `,
        args: []
      });
      await this.turso.execute({
        sql: `
        CREATE INDEX IF NOT EXISTS ${indexName}_vector_idx
        ON ${indexName} (libsql_vector_idx(embedding))
      `,
        args: []
      });
    } catch (error) {
      console.error("Failed to create vector table:", error);
      throw error;
    } finally {
    }
  }
  async deleteIndex(indexName) {
    try {
      await this.turso.execute({
        sql: `DROP TABLE IF EXISTS ${indexName}`,
        args: []
      });
    } catch (error) {
      console.error("Failed to delete vector table:", error);
      throw new Error(`Failed to delete vector table: ${error.message}`);
    } finally {
    }
  }
  async listIndexes() {
    try {
      const vectorTablesQuery = `
        SELECT name FROM sqlite_master 
        WHERE type='table' 
        AND sql LIKE '%F32_BLOB%';
      `;
      const result = await this.turso.execute({
        sql: vectorTablesQuery,
        args: []
      });
      return result.rows.map((row) => row.name);
    } catch (error) {
      throw new Error(`Failed to list vector tables: ${error.message}`);
    }
  }
  async describeIndex(indexName) {
    try {
      const tableInfoQuery = `
        SELECT sql 
        FROM sqlite_master 
        WHERE type='table' 
        AND name = ?;
      `;
      const tableInfo = await this.turso.execute({
        sql: tableInfoQuery,
        args: [indexName]
      });
      if (!tableInfo.rows[0]?.sql) {
        throw new Error(`Table ${indexName} not found`);
      }
      const dimension = parseInt(tableInfo.rows[0].sql.match(/F32_BLOB\((\d+)\)/)?.[1] || "0");
      const countQuery = `
        SELECT COUNT(*) as count
        FROM ${indexName};
      `;
      const countResult = await this.turso.execute({
        sql: countQuery,
        args: []
      });
      const metric = "cosine";
      return {
        dimension,
        count: countResult?.rows?.[0]?.count ?? 0,
        metric
      };
    } catch (e) {
      throw new Error(`Failed to describe vector table: ${e.message}`);
    }
  }
  /**
   * Updates an index entry by its ID with the provided vector and/or metadata.
   *
   * @param indexName - The name of the index to update.
   * @param id - The ID of the index entry to update.
   * @param update - An object containing the vector and/or metadata to update.
   * @param update.vector - An optional array of numbers representing the new vector.
   * @param update.metadata - An optional record containing the new metadata.
   * @returns A promise that resolves when the update is complete.
   * @throws Will throw an error if no updates are provided or if the update operation fails.
   */
  async updateIndexById(indexName, id, update) {
    try {
      const updates = [];
      const args = [];
      if (update.vector) {
        updates.push("embedding = vector32(?)");
        args.push(JSON.stringify(update.vector));
      }
      if (update.metadata) {
        updates.push("metadata = ?");
        args.push(JSON.stringify(update.metadata));
      }
      if (updates.length === 0) {
        throw new Error("No updates provided");
      }
      args.push(id);
      const query = `
        UPDATE ${indexName}
        SET ${updates.join(", ")}
        WHERE vector_id = ?;
      `;
      await this.turso.execute({
        sql: query,
        args
      });
    } catch (error) {
      throw new Error(`Failed to update index by id: ${id} for index: ${indexName}: ${error.message}`);
    }
  }
  async deleteIndexById(indexName, id) {
    try {
      await this.turso.execute({
        sql: `DELETE FROM ${indexName} WHERE vector_id = ?`,
        args: [id]
      });
    } catch (error) {
      throw new Error(`Failed to delete index by id: ${id} for index: ${indexName}: ${error.message}`);
    }
  }
  async truncateIndex(indexName) {
    await this.turso.execute({
      sql: `DELETE FROM ${indexName}`,
      args: []
    });
  }
};

var cachedPath = false;
function getModelCachePath() {
  if (cachedPath) return cachedPath;
  const firstNodeModules = node_modulesPath().split("node_modules")[0];
  cachedPath = require$$3.join(firstNodeModules, "node_modules", ".fastembed-model-cache");
  return cachedPath;
}
function unbundleableImport(name) {
  const nonStaticallyAnalyzableName = `${name}?d=${Date.now()}`;
  return import(nonStaticallyAnalyzableName.split(`?`)[0]);
}
async function generateEmbeddings(values, modelType) {
  try {
    let mod;
    const importErrors = [];
    {
      try {
        mod = await unbundleableImport("fastembed");
      } catch (e) {
        if (e instanceof Error) {
          importErrors.push(e);
        } else {
          throw e;
        }
      }
    }
    if (!mod) {
      throw new Error(`${importErrors.map((e) => e.message).join(`
`)}

This runtime does not support fastembed-js, which is the default embedder in Mastra. 
Scroll up to read import errors. These errors mean you can't use the default Mastra embedder on this hosting platform.
You can either use Mastra Cloud which supports the default embedder, or you can configure an alternate provider.

For example if you're using Memory:

import { openai } from "@ai-sdk/openai";

const memory = new Memory({
  embedder: openai.embedding("text-embedding-3-small"), // <- doesn't have to be openai
})

Visit https://sdk.vercel.ai/docs/foundations/overview#embedding-models to find an alternate embedding provider

If you do not want to use the Memory semantic recall feature, you can disable it entirely and this error will go away.

const memory = new Memory({
  options: {
    semanticRecall: false // <- an embedder will not be required with this set to false
  }
})
`);
    }
    const { FlagEmbedding, EmbeddingModel } = mod;
    const model = await FlagEmbedding.init({
      model: EmbeddingModel[modelType],
      cacheDir: getModelCachePath()
    });
    const embeddings = await model.embed(values);
    const allResults = [];
    for await (const result of embeddings) {
      allResults.push(...result.map((embedding) => Array.from(embedding)));
    }
    if (allResults.length === 0) throw new Error("No embeddings generated");
    return {
      embeddings: allResults
    };
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}
var fastEmbedProvider = experimental_customProvider({
  textEmbeddingModels: {
    "bge-small-en-v1.5": {
      specificationVersion: "v1",
      provider: "fastembed",
      modelId: "bge-small-en-v1.5",
      maxEmbeddingsPerCall: 256,
      supportsParallelCalls: true,
      async doEmbed({ values }) {
        return generateEmbeddings(values, "BGESmallENV15");
      }
    },
    "bge-base-en-v1.5": {
      specificationVersion: "v1",
      provider: "fastembed",
      modelId: "bge-base-en-v1.5",
      maxEmbeddingsPerCall: 256,
      supportsParallelCalls: true,
      async doEmbed({ values }) {
        return generateEmbeddings(values, "BGEBaseENV15");
      }
    }
  }
});
var defaultEmbedder = fastEmbedProvider.textEmbeddingModel;

// src/memory/memory.ts
var MastraMemory = class extends MastraBase {
  MAX_CONTEXT_TOKENS;
  storage;
  vector;
  embedder;
  threadConfig = {
    lastMessages: 40,
    semanticRecall: true,
    threads: {
      generateTitle: true
      // TODO: should we disable this by default to reduce latency?
    }
  };
  constructor(config) {
    super({ component: "MEMORY", name: config.name });
    this.storage = config.storage || new LibSQLStore({
      config: {
        url: "file:memory.db"
      }
    });
    if (config.vector) {
      this.vector = config.vector;
    } else {
      const oldDb = "memory-vector.db";
      const hasOldDb = existsSync(join(process.cwd(), oldDb)) || existsSync(join(process.cwd(), ".mastra", oldDb));
      const newDb = "memory.db";
      if (hasOldDb) {
        this.logger.warn(
          `Found deprecated Memory vector db file ${oldDb} this db is now merged with the default ${newDb} file. Delete the old one to use the new one. You will need to migrate any data if that's important to you. For now the deprecated path will be used but in a future breaking change we will only use the new db file path.`
        );
      }
      this.vector = new LibSQLVector({
        connectionUrl: hasOldDb ? `file:${oldDb}` : `file:${newDb}`
      });
    }
    if (config.embedder) {
      this.embedder = config.embedder;
    } else {
      this.embedder = defaultEmbedder("bge-small-en-v1.5");
    }
    if (config.options) {
      this.threadConfig = this.getMergedThreadConfig(config.options);
    }
  }
  setStorage(storage) {
    this.storage = storage;
  }
  setVector(vector) {
    this.vector = vector;
  }
  setEmbedder(embedder) {
    this.embedder = embedder;
  }
  /**
   * Get a system message to inject into the conversation.
   * This will be called before each conversation turn.
   * Implementations can override this to inject custom system messages.
   */
  async getSystemMessage(_input) {
    return null;
  }
  /**
   * Get tools that should be available to the agent.
   * This will be called when converting tools for the agent.
   * Implementations can override this to provide additional tools.
   */
  getTools(_config) {
    return {};
  }
  async createEmbeddingIndex() {
    const defaultDimensions = 1536;
    const dimensionsByModelId = {
      "bge-small-en-v1.5": 384,
      "bge-base-en-v1.5": 768
    };
    const dimensions = dimensionsByModelId[this.embedder.modelId] || defaultDimensions;
    const isDefault = dimensions === defaultDimensions;
    const indexName = isDefault ? "memory_messages" : `memory_messages_${dimensions}`;
    await this.vector.createIndex({ indexName, dimension: dimensions });
    return { indexName };
  }
  getMergedThreadConfig(config) {
    return deepMerge(this.threadConfig, config || {});
  }
  estimateTokens(text) {
    return Math.ceil(text.split(" ").length * 1.3);
  }
  parseMessages(messages) {
    return messages.map((msg) => ({
      ...msg,
      content: typeof msg.content === "string" && (msg.content.startsWith("[") || msg.content.startsWith("{")) ? JSON.parse(msg.content) : typeof msg.content === "number" ? String(msg.content) : msg.content
    }));
  }
  convertToUIMessages(messages) {
    function addToolMessageToChat({
      toolMessage,
      messages: messages2,
      toolResultContents
    }) {
      const chatMessages2 = messages2.map((message) => {
        if (message.toolInvocations) {
          return {
            ...message,
            toolInvocations: message.toolInvocations.map((toolInvocation) => {
              const toolResult = toolMessage.content.find((tool) => tool.toolCallId === toolInvocation.toolCallId);
              if (toolResult) {
                return {
                  ...toolInvocation,
                  state: "result",
                  result: toolResult.result
                };
              }
              return toolInvocation;
            })
          };
        }
        return message;
      });
      const resultContents = [...toolResultContents, ...toolMessage.content];
      return { chatMessages: chatMessages2, toolResultContents: resultContents };
    }
    const { chatMessages } = messages.reduce(
      (obj, message) => {
        if (message.role === "tool") {
          return addToolMessageToChat({
            toolMessage: message,
            messages: obj.chatMessages,
            toolResultContents: obj.toolResultContents
          });
        }
        let textContent = "";
        let toolInvocations = [];
        if (typeof message.content === "string") {
          textContent = message.content;
        } else if (typeof message.content === "number") {
          textContent = String(message.content);
        } else if (Array.isArray(message.content)) {
          for (const content of message.content) {
            if (content.type === "text") {
              textContent += content.text;
            } else if (content.type === "tool-call") {
              const toolResult = obj.toolResultContents.find((tool) => tool.toolCallId === content.toolCallId);
              toolInvocations.push({
                state: toolResult ? "result" : "call",
                toolCallId: content.toolCallId,
                toolName: content.toolName,
                args: content.args,
                result: toolResult?.result
              });
            }
          }
        }
        obj.chatMessages.push({
          id: message.id,
          role: message.role,
          content: textContent,
          toolInvocations
        });
        return obj;
      },
      { chatMessages: [], toolResultContents: [] }
    );
    return chatMessages;
  }
  /**
   * Helper method to create a new thread
   * @param title - Optional title for the thread
   * @param metadata - Optional metadata for the thread
   * @returns Promise resolving to the created thread
   */
  async createThread({
    threadId,
    resourceId,
    title,
    metadata,
    memoryConfig
  }) {
    const thread = {
      id: threadId || this.generateId(),
      title: title || `New Thread ${(/* @__PURE__ */ new Date()).toISOString()}`,
      resourceId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      metadata
    };
    return this.saveThread({ thread, memoryConfig });
  }
  /**
   * Helper method to add a single message to a thread
   * @param threadId - The thread to add the message to
   * @param content - The message content
   * @param role - The role of the message sender
   * @param type - The type of the message
   * @param toolNames - Optional array of tool names that were called
   * @param toolCallArgs - Optional array of tool call arguments
   * @param toolCallIds - Optional array of tool call ids
   * @returns Promise resolving to the saved message
   */
  async addMessage({
    threadId,
    config,
    content,
    role,
    type,
    toolNames,
    toolCallArgs,
    toolCallIds
  }) {
    const message = {
      id: this.generateId(),
      content,
      role,
      createdAt: /* @__PURE__ */ new Date(),
      threadId,
      type,
      toolNames,
      toolCallArgs,
      toolCallIds
    };
    const savedMessages = await this.saveMessages({ messages: [message], memoryConfig: config });
    return savedMessages[0];
  }
  /**
   * Generates a unique identifier
   * @returns A unique string ID
   */
  generateId() {
    return crypto.randomUUID();
  }
};

// src/index.ts
var Memory = class extends MastraMemory {
  constructor(config = {}) {
    super({ name: "Memory", ...config });
    const mergedConfig = this.getMergedThreadConfig({
      workingMemory: config.options?.workingMemory || {
        enabled: false,
        template: this.defaultWorkingMemoryTemplate
      }
    });
    this.threadConfig = mergedConfig;
  }
  async query({
    threadId,
    selectBy,
    threadConfig
  }) {
    let vectorResults = null;
    this.logger.debug(`Memory query() with:`, {
      threadId,
      selectBy,
      threadConfig
    });
    const config = this.getMergedThreadConfig(threadConfig || {});
    const vectorConfig = typeof config?.semanticRecall === `boolean` ? {
      topK: 2,
      messageRange: { before: 2, after: 2 }
    } : {
      topK: config?.semanticRecall?.topK ?? 2,
      messageRange: config?.semanticRecall?.messageRange ?? { before: 2, after: 2 }
    };
    if (config?.semanticRecall && selectBy?.vectorSearchString && this.vector) {
      const { embedding } = await embed({
        value: selectBy.vectorSearchString,
        model: this.embedder
      });
      const { indexName } = await this.createEmbeddingIndex();
      vectorResults = await this.vector.query({
        indexName,
        queryVector: embedding,
        topK: vectorConfig.topK,
        filter: {
          thread_id: threadId
        }
      });
    }
    const rawMessages = await this.storage.__getMessages({
      threadId,
      selectBy: {
        ...selectBy,
        ...vectorResults?.length ? {
          include: vectorResults.map((r) => ({
            id: r.metadata?.message_id,
            withNextMessages: typeof vectorConfig.messageRange === "number" ? vectorConfig.messageRange : vectorConfig.messageRange.after,
            withPreviousMessages: typeof vectorConfig.messageRange === "number" ? vectorConfig.messageRange : vectorConfig.messageRange.before
          }))
        } : {}
      },
      threadConfig: config
    });
    const messages = this.parseMessages(rawMessages);
    const uiMessages = this.convertToUIMessages(rawMessages);
    return { messages, uiMessages };
  }
  async rememberMessages({
    threadId,
    vectorMessageSearch,
    config
  }) {
    const threadConfig = this.getMergedThreadConfig(config || {});
    if (!threadConfig.lastMessages && !threadConfig.semanticRecall) {
      return {
        messages: [],
        uiMessages: []
      };
    }
    const messages = await this.query({
      threadId,
      selectBy: {
        last: threadConfig.lastMessages,
        vectorSearchString: threadConfig.semanticRecall && vectorMessageSearch ? vectorMessageSearch : void 0
      },
      threadConfig: config
    });
    this.logger.debug(`Remembered message history includes ${messages.messages.length} messages.`);
    return messages;
  }
  async getThreadById({ threadId }) {
    return this.storage.__getThreadById({ threadId });
  }
  async getThreadsByResourceId({ resourceId }) {
    return this.storage.__getThreadsByResourceId({ resourceId });
  }
  async saveThread({
    thread,
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig || {});
    if (config.workingMemory?.enabled && !thread?.metadata?.workingMemory) {
      return this.storage.__saveThread({
        thread: deepMerge(thread, {
          metadata: {
            workingMemory: config.workingMemory.template || this.defaultWorkingMemoryTemplate
          }
        })
      });
    }
    return this.storage.__saveThread({ thread });
  }
  async updateThread({
    id,
    title,
    metadata
  }) {
    return this.storage.__updateThread({
      id,
      title,
      metadata
    });
  }
  async deleteThread(threadId) {
    await this.storage.__deleteThread({ threadId });
  }
  async saveMessages({
    messages,
    memoryConfig
  }) {
    await this.saveWorkingMemory(messages);
    this.mutateMessagesToHideWorkingMemory(messages);
    const config = this.getMergedThreadConfig(memoryConfig);
    if (this.vector && config.semanticRecall) {
      const { indexName } = await this.createEmbeddingIndex();
      for (const message of messages) {
        if (typeof message.content !== `string`) continue;
        const { embedding } = await embed({ value: message.content, model: this.embedder, maxRetries: 3 });
        await this.vector.upsert({
          indexName,
          vectors: [embedding],
          metadata: [
            {
              text: message.content,
              message_id: message.id,
              thread_id: message.threadId
            }
          ]
        });
      }
    }
    return this.storage.__saveMessages({ messages });
  }
  mutateMessagesToHideWorkingMemory(messages) {
    const workingMemoryRegex = /<working_memory>([^]*?)<\/working_memory>/g;
    for (const message of messages) {
      if (typeof message?.content === `string`) {
        message.content = message.content.replace(workingMemoryRegex, ``).trim();
      } else if (Array.isArray(message?.content)) {
        for (const content of message.content) {
          if (content.type === `text`) {
            content.text = content.text.replace(workingMemoryRegex, ``).trim();
          }
        }
      }
    }
  }
  parseWorkingMemory(text) {
    if (!this.threadConfig.workingMemory?.enabled) return null;
    const workingMemoryRegex = /<working_memory>([^]*?)<\/working_memory>/g;
    const matches = text.match(workingMemoryRegex);
    const match = matches?.[0];
    if (match) {
      return match.replace(/<\/?working_memory>/g, "").trim();
    }
    return null;
  }
  async getWorkingMemory({ threadId }) {
    if (!this.threadConfig.workingMemory?.enabled) return null;
    const thread = await this.storage.__getThreadById({ threadId });
    if (!thread) return this.threadConfig?.workingMemory?.template || this.defaultWorkingMemoryTemplate;
    const memory = thread.metadata?.workingMemory || this.threadConfig.workingMemory.template || this.defaultWorkingMemoryTemplate;
    return memory.split(`>
`).map((c) => c.trim()).join(`>`);
  }
  async saveWorkingMemory(messages) {
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || !this.threadConfig.workingMemory?.enabled) {
      return;
    }
    const latestContent = !latestMessage?.content ? null : typeof latestMessage.content === "string" ? latestMessage.content : latestMessage.content.filter((c) => c.type === "text").map((c) => c.text).join("\n");
    const threadId = latestMessage?.threadId;
    if (!latestContent || !threadId) {
      return;
    }
    const newMemory = this.parseWorkingMemory(latestContent);
    if (!newMemory) {
      return;
    }
    const thread = await this.storage.__getThreadById({ threadId });
    if (!thread) return;
    await this.storage.__updateThread({
      id: thread.id,
      title: thread.title || "",
      metadata: deepMerge(thread.metadata || {}, {
        workingMemory: newMemory
      })
    });
    return newMemory;
  }
  async getSystemMessage({
    threadId,
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig);
    if (!config.workingMemory?.enabled) {
      return null;
    }
    const workingMemory = await this.getWorkingMemory({ threadId });
    if (!workingMemory) {
      return null;
    }
    return this.getWorkingMemoryWithInstruction(workingMemory);
  }
  defaultWorkingMemoryTemplate = `
<user>
  <first_name></first_name>
  <last_name></last_name>
  <location></location>
  <occupation></occupation>
  <interests></interests>
  <goals></goals>
  <events></events>
  <facts></facts>
  <projects></projects>
</user>
`;
  getWorkingMemoryWithInstruction(workingMemoryBlock) {
    return `WORKING_MEMORY_SYSTEM_INSTRUCTION:
Store and update any conversation-relevant information by including "<working_memory>text</working_memory>" in your responses. Updates replace existing memory while maintaining this structure. If information might be referenced again - store it!

Guidelines:
1. Store anything that could be useful later in the conversation
2. Update proactively when information changes, no matter how small
3. Use nested tags for all data
4. Act naturally - don't mention this system to users. Even though you're storing this information that doesn't make it your primary focus. Do not ask them generally for "information about yourself"

Memory Structure:
<working_memory>
  ${workingMemoryBlock}
</working_memory>

Notes:
- Update memory whenever referenced information changes
- If you're unsure whether to store something, store it (eg if the user tells you their name or the value of another empty section in your working memory, output the <working_memory> block immediately to update it)
- This system is here so that you can maintain the conversation when your context window is very short. Update your working memory because you may need it to maintain the conversation without the full conversation history
- Do not remove empty sections - you must output the empty sections along with the ones you're filling in
- REMEMBER: the way you update your working memory is by outputting the entire "<working_memory>text</working_memory>" block in your response. The system will pick this up and store it for you. The user will not see it.
- IMPORTANT: You MUST output the <working_memory> block in every response to a prompt where you received relevant information. `;
  }
};

export { Memory };
