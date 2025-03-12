import { Mastra } from "@mastra/core";
import { frontendAgent } from "./agents/frontend-ai";
import { englishTutorAgent } from "./agents/english-tutor-ai";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";
require("dotenv").config();
export const mastra = new Mastra({
  agents: {
    frontendAgent,
    englishTutorAgent,
  },
  deployer: new CloudflareDeployer({
    scope: process.env.CF_ACCOUNT_ID,
    projectName: "my-ai-agent",
    // routes: [
    //   {
    //     pattern: 'coinbasis.org/ai-agent/*',
    //     zone_name: 'coinbasis.org',
    //     // custom_domain: true,
    //   },
    // ],
    // workerNamespace: 'ai-agent',
    auth: {
      apiToken: process.env.CLOUDFLARE_API_TOKEN,
      apiEmail: process.env.CF_ACCOUNT_ID,
    },
  }),
  
  serverMiddleware: [
    {
      handler: async (c, next) => {
        // 添加 CORS 支持
        c.res.headers.set("Access-Control-Allow-Origin", "*");
        c.res.headers.set(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS"
        );
        c.res.headers.set(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization"
        );
        await next();
      },
      path: "/api/*",
    },
    {
      handler: async (c, next) => {
        // 添加 body parser
        if (c.req.method === "POST") {
          c.req.json = await c.req.json();
        }
        await next();
      },
      path: "/api/*",
    },
  ],
});
