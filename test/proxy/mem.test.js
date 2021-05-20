"use strict";

const { should, expect, assert } = require("chai");
const { memProxy } = require("./../../proxy");
const { KUtil, KEnum } = require("./../../utils");
const Sequelize = require("sequelize");
const DB = require("./../../utils/MysqlDB");
const debug = require("debug")(":::");
debug.enabled = true;
const _ = require("lodash");

const _form = {
  mobile: "13111112222",
  name: "张三",
  gender: KEnum.Gender.GIRL,
  store: "测试商店",
  remark: "这个是备注",
  imgUrl: "www.baidu.com",
  userId: "11111111111111111111",
  deptId: "654321",
};

after(async () => {
  const search = KUtil.FmtSearch({ userId: _form.userId });
  await memProxy.deleteMany(search);
});

describe("test memProxy", () => {
  describe("db create", () => {
    it("should success", async () => {
      await memProxy.create(_form);
    });
  });

  describe("db exec sql", () => {
    it("in (...deptId)", async () => {
      const result = await DB.query(
        "select * from members where deptId in (1,44618920)",
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
    });
    it("GROUP BY store", async () => {
      const result = await DB.query(
        "SELECT count(DISTINCT name) count, store from members GROUP BY store",
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      // debug(result);
    });
  });

  describe("db findAll", () => {
    it("memProxy.findAll deptIdList i$n limit", async () => {
      const search = KUtil.FmtSearchAll({ deptIdList: [1, 45603247] });
      // debug(search);
      const all = await memProxy.findAll(search);
      // debug(all.map((item) => item.deptId));
      expect(_.isArray(all)).eq(true);
    });

    it("memProxy.findAll keyword limit", async () => {
      const search = KUtil.FmtSearchAll({ keyword: "13111112222" });
      // debug(search);
      const all = await memProxy.findAll(search);
      // debug(all);
      expect(_.isArray(all)).eq(true);
    });

    it("memProxy.findAll limit", async () => {
      const search = KUtil.FmtSearchAll({ page: 0, size: 3 });
      debug(search);
      const all = await memProxy.findAll(search);
      expect(_.isArray(all)).eq(true);
    });

    it("memProxy.findAll", async () => {
      let search = KUtil.FmtSearch({ userId: _form.userId });
      const findOne = await memProxy.findOne(search);
      // debug(findOne);
      const {
        id,
        mobile,
        name,
        gender,
        store,
        remark,
        userId,
        deptId,
      } = findOne;
      search = KUtil.FmtSearch({ id });
      // debug(search);
      const all = await memProxy.findAll(search);
      expect(_.isArray(all)).eq(true);
    });
  });

  describe("db count", () => {
    it("memProxy.count", async () => {
      const count = await memProxy.count({});
      debug(count, " count");
      expect(_.isNumber(count)).eq(true);
    });

    it("memProxy.count search", async () => {
      const search = KUtil.FmtSearch(_form);
      const count = await memProxy.count(search);
      debug(count, " count");
      expect(_.isNumber(count)).eq(true);
    });
  });

  describe("db findOne", () => {
    it("memProxy.findOne", async () => {
      const result = await memProxy.findOne({});
      // debug(result, " result");
      expect(_.isObject(result) || _.isNull(result)).eq(true);
    });
    it("memProxy.findOne where ...", async () => {
      const search = KUtil.FmtSearch(_form);
      const result = await memProxy.findOne(search);
      // debug(result, " result");
      expect(_.isObject(result) || _.isNull(result)).eq(true);
    });
  });

  describe.skip("db destory one", () => {
    it("memProxy.deleteById", async () => {
      const findOne = await memProxy.findOne({});
      debug(`findOne.id`, findOne.id);
      const result = await memProxy.deleteById(findOne.id);
      debug(result);
      expect(result);
    });
  });
});
