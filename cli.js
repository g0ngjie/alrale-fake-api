#!/usr/bin/env node

const program = require("commander");
const PKG = require("./package.json");
const open = require("open");

/**mock服务启动 */
function startFunc(cmd) {
  const { port } = cmd;
  if (port) process.PORT = port;
  require("./bin/www");
  open(`http://localhost:${port || 3000}`);
}

/* ========== commander ========== */
program.version(PKG.version, "-v, -version");

program
  .command("start")
  .option("-p, --port <port>", "端口号")
  .description("启动服务")
  .action(startFunc);

program.parse(process.argv);
