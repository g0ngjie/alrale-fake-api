"use strict";

const { KError } = require("../utils");
const _ = require("lodash");

exports.create = async (data) => {
  
  return {};
};

exports.countGroupByStore = async (where) => {
  
  return {};
};

exports.count = async (search) => {
  return {};
};

exports.findAll = async (search) => {
  return {};
};

exports.findOne = async (search) => {
  return {};
};

exports.deleteById = async (id) => {
  return {};
};

exports.deleteMany = async (search) => {
    throw KError.InvalidFormatData("deleteMany func search is Nil");
};
