import { loadDocuments } from "../loaders/loader";

async function testMetadata() {
  const loader = await loadDocuments();
  const docs = await loader.load();
  
  docs.forEach((doc, index) => {
    console.log(`\n文档 ${index + 1} 的元数据:`);
    console.log(JSON.stringify(doc.metadata, null, 2));
  });
}

testMetadata();