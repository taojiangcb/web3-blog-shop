import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OllamaEmbeddings } from "../embeddings/embeddings";
import { loadDocuments } from "../loaders/loader";
import { CONFIG } from "../config/config";
import { Document } from "@langchain/core/documents";
import fs from 'fs';
import path from 'path';

interface FileMetadata {
  path: string;
  lastModified: number;
}

// 保存文件元数据
async function saveFileMetadata(metadata: FileMetadata[]) {
  await fs.promises.writeFile(
    path.join(CONFIG.VECTOR_STORE_PATH, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
}

// 读取文件元数据
async function loadFileMetadata(): Promise<FileMetadata[]> {
  const metadataPath = path.join(CONFIG.VECTOR_STORE_PATH, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    return [];
  }
  const data = await fs.promises.readFile(metadataPath, 'utf-8');
  return JSON.parse(data);
}

// 获取当前文档的元数据
async function getCurrentFilesMetadata(docs: Document[]): Promise<FileMetadata[]> {
  return docs.map(doc => ({
    path: doc.metadata.source,
    lastModified: fs.statSync(doc.metadata.source).mtimeMs
  }));
}

export async function updateKnowledgeBase() {
  try {
    // 1. 加载文档
    console.log("加载文档...");
    const loader = await loadDocuments();
    const docs = await loader.load();
    
    // 2. 获取文件元数据
    const currentMetadata = await getCurrentFilesMetadata(docs);
    const previousMetadata = await loadFileMetadata();

    // 3. 找出更改的文件
    const changedFiles = currentMetadata.filter(current => {
      const previous = previousMetadata.find(p => p.path === current.path);
      return !previous || previous.lastModified !== current.lastModified;
    });

    // 找出被删除的文件
    const deletedFiles = previousMetadata.filter(
      prev => !currentMetadata.find(curr => curr.path === prev.path)
    );

    // 如果没有变化，直接返回
    if (changedFiles.length === 0 && deletedFiles.length === 0) {
      console.log("文档没有变化，无需更新");
      return;
    }

    // 4. 初始化或加载现有的向量存储
    const embeddings = new OllamaEmbeddings({
      maxConcurrency: 5
    });

    console.log("初始化或加载向量存储...");
    let vectorStore: FaissStore;
    
    if (fs.existsSync(CONFIG.VECTOR_STORE_PATH)) {
      console.log("加载现有向量存储...");
      vectorStore = await FaissStore.load(CONFIG.VECTOR_STORE_PATH, embeddings);
    } else {
      console.log("创建新的向量存储...");
      vectorStore = await FaissStore.fromDocuments([], embeddings);
    }

    // 5. 处理更改的文档
    if (changedFiles.length > 0) {
      const changedDocs = docs.filter(doc => 
        changedFiles.some(f => f.path === doc.metadata.source)
      );

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: CONFIG.CHUNK_SIZE,
        chunkOverlap: CONFIG.CHUNK_OVERLAP,
      });
      
      const splitDocs = await textSplitter.splitDocuments(changedDocs);
      
      console.log(`更新 ${changedFiles.length} 个文件的向量...`);
      
      // 找到要删除的文档的 IDs
      const idsToDelete = Object.entries(vectorStore.getMapping())
        .filter(([_, source]) => 
          changedFiles.some(file => file.path === source)
        )
        .map(([id]) => id);
      
      // 删除旧的向量
      if (idsToDelete.length > 0) {
        await vectorStore.delete({ ids: idsToDelete });
      }
      
      // 添加新的向量
      await vectorStore.addDocuments(splitDocs);
    }

    // 6. 处理删除的文档
    if (deletedFiles.length > 0) {
      console.log(`删除 ${deletedFiles.length} 个文件的向量...`);
      
      // 找到要删除的文档的 IDs
      const idsToDelete = Object.entries(vectorStore.getMapping())
        .filter(([_, source]) => 
          deletedFiles.some(file => file.path === source)
        )
        .map(([id]) => id);

      if (idsToDelete.length > 0) {
        await vectorStore.delete({ ids: idsToDelete });
      }
    }

    // 7. 保存更新后的向量存储和元数据
    console.log("保存更新...");
    await vectorStore.save(CONFIG.VECTOR_STORE_PATH);
    await saveFileMetadata(currentMetadata);

    console.log("知识库更新完成！");
  } catch (error) {
    console.error("更新知识库失败:", error);
    throw error;
  }
}