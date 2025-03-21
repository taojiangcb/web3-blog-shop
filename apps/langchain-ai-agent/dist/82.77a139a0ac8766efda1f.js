"use strict";
exports.id = 82;
exports.ids = [82];
exports.modules = {

/***/ 2082:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Od: () => (/* reexport */ ai/* AIMessage */.Od),
  XQ: () => (/* reexport */ base/* BaseMessage */.XQ),
  cM: () => (/* reexport */ chat/* ChatMessage */.cM),
  xc: () => (/* reexport */ human/* HumanMessage */.xc),
  tn: () => (/* reexport */ system/* SystemMessage */.tn),
  K0: () => (/* reexport */ utils/* coerceMessageLikeToMessage */.K0),
  ny: () => (/* reexport */ base/* isBaseMessage */.ny)
});

// UNUSED EXPORTS: AIMessageChunk, BaseMessageChunk, ChatMessageChunk, FunctionMessage, FunctionMessageChunk, HumanMessageChunk, RemoveMessage, SystemMessageChunk, ToolMessage, ToolMessageChunk, _isMessageFieldWithRole, _mergeDicts, _mergeLists, _mergeObj, _mergeStatus, convertToChunk, defaultTextSplitter, filterMessages, getBufferString, isAIMessage, isAIMessageChunk, isBaseMessageChunk, isChatMessage, isChatMessageChunk, isFunctionMessage, isFunctionMessageChunk, isHumanMessage, isHumanMessageChunk, isOpenAIToolCallArray, isSystemMessage, isSystemMessageChunk, isToolMessage, isToolMessageChunk, mapChatMessagesToStoredMessages, mapStoredMessageToChatMessage, mapStoredMessagesToChatMessages, mergeContent, mergeMessageRuns, trimMessages

// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/ai.js
var ai = __webpack_require__(6826);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/base.js
var base = __webpack_require__(3045);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/chat.js
var chat = __webpack_require__(9498);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/function.js
var messages_function = __webpack_require__(1460);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/human.js
var human = __webpack_require__(6179);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/system.js
var system = __webpack_require__(7977);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/utils.js
var utils = __webpack_require__(2943);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/runnables/base.js + 8 modules
var runnables_base = __webpack_require__(5097);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/modifier.js

/**
 * Message responsible for deleting other messages.
 */
