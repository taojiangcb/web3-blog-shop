import Koa, { Context } from "koa";

class LamadaErrorHandler {
  static error(app: Koa) {
    // 错误处理中间件
    app.use(async (ctx: Context, next: () => Promise<any>) => {
      try {
        console.log('Request:', {
          path: ctx.path,
          method: ctx.method,
          headers: ctx.headers
        });
        await next();
        console.log('Response:', {
          status: ctx.status,
          body: ctx.body
        });
      } catch (e) {
        console.error('Error:', e);
        ctx.status = 500;
        ctx.body = { error: '服务器错误' };
      }
    });

    // 404 处理
    app.use(async (ctx: Context, next: () => Promise<any>) => {
      await next();
      if (ctx.status === 404) {
        console.warn('404:', {
          path: ctx.path,
          method: ctx.method,
          url: ctx.url
        });
        ctx.body = { error: 'Not Found', path: ctx.path };
      }
    });
  }
}

export default LamadaErrorHandler;