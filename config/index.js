"use strict";

const __env = process.env.NODE_ENV;
const __path = __env || "production";
module.exports = require(`${__dirname}/${__path}`);
