import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import axios from "axios";

interface OllamaEmbeddingsParams extends EmbeddingsParams {
  baseUrl?: string;
  model?: string;
}

export class OllamaEmbeddings extends Embeddings {
  private baseUrl: string;
  private model: string;

  constructor(params?: OllamaEmbeddingsParams) {
    // 正确传递 EmbeddingsParams 给父类
    super(params ?? {});
    
    this.baseUrl = params?.baseUrl || "http://localhost:11434";
    this.model = params?.model || "nomic-embed-text";
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    return Promise.all(texts.map(text => this.embedQuery(text)));
  }

  async embedQuery(text: string): Promise<number[]> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/embeddings`, {
        model: this.model,
        prompt: text
      });

      if (!response.data.embedding) {
        throw new Error('Ollama API 未返回 embedding 结果');
      }

      return response.data.embedding;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ollama API 请求失败:', error.response?.data || error.message);
      }
      throw error;
    }
  }
}