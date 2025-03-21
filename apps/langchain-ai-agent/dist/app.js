"use strict";
exports.id = 524;
exports.ids = [524];
exports.modules = {

/***/ 2339:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __importDefault(__webpack_require__(818));
dotenv_1.default.config();
const koa_1 = __importDefault(__webpack_require__(6101));
const cors_1 = __importDefault(__webpack_require__(5695));
const koa_bodyparser_1 = __importDefault(__webpack_require__(9911));
const ApiController_1 = __importDefault(__webpack_require__(541));
const LamadaErrorHandler_1 = __importDefault(__webpack_require__(3900));
const app = new koa_1.default();
// 添加基础中间件
app.use((0, cors_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use(ApiController_1.default.routes());
LamadaErrorHandler_1.default.error(app);
app.listen(3000, () => {
    console.log("thie bff server started");
    console.log("http://localhost:3000");
});
exports["default"] = app;


/***/ })

};
;
//# sourceMappingURL=app.js.map