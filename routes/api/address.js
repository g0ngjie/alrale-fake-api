"use strict";

const Router = require("koa-router");
const router = new Router();
const { KLayout, MockUtil } = require("../../utils");

/**获取省列表 */
router.get("/getProvinces", (ctx, next) => {
  KLayout.layout(ctx, MockUtil.getProvinces());
  next();
});

/**根据省 获取市 */
router.get("/getCityListByCode", (ctx, next) => {
  const code = ctx.request.query.code;
  const citys = MockUtil.getCityListByCode(code);
  KLayout.layout(ctx, citys);
  next();
});

/**根据市获取区 */
router.get("/getAreaListByCode", (ctx, next) => {
  const code = ctx.request.query.code;
  const citys = MockUtil.getAreaListByCode(code);
  KLayout.layout(ctx, citys);
  next();
});

router.get("/tree", (ctx, next) => {
  KLayout.layout(ctx, MockUtil.provinceCityDistrict());
  next();
});

module.exports = router;
