import { Mastra } from "@mastra/core";
import { frontendAgent } from "./agents/frontend-ai";
import { englishTutorAgent } from "./agents/english-tutor-ai";
require("dotenv").config();
export const mastra = new Mastra({
  agents: {
    frontendAgent,
    englishTutorAgent,
  },
});
