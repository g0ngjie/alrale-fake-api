"use strict";

const _ = require("lodash");
const KError = require("./KError");

/**
 * 格式化查询条件
 */
exports.FmtSearch = (body) => {
  if (_.isNil(body)) throw KError.InvalidFormatData("FmtSearch args is Nil");
  let where = FmtWhere(body);
  return { where, order: [["createdAt", "DESC"]] };
};

/**
 * 格式化查询条件 列表 分页
 */
exports.FmtSearchAll = (body) => {
  if (_.isNil(body)) throw KError.InvalidFormatData("FmtSearch args is Nil");
  let where = FmtWhere(body);
  const { keyword, page, size } = body;
  let condition = {
    order: [["createdAt", "DESC"]],
  };
  if (keyword || Object.keys(where).length > 0) condition.where = where;
  let limit = 10;
  let offset = 0;
  if (!_.isNil(size) && _.isNumber(+size)) limit = +size;
  if (!_.isNil(page) && _.isNumber(+page) && +page !== 0)
    offset = (page - 1) * limit;
  condition.offset = offset;
  condition.limit = limit;
  return condition;
};
