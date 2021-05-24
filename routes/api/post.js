"use strict";

const Router = require("koa-router");
const { Random } = require("mockjs");
const router = new Router();
const { KLayout, MockUtil } = require("../../utils");

/**获取一篇文章 */
router.post("/", (ctx, next) => {
  KLayout.layout(ctx, MockUtil.getContent());
  next();
});

/**获取文章列表 */
router.post("/list", async (ctx, next) => {
  const limit = ctx.request.body.limit;
  const list = MockUtil.getContentList(limit);
  await KLayout.layout(ctx, { list, count: Random.integer(limit, 1000) });
  await next();
});

module.exports = router;
