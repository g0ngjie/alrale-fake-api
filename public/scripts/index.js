import Routers from "./router.js";
import { request, download, upload, getBaseUrl } from "./utils.js";

new Vue({
  el: "#app",
  data() {
    return {
      routers: [],
      // ajax示例
      ajax_content: null,
      // responseTxt
      responseTxt: "",
      // 文件下载
      showBtn: false,
      // 当前选中
      currentNode: {},
      // 声明
      declare: {},
    };
  },
  methods: {
    // 下载
    handleDownload(type) {
      const { path, method } = this.currentNode;
      logger.handleClick({ event: '下载', type })
      download(path + type, type, method);
    },
    // 上传
    async handleUpload() {
      const file = document.querySelector("#file").files[0];
      logger.handleClick({ event: '上传', fileName: file.name })
      const { path } = this.currentNode;
      //获取到选中的文件
      const result = await upload(file, path);
      this.responseTxt = result;
    },
    // 路由
    handleClickRouter({ url, title, method, detail, isStatic }) {
      if (isStatic) {
        window.open(url);
        return;
      }
      logger.handleClick({ event: '路由', title })
      this.responseTxt = "";
      this.genAjaxHtml(url, title, detail, method);
      this.genResponseTxt(url, method);
    },
    // 初始化路由列表
    initRouters() {
      this.routers = Routers;
    },
    // 生成ajax示例
    genAjaxHtml(path, title, detail, method = "get") {
      // 判断是否需要特殊操作
      const isUpload = path.includes("/upload");
      const isDownload = path.includes("/download");
      this.showBtn = isUpload || isDownload;
      if (this.showBtn) {
        this.currentNode = {
          isUpload,
          isDownload,
          path,
          title,
          detail,
          method: method.toLowerCase(),
        };
        return;
      }
      const _url = getBaseUrl(path);
      let value = `
        <em class="title">${title || ""}</em><br/>
        <em class="tips">${detail || ""}</em><br/><br/>
        fetch(<span class="url">"${_url}"</span>)
        <br/>&nbsp;&nbsp;.then(<span class="mark">response</span> => response.json())
        <br/>&nbsp;&nbsp;.then(<span class="mark">json</span> => console.log(json))>
        <br/><br/>
      `;
      if (method.toLowerCase() === "get")
        value += `<a href="${_url}" target="_blank">Try</a>`;
      this.ajax_content = value;
    },
    async genResponseTxt(path, method) {
      if (this.showBtn) return;
      const result = await request(path, method);
      this.responseTxt = JSON.stringify(result, "", "\t");
    },
    async initDeclare() {
      const { errorCode, data } = await request("/version");
      if (errorCode === 100) this.declare = data;
    },
    // 获取静态资源列表
    async staticResource() {
      const { errorCode, data = [] } = await request("/file/assets");
      if (errorCode === 100) {
        this.routers.push({
          prefix: "STATIC",
          title: "静态资源",
          routers: data.map((name) => {
            return {
              isStatic: true,
              path: name,
              url: `/assets/${name}`,
            };
          }),
        });
      }
    },
  },
  created() {
    this.initRouters();
    this.genAjaxHtml("/get");
    this.genResponseTxt("/get");
    this.initDeclare();
    this.staticResource();
    logger.mount({
      traceId: 'fake-api',
      serverURL: 'https://logger.alrale.cn',
      mapURI: "http://api.map.baidu.com/location/ip?ak=RD3fQS8GA1UeR4Ig10ejdEkTg1OfwuV3",
      encryptionFunc: 'useDefault'
    });
  },
});
