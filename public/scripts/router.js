export default [
  {
    prefix: "GET",
    title: "GET请求",
    routers: [
      {
        path: "/",
        name: "获取一篇文章",
        method: "GET",
        url: "/get",
      },
      {
        path: "/list",
        name: "获取文章列表",
        method: "GET",
        url: "/get/list",
      },
      {
        path: "/image",
        name: "获取一张图片",
        method: "GET",
        url: "/get/image",
      },
      {
        path: "/images",
        name: "图片列表",
        method: "GET",
        url: "/get/images",
      },
    ],
  },
  {
    prefix: "POST",
    title: "POST请求",
    routers: [
      {
        path: "/",
        name: "获取一篇文章",
        method: "POST",
        url: "/post",
      },
      {
        path: "/list",
        name: "获取文章列表",
        method: "POST",
        url: "/post/list",
        detail: "limit分页参数",
      },
    ],
  },
  {
    prefix: "PUT",
    title: "PUT请求",
    routers: [
      {
        path: "/",
        name: "",
        method: "PUT",
        url: "/put",
      },
      {
        path: "/:id",
        name: "",
        method: "PUT",
        url: "/put/id_" + Date.now(),
      },
    ],
  },
  {
    prefix: "DELETE",
    title: "DELETE请求",
    routers: [
      {
        path: "/",
        name: "",
        method: "DELETE",
        url: "/delete",
      },
      {
        path: "/:id",
        name: "",
        method: "DELETE",
        url: "/delete/id_" + Date.now(),
      },
    ],
  },
  {
    prefix: "ADDRESS",
    title: "省市区",
    routers: [
      {
        path: "/getProvinces",
        name: "获取省列表",
        method: "GET",
        url: "/address/getProvinces",
      },
      {
        path: "/getCityListByCode",
        name: "根据省 获取市",
        method: "GET",
        url: "/address/getCityListByCode?code=110000",
      },
      {
        path: "/getAreaListByCode",
        name: "根据市获取区",
        method: "GET",
        url: "/address/getAreaListByCode?code=110100",
      },
      {
        path: "/tree",
        name: "树",
        method: "GET",
        url: "/address/tree",
      },
    ],
  },
  {
    prefix: "USER",
    title: "用户",
    routers: [
      {
        path: "/info",
        name: "用户详情",
        method: "GET",
        url: "/user/info",
      },
      {
        path: "/page",
        name: "用户列表分页",
        method: "POST",
        url: "/user/page",
        detail: "limit分页参数",
      },
    ],
  },
  {
    prefix: "FILE",
    title: "文件",
    routers: [
      {
        path: "/upload",
        name: "文件上传",
        method: "POST",
        url: "/file/upload",
        detail: "上传key为 file=",
      },
      {
        path: "/download/:type",
        name: "文件blob流下载",
        method: "GET",
        url: "/file/download/txt",
        detail: "type=xlsx|docx|txt|ogg|mp4",
      },
      {
        path: "/download/:type",
        name: "文件blob流下载",
        method: "POST",
        url: "/file/download/xlsx",
        detail: "type=xlsx|docx|txt|ogg|mp4",
      },
    ],
  },
];
