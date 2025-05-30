import { LocalEmbeddings } from '../embeddings/embeddings';
import path from 'path';

async function testEmbeddings() {
  try {
    const embeddings = new LocalEmbeddings({
      modelPath: "/Users/apple/Documents/study/text2vec-large-chinese",
      maxConcurrency: 1
    });

    const result = await embeddings.embedQuery("测试文本");
    console.log('Embedding 维度:', result.length);
    console.log('Embedding 示例:', result.slice(0, 5));
  } catch (error) {
    console.error('测试失败:', error);
  }
}

testEmbeddings();