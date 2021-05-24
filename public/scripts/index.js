import Routers from "./router.js";
import { request, download, upload } from "./utils.js";

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
    };
  },
  methods: {
    // 下载
    handleDownload(type) {
      const { path, method } = this.currentNode;
      download(path + type, type, method);
    },
    // 上传
    async handleUpload() {
      const file = document.querySelector("#file").files[0];
      const { path } = this.currentNode;
      //获取到选中的文件
      const result = await upload(file, path);
      this.responseTxt = result;
    },
    // 路由
    handleClickRouter({ url, name: title, method, detail }) {
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
      const domain = location.origin;
      const value = `
        <em class="title">${title || ""}</em><br/>
        <em class="tips">${detail || ""}</em><br/><br/>
        fetch(<span class="url">"${domain + path}"</span>)
        <br/>&nbsp;&nbsp;.then(<span class="mark">response</span> => response.json())
        <br/>&nbsp;&nbsp;.then(<span class="mark">json</span> => console.log(json))
      `;
      this.ajax_content = value;
    },
    async genResponseTxt(path, method) {
      if (this.showBtn) return;
      const result = await request(path, method);
      this.responseTxt = JSON.stringify(result, "", "\t");
    },
  },
  created() {
    this.initRouters();
    this.genAjaxHtml("/get");
    this.genResponseTxt("/get");
  },
});