class RemoveMessage extends base/* BaseMessage */.XQ {
    constructor(fields) {
        super({
            ...fields,
            content: "",
        });
        /**
         * The ID of the message to remove.
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = fields.id;
    }
    _getType() {
        return "remove";
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            id: this.id,
        };
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/tool.js
var tool = __webpack_require__(6570);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/transformers.js










const _isMessageType = (msg, types) => {
    const typesAsStrings = [
        ...new Set(types?.map((t) => {
            if (typeof t === "string") {
                return t;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const instantiatedMsgClass = new t({});
            if (!("getType" in instantiatedMsgClass) ||
                typeof instantiatedMsgClass.getType !== "function") {
                throw new Error("Invalid type provided.");
            }
            return instantiatedMsgClass.getType();
        })),
    ];
    const msgType = msg.getType();
    return typesAsStrings.some((t) => t === msgType);
};
function filterMessages(messagesOrOptions, options) {
    if (Array.isArray(messagesOrOptions)) {
        return _filterMessages(messagesOrOptions, options);
    }
    return RunnableLambda.from((input) => {
        return _filterMessages(input, messagesOrOptions);
    });
}
function _filterMessages(messages, options = {}) {
    const { includeNames, excludeNames, includeTypes, excludeTypes, includeIds, excludeIds, } = options;
    const filtered = [];
    for (const msg of messages) {
        if (excludeNames && msg.name && excludeNames.includes(msg.name)) {
            continue;
        }
        else if (excludeTypes && _isMessageType(msg, excludeTypes)) {
            continue;
        }
        else if (excludeIds && msg.id && excludeIds.includes(msg.id)) {
            continue;
        }
        // default to inclusion when no inclusion criteria given.
        if (!(includeTypes || includeIds || includeNames)) {
            filtered.push(msg);
        }
        else if (includeNames &&
            msg.name &&
            includeNames.some((iName) => iName === msg.name)) {
            filtered.push(msg);
        }
        else if (includeTypes && _isMessageType(msg, includeTypes)) {
            filtered.push(msg);
        }
        else if (includeIds && msg.id && includeIds.some((id) => id === msg.id)) {
            filtered.push(msg);
        }
    }
    return filtered;
}
function mergeMessageRuns(messages) {
    if (Array.isArray(messages)) {
        return _mergeMessageRuns(messages);
    }
    return RunnableLambda.from(_mergeMessageRuns);
}
function _mergeMessageRuns(messages) {
    if (!messages.length) {
        return [];
    }
    const merged = [];
    for (const msg of messages) {
        const curr = msg;
        const last = merged.pop();
        if (!last) {
            merged.push(curr);
        }
        else if (curr.getType() === "tool" ||
            !(curr.getType() === last.getType())) {
            merged.push(last, curr);
        }
        else {
            const lastChunk = convertToChunk(last);
            const currChunk = convertToChunk(curr);
            const mergedChunks = lastChunk.concat(currChunk);
            if (typeof lastChunk.content === "string" &&
                typeof currChunk.content === "string") {
                mergedChunks.content = `${lastChunk.content}\n${currChunk.content}`;
            }
            merged.push(_chunkToMsg(mergedChunks));
        }
    }
    return merged;
}
function trimMessages(messagesOrOptions, options) {
    if (Array.isArray(messagesOrOptions)) {
        const messages = messagesOrOptions;
        if (!options) {
            throw new Error("Options parameter is required when providing messages.");
        }
        return _trimMessagesHelper(messages, options);
    }
    else {
        const trimmerOptions = messagesOrOptions;
        return RunnableLambda.from((input) => _trimMessagesHelper(input, trimmerOptions)).withConfig({
            runName: "trim_messages",
        });
    }
}
async function _trimMessagesHelper(messages, options) {
    const { maxTokens, tokenCounter, strategy = "last", allowPartial = false, endOn, startOn, includeSystem = false, textSplitter, } = options;
    if (startOn && strategy === "first") {
        throw new Error("`startOn` should only be specified if `strategy` is 'last'.");
    }
    if (includeSystem && strategy === "first") {
        throw new Error("`includeSystem` should only be specified if `strategy` is 'last'.");
    }
    let listTokenCounter;
    if ("getNumTokens" in tokenCounter) {
        listTokenCounter = async (msgs) => {
            const tokenCounts = await Promise.all(msgs.map((msg) => tokenCounter.getNumTokens(msg.content)));
            return tokenCounts.reduce((sum, count) => sum + count, 0);
        };
    }
    else {
        listTokenCounter = async (msgs) => tokenCounter(msgs);
    }
    let textSplitterFunc = defaultTextSplitter;
    if (textSplitter) {
        if ("splitText" in textSplitter) {
            textSplitterFunc = textSplitter.splitText;
        }
        else {
            textSplitterFunc = async (text) => textSplitter(text);
        }
    }
    if (strategy === "first") {
        return _firstMaxTokens(messages, {
            maxTokens,
            tokenCounter: listTokenCounter,
            textSplitter: textSplitterFunc,
            partialStrategy: allowPartial ? "first" : undefined,
            endOn,
        });
    }
    else if (strategy === "last") {
        return _lastMaxTokens(messages, {
            maxTokens,
            tokenCounter: listTokenCounter,
            textSplitter: textSplitterFunc,
            allowPartial,
            includeSystem,
            startOn,
            endOn,
        });
    }
    else {
        throw new Error(`Unrecognized strategy: '${strategy}'. Must be one of 'first' or 'last'.`);
    }
}
async function _firstMaxTokens(messages, options) {
    const { maxTokens, tokenCounter, textSplitter, partialStrategy, endOn } = options;
    let messagesCopy = [...messages];
    let idx = 0;
    for (let i = 0; i < messagesCopy.length; i += 1) {
        const remainingMessages = i > 0 ? messagesCopy.slice(0, -i) : messagesCopy;
        if ((await tokenCounter(remainingMessages)) <= maxTokens) {
            idx = messagesCopy.length - i;
            break;
        }
    }
    if (idx < messagesCopy.length - 1 && partialStrategy) {
        let includedPartial = false;
        if (Array.isArray(messagesCopy[idx].content)) {
            const excluded = messagesCopy[idx];
            if (typeof excluded.content === "string") {
                throw new Error("Expected content to be an array.");
            }
            const numBlock = excluded.content.length;
            const reversedContent = partialStrategy === "last"
                ? [...excluded.content].reverse()
                : excluded.content;
            for (let i = 1; i <= numBlock; i += 1) {
                const partialContent = partialStrategy === "first"
                    ? reversedContent.slice(0, i)
                    : reversedContent.slice(-i);
                const fields = Object.fromEntries(Object.entries(excluded).filter(([k]) => k !== "type" && !k.startsWith("lc_")));
                const updatedMessage = _switchTypeToMessage(excluded.getType(), {
                    ...fields,
                    content: partialContent,
                });
                const slicedMessages = [...messagesCopy.slice(0, idx), updatedMessage];
                if ((await tokenCounter(slicedMessages)) <= maxTokens) {
                    messagesCopy = slicedMessages;
                    idx += 1;
                    includedPartial = true;
                }
                else {
                    break;
                }
            }
            if (includedPartial && partialStrategy === "last") {
                excluded.content = [...reversedContent].reverse();
            }
        }
        if (!includedPartial) {
            const excluded = messagesCopy[idx];
            let text;
            if (Array.isArray(excluded.content) &&
                excluded.content.some((block) => typeof block === "string" || block.type === "text")) {
                const textBlock = excluded.content.find((block) => block.type === "text" && block.text);
                text = textBlock?.text;
            }
            else if (typeof excluded.content === "string") {
                text = excluded.content;
            }
            if (text) {
                const splitTexts = await textSplitter(text);
                const numSplits = splitTexts.length;
                if (partialStrategy === "last") {
                    splitTexts.reverse();
                }
                for (let _ = 0; _ < numSplits - 1; _ += 1) {
                    splitTexts.pop();
                    excluded.content = splitTexts.join("");
                    if ((await tokenCounter([...messagesCopy.slice(0, idx), excluded])) <=
                        maxTokens) {
                        if (partialStrategy === "last") {
                            excluded.content = [...splitTexts].reverse().join("");
                        }
                        messagesCopy = [...messagesCopy.slice(0, idx), excluded];
                        idx += 1;
                        break;
                    }
                }
            }
        }
    }
    if (endOn) {
        const endOnArr = Array.isArray(endOn) ? endOn : [endOn];
        while (idx > 0 && !_isMessageType(messagesCopy[idx - 1], endOnArr)) {
            idx -= 1;
        }
    }
    return messagesCopy.slice(0, idx);
}
async function _lastMaxTokens(messages, options) {
    const { allowPartial = false, includeSystem = false, endOn, startOn, ...rest } = options;
    // Create a copy of messages to avoid mutation
    let messagesCopy = messages.map((message) => {
        const fields = Object.fromEntries(Object.entries(message).filter(([k]) => k !== "type" && !k.startsWith("lc_")));
        return _switchTypeToMessage(message.getType(), fields, isBaseMessageChunk(message));
    });
    if (endOn) {
        const endOnArr = Array.isArray(endOn) ? endOn : [endOn];
        while (messagesCopy.length > 0 &&
            !_isMessageType(messagesCopy[messagesCopy.length - 1], endOnArr)) {
            messagesCopy = messagesCopy.slice(0, -1);
        }
    }
    const swappedSystem = includeSystem && messagesCopy[0]?.getType() === "system";
    let reversed_ = swappedSystem
        ? messagesCopy.slice(0, 1).concat(messagesCopy.slice(1).reverse())
        : messagesCopy.reverse();
    reversed_ = await _firstMaxTokens(reversed_, {
        ...rest,
        partialStrategy: allowPartial ? "last" : undefined,
        endOn: startOn,
    });
    if (swappedSystem) {
        return [reversed_[0], ...reversed_.slice(1).reverse()];
    }
    else {
        return reversed_.reverse();
    }
}
const _MSG_CHUNK_MAP = {
    human: {
        message: human/* HumanMessage */.xc,
        messageChunk: human/* HumanMessageChunk */.a7,
    },
    ai: {
        message: ai/* AIMessage */.Od,
        messageChunk: ai/* AIMessageChunk */.H,
    },
    system: {
        message: system/* SystemMessage */.tn,
        messageChunk: system/* SystemMessageChunk */.uU,
    },
    developer: {
        message: system/* SystemMessage */.tn,
        messageChunk: system/* SystemMessageChunk */.uU,
    },
    tool: {
        message: tool/* ToolMessage */.uf,
        messageChunk: tool/* ToolMessageChunk */.dr,
    },
    function: {
        message: messages_function/* FunctionMessage */.mg,
        messageChunk: messages_function/* FunctionMessageChunk */.FK,
    },
    generic: {
        message: chat/* ChatMessage */.cM,
        messageChunk: chat/* ChatMessageChunk */.XU,
    },
    remove: {
        message: RemoveMessage,
        messageChunk: RemoveMessage, // RemoveMessage does not have a chunk class.
    },
};
function _switchTypeToMessage(messageType, fields, returnChunk) {
    let chunk;
    let msg;
    switch (messageType) {
        case "human":
            if (returnChunk) {
                chunk = new HumanMessageChunk(fields);
            }
            else {
                msg = new HumanMessage(fields);
            }
            break;
        case "ai":
            if (returnChunk) {
                let aiChunkFields = {
                    ...fields,
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
                chunk = new AIMessageChunk(aiChunkFields);
            }
            else {
                msg = new AIMessage(fields);
            }
            break;
        case "system":
            if (returnChunk) {
                chunk = new SystemMessageChunk(fields);
            }
            else {
                msg = new SystemMessage(fields);
            }
            break;
        case "developer":
            if (returnChunk) {
                chunk = new SystemMessageChunk({
                    ...fields,
                    additional_kwargs: {
                        ...fields.additional_kwargs,
                        __openai_role__: "developer",
                    },
                });
            }
            else {
                msg = new SystemMessage({
                    ...fields,
                    additional_kwargs: {
                        ...fields.additional_kwargs,
                        __openai_role__: "developer",
                    },
                });
            }
            break;
        case "tool":
            if ("tool_call_id" in fields) {
                if (returnChunk) {
                    chunk = new ToolMessageChunk(fields);
                }
                else {
                    msg = new ToolMessage(fields);
                }
            }
            else {
                throw new Error("Can not convert ToolMessage to ToolMessageChunk if 'tool_call_id' field is not defined.");
            }
            break;
        case "function":
            if (returnChunk) {
                chunk = new FunctionMessageChunk(fields);
            }
            else {
                if (!fields.name) {
                    throw new Error("FunctionMessage must have a 'name' field");
                }
                msg = new FunctionMessage(fields);
            }
            break;
        case "generic":
            if ("role" in fields) {
                if (returnChunk) {
                    chunk = new ChatMessageChunk(fields);
                }
                else {
                    msg = new ChatMessage(fields);
                }
            }
            else {
                throw new Error("Can not convert ChatMessage to ChatMessageChunk if 'role' field is not defined.");
            }
            break;
        default:
            throw new Error(`Unrecognized message type ${messageType}`);
    }
    if (returnChunk && chunk) {
        return chunk;
    }
    if (msg) {
        return msg;
    }
    throw new Error(`Unrecognized message type ${messageType}`);
}
function _chunkToMsg(chunk) {
    const chunkType = chunk.getType();
    let msg;
    const fields = Object.fromEntries(Object.entries(chunk).filter(([k]) => !["type", "tool_call_chunks"].includes(k) && !k.startsWith("lc_")));
    if (chunkType in _MSG_CHUNK_MAP) {
        msg = _switchTypeToMessage(chunkType, fields);
    }
    if (!msg) {
        throw new Error(`Unrecognized message chunk class ${chunkType}. Supported classes are ${Object.keys(_MSG_CHUNK_MAP)}`);
    }
    return msg;
}
/**
 * The default text splitter function that splits text by newlines.
 *
 * @param {string} text
 * @returns A promise that resolves to an array of strings split by newlines.
 */
function defaultTextSplitter(text) {
    const splits = text.split("\n");
    return Promise.resolve([
        ...splits.slice(0, -1).map((s) => `${s}\n`),
        splits[splits.length - 1],
    ]);
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/messages/index.js









// TODO: Use a star export when we deprecate the
// existing "ToolCall" type in "base.js".



/***/ })

};
;
//# sourceMappingURL=82.77a139a0ac8766efda1f.js.map