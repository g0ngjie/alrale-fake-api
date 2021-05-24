const { mock, Random } = require("mockjs");
const ADDR_DICT = require("./address_dict");

/**获取用户详情 */
exports.getUser = function () {
  const data = mock({
    // 属性 sid 是一个自增数，起始值为 1，每次增 1
    "sid|+1": 1,
    name: "@cname",
    // 属性 userId 是一个5位的随机码
    "userId|5": "",
    // 属性 sex 是一个bool值
    gender: "@integer(0, 1)",
    //属性 id 是随机id
    id: "@id",
    //属性 paragraph 是一个随机长度的段落
    paragraph: "@cparagraph",
    //属性 image 是一个随机图片 参数分别为size, background, text
    image: "@image('200x100', '#4A7BF7', 'avatar')",
    //属性 address 是一个随机地址
    address: "@county(true)",
    //属性 date 是一个yyyy-MM-dd 的随机日期
    birthday: '@date("yyyy-MM-dd")',
    //属性 time 是一个 size, background, text 的随机时间
    time: '@time("yyyy-MM-dd HH:mm:ss")',
    //属性 url 是一个随机的url
    url: "@url",
    //属性 email 是一个随机email
    email: "@email",
  });
  return data;
};

/**获取用户列表 */
exports.getUserList = function (limit) {
  const result = mock({
    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
    [`list|${limit || 10}`]: [
      {
        //属性 id 是随机id
        id: "@id",
        // 属性 sid 是一个自增数，起始值为 1，每次增 1
        "sid|+1": 1,
        name: "@cname",
        age: "@integer(1, 88)",
        // 属性 sex 是一个bool值
        gender: "@integer(0, 1)",
        //属性 paragraph 是一个随机长度的段落
        paragraph: "@cparagraph",
        //属性 image 是一个随机图片 参数分别为size, background, text
        avatar: "@image('200x100', '#4A7BF7', 'avatar')",
        //属性 address 是一个随机地址
        address: "@county(true)",
        //属性 date 是一个yyyy-MM-dd 的随机日期
        birthday: '@date("yyyy-MM-dd")',
        //属性 time 是一个 size, background, text 的随机时间
        time: '@time("yyyy-MM-dd HH:mm:ss")',
        //属性 email 是一个随机email
        email: "@email",
      },
    ],
  });
  return result.list;
};

/**获取一篇文章 */
exports.getContent = function () {
  const content = mock({
    id: "@id",
    title: "@title()",
    paragraph: "@cparagraph",
    time: '@time("yyyy-MM-dd HH:mm:ss")',
    url: "@url",
  });
  return content;
};

/**获取一张图片 */
exports.getImage = function () {
  const image = Random.image();
  return image;
};

/**图片列表 */
exports.getImageList = function (limit) {
  const images = mock({ [`list|${limit || 10}`]: ["@image"] });
  return images;
};

/**获取省列表 */
exports.getProvinces = function () {
  const list = ADDR_DICT.map((item) => {
    return {
      code: item.provinceCode,
      name: item.provinceName,
    };
  });
  return list;
};

/**根据省 获取市 */
exports.getCityListByCode = function (pCode) {
  let list = [];
  ADDR_DICT.forEach(({ provinceCode, mallCityList }) => {
    if (provinceCode === pCode + "") return (list = mallCityList);
  });
  return list;
};

/**根据市获取区 */
exports.getAreaListByCode = function (cCode) {
  let list = [];
  ADDR_DICT.forEach(({ mallCityList }) => {
    let flag = false;
    mallCityList.forEach(({ cityCode, mallAreaList }) => {
      if (cityCode === cCode + "") {
        list = mallAreaList;
        flag = true;
        return;
      }
    });
    if (flag) return;
  });
  return list;
};

/**获取省市区tree */
exports.provinceCityDistrict = function () {
  return ADDR_DICT;
};

exports.provinceCityDistrict();
