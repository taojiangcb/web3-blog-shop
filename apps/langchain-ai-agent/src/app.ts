import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";

import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import router from "./routers/ApiController";
import LamadaErrorHandler from "./middlewares/LamadaErrorHandler";
const app = new Koa();

// 添加基础中间件
app.use(cors());
app.use(bodyParser());

app.use(router.routes());
LamadaErrorHandler.error(app);

app.listen(3000, () => {
  console.log("thie bff server started");
  console.log("http://localhost:3000");
});

export default app;
