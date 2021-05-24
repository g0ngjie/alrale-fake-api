// 接口请求工具
export async function request(path, method = "get", params = "", body = {}) {
  // const url = "http://localhost:3000";
  // path = url + path;
  const res = await fetch(path, { method });
  const result = await res.json();
  return result;
}
