"use strict";

const Router = require("koa-router");
const router = new Router();
const { KLayout } = require("../../utils");

router.delete("/", (ctx, next) => {
  KLayout.layout(ctx, { msg: "delete success!" });
  next();
});

router.delete("/:id", (ctx, next) => {
  const id = ctx.params.id;
  KLayout.layout(ctx, { msg: "delete success!", params: id });
  next();
});

module.exports = router;
