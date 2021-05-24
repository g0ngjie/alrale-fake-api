"use strict";

// const jwt = require("jsonwebtoken");
// const config = require("./../config");
const { KError } = require("./../utils");

/**不需要token检测的接口白名单 */
const whiteLists = ["/api/member/___test"];

exports.validateToken = async (ctx, next) => {
  const token = ctx.headers["authorization"];
  const path = (ctx.request.path || "").split("?");
  const white = whiteLists.filter((white) => white === path[0]).length !== 0;
  if (!white) {
    if (!token) {
      ctx.throw(400, KError.MissingToken());
    }
    // const user = await jwt.verify(token, config.SECRET_KEY);
    // if (!user || JSON.stringify(user) === "{}") {
    //   ctx.throw(404, "no user found");
    // }
    ctx.request.user = user;
  }
  await next();
};
