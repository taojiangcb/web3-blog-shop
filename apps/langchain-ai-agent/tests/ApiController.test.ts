import Router from "koa-router";
import { createMockContext } from '@shopify/jest-koa-mocks';
import ApiController from "../src/services/ApiService";
import { chainWithHistory, createTalk, getHistoryTalks, clearHistoryTalks } from "../agents/en-agent";
import { AIMessage } from "@langchain/core/messages";

// Mock 依赖
jest.mock("../agents/en-agent", () => ({
  chainWithHistory: {
    stream: jest.fn(),
  },
  createTalk: jest.fn(),
  getHistoryTalks: jest.fn(),
  clearHistoryTalks: jest.fn(),
}));

describe("ApiController", () => {
  let router: Router;
  
  beforeEach(() => {
    router = ApiController;
    jest.clearAllMocks();
  });

  describe("POST /api/chat", () => {
    it("应该正确处理流式响应", async () => {
      // 模拟流数据
      const mockStream = {
        async *[Symbol.asyncIterator]() {
          yield { content: "Hello" };
          yield { content: " World" };
        },
      };

      (chainWithHistory.stream as jest.Mock).mockResolvedValue(mockStream);

      const ctx = createMockContext({
        method: "POST",
        url: "/api/chat",
        requestBody: {
          content: "test message",
          sessionId: "test-session",
        },
      });

      const chunks: string[] = [];
      ctx.res.write = jest.fn((chunk: string) => {
        chunks.push(chunk);
      });

      await router.routes()(ctx as any);

      expect(chainWithHistory.stream).toHaveBeenCalledWith(
        { input: "test message" },
        { configurable: { sessionId: "test-session" } }
      );

      expect(chunks).toHaveLength(2);
      expect(chunks[0]).toContain("Hello");
      expect(chunks[1]).toContain("World");
    });

    it("应该处理错误情况", async () => {
      (chainWithHistory.stream as jest.Mock).mockRejectedValue(new Error("测试错误"));

      const ctx = createMockContext({
        method: "POST",
        url: "/api/chat",
        requestBody: {
          content: "test message",
          sessionId: "test-session",
        },
      });

      const chunks: string[] = [];
      ctx.res.write = jest.fn((chunk: string) => {
        chunks.push(chunk);
      });

      await router.routes()(ctx as any);

      expect(chunks[0]).toContain("发生错误：测试错误");
    });
  });

  describe("GET /api/history", () => {
    it("应该返回历史消息", async () => {
      const mockMessages = [
        new AIMessage("message 1"),
        new AIMessage("message 2"),
      ];

      (getHistoryTalks as jest.Mock).mockResolvedValue(mockMessages);

      const ctx = createMockContext({
        method: "GET",
        url: "/api/history",
        query: { sessionId: "test-session" },
      });

      await router.routes()(ctx as any);

      expect(getHistoryTalks).toHaveBeenCalledWith("test-session");
      expect(ctx.body.data).toHaveLength(2);
    });
  });

  describe("GET /api/createTalk", () => {
    it("应该创建新对话", async () => {
      const mockMessage = new AIMessage("Hello");
      (createTalk as jest.Mock).mockResolvedValue(mockMessage);

      const ctx = createMockContext({
        method: "GET",
        url: "/api/createTalk",
        query: { sessionId: "test-session" },
      });

      await router.routes()(ctx as any);

      expect(createTalk).toHaveBeenCalledWith("test-session");
      expect(ctx.body.data.content).toBe("Hello");
    });
  });

  describe("GET /api/clearTalk", () => {
    it("应该清除对话历史", async () => {
      const ctx = createMockContext({
        method: "GET",
        url: "/api/clearTalk",
        requestBody: { sessionId: "test-session" },
      });

      await router.routes()(ctx as any);

      expect(clearHistoryTalks).toHaveBeenCalledWith("test-session");
    });
  });
});