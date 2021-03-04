/* 校验用户是否登录 中间件 -- 返回一个函数 */
module.exports = options => {
  const jwt = require('jsonwebtoken'); // 导入返回token的模块
  const AdminUser = require('../models/AdminUser'); // 导入用户模型
  // 引入 http-assert 模块
  const assert = require('http-assert');
  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop();
    assert(token, 401, '请提供jwt token');
    const { id } = jwt.verify(token, req.app.get('secret'));
    assert(id, 401, '无效的jwt token');
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, '请先登录');
    await next();
  };
}