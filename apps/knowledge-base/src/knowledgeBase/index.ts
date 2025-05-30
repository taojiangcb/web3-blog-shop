import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OllamaEmbeddings } from "../embeddings/embeddings";
import { loadDocuments } from "../loaders/loader";
import { CONFIG } from "../config/config";

export async function createKnowledgeBase() {
  try {
    // 1. 加载文档
    console.log("开始加载文档...");
    const loader = await loadDocuments();
    const docs = await loader.load();
    console.log(`加载文档完成，共 ${docs.length} 个文档`);
    
    // 2. 文本分割
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: CONFIG.CHUNK_SIZE,
      chunkOverlap: CONFIG.CHUNK_OVERLAP,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);
    
    // 3. 初始化 embeddings
    console.log("初始化 embeddings...");
    const embeddings = new OllamaEmbeddings({
      maxConcurrency: 5,  // EmbeddingsParams 参数
      baseUrl: "http://localhost:11434",  // Ollama 特定参数
      model: "nomic-embed-text"  // Ollama 特定参数
    });
    
    // 4. 创建向量存储
    console.log("创建向量存储...");
    const vectorStore = await FaissStore.fromDocuments(
      splitDocs,
      embeddings
    );
    
    // 5. 保存向量存储
    console.log("保存向量存储...");
    await vectorStore.save(CONFIG.VECTOR_STORE_PATH);
    
    console.log("知识库创建完成！");
  } catch (error) {
    console.error("创建知识库失败:", error);
  }
}