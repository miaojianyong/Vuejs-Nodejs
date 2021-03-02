/* 管理员用户 数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  username: { // 用户名
    type: String,
  },
  password: { // 密码
    type: String,
    select: false, // 表示经过加密处理的密码不在前端显示
    // val 表示用户填写的密码
    set(val) { // 对密码加密后在存储到数据库
      // 导入bcrypt密码加密模块 10加密指数即加密程度
      return require('bcrypt').hashSync(val, 10)
    }
  }
})
// 导出物品模型
module.exports = mongoose.model('AdminUser', schema);