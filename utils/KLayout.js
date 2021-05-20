"use strict";

// const KLog = require("./KLog");
const KError = require("./KError");

function handleError(err) {
  if (!err) return;
  if (err instanceof KError) return err;
  else return KError.RequestError(err);
}

/**
 * @function layout
 * @param {Object} ctx
 * @param {Object} data 返回参数或null
 * @param {module: KError} err 错误类型对象或null
 */
exports.layout = async (ctx, data, err) => {
  /**系统异常 */
  err = handleError(err);
  /**定义的错误类型 */
  const { errorCode, errorMsg } = err || {
    errorCode: 100,
    errorMsg: null,
  };
  /**生成日志 */
  // if (err) await KLog.saveErrLog(ctx, err);
  /**返回参数 */
  ctx.status = 200;
  ctx.body = {
    errorCode,
    errorMsg,
    data,
  };
};
