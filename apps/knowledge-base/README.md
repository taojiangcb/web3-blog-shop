# 本地向量知识库搭建

### 准备环境
1. 模型管理 ollama
2. ollama ui -> 在 docker 中安装  ollama-webu
3. 在 ollama 中安装模型 ollama pull nomic-embed-text
4. 访问模型
  curl -X POST http://localhost:11434/api/embeddings \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nomic-embed-text",
    "prompt": "测试文本"
  }'


