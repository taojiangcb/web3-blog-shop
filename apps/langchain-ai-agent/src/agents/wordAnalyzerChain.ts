import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import deepSeek, { openAI } from "./LLM";
import { analyzerChartPrompt, morphemeParser } from "./analyzerWordPrompt";

// 正确配置的调用链
const wordAnalysisChain = RunnableSequence.from([
  // 步骤1：转换输入格式
  RunnablePassthrough.assign({
    messages: (input: { word: string }) =>
      analyzerChartPrompt.formatMessages({ word: input.word }),
  }),

  // 步骤2：传递消息到模型
  {
    messages: (prev) => prev.messages,
    content: async (prev) => {
      const response = await openAI.invoke(prev.messages);
      return response.content;
    },
  },

  // 步骤3：解析输出
  {
    analysis: (prev) => morphemeParser.parse(prev.content),
  },
]);

export { wordAnalysisChain };
