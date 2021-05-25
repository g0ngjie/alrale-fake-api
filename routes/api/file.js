"use strict";

const Router = require("koa-router");
const router = new Router();
const { KLayout } = require("../../utils");
const path = require("path");
const fs = require("fs");

function getFileName(type) {
  const conf = {
    xlsx: "fake-api.xlsx",
    docx: "fake-api.docx",
    txt: "fake-api.txt",
    mp4: "movie.mp4",
    ogg: "horse.ogg",
  };
  return conf[type];
}

/**文件上传 */
router.post("/upload", (ctx, next) => {
  const file = ctx.request.files.file;
  KLayout.layout(ctx, {
    msg: "upload success! ",
    file: file.name,
    MB: file.size / (1 << 20),
  });
  next();
});

/**get 文件blob流下载 */
router.get("/download/:type", async (ctx, next) => {
  const fileType = ctx.params.type;
  const fileName = getFileName(fileType);
  if (!fileName) {
    KLayout.layout(ctx, null, { msg: "xlsx|docx|txt|ogg|mp4" });
    next();
    return;
  }
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "assets",
    fileName
  );
  let file = fs.createReadStream(filePath);
  try {
    await new Promise((resolve, reject) => {
      file.on("open", function () {
        // 没有特定类型的二进制文件，使用 application/octet-stream
        ctx.set("content-type", "application/octet-stream");
        ctx.set("Content-Disposition", "attachment;filename=" + fileName);
        ctx.body = file;
        resolve();
      });
      file.on("error", function (err) {
        reject(err);
      });
    });
  } catch (e) {
    KLayout.layout(ctx, null, e);
    next();
  }
});

/**post 文件blob流下载 */
router.post("/download/:type", async (ctx, next) => {
  const fileType = ctx.params.type;
  const fileName = getFileName(fileType);
  if (!fileName) {
    KLayout.layout(ctx, null, { msg: "xlsx|docx|txt|ogg|mp4" });
    next();
    return;
  }
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "assets",
    fileName
  );
  let file = fs.createReadStream(filePath);
  try {
    await new Promise((resolve, reject) => {
      file.on("open", function () {
        // 没有特定类型的二进制文件，使用 application/octet-stream
        ctx.set("content-type", "application/octet-stream");
        ctx.set("Content-Disposition", "attachment;filename=" + fileName);
        ctx.body = file;
        resolve();
      });
      file.on("error", function (err) {
        reject(err);
      });
    });
  } catch (e) {
    KLayout.layout(ctx, null, e);
    next();
  }
});

module.exports = router;
