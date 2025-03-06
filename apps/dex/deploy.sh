#!/bin/bash
# 构建项目
npm run build

# 使用 wrangler 部署到 Cloudflare Pages
npx wrangler pages deploy dist --project-name=dex