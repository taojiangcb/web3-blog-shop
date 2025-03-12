import { Mastra } from "@mastra/core";
import { englishTutorAgent } from "./agents/english-tutor-ai";
require("dotenv").config();
export const mastra = new Mastra({
  agents: {
    englishTutorAgent,
  },
});
