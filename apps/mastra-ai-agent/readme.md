# 部署
1. 运行 pnpm run build
   1. 之后把.env 文件拷贝到 .mastra/output 目录下
   2. 远程 aws-ec2 目录 ec2-user/mastra-app/ 
      1. index.mjs app 启动
      2. https-proxy.mjs 代理启动
      3. ecosystem.config.mjs pm2 配置
      4. 用提启动 sudo pm2 start ecosystem.config.mjs