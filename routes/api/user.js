"use strict";

const Router = require("koa-router");
const { Random } = require("mockjs");
const router = new Router();
const { KLayout, MockUtil } = require("../../utils");

/**用户详情 */
router.get("/info", (ctx, next) => {
  KLayout.layout(ctx, { data: MockUtil.getUser() });
  next();
});

/**用户列表分页 */
router.post("/page", (ctx, next) => {
  const limit = ctx.request.body.limit;
  const users = MockUtil.getUserList(limit);
  KLayout.layout(ctx, { list: users, count: Random.integer(limit, 1000) });
  next();
});

module.exports = router;
