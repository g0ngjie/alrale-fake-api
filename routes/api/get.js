"use strict";

const Router = require("koa-router");
const router = new Router();
const Mock = require("mockjs");
const { KLayout } = require('../../utils')

router.get("/list", async (ctx, next) => {
  await KLayout.layout(ctx, "/get/list");
  await next();
});

module.exports = router;
