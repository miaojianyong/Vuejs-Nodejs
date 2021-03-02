/* 管理员用户 数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  username: { // 用户名
    type: String,
  },
  password: { // 密码
    type: String
  }
})
// 导出物品模型
module.exports = mongoose.model('AdminUser', schema);