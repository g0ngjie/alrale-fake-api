"use strict";

const Router = require("koa-router");
const router = new Router();
const { memController } = require("../../controller");

/* 资料录入 */
router.post("/save", memController.save);
/* 汇总各个门店人数 根据用户权限 */
router.get("/totalByRole", memController.totalByRole);
/* 会员列表查询 根据用户权限 条件筛选 */
router.post("/memberList", memController.list);
/* 根据条件查询单条数据 */
router.post("/memberInfo", memController.searchInfo);
/* 根据权限 获取门店列表 */
router.get("/getStoreByRole", memController.getStoreByRole);
/* 获取门店详情 */
router.post("/getStoreById", memController.getDeptInfoById);
/* 根据id删除 */
router.post("/delete", memController.delete);
/* 获取我的店铺列表 */
router.get("/myStores", memController.getMyDeptList);
/* 测试接口 */
router.get("/___test", memController.test);

module.exports = router;
