import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { openAI } from "./LLM";
import { analyzerChartPrompt, morphemeParser } from "./analyzerWordPrompt";
import { DynamoDB } from "aws-sdk";

// 正确配置的调用链
// 初始化 DynamoDB 客户端
const dynamoDB = new DynamoDB.DocumentClient({
  region: "ap-northeast-1", // 替换为你的 DynamoDB 区域
});

const TABLE_NAME = "word_analysis_cache";

// 查询缓存的函数
async function getWordAnalysisFromCache(word: string) {
  const params = {
    TableName: TABLE_NAME,
    Key: { word },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    if (result.Item?.analysis) {
      // 确保返回的是字符串
      return typeof result.Item.analysis === "string"
        ? result.Item.analysis
        : JSON.stringify(result.Item.analysis);
    }
    return null;
  } catch (error) {
    console.error("DynamoDB查询错误:", error);
    return null;
  }
}

// 修改保存分析结果到缓存的函数
async function saveWordAnalysisToCache(word: string, analysis: string) {
  // 确保 analysis 是字符串
  const analysisStr =
    typeof analysis === "object" ? JSON.stringify(analysis) : analysis;

  const params = {
    TableName: TABLE_NAME,
    Item: {
      word,
      analysis: analysisStr,
      // ttl: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7天过期
      timestamp: Date.now(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log("缓存保存成功:", word);
  } catch (error) {
    console.error("DynamoDB保存错误:", error);
  }
}

// 修改原有的调用链
const wordAnalysisChain = RunnableSequence.from([
  // 步骤1：转换输入格式
  RunnablePassthrough.assign({
    messages: (input: { word: string }) =>
      analyzerChartPrompt.formatMessages({ word: input.word }),
  }),

  // 步骤2：传递消息到模型
  // 步骤2：先查缓存，没有再调用模型
  {
    messages: (prev) => prev.messages,
    content: async (prev) => {
      // 修改正则表达式以更准确地匹配单词
      const word =
        prev.messages[0].content.match(/analyze the word "([^"]+)"/i)?.[1] ||
        prev.messages[0].content.match(/word "([^"]+)"/i)?.[1];

      if (!word) {
        console.error("解析失败的消息内容:", prev.messages[0].content);
        throw new Error("无法解析单词");
      }

      // 先查询缓存
      const cachedAnalysis = await getWordAnalysisFromCache(word);
      if (cachedAnalysis) {
        return cachedAnalysis;
      }

      // 缓存未命中，调用模型
      const response = await openAI.invoke(prev.messages);
      const contentString =
        typeof response.content === "string"
          ? response.content
          : JSON.stringify(response.content);

      // 保存到缓存
      await saveWordAnalysisToCache(word, contentString);

      return contentString;
    },
  },

  // 步骤3：解析输出
  {
    analysis: (prev) => morphemeParser.parseToFull(prev.content),
  },
]);

export { wordAnalysisChain };
