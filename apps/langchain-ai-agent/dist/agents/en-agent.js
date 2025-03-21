"use strict";
exports.id = 5;
exports.ids = [5];
exports.modules = {

/***/ 9208:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteSession = exports.chainWithHistory = void 0;
exports.createTalk = createTalk;
exports.getHistoryTalks = getHistoryTalks;
exports.clearHistoryTalks = clearHistoryTalks;
const deepseek_1 = __webpack_require__(8884);
const runnables_1 = __webpack_require__(2373);
const prompts_1 = __webpack_require__(7308);
const messages_1 = __webpack_require__(3261);
const chainSessions_1 = __webpack_require__(4075);
Object.defineProperty(exports, "deleteSession", ({ enumerable: true, get: function () { return chainSessions_1.deleteSession; } }));
const model = new deepseek_1.ChatDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
    temperature: 0.7,
    modelName: "deepseek-chat",
    streaming: true,
});
const chain = prompts_1.prompt.pipe(model);
const getMessageSession = (_sessionId) => {
    const session = (0, chainSessions_1.getSession)(_sessionId);
    return session.history;
};
const chainWithHistory = new runnables_1.RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: getMessageSession,
    inputMessagesKey: "input",
    historyMessagesKey: "history_message",
});
exports.chainWithHistory = chainWithHistory;
async function createTalk(sessionId) {
    const firstMessage = new messages_1.AIMessage("Hello, I'm JO, your English learning assistant, and today we can talk about something you're interested in.");
    const session = (0, chainSessions_1.getSession)(sessionId);
    await session.history.addAIMessage(firstMessage.content);
    return firstMessage;
}
async function getHistoryTalks(sessionId) {
    const session = (0, chainSessions_1.getSession)(sessionId);
    const history = session.history;
    const messages = await history.getMessages();
    return messages;
}
async function clearHistoryTalks(sessionId) {
    const session = (0, chainSessions_1.getSession)(sessionId);
    const history = session.history;
    await history.clear();
}


/***/ })

};
;
//# sourceMappingURL=en-agent.js.map