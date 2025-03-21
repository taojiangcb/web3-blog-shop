import serverless from 'serverless-http';
import app from './app';

export const handler = serverless(app, {
  basePath: '/dev',
  request: {
    normalizeRequest: (request: any) => {
      // 移除 /dev 前缀，让内部路由正常匹配
      request.path = request.path.replace(/^\/dev/, '');
      return request;
    }
  }
});