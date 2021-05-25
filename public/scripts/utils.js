export function getBaseUrl(path) {
  const domain = ["localhost", "127.0.0.1"].includes(location.hostname)
    ? "http://api.g0ngjie.com"
    : "";
  const url = domain + path;
  return url;
}
// 接口请求工具
export async function request(path, method = "get") {
  const url = getBaseUrl(path);
  const res = await fetch(url, { method });
  const result = await res.json();
  return result;
}

export function download(url, type, method = "get") {
  url = getBaseUrl(url);

  const xhh = new XMLHttpRequest();
  xhh.open(method, url);
  xhh.responseType = "blob";
  // xhh.setRequestHeader("Content-Type", 'application/json;charset=utf-8');
  xhh.onreadystatechange = function () {
    if (xhh.readyState === 4 && xhh.status === 200) {
      // const name = xhh.getResponseHeader("Content-Disposition");
      // const filename = name.substring(20, name.length);
      // const fileName = name && name.split(';')[1].split('filename=')[1];
      // console.log("[debug]fileName:", fileName)
      const blob = new Blob([xhh.response]);
      const csvUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.target = "_blank";
      link.download = "fake." + type;
      link.click();
    }
  };
  xhh.send();
}

export function upload(file, url) {
  url = getBaseUrl(url);
  return new Promise((resolve) => {
    //创建formdata对象
    const formdata = new FormData();
    formdata.append("file", file);
    //创建xhr，使用ajax进行文件上传
    const xhr = new XMLHttpRequest();
    xhr.open("post", url);
    //回调
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText);
      }
    };
    //获取上传的进度
    // xhr.upload.onprogress = function (event) {
    //   if (event.lengthComputable) {
    //     const percent = (event.loaded / event.total) * 100;
    //     document.querySelector("#progress .progress-item").style.width =
    //       percent + "%";
    //   }
    // };
    //将formdata上传
    xhr.send(formdata);
  });
}
