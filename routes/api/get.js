"use strict";

const Router = require("koa-router");
const { Random } = require("mockjs");
const router = new Router();
const { KLayout, MockUtil } = require("../../utils");

/**获取一篇文章 */
router.get("/", (ctx, next) => {
  KLayout.layout(ctx, MockUtil.getContent());
  next();
});

/**获取文章列表 */
router.get("/list", async (ctx, next) => {
  const limit = ctx.query.limit;
  const list = MockUtil.getContentList(limit);
  await KLayout.layout(ctx, { list, count: Random.integer(limit, 1000) });
  await next();
});

/**获取一张图片 */
router.get("/image", async (ctx, next) => {
  await KLayout.layout(ctx, MockUtil.getImage());
  await next();
});

/**图片列表 */
router.get("/images", async (ctx, next) => {
  const limit = ctx.query.limit;
  const list = MockUtil.getImageList(limit);
  await KLayout.layout(ctx, { list, count: Random.integer(limit, 1000) });
  await next();
});

module.exports = router;
