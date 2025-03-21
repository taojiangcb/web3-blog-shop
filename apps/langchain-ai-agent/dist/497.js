"use strict";
exports.id = 497;
exports.ids = [497];
exports.modules = {

/***/ 7497:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const serverless_http_1 = __importDefault(__webpack_require__(9277));
const app_1 = __importDefault(__webpack_require__(2339));
exports.handler = (0, serverless_http_1.default)(app_1.default, {
    basePath: '/dev',
    request: {
        normalizeRequest: (request) => {
            // 移除 /dev 前缀，让内部路由正常匹配
            request.path = request.path.replace(/^\/dev/, '');
            return request;
        }
    }
});


/***/ })

};
;
//# sourceMappingURL=497.js.map