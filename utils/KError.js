"use strict";

class KError extends Error {
  constructor(errorCode, errorMsg) {
    super(errorMsg);
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  static __ErrorMap(error) {
    return {
      [KError.RequestError]: 2000,
      [KError.MissingToken]: 2001,
      [KError.InvalidParameters]: 2002,
      [KError.InvalidAdmin]: 2003,
      [KError.NotFoundDept]: 2004,
      [KError.NotFoundUser]: 2005,
      [KError.UserHasExist]: 2006,
      [KError.VerifyFailure]: 2007,
      [KError.TokenExpired]: 2008,
      [KError.InvalidFormatData]: 2009,
      [KError.ConnectTimeOut]: 2010,
      [KError.VerificationExpired]: 2011,
      [KError.AccountHasUsed]: 2012,
      [KError.DingError]: 2013,
    }[error];
  }

  /**
   * @function isTypeOf
   * @param {*} error
   * @param {*} ErrorType
   */
  static isTypeOf(error, ErrorType) {
    if (!error) return false;
    return error.errorCode === KError.__ErrorMap(ErrorType);
  }

  /**
   * 系统错误
   */
  static RequestError(errorMsg) {
    return new KError(2000, errorMsg || "internal error");
  }

  /**
   * token 丢失
   */
  static MissingToken(errorMsg) {
    return new KError(2001, errorMsg || "missing token");
  }

  /**
   * 非法参数
   */
  static InvalidParameters(errorMsg) {
    return new KError(2002, errorMsg || "invalid parameters");
  }

  /**
   * 没有管理员权限
   */
  static InvalidAdmin(errorMsg) {
    return new KError(2003, errorMsg || "invalid admin");
  }

  /**
   * 未查找到部门
   */
  static NotFoundDept(errorMsg) {
    return new KError(2004, errorMsg || "not found dept");
  }

  /**
   * 未查找到用户
   */
  static NotFoundUser(errorMsg) {
    return new KError(2005, errorMsg || "not found user");
  }

  /**
   * 用户已存在
   */
  static UserHasExist(errorMsg) {
    return new KError(2006, errorMsg || "user has exist");
  }

  /**
   * 验证失败
   */
  static VerifyFailure(errorMsg) {
    return new KError(2007, errorMsg || "verify failure");
  }

  /**
   * token过期
   */
  static TokenExpired(errorMsg) {
    return new KError(2008, errorMsg || "token expired");
  }

  /**
   * 数据格式不正确
   */
  static InvalidFormatData(errorMsg) {
    return new KError(2009, errorMsg || "invalid format data");
  }

  /**
   * 请求超时
   */
  static ConnectTimeOut(errorMsg) {
    return new KError(2010, errorMsg || "connect timeout");
  }

  /**
   * 验证码过期
   */
  static VerificationExpired(errorMsg) {
    return new KError(2011, errorMsg || "verification expired");
  }

  /*
   * 该账号已经被占用
   */
  static AccountHasUsed(errorMsg) {
    return new KError(2012, errorMsg || "account has used");
  }

  /*
   * 钉钉接口调用异常
   */
  static DingError(errorMsg) {
    return new KError(2013, errorMsg || "dingtalk api error");
  }
}

module.exports = KError;
