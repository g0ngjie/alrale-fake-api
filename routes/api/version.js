"use strict";

const Router = require("koa-router");
const router = new Router();
const PKG = require("../../package.json");
const { KLayout } = require("../../utils");

router.get("/", (ctx, next) => {
  const { version, author, name, description } = PKG;
  KLayout.layout(ctx, { version, author, name, description });
  next();
});

module.exports = router;
