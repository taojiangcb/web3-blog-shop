import Router from "koa-router";
import ApiService from "../services/ApiService";
import ChatMessageVO from "../interfaces/ChatMessageVO";
import {
  chainWithHistory,
  clearHistoryTalks,
  createTalk,
  getHistoryTalks,
} from "../agents/en-agent";

const apiService = new ApiService();
const router = new Router({
  prefix: "/api",
});

router.get("/list", async (ctx) => {
  const data = await apiService.getInfo();
  ctx.body = {
    data,
  };
});


router.post("/chat", async (ctx) => {
  const { content, sessionId } = ctx.request.body as unknown as ChatMessageVO;
  const msg: ChatMessageVO = {
    role: "human",
    content,
    sessionId,
  };

  // 设置响应头为流式传输
  ctx.status = 200;
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "X-Accel-Buffering": "no"  // 禁用 Nginx 缓冲（如果有使用）
  });

  try {
    const stream = await chainWithHistory.stream(
      {
        input: msg.content,
      },
      {
        configurable: {
          sessionId: msg.sessionId,
        },
      }
    );

    // 使用 for await...of 处理流
    for await (const chunk of stream) {
      const aiMsg: ChatMessageVO = {
        role: "ai",
        content: chunk.content as string,
        sessionId,
      };

      // 发送数据块
      ctx.res.write(`data: ${JSON.stringify(aiMsg)}\n\n`);
    }
  } catch (error) {
    const errorMsg: ChatMessageVO = {
      role: "ai",
      content: "发生错误：" + (error as Error).message,
      sessionId,
    };
    ctx.res.write(`data: ${JSON.stringify(errorMsg)}\n\n`);
  } finally {
    // 结束流
    ctx.res.end();
  }
});

router.get("/history", async (ctx) => {
  const { sessionId } = ctx.request.query as unknown as {
    sessionId: string;
  };

  const historyTalks = await getHistoryTalks(sessionId);
  const talks = [];
  for (const talk of historyTalks) {
    let msg: ChatMessageVO = {
      role: talk.getType(),
      content: talk.content as string,
      sessionId,
    };
    talks.push(msg);
  }
  ctx.body = {
    data: talks,
  };
});

router.get("/createTalk", async (ctx) => {
  const { sessionId } = ctx.request.query as unknown as {
    sessionId: string;
  };
  const msg = await createTalk(sessionId);
  ctx.body = {
    data: {
      role: msg.getType(),
      content: msg.content as string,
      sessionId,
    },
  };
});

router.get("/clearTalk", async (ctx) => {
  const { sessionId } = ctx.request.body as unknown as {
    sessionId: string;
  };
  await clearHistoryTalks(sessionId);
});

export default router;
