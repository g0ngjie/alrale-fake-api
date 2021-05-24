"use strict";

const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");
const favicon = require("koa-favicon");
const koaBody = require("koa-body");
const { KLayout } = require("./utils");

// error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    await KLayout.layout(ctx, null, error);
  }
});

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  })
);
app.use(favicon(__dirname + "/favicon.ico"));
app.use(json());
app.use(logger());
app.use(cors());
app.use(require("koa-static")(__dirname + "/public"));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
require("./routes/index")(app);

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
