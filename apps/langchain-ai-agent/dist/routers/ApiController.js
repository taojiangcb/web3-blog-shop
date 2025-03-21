"use strict";
exports.id = 550;
exports.ids = [550];
exports.modules = {

/***/ 541:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const koa_router_1 = __importDefault(__webpack_require__(4733));
const ApiService_1 = __importDefault(__webpack_require__(7830));
const en_agent_1 = __webpack_require__(9208);
const apiService = new ApiService_1.default();
const router = new koa_router_1.default({
    prefix: "/api",
});
router.get("/list", async (ctx) => {
    const data = await apiService.getInfo();
    ctx.body = {
        data,
    };
});
router.post("/chat", async (ctx) => {
    const { content, sessionId } = ctx.request.body;
    const msg = {
        role: "human",
        content,
        sessionId,
    };
    // 设置响应头为流式传输
    ctx.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "X-Accel-Buffering": "no" // 禁用 Nginx 缓冲（如果有使用）
    });
    try {
        const stream = await en_agent_1.chainWithHistory.stream({
            input: msg.content,
        }, {
            configurable: {
                sessionId: msg.sessionId,
            },
        });
        // 使用 for await...of 处理流
        for await (const chunk of stream) {
            const aiMsg = {
                role: "ai",
                content: chunk.content,
                sessionId,
            };
            // 发送数据块
            ctx.res.write(`data: ${JSON.stringify(aiMsg)}\n\n`);
        }
    }
    catch (error) {
        const errorMsg = {
            role: "ai",
            content: "发生错误：" + error.message,
            sessionId,
        };
        ctx.res.write(`data: ${JSON.stringify(errorMsg)}\n\n`);
    }
    finally {
        // 结束流
        ctx.res.end();
    }
});
router.get("/history", async (ctx) => {
    const { sessionId } = ctx.request.query;
    const historyTalks = await (0, en_agent_1.getHistoryTalks)(sessionId);
    const talks = [];
    for (const talk of historyTalks) {
        let msg = {
            role: talk.getType(),
            content: talk.content,
            sessionId,
        };
        talks.push(msg);
    }
    ctx.body = {
        data: talks,
    };
});
router.get("/createTalk", async (ctx) => {
    const { sessionId } = ctx.request.query;
    const msg = await (0, en_agent_1.createTalk)(sessionId);
    ctx.body = {
        data: {
            role: msg.getType(),
            content: msg.content,
            sessionId,
        },
    };
});
router.get("/clearTalk", async (ctx) => {
    const { sessionId } = ctx.request.body;
    await (0, en_agent_1.clearHistoryTalks)(sessionId);
});
exports["default"] = router;


/***/ })

};
;
//# sourceMappingURL=ApiController.js.map