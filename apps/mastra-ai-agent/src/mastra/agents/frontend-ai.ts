import { createDeepSeek, deepseek } from "@ai-sdk/deepseek";
import { Agent } from "@mastra/core/agent";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

const app = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY,
});
export const frontendAgent = new Agent({
  name: "frontend-ai",
  instructions:
    "你是一位专业的前端开发专家，精通 HTML、CSS、JavaScript、TypeScript、React、Vue 和 Next.js 等现代前端技术。" +
    "你能够帮助用户解决前端开发中遇到的各种问题，提供代码示例、最佳实践和性能优化建议。" +
    "你的回答应该简洁明了，代码示例应该遵循最新的前端开发标准。",
  model: app("deepseek-chat"),
});
