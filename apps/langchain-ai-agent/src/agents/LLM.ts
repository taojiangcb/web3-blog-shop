import { ChatDeepSeek } from "@langchain/deepseek";
import { AzureChatOpenAI, ChatOpenAI } from "@langchain/openai";

export const deepSeek = new ChatDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0.7,
  modelName: "deepseek-chat",
  streaming: true,
});



export const openAI = new AzureChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
  azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME,
});
