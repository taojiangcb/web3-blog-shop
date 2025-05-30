import path from 'path';

export const CONFIG = {
  // 文档目录配置
  DOCS_DIR: path.join(__dirname, '../../docs'),
  // FAISS 数据库存储位置
  VECTOR_STORE_PATH: path.join(__dirname, '../../vector_store'),
  // 文本分割配置
  CHUNK_SIZE: 500,
  CHUNK_OVERLAP: 50,
}