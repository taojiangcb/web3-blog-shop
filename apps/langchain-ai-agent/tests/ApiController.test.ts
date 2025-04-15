import Router from "koa-router";
import { createMockContext } from '@shopify/jest-koa-mocks';
import ApiController from "../src/routers/ApiController";
import { chainWithHistory, createTalk, getHistoryTalks } from "../src/agents/enAgentChain";
import { wordAnalysisChain } from "../src/agents/wordAnalyzerChain";
import { AIMessage } from "@langchain/core/messages";

// 添加 ChatDeepSeek mock
jest.mock("@langchain/deepseek", () => ({
  ChatDeepSeek: jest.fn().mockImplementation(() => ({
    // 添加需要的方法
  }))
}));



// Mock 依赖
// Mock 环境变量
beforeAll(() => {
  process.env.AZURE_OPENAI_API_KEY = 'test-key';
  process.env.AZURE_OPENAI_API_INSTANCE_NAME = 'test-instance';
  process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME = 'test-deployment';
  process.env.AZURE_OPENAI_API_VERSION = '2023-07-01-preview';
});

// Mock Azure OpenAI
jest.mock("@langchain/openai", () => ({
  AzureChatOpenAI: jest.fn().mockImplementation(() => ({
    stream: jest.fn().mockResolvedValue({
      content: "测试响应"
    })
  }))
}));
jest.mock("../src/agents/enAgentChain");
jest.mock("../src/agents/wordAnalyzerChain");
// 修改 ApiService mock
jest.mock("../src/services/ApiService", () => {
  const mockGetInfo = jest.fn().mockResolvedValue({ test: "data" });
  
  return {
    __esModule: true,  // 添加这个以支持 ES 模块
    default: jest.fn().mockImplementation(() => ({
      getInfo: mockGetInfo
    }))
  };
});

describe("ApiController", () => {
  let router: Router;
  const next = async () => {};
  
  beforeEach(() => {
    router = ApiController;
    jest.clearAllMocks();
  });

  describe("GET /api/list", () => {
    it("应该返回数据", async () => {
      const ctx = createMockContext({
        method: "GET",
        url: "/api/list"
      });

      await router.routes()(ctx as any, next);
      expect((ctx.body as any)).toEqual({ data: { test: "data" } });
    });
  });

  describe("POST /api/chat", () => {
    it("应该处理聊天请求", async () => {
      const mockStream = {
        async *[Symbol.asyncIterator]() {
          yield { content: "Hello" };
          yield { content: " World" };
        }
      };
      (chainWithHistory.stream as jest.Mock).mockResolvedValue(mockStream);

      const ctx = createMockContext({
        method: "POST",
        url: "/api/chat",
        requestBody: {
          content: "test message",
          sessionId: "test-session"
        }
      });

      ctx.res.write = jest.fn().mockReturnValue(true);
      ctx.res.end = jest.fn();

      await router.routes()(ctx as any, next);

      expect(chainWithHistory.stream).toHaveBeenCalledWith(
        { input: "test message" },
        { configurable: { sessionId: "test-session" } }
      );
      expect(ctx.res.write).toHaveBeenCalled();
    });

    it("应该处理错误情况", async () => {
      (chainWithHistory.stream as jest.Mock).mockRejectedValue(new Error("测试错误"));

      const ctx = createMockContext({
        method: "POST",
        url: "/api/chat",
        requestBody: {
          content: "test message",
          sessionId: "test-session"
        }
      });

      ctx.res.write = jest.fn().mockReturnValue(true);
      ctx.res.end = jest.fn();

      await router.routes()(ctx as any, next);
      expect(ctx.res.write).toHaveBeenCalledWith(expect.stringContaining("测试错误"));
    });
  });

  describe("GET /api/history", () => {
    it("应该返回历史记录", async () => {
      const mockMessages = [new AIMessage("message 1")];
      (getHistoryTalks as jest.Mock).mockResolvedValue(mockMessages);

      const ctx = createMockContext({
        method: "GET",
        url: "/api/history?sessionId=test-session"
      });

      await router.routes()(ctx as any, next);
      expect((ctx.body as any).data).toHaveLength(1);
    });
  });

  describe("POST /api/analyze-word", () => {
    it("应该分析单词", async () => {
      const mockAnalysis = { word: "test", analysis: "测试结果" };
      (wordAnalysisChain.invoke as jest.Mock).mockResolvedValue(mockAnalysis);

      const ctx = createMockContext({
        method: "POST",
        url: "/api/analyze-word",
        requestBody: { word: "test" }
      });

      await router.routes()(ctx as any, next);
      expect((ctx.body as any).data).toEqual(mockAnalysis);
    });

    it("应该处理无效单词", async () => {
      const ctx = createMockContext({
        method: "POST",
        url: "/api/analyze-word",
        requestBody: { word: "" }
      });

      await router.routes()(ctx as any, next);
      expect(ctx.status).toBe(400);
    });
  });
});