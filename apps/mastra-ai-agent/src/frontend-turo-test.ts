import { frontendAgent } from "./mastra/agents/frontend-ai";
async function main() {
  const query =
    "如何实现响应式布局？";
  console.log(`Query: ${query}`);
  try {
    const response = await frontendAgent.generate([
      { role: "user", content: query },
    ]);
    console.log("\n👨‍🍳 前端专家:", response.text);
  }
  catch(error) {
    console.log(error)
  }
}
main();
