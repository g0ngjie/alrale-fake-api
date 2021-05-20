"use strict";

const { memProxy } = require("./../proxy");
const { DingUtil, KEnum, KUtil, KError, KLayout } = require("./../utils");
const _ = require("lodash");

/**
 * 资料录入
 */
exports.save = async (ctx, next) => {
  const { body, user } = ctx.request;
  const { mobile, name, gender, store, remark, imgUrl } = body;
  const { userId } = user;
  const { department } = await DingUtil.getUserInfoById(userId);
  const result = await memProxy.create({
    mobile,
    name,
    gender,
    store,
    remark,
    imgUrl,
    userId,
    deptId: department.join(),
  });
  await KLayout.layout(ctx, result);
  await next();
};

/**
 * 汇总各个门店人数 根据用户权限
 */
exports.totalByRole = async (ctx, next) => {
  const { user } = ctx.request;
  const { userId } = user;
  const userInfo = await DingUtil.getUserInfoById(userId);
  const { isAdmin, roles, department } = userInfo;

  /* 主管 */
  let isDirector = false;
  if (roles) {
    const roleZero = roles[0];
    isDirector = roleZero["name"] == "主管";
  }

  let where;
  if (isAdmin) {
    where = null;
  } else if (isDirector) {
    /* 查询当前用户 组织架构下所有店铺 */
    where = `where deptId in (${department.join()})`;
  } else {
    where = `where userId = ${userId}`;
  }

  const result = await memProxy.countGroupByStore(where);
  await KLayout.layout(ctx, result);
  await next();
};

/**
 * 会员列表查询 根据用户权限 条件筛选
 */
exports.list = async (ctx, next) => {
  const { user, body } = ctx.request;
  const { keyword, deptId, mobile, name, page, size } = body;
  const { userId } = user;
  const userInfo = await DingUtil.getUserInfoById(userId);
  const { isAdmin, roles, department } = userInfo;

  if (!_.isArray(department)) ctx.throw(400, KError.NotFoundDept());

  /* 主管 */
  let isDirector = false;
  if (roles) {
    const roleZero = roles[0];
    isDirector = roleZero["name"] == "主管";
  }

  let search;
  if (isAdmin) {
    search = KUtil.FmtSearchAll({ keyword, deptId, mobile, name, page, size });
  } else if (isDirector) {
    let condition = { keyword, mobile, name, page, size };
    /* 如果选择单个店铺查询 */
    if (deptId) {
      condition.deptId = deptId;
    } else {
      /* 查询当前用户 组织架构下所有店铺 */
      let ids = department;
      if (department.length > 1) {
        ids.push(department.join());
      }
      condition.deptIdList = ids;
    }
    search = KUtil.FmtSearchAll(condition);
  } else {
    search = KUtil.FmtSearchAll({ keyword, deptId, userId, page, size });
  }

  const list = await memProxy.findAll(search);
  const count = await memProxy.count(search);
  await KLayout.layout(ctx, { list, count });
  await next();
};

/**
 * 根据条件查询单条数据
 */
exports.searchInfo = async (ctx, next) => {
  const { body } = ctx.request;
  const search = KUtil.FmtSearch(body);
  const result = await memProxy.findOne(search);
  await KLayout.layout(ctx, result);
  await next();
};

/**
 * 根据权限 获取门店列表
 */
exports.getStoreByRole = async (ctx, next) => {
  const { user } = ctx.request;
  const { is_sys } = user;
  let result = [];
  if (is_sys) {
    result = await DingUtil.getDeptList();
  } else {
    const userInfo = await DingUtil.getUserInfoById(user.userId);
    const { department } = userInfo;
    for (let i = 0; i < department.length; i++) {
      const deptId = department[i];
      const deptInfo = await DingUtil.getDeptInfo(deptId);
      result.push(deptInfo);
    }
  }
  await KLayout.layout(ctx, result);
  await next();
};

/**
 * 根据deptId获取门店详情
 */
exports.getDeptInfoById = async (ctx, next) => {
  const { deptId } = ctx.request.body;
  const deptInfo = await DingUtil.getDeptInfo(deptId);
  await KLayout.layout(ctx, deptInfo);
  await next();
};

/**
 * 根据id删除
 */
exports.delete = async (ctx, next) => {
  const { id } = ctx.request.body;
  const result = await memProxy.deleteById(id);
  await KLayout.layout(ctx, result);
  await next();
};

/**
 * 获取我的店铺列表
 */
exports.getMyDeptList = async (ctx, next) => {
  const { user } = ctx.request;
  const { userId } = user;
  const userInfo = await DingUtil.getUserInfoById(userId);
  const { department } = userInfo;
  let deptList = [];
  for (let i = 0; i < department.length; i++) {
    const deptId = department[i];
    const deptInfo = await DingUtil.getDeptInfo(deptId);
    deptList.push(deptInfo);
  }
  await KLayout.layout(ctx, deptList);
  await next();
};

/**
 * 测试接口
 */
exports.test = async (ctx, next) => {
  if (process.env.NODE_ENV === KEnum.Environment.DEV) {
    await KLayout.layout(ctx, "test success");
  }
  await next();
};
