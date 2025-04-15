import { wordAnalysisChain } from "../src/agents/wordAnalyzerChain";
import { DynamoDB } from "aws-sdk";
import { openAI } from "../src/agents/LLM";
import {
  analyzerChartPrompt,
  morphemeParser,
} from "../src/agents/analyzerWordPrompt";

// Mock AWS SDK
jest.mock("aws-sdk", () => {
  const mockGet = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
      Item: {
        analysis: JSON.stringify({
          w: "test",
          m: { r: [["test", "测试"]] },
          e: [["This is a test.", "这是一个测试。"]],
        }),
      },
    }),
  });

  const mockPut = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({}),
  });

  const mockDocumentClient = jest.fn(() => ({
    get: mockGet,
    put: mockPut,
  }));

  return {
    DynamoDB: {
      DocumentClient: mockDocumentClient,
    },
  };
});

// Mock LLM
jest.mock("../src/agents/LLM", () => ({
  openAI: {
    invoke: jest.fn().mockResolvedValue({
      content: JSON.stringify({
        w: "test",
        m: { r: [["test", "测试"]] },
        e: [["This is a test.", "这是一个测试。"]],
      }),
    }),
  },
  deepSeek: {
    invoke: jest.fn().mockResolvedValue({
      content: JSON.stringify({
        w: "test",
        m: { r: [["test", "测试"]] },
        e: [["This is a test.", "这是一个测试。"]],
      }),
    }),
  },
}));

// Mock morphemeParser
jest.mock("../src/agents/analyzerWordPrompt", () => ({
  analyzerChartPrompt: {
    formatMessages: jest.fn().mockReturnValue([
      { content: 'analyze the word "test"' }
    ]),
  },
  morphemeParser: {
    parseToFull: jest.fn().mockReturnValue({
      word: "test",
      morphemes: {
        prefixes: [],
        roots: [{ segment: "test", meaning: "测试" }],
        suffixes: [],
      },
      usage: {
        examples: [{ en: "This is a test.", zh: "这是一个测试。" }],
      },
    }),
  },
}));

describe("wordAnalyzerChain", () => {
  let documentClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    documentClient = new DynamoDB.DocumentClient();
  });

  it("应该从缓存中获取分析结果", async () => {
    const result = await wordAnalysisChain.invoke({ word: "test" });

    // 验证缓存查询被调用
    expect(documentClient.get).toHaveBeenCalled();
    // 验证 LLM 没有被调用（因为命中缓存）
    expect(openAI.invoke).not.toHaveBeenCalled();
    // 验证结果格式
    expect(result.analysis).toHaveProperty("word", "test");
  });

  it("应该在缓存未命中时调用 LLM", async () => {
    // 模拟缓存未命中
    const mockPromise = jest.fn().mockResolvedValueOnce({ Item: null });
    documentClient.get.mockReturnValueOnce({ promise: mockPromise });

    const result = await wordAnalysisChain.invoke({ word: "test" });

    // 验证缓存查询被调用
    expect(documentClient.get).toHaveBeenCalled();
    // 验证 LLM 被调用
    expect(openAI.invoke).toHaveBeenCalled();
    // 验证缓存保存被调用
    expect(documentClient.put).toHaveBeenCalled();
    // 验证结果格式
    expect(result.analysis).toHaveProperty("word", "test");
  });

  it("应该处理数据库错误", async () => {
    // 模拟数据库错误
    const mockPromise = jest.fn().mockRejectedValueOnce(new Error("数据库错误"));
    documentClient.get.mockReturnValueOnce({ promise: mockPromise });

    const result = await wordAnalysisChain.invoke({ word: "test" });

    // 验证在数据库错误时仍然调用 LLM
    expect(openAI.invoke).toHaveBeenCalled();
    expect(result.analysis).toHaveProperty("word", "test");
  });

  it("应该正确解析单词", async () => {
    const result = await wordAnalysisChain.invoke({ word: "test" });

    // 验证 morphemeParser 被正确调用
    expect(morphemeParser.parseToFull).toHaveBeenCalled();
    // 验证结果结构
    expect(result.analysis).toMatchObject({
      word: "test",
      morphemes: {
        prefixes: expect.any(Array),
        roots: expect.any(Array),
        suffixes: expect.any(Array),
      },
      usage: {
        examples: expect.any(Array),
      },
    });
  });
});
