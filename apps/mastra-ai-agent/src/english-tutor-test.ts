import { englishTutorAgent } from "./mastra/agents/english-tutor-ai";

async function main() {
  const query = "Hi! I want to practice English conversation. Can you help me improve my speaking skills?";
  console.log(`User: ${query}`);
  
  try {
    const response = await englishTutorAgent.generate([
      { role: "user", content: query },
    ]);
    console.log("\n🎓 English Tutor:", response.text);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();