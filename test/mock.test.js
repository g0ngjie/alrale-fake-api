const { MockUtil } = require("../utils");

describe("Mock", () => {
  it("获取用户详情", () => {
    const user = MockUtil.getUser();
    expect([0, 1].includes(user.gender)).toBe(true);
  });

  it("获取用户列表", () => {
    const users = MockUtil.getUserList(10);
    expect(users.length).toBe(10);
  });

  it("获取一篇文章", () => {
    const content = MockUtil.getContent();
    expect("title" in content).toBe(true);
  });

  it("获取文章列表", () => {
    const contents = MockUtil.getContentList();
    expect(contents.length).toBe(10);
  });
});
