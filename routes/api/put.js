"use strict";

const Router = require("koa-router");
const router = new Router();
const { KLayout } = require("../../utils");

router.put("/", (ctx, next) => {
  KLayout.layout(ctx, { msg: "put success!" });
  next();
});

router.put("/:id", (ctx, next) => {
  const id = ctx.params.id;
  KLayout.layout(ctx, { msg: "put success!", params: id });
  next();
});

module.exports = router;
