"use strict";

const Router = require("koa-router");
const fs = require("fs");
// const { validateToken } = require("../middlewares/auth");
const router = new Router();
// router.prefix("/api");

module.exports = (app) => {
  /**路由分发 */
  const apis = fs.readdirSync(__dirname + "/api");
  apis.forEach((element) => {
    let module = require(__dirname + "/api/" + element);
    router.use(
      "/" + element.replace(".js", ""),
      module.routes(),
      module.allowedMethods()
    );
  });
  // app.use(async (ctx, next) => {
  //   await validateToken(ctx, next);
  // });
  app.use(router.routes());
};
