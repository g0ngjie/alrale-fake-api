import Routers from "./router.js";
import { request } from "./utils.js";

new Vue({
  el: "#app",
  data() {
    return {
      routers: [],
      // ajax示例
      ajax_content: null,
      // responseTxt
      responseTxt: "",
    };
  },
  methods: {
    handleClickRouter({ url, name: title, method, detail }) {
      this.genAjaxHtml(url, title, detail);
      this.genResponseTxt(url, method);
    },
    // 初始化路由列表
    initRouters() {
      this.routers = Routers;
    },
    // 生成ajax示例
    genAjaxHtml(path, title, detail) {
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
