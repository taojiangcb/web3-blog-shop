"use strict";
exports.id = 878;
exports.ids = [878];
exports.modules = {

/***/ 3900:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class LamadaErrorHandler {
    static error(app) {
        // 错误处理中间件
        app.use(async (ctx, next) => {
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
            }
            catch (e) {
                console.error('Error:', e);
                ctx.status = 500;
                ctx.body = { error: '服务器错误' };
            }
        });
        // 404 处理
        app.use(async (ctx, next) => {
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
exports["default"] = LamadaErrorHandler;


/***/ })

};
;
//# sourceMappingURL=LamadaErrorHandler.js.map